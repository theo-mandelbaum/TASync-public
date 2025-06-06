import { PivotView } from '../base/pivotview';
import { ExcelExportProperties } from '@syncfusion/ej2-grids';
/**
 * @hidden
 * `ExcelExport` module is used to handle the Excel export action.
 */
export declare class ExcelExport {
    private parent;
    private engine;
    private rows;
    private actualrCnt;
    /**
     * Constructor for the PivotGrid Excel Export module.
     *
     * @param {PivotView} parent - Instance of pivot table.
     * @hidden
     */
    constructor(parent?: PivotView);
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - string.
     * @private
     */
    protected getModuleName(): string;
    private addHeaderAndFooter;
    /**
     *
     * Method to perform excel export.
     *
     * @hidden
     */
    exportToExcel(type: string, exportProperties?: ExcelExportProperties, isBlob?: boolean): void;
    private updateOlapPageSettings;
    /**
     * To destroy the excel export module
     *
     * @returns {void}
     * @hidden
     */
    destroy(): void;
}
