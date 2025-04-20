import { getCell, setCell } from '../index';
import { deleteAction, refreshClipboard, beforeDelete } from '../../workbook/common/index';
import { activeCellMergedRange, setMerge, workbookFormulaOperation, deleteModel } from '../../workbook/common/index';
import { refreshInsertDelete, updateRowColCount, getSheetIndex, beginAction } from '../../workbook/index';
import { deleteFormatRange, getRangeIndexes, getRangeAddress } from '../../workbook/index';
import { extend } from '@syncfusion/ej2-base';
/**
 * The `WorkbookDelete` module is used to delete cells, rows, columns and sheets from workbook.
 */
var WorkbookDelete = /** @class */ (function () {
    /**
     * Constructor for the workbook delete module.
     *
     * @param {Workbook} parent - Specify the workbook
     * @private
     */
    function WorkbookDelete(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    // tslint:disable-next-line
    WorkbookDelete.prototype.deleteModel = function (args) {
        var _this = this;
        var sheetLength = this.parent.sheets.length;
        if (args.modelType === 'Sheet' && sheetLength === 1) {
            return;
        }
        var modelName = args.modelType.toLowerCase() + "s";
        args.start = args.start;
        if (args.start > args.end) {
            var startIdx = args.start;
            args.start = args.end;
            args.end = startIdx;
        }
        var eventArgs = { startIndex: args.start, endIndex: args.end, modelType: args.modelType,
            cancel: false, isUndoRedo: args.isUndoRedo };
        var actionArgs = { eventArgs: eventArgs, action: 'delete' };
        if (args.isAction) {
            this.parent.notify(beginAction, actionArgs);
            if (eventArgs.cancel) {
                return;
            }
        }
        var deletedCells;
        var prevCell;
        var mergeArgsCollection = [];
        var count = (args.end - args.start) + 1;
        var insertArgs = { startIndex: args.start, endIndex: args.end, modelType: args.modelType, sheet: args.model, isDelete: true };
        var isFinite = this.parent.scrollSettings.isFinite;
        if (args.modelType === 'Row') {
            if (args.checkCount !== undefined && args.checkCount === args.model.usedRange.rowIndex) {
                return;
            }
            this.parent.notify(refreshInsertDelete, insertArgs);
            args.model = args.model;
            if (isFinite) {
                if (args.start >= args.model.rowCount) {
                    return;
                }
                if (args.end >= args.model.rowCount) {
                    args.end = args.model.rowCount - 1;
                }
            }
            else {
                if (args.start > args.model.usedRange.rowIndex) {
                    return;
                }
                if (args.end > args.model.usedRange.rowIndex) {
                    args.end -= (args.end - args.model.usedRange.rowIndex);
                }
            }
            this.setRowColCount(args.start, args.end, args.model, 'row');
            if (args.start <= args.model.usedRange.rowIndex) {
                this.parent.setSheetPropertyOnMute(args.model, 'usedRange', { rowIndex: args.model.usedRange.rowIndex - ((args.end - args.start) + 1),
                    colIndex: args.model.usedRange.colIndex });
                if (args.model.usedRange.rowIndex < 0) {
                    this.parent.setSheetPropertyOnMute(args.model, 'usedRange', { rowIndex: 0, colIndex: args.model.usedRange.colIndex });
                }
            }
            var frozenRow = this.parent.frozenRowCount(args.model);
            if (args.start < frozenRow) {
                frozenRow = args.end < frozenRow ? (args.end - args.start) + 1 : frozenRow - args.start;
                frozenRow = args.model.frozenRows - frozenRow;
                this.parent.setSheetPropertyOnMute(args.model, 'frozenRows', frozenRow);
                eventArgs.freezePane = true;
            }
            var curIdx = args.end + 1;
            var cell = void 0;
            var mergeArgs = void 0;
            if (args.model.rows[args.start] && args.model.rows[args.start].cells) {
                for (var i = 0; i <= args.model.usedRange.colIndex; i++) {
                    if (args.model.rows[args.start].cells[i] &&
                        args.model.rows[args.start].cells[i].rowSpan !== undefined &&
                        args.model.rows[args.start].cells[i].rowSpan < 0 &&
                        args.model.rows[args.start].cells[i].colSpan === undefined) {
                        mergeArgs = { range: [args.start, i, args.start, i] };
                        this.parent.notify(activeCellMergedRange, mergeArgs);
                        mergeArgs.range = mergeArgs.range;
                        if (mergeArgs.range[2] <= args.end) {
                            prevCell = getCell(mergeArgs.range[0], i, args.model);
                            if (prevCell && prevCell.rowSpan > 1) {
                                if (prevCell.rowSpan - ((mergeArgs.range[2] - args.start) + 1) > 1) {
                                    setCell(mergeArgs.range[0], i, args.model, { colSpan: prevCell.rowSpan - ((mergeArgs.range[2] - args.start) + 1) }, true);
                                }
                                else {
                                    delete args.model.rows[mergeArgs.range[0]].cells[i].rowSpan;
                                }
                            }
                            mergeArgs = null;
                        }
                    }
                    if (args.model.rows[curIdx] && args.model.rows[curIdx].cells &&
                        args.model.rows[curIdx].cells[i] && args.model.rows[curIdx].cells[i].rowSpan
                        !== undefined && args.model.rows[curIdx].cells[i].rowSpan < 0 &&
                        args.model.rows[curIdx].cells[i].colSpan === undefined) {
                        if (!mergeArgs) {
                            mergeArgs = { range: [curIdx, i, curIdx, i] };
                            this.parent.notify(activeCellMergedRange, mergeArgs);
                        }
                        cell = new Object();
                        mergeArgs.range = mergeArgs.range;
                        Object.assign(cell, getCell(mergeArgs.range[0], mergeArgs.range[1], args.model));
                        if (cell && cell.rowSpan && (cell.rowSpan > 1 || cell.colSpan > 1)) {
                            var indexes = [];
                            indexes[1] = i;
                            indexes[3] = cell.colSpan > 1 ? i + (cell.colSpan - 1) : i;
                            mergeArgs.range = mergeArgs.range;
                            if (mergeArgs.range[0] < args.start) {
                                indexes[0] = indexes[2] = mergeArgs.range[0];
                                if (cell.rowSpan - count > 1) {
                                    indexes[2] += (cell.rowSpan - count - 1);
                                }
                            }
                            else {
                                indexes[0] = indexes[2] = args.start;
                                if (cell.rowSpan - ((args.end - mergeArgs.range[0]) + 1) > 1) {
                                    indexes[2] += ((cell.rowSpan - ((args.end - mergeArgs.range[0]) + 1)) - 1);
                                }
                            }
                            mergeArgsCollection.push({
                                range: indexes, isAction: false, preventRefresh: true, merge: true,
                                type: 'All', skipChecking: true
                            });
                        }
                    }
                    mergeArgs = null;
                }
            }
            eventArgs.sheetCount = args.model.usedRange.rowIndex;
        }
        else if (args.modelType === 'Column') {
            if (args.checkCount !== undefined && args.checkCount === args.model.usedRange.colIndex) {
                return;
            }
            this.parent.notify(refreshInsertDelete, insertArgs);
            args.model = args.model;
            if (isFinite) {
                if (args.start >= args.model.colCount) {
                    return;
                }
                if (args.end >= args.model.colCount) {
                    args.end = args.model.colCount - 1;
                }
            }
            else {
                if (args.start > args.model.usedRange.colIndex) {
                    return;
                }
                if (args.end > args.model.usedRange.colIndex) {
                    args.end -= (args.end - args.model.usedRange.colIndex);
                }
            }
            this.setRowColCount(args.start, args.end, args.model, 'col');
            if (args.start <= args.model.usedRange.colIndex) {
                this.parent.setSheetPropertyOnMute(args.model, 'usedRange', { rowIndex: args.model.usedRange.rowIndex, colIndex: args.model.usedRange.colIndex - count });
                if (args.model.usedRange.colIndex < 0) {
                    this.parent.setSheetPropertyOnMute(args.model, 'usedRange', { rowIndex: args.model.usedRange.rowIndex, colIndex: 0 });
                }
            }
            //this.setDeleteInfo(args.start, args.end, 'fldLen', 'Column');
            var frozenCol = this.parent.frozenColCount(args.model);
            if (args.start < frozenCol) {
                frozenCol = args.end < frozenCol ? (args.end - args.start) + 1 : frozenCol - args.start;
                frozenCol = args.model.frozenColumns - frozenCol;
                this.parent.setSheetPropertyOnMute(args.model, 'frozenColumns', frozenCol);
                this.parent.updateTopLeftCell();
                eventArgs.freezePane = true;
            }
            deletedCells = [];
            var curIdx = args.end + 1;
            var cell = void 0;
            var mergeArgs = void 0;
            for (var i = 0; i <= args.model.usedRange.rowIndex; i++) {
                deletedCells.push({});
                if (args.model.rows[i] && args.model.rows[i].cells) {
                    if (args.model.rows[i].cells[args.start] && args.model.rows[i].cells[args.start].colSpan !==
                        undefined && args.model.rows[i].cells[args.start].colSpan < 0 &&
                        args.model.rows[i].cells[args.start].rowSpan === undefined) {
                        mergeArgs = { range: [i, args.start, i, args.start] };
                        this.parent.notify(activeCellMergedRange, mergeArgs);
                        mergeArgs.range = mergeArgs.range;
                        if (mergeArgs.range[3] <= args.end) {
                            var prevCell_1 = getCell(i, mergeArgs.range[1], args.model);
                            if (prevCell_1 && prevCell_1.colSpan > 1) {
                                if (prevCell_1.colSpan - ((mergeArgs.range[3] - args.start) + 1) > 1) {
                                    setCell(i, mergeArgs.range[1], args.model, { colSpan: prevCell_1.colSpan - ((mergeArgs.range[3] - args.start) + 1) }, true);
                                }
                                else {
                                    delete args.model.rows[i].cells[mergeArgs.range[1]].colSpan;
                                }
                            }
                            mergeArgs = null;
                        }
                    }
                    if (args.model.rows[i].cells[curIdx] && args.model.rows[i].cells[curIdx].colSpan
                        !== undefined && args.model.rows[i].cells[curIdx].colSpan < 0 &&
                        args.model.rows[i].cells[curIdx].rowSpan === undefined) {
                        if (!mergeArgs) {
                            mergeArgs = { range: [i, curIdx, i, curIdx] };
                            this.parent.notify(activeCellMergedRange, mergeArgs);
                        }
                        cell = new Object();
                        mergeArgs.range = mergeArgs.range;
                        Object.assign(cell, getCell(mergeArgs.range[0], mergeArgs.range[1], args.model));
                        if (cell && cell.colSpan && (cell.colSpan > 1 || cell.rowSpan > 1)) {
                            var indexes = [];
                            indexes[0] = i;
                            indexes[2] = cell.rowSpan > 1 ? i + (cell.rowSpan - 1) : i;
                            mergeArgs.range = mergeArgs.range;
                            if (mergeArgs.range[1] < args.start) {
                                indexes[1] = indexes[3] = mergeArgs.range[1];
                                if (cell.colSpan - count > 1) {
                                    indexes[3] += (cell.colSpan - count - 1);
                                }
                            }
                            else {
                                indexes[1] = indexes[3] = args.start;
                                if (cell.colSpan - ((args.end - mergeArgs.range[1]) + 1) > 1) {
                                    indexes[3] += ((cell.colSpan - ((args.end - mergeArgs.range[1]) + 1)) - 1);
                                }
                            }
                            mergeArgsCollection.push({
                                range: indexes, isAction: false, preventRefresh: true, merge: true,
                                type: 'All', skipChecking: true
                            });
                        }
                    }
                    deletedCells[i].cells = args.model.rows[i].cells.splice(args.start, count);
                    mergeArgs = null;
                }
            }
            eventArgs.sheetCount = args.model.usedRange.colIndex;
            eventArgs.deletedCellsModel = deletedCells;
        }
        else {
            if ((args.end - args.start === this.parent.sheets.length - 1) || (args.checkCount !== undefined && args.checkCount ===
                this.parent.sheets.length)) {
                return;
            }
            this.parent.notify(refreshInsertDelete, insertArgs);
            eventArgs.sheetCount = this.parent.sheets.length;
            eventArgs.activeSheetIndex = this.parent.activeSheetIndex;
        }
        var deletedModel = [];
        var deleteMaxHgt = args.modelType === 'Row' && args.start < args.model.maxHgts.length;
        var sheetsModel = args.model["" + modelName];
        for (var i = args.start; i <= args.end; i++) {
            if (args.modelType === 'Sheet' && sheetsModel[i]) {
                this.parent.notify(workbookFormulaOperation, { action: 'deleteSheetTab', sheetId: sheetsModel[i].id });
            }
            if (sheetsModel[args.start] || args.start < sheetsModel.length) {
                deletedModel.push(sheetsModel[args.start] || {});
                sheetsModel.splice(args.start, 1);
            }
            else {
                deletedModel.push({});
            }
            if (i === args.start) {
                deletedModel[0].index = args.start;
            }
            if (deleteMaxHgt) {
                args.model.maxHgts.splice(args.start, 1);
            }
        }
        mergeArgsCollection.forEach(function (merge) { return _this.parent.notify(setMerge, merge); });
        this.parent.notify(beforeDelete, args);
        if (args.modelType !== 'Sheet') {
            this.parent.notify(refreshClipboard, args);
            eventArgs.refreshSheet = args.refreshSheet;
            eventArgs.activeSheetIndex = getSheetIndex(this.parent, args.model.name);
            eventArgs['conditionalFormats'] = [];
            this.deleteConditionalFormats(args, eventArgs);
        }
        eventArgs.definedNames = insertArgs.definedNames;
        eventArgs.isAction = args.isAction;
        eventArgs.deletedModel = deletedModel;
        delete eventArgs.cancel;
        this.parent.notify(deleteAction, actionArgs);
    };
    WorkbookDelete.prototype.setRowColCount = function (startIdx, endIdx, sheet, layout) {
        var prop = layout + 'Count';
        var curCount = sheet["" + prop];
        if (endIdx >= curCount) {
            endIdx = curCount - 1;
        }
        if (endIdx < startIdx) {
            return;
        }
        this.parent.setSheetPropertyOnMute(sheet, prop, curCount - ((endIdx - startIdx) + 1));
        if (sheet.id === this.parent.getActiveSheet().id) {
            this.parent.notify(updateRowColCount, { index: curCount - 1, update: layout, isDelete: true, start: startIdx, end: endIdx });
        }
    };
    WorkbookDelete.prototype.deleteConditionalFormats = function (args, eventArgs) {
        var cfCollection = args.model.conditionalFormats;
        if (cfCollection) {
            for (var i = 0; i < cfCollection.length; i++) {
                eventArgs['conditionalFormats'].push(extend({}, cfCollection[i], null, true));
                var cfRange = getRangeIndexes(cfCollection[i].range);
                var sltRangeIndex = getRangeIndexes(args.model.selectedRange);
                if ((args.modelType === 'Column' && sltRangeIndex[1] <= cfRange[1] && sltRangeIndex[3] >= cfRange[3]) || (args.modelType === 'Row' && sltRangeIndex[0] <= cfRange[0] && sltRangeIndex[2] >= cfRange[2])) {
                    cfCollection.splice(cfCollection.indexOf(cfCollection[i]), 1);
                    i--;
                }
                else {
                    cfCollection[i].range = getRangeAddress(deleteFormatRange(args, cfRange));
                }
            }
        }
    };
    WorkbookDelete.prototype.addEventListener = function () {
        this.parent.on(deleteModel, this.deleteModel, this);
    };
    /**
     * Destroy workbook delete module.
     *
     * @returns {void}
     */
    WorkbookDelete.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookDelete.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(deleteModel, this.deleteModel);
        }
    };
    /**
     * Get the workbook delete module name.
     *
     * @returns {string} - returns the module name.
     */
    WorkbookDelete.prototype.getModuleName = function () {
        return 'workbookdelete';
    };
    return WorkbookDelete;
}());
export { WorkbookDelete };
