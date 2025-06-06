import { Dialog, DialogModel } from '@syncfusion/ej2-popups';
import { IRichTextEditor } from '../base/interface';
/**
 * Dialog Renderer
 */
export declare class DialogRenderer {
    dialogObj: Dialog;
    private dialogEle;
    private parent;
    private outsideClickClosedBy;
    constructor(parent?: IRichTextEditor);
    protected addEventListener(): void;
    protected removeEventListener(): void;
    /**
     * dialog render method
     *
     * @param {DialogModel} e - specifies the dialog model.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    render(e: DialogModel): Dialog;
    private beforeOpen;
    private handleEnterKeyDown;
    private beforeOpenCallback;
    private open;
    private documentClickClosedBy;
    private beforeClose;
    private getDialogPosition;
    /**
     * dialog close method
     *
     * @param {Object} args - specifies the arguments.
     * @returns {void}
     * @hidden
     * @deprecated
     */
    close(args: Object): void;
}
