import { CellModel, ColumnModel, SheetModel, Workbook, CellStyleModel, RowModel } from './../index';
import { CellUpdateArgs } from './index';
import { InsertDeleteModelArgs, ConditionalFormat, ConditionalFormatModel } from './index';
import { VisibleMergeIndexArgs } from './../index';
import { LocaleNumericSettings } from './../index';
import { DataManager, Predicate } from '@syncfusion/ej2-data';
import { BeforeActionData } from '../../spreadsheet';
/**
 * Check whether the text is formula or not.
 *
 * @param {string} text - Specify the text.
 * @param {boolean} isEditing - Specify the isEditing.
 * @returns {boolean} - Check whether the text is formula or not.
 */
export declare function checkIsFormula(text: string, isEditing?: boolean): boolean;
/**
 * Check whether the value is cell reference or not.
 *
 * @param {string} value - Specify the value to check.
 * @returns {boolean} - Returns boolean value
 */
export declare function isCellReference(value: string): boolean;
/**
 * Check whether the value is character or not.
 *
 * @param {string} value - Specify the value to check.
 * @returns {boolean} - Returns boolean value
 */
export declare function isChar(value: string): boolean;
/**
 * Check whether the range selection is on complete row.
 *
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {number[]} range - Specify the range index.
 * @returns {boolean} - Returns boolean value
 * @hidden
 */
export declare function isRowSelected(sheet: SheetModel, range: number[]): boolean;
/**
 * Check whether the range selection is on complete column.
 *
 * @param {SheetModel} sheet - Specify the sheet.
 * @param {number[]} range - Specify the range index.
 * @returns {boolean} - Returns boolean value
 * @hidden
 */
export declare function isColumnSelected(sheet: SheetModel, range: number[]): boolean;
/**
 * @param {number[]} range - Specify the range
 * @param {number} rowIdx - Specify the row index
 * @param {number} colIdx - Specify the col index
 * @returns {boolean} - Returns boolean value
 */
export declare function inRange(range: number[], rowIdx: number, colIdx: number): boolean;
/**
 * @param {number[]} address - Specify the address
 * @param {number} rowIdx - Specify the row index
 * @param {number} colIdx - Specify the col index
 * @returns {boolean} - Returns boolean value
 */
export declare function isInMultipleRange(address: string, rowIdx: number, colIdx: number): boolean;
/** @hidden
 * @param {number[]} range - Specify the range
 * @param {number[]} testRange - Specify the test range
 * @param {boolean} isModify - Specify the boolean value
 * @returns {boolean} - Returns boolean value
 */
export declare function isInRange(range: number[], testRange: number[], isModify?: boolean): boolean;
/**
 * @hidden
 * @param {string} address - Specifies the address for whole column.
 * @param {number[]} testRange - Specifies range used to split the address.
 * @param {number} colIdx - Specifies the column index.
 * @returns {string} - returns the modified address.
 */
export declare function getSplittedAddressForColumn(address: string, testRange: number[], colIdx: number): string;
/**
 * Check whether the cell is locked or not
 *
 * @param {CellModel} cell - Specify the cell.
 * @param {ColumnModel} column - Specify the column.
 * @returns {boolean} - Returns boolean value
 * @hidden
 */
export declare function isLocked(cell: CellModel, column: ColumnModel): boolean;
/**
 * Check whether the value is cell reference or not.
 *
 * @param {string} value - Specify the value to check.
 * @returns {boolean} - Returns boolean value
 * @hidden
 */
export declare function isValidCellReference(value: string): boolean;
/**
 * To get the column index of the given cell.
 *
 * @param {string} cell - Cell address for getting column index.
 * @returns {number} - To get the column index of the given cell.
 * @hidden
 */
export declare function columnIndex(cell: string): number;
/**
 * @hidden
 * @param {SheetModel} sheet - Specify the sheet
 * @param {number} index - specify the index
 * @param {boolean} increase - specify the boolean value.
 * @param {string} layout - specify the string
 * @param {number} count - specify the count.
 * @returns {number} - To skip the hidden index
 *
 */
