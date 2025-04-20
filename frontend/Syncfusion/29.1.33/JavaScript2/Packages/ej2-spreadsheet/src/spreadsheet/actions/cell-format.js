import { clearViewer, getTextHeightWithBorder } from '../../spreadsheet/index';
import { getExcludedColumnWidth, selectRange, getLineHeight, getBorderHeight, completeAction, readonlyAlert } from '../common/index';
import { setRowEleHeight, setMaxHgt, getTextHeight, getMaxHgt, getLines } from '../common/index';
import { getRowHeight, applyCellFormat, clearFormulaDependentCells, isReadOnlyCells, addListValidationDropdown } from '../../workbook/index';
import { isHiddenRow, getCell, getRangeIndexes, getSheetIndex, activeCellChanged, clearCFRule } from '../../workbook/index';
import { wrapEvent, getRangeAddress, clear, activeCellMergedRange, cellValidation } from '../../workbook/index';
import { beginAction, isHeightCheckNeeded } from '../../workbook/index';
import { getSwapRange, skipHiddenIdx, isHiddenCol, isImported } from '../../workbook/index';
import { removeClass } from '@syncfusion/ej2-base';
import { deleteChart, deleteImage } from '../common/index';
/**
 * CellFormat module allows to format the cell styles.
 */
var CellFormat = /** @class */ (function () {
    function CellFormat(parent) {
        this.checkHeight = false;
        this.parent = parent;
        this.addEventListener();
    }
    CellFormat.prototype.applyCellFormat = function (args) {
        if (args.checkHeight) {
            if (!this.checkHeight) {
                this.checkHeight = true;
            }
            this.updateRowHeight(args.rowIdx, args.colIdx, args.lastCell, args.onActionUpdate, args.outsideViewport, args.rowHeight);
            return;
        }
        var keys = Object.keys(args.style);
        var sheet = this.parent.getActiveSheet();
        if (args.lastCell && !keys.length && (getMaxHgt(sheet, args.rowIdx) <= (sheet.standardHeight || 20))) {
            return;
        }
        var cell = args.td || this.parent.getCell(args.rowIdx, args.colIdx);
        if (cell) {
            this.updateMergeBorder(args, sheet);
            var cellStyleColor = void 0;
            if (args.formatColor && cell.style.color === args.formatColor) {
                cellStyleColor = args.style.color;
                delete args.style.color;
            }
            if (args.style.border !== undefined || args.style.borderTop !== undefined || args.style.borderLeft !== undefined) {
                var curStyle_1 = {};
                Object.keys(args.style).forEach(function (key) { curStyle_1["" + key] = args.style["" + key]; });
                if (curStyle_1.border !== undefined) {
                    Object.assign(cell.style, { borderRight: args.style.border, borderBottom: args.style.border });
                    this.setLeftBorder(args.style.border, cell, args.rowIdx, args.colIdx, args.colIdx === this.parent.frozenColCount(sheet) ? args.hRow : args.row, args.onActionUpdate, args.first, sheet);
                    this.setTopBorder(args.style.border, cell, args.rowIdx, args.colIdx, args.pRow, args.pHRow, args.onActionUpdate, args.first, args.lastCell, args.manualUpdate, sheet, args);
                    delete curStyle_1.border;
                }
                if (curStyle_1.borderTop !== undefined) {
                    this.setTopBorder(args.style.borderTop, cell, args.rowIdx, args.colIdx, args.pRow, args.pHRow, args.onActionUpdate, args.first, args.lastCell, args.manualUpdate, sheet, args);
                    delete curStyle_1.borderTop;
                }
                if (curStyle_1.borderLeft !== undefined) {
                    this.setLeftBorder(args.style.borderLeft, cell, args.rowIdx, args.colIdx, args.colIdx === this.parent.frozenColCount(sheet) ? args.hRow : args.row, args.onActionUpdate, args.first, sheet);
                    delete curStyle_1.borderLeft;
                }
                if (Object.keys(curStyle_1).length) {
                    if (curStyle_1.borderBottom !== undefined) {
                        this.setThickBorderHeight(curStyle_1.borderBottom, args.rowIdx, args.colIdx, cell, args.row, args.hRow, args.onActionUpdate, args.lastCell, args.manualUpdate);
                    }
                    Object.assign(cell.style, curStyle_1);
                }
            }
            else {
                if (args.style.borderBottom !== undefined) {
                    this.setThickBorderHeight(args.style.borderBottom, args.rowIdx, args.colIdx, cell, args.row, args.hRow, args.onActionUpdate, args.lastCell, args.manualUpdate);
                }
                Object.assign(cell.style, args.style);
                if (cell) {
                    var dataBar = cell.querySelector('.e-cf-databar');
                    if (dataBar) {
                        var dataBarValue = dataBar.querySelector('.e-databar-value');
                        if (dataBarValue) {
                            dataBarValue.style.textDecoration = args.style.textDecoration;
                            if (args.style.verticalAlign) {
                                dataBarValue.style.alignItems = args.style.verticalAlign === 'top' ? 'start' :
                                    args.style.verticalAlign === 'middle' ? 'center' : 'end';
                            }
                        }
                    }
                }
                var CellElem = getCell(args.rowIdx, args.colIdx, sheet); // Need to remove after adding span support to merge
                if (CellElem && (CellElem.rowSpan || CellElem.colSpan) && cell.offsetHeight > 0) {
                    var height = getTextHeight(this.parent, CellElem.style || this.parent.cellStyle);
                    if (height > cell.offsetHeight) {
                        setRowEleHeight(this.parent, sheet, cell.offsetHeight, args.rowIdx);
                    }
                }
                if (args.style.fontSize && cell) {
                    var ddlCont = cell.querySelector('.e-validation-list');
                    if (ddlCont) {
                        this.parent.notify(addListValidationDropdown, {
                            ddlCont: ddlCont,
                            rowIdx: args.rowIdx, colIdx: args.colIdx, updatePosition: true
                        });
                    }
                }
            }
            var cellModel = getCell(args.rowIdx, args.colIdx, sheet, null, true);
            if (!sheet.rows[args.rowIdx] || !sheet.rows[args.rowIdx].customHeight) {
                if (args.isHeightCheckNeeded) {
                    if (!args.manualUpdate) {
                        if (!cellModel.wrap && isHeightCheckNeeded(args.style)) {
                            setMaxHgt(sheet, args.rowIdx, args.colIdx, getTextHeightWithBorder(this.parent, args.rowIdx, args.colIdx, sheet, args.style));
                        }
                        if (args.lastCell) {
                            var height = getMaxHgt(sheet, args.rowIdx);
                            var defaultHeight = sheet.standardHeight || 20;
                            if (height > defaultHeight && height > getRowHeight(sheet, args.rowIdx)) {
                                setRowEleHeight(this.parent, sheet, height, args.rowIdx, args.row, args.hRow);
                            }
                        }
                    }
                    else {
                        if (!this.checkHeight) {
                            this.checkHeight = isHeightCheckNeeded(args.style, args.onActionUpdate);
                        }
                        if (cell && cell.children[0] && cell.children[0].className === 'e-cf-databar' && args.style.fontSize) {
                            cell.children[0].querySelector('.e-databar-value').style.fontSize = args.style.fontSize;
                        }
                        if (!args.isFromAutoFillOption) {
                            this.updateRowHeight(args.rowIdx, args.colIdx, args.lastCell, args.onActionUpdate, null, args.rowHeight);
                        }
                        if (cellModel.wrap && (args.style.fontSize || args.style.fontFamily)) {
                            cell.style.lineHeight = (parseFloat((cellModel.style && cellModel.style.fontSize) || this.parent.cellStyle.fontSize) * getLineHeight(cellModel.style && cellModel.style.fontFamily ? cellModel.style : this.parent.cellStyle)) + 'pt';
                        }
                    }
                }
            }
            else if (!cellModel.wrap && (args.style.fontSize || args.style.fontFamily)) {
                var hgt = getRowHeight(sheet, args.rowIdx, true) - getBorderHeight(args.rowIdx, args.colIdx, sheet);
                if (hgt < getTextHeight(this.parent, cellModel.style)) {
                    cell.style.lineHeight = hgt + "px";
                }
                else if (cell.style.lineHeight) {
                    cell.style.lineHeight = '';
                }
            }
            if (cellStyleColor !== undefined) {
                args.style.color = cellStyleColor;
            }
        }
        else {
            this.updateRowHeight(args.rowIdx, args.colIdx, true, args.onActionUpdate, null, args.rowHeight);
        }
    };
    CellFormat.prototype.updateRowHeight = function (rowIdx, colIdx, isLastCell, onActionUpdate, outsideViewport, rHeight) {
        if (this.checkHeight) {
            var sheet = this.parent.getActiveSheet();
            var cell = getCell(rowIdx, colIdx, sheet, null, true);
            if (!cell.rowSpan) {
                var hgt = 0;
                hgt = getTextHeightWithBorder(this.parent, rowIdx, colIdx, sheet, cell.style || this.parent.cellStyle, cell.wrap && !cell.colSpan ? getLines(this.parent.getDisplayText(cell), getExcludedColumnWidth(sheet, rowIdx, colIdx), cell.style, this.parent.cellStyle)
                    : 1);
                var val = cell.value && cell.value.toString();
                if (val && val.indexOf('\n') > -1) {
                    var i = void 0;
                    var splitVal = val.split('\n');
                    var n = 0;
                    var valLength = splitVal.length;
                    for (i = 0; i < valLength; i++) {
                        var lines = getLines(splitVal[i], getExcludedColumnWidth(sheet, rowIdx, colIdx), cell.style, this.parent.cellStyle);
                        if (lines === 0) {
                            lines = 1; // for empty new line
                        }
                        n = n + lines;
                    }
                    hgt = getTextHeightWithBorder(this.parent, rowIdx, colIdx, sheet, cell.style || this.parent.cellStyle, n);
                }
                var defaultHeight = sheet && sheet.standardHeight ? sheet.standardHeight : 20;
                if (hgt < defaultHeight) {
                    hgt = defaultHeight; // default height
                }
                setMaxHgt(sheet, rowIdx, colIdx, hgt);
                if (!outsideViewport) {
                    var td = this.parent.getCell(rowIdx, colIdx);
                    if (td && td.children[0] && td.children[0].className === 'e-cf-databar') {
                        td.children[0].style.height = '100%';
                        td.children[0].firstElementChild.nextElementSibling.style.height = '100%';
                    }
                }
                if (isLastCell) {
                    this.checkHeight = false;
                    var maxHgt = rHeight ? rHeight : getMaxHgt(sheet, rowIdx);
                    var prevHgt = getRowHeight(sheet, rowIdx);
                    if (onActionUpdate ? maxHgt !== prevHgt : maxHgt > prevHgt) {
                        setRowEleHeight(this.parent, sheet, maxHgt, rowIdx, null, null, true, outsideViewport);
                    }
                }
            }
        }
    };
    CellFormat.prototype.updateMergeBorder = function (args, sheet) {
        var cellModel = getCell(args.rowIdx, args.colIdx, sheet, null, true);
        var mergeArgs = { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx] };
        this.parent.notify(activeCellMergedRange, mergeArgs);
        if (cellModel.rowSpan > 1 && !args.style.borderBottom) {
            var bottomCell = getCell(mergeArgs.range[2], mergeArgs.range[1], sheet, null, true);
            if (bottomCell.style && bottomCell.style.borderBottom) {
                args.style.borderBottom = bottomCell.style.borderBottom;
            }
        }
        if (cellModel.colSpan > 1 && !args.style.borderRight) {
            var rightCell = getCell(mergeArgs.range[0], mergeArgs.range[3], sheet, null, true);
            if (rightCell.style && rightCell.style.borderRight) {
                args.style.borderRight = rightCell.style.borderRight;
            }
        }
    };
    CellFormat.prototype.setLeftBorder = function (border, cell, rowIdx, colIdx, row, actionUpdate, first, sheet) {
        if (first && first.includes('Column')) {
            return;
        }
        var isRtl = this.parent.enableRtl;
        var prevCell = isRtl ? this.parent.getCell(rowIdx, colIdx + 1, row) :
            this.parent.getCell(rowIdx, colIdx - 1, row);
        if (prevCell) {
            var model = getCell(rowIdx, colIdx - 1, sheet, false, true);
            if ((!!model.rowSpan && model.rowSpan !== 1) || (!!model.colSpan && model.colSpan !== 1)) {
                var mergeArgs = { range: [rowIdx, colIdx - 1, rowIdx, colIdx - 1] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                model = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet, false, true);
                if (model.style && model.style.borderRight && model.style.borderRight !== 'none') {
                    return;
                }
                else {
                    model = getCell(mergeArgs.range[0], mergeArgs.range[3], sheet, null, true);
                    if (model.style && model.style.borderRight && model.style.borderRight !== 'none') {
                        return;
                    }
                    cell.style.borderLeft = border;
                }
            }
            else {
                if (actionUpdate && border !== '' && colIdx === this.parent.viewport.leftIndex) {
                    this.parent.getMainContent().scrollLeft -= this.getBorderSize(border);
                }
                prevCell.style.borderRight = (border === 'none') ? prevCell.style.borderRight : border;
            }
        }
        else {
            cell.style.borderLeft = border;
        }
    };
    CellFormat.prototype.setTopBorder = function (border, cell, rowIdx, colIdx, pRow, pHRow, actionUpdate, first, lastCell, manualUpdate, sheet, args) {
        if (first && first.includes('Row')) {
            return;
        }
        var col = colIdx;
        var model = getCell(rowIdx, colIdx, sheet, false, true);
        if (model.colSpan > 1 && isHiddenCol(sheet, colIdx)) {
            col = skipHiddenIdx(sheet, colIdx, true, 'columns');
            if (col > colIdx + model.colSpan - 1) {
                col = colIdx;
            }
        }
        var prevCell = this.parent.getCell(rowIdx - 1, col, pRow);
        if (prevCell) {
            model = getCell(rowIdx - 1, colIdx, sheet, false, true);
            if ((!!model.rowSpan && model.rowSpan !== 1) || (!!model.colSpan && model.colSpan !== 1)) {
                var mergeArgs = { range: [rowIdx - 1, colIdx, rowIdx - 1, colIdx] };
                this.parent.notify(activeCellMergedRange, mergeArgs);
                model = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet, false, true);
                if (model.style && model.style.borderBottom && model.style.borderBottom !== 'none') {
                    return;
                }
                else {
                    model = getCell(mergeArgs.range[2], mergeArgs.range[1], sheet, null, true);
                    if (model.style && model.style.borderBottom && model.style.borderBottom !== 'none') {
                        return;
                    }
                    cell.style.borderTop = border;
                    if (args.mergeBorderRows !== undefined && args.mergeBorderRows.indexOf(rowIdx) === -1) {
                        args.mergeBorderRows.push(rowIdx);
                    }
                }
            }
            else {
                if (isHiddenRow(sheet, rowIdx - 1)) {
                    var index = [Number(prevCell.parentElement.getAttribute('aria-rowindex')) - 1, colIdx];
                    if (this.parent.getCellStyleValue(['bottomPriority'], index).bottomPriority) {
                        return;
                    }
                }
                if (actionUpdate && border !== '' && sheet.topLeftCell.includes("" + (rowIdx + 1))) {
                    this.parent.getMainContent().parentElement.scrollTop -= this.getBorderSize(border);
                }
                this.setThickBorderHeight(border, rowIdx - 1, colIdx, prevCell, pRow, pHRow, actionUpdate, lastCell, manualUpdate);
                prevCell.style.borderBottom = (border === 'none') ? prevCell.style.borderBottom : border;
            }
        }
        else {
            cell.style.borderTop = border;
        }
    };
    CellFormat.prototype.setThickBorderHeight = function (border, rowIdx, colIdx, cell, row, hRow, actionUpdate, lastCell, manualUpdate) {
        var size = border ? this.getBorderSize(border) : 1;
        var sheet = this.parent.getActiveSheet();
        if (size > 2 && (!sheet.rows[rowIdx] || !sheet.rows[rowIdx].customHeight)) {
            if (manualUpdate) {
                if (!this.checkHeight) {
                    this.checkHeight = true;
                }
                this.updateRowHeight(rowIdx, colIdx, lastCell, actionUpdate);
            }
            else {
                var prevHeight = getRowHeight(sheet, rowIdx);
                var height = Math.ceil(this.parent.calculateHeight(this.parent.getCellStyleValue(['fontFamily', 'fontSize'], [rowIdx, colIdx]), 1, 3));
                if (height > prevHeight) {
                    setRowEleHeight(this.parent, sheet, height, rowIdx, row, hRow);
                }
            }
        }
        if (actionUpdate && (lastCell || !this.checkHeight) && size < 3 && (!sheet.rows[rowIdx] ||
            !sheet.rows[rowIdx].customHeight)) {
            if (!this.checkHeight) {
                this.checkHeight = true;
            }
            this.updateRowHeight(rowIdx, colIdx, lastCell, actionUpdate);
        }
    };
    CellFormat.prototype.getBorderSize = function (border) {
        var size = border.split(' ')[0];
        return size === 'thin' ? 1 : (size === 'medium' ? 2 : (size === 'thick' ? 3 : (parseInt(size, 10) || 1)));
    };
    CellFormat.prototype.clearObj = function (args) {
        var _this = this;
        var options = args.options;
        var range = options.range ? (options.range.indexOf('!') > 0) ?
            options.range.substring(options.range.lastIndexOf('!') + 1) : options.range : this.parent.getActiveSheet().selectedRange;
        var sheetIndex = (options.range && options.range.indexOf('!') > 0) ?
            getSheetIndex(this.parent, options.range.substring(0, options.range.lastIndexOf('!'))) :
            this.parent.activeSheetIndex;
        var rangeIdx = getSwapRange(getRangeIndexes(range));
        var isRangeReadOnly = isReadOnlyCells(this.parent, rangeIdx);
        if (isRangeReadOnly) {
            if (args.isAction) {
                this.parent.notify(readonlyAlert, null);
            }
            return;
        }
        var sheet = this.parent.sheets[sheetIndex];
        var sRIdx = rangeIdx[0];
        var eRIdx = rangeIdx[2];
        var sCIdx;
        var eCIdx;
        var overlayElements = this.parent.element.getElementsByClassName('e-ss-overlay-active');
        var isOverlay = overlayElements.length > 0;
        var clearCFArgs;
        var isSelectAll = this.parent.element.getElementsByClassName('e-prev-highlight-bottom').length > 0;
        var eventArgs = { range: range, type: options.type, requestType: 'clear',
            sheetIndex: sheetIndex };
        var actionBegin = function () {
            if (args.isAction) {
                _this.parent.notify(beginAction, { action: 'beforeClear', eventArgs: eventArgs });
            }
        };
        var actionComplete = function () {
            if (args.isAction) {
                eventArgs = { range: sheet.name + '!' + range, type: options.type, sheetIndex: sheetIndex };
                if (clearCFArgs) {
                    eventArgs.cfClearActionArgs = clearCFArgs.cfClearActionArgs;
                }
                _this.parent.notify(completeAction, { eventArgs: eventArgs, action: 'clear', isSelectAll: isSelectAll });
            }
        };
        var isClearAll = options.type === 'Clear All';
        if (isOverlay) {
            if (options.type === 'Clear Contents' || isClearAll) {
                actionBegin();
                if (overlayElements[0].classList.contains('e-datavisualization-chart')) {
                    this.parent.notify(deleteChart, {
                        id: overlayElements[0].id, sheetIdx: this.parent.activeSheetIndex + 1, clearAction: true
                    });
                }
                else {
                    this.parent.notify(deleteImage, {
                        id: overlayElements[0].id, sheetIdx: this.parent.activeSheetIndex + 1, clearAction: true
                    });
                }
                actionComplete();
            }
        }
        else {
            actionBegin();
            if (options.type === 'Clear Formats' || isClearAll) {
                clearCFArgs = { range: range, sheetIdx: sheetIndex, isClear: true };
                this.parent.notify(clearCFRule, clearCFArgs);
                args.cfClearActionArgs = clearCFArgs.cfClearActionArgs;
                if (isClearAll) {
                    this.parent.notify(cellValidation, { range: range, isRemoveValidation: true });
                    if (sRIdx === 0 && rangeIdx[1] === 0 && eRIdx >= sheet.usedRange.rowIndex && rangeIdx[3] >= sheet.usedRange.colIndex) {
                        this.parent.setUsedRange(sRIdx, rangeIdx[1], sheet, false, true);
                    }
                }
                for (sRIdx; sRIdx <= eRIdx; sRIdx++) {
                    sCIdx = rangeIdx[1];
                    eCIdx = rangeIdx[3];
                    for (sCIdx; sCIdx <= eCIdx; sCIdx++) {
                        var cell = getCell(sRIdx, sCIdx, sheet);
                        var cellElem = this.parent.getCell(sRIdx, sCIdx);
                        if (cell) {
                            if (isClearAll && cell.formula) {
                                this.parent.notify(clearFormulaDependentCells, { cellRef: getRangeAddress([sRIdx, sCIdx, sRIdx, sCIdx]) });
                            }
                            if (cell.wrap) {
                                this.parent.notify(wrapEvent, { range: [sRIdx, sCIdx, sRIdx, sCIdx], wrap: false, sheet: sheet });
                            }
                            if (cell.hyperlink) {
                                if (cellElem) {
                                    removeClass(cellElem.querySelectorAll('.e-hyperlink'), 'e-hyperlink-style');
                                }
                                if (isClearAll) {
                                    this.parent.removeHyperlink(sheet.name + '!' + getRangeAddress([sRIdx, sCIdx, sRIdx, sCIdx]));
                                }
                            }
                        }
                    }
                }
            }
            if (options.type === 'Clear Hyperlinks') {
                this.parent.removeHyperlink(sheet.name + '!' + range);
            }
            this.parent.notify(clear, { range: sheet.name + '!' + range, type: options.type });
            this.parent.serviceLocator.getService('cell').refreshRange(getSwapRange(getRangeIndexes(range)), false, false, false, options.type === 'Clear Hyperlinks' ? true : false, isImported(this.parent), !isClearAll, null, null, null, isSelectAll);
            if (!args.isFromUpdateAction) {
                this.parent.notify(selectRange, { address: range });
            }
            this.parent.notify(activeCellChanged, null);
            actionComplete();
        }
    };
    CellFormat.prototype.addEventListener = function () {
        this.parent.on(applyCellFormat, this.applyCellFormat, this);
        this.parent.on(clearViewer, this.clearObj, this);
    };
    CellFormat.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(applyCellFormat, this.applyCellFormat);
            this.parent.off(clearViewer, this.clearObj);
        }
    };
    /**
     * Destroy cell format module.
     *
     * @returns {void} - Destroy cell format module.
     */
    CellFormat.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
        this.checkHeight = null;
    };
    /**
     * Get the cell format module name.
     *
     * @returns {string} - Get the cell format module name.
     */
    CellFormat.prototype.getModuleName = function () {
        return 'cellformat';
    };
    return CellFormat;
}());
export { CellFormat };
