import { PdfAnnotationBase } from '../drawing/pdf-annotation';
import { PdfViewer, PdfViewerBase, ICommentsCollection, IReviewCollection, AllowedInteraction, IPoint, DynamicStampItem, SignStampItem, StandardBusinessStampItem } from '../../index';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IStampAnnotation {
    stampAnnotationPath: string;
    author: string;
    creationDate: string;
    modifiedDate: string;
    subject: string;
    note: string;
    strokeColor: string;
    fillColor: string;
    opacity: number;
    bounds: IRectangles;
    icon: string;
    pageNumber: number;
    rotateAngle: string;
    randomId: string;
    stampAnnotationType: string;
    stampFillcolor: string;
    isDynamicStamp: boolean;
    dynamicText?: string;
    shapeAnnotationType: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    annotationSettings?: any;
    customData: object;
    allowedInteractions?: AllowedInteraction;
    isPrint: boolean;
    isCommentLock: boolean;
    isMaskedImage: boolean;
    customStampName: string;
    template: any;
    templateSize: any;
}
interface IRectangles {
    height: number;
    left: number;
    top: number;
    width: number;
}
/**
 * The `StampAnnotation` module is used to handle annotation actions of PDF viewer.
 *
 * @hidden
 */
export declare class StampAnnotation {
    private pdfViewer;
    /**
     * @private
     */
    pdfViewerBase: PdfViewerBase;
    private author;
    /**
     * @private
     */
    currentStampAnnotation: any;
    /**
     * @private
     */
    isStampAnnotSelected: boolean;
    /**
     * @private
     */
    isStampAddMode: boolean;
    /**
     * @private
     */
    isNewStampAnnot: boolean;
    private isExistingStamp;
    /**
     * @private
     */
    stampPageNumber: any;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * @private
     */
    customStampName: string;
    private dynamicText;
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {any} stampAnnotations - It describes about the stamp annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {any} canvass - It describes about the canvas
     * @param {boolean} isImport - It describes about the isImport
     * @param {boolean} isAnnotOrderAction - It describes about the isAnnotOrderAction
     * @private
     * @returns {Promise<void>} - any
     */
    renderStampAnnotations(stampAnnotations: any, pageNumber: number, canvass?: any, isImport?: boolean, isAnnotOrderAction?: boolean): Promise<void>;
    /**
     * @param {any} stampAnnotations - It describes about the stamp annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {any} canvass - It describes about the canvas
     * @param {boolean} isImport - It describes about the isImport
     * @param {boolean} isAnnotOrderAction - It describes about the isAnnotOrderAction
     * @param {boolean} isNeedToReorderCollection - It ensures whether the need to reorder the collection or not
     * @param {number} orderNumber - It gets the order number
     * @private
     * @returns {void}
     */
    renderStampAnnotImage(stampAnnotations: any, pageNumber: number, canvass?: any, isImport?: boolean, isAnnotOrderAction?: boolean, isNeedToReorderCollection?: boolean, orderNumber?: number): void;
    /**
     * @param {number} X - It describes about the X
     * @param {number} Y -  It describes about the Y
     * @param {number} pageIndex -  It describes about the page index
     * @private
     * @returns {PdfAnnotationBase} - pdf annotation base
     */
    moveStampElement(X: number, Y: number, pageIndex: number): PdfAnnotationBase;
    private ConvertPointToPixel;
    private calculateImagePosition;
    /**
     * @param {any} imageSource - It describes about the image source
     * @param {string} annotName - It describes about the annotation name
     * @private
     * @returns {void}
     */
    createCustomStampAnnotation(imageSource: any, annotName?: string): void;
    /**
     * @param {number} X - It describes about the X
     * @param {number} Y - It describes about the Y
     * @param {number} width - It describes about the width
     * @param {number} height - It describes about the height
     * @param {number} pageIndex - It describes about the page index
     * @param {number} opacity - It describes about the opacity
     * @param {any} rotation - It describes about the rotation
     * @param {any} canvass - It describes about the canvas
     * @param {any} existingAnnotation - It describes about the existing annatation
     * @param {any} isDynamic - It describes about the isDynamic
     * @private
     * @returns {void}
     */
    renderStamp(X: number, Y: number, width: number, height: number, pageIndex: number, opacity: number, rotation: any, canvass: any, existingAnnotation: any, isDynamic?: any): any;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    getSettings(annotation: any): AnnotationSelectorSettingsModel;
    /**
     * @private
     * @returns {void}
     */
    resetAnnotation(): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotation - It describes about the annotation
     * @param {number} opacity - It describes about the opacity
     * @private
     * @returns {void}
     */
    updateDeleteItems(pageNumber: number, annotation: any, opacity?: number): void;
    /**
     * @param {any} position - It describes about the position
     * @param {any} pageIndex - It describes about the page index
     * @param {any} image - It describes about the image
     * @param {any} currentDate - It describes about the current date
     * @param {any} modifiedDate - It describes about the modified date
     * @param {any} RotationAngle - It describes about the rotation angle
     * @param {any} opacity - It describes about the opacity
     * @param {any} canvas - It describes about the canvas
     * @param {boolean} isExistingStamp - It describes about the whether isExistingStamp is true or not
     * @param {any} annotation - It describes about the annotation
     * @param {string} annotName - It describes about the annotation name
     * @param {boolean} isNeedToReorderCollection - It ensures whether the need to reorder the collection or not
     * @param {number} orderNumber - It gets the order number
     * @private
     * @returns {void}
     */
    renderCustomImage(position: any, pageIndex: any, image: any, currentDate: any, modifiedDate: any, RotationAngle: any, opacity: any, canvas?: any, isExistingStamp?: boolean, annotation?: any, annotName?: string, isNeedToReorderCollection?: boolean, orderNumber?: number): void;
    /**
     * @param {any} annot  It describes about the annotation
     * @param {any} orderNumber  It describes about the annotation order number
     * @private
     * @returns {void} - any
     */
    private adjustZIndexOrder;
    /**
     * @param {any} icontype  It describes about the icon type
     * @private
     * @returns {any} - any
     */
    retrieveDynamicStampAnnotation(icontype: any): any;
    /**
     * @param {any} icontype - It describes about the icon type
     * @private
     * @returns {any} - any
     */
    retrievestampAnnotation(icontype: any): any;
    /**
     * @private
     * @returns {any} - any
     */
    saveStampAnnotations(): string;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {IStampAnnotation} annotation - It describes about the annotation
     * @param {boolean} isNeedToReorderCollection - It ensures whether the need to reorder the collection or not
     * @param {number} orderNumber - It gets the order number
     * @private
     * @returns {any} - any
     */
    storeStampInSession(pageNumber: number, annotation: IStampAnnotation, isNeedToReorderCollection?: boolean, orderNumber?: number): any;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {any} id - It describes about the id
     * @param {string} type - It describes about the type
     * @private
     * @returns {void}
     */
    updateSessionStorage(annotation: any, id: any, type: string): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    saveImportedStampAnnotations(annotation: any, pageNumber: number): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    updateStampAnnotationCollections(annotation: any, pageNumber: number): any;
    stampImageData(annot: any): boolean;
    private findImageData;
    private findDynamicText;
    private getAnnotations;
    /**
     * @param {string} property - It describes about the property
     * @param {number} pageNumber - It describes about the page number
     * @param {any} annotationBase - It describes about the annotation base
     * @param {any} toolMoved - It describes about the tool moved
     * @private
     * @returns {IStampAnnotation} - IStampAnnotation
     */
    modifyInCollection(property: string, pageNumber: number, annotationBase: any, toolMoved?: any): IStampAnnotation;
    private manageAnnotations;
    /**
     * This method used to add annotations with using programmatically.
     *
     * @param {any} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the annotation bounds or location
     * @param {number} pageNumber - It describes about the annotation page number
     * @param {DynamicStampItem} dynamicStampItem - It describe which type of dynamic stamp
     * @param {SignStampItem} signStampItem - It describe which type of sign stamp
     * @param {StandardBusinessStampItem} standardBusinessStampItem - It describe which type of standard business stamp
     * @returns {object} - onject
     * @private
     */
    updateAddAnnotationDetails(annotationObject: any, offset: IPoint, pageNumber: number, dynamicStampItem?: DynamicStampItem, signStampItem?: SignStampItem, standardBusinessStampItem?: StandardBusinessStampItem): Object;
    /**
     * @param {any} annot - It describes about the annotaion properties
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {void}
     */
    triggerAnnotationAdd(annot: any, annotation: any): void;
}
export {};
