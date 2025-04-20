/* eslint-disable */
import { HelperMethods, ParagraphWidget, TableWidget, CONTROL_CHARACTERS, SectionBreakType, ListTextElementBox, ShapeElementBox, FootnoteElementBox, CommentElementBox, CommentCharacterElementBox, FieldElementBox, WCharacterFormat, ImageElementBox, WParagraphFormat, WTableFormat, WRowFormat, WCellFormat, WSectionFormat, listIdProperty, abstractListsProperty, listsProperty, abstractListIdProperty, nsidProperty, ContentControlProperties, ContentControl } from '../../index';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { createElement } from '@syncfusion/ej2-base';
/**
 * Module to handle collaborative editing.
 */
var CollaborativeEditingHandler = /** @class */ (function () {
    function CollaborativeEditingHandler(documentEditor) {
        //TODO need to prevent document change on collaborative editing session i.e. New document, select new document
        //#region SignalR collabrative editing
        this.version = 0;
        this.userMap = {};
        this.connectionId = '';
        this.pendingOps = [];
        this.commentsStart = [];
        this.commentsEnd = [];
        this.deletedComments = [];
        this.serviceUrl = '';
        this.isSyncServerChanges = false;
        this.logEventEnabled = true;
        this.message = '';
        this.documentEditor = documentEditor;
    }
    ;
    /**
     * Get module name.
     * @returns - Returns the module name
     */
    CollaborativeEditingHandler.prototype.getModuleName = function () {
        return 'CollaborativeEditingHandler';
    };
    /**
     * This function updates the room information and server url of the collaborative editing session.
     * @param roomName - Specifies the current collaborative editing room name.
     * @param version - Specifies the current version of the document.
     * @param serviceUrl - Specifies the base url of the collaborative editing service.
     */
    CollaborativeEditingHandler.prototype.updateRoomInfo = function (roomName, version, serviceUrl) {
        this.roomName = roomName;
        this.serviceUrl = serviceUrl;
        this.version = version;
    };
    /**
     * Send the current action to the server.
     * @param args - Specified the current action.
     * @returns
     */
    CollaborativeEditingHandler.prototype.sendActionToServer = function (operations) {
        if (!isNullOrUndefined(operations) && operations.length === 0) {
            return;
        }
        var lastPendingOp = this.pendingOps[this.pendingOps.length - 1];
        if (!lastPendingOp || !this.checkAndCombineOperation(lastPendingOp, operations)) {
            this.pendingOps.push(operations);
        }
        if (!this.isAcknowledgePending()) {
            this.sendLocalOperation();
        }
        this.transformRemoteCursor(this.connectionId, operations[0], operations[0].offset);
    };
    CollaborativeEditingHandler.prototype.checkAndCombineOperation = function (lastAction, currentAction) {
        if (lastAction.length !== 1 || currentAction.length !== 1) {
            return false;
        }
        var lastOperation = lastAction[0];
        var currentOperation = currentAction[0];
        if (this.isSameOperation(lastOperation, currentOperation) && this.canCombineOperation(lastOperation, currentOperation)) {
            if ((lastOperation.action === 'Insert' && lastOperation.offset + lastOperation.length === currentOperation.offset) ||
                (lastOperation.action === 'Delete' && (lastOperation.offset === currentOperation.offset))) {
                lastOperation.length += currentOperation.length;
                lastOperation.text += currentOperation.text;
                return true;
            }
            else if (lastOperation.action === 'Delete' && currentOperation.offset + currentOperation.length === lastOperation.offset) {
                lastOperation.text = currentOperation.text + lastOperation.text;
                lastOperation.offset = currentOperation.offset;
                lastOperation.length += currentOperation.length;
                return true;
            }
        }
        return false;
    };
    CollaborativeEditingHandler.prototype.canCombineOperation = function (lastOperation, currentOperation) {
        return lastOperation.format === currentOperation.format &&
            !this.isControlCharacter(lastOperation.text) &&
            !this.isControlCharacter(currentOperation.text) &&
            isNullOrUndefined(lastOperation.markerData) &&
            isNullOrUndefined(currentOperation.markerData);
    };
    CollaborativeEditingHandler.prototype.isSameOperation = function (lastOperation, currentOperation) {
        return lastOperation.action === currentOperation.action;
    };
    CollaborativeEditingHandler.prototype.isControlCharacter = function (text) {
        var controlCharacters = [
            CONTROL_CHARACTERS.Table,
            CONTROL_CHARACTERS.Row,
            CONTROL_CHARACTERS.Cell,
            CONTROL_CHARACTERS.Image,
            CONTROL_CHARACTERS.PageBreak,
            CONTROL_CHARACTERS.ColumnBreak,
            CONTROL_CHARACTERS.Section_Break,
            CONTROL_CHARACTERS.Table,
            CONTROL_CHARACTERS.Field_Separator,
            CONTROL_CHARACTERS.Marker_Start,
            CONTROL_CHARACTERS.Marker_End,
            CONTROL_CHARACTERS.Tab,
            CONTROL_CHARACTERS.LineBreak
        ];
        return controlCharacters.indexOf(text) !== -1;
    };
    /**
     * Apply the remote operation to the current document.
     * @param action - Specifies the remote action type.
     * @param data - Specifies the remote operation data.
     */
    CollaborativeEditingHandler.prototype.applyRemoteAction = function (action, data) {
        switch (action) {
            case 'connectionId':
                this.connectionId = data;
                break;
            case 'removeUser':
                this.removeCarets(data);
                break;
            case 'action':
                this.dataReceived(data);
                break;
        }
    };
    CollaborativeEditingHandler.prototype.isAcknowledgePending = function () {
        return !isNullOrUndefined(this.acknowledgmentPending);
    };
    CollaborativeEditingHandler.prototype.handleAcknowledgementReceived = function (action) {
        var versionDiff = this.getVersionDifference(action);
        if (versionDiff > 1) {
            this.checkAndRetriveChangesFromServer();
        }
        else {
            this.logMessage('Ack received: ' + action.version);
            this.logMessage('Ack version diff: ' + versionDiff);
            if (action.version > this.version) {
                this.updateVersion(action.version);
                this.acknowledgementReceived();
                this.sendLocalOperation();
            }
        }
    };
    CollaborativeEditingHandler.prototype.updateVersion = function (version) {
        if (version > this.version) {
            this.version = version;
        }
    };
    CollaborativeEditingHandler.prototype.acknowledgementReceived = function () {
        this.acknowledgmentPending = undefined;
    };
    //Send the local operation to server
    CollaborativeEditingHandler.prototype.sendLocalOperation = function () {
        var _this = this;
        if (this.pendingOps.length > 0) {
            var operations = this.pendingOps.shift();
            var changes = {};
            changes.currentUser = this.documentEditor.currentUser;
            changes.roomName = this.roomName;
            changes.connectionId = this.connectionId;
            changes.version = this.version;
            changes.operations = operations;
            this.acknowledgmentPending = operations;
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('Post', this.serviceUrl + 'UpdateAction', true);
            httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            this.setCustomAjaxHeaders(httpRequest);
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200 || httpRequest.status === 304) {
                        var dataObject = JSON.parse(httpRequest.responseText);
                        if (!_this.isSyncServerChanges) {
                            _this.handleAcknowledgementReceived(dataObject);
                        }
                    }
                    else {
                        var failedArgs = { status: (httpRequest.status).toString(), statusText: httpRequest.statusText, url: _this.serviceUrl + 'UpdateAction' };
                        _this.documentEditor.fireServiceFailure(failedArgs);
                    }
                }
            };
            this.logMessage('Sent: ' + JSON.stringify(changes));
            httpRequest.send(JSON.stringify(changes));
        }
    };
    CollaborativeEditingHandler.prototype.dataReceived = function (action) {
        if ((action.connectionId === this.connectionId && !this.documentEditor.editor.isIncrementalSave) || this.isSyncServerChanges) {
            this.logMessage(this.isSyncServerChanges ? 'SignalR Server sync' + action.version : 'SignalR Same user sync:' + action.version);
            return;
        }
        var versionDiff = this.getVersionDifference(action);
        if (versionDiff <= 0 && !this.documentEditor.editor.isIncrementalSave) {
            this.logMessage('SignalR return diff:<=0' + action.version);
            return;
        }
        if (versionDiff > 1 && !this.documentEditor.editor.isIncrementalSave) {
            this.logMessage('SignalR return diff:>=1' + action.version);
            this.checkAndRetriveChangesFromServer();
            return;
        }
        this.logMessage('SignalR ack: ' + action.version);
        // try {
        this.logMessage('Received: ' + JSON.stringify(action));
        this.handleRemoteOperation(action);
        // } catch (e) {
        //     if (e instanceof Error) {
        //         this.logMessage('Error while handling remote operation: ' + e);
        //         this.logMessage('Error while handling remote operation: ' + e.stack);
        //     } else {
        //         this.logMessage('Error while handling remote operation: ' + e);
        //     }
        // }
    };
    CollaborativeEditingHandler.prototype.getVersionDifference = function (action) {
        return action.version - this.version;
    };
    CollaborativeEditingHandler.prototype.handleRemoteOperation = function (action) {
        //To Prevent the content change event while applying the remote operation
        this.documentEditor.editorModule.isRemoteAction = true;
        //TODO: Need to handle backward selection.
        var localStartOffset = this.documentEditor.selectionModule.getAbsolutePositionFromRelativePosition(this.documentEditor.selectionModule.start);
        var selectionLength = this.documentEditor.selectionModule.getAbsolutePositionFromRelativePosition(this.documentEditor.selectionModule.end) - localStartOffset;
        if (!isNullOrUndefined(this.acknowledgmentPending)) {
            this.logMessage('Acknowledge transform:' + this.acknowledgmentPending[0].text + 'version:' + action.version);
            this.transform([this.acknowledgmentPending], action.operations);
        }
        if (this.pendingOps.length > 0) {
            this.logMessage('Pending transform:' + this.pendingOps.length + 'version:' + action.version);
        }
        this.transform(this.pendingOps, action.operations);
        this.applyRemoteOperation(action, localStartOffset, selectionLength);
        this.updateVersion(action.version);
        this.documentEditor.editorModule.isRemoteAction = false;
        if (this.documentEditor.editorHistoryModule.canUndo()) {
            this.documentEditor.editorHistoryModule.undoStack.length = 0;
        }
        if (this.documentEditor.editorHistoryModule.canRedo()) {
            this.documentEditor.editorHistoryModule.redoStack.length = 0;
        }
    };
    CollaborativeEditingHandler.prototype.transform = function (operation, remoteOperation) {
        for (var i = 0; i < remoteOperation.length; i++) {
            var remoteData = remoteOperation[i];
            if (operation.length > 0) {
                for (var j = 0; j < operation.length; j++) {
                    for (var k = 0; k < operation[j].length; k++) {
                        var localOperation = operation[j][k];
                        this.transformSelectionOperation(localOperation, remoteData);
                        var previousOffset = remoteData.offset;
                        this.transformOperation(localOperation, remoteData, remoteOperation);
                        this.logMessage('Transformed offset:' + (remoteData.offset - previousOffset));
                    }
                }
            }
        }
    };
    CollaborativeEditingHandler.prototype.skipAction = function (remoteOperation) {
        for (var i = 0; i < remoteOperation.length; i++) {
            var data = remoteOperation[i];
            data.length = 0;
            data.skipOperation = true;
        }
    };
    CollaborativeEditingHandler.prototype.handleAcceptReject = function (revisions, operation) {
        for (var i = 0; i < revisions.length; i++) {
            var revision = revisions[i];
            if (revision.author === operation.markerData.author && revision.revisionType === operation.markerData.revisionType) {
                var currentRevision = this.documentEditor.editorModule.getRevision(revision.revisionID);
                if (currentRevision) {
                    if (operation.markerData.isAcceptOrReject === 'Accept') {
                        revision.accept();
                    }
                    else if (operation.markerData.isAcceptOrReject === 'Reject') {
                        revision.reject();
                    }
                }
            }
        }
    };
    CollaborativeEditingHandler.prototype.applyRemoteOperation = function (action, offset, selectionLength) {
        var currentUser = this.documentEditor.currentUser;
        var currentEditMode = this.documentEditor.commentReviewPane.commentPane.isEditMode;
        var currenteditorHistory = this.documentEditor.editorHistoryModule.lastOperation;
        var currentTextArea;
        if (!isNullOrUndefined(this.documentEditor.commentReviewPane.commentPane.currentEditingComment)) {
            currentTextArea = this.documentEditor.commentReviewPane.commentPane.currentEditingComment.textArea;
        }
        var contentControlProperties;
        for (var i = 0; i < action.operations.length; i++) {
            var markerData = action.operations[i].markerData;
            var tableLength = undefined;
            var trackingCurrentValue = this.documentEditor.enableTrackChanges;
            if (!isNullOrUndefined(markerData) && !isNullOrUndefined(markerData.author)) {
                this.documentEditor.currentUser = markerData.author;
            }
            if (!isNullOrUndefined(markerData) && !isNullOrUndefined(markerData.isSkipTracking) && markerData.isSkipTracking && this.documentEditor.enableTrackChanges) {
                this.documentEditor.skipSettingsOps = true;
                this.documentEditor.enableTrackChanges = false;
            }
            if (action.operations[i].skipOperation || (!isNullOrUndefined(action.operations[i].markerData) && action.operations[i].markerData.skipOperation)) {
                continue;
            }
            if (action.operations[i].action === 'Update') {
                if (!isNullOrUndefined(action.operations[i].styleData)) {
                    var styleData = JSON.parse(action.operations[i].styleData);
                    this.documentEditor.editor.updateStyleObject(styleData);
                }
                continue;
            }
            var startOffset = this.getRelativePositionFromAbsolutePosition(action.operations[i].offset, false, false, false);
            // Code for Comparing the offset calculated using old approach and optimized approach
            // this.documentEditor.selection.isNewApproach = true;
            // let newStartOffset = this.getRelativePositionFromAbsolutePosition(action.operations[i].offset, false, false, false);
            // this.documentEditor.selection.isNewApproach = false;
            // throwCustomError(startOffset !== newStartOffset, "New StartIndex " + newStartOffset + " and old StartIndex " + startOffset + " doesnot match");
            var op2 = action.operations[i];
            var endOffset = startOffset;
            if (isNullOrUndefined(action.operations[i].action)) {
                this.documentSettings(action.operations[i]);
                continue;
            }
            if (action.operations[i].action === 'Delete' || action.operations[i].action === 'Format') {
                //Update endOffset
                if (!(op2.action === 'Format' && op2.length === 0)) {
                    this.documentEditor.selectionModule.isEndOffset = true;
                }
                endOffset = this.getRelativePositionFromAbsolutePosition(action.operations[i].offset + action.operations[i].length, false, false, false);
                this.documentEditor.selectionModule.isEndOffset = false;
                // Code for Comparing the offset calculated using old approach and optimized approach
                // this.documentEditor.selection.isNewApproach = true;
                // let newEndOffset = this.getRelativePositionFromAbsolutePosition(action.operations[i].offset + action.operations[i].length, false, false, false);
                // this.documentEditor.selection.isNewApproach = false;
                // throwCustomError(endOffset !== newEndOffset, "New EndIndex " + newEndOffset + " and old EndIndex " + endOffset + " doesnot match");
            }
            if (op2.action === 'Insert' && (op2.text !== CONTROL_CHARACTERS.Row && op2.text !== CONTROL_CHARACTERS.Cell) && (isNullOrUndefined(op2.markerData) || isNullOrUndefined(op2.markerData.isAcceptOrReject))) {
                this.documentEditor.selectionModule.select(startOffset, endOffset);
            }
            else if (op2.action === 'Delete' && op2.text !== CONTROL_CHARACTERS.Cell && (isNullOrUndefined(op2.markerData) || isNullOrUndefined(op2.markerData.isAcceptOrReject))) {
                this.documentEditor.selectionModule.select(startOffset, endOffset);
            }
            else if (op2.action === 'Format' && (isNullOrUndefined(op2.markerData) || isNullOrUndefined(op2.markerData.isAcceptOrReject))) {
                this.documentEditor.selectionModule.select(startOffset, endOffset);
            }
            if (!isNullOrUndefined(op2.markerData)) {
                if (!isNullOrUndefined(op2.markerData.revisionForFootnoteEndnoteContent) || !isNullOrUndefined(op2.markerData.revisionId)) {
                    this.documentEditor.editorModule.revisionData = [];
                }
                if (!isNullOrUndefined(op2.markerData.revisionForFootnoteEndnoteContent)) {
                    this.documentEditor.editorModule.revisionData.push(op2.markerData.revisionForFootnoteEndnoteContent);
                }
                if (!isNullOrUndefined(op2.markerData.revisionId)) {
                    this.documentEditor.editorModule.revisionData.push(op2.markerData);
                }
                if (!isNullOrUndefined(op2.markerData.splittedRevisions) && op2.markerData.splittedRevisions.length > 0) {
                    this.documentEditor.editorModule.revisionData = this.documentEditor.editorModule.revisionData.concat(op2.markerData.splittedRevisions);
                }
            }
            if (!isNullOrUndefined(op2.markerData) && !isNullOrUndefined(op2.markerData.isAcceptOrReject) && op2.markerData.isAcceptOrReject !== '') {
                var revision = this.documentEditor.editorModule.getRevision(op2.markerData.revisionId);
                if (revision) {
                    if (op2.markerData.isAcceptOrReject === 'Accept') {
                        revision.accept();
                    }
                    else if (op2.markerData.isAcceptOrReject === 'Reject') {
                        revision.reject();
                    }
                }
                else {
                    if (op2.text === CONTROL_CHARACTERS.Row) {
                        var data_1 = this.getRelativePositionFromAbsolutePosition(op2.offset, false, true, false);
                        if (data_1 && data_1.rowWidget) {
                            this.handleAcceptReject(data_1.rowWidget.rowFormat.revisions, op2);
                        }
                    }
                    else {
                        this.documentEditor.selectionModule.select(startOffset, endOffset);
                        var item = void 0;
                        if (this.documentEditor.selection.start.isAtParagraphEnd) {
                            item = this.documentEditor.selection.start.currentWidget.paragraph.characterFormat;
                        }
                        else {
                            var elementInfo = this.documentEditor.selectionModule.start.currentWidget.getInline(this.documentEditor.selectionModule.start.offset + 1, 0);
                            item = elementInfo.element;
                        }
                        if (!isNullOrUndefined(item)) {
                            this.handleAcceptReject(item.revisions, op2);
                        }
                    }
                }
                continue;
            }
            if (op2.action === 'Insert') {
                if (op2.type === 'Paste') {
                    this.documentEditor.editorModule.isPasteListUpdated = false;
                    this.documentEditor.editorModule.pasteContents(HelperMethods.getSfdtDocument(op2.pasteContent));
                }
                else if (op2.type === 'PasteToc') {
                    this.documentEditor.editorModule.isInsertingTOC = true;
                    this.documentEditor.editorModule.pasteContents(HelperMethods.getSfdtDocument(op2.pasteContent));
                    this.documentEditor.editorModule.isInsertingTOC = false;
                }
                else if (op2.text === CONTROL_CHARACTERS.Image.toString()) {
                    this.insertImage(op2.imageData);
                }
                else if (op2.text === CONTROL_CHARACTERS.Section_Break.toString() && op2.type === 'NewPage') {
                    this.documentEditor.editorModule.insertSectionBreak();
                }
                else if (op2.text === CONTROL_CHARACTERS.Section_Break.toString() && op2.type === 'Continuous') {
                    this.documentEditor.editorModule.insertSectionBreak(SectionBreakType.Continuous);
                }
                else if (markerData && (op2.text === CONTROL_CHARACTERS.Marker_Start || op2.text === CONTROL_CHARACTERS.Marker_End || op2.text === CONTROL_CHARACTERS.Field_Separator)) {
                    var element = void 0;
                    if (markerData.type && markerData.type === 'Bookmark') {
                        if (op2.text === CONTROL_CHARACTERS.Marker_Start) {
                            var bookmarks = this.documentEditor.editorModule.createBookmarkElements(markerData.bookmarkName);
                            element = bookmarks[0];
                            this.documentEditor.documentHelper.isBookmarkInserted = false;
                            this.documentEditor.editorModule.insertElementsInternal(this.documentEditor.selectionModule.start, [element]);
                        }
                        else {
                            if (this.documentEditor.documentHelper.bookmarks.containsKey(markerData.bookmarkName)) {
                                var bookmark = this.documentEditor.documentHelper.bookmarks.get(markerData.bookmarkName);
                                if (bookmark) {
                                    element = bookmark.reference;
                                    this.documentEditor.documentHelper.isBookmarkInserted = true;
                                    this.documentEditor.editorModule.insertElementsInternal(this.documentEditor.selectionModule.start, [element]);
                                    this.documentEditor.selectionModule.selectBookmark(markerData.bookmarkName);
                                    bookmark.properties = this.documentEditor.selectionModule.getBookmarkProperties(bookmark);
                                    element.properties = this.documentEditor.selectionModule.getBookmarkProperties(element);
                                    this.documentEditor.editorModule.fireContentChange();
                                }
                            }
                        }
                    }
                    else if (markerData.type && markerData.type === 'EditRange') {
                        var user = markerData.user;
                        var id = markerData.editRangeId;
                        if (op2.text === CONTROL_CHARACTERS.Marker_Start) {
                            if (this.documentEditor.documentHelper.restrictEditingPane) {
                                this.documentEditor.documentHelper.restrictEditingPane.addUserDialog.bindListData(user);
                            }
                            element = this.documentEditor.editorModule.addEditElement(user, id);
                            element.columnFirst = parseInt(markerData.columnFirst);
                            element.columnLast = parseInt(markerData.columnLast);
                            element.line = this.documentEditor.selectionModule.start.currentWidget;
                        }
                        else {
                            var editRanges = this.documentEditor.documentHelper.editRanges.get(user);
                            for (var _i = 0, editRanges_1 = editRanges; _i < editRanges_1.length; _i++) {
                                var editStart = editRanges_1[_i];
                                if (editStart.editRangeId === id) {
                                    element = editStart.editRangeEnd;
                                    element.line = this.documentEditor.selectionModule.start.currentWidget;
                                    break;
                                }
                            }
                        }
                        this.documentEditor.editorModule.insertElementsInternal(this.documentEditor.selectionModule.start, [element]);
                        this.documentEditor.editorModule.fireContentChange();
                    }
                    else if (markerData.type && markerData.type === 'Field') {
                        this.documentEditor.editor.isFieldOperation = true;
                        var type = op2.text === CONTROL_CHARACTERS.Marker_Start ? 0 : op2.text === CONTROL_CHARACTERS.Marker_End ? 1 : op2.text === CONTROL_CHARACTERS.Field_Separator ? 2 : undefined;
                        if (!isNullOrUndefined(type) && isNullOrUndefined(markerData.checkBoxValue)) {
                            var field = new FieldElementBox(type);
                            if (type === 0 && !isNullOrUndefined(markerData.formFieldData)) {
                                var formFieldData = this.documentEditor.editor.getFormFieldData(op2.type);
                                this.documentEditor.parser.parseFormFieldData(0, JSON.parse(markerData.formFieldData), formFieldData);
                                field.formFieldData = formFieldData;
                            }
                            var characterFormat = new WCharacterFormat();
                            if (op2.format) {
                                var data_2 = JSON.parse(op2.format);
                                this.documentEditor.parser.parseCharacterFormat(0, data_2, characterFormat);
                            }
                            field.characterFormat.copyFormat(characterFormat);
                            this.documentEditor.editorModule.initInsertInline(field);
                        }
                        else {
                            var inlineObj = this.documentEditor.selectionModule.start.currentWidget.getInline(this.documentEditor.selectionModule.start.offset, 0);
                            var inline = inlineObj.element;
                            if (inline instanceof FieldElementBox) {
                                this.documentEditor.editorModule.toggleCheckBoxFormField(inline, true, markerData.checkBoxValue);
                            }
                        }
                    }
                    else if (!isNullOrUndefined(markerData) && !isNullOrUndefined(markerData.commentId)) {
                        var commentType = op2.text === CONTROL_CHARACTERS.Marker_Start ? 0 : 1;
                        var deleteComment = this.documentEditor.documentHelper.layout.getCommentById(this.deletedComments, markerData.commentId);
                        var ownerDeleteComment = undefined;
                        if (isNullOrUndefined(deleteComment)) {
                            deleteComment = this.documentEditor.documentHelper.layout.getCommentById(this.documentEditor.documentHelper.comments, markerData.commentId);
                            if (isNullOrUndefined(deleteComment) && !isNullOrUndefined(markerData.ownerCommentId)) {
                                ownerDeleteComment = this.documentEditor.documentHelper.layout.getCommentById(this.documentEditor.documentHelper.comments, markerData.ownerCommentId);
                                if (!isNullOrUndefined(ownerDeleteComment)) {
                                    deleteComment = this.documentEditor.documentHelper.layout.getCommentById(ownerDeleteComment.replyComments, markerData.commentId);
                                }
                            }
                        }
                        if (!isNullOrUndefined(deleteComment)) {
                            var item = new CommentCharacterElementBox(commentType);
                            item.commentId = markerData.commentId;
                            this.documentEditor.editorModule.insertElementsInternal(this.documentEditor.selectionModule.start, [item]);
                            item.comment = deleteComment;
                            var index = this.documentEditor.selectionModule.start.currentWidget.children.indexOf(item);
                            deleteComment.commentStart = this.documentEditor.selectionModule.start.currentWidget.children[index];
                        }
                        else {
                            var item = new CommentCharacterElementBox(commentType);
                            item.commentId = markerData.commentId;
                            this.documentEditor.editorModule.insertElementsInternal(this.documentEditor.selectionModule.start, [item]);
                            commentType === 0 ? this.commentsStart.push(item) : this.commentsEnd.push(item);
                        }
                    }
                    else if (!isNullOrUndefined(op2.markerData.type) && (op2.markerData.type === 'Footnote' || op2.markerData.type === 'Endnote')) {
                        if (op2.markerData.type === 'Footnote') {
                            this.documentEditor.editorModule.insertFootnote();
                        }
                        else if (op2.markerData.type === 'Endnote') {
                            this.documentEditor.editorModule.insertEndnote();
                        }
                    }
                    else if (markerData.type && markerData.type === 'ContentControl') {
                        if (op2.text === CONTROL_CHARACTERS.Marker_Start) {
                            contentControlProperties = new ContentControlProperties(markerData.text);
                            if (!isNullOrUndefined(markerData.contentControlProperties)) {
                                this.documentEditor.editorModule.assignContentControl(contentControlProperties, JSON.parse(markerData.contentControlProperties));
                            }
                        }
                        var contentControl = new ContentControl(contentControlProperties.contentControlWidgetType);
                        contentControl.contentControlProperties = contentControlProperties;
                        contentControl.type = op2.text === CONTROL_CHARACTERS.Marker_Start ? 0 : 1;
                        this.documentEditor.editorModule.insertElementsInternal(this.documentEditor.selectionModule.start, [contentControl]);
                        if (op2.text === CONTROL_CHARACTERS.Marker_End && contentControl.reference) {
                            this.documentEditor.editorModule.updatePropertiesToBlock(contentControl.reference, true);
                        }
                    }
                }
                else if (markerData && !isNullOrUndefined(markerData.dropDownIndex) && op2.type === 'DropDown') {
                    var inlineObj = this.documentEditor.selectionModule.start.currentWidget.getInline(this.documentEditor.selectionModule.start.offset, 0);
                    var inline = inlineObj.element;
                    if (inline instanceof FieldElementBox) {
                        this.documentEditor.editorModule.updateFormField(inline, markerData.dropDownIndex, false);
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.Section_Break.toString() && op2.type === 'NewPage') {
                    this.documentEditor.editorModule.insertSectionBreak();
                }
                else if (op2.text === CONTROL_CHARACTERS.Section_Break.toString() && op2.type === 'Continuous') {
                    this.documentEditor.editorModule.insertSectionBreak(SectionBreakType.Continuous);
                }
                else if (op2.text === CONTROL_CHARACTERS.Table) {
                    i = action.operations.length;
                    this.buildTable(action.operations);
                    tableLength = this.getOperationLength(action.operations);
                }
                else if (op2.text === CONTROL_CHARACTERS.Row) {
                    i = action.operations.length;
                    if (isNullOrUndefined(op2.format)) {
                        action.operations.reverse();
                    }
                    this.buildRow(action.operations);
                    tableLength = this.getOperationLength(action.operations);
                }
                else if (op2.text === CONTROL_CHARACTERS.Cell) {
                    var paraFormat = undefined;
                    var charFormat = undefined;
                    if (op2.type === 'CellFormat') {
                        if (op2.length > 0) {
                            paraFormat = action.operations[i - 1].format;
                            charFormat = action.operations[i - 2].format;
                        }
                        this.buildCell(op2, paraFormat, charFormat);
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.PageBreak.toString()) {
                    this.documentEditor.editorModule.insertPageBreak();
                }
                else if (op2.text === CONTROL_CHARACTERS.ColumnBreak.toString()) {
                    this.documentEditor.editorModule.insertColumnBreak();
                }
                else {
                    if (op2.format) {
                        var characterFormat = new WCharacterFormat();
                        var data = JSON.parse(op2.format);
                        this.documentEditor.parser.parseCharacterFormat(0, data, characterFormat);
                        this.documentEditor.selectionModule.isRetrieveFormatting = true;
                        this.documentEditor.selectionModule.characterFormat.copyFormat(characterFormat);
                        this.documentEditor.selectionModule.isRetrieveFormatting = false;
                    }
                    this.documentEditor.editorModule.insertText(op2.text);
                }
            }
            else if (op2.action === 'Delete') {
                // if (this.documentEditor.selection.isEmpty && this.documentEditor.selection.start.currentWidget.isLastLine()
                //     && this.documentEditor.selection.start.offset === this.documentEditor.selection.getLineLength(this.documentEditor.selection.start.currentWidget) + 1) {
                //     this.documentEditor.selection.start.offset--;
                //     this.documentEditor.selection.end.offset--;
                //     //Delete pargaraph marker
                //     this.documentEditor.editor.delete();
                // } else {
                if (op2.text === CONTROL_CHARACTERS.Marker_Start || op2.text === CONTROL_CHARACTERS.Marker_End) {
                    if (!isNullOrUndefined(markerData) && !isNullOrUndefined(markerData.commentId)) {
                        var selection = this.documentEditor.selectionModule;
                        var commentType = op2.text === CONTROL_CHARACTERS.Marker_Start ? 0 : 1;
                        var deleteComment = void 0;
                        if (this.documentEditor.selection.getElementInfo(this.documentEditor.selection.end.currentWidget, this.documentEditor.selection.end.offset).element instanceof CommentCharacterElementBox) {
                            deleteComment = this.documentEditor.selection.getElementInfo(this.documentEditor.selection.end.currentWidget, this.documentEditor.selection.end.offset).element;
                        }
                        if (commentType === 1) {
                            var commentEnd = deleteComment;
                            if (commentEnd.indexInOwner !== -1) {
                                this.documentEditor.editorModule.removeAtOffset(selection.start.currentWidget, this.documentEditor.selectionModule, selection.start.offset);
                            }
                        }
                        else {
                            var commentStart = deleteComment;
                            if (commentStart.indexInOwner !== -1) {
                                this.documentEditor.editorModule.removeAtOffset(selection.start.currentWidget, this.documentEditor.selectionModule, selection.start.offset);
                            }
                            commentStart.removeCommentMark();
                        }
                    }
                    else {
                        var selection = this.documentEditor.selectionModule;
                        var offset_1 = selection.start.offset - 1;
                        this.documentEditor.editorModule.removeAtOffset(selection.start.currentWidget, this.documentEditor.selectionModule, offset_1);
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.Cell) {
                    this.buildDeleteCells(op2);
                }
                else {
                    this.documentEditor.editorModule.onBackSpace();
                }
                //}
            }
            else if (op2.action === 'Format') {
                if (op2.text === (CONTROL_CHARACTERS.Marker_Start.toString() + CONTROL_CHARACTERS.Marker_End.toString())) {
                    this.updateOperation(op2);
                }
                else if (op2.text === CONTROL_CHARACTERS.Marker_Start && !isNullOrUndefined(op2.format)) {
                    var contentcontrol = this.documentEditor.selection.currentContentControl;
                    if (contentcontrol) {
                        this.documentEditor.editorModule.assignContentControl(contentcontrol.contentControlProperties, JSON.parse(op2.format));
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.Marker_Start && !isNullOrUndefined(op2.markerData) && op2.markerData.type === 'ContentControlCheckBox') {
                    var contentcontrol = this.documentEditor.selection.currentContentControl;
                    if (contentcontrol && contentcontrol.contentControlProperties.type === 'CheckBox') {
                        this.documentEditor.editorModule.toggleContentControlCheckBox(contentcontrol, markerData.checkBoxValue);
                    }
                }
                else if (!isNullOrUndefined(op2.markerData) && !isNullOrUndefined(op2.markerData.revisionId)) {
                    if (!isNullOrUndefined(op2.markerData.revisionType)) {
                        if (op2.markerData.revisionType === 'Deletion') {
                            if (op2.text === CONTROL_CHARACTERS.Row) {
                                var data_3 = this.getRelativePositionFromAbsolutePosition(op2.offset, false, true, false);
                                if (!isNullOrUndefined(data_3.rowWidget)) {
                                    var row = data_3.rowWidget;
                                    this.documentEditor.editorModule.trackRowDeletion(row);
                                    this.documentEditor.trackChangesPane.updateTrackChanges();
                                    continue;
                                }
                            }
                            this.documentEditor.editorModule.onBackSpace();
                        }
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.Row) {
                    var data_4 = this.getRelativePositionFromAbsolutePosition(op2.offset, false, true, false);
                    if (!isNullOrUndefined(data_4.rowWidget)) {
                        var table = data_4.rowWidget.ownerTable;
                        var rowData = JSON.parse(op2.format);
                        this.documentEditor.documentHelper.owner.parser.parseRowFormat(rowData, data_4.rowWidget.rowFormat, 0);
                        table.calculateGrid(false);
                        this.documentEditor.documentHelper.layout.reLayoutTable(table);
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.Cell) {
                    if (op2.type === 'TableFormat') {
                        var tableData = this.getRelativePositionFromAbsolutePosition(op2.offset, true, false, false);
                        var table = JSON.parse(op2.format);
                        this.documentEditor.documentHelper.owner.parser.parseTableFormat(table, tableData.tableWidget.tableFormat, 0);
                        tableData.tableWidget.calculateGrid(false);
                        this.documentEditor.documentHelper.layout.reLayoutTable(tableData.tableWidget);
                    }
                    if (op2.type === 'RowFormat') {
                        var rowData = this.getRelativePositionFromAbsolutePosition(op2.offset, false, true, false);
                        var row = JSON.parse(op2.format);
                        this.documentEditor.documentHelper.owner.parser.parseRowFormat(row, rowData.rowWidget.rowFormat, 0);
                    }
                    if (op2.type === 'CellFormat') {
                        var cellData = this.getRelativePositionFromAbsolutePosition(op2.offset, false, false, true);
                        var cell = JSON.parse(op2.format);
                        this.documentEditor.documentHelper.owner.parser.parseCellFormat(cell, cellData.cellWidget.cellFormat, 0);
                    }
                }
                else if (op2.text === CONTROL_CHARACTERS.Image) {
                    var inlineObj = this.documentEditor.selectionModule.end.currentWidget.getInline(this.documentEditor.selectionModule.end.offset, 0);
                    var inline = inlineObj.element;
                    if (inline instanceof ImageElementBox) {
                        this.documentEditor.editorModule.onImageFormat(inline, HelperMethods.convertPointToPixel(op2.imageData.width), HelperMethods.convertPointToPixel(op2.imageData.height), op2.imageData.alternativeText);
                    }
                }
                else if (op2.type === 'ListFormat') {
                    var paragraphFormat = JSON.parse(op2.format);
                    var format = new WParagraphFormat(undefined);
                    this.documentEditor.parser.parseParagraphFormat(0, paragraphFormat, format);
                    this.updateList(op2, format);
                    var list = this.documentEditor.documentHelper.getListById(paragraphFormat.listFormat.nsid, true);
                    if (!isNullOrUndefined(list)) {
                        format.listFormat.listId = list.listId;
                        format.listFormat.list = list;
                    }
                    this.documentEditor.editorModule.onApplyParagraphFormat(op2.text, format.listFormat, false, false);
                }
                else if (op2.type === 'RestartNumbering') {
                    var nsid = this.updateList(op2);
                    var list = this.documentEditor.documentHelper.getListById(nsid, true);
                    this.documentEditor.editorModule.restartListAtInternal(this.documentEditor.selectionModule, list.listId, list.nsid);
                }
                else if (op2.type === 'ContinueNumbering') {
                    var paragraphFormat = JSON.parse(op2.format);
                    var format = new WParagraphFormat(undefined);
                    this.documentEditor.parser.parseParagraphFormat(0, paragraphFormat, format);
                    var list = this.documentEditor.documentHelper.getListById(format.listFormat.nsid, true);
                    if (!isNullOrUndefined(list)) {
                        format.listFormat.listId = list.listId;
                        format.listFormat.list = list;
                    }
                    this.documentEditor.editorModule.applyContinueNumberingInternal(this.documentEditor.selectionModule, format);
                }
                else if (op2.type === 'CharacterFormat') {
                    this.insertCharaterFormat(op2.type, op2.format);
                }
                else if (op2.type === 'ParagraphFormat') {
                    this.insertParagraphFormat(op2, op2.format);
                }
                else if (op2.type === 'TableFormat') {
                    this.insertTableFormat(op2.text, op2.format, op2.offset);
                }
                else if (op2.type === 'SectionFormat') {
                    this.insertSectionFormat(op2.text, op2.format);
                }
                else if (op2.type === 'RowFormat') {
                    this.insertRowFormat(op2.text, op2.format);
                }
                else if (op2.type === 'CellFormat') {
                    this.insertCellFormat(op2.format);
                }
            }
            this.documentEditor.editor.revisionData = undefined;
            if (this.documentEditor.enableTrackChanges != trackingCurrentValue) {
                this.documentEditor.skipSettingsOps = true;
                this.documentEditor.enableTrackChanges = trackingCurrentValue;
            }
            this.documentEditor.currentUser = currentUser;
            var newOffset = this.documentEditor.selectionModule.startOffset;
            //op2.offset = newOffset;
            this.updateRemoteSelection(action, this.documentEditor.selectionModule.getAbsolutePositionFromRelativePosition(newOffset));
            if (!isNullOrUndefined(tableLength)) {
                var temp = op2.length;
                op2.length = tableLength;
                tableLength = temp;
            }
            var tranformedOffset = this.transformSection(op2.action, op2, offset)[1];
            //TODO: Need to handle backward selection.
            //TODO: Need to optimize the code. Need to transform selection end length based on remove content
            var tranformedEndOffset = this.transformSection(op2.action, op2, offset + selectionLength)[1];
            offset = tranformedOffset;
            this.documentEditor.selectionModule.select(this.getRelativePositionFromAbsolutePosition(tranformedOffset, false, false, false), this.getRelativePositionFromAbsolutePosition(tranformedEndOffset, false, false, false));
            if (!isNullOrUndefined(tableLength)) {
                op2.length = tableLength;
            }
            this.transformRemoteCursor(action.connectionId, op2, op2.offset);
            if (!isNullOrUndefined(this.documentEditor.searchModule) && !isNullOrUndefined(this.documentEditor.optionsPaneModule) && this.documentEditor.searchModule.searchResults.length > 0 && this.documentEditor.optionsPaneModule.isOptionsPaneShow) {
                this.documentEditor.optionsPaneModule.searchIconClickInternal();
            }
        }
        contentControlProperties = undefined;
        if (this.documentEditor.editor.isFieldOperation) {
            this.documentEditor.editorModule.layoutWholeDocument();
            this.documentEditor.editor.isFieldOperation = false;
        }
        if (!isNullOrUndefined(this.rowWidget)) {
            var ownerTable = this.rowWidget.ownerTable.combineWidget(this.documentEditor.viewer);
            ownerTable.updateRowIndex(0);
            ownerTable.calculateGrid(true);
            this.documentEditor.documentHelper.layout.reLayoutTable(ownerTable);
            this.documentEditor.editorModule.reLayout(this.documentEditor.selectionModule);
            this.rowWidget = undefined;
        }
        if (!isNullOrUndefined(this.table)) {
            this.table.calculateGrid();
            this.documentEditor.editorModule.updateTable(this.table);
            this.documentEditor.editorModule.reLayout(this.documentEditor.selectionModule, true);
            this.table = undefined;
        }
        this.documentEditor.currentUser = currentUser;
        this.documentEditor.commentReviewPane.commentPane.isEditMode = currentEditMode;
        this.documentEditor.editorHistoryModule.lastOperation = currenteditorHistory;
        if (!isNullOrUndefined(this.documentEditor.commentReviewPane.commentPane.currentEditingComment)) {
            this.documentEditor.commentReviewPane.commentPane.currentEditingComment.textArea = currentTextArea;
        }
    };
    CollaborativeEditingHandler.prototype.updateOperation = function (operation) {
        var markerData = operation.markerData;
        if (operation.text === (CONTROL_CHARACTERS.Marker_Start.toString() + CONTROL_CHARACTERS.Marker_End.toString())) {
            var ownerComment = undefined;
            var commentToDelete = undefined;
            if (this.documentEditor.selection.getElementInfo(this.documentEditor.selection.end.currentWidget, this.documentEditor.selection.end.offset).element instanceof CommentCharacterElementBox && operation.offset > 0) {
                var commentID = this.documentEditor.selection.getElementInfo(this.documentEditor.selection.end.currentWidget, this.documentEditor.selection.end.offset).element.commentId;
                commentToDelete = this.getComment(commentID);
            }
            if (!isNullOrUndefined(commentToDelete) && !(!isNullOrUndefined(markerData.done) && isNullOrUndefined(markerData.date)) && isNullOrUndefined(markerData.isReply)) {
                if (commentToDelete.text !== markerData.text) {
                    var commentView = this.documentEditor.commentReviewPane.commentPane.comments.get(commentToDelete);
                    commentView.commentText.innerText = markerData.text;
                    commentToDelete.text = markerData.text;
                    return;
                }
            }
            if (!isNullOrUndefined(commentToDelete)) {
                if (!isNullOrUndefined(markerData.done) && isNullOrUndefined(markerData.commentAction)) {
                    if (markerData.done) {
                        this.documentEditor.editorModule.resolveComment(commentToDelete);
                    }
                    else {
                        this.documentEditor.editorModule.reopenComment(commentToDelete);
                    }
                    return;
                }
                if (markerData.commentAction === "remove") {
                    var commentView = this.documentEditor.commentReviewPane.commentPane.comments.get(!isNullOrUndefined(ownerComment) ? ownerComment : commentToDelete);
                    commentView.showDrawer();
                    this.documentEditor.editorModule.deleteCommentWidget(commentToDelete);
                    this.deletedComments.push(commentToDelete);
                    commentView.hideDrawer();
                }
                else {
                    var item = new CommentElementBox(markerData.date);
                    item.commentId = markerData.commentId;
                    var commentStart = this.getObjectByCommentId(this.commentsStart, item.commentId);
                    var commentEnd = this.getObjectByCommentId(this.commentsEnd, item.commentId);
                    if (!isNullOrUndefined(commentStart) && !isNullOrUndefined(commentEnd)) {
                        this.documentEditor.editorModule.updateCommentElement(item, commentStart, commentEnd, markerData);
                        item.ownerComment = commentToDelete;
                        commentToDelete.replyComments.splice(markerData.commentIndex, 0, item);
                        this.documentEditor.commentReviewPane.addReply(item, false, false);
                    }
                }
            }
            else {
                var item = new CommentElementBox(markerData.date);
                item.commentId = markerData.commentId;
                var commentStart = this.getObjectByCommentId(this.commentsStart, item.commentId);
                var commentEnd = this.getObjectByCommentId(this.commentsEnd, item.commentId);
                if (!isNullOrUndefined(commentStart) && !isNullOrUndefined(commentEnd)) {
                    this.documentEditor.editorModule.updateCommentElement(item, commentStart, commentEnd, markerData);
                    this.documentEditor.editorModule.addCommentWidget(item, true, true, false);
                    this.commentsStart.splice(this.commentsStart.indexOf(commentStart), 1);
                    this.commentsEnd.splice(this.commentsEnd.indexOf(commentEnd), 1);
                    var comment = this.documentEditor.commentReviewPane.commentPane.comments.get(item);
                    comment.postComment();
                }
            }
        }
    };
    CollaborativeEditingHandler.prototype.getComment = function (commentID) {
        var collection = this.documentEditor.documentHelper.comments;
        for (var i = 0; i < collection.length; i++) {
            var comment = this.documentEditor.documentHelper.layout.getCommentById(collection, commentID);
            if (isNullOrUndefined(comment)) {
                for (var j = 0; j < collection[i].replyComments.length; j++) {
                    var replyComment = this.documentEditor.documentHelper.layout.getCommentById(collection[i].replyComments, commentID);
                    if (!isNullOrUndefined(replyComment)) {
                        return replyComment;
                    }
                }
            }
            else {
                return comment;
            }
        }
        return null;
    };
    CollaborativeEditingHandler.prototype.updateList = function (operation, format) {
        var nsid = -1;
        if (operation.listData) {
            var listData = JSON.parse(operation.listData);
            if (listData.hasOwnProperty('optimizeSfdt')) {
                this.documentEditor.parser.keywordIndex = listData.optimizeSfdt ? 1 : 0;
            }
            if (!isNullOrUndefined(format)) {
                var list = this.documentEditor.documentHelper.getListById(format.listFormat.nsid, true);
                if (isNullOrUndefined(list)) {
                    this.updateListCollection(listData, this.documentEditor.parser.keywordIndex);
                }
                else {
                    var abstractLists = [];
                    this.documentEditor.parser.parseAbstractList(listData, abstractLists);
                    if (!isNullOrUndefined(list.abstractList)) {
                        if (list.abstractList.levels.length < format.listFormat.listLevelNumber) {
                            list.abstractList.levels = [];
                            for (var i = 0; i < abstractLists[0].levels.length; i++) {
                                list.abstractList.levels.push(abstractLists[0].levels[i]);
                            }
                        }
                    }
                }
            }
            else {
                if (listData.hasOwnProperty(nsidProperty)) {
                    nsid = listData[nsidProperty];
                }
                this.updateListCollection(listData, this.documentEditor.parser.keywordIndex);
            }
        }
        return nsid;
    };
    CollaborativeEditingHandler.prototype.getOperationLength = function (operations) {
        var length = 0;
        for (var i = 0; i < operations.length; i++) {
            if (operations[parseInt(i.toString(), 10)].text === CONTROL_CHARACTERS.Table || operations[parseInt(i.toString(), 10)].text === CONTROL_CHARACTERS.Row || operations[parseInt(i.toString(), 10)].text === CONTROL_CHARACTERS.Cell)
                length += operations[parseInt(i.toString(), 10)].length;
        }
        return length;
    };
    CollaborativeEditingHandler.prototype.updateListCollection = function (listData, keywordIndex) {
        var uniqueListId = this.documentEditor.editorModule.getUniqueListOrAbstractListId(true);
        var uniqueAbsLstId = this.documentEditor.editorModule.getUniqueListOrAbstractListId(false);
        var _loop_1 = function (k) {
            var list = listData[listsProperty[keywordIndex]][k];
            var abstractList = listData[abstractListsProperty[keywordIndex]].filter(function (obj) {
                return obj[abstractListIdProperty[keywordIndex]] === list[abstractListIdProperty[keywordIndex]];
            })[0];
            if (!isNullOrUndefined(abstractList)) {
                abstractList[abstractListIdProperty[keywordIndex]] = uniqueAbsLstId;
                list[listIdProperty[keywordIndex]] = uniqueListId;
                list[abstractListIdProperty[keywordIndex]] = uniqueAbsLstId;
                uniqueListId++;
                uniqueAbsLstId++;
            }
        };
        for (var k = 0; k < listData[listsProperty[keywordIndex]].length; k++) {
            _loop_1(k);
        }
        this.documentEditor.parser.parseAbstractList(listData, this.documentEditor.documentHelper.abstractLists);
        this.documentEditor.parser.parseList(listData, this.documentEditor.documentHelper.lists);
    };
    CollaborativeEditingHandler.prototype.getObjectByCommentId = function (collection, commentId) {
        for (var _i = 0, collection_1 = collection; _i < collection_1.length; _i++) {
            var obj = collection_1[_i];
            if (obj.commentId === commentId) {
                return obj;
            }
        }
        return undefined;
    };
    CollaborativeEditingHandler.prototype.transformOperation = function (operation1, operation2, action) {
        if (operation1.action === 'Insert' && (operation2.action === 'Insert' || operation2.action === 'Format')) {
            if (operation1.offset < operation2.offset) {
                operation2.offset = operation2.offset + operation1.length;
                return [operation1, operation2];
            }
            else if (operation1.offset >= operation2.offset && operation2.action !== 'Format') {
                operation1.offset = operation1.offset + operation2.length;
                return [operation1, operation2,];
            }
        }
        else if (operation1.action === 'Delete' && (operation2.action === 'Delete' || operation2.action === 'Format')) {
            if (operation1.offset < operation2.offset) {
                operation2.offset = operation2.offset - operation1.length;
                return [operation1, operation2];
            }
            else if (operation1.offset > operation2.offset && operation2.action !== 'Format') {
                operation1.offset = operation1.offset - operation2.length;
                return [operation1, operation2,];
            }
        }
        else if (operation1.action === 'Insert' && (operation2.action === 'Delete' || operation2.action === 'Format')) {
            if (operation1.offset <= operation2.offset) {
                operation2.offset = operation2.offset + operation1.length;
                return [operation1, operation2];
            }
            else if (operation1.offset >= operation2.offset + operation2.length && operation2.action !== 'Format') {
                operation1.offset = operation1.offset - operation2.length;
                return [operation1, operation2,];
            }
            // Local selection fully encompasses the conflicting selection
            else if (operation1.offset > operation2.offset && operation1.offset < (operation2.offset + operation2.length)) {
                operation2.length += operation1.length;
            }
        }
        else if (operation1.action === 'Delete' && (operation2.action === 'Insert' || operation2.action === 'Format')) {
            if (operation1.offset <= operation2.offset && (operation1.offset + operation1.length) <= operation2.offset) {
                operation2.offset = operation2.offset - operation1.length;
            }
            else if (operation1.offset < operation2.offset && (operation1.offset + operation1.length) >= (operation2.offset + operation2.length)) {
                if (!isNullOrUndefined(operation2.markerData) && !isNullOrUndefined(operation2.markerData.type) && operation2.markerData.type !== 'Field' && (operation2.text === CONTROL_CHARACTERS.Marker_End || operation2.text === CONTROL_CHARACTERS.Marker_Start)) {
                    if (!isNullOrUndefined(operation2.markerData.commentId) && operation2.text === CONTROL_CHARACTERS.Marker_End) {
                        this.skipAction(action);
                        return [operation1, operation2];
                    }
                    var conflictLenth = operation2.offset - operation1.offset;
                    operation2.offset -= conflictLenth;
                }
                else {
                    //Skip insert operation
                    operation2.length = 0;
                    operation2.skipOperation = true;
                    if (!isNullOrUndefined(operation2.markerData) && !isNullOrUndefined(operation2.markerData.type) && operation2.markerData.type === 'Field' && (operation2.text === CONTROL_CHARACTERS.Marker_Start || operation2.text === CONTROL_CHARACTERS.Marker_End)) {
                        this.skipAction(action);
                    }
                }
            }
            else if (operation1.offset <= operation2.offset && operation2.action == "Insert" && (operation1.offset + operation1.length) >= operation2.offset) {
                this.skipAction(action);
            }
            else if (operation1.offset > operation2.offset && operation2.action !== 'Format') {
                operation1.offset = operation1.offset + operation2.length;
            }
        }
        // else {
        //     throw new Error(`Invalid operation types: ${operation1.action}, ${operation2.action}`);
        // }
        return [operation1, operation2];
    };
    CollaborativeEditingHandler.prototype.transformSection = function (action, operation1, operation2) {
        if (action === 'Insert') {
            if (operation1.offset < operation2) {
                return [operation1.offset, operation2 + operation1.length];
            }
            // else if (operation1.offset > operation2.offset) {
            //     return [
            //         operation1.offset + operation2.length,
            //         operation2.offset,
            //     ];
            // }
        }
        else if (action === 'Delete') {
            if (operation1.offset <= operation2) {
                return [operation1.offset, operation2 - operation1.length];
            }
        }
        return [operation1.offset, operation2];
    };
    CollaborativeEditingHandler.prototype.transformRemoteCursor = function (connectionId, operation, offset) {
        if (this.documentEditor.editorModule.isIncrementalSave) {
            return;
        }
        this.updateCaretPosition(connectionId, operation);
    };
    /**
     * @private
     * @returns {void}
    */
    CollaborativeEditingHandler.prototype.updateCaretPosition = function (connectionId, operation) {
        if (isNullOrUndefined(this.userMap)) {
            return;
        }
        var keys = Object.keys(this.userMap);
        var tranformedOffset;
        //For loop to iterate over the keys
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key === connectionId) {
                continue;
            }
            if (!isNullOrUndefined(operation)) {
                var remoteOffset = this.userMap[key].offset;
                tranformedOffset = this.transformSection(operation.action, operation, remoteOffset)[1];
                this.userMap[key].offset = tranformedOffset;
            }
            else {
                tranformedOffset = this.userMap[key].offset;
            }
            this.updateCaretPositionInteral(this.userMap[key].caret, tranformedOffset);
        }
    };
    CollaborativeEditingHandler.prototype.updateRemoteSelection = function (data, removeOffset) {
        if (this.documentEditor.editorModule.isIncrementalSave) {
            return;
        }
        if (data.connectionId) {
            var color = '';
            var caret = void 0;
            if (this.userMap[data.connectionId] !== undefined) {
                color = this.userMap[data.connectionId].color;
                caret = this.userMap[data.connectionId].caret;
            }
            else {
                color = this.getColorForMember(Math.random() * 100);
                caret = createElement('div', { className: 'e-de-blink-cursor', styles: ('position:absolute;border-left: 2px solid ' + color) });
                this.userMap[data.connectionId] = new CaretInfo(color, caret, removeOffset, data.currentUser);
            }
            this.userMap[data.connectionId].offset = removeOffset;
            this.updateCaretPositionInteral(caret, removeOffset);
        }
    };
    CollaborativeEditingHandler.prototype.removeCarets = function (connectionId) {
        if (this.userMap[connectionId] !== undefined) {
            this.userMap[connectionId].caret.remove();
            delete this.userMap[connectionId];
        }
    };
    CollaborativeEditingHandler.prototype.getColorForMember = function (randonNumber) {
        var colorValue = randonNumber % 20;
        return "hsl(" + (colorValue * 360 / 7) % 360 + ", 100%, 35%)";
    };
    CollaborativeEditingHandler.prototype.updateCaretPositionInteral = function (caret, start) {
        var zoomFactor = this.documentEditor.zoomFactor;
        var selection = this.documentEditor.selectionModule;
        var startPos = selection.getTextPosBasedOnLogicalIndex(this.getRelativePositionFromAbsolutePosition(start, false, false, false));
        //let endPos: TextPosition = selection.getTextPosBasedOnLogicalIndex(end);
        var caretPosition = startPos.location;
        //if (startPos.isInSameParagraph(endPos)) {
        caret.style.display = 'block';
        if (!caret.parentElement) {
            this.documentEditor.documentHelper.viewerContainer.appendChild(caret);
        }
        var page = selection.getSelectionPage(startPos);
        if (page) {
            caret.style.left = page.boundingRectangle.x + (Math.round(caretPosition.x) * zoomFactor) + 'px';
            var caretInfo = selection.updateCaretSize(startPos, true);
            var topMargin = caretInfo.topMargin;
            caret.style.height = (caretInfo.height * zoomFactor) + 'px';
            var pageTop = selection.getPageTop(page);
            caret.style.top = pageTop + Math.round(caretPosition.y + topMargin) * zoomFactor + 'px';
            if (selection.characterFormat.baselineAlignment === 'Subscript') {
                caret.style.top = parseFloat(caret.style.top) + (parseFloat(caret.style.height) / 2) + 'px';
            }
        }
    };
    CollaborativeEditingHandler.prototype.getBlockPosition = function (offset, currentLength, block, completed, isTableInserted, isRowInserted, isCellInserted) {
        var paragraph;
        if (block instanceof ParagraphWidget) {
            // let paraLength: number = block.length;
            // Code for Comparing the offset calculated using old approach and optimized approach
            // if (this.documentEditor.selection.getParagraphLength(block) + 1 == block.length && currentLength + paraLength < offset && currentLength + paraLength + 1 < offset && this.documentEditor.selection.isNewApproach) {
            //     currentLength += paraLength;
            // } else {
            var absoluteData = this.getBlockTotalLength(offset, currentLength, block, completed, isTableInserted, isRowInserted, isCellInserted);
            // length = block.getTotalLength() + 1;
            // paragraph = block;
            if (completed.done) {
                completed.done = true;
                return absoluteData;
            }
            else {
                //Add paragraph mark length
                currentLength = absoluteData.currentLength;
                offset = absoluteData.offset;
                paragraph = absoluteData.paragraph;
            }
            // }
        }
        else if (block instanceof TableWidget) {
            // Table start mark length
            offset -= 1;
            if (offset === currentLength) {
                if (isTableInserted || this.documentEditor.selectionModule.isEndOffset) {
                    completed.done = true;
                    return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph, 'tableWidget': block };
                }
            }
            var row = block.firstChild;
            while (row) {
                // Row mark length
                offset -= 1;
                if (offset === currentLength) {
                    if (isRowInserted || this.documentEditor.selectionModule.isEndOffset) {
                        completed.done = true;
                        var index = row.index;
                        return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph, 'rowOrCellIndex': index, 'rowWidget': row };
                    }
                    else if (isCellInserted) {
                        completed.done = true;
                        var cellWidget = paragraph.associatedCell;
                        var index = cellWidget.cellIndex + 1;
                        return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph, 'rowOrCellIndex': index, 'cellWidget': cellWidget };
                    }
                }
                var cell = row.firstChild;
                while (cell) {
                    // Cell mark length
                    offset -= 1;
                    if (offset === currentLength) {
                        if (isCellInserted) {
                            completed.done = true;
                            var index = cell.cellIndex;
                            return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph, 'rowOrCellIndex': index, 'cellWidget': cell };
                        }
                    }
                    var childBlock = cell.firstChild;
                    while (childBlock) {
                        var data = this.getBlockPosition(offset, currentLength, childBlock, completed, isTableInserted, isRowInserted, isCellInserted);
                        if (completed.done) {
                            if (isRowInserted && isNullOrUndefined(data.rowWidget)) {
                                completed.done = true;
                                var rowWidget = cell.ownerRow;
                                var index = rowWidget.index + 1;
                                return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph, 'rowOrCellIndex': index, 'rowWidget': rowWidget };
                            }
                            else if (isCellInserted && isNullOrUndefined(data.cellWidget)) {
                                completed.done = true;
                                var cellWidget = cell;
                                var index = cellWidget.cellIndex + 1;
                                return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph, 'rowOrCellIndex': index, 'cellWidget': cellWidget };
                            }
                            else {
                                return data;
                            }
                        }
                        else {
                            offset = data.offset;
                            currentLength = data.currentLength;
                            paragraph = data.paragraph;
                        }
                        childBlock = childBlock.getSplitWidgets().pop().nextRenderedWidget;
                    }
                    cell = cell.nextWidget;
                }
                var tableIndex = row.ownerTable.index;
                row = row.getSplitWidgets().pop().nextRenderedWidget;
                if (row && row.ownerTable.index !== tableIndex) {
                    row = undefined;
                }
            }
        }
        return { 'offset': offset, 'currentLength': currentLength, 'paragraph': paragraph };
    };
    CollaborativeEditingHandler.prototype.getBlockTotalLength = function (offset, currentLength, block, completed, isTableInserted, isRowInserted, isCellInserted) {
        var splittedWidget = block.getSplitWidgets();
        //Paragraph start offset
        var paragraphStartLength = 1;
        var length = 0;
        if (currentLength + paragraphStartLength >= offset) {
            completed.done = true;
            return { 'offset': offset - 1, 'currentLength': currentLength, 'paragraph': block };
        }
        var childBlockLength = 0;
        for (var i = 0; i < splittedWidget.length; i++) {
            for (var j = 0; j < splittedWidget[i].childWidgets.length; j++) {
                var line = splittedWidget[i].childWidgets[j];
                for (var k = 0; k < line.children.length; k++) {
                    var element = line.children[k];
                    if (element instanceof ListTextElementBox) {
                        continue;
                    }
                    if ((element instanceof ShapeElementBox && !isNullOrUndefined(element.textFrame) && element.textFrame.childWidgets.length > 0)
                        || element instanceof FootnoteElementBox) {
                        var absoluteData = void 0;
                        if (element instanceof ShapeElementBox) {
                            var currentLengthValue = currentLength + childBlockLength + length + paragraphStartLength;
                            for (var i_1 = 0; i_1 < element.textFrame.childWidgets.length; i_1++) {
                                absoluteData = this.getBlockPosition(offset, currentLengthValue, element.textFrame.childWidgets[i_1], completed, isTableInserted, isRowInserted, isCellInserted);
                                currentLengthValue = absoluteData.currentLength;
                                offset = absoluteData.offset;
                            }
                        }
                        else {
                            var currentLengthValue = currentLength + childBlockLength + length + paragraphStartLength;
                            for (var m = 0; m < element.bodyWidget.childWidgets.length && !completed.done; m++) {
                                absoluteData = this.getBlockPosition(offset, currentLengthValue, element.bodyWidget.childWidgets[m], completed, isTableInserted, isRowInserted, isCellInserted);
                                currentLengthValue = absoluteData.currentLength;
                                offset = absoluteData.offset;
                            }
                        }
                        offset = absoluteData.offset;
                        childBlockLength += (absoluteData.currentLength - (currentLength + length + paragraphStartLength + childBlockLength));
                        if (completed.done) {
                            currentLength = absoluteData.currentLength;
                            return absoluteData;
                        }
                    }
                    length += element.length;
                    offset += element.skipformFieldLength ? element.length : 0;
                    if (currentLength + childBlockLength + length + paragraphStartLength >= offset) {
                        completed.done = true;
                        return { 'offset': offset - 1, 'currentLength': currentLength + childBlockLength, 'paragraph': block };
                    }
                }
            }
        }
        if (currentLength + childBlockLength + length + paragraphStartLength + 1 == offset && this.documentEditor.selection.isEndOffset && !this.documentEditor.selection.isFootEndNoteParagraph(block)) {
            completed.done = true;
            return { 'offset': offset - 1, 'currentLength': currentLength + childBlockLength, 'paragraph': block };
        }
        else {
            currentLength += (length + childBlockLength + paragraphStartLength);
            return { 'offset': offset, 'currentLength': currentLength, 'paragraph': block };
        }
    };
    CollaborativeEditingHandler.prototype.getRelativePositionFromAbsolutePosition = function (offset, isTableInserted, isRowInserted, isCellInserted) {
        var documentEditor = this.documentEditor;
        var block = this.documentEditor.documentHelper.pages[0].bodyWidgets[0].childWidgets[0];
        var currentLength = 0;
        var positionInfo = { done: false };
        var blockObj = this.getBlockByIndex(block, offset, currentLength, positionInfo, isTableInserted, isRowInserted, isCellInserted);
        if (positionInfo.done) {
            var paraOffset = blockObj.offset - blockObj.currentLength;
            if (paraOffset < 0) {
                paraOffset = 0;
            }
            var paragraphInfo = {
                paragraph: blockObj.paragraph,
                offset: paraOffset,
            };
            if (isTableInserted || isRowInserted || isCellInserted) {
                return blockObj;
            }
            else {
                return documentEditor.selectionModule.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
            }
        }
        else if (blockObj.offset === blockObj.currentLength + 1 && this.documentEditor.selection.isEndOffset) {
            var length_1 = this.documentEditor.selection.getParagraphLength(blockObj.paragraph);
            currentLength = blockObj.currentLength - length_1;
            return documentEditor.selection.getHierarchicalIndex(blockObj.paragraph, (blockObj.offset - currentLength).toString());
        }
        var blockObj1 = this.getBlockIndexFromHeaderFooter(blockObj.offset, blockObj.currentLength, positionInfo, isTableInserted, isRowInserted, isCellInserted);
        if (positionInfo.done) {
            var paraOffset = blockObj1.offset - blockObj1.currentLength;
            if (paraOffset < 0) {
                paraOffset = 0;
            }
            var paragraphInfo = {
                paragraph: blockObj1.paragraph,
                offset: paraOffset,
            };
            if (isTableInserted || isRowInserted || isCellInserted) {
                return blockObj1;
            }
            else {
                return documentEditor.selectionModule.getHierarchicalIndex(paragraphInfo.paragraph, paragraphInfo.offset.toString());
            }
        }
        return '';
    };
    CollaborativeEditingHandler.prototype.getBlockIndexFromHeaderFooter = function (offset, currentLength, positionInfo, isTableInserted, isRowInserted, isCellInserted) {
        //Iterate header/footer content;
        var blockObj;
        var headersFooters = this.documentEditor.documentHelper.headersFooters;
        for (var _i = 0, headersFooters_1 = headersFooters; _i < headersFooters_1.length; _i++) {
            var headerFooter = headersFooters_1[_i];
            for (var i = 0; i < 6; i++) {
                var currentHeaderFooter = headerFooter[i];
                if (currentHeaderFooter) {
                    blockObj = this.getBlockByIndex(currentHeaderFooter.childWidgets[0], offset, currentLength, positionInfo, isTableInserted, isRowInserted, isCellInserted);
                    currentLength = blockObj.currentLength;
                    offset = blockObj.offset;
                    if (positionInfo.done) {
                        return blockObj;
                    }
                }
                else {
                    if (currentLength + 1 >= offset) {
                        positionInfo.done = true;
                        return blockObj;
                    }
                    //Insert new header footer and paragraph to existing collection.
                    currentLength++;
                    blockObj.currentLength = currentLength;
                }
            }
        }
        return blockObj;
    };
    CollaborativeEditingHandler.prototype.getBlockByIndex = function (block, offset, currentLength, positionInfo, isTableInserted, isRowInserted, isCellInserted) {
        var blockObj;
        do {
            blockObj = this.getBlockPosition(offset, currentLength, block, positionInfo, isTableInserted, isRowInserted, isCellInserted);
            currentLength = blockObj.currentLength;
            offset = blockObj.offset;
            if (positionInfo.done) {
                return blockObj;
            }
            block = block.getSplitWidgets().pop().nextRenderedWidget;
        } while (block);
        return blockObj;
    };
    CollaborativeEditingHandler.prototype.insertImage = function (imageData) {
        if (isNullOrUndefined(imageData.metaString)) {
            this.documentEditor.editorModule.insertImageInternal(imageData.imageString, true, HelperMethods.convertPointToPixel(imageData.width), HelperMethods.convertPointToPixel(imageData.height), imageData.alternativeText);
        }
        else {
            this.documentEditor.editorModule.isImageInsert = true;
            this.documentEditor.editorModule.insertImageInternal(imageData.metaString, true, HelperMethods.convertPointToPixel(imageData.width), HelperMethods.convertPointToPixel(imageData.height), imageData.alternativeText);
        }
    };
    CollaborativeEditingHandler.prototype.buildTable = function (operations) {
        var rows = 0;
        var columns = 0;
        for (var i = 0; i < operations.length; i++) {
            if (operations[i].text === CONTROL_CHARACTERS.Row) {
                if (!isNullOrUndefined(operations[i].markerData)) {
                    if (isNullOrUndefined(this.documentEditor.editorModule.revisionData)) {
                        this.documentEditor.editorModule.revisionData = [];
                    }
                    this.documentEditor.editorModule.revisionData.push(operations[i].markerData);
                }
                rows++;
            }
        }
        for (var i = 0; i < operations.length; i++) {
            if (operations[i].text === CONTROL_CHARACTERS.Cell) {
                i += 2;
                columns++;
            }
            if (operations[i].text !== CONTROL_CHARACTERS.Table && (isNullOrUndefined(operations[i + 1]) || operations[i + 1].text === CONTROL_CHARACTERS.Row)) {
                break;
            }
        }
        this.documentEditor.editorModule.insertTable(rows, columns);
        this.documentEditor.editorModule.revisionData = undefined;
    };
    CollaborativeEditingHandler.prototype.buildRow = function (operations) {
        var rowData;
        var cellDatas = [];
        var paragraphDatas = [];
        var characterDatas = [];
        var cellCount = 0;
        var insertRow = 0;
        var data = this.getRelativePositionFromAbsolutePosition(operations[0].offset, false, true, false);
        var tableWidget = data.rowWidget.ownerTable.combineWidget(this.documentEditor.viewer);
        if (!isNullOrUndefined(operations[0].markerData)) {
            if (isNullOrUndefined(operations[0].format)) {
                var row = data.rowWidget;
                if (row.rowFormat.revisions.length > 0) {
                    var revision = row.rowFormat.revisions[0];
                    revision.accept();
                    return;
                }
            }
        }
        for (var i = 0; i < operations.length; i++) {
            var operation = operations[i];
            if (operation.text === CONTROL_CHARACTERS.Cell) {
                cellCount++;
                cellDatas.push(JSON.parse(operation.format));
                paragraphDatas.push(JSON.parse(operations[i + 1].format));
                characterDatas.push(JSON.parse(operations[i + 2].format));
                i += 2;
            }
            if (isNullOrUndefined(operations[i + 1]) || operations[i + 1].text === CONTROL_CHARACTERS.Row) {
                break;
            }
        }
        for (var i = 0; i < operations.length; i++) {
            if (operations[i].text === CONTROL_CHARACTERS.Row) {
                if (!isNullOrUndefined(operations[i].markerData)) {
                    if (isNullOrUndefined(this.documentEditor.editorModule.revisionData)) {
                        this.documentEditor.editorModule.revisionData = [];
                    }
                    this.documentEditor.editorModule.revisionData.push(operations[i].markerData);
                }
                insertRow++;
                rowData = JSON.parse(operations[i].format);
            }
        }
        this.documentEditor.editorModule.rowInsertionForCE(data.rowOrCellIndex, cellCount, insertRow, tableWidget, rowData, cellDatas, paragraphDatas, characterDatas);
        cellDatas = [];
        paragraphDatas = [];
        characterDatas = [];
        this.documentEditor.editorModule.revisionData = undefined;
    };
    CollaborativeEditingHandler.prototype.buildCell = function (operation, paraFormt, charFormat) {
        var data = this.getRelativePositionFromAbsolutePosition(operation.offset, false, false, true);
        if (operation.length > 0) {
            this.rowWidget = data.cellWidget.ownerRow;
            this.documentEditor.editorModule.cellInsertionForCE(data.rowOrCellIndex, this.rowWidget, JSON.parse(operation.format), JSON.parse(paraFormt), JSON.parse(charFormat));
        }
        else {
            this.documentEditor.documentHelper.owner.parser.parseCellFormat(JSON.parse(operation.format), data.cellWidget.cellFormat, 0);
        }
    };
    CollaborativeEditingHandler.prototype.buildDeleteCells = function (operation) {
        var data = this.getRelativePositionFromAbsolutePosition(operation.offset, false, false, true);
        if (!isNullOrUndefined(data.cellWidget)) {
            var firstPara = this.documentEditor.selectionModule.getFirstParagraph(data.cellWidget);
            var lastPara = this.documentEditor.selectionModule.getLastParagraph(data.cellWidget);
            if (!isNullOrUndefined(firstPara) && !isNullOrUndefined(lastPara)) {
                this.documentEditor.selectionModule.start.setPosition(firstPara.firstChild, true);
                this.documentEditor.selectionModule.end.setPositionParagraph(lastPara.lastChild, lastPara.lastChild.getEndOffset() + 1);
            }
            this.documentEditor.editorModule.checkAndRemoveComments();
            this.table = data.cellWidget.ownerTable.combineWidget(this.documentEditor.viewer);
            var paragraph = undefined;
            if (data.cellWidget.nextWidget) {
                var nextCell = data.cellWidget.nextWidget;
                paragraph = this.documentEditor.selectionModule.getFirstParagraph(nextCell);
            }
            else if (data.cellWidget.previousWidget) {
                var previousCell = data.cellWidget.previousWidget;
                paragraph = this.documentEditor.selectionModule.getFirstParagraph(previousCell);
            }
            if (isNullOrUndefined(paragraph)) {
                paragraph = this.documentEditor.editorModule.getParagraphForSelection(this.table);
            }
            operation.length += this.documentEditor.editorModule.onDeleteColumn(this.table, [data.cellWidget]);
            this.table.updateRowIndex(0);
            this.documentEditor.selectionModule.selectParagraphInternal(paragraph, true);
        }
    };
    CollaborativeEditingHandler.prototype.transformSelectionOperation = function (operation, conflictingOperation) {
        if (operation.action === 'Delete' && (conflictingOperation.action === 'Delete' || conflictingOperation.action == 'Format')) {
            var previousStart = conflictingOperation.offset;
            var conflictingSelection = conflictingOperation;
            // Case 1: No overlap, no conflict
            if ((operation.offset + operation.length) <= conflictingSelection.offset || operation.offset >= (conflictingSelection.offset + conflictingSelection.length)) {
                return;
            }
            // Case 2: Local selection is completely within the conflicting selection
            if (operation.offset >= conflictingSelection.offset && (operation.offset + operation.length) <= (conflictingSelection.offset + conflictingSelection.length)) {
                conflictingOperation.offset = conflictingOperation.offset;
                conflictingOperation.length -= operation.length;
                if (conflictingOperation.length <= 0) {
                    conflictingOperation.skipOperation = true;
                }
                return;
            }
            // Case 3: Local selection overlaps from the left side
            if (operation.offset < conflictingSelection.offset && (operation.offset + operation.length) <= (conflictingSelection.offset + conflictingSelection.length)) {
                conflictingOperation.offset = operation.offset + operation.length;
                conflictingOperation.length -= conflictingOperation.offset - previousStart;
                //return transformedOperation;
                return;
            }
            // Case 4: Local selection overlaps from the right side
            if (operation.offset >= conflictingSelection.offset && (operation.offset + operation.length) > (conflictingSelection.offset + conflictingSelection.length)) {
                conflictingOperation.length -= (conflictingOperation.offset + conflictingOperation.length) - operation.offset;
                return;
            }
            // Case 5: Local selection fully encompasses the conflicting selection
            if (operation.offset < conflictingSelection.offset && (operation.offset + operation.length) > (conflictingSelection.offset + conflictingSelection.length)) {
                conflictingSelection.offset = operation.offset;
                conflictingSelection.length = 0;
                conflictingOperation.skipOperation = true;
                return;
            }
        }
    };
    CollaborativeEditingHandler.prototype.documentSettings = function (operation) {
        this.documentEditor.skipSettingsOps = true;
        switch (operation.text) {
            case 'enableTrackChanges':
                this.documentEditor.enableTrackChanges = operation.enableTrackChanges;
                break;
            case 'protection':
                this.documentEditor.documentHelper.restrictEditingPane.showHideRestrictPane(this.documentEditor.documentHelper.restrictEditingPane.isShowRestrictPane);
                if (!isNullOrUndefined(operation.protectionData.saltValue)) {
                    if (operation.protectionData.hashValue === '' && operation.protectionData.saltValue === '') {
                        this.documentEditor.editorModule.protectDocument(operation.protectionData.protectionType);
                    }
                    else {
                        this.documentEditor.editorModule.enforceProtectionAssign(operation.protectionData.saltValue, operation.protectionData.hashValue, operation.protectionData.protectionType);
                    }
                }
                else {
                    if (isNullOrUndefined(operation.protectionData.hashValue)) {
                        this.documentEditor.editorModule.unProtectDocument();
                    }
                    else {
                        this.documentEditor.editorModule.validateHashValue(operation.protectionData.hashValue);
                    }
                }
                break;
        }
    };
    CollaborativeEditingHandler.prototype.checkAndRetriveChangesFromServer = function () {
        var _this = this;
        if (!this.isSyncServerChanges) {
            var action = {
                version: this.version,
                connectionId: this.connectionId,
                roomName: this.roomName,
            };
            var httpRequest = new XMLHttpRequest();
            httpRequest.open('Post', this.serviceUrl + 'GetActionsFromServer', true);
            httpRequest.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
            this.setCustomAjaxHeaders(httpRequest);
            httpRequest.onreadystatechange = function () {
                if (httpRequest.readyState === 4) {
                    if (httpRequest.status === 200 || httpRequest.status === 304) {
                        _this.applyChangesFromServer(httpRequest.responseText);
                    }
                    else {
                        var failedArgs = { status: (httpRequest.status).toString(), statusText: httpRequest.statusText, url: _this.serviceUrl + 'GetActionsFromServer' };
                        _this.documentEditor.fireServiceFailure(failedArgs);
                    }
                }
            };
            httpRequest.send(JSON.stringify(action));
            this.isSyncServerChanges = true;
        }
    };
    CollaborativeEditingHandler.prototype.applyChangesFromServer = function (data) {
        var dataObject = JSON.parse(data);
        if (dataObject.length > 0) {
            for (var i = 0; i < dataObject.length; i++) {
                var data_5 = dataObject[i];
                if (data_5.connectionId === this.connectionId) {
                    this.acknowledgementReceived();
                    this.logMessage(this.isSyncServerChanges ? 'SignalR Server sync' + data_5.version : 'SignalR Same user sync:' + data_5.version);
                }
                else {
                    this.handleRemoteOperation(data_5);
                    this.logMessage('Received: ' + JSON.stringify(JSON.stringify(data_5)));
                }
                this.updateVersion(data_5.version);
                this.logMessage('Server sync ack:' + data_5.version);
            }
            this.updateVersion(dataObject[dataObject.length - 1].version);
        }
        this.isSyncServerChanges = false;
        if (!this.isAcknowledgePending()) {
            this.acknowledgementReceived();
        }
        this.sendLocalOperation();
    };
    CollaborativeEditingHandler.prototype.insertCharaterFormat = function (type, characterData) {
        var format = new WCharacterFormat(undefined);
        var characterFormat = JSON.parse(characterData);
        var keys = Object.keys(characterFormat);
        this.documentEditor.documentHelper.owner.parser.parseCharacterFormat(0, characterFormat, format);
        if (keys.length > 1) {
            this.documentEditor.documentHelper.owner.fontDialogModule.onCharacterFormat(this.documentEditor.selectionModule, format);
            this.documentEditor.editorModule.onApplyCharacterFormat('CharacterFormat', format);
        }
        else if (keys.length === 1) {
            if (keys.indexOf('styleName') !== -1) {
                if (isNullOrUndefined(characterFormat.styleName)) {
                    this.documentEditor.editorModule.onApplyCharacterFormat('styleName', null, false, true);
                }
                else {
                    this.documentEditor.editorModule.applyStyle(characterFormat.styleName);
                }
            }
            else if (keys.indexOf('Uppercase') !== -1 || keys.indexOf('Lowercase') !== -1 || keys.indexOf('SentenceCase') !== -1 || keys.indexOf('ToggleCase') !== -1 || keys.indexOf('CapitalizeEachWord') !== -1) {
                this.documentEditor.editorModule.changeCase(keys[0]);
            }
            else {
                if (type === 'increment' || type === 'decrement') {
                    this.documentEditor.editorModule.onApplyCharacterFormat(keys[0], type, true);
                }
                else {
                    this.documentEditor.editorModule.onApplyCharacterFormat(keys[0], characterFormat[keys[0]]);
                }
            }
        }
        else {
            this.documentEditor.editorModule.clearFormatting();
        }
    };
    CollaborativeEditingHandler.prototype.insertParagraphFormat = function (operation, paragraphData) {
        var format = new WParagraphFormat(undefined);
        var paragraphFormat = JSON.parse(paragraphData);
        var update = false;
        if (!isNullOrUndefined(paragraphFormat.isFirstParaForList)) {
            delete paragraphFormat.isFirstParaForList;
            update = true;
        }
        var keys = Object.keys(paragraphFormat);
        this.documentEditor.documentHelper.owner.parser.parseParagraphFormat(0, paragraphFormat, format);
        if (keys.length === 1) {
            if (keys.indexOf('styleName') !== -1) {
                this.documentEditor.editorModule.applyStyle(paragraphFormat.styleName);
            }
            else {
                if (keys[0] === 'borders') {
                    this.documentEditor.editorModule.onApplyParagraphFormat(keys[0], format.borders, false, false);
                }
                else if (keys[0] === 'listFormat') {
                    this.updateList(operation, format);
                    var list = this.documentEditor.documentHelper.getListById(paragraphFormat.listFormat.nsid, true);
                    if (!isNullOrUndefined(list)) {
                        format.listFormat.listId = list.listId;
                        format.listFormat.list = list;
                    }
                    this.documentEditor.editorModule.onApplyParagraphFormat('listFormat', format.listFormat, false, false);
                }
                else {
                    this.documentEditor.editorModule.onApplyParagraphFormat(keys[0], paragraphFormat[keys[0]], update, false);
                }
            }
        }
        else {
            this.documentEditor.documentHelper.owner.paragraphDialogModule.onParagraphFormat(format);
        }
    };
    CollaborativeEditingHandler.prototype.insertTableFormat = function (type, tableData, offset) {
        var format = new WTableFormat(undefined);
        var tableFormat = JSON.parse(tableData);
        var keys = Object.keys(tableFormat);
        this.documentEditor.documentHelper.owner.parser.parseTableFormat(tableFormat, format, 0);
        var data = this.getRelativePositionFromAbsolutePosition(offset, true, false, false);
        var sourceTable = data.tableWidget;
        if (!isNullOrUndefined(type)) {
            var typeValue = type === 'TableAutoFitToContents' ? 'FitToContents' : type === 'TableAutoFitToWindow' ? 'FitToWindow' : 'FixedColumnWidth';
            this.documentEditor.editorModule.insertAutoFitTable(typeValue, sourceTable);
            return;
        }
        if (keys.length === 1) {
            this.documentEditor.editorModule.onApplyTableFormat(keys[0], tableFormat[keys[0]], sourceTable);
        }
        else {
            if (keys.indexOf('borders') !== -1 || keys.indexOf('shading') !== -1) {
                this.documentEditor.editorModule.isBordersAndShadingDialog = true;
                this.documentEditor.editorModule.onTableFormat(format, true, sourceTable);
                this.documentEditor.editorModule.isBordersAndShadingDialog = false;
            }
            else if (keys.indexOf('cellSpacing') !== -1 || keys.indexOf('leftMargin') !== -1 || keys.indexOf('topMargin') !== -1 || keys.indexOf('rightMargin') !== -1 || keys.indexOf('bottomMargin') !== -1) {
                this.documentEditor.documentHelper.owner.tableOptionsDialogModule.applySubTableOptions(format, sourceTable);
            }
            else {
                this.documentEditor.editorModule.onTableFormat(format, false, sourceTable);
            }
        }
    };
    CollaborativeEditingHandler.prototype.insertRowFormat = function (property, rowData) {
        var format = new WRowFormat(undefined);
        var rowFormat = JSON.parse(rowData);
        var keys = Object.keys(rowFormat);
        this.documentEditor.documentHelper.owner.parser.parseRowFormat(rowFormat, format, 0);
        if (keys.length === 1) {
            this.documentEditor.editorModule.onApplyTableRowFormat(keys[0], rowFormat[keys[0]]);
        }
        else {
            this.documentEditor.editorModule.onRowFormat(format);
        }
    };
    CollaborativeEditingHandler.prototype.insertCellFormat = function (cellData) {
        if (!this.documentEditor.selectionModule.start.paragraph.isInsideTable) {
            return;
        }
        var format = new WCellFormat(undefined);
        var formatCell = JSON.parse(cellData);
        var keys = Object.keys(formatCell);
        this.documentEditor.documentHelper.owner.parser.parseCellFormat(formatCell, format, 0);
        var cellFormat = this.documentEditor.selectionModule.start.paragraph.associatedCell.cellFormat;
        if (keys.length === 1) {
            if (keys[0] === 'shading') {
                this.documentEditor.editorModule.applyCellPropertyValue(this.documentEditor.selectionModule, keys[0], format.shading, cellFormat);
            }
            else if (keys[0] === 'borders') {
                this.documentEditor.editorModule.applyCellPropertyValue(this.documentEditor.selectionModule, keys[0], format.borders, cellFormat);
            }
            else {
                this.documentEditor.editorModule.applyCellPropertyValue(this.documentEditor.selectionModule, keys[0], formatCell[keys[0]], cellFormat);
            }
            this.rowWidget = this.documentEditor.selectionModule.start.paragraph.associatedCell.ownerRow;
        }
        else {
            if (keys.indexOf('preferredWidth') !== -1 || keys.indexOf('preferredWidthType') !== -1 || keys.indexOf('verticalAlignment') !== -1 || keys.indexOf('borders') !== -1 || keys.indexOf('shading') !== -1) {
                if (keys.indexOf('borders') !== -1 || keys.indexOf('shading') !== -1) {
                    this.documentEditor.editorModule.isBordersAndShadingDialog = true;
                }
                this.documentEditor.editorModule.applyCellPropertyValue(this.documentEditor.selectionModule, undefined, format, cellFormat);
                this.rowWidget = this.documentEditor.selectionModule.start.paragraph.associatedCell.ownerRow;
                this.documentEditor.editorModule.isBordersAndShadingDialog = false;
            }
            else {
                this.documentEditor.documentHelper.owner.cellOptionsDialogModule.applySubCellOptions(format);
            }
        }
    };
    CollaborativeEditingHandler.prototype.insertSectionFormat = function (property, sectionData) {
        var data = JSON.parse(sectionData);
        var keys = Object.keys(data);
        if (keys[0] === 'linkToPrevious') {
            var headerFooterWidget = this.documentEditor.selectionModule.start.paragraph.bodyWidget;
            var sectionIndex = headerFooterWidget.sectionIndex;
            var headerFooterType = headerFooterWidget.headerFooterType;
            this.documentEditor.editorModule.removeInlineHeaderFooterWidget(sectionIndex, headerFooterType, property, data['linkToPrevious']);
        }
        else if (keys.length > 1) {
            var sectionFormat = new WSectionFormat();
            this.documentEditor.documentHelper.owner.parser.parseSectionFormat(0, data, sectionFormat);
            this.documentEditor.editorModule.onApplySectionFormat(undefined, sectionFormat);
        }
        else {
            this.documentEditor.editorModule.onApplySectionFormat(Object.keys(data)[0], data[Object.keys(data)[0]]);
        }
    };
    CollaborativeEditingHandler.prototype.logMessage = function (event) {
        if (this.logEventEnabled) {
            this.message += event + ' ' + '\n';
        }
    };
    CollaborativeEditingHandler.prototype.setCustomAjaxHeaders = function (xmlHttpRequest) {
        for (var i = 0; i < this.documentEditor.headers.length; i++) {
            var header = this.documentEditor.headers[i];
            for (var _i = 0, _a = Object.keys(header); _i < _a.length; _i++) {
                var key = _a[_i];
                xmlHttpRequest.setRequestHeader(key, header[key]);
            }
        }
    };
    /**
     * Destory collaborative editing module.
     * @private
     */
    CollaborativeEditingHandler.prototype.destroy = function () {
        this.version = undefined;
        this.documentEditor = undefined;
        this.roomName = undefined;
        this.userMap = undefined;
        this.connectionId = undefined;
        this.acknowledgmentPending = undefined;
        this.pendingOps = undefined;
        this.serviceUrl = undefined;
        this.isSyncServerChanges = undefined;
        this.message = undefined;
        this.rowWidget = undefined;
    };
    return CollaborativeEditingHandler;
}());
export { CollaborativeEditingHandler };
/**
 * @private
 */
