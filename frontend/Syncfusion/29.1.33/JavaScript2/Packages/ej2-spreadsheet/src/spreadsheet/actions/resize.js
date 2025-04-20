import { getDPRValue, hideAutoFillElement, hideAutoFillOptions, positionAutoFillElement } from '../index';
import { closest, detach, EventHandler, initializeCSPTemplate, isNullOrUndefined } from '@syncfusion/ej2-base';
import { Tooltip } from '@syncfusion/ej2-popups';
import { colWidthChanged, rowHeightChanged, contentLoaded, getFilterRange, getTextWidth, getExcludedColumnWidth, readonlyAlert } from '../common/index';
import { setResize, autoFit, completeAction, setAutoFit, refreshFilterCellsOnResize } from '../common/index';
import { setRowHeight, isHiddenRow, getRowHeight, getColumnWidth, setColumn, isHiddenCol, getSheet, getRow } from '../../workbook/base/index';
import { getColumn, setRow, getCell } from '../../workbook/base/index';
import { getRangeIndexes, getSwapRange, getCellIndexes, setMerge, isRowSelected, beginAction, isReadOnlyCells } from '../../workbook/common/index';
import { getFormattedCellObject, hideShow } from '../../workbook/common/index';
import { propertyChange } from '../common/index';
/**
 * The `Resize` module is used to handle the resizing functionalities in Spreadsheet.
 */
