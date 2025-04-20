import { WParagraphFormat } from '../format/paragraph-format';
import { WSectionFormat } from '../format/section-format';
import { WCharacterFormat } from '../format/character-format';
import { WListFormat } from '../format/list-format';
import { WListLevel } from '../list/list-level';
import { EditorHistory } from '../index';
import { IWidget, ParagraphWidget, FieldElementBox, TableWidget, TableRowWidget, BookmarkElementBox, EditRangeStartElementBox, CommentElementBox, ContentControl } from '../viewer/page';
import { DocumentEditor } from '../../document-editor';
import { Action } from '../../index';
import { TextPosition } from '../index';
import { ElementBox } from '../viewer/page';
import { WTableFormat, WRowFormat, WCellFormat } from '../format/index';
import { DocumentHelper } from '../viewer';
import { ProtectionType } from '../../base/types';
/**
 * @private
 */
export declare class BaseHistoryInfo {
    private ownerIn;
    documentHelper: DocumentHelper;
    private actionIn;
    private removedNodesIn;
    private modifiedPropertiesIn;
    private modifiedNodeLength;
    private selectionStartIn;
    private selectionEndIn;
    private insertPositionIn;
    private endPositionIn;
    private currentPropertyIndex;
    private ignoredWord;
    insertedText: string;
    insertedData: ImageInfo;
    type: string;
    headerFooterStart: number;
    headerFooterEnd: number;
    private tableRelatedLength;
    cellOperation: Operation[];
    format: string;
    fieldBegin: FieldElementBox;
    startIndex: number;
    private insertIndex;
    endIndex: number;
    ignoreStartOffset: boolean;
    insertedElement: ElementBox;
    splittedRevisions: MarkerInfo[];
    isAcceptOrReject: string;
    insertedNodes: IWidget[];
    pasteContent: string;
    insertedFormat: Object;
    private collabStart;
    private collabEnd;
    isRemovedNodes: boolean;
    modifiedFormatOperation: Operation[];
    private revisionOperation;
    /**
     * @private
     */
    lastElementRevision: ElementBox;
    /**
     * @private
     */
    isRevisionEndInAnotherCell: boolean;
    /**
     * @private
     */
    endRevisionLogicalIndex: string;
    /**
     * @private
     */
    markerData: MarkerInfo[];
    /**
     * @private
     */
    formFieldType: string;
    /**
     * @private
     */
    isEditHyperlink: boolean;
    /**
     * @private
     */
    isEmptySelection: boolean;
    /**
     * @private
     */
    isHyperlinkField: boolean;
    /**
     * @private
     */
    dropDownIndex: number;
    /**
     * @private
     */
    pastedComments: CommentElementBox[];
    readonly owner: DocumentEditor;
    readonly editorHistory: EditorHistory;
    action: Action;
    readonly modifiedProperties: Object[];
    readonly removedNodes: IWidget[];
    selectionStart: string;
    selectionEnd: string;
    insertPosition: string;
    endPosition: string;
    constructor(node: DocumentEditor);
    private readonly viewer;
    updateSelection(): void;
    private updateCollaborativeSelection;
    private paraInclude;
    /**
     * This method will set position when the multple cell selected.
     *
     * @param {TextPosition} startPosition - Specifies the start position.
     * @param {TextPosition} endPosition - Specifies the end position.
     * @private
     * @returns {void}
     */
    private updateTableSelection;
    /**
     * start is para and end is in row.
     *
     * @param {TextPosition} startPosition - Specifies the start position.
     * @param {TextPosition} endPosition - Specifies the end position.
     * @private
     * @returns {void}
     */
    private splitOperationForDelete;
    setBookmarkInfo(bookmark: BookmarkElementBox): void;
    setContentControlInfo(contentControl: ContentControl): void;
    setFormFieldInfo(field: FieldElementBox, value: string | number | boolean): void;
    setEditRangeInfo(editStart: EditRangeStartElementBox): void;
    setContentControlCheckBox(contentControl: ContentControl, value: boolean): void;
    private revertFormTextFormat;
    private revertFormField;
    private revertContentControl;
    private revertBookmark;
    private revertComment;
    private revertEditRangeRegion;
    private revertContentControlProperties;
    revert(): void;
    private highlightListText;
    private removeContent;
    updateEndRevisionInfo(): void;
    private retrieveEndPosition;
    /**
     * Method to retrieve exact spitted node which is marked as last available element.
     *
     * @param {ElementBox} elementBox - Specifies the element box
     * @returns {ElementBox} - Returns element box
     */
    private checkAdjacentNodeForMarkedRevision;
    private revertModifiedProperties;
    private redoAction;
    private revertModifiedNodes;
    private insertRemovedNodes;
    undoRevisionForElements(start: TextPosition, end: TextPosition, id: string): void;
    private revertResizing;
    private revertTableDialogProperties;
    addModifiedPropertiesForSection(format: WSectionFormat, property: string, value: Object): Object;
    addModifiedProperties(format: WCharacterFormat, property: string, value: Object): Object;
    /**
     * build character Operation for undo/redo
     *
     * @private
     * @returns {void}
     */
    buildCharacterFormatOperation(widget: ElementBox, format: WCharacterFormat): void;
    addModifiedPropertiesForParagraphFormat(format: WParagraphFormat, property: string, value: Object): Object;
    /**
     * build paragraph Operation for undo/redo
     *
     * @private
     * @returns {void}
     */
    getParagraohFormatOperation(paragarph: ParagraphWidget, format: any): void;
    addModifiedPropertiesForContinueNumbering(paragraphFormat: WParagraphFormat, value: Object): Object;
    addModifiedPropertiesForRestartNumbering(listFormat: WListFormat, value: Object): Object;
    addModifiedPropertiesForList(listLevel: WListLevel): Object;
    private revertProperties;
    addModifiedCellOptions(applyFormat: WCellFormat, format: WCellFormat, table: TableWidget): WCellFormat;
    private copyCellOptions;
    addModifiedTableOptions(format: WTableFormat): void;
    private copyTableOptions;
    private getProperty;
    private getCharacterPropertyValue;
    addModifiedTableProperties(format: WTableFormat, property: string, value: Object): Object;
    addModifiedRowProperties(rowFormat: WRowFormat, property: string, value: Object): Object;
    addModifiedCellProperties(cellFormat: WCellFormat, property: string, value: Object): Object;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * @private
     */
    recordInsertRevisionDeletetion(widget: IWidget, startOffset?: number, endOffset?: number): void;
    /**
     * @private
     */
    getDeleteOperationsForTrackChanges(): Operation[];
    private checkValidRevision;
    /**
     * @private
     */
    getDeleteOperationForTrackChanges(element: ElementBox): Operation;
    /**
     * @private
     */
    getActionInfo(isInvertOperation?: boolean): Operation[];
    private getTrackchangesOperation;
    private getRevision;
    private getElementAbsolutePosition;
    /**
     * @private
     */
    getFieldOperation(): Operation[];
    /**
     * @private
     * @returns {Operation}
     * This method will build the operation for undo/Redo deleted content as paste action.
     */
    getDeleteContent(action: Action): Operation[];
    private getEditHyperlinkOperation;
    private getPasteContentLength;
    /**
     * @private
     * @returns {Operation}
     */
    getUpdateOperation(): Operation;
    private getResizingOperation;
    private getRowLength;
    /**
     * @private
     * @returns {Operation}
     */
    getDeleteOperation(action: Action, setEndIndex?: boolean, text?: string): Operation;
    /**
     * @private
     * @returns {Operation}
     */
    getInsertOperation(action: Action, setEndIndex?: boolean, skipMarkerData?: boolean): Operation;
    private getFootNoteLength;
    private getUndoRedoOperation;
    private getPasteOpertion;
    private buildTableRowCellOperation;
    private assignRevisionData;
    private createAcceptRejectOperation;
    private buildRowOperation;
    /**
     * @private
     */
    buildRowOperationForTrackChanges(row: TableRowWidget, action?: Action): Operation;
    private buildCellOperation;
    private deleteColumnOperation;
    private getPasteMergeOperation;
    private deleteCell;
    /**
     * @private
     * @returns {Operation}
     */
    getFormatOperation(element?: ElementBox, action?: string, skipIncrement?: boolean): Operation;
    private getRemovedText;
    private getRevisionOperation;
    private getRemovedFieldCode;
    private getParagraphText;
    private getTableText;
    private getRowText;
    /**
     * @private
     * @returns {Operation}
     */
    getCommentOperation(operation: Operation, action: Action, comment?: CommentElementBox): Operation;
    /**
     * @private
     */
    getDeleteCommentOperation(modifiedActions: BaseHistoryInfo[], operations: Operation[]): void;
    /**
     * @private
     * @returns {Operation}
     */
    buildFormatOperation(action: Action, ischarFormat: boolean): Operation[];
    /**
     * @private
     * @returns {Operation}
     */
    getSelectedCellOperation(action: Action, ischarFormat?: boolean, isBorder?: boolean, isShading?: boolean, isCell?: boolean): Operation[];
    private buildclearFormatOperations;
    private tableClearFormatOperation;
    private buildclearFormatOperation;
    private writeBorderFormat;
    private createListFormat;
    private createCharacterFormat;
    private createParagraphFormat;
    /**
     * @private
     * @returns {void}
     */
    createTableFormat(action: Action): void;
    /**
     * @private
     * @returns {void}
     */
    createRowFormat(action: Action): void;
    /**
     * @private
     * @returns {void}
     */
    createCellFormat(action: Action): void;
    private getTableFormatString;
    private createSectionFormat;
    private getRowString;
    private getCellString;
}
/**
 * Specifies the operation that is performed in Document Editor.
 * > Reserved for internal use only.
 */
