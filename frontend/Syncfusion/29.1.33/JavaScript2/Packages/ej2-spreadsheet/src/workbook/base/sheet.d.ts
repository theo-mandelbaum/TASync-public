import { Workbook } from './workbook';
import { Query, DataManager } from '@syncfusion/ej2-data';
import { RangeModel, SheetModel, UsedRangeModel } from './sheet-model';
import { RowModel } from './row-model';
import { ColumnModel } from './column-model';
import { SheetState, ProtectSettingsModel, ConditionalFormatModel } from '../common/index';
import { ChildProperty } from '@syncfusion/ej2-base';
import { WorkbookModel } from './workbook-model';
/**
 * Configures the range processing for the spreadsheet.
 *  ```html
 * <div id='Spreadsheet'></div>
 * ```
 * ```typescript
 * let spreadsheet: Spreadsheet = new Spreadsheet({
 *      sheets: [{
 *                  name: 'First Sheet',
 *                  ranges: [{ dataSource: defaultData }],
 *                  rows: [{
 *                          index: 30,
 *                          cells: [{ index: 4, value: 'Total Amount:' },
 *                                  { formula: '=SUM(F2:F30)', style: { fontWeight: 'bold' } }]
 *                  }]
 * ...
 * });
 * spreadsheet.appendTo('#Spreadsheet');
 * ```
 */
export declare class Range extends ChildProperty<Sheet> {
    /**
     * Specifies the data as JSON / Data manager to the sheet.
     *
     * @default null
     */
    dataSource: Object[] | DataManager;
    /**
     * Specifies the start cell from which the datasource will be populated.
     *
     * @default 'A1'
     */
    startCell: string;
    /**
     * Defines the external [`Query`](https://ej2.syncfusion.com/documentation/data/api-query.html)
     * that will be executed along with data processing.
     *
     * @default null
     */
    query: Query;
    /**
     * By default, when a sheet is bound to a data source, columns are assigned to data source fields sequentially.
     * This means that the first data field is assigned to Column A, the second to Column B, and so on.
     * You can customize these assignments by specifying the field names in the desired column order using the 'fieldsOrder' property.
     *
     * @default null
     */
    fieldsOrder: string[];
    /**
     * Show/Hide the field of the datasource as header.
     *
     * @default true
     */
    showFieldAsHeader: boolean;
    /**
     * Template helps to compiles the given HTML String (or HTML Element ID) into HtML Element and append to the Cell.
     *
     * @default ''
     * @aspType string
     */
    template: string | Function;
    /**
     * Specifies the address for updating the dataSource or template.
     *
     * @default 'A1'
     */
    address: string;
    protected setProperties(prop: object, muteOnChange: boolean): void;
}
/**
 * Used range which contains end row index and end column index of the last used cell in sheet .
 */
export declare class UsedRange extends ChildProperty<UsedRange> {
    /**
     * Specifies the last used row index of the sheet.
     *
     * @default 0
     * @asptype int
     */
    rowIndex: number;
    /**
     * Specifies the last used column index of the sheet.
     *
     * @default 0
     * @asptype int
     */
    colIndex: number;
}
/**
 * Configures the sheet behavior for the spreadsheet.
 */
export declare class Sheet extends ChildProperty<WorkbookModel> {
    /**
     * Represents sheet unique id.
     *
     * @default 0
     * @hidden
     */
    id: number;
    /**
     * Configures row and its properties for the sheet.
     *
     * @default null
     */
    rows: RowModel[];
    /**
     * Configures column and its properties for the sheet.
     *
     * @default null
     */
    columns: ColumnModel[];
    /**
     * Configures protect and its options.
     *
     * @default { selectCells: false, formatCells: false, formatRows: false, formatColumns: false, insertLink: false  }
     */
    protectSettings: ProtectSettingsModel;
    /**
     * Specifies the collection of range for the sheet.
     *
     * @default []
     */
    ranges: RangeModel[];
    /**
     * Specifies the conditional formatting for the sheet.
     *
     * @default []
     */
    conditionalFormats: ConditionalFormatModel[];
    /**
     * Specifies index of the sheet. Based on the index, sheet properties are applied.
     *
     * @default 0
     * @asptype int
     */
    index: number;
    /**
     * Specifies the name of the sheet, the name will show in the sheet tabs.
     *
     * @default ''
     */
    name: string;
    /**
     * Defines the number of rows to be rendered in the sheet.
     *
     * @default 100
     * @asptype int
     */
    rowCount: number;
    /**
     * Defines the number of columns to be rendered in the sheet.
     *
     * @default 100
     * @asptype int
     */
    colCount: number;
    /**
     * Specifies selected range in the sheet.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * let spreadsheet: Spreadsheet = new Spreadsheet({
     *      sheets: [{
     *                selectedRange: 'A1:B5'
     *          }],
     *      ...
     * });
     * spreadsheet.appendTo('#Spreadsheet');
     * ```
     *
     * @default 'A1:A1'
     */
    selectedRange: string;
    /**
     * Specifies active cell within `selectedRange` in the sheet.
     *
     * @default 'A1'
     */
    activeCell: string;
    /**
     * Defines the used range of the sheet.
     *
     * @default { rowIndex: 0, colIndex: 0 }
     */
    usedRange: UsedRangeModel;
    /**
     * Specified cell will be positioned at the upper-left corner of the sheet.
     *
     * @default 'A1'
     */
    topLeftCell: string;
    /**
     * Specifies to show / hide column and row headers in the sheet.
     *
     * @default true
     */
    showHeaders: boolean;
    /**
     * Specifies to show / hide grid lines in the sheet.
     *
     * @default true
     */
    showGridLines: boolean;
    /**
     * Specifies to  protect the cells in the sheet.
     *
     * @default false
     */
    isProtected: boolean;
    /**
     * Specifies the sheet visibility state. There must be at least one visible sheet in Spreadsheet.
     *
     * @default 'Visible'
     */
    state: SheetState;
    /**
     * Gets or sets the number of frozen rows.
     *
     * @default 0
     * @asptype int
     */
    frozenRows: number;
    /**
     * Gets or sets the number of frozen columns.
     *
     * @default 0
     * @asptype int
     */
    frozenColumns: number;
    /**
     * Represents the maximum row height collection.
     *
     * @default []
     * @hidden
     */
    maxHgts: object[];
    /**
     * Represents the freeze pane top left cell. Its default value would be based on the number of freeze rows and columns.
     *
     * @default 'A1'
     */
    paneTopLeftCell: string;
    /**
     * Specifies the password.
     *
     * @default ''
     */
    password: string;
    /**
     * Represents the standard height of the sheet.
     *
     * @default null
     * @asptype double
     * @aspDefaultValue null
     */
    standardHeight: number;
    /**
     * Specifies to calculation performed or not.
     *
     * @default false
     * @hidden
     */
    isSheetCalculated: boolean;
}
/**
 * To get sheet index from address.
 *
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {string} name - Specifies the name.
 * @returns {number} - To gget sheet index from address.
 */
