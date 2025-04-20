var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable @typescript-eslint/no-explicit-any */
import { getValue, Event, NotifyPropertyChanges, Base, isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';
import { BasicFormulas } from './../formulas/index';
import { CommonErrors, FormulasErrorsStrings } from '../common/enum';
import { Parser } from './parser';
import { getRangeIndexes, getCellIndexes, getCellAddress, isDateTime, workbookFormulaOperation, isHiddenRow, isHiddenCol } from '../../workbook/index';
import { getSheetIndexByName } from '../../workbook/index';
import { DataUtil } from '@syncfusion/ej2-data';
/**
 * Represents the calculate library.
 */
var Calculate = /** @class */ (function (_super) {
    __extends(Calculate, _super);
    /**
     * Base constructor for creating Calculate library.
     *
     * @param {Object} parent - specify the parent
     */
    function Calculate(parent) {
        var _this = _super.call(this, null, null) || this;
        _this.lFormulas = new Map();
        /** @hidden */
        _this.storedData = new Map();
        _this.keyToRowsMap = new Map();
        _this.rowsToKeyMap = new Map();
        /** @hidden */
        _this.rightBracket = String.fromCharCode(161);
        /** @hidden */
        _this.leftBracket = String.fromCharCode(162);
        /** @hidden */
        _this.sheetToken = '!';
        _this.emptyString = '';
        _this.leftBrace = '{';
        _this.rightBrace = '}';
        _this.cell = _this.emptyString;
        _this.cellPrefix = '!0!A';
        _this.treatEmptyStringAsZero = false;
        /** @hidden */
        _this.tic = '"';
        /** @hidden */
        _this.singleTic = '\'';
        /** @hidden */
        _this.trueValue = 'TRUE';
        /** @hidden */
        _this.falseValue = 'FALSE';
        _this.parseDecimalSeparator = '.';
        /** @hidden */
        _this.arithMarker = String.fromCharCode(180);
        /** @hidden */
        _this.arithMarker2 = _this.arithMarker + _this.arithMarker;
        _this.dependentCells = null;
        _this.dependentFormulaCells = null;
        _this.minValue = Number.MIN_SAFE_INTEGER;
        _this.maxValue = Number.MAX_SAFE_INTEGER;
        _this.categoryCollection = ['All'];
        _this.dependencyLevel = 0;
        /** @hidden */
        _this.randomValues = new Map();
        /** @hidden */
        _this.isRandomVal = false;
        /** @hidden */
        _this.randCollection = [];
        /** @hidden */
        _this.dependencyCollection = [];
        /** @hidden */
        _this.uniqueRange = [];
        /**
         * @hidden
         */
        _this.formulaErrorStrings = [
            'binary operators cannot start an expression',
            'cannot parse',
            'bad library',
            'invalid char in front of',
            'number contains 2 decimal points',
            'expression cannot end with an operator',
            'invalid characters following an operator',
            'invalid character in number',
            'mismatched parentheses',
            'unknown formula name',
            'requires a single argument',
            'requires 3 arguments',
            'invalid Math argument',
            'requires 2 arguments',
            '#NAME?',
            'too complex',
            '#CIRCULARREF!',
            'missing formula',
            'improper formula',
            'invalid expression',
            'cell empty',
            'bad formula',
            'empty expression',
            '',
            'mismatched string quotes',
            'wrong number of arguments',
            'invalid arguments',
            'iterations do not converge',
            'Control is already registered',
            'Calculation overflow',
            'Missing sheet',
            'cannot_parse',
            'expression_cannot_end_with_an_operator',
            '#SPILL!',
            '#DIV/0!'
        ];
        _this.errorStrings = null;
        _this.parseArgumentSeparator = ',';
        _this.dateTime1900 = new Date(1900, 0, 1, 0, 0, 0);
        _this.isParseDecimalSeparatorChanged = false;
        _this.isArgumentSeparatorChanged = false;
        _this.sheetFamilyID = 0;
        _this.defaultFamilyItem = null;
        _this.sheetFamiliesList = null;
        _this.modelToSheetID = null;
        /** @hidden */
        _this.tokenCount = 0;
        _this.sortedSheetNames = null;
        _this.tempSheetPlaceHolder = String.fromCharCode(133);
        /** @hidden */
        _this.namedRanges = new Map();
        _this.formulaInfoTable = null;
        _this.millisecondsOfaDay = 24 * 60 * 60 * 1000;
        _this.parseDateTimeSeparator = '/';
        new BasicFormulas(_this);
        _this.parentObject = isNullOrUndefined(parent) ? _this : parent;
        _this.grid = _this.parentObject;
        _this.parser = new Parser(_this);
        return _this;
    }
    Object.defineProperty(Calculate.prototype, "libraryFormulas", {
        get: function () {
            return this.lFormulas;
        },
        set: function (formulaColl) {
            this.lFormulas.set(formulaColl.fName, { handler: formulaColl.handler, category: formulaColl.category, description: formulaColl.description });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * To get the argument separator to split the formula arguments.
     *
     * @returns {string} - To get the argument separator to split the formula arguments.
     */
    Calculate.prototype.getParseArgumentSeparator = function () {
        var seperator = ',';
        if (!this.isArgumentSeparatorChanged && seperator !== this.parseArgumentSeparator) {
            this.parseArgumentSeparator = seperator;
        }
        return this.parseArgumentSeparator;
    };
    /**
     * To set the argument separator to split the formula arguments.
     *
     * @param {string} value - Argument separator based on the culture.
     * @returns {void} - To set the argument separator to split the formula arguments.
     */
    Calculate.prototype.setParseArgumentSeparator = function (value) {
        this.parseArgumentSeparator = value;
        this.isArgumentSeparatorChanged = true;
    };
    /**
     * To get the date separator to split the date value.
     *
     * @returns {string} - To get the date separator to split the date value.
     */
    Calculate.prototype.getParseDateTimeSeparator = function () {
        return this.parseDateTimeSeparator;
    };
    /**
     * To set whether the empty string is treated as zero or not.
     *
     * @param {boolean} value - specify the boolean.
     * @returns {void} - To set whether the empty string is treated as zero or not.
     */
    Calculate.prototype.setTreatEmptyStringAsZero = function (value) {
        this.treatEmptyStringAsZero = value;
    };
    /**
     * To get whether the empty string is treated as zero or not.
     *
     * @returns {boolean} - To get whether the empty string is treated as zero or not.
     */
    Calculate.prototype.getTreatEmptyStringAsZero = function () {
        return this.treatEmptyStringAsZero;
    };
    /**
     * To set the date separator to split the date value.
     *
     * @param {string} value - Argument separator based on the culture.
     * @returns {void} - To set the date separator to split the date value.
     */
    Calculate.prototype.setParseDateTimeSeparator = function (value) {
        this.parseDateTimeSeparator = value;
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Calculate.prototype.onPropertyChanged = function (newProp, oldProp) {
        /** code snippets */
    };
    Calculate.prototype.getModuleName = function () {
        return 'calculate';
    };
    /**
     * @hidden
     * @returns {string} - get Formula Character.
     */
    Calculate.prototype.getFormulaCharacter = function () {
        return '=';
    };
    /**
     * @hidden
     * @param {string} text - specify the text
     * @returns {boolean} - Returns boolean value.
     */
    Calculate.prototype.isUpperChar = function (text) {
        var charCode = text.charCodeAt(0);
        return charCode > 64 && charCode < 91;
    };
    Calculate.prototype.resetKeys = function () {
        this.storedData.clear();
        this.keyToRowsMap.clear();
        this.rowsToKeyMap.clear();
    };
    /**
     * @hidden
     * @param {string} cellRef -  specify the cell reference
     * @returns {void} - update Dependent Cell
     */
    Calculate.prototype.updateDependentCell = function (cellRef) {
        var _this = this;
        var formulaCell = this.cell;
        if (formulaCell !== this.emptyString) {
            var family = this.getSheetFamilyItem(this.grid);
            if (family.sheetNameToParentObject) {
                if (!formulaCell.includes(this.sheetToken)) {
                    formulaCell = family.parentObjectToToken.get(this.grid) + formulaCell;
                }
                if (!cellRef.includes(this.sheetToken)) {
                    cellRef = family.parentObjectToToken.get(this.grid) + cellRef;
                }
            }
            if (formulaCell !== cellRef) {
                var dependentCellMap = this.getDependentCells();
                if (!dependentCellMap.has(cellRef)) {
                    dependentCellMap.set(cellRef, []);
                }
                var dependentCells = dependentCellMap.get(cellRef);
                if (dependentCells.indexOf(formulaCell) === -1) {
                    var formulaDependentCellMap_1 = this.getDependentFormulaCells();
                    var cellRefObj_1 = {};
                    var checkCircularReference_1 = function (refCell) {
                        if (formulaDependentCellMap_1.has(refCell)) {
                            var formalaRefCells = formulaDependentCellMap_1.get(refCell);
                            if (formalaRefCells.has(formulaCell)) {
                                throw _this.formulaErrorStrings[FormulasErrorsStrings.CircularReference];
                            }
                            else if (!cellRefObj_1[refCell]) {
                                cellRefObj_1[refCell] = true;
                                formalaRefCells.forEach(function (refCell) {
                                    checkCircularReference_1(refCell);
                                });
                            }
                        }
                    };
                    checkCircularReference_1(cellRef);
                    dependentCells.push(formulaCell);
                    if (!formulaDependentCellMap_1.has(formulaCell)) {
                        formulaDependentCellMap_1.set(formulaCell, new Map());
                        formulaDependentCellMap_1.get(formulaCell).set(cellRef, cellRef);
                    }
                    else if (!formulaDependentCellMap_1.get(formulaCell).has(cellRef)) {
                        formulaDependentCellMap_1.get(formulaCell).set(cellRef, cellRef);
                    }
                }
            }
        }
    };
    /**
     * @hidden
     * @returns {Map<string, string[]>} - get Dependent Cells
     */
    Calculate.prototype.getDependentCells = function () {
        if (this.dependentCells == null) {
            this.dependentCells = new Map();
        }
        return this.dependentCells;
    };
    /**
     * @hidden
     * @returns {Map<string, Map<string, string>>} - get Dependent Formula Cells
     */
    Calculate.prototype.getDependentFormulaCells = function () {
        if (this.isSheetMember()) {
            var family = this.getSheetFamilyItem(this.grid);
            if (family.sheetDependentFormulaCells == null) {
                family.sheetDependentFormulaCells = new Map();
            }
            return family.sheetDependentFormulaCells;
        }
        else {
            if (this.dependentFormulaCells == null) {
                this.dependentFormulaCells = new Map();
            }
            return this.dependentFormulaCells;
        }
    };
    /**
     * To get library formulas collection.
     *
     * @returns {Map<string, Function>} - To get library formulas collection.
     */
    Calculate.prototype.getLibraryFormulas = function () {
        return this.lFormulas;
    };
    /**
     * To get library function.
     *
     * @param {string} libFormula - Library formula to get a corresponding function.
     * @returns {Function} - To get library function.
     */
    Calculate.prototype.getFunction = function (libFormula) {
        if (this.getLibraryFormulas().has(libFormula.toUpperCase())) {
            return this.getLibraryFormulas().get(libFormula.toUpperCase()).handler;
        }
        else {
            return null;
        }
    };
    /**
     * @hidden
     * @param {string} val - specify the value.
     * @returns {Date} - convert integer to date.
     */
    Calculate.prototype.intToDate = function (val) {
        var dateVal = Number(val);
        dateVal = (dateVal > 0 && dateVal < 1) ? (1 + dateVal) : (dateVal === 0) ? 1 : dateVal;
        if (dateVal > 60) {
            dateVal -= 1; // Due to leap year issue of 1900 in MSExcel.
        }
        var startDate = new Date('01/01/1900');
        var startDateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
        return new Date(new Date(((dateVal - 1) * (1000 * 3600 * 24)) + startDateUTC).toUTCString().replace(' GMT', ''));
    };
    Calculate.prototype.getFormulaInfoTable = function () {
        if (this.isSheetMember()) {
            var family = this.getSheetFamilyItem(this.grid);
            if (family.sheetFormulaInfotable === null) {
                family.sheetFormulaInfotable = new Map();
            }
            return family.sheetFormulaInfotable;
        }
        else {
            if (this.formulaInfoTable === null) {
                this.formulaInfoTable = new Map();
            }
            return this.formulaInfoTable;
        }
    };
    /**
     * To get the formula text.
     *
     * @returns {void} - To get the formula text.
     */
    Calculate.prototype.getParseDecimalSeparator = function () {
        var seperator = '.';
        if (!this.isParseDecimalSeparatorChanged && seperator !== this.parseDecimalSeparator) {
            this.parseDecimalSeparator = seperator;
        }
        return this.parseDecimalSeparator;
    };
    /**
     * To get the formula text.
     *
     * @param {string} value - Specifies the decimal separator value.
     * @returns {void} - To get the formula text.
     */
    Calculate.prototype.setParseDecimalSeparator = function (value) {
        this.parseDecimalSeparator = value;
        this.isParseDecimalSeparatorChanged = true;
    };
    /**
     * @hidden
     * @param {string} cellRef -  specify the cell reference
     * @returns {string} - get sheet token.
     */
    Calculate.prototype.getSheetToken = function (cellRef) {
        var i = 0;
        var temp = this.emptyString;
        if (i < cellRef.length && cellRef[i] === this.sheetToken) {
            i++;
            while (i < cellRef.length && cellRef[i] !== this.sheetToken) {
                i++;
            }
            temp = cellRef.substring(0, i + 1);
        }
        if (i < cellRef.length) {
            return temp;
        }
        throw this.formulaErrorStrings[FormulasErrorsStrings.BadIndex];
    };
    /**
     * @hidden
     * @param {Object} grd - specify the id
     * @returns {number} - get sheet id.
     */
    Calculate.prototype.getSheetID = function (grd) {
        var family = this.getSheetFamilyItem(grd);
        if (family.sheetNameToParentObject != null && family.sheetNameToParentObject.size > 0) {
            var token = family.parentObjectToToken.get(grd);
            if (token) {
                token = token.split(this.sheetToken).join(this.emptyString);
                var id = this.parseFloat(token);
                if (!this.isNaN(id)) {
                    return id;
                }
            }
        }
        return -1;
    };
    /**
     * @hidden
     * @param {string | number} value - specify the value.
     * @returns {number} - parse float
     */
    Calculate.prototype.parseFloat = function (value) {
        var convertedNum = Number(value);
        if (isNaN(convertedNum) && typeof value === 'string' && value.includes(',')) {
            convertedNum = Number(value.split(',').join(''));
        }
        return convertedNum;
    };
    /**
     * To get the row index of the given cell.
     *
     * @param {string} cell - Cell address for getting row index.
     * @returns {number} - To get the row index of the given cell.
     */
    Calculate.prototype.rowIndex = function (cell) {
        var i = 0;
        var isLetter = false;
        if (i < cell.length && cell[i] === this.sheetToken) {
            i++;
            while (i < cell.length && cell[i] !== this.sheetToken) {
                i++;
            }
            i++;
        }
        while (i < cell.length && this.isChar(cell[i])) {
            isLetter = true;
            i++;
        }
        var result = parseInt(cell.substring(i), 10);
        if (i < cell.length && !this.isNaN(result)) {
            return result;
        }
        if (isLetter) {
            return -1;
        }
        throw this.formulaErrorStrings[FormulasErrorsStrings.BadIndex];
    };
    /**
     * To get the column index of the given cell.
     *
     * @param {string} cell - Cell address for getting column index.
     * @returns {number} - To get the column index of the given cell.
     */
    Calculate.prototype.colIndex = function (cell) {
        var j = 0;
        var k = 0;
        cell = cell.toUpperCase();
        if (j < cell.length && cell[j] === this.sheetToken) {
            j++;
            while (j < cell.length && cell[j] !== this.sheetToken) {
                j++;
            }
            j++;
        }
        while (j < cell.length && this.isChar(cell[j])) {
            var charCode = cell[j].charCodeAt(0);
            k = k * 26 + charCode - 64;
            j++;
        }
        if (k === 0) {
            return -1;
        }
        return k;
    };
    /**
     * To get the valid error strings.
     *
     * @hidden
     * @returns {string[]} - to get error strings.
     */
    Calculate.prototype.getErrorStrings = function () {
        if (this.errorStrings === null) {
            this.errorStrings = ['#N/A', '#VALUE!', '#REF!', '#DIV/0!', '#NUM!', '#NAME?', '#NULL!', '#CALC!'];
        }
        return this.errorStrings;
    };
    /**
     * @hidden
     * @param {string} text - specify the text
     * @param {number} startIndex - specify the start index
     * @param {number} length - specify the length
     * @returns {string} - Returns sub string
     */
    Calculate.prototype.substring = function (text, startIndex, length) {
        return text.substring(startIndex, length + startIndex);
    };
    /**
     * @hidden
     * @param {string} c - specify the characer of the string
     * @returns {boolean} - Return the boolean type
     */
    Calculate.prototype.isChar = function (c) {
        if ((c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 90) || (c.charCodeAt(0) >= 97 && c.charCodeAt(0) <= 122)) {
            return true;
        }
        return false;
    };
    /**
     * @hidden
     * @param {Object} model - specify the model
     * @param {Object} calcId - specify the calculate instance id.
     * @returns {CalcSheetFamilyItem} - get Sheet Family Item.
     */
    Calculate.prototype.getSheetFamilyItem = function (model, calcId) {
        if (this.sheetFamilyID === 0) {
            if (this.defaultFamilyItem == null) {
                this.defaultFamilyItem = new CalcSheetFamilyItem();
            }
            return this.defaultFamilyItem;
        }
        if (this.sheetFamiliesList == null) {
            this.sheetFamiliesList = new Map();
        }
        if (calcId === undefined) {
            calcId = this.modelToSheetID.get(model);
        }
        if (!this.sheetFamiliesList.has(calcId)) {
            this.sheetFamiliesList.set(calcId, new CalcSheetFamilyItem());
        }
        return this.sheetFamiliesList.get(calcId);
    };
    /**
     * Register a key value pair for formula.
     *
     * @param {string} key - Key for formula reference .
     * @param {string | number} value - Value for the corresponding key.
     * @returns {void} - Register a key value pair for formula.
     */
    Calculate.prototype.setKeyValue = function (key, value) {
        key = key.toUpperCase();
        var str = value.toString().trim();
        if (!this.storedData.get(key) || str.indexOf(this.leftBrace) === 0) {
            this.storedData.set(key, new FormulaInfo());
            this.keyToRowsMap.set(key, this.keyToRowsMap.size + 1);
            this.rowsToKeyMap.set(this.rowsToKeyMap.size + 1, key);
        }
        var fInfo = this.storedData.get(key);
        if (fInfo.getFormulaText() != null && fInfo.getFormulaText().length > 0 && fInfo.getFormulaText() !== str) {
            var s1 = this.cellPrefix + this.keyToRowsMap.get(key).toString();
            var formulaDependent = this.getDependentFormulaCells().get(s1);
            if (formulaDependent != null) {
                this.clearFormulaDependentCells(s1);
            }
        }
        if (str.length > 0 && str[0] === this.getFormulaCharacter()) {
            fInfo.setFormulaText(str);
        }
        else if (fInfo.getFormulaValue() !== str) {
            fInfo.setFormulaText('');
            fInfo.setParsedFormula('');
            fInfo.setFormulaValue(str);
        }
    };
    /**
     * @hidden
     * @param {string} cell - specify the cell
     * @returns {void} - clears the  Formula Dependent Cells.
     */
    Calculate.prototype.clearFormulaDependentCells = function (cell) {
        var _this = this;
        var dependentFormula = this.getDependentFormulaCells().get(cell);
        if (dependentFormula) {
            dependentFormula.forEach(function (value, key) {
                var s = key;
                var dependent = _this.getDependentCells().get(s);
                _this.arrayRemove(dependent, cell);
                if (dependent.length === 0) {
                    _this.getDependentCells().delete(s);
                }
            });
            this.getDependentFormulaCells().delete(cell);
        }
    };
    Calculate.prototype.arrayRemove = function (array, value) {
        var index = array.indexOf(value);
        if (index !== -1) {
            array.splice(index, 1);
        }
        return array;
    };
    /**
     * Register a key value pair for formula.
     *
     * @param {string} key - Key for getting the corresponding value.
     * @returns {string | number} - to get key value.
     */
    Calculate.prototype.getKeyValue = function (key) {
        key = key.toUpperCase();
        if (this.storedData.has(key) !== null) {
            var fInfo = this.storedData.get(key);
            var fText = fInfo.getFormulaText();
            if (fText.length > 0 && fText[0] === this.getFormulaCharacter()) {
                this.cell = this.cellPrefix + this.keyToRowsMap.get(key).toString();
                fText = fText.substring(1);
                try {
                    fInfo.setParsedFormula(this.parser.parseFormula(fText, key));
                }
                catch (ex) {
                    var args = {
                        message: ex.message, exception: ex, isForceCalculable: false,
                        computeForceCalculate: false
                    };
                    this.trigger('onFailure', args);
                    fInfo.setFormulaValue(args.message);
                    return this.storedData.get(key).getFormulaValue();
                }
                try {
                    fInfo.setFormulaValue(this.computeFormula(fInfo.getParsedFormula()));
                }
                catch (ex) {
                    var args = {
                        message: ex.message, exception: ex, isForceCalculable: false,
                        computeForceCalculate: false
                    };
                    this.trigger('onFailure', args);
                    var errorMessage = (typeof args.exception === 'string') ? args.exception : args.message;
                    return (isNullOrUndefined(this.getErrorLine(ex)) ? '' : '#' + this.getErrorLine(ex) + ': ') + errorMessage;
                }
            }
            return this.storedData.get(key).getFormulaValue();
        }
        else {
            return this.emptyString;
        }
    };
    Calculate.prototype.getNamedRanges = function () {
        return this.namedRanges;
    };
    /**
     * Adds a named range to the NamedRanges collection.
     *
     * @param {string} name - Name of the named range.
     * @param {string} range - Range for the specified name.
     * @returns {boolean} - Adds a named range to the NamedRanges collection.
     */
    Calculate.prototype.addNamedRange = function (name, range) {
        var sheetScopeName = name.split(this.sheetToken);
        if (sheetScopeName.length > 1) {
            var sheetId = (this.getSheetId(this.grid)).toString();
            var family = this.getSheetFamilyItem(sheetId);
            if (!family.parentObjectToToken.get(sheetId)) {
                return false;
            }
            name = sheetScopeName[0] + this.sheetToken + sheetScopeName[1].toUpperCase();
        }
        else {
            name = name.toUpperCase();
        }
        this.namedRanges.set(name, range);
        return true;
    };
    /**
     * Update the sheet name changes in the named range collection.
     *
     * @hidden
     * @param {string} pName - Previous name of the sheet.
     * @param {string} name -  Current name of the sheet.
     * @returns {void} - Update the sheet name changes in the named range collection.
     */
    Calculate.prototype.updateNamedRange = function (pName, name) {
        var updatedRange = new Map();
        this.namedRanges.forEach(function (value, key) {
            var updatedKey = key;
            if (key.includes(pName)) {
                var range = key.split('!');
                range[0] = name;
                updatedKey = range.join('!');
            }
            updatedRange.set(updatedKey, value);
        });
        this.namedRanges = updatedRange;
    };
    /**
     * Remove the specified named range form the named range collection.
     *
     * @param {string} name - Name of the specified named range.
     * @returns {boolean} - Remove the specified named range form the named range collection.
     */
    Calculate.prototype.removeNamedRange = function (name) {
        name = name.toUpperCase();
        if (this.namedRanges.get(name) != null) {
            this.namedRanges.delete(name);
            return true;
        }
        return false;
    };
    /**
     * @hidden
     * @param {number} col - specify the column
     * @returns {string} - to convert the alpha.
     */
    Calculate.prototype.convertAlpha = function (col) {
        var arrCol = [];
        var n = 0;
        var charText = 'A';
        while (col > 0) {
            col--;
            var aCharValue = charText.charCodeAt(0);
            arrCol[n] = String.fromCharCode(col % 26 + aCharValue);
            col = parseInt((col / 26).toString(), 10);
            n++;
        }
        var arr = [];
        for (var i = 0; i < n; i++) {
            arr[n - i - 1] = arrCol[i];
        }
        return arr.join('');
    };
    /**
     * @hidden
     * @param {string} cellRange - specify the cell range.
     * @returns {string} - to get cell collection.
     */
    Calculate.prototype.getCellCollection = function (cellRange) {
        if (cellRange.indexOf(':') < 0) {
            if (!this.isCellReference(cellRange)) {
                return cellRange.split(this.getParseArgumentSeparator());
            }
            else {
                cellRange = cellRange + ':' + cellRange;
            }
        }
        var token = this.emptyString;
        var sheetTokenIndex = cellRange.indexOf(this.sheetToken);
        if (sheetTokenIndex > -1) {
            var index = sheetTokenIndex;
            var s = index + 1;
            while (s < cellRange.length) {
                if (cellRange[s] === this.sheetToken) {
                    token = cellRange.substr(0, s + 1);
                    break;
                }
                s++;
            }
        }
        var i = cellRange.indexOf(':');
        var row1;
        var row2;
        var col1;
        var col2;
        if (i > 0 && this.isChar(cellRange[i - 1])) {
            var k = i - 2;
            while (k >= 0 && this.isDigit(cellRange[k])) {
                k--;
            }
        }
        row1 = this.rowIndex(this.substring(cellRange, 0, i));
        row2 = this.rowIndex(this.substring(cellRange, i + 1, i + cellRange.length - i - 1));
        col1 = this.colIndex(this.substring(cellRange, 0, i));
        col2 = this.colIndex(this.substring(cellRange, i + 1, i + cellRange.length - i - 1));
        if (row1 > row2) {
            i = row2;
            row2 = row1;
            row1 = i;
        }
        if (col1 > col2) {
            i = col2;
            col2 = col1;
            col1 = i;
        }
        var cells = [];
        var j;
        var c = 0;
        for (i = row1; i <= row2; i++) {
            for (j = col1; j <= col2; j++) {
                cells[c] = token + this.emptyString + this.convertAlpha(j) + i.toString();
                c++;
            }
        }
        return cells;
    };
    /**
     * Compute the given formula.
     *
     * @param {string} formulaText - Specifies to compute the given formula.
     * @param {boolean} isFromComputeExpression - Specifies to confirm it was called from the ComputeExpression function.
     * @returns {string | number} - compute the given formula
     */
    Calculate.prototype.computeFormula = function (formulaText, isFromComputeExpression) {
        return this.calculateFormula(formulaText, false, isFromComputeExpression);
    };
    Calculate.prototype.calculateFormula = function (formulaText, refresh, isFromComputeExpression) {
        var _this = this;
        var parsedText;
        var lastIndexOfq;
        var formulatResult;
        var nestedFormula = false;
        var fNested;
        if (this.parser.isError) {
            return formulaText;
        }
        if (!this.parser.isFormulaParsed) {
            parsedText = this.parser.parseFormula(formulaText);
        }
        else {
            parsedText = formulaText;
        }
        this.parser.isFormulaParsed = false;
        try {
            lastIndexOfq = this.findLastIndexOfq(parsedText);
            if (lastIndexOfq > 0) {
                nestedFormula = true;
            }
            if (parsedText !== this.emptyString && lastIndexOfq > -1) {
                var i = lastIndexOfq + 1;
                var _loop_1 = function () {
                    if (parsedText[i] !== this_1.rightBracket) {
                        i++;
                        return "continue";
                    }
                    var sFormula = parsedText.substring(lastIndexOfq, i + 1);
                    var libFormula = sFormula.split(this_1.leftBracket)[0].split('q').join(this_1.emptyString);
                    var args = void 0;
                    if (this_1.getLibraryFormulas().get(libFormula.toUpperCase()).isCustom) {
                        args = sFormula.substring(sFormula.indexOf(this_1.leftBracket) + 1, sFormula.indexOf(this_1.rightBracket))
                            .split(this_1.getParseArgumentSeparator());
                        var j = 0;
                        var customArgs = [];
                        var cellCol = void 0;
                        for (j = 0; j < args.length; j++) {
                            if (args[j].includes(':') && this_1.isCellReference(args[j])) {
                                cellCol = this_1.getCellCollection(args[j]);
                                if (cellCol.length > 1) {
                                    customArgs.push(args[j]);
                                    cellCol.forEach(function (cell) {
                                        _this.updateDependentCell(cell);
                                    });
                                }
                                else {
                                    customArgs.push(this_1.getValueFromArg(args[j]));
                                }
                            }
                            else {
                                customArgs.push(this_1.getValueFromArg(args[j]));
                            }
                        }
                        args = customArgs;
                    }
                    else {
                        var argStr = sFormula.substring(sFormula.indexOf(this_1.leftBracket) + 1, sFormula.indexOf(this_1.rightBracket));
                        args = [];
                        var separator = this_1.getParseArgumentSeparator();
                        var parameter = '';
                        var isInString = void 0;
                        for (var idx = 0, len = argStr.length - 1; idx <= len; idx++) {
                            if (argStr[idx] === '"') {
                                isInString = !isInString;
                            }
                            if (argStr[idx] === separator && !isInString) {
                                args.push(parameter);
                                parameter = '';
                                if (idx === len) {
                                    args.push(parameter);
                                }
                            }
                            else {
                                parameter += argStr[idx];
                                if (idx === len) {
                                    args.push(parameter);
                                }
                            }
                        }
                        if (!args.length) {
                            args = [''];
                        }
                        if (nestedFormula && libFormula) {
                            var formulas = ['IF', 'INDEX', 'SORT', 'T', 'EXACT', 'PROPER', 'DOLLAR', 'DATE', 'TEXT'];
                            if (formulas.some(function (formula) { return formula === libFormula; })) {
                                args.push('nestedFormulaTrue');
                            }
                            if (libFormula === 'IF') {
                                args.push('nestedFormulaTrue');
                            }
                        }
                        if (isFromComputeExpression && libFormula === 'UNIQUE') {
                            args.push('isComputeExp');
                        }
                    }
                    formulatResult = isNullOrUndefined(this_1.getFunction(libFormula)) ? this_1.getErrorStrings()[CommonErrors.Name] : this_1.getFunction(libFormula).apply(void 0, args);
                    if (nestedFormula) {
                        fNested = this_1.processNestedFormula(parsedText, sFormula, formulatResult);
                        var q = this_1.findLastIndexOfq(fNested);
                        if (q === 0) {
                            nestedFormula = false;
                        }
                        if (q === -1) {
                            formulatResult = this_1.computeValue(fNested, refresh);
                        }
                        lastIndexOfq = i = q;
                        parsedText = fNested;
                        return "continue";
                    }
                    return "break";
                };
                var this_1 = this;
                while (i > -1) {
                    var state_1 = _loop_1();
                    if (state_1 === "break")
                        break;
                }
            }
            else if (this.formulaErrorStrings.indexOf(parsedText) > -1) {
                formulatResult = parsedText;
            }
            else if (parsedText !== this.emptyString && lastIndexOfq === -1) {
                formulatResult = this.computeValue(parsedText, refresh);
            }
        }
        catch (ex) {
            var args = { message: ex.message, exception: ex, isForceCalculable: false, computeForceCalculate: false };
            this.trigger('onFailure', args);
            var errorMessage = (typeof args.exception === 'string') ? args.exception : args.message;
            formulatResult = (isNullOrUndefined(this.getErrorLine(ex)) ? '' : '#' + this.getErrorLine(ex) + ': ') + errorMessage;
        }
        return formulatResult;
    };
    /**
     * @hidden
     * @param {string[]} range - Specify the range.
     * @param {string} isAvgIf - Specify the AVERAGEIF computation.
     * @returns {number[] | string} - To compute the sum if and average if.
     */
    Calculate.prototype.computeSumIfAndAvgIf = function (range, isAvgIf) {
        if (isNullOrUndefined(range) || range[0] === this.emptyString || range.length === 0) {
            return this.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArr = range;
        for (var i = 0; i < argArr.length; i++) {
            if (this.isCellReference(argArr[i]) && isNullOrUndefined(argArr[i].match(/[0-9]/)) &&
                argArr[i].indexOf('!') < 0) {
                var splitArray = argArr[i].split(':');
                argArr[i] = splitArray[0] + '1' + ':' + splitArray[1] + this.spreadSheetUsedRange[0];
            }
        }
        var argCount = argArr.length;
        if (argCount !== 2 && argCount !== 3 && argCount === 0) {
            return this.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr[1] === '') {
            return isAvgIf ? this.getErrorStrings()[CommonErrors.DivZero] : '0';
        }
        var rangevalue = argArr[0];
        var isStringVal = argArr[1].startsWith(this.tic) && argArr[1].endsWith(this.tic);
        var criteria = argArr[1].split(this.tic).join(this.emptyString);
        if (criteria.length > 255) {
            return this.getErrorStrings()[CommonErrors.Value];
        }
        var isAsterisk = criteria.includes('*');
        var isQuestionMark = criteria.includes('?');
        var criteriaValue = isAsterisk ? criteria.replace(/\*/g, '').trim() : criteria;
        var isCellReferenceValue = false;
        if (!isStringVal && this.isCellReference(criteriaValue)) {
            criteriaValue = this.getValueFromArg(criteriaValue);
            isCellReferenceValue = true;
        }
        if (isAsterisk) {
            var asteriskIndex = criteria.indexOf('*');
            if (criteria[0] === '*') {
                criteriaValue = '*' + criteriaValue;
            }
            if (criteria[criteria.length - 1] === '*') {
                criteriaValue += '*';
            }
            if (asteriskIndex > 0 && asteriskIndex < criteria.length - 1) {
                criteriaValue = criteria.substring(0, asteriskIndex) + '*' + criteria.substring(asteriskIndex + 1);
            }
        }
        criteria = criteriaValue;
        var opt = this.parser.tokenEqual;
        if (criteria.startsWith('<=')) {
            opt = this.parser.tokenLessEq;
            criteria = criteria.substring(2);
        }
        else if (criteria.startsWith('>=')) {
            opt = this.parser.tokenGreaterEq;
            criteria = criteria.substring(2);
        }
        else if (criteria.startsWith('<>')) {
            opt = this.parser.tokenNotEqual;
            criteria = criteria.substring(2);
        }
        else if (criteria.startsWith('<')) {
            opt = this.parser.tokenLess;
            criteria = criteria.substring(1);
        }
        else if (criteria.startsWith('>')) {
            opt = this.parser.tokenGreater;
            criteria = criteria.substring(1);
        }
        else if (criteria.startsWith('=')) {
            opt = this.parser.tokenEqual;
            criteria = criteria.substring(1);
        }
        if ((!isStringVal && this.isCellReference(criteria) && !isCellReferenceValue) || criteria.includes(this.arithMarker) ||
            (criteria.includes(this.getParseDecimalSeparator()) && !isAsterisk && !isQuestionMark)) {
            criteria = this.getValueFromArg(criteria);
        }
        var checkCriteria = this.parseFloat(criteria);
        var criteriaRangeArray = argArr[0];
        var sumRange = this.getCellCollection(argCount > 2 ? argArr[2] : rangevalue);
        var criteriaRange = this.getCellCollection(criteriaRangeArray);
        if (criteriaRange.length > sumRange.length) {
            var sumEndCol = this.colIndex(sumRange[sumRange.length - 1]) +
                this.colIndex(criteriaRange[criteriaRange.length - 1]) - this.colIndex(criteriaRange[0]);
            var sumrange = argArr[2].split(':');
            sumrange[1] = (this.convertAlpha(sumEndCol) + this.rowIndex(criteriaRange[criteriaRange.length - 1])).toString();
            sumRange = this.getCellCollection(sumrange.join(':'));
        }
        var result = this.getComputeSumIfValue(criteriaRange, sumRange, criteria.toLowerCase(), checkCriteria, opt, isAsterisk, isQuestionMark);
        return [result[0], result[1]];
    };
    /**
     * @hidden
     * @param {string[]} range - specify the range
     * @returns {string} - to compute lookup
     */
    Calculate.prototype.computeLookup = function (range) {
        var _a, _b;
        var lookupArray;
        var matchArray;
        var lookupRange = [];
        var matchupRange = [];
        var checkCriteria = [];
        var findMaxVal = [];
        var lookupValue;
        var isArrayVector;
        var result = [];
        var argArr = range;
        var argCount = argArr.length;
        if (argCount === 1 || argCount > 3) {
            return this.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr[1] === '' || argArr[2] === '') {
            return this.getErrorStrings()[CommonErrors.Value];
        }
        lookupValue = this.getValueFromArg(argArr[0]);
        if (argArr[0].indexOf(this.tic) > -1 && argArr[0].toUpperCase().split(this.tic).join('') !== this.trueValue &&
            argArr[0].toUpperCase().split(this.tic).join('') !== this.falseValue && this.isNaN(this.parseFloat(argArr[0].split(this.tic).join('')))) {
            lookupValue = lookupValue.split(this.tic).join('');
        }
        if (this.getErrorStrings().indexOf(lookupValue) > -1) {
            return lookupValue;
        }
        var rangeSplit = argArr[1].split(':');
        if (rangeSplit.length === 2 && this.isCellReference(rangeSplit[0]) && this.isCellReference(rangeSplit[1]) && argCount === 2) {
            var index = argArr[1].indexOf(':');
            var rowIdx = this.rowIndex(this.substring(argArr[1], 0, index));
            var colIdx = this.colIndex(this.substring(argArr[1], 0, index));
            var endRowIdx = this.rowIndex(this.substring(argArr[1], index + 1, index + argArr[1].length - index - 1));
            var endColIdx = this.colIndex(this.substring(argArr[1], index + 1, index + argArr[1].length - index - 1));
            if (rowIdx > endRowIdx) {
                _a = [endRowIdx, rowIdx], rowIdx = _a[0], endRowIdx = _a[1];
            }
            if (colIdx > endColIdx) {
                _b = [endColIdx, colIdx], colIdx = _b[0], endColIdx = _b[1];
            }
            var sheetIdx = '';
            if (argArr[1].indexOf('!') === 0) {
                sheetIdx = argArr[1];
                sheetIdx = sheetIdx.replace('!', '');
                sheetIdx = sheetIdx.indexOf('!');
                sheetIdx = argArr[1].substring(0, sheetIdx + 2);
            }
            var colCount = endColIdx - colIdx + 1;
            var rowCount = endRowIdx - rowIdx + 1;
            if (rowCount > colCount || rowCount === colCount) { // Taller than Wide. vlookup
                lookupArray = sheetIdx + getAlphalabel(colIdx) + rowIdx + ':' + getAlphalabel(colIdx) + endRowIdx;
                matchArray = sheetIdx + getAlphalabel(endColIdx) + rowIdx + ':' + getAlphalabel(endColIdx) + endRowIdx;
            }
            else if (rowCount < colCount) { // Wider than Tall. hlookup
                lookupArray = sheetIdx + getAlphalabel(colIdx) + rowIdx + ':' + getAlphalabel(endColIdx) + rowIdx;
                matchArray = sheetIdx + getAlphalabel(colIdx) + endRowIdx + ':' + getAlphalabel(endColIdx) + endRowIdx;
            }
            if (rowIdx !== endRowIdx || colIdx !== endColIdx) {
                isArrayVector = true;
            }
        }
        if (isArrayVector) {
            lookupRange = this.getCellCollection(lookupArray);
            matchupRange = this.getCellCollection(matchArray);
        }
        else {
            lookupRange = this.getCellCollection(argArr[1]);
            var arrvalue = argCount === 2 ? argArr[1] : argArr[2];
            matchupRange = this.getCellCollection(arrvalue);
            var lookupIndex = getRangeIndexes(argArr[1]);
            var matchIndex = getRangeIndexes(arrvalue);
            var isValidLookup = lookupIndex[1] === lookupIndex[3] ? true : lookupIndex[0] === lookupIndex[2];
            var isValidMatch = matchIndex[1] === matchIndex[3] ? true : matchIndex[0] === matchIndex[2];
            if (!isValidLookup || !isValidMatch) {
                return this.getErrorStrings()[CommonErrors.NA];
            }
        }
        for (var i = 0; i < lookupRange.length; i++) {
            findMaxVal.push(this.getValueFromArg(lookupRange[i]).split(this.tic).join(''));
        }
        var num = findMaxVal.map(function (value) { return value === '' ? NaN : Number(value); }).sort(function (a, b) { return a - b; });
        var maxVal = num[num.length - 1];
        var minVal = num[0];
        var lookupVal = this.parseFloat(lookupValue);
        if (!this.isNaN(lookupVal)) {
            for (var a = 0; a < num.length; a++) {
                checkCriteria[a] = num[a].toString().split(this.tic).join('');
                if (!isNullOrUndefined(matchupRange[a]) && checkCriteria[a] !== '' && lookupVal === this.parseFloat(checkCriteria[a])) {
                    result.push(this.getValueFromArg(matchupRange[a]).split(this.tic).join('') || '0');
                }
            }
        }
        else {
            for (var j = 0; j < lookupRange.length; j++) {
                checkCriteria[j] = this.getValueFromArg(lookupRange[j]).split(this.tic).join('');
                if (!isNullOrUndefined(matchupRange[j]) && lookupValue !== '' && checkCriteria[j] !== '') {
                    if (lookupValue.toUpperCase() === checkCriteria[j].toUpperCase()) {
                        result.push(this.getValueFromArg(matchupRange[j]).split(this.tic).join('') || '0');
                    }
                    else if (lookupValue.indexOf('*') > -1 || lookupValue.indexOf('?') > -1) {
                        var criteriaValue = lookupValue;
                        if (lookupValue.indexOf('*') > -1) {
                            criteriaValue = criteriaValue.replace(/\*/g, '').trim();
                            if (this.isCellReference(criteriaValue)) {
                                criteriaValue = this.getValueFromArg(criteriaValue);
                            }
                            var asteriskIndex = lookupValue.indexOf('*');
                            if (lookupValue[0] === '*') {
                                criteriaValue = '*' + criteriaValue;
                            }
                            if (lookupValue[lookupValue.length - 1] === '*') {
                                criteriaValue += '*';
                            }
                            if (asteriskIndex > 0 && asteriskIndex < lookupValue.length - 1) {
                                criteriaValue = lookupValue.substring(0, asteriskIndex) + '*' + lookupValue.substring(asteriskIndex + 1);
                            }
                        }
                        var stack = [];
                        var wildcardResult = this.findWildCardValue(criteriaValue.toLowerCase(), checkCriteria[j].toLowerCase());
                        stack.push(wildcardResult);
                        stack.push(lookupValue);
                        if (this.processLogical(stack, 'equal') === this.trueValue) {
                            result.push(this.getValueFromArg(matchupRange[j]).split(this.tic).join('') || '0');
                        }
                    }
                }
            }
        }
        if (result.length > 0) {
            return result[result.length - 1];
        }
        if (lookupVal > maxVal && !isNullOrUndefined(matchupRange[lookupRange.length - 1])) {
            return this.getValueFromArg(matchupRange[lookupRange.length - 1]).split(this.tic).join('') || '0';
        }
        else if (lookupVal < minVal) {
            return this.getErrorStrings()[CommonErrors.NA];
        }
        if (findMaxVal.indexOf(lookupValue.split(this.tic).join('')) < 0 && lookupValue !== this.trueValue && lookupValue !== this.falseValue) {
            if (!this.isNaN(lookupVal) && !this.isNaN(maxVal) && !this.isNaN(minVal)) {
                var temp = [];
                for (var b = 0; b < num.length; b++) {
                    if (lookupVal > num[b]) {
                        temp.push(num[b]);
                    }
                }
                var index = temp.length - 1;
                if (!isNullOrUndefined(matchupRange[index]) && index >= 0) {
                    return this.getValueFromArg(matchupRange[index]).split(this.tic).join('') || '0';
                }
            }
            else if (this.isNaN(lookupVal) && lookupValue !== '' && /^[a-zA-Z!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(lookupValue)) {
                var str = findMaxVal.sort();
                var index = this.findClosestMatch(lookupValue.split(this.tic).join(''), str);
                if (!isNullOrUndefined(matchupRange[index]) && index >= 0) {
                    return this.getValueFromArg(matchupRange[index]).split(this.tic).join('') || '0';
                }
            }
        }
        return this.getErrorStrings()[CommonErrors.NA];
    };
    Calculate.prototype.computeVHLookup = function (range, isVlookup) {
        var _this = this;
        var _a, _b;
        var argArr = range;
        if (isNullOrUndefined(argArr) || argArr.length < 3 || argArr.length > 4) {
            return this.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        if (argArr[1] === '') {
            return this.getErrorStrings()[CommonErrors.NA];
        }
        var lookupValue = this.getValueFromArg(argArr[0]);
        if (lookupValue) {
            if (lookupValue.includes(this.tic)) {
                var lookupVal = lookupValue.split(this.tic).join('');
                if (lookupVal && !this.isNumber(lookupVal)) {
                    var lookupValUpper = lookupVal.toUpperCase();
                    if (lookupValUpper !== this.trueValue && lookupValUpper !== this.falseValue) {
                        lookupValue = lookupVal;
                    }
                }
            }
        }
        else {
            lookupValue = '0';
        }
        var errorStrings = this.getErrorStrings();
        if (errorStrings.indexOf(lookupValue) > -1) {
            return lookupValue;
        }
        var colIdxVal = (this.getValueFromArg(argArr[2]) || '0').split(this.tic).join('').toUpperCase();
        var colNumIdx = this.parseFloat(colIdxVal === this.trueValue ? '1' : colIdxVal);
        if (colNumIdx < 1) {
            return errorStrings[CommonErrors.Value];
        }
        var isExactMatchLookup;
        if (argArr[3]) {
            argArr[3] = this.getValueFromArg(argArr[3]).split(this.tic).join('');
            if (errorStrings.indexOf(argArr[3]) > -1) {
                return argArr[3];
            }
            var rangeLookup = argArr[3].toUpperCase();
            if (rangeLookup === this.falseValue || argArr[3] === '0') {
                isExactMatchLookup = true;
            }
            else if (!(rangeLookup === this.trueValue || argArr[3] === '1')) {
                return errorStrings[CommonErrors.Value];
            }
        }
        var rangeArr = argArr[1].split(':');
        var startIdx;
        var endIdx;
        var idx;
        var grid;
        var getLookupRangeValue;
        var getMatchRangeValue;
        if (this.isCellReference(rangeArr[0]) && this.isCellReference(rangeArr[1])) {
            var rowIdx_1 = this.rowIndex(rangeArr[0]);
            var colIdx_1 = this.colIndex(rangeArr[0]);
            var endRowIdx = this.rowIndex(rangeArr[1]);
            var endColIdx = this.colIndex(rangeArr[1]);
            if (rowIdx_1 > endRowIdx) {
                _a = [endRowIdx, rowIdx_1], rowIdx_1 = _a[0], endRowIdx = _a[1];
            }
            if (colIdx_1 > endColIdx) {
                _b = [endColIdx, colIdx_1], colIdx_1 = _b[0], endColIdx = _b[1];
            }
            if (!(rowIdx_1 > 0 && endRowIdx <= 1048576 && colIdx_1 > 0 && endColIdx <= 16384)) {
                return this.getErrorStrings()[CommonErrors.Name];
            }
            grid = this.grid;
            var sheetToken_1 = '';
            var family = this.getSheetFamilyItem(grid);
            if (argArr[1].startsWith('!')) {
                sheetToken_1 = argArr[1].substring(0, argArr[1].replace('!', '').indexOf('!') + 2);
                if (family.tokenToParentObject !== null) {
                    this.grid = family.tokenToParentObject.get(sheetToken_1);
                }
            }
            else if (family.parentObjectToToken !== null) {
                sheetToken_1 = family.parentObjectToToken.get(grid);
            }
            var sheetId = this.getSheetId(this.grid);
            var sheetInfoArgs = {
                action: 'getSheetInfo', sheetInfo: []
            };
            this.parentObject.notify(workbookFormulaOperation, sheetInfoArgs);
            if (getSheetIndexByName(this.parentObject, 'Sheet' + sheetId, sheetInfoArgs.sheetInfo) === -1) {
                this.grid = grid;
                return errorStrings[CommonErrors.Ref];
            }
            var getCellValue_1 = this.getCellValueFn(grid, this.cell, sheetId, true);
            if (isVlookup) {
                var matchIndex_1 = colIdx_1 + colNumIdx - 1;
                if (matchIndex_1 > endColIdx) {
                    return errorStrings[CommonErrors.Ref];
                }
                startIdx = rowIdx_1;
                endIdx = endRowIdx;
                var lookupColText_1 = sheetToken_1 + getAlphalabel(colIdx_1);
                getLookupRangeValue = function (idx) {
                    return getCellValue_1(idx, colIdx_1, lookupColText_1 + idx);
                };
                var matchColText_1 = sheetToken_1 + getAlphalabel(matchIndex_1);
                getMatchRangeValue = function () {
                    return getCellValue_1(idx, matchIndex_1, matchColText_1 + idx) || '0';
                };
            }
            else {
                var matchIndex_2 = rowIdx_1 + colNumIdx - 1;
                if (matchIndex_2 > endRowIdx) {
                    return errorStrings[CommonErrors.Ref];
                }
                startIdx = colIdx_1;
                endIdx = endColIdx;
                var matchColText_2;
                getLookupRangeValue = function (idx) {
                    matchColText_2 = sheetToken_1 + getAlphalabel(idx);
                    return getCellValue_1(rowIdx_1, idx, matchColText_2 + rowIdx_1);
                };
                getMatchRangeValue = function () {
                    return getCellValue_1(matchIndex_2, idx, matchColText_2 + matchIndex_2) || '0';
                };
            }
        }
        else {
            return errorStrings[CommonErrors.Value];
        }
        var result;
        var lookupRangeVal;
        var matchedResult = [];
        if (isExactMatchLookup) {
            var isMatchFound = void 0;
            if (this.isNumber(lookupValue)) {
                var lookupNumVal_1 = this.parseFloat(lookupValue);
                isMatchFound = function () {
                    return lookupNumVal_1 === _this.parseFloat(lookupRangeVal);
                };
            }
            else if (lookupValue.includes('*') || lookupValue.includes('?')) {
                var criteriaValue_1 = lookupValue;
                var asteriskIndex = lookupValue.indexOf('*');
                if (asteriskIndex > -1) {
                    criteriaValue_1 = criteriaValue_1.replace(/\*/g, '').trim();
                    if (this.isCellReference(criteriaValue_1)) {
                        criteriaValue_1 = this.getValueFromArg(criteriaValue_1);
                    }
                    if (asteriskIndex === 0) {
                        criteriaValue_1 = '*' + criteriaValue_1;
                    }
                    else if (asteriskIndex === lookupValue.length - 1) {
                        criteriaValue_1 += '*';
                    }
                    else {
                        criteriaValue_1 = lookupValue.substring(0, asteriskIndex) + '*' + lookupValue.substring(asteriskIndex + 1);
                    }
                }
                criteriaValue_1 = criteriaValue_1.toLowerCase();
                isMatchFound = function () {
                    return _this.processLogical([_this.findWildCardValue(criteriaValue_1, lookupRangeVal.toLowerCase()), lookupValue], 'equal') === _this.trueValue;
                };
            }
            else {
                var lookupValUpper_1 = lookupValue.toUpperCase();
                isMatchFound = function () {
                    return lookupValUpper_1 === lookupRangeVal.toUpperCase();
                };
            }
            for (idx = startIdx; idx <= endIdx; idx++) {
                lookupRangeVal = getLookupRangeValue(idx);
                if (lookupRangeVal && isMatchFound()) {
                    matchedResult.push(getMatchRangeValue());
                }
            }
            result = matchedResult.length ? matchedResult[0] : errorStrings[CommonErrors.NA];
        }
        else if (lookupValue.indexOf('*') > -1 || lookupValue.indexOf('?') > -1) {
            result = errorStrings[CommonErrors.NA];
        }
        else {
            var matchVal_1;
            var checkMatchFn = void 0;
            if (this.isNumber(lookupValue)) {
                var lookupNumVal_2 = this.parseFloat(lookupValue);
                var comparer_1 = DataUtil.fnSort('');
                checkMatchFn = function () {
                    matchVal_1 = comparer_1(_this.isNumber(lookupRangeVal) ? _this.parseFloat(lookupRangeVal) : lookupRangeVal || null, lookupNumVal_2);
                };
            }
            else {
                var collator_1 = new Intl.Collator(this.parentObject.locale || 'en-US', { sensitivity: 'base' });
                checkMatchFn = function () {
                    matchVal_1 = (!lookupRangeVal || _this.isNumber(lookupRangeVal)) ? null : collator_1.compare(lookupRangeVal, lookupValue);
                };
            }
            var skipCheck = void 0;
            for (idx = startIdx; idx <= endIdx; idx++) {
                lookupRangeVal = getLookupRangeValue(idx);
                if (!skipCheck) {
                    checkMatchFn();
                    if (matchVal_1 === 0) {
                        matchedResult.push(getMatchRangeValue());
                    }
                    else if (matchVal_1 < 0) {
                        matchedResult.push(getMatchRangeValue());
                    }
                    else if (matchVal_1 > 0 && matchedResult.length) {
                        skipCheck = true;
                    }
                }
            }
            result = matchedResult.length ? matchedResult[matchedResult.length - 1] : errorStrings[CommonErrors.NA];
        }
        this.grid = grid;
        return result;
    };
    Calculate.prototype.findClosestMatch = function (searchValue, sortedArray) {
        var start = 0;
        var end = sortedArray.length - 1;
        while (start <= end) {
            var mid = Math.floor((start + end) / 2);
            var midValue = sortedArray[mid];
            var compareResult = this.compareStrings(searchValue.toLowerCase(), midValue.toLowerCase());
            if (compareResult === 0) {
                return mid;
            }
            else if (compareResult === 1) {
                start = mid + 1;
            }
            else {
                end = mid - 1;
            }
        }
        // If no exact match is found, return the closest match based on the entire string
        for (var i = start - 1; i >= 0; i--) {
            if (this.compareStrings(searchValue.toLowerCase(), sortedArray[i].toLowerCase()) !== -1) {
                return i;
            }
        }
        return -1; // No match found
    };
    Calculate.prototype.compareStrings = function (str1, str2) {
        var minLength = Math.min(str1.length, str2.length);
        for (var i = 0; i < minLength; i++) {
            var charCode1 = str1.charCodeAt(i);
            var charCode2 = str2.charCodeAt(i);
            if (charCode1 < charCode2) {
                return -1;
            }
            else if (charCode1 > charCode2) {
                return 1;
            }
        }
        // If all characters are the same up to the length of the shorter string, compare lengths
        if (str1.length < str2.length) {
            return -1;
        }
        else if (str1.length > str2.length) {
            return 1;
        }
        else {
            return 0;
        }
    };
    Calculate.prototype.findWildCardValue = function (lookVal, cellValue) {
        var finalText = '';
        if (lookVal.indexOf('?') > -1) {
            var checkRegex = RegExp(lookVal.replace(/\?/g, '[\\s\\S]'));
            if (cellValue.length === lookVal.length && this.isNaN(this.parseFloat(cellValue))) {
                if (cellValue.match(checkRegex)) {
                    finalText = lookVal;
                }
                else {
                    finalText = cellValue;
                }
            }
            else {
                finalText = cellValue;
            }
        }
        else if (lookVal.indexOf('*') > -1) {
            var index = lookVal.indexOf('*');
            var left = '';
            var right = '';
            var compRight = this.falseValue;
            var compLeft = this.falseValue;
            for (var i = index - 1; i >= 0; i--) {
                left = left + lookVal[i];
                compLeft = this.trueValue;
            }
            for (var i = index + 1; i < lookVal.length; i++) {
                right = right + lookVal[i];
                compRight = this.trueValue;
            }
            var leftVal = left === '' ? -1 : cellValue.indexOf(left.split('').reverse().join(''));
            var rightVal = right === '' ? -1 : cellValue.indexOf(right);
            if (leftVal > -1 || rightVal > -1) {
                var isLeft = left.split('').reverse().join('') === cellValue.substr(0, left.length);
                var isRight = right === cellValue.substring(cellValue.length - right.length, cellValue.length);
                if (compLeft === this.trueValue && compRight === this.trueValue &&
                    this.isNaN(this.parseFloat(left)) && this.isNaN(this.parseFloat(right))) {
                    finalText = isLeft && isRight ? lookVal : cellValue;
                }
                else if (compLeft === this.trueValue && this.isNaN(this.parseFloat(left))) {
                    finalText = isLeft ? lookVal : cellValue;
                }
                else if (compRight === this.trueValue && this.isNaN(this.parseFloat(right))) {
                    finalText = isRight ? lookVal : cellValue;
                }
            }
            else {
                finalText = cellValue;
            }
        }
        return finalText;
    };
    /**
     * @hidden
     * @param {string[] | string} criteriaRange - Specifies the criteria reange.
     * @param {string[] | string} sumRange - Specifies the sum range.
     * @param {string} criteria - Specifies the criteria against which values are checked.
     * @param {number} checkCriteria - Specifies the check criteria value.
     * @param {string} op - Specifies the operator value.
     * @param {boolean} isAsterisk - Indicates whether asterisk (*) is used as a wildcard or not.
     * @param {boolean} isQuestionMark - Indicates whether question mark (?) is used as a wildcard or not.
     * @returns {number[]} - Returns computed sum if value.
     */
    Calculate.prototype.getComputeSumIfValue = function (criteriaRange, sumRange, criteria, checkCriteria, op, isAsterisk, isQuestionMark) {
        var sum = 0;
        var count = 0;
        // const isFirst: boolean = isAsterisk && criteria && criteria[0] === '*';
        switch (op) {
            case this.parser.tokenEqual:
                {
                    var criteriaValue = isAsterisk ? criteria.replace(/\*/g, '') : criteria;
                    for (var i = 0; i < criteriaRange.length; i++) {
                        var sumVal = this.getValueFromRange(sumRange, i);
                        var value = this.getValueFromArg(criteriaRange[i].split(this.tic).join('')).toLowerCase();
                        var val = this.parseFloat(value);
                        if (value === criteria && val === checkCriteria) {
                            var value1 = this.getValueFromArg(sumRange[i].split(this.tic).join(''));
                            var val1 = this.parseFloat(value1);
                            if (!this.isNaN(val1)) {
                                sum = sum + val1;
                                count = count + 1;
                            }
                        }
                        else if (value === criteria) {
                            if (!this.isNaN(sumVal)) {
                                sum = sum + sumVal;
                                count = count + 1;
                            }
                        }
                        else if (isAsterisk && criteriaValue && value && this.isNaN(this.parseFloat(value))) {
                            var asteriskIndex = criteria.indexOf('*');
                            if (criteria[0] === '*' && criteriaValue.length <= value.length && criteriaValue === value.slice(value.length - criteriaValue.length, value.length)) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                            else if (criteria[criteria.length - 1] === '*' && criteriaValue.length <= value.length && criteriaValue === value.slice(0, criteriaValue.length)) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                            else if (asteriskIndex > -1 && value.startsWith(criteria.substr(0, asteriskIndex))
                                && value.endsWith(criteria.substr(asteriskIndex + 1))) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                        }
                        else if (isAsterisk && !criteriaValue && value && this.isNaN(this.parseFloat(value))) {
                            if (!this.isNaN(sumVal)) {
                                sum = sum + sumVal;
                                count = count + 1;
                            }
                        }
                        else if (isQuestionMark && criteriaValue && value && this.isNaN(this.parseFloat(value))) {
                            var checkRegex = RegExp(criteriaValue.replace(/\?/g, '[\\s\\S]'));
                            if (value.length === criteria.length && value.match(checkRegex)) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                        }
                    }
                }
                break;
            case this.parser.tokenLess:
                {
                    for (var i = 0; i < criteriaRange.length; i++) {
                        var value = this.getValueFromArg(criteriaRange[i].split(this.tic).join(''));
                        var val = this.parseFloat(value);
                        if (val < checkCriteria) {
                            var value1 = this.getValueFromArg(sumRange[i].split(this.tic).join(''));
                            var val1 = this.parseFloat(value1);
                            if (!this.isNaN(val1)) {
                                sum = sum + val1;
                                count = count + 1;
                            }
                        }
                    }
                }
                break;
            case this.parser.tokenGreater:
                {
                    for (var i = 0; i < criteriaRange.length; i++) {
                        var value = this.getValueFromArg(criteriaRange[i].split(this.tic).join(''));
                        var val = this.parseFloat(value);
                        if (val > checkCriteria) {
                            var value1 = this.getValueFromArg(sumRange[i].split(this.tic).join(''));
                            var val1 = this.parseFloat(value1);
                            if (!this.isNaN(val1)) {
                                sum = sum + val1;
                                count = count + 1;
                            }
                        }
                    }
                }
                break;
            case this.parser.tokenLessEq:
                {
                    for (var i = 0; i < criteriaRange.length; i++) {
                        var value = this.getValueFromArg(criteriaRange[i].split(this.tic).join(''));
                        var val = this.parseFloat(value);
                        if (val <= checkCriteria) {
                            var value1 = this.getValueFromArg(sumRange[i].split(this.tic).join(''));
                            var val1 = this.parseFloat(value1);
                            if (!this.isNaN(val1)) {
                                sum = sum + val1;
                                count = count + 1;
                            }
                        }
                    }
                }
                break;
            case this.parser.tokenGreaterEq:
                {
                    for (var i = 0; i < criteriaRange.length; i++) {
                        var value = this.getValueFromArg(criteriaRange[i].split(this.tic).join(''));
                        var val = this.parseFloat(value);
                        if (val >= checkCriteria) {
                            var value1 = this.getValueFromArg(sumRange[i].split(this.tic).join(''));
                            var val1 = this.parseFloat(value1);
                            if (!this.isNaN(val1)) {
                                sum = sum + val1;
                                count = count + 1;
                            }
                        }
                    }
                }
                break;
            case this.parser.tokenNotEqual:
                {
                    var criteriaValue = isAsterisk ? criteria.replace(/\*/g, '') : criteria;
                    for (var i = 0; i < criteriaRange.length; i++) {
                        var sumVal = this.getValueFromRange(sumRange, i);
                        var value = this.getValueFromArg(criteriaRange[i].split(this.tic).join('')).toLowerCase();
                        var val = this.parseFloat(value);
                        if (value !== criteria && val !== checkCriteria && !isAsterisk && !isQuestionMark) {
                            var value1 = this.getValueFromArg(sumRange[i].split(this.tic).join(''));
                            var val1 = this.parseFloat(value1);
                            if (!this.isNaN(val1)) {
                                sum = sum + val1;
                                count = count + 1;
                            }
                        }
                        else if (isAsterisk && criteriaValue && value && this.isNaN(this.parseFloat(value))) {
                            var asteriskIndex = criteria.indexOf('*');
                            if (criteria[0] === '*' && criteriaValue.length <= value.length && criteriaValue !== value.slice(value.length - criteriaValue.length, value.length)) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                            else if (criteria[criteria.length - 1] === '*' && criteriaValue.length <= value.length && criteriaValue !== value.slice(0, criteriaValue.length)) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                            else if (asteriskIndex > -1 && !value.startsWith(criteria.substr(0, asteriskIndex))
                                || !value.endsWith(criteria.substr(asteriskIndex + 1))) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                        }
                        else if (isAsterisk && !criteriaValue && !this.isNaN(this.parseFloat(value))) {
                            if (!this.isNaN(sumVal)) {
                                sum = sum + sumVal;
                                count = count + 1;
                            }
                        }
                        else if (isQuestionMark && criteriaValue && value && this.isNaN(this.parseFloat(value))) {
                            var checkRegex = RegExp(criteriaValue.replace(/\?/g, '[\\s\\S]'));
                            if (value.length !== criteria.length || !value.match(checkRegex)) {
                                if (!this.isNaN(sumVal)) {
                                    sum = sum + sumVal;
                                    count = count + 1;
                                }
                            }
                        }
                    }
                }
                break;
        }
        return [sum, count];
    };
    Calculate.prototype.getValueFromRange = function (sumRange, index) {
        var sumRangeVal = sumRange[index];
        sumRangeVal = this.getValueFromArg(sumRangeVal);
        return this.parseFloat(sumRangeVal.toString());
    };
    /**
     * @hidden
     * @param {string[]} args - specifies the args
     * @param {string} op - specify the operator.
     * @returns {string} - Compute and or.
     */
    Calculate.prototype.computeAndOrNot = function (args, op) {
        var _this = this;
        var isAnd = op === 'and';
        var isOr = op === 'or';
        var isNot = op === 'not';
        var result = (isAnd || isNot) ? true : false;
        var value;
        var parseVal;
        var resultant = [];
        var ranges = args;
        for (var i = 0; i < ranges.length; i++) {
            if (ranges[i] === (this.tic)) {
                return this.getErrorStrings()[CommonErrors.Value];
            }
            if (this.isCellReference(ranges[i])) {
                var cells = this.getCellCollection(ranges[i]);
                for (var j = 0; j < cells.length; j++) {
                    if (this.getErrorStrings().indexOf(cells[j]) > -1) {
                        return cells[j];
                    }
                    else if (cells[j][0] === this.tic) {
                        return this.getErrorStrings()[CommonErrors.Name];
                    }
                    value = this.getValueFromArg(cells[j]);
                    if (this.getErrorStrings().indexOf(value) > -1) {
                        return value;
                    }
                    parseVal = this.parseFloat(value);
                    if (value === this.falseValue || (value !== '' && parseVal === 0) || (isNot && value === '')) {
                        resultant.push(this.falseValue);
                    }
                    else if (value === this.trueValue || !isNaN(parseVal) && value !== '') {
                        resultant.push(this.trueValue);
                    }
                    else if (value === '' || isNaN(parseVal)) {
                        resultant.push(this.getErrorStrings()[CommonErrors.Value]);
                    }
                }
            }
            else {
                value = this.getValueFromArg(ranges[i]).split(this.tic).join('').toUpperCase();
                if (this.getErrorStrings().indexOf(value) > -1) {
                    return value;
                }
                parseVal = this.parseFloat(value);
                if (value === this.falseValue || ranges[i] === '' || (value !== '' && parseVal === 0)) {
                    resultant.push(this.falseValue);
                }
                else if (value === this.trueValue || !isNaN(parseVal) && value !== '') {
                    resultant.push(this.trueValue);
                }
                else if (value === '' || isNaN(parseVal)) {
                    resultant.push(this.getErrorStrings()[CommonErrors.Value]);
                }
            }
        }
        var containsOnlyValueError = resultant.every(function (item) { return item === _this.getErrorStrings()[CommonErrors.Value]; });
        if (containsOnlyValueError) {
            return this.getErrorStrings()[CommonErrors.Value];
        }
        for (var j = 0; j < resultant.length; j++) {
            if ((isAnd || isNot) && resultant[j] === this.falseValue) {
                result = false;
                break;
            }
            if (isOr && resultant[j] === this.trueValue) {
                result = true;
                break;
            }
        }
        result = isNot ? !result : result;
        return result ? this.trueValue : this.falseValue;
    };
    /**
     * @hidden
     * @param {string} text - specify the text
     * @returns {string} - to strip out the tic from the formula arguments.
     */
    // To strip out the tic from the formula arguments.
    Calculate.prototype.removeTics = function (text) {
        if (text.length > 1 && text[0] === this.tic[0] && text[text.length - 1] === this.tic[0]) {
            text = this.substring(text, 1, text.length - 2);
        }
        return text;
    };
    /**
     * @hidden
     * @param {string} range - specify the range
     * @returns {string} - to get cell from the range.
     */
    Calculate.prototype.getCellFrom = function (range) {
        var cellRange = '';
        var cells = range.indexOf(':') > -1 ? range.split(':') : [range];
        //this.getCellsFromArgs(range);
        var last = cells.length - 1;
        var r1 = this.rowIndex(cells[0]);
        var x;
        if (r1 === this.rowIndex(cells[last])) {
            var c1 = this.colIndex(cells[0]);
            var c2 = this.colIndex(cells[last]);
            var c = this.colIndex(this.cell);
            if (c >= c1 && c <= c2) {
                cellRange = getAlphalabel(c).toString() + r1.toString();
            }
        }
        else if (this.colIndex(cells[0]) === this.colIndex(cells[last])) {
            x = this.colIndex(cells[0]);
            var r2 = this.rowIndex(cells[last]);
            var r = this.rowIndex(this.cell);
            if (r >= r1 && r <= r2) {
                cellRange = getAlphalabel(x).toString() + r.toString();
            }
        }
        return cellRange;
    };
    Calculate.prototype.computeValue = function (pFormula, refresh, isIfError) {
        try {
            var stack = [];
            var i = 0;
            var sheet = '';
            stack.length = 0;
            var decimalSep = this.getParseDecimalSeparator();
            while (i < pFormula.length) {
                var uFound = pFormula[i] === 'u'; // for 3*-2
                if (uFound) {
                    i = i + 1; // for the cell reference cases, like A1*-A2.
                }
                if (pFormula[i] === this.arithMarker) {
                    i = i + 1;
                    continue;
                }
                else if (this.isDigit(pFormula[i])) {
                    var s = this.emptyString;
                    while (i < pFormula.length && (this.isDigit(pFormula[i]) ||
                        pFormula[i] === decimalSep)) {
                        s += pFormula[i] === decimalSep ? '.' : pFormula[i];
                        i = i + 1;
                    }
                    stack.push(s);
                    if (!pFormula[i]) {
                        return stack.toString();
                    }
                }
                if (pFormula[i] === this.sheetToken) {
                    sheet = pFormula[i];
                    i = i + 1;
                    while (i < pFormula.length && pFormula[i] !== this.sheetToken) {
                        sheet = sheet + pFormula[i];
                        i = i + 1;
                    }
                    if (i < pFormula.length) {
                        sheet = sheet + pFormula[i];
                        i = i + 1;
                    }
                }
                else if (this.isUpperChar(pFormula[i])) {
                    var s = this.emptyString;
                    var textName = '';
                    while (i < pFormula.length && this.isUpperChar(pFormula[i])) {
                        var char = pFormula[i];
                        s = s + char;
                        i = i + 1;
                    }
                    while (i < pFormula.length && this.isDigit(pFormula[i])) {
                        var digit = pFormula[i];
                        s = s + digit;
                        i = i + 1;
                    }
                    if (i < pFormula.length && pFormula[i] === ':') {
                        s = s + pFormula[i];
                        i = i + 1;
                        if (i < pFormula.length && pFormula[i] === this.sheetToken) {
                            s = s + pFormula[i];
                            i = i + 1;
                            while (i < pFormula.length && pFormula[i] !== this.sheetToken) {
                                s = s + pFormula[i];
                                i = i + 1;
                            }
                        }
                        while (i < pFormula.length && this.isUpperChar(pFormula[i])) {
                            s = s + pFormula[i];
                            i = i + 1;
                        }
                        while (i < pFormula.length && this.isDigit(pFormula[i])) {
                            s = s + pFormula[i];
                            i = i + 1;
                        }
                        s = sheet + this.getCellFrom(s);
                    }
                    else {
                        s = sheet + s;
                    }
                    textName = this.getParentObjectCellValue(s, refresh).toString();
                    sheet = '';
                    if (typeof textName === 'string' && this.getErrorStrings().indexOf(textName) > -1) {
                        return textName;
                    }
                    if (uFound) {
                        if (!this.isNaN(this.parseFloat(textName))) {
                            textName = (-(this.parseFloat(textName))).toString();
                        }
                        else {
                            textName = '-' + textName;
                        }
                    }
                    stack.push(textName);
                }
                else if (pFormula[i] === 'q') {
                    var leftIdx = pFormula.substring(i + 1).indexOf(this.leftBracket);
                    var j = pFormula.substring(i + leftIdx + 1).indexOf(this.rightBracket);
                    pFormula = this.substring(pFormula, i + leftIdx + 2, j - 1);
                }
                else if (pFormula[i] === this.tic[0]) {
                    var s = pFormula[i].toString();
                    i = i + 1;
                    while (i < pFormula.length && pFormula[i] !== this.tic[0]) {
                        s = s + pFormula[i];
                        i = i + 1;
                    }
                    var textName = s.split(this.tic).join(this.emptyString);
                    if (textName === this.trueValue || textName === this.falseValue ||
                        (!this.isNaN(this.parseFloat(textName)) && textName !== '')) {
                        stack.push(this.tic + textName + this.tic);
                    }
                    else {
                        stack.push(textName);
                    }
                    i = i + 1;
                }
                else if (pFormula[i] === '%' && stack.length > 0) {
                    var stackValue = stack[0];
                    var value = this.parseFloat(stackValue);
                    if (!this.isNaN(value)) {
                        stack.pop();
                        stack.push((value / 100).toString());
                    }
                    i = i + 1;
                }
                else if ((pFormula.substring(i)).indexOf(this.trueValue) === 0) {
                    stack.push(this.trueValue);
                    i += this.trueValue.length;
                }
                else if (pFormula.substring(i).indexOf(this.falseValue) === 0) {
                    stack.push(this.falseValue);
                    i += this.falseValue.length;
                }
                else if (pFormula[i] === this.tic[0] || pFormula[i] === '|') {
                    var s = pFormula[i].toString();
                    i++;
                    while (i < pFormula.length && pFormula[i] !== this.tic[0]) {
                        s = s + pFormula[i];
                        i = i + 1;
                    }
                    stack.push(s + this.tic);
                    i += 1;
                }
                else {
                    if (pFormula[i] === ' ' && i < pFormula.length - 1) {
                        i += 1;
                        continue;
                    }
                    switch (pFormula[i]) {
                        case '#':
                            {
                                var errIndex = 0;
                                if (this.getErrorStrings().indexOf(pFormula.substring(i)) > -1) {
                                    if (pFormula.indexOf('!') === -1 || pFormula.substring(i).indexOf('!') === -1) {
                                        errIndex = pFormula.indexOf('#N/A') > -1 ? (pFormula.indexOf('#N/A') + 4 + i) : pFormula.indexOf('?') + 1 + i;
                                    }
                                    else {
                                        errIndex = pFormula.indexOf('!') + 1 + i;
                                    }
                                    stack.push(this.substring(pFormula, i, errIndex - i));
                                }
                                else {
                                    errIndex = i + 1;
                                    stack.push(this.substring(pFormula, i, errIndex - i));
                                }
                                i = errIndex;
                            }
                            break;
                        case 'n':
                            {
                                i = i + 1;
                                var s = '';
                                if (pFormula[i] === 'n') {
                                    continue;
                                }
                                if (pFormula.substring(i).indexOf('Infinity') === 0) {
                                    s = 'Infinity';
                                    i += s.length;
                                }
                                else {
                                    if (pFormula[i] === 'u' || uFound || pFormula[i] === '-') {
                                        s = '-';
                                        if (!uFound) {
                                            i = i + 1;
                                        }
                                        else {
                                            uFound = false;
                                        }
                                    }
                                    while (i < pFormula.length && (this.isDigit(pFormula[i]) ||
                                        (pFormula[i] === decimalSep || pFormula[i] === '.'))) {
                                        s += pFormula[i] === decimalSep ? '.' : pFormula[i];
                                        i = i + 1;
                                    }
                                    if (i < pFormula.length && pFormula[i] === '%') {
                                        i = i + 1;
                                        if (s === '') {
                                            if (stack.length > 0) {
                                                var stackValue = stack[0];
                                                var value = this.parseFloat(stackValue);
                                                if (!this.isNaN(value)) {
                                                    stack.pop();
                                                    stack.push((value / 100).toString());
                                                }
                                            }
                                        }
                                        else {
                                            s = (this.parseFloat(s) / 100).toString();
                                        }
                                    }
                                }
                                if (s) {
                                    stack.push(s);
                                }
                            }
                            break;
                        case this.parser.tokenAdd:
                            {
                                this.getValArithmetic(stack, 'add', isIfError);
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenSubtract:
                            {
                                this.getValArithmetic(stack, 'sub', isIfError);
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenMultiply:
                            {
                                this.getValArithmetic(stack, 'mul', isIfError);
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenDivide:
                            {
                                this.getValArithmetic(stack, 'div', isIfError);
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenLess:
                            {
                                this.processLogical(stack, 'less');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenGreater:
                            {
                                this.processLogical(stack, 'greater');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenGreaterEq:
                            {
                                this.processLogical(stack, 'greaterEq');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenLessEq:
                            {
                                this.processLogical(stack, 'lessEq');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenNotEqual:
                            {
                                this.processLogical(stack, 'notEq');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenOr:
                            {
                                this.processLogical(stack, 'or');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenAnd:
                            {
                                this.processLogical(stack, 'and');
                                i = i + 1;
                            }
                            break;
                        case this.parser.tokenEqual:
                            {
                                this.processLogical(stack, 'equal');
                                i = i + 1;
                            }
                            break;
                        default: {
                            return this.getErrorStrings()[CommonErrors.Value];
                        }
                    }
                }
            }
            if (stack.length === 0) {
                return this.emptyString;
            }
            else {
                var s = this.emptyString;
                var countValue = stack.length;
                while (countValue > 0) {
                    var sCheck = stack.pop();
                    if (this.getErrorStrings().indexOf(sCheck) > -1) {
                        return sCheck;
                    }
                    else {
                        s = sCheck + s;
                        if (s === this.emptyString && this.isCellReference(pFormula) &&
                            this.getTreatEmptyStringAsZero()) {
                            return '0';
                        }
                        countValue--;
                    }
                }
                return s;
            }
        }
        catch (ex) {
            if (this.getErrorStrings().indexOf(ex) > -1 || this.formulaErrorStrings.indexOf(ex) > -1) {
                throw ex;
            }
            throw new FormulaError(this.formulaErrorStrings[FormulasErrorsStrings.InvalidExpression]);
        }
    };
    Calculate.prototype.getValArithmetic = function (stack, operator, isIfError) {
        var isErrorString = false;
        var num1 = stack.pop();
        var decimalCount1 = num1.indexOf('.') !== -1 ? num1.split('.')[1].length : 0;
        var factor1 = Math.pow(10, decimalCount1);
        var num2 = stack.pop();
        var decimalCount2 = num2.indexOf('.') !== -1 ? num2.split('.')[1].length : 0;
        var factor2 = Math.pow(10, decimalCount2);
        var bigFactor = factor1 >= factor2 ? factor1 : factor2;
        var factors = factor1 * factor2;
        num1 = num1 === this.trueValue ? '1' : (num1 === this.falseValue ? '0' : num1);
        num1 = num1 === this.emptyString ? '0' : (this.getErrorStrings().indexOf(num1.toString()) < 0 ? this.parseFloat(num1 + '').toString() : num1);
        var num = Number(num1);
        if (isNaN(num) && !isIfError) {
            isErrorString = true;
            if (num1 === this.getErrorStrings()[CommonErrors.DivZero]) {
                stack.push(this.getErrorStrings()[CommonErrors.DivZero]);
            }
            else {
                stack.push(this.getErrorStrings()[CommonErrors.Value]);
            }
        }
        num2 = num2 === this.trueValue ? '1' : (num2 === this.falseValue ? '0' : num2);
        num2 = num2 === this.emptyString ? '0' : (this.getErrorStrings().indexOf(num2.toString()) < 0 ? this.parseFloat(num2 + '').toString() : num2);
        num = Number(num2);
        if (isNaN(num) && !isIfError) {
            isErrorString = true;
            if (num2 === this.getErrorStrings()[CommonErrors.DivZero]) {
                stack.push(this.getErrorStrings()[CommonErrors.DivZero]);
            }
            else {
                stack.push(this.getErrorStrings()[CommonErrors.Value]);
            }
        }
        if (operator === 'add' && !isErrorString) {
            stack.push(((((Number(num2) * bigFactor) + (Number(num1) * bigFactor)) / bigFactor)).toString());
        }
        if (operator === 'sub' && !isErrorString) {
            stack.push(((((Number(num2) * bigFactor) - (Number(num1) * bigFactor)) / bigFactor)).toString());
        }
        if (operator === 'mul' && !isErrorString) {
            stack.push(((((Number(num2) * factor2) * (Number(num1) * factor1)) / factors)).toString());
        }
        if (operator === 'div' && !isErrorString) {
            if (this.isNaN(this.parseFloat(num1)) || this.isNaN(this.parseFloat(num2))) {
                stack.push(this.getErrorStrings()[CommonErrors.Value]);
            }
            else if (this.parseFloat(num1) === 0) {
                stack.push(this.getErrorStrings()[CommonErrors.DivZero]);
            }
            else {
                stack.push(((Number(num2) * factors) / (Number(num1) * factors)).toString());
            }
        }
    };
    /**
     * Used to perform logical operation between two values.
     *
     * @hidden
     * @param {string[]} stack - Specifies the values that are used to perform the logical operation.
     * @param {string} operator - Specifies the logical operator.
     * @returns {string} - It returns whether the logical operation is TRUE or FALSE.
     */
    Calculate.prototype.processLogical = function (stack, operator) {
        var val1;
        var val2;
        var value1;
        var value2;
        var isOnlyAsterisk;
        var result;
        var isErrorString = false;
        if (operator !== 'and' && operator !== 'equal') {
            val1 = stack.pop();
            val2 = stack.pop();
            if (this.getErrorStrings().indexOf(val1) > -1) {
                result = val1;
                isErrorString = true;
            }
            else if (this.getErrorStrings().indexOf(val2) > -1) {
                result = val2;
                isErrorString = true;
            }
            if (this.isNaN(this.parseFloat(val1)) && this.isNaN(this.parseFloat(val2))) {
                val1 = val1.toString().toLowerCase();
                val2 = val2.toString().toLowerCase();
            }
            if (!isNullOrUndefined(val1)) {
                value1 = val1.indexOf(this.tic) > -1 ? val1 : this.parseFloat(val1);
            }
            if (!isNullOrUndefined(val2)) {
                value2 = val2.indexOf(this.tic) > -1 ? val2 : this.parseFloat(val2);
            }
            if (val1 === '*' && this.isNaN(this.parseFloat(val2)) && val2 !== '') {
                isOnlyAsterisk = true;
            }
        }
        if (operator === 'less' && !isErrorString) {
            if (!this.isNaN(value1) && !this.isNaN(value2)) {
                result = (value2 < value1) ? this.trueValue : this.falseValue;
            }
            else {
                result = (val2.toUpperCase().split(this.tic).join('').localeCompare(val1.toUpperCase().split(this.tic).join('')) < 0) ?
                    this.trueValue : this.falseValue;
            }
        }
        if (operator === 'greater' && !isErrorString) {
            if (!this.isNaN(value1) && !this.isNaN(value2)) {
                result = (value2 > value1) ? this.trueValue : this.falseValue;
            }
            else {
                result = (val2.toUpperCase().split(this.tic).join('').localeCompare(val1.toUpperCase().split(this.tic).join('')) > 0) ?
                    this.trueValue : this.falseValue;
            }
        }
        if (operator === 'lessEq' && !isErrorString) {
            if (!this.isNaN(value1) && !this.isNaN(value2)) {
                result = (value2 <= value1) ? this.trueValue : this.falseValue;
            }
            else {
                result = (val2.toUpperCase().split(this.tic).join('').localeCompare(val1.toUpperCase().split(this.tic).join('')) <= 0) ?
                    this.trueValue : this.falseValue;
            }
        }
        if (operator === 'greaterEq' && !isErrorString) {
            if (!this.isNaN(value1) && !this.isNaN(value2)) {
                result = (value2 >= value1) ? this.trueValue : this.falseValue;
            }
            else {
                result = (val2.toUpperCase().split(this.tic).join('').localeCompare(val1.toUpperCase().split(this.tic).join('')) >= 0) ?
                    this.trueValue : this.falseValue;
            }
        }
        if (operator === 'notEq' && !isErrorString) {
            result = (val2 !== val1) ? this.trueValue : this.falseValue;
            if (isOnlyAsterisk) {
                result = this.falseValue;
            }
        }
        if (operator === 'and' && !isErrorString) {
            val1 = stack.pop().toString();
            val2 = '';
            if (stack.length > 0) {
                val2 = stack.pop().toString();
            }
            if (this.getErrorStrings().indexOf(val1) > -1) {
                result = val1;
            }
            else if (this.getErrorStrings().indexOf(val2) > -1) {
                result = val2;
            }
            else {
                result = this.emptyString + val2 + val1 + this.emptyString;
                result = result.split(this.tic).join('');
            }
        }
        if (operator === 'equal' && !isErrorString) {
            val1 = stack.pop();
            val2 = stack.pop();
            if (this.getErrorStrings().indexOf(val1) > -1) {
                result = val1;
            }
            else if (this.getErrorStrings().indexOf(val2) > -1) {
                result = val2;
            }
            else {
                if (this.isNaN(this.parseFloat(val1)) && this.isNaN(this.parseFloat(val2))) {
                    val1 = val1.toString().toLowerCase();
                    val2 = val2.toString().toLowerCase();
                }
                if (val1 === '*' && this.isNaN(this.parseFloat(val2)) && val2 !== '') {
                    isOnlyAsterisk = true;
                }
                result = val1 === val2 || isOnlyAsterisk ? this.trueValue : this.falseValue;
            }
        }
        if (operator === 'or' && !isErrorString) {
            result = Math.pow(this.parseFloat(value2), this.parseFloat(value1)).toString();
            result = this.isNaN(this.parseFloat(result)) ? this.getErrorStrings()[CommonErrors.Value] : result;
        }
        stack.push(result);
        return result;
    };
    /**
     * @hidden
     * @param {StoredCellInfo} sCell - specified the cell information
     * @returns {string[]} - compute stored cells
     */
    Calculate.prototype.computeStoreCells = function (sCell) {
        var cellValue = sCell.cellValue;
        var cellRanges = sCell.cellRange;
        var criterias = sCell.criteria;
        var argArr = sCell.argArray;
        var isCriteria = sCell.isCriteria;
        var storeCell = sCell.storedCells;
        var isCountIfs = sCell.isCountIfS === this.trueValue;
        var i = sCell.countVal || 0;
        var rangeLength = isCriteria === this.trueValue ? storeCell : cellValue;
        var tempStoredCell = [];
        var criteria;
        for (var j = 0; j < rangeLength.length; j++) {
            var stack = [];
            var cellVal = this.getValueFromArg(cellValue[j]);
            var arrValue = argArr[isCountIfs ? (1 + (i * 2)) : (2 + i)];
            var isStringVal = arrValue.startsWith(this.tic) && arrValue.endsWith(this.tic);
            criteria = arrValue.trim().split(this.tic).join(this.emptyString);
            var isAsterisk = criteria.includes('*');
            var isAsteriskOnly = criteria === '*' || criteria === '<>*';
            var criteriaValue = isAsterisk && !isAsteriskOnly ? criteria.replace(/\*/g, '').trim() : criteria;
            var isCellReferenceValue = false;
            if (!isStringVal && this.isCellReference(criteriaValue)) {
                criteriaValue = this.getValueFromArg(criteriaValue);
                isCellReferenceValue = true;
            }
            if (isAsterisk && !isAsteriskOnly) {
                var asteriskIndex = criteria.indexOf('*');
                if (criteria[0] === '*') {
                    criteriaValue = '*' + criteriaValue;
                }
                if (criteria[criteria.length - 1] === '*') {
                    criteriaValue += '*';
                }
                if (asteriskIndex > 0 && asteriskIndex < criteria.length - 1) {
                    criteriaValue = criteria.substring(0, asteriskIndex) + '*' + criteria.substring(asteriskIndex + 1);
                }
            }
            criteria = criteriaValue;
            var newCell = '';
            isCriteria = isCountIfs ? this.trueValue : isCriteria;
            if (isCriteria === this.trueValue) {
                var cell = '';
                var count = 0;
                var newCount = 0;
                var prevCriteria = void 0;
                var prevCriteriaIdx = void 0;
                var prevStoreCellIdx = void 0;
                var criteriaRangeIndexes = void 0;
                storeCell[j] = isCountIfs && !i ? cellValue[j] : storeCell[j];
                cell = storeCell[j];
                if (i) {
                    prevCriteria = cellRanges[i - 1];
                    prevCriteriaIdx = prevCriteria.indexOf('!') > -1 ? getRangeIndexes(prevCriteria.substring(prevCriteria.lastIndexOf('!') + 1)) : getRangeIndexes(prevCriteria);
                    prevStoreCellIdx = cell.indexOf('!') > -1 ? getCellIndexes(cell.substring(cell.lastIndexOf('!') + 1)) : getCellIndexes(cell);
                    criteriaRangeIndexes = cellRanges[i].indexOf('!') > -1 ?
                        getRangeIndexes(cellRanges[i].substring(cellRanges[i].lastIndexOf('!') + 1)) :
                        getRangeIndexes(cellRanges[i]);
                }
                var isCriteriaFromOtherSheet = cell.indexOf('!') > -1;
                var isSumFromOtherSheet = void 0;
                var sumRangeSheet = '';
                var criteriaRangeSheet = '';
                if (isCriteriaFromOtherSheet) {
                    criteriaRangeSheet = cell.substring(0, cell.lastIndexOf('!') + 1);
                    cell = cell.substring(cell.lastIndexOf('!') + 1);
                }
                // convert the new cell ranges  for find in range with criteria.
                while (!this.isDigit(cell[count])) {
                    count = count + 1;
                }
                if (this.isCellReference(cellRanges[i]) && cellRanges[i].indexOf(':') > -1) {
                    newCell = isCountIfs && !i ? (rangeLength[j].indexOf('!') > -1 ? rangeLength[j].substring(rangeLength[j].lastIndexOf('!') + 1) : rangeLength[j]) : getCellAddress(criteriaRangeIndexes[0] + (prevStoreCellIdx[0] - prevCriteriaIdx[0]), criteriaRangeIndexes[1] +
                        (prevStoreCellIdx[1] - prevCriteriaIdx[1]));
                    isSumFromOtherSheet = cellRanges[i].indexOf('!') > -1;
                    if (isSumFromOtherSheet) {
                        sumRangeSheet = cellRanges[i].substring(0, cellRanges[i].lastIndexOf('!') + 1);
                    }
                    while (!this.isDigit(newCell[newCount])) {
                        newCount = newCount + 1;
                    }
                }
                var cellAlpha = this.substring(cell, count);
                var newCellAlpha = this.substring(newCell, newCount);
                var cellNumeric = this.substring(cell, count, cell.length - count);
                var newCellNumeric = this.substring(newCell, newCount, newCell.length - count);
                if (isCriteriaFromOtherSheet) {
                    cellAlpha = criteriaRangeSheet + cellAlpha;
                    newCellAlpha = criteriaRangeSheet + newCellAlpha;
                }
                if (cellNumeric !== newCellNumeric) {
                    storeCell[j] = this.substring(storeCell[j], isCriteriaFromOtherSheet ? (criteriaRangeSheet.length + count) : count) + newCellNumeric;
                }
                newCell = storeCell[j].split(cellAlpha).join(newCellAlpha);
                if (isSumFromOtherSheet) {
                    if (newCell.indexOf('!') > -1) {
                        newCell = newCell.substring(newCell.lastIndexOf('!') + 1);
                    }
                    newCell = sumRangeSheet + newCell;
                }
                else {
                    newCell = newCell.substring(newCell.lastIndexOf('!') + 1);
                }
                cellVal = this.getValueFromArg(newCell);
                criteria = isCountIfs ? criteria : criterias[i - 1].split(this.tic).join(this.emptyString);
            }
            var op = 'equal';
            if (criteria.startsWith('<=')) {
                op = 'lessEq';
                criteria = criteria.substring(2);
            }
            else if (criteria.startsWith('>=')) {
                op = 'greaterEq';
                criteria = criteria.substring(2);
            }
            else if (criteria.startsWith('<>')) {
                op = 'notEq';
                criteria = criteria.substring(2);
            }
            else if (criteria.startsWith('<')) {
                op = 'less';
                criteria = criteria.substring(1);
            }
            else if (criteria.startsWith('>')) {
                op = 'greater';
                criteria = criteria.substring(1);
            }
            else if (criteria.startsWith('=')) {
                op = 'equal';
                criteria = criteria.substring(1);
            }
            if ((!isStringVal && this.isCellReference(criteria) && (!isCellReferenceValue || (newCell !== '' && !isCountIfs))) || criteria.includes(this.arithMarker)) {
                criteria = this.getValueFromArg(criteria);
            }
            if (criteria.indexOf('*') > -1 || criteria.indexOf('?') > -1) {
                cellVal = this.findWildCardValue(criteria.toLowerCase(), cellVal.toLowerCase());
            }
            stack.push(cellVal.toLowerCase());
            stack.push(criteria.toLowerCase());
            if (this.processLogical(stack, op) === this.trueValue) {
                if (isCriteria === this.falseValue) {
                    tempStoredCell.push(cellValue[j]);
                }
                else {
                    tempStoredCell.push(newCell);
                }
            }
        }
        storeCell = tempStoredCell;
        tempStoredCell = [];
        return storeCell;
    };
    Calculate.prototype.computeIfsFormulas = function (range, isCountIfs, isAvgIfs) {
        if (isCountIfs === this.trueValue && (isNullOrUndefined(range) || range[0] === '' || range.length < 2 || range.length > 127 ||
            range.length % 2 !== 0)) {
            return this.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        var argArr = range;
        var cellRanges = [];
        var criterias = [];
        var storedCell = [];
        var storedCellLength = 0;
        var sum = 0;
        for (var i = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(':') > -1 && this.isCellReference(argArr[i])) {
                cellRanges.push(argArr[i].trim());
            }
            else {
                criterias.push(argArr[i].trim());
            }
        }
        var len = [];
        for (var i = 0; i < cellRanges.length; i++) {
            len.push(this.getCellCollection(cellRanges[i]).length);
        }
        for (var j = 0; j < len.length; j++) {
            if (len[j] && len[j + 1] && len[j] !== len[j + 1]) {
                return this.getErrorStrings()[CommonErrors.Value];
            }
        }
        for (var k = 0; k < criterias.length; k++) {
            if (criterias[k] === '') {
                if (isAvgIfs === this.trueValue) {
                    return this.getErrorStrings()[CommonErrors.DivZero];
                }
                return 0;
            }
        }
        var cellvalue;
        var isCriteria;
        if (isCountIfs === this.falseValue) {
            isCriteria = this.falseValue;
            cellvalue = this.getCellCollection(cellRanges[1]);
            var sCell = {
                cellValue: cellvalue, cellRange: cellRanges, criteria: criterias,
                argArray: argArr, isCriteria: isCriteria, storedCells: storedCell, isCountIfS: isCountIfs
            };
            storedCell = this.computeStoreCells(sCell);
            storedCellLength = storedCell.length;
            if (storedCellLength === 0) {
                return isAvgIfs === this.trueValue ? this.getErrorStrings()[CommonErrors.DivZero] : 0;
            }
        }
        // Compare criteria and convert the new cell ranges.
        var startRange = isCountIfs === this.trueValue ? 0 : 2;
        for (var i = startRange; i < cellRanges.length; i++) {
            isCriteria = this.trueValue;
            isCriteria = isCountIfs === this.trueValue && i === 0 ? this.falseValue : this.trueValue;
            cellvalue = this.getCellCollection(cellRanges[i]);
            var sCell = {
                cellValue: cellvalue, cellRange: cellRanges, criteria: criterias,
                argArray: argArr, isCriteria: isCriteria, storedCells: storedCell, isCountIfS: isCountIfs, countVal: i
            };
            storedCell = this.computeStoreCells(sCell);
            storedCellLength = storedCell.length;
            if (storedCellLength === 0) {
                return isAvgIfs === this.trueValue ? this.getErrorStrings()[CommonErrors.DivZero] : 0;
            }
        }
        var avgValCount = 0;
        var sumRangeIndexes = cellRanges[0].indexOf('!') > -1 ?
            getRangeIndexes(cellRanges[0].substring(cellRanges[0].lastIndexOf('!') + 1)) : getRangeIndexes(cellRanges[0]);
        var lastCriteria = cellRanges[cellRanges.length - 1];
        var criteriaRangeIndexes = lastCriteria.indexOf('!') > -1 ?
            getRangeIndexes(lastCriteria.substring(lastCriteria.lastIndexOf('!') + 1)) : getRangeIndexes(lastCriteria);
        for (var j = 0; j < storedCell.length; j++) {
            // convert the new cell ranges  for find sum in range 0(first range)
            var cell = '';
            var newCell = '';
            var count = 0;
            var newCount = 0;
            cell = storedCell[j];
            var isCriteriaFromOtherSheet = cell.indexOf('!') > -1;
            var isSumFromOtherSheet = void 0;
            var sumRangeSheet = '';
            var criteriaRangeSheet = '';
            if (isCriteriaFromOtherSheet) {
                criteriaRangeSheet = cell.substring(0, cell.lastIndexOf('!') + 1);
                cell = cell.substring(cell.lastIndexOf('!') + 1);
            }
            while (!this.isDigit(cell[count])) {
                count = count + 1;
            }
            if (this.isCellReference(cellRanges[0]) && cellRanges[0].indexOf(':') > -1) {
                newCell = getCellAddress(sumRangeIndexes[0] + (getCellIndexes(cell)[0] - criteriaRangeIndexes[0]), sumRangeIndexes[1] + (getCellIndexes(cell)[1] - criteriaRangeIndexes[1]));
                isSumFromOtherSheet = cellRanges[0].indexOf('!') > -1;
                if (isSumFromOtherSheet) {
                    sumRangeSheet = cellRanges[0].substring(0, cellRanges[0].lastIndexOf('!') + 1);
                }
                while (!this.isDigit(newCell[newCount])) {
                    newCount = newCount + 1;
                }
            }
            var cellAlpha = this.substring(cell, count);
            var newCellAlpha = this.substring(newCell, newCount);
            var cellNumeric = this.substring(cell, count, cell.length - count);
            var newCellNumeric = this.substring(newCell, newCount, newCell.length - count);
            if (isCriteriaFromOtherSheet) {
                cellAlpha = criteriaRangeSheet + cellAlpha;
                newCellAlpha = criteriaRangeSheet + newCellAlpha;
            }
            if (cellNumeric !== newCellNumeric) {
                storedCell[j] = this.substring(storedCell[j], isCriteriaFromOtherSheet ? (criteriaRangeSheet.length + count) : count) + newCellNumeric;
            }
            cellvalue = storedCell[j].split(cellAlpha).join(newCellAlpha);
            if (isSumFromOtherSheet) {
                if (cellvalue.indexOf('!') > -1) {
                    cellvalue = cellvalue.substring(cellvalue.lastIndexOf('!') + 1);
                }
                cellvalue = sumRangeSheet + cellvalue;
            }
            else {
                cellvalue = cellvalue.substring(cellvalue.lastIndexOf('!') + 1);
            }
            if (isCountIfs === this.trueValue) {
                sum = sum + 1;
            }
            else {
                var argValue = this.getValueFromArg(cellvalue);
                var newArgValue = parseFloat(argValue === '' && isAvgIfs !== this.trueValue ? '0' : argValue);
                if (this.isNumber(newArgValue)) {
                    avgValCount++;
                    sum = sum + newArgValue;
                }
            }
        }
        if (isAvgIfs === this.trueValue) {
            sum = sum / avgValCount;
        }
        return sum;
    };
    Calculate.prototype.processNestedFormula = function (pText, sFormula, fResult) {
        if (fResult && !fResult.toString().includes('"')) {
            var formulaEndIdx = pText.indexOf(sFormula) + sFormula.length;
            if (pText[formulaEndIdx] === '"' && this.getErrorStrings().indexOf(fResult.toString()) < 0 &&
                !this.isNumber(fResult) && fResult !== this.trueValue && fResult !== this.falseValue) {
                return pText.split(sFormula).join('"' + fResult + '"');
            }
        }
        return pText.split(sFormula).join('n' + fResult);
    };
    /**
     * @hidden
     * @param {string | number} value - Specify the value
     * @returns {boolean} -  Returns boolean value
     */
    Calculate.prototype.isNaN = function (value) {
        if (value.toString() === 'NaN' || typeof value === 'string') {
            return true;
        }
        return false;
    };
    /**
     * @hidden
     * @param {string} val - Specifies the value.
     * @returns {boolean} - Returns boolean value.
     */
    Calculate.prototype.isNumber = function (val) {
        return val - parseFloat(val) >= 0;
    };
    /**
     * @hidden
     * @param {number} doubleNumber - To specify the double number
     * @returns {Date} - Returns date.
     */
    Calculate.prototype.fromOADate = function (doubleNumber) {
        doubleNumber = (doubleNumber > 0 && doubleNumber < 1) ? (1 + doubleNumber) : (doubleNumber === 0) ? 1 : doubleNumber;
        if (doubleNumber > 60) {
            doubleNumber -= 1; // Due to leap year issue of 1900 in MSExcel.
        }
        var result = new Date('01/01/1900');
        var resultDateUTC = Date.UTC(result.getFullYear(), result.getMonth(), result.getDate(), result.getHours(), result.getMinutes(), result.getSeconds(), result.getMilliseconds());
        return new Date(new Date(((doubleNumber - 1) * (this.millisecondsOfaDay)) + resultDateUTC).toUTCString().replace(' GMT', ''));
    };
    /**
     * @hidden
     * @param {number} year - Specify the year.
     * @param {number} month - Specify the month.
     * @param {number} day - Specify the day.
     * @returns {number} -  to get serial date from date.
     */
    Calculate.prototype.getSerialDateFromDate = function (year, month, day) {
        var days = 0;
        if (year < 1900) {
            year += 1900;
        }
        var isValidMonth = false;
        while (!isValidMonth) {
            while (month > 12) {
                year++;
                month -= 12;
            }
            while (month < 1) {
                month += 12;
                year--;
            }
            isValidMonth = true;
            var tempDay = new Date(year, month, 1, -1).getDate();
            while (day > tempDay) {
                tempDay = new Date(year, month, 1, -1).getDate();
                month++;
                day -= tempDay;
                isValidMonth = false;
            }
            if (day < 1) {
                month--;
                if (month < 1) {
                    month = 12;
                    year--;
                }
                tempDay = new Date(year, month, 1, -1).getDate();
                day = tempDay + day;
                isValidMonth = false;
            }
        }
        var dateTime = Date.parse(year + "/" + month + "/" + day);
        if (!this.isNaN(dateTime)) {
            days = this.toOADate(new Date(dateTime));
        }
        return days;
    };
    /**
     * @hidden
     * @param {string | number} value - Specify the Time
     * @returns {string} -  returns to time.
     */
    Calculate.prototype.intToTime = function (value) {
        var val = value.toString().split('.');
        if (!isNullOrUndefined(val[1])) {
            value = parseFloat(val[0] + 1 + '.' + val[1]) || value;
        }
        return this.intToDate(value.toString());
    };
    /**
     * @hidden
     * @param {Date} dateTime - Specify the date Time
     * @param {boolean} isTime - Specify the boolean value.
     * @param {boolean} isTimeOnly - Specify the value is only a time without date.
     * @returns {number} -  returns to date.
     */
    Calculate.prototype.toOADate = function (dateTime, isTime, isTimeOnly) {
        var startDate = new Date('01/01/1900');
        var date = isDateTime(dateTime) ? dateTime : new Date(dateTime);
        var startDateUTC = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate(), startDate.getHours(), startDate.getMinutes(), startDate.getSeconds(), startDate.getMilliseconds());
        var dateUTC = Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds());
        var diffDays = ((dateUTC - startDateUTC) / (1000 * 3600 * 24));
        return (isTime ? diffDays : parseInt(diffDays.toString(), 10)) + (isTimeOnly ? 0 : (diffDays > 60 ? 2 : 1));
    };
    /**
     * @hidden
     * @param {string} date - Specify the date
     * @returns {string} -  returns calculate Date
     */
    Calculate.prototype.calculateDate = function (date) {
        return (this.parseFloat(date) < 10) ? '0' + date : date;
    };
    /**
     * @hidden
     * @param {string} s - Specify the s
     * @returns {boolean} -  returns boolean value.
     */
    Calculate.prototype.isTextEmpty = function (s) {
        return s === null || s === '';
    };
    /**
     * @hidden
     * @param {string} text - Specify the text
     * @returns {boolean} -  returns boolean value.
     */
    Calculate.prototype.isDigit = function (text) {
        var charCode = text.charCodeAt(0);
        return charCode > 47 && charCode < 58;
    };
    Calculate.prototype.findLastIndexOfq = function (fString) {
        var lastIndexOfq = fString.lastIndexOf('q');
        var lastIndexOflLeftBracket = fString.lastIndexOf(this.leftBracket);
        while (lastIndexOflLeftBracket < lastIndexOfq) {
            lastIndexOfq = fString.substring(0, lastIndexOfq).lastIndexOf('q');
        }
        return lastIndexOfq;
    };
    /**
     * To get the exact value from argument.
     *
     * @param {string} val - Formula argument for getting a exact value.
     * @param {boolean} isUnique - It specifies unique formula or not.
     * @param {boolean} isIfError - It specifies `IFERROR` formula or not.
     * @param {boolean} isSubtotal - It specifies subtotal formula.
     * @returns {string} - To get the exact value from argument.
     */
    Calculate.prototype.getValueFromArg = function (val, isUnique, isIfError, isSubtotal) {
        val = val.trim();
        if (!val || this.getErrorStrings().indexOf(val) > -1) {
            return val;
        }
        var firstChar = val[0];
        if (firstChar === this.tic || firstChar === this.singleTic) {
            var parsedVal = val.split(this.tic).join('');
            if (this.isNaN(this.parseFloat(parsedVal))) {
                var dateTime = this.isDate(parsedVal);
                if (dateTime && !this.isNaN(dateTime.getDate())) {
                    return this.toOADate(dateTime, true).toString();
                }
            }
            if (val.endsWith(this.tic)) {
                var decimalSep = this.getParseDecimalSeparator();
                if (decimalSep !== '.' && parsedVal.includes(decimalSep)) {
                    parsedVal = parsedVal.replace(decimalSep, '.');
                    if (this.isNumber(parsedVal)) {
                        val = parsedVal;
                    }
                }
            }
            return val;
        }
        else if (firstChar === 'u' && val.includes(this.arithMarker)) {
            // To parse - sign with brackets, cell references and nested formulas in the formula arguments. Ex: -(I13+I14+I12)/(-D2+D1) as arguments in formulas.
            val = this.parser.parseSimpleOperators(val.split('u').join('0-'), [this.parser.tokenSubtract], ['-']);
        }
        else {
            var isFirstCharUpper = this.isUpperChar(firstChar);
            if (!isFirstCharUpper) {
                var decimalSep = this.getParseDecimalSeparator();
                if (this.isDigit(firstChar) || firstChar === decimalSep || firstChar === '-' || firstChar === 'n') {
                    if (firstChar === 'n') {
                        val = val.substring(1);
                        if (val.indexOf('"n') > -1) {
                            val = val.replace('"n', '"');
                        }
                    }
                    if (decimalSep !== '.' && val.includes(decimalSep)) {
                        var parsedVal = val.replace(decimalSep, '.');
                        if (this.isNumber(parsedVal)) {
                            val = parsedVal;
                        }
                    }
                    return val;
                }
            }
        }
        var tokenAvail = firstChar === this.sheetToken;
        if (tokenAvail || (this.isUpperChar(firstChar) && !['+', '-', '/', '*', ')', ')', '{'].some(function (opr) { return val.includes(opr); }))) {
            var isCellRef = this.isCellReference(val);
            if (isCellRef && !tokenAvail) {
                var family = this.getSheetFamilyItem(this.grid);
                if (family.sheetNameToParentObject !== null && family.parentObjectToToken.has(this.grid)) {
                    val = family.parentObjectToToken.get(this.grid) + val;
                }
            }
            if (val === this.cell) {
                var dependent = this.getDependentCells().get(val);
                if (dependent != null && dependent.indexOf(val) > -1) {
                    this.arrayRemove(dependent, val);
                }
                if (!this.getDependentFormulaCells().has(this.cell)) {
                    this.clearFormulaDependentCells(this.cell);
                }
                if (!isUnique) {
                    throw new FormulaError(this.formulaErrorStrings[FormulasErrorsStrings.CircularReference]);
                }
            }
            var result = this.getParentObjectCellValue(val, false, isUnique, isSubtotal).toString();
            if (isCellRef) {
                this.updateDependentCell(val);
            }
            return result;
        }
        else {
            return this.computeValue(val, false, isIfError);
        }
    };
    Calculate.prototype.isDate = function (date) {
        if (typeof date === 'object' || Date.parse(date) !== null) {
            var dateVal = void 0;
            if (typeof date === 'string') {
                dateVal = this.checkDateFormat(date);
            }
            else {
                dateVal = new Date(Date.parse(date));
            }
            if (dateVal >= this.dateTime1900) {
                return dateVal;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    };
    Calculate.prototype.isValidCellReference = function (text) {
        var start = 0;
        var end = 0;
        var j = 0;
        var numArr = [89, 71, 69];
        var cellTxt = this.emptyString;
        if (this.namedRanges.has(text)) {
            return false;
        }
        for (var i = 0; i < text.length; i++) {
            if (this.isChar(text[i])) {
                end++;
            }
        }
        cellTxt = text.substring(start, end);
        if (cellTxt.length < 4) {
            while (j < cellTxt.length) {
                if (!isNullOrUndefined(cellTxt[j]) && cellTxt[j].charCodeAt(0) < numArr[j]) {
                    j++;
                    continue;
                }
                else if (isNullOrUndefined(cellTxt[j]) && j > 0) {
                    break;
                }
                else {
                    return false;
                }
            }
            var cellNum = this.parseFloat(text.substring(end, text.length));
            if (cellNum < 1048576) { // Maximum number of rows in excel.
                return true;
            }
        }
        return false;
    };
    /**
     * @hidden
     * @param {any} date - Specify the date
     * @returns {any} - Returns date value.
     */
    Calculate.prototype.parseDate = function (date) {
        if (!this.isNaN(date)) {
            if (date instanceof Date) {
                return new Date(date);
            }
            var d = parseInt(date, 10);
            if (d < 0) {
                return this.getErrorStrings()[CommonErrors.Num];
            }
            if (d <= 60) {
                return new Date(this.dateTime1900.getTime() + (d - 1) * 86400000);
            }
            return new Date(this.dateTime1900.getTime() + (d - 2) * 86400000);
        }
        if (typeof date === 'string') {
            date = this.checkDateFormat(date, true);
            if (!this.isNaN(date)) {
                return date;
            }
        }
        return this.getErrorStrings()[CommonErrors.Value];
    };
    Calculate.prototype.checkDateFormat = function (date, pvtParse) {
        if (this.parentObject.getModuleName() === 'spreadsheet' &&
            this.parentObject.locale !== 'en-US') {
            var dateEventArgs = { value: date,
                cell: { value: date } };
            this.parentObject.notify('checkDateFormat', dateEventArgs);
            if (dateEventArgs.isDate) {
                return dateEventArgs.dateObj;
            }
        }
        if (!pvtParse) {
            return new Date(Date.parse(date));
        }
        return new Date(date);
    };
    /**
     * @hidden
     * @param {string} args - Specify the args
     * @returns {boolean} - Returns boolean value.
     */
    Calculate.prototype.isCellReference = function (args) {
        args = args.trim();
        if (args === this.emptyString) {
            return false;
        }
        args = this.setTokensForSheets(args);
        var sheetToken1 = this.getSheetToken(args);
        var containsBoth = false;
        if (sheetToken1 !== '') {
            args = args.split(sheetToken1).join(this.emptyString);
        }
        var isAlpha = false;
        var isNum = false;
        if (args.indexOf(':') !== args.lastIndexOf(':')) {
            return false;
        }
        var charArray = (args.split('').join(this.getParseArgumentSeparator())).split(this.getParseArgumentSeparator());
        for (var c = 0; c < charArray.length; c++) {
            if (this.isChar(charArray[c])) {
                isAlpha = true;
            }
            else if (this.isDigit(charArray[c])) {
                isNum = true;
            }
            else if (charArray[c] === ':') {
                if (isAlpha && isNum) {
                    containsBoth = true;
                }
                isAlpha = false;
                isNum = false;
            }
            else {
                return false;
            }
        }
        if (args.indexOf(':') > -1 && args.indexOf(this.tic) === -1) {
            if (containsBoth && isAlpha && isNum) {
                return true;
            }
            else if (((isAlpha && !isNum) || (!isAlpha && isNum)) && !containsBoth) {
                return true;
            }
            else {
                return false;
            }
        }
        if (isAlpha && isNum && args.indexOf(this.tic) === -1 && this.isValidCell(args)) {
            return true;
        }
        return false;
    };
    /**
     * @hidden
     * @param {string} text - Specify the text.
     * @returns {string} - set Tokens For Sheets.
     */
    Calculate.prototype.setTokensForSheets = function (text) {
        var family = this.getSheetFamilyItem(this.grid);
        var sortedSheetNamesCollection = this.getSortedSheetNames();
        if (sortedSheetNamesCollection != null) {
            for (var n = 0; n < sortedSheetNamesCollection.length; n++) {
                var token = family.sheetNameToToken.get(sortedSheetNamesCollection[n]);
                token = token.split(this.sheetToken).join(this.tempSheetPlaceHolder);
                var s = this.singleTic + 'SHEET' + sortedSheetNamesCollection[n] + this.singleTic + this.sheetToken;
                if (text.indexOf(s) === -1) {
                    s = 'SHEET' + sortedSheetNamesCollection[n] + this.sheetToken;
                }
                text = text.split(s).join(token);
                s = sortedSheetNamesCollection[n] + this.sheetToken;
                text = text.split(s).join(token);
            }
        }
        text = text.split(this.tempSheetPlaceHolder).join(this.sheetToken);
        if (text.indexOf('!!') > -1) {
            text = text.replace('!!', '!');
            var textSplit = text.split('!');
            textSplit[1] = (parseInt(textSplit[1], 10) + 1).toString();
            text = textSplit.join('!');
        }
        return text;
    };
    Calculate.prototype.getParentObjectCellValue = function (val, refresh, isUnique, isSubtotal) {
        if (val === this.trueValue || val === this.falseValue) {
            return val;
        }
        var tokenIdx = val.lastIndexOf(this.sheetToken);
        var grid = this.grid;
        var cellRef;
        if (tokenIdx > -1) {
            var family = this.getSheetFamilyItem(grid);
            if (family.tokenToParentObject !== null) {
                this.grid = family.tokenToParentObject.get(val.substring(0, tokenIdx + 1));
                cellRef = val.substring(tokenIdx + 1);
            }
            else {
                return this.getErrorStrings()[CommonErrors.Value];
            }
        }
        else {
            var j = 0;
            while (j < val.length && this.isChar(val[j])) {
                j++;
            }
            if (j === val.length) {
                return val === '' ? this.getErrorStrings()[CommonErrors.Value] : this.getErrorStrings()[CommonErrors.Name];
            }
            else {
                cellRef = val;
                var family = this.getSheetFamilyItem(grid);
                if (family.isSheetMember && family.parentObjectToToken != null) {
                    val = family.parentObjectToToken.get(this.grid) + val;
                }
            }
        }
        if (this.isDigit(cellRef[0])) {
            var alphabetStartIdx = cellRef.search(/[a-zA-Z]/);
            if (alphabetStartIdx > 0) {
                cellRef = cellRef.substring(alphabetStartIdx, cellRef.length) + cellRef.substring(0, alphabetStartIdx);
            }
        }
        var row = this.rowIndex(cellRef);
        var col = this.colIndex(cellRef);
        var result;
        if (!(row > 0 && row <= 1048576 && col > 0 && col <= 16384)) {
            result = this.getErrorStrings()[CommonErrors.Name];
        }
        else {
            var sheetId = this.getSheetId(this.grid);
            if (this.parentObject.notify) {
                var sheetInfoArgs = {
                    action: 'getSheetInfo', sheetInfo: []
                };
                this.parentObject.notify(workbookFormulaOperation, sheetInfoArgs);
                if (getSheetIndexByName(this.parentObject, 'Sheet' + sheetId, sheetInfoArgs.sheetInfo) === -1) {
                    this.grid = grid;
                    return this.getErrorStrings()[CommonErrors.Ref];
                }
            }
            result = this.getCellValueFn(grid, this.cell, sheetId, false, refresh, isUnique, isSubtotal)(row, col, val);
        }
        this.grid = grid;
        return result;
    };
    Calculate.prototype.getCellValueFn = function (grid, actCell, sheetId, updateDependentCell, refresh, isUnique, isSubtotal) {
        var _this = this;
        var fromCell = actCell;
        if (fromCell) {
            fromCell = grid === this.grid ? '' :
                fromCell + ',' + (typeof grid === 'string' && Number(grid) > -1 ? grid : this.getSheetID(grid));
        }
        var getValueRowCol = this.parentObject.getValueRowCol.bind(this.parentObject) ||
            this.getValueRowCol.bind(this);
        return function (row, col, curCell) {
            if (actCell === curCell && !isUnique) {
                throw _this.formulaErrorStrings[FormulasErrorsStrings.CircularReference];
            }
            _this.cell = curCell;
            var val = getValueRowCol(sheetId, row, col, fromCell, refresh, isUnique, isSubtotal);
            if (isNullOrUndefined(val)) {
                val = _this.emptyString;
            }
            else {
                val = val.toString();
                var decimalSep = _this.getParseDecimalSeparator();
                if (decimalSep !== '.' && val.includes(decimalSep)) {
                    var parsedVal = val.replace(decimalSep, '.');
                    if (_this.isNumber(parsedVal)) {
                        val = parsedVal;
                    }
                }
            }
            _this.cell = actCell;
            if (updateDependentCell) {
                _this.updateDependentCell(curCell);
            }
            return val;
        };
    };
    Calculate.prototype.isValidCell = function (args) {
        var digitStartIdx = args.search(/\d/);
        if (digitStartIdx === 0) {
            var alphabetStartIdx = args.search(/[a-zA-Z]/);
            args = args.substring(alphabetStartIdx, args.length) + args.substring(0, alphabetStartIdx);
        }
        var row = this.rowIndex(args);
        var col = this.colIndex(args);
        return row > 0 && row <= 1048576 && col > 0 && col <= 16384;
    };
    /**
     * Returns the Sheet ID based on parent object reference.
     *
     * @hidden
     * @param {Object} grd - Specify the parent object reference.
     * @returns {number} - Returns the Sheet ID.
     */
    Calculate.prototype.getSheetId = function (grd) {
        return grd && typeof grd === 'string' && Number(grd) > -1 ? Number(grd) : this.getSheetID(grd) + 1;
    };
    /**
     * Getting the formula result.
     *
     * @param {Object} grid - Specifies the parent object.
     * @param {number} row - Row index of the parent object or key.
     * @param {number} col - Column index of the parent object.
     * @returns {string} - Getting the formula result.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Calculate.prototype.getValueRowCol = function (grid, row, col) {
        var key = this.rowsToKeyMap.get(row).toString();
        var result = this.getKeyValue(key).toString();
        if (result != null && result[result.length - 1] === ('%') && result.length > 1) {
            var d = this.parseFloat(result.substring(0, result.length - 1));
            if (this.isNaN(d)) {
                result = (Number(d) / 100).toString();
            }
        }
        return result;
    };
    /**
     * To add custom library formula.
     *
     * @param {string} formulaName - Custom Formula name.
     * @param {string} functionName - Custom function name.
     * @param {string} formulaDescription - Formula Description.
     * @returns {void} - To add custom library formula.
     */
    Calculate.prototype.defineFunction = function (formulaName, functionName, formulaDescription) {
        if (typeof functionName === 'string') {
            functionName = getValue(functionName, window);
        }
        formulaName = formulaName.toUpperCase();
        this.libraryFormulas.set(formulaName, { handler: functionName, isCustom: true, description: formulaDescription });
    };
    /**
     * Specifies when changing the value.
     *
     * @param {string} grid - Parent object reference name.
     * @param {ValueChangedArgs} changeArgs - Value changed arguments.
     * @param {boolean} isCalculate - Value that allow to calculate.
     * @param {number[]} usedRangeCol - Specify the used range collection.
     * @param {boolean} refresh - Specifies for refreshing the value.
     * @param {string} sheetName - Specifies for sheet name for spreadsheet.
     * @param {boolean} isRandomFormula - Specifies for random formula values.
     * @param {boolean} randomFormulaRefreshing - Specifies for refreshing the random formula.
     * @param {boolean} isDelete - An optional flag indicating whether is from delete cells.
     * @param {number[]} deletedRange - An optional range array indicating the deleted cells.
     * @param {boolean} refreshDependentCells - Specifies dependent cell values are need to update or not.
     * @param {string} action - Specifies calculating option.
     * @returns {void} - Specifies when changing the value.
     */
    Calculate.prototype.valueChanged = function (grid, changeArgs, isCalculate, usedRangeCol, refresh, sheetName, isRandomFormula, randomFormulaRefreshing, isDelete, deletedRange, refreshDependentCells, action) {
        var pgrid = grid;
        this.spreadSheetUsedRange = usedRangeCol;
        this.grid = grid;
        var isComputedValueChanged = true;
        var isCompute = true;
        var calcFamily = this.getSheetFamilyItem(pgrid);
        var cellTxt = getAlphalabel(changeArgs.getColIndex()) + changeArgs.getRowIndex().toString();
        this.actCell = sheetName + '!' + cellTxt;
        if (calcFamily.sheetNameToParentObject !== null && calcFamily.sheetNameToParentObject.size > 0) {
            var token = calcFamily.parentObjectToToken.get(pgrid);
            cellTxt = token + cellTxt;
        }
        var argVal = changeArgs.getFormulaValue().toUpperCase();
        if (argVal.indexOf('=RAND()') > -1 || argVal.indexOf('=NOW()') > -1 || argVal.indexOf('NOW()') > -1 || argVal.indexOf('RAND()') > -1 || argVal.indexOf('=RANDBETWEEN(') > -1 ||
            argVal.indexOf('RANDBETWEEN(') > -1 || this.randomValues.has(cellTxt)) {
            var randStrVal = this.randCollection.toString();
            if (!this.randomValues.has(cellTxt)) {
                this.randomValues.set(cellTxt, changeArgs.getFormulaValue());
                this.randCollection.push(cellTxt);
                this.isRandomVal = true;
            }
            else if (this.randomValues.has(cellTxt)) {
                if (argVal.indexOf('=RAND()') > -1 || argVal.indexOf('=NOW()') > -1 || argVal.indexOf('NOW()') > -1 || argVal.indexOf('RAND()') > -1 || argVal.indexOf('=RANDBETWEEN(') > -1 ||
                    argVal.indexOf('RANDBETWEEN(') > -1) {
                    this.randomValues.set(cellTxt, changeArgs.getFormulaValue());
                }
                else if (changeArgs.getFormulaValue().toUpperCase() !== this.randomValues.get(cellTxt.toUpperCase())) {
                    this.randomValues.delete(cellTxt);
                    randStrVal = randStrVal.split(cellTxt + this.parseArgumentSeparator).join('').split(this.parseArgumentSeparator + cellTxt).join('').split(cellTxt).join('');
                    this.randCollection = randStrVal.split(this.parseArgumentSeparator);
                }
                if (this.randomValues.size === 0 && this.randCollection.length) {
                    this.isRandomVal = false;
                    this.randomValues.clear();
                    this.randCollection = [];
                }
            }
        }
        if (changeArgs.getFormulaValue() && changeArgs.getFormulaValue()[0] === this.getFormulaCharacter()) {
            this.cell = cellTxt;
            var formula = void 0;
            if (!isNullOrUndefined(isCompute)) {
                isCompute = isCalculate;
            }
            if (this.getFormulaInfoTable().has(cellTxt)) {
                formula = this.getFormulaInfoTable().get(cellTxt);
                if (changeArgs.getFormulaValue() !== formula.getFormulaText() || formula.getParsedFormula() == null) {
                    formula.setFormulaText(changeArgs.getFormulaValue());
                    if (this.getDependentFormulaCells().has(this.cell)) {
                        this.clearFormulaDependentCells(this.cell);
                    }
                    try {
                        formula.setParsedFormula(this.parser.parseFormula(changeArgs.getFormulaValue()));
                    }
                    catch (ex) {
                        formula.setFormulaValue(ex);
                        isCompute = false;
                    }
                }
                else {
                    this.parser.isError = false;
                }
                if (isCompute) {
                    this.parser.isFormulaParsed = true;
                    var cValue = this.calculateFormula(formula.getParsedFormula(), refresh);
                    isComputedValueChanged = cValue !== formula.getFormulaValue() && (!this.parentObject.isEdit ||
                        cValue !== this.formulaErrorStrings[FormulasErrorsStrings.CircularReference]);
                    formula.setFormulaValue(cValue);
                }
            }
            else {
                formula = new FormulaInfo();
                formula.setFormulaText(changeArgs.getFormulaValue());
                if (!this.getDependentFormulaCells().has(cellTxt)) {
                    this.getDependentFormulaCells().set(cellTxt, new Map());
                }
                this.getFormulaInfoTable().set(cellTxt, formula);
                try {
                    formula.setParsedFormula(this.parser.parseFormula(changeArgs.getFormulaValue()));
                }
                catch (ex) {
                    formula.setFormulaValue(ex);
                    isCompute = false;
                }
                if (isCompute) {
                    var cValue = this.calculateFormula(formula.getParsedFormula(), refresh);
                    isComputedValueChanged = cValue !== this.formulaErrorStrings[FormulasErrorsStrings.CircularReference];
                    formula.setFormulaValue(cValue);
                }
            }
            if (isCompute) {
                /* eslint-disable */
                if (this.parentObject.setValueRowCol === undefined) {
                    this.setValueRowCol(this.getSheetID(pgrid) + 1, formula.getFormulaValue(), changeArgs.getRowIndex(), changeArgs.getColIndex());
                }
                else {
                    this.parentObject.setValueRowCol(this.getSheetId(pgrid), formula.getFormulaValue(), changeArgs.getRowIndex(), changeArgs.getColIndex(), formula.getFormulaText(), isRandomFormula);
                }
                /* eslint-enable */
            }
        }
        else if (this.getFormulaInfoTable().has(cellTxt)) {
            this.getFormulaInfoTable().delete(cellTxt);
            if (this.getDependentFormulaCells().has(cellTxt)) {
                this.clearFormulaDependentCells(cellTxt);
            }
        }
        if (isCompute && isComputedValueChanged && this.getDependentCells().has(cellTxt) &&
            (this.parentObject.calculationMode === 'Automatic' ||
                !this.parentObject.isEdit ||
                refreshDependentCells) && this.getDependentCells().get(cellTxt).toString() !== cellTxt) {
            this.refresh(cellTxt, undefined, undefined, randomFormulaRefreshing, isDelete, deletedRange, refreshDependentCells, action);
        }
    };
    /**
     * @hidden
     * @param {number} value - specify the value
     * @param {string | number} formulaValue -  specify the formula value.
     * @param {number} row - specify the row
     * @param {number} col - specify the col.
     * @returns {void} - to set value row and column.
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Calculate.prototype.setValueRowCol = function (value, formulaValue, row, col) {
        /* No Implementation */
    };
    Calculate.prototype.getSortedSheetNames = function () {
        var family = this.getSheetFamilyItem(this.grid);
        if (family != null && family.sheetNameToToken != null) {
            var arr_1 = [];
            family.sheetNameToToken.forEach(function (value, key) {
                arr_1.push(key);
                arr_1.sort();
            });
            this.sortedSheetNames = arr_1;
            this.sortedSheetNames.sort();
            if (this.sortedSheetNames.length > 9 && this.sortedSheetNames[0].includes('1') && this.sortedSheetNames[1].includes('10')) {
                this.sortedSheetNames.splice(this.sortedSheetNames.indexOf('2'), 0, this.sortedSheetNames[0]);
                this.sortedSheetNames.splice(0, 1);
            }
        }
        return this.sortedSheetNames;
    };
    /**
     * @hidden
     * @param {string} error -  specify the string
     * @returns {string} - to get error line.
     */
    Calculate.prototype.getErrorLine = function (error) {
        /* eslint-disable-next-line */
        var errorStack = error.stack ? error.stack.split('\n')[1].split(':') : null;
        return errorStack ? errorStack[errorStack.length - 2] : null; // Getting row number of the error file.
    };
    /** @hidden
     * @returns {number} - to return the sheet id
     */
    Calculate.prototype.createSheetFamilyID = function () {
        if (this.sheetFamilyID === Number.MAX_SAFE_INTEGER) {
            this.sheetFamilyID = Number.MIN_SAFE_INTEGER;
        }
        return this.sheetFamilyID++;
    };
    /**
     * @hidden
     * @param {string[]} args - Specify the args.
     * @param {string} operation - Specify the operation.
     * @returns {string} - To compute min max.
     */
    Calculate.prototype.computeMinMax = function (args, operation) {
        var result;
        var argVal;
        var isSubtotalFormula = false;
        var isAggregateComputation;
        var sheet;
        if (args.length) {
            var lastArgument = args[args.length - 1];
            if (lastArgument === 'isSubtotal') {
                isSubtotalFormula = true;
                args.pop();
            }
            else if (lastArgument === 'isAggregate') {
                sheet = this.parentObject.getActiveSheet();
                isAggregateComputation = true;
                args.pop();
            }
        }
        if (isNullOrUndefined(args) || args.length === 0) {
            return this.formulaErrorStrings[FormulasErrorsStrings.WrongNumberArguments];
        }
        result = (operation === 'max') ? this.minValue : this.maxValue;
        for (var k = 0, len = args.length; k < len; k++) {
            if (args[k].split(this.tic).join('').trim() === this.emptyString) {
                result = 0;
            }
        }
        var argArr = args;
        var indexes;
        if (argArr.length > 255) {
            return this.getErrorStrings()[CommonErrors.Value];
        }
        for (var i = 0; i < argArr.length; i++) {
            if (argArr[i].indexOf(':') > -1 && this.isCellReference(argArr[i])) {
                var cellValue = this.getCellCollection(argArr[i]);
                for (var j = 0; j < cellValue.length; j++) {
                    if (isAggregateComputation) {
                        indexes = getCellIndexes(cellValue[j]);
                        if (isHiddenRow(sheet, indexes[0]) || isHiddenCol(sheet, indexes[1])) {
                            continue;
                        }
                    }
                    argVal = !isSubtotalFormula ? this.getValueFromArg(cellValue[j]) :
                        this.getValueFromArg(cellValue[j], null, null, true);
                    if (isSubtotalFormula && argVal.includes('SUBTOTAL(')) {
                        continue;
                    }
                    var cellVal = this.parseFloat(argVal);
                    if (argVal === '' || this.isNaN(this.parseFloat(cellVal)) || this.getErrorStrings().indexOf(argVal) > -1) {
                        continue;
                    }
                    else {
                        result = (operation === 'max') ? Math.max(result, cellVal) : Math.min(result, cellVal);
                    }
                }
            }
            else {
                var val = !isSubtotalFormula ? this.getValueFromArg(argArr[i]) :
                    this.getValueFromArg(argArr[i], null, null, true);
                if (isSubtotalFormula && val.includes('SUBTOTAL(')) {
                    continue;
                }
                var cellVal = 0;
                var isCellRef = this.isCellReference(argArr[i]);
                var isEmptyCell = val === '' && isCellRef;
                var isStringCell = this.isNaN(this.parseFloat(val)) && isCellRef;
                var isBooleanCell = val === (this.trueValue || this.falseValue) && isCellRef;
                argArr[i] = argArr[i].startsWith('n') ? argArr[i].slice(1) : argArr[i];
                if (this.getErrorStrings().indexOf(val) > -1) {
                    return val;
                }
                if (val === this.trueValue && argArr[i] === this.trueValue) {
                    val = '1';
                }
                else if (val === this.falseValue && argArr[i] === this.falseValue) {
                    val = '0';
                }
                else if (isEmptyCell || isStringCell || isBooleanCell) {
                    continue;
                }
                if (val.indexOf('"') > -1) {
                    val = val.split(this.tic).join('');
                }
                if (this.isNaN(this.parseFloat(val))) {
                    return this.getErrorStrings()[CommonErrors.Value];
                }
                cellVal = this.parseFloat(val);
                result = operation === 'max' ? Math.max(result, cellVal) : Math.min(result, cellVal);
            }
        }
        if (result === this.minValue || result === this.maxValue) {
            result = 0;
        }
        return result.toString();
    };
    /**
     * @hidden
     * @param {string[]} args - Specify the args.
     * @param {boolean} isSubtotalFormula - Specify the args is from subtotal formula or not.
     * @param {boolean} isAggregateComputation - Specify the args is from aggregate calculation or not.
     * @returns {string} - to calculate average.
     */
    Calculate.prototype.calculateAvg = function (args, isSubtotalFormula, isAggregateComputation) {
        var argArr = args;
        var cellColl = [];
        var cellVal;
        var value;
        var avgVal = 0;
        var countNum = 0;
        var indexes;
        var sheet;
        if (isAggregateComputation) {
            sheet = this.parentObject.getActiveSheet();
        }
        for (var k = 0; k < argArr.length; k++) {
            if (this.isCellReference(argArr[k])) {
                if (argArr[k].indexOf(':') > -1) {
                    cellColl = this.getCellCollection(argArr[k]);
                    for (var i = 0; i < cellColl.length; i++) {
                        if (isAggregateComputation) {
                            indexes = getCellIndexes(cellColl[i]);
                            if (isHiddenRow(sheet, indexes[0]) || isHiddenCol(sheet, indexes[1])) {
                                continue;
                            }
                        }
                        cellVal = !isSubtotalFormula ? this.getValueFromArg(cellColl[i]) :
                            this.getValueFromArg(cellColl[i], null, null, true);
                        if (isSubtotalFormula && cellVal.includes('SUBTOTAL(')) {
                            continue;
                        }
                        if (this.getErrorStrings().indexOf(cellVal) > -1) {
                            return cellVal;
                        }
                        else if (isNullOrUndefined(cellVal) || isNaN(this.parseFloat(cellVal)) || cellVal === '') {
                            continue;
                        }
                        avgVal = avgVal + this.parseFloat(cellVal);
                        countNum = countNum + 1;
                    }
                }
                else {
                    cellVal = !isSubtotalFormula ? this.getValueFromArg(argArr[k]) :
                        this.getValueFromArg(argArr[k], null, null, true);
                    if (isSubtotalFormula && cellVal.includes('SUBTOTAL(')) {
                        continue;
                    }
                    if (this.getErrorStrings().indexOf(cellVal) > -1) {
                        return cellVal;
                    }
                    else if (isNullOrUndefined(cellVal) || isNaN(this.parseFloat(cellVal)) || cellVal === '') {
                        continue;
                    }
                    avgVal = avgVal + this.parseFloat(cellVal);
                    countNum = countNum + 1;
                }
            }
            else {
                if (argArr[k].indexOf(this.tic) > -1) {
                    if (isNaN(this.parseFloat(argArr[k].split(this.tic).join(''))) ||
                        argArr[k].split(this.tic).join('').trim() === '') {
                        return this.getErrorStrings()[CommonErrors.Value];
                    }
                }
                if (argArr[k].length === 0 || args[k] === this.falseValue) {
                    argArr[k] = '0';
                }
                if (args[k] === this.trueValue) {
                    argArr[k] = '1';
                }
                value = this.getValueFromArg(argArr[k].split(this.tic).join(''));
                if (this.getErrorStrings().indexOf(value) > -1) {
                    return value;
                }
                avgVal = avgVal + this.parseFloat(value);
                countNum = countNum + 1;
            }
        }
        if (countNum === 0) {
            return this.getErrorStrings()[CommonErrors.DivZero];
        }
        return (avgVal / countNum).toString();
    };
    /**
     * @hidden
     * @param {string} refName - specify the reference name.
     * @param {Object | string } model - model - Specify the model.model
     * @param {number} sheetFamilyID - specify the sheet family id.
     * @returns {string} - register Grid As Sheet.
     */
    Calculate.prototype.registerGridAsSheet = function (refName, model, sheetFamilyID) {
        if (isNullOrUndefined(this.modelToSheetID)) {
            this.modelToSheetID = new Map();
        }
        if (isNullOrUndefined(this.modelToSheetID.get(model))) {
            this.modelToSheetID.set(model, sheetFamilyID);
        }
        var family = this.getSheetFamilyItem(model);
        family.isSheetMember = true;
        var tempRef = refName.toUpperCase();
        if (family.parentObjectToToken.size === 0) {
            family.parentObjectToToken = new Map();
        }
        if (family.sheetNameToParentObject.size === 0) {
            family.sheetNameToParentObject = new Map();
        }
        if (family.sheetNameToToken.size === 0) {
            family.sheetNameToToken = new Map();
        }
        if (family.tokenToParentObject.size === 0) {
            family.tokenToParentObject = new Map();
        }
        if (!isUndefined(family.sheetNameToParentObject.get(tempRef))) {
            var token = family.sheetNameToToken.get(tempRef);
            family.tokenToParentObject.set(token, model);
            family.parentObjectToToken.set(model, token);
        }
        else {
            var token = this.sheetToken + this.tokenCount.toString() + this.sheetToken;
            this.tokenCount++;
            family.tokenToParentObject.set(token, model);
            family.parentObjectToToken.set(model, token);
            family.sheetNameToToken.set(tempRef, token);
            family.sheetNameToParentObject.set(tempRef, model);
        }
        return refName;
    };
    /**
     * @hidden
     * @param {string} refName - Specify the reference name
     * @param {string | Object} model - Specify the model
     * @param {boolean} unRegisterAll - Un registed all the availbe model.
     * @returns {void} - To un register grid sheet.
     */
    Calculate.prototype.unregisterGridAsSheet = function (refName, model, unRegisterAll) {
        var _this = this;
        var modelArr = [model];
        if (unRegisterAll) {
            modelArr = [];
            if (!isNullOrUndefined(this.modelToSheetID)) {
                this.modelToSheetID.forEach(function (value, key) {
                    modelArr.push(key);
                });
            }
        }
        modelArr.forEach(function (value) {
            var family = _this.getSheetFamilyItem(value);
            var refName1 = (unRegisterAll ? value : refName).toUpperCase();
            if (family.sheetNameToParentObject != null && family.sheetNameToParentObject.has(refName1)) {
                family.sheetNameToParentObject.delete(refName1);
                var token = family.sheetNameToToken.get(refName1);
                family.sheetNameToToken.delete(refName1);
                family.tokenToParentObject.delete(token);
                family.parentObjectToToken.delete(value);
            }
        });
    };
    /**
     * @hidden
     * @param {string} formula - Specify the formula.
     * @param {boolean} isFromComputeExpression - Specifies to confirm it was called from the ComputeExpression function.
     * @returns {string | number} - To compute the expression.
     */
    Calculate.prototype.computeExpression = function (formula, isFromComputeExpression) {
        var parsedFormula = this.parser.parseFormula(formula);
        var calcValue = this.computeFormula(parsedFormula, isFromComputeExpression);
        return calcValue;
    };
    Calculate.prototype.isSheetMember = function () {
        var family = this.getSheetFamilyItem(this.grid);
        return isNullOrUndefined(family) ? false : family.isSheetMember;
    };
    /**
     * To dispose the calculate engine.
     *
     * @returns {void} - To dispose the calculate engine.
     */
    Calculate.prototype.dispose = function () {
        this.resetKeys();
        // this.dependentCells.clear();
        // this.dependentFormulaCells.clear();
        this.namedRanges.clear();
        // this.sheetFamiliesList.clear();
        this.lFormulas.clear();
    };
    Calculate.prototype.refreshRandValues = function (cellRef) {
        var rowIdx;
        var colIdx;
        var value;
        var tokenRef = '';
        var family;
        if (this.randomValues.has(cellRef)) {
            this.randomValues.delete(cellRef);
            var randIdx = this.randCollection.indexOf(cellRef);
            if (randIdx > -1) {
                this.randCollection.splice(randIdx, 1);
            }
            if (this.randomValues.size === 0 && !this.randCollection.length) {
                this.randomValues.clear();
                this.randCollection = [];
            }
        }
        for (var i = 0; i < this.randomValues.size; i++) {
            rowIdx = this.rowIndex(this.randCollection[i]);
            colIdx = this.colIndex(this.randCollection[i]);
            tokenRef = (parseFloat(this.getSheetToken(this.randCollection[i]).split(this.sheetToken).join('')) + 1).toString();
            family = this.getSheetFamilyItem(tokenRef);
            this.grid = family.sheetNameToParentObject.get(tokenRef);
            value = this.randomValues.get(this.randCollection[i]);
            value = this.computeFormula(value);
            if (this.parentObject.setValueRowCol === undefined) {
                this.setValueRowCol(this.getSheetID(this.grid) + 1, value, rowIdx, colIdx);
            }
            else {
                this.parentObject.setValueRowCol(this.getSheetId(this.grid), value, rowIdx, colIdx);
            }
        }
    };
    Calculate.prototype.refresh = function (cellRef, uniqueCell, dependentCell, isRandomFormula, isDelete, deletedRange, refreshDependentCells, action) {
        var _this = this;
        var refreshCells;
        if (!dependentCell) {
            refreshCells = true;
            dependentCell = [];
        }
        var family = this.getSheetFamilyItem(this.grid);
        try {
            var dependentCells = this.getDependentCells().get(cellRef);
            if (dependentCells && dependentCells.length !== 0 &&
                (this.parentObject.calculationMode === 'Automatic' ||
                    refreshDependentCells || action === 'calculate')) {
                var i = void 0;
                for (i = 0; i < dependentCells.length; i++) {
                    var dCell = dependentCells[i];
                    if ((uniqueCell && dCell.indexOf(uniqueCell) > -1) || dCell === cellRef || dependentCell.indexOf(dCell) > -1) {
                        continue;
                    }
                    var token = this.getSheetToken(dCell);
                    var sheets = this.parentObject.sheets;
                    var sheetIdx = this.parentObject.activeSheetIndex;
                    if (token.length) {
                        this.grid = family.tokenToParentObject.get(token);
                        var sheetId = Number(this.grid);
                        var sheetName = '';
                        if (!this.isNaN(sheetId) && sheets) {
                            for (var i_1 = 0; i_1 < sheets.length; i_1++) {
                                if (sheets[i_1].id === sheetId) {
                                    sheetName = sheets[i_1].name;
                                    sheetIdx = i_1;
                                }
                            }
                        }
                        this.actCell = sheetName + '!' + dCell.split(token)[1];
                    }
                    else {
                        this.actCell = dCell.split(token)[1];
                    }
                    try {
                        var calculateFormula = function (cell, formulaInfo) {
                            if (formulaInfo) {
                                _this.cell = cell;
                                _this.parser.isFormulaParsed = true;
                                formulaInfo.setFormulaValue(_this.calculateFormula(formulaInfo.getParsedFormula(), true));
                            }
                        };
                        var rowIdx = this.rowIndex(dCell);
                        var colIdx = this.colIndex(dCell);
                        var formulaInfo = this.getFormulaInfoTable().get(dCell);
                        if (this.parentObject.setValueRowCol === undefined) {
                            calculateFormula(dCell, formulaInfo);
                            this.setValueRowCol(this.getSheetID(this.grid) + 1, formulaInfo.getFormulaValue(), rowIdx, colIdx);
                        }
                        else {
                            var cell = sheets && sheets[sheetIdx].rows &&
                                sheets[sheetIdx].rows[rowIdx - 1] && sheets[sheetIdx].rows[rowIdx - 1].cells &&
                                sheets[sheetIdx].rows[rowIdx - 1].cells[colIdx - 1];
                            var val = void 0;
                            if (cell && cell.formula && cell.formula.toLowerCase().includes('unique')) {
                                if (!this.uniqueCells || this.uniqueCells.indexOf(dCell) === -1) {
                                    if (!this.uniqueCells) {
                                        this.uniqueCells = [];
                                    }
                                    this.uniqueCells.push(dCell);
                                    calculateFormula(dCell, formulaInfo);
                                    val = formulaInfo.getFormulaValue();
                                    this.uniqueCells.splice(this.uniqueCells.indexOf(dCell), 1);
                                    if (!this.uniqueCells.length) {
                                        this.uniqueCells = null;
                                    }
                                }
                                else {
                                    continue;
                                }
                            }
                            else {
                                if (dependentCell.indexOf(dCell) === -1) {
                                    dependentCell.push(dCell);
                                }
                                val = null;
                            }
                            this.parentObject.setValueRowCol(this.getSheetId(this.grid), val, rowIdx, colIdx, formulaInfo.getFormulaText());
                        }
                        this.refresh(dCell, null, dependentCell, null, isDelete);
                    }
                    catch (ex) {
                        continue;
                    }
                }
            }
            if (refreshCells) {
                if (!isDelete && deletedRange && deletedRange.length === 4) {
                    var token = this.getSheetToken(cellRef);
                    var deletedCell = [];
                    for (var sRIdx = deletedRange[0], eRIdx = deletedRange[2]; sRIdx <= eRIdx; sRIdx++) {
                        for (var sCIdx = deletedRange[1], eCIdx = deletedRange[3]; sCIdx <= eCIdx; sCIdx++) {
                            if (sRIdx === eRIdx && sCIdx === eCIdx) {
                                break;
                            }
                            var cell = token + getCellAddress(sRIdx, sCIdx);
                            this.refresh(cell, null, dependentCell, null, isDelete);
                            deletedCell.push(cell);
                        }
                    }
                    var ranges_1 = new Set(deletedCell);
                    if (dependentCell) {
                        dependentCell = dependentCell.filter(function (item) { return !ranges_1.has(item); });
                    }
                }
                var sheets_1 = this.parentObject.sheets;
                if (!sheets_1) {
                    dependentCell = [];
                }
                dependentCell.forEach(function (cell) {
                    var sheetIdx;
                    var sheetId = _this.getSheetId(family.tokenToParentObject.get(_this.getSheetToken(cell)));
                    for (var idx = 0; idx < sheets_1.length; idx++) {
                        if (sheets_1[idx].id === sheetId) {
                            sheetIdx = idx;
                            break;
                        }
                    }
                    var rowIdx = _this.rowIndex(cell) - 1;
                    var colIdx = _this.colIndex(cell) - 1;
                    var cellObj = sheets_1[sheetIdx].rows[rowIdx] &&
                        sheets_1[sheetIdx].rows[rowIdx].cells[colIdx];
                    if (cellObj) {
                        _this.parentObject.notify('calculateFormula', { cell: cellObj, rowIdx: rowIdx, colIdx: colIdx, sheetIndex: sheetIdx, isDependentRefresh: true, isRandomFormula: isRandomFormula, action: action });
                    }
                });
            }
        }
        finally {
            if (this.getDependentCells().has(cellRef)) {
                this.grid = family.tokenToParentObject.get(this.getSheetToken(cellRef));
            }
        }
    };
    __decorate([
        Event()
    ], Calculate.prototype, "onFailure", void 0);
    Calculate = __decorate([
        NotifyPropertyChanges
    ], Calculate);
    return Calculate;
}(Base));
export { Calculate };
/** @hidden */
var FormulaError = /** @class */ (function () {
    function FormulaError(errorMessage, formulaAutoCorrection) {
        this.formulaCorrection = false;
        this.message = errorMessage;
        this.formulaCorrection = formulaAutoCorrection;
    }
    return FormulaError;
}());
export { FormulaError };
/** @hidden */
var FormulaInfo = /** @class */ (function () {
    function FormulaInfo() {
        /**
         * @hidden
         */
        this.calcID = Number.MIN_VALUE + 1;
        this.calcID1 = Number.MIN_VALUE + 1;
    }
    /**
     * @hidden
     * @returns {void} - To get Formula Text
     */
    FormulaInfo.prototype.getFormulaText = function () {
        return this.formulaText;
    };
    /**
     * @hidden
     * @param {string} value - Specify the value
     * @returns {void} - To set Formula Text
     */
    FormulaInfo.prototype.setFormulaText = function (value) {
        this.formulaText = value;
    };
    /**
     * @hidden
     * @returns {string} - To get Formula Value
     */
    FormulaInfo.prototype.getFormulaValue = function () {
        return this.formulaValue;
    };
    /**
     * @hidden
     * @param {string | number} value - Specify the value
     * @returns {void} - To set Parsed Formula
     */
    FormulaInfo.prototype.setFormulaValue = function (value) {
        this.formulaValue = value;
    };
    /**
     * @hidden
     * @returns {string} - To get Parsed Formula
     */
    FormulaInfo.prototype.getParsedFormula = function () {
        return this.parsedFormula;
    };
    /**
     * @hidden
     * @param {string} value - Specify the value
     * @returns {void} - To set Parsed Formula
     */
    FormulaInfo.prototype.setParsedFormula = function (value) {
        this.parsedFormula = value;
    };
    return FormulaInfo;
}());
export { FormulaInfo };
/** @hidden */
var CalcSheetFamilyItem = /** @class */ (function () {
    function CalcSheetFamilyItem() {
        /**
         * @hidden
         */
        this.isSheetMember = false;
        /**
         * @hidden
         */
        this.parentObjectToToken = new Map();
        /**
         * @hidden
         */
        this.sheetDependentFormulaCells = new Map();
        /**
         * @hidden
         */
        this.sheetNameToParentObject = new Map();
        /**
         * @hidden
         */
        this.sheetNameToToken = new Map();
        /**
         * @hidden
         */
        this.tokenToParentObject = new Map();
        /**
         * @hidden
         */
        this.sheetFormulaInfotable = new Map();
    }
    return CalcSheetFamilyItem;
}());
export { CalcSheetFamilyItem };
/**
 * @hidden
 * @param {number} col - Specify the column
 * @returns {string} - To returns get Alphalabel.
 */
export function getAlphalabel(col) {
    var cols = [];
    var n = 0;
    var charText = 'A';
    while (col > 0 && n < 9) {
        col--;
        var aCharNo = charText.charCodeAt(0);
        cols[n] = String.fromCharCode(col % 26 + aCharNo);
        col = parseInt((col / 26).toString(), 10);
        n++;
    }
    var chs = [];
    for (var i = 0; i < n; i++) {
        chs[n - i - 1] = cols[i];
    }
    return chs.join('');
}
var ValueChangedArgs = /** @class */ (function () {
    function ValueChangedArgs(row, col, value) {
        this.row = row;
        this.col = col;
        this.value = value;
        this.getRowIndex = function () {
            return row;
        };
        this.setRowIndex = function (value) {
            row = value;
        };
        this.getColIndex = function () {
            return col;
        };
        this.setColIndex = function (value) {
            col = value;
        };
        this.getFormulaValue = function () {
            return value;
        };
        return this;
    }
    return ValueChangedArgs;
}());
export { ValueChangedArgs };
