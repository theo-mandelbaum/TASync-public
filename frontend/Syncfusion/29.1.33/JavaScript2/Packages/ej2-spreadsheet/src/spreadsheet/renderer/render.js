import { SheetRender, RowRenderer, CellRenderer } from './index';
import { extend, remove } from '@syncfusion/ej2-base';
import { getSheetName, getRowsHeight, getColumnsWidth, getData, getSheetIndexFromId } from '../../workbook/index';
import { getCellAddress, getCellIndexes, workbookFormulaOperation, moveOrDuplicateSheet, skipHiddenIdx } from '../../workbook/index';
import { sheetTabs, onContentScroll, deInitProperties, beforeDataBound, updateTranslate } from '../common/index';
import { spreadsheetDestroyed, isFormulaBarEdit, editOperation } from '../common/index';
import { getSiblingsHeight, refreshSheetTabs, focus, getUpdatedScrollPosition } from '../common/index';
import { ribbon, formulaBar, beforeVirtualContentLoaded, setAriaOptions } from '../common/index';
/**
 * Render module is used to render the spreadsheet
 *
 * @hidden
 */
var Render = /** @class */ (function () {
    function Render(parent) {
        this.parent = parent;
        this.addEventListener();
        this.instantiateRenderer();
    }
    Render.prototype.render = function () {
        this.parent.setProperties({ activeSheetIndex: this.parent.skipHiddenSheets(this.parent.activeSheetIndex) }, true);
        if (!this.parent.isMobileView()) {
            this.parent.notify(ribbon, null);
            this.parent.notify(formulaBar, null);
        }
        var sheetPanel = this.parent.createElement('div', {
            id: this.parent.element.id + '_sheet_panel', className: 'e-sheet-panel'
        });
        if (this.parent.enableRtl) {
            sheetPanel.classList.add('e-rtl');
        }
        this.parent.element.appendChild(sheetPanel);
        if (this.parent.showSheetTabs) {
            this.parent.notify(sheetTabs, null);
        }
        else { // for formula calculation
            this.parent.notify(workbookFormulaOperation, { action: 'initSheetInfo' });
            this.parent.notify(workbookFormulaOperation, { action: 'initiateDefinedNames' });
        }
        if (this.parent.isMobileView()) {
            this.parent.notify(formulaBar, null);
            this.parent.notify(ribbon, null);
        }
        if (this.parent.password && (this.parent.password.length > 0 || this.parent.isProtected)) {
            this.parent.isProtected = true;
            if (this.parent.showSheetTabs) {
                this.parent.element.querySelector('.e-add-sheet-tab').setAttribute('disabled', 'true');
                this.parent.element.querySelector('.e-add-sheet-tab').classList.add('e-disabled');
            }
        }
        if (this.parent.selectionSettings.mode === 'None') {
            this.parent.allowAutoFill = false;
        }
        this.setSheetPanelSize();
        this.renderSheet(sheetPanel);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.checkTopLeftCell(!this.parent.refreshing);
    };
    Render.prototype.checkTopLeftCell = function (initLoad, isRefreshing, scrollTop, scrollLeft, preventModelCheck, openOptions) {
        var sheet = this.parent.getActiveSheet();
        this.parent.showSpinner();
        var isTopLeftCell = sheet.topLeftCell === 'A1';
        var indexes = getCellIndexes(sheet.topLeftCell);
        var isFreezeScrolled;
        if (sheet.topLeftCell !== sheet.paneTopLeftCell && (sheet.frozenRows || sheet.frozenColumns)) {
            var paneIndexes = getCellIndexes(sheet.paneTopLeftCell);
            isFreezeScrolled = this.parent.scrollSettings.enableVirtualization;
            isTopLeftCell = sheet.frozenRows && sheet.frozenColumns ? indexes[0] + sheet.frozenRows === paneIndexes[0] &&
                indexes[1] + sheet.frozenColumns === paneIndexes[1] : (sheet.frozenRows ? indexes[0] + sheet.frozenRows === paneIndexes[0]
                && indexes[1] === 0 : indexes[1] + sheet.frozenColumns === paneIndexes[1] && indexes[0] === 0);
            if (indexes[0] && paneIndexes[0] > indexes[0]) {
                this.parent.viewport.beforeFreezeHeight = getRowsHeight(sheet, 0, indexes[0] - 1, true);
            }
            else {
                this.parent.viewport.beforeFreezeHeight = 0;
            }
            if (indexes[1] && paneIndexes[1] > indexes[1]) {
                this.parent.viewport.beforeFreezeWidth = getColumnsWidth(sheet, 0, indexes[1] - 1, true);
            }
            else {
                this.parent.viewport.beforeFreezeWidth = 0;
            }
        }
        else {
            this.parent.viewport.beforeFreezeHeight = this.parent.viewport.beforeFreezeWidth = 0;
        }
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        if (!this.parent.scrollSettings.enableVirtualization || isTopLeftCell) {
            this.refreshUI({ rowIndex: indexes[0], colIndex: indexes[1], refresh: 'All' }, null, initLoad, isRefreshing, preventModelCheck, openOptions);
            if (isFreezeScrolled) {
                this.parent.viewport.topIndex = skipHiddenIdx(sheet, frozenRow, true) - frozenRow;
                this.parent.viewport.leftIndex = skipHiddenIdx(sheet, frozenCol, true, 'columns') - frozenCol;
            }
        }
        else {
            var pIndexes = sheet.paneTopLeftCell === sheet.topLeftCell ? indexes : getCellIndexes(sheet.paneTopLeftCell);
            var eventArgs = { preventScroll: true };
            eventArgs.scrollTop = scrollTop || (pIndexes[0] > frozenRow ? getRowsHeight(sheet, frozenRow, pIndexes[0] - 1, true) : 0);
            eventArgs.scrollLeft = scrollLeft || (pIndexes[1] > frozenCol ? getColumnsWidth(sheet, frozenCol, pIndexes[1] - 1, true) : 0);
            this.parent.notify(onContentScroll, eventArgs);
            var threshold = this.parent.getThreshold('row');
            var rowIndex = sheet.frozenRows ? indexes[0] : (indexes[0] > threshold ?
                skipHiddenIdx(sheet, indexes[0] - threshold, true) : 0);
            var frozenIndexes = [];
            if (sheet.frozenRows) {
                frozenIndexes.push(pIndexes[0] - threshold > frozenRow ? pIndexes[0] - threshold : frozenRow);
            }
            threshold = this.parent.getThreshold('col');
            var colIndex = sheet.frozenColumns ? indexes[1] :
                (indexes[1] > threshold ? skipHiddenIdx(sheet, indexes[1] - threshold, true, 'columns') : 0);
            if (sheet.frozenColumns) {
                if (!frozenIndexes.length) {
                    frozenIndexes.push(frozenRow);
                }
                frozenIndexes.push(pIndexes[1] - threshold > frozenCol ? pIndexes[1] - threshold : frozenCol);
            }
            else if (frozenIndexes.length) {
                frozenIndexes.push(frozenCol);
            }
            this.refreshUI({ rowIndex: rowIndex, colIndex: colIndex, refresh: 'All', top: eventArgs.scrollTop, left: eventArgs.scrollLeft,
                frozenIndexes: frozenIndexes }, null, initLoad, isRefreshing, preventModelCheck, openOptions);
            if (isFreezeScrolled) {
                if (frozenRow && frozenIndexes[0] >= frozenRow) {
                    this.parent.viewport.topIndex = skipHiddenIdx(sheet, frozenIndexes[0], true) - frozenRow;
                }
                if (frozenCol && frozenIndexes[1] >= frozenCol) {
                    this.parent.viewport.leftIndex = skipHiddenIdx(sheet, frozenIndexes[1], true, 'columns') - frozenCol;
                }
            }
        }
    };
    Render.prototype.renderSheet = function (panel) {
        if (panel === void 0) { panel = document.getElementById(this.parent.element.id + '_sheet_panel'); }
        panel.appendChild(this.parent.createElement('div', { className: 'e-sheet', id: this.parent.element.id + '_sheet', styles: 'background-color: #fff' }));
        this.parent.serviceLocator.getService('sheet').renderPanel();
    };
    /**
     * @hidden
     * @param {RefreshArgs} args - Specifies the RefreshArgs.
     * @param {string} address - Specifies the address.
     * @param {boolean} initLoad - Specifies the initLoad.
     * @param {boolean} isRefreshing - Specifies the isRefreshing.
     * @param {boolean} preventModelCheck - Specifies the preventModelCheck.
     * @param {boolean} openOptions - Specifies the open response options.
     * @returns {void}
     */
    // tslint:disable-next-line:max-func-body-length
    Render.prototype.refreshUI = function (args, address, initLoad, isRefreshing, preventModelCheck, openOptions) {
        var _this = this;
        if (args.refresh !== 'All') {
            this.parent.showSpinner();
        }
        var sheetModule = this.parent.serviceLocator.getService('sheet');
        var sheet = this.parent.getActiveSheet();
        var sheetName = getSheetName(this.parent);
        var prevRowColCnt = { rowCount: sheet.rowCount, colCount: sheet.colCount };
        args.frozenIndexes = args.frozenIndexes ? args.frozenIndexes : [];
        if (!address) {
            if (this.parent.scrollSettings.enableVirtualization) {
                var lastRow = args.rowIndex + this.parent.viewport.rowCount + (this.parent.getThreshold('row') * 2);
                var lastCol = args.colIndex + this.parent.viewport.colCount + (this.parent.getThreshold('col') * 2);
                var frozenRow = this.parent.frozenRowCount(sheet);
                var frozenCol = this.parent.frozenColCount(sheet);
                if (args.frozenIndexes.length) {
                    lastRow += (args.frozenIndexes[0] - frozenRow);
                    lastCol += (args.frozenIndexes[1] - frozenCol);
                }
                if (args.refresh === 'Row') {
                    lastRow += frozenRow;
                }
                else {
                    lastRow += sheet.frozenRows;
                }
                if (args.refresh === 'Column') {
                    lastCol += frozenCol;
                }
                else {
                    lastCol += sheet.frozenColumns;
                }
                var rowIdx = args.frozenIndexes[0] > frozenRow ? args.frozenIndexes[0] : args.rowIndex + (args.refresh === 'Row' ?
                    frozenRow : sheet.frozenRows);
                var indexes = this.parent.skipHidden(rowIdx, lastRow, 'rows', false);
                lastRow = indexes[1];
                if (rowIdx !== indexes[0]) {
                    var topLeftCell = getCellIndexes(sheet.paneTopLeftCell);
                    if (topLeftCell[0] === rowIdx) {
                        this.parent.updateTopLeftCell(indexes[0] - frozenRow, topLeftCell[1], 'col');
                    }
                }
                indexes[0] -= frozenRow;
                var count = sheet.rowCount - 1;
                var diff = 0;
                var startRow = args.rowIndex;
                if (this.parent.scrollSettings.isFinite && lastRow > count) {
                    diff = lastRow - count;
                    lastRow = skipHiddenIdx(sheet, count, false);
                    if (indexes[0] + frozenRow > skipHiddenIdx(sheet, frozenRow, true)) {
                        var startIdx = args.rowIndex - diff;
                        startIdx = startIdx < 0 ? 0 : startIdx;
                        startIdx = this.decreaseHidden(startIdx, args.rowIndex - 1, frozenRow);
                        if (args.top && startIdx < args.rowIndex) {
                            this.parent.notify(updateTranslate, { height: getRowsHeight(sheet, startIdx + frozenRow, args.rowIndex - 1 + frozenRow, true),
                                isRender: true });
                        }
                        this.parent.viewport.topIndex = indexes[0] = startIdx;
                        startRow = args.refresh === 'Row' ? startIdx : startRow;
                    }
                }
                if (args.refresh === 'Row') {
                    args.rowIndex = skipHiddenIdx(sheet, startRow + frozenRow, true) - frozenRow;
                }
                else {
                    startRow = args.rowIndex = frozenRow ? skipHiddenIdx(sheet, startRow, true) : indexes[0];
                }
                var colIdx = args.frozenIndexes[1] > frozenCol ? args.frozenIndexes[1] : args.colIndex + (args.refresh ===
                    'Column' ? frozenCol : sheet.frozenColumns);
                indexes = this.parent.skipHidden(colIdx, lastCol, 'columns', false);
                lastCol = indexes[1];
                if (colIdx !== indexes[0]) {
                    var topLeftCell = getCellIndexes(sheet.paneTopLeftCell);
                    if (topLeftCell[1] === colIdx) {
                        this.parent.updateTopLeftCell(topLeftCell[0], indexes[0] - frozenCol, 'row');
                    }
                }
                indexes[0] -= frozenCol;
                count = sheet.colCount - 1;
                diff = 0;
                var startCol = args.colIndex;
                if (this.parent.scrollSettings.isFinite && lastCol > count) {
                    diff = lastCol - count;
                    lastCol = skipHiddenIdx(sheet, count, false, 'columns');
                    if (indexes[0] + frozenCol > skipHiddenIdx(sheet, frozenCol, true, 'columns')) {
                        var startIdx = args.colIndex - diff;
                        startIdx = startIdx > -1 ? startIdx : 0;
                        startIdx = this.decreaseHidden(startIdx, args.colIndex - 1, frozenCol, 'columns');
                        if (args.left && startIdx < args.colIndex) {
                            this.parent.notify(updateTranslate, { width: getColumnsWidth(sheet, startIdx + frozenCol, args.colIndex - 1 + frozenCol, true),
                                isRender: true });
                        }
                        this.parent.viewport.leftIndex = indexes[0] = startIdx;
                        startCol = args.refresh === 'Column' ? startIdx : startCol;
                    }
                }
                if (args.refresh === 'Column') {
                    args.colIndex = skipHiddenIdx(sheet, startCol + frozenCol, true, 'columns') - frozenCol;
                }
                else {
                    startCol = args.colIndex = frozenCol ? skipHiddenIdx(sheet, startCol, true, 'columns') : indexes[0];
                }
                if (args.refresh === 'Row') {
                    startRow += frozenRow;
                    if (frozenRow) {
                        lastRow += getCellIndexes(sheet.topLeftCell)[0];
                    }
                    lastCol = this.parent.viewport.rightIndex;
                }
                if (args.refresh === 'Column') {
                    startCol += frozenCol;
                    if (frozenCol) {
                        lastCol += getCellIndexes(sheet.topLeftCell)[1];
                    }
                    lastRow = this.parent.viewport.bottomIndex;
                }
                this.parent.viewport.topIndex = args.rowIndex;
                this.parent.viewport.bottomIndex = lastRow;
                this.parent.viewport.leftIndex = args.colIndex;
                this.parent.viewport.rightIndex = lastCol;
                address = getCellAddress(startRow, startCol) + ":" + getCellAddress(lastRow, lastCol);
            }
            else {
                if (args.refresh === 'All') {
                    this.updateTopLeftScrollPosition(extend(args, { sheet: sheet }));
                }
                this.parent.viewport.bottomIndex = sheet.rowCount - 1;
                this.parent.viewport.rightIndex = sheet.colCount - 1;
                address = getCellAddress(args.rowIndex, args.colIndex) + ":" + getCellAddress(this.parent.viewport.bottomIndex, this.parent.viewport.rightIndex);
            }
        }
        if (args.refresh === 'All') {
            this.parent.trigger(beforeDataBound, {});
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var isOpen = this.parent.isOpen || this.parent.refreshing;
        setAriaOptions(this.parent.getMainContent(), { busy: true });
        var sheetsLen = this.parent.sheets.length;
        getData(this.parent, sheetName + "!" + address, null, null, args.frozenIndexes).then(function (values) {
            if (!_this.parent || sheetsLen < _this.parent.sheets.length) {
                return;
            }
            var sheetIdx = getSheetIndexFromId(_this.parent, sheet.id);
            if (!preventModelCheck && (sheetIdx === undefined || sheetIdx !== _this.parent.activeSheetIndex)) {
                if (sheetIdx > -1) {
                    _this.checkTopLeftCell();
                }
                return;
            }
            var indexes = [args.rowIndex, args.colIndex].concat(getCellIndexes(address.split(':')[1]));
            var isEdit;
            var arg;
            switch (args.refresh) {
                case 'All':
                    sheetModule.renderTable({ cells: values, indexes: indexes, top: args.top, left: args.left, initLoad: initLoad, isRefreshing: isRefreshing, isOpen: isOpen, openOptions: openOptions });
                    break;
                case 'Row':
                    sheetModule.refreshRowContent({ cells: values, indexes: indexes, skipUpdateOnFirst: args.skipUpdateOnFirst, prevRowColCnt: prevRowColCnt });
                    isEdit = false;
                    arg = { isEdit: isEdit };
                    _this.parent.notify(isFormulaBarEdit, arg);
                    if (arg.isEdit) {
                        _this.parent.notify(editOperation, { action: 'startEdit', refreshCurPos: false });
                    }
                    break;
                case 'Column':
                    sheetModule.refreshColumnContent({
                        cells: values, indexes: indexes, skipUpdateOnFirst: args.skipUpdateOnFirst,
                        prevRowColCnt: prevRowColCnt, insertDelete: args.insertDelete
                    });
                    break;
                case 'RowPart':
                    sheetModule.updateRowContent({
                        cells: values, indexes: indexes, direction: args.direction, skipUpdateOnFirst: args.skipUpdateOnFirst,
                        prevRowColCnt: prevRowColCnt
                    });
                    break;
                case 'ColumnPart':
                    sheetModule.updateColContent({
                        cells: values, indexes: indexes, direction: args.direction, skipUpdateOnFirst: args.skipUpdateOnFirst,
                        prevRowColCnt: prevRowColCnt
                    });
                    break;
            }
            if (_this.parent && _this.parent.isReact) {
                _this.parent['renderReactTemplates']();
            }
        });
        this.parent.notify(beforeVirtualContentLoaded, { refresh: args.refresh, skipTranslate: args.skipTranslate });
    };
    Render.prototype.updateTopLeftScrollPosition = function (args) {
        var topLeftCell = getCellIndexes(args.sheet.topLeftCell);
        var paneTopLeftCell = getCellIndexes(args.sheet.paneTopLeftCell);
        if (args.sheet.frozenRows) {
            var frozenRow = this.parent.frozenRowCount(args.sheet);
            if (paneTopLeftCell[0] > frozenRow) {
                args.top = getRowsHeight(args.sheet, frozenRow, paneTopLeftCell[0] - 1, true);
            }
        }
        else {
            if (args.rowIndex) {
                args.rowIndex = 0;
            }
            if (topLeftCell[0] !== 0) {
                args.top = getRowsHeight(args.sheet, 0, topLeftCell[0] - 1, true);
            }
        }
        if (args.sheet.frozenColumns) {
            var frozenCol = this.parent.frozenColCount(args.sheet);
            if (paneTopLeftCell[1] > frozenCol) {
                args.left = getColumnsWidth(args.sheet, frozenCol, paneTopLeftCell[1] - 1, true);
            }
        }
        else {
            if (args.colIndex) {
                args.colIndex = 0;
            }
            if (topLeftCell[1] !== 0) {
                args.left = getColumnsWidth(args.sheet, 0, topLeftCell[1] - 1, true);
            }
        }
    };
    Render.prototype.removeSheet = function () {
        if (document.getElementById(this.parent.element.id + '_sheet')) {
            remove(document.getElementById(this.parent.element.id + '_sheet'));
        }
    };
    /**
     * Refresh the active sheet.
     *
     * @param {boolean} isOpen - Specifies the isOpen.
     * @param {boolean} resize - Set `true` to refresh the sheet with exiting scroll top and left.
     * @param {boolean} focusEle - Specify the focusEle.
     * @param {boolean} preventModelCheck - Specifies the preventModelCheck.
     * @param {boolean} openOptions - Specifies the open response options.
     * @returns {void}
     */
    Render.prototype.refreshSheet = function (isOpen, resize, focusEle, preventModelCheck, openOptions) {
        var scrollTop = 0;
        var scrollLeft = 0;
        if (resize) {
            var mainPanel = this.parent.element.getElementsByClassName('e-main-panel')[0];
            if (mainPanel) {
                scrollTop = mainPanel.scrollTop;
            }
            var sheetContent = this.parent.getMainContent();
            if (sheetContent) {
                scrollLeft = sheetContent.scrollLeft;
            }
        }
        this.removeSheet();
        this.renderSheet();
        this.parent.notify(deInitProperties, {});
        this.checkTopLeftCell(false, isOpen, scrollTop, scrollLeft, preventModelCheck, openOptions);
        if (focusEle) {
            focus(this.parent.element);
        }
    };
    /**
     * Used to set sheet panel size.
     *
     * @param {number} colMinWidth - Specifies column minimum width value.
     * @returns {void}
     */
    Render.prototype.setSheetPanelSize = function (colMinWidth) {
        var panel = document.getElementById(this.parent.element.id + '_sheet_panel');
        var offset = this.parent.element.getBoundingClientRect();
        var height;
        this.parent.viewport.scaleY = this.parent.viewport.scaleX = 1;
        if (this.parent.enableScaling) {
            var offsetHeight = this.parent.element.offsetHeight;
            var scaleY = offsetHeight / offset.height;
            if (scaleY !== 1 && Math.abs(offsetHeight - offset.height) >= offsetHeight * 0.1) {
                this.parent.viewport.scaleY = scaleY;
            }
            var offsetWidth = this.parent.element.offsetWidth;
            var scaleX = offsetWidth / offset.width;
            if (scaleX !== 1 && Math.abs(offsetWidth - offset.width) >= offsetWidth * 0.1) {
                this.parent.viewport.scaleX = scaleX;
            }
        }
        if (this.parent.height === 'auto') {
            panel.style.height = '260px';
            height = 230;
        }
        else {
            height = (offset.height * this.parent.viewport.scaleY) - getSiblingsHeight(panel, null, this.parent.viewport.scaleY);
            panel.style.height = height + "px";
            height -= (32 / this.parent.viewport.scaleY);
        }
        if (colMinWidth !== undefined) {
            this.colMinWidth = colMinWidth;
        }
        this.parent.viewport.height = height;
        var width = offset.width * this.parent.viewport.scaleX;
        this.parent.viewport.width = width - (32 / this.parent.viewport.scaleX);
        this.parent.viewport.rowCount = this.roundValue(height, 20);
        this.parent.viewport.colCount = this.roundValue(width, this.colMinWidth || 64);
    };
    Render.prototype.roundValue = function (size, threshold) {
        var value = size / threshold;
        var roundedValue = Math.round(value);
        return Math.abs(value - roundedValue) < 0.5 ? roundedValue : roundedValue - 1;
    };
    Render.prototype.moveOrDuplicateSheetHandler = function (args) {
        this.parent.notify(refreshSheetTabs, null);
        if (args.refresh) {
            this.refreshSheet(args.isDuplicate);
        }
    };
    Render.prototype.decreaseHidden = function (startIdx, endIdx, freezeCount, layout) {
        if (layout === void 0) { layout = 'rows'; }
        startIdx += freezeCount;
        endIdx += freezeCount;
        var sheet = this.parent.getActiveSheet();
        for (var i = endIdx; i >= startIdx; i--) {
            if ((sheet["" + layout])[i] && (sheet["" + layout])[i].hidden) {
                startIdx--;
                if (startIdx < freezeCount) {
                    startIdx = skipHiddenIdx(sheet, freezeCount, true, layout);
                    break;
                }
            }
        }
        return startIdx - freezeCount;
    };
    /**
     * Registing the renderer related services.
     *
     * @returns {void}
     */
    Render.prototype.instantiateRenderer = function () {
        this.parent.serviceLocator.register('cell', new CellRenderer(this.parent));
        this.parent.serviceLocator.register('row', new RowRenderer(this.parent));
        this.parent.serviceLocator.register('sheet', new SheetRender(this.parent));
    };
    /**
     * Destroy the Render module.
     *
     * @returns {void}
     */
    Render.prototype.destroy = function () {
        this.removeEventListener();
        this.parent.serviceLocator.getService('row').destroy();
        this.parent.serviceLocator.getService('cell').destroy();
        if (this.colMinWidth) {
            this.colMinWidth = null;
        }
        this.parent = null;
    };
    Render.prototype.addEventListener = function () {
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
        this.parent.on(moveOrDuplicateSheet, this.moveOrDuplicateSheetHandler, this);
        this.parent.on(getUpdatedScrollPosition, this.updateTopLeftScrollPosition, this);
    };
    Render.prototype.removeEventListener = function () {
        this.parent.off(spreadsheetDestroyed, this.destroy);
        this.parent.off(moveOrDuplicateSheet, this.moveOrDuplicateSheetHandler);
        this.parent.off(getUpdatedScrollPosition, this.updateTopLeftScrollPosition);
    };
    return Render;
}());
export { Render };
