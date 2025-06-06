import { PdfExportProperties } from './../base/interface';
import { Gantt } from '../base/gantt';
import { ExportHelper } from '../export/export-helper';
import { PdfPage, SizeF } from '@syncfusion/ej2-pdf-export';
import { PdfPageSize } from '../base/enum';
import { PdfGantt } from '../export/pdf-gantt';
/**
 *
 * @hidden
 */
export declare class PdfExport {
    private parent;
    helper: ExportHelper;
    private pdfDocument;
    gantt: PdfGantt;
    isPdfExport: boolean;
    private isBlob;
    private blobPromise;
    pdfPageDimensions: SizeF;
    pdfPage: PdfPage;
    /**
     * @param {Gantt} parent .
     * @hidden
     */
    constructor(parent?: Gantt);
    /**
     * @returns {string} .
     */
    private getModuleName;
    /**
     * To destroy Pdf export module.
     *
     * @returns {void} .
     * @private
     */
    destroy(): void;
    private initGantt;
    /**
     * @param {PdfExportProperties} pdfExportProperties .
     * @param {boolean} isMultipleExport .
     * @param {object} pdfDoc .
     * @param {boolean} isBlob .
     * @returns {Promise<Object>} .
     */
    export(pdfExportProperties?: PdfExportProperties, isMultipleExport?: boolean, pdfDoc?: Object, isBlob?: boolean): Promise<Object>;
    private exportWithData;
    private processExport;
    private processSectionExportProperties;
    getPageSize(pageSize: PdfPageSize): SizeF;
}
