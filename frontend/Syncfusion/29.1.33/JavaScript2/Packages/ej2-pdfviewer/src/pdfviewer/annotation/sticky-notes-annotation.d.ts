import { StickyNotesSettings } from './../pdfviewer';
import { PdfViewerBase, PdfViewer, AllowedInteraction, IPoint } from '../index';
import { AnnotationSelectorSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IPopupAnnotation {
    shapeAnnotationType: string;
    pathData: string;
    author: string;
    subject: string;
    modifiedDate: string;
    note: string;
    bounds: any;
    color: any;
    opacity: number;
    state: string;
    stateModel: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    pageNumber: number;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    customData: object;
    annotationSettings: any;
    allowedInteractions: AllowedInteraction;
    isPrint: boolean;
    isCommentLock: boolean;
}
/**
 * @hidden
 */
export interface ICommentsCollection {
    author: string;
    modifiedDate: string;
    annotName: string;
    subject: string;
    parentId: string;
    note: string;
    state: string;
    stateModel: string;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    shapeAnnotationType: string;
    position?: number;
    isLock: boolean;
}
/**
 * @hidden
 */
export interface IReviewCollection {
    author: string;
    state: string;
    stateModel: string;
    modifiedDate: string;
    annotId?: string;
}
/**
 * StickyNotes module
 */
export declare class StickyNotesAnnotation {
    private pdfViewer;
    private pdfViewerBase;
    private accordionContent;
    private accordionPageContainer;
    private accordionContentContainer;
    private commentsContainer;
    private commentMenuObj;
    private moreButtonId;
    private commentsCount;
    private commentsreplyCount;
    private commentContextMenu;
    private isAccordionContainer;
    private isSetAnnotationType;
    private isNewcommentAdded;
    private isCreateContextMenu;
    private commentsRequestHandler;
    private selectAnnotationObj;
    private isCommentsSelected;
    /**
     * @private
     */
    isAddAnnotationProgramatically: boolean;
    /**
     * @private
     */
    isEditableElement: boolean;
    /**
     * @private
     */
    accordionContainer: HTMLElement;
    /**
     * @private
     */
    mainContainer: HTMLElement;
    /**
     * @private
     */
    opacity: number;
    private isPageCommentsRendered;
    private isCommentsRendered;
    /**
     * @private
     */
    isAnnotationRendered: boolean;
    private globalize;
    /**
     * @private
     */
    textFromCommentPanel: boolean;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {any} stickyAnnotations - It describes about the sticky annotations
     * @param {number} pageNumber - It describes about the page number
     * @param {any} canvas - It describes about the canvas
     * @private
     * @returns {void}
     */
    renderStickyNotesAnnotations(stickyAnnotations: any, pageNumber: number, canvas?: any): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {any} - any
     */
    getSettings(annotation: any): any;
    /**
     * @param {number} X - It describes about the X
     * @param {number} Y - It describes about the Y
     * @param {number} width - It describes about the width
     * @param {number} height - It describes about the height
     * @param {number} pageIndex - It describes about the page index
     * @param {any} annotation - It describes about the annotation
     * @param {any} canvas - It describes about the canvas
     * @private
     * @returns {void}
     */
    drawStickyNotes(X: number, Y: number, width: number, height: number, pageIndex: number, annotation: any, canvas?: any): void;
    private setImageSource;
    /**
     * @private
     * @returns {void}
     */
    createRequestForComments(): void;
    private renderCommentsOnSuccess;
    /**
     * @param {any} excistingAnnotation - It describes about the existing annotation
     * @param {any} newAnnotation - It describes about the new annotation
     * @private
     * @returns {any} - any
     */
    updateAnnotationsInDocumentCollections(excistingAnnotation: any, newAnnotation: any): any;
    private updateDocumentAnnotationCollections;
    private renderAnnotationCollections;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {boolean} isSignature - It describes about the issignature
     * @private
     * @returns {void}
     */
    updateCollections(annotation: any, isSignature?: boolean): void;
    /**
     * @param {any} data - It describes about the data
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    renderAnnotationComments(data: any, pageIndex: number): void;
    /**
     * @private
     * @returns {void}
     */
    initializeAcccordionContainer(): void;
    /**
     * @private
     * @returns {void}
     */
    updateCommentPanelTextTop(): void;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {any} - any
     */
    createPageAccordion(pageIndex: number): any;
    private alignAccordionContainer;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    updateCommentPanelScrollTop(pageNumber: number): void;
    private getButtonState;
    /**
     * @param {any} data - It describes about the data
     * @param {number} pageIndex - It describes about the page index
     * @param {string} type - It describes about the type
     * @param {string} annotationSubType - It describes about the annotation sub type
     * @param {boolean} isReRender - It describes about the isRenderer
     * @private
     * @returns {string} - string
     */
    createCommentControlPanel(data: any, pageIndex: number, type?: string, annotationSubType?: string, isReRender?: boolean): string;
    private commentDivFocus;
    private updateScrollPosition;
    private updateCommentsScrollTop;
    /**
     * @param {any} args - It describes about the args
     * @private
     * @returns {void}
     */
    createCommentDiv(args: any): void;
    /**
     * @param {any} args - It describes about the args
     * @param {any} comment - It describes about the comment
     * @private
     * @returns {void}
     */
    saveCommentDiv(args: any, comment: any): void;
    private renderComments;
    /**
     * @param {any} data - It describes about the data
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isCopy - It describes about the isCopy
     * @private
     * @returns {string} - string
     */
    createCommentsContainer(data: any, pageIndex: number, isCopy?: boolean): string;
    private modifyProperty;
    private createTitleContainer;
    private createReplyDivTitleContainer;
    private updateCommentIcon;
    private updateStatusContainer;
    /**
     * @param {HTMLElement} removeDiv -  It describes about the removeDiv
     * @private
     * @returns {void}
     */
    updateAccordionContainer(removeDiv: HTMLElement): void;
    /**
     * @private
     * @returns {void}
     */
    createCommentContextMenu(): void;
    private contextMenuBeforeOpen;
    private commentMenuItemSelect;
    private handleCommentDeletion;
    private getAnnotationById;
    private moreOptionsClick;
    private openTextEditor;
    /**
     * @param {any} commentEvent - It describes about the selected reply
     * @private
     * @returns {boolean} - boolean
     */
    checkIslockProperty(commentEvent: any): boolean;
    private openEditorElement;
    private commentsDivClickEvent;
    private commentsDivDoubleClickEvent;
    private commentDivOnSelect;
    private commentDivMouseOver;
    private commentDivMouseLeave;
    /**
     * @param {any} event -  It describes about the event
     * @private
     * @returns {void}
     */
    drawIcons(event: any): void;
    /**
     * @param {string} annotationType - It describes about the annotation type
     * @param {number} pageNumber - It describes about the page number
     * @param {string} annotationSubType - It describes about the annotation sub type
     * @private
     * @returns {string} - string
     */
    addComments(annotationType: string, pageNumber: number, annotationSubType?: string): string;
    private commentsAnnotationSelect;
    private findAnnotationObject;
    private checkAnnotationSettings;
    private updateCommentsContainerWidth;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    selectCommentsAnnotation(pageIndex: number): void;
    private setAnnotationType;
    private modifyTextProperty;
    /**
     * @param {any} date - It describes about the date
     * @private
     * @returns {string} - string
     */
    getDateAndTime(date?: any): string;
    getDateAndTimeFormat(date?: any): string;
    private modifyCommentsProperty;
    private modifyStatusProperty;
    /**
     * @param {any} commentsElement - It describes about the comments element
     * @param {any} replyElement - It describes about the reply element
     * @private
     * @returns {void}
     */
    modifyCommentDeleteProperty(commentsElement: any, replyElement: any): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @private
     * @returns {void}
     */
    updateOpacityValue(annotation: any): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {string} isAction - It describes about the isAction
     * @param {any} undoAnnotation - It describes about the undo annotation
     * @private
     * @returns {any} - any
     */
    undoAction(annotation: any, isAction: string, undoAnnotation?: any): any;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {string} isAction - It describes about the isAction
     * @param {any} undoAnnotation - It describes about the undo annotation
     * @private
     * @returns {any} - any
     */
    redoAction(annotation: any, isAction: string, undoAnnotation?: any): any;
    private updateUndoRedoCollections;
    /**
     * @param {any} pageIndex - It describes about the page index
     * @param {string} type - It describes about the type
     * @param {boolean} action - It describes about the action
     * @private
     * @returns {void}
     */
    addAnnotationComments(pageIndex: any, type: string, action?: boolean): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {string} type - It describes about the type
     * @param {string} action - It describes about the action
     * @param {boolean} isUndoAction - Ensures whether undo action is true or not
     * @private
     * @returns {void}
     */
    findPosition(annotation: any, type: string, action?: string, isUndoAction?: boolean): any;
    private getAnnotations;
    private manageAnnotations;
    updateStickyNotes(annotation: any, id: any): void;
    saveStickyAnnotations(): string;
    private deleteStickyNotesAnnotations;
    addStickyNotesAnnotations(pageNumber: number, annotationBase: any): void;
    /**
     * @param {string} annotName - It describes about the annotName
     * @param {string} text - It describes about the text
     * @private
     * @returns {void}
     */
    addTextToComments(annotName: string, text: string): void;
    /**
     * @param {any} newAnnotation - It describes about the new annotation
     * @param {any} annotation - It describes about the annotation
     * @param {boolean} isCut - It describes about the isCut
     * @private
     * @returns {void}
     */
    updateAnnotationCollection(newAnnotation: any, annotation: any, isCut: boolean): void;
    private findAnnotationType;
    private setExistingAnnotationModifiedDate;
    private updateModifiedTime;
    private setModifiedDate;
    private convertUTCDateToLocalDate;
    private updateModifiedDate;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {boolean} isBounds - It describes about the isBoolean
     * @param {boolean} isUndoRedoAction - It describes about the isUndoRedoAction
     * @private
     * @returns {void}
     */
    updateAnnotationModifiedDate(annotation: any, isBounds?: boolean, isUndoRedoAction?: boolean): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    saveImportedStickyNotesAnnotations(annotation: any, pageNumber: number): void;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {any} - any
     */
    updateStickyNotesAnnotationCollections(annotation: any, pageNumber: number): any;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
    /**
     * This method used to add annotations with using program.
     *
     * @param {StickyNotesSettings} annotationObject - It describes type of annotation object
     * @param {IPoint} offset - It describes about the annotation bounds or location
     * @returns {object} - object
     * @private
     */
    updateAddAnnotationDetails(annotationObject: StickyNotesSettings, offset: IPoint): Object;
    /**
     * @param {any} type - It describes about the type
     * @private
     * @returns {any} - any
     */
    private getAnnotationType;
    /**
     * @param {any} annotation - It describes about the annotation
     * @param {any} commonDiv - It describes about the commonDiv
     * @private
     * @returns {string} - string
     */
    private getAuthorName;
}
