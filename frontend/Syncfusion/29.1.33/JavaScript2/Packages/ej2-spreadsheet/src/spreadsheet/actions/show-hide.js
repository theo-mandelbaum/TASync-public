import { spreadsheetDestroyed, getChartsIndexes, refreshChartCellModel, readonlyAlert } from '../common/index';
import { autoFit, virtualContentLoaded, completeAction, focus } from '../common/index';
import { hiddenMerge, updateTableWidth, updateTranslate } from '../common/index';
import { getCellAddress, isHiddenRow, setRow, setColumn, isHiddenCol, getRangeAddress, getCell, getSheet, getColumn, getRow, isReadOnlyCells } from '../../workbook/index';
import { beginAction, getCellIndexes, applyCellFormat, refreshChart } from '../../workbook/index';
import { activeCellMergedRange, setMerge, getRowHeight, getRangeIndexes, hideShow } from '../../workbook/index';
import { skipHiddenIdx, isFilterHidden } from '../../workbook/index';
import { detach, isUndefined } from '@syncfusion/ej2-base';
/**
 * The `ShowHide` module is used to perform hide/show the rows and columns.
 *
 * @hidden
 */
var ShowHide = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet show hide module.
     *
     * @param {Spreadsheet} parent - Specify the spreadsheet instance.
     * @private
     */
    function ShowHide(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    ShowHide.prototype.hideShow = function (args) {
        var _this = this;
        var sheetIndex = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var sheet = getSheet(this.parent, sheetIndex);
        if (args.startIndex > args.endIndex) {
            var temp = args.startIndex;
            args.startIndex = args.endIndex;
            args.endIndex = temp;
        }
        if (args.actionUpdate !== undefined) {
            var range = args.isCol ? [0, args.startIndex, sheet.rowCount - 1, args.endIndex] :
                [args.startIndex, 0, args.endIndex, sheet.colCount - 1];
            if (isReadOnlyCells(this.parent, range)) {
                if (args.actionUpdate) {
                    this.parent.notify(readonlyAlert, null);
                }
                return;
            }
        }
        var actionArgs;
        if (args.actionUpdate) {
            args.sheetIndex = sheetIndex;
            actionArgs = { eventArgs: args, action: 'hideShow' };
            this.parent.notify(beginAction, actionArgs);
            if (args.cancel) {
                return;
            }
            delete args.cancel;
        }
        if (args.hide) {
            args.hiddenIndexes = [];
        }
        var performHideShow = function (updateViewport) {
            if (args.isCol) {
                _this.hideCol(args);
                if (updateViewport) {
                    _this.parent.sheetModule.colWidthChanged({ colIdx: args.startIndex, isHideShow: true });
                }
            }
            else {
                _this.hideRow(args);
                if (updateViewport) {
                    _this.parent.sheetModule.rowHeightChanged({ rowIdx: args.startIndex, isHideShow: true });
                }
            }
        };
        var freezePane = args.isCol ? this.parent.frozenColCount(sheet) : this.parent.frozenRowCount(sheet);
        if (freezePane && args.startIndex < freezePane) {
            var endIndex = void 0;
            args.freezePane = true;
            if (args.endIndex >= freezePane) {
                endIndex = args.endIndex;
                args.endIndex = freezePane - 1;
            }
            performHideShow(true);
            delete args.freezePane;
            if (endIndex !== undefined) {
                var startIndex = args.startIndex;
                args.endIndex = endIndex;
                args.startIndex = freezePane;
                performHideShow(!this.parent.scrollSettings.enableVirtualization);
                args.startIndex = startIndex;
            }
        }
        else {
            performHideShow(!this.parent.scrollSettings.enableVirtualization);
        }
        if (args.actionUpdate) {
            this.updateIndexOnlyForHiddenColumnsAndRows(args, sheet);
            this.parent.notify(completeAction, actionArgs);
            focus(this.parent.element);
        }
    };
    ShowHide.prototype.updateIndexOnlyForHiddenColumnsAndRows = function (args, sheet) {
        var startIndex = args.startIndex;
        var endIndex = args.endIndex;
        var model;
        for (var sIdx = args.startIndex; sIdx <= endIndex; sIdx++) {
            model = args.isCol ? getColumn(sheet, sIdx) : getRow(sheet, sIdx) || {};
            if (model.hidden === false) {
                args.startIndex = sIdx;
                break;
            }
        }
        for (var eIdx = args.endIndex; eIdx >= startIndex; eIdx--) {
            model = args.isCol ? getColumn(sheet, eIdx) : getRow(sheet, eIdx) || {};
            if (model.hidden === false) {
                args.endIndex = eIdx;
                break;
            }
        }
    };
    ShowHide.prototype.hideRow = function (eventArgs) {
        var _this = this;
        var sheetIndex = isUndefined(eventArgs.sheetIndex) ? this.parent.activeSheetIndex : eventArgs.sheetIndex;
        var sheet = getSheet(this.parent, sheetIndex);
        var cell;
        var count = 0;
        var idx;
        var nextIdx;
        var merge;
        var model;
        var args = Object.assign({}, eventArgs);
        var isFinite = this.parent.scrollSettings.isFinite && !args.freezePane;
        var height;
        if (isFinite) {
            if (args.startIndex >= sheet.rowCount) {
                return;
            }
            if (args.endIndex >= sheet.rowCount) {
                args.endIndex = sheet.rowCount - 1;
            }
            height = 0;
        }
        var frozenRow = this.parent.frozenRowCount(sheet);
        if (args.hide) {
            var content = void 0;
            var rowHdr_1;
            var row = void 0;
            var prevChartIndexes = [];
            var currentChartIndexes = [];
            var updateBtmIdx = isFinite && args.endIndex === skipHiddenIdx(sheet, sheet.rowCount - 1, false);
            for (var i = args.startIndex; i <= args.endIndex; i++) {
                if (isHiddenRow(sheet, i)) {
                    if (args.isFiltering && !isFilterHidden(sheet, i)) {
                        setRow(sheet, i, { isFiltered: true });
                    }
                    continue;
                }
                if (idx === undefined) {
                    if (args.freezePane) {
                        rowHdr_1 = this.parent.sheetModule.getSelectAllTable();
                        content = this.parent.getColHeaderTable();
                    }
                    else {
                        rowHdr_1 = this.parent.getRowHeaderTable();
                        content = this.parent.getContentTable();
                    }
                    idx = this.parent.getViewportIndex(i);
                    count = 0;
                }
                model = { hidden: true };
                if (args.isFiltering) {
                    model.isFiltered = true;
                }
                if (!args.isFiltering) {
                    prevChartIndexes = getChartsIndexes(this.parent);
                }
                setRow(sheet, i, model);
                if (!args.isFiltering) {
                    currentChartIndexes = getChartsIndexes(this.parent);
                }
                if (sheetIndex !== this.parent.activeSheetIndex) {
                    continue;
                }
                if (isFinite) {
                    height += getRowHeight(sheet, i, true, true);
                }
                this.refreshChart(i, 'rows');
                if (!args.isFiltering) {
                    this.refreshChartCellModel(prevChartIndexes, currentChartIndexes);
                }
                row = content && content.rows[idx];
                if (row) {
                    if (!merge) {
                        for (var j = 0; j <= sheet.usedRange.colIndex; j++) {
                            cell = getCell(i, j, sheet) || {};
                            if ((cell.colSpan || cell.rowSpan) && (args.startIndex >= this.parent.viewport.topIndex ||
                                this.parent.scrollSettings.enableVirtualization)) {
                                merge = true;
                                break;
                            }
                        }
                    }
                    if (merge) {
                        continue;
                    }
                    if (rowHdr_1.rows[idx]) {
                        detach(rowHdr_1.rows[idx]);
                    }
                    detach(row);
                    count++;
                    row = content.rows[idx];
                    if (row && i === args.endIndex) {
                        var cell_1 = void 0;
                        nextIdx = skipHiddenIdx(sheet, i + 1, true);
                        var first = nextIdx !== skipHiddenIdx(sheet, 0, true) && nextIdx ===
                            (this.parent.viewport.topIndex >= args.startIndex ? args.endIndex + 1 : this.parent.viewport.topIndex) ? 'Row' : '';
                        for (var j = this.parent.viewport.leftIndex; j <= this.parent.viewport.rightIndex; j++) {
                            var borderTop = this.parent.getCellStyleValue(['borderTop'], [nextIdx, j]).borderTop;
                            if (borderTop !== '') {
                                cell_1 = row.cells[j];
                                this.parent.notify(applyCellFormat, {
                                    onActionUpdate: false, rowIdx: nextIdx, colIdx: j,
                                    style: { borderTop: borderTop }, row: row, pRow: row.previousElementSibling,
                                    first: first, td: cell_1
                                });
                            }
                        }
                    }
                }
                else {
                    if (i <= this.parent.viewport.bottomIndex) {
                        count++;
                    }
                    else {
                        count--;
                    }
                }
            }
            if (args.refreshUI) {
                return;
            }
            if (merge && (args.startIndex >= this.parent.viewport.topIndex || !this.parent.scrollSettings.enableVirtualization)) {
                if (args.isFiltering) {
                    eventArgs.refreshUI = true;
                }
                else {
                    this.parent.selectRange(sheet.selectedRange);
                    if (sheet.frozenRows || sheet.frozenColumns) {
                        this.parent.renderModule.refreshSheet(false, false, true);
                        eventArgs.refreshUI = true;
                    }
                    else {
                        this.parent.renderModule.refreshUI({ rowIndex: this.parent.viewport.topIndex, colIndex: this.parent.viewport.leftIndex, refresh: 'Row' });
                    }
                }
                return;
            }
            if (!count) {
                return;
            }
            this.parent.selectRange(sheet.selectedRange);
            var updateHideClass = function () {
                if (sheet.showHeaders) {
                    var firstIdx = args.freezePane ? 1 : 0;
                    if (idx === firstIdx) {
                        if (rowHdr_1.rows[firstIdx]) {
                            rowHdr_1.rows[firstIdx].classList.add('e-hide-end');
                        }
                    }
                    else {
                        if (rowHdr_1 && rowHdr_1.rows[idx - 1]) {
                            rowHdr_1.rows[idx - 1].classList.add('e-hide-start');
                        }
                        if (rowHdr_1 && rowHdr_1.rows[idx]) {
                            rowHdr_1.rows[idx].classList.add('e-hide-end');
                        }
                    }
                }
            };
            if (!args.freezePane && this.parent.scrollSettings.enableVirtualization) {
                var startIndex = args.startIndex;
                var endIndex = args.startIndex;
                if (args.startIndex < getCellIndexes(sheet.paneTopLeftCell)[0] || count > this.parent.viewport.rowCount) {
                    if (args.isFiltering) {
                        eventArgs.refreshUI = true;
                        return;
                    }
                    this.parent.updateTopLeftCell(skipHiddenIdx(sheet, args.startIndex - 1 < frozenRow ? frozenRow : args.startIndex - 1, true) - frozenRow, null, 'col');
                    this.parent.renderModule.refreshSheet(false, false, true);
                }
                else {
                    startIndex = this.parent.viewport.bottomIndex + 1;
                    endIndex = startIndex + count - 1;
                    var indexes = this.parent.skipHidden(startIndex, endIndex, 'rows', false);
                    startIndex = indexes[0];
                    endIndex = indexes[1];
                    if (isFinite) {
                        if (startIndex >= sheet.rowCount) {
                            if (this.parent.viewport.topIndex + frozenRow === skipHiddenIdx(sheet, frozenRow, true)) {
                                updateHideClass();
                                this.parent.notify(updateTranslate, { isHide: true, height: height });
                                if (updateBtmIdx) {
                                    this.parent.viewport.bottomIndex = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
                                }
                            }
                            else {
                                this.parent.renderModule.refreshSheet(false, false, true);
                            }
                            return;
                        }
                        else if (endIndex >= sheet.rowCount) {
                            this.parent.renderModule.refreshSheet(false, false, true);
                            return;
                        }
                        else {
                            this.parent.notify(updateTranslate, { isHide: true, height: height });
                        }
                    }
                    this.parent.viewport.bottomIndex = endIndex;
                    var colIndex = void 0;
                    var frozenCol = this.parent.frozenColCount(sheet);
                    var frozenIdxes = [];
                    if (frozenCol) {
                        frozenIdxes.push(frozenRow);
                        frozenIdxes.push(this.parent.viewport.leftIndex + frozenCol);
                        colIndex = getCellIndexes(sheet.topLeftCell)[1];
                    }
                    else {
                        colIndex = this.parent.viewport.leftIndex;
                    }
                    this.parent.renderModule.refreshUI({ colIndex: colIndex, rowIndex: startIndex, direction: '', refresh: 'RowPart', frozenIndexes: frozenIdxes }, getCellAddress(startIndex, colIndex) + ":" + getCellAddress(endIndex, this.parent.viewport.rightIndex));
                }
            }
            updateHideClass();
        }
        else {
            var hFrag = void 0;
            var frag = void 0;
            var hRow = void 0;
            var row = void 0;
            var newStartRow = void 0;
            var rowRenderer = void 0;
            var content = void 0;
            var rowHdr = void 0;
            var startRow = void 0;
            var endRow = args.startIndex - 1;
            var mergeCollection = [];
            var skipDetach = args.freezePane;
            var direction = 'lastElementChild';
            var detachedHeight = 0;
            var viewportTopIdx = this.parent.viewport.topIndex + frozenRow;
            if (isFinite) {
                var lastIdx = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
                if (this.parent.viewport.bottomIndex === lastIdx) {
                    if (viewportTopIdx === skipHiddenIdx(sheet, frozenRow, true)) {
                        skipDetach = true;
                    }
                    else {
                        var topLeftCell = getRangeIndexes(sheet.paneTopLeftCell)[0];
                        var count_1 = (((sheet.rowCount - 1) - topLeftCell) + 1) -
                            this.parent.hiddenCount(topLeftCell, sheet.rowCount - 1);
                        if (count_1 < this.parent.viewport.rowCount + Math.round(this.parent.getThreshold('row') / 2)) {
                            direction = 'firstElementChild';
                        }
                    }
                }
            }
            var prevChartIndexes = getChartsIndexes(this.parent);
            for (var i = args.startIndex, len = args.endIndex; i <= len; i++) {
                if (!(args.isFiltering ? isHiddenRow(sheet, i) : isHiddenRow(sheet, i) && !isFilterHidden(sheet, i))) {
                    if (args.startIndex === args.endIndex) {
                        return;
                    }
                    if (idx === undefined) {
                        endRow++;
                    }
                    else {
                        newStartRow = i;
                    }
                    continue;
                }
                if (newStartRow !== undefined) {
                    len = i;
                    continue;
                }
                model = { hidden: false };
                if (args.isFiltering) {
                    model.isFiltered = false;
                }
                if (!skipDetach && i > this.parent.viewport.bottomIndex) {
                    setRow(sheet, i, model);
                    if (startRow === undefined) {
                        return;
                    }
                    continue;
                }
                if (startRow === undefined) {
                    startRow = i;
                }
                setRow(sheet, i, model);
                if (sheetIndex !== this.parent.activeSheetIndex) {
                    continue;
                }
                if (isFinite) {
                    height += getRowHeight(sheet, i, true, true);
                }
                this.refreshChart(i, 'rows');
                if (idx === undefined) {
                    hFrag = document.createDocumentFragment();
                    frag = document.createDocumentFragment();
                    rowRenderer = this.parent.serviceLocator.getService('row');
                    if (args.freezePane) {
                        rowHdr = this.parent.sheetModule.getSelectAllTable();
                        content = this.parent.getColHeaderTable();
                    }
                    else {
                        rowHdr = this.parent.getRowHeaderTable();
                        content = this.parent.getContentTable();
                        if (i < this.parent.viewport.topIndex + frozenRow) {
                            this.parent.viewport.topIndex = i - frozenRow;
                        }
                    }
                    idx = this.parent.getViewportIndex(i);
                }
                endRow++;
                hRow = rowRenderer.refresh(i, null, null, true, true);
                hFrag.appendChild(hRow);
                if (rowHdr && rowHdr.rows.length && !skipDetach) {
                    detach(rowHdr.tBodies[0]["" + direction]);
                }
                row = frag.appendChild(rowRenderer.refresh(i, row, hRow));
                if (content && content.rows.length && !skipDetach) {
                    detach(content.tBodies[0]["" + direction]);
                    if (direction === 'firstElementChild') {
                        if (idx !== undefined && idx - 1 > -1) {
                            idx -= 1;
                        }
                        detachedHeight += getRowHeight(sheet, this.parent.viewport.topIndex, true);
                        this.parent.viewport.topIndex = skipHiddenIdx(sheet, this.parent.viewport.topIndex + 1, true);
                    }
                }
                for (var j = this.parent.viewport.leftIndex; j <= this.parent.viewport.rightIndex; j++) {
                    cell = getCell(i, j, sheet) || {};
                    if (cell.rowSpan !== undefined || cell.colSpan !== undefined) {
                        var mergeArgs = {
                            range: [i, j, i, j], isAction: false, merge: true,
                            type: 'All', skipChecking: true
                        };
                        this.parent.notify(activeCellMergedRange, mergeArgs);
                        if (!mergeCollection.length || mergeArgs.range[1] !== mergeCollection[mergeCollection.length - 1].range[1] ||
                            mergeArgs.range[0] !== mergeCollection[mergeCollection.length - 1].range[0]) {
                            mergeCollection.push(mergeArgs);
                        }
                    }
                }
            }
            var currentChartIndexes = getChartsIndexes(this.parent);
            this.refreshChartCellModel(prevChartIndexes, currentChartIndexes);
            if (idx === undefined) {
                return;
            }
            var refreshUI = void 0;
            if (!args.freezePane) {
                if (args.isFiltering && args.startIndex < getCellIndexes(sheet.paneTopLeftCell)[0]) {
                    eventArgs.refreshUI = true;
                    if (newStartRow === undefined || newStartRow === args.endIndex) {
                        return;
                    }
                }
                var prevBottomIdx = this.parent.viewport.bottomIndex;
                this.parent.viewport.bottomIndex = this.parent.viewport.topIndex + frozenRow + this.parent.viewport.rowCount +
                    (this.parent.getThreshold('row') * 2);
                var endHiddenCount = this.parent.hiddenCount(args.endIndex + 1, this.parent.viewport.bottomIndex);
                count = this.parent.hiddenCount(this.parent.viewport.topIndex + frozenRow, args.startIndex) + endHiddenCount;
                this.parent.viewport.bottomIndex += count;
                if (isFinite && this.parent.viewport.bottomIndex >= sheet.rowCount) {
                    this.parent.viewport.bottomIndex = skipHiddenIdx(sheet, sheet.rowCount - 1, false);
                }
                if (!args.isFiltering && startRow >= viewportTopIdx && startRow <= prevBottomIdx && startRow >
                    (this.parent.viewport.bottomIndex - endHiddenCount - Math.abs(endRow - startRow))) {
                    refreshUI = true;
                }
            }
            args.insertIdx = eventArgs.insertIdx = idx;
            args.row = eventArgs.row = frag.querySelector('.e-row');
            args.mergeCollection = eventArgs.mergeCollection = mergeCollection;
            if (sheet.showHeaders) {
                eventArgs.hdrRow = args.hdrRow = hFrag.querySelector('.e-row');
                if (idx !== 0 && !isHiddenRow(sheet, endRow - 1) && rowHdr.rows[idx - 1]) {
                    rowHdr.rows[idx - 1].classList.remove('e-hide-start');
                }
                if (args.startIndex !== 0 && isHiddenRow(sheet, args.startIndex - 1)) {
                    args.hdrRow.classList.add('e-hide-end');
                }
                if (isHiddenRow(sheet, endRow + 1)) {
                    hFrag.lastElementChild.classList.add('e-hide-start');
                }
                else {
                    if (rowHdr.rows[idx]) {
                        rowHdr.rows[idx].classList.remove('e-hide-end');
                    }
                }
            }
            if (row && content && content.rows[idx]) {
                nextIdx = skipHiddenIdx(sheet, endRow + 1, true);
                for (var i = this.parent.viewport.leftIndex; i <= this.parent.viewport.rightIndex; i++) {
                    var borderTop = this.parent.getCellStyleValue(['borderTop'], [nextIdx, i]).borderTop;
                    if (borderTop !== '') {
                        this.parent.notify(applyCellFormat, {
                            onActionUpdate: false, rowIdx: nextIdx, colIdx: i, style: { borderTop: borderTop }, pRow: row,
                            td: content.rows[idx].cells[i], first: ''
                        });
                        var prevIdx = skipHiddenIdx(sheet, startRow - 1, false);
                        if (prevIdx > -1) {
                            if (content.rows[idx - 1] && !this.parent.getCellStyleValue(['borderBottom'], [prevIdx, i]).borderBottom &&
                                !this.parent.getCellStyleValue(['borderTop'], [startRow, i]).borderTop) {
                                content.rows[idx - 1].cells[i].style.borderBottom = '';
                            }
                        }
                        else {
                            content.rows[idx].cells[i].style.borderTop = '';
                        }
                    }
                }
            }
            if (args.skipAppend) {
                return;
            }
            if (isFinite) {
                this.parent.notify(updateTranslate, { height: height, size: detachedHeight });
            }
            if (refreshUI || (Math.abs(endRow - startRow) > this.parent.viewport.rowCount + (this.parent.getThreshold('row') * 2))) {
                this.parent.renderModule.refreshSheet(false, false, true);
            }
            else {
                if (rowHdr) {
                    if (rowHdr.tBodies[0].rows.length) {
                        rowHdr.tBodies[0].insertBefore(hFrag, rowHdr.rows[idx]);
                    }
                    else {
                        rowHdr.tBodies[0].appendChild(hFrag);
                    }
                }
                if (content && content.tBodies[0]) {
                    if (content.tBodies[0].rows.length) {
                        content.tBodies[0].insertBefore(frag, content.rows[idx]);
                    }
                    else {
                        content.tBodies[0].appendChild(frag);
                    }
                }
                this.parent.selectRange(sheet.selectedRange);
                if (args.autoFit && sheet.showHeaders) {
                    this.parent.notify(autoFit, { startIndex: args.startIndex, endIndex: args.endIndex, isRow: true });
                }
                mergeCollection.forEach(function (mergeArgs) { _this.parent.notify(setMerge, mergeArgs); });
                if (newStartRow !== undefined && newStartRow !== args.endIndex) {
                    args.startIndex = newStartRow;
                    this.hideRow(args);
                }
            }
        }
    };
    ShowHide.prototype.hideCol = function (args) {
        var _this = this;
        var sheetIndex = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        var sheet = getSheet(this.parent, sheetIndex);
        var hiddenIndex = [];
        var beforeViewportIdx = [];
        var paneTopLeftIdx = getCellIndexes(sheet.paneTopLeftCell);
        var frozenCol = this.parent.frozenColCount(sheet);
        var frozenRow = this.parent.frozenRowCount(sheet);
        var viewportLeftIdx = this.parent.viewport.leftIndex + frozenCol;
        var scrollable;
        var skipColCount = skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns');
        for (var i = args.startIndex; i <= args.endIndex; i++) {
            if (args.hide) {
                if (isHiddenCol(sheet, i)) {
                    continue;
                }
            }
            else {
                if (!isHiddenCol(sheet, i) || (args.hiddenIndexes && args.hiddenIndexes.indexOf(i) === -1)) {
                    continue;
                }
            }
            var prevChartIndexes = getChartsIndexes(this.parent);
            setColumn(sheet, i, { hidden: args.hide });
            var currentChartIndexes = getChartsIndexes(this.parent);
            this.refreshChart(i, 'columns');
            this.refreshChartCellModel(prevChartIndexes, currentChartIndexes);
            if (this.parent.scrollSettings.enableVirtualization && !args.freezePane && (i < viewportLeftIdx ||
                (i > this.parent.viewport.rightIndex && (!this.parent.scrollSettings.isFinite ||
                    !(skipColCount === this.parent.viewport.rightIndex && i >= skipColCount && i < sheet.colCount))))) {
                if (i < viewportLeftIdx) {
                    beforeViewportIdx.push(i);
                }
                continue;
            }
            hiddenIndex.push(i);
            if (args.hide) {
                args.hiddenIndexes.push(i);
                if (i <= paneTopLeftIdx[1]) {
                    scrollable = true;
                }
            }
        }
        if (!beforeViewportIdx.length && !hiddenIndex.length) {
            return;
        }
        if (sheetIndex !== this.parent.activeSheetIndex) {
            return;
        }
        var topLeftIdx = getCellIndexes(sheet.topLeftCell);
        var table;
        var hTable;
        var getRowIndexes = function () {
            var idx;
            if (_this.parent.scrollSettings.enableVirtualization) {
                idx = [frozenRow ? topLeftIdx[0] : _this.parent.viewport.topIndex, _this.parent.viewport.bottomIndex];
            }
            else {
                idx = [0, sheet.rowCount - 1];
            }
            if (args.freezePane) {
                table = _this.parent.getRowHeaderTable();
                hTable = _this.parent.sheetModule.getSelectAllTable();
            }
            else {
                table = _this.parent.getContentTable();
                hTable = _this.parent.getColHeaderTable();
            }
            return idx;
        };
        if (args.hide) {
            if (!hiddenIndex.length) {
                return;
            }
            if (hiddenIndex.length <= this.parent.getThreshold('col') || !this.parent.scrollSettings.enableVirtualization ||
                args.freezePane) {
                this.removeCell(sheet, hiddenIndex, getRowIndexes(), table, hTable);
            }
            if (!args.freezePane && this.parent.scrollSettings.enableVirtualization) {
                if (scrollable) {
                    this.parent.updateTopLeftCell(null, skipHiddenIdx(sheet, hiddenIndex[0] - 1 < frozenCol ? frozenCol : hiddenIndex[0] - 1, true, 'columns') -
                        frozenCol, 'row');
                    this.parent.renderModule.refreshSheet(false, false, true);
                    return;
                }
                var fIndexes = [];
                var viewportRowIdx = this.parent.viewport.topIndex;
                var rowIdx = frozenRow ? topLeftIdx[0] : viewportRowIdx;
                if (frozenRow) {
                    fIndexes = [frozenRow + viewportRowIdx, frozenCol];
                }
                if (this.parent.scrollSettings.isFinite) {
                    var colCount = skipHiddenIdx(sheet, sheet.colCount - 1, false, 'columns');
                    var startIdx = this.parent.viewport.leftIndex + frozenCol;
                    var endIndex = this.parent.viewport.rightIndex;
                    if (endIndex + hiddenIndex.length >= colCount) {
                        var index = skipHiddenIdx(sheet, startIdx - ((endIndex + hiddenIndex.length) - colCount), false, 'columns');
                        if (index >= frozenCol) {
                            this.parent.viewport.leftIndex = index;
                            this.parent.viewport.leftIndex -= this.parent.hiddenCount(endIndex, colCount);
                        }
                        this.parent.viewport.rightIndex = colCount;
                        if (startIdx !== (this.parent.viewport.leftIndex + frozenCol) || endIndex !== this.parent.viewport.rightIndex) {
                            this.parent.renderModule.refreshUI({ colIndex: this.parent.viewport.leftIndex, refresh: 'Column', frozenIndexes: fIndexes, rowIndex: rowIdx,
                                skipUpdateOnFirst: this.parent.viewport.leftIndex + frozenCol === skipHiddenIdx(sheet, frozenCol, true, 'columns') });
                            if (frozenRow) {
                                this.parent.viewport.topIndex = viewportRowIdx;
                            }
                        }
                        else {
                            this.parent.notify(updateTableWidth, { refresh: 'Column', isUpdate: true });
                        }
                        this.parent.selectRange(sheet.selectedRange);
                        return;
                    }
                }
                if (hiddenIndex.length <= this.parent.getThreshold('col')) {
                    var indexes = this.parent.skipHidden(this.parent.viewport.rightIndex + 1, this.parent.viewport.rightIndex + hiddenIndex.length, 'columns');
                    this.parent.viewport.rightIndex = indexes[1];
                    this.parent.renderModule.refreshUI({ rowIndex: rowIdx, colIndex: indexes[0], direction: '', refresh: 'ColumnPart', frozenIndexes: fIndexes }, "" + getRangeAddress([rowIdx, indexes[0], this.parent.viewport.bottomIndex, indexes[1]]));
                }
                else {
                    this.parent.renderModule.refreshUI({
                        skipUpdateOnFirst: this.parent.viewport.leftIndex + frozenCol === skipHiddenIdx(sheet, frozenCol, true, 'columns'), rowIndex: rowIdx, colIndex: this.parent.viewport.leftIndex,
                        refresh: 'Column', frozenIndexes: fIndexes
                    });
                    if (frozenRow) {
                        this.parent.viewport.topIndex = viewportRowIdx;
                    }
                }
            }
            this.parent.selectRange(sheet.selectedRange);
        }
        else {
            if (beforeViewportIdx.length && this.parent.scrollSettings.enableVirtualization) {
                beforeViewportIdx.sort(function (i, j) { return i - j; });
                var leftIdx = beforeViewportIdx[0] - 1 < frozenCol ? frozenCol : beforeViewportIdx[0] - 1;
                this.parent.updateTopLeftCell(null, skipHiddenIdx(sheet, leftIdx, true, 'columns') - frozenCol, 'row');
                this.parent.renderModule.refreshSheet(false, false, true);
                if (args.autoFit) {
                    args.autoFit = false;
                }
                return;
            }
            if ((!this.parent.scrollSettings.isFinite || this.parent.viewport.rightIndex < skipColCount) &&
                (hiddenIndex.length <= this.parent.getThreshold('col') || !this.parent.scrollSettings.enableVirtualization
                    || args.freezePane)) {
                this.appendCell(sheet, hiddenIndex, getRowIndexes(), table, hTable, args.freezePane);
                if (this.parent.scrollSettings.enableVirtualization && !args.freezePane) {
                    this.parent.notify(virtualContentLoaded, { refresh: 'Column', prevRowColCnt: { rowCount: sheet.rowCount, colCount: sheet.colCount } });
                }
                this.parent.selectRange(sheet.selectedRange);
            }
            else {
                this.parent.renderModule.refreshSheet(false, false, true);
            }
        }
    };
    ShowHide.prototype.removeCell = function (sheet, indexes, rowIdxs, table, hTable) {
        var _this = this;
        var startIdx = rowIdxs[0];
        var endIdx = rowIdxs[1];
        var rowIdx = 0;
        var len = indexes.length - 1;
        var frozenRow = this.parent.frozenRowCount(sheet);
        var colgrp = table.getElementsByTagName('colgroup')[0];
        var cellIdx = this.parent.getViewportIndex(indexes[0], true) + 1;
        var lastFreezeRow = skipHiddenIdx(sheet, frozenRow - 1, false);
        var hRow;
        var row;
        var hColgrp;
        var cell;
        var nextIdx;
        if (sheet.showHeaders) {
            hColgrp = hTable.getElementsByTagName('colgroup')[0];
            hRow = hTable.rows[0];
        }
        while (startIdx <= endIdx) {
            if (isHiddenRow(sheet, startIdx)) {
                startIdx++;
                continue;
            }
            row = frozenRow && startIdx < frozenRow ? hTable.rows[rowIdx + 1] : table.rows[rowIdx];
            indexes.forEach(function (idx, index) {
                if (rowIdx === 0 && startIdx >= frozenRow) {
                    if (sheet.showHeaders) {
                        detach(hColgrp.children[cellIdx]);
                        detach(hRow.cells[cellIdx]);
                    }
                    detach(colgrp.children[cellIdx]);
                }
                detach(row.cells[cellIdx]);
                if (index === 0) {
                    cell = getCell(startIdx, idx, sheet, false, true);
                    if ((cell.colSpan !== undefined && (cell.rowSpan === undefined || cell.colSpan > 1)) || (cell.rowSpan < 0 &&
                        startIdx - 1 > -1 && isHiddenRow(sheet, startIdx - 1) && Math.abs(cell.rowSpan) ===
                        _this.parent.hiddenCount(startIdx + cell.rowSpan, startIdx, 'rows', sheet))) {
                        _this.parent.notify(hiddenMerge, { rowIdx: startIdx, colIdx: idx, model: 'col', start: indexes[0], end: indexes[len] });
                    }
                }
                if (index === len) {
                    nextIdx = skipHiddenIdx(sheet, idx + 1, true, 'columns');
                    var borderLeft = _this.parent.getCellStyleValue(['borderLeft'], [rowIdx, nextIdx]).borderLeft;
                    if (borderLeft !== '') {
                        _this.parent.notify(applyCellFormat, {
                            onActionUpdate: false, rowIdx: rowIdx, colIdx: nextIdx,
                            style: { borderLeft: borderLeft }, row: row, first: ''
                        });
                    }
                    cell = getCell(startIdx, idx, sheet) || {};
                    if ((cell.colSpan !== undefined && (cell.rowSpan === undefined || cell.colSpan > 1)) || (cell.rowSpan < 0 &&
                        startIdx - 1 > -1 && isHiddenRow(sheet, startIdx - 1) && Math.abs(cell.rowSpan) ===
                        _this.parent.hiddenCount(startIdx + cell.rowSpan, startIdx, 'rows', sheet))) {
                        _this.parent.notify(hiddenMerge, {
                            rowIdx: startIdx, colIdx: idx, model: 'col',
                            start: indexes[0], end: indexes[len], isEnd: true
                        });
                    }
                }
            });
            if (frozenRow && startIdx === lastFreezeRow) {
                rowIdx = 0;
                startIdx = this.parent.viewport.topIndex + frozenRow;
            }
            else {
                rowIdx++;
                startIdx++;
            }
        }
        if (cellIdx - 1 > -1 && sheet.showHeaders && hRow.cells[cellIdx - 1]) {
            hRow.cells[cellIdx - 1].classList.add('e-hide-start');
        }
        if (sheet.showHeaders && hRow.cells[cellIdx]) {
            hRow.cells[cellIdx].classList.add('e-hide-end');
        }
    };
    ShowHide.prototype.appendCell = function (sheet, indexes, rowIdxs, table, hTable, skip) {
        var _this = this;
        var startIdx = rowIdxs[0];
        var endIdx = rowIdxs[1];
        var rowIdx = 0;
        var len = indexes.length - 1;
        var hRow;
        var row;
        var hColgrp;
        var prevIdx;
        var frozenRow = this.parent.frozenRowCount(sheet);
        var colgrp = table.getElementsByTagName('colgroup')[0];
        if (sheet.showHeaders) {
            hColgrp = hTable.getElementsByTagName('colgroup')[0];
            hRow = hTable.rows[0];
        }
        var cellRenderer = this.parent.serviceLocator.getService('cell');
        indexes.sort(function (i, j) { return i - j; });
        var mergeCollection = [];
        var cellIdx = [];
        var cell;
        var refCell;
        var cellModel;
        var firstFrozenRow = skipHiddenIdx(sheet, frozenRow - 1, false);
        var cellArgs;
        while (startIdx <= endIdx) {
            if (isHiddenRow(sheet, startIdx)) {
                startIdx++;
                continue;
            }
            row = frozenRow && startIdx < frozenRow ? hTable.rows[rowIdx + 1] : table.rows[rowIdx];
            indexes.forEach(function (idx, index) {
                if (rowIdx === 0) {
                    cellIdx[index] = _this.parent.getViewportIndex(idx, true);
                    if (sheet.showHeaders) {
                        refCell = hRow.cells[cellIdx[index]];
                        if (refCell) {
                            if (index === 0 && indexes[index] && !isHiddenCol(sheet, indexes[index] - 1) &&
                                refCell.previousSibling) {
                                refCell.previousElementSibling.classList.remove('e-hide-start');
                            }
                            if (index === len) {
                                refCell.classList.remove('e-hide-end');
                            }
                        }
                    }
                    if (startIdx >= frozenRow) {
                        if (colgrp.children[cellIdx[index]]) {
                            colgrp.insertBefore(_this.parent.sheetModule.updateCol(sheet, idx), colgrp.children[cellIdx[index]]);
                            if (sheet.showHeaders) {
                                cellRenderer.renderColHeader(idx, hRow, refCell);
                            }
                        }
                        else {
                            colgrp.appendChild(_this.parent.sheetModule.updateCol(sheet, idx));
                            if (sheet.showHeaders) {
                                cellRenderer.renderColHeader(idx, hRow);
                            }
                        }
                        if (!skip) {
                            detach(colgrp.lastChild);
                            if (sheet.showHeaders) {
                                detach(hRow.lastChild);
                            }
                        }
                        if (sheet.showHeaders && index === len) {
                            detach(hColgrp);
                            hTable.insertBefore(colgrp.cloneNode(true), hTable.tHead);
                        }
                    }
                }
                if (!skip) {
                    detach(row.lastChild);
                }
                refCell = row.cells[cellIdx[index]];
                cellArgs = {
                    rowIdx: startIdx, colIdx: idx, cell: getCell(startIdx, idx, sheet), row: row,
                    address: getCellAddress(startIdx, idx), lastCell: idx === len, isHeightCheckNeeded: true,
                    first: idx !== skipHiddenIdx(sheet, 0, true, 'columns') && idx === _this.parent.viewport.leftIndex ? 'Column' : '',
                    checkNextBorder: index === len ? 'Column' : '', checkCF: true
                };
                if (refCell) {
                    cellArgs.refChild = refCell;
                }
                cell = cellRenderer.render(cellArgs);
                if (index === 0 && cell.previousSibling) {
                    var borderLeft = _this.parent.getCellStyleValue(['borderLeft'], [rowIdx, skipHiddenIdx(sheet, indexes[indexes.length - 1] + 1, true, 'columns')]).borderLeft;
                    if (borderLeft !== '') {
                        prevIdx = skipHiddenIdx(sheet, indexes[0] - 1, false, 'columns');
                        if (prevIdx > -1 && !_this.parent.getCellStyleValue(['borderRight'], [rowIdx, prevIdx]).borderRight &&
                            !_this.parent.getCellStyleValue(['borderLeft'], [rowIdx, indexes[0]]).borderLeft) {
                            cell.previousSibling.style.borderRight = '';
                        }
                    }
                }
                cellModel = getCell(startIdx, idx, sheet) || {};
                if ((cellModel.colSpan !== undefined && (cellModel.rowSpan === undefined || cellModel.colSpan > 1)) ||
                    (cellModel.rowSpan < 0 && startIdx - 1 > -1 && isHiddenRow(sheet, startIdx - 1) &&
                        Math.abs(cellModel.rowSpan) === _this.parent.hiddenCount(startIdx + cellModel.rowSpan, startIdx, 'rows', sheet))) {
                    var mergeArgs = {
                        range: [startIdx, idx, startIdx, idx], isAction: false, merge: true,
                        type: 'All', skipChecking: true
                    };
                    _this.parent.notify(activeCellMergedRange, mergeArgs);
                    if (!mergeCollection.length || mergeArgs.range[1] !== mergeCollection[mergeCollection.length - 1].range[1] ||
                        mergeArgs.range[0] !== mergeCollection[mergeCollection.length - 1].range[0]) {
                        mergeCollection.push(mergeArgs);
                    }
                }
            });
            if (frozenRow && startIdx === firstFrozenRow) {
                startIdx = this.parent.viewport.topIndex + frozenRow;
                rowIdx = 0;
            }
            else {
                startIdx++;
                rowIdx++;
            }
        }
        mergeCollection.forEach(function (mergeArgs) { _this.parent.notify(setMerge, mergeArgs); });
        this.parent.viewport.rightIndex = skipHiddenIdx(sheet, this.parent.viewport.rightIndex - indexes.length, false, 'columns');
    };
    ShowHide.prototype.refreshChart = function (index, showHide) {
        this.parent.notify(refreshChart, { rIdx: index, showHide: showHide });
    };
    ShowHide.prototype.refreshChartCellModel = function (prevChartIndexes, currentChartIndexes) {
        this.parent.notify(refreshChartCellModel, { prevChartIndexes: prevChartIndexes, currentChartIndexes: currentChartIndexes });
    };
    ShowHide.prototype.addEventListener = function () {
        this.parent.on(hideShow, this.hideShow, this);
        this.parent.on(spreadsheetDestroyed, this.destroy, this);
    };
    ShowHide.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    ShowHide.prototype.removeEventListener = function () {
        this.parent.off(hideShow, this.hideShow);
        this.parent.off(spreadsheetDestroyed, this.destroy);
    };
    return ShowHide;
}());
export { ShowHide };
