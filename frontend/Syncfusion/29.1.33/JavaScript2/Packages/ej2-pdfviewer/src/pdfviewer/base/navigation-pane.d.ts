import { PdfViewer } from '../index';
import { PdfViewerBase } from '../index';
import { ContextMenu as Context } from '@syncfusion/ej2-navigations';
/**
 * The `NavigationPane` module is used to handle navigation pane for thumbnail and bookmark navigation of PDF viewer.
 *
 * @param {args} args - args
 * @returns {void}
 * @hidden
 */
export declare class NavigationPane {
    private pdfViewer;
    private pdfViewerBase;
    private sideBarResizer;
    private sideBarContentSplitter;
    private sideBarTitleContainer;
    private thumbnailWidthMin;
    private thumbnailButton;
    private bookmarkButton;
    private mainContainerWidth;
    private closeDiv;
    private resizeIcon;
    private isDown;
    private offset;
    private contentContainerScrollWidth;
    private closeButtonLeft;
    private previousX;
    private toolbarElement;
    private toolbar;
    private searchInput;
    private toastObject;
    private isTooltipCreated;
    private annotationInputElement;
    private annotationXFdfInputElement;
    private annotationContextMenu;
    private isCommentPanelShow;
    private commentPanelWidthMin;
    private commentPanelResizeIcon;
    /**
     * @private
     */
    isThumbnail: boolean;
    /**
     * @private
     */
    isThumbnailAddedProgrammatically: boolean;
    /**
     * @private
     */
    isBookmarkOpenProgrammatically: boolean;
    /**
     * @private
     */
    sideBarTitle: HTMLElement;
    /**
     * @private
     */
    annotationMenuObj: Context;
    /**
     * @private
     */
    isNavigationToolbarVisible: boolean;
    /**
     * @private
     */
    isBookmarkListOpen: boolean;
    /**
     * @private
     */
    isNavigationPaneResized: boolean;
    /**
     * @private
     */
    sideBarToolbar: HTMLElement;
    /**
     * @private
     */
    sideBarContent: HTMLElement;
    /**
     * @private
     */
    sideBarContentContainer: HTMLElement;
    /**
     * @private
     */
    sideBarToolbarSplitter: HTMLElement;
    /**
     * @private
     */
    isBookmarkOpen: boolean;
    /**
     * @private
     */
    isThumbnailOpen: boolean;
    /**
     * @private
     */
    commentPanelContainer: HTMLElement;
    /**
     * @private
     */
    commentsContentContainer: HTMLElement;
    /**
     * @private
     */
    accordionContentContainer: HTMLElement;
    /**
     * @private
     */
    commentPanelResizer: HTMLElement;
    /**
     * @private
     */
    restrictUpdateZoomValue: boolean;
    /**
     * @private
     */
    organizePageButton: HTMLElement;
    /**
     * Initialize the constructor of navigationPane.
     *
     * @param { PdfViewer } viewer - Specified PdfViewer class.
     * @param { PdfViewerBase } base - The pdfViewerBase.
     */
    constructor(viewer: PdfViewer, base: PdfViewerBase);
    /**
     * @private
     * @returns {void}
     */
    initializeNavigationPane(): void;
    private createNavigationPane;
    /**
     * @private
     * @returns {void}
     */
    adjustPane(): void;
    private getSideToolbarHeight;
    private createCommentPanel;
    private createCommentPanelTitleContainer;
    private createCommentPanelResizeIcon;
    private openAnnotationContextMenu;
    /**
     * @private
     * @returns {void}
     */
    createAnnotationContextMenu(): void;
    private annotationMenuItemSelect;
    private createFileElement;
    private createXFdfFileElement;
    private importAnnotationIconClick;
    private importXFdfAnnotationIconClick;
    private loadImportAnnotation;
    /**
     * @private
     * @returns {void}
     */
    closeCommentPanelContainer(): void;
    /**
     * @private
     * @param {string} option - The option.
     * @returns {void}
     */
    createNavigationPaneMobile(option: string): void;
    private initiateSearchBox;
    private enableSearchItems;
    private initiateBookmarks;
    private initiateTextSearch;
    /**
     * @private
     * @returns {void}
     */
    goBackToToolbar(): void;
    /**
     * @private
     * @returns {void}
     */
    setSearchInputWidth(): void;
    private getParentElementSearchBox;
    /**
     * @private
     * @param {string} text - The text.
     * @returns {void}
     */
    createTooltipMobile(text: string): void;
    private createMobileTooltip;
    private onTooltipClose;
    /**
     * @private
     * @returns {void}
     */
    toolbarResize(): void;
    private createSidebarToolBar;
    private onTooltipBeforeOpen;
    /**
     * @param {boolean} isEnable - This is isEnable
     * @private
     * @returns {void}
     */
    enableOrganizeButton(isEnable: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    enableThumbnailButton(): void;
    /**
     * @private
     * @returns {void}
     */
    enableBookmarkButton(): void;
    private createSidebarTitleCloseButton;
    private createResizeIcon;
    /**
     * @private
     * @returns {void}
     */
    setResizeIconTop(): void;
    /**
     * @private
     * @returns {void}
     */
    setCommentPanelResizeIconTop(): void;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private resizeIconMouseOver;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private resizePanelMouseDown;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private resizeViewerMouseLeave;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    readonly outerContainerWidth: number;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    getViewerContainerScrollbarWidth(): number;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    readonly sideToolbarWidth: number;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    readonly sideBarContentContainerWidth: number;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    readonly commentPanelContainerWidth: number;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private resizePanelMouseMove;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private sideToolbarOnClose;
    /**
     * @private
     * @returns {void}
     */
    updateViewerContainerOnClose(): void;
    /**
     * @private
     * @returns {void}
     */
    updateViewerContainerOnExpand(): void;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    getViewerContainerLeft(): number;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    getViewerContainerRight(): number;
    /**
     * @private
     * @returns {number} - Returns the number.
     */
    getViewerMainContainerWidth(): number;
    /**
     * Private method to handle the click event of the "organize" button.
     *
     * @param {MouseEvent} event - The MouseEvent object representing the click event.
     * @returns {void}
     */
    private organizeButtonOnClick;
    /**
     * @param {MouseEvent} event - The event.
     * @private
     * @returns {void}
     */
    sideToolbarOnClick: (event: MouseEvent | KeyboardEvent) => void;
    /**
     * @private
     * @returns {void}
     */
    openThumbnailPane: () => void;
    /**
     * @private
     * @returns {void}
     */
    closeThumbnailPane: () => void;
    /**
     * @private
     * @returns {void}
     */
    setThumbnailSelectionIconTheme(): void;
    private removeThumbnailSelectionIconTheme;
    private resetThumbnailIcon;
    /**
     * @private
     * @returns {void}
     */
    resetThumbnailView(): void;
    /**
     * @param {MouseEvent} event - The event.
     * @private
     * @returns {void}
     */
    bookmarkButtonOnClick: (event: MouseEvent | KeyboardEvent) => void;
    private setBookmarkSelectionIconTheme;
    /**
     * @private
     * @returns {void}
     */
    removeBookmarkSelectionIconTheme(): void;
    private sideToolbarOnMouseup;
    private sideBarTitleOnMouseup;
    /**
     * @param {boolean} isSideToolbarOnClick - This is isSideToolbarOnClick
     * @private
     * @returns {void}
     */
    openBookmarkcontentInitially(isSideToolbarOnClick?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    closeBookmarkPane: () => void;
    /**
     * @private
     * @returns {void}
     */
    disableBookmarkButton(): void;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private commentPanelMouseDown;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private updateCommentPanelContainer;
    /**
     * @private
     * @returns {void}
     */
    calculateCommentPanelWidth(): void;
    /**
     * @param {MouseEvent} event - The event.
     * @returns {void}
     */
    private commentPanelMouseLeave;
    /**
     * @private
     * @returns {void}
     */
    clear(): void;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @returns {string} - Returns the string.
     */
    getModuleName(): string;
}