export interface Operation {
    /**
     * Reserved for internal use only.
     */
    action?: 'Insert' | 'Delete' | 'Format' | 'Update';
    /**
     * Reserved for internal use only.
     */
    offset?: number;
    /**
     * Reserved for internal use only.
     */
    text?: string;
    /**
     * Reserved for internal use only.
     */
    length?: number;
    /**
     * Reserved for internal use only.
     */
    skipOperation?: boolean;
    /**
     * Reserved for internal use only.
     */
    imageData?: ImageInfo;
    /**
     * Reserved for internal use only.
     */
    type?: string;
    /**
     * Reserved for internal use only.
     */
    markerData?: MarkerInfo;
    /**
     * Reserved for internal use only.
     */
    protectionData?: ProtectionInfo;
    /**
     * Reserved for internal use only.
     */
    enableTrackChanges?: boolean;
    /**
     * Reserved for internal use only.
     */
    pasteContent?: string;
    /**
     * Reserved for internal use only.
     */
    styleData?: string;
    /**
     * Reserved for internal use only.
     */
    listData?: string;
    /**
     * Reserved for internal use only.
     */
    format?: string;
}
/**
 * Specifies the information about the image data.
 * > Reserved for internal use only.
 */
export interface ImageInfo {
    /**
     * Reserved for internal use only.
     */
    imageString?: string;
    /**
     * Reserved for internal use only.
     */
    height?: number;
    /**
     * Reserved for internal use only.
     */
    width?: number;
    /**
     * Reserved for internal use only.
     */
    alternativeText?: string;
    /**
     * Reserved for internal use only.
     */
    metaString?: string;
}
/**
 * Specifies the information about marker elements.
 * > Reserved for internal use only.
 */
