import { EditorManager } from './../base/editor-manager';
/**
 * Selection EXEC internal component
 *
 * @hidden
 * @deprecated
 */
export declare class SelectionBasedExec {
    private parent;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private keyDownHandler;
    private applySelection;
    private callBack;
    destroy(): void;
}
