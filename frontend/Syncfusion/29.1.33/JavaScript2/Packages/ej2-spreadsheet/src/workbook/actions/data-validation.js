import { getSheet, isHiddenRow, getCell, setCell } from '../base/index';
import { cellValidation, addHighlight, getCellAddress, updateHighlight, getSwapRange, getUpdatedRange } from '../common/index';
import { removeHighlight, checkIsFormula, getSheetIndexFromAddress, getRangeFromAddress } from '../common/index';
import { getRangeIndexes, getUpdatedFormulaOnInsertDelete, getUpdatedFormula } from '../common/index';
import { updateCell, beforeInsert, beforeDelete, addListValidationDropdown } from '../common/index';
import { getSplittedAddressForColumn } from '../common/index';
import { getSheetIndexFromId, setColumn, refreshInsertDelete, workbookFormulaOperation, isHiddenCol } from '../index';
import { getSheetIndex, getRow, checkColumnValidation } from '../base/index';
import { extend, isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * The `WorkbookHyperlink` module is used to handle Hyperlink action in Spreadsheet.
 */
var WorkbookDataValidation = /** @class */ (function () {
    /**
     * Constructor for WorkbookSort module.
     *
     * @param {Workbook} parent - Specifies the parent element.
     */
    function WorkbookDataValidation(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * To destroy the sort module.
     *
     * @returns {void}
     */
    WorkbookDataValidation.prototype.destroy = function () {
        this.removeEventListener();
        this.highlightInvalidData = null;
        this.parent = null;
    };
    WorkbookDataValidation.prototype.addEventListener = function () {
        this.parent.on(cellValidation, this.updateValidationHandler, this);
        this.parent.on(addHighlight, this.addHighlightHandler, this);
        this.parent.on(removeHighlight, this.removeHighlightHandler, this);
        this.parent.on(beforeInsert, this.beforeInsertDeleteHandler, this);
        this.parent.on(beforeDelete, this.beforeInsertDeleteHandler, this);
        this.parent.on(refreshInsertDelete, this.beforeInsertDeleteHandler, this);
    };
    WorkbookDataValidation.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(cellValidation, this.updateValidationHandler);
            this.parent.off(addHighlight, this.addHighlightHandler);
            this.parent.off(removeHighlight, this.removeHighlightHandler);
            this.parent.off(beforeInsert, this.beforeInsertDeleteHandler);
            this.parent.off(beforeDelete, this.beforeInsertDeleteHandler);
            this.parent.off(refreshInsertDelete, this.beforeInsertDeleteHandler);
        }
    };
    WorkbookDataValidation.prototype.updateValidationHandler = function (args) {
        var _this = this;
        var sheetName;
        var lastIndex = args.range.lastIndexOf('!');
        var sheet;
        var isActiveSheet;
        if (lastIndex > -1) {
            sheetName = args.range.substring(0, lastIndex);
            args.range = args.range.substring(lastIndex + 1);
            var sheetIdx = getSheetIndex(this.parent, sheetName);
            sheet = getSheet(this.parent, sheetIdx);
            isActiveSheet = sheetIdx === this.parent.activeSheetIndex;
        }
        else {
            sheet = this.parent.getActiveSheet();
            isActiveSheet = true;
        }
        var rangeInfo = this.getRangeWhenColumnSelected(args.range, sheet);
        if (sheetName) {
            args.range = sheetName + '!' + rangeInfo.range;
        }
        var indexes = getSwapRange(getRangeIndexes(rangeInfo.range));
        var column;
        var cell;
        var frozenRow;
        var uiRefresh;
        var viewport;
        var updateCellHighlightOnUI;
        var updateColHighlightOnUI;
        var options = { colIdx: indexes[1] };
        if (isActiveSheet) {
            frozenRow = this.parent.frozenRowCount(sheet);
            var frozenCol_1 = this.parent.frozenColCount(sheet);
            var parent_1 = this.parent;
            var viewOffset = parent_1.viewport || {};
            viewport = parent_1.scrollSettings && parent_1.scrollSettings.enableVirtualization ? [frozenRow + viewOffset.topIndex, frozenCol_1 +
                    viewOffset.leftIndex, viewOffset.bottomIndex, viewOffset.rightIndex] : [0, 0, sheet.rowCount - 1, sheet.colCount - 1];
            if (rangeInfo.isFullCol) {
                var viewportRowIndexes_1 = [[viewport[0], viewport[2]]];
                if (frozenRow) {
                    viewportRowIndexes_1.push([getRangeIndexes(sheet.topLeftCell)[0], frozenRow - 1]);
                }
                updateColHighlightOnUI = function (validation) {
                    if (validation.isHighlighted && ((options.colIdx >= viewport[1] && options.colIdx <= viewport[3]) ||
                        options.colIdx < frozenCol_1) && !isHiddenCol(sheet, options.colIdx)) {
                        viewportRowIndexes_1.forEach(function (indexes) {
                            for (options.rowIdx = indexes[0]; options.rowIdx <= indexes[1]; options.rowIdx++) {
                                if (!isHiddenRow(sheet, options.rowIdx)) {
                                    options.cell = getCell(options.rowIdx, options.colIdx, sheet, false, true);
                                    options.validation = options.cell.validation ? options.cell.validation : validation;
                                    _this.parent.notify(updateHighlight, options);
                                }
                            }
                        });
                    }
                };
            }
            updateCellHighlightOnUI = function (validation) {
                if (validation.isHighlighted && uiRefresh && ((options.colIdx >= viewport[1] && options.colIdx <= viewport[3]) ||
                    options.colIdx < frozenCol_1) && !isHiddenCol(sheet, options.colIdx)) {
                    _this.parent.notify(updateHighlight, options);
                }
            };
        }
        var highlightObj;
        var isListType;
        var activeIdx;
        var updateFormula;
        if (args.isRemoveValidation) {
            if (isActiveSheet) {
                activeIdx = getRangeIndexes(sheet.activeCell);
                if (activeIdx[0] >= indexes[0] && activeIdx[1] >= indexes[1] && activeIdx[0] <= indexes[2] && activeIdx[1] <= indexes[3]) {
                    var validation = getCell(activeIdx[0], activeIdx[1], sheet, false, true).validation ||
                        (checkColumnValidation(sheet.columns[indexes[1]], activeIdx[0], activeIdx[1]) &&
                            sheet.columns[activeIdx[1]].validation);
                    isListType = validation && validation.type === 'List';
                }
                options.isRemoveValidation = true;
                options.isRemoveHighlightedData = true;
            }
        }
        else {
            if (args.isAction && this.highlightInvalidData) {
                highlightObj = { isHighlighted: this.highlightInvalidData };
            }
            if (args.rules.type === 'List') {
                activeIdx = getRangeIndexes(sheet.activeCell);
                isListType = isActiveSheet && activeIdx[0] >= indexes[0] && activeIdx[1] >= indexes[1] && activeIdx[0] <= indexes[2] &&
                    activeIdx[1] <= indexes[3];
                if (args.rules.value1) {
                    args.rules.value1 = args.rules.value1.trim();
                    if (args.rules.value1[args.rules.value1.length - 1] === this.parent.listSeparator) {
                        args.rules.value1 = args.rules.value1.substring(0, args.rules.value1.length - 1);
                    }
                }
            }
            else if (args.rules.type === 'Custom' && !isNullOrUndefined(args.rules.value2)) {
                delete args.rules.value2;
            }
            if (isActiveSheet) {
                options.removeOnValidData = true;
            }
            var isFormulaVal1_1 = checkIsFormula(args.rules.value1);
            var isFormulaVal2_1 = checkIsFormula(args.rules.value2);
            updateFormula = function (rowIdx) {
                // Calculate previous indexes based on the original starting point of the formula
                if (isFormulaVal1_1) {
                    options.validation.value1 = getUpdatedFormula([rowIdx, options.colIdx, rowIdx, options.colIdx], indexes, sheet, _this.parent, { formula: args.rules.value1 });
                }
                if (isFormulaVal2_1) {
                    options.validation.value2 = getUpdatedFormula([rowIdx, options.colIdx, rowIdx, options.colIdx], indexes, sheet, _this.parent, { formula: args.rules.value2 });
                }
            };
        }
        for (options.colIdx; options.colIdx <= indexes[3]; options.colIdx++) {
            if (rangeInfo.isFullCol) {
                if (args.isRemoveValidation) {
                    column = sheet.columns[options.colIdx];
                    if (column && column.validation) {
                        if (isActiveSheet) {
                            updateColHighlightOnUI(column.validation);
                        }
                        delete column.validation;
                    }
                }
                else {
                    options.validation = Object.assign({}, args.rules, highlightObj);
                    updateFormula(0);
                    if (!sheet.columns[options.colIdx]) {
                        sheet.columns[options.colIdx] = {};
                    }
                    sheet.columns[options.colIdx].validation = options.validation;
                    if (isActiveSheet) {
                        updateColHighlightOnUI(options.validation);
                    }
                    continue;
                }
            }
            for (options.rowIdx = indexes[0]; options.rowIdx <= indexes[2]; options.rowIdx++) {
                uiRefresh = isActiveSheet && ((options.rowIdx >= viewport[0] && options.rowIdx <= viewport[2]) ||
                    options.rowIdx < frozenRow) && !isHiddenRow(sheet, options.rowIdx);
                if (args.isRemoveValidation) {
                    column = sheet.columns[options.colIdx];
                    if (column && column.validation) {
                        if (options.rowIdx === indexes[2]) {
                            column.validation.address = getSplittedAddressForColumn(column.validation.address, [indexes[0], options.colIdx, indexes[2], options.colIdx], options.colIdx);
                        }
                        if (isActiveSheet) {
                            updateCellHighlightOnUI(column.validation);
                        }
                    }
                    cell = getCell(options.rowIdx, options.colIdx, sheet);
                    if (cell && cell.validation && !updateCell(this.parent, sheet, { cell: { validation: {} }, rowIdx: options.rowIdx, colIdx: options.colIdx })) {
                        if (isActiveSheet) {
                            updateCellHighlightOnUI(cell.validation);
                        }
                        delete cell.validation;
                    }
                }
                else {
                    options.validation = Object.assign({}, args.rules, highlightObj);
                    updateFormula(options.rowIdx);
                    if (!updateCell(this.parent, sheet, { cell: { validation: options.validation }, rowIdx: options.rowIdx, colIdx: options.colIdx })) {
                        if (isActiveSheet) {
                            options.cell = getCell(options.rowIdx, options.colIdx, sheet);
                            updateCellHighlightOnUI(options.validation);
                        }
                    }
                }
            }
        }
        if (isListType) {
            cell = getCell(activeIdx[0], activeIdx[1], sheet, false, true);
            var validation = cell.validation;
            if (!validation) {
                validation = checkColumnValidation(sheet.columns[activeIdx[1]], activeIdx[0], activeIdx[1]) ?
                    sheet.columns[activeIdx[1]].validation : {};
            }
            this.parent.notify(addListValidationDropdown, { validation: validation, cell: cell, rowIdx: activeIdx[0], colIdx: activeIdx[1], isRefresh: true });
        }
    };
    WorkbookDataValidation.prototype.addHighlightHandler = function (args) {
        if (args.isAction) {
            this.highlightInvalidData = true;
        }
        this.invalidDataHandler(args.range);
    };
    WorkbookDataValidation.prototype.removeHighlightHandler = function (args) {
        if (args.isAction) {
            this.highlightInvalidData = null;
        }
        this.invalidDataHandler(args.range, true);
    };
    WorkbookDataValidation.prototype.invalidDataHandler = function (range, isRemoveHighlightedData) {
        var _this = this;
        var cell;
        var col;
        var rowIdx;
        var colIdx;
        var indexes;
        var uiRefresh;
        var isActiveSheet;
        var isFullRange;
        var lastColIdx;
        var row;
        var parent = this.parent;
        var sheet = this.parent.getActiveSheet();
        var frozenRow = this.parent.frozenRowCount(sheet);
        var frozenCol = this.parent.frozenColCount(sheet);
        var viewport = parent.scrollSettings && parent.scrollSettings.enableVirtualization ? (parent.viewport ?
            [frozenRow + parent.viewport.topIndex, frozenCol + parent.viewport.leftIndex, parent.viewport.bottomIndex,
                parent.viewport.rightIndex] : []) : [0, 0, sheet.rowCount - 1, sheet.colCount - 1];
        var updateHighlightOnUI = function (validation, col) {
            if (uiRefresh && ((colIdx >= viewport[1] && colIdx <= viewport[3]) || colIdx < frozenCol) && !isHiddenCol(sheet, colIdx)) {
                _this.parent.notify(updateHighlight, {
                    isRemoveHighlightedData: isRemoveHighlightedData, rowIdx: rowIdx, colIdx: colIdx, cell: cell,
                    validation: validation, removeOnValidData: true, col: col
                });
            }
        };
        var updateHighlightProp;
        if (isRemoveHighlightedData) {
            updateHighlightProp = function (validation, updateHighlight) {
                if (validation.isHighlighted) {
                    if (updateHighlight) {
                        delete validation.isHighlighted;
                    }
                    updateHighlightOnUI(validation);
                }
            };
        }
        else {
            updateHighlightProp = function (validation, updateHighlight, col) {
                if (updateHighlight) {
                    validation.isHighlighted = true;
                }
                updateHighlightOnUI(validation, col);
            };
        }
        var updateValidationHighlight = function () {
            for (rowIdx = indexes[0]; rowIdx <= indexes[2]; rowIdx++) {
                uiRefresh = isActiveSheet && ((rowIdx >= viewport[0] && rowIdx <= viewport[2]) || rowIdx < frozenRow) &&
                    !isHiddenRow(sheet, rowIdx);
                if (isFullRange) {
                    row = getRow(sheet, rowIdx);
                    lastColIdx = Math.max(row && row.cells ? row.cells.length - 1 : null, sheet.columns.length - 1, indexes[3]);
                }
                for (colIdx = indexes[1]; colIdx <= lastColIdx; colIdx++) {
                    cell = getCell(rowIdx, colIdx, sheet, false, true);
                    col = sheet.columns[colIdx];
                    if (cell.validation) {
                        updateHighlightProp(cell.validation, true, col);
                    }
                    else {
                        if (checkColumnValidation(col, rowIdx, colIdx)) {
                            updateHighlightProp(col.validation, rowIdx === indexes[2]);
                        }
                    }
                }
            }
        };
        if (range) {
            if (range.includes('!')) {
                var sheetIdx = getSheetIndexFromAddress(this.parent, range);
                sheet = getSheet(this.parent, sheetIdx);
                range = getRangeFromAddress(range);
                isActiveSheet = sheetIdx === this.parent.activeSheetIndex;
            }
            else {
                isActiveSheet = true;
            }
            indexes = getSwapRange(getRangeIndexes(this.getRangeWhenColumnSelected(getUpdatedRange(sheet, range), sheet).range));
            lastColIdx = indexes[3];
            updateValidationHighlight();
        }
        else {
            isFullRange = true;
            this.parent.sheets.forEach(function (model, sheetIdx) {
                sheet = model;
                indexes = [0, 0, Math.max(sheet.rows.length - 1, viewport[2]), Math.max(sheet.usedRange.colIndex, viewport[3])];
                isActiveSheet = sheetIdx === _this.parent.activeSheetIndex;
                updateValidationHighlight();
            });
        }
    };
    WorkbookDataValidation.prototype.beforeInsertDeleteHandler = function (args) {
        var _this = this;
        var isSheetAction;
        if (args.modelType === 'Sheet') {
            if (args.name !== refreshInsertDelete) {
                return;
            }
            isSheetAction = true;
        }
        else if (args.name === refreshInsertDelete) {
            return;
        }
        var isInsert = args.name === beforeInsert;
        var eventArgs;
        var endIdx;
        var curSheet;
        var prevIdx;
        if (isInsert) {
            curSheet = getSheet(this.parent, args.activeSheetIndex);
            endIdx = args.index + (args.model.length - 1);
            eventArgs = { insertDeleteArgs: { startIndex: args.index, endIndex: endIdx, modelType: args.modelType, isInsert: true,
                    sheet: curSheet }, sheetIdx: args.activeSheetIndex };
            prevIdx = args.index - 1;
        }
        else if (isSheetAction) {
            var sheetNames = [];
            var sheetId = void 0;
            var formulaArgs = {
                action: 'getSheetInfo', sheetInfo: []
            };
            this.parent.notify(workbookFormulaOperation, formulaArgs);
            for (var idx = args.startIndex; idx <= args.endIndex; idx++) {
                sheetId = this.parent.sheets[idx].id;
                for (var i = 0; i < formulaArgs.sheetInfo.length; i++) {
                    if (formulaArgs.sheetInfo[i].index === sheetId) {
                        sheetNames.push(formulaArgs.sheetInfo[i].sheet);
                        break;
                    }
                }
            }
            eventArgs = { sheetNames: sheetNames };
        }
        else {
            curSheet = args.model;
            eventArgs = { insertDeleteArgs: { startIndex: args.start, modelType: args.modelType,
                    endIndex: args.end, sheet: curSheet }, sheetIdx: getSheetIndexFromId(this.parent, curSheet.id) };
        }
        var updateFormula = function (validation) {
            if (checkIsFormula(validation.value1) && (!eventArgs.otherSheet || validation.value1.includes(curSheet.name))) {
                eventArgs.cell = { formula: validation.value1 };
                _this.parent.notify(getUpdatedFormulaOnInsertDelete, eventArgs);
                validation.value1 = eventArgs.cell.formula;
            }
            if (checkIsFormula(validation.value2) && (!eventArgs.otherSheet || validation.value2.includes(curSheet.name))) {
                eventArgs.cell = { formula: validation.value2 };
                _this.parent.notify(getUpdatedFormulaOnInsertDelete, eventArgs);
                validation.value2 = eventArgs.cell.formula;
            }
        };
        var isColAction = args.modelType === 'Column';
        var updateValidationToInsertedModel = function (validation, isColUpdate) {
            if (validation) {
                eventArgs.insertDeleteArgs.forceUpdate = true;
                for (var insertIdx = args.index; insertIdx <= endIdx; insertIdx++) {
                    validation = extend({}, validation);
                    updateFormula(validation);
                    if (isColUpdate) {
                        setColumn(curSheet, insertIdx, { validation: validation });
                    }
                    else if (isColAction) {
                        setCell(rowIdx, insertIdx, curSheet, { validation: validation }, true);
                    }
                    else {
                        setCell(insertIdx, colIdx, curSheet, { validation: validation }, true);
                    }
                }
                delete eventArgs.insertDeleteArgs.forceUpdate;
            }
        };
        var cell;
        var column;
        var endRowCount;
        var endColCount;
        var rowIdx;
        var colIdx;
        var isInsertOnCurSheet;
        this.parent.sheets.forEach(function (sheet, sheetIdx) {
            if (isSheetAction) {
                if (sheetIdx >= args.startIndex && sheetIdx <= args.endIndex) {
                    return;
                }
            }
            else {
                if (sheetIdx === eventArgs.sheetIdx) {
                    isInsertOnCurSheet = isInsert;
                    delete eventArgs.otherSheet;
                    delete eventArgs.formulaSheet;
                }
                else {
                    eventArgs.otherSheet = true;
                    eventArgs.formulaSheet = sheet;
                    isInsertOnCurSheet = false;
                }
            }
            endRowCount = sheet.usedRange.rowIndex + 1;
            for (colIdx = 0, endColCount = sheet.usedRange.colIndex + 1; colIdx < endColCount; colIdx++) {
                if (isInsertOnCurSheet && isColAction && colIdx >= args.index && colIdx <= endIdx) {
                    continue;
                }
                column = sheet.columns && sheet.columns[colIdx];
                if (column && column.validation) {
                    updateFormula(column.validation);
                    if (isInsertOnCurSheet && isColAction && prevIdx === colIdx) {
                        updateValidationToInsertedModel(column.validation, true);
                    }
                }
                for (rowIdx = 0; rowIdx < endRowCount; rowIdx++) {
                    cell = getCell(rowIdx, colIdx, sheet, false, true);
                    if (cell.validation && (!isInsertOnCurSheet || isColAction || rowIdx < args.index || rowIdx > endIdx)) {
                        updateFormula(cell.validation);
                        if (isInsertOnCurSheet && prevIdx === (isColAction ? colIdx : rowIdx)) {
                            updateValidationToInsertedModel(cell.validation);
                        }
                    }
                }
            }
        });
    };
    WorkbookDataValidation.prototype.getRangeWhenColumnSelected = function (range, sheet) {
        var isFullCol;
        var colNames = range.split(':');
        if (range.match(/\D/g) && !range.match(/[0-9]/g)) {
            colNames[0] += 1;
            colNames[1] += sheet.rowCount;
            range = colNames[0] + ':' + colNames[1];
            isFullCol = true;
        }
        else if (!range.match(/\D/g) && range.match(/[0-9]/g)) {
            colNames[0] = 'A' + colNames[0];
            colNames[1] = getCellAddress(0, sheet.colCount - 1).replace(/[0-9]/g, '') + colNames[1];
            range = colNames[0] + ':' + colNames[1];
        }
        return { range: range, isFullCol: isFullCol };
    };
    /**
     * Gets the module name.
     *
     * @returns {string} string
     */
    WorkbookDataValidation.prototype.getModuleName = function () {
        return 'workbookDataValidation';
    };
    return WorkbookDataValidation;
}());
export { WorkbookDataValidation };
