import { IImageNotifyArgs } from '../base/interface';
import { Uploader } from '@syncfusion/ej2-inputs';
import { Dialog } from '@syncfusion/ej2-popups';
/**
 * `Audio` module is used to handle audio actions.
 */
export declare class Audio {
    element: HTMLElement;
    private rteID;
    private parent;
    dialogObj: Dialog;
    uploadObj: Uploader;
    private button;
    private i10n;
    private inputUrl;
    private uploadUrl;
    private contentModule;
    private rendererFactory;
    private quickToolObj;
    private audEle;
    private isAudioUploaded;
    private isAllowedTypes;
    private dialogRenderObj;
    private deletedAudio;
    private removingAudioName;
    private prevSelectedAudEle;
    private showPopupTime;
    private isDestroyed;
    private docClick;
    private constructor();
    protected addEventListener(): void;
    protected removeEventListener(): void;
    private afterRender;
    private checkAudioBack;
    private checkAudioDel;
    private undoStack;
    private touchStart;
    private onToolbarAction;
    private onKeyUp;
    private onKeyDown;
    private handleSelectAll;
    private openDialog;
    private showDialog;
    private closeDialog;
    private deleteAudio;
    private audioRemovePost;
    private triggerPost;
    private audioClick;
    private onDocumentClick;
    private alignmentSelect;
    private break;
    private inline;
    private editAreaClickHandler;
    private isAudioElem;
    private showAudioQuickToolbar;
    hideAudioQuickToolbar(): void;
    private insertingAudio;
    private clearDialogObj;
    insertAudio(e: IImageNotifyArgs): void;
    private audioUrlPopup;
    private audioUpload;
    private checkExtension;
    private fileSelect;
    private cancelDialog;
    private insertAudioUrl;
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
     * @hidden
     */
    private getModuleName;
}
