import { formatUnit, detach, attributes, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { getCellIndexes, getRangeIndexes, skipHiddenIdx, applyCF, updateMergeBorder } from './../../workbook/common/index';
import { getColumnsWidth, getColumnWidth } from '../../workbook/index';
import { contentLoaded, editOperation, getUpdateUsingRaf, removeAllChildren } from '../common/index';
import { beforeContentLoaded, getColGroupWidth, virtualContentLoaded, setAriaOptions, dataBound } from '../common/index';
import { created, spreadsheetDestroyed, getDPRValue, spreadsheetCreated } from '../common/index';
import { checkMerge, forRefSelRender, initiateEdit, chartRangeSelection, rowHeightChanged } from '../common/index';
import { colWidthChanged, clearUndoRedoCollection, getUpdatedScrollPosition, locale } from '../common/index';
import { getCell, getRowsHeight, getRowHeight } from '../../workbook/index';
/**
 * Sheet module is used to render Sheet
 *
 * @hidden
 */
var SheetRender = /** @class */ (function () {
    function SheetRender(parent) {
        this.colGroupWidth = 30; //Row header and selectall table colgroup width
        this.parent = parent;
        this.col = parent.createElement('col');
        this.rowRenderer = parent.serviceLocator.getService('row');
        this.cellRenderer = parent.serviceLocator.getService('cell');
        this.addEventListener();
    }
    SheetRender.prototype.refreshSelectALLContent = function () {
        var cell;
        var sheet = this.parent.getActiveSheet();
        if (sheet.frozenColumns || sheet.frozenRows) {
            var tHead = this.getSelectAllTable().querySelector('thead');
            var row = this.rowRenderer.render();
            tHead.appendChild(row);
            cell = this.parent.createElement('th', { className: 'e-select-all-cell' });
            row.appendChild(cell);
        }
        else {
            cell = this.headerPanel.firstElementChild;
            cell.classList.add('e-select-all-cell');
        }
        cell.appendChild(this.parent.createElement('button', {
            className: 'e-selectall', id: this.parent.element.id + "_select_all",
            attrs: { 'aria-label': this.parent.serviceLocator.getService(locale).getConstant('SelectAll'), 'type': 'button' }
        }));
    };
    SheetRender.prototype.updateLeftColGroup = function (width, rowHdr) {
        if (width) {
            this.colGroupWidth = width;
        }
        if (!rowHdr) {
            rowHdr = this.getRowHeaderPanel();
        }
        var table = rowHdr.querySelector('table');
        var sheet = this.parent.getActiveSheet();
        var frag = document.createDocumentFragment(); // Using a fragment for batch updates
        var colGrp;
        if (width) {
            table.querySelector('colgroup').firstElementChild.style.width = this.colGroupWidth + "px";
        }
        else {
            colGrp = this.parent.createElement('colgroup');
            var col = this.col.cloneNode();
            col.style.width = this.colGroupWidth + "px";
            frag.appendChild(col);
            colGrp.appendChild(frag);
            table.insertBefore(colGrp, table.querySelector('tbody'));
        }
        if (sheet.frozenRows || sheet.frozenColumns) {
            table = this.getSelectAllTable();
            if (width) {
                table.querySelector('colgroup').firstElementChild.style.width = this.colGroupWidth + "px";
            }
            else {
                table.insertBefore(colGrp.cloneNode(true), table.querySelector('thead'));
            }
        }
        this.setPanelWidth(sheet, rowHdr);
        this.setPanelHeight(sheet);
    };
    SheetRender.prototype.setPanelWidth = function (sheet, rowHdr, isRtlChange) {
        var scrollSize = this.getScrollSize(true);
        var width = this.getRowHeaderWidth(sheet);
        var isRtl = this.parent.enableRtl;
        var offset = isRtl ? 'right' : 'left';
        var rtlOffset;
        var colHeaderPanel = this.getColHeaderPanel();
        var contentPanel = this.getContentPanel();
        if (isRtlChange) {
            rtlOffset = isRtl ? 'left' : 'right';
            contentPanel.style["" + rtlOffset] = colHeaderPanel.style["" + rtlOffset] = '';
        }
        if (sheet.frozenColumns) {
            var frozenCol = document.getElementById(this.parent.element.id + '_sheet').getElementsByClassName('e-frozen-column')[0];
            frozenCol.style.height = "calc(100% - " + scrollSize + "px)";
            if (isRtlChange) {
                frozenCol.style["" + rtlOffset] = '';
            }
            frozenCol.style["" + offset] = width - getDPRValue(1) + 'Px';
            frozenCol.style.display = '';
        }
        var widthCalc = "calc(100% - " + width + "px)";
        this.setHeaderPanelWidth(this.getSelectAllContent(), width);
        colHeaderPanel.style.width = widthCalc;
        colHeaderPanel.style["" + offset] = width + 'px';
        this.setHeaderPanelWidth(rowHdr, width);
        contentPanel.style.width = widthCalc;
        contentPanel.style["" + offset] = width + 'px';
        var scroll = (this.contentPanel.nextElementSibling ? this.contentPanel.nextElementSibling : null);
        if (scroll) {
            if (scrollSize) {
                scroll.style.height = scrollSize + 1 + 'px';
            }
            else {
                scroll.style.height = '1px';
                scroll.style.borderTopWidth = '0px';
            }
            scroll = scroll.firstElementChild;
            if (isRtlChange) {
                scroll.style["" + rtlOffset] = '';
            }
            scroll.style["" + offset] = width + 'px';
            scroll.style.width = widthCalc;
            if (Browser.userAgent.indexOf('Mac OS') > -1 && Browser.info.name === 'safari') {
                scroll.style.height = '7px';
                scroll.style.top = '-7px';
            }
        }
    };
    SheetRender.prototype.getScrollSize = function (addOffset) {
        var scrollSize = parseInt(this.headerPanel.style[this.parent.enableRtl ? 'margin-left' : 'margin-right'], 10);
        return scrollSize ? scrollSize + (addOffset ? 1 : 0) : 0;
    };
    SheetRender.prototype.setHeaderPanelWidth = function (content, width) {
        var emptyCol = [].slice.call(content.querySelectorAll('col.e-empty'));
        emptyCol.forEach(function (col) {
            width += parseInt(col.style.width, 10);
        });
        content.style.width = width + 'px';
    };
    SheetRender.prototype.setPanelHeight = function (sheet) {
        var scrollSize = this.getScrollSize(true);
        var contentPanel = this.contentPanel;
        var headerPanel = this.headerPanel;
        if (sheet.frozenRows) {
            var frozenHeight = this.getColHeaderHeight(sheet);
            if (!sheet.showHeaders && !sheet.frozenColumns) {
                headerPanel.style.height = frozenHeight + 'px';
            }
            else {
                headerPanel.style.height = '';
            }
            contentPanel.style.height = "calc(100% - " + (frozenHeight + scrollSize) + "px)";
            var frozenRow = document.getElementById(this.parent.element.id + '_sheet').getElementsByClassName('e-frozen-row')[0];
            frozenRow.style.width = Browser.isDevice ? '100%' : "calc(100% - " + scrollSize + "px)";
            frozenRow.style.top = frozenHeight - 1 - (sheet.showHeaders ? 1 : 0) + 'px';
            frozenRow.style.display = '';
        }
        else {
            contentPanel.style.height = "calc(100% - " + ((sheet.showHeaders ? getDPRValue(31) : 0) + scrollSize) + "px)";
        }
    };
    SheetRender.prototype.renderPanel = function () {
        this.contentPanel = this.parent.createElement('div', { className: 'e-main-panel', attrs: { 'tabindex': '0' } });
        var sheet = this.parent.getActiveSheet();
        var id = this.parent.element.id;
        var frag = document.createDocumentFragment();
        var rowHeader = this.parent.createElement('div', { className: 'e-row-header', id: id + "_row_header" });
        frag.appendChild(rowHeader);
        this.initHeaderPanel();
        if (this.parent.allowScrolling) {
            this.parent.scrollModule.setPadding();
        }
        var sheetEle = document.getElementById(this.parent.element.id + '_sheet');
        if (sheet.frozenColumns) {
            sheetEle.classList.add('e-frozen-columns');
        }
        if (sheet.frozenRows) {
            sheetEle.classList.add('e-frozen-rows');
        }
        this.updateHideHeaders(sheet, sheetEle);
        if (!sheet.showGridLines) {
            sheetEle.classList.add('e-hide-gridlines');
        }
        var content = this.parent.createElement('div', { className: 'e-sheet-content', id: id + "_main_content" });
        frag.appendChild(content);
        if (!this.parent.allowScrolling) {
            content.style.overflow = 'hidden';
        }
        if (sheet.frozenRows) {
            sheetEle.appendChild(this.parent.createElement('div', { className: 'e-frozen-row', styles: 'display: none' }));
        }
        if (sheet.frozenColumns) {
            sheetEle.appendChild(this.parent.createElement('div', { className: 'e-frozen-column', styles: 'display: none' }));
        }
        if (Browser.userAgent.indexOf('Mac OS') > -1 && Browser.info.name === 'safari') {
            sheetEle.classList.add('e-mac-safari');
        }
        this.contentPanel.appendChild(frag); // Append all created elements to the content panel in a single operation using fragment.
    };
    SheetRender.prototype.initHeaderPanel = function () {
        var id = this.parent.element.id;
        var frag = document.createDocumentFragment();
        this.headerPanel = this.parent.createElement('div', { className: 'e-header-panel' });
        var selectAllContainer = this.parent.createElement('div', { className: 'e-selectall-container', id: id + "_selectall" });
        frag.appendChild(selectAllContainer);
        var columnHeader = this.parent.createElement('div', { className: 'e-column-header', id: id + "_col_header" });
        frag.appendChild(columnHeader);
        this.headerPanel.appendChild(frag);
    };
    SheetRender.prototype.createHeaderTable = function () {
        var rowHdrEle = this.contentPanel.querySelector('.e-row-header');
        var sheet = this.parent.getActiveSheet();
        if (sheet.frozenRows || sheet.frozenColumns) {
            this.updateTable(sheet.frozenRows ? ['thead', 'tbody'] : ['thead'], 'selectall', this.headerPanel.querySelector('.e-selectall-container'));
        }
        this.updateTable(sheet.frozenRows ? ['thead', 'tbody'] : ['thead'], 'colhdr', this.headerPanel.querySelector('.e-column-header'));
        this.updateTable(['tbody'], 'rowhdr', rowHdrEle);
        this.updateLeftColGroup(null, rowHdrEle);
    };
    SheetRender.prototype.updateTable = function (tagName, name, appendTo) {
        var _this = this;
        var frag = document.createDocumentFragment();
        var table = this.parent.createElement('table', {
            className: "e-table e-" + name + "-table", attrs: { 'role': 'grid' }
        });
        tagName.forEach(function (tag) { frag.appendChild(_this.parent.createElement(tag)); });
        table.appendChild(frag);
        appendTo.appendChild(table);
    };
    /**
     * It is used to refresh the select all, row header, column header and content of the spreadsheet.
     *
     * @param {SheetRenderArgs} args - Specifies the cells, indexes, direction, skipUpdateOnFirst, top, left, initload properties.
     * @returns {void}
     */
    SheetRender.prototype.renderTable = function (args) {
        var _this = this;
        var indexes;
        var row;
        var hRow;
        var sheet = this.parent.getActiveSheet();
        var cell;
        var cellArgs;
        var mergeBorderRows = [];
        var frag = document.createDocumentFragment();
        frag.appendChild(this.headerPanel);
        frag.appendChild(this.contentPanel);
        if (this.parent.allowScrolling) {
            var scrollPanel = this.parent.createElement('div', { className: 'e-scrollbar' });
            scrollPanel.appendChild(this.parent.createElement('div', { className: 'e-scroller' }));
            frag.appendChild(scrollPanel);
        }
        this.createHeaderTable();
        this.updateTable(['tbody'], 'content', this.contentPanel.lastElementChild);
        var colGrp = this.parent.createElement('colgroup');
        var col;
        var cTBody = this.contentPanel.querySelector('.e-sheet-content tbody');
        this.refreshSelectALLContent();
        var selectAllColGrp = this.getSelectAllContent().querySelector('colgroup');
        var rowHdrColGrp = this.getRowHeaderPanel().querySelector('colgroup');
        var selectAllHdrRow = this.getSelectAllContent().querySelector('thead .e-header-row');
        var rHdrTBody = this.contentPanel.querySelector('.e-row-header tbody');
        var selectAllTBody = this.getSelectAllContent().querySelector('tbody');
        var cHdrTHead = this.headerPanel.querySelector('.e-column-header thead');
        var cHdrTBody = this.headerPanel.querySelector('.e-column-header tbody');
        var cHdrRow = this.rowRenderer.render();
        cHdrTHead.appendChild(cHdrRow);
        this.getColHeaderTable().insertBefore(colGrp, cHdrTHead);
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        var lastFrozenCol = skipHiddenIdx(sheet, frozenCol - 1, false, 'columns');
        this.parent.notify(beforeContentLoaded, { top: args.top, left: args.left });
        var colCount = sheet.colCount.toString();
        var rowCount = sheet.colCount.toString();
        var layout = args.top && args.left ? 'RowColumn' : (args.top ? 'Row' : (args.left ? 'Column' : ''));
        this.parent.getColHeaderTable().setAttribute('aria-colcount', colCount);
        this.parent.getRowHeaderTable().setAttribute('aria-rowcount', rowCount);
        var emptyRow;
        attributes(this.parent.getContentTable(), { 'aria-rowcount': rowCount, 'aria-colcount': colCount });
        args.cells.forEach(function (value, key) {
            indexes = getRangeIndexes(key);
            if (indexes[1] === args.indexes[1] || !row) {
                if (indexes[1] === args.indexes[1]) {
                    hRow = _this.rowRenderer.render(indexes[0], true);
                }
                if (frozenCol && frozenRow && indexes[1] < frozenCol && indexes[0] < frozenRow) {
                    emptyRow = selectAllTBody.querySelector('.e-empty');
                    if (emptyRow) {
                        selectAllTBody.insertBefore(hRow, emptyRow);
                    }
                    else {
                        selectAllTBody.appendChild(hRow);
                    }
                    row = hRow;
                }
                else if (frozenCol && indexes[1] < frozenCol) {
                    rHdrTBody.appendChild(hRow);
                    row = hRow;
                }
                else {
                    row = _this.rowRenderer.render(indexes[0]);
                    if (frozenRow && indexes[0] < frozenRow) {
                        emptyRow = cHdrTBody.querySelector('.e-empty');
                        if (emptyRow) {
                            cHdrTBody.insertBefore(row, emptyRow);
                        }
                        else {
                            cHdrTBody.appendChild(row);
                        }
                    }
                    else {
                        cTBody.appendChild(row);
                    }
                    if (indexes[1] === args.indexes[1]) {
                        if (frozenRow && indexes[0] < frozenRow) {
                            selectAllTBody.appendChild(hRow);
                        }
                        else {
                            rHdrTBody.appendChild(hRow);
                        }
                    }
                }
                if (indexes[1] === args.indexes[1]) {
                    _this.cellRenderer.renderRowHeader(indexes[0], hRow);
                }
            }
            cellArgs = { colIdx: indexes[1], rowIdx: indexes[0], cell: value, mergeBorderRows: mergeBorderRows,
                address: key, lastCell: indexes[1] === args.indexes[3], isHeightCheckNeeded: true, row: row, hRow: hRow,
                pRow: row.previousSibling, pHRow: hRow.previousSibling, isRefreshing: args.isRefreshing,
                first: layout ? (layout.includes('Row') ? (indexes[0] === args.indexes[0] ? 'Row' : (layout.includes('Column') ? (indexes[1] === args.indexes[1] ? 'Column' : '') : '')) : (indexes[1] === args.indexes[1] ? 'Column' : '')) : '' };
            cell = _this.cellRenderer.render(cellArgs);
            var notFirstRow = _this.parent.scrollSettings.enableVirtualization && _this.parent.viewport.topIndex !==
                skipHiddenIdx(sheet, 0, true);
            var notFirstCol = _this.parent.scrollSettings.enableVirtualization && _this.parent.viewport.leftIndex !==
                skipHiddenIdx(sheet, 0, true, 'columns');
            if (notFirstRow) {
                _this.checkRowMerge(indexes, args.indexes, cell, value, sheet);
            }
            if (notFirstCol) {
                _this.checkColMerge(indexes, args.indexes, cell, value, sheet);
            }
            if (frozenCol && indexes[1] === lastFrozenCol) {
                row = null;
            }
            if (indexes[0] === args.indexes[0]) {
                if (frozenCol && indexes[1] < frozenCol) {
                    col = _this.updateCol(sheet, indexes[1], selectAllColGrp);
                    var empty = rowHdrColGrp.querySelector('.e-empty');
                    if (empty) {
                        rowHdrColGrp.insertBefore(col.cloneNode(true), empty);
                    }
                    else {
                        rowHdrColGrp.appendChild(col.cloneNode(true));
                    }
                    _this.cellRenderer.renderColHeader(indexes[1], selectAllHdrRow);
                }
                else {
                    _this.updateCol(sheet, indexes[1], colGrp);
                    _this.cellRenderer.renderColHeader(indexes[1], cHdrRow);
                }
            }
        });
        if (this.parent.isReact) {
            this.parent['renderReactTemplates']();
        }
        updateMergeBorder(this.parent, mergeBorderRows);
        cTBody.parentElement.insertBefore(colGrp.cloneNode(true), cTBody);
        getUpdateUsingRaf(function () {
            if (!_this.parent) {
                return;
            }
            var content = _this.parent.getMainContent();
            var sheetContent = document.getElementById(_this.parent.element.id + '_sheet');
            if (sheetContent.childElementCount && sheetContent.querySelector('.e-header-panel') !== _this.headerPanel) {
                var sheetChild = sheetContent.children;
                for (var i = 0; i < sheetChild.length; i++) {
                    if (!sheetChild[i].classList.contains('e-frozen-row') &&
                        !sheetChild[i].classList.contains('e-frozen-column') &&
                        !sheetChild[i].classList.contains('e-ss-overlay')) {
                        sheetContent.removeChild(sheetChild[i]);
                    }
                }
            }
            sheetContent.appendChild(frag);
            sheetContent.style.backgroundColor = '';
            if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
                _this.parent.notify(applyCF, { indexes: args.indexes });
            }
            _this.checkRowHeightChanged(args, sheet);
            if (args.top) {
                content.parentElement.scrollTop = args.top;
            }
            if (args.left) {
                content.scrollLeft = args.left;
                _this.parent.getColumnHeaderContent().scrollLeft = args.left;
            }
            _this.parent.notify(contentLoaded, args);
            _this.checkTableWidth(sheet);
            _this.parent.notify(editOperation, { action: 'renderEditor', initLoad: args.initLoad && !_this.parent.isOpen });
            if (!args.initLoad && !_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(content, { busy: false });
            _this.parent.trigger(dataBound, {});
            if (_this.parent.isEdit) {
                _this.parent.notify(initiateEdit, null);
            }
            if (args.openOptions && args.openOptions.eventArgs && args.openOptions.eventArgs.triggerEvent) {
                _this.parent.trigger('openComplete', { response: args.openOptions });
            }
            if (args.initLoad) {
                var triggerEvent = true;
                if (_this.parent.scrollSettings.enableVirtualization) {
                    for (var i = 0; i < sheet.ranges.length; i++) {
                        if (sheet.ranges[i].info.count - 1 > _this.parent.viewport.bottomIndex) {
                            triggerEvent = false;
                            break;
                        }
                    }
                }
                if (triggerEvent) {
                    if (_this.parent.isReact) {
                        setTimeout(function () {
                            if (!_this.parent) {
                                return;
                            }
                            _this.triggerCreatedEvent();
                        });
                    }
                    else {
                        _this.triggerCreatedEvent();
                    }
                }
                else if (!_this.parent.isOpen) {
                    _this.parent.hideSpinner();
                }
            }
        });
    };
    SheetRender.prototype.triggerCreatedEvent = function () {
        if (!this.parent.isOpen) {
            this.parent.hideSpinner();
        }
        if (this.parent.createdHandler) {
            if (this.parent.createdHandler.observers) {
                this.parent['created'].observers =
                    this.parent.createdHandler.observers;
                if (this.parent.isAngular &&
                    this.parent.createdHandler.currentObservers) {
                    this.parent['created'].currentObservers =
                        this.parent.createdHandler.currentObservers;
                }
            }
            else {
                this.parent.setProperties({ created: this.parent.createdHandler }, true);
            }
            this.parent.createdHandler = undefined;
            this.parent.trigger(created, null);
            if (this.parent) {
                this.parent.notify(clearUndoRedoCollection, null);
            }
        }
        if (this.parent) {
            this.parent.notify(spreadsheetCreated, null);
        }
    };
    /**
     * This method is used to check whether row height increased above the viewport after import
     *
     * @param {Object} args - Specify the args.
     * @param {number} args.top - Specify the top value.
     * @param {number} args.left - Specify the left value.
     * @param {SheetModel} sheet - Specify the sheet.
     * @returns {void} - This method is used to check whether row height increased above the viewport after import
     */
    SheetRender.prototype.checkRowHeightChanged = function (args, sheet) {
        var eventArgs = { top: args.top, left: args.left, sheet: sheet };
        this.parent.notify(getUpdatedScrollPosition, eventArgs);
        if (args.top !== eventArgs.top) {
            if (this.parent.scrollModule && this.parent.scrollModule.offset.top.idx && (eventArgs.top - args.top) <
                getRowHeight(sheet, this.parent.scrollModule.offset.top.idx)) {
                this.parent.scrollModule.offset.top.size = eventArgs.top;
            }
            args.top = eventArgs.top;
        }
        if (args.left !== eventArgs.left) {
            if (this.parent.scrollModule && this.parent.scrollModule.offset.left.idx && (eventArgs.left - args.left) <
                getColumnWidth(sheet, this.parent.scrollModule.offset.left.idx)) {
                this.parent.scrollModule.offset.left.size = eventArgs.left;
            }
            args.left = eventArgs.left;
        }
    };
    SheetRender.prototype.checkTableWidth = function (sheet) {
        if (this.parent.scrollSettings.isFinite && !this.parent.scrollSettings.enableVirtualization && sheet.colCount - 1 ===
            this.parent.viewport.rightIndex) {
            var cellsWidth = getColumnsWidth(sheet, this.parent.viewport.leftIndex + this.parent.frozenColCount(sheet), this.parent.viewport.rightIndex);
            var rowHdrWidth = this.getRowHeaderWidth(sheet);
            var scrollSize = this.getScrollSize();
            if (cellsWidth < this.contentPanel.getBoundingClientRect().width - rowHdrWidth - scrollSize) {
                this.getContentPanel().style.width = cellsWidth + 'px';
                this.getColHeaderPanel().style.width = cellsWidth + 'px';
            }
            else if (!this.getContentPanel().style.width.includes('calc')) {
                this.getContentPanel().style.width = "calc(100% - " + rowHdrWidth + "px)";
                this.getColHeaderPanel().style.width = "calc(100% - " + rowHdrWidth + "px)";
            }
        }
    };
    SheetRender.prototype.clearCFResult = function (sheet) {
        if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
            sheet.conditionalFormats.forEach(function (cfRule) {
                delete cfRule.result;
            });
        }
    };
    SheetRender.prototype.refreshColumnContent = function (args) {
        var _this = this;
        var row;
        var count = 0;
        var sheet = this.parent.getActiveSheet();
        var cellArgs;
        var mergeBorderRows = [];
        var frag = document.createDocumentFragment();
        var hFrag = document.createDocumentFragment();
        var tBody = this.parent.element.querySelector('.e-sheet-content tbody');
        var hTBody = this.parent.element.querySelector('.e-column-header tbody');
        var colGrp = this.parent.element.querySelector('.e-sheet-content colgroup');
        colGrp = colGrp.cloneNode();
        frag.appendChild(colGrp);
        tBody = frag.appendChild(tBody.cloneNode(true));
        var hColGrp = colGrp.cloneNode();
        hFrag.appendChild(hColGrp);
        var tHead = this.parent.element.querySelector('.e-column-header thead');
        tHead = hFrag.appendChild(tHead.cloneNode(true));
        var hRow = tHead.querySelector('tr');
        hRow.innerText = '';
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        if (frozenRow) {
            hTBody = hFrag.appendChild(hTBody.cloneNode(true));
        }
        var lastFrozenRow = skipHiddenIdx(sheet, frozenRow - 1, false);
        var notFirstRow = this.parent.scrollSettings.enableVirtualization && this.parent.viewport.topIndex !==
            skipHiddenIdx(sheet, 0, true);
        this.clearCFResult(sheet);
        args.cells.forEach(function (value, key) {
            var indexes = getRangeIndexes(key);
            if (indexes[0] === args.indexes[0]) {
                var col = _this.updateCol(sheet, indexes[1], hColGrp);
                colGrp.appendChild(col.cloneNode());
                _this.cellRenderer.renderColHeader(indexes[1], hRow);
            }
            if (indexes[1] - frozenCol === args.indexes[1]) {
                row = (indexes[0] < frozenRow) ? hTBody.children[count] : tBody.children[count];
                if (row) {
                    row.innerText = '';
                    count++;
                }
                else {
                    return;
                }
            }
            if (!row) {
                return;
            }
            cellArgs = {
                colIdx: indexes[1], rowIdx: indexes[0], cell: value, address: key, row: row, pRow: row.previousSibling,
                first: !args.skipUpdateOnFirst && indexes[1] === args.indexes[1] ? 'Column' :
                    (notFirstRow && indexes[0] === args.indexes[0] ? 'Row' : ''), isRefreshing: true, mergeBorderRows: mergeBorderRows
            };
            var cell = _this.cellRenderer.render(cellArgs);
            _this.checkColMerge(indexes, args.indexes, cell, value, sheet);
            if (frozenRow && indexes[0] === lastFrozenRow) {
                count = 0;
            } // Reset count for frozen row
        });
        var appendColumns = function () {
            var table = _this.getColHeaderTable();
            removeAllChildren(table);
            table.appendChild(hFrag);
            table = _this.getContentTable();
            removeAllChildren(table);
            table.appendChild(frag);
            _this.parent.notify(virtualContentLoaded, { refresh: 'Column', prevRowColCnt: args.prevRowColCnt });
            updateMergeBorder(_this.parent, mergeBorderRows);
            if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
                _this.parent.notify(applyCF, { indexes: args.indexes, isRender: true });
            }
            if (_this.parent.isEdit) {
                _this.parent.notify(forRefSelRender, {});
            }
            if (_this.parent.allowChart) {
                _this.parent.notify(chartRangeSelection, null);
            }
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
        };
        if (args.insertDelete) {
            appendColumns();
        }
        else {
            getUpdateUsingRaf(function () { return appendColumns(); });
        }
    };
    SheetRender.prototype.refreshRowContent = function (args) {
        var _this = this;
        var row;
        var hdrRow;
        var colGroupWidth = this.colGroupWidth;
        var sheet = this.parent.getActiveSheet();
        var cell;
        var cellArgs;
        var mergeBorderRows = [];
        var frag = document.createDocumentFragment();
        var hFrag = document.createDocumentFragment();
        var tBody = this.parent.createElement('tbody');
        var hTBody = tBody.cloneNode();
        hFrag.appendChild(hTBody);
        frag.appendChild(tBody);
        var frozenCol = this.parent.frozenColCount(sheet);
        var lastFrozenCol = skipHiddenIdx(sheet, frozenCol - 1, false, 'columns');
        var notFirstCol = this.parent.scrollSettings.enableVirtualization && this.parent.viewport.leftIndex !==
            skipHiddenIdx(sheet, 0, true, 'columns');
        this.clearCFResult(sheet);
        args.cells.forEach(function (value, key) {
            var indexes = getRangeIndexes(key);
            if (indexes[1] === args.indexes[1] || !row) {
                if (indexes[1] === args.indexes[1]) {
                    hdrRow = _this.rowRenderer.render(indexes[0], true);
                }
                if (frozenCol && indexes[1] < frozenCol) {
                    hTBody.appendChild(hdrRow);
                    row = hdrRow;
                }
                else {
                    if (indexes[1] === args.indexes[1]) {
                        hTBody.appendChild(hdrRow);
                    }
                    row = _this.rowRenderer.render(indexes[0]);
                    tBody.appendChild(row);
                }
                if (indexes[1] === args.indexes[1]) {
                    _this.cellRenderer.renderRowHeader(indexes[0], hdrRow);
                    colGroupWidth = getColGroupWidth(indexes[0] + 1);
                }
            }
            if (frozenCol) {
                hdrRow = hTBody.lastElementChild || hdrRow;
            }
            cellArgs = {
                rowIdx: indexes[0], colIdx: indexes[1], cell: value, address: key, lastCell: indexes[1] === args.indexes[3], row: row, hRow: hdrRow, pRow: row.previousSibling,
                pHRow: hdrRow.previousSibling, isHeightCheckNeeded: true, first: !args.skipUpdateOnFirst && indexes[0] === args.indexes[0] ?
                    'Row' : (notFirstCol && indexes[1] === args.indexes[1] ? 'Column' : ''), isRefreshing: true, mergeBorderRows: mergeBorderRows
            };
            cell = _this.cellRenderer.render(cellArgs);
            _this.checkRowMerge(indexes, args.indexes, cell, value, sheet);
            if (frozenCol && indexes[1] === lastFrozenCol) {
                row = null;
            }
        });
        if (this.colGroupWidth !== colGroupWidth) {
            this.updateLeftColGroup(colGroupWidth);
        }
        var rowHeaderTbody = this.contentPanel.querySelector('.e-row-header tbody');
        if (rowHeaderTbody) {
            detach(rowHeaderTbody);
            this.getRowHeaderTable().appendChild(hFrag);
        }
        var sheetContentTbody = this.contentPanel.querySelector('.e-sheet-content tbody');
        if (sheetContentTbody) {
            detach(sheetContentTbody);
            this.getContentTable().appendChild(frag);
        }
        this.parent.notify(virtualContentLoaded, { refresh: 'Row', prevRowColCnt: args.prevRowColCnt });
        updateMergeBorder(this.parent, mergeBorderRows);
        if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
            this.parent.notify(applyCF, { indexes: args.indexes, isRender: true });
        }
        if (this.parent.allowChart) {
            this.parent.notify(chartRangeSelection, {});
        }
        if (this.parent.isEdit) {
            this.parent.notify(forRefSelRender, null);
        }
        if (!this.parent.isOpen) {
            this.parent.hideSpinner();
        }
        setAriaOptions(this.parent.getMainContent(), { busy: false });
    };
    SheetRender.prototype.updateCol = function (sheet, idx, appendTo) {
        var col = this.col.cloneNode();
        col.style.width = formatUnit(getColumnWidth(sheet, idx, null, true));
        if (appendTo) {
            var empty = appendTo.querySelector('.e-empty');
            return empty ? appendTo.insertBefore(col, empty) : appendTo.appendChild(col);
        }
        else {
            return col;
        }
    };
    SheetRender.prototype.updateColContent = function (args) {
        var _this = this;
        getUpdateUsingRaf(function () {
            var row;
            var refChild;
            var rowCount = 0;
            var cell;
            var col;
            var skipRender;
            var cellArgs;
            var sheet = _this.parent.getActiveSheet();
            var mergeBorderRows = [];
            var hRow = _this.parent.element.querySelector('.e-column-header .e-header-row');
            var colGrp = _this.parent.element.querySelector('.e-sheet-content colgroup');
            var hColGrp = _this.parent.element.querySelector('.e-column-header colgroup');
            var hRefChild = hRow.firstElementChild;
            var colRefChild = colGrp.firstElementChild;
            var hColRefChild = hColGrp.firstElementChild;
            var tBody = _this.parent.element.querySelector('.e-sheet-content tbody');
            var hTBody = _this.parent.element.querySelector('.e-column-header tbody');
            var frozenRow = _this.parent.frozenRowCount(sheet);
            var frozenCol = _this.parent.frozenColCount(sheet);
            var lastFrozenRow = skipHiddenIdx(sheet, frozenRow - 1, false);
            var firstRow = skipHiddenIdx(sheet, args.indexes[0], true);
            _this.clearCFResult(sheet);
            args.cells.forEach(function (value, key) {
                if (skipRender) {
                    return;
                }
                var indexes = getRangeIndexes(key);
                if (args.direction === 'first' && indexes[1] === args.indexes[1]) {
                    _this.checkColMerge([indexes[0], _this.parent.viewport.leftIndex + frozenCol], args.indexes, ((indexes[0] < frozenRow ? hTBody : tBody).rows[rowCount] ||
                        { cells: [] }).cells[(args.indexes[3] - args.indexes[1]) + 1], getCell(indexes[0], _this.parent.viewport.leftIndex + frozenCol, sheet) || {}, sheet);
                }
                if (indexes[0] === firstRow) {
                    if (args.direction === 'last') {
                        col = _this.col.cloneNode();
                        col.style.width = formatUnit(getColumnWidth(sheet, indexes[1], null, true));
                        colGrp.insertBefore(col, colRefChild);
                        hColGrp.insertBefore(col.cloneNode(), hColRefChild);
                        _this.cellRenderer.renderColHeader(indexes[1], hRow, hRefChild);
                    }
                    else {
                        col = _this.updateCol(sheet, indexes[1], colGrp);
                        hColGrp.appendChild(col.cloneNode());
                        _this.cellRenderer.renderColHeader(indexes[1], hRow);
                    }
                    if (_this.parent.scrollSettings.enableVirtualization && args.direction) {
                        /* eslint-disable */
                        detach(colGrp[args.direction + 'ElementChild']);
                        detach(hColGrp[args.direction + 'ElementChild']);
                        detach(hRow[args.direction + 'ElementChild']);
                        /* eslint-enable */
                    }
                }
                if (indexes[1] === args.indexes[1]) {
                    if (indexes[0] < frozenRow) {
                        row = hTBody.children[rowCount];
                    }
                    else {
                        row = tBody.children[rowCount];
                        if (!row) {
                            skipRender = true;
                            return;
                        }
                    }
                    rowCount++;
                    refChild = row.firstElementChild;
                }
                cellArgs = {
                    colIdx: indexes[1], rowIdx: indexes[0], cell: value, address: key, row: row, pRow: row.previousSibling,
                    lastCell: indexes[1] === args.indexes[3], isHeightCheckNeeded: args.direction === 'first', first: args.direction ===
                        'last' && !args.skipUpdateOnFirst && indexes[1] === args.indexes[1] ? 'Column' : '', checkNextBorder: args.direction
                        === 'last' && indexes[3] === args.indexes[3] ? 'Column' : '', isRefreshing: args.direction === 'first',
                    mergeBorderRows: mergeBorderRows
                };
                if (args.direction === 'last') {
                    cellArgs.refChild = refChild;
                    cell = _this.cellRenderer.render(cellArgs);
                    _this.checkColMerge(indexes, args.indexes, cell, value, sheet, ((indexes[0] < frozenRow ? hTBody : tBody).rows[rowCount - 1] ||
                        { cells: [] }).cells[1]);
                }
                else {
                    cell = _this.cellRenderer.render(cellArgs);
                }
                if (_this.parent.scrollSettings.enableVirtualization && args.direction) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    detach(row[args.direction + 'ElementChild']);
                }
                if (frozenRow && indexes[0] === lastFrozenRow) {
                    rowCount = 0;
                }
            });
            _this.parent.notify(virtualContentLoaded, { refresh: 'Column', prevRowColCnt: args.prevRowColCnt });
            updateMergeBorder(_this.parent, mergeBorderRows);
            if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
                _this.parent.notify(applyCF, { indexes: args.indexes, isRender: true });
            }
            if (_this.parent.allowChart) {
                _this.parent.notify(chartRangeSelection, null);
            }
            if (_this.parent.isEdit) {
                _this.parent.notify(forRefSelRender, {});
            }
            if (!_this.parent.isOpen) {
                _this.parent.hideSpinner();
            }
            setAriaOptions(_this.parent.getMainContent(), { busy: false });
        });
    };
    SheetRender.prototype.updateRowContent = function (args) {
        var _this = this;
        var mainContent = this.parent.getMainContent();
        if (args.direction === '' && !mainContent.children.length) {
            return;
        }
        var row;
        var hRow;
        var cell;
        var firstRow;
        var cellArgs;
        var mergeBorderRows = [];
        var count = 0;
        var colGroupWidth = this.colGroupWidth;
        var sheet = this.parent.getActiveSheet();
        var tBody = mainContent.querySelector('tbody');
        var rTBody = this.parent.getRowHeaderContent().querySelector('tbody');
        var rFrag = document.createDocumentFragment();
        var frag = document.createDocumentFragment();
        this.parent.showSpinner();
        var frozenCol = this.parent.frozenColCount(sheet);
        var frozenRow = this.parent.frozenRowCount(sheet);
        var firstCol = skipHiddenIdx(sheet, args.indexes[1], true, 'columns');
        var lastFrozenCol = skipHiddenIdx(sheet, frozenCol - 1, false, 'columns');
        this.clearCFResult(sheet);
        args.cells.forEach(function (value, cKey) {
            var indexes = getRangeIndexes(cKey);
            var pHRow;
            var pRow;
            if (args.direction === 'first' && indexes[0] === args.indexes[0]) {
                pHRow = rTBody.rows[rTBody.rows.length - 1];
                pRow = tBody.rows[tBody.rows.length - 1];
                if (firstRow === undefined) {
                    firstRow = (indexes[1] < frozenCol ? rTBody : tBody).rows[(args.indexes[2] - args.indexes[0]) + 1] || null;
                }
                _this.checkRowMerge([_this.parent.viewport.topIndex + frozenRow, indexes[1]], args.indexes, (firstRow || { cells: [] }).cells[indexes[1] < frozenCol ? count + 1 : count], getCell(_this.parent.viewport.topIndex + frozenRow, indexes[1], sheet) || {}, sheet);
            }
            if (indexes[1] === firstCol || !row) {
                if (indexes[1] === firstCol) {
                    hRow = _this.rowRenderer.render(indexes[0], true);
                }
                if (frozenCol && indexes[1] < frozenCol) {
                    rFrag.appendChild(hRow);
                    row = hRow;
                }
                else {
                    row = _this.rowRenderer.render(indexes[0]);
                    frag.appendChild(row);
                    if (indexes[1] === firstCol) {
                        rFrag.appendChild(hRow);
                    }
                    if (_this.parent.scrollSettings.enableVirtualization && args.direction) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        detach(tBody[args.direction + 'ElementChild']);
                    }
                }
                if (indexes[1] === firstCol) {
                    _this.cellRenderer.renderRowHeader(indexes[0], hRow);
                    colGroupWidth = getColGroupWidth(indexes[0] + 1);
                    if (_this.parent.scrollSettings.enableVirtualization && args.direction) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        detach(rTBody[args.direction + 'ElementChild']);
                    }
                }
            }
            if (frozenCol) {
                hRow = rFrag.lastElementChild || hRow;
            }
            cellArgs = {
                colIdx: indexes[1], rowIdx: indexes[2], cell: value, address: cKey, row: row,
                lastCell: indexes[1] === args.indexes[3], pHRow: hRow.previousSibling || pHRow, checkNextBorder: args.direction === 'last' &&
                    indexes[2] === args.indexes[2] ? 'Row' : '', pRow: row.previousSibling || pRow, isHeightCheckNeeded: args.direction === 'first'
                    || args.direction === '', hRow: hRow, first: args.direction === 'last' && !args.skipUpdateOnFirst && indexes[0] ===
                    args.indexes[0] ? 'Row' : '', isRefreshing: args.direction === 'first', mergeBorderRows: mergeBorderRows
            };
            cell = _this.cellRenderer.render(cellArgs);
            if (args.direction === 'last' && tBody.rows.length) {
                _this.checkRowMerge(indexes, args.indexes, cell, value, sheet, (indexes[1] < frozenCol ? rTBody : tBody).rows[0].cells[indexes[1] < frozenCol ? count + 1 : count]);
            }
            count++;
            if (frozenCol && indexes[1] === lastFrozenCol) {
                row = null;
                firstRow = undefined;
                count = 0;
            }
        });
        if (this.colGroupWidth !== colGroupWidth) {
            this.updateLeftColGroup(colGroupWidth);
        }
        if (args.direction === 'last') {
            rTBody.insertBefore(rFrag, rTBody.firstElementChild);
            tBody.insertBefore(frag, tBody.firstElementChild);
        }
        else {
            rTBody.appendChild(rFrag);
            tBody.appendChild(frag);
        }
        if (this.parent.scrollSettings.enableVirtualization) {
            this.parent.notify(virtualContentLoaded, { refresh: 'Row', prevRowColCnt: args.prevRowColCnt });
        }
        updateMergeBorder(this.parent, mergeBorderRows);
        if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
            this.parent.notify(applyCF, { indexes: args.indexes, isRender: true });
        }
        if (this.parent.isEdit) {
            this.parent.notify(forRefSelRender, null);
        }
        if (this.parent.allowChart) {
            this.parent.notify(chartRangeSelection, {});
        }
        if (!this.parent.isOpen) {
            this.parent.hideSpinner();
        }
        setAriaOptions(this.parent.getMainContent(), { busy: false });
    };
    SheetRender.prototype.checkRowMerge = function (indexes, range, cell, model, sheet, firstcell) {
        if (this.parent.scrollSettings.enableVirtualization && cell &&
            (!isNullOrUndefined(model.rowSpan) || !isNullOrUndefined(model.colSpan))) {
            var frozenRow = this.parent.frozenRowCount(sheet);
            var viewportTopIdx = this.parent.viewport.topIndex + frozenRow;
            if (indexes[0] === viewportTopIdx) {
                if (model.rowSpan < 0) {
                    var args = { td: cell, rowIdx: indexes[0], colIdx: indexes[1], isRow: true,
                        isFreezePane: true
                    };
                    this.parent.notify(checkMerge, args);
                    if (args.insideFreezePane) {
                        return;
                    }
                    if (viewportTopIdx >= range[2]) {
                        this.refreshPrevMerge(range[2] + 1, indexes[1]);
                    }
                }
                if (firstcell) {
                    this.refreshFirstCell(indexes[0] + (range[2] - range[0]) + 1, indexes[1], sheet, firstcell);
                }
            }
            else if (model.rowSpan > 1) {
                var prevTopIdx = range[2] + 1;
                if (indexes[0] + model.rowSpan - 1 >= prevTopIdx && indexes[0] < prevTopIdx) {
                    this.refreshPrevMerge(prevTopIdx, indexes[1], viewportTopIdx);
                }
            }
        }
    };
    SheetRender.prototype.refreshPrevMerge = function (prevTopIdx, colIndex, currTopIdx) {
        var td = this.parent.getCell(prevTopIdx, colIndex, this.parent.getRow(currTopIdx ?
            currTopIdx : 0, null, colIndex));
        if (td) {
            this.cellRenderer.refresh(prevTopIdx, colIndex, null, td);
        }
    };
    SheetRender.prototype.refreshFirstCell = function (rowIdx, colIdex, sheet, firstcell) {
        var cell = getCell(rowIdx, colIdex, sheet, false, true);
        if (cell.rowSpan < 0 || cell.colSpan < 0) {
            this.cellRenderer.refresh(rowIdx, colIdex, null, firstcell);
        }
    };
    SheetRender.prototype.checkColMerge = function (indexes, range, cell, model, sheet, firstcell) {
        if (this.parent.scrollSettings.enableVirtualization && cell && (!isNullOrUndefined(model.rowSpan) ||
            !isNullOrUndefined(model.colSpan))) {
            var frozenCol = this.parent.frozenColCount(sheet);
            var viewportLeftIdx = this.parent.viewport.leftIndex + frozenCol;
            if (indexes[1] === viewportLeftIdx) {
                if (model.colSpan < 0) {
                    var e = {
                        td: cell,
                        colIdx: indexes[1], rowIdx: indexes[0], isFreezePane: true
                    };
                    this.parent.notify(checkMerge, e);
                    if (e.insideFreezePane) {
                        return;
                    }
                    if (viewportLeftIdx >= range[3]) {
                        var td = this.parent.getCell(indexes[0], indexes[3] + 1, this.parent.getRow(indexes[0], null, indexes[3] + 1));
                        if (td) {
                            this.cellRenderer.refresh(indexes[0], range[3] + 1, null, td);
                        }
                    }
                }
                if (firstcell) {
                    this.refreshFirstCell(indexes[0], indexes[1] + (range[3] - range[1]) + 1, sheet, firstcell);
                }
            }
            else if (model.colSpan > 1) {
                if (indexes[1] + model.colSpan - 1 >= range[3] + 1 && indexes[1] < range[3] + 1) {
                    var td = this.parent.getCell(indexes[0], indexes[3] + 1, this.parent.getRow(indexes[0], null, indexes[3] + 1));
                    if (td) {
                        this.cellRenderer.refresh(indexes[0], range[3] + 1, null, td);
                    }
                }
            }
        }
    };
    SheetRender.prototype.toggleGridlines = function () {
        var sheetElem = document.getElementById(this.parent.element.id + '_sheet');
        if (this.parent.getActiveSheet().showGridLines) {
            sheetElem.classList.remove('e-hide-gridlines');
        }
        else {
            sheetElem.classList.add('e-hide-gridlines');
        }
    };
    /**
     * Used to toggle row and column headers.
     *
     * @returns {void}
     */
    SheetRender.prototype.showHideHeaders = function () {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        getUpdateUsingRaf(function () {
            if (sheet.showHeaders) {
                var content = _this.getContentPanel();
                _this.setPanelWidth(sheet, _this.getRowHeaderPanel());
                _this.setPanelHeight(sheet);
                document.getElementById(_this.parent.element.id + '_sheet').classList.remove('e-hide-headers');
                _this.getColHeaderPanel().scrollLeft = content.scrollLeft;
                _this.parent.selectRange(sheet.selectedRange);
            }
            else {
                _this.updateHideHeaders(sheet, document.getElementById(_this.parent.element.id + '_sheet'));
                _this.setPanelHeight(sheet);
                if (_this.parent.frozenColCount(sheet) || _this.parent.frozenRowCount(sheet)) {
                    _this.setPanelWidth(sheet, _this.getRowHeaderPanel());
                    _this.parent.selectRange(sheet.selectedRange);
                }
                else {
                    _this.getContentPanel().style.width = '';
                    _this.getContentPanel().style[_this.parent.enableRtl ? 'right' : 'left'] = '';
                }
                _this.getScrollElement().style.left = _this.getRowHeaderWidth(sheet) + 'px';
            }
        });
    };
    SheetRender.prototype.updateHideHeaders = function (sheet, ele) {
        if (!sheet.showHeaders) {
            ele.classList.add('e-hide-headers');
        }
    };
    SheetRender.prototype.rowHeightChanged = function (args) {
        if (args.threshold || args.isHideShow) {
            var sheet = this.parent.getActiveSheet();
            if (args.rowIdx < this.parent.frozenRowCount(sheet)) {
                this.setPanelHeight(sheet);
            }
        }
    };
    SheetRender.prototype.colWidthChanged = function (args) {
        if (args.threshold || args.isHideShow) {
            var sheet = this.parent.getActiveSheet();
            if (args.colIdx < this.parent.frozenColCount(sheet)) {
                this.setPanelWidth(sheet, this.getRowHeaderPanel());
            }
            this.checkTableWidth(sheet);
        }
    };
    SheetRender.prototype.getRowHeaderWidth = function (sheet, skipFreezeCheck, addScaling) {
        var width = 0;
        var scaleX = addScaling ? this.parent.viewport.scaleX : 1;
        if (!skipFreezeCheck && sheet.frozenColumns) {
            var leftIdx = getCellIndexes(sheet.topLeftCell)[1];
            width = getColumnsWidth(sheet, leftIdx, leftIdx + sheet.frozenColumns - 1, true) / scaleX;
        }
        width += (sheet.showHeaders ? getDPRValue(this.colGroupWidth) / scaleX : 0);
        return width;
    };
    SheetRender.prototype.getColHeaderHeight = function (sheet, skipHeader) {
        var topIndex = getCellIndexes(sheet.topLeftCell)[0];
        return (sheet.showHeaders && !skipHeader ? getDPRValue(31) : 0) +
            getRowsHeight(sheet, topIndex, topIndex + sheet.frozenRows - 1, true);
    };
    /**
     * Get the select all table element of spreadsheet
     *
     * @returns {HTMLElement} - Select all content element.
     */
    SheetRender.prototype.getSelectAllContent = function () {
        return this.headerPanel.getElementsByClassName('e-selectall-container')[0];
    };
    /**
     * Get the horizontal scroll element of spreadsheet
     *
     * @returns {HTMLElement} - Select all content element.
     */
    SheetRender.prototype.getScrollElement = function () {
        var elem;
        if (this.contentPanel) {
            elem = (this.contentPanel.parentElement || this.contentPanel.nextElementSibling);
        }
        return elem && elem.querySelector('.e-scroller');
    };
    /**
     * Get the select all table element of spreadsheet
     *
     * @returns {HTMLTableElement} - Select all table element.
     */
    SheetRender.prototype.getSelectAllTable = function () {
        return this.headerPanel.getElementsByClassName('e-selectall-table')[0];
    };
    /**
     * Get the column header element of spreadsheet
     *
     * @returns {HTMLTableElement} - Column header table element.
     */
    SheetRender.prototype.getColHeaderTable = function () {
        return this.headerPanel.getElementsByClassName('e-colhdr-table')[0];
    };
    /**
     * Get the row header table element of spreadsheet
     *
     * @returns {HTMLTableElement} - Row header table element.
     */
    SheetRender.prototype.getRowHeaderTable = function () {
        return this.contentPanel.getElementsByClassName('e-rowhdr-table')[0];
    };
    /**
     * Get the main content table element of spreadsheet
     *
     * @returns {Element} - Content table element.
     */
    SheetRender.prototype.getContentTable = function () {
        return this.contentPanel.getElementsByClassName('e-content-table')[0];
    };
    /**
     * Get the row header div element of spreadsheet
     *
     * @returns {HTMLElement} - Row header panel element.
     */
    SheetRender.prototype.getRowHeaderPanel = function () {
        return this.contentPanel.getElementsByClassName('e-row-header')[0];
    };
    /**
     * Get the column header div element of spreadsheet
     *
     * @returns {HTMLElement} - Column header panel element.
     */
    SheetRender.prototype.getColHeaderPanel = function () {
        return this.headerPanel.getElementsByClassName('e-column-header')[0];
    };
    /**
     * Get the main content div element of spreadsheet
     *
     * @returns {HTMLElement} - Content panel element.
     */
    SheetRender.prototype.getContentPanel = function () {
        return this.contentPanel.getElementsByClassName('e-sheet-content')[0];
    };
    SheetRender.prototype.addEventListener = function () {
        this.parent.on(created, this.triggerCreatedEvent, this);
        this.parent.on(rowHeightChanged, this.rowHeightChanged, this);
        this.parent.on(colWidthChanged, this.colWidthChanged, this);
        this.parent.on(spreadsheetDestroyed, this.removeEventListener, this);
    };
    /**
     * Clears the internal properties of Sheet module.
     *
     * @returns {void}
     */
    SheetRender.prototype.destroy = function () {
        if (this.headerPanel) {
            removeAllChildren(this.headerPanel);
            this.headerPanel.remove();
        }
        this.headerPanel = null;
        if (this.contentPanel) {
            removeAllChildren(this.contentPanel);
            this.contentPanel.remove();
        }
        this.contentPanel = null;
        if (this.col) {
            removeAllChildren(this.col);
            this.col.remove();
        }
        this.col = null;
        this.rowRenderer = null;
        this.cellRenderer = null;
        this.colGroupWidth = null;
        this.parent = null;
    };
    SheetRender.prototype.removeEventListener = function () {
        this.parent.off(created, this.triggerCreatedEvent);
        this.parent.off(rowHeightChanged, this.rowHeightChanged);
        this.parent.off(colWidthChanged, this.colWidthChanged);
        this.parent.off(spreadsheetDestroyed, this.removeEventListener);
    };
    return SheetRender;
}());
export { SheetRender };
