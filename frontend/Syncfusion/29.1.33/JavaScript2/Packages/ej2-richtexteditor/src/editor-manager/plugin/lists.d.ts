import { EditorManager } from './../base/editor-manager';
/**
 * Lists internal component
 *
 * @hidden
 * @deprecated
 */
export declare class Lists {
    private parent;
    private startContainer;
    private endContainer;
    private saveSelection;
    private domNode;
    private currentAction;
    private commonLIParent;
    private listTabIndentation;
    /**
     * Constructor for creating the Lists plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    constructor(parent: EditorManager);
    private addEventListener;
    private removeEventListener;
    private testList;
    private testCurrentList;
    private createAutoList;
    private isInsideSameListType;
    private spaceList;
    private enterList;
    private applyFormattingFromRange;
    private handleNestedEnterKeyForLists;
    private backspaceList;
    private handleNestedListRearrangement;
    private findPreviousElementForCursor;
    private handleCursorPositioningAfterListRemoval;
    private removeList;
    private onKeyUp;
    private firstListBackSpace;
    private isAtListStart;
    private getFirstTextNode;
    private keyDownHandler;
    private handleListIndentation;
    private isCursorAtStartOfLI;
    private spaceKeyAction;
    private getAction;
    private revertClean;
    private noPreviousElement;
    private nestedList;
    private isCursorBeforeTable;
    private isCursorAtEndOfTable;
    private isListItemWithTableChild;
    private applyListsHandler;
    private setSelectionBRConfig;
    private applyLists;
    private setStyle;
    private removeEmptyListElements;
    private isRevert;
    private checkLists;
    private cleanNode;
    private findUnSelected;
    private revertList;
    private getClosestListParentMargin;
    private openTag;
    private closeTag;
    destroy(): void;
    private areAllListItemsSelected;
    private getListCursorInfo;
    private checkIsNestedList;
    private getListSelectionType;
    private isAllListNodesSelected;
}
