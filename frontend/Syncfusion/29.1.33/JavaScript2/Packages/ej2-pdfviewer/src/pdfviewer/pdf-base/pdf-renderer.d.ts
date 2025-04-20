import { PageRenderer, FormFieldsBase, AnnotationRenderer, SignatureBase, BookmarkStyles, BookmarkDestination, BookmarkBase, AnnotBounds } from './index';
import { PdfDocument } from '@syncfusion/ej2-pdf';
import { ExtractTextOption, PdfViewer, PdfViewerBase } from '../index';
import { TextDataSettingsModel } from '../pdfviewer-model';
import { Size } from '@syncfusion/ej2-drawings';
/**
 * PdfRenderer
 *
 * @hidden
 */
export declare class PdfRenderer {
    /**
     * @private
     */
    loadedDocument: PdfDocument;
    /**
     * @private
     */
    loadImportedDocument: PdfDocument;
    private pageCount;
    /**
     * @private
     */
    bookmarkStyles: BookmarkStyles[];
    /**
     * @private
     */
    bookmarkCollection: BookmarkBase[];
    /**
     * @private
     */
    pageRotationCollection: number[];
    /**
     * @private
     */
    bookmarkDictionary: {
        [key: string]: BookmarkDestination;
    };
    renderer: PageRenderer;
    formFieldsBase: FormFieldsBase;
    signatureBase: SignatureBase;
    annotationRenderer: AnnotationRenderer;
    private annotationDetailCollection;
    /**
     * @private
     */
    documentTextCollection: {
        [key: number]: PageTextData;
    }[];
    pageSizes: {
        [key: string]: Size;
    };
    private isCompletePageSizeNotReceieved;
    hashID: string;
    private x;
    private y;
    private zoom;
    private id;
    private pageIndex;
    private textCollections;
    private scaleFactor;
    private static IsLinuxOS;
    private static IsWindowsOS;
    private restrictionList;
    private securityList;
    private _fallbackFontCollection;
    private document;
    /**
     * @private
     */
    searchResults: any;
    /**
     * @private
     * @returns {void}
     */
    readonly PageCount: number;
    private mReferencePath;
    /**
     * @private
     * @returns {void}
     */
    readonly ReferencePath: string;
    /**
     * @private
     * @param {string} v - v
     * @returns {void}
     */
    referencePath: string;
    /**
     * @private
     * @returns {void}
     */
    /**
    * @private
    * @param {string} v - v
    */
    ScaleFactor: number;
    /**
     * @private
     * @returns {void}
     */
    /**
    * @private
    * @param {string} v - v
    */
    FallbackFontCollection: {
        [key: string]: any;
    };
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    digitialByteArray: Uint8Array;
    private loadedByteArray;
    private loadImportedBase64String;
    private password;
    private importedDocpassword;
    private isDummyInserted;
    /**
     * @param {PdfViewer} pdfViewer - The PdfViewer.
     * @param {PdfViewerBase} pdfViewerBase - The PdfViewerBase.
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {string} documentData - documentData
     * @param {string} documentId - documentId
     * @param {string} password - password
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    load(documentData: any, documentId: string, password: string, jsonObject: any): string;
    /**
     * @param {string} documentData - documentData
     * @param {string} documentId - documentId
     * @param {string} password - password
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    loadImportDocument(documentData: any, documentId: string, password: string, jsonObject: any): string;
    /**
     * @param {string} documentData - documentData
     * @param {string} documentId - documentId
     * @param {string} password - password
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    loadDocument(documentData: string, documentId: string, password: string, jsonObject: any): object;
    private documentSecurity;
    private restrictionSummary;
    private getPermissionArray;
    private getPageSizes;
    /**
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    getPageSize(pageNumber: number): Size;
    private convertPointToPixel;
    private convertPixelToPoint;
    /**
     * @param {string} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    getDocumentAsBase64(jsonObject: {
        [key: string]: string;
    }): Uint8Array;
    private rearrangePages;
    private rotatePages;
    private insertPdfPages;
    private copyPages;
    private importPages;
    private deletePdfPages;
    private getPdfRotationAngle;
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {any} - any
     */
    importAnnotations(jsonObject: any): any;
    private removeAnnotationsFromCollection;
    /**
     * @param {string} jsonObject - jsonObject
     * @param {boolean} isObject - isObject
     * @private
     * @returns {void}
     */
    exportAnnotation(jsonObject: {
        [key: string]: string;
    }, isObject: boolean): Uint8Array;
    private changeFileExtension;
    private orderAnnotations;
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    getAnnotationComments(jsonObject: any): any;
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {void}
     */
    getBookmarks(jsonObject: any): any;
    private retrieveFontStyles;
    private getPdfTextStyleString;
    private getChildrenStyles;
    private getChildrenBookmark;
    /**
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {void}
     */
    getHyperlinks(pageIndex: number): any;
    private exportHyperlinks;
    private getHyperlinkBounds;
    /**
     * @param {any} jsonObject - jsonObject
     * @param {boolean} isObjects - isObjects
     * @private
     * @returns {void}
     */
    exportFormFields(jsonObject: any, isObjects: boolean): Uint8Array;
    /**
     * @param {any} jsonObject - jsonObject
     * @private
     * @returns {any} - any
     */
    importFormFields(jsonObject: any): any;
    private isUint8Array;
    private isBase64;
    private exportDataFormat;
    private fileFormat;
    /**
     * @param {number} pageIndex - It sets the page index
     * @private
     * @returns {Promise<string>} - promise
     */
    exportAsImage(pageIndex: number): Promise<string>;
    /**
     * @param {number} startIndex - It gets the start index value
     * @param {number} endIndex - It gets the end index value
     * @private
     * @returns { Promise<string[]>} - Promise
     */
    exportAsImages(startIndex: number, endIndex: number): Promise<string[]>;
    /**
     * @param {number} pageIndex - It gets the start index value
     * @param {Size} size - It gets the size value
     * @private
     * @returns { Promise<string[]>} - Promise
     */
    exportAsImagewithSize(pageIndex: number, size: Size): Promise<string>;
    /**
     * @param {number} startIndex - It gets the start index value
     * @param {number} endIndex - It gets the end index value
     * @param {Size} size - It gets the size value
     * @private
     * @returns { Promise<string[]>} - Promise
     */
    exportAsImagesWithSize(startIndex: number, endIndex: number, size: Size): Promise<string[]>;
    private pdfiumExportAsImage;
    private pdfiumExportAsImages;
    /**
     * @param {any} event - event
     * @param {Function} [resolve] - An optional resolve function to complete a Promise when extraction is complete.
     * @param {number} [count] - An optional count of total expected results used for resolving multiple extractions.
     * @param {any[]} [textCollections] - An optional array for accumulating text data results when processing in bulk.
     * @private
     * @returns {any} - any
     */
    textExtractionOnmessage(event: any, resolve?: Function, count?: number): any;
    /**
     * Extracts text data and additional details from a range of pages in the PDF document.
     *
     * This method performs text extraction on multiple pages defined by the start and end indices,
     * and returns a promise that resolves to an object containing the extracted text data and page text.
     *
     * @param {number} startIndex - The index of the first page from which to start text extraction.
     * @param {number} endIndex - The index of the last page up to which text extraction should be performed.
     * @param {ExtractTextOption} options - Specifies options for text extraction, which may include bounds, text only, etc.
     * @param {boolean} isLayout - Get the isLayout value.
     * @private
     * @returns {Promise<{ textData: TextDataSettingsModel[], pageText: string }>} - A promise that resolves with an object containing
     * an array of text data models representing extracted content and the combined page text of the specified page range.
     */
    extractsText(startIndex: number, endIndex: number, options: ExtractTextOption, isLayout: boolean): Promise<{
        textData: TextDataSettingsModel[];
        pageText: string;
    }>;
    private extractTextFromCharacterDetails;
    private textExtraction;
    private getCharacterBounds;
    /**
     * @param {any} textData - It describes about the text data
     * @private
     * @returns {any} - any
     */
    getPageTextDataCollection(textData: any): any;
    /**
     * @param {any} value - It describes about the value
     * @private
     * @returns {any} - any
     */
    getDocumentTextCollection(value: any): any;
    /**
     * @param {number} pageIndex - It describes about the page index value
     * @private
     * @returns {Promise} - Promise
     */
    extractTextWithPageSize(pageIndex: number): Promise<{
        [key: number]: PageTextData;
    }>;
    private extractTextDetailsWithPageSize;
    /**
     * @param {any} jsonObject - jsonObject
     * @param {string} requestType - It describes about the request type
     * @param {any} annotationObject - It describes about the annotation object
     * @private
     * @returns {void}
     */
    getDocumentText(jsonObject: any, requestType?: string, annotationObject?: any): void;
}
declare class TextData {
    Text: string;
    Bounds: AnnotBounds;
    constructor(text: string, bounds: AnnotBounds);
}
declare class PageTextData {
    PageSize: SizeBase;
    TextData: TextData[];
    PageText: string;
    constructor(pageSize: SizeBase, textData: TextData[], pageText: string);
}
/**
 *
 * @hidden
 */
export declare class SizeBase {
    Width: number;
    Height: number;
    IsEmpty: boolean;
    constructor(_Width: number, _Height: number);
}
/**
 *
 * @hidden
 */
export declare class Annotations {
    textMarkupAnnotation: any;
    shapeAnnotation: any;
    measureShapeAnnotation: any;
    stampAnnotations: any;
    stickyNotesAnnotation: any;
    freeTextAnnotation: any;
    signatureAnnotation: any;
    signatureInkAnnotation: any;
    annotationOrder: any;
}
export {};
