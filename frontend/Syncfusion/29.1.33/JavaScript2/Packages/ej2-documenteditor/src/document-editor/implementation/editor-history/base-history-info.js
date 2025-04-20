import { WParagraphFormat } from '../format/paragraph-format';
import { WSectionFormat } from '../format/section-format';
import { WCharacterFormat } from '../format/character-format';
import { WListFormat } from '../format/list-format';
import { HistoryInfo } from '../index';
import { ModifiedLevel, RowHistoryFormat, TableHistoryInfo } from './history-helper';
import { BlockWidget, ParagraphWidget, BodyWidget, TableCellWidget, FieldElementBox, TableWidget, TableRowWidget, BookmarkElementBox, HeaderFooterWidget, CheckBoxFormField, TextFrame, TextElementBox, FootnoteElementBox, ImageElementBox, ListTextElementBox } from '../viewer/page';
import { Dictionary } from '../../base/dictionary';
import { abstractListsProperty, listIdProperty, listsProperty, nsidProperty } from '../../index';
import { TextPosition, ImageSizeInfo } from '../index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ElementBox, CommentCharacterElementBox } from '../viewer/page';
import { WTableFormat, WRowFormat, WCellFormat, WParagraphStyle } from '../format/index';
import { HelperMethods } from '../editor/editor-helper';
import { CONTROL_CHARACTERS } from '../../base/types';
// Code for Comparing the offset calculated using old approach and optimized approach
// /**
//  * @private
//  */
// export class MyError extends Error {
//     constructor(message: string) {
//         super(message);
//     }
// }
// export function throwCustomError(condition: boolean, message: string) {
//     if (condition) {
//         throw new MyError(message);
//     }
// }
/**
 * @private
 */
