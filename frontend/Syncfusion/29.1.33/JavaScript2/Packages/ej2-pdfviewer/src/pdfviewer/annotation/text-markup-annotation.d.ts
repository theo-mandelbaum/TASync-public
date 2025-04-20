import { PdfViewer, PdfViewerBase, IRectangle, AnnotationType, ICommentsCollection, IReviewCollection, AllowedInteraction, AnnotationsInternal } from '../index';
import { ChangeEventArgs } from '@syncfusion/ej2-inputs';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface ITextMarkupAnnotation {
    textMarkupAnnotationType: string;
    author: string;
    subject: string;
    modifiedDate: string;
    note: string;
    bounds: any;
    color: any;
    opacity: number;
    rect: any;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    shapeAnnotationType: string;
    position?: string;
    pageNumber: number;
    textMarkupContent: string;
    textMarkupStartIndex: number;
    textMarkupEndIndex: number;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    customData: object;
    isMultiSelect?: boolean;
    annotNameCollection?: any[];
    annotpageNumbers?: any[];
    annotationAddMode: string;
    annotationSettings?: any;
    allowedInteractions?: AllowedInteraction;
    isLocked: boolean;
    isPrint: boolean;
    isCommentLock: boolean;
    isAnnotationRotated: boolean;
    annotationRotation?: number;
}
/**
 * @hidden
 */
export interface IPageAnnotationBounds {
    pageIndex: number;
    bounds: IRectangle[];
    rect: any;
    startIndex?: number;
    endIndex?: number;
    textContent?: string;
}
/**
 * The `TextMarkupAnnotation` module is used to handle text markup annotation actions of PDF viewer.
 *
 * @hidden
 * @param {Event} event - It describes about the event
 * @returns {void}
 */
