import { Dialog } from '@syncfusion/ej2-popups';
import { PdfViewer, TextLayer, Signature, AccessibilityTags } from '../index';
import { NavigationPane } from './navigation-pane';
import { TextMarkupAnnotation, IPoint } from '../annotation';
import { AjaxHandler } from '../index';
import { Point, DrawingElement, PointModel, Matrix } from '@syncfusion/ej2-drawings';
import { ToolBase, Actions, MouseEventArgs } from '../drawing/tools';
import { ActiveElements } from '../drawing/action';
import { PdfAnnotationBaseModel } from '../drawing/pdf-annotation-model';
import { AnnotationDataFormat, FormFieldDataFormat } from './types';
import { IContextMenu } from './interfaces';
import { BlazorUiAdaptor } from './blazor-ui-adaptor';
import { PdfViewerSessionStorage, PdfiumTaskScheduler } from './pdfviewer-utlis';
/**
 * The `ISize` module is used to handle page size property of PDF viewer.
 *
 * @hidden
 */
export interface ISize {
    width: number;
    height: number;
    top: number;
    rotation?: number;
}
/**
 * The `IPinchZoomStorage` module is used to handle pinch zoom storage of PDF viewer.
 *
 * @hidden
 */
export interface IPinchZoomStorage {
    index: number;
    pinchZoomStorage: object;
}
/**
 * The `IAnnotationCollection` module is used to handle page size property of PDF viewer.
 *
 * @hidden
 */
export interface IAnnotationCollection {
    textMarkupAnnotation: object;
    shapeAnnotation: object;
    measureShapeAnnotation: object;
    stampAnnotations: object;
    stickyNotesAnnotation: object;
    freeTextAnnotation: object;
    signatureAnnotation?: object;
    signatureInkAnnotation?: object;
}
/**
 * @hidden
 */
