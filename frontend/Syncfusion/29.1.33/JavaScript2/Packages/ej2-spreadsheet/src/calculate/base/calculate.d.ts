import { INotifyPropertyChanged, EmitType, Base } from '@syncfusion/ej2-base';
import { CalculateModel } from './calculate-model';
import { IFormulaColl, FailureEventArgs, StoredCellInfo } from '../common/interface';
import { Parser } from './parser';
/**
 * Represents the calculate library.
 */
export declare class Calculate extends Base<HTMLElement> implements INotifyPropertyChanged {
    private lFormulas;
    libraryFormulas: any;
    /** @hidden */
    storedData: Map<string, FormulaInfo>;
    /** @hidden */
    actCell: string;
    private keyToRowsMap;
    private rowsToKeyMap;
    /** @hidden */
    rightBracket: string;
    /** @hidden */
    leftBracket: string;
    /** @hidden */
    sheetToken: string;
    private emptyString;
    private leftBrace;
    private rightBrace;
    cell: string;
    private cellPrefix;
    private treatEmptyStringAsZero;
    /** @hidden */
    parentObject: Object | Calculate;
    /** @hidden */
    tic: string;
    /** @hidden */
    singleTic: string;
    /** @hidden */
    trueValue: string;
    /** @hidden */
    falseValue: string;
    private parseDecimalSeparator;
    /** @hidden */
    spreadSheetUsedRange: number[];
    /** @hidden */
    arithMarker: string;
    /** @hidden */
    arithMarker2: string;
    private dependentCells;
    private dependentFormulaCells;
    minValue: number;
    maxValue: number;
    categoryCollection: string[];
    dependencyLevel: number;
    /** @hidden */
    randomValues: Map<string, string>;
    /** @hidden */
    isRandomVal: boolean;
    /** @hidden */
    randCollection: string[];
    /** @hidden */
    dependencyCollection: string[];
    /** @hidden */
    uniqueRange: string[];
    private uniqueCells;
    /**
     * @hidden
     */
    formulaErrorStrings: string[];
    private errorStrings;
    /** @hidden */
    grid: Object | Calculate;
    /** @hidden */
    parser: Parser;
    private parseArgumentSeparator;
    private dateTime1900;
    private isParseDecimalSeparatorChanged;
    private isArgumentSeparatorChanged;
    private sheetFamilyID;
    private defaultFamilyItem;
    private sheetFamiliesList;
    private modelToSheetID;
    /** @hidden */
    tokenCount: number;
    private sortedSheetNames;
    private tempSheetPlaceHolder;
    /** @hidden */
    namedRanges: Map<string, string>;
    private formulaInfoTable;
    private millisecondsOfaDay;
    private parseDateTimeSeparator;
    /**
     * Triggers when the calculation caught any errors.
     *
     * @event anEvent
     */
    onFailure: EmitType<FailureEventArgs>;
    /**
     * Base constructor for creating Calculate library.
     *
     * @param {Object} parent - specify the parent
     */
    constructor(parent?: Object);
    /**
     * To get the argument separator to split the formula arguments.
     *
     * @returns {string} - To get the argument separator to split the formula arguments.
     */
    getParseArgumentSeparator(): string;
    /**
     * To set the argument separator to split the formula arguments.
     *
     * @param {string} value - Argument separator based on the culture.
     * @returns {void} - To set the argument separator to split the formula arguments.
     */
    setParseArgumentSeparator(value: string): void;
    /**
     * To get the date separator to split the date value.
     *
     * @returns {string} - To get the date separator to split the date value.
     */
    getParseDateTimeSeparator(): string;
    /**
     * To set whether the empty string is treated as zero or not.
     *
     * @param {boolean} value - specify the boolean.
     * @returns {void} - To set whether the empty string is treated as zero or not.
     */
    setTreatEmptyStringAsZero(value: boolean): void;
    /**
     * To get whether the empty string is treated as zero or not.
     *
     * @returns {boolean} - To get whether the empty string is treated as zero or not.
     */
    getTreatEmptyStringAsZero(): boolean;
    /**
     * To set the date separator to split the date value.
     *
     * @param {string} value - Argument separator based on the culture.
     * @returns {void} - To set the date separator to split the date value.
     */
    setParseDateTimeSeparator(value: string): void;
    onPropertyChanged(newProp: CalculateModel, oldProp: CalculateModel): void;
    protected getModuleName(): string;
    /**
     * @hidden
     * @returns {string} - get Formula Character.
     */
    getFormulaCharacter(): string;
    /**
     * @hidden
     * @param {string} text - specify the text
     * @returns {boolean} - Returns boolean value.
     */
    isUpperChar(text: string): boolean;
    private resetKeys;
    /**
     * @hidden
     * @param {string} cellRef -  specify the cell reference
     * @returns {void} - update Dependent Cell
     */
    updateDependentCell(cellRef: string): void;
    /**
     * @hidden
     * @returns {Map<string, string[]>} - get Dependent Cells
     */
    getDependentCells(): Map<string, string[]>;
    /**
     * @hidden
     * @returns {Map<string, Map<string, string>>} - get Dependent Formula Cells
     */
    getDependentFormulaCells(): Map<string, Map<string, string>>;
    /**
     * To get library formulas collection.
     *
     * @returns {Map<string, Function>} - To get library formulas collection.
     */
    getLibraryFormulas(): Map<string, IFormulaColl>;
    /**
     * To get library function.
     *
     * @param {string} libFormula - Library formula to get a corresponding function.
     * @returns {Function} - To get library function.
     */
    getFunction(libFormula: string): Function;
    /**
     * @hidden
     * @param {string} val - specify the value.
     * @returns {Date} - convert integer to date.
     */
    intToDate(val: string): Date;
    getFormulaInfoTable(): Map<string, FormulaInfo>;
    /**
     * To get the formula text.
     *
     * @returns {void} - To get the formula text.
     */
    getParseDecimalSeparator(): string;
    /**
     * To get the formula text.
     *
     * @param {string} value - Specifies the decimal separator value.
     * @returns {void} - To get the formula text.
     */
    setParseDecimalSeparator(value: string): void;
    /**
     * @hidden
     * @param {string} cellRef -  specify the cell reference
     * @returns {string} - get sheet token.
     */
    getSheetToken(cellRef: string): string;
    /**
     * @hidden
     * @param {Object} grd - specify the id
     * @returns {number} - get sheet id.
     */
    getSheetID(grd: Object): number;
    /**
     * @hidden
     * @param {string | number} value - specify the value.
     * @returns {number} - parse float
     */
    parseFloat(value: string | number): number;
    /**
     * To get the row index of the given cell.
     *
     * @param {string} cell - Cell address for getting row index.
     * @returns {number} - To get the row index of the given cell.
     */
    rowIndex(cell: string): number;
    /**
     * To get the column index of the given cell.
     *
     * @param {string} cell - Cell address for getting column index.
     * @returns {number} - To get the column index of the given cell.
     */
    colIndex(cell: string): number;
    /**
     * To get the valid error strings.
     *
     * @hidden
     * @returns {string[]} - to get error strings.
     */
    getErrorStrings(): string[];
    /**
     * @hidden
     * @param {string} text - specify the text
     * @param {number} startIndex - specify the start index
     * @param {number} length - specify the length
     * @returns {string} - Returns sub string
     */
    substring(text: string, startIndex: number, length?: number): string;
    /**
     * @hidden
     * @param {string} c - specify the characer of the string
     * @returns {boolean} - Return the boolean type
     */
    isChar(c: string): boolean;
    /**
     * @hidden
     * @param {Object} model - specify the model
     * @param {Object} calcId - specify the calculate instance id.
     * @returns {CalcSheetFamilyItem} - get Sheet Family Item.
     */
    getSheetFamilyItem(model: Object, calcId?: number): CalcSheetFamilyItem;
    /**
     * Register a key value pair for formula.
     *
     * @param {string} key - Key for formula reference .
     * @param {string | number} value - Value for the corresponding key.
     * @returns {void} - Register a key value pair for formula.
     */
    setKeyValue(key: string, value: string | number): void;
    /**
     * @hidden
     * @param {string} cell - specify the cell
     * @returns {void} - clears the  Formula Dependent Cells.
     */
    clearFormulaDependentCells(cell: string): void;
    private arrayRemove;
    /**
     * Register a key value pair for formula.
     *
     * @param {string} key - Key for getting the corresponding value.
     * @returns {string | number} - to get key value.
     */
    getKeyValue(key: string): string | number;
    getNamedRanges(): Map<string, string>;
    /**
     * Adds a named range to the NamedRanges collection.
     *
     * @param {string} name - Name of the named range.
     * @param {string} range - Range for the specified name.
     * @returns {boolean} - Adds a named range to the NamedRanges collection.
     */
    addNamedRange(name: string, range: string): boolean;
    /**
     * Update the sheet name changes in the named range collection.
     *
     * @hidden
     * @param {string} pName - Previous name of the sheet.
     * @param {string} name -  Current name of the sheet.
     * @returns {void} - Update the sheet name changes in the named range collection.
     */
    updateNamedRange(pName: string, name: string): void;
    /**
     * Remove the specified named range form the named range collection.
     *
     * @param {string} name - Name of the specified named range.
     * @returns {boolean} - Remove the specified named range form the named range collection.
     */
    removeNamedRange(name: string): boolean;
    /**
     * @hidden
     * @param {number} col - specify the column
     * @returns {string} - to convert the alpha.
     */
    convertAlpha(col: number): string;
    /**
     * @hidden
     * @param {string} cellRange - specify the cell range.
     * @returns {string} - to get cell collection.
     */
    getCellCollection(cellRange: string): string[] | string;
    /**
     * Compute the given formula.
     *
     * @param {string} formulaText - Specifies to compute the given formula.
     * @param {boolean} isFromComputeExpression - Specifies to confirm it was called from the ComputeExpression function.
     * @returns {string | number} - compute the given formula
     */
    computeFormula(formulaText: string, isFromComputeExpression?: boolean): string | number;
    private calculateFormula;
    /**
     * @hidden
     * @param {string[]} range - Specify the range.
     * @param {string} isAvgIf - Specify the AVERAGEIF computation.
     * @returns {number[] | string} - To compute the sum if and average if.
     */
    computeSumIfAndAvgIf(range: string[], isAvgIf: boolean): number[] | string;
    /**
     * @hidden
     * @param {string[]} range - specify the range
     * @returns {string} - to compute lookup
     */
    computeLookup(range: string[]): string;
    computeVHLookup(range: string[], isVlookup?: boolean): string;
    private findClosestMatch;
    private compareStrings;
    findWildCardValue(lookVal: string, cellValue: string): string;
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
    getComputeSumIfValue(criteriaRange: string[] | string, sumRange: string[] | string, criteria: string, checkCriteria: number, op: string, isAsterisk: boolean, isQuestionMark: boolean): number[];
    private getValueFromRange;
    /**
     * @hidden
     * @param {string[]} args - specifies the args
     * @param {string} op - specify the operator.
     * @returns {string} - Compute and or.
     */
    computeAndOrNot(args: string[], op: string): string;
    /**
     * @hidden
     * @param {string} text - specify the text
     * @returns {string} - to strip out the tic from the formula arguments.
     */
    removeTics(text: string): string;
    /**
     * @hidden
     * @param {string} range - specify the range
     * @returns {string} - to get cell from the range.
     */
    getCellFrom(range: string): string;
    private computeValue;
    private getValArithmetic;
    /**
     * Used to perform logical operation between two values.
     *
     * @hidden
     * @param {string[]} stack - Specifies the values that are used to perform the logical operation.
     * @param {string} operator - Specifies the logical operator.
     * @returns {string} - It returns whether the logical operation is TRUE or FALSE.
     */
    processLogical(stack: string[], operator: string): string;
    /**
     * @hidden
     * @param {StoredCellInfo} sCell - specified the cell information
     * @returns {string[]} - compute stored cells
     */
    computeStoreCells(sCell: StoredCellInfo): string[];
    computeIfsFormulas(range: string[], isCountIfs?: string, isAvgIfs?: string): string | number;
    private processNestedFormula;
    /**
     * @hidden
     * @param {string | number} value - Specify the value
     * @returns {boolean} -  Returns boolean value
     */
    isNaN(value: string | number): boolean;
    /**
     * @hidden
     * @param {string} val - Specifies the value.
     * @returns {boolean} - Returns boolean value.
     */
    isNumber(val: string | number): boolean;
    /**
     * @hidden
     * @param {number} doubleNumber - To specify the double number
     * @returns {Date} - Returns date.
     */
    fromOADate(doubleNumber: number): Date;
    /**
     * @hidden
     * @param {number} year - Specify the year.
     * @param {number} month - Specify the month.
     * @param {number} day - Specify the day.
     * @returns {number} -  to get serial date from date.
     */
    getSerialDateFromDate(year: number, month: number, day: number): number;
    /**
     * @hidden
     * @param {string | number} value - Specify the Time
     * @returns {string} -  returns to time.
     */
    intToTime(value: string | number): Date;
    /**
     * @hidden
     * @param {Date} dateTime - Specify the date Time
     * @param {boolean} isTime - Specify the boolean value.
     * @param {boolean} isTimeOnly - Specify the value is only a time without date.
     * @returns {number} -  returns to date.
     */
    toOADate(dateTime: Date, isTime?: boolean, isTimeOnly?: boolean): number;
    /**
     * @hidden
     * @param {string} date - Specify the date
     * @returns {string} -  returns calculate Date
     */
    calculateDate(date: string): string;
    /**
     * @hidden
     * @param {string} s - Specify the s
     * @returns {boolean} -  returns boolean value.
     */
    isTextEmpty(s: string): boolean;
    /**
     * @hidden
     * @param {string} text - Specify the text
     * @returns {boolean} -  returns boolean value.
     */
    isDigit(text: string): boolean;
    private findLastIndexOfq;
    /**
     * To get the exact value from argument.
     *
     * @param {string} val - Formula argument for getting a exact value.
     * @param {boolean} isUnique - It specifies unique formula or not.
     * @param {boolean} isIfError - It specifies `IFERROR` formula or not.
     * @param {boolean} isSubtotal - It specifies subtotal formula.
     * @returns {string} - To get the exact value from argument.
     */
    getValueFromArg(val: string, isUnique?: boolean, isIfError?: boolean, isSubtotal?: boolean): string;
    isDate(date: any): Date;
    private isValidCellReference;
    /**
     * @hidden
     * @param {any} date - Specify the date
     * @returns {any} - Returns date value.
     */
    parseDate(date: any): any;
    checkDateFormat(date: string, pvtParse?: boolean): Date;
    /**
     * @hidden
     * @param {string} args - Specify the args
     * @returns {boolean} - Returns boolean value.
     */
    isCellReference(args: string): boolean;
    /**
     * @hidden
     * @param {string} text - Specify the text.
     * @returns {string} - set Tokens For Sheets.
     */
    setTokensForSheets(text: string): string;
    private getParentObjectCellValue;
    private getCellValueFn;
    private isValidCell;
    /**
     * Returns the Sheet ID based on parent object reference.
     *
     * @hidden
     * @param {Object} grd - Specify the parent object reference.
     * @returns {number} - Returns the Sheet ID.
     */
    getSheetId(grd: Object): number;
    /**
     * Getting the formula result.
     *
     * @param {Object} grid - Specifies the parent object.
     * @param {number} row - Row index of the parent object or key.
     * @param {number} col - Column index of the parent object.
     * @returns {string} - Getting the formula result.
     */
    getValueRowCol(grid: Object, row: number, col: number): string;
    /**
     * To add custom library formula.
     *
     * @param {string} formulaName - Custom Formula name.
     * @param {string} functionName - Custom function name.
     * @param {string} formulaDescription - Formula Description.
     * @returns {void} - To add custom library formula.
     */
    defineFunction(formulaName: string, functionName: string | Function, formulaDescription: string): void;
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
    valueChanged(grid: string, changeArgs: ValueChangedArgs, isCalculate?: boolean, usedRangeCol?: number[], refresh?: boolean, sheetName?: string, isRandomFormula?: boolean, randomFormulaRefreshing?: boolean, isDelete?: boolean, deletedRange?: number[], refreshDependentCells?: boolean, action?: string): void;
    /**
     * @hidden
     * @param {number} value - specify the value
     * @param {string | number} formulaValue -  specify the formula value.
     * @param {number} row - specify the row
     * @param {number} col - specify the col.
     * @returns {void} - to set value row and column.
     */
    setValueRowCol(value: number, formulaValue: string | number, row: number, col: number): void;
    private getSortedSheetNames;
    /**
     * @hidden
     * @param {string} error -  specify the string
     * @returns {string} - to get error line.
     */
    getErrorLine(error: string): string;
    /** @hidden
     * @returns {number} - to return the sheet id
     */
    createSheetFamilyID(): number;
    /**
     * @hidden
     * @param {string[]} args - Specify the args.
     * @param {string} operation - Specify the operation.
     * @returns {string} - To compute min max.
     */
    computeMinMax(args: string[], operation: string): string;
    /**
     * @hidden
     * @param {string[]} args - Specify the args.
     * @param {boolean} isSubtotalFormula - Specify the args is from subtotal formula or not.
     * @param {boolean} isAggregateComputation - Specify the args is from aggregate calculation or not.
     * @returns {string} - to calculate average.
     */
    calculateAvg(args: string[], isSubtotalFormula?: boolean, isAggregateComputation?: boolean): string;
    /**
     * @hidden
     * @param {string} refName - specify the reference name.
     * @param {Object | string } model - model - Specify the model.model
     * @param {number} sheetFamilyID - specify the sheet family id.
     * @returns {string} - register Grid As Sheet.
     */
    registerGridAsSheet(refName: string, model: Object | string, sheetFamilyID: number): string;
    /**
     * @hidden
     * @param {string} refName - Specify the reference name
     * @param {string | Object} model - Specify the model
     * @param {boolean} unRegisterAll - Un registed all the availbe model.
     * @returns {void} - To un register grid sheet.
     */
    unregisterGridAsSheet(refName: string, model: string | Object, unRegisterAll?: boolean): void;
    /**
     * @hidden
     * @param {string} formula - Specify the formula.
     * @param {boolean} isFromComputeExpression - Specifies to confirm it was called from the ComputeExpression function.
     * @returns {string | number} - To compute the expression.
     */
    computeExpression(formula: string, isFromComputeExpression?: boolean): string | number;
    private isSheetMember;
    /**
     * To dispose the calculate engine.
     *
     * @returns {void} - To dispose the calculate engine.
     */
    dispose(): void;
    refreshRandValues(cellRef: string): void;
    refresh(cellRef: string, uniqueCell?: string, dependentCell?: string[], isRandomFormula?: boolean, isDelete?: boolean, deletedRange?: number[], refreshDependentCells?: boolean, action?: string): void;
}
/** @hidden */
export declare class FormulaError {
    /**
     * @hidden
     */
    message: string;
    formulaCorrection: boolean;
    constructor(errorMessage: string, formulaAutoCorrection?: boolean);
}
/** @hidden */
export declare class FormulaInfo {
    /**
     * @hidden
     */
    calcID: number;
    /**
     * @hidden
     */
    formulaText: string;
    private formulaValue;
    private parsedFormula;
    private calcID1;
    /**
     * @hidden
     * @returns {void} - To get Formula Text
     */
    getFormulaText(): string;
    /**
     * @hidden
     * @param {string} value - Specify the value
     * @returns {void} - To set Formula Text
     */
    setFormulaText(value: string): void;
    /**
     * @hidden
     * @returns {string} - To get Formula Value
     */
    getFormulaValue(): string | number;
    /**
     * @hidden
     * @param {string | number} value - Specify the value
     * @returns {void} - To set Parsed Formula
     */
    setFormulaValue(value: string | number): void;
    /**
     * @hidden
     * @returns {string} - To get Parsed Formula
     */
    getParsedFormula(): string;
    /**
     * @hidden
     * @param {string} value - Specify the value
     * @returns {void} - To set Parsed Formula
     */
    setParsedFormula(value: string): void;
}
/** @hidden */
export declare class CalcSheetFamilyItem {
    /**
     * @hidden
     */
    isSheetMember: boolean;
    /**
     * @hidden
     */
    parentObjectToToken: Map<Object, string>;
    /**
     * @hidden
     */
    sheetDependentFormulaCells: Map<string, Map<string, string>>;
    /**
     * @hidden
     */
    sheetNameToParentObject: Map<string, Object>;
    /**
     * @hidden
     */
    sheetNameToToken: Map<string, string>;
    /**
     * @hidden
     */
    tokenToParentObject: Map<string, Object>;
    /**
     * @hidden
     */
    sheetFormulaInfotable: Map<string, FormulaInfo>;
}
/**
 * @hidden
 * @param {number} col - Specify the column
 * @returns {string} - To returns get Alphalabel.
 */
export declare function getAlphalabel(col: number): string;
export declare class ValueChangedArgs {
    /** @hidden */
    row: number;
    /** @hidden */
    col: number;
    /** @hidden */
    value: number | string;
    /** @hidden */
    getRowIndex: Function;
    /** @hidden */
    setRowIndex: Function;
    /** @hidden */
    getColIndex: Function;
    /** @hidden */
    setColIndex: Function;
    /** @hidden */
    getFormulaValue: Function;
    constructor(row: number, col: number, value: number | string);
}
