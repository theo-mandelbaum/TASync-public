import { Workbook } from '../base/index';
/**
 * The `WorkbookSort` module is used to handle sort action in Spreadsheet.
 */
export declare class WorkbookSort {
    private parent;
    /**
     * Constructor for WorkbookSort module.
     *
     * @param {Workbook} parent - Specifies the workbook.
     */
    constructor(parent: Workbook);
    /**
     * To destroy the sort module.
     *
     * @returns {void} - To destroy the sort module.
     */
    protected destroy(): void;
    private addEventListener;
    private removeEventListener;
    /**
     * Sorts range of cells in the sheet.
     *
     * @param {{ args: BeforeSortEventArgs, promise: Promise<SortEventArgs> }} eventArgs - Specify the arguments.
     * @param {BeforeSortEventArgs} eventArgs.args - arguments for sorting.
     * @param {Promise<SortEventArgs>} eventArgs.promise - Specify the promise.
     * @param {SortCollectionModel} eventArgs.previousSort - Specify the previous sort model.
     * @returns {void} - Sorts range of cells in the sheet.
     */
    private initiateSortHandler;
    private isHeaderRow;
    private updateSortedDataOnCell;
    private skipBorderOnSorting;
    private isSameStyle;
    /**
     * Compares the two cells for sorting.
     *
     * @param {SortDescriptor} sortDescriptor - protocol for sorting.
     * @param {boolean} caseSensitive - value for case sensitive.
     * @param {CellModel} x - first cell
     * @param {CellModel} y - second cell
     * @returns {number} - Compares the two cells for sorting.
     */
    private sortComparer;
    /**
     * Gets the module name.
     *
     * @returns {string} - Get the module name.
     */
    protected getModuleName(): string;
}
