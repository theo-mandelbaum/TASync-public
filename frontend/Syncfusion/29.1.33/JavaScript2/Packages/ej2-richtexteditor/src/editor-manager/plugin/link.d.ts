import { EditorManager } from './../base/editor-manager';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
export declare class LinkCommand {
    private parent;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the editor manager
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private linkCommand;
    private createLink;
    private createAchorNode;
    private removeText;
    private openLink;
    private removeLink;
    private callBack;
    destroy(): void;
    private handleLinkFormat;
    private applyLinkToBlockNode;
    private unwrapLink;
    private replaceElementsWithAnchor;
    private getSplitNode;
}