export declare function skipHiddenIdx(sheet: SheetModel, index: number, increase: boolean, layout?: string, count?: number): number;
/**
 * @param {CellStyleModel} style - Cell style.
 * @param {boolean} onActionUpdate - Specifies the action.
 * @returns {boolean} - retruns `true` is height needs to be checked.
 * @hidden
 */
export declare function isHeightCheckNeeded(style: CellStyleModel, onActionUpdate?: boolean): boolean;
/**
 * @param {number[]} currIndexes - current indexes in which formula get updated
 * @param {number[]} prevIndexes - copied indexes
 * @param {SheetModel} sheet - sheet model
 * @param {Workbook} context - Represents workbook instance
 * @param {CellModel} prevCell - Copied or previous cell model
 * @param {boolean} isSort - Represents sort action
 * @returns {string} - retruns updated formula
 * @hidden
 */
export declare function getUpdatedFormula(currIndexes: number[], prevIndexes: number[], sheet: SheetModel, context: Workbook, prevCell?: CellModel, isSort?: boolean): string;
/**
 * Retrieves the leading spaces from a given string.
 *
 * @param {string} string - The input string from which to retrieve leading spaces.
 * @returns {string} - A string containing all leading spaces from the input string.
 * @hidden
 */
export declare function getLeadingSpaces(string: string): string;
/**
 * Retrieves the trailing spaces from a given string.
 *
 * @param {string} string - The input string from which to retrieve trailing spaces.
 * @returns {string} - A string containing all trailing spaces from the input string.
 * @hidden
 */
export declare function getTrailingSpaces(string: string): string;
/**
 * @param {Workbook} context - Specifies the context.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {CellUpdateArgs} prop - Specifies the props.
 * @param {BeforeActionData} actionData - It holds the undoRedoCollection cell details.
 * @param {boolean} isUndo - It holds the undo information.
 * @returns {boolean} - returns args cancel value.
 * @hidden */
export declare function updateCell(context: Workbook, sheet: SheetModel, prop: CellUpdateArgs, actionData?: BeforeActionData, isUndo?: boolean): boolean;
/**
 * @param {number} rowIdx - row index
 * @param {number} colIdx - column index
 * @param {SheetModel} sheet - sheet model
 * @returns {number[]} - retruns data range
 * @hidden
 */
export declare function getDataRange(rowIdx: number, colIdx: number, sheet: SheetModel): number[];
/**
 * @param {InsertDeleteModelArgs} args - row index
 * @param {number[]} formatRange - format range index
 * @param {boolean} isAction - specifies isAction.
 * @returns {number[]} - retruns updated range
 * @hidden
 */
export declare function insertFormatRange(args: InsertDeleteModelArgs, formatRange: number[], isAction: boolean): number[];
/**
 * @param {InsertDeleteModelArgs} args - row index
 * @param {number[]} formatRange - cell range index
 * @returns {number[]} - retruns data range
 * @hidden
 */
export declare function deleteFormatRange(args: InsertDeleteModelArgs, formatRange: number[]): number[];
/**
 * @param {ConditionalFormat[]} curCF - Specifies current Conditional formatting.
 * @param {ConditionalFormatModel[]} cfRule - Specifies conditional formatting rules.
 * @param {number} rowIdx - Specifies the row index.
 * @param {number} colIdx -Specifies the col index.
 * @param {number[]} startRanges - Specifies conditional formatting origin index.
 * @param {number[]} fillRanges - Specifies the conditional formatting fill ranges.
 * @param {SheetModel} sheet -Specifies the conditional formatted sheet.
 * @returns {void} - Updates Conditional formatting model.
 * @hidden
 */
export declare function updateCFModel(curCF: ConditionalFormat[], cfRule: ConditionalFormatModel[], rowIdx: number, colIdx: number, startRanges?: number[], fillRanges?: number[], sheet?: SheetModel): void;
/**
 * @param {number} indexes - Specifies the indexes.
 * @param {string} range - Specifies the range.
 * @returns {boolean} - Return is range or not.
 * @hidden
 */
export declare function checkRange(indexes: number[][], range: string): boolean;
/**
 * Parse the formatted text to get the actual cell value.
 *
 * @param {string[]} valArr - Specifies the value array.
 * @param {string} context - Specifies the workbook instance.
 * @param {LocaleNumericSettings} numObj - Specifies the locale numeric options like decimal and group separators.
 * @returns {string[]} - Returns the parsed number collection.
 * @hidden
 */