var BaseHistoryInfo = /** @class */ (function () {
    function BaseHistoryInfo(node) {
        this.cellOperation = [];
        this.splittedRevisions = [];
        this.isRemovedNodes = false;
        this.modifiedFormatOperation = [];
        this.revisionOperation = [];
        /**
         * @private
         */
        this.markerData = [];
        /**
         * @private
         */
        this.pastedComments = [];
        this.ownerIn = node;
        this.documentHelper = node.documentHelper;
        this.modifiedPropertiesIn = [];
        this.modifiedNodeLength = [];
        this.removedNodesIn = [];
        this.insertedNodes = [];
    }
    Object.defineProperty(BaseHistoryInfo.prototype, "owner", {
        //Properties
        //gets owner control
        get: function () {
            return this.ownerIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "editorHistory", {
        get: function () {
            return this.owner.editorHistoryModule;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "action", {
        get: function () {
            return this.actionIn;
        },
        set: function (value) {
            this.actionIn = value;
            if (this.owner.enableCollaborativeEditing && !this.editorHistory.isUndoing && this.cellOperation.length === 0) {
                if (value === 'DeleteColumn' || value === 'DeleteCells' || value === 'ClearCells' || value === 'MergeCells') {
                    if (!(this.owner.selectionModule.isTableSelected(true) || this.owner.selectionModule.isRowSelect()) || value === 'ClearCells' || value === 'MergeCells') {
                        this.insertedText = CONTROL_CHARACTERS.Cell;
                        this.deleteColumnOperation(this.action);
                    }
                }
                else if (value === 'Accept Change' || value === 'Reject Change') {
                    this.createAcceptRejectOperation(this.action);
                }
                else if (value === 'SectionBreak') {
                    this.insertedText = CONTROL_CHARACTERS.Section_Break;
                    this.type = 'NewPage';
                }
                else if (value === 'SectionBreakContinuous') {
                    this.insertedText = CONTROL_CHARACTERS.Section_Break;
                    this.type = 'Continuous';
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "modifiedProperties", {
        get: function () {
            return this.modifiedPropertiesIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "removedNodes", {
        /* eslint-enable */
        get: function () {
            return this.removedNodesIn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "selectionStart", {
        //gets or sets selection start
        get: function () {
            return this.selectionStartIn;
        },
        set: function (value) {
            this.selectionStartIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "selectionEnd", {
        get: function () {
            return this.selectionEndIn;
        },
        set: function (value) {
            this.selectionEndIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "insertPosition", {
        get: function () {
            return this.insertPositionIn;
        },
        set: function (value) {
            this.insertPositionIn = value;
            if (this.owner.enableCollaborativeEditing && !this.owner.editorModule.isRemoteAction && value !== '' && !isNullOrUndefined(value) && value.indexOf('C') === -1) {
                //TODO: Insert position not needed in all the cases. Need to optimize it.
                this.insertIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(value);
                // Code for Comparing the offset calculated using old approach and optimized approach
                // this.owner.selection.isNewApproach = true;
                // this.newInsertIndex = this.owner.selection.getAbsolutePositionFromRelativePosition(value);
                // this.owner.selection.isNewApproach = false;
                // throwCustomError(this.newInsertIndex !== this.insertIndex, "New InsertIndex " + this.newInsertIndex + " and old insertIndex " + this.insertIndex + " doesnot match");
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "endPosition", {
        get: function () {
            return this.endPositionIn;
        },
        set: function (value) {
            this.endPositionIn = value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaseHistoryInfo.prototype, "viewer", {
        get: function () {
            return this.ownerIn.viewer;
        },
        enumerable: true,
        configurable: true
    });
    BaseHistoryInfo.prototype.updateSelection = function () {
        this.updateCollaborativeSelection(this.owner.selectionModule.start.clone(), this.owner.selectionModule.end.clone());
        var blockInfo = this.owner.selectionModule.getParagraphInfo(this.owner.selectionModule.start);
        this.selectionStart = this.owner.selectionModule.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        blockInfo = this.owner.selectionModule.getParagraphInfo(this.owner.selectionModule.end);
        this.selectionEnd = this.owner.selectionModule.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
    };
    BaseHistoryInfo.prototype.updateCollaborativeSelection = function (start, end) {
        if (this.owner.enableCollaborativeEditing && !this.owner.editorModule.isRemoteAction) {
            //TODO: Need to consider formard and backward selection
            if (this.action === 'RemoveEditRange') {
                var startEdit = this.owner.selectionModule.getEditRangeStartElement();
                var position = this.owner.selectionModule.getPosition(startEdit);
                start = position.startPosition;
                end = position.endPosition;
            }
            else {
                this.updateTableSelection(start, end);
            }
            this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(start);
            // Code for Comparing the offset calculated using old approach and optimized approach
            // this.owner.selection.isNewApproach = true;
            // this.newStartIndex = this.owner.selection.getAbsolutePositionFromRelativePosition(start);
            // this.owner.selection.isNewApproach = false;
            this.owner.selectionModule.isEndOffset = true;
            this.endIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(end);
            // Code for Comparing the offset calculated using old approach and optimized approach
            // this.owner.selection.isNewApproach = true;
            // this.newEndIndex = this.owner.selection.getAbsolutePositionFromRelativePosition(end);
            // this.owner.selection.isNewApproach = false;
            this.owner.selectionModule.isEndOffset = false;
            var isForward = this.owner.selectionModule.isForward;
            if (isForward) {
                this.startIndex -= this.owner.selectionModule.getTableRelativeValue(start, end);
            }
            else {
                this.endIndex -= this.owner.selectionModule.getTableRelativeValue(end, start);
            }
            // if (this.action === 'BackSpace' || this.action === 'Delete') {
            var isParagraphStart = isForward ? (start.paragraph.equals(end.paragraph)
                && start.isAtParagraphStart) : (start.paragraph.equals(end.paragraph) && end.isAtParagraphStart);
            if ((isParagraphStart || !start.paragraph.equals(end.paragraph))) {
                if (isForward) {
                    this.endIndex += this.paraInclude(end);
                }
                else {
                    this.startIndex += this.paraInclude(start);
                }
            }
            // }
            if (!this.owner.enableTrackChanges) {
                this.splitOperationForDelete(start, end);
            }
            // Code for Comparing the offset calculated using old approach and optimized approach
            // throwCustomError(this.newStartIndex !== this.startIndex, "New StartIndex " + this.newStartIndex + " and old StartIndex " + this.startIndex + " doesnot match");
            // throwCustomError(this.newEndIndex !== this.endIndex, "New EndIndex " + this.newEndIndex + " and old EndIndex " + this.endIndex + " doesnot match");
        }
    };
    BaseHistoryInfo.prototype.paraInclude = function (position) {
        var paragrapthInfo = this.owner.selectionModule.getParagraphInfo(position);
        if (position.paragraph.getTotalLength() < paragrapthInfo.offset) {
            if (!(position.paragraph.isInsideTable
                && position.paragraph.equals(position.paragraph.associatedCell.lastChild))) {
                return 1;
            }
        }
        return 0;
    };
    /**
     * This method will set position when the multple cell selected.
     *
     * @param {TextPosition} startPosition - Specifies the start position.
     * @param {TextPosition} endPosition - Specifies the end position.
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.updateTableSelection = function (startPosition, endPosition) {
        var start = startPosition;
        var end = endPosition;
        if (!this.owner.selectionModule.isForward) {
            start = endPosition;
            end = startPosition;
        }
        if (start.paragraph.isInsideTable) {
            var firstPara = this.owner.selectionModule.getFirstParagraph(start.paragraph.associatedCell);
            if (end.paragraph.isInsideTable) {
                if (!start.paragraph.associatedCell.equals(end.paragraph.associatedCell)) {
                    var lastPara = this.owner.selectionModule.getLastParagraph(end.paragraph.associatedCell);
                    start.setPosition(firstPara.firstChild, true);
                    end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
                }
            }
            else {
                start.setPosition(firstPara.firstChild, true);
            }
        }
        else if (end.paragraph.isInsideTable) {
            var lastPara = this.owner.selectionModule.getLastParagraph(end.paragraph.associatedCell);
            end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
        }
    };
    /**
     * start is para and end is in row.
     *
     * @param {TextPosition} startPosition - Specifies the start position.
     * @param {TextPosition} endPosition - Specifies the end position.
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.splitOperationForDelete = function (startPosition, endPosition) {
        // when start is para and end is row. we are building the operation like:
        // fisrt delete the end table from table start to selection end.
        // second need to paste the content from the start para and need to paste it in the next row.
        // third delete the start paragraph to before wiget of end table.
        var start = startPosition;
        var end = endPosition;
        if (!this.owner.selectionModule.isForward) {
            start = endPosition;
            end = startPosition;
        }
        if (!start.paragraph.isInsideTable && end.paragraph.isInsideTable && (this.action === 'BackSpace' || this.action === 'Delete')) {
            var lastParagraph = this.owner.selectionModule.getLastBlockInLastCell(end.paragraph.associatedCell.ownerTable);
            if (!lastParagraph.associatedCell.equals(end.paragraph.associatedCell)) {
                var PasteLength = this.startIndex;
                var endLineWidget = start.currentWidget;
                var endOffset = start.offset;
                start.setPosition(start.paragraph.firstChild, true);
                this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(start);
                var startIndex = this.startIndex;
                var table = this.owner.documentHelper.layout.getParentTable(end.paragraph.associatedCell.ownerTable);
                var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                var tableStart = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, table).position;
                // Table start will get the offset for table. So adding plus one to row offset.
                this.startIndex = tableStart + 1;
                this.cellOperation.push(this.getDeleteOperation(this.action));
                // This will add the paste content in first and first cell so adding plus 3.
                this.startIndex = tableStart + 3;
                if (endOffset !== 0) {
                    this.pasteContent = this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), start.currentWidget, start.offset, endLineWidget, endOffset, false, true);
                    this.cellOperation.push(this.getPasteOpertion(this.pasteContent, PasteLength - startIndex));
                }
                this.endIndex = tableStart;
                this.startIndex = startIndex;
                this.cellOperation.push(this.getDeleteOperation(this.action));
            }
        }
        if (this.action === 'PasteColumn' || this.action === 'PasteOverwrite' || this.action === 'PasteRow') {
            //when inserting new colomn in paste. first deleting the table and inserting the whole table.
            var table = startPosition.paragraph.associatedCell.ownerTable;
            var paragraphInfo = { 'paragraph': null, 'offset': 0 };
            this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, table).position;
            this.endIndex = this.startIndex + this.owner.selectionModule.getBlockLength(undefined, table, 0, { done: false }, true, undefined, undefined);
        }
    };
    BaseHistoryInfo.prototype.setBookmarkInfo = function (bookmark) {
        this.removedNodes.push({ 'bookmark': bookmark, 'startIndex': bookmark.indexInOwner, 'endIndex': bookmark.reference.indexInOwner });
    };
    BaseHistoryInfo.prototype.setContentControlInfo = function (contentControl) {
        this.removedNodes.push({ 'contentcontrol': contentControl, 'startIndex': contentControl.indexInOwner, 'endIndex': contentControl.reference.indexInOwner });
    };
    BaseHistoryInfo.prototype.setFormFieldInfo = function (field, value) {
        this.removedNodes.push({ 'formField': field, 'value': value });
    };
    BaseHistoryInfo.prototype.setEditRangeInfo = function (editStart) {
        this.removedNodes.push({ 'editStart': editStart, 'startIndex': editStart.indexInOwner, 'endIndex': editStart.editRangeEnd.indexInOwner });
    };
    BaseHistoryInfo.prototype.setContentControlCheckBox = function (contentControl, value) {
        this.removedNodes.push({ 'contentControlCheckBox': contentControl, 'value': value });
    };
    BaseHistoryInfo.prototype.revertFormTextFormat = function () {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        var fieldInfo = this.removedNodes[0];
        var text = fieldInfo.value;
        /* eslint-enable @typescript-eslint/no-explicit-any */
        var formField = fieldInfo.formField;
        if (this.editorHistory.isUndoing) {
            this.owner.editorModule.applyTextFormatInternal(formField, text);
            this.editorHistory.recordChanges(this);
        }
        else {
            text = HelperMethods.formatText(formField.formFieldData.format, text);
            this.owner.editorModule.applyTextFormatInternal(formField, text);
            this.editorHistory.undoStack.push(this);
        }
    };
    BaseHistoryInfo.prototype.revertFormField = function () {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        var fieldInfo = this.removedNodes[0];
        /* eslint-enable @typescript-eslint/no-explicit-any */
        var field = fieldInfo.formField;
        if (field.formFieldData instanceof CheckBoxFormField) {
            this.owner.editorModule.toggleCheckBoxFormField(field, true, fieldInfo.value);
        }
        else {
            this.owner.editorModule.updateFormField(field, fieldInfo.value);
        }
    };
    BaseHistoryInfo.prototype.revertContentControl = function () {
        var contentControlInfo = this.removedNodes[0];
        var contentcontrol = contentControlInfo.contentcontrol;
        if (this.editorHistory.isUndoing) {
            var markerData = this.owner.editorModule.getMarkerData(contentcontrol);
            this.markerData.push(markerData);
            contentcontrol.line.children.splice(contentControlInfo.startIndex, 0, contentcontrol);
            this.documentHelper.owner.editorModule.insertContentControlInCollection(contentcontrol);
            //const previousNode: ElementBox = contentControl.previousNode;
            this.markerData.push(markerData);
            contentcontrol.reference.line.children.splice(contentControlInfo.endIndex, 0, contentcontrol.reference);
            this.owner.editorModule.updatePropertiesToBlock(contentcontrol, true);
            this.owner.selectionModule.updateContentControlHighlightSelection();
            this.editorHistory.recordChanges(this);
            this.viewer.updateScrollBars();
            this.owner.editorModule.fireContentChange();
        }
        else {
            this.owner.editorModule.removeContentControlInternal();
            this.editorHistory.undoStack.push(this);
        }
    };
    BaseHistoryInfo.prototype.revertBookmark = function () {
        var bookmarkInfo = this.removedNodes[0];
        var bookmark = bookmarkInfo.bookmark;
        // When perform undo, redo for drag and drop operation, bookmark reference changed so we couldn't insert or delete proper bookmark. so updated the bookmark based on name.
        if (!isNullOrUndefined(bookmark) && (bookmark.line.indexInOwner === -1 || bookmark.line.paragraph.indexInOwner === -1) &&
            !isNullOrUndefined(this.owner.documentHelper) && this.owner.documentHelper.bookmarks.length > 0) {
            bookmark = this.owner.documentHelper.bookmarks.get(bookmark.name);
            this.removedNodes[0].bookmark = bookmark;
        }
        if (this.editorHistory.isUndoing) {
            var markerData = this.owner.editorModule.getMarkerData(bookmark);
            this.documentHelper.bookmarks.add(bookmark.name, bookmark);
            this.markerData.push(markerData);
            bookmark.line.children.splice(bookmarkInfo.startIndex, 0, bookmark);
            var previousNode = bookmark.previousNode;
            if (previousNode instanceof FieldElementBox && !isNullOrUndefined(previousNode.formFieldData)) {
                previousNode.formFieldData.name = bookmark.name;
            }
            this.markerData.push(markerData);
            bookmark.reference.line.children.splice(bookmarkInfo.endIndex, 0, bookmark.reference);
            // Skip recording the changes if the currentHistoryInfo action is InsertBookmark. Because, the changes will be recorded in the update complex history.
            if (!(this.editorHistory.currentHistoryInfo && this.editorHistory.currentHistoryInfo.action === 'InsertBookmark')) {
                this.editorHistory.recordChanges(this);
            }
            if (this.owner.documentEditorSettings.showBookmarks === true) {
                this.viewer.updateScrollBars();
            }
            this.owner.editorModule.fireContentChange();
        }
        else {
            this.owner.editorModule.deleteBookmarkInternal(bookmark);
            // Skip recording the changes if the currentHistoryInfo action is InsertBookmark. Because, the changes will be recorded in the update complex history.
            if (!(this.editorHistory.currentHistoryInfo && this.editorHistory.currentHistoryInfo.action === 'InsertBookmark')) {
                this.editorHistory.undoStack.push(this);
            }
        }
    };
    BaseHistoryInfo.prototype.revertComment = function () {
        var editPosition = this.insertPosition;
        var comment = this.removedNodes[0];
        var insert = false;
        if (this.action === 'ResolveComment') {
            this.editorHistory.currentBaseHistoryInfo = this;
            this.owner.editorModule.resolveOrReopenComment(comment, !comment.isResolved);
            return;
        }
        if (this.action === 'EditComment') {
            var modifiedCommentObject = this.modifiedProperties[0];
            this.editorHistory.currentBaseHistoryInfo = this;
            var commentView = this.owner.commentReviewPane.commentPane.comments.get(comment);
            commentView.commentText.innerText = modifiedCommentObject.text;
            modifiedCommentObject.text = comment.text;
            comment.text = commentView.commentText.innerText;
            this.owner.editorHistoryModule.updateHistory();
            this.owner.fireContentChange();
            return;
        }
        if (this.action === 'InsertCommentWidget') {
            insert = (this.editorHistory.isRedoing);
        }
        else if (this.action === 'DeleteCommentWidget') {
            insert = (this.editorHistory.isUndoing);
        }
        if (insert) {
            if (comment) {
                this.insertedElement = comment.clone();
                if (comment.isReply) {
                    this.owner.editorModule.addReplyComment(comment, this.insertPosition);
                }
                else {
                    this.owner.editorModule.addCommentWidget(comment, false, true, true);
                }
            }
        }
        else {
            var commentElement = this.owner.editorModule.getCommentElementBox(editPosition);
            this.owner.editorModule.deleteCommentWidget(commentElement);
        }
    };
    BaseHistoryInfo.prototype.revertEditRangeRegion = function () {
        var editRangeInfo = this.removedNodes[0];
        var editStart = editRangeInfo.editStart;
        if (this.editorHistory.isUndoing) {
            var user = editStart.user === '' ? editStart.group : editStart.user;
            this.owner.editorModule.updateRangeCollection(editStart, user);
            this.markerData.push(this.owner.editorModule.getMarkerData(editStart));
            this.markerData.push(this.owner.editorModule.getMarkerData(editStart.editRangeEnd));
            editStart.line.children.splice(editRangeInfo.startIndex, 0, editStart);
            editStart.editRangeEnd.line.children.splice(editRangeInfo.endIndex, 0, editStart.editRangeEnd);
            this.editorHistory.recordChanges(this);
        }
        else {
            this.owner.editorModule.removeUserRestrictionsInternal(editStart);
            this.editorHistory.undoStack.push(this);
        }
        this.owner.editorModule.fireContentChange();
    };
    BaseHistoryInfo.prototype.revertContentControlProperties = function () {
        var start = this.selectionStart;
        var end = this.selectionEnd;
        if (!isNullOrUndefined(this.selectionStart) && !isNullOrUndefined(this.selectionEnd)) {
            var selectionStartTextPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(start);
            var selectionEndTextPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(end);
            this.owner.selectionModule.selectRange(selectionStartTextPosition, selectionEndTextPosition);
            var contentcontrol = this.owner.selection.currentContentControl;
            if (contentcontrol) {
                if (contentcontrol.contentControlProperties.type === 'CheckBox' && this.modifiedProperties.length === 0) {
                    var contentControlInfo = this.removedNodes[0];
                    this.owner.editorModule.toggleContentControlCheckBox(contentcontrol, !contentControlInfo.value);
                    contentControlInfo.value = !contentControlInfo.value;
                }
                else {
                    var contenControlObject = this.modifiedProperties.pop();
                    this.editorHistory.currentBaseHistoryInfo = this;
                    var content = this.owner.editorModule.getContentControlPropObject(contentcontrol.contentControlProperties);
                    this.owner.editorModule.assignContentControl(contentcontrol.contentControlProperties, contenControlObject);
                    this.modifiedProperties.push(content);
                    this.format = JSON.stringify(contenControlObject);
                }
            }
        }
        if (this.editorHistory.isUndoing) {
            this.editorHistory.recordChanges(this);
        }
        else {
            this.editorHistory.undoStack.push(this);
        }
        this.owner.editorModule.fireContentChange();
    };
    /* eslint-disable  */
    BaseHistoryInfo.prototype.revert = function () {
        if (this.action === 'FormTextFormat') {
            this.revertFormTextFormat();
            return;
        }
        if (this.action === 'UpdateFormField') {
            this.revertFormField();
            return;
        }
        if (this.action === 'DeleteBookmark') {
            this.revertBookmark();
            return;
        }
        if (this.action === 'RemoveContentControl') {
            this.revertContentControl();
            return;
        }
        if (this.action === 'RemoveEditRange') {
            this.revertEditRangeRegion();
            return;
        }
        if (this.action === 'InsertCommentWidget' || this.action === 'DeleteCommentWidget' || this.action === 'ResolveComment' || this.action === 'EditComment') {
            this.revertComment();
            return;
        }
        if (this.action === 'UpdateContentControl') {
            this.revertContentControlProperties();
            return;
        }
        if (this.action === 'ListFormat' && this.owner.editorModule.listNumberFormat !== '') {
            var abstractList = this.documentHelper.lists[0].abstractList.levels[this.owner.editorModule.listLevelNumber];
            var currentListLevelPattern = abstractList.listLevelPattern;
            var currentNUmberFormat = abstractList.numberFormat;
            abstractList.listLevelPattern = this.owner.editorModule.listLevelPattern;
            abstractList.numberFormat = this.owner.editorModule.listNumberFormat;
            this.owner.editorModule.listLevelPattern = currentListLevelPattern;
            this.owner.editorModule.listNumberFormat = currentNUmberFormat;
        }
        this.owner.isShiftingEnabled = true;
        var selectionStartTextPosition = undefined;
        var selectionEndTextPosition = undefined;
        var start = this.selectionStart;
        var end = this.selectionEnd;
        this.collabStart = this.selectionStart;
        this.collabEnd = this.selectionEnd;
        var isForwardSelection = TextPosition.isForwardSelection(start, end);
        if (this.modifiedProperties.length > 0 || this.action === 'Selection'
            || this.action === 'ClearCharacterFormat' || this.action === 'ClearParagraphFormat') {
            selectionStartTextPosition = !isNullOrUndefined(start) ? this.owner.selectionModule.getTextPosBasedOnLogicalIndex(start) : undefined;
            selectionEndTextPosition = !isNullOrUndefined(end) ? this.owner.selectionModule.getTextPosBasedOnLogicalIndex(end) : undefined;
            if (this.owner.enableCollaborativeEditing) {
                this.updateCollaborativeSelection(selectionStartTextPosition, selectionEndTextPosition);
            }
            this.revertModifiedProperties(selectionStartTextPosition, selectionEndTextPosition);
        }
        else {
            if (this.owner.enableCollaborativeEditing) {
                if (!isNullOrUndefined(this.insertPosition)) {
                    this.insertIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(this.insertPosition);
                }
                if (!isNullOrUndefined(this.endPosition)) {
                    var startPosition = this.owner.selection.getTextPosBasedOnLogicalIndex(this.insertPosition);
                    var endPosition = this.owner.selection.getTextPosBasedOnLogicalIndex(this.endPosition);
                    this.updateCollaborativeSelection(startPosition, endPosition);
                }
            }
            var sel = this.owner.selectionModule;
            var deletedNodes = this.removedNodes;
            if (this.removedNodes.length > 0) {
                if (this.action === 'InsertTable' && this.editorHistory.isRedoing) {
                    for (var i = 0; i < this.removedNodes.length; i++) {
                        this.insertedNodes.push(this.removedNodes[parseInt(i.toString(), 10)]);
                    }
                }
                this.isRemovedNodes = true;
            }
            else {
                this.isRemovedNodes = false;
            }
            this.removedNodesIn = [];
            if (isNullOrUndefined(this.endPosition)) {
                this.endPosition = this.insertPosition;
            }
            var isForward = TextPosition.isForwardSelection(this.insertPosition, this.endPosition);
            var insertTextPosition = sel.getTextPosBasedOnLogicalIndex(isForward ? this.insertPosition : this.endPosition);
            var endTextPosition = sel.getTextPosBasedOnLogicalIndex(isForward ? this.endPosition : this.insertPosition);
            // Set the endRevisionLogicalIndex based on undo stack value when the selection contains a table with the above paragraph (undoing).
            if (this.action === 'RemoveRowTrack' && this.editorHistory.isUndoing) {
                this.owner.selectionModule.select(this.selectionEnd, this.selectionEnd);
                var isLastChild = (this.owner.selectionModule.start.paragraph === this.owner.editor.getLastParaForBodywidgetCollection(this.owner.selectionModule.start.paragraph));
                if (this.owner.selectionModule.start.paragraph.isInsideTable || isLastChild && this.owner.selectionModule.end.paragraph.isEmpty() && deletedNodes.length > 0 && deletedNodes[0] instanceof TableWidget) {
                    this.endRevisionLogicalIndex = this.selectionEnd;
                }
            }
            if (this.editorHistory.isUndoing) {
                if (this.lastElementRevision && isNullOrUndefined(this.isAcceptOrReject) && deletedNodes.length > 0 && deletedNodes[0] instanceof ParagraphWidget && deletedNodes[0].isEmpty()) {
                    this.endRevisionLogicalIndex = this.selectionEnd;
                }
                else if (this.action === 'Delete' && this.editorHistory.currentHistoryInfo
                    && this.editorHistory.currentHistoryInfo.action === 'RemoveHyperlink'
                    && this.lastElementRevision instanceof FieldElementBox) {
                    // Bug 873011: Updated the selection for delete operation on "RemoveHyperlink" undo case.
                    this.endRevisionLogicalIndex = this.selectionEnd;
                }
                else if (this.lastElementRevision && isNullOrUndefined(this.endRevisionLogicalIndex)) {
                    this.updateEndRevisionInfo();
                }
                else if (this.action === 'RemoveRowTrack') {
                    this.endRevisionLogicalIndex = this.selectionEnd;
                }
            }
            if (this.action === 'ClearRevisions') {
                // Bug 873011: Handled the separate undo revision for field begin and field end for "ClearRevisions" action on hyperlink undo.
                var fieldBegin = sel.getHyperlinkField();
                if (this.isHyperlinkField && !isNullOrUndefined(fieldBegin)) {
                    var offset = fieldBegin.fieldSeparator.line.getOffset(fieldBegin.fieldSeparator, 1);
                    endTextPosition.setPositionParagraph(fieldBegin.fieldSeparator.line, offset);
                    this.undoRevisionForElements(insertTextPosition, endTextPosition, deletedNodes[deletedNodes.length - 1]);
                    var fieldEnd = fieldBegin.fieldEnd;
                    insertTextPosition.setPositionParagraph(fieldEnd.line, fieldEnd.line.getOffset(fieldEnd, 0));
                    endTextPosition.setPositionParagraph(fieldEnd.line, fieldEnd.line.getOffset(fieldEnd, 1));
                    this.undoRevisionForElements(insertTextPosition, endTextPosition, deletedNodes[deletedNodes.length - 1]);
                }
                else {
                    this.owner.selectionModule.select(this.selectionEnd, this.selectionEnd);
                    this.undoRevisionForElements(insertTextPosition, endTextPosition, deletedNodes[deletedNodes.length - 1]);
                }
                var id = deletedNodes[deletedNodes.length - 1];
                if (this.removedNodes.indexOf(id) === -1) {
                    this.removedNodes.push(id);
                }
                deletedNodes = [];
            }
            if (this.action === 'Uppercase') {
                sel.selectPosition(insertTextPosition, endTextPosition);
                this.editorHistory.currentBaseHistoryInfo = this;
                var editModule = this.owner.editorModule;
                editModule.changeSelectedTextCase(sel, insertTextPosition, endTextPosition, this.action.toString(), deletedNodes);
                editModule.reLayout(sel);
                return;
            }
            if (this.action === 'Lowercase') {
                sel.selectPosition(insertTextPosition, endTextPosition);
                this.editorHistory.currentBaseHistoryInfo = this;
                var editModule = this.owner.editorModule;
                editModule.changeSelectedTextCase(sel, insertTextPosition, endTextPosition, this.action.toString(), deletedNodes);
                editModule.reLayout(sel);
                return;
            }
            if (this.action === 'CapitalizeEachWord') {
                sel.selectPosition(insertTextPosition, endTextPosition);
                this.editorHistory.currentBaseHistoryInfo = this;
                var editModule = this.owner.editorModule;
                editModule.changeSelectedTextCase(sel, insertTextPosition, endTextPosition, this.action.toString(), deletedNodes);
                editModule.reLayout(sel);
                return;
            }
            if (this.action === 'SentenceCase') {
                sel.selectPosition(insertTextPosition, endTextPosition);
                this.editorHistory.currentBaseHistoryInfo = this;
                var editModule = this.owner.editorModule;
                editModule.changeSelectedTextCase(sel, insertTextPosition, endTextPosition, this.action.toString(), deletedNodes);
                editModule.reLayout(sel);
                return;
            }
            if (this.action === 'ToggleCase') {
                sel.selectPosition(insertTextPosition, endTextPosition);
                this.editorHistory.currentBaseHistoryInfo = this;
                var editModule = this.owner.editorModule;
                editModule.changeSelectedTextCase(sel, insertTextPosition, endTextPosition, this.action.toString(), deletedNodes);
                editModule.reLayout(sel);
                return;
            }
            if (insertTextPosition.isAtSamePosition(endTextPosition)) {
                sel.selectContent(insertTextPosition, true);
            }
            else {
                sel.selectPosition(insertTextPosition, endTextPosition);
            }
            if (this.action === 'InsertHyperlink' && this.editorHistory.isRedoing) {
                var fieldBegin = this.owner.selectionModule.getHyperlinkField();
                if (!isNullOrUndefined(fieldBegin)) {
                    var offset = (fieldBegin.line).getOffset(fieldBegin, 0);
                    insertTextPosition.setPositionParagraph(fieldBegin.line, offset);
                    this.owner.selectionModule.start.setPositionInternal(insertTextPosition);
                    offset = fieldBegin.fieldEnd.line.getOffset(fieldBegin.fieldEnd, 1);
                    endTextPosition.setPositionParagraph(fieldBegin.fieldEnd.line, offset);
                }
            }
            this.editorHistory.currentBaseHistoryInfo = this;
            this.selectionStart = this.insertPosition;
            this.insertPosition = undefined;
            this.selectionEnd = this.endPosition;
            this.endPosition = undefined;
            // Use this property to skip deletion if already selected content deleted case.
            var isRemoveContent = false;
            var isDeletecell = false;
            if (this.action === 'DeleteCells' || this.action === 'RemoveRowTrack') {
                isDeletecell = true;
            }
            if (this.endRevisionLogicalIndex && deletedNodes.length > 0) {
                var currentPosition = sel.getTextPosBasedOnLogicalIndex(this.endRevisionLogicalIndex);
                if ((this.editorHistory.isUndoing && !this.editorHistory.currentBaseHistoryInfo.isRevisionEndInAnotherCell) || (this.editorHistory.isRedoing && insertTextPosition.isAtSamePosition(endTextPosition))) {
                    sel.selectPosition(insertTextPosition, currentPosition);
                }
                this.collabEnd = this.endRevisionLogicalIndex;
                if (this.owner.enableCollaborativeEditing) {
                    this.endIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(currentPosition);
                    this.endIndex += this.paraInclude(currentPosition);
                }
                if (this.editorHistory.isUndoing || (this.editorHistory.isRedoing && !this.owner.selectionModule.isEmpty && deletedNodes.length > 0)) {
                    this.owner.editorModule.deleteSelectedContents(sel, true, isDeletecell);
                    isRemoveContent = true;
                }
            }
            if (!insertTextPosition.isAtSamePosition(endTextPosition) && !isRemoveContent) {
                isRemoveContent = this.action === 'BackSpace' || this.action === 'Delete' || this.action === 'ClearCells'
                    || this.action === 'DeleteCells' || this.action === 'PasteOverwrite' || this.action === "PasteRow" || this.action === 'PasteNested';
                var skipDelete = (deletedNodes.length > 0 && this.action === 'ParaMarkTrack') || this.action === 'ClearRevisions' || this.action === 'AcceptTOC';
                if (!(isRemoveContent) && this.action !== 'MergeCells' && this.action !== 'InsertRowAbove'
                    && this.action !== 'InsertRowBelow' && this.action !== 'InsertColumnLeft'
                    && this.action !== 'InsertColumnRight' && this.action !== 'Borders'
                    && this.action !== 'DeleteTable' && this.action !== 'DeleteColumn' && this.action !== 'DeleteRow') {
                    sel.end.setPositionInternal(endTextPosition);
                    if (!this.owner.selectionModule.isEmpty && !skipDelete) {
                        if (this.editorHistory.isRedoing && this.action !== 'Accept Change' && this.action !== 'ParaMarkTrack' &&
                            this.action !== 'ParaMarkReject' && this.action !== 'RemoveRowTrack') {
                            this.owner.editorModule.removeSelectedContents(sel);
                        }
                        else {
                            // Bug 873011: Handled the separate deletion for field begin and field end for "Accept Change" action on hyperlink redo.
                            var fieldBegin = sel.getHyperlinkField();
                            if (this.isHyperlinkField && !isNullOrUndefined(fieldBegin)
                                && this.editorHistory.isRedoing && this.action === 'Accept Change') {
                                var fieldEnd = fieldBegin.fieldEnd;
                                sel.start.setPositionParagraph(fieldBegin.line, (fieldBegin.line).getOffset(fieldBegin, 0));
                                sel.end.setPositionParagraph(fieldBegin.fieldSeparator.line, (fieldBegin.fieldSeparator.line).getOffset(fieldBegin.fieldSeparator, 1));
                                this.owner.editorModule.deleteSelectedContents(sel, true);
                                if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                                    this.editorHistory.currentBaseHistoryInfo.removedNodes.reverse();
                                }
                                sel.start.setPositionParagraph(fieldEnd.line, (fieldEnd.line).getOffset(fieldEnd, 0));
                                sel.end.setPositionParagraph(fieldEnd.line, (fieldEnd.line).getOffset(fieldEnd, 1));
                                this.owner.editorModule.deleteSelectedContents(sel, true);
                                if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo) {
                                    this.editorHistory.currentBaseHistoryInfo.removedNodes.reverse();
                                }
                            }
                            else {
                                this.owner.editorModule.deleteSelectedContents(sel, true);
                            }
                        }
                        if (!isNullOrUndefined(this.editorHistory.currentHistoryInfo) &&
                            this.editorHistory.currentHistoryInfo.action === 'PageBreak' && this.documentHelper.blockToShift) {
                            this.documentHelper.layout.shiftLayoutedItems(false);
                        }
                    }
                }
            }
            else if (this.action === 'SectionBreakContinuous' && insertTextPosition && this.editorHistory.isUndoing) {
                if (insertTextPosition.offset === 0 && !isNullOrUndefined(insertTextPosition.paragraph.previousRenderedWidget) && insertTextPosition.paragraph.previousRenderedWidget instanceof ParagraphWidget && insertTextPosition.paragraph.previousRenderedWidget.isEndsWithPageBreak && insertTextPosition.paragraph.containerWidget instanceof BodyWidget && insertTextPosition.currentWidget === insertTextPosition.currentWidget.paragraph.firstChild && insertTextPosition.paragraph.containerWidget.sectionFormat.breakCode === 'NoBreak') {
                    var section = insertTextPosition.paragraph.previousRenderedWidget.containerWidget;
                    this.owner.editorModule.combineSectionInternal(this.owner.selectionModule, section, insertTextPosition.paragraph.containerWidget);
                    this.owner.editorModule.layoutWholeDocument();
                }
            }
            else {
                isRemoveContent = false;
                if (!insertTextPosition.isAtSamePosition(endTextPosition)) {
                    isRemoveContent = this.action === 'BackSpace' || this.action === 'Delete' || this.action === 'ClearCells'
                        || this.action === 'DeleteCells';
                }
            }
            if (this.action === 'Paste' && this.pastedComments.length > 0) {
                if (this.editorHistory.isUndoing) {
                    for (var i = 0; i < this.pastedComments.length; i++) {
                        var comment = this.pastedComments[i];
                        this.owner.editorModule.deleteCommentWidget(comment);
                    }
                }
                else if (this.editorHistory.isRedoing) {
                    for (var j = 0; j < this.pastedComments.length; j++) {
                        var comment = this.pastedComments[j];
                        this.owner.editorModule.addCommentWidget(comment, false, this.owner.showComments, false);
                        if (comment.replyComments.length > 0) {
                            for (var k = 0; k < comment.replyComments.length; k++) {
                                this.owner.commentReviewPane.addReply(comment.replyComments[k], false, false);
                            }
                        }
                    }
                }
            }
            var isRedoAction = (this.editorHistory.isRedoing && !isRemoveContent);
            isRemoveContent = this.lastElementRevision ? false : isRemoveContent;
            this.revertModifiedNodes(deletedNodes, isRedoAction, isForwardSelection ? start : end, start === end, isForwardSelection ? end : start);
            // Use this property to delete table or cell based on history action.
            if (isRemoveContent) {
                this.removeContent(insertTextPosition, endTextPosition, isDeletecell);
            }
            //this.owner.editorModule.reLayout(this.documentHelper.selection);
        }
        var isSelectionChanged = false;
        var updateSelection = false;
        if (!isNullOrUndefined(this.editorHistory.currentHistoryInfo) && (this.editorHistory.currentHistoryInfo.action === 'Reject All' || this.editorHistory.currentHistoryInfo.action === 'Accept All' || this.editorHistory.currentHistoryInfo.action === 'Paste')) {
            updateSelection = true;
        }
        if (this.action !== 'TrackingPageBreak' && ((this.editorHistory.isUndoing || this.endRevisionLogicalIndex || this.action === 'RemoveRowTrack' || updateSelection) && isNullOrUndefined(this.editorHistory.currentHistoryInfo) || updateSelection) ||
            ((this.action === 'InsertRowAbove' || this.action === 'Borders' || this.action === 'InsertRowBelow' || this.action === 'InsertColumnLeft' || this.action === 'InsertColumnRight' || this.action === 'Accept Change' || this.action === 'PasteColumn' || this.action === 'PasteRow' || this.action === 'PasteOverwrite' || this.action === 'PasteNested') && (this.editorHistory.isRedoing
                || this.editorHistory.currentHistoryInfo.action === 'Paste'))) {
            if (this.action === 'RemoveRowTrack' && this.editorHistory.isRedoing) {
                selectionStartTextPosition = !isNullOrUndefined(this.selectionStart) ? this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.selectionStart) : undefined;
                selectionEndTextPosition = !isNullOrUndefined(this.selectionEnd) ? this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.selectionEnd) : undefined;
            }
            else {
                selectionStartTextPosition = !isNullOrUndefined(start) ? this.owner.selectionModule.getTextPosBasedOnLogicalIndex(start) : undefined;
                selectionEndTextPosition = !isNullOrUndefined(end) ? this.owner.selectionModule.getTextPosBasedOnLogicalIndex(end) : undefined;
            }
            if (this.action !== 'ModifyStyle') {
                this.owner.selectionModule.selectRange(selectionStartTextPosition, selectionEndTextPosition);
            }
            this.documentHelper.updateFocus();
            isSelectionChanged = true;
        }
        this.owner.trackChangesPane.isTrackingPageBreak = false;
        var index = this.insertIndex;
        // Updates insert position of history info instance.
        this.insertPosition = start;
        this.endPosition = end;
        if (this.action === 'InsertHyperlink') {
            this.insertIndex = index;
        }
        if (!isNullOrUndefined(this.editorHistory.currentHistoryInfo) &&
            (this.editorHistory.currentHistoryInfo.action === 'Accept All'
                || this.editorHistory.currentHistoryInfo.action === 'Reject All' || this.editorHistory.currentHistoryInfo.action === 'RemoveComment')) {
            if (this.owner.documentHelper.blockToShift) {
                this.owner.documentHelper.layout.shiftLayoutedItems(false);
            }
        }
        this.owner.editorModule.reLayout(this.owner.selectionModule, this.owner.selectionModule.isEmpty);
        if (this.editorHistory.isUndoing && this.action === 'SectionBreak') {
            this.owner.editorModule.isSkipOperationsBuild = this.owner.enableCollaborativeEditing;
            this.owner.editorModule.layoutWholeDocument();
            this.owner.editorModule.isSkipOperationsBuild = false;
        }
        if (isSelectionChanged) {
            this.documentHelper.scrollToPosition(this.owner.selectionModule.start, this.owner.selectionModule.end);
        }
        this.highlightListText();
    };
    BaseHistoryInfo.prototype.highlightListText = function () {
        if (!isNullOrUndefined(this.editorHistory.currentHistoryInfo)) {
            if (this.action === 'ListCharacterFormat' || (this.editorHistory.currentHistoryInfo.action === 'ListSelect' && this.action === 'ListFormat')) {
                var selectionStartTextPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.selectionStart);
                var widget = selectionStartTextPosition.currentWidget;
                this.documentHelper.selection.highlightListText(widget);
            }
        }
    };
    BaseHistoryInfo.prototype.removeContent = function (insertTextPosition, endTextPosition, isDeletecell) {
        //If the base parent of the insert text position and end text position is null 
        //then the paragraphs already removed.
        //Example scenario: In table editing that is delete cells operation 
        // we will backed up the entire table ad it will be replaced on undo operation.
        //At that time if the positions are in table 
        //which is already replaced in undo (revert modified nodes method) then the base parent of the paragraph will be null.
        //So again, selecting the content and deleting is unnecessary
        // and it will cause improper position updates and null reference exceptions. 
        if ((!isNullOrUndefined(insertTextPosition.paragraph.containerWidget) &&
            insertTextPosition.paragraph.containerWidget instanceof BodyWidget &&
            (!isNullOrUndefined(endTextPosition.paragraph.containerWidget)
                && endTextPosition.paragraph.containerWidget instanceof BodyWidget))
            || (!isNullOrUndefined(insertTextPosition.paragraph.containerWidget)
                && !isNullOrUndefined(endTextPosition.paragraph.containerWidget)
                && insertTextPosition.paragraph.containerWidget instanceof TableCellWidget
                && endTextPosition.paragraph.containerWidget instanceof TableCellWidget
                && !isNullOrUndefined(insertTextPosition.paragraph.bodyWidget)) ||
            (!isNullOrUndefined(insertTextPosition.paragraph.containerWidget)
                && !isNullOrUndefined(endTextPosition.paragraph.containerWidget)
                && insertTextPosition.paragraph.containerWidget instanceof TextFrame
                && endTextPosition.paragraph.containerWidget instanceof TextFrame)) {
            //Removes if any empty paragraph is added while delete.
            this.owner.selectionModule.selectRange(insertTextPosition, endTextPosition);
            this.documentHelper.updateFocus();
            var isDelete = false;
            if (this.action === 'BackSpace' || this.action === 'Uppercase' || this.action === 'RemoveRowTrack') {
                isDelete = true;
            }
            this.owner.editorModule.deleteSelectedContents(this.owner.selectionModule, isDelete, isDeletecell);
        }
    };
    BaseHistoryInfo.prototype.updateEndRevisionInfo = function () {
        this.lastElementRevision = this.checkAdjacentNodeForMarkedRevision(this.lastElementRevision);
        var currentRevision = this.retrieveEndPosition(this.lastElementRevision);
        var blockInfo = this.owner.selectionModule.getParagraphInfo(currentRevision);
        var isLastChild = (blockInfo.paragraph == this.owner.editor.getLastParaForBodywidgetCollection(blockInfo.paragraph));
        if (blockInfo.paragraph.isInsideTable && blockInfo.paragraph == this.owner.selection.getLastParagraph(blockInfo.paragraph.associatedCell)) {
            isLastChild = true;
        }
        var isAtParagraphEnd = isNullOrUndefined(this.selectionEnd) ? true : false;
        if (!isNullOrUndefined(this.selectionEnd)) {
            var position = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.selectionEnd);
            var paragraphInfo = this.owner.selectionModule.getParagraphInfo(position);
            if (paragraphInfo.paragraph === blockInfo.paragraph) {
                isAtParagraphEnd = paragraphInfo.paragraph.getLength() + 1 === paragraphInfo.offset;
            }
            else {
                isAtParagraphEnd = true;
            }
        }
        if (blockInfo.paragraph.getLength() == blockInfo.offset && isAtParagraphEnd && !isLastChild) {
            blockInfo.offset++;
        }
        this.endRevisionLogicalIndex = this.owner.selectionModule.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        this.lastElementRevision.isMarkedForRevision = false;
    };
    BaseHistoryInfo.prototype.retrieveEndPosition = function (elementBox) {
        var endPosition = new TextPosition(this.owner);
        var offset = elementBox.line.getOffset(elementBox, 0) + elementBox.length;
        endPosition.setPositionFromLine(elementBox.line, offset);
        return endPosition;
    };
    /**
     * Method to retrieve exact spitted node which is marked as last available element.
     *
     * @param {ElementBox} elementBox - Specifies the element box
     * @returns {ElementBox} - Returns element box
     */
    BaseHistoryInfo.prototype.checkAdjacentNodeForMarkedRevision = function (elementBox) {
        var nextItem = elementBox.nextNode;
        var markedNode;
        while (!isNullOrUndefined(nextItem) && nextItem.isMarkedForRevision) {
            markedNode = nextItem;
            nextItem = nextItem.nextNode;
        }
        return !isNullOrUndefined(markedNode) ? markedNode : elementBox;
    };
    BaseHistoryInfo.prototype.revertModifiedProperties = function (start, end) {
        if (this.action === 'CellFormat' || this.action === 'CellOptions' || this.action === 'TableOptions') {
            this.owner.isShiftingEnabled = false;
        }
        if (!isNullOrUndefined(start) && !isNullOrUndefined(end)) {
            this.owner.selectionModule.selectRange(start, end);
        }
        this.documentHelper.updateFocus();
        if (this.action === 'RowResizing' || this.action === 'CellResizing') {
            this.revertResizing();
        }
        else if (this.action === 'CellOptions' || this.action === 'TableOptions') {
            this.revertTableDialogProperties(this.action);
        }
        else if (this.action !== 'Selection') {
            this.revertProperties();
        }
    };
    // Redoes the Action
    BaseHistoryInfo.prototype.redoAction = function () {
        var editor = this.owner.editorModule;
        this.action = this.action;
        switch (this.action) {
            case 'BackSpace':
                editor.singleBackspace(this.owner.selectionModule, true);
                break;
            case 'Delete':
                editor.singleDelete(this.owner.selectionModule, true);
                break;
            case 'DeleteTable':
                editor.deleteTable();
                break;
            case 'DeleteColumn':
                editor.deleteColumn();
                break;
            case 'DeleteRow':
                editor.deleteRow();
                break;
            case 'MergeCells':
                editor.mergeSelectedCellsInTable();
                break;
            case 'InsertRowAbove':
                editor.insertRow(true);
                break;
            case 'InsertRowBelow':
                editor.insertRow(false);
                break;
            case 'InsertColumnLeft':
                editor.insertColumn(true);
                break;
            case 'InsertColumnRight':
                editor.insertColumn(true);
                break;
            case 'SectionBreak':
                editor.insertSection(this.owner.selectionModule, true);
                break;
            case 'SectionBreakContinuous':
                editor.insertSection(this.owner.selectionModule, true, undefined, true);
                break;
            case 'TableAutoFitToContents':
                editor.autoFitTable('FitToContents');
                break;
            case 'TableAutoFitToWindow':
                editor.autoFitTable('FitToWindow');
                break;
            case 'TableFixedColumnWidth':
                editor.autoFitTable('FixedColumnWidth');
                break;
            case 'RemoveRowTrack':
                this.owner.selectionModule.handleAcceptReject(true);
                break;
        }
    };
    BaseHistoryInfo.prototype.revertModifiedNodes = function (deletedNodes, isRedoAction, start, isEmptySelection, end) {
        if (isRedoAction && (this.action === 'BackSpace' || this.action === 'Delete' || this.action === 'DeleteTable'
            || this.action === 'DeleteColumn' || this.action === 'DeleteRow' || this.action === 'InsertRowAbove' ||
            this.action === 'InsertRowBelow' || this.action === 'InsertColumnLeft' || this.action === 'InsertColumnRight'
            || this.action === 'MergeCells' || this.action === 'SectionBreak' || this.action === 'SectionBreakContinuous' || this.action === 'TableAutoFitToContents' ||
            this.action === 'TableAutoFitToWindow' || this.action === 'TableFixedColumnWidth' || this.action === 'PasteColumn' || this.action === 'PasteOverwrite' || this.action === 'PasteNested')) {
            this.redoAction();
            if (this.action === 'SectionBreak' || this.action === 'SectionBreakContinuous') {
                return;
            }
        }
        if (deletedNodes.length > 0) {
            //tslint:disable-next-line:max-line-length
            if ((this.editorHistory.isUndoing && (this.action === 'RemoveRowTrack' || this.action === 'DeleteCells' ||
                this.action === 'DeleteColumn' || this.action === 'DeleteRow' || this.action === 'MergeCells'))
                || (this.action === 'InsertRowAbove' || this.action === 'InsertRowBelow' || this.action === 'InsertColumnLeft'
                    //tslint:disable-next-line:max-line-length
                    || this.action === 'ClearCells' || this.action === 'InsertColumnRight' || this.action === 'Borders' || this.action === 'TableAutoFitToContents' || this.action === 'TableAutoFitToWindow' ||
                    this.action === 'TableFixedColumnWidth' || this.action === 'RemoveRowTrack' || this.action === 'PasteColumn' || this.action === 'PasteRow' || this.action === 'PasteOverwrite' || this.action === 'PasteNested')) {
                var insertIndex = this.selectionStart;
                var block = this.owner.editorModule.getBlock({ index: insertIndex }).node;
                var lastNode = deletedNodes[deletedNodes.length - 1];
                if ((block instanceof TableWidget || block.previousRenderedWidget instanceof TableWidget || block.isInsideTable)
                    && lastNode instanceof TableWidget) {
                    if (block instanceof ParagraphWidget && !block.isInsideTable) {
                        block = block.previousRenderedWidget;
                    }
                    else if (block instanceof ParagraphWidget && block.isInsideTable) {
                        block = block.associatedCell.ownerTable;
                    }
                    block = block.combineWidget(this.viewer);
                    if (this.owner.enableCollaborativeEditing) {
                        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                        this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, block).position;
                        this.endIndex = this.startIndex + this.owner.selectionModule.getBlockLength(undefined, block, 0, { done: false }, true, undefined, undefined);
                        var operation = this.getDeleteOperation('Delete');
                        if (this.owner.enableTrackChanges) {
                            if (isNullOrUndefined(operation.markerData)) {
                                operation.markerData = {};
                            }
                            operation.markerData.isSkipTracking = true;
                        }
                        this.cellOperation.push(operation);
                    }
                    this.owner.editorModule.insertTableInternal(block, lastNode, false);
                    if (this.action === 'PasteColumn' || this.action === 'PasteRow' || this.action === 'PasteOverwrite' || this.action === 'PasteNested') {
                        this.removedNodes.push(block);
                    }
                    else {
                        deletedNodes.splice(deletedNodes.indexOf(lastNode), 1);
                        // Call the insertRemovedNodes API to insert remining elements that are present in the removed nodes collection.
                        if (deletedNodes.length > 0) {
                            if (!isNullOrUndefined(deletedNodes[deletedNodes.length - 1]) && !isNullOrUndefined(lastNode.nextRenderedWidget) && lastNode.nextRenderedWidget instanceof ParagraphWidget) {
                                this.owner.selectionModule.start.setPositionParagraph(lastNode.nextRenderedWidget.firstChild, 0);
                                this.owner.selectionModule.end.setPositionParagraph(lastNode.nextRenderedWidget.firstChild, 0);
                            }
                            this.insertRemovedNodes(deletedNodes, deletedNodes[deletedNodes.length - 1]);
                        }
                    }
                }
                else if (lastNode instanceof TableWidget && !(this.action === 'RemoveRowTrack')) {
                    this.owner.editorModule.insertBlock(lastNode);
                }
                else {
                    this.insertRemovedNodes(deletedNodes, deletedNodes[deletedNodes.length - 1]);
                }
            }
            else {
                var initialStart = start;
                var block = this.owner.editorModule.getBlock({ index: initialStart }).node;
                // initialStart = blockObj.position;
                if (deletedNodes.length > 0 && (this.action === 'BackSpace' && isEmptySelection
                    || (!(block instanceof TableWidget) && !(block instanceof HeaderFooterWidget)))) {
                    var lastNode = deletedNodes[0];
                    if (lastNode instanceof BodyWidget && !isNullOrUndefined(deletedNodes[1])) {
                        lastNode = deletedNodes[1];
                    }
                    if (this.action === 'TrackingPageBreak' || ((this.action === 'SectionBreak' || this.action === 'SectionBreakContinuous') && lastNode instanceof BodyWidget ||
                        !isNullOrUndefined(this.editorHistory.currentHistoryInfo) &&
                            this.editorHistory.currentHistoryInfo.action === 'PageBreak')) {
                        lastNode = deletedNodes[1];
                    }
                    var skipinsert = false;
                    if (!isNullOrUndefined(this.isAcceptOrReject)) {
                        skipinsert = true;
                        if (!isNullOrUndefined(this.owner.selectionModule.start.paragraph.nextRenderedWidget) && this.owner.selectionModule.start.paragraph.nextRenderedWidget instanceof TableWidget) {
                            skipinsert = false;
                        }
                        else if (this.action === 'BackSpace' && deletedNodes.length == 2 && lastNode instanceof ParagraphWidget && lastNode.isEmpty() && deletedNodes[1] instanceof ParagraphWidget && deletedNodes[1].isEmpty()) {
                            //When selecting the paramark and give backspace then adding two paragraph. So skipping it.
                            skipinsert = false;
                        }
                    }
                    if (lastNode instanceof ParagraphWidget && this.owner.selectionModule.start.offset > 0 && !skipinsert) {
                        if (this.editorHistory && this.editorHistory.currentBaseHistoryInfo && this.editorHistory.currentBaseHistoryInfo.action === 'Paste' && deletedNodes.length === 1) {
                            this.owner.editorModule.insertNewParagraphWidget(lastNode, false);
                        }
                        else {
                            this.owner.editorModule.insertNewParagraphWidget(lastNode, true);
                        }
                        if (lastNode.characterFormat.removedIds.length > 0) {
                            this.owner.editorModule.constructRevisionFromID(lastNode.characterFormat, undefined);
                        }
                        deletedNodes.splice(deletedNodes.indexOf(lastNode), 1);
                        if (isNullOrUndefined(block)) {
                            var nextBlock = this.documentHelper.selection.getNextParagraphBlock(lastNode.getSplitWidgets().pop());
                            this.owner.selectionModule.getNextRenderedBlock(lastNode);
                            var startParagraph = this.owner.selectionModule.start.paragraph;
                            if (nextBlock && startParagraph && startParagraph.bodyWidget instanceof BodyWidget
                                && !startParagraph.isInsideTable && !this.owner.selectionModule.isinEndnote && !this.owner.selectionModule.isinFootnote
                                && !startParagraph.bodyWidget.equals(nextBlock.bodyWidget)) {
                                nextBlock = undefined;
                            }
                            if (isNullOrUndefined(nextBlock)) {
                                //Sets the selection as starting of last paragraph.
                                this.owner.selectionModule.selectParagraphInternal(lastNode, true);
                            }
                        }
                    }
                    if (lastNode instanceof TableWidget && this.owner.selectionModule.start.offset > 0) {
                        var firstBlock = deletedNodes[deletedNodes.length - 1];
                        if (firstBlock instanceof ParagraphWidget) {
                            this.owner.editorModule.insertNewParagraphWidget(firstBlock, true);
                            deletedNodes.splice(deletedNodes.indexOf(firstBlock), 1);
                            if (isNullOrUndefined(block)) {
                                var nextBlock = this.documentHelper.selection.getNextParagraphBlock(firstBlock.getSplitWidgets().pop());
                                if (isNullOrUndefined(nextBlock)) {
                                    //Sets the selection as starting of last paragraph.
                                    this.owner.selectionModule.selectParagraphInternal(firstBlock, true);
                                }
                            }
                        }
                    }
                }
                if (deletedNodes.length > 0) {
                    var firstNode = deletedNodes[deletedNodes.length - 1];
                    if (block instanceof TableWidget) {
                        block = block.combineWidget(this.viewer);
                        if (firstNode instanceof TableWidget) {
                            if (this.owner.enableCollaborativeEditing) {
                                var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                                var startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, block).position;
                                var endIndex = startIndex + this.owner.selectionModule.getBlockLength(undefined, block, 0, { done: false }, true, undefined, undefined);
                                var operation = this.getDeleteOperation('Delete');
                                operation.offset = startIndex;
                                operation.length = endIndex - startIndex;
                                this.cellOperation.push(operation);
                            }
                            this.owner.editorModule.insertTableInternal(block, firstNode, true);
                            deletedNodes.splice(deletedNodes.indexOf(firstNode), 1);
                            this.insertPosition = start;
                            var nextWidget = firstNode.getSplitWidgets().pop();
                            if (nextWidget.nextRenderedWidget instanceof TableWidget) {
                                block = nextWidget.nextRenderedWidget;
                            }
                            else {
                                initialStart = start;
                                block = this.owner.editorModule.getBlock({ index: initialStart }).node;
                            }
                        }
                    }
                    //Checks if first node is paragraph and current insert position is paragraph end.
                    if (firstNode instanceof ParagraphWidget && this.owner.selectionModule.start.offset > 0
                        && this.owner.selectionModule.start.offset === this.owner.selectionModule.getLineLength(this.owner.selectionModule.start.paragraph.lastChild)) {
                        var editor = this.owner.editorModule;
                        editor.insertNewParagraphWidget(firstNode, false);
                        if (firstNode.characterFormat.removedIds.length > 0) {
                            this.owner.editorModule.constructRevisionFromID(firstNode.characterFormat, undefined);
                        }
                        deletedNodes.splice(deletedNodes.indexOf(firstNode), 1);
                        //Removes the intermediate empty paragraph instance.
                        if (this.action !== 'Paste' && this.owner.selectionModule.start.paragraph !== firstNode.containerWidget.lastChild) {
                            editor.removeBlock(this.owner.selectionModule.start.paragraph);
                        }
                        var paragraph = this.documentHelper.selection.getNextParagraphBlock(firstNode.getSplitWidgets().pop());
                        if (!isNullOrUndefined(paragraph) && firstNode !== firstNode.containerWidget.lastChild) {
                            this.owner.selectionModule.selectParagraphInternal(paragraph, true);
                        }
                        else if (!isNullOrUndefined(firstNode)) {
                            this.owner.selectionModule.selectParagraphInternal(firstNode, false);
                        }
                    }
                    else if (deletedNodes[0] instanceof TableWidget && deletedNodes.length !== 1) {
                        var nextNode = deletedNodes[1];
                        if (nextNode instanceof ParagraphWidget && nextNode.isEmpty()) {
                            deletedNodes.splice(deletedNodes.indexOf(nextNode), 1);
                        }
                    }
                }
                if (deletedNodes.length > 0) {
                    if (block instanceof TableWidget) {
                        block = block.combineWidget(this.viewer);
                    }
                    this.insertRemovedNodes(deletedNodes, block, end);
                }
            }
        }
    };
    BaseHistoryInfo.prototype.insertRemovedNodes = function (deletedNodes, block, endIndex) {
        // Use this property to relayout whole document (after complete all insertion intead of each section insertion) when insert section (this functionality already added in insertSection API).
        var isRelayout = false;
        var isSelectionInsideTable = this.owner.selection.start.paragraph.isInsideTable;
        for (var i = deletedNodes.length - 1, index = 0; i > -1; i--) {
            var node = deletedNodes[i];
            // BUG 926010: If multiple blocks are inserted into a single cell, then the entire table will be layout for each block insertion, which may lead to performance issues.
            // Therefore, we should layout the entire table only after the last block insertion.
            if (i === 0) {
                isSelectionInsideTable = false;
            }
            if (this.isHyperlinkField && !isNullOrUndefined(endIndex) && node instanceof FieldElementBox && node.fieldType === 1) {
                // Bug 873011: Updated the selection for field end element insertion on "Accept Change" undo case.
                this.owner.selectionModule.start.setPositionInternal(this.owner.selectionModule.getTextPosBasedOnLogicalIndex(endIndex));
                this.owner.selectionModule.end.setPositionInternal(this.owner.selectionModule.start);
            }
            if (node instanceof ElementBox) {
                this.owner.editorModule.insertInlineInSelection(this.owner.selectionModule, node);
            }
            else if (node instanceof ParagraphWidget && node.childWidgets === undefined) {
                this.owner.selection.moveToNextParagraph();
            }
            else if (node instanceof BlockWidget) {
                if (node instanceof TableRowWidget) {
                    if (block instanceof TableWidget) {
                        block.childWidgets.splice(index, 0, node);
                        this.owner.editorModule.updateNextBlocksIndex(node, true);
                        if (i === 0 || !(deletedNodes[i - 1] instanceof TableRowWidget)) {
                            this.documentHelper.layout.layoutBodyWidgetCollection(block.index, block.containerWidget, block, false);
                        }
                    }
                }
                else if (block instanceof TableWidget && this.action !== 'RemoveRowTrack') {
                    this.owner.editorModule.insertBlockTable(this.owner.selectionModule, node, block);
                }
                else {
                    if (node instanceof ParagraphWidget && !node.isInsideTable && this.action === 'RemoveRowTrack') {
                        this.owner.editorModule.insertNewParagraphWidget(node, false);
                    }
                    else if (node instanceof TableWidget && this.action === 'RemoveRowTrack') {
                        this.owner.editorModule.insertTableInternal(node, node, false, true);
                        if (!isNullOrUndefined(deletedNodes[i - 1]) && !isNullOrUndefined(node.nextRenderedWidget) && node.nextRenderedWidget instanceof ParagraphWidget) {
                            this.owner.selectionModule.start.setPositionParagraph(node.nextRenderedWidget.firstChild, 0);
                            this.owner.selectionModule.end.setPositionParagraph(node.nextRenderedWidget.firstChild, 0);
                        }
                    }
                    else {
                        this.owner.editorModule.insertBlock(node, isSelectionInsideTable);
                    }
                }
            }
            else if (node instanceof WCharacterFormat) {
                var insertIndex = this.selectionStart;
                var wiget = this.owner.editorModule.getBlock({ index: insertIndex }).node;
                if (wiget instanceof ParagraphWidget) {
                    if (node.removedIds.length > 0) {
                        wiget.characterFormat.removedIds = node.removedIds.slice();
                        this.owner.editorModule.constructRevisionFromID(wiget.characterFormat, true);
                    }
                    else if (wiget.characterFormat.revisions.length > 0) {
                        for (var i_1 = 0; i_1 < wiget.characterFormat.revisions.length; i_1++) {
                            var currentRevision = wiget.characterFormat.revisions[i_1];
                            var index_1 = currentRevision.range.indexOf(wiget.characterFormat);
                            if (index_1 !== -1) {
                                currentRevision.range.splice(index_1, 1);
                                this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
                                if (currentRevision.range.length === 0) {
                                    this.owner.revisions.remove(currentRevision);
                                }
                            }
                        }
                        node.ownerBase = wiget;
                        wiget.characterFormat = node;
                    }
                }
            }
            else if (node instanceof BodyWidget) {
                if (!isNullOrUndefined(node.removedHeaderFooters) && node.removedHeaderFooters.length !== 0) {
                    this.owner.documentHelper.headersFooters.splice(node.sectionIndex, 0, node.removedHeaderFooters[0]);
                    node.removedHeaderFooters = undefined;
                }
                isRelayout = true;
                this.owner.editorModule.insertSection(this.owner.selectionModule, false, true, undefined, undefined, node.sectionFormat);
            }
            else if (typeof (node) === 'string' && this.action === 'AcceptTOC') {
                var insertIndex = this.selectionStart;
                var widget = this.owner.editorModule.getBlock({ index: insertIndex }).node;
                var endWidget = this.owner.editorModule.getBlock({ index: this.selectionEnd }).node;
                var currentRevision = this.owner.documentHelper.revisionsInternal.get(node);
                if (this.editorHistory.isUndoing) {
                    while (widget instanceof ParagraphWidget && widget !== endWidget) {
                        this.owner.editorModule.insertRevisionForBlock(widget, currentRevision.revisionType, true, currentRevision);
                        widget = this.documentHelper.selection.getNextParagraphBlock(widget.getSplitWidgets().pop());
                    }
                    this.owner.editorModule.insertRevisionForBlock(endWidget, currentRevision.revisionType, true, currentRevision);
                }
                else {
                    while (currentRevision.range.length > 0) {
                        var item = currentRevision.range[0];
                        var revisionIndex = item.revisions.indexOf(currentRevision);
                        if (revisionIndex >= 0) {
                            item.revisions.splice(revisionIndex, 1);
                            var rangeIndex = currentRevision.range.indexOf(item);
                            currentRevision.range.splice(rangeIndex, 1);
                            this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
                        }
                        if (currentRevision.range.length === 0) {
                            this.owner.revisions.remove(currentRevision);
                        }
                    }
                }
                this.owner.editorModule.addRemovedNodes(currentRevision.revisionID);
            }
        }
        if (isRelayout) {
            this.documentHelper.contentControlCollection = [];
            this.owner.editorModule.layoutWholeDocument(true);
        }
        deletedNodes = [];
    };
    BaseHistoryInfo.prototype.undoRevisionForElements = function (start, end, id) {
        var currentPara = start.paragraph;
        var endPara = end.paragraph;
        var currentRevision = this.documentHelper.revisionsInternal.get(id);
        var startoffset = this.owner.selectionModule.getParagraphInfo(start).offset;
        var endoffset = this.owner.selectionModule.getParagraphInfo(end).offset;
        var isSamePara = start.paragraph === end.paragraph;
        var isSplittedWidget = false;
        if (this.editorHistory.isUndoing) {
            while (currentPara !== endPara) {
                isSplittedWidget = false;
                var endOffset = 0;
                if (!isNullOrUndefined(currentPara.previousSplitWidget)) {
                    startoffset = currentPara.previousSplitWidget.getLength() + 1;
                    endOffset = currentPara.previousSplitWidget.getLength() + currentPara.getLength();
                }
                else {
                    endOffset = currentPara.getLength();
                }
                this.owner.editorModule.applyRevisionForCurrentPara(currentPara, startoffset, endOffset, id, true);
                //Correct the condition to get next widget instead of next widget of next splitted widget
                currentPara = this.documentHelper.selection.getNextParagraphBlock(currentPara);
                if (!isNullOrUndefined(currentPara) && !isNullOrUndefined(currentPara.previousRenderedWidget) && currentPara.previousRenderedWidget instanceof ParagraphWidget && currentPara.previousRenderedWidget.nextSplitWidget && currentPara === endPara) {
                    isSplittedWidget = true;
                }
                if (currentPara !== endPara) {
                    startoffset = 0;
                }
            }
            if (currentPara === endPara) {
                if (!isSamePara) {
                    startoffset = 0;
                }
                // Update the startoffset to the paragraph end if next paragraph is splitted widget
                if (isSplittedWidget) {
                    startoffset = currentPara.previousRenderedWidget.getLength();
                }
                this.owner.editorModule.applyRevisionForCurrentPara(currentPara, startoffset, endoffset, id, false);
            }
        }
        else {
            while (currentRevision.range.length > 0) {
                var item = currentRevision.range[0];
                var revisionIndex = item.revisions.indexOf(currentRevision);
                if (revisionIndex >= 0) {
                    item.revisions.splice(revisionIndex, 1);
                    var rangeIndex = currentRevision.range.indexOf(item);
                    currentRevision.range.splice(rangeIndex, 1);
                }
                if (currentRevision.range.length === 0) {
                    this.owner.revisions.remove(currentRevision);
                }
                if (currentPara.characterFormat.revisions.length > 0 && this.editorHistory.isRedoing) {
                    for (var i = 0; i < currentPara.characterFormat.revisions.length; i++) {
                        var revision = currentPara.characterFormat.revisions[i];
                        if (revision.range.length === 0) {
                            currentPara.characterFormat.revisions.splice(i, 1);
                            i--;
                        }
                    }
                }
            }
        }
        this.owner.trackChangesPane.updateCurrentTrackChanges(currentRevision);
        this.removedNodes.push(id);
    };
    BaseHistoryInfo.prototype.revertResizing = function () {
        this.editorHistory.currentBaseHistoryInfo = this;
        if (this.action === 'RowResizing') {
            if (this.modifiedProperties[0] instanceof RowHistoryFormat) {
                var prevRowHistoryFormat = this.modifiedProperties[0];
                var position = prevRowHistoryFormat.tableHierarchicalIndex;
                var block = this.owner.editorModule.getBlock({ index: position }).node;
                if (block instanceof TableWidget) {
                    this.modifiedProperties[0].revertChanges(this.editorHistory.isRedoing, this.owner, block);
                }
            }
        }
        else {
            if (this.modifiedProperties[0] instanceof TableHistoryInfo) {
                //selected cell resizing the condition checks done based on the selected widgets only. so need to highlight the selection.
                if (this.owner.selectionModule.selectedWidgets.length === 0) {
                    this.owner.selectionModule.highlightSelection(true);
                }
                var prevTableHistoryInfo = this.modifiedProperties[0];
                var position = prevTableHistoryInfo.tableHierarchicalIndex;
                var block = this.owner.editorModule.getBlock({ index: position }).node;
                if (block instanceof TableWidget) {
                    var tableResize = this.owner.editorModule.tableResize;
                    this.owner.editorModule.setOffsetValue(this.owner.selectionModule);
                    block = block.combineWidget(this.owner.viewer);
                    tableResize.currentResizingTable = block;
                    this.modifiedProperties.splice(0, 1);
                    if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
                        var tableHistoryInfoCurrent = new TableHistoryInfo(block, this.owner);
                        this.modifiedProperties.splice(0, 0, tableHistoryInfoCurrent);
                        this.owner.isLayoutEnabled = false;
                        tableResize.applyProperties(tableResize.currentResizingTable, prevTableHistoryInfo);
                        tableResize.currentResizingTable.isGridUpdated = true;
                        this.owner.isLayoutEnabled = true;
                        tableResize.updateGridValue(tableResize.currentResizingTable, false);
                        prevTableHistoryInfo.destroy();
                        prevTableHistoryInfo = undefined;
                    }
                }
            }
        }
    };
    BaseHistoryInfo.prototype.revertTableDialogProperties = function (action) {
        this.owner.isShiftingEnabled = false;
        this.editorHistory.currentBaseHistoryInfo = this;
        this.currentPropertyIndex = 0;
        if (action === 'CellOptions') {
            var selection = this.owner.selectionModule;
            var cellFormat = this.modifiedProperties[0];
            this.owner.editorModule.updateCellMargins(selection, cellFormat);
        }
        else if (action === 'TableOptions') {
            this.owner.tableOptionsDialogModule.applyTableOptionsHelper(this.modifiedProperties[0]);
        }
        this.currentPropertyIndex = 0;
        this.owner.isShiftingEnabled = true;
    };
    BaseHistoryInfo.prototype.addModifiedPropertiesForSection = function (format, property, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var modifiedProperties = this.modifiedProperties;
            var previousFormat = (this.currentPropertyIndex < modifiedProperties.length ?
                modifiedProperties[this.currentPropertyIndex] : modifiedProperties[modifiedProperties.length - 1]);
            if (isNullOrUndefined(property)) {
                value = previousFormat;
                if (this.currentPropertyIndex < this.modifiedProperties.length) {
                    this.modifiedProperties[this.currentPropertyIndex] = format.cloneFormat();
                }
                else {
                    this.modifiedProperties[this.modifiedProperties.length - 1] = format.cloneFormat();
                }
            }
            else {
                value = previousFormat.getPropertyValue(property);
                previousFormat.copyFormat(format);
            }
            this.currentPropertyIndex++;
        }
        else {
            if (isNullOrUndefined(property)) {
                this.modifiedProperties.push(format.cloneFormat());
            }
            else {
                var currentFormat = new WSectionFormat();
                currentFormat.copyFormat(format);
                this.modifiedProperties.push(currentFormat);
            }
        }
        return value;
    };
    BaseHistoryInfo.prototype.addModifiedProperties = function (format, property, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            var skipRemove = false;
            if (format.ownerBase instanceof ElementBox) {
                var prevLength = this.modifiedNodeLength[this.currentPropertyIndex];
                if (format.ownerBase.length < prevLength) {
                    skipRemove = true;
                    this.modifiedNodeLength[this.currentPropertyIndex] = format.ownerBase.length;
                    this.modifiedNodeLength.splice(this.currentPropertyIndex + 1, 0, prevLength - format.ownerBase.length);
                    //Adds a copy of character format at next position for splitted inline.
                    var nextFormat = new WCharacterFormat(undefined);
                    nextFormat.copyFormat(previousFormat);
                    this.modifiedProperties.splice(this.currentPropertyIndex + 1, 0, nextFormat);
                }
            }
            if (this.action === 'ClearCharacterFormat') {
                if (this.editorHistory.isUndoing) {
                    value = previousFormat;
                    if (!skipRemove) {
                        this.modifiedProperties.splice(this.currentPropertyIndex, 1);
                        this.currentPropertyIndex--;
                    }
                }
                else {
                    this.modifiedProperties.push(format.cloneFormat());
                }
            }
            else {
                value = previousFormat;
                if (this.currentPropertyIndex < this.modifiedProperties.length) {
                    this.modifiedProperties[this.currentPropertyIndex] = format.cloneFormat();
                }
                else {
                    this.modifiedProperties[this.modifiedProperties.length - 1] = format.cloneFormat();
                }
            }
            this.currentPropertyIndex++;
        }
        else {
            if (isNullOrUndefined(property)) {
                this.modifiedProperties.push(format.cloneFormat());
            }
            else {
                var currentFormat = new WCharacterFormat(undefined);
                currentFormat.copyFormat(format);
                this.modifiedProperties.push(currentFormat);
            }
            if (format.ownerBase instanceof ElementBox) {
                this.modifiedNodeLength.push(format.ownerBase.length);
            }
            else {
                this.modifiedNodeLength.push(0);
            }
        }
        return value;
    };
    /**
     * build character Operation for undo/redo
     *
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.buildCharacterFormatOperation = function (widget, format) {
        var position = this.owner.selectionModule.getElementPosition(widget, true).startPosition;
        var start = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(position);
        position.offset += widget.length;
        var end = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(position);
        var characterData = this.owner.sfdtExportModule.writeCharacterFormat(format, 0, true);
        var operation = {
            action: 'Format',
            offset: start,
            length: end - start,
            format: JSON.stringify(characterData),
            type: 'CharacterFormat',
        };
        this.modifiedFormatOperation.push(operation);
    };
    BaseHistoryInfo.prototype.addModifiedPropertiesForParagraphFormat = function (format, property, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            if (this.action === 'ClearParagraphFormat') {
                if (this.editorHistory.isUndoing) {
                    value = previousFormat;
                    this.modifiedProperties.splice(this.currentPropertyIndex, 1);
                    this.currentPropertyIndex--;
                }
                else {
                    this.modifiedProperties.push(format.cloneFormat());
                }
                this.currentPropertyIndex++;
                return value;
            }
            if (isNullOrUndefined(property)) {
                value = previousFormat;
                if (this.currentPropertyIndex < this.modifiedProperties.length) {
                    this.modifiedProperties[this.currentPropertyIndex] = format.cloneFormat();
                }
                else {
                    this.modifiedProperties[this.modifiedProperties.length - 1] = format.cloneFormat();
                }
                this.currentPropertyIndex++;
                return value;
            }
            if (property === 'listFormat') {
                value = new WParagraphFormat(undefined);
                value.copyFormat(previousFormat);
                previousFormat.listFormat = new WListFormat(previousFormat);
                previousFormat.listFormat.copyFormat(format.listFormat);
                this.currentPropertyIndex++;
                return value;
            }
            if (property === 'tabStop') {
                value = [];
                for (var i = 0; i < previousFormat.tabs.length; i++) {
                    value.push(previousFormat.tabs[i]);
                }
                var currentFormat = new WParagraphFormat(undefined);
                currentFormat.copyFormat(format);
                this.modifiedProperties[this.currentPropertyIndex] = currentFormat;
                this.currentPropertyIndex++;
                return value;
            }
            if (property === 'styleName') {
                if (!isNullOrUndefined(previousFormat.baseStyle)) {
                    value = new WParagraphStyle();
                    value.copyStyle(previousFormat.baseStyle);
                    this.currentPropertyIndex++;
                    if (!isNullOrUndefined(format.baseStyle)) {
                        previousFormat.baseStyle = new WParagraphStyle();
                        previousFormat.baseStyle.copyStyle(format.baseStyle);
                    }
                    return value;
                }
                else {
                    if (!isNullOrUndefined(format.baseStyle)) {
                        previousFormat.baseStyle = new WParagraphStyle();
                        previousFormat.baseStyle.copyStyle(format.baseStyle);
                    }
                    return undefined;
                }
            }
            if (property === 'borders') {
                value = previousFormat.borders.cloneFormat();
            }
            else if (this.action.indexOf('Border') >= 0) {
                value = previousFormat.borders.getBorder(property.replace('Border', ''));
            }
            else {
                value = previousFormat.getPropertyValue(property);
            }
            previousFormat.copyFormat(format);
            this.currentPropertyIndex++;
        }
        else {
            if (isNullOrUndefined(property)) {
                this.modifiedProperties.push(format.cloneFormat());
            }
            else {
                var currentFormat = new WParagraphFormat(undefined);
                currentFormat.copyFormat(format);
                this.modifiedProperties.push(currentFormat);
            }
        }
        return value;
    };
    /**
     * build paragraph Operation for undo/redo
     *
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.getParagraohFormatOperation = function (paragarph, format) {
        var _a;
        if ((this.modifiedProperties.length > 1 || this.modifiedFormatOperation.length > 0) && !isNullOrUndefined(paragarph)) {
            var position = this.owner.selectionModule.setPositionForBlock(paragarph, true);
            this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(position);
            this.endIndex = this.startIndex + this.owner.selectionModule.getBlockLength(undefined, paragarph, 0, { done: false }, true, undefined, undefined) - 1;
            this.insertedFormat = format;
            (_a = this.modifiedFormatOperation).push.apply(_a, this.getActionInfo(true));
        }
    };
    BaseHistoryInfo.prototype.addModifiedPropertiesForContinueNumbering = function (paragraphFormat, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            value = previousFormat;
            if (this.currentPropertyIndex < this.modifiedProperties.length) {
                this.modifiedProperties[this.currentPropertyIndex] = paragraphFormat.cloneFormat();
            }
            else {
                this.modifiedProperties[this.modifiedProperties.length - 1] = paragraphFormat.cloneFormat();
            }
            this.currentPropertyIndex++;
            return value;
        }
        else {
            var currentFormat = new WParagraphFormat();
            currentFormat.copyFormat(paragraphFormat);
            this.modifiedProperties.push(currentFormat);
        }
        return value;
    };
    BaseHistoryInfo.prototype.addModifiedPropertiesForRestartNumbering = function (listFormat, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var listId = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            value = listId;
            if (this.currentPropertyIndex < this.modifiedProperties.length) {
                this.modifiedProperties[this.currentPropertyIndex] = listFormat.listId;
            }
            else {
                this.modifiedProperties[this.modifiedProperties.length - 1] = listFormat.listId;
            }
            this.currentPropertyIndex++;
            return value;
        }
        else {
            this.modifiedProperties.push(listFormat.listId);
        }
        return value;
    };
    BaseHistoryInfo.prototype.addModifiedPropertiesForList = function (listLevel) {
        var value;
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousLevel = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            value = previousLevel;
            previousLevel = new ModifiedLevel(listLevel, this.owner.editorModule.cloneListLevel(listLevel));
            if (this.currentPropertyIndex < this.modifiedProperties.length) {
                this.modifiedProperties[this.currentPropertyIndex] = previousLevel;
            }
            else {
                this.modifiedProperties[this.modifiedProperties.length - 1] = previousLevel;
            }
            this.currentPropertyIndex++;
        }
        else {
            this.modifiedProperties.push(new ModifiedLevel(listLevel, this.owner.editorModule.cloneListLevel(listLevel)));
            value = listLevel;
        }
        return value;
    };
    BaseHistoryInfo.prototype.revertProperties = function () {
        this.editorHistory.currentBaseHistoryInfo = this;
        this.currentPropertyIndex = 0;
        var property = this.getProperty();
        this.viewer.owner.editorModule.setOffsetValue(this.documentHelper.selection);
        if (this.action === 'ClearCharacterFormat' || this.modifiedProperties[0] instanceof WCharacterFormat) {
            if (this.action === 'ListCharacterFormat') {
                this.owner.editorModule.updateListCharacterFormat(this.documentHelper.selection, property, undefined);
                return;
            }
            this.owner.editorModule.updateSelectionCharacterFormatting(property, undefined, false);
        }
        else if (this.action === 'ClearParagraphFormat' || this.modifiedProperties[0] instanceof WParagraphFormat) {
            if (this.action === 'ContinueNumbering') {
                this.owner.editorModule.revertContinueNumbering(this.owner.selectionModule, this.modifiedProperties[0]);
                return;
            }
            if (this.action === 'StyleName' && this.modifiedProperties[0] instanceof WParagraphFormat) {
                this.owner.editorModule.updateSelectionParagraphFormatting(property, this.modifiedProperties[0].baseStyle, false);
                return;
            }
            this.owner.editorModule.setPreviousBlockToLayout();
            this.owner.editorModule.updateSelectionParagraphFormatting(property, undefined, false);
        }
        else if (this.action === 'LinkToPrevious' && this.modifiedProperties[0] instanceof WSectionFormat) {
            var sectionIndex = parseInt(this.selectionStart.split(';')[0]);
            this.owner.editorModule.updateHeaderFooters(property, undefined, sectionIndex, this.modifiedProperties[0].removedHeaderFooters[0]);
        }
        else if (this.modifiedProperties[0] instanceof WSectionFormat) {
            this.owner.editorModule.updateSectionFormat(property, undefined);
        }
        else if (this.action === 'RestartNumbering') {
            this.owner.editorModule.restartListAtInternal(this.owner.selectionModule, this.modifiedProperties[0]);
            return;
        }
        else if (this.modifiedProperties[0] instanceof ImageSizeInfo) {
            var imageInfo = this.modifiedProperties[0];
            this.insertedData = { width: HelperMethods.convertPixelToPoint(imageInfo.width), height: HelperMethods.convertPixelToPoint(imageInfo.height), alternativeText: imageInfo.alternatetext };
            this.owner.selectionModule.updateImageSize(imageInfo);
        }
        else if (this.modifiedProperties[0] instanceof ModifiedLevel) {
            var modified = new Dictionary();
            for (var i = 0; i < this.modifiedProperties.length; i++) {
                var modifiedLevel = this.modifiedProperties[i];
                // modified.modifiedLevels.add(modifiedLevel.ownerListLevel.levelNumber, modifiedLevel);
                modified.add(i, modifiedLevel);
            }
            this.editorHistory.updateListChanges(modified);
            modified.destroy();
            modified = undefined;
        }
        else if (this.modifiedProperties[0] instanceof WTableFormat) {
            this.owner.editorModule.updateTableFormat(this.owner.selectionModule, property, undefined);
        }
        else if (this.modifiedProperties[0] instanceof WCellFormat) {
            this.owner.isShiftingEnabled = true;
            this.owner.editorModule.updateCellFormat(this.owner.selectionModule, property, undefined);
        }
        else if (this.modifiedProperties[0] instanceof WRowFormat) {
            this.owner.editorModule.updateRowFormat(this.owner.selectionModule, property, undefined);
        }
        else if (this.action === 'ModifyStyle') {
            var styleObject = this.modifiedProperties.pop();
            this.owner.editor.updateStyleObject(styleObject);
        }
        this.currentPropertyIndex = 0;
        if (this.action === 'ClearCharacterFormat' || this.action === 'ClearParagraphFormat') {
            this.owner.editorModule.getOffsetValue(this.documentHelper.selection);
        }
        this.owner.editorModule.startParagraph = undefined;
        this.owner.editorModule.endParagraph = undefined;
    };
    BaseHistoryInfo.prototype.addModifiedCellOptions = function (applyFormat, format, table) {
        var currentFormat;
        if (isNullOrUndefined(applyFormat.bottomMargin) && isNullOrUndefined(applyFormat.topMargin)
            && isNullOrUndefined(applyFormat.rightMargin) && isNullOrUndefined(applyFormat.leftMargin)) {
            currentFormat = this.copyCellOptions(table.tableFormat);
        }
        else {
            currentFormat = this.copyCellOptions(applyFormat);
        }
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            format = previousFormat;
            if (this.currentPropertyIndex < this.modifiedProperties.length) {
                this.modifiedProperties[this.currentPropertyIndex] = this.copyCellOptions(applyFormat);
            }
            else {
                this.modifiedProperties[this.modifiedProperties.length - 1] = this.copyCellOptions(applyFormat);
            }
            this.currentPropertyIndex++;
            return format;
        }
        else {
            this.modifiedProperties.push(currentFormat);
        }
        return format;
    };
    BaseHistoryInfo.prototype.copyCellOptions = function (format) {
        var cellFormat = new WCellFormat();
        cellFormat.topMargin = format.topMargin;
        cellFormat.rightMargin = format.rightMargin;
        cellFormat.bottomMargin = format.bottomMargin;
        cellFormat.leftMargin = format.leftMargin;
        return cellFormat;
    };
    BaseHistoryInfo.prototype.addModifiedTableOptions = function (format) {
        var currentFormat = this.copyTableOptions(format);
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            if (this.currentPropertyIndex < this.modifiedProperties.length) {
                this.modifiedProperties.splice(this.currentPropertyIndex, 1, currentFormat);
            }
            else {
                this.modifiedProperties.splice(this.modifiedProperties.length - 1, 1, currentFormat);
            }
            this.currentPropertyIndex++;
        }
        else {
            this.modifiedProperties.push(currentFormat);
        }
    };
    BaseHistoryInfo.prototype.copyTableOptions = function (format) {
        var tableFormat = new WTableFormat();
        tableFormat.topMargin = format.topMargin;
        tableFormat.rightMargin = format.rightMargin;
        tableFormat.bottomMargin = format.bottomMargin;
        tableFormat.leftMargin = format.leftMargin;
        tableFormat.cellSpacing = format.cellSpacing;
        return tableFormat;
    };
    BaseHistoryInfo.prototype.getProperty = function () {
        switch (this.action) {
            case 'Bold':
                return 'bold';
            case 'Italic':
                return 'italic';
            case 'FontColor':
                return 'fontColor';
            case 'FontFamily':
                return 'fontFamily';
            case 'FontSize':
                return 'fontSize';
            case 'HighlightColor':
                return 'highlightColor';
            case 'BaselineAlignment':
                return 'baselineAlignment';
            case 'Strikethrough':
                return 'strikethrough';
            case 'Underline':
                return 'underline';
            case 'AfterSpacing':
                return 'afterSpacing';
            case 'BeforeSpacing':
                return 'beforeSpacing';
            case 'LeftIndent':
                return 'leftIndent';
            case 'RightIndent':
                return 'rightIndent';
            case 'FirstLineIndent':
                return 'firstLineIndent';
            case 'LineSpacingType':
                return 'lineSpacingType';
            case 'LineSpacing':
                return 'lineSpacing';
            case 'TextAlignment':
                return 'textAlignment';
            case 'ListFormat':
                return 'listFormat';
            case 'PageHeight':
                return 'pageHeight';
            case 'PageWidth':
                return 'pageWidth';
            case 'DifferentOddAndEvenPages':
                return 'differentOddAndEvenPages';
            case 'TableAlignment':
                return 'tableAlignment';
            case 'TableLeftIndent':
                return 'leftIndent';
            case 'DefaultCellSpacing':
                return 'cellSpacing';
            case 'LeftMargin':
            case 'CellLeftMargin':
            case 'DefaultCellLeftMargin':
                return 'leftMargin';
            case 'RightMargin':
            case 'CellRightMargin':
            case 'DefaultCellRightMargin':
                return 'rightMargin';
            case 'TopMargin':
            case 'CellTopMargin':
            case 'DefaultCellTopMargin':
                return 'topMargin';
            case 'BottomMargin':
            case 'CellBottomMargin':
            case 'DefaultCellBottomMargin':
                return 'bottomMargin';
            case 'CellContentVerticalAlignment':
                return 'verticalAlignment';
            case 'RowHeight':
                return 'height';
            case 'RowHeightType':
                return 'heightType';
            case 'RowHeader':
                return 'isHeader';
            case 'AllowBreakAcrossPages':
                return 'allowBreakAcrossPages';
            case 'TablePreferredWidth':
            case 'CellPreferredWidth':
                return 'preferredWidth';
            case 'TablePreferredWidthType':
            case 'CellPreferredWidthType':
                return 'preferredWidthType';
            case 'Shading':
                return 'shading';
            case 'StyleName':
                return 'styleName';
            case 'ParagraphBidi':
            case 'TableBidi':
                return 'bidi';
            case 'ContextualSpacing':
                return 'contextualSpacing';
            case 'LinkToPrevious':
                return 'linkToPrevious';
            case 'LeftBorder':
            case 'TopBorder':
            case 'RightBorder':
            case 'BottomBorder':
            case 'HorizontalBorder':
            case 'VerticalBorder':
            case 'Borders':
                return (this.action[0].toLowerCase() + this.action.slice(1));
            case 'TabStop':
                return 'tabStop';
        }
        return undefined;
    };
    BaseHistoryInfo.prototype.getCharacterPropertyValue = function (property, modifiedProperty) {
        var value;
        if (property === 'bold') {
            value = modifiedProperty.bold;
        }
        else if (property === 'italic') {
            value = modifiedProperty.italic;
        }
        else if (property === 'fontColor') {
            value = modifiedProperty.fontColor;
        }
        else if (property === 'fontFamily') {
            value = modifiedProperty.fontFamily;
        }
        else if (property === 'fontSize') {
            value = modifiedProperty.fontSize;
        }
        else if (property === 'highlightColor') {
            value = modifiedProperty.highlightColor;
        }
        else if (property === 'baselineAlignment') {
            value = modifiedProperty.baselineAlignment;
        }
        else if (property === 'strikethrough') {
            value = modifiedProperty.strikethrough;
        }
        else if (property === 'underline') {
            value = modifiedProperty.underline;
        }
        return value;
    };
    BaseHistoryInfo.prototype.addModifiedTableProperties = function (format, property, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousTableFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            if (isNullOrUndefined(property)) {
                value = previousTableFormat;
                if (this.currentPropertyIndex < this.modifiedProperties.length) {
                    this.modifiedProperties[this.currentPropertyIndex] = format.cloneFormat();
                }
                else {
                    this.modifiedProperties[this.modifiedProperties.length - 1] = format.cloneFormat();
                }
                this.currentPropertyIndex++;
                return value;
            }
            if (property === 'shading') {
                value = previousTableFormat.shading;
            }
            else {
                value = previousTableFormat.getPropertyValue(property);
            }
            previousTableFormat.copyFormat(format);
            this.currentPropertyIndex++;
        }
        else {
            var currentFormat = new WTableFormat();
            currentFormat.copyFormat(format);
            this.modifiedProperties.push(currentFormat);
        }
        return value;
    };
    BaseHistoryInfo.prototype.addModifiedRowProperties = function (rowFormat, property, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            if (this.owner.enableCollaborativeEditing && this.modifiedProperties.length > 1 && rowFormat.ownerBase) {
                var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                var startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, rowFormat.ownerBase).position;
                var endIndex = startIndex + 1;
                var rowData = {};
                if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                    this.owner.sfdtExportModule.assignRowFormat(rowData, previousFormat, 0);
                }
                var operation = {
                    action: 'Format',
                    offset: startIndex,
                    length: endIndex - startIndex,
                    format: JSON.stringify(rowData),
                    type: 'RowFormat',
                };
                this.modifiedFormatOperation.push(operation);
            }
            if (isNullOrUndefined(property)) {
                value = previousFormat;
                if (this.currentPropertyIndex < this.modifiedProperties.length) {
                    this.modifiedProperties[this.currentPropertyIndex] = rowFormat.cloneFormat();
                }
                else {
                    this.modifiedProperties[this.modifiedProperties.length - 1] = rowFormat.cloneFormat();
                }
                this.currentPropertyIndex++;
                return value;
            }
            value = previousFormat.getPropertyValue(property);
            previousFormat.copyFormat(rowFormat);
            this.currentPropertyIndex++;
        }
        else {
            var currentFormat = new WRowFormat();
            currentFormat.copyFormat(rowFormat);
            this.modifiedProperties.push(currentFormat);
        }
        return value;
    };
    BaseHistoryInfo.prototype.addModifiedCellProperties = function (cellFormat, property, value) {
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            var previousFormat = (this.currentPropertyIndex < this.modifiedProperties.length ? this.modifiedProperties[this.currentPropertyIndex] : this.modifiedProperties[this.modifiedProperties.length - 1]);
            if (isNullOrUndefined(property)) {
                value = previousFormat;
                if (this.currentPropertyIndex < this.modifiedProperties.length) {
                    this.modifiedProperties[this.currentPropertyIndex] = cellFormat.cloneFormat();
                }
                else {
                    this.modifiedProperties[this.modifiedProperties.length - 1] = cellFormat.cloneFormat();
                }
                this.currentPropertyIndex++;
                return value;
            }
            if (property === 'shading') {
                value = previousFormat.shading;
            }
            else {
                value = previousFormat.getPropertyValue(property);
            }
            previousFormat.copyFormat(cellFormat);
            this.currentPropertyIndex++;
        }
        else {
            var currentFormat = new WCellFormat();
            currentFormat.copyFormat(cellFormat);
            this.modifiedProperties.push(currentFormat);
        }
        return value;
    };
    /**
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.destroy = function () {
        this.selectionStart = undefined;
        this.selectionEnd = undefined;
        this.insertPosition = undefined;
        this.endPosition = undefined;
        if (!isNullOrUndefined(this.modifiedNodeLength)) {
            this.modifiedNodeLength = [];
            this.modifiedNodeLength = undefined;
        }
        if (!isNullOrUndefined(this.modifiedProperties)) {
            for (var i = 0; i < this.modifiedProperties.length; i++) {
                var property = this.modifiedProperties[i];
                if (property instanceof WCharacterFormat) {
                    property.destroy();
                }
                else if (property instanceof WParagraphFormat) {
                    property.destroy();
                }
                else if (property instanceof WSectionFormat) {
                    property.destroy();
                }
                else if (property instanceof ModifiedLevel) {
                    property.destroy();
                }
                this.modifiedProperties.splice(this.modifiedProperties.indexOf(property), 1);
                i--;
            }
            this.modifiedPropertiesIn = undefined;
        }
        if (!isNullOrUndefined(this.removedNodes)) {
            for (var i = 0; i < this.removedNodes.length; i++) {
                var node = this.removedNodes[i];
                if (node instanceof ParagraphWidget) {
                    node.destroyInternal(this.viewer);
                }
                else if (node instanceof ElementBox && !(node instanceof CommentCharacterElementBox)) {
                    node.destroy();
                }
                this.removedNodes.splice(this.removedNodes.indexOf(node), 1);
                i--;
            }
            this.removedNodesIn = undefined;
        }
        if (!isNullOrUndefined(this.insertedNodes)) {
            for (var i = 0; i < this.insertedNodes.length; i++) {
                var node = this.insertedNodes[i];
                if (node instanceof ParagraphWidget) {
                    node.destroyInternal(this.viewer);
                }
                else if (node instanceof ElementBox && !(node instanceof CommentCharacterElementBox)) {
                    node.destroy();
                }
                this.insertedNodes.splice(this.insertedNodes.indexOf(node), 1);
                i--;
            }
            this.insertedNodes = undefined;
        }
        this.ownerIn = undefined;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.recordInsertRevisionDeletetion = function (widget, startOffset, endOffset) {
        if (this.startIndex > this.endIndex) {
            var temp = this.startIndex;
            this.startIndex = this.endIndex;
            this.endIndex = temp;
        }
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        if (widget instanceof TextElementBox || widget instanceof ImageElementBox || widget instanceof FieldElementBox || widget instanceof BookmarkElementBox) {
            if (widget.revisions.length > 0) {
                var currentStart = this.owner.selectionModule.getElementPosition(widget, true).startPosition;
                startOffset = isNullOrUndefined(startOffset) ? 0 : startOffset;
                endOffset = isNullOrUndefined(endOffset) ? widget.length : endOffset;
                currentStart.setPositionParagraph(widget.line, startOffset + currentStart.offset);
                this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(currentStart);
                this.endIndex = this.startIndex + endOffset;
                var revision = this.owner.editorModule.retrieveRevisionInOder(widget);
                var currentUser = this.owner.currentUser === '' ? 'Guest user' : this.owner.currentUser;
                if (revision.revisionType === 'Insertion' && revision.author !== currentUser) {
                    this.revisionOperation.push(this.getFormatOperation());
                }
                else if (revision.revisionType === 'Insertion') {
                    var operation = this.getDeleteOperation('Delete', undefined, undefined);
                    this.revisionOperation.push(operation);
                    endIndex -= operation.length;
                }
                else if (revision.revisionType === 'Deletion') {
                    if (revision.author !== currentUser) {
                        var operation = this.getFormatOperation(widget);
                        if (widget.removedIds.length > 0) {
                            for (var i = 0; i < widget.removedIds.length; i++) {
                                if (!isNullOrUndefined(operation.markerData.removedIds)) {
                                    operation.markerData.removedIds = [];
                                }
                                operation.markerData.removedIds.push(widget.removedIds[i]);
                            }
                        }
                        this.revisionOperation.push(operation);
                    }
                }
            }
        }
        else if (widget instanceof ParagraphWidget) {
            var isAllRevision = true;
            for (var i = 0; i < widget.childWidgets.length; i++) {
                var line = widget.childWidgets[i];
                if (line.children.length === 0) {
                    isAllRevision = false;
                }
                for (var j = 0; j < line.children.length; j++) {
                    var element = line.children[j];
                    if (element.revisions.length <= 0) {
                        isAllRevision = false;
                    }
                    else if (element.revisions[0].revisionType !== 'Insertion') {
                        isAllRevision = false;
                    }
                }
            }
            if (isAllRevision) {
                var position = new TextPosition(this.owner);
                position.setPositionParagraph(widget.childWidgets[0], 0);
                this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(position);
                var length_1 = this.owner.selectionModule.getBlockLength(undefined, widget, 0, { done: false }, true, undefined, undefined);
                var currentUser = this.owner.currentUser === '' ? 'Guest user' : this.owner.currentUser;
                var revision = this.owner.editorModule.retrieveRevisionInOder(widget.childWidgets[0].children[0]);
                if (currentUser === revision.author) {
                    this.endIndex = this.startIndex + length_1;
                    this.revisionOperation.push(this.getDeleteOperation(this.action, undefined, this.getRemovedText(widget)));
                    endIndex -= length_1;
                }
            }
            else {
                for (var i = 0; i < widget.childWidgets.length; i++) {
                    for (var j = 0; j < widget.childWidgets[i].children.length; j++) {
                        this.recordInsertRevisionDeletetion(widget.childWidgets[i].children[j]);
                        startIndex = this.startIndex;
                        endIndex = this.endIndex;
                    }
                }
            }
        }
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.getDeleteOperationsForTrackChanges = function () {
        var operations = [];
        var startIndex = this.startIndex;
        var endIndex = this.endIndex;
        var insertIndex = this.insertIndex;
        var isInsertRevision = false;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
        for (var i = 0; i < this.revisionOperation.length; i++) {
            if (this.revisionOperation[i].action == 'Format' && isNullOrUndefined(this.revisionOperation[i].markerData)) {
                this.revisionOperation[i].markerData = this.markerData.pop();
            }
            operations.push(this.revisionOperation[i]);
        }
        for (var i = this.removedNodes.length - 1; i >= 0; i--) {
            var element = this.removedNodes[i];
            if (element instanceof TextElementBox || element instanceof ImageElementBox || element instanceof FieldElementBox || element instanceof BookmarkElementBox) {
                if (element.removedIds.length === 0) {
                    var operation = this.getFormatOperation();
                    if (!isNullOrUndefined(operation.markerData)) {
                        for (var j = 0; j < this.markerData.length; j++) {
                            if (this.markerData[j].revisionType === 'Deletion') {
                                if (isNullOrUndefined(operation.markerData.splittedRevisions)) {
                                    operation.markerData.splittedRevisions = [];
                                }
                                if (this.checkValidRevision(this.markerData[j].revisionId)) {
                                    operation.markerData.splittedRevisions.push(this.markerData[j]);
                                }
                                this.markerData.splice(j, 1);
                                j--;
                            }
                        }
                    }
                    operations.push(operation);
                    break;
                }
            }
            else if (element instanceof ParagraphWidget) {
                if (element.characterFormat.revisions.length > 0) {
                    operations.push(this.getDeleteOperation(this.action));
                }
                else if (element.characterFormat.removedIds.length > 0) {
                    var operation = this.getDeleteOperation(this.action);
                    if (!isNullOrUndefined(this.isAcceptOrReject)) {
                        operation.markerData.isAcceptOrReject = this.isAcceptOrReject;
                    }
                    operations.push(operation);
                    var position = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.insertPosition);
                    if (!position.isAtParagraphStart) {
                        //When accept the delete revision if paragraph is not start then paragraph is combining.
                        var endIndex_1 = this.endIndex;
                        this.endIndex = this.startIndex;
                        operations.push(this.getDeleteOperation('Delete'));
                        this.endIndex = endIndex_1;
                    }
                    break;
                }
                else if (element.characterFormat.revisions.length === 0) {
                    var operation = this.getFormatOperation();
                    for (var j = 0; j < this.markerData.length; j++) {
                        if (this.markerData[j].revisionType === 'Deletion') {
                            if (isNullOrUndefined(operation.markerData.splittedRevisions)) {
                                operation.markerData.splittedRevisions = [];
                            }
                            if (this.checkValidRevision(this.markerData[j].revisionId)) {
                                operation.markerData.splittedRevisions.push(this.markerData[j]);
                            }
                            this.markerData.splice(j, 1);
                            j--;
                        }
                    }
                    this.markerData = [];
                    operations.push(operation);
                    break;
                }
            }
        }
        return operations;
    };
    BaseHistoryInfo.prototype.checkValidRevision = function (revisionID) {
        for (var i = 0; i < this.owner.revisions.changes.length; i++) {
            if (this.owner.revisions.changes[i].revisionID === revisionID) {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.getDeleteOperationForTrackChanges = function (element) {
        var operation;
        if (element instanceof TextElementBox || element instanceof ImageElementBox || element instanceof FieldElementBox || element instanceof BookmarkElementBox) {
            if (element.removedIds.length === 0) {
                operation = this.getFormatOperation(element);
            }
            else if (element.removedIds.length > 0) {
                var revisionId = element.removedIds[0];
                var revision = this.owner.editorModule.getRevision(revisionId);
                var currentUser = this.owner.currentUser === '' ? 'Guest user' : this.owner.currentUser;
                if (revision.revisionType === 'Insertion' && revision.author !== currentUser) {
                    operation = this.getFormatOperation(element);
                }
                else if (revision.revisionType === 'Insertion') {
                    operation = this.getDeleteOperation(this.action, undefined, this.getRemovedText(element));
                }
                else if (revision.revisionType === 'Deletion') {
                    if (revision.author !== currentUser) {
                        operation = this.getFormatOperation(element);
                        if (element.removedIds.length > 0) {
                            for (var i = 0; i < element.removedIds.length; i++) {
                                if (!isNullOrUndefined(operation.markerData.removedIds)) {
                                    operation.markerData.removedIds = [];
                                }
                                operation.markerData.removedIds.push(element.removedIds[i]);
                            }
                        }
                    }
                }
            }
        }
        if (this.action !== 'Enter' && !(element instanceof ParagraphWidget) && (isNullOrUndefined(operation) || operation.action !== 'Delete')) {
            this.startIndex += element.length;
        }
        return operation;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.getActionInfo = function (isInvertOperation) {
        var action = this.action;
        if (!isNullOrUndefined(this.isAcceptOrReject) && this.isAcceptOrReject === 'Reject') {
            action = 'Reject Change';
        }
        var operations = [];
        switch (action.toString()) {
            case 'Insert':
            case 'InsertTextParaReplace':
            case 'Enter':
            case 'InsertInline':
            case 'SectionBreak':
            case 'SectionBreakContinuous':
                if (this.removedNodes.length > 0 && isNullOrUndefined(this.dropDownIndex)) {
                    if (this.owner.enableTrackChanges && !this.editorHistory.isUndoing) {
                        operations = this.getDeleteOperationsForTrackChanges();
                        if (action !== 'InsertInline') {
                            this.insertIndex = this.endIndex;
                        }
                    }
                    else {
                        if (action === 'InsertTextParaReplace') {
                            // when action is equal to InsertTextParaReplace we need not to calculate the para mark.
                            this.startIndex > this.endIndex ? this.startIndex - 1 : this.endIndex -= 1;
                        }
                        var deleteOperation = this.getDeleteOperation(action);
                        if (action === 'Enter' && this.owner.enableTrackChanges && this.editorHistory.isUndoing) {
                            deleteOperation.markerData = { isSkipTracking: true };
                        }
                        operations.push(deleteOperation);
                    }
                }
                if ((action === 'Enter' || this.insertedText.length > 0)) {
                    if (!this.editorHistory.isUndoing && (!this.editorHistory.isRedoing || action === 'Enter' || action === 'SectionBreak' || action === 'SectionBreakContinuous')) {
                        var operation = this.getInsertOperation(action);
                        if (this.owner.enableTrackChanges && this.action !== 'Enter') {
                            if (this.insertedElement instanceof FootnoteElementBox) {
                                operation.markerData = this.markerData[0];
                                this.markerData.splice(0, 1);
                                operation.text = CONTROL_CHARACTERS.Marker_Start;
                                operation.markerData.type = this.insertedElement.footnoteType;
                                operation.markerData.revisionForFootnoteEndnoteContent = this.markerData.pop();
                            }
                            operations.push(operation);
                            for (var i = 0; i < this.splittedRevisions.length; i++) {
                                if (isNullOrUndefined(operation.markerData)) {
                                    operation.markerData = {};
                                }
                                if (isNullOrUndefined(operation.markerData.splittedRevisions)) {
                                    operation.markerData.splittedRevisions = [];
                                }
                                operation.markerData.splittedRevisions.push(this.splittedRevisions[i]);
                            }
                        }
                        else {
                            operations.push(operation);
                        }
                    }
                    else if (this.isRemovedNodes) {
                        var operationCollection = this.getDeleteContent(action);
                        operations = operations.concat(operationCollection);
                    }
                }
                var operation2 = operations[operations.length - 1];
                if (action === 'Insert' && !isNullOrUndefined(operation2.text)) {
                    operation2.length = operation2.text.length;
                }
                if (!isNullOrUndefined(this.dropDownIndex)) {
                    operation2.markerData = { 'type': 'Field', 'dropDownIndex': this.dropDownIndex };
                    operation2.offset = this.getElementAbsolutePosition(this.fieldBegin);
                    operation2.type = 'DropDown';
                }
                break;
            case 'InsertTable':
            case 'InsertTableBelow':
                if (this.removedNodes.length > 0) {
                    operations.push(this.getDeleteOperation(action));
                }
                if (this.editorHistory.isUndoing && this.isRemovedNodes) {
                    operations.push(this.getUndoRedoOperation(action));
                }
                else {
                    var tableRowOperation = this.buildTableRowCellOperation(action);
                    for (var i = 0; i < tableRowOperation.length; i++) {
                        operations.push(tableRowOperation[i]);
                    }
                }
                break;
            case 'InsertRowAbove':
            case 'InsertRowBelow':
            case 'InsertColumnLeft':
            case 'InsertColumnRight':
                if (this.editorHistory.isUndoing) {
                    for (var i = 0; i < this.cellOperation.length; i++) {
                        operations.push(this.cellOperation[i]);
                    }
                    var operation = this.getUndoRedoOperation(action, true);
                    if (this.owner.enableTrackChanges && isNullOrUndefined(operation.markerData)) {
                        operation.markerData = { isSkipTracking: true };
                    }
                    operations.push(operation);
                }
                else {
                    var tableCellOperation = this.buildTableRowCellOperation(action);
                    if (action === 'InsertRowAbove' || action === 'InsertRowBelow') {
                        operations = tableCellOperation.slice();
                    }
                    else {
                        operations = tableCellOperation.reverse().slice();
                    }
                }
                break;
            case 'BackSpace':
            case 'Delete':
            case 'Cut':
            case 'DeleteBookmark':
            case 'RemoveEditRange':
            case 'RemoveContentControl':
                if (this.editorHistory.isUndoing) {
                    if (action == "DeleteBookmark" || action == "RemoveEditRange") {
                        this.startIndex -= 1;
                        this.insertIndex = this.startIndex;
                        this.insertedText = CONTROL_CHARACTERS.Marker_Start;
                        operations.push(this.getInsertOperation(action));
                        this.insertedText = CONTROL_CHARACTERS.Marker_End;
                        operations.push(this.getInsertOperation(action, true));
                        if (action === 'RemoveEditRange') {
                            var operation = operations[operations.length - 1];
                            operation.offset -= 1;
                        }
                        this.startIndex += 1;
                    }
                    else {
                        if (this.endRevisionLogicalIndex && this.editorHistory.isUndoing) {
                            if (this.removedNodes.length > 0) {
                                var deleteOperation = this.getDeleteOperation(action);
                                deleteOperation.markerData = { isSkipTracking: true };
                                operations.push(deleteOperation);
                            }
                            if (this.isRemovedNodes) {
                                var operationCollection = this.getDeleteContent(action);
                                operations = operations.concat(operationCollection);
                            }
                        }
                        else {
                            var operationCollection = this.getDeleteContent(action);
                            operations = operations.concat(operationCollection);
                        }
                    }
                }
                else {
                    if (this.cellOperation.length > 0) {
                        operations = this.cellOperation;
                        this.cellOperation = [];
                    }
                    else {
                        if (this.removedNodes.length > 0) {
                            if (this.owner.enableTrackChanges) {
                                if (this.editorHistory.isRedoing) {
                                    if (this.removedNodes.length > 0) {
                                        var deleteOperation = this.getDeleteOperation(action);
                                        deleteOperation.markerData = { isSkipTracking: true };
                                        operations.push(deleteOperation);
                                    }
                                    if (this.isRemovedNodes) {
                                        var operationCollection = this.getDeleteContent(action);
                                        operations = operations.concat(operationCollection);
                                    }
                                }
                                else {
                                    operations = this.getDeleteOperationsForTrackChanges();
                                }
                            }
                            else {
                                var deleteOperation = this.getDeleteOperation(action);
                                operations.push(deleteOperation);
                                for (var i = 0; i < this.removedNodes.length; i++) {
                                    var element = this.removedNodes[parseInt(i.toString(), 10)];
                                    if (element instanceof BodyWidget) {
                                        var headersFooters = element.removedHeaderFooters;
                                        for (var j = 0; j < headersFooters.length; j++) {
                                            var headerFooter = headersFooters[parseInt(j.toString(), 10)];
                                            var keysLength = Object.keys(headerFooter).length;
                                            if (keysLength > 0) {
                                                operations.push(this.getDeleteOperation('DeleteHeaderFooter', undefined));
                                                break;
                                            }
                                        }
                                    }
                                }
                                if (action === 'DeleteBookmark' || action === 'RemoveEditRange') {
                                    operations.push(this.getDeleteOperation(action, true));
                                    if (action === 'RemoveEditRange') {
                                        var operation = operations[operations.length - 1];
                                        operation.offset -= 1;
                                    }
                                }
                                else if (action === "RemoveContentControl") {
                                    var operation = this.getDeleteOperation(action, true);
                                    operation.text = CONTROL_CHARACTERS.Marker_End;
                                    operations.push(operation);
                                }
                            }
                        }
                    }
                }
                this.markerData = [];
                break;
            case 'ResolveComment':
            case 'EditComment':
                for (var i = 0; i < this.removedNodes.length; i++) {
                    var operation = this.getUpdateOperation();
                    operations.push(this.getCommentOperation(operation, action, this.removedNodes[i]));
                }
                break;
            case 'ClearRevisions':
            case 'TrackingPageBreak':
            case 'AcceptTOC':
                if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
                    if (this.removedNodes.length > 0) {
                        var deleteOperation = this.getDeleteOperation(action);
                        deleteOperation.markerData = { isSkipTracking: true };
                        operations.push(deleteOperation);
                    }
                    if (this.isRemovedNodes) {
                        var revision = void 0;
                        if (typeof (this.removedNodes[0]) === 'string') {
                            revision = this.owner.editorModule.getRevision(this.removedNodes[0]);
                        }
                        if (revision && revision.range[0] instanceof WCharacterFormat) {
                            operations.push(this.getInsertOperation('Enter'));
                        }
                        else {
                            var operationCollection = this.getDeleteContent(action);
                            operations = operations.concat(operationCollection);
                        }
                    }
                }
                else {
                    if (this.removedNodes.length > 0) {
                        var revision = this.owner.editorModule.getRevision(this.removedNodes[0]);
                        if (action === 'TrackingPageBreak') {
                            if (!(typeof this.removedNodes[0] === 'string')) {
                                var operation = this.getDeleteOperation(action);
                                operation.markerData.isAcceptOrReject = 'Reject';
                                operations.push(operation);
                                break;
                            }
                        }
                        operations.push(this.getRevisionOperation(revision));
                    }
                }
                break;
            case 'Reject Change':
                if (this.isRemovedNodes) {
                    var operationCollection = this.getDeleteContent(action);
                    operations = operations.concat(operationCollection);
                }
                else {
                    var operation = this.getDeleteOperation(action);
                    operation.markerData.isAcceptOrReject = 'Reject';
                    operations.push(operation);
                }
                break;
            case 'Accept Change':
                if (this.isRemovedNodes) {
                    var operationCollection = this.getDeleteContent(action);
                    operations = operations.concat(operationCollection);
                }
                else {
                    var deleteOperation = this.getDeleteOperation(action);
                    deleteOperation.markerData.isAcceptOrReject = 'Accept';
                    operations.push(deleteOperation);
                }
                break;
            case 'Paste':
            case 'PasteColumn':
            case 'PasteOverwrite':
            case 'PasteRow':
                if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
                    if (this.removedNodes.length > 0) {
                        operations.push(this.getDeleteOperation('Delete'));
                    }
                    if (this.isRemovedNodes) {
                        if (this.action === 'Paste') {
                            var operationCollection = this.getDeleteContent(action);
                            operations = operations.concat(operationCollection);
                        }
                        else {
                            operations.push(this.getUndoRedoOperation(action, true));
                        }
                    }
                }
                else {
                    if (this.removedNodes.length > 0) {
                        operations.push(this.getDeleteOperation('Delete'));
                    }
                    var length_2 = this.getPasteContentLength();
                    if (action !== 'Paste') {
                        if (this.owner.selectionModule.start.paragraph.isInsideTable) {
                            length_2 = this.owner.selectionModule.getBlockLength(undefined, this.owner.selectionModule.start.paragraph.associatedCell.ownerTable, 0, { done: false }, true, undefined, undefined);
                        }
                    }
                    var pasteOperation = {
                        action: 'Insert',
                        offset: this.startIndex,
                        length: length_2,
                        pasteContent: JSON.stringify(this.pasteContent),
                        type: isNullOrUndefined(this.type) ? 'Paste' : this.type,
                        markerData: this.markerData.pop()
                    };
                    operations.push(pasteOperation);
                }
                break;
            case 'InsertHyperlink':
                if (isNullOrUndefined(this.fieldBegin)) {
                    operations.push(this.getDeleteOperation('BackSpace'));
                    if (this.isRemovedNodes) {
                        var operationCollection = this.getDeleteContent(action);
                        operations = operations.concat(operationCollection);
                    }
                }
                else {
                    if (this.isEditHyperlink) {
                        operations = this.getEditHyperlinkOperation();
                    }
                    else {
                        operations = this.getFieldOperation();
                    }
                }
                this.fieldBegin = undefined;
                break;
            case 'UpdateFormField':
                this.insertedText = '';
                var operation1 = this.getInsertOperation('UpdateFormField');
                operation1.text = CONTROL_CHARACTERS.Marker_Start;
                operation1.markerData = { 'type': 'Field', 'checkBoxValue': this.fieldBegin.formFieldData.checked };
                operation1.offset = this.getElementAbsolutePosition(this.fieldBegin);
                operations.push(operation1);
                break;
            case 'DeleteRow':
            case 'DeleteCells':
            case 'DeleteColumn':
            case 'DeleteTable':
            case 'ClearCells':
            case 'MergeCells':
                if (this.editorHistory.isUndoing) {
                    if (action == 'DeleteTable') {
                        operations.push(this.getUndoRedoOperation(action));
                    }
                    else {
                        operations = this.cellOperation.slice();
                        this.insertIndex = this.startIndex;
                        operations.push(this.getUndoRedoOperation(action, true));
                        this.cellOperation = [];
                    }
                }
                else {
                    if (this.removedNodes.length > 0) {
                        if (this.cellOperation.length > 0) {
                            // For delete column and delete cell.
                            for (var i = 0; i < this.cellOperation.length; i++) {
                                operations.push(this.cellOperation[i]);
                            }
                            if (action === 'MergeCells') {
                                operations.push(this.getPasteMergeOperation());
                                operations.push(this.getFormatOperation());
                                this.type = undefined;
                            }
                            else {
                                operations.reverse();
                            }
                        }
                        else {
                            if (this.owner.enableTrackChanges) {
                                operations.push(this.getFormatOperation(undefined, action));
                            }
                            else {
                                operations.push(this.getDeleteOperation(action));
                            }
                        }
                        this.cellOperation = [];
                    }
                }
                break;
            case 'RemoveRowTrack':
                if (this.editorHistory.isUndoing) {
                    if (this.isRemovedNodes && this.editorHistory.isUndoing) {
                        operations = this.cellOperation.slice();
                        var operationCollection = this.getDeleteContent(action);
                        if (isNullOrUndefined(operationCollection[0].markerData)) {
                            operationCollection[0].markerData = { isSkipTracking: true };
                        }
                        operations.push.apply(operations, operationCollection);
                    }
                }
                else {
                    if (this.removedNodes.length > 0) {
                        if (this.cellOperation.length > 0) {
                            operations.push.apply(operations, this.cellOperation);
                        }
                        else {
                            operations = this.revisionOperation.slice();
                            this.getTrackchangesOperation(operations);
                        }
                    }
                }
                break;
            case 'RowResizing':
            case 'CellResizing':
                operations = this.getResizingOperation(action);
                break;
            case 'ImageResizing':
                operations.push(this.getFormatOperation());
                break;
            case 'Bold':
            case 'Italic':
            case 'Underline':
            case 'FontSize':
            case 'Strikethrough':
            case 'BaselineAlignment':
            case 'HighlightColor':
            case 'FontColor':
            case 'FontFamily':
            case 'Uppercase':
            case 'Lowercase':
            case 'CapitalizeEachWord':
            case 'SentenceCase':
            case 'ToggleCase':
            case 'CharacterFormat':
                if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
                    if (action === 'Uppercase') {
                        operations.push(this.getDeleteOperation(action));
                        if (this.removedNodes) {
                            var operationCollection = this.getDeleteContent(action);
                            operations = operations.concat(operationCollection);
                        }
                    }
                    else {
                        operations = this.modifiedFormatOperation;
                        this.modifiedFormatOperation = [];
                    }
                }
                else {
                    var charFormatOperation = this.buildFormatOperation(action, true);
                    operations = charFormatOperation.slice();
                }
                break;
            case 'AfterSpacing':
            case 'BeforeSpacing':
            case 'RightIndent':
            case 'LeftIndent':
            case 'FirstLineIndent':
            case 'LineSpacing':
            case 'LineSpacingType':
            case 'TextAlignment':
            case 'Borders':
            case 'TopBorder':
            case 'BottomBorder':
            case 'LeftBorder':
            case 'RightBorder':
            case 'HorizontalBorder':
            case 'VerticalBorder':
            case 'ListFormat':
            case 'ParagraphFormat':
            case 'StyleName':
            case 'ClearParagraphFormat':
            case 'SpaceBeforeAuto':
            case 'SpaceAfterAuto':
            case 'ParagraphBidi':
            case 'ContextualSpacing':
            case 'ContinueNumbering':
            case 'List':
                if (this.modifiedFormatOperation.length > 0 && !isInvertOperation) {
                    operations = this.modifiedFormatOperation;
                    this.modifiedFormatOperation = [];
                }
                else {
                    if (isInvertOperation && this.editorHistory.isUndoing && (action === 'ListFormat' || action === 'ClearParagraphFormat')) {
                        action = 'ParagraphFormat';
                    }
                    if (action === 'ContinueNumbering') {
                        this.type = action.toString();
                    }
                    if (action === 'Borders' && this.removedNodes[this.removedNodes.length - 1] instanceof TableWidget) {
                        this.insertedText = CONTROL_CHARACTERS.Cell;
                        this.type = 'CellFormat';
                        this.createCellFormat(action);
                        operations = this.getSelectedCellOperation(action, undefined, true, false, true);
                        break;
                    }
                    var paraFormatOperation = this.buildFormatOperation(action, false);
                    operations = paraFormatOperation.slice();
                }
                break;
            case 'TableAlignment':
            case 'DefaultCellSpacing':
            case 'TableLeftIndent':
            case 'DefaultCellLeftMargin':
            case 'DefaultCellRightMargin':
            case 'DefaultCellTopMargin':
            case 'DefaultCellBottomMargin':
            case 'TablePreferredWidth':
            case 'TablePreferredWidthType':
            case 'TableBidi':
                this.createTableFormat(action);
                this.type = 'TableFormat';
                operations.push(this.getFormatOperation());
                this.format = undefined;
                break;
            case 'RestartNumbering':
                this.type = action.toString();
                var numberingOperation = this.getFormatOperation(undefined, action);
                this.createListFormat(action, numberingOperation);
                operations.push(numberingOperation);
                break;
            case 'Shading':
                this.createCellFormat(action);
                this.type = 'CellFormat';
                operations = this.getSelectedCellOperation(action, undefined, undefined, true, true);
                break;
            case 'TableAutoFitToContents':
            case 'TableAutoFitToWindow':
            case 'TableFixedColumnWidth':
                if (this.editorHistory.isUndoing) {
                    operations = this.getDeleteContent('Insert');
                }
                else {
                    this.createTableFormat(action);
                    this.type = 'TableFormat';
                    this.insertedText = action.toString();
                    operations.push(this.getFormatOperation());
                    this.format = undefined;
                }
                break;
            case 'SectionFormat':
            case 'HeaderDistance':
            case 'FooterDistance':
            case 'DifferentFirstPage':
            case 'DifferentOddAndEvenPages':
            case 'PageWidth':
            case 'PageHeight':
            case 'LeftMargin':
            case 'TopMargin':
            case 'RightMargin':
            case 'BottomMargin':
            case 'RestartPageNumbering':
            case 'PageStartingNumber':
            case 'EndnoteNumberFormat':
            case 'FootNoteNumberFormat':
            case 'RestartIndexForEndnotes':
            case 'RestartIndexForFootnotes':
            case 'InitialFootNoteNumber':
            case 'InitialEndNoteNumber':
            case 'LineBetweenColumns':
            case 'EqualWidth':
            case 'BreakCode':
            case 'LinkToPrevious':
                this.createSectionFormat(action);
                this.type = 'SectionFormat';
                operations.push(this.getFormatOperation(undefined));
                if (action === 'LinkToPrevious') {
                    var operation = operations[operations.length - 1];
                    operation.offset = this.insertIndex;
                }
                break;
            case 'RowHeight':
            case 'RowHeightType':
            case 'AllowBreakAcrossPages':
            case 'RowHeader':
                if (this.editorHistory.isUndoing || this.editorHistory.isRedoing && this.modifiedProperties.length > 1) {
                    operations = this.modifiedFormatOperation;
                    this.modifiedFormatOperation = [];
                }
                else {
                    this.createRowFormat(action);
                    this.type = 'RowFormat';
                    operations.push(this.getFormatOperation(undefined));
                    this.format = undefined;
                }
                break;
            case 'CellContentVerticalAlignment':
            case 'CellLeftMargin':
            case 'CellRightMargin':
            case 'CellBottomMargin':
            case 'CellTopMargin':
            case 'CellPreferredWidth':
            case 'CellPreferredWidthType':
                this.createCellFormat(action);
                this.type = 'CellFormat';
                operations = this.getSelectedCellOperation(action, false, false, false, true).slice();
                this.format = undefined;
                break;
            case 'UpdateContentControl':
                if (this.modifiedProperties.length > 0) {
                    var operation = this.getFormatOperation();
                    operation.text = CONTROL_CHARACTERS.Marker_Start;
                    operations.push(operation);
                }
                else if (this.removedNodes.length > 0) {
                    var operation = this.getFormatOperation();
                    operation.text = CONTROL_CHARACTERS.Marker_Start;
                    var contentControlInfo = this.removedNodes[0];
                    operation.markerData = { 'type': 'ContentControlCheckBox', checkBoxValue: contentControlInfo.value };
                    operations.push(operation);
                }
                break;
        }
        this.cellOperation = [];
        this.revisionOperation = [];
        this.isRemovedNodes = false;
        return operations;
    };
    BaseHistoryInfo.prototype.getTrackchangesOperation = function (operations) {
        var markerInfo = this.markerData;
        for (var i = markerInfo.length - 1; i >= 0; i--) {
            if (!isNullOrUndefined(markerInfo[i].revisionId)) {
                var revision = this.getRevision(markerInfo[i].revisionId);
                if (revision && revision.range.length > 0) {
                    if (revision.range[0] instanceof WRowFormat) {
                        operations.push(this.buildRowOperationForTrackChanges(revision.range[0].ownerBase, 'RemoveRowTrack'));
                    }
                    else {
                        var startPosition = new TextPosition(this.owner);
                        var endPosition = new TextPosition(this.owner);
                        this.owner.selection.selectRevision(revision, startPosition, endPosition);
                        this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(startPosition);
                        this.endIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(endPosition);
                        operations.push(this.getFormatOperation(undefined));
                    }
                }
                else {
                    this.owner.editorModule.removeMarkerInfoRevision(markerInfo[i].revisionId, markerInfo);
                }
            }
        }
    };
    BaseHistoryInfo.prototype.getRevision = function (revisionId) {
        for (var i = 0; i < this.owner.revisions.changes.length; i++) {
            var revision = this.owner.revisions.changes[i].revisionID;
            if (revision === revisionId) {
                return this.owner.revisions.changes[i];
            }
        }
        return undefined;
    };
    BaseHistoryInfo.prototype.getElementAbsolutePosition = function (element) {
        if (element) {
            var position = this.owner.selectionModule.getElementPosition(element);
            var startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(position.startPosition);
            return startIndex;
        }
        return undefined;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.getFieldOperation = function () {
        var operations = [];
        var element = this.fieldBegin;
        var isFieldEnd = false;
        var elementOffset = this.insertIndex;
        if (!isNullOrUndefined(element)) {
            do {
                var insertedText = void 0;
                var Data = void 0;
                var elementLength = void 0;
                var characterFormat = void 0;
                var type = void 0;
                if (!element.skipformFieldLength) {
                    if (element instanceof FieldElementBox) {
                        if (element.fieldType === 0 && this.getRemovedText() !== '') {
                            operations.push(this.getDeleteOperation('Delete'));
                            var operation_1 = operations[operations.length - 1];
                            operation_1.offset = elementOffset;
                            if (!isNullOrUndefined(operation_1.markerData) && this.owner.enableTrackChanges) {
                                operation_1.markerData.isSkipTracking = true;
                            }
                        }
                        insertedText = element.fieldType === 0 ? CONTROL_CHARACTERS.Marker_Start : element.fieldType === 1 ? CONTROL_CHARACTERS.Marker_End : element.fieldType === 2 ? CONTROL_CHARACTERS.Field_Separator : '';
                        if (element.fieldType === 0 && element.formFieldData) {
                            type = this.formFieldType;
                            if (element.revisions.length > 0) {
                                Data = this.owner.editorModule.getRevisionMarkerData(Data, element.revisions[0]);
                            }
                            if (isNullOrUndefined(Data)) {
                                Data = {};
                            }
                            Data.type = 'Field';
                            Data.formFieldData = JSON.stringify(element.formFieldData);
                        }
                        else {
                            if (element.revisions.length > 0) {
                                Data = this.owner.editorModule.getRevisionMarkerData(Data, element.revisions[0]);
                            }
                            if (isNullOrUndefined(Data)) {
                                Data = {};
                            }
                            Data.type = 'Field';
                        }
                        elementLength = element.length;
                    }
                    else if (this.fieldBegin.formFieldData && element instanceof BookmarkElementBox) {
                        insertedText = element.bookmarkType === 0 ? CONTROL_CHARACTERS.Marker_Start : CONTROL_CHARACTERS.Marker_End;
                        Data = { 'bookmarkName': element.name, 'type': 'Bookmark' };
                        elementLength = element.length;
                    }
                    else if (element instanceof TextElementBox) {
                        insertedText = element.text;
                        elementLength = element.length;
                        if (element.revisions.length > 0) {
                            Data = this.owner.editorModule.getRevisionMarkerData(Data, element.revisions[0]);
                        }
                    }
                    if (!(element instanceof BookmarkElementBox)) {
                        var characterData = this.owner.sfdtExportModule.writeCharacterFormat(element.characterFormat, 0);
                        characterFormat = JSON.stringify(characterData);
                    }
                    var operation = {
                        action: 'Insert',
                        offset: elementOffset,
                        type: type,
                        text: insertedText,
                        length: elementLength,
                        markerData: Data,
                        format: characterFormat
                    };
                    operations.push(operation);
                    elementOffset += element.length;
                    Data = undefined;
                    type = undefined;
                    characterFormat = undefined;
                    if (element instanceof FieldElementBox && element.fieldType === 1) {
                        isFieldEnd = true;
                        if (this.fieldBegin.formFieldData && element.nextNode instanceof BookmarkElementBox) {
                            var elementBox = element.nextNode;
                            insertedText = elementBox.bookmarkType === 0 ? CONTROL_CHARACTERS.Marker_Start : CONTROL_CHARACTERS.Marker_End;
                            if (elementBox.revisions.length > 0) {
                                Data = this.owner.editorModule.getRevisionMarkerData(Data, elementBox.revisions[0]);
                            }
                            if (isNullOrUndefined(Data)) {
                                Data = {};
                            }
                            Data.bookmarkName = elementBox.name;
                            Data.type = 'Bookmark';
                            elementLength = elementBox.length;
                            var operation_2 = {
                                action: 'Insert',
                                offset: elementOffset,
                                text: insertedText,
                                length: elementLength,
                                markerData: Data
                            };
                            operations.push(operation_2);
                        }
                    }
                }
                element = element.nextNode;
            } while (!isFieldEnd && !isNullOrUndefined(element));
        }
        return operations;
    };
    /**
     * @private
     * @returns {Operation}
     * This method will build the operation for undo/Redo deleted content as paste action.
     */
    BaseHistoryInfo.prototype.getDeleteContent = function (action) {
        var operations = [];
        var startPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.collabStart);
        var endPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.collabEnd);
        var paraEnd = endPosition.clone();
        paraEnd.offset = endPosition.offset - 1;
        var isParaSelected = startPosition.isAtParagraphStart && paraEnd.isAtParagraphEnd;
        if (isParaSelected && (!startPosition.currentWidget.paragraph.isInsideTable)) {
            operations.push(this.getInsertOperation('Enter', false, true));
            operations.push(this.getUndoRedoOperation(action));
        }
        else if (startPosition.paragraph == endPosition.paragraph) {
            if (startPosition.isAtSamePosition(endPosition)) {
                if (this.owner.selectionModule.isEmpty && action === 'BackSpace') {
                    this.insertIndex -= 1;
                }
                operations.push(this.getUndoRedoOperation(action, false, true));
            }
            else {
                operations.push(this.getUndoRedoOperation(action));
            }
        }
        else {
            if (startPosition.currentWidget.paragraph.isInsideTable) {
                operations = this.cellOperation.slice();
                operations.push(this.getUndoRedoOperation(action, true));
            }
            else {
                operations.push(this.getUndoRedoOperation(action));
                this.startIndex = this.endIndex + 1;
                if (!(startPosition.isAtParagraphStart || paraEnd.isAtParagraphEnd)) {
                    var operation = this.getDeleteOperation('Delete');
                    if (this.owner.enableTrackChanges) {
                        operation.markerData = { isSkipTracking: true };
                    }
                    operations.push(operation);
                }
            }
        }
        return operations;
    };
    BaseHistoryInfo.prototype.getEditHyperlinkOperation = function () {
        var operations = [];
        var element = this.fieldBegin;
        if (element) {
            var startIndex = this.getElementAbsolutePosition(element);
            operations.push(this.getDeleteOperation('Delete'));
            var operation = operations[operations.length - 1];
            operation.offset = startIndex;
            var fieldCode = this.getRemovedFieldCode();
            operation.length = fieldCode.length;
            operation.text = fieldCode;
            operations.push(this.getInsertOperation('InsertHyperlink'));
            operation = operations[operations.length - 1];
            operation.offset = startIndex;
            fieldCode = this.owner.selectionModule.getFieldCode(element, true);
            operation.text = fieldCode;
            operation.length = fieldCode.length;
        }
        return operations;
    };
    BaseHistoryInfo.prototype.getPasteContentLength = function () {
        var length = 0;
        for (var i = 0; i < this.insertedNodes.length; i++) {
            var block = this.insertedNodes[i];
            if (block instanceof TextElementBox) {
                length += block.length;
            }
            else {
                length += this.owner.selectionModule.getBlockLength(undefined, block, 0, { done: false }, true, undefined, undefined);
            }
        }
        this.insertedNodes = [];
        return length;
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.getUpdateOperation = function () {
        var operation = {
            action: 'Update'
        };
        return operation;
    };
    BaseHistoryInfo.prototype.getResizingOperation = function (action) {
        var operations = [];
        var tableResize = this.owner.editorModule.tableResize;
        var table = tableResize.currentResizingTable;
        if (!isNullOrUndefined(table.childWidgets)) {
            table = table.combineWidget(this.owner.viewer);
            var resizerPosition = tableResize.resizerPosition;
            var paragraphInfo = { 'paragraph': null, 'offset': 0 };
            if (action == 'RowResizing') {
                var row = table.childWidgets[resizerPosition];
                if (isNullOrUndefined(row)) {
                    row = this.modifiedProperties[0].rowFormat.ownerBase;
                }
                this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, row).position;
                this.endIndex = this.startIndex + this.getRowLength(row);
                var rowFormat = {};
                if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                    this.owner.sfdtExportModule.assignRowFormat(rowFormat, row.rowFormat, 0);
                }
                this.format = JSON.stringify(rowFormat);
                this.insertedText = CONTROL_CHARACTERS.Row;
                operations.push(this.getFormatOperation());
            }
            else {
                var rightColumnIndex = resizerPosition;
                var leftColumnIndex = resizerPosition - 1;
                this.insertedText = CONTROL_CHARACTERS.Cell;
                var isResize = false;
                if (!this.owner.selectionModule.isEmpty) {
                    var cellwidget = tableResize.getTableCellWidget(tableResize.startingPoint);
                    if (cellwidget && (this.owner.selectionModule.selectedWidgets.containsKey(cellwidget) || (cellwidget.previousWidget
                        && this.owner.selectionModule.selectedWidgets.containsKey((cellwidget.previousWidget))))) {
                        isResize = true;
                        var selectedCells = this.owner.selectionModule.getSelectedCells();
                        var startCell = selectedCells[0];
                        var endCell = selectedCells[selectedCells.length - 1];
                        var rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
                        var count = table.childWidgets.indexOf(endCell.ownerRow);
                        var row = table.childWidgets[rowStartIndex];
                        while (row && row.index <= count) {
                            var cell = row.firstChild;
                            while (cell) {
                                if (cell.index == rightColumnIndex || cell.index == leftColumnIndex) {
                                    var cellFormat = {};
                                    if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                                        cellFormat = this.owner.sfdtExportModule.writeCellFormat(cell.cellFormat, 0);
                                    }
                                    this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell).position;
                                    // Plus one for adding the cell index.
                                    this.endIndex = this.startIndex + this.owner.selectionModule.calculateCellLength(cell) + 1;
                                    this.type = "CellFormat";
                                    this.format = JSON.stringify(cellFormat);
                                    operations.push(this.getFormatOperation());
                                }
                                cell = cell.nextWidget;
                            }
                            var rowFormat = {};
                            if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                                this.owner.sfdtExportModule.assignRowFormat(rowFormat, row.rowFormat, 0);
                            }
                            this.format = JSON.stringify(rowFormat);
                            this.type = "RowFormat";
                            this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, row).position;
                            this.endIndex = this.startIndex + this.getRowLength(row);
                            operations.push(this.getFormatOperation());
                            row = row.getSplitWidgets().pop().nextRenderedWidget;
                        }
                    }
                }
                else {
                    isResize = true;
                    var row = table.firstChild;
                    while (row) {
                        var cell = row.firstChild;
                        while (cell) {
                            if (cell.index == rightColumnIndex || cell.index == leftColumnIndex) {
                                var cellFormat = {};
                                if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                                    cellFormat = this.owner.sfdtExportModule.writeCellFormat(cell.cellFormat, 0);
                                }
                                this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell).position;
                                // Plus one for adding the cell index.
                                this.endIndex = this.startIndex + this.owner.selectionModule.calculateCellLength(cell) + 1;
                                this.type = "CellFormat";
                                this.format = JSON.stringify(cellFormat);
                                operations.push(this.getFormatOperation());
                            }
                            cell = cell.nextWidget;
                        }
                        var rowFormat = {};
                        if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                            this.owner.sfdtExportModule.assignRowFormat(rowFormat, row.rowFormat, 0);
                        }
                        this.format = JSON.stringify(rowFormat);
                        this.type = "RowFormat";
                        this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, row).position;
                        this.endIndex = this.startIndex + this.getRowLength(row);
                        operations.push(this.getFormatOperation());
                        row = row.getSplitWidgets().pop().nextRenderedWidget;
                    }
                }
                if (isResize) {
                    var tableFormat = {};
                    tableFormat = this.owner.sfdtExportModule ? this.owner.sfdtExportModule.writeTableFormat(table.tableFormat, 0) : {};
                    this.format = JSON.stringify(tableFormat);
                    this.type = "TableFormat";
                    this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, table).position;
                    // this.startIndex will get the offset of table. So in get block length it will start from the table. So doing minus one.
                    this.endIndex = this.startIndex + this.owner.selectionModule.getBlockLength(undefined, table, 0, { done: false }, true, undefined, undefined) - 1;
                    operations.push(this.getFormatOperation());
                }
            }
            this.owner.documentHelper.layout.reLayoutTable(table);
        }
        this.format = undefined;
        return operations;
    };
    BaseHistoryInfo.prototype.getRowLength = function (row) {
        var length = 0;
        for (var i = 0; i < row.childWidgets.length; i++) {
            // for collab editing for row amd cell we are adding plus one index to the offset. So it will calculate the widgets inside the cell one. So adding plus one offset.
            length += this.owner.selectionModule.calculateCellLength(row.childWidgets[i]) + 1;
        }
        return length;
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.getDeleteOperation = function (action, setEndIndex, text) {
        if (this.startIndex > this.endIndex) {
            var temp = this.startIndex;
            this.startIndex = this.endIndex;
            this.endIndex = temp;
        }
        // if (action === 'Delete' && this.endIndex === this.startIndex) {
        //     this.startIndex++;
        //     this.endIndex++;
        // }
        if (action === 'Delete' && this.endIndex < this.startIndex) {
            var start = this.startIndex;
            this.startIndex = this.endIndex;
            this.endIndex = start;
        }
        if (this.endIndex === this.startIndex && action !== 'DeleteBookmark' && action !== 'RemoveEditRange' && this.action !== 'InsertHyperlink') {
            if (action === 'BackSpace' || action === 'Insert' || action === 'Enter') {
                this.startIndex--;
            }
            else {
                this.endIndex++;
            }
        }
        if (action === 'DeleteHeaderFooter') {
            this.startIndex = this.headerFooterStart;
            this.endIndex = this.headerFooterEnd;
        }
        var selectionLength = !isNullOrUndefined(text) ? text.length : this.endIndex - this.startIndex;
        var removedText;
        if (action === 'DeleteBookmark' || action === 'RemoveEditRange' || action === "RemoveContentControl") {
            removedText = this.insertedText;
            selectionLength = 1;
        }
        else if (action === 'DeleteHeaderFooter') {
            removedText === '';
        }
        else if (action === 'DeleteTable' || action === 'DeleteRow' || action === 'DeleteColumn' || action === 'MergeCells' || action === 'RemoveRowTrack') {
            removedText = this.insertedText;
            if (action !== 'DeleteTable' && action !== 'DeleteRow') {
                selectionLength = this.tableRelatedLength;
            }
        }
        else {
            removedText = !isNullOrUndefined(text) ? text : this.getRemovedText();
        }
        if (action === 'Cut' && removedText[removedText.length - 1] === ' ' && selectionLength < removedText.length) {
            selectionLength = removedText.length;
        }
        var operation = {
            action: 'Delete',
            offset: setEndIndex ? this.endIndex : this.startIndex,
            text: removedText,
            length: (action === 'Paste' || selectionLength === 0) ? removedText.length : selectionLength,
            skipOperation: action === 'DeleteHeaderFooter' ? true : undefined,
            markerData: this.markerData[0],
        };
        if (this.removedNodes[0] instanceof FootnoteElementBox) {
            if (this.editorHistory.isUndoing && operation.length >= 3) {
                operation.length += 1;
            }
            else {
                var element = this.removedNodes[0];
                var lastPara = element.bodyWidget.lastChild;
                var positionInfo = { position: 0, done: false };
                var paragraphInfo = { paragraph: lastPara, offset: this.owner.selectionModule.getParagraphLength(lastPara) + 1 };
                this.owner.selectionModule.getPositionInfoForBodyContent(paragraphInfo, positionInfo, element.bodyWidget.firstChild);
                operation.length += positionInfo.position;
            }
        }
        return operation;
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.getInsertOperation = function (action, setEndIndex, skipMarkerData) {
        var insertedText = action === 'Enter' ? '\n' : this.insertedText;
        var length;
        if (action === 'InsertTable' || action === 'InsertTableBelow' || action === 'InsertRowAbove' || action === 'InsertRowBelow'
            || action === 'InsertColumnLeft' || action === 'InsertColumnRight' || action === 'MergeCells' || action === 'RemoveRowTrack') {
            length = this.tableRelatedLength;
            if (this.action === 'InsertTable' || this.action === 'InsertTableBelow') {
                this.insertIndex = this.startIndex;
            }
        }
        else {
            if (!isNullOrUndefined(insertedText)) {
                length = insertedText.length;
            }
        }
        var operation = {
            action: 'Insert',
            offset: setEndIndex ? this.endIndex : this.insertIndex,
            text: insertedText,
            type: this.type,
            length: length,
            skipOperation: false,
            imageData: this.insertedData,
            format: this.format,
        };
        if (!isNullOrUndefined(this.markerData) && !skipMarkerData) {
            operation.markerData = this.markerData.pop();
        }
        if (this.insertedElement instanceof FootnoteElementBox) {
            operation.length += this.getFootNoteLength();
        }
        return operation;
    };
    BaseHistoryInfo.prototype.getFootNoteLength = function () {
        var lastPara = this.insertedElement.bodyWidget.lastChild;
        var positionInfo = { position: 0, done: false };
        var paragraphInfo = { paragraph: lastPara, offset: this.owner.selectionModule.getParagraphLength(lastPara) + 1 };
        this.owner.selectionModule.getPositionInfoForBodyContent(paragraphInfo, positionInfo, this.insertedElement.bodyWidget.firstChild);
        return positionInfo.position;
    };
    BaseHistoryInfo.prototype.getUndoRedoOperation = function (action, isTableInsert, issamePosition) {
        var table;
        var lastPara;
        var startLine;
        var lastLine;
        var endoffset;
        var startOffset;
        var startPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.collabStart);
        var endPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.collabEnd);
        var length = 0;
        if (isTableInsert) {
            if (action === 'BackSpace' || action === 'Delete' || action === 'Insert') {
                table = startPosition.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
                var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, table).position;
                if (endPosition.currentWidget.paragraph.isInsideTable) {
                    lastPara = this.documentHelper.getLastParagraphBlock(endPosition.currentWidget.paragraph.associatedCell.ownerTable);
                    lastLine = lastPara.lastChild;
                    endoffset = lastPara.lastChild.getEndOffset();
                }
                else {
                    lastLine = endPosition.currentWidget;
                    endoffset = endPosition.offset;
                }
            }
            else {
                table = this.owner.selectionModule.start.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer);
                lastPara = this.documentHelper.getLastParagraphBlock(table);
                lastLine = lastPara.lastChild;
                endoffset = lastPara.lastChild.getEndOffset();
            }
            startLine = this.documentHelper.getFirstParagraphBlock(table).firstChild;
            startOffset = 0;
            length = this.owner.selectionModule.getBlockLength(undefined, table, 0, { done: false }, true, undefined, undefined);
        }
        else {
            startLine = startPosition.currentWidget;
            lastLine = endPosition.currentWidget;
            endoffset = issamePosition ? (action == 'BackSpace' ? endPosition.offset : endPosition.offset + 1) : endPosition.offset;
            startOffset = issamePosition ? (action === 'BackSpace' ? startPosition.offset - 1 : startPosition.offset) : startPosition.offset;
            var startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(this.collabStart);
            var endIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(this.collabEnd);
            length = endIndex - startIndex;
        }
        this.pasteContent = this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), startLine, startOffset, lastLine, endoffset, false, true);
        return this.getPasteOpertion(this.pasteContent, length);
    };
    BaseHistoryInfo.prototype.getPasteOpertion = function (pasteContent, length) {
        var pasteOperation = {
            action: 'Insert',
            offset: this.startIndex,
            length: length > 0 ? length : 1,
            pasteContent: JSON.stringify(pasteContent),
            type: 'Paste'
        };
        if (this.owner.enableTrackChanges) {
            pasteOperation.markerData = { isSkipTracking: true };
        }
        if (!isNullOrUndefined(this.insertedElement) && this.insertedElement instanceof FootnoteElementBox) {
            pasteOperation.length += this.getFootNoteLength();
        }
        return pasteOperation;
    };
    // Builds the Table and Row operation.
    BaseHistoryInfo.prototype.buildTableRowCellOperation = function (action) {
        var operations = [];
        if (this.insertedNodes.length > 0) {
            if (this.insertedNodes[0] instanceof TableRowWidget) {
                var row = this.insertedNodes[0];
                var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                this.insertIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, this.insertedNodes[0]).position;
                var length_3 = this.insertedNodes.length;
                if (row.ownerTable.childWidgets.length === row.indexInOwner + length_3) {
                    this.insertIndex -= 1;
                }
            }
            if (this.insertedNodes.length > 1 && action === 'InsertTable') {
                var enterOperation = this.getInsertOperation('Enter', false, true);
                if (isNullOrUndefined(enterOperation.markerData)) {
                    enterOperation.markerData = {};
                }
                enterOperation.markerData.isSkipTracking = true;
                operations.push(enterOperation);
            }
            for (var i = 0; i < this.insertedNodes.length; i++) {
                if (this.insertedNodes[i] instanceof TableWidget) {
                    var tableWidget = this.insertedNodes[i].combineWidget(this.owner.viewer);
                    this.tableRelatedLength = action === 'InsertTableBelow' ? 0 : 1;
                    this.insertedText = CONTROL_CHARACTERS.Table;
                    var tableFormat = this.owner.sfdtExportModule ? this.owner.sfdtExportModule.writeTableFormat(tableWidget.tableFormat, 0) : {};
                    this.format = JSON.stringify(tableFormat);
                    operations.push(this.getInsertOperation(action, false, true));
                    for (var j = 0; j < tableWidget.childWidgets.length; j++) {
                        var row = tableWidget.childWidgets[j];
                        operations.push(this.buildRowOperation(row, action));
                        for (var k = 0; k < row.childWidgets.length; k++) {
                            var cell = row.childWidgets[k];
                            var cellOperations = this.buildCellOperation(cell, action, true);
                            for (var l = 0; l < cellOperations.length; l++) {
                                operations.push(cellOperations[l]);
                            }
                        }
                    }
                }
                else if (this.insertedNodes[i] instanceof TableRowWidget) {
                    var row = this.insertedNodes[i];
                    operations.push(this.buildRowOperation(row, action));
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        var cell = row.childWidgets[j];
                        var cellOperations = this.buildCellOperation(cell, action, true);
                        for (var l = 0; l < cellOperations.length; l++) {
                            operations.push(cellOperations[l]);
                        }
                    }
                }
                else if (this.insertedNodes[i] instanceof TableCellWidget) {
                    var cell = this.insertedNodes[i];
                    var table = cell.ownerTable.combineWidget(this.owner.viewer);
                    var num = 0;
                    for (var j = 0; j < table.childWidgets.length; j++) {
                        i = this.insertedNodes.length;
                        var row = table.childWidgets[j];
                        for (var k = 0; k < row.childWidgets.length; k++) {
                            var cell_1 = row.childWidgets[k];
                            var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                            if (this.insertedNodes.indexOf(cell_1) !== -1) {
                                var offset = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell_1).position;
                                this.insertIndex = offset - num;
                                if (cell_1.ownerTable.childWidgets.length === cell_1.ownerRow.indexInOwner + 1) {
                                    if (this.insertedNodes.indexOf(row.childWidgets[row.childWidgets.length - 1]) !== -1) {
                                        this.insertIndex -= 1;
                                    }
                                }
                                var cellOperations = this.buildCellOperation(cell_1, action, true);
                                for (var l = 0; l < cellOperations.length; l++) {
                                    operations.push(cellOperations[l]);
                                }
                                num += 2;
                            }
                            else {
                                var offset = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell_1).position;
                                this.insertIndex = offset - num;
                                var cellOperations = this.buildCellOperation(cell_1, action, false);
                                for (var l = 0; l < cellOperations.length; l++) {
                                    operations.push(cellOperations[l]);
                                }
                            }
                        }
                    }
                }
            }
            this.insertedNodes = [];
        }
        return operations;
    };
    BaseHistoryInfo.prototype.assignRevisionData = function (type, author, date, revisionId) {
        var markerData = {
            revisionType: type,
            author: author,
            date: date,
            revisionId: revisionId
        };
        return markerData;
    };
    BaseHistoryInfo.prototype.createAcceptRejectOperation = function (action) {
        var start = this.owner.selectionModule.start;
        if (!start.paragraph.isInsideTable) {
            return;
        }
        var row = start.paragraph.associatedCell.ownerRow;
        var length = 0;
        this.insertedText = CONTROL_CHARACTERS.Row;
        if (row.rowFormat.revisions.length > 0) {
            var revision = row.rowFormat.revisions[0];
            var isAcceptOrReject = void 0;
            if (action === 'Accept Change') {
                isAcceptOrReject = 'Accept';
            }
            else if (action === 'Reject Change') {
                isAcceptOrReject = 'Reject';
            }
            this.markerData.push(this.owner.editorModule.getMarkerData(undefined, undefined, revision, isAcceptOrReject));
        }
        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
        var offset = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, row).position;
        if (row.rowFormat.revisions.length > 0) {
            if (row.rowFormat.revisions[0].revisionType === 'Insertion') {
                if (action === 'Accept Change') {
                    this.startIndex = offset;
                    this.tableRelatedLength = 1;
                    this.cellOperation.push(this.getFormatOperation(undefined, 'RemoveRowTrack'));
                }
                else if (action === 'Reject Change') {
                    this.startIndex = offset;
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        length += this.owner.selectionModule.calculateCellLength(row.childWidgets[j]) + 1;
                    }
                    this.tableRelatedLength = length;
                    this.cellOperation.push(this.getDeleteOperation('RemoveRowTrack'));
                }
            }
            else if (row.rowFormat.revisions[0].revisionType === 'Deletion') {
                if (action === 'Accept Change') {
                    this.startIndex = offset;
                    // this.tableRelatedLength = 0;
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        length += this.owner.selectionModule.calculateCellLength(row.childWidgets[j]) + 1;
                    }
                    this.tableRelatedLength = length;
                    this.cellOperation.push(this.getDeleteOperation('RemoveRowTrack'));
                }
                else if (action === 'Reject Change') {
                    this.startIndex = offset;
                    for (var j = 0; j < row.childWidgets.length; j++) {
                        length += this.owner.selectionModule.calculateCellLength(row.childWidgets[j]) + 1;
                    }
                    this.tableRelatedLength = length;
                    this.cellOperation.push(this.getFormatOperation(undefined, 'RemoveRowTrack'));
                }
            }
            this.markerData = [];
        }
    };
    BaseHistoryInfo.prototype.buildRowOperation = function (row, action) {
        this.insertedText = CONTROL_CHARACTERS.Row;
        var rowFormat = {};
        if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
            this.owner.sfdtExportModule.assignRowFormat(rowFormat, row.rowFormat, 0);
        }
        this.format = JSON.stringify(rowFormat);
        if (action === 'InsertTable' && row.rowFormat.revisions.length > 0) {
            var revision = row.rowFormat.revisions[row.rowFormat.revisions.length - 1];
            var lastRevision = this.markerData[this.markerData.length - 1];
            if (!(!isNullOrUndefined(lastRevision) && lastRevision.revisionId === revision.revisionID)) {
                this.markerData.push(this.owner.editorModule.getMarkerData(undefined, undefined, revision));
            }
        }
        this.tableRelatedLength = 1;
        var operation = this.getInsertOperation(action);
        this.format = undefined;
        return operation;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.buildRowOperationForTrackChanges = function (row, action) {
        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
        var length = 0;
        var offset = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, row).position;
        this.startIndex = offset;
        for (var j = 0; j < row.childWidgets.length; j++) {
            length += this.owner.selectionModule.calculateCellLength(row.childWidgets[j]) + 1;
        }
        this.tableRelatedLength = length;
        this.insertedText = CONTROL_CHARACTERS.Row;
        var operation = this.getFormatOperation(undefined, action);
        this.insertedText = '';
        return operation;
    };
    BaseHistoryInfo.prototype.buildCellOperation = function (cell, action, isCellInserted) {
        var operations = [];
        this.tableRelatedLength = isCellInserted ? 1 : 0;
        this.insertedText = CONTROL_CHARACTERS.Cell;
        this.type = 'CellFormat';
        var cellFormat = !isNullOrUndefined(this.owner.sfdtExportModule) ? this.owner.sfdtExportModule.writeCellFormat(cell.cellFormat, 0) : {};
        this.format = JSON.stringify(cellFormat);
        operations.push(this.getInsertOperation(action, false, true));
        if (!isCellInserted) {
            return operations;
        }
        this.tableRelatedLength = isCellInserted ? 1 : 0;
        this.type = 'ParagraphFormat';
        var paragraphFormat = this.owner.sfdtExportModule.writeParagraphFormat(cell.childWidgets[0].paragraphFormat, 0, true);
        this.format = JSON.stringify(paragraphFormat);
        operations.push(this.getInsertOperation(action, false, true));
        this.tableRelatedLength = 0;
        this.type = 'CharacterFormat';
        var characterData = this.owner.sfdtExportModule.writeCharacterFormat(cell.childWidgets[0].characterFormat, 0, true);
        this.format = JSON.stringify(characterData);
        operations.push(this.getInsertOperation(action, false, true));
        this.format = undefined;
        this.type = undefined;
        return operations;
    };
    BaseHistoryInfo.prototype.deleteColumnOperation = function (action) {
        var startCell = this.owner.editorModule.getOwnerCell(this.owner.selectionModule.isForward);
        var endCell = this.owner.editorModule.getOwnerCell(!this.owner.selectionModule.isForward);
        var table = startCell.ownerTable.combineWidget(this.owner.viewer);
        var deleteCells = [];
        var rowStartIndex = 0;
        var count = 0;
        if (action === 'DeleteColumn') {
            deleteCells = table.getColumnCellsForSelection(startCell, endCell);
        }
        else {
            var start = this.owner.selectionModule.getCellLeft(startCell.ownerRow, startCell);
            var end = start + startCell.cellFormat.cellWidth;
            var endCellLeft = this.owner.selectionModule.getCellLeft(endCell.ownerRow, endCell);
            var endCellRight = endCellLeft + endCell.cellFormat.cellWidth;
            var cellInfo = this.owner.editorModule.updateSelectedCellsInTable(start, end, endCellLeft, endCellRight);
            start = cellInfo.start;
            end = cellInfo.end;
            count = table.childWidgets.indexOf(endCell.ownerRow);
            rowStartIndex = table.childWidgets.indexOf(startCell.ownerRow);
            for (var i = rowStartIndex; i <= count; i++) {
                var row = table.childWidgets[i];
                for (var j = 0; j < row.childWidgets.length; j++) {
                    var cell = row.childWidgets[j];
                    var cellStart = this.owner.selectionModule.getCellLeft(row, cell);
                    if (HelperMethods.round(start, 2) <= HelperMethods.round(cellStart, 2)
                        && HelperMethods.round(cellStart, 2) < HelperMethods.round(end, 2)) {
                        deleteCells.push(cell);
                    }
                }
            }
        }
        var isRowSelect = this.owner.selectionModule.isRowSelect() && rowStartIndex != count;
        for (var i = 0; i < deleteCells.length; i++) {
            if (action === 'ClearCells') {
                this.deleteCell(action, deleteCells[i], false);
            }
            else if (action === 'MergeCells') {
                if (i !== 0) {
                    var isRowOffset = isRowSelect && (!deleteCells[0].ownerRow.equals(deleteCells[i].ownerRow)) && deleteCells[i].index == 0;
                    this.deleteCell(action, deleteCells[i], isRowOffset);
                }
            }
            else {
                this.deleteCell('DeleteColumn', deleteCells[i], false);
            }
        }
        if (action === 'MergeCells') {
            this.cellOperation.reverse();
            this.deleteCell('ClearCells', deleteCells[0], false);
        }
    };
    BaseHistoryInfo.prototype.getPasteMergeOperation = function () {
        var cell = this.owner.selectionModule.start.paragraph.associatedCell;
        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
        var offset = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell).position;
        var length = this.owner.selectionModule.calculateCellLength(cell) - 1;
        var firstParagraph = this.owner.selectionModule.getFirstParagraph(cell);
        var lastParagraph = this.owner.selectionModule.getLastParagraph(cell);
        var startline = firstParagraph.firstChild;
        var lastLine = lastParagraph.lastChild;
        this.pasteContent = this.owner.sfdtExportModule.write((this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0), startline, 0, lastLine, lastLine.getEndOffset(), false, true);
        this.startIndex = offset + 1;
        var pasteOperation = {
            action: 'Insert',
            offset: this.startIndex,
            length: length,
            pasteContent: JSON.stringify(this.pasteContent),
            type: 'Paste'
        };
        this.insertedText = CONTROL_CHARACTERS.Cell;
        this.type = 'CellFormat';
        this.startIndex = offset;
        this.endIndex = offset;
        this.format = JSON.stringify(this.owner.sfdtExportModule.writeCellFormat(cell.cellFormat, 0));
        return pasteOperation;
    };
    BaseHistoryInfo.prototype.deleteCell = function (action, cell, isRowDelete) {
        this.tableRelatedLength = this.owner.selectionModule.calculateCellLength(cell) + 1;
        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
        this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell).position;
        this.startIndex -= isRowDelete ? 1 : 0;
        this.tableRelatedLength += isRowDelete ? 1 : 0;
        if (!this.owner.enableTrackChanges) {
            if (action === 'ClearCells') {
                var block = cell.childWidgets[0];
                if (cell.childWidgets.length === 1 && block instanceof ParagraphWidget && block.isEmpty()) {
                    return;
                }
                this.endIndex = this.startIndex + this.tableRelatedLength - 1;
                this.startIndex += 1;
                this.cellOperation.push(this.getDeleteOperation('ClearCells'));
            }
            else {
                this.cellOperation.push(this.getDeleteOperation('DeleteColumn'));
            }
        }
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.getFormatOperation = function (element, action, skipIncrement) {
        if (this.startIndex > this.endIndex) {
            var temp = this.startIndex;
            this.startIndex = this.endIndex;
            this.endIndex = temp;
        }
        var length = 0;
        if (this.endIndex === this.startIndex && !skipIncrement && this.action !== 'DeleteBookmark' && this.action !== 'RemoveEditRange' && this.action !== 'InsertHyperlink') {
            if (this.action === 'BackSpace') {
                this.startIndex--;
            }
            else {
                this.endIndex++;
            }
        }
        if (action === 'RemoveRowTrack') {
            length = this.tableRelatedLength;
        }
        else if (action === 'RowResizing' || action === 'CellResizing' || action === 'ImageResizing') {
            length = this.insertedText.length;
        }
        else {
            length = !isNullOrUndefined(element) ? element.length : this.endIndex - this.startIndex;
        }
        var formatOperation = {
            action: 'Format',
            offset: this.startIndex,
            length: length,
            markerData: this.markerData[this.markerData.length - 1],
            imageData: this.insertedData,
            text: this.insertedText,
            format: this.format
        };
        this.markerData.pop();
        if (!isNullOrUndefined(action)) {
            formatOperation.type = action.toString();
        }
        else {
            formatOperation.type = this.type;
        }
        return formatOperation;
    };
    BaseHistoryInfo.prototype.getRemovedText = function (element) {
        var text = '';
        if (!isNullOrUndefined(element)) {
            var node = element;
            if (node instanceof ParagraphWidget) {
                text += this.getParagraphText(node);
            }
            else if (node instanceof ElementBox) {
                if (node instanceof TextElementBox) {
                    text += node.text;
                }
                else {
                    if (!(node instanceof ListTextElementBox)) {
                        text += ElementBox.objectCharacter;
                    }
                }
            }
            else if (node instanceof TableWidget) {
                text += this.getTableText(node);
            }
            else if (node instanceof TableRowWidget) {
                text += this.getRowText(node);
            }
        }
        else {
            for (var i = this.removedNodes.length - 1; i >= 0; i--) {
                var node = this.removedNodes[i];
                if (node instanceof ParagraphWidget) {
                    text += this.getParagraphText(node);
                }
                else if (node instanceof ElementBox) {
                    if (node instanceof TextElementBox) {
                        text += node.text;
                    }
                    else {
                        if (!(node instanceof ListTextElementBox)) {
                            text += ElementBox.objectCharacter;
                        }
                    }
                }
                else if (node instanceof TableWidget) {
                    text += this.getTableText(node);
                }
                else if (node instanceof TableRowWidget) {
                    text += this.getRowText(node);
                }
            }
        }
        return text;
    };
    BaseHistoryInfo.prototype.getRevisionOperation = function (revision) {
        if (revision.revisionType === 'Insertion') {
            // Accept operation - Insertion
            this.markerData.push(this.owner.editorModule.getMarkerData(undefined, undefined, revision, 'Accept'));
            return this.getFormatOperation();
        }
        else if (revision.revisionType === 'Deletion') {
            // Reject operation - Deletion
            this.markerData.push(this.owner.editorModule.getMarkerData(undefined, undefined, revision, 'Reject'));
            return this.getFormatOperation();
        }
        return {};
    };
    BaseHistoryInfo.prototype.getRemovedFieldCode = function () {
        var fieldCode = '';
        var isStarted = false;
        for (var i = this.removedNodes.length - 1; i >= 0; i--) {
            var node = this.removedNodes[i];
            if (node instanceof ElementBox) {
                if (node instanceof FieldElementBox && node.fieldType === 0) {
                    isStarted = true;
                }
                if (node && node instanceof TextElementBox) {
                    if (isStarted) {
                        fieldCode += node.text;
                    }
                }
                if (node instanceof FieldElementBox
                    && (node.fieldType === 2 || node.fieldType === 1)) {
                    return fieldCode;
                }
            }
            else if (node instanceof ParagraphWidget) {
                for (var i_2 = 0; i_2 < node.childWidgets.length; i_2++) {
                    var lineWidget = node.childWidgets[i_2];
                    for (var j = 0; j < lineWidget.children.length; j++) {
                        var element = lineWidget.children[j];
                        if (element instanceof FieldElementBox && element.fieldType === 0) {
                            isStarted = true;
                        }
                        if (element instanceof TextElementBox) {
                            if (isStarted) {
                                fieldCode += element.text;
                            }
                        }
                        if (element instanceof FieldElementBox
                            && (element.fieldType === 2 || element.fieldType === 1)) {
                            return fieldCode;
                        }
                    }
                }
            }
        }
        return undefined;
    };
    //  Add for loop to iterate paragraph child elements and get text 
    BaseHistoryInfo.prototype.getParagraphText = function (paragraph) {
        var text = '';
        if (!isNullOrUndefined(paragraph) && !isNullOrUndefined(paragraph.childWidgets)) {
            for (var i = 0; i < paragraph.childWidgets.length; i++) {
                var line = paragraph.childWidgets[i];
                for (var j = 0; j < line.children.length; j++) {
                    if (line.children[j] instanceof ListTextElementBox) {
                        continue;
                    }
                    if (line.children[j] instanceof TextElementBox) {
                        text += line.children[j].text;
                    }
                    else {
                        text += ElementBox.objectCharacter;
                    }
                }
            }
            return text + '\n';
        }
        return text;
    };
    //  Add for loop to iterate table child elements and get text
    BaseHistoryInfo.prototype.getTableText = function (table) {
        var text = CONTROL_CHARACTERS.Table;
        for (var i = 0; i < table.childWidgets.length; i++) {
            var row = table.childWidgets[i];
            text += this.getRowText(row);
        }
        return text;
    };
    // Add for loop to iterate table row child elements and get text
    BaseHistoryInfo.prototype.getRowText = function (row) {
        var text = CONTROL_CHARACTERS.Row;
        for (var j = 0; j < row.childWidgets.length; j++) {
            var cell = row.childWidgets[j];
            for (var k = 0; k < cell.childWidgets.length; k++) {
                text += CONTROL_CHARACTERS.Cell;
                var block = cell.childWidgets[k];
                if (block instanceof ParagraphWidget) {
                    text += this.getParagraphText(block);
                }
                else {
                    text += this.getTableText(block);
                }
            }
        }
        return text;
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.getCommentOperation = function (operation, action, comment) {
        if (action === 'InsertInline' || action === 'RemoveInline') {
            var commentRangeElement = action === 'RemoveInline' ? this.removedNodes[0] : this.insertedElement;
            var commentElement = commentRangeElement.comment;
            operation.text = commentRangeElement.commentType === 0 ? CONTROL_CHARACTERS.Marker_Start : CONTROL_CHARACTERS.Marker_End;
            operation.markerData = {
                type: 'Comment',
                commentId: commentRangeElement.commentId,
                ownerCommentId: commentElement.isReply ? commentElement.ownerComment.commentId : undefined
            };
        }
        else if (action === 'InsertCommentWidget' || action === 'DeleteCommentWidget') {
            if (isNullOrUndefined(comment)) {
                comment = this.removedNodes[0];
            }
            operation.length = 1;
            operation.action = 'Format';
            operation.offset = this.startIndex < this.endIndex ? this.endIndex : this.startIndex;
            // To get the offset of end comment element box we are seperating minus one to it.
            operation.offset -= 1;
            operation.text = CONTROL_CHARACTERS.Marker_Start + CONTROL_CHARACTERS.Marker_End;
            operation.markerData = {
                type: 'Comment',
                commentId: comment.commentId,
                author: comment.author,
                date: comment.date,
                commentIndex: comment.isReply ? comment.ownerComment.replyComments.indexOf(comment) : this.owner.documentHelper.comments.indexOf(comment),
                initial: comment.initial,
                done: comment.isResolved,
                text: comment.text,
                isReply: comment.isReply
            };
            if (!isNullOrUndefined(comment.ownerComment)) {
                // Get the position of the comment owner offset
                var position = this.owner.selection.getElementPosition(comment.ownerComment.commentEnd, true).startPosition;
                operation.offset = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(position);
            }
            if (action === 'DeleteCommentWidget') {
                operation.offset = this.startIndex < this.endIndex ? this.endIndex : this.startIndex;
                // To get the offset of end comment element box we are seperating minus one to it. 
                operation.offset -= 1;
                operation.markerData.commentAction = 'remove';
            }
            else if (action === 'InsertCommentWidget') {
                operation.markerData.commentAction = 'add';
            }
        }
        else if (action === 'ResolveComment') {
            operation.action = 'Format';
            operation.length = 1;
            operation.text = CONTROL_CHARACTERS.Marker_Start + CONTROL_CHARACTERS.Marker_End;
            operation.offset = this.startIndex < this.endIndex ? this.endIndex : this.startIndex;
            // To get the offset of end comment element box we are seperating minus one to it.
            operation.offset -= 1;
            operation.markerData = {
                type: 'Comment',
                commentId: comment.commentId,
                done: comment.isResolved
            };
        }
        else if (action === 'EditComment') {
            operation.action = 'Format';
            operation.length = 1;
            operation.text = CONTROL_CHARACTERS.Marker_Start + CONTROL_CHARACTERS.Marker_End;
            operation.offset = this.startIndex < this.endIndex ? this.endIndex : this.startIndex;
            // To get the offset of end comment element box we are seperating minus one to it.
            operation.offset -= 1;
            operation.markerData = {
                type: 'Comment',
                text: comment.text,
            };
        }
        return operation;
    };
    /**
     * @private
     */
    BaseHistoryInfo.prototype.getDeleteCommentOperation = function (modifiedActions, operations) {
        for (var i = 0; i < modifiedActions.length; i++) {
            var currentHistory = modifiedActions[i];
            if (currentHistory instanceof HistoryInfo && (currentHistory.action === 'DeleteComment')) {
                this.getDeleteCommentOperation(currentHistory.modifiedActions, operations);
            }
            else {
                var operation = currentHistory.getDeleteOperation(currentHistory.action);
                currentHistory.getCommentOperation(operation, currentHistory.action);
                if (currentHistory.action === 'DeleteCommentWidget' && !isNullOrUndefined(modifiedActions[i + 1])) {
                    // For update operation we need end offset. So taking the offset from end remove inline history.
                    var updateHistory = modifiedActions[i + 1];
                    operation.offset = updateHistory.startIndex < updateHistory.endIndex ? updateHistory.startIndex : updateHistory.endIndex;
                }
                operations.push(operation);
            }
        }
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.buildFormatOperation = function (action, ischarFormat) {
        var operations = [];
        if ((action === 'ApplyStyle' || action === 'StyleName') && this.insertedFormat instanceof WParagraphStyle) {
            this.insertedFormat = this.insertedFormat.name;
            this.type = 'ParagraphFormat';
            this.createParagraphFormat(action);
        }
        else {
            if (action === 'ApplyStyle' || action === 'StyleName') {
                if (this.insertedFormat instanceof WCharacterFormat && this.insertedFormat.baseCharStyle) {
                    this.insertedFormat = this.insertedFormat.baseCharStyle.name;
                }
                else {
                    this.insertedFormat = this.insertedFormat.name;
                }
            }
            if (ischarFormat) {
                this.type = 'CharacterFormat';
                this.createCharacterFormat(action);
            }
            else {
                this.type = action == 'ContinueNumbering' ? 'ContinueNumbering' : 'ParagraphFormat';
                this.createParagraphFormat(action);
            }
        }
        operations = this.getSelectedCellOperation(action, ischarFormat);
        this.format = undefined;
        return operations;
    };
    /**
     * @private
     * @returns {Operation}
     */
    BaseHistoryInfo.prototype.getSelectedCellOperation = function (action, ischarFormat, isBorder, isShading, isCell) {
        var operations = [];
        var start = this.owner.selectionModule.start;
        var end = this.owner.selectionModule.end;
        if (start.paragraph.isInsideTable && end.paragraph.isInsideTable && (start.paragraph.associatedCell.ownerTable.equals(end.paragraph.associatedCell.ownerTable)
            && this.owner.selectionModule.isCellSelected(start.paragraph.associatedCell, start, end))) {
            var selectCells = this.owner.selectionModule.getSelectedCells();
            for (var i = 0; i < selectCells.length; i++) {
                var cell = selectCells[i];
                var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, cell).position;
                // Plus one is for cell index
                var length_4 = this.owner.selectionModule.calculateCellLength(cell) + 1;
                this.endIndex = this.startIndex + length_4;
                if (length_4 === 0 && ischarFormat) {
                    continue;
                }
                if ((this.editorHistory.isUndoing || this.editorHistory.isRedoing) && !ischarFormat) {
                    if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                        var cellFormat = this.owner.sfdtExportModule.writeCellFormat(cell.cellFormat, 0);
                        this.format = JSON.stringify(cellFormat);
                    }
                }
                else {
                    this.writeBorderFormat(isBorder, isShading, cell);
                }
                var formatOperation = void 0;
                if (action === 'ListFormat') {
                    formatOperation = this.getFormatOperation(undefined, undefined, true);
                    formatOperation.type = 'ListFormat';
                    this.createListFormat(action, formatOperation);
                }
                else {
                    formatOperation = this.getFormatOperation(undefined, undefined, true);
                }
                operations.push(formatOperation);
            }
        }
        else {
            var operation = void 0;
            if (action === 'ListFormat') {
                operation = this.getFormatOperation(undefined, action);
                this.createListFormat(action, operation);
            }
            else {
                if (start.paragraph.isInsideTable && isCell) {
                    var paragraphInfo = { 'paragraph': null, 'offset': 0 };
                    this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, start.paragraph.associatedCell).position;
                    var length_5 = this.owner.selectionModule.calculateCellLength(start.paragraph.associatedCell) + 1;
                    this.endIndex = this.startIndex + length_5;
                    this.writeBorderFormat(isBorder, isShading, start.paragraph.associatedCell);
                }
                if (action === 'ClearFormat' && this.editorHistory.isUndoing) {
                    this.buildclearFormatOperations(operations);
                    return operations;
                }
                else {
                    operation = this.getFormatOperation(undefined, undefined, true);
                }
            }
            operations.push(operation);
        }
        return operations;
    };
    BaseHistoryInfo.prototype.buildclearFormatOperations = function (operations) {
        var start = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.collabStart);
        var end = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.collabEnd);
        var block = start.paragraph;
        var isBreak = false;
        do {
            isBreak = block.equals(end.paragraph);
            if (block instanceof ParagraphWidget) {
                this.buildclearFormatOperation(block, operations);
            }
            else {
                var positionInfo = { done: false };
                this.tableClearFormatOperation(block, end.paragraph, operations, positionInfo);
                if (positionInfo.done) {
                    isBreak = true;
                }
            }
            block = block.nextRenderedWidget;
        } while (!isBreak);
    };
    BaseHistoryInfo.prototype.tableClearFormatOperation = function (table, endParagraph, operations, positionInfo) {
        var row = table.firstChild;
        while (row) {
            var cell = row.firstChild;
            while (cell) {
                var childBlock = cell.firstChild;
                if (childBlock instanceof ParagraphWidget) {
                    this.buildclearFormatOperation(childBlock, operations);
                }
                else {
                    this.tableClearFormatOperation(childBlock, endParagraph, operations, positionInfo);
                    if (positionInfo.done) {
                        return;
                    }
                }
                if (endParagraph.equals(childBlock)) {
                    positionInfo.done = true;
                    return;
                }
                cell = cell.nextWidget;
            }
            row = row.getSplitWidgets().pop().nextRenderedWidget;
        }
    };
    BaseHistoryInfo.prototype.buildclearFormatOperation = function (paragraph, operations) {
        var isParagraphFormat = true;
        for (var i = 0; i < paragraph.childWidgets.length; i++) {
            var inlines = paragraph.childWidgets[i];
            for (var j = 0; j < inlines.children.length; j++) {
                if (inlines.children[j] instanceof TextElementBox) {
                    var currentStart = this.owner.selectionModule.getElementPosition(inlines.children[j], true).startPosition;
                    this.startIndex = this.owner.selectionModule.getAbsolutePositionFromRelativePosition(currentStart);
                    var operation = this.getFormatOperation(inlines.children[j]);
                    operation.length += 1;
                    if (isParagraphFormat) {
                        var paraFormatOperation = {
                            action: 'Format',
                            offset: operation.offset,
                            length: operation.length,
                            type: 'ParagraphFormat',
                            format: JSON.stringify(this.owner.sfdtExportModule.writeParagraphFormat(paragraph.paragraphFormat, 0, true))
                        };
                        operations.push(paraFormatOperation);
                        isParagraphFormat = false;
                    }
                    operation.type = 'CharacterFormat';
                    operation.format = JSON.stringify(this.owner.sfdtExportModule.writeCharacterFormat(inlines.children[j].characterFormat, 0, true));
                    operations.push(operation);
                }
            }
        }
    };
    BaseHistoryInfo.prototype.writeBorderFormat = function (isBorder, isShading, cell) {
        var cellFormat = {};
        if (isBorder) {
            cellFormat['borders'] = HelperMethods.writeBorders(cell.cellFormat.borders, 0);
            this.format = JSON.stringify(cellFormat);
        }
        if (isShading) {
            cellFormat['shading'] = this.owner.sfdtExportModule ? this.owner.sfdtExportModule.writeShading(cell.cellFormat.shading, 0) : {};
            this.format = JSON.stringify(cellFormat);
        }
    };
    BaseHistoryInfo.prototype.createListFormat = function (action, operation) {
        var listId;
        var nsid;
        if (action === 'ListFormat') {
            listId = this.insertedFormat.listId;
            operation.text = action.toString().charAt(0).toLowerCase() + action.toString().slice(1);
        }
        else {
            listId = this.insertedFormat.listId;
            nsid = this.insertedFormat.nsid;
        }
        if (listId > -1) {
            var list = this.owner.documentHelper.getListById(listId);
            var listData = {};
            listData.optimizeSfdt = this.owner.documentEditorSettings.optimizeSfdt;
            if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                this.owner.sfdtExportModule.keywordIndex = this.owner.documentEditorSettings.optimizeSfdt ? 1 : 0;
                listData[listsProperty[this.owner.sfdtExportModule.keywordIndex]] = [];
                listData[listsProperty[this.owner.sfdtExportModule.keywordIndex]].push(this.owner.sfdtExportModule.writeList(list));
                listData[abstractListsProperty[this.owner.sfdtExportModule.keywordIndex]] = [];
                if (!isNullOrUndefined(list)) {
                    listData[abstractListsProperty[this.owner.sfdtExportModule.keywordIndex]].push(this.owner.sfdtExportModule.writeAbstractList(list.abstractList));
                }
                if (action == 'RestartNumbering') {
                    listData[listIdProperty[this.owner.sfdtExportModule.keywordIndex]] = listId;
                    listData[nsidProperty] = nsid;
                }
            }
            operation.listData = JSON.stringify(listData);
        }
    };
    BaseHistoryInfo.prototype.createCharacterFormat = function (action) {
        var characterFormat = {};
        if (action === 'Uppercase') {
            characterFormat.Uppercase = true;
        }
        else if (action === 'Lowercase') {
            characterFormat.Lowercase = true;
        }
        else if (action === 'SentenceCase') {
            characterFormat.SentenceCase = true;
        }
        else if (action === 'ToggleCase') {
            characterFormat.ToggleCase = true;
        }
        else if (action === 'CapitalizeEachWord') {
            characterFormat.CapitalizeEachWord = true;
        }
        else if (action === 'ApplyStyle' || action === 'StyleName') {
            if (isNullOrUndefined(this.insertedFormat)) {
                characterFormat.styleName = null;
            }
            else {
                characterFormat.styleName = this.insertedFormat;
            }
        }
        else if (action === 'CharacterFormat') {
            var charFormat = this.insertedFormat;
            characterFormat.bold = charFormat.hasValue('bold') ? charFormat.bold : characterFormat.bold;
            characterFormat.italic = charFormat.hasValue('italic') ? charFormat.italic : characterFormat.italic;
            characterFormat.fontSize = charFormat.hasValue('fontSize') ? charFormat.fontSize : characterFormat.fontSize;
            characterFormat.underline = charFormat.hasValue('underline') ? charFormat.underline : characterFormat.underline;
            characterFormat.strikethrough = charFormat.hasValue('strikethrough') ? charFormat.strikethrough : characterFormat.strikethrough;
            characterFormat.baselineAlignment = charFormat.hasValue('baselineAlignment') ? charFormat.baselineAlignment : characterFormat.baselineAlignment;
            characterFormat.highlightColor = charFormat.hasValue('highlightColor') ? charFormat.highlightColor : characterFormat.highlightColor;
            characterFormat.fontColor = charFormat.hasValue('fontColor') ? charFormat.fontColor : characterFormat.fontColor;
            characterFormat.fontFamily = charFormat.hasValue('fontFamily') ? charFormat.fontFamily : characterFormat.fontFamily;
            characterFormat.allCaps = charFormat.hasValue('allCaps') ? charFormat.allCaps : characterFormat.allCaps;
            characterFormat.LowerCase = charFormat.hasValue('Lowercase') ? charFormat.Lowercase : characterFormat.Lowercase;
            characterFormat.Uppercase = charFormat.hasValue('Uppercase') ? charFormat.Lowercase : characterFormat.Uppercase;
            characterFormat.CapitalizeEachWord = charFormat.hasValue('CapitalizeEachWord') ? charFormat.CapitalizeEachWord : characterFormat.CapitalizeEachWord;
            characterFormat.SentenceCase = charFormat.hasValue('SentenceCase') ? charFormat.SentenceCase : characterFormat.SentenceCase;
            characterFormat.ToggleCase = charFormat.hasValue('ToggleCase') ? charFormat.ToggleCase : characterFormat.ToggleCase;
        }
        else {
            if (this.insertedFormat === 'increment' || this.insertedFormat === 'decrement') {
                this.type = this.insertedFormat;
                characterFormat.fontSize = 0;
            }
            else {
                if (action !== 'ClearFormat') {
                    var text = action.toString().charAt(0).toLowerCase() + action.toString().slice(1);
                    if (this.insertedFormat instanceof WCharacterFormat && (this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
                        this.insertedFormat = this.insertedFormat[text];
                    }
                    characterFormat[text] = this.insertedFormat;
                }
            }
        }
        this.format = JSON.stringify(characterFormat);
    };
    BaseHistoryInfo.prototype.createParagraphFormat = function (action) {
        var paragraphFormat = {};
        if (action === 'ParagraphFormat' || action === 'ContinueNumbering') {
            var paraFormat = this.insertedFormat;
            paragraphFormat.afterSpacing = paraFormat.hasValue('afterSpacing') ? paraFormat.afterSpacing : paragraphFormat.afterSpacing;
            paragraphFormat.beforeSpacing = paraFormat.hasValue('beforeSpacing') ? paraFormat.beforeSpacing : paragraphFormat.beforeSpacing;
            paragraphFormat.spaceAfterAuto = paraFormat.hasValue('spaceAfterAuto') ? paraFormat.spaceAfterAuto : paragraphFormat.spaceAfterAuto;
            paragraphFormat.spaceBeforeAuto = paraFormat.hasValue('spaceBeforeAuto') ? paraFormat.spaceBeforeAuto : paragraphFormat.spaceBeforeAuto;
            paragraphFormat.rightIndent = paraFormat.hasValue('rightIndent') ? paraFormat.rightIndent : paragraphFormat.rightIndent;
            paragraphFormat.leftIndent = paraFormat.hasValue('leftIndent') ? paraFormat.leftIndent : paragraphFormat.leftIndent;
            paragraphFormat.firstLineIndent = paraFormat.hasValue('firstLineIndent') ? paraFormat.firstLineIndent : paragraphFormat.firstLineIndent;
            paragraphFormat.lineSpacing = paraFormat.hasValue('lineSpacing') ? paraFormat.lineSpacing : paragraphFormat.lineSpacing;
            paragraphFormat.lineSpacingType = paraFormat.hasValue('lineSpacingType') ? paraFormat.lineSpacingType : paragraphFormat.lineSpacingType;
            paragraphFormat.textAlignment = paraFormat.hasValue('textAlignment') ? paraFormat.textAlignment : paragraphFormat.textAlignment;
            paragraphFormat.outlineLevel = paraFormat.hasValue('outlineLevel') ? paraFormat.outlineLevel : paragraphFormat.outlineLevel;
            paragraphFormat.bidi = paraFormat.hasValue('bidi') ? paraFormat.bidi : paragraphFormat.bidi;
            if (paragraphFormat.bidi) {
                if (paragraphFormat.textAlignment === 'Right') {
                    paragraphFormat.textAlignment = 'Left';
                }
                else if (paragraphFormat.textAlignment === 'Left') {
                    paragraphFormat.textAlignment = 'Right';
                }
            }
            paragraphFormat.borders = paraFormat.hasValue('borders') ? paraFormat.borders : paragraphFormat.borders;
            if (paraFormat.listFormat.listId !== -1) {
                var listFormat = {};
                listFormat.listId = paraFormat.listFormat.listId;
                listFormat.listLevelNumber = paraFormat.listFormat.listLevelNumber;
                listFormat.nsid = paraFormat.listFormat.nsid;
                paragraphFormat.listFormat = listFormat;
            }
            paragraphFormat.styleName = paraFormat.hasValue('styleName') ? paragraphFormat.styleName.name : undefined;
            paragraphFormat.contextualSpacing = paraFormat.hasValue('contextualSpacing') ? paraFormat.contextualSpacing : paragraphFormat.contextualSpacing;
            paragraphFormat.keepWithNext = paraFormat.hasValue('keepWithNext') ? paraFormat.keepWithNext : paragraphFormat.keepWithNext;
            paragraphFormat.keepLinesTogether = paraFormat.hasValue('keepLinesTogether') ? paraFormat.keepLinesTogether : paragraphFormat.keepLinesTogether;
            paragraphFormat.widowControl = paraFormat.hasValue('contextualSpacing') ? paraFormat.widowControl : paragraphFormat.widowControl;
        }
        else if (action === 'ListFormat') {
            if (this.insertedFormat instanceof WParagraphFormat) {
                this.insertedFormat = this.insertedFormat.listFormat;
            }
            var listFormat = {};
            listFormat.listId = this.insertedFormat.listId;
            listFormat.nsid = this.insertedFormat.nsid;
            listFormat.listLevelNumber = this.insertedFormat.listLevelNumber;
            paragraphFormat.listFormat = listFormat;
        }
        else if (action === 'ApplyStyle' || action === 'StyleName') {
            paragraphFormat.styleName = this.insertedFormat;
        }
        else if (action === 'ParagraphBidi') {
            paragraphFormat.bidi = this.insertedFormat;
        }
        else if (action === 'Borders') {
            paragraphFormat['borders'] = HelperMethods.writeBorders(this.insertedFormat, 0);
        }
        else {
            if (this.insertedFormat instanceof WParagraphFormat) {
                var paraFormat = this.owner.sfdtExportModule.writeParagraphFormat(this.insertedFormat, 0);
                paragraphFormat[action.toString().charAt(0).toLowerCase() + action.toString().slice(1)] = paraFormat;
            }
            else if (action === 'List') {
                paragraphFormat = this.insertedFormat;
            }
            else {
                paragraphFormat[action.toString().charAt(0).toLowerCase() + action.toString().slice(1)] = this.insertedFormat;
            }
        }
        this.format = JSON.stringify(paragraphFormat);
    };
    /**
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.createTableFormat = function (action) {
        var paragraphInfo = { 'paragraph': null, 'offset': 0 };
        this.startIndex = this.owner.selectionModule.getPositionInfoForHeaderFooter(paragraphInfo, { position: 0, done: false }, this.owner.selectionModule.start.paragraph.associatedCell.ownerTable).position;
        this.endIndex = this.startIndex;
        this.endIndex += this.owner.selectionModule.getBlockLength(undefined, this.owner.selectionModule.start.paragraph.associatedCell.ownerTable.combineWidget(this.owner.viewer), 0, { done: false }, true, undefined, undefined) - 1;
        var tableFormat = {};
        if (action === 'TableFormat') {
            var tabFormat = this.insertedFormat;
            if (!isNullOrUndefined(tabFormat)) {
                tableFormat.bidi = tabFormat.hasValue('bidi') ? tabFormat.bidi : undefined;
                tableFormat.preferredWidth = tabFormat.hasValue('preferredWidth') ? tabFormat.preferredWidth : undefined;
                tableFormat.preferredWidthType = tabFormat.hasValue('preferredWidthType') ? tabFormat.preferredWidthType : undefined;
                tableFormat.tableAlignment = tabFormat.hasValue('tableAlignment') ? tabFormat.tableAlignment : undefined;
                tableFormat.leftIndent = tabFormat.hasValue('leftIndent') ? tabFormat.leftIndent : undefined;
            }
        }
        else if (action === 'TableOptions') {
            var tableOption = this.owner.selectionModule.start.paragraph.associatedCell.ownerTable.tableFormat;
            if (!isNullOrUndefined(tableOption)) {
                tableFormat.cellSpacing = tableOption.hasValue('cellSpacing') ? tableOption.cellSpacing : undefined;
                tableFormat.leftMargin = tableOption.hasValue('leftMargin') ? tableOption.leftMargin : undefined;
                tableFormat.topMargin = tableOption.hasValue('topMargin') ? tableOption.topMargin : undefined;
                tableFormat.rightMargin = tableOption.hasValue('rightMargin') ? tableOption.rightMargin : undefined;
                tableFormat.bottomMargin = tableOption.hasValue('bottomMargin') ? tableOption.bottomMargin : undefined;
            }
        }
        else if (action === 'BordersAndShading') {
            var tabBorderFormat = this.insertedFormat;
            tableFormat = !isNullOrUndefined(this.owner.sfdtExportModule) ? this.owner.sfdtExportModule.writeTableFormat(tabBorderFormat, 0) : {};
        }
        else {
            tableFormat[this.getTableFormatString(action)] = this.insertedFormat;
        }
        this.format = JSON.stringify(tableFormat);
    };
    /**
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.createRowFormat = function (action) {
        var rowFormat = {};
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                this.owner.sfdtExportModule.assignRowFormat(rowFormat, this.owner.selectionModule.start.paragraph.associatedCell.ownerRow.rowFormat, 0);
            }
        }
        else {
            if (action === 'RowFormat') {
                var rForamt = this.insertedFormat;
                if (!isNullOrUndefined(rForamt)) {
                    rowFormat.height = rForamt.hasValue('height') ? rForamt.height : undefined;
                    rowFormat.heightType = rForamt.hasValue('heightType') ? rForamt.heightType : undefined;
                    rowFormat.isHeader = rForamt.hasValue('isHeader') ? rForamt.isHeader : undefined;
                    rowFormat.allowBreakAcrossPages = rForamt.hasValue('allowBreakAcrossPages') ? rForamt.allowBreakAcrossPages : undefined;
                }
            }
            else {
                rowFormat[this.getRowString(action)] = this.insertedFormat;
            }
        }
        this.format = JSON.stringify(rowFormat);
    };
    /**
     * @private
     * @returns {void}
     */
    BaseHistoryInfo.prototype.createCellFormat = function (action) {
        var cellFormat = {};
        if (action === 'CellFormat') {
            var cFormat = this.insertedFormat;
            cellFormat.preferredWidth = cFormat.hasValue('preferredWidth') ? cFormat.preferredWidth : undefined;
            cellFormat.preferredWidthType = cFormat.hasValue('preferredWidthType') ? cFormat.preferredWidthType : undefined;
            cellFormat.verticalAlignment = cFormat.hasValue('verticalAlignment') ? cFormat.verticalAlignment : undefined;
        }
        else if (action === 'CellOptions') {
            var cellOption = this.insertedFormat;
            cellFormat.leftMargin = cellOption.leftMargin;
            cellFormat.rightMargin = cellOption.rightMargin;
            cellFormat.bottomMargin = cellOption.bottomMargin;
            cellFormat.topMargin = cellOption.topMargin;
        }
        else if (action === 'Shading') {
            cellFormat[this.getCellString(action)] = !isNullOrUndefined(this.owner.sfdtExportModule) ? this.owner.sfdtExportModule.writeShading(this.insertedFormat, 0) : {};
        }
        else if (action === 'Borders') {
            cellFormat['borders'] = HelperMethods.writeBorders(this.insertedFormat, 0);
        }
        else if (action === 'BordersAndShading') {
            cellFormat['shading'] = !isNullOrUndefined(this.owner.sfdtExportModule) ? this.owner.sfdtExportModule.writeShading(this.insertedFormat, 0) : {};
            cellFormat['borders'] = HelperMethods.writeBorders(this.insertedFormat.borders, 0);
        }
        else {
            cellFormat[this.getCellString(action)] = this.insertedFormat;
        }
        this.format = JSON.stringify(cellFormat);
    };
    BaseHistoryInfo.prototype.getTableFormatString = function (property) {
        switch (property) {
            case 'TableAlignment':
                return 'tableAlignment';
            case 'TableLeftIndent':
                return 'leftIndent';
            case 'DefaultCellLeftMargin':
                return 'leftMargin';
            case 'DefaultCellRightMargin':
                return 'rightMargin';
            case 'DefaultCellBottomMargin':
                return 'bottomMargin';
            case 'DefaultCellTopMargin':
                return 'topMargin';
            case 'TablePreferredWidth':
                return 'preferredWidth';
            case 'TablePreferredWidthType':
                return 'preferredWidthType';
            case 'Shading':
                return 'shading';
            case 'TableBidi':
                return 'bidi';
            default:
                return 'cellSpacing';
        }
    };
    BaseHistoryInfo.prototype.createSectionFormat = function (action) {
        var sectionFormat = {};
        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
            if (!isNullOrUndefined(this.owner.sfdtExportModule)) {
                this.owner.sfdtExportModule.writeSectionFormat(this.owner.selectionModule.start.paragraph.bodyWidget.sectionFormat, sectionFormat, 0);
            }
        }
        else {
            if (action === 'LinkToPrevious') {
                var headerFooterWidget = this.owner.selectionModule.start.paragraph.bodyWidget;
                var sectionIndex = headerFooterWidget.sectionIndex;
                var headerFooterType = headerFooterWidget.headerFooterType;
                this.format = JSON.stringify({ linkToPrevious: this.insertedFormat, sectionIndex: sectionIndex, headerFooterType: headerFooterType });
                return;
            }
            else if (action === 'SectionFormat') {
                var secFormat = this.insertedFormat;
                this.owner.sfdtExportModule.writeSectionFormat(secFormat, sectionFormat, 0);
            }
            else {
                sectionFormat[action[0].toLowerCase() + action.slice(1)] = this.insertedFormat;
            }
        }
        this.format = JSON.stringify(sectionFormat);
    };
    BaseHistoryInfo.prototype.getRowString = function (property) {
        switch (property) {
            case 'RowHeight':
                return 'height';
            case 'RowHeightType':
                return 'heightType';
            case 'RowHeader':
                return 'isHeader';
            default:
                return 'allowBreakAcrossPages';
        }
    };
    BaseHistoryInfo.prototype.getCellString = function (property) {
        switch (property) {
            case 'CellContentVerticalAlignment':
                return 'verticalAlignment';
            case 'CellLeftMargin':
                return 'leftMargin';
            case 'CellRightMargin':
                return 'rightMargin';
            case 'CellBottomMargin':
                return 'bottomMargin';
            case 'CellTopMargin':
                return 'topMargin';
            case 'CellPreferredWidth':
                return 'preferredWidth';
            case 'Shading':
                return 'shading';
            default:
                return 'preferredWidthType';
        }
    };
    return BaseHistoryInfo;
}());
export { BaseHistoryInfo };