var CaretInfo = /** @class */ (function () {
    function CaretInfo(color, caret, offset, userName) {
        this.color = color;
        this.caret = caret;
        this.offset = offset;
        this.userName = userName;
        this.initializeElement();
    }
    /**
     * @private
     */
    CaretInfo.prototype.initializeElement = function () {
        this.hoverDiv = createElement('div', { className: 'e-de-user-info e-de-user-name-collapse', styles: 'z-index: 1; visibility: hidden;left:-4px;position:absolute;width:20px;height:20px;pointer-events:all;' });
        this.userViewContainer = createElement('div');
        this.spanViewContainer = createElement('div', { styles: 'background-color:' + this.color + ';left: 0px; top: 15px; visibility: visible;' });
        this.spanView = createElement('span', { styles: 'background-color:' + this.color + '; left: 0px;top:-4px;pointer:default' });
        this.spanViewContainer.appendChild(this.spanView);
        this.userViewContainer.appendChild(this.spanViewContainer);
        this.hoverDiv.appendChild(this.userViewContainer);
        this.caret.appendChild(this.hoverDiv);
        this.hoverDiv.addEventListener('mouseenter', this.onMouseEnter.bind(this));
        this.hoverDiv.addEventListener('mouseleave', this.onMouseLeave.bind(this));
    };
    CaretInfo.prototype.onMouseEnter = function () {
        this.hoverDiv.classList.remove('e-de-user-name-collapse');
        this.hoverDiv.classList.add('e-de-user-name-expended');
        this.spanView.innerText = this.userName;
    };
    CaretInfo.prototype.onMouseLeave = function () {
        this.hoverDiv.classList.add('e-de-user-name-collapse');
        this.hoverDiv.classList.remove('e-de-user-name-expended');
        this.spanView.innerText = '';
    };
    return CaretInfo;
}());
