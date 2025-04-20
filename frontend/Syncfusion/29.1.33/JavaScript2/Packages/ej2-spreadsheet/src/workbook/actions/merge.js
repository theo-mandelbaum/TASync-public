import { getCell, setCell, getSheet } from '../base/index';
import { setMerge, getSwapRange, getRangeIndexes, mergedRange, applyMerge, activeCellMergedRange } from './../common/index';
import { insertMerge, activeCellChanged, checkIsFormula, applyCF, updateCell } from './../common/index';
import { refreshChart } from './../common/index';
import { extend, isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
/**
 * The `WorkbookMerge` module is used to merge the range of cells.
 */
var WorkbookMerge = /** @class */ (function () {
    /**
     * Constructor for the workbook merge module.
     *
     * @param {Workbook} parent - Specifies the workbook.
     * @private
     */
    function WorkbookMerge(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    WorkbookMerge.prototype.merge = function (args) {
        args.sheetIndex = isUndefined(args.sheetIndex) ? this.parent.activeSheetIndex : args.sheetIndex;
        if (args.isAction) {
            this.parent.notify('actionBegin', { eventArgs: args, action: 'merge' });
            if (!args.model) {
                args.model = [];
            }
        }
        if (typeof args.range === 'string') {
            args.range = getRangeIndexes(args.range);
        }
        var range = args.range = getSwapRange(args.range);
        if (!args.skipChecking) {
            this.mergedRange(args);
        }
        if (!args.merge || args.type === 'All') {
            this.mergeAll(args);
            if (args.refreshRibbon) {
                this.parent.notify(activeCellChanged, null);
            }
        }
        else if (args.type === 'Horizontally') {
            for (var rowIdx = args.range[0], endIdx = args.range[2]; rowIdx <= endIdx; rowIdx++) {
                args.range = [rowIdx, range[1], rowIdx, range[3]];
                this.mergeAll(args, rowIdx - range[0]);
            }
        }
        else if (args.type === 'Vertically') {
            for (var colIdx = args.range[1], endIdx = args.range[3]; colIdx <= endIdx; colIdx++) {
                args.range = [range[0], colIdx, range[2], colIdx];
                this.mergeAll(args, 0, colIdx - range[1]);
            }
        }
        args.range = range;
        this.parent.setUsedRange(args.range[2], args.range[3]);
        if (args.isAction) {
            this.parent.notify('actionComplete', { eventArgs: args, action: 'merge' });
        }
        if (args.sheetIndex === this.parent.activeSheetIndex) {
            this.parent.notify('selectRange', { address: getSheet(this.parent, args.sheetIndex).selectedRange, skipChecking: true });
            if (this.parent.chartColl && this.parent.chartColl.length) {
                this.parent.notify(refreshChart, { range: args.range });
            }
        }
    };
    WorkbookMerge.prototype.mergeAll = function (args, startRow, startCol) {
        if (startRow === void 0) { startRow = 0; }
        if (startCol === void 0) { startCol = 0; }
        var rowSpan = 0;
        var cell;
        args.range = args.range;
        var colSpan;
        var cellValue;
        var refreshAllCF;
        var format;
        var modelCell;
        var sheet = isUndefined(args.sheetIndex) ? this.parent.getActiveSheet() : getSheet(this.parent, args.sheetIndex);
        var updateObj = { cell: new Object(), rowIdx: args.range[0], colIdx: args.range[1], valChange: !args.merge,
            preventEvt: true, uiRefresh: !args.preventRefresh, skipFormatCheck: true };
        for (var rowIdx = args.range[0], rIdx = startRow; rowIdx <= args.range[2]; rowIdx++, rIdx++) {
            colSpan = 0;
            if (args.isAction && !args.model[rIdx]) {
                args.model.push({ cells: [] });
            }
            for (var colIdx = args.range[1], cIdx = startCol; colIdx <= args.range[3]; colIdx++, cIdx++) {
                cell = getCell(rowIdx, colIdx, sheet);
                if (cell && (cell.value || cell.value === 0 || cell.formula) && !cellValue) {
                    cellValue = cell.formula || cell.value;
                    format = cell.format;
                }
                if (args.isAction && args.merge) {
                    modelCell = args.model[rIdx].cells[cIdx] = {};
                    extend(modelCell, cell, null, true);
                }
                if (cell) {
                    delete cell.rowSpan;
                    delete cell.colSpan;
                    modelCell = !args.merge && !args.isAction && args.model && args.model[rIdx] &&
                        args.model[rIdx].cells[cIdx];
                    var isManualCalcMode = this.parent.calculationMode === 'Manual' &&
                        this.parent.getActiveSheet().isSheetCalculated &&
                        !isNullOrUndefined(cell.value) && cell.value !== '';
                    if (modelCell) {
                        if (isManualCalcMode) {
                            modelCell.value = cell.value;
                        }
                        setCell(rowIdx, colIdx, sheet, modelCell);
                    }
                    else if (args.model && args.model[rIdx].cells[cIdx] && isManualCalcMode) {
                        args.model[rIdx].cells[cIdx].value = cell.value;
                    }
                }
                if (rowIdx === args.range[0] && colIdx === args.range[1]) {
                    if (args.merge) {
                        if (args.range[3] - args.range[1] > 0) {
                            updateObj.cell.colSpan = (args.range[3] - args.range[1]) + 1;
                        }
                        if (args.range[2] - args.range[0] > 0) {
                            updateObj.cell.rowSpan = (args.range[2] - args.range[0]) + 1;
                        }
                        updateCell(this.parent, sheet, updateObj);
                        updateObj.valChange = updateObj.mergedCells = true;
                        continue;
                    }
                }
                else {
                    updateObj.rowIdx = rowIdx;
                    updateObj.colIdx = colIdx;
                    updateObj.cell = {};
                    if (args.merge) {
                        if (rowIdx !== args.range[0]) {
                            updateObj.cell.rowSpan = -rowSpan;
                        }
                        if (colIdx !== args.range[1]) {
                            colSpan++;
                            updateObj.cell.colSpan = -colSpan;
                        }
                    }
                }
                updateCell(this.parent, sheet, updateObj);
                if (!refreshAllCF) {
                    refreshAllCF = updateObj.isFormulaDependent;
                }
            }
            rowSpan++;
        }
        if (args.merge) {
            if (cellValue || cellValue === 0) {
                delete updateObj.mergedCells;
                updateObj.cell = {};
                var curCell = getCell(args.range[0], args.range[1], sheet);
                if (!curCell || (!curCell.value && !curCell.formula)) {
                    if (checkIsFormula(cellValue)) {
                        updateObj.cell.formula = cellValue;
                    }
                    else {
                        updateObj.cell.value = cellValue;
                    }
                    if (format) {
                        updateObj.cell.format = format;
                    }
                }
                updateObj.rowIdx = args.range[0];
                updateObj.colIdx = args.range[1];
                updateCell(this.parent, sheet, updateObj);
            }
            else if (!args.preventRefresh) {
                this.parent.notify(applyMerge, { rowIdx: args.range[0], colIdx: args.range[1] });
            }
        }
        if (!args.preventRefresh) {
            this.refreshCF(sheet, args.range.slice(), refreshAllCF, args.merge);
        }
    };
    WorkbookMerge.prototype.refreshCF = function (sheet, range, refreshAll, isMerge) {
        if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
            if (isMerge) {
                this.parent.notify(applyCF, { indexes: [range[0], range[1]], refreshAll: refreshAll, isAction: true });
            }
            else {
                this.parent.notify(applyCF, { indexes: range, refreshAll: refreshAll, isAction: true });
            }
        }
    };
    WorkbookMerge.prototype.activeCellRange = function (args) {
        args.range = args.range;
        var sheet = this.parent.getActiveSheet();
        var cell = getCell(args.range[0], args.range[1], sheet);
        if (cell) {
            if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                args.range[0] += cell.rowSpan;
                if (args.insertCount) {
                    args.range[0] -= args.insertCount;
                }
            }
            if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                args.range[1] += cell.colSpan;
                if (args.insertCount) {
                    args.range[1] -= args.insertCount;
                }
            }
            cell = getCell(args.range[0], args.range[1], sheet);
            if (cell) {
                if (cell.rowSpan > 1 && (args.range[0] + (cell.rowSpan - 1) >= args.range[2] || args.insertCount)) {
                    args.range[2] = args.range[0] + (cell.rowSpan - 1);
                }
                if (cell.colSpan > 1 && (args.range[1] + (cell.colSpan - 1) >= args.range[3] || args.insertCount)) {
                    args.range[3] = args.range[1] + (cell.colSpan - 1);
                }
            }
        }
    };
    WorkbookMerge.prototype.mergedRange = function (args) {
        if (typeof (args.range) === 'string') {
            args.range = getRangeIndexes(args.range);
        }
        if (args.range[0] <= args.range[2] && args.range[1] <= args.range[3]) {
            this.forward(args);
        }
        else if (args.range[0] >= args.range[2] && args.range[1] >= args.range[3]) {
            this.reverse(args);
        }
        else if (args.range[0] < args.range[2] && args.range[1] > args.range[3]) {
            this.forwardReverse(args);
        }
        else if (args.range[0] > args.range[2] && args.range[1] < args.range[3]) {
            this.reverseForward(args);
        }
    };
    WorkbookMerge.prototype.forward = function (args) {
        args.range = args.range;
        var sheet = isUndefined(args.sheetIndex) ? this.parent.getActiveSheet() : getSheet(this.parent, args.sheetIndex);
        var cell = getCell(args.range[0], args.range[1], sheet);
        var endRowIdx;
        var endColIdx;
        var rowIdx = endRowIdx = args.range[0];
        var colIdx = endColIdx = args.range[1];
        if (cell) {
            if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                rowIdx = endRowIdx = args.range[0] + cell.rowSpan;
            }
            if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                colIdx = endColIdx = args.range[1] + cell.colSpan;
            }
            cell = getCell(rowIdx, colIdx, sheet);
            if (cell) {
                if (cell.rowSpan > 1) {
                    endRowIdx += (cell.rowSpan - 1);
                    if (rowIdx + (cell.rowSpan - 1) >= args.range[2]) {
                        args.range[2] = args.range[0];
                        args.range[2] = rowIdx + (cell.rowSpan - 1);
                    }
                }
                if (cell.colSpan > 1) {
                    endColIdx += (cell.colSpan - 1);
                    if (colIdx + (cell.colSpan - 1) >= args.range[3]) {
                        args.range[3] = args.range[1];
                        args.range[3] = colIdx + (cell.colSpan - 1);
                    }
                }
            }
        }
        args.range[0] = rowIdx;
        args.range[1] = colIdx;
        if (args.range[0] === rowIdx && args.range[1] === colIdx && args.range[2] === endRowIdx && args.range[3] === endColIdx) {
            args.isActiveCell = true;
        }
        if (args.skipChecking) {
            return;
        }
        for (var i = args.range[1]; i <= args.range[3]; i++) {
            cell = getCell(args.range[2], i, sheet);
            if (cell) {
                rowIdx = args.range[2];
                colIdx = i;
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    colIdx += cell.colSpan;
                    if (colIdx < args.range[1]) {
                        args.range[1] = colIdx;
                    }
                }
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rowIdx += cell.rowSpan;
                    if (rowIdx < args.range[0]) {
                        args.range[0] = rowIdx;
                    }
                }
                cell = getCell(rowIdx, colIdx, sheet);
                if (cell) {
                    if (cell.colSpan > 1 && colIdx + (cell.colSpan - 1) > args.range[3]) {
                        args.range[3] = colIdx;
                        args.range[3] = colIdx + (cell.colSpan - 1);
                    }
                    if (cell.rowSpan > 1 && rowIdx + (cell.rowSpan - 1) > args.range[2]) {
                        args.range[2] = rowIdx;
                        args.range[2] = rowIdx + (cell.rowSpan - 1);
                    }
                }
            }
        }
        var startRowIdx;
        var startColIdx;
        for (var i = args.range[1]; i <= args.range[3]; i++) {
            cell = getCell(args.range[0], i, sheet);
            if (cell) {
                startColIdx = i;
                startRowIdx = args.range[0];
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    startColIdx += cell.colSpan;
                    if (startColIdx < args.range[1]) {
                        args.range[1] = startColIdx;
                    }
                }
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    startRowIdx += cell.rowSpan;
                    if (startRowIdx < args.range[0]) {
                        args.range[0] = startRowIdx;
                    }
                }
            }
        }
        for (var i = args.range[0]; i <= args.range[2]; i++) {
            cell = getCell(i, args.range[3], sheet);
            if (cell) {
                rowIdx = i;
                colIdx = args.range[3];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rowIdx += cell.rowSpan;
                    if (rowIdx < args.range[0]) {
                        args.range[0] = rowIdx;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    colIdx += cell.colSpan;
                    if (colIdx < args.range[1]) {
                        args.range[1] = colIdx;
                    }
                }
                cell = getCell(rowIdx, colIdx, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && rowIdx + (cell.rowSpan - 1) > args.range[2]) {
                        args.range[2] = rowIdx;
                        args.range[2] = rowIdx + (cell.rowSpan - 1);
                    }
                    if (cell.colSpan > 1 && colIdx + (cell.colSpan - 1) > args.range[3]) {
                        args.range[3] = colIdx;
                        args.range[3] = colIdx + (cell.colSpan - 1);
                    }
                }
            }
        }
    };
    WorkbookMerge.prototype.forwardReverse = function (args) {
        var sheet = this.parent.getActiveSheet();
        args.range = args.range;
        var colIndex = args.range[1];
        var cell = getCell(args.range[0], args.range[1], sheet);
        var rowIndex = args.range[0];
        if (cell) {
            if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                colIndex += cell.colSpan;
                if (args.range[3] >= colIndex) {
                    args.range[3] = colIndex;
                }
            }
            if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                rowIndex += cell.rowSpan;
                if (rowIndex < args.range[0]) {
                    args.range[0] = rowIndex;
                }
            }
            cell = getCell(rowIndex, colIndex, sheet);
            if (cell) {
                if (cell.rowSpan > 1 && rowIndex + (cell.rowSpan - 1) >= args.range[2]) {
                    args.range[2] = rowIndex + (cell.rowSpan - 1);
                }
                if (cell.colSpan > 1 && colIndex + (cell.colSpan - 1) >= args.range[1]) {
                    args.range[1] = colIndex + (cell.colSpan - 1);
                }
            }
        }
        args.range[0] = rowIndex;
        if (args.skipChecking) {
            return;
        }
        var rowIdx;
        var cellIdx;
        for (var i = args.range[3]; i <= args.range[1]; i++) {
            cell = getCell(args.range[2], i, sheet);
            if (cell) {
                cellIdx = i;
                rowIdx = args.range[2];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rowIdx += cell.rowSpan;
                    if (rowIdx < args.range[0]) {
                        args.range[0] = rowIdx;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    cellIdx += cell.colSpan;
                    if (cellIdx < args.range[3]) {
                        args.range[3] = cellIdx;
                    }
                }
                cell = getCell(rowIdx, cellIdx, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && rowIdx + (cell.rowSpan - 1) > args.range[2]) {
                        args.range[2] = rowIdx + (cell.rowSpan - 1);
                    }
                    if (cell.colSpan > 1 && cellIdx + (cell.colSpan - 1) > args.range[1]) {
                        args.range[1] = cellIdx + (cell.colSpan - 1);
                    }
                }
            }
        }
        var startRowIndex;
        for (var i = args.range[3]; i <= args.range[1]; i++) {
            cell = getCell(args.range[0], i, sheet);
            if (cell) {
                cellIdx = i;
                startRowIndex = args.range[0];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    startRowIndex += cell.rowSpan;
                    if (startRowIndex < args.range[0]) {
                        args.range[0] = startRowIndex;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    cellIdx += cell.colSpan;
                }
                cell = getCell(startRowIndex, cellIdx, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && startRowIndex + (cell.rowSpan - 1) > args.range[2]) {
                        args.range[2] = startRowIndex + (cell.rowSpan - 1);
                    }
                    if (cell.colSpan > 1 && cellIdx + (cell.colSpan - 1) > args.range[1]) {
                        args.range[1] = cellIdx;
                        args.range[1] = cellIdx + (cell.colSpan - 1);
                    }
                }
            }
        }
        var colIdx;
        for (var i = args.range[0]; i <= args.range[2]; i++) {
            cell = getCell(i, args.range[3], sheet);
            if (cell) {
                startRowIndex = i;
                colIdx = args.range[3];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    startRowIndex += cell.rowSpan;
                    if (startRowIndex < args.range[0]) {
                        args.range[0] = startRowIndex;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    colIdx += cell.colSpan;
                    if (colIdx < args.range[3]) {
                        args.range[3] = colIdx;
                    }
                }
                cell = getCell(startRowIndex, colIdx, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && startRowIndex + (cell.rowSpan - 1) > args.range[2]) {
                        args.range[2] = startRowIndex;
                        args.range[2] = startRowIndex + (cell.rowSpan - 1);
                    }
                    if (cell.colSpan > 1 && colIdx + (cell.colSpan - 1) > args.range[1]) {
                        args.range[1] = colIdx;
                        args.range[1] = colIdx + (cell.colSpan - 1);
                    }
                }
            }
        }
    };
    WorkbookMerge.prototype.reverse = function (args) {
        args.range = args.range;
        var colnIdx = args.range[1];
        var sheet = isUndefined(args.sheetIndex) ? this.parent.getActiveSheet() : getSheet(this.parent, args.sheetIndex);
        var cell = getCell(args.range[0], args.range[1], sheet);
        var rowIdx = args.range[0];
        if (cell) {
            if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                colnIdx += cell.colSpan;
            }
            if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                rowIdx += cell.rowSpan;
            }
            if (args.range[2] >= rowIdx) {
                args.range[2] = rowIdx;
                args.isActiveCell = true;
            }
            if (args.range[3] >= colnIdx) {
                args.range[3] = colnIdx;
                if (args.range[2] === rowIdx) {
                    args.isActiveCell = true;
                }
            }
            else if (args.isActiveCell) {
                args.isActiveCell = false;
            }
            cell = getCell(rowIdx, colnIdx, sheet);
            if (cell) {
                if (cell.rowSpan > 1 && rowIdx + (cell.rowSpan - 1) >= args.range[0]) {
                    args.range[0] = rowIdx;
                    args.range[0] = rowIdx + (cell.rowSpan - 1);
                }
                if (cell.colSpan > 1 && colnIdx + (cell.colSpan - 1) >= args.range[1]) {
                    args.range[1] = colnIdx;
                    args.range[1] = colnIdx + (cell.colSpan - 1);
                }
            }
        }
        var colIdx = args.range[3];
        if (args.skipChecking) {
            return;
        }
        for (var i = args.range[3]; i <= args.range[1]; i++) {
            cell = getCell(args.range[2], i, sheet);
            if (cell) {
                colIdx = i;
                rowIdx = args.range[2];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rowIdx += cell.rowSpan;
                    if (rowIdx < args.range[2]) {
                        args.range[2] = rowIdx;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    colIdx += cell.colSpan;
                    if (colIdx < args.range[3]) {
                        args.range[3] = colIdx;
                    }
                }
                cell = getCell(rowIdx, colIdx, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && rowIdx + (cell.rowSpan - 1) > args.range[0]) {
                        args.range[0] = rowIdx;
                        args.range[0] = rowIdx + (cell.rowSpan - 1);
                    }
                    if (cell.colSpan > 1 && colIdx + (cell.colSpan - 1) > args.range[1]) {
                        args.range[1] = colIdx;
                        args.range[1] = colIdx + (cell.colSpan - 1);
                    }
                }
            }
        }
        colIdx = args.range[3];
        for (var i = args.range[3]; i <= args.range[1]; i++) {
            cell = getCell(args.range[0], i, sheet);
            if (cell) {
                colIdx = i;
                rowIdx = args.range[0];
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    colIdx += cell.colSpan;
                }
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rowIdx += cell.rowSpan;
                }
                cell = getCell(rowIdx, colIdx, sheet);
                if (cell) {
                    if (cell.colSpan > 1 && colIdx + (cell.colSpan - 1) > args.range[1]) {
                        args.range[1] = colIdx;
                        args.range[1] = colIdx + (cell.colSpan - 1);
                    }
                    if (cell.rowSpan > 1 && rowIdx + (cell.rowSpan - 1) > args.range[0]) {
                        args.range[0] = rowIdx;
                        args.range[0] = rowIdx + (cell.rowSpan - 1);
                    }
                }
            }
        }
        var cellIndex;
        var rIdx;
        for (var i = args.range[2]; i <= args.range[0]; i++) {
            cell = getCell(i, args.range[3], sheet);
            if (cell) {
                rIdx = i;
                cellIndex = args.range[3];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rIdx += cell.rowSpan;
                    if (rIdx < args.range[2]) {
                        args.range[2] = rIdx;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    cellIndex += cell.colSpan;
                    if (cellIndex < args.range[3]) {
                        args.range[3] = cellIndex;
                    }
                }
                cell = getCell(rIdx, cellIndex, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && rIdx + (cell.rowSpan - 1) > args.range[0]) {
                        args.range[0] = rIdx;
                        args.range[0] = rIdx + (cell.rowSpan - 1);
                    }
                    if (cell.colSpan > 1 && cellIndex + (cell.colSpan - 1) > args.range[1]) {
                        args.range[1] = cellIndex;
                        args.range[1] = cellIndex + (cell.colSpan - 1);
                    }
                }
            }
        }
    };
    WorkbookMerge.prototype.reverseForward = function (args) {
        args.range = args.range;
        var sheet = isUndefined(args.sheetIndex) ? this.parent.getActiveSheet() : getSheet(this.parent, args.sheetIndex);
        var rIdx = args.range[0];
        var cIdx = args.range[1];
        var cell = getCell(args.range[0], args.range[1], sheet);
        if (cell) {
            if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                rIdx += cell.rowSpan;
                if (args.range[2] >= rIdx) {
                    args.range[2] = rIdx;
                }
            }
            if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                cIdx += cell.colSpan;
            }
            cell = getCell(rIdx, cIdx, sheet);
            if (cell) {
                if (cell.rowSpan > 1 && rIdx + (cell.rowSpan - 1) >= args.range[0]) {
                    args.range[0] = rIdx;
                    args.range[0] = rIdx + (cell.rowSpan - 1);
                }
                if (cell.colSpan > 1 && cIdx + (cell.colSpan - 1) >= args.range[3]) {
                    args.range[3] = args.range[1];
                    args.range[3] = cIdx + (cell.colSpan - 1);
                }
            }
        }
        if (args.skipChecking) {
            return;
        }
        var cIndex = args.range[3];
        var rIndex;
        for (var i = args.range[1]; i <= args.range[3]; i++) {
            cell = getCell(args.range[2], i, sheet);
            if (cell) {
                rIndex = args.range[2];
                cIndex = i;
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rIndex += cell.rowSpan;
                    if (rIndex < args.range[2]) {
                        args.range[2] = rIndex;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    cIndex += cell.colSpan;
                    if (cIndex < args.range[1]) {
                        args.range[1] = cIndex;
                    }
                }
                cell = getCell(rIndex, cIndex, sheet);
                if (cell) {
                    if (cell.colSpan > 1 && cIndex + (cell.colSpan - 1) > args.range[3]) {
                        args.range[3] = cIndex + (cell.colSpan - 1);
                    }
                    if (cell.rowSpan > 1 && (cell.rowSpan - 1) + rIndex > args.range[0]) {
                        args.range[0] = (cell.rowSpan - 1) + rIndex;
                    }
                }
            }
        }
        var sRowIdx;
        var sColIdx;
        for (var i = args.range[1]; i <= args.range[3]; i++) {
            cell = getCell(args.range[0], i, sheet);
            if (cell) {
                sColIdx = i;
                sRowIdx = args.range[0];
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    sColIdx += cell.colSpan;
                    if (sColIdx < args.range[1]) {
                        args.range[1] = sColIdx;
                    }
                }
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    sRowIdx += cell.rowSpan;
                }
                cell = getCell(sRowIdx, sColIdx, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && sRowIdx + (cell.rowSpan - 1) > args.range[0]) {
                        args.range[0] = sRowIdx + (cell.rowSpan - 1);
                    }
                }
            }
        }
        var cellIndex;
        for (var i = args.range[2]; i <= args.range[0]; i++) {
            cell = getCell(i, args.range[3], sheet);
            if (cell) {
                rIndex = i;
                cellIndex = args.range[3];
                if (!isNullOrUndefined(cell.rowSpan) && cell.rowSpan < 0) {
                    rIndex += cell.rowSpan;
                    if (rIndex < args.range[2]) {
                        args.range[2] = rIndex;
                    }
                }
                if (!isNullOrUndefined(cell.colSpan) && cell.colSpan < 0) {
                    cellIndex += cell.colSpan;
                    if (cellIndex < args.range[1]) {
                        args.range[1] = cellIndex;
                    }
                }
                cell = getCell(rIndex, cellIndex, sheet);
                if (cell) {
                    if (cell.rowSpan > 1 && (cell.rowSpan - 1) + rIndex > args.range[0]) {
                        args.range[0] = (cell.rowSpan - 1) + rIndex;
                    }
                    if (cell.colSpan > 1 && (cell.colSpan - 1) + cellIndex > args.range[3]) {
                        args.range[3] = cellIndex;
                        args.range[3] = (cell.colSpan - 1) + cellIndex;
                    }
                }
            }
        }
    };
    WorkbookMerge.prototype.insertHandler = function (args) {
        this.activeCellRange(args);
        args.range = args.range;
        if (args.insertModel === 'Row') {
            args.range[2] += args.insertCount;
        }
        else {
            args.range[3] += args.insertCount;
        }
        args.preventRefresh = true;
        args.merge = true;
        this.mergeAll(args);
    };
    WorkbookMerge.prototype.addEventListener = function () {
        this.parent.on(setMerge, this.merge, this);
        this.parent.on(mergedRange, this.mergedRange, this);
        this.parent.on(activeCellMergedRange, this.activeCellRange, this);
        this.parent.on(insertMerge, this.insertHandler, this);
    };
    /**
     * Destroy workbook merge module.
     *
     * @returns {void} - destroy the workbook merge module.
     */
    WorkbookMerge.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookMerge.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(setMerge, this.merge);
            this.parent.off(mergedRange, this.mergedRange);
            this.parent.off(activeCellMergedRange, this.activeCellRange);
            this.parent.off(insertMerge, this.insertHandler);
        }
    };
    /**
     * Get the workbook merge module name.
     *
     * @returns {string} - Return the string.
     */
    WorkbookMerge.prototype.getModuleName = function () {
        return 'workbookmerge';
    };
    return WorkbookMerge;
}());
export { WorkbookMerge };
