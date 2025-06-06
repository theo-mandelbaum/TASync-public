import { getCell, getSheetIndex, getSheetName } from '../base/index';
import { insertModel, workbookFormulaOperation, updateSheetFromDataSource } from '../../workbook/common/index';
import { insert, insertMerge, refreshClipboard, refreshInsertDelete } from '../../workbook/common/index';
import { updateRowColCount, beginAction, getRangeIndexes, getRangeAddress } from '../../workbook/common/index';
import { insertFormatRange } from '../../workbook/index';
/**
 * The `WorkbookInsert` module is used to insert cells, rows, columns and sheets in to workbook.
 */
var WorkbookInsert = /** @class */ (function () {
    /**
     * Constructor for the workbook insert module.
     *
     * @param {Workbook} parent - Specifies the workbook.
     * @private
     */
    function WorkbookInsert(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    // tslint:disable-next-line
    WorkbookInsert.prototype.insertModel = function (args) {
        var _this = this;
        var _a, _b, _c, _d;
        if (!args.model) {
            return;
        }
        var index;
        var model = [];
        var mergeCollection;
        var isModel;
        var maxHgtObj;
        if (typeof (args.start) === 'number') {
            index = args.start;
            args.end = args.end || index;
            if (index > args.end) {
                index = args.end;
                args.end = args.start;
            }
            if (args.modelType === 'Row' && index < args.model.maxHgts.length) {
                maxHgtObj = [];
            }
            for (var i = index; i <= args.end; i++) {
                model.push({});
                if (maxHgtObj) {
                    maxHgtObj.push(null);
                }
            }
        }
        else {
            if (args.start) {
                index = args.start[0].index || 0;
                model = args.start;
                isModel = true;
            }
            else {
                index = 0;
                model.push({});
            }
            if (args.modelType === 'Row' && index < args.model.maxHgts.length) {
                maxHgtObj = [];
                model.forEach(function () {
                    maxHgtObj.push(null);
                });
            }
        }
        var eventArgs = { model: model, index: index, modelType: args.modelType, insertType: args.insertType,
            cancel: false, isUndoRedo: args.isUndoRedo };
        var actionArgs = { eventArgs: eventArgs, action: 'insert' };
        if (args.isAction) {
            this.parent.notify(beginAction, actionArgs);
            if (eventArgs.cancel) {
                return;
            }
            delete eventArgs.cancel;
            eventArgs.isAction = args.isAction;
        }
        var insertArgs = { startIndex: index, endIndex: index + model.length - 1, modelType: args.modelType, sheet: args.model, isInsert: true };
        if (args.modelType === 'Row') {
            if (args.checkCount !== undefined && args.model.rows && args.checkCount === args.model.rows.length) {
                return;
            }
            this.parent.notify(refreshInsertDelete, insertArgs);
            args.model = args.model;
            if (!args.model.rows) {
                args.model.rows = [];
            }
            if (isModel && args.model.usedRange.rowIndex > -1 && index > args.model.usedRange.rowIndex) {
                for (var i = args.model.usedRange.rowIndex; i < index - 1; i++) {
                    model.splice(0, 0, {});
                }
            }
            var frozenRow = this.parent.frozenRowCount(args.model);
            if (index < frozenRow || (index <= frozenRow && args.freezePane)) {
                var newFrozenRows = args.model.frozenRows + model.length - ((index === frozenRow && frozenRow > 0) ? 1 : 0);
                this.parent.setSheetPropertyOnMute(args.model, 'frozenRows', newFrozenRows);
                eventArgs.freezePane = true;
            }
            (_a = args.model.rows).splice.apply(_a, [index, 0].concat(model));
            if (maxHgtObj) {
                (_b = args.model.maxHgts).splice.apply(_b, [index, 0].concat(maxHgtObj));
            }
            //this.setInsertInfo(args.model, index, model.length, 'count');
            this.setRowColCount(insertArgs.startIndex, insertArgs.endIndex, args.model, 'row');
            if (index > args.model.usedRange.rowIndex) {
                this.parent.setUsedRange(index + (model.length - 1), args.model.usedRange.colIndex, args.model, true);
            }
            else {
                this.parent.setUsedRange(args.model.usedRange.rowIndex + model.length, args.model.usedRange.colIndex, args.model, true);
            }
            var curIdx = index + model.length;
            var style_1;
            var cell = void 0;
            var newStyle_1;
            var parentCell_1;
            var mergeArgs = void 0;
            var _loop_1 = function (i) {
                if (args.model.rows[curIdx] && args.model.rows[curIdx].cells &&
                    args.model.rows[curIdx].cells[i]) {
                    cell = args.model.rows[curIdx].cells[i];
                    if (cell.rowSpan !== undefined && cell.rowSpan < 0 && cell.colSpan === undefined) {
                        mergeArgs = { range: [curIdx, i, curIdx, i], insertCount: model.length, insertModel: 'Row' };
                        this_1.parent.notify(insertMerge, mergeArgs);
                        if (!eventArgs.freezePane && mergeArgs.range[0] < frozenRow && mergeArgs.range[2] > frozenRow) {
                            eventArgs.freezePane = true;
                        }
                    }
                }
                parentCell_1 = getCell(index - 1, i, args.model, false, true);
                style_1 = parentCell_1.style;
                cell = getCell(index + 1, i, args.model, false, true);
                if (style_1 || parentCell_1.wrap) {
                    if (style_1) {
                        newStyle_1 = {};
                        Object.keys(style_1).forEach(function (key) {
                            if (!(key === 'borderLeft' || key === 'borderRight' || key === 'borderTop' || key === 'borderBottom')) {
                                newStyle_1[key] = style_1[key];
                            }
                        });
                        if (cell.style) {
                            this_1.checkBorder(cell.style, args.model.rows[index - 1].cells[i].style, newStyle_1);
                        }
                    }
                    if (!args.isUndoRedo || args.isRedo) {
                        model.forEach(function (row) {
                            if (!row.cells) {
                                row.cells = [];
                            }
                            if (!row.cells[i]) {
                                row.cells[i] = {};
                            }
                            if (style_1) {
                                if (!row.cells[i].style) {
                                    row.cells[i].style = {};
                                }
                                Object.assign(row.cells[i].style, newStyle_1);
                            }
                            if (parentCell_1.wrap) {
                                row.cells[i].wrap = true;
                            }
                        });
                    }
                }
            };
            var this_1 = this;
            for (var i = 0; i <= args.model.usedRange.colIndex; i++) {
                _loop_1(i);
            }
            eventArgs.sheetCount = args.model.rows.length;
        }
        else if (args.modelType === 'Column') {
            if (args.checkCount !== undefined && args.model.columns && args.checkCount === args.model.columns.length) {
                return;
            }
            this.parent.notify(refreshInsertDelete, insertArgs);
            args.model = args.model;
            if (!args.model.columns) {
                args.model.columns = [];
            }
            if (index && !args.model.columns[index - 1]) {
                args.model.columns[index - 1] = {};
            }
            (_c = args.model.columns).splice.apply(_c, [index, 0].concat(model));
            var frozenCol_1 = this.parent.frozenColCount(args.model);
            if (index < frozenCol_1 || (index <= frozenCol_1 && args.freezePane)) {
                var newFrozenCols = args.model.frozenColumns + model.length - ((index === frozenCol_1 && frozenCol_1 > 0) ? 1 : 0);
                this.parent.setSheetPropertyOnMute(args.model, 'frozenColumns', newFrozenCols);
                eventArgs.freezePane = true;
            }
            //this.setInsertInfo(args.model, index, model.length, 'fldLen', 'Column');
            this.setRowColCount(insertArgs.startIndex, insertArgs.endIndex, args.model, 'col');
            if (index > args.model.usedRange.colIndex) {
                this.parent.setUsedRange(args.model.usedRange.rowIndex, index + (model.length - 1), args.model, true);
            }
            else {
                this.parent.setUsedRange(args.model.usedRange.rowIndex, args.model.usedRange.colIndex + model.length, args.model, true);
            }
            if (!args.model.rows) {
                args.model.rows = [];
            }
            var cellModel = [];
            if (!args.columnCellsModel) {
                args.columnCellsModel = [];
            }
            for (var i = 0; i < model.length; i++) {
                cellModel.push(null);
            }
            mergeCollection = [];
            var cell = void 0;
            var style_2;
            var newStyle_2;
            var parentCell = void 0;
            for (var i = 0; i <= args.model.usedRange.rowIndex; i++) {
                if (!args.model.rows[i]) {
                    args.model.rows[i] = { cells: [] };
                }
                else if (!args.model.rows[i].cells) {
                    args.model.rows[i].cells = [];
                }
                if (index && !args.model.rows[i].cells[index - 1]) {
                    args.model.rows[i].cells[index - 1] = {};
                }
                (_d = args.model.rows[i].cells).splice.apply(_d, [index, 0].concat((args.columnCellsModel[i] &&
                    args.columnCellsModel[i].cells ? args.columnCellsModel[i].cells : cellModel)));
                var curIdx = index + model.length;
                if (args.model.rows[i].cells[curIdx]) {
                    cell = args.model.rows[i].cells[curIdx];
                    if (cell.colSpan !== undefined && cell.colSpan < 0 && cell.rowSpan === undefined) {
                        mergeCollection.push({
                            range: [i, curIdx, i, curIdx], insertCount: cellModel.length, insertModel: 'Column'
                        });
                    }
                }
                parentCell = getCell(i, index - 1, args.model, false, true);
                style_2 = parentCell.style;
                cell = getCell(i, index + 1, args.model, false, true);
                if (style_2 || parentCell.wrap) {
                    if (style_2) {
                        newStyle_2 = {};
                        Object.keys(style_2).forEach(function (key) {
                            if (!(key === 'borderLeft' || key === 'borderRight' || key === 'borderTop' || key === 'borderBottom')) {
                                newStyle_2[key] = style_2[key];
                            }
                        });
                        if (cell.style) {
                            this.checkBorder(cell.style, args.model.rows[i].cells[index - 1].style, newStyle_2);
                        }
                    }
                    if (!args.isUndoRedo || args.isRedo) {
                        for (var j = index; j < curIdx; j++) {
                            if (!args.model.rows[i].cells[j]) {
                                args.model.rows[i].cells[j] = {};
                            }
                            if (style_2) {
                                if (!args.model.rows[i].cells[j].style) {
                                    args.model.rows[i].cells[j].style = {};
                                }
                                Object.assign(args.model.rows[i].cells[j].style, newStyle_2);
                            }
                            if (parentCell.wrap) {
                                args.model.rows[i].cells[j].wrap = true;
                            }
                        }
                    }
                }
            }
            mergeCollection.forEach(function (mergeArgs) {
                _this.parent.notify(insertMerge, mergeArgs);
                if (!eventArgs.freezePane && mergeArgs.range[1] < frozenCol_1 && mergeArgs.range[3] > frozenCol_1) {
                    eventArgs.freezePane = true;
                }
            });
            eventArgs.sheetCount = args.model.columns.length;
        }
        else {
            if (args.checkCount !== undefined && args.checkCount === this.parent.sheets.length) {
                return;
            }
            var sheetModel = model;
            var sheetName = getSheetName(this.parent);
            var isFromUpdateAction = args.isFromUpdateAction;
            for (var i = 0; i < sheetModel.length; i++) {
                if (sheetModel[i].name) {
                    for (var j = 0; j < this.parent.sheets.length; j++) {
                        if (sheetModel[i].name === this.parent.sheets[j].name) {
                            sheetModel.splice(i, 1);
                            i--;
                            break;
                        }
                    }
                }
            }
            if (!sheetModel.length) {
                return;
            }
            delete model[0].index;
            this.parent.createSheet(index, model);
            var id_1;
            if (args.activeSheetIndex) {
                eventArgs.activeSheetIndex = args.activeSheetIndex;
                this.parent.setProperties({ activeSheetIndex: args.activeSheetIndex }, true);
            }
            else if (!args.isAction && args.start < this.parent.activeSheetIndex) {
                this.parent.setProperties({ activeSheetIndex: this.parent.skipHiddenSheets(this.parent.activeSheetIndex) }, true);
            }
            if (isFromUpdateAction) {
                this.parent.setProperties({ activeSheetIndex: getSheetIndex(this.parent, sheetName) }, true);
            }
            model.forEach(function (sheet) {
                if (isModel) {
                    _this.updateRangeModel(sheet.ranges);
                }
                var viewport = _this.parent.viewport;
                var refreshRange = [viewport.topIndex, viewport.leftIndex, viewport.bottomIndex, viewport.rightIndex];
                var args = {
                    sheet: sheet, resolveAfterFullDataLoaded: true,
                    indexes: refreshRange, promise: new Promise(function (resolve) { resolve((function () { })()); })
                };
                _this.parent.notify(updateSheetFromDataSource, args);
                id_1 = sheet.id;
                _this.parent.notify(workbookFormulaOperation, {
                    action: 'addSheet', visibleName: sheet.name, sheetName: 'Sheet' + id_1, sheetId: id_1
                });
            });
            eventArgs.activeSheetIndex = args.activeSheetIndex;
            eventArgs.sheetCount = this.parent.sheets.length;
        }
        if (args.modelType !== 'Sheet') {
            this.insertConditionalFormats(args);
            this.parent.notify(refreshClipboard, { start: index, end: index + model.length - 1, modelType: args.modelType, model: args.model, isInsert: true });
            eventArgs.activeSheetIndex = getSheetIndex(this.parent, args.model.name);
        }
        this.parent.notify(insert, actionArgs);
    };
    WorkbookInsert.prototype.setRowColCount = function (startIdx, endIdx, sheet, layout) {
        var prop = layout + 'Count';
        this.parent.setSheetPropertyOnMute(sheet, prop, sheet["" + prop] + ((endIdx - startIdx) + 1));
        if (sheet.id === this.parent.getActiveSheet().id) {
            this.parent.notify(updateRowColCount, { index: sheet["" + prop] - 1, update: layout, isInsert: true, start: startIdx, end: endIdx });
        }
    };
    WorkbookInsert.prototype.updateRangeModel = function (ranges) {
        ranges.forEach(function (range) {
            if (range.dataSource) {
                range.startCell = range.startCell || 'A1';
                range.showFieldAsHeader = range.showFieldAsHeader === undefined || range.showFieldAsHeader;
                range.template = range.template || '';
                range.address = range.address || 'A1';
            }
        });
    };
    WorkbookInsert.prototype.checkBorder = function (style, adjStyle, newStyle) {
        if (style.borderLeft && style.borderLeft === adjStyle.borderLeft) {
            newStyle.borderLeft = style.borderLeft;
        }
        if (style.borderRight && style.borderRight === adjStyle.borderRight) {
            newStyle.borderRight = style.borderRight;
        }
        if (style.borderTop && style.borderTop === adjStyle.borderTop) {
            newStyle.borderTop = style.borderTop;
        }
        if (style.borderBottom && style.borderBottom === adjStyle.borderBottom) {
            newStyle.borderBottom = style.borderBottom;
        }
    };
    WorkbookInsert.prototype.setInsertInfo = function (sheet, startIndex, count, totalKey, modelType) {
        if (modelType === void 0) { modelType = 'Row'; }
        var endIndex = count = startIndex + (count - 1);
        sheet.ranges.forEach(function (range) {
            if (range.info && startIndex < range.info["" + totalKey]) {
                if (!range.info["insert" + modelType + "Range"]) {
                    range.info["insert" + modelType + "Range"] = [[startIndex, endIndex]];
                }
                else {
                    range.info["insert" + modelType + "Range"].push([startIndex, endIndex]);
                }
                range.info["" + totalKey] += ((endIndex - startIndex) + 1);
            }
        });
    };
    WorkbookInsert.prototype.insertConditionalFormats = function (args) {
        var cfCollection = args.model.conditionalFormats;
        if (args.prevAction === 'delete') {
            this.parent.setSheetPropertyOnMute(args.model, 'conditionalFormats', args.conditionalFormats);
        }
        else if (cfCollection) {
            for (var i = 0, cfLength = cfCollection.length; i < cfLength; i++) {
                cfCollection[i].range = getRangeAddress(insertFormatRange(args, getRangeIndexes(cfCollection[i].range), !args.isAction && !args.isUndoRedo));
            }
        }
    };
    WorkbookInsert.prototype.addEventListener = function () {
        this.parent.on(insertModel, this.insertModel, this);
    };
    /**
     * Destroy workbook insert module.
     *
     * @returns {void} - destroy the workbook insert module.
     */
    WorkbookInsert.prototype.destroy = function () {
        this.removeEventListener();
        this.parent = null;
    };
    WorkbookInsert.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(insertModel, this.insertModel);
        }
    };
    /**
     * Get the workbook insert module name.
     *
     * @returns {string} - Return the string.
     */
    WorkbookInsert.prototype.getModuleName = function () {
        return 'workbookinsert';
    };
    return WorkbookInsert;
}());
export { WorkbookInsert };
