import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `Image` module is used to handle image actions.
 */
export declare class Image {
    element: HTMLElement;
    private rteID;
    private parent;
    dialogObj: Dialog;
    private popupObj;
    uploadObj: Uploader;
    private i10n;
    private inputUrl;
    private captionEle;
    private checkBoxObj;
    private widthNum;
    private heightNum;
    private browseButton;
    private uploadUrl;
    private contentModule;
    private rendererFactory;
    private quickToolObj;
    /**
     * @hidden
     */
    imgResizeDiv: HTMLElement;
    private imgDupPos;
    private resizeBtnStat;
    private imgEle;
    private prevSelectedImgEle;
    private isImgUploaded;
    private isAllowedTypes;
    private pageX;
    private pageY;
    private dialogRenderObj;
    private deletedImg;
    private changedWidthValue;
    private changedHeightValue;
    private inputWidthValue;
    private inputHeightValue;
    private removingImgName;
    private currentResizeHandler;
    private aspectRatio;
    private drop;
    private drag;
    private enter;
    private start;
    private docClick;
    private imageQTPopupTime;
    private imageDragPopupTime;
    private uploadCancelTime;
    private uploadFailureTime;
    private uploadSuccessTime;
    private showImageQTbarTime;
    private isDestroyed;
    private constructor();
    protected addEventListener(): void;
    protected removeEventListener(): void;
    private updateCss;
    private setCssClass;
    private onIframeMouseDown;
    private afterRender;
    private undoStack;
    private resizeEnd;
    private resizeStart;
    private imageClick;
    private onCutHandler;
    private imageResize;
    private getPointX;
    private getPointY;
    private imgResizePos;
    private calcPos;
    private setAspectRatio;
    private setImageWidth;
    private setImageHeight;
    private removeImageHeight;
    private getImageDimension;
    private adjustDimensionsByAspectRatio;
    private pixToPerc;
    private imgDupMouseMove;
    private resizing;
    private adjustDimensions;
    private getResizeFactor;
    private findAspectRatio;
    cancelResizeAction(): void;
    private resizeImgDupPos;
    private resizeBtnInit;
    private onToolbarAction;
    private openImgLink;
    private editImgLink;
    private removeImgLink;
    private onKeyDown;
    private handleSelectAll;
    private openDialog;
    private showDialog;
    private closeDialog;
    private onKeyUp;
    private checkImageBack;
    private checkImageDel;
    private alignmentSelect;
    private imageWithLinkQTBarItemUpdate;
    private showImageQuickToolbar;
    private hideImageQuickToolbar;
    private editAreaClickHandler;
    private insertImgLink;
    private insertAltText;
    private insertAlt;
    private handleKeyDown;
    private insertlink;
    private isUrl;
    private deleteImg;
    private caption;
    private imageSize;
    private break;
    private inline;
    private alignImage;
    private clearDialogObj;
    private imagDialog;
    private cancelDialog;
    private onDocumentClick;
    private removeResizeEle;
    private onWindowResize;
    private imageUrlPopup;
    private insertImageUrl;
    private imgsizeInput;
    private inputValue;
    private insertSize;
    private insertImage;
    private imgUpload;
    private checkExtension;
    private fileSelect;
    private dragStart;
    private dragEnter;
    private dragOver;
    /**
     * Used to set range When drop an image
     *
     * @param {ImageDropEventArgs} args - specifies the image arguments.
     * @returns {void}
     */
    private dragDrop;
    /**
     * Used to calculate range on internet explorer
     *
     * @param {number} x - specifies the x range.
     * @param {number} y - specifies the y range.
     * @returns {void}
     */
    private getDropRange;
    private insertDragImage;
    private hasOnlyImage;
    private onSelect;
    /**
     * Rendering uploader and popup for drag and drop
     *
     * @param {DragEvent} dragEvent - specifies the event.
     * @param {HTMLImageElement} imageElement - specifies the element.
     * @returns {void}
     */
    private uploadMethod;
    private refreshPopup;
    /**
     * Called when drop image upload was failed
     *
     * @param {HTMLElement} imgEle - specifies the image element.
     * @param {IShowPopupArgs} args - specifies the arguments.
     * @param {ImageFailedEventArgs} e - specfies the failure event.
     * @returns {void}
     */
    private uploadFailure;
    /**
     * Called when drop image upload was successful
     *
     * @param {HTMLElement} imageElement - specifies the image element.
     * @param {DragEvent} dragEvent - specifies the drag event.
     * @param {IShowPopupArgs} args - specifies the arguments.
     * @param {ImageSuccessEventArgs} e - specifies the success event.
     * @returns {void}
     */
    private uploadSuccess;
    private imagePaste;
    private showPopupToolBar;
    /**
     * Destroys the ToolBar.
     *
     * @method destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    destroy(): void;
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     */
    private getModuleName;
}