export declare class TextMarkupAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    isTextMarkupAnnotationMode: boolean;
    /**
     * @private
     */
    currentTextMarkupAddMode: string;
    /**
     * @private
     */
    highlightColor: string;
    /**
     * @private
     */
    underlineColor: string;
    /**
     * @private
     */
    strikethroughColor: string;
    /**
     * @private
     */
    highlightOpacity: number;
    /**
     * @private
     */
    underlineOpacity: number;
    /**
     * @private
     */
    annotationAddMode: string;
    /**
     * @private
     */
    strikethroughOpacity: number;
    /**
     * @private
     */
    selectTextMarkupCurrentPage: number;
    /**
     * @private
     */
    currentTextMarkupAnnotation: AnnotationsInternal;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    private currentAnnotationIndex;
    private isAnnotationSelect;
    private dropDivAnnotationLeft;
    private dropDivAnnotationRight;
    private dropElementLeft;
    private dropElementRight;
    /**
     * @private
     */
    isDropletClicked: boolean;
    /**
     * @private
     */
    isRightDropletClicked: boolean;
    /**
     * @private
     */
    isLeftDropletClicked: boolean;
    /**
     * @private
     */
    isSelectionMaintained: boolean;
    private isExtended;
    private isNewAnnotation;
    private selectedTextMarkup;
    private multiPageCollection;
    private triggerAddEvent;
    /**
     * @private
     */
    isSelectedAnnotation: boolean;
    private dropletHeight;
    private strikeoutDifference;
    private underlineDifference;
    /**
     * @private
     */
    annotationClickPosition: object;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfViewer
     * @param {PdfViewerBase} viewerBase - It describes about the viewerBase
     * @private
     * @returns {void}
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    createAnnotationSelectElement(): void;
    private maintainSelection;
    private selectionEnd;
    private annotationLeftMove;
    private annotationRightMove;
    /**
     * @param {any} target - It describes about the target
     * @param {any} x - It describes about the X
     * @param {any} y - It describes about the Y
     * @private
     * @returns {void}
     */
    textSelect(target: any, x: any, y: any): void;
    /**
     * @param {boolean} hide - It describes about the hide
     * @private
     * @returns {void}
     */
    showHideDropletDiv(hide: boolean): void;
    /**
     * @param {string} type - It describes about the type
     * @private
     * @returns {boolean} - boolean
     */
    isEnableTextMarkupResizer(type: string): boolean;
    private updateDropletStyles;
    private updateAnnotationBounds;
    private updateMultiAnnotBounds;
    private retreieveSelection;
    /**
     * @param {number} x - It describes about the X
     * @param {number} y - It describes about the Y
     * @param {boolean} isSelected - It describes about the isSelected
     * @private
     * @returns {void}
     */
    updatePosition(x: number, y: number, isSelected?: boolean): void;
    /**
     * @param {number} x - It describes about the X
     * @param {number} y - It describes about the Y
     * @param {boolean} isSelected - It describes about the isSelected
     * @private
     * @returns {void}
     */
    updateLeftposition(x: number, y: number, isSelected?: boolean): void;
    private getClientValueTop;
    /**
     * @param {any} textMarkupAnnotations - It describes about the text markup annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isImportTextMarkup - It describes about the isImportTextMarkup
     * @param {boolean} isAnnotOrderAction - It describes about the isAnnotOrderAction
     * @private
     * @returns {void}
     */
    renderTextMarkupAnnotationsInPage(textMarkupAnnotations: any, pageNumber: number, isImportTextMarkup?: boolean, isAnnotOrderAction?: boolean): void;
    private renderTextMarkupAnnotations;
    private getHighlightCanvasContext;
    private isPrintCanvas;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    getSettings(annotation: any): AnnotationSelectorSettingsModel;
    /**
     * @param {string} type - It describes about the type
     * @private
     * @returns {void}
     */
    drawTextMarkupAnnotations(type: string): void;
    private isMultiPageAnnotations;
    private isMultiAnnotation;
    private modifyCurrentAnnotation;
    private drawAnnotationSelector;
    private selectMultiPageAnnotations;
    private deletMultiPageAnnotation;
    private modifyMultiPageAnnotations;
    private convertSelectionToTextMarkup;
    private updateTextMarkupAnnotationBounds;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    multiPageCollectionList(annotation: any): ITextMarkupAnnotation[];
    private updateAnnotationNames;
    private updateAnnotationContent;
    private drawTextMarkups;
    private retreiveTextIndex;
    private renderHighlightAnnotation;
    private renderStrikeoutAnnotation;
    private renderUnderlineAnnotation;
    private getProperBounds;
    private isChineseLanguage;
    private drawLine;
    /**
     * @param {any} textMarkupAnnotations - It describes about the text markup annotations
     * @param {number} pageIndex - It describes about the page number
     * @param {any} stampData - It describes about the stamp data
     * @param {any} shapeData - It describes about the shape data
     * @param {any} measureShapeData - It describes about the measure shape data
     * @param {any} stickyData - It describes about the sticky data
     * @param {any} freeTextData - It describes about the free text data
     * @param {any} inkData - It describes about the ink data
     * @private
     * @returns {string} - string
     */
    printAnnotationsInCanvas(textMarkupAnnotations: any, pageIndex: number, stampData: any, shapeData: any, measureShapeData: any, stickyData: any, freeTextData: any, inkData: any): string[];
    /**
     * @private
     * @returns {string} - string
     */
    saveTextMarkupAnnotations(): string;
    /**
     * @private
     * @returns {void}
     */
    deleteTextMarkupAnnotation(): void;
    /**
     * @param {any} bounds - bounds
     * @returns {void}
     * @private
     */
    modifyBoundsProperty(bounds: any): void;
    /**
     * @param {string} color - It describes about the color
     * @private
     * @returns {void}
     */
    modifyColorProperty(color: string): void;
    /**
     * @param {ChangeEventArgs} args - It describes about the args
     * @param {number} isOpacity - It describes about the isOpacity
     * @private
     * @returns {void}
     */
    modifyOpacityProperty(args: ChangeEventArgs, isOpacity?: number): void;
    /**
     * @param {string} property -It describes about the property
     * @param {any} value - It describes about the value
     * @param {string} status - It describes about the status
     * @param {string} annotName - It describes about the annotation name
     * @private
     * @returns {ITextMarkupAnnotation} - ITextMarkuoAnnotation
     */
    modifyAnnotationProperty(property: string, value: any, status: string, annotName?: string): ITextMarkupAnnotation[];
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @param {number} index - It describes about the index
     * @param {string} action - It describes about the action
     * @private
     * @returns {void}
     */
    undoTextMarkupAction(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, action: string): void;
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @param {number} index - It describes about the index
     * @param {string} property - It describes about the proeperty
     * @param {boolean} isUndoAction - It describes about the isUndoAction
     * @private
     * @returns {ITextMarkupAnnotation} - Itextmarkupannotation
     */
    undoRedoPropertyChange(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, property: string, isUndoAction?: boolean): ITextMarkupAnnotation;
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @param {number} index - It describes about the index
     * @param {string} action - It describes about the action
     * @private
     * @returns {void}
     */
    redoTextMarkupAction(annotation: ITextMarkupAnnotation, pageNumber: number, index: number, action: string): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {string} note -  It describes about the note
     * @private
     * @returns {void}
     */
    saveNoteContent(pageNumber: number, note: string): void;
    private clearCurrentAnnotation;
    /**
     * @param {number} pageNumber - It describes about the pageNumber
     * @param {boolean} isSelect - It describes about the isSelect
     * @private
     * @returns {void}
     */
    clearCurrentAnnotationSelection(pageNumber: number, isSelect?: boolean): void;
    private getBoundsForSave;
    private getAnnotationBounds;
    private getRgbCode;
    private getDrawnBounds;
    private getIndexNumbers;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    rerenderAnnotationsPinch(pageNumber: number): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    rerenderAnnotations(pageNumber: number): void;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    onTextMarkupAnnotationMouseUp(event: MouseEvent): void;
    private onTextMarkupMouseUp;
    /**
     * @param {TouchEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    onTextMarkupAnnotationTouchEnd(event: TouchEvent): void;
    private onTextMarkupTouchEnd;
    /**
     * @private
     * @returns {void}
     */
    clearCurrentSelectedAnnotation(): void;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    onTextMarkupAnnotationMouseMove(event: MouseEvent): void;
    private showPopupNote;
    private getCurrentMarkupAnnotation;
    private compareCurrentAnnotations;
    /**
     * @param {number} pageNumber - It describes about the pageNumber
     * @private
     * @returns {void}
     */
    clearAnnotationSelection(pageNumber: number): void;
    /**
     * @param {ITextMarkupAnnotation} annotation - It describes about the annotation
     * @param {HTMLElement} canvas - It describes about the canvas
     * @param {number} pageNumber - It describes about the page number
     * @param {MouseEvent} event - It describes about the event
     * @param {boolean} isProgrammaticSelection - It describes about the programmactic selection
     * @private
     * @returns {void}
     */
    selectAnnotation(annotation: ITextMarkupAnnotation, canvas: HTMLElement, pageNumber?: number, event?: MouseEvent | TouchEvent, isProgrammaticSelection?: boolean): void;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    updateCurrentResizerPosition(annotation?: any): void;
    private drawAnnotationSelectRect;
    /**
     * @param {boolean} isEnable - It describes about the isEnable
     * @private
     * @returns {void}
     */
    enableAnnotationPropertiesTool(isEnable: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    maintainAnnotationSelection(): void;
    /**
     * @param {ITextMarkupAnnotation} pageAnnotations - It describes about the page annotations
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    manageAnnotations(pageAnnotations: ITextMarkupAnnotation[], pageNumber: number): void;
    /**
     * @param {number} pageIndex - It describes about the pageIndex
     * @param {any} textMarkupAnnotations - It describes about the text markup annotations
     * @param {string} id -It describes about the id
     * @private
     * @returns {any} - any
     */
    getAnnotations(pageIndex: number, textMarkupAnnotations: any[], id?: string): any[];
    private getAddedAnnotation;
    private getSelector;
    private getIsPrintValue;
    private annotationDivSelect;
    private getPageContext;
    private getDefaultValue;
    private getMagnifiedValue;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    saveImportedTextMarkupAnnotations(annotation: any, pageNumber: number): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    updateTextMarkupAnnotationCollections(annotation: any, pageNumber: number): any;
    /**
     * @param {string} textMarkUpSettings - It describes about the textmarkup settings
     * @private
     * @returns {void}
     */
    updateTextMarkupSettings(textMarkUpSettings: string): void;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * Get vertex points properties
     *
     * @param {any} points - It describes about the points
     * @private
     * @returns {any} - any
     */
    private getOffsetPoints;
    /**
     * This method used to add annotations with using program.
     *
     * @param {AnnotationType} annotationType - It describes the annotation type
     * @param {any} annotationObject - It describes type of annotation object
     * @returns {object} - object
     * @private
     */
    updateAddAnnotationDetails(annotationType: AnnotationType, annotationObject: any): Object;
}
