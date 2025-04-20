import { PdfViewer, PdfViewerBase } from '../index';
/**
 * The `IRectangle` module is used to handle rectangle property of PDF viewer.
 *
 * @hidden
 */
export interface IRectangle {
    bottom: number;
    height: number;
    left: number;
    top: number;
    right: number;
    width: number;
    rotation?: number;
}
/**
 * The `ISelection` module is used to handle selection property of PDF viewer.
 *
 * @hidden
 */
export interface ISelection {
    isBackward: boolean;
    startNode: string;
    startOffset: number;
    endNode: string;
    endOffset: number;
    textContent: string;
    pageNumber: number;
    bound: IRectangle;
    rectangleBounds: IRectangle[];
}
/**
 * The `TextSelection` module is used to handle the text selection of PDF viewer.
 *
 * @param {Event} event - event
 * @returns {void}
 */
export declare class TextSelection {
    /**
     * @private
     */
    isTextSelection: boolean;
    /**
     * @private
     */
    selectionStartPage: number;
    private pdfViewer;
    private pdfViewerBase;
    private isBackwardPropagatedSelection;
    private dropDivElementLeft;
    private dropDivElementRight;
    private dropElementLeft;
    private dropElementRight;
    private contextMenuHeight;
    private backwardStart;
    /**
     * @private
     */
    selectionRangeArray: ISelection[];
    private selectionAnchorTouch;
    private selectionFocusTouch;
    private scrollMoveTimer;
    private isMouseLeaveSelection;
    /**
     * @private
     */
    isTouchSelection: boolean;
    private previousScrollDifference;
    private topStoreLeft;
    private topStoreRight;
    private isTextSearched;
    private isSelectionStartTriggered;
    private allTextContent;
    /**
     * @param {PdfViewer} pdfViewer - It describes about the pdfviewer
     * @param {PdfViewerBase} pdfViewerBase - It describes about the pdfviewer base
     * @private
     * @returns {void}
     */
    constructor(pdfViewer: PdfViewer, pdfViewerBase: PdfViewerBase);
    /**
     * @param {EventTarget} target - It describes about the target
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @param {boolean} isExtended - It describes about the isExtended boolean value
     * @private
     * @returns {void}
     */
    textSelectionOnMouseMove(target: EventTarget, x: number, y: number, isExtended?: boolean): void;
    /**
     * @param {EventTarget} target - It describes about the target
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @param {boolean} isforward - It describes about the isforward boolean value
     * @private
     * @returns {boolean} - boolean
     */
    textSelectionOnDrag(target: EventTarget, x: number, y: number, isforward: boolean): boolean;
    /**
     * Select the target text region in the PDF document of the given bounds.
     *
     * @param  {number} pageNumbers - Specifies the page number
     * @param  {IRectangle[]} bounds -  Specifies the bounds of the texts.
     * @returns {void}
     */
    selectTextRegion(pageNumbers: number, bounds: IRectangle[]): void;
    /**
     * @param {number} left - It describes about the left value
     * @param {number} textDiVLeft - It describes about the text div left value
     * @param {number} totalLeft - It describes about the total left value
     * @param {number} x - It describes about the x value
     * @private
     * @returns {boolean} - boolean
     */
    checkLeftBounds(left: number, textDiVLeft: number, totalLeft: number, x: number): boolean;
    /**
     * @param {number} top - It describes about the top value
     * @param {number} currentTop - It describes about the current top value
     * @param {number} y - It describes about the Y value
     * @private
     * @returns {boolean} - boolean
     */
    checkTopBounds(top: number, currentTop: number, y: number): boolean;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    textSelectionOnMouseLeave(event: MouseEvent): void;
    private scrollForwardOnSelection;
    private scrollBackwardOnSelection;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * @param {any} element - It describes about the element
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @param {boolean} isStoreSelection - It describes about the isStoreSelection value
     * @private
     * @returns {void}
     */
    selectAWord(element: any, x: number, y: number, isStoreSelection: boolean): void;
    private getSelectionRange;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    selectEntireLine(event: MouseEvent): void;
    /**
     * @private
     * @returns {void}
     */
    enableTextSelectionMode(): void;
    clearTextSelection(): void;
    /**
     * @private
     * @returns {void}
     */
    removeTouchElements(): void;
    /**
     * @private
     * @returns {void}
     */
    resizeTouchElements(): void;
    /**
     * @param {MouseEvent} event - It describes about the event
     * @private
     * @returns {void}
     */
    textSelectionOnMouseup(event: MouseEvent): void;
    /**
     * @private
     * @returns {void}
     */
    fireTextSelectEnd(): void;
    /**
     * @param {boolean}  isMaintainSelection - It describes about the isMaintainSelection value
     * @param {boolean} isStich - It describes about the isStich value
     * @private
     * @returns {void}
     */
    maintainSelectionOnZoom(isMaintainSelection: boolean, isStich: boolean): void;
    /**
     * @param {number} pageNumber - It describes about the page number value
     * @private
     * @returns {boolean} - boolean
     */
    isSelectionAvailableOnScroll(pageNumber: number): boolean;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {void}
     */
    applySelectionRangeOnScroll(pageNumber: number): void;
    private getSelectionRangeFromArray;
    private applySelectionRange;
    private applySelectionMouseScroll;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isStich - It describes about the isStich value
     * @private
     * @returns {void}
     */
    maintainSelectionOnScroll(pageNumber: number, isStich: boolean): void;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {boolean} isStich - It describes about the isStich value
     * @private
     * @returns {void}
     */
    maintainSelection(pageNumber: number, isStich: boolean): void;
    private getCorrectOffset;
    private pushSelectionRangeObject;
    private extendCurrentSelection;
    private stichSelection;
    /**
     * @param {number} currentPageNumber - It describes about the current page number
     * @private
     * @returns {void}
     */
    textSelectionOnMouseWheel(currentPageNumber: number): void;
    /**
     * @param {number} currentPageNumber - It describes about the current page number
     * @private
     * @returns {void}
     */
    stichSelectionOnScroll(currentPageNumber: number): void;
    private extendSelectionStich;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @param {number} anchorPageId - It describes about the anchor page id
     * @param {number} focusPageId - It describes about the focus page id
     * @private
     * @returns {ISelection} - ISelection
     */
    createRangeObjectOnScroll(pageNumber: number, anchorPageId: number, focusPageId: number): ISelection;
    private getSelectionRangeObject;
    private getSelectionBounds;
    private getSelectionRectangleBounds;
    private getAngle;
    private getTextId;
    private normalizeBounds;
    private getMagnifiedValue;
    /**
     * @param {number} pageNumber - It describes about the page number
     * @private
     * @returns {IRectangle} - IRectangle
     */
    getCurrentSelectionBounds(pageNumber: number): IRectangle;
    private createRangeForSelection;
    private maintainSelectionArray;
    /**
     * @private
     * @returns {void}
     */
    applySpanForSelection(): void;
    /**
     * @param {TouchEvent} event - It describes about the event
     * @param {number} x - It describes about the X value
     * @param {number} y - It describes about the Y value
     * @private
     * @returns {void}
     */
    initiateTouchSelection(event: TouchEvent, x: number, y: number): void;
    private selectTextByTouch;
    private setTouchSelectionStartPosition;
    private getTouchAnchorElement;
    private getTouchFocusElement;
    private createTouchSelectElement;
    /**
     * @param {any} top - It describes about the top value
     * @param {any} left - It describes about the left value
     * @private
     * @returns {void}
     */
    calculateContextMenuPosition(top: any, left: any): void;
    private onLeftTouchSelectElementTouchStart;
    private onRightTouchSelectElementTouchStart;
    private onLeftTouchSelectElementTouchEnd;
    private onRightTouchSelectElementTouchEnd;
    /**
     * @private
     * @returns {void}
     */
    initiateSelectionByTouch(): void;
    private terminateSelectionByTouch;
    private getSpanBounds;
    private onLeftTouchSelectElementTouchMove;
    private onRightTouchSelectElementTouchMove;
    private getNodeElement;
    private isTouchedWithinContainer;
    private onTouchElementScroll;
    private isCloserTouchScroll;
    private getClientValueTop;
    private isScrolledOnScrollBar;
    private getTextLastLength;
    private getNodeElementFromNode;
    /**
     * Copy the selected text in the PDF Document.
     *
     * @returns {void}
     */
    copyText(): void;
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
}
