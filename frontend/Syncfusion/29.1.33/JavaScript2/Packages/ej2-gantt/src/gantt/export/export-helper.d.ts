import { PdfDocument } from '@syncfusion/ej2-pdf-export';
import { PdfGantt } from './pdf-gantt';
import { IGanttData, PdfExportProperties } from './../base/interface';
import { Gantt } from './../base/gantt';
/**
 * @hidden
 * `ExportHelper` for `PdfExport` & `ExcelExport`
 */
export declare class ExportHelper {
    private parent;
    private flatData;
    exportProps: PdfExportProperties;
    private gantt;
    private rowIndex;
    private colIndex;
    private row;
    private columns;
    private ganttStyle;
    private pdfDoc;
    private exportValueFormatter;
    private totalColumnWidth;
    beforeSinglePageExport: Object;
    baselineHeight: number;
    baselineTop: number;
    constructor(parent: Gantt);
    processToFit(): void;
    /**
     * @param {IGanttData[]} data .
     * @param {PdfGantt} gantt .
     * @param {PdfExportProperties} props .
     * @returns {void} .
     * @private
     */
    processGridExport(data: IGanttData[], gantt: PdfGantt, props: PdfExportProperties): void;
    private processHeaderContent;
    private processColumnHeader;
    private isColumnVisible;
    private processGanttContent;
    /**
     * Method for processing the timeline details
     *
     * @returns {void} .
     */
    private processTimeline;
    /**
     * Method for create the predecessor collection for rendering
     *
     * @returns {void} .
     */
    private processPredecessor;
    findIndexUsingParent(expandedRecord: IGanttData[], parentIndex: number): number;
    private processRecordRow;
    private processRecordCell;
    private setHyperLink;
    /**
     * Method for create the taskbar collection for rendering
     *
     * @returns {void} .
     */
    private processTaskbar;
    /**
     * set text alignment of each columns in exporting grid
     *
     * @param {string} textAlign .
     * @param {PdfStringFormat} format .
     * @returns {PdfStringFormat} .
     * @private
     */
    private getHorizontalAlignment;
    /**
     * set vertical alignment of each columns in exporting grid
     *
     * @param {string} verticalAlign .
     * @param {PdfStringFormat} format .
     * @param {string} textAlign .
     * @returns {PdfStringFormat} .
     * @private
     */
    private getVerticalAlignment;
    private getFontFamily;
    private getFontStyle;
    private getFont;
    private renderEmptyGantt;
    private mergeCells;
    private copyStyles;
    /**
     * @param {PdfDocument} pdfDoc .
     * @returns {void} .
     * @private
     */
    initializePdf(pdfDoc: PdfDocument): void;
    private drawPageTemplate;
    private drawText;
    private drawPageNumber;
    private drawImage;
    private drawLine;
    private getPenFromContent;
    private getDashStyle;
    private getBrushFromContent;
    private hexToRgb;
    private setContentFormat;
    private getPageNumberStyle;
}
/**
 * @hidden
 * `ExportValueFormatter` for `PdfExport` & `ExcelExport`
 */
export declare class ExportValueFormatter {
    private internationalization;
    private valueFormatter;
    constructor(culture: string);
    private returnFormattedValue;
    /**
     * @private
     */
    formatCellValue(args: any): string;
}
