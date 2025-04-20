import { EditorManager } from './../base/editor-manager';
/**
 * Formats internal component
 *
 * @hidden
 * @deprecated
 */
export declare class Formats {
    private parent;
    private blockquotePrevent;
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - specifies the parent element.
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private getParentNode;
    private blockQuotesHandled;
    private onKeyUp;
    private getBlockParent;
    private onKeyDown;
    private removeCodeContent;
    private deleteContent;
    private paraFocus;
    private isNotEndCursor;
    private setCursorPosition;
    private focusSelectionParent;
    private insertMarker;
    private applyFormats;
    private hasOnlyBlockquotes;
    private getNode;
    private createBlockquoteSpan;
    private setSelectionBRConfig;
    private preFormatMerge;
    private blockquotesFormatMerge;
    private cleanFormats;
    private applyTableSidesFormat;
    destroy(): void;
}
