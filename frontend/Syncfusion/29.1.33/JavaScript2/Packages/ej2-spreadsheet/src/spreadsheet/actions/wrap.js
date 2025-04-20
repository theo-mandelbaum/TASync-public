import { closest, Browser, isNullOrUndefined } from '@syncfusion/ej2-base';
import { ribbonClick, inView, setMaxHgt, getMaxHgt, WRAPTEXT, setRowEleHeight, rowHeightChanged, readonlyAlert } from '../common/index';
import { completeAction, getLines, getExcludedColumnWidth, getTextHeightWithBorder } from '../common/index';
import { positionAutoFillElement, colWidthChanged, getLineHeight, updateWrapCell } from '../common/index';
import { getCell, wrap as wrapText, wrapEvent, getRow, getRowsHeight, applyCF, isReadOnlyCells } from '../../workbook/index';
import { getRowHeight, getAddressFromSelectedRange, beginAction, isHiddenRow, isHiddenCol } from '../../workbook/index';
/**
 * Represents Wrap Text support for Spreadsheet.
 */
var WrapText = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet Wrap Text module.
     *
     * @param {Spreadsheet} parent - Specifies the Spreadsheet.
     * @private
     */
    function WrapText(parent) {
        this.parent = parent;
        this.wrapCell = this.parent.createElement('span', { className: 'e-wrap-content' });
        this.addEventListener();
    }
    WrapText.prototype.addEventListener = function () {
        this.parent.on(ribbonClick, this.ribbonClickHandler, this);
        this.parent.on(wrapEvent, this.wrapTextHandler, this);
        this.parent.on(rowHeightChanged, this.rowHeightChangedHandler, this);
        this.parent.on(colWidthChanged, this.colWidthChanged, this);
        this.parent.on(updateWrapCell, this.updateWrapCell, this);
    };
    WrapText.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(ribbonClick, this.ribbonClickHandler);
            this.parent.off(wrapEvent, this.wrapTextHandler);
            this.parent.off(rowHeightChanged, this.rowHeightChangedHandler);
            this.parent.off(colWidthChanged, this.colWidthChanged);
            this.parent.off(updateWrapCell, this.updateWrapCell);
        }
    };
    WrapText.prototype.wrapTextHandler = function (args) {
        if (args.initial || inView(this.parent, args.range, true)) {
            if (args.isPublic && isReadOnlyCells(this.parent, args.range)) {
                return;
            }
            if (args.initial && !args.td && !args.outsideViewport && inView(this.parent, args.range, true)) {
                args.initial = false;
            }
            var ele = void 0;
            var cell = void 0;
            var colwidth = void 0;
            var maxHgt = void 0;
            var hgt = void 0;
            var isCustomHgt = void 0;
            var rowCustomHeight = void 0;
            var lineHgt = void 0;
            var row = void 0;
            var visibleRow = void 0;
            var frozenRow = this.parent.frozenRowCount(args.sheet);
            var isLessStandardHgt = void 0;
            var filterRange = void 0;
            var hyperlinkEle = void 0;
            if (!isNullOrUndefined(args.sheet.standardHeight) && args.sheet.standardHeight < 20) {
                isLessStandardHgt = true;
            }
            else {
                filterRange = this.parent.allowFiltering &&
                    this.parent.filterModule.filterRange.has(this.parent.activeSheetIndex) &&
                    this.parent.filterModule.filterRange.get(this.parent.activeSheetIndex).range;
            }
            for (var i = args.range[0]; i <= args.range[2]; i++) {
                maxHgt = 0;
                row = getRow(args.sheet, i);
                rowCustomHeight = row.customHeight;
                isCustomHgt = rowCustomHeight || args.isCustomHgt;
                visibleRow = !isHiddenRow(args.sheet, i);
                for (var j = args.range[1]; j <= args.range[3]; j++) {
                    cell = getCell(i, j, args.sheet, null, true);
                    if (cell.rowSpan < 0 || cell.colSpan < 0) {
                        continue;
                    }
                    var isMerge = cell.rowSpan > 1 || cell.colSpan > 1;
                    ele = args.initial ? args.td : (visibleRow && !isHiddenCol(args.sheet, j) && this.parent.getCell(i, j));
                    if (ele) {
                        if (args.wrap) {
                            lineHgt = getLineHeight(cell.style && cell.style.fontFamily ? cell.style : this.parent.cellStyle);
                            ele.classList.add(WRAPTEXT);
                        }
                        else {
                            ele.classList.remove(WRAPTEXT);
                            lineHgt = null;
                        }
                        if (isCustomHgt || isMerge || row.height < 20 || isLessStandardHgt ||
                            (filterRange && i === filterRange[0] && j >= filterRange[1] && j <= filterRange[3])) {
                            this.updateWrapCell({ rowIdx: i, colIdx: j, sheet: args.sheet, ele: ele });
                        }
                        if (Browser.isIE) {
                            ele.classList.add('e-ie-wrap');
                        }
                    }
                    else {
                        lineHgt = null;
                    }
                    if (!(isCustomHgt || isMerge)) {
                        colwidth = getExcludedColumnWidth(args.sheet, i, j, cell.colSpan > 1 ? j + cell.colSpan - 1 : j);
                        var displayText = this.parent.getDisplayText(cell).toString();
                        if (this.parent.isEdit && ele && displayText.indexOf('\n') < 0) {
                            var editElem = this.parent.element.querySelector('.e-spreadsheet-edit');
                            if (editElem) {
                                if (editElem.textContent.indexOf('\n') > -1) {
                                    displayText = editElem.textContent;
                                }
                            }
                        }
                        if (displayText) {
                            if (args.wrap) {
                                if (ele && ele.classList.contains('e-alt-unwrap')) {
                                    ele.classList.remove('e-alt-unwrap');
                                    if (displayText.includes('\n')) {
                                        hyperlinkEle = ele.querySelector('.e-hyperlink');
                                        if (hyperlinkEle && !hyperlinkEle.innerText.includes('\n')) {
                                            hyperlinkEle.innerText = displayText;
                                        }
                                    }
                                }
                                var lines = void 0;
                                var n = 0;
                                var p = void 0;
                                if (displayText.indexOf('\n') > -1) {
                                    var splitVal = displayText.split('\n');
                                    var valLength = splitVal.length;
                                    for (p = 0; p < valLength; p++) {
                                        lines = getLines(splitVal[p], colwidth, cell.style, this.parent.cellStyle);
                                        if (lines === 0) {
                                            lines = 1; // for empty new line
                                        }
                                        n = n + lines;
                                    }
                                    lines = n;
                                }
                                else {
                                    lines = getLines(displayText, colwidth, cell.style, this.parent.cellStyle);
                                }
                                hgt = getTextHeightWithBorder(this.parent, i, j, args.sheet, cell.style || this.parent.cellStyle, lines, lineHgt);
                                maxHgt = Math.max(maxHgt, hgt);
                                if (cell.rowSpan > 1) {
                                    var prevHeight = getRowsHeight(args.sheet, i, i + (cell.rowSpan - 1));
                                    if (prevHeight >= maxHgt) {
                                        return;
                                    }
                                    hgt = maxHgt = getRowHeight(args.sheet, i) + (maxHgt - prevHeight);
                                }
                                setMaxHgt(args.sheet, i, j, hgt);
                            }
                            else {
                                if (ele) {
                                    if (displayText.indexOf('\n') > -1) {
                                        ele.classList.add('e-alt-unwrap');
                                    }
                                    hyperlinkEle = ele.querySelector('.e-hyperlink');
                                    if (hyperlinkEle) {
                                        var hyperlinkText = hyperlinkEle.innerText;
                                        if (hyperlinkText.includes('\n')) {
                                            hyperlinkEle.innerText = hyperlinkText.split('\n').join(' ');
                                        }
                                    }
                                }
                                hgt = getTextHeightWithBorder(this.parent, i, j, args.sheet, cell.style || this.parent.cellStyle, 1, lineHgt);
                                setMaxHgt(args.sheet, i, j, hgt);
                                maxHgt = Math.max(getMaxHgt(args.sheet, i), 20);
                            }
                        }
                        else if (!args.wrap || !displayText) {
                            setMaxHgt(args.sheet, i, j, 20);
                            maxHgt = Math.max(getMaxHgt(args.sheet, i), 20);
                        }
                        if (j === args.range[3]) {
                            var prevHgt = getRowHeight(args.sheet, i);
                            if ((args.wrap && (args.isOtherAction ? maxHgt >= 20 : maxHgt > 20) && getMaxHgt(args.sheet, i) <= maxHgt) ||
                                ((!args.wrap || !displayText) && getMaxHgt(args.sheet, i) < prevHgt && prevHgt > 20)) {
                                if (prevHgt !== maxHgt) {
                                    if (ele) {
                                        setRowEleHeight(this.parent, args.sheet, maxHgt, i, args.row, args.hRow, visibleRow);
                                        if (ele && args.sheet.conditionalFormats && args.sheet.conditionalFormats.length) {
                                            this.parent.notify(applyCF, { indexes: [i, j], isAction: true });
                                        }
                                    }
                                    else {
                                        setRowEleHeight(this.parent, args.sheet, maxHgt, i, null, null, visibleRow, !visibleRow || i > this.parent.viewport.bottomIndex ||
                                            (i >= frozenRow && i < this.parent.viewport.topIndex + frozenRow));
                                    }
                                }
                            }
                        }
                    }
                    if (ele) {
                        if (isCustomHgt && !isMerge) {
                            var displayText = this.parent.getDisplayText(cell);
                            if (args.wrap) {
                                if (ele.classList.contains('e-alt-unwrap')) {
                                    ele.classList.remove('e-alt-unwrap');
                                }
                            }
                            else if (displayText.indexOf('\n') > -1) {
                                ele.classList.add('e-alt-unwrap');
                            }
                        }
                        if (args.wrap) {
                            if (!rowCustomHeight) {
                                ele.style.lineHeight = (parseFloat((cell.style && cell.style.fontSize) || this.parent.cellStyle.fontSize) *
                                    lineHgt) + 'pt';
                            }
                            else if (ele.style.lineHeight) {
                                ele.style.lineHeight = '';
                            }
                        }
                        else {
                            ele.style.lineHeight = '';
                        }
                    }
                }
            }
            if (!args.initial) {
                this.parent.notify(positionAutoFillElement, null);
            }
        }
    };
    WrapText.prototype.ribbonClickHandler = function (args) {
        var target = closest(args.originalEvent.target, '.e-btn');
        if (target && target.id === this.parent.element.id + '_wrap') {
            var wrap = target.classList.contains('e-active');
            var address = getAddressFromSelectedRange(this.parent.getActiveSheet());
            var eventArgs = { address: address, wrap: wrap, cancel: false };
            if (isReadOnlyCells(this.parent)) {
                this.parent.notify(readonlyAlert, null);
                return;
            }
            this.parent.notify(beginAction, { action: 'beforeWrap', eventArgs: eventArgs });
            if (!eventArgs.cancel) {
                wrapText(this.parent.getActiveSheet().selectedRange, wrap, this.parent);
                this.parent.notify(completeAction, { action: 'wrap', eventArgs: { address: address, wrap: wrap } });
            }
        }
    };
    WrapText.prototype.rowHeightChangedHandler = function (args) {
        if (args.isCustomHgt) {
            args.sheet = this.parent.getActiveSheet();
            for (var i = this.parent.viewport.leftIndex, len = this.parent.viewport.rightIndex; i <= len; i++) {
                if (getCell(args.rowIdx, i, args.sheet, false, true).wrap) {
                    args.colIdx = i;
                    args.ele = this.parent.getCell(args.rowIdx, i);
                    this.updateWrapCell(args);
                    if (args.ele.style.lineHeight) {
                        args.ele.style.lineHeight = '';
                    }
                }
            }
        }
    };
    WrapText.prototype.colWidthChanged = function (args) {
        if (args.checkWrapCell) {
            args.sheet = this.parent.getActiveSheet();
            for (var i = this.parent.viewport.topIndex, len = this.parent.viewport.bottomIndex; i <= len; i++) {
                if (getCell(i, args.colIdx, args.sheet, false, true).wrap) {
                    args.rowIdx = i;
                    args.ele = this.parent.getCell(i, args.colIdx);
                    this.updateWrapCell(args);
                }
            }
        }
    };
    WrapText.prototype.updateWrapCell = function (args) {
        if (args.ele && !args.ele.querySelector('.e-wrap-content')) {
            var wrapSpan = this.wrapCell.cloneNode();
            var filterBtn = args.ele.querySelector('.e-filter-btn');
            while (args.ele.childElementCount && !isNullOrUndefined(args.ele.firstElementChild) &&
                args.ele.firstElementChild.className.indexOf('e-addNoteIndicator') === -1) {
                wrapSpan.appendChild(args.ele.firstElementChild);
            }
            var nodeElement = void 0;
            if (!isNullOrUndefined(args.ele.firstElementChild) && args.ele.firstElementChild.className.indexOf('e-addNoteIndicator') > -1) {
                nodeElement = args.ele.firstElementChild;
            }
            if (filterBtn) {
                if (args.ele.firstChild) {
                    args.ele.insertBefore(filterBtn, args.ele.firstChild);
                }
                else {
                    args.ele.appendChild(filterBtn);
                }
            }
            if (!getCell(args.rowIdx, args.colIdx, args.sheet, false, true).hyperlink) {
                var node = args.ele.lastChild;
                if (node && node.nodeType === 3) {
                    wrapSpan.appendChild(document.createTextNode(node.textContent));
                    node.textContent = '';
                }
                else {
                    wrapSpan.appendChild(document.createTextNode(args.ele.textContent));
                    args.ele.textContent = '';
                }
            }
            args.ele.appendChild(wrapSpan);
            if (!isNullOrUndefined(nodeElement)) {
                args.ele.appendChild(nodeElement);
            }
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    WrapText.prototype.getModuleName = function () {
        return 'wrapText';
    };
    /**
     * Removes the added event handlers and clears the internal properties of WrapText module.
     *
     * @returns {void}
     */
    WrapText.prototype.destroy = function () {
        this.removeEventListener();
        if (this.wrapCell) {
            this.wrapCell.remove();
            this.wrapCell = null;
        }
        this.parent = null;
    };
    return WrapText;
}());
export { WrapText };
