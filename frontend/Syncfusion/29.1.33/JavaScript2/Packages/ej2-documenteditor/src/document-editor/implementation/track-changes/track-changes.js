import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { ElementBox, ParagraphWidget, BookmarkElementBox, FootnoteElementBox, HeaderFooterWidget, ShapeElementBox } from '../viewer/page';
import { WCharacterFormat } from '../format/character-format';
import { WRowFormat } from '../format/row-format';
import { revisionActionEvent } from '../../base/index';
/**
 * The revision class which holds the information related to changes made in the document
 */
var Revision = /** @class */ (function () {
    function Revision(documentHelper, author, date) {
        /**
         * Gets or sets the author name who made the change
         *
         * @private
         */
        this.author = null;
        /**
         * Indicates when the track changes made
         *
         * @private
         */
        this.date = null;
        /**
         * Holds the reference of the items which are under this revision.
         *
         * @private
         */
        this.range = [];
        /**
         * @private
         */
        this.revisionID = '';
        /**
         * Used to update cursor position by ensuring items were removed or not
         */
        this.isContentRemoved = false;
        this.isTableRevision = false;
        /**
         * Indicates whether to skip unlinking ranges for table elements.
         */
        this.canSkipTableItems = false;
        this.skipUnLinkElement = false;
        this.author = author;
        if (isNullOrUndefined(this.author)) {
            this.author = "Unknown";
        }
        this.date = date;
        this.owner = documentHelper;
    }
    Revision.prototype.handleAcceptReject = function (isFromAccept, reLayoutTable) {
        this.owner.selectionModule.selectRevision(this);
        var selection = this.owner.selectionModule;
        var startPos = selection.start;
        var endPos = selection.end;
        if (!selection.start.isExistBefore(selection.end)) {
            startPos = selection.end;
            endPos = selection.start;
        }
        var blockInfo = selection.getParagraphInfo(startPos);
        var removeChanges = (!isNullOrUndefined(isFromAccept)) && ((this.revisionType === 'MoveFrom' || this.revisionType === 'Deletion') && isFromAccept) || ((this.revisionType === 'Insertion' || this.revisionType === 'MoveTo') && !isFromAccept);
        var comments;
        if (removeChanges) {
            var commentInfo = this.owner.editorModule.getSelectedComments();
            if (commentInfo.commentEndInfo.length > 0 || commentInfo.commentStartInfo.length > 0) {
                comments = this.owner.editorModule.checkAndRemoveComments(false, true);
            }
            else {
                removeChanges = false;
            }
        }
        this.owner.editorModule.initHistory(isFromAccept ? 'Accept Change' : 'Reject Change');
        var fieldBegin = selection.getHyperlinkField();
        if (isFromAccept && this.revisionType === 'Deletion' && !isNullOrUndefined(fieldBegin)
            && this.range.indexOf(fieldBegin) !== -1 && this.range.indexOf(fieldBegin.fieldEnd) !== -1 && this.range.indexOf(fieldBegin.fieldSeparator) === this.range.indexOf(fieldBegin.fieldEnd) - 1) {
            this.owner.editorHistoryModule.currentBaseHistoryInfo.isHyperlinkField = true;
        }
        this.owner.editorHistoryModule.currentBaseHistoryInfo.markerData.push(this.owner.editorModule.getMarkerData(undefined, undefined, this));
        if (this.revisionType === 'Deletion') {
            blockInfo = selection.getParagraphInfo(this.owner.selectionModule.start);
            selection.editPosition = this.owner.selectionModule.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        }
        else {
            selection.editPosition = this.owner.selectionModule.getHierarchicalIndex(blockInfo.paragraph, blockInfo.offset.toString());
        }
        this.owner.editorModule.updateInsertPosition();
        this.isContentRemoved = false;
        this.canSkipTableItems = false;
        this.skipUnLinkElement = false;
        // Implement to accept/reject the revision
        if (this.revisionType === 'Insertion' || this.revisionType === 'Deletion' || this.revisionType === 'MoveFrom' || this.revisionType === 'MoveTo') {
            this.owner.isShiftingEnabled = true;
            var rangeIndex = 0;
            while (this.range.length > 0) {
                if (this.range[rangeIndex] instanceof ElementBox || this.range[rangeIndex] instanceof WCharacterFormat || this.range[rangeIndex] instanceof WRowFormat) {
                    if (this.range[rangeIndex] instanceof BookmarkElementBox && isFromAccept && this.revisionType === 'Deletion') {
                        var inline = this.range[rangeIndex];
                        if (this.owner.documentHelper.bookmarks.containsKey(inline.name)) {
                            this.owner.documentHelper.bookmarks.remove(inline.name);
                        }
                    }
                    var moveToNextItem = this.unlinkRangeItem(this.range[rangeIndex], this, isFromAccept, startPos, endPos);
                    if (moveToNextItem) {
                        rangeIndex++;
                    }
                    else {
                        rangeIndex = 0;
                    }
                }
                else {
                    break;
                }
            }
        }
        this.isTableRevision = false;
        if (this.isContentRemoved) {
            var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
            this.owner.selectionModule.selectContent(textPosition, true);
            this.owner.editorModule.updateEndPosition();
        }
        else {
            selection.selectRange(startPos, endPos);
            this.owner.editorModule.updateHistoryPosition(endPos, false);
        }
        if (this.owner.editorHistoryModule && this.owner.editorHistoryModule.currentBaseHistoryInfo
            && this.owner.editorHistoryModule.currentBaseHistoryInfo.action !== 'BackSpace') {
            this.owner.editorHistoryModule.currentBaseHistoryInfo.removedNodes.reverse();
        }
        if (this.owner.editorHistoryModule) {
            if (this.owner.trackChangesPane.isTrackingPageBreak) {
                this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'TrackingPageBreak';
                this.owner.trackChangesPane.isTrackingPageBreak = false;
            }
            var editorHistory = this.owner.editorHistoryModule;
            if (editorHistory.currentHistoryInfo && (editorHistory.currentHistoryInfo.action === 'Accept All' || editorHistory.currentHistoryInfo.action === 'Reject All')) {
                if (this.owner.documentHelper.blockToShift) {
                    this.owner.documentHelper.layout.shiftLayoutedItems(false);
                }
            }
            editorHistory.updateHistory();
            if (removeChanges && this.owner.editorHistory && !isNullOrUndefined(this.owner.editorHistory.currentHistoryInfo)) {
                for (var k = 0; k < comments.length; k++) {
                    this.owner.editorModule.initInsertInline(comments[k], false);
                }
                this.owner.editorHistory.currentHistoryInfo.endPosition = this.owner.selection.startOffset;
                this.owner.editorHistory.updateComplexHistory();
            }
        }
        if (reLayoutTable && this.owner.selectionModule.start.paragraph.isInsideTable) {
            var table = this.owner.selectionModule.start.paragraph.containerWidget.ownerTable;
            this.owner.documentHelper.layout.reLayoutTable(table);
        }
        this.owner.editorModule.reLayout(this.owner.selectionModule);
        if (blockInfo.paragraph.isInHeaderFooter) {
            this.owner.editorModule.updateHeaderFooterWidget();
        }
    };
    Revision.prototype.handleGroupAcceptReject = function (isAccept) {
        if (this.owner.trackChangesPane.tableRevisions.containsKey(this)) {
            this.owner.editorModule.initComplexHistory(isAccept ? 'Accept All' : 'Reject All');
            var groupingAcceptReject = this.owner.trackChangesPane.tableRevisions.get(this);
            for (var i = groupingAcceptReject.length - 1; i >= 0; i--) {
                if (isAccept) {
                    groupingAcceptReject[i].handleAcceptReject(true);
                }
                else {
                    groupingAcceptReject[i].handleAcceptReject(false);
                }
            }
            if (this.owner.editorHistoryModule) {
                this.owner.editorHistoryModule.updateComplexHistory();
            }
            if (this.owner.selectionModule.start.paragraph.isInsideTable) {
                var table = this.owner.selectionModule.start.paragraph.containerWidget.ownerTable;
                this.owner.documentHelper.layout.reLayoutTable(table);
            }
        }
    };
    /**
     * Method which accepts the selected revision, revision marks will be removed and changes will be included in the viewer.
     *
     * @returns {void}
     */
    Revision.prototype.accept = function () {
        var eventArgs = { author: this.author, cancel: false, revisionType: this.revisionType, actionType: 'Accept', source: this };
        this.owner.trigger(revisionActionEvent, eventArgs);
        if (eventArgs.cancel) {
            return;
        }
        if (!this.owner.documentHelper.isTrackedOnlyMode) {
            if (!this.owner.revisions.skipGroupAcceptReject && this.range[0] instanceof WRowFormat
                && this.owner.trackChangesPane.tableRevisions.containsKey(this)) {
                this.handleGroupAcceptReject(true);
            }
            else {
                this.handleAcceptReject(true, true);
            }
        }
    };
    /**
     * Method which rejects the selected revision, revision marks will be removed leaving the original content.
     */
    Revision.prototype.reject = function () {
        var eventArgs = { author: this.author, cancel: false, revisionType: this.revisionType, actionType: 'Reject', source: this };
        this.owner.trigger(revisionActionEvent, eventArgs);
        if (eventArgs.cancel) {
            return;
        }
        if (!this.owner.documentHelper.isTrackedOnlyMode) {
            if (!this.owner.revisions.skipGroupAcceptReject && this.range[0] instanceof WRowFormat
                && this.owner.trackChangesPane.tableRevisions.containsKey(this)) {
                this.handleGroupAcceptReject(false);
            }
            else {
                this.handleAcceptReject(false, true);
            }
        }
    };
    /**
     * Select the current revision.
     */
    Revision.prototype.select = function () {
        this.owner.selectionModule.selectRevision(this);
    };
    /**
     * Unlinks revision and its assosiated range
     * @private
     * @param item
     * @param revision
     * @param isFromAccept
     */
    /* eslint-disable  */
    Revision.prototype.unlinkRangeItem = function (item, revision, isFromAccept, start, end) {
        if (this.isTableRevision) {
            this.removeRangeRevisionForItem(item);
            if (revision.range.length === 0) {
                this.owner.revisions.remove(revision);
            }
            return false;
        }
        var removeChanges = (!isNullOrUndefined(isFromAccept)) && ((revision.revisionType === 'MoveFrom' || revision.revisionType === 'Deletion') && isFromAccept) || ((revision.revisionType === 'Insertion' || revision.revisionType === 'MoveTo') && !isFromAccept);
        if (this.owner.selectionModule.isTOC()) {
            if (removeChanges) {
                this.owner.editorModule.deleteSelectedContents(this.owner.selectionModule, true);
                if (revision.range.length === 0) {
                    this.owner.revisions.remove(revision);
                }
                this.isContentRemoved = true;
                this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'BackSpace';
            }
            else {
                while (this.range.length > 0) {
                    var currentElement = this.range[0];
                    this.removeRangeRevisionForItem(currentElement);
                    if (revision.range.length === 0) {
                        this.owner.revisions.remove(revision);
                    }
                }
                this.owner.editorModule.addRemovedNodes(this.revisionID);
                this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'AcceptTOC';
            }
            return false;
        }
        if (item instanceof ElementBox && !this.canSkipTableItems) {
            if (removeChanges) {
                if (!this.skipeElementRemoval(item)) {
                    this.owner.editorModule.addRemovedNodes(item.clone());
                }
                else {
                    this.skipUnLinkElement = true;
                    return true;
                }
            }
            else {
                // Bug 873011: Handled the hyperlink formatting preservation when rejecting the RemoveHyperlink action.
                var fieldBegin = this.owner.selectionModule.getHyperlinkField();
                if (!isFromAccept && !isNullOrUndefined(fieldBegin) && fieldBegin == item && !isNullOrUndefined(fieldBegin.fieldEnd)) {
                    this.owner.editorModule.initComplexHistory('ClearRevisions');
                    this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'ClearRevisions';
                    this.updateRevisionID();
                    this.removeRevisionFromPara(start, end);
                    if (!isNullOrUndefined(this.owner.editorHistoryModule)) {
                        this.owner.editorHistoryModule.currentBaseHistoryInfo.isHyperlinkField = true;
                        var endInfo = this.owner.selectionModule.getParagraphInfo(end);
                        var endIndex = this.owner.selectionModule.getHierarchicalIndex(endInfo.paragraph, endInfo.offset.toString());
                        this.owner.editorHistoryModule.currentBaseHistoryInfo.endPosition = endIndex;
                        this.owner.editorHistoryModule.currentBaseHistoryInfo.selectionEnd = endIndex;
                        this.owner.editorHistoryModule.updateHistory();
                    }
                    if (this.owner.enableTrackChanges) {
                        this.owner.enableTrackChanges = false;
                        this.owner.editorModule.updateHyperlinkFormat(this.owner.selectionModule);
                        this.owner.enableTrackChanges = true;
                    }
                    else {
                        this.owner.editorModule.updateHyperlinkFormat(this.owner.selectionModule);
                    }
                    if (this.owner.editorHistoryModule && !isNullOrUndefined(this.owner.editorHistoryModule.currentHistoryInfo)) {
                        this.owner.editorHistoryModule.updateComplexHistory();
                    }
                }
                else {
                    this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'ClearRevisions';
                    this.updateRevisionID();
                    this.removeRevisionFromPara(start, end);
                }
                // Set false to this because we retrived the revision based on above action (after this iteration we have changed the action basded the below property)
                this.owner.trackChangesPane.isTrackingPageBreak = false;
            }
        }
        else if (!this.canSkipTableItems && (item instanceof WCharacterFormat) && (!removeChanges)) {
            this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'ClearRevisions';
            this.updateRevisionID();
            this.removeRevisionFromPara(start, end);
        }
        else if (item instanceof WRowFormat && !removeChanges) {
            this.isTableRevision = true;
            var tableWidget = item.ownerBase.ownerTable;
            var currentRow = item.ownerBase;
            this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'RemoveRowTrack';
            this.owner.editorModule.cloneTableToHistoryInfo(tableWidget.combineWidget(this.owner.viewer));
        }
        removeChanges = removeChanges && !this.canSkipTableItems;
        if (item instanceof ElementBox && removeChanges) {
            var currentPara = item.line.paragraph;
            this.removeRevisionItemsFromRange(item);
            if (item instanceof FootnoteElementBox) {
                if (item.footnoteType === 'Footnote') {
                    this.owner.editorModule.removeFootnote(item);
                }
                else {
                    this.owner.editorModule.removeEndnote(item);
                }
            }
            else if (item instanceof ShapeElementBox) {
                this.owner.editorModule.removeDeletedShapeRevision(item);
            }
            this.removeItem(item);
            this.isContentRemoved = true;
            var skipRelayout = !isNullOrUndefined(currentPara) && !isNullOrUndefined(currentPara.bodyWidget) && currentPara.bodyWidget instanceof HeaderFooterWidget && (isNullOrUndefined(currentPara.bodyWidget.page) || (!isNullOrUndefined(currentPara.bodyWidget.page) && currentPara.bodyWidget.page.index === -1));
            if (!skipRelayout) {
                this.owner.documentHelper.layout.reLayoutParagraph(currentPara, 0, 0);
            }
            if (isNullOrUndefined(currentPara.childWidgets)) {
                var textPosition = this.owner.selectionModule.getTextPosBasedOnLogicalIndex(this.owner.selectionModule.editPosition);
                this.owner.selectionModule.selectContent(textPosition, true);
            }
        }
        else if (item instanceof WCharacterFormat && removeChanges) {
            this.isContentRemoved = true;
            this.skipUnLinkElement = false;
            this.removeRevisionItemsFromRange(item);
            if (revision.range.length === 1) {
                this.owner.editorModule.deleteSelectedContents(this.owner.selectionModule, true);
            }
            else {
                this.owner.editorModule.deleteSelectedContents(this.owner.selectionModule, true);
                this.removeRevisionFromPara(start, end);
                var rangeIndex = revision.range.indexOf(item);
                revision.range.splice(rangeIndex, 1);
                this.owner.trackChangesPane.updateCurrentTrackChanges(revision);
                while (this.range.length > 0) {
                    this.removeRangeRevisionForItem(this.range[0]);
                }
            }
            this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'BackSpace';
            this.owner.editorHistoryModule.currentBaseHistoryInfo.isAcceptOrReject = isFromAccept ? 'Accept' : 'Reject';
        }
        else if (item instanceof WRowFormat && removeChanges) {
            var tableWidget = item.ownerBase.ownerTable;
            tableWidget = tableWidget.combineWidget(this.owner.viewer);
            var currentRow = item.ownerBase;
            this.removeRevisionItemsFromRange(item);
            this.owner.editorHistoryModule.currentBaseHistoryInfo.action = 'DeleteCells';
            this.owner.editorModule.cloneTableToHistoryInfo(tableWidget);
            this.owner.editorModule.removeDeletedCellRevision(currentRow);
            this.isContentRemoved = true;
            tableWidget.removeChild(tableWidget.childWidgets.indexOf(currentRow));
            this.canSkipTableItems = true;
            // Before destroying the table row widget, delete the field element from the row.
            this.owner.editorModule.removeFieldInBlock(currentRow);
            // Before destroying the table row widget, delete the bookmark element from the row.
            this.owner.editorModule.removeFieldInBlock(currentRow, true);
            // Before destroying the table row widget, delete the content control element from the row.
            this.owner.editorModule.removeFieldInBlock(currentRow, undefined, true);
            //currentRow.destroy();
            if (tableWidget.childWidgets.length === 0) {
                this.owner.selectionModule.editPosition = this.owner.selectionModule.getHierarchicalIndex(tableWidget, '0');
                this.owner.editorModule.removeBlock(tableWidget);
                //tableWidget.destroy();
            }
            else {
                this.owner.editorModule.updateTable(tableWidget, true);
            }
        }
        // if the range is of row format, we will remove the row and for history preservation we use whole table to be cloned, hence skipping this part
        if (!(item instanceof WRowFormat) || !removeChanges) {
            if (!this.skipUnLinkElement) {
                this.removeRangeRevisionForItem(item);
                if (removeChanges && item instanceof BookmarkElementBox) {
                    this.owner.editorModule.removedBookmarkElements.push(item);
                }
                if (item instanceof BookmarkElementBox) {
                    if (this.owner.documentHelper.bookmarks.containsKey(item.name)) {
                        if (this.owner.enableCollaborativeEditing && !isNullOrUndefined(this.owner.editorHistory.currentBaseHistoryInfo)) {
                            this.owner.editorHistory.currentBaseHistoryInfo.markerData.push({ bookmarkName: item.name });
                        }
                        this.owner.documentHelper.bookmarks.remove(item.name);
                    }
                }
            }
        }
        if (revision.range.length === 0) {
            this.owner.revisions.remove(revision);
        }
        return false;
    };
    Revision.prototype.removeRevisionFromPara = function (start, end) {
        var blockInfo = this.owner.selectionModule.getParagraphInfo(start);
        var endBlockInfo = this.owner.selectionModule.getParagraphInfo(end);
        var para = blockInfo.paragraph;
        while (para instanceof ParagraphWidget) {
            if (para.characterFormat.revisions.length > 0) {
                for (var i = 0; i < para.characterFormat.revisions.length; i++) {
                    if (para.characterFormat.revisions[i].range.length === 0) {
                        var revisionIndex = para.characterFormat.revisions.indexOf(para.characterFormat.revisions[i]);
                        para.characterFormat.revisions.splice(revisionIndex, 1);
                        i--;
                    }
                }
            }
            if (endBlockInfo.paragraph === para) {
                para = undefined;
            }
            else {
                para = para.nextWidget;
            }
        }
    };
    Revision.prototype.updateRevisionID = function () {
        this.owner.editorModule.addRemovedNodes(this.revisionID);
        while (this.range.length > 0) {
            this.removeRangeRevisionForItem(this.range[0], true);
        }
        this.owner.trackChangesPane.updateCurrentTrackChanges(this);
    };
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Revision.prototype.removeRevisionItemsFromRange = function (item) {
        if (item.revisions.length > 0) {
            for (var revisionIndex = 0; revisionIndex < item.revisions.length; revisionIndex++) {
                var currentRevision = item.revisions[revisionIndex];
                if (this.revisionID !== currentRevision.revisionID) {
                    var rangeIndex = currentRevision.range.indexOf(item);
                    item.revisions[revisionIndex].range.splice(rangeIndex, 1);
                    this.owner.trackChangesPane.updateCurrentTrackChanges(item.revisions[revisionIndex]);
                }
                if (currentRevision.range.length === 0) {
                    this.owner.revisions.remove(currentRevision);
                }
            }
        }
    };
    /**
     * Method to clear linked ranges in revision
     *
     * @private
     * @param {any} item - Specifies the item
     * @returns {void}
     */
    /* eslint-disable @typescript-eslint/no-explicit-any */
    Revision.prototype.removeRangeRevisionForItem = function (item, skipUpdate) {
        var revisionIndex = item.revisions.indexOf(this);
        if (revisionIndex >= 0) {
            item.revisions.splice(revisionIndex, 1);
            var rangeIndex = this.range.indexOf(item);
            this.range.splice(rangeIndex, 1);
            if (!skipUpdate) {
                this.owner.trackChangesPane.updateCurrentTrackChanges(this);
            }
        }
    };
    /**
     * @private
     * @param {Element} element - Specifies the element.
     * @returns {boolean} Resturs skip element removal
     */
    Revision.prototype.skipeElementRemoval = function (element) {
        var elementPara = element.paragraph;
        if (elementPara.characterFormat.revisions.length > 0) {
            for (var i = 0; i < elementPara.characterFormat.revisions.length; i++) {
                var currentRevision = elementPara.characterFormat.revisions[i];
                var rangeIndex = currentRevision.range.indexOf(element);
                if (rangeIndex >= 0 && currentRevision.revisionID === this.revisionID) {
                    return true;
                }
            }
        }
        return false;
    };
    Revision.prototype.removeRevisionFromRow = function (row) {
        this.owner.editorModule.unlinkRangeFromRevision(row.rowFormat);
        //this.owner.editor.addRemovedRevisionInfo(row.rowFormat, undefined);
        for (var i = 0; i < row.childWidgets.length; i++) {
            var cellWidget = row.childWidgets[i];
            this.owner.editorModule.removeRevisionForCell(cellWidget, false);
        }
    };
    Revision.prototype.removeItem = function (element) {
        var paraWidget = element.line.paragraph;
        this.owner.editorModule.unLinkFieldCharacter(element);
        var elementIndex = element.line.children.indexOf(element);
        var previousNode = element.previousNode;
        element.line.children.splice(elementIndex, 1);
        if (!isNullOrUndefined(previousNode)) {
            this.owner.editorModule.combineElementRevisionToPrevNxt(previousNode);
        }
        var paraFloatingElementIndex = element.line.paragraph.floatingElements.indexOf(element);
        element.line.paragraph.floatingElements.splice(paraFloatingElementIndex, 1);
        var blockFloatingElementIndex = element.line.paragraph.bodyWidget.floatingElements.indexOf(element);
        if (blockFloatingElementIndex > -1) {
            element.line.paragraph.bodyWidget.floatingElements.splice(blockFloatingElementIndex, 1);
        }
        this.owner.editorModule.removeEmptyLine(paraWidget);
    };
    Revision.prototype.canSkipCloning = function () {
        if (!isNullOrUndefined(this.owner) && this.owner.editorHistoryModule && this.owner.editorHistoryModule.currentBaseHistoryInfo) {
            var baseHistoryInfo = this.owner.editorHistoryModule.currentBaseHistoryInfo;
            if (baseHistoryInfo.action === 'DeleteCells') {
                return true;
            }
        }
        return false;
    };
    /**
     * @private
     *
     */
    Revision.prototype.destroy = function () {
        this.author = undefined;
        this.revisionType = undefined;
        this.revisionID = undefined;
        this.date = undefined;
        this.range = [];
        this.range = undefined;
        this.owner = undefined;
    };
    /**
     * @private
     * @returns {Revision} - Returns revision
     */
    Revision.prototype.clone = function () {
        if (this.canSkipCloning()) {
            return this;
        }
        var revision = new Revision(undefined, this.author, this.date);
        revision.revisionID = this.revisionID;
        revision.revisionType = this.revisionType;
        return revision;
    };
    /**
     * Method to clone the revisions for the element
     *
     * @param {Revision[]} revisions - revision array.
     * @returns {string[]} - returns clones revisions.
     */
    Revision.cloneRevisions = function (revisions) {
        var clonedRevisions = [];
        for (var i = 0; i < revisions.length; i++) {
            clonedRevisions.push(revisions[i].revisionID);
        }
        return clonedRevisions;
    };
    return Revision;
}());
export { Revision };
/**
 * Represents the revision collections in the document.
 */
