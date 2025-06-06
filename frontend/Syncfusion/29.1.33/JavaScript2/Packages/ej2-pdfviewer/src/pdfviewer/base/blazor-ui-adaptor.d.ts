import { PdfViewer, PdfViewerBase } from '../index';
/**
 * The `BlazorUIAdaptor` module is used to handle the UI update of native components.
 *
 * @hidden
 */
export declare class BlazorUiAdaptor {
    private pdfViewer;
    private pdfViewerBase;
    /**
     * @private
     */
    totalPageElement: HTMLElement;
    private currentPageBoxElementContainer;
    private currentPageBoxElement;
    private firstPageElement;
    private previousPageElement;
    private nextPageElement;
    private lastPageElement;
    private zommOutElement;
    private zoomInElement;
    private zoomDropDownElement;
    private selectToolElement;
    private handToolElement;
    private undoElement;
    private redoElement;
    private commentElement;
    private submitFormButton;
    private searchElement;
    private annotationElement;
    private printElement;
    private downloadElement;
    private highlightElement;
    private underlineElement;
    private strikeThroughElement;
    private shapeElement;
    private calibrateElement;
    private stampElement;
    private freeTextElement;
    private signatureElement;
    private inkElement;
    private annotationFontSizeInputElement;
    private annotationFontFamilyInputElement;
    private annotationColorElement;
    private annotationStrokeColorElement;
    private annotationThicknessElement;
    private annotationOpacityElement;
    private annotationFontColorElement;
    private annotationFontFamilyElement;
    private annotationFontSizeElement;
    private annotationTextAlignElement;
    private annotationTextColorElement;
    private annotationTextPropertiesElement;
    private annotationDeleteElement;
    private annotationCloseElement;
    private annotationCommentPanelElement;
    private mobileToolbarContainerElement;
    private mobileSearchPreviousOccurenceElement;
    private mobileSearchNextOccurenceElement;
    private cssClass;
    private disableClass;
    private editAnnotationButtonElement;
    /**
     * Initialize the constructor of blazorUIadapater.
     *
     * @param { PdfViewer } pdfviewer - Specified PdfViewer class.
     * @param { PdfViewerBase } pdfViewerBase - The pdfViewerBase.
     */
    constructor(pdfviewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    private findToolbarElements;
    /**
     * Update the total page.
     *
     * @returns {void}
     */
    updateTotalPage(): void;
    /**
     * Update current page.
     *
     * @param {number} pageNumber - The pageNumber.
     * @returns {void}
     */
    updateCurrentPage(pageNumber: number): void;
    /**
     * Load the PDF document.
     *
     * @returns {void}
     */
    loadDocument(): void;
    selectItem(element: HTMLElement): void;
    deselectItem(element: HTMLElement): void;
    showAnnotationToolbar(isToolbarVisible: any): void;
    closeAnnotationToolbar(): void;
    /**
     * Reset the toolbar.
     *
     * @returns {void}
     */
    resetToolbar(): void;
    /**
     * When annotation selection changed.
     *
     * @param {boolean} isEnable - isEnable
     * @returns {void}
     */
    EnableDeleteOption(isEnable: boolean): void;
    /**
     * when the page changes.
     *
     * @param {number} currentPageNumber - The current page number.
     * @returns {void}
     */
    pageChanged(currentPageNumber: number): void;
    /**
     * @param {string} item - The current item.
     * @param {boolean} enable - To enable the item or not.
     * @returns {void}
     */
    updateUndoRedoButton(item: string, enable: boolean): void;
    /**
     * @returns {void}
     */
    disableUndoRedoButton(): void;
    /**
     * @param {boolean} isEnable - isEnable
     * @returns {void}
     */
    enableTextMarkupAnnotationPropertiesTools(isEnable: boolean): void;
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isProperitiesChange - To enable the item or not.
     * @returns {void}
     */
    enableAnnotationPropertiesTool(isEnable: boolean, isProperitiesChange: boolean): void;
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isProperitiesChange - To enable the item or not.
     * @returns {void}
     */
    enableFreeTextAnnotationPropertiesTools(isEnable: boolean, isProperitiesChange: boolean): void;
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isPropertiesChange - To enable the item or not.
     * @returns {void}
     */
    enableStampAnnotationPropertiesTools(isEnable: boolean, isPropertiesChange: boolean): void;
    /**
     * @param {boolean} isEnable - To enable the item or not.
     * @param {boolean} isProperitiesChange - To enable the item or not.
     * @returns {void}
     */
    enableSignaturePropertiesTools(isEnable: boolean, isProperitiesChange: boolean): void;
    /**
     * @returns {void}
     */
    annotationAdd(): void;
    /**
     * @returns {void}
     */
    annotationUnSelect(): void;
    /**
     * @param {string} annotationType - The annotationType.
     * @returns {void}
     */
    annotationSelect(annotationType: string): void;
    /**
     * @param {string} fontFamily - The fontFamily.
     * @returns {void}
     */
    updateFontFamilyInIcon(fontFamily: string): void;
    /**
     * @param {number} fontSize - The fontSize.
     * @returns {void}
     */
    updateFontSizeInIcon(fontSize: number): void;
    /**
     * @param {boolean} isEnable - To enable or disable.
     * @returns {void}
     */
    enableSearchItems(isEnable: boolean): void;
    /**
     * @param {boolean} isTapHidden - To enable or disable.
     * @returns {void}
     */
    tapOnMobileDevice(isTapHidden: boolean): void;
    /**
     * @param {HTMLElement} element - The HTMLElement.
     * @returns {boolean} - Returns trur or false.
     */
    isEnabled(element: HTMLElement): boolean;
}