interface ICustomStampItems {
    customStampName: string;
    customStampImageSource: string;
}
export declare class PdfViewerBase {
    /**
     * @private
     */
    hyperlinkAndLinkAnnotation: any;
    /**
     * @private
     */
    pageTextDetails: any;
    /**
     * @private
     */
    pageImageDetails: any;
    /**
     * @private
     */
    viewerContainer: HTMLElement;
    /**
     * @private
     */
    contextMenuModule: IContextMenu;
    /**
     * @private
     */
    documentPathByteArray: string | Uint8Array;
    /**
     * @private
     */
    pageSize: ISize[];
    /**
     * @private
     */
    existingFieldImport: boolean;
    /**
     * @private
     */
    pageCount: number;
    /**
     * @private
     */
    customZoomValues: any[];
    /**
     * @private
     */
    isReRenderRequired: boolean;
    /**
     * @private
     */
    currentPageNumber: number;
    private previousZoomValue;
    private initialZoomValue;
    /**
     * @private
     */
    activeElements: ActiveElements;
    /**
     * @private
     */
    mouseDownEvent: Event;
    /**
     * @private
     */
    accessibilityTags: AccessibilityTags;
    /**
     * @private
     */
    textLayer: TextLayer;
    /**
     * @private
     */
    pdfViewer: PdfViewer;
    /**
     *
     * @private
     */
    pngData: any[];
    /**
     * @private
     */
    blazorUIAdaptor: BlazorUiAdaptor;
    private unload;
    /**
     * @private
     */
    isDocumentLoaded: boolean;
    /**
     * @private
     */
    documentId: string;
    /**
     * @private
     */
    jsonDocumentId: string;
    /**
     * @private
     */
    renderedPagesList: number[];
    /**
     * @private
     */
    pageGap: number;
    /**
     * @private
     */
    signatureAdded: boolean;
    /**
     * @private
     */
    isSignInitialClick: boolean;
    /**
     * @private
     */
    loadedData: string;
    /**
     * @private
     */
    isFreeTextSelected: boolean;
    /**
     * @private
     */
    formfieldvalue: any;
    private pageLeft;
    private sessionLimit;
    private pageStopValue;
    /**
     * @private
     */
    toolbarHeight: number;
    private pageLimit;
    private previousPage;
    private isViewerMouseDown;
    private isViewerMouseWheel;
    private scrollPosition;
    private sessionStorage;
    /**
     * @private
     */
    static sessionStorageManager: PdfViewerSessionStorage;
    /**
     * @private
     */
    pageContainer: HTMLElement;
    /**
     * @private
     */
    isLoadedFormFieldAdded: boolean;
    private scrollHoldTimer;
    private isFileName;
    private isInkAnnot;
    private modifiedPageIndex;
    private pointerCount;
    private pointersForTouch;
    private corruptPopup;
    /**
     * @private
     */
    passwordPopup: Dialog;
    private goToPagePopup;
    /**
     * @private
     */
    isPasswordAvailable: boolean;
    /**
     * @private
     */
    isBounds: boolean;
    /**
     * @private
     */
    isImportDoc: boolean;
    private document;
    /**
     * @private
     */
    passwordData: string;
    /**
     * @private
     */
    reRenderedCount: number;
    private passwordInput;
    private promptElement;
    /**
     * @private
     */
    navigationPane: NavigationPane;
    private mouseX;
    private mouseY;
    /**
     * @private
     */
    mouseLeft: number;
    /**
     * @private
     */
    mouseTop: number;
    /**
     * @private
     */
    hashId: string;
    private documentLiveCount;
    /**
     * @private
     */
    mainContainer: HTMLElement;
    /**
     * @private
     */
    viewerMainContainer: HTMLElement;
    private printMainContainer;
    /**
     * @private
     */
    mobileScrollerContainer: HTMLElement;
    /**
     * @private
     */
    mobilePageNoContainer: HTMLElement;
    /**
     * @private
     */
    mobileSpanContainer: HTMLElement;
    /**
     * @private
     */
    mobilecurrentPageContainer: HTMLElement;
    private mobilenumberContainer;
    private mobiletotalPageContainer;
    private touchClientX;
    private touchClientY;
    private previousTime;
    private currentTime;
    private isTouchScrolled;
    private isgetFocused;
    private goToPageInput;
    /**
     * @private
     */
    pageNoContainer: HTMLElement;
    private goToPageElement;
    private isLongTouchPropagated;
    private longTouchTimer;
    private isViewerContainerDoubleClick;
    private dblClickTimer;
    /**
     * @private
     */
    pinchZoomStorage: IPinchZoomStorage[];
    private isPinchZoomStorage;
    /**
     * @private
     */
    isTextSelectionDisabled: boolean;
    /**
     * @private
     */
    isPanMode: boolean;
    private dragX;
    private dragY;
    private isScrollbarMouseDown;
    private scrollX;
    private scrollY;
    private ispageMoved;
    private isThumb;
    private isTapHidden;
    private singleTapTimer;
    private tapCount;
    private inputTapCount;
    /**
     * @private
     */
    isInitialLoaded: boolean;
    /**
     * @private
     */
    loadRequestHandler: AjaxHandler;
    private unloadRequestHandler;
    private dowonloadRequestHandler;
    private pageRequestHandler;
    private textRequestHandler;
    private virtualLoadRequestHandler;
    private exportAnnotationRequestHandler;
    private importAnnotationRequestHandler;
    private exportFormFieldsRequestHandler;
    private importFormFieldsRequestHandler;
    private annotationPageList;
    private importPageList;
    /**
     * @private
     */
    importedAnnotation: any;
    /**
     * @private
     */
    isImportAction: boolean;
    private isImportedAnnotation;
    /**
     * @private
     */
    isAnnotationCollectionRemoved: boolean;
    /**
     * @private
     */
    tool: ToolBase;
    action: any;
    /**
     * @private
     */
    eventArgs: MouseEventArgs;
    /**
     * @private
     */
    inAction: boolean;
    /**
     * @private
     */
    isMouseDown: boolean;
    /**
     * @private
     */
    isStampMouseDown: boolean;
    /**
     * @private
     */
    currentPosition: PointModel;
    /**
     * @private
     */
    prevPosition: PointModel;
    private initialEventArgs;
    /**
     * @private
     */
    stampAdded: boolean;
    /**
     * @private
     */
    customStampCount: number;
    /**
     * @private
     */
    isDynamicStamp: boolean;
    /**
     * @private
     */
    isMixedSizeDocument: boolean;
    /**
     * @private
     */
    highestWidth: number;
    /**
     * @private
     */
    highestHeight: number;
    /**
     * @private
     */
    customStampCollection: ICustomStampItems[];
    /**
     * @private
     */
    isAlreadyAdded: boolean;
    /**
     * @private
     */
    isWebkitMobile: boolean;
    /**
     * @private
     */
    isFreeTextContextMenu: boolean;
    /**
     * @private
     */
    signatureModule: Signature;
    /**
     * @private
     */
    isSelection: boolean;
    /**
     * @private
     */
    isAddAnnotation: boolean;
    /**
     * @private
     */
    annotationComments: any;
    /**
     * @private
     */
    isToolbarSignClicked: boolean;
    /**
     * @private
     */
    signatureCount: number;
    /**
     * @private
     */
    isSignatureAdded: boolean;
    /**
     * @private
     */
    isNewSignatureAdded: boolean;
    /**
     * @private
     */
    currentSignatureAnnot: any;
    /**
     * @private
     */
    isInitialPageMode: boolean;
    /**
     * @private
     */
    ajaxData: any;
    /**
     * @private
     */
    documentAnnotationCollections: any;
    /**
     * @private
     */
    annotationRenderredList: number[];
    /**
     * @private
     */
    annotationStorage: any;
    /**
     * @private
     */
    formFieldStorage: any;
    /**
     * @private
     */
    isStorageExceed: boolean;
    /**
     * @private
     */
    isFormStorageExceed: boolean;
    /**
     * @private
     */
    isNewStamp: boolean;
    /**
     * @private
     */
    downloadCollections: any;
    /**
     * @private
     */
    isAnnotationAdded: boolean;
    /**
     * @private
     */
    annotationEvent: any;
    /**
     * @private
     */
    isAnnotationDrawn: boolean;
    /**
     * @private
     */
    isAnnotationSelect: boolean;
    /**
     * @private
     */
    isAnnotationMouseDown: boolean;
    /**
     * @private
     */
    isAnnotationMouseMove: boolean;
    /**
     * @private
     */
    validateForm: boolean;
    /**
     * @private
     */
    isMinimumZoom: boolean;
    /**
     * @private
     */
    documentLoaded: boolean;
    private tileRenderCount;
    private tileRequestCount;
    /**
     * @private
     */
    isTileImageRendered: boolean;
    private isDataExits;
    private requestLists;
    private tilerequestLists;
    private textrequestLists;
    private renderThumbnailImages;
    /**
     * @private
     */
    pageRenderCount: number;
    /**
     * @private
     */
    isToolbarInkClicked: boolean;
    /**
     * @private
     */
    isInkAdded: boolean;
    /**
     * @private
     */
    inkCount: number;
    /**
     * @private
     */
    isAddedSignClicked: boolean;
    /**
     * @private
     */
    imageCount: number;
    /**
     * @private
     */
    isMousedOver: boolean;
    /**
     * @private
     */
    isFormFieldSelect: boolean;
    /**
     * @private
     */
    isFormFieldMouseDown: boolean;
    /**
     * @private
     */
    isFormFieldMouseMove: boolean;
    /**
     * @private
     */
    isFormFieldMousedOver: boolean;
    /**
     * @private
     */
    isPassword: boolean;
    /**
     * @private
     */
    digitalSignaturePages: number[];
    private isDigitalSignaturePresent;
    /**
     * @private
     */
    restrictionList: any;
    private isDrawnCompletely;
    /**
     * @private
     */
    isAddComment: boolean;
    /**
     * @private
     */
    isCommentIconAdded: boolean;
    /**
     * @private
     */
    currentTarget: any;
    /**
     * @private
     */
    private fromTarget;
    /**
     * @private
     */
    drawSignatureWithTool: boolean;
    /**
     * @private
     */
    formFieldCollection: any[];
    /**
     * @private
     */
    requestCollection: any[];
    /**
     * @private
     */
    nonFillableFields: any;
    /**
     * @private
     */
    pdfViewerRunner: PdfiumTaskScheduler;
    /**
     * @private
     */
    isInitialField: boolean;
    /**
     * @private
     */
    isTouchDesignerMode: boolean;
    /**
     * @private
     */
    designerModetarget: any;
    /**
     * @private
     */
    isPrint: boolean;
    /**
     * @private
     */
    isPDFViewerJson: boolean;
    /**
     * @private
     */
    isJsonImported: boolean;
    /**
     * @private
     */
    isJsonExported: boolean;
    /**
     * @private
     */
    isPageRotated: boolean;
    preventContextmenu: boolean;
    private downloadFileName;
    /**
     * @private
     */
    isFocusField: boolean;
    /**
     * @private
     */
    isTouchPad: boolean;
    /**
     * @private
     */
    isMacGestureActive: boolean;
    /**
     * @private
     */
    macGestureStartScale: number;
    /**
     * @private
     */
    zoomInterval: number;
    /**
     * @private
     */
    isTaggedPdf: boolean;
    private accessibilityTagsHandler;
    private accessibilityTagsCollection;
    private pageRequestListForAccessibilityTags;
    private enableAccessibilityMultiPageRequest;
    /**
     * @private
     */
    clientSideRendering: boolean;
    /**
     * @private
     */
    focusField: any;
    /**
     * @private
     */
    isPasswordProtected: boolean;
    private isMoving;
    /**
     * EJ2CORE-813 - This flag is represent current device is 'iPad' or 'iPhone' or'iPod' device.
     *
     * @private
     */
    isDeviceiOS: boolean;
    /**
     * @private
     */
    isMacSafari: boolean;
    private globalize;
    /**
     * @private
     */
    isSkipDocumentPath: boolean;
    private isScrollerMoving;
    private isScrollerMovingTimer;
    /**
     * @private
     */
    isMessageBoxOpen: boolean;
    private notifyDialog;
    /**
     * @private
     */
    previousScrollbarWidth: number;
    /**
     * Initialize the constructor of PDFViewerBase
     *
     * @param { PdfViewer } viewer - Specified PdfViewer class.
     */
    constructor(viewer: PdfViewer);
    /**
     * @private
     * @returns {void}
     */
    initializeComponent(): void;
    private createMobilePageNumberContainer;
    /**
     * @private
     * @param  {string} documentData - file name or base64 string.
     * @param {string} password - password of the PDF document.
     * @param  {boolean} isSkipDocumentId - It indicates whether we need to skip removing the jsonDocumentId
     * @returns {void}
     */
    initiatePageRender(documentData: any, password: string, isSkipDocumentId?: boolean): void;
    /**
     * @param {string} documentId - It describes about the document id
     * @param {boolean} isFileName - It describes about the whether isFileName is true or not
     * @param {string} fileName - It describes about the file name
     * @private
     * @returns {void}
     */
    initiateLoadDocument(documentId: string, isFileName: boolean, fileName: string): void;
    /**
     * @param {string} base64 - It describes about the base64
     * @private
     * @returns {Uint8Array} - Uint8Array
     */
    convertBase64(base64: string): Uint8Array;
    /**
     * @param {any} documentDetails - It describes about the document details
     * @param {string} password - It describes about the password
     * @private
     * @returns {void}
     */
    loadSuccess(documentDetails: any, password?: string): void;
    private mobileScrollContainerDown;
    /**
     * @private
     * @param {MouseEvent} e - default mouse event.
     * @returns {PointModel} - retuns the bounds.
     */
    relativePosition(e: MouseEvent): PointModel;
    /**
     * Gets the annotation canvas for a given annotation ID and page index.
     *
     * @param {string} id - The unique identifier of the annotation.
     * @param {number} pageIndex - The index of the page containing the annotation.
     * @private
     * @returns {HTMLElement} - The HTML canvas element for the annotation. If the canvas is not found, a new annotation layer is created and returned.
     */
    getAnnotationCanvas(id: string, pageIndex: number): HTMLElement;
    /**
     * @param {HTMLElement} pageDiv - pageDiv
     * @param {number} pageWidth - pageWidth
     * @param {number} pageHeight - pageHeight
     * @param {number} pageNumber - pageNumber
     * @param {string} displayMode - displayMode
     * @private
     * @returns {HTMLElement} - htmlelement
     */
    createAnnotationLayer(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode?: string): HTMLElement;
    private setMaximumHeight;
    private applyViewerHeight;
    /**
     * @param {HTMLElement} canvas - canvas
     * @param {number} pageWidth - pageWidth
     * @param {number} pageHeight - pageHeight
     * @param {number} pageNumber - pageNumber
     * @private
     * @returns {void}
     */
    updateCanvas(canvas: HTMLCanvasElement, pageWidth: number, pageHeight: number, pageNumber: number): void;
    /**
     * @private
     * @returns {void}
     */
    updateWidth(): void;
    /**
     * @private
     * @returns {void}
     */
    updateHeight(): void;
    /**
     * @private
     * @returns {void}
     */
    updateViewerContainer(): void;
    private updateViewerContainerSize;
    private mobileScrollContainerEnd;
    /**
     * @private
     * @param {any} data - data.
     * @returns {boolean} - boolean
     */
    checkRedirection(data: any): boolean;
    /**
     * @param {string} input - Gets the input
     * @private
     * @returns {Promise<string | null>} - promise
     */
    getPdfByteArray(input: string): Promise<any | null>;
    /**
     * @param {string} input - Gets the input
     * @private
     * @returns {Promise<string | null>} - promise
     */
    getPdfBase64(input: string): Promise<string | null>;
    private isValidPDFBase64;
    private isUrl;
    private isBase64;
    private identifyDataType;
    private createAjaxRequest;
    private invalidFilePopup;
    private updateFormFieldName;
    /**
     * @param {string} text - The text.
     * @returns {void}
     * @private
     */
    createNotificationPopup(text: string): void;
    /**
     * @returns {void}
     */
    private closeNotification;
    /**
     * @private
     * @param {string} errorString - The message to be displayed.
     * @returns {void}
     */
    openNotificationPopup(errorString?: string): void;
    /**
     * @private
     * @param {string} errorString - The message to be shown.
     * @returns {void}
     */
    showNotificationPopup(errorString: string): void;
    private requestSuccess;
    private RestrictionEnabled;
    private EnableRestriction;
    private pageRender;
    private initialPagesRenderedForSign;
    private removeTrailingNumber;
    private initialPagesRendered;
    /**
     * @private
     * @param {string} documentData - It gets the document data
     * @param {string} password - It gets the password
     * @param {boolean} isImportDoc - It gets whether the isImportDoc is true or false
     * @returns {void}
     */
    renderPasswordPopup(documentData: string | Uint8Array, password: string, isImportDoc: boolean): void;
    /**
     * @param {boolean} isImportDoc - Checks it is imported doc or npt
     * @private
     * @returns {void}
     */
    renderCorruptPopup(isImportDoc: boolean): void;
    /**
     * @param {string} documentData - It gets the document data
     * @param {string} password - It gets the password
     * @param {boolean} isBase64String - It gets whether the isBase64String is true or not
     * @private
     * @returns {Object} - Object
     */
    constructJsonObject(documentData: string | Uint8Array, password: string, isBase64String?: boolean): object;
    /**
     * @private
     * @param {string} documentData - It describes about the document data
     * @param  {boolean} isSkipDocumentId - It indicates whether we need to skip removing the jsonDocumentId
     * @returns {string} - string
     */
    checkDocumentData(documentData: string, isSkipDocumentId?: boolean): string;
    private setDocumentName;
    private setFileName;
    private saveDocumentInfo;
    private saveDocumentHashData;
    private saveFormfieldsData;
    /**
     * @param {boolean} isEnable - Enable or disable the toolbar itema.
     * @returns {void}
     * @private
     */
    enableFormFieldButton(isEnable: boolean): void;
    private updateWaitingPopup;
    /**
     * @param {boolean} isPageNumber - It describes about the whether isPageNumber true or not
     * @private
     * @returns {number} - returned the page value.
     */
    getActivePage(isPageNumber?: boolean): number;
    private createWaitingPopup;
    private showLoadingIndicator;
    private spinnerPosition;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isShow - Show or hide page loading indicator.
     * @returns {void}
     * @private
     */
    showPageLoadingIndicator(pageIndex: number, isShow: boolean): void;
    /**
     * @param {boolean} isShow - Show or hide print loading indicator.
     * @returns {void}
     * @private
     */
    showPrintLoadingIndicator(isShow: boolean): void;
    /**
     * @param {HTMLElement} element - specifies the element.
     * @returns {void}
     * @private
     */
    setLoaderProperties(element: HTMLElement): void;
    /**
     * @param {number} pageNumber - Specify the pageNumber.
     * @param {boolean} needToScroll - Ensure need to scroll or not
     * @returns {void}
     * @private
     */
    updateScrollTop(pageNumber: number, needToScroll?: boolean): void;
    /**
     * @private
     * @returns {number} - Returns the zoom factor value.
     */
    getZoomFactor(): number;
    /**
     * @private
     * @returns {number} - Get the custom zoom values
     */
    getCustomZoomValues(): void;
    /**
     * @private
     * @returns {boolean} - Returns whether the pinch zoom is performed or not.
     */
    getPinchZoomed(): boolean;
    /**
     * @private
     * @returns {boolean} -Returns whether the zoom is performed or not.
     */
    getMagnified(): boolean;
    private getPinchScrolled;
    private getPagesPinchZoomed;
    private getPagesZoomed;
    private getRerenderCanvasCreated;
    /**
     * @private
     * @returns {string} - retrun the docuumentid.
     */
    getDocumentId(): string;
    /**
     * @private
     * @returns {void}
     */
    download(): void;
    /**
     * @private
     * @returns {promise<Blob>} - Returns the blob object.
     */
    saveAsBlob(): Promise<Blob>;
    private fireCustomCommands;
    private getModifiers;
    private saveAsBlobRequest;
    private saveAsBlobFile;
    /**
     * @param {boolean} isTriggerEvent - check to trigger the event.
     * @returns {void}
     * @private
     */
    clear(isTriggerEvent: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @param {PdfViewerBase} proxy - PdfviewerBase class.
     * @returns {void}
     * @private
     */
    unloadDocument(proxy: PdfViewerBase): void;
    private clearCache;
    private setUnloadRequestHeaders;
    private windowSessionStorageClear;
    private updateCommentPanel;
    /**
     * @param {boolean} isMouseDown - check whether the mouse down is triggered.
     * @returns {void}
     * @private
     */
    focusViewerContainer(isMouseDown?: boolean): void;
    private getScrollParent;
    private createCorruptedPopup;
    /**
     * @private
     * @returns {void}
     */
    hideLoadingIndicator(): void;
    private closeCorruptPopup;
    private createPrintPopup;
    private createGoToPagePopup;
    private closeGoToPagePopUp;
    private EnableApplyButton;
    private DisableApplyButton;
    private GoToPageCancelClick;
    private GoToPageApplyClick;
    /**
     * @private
     * @returns {void}
     */
    updateMobileScrollerPosition(): void;
    private createPasswordPopup;
    private passwordCancel;
    private passwordCancelClick;
    /**
     * @private
     * @returns {void}
     */
    passwordDialogReset(): void;
    /**
     * @private
     * @returns {void}
     */
    applyPassword(): void;
    private createFileInputElement;
    private wireEvents;
    private unWireEvents;
    /**
     * @returns {void}
     */
    private clearSessionStorage;
    /**
     * @private
     * @param {MouseEvent} event - Mouse event.
     * @returns {void}
     */
    onWindowResize: (event?: MouseEvent) => void;
    /**
     * @private
     * @returns {void}
     */
    updateZoomValue(): void;
    /**
     * @private
     * @param {any} annotation - The annotation type of any.
     * @returns {void}
     */
    updateFreeTextProperties(annotation: any): void;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMousedown;
    /**
     * @private
     * @param {MouseEvent} event - The mouse event.
     * @returns {void}
     */
    mouseDownHandler(event: MouseEvent): void;
    /**
     * @private
     * @param {string} selectedMenu - The selected menu.
     * @returns {void}
     */
    OnItemSelected(selectedMenu: string): void;
    private CommentItemSelected;
    private ScaleRatioSelected;
    private DeleteItemSelected;
    private pasteItemSelected;
    private CutItemSelected;
    private CopyItemSelected;
    private PropertiesItemSelected;
    private TextMarkUpSelected;
    private shapeMenuItems;
    /**
     * @param {string} text - It describes about the text
     * @private
     * @returns {boolean} - boolean
     */
    checkIsRtlText(text: string): boolean;
    /**
     * @private
     * @param {any} event - Specifies the event.
     * @returns {boolean} - retruned the beolean value.
     */
    isClickWithinSelectionBounds(event: any): boolean;
    private getHorizontalClientValue;
    private getVerticalClientValue;
    private getHorizontalValue;
    private getVerticalValue;
    /**
     * @private
     * @returns {boolean} - retruned the beolean value.
     */
    checkIsNormalText(): boolean;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseup;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private detectTouchPad;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private handleMacGestureStart;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private handleMacGestureChange;
    /**
     * @param {any} event - The Wheel event.
     * @returns {void}
     */
    private handleMacGestureEnd;
    /**
     * @param {WheelEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseWheel;
    /**
     * @param {KeyboardEvent} event - The KeyboardEvent.
     * @returns {void}
     */
    private onWindowKeyDown;
    /**
     * @param {KeyboardEvent} event - The KeyboardEvent.
     * @returns {void}
     */
    private viewerContainerOnKeyDown;
    private isTextSearchBoxOpen;
    private isTargetClassNameValid;
    private DeleteKeyPressed;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMousemove;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private panOnMouseMove;
    /**
     * @private
     * @returns {void}
     */
    initiatePanning(): void;
    /**
     * @private
     * @returns {void}
     */
    initiateTextSelectMode(): void;
    /**
     * @private
     * @returns {void}
     */
    initiateTextSelection(): void;
    private enableAnnotationAddTools;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseLeave;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseEnter;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnMouseOver;
    /**
     * @param {MouseEvent} event - The MouseEvent.
     * @returns {void}
     */
    private viewerContainerOnClick;
    private applySelection;
    /**
     * @param {DragEvent} event - The DragEvent.
     * @returns {void}
     */
    private viewerContainerOnDragStart;
    private viewerContainerOnContextMenuClick;
    private onWindowMouseUp;
    /**
     * @param {TouchEvent} event - The DragEvent.
     * @returns {void}
     */
    private onWindowTouchEnd;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnTouchStart;
    private isDesignerMode;
    private handleTaps;
    private handleTextBoxTaps;
    private onTextBoxDoubleTap;
    private onSingleTap;
    private onDoubleTap;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnLongTouch;
    /**
     * @param {PointerEvent} event - The PointerEvent.
     * @returns {void}
     */
    private viewerContainerOnPointerDown;
    private preventTouchEvent;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnTouchMove;
    /**
     * @param {PointerEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnPointerMove;
    /**
     * @param {TouchEvent} event - The TouchEvent.
     * @returns {void}
     */
    private viewerContainerOnTouchEnd;
    private renderStampAnnotation;
    /**
     * @param {PointerEvent} event - The PointerEvent.
     * @returns {void}
     */
    private viewerContainerOnPointerEnd;
    private focusOnViewerContainer;
    private initPageDiv;
    private renderElementsVirtualScroll;
    private renderPageElement;
    private renderPagesVirtually;
    private initiateRenderPagesVirtually;
    private viritualload;
    private tileRenderPage;
    private renderTileCanvas;
    private calculateImageWidth;
    private renderPage;
    private updateAnnotationsAndState;
    private isNeedToRenderAnnotations;
    private isFormFieldsNeedtoRender;
    private onPageRender;
    private removeInkFromAnnotCollection;
    private canReduse;
    private isBoundsAreEqual;
    private removeAnnotFromDoc;
    private isGroupedSignatureFields;
    /**
     * @private
     * @param {any} fieldArray - The form field bounds.
     * @param {any} signArray - The annotation bounds.
     * @returns {boolean} - Returns true or false.
     */
    isSignatureWithInRect(fieldArray: any, signArray: any): boolean;
    /**
     * @private
     * @param {any} bounds - The form field or annotation bounds.
     * @returns {any} - Returns bounds.
     */
    canvasRectArray(bounds: any): any;
    private isFormFieldSignature;
    private canUpdateSignCollection;
    /**
     * @private
     * @param {number} pageIndex - page index for rendering the annotation.
     * @param {any} annotationsCollection -It describes about the annotations collection
     * @param {boolean} isAddedProgrammatically - It describes about the whether the isAddedProgrammatically true or not
     * @returns {Promise<void>} - any
     */
    renderAnnotations(pageIndex: number, annotationsCollection: any, isAddedProgrammatically?: boolean): Promise<void>;
    private renderTextContent;
    private renderAccessibilityTags;
    private returnPageListForAccessibilityTags;
    private createRequestForAccessibilityTags;
    private renderPageContainer;
    private renderPDFInformations;
    private orderPageDivElements;
    /**
     * @param {HTMLElement} pageDiv - It describes about the page div
     * @param {number} pageWidth - It describes about the page width
     * @param {number} pageHeight - It describes about the page heigght
     * @param {number} pageNumber - It describes about the page number
     * @param {string} displayMode - It describes about the display mode
     * @private
     * @returns {any} - any
     */
    renderPageCanvas(pageDiv: HTMLElement, pageWidth: number, pageHeight: number, pageNumber: number, displayMode: string): any;
    /**
     * @private
     * @param {any} pageCanvas - The canvas for rendering the page.
     * @param {any} pageNumber - The page number for adding styles.
     * @returns {void}
     */
    applyElementStyles(pageCanvas: any, pageNumber: number): void;
    /**
     * @private
     * @param  {number} pageIndex - page index for updating positon.
     * @returns {void}
     */
    updateLeftPosition(pageIndex: number): number;
    /**
     * @private
     * @param {number} pageIndex - The page index for positon.
     * @returns {void}
     */
    applyLeftPosition(pageIndex: number): void;
    private updatePageHeight;
    private viewerContainerOnScroll;
    /**
     * @private
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @returns {number} - number
     */
    getPageNumberFromClientPoint(clientPoint: Point): number;
    /**
     * @private
     * @param {Point} clientPoint - The user should provide a x, y coordinates.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    convertClientPointToPagePoint(clientPoint: Point, pageNumber: number): Point;
    /**
     * @private
     * @param {Point} pagePoint - The user needs to provide a page x, y position.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    convertPagePointToClientPoint(pagePoint: any, pageNumber: number): Point;
    /**
     * @private
     * @param {Point} pagePoint - The user needs to provide a page x, y position.
     * @param {number} pageNumber - We need to pass pageNumber.
     * @returns {Point} - point
     */
    convertPagePointToScrollingPoint(pagePoint: any, pageNumber: number): Point;
    private initiatePageViewScrollChanged;
    private renderCountIncrement;
    /**
     * @private
     * @param {number} currentPageNumber - The current pagenumber.
     * @returns {void}
     */
    pageViewScrollChanged(currentPageNumber: number): void;
    private renderPreviousPagesInScroll;
    private downloadDocument;
    private downloadExportFormat;
    /**
     * @private
     * @param {string} data - The data for exporting the fields.
     * @param {FormFieldDataFormat} formFieldDataFormat - It describes about the form fiels data format
     * @returns {void}
     */
    exportFormFields(data?: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * @param {string} data - It describes about the data value
     * @param {FormFieldDataFormat} formFieldDataFormat - It describes about the form field data format
     * @private
     * @returns {void}
     */
    importFormFields(data: string, formFieldDataFormat?: FormFieldDataFormat): void;
    /**
     * @param {boolean} isObject - It ensures whether the isObject is true or not
     * @param {FormFieldDataFormat} formFieldDataFormat - This describes about the form field data format
     * @param {string} data - The data for exporting the fields.
     * @private
     * @returns {any} - any
     */
    createRequestForExportFormfields(isObject?: boolean, formFieldDataFormat?: FormFieldDataFormat, data?: string): any;
    private exportFileDownload;
    /**
     * @param {string} fileName - Gets the name of the file name for slicing the last index
     * @param {string} sliceBy - A type to slice the file name; example (".", "_")
     * @private
     * @returns {string} - string
     */
    getLastIndexValue(fileName: string, sliceBy: string): string;
    /**
     * @param {any} source - It describes about the source
     * @param {FormFieldDataFormat} formFieldDataFormat - It describes about the form field data format
     * @private
     * @returns {void}
     */
    createRequestForImportingFormfields(source: any, formFieldDataFormat: FormFieldDataFormat): void;
    private importClientSideFormFields;
    /**
     * @public
     * @returns {any} - Returns the Json data.
     */
    createFormfieldsJsonData(): any;
    private constructJsonDownload;
    /**
     * @param {string} annotationInfo - It describes about the annotation info
     * @private
     * @returns {boolean} - Returns whether annotation is present.
     */
    private isAnnotationsExist;
    /**
     * @param {string} fieldsData - It describes about the fields data
     * @private
     * @returns {boolean} - Returns whether fields data is present.
     */
    private isFieldsDataExist;
    /**
     * @private
     * @returns {boolean} - Returns annotations page number list.
     */
    private getAnnotationsPageList;
    /**
     * @param {string} formDesignerData - It describes about the form designer data
     * @private
     * @returns {boolean} - Returns form fields page number list.
     */
    private getFormFieldsPageList;
    /**
     * @private
     * @param {string} annotationID - The annotationID.
     * @returns {any} - Returns collection of type.
     */
    checkFormFieldCollection(annotationID: string): boolean;
    /**
     * @private
     * @returns {boolean} - Returns whether freetext module is enabled.
     */
    isFreeTextAnnotationModule(): boolean;
    private createRequestForDownload;
    /**
     * @param {string} data - It describes about the download file data
     * @param {PdfViewerBase} proxy - It describes about the current instance
     * @param {boolean} isOrganizeSaveAsRequest - It describes about the request is from Organize PDF window
     * @private
     * @returns {void}
     */
    fileDownload(data: any, proxy: PdfViewerBase, isOrganizeSaveAsRequest?: boolean): void;
    /**
     * @param {any} pageWidth - It describes about the page width
     * @param {any} pageHeight - It describes about the page height
     * @private
     * @returns {number} - number
     */
    getTileCount(pageWidth: any, pageHeight: any): number;
    private createRequestForRender;
    private pageRequestOnSuccess;
    /**
     * @param {any} data - It gets the data
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {void}
     */
    pageTextRequestSuccess(data: any, pageIndex: number): void;
    private pageTextRequestOnSuccess;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {any} annotationObject - It describes about the annotation object
     * @private
     * @returns {void}
     */
    requestForTextExtraction(pageIndex: number, annotationObject?: any): void;
    /**
     * @private
     * @param {any} data - It gets the data
     * @param { number} pageIndex - It gets the page index value
     * @param {any} annotationObject - It gets the annotation object
     * @returns {void}
     */
    textRequestSuccess(data: any, pageIndex: number, annotationObject: any): void;
    private textRequestOnSuccess;
    /**
     * @param {any} markedBounds - It describes about the marked bounds
     * @param {any} pageCharText - It describes about the page character text
     * @param {any} characterBounds - It describes about the character bounds
     * @private
     * @returns {void}
     */
    textMarkUpContent(markedBounds: any, pageCharText: any, characterBounds: any): string;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @private
     * @returns {boolean} - boolean
     */
    digitalSignaturePresent(pageIndex: number): boolean;
    private pageRequestSent;
    /**
     * @private
     * @param {string} status - The status message.
     * @param {string} errorMessage - The error message.
     * @param {string} action - The action.
     * @returns {void}
     */
    onControlError(status: number, errorMessage: string, action: string): void;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isTextSearch - It ensures whether the isTextSearch is true or not
     * @private
     * @returns {any} - any
     */
    getStoredData(pageIndex: number, isTextSearch?: boolean): any;
    /**
     * @private
     * @param  {any} data - The data.
     * @param {number} pageIndex - The pageIndex.
     * @param {number} tileX - The tileX.
     * @param {number} tileY - The tileY.
     * @returns {void}
     */
    storeWinData(data: any, pageIndex: number, tileX?: number, tileY?: number): void;
    /**
     * @private
     * @param {XMLHttpRequest} request - The Xml request.
     * @returns {void}
     */
    setCustomAjaxHeaders(request: XMLHttpRequest): void;
    /**
     * @private
     * @param {number} pageIndex - Page index.
     * @returns {object} - object
     */
    getPinchZoomPage(pageIndex: number): object;
    /**
     * @private
     * @param {number} pageIndex - current page index.
     * @param {number} zoomFactor - cuurent zoom factor
     * @returns {string} - string
     */
    getWindowSessionStorage(pageIndex: number, zoomFactor: number): string;
    /**
     * @private
     * @param {number} pageIndex - current page index.
     * @param {number} tileX - cuurent tile x
     * @param {number} tileY - cuurent tile y
     * @param {number} zoomFactor - cuurent zoom factor
     * @returns {string} - string
     */
    getWindowSessionStorageTile(pageIndex: number, tileX: number, tileY: number, zoomFactor: number): string;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {number} tileX - It describes about the tile X
     * @param {number} tileY - It describes about the tile Y
     * @param {number} zoomFactor - It describes about the zoom factor
     * @private
     * @returns {string} - string
     */
    getStoredTileImageDetails(pageIndex: number, tileX: number, tileY: number, zoomFactor: number): string;
    /**
     * @private
     * @returns {number} - number
     */
    retrieveCurrentZoomFactor(): number;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {any} textBounds - It describes about the text bounds
     * @param {any} textContent - It describes about the text content
     * @param {string} pageText - It describes about the page text
     * @param {number} rotation - It describes about the rotation
     * @param {any} characterBounds - It describes about the character bounds
     * @private
     * @returns {void}
     */
    storeTextDetails(pageNumber: number, textBounds: any, textContent: any, pageText: string, rotation: number, characterBounds: any): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {any} storeObject - It describes about the store object
     * @param {number} tileX - It describes about the tile X value
     * @param {number} tileY - It describes about the tile Y
     * @private
     * @returns {void}
     */
    storeImageData(pageNumber: number, storeObject: any, tileX?: number, tileY?: number): void;
    private manageSessionStorage;
    /**
     * @param {string} base64String - It describes about the base64 string
     * @param {string} contentType - It describes about the content type
     * @private
     * @returns {string} - string
     */
    createBlobUrl(base64String: string, contentType: string): string;
    private getRandomNumber;
    /**
     * @private
     * @returns {string} - string
     */
    createGUID(): string;
    /**
     * @private
     * @param {MouseEvent} event - The mouse event.
     * @param {boolean} isNeedToSet - Is need to test.
     * @returns {boolean} - Returns true or false.
     */
    isClickedOnScrollBar(event: MouseEvent, isNeedToSet?: boolean): boolean;
    private setScrollDownValue;
    /**
     * @private
     * @returns {void}
     */
    disableTextSelectionMode(): void;
    /**
     * @private
     * @param {string} idString - The Id string.
     * @returns {HTMLElement} - The html element.
     */
    getElement(idString: string): HTMLElement;
    /**
     * @private
     * @param {number} pageIndex - The pageIndex
     * @returns {number} - Returns number
     */
    getPageWidth(pageIndex: number): number;
    /**
     * @private
     * @param {number} pageIndex - The pageIndex
     * @returns {number} - Returns number
     */
    getPageHeight(pageIndex: number): number;
    /**
     * @private
     * @param {number} pageIndex - The pageIndex.
     * @returns {number} - Returns number
     */
    getPageTop(pageIndex: number): number;
    private isAnnotationToolbarHidden;
    private isFormDesignerToolbarHidded;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    getTextMarkupAnnotationMode(): boolean;
    private isNewFreeTextAnnotation;
    private getCurrentTextMarkupAnnotation;
    /**
     * @private
     * @returns {number} - Returns page number.
     */
    getSelectTextMarkupCurrentPage(): number;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    getAnnotationToolStatus(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    getPopupNoteVisibleStatus(): boolean;
    /**
     * @private
     * @returns {TextMarkupAnnotation} - TextMarkupAnnotation.
     */
    isTextMarkupAnnotationModule(): TextMarkupAnnotation;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    isShapeAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isFormDesignerModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isFormFieldsModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isCalibrateAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isStampAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isInkAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isCommentAnnotationModule(): boolean;
    /**
     * @private
     * @returns {boolean} - Retunrs true or false.
     */
    isShapeBasedAnnotationsEnabled(): boolean;
    /**
     * @private
     * @param {MouseEvent | PointerEvent | TouchEvent} e - Returns event.
     * @returns {PointModel} - Returns points.
     */
    getMousePosition(e: MouseEvent | PointerEvent | TouchEvent): PointModel;
    private getMouseEventArgs;
    /**
     * @private
     * @param {PdfAnnotationBaseModel} obj - The object.
     * @param {PointModel} position - The position.
     * @returns {Actions | string} - Returns the string.
     */
    findToolToActivate(obj: PdfAnnotationBaseModel, position: PointModel): Actions | string;
    private inflate;
    checkResizeHandles(diagram: PdfViewer, element: DrawingElement, position: PointModel, matrix: Matrix, x: number, y: number): Actions;
    checkForResizeHandles(diagram: PdfViewer, element: DrawingElement, position: PointModel, matrix: Matrix, x: number, y: number): Actions;
    /**
     * @private
     * @param {string} fieldID - The fieldID
     * @returns {boolean} - Returns true or false.
     */
    checkSignatureFormField(fieldID: string): boolean;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The event.
     * @returns {void}
     */
    diagramMouseMove(evt: MouseEvent | TouchEvent): void;
    private updateDefaultCursor;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The event.
     * @returns {void}
     */
    diagramMouseLeave(evt: MouseEvent | TouchEvent): void;
    private diagramMouseActionHelper;
    private setCursor;
    private setResizerCursorType;
    /**
     * @private
     * @param {Actions | string} action - The actions.
     * @returns {ToolBase} - Returns tools.
     */
    getTool(action: Actions | string): ToolBase;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The events.
     * @returns {void}
     */
    diagramMouseUp(evt: MouseEvent | TouchEvent): void;
    /**
     * @private
     * @param {HTMLElement} target - The target.
     * @returns {boolean} - Returns true or false.
     */
    skipPreventDefault(target: HTMLElement): boolean;
    private isMetaKey;
    /**
     * @private
     * @param {MouseEvent | TouchEvent} evt - The events.
     * @returns {void}
     */
    diagramMouseDown(evt: MouseEvent | TouchEvent): void;
    /**
     * @param {AnnotationDataFormat} annotationDataFormat - It describes about the annotaiton data format
     * @private
     * @returns {any} - any
     */
    exportAnnotationsAsObject(annotationDataFormat?: AnnotationDataFormat): any;
    /**
     * @private
     * @param {string} type - The type.
     * @returns {any} - any
     */
    getItemFromSessionStorage(type: string): string;
    /**
     * @param {HTMLElement} textDiv - It describes about the whether the text div element
     * @param {number} left - It describes about the left value
     * @param {number} top - It describes about the top value
     * @param {number} fontHeight - It describes about the font height
     * @param {number} width - It describes about the width
     * @param {number} height - It describes about the height
     * @param {boolean} isPrint - It describes about the isPrint is true or not
     * @private
     * @returns {void}
     */
    setStyleToTextDiv(textDiv: HTMLElement, left: number, top: number, fontHeight: number, width: number, height: number, isPrint: boolean): void;
    /**
     * @param {any} number - It describes about the number
     * @private
     * @returns {number} - number
     */
    ConvertPointToPixel(number: any): number;
    /**
     * @param {number} rotation - It describes about the number
     * @private
     * @returns {number} - number
     */
    getAngle(rotation: number): number;
    /**
     * @param {any} formFieldsData - It describes about the form fields data
     * @param {string} type - It describes about the type
     * @private
     * @returns {void}
     */
    setItemInSessionStorage(formFieldsData: any, type: string): void;
    /**
     * @param {FormFieldDataFormat} formFieldDataFormat - It describes about the form field data format
     * @private
     * @returns {any} - any
     */
    exportFormFieldsAsObject(formFieldDataFormat?: FormFieldDataFormat): any;
    /**
     * @param {any} importData - It describes about the imported data
     * @param {AnnotationDataFormat} annotationDataFormat -It describes about the annotaiton data format
     * @param {boolean} isXfdf - It describes about the whether the isXfdf is true or not
     * @private
     * @returns {void}
     */
    importAnnotations(importData: any, annotationDataFormat?: AnnotationDataFormat, isXfdf?: boolean): void;
    /**
     * @private
     * @param {AnnotationDataFormat} annotationDataFormat - The annotationDataFormat.
     * @returns {void}
     */
    exportAnnotations(annotationDataFormat?: AnnotationDataFormat): void;
    /**
     * @param {boolean} isObject - It describes about the whether the isObject is true or not
     * @param {AnnotationDataFormat} annotationDataFormat - It describes about the annotation data format
     * @param {boolean} isBase64String - It describes about the whether the isBase64String is true or not
     * @private
     * @returns {any} - any
     */
    createRequestForExportAnnotations(isObject?: boolean, annotationDataFormat?: AnnotationDataFormat, isBase64String?: boolean): any;
    private handleServerSideExport;
    private handleClientSideExport;
    private exportAnnotationFileDownload;
    private getDataOnSuccess;
    /**
     * @param {any} newData - It describes about the new data
     * @param {any} annotationType - It describes about the annotation type
     * @private
     * @returns {void}
     */
    updateModifiedDateToLocalDate(newData: any, annotationType: any): void;
    /**
     * @param {any} date - It describes about the date
     * @private
     * @returns {void}
     */
    convertUTCDateTimeToLocalDateTime(date: any): string;
    private createRequestForImportAnnotations;
    private addAnnotationOnImport;
    /**
     * @private
     * @param {string} errorDetails - The error details.
     * @returns {void}
     */
    openImportExportNotificationPopup(errorDetails: string): void;
    private reRenderAnnotations;
    /**
     * @param {any} importedAnnotations - It describes about the imported annotations
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    private updateImportedAnnotationsInDocumentCollections;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {any} pageCollections - It describes about the page collections
     * @private
     * @returns {any} - any
     */
    checkDocumentCollectionData(pageIndex: number, pageCollections?: any): any;
    private findImportedAnnotations;
    private setAnnotationSettings;
    private drawPageAnnotations;
    private checkSignatureCollections;
    private checkAnnotationCollections;
    private checkAnnotationCommentsCollections;
    private selectAnnotationCollections;
    private saveImportedAnnotations;
    private savePageAnnotations;
    private updateDocumentAnnotationCollections;
    /**
     * @private
     * @returns {string} - string
     */
    createAnnotationJsonData(): string;
    private combineImportedData;
    /**
     * @private
     * @returns {boolean} - Returns true or false.
     */
    updateExportItem(): boolean;
    private checkExportAnnotations;
    private isFreeTextAnnotation;
    private checkImportedData;
    private updateAnnotationsInSessionStorage;
    /**
     * @param {any} points - It describes about the points
     * @private
     * @returns {object} - object
     */
    checkAnnotationWidth(points: any): object;
    deleteAnnotations(): void;
    private updateAnnotationsUndoRedo;
    private updateSignatureUndoRedo;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isObject - It describes about the whether the isObject is true or not
     * @private
     * @returns {any} - any
     */
    createAnnotationsCollection(pageNumber?: number, isObject?: boolean): any;
    /**
     * @param {any} importAnnotation - It describes about the imported annotation
     * @private
     * @returns {void}
     */
    addAnnotation(importAnnotation: any): void;
    /**
     * @param {any} bounds - It describes about the bounds
     * @param {boolean} isRect - It describes about the whether the isRect is true or not
     * @param {boolean} isStamp - It describes about the whether the isStamp is true or not
     * @private
     * @returns {any} - any
     */
    convertBounds(bounds: any, isRect?: boolean, isStamp?: boolean): IRectangleBounds | IRectBounds;
    /**
     * @private
     * @param {any} number - It describes about the number
     * @returns {number} - number
     */
    ConvertPixelToPoint(number: any): number;
    private convertVertexPoints;
    private updateComments;
    /**
     * @private
     * @returns {void}
     */
    removeFocus(): void;
    /**
     * @param {boolean} isEdited - It describes about the whether isEdited is true or not
     * @private
     * @returns {void}
     */
    updateDocumentEditedProperty(isEdited: boolean): void;
    /**
     * @private
     * @returns {number} - number
     */
    getWindowDevicePixelRatio(): number;
    /**
     * @param {any} zoom - It describes about the zoom value
     * @private
     * @returns {number} - number
     */
    getZoomRatio(zoom?: any): number;
    /**
     * @param {number} Rotate - It describes about the rotate
     * @param {number} pageNumber - It describes about the page number
     * @param {any} bounds - It describes about the bounds
     * @param {number} originalRotation - It describes about the original rotation
     * @private
     * @returns {any} - any
     */
    importJsonForRotatedDocuments(Rotate: number, pageNumber: number, bounds: any, originalRotation?: number): any;
    getRotationAngle(originalRotation: number, pageNumber: number): any;
    /**
     * @param {number} Rotate - It describes about the rotate
     * @param {number} pageNumber - It describes about the page number
     * @param {any} vertexPoints - It describes about the vertex points
     * @param {number} originalRotation - It describes about the original rotation
     * @private
     * @returns {IPoint[]} - IPoint[]
     */
    calculateVertexPoints(Rotate: number, pageNumber: number, vertexPoints: any, originalRotation?: number): IPoint[];
    /**
     * @param {any} data - It describes about the data
     * @private
     * @returns {boolean} - boolean
     */
    isSignaturePathData(data: any): boolean;
    /**
     * @param {any} data - It describes about the data
     * @private
     * @returns {boolean} - boolean
     */
    isSignatureImageData(data: any): boolean;
    /**
     * @param {any} annotationData - It describes about the annotation data
     * @private
     * @returns {string} - string
     */
    getSanitizedString(annotationData: any): string;
    /**
     * @param {number} pageIndex - It describes about the page index
     * @param {boolean} isTextSearch - It describes about the whether isTextSearch is true or not
     * @private
     * @returns {object} - object
     */
    getLinkInformation(pageIndex: number, isTextSearch?: boolean): object;
    /**
     * @param canvas
     * @private
     */
    releaseCanvas(canvas: HTMLCanvasElement): void;
    /**
     * @param {string} moduleName - It describes about the module name
     * @private
     * @returns {void}
     */
    getModuleWarningMessage(moduleName: string): void;
    /**
     * @param {any} annotationSelectorSettings - Gets annotationSelectorSettings
     * @private
     * @returns {void}
     */
    updateSelectorSettings(annotationSelectorSettings: any): void;
    /**
     * @param {any} annotation - Gets the annotation
     * @private
     * @returns {void}
     */
    annotationSelectorSettingLoad(annotation: any): void;
    /**
     * @param {any} pageAnotationBounds - Gets pageAnotationBounds
     * @param {any} baseAnnotationBounds - Gets baseAnnotationBounds
     * @private
     * @returns {boolean} - boolean
     */
    boundsCalculation(pageAnotationBounds: any, baseAnnotationBounds: any): boolean;
}
export interface IRectangleBounds {
    left: number;
    right: number;
    bottom: number;
    top: number;
}
export interface IRectBounds {
    X: number;
    Y: number;
    Left: number;
    Top: number;
    Height: number;
    Width: number;
}
export {};
