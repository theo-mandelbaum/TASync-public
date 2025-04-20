/**
 * Insert a HTML Node or Text
 *
 * @hidden
 * @deprecated
 */
export declare class InsertHtml {
    /**
     * Insert method
     *
     * @hidden
     * @deprecated
     */
    static inlineNode: string[];
    static contentsDeleted: boolean;
    static Insert(docElement: Document, insertNode: Node | string, editNode?: Element, isExternal?: boolean, enterAction?: string): void;
    private static removeEmptyNextLI;
    private static findFirstTextNode;
    private static pasteInsertHTML;
    private static compareParentElements;
    private static getFilteredAttributes;
    private static getClosestMatchingElement;
    private static findMatchingChild;
    private static listCleanUp;
    private static cleanUpListItems;
    private static cleanUpFlattenListContainer;
    private static cleanUpListContainer;
    private static placeCursorEnd;
    private static getNodeCollection;
    private static insertTempNode;
    private static cursorPos;
    private static imageFocus;
    private static getImmediateBlockNode;
    private static removingComments;
    private static findDetachEmptyElem;
    private static removeEmptyElements;
    private static closestEle;
    private static insertTableInList;
    private static moveChildNodes;
    private static alignCheck;
    private static removeListfromPaste;
}
