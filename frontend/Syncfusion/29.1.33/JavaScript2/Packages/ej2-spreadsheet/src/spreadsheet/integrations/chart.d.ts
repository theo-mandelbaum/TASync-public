/**
 * Chart import statements.
 */
import { Spreadsheet } from '../base/index';
/**
 * Represents Chart support for Spreadsheet.
 */
export declare class SpreadsheetChart {
    private parent;
    private chart;
    /**
     * Constructor for the Spreadsheet Chart module.
     *
     * @param {Spreadsheet} parent - Constructor for the Spreadsheet Chart module.
     */
    constructor(parent: Spreadsheet);
    /**
     * Adding event listener for success and failure
     *
     * @returns {void} - Adding event listener for success and failure
     */
    private addEventListener;
    private insertChartHandler;
    private chartRangeHandler;
    private refreshChartData;
    private inRowColumnRange;
    private refreshChartCellModel;
    private refreshChartCellObj;
    private processChartRange;
    private getRangeData;
    private toArrayData;
    private getVirtualXValues;
    private processChartSeries;
    private getAxisFormat;
    private focusChartRange;
    private clearBorder;
    private initiateChartHandler;
    deleteChart(args: {
        id: string;
        range?: string;
        isUndoRedo?: boolean;
        clearAction?: boolean;
    }): void;
    private updateChartModel;
    private updateChartElement;
    private undoRedoForChartDesign;
    private chartDesignTabHandler;
    private switchRowColumn;
    private switchChartTheme;
    private getThemeBgColor;
    private switchChartType;
    private getChartElement;
    private getChartCollectionId;
    private changeCharType;
    private titleDlgHandler;
    private titleDlgContent;
    /**
     * Removing event listener for success and failure
     *
     * @returns {void} - Removing event listener for success and failure
     */
    private removeEventListener;
    /**
     * To Remove the event listeners.
     *
     * @returns {void} - To Remove the event listeners.
     */
    destroy(): void;
    /**
     * Get the sheet chart module name.
     *
     * @returns {string} - Get the module name.
     */
    getModuleName(): string;
}
