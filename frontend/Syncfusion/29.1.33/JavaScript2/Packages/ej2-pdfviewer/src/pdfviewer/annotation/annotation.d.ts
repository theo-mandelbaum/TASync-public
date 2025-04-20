import { FreeTextSettings, HighlightSettings, LineSettings, StickyNotesSettings, StrikethroughSettings, UnderlineSettings, RectangleSettings, CircleSettings, ArrowSettings, PerimeterSettings, DistanceSettings, AreaSettings, RadiusSettings, VolumeSettings, PolygonSettings, InkAnnotationSettings, StampSettings, CustomStampSettings, HandWrittenSignatureSettings } from './../pdfviewer';
import { PdfViewer, PdfViewerBase, AnnotationType, TextMarkupAnnotation, ShapeAnnotation, StampAnnotation, StickyNotesAnnotation, IPopupAnnotation, ICommentsCollection, MeasureAnnotation, InkAnnotation, AllowedInteraction, DynamicStampItem, SignStampItem, StandardBusinessStampItem, IReviewCollection } from '../index';
import { DecoratorShapes } from '@syncfusion/ej2-drawings';
import { PdfAnnotationBaseModel, PdfFontModel } from '../drawing/pdf-annotation-model';
import { AnnotationDataFormat } from '../base';
import { FreeTextAnnotation } from './free-text-annotation';
import { InputElement } from './input-element';
import { AnnotationSelectorSettingsModel, AnnotationSettingsModel } from '../pdfviewer-model';
/**
 * @hidden
 */
export interface IActionElements {
    pageIndex: number;
    index: number;
    annotation: any;
    action: string;
    undoElement: any;
    redoElement: any;
    duplicate?: any;
    modifiedProperty: string;
}
/**
 * @hidden
 */
export interface IPoint {
    x: number;
    y: number;
}
/**
 * Interface for a class Point
 *
 *  @hidden
 */
export interface IAnnotationPoint {
    /**
     * Sets the x-coordinate of a position
     *
     * @default 0
     */
    x: number;
    /**
     * Sets the y-coordinate of a position
     *
     * @default 0
     */
    y: number;
    /**
     * Sets the x-coordinate of a position
     *
     * @default 0
     */
    width: number;
    /**
     * Sets the y-coordinate of a position
     *
     * @default 0
     */
    height: number;
}
/**
 * @hidden
 */
export interface IPageAnnotations {
    pageIndex: number;
    annotations: any[];
}
/**
 * The `Annotation` module is used to handle annotation actions of PDF viewer.
 */