var RevisionCollection = /** @class */ (function () {
    function RevisionCollection(owner) {
        /**
         * @private
         */
        this.changes = [];
        /**
         * @private
         */
        this.skipGroupAcceptReject = false;
        this.owner = owner;
    }
    /**
     * @private
     */
    RevisionCollection.prototype.get = function (index) {
        if (index >= this.changes.length || index < 0) {
            throw new ReferenceError('Provided index is not within the range');
        }
        return this.changes[index];
    };
    Object.defineProperty(RevisionCollection.prototype, "length", {
        get: function () {
            return this.changes.length;
        },
        enumerable: true,
        configurable: true
    });
    RevisionCollection.prototype.remove = function (revision) {
        if (isNullOrUndefined(revision) || this.changes.indexOf(revision) < 0) {
            return;
        }
        this.changes.splice(this.changes.indexOf(revision), 1);
        if (this.owner.trackChangesPane.revisions.indexOf(revision) !== -1) {
            var index = this.owner.trackChangesPane.revisions.indexOf(revision);
            var removeChild = !(this.owner.trackChangesPane.tableRevisions.containsKey(revision) && (this.owner.trackChangesPane.tableRevisions.get(revision))[(this.owner.trackChangesPane.tableRevisions.get(revision)).length - 1] !== revision);
            var changesSingleView = this.owner.trackChangesPane.changes.get(revision);
            if (removeChild) {
                this.owner.trackChangesPane.changesInfoDiv.removeChild(changesSingleView.outerSingleDiv);
            }
            this.owner.trackChangesPane.revisions.splice(index, 1);
            this.owner.trackChangesPane.changes.remove(revision);
            if (this.owner.trackChangesPane.renderedChanges.containsKey(revision)) {
                this.owner.trackChangesPane.renderedChanges.remove(revision);
            }
            if (this.owner.trackChangesPane.tableRevisions.containsKey(revision)) {
                this.owner.trackChangesPane.tableRevisions.remove(revision);
            }
        }
    };
    /**
     * Method which accepts all the revision in the revision collection
     *
     * @returns {void}
     */
    RevisionCollection.prototype.acceptAll = function () {
        if (!this.owner.isReadOnly && !this.owner.documentHelper.isTrackedOnlyMode) {
            this.handleRevisionCollection(true);
        }
    };
    /**
     * Method which rejects all the revision in the revision collection
     *
     * @returns {void}
     */
    RevisionCollection.prototype.rejectAll = function () {
        if (!this.owner.isReadOnly && !this.owner.documentHelper.isTrackedOnlyMode) {
            this.handleRevisionCollection(false);
        }
    };
    /**
     * @private
     * @param {boolean} isfromAcceptAll - Specifies the is accept all.
     * @param {Revision[]} changes - Specifies the revisions.
     * @returns {void}
     */
    RevisionCollection.prototype.handleRevisionCollection = function (isfromAcceptAll, changes) {
        this.skipGroupAcceptReject = true;
        var selection = this.owner.selectionModule;
        var startPos = selection.start;
        var endPos = selection.end;
        var revisionCollec = changes ? changes : this.changes;
        if (revisionCollec.length <= 0) {
            return;
        }
        if (!selection.start.isExistBefore(selection.end)) {
            startPos = selection.end;
            endPos = selection.start;
        }
        startPos = startPos.clone();
        endPos = endPos.clone();
        if (isfromAcceptAll) {
            this.owner.editorModule.initComplexHistory('Accept All');
        }
        else {
            this.owner.editorModule.initComplexHistory('Reject All');
        }
        while (revisionCollec.length > 0) {
            if (isfromAcceptAll) {
                revisionCollec[0].accept();
            }
            else {
                revisionCollec[0].reject();
            }
            if (changes) {
                revisionCollec.splice(0, 1);
            }
            if (this.owner.enableHeaderAndFooter) {
                this.owner.editorModule.updateHeaderFooterWidget();
            }
        }
        if (!isNullOrUndefined(selection.editPosition)) {
            var textPosition = selection.getTextPosBasedOnLogicalIndex(selection.editPosition);
            this.owner.selectionModule.selectContent(textPosition, true);
        }
        if (this.owner.editorHistoryModule) {
            this.owner.editorHistoryModule.updateComplexHistory();
            if (isNullOrUndefined(selection.editPosition)) {
                this.owner.editorHistoryModule.undoStack.pop();
            }
        }
        this.owner.editorModule.isSkipOperationsBuild = this.owner.enableCollaborativeEditing;
        this.owner.editorModule.reLayout(this.owner.selectionModule, false);
        this.owner.editorModule.isSkipOperationsBuild = false;
        this.skipGroupAcceptReject = false;
    };
    RevisionCollection.prototype.clear = function () {
        this.changes = [];
    };
    /**
     * Disposes the internal objects which are maintained.
     * @private
     */
    RevisionCollection.prototype.destroy = function () {
        if (this.changes) {
            for (var i = 0; i < this.changes.length; i++) {
                var revision = this.changes[i];
                revision.destroy();
            }
            this.changes = [];
        }
        this.changes = undefined;
        this.owner = undefined;
    };
    return RevisionCollection;
}());
export { RevisionCollection };
