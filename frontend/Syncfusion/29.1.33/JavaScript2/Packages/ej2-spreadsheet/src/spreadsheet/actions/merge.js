import { applyMerge, activeCellMergedRange, skipHiddenIdx } from '../../workbook/common/index';
import { hiddenMerge } from '../common/index';
import { checkPrevMerge, checkMerge } from '../common/index';
import { getCell, isHiddenCol, isHiddenRow, isImported } from '../../workbook/index';
/**
 * The `Merge` module is used to to merge the range of cells.
 */
var Merge = /** @class */ (function () {
    /**
     * Constructor for the Spreadsheet merge module.
     *
     * @param {Spreadsheet} parent - Specify the spreadsheet.
     * @private
     */
    function Merge(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    Merge.prototype.merge = function (args) {
        this.parent.serviceLocator.getService('cell').refresh(args.rowIdx, args.colIdx, args.lastCell, args.element, false, false, isImported(this.parent));
    };
    Merge.prototype.hideHandler = function (args) {
        var sheet = this.parent.getActiveSheet();
        var mergeArgs = { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx] };
        this.parent.notify(activeCellMergedRange, mergeArgs);
        mergeArgs.range = mergeArgs.range;
        var cell = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet) || {};
        var startIdx = args.model === 'row' ? mergeArgs.range[0] : mergeArgs.range[1];
        var endIdx = startIdx + ((cell[args.model + "Span"] || 1) - 1);
        if ((!args.isEnd && (args.start === startIdx || isHiddenCol(sheet, startIdx))) || (args.isEnd && (args.start > startIdx &&
            !isHiddenCol(sheet, startIdx)))) {
            return;
        }
        if (cell[args.model + "Span"] > 1 && endIdx >= args.start) {
            if (args.model === 'row' ? isHiddenRow(sheet, startIdx) : isHiddenCol(sheet, startIdx)) {
                if (args.colIdx <= endIdx) {
                    var colIdx = skipHiddenIdx(sheet, mergeArgs.range[1], true, 'columns');
                    if (colIdx <= endIdx) {
                        var rowIdx = mergeArgs.range[0];
                        if (cell.rowSpan > 1) {
                            rowIdx = skipHiddenIdx(sheet, mergeArgs.range[0], true);
                            rowIdx = rowIdx <= mergeArgs.range[2] ? rowIdx : mergeArgs.range[0];
                        }
                        var cellEle = this.parent.getCell(rowIdx, colIdx);
                        if (cellEle) {
                            cellEle.style.display = '';
                            this.parent.serviceLocator.getService('cell').refresh(mergeArgs.range[0], mergeArgs.range[1], true, cellEle, true, true);
                        }
                    }
                }
            }
            else {
                var rowIdx = cell.rowSpan > 1 ? skipHiddenIdx(sheet, mergeArgs.range[0], true) : mergeArgs.range[0];
                this.merge({ rowIdx: mergeArgs.range[0], colIdx: mergeArgs.range[1], element: this.parent.getCell(rowIdx, mergeArgs.range[1]) });
            }
        }
    };
    Merge.prototype.checkPrevMerge = function (args) {
        var _this = this;
        var cell;
        var mergeArgs;
        var mergeCount;
        var isMergeApplied;
        var isRowMergeCell;
        var sheet = this.parent.getActiveSheet();
        var clearMerge = function () {
            var contTable = _this.parent.getContentTable();
            var contRow = contTable && contTable.rows[0];
            if (!contRow) {
                return;
            }
            var firstRowIdx = parseInt(contRow.getAttribute('aria-rowindex'), 10) - 1;
            mergeArgs.range = mergeArgs.range;
            if (firstRowIdx > _this.parent.viewport.topIndex + _this.parent.frozenRowCount(sheet) && firstRowIdx > mergeArgs.range[0] &&
                firstRowIdx <= mergeArgs.range[2]) {
                var cellEle = void 0;
                var hdrTable = _this.parent.getRowHeaderTable();
                var hdrRow = hdrTable && hdrTable.rows[0];
                var frozenCol = _this.parent.frozenColCount(sheet);
                if (frozenCol && !hdrRow) {
                    return;
                }
                for (var colIdx = args.colIdx; colIdx <= mergeArgs.range[3]; colIdx++) {
                    cellEle = _this.parent.getCell(firstRowIdx, colIdx, colIdx < frozenCol ? hdrRow : contRow);
                    if (cellEle && (cellEle.colSpan > 1 || cellEle.rowSpan > 1)) {
                        cellEle.style.display = 'none';
                        cellEle.removeAttribute('colSpan');
                        cellEle.removeAttribute('rowSpan');
                    }
                }
            }
        };
        var checkRowMerge = function (isColMerge) {
            mergeArgs.range = mergeArgs.range;
            if (isHiddenRow(sheet, mergeArgs.range[0]) && args.rowIdx >= mergeArgs.range[0] && args.rowIdx <= mergeArgs.range[2]) {
                isMergeApplied = false;
                for (var rowIdx = mergeArgs.range[0]; rowIdx < args.rowIdx; rowIdx++) {
                    if (!isHiddenRow(sheet, rowIdx)) {
                        isMergeApplied = true;
                        break;
                    }
                }
                if (cell.rowSpan > 1 && !isMergeApplied) {
                    var rowMergeCount = cell.rowSpan - _this.parent.hiddenCount(mergeArgs.range[0], mergeArgs.range[2]);
                    if (rowMergeCount > 0) {
                        clearMerge();
                        args.td.style.display = '';
                        args.colSpan = mergeCount;
                        args.rowSpan = rowMergeCount;
                        args.cell = cell;
                        args.isMerged = false;
                    }
                }
            }
            else if (isColMerge) {
                for (var rowIdx = mergeArgs.range[0]; isRowMergeCell && rowIdx < args.rowIdx; rowIdx++) {
                    if (!isHiddenRow(sheet, rowIdx)) {
                        isMergeApplied = true;
                        break;
                    }
                }
                if (!isMergeApplied) {
                    clearMerge();
                    args.td.style.display = '';
                    args.colSpan = mergeCount;
                    args.cell = cell;
                    args.isMerged = false;
                }
            }
        };
        if (args.cell.colSpan < 0) {
            if (args.colIdx - 1 > -1 && isHiddenCol(sheet, args.colIdx - 1)) {
                cell = getCell(args.rowIdx, args.colIdx - 1, sheet, false, true);
                isRowMergeCell = args.rowIdx - 1 > -1 && isHiddenRow(sheet, args.rowIdx - 1);
                if ((cell.colSpan !== undefined || cell.rowSpan !== undefined) && (cell.rowSpan === undefined ||
                    cell.rowSpan > 1 || isRowMergeCell)) {
                    mergeArgs = { range: [args.rowIdx, args.colIdx - 1, args.rowIdx, args.colIdx - 1] };
                    this.parent.notify(activeCellMergedRange, mergeArgs);
                    mergeArgs.range = mergeArgs.range;
                    cell = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet, false, true);
                    if (isHiddenCol(sheet, mergeArgs.range[1]) && args.colIdx >= mergeArgs.range[1] && args.colIdx <= mergeArgs.range[3]) {
                        for (var colIdx = mergeArgs.range[1]; colIdx < args.colIdx; colIdx++) {
                            if (!isHiddenCol(sheet, colIdx)) {
                                isMergeApplied = true;
                                break;
                            }
                        }
                        if (cell.colSpan > 1 && !isMergeApplied) {
                            mergeCount = cell.colSpan - this.parent.hiddenCount(mergeArgs.range[1], mergeArgs.range[3], 'columns');
                            if (mergeCount > 0) {
                                checkRowMerge(true);
                            }
                        }
                    }
                }
            }
        }
        else {
            if (args.rowIdx - 1 > -1 && isHiddenRow(sheet, args.rowIdx - 1)) {
                cell = getCell(args.rowIdx - 1, args.colIdx, sheet, false, true);
                if (cell.rowSpan !== undefined) {
                    mergeArgs = { range: [args.rowIdx - 1, args.colIdx, args.rowIdx - 1, args.colIdx] };
                    this.parent.notify(activeCellMergedRange, mergeArgs);
                    mergeArgs.range = mergeArgs.range;
                    cell = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet, false, true);
                    checkRowMerge();
                }
            }
        }
    };
    Merge.prototype.checkMerge = function (args) {
        var sheet = this.parent.getActiveSheet();
        var mergeArgs;
        var cell = getCell(args.rowIdx, args.colIdx, sheet) || {};
        if (args.isRow) {
            if (cell.colSpan === undefined || isHiddenCol(sheet, args.colIdx - 1)) {
                mergeArgs = { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx] };
                mergeArgs.range = mergeArgs.range;
                this.parent.notify(activeCellMergedRange, mergeArgs);
                if ((isHiddenCol(sheet, args.colIdx - 1) && !isHiddenCol(sheet, mergeArgs.range[1])) || (args.isFreezePane &&
                    mergeArgs.range[0] < this.parent.frozenRowCount(sheet))) {
                    args.insideFreezePane = mergeArgs.range[0] < this.parent.frozenRowCount(sheet);
                    return;
                }
                if (args.colIdx !== this.parent.viewport.leftIndex + this.parent.frozenColCount(sheet) &&
                    isHiddenCol(sheet, args.colIdx - 1)) {
                    for (var colIdx = mergeArgs.range[1]; cell.colSpan !== undefined && colIdx < args.colIdx; colIdx++) {
                        if (!isHiddenCol(sheet, colIdx)) {
                            return;
                        }
                    }
                }
                cell = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet);
                var mergeCount = (mergeArgs.range[2] - args.rowIdx) + 1 -
                    this.parent.hiddenCount(args.rowIdx, mergeArgs.range[2]);
                if (mergeCount >= 1) {
                    this.merge({ rowIdx: mergeArgs.range[0], colIdx: mergeArgs.range[1], element: args.td });
                    if (mergeCount === 1) {
                        args.td.removeAttribute('rowspan');
                    }
                    else {
                        args.td.rowSpan = mergeCount;
                    }
                    args.td.style.display = '';
                }
            }
        }
        else {
            if (cell.rowSpan === undefined || isHiddenRow(sheet, args.rowIdx - 1)) {
                mergeArgs = { range: [args.rowIdx, args.colIdx, args.rowIdx, args.colIdx] };
                mergeArgs.range = mergeArgs.range;
                this.parent.notify(activeCellMergedRange, mergeArgs);
                if ((isHiddenRow(sheet, args.rowIdx - 1) && !isHiddenRow(sheet, mergeArgs.range[0])) || (args.isFreezePane &&
                    mergeArgs.range[1] < this.parent.frozenColCount(sheet))) {
                    args.insideFreezePane = mergeArgs.range[1] < this.parent.frozenColCount(sheet);
                    return;
                }
                if (args.rowIdx !== this.parent.viewport.topIndex + this.parent.frozenRowCount(sheet) &&
                    isHiddenRow(sheet, args.rowIdx - 1)) {
                    for (var rowIdx = mergeArgs.range[0]; cell.rowSpan !== undefined && rowIdx < args.rowIdx; rowIdx++) {
                        if (!isHiddenRow(sheet, rowIdx)) {
                            return;
                        }
                    }
                }
                cell = getCell(mergeArgs.range[0], mergeArgs.range[1], sheet);
                var mergeCount = (mergeArgs.range[3] - args.colIdx) + 1 - this.parent.hiddenCount(args.colIdx, mergeArgs.range[3], 'columns');
                if (mergeCount >= 1) {
                    this.merge({ rowIdx: mergeArgs.range[0], colIdx: mergeArgs.range[1], element: args.td });
                    if (mergeCount === 1) {
                        args.td.removeAttribute('colspan');
                    }
                    else {
                        args.td.colSpan = mergeCount;
                    }
                    args.td.style.display = '';
                }
            }
        }
    };
    Merge.prototype.addEventListener = function () {
        this.parent.on(applyMerge, this.merge, this);
        this.parent.on(hiddenMerge, this.hideHandler, this);
        this.parent.on(checkPrevMerge, this.checkPrevMerge, this);
        this.parent.on(checkMerge, this.checkMerge, this);
    };
    /**
     * Destroy merge module.
     *
     * @returns {void} - Destroy merge module.
     */
    Merge.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    Merge.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(applyMerge, this.merge);
            this.parent.off(hiddenMerge, this.hideHandler);
            this.parent.off(checkPrevMerge, this.checkPrevMerge);
            this.parent.off(checkMerge, this.checkMerge);
        }
    };
    /**
     * Get the merge module name.
     *
     * @returns {string} - Get the merge module name.
     */
    Merge.prototype.getModuleName = function () {
        return 'merge';
    };
    return Merge;
}());
export { Merge };