export declare class Annotation {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    textMarkupAnnotationModule: TextMarkupAnnotation;
    /**
     * @private
     */
    shapeAnnotationModule: ShapeAnnotation;
    /**
     * @private
     */
    measureAnnotationModule: MeasureAnnotation;
    /**
     * @private
     */
    stampAnnotationModule: StampAnnotation;
    /**
     * @private
     */
    freeTextAnnotationModule: FreeTextAnnotation;
    /**
     * @private
     */
    inputElementModule: InputElement;
    /**
     * @private
     */
    inkAnnotationModule: InkAnnotation;
    /**
     * @private
     */
    stickyNotesAnnotationModule: StickyNotesAnnotation;
    private popupNote;
    private popupNoteAuthor;
    private popupNoteContent;
    private popupElement;
    private authorPopupElement;
    private noteContentElement;
    private modifiedDateElement;
    private opacityIndicator;
    private startArrowDropDown;
    private endArrowDropDown;
    private lineStyleDropDown;
    private thicknessBox;
    private leaderLengthBox;
    private fillColorPicker;
    private strokeColorPicker;
    private fillDropDown;
    private strokeDropDown;
    private opacitySlider;
    private propertiesDialog;
    private currentAnnotPageNumber;
    private clientX;
    private clientY;
    private isPopupMenuMoved;
    private selectedLineStyle;
    private selectedLineDashArray;
    /**
     * @private
     */
    isUndoRedoAction: boolean;
    private isFreeTextFontsizeChanged;
    private isUndoAction;
    private annotationSelected;
    private isAnnotDeletionApiCall;
    private removedDocumentAnnotationCollection;
    /**
     * @private
     * It is used to store the non render page selected annotation.
     */
    private nonRenderSelectedAnnotation;
    /**
     * @private
     */
    isShapeCopied: boolean;
    /**
     * @private
     */
    actionCollection: IActionElements[];
    /**
     * @private
     */
    redoCollection: IActionElements[];
    /**
     * @private
     */
    isPopupNoteVisible: boolean;
    /**
     * @private
     */
    undoCommentsElement: IPopupAnnotation[];
    /**
     * @private
     */
    redoCommentsElement: IPopupAnnotation[];
    /**
     * @private
     */
    selectAnnotationId: string;
    /**
     * @private
     */
    isAnnotationSelected: boolean;
    /**
     * @private
     */
    annotationPageIndex: number;
    private previousIndex;
    /**
     * @private
     */
    annotationType: string;
    private overlappedAnnotations;
    /**
     * @private
     */
    overlappedCollections: any;
    /**
     * @private
     */
    isFormFieldShape: boolean;
    /**
     * @private
     */
    removedAnnotationCollection: any;
    /**
     * @param {PdfViewer} pdfViewer - pdfViewer
     * @param {PdfViewerBase} viewerBase - viewerBase
     * @private
     */
    constructor(pdfViewer: PdfViewer, viewerBase: PdfViewerBase);
    /**
     * Set annotation type to be added in next user interaction in PDF Document.
     *
     * @param {AnnotationType} type - type
     * @param {DynamicStampItem} dynamicStampItem - dynamicStampItem
     * @param {SignStampItem} signStampItem - signStampItem
     * @param {StandardBusinessStampItem} standardBusinessStampItem - standardBusinessStampItem.
     * @returns {void}
     */
    setAnnotationMode(type: AnnotationType, dynamicStampItem?: DynamicStampItem, signStampItem?: SignStampItem, standardBusinessStampItem?: StandardBusinessStampItem): void;
    deleteAnnotationById(annotationId: string | object): void;
    private clearAnnotationMode;
    deleteAnnotation(): void;
    /**
     * @param {string} annotationId - annotationId
     * @returns {void}
     */
    private getAnnotationsFromCollections;
    /**
     * @param {any} annotation - annotation
     * @returns {void}
     */
    private updateInputFieldDivElement;
    /**
     * @param {any} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @param {boolean} isNeedToReorderCollection - Ensures whether need to reorder the collection or not
     * @param {number} orderNumber - Gets the order number
     * @private
     * @returns {void}
     */
    storeAnnotationCollections(annotation: any, pageNumber: number, isNeedToReorderCollection?: boolean, orderNumber?: number): void;
    checkFormDesignCollection(annotation: any): any;
    updateFormFieldCollection(annotation: any): void;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    getCustomData(annotation: any): object;
    /**
     * @param {string} type - type
     * @param {string} subject - subject
     * @private
     * @returns {void}
     */
    getShapeData(type: string, subject: string): object;
    /**
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    getMeasureData(type: string): object;
    /**
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    getTextMarkupData(type: string): object;
    /**
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    getData(type: string): object;
    /**
     * @private
     * @returns {void}
     */
    clearAnnotationStorage(): void;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {Object} - Object
     */
    checkAnnotationCollection(annotation: any): Object;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    updateAnnotationCollection(annotation: any): void;
    /**
     * @param {any} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @param {string} annotationType - annotationType
     * @private
     * @returns {void}
     */
    updateImportAnnotationCollection(annotation: any, pageNumber: number, annotationType: string): void;
    /**
     * Select the annotations using annotation object or annotation Id.
     *
     * @param {string | object} annotationId - annptationId
     * @returns {void}
     */
    selectAnnotation(annotationId: string | object): void;
    private updateCollectionForNonRenderedPages;
    private getTypeOfAnnotation;
    private removeCommentPanelDiv;
    /**
     * Clear the annotation selection.
     *
     * @returns {void}
     */
    clearSelection(): void;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {number} - number
     */
    getAnnotationTop(annotation: any): number;
    /**
     * @param {any} annotation - annotation
     * @returns {number} - number
     */
    private getAnnotationLeft;
    /**
     * @private
     * @returns {void}
     */
    selectAnnotationFromCodeBehind(): void;
    /**
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {boolean} - boolean
     */
    findRenderPageList(pageIndex: number): boolean;
    private getAnnotationsFromAnnotationCollections;
    private getTextMarkupAnnotations;
    /**
     * @param {string} type -string
     * @param {string} measureType - measureType
     * @private
     * @returns {AnnotationType} - type
     */
    getAnnotationType(type: string, measureType: string): AnnotationType;
    /**
     * @param {number} pageNumber - pageNumber
     * @param {string} annotationId - annotationId
     * @private
     * @returns {number} - number
     */
    getAnnotationIndex(pageNumber: number, annotationId: string): number;
    /**
     * @private
     * @returns {void}
     */
    initializeCollection(): void;
    /**
     * @private
     * @returns {void}
     */
    showCommentsPanel(): void;
    /**
     * @param {number} pageNumber - This is pageNumber
     * @param {number} index - index
     * @param {any} annotation - annotation
     * @param {string} actionString - actionString
     * @param {string} property - property
     * @param {any} node - node
     * @param {any} redo - redo
     * @private
     * @returns {void}
     */
    addAction(pageNumber: number, index: number, annotation: any, actionString: string, property: string, node?: any, redo?: any): void;
    /**
     * @private
     * @returns {void}
     */
    undo(): void;
    /**
     * @private
     * @returns {void}
     */
    redo(): void;
    private undoRedoMultiline;
    private updateFormFieldValueChange;
    private updateFormFieldPropertiesChanges;
    private updateCollectionForLineProperty;
    private updateToolbar;
    private createNote;
    /**
     * @param {any} event - event
     * @param {string} color - color
     * @param {string} author - author
     * @param {string} note - note
     * @param {string} type - type
     * @private
     * @returns {void}
     */
    showPopupNote(event: any, color: string, author: string, note: string, type: string): void;
    /**
     * @private
     * @returns {void}
     */
    hidePopupNote(): void;
    private createTextMarkupPopup;
    private onPopupElementMoveStart;
    private onPopupElementMove;
    private onPopupElementMoveEnd;
    private saveClosePopupMenu;
    /**
     * @private
     * @returns {void}
     */
    closePopupMenu(): void;
    /**
     * @param {any} event - event
     * @private
     * @returns {void}
     */
    showAnnotationPopup(event: any): void;
    /**
     * @param {any} args - args
     * @param {boolean} isOpacity - isOpacity
     * @private
     * @returns {void}
     */
    modifyOpacity(args: any, isOpacity?: boolean): void;
    /**
     * @param {string} currentColor - currentColor
     * @private
     * @returns {void}
     */
    modifyFontColor(currentColor: string): void;
    /**
     * @param {string} currentValue - currentValue
     * @private
     * @returns {void}
     */
    modifyFontFamily(currentValue: string): void;
    /**
     * @param {number} currentValue - currentValue
     * @param {boolean} isInteracted - isInteracted
     * @private
     * @returns {void}
     */
    modifyFontSize(currentValue: number, isInteracted: boolean): void;
    /**
     * @param {number} fontSize - font size
     * @private
     * @returns {void}
     */
    handleFontSizeUpdate(fontSize: number): void;
    /**
     * @param {string} currentValue - currentValue
     * @private
     * @returns {void}
     */
    modifyTextAlignment(currentValue: string): void;
    /**
     * @param {PdfFontModel} fontInfo - fontInfo
     * @param {string} action - action
     * @private
     * @returns {void}
     */
    modifyTextProperties(fontInfo: PdfFontModel, action: string): void;
    /**
     * @param {number} thicknessValue - thicknessValue
     * @private
     * @returns {void}
     */
    modifyThickness(thicknessValue: number): void;
    /**
     * @param {string} color - color
     * @private
     * @returns {void}
     */
    modifyStrokeColor(color: string): void;
    /**
     * @param {string} color -color
     * @private
     * @returns {void}
     */
    modifyFillColor(color: string): void;
    /**
     * @param {string} dynamicText - dynamicText
     * @param {string} annotName - annotName
     * @private
     * @returns {void}
     */
    modifyDynamicTextValue(dynamicText: string, annotName: string): void;
    /**
     * @param {PdfAnnotationBaseModel} annotationBase - annotationBase
     * @param {string} property - property
     * @private
     * @returns {any} - any
     */
    modifyInCollections(annotationBase: PdfAnnotationBaseModel, property: string): any;
    /**
     * @private
     * @returns {void}
     */
    createPropertiesWindow(): void;
    private destroyPropertiesWindow;
    private refreshColorPicker;
    private createAppearanceTab;
    private createContent;
    private onStrokeDropDownBeforeOpen;
    private onFillDropDownBeforeOpen;
    private createStyleList;
    private createColorPicker;
    private createDropDownButton;
    private updateColorInIcon;
    /**
     * @param {string} color - color
     * @private
     * @returns {void}
     */
    onFillColorChange(color: string): void;
    /**
     * @param {string} color - color
     * @private
     * @returns {void}
     */
    onStrokeColorChange(color: string): void;
    private setThickness;
    private createDropDownContent;
    private createListForStyle;
    private onStartArrowHeadStyleSelect;
    private onEndArrowHeadStyleSelect;
    private createInputElement;
    private updateOpacityIndicator;
    /**
     * @param {number} opacityValue - opacityValue
     * @private
     * @returns {void}
     */
    onOkClicked(opacityValue?: number): void;
    private onCancelClicked;
    private getArrowTypeFromDropDown;
    /**
     * @param {DecoratorShapes} arrow - arrow
     * @private
     * @returns {string}- string
     */
    getArrowString(arrow: DecoratorShapes): string;
    /**
     * @private
     * @returns {void}
     */
    onAnnotationMouseUp(): void;
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {any} event - event
     * @private
     * @returns {void}
     */
    onShapesMouseup(pdfAnnotationBase: PdfAnnotationBaseModel, event: any): void;
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {boolean} isNewlyAdded - isNewlyAdded
     * @private
     * @returns {void}
     */
    updateCalibrateValues(pdfAnnotationBase: PdfAnnotationBaseModel, isNewlyAdded?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    onAnnotationMouseDown(): void;
    private enableBasedOnType;
    private getProperDate;
    /**
     * @param {IPageAnnotations} pageAnnotations - pageAnnotations
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {number} - number
     */
    getPageCollection(pageAnnotations: IPageAnnotations[], pageNumber: number): number;
    /**
     * @param {any} annotations - annotations
     * @param {string} id - id
     * @private
     * @returns {any} - any
     */
    getAnnotationWithId(annotations: any[], id: string): any;
    /**
     * @param {any} event - event
     * @private
     * @returns {number} - number
     */
    getEventPageNumber(event: any): number;
    /**
     * @param {any} commentsAnnotations - commentsAnnotations
     * @param {any} parentAnnotation - parentAnnotation
     * @param {string} author - author
     * @private
     * @returns {any} - any
     */
    getAnnotationComments(commentsAnnotations: any, parentAnnotation: any, author: string): ICommentsCollection[];
    private getRandomNumber;
    /**
     * @private
     * @returns {string} - string
     */
    createGUID(): string;
    /**
     * Generates a canvas element with mix-blend mode to highlight annotations.
     * @param {HTMLElement} pageDiv - pageDiv
     * @param {number} pageWidth - pageWidth
     * @param {number} pageHeight - pageHeight
     * @param {number} pageNumber - pageNumber
     * @param {string} displayMode - displayMode
     * @private
     * @returns {HTMLElement} - htmlelement
     */
    createBlendAnnotationsIntoCanvas(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode?: string): HTMLElement;
    /**
     * @param {number} width - width
     * @param {number} height - height
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    resizeAnnotations(width: number, height: number, pageNumber: number): void;
    /**
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    clearAnnotationCanvas(pageNumber: number): void;
    /**
     * @param {number} pageNumber - pageNumber
     * @param {any} shapeAnnotation - shapeAnnotation
     * @param {any} measureShapeAnnotation - measureShapeAnnotation
     * @param {any} textMarkupAnnotation - textMarkupAnnotation
     * @param {any} canvas - canvas
     * @param {boolean} isImportAnnotations - isImportAnnotations
     * @param {boolean} isAnnotOrderAction - isAnnotOrderAction
     * @param {any} freeTextAnnotation - freeTextAnnotation
     * @param {any} inkAnnotation - inkAnnotation
     * @private
     * @returns {void}
     */
    renderAnnotations(pageNumber: number, shapeAnnotation: any, measureShapeAnnotation: any, textMarkupAnnotation: any, canvas?: any, isImportAnnotations?: boolean, isAnnotOrderAction?: boolean, freeTextAnnotation?: any, inkAnnotation?: any): void;
    /**
     * @param {number} pageNumber - pageNumber
     * @param {any} annotation - annotation
     * @param {string} annotationId - annotationId
     * @private
     * @returns {number} - number
     */
    storeAnnotations(pageNumber: number, annotation: any, annotationId: string): number;
    /**
     * @param {string} type - type
     * @private
     * @returns {DecoratorShapes}- decorateshapes
     */
    getArrowType(type: string): DecoratorShapes;
    /**
     * @param {DecoratorShapes} arrow - arrow
     * @private
     * @returns {string}- string
     */
    getArrowTypeForCollection(arrow: DecoratorShapes): string;
    /**
     * @param {any} bound - bound
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {any} - any
     */
    getBounds(bound: any, pageIndex: number): any;
    /**
     * @param {any} bound - bound
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {any} - any
     */
    getInkBounds(bound: any, pageIndex: number): any;
    /**
     * @param {any} points - points
     * @param {number} pageIndex - pageIndex
     * @private
     * @returns {any} - any
     */
    getVertexPoints(points: any[], pageIndex: number): any;
    /**
     * @param {number} pageIndex - pageIndex
     * @param {any} shapeAnnotations - shapeAnnotations
     * @param {string} idString - idString
     * @private
     * @returns {any} - any
     */
    getStoredAnnotations(pageIndex: number, shapeAnnotations: any[], idString: string): any[];
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {boolean} isColor - isColor
     * @param {boolean} isStroke - isStroke
     * @param {boolean} isThickness - isThickness
     * @param {boolean} isOpacity - isOpacity
     * @param {boolean} isLineStart - isLineStart
     * @param {boolean} isLineEnd - isLineEnd
     * @param {boolean} isDashArray - isDashArray
     * @param {boolean} isFreeText - isFreeText
     * @param {string} previousText - previousText
     * @param {string} currentText - currentText
     * @private
     * @returns {void}
     */
    triggerAnnotationPropChange(pdfAnnotationBase: PdfAnnotationBaseModel, isColor: boolean, isStroke: boolean, isThickness: boolean, isOpacity: boolean, isLineStart?: boolean, isLineEnd?: boolean, isDashArray?: boolean, isFreeText?: boolean, previousText?: string, currentText?: string): void;
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - It describes about the pdf annotation base
     * @private
     * @returns {void}
     */
    triggerAnnotationAdd(pdfAnnotationBase: PdfAnnotationBaseModel): void;
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @private
     * @returns {void}
     */
    triggerAnnotationResize(pdfAnnotationBase: PdfAnnotationBaseModel): void;
    /**
     * @param {PdfAnnotationBaseModel} pdfAnnotationBase - pdfAnnotationBase
     * @param {boolean} isMoving - isMoving
     * @private
     * @returns {void}
     */
    triggerAnnotationMove(pdfAnnotationBase: PdfAnnotationBaseModel, isMoving?: boolean): void;
    /**
     * @param {any} annotationId - annotationId
     * @param {number} pageNumber - pageNumber
     * @param {any} annotation - annotation
     * @param {any} annotationCollection - annotationCollection
     * @param {boolean} isDblClick - isDblClick
     * @param {boolean} isSelected - isSelected
     * @private
     * @returns {void}
     */
    annotationSelect(annotationId: any, pageNumber: number, annotation: any, annotationCollection?: any, isDblClick?: boolean, isSelected?: boolean): void;
    selectSignature(signatureId: string, pageNumber: number, signatureModule: PdfAnnotationBaseModel): void;
    /**
     *
     * @param {string} signatureId - Gets the id of the signature
     * @param {number} pageNumber - Gets the page number value
     * @param {any} signatureModule - It describes about the signature module
     * @private
     * @returns {void}
     */
    unselectSignature(signatureId: string, pageNumber: number, signatureModule: any): void;
    editSignature(signature: any): void;
    private deletComment;
    private addReplyComments;
    private editComments;
    /**
     * Updates the existing properties of the specified annotation object.
     *
     * @param {any} annotation - The annotation object that contains the properties to be updated.
     * The object should include valid annotation properties such as type, bounds, color, opacity, etc.
     * Modifying these properties will update the annotation in the PDF Viewer accordingly.
     *
     * @remarks
     * This method will apply the changes to the annotation and refresh the viewer to reflect the updated properties.
     */
    editAnnotation(annotation: any): void;
    private annotationPropertyChange;
    private calculateAnnotationBounds;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    updateFreeTextProperties(annotation: any): void;
    private updateAnnotationComments;
    /**
     * @param {any} annotation - annotation
     * @param {any} currentAnnotation - currentAnnotation
     * @private
     * @returns {void}
     */
    addFreeTextProperties(annotation: any, currentAnnotation: any): void;
    updateMeasurementSettings(): void;
    private updateCollection;
    private modifyAnnotationProperties;
    /**
     * @param {string} annotationType - annotationType
     * @param {string} annotationSubType - annotationSubType
     * @private
     * @returns {string} - string
     */
    updateAnnotationAuthor(annotationType: string, annotationSubType?: string): string;
    /**
     * @param {string} colour - colour
     * @private
     * @returns {string} - string
     */
    nameToHash(colour: string): string;
    private updateFreeTextFontStyle;
    private setFreeTextFontStyle;
    /**
     * @param {any} annotation - annotation
     * @param {boolean} isSettings - isSettings
     * @private
     * @returns {any} - any
     */
    findAnnotationSettings(annotation: any, isSettings?: boolean): AnnotationSettingsModel;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {any} - any
     */
    updateAnnotationSettings(annotation: any): any;
    /**
     * @param {any} annotationSettings - annotationSettings
     * @private
     * @returns {any} - any
     */
    updateSettings(annotationSettings: any): any;
    private getOverlappedAnnotations;
    private getPageShapeAnnotations;
    private findOverlappedAnnotations;
    private calculateOverlappedAnnotationBounds;
    /**
     * @param {any} annotation - annotation
     * @param {number} pageNumber - pageNumber
     * @param {string} type - type
     * @private
     * @returns {string} - string
     */
    findAnnotationMode(annotation: any, pageNumber: number, type: string): string;
    private checkOverlappedCollections;
    private orderTextMarkupBounds;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {void}
     */
    updateModifiedDate(annotation: any): void;
    private setAnnotationModifiedDate;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    retrieveAnnotationCollection(): any[];
    /**
     * @param {string} interaction - interaction
     * @param {any} annotation - annotation
     * @private
     * @returns {boolean} - boolean
     */
    checkAllowedInteractions(interaction: string, annotation: any): boolean;
    /**
     * @param {any} menuObj - menuObj
     * @private
     * @returns {void}
     */
    checkContextMenuDeleteItem(menuObj: any): void;
    /**
     * @private
     * @returns {boolean} - boolean
     */
    isEnableDelete(): boolean;
    /**
     * @private
     * @returns {ITextMarkupAnnotation | PdfAnnotationBaseModel} - ITextMarkupAnnotation | PdfAnnotationBaseModel
     */
    findCurrentAnnotation(): AnnotationsInternal | PdfAnnotationBaseModel;
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {string[]} - return string array
     */
    updateAnnotationAllowedInteractions(annotation: any): string[];
    /**
     * @param {any} annotation - annotation
     * @private
     * @returns {boolean} -boolean
     */
    checkIsLockSettings(annotation: any): boolean;
    private checkLockSettings;
    /**
     * @private
     * @returns {boolean} - boolean
     */
    restrictContextMenu(): boolean;
    private checkAllowedInteractionSettings;
    /**
     * @param {string} value - value
     * @param {string} type - type
     * @private
     * @returns {string} - string
     */
    getValue(value?: string, type?: string): string;
    private convertRgbToNumberArray;
    private convertToRgbString;
    private convertToHsvString;
    private roundValue;
    private hexToRgb;
    private rgbToHsv;
    private hsvToRgb;
    private rgbToHex;
    /**
     * @param {AnnotationDataFormat} dataFormat - dataFormat
     * @private
     * @returns {Promise} - promise
     */
    exportAnnotationsAsStream(dataFormat: AnnotationDataFormat): Promise<object>;
    private hex;
    /**
     * @param {any} obj - obj
     * @private
     * @returns {Object} - Object
     */
    cloneObject(obj: Object): Object;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @private
     * @returns {string} - string
     */
    getModuleName(): string;
    /**
     * Get vertex points properties
     *
     * @param {IPoint[]} points - points
     * @private
     * @returns {IPointBase[]} - IPointBase[]
     */
    getVertexPointsXY(points: IPoint[]): IPointBase[];
    /**
     * Method used to add annotations using program.
     *
     * @param {AnnotationType} annotationType - It describes type of annotation object.
     * @param {FreeTextSettings} options -  It describes about the annotation objects and it's property.
     * @param {DynamicStampItem} dynamicStampItem - It describe which type of dynamic stamp.
     * @param {SignStampItem} signStampItem - It describe which type of sign stamp.
     * @param {StandardBusinessStampItem} standardBusinessStampItem - It describe which type of standard business stamp.
     * @returns {void}
     */
    addAnnotation(annotationType: AnnotationType, options?: FreeTextSettings | StickyNotesSettings | HighlightSettings | UnderlineSettings | LineSettings | StrikethroughSettings | RectangleSettings | CircleSettings | ArrowSettings | PolygonSettings | DistanceSettings | PerimeterSettings | AreaSettings | RadiusSettings | VolumeSettings | InkAnnotationSettings | HandWrittenSignatureSettings | StampSettings | CustomStampSettings, dynamicStampItem?: DynamicStampItem, signStampItem?: SignStampItem, standardBusinessStampItem?: StandardBusinessStampItem): void;
    /**
     * @param {PdfAnnotationBaseModel} annotation - annotation
     * @private
     * @returns {void}
     */
    triggerAnnotationAddEvent(annotation: PdfAnnotationBaseModel): void;
    /**
     * @private
     * @returns {void}
     */
    triggerAnnotationUnselectEvent(): void;
    /**
     * @private
     * @returns {void}
     */
    triggerSignatureUnselectEvent(): void;
    /**
     * @param {PdfAnnotationBaseModel} currentAnnotation - currentAnnotation
     * @param {any} currentValue - currentValue
     * @private
     * @returns {void}
     */
    updateFontFamilyRenderSize(currentAnnotation: PdfAnnotationBaseModel, currentValue: string): void;
    /**
     * @param {string} text - text
     * @param {number} rectangle - rectangle
     * @param {number} width - width
     * @private
     * @returns {number} - fontSize
     */
    calculateFontSize(text: string, rectangle: {
        width: number;
        height: number;
    }): number;
}
/**
 *
 * @hidden
 */
export interface IPointBase {
    X: number;
    Y: number;
}
/**
 *
 * @hidden
 */
export interface IRect {
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 *
 * @hidden
 */
export declare class AnnotationBaseSettings {
    opacity?: number;
    fillColor?: string;
    strokeColor?: string;
    thickness?: number;
    author?: string;
    subject?: string;
    modifiedDate?: string;
    lineHeadStartStyle?: string;
    lineHeadEndStyle?: string;
    borderDashArray?: string;
    borderColor?: string;
    borderWidth?: number;
    fontSize?: number;
    bounds?: AnnotBoundsRect;
    width?: number;
    height?: number;
    fontColor?: string;
    fontFamily?: string;
    defaultText?: string;
    fontStyle?: PdfFontModel;
    textAlignment?: string;
}
/**
 *
 * @hidden
 */
export declare class AnnotBoundsRect {
    left: number;
    top: number;
    width: number;
    height: number;
}
/**
 *
 * @hidden
 */
export declare class AnnotBoundsBase {
    X: number;
    Y: number;
    Width: number;
    Height: number;
}
/**
 *
 * @hidden
 */
export declare class AnnotRectBase {
    X: number;
    Y: number;
    Width: number;
    Height: number;
    x: number;
    y: number;
    width: number;
    height: number;
}
/**
 *
 * @hidden
 */
export declare class AnnotFontBase {
    Bold?: boolean;
    Italic?: boolean;
    Strikeout?: boolean;
    Underline?: boolean;
}
/**
 *
 * @hidden
 */
export declare class IBounds {
    Right: number;
    Bottom: number;
}
/**
 *
 * @hidden
 */
export declare class AnnotationsInternal {
    annotationId?: string;
    pageNumber?: number;
    pageIndex?: number;
    shapeAnnotationType?: string;
    bounds?: AnnotBoundsRect | IRect | IBounds;
    uniqueKey?: string;
    id?: string;
    textMarkupAnnotationType: string;
    author: string;
    subject: string;
    modifiedDate: string;
    note: string;
    color: any;
    rect?: any;
    opacity: number;
    comments: ICommentsCollection[];
    review: IReviewCollection;
    annotName: string;
    position?: string;
    textMarkupContent: string;
    textMarkupStartIndex: number;
    textMarkupEndIndex: number;
    annotationSelectorSettings: AnnotationSelectorSettingsModel;
    customData: object;
    isMultiSelect?: boolean;
    annotNameCollection?: any[];
    annotpageNumbers?: any[];
    annotationSettings?: any;
    allowedInteractions?: AllowedInteraction;
    isLocked: boolean;
    isPrint: boolean;
    isCommentLock: boolean;
    isAnnotationRotated: boolean;
    annotationRotation?: number;
    ShapeAnnotationType?: string;
    annotationAddMode?: string;
    rotateAngle?: number;
    pageRotation?: number;
}
/**
 *
 * @hidden
 */
export declare class AnnotationsBase {
    isMultiSelect?: boolean;
    isAddAnnotationProgramatically?: boolean;
    annotationAddMode?: string;
    AllowedInteractions?: AllowedInteraction[];
    allowedInteractions?: AllowedInteraction[];
    Bounds?: AnnotBoundsBase | IRect | IBounds;
    AnnotType?: string;
    VertexPoints?: IPointBase[];
    AnnotationSettings?: AnnotationSettingsModel;
    IsLocked?: boolean;
    PageRotation?: number;
    author?: string;
    subject?: string;
    modifiedDate?: string;
    Rotate?: number;
    Author?: string;
    ModifiedDate?: string;
    Subject?: string;
    Thickness?: number;
    MarkupText?: string;
    StrokeColor?: string;
    FillColor?: string;
    FontSize?: number;
    Font?: AnnotFontBase;
    AnnotName?: string;
    Opacity?: number;
    FontColor?: string;
    IsPrint?: boolean;
    IsCommentLock?: boolean;
    AnnotationSelectorSettings?: AnnotationSelectorSettingsModel;
    rotateAngle?: number;
    pageRotation?: number;
    IsReadonly?: boolean;
    IsTransparentSet?: boolean;
    rect?: any;
    ShapeAnnotationType?: string;
    FontFamily?: string;
    TextAlign?: string;
    Comments?: ICommentsCollection[];
    State?: string;
    StateModel?: string;
    annotationId?: string;
    pageNumber?: number;
    pageIndex?: number;
    shapeAnnotationType?: string;
    bounds?: AnnotBoundsRect | IRect;
    uniqueKey?: string;
    id?: string;
}
