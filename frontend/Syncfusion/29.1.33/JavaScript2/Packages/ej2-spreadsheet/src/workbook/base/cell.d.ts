import { ChildProperty } from '@syncfusion/ej2-base';
import { SheetModel } from './index';
import { CellStyleModel, HyperlinkModel, ValidationModel, ChartModel } from '../common/index';
import { ImageModel } from '../common/index';
import { RowModel } from './row-model';
import { CellModel, OpenSettingsModel } from './cell-model';
import { Workbook } from './workbook';
/**
 * Represents the cell.
 */
export declare class Cell extends ChildProperty<RowModel> {
    /**
     * Specifies the note of the cell.
     *
     * @default ''
     */
    notes: string;
    /**
     * Specifies the image of the cell.
     *
     * @default []
     */
    image: ImageModel[];
    /**
     * Specifies the chart of the cell.
     *
     * @default []
     */
    chart: ChartModel[];
    /**
     * Defines the value of the cell which can be text or number.
     *
     * @default ''
     */
    value: string;
    /**
     * Defines the formula or expression of the cell.
     *
     * @default ''
     */
    formula: string;
    /**
     * Specifies the index of the cell.
     *
     * @default 0
     * @asptype int
     */
    index: number;
    /**
     * Specifies the number format code to display value in specified number format.
     *
     * @default 'General'
     */
    format: string;
    /**
     * Specifies the cell style options.
     *  ```html
     * <div id='Spreadsheet'></div>
     * ```
     * ```typescript
     * let spreadsheet: Spreadsheet = new Spreadsheet({
     *      sheets: [{
     *       ...
     *            rows: [{
     *                  cells: [{ value: '12', index: 2,  style: { fontWeight: 'bold', fontSize: 12, fontStyle: 'italic', textIndent: '2pt'
     *                         backgroundColor: '#4b5366', color: '#ffffff' } }]
     *                  }]
     *            }]
     *  });
     * spreadsheet.appendTo('#Spreadsheet');
     * ```
     *
     * @default {}
     */
    style: CellStyleModel;
    /**
     * Specifies the hyperlink of the cell.
     *
     * @default ''
     */
    hyperlink: string | HyperlinkModel;
    /**
     * Wraps the cell text to the next line, if the text width exceeds the column width.
     *
     * @default false
     */
    wrap: boolean;
    /**
     * Specifies the cell is locked or not, for allow edit range in spreadsheet protect option.
     *
     * @default true
     */
    isLocked: boolean;
    /**
     * Specifies the validation of the cell.
     *
     * @default ''
     */
    validation: ValidationModel;
    /**
     * Specifies the column-wise cell merge count.
     *
     * @default 1
     * @asptype int
     */
    colSpan: number;
    /**
     * Specifies the row-wise cell merge count.
     *
     * @default 1
     * @asptype int
     */
    rowSpan: number;
    /**
     * Specifies the Specifies the note is editable or not, for the current cell when scroll the spreadsheet.
     *
     * @default false
     * @hidden
     */
    isNoteEditable: boolean;
    /**
     * Represents whether a cell in the sheet is read-only or not. If set to true, it prevents editing the specified cell in the sheet.
     *
     * @default false
     */
    isReadOnly: boolean;
    /**
     * It allows to set the formatted value.
     *
     * @default ''
     * @hidden
     */
    formattedText: string;
    /**
     * It allows to set the cell row height.
     *
     * @default 20
     * @hidden
     */
    rowHeight: number;
}
/**
 * @hidden
 * @param {number} rowIndex - Specifies the rowIndex.
 * @param {number} colIndex - Specifies the colIndex.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {boolean} isInitRow - Specifies the isInitRow.
 * @param {boolean} returnEmptyObjIfNull - Specifies the bool value.
 * @returns {CellModel} - get the cell.
 */
export declare function getCell(rowIndex: number, colIndex: number, sheet: SheetModel, isInitRow?: boolean, returnEmptyObjIfNull?: boolean): CellModel;
/**
 * @hidden
 * @param {number} rowIndex - Specifies the rowIndex.
 * @param {number} colIndex - Specifies the colIndex.
 * @param {SheetModel} sheet - Specifies the sheet.
 * @param {CellModel} cell - Specifies the cell.
 * @param {boolean} isExtend - Specifies the bool value.
 * @param {boolean} isUpdate - If true, allows updating the existing cell data without extending.
 * @returns {void} - set the cell.
 */
export declare function setCell(rowIndex: number, colIndex: number, sheet: SheetModel, cell: CellModel, isExtend?: boolean, isUpdate?: boolean): void;
/**
 * @hidden
 * @param {CellStyleModel} style - Specifies the style.
 * @param {boolean} defaultKey - Specifies the defaultKey.
 * @returns {CellStyleModel} - Specifies the CellStyleModel.
 */
export declare function skipDefaultValue(style: CellStyleModel, defaultKey?: boolean): CellStyleModel;
/**
 * @hidden
 * @param {string} address - Specifies the address.
 * @param {boolean} wrap - Specifies the wrap.
 * @param {Workbook} context - Specifies the context.
 * @param {Workbook} preventEvt - Preventing the before cell update event.
 * @param {boolean} isPublic - Specifies if the wrap operation is invoked from a public method.
 * @returns {void} - Specifies the wrap.
 */
export declare function wrap(address: string, wrap?: boolean, context?: Workbook, preventEvt?: boolean, isPublic?: boolean): void;
/**
 * @hidden
 * @param {string} format - Specifies the cell format.
 * @returns {string} - Specifies the supported color code.
 */
export declare function getColorCode(format: string): string;
/**
 * @hidden
 * @returns {string[]} - Returns the custom format colors
 */
export declare function getCustomColors(): string[];
/**
 * @param {string} format - Specify the format.
 * @param {boolean} checkTime - Specify the checktime.
 * @param {Object} option - Specify rhe option value.
 * @param {string} option.type - Specify the type.
 * @param {boolean} checkBoth - Specify check both values.
 * @returns {boolean} - This function is used to return is custom Data time or not.
 * @hidden
 */
export declare function isCustomDateTime(format: string, checkTime?: boolean, option?: {
    type?: string;
}, checkBoth?: boolean): boolean;
/**
 * Represents the configuration options for the Spreadsheet when opening a document.
 */
export declare class OpenSettings extends ChildProperty<OpenSettingsModel> {
    /**
     * Specifies the size of the chunk for the server response when opening a document.
     * This property enables the server response to be returned in chunks when the value is greater than zero.
     */
    chunkSize: number;
    /**
     * Specifies the number of retry attempts for a failed server request when opening the document, provided that the server response is returned in chunks.
     */
    retryCount: number;
    /**
     * Specifies the delay before retrying a failed server request when opening the document, provided that the server response is returned in chunks.
     */
    retryAfterDelay: number;
}
