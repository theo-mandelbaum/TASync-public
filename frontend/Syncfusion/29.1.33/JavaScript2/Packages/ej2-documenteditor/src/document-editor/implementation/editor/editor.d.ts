import { Selection } from '../index';
import { TextPosition } from '../selection/selection-helper';
import { IWidget, ParagraphWidget, LineWidget, ElementBox, ImageElementBox, BlockWidget, BodyWidget, TableWidget, TableCellWidget, TableRowWidget, Widget, BookmarkElementBox, HeaderFooterWidget, FieldTextElementBox, EditRangeStartElementBox, EditRangeEndElementBox, CommentElementBox, CommentCharacterElementBox, FormField, ShapeElementBox, ContentControl, FootnoteElementBox, ContentControlProperties } from '../viewer/page';
import { WCharacterFormat } from '../format/character-format';
import { CellInfo, IndexInfo, BlockInfo, Base64, TextFormFieldInfo, CheckBoxFormFieldInfo, DropDownFormFieldInfo, SelectedCommentInfo, FieldInfo } from './editor-helper';
import { WParagraphFormat, WSectionFormat, WTableFormat, WRowFormat, WCellFormat, WBorders, WShading, WTabStop } from '../index';
import { WList } from '../list/list';
import { WListLevel } from '../list/list-level';
import { WLevelOverride } from '../list/level-override';
import { FieldElementBox } from '../viewer/page';
import { HighlightColor, BaselineAlignment, Strikethrough, Underline, LineSpacingType, TextAlignment, ListLevelPattern, HeaderFooterType, ContentControlInfo, CommentProperties, Comment } from '../../base/index';
import { Action } from '../../index';
import { MarkerInfo } from '../editor-history/base-history-info';
import { TableResizer } from './table-resizer';
import { Dictionary } from '../../base/dictionary';
import { CellVerticalAlignment, BorderType, LineStyle, TabLeader, OutlineLevel, AutoFitType, ProtectionType, PasteOptions, TablePasteOptions, FormFieldType, RevisionType, ContentControlType, AutoShapeType, TextWrappingStyle, TextWrappingType, LineFormatType, LineDashing, VerticalOrigin, VerticalAlignment, HorizontalOrigin, HorizontalAlignment } from '../../base/types';
import { DocumentHelper } from '../viewer';
import { Revision } from '../track-changes/track-changes';
import { SectionBreakType } from '../../base/types';
import { FieldSettingsModel } from '@syncfusion/ej2-dropdowns';
/**
 * Editor module
 */