export declare function parseLocaleNumber(valArr: string[], context: Workbook, numObj?: LocaleNumericSettings): string[];
/**
 * Returns the overall viewport indexes by including the freeze and movable part.
 *
 * @param {Workbook} parent - Specify the Workbook object.
 * @param {number} viewport - Specifies the top, bottom, left, and right index of the current viewport.
 * @param {number} viewport.topIndex - Specifies the top index of the current viewport.
 * @param {number} viewport.leftIndex - Specifies the left index of the current viewport.
 * @param {number} viewport.bottomIndex - Specifies the bottom index of the current viewport.
 * @param {number} viewport.rightIndex - Specifies the right index of the current viewport.
 * @returns {number} - Returns the viewport indexes.
 * @hidden
 */
export declare function getViewportIndexes(parent: Workbook, viewport: {
    topIndex?: number;
    leftIndex?: number;
    bottomIndex?: number;
    rightIndex?: number;
}): number[][];
/**
 * If the primary cell in the merged range row/column is hidden, then this method will update
 * the next visible row/column index within the merged range.
 *
 * @param {VisibleMergeIndexArgs} args - Specifies the args.
 * @returns {void} - Update the next visible row/column index within the merged range.
 */
export declare function setVisibleMergeIndex(args: VisibleMergeIndexArgs): void;
/**
 * Check whether the sheets are imported.
 *
 * @param {Workbook} context - Specifies the spreadsheet instance.
 * @returns {boolean} - It returns true if the sheets are imported otherwise false.
 * @hidden
 */
export declare function isImported(context: Workbook): boolean;
/**
 * Return a function that will auto-detect the number format of the formatted cell value.
 *
 * @param {Workbook} context - Specifies the Workbook instance.
 * @returns {void} - Defines the common variables and returns the auto-detect number format function.
 * @hidden
 */
export declare function getAutoDetectFormatParser(context: Workbook): (cell: CellModel) => void;
/**
 *
 * @param {DataManager} dataManager - Specifies the Datamanager.
 * @param {Predicate[]} predicates - Specifies the predicates.
 * @param {Predicate[]} equalOrPredicates - Specifies the equal or predicates.
 * @returns {Object[]} - Returns apply predicates object.
 * @hidden
 */
export declare function applyPredicates(dataManager: DataManager, predicates: Predicate[], equalOrPredicates?: Predicate[][]): Object[];
/**
 * Checks whether the cell is read-only or not.
 *
 * @param {CellModel} cell - The cell to check.
 * @param {ColumnModel} column - The column associated with the cell.
 * @param {RowModel} row - The row associated with the cell.
 * @returns {boolean} - Returns true if the cell is read-only, otherwise false.
 * @hidden
 */
export declare function isReadOnly(cell: CellModel, column: ColumnModel, row: RowModel): boolean;
/**
 * Checks whether a specific range of cells is read-only or not.
 *
 * @param {Workbook} parent - The spreadsheet instance.
 * @param {number[]} rangeIndexes - The range indexes to check.
 * @returns {boolean} - Returns true if any of the cells is read-only, otherwise false.
 * @hidden
 */
export declare function isReadOnlyCells(parent: Workbook, rangeIndexes?: number[]): boolean;
/**
 * Checks whether the selected range in the sheet is an entire row or column and returns the updated range accordingly.
 *
 * @param {SheetModel} sheet -Specifies the sheet.
 * @param {string} range - Specify the range that need to be updated.
 * @returns {string} - Retruns updated range
 * @hidden
 */
export declare function getUpdatedRange(sheet: SheetModel, range?: string): string;
/**
 * Updated the top border of the adjacent merged cells
 *
 * @param {Workbook} context - The spreadsheet instance.
 * @param {number[]} rowIndexes - An array of row indexes that top border need to be updated.
 * @param {number[]} colIndexes - An array of col indexes that top border need to be updated.
 * @returns {void}
 * @hidden
 */
export declare function updateMergeBorder(context: Workbook, rowIndexes: number[], colIndexes?: number[]): void;
