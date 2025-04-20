import { getSheetName, getSheet, getSheetIndexFromId, setCell, getTypeFromFormat } from '../index';
import { getSingleSelectedRange, getCell, getSheetIndex, checkFormulaRef, parseFormulaArgument, sheetRenameUpdate } from '../index';
import { workbookFormulaOperation, getColumnHeaderText, aggregateComputation, clearFormulaDependentCells, formulaInValidation, applyCF, getCellRefValue, commputeFormulaValue } from '../common/index';
import { Calculate, ValueChangedArgs, CommonErrors, getAlphalabel } from '../../calculate/index';
import { isNullOrUndefined, getNumericObject } from '@syncfusion/ej2-base';
import { Deferred } from '@syncfusion/ej2-data';
import { getCellAddress, getFormattedCellObject, isNumber, checkIsFormula, removeUniquecol, checkUniqueRange } from '../common/index';
import { getRangeAddress, getRangeFromAddress, isCellReference, refreshInsertDelete, getUpdatedFormulaOnInsertDelete } from '../common/index';
import { getUniqueRange, DefineName, selectionComplete, getRangeIndexes, getSwapRange } from '../common/index';
import { updateSheetFromDataSource } from '../common/index';
import { formulaBarOperation } from '../../spreadsheet/common/event';
/**
 * @hidden
 * The `WorkbookFormula` module is used to handle the formula operation in Workbook.
 */