export declare class Editor {
    /**
     * @private
     */
    documentHelper: DocumentHelper;
    private nodes;
    private editHyperlinkInternal;
    private startOffset;
    /**
     * @private
     */
    startParagraph: ParagraphWidget;
    private endOffset;
    private pasteRequestHandler;
    /**
     * @private
     */
    endParagraph: ParagraphWidget;
    private currentProtectionType;
    private alertDialog;
    private formFieldCounter;
    private skipFieldDeleteTracking;
    private skipFootNoteDeleteTracking;
    private isForHyperlinkFormat;
    private isTrackingFormField;
    private previousBlockToLayout;
    private isInsertText;
    private casingIndex;
    private checkLastLetterSpace;
    private checkLastLetterSpaceDot;
    private pasteFootNoteType;
    private isInsertingText;
    private guid;
    /**
     * @private
     */
    keywordIndex: number;
    /**
     * @private
     */
    dateValue: string;
    /**
     * @private
     */
    xmlTitle: string;
    /**
     * @private
     */
    dictionaryObjcetIDIncreament: number;
    /**
     * @private
     */
    dictionaryObjectIndexIncrement: number;
    /**
     * @private
     */
    XMLFilesCount: number;
    /**
     * @private
     */
    XMLFilesNameSpaceCount: number;
    /**
     * @private
     */
    xmlData: {
        [key: string]: Object;
    }[];
    /**
     * @private
     */
    dictionaryObject: {
        ID: string;
        Data: any;
    }[];
    private footnoteRevision;
    /**
    * @private
    */
    isFootnoteElementRemoved: boolean;
    /**
    * @private
    */
    isEndnoteElementRemoved: boolean;
    /**
    * @private
    */
    handledEnter: boolean;
    /**
     * @private
     */
    handledTextInput: boolean;
    /**
     * @private
     */
    removeEditRange: boolean;
    /**
     * @private
     */
    isRemoveRevision: boolean;
    /**
     * @private
     */
    isFootNoteInsert: boolean;
    /**
     * @private
     */
    isTableInsert: boolean;
    /**
     * @private
     */
    isFootNote: boolean;
    /**
     * @private
     */
    isHandledComplex: boolean;
    /**
     * @private
     */
    isUserInsert: boolean;
    /**
     * @private
     */
    tableResize: TableResizer;
    /**
     * @private
     */
    tocStyles: TocLevelSettings;
    /**
     * @private
     */
    triggerPageSpellCheck: boolean;
    /**
     * @private
     */
    chartType: boolean;
    /**
     * @private
     */
    removedBookmarkElements: BookmarkElementBox[];
    /**
     * @private
     */
    removedEditRangeStartElements: EditRangeStartElementBox[];
    /**
     * @private
     */
    removedEditRangeEndElements: EditRangeEndElementBox[];
    /**
     * @private
     */
    removedContentControlElements: ContentControl[];
    /**
     * @private
     */
    tocBookmarkId: number;
    /**
     * @private
     */
    copiedData: string;
    /**
    * @private
    */
    isPasteContentCheck: boolean;
    private animationTimer;
    private pageRefFields;
    private delBlockContinue;
    private delBlock;
    private delSection;
    /**
     * @private
     */
    isInsertingTOC: boolean;
    /**
     * @private
     */
    isMeasureParaWidth: boolean;
    private editStartRangeCollection;
    private skipReplace;
    private skipTableElements;
    private removedTextNodes;
    private editRangeID;
    /**
     * @private
     */
    isImageInsert: boolean;
    /**
     * @private
     */
    isSkipOperationsBuild: boolean;
    /**
     * @private
     */
    isCellFormatApplied: boolean;
    /**
     * @private
     */
    revisionData: MarkerInfo[];
    /**
     * @private
     */
    splittedRevisions: MarkerInfo[];
    /**
     * @private
     */
    isSkipComments: boolean;
    private currentHashValue;
    /**
     * @private
     */
    isRemoteAction: boolean;
    /**
     * @private
     */
    isIncrementalSave: boolean;
    /**
     * @private
     */
    listNumberFormat: string;
    /**
     * @private
     */
    listLevelPattern: ListLevelPattern;
    /**
     * @private
     */
    listLevelNumber: number;
    /**
    * @private
    */
    xmlStringValue: string;
    /**
     * @private
     */
    isXmlMapped: boolean;
    /**
     * @private
     */
    restrictLayout: boolean;
    private isAutoList;
    private isLastParaMarkCopied;
    private combineLastBlock;
    /**
     * @private
     */
    remotePasteRevision: Revision[];
    /**
     * @private
     */
    isFieldOperation: boolean;
    /**
     * @private
     * @returns {boolean} - Returns the restrict formatting
     */
    readonly restrictFormatting: boolean;
    /**
     * @private
     * @returns {boolean} - Returns the restrict editing
     */
    readonly restrictEditing: boolean;
    /**
     * @private
     * @returns {boolean} - Returns the can edit content control.
     */
    readonly canEditContentControl: boolean;
    /**
     * @private
     */
    copiedContent: any;
    /**
     * @private
     */
    copiedTextContent: string;
    /**
     * @private
     */
    previousParaFormat: WParagraphFormat;
    private previousCharFormat;
    private previousSectionFormat;
    private currentPasteOptions;
    private pasteTextPosition;
    /**
     * @private
     */
    isPaste: boolean;
    /**
     * @private
     */
    isPasteListUpdated: boolean;
    /**
     * @private
     */
    isHtmlPaste: boolean;
    /**
     * @private
     */
    base64: Base64;
    /**
     * @private
     */
    isInsertField: boolean;
    /**
     * Initialize the editor module
     *
     * @param {DocumentHelper} documentHelper - Document helper
     * @private
     */
    constructor(documentHelper: DocumentHelper);
    private readonly viewer;
    private readonly editorHistory;
    /**
     * @private
     */
    isBordersAndShadingDialog: boolean;
    /**
     * @private
    */
    pasteImageIndex: Dictionary<string, string>;
    private readonly selection;
    private readonly owner;
    private getModuleName;
    /**
     * Initiates a batch update mode where multiple editing operations can be grouped together. This prevents intermediate re-layout during the execution of grouped operations, improving performance for bulk updates.
     *
     * @returns {void}
     */
    beginBatchEdit(): void;
    /**
     * Ends the batch update mode and triggers a single re-relayout or change notification to reflect all the modifications made during the batch update.
     *
     * @returns {void}
     */
    endBatchEdit(): void;
    /**
     * Sets the field information for the selected field.
     *
     * @param { FieldInfo } fieldInfo – Specifies the field information.
     * @returns {void}
     * > Nested field gets replaced completely with the specified field information.
     */
    setFieldInfo(fieldInfo: FieldInfo): void;
    /**
     * Inserts the specified field at cursor position.
     *
     * @param {string} code Specify the field code.
     * @param {string} result Specify the field result.
     * @returns {void}
     */
    insertField(code: string, result?: string): void;
    /**
     * @private
     */
    isLinkedStyle(styleName: string): boolean;
    /**
     * Applies the specified style for paragraph.
     *
     * @param {string} style Specify the style name to apply.
     * @param {boolean} clearDirectFormatting - Removes manual formatting (formatting not applied using a style)
     * from the selected text, to match the formatting of the applied style. Default value is false.
     * @returns {void}
     */
    applyStyle(style: string, clearDirectFormatting?: boolean): void;
    /**
     * Moves the selected content in the document editor control to clipboard.
     *
     * @returns {void}
     */
    cut(): void;
    /**
     * Inserts the editing region where everyone can edit.
     *
     * @returns {void}
     */
    insertEditingRegion(): void;
    /**
     * Inserts the editing region where mentioned user can edit.
     *
     * @returns {void}
     */
    insertEditingRegion(user: string): void;
    /**
     * Enforces the document protection by protection type.
     *
     * @param {string} credential Specify the credential to protect the document.
     *
     * @param {ProtectionType} protectionType Specify the document protection type.
     *
     * @returns {void}
     */
    enforceProtection(credential: string, protectionType: ProtectionType): void;
    /**
     * Enforces the document protection with the specified credential.
     *
     * @param {string} credential Specify the credential to protect the document.
     *
     * @param {boolean} limitToFormatting True if to limit the document formatting; Otherwise, false.
     *
     * @param {boolean} isReadOnly  True if to allow read-only access to the document; Otherwise, false.
     *
     * @returns {void}
     */
    enforceProtection(credential: string, limitToFormatting: boolean, isReadOnly: boolean): void;
    /**
     * Enforces the document protection with the specified protection type.
     *
     * @param {string} credential Specify the credential to protect the document.
     *
     * @param {ProtectionType} protectionType Specify the document protection type.
     *
     * @returns {Promise} Returns a Promise which is resolved when protection is enforced, or rejected if for any reason protection cannot be enforced.
     */
    enforceProtectionAsync(credential: string, protectionType: ProtectionType): Promise<void>;
    /**
     * Enforces the document protection with the specified credential.
     *
     * @param {string} credential Specify the credential to protect the document.
     *
     * @param {boolean} limitToFormatting True if to limit the document formatting; Otherwise, false.
     *
     * @param {boolean} isReadOnly  True if to allow read-only access to the document; Otherwise, false.
     *
     * @returns {Promise} Returns a Promise which is resolved when protection is enforced, or rejected if for any reason protection cannot be enforced.
     */
    enforceProtectionAsync(credential: string, limitToFormatting: boolean, isReadOnly: boolean): Promise<void>;
    private getCommentHierarchicalIndex;
    private alertBox;
    /**
     * Inserts a reply to a comment.
     *
     * @param {string} id - The unique identifier of the comment to reply to.
     * @param {string} text - The text of the reply.
     * @param {CommentProperties} commentProperties - The properties of the reply (author, isResolved, dateTime).
     * @returns {Comment} Returns the inserted reply comment.
     */
    insertReplyComment(id: string, text: string, commentProperties: CommentProperties): Comment;
    private getCommentInfo;
    /**
     * Inserts the comment.
     *
     * @param {string} text Specify the comment text to be inserted.
     * @returns {void}
     */
    insertComment(text?: string): void;
    /**
     * Inserts a comment with the specified properties.
     *
     * @param {string} text The text of the comment to be inserted.
     * @param {CommentProperties} commentProperties The properties of the comment (author, isResolved, dateTime).
     * @returns {Comment} The inserted comment.
     */
    insertComment(text: string, commentProperties: CommentProperties): Comment;
    /**
     * @private
     */
    parseDateTime(dateTime: string): Date;
    private insertCommentInternal;
    /**
     * @private
     */
    updateCommentElement(commentAdv: CommentElementBox, commentRangeStart: CommentCharacterElementBox, commentRangeEnd: CommentCharacterElementBox, markerData: MarkerInfo): CommentElementBox;
    /**
     * Deletes all the comments in the current document.
     *
     * @returns {void}
     */
    deleteAllComments(): void;
    /**
     * Deletes the specified comment.
     * If the provided id corresponds to a parent comment, the entire comment along with its replies will be deleted.
     * If the provided id corresponds to a single reply comment, only that particular reply will be deleted.
     *
     * @param {string} [id] - The unique identifier of the comment to be deleted. If not provided, the currently selected comment will be deleted.
     * @returns {void}
     */
    deleteComment(id?: string): void;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    deleteCommentInternal(comment: CommentElementBox): void;
    private deleteCommentWidgetInternal;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    deleteCommentWidget(comment: CommentElementBox): void;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    resolveComment(comment: CommentElementBox): void;
    /**
     * @param {CommentElementBox} comment - Specified the comment element box
     * @private
     * @returns {void}
     */
    reopenComment(comment: CommentElementBox): void;
    /**
     * @private
     */
    resolveOrReopenComment(comment: CommentElementBox, resolve: boolean): void;
    /**
     * @param {CommentElementBox} parentComment - Specified the parent comment
     * @param {string} text - Specified the text.
     * @private
     * @returns {void}
     */
    replyComment(parentComment: CommentElementBox, text?: string, mentions?: FieldSettingsModel[], markerData?: MarkerInfo): void;
    private removeInline;
    /**
     * @param {CommentElementBox} commentWidget - Specifies the comment
     * @param {boolean} isNewComment - Specifies is new comment
     * @param {boolean} showComments - Specifies show comments
     * @param {boolean} selectComment - Specified select comment
     * @private
     * @returns {void}
     */
    addCommentWidget(commentWidget: CommentElementBox, isNewComment: boolean, showComments: boolean, selectComment: boolean): void;
    /**
     * @param {CommentElementBox} comment - Specifies comment element box
     * @param {string} hierarchicalIndex - Specifies the hierachical index.
     * @private
     * @returns {void}
     */
    addReplyComment(comment: CommentElementBox, hierarchicalIndex: string): void;
    /**
     * @param {string} password - Specifies the password
     * @param {string} protectionType - Specifies the protection type
     * @param {boolean} isAsync - specifies whether the send method is synchronous or asynchronous
     * @private
     * @returns {void}
     */
    addProtection(password: string, protectionType: ProtectionType, isAsync?: boolean): Promise<void>;
    private protectionFailureHandler;
    private enforceProtectionInternal;
    /**
     * @private
     */
    enforceProtectionAssign(saltValue: string, hashValue: string, protectionType: ProtectionType): void;
    private toggleTrackChangesProtection;
    /**
     * @private
     */
    protectDocument(protectionType: ProtectionType): void;
    /**
     * Stops the document protection.
     *
     * @param {string} password Specify the password to stop protection.
     * @returns {void}
     */
    stopProtection(password: string): void;
    /**
     * Stops the document protection.
     *
     * @param {string} password Specify the password to stop protection.
     * @returns {Promise} Returns a Promise which is resolved when protection is stopped, or rejected if for any reason protection cannot be stopped.
     */
    stopProtectionAsync(password: string): Promise<void>;
    private onUnProtectionSuccess;
    /**
     * @private
     */
    validateHashValue(currentHashValue: string): boolean;
    /**
     * @private
     * @returns {void}
     */
    unProtectDocument(): void;
    /**
     * Notify content change event
     *
     * @private
     * @returns {void}
     */
    fireContentChange(): void;
    /**
     * Update physical location for text position
     *
     * @param {boolean} isSelectionChanged - Specifies the selection change
     * @private
     * @returns {void}
     */
    updateSelectionTextPosition(isSelectionChanged: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    onTextInputInternal: () => void;
    /**
     * Predict text
     *
     * @private
     * @returns {void}
     */
    predictText(): void;
    private getPrefixAndSuffix;
    /**
     * Fired on paste.
     *
     * @param {ClipboardEvent} event - Specfies clipboard event
     * @private
     * @returns {void}
     */
    onPaste: (event: ClipboardEvent) => void;
    /**
     * key action
     * @private
     * @returns {void}
     */
    onKeyDownInternal(event: KeyboardEvent, ctrl: boolean, shift: boolean, alt: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    handleShiftEnter(): void;
    /**
     * Handles back key.
     *
     * @private
     * @returns {void}
     */
    handleBackKey(): void;
    /**
     * Handles delete
     *
     * @private
     * @returns {void}
     */
    handleDelete(): void;
    /**
     * Handles enter key.
     *
     * @private
     * @returns {void}
     */
    handleEnterKey(): void;
    /**
     * Handles Control back key.
     *
     * @private
     * @returns {void}
     */
    handleCtrlBackKey(): void;
    /**
     * Handles Ctrl delete
     *
     * @private
     * @returns {void}
     */
    handleCtrlDelete(): void;
    /**
     * @private
     * @returns {void}
     */
    handleTextInput(text: string): void;
    /**
     * Copies to format.
     * @param {WCharacterFormat} format
     * @private
     * @returns {void}
     */
    copyInsertFormat(format: WCharacterFormat, copy: boolean, widget?: ParagraphWidget): WCharacterFormat;
    /**
     * @private
     */
    getResultContentControlText(element: ContentControl): string;
    insertContentControlPlaceholder(): void;
    /**
     * Inserts a content control.
     *
     * @param {ContentControlType} type - The type of content control to insert.
     * @param {string} [value] - The value for the content control, if applicable.
     * @returns {ContentControlInfo} The inserted content control information.
     *
     * {% codeBlock src='editor-insertContentControl/index.md' %}{% endcodeBlock %}
     */
    insertContentControl(type: ContentControlType, value?: string): ContentControlInfo;
    /**
     * Inserts a content control.
     *
     * @param {ContentControlType} type - The type of content control to insert.
     * @param {boolean} [value] - The boolean value for the content control, if applicable.
     * @returns {ContentControlInfo} The inserted content control information.
     *
     * {% codeBlock src='editor-insertContentControl/index.md' %}{% endcodeBlock %}
     */
    insertContentControl(type: ContentControlType, value?: boolean): ContentControlInfo;
    /**
     * Inserts a content control.
     *
     * @param {ContentControlType} type - The type of content control to insert.
     * @param {string} [value] - The value for the content control, if applicable.
     * @param {string[]} [items] - The items for the content control, applicable if the type is combobox or dropdownlist.
     * @returns {ContentControlInfo} The inserted content control information.
     *
     * {% codeBlock src='editor-insertContentControl/index.md' %}{% endcodeBlock %}
     */
    insertContentControl(type: ContentControlType, value?: string, items?: string[]): ContentControlInfo;
    /**
     * Inserts a content control with the specified content control properties.
     *
     * @param {ContentControlInfo} info - The content control information specifying the properties of the content control to insert
     * @returns {ContentControlInfo} The inserted content control information.
     *
     * {% codeBlock src='editor-insertContentControl/index.md' %}{% endcodeBlock %}
     */
    insertContentControl(info: ContentControlInfo): ContentControlInfo;
    private openContentDialog;
    /**
     * @private
     * @returns {void}
     */
    updatePropertiesToBlock(contentControl: ContentControl, isUpdate?: boolean): void;
    private updateContentControlPosition;
    private applyRichText;
    private isInvalidElementPresent;
    private applyPlainText;
    private applyComboBox;
    private applyDatePickerContentControl;
    private applyCheckBoxContentControl;
    /**
    * Apply the content Control properties to the picture content Control
    * @param {type} refers the type of Content control.
    */
    private applyPictureContentControl;
    /**
      * To get Prefix Mapping for XML Properties.
      * @param {ContentControlType} contentcontroltype.
      * @param {string} xmlString.
      * @private
      * @returns {void}
      */
    getPrefixMapping(xmlString: string): void;
    /**
    * add xml properties to the content control properties
    * @param {ContentControlProperties} properties.
    * @param {string} xPath.
    * @private
    */
    addXmlProperties(properties: ContentControlProperties, xPath: string): void;
    /**
    * To Get XML Store id
    * @returns {string} store item Id.
    */
    private createGuid;
    /**
    * To Get data from xml string and path
    * @param {ContentControlInfo} An object containing the updated details for the content control.
    * @returns {ContentControlInfo} The updated content control information after applying the changes, or `undefined` if no matching content control is found.
    */
    private mapXmlStringPath;
    /**
     * Sets the existing content control within the editor using the provided information.
     * The content control is identified by its unique combination of `title` and `tag`.
     * @param {ContentControlInfo} An object containing the updated details for the content control.
     * @returns {ContentControlInfo|undefined} The updated content control information after applying the changes, or `undefined` if no matching content control is found.
     */
    setContentControlInfo(info: ContentControlInfo): ContentControlInfo;
    /**
    * To get xpath format.
    * @param {string} inputxpath.
    * @returns {string}
    */
    private transformString;
    /**
    * To get Xml Value.
    * @param {string} beforeLastString.
    * @param {string} lastString.
    * @returns {string}
    */
    private getXmlValue;
    /**
    * To convert the object into Array.
    * @param {any} obj.
    * @private
    * @returns {Array}
    */
    objectToArray(obj: {
        [key: string]: any;
    }): {
        index: string;
        data: any;
    }[];
    /**
    * To Parse the XML string into an XMLDocument To Convert the XMLDocument to JSON.
    * @param {string} xmlString.
    * @private
    * @returns {void}
    */
    parseXml(xmlString: string): any;
    /**
    * To Convert the XMLDocument to JSON.
    * @param {Element} xml.
    * @private
    * @returns {any}
    */
    xmlToJson(xml: Element): any;
    /**
    * To set the updated xml json into xml Data for treeview.
    * @param {any} parsedXmlObj.
    * @param {any} parsedXmlArr.
    * @private
    * @returns {void}
    */
    setXmlData(parsedXmlObj: any, parsedXmlArr: any): void;
    /**
     * @private
     * @returns {void}
     */
    dropDownChange(contentControl: ContentControl, value: string): void;
    private updateXmlMappedContentControl;
    private updateCustomXml;
    /**
     * Inserts the specified text at cursor position
     * @param {string} text Specify the text to insert.
     */
    insertText(text: string): void;
    /**
     * @private
     * @returns {void}
     */
    insertTextInternal(text: string, isReplace: boolean, revisionType?: RevisionType, allowLayout?: boolean, isSplitRevision?: boolean): void;
    private extendSelectionToBookmarkStart;
    private updateElementInFieldRevision;
    /**
     * Retrieves the resultant field text from the specified field element box.
     * @param item Specify the field element box to retrieve field text.
     * @returns Returns the resultant field text.
     */
    retrieveFieldResultantText(item: FieldElementBox): string;
    private checkToCombineRevisionsinBlocks;
    private checkToMapRevisionWithNextNode;
    private checkToMapRevisionWithPreviousNode;
    private checkToMapRevisionWithInlineText;
    private combineElementRevisions;
    private applyMatchedRevisionInorder;
    private copyElementRevision;
    private mapMatchedRevisions;
    private isRevisionAlreadyIn;
    private getMatchedRevisionsToCombine;
    private decideInlineForTrackChanges;
    /**
     * @private
     * @returns {void}
     */
    insertIMEText(text: string, isUpdate: boolean): void;
    /**
      * Inserts the section break at cursor position with specified section break type.
      *
      * @param {SectionBreakType} sectionBreakType Specifies the section break type.
      * > If this parameter is not set, it inserts the section break of type new page.
      * @returns {void}
      */
    insertSectionBreak(sectionBreakType?: SectionBreakType, sectionFormat?: WSectionFormat): void;
    private combineRevisionWithBlocks;
    private checkToCombineRevisionWithNextPara;
    private checkToCombineRevisionWithPrevPara;
    private combineRevisionWithNextPara;
    private combineRevisionWithPrevPara;
    /**
     * Removes the specified revision from the document.
     *
     * @param revisionToRemove Specify the revision to be removed.
     * @returns {void}
     */
    removeRevision(revisionToRemove: Revision): any;
    /**
     * Clears the specified revision from the document.
     *
     * @param revision Specify the revision to clear from the document.
     * @returns {void}
     */
    clearElementRevision(revision: Revision): void;
    /**
     * @private
     * @returns {void}
     */
    insertRevision(item: any, type: RevisionType, author?: string, date?: string, spittedRange?: object[], skip?: boolean, parseRevisionId?: string): Revision;
    private insertRevisionForFootnoteWidget;
    /**
     * Method help to clear previous revisions and include new revision at specified index
     *
     * @param range - range of elements to be cleared
     * @param revision - revision to be inserted
     * @param index - index at which to be included in the revision range
     * @returns {void}
     */
    private clearAndUpdateRevisons;
    private splitRevisionByElement;
    /**
     * Method to update revision for the splitted text element
     * @param inline - Original text element
     * @param splittedSpan - Splitted element
     */
    private updateRevisionForSpittedTextElement;
    /**
     * @private
     */
    getRevision(revisionId: string): Revision;
    private isRevisionMatched;
    private compareElementRevision;
    private canInsertRevision;
    private insertRevisionAtEnd;
    private insertRevisionAtPosition;
    private insertRevisionAtBegining;
    private splitRevisionForSpittedElement;
    /**
     * Method to combine element revision if not inserts new revision
     */
    /**
     * @private
     * @returns {void}
     */
    combineElementRevisionToPrevNxt(newElement: ElementBox): void;
    private combineElementRevision;
    /**
     * @private
     * @returns {void}
     */
    removeMarkerInfoRevision(revisionID: string, markerInfo: MarkerInfo[]): void;
    private combineRevisions;
    /**
     * Method to update the revision for whole block
     *
     * @private
     * @returns {void}
     */
    insertRevisionForBlock(widget: ParagraphWidget, revisionType: RevisionType, isTOC?: boolean, revision?: Revision, skipReLayout?: boolean, isRemoveInline?: boolean, isAssOrder?: boolean): boolean;
    /**
    * @private
    */
    getLastParaForBodywidgetCollection(widget: ParagraphWidget): IWidget;
    private updatePasteRevision;
    private updateRevisionCollection;
    /**
     * @private
     * @returns {BodyWidget}
     */
    insertSection(selection: Selection, selectFirstBlock: boolean, isUndoing?: boolean, sectionBreakContinuous?: boolean, sectionBreakNewPage?: boolean, sectionFormat?: WSectionFormat): BlockWidget;
    /**
     * @private
     */
    splitBodyWidget(bodyWidget: BodyWidget, sectionFormat: WSectionFormat, startBlock: BlockWidget, sectionBreakContinuous?: boolean, sectionBreakNewPage?: boolean): BodyWidget;
    private insertRemoveHeaderFooter;
    private updateBlockIndex;
    /**
     * @private
     * @returns {void}
     */
    updateSectionIndex(sectionFormat: WSectionFormat, startBodyWidget: BodyWidget, increaseIndex: boolean): void;
    /**
    * @private
    * @returns {void}
    */
    updateColumnIndex(startBodyWidget: BodyWidget, increaseIndex: boolean): void;
    private checkAndConvertList;
    private checkNextLevelAutoList;
    private isConvertList;
    private getNumber;
    private getListLevelPattern;
    private autoConvertList;
    private checkNumberFormat;
    private checkLeadingZero;
    private getPageFromBlockWidget;
    /**
     * @private
     * @returns {void}
     */
    insertTextInline(element: ElementBox, selection: Selection, text: string, index: number, skipReLayout?: boolean): void;
    private insertFieldBeginText;
    private insertBookMarkText;
    private insertFieldSeparatorText;
    private insertFieldEndText;
    private insertImageText;
    /**
     * @private
     */
    private isListTextSelected;
    private checkAndConvertToHyperlink;
    private autoFormatHyperlink;
    private appylingHyperlinkFormat;
    private createHyperlinkElement;
    private insertHyperlinkfield;
    /**
     * @private
     */
    unlinkRangeFromRevision(inline: any, removeCollection?: boolean): void;
    /**
     * @private
     */
    constructRevisionnsForLink(inline: any, isRemove: boolean): void;
    /**
     * @private
     */
    unlinkWholeRangeInRevision(item: any, revision: Revision): void;
    /**
     * @private
     * @returns {void}
     */
    unLinkFieldCharacter(inline: ElementBox): void;
    private getCharacterFormat;
    /**
     * Inserts the Hyperlink.
     *
     * @param {string} address Specify the Hyperlink URL to be inserted.
     * @param {string} displayText Specify the display text for the hyperlink
     * @param {string} screenTip Specify the screen tip text.
     * @returns {void}
     */
    insertHyperlink(address: string, displayText?: string, screenTip?: string): void;
    /**
     * @private
     */
    insertHyperlinkInternal(url: string, displayText: string, remove: boolean, isBookmark?: boolean): void;
    private insertHyperlinkInternalInternal;
    private insertHyperlinkByFormat;
    /**
     * @private
     */
    initInsertInline(element: ElementBox, insertHyperlink?: boolean, isInsertRemovedBookamrk?: boolean): void;
    private insertElementInCurrentLine;
    /**
     * Edit Hyperlink
     * @param {Selection} selection - Specified the selection
     * @param {string} url - Specifies the url
     * @param {string} displayText - Specified the display test
     * @param {boolean} isBookmark - Specifies is bookmark
     * @private
     * @returns {boolean} - Return tru of hyperlink is edited.
     */
    editHyperlink(selection: Selection, url: string, displayText: string, isBookmark?: boolean): boolean;
    private insertClonedFieldResult;
    private getClonedFieldResultWithSel;
    private getClonedFieldResult;
    /**
    * Removes the content control if selection is in content control
    * @returns {void}
    * @private
    */
    removeContentControl(): void;
    /**
     * Removes the content control if selection is in content control
     * @returns {void}
     * @private
     */
    removeContentControlInternal(contentControl?: ContentControl): void;
    /**
     * Removes the hyperlink if selection is within hyperlink.
     *
     * @returns {void}
     */
    removeHyperlink(): void;
    /**
     * @private
     */
    updateHyperlinkFormat(selection: Selection): void;
    /**
     * Paste copied clipboard content on Paste event
     * @param {ClipboardEvent} event - Specifies the paste event
     * @param {any} pasteWindow - Specifies the paste window
     * @private
     */
    pasteInternal(event: ClipboardEvent, pasteWindow?: any): void;
    private pasteImage;
    /**
     * @private
     * @returns {void}
     */
    onPasteImage(data: string): void;
    private pasteAjax;
    /**
     * @private
     * @returns {void}
     */
    pasteFormattedContent(result: any): void;
    private onPasteFailure;
    /**
     * Pastes the provided content into the editor.
     *
     * @param {string} [sfdt] - The content to be pasted, in string format.
     * @param {TablePasteOptions} [tablePasteOption] - The option specifying how the content should be pasted into a table.
     *
     * @returns {void}
     */
    paste(sfdt: string, tablePasteOption: TablePasteOptions): void;
    /**
     * Pastes the provided sfdt content or the data present in local clipboard if any.
     *
     * @param {string} sfdt Specifies the sfdt content to paste at current position.
     * @param {PasteOptions} defaultPasteOption Specifies the paste options.
     * @returns {void}
     */
    paste(sfdt?: string, defaultPasteOption?: PasteOptions): void;
    /**
     * @private
     */
    getUniqueListOrAbstractListId(isList: boolean): number;
    private getBlocksToUpdate;
    private updateListIdForBlocks;
    private isNsIdMatchWithExistingAbstractList;
    private updatePasteContent;
    private getPreviousParagraphListFormat;
    /**
     * @private
     */
    getBlocks(pasteContent: any, isPaste: boolean, sections?: BodyWidget[], comments?: CommentElementBox[], revision?: Revision[], isContextBasedPaste?: boolean): BodyWidget[];
    private applyMergeFormat;
    private applyParaFormatInternal;
    private applyFormatInternal;
    /**
     * @private
     */
    applyPasteOptions(options: PasteOptions | TablePasteOptions, isPasteOptionTextOnly?: boolean): void;
    /**
     * @private
     */
    applyTablePasteOptions(options: TablePasteOptions): void;
    /**
     * @private
     * @returns {void}
     */
    pasteContents(content: any, currentFormat?: WParagraphFormat, pasteOptions?: PasteOptions | TablePasteOptions): void;
    private pasteContentsInternal;
    private defaultPaste;
    private pasteAsNewColumn;
    private pasteAsNestedTable;
    private pasteOverwriteCell;
    private pasteAsNewRow;
    private tableUpdate;
    private rowspannedCollection;
    private insertSpannedCells;
    private addRows;
    private pasteContent;
    private pasteCopiedData;
    private arrangeEndnoteCollection;
    private arrangeFootnoteCollection;
    private generateTableRevision;
    private isSectionEmpty;
    /**
     * Insert table on undo
     *
     * @param {TableWidget} table - Specifies the table
     * @param {TableWidget} newTable - Speciefies the new table
     * @param {boolean} moveRows - Specifies the new row
     * @private
     * @private {void}
     */
    insertTableInternal(table: TableWidget, newTable: TableWidget, moveRows: boolean, skipRemoving?: boolean): void;
    private removeRevisionFromTable;
    private canConstructRevision;
    private constructRevisionsForTable;
    private deleteRevision;
    private constructRevisionForFootnote;
    private constructRevisionsForBlock;
    /**
     * @private
     * @param paraWidget
     * @param startoffset
     * @param endoffset
     * @param revisionId
     * @param isParaMarkIncluded
     * @returns {void}
     */
    applyRevisionForCurrentPara(paraWidget: ParagraphWidget, startoffset: number, endoffset: number, revisionId: string, isParaMarkIncluded: boolean): void;
    /**
     * Insert table on undo
     *
     * @param {Selection} selection - Specified the selection
     * @param {WBlock} block - Spcifies the block
     * @param {WTable} table - Specifies the table.
     * @private
     * @returns {void}
     */
    insertBlockTable(selection: Selection, block: BlockWidget, table: TableWidget): void;
    /**
     * On cut handle selected content remove and relayout
     *
     * @param {Selection} selection - Specified the selection
     * @private
     * @returns {void}
     */
    handleCut(selection: Selection): void;
    private insertInlineInternal;
    private insertElement;
    private updateRevisionForElement;
    private insertElementInternal;
    private incrementCommentIndex;
    /**
     * @private
     * @returns {void}
     */
    constructRevisionFromID(insertElement: any, isEnd: boolean, skipUpdate?: boolean, prevElement?: ElementBox, index?: number): void;
    /**
     * Insert block on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {WBlock} block - Specifes the block
     * @private
     * @returns {void}
     */
    insertBlock(block: BlockWidget, isSelectionInsideTable?: boolean): void;
    private insertBlockInternal;
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     *
     * @deprecated
     *
     * @param {string} imageString  Base64 string, web URL or file URL.
     * @param {number} width Specify the image width.
     * @param {number} height Specify the image height.
     * @param {string} alternateText Specify the image alternateText.
     * @returns {void}
     */
    insertImage(imageString: string, width?: number, height?: number, alternateText?: string): void;
    /**
     * Inserts an image with a specified size at the cursor position in the DocumentEditor component.
     *
     * @param {string} imageString - The Base64 string, web URL, or file URL of the image to be inserted.
     * @param {number} width - The width of the image. Optional parameter, if not specified, the original width of the image will be used.
     * @param {number} height - The height of the image. Optional parameter, if not specified, the original height of the image will be used.
     * @param {string} alternateText - The alternate text of the image. Optional parameter, if specified, this text will be displayed when the image is not available or when images are disabled in the document.
     * @returns {Promise<void>} - A Promise that is resolved when the image has been inserted successfully, or rejected if the image could not be inserted for any reason.
     */
    insertImageAsync(imageString: string, width?: number, height?: number, alternateText?: string): Promise<void>;
    /**
     * Inserts the image with specified size at cursor position in the document editor.
     *
     * @private
     * @param {string} imageString Base64 string, web URL or file URL.
     * @param {boolean} isUiInteracted Is image instered from UI interaction.
     * @param {number} width? Image width
     * @param {number} height? Image height
     * @param {string} alternateText? Image alternateText
     * @returns {void}
     */
    insertImageInternal(imageString: string, isUiInteracted: boolean, width?: number, height?: number, alternateText?: string): Promise<void>;
    /**
     * Inserts a table of specified size at cursor position in the document editor.
     *
     * @param {number} rows Default value of ‘rows’ parameter is 1.
     * @param {number} columns Default value of ‘columns’ parameter is 1.
     * @returns {void}
     */
    insertTable(rows?: number, columns?: number): void;
    /**
     * Inserts the specified number of rows to the table above or below to the row at cursor position.
     *
     * @param {boolean} above The above parameter is optional and if omitted,
     * it takes the value as false and inserts below the row at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     * @returns {void}
     */
    insertRow(above?: boolean, count?: number): void;
    private rowInsertion;
    /**
     * Fits the table based on AutoFitType.
     *
     * @param {AutoFitType} fitType Specify the auto fit type.
     * @returns {void}
     */
    autoFitTable(fitType: AutoFitType): void;
    /**
     *
     * @private
     * @returns {void}
     */
    insertAutoFitTable(fitType: AutoFitType, tableAdv?: TableWidget): void;
    /**
     * Inserting the row for collaborative editing.
     * @private
     * @returns {void}
     */
    rowInsertionForCE(index: number, cellCount: number, insertrow: number, table: TableWidget, rowData: any, cellData: any[], paragraphData: any[], characterData: any[]): void;
    private updateCellFormatForInsertedRow;
    private updateRowspan;
    private getInsertedTable;
    private insertTableRows;
    /**
     * Inserts the specified number of columns to the table left or right to the column at cursor position.
     *
     * @param {number} left The left parameter is optional and if omitted, it takes the value as false and
     * inserts to the right of column at cursor position.
     * @param {number} count The count parameter is optional and if omitted, it takes the value as 1.
     * @returns {void}
     */
    insertColumn(left?: boolean, count?: number): void;
    /**
     * Inserting the cell for collaborative editing.
     * @private
     * @returns {void}
     */
    cellInsertionForCE(index: number, row: TableRowWidget, cellData: any, paragraphData: any, characterData: any): void;
    private copyCellFormats;
    private copyContent;
    private tableReLayout;
    /**
     * Creates table with specified rows and columns.
     * @private
     *
     * @returns {TableWidget}
     */
    createTable(rows: number, columns: number): TableWidget;
    private createRowAndColumn;
    private createColumn;
    private getColumnCountToInsert;
    private getRowCountToInsert;
    /**
     * @private
     */
    getOwnerCell(isStart: boolean): TableCellWidget;
    private getOwnerRow;
    private getOwnerTable;
    /**
     * Merge Selected cells
     *
     * @private
     * @returns {void}
     */
    mergeSelectedCellsInTable(): void;
    private confirmCellMerge;
    private mergeSelectedCells;
    private mergeBorders;
    private updateBlockIndexAfterMerge;
    /**
     * Determines whether the merge cell operation can be done.
     *
     * @returns {boolean} Returns true if to merge cells; Otherwise, false.
     */
    canMergeCells(): boolean;
    private canMergeSelectedCellsInTable;
    private checkCellWidth;
    private checkCellWithInSelection;
    private checkPrevOrNextCellIsWithinSel;
    private checkCurrentCell;
    private checkRowSpannedCells;
    /**
     * @private
     * @returns {void}
     */
    insertNewParagraphWidget(newParagraph: ParagraphWidget, insertAfter: boolean): void;
    private insertParagraph;
    private updateCharacterFormatRevision;
    private moveInlines;
    private moveContent;
    private updateRevisionForMovedContent;
    /**
     * update complex changes when history is not preserved
     *
     * @param {number} action - Specifies the action
     * @param {string} start - Specifies the selection start
     * @param {string} end - Specified the selection end
     * @private
     * @returns {void}
     */
    updateComplexWithoutHistory(action?: number, start?: string, end?: string): void;
    /**
     * Re-layout content.
     *
     * @param {Selection} selection - Specifies the selection
     * @param isSelectionChanged - Specifies the selection changed
     * @private
     * @returns {void}
     */
    reLayout(selection: Selection, isSelectionChanged?: boolean, isLayoutChanged?: boolean): void;
    private shiftFootnoteContent;
    /**
     * @private
     * @returns {void}
     */
    updateHeaderFooterWidget(headerFooterWidget?: HeaderFooterWidget): void;
    private updateHeaderFooterWidgetToPage;
    private updateHeaderFooterWidgetToPageInternal;
    /**
     * @private
     * @returns {void}
     */
    removeFieldInWidget(widget: Widget, isBookmark?: boolean, isContentControl?: boolean, isEditRange?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    removeFieldInBlock(block: BlockWidget, isBookmark?: boolean, isContentControl?: boolean, isEditRange?: boolean): void;
    private removeFieldTable;
    private shiftFootnotePageContent;
    /**
     * @private
     * @returns {void}
     */
    shiftPageContent(type: HeaderFooterType, sectionFormat: WSectionFormat): void;
    private checkAndShiftFromBottom;
    private allowFormattingInFormFields;
    /**
     * @private
     * @returns {void}
     */
    insertContentControlInCollection(element: ContentControl): void;
    /**
     * @private
     * @returns {ContentControl}
     */
    getContentControl(): ContentControl;
    /**
     * @private
     * @returns {ContentControl[]}
     */
    getContentControls(): ContentControl[];
    private pushContentControlByOrder;
    private checkPlainTextContentControl;
    /**
     * Applies character format for selection.
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Spcifies the update
     * @private
     * @returns {void}
     */
    onApplyCharacterFormat(property: string, value: Object, update?: boolean, applyStyle?: boolean): void;
    private applyCharacterFormatForListText;
    private applyListCharacterFormatByValue;
    /**
     * @private
     * @returns {void}
     */
    updateListCharacterFormat(selection: Selection, property: string, value: Object): void;
    private updateListTextSelRange;
    /**
     * @private
     * @returns {void}
     */
    updateInsertPosition(): void;
    /**
     * Preserve paragraph and offset value for selection
     *
     * @private
     * @returns {void}
     */
    setOffsetValue(selection: Selection): void;
    /**
     * Toggles the highlight color property of selected contents.
     *
     * @param {HighlightColor} highlightColor Specify the highlight color to be applied (default: Yellow).
     * @returns {void}
     */
    toggleHighlightColor(highlightColor?: HighlightColor): void;
    /**
     * Toggles the subscript formatting of selected contents.
     *
     * @returns {void}
     */
    toggleSubscript(): void;
    /**
     * Toggles the superscript formatting of selected contents.
     *
     * @returns {void}
     */
    toggleSuperscript(): void;
    /**
     * Increases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @returns {void}
     */
    increaseIndent(): void;
    /**
     * Decreases the left indent of selected paragraphs to a factor of 36 points.
     *
     * @returns {void}
     */
    decreaseIndent(): void;
    /**
     * Clears the list format for selected paragraphs.
     *
     * @returns {void}
     */
    clearList(): void;
    /**
     * Applies the bullet list to selected paragraphs.
     *
     * @param {string} bullet Specify the bullet character to be applied.
     * @param {string} fontFamily Specify the bullet font family name.
     * @returns {void}
     */
    applyBullet(bullet: string, fontFamily: string): void;
    /**
     * Applies the numbering list to selected paragraphs.
     *
     * @param {string} numberFormat  “%n” representations in ‘numberFormat’ parameter will be replaced by respective list level’s value.
     * `“%1)” will be displayed as “1)” `
     * @param {ListLevelPattern} listLevelPattern  Default value of ‘listLevelPattern’ parameter is ListLevelPattern.Arabic
     * @returns {void}
     */
    applyNumbering(numberFormat: string, listLevelPattern?: ListLevelPattern): void;
    /**
     * Toggles the baseline alignment property of selected contents.
     *
     * @param {BaselineAlignment} baseAlignment Specifies the baseline alignment.
     * @returns {void}
     */
    toggleBaselineAlignment(baseAlignment: BaselineAlignment): void;
    private clearFormattingInternal;
    /**
     * Clears the formatting.
     *
     * @returns {void}
     */
    clearFormatting(): void;
    private updateProperty;
    private getCompleteStyles;
    /**
     * Initialize default styles
     *
     * @private
     * @returns {void}
     */
    intializeDefaultStyles(): void;
    /**
     * Creates a new style or modifies an existing style with the specified style properties.
     *
     * > If modifyExistingStyle parameter is set to true and a style already exists with same name, it modifies the specified properties in the existing style.
     * > If modifyExistingStyle parameter is set to false and a style already exists with same name, it creates a new style with unique name by appending ‘_1’. Hence, the newly style will not have the specified name.
     * > If no style exists with same name, it creates a new style.
     *
     * @param {string} styleString The style properties.
     * @param {boolean} modifyExistingStyle The Boolean value denotes whether to modify the properties in the existing style or create a new style.
     *
     * @returns {string} Returns the name of the created style.
     */
    createStyle(styleString: string, modifyExistingStyle?: boolean): string;
    /**
     * @private
     * Adds a new style to the document or updates an existing style.
     *
     * @param {string} styleString - The style to be added or updated.
     * @param {boolean} modifyExistingStyle - Whether to modify an existing style.
     * @returns {Object} - The style that was added or updated.
     */
    createStyleIn(styleString: string, modifyExistingStyle: boolean): Object;
    /**
     * Modify the Style
     * @private
     * @returns {void}
     */
    private setStyle;
    private getStyle;
    private getUniqueStyleName;
    private getUniqueName;
    /**
     * Update Character format for selection
     * @private
     */
    updateSelectionCharacterFormatting(property: string, values: Object, update: boolean): void;
    private updateCharacterFormat;
    private updateCharacterFormatWithUpdate;
    private applyCharFormatSelectedContent;
    private applyCharFormatForSelectedPara;
    private splittedLastParagraph;
    private getNextParagraphForCharacterFormatting;
    private applyCharFormat;
    /**
     * Toggles the bold property of selected contents.
     *
     * @returns {void}
     */
    toggleBold(): void;
    /**
     * Toggles the bold property of selected contents.
     *
     * @returns {void}
     */
    toggleItalic(): void;
    /**
     * Change the selected text to uppercase.
     * @private
     */
    changeCase(property: string): void;
    /**
     * Change the selected text case.
     * @private
     */
    changeSelectedTextCase(selection: Selection, startPosition: TextPosition, endPosition: TextPosition, property: string, removedTextNodes?: IWidget[]): void;
    private changeTextCase;
    private changeCaseParagraph;
    private changeCaseInline;
    private addRemovedTextNodes;
    private changeCaseInlineInternal;
    private changeCaseNextBlock;
    private getNextBlockForChangeCase;
    private getChangeCaseText;
    private capitalizeFirst;
    private sentencecase;
    private togglecase;
    private changeCaseForTable;
    private changeCaseForSelectedCell;
    private changeCaseForSelectedPara;
    private changeCaseForSelTable;
    private changeCaseParaFormatInCell;
    private changeCaseParaForTableCell;
    private changeCaseParaForCellInternal;
    private changeCaseParaFormatTableInternal;
    private changeCaseParaForRow;
    /**
     * Toggles the all Caps formatting for the selected content.
     *
     * @returns {void}
     */
    toggleAllCaps(): void;
    toggleChangeCase(): string;
    private getCurrentSelectionValue;
    private getSelectedCharacterFormat;
    /**
     * Toggles the underline property of selected contents.
     *
     * @param underline Specify the underline to be toggled (default: Single).
     * @returns {void}
     */
    toggleUnderline(underline?: Underline): void;
    /**
     * Toggles the strike through property of selected contents.
     *
     * @param {Strikethrough} strikethrough Specify the strike through to be toggled (default: SingleStrike).
     * @returns {void}
     */
    toggleStrikethrough(strikethrough?: Strikethrough): void;
    private updateFontSize;
    private applyCharFormatInline;
    private formatInline;
    private updateRevisionForFormattedContent;
    private applyCharFormatCell;
    private applyCharFormatForSelectedCell;
    private applyCharFormatRow;
    private applyCharFormatForTable;
    private applyCharFormatForSelTable;
    private applyCharFormatForTableCell;
    /**
     * private
     * @returns {CellInfo}
     */
    updateSelectedCellsInTable(start: number, end: number, endCellLeft: number, endCellRight: number): CellInfo;
    private getCharacterFormatValueOfCell;
    /**
     * Apply Character format for selection
     *
     * @private
     * @returns {void}
     */
    applyCharFormatValueInternal(selection: Selection, format: WCharacterFormat, property: string, value: Object): void;
    private copyInlineCharacterFormat;
    private applyCharFormatValue;
    private isRTLFormat;
    /**
     * @private
     */
    updateStyleObject(styleData: Object): void;
    /**
     * @private
     * @returns {void}
     */
    onImageFormat(elementBox: ImageElementBox, width: number, height: number, alternateText: string): void;
    /**
     * Toggles the text alignment of selected paragraphs.
     *
     * @param {TextAlignment} textAlignment Specifies the text alignment.
     * @returns {void}
     */
    toggleTextAlignment(textAlignment: TextAlignment): void;
    /**
     * @private
     */
    setPreviousBlockToLayout(): void;
    /**
     * Apply borders for selected paragraph borders
     * @private
     */
    applyParagraphBorders(property: string, bordersType: string, value: Object): void;
    /**
     * @private
     */
    applyRulerMarkerValues(type: string, initialValue: number, finalValue: number): void;
    /**
     * Applies paragraph format for the selection ranges.
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @param {boolean} isSelectionChanged - Specifies the selection change.
     * @private
     * @returns {void}
     */
    onApplyParagraphFormat(property: string, value: Object, update: boolean, isSelectionChanged: boolean, isSkipPositionCheck?: boolean): void;
    /**
     * Updates the indent value in the ListLevel
     * @param {Object} value - Specifies the value
     * @param {ParagraphWidget} currentPara - Specifies the selected paragraph
     * @private
     * @returns {void}
     */
    updateListLevelIndent(value: Object, currentPara: ParagraphWidget): void;
    /**
     * To check the current selection is first paragraph for list
     * @param {Selection} selection - Specifies the selection
     * @param {ParagraphWidget} currentPara - Specifies the current paragraph
     * @private
     * @returns {boolean}
     */
    isFirstParaForList(selection: Selection, currentPara: ParagraphWidget): boolean;
    /**
     * Update the list level
     *
     * @param {boolean} increaseLevel - Specifies the increase level
     * @private
     * @returns {void}
     */
    updateListLevel(increaseLevel: boolean): void;
    /**
     * Applies list
     *
     * @param {WList} list - Specified the list
     * @param {number} listLevelNumber - Specified the list level number
     * @private
     * @returns {void}
     */
    onApplyListInternal(list: WList, listLevelNumber: number): void;
    /**
     * Apply paragraph format to selection range
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    updateSelectionParagraphFormatting(property: string, value: Object, update: boolean): void;
    private getIndentIncrementValue;
    private getIndentIncrementValueInternal;
    private updateParagraphFormatInternal;
    /**
     * Update paragraph format on undo
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    updateParagraphFormat(property: string, value: Object, update: boolean): void;
    private applyParaFormatSelectedContent;
    /**
     * Apply Paragraph format
     *
     * @param {ParagraphWidget} paragraph - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @param {boolean} update - Specifies the update
     * @private
     * @returns {void}
     */
    applyParaFormatProperty(paragraph: ParagraphWidget, property: string, value: Object, update: boolean): void;
    private copyParagraphFormat;
    /**
     * Copies list level paragraph format
     *
     * @param {WParagraphFormat} oldFormat - Specifies the old format
     * @param {WParagraphFormat} newFormat - Specifies the new format
     * @private
     * @returns {void}
     */
    copyFromListLevelParagraphFormat(oldFormat: WParagraphFormat, newFormat: WParagraphFormat): void;
    /**
     * Applies the continue numbering from the previous list.
     *
     * @returns {void}
     */
    applyContinueNumbering(): void;
    /**
     * Continues the numbering sequence of the current list from the selected paragraph.
     *
     * @returns {void}
     */
    continueNumbering(): void;
    /**
     * @private
     * @param selection
     * @param paraFormat
     */
    applyContinueNumberingInternal(selection: Selection, paraFormat?: WParagraphFormat): void;
    private getContinueNumberingInfo;
    /**
     * @private
     * @returns {void}
     */
    revertContinueNumbering(selection: Selection, format: WParagraphFormat): void;
    private changeListId;
    private getParagraphFormat;
    private checkNumberArabic;
    /**
     * Restarts the numbering of the current list from the selected paragraph.
     */
    restartNumbering(): void;
    /**
     * @private
     * @returns {void}
     */
    applyRestartNumbering(selection: Selection): void;
    /**
     * @private
     * @returns {void}
     */
    restartListAt(selection: Selection): void;
    /**
     * @private
     * @returns {void}
     */
    restartListAtInternal(selection: Selection, listId: number, nsid?: number): void;
    private changeRestartNumbering;
    private applyParaFormat;
    private applyCharacterStyle;
    private applyParaFormatInCell;
    private applyParaFormatCellInternal;
    private getParaFormatValueInCell;
    private applyParagraphFormatRow;
    private applyParaFormatTableCell;
    private applyParaFormatTable;
    private getNextParagraphForFormatting;
    private applyParagraphFormatTableInternal;
    /**
     * Apply column format changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyColumnFormat(property: string, value: Object): void;
    /**
     * Apply section format selection changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplySectionFormat(property: string, value: Object): void;
    /**
     *
     * @private
     * @returns {void}
     */
    removeInlineHeaderFooterWidget(sectionIndex: number, headerFooterType: HeaderFooterType, propertyName: string, value: Object): void;
    /**
     *
     * @private
     * @returns {void}
     */
    updateHeaderFooters(propertyName: string, value: boolean, sectionIndex: number, widget: HeaderFooterWidget): void;
    /**
     * Update section format
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateSectionFormat(property: string, value: Object): void;
    private getFirstChildOfTable;
    /**
     * Apply table format property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyTableFormat(property: string, value: Object, table?: TableWidget): void;
    private getTableFormatAction;
    /**
     * Apply table row format property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyTableRowFormat(property: string, value: Object): void;
    private getRowAction;
    /**
     * Apply table cell property changes
     *
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    onApplyTableCellFormat(property: string, value: Object): void;
    private getTableCellAction;
    private applyPropertyValueForSection;
    /**
     * @private
     * @returns {void}
     */
    layoutWholeDocument(isLayoutChanged?: boolean, skipClearContent?: boolean): void;
    private combineSection;
    private combineFollowingSection;
    private combineSectionChild;
    private updateSelectionTableFormat;
    /**
     * Update Table Format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateTableFormat(selection: Selection, property: string, value: object): void;
    /**
     * update cell format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateCellFormat(selection: Selection, property: string, value: Object): void;
    /**
     * Update row format on undo
     *
     * @param {Selection} selection - Specifies the selection
     * @param {string} property - Specifies the property
     * @param {Object} value - Specifies the value
     * @private
     * @returns {void}
     */
    updateRowFormat(selection: Selection, property: string, value: Object): void;
    private initHistoryPosition;
    private startSelectionReLayouting;
    private reLayoutSelectionOfTable;
    private reLayoutSelection;
    private reLayoutSelectionOfBlock;
    /**
     * @private
     * @returns {void}
     */
    layoutItemBlock(block: BlockWidget, shiftNextWidget: boolean): void;
    /**
     * @private
     * @returns {boolean}
     */
    removeSelectedContents(selection: Selection): boolean;
    private removeSelectedContentInternal;
    private checkMultipleSectionSelected;
    private getBodyWidgetIndex;
    private removeSelectedContent;
    private deleteSelectedContent;
    /**
     * Merges the selected cells.
     *
     * @returns {void}
     */
    mergeCells(): void;
    /**
     * Deletes the entire table at selection.
     *
     * @returns {void}
     */
    deleteTable(): void;
    /**
     * Deletes the selected column(s).
     *
     * @returns {void}
     */
    deleteColumn(): void;
    private onDeleteColumnConfirmed;
    /**
     * Delete the column for collaborative editing.
     * @private
     * @returns {void}
     */
    onDeleteColumn(table: TableWidget, deleteCells: TableCellWidget[]): number;
    /**
     * Deletes the selected row(s).
     *
     * @returns {void}
     */
    deleteRow(): void;
    /**
     * @private
     */
    trackRowDeletion(row: TableRowWidget, canremoveRow?: boolean, updateHistory?: boolean, editAction?: number): boolean;
    private trackInnerTable;
    private returnDeleteRevision;
    private removeRow;
    /**
     * @private
     * @param {TableWidget} table Specifies the table widget
     * @returns {void}
     */
    updateTable(table: TableWidget, skipCombine?: boolean): void;
    /**
     * @private
     * @param {TableWidget} table Specifies the table widget
     * @returns { ParagraphWidget }
     */
    getParagraphForSelection(table: TableWidget): ParagraphWidget;
    private deletePara;
    private deletaRevisionIDs;
    private deleteSection;
    /**
     *
     * @private
     */
    combineSectionInternal(selection: Selection, section: BodyWidget, nextSection: BodyWidget): void;
    private checkAndInsertBlock;
    private splitParagraph;
    private removeCommentsInBlock;
    private removeCommentInPara;
    private removeCommentsInline;
    /**
     * @private
     * @returns {void}
     */
    removeBlock(block: BlockWidget, isSkipShifting?: boolean, skipElementRemoval?: boolean, isSelectionInsideTable?: boolean): void;
    private checkAndRemoveRevisionFromBlock;
    private removePrevParaMarkRevision;
    private isPasteRevertAction;
    private toCheckForTrack;
    /**
     * @private
     */
    removeFootnote(element: FootnoteElementBox, paragraph?: ParagraphWidget): void;
    /**
     * @private
     */
    removeEndnote(element: FootnoteElementBox, paragraph?: ParagraphWidget): void;
    private removeAutoShape;
    /**
     * @private
     * @returns {void}
     */
    removeField(block: BlockWidget, isBookmark?: boolean, isContentControl?: boolean, isEditRange?: boolean): void;
    /**
     * @private
     */
    getTabsInSelection(): WTabStop[];
    /**
     * @private
     */
    updateTabStopCollection(paragraph: ParagraphWidget, newCollection: WTabStop[], isReplace?: boolean): void;
    private modifyTabStop;
    /**
     * @private
     */
    removeTabStops(paragraphs: ParagraphWidget[], tabs: WTabStop[]): void;
    /**
     * @private
     */
    addTabStopToCollection(collection: WTabStop[], tab: WTabStop, isReturnIndex?: boolean): number;
    /**
     * @private
     * @param {IWidget} node Specifies the node.
     * @returns {void}
     */
    addRemovedNodes(node: IWidget, isInsertBefore?: boolean): void;
    private deleteBlock;
    private deleteTableCell;
    private deleteCellsInTable;
    /**
     * @private
     */
    removeDeletedCellRevision(row: TableRowWidget, isRowSelected?: boolean): any;
    /**
     * @private
     */
    removeDeletedShapeRevision(shape: ShapeElementBox): any;
    /**
     * Public API for inserting shape.
     *
     * @private
     * @returns {ShapeElementBox} - Returns selection start position.
     */
    insertShape(shapeType: AutoShapeType, shapeProperties?: ShapeProperties): void;
    /**
     * Returns the shape object of the user choice.
     *
     * @private
     * @returns {ShapeElementBox} - Returns selection start position.
     */
    private getShape;
    private trackDeletedContentInTableCell;
    private onConfirmedTableCellsDeletion;
    private onConfirmedCellDeletion;
    private removeRevisionForRow;
    private removeRevisionsInRow;
    /**
     * @private
     */
    removeRevisionForCell(cellWidget: TableCellWidget, removeCollection: boolean): any;
    private removeRevisionForInnerTable;
    /**
     * @private
     */
    removeRevisionForBlock(paraWidget: ParagraphWidget, revision: Revision, skipParaMark: boolean, addToRevisionInfo: boolean): any;
    private unlinkRangeByRevision;
    private isWholeRowSelected;
    private deleteCell;
    private paragrapghBookmarkCollection;
    private deleteContainer;
    private deleteTableBlock;
    private splitTable;
    private updateEditPosition;
    private deleteContent;
    private setActionInternal;
    private checkClearCells;
    private isEndInAdjacentTable;
    /**
     * @private
     * @param table
     * @returns {TableWidget}
     */
    cloneTableToHistoryInfo(table: TableWidget, isParentTable?: boolean): TableWidget;
    private insertParagraphPaste;
    private removeInlines;
    private skipTracking;
    private canHandleDeletion;
    /**
     *
     * @param comment
     * Deletes comment start and end markers along with its comment widgets.
     */
    private deleteCommentInSelection;
    /**
     * @private
     */
    removeContent(lineWidget: LineWidget, startOffset: number, endOffset: number, editAction?: number, skipHistoryCollection?: Boolean): void;
    /**
     * Deletes comment widgets from comment pane along with history preservation.
     */
    private deleteCommentWidgetInline;
    private clearFieldElementRevisions;
    private addRemovedRevisionInfo;
    /**
     * @private
     * @returns {void}
     */
    removeEmptyLine(paragraph: ParagraphWidget): void;
    /**
     * Clone the list level
     *
     * @param {WListLevel} source - Specifies the source
     * @private
     * @returns {WListLevel} - Returns the list level
     */
    cloneListLevel(source: WListLevel): WListLevel;
    /**
     * Copies the list level
     *
     * @param {WListLevel} destination - Specifies the destination
     * @param {WListLevel} listLevel - Specifies the list level
     * @private
     * @returns {void}
     */
    copyListLevel(destination: WListLevel, listLevel: WListLevel): void;
    /**
     * Clone level override
     *
     * @param {WLevelOverride} source  @returns {void} - Specifies the level override
     * @private
     * @returns {WLevelOverride} - Returns the level overeide
     */
    cloneLevelOverride(source: WLevelOverride): WLevelOverride;
    /**
     * Update List Paragraph
     * @private
     * @returns {void}
     */
    updateListParagraphs(): void;
    /**
     * @private
     * @returns {void}
     */
    updateListParagraphsInBlock(block: BlockWidget): void;
    /**
     * Applies list format
     *
     * @param {WList} list - Specifies the list.
     * @private
     * @returns {void}
     */
    onApplyList(list: WList): void;
    /**
     * Applies bullets or numbering list
     *
     * @param {string} format - Specifies the format
     * @param {ListLevelPattern} listLevelPattern - Specifies the list level patterns
     * @param {string} fontFamily - Specifies the font family.
     * @private
     * @returns {void}
     */
    applyBulletOrNumbering(format: string, listLevelPattern: ListLevelPattern, fontFamily: string): void;
    private addListLevels;
    /**
     * Inserts the page break at the cursor position.
     *
     * @returns {void}
     */
    insertPageBreak(): void;
    /**
     * Inserts a column break at cursor position.
     *
     * @returns {void}
     */
    insertColumnBreak(): void;
    /**
     * @private
     * @returns {void}
     */
    onEnter(breakType?: string): void;
    private combineRevisionWithValidElement;
    private getPreviousValidElement;
    private splitParagraphInternal;
    private insertParaRevision;
    private applyRevisionForParaMark;
    private checkParaMarkMatchedWithElement;
    private checkToMatchEmptyParaMark;
    private checkToMatchEmptyParaMarkBack;
    /**
     * @private
     * @returns {void}
     */
    updateNextBlocksIndex(block: BlockWidget, increaseIndex: boolean): void;
    private updateIndex;
    /**
     * @private
     * @returns {void}
     */
    updateEndPosition(): void;
    /**
     * @private
     * @returns { CommentCharacterElementBox[] }
     */
    checkAndRemoveComments(isReplace?: boolean, isAccept?: boolean): CommentCharacterElementBox[];
    private updateHistoryForComments;
    /**
     * @private
     * @returns {void}
     */
    onBackSpace(): void;
    /**
     * @private
     * @returns {boolean}
     */
    insertRemoveBookMarkElements(isUpdateComplexHistory: boolean): boolean;
    /**
     * @private
     * @returns {boolean}
     */
    insertRemoveContentControlElements(isUpdateComplexHistory: boolean): boolean;
    /**
     * @private
     * @returns {boolean}
     */
    insertRemovedEditRangeEndElements(isUpdateComplexHistory: boolean): boolean;
    /**
     * @private
     * @returns {boolean}
     */
    insertRemovedEditRangeStartElements(isUpdateComplexHistory: boolean): boolean;
    /**
     * @private
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isBackSpace - Specifies is backspace.
     * @returns {boolean}
     */
    deleteSelectedContents(selection: Selection, isBackSpace: boolean, isDeletecell?: boolean): boolean;
    private removeWholeElement;
    /**
     * @private
     */
    getSelectedComments(): SelectedCommentInfo;
    /**
     * Remove single character on left of cursor position
     *
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isRedoing - Specified the is redoing.
     * @private
     * @returns {void}
     */
    singleBackspace(selection: Selection, isRedoing: boolean): void;
    private setPositionForHistory;
    /**
     *
     * @private
     * @returns {void}
     */
    removeAtOffset(lineWidget: LineWidget, selection: Selection, offset: number): void;
    private removeCharacter;
    private removeCharacterInLine;
    private removeRevisionsInformation;
    private handleDeleteTracking;
    private toCombineOrInsertRevision;
    private updateLastElementRevision;
    private updateEndRevisionIndex;
    /**
     * @private
     */
    retrieveRevisionInOder(elementBox: any): Revision;
    private handleDeletionForInsertRevision;
    private handleDeleteBySplitting;
    private updateCursorForInsertRevision;
    private checkToCombineRevisionsInSides;
    /**
     * Removes the current selected content or one character right of the cursor.
     *
     * @returns {void}
     */
    delete(): void;
    private deleteEditElement;
    private removeContentControlMark;
    /**
     * Remove single character on right of cursor position
     *
     * @param {Selection} selection - Specifies the selection
     * @param {boolean} isRedoing - Specified the is redoing.
     * @private
     * @returns {void}
     */
    singleDelete(selection: Selection, isRedoing: boolean): void;
    private singleDeleteInternal;
    private deleteParagraphMark;
    private handleDeleteParaMark;
    private insertDeleteParaMarkRevision;
    private retrieveRevisionByType;
    private combineRevisionOnDeleteParaMark;
    private updateEditPositionOnMerge;
    private checkEndPosition;
    private checkInsertPosition;
    private checkIsNotRedoing;
    /**
     * deleteSelectedContentInternal
     * @private
     */
    deleteSelectedContentInternal(selection: Selection, isBackSpace: boolean, startPosition: TextPosition, endPosition: TextPosition, isDeletecell?: boolean): boolean;
    /**
     * Init EditorHistory
     *
     * @private
     * @param {Action} action Specified the action.
     * @returns {void}
     */
    initHistory(action: Action): void;
    /**
     * Init Complex EditorHistory
     *
     * @private
     * @param {Action} action Specified the action.
     * @returns {void}
     */
    initComplexHistory(action: Action): void;
    /**
     * Insert image
     *
     * @private
     * @param {string} base64String Base64 string, web URL or file URL.
     * @param {number} width Image width
     * @param {number} height Image height
     * @param {string} alternateText Image alternateText
     * @returns {void}
     */
    insertPicture(base64String: string, width: number, height: number, alternateText: string, isUiInteracted: boolean): void;
    private generateFallBackImage;
    private insertPictureInternal;
    private fitImageToPage;
    /**
     * @param {selection} Selection context.
     * @param {elementBox} Elementbox
     * @param selection
     * @param elementBox
     * @private
     */
    insertInlineInSelection(selection: Selection, elementBox: ElementBox): void;
    /**
     * @private
     * @returns {void}
     */
    onPortrait(): void;
    /**
     * @private
     * @returns {void}
     */
    onLandscape(): void;
    private copyValues;
    /**
     * @param property
     * @private
     * @returns {void}
     */
    changeMarginValue(property: string): void;
    /**
     * @param property
     * @private
     * @returns {void}
     */
    onPaperSize(property: string): void;
    /**
     * @param blockAdv
     * @param updateNextBlockList
     * @param blockAdv
     * @param updateNextBlockList
     * @private
     * @returns {void}
     */
    updateListItemsTillEnd(blockAdv: BlockWidget, updateNextBlockList: boolean): void;
    /**
     * @param block
     * @private
     * @returns {void}
     */
    updateWholeListItems(block: BlockWidget, isFindingListParagraph?: boolean, listID?: number): ParagraphWidget;
    private getNextBlockForList;
    private updateListItems;
    private updateListItemsForTable;
    private updateListItemsForRow;
    private updateListItemsForCell;
    /**
     * @param block
     * @private
     * @returns {void}
     */
    updateRenderedListItems(block: BlockWidget): void;
    private updateRenderedListItemsForTable;
    private updateRenderedListItemsForRow;
    private updateRenderedListItemsForCell;
    private updateListItemsForPara;
    private updateRenderedListItemsForPara;
    private updateListNumber;
    /**
     * Get offset value to update in selection
     *
     * @param selection
     * @private
     * @returns {void}
     */
    getOffsetValue(selection: Selection): void;
    private setPositionParagraph;
    /**
     * @param textPosition
     * @param editPosition
     * @param textPosition
     * @param editPosition
     * @private
     * @returns {void}
     */
    setPositionForCurrentIndex(textPosition: TextPosition, editPosition: string): void;
    /**
     * Inserts the page number in the current cursor position.
     *
     * @param {string} numberFormat - Optional switch that overrides the numeral style of the page number.
     * @returns {void}
     */
    insertPageNumber(numberFormat?: string): void;
    /**
     * @param numberFormat
     * @private
     * @returns {void}
     */
    insertPageCount(numberFormat?: string): void;
    private createFields;
    /**
     * Inserts the specified bookmark at the current selection range.
     *
     * @param {string} name Specify the name of bookmark to be inserted.
     * @returns {void}
     */
    insertBookmark(name: string, isNavigationPane?: boolean): void;
    /**
     * @private
     */
    createBookmarkElements(name: string): BookmarkElementBox[];
    /**
     * Deletes the specified bookmark in the current document.
     *
     * @param {string} bookmarkName Specify the name of bookmark to be deleted.
     * @returns {void}
     */
    deleteBookmark(bookmarkName: string): void;
    /**
     * @param bookmark
     * @private
     * @returns {void}
     */
    deleteBookmarkInternal(bookmark: BookmarkElementBox): void;
    /**
     * @private
     */
    getSelectionInfo(isBookmark?: boolean): SelectionInfo;
    private insertElements;
    /**
     *
     * @private
     * @returns {void}
     */
    insertElementsInternal(position: TextPosition, elements: ElementBox[], isRelayout?: boolean, isNavigationPane?: boolean): void;
    /**
     * @private
     */
    getMarkerData(element: ElementBox, skip?: boolean, revision?: Revision, isAcceptOrReject?: string): MarkerInfo;
    /**
     * @private
     * @returns {any}
     */
    getRevisionMarkerData(markerData: any, revision: Revision, skip?: boolean, isAcceptOrReject?: string): any;
    /**
     * @param index
     * @private
     * @returns {CommentElementBox}
     */
    getCommentElementBox(index: string): CommentElementBox;
    /**
     * @param position
     * @private
     * @returns {BlockInfo}
     */
    getBlock(position: IndexInfo): BlockInfo;
    private getBlockInternal;
    /**
     * @param position
     * @param isInsertPosition
     * @private
     * @returns {void}
     */
    updateHistoryPosition(position: TextPosition | string, isInsertPosition: boolean): void;
    /**
     * Applies the borders based on given settings.
     *
     * @param {BorderSettings} settings Specify the border settings to be applied.
     * @returns {void}
     */
    applyBorders(settings: BorderSettings): void;
    private applyAllBorders;
    private applyInsideBorders;
    private getTopBorderCellsOnSelection;
    private getLeftBorderCellsOnSelection;
    private getRightBorderCellsOnSelection;
    private getBottomBorderCellsOnSelection;
    private clearAllBorderValues;
    private clearBorder;
    private getAdjacentCellToApplyBottomBorder;
    private getAdjacentBottomBorderOnEmptyCells;
    private getAdjacentCellToApplyRightBorder;
    private getSelectedCellsNextWidgets;
    private getBorder;
    /**
     * Applies borders
     *
     * @param {WBorders} sourceBorders
     * @param {WBorders} applyBorders
     * @private
     * @returns {void}
     */
    applyBordersInternal(sourceBorders: WBorders, applyBorders: WBorders): void;
    /**
     * Apply shading to table
     *
     * @param {WShading} sourceShading
     * @param {WShading} applyShading
     * @private
     * @returns {void}
     */
    applyShading(sourceShading: WShading, applyShading: WShading): void;
    private applyBorder;
    /**
     * Apply Table Format changes
     *
     * @param {WTableFormat} format Specifies table format
     * @param {boolean} isShading Specifies shading.
     * @private
     * @returns {void}
     */
    onTableFormat(format: WTableFormat, isShading?: boolean, table?: TableWidget): void;
    private applyTableFormat;
    private applyTablePropertyValue;
    private handleTableFormat;
    private updateGridForTableDialog;
    /**
     * Applies Row Format Changes
     *
     * @param {WRowFormat} format Specifies row format
     * @private
     * @returns {void}
     */
    onRowFormat(format: WRowFormat): void;
    private applyRowFormat;
    private applyRowPropertyValue;
    private handleRowFormat;
    /**
     * Applies Cell Format changes
     *
     * @param {WCellFormat} format Specifies cell format
     * @private
     * @returns {void}
     */
    onCellFormat(format: WCellFormat): void;
    /**
     * Applies Paragraph Format changes
     *
     * @param {WParagraphFormat} format Specifies cell format
     * @private
     * @returns {void}
     */
    onParaFormat(format: WParagraphFormat): void;
    /**
     * @param selection
     * @param value
     * @private
     * @returns {void}
     */
    updateCellMargins(selection: Selection, value: WCellFormat): void;
    private updateFormatForCell;
    private getSelectedCellInColumn;
    private getColumnCells;
    private getTableWidth;
    /**
     *
     * @private
     * @returns {void}
     */
    applyCellPropertyValue(selection: Selection, property: string, value: Object, applyFormat: WCellFormat): WCellFormat;
    private handleCellFormat;
    /**
     * @private
     * @returns {void}
     */
    destroy(): void;
    /**
     * Updates the table of contents.
     *
     * @param tocField
     * @private
     * @returns {void}
     */
    updateToc(tocField?: FieldElementBox): void;
    /**
     * @private
     */
    getTocSettings(code: string, tocField: FieldElementBox): TableOfContentsSettings;
    private decodeTSwitch;
    /**
     * Inserts, modifies or updates the table of contents based on given settings.
     *
     * @param {TableOfContentsSettings} tableOfContentsSettings Specify the table of content settings to be inserted.
     * @returns {void}
     */
    insertTableOfContents(tableOfContentsSettings?: TableOfContentsSettings): void;
    private appendEmptyPara;
    private constructTocFieldCode;
    private constructTSwitch;
    private appendEndField;
    private validateTocSettings;
    /**
     * Builds the TOC
     *
     * @private
     * @returns {ParagraphWidget[]}
     *
     */
    buildToc(tocSettings: TableOfContentsSettings, fieldCode: string, isFirstPara: boolean, isStartParagraph?: boolean, isNavigationPane?: boolean): ParagraphWidget[];
    private createOutlineLevels;
    private createHeadingLevels;
    private isHeadingStyle;
    private isOutlineLevelStyle;
    private createTocFieldElement;
    private createTOCWidgets;
    private insertTocHyperlink;
    private getPageNumber;
    private insertTocPageNumber;
    private updatePageRef;
    /**
     * Inserts toc bookmark.
     *
     * @param widget
     * @returns {string}
     */
    private insertTocBookmark;
    private generateBookmarkName;
    /**
     * Change cell content alignment
     *
     * @param verticalAlignment
     * @param textAlignment
     * @param verticalAlignment
     * @param textAlignment
     * @private
     * @returns {void}
     */
    onCellContentAlignment(verticalAlignment: CellVerticalAlignment, textAlignment: TextAlignment): void;
    /**
     * @param user
     * @private
     * @returns {void}
     */
    insertEditRangeElement(user: string): void;
    private insertEditRangeInsideTable;
    private addRestrictEditingForSelectedArea;
    /**
     * @param user
     * @private
     * @returns {void}
     */
    addEditElement(user: string, id?: number): EditRangeStartElementBox;
    /**
     * @param numDigits
     * @private
     * @returns {number}
     */
    private getEditRangeID;
    /**
     * @param protectionType
     * @private
     * @returns {void}
     */
    protect(protectionType: ProtectionType): void;
    private addEditCollectionToDocument;
    /**
     * @param editStart
     * @param user
     * @private
     * @returns {void}
     */
    updateRangeCollection(editStart: EditRangeStartElementBox, user: string): void;
    /**
     * @param user
     * @private
     * @returns {void}
     */
    removeUserRestrictions(user: string): void;
    private removeEditRangeElements;
    private removeEditRangeElementsOnTable;
    /**
     * @param editStart
     * @param currentUser
     * @private
     * @returns {void}
     */
    removeUserRestrictionsInternal(editStart: EditRangeStartElementBox, currentUser?: string, notRemoveElement?: boolean): void;
    private removeEditRangeFromCollection;
    /**
     * @private
     * @returns {void}
     */
    removeAllEditRestrictions(): void;
    /**
     * Inserts the specified form field at the current selection.
     *
     * @param {FormFieldType} type Specify the Form field type to insert.
     * @returns {void}
     */
    insertFormField(type: FormFieldType): void;
    private insertFormFieldInternal;
    addFormFieldWidget(fieldBegin: FieldElementBox): void;
    /**
     * @private
     */
    getFormFieldData(type: FormFieldType): FormField;
    /**
     * @param field
     * @param info
     * @private
     * @returns {void}
     */
    setFormField(field: FieldElementBox, info: TextFormFieldInfo | CheckBoxFormFieldInfo | DropDownFormFieldInfo): void;
    /**
     * @param type
     * @param formData
     * @param type
     * @param formData
     * @private
     * @returns {boolean}
     */
    editFormField(type: FormFieldType, formData: FormField): boolean;
    private getDefaultText;
    private getFormFieldCode;
    /**
     * @param field
     * @param reset
     * @param value
     * @param field
     * @param reset
     * @param value
     * @private
     * @returns {void}
     */
    toggleCheckBoxFormField(field: FieldElementBox, reset?: boolean, value?: boolean): void;
    /**
     * @private
     * @param contentControl
     * @returns {void}
     */
    toggleContentControlCheckBox(contentControl: ContentControl, value: boolean): void;
    /**
     * @param field
     * @param value
     * @param reset
     * @private
     * @returns {void}
     */
    updateFormField(field: FieldElementBox, value: string | number, reset?: boolean): void;
    /**
     * @private
     * @returns {void}
     */
    updateContentControl(contentControl: ContentControl, value: string, reset?: boolean): void;
    private updateContentControlResult;
    /**
     * @private
     * @returns {void}
     */
    getContentControlPropObject(contentControl: ContentControlProperties): any;
    /**
     * @private
     * @returns {void}
     */
    assignContentControl(contentControl: ContentControlProperties, value: any): void;
    private updateFormFieldInternal;
    private updateFormFieldResult;
    private checkBookmarkAvailability;
    private getBookmarkName;
    /**
     * @param formField
     * @private
     * @returns {void}
     */
    applyFormTextFormat(formField: FieldElementBox): void;
    private insertSpaceInFormField;
    /**
     * @param formField
     * @private
     * @returns {string}
     */
    getFieldResultText(formField?: FieldElementBox): string;
    /**
    * @private
    * @returns {void}
    */
    contentControlDropDownChange(): void;
    /**
     * @param field
     * @param text
     * @private
     * @returns {void}
     */
    applyTextFormatInternal(field: FieldElementBox, text: string): void;
    private constructCommentInitial;
    /**
     * Inserts the footnote at the current selection.
     *
     * @returns {void}
     */
    insertFootnote(): void;
    private updateFootnoteCollection;
    /**
     * Inserts the endnote at the current selection
     *
     * @returns {void}
     */
    insertEndnote(): void;
    private updateEndnoteCollection;
    private updateEndNoteIndex;
    private separator;
    private continuationSeparator;
    private updateFootNoteIndex;
    private setCharFormatForCollaborativeEditing;
    /**
    * @private
    */
    clear(): void;
}
/**
 * @private
 */
export interface SelectionInfo {
    start: string;
    end: string;
}
/**
 * @private
 */
export interface ContinueNumberingInfo {
    currentList: WList;
    listLevelNumber: number;
    listPattern: ListLevelPattern;
}
/**
 * Specifies the settings for border.
 */
export interface BorderSettings {
    /**
     * Specifies the border type.
     */
    type: BorderType;
    /**
     * Specifies the border color.
     */
    borderColor?: string;
    /**
     * Specifies the line width.
     */
    lineWidth?: number;
    /**
     * Specifies the border style.
     */
    borderStyle?: LineStyle;
}
/**
 * @private
 */
export interface TocLevelSettings {
    [key: string]: number;
}
/**
 * @private
 */
export interface PageRefFields {
    [key: string]: FieldTextElementBox;
}
/**
 * Specifies the settings for table of contents.
 */
export interface TableOfContentsSettings {
    /**
     * Specifies the start level.
     */
    startLevel?: number;
    /**
     * Specifies the end level.
     */
    endLevel?: number;
    /**
     * Specifies whether hyperlink can be included.
     */
    includeHyperlink?: boolean;
    /**
     * Specifies whether page number can be included.
     */
    includePageNumber?: boolean;
    /**
     * Specifies whether the page number can be right aligned.
     */
    rightAlign?: boolean;
    /**
     * Specifies the tab leader.
     */
    tabLeader?: TabLeader;
    /**
     * @private
     */
    levelSettings?: TocLevelSettings;
    /**
     * Specifies whether outline levels can be included.
     */
    includeOutlineLevels?: boolean;
}
/**
 * Defines the character format properties of document editor
 */
export interface CharacterFormatProperties {
    /**
     * Defines the bold formatting
     */
    bold?: boolean;
    /**
     * Defines the italic formatting
     */
    italic?: boolean;
    /**
     * Defines the font size
     */
    fontSize?: number;
    /**
     * Defines the font family
     */
    fontFamily?: string;
    /**
     * Defines the underline property
     */
    underline?: Underline;
    /**
     * Defines the strikethrough
     */
    strikethrough?: Strikethrough;
    /**
     * Defines the subscript or superscript property
     */
    baselineAlignment?: BaselineAlignment;
    /**
     * Defines the highlight color
     */
    highlightColor?: HighlightColor;
    /**
     * Defines the font color
     */
    fontColor?: string;
    /**
     * Defines the bidirectional property
     */
    bidi?: boolean;
    /**
     * Defines the allCaps formatting
     */
    allCaps?: boolean;
}
/**
 * Defines the paragraph format properties of document editor
 */
export interface ParagraphFormatProperties {
    /**
     * Defines the left indent
     */
    leftIndent?: number;
    /**
     * Defines the right indent
     */
    rightIndent?: number;
    /**
     * Defines the first line indent
     */
    firstLineIndent?: number;
    /**
     * Defines the text alignment property
     */
    textAlignment?: TextAlignment;
    /**
     * Defines the spacing value after the paragraph
     */
    afterSpacing?: number;
    /**
     * Defines the spacing value before the paragraph
     */
    beforeSpacing?: number;
    /**
     * Defines the spacing between the lines
     */
    lineSpacing?: number;
    /**
     * Defines the spacing type(AtLeast,Exactly or Multiple) between the lines
     */
    lineSpacingType?: LineSpacingType;
    /**
     * Defines the bidirectional property of paragraph
     */
    bidi?: boolean;
    /**
     * Defines the keep with next property of paragraph
     */
    keepWithNext?: boolean;
    /**
     * Defines the keep lines together property of paragraph
     */
    keepLinesTogether?: boolean;
    /**
     * Defines the widow control property of paragraph
     */
    widowControl?: boolean;
    /**
     * Defines the outline level of paragraph
     */
    outlineLevel?: OutlineLevel;
}
/**
 * Defines the section format properties of document editor
 */
export interface SectionFormatProperties {
    /**
     * Defines the header distance.
     */
    headerDistance?: number;
    /**
     * Defines the footer distance.
     */
    footerDistance?: number;
    /**
     * Defines the page width.
     */
    pageWidth?: number;
    /**
     * Defines the page height.
     */
    pageHeight?: number;
    /**
     * Defines the left margin of the page.
     */
    leftMargin?: number;
    /**
     * Defines the top margin of the page.
     */
    topMargin?: number;
    /**
     * Defines the bottom margin of the page.
     */
    bottomMargin?: number;
    /**
     * Defines the right margin of the page.
     */
    rightMargin?: number;
}
/**
 * @private
 */
export interface TabPositionInfo {
    defaultTabWidth: number;
    fPosition: number;
    position: number;
}
export interface ShapeProperties {
    /**
     * Sets the height of the shape.
     *
     */
    x?: number;
    /**
     * Sets the height of the shape.
     *
     */
    y?: number;
    /**
     * Sets the height of the shape.
     *
     */
    height?: number;
    /**
     * Sets the height of the shape.
     *
     */
    width?: number;
    /**
     * Sets visiblity of the shape.
     *
     */
    visible?: boolean;
    /**
     * Sets the height scale of the shape.
     *
     */
    widthScale?: number;
    /**
     * Sets the heightScale of the shape.
     *
     */
    heightScale?: number;
    /**
     * Sets the verticalPosition of the shape.
     *
     */
    verticalPosition?: number;
    /**
     * Sets the verticalOrigin of the shape.
     *
     */
    verticalOrigin?: VerticalOrigin;
    /**
     * Sets the verticalAlignment of the shape.
     *
     */
    verticalAlignment?: VerticalAlignment;
    /**
     * Sets the verticalAlignment of the shape.
     *
     */
    horizontalPosition?: number;
    /**
     * Sets the verticalAlignment of the shape.
     *
     */
    horizontalOrigin?: HorizontalOrigin;
    /**
     * Sets the verticalAlignment of the shape.
     *
     */
    horizontalAlignment?: HorizontalAlignment;
    /**
     * Sets allowOverLapping of the shape.
     *
     */
    allowOverLap?: boolean;
    /**
     * Sets textWrappingStyle of the shape.
     *
     */
    textWrappingStyle?: TextWrappingStyle;
    /**
     * Sets textWrappingType of the shape.
     *
     */
    textWrappingType?: TextWrappingType;
    /**
     * Sets isBelowText of the shape.
     *
     */
    isBelowText?: boolean;
    /**
     * Sets the distanceBottom of the shape.
     *
     */
    distanceBottom?: number;
    /**
     * Sets the distanceTop of the shape.
     *
     */
    distanceTop?: number;
    /**
     * Sets the distanceLeft of the shape.
     *
     */
    distanceLeft?: number;
    /**
     * Sets the distanceRight of the shape.
     *
     */
    distanceRight?: number;
    /**
     * Sets isHorizontalRule of the shape.
     *
     */
    isHorizontalRule?: boolean;
    /**
     * Sets isHorizontalRule of the shape.
     *
     */
    layoutInCell?: boolean;
    /**
     * Sets lockAnchor of the shape.
     *
     */
    lockAnchor?: boolean;
    /**
    * Sets fill of the shape.
    *
    */
    fill?: boolean;
    /**
    * Sets fillColor of the shape(Hex value eg: #156082FF).
    *
    */
    fillColor?: string;
    /**
    * Sets lineFormatType of the shape.
    *
    */
    lineFormatType?: LineFormatType;
    /**
    * Sets lineFormatType of the shape.
    *
    */
    dashStyle?: LineDashing;
    /**
    * Sets line of the shape.
    *
    */
    line?: boolean;
    /**
    * Sets lineColor of the shape(Hex value eg: #156082FF).
    *
    */
    lineColor?: string;
    /**
    * Sets lineWeight of the shape
    *
    */
    lineWeight?: number;
}