export interface MarkerInfo {
    /**
     * Reserved for internal use only.
     */
    contentControlProperties?: string;
    /**
     * Reserved for internal use only.
     */
    bookmarkName?: string;
    /**
     * Reserved for internal use only.
     */
    type?: string;
    /**
     * Reserved for internal use only.
     */
    user?: string;
    /**
     * Reserved for internal use only.
     */
    editRangeId?: number;
    /**
     * Reserved for internal use only.
     */
    skipOperation?: boolean;
    /**
     * Reserved for internal use only.
     */
    columnFirst?: string;
    /**
     * Reserved for internal use only.
     */
    columnLast?: string;
    /**
     * Reserved for internal use only.
     */
    isAfterParagraphMark?: boolean;
    /**
     * Reserved for internal use only.
     */
    isAfterTableMark?: boolean;
    /**
     * Reserved for internal use only.
     */
    isAfterRowMark?: boolean;
    /**
     * Reserved for internal use only.
     */
    isAfterCellMark?: boolean;
    /**
     * Reserved for internal use only.
     */
    formFieldData?: string;
    /**
     * Reserved for internal use only.
     */
    checkBoxValue?: boolean;
    /**
     * Reserved for internal use only.
     */
    commentId?: string;
    /**
     * Reserved for internal use only.
     */
    author?: string;
    /**
     * Reserved for internal use only.
     */
    date?: string;
    /**
     * Reserved for internal use only.
     */
    initial?: string;
    /**
     * Reserved for internal use only.
     */
    done?: boolean;
    /**
     * Reserved for internal use only.
     */
    commentIndex?: number;
    /**
     * Reserved for internal use only.
     */
    commentAction?: string;
    /**
     * Reserved for internal use only.
     */
    text?: string;
    /**
     * Reserved for internal use only.
     */
    ownerCommentId?: string;
    /**
     * Reserved for internal use only.
     */
    isReply?: boolean;
    /**
     * Reserved for internal use only.
     */
    revisionId?: string;
    /**
     * Reserved for internal use only.
     */
    revisionType?: string;
    /**
     * Reserved for internal use only.
     */
    isAcceptOrReject?: string;
    /**
     * Reserved for internal use only.
     */
    splittedRevisions?: MarkerInfo[];
    /**
     * Reserved for internal use only.
     */
    removedIds?: string[];
    /**
     * Reserved for internal use only.
     */
    dropDownIndex?: number;
    /**
     * Reserved for internal use only.
     */
    isSkipTracking?: boolean;
    /**
     * Reserved for internal use only.
     */
    revisionForFootnoteEndnoteContent?: MarkerInfo;
}
/**
 * Specifies the information about the protection type.
 * > Reserved for internal use.
 */
export interface ProtectionInfo {
    /**
     * Reserved for internal use only.
     */
    saltValue?: string;
    /**
     * Reserved for internal use only.
     */
    hashValue?: string;
    /**
     * Reserved for internal use only.
     */
    protectionType?: ProtectionType;
}
