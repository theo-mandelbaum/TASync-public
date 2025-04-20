import { EditorManager } from './../base/editor-manager';
import { IHtmlItem } from './../base/interface';
/**
 * Video internal component
 *
 * @hidden
 * @deprecated
 */
export declare class VideoCommand {
    private parent;
    private vidElement;
    /**
     * Constructor for creating the Video plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    /**
     * videoCommand method
     *
     * @param {IHtmlItem} e - specifies the element
     * @returns {void}
     * @hidden
     * @deprecated
     */
    videoCommand(e: IHtmlItem): void;
    private wrapVideo;
    private createVideo;
    private editAreaVideoClick;
    private setStyle;
    private videoDimension;
    private callBack;
    destroy(): void;
}