var WorkbookFormula = /** @class */ (function () {
    /**
     * Constructor for formula module in Workbook.
     *
     * @param {Workbook} workbook - Specifies the workbook.
     * @private
     */
    function WorkbookFormula(workbook) {
        this.uniqueOBracket = String.fromCharCode(129);
        this.uniqueCBracket = String.fromCharCode(130);
        this.uniqueCSeparator = String.fromCharCode(131);
        this.uniqueCOperator = String.fromCharCode(132);
        this.uniquePOperator = String.fromCharCode(133);
        this.uniqueSOperator = String.fromCharCode(134);
        this.uniqueMOperator = String.fromCharCode(135);
        this.uniqueDOperator = String.fromCharCode(136);
        this.uniqueModOperator = String.fromCharCode(137);
        this.uniqueConcateOperator = String.fromCharCode(138);
        this.uniqueEqualOperator = String.fromCharCode(139);
        this.uniqueExpOperator = String.fromCharCode(140);
        this.uniqueGTOperator = String.fromCharCode(141);
        this.uniqueLTOperator = String.fromCharCode(142);
        this.sheetInfo = [];
        this.parent = workbook;
        this.init();
    }
    WorkbookFormula.prototype.init = function () {
        var _this = this;
        this.addEventListener();
        this.initCalculate();
        this.registerSheet();
        this.parent.customFormulaCollection.forEach(function (value, key) {
            _this.addCustomFunction(value.handler, key, value.description);
        });
    };
    /**
     * To destroy the formula module.
     *
     * @returns {void}
     * @hidden
     */
    WorkbookFormula.prototype.destroy = function () {
        var _this = this;
        this.removeEventListener();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.parent.refreshing) {
            this.clearAllUniqueFormulaValue();
            var formulaCollect = this.calculateInstance.getLibraryFormulas();
            formulaCollect.forEach(function (value, key) {
                if (value.isCustom) {
                    _this.parent.customFormulaCollection.set(key, { handler: value.handler, description: value.description });
                }
            });
        }
        this.calculateInstance.dispose();
        this.calculateInstance = null;
        if (this.sheetInfo) {
            this.sheetInfo = [];
        }
        this.parent = null;
    };
    WorkbookFormula.prototype.addEventListener = function () {
        this.parent.on(workbookFormulaOperation, this.performFormulaOperation, this);
        this.parent.on(aggregateComputation, this.aggregateComputation, this);
        this.parent.on(getUniqueRange, this.getUniqueRange, this);
        this.parent.on(removeUniquecol, this.removeUniquecol, this);
        this.parent.on(clearFormulaDependentCells, this.clearFormulaDependentCells, this);
        this.parent.on(formulaInValidation, this.formulaInValidation, this);
        this.parent.on(refreshInsertDelete, this.refreshInsertDelete, this);
        this.parent.on(getUpdatedFormulaOnInsertDelete, this.getUpdatedFormulaOnInsertDelete, this);
        this.parent.on(checkFormulaRef, this.autoCorrectCellRef, this);
        this.parent.on(parseFormulaArgument, this.parseFormulaArgument, this);
        this.parent.on(getCellRefValue, this.getCellRefValue, this);
        this.parent.on(commputeFormulaValue, this.commputeFormulaValue, this);
        this.parent.on(sheetRenameUpdate, this.renameUpdation, this);
    };
    WorkbookFormula.prototype.removeEventListener = function () {
        if (!this.parent.isDestroyed) {
            this.parent.off(workbookFormulaOperation, this.performFormulaOperation);
            this.parent.off(aggregateComputation, this.aggregateComputation);
            this.parent.off(getUniqueRange, this.getUniqueRange);
            this.parent.off(removeUniquecol, this.removeUniquecol);
            this.parent.off(clearFormulaDependentCells, this.clearFormulaDependentCells);
            this.parent.off(formulaInValidation, this.formulaInValidation);
            this.parent.off(refreshInsertDelete, this.refreshInsertDelete);
            this.parent.off(getUpdatedFormulaOnInsertDelete, this.getUpdatedFormulaOnInsertDelete);
            this.parent.off(checkFormulaRef, this.autoCorrectCellRef);
            this.parent.off(parseFormulaArgument, this.parseFormulaArgument);
            this.parent.off(getCellRefValue, this.getCellRefValue);
            this.parent.off(commputeFormulaValue, this.commputeFormulaValue);
            this.parent.off(sheetRenameUpdate, this.renameUpdation);
        }
    };
    /**
     * Get the module name.
     *
     * @returns {string} - Get the module name.
     * @private
     */
    WorkbookFormula.prototype.getModuleName = function () {
        return 'workbookFormula';
    };
    WorkbookFormula.prototype.initCalculate = function () {
        this.calculateInstance = new Calculate(this.parent);
        this.calcID = this.calculateInstance.createSheetFamilyID();
        this.calculateInstance.setTreatEmptyStringAsZero(true);
        this.calculateInstance.grid = this.parent.getActiveSheet().id.toString();
        this.calculateInstance.setParseArgumentSeparator(this.parent.listSeparator);
        var decimalSeparator = getNumericObject(this.parent.locale).decimal;
        if (decimalSeparator !== '.' && this.parent.listSeparator !== decimalSeparator) {
            this.calculateInstance.setParseDecimalSeparator(decimalSeparator);
        }
    };
    WorkbookFormula.prototype.clearFormulaDependentCells = function (args) {
        if (args.isOpen) {
            this.calculateInstance.getDependentCells().clear();
            this.calculateInstance.getFormulaInfoTable().clear();
            this.calculateInstance.getDependentFormulaCells().clear();
            return;
        }
        var cellRef = args.cellRef.split(':')[0];
        var sheetId = this.parent.getActiveSheet().id.toString();
        var family = this.calculateInstance.getSheetFamilyItem(sheetId);
        if (family.isSheetMember && !isNullOrUndefined(family.parentObjectToToken)) {
            cellRef = family.parentObjectToToken.get(sheetId) + cellRef;
        }
        if (args.clearFormulaInfo && this.calculateInstance.getFormulaInfoTable().has(cellRef)) {
            this.calculateInstance.getFormulaInfoTable().delete(cellRef);
        }
        this.calculateInstance.clearFormulaDependentCells(cellRef);
    };
    WorkbookFormula.prototype.formulaInValidation = function (args) {
        var col = this.calculateInstance.getLibraryFormulas().get(args.value);
        args.skip = isNullOrUndefined(col);
    };
    WorkbookFormula.prototype.performFormulaOperation = function (args) {
        var action = args.action;
        var formulas;
        var formulaInfo;
        if (action !== 'refreshCalculate') {
            formulas = this.calculateInstance.getLibraryFormulas();
            formulaInfo = (Array.from(formulas.values()));
        }
        var collection;
        var family = this.calculateInstance.getSheetFamilyItem(args.sheetId);
        switch (action) {
            case 'getLibraryFormulas':
                args.formulaCollection = Array.from(formulas.keys());
                break;
            case 'getFormulaCategory':
                collection = ['All'];
                for (var i = 1; i < Array.from(formulas.values()).length; i++) {
                    if (collection.indexOf(formulaInfo[i].category) < 0) {
                        collection.push(formulaInfo[i].category);
                    }
                }
                args.categoryCollection = collection;
                break;
            case 'dropDownSelectFormulas':
                for (var i = 0; i < Array.from(formulas.values()).length; i++) {
                    if (args.selectCategory === formulaInfo[i].category) {
                        args.formulaCollection[i] = Array.from(formulas.keys())[i];
                    }
                }
                break;
            case 'getFormulaDescription':
                for (var i = 0; i < Array.from(formulas.values()).length; i++) {
                    if (args.selectedList === Array.from(formulas.keys())[i]) {
                        args.description = formulaInfo[i].description;
                        args.isCustom = formulaInfo[i].isCustom;
                    }
                }
                break;
            case 'registerSheet':
                this.registerSheet(args.sheetIndex, args.sheetCount);
                if (args.isImport) {
                    this.calculateInstance.setParseArgumentSeparator(this.parent.listSeparator);
                    this.updateSheetInfo();
                }
                break;
            case 'unRegisterSheet':
                this.unRegisterSheet(args.sheetIndex, args.sheetCount, args.propertyChange);
                break;
            case 'initSheetInfo':
                this.updateSheetInfo();
                break;
            case 'refreshCalculate':
                this.refreshCalculate(args);
                break;
            case 'refreshRandomFormula':
                this.refreshRandomFormula();
                this.calculateInstance.cell = '';
                break;
            case 'setArgumentSeparator':
                this.calculateInstance.setParseArgumentSeparator(this.parent.listSeparator);
                break;
            case 'addDefinedName':
                args.isAdded = this.addDefinedName(args.definedName, false, args.index, args.isEventTrigger);
                break;
            case 'removeDefinedName':
                args.isRemoved = this.removeDefinedName(args.definedName, args.scope, args.isEventTrigger);
                break;
            case 'initiateDefinedNames':
                this.initiateDefinedNames();
                break;
            case 'addSheet':
                this.sheetInfo.push({ visibleName: args.visibleName, sheet: args.sheetName, index: args.sheetId });
                break;
            case 'getSheetInfo':
                args.sheetInfo = this.sheetInfo;
                break;
            case 'deleteSheetTab':
                for (var i = 0; i < this.sheetInfo.length; i++) {
                    if (this.sheetInfo[i].index === args.sheetId) {
                        var visibleName = this.sheetInfo[i].visibleName;
                        var sheetName = this.sheetInfo[i].sheet;
                        this.sheetInfo.splice(i, 1);
                        var id = args.sheetId.toString();
                        this.sheetDeletion(sheetName, id);
                        this.calculateInstance.unregisterGridAsSheet(id, id);
                        this.definedNamesDeletion(visibleName);
                        break;
                    }
                }
                break;
            case 'getReferenceError':
                args.refError = this.referenceError();
                break;
            case 'getAlpha':
                args.col = getAlphalabel(args.col);
                break;
            case 'addCustomFunction':
                this.addCustomFunction(args.functionHandler, args.functionName, args.formulaDescription);
                break;
            case 'computeExpression':
                args.calcValue = this.calculateInstance.computeExpression(args.formula, args.isFromComputeExpression);
                break;
            case 'registerGridInCalc':
                this.calculateInstance.grid = args.sheetID;
                break;
            case 'dependentCellsAvailable':
            case 'checkFormulaAdded':
                if (family.isSheetMember && !isNullOrUndefined(family.parentObjectToToken)) {
                    args.address = family.parentObjectToToken.get(args.sheetId) + args.address;
                }
                if (action === 'checkFormulaAdded') {
                    args.added = this.calculateInstance.getFormulaInfoTable().has(args.address);
                }
                else {
                    args.isAvailable = this.calculateInstance.getDependentCells().has(args.address);
                }
                break;
            case 'calculateNow':
                this.calculateNow(args);
                break;
            case 'ClearDependentCellCollection':
                this.calculateInstance.getDependentFormulaCells().clear();
                this.calculateInstance.getDependentCells().clear();
                this.calculateInstance.getFormulaInfoTable().clear();
                break;
        }
    };
    WorkbookFormula.prototype.definedNamesDeletion = function (sheetName) {
        var definedNames = this.parent.definedNames;
        if (definedNames && definedNames.length > 0) {
            for (var i = definedNames.length - 1; i >= 0; i--) {
                if (definedNames[i].refersTo.substring(1, definedNames[i].refersTo.lastIndexOf('!')).split('\'').join('') === sheetName) {
                    this.removeDefinedName(definedNames[i].name, definedNames[i].scope);
                }
            }
        }
    };
    WorkbookFormula.prototype.referenceError = function () {
        return this.calculateInstance.getErrorStrings()[CommonErrors.Ref];
    };
    WorkbookFormula.prototype.getSheetInfo = function () {
        return this.sheetInfo;
    };
    WorkbookFormula.prototype.addCustomFunction = function (functionHandler, functionName, formulaDescription) {
        this.calculateInstance.defineFunction(functionName, functionHandler, formulaDescription);
    };
    WorkbookFormula.prototype.updateSheetInfo = function () {
        var _this = this;
        this.sheetInfo = [];
        this.parent.sheets.forEach(function (sheet) {
            _this.sheetInfo.push({ visibleName: sheet.name, sheet: 'Sheet' + sheet.id, index: sheet.id });
        });
    };
    WorkbookFormula.prototype.getSheetRefUpdateOnDelete = function () {
        var _this = this;
        var definedNames = this.calculateInstance.namedRanges;
        var keyArray;
        var valueArray;
        var isDefinedNamesAvail;
        if (definedNames && definedNames.size) {
            isDefinedNamesAvail = true;
            keyArray = Array.from(definedNames.keys());
            valueArray = Array.from(definedNames.values());
        }
        return function (delSheetName, formula) {
            var isNamedRange;
            if (isDefinedNamesAvail && !formula.includes(delSheetName)) {
                formula = formula.replace(/\w+/g, function (key) {
                    var index = keyArray.indexOf(key);
                    if (index !== -1) {
                        isNamedRange = true;
                        return valueArray[index];
                    }
                    return key;
                });
            }
            var sheetName = delSheetName.toUpperCase();
            formula = formula.toUpperCase();
            var idx = formula.indexOf(sheetName);
            while (idx > -1) {
                formula = formula.split((formula[idx - 1] === '\'' && formula[idx + sheetName.length] === '\'' ? "'" + sheetName + "'" : sheetName) +
                    _this.calculateInstance.sheetToken).join(_this.referenceError());
                idx = formula.indexOf(sheetName);
            }
            return { value: formula, isNamedRange: isNamedRange };
        };
    };
    WorkbookFormula.prototype.sheetDeletion = function (delSheetName, sheetId) {
        var _this = this;
        var dependentCell = this.calculateInstance.getDependentCells();
        var fInfo;
        var token;
        var family = this.calculateInstance.getSheetFamilyItem(sheetId);
        var updateSheetRef = this.getSheetRefUpdateOnDelete();
        var updatedInfo;
        dependentCell.forEach(function (dependentCellRefs, cellRef) {
            dependentCellRefs.forEach(function (dependentCellRef) {
                fInfo = _this.calculateInstance.getFormulaInfoTable().get(dependentCellRef);
                if (!isNullOrUndefined(fInfo)) {
                    updatedInfo = updateSheetRef(delSheetName, fInfo.formulaText);
                    if (updatedInfo.value !== fInfo.formulaText) {
                        token = dependentCellRef.slice(0, dependentCellRef.lastIndexOf(_this.calculateInstance.sheetToken) + 1);
                        updatedInfo.sheetId = family.tokenToParentObject.has(token) ? Number(family.tokenToParentObject.get(token)) :
                            parseInt(dependentCellRef.split('!')[1], 10) + 1;
                        _this.updateDataContainer([_this.calculateInstance.rowIndex(dependentCellRef) - 1, _this.calculateInstance.colIndex(dependentCellRef) - 1], updatedInfo);
                        _this.calculateInstance.refresh(fInfo.getParsedFormula());
                    }
                }
                token = cellRef.slice(0, cellRef.lastIndexOf(_this.calculateInstance.sheetToken) + 1);
                if (sheetId === (family.tokenToParentObject.has(token) ? family.tokenToParentObject.get(token) :
                    cellRef.split('!')[1])) {
                    _this.calculateInstance.getFormulaInfoTable().delete(cellRef);
                    _this.calculateInstance.clearFormulaDependentCells(cellRef);
                }
            });
        });
    };
    WorkbookFormula.prototype.renameUpdation = function (args) {
        var _this = this;
        var name = args.value;
        var pName = args.pName;
        var sheet;
        var cell;
        var uPName = args.pName.toUpperCase();
        var escapeRegx = new RegExp('[!@#$%^&()+=\';,.{}|\\":<>~_-]', 'g');
        var exp = '(?=[\'!])(?=[^"]*(?:"[^"]*"[^"]*)*$)';
        var regExp = RegExp;
        var regx = new regExp(pName.replace(escapeRegx, '\\$&') + exp, 'gi');
        var renameValidationSheetRef = function (validation) {
            if (checkIsFormula(validation.value1) && validation.value1.toUpperCase().includes(uPName) && validation.value1.match(regx)) {
                validation.value1 = validation.value1.replace(regx, name);
            }
            if (checkIsFormula(validation.value2) && validation.value2.toUpperCase().includes(uPName) && validation.value2.match(regx)) {
                validation.value2 = validation.value2.replace(regx, name);
            }
        };
        this.sheetInfo.forEach(function (info, index) {
            sheet = getSheet(_this.parent, index);
            if (sheet && sheet.rows && sheet.rows.length) {
                for (var i = 0, rowLen = sheet.rows.length; i < rowLen; i++) {
                    if (sheet.rows[i] && sheet.rows[i].cells) {
                        for (var j = 0, cellsLen = sheet.rows[i].cells.length; j < cellsLen; j++) {
                            cell = getCell(i, j, sheet, false, true);
                            if (cell.formula && checkIsFormula(cell.formula) && cell.formula.toUpperCase().includes(uPName) &&
                                cell.formula.match(regx)) {
                                cell.formula = cell.formula.replace(regx, name);
                            }
                            if (cell.validation) {
                                renameValidationSheetRef(cell.validation);
                            }
                        }
                    }
                }
            }
            if (sheet && sheet.columns && sheet.columns.length) {
                var column = void 0;
                for (var i = 0, colsLen = sheet.columns.length; i < colsLen; i++) {
                    column = sheet.columns[i];
                    if (column && column.validation) {
                        renameValidationSheetRef(column.validation);
                    }
                }
            }
            var definedNames = _this.parent.definedNames;
            for (var i = 0; i < definedNames.length; i++) {
                if (checkIsFormula(definedNames[i].refersTo) && definedNames[i].refersTo.includes(pName) &&
                    definedNames[i].refersTo.match(regx)) {
                    definedNames[i].refersTo = definedNames[i].refersTo.replace(regx, name);
                    if (definedNames[i].scope.includes(pName)) {
                        definedNames[i].scope = name;
                    }
                }
            }
            _this.calculateInstance.updateNamedRange(pName, name);
            if (info.visibleName === pName) {
                info.visibleName = name;
            }
        });
    };
    WorkbookFormula.prototype.updateDataContainer = function (indexes, data) {
        var sheet;
        var rowData;
        var colObj;
        for (var i = 0, len = this.parent.sheets.length; i < len; i++) {
            sheet = getSheet(this.parent, i);
            if (sheet.id === data.sheetId) {
                if (indexes[0] in sheet.rows) {
                    rowData = sheet.rows[indexes[0]];
                    if (indexes[1] in rowData.cells) {
                        colObj = rowData.cells[indexes[1]];
                        colObj.formula = data.isNamedRange ? colObj.formula : data.value;
                        if (data.visible) {
                            if (i === this.parent.activeSheetIndex && sheet.activeCell === getCellAddress(indexes[0], indexes[1])) {
                                this.parent.notify(selectionComplete, {});
                            }
                        }
                        else if (this.parent.calculationMode === 'Automatic') {
                            colObj.value = this.referenceError();
                        }
                    }
                    else {
                        rowData.cells[indexes[1]] = colObj = {};
                    }
                }
                else {
                    rowData = sheet.rows[indexes[0]] = {};
                    rowData[indexes[1]] = colObj = {};
                }
                break;
            }
        }
    };
    WorkbookFormula.prototype.parseSheetRef = function (value, addSheetQuotes) {
        var regx;
        // eslint-disable-next-line no-useless-escape
        var escapeRegx = new RegExp('[!@#$%^&()+=\';,.{}|\":<>~_-]', 'g');
        var i = 0;
        var sheetInfo = this.getSheetInfo();
        var sheetCount = sheetInfo.length;
        var temp = [];
        temp.length = 0;
        var regxTemp;
        var searchIdx;
        var idx;
        var valSearchIdx;
        var regxVisible;
        var exp = '(?=[\'!])(?=[^"]*(?:"[^"]*"[^"]*)*$)';
        var regExp = RegExp;
        for (i = 0; i < sheetCount; i++) {
            if (sheetInfo[i].sheet !== sheetInfo[i].visibleName) {
                regx = new regExp(sheetInfo[i].visibleName.replace(escapeRegx, '\\$&') + exp, 'gi');
                idx = i;
                if (value.match(regx)) {
                    for (var j = i + 1; j < sheetCount; j++) {
                        if (sheetInfo[j].visibleName.includes(sheetInfo[i].visibleName)) {
                            regxTemp = new regExp(sheetInfo[j].visibleName.replace(escapeRegx, '\\$&') + exp, 'gi');
                            searchIdx = value.search(regxTemp);
                            valSearchIdx = value.search(regx);
                            if (searchIdx > -1 && (searchIdx < valSearchIdx || (searchIdx === valSearchIdx &&
                                sheetInfo[j].visibleName.length > sheetInfo[i].visibleName.length))) {
                                regxVisible = new RegExp('Sheet', 'gi');
                                if (sheetInfo[j].visibleName.search(regxVisible) !== 0) {
                                    regx = regxTemp;
                                    idx = j;
                                }
                            }
                        }
                    }
                    value = value.replace(regx, idx + '/');
                    temp.push(idx);
                }
            }
        }
        i = 0;
        var sheetRef;
        while (i < temp.length) {
            regx = new regExp(temp[i] + '/' + exp, 'gi');
            sheetRef = addSheetQuotes ? '`' + sheetInfo[temp[i]].sheet + '`' : sheetInfo[temp[i]].sheet;
            value = value.replace(regx, sheetRef);
            i++;
        }
        return value;
    };
    WorkbookFormula.prototype.registerSheet = function (sheetIndex, sheetCount) {
        if (sheetIndex === void 0) { sheetIndex = 0; }
        if (sheetCount === void 0) { sheetCount = this.parent.sheets.length; }
        var id;
        while (sheetIndex < sheetCount) {
            id = getSheet(this.parent, sheetIndex).id + '';
            this.calculateInstance.registerGridAsSheet(id, id, this.calcID);
            sheetIndex++;
        }
    };
    WorkbookFormula.prototype.unRegisterSheet = function (sheetIndex, sheetCount, propertyChange) {
        if (sheetIndex === void 0) { sheetIndex = 0; }
        if (sheetCount === void 0) { sheetCount = this.parent.sheets.length; }
        var id;
        this.calculateInstance.tokenCount = 0;
        if (propertyChange) {
            this.calculateInstance.unregisterGridAsSheet(id, id, propertyChange);
        }
        else {
            while (sheetIndex < sheetCount) {
                id = getSheet(this.parent, sheetIndex).id + '';
                this.calculateInstance.unregisterGridAsSheet(id, id);
                sheetIndex++;
            }
        }
    };
    WorkbookFormula.prototype.getUniqueRange = function (args) {
        args.range = this.calculateInstance.uniqueRange;
    };
    WorkbookFormula.prototype.removeUniquecol = function (args) {
        if (args && args.clearAll) {
            this.clearAllUniqueFormulaValue();
            return;
        }
        var sheet = this.parent.getActiveSheet();
        for (var i = 0; i < this.calculateInstance.uniqueRange.length; i++) {
            var uniqRngAddress = this.calculateInstance.uniqueRange[i].split(':')[0].split('!');
            if (uniqRngAddress[0] === sheet.name && uniqRngAddress[1] === sheet.activeCell) {
                var range = getRangeIndexes(this.calculateInstance.uniqueRange[i]);
                this.calculateInstance.uniqueRange.splice(i, 1);
                for (var j = range[0]; j <= range[2]; j++) {
                    for (var k = range[1]; k <= range[3]; k++) {
                        var cell = getCell(j, k, this.parent.getActiveSheet());
                        cell.formula = '';
                        this.parent.updateCellDetails({ value: '', formula: '' }, getRangeAddress([j, k]), undefined, undefined, true);
                    }
                }
            }
        }
    };
    /**
     * Perform the formula calculation.
     *
     * @param {FormulaCalculateArgs} args - Specifies the formula calculation options.
     * @param {number} args.rowIndex - The index of the row.
     * @param {number} args.colIndex - The index of the column.
     * @param {string} args.value - The value of the cell.
     * @param {boolean} args.isFormula - A flag indicating whether the value is a formula.
     * @param {number} args.sheetIdx - The index of the sheet.
     * @param {boolean} args.isRefreshing - A flag indicating whether the calculation is being refreshed.
     * @param {boolean} [args.isDependentRefresh] - An optional flag indicating whether the refresh is dependent.
     * @param {boolean} [args.isRandomFormula] - An optional flag indicating whether the formula is random.
     * @param {boolean} [args.isDelete] - An optional flag indicating whether is from delete cells.
     * @param {number[]} [args.deletedRange] - An optional range array indicating the deleted cells.
     * @returns {void}
     * @private
     */
    WorkbookFormula.prototype.refreshCalculate = function (args) {
        args.sheet = isNullOrUndefined(args.sheetIndex) ? this.parent.getActiveSheet() : getSheet(this.parent, args.sheetIndex);
        var sheetId = args.sheet.id + '';
        var family = this.calculateInstance.getSheetFamilyItem(sheetId);
        var cellRef = getColumnHeaderText(args.colIndex + 1) + (args.rowIndex + 1);
        if (family.isSheetMember && !isNullOrUndefined(family.parentObjectToToken)) {
            cellRef = family.parentObjectToToken.get(sheetId) + cellRef;
        }
        if (args.isFormula) {
            this.calculateFormula(args, cellRef);
        }
        else {
            if (this.calculateInstance.getFormulaInfoTable().has(cellRef)) {
                this.calculateInstance.getFormulaInfoTable().delete(cellRef);
                this.calculateInstance.clearFormulaDependentCells(cellRef);
            }
            this.calculateInstance.refresh(cellRef, null, null, null, args.isDelete, args.deletedRange);
            if (this.parent.calculationMode === 'Automatic') {
                this.calculateInstance.refreshRandValues(cellRef);
            }
        }
        this.calculateInstance.cell = '';
        args.isFormulaDependent = this.calculateInstance.getDependentCells().has(cellRef);
        if (args.value) {
            args.value = args.value.toString().split('^+').join('^').split('&+').join('&');
        }
    };
    WorkbookFormula.prototype.calculateFormula = function (args, cellRef) {
        var _this = this;
        var sheet = args.sheet;
        this.autoCorrectFormula(args, sheet);
        var value = args.value;
        if (args.isClipboard && value.toUpperCase().includes('UNIQUE')) {
            setCell(args.rowIndex, args.colIndex, sheet, { value: '' }, true);
        }
        var formula = value;
        value = this.parseSheetRef(value);
        var cellArgs = new ValueChangedArgs(args.rowIndex + 1, args.colIndex + 1, value);
        var usedRange = [sheet.usedRange.rowIndex, sheet.usedRange.colIndex];
        this.calculateInstance.valueChanged(sheet.id.toString(), cellArgs, true, usedRange, args.isRefreshing, sheet.name, args.isRandomFormula, null, args.isDelete, args.deletedRange, args.isDependentRefresh, args.action);
        if (this.calculateInstance.isRandomVal === true && !args.isRandomFormula && this.parent.calculationMode === 'Automatic') {
            this.refreshRandomFormula();
        }
        var updatedCell = getCell(args.rowIndex, args.colIndex, sheet);
        if (updatedCell && formula && !args.isDependentRefresh) {
            formula = formula.toUpperCase();
            var formulaStr = void 0;
            if (formula.indexOf('=SUM(') === 0) {
                formulaStr = '=SUM(';
            }
            else if (formula.indexOf('=AVERAGE(') === 0) {
                formulaStr = '=AVERAGE(';
            }
            else if (formula.indexOf('=ROUNDDOWN(') === 0) {
                formulaStr = '=ROUNDDOWN(';
            }
            else if (formula.indexOf('=ROUNDUP(') === 0) {
                formulaStr = '=ROUNDUP(';
            }
            else if (formula.indexOf('=MOD(') === 0) {
                formulaStr = '=MOD(';
            }
            if (formulaStr) {
                formula = formula.replace(formulaStr, '');
                if (formula.includes(')')) {
                    formula = formula.slice(0, formula.lastIndexOf(')'));
                    var fStr = void 0;
                    var idx = void 0;
                    while (formula.includes('(') && formula.includes(')')) {
                        idx = formula.indexOf('(');
                        fStr = formula.slice(idx + 1);
                        formula = formula.slice(0, idx) + (fStr.includes(')') ? fStr.slice(fStr.indexOf(')') + 1) : fStr);
                    }
                }
                var cellRefArr = formula.split(this.calculateInstance.getParseArgumentSeparator());
                var cellRef_1;
                var fCell = void 0;
                var model = void 0;
                var sheetIdx = void 0;
                var sheetName = void 0;
                var index = void 0;
                var _loop_1 = function (idx) {
                    cellRef_1 = cellRefArr[idx].split(':')[0];
                    if (cellRef_1.includes('!')) {
                        sheetName = cellRef_1.substring(0, cellRef_1.lastIndexOf('!')).split('\'').join('');
                        cellRef_1 = cellRef_1.substring(cellRef_1.lastIndexOf('!') + 1);
                    }
                    else {
                        sheetName = '';
                    }
                    if (isCellReference(cellRef_1)) {
                        if (sheetName) {
                            sheetIdx = getSheetIndex(this_1.parent, sheetName);
                            model = sheetIdx !== undefined ? getSheet(this_1.parent, sheetIdx) : sheet;
                        }
                        else {
                            model = sheet;
                        }
                        index = getRangeIndexes(cellRef_1);
                        fCell = getCell(index[0], index[1], model);
                        var format_1 = getTypeFromFormat(updatedCell.format);
                        var excludedFormats = ['Number', 'Currency', 'LongDate', 'Time'];
                        if (fCell && fCell.format && (!updatedCell.format || (!args.fillType &&
                            (excludedFormats.every(function (fmt) { return format_1 !== fmt; }) &&
                                getTypeFromFormat(fCell.format) !== 'Number')))) {
                            updatedCell.format = fCell.format;
                            return "break";
                        }
                    }
                };
                var this_1 = this;
                for (var idx = 0; idx < cellRefArr.length; idx++) {
                    var state_1 = _loop_1(idx);
                    if (state_1 === "break")
                        break;
                }
            }
            else {
                var depCells = this.calculateInstance.getDependentFormulaCells().get(cellRef);
                if (depCells && depCells.size && this.calculateInstance.getFormulaInfoTable().has(cellRef) &&
                    this.calculateInstance.getFormulaInfoTable().get(cellRef).getParsedFormula().lastIndexOf('q') === -1 &&
                    !updatedCell.format) {
                    var format_2;
                    var fCell_1;
                    var sheetRef_1;
                    var model_1;
                    var sheetIdx_1;
                    var idx_1;
                    var family_1 = this.calculateInstance.getSheetFamilyItem(null, this.calcID);
                    depCells.forEach(function (cellRef) {
                        if (!format_2) {
                            sheetRef_1 = cellRef.slice(0, cellRef.lastIndexOf('!') + 1);
                            cellRef = cellRef.replace(sheetRef_1, '');
                            if (isCellReference(cellRef)) {
                                idx_1 = getRangeIndexes(cellRef);
                                if (family_1.tokenToParentObject.has(sheetRef_1)) {
                                    sheetIdx_1 = getSheetIndexFromId(_this.parent, Number(family_1.tokenToParentObject.get(sheetRef_1)));
                                    model_1 = sheetIdx_1 !== undefined ? getSheet(_this.parent, sheetIdx_1) : sheet;
                                }
                                else {
                                    model_1 = sheet;
                                }
                                fCell_1 = getCell(idx_1[0], idx_1[1], model_1);
                                if (fCell_1 && fCell_1.format) {
                                    format_2 = fCell_1.format;
                                }
                            }
                        }
                    });
                    if (format_2) {
                        updatedCell.format = format_2;
                    }
                }
            }
        }
    };
    WorkbookFormula.prototype.refreshRandomFormula = function () {
        var rowId;
        var colId;
        var refValue = '';
        var referenceCollection = this.calculateInstance.randCollection;
        if (this.calculateInstance.randomValues.size > 1 && this.calculateInstance.randomValues.size ===
            referenceCollection.length) {
            for (var i = 0; i < this.calculateInstance.randomValues.size; i++) {
                rowId = this.calculateInstance.rowIndex(referenceCollection[i]);
                colId = this.calculateInstance.colIndex(referenceCollection[i]);
                refValue = this.calculateInstance.randomValues.get(referenceCollection[i]);
                var sheetId = (parseFloat(this.calculateInstance.getSheetToken(referenceCollection[i]).split(this.calculateInstance.sheetToken).join('')) + 1).toString();
                var sheet = getSheet(this.parent, getSheetIndexFromId(this.parent, Number(sheetId)));
                if (sheet && getCell(rowId - 1, colId - 1, sheet).formula) {
                    var tempArgs = new ValueChangedArgs(rowId, colId, refValue);
                    this.calculateInstance.valueChanged(sheetId, tempArgs, true, undefined, undefined, undefined, false, true);
                }
            }
        }
    };
    WorkbookFormula.prototype.autoCorrectFormula = function (args, sheet) {
        if (!isNullOrUndefined(args.value)) {
            var formula = args.value;
            formula = this.autoCorrectCellRef({ formula: args.value });
            formula = formula.toString();
            if (formula.split('(').length === 2 && formula.indexOf(')') < 0) {
                formula += ')';
            }
            var isEqual = void 0;
            if (formula.indexOf('=') === 0) {
                formula = formula.slice(1);
                isEqual = true;
            }
            var lessEq = formula.match(/</g);
            var greaterEq = formula.match(/>/g);
            var equal = formula.match(/=/g);
            if (lessEq) {
                var lessOp = '';
                for (var i = 0; i < lessEq.length; i++) {
                    lessOp = lessOp + lessEq[i];
                }
                formula = formula.replace(lessOp, '<');
            }
            if (greaterEq) {
                var greaterOp = '';
                for (var j = 0; j < greaterEq.length; j++) {
                    greaterOp = greaterOp + greaterEq[j];
                }
                formula = formula.replace(greaterOp, '>');
            }
            if (equal) {
                var equalOp = '';
                for (var c = 0; c < equal.length; c++) {
                    equalOp = equalOp + equal[c];
                }
                formula = formula.split(equalOp).join('=');
            }
            formula = isEqual ? '=' + formula : formula;
            if (lessEq || greaterEq || equal) {
                getCell(args.rowIndex, args.colIndex, sheet).formula = formula;
            }
            args.value = formula;
        }
    };
    WorkbookFormula.prototype.correctCellReference = function (cellRef) {
        var _this = this;
        var cellRefArr = cellRef.split(':');
        var refArr;
        var sheetRefArr;
        var oprMatchArr;
        var isInvalid;
        var updatedRef;
        cellRefArr.forEach(function (cellAddr, idx) {
            sheetRefArr = cellAddr.split('!');
            cellRef = sheetRefArr[1] || cellAddr;
            updatedRef = null;
            if (cellRef.includes('&')) {
                refArr = cellRef.split('&');
                if (_this.calculateInstance.isCellReference(refArr[1].split('$').join(''))) {
                    refArr[1] = _this.getUpdatedCellRef(refArr[1]);
                    updatedRef = refArr.join('&');
                }
            }
            else if (_this.calculateInstance.isCellReference(cellRef.split('$').join(''))) {
                updatedRef = _this.getUpdatedCellRef(cellRef);
                if (sheetRefArr.length > 1) {
                    updatedRef = sheetRefArr[0] + '!' + updatedRef;
                }
            }
            else {
                oprMatchArr = cellAddr.match(/[/+\-*^><>=<=<>]+/g);
                if (oprMatchArr) {
                    refArr = cellAddr.split(oprMatchArr[0]);
                    for (var refIdx = 0; refIdx < refArr.length; refIdx++) {
                        sheetRefArr = refArr[refIdx].split('!');
                        cellRef = sheetRefArr[1] || sheetRefArr[0];
                        if (_this.calculateInstance.isCellReference(cellRef.split('$').join(''))) {
                            refArr[refIdx] = _this.getUpdatedCellRef(cellRef);
                            if (sheetRefArr.length > 1) {
                                refArr[refIdx] = sheetRefArr[0] + '!' + refArr[refIdx];
                            }
                        }
                    }
                    updatedRef = refArr.join(oprMatchArr[0]);
                }
            }
            if (updatedRef && updatedRef !== cellAddr) {
                isInvalid = true;
                cellRefArr[idx] = updatedRef;
            }
        });
        return { isInvalid: isInvalid, ref: cellRefArr.join(':') };
    };
    WorkbookFormula.prototype.autoCorrectCellRef = function (args) {
        var rightParens = args.formula.lastIndexOf(')');
        var refCorrectObj;
        if (rightParens > -1 && args.formula.split(')').length === 2) {
            var leftParens = rightParens - 1;
            while (leftParens > -1 && args.formula[leftParens] !== '(') {
                if (args.formula[leftParens] === ')') {
                    return args.formula;
                }
                leftParens--;
            }
            if (leftParens > -1) {
                var formulaArgs = args.formula.substring(leftParens + 1, rightParens);
                var listSeparator = this.calculateInstance.getParseArgumentSeparator();
                var formulaArgsArr = formulaArgs.split(listSeparator);
                var isInValidRef = void 0;
                for (var argsIdx = 0; argsIdx < formulaArgsArr.length; argsIdx++) {
                    refCorrectObj = this.correctCellReference(formulaArgsArr[argsIdx]);
                    if (refCorrectObj.isInvalid) {
                        isInValidRef = true;
                        formulaArgsArr[argsIdx] = refCorrectObj.ref;
                    }
                }
                if (isInValidRef) {
                    args.formula = args.formula.split(formulaArgs).join(formulaArgsArr.join(listSeparator));
                    args.isInvalid = true;
                }
            }
        }
        else if (args.formula.startsWith('=') && !args.formula.includes(')')) {
            refCorrectObj = this.correctCellReference(args.formula.substring(1, args.formula.length));
            if (refCorrectObj.isInvalid) {
                args.formula = '=' + refCorrectObj.ref;
                args.isInvalid = true;
            }
        }
        return args.formula;
    };
    WorkbookFormula.prototype.getUpdatedCellRef = function (cellRef) {
        var orgCellRef = cellRef;
        cellRef = cellRef.trim();
        var isAbsolute = cellRef.indexOf('$') === 0;
        var alphabetStartIdx = cellRef.search(/[a-zA-Z]/);
        var digitStartIdx = cellRef.search(/\d/);
        alphabetStartIdx = isAbsolute ? alphabetStartIdx - 1 : alphabetStartIdx;
        if ((isAbsolute ? digitStartIdx > 1 : digitStartIdx > 0) && isNumber(cellRef.substring(digitStartIdx, cellRef.length))) {
            return orgCellRef;
        }
        else {
            return cellRef.substring(alphabetStartIdx, cellRef.length) + cellRef.substring(0, alphabetStartIdx);
        }
    };
    WorkbookFormula.prototype.initiateDefinedNames = function () {
        var definedNames = this.parent.definedNames;
        var i = 0;
        while (i < definedNames.length) {
            var definedname = definedNames[i];
            var refersTo = this.parseSheetRef(definedname.refersTo);
            var range = getRangeFromAddress(refersTo);
            var cellRef = false;
            var isLink = refersTo.indexOf('http:') > -1 ? true : (refersTo.indexOf('https:') > -1 ? true : false);
            range = range.split('$').join('');
            range = range.split('=').join('');
            if (range.indexOf(':') > -1) {
                var rangeSplit = range.split(':');
                if ((isCellReference(rangeSplit[0]) && isCellReference(rangeSplit[1])) ||
                    ((rangeSplit[0].match(/[0-9]/) && rangeSplit[1].match(/[0-9]/)) ||
                        (rangeSplit[0].toUpperCase().match(/[A-Z]/) && rangeSplit[1].toUpperCase().match(/[A-Z]/)))) {
                    cellRef = true;
                }
            }
            else if (range.indexOf(':') < 0) {
                if (isCellReference(range)) {
                    cellRef = true;
                }
            }
            if (isLink) {
                cellRef = false;
            }
            if (cellRef) {
                this.addDefinedName(definedname, true, undefined, true);
            }
            else {
                this.removeDefinedName(definedname.name, definedname.scope, true);
                i--;
            }
            i++;
        }
    };
    /**
     * @hidden
     * Used to add defined name to workbook.
     *
     * @param {DefineNameModel} definedName - Define named range.
     * @param {boolean} isValidate - Specify the boolean value.
     * @param {number} index - Define named index.
     * @param {boolean} isEventTrigger - Specify the boolean value.
     * @returns {boolean} - Used to add defined name to workbook.
     */
    WorkbookFormula.prototype.addDefinedName = function (definedName, isValidate, index, isEventTrigger) {
        if (index === undefined || index < -1) {
            index = this.parent.definedNames.length;
        }
        var isAdded = true;
        var sheetIdx;
        var name = definedName.name;
        if (definedName.refersTo.indexOf('!') < 0) {
            var sheetName = getSheetName(this.parent);
            sheetName = sheetName.indexOf(' ') !== -1 ? '\'' + sheetName + '\'' : sheetName;
            definedName.refersTo = sheetName + '!' + ((definedName.refersTo.indexOf('=') < 0) ?
                definedName.refersTo : definedName.refersTo.split('=')[1]);
        }
        var visibleRefersTo = definedName.refersTo;
        var refersTo = this.parseSheetRef(definedName.refersTo);
        if (definedName.scope) {
            sheetIdx = getSheetIndex(this.parent, definedName.scope);
            if (sheetIdx > -1) {
                name = getSheetName(this.parent, sheetIdx) + '!' + name;
            }
        }
        else {
            definedName.scope = 'Workbook';
        }
        if (!definedName.comment) {
            definedName.comment = '';
        }
        //need to extend once internal sheet value changes done.
        if (!isValidate && this.checkIsNameExist(definedName.name, definedName.scope)) {
            isAdded = false;
        }
        else {
            this.calculateInstance.addNamedRange(name, refersTo[0] === '=' ? refersTo.substr(1) : refersTo);
            if (refersTo[0] !== '=') {
                definedName.refersTo = '=' + visibleRefersTo;
            }
            if (this.parent.definedNames.indexOf(definedName) < 0) {
                this.parent.definedNames.splice(index, 0, definedName);
                this.parent.notify(formulaBarOperation, { action: 'setNameBoxValue', definedName: definedName });
            }
        }
        var eventArgs = { name: definedName.name, scope: definedName.scope, comment: definedName.comment,
            refersTo: definedName.refersTo, cancel: false };
        if (!isEventTrigger) {
            this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'addDefinedName' });
        }
        return isAdded;
    };
    /**
     * @hidden
     * Used to remove defined name from workbook.
     *
     * @param {string} name - Specifies the defined name.
     * @param {string} scope - Specifies the scope of the define name.
     * @param {boolean} isEventTrigger - Specify the boolean value.
     * @returns {boolean} - To Return the bool value.
     */
    WorkbookFormula.prototype.removeDefinedName = function (name, scope, isEventTrigger) {
        var isRemoved = false;
        var scopeVal = !scope ? 'Workbook' : scope;
        var index = this.getIndexFromNameColl(name, scopeVal);
        if (index > -1) {
            var calcName = name;
            if (scope) {
                var sheetIdx = getSheetIndex(this.parent, scope);
                if (sheetIdx > -1) {
                    calcName = getSheetName(this.parent, sheetIdx) + '!' + name;
                }
            }
            this.calculateInstance.removeNamedRange(calcName);
            var removedName = this.parent.definedNames.splice(index, 1);
            this.parent.notify(formulaBarOperation, { action: 'setNameBoxValue', definedName: removedName[0], isRemove: true });
            if (!isEventTrigger) {
                var eventArgs = { name: name, scope: scopeVal, cancel: false };
                this.parent.notify('actionComplete', { eventArgs: eventArgs, action: 'removeDefinedName' });
            }
            isRemoved = true;
        }
        return isRemoved;
    };
    WorkbookFormula.prototype.checkIsNameExist = function (name, sheetName) {
        var isExist = this.parent.definedNames.some(function (key) {
            return key.name === name && (sheetName ? key.scope === sheetName : key.scope === '');
        });
        return isExist;
    };
    WorkbookFormula.prototype.getIndexFromNameColl = function (definedName, scope) {
        if (scope === void 0) { scope = ''; }
        var index = -1;
        this.parent.definedNames.filter(function (name, idx) {
            if (name.name === definedName && name.scope === scope) {
                index = idx;
            }
        });
        return index;
    };
    WorkbookFormula.prototype.calculateNow = function (args) {
        var _this = this;
        var deferred = new Deferred();
        args.promise = deferred.promise;
        var dependentCells;
        var initCalculate = function () {
            var family;
            var token;
            var sheetId;
            var cellRef;
            var options = { isRefreshing: true, action: 'calculate' };
            var formulaInfo = _this.calculateInstance.getFormulaInfoTable();
            args.sheets.forEach(function (sheet) {
                sheetId = sheet.id.toString();
                family = _this.calculateInstance.getSheetFamilyItem(sheetId);
                token = family.isSheetMember ? family.parentObjectToToken.get(sheetId) : '';
                _this.parent.setSheetPropertyOnMute(sheet, 'isSheetCalculated', true);
                options.sheet = sheet;
                sheet.rows.forEach(function (row, rowIdx) {
                    options.rowIndex = rowIdx;
                    if (row && row.cells) {
                        row.cells.forEach(function (cell, colIdx) {
                            if (cell && checkIsFormula(cell.formula)) {
                                cellRef = token + getColumnHeaderText(colIdx + 1) + (rowIdx + 1);
                                if (cell.value === undefined || cell.value === null || !formulaInfo.has(cellRef) || (dependentCells &&
                                    dependentCells[cellRef])) {
                                    options.colIndex = colIdx;
                                    options.value = cell.formula;
                                    _this.calculateFormula(options, cellRef);
                                }
                            }
                        });
                    }
                });
            });
            deferred.resolve();
            _this.calculateInstance.cell = '';
        };
        var totalLoadCount = args.sheets.length;
        var loadCompleteHandler = function () {
            totalLoadCount--;
            if (!totalLoadCount) {
                initCalculate();
                if (_this.parent.calculationMode === 'Automatic' && args.scope === 'CalculateWorkbook') {
                    _this.parent.setProperties({ calculationMode: 'Manual' }, true);
                }
                var sheet = _this.parent.getActiveSheet();
                if (sheet.conditionalFormats && sheet.conditionalFormats.length) {
                    _this.parent.notify(applyCF, { indexes: [], isAction: true, refreshAll: true, isEdit: true });
                }
            }
        };
        var getDependentCellsCheckFn = function (sheet) {
            var sheetId = sheet.id.toString();
            var family = _this.calculateInstance.getSheetFamilyItem(sheetId);
            var token = family.isSheetMember ? family.parentObjectToToken.get(sheetId) : '';
            dependentCells = {};
            var dependentCellsInfo = _this.calculateInstance.getDependentCells();
            return function (rowIdx, colIdx) {
                var cellAddr = token + getCellAddress(rowIdx, colIdx);
                if (dependentCellsInfo.has(cellAddr)) {
                    dependentCellsInfo.get(cellAddr).forEach(function (cellRef) {
                        if (!dependentCells[cellRef]) {
                            dependentCells[cellRef] = true;
                        }
                    });
                }
            };
        };
        args.sheets.forEach(function (sheet) {
            if (sheet.ranges.some(function (range) { return range.dataSource && (!range.info || !range.info.loadedRange ||
                !range.info.loadedRange.length); })) {
                _this.parent.notify(updateSheetFromDataSource, { sheet: sheet, autoDetectFormat: true, loadFromStartCell: true,
                    updateDependentCellsCallback: getDependentCellsCheckFn(sheet), loadComplete: loadCompleteHandler });
            }
            else {
                loadCompleteHandler();
            }
        });
    };
    WorkbookFormula.prototype.toFixed = function (value) {
        var num = Number(value);
        if (Math.round(num) !== num) {
            value = num.toFixed(2);
        }
        return value;
    };
    WorkbookFormula.prototype.commputeFormulaValue = function (args) {
        var parsedSheetValue = this.parseSheetRef(args.value);
        args.value = this.calculateInstance.computeExpression(parsedSheetValue).toString();
    };
    WorkbookFormula.prototype.getCellRefValue = function (args) {
        var sheetId;
        var sheetInfo = this.getSheetInfo();
        var sheetCount = sheetInfo.length;
        var token = this.calculateInstance.sheetToken;
        var value = args.value;
        var tokenIndex = value.lastIndexOf(token);
        if (tokenIndex !== -1) {
            var sheetName = value.substring(0, tokenIndex);
            if (sheetName.length > 0 && sheetName[0] === this.calculateInstance.getFormulaCharacter()) {
                sheetName = sheetName.substring(1, args.value.length); // To get the sheetname without '=' symbol
            }
            for (var i = 0; i < sheetCount; i++) {
                if (sheetName.toUpperCase() === sheetInfo[i].visibleName.toUpperCase()) {
                    sheetId = i;
                    break;
                }
            }
            args.value = this.calculateInstance.getValueFromArg(token + sheetId + token + value.substring(tokenIndex + 1).toUpperCase());
        }
        else if (value.length > 0 && value[0] === this.calculateInstance.getFormulaCharacter()) {
            args.value = this.calculateInstance.getValueFromArg(value.substring(1, args.value.length).toUpperCase());
        }
    };
    WorkbookFormula.prototype.aggregateComputation = function (args) {
        var sheet = this.parent.getActiveSheet();
        var range = getSingleSelectedRange(sheet);
        var indexes = getRangeIndexes(range.split(':')[1]);
        if (indexes[0] + 1 === sheet.rowCount && indexes[1] + 1 === sheet.colCount) {
            range = "A1:" + getCellAddress(sheet.usedRange.rowIndex, sheet.usedRange.colIndex);
        }
        var calcValue;
        var i;
        var cellCol = this.calculateInstance.getCellCollection(range);
        for (i = 0; i < cellCol.length; i++) {
            calcValue = this.calculateInstance.getValueFromArg(cellCol[i]);
            if (isNumber(calcValue)) {
                args.countOnly = false;
                break;
            }
        }
        args.Count = this.calculateInstance.getFunction('COUNTA')(range, 'isAggregate');
        if (!args.Count || args.countOnly) {
            return;
        }
        var formulaVal = ['SUM', 'AVERAGE', 'MIN', 'MAX'];
        var formatedValues = [];
        var index = getRangeIndexes(sheet.activeCell);
        var cell = getCell(index[0], index[1], sheet, false, true);
        for (i = 0; i < 4; i++) {
            calcValue = this.toFixed(this.calculateInstance.getFunction(formulaVal[i])(range, 'isAggregate'));
            if (cell.format) {
                var eventArgs = { formattedText: calcValue, value: calcValue, format: cell.format,
                    cell: { value: calcValue, format: cell.format } };
                this.parent.notify(getFormattedCellObject, eventArgs);
                calcValue = eventArgs.formattedText;
            }
            formatedValues.push(calcValue);
        }
        args.Sum = formatedValues[0];
        args.Avg = formatedValues[1];
        args.Min = formatedValues[2];
        args.Max = formatedValues[3];
    };
    WorkbookFormula.prototype.refreshInsertDelete = function (args) {
        var _this = this;
        if (args.modelType === 'Sheet') {
            return;
        }
        var formulaDependentCells = this.calculateInstance.getDependentFormulaCells();
        var cell;
        var sheetIndex = getSheetIndexFromId(this.parent, args.sheet.id);
        this.parent.sheets.forEach(function (sheet, index) {
            for (var i = 0, rowLen = sheet.usedRange.rowIndex; i <= rowLen; i++) {
                for (var j = 0, colLen = sheet.usedRange.colIndex; j <= colLen; j++) {
                    cell = getCell(i, j, sheet, false, true);
                    if (cell.formula && checkIsFormula(cell.formula)) {
                        if (index === sheetIndex) {
                            if (args.isInsert || !(args.modelType === 'Row' ? i >= args.startIndex && i <= args.endIndex :
                                j >= args.startIndex && j <= args.endIndex)) {
                                _this.updateFormula(args, cell, i, j, sheetIndex);
                            }
                        }
                        else if (cell.formula.includes(args.sheet.name)) {
                            _this.updateFormula(args, cell, i, j, sheetIndex, true, sheet);
                        }
                    }
                }
            }
        });
        formulaDependentCells.clear();
        this.calculateInstance.getDependentCells().clear();
        this.calculateInstance.getFormulaInfoTable().clear();
        this.refreshNamedRange(args);
    };
    WorkbookFormula.prototype.getUpdatedFormulaOnInsertDelete = function (args) {
        if (args.sheetNames) {
            if (!args.updateSheetRef) {
                args.updateSheetRef = this.getSheetRefUpdateOnDelete();
            }
            var previousFormula = this.parseSheetRef(args.cell.formula, false);
            var formula_1 = previousFormula;
            args.sheetNames.forEach(function (sheetName) {
                formula_1 = args.updateSheetRef(sheetName, formula_1).value;
            });
            if (formula_1 !== previousFormula) {
                args.cell.formula = formula_1;
            }
        }
        else {
            this.updateFormula(args.insertDeleteArgs, args.cell, args.row, args.col, args.sheetIdx, args.otherSheet, args.formulaSheet);
        }
    };
    WorkbookFormula.prototype.updateFormula = function (args, cell, row, col, sheetIdx, otherSheet, formulaSheet) {
        var ref;
        var pVal;
        var index;
        var updated;
        var isRangeFormula;
        var containAlphabetAndDigit = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)/g);
        var isValidCellReference;
        var isFullColumn;
        if (cell.formula && cell.formula.includes('UNIQUE') && row !== undefined) {
            this.clearUniqueRange(row, col, formulaSheet || args.sheet);
        }
        var getAddress = function () {
            var range = (isAbsoluteRef ? '$' : '') + getColumnHeaderText(index[1] + 1) + (isAbsoluteRef ? '$' : '') + (index[0] + 1);
            if (index[0] !== index[2] || index[1] !== index[3]) {
                range += ':' + (isAbsoluteRef ? '$' : '') + getColumnHeaderText(index[3] + 1) + (isAbsoluteRef ? '$' : '') + (index[2] + 1);
            }
            return range;
        };
        var formulaArr = this.parseFormulaArgument({ formula: this.parseSheetRef(cell.formula, true), rangeRef: true });
        var sheetInfo = this.getSheetInfo();
        var sheetName;
        var refChanged;
        var isAbsoluteRef;
        var isSingleRangeRef = !cell.formula.includes(this.parent.listSeparator);
        for (var i = 0; i < formulaArr.length; i++) {
            ref = formulaArr[i].trim();
            isAbsoluteRef = ref.includes('$');
            if (isAbsoluteRef) {
                ref = ref.replace(/[$]/g, '');
            }
            isValidCellReference = true;
            if (this.calculateInstance.isCellReference(ref)) {
                isRangeFormula = ref.includes(':');
                pVal = i && formulaArr[i - 1].trim();
                if (pVal && pVal[pVal.length - 1] === '!') {
                    pVal = pVal.replace(/['!]/g, '');
                    sheetName = sheetInfo[sheetIdx].sheet === sheetInfo[sheetIdx].visibleName ? args.sheet.name :
                        '`' + sheetInfo[sheetIdx].sheet + '`';
                    if (pVal !== sheetName) {
                        continue;
                    }
                }
                else if (otherSheet) {
                    continue;
                }
                if (!containAlphabetAndDigit.test(ref) && ref.indexOf(':') > -1) {
                    isValidCellReference = false;
                    isFullColumn = isNullOrUndefined(ref.match(/[0-9]/)) ? true : false;
                }
                index = getSwapRange(getRangeIndexes(ref));
                updated = this.parent.updateRangeOnInsertDelete(args, index, isRangeFormula, row, col, isAbsoluteRef, isSingleRangeRef);
                if (updated) {
                    formulaArr[i] = index[2] < index[0] || index[3] < index[1] ?
                        this.calculateInstance.getErrorStrings()[CommonErrors.Ref] : !isValidCellReference ?
                        (isFullColumn ? getRangeAddress(index).replace(/\d/g, '') : getRangeAddress(index).replace(/[a-zA-Z]/g, '')) : getAddress();
                    refChanged = true;
                }
            }
        }
        var newFormula = '=' + formulaArr.join('');
        if (refChanged) {
            var regx_1;
            var regExp_1 = RegExp;
            sheetInfo.forEach(function (info) {
                if (newFormula.includes('`' + info.sheet + '`')) {
                    regx_1 = new regExp_1('`' + info.sheet + '`', 'gi');
                    newFormula = newFormula.replace(regx_1, info.visibleName);
                }
            });
            if (cell.formula !== newFormula) {
                cell.formula = newFormula;
                if (!(this.parent.calculationMode === 'Manual' && (args.isInsert || args.isDelete))) {
                    cell.value = null;
                }
            }
        }
    };
    WorkbookFormula.prototype.clearUniqueRange = function (row, col, sheet) {
        var uniqueArgs = { cellIdx: [row, col, row, col], isUnique: false, uniqueRange: '', sheetName: sheet.name };
        this.parent.notify(checkUniqueRange, uniqueArgs);
        var range = getRangeIndexes(uniqueArgs.uniqueRange);
        for (var i = range[0]; i <= range[2]; i++) {
            for (var j = range[1]; j <= range[3]; j++) {
                delete getCell(i, j, sheet, false, true).value;
            }
        }
    };
    WorkbookFormula.prototype.clearAllUniqueFormulaValue = function () {
        var ranges = this.calculateInstance.uniqueRange;
        var cell;
        var sheet;
        var range;
        for (var i = 0; i < ranges.length; i++) {
            var lastIndex = ranges[i].lastIndexOf('!');
            sheet = getSheet(this.parent, getSheetIndex(this.parent, ranges[i].substring(0, lastIndex)));
            range = getRangeIndexes(ranges[i].substring(lastIndex + 1));
            cell = getCell(range[0], range[1], sheet);
            if (cell && cell.value === '#SPILL!') {
                continue;
            }
            for (var j = range[0]; j <= range[2]; j++) {
                for (var k = range[1]; k <= range[3]; k++) {
                    cell = getCell(j, k, sheet);
                    if (cell && cell.value) {
                        delete cell.value;
                    }
                }
            }
        }
    };
    WorkbookFormula.prototype.parseFormulaArgument = function (args) {
        var temp;
        var str;
        var i = 0;
        var arr = [];
        var formulaVal = this.markSpecialChar(args.formula.replace('=', ''), args.rangeRef);
        var regExp = RegExp;
        var validCharRegx = new regExp(args.rangeRef ? /\(|\)|=|\^|>|<|\+|-|\*|\/|%|&/g : /\(|\)|=|\^|>|<|:|\+|-|\*|\/|%|&/g);
        var sepRegx = new regExp(this.parent.listSeparator, 'g');
        formulaVal = formulaVal.split(new regExp(validCharRegx.source + '|' + sepRegx.source, 'g'));
        var len = formulaVal.length;
        while (i < len) {
            temp = formulaVal[i];
            if (!temp) {
                i++;
                continue;
            }
            if (temp.length === 1) {
                arr.push(this.isUniqueChar(temp) ? this.getUniqueCharVal(temp) : temp);
            }
            else {
                str = temp[0];
                if (temp.indexOf('!') > 0) {
                    if (this.isUniqueChar(str)) {
                        arr.push(this.getUniqueCharVal(str));
                        temp = temp.substr(1);
                    }
                    str = temp.indexOf('!') + 1;
                    arr.push(temp.substring(0, str));
                    temp = temp.substring(str);
                    str = temp.indexOf(':');
                    if (str > -1 && temp.indexOf('!') > str) {
                        arr.push(temp.substring(0, str));
                        arr.push(':');
                        temp = temp.substring(str + 1);
                        str = temp.indexOf('!') + 1;
                        arr.push(temp.substring(0, str));
                        arr.push(temp.substring(str));
                    }
                    else {
                        arr.push(temp);
                    }
                }
                else if (this.isUniqueChar(str)) {
                    arr.push(this.getUniqueCharVal(str));
                    arr.push(temp.substr(1));
                }
                else {
                    arr.push(temp);
                }
            }
            i++;
        }
        args.formulaArr = arr;
        return arr;
    };
    WorkbookFormula.prototype.getUniqueCharVal = function (formula) {
        switch (formula) {
            case this.uniqueOBracket:
                return '(';
            case this.uniqueCBracket:
                return ')';
            case this.uniqueCSeparator:
                return this.parent.listSeparator;
            case this.uniqueCOperator:
                return ':';
            case this.uniquePOperator:
                return '+';
            case this.uniqueSOperator:
                return '-';
            case this.uniqueMOperator:
                return '*';
            case this.uniqueDOperator:
                return '/';
            case this.uniqueModOperator:
                return '%';
            case this.uniqueConcateOperator:
                return '&';
            case this.uniqueEqualOperator:
                return '=';
            case this.uniqueExpOperator:
                return '^';
            case this.uniqueGTOperator:
                return '>';
            case this.uniqueLTOperator:
                return '<';
        }
        return '';
    };
    WorkbookFormula.prototype.isUniqueChar = function (formula) {
        var code = formula.charCodeAt(formula);
        return code >= 129 && code <= 142;
    };
    WorkbookFormula.prototype.markSpecialChar = function (formula, rangeRef) {
        formula = formula.replace(/\(/g, '(' + this.uniqueOBracket).replace(/\)/g, ')' + this.uniqueCBracket);
        var regEx = RegExp;
        if (rangeRef) {
            formula = formula.replace(new regEx(this.parent.listSeparator, 'g'), this.parent.listSeparator + this.uniqueCSeparator);
        }
        else {
            formula = formula.replace(new regEx(this.parent.listSeparator, 'g'), this.parent.listSeparator + this.uniqueCSeparator).replace(/:/g, ":" + this.uniqueCOperator);
        }
        formula = formula.replace(/\+/g, '+' + this.uniquePOperator).replace(/-/g, '-' + this.uniqueSOperator);
        formula = formula.replace(/\*/g, '*' + this.uniqueMOperator).replace(/\//g, '/' + this.uniqueDOperator);
        formula = formula.replace(/&/g, '&' + this.uniqueConcateOperator);
        formula = formula.replace(/=/g, '=' + this.uniqueEqualOperator);
        formula = formula.replace(/\^/g, '^' + this.uniqueExpOperator);
        formula = formula.replace(/>/g, '>' + this.uniqueGTOperator).replace(/</g, '<' + this.uniqueLTOperator);
        return formula.replace(/%/g, '%' + this.uniqueModOperator);
    };
    WorkbookFormula.prototype.refreshNamedRange = function (args) {
        var _this = this;
        if (args.definedNames && args.definedNames.length) {
            args.definedNames.forEach(function (definedName) {
                _this.parent.removeDefinedName(definedName.name, definedName.scope);
                _this.parent.addDefinedName(definedName);
            });
            return;
        }
        var len = this.parent.definedNames.length;
        if (!len) {
            return;
        }
        var definedNames = Object.assign({}, this.parent.definedNames);
        var range;
        var sheetName;
        var refAddress;
        var definedName;
        var updated;
        var checkSheetName;
        var rangeAddress;
        var containAlphabetAndDigit = new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)/g);
        var isValidCellReference;
        var isFullColumn;
        for (var i = 0; i < len; i++) {
            isValidCellReference = true;
            definedName = definedNames[i];
            var lastIndex = definedName.refersTo.lastIndexOf('!');
            refAddress = definedName.refersTo.substring(lastIndex + 1);
            sheetName = definedName.refersTo.substring(1, lastIndex);
            checkSheetName = sheetName;
            if (checkSheetName.match(/'/g)) {
                checkSheetName = checkSheetName.slice(1, -1);
            }
            if (checkSheetName !== args.sheet.name) {
                continue;
            }
            if (!containAlphabetAndDigit.test(refAddress) && refAddress.indexOf(':') > -1) {
                isValidCellReference = false;
                isFullColumn = isNullOrUndefined(refAddress.match(/[0-9]/)) ? true : false;
            }
            range = getRangeIndexes(refAddress);
            updated = this.parent.updateRangeOnInsertDelete(args, range);
            if (!isValidCellReference) {
                rangeAddress = isFullColumn ? getRangeAddress(range).replace(/\d/g, '') : getRangeAddress(range).replace(/[a-zA-Z]/g, '');
            }
            else {
                rangeAddress = getRangeAddress(range);
            }
            if (args.isInsert) {
                this.updateDefinedNames(definedName, sheetName, rangeAddress, updated);
            }
            else {
                if (args.modelType === 'Row') {
                    this.updateDefinedNames(definedName, sheetName, rangeAddress, updated, [range[0], range[2]], args);
                }
                else if (args.modelType === 'Column') {
                    this.updateDefinedNames(definedName, sheetName, rangeAddress, updated, [range[1], range[3]], args);
                }
            }
        }
    };
    WorkbookFormula.prototype.updateDefinedNames = function (definedName, sheetName, rangeAddress, changed, idx, args) {
        if (!changed) {
            return;
        }
        var index = this.parent.definedNames.indexOf(definedName);
        var eventArgs = {
            action: 'removeDefinedName',
            isRemoved: false,
            definedName: definedName.name,
            scope: definedName.scope,
            isEventTrigger: true
        };
        this.parent.notify(workbookFormulaOperation, eventArgs);
        if (idx) {
            var oldDefinedName = { name: definedName.name, comment: definedName.comment, refersTo: definedName.refersTo,
                scope: definedName.scope };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            oldDefinedName = new DefineName(this.parent, 'definedNames', oldDefinedName, true);
            if (args.definedNames) {
                args.definedNames.push(oldDefinedName);
            }
            else {
                args.definedNames = [oldDefinedName];
            }
            if (idx[1] < idx[0]) {
                return;
            }
        }
        definedName.refersTo = sheetName + '!' + rangeAddress;
        this.parent.notify(workbookFormulaOperation, { action: 'addDefinedName', definedName: definedName, isAdded: false, index: index, isEventTrigger: true });
        var refreshArgs = { name: definedName.name, scope: definedName.scope, comment: definedName.comment,
            refersTo: definedName.refersTo, cancel: false };
        this.parent.notify('actionComplete', { eventArgs: refreshArgs, action: 'refreshNamedRange' });
    };
    return WorkbookFormula;
}());
export { WorkbookFormula };