export declare function getSheetIndex(context: Workbook, name: string): number;
/**
 * To get sheet index from sheet id.
 *
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {number} id - Specifies the id.
 * @returns {number} - To get the sheet index from id.
 */
export declare function getSheetIndexFromId(context: Workbook, id: number): number;
/**
 * To get sheet name from address.
 *
 * @hidden
 * @param {string} address - Specifies the address.
 * @returns {address} - To get Sheet Name From Address.
 */
export declare function getSheetNameFromAddress(address: string): string;
/**
 * To get sheet index from sheet name.
 *
 * @hidden
 * @param {Object} context - Specifies the context.
 * @param {string} name - Specifies the name.
 * @param {SheetModel} info - Specifies the sheet info.
 * @returns {number} - To get the sheet index by name.
 */
export declare function getSheetIndexByName(context: Object, name: string, info: {
    visibleName: string;
    sheet: string;
    index: number;
}[]): number;
/**
 * update selected range
 *
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {string} range - Specifies the range.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {boolean} isMultiRange - Specifies the boolean value.
 * @returns {void} - Update the selected range.
 */
export declare function updateSelectedRange(context: Workbook, range: string, sheet?: SheetModel, isMultiRange?: boolean): void;
/**
 * get selected range
 *
 * @hidden
 * @param {SheetModel} sheet - Specifies the sheet.
 * @returns {string} - Get selected range.
 */
export declare function getSelectedRange(sheet: SheetModel): string;
/**
 * @hidden
 * @param {SheetModel} sheet - Specifies the sheet.
 * @returns {string} - To get single selected range.
 */
export declare function getSingleSelectedRange(sheet: SheetModel): string;
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {number} idx - Specifies the idx.
 * @returns {SheetModel} - To get sheet.
 */
export declare function getSheet(context: Workbook, idx: number): SheetModel;
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @returns {number} - To get sheet name count.
 */
export declare function getSheetNameCount(context: Workbook): number;
/**
 * @hidden
 * @param {SheetModel[]} sheets - Specifies the sheets.
 * @returns {number} - To get sheet id.
 */
export declare function getMaxSheetId(sheets: SheetModel[]): number;
/**
 * @hidden
 * @param {Workbook} context - Specifies the context.
 * @param {SheetModel[]} sheet - Specifies the sheet.
 * @param {boolean} isImport - Specifies is Import or not.
 * @returns {void} - To initiate sheet.
 */
export declare function initSheet(context: Workbook, sheet?: SheetModel[], isImport?: boolean): void;
/**
 * get sheet name
 *
 * @param {Workbook} context - Specifies the context.
 * @param {number} idx - Specifies the idx.
 * @returns {string} - To get sheet name.
 * @hidden
 */
export declare function getSheetName(context: Workbook, idx?: number): string;
/**
 * @param {Workbook} context - Specifies context
 * @param {number} position - position to move a sheet in the list of sheets
 * @param {number[]} sheetIndexes - Specifies the sheet indexes of the sheets which is to be moved
 * @param {boolean} action - Specifies to trigger events
 * @param {boolean} isFromUpdateAction - Specifies is from UpdateAction or not.
 * @returns {void}
 * @hidden
 */
export declare function moveSheet(context: Workbook, position: number, sheetIndexes?: number[], action?: boolean, isFromUpdateAction?: boolean): void;
/**
 * @param {Workbook} context - Specifies context
 * @param {number} sheetIndex - Specifies sheetIndex to be duplicated
 * @param {boolean} action - Specifies to trigger events
 * @param {boolean} isFromUpdateAction - Specifies is from updateAction.
 * @returns {void}
 * @hidden
 */
export declare function duplicateSheet(context: Workbook, sheetIndex?: number, action?: boolean, isFromUpdateAction?: boolean): void;