var Resize = /** @class */ (function () {
    /**
     * Constructor for resize module in Spreadsheet.
     *
     * @param {Spreadsheet} parent - Constructor for resize module in Spreadsheet.
     * @private
     */
    function Resize(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Resize.prototype.addEventListener = function () {
        this.parent.on(contentLoaded, this.wireEvents, this);
        this.parent.on(autoFit, this.autoFit, this);
        this.parent.on(setAutoFit, this.setAutoFitHandler, this);
        this.parent.on(propertyChange, this.propertyChange, this);
    };
    Resize.prototype.autoFit = function (args) {
        var element = args.isRow ? this.parent.getRowHeaderTable() : this.parent.getColHeaderTable().rows[0];
        for (var i = args.startIndex; i <= args.endIndex; i++) {
            this.trgtEle = args.isRow ? this.parent.getRow(i, element) :
                this.parent.getCell(null, i, element);
            this.setAutofit(i, !args.isRow);
        }
    };
    Resize.prototype.wireEvents = function () {
        var rowHeader = this.parent.getRowHeaderContent();
        var colHeader = this.parent.element.getElementsByClassName('e-header-panel')[0];
        if (!colHeader) {
            return;
        }
        EventHandler.add(colHeader, 'dblclick', this.dblClickHandler, this);
        EventHandler.add(rowHeader, 'dblclick', this.dblClickHandler, this);
        EventHandler.add(colHeader, 'mousedown', this.mouseDownHandler, this);
        EventHandler.add(rowHeader, 'mousedown', this.mouseDownHandler, this);
        this.wireResizeCursorEvent(rowHeader, colHeader);
    };
    Resize.prototype.wireResizeCursorEvent = function (rowHeader, colHeader) {
        EventHandler.add(rowHeader, 'mousemove', this.setTarget, this);
        EventHandler.add(colHeader, 'mousemove', this.setTarget, this);
    };
    Resize.prototype.unWireResizeCursorEvent = function () {
        EventHandler.remove(this.parent.getRowHeaderContent(), 'mousemove', this.setTarget);
        var headerPanel = this.parent.element.getElementsByClassName('e-header-panel')[0];
        if (headerPanel) {
            EventHandler.remove(headerPanel, 'mousemove', this.setTarget);
        }
    };
    Resize.prototype.unwireEvents = function () {
        var rowHeader = this.parent.getRowHeaderContent();
        var colHeader = this.parent.element.getElementsByClassName('e-header-panel')[0];
        if (!colHeader) {
            return;
        }
        EventHandler.remove(colHeader, 'dblclick', this.dblClickHandler);
        EventHandler.remove(rowHeader, 'dblclick', this.dblClickHandler);
        EventHandler.remove(colHeader, 'mousedown', this.mouseDownHandler);
        EventHandler.remove(rowHeader, 'mousedown', this.mouseDownHandler);
        this.unWireResizeCursorEvent();
    };
    Resize.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(contentLoaded, this.wireEvents);
            this.parent.off(autoFit, this.autoFit);
            this.parent.off(setAutoFit, this.setAutoFitHandler);
            this.parent.off(propertyChange, this.propertyChange);
        }
    };
    Resize.prototype.mouseMoveHandler = function (e) {
        var colResizeHandler = this.parent.element.getElementsByClassName('e-colresize-handler')[0];
        var rowResizeHandler = this.parent.element.getElementsByClassName('e-rowresize-handler')[0];
        this.resizeTooltip(null, true, e);
        if (colResizeHandler || rowResizeHandler) {
            this.isMouseMoved = true;
            var isRtl = this.parent.enableRtl;
            if (colResizeHandler) {
                if (isRtl ? (e.x < this.trgtEle.parentElement.firstChild.getBoundingClientRect().right) :
                    (e.x > this.trgtEle.parentElement.firstChild.getBoundingClientRect().left)) {
                    colResizeHandler.style.left = e.clientX -
                        document.getElementById(this.parent.element.id + '_sheet').getBoundingClientRect().left + 'px';
                }
            }
            else if (rowResizeHandler) {
                if (e.y >= this.trgtEle.parentElement.parentElement.firstChild.getBoundingClientRect().top) {
                    rowResizeHandler.style.top = e.clientY -
                        document.getElementById(this.parent.element.id + '_sheet').getBoundingClientRect().top + 'px';
                }
            }
        }
    };
    Resize.prototype.mouseDownHandler = function (e) {
        if (!closest(e.target, '.e-header-cell') || e.target.className.includes('e-filter-icon')) {
            return;
        }
        this.event = e;
        this.trgtEle = e.target;
        if (this.trgtEle.parentElement.classList.contains('e-hide-end') || this.trgtEle.classList.contains('e-hide-end')) {
            var offsetSize = this.trgtEle.offsetHeight;
            var offset = e.offsetY;
            if ((offsetSize >= 10 && offset < 5) || (offsetSize - 2 < 8 && offset < Math.ceil((offset - 2) / 2))) {
                this.trgtEle.classList.add('e-skip-resize');
            }
        }
        this.updateTarget(e, this.trgtEle);
        var trgt = this.trgtEle;
        var className = trgt.classList.contains('e-colresize') ? 'e-colresize-handler' :
            trgt.classList.contains('e-rowresize') ? 'e-rowresize-handler' : '';
        this.createResizeHandler(trgt, className);
        this.unWireResizeCursorEvent();
        EventHandler.add(this.parent.element, 'mousemove', this.mouseMoveHandler, this);
        EventHandler.add(document, 'mouseup', this.mouseUpHandler, this);
    };
    Resize.prototype.mouseUpHandler = function (e) {
        var resizeHandler = this.parent.element.getElementsByClassName('e-resize-handle')[0];
        this.resizeOn(e);
        this.isMouseMoved = null;
        var HeaderTooltip = document.querySelector('.e-header-tooltip');
        if (resizeHandler) {
            detach(resizeHandler);
            this.updateCursor();
        }
        if (HeaderTooltip) {
            HeaderTooltip.remove();
        }
        EventHandler.remove(document, 'mouseup', this.mouseUpHandler);
        EventHandler.remove(this.parent.element, 'mousemove', this.mouseMoveHandler);
        var colHeader = this.parent.element.getElementsByClassName('e-header-panel')[0];
        if (colHeader) {
            this.wireResizeCursorEvent(this.parent.getRowHeaderContent(), colHeader);
        }
        this.parent.notify(positionAutoFillElement, null);
        this.parent.notify(hideAutoFillOptions, null);
    };
    Resize.prototype.dblClickHandler = function (e) {
        if (!closest(e.target, '.e-header-cell') || e.target.className.includes('e-filter-icon')) {
            return;
        }
        this.trgtEle = e.target;
        var skipUnhideRowCol = this.updateTarget(e, this.trgtEle);
        if (skipUnhideRowCol) {
            this.parent.notify(readonlyAlert, null);
            return;
        }
        if (this.trgtEle.classList.contains('e-colresize')) {
            var colIndx = parseInt(this.trgtEle.getAttribute('aria-colindex'), 10) - 1;
            var prevWidth = getColumnWidth(this.parent.getActiveSheet(), colIndx) + "px";
            if (this.trgtEle.classList.contains('e-unhide-column')) {
                this.showHiddenColumns(colIndx - 1);
            }
            else {
                this.setAutofit(colIndx, true, prevWidth, this.trgtEle);
            }
        }
        else if (this.trgtEle.classList.contains('e-rowresize')) {
            var rowIndx = parseInt(this.trgtEle.parentElement.getAttribute('aria-rowindex'), 10) - 1;
            var prevHeight = getRowHeight(this.parent.getActiveSheet(), rowIndx) + "px";
            this.setAutofit(rowIndx, false, prevHeight);
        }
        this.parent.notify(positionAutoFillElement, null);
    };
    Resize.prototype.setTarget = function (e) {
        if (this.parent.isEdit || !closest(e.target, '.e-header-cell') || e.target.className.includes('e-filter-icon')) {
            return;
        }
        var trgt = e.target;
        var sheet = this.parent.getActiveSheet();
        if (sheet.isProtected && (!sheet.protectSettings.formatColumns || !sheet.protectSettings.formatRows)) {
            if (!sheet.protectSettings.formatRows && !sheet.protectSettings.formatColumns) {
                return;
            }
            if (sheet.protectSettings.formatRows) {
                if (closest(trgt, '.e-colhdr-table')) {
                    return;
                }
            }
            if (sheet.protectSettings.formatColumns) {
                if (closest(trgt, '.e-rowhdr-table')) {
                    return;
                }
            }
        }
        var newTrgt;
        var tOffsetV;
        var eOffsetV;
        var tClass;
        if (closest(trgt, '.e-header-row')) {
            tOffsetV = trgt.offsetWidth;
            tClass = 'e-colresize';
            eOffsetV = this.parent.enableRtl ? (tOffsetV - e.offsetX) : e.offsetX;
            var prevSibling = this.getColPrevSibling(trgt);
            if (prevSibling && !prevSibling.classList.contains('e-select-all-cell')) {
                newTrgt = prevSibling;
            }
            else {
                if (Number(trgt.getAttribute('aria-colindex')) > 1) {
                    newTrgt = trgt;
                }
            }
        }
        else if (closest(trgt, '.e-row')) {
            eOffsetV = e.offsetY;
            tOffsetV = trgt.offsetHeight;
            tClass = 'e-rowresize';
            var prevSibling = this.getRowPrevSibling(trgt);
            if (prevSibling) {
                newTrgt = prevSibling.firstElementChild;
            }
            else {
                if (Number(trgt.parentElement.getAttribute('aria-rowindex')) > 1) {
                    newTrgt = trgt;
                }
            }
        }
        if (tOffsetV - 2 < 8 && eOffsetV !== Math.ceil((tOffsetV - 2) / 2)) {
            if (eOffsetV < Math.ceil((tOffsetV - 2) / 2)) {
                trgt.classList.add(tClass);
                if (newTrgt) {
                    newTrgt.classList.add(tClass);
                }
            }
            else if (eOffsetV > Math.ceil((tOffsetV - 2) / 2)) {
                trgt.classList.add(tClass);
            }
        }
        else if (tOffsetV - 5 < eOffsetV && eOffsetV <= tOffsetV && tOffsetV >= 10) {
            trgt.classList.add(tClass);
        }
        else if (eOffsetV < 5 && newTrgt && tOffsetV >= 10) {
            trgt.classList.add(tClass);
            newTrgt.classList.add(tClass);
        }
        else {
            var resEle = this.parent.element.getElementsByClassName(tClass);
            for (var index = 0; index < resEle.length; index++) {
                resEle[index].classList.remove(tClass);
            }
        }
    };
    Resize.prototype.getColPrevSibling = function (trgt) {
        var frozenCol = this.parent.frozenColCount(this.parent.getActiveSheet());
        return trgt.previousElementSibling || (frozenCol && closest(trgt, '.e-column-header') ?
            this.parent.getSelectAllContent().querySelector('.e-header-row').lastElementChild : null);
    };
    Resize.prototype.getRowPrevSibling = function (trgt) {
        var frozenRow = this.parent.frozenRowCount(this.parent.getActiveSheet());
        return trgt.parentElement.previousElementSibling || (frozenRow && closest(trgt, '.e-row-header') ?
            this.parent.getSelectAllContent().querySelector('tbody').lastElementChild : null);
    };
    Resize.prototype.updateTarget = function (e, trgt) {
        if (closest(trgt, '.e-header-row')) {
            var offsetX = this.parent.enableRtl ? (trgt.offsetWidth - e.offsetX) : e.offsetX;
            if ((trgt.offsetWidth < 10 && offsetX < Math.ceil((trgt.offsetWidth - 2) / 2)) || (offsetX < 5 &&
                trgt.offsetWidth >= 10) && trgt.classList.contains('e-colresize')) {
                var sheet = this.parent.getActiveSheet();
                var prevIdx = Number(this.trgtEle.getAttribute('aria-colindex')) - 2;
                var prevSibling = this.getColPrevSibling(trgt);
                if (prevSibling && !isHiddenCol(sheet, prevIdx)) {
                    this.trgtEle = prevSibling;
                }
                else {
                    if (prevIdx > -1) {
                        var colModel = getColumn(sheet, prevIdx);
                        if (colModel.isReadOnly || isReadOnlyCells(this.parent, [0, prevIdx, sheet.rowCount - 1, prevIdx])) {
                            return true;
                        }
                        this.trgtEle.classList.add('e-unhide-column');
                    }
                }
            }
        }
        else {
            if ((trgt.offsetHeight < 10 && e.offsetY < Math.ceil((trgt.offsetHeight - 2) / 2)) || (e.offsetY < 5 &&
                trgt.offsetHeight >= 10) && trgt.classList.contains('e-rowresize')) {
                var sheet = this.parent.getActiveSheet();
                var prevIdx = Number(trgt.parentElement.getAttribute('aria-rowindex')) - 2;
                var prevSibling = this.getRowPrevSibling(trgt);
                if (prevSibling || isHiddenRow(sheet, prevIdx)) {
                    if (e.type === 'dblclick' && isHiddenRow(sheet, prevIdx)) {
                        var rowModel = getRow(sheet, prevIdx);
                        if (rowModel.isReadOnly || isReadOnlyCells(this.parent, [prevIdx, 0, prevIdx, sheet.colCount - 1])) {
                            return true;
                        }
                        var selectRange = getSwapRange(getRangeIndexes(sheet.selectedRange));
                        var eventArgs = void 0;
                        if (prevIdx <= selectRange[2] && prevIdx > selectRange[0] && isRowSelected(sheet, selectRange)) {
                            eventArgs = { startIndex: selectRange[0], endIndex: selectRange[2], hide: false, autoFit: true };
                        }
                        else {
                            eventArgs = { startIndex: prevIdx, endIndex: prevIdx, hide: false, autoFit: true };
                        }
                        this.parent.notify(hideShow, eventArgs);
                    }
                    else {
                        if (!isHiddenRow(sheet, prevIdx)) {
                            this.trgtEle = prevSibling.getElementsByClassName('e-header-cell')[0];
                        }
                    }
                }
            }
        }
        return false;
    };
    Resize.prototype.setAutoFitHandler = function (args) {
        if (args.isCol && isHiddenCol(this.parent.getActiveSheet(), args.idx)) {
            this.showHiddenColumns(args.idx);
        }
        else {
            this.setAutofit(args.idx, args.isCol, null, null, args.sheetIdx);
        }
    };
    Resize.prototype.getWrapText = function (text, colwidth, style) {
        var _this = this;
        var textArr = text.toString().split(' ');
        var spaceWidth = getTextWidth(' ', style, this.parent.cellStyle);
        var width;
        var textWidth = 0;
        var prevWidth = 0;
        var displayText = text;
        var val = '';
        var setDisplayText = function () {
            var curWidth = parseInt(prevWidth.toString(), 10);
            if (curWidth > textWidth || (curWidth === textWidth && getTextWidth(val.trim(), style, _this.parent.cellStyle) >
                getTextWidth(displayText, style, _this.parent.cellStyle))) {
                displayText = val.trim();
                textWidth = curWidth;
            }
        };
        textArr.forEach(function (txt, index) {
            width = getTextWidth(txt, style, _this.parent.cellStyle);
            if ((prevWidth + width) / colwidth > 1) {
                setDisplayText();
                val = '';
                prevWidth = width;
            }
            else {
                width += ((prevWidth + width + spaceWidth) / colwidth >= 1 ? 0 : spaceWidth);
                prevWidth += width;
            }
            val += txt + ' ';
            if (index === textArr.length - 1) {
                setDisplayText();
            }
        });
        return displayText;
    };
    Resize.prototype.setAutofit = function (idx, isCol, prevData, hdrCell, sheetIdx) {
        var _this = this;
        var sheet = !isNullOrUndefined(sheetIdx) ? getSheet(this.parent, sheetIdx) : this.parent.getActiveSheet();
        var autoFitWithHeader;
        var isActiveSheet = !isNullOrUndefined(sheetIdx) ? sheetIdx === this.parent.activeSheetIndex : true;
        if (hdrCell) {
            var eventArgs = { cancel: false, index: idx, isCol: isCol,
                sheetIndex: this.parent.activeSheetIndex };
            if (isCol) {
                eventArgs.oldWidth = prevData;
                eventArgs.autoFitWithHeader = false;
            }
            else {
                eventArgs.oldHeight = prevData;
            }
            this.parent.notify(beginAction, { eventArgs: eventArgs, action: 'resizeToFit' });
            if (eventArgs.cancel) {
                return;
            }
            autoFitWithHeader = eventArgs.autoFitWithHeader;
        }
        var oldValue;
        var cell = {};
        var cellEle;
        var colGrp;
        var wrapCell;
        var table = this.parent.createElement('table', { className: this.parent.getContentTable().className + ' e-resizetable', styles: 'height: auto' });
        var tBody = this.parent.createElement('tbody');
        var rowEle = this.parent.createElement('tr', { className: 'e-row' });
        var tdEle = this.parent.createElement('td', { className: 'e-cell' });
        var tableWidth = 0;
        var colWidth = 0;
        if (isCol) {
            var row_1;
            table.style.width = 'auto';
            var appendRow = function (content) {
                cellEle = tdEle.cloneNode();
                cellEle.textContent = content;
                cellEle.style.fontFamily = (cell.style && cell.style.fontFamily) || _this.parent.cellStyle.fontFamily;
                cellEle.style.fontSize = (cell.style && cell.style.fontSize) || _this.parent.cellStyle.fontSize;
                cellEle.style.fontWeight = (cell.style && cell.style.fontWeight) || _this.parent.cellStyle.fontWeight;
                row_1 = rowEle.cloneNode();
                row_1.appendChild(cellEle);
                tBody.appendChild(row_1);
            };
            if (autoFitWithHeader) {
                appendRow(hdrCell.textContent);
            }
            for (var rowIdx = 0, len = sheet.rows.length; rowIdx < len; rowIdx++) {
                cell = getCell(rowIdx, idx, sheet);
                if (cell && cell.value) {
                    if (cell.wrap) {
                        wrapCell = true;
                        appendRow(this.getWrapText(this.parent.getDisplayText(cell), getExcludedColumnWidth(sheet, idx, idx, cell.colSpan > 1 ? idx + cell.colSpan - 1 : idx), cell.style));
                    }
                    else {
                        appendRow(this.parent.getDisplayText(cell));
                    }
                }
            }
            oldValue = getColumnWidth(sheet, idx);
        }
        else {
            var colLength = sheet.rows[idx] && sheet.rows[idx].cells ?
                sheet.rows[idx].cells.length : 0;
            colGrp = this.parent.createElement('colgroup');
            for (var colIdx = 0; colIdx < colLength; colIdx++) {
                cell = getCell(idx, colIdx, sheet);
                if (cell) {
                    cellEle = tdEle.cloneNode();
                    if (cell.wrap) {
                        cellEle.classList.add('e-wraptext');
                    }
                    cellEle.textContent = this.parent.getDisplayText(cell);
                    cellEle.style.fontFamily = (cell.style && cell.style.fontFamily) || this.parent.cellStyle.fontFamily;
                    cellEle.style.fontSize = (cell.style && cell.style.fontSize) || this.parent.cellStyle.fontSize;
                    rowEle.appendChild(cellEle);
                    colWidth = (cell.colSpan && cell.colSpan >= 1) ? this.getMergedColumnsWidth(cell.colSpan, colIdx, sheet) :
                        (cell.colSpan && cell.colSpan < 1) ? 0 : getColumnWidth(sheet, colIdx, false, true);
                    tableWidth += colWidth;
                    colGrp.appendChild(this.parent.createElement('col', { styles: "width:" + colWidth + "px" }));
                }
            }
            table.appendChild(colGrp);
            tBody.appendChild(rowEle);
            oldValue = getRowHeight(sheet, idx);
        }
        table.appendChild(tBody);
        if (tableWidth) {
            table.style.width = tableWidth + 'px';
        }
        var wrapper = this.parent.createElement('div', { className: this.parent.element.className, styles: 'display: block' });
        wrapper.appendChild(table);
        document.body.appendChild(wrapper);
        var offset = table.getBoundingClientRect();
        document.body.removeChild(wrapper);
        var fitSize = Math.ceil(isCol ? offset.width : offset.height);
        var autofitValue = (isCol ? this.getFloatingElementWidth(fitSize + (wrapCell ? 1 : 0), idx) : fitSize) || oldValue;
        var threshold;
        if (isCol) {
            if (autofitValue > 0) {
                threshold = -(oldValue - autofitValue);
            }
            else {
                threshold = -oldValue;
            }
            var frozenCol = this.parent.frozenColCount(sheet);
            if ((frozenCol && idx >= getRangeIndexes(sheet.topLeftCell)[1] && idx < frozenCol) ||
                (idx >= this.parent.viewport.leftIndex + frozenCol && idx <= this.parent.viewport.rightIndex)) {
                getColumn(sheet, idx).width = autofitValue > 0 ? autofitValue : 0;
                if (isActiveSheet) {
                    this.resizeStart(idx, this.parent.getViewportIndex(idx, true), autofitValue + 'px', isCol, true, prevData);
                    this.parent.notify(colWidthChanged, { threshold: threshold, colIdx: idx });
                }
            }
            else {
                if (isActiveSheet) {
                    this.parent.notify(colWidthChanged, { threshold: threshold, colIdx: idx });
                }
                getColumn(sheet, idx).width = autofitValue > 0 ? autofitValue : 0;
            }
        }
        else {
            var frozenRow = this.parent.frozenRowCount(sheet);
            autofitValue = autofitValue > 20 ? autofitValue : 20;
            threshold = -(oldValue - autofitValue);
            if ((frozenRow && idx >= getRangeIndexes(sheet.topLeftCell)[0] && idx < frozenRow) ||
                (idx >= this.parent.viewport.topIndex + frozenRow && idx <= this.parent.viewport.bottomIndex)) {
                setRowHeight(sheet, idx, autofitValue);
                setRow(sheet, idx, { customHeight: false });
                if (isActiveSheet) {
                    this.resizeStart(idx, this.parent.getViewportIndex(idx), autofitValue + 'px', isCol, true, prevData);
                    this.parent.notify(rowHeightChanged, { threshold: threshold, rowIdx: idx });
                }
            }
            else {
                if (isActiveSheet) {
                    this.parent.notify(rowHeightChanged, { threshold: threshold, rowIdx: idx });
                }
                setRowHeight(sheet, idx, autofitValue);
            }
        }
        if (isActiveSheet) {
            this.parent.selectRange(sheet.selectedRange);
        }
    };
    Resize.prototype.getMergedColumnsWidth = function (colSpan, colIndex, sheet) {
        var columnWidth = 0;
        for (var i = 0; i < colSpan; i++) {
            columnWidth += getColumnWidth(sheet, colIndex, false, true);
            colIndex++;
        }
        return columnWidth;
    };
    Resize.prototype.createResizeHandler = function (trgt, className) {
        var editor = this.parent.createElement('div', { className: className });
        editor.classList.add('e-resize-handle');
        var sheet = document.getElementById(this.parent.element.id + '_sheet');
        if (trgt.classList.contains('e-colresize')) {
            editor.style.height = this.parent.getMainContent().parentElement.clientHeight + this.parent.getColumnHeaderContent().offsetHeight + 'px';
            editor.style.left = this.event.clientX - sheet.getBoundingClientRect().left + 'px';
            editor.style.top = '0px';
        }
        else if (trgt.classList.contains('e-rowresize')) {
            editor.style.width = this.parent.getMainContent().parentElement.clientWidth + 'px';
            editor.style.left = '0px';
            editor.style.top = this.event.clientY - sheet.getBoundingClientRect().top + 'px';
        }
        sheet.appendChild(editor);
        this.resizeTooltip(trgt, false);
        this.updateCursor();
    };
    Resize.prototype.resizeTooltip = function (trgt, isResize, e) {
        if (isResize) {
            var isRtl = this.parent.enableRtl;
            var HeaderTolltip = document.querySelector('.e-header-tooltip');
            var colResizeHandler = this.parent.element.getElementsByClassName('e-colresize-handler')[0];
            var rowResizeHandler = this.parent.element.getElementsByClassName('e-rowresize-handler')[0];
            if (colResizeHandler) {
                var trgtWidth = isRtl ? (Math.round(this.trgtEle.getBoundingClientRect().right) - (e.clientX)) :
                    ((e.clientX) - Math.round(this.trgtEle.getBoundingClientRect().left));
                if (HeaderTolltip) {
                    HeaderTolltip.firstChild.textContent = trgtWidth > 0 ? ('Width:(' + trgtWidth.toString() + ' pixels)') : ('Width: 0.00');
                }
            }
            else if (rowResizeHandler) {
                var trgtHeight = (e.clientY) - Math.round(this.trgtEle.getBoundingClientRect().top);
                if (HeaderTolltip) {
                    HeaderTolltip.firstChild.textContent = trgtHeight > 0 ? ('Height:(' + trgtHeight.toString() + ' pixels)') : ('Height: 0.00');
                }
            }
        }
        else {
            var isColResize = trgt.classList.contains('e-colresize');
            var isRowResize = trgt.classList.contains('e-rowresize');
            if (isColResize || isRowResize) {
                var className = isColResize ? 'e-colresize-handler' : 'e-rowresize-handler';
                var tooltip = new Tooltip({
                    cssClass: 'e-header-tooltip',
                    showTipPointer: false
                });
                if (isColResize) {
                    tooltip.content = initializeCSPTemplate(function () {
                        return 'Width:(' + Math.round(trgt.getBoundingClientRect().width).toString() + ' pixels)';
                    });
                }
                else if (isRowResize) {
                    tooltip.content = initializeCSPTemplate(function () {
                        return 'Height:(' + Math.round(trgt.getBoundingClientRect().height).toString() + ' pixels)';
                    });
                    tooltip.offsetX = -((this.parent.getMainContent().parentElement.clientWidth / 2) -
                        Math.round(trgt.getBoundingClientRect().width));
                }
                tooltip.appendTo('.' + className);
                tooltip.open();
                tooltip.refresh();
            }
        }
    };
    Resize.prototype.setColWidth = function (index, viewportIdx, width, curWidth) {
        var sheet = this.parent.getActiveSheet();
        var threshold = getDPRValue(width) - curWidth;
        if (threshold < 0 && curWidth < -(threshold)) {
            threshold = -curWidth;
        }
        if (width > 0) {
            if (this.isMouseMoved && this.trgtEle.classList.contains('e-unhide-column')) {
                this.showHiddenColumns(index, width);
                this.parent.notify(completeAction, {
                    eventArgs: {
                        index: index, width: 0 + "px", isCol: true, sheetIndex: this.parent.activeSheetIndex, oldWidth: curWidth + "px",
                        hide: false
                    }, action: 'resize'
                });
                return;
            }
            this.resizeStart(index, viewportIdx, width + "px", true, false, curWidth + "px");
            setColumn(sheet, index, { width: width, customWidth: true });
            this.parent.notify(colWidthChanged, { threshold: threshold, colIdx: index, checkWrapCell: true });
        }
        else {
            if (this.isMouseMoved) {
                this.parent.hideColumn(index);
                this.showHideCopyIndicator();
                this.parent.notify(completeAction, {
                    eventArgs: {
                        index: index, width: 0 + "px", isCol: true, sheetIndex: this.parent.activeSheetIndex, oldWidth: curWidth + "px",
                        hide: true
                    }, action: 'resize'
                });
            }
        }
    };
    Resize.prototype.showHideCopyIndicator = function () {
        var copyIndicator = this.parent.element.getElementsByClassName('e-copy-indicator')[0];
        var isIndicator = false;
        if (copyIndicator) {
            detach(copyIndicator);
            this.parent.notify(hideAutoFillElement, null);
            isIndicator = true;
        }
        if (isIndicator) {
            this.parent.notify(contentLoaded, {});
        }
    };
    Resize.prototype.showHiddenColumns = function (index, width) {
        var _this = this;
        var sheet = this.parent.getActiveSheet();
        var selectedRange = getRangeIndexes(sheet.selectedRange);
        var startIdx;
        var endIdx;
        var colgroup;
        if (index >= selectedRange[1] && index <= selectedRange[3] && selectedRange[2] === sheet.rowCount - 1 &&
            getCellIndexes(sheet.activeCell)[0] === getCellIndexes(sheet.topLeftCell)[0]) {
            startIdx = selectedRange[1];
            endIdx = selectedRange[3];
            colgroup = this.parent.getMainContent().querySelector('colgroup');
        }
        else {
            startIdx = endIdx = index;
        }
        if (width !== undefined) {
            for (var i = startIdx; i <= endIdx; i++) {
                setColumn(sheet, i, { width: width, customWidth: true });
                if (i >= this.parent.viewport.leftIndex && i <= this.parent.viewport.rightIndex && !isHiddenCol(sheet, i)) {
                    colgroup.children[this.parent.getViewportIndex(i, true)].style.width = width + "px";
                }
            }
        }
        if (this.trgtEle) {
            this.trgtEle.classList.remove('e-unhide-column');
        }
        var hideEvtArgs = { startIndex: startIdx, endIndex: endIdx, hide: false, isCol: true, autoFit: true };
        this.parent.notify(hideShow, hideEvtArgs);
        this.showHideCopyIndicator();
        if (width === undefined) {
            if (hideEvtArgs.autoFit) {
                this.autoFit({ isRow: false, startIndex: startIdx, endIndex: endIdx });
            }
            else {
                var performAutoFit_1 = function () {
                    _this.parent.off(contentLoaded, performAutoFit_1);
                    _this.autoFit({ isRow: false, startIndex: startIdx, endIndex: endIdx });
                };
                this.parent.on(contentLoaded, performAutoFit_1, this);
            }
        }
    };
    Resize.prototype.setRowHeight = function (rowIdx, viewportIdx, height, prevData) {
        var sheet = this.parent.getActiveSheet();
        var frozenCol = this.parent.frozenColCount(sheet);
        var eleHeight = parseInt(this.parent.getRow(rowIdx, null, frozenCol).style.height, 10);
        var rowHeight = height;
        var threshold = getDPRValue(parseInt(rowHeight, 10)) - eleHeight;
        if (threshold < 0 && eleHeight < -(threshold)) {
            threshold = -eleHeight;
        }
        var customHeight;
        if (sheet.rows[rowIdx] && sheet.rows[rowIdx].customHeight) {
            customHeight = true;
        }
        this.resizeStart(rowIdx, viewportIdx, rowHeight, false, false, prevData, customHeight);
        setRow(sheet, rowIdx, { height: parseInt(rowHeight, 10) > 0 ? parseInt(rowHeight, 10) : 0, customHeight: true });
        this.parent.notify(rowHeightChanged, { threshold: threshold, rowIdx: rowIdx, isCustomHgt: true });
    };
    Resize.prototype.resizeOn = function (e) {
        var _this = this;
        var idx;
        var actualIdx;
        var sheet = this.parent.getActiveSheet();
        var activeCell = getRangeIndexes(sheet.activeCell);
        var cell = getCell(activeCell[0], activeCell[1], sheet);
        if (this.trgtEle.classList.contains('e-rowresize')) {
            var prevIdx = Number(this.trgtEle.parentElement.getAttribute('aria-rowindex')) - 2;
            if (this.isMouseMoved && isHiddenRow(sheet, prevIdx) && this.trgtEle.classList.contains('e-skip-resize') &&
                e.clientY > this.trgtEle.getBoundingClientRect().top) {
                this.trgtEle.classList.remove('e-skip-resize');
                var eventArgs = { startIndex: prevIdx, endIndex: prevIdx, hide: false, skipAppend: true };
                this.parent.notify(hideShow, eventArgs);
                var rTbody = this.parent.getRowHeaderTable().tBodies[0];
                var tbody = this.parent.getContentTable().tBodies[0];
                eventArgs.hdrRow.style.display = 'none';
                eventArgs.row.style.display = 'none';
                rTbody.insertBefore(eventArgs.hdrRow, rTbody.children[eventArgs.insertIdx]);
                tbody.insertBefore(eventArgs.row, tbody.children[eventArgs.insertIdx]);
                this.trgtEle = eventArgs.hdrRow.firstElementChild;
                eventArgs.hdrRow.nextElementSibling.classList.remove('e-hide-end');
                eventArgs.mergeCollection.forEach(function (mergeArgs) { _this.parent.notify(setMerge, mergeArgs); });
            }
            else {
                if (this.trgtEle.classList.contains('e-skip-resize')) {
                    this.trgtEle.classList.remove('e-skip-resize');
                    if ((!this.isMouseMoved && isHiddenRow(sheet, prevIdx)) || !this.trgtEle.parentElement.previousElementSibling) {
                        return;
                    }
                    this.trgtEle = this.trgtEle.parentElement.previousElementSibling.getElementsByClassName('e-header-cell')[0];
                }
            }
            actualIdx = idx = parseInt(this.trgtEle.parentElement.getAttribute('aria-rowindex'), 10) - 1;
            idx = this.parent.getViewportIndex(actualIdx);
            var frozenCol = this.parent.frozenColCount(sheet);
            var prevData = this.parent.getRow(actualIdx, null, frozenCol).style.height;
            var rowHeight = e.clientY - this.event.clientY + parseInt(prevData, 10);
            if (rowHeight <= 0) {
                this.parent.hideRow(actualIdx);
                this.showHideCopyIndicator();
                setRow(sheet, actualIdx, { height: 0, customHeight: true });
                this.parent.notify(completeAction, {
                    eventArgs: { index: actualIdx, height: '0px', isCol: false, sheetIndex: this.parent.activeSheetIndex, oldHeight: prevData },
                    action: 'resize'
                });
                return;
            }
            this.setRowHeight(actualIdx, idx, rowHeight + "px", prevData);
            this.parent.notify(refreshFilterCellsOnResize, { rowIndex: actualIdx });
            if (this.trgtEle.parentElement.style.display === 'none') {
                var sheet_1 = this.parent.getActiveSheet();
                var selectedRange = getSwapRange(getRangeIndexes(sheet_1.selectedRange));
                if (actualIdx <= selectedRange[2] && actualIdx > selectedRange[0]) {
                    rowHeight = getRowHeight(sheet_1, actualIdx);
                    var count = void 0;
                    for (var i = selectedRange[0]; i <= selectedRange[2]; i++) {
                        if (i === actualIdx) {
                            continue;
                        }
                        prevData = getRowHeight(sheet_1, i) + "px";
                        setRow(sheet_1, i, { customHeight: true, height: rowHeight });
                        if (isHiddenRow(sheet_1, i)) {
                            if (!count) {
                                count = i;
                            }
                        }
                        else {
                            this.parent.getRow(i).style.height = rowHeight + "px";
                            if (sheet_1.showHeaders) {
                                this.parent.getRow(i, this.parent.getRowHeaderTable()).style.height = rowHeight + "px";
                            }
                        }
                        this.parent.notify(completeAction, {
                            eventArgs: {
                                index: i, height: rowHeight + "px", isCol: false,
                                sheetIndex: this.parent.activeSheetIndex, oldHeight: prevData
                            },
                            action: 'resize'
                        });
                    }
                    this.parent.hideRow(selectedRange[0], actualIdx - 1, false);
                    this.showHideCopyIndicator();
                    idx += Math.abs(actualIdx - count);
                }
                else {
                    if (idx !== 0 && !isHiddenRow(sheet_1, actualIdx - 1)) {
                        this.trgtEle.parentElement.previousElementSibling.classList.remove('e-hide-start');
                    }
                    else {
                        if (idx !== 0) {
                            this.trgtEle.parentElement.classList.add('e-hide-end');
                        }
                    }
                    this.parent.selectRange(sheet_1.selectedRange);
                }
                this.trgtEle.parentElement.style.display = '';
                this.parent.getContentTable().rows[idx].style.display = '';
            }
        }
        else if (this.trgtEle.classList.contains('e-colresize')) {
            if (this.isMouseMoved && this.trgtEle.classList.contains('e-unhide-column') &&
                e.clientX < this.trgtEle.getBoundingClientRect().left) {
                this.trgtEle.classList.remove('e-unhide-column');
                if (this.trgtEle.previousElementSibling) {
                    this.trgtEle = this.trgtEle.previousElementSibling;
                }
            }
            idx = parseInt(this.trgtEle.getAttribute('aria-colindex'), 10) - 1;
            var curWidth = void 0;
            if (this.trgtEle.classList.contains('e-unhide-column')) {
                idx -= 1;
                curWidth = 0;
            }
            else {
                curWidth = getColumnWidth(this.parent.getActiveSheet(), idx);
            }
            this.setColWidth(idx, this.parent.getViewportIndex(idx, true), (this.parent.enableRtl ?
                (this.event.clientX - e.clientX) : (e.clientX - this.event.clientX)) + curWidth, curWidth);
        }
        if (cell && cell.format && cell.format.includes('*')) {
            this.parent.notify(getFormattedCellObject, { value: cell.value, format: cell.format, cell: cell,
                formattedText: cell.value, rowIndex: activeCell[0], colIndex: activeCell[1] });
        }
    };
    Resize.prototype.resizeStart = function (idx, viewportIdx, value, isCol, isFit, prevData, isCustomHeight) {
        setResize(idx, viewportIdx, value, isCol, this.parent);
        var action = isFit ? 'resizeToFit' : 'resize';
        var eventArgs;
        var isAction;
        if (isCol) {
            eventArgs = { index: idx, width: value, isCol: isCol, sheetIndex: this.parent.activeSheetIndex, oldWidth: prevData };
            isAction = prevData !== value;
        }
        else {
            eventArgs = { index: idx, height: value, isCol: isCol, sheetIndex: this.parent.activeSheetIndex, oldHeight: prevData,
                isPrevCustomHeight: isCustomHeight };
            isAction = prevData !== value;
        }
        if (isAction) {
            this.parent.notify(completeAction, { eventArgs: eventArgs, action: action });
        }
    };
    Resize.prototype.updateCursor = function () {
        if (this.parent.element.getElementsByClassName('e-colresize-handler')[0]) {
            this.parent.element.classList.add('e-col-resizing');
        }
        else if (this.parent.element.classList.contains('e-col-resizing')) {
            this.parent.element.classList.remove('e-col-resizing');
        }
        if (this.parent.element.getElementsByClassName('e-rowresize-handler')[0]) {
            this.parent.element.classList.add('e-row-resizing');
        }
        else if (this.parent.element.classList.contains('e-row-resizing')) {
            this.parent.element.classList.remove('e-row-resizing');
        }
    };
    // To get the floating element width like filter
    Resize.prototype.getFloatingElementWidth = function (oldWidth, colIdx) {
        var floatingWidth = oldWidth;
        var eventArgs = { filterRange: [], hasFilter: false };
        this.parent.notify(getFilterRange, eventArgs);
        if (eventArgs.hasFilter && eventArgs.filterRange) {
            if (eventArgs.filterRange[1] <= colIdx && eventArgs.filterRange[3] >= colIdx) {
                floatingWidth = oldWidth + 22; // default width and padding for button
            }
        }
        return floatingWidth;
    };
    /**
     * To destroy the resize module.
     *
     * @returns {void} - To destroy the resize module.
     */
    Resize.prototype.destroy = function () {
        this.unwireEvents();
        this.removeEventListener();
        if (this.trgtEle) {
            this.trgtEle.remove();
        }
        this.trgtEle = null;
        this.event = null;
        this.parent = null;
    };
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    Resize.prototype.propertyChange = function (args) {
        if (args.propertyName === 'allowResizing') {
            this.wireEvents();
        }
    };
    return Resize;
}());
export { Resize };
