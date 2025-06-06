import { Workbook } from '../index';
/**
 * The `WorkbookDelete` module is used to delete cells, rows, columns and sheets from workbook.
 */
export declare class WorkbookDelete {
    private parent;
    /**
     * Constructor for the workbook delete module.
     *
     * @param {Workbook} parent - Specify the workbook
     * @private
     */
    constructor(parent: Workbook);
    private deleteModel;
    private setRowColCount;
    private deleteConditionalFormats;
    private addEventListener;
    /**
     * Destroy workbook delete module.
     *
     * @returns {void}
     */
    destroy(): void;
    private removeEventListener;
    /**
     * Get the workbook delete module name.
     *
     * @returns {string} - returns the module name.
     */
    getModuleName(): string;
}
