import { EditorManager } from './../base/editor-manager';
import { IHtmlItem } from './../base/interface';
/**
 * Audio internal component
 *
 * @hidden
 * @deprecated
 */
export declare class AudioCommand {
    private parent;
    /**
     * Constructor for creating the Audio plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    /**
     * audioCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @deprecated
     */
    audioCommand(e: IHtmlItem): void;
    private createAudio;
    private setStyle;
    private callBack;
    destroy(): void;
}
