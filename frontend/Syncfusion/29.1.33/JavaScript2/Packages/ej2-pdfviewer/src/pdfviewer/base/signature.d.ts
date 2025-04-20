import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
import { Dialog } from '@syncfusion/ej2-popups';
import { HandWrittenSignatureSettings, IPoint } from '../index';
/**
 * @hidden
 */
export interface ISignAnnotation {
    strokeColor: string;
    opacity: number;
    bounds: IRectCollection;
    pageIndex: number;
    shapeAnnotationType: string;
    thickness: number;
    id: string;
    data: string;
    signatureName: string;
    fontFamily?: string;
    fontSize?: string;
}
/**
 * @hidden
 */
interface IRectCollection {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 *
 * @param {Event} e - The event object.
 * @param {any} args - Additional arguments passed to the event handler.
 * @hidden
 * @returns {void}
 */
export declare class Signature {
    private pdfViewer;
    private pdfViewerBase;
    private mouseDetection;
    private mouseMoving;
    private canvasTouched;
    private signatureImageWidth;
    private signatureImageHeight;
    private oldX;
    private mouseX;
    private oldY;
    private mouseY;
    private imageSignatureDataUrl;
    private drawSignatureDataUrl;
    private newObject;
    /**
     * @private
     */
    outputString: string;
    /**
     * @private
     */
    drawOutputString: string;
    /**
     * @private
     */
    imageOutputString: string;
    /**
     * @private
     */
    signatureDialog: Dialog;
    /**
     * @private
     */
    signaturecollection: any;
    /**
     * @private
     */
    outputcollection: any;
    /**
     * @private
     */
    signAnnotationIndex: any;
    /**
     * @private
     */
    fontName: string;
    private fontsign;
    private signfontStyle;
    private signtypevalue;
    private signfont;
    private signHeight;
    private signWidth;
    /**
     * @private
     */
    signaturetype: string;
    private tabObj;
    private isSaveSignature;
    private isSaveInitial;
    private isInitialFiledSaveSignature;
    private isSignatureFieldsSaveSignature;
    private issaveTypeSignature;
    private issaveImageSignature;
    private issaveTypeInitial;
    private issaveImageInitial;
    private saveSignatureTypeString;
    private saveInitialTypeString;
    private saveTypeString;
    private signatureTypeString;
    private initialTypeString;
    private saveUploadString;
    private saveSignatureUploadString;
    private saveInitialUploadString;
    private signatureUploadString;
    private initialUploadString;
    private clearUploadString;
    private textValue;
    private signatureDrawString;
    private initialDrawString;
    private signatureTextContentTop;
    private signatureTextContentLeft;
    private saveSignatureString;
    private saveInitialString;
    /**
     * @private
     */
    saveImageString: string;
    currentTarget: any;
    signatureFieldCollection: any;
    private signatureImageString;
    private initialImageString;
    /**
     * @private
     */
    maxSaveLimit: number;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * Initialize the constructor of blazorUIadapater.
     *
     * @private
     * @param { PdfViewer } pdfViewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    createSignaturePanel(): void;
    private setSignatureCanvasWidth;
    private drawSavedSignature;
    private drawSavedTypeSignature;
    private drawSavedImageSignature;
    private hideSignatureCheckbox;
    private saveSignatureCheckbox;
    private hideCheckboxParent;
    private saveSignatureImage;
    /**
     * @param {any} type - It describes about the type
     * @private
     * @returns {void}
     */
    addSignature(type?: any): void;
    /**
     * @param {any} data - It describes about the data
     * @param {boolean} isSignature - It describes about the whether the isSignature is true or not
     * @param {any} currentField - It describes about the current field
     * @param {any} currentData - It describes about the current data
     * @private
     * @returns {any} - any
     */
    updateSignatureAspectRatio(data: any, isSignature?: boolean, currentField?: any, currentData?: any): any;
    private calculateSignatureBounds;
    /**
     * @param {string} id - It describes about the id value
     * @private
     * @returns {void}
     */
    setFocus(id?: string): void;
    /**
     * @private
     * @returns {void}
     */
    removeFocus(): void;
    getSignField(): any[];
    getFormFieldSignField(): any[];
    private checkSaveFiledSign;
    private addSignatureInPage;
    private typeAddSignature;
    private imageAddSignature;
    private saveDrawSignature;
    private saveTypeSignature;
    private saveUploadSignature;
    private updateSignatureTypeValue;
    /**
     * @private
     * @returns {void}
     */
    hideSignaturePanel(): void;
    private bindTypeSignatureClickEvent;
    private bindDrawSignatureClickEvent;
    private typeSignatureclicked;
    private createSignatureCanvas;
    setCustomFonts(): void;
    private select;
    private handleSelectEvent;
    private enableCreateSignatureButton;
    private showHideSignatureTab;
    /**
     * @private
     * @returns {void}
     */
    createSignatureFileElement(): void;
    private uploadSignatureImage;
    private addStampImage;
    private renderSignatureText;
    private typeSignatureclick;
    /**
     * @param {any} bounds - It describes about the bounds value
     * @param {any} position - It describes about the position
     * @private
     * @returns {void}
     */
    addSignatureCollection(bounds?: any, position?: any): void;
    /**
     * @private]
     * @param {number} limit - The limit.
     * @returns {number} - Returns number.
     */
    getSaveLimit(limit: number): number;
    /**
     * @private
     * @returns {void}
     */
    RenderSavedSignature(): void;
    /**
     * @private
     * @returns {void}
     */
    updateCanvasSize(): void;
    private setTabItemWidth;
    private drawSignOnTabSwitch;
    private imageSignOnTabSwitch;
    private signaturePanelMouseDown;
    private enableCreateButton;
    private enableClearbutton;
    private signaturePanelMouseMove;
    private findMousePosition;
    private drawMousePosition;
    private drawSignatureInCanvas;
    private signaturePanelMouseUp;
    private signaturePanelMouseLeave;
    private convertToPath;
    private linePath;
    private movePath;
    /**
     * @param {any} type - It describes about the type
     * @private
     * @returns {void}
     */
    clearSignatureCanvas(type?: any): void;
    /**
     * @private
     * @returns {void}
     */
    closeSignaturePanel(): void;
    /**
     * @private
     * @returns {string} - Returns the string.
     */
    saveSignature(): string;
    /**
     *
     * @private
     * @returns {boolean}
     */
    checkDefaultFont(fontName: string): boolean;
    /**
     * @param {string} colorString - It describes about the color string value
     * @private
     * @returns {any} - any
     */
    getRgbCode(colorString: string): any;
    /**
     * @private
     * @param {number} left - The left.
     * @param {number} top - The top.
     * @returns {void}
     */
    renderSignature(left: number, top: number): void;
    /**
     * @param {any} annotationCollection - It describes about the annotation collection
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isImport - It describes about the whether the isImport is true or not
     * @private
     * @returns {void}
     */
    renderExistingSignature(annotationCollection: any, pageIndex: number, isImport: boolean): void;
    /**
     * @param {number} pageNumber -It describes about the page number value
     * @param {any} annotations - It describes about the annotations
     * @private
     * @returns {void}
     */
    storeSignatureData(pageNumber: number, annotations: any): void;
    /**
     * @param {string} property - It describes about the property value
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It describes about the annotation base
     * @param {boolean} isSignatureEdited - It describes about the whether the isSignatureEdited is true or not
     * @private
     * @returns {ISignAnnotation} - Isignannotation
     */
    modifySignatureCollection(property: string, pageNumber: number, annotationBase: any, isSignatureEdited?: boolean): ISignAnnotation;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    storeSignatureCollections(annotation: any, pageNumber: number): void;
    private checkSignatureCollection;
    /**
     * @param {any} signature - It describes about the signature
     * @private
     * @returns {void}
     */
    updateSignatureCollection(signature: any): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {any} signature - It describes about the signature
     * @private
     * @returns {void}
     */
    addInCollection(pageNumber: number, signature: any): void;
    /**
     * @param {number} pageIndex - This is current page number
     * @param {any[]}  shapeAnnotations - This is annotations
     * @private
     * @returns {any[]}
     */
    getAnnotations(pageIndex: number, shapeAnnotations: any[]): any[];
    /**
     * @param {ISignAnnotation[]} pageAnnotations - This is annotation
     * @param {number}  pageNumber - This is current page number
     * @private
     * @returns {void}
     */
    manageAnnotations(pageAnnotations: ISignAnnotation[], pageNumber: number): void;
    /**
     * @private
     * @param {boolean} isShow - Returns the true or false.
     * @returns {void}
     */
    showSignatureDialog(isShow: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    setAnnotationMode(): void;
    /**
     * @private
     * @returns {void}
     */
    setInitialMode(): void;
    /**
     * @param {any} number - Number value
     * @private
     * @returns {number} - number
     */
    ConvertPointToPixel(number: any): number;
    /**
     * @param {any} signature - It describes about the signature
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isImport - It describes about the whether the isImport is true or not
     * @private
     * @returns {PdfAnnotationBaseModel} - PdfAnnotationBaseModel
     */
    updateSignatureCollections(signature: any, pageIndex: number, isImport?: boolean): any;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * This method was used to add signature programmatically
     *
     * @param {HandWrittenSignatureSettings} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the signature bounds or location
     * @param {number} pageNumber - It describes about the signature page number
     * @returns {object} - object
     * @private
     */
    updateSignatureDetails(annotationObject: HandWrittenSignatureSettings, offset: IPoint, pageNumber: number): Object;
}
export {};
