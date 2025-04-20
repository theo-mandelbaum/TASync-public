var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { BaseHistoryInfo } from './base-history-info';
import { CommentCharacterElementBox } from '../viewer/page';
import { CONTROL_CHARACTERS } from '../../base/types';
/**
 * EditorHistory preservation class
 */
/**
 * @private
 */
var HistoryInfo = /** @class */ (function (_super) {
    __extends(HistoryInfo, _super);
    function HistoryInfo(node, isChild) {
        var _this = _super.call(this, node) || this;
        _this.isChildHistoryInfo = false;
        _this.editRangeStart = undefined;
        _this.documentHelper = node.documentHelper;
        _this.isChildHistoryInfo = isChild;
        return _this;
    }
    Object.defineProperty(HistoryInfo.prototype, "hasAction", {
        get: function () {
            return !isNullOrUndefined(this.modifiedActions);
        },
        enumerable: true,
        configurable: true
    });
    HistoryInfo.prototype.addModifiedAction = function (baseHistoryInfo) {
        // For complex actions such as Replace text, Insert/Remove Hyperlink etc.
        if (!(this.editorHistory.isUndoing || this.editorHistory.isRedoing)) {
            if (isNullOrUndefined(this.modifiedActions)) {
                this.modifiedActions = [];
            }
            this.modifiedActions.push(baseHistoryInfo);
        }
    };
    /**
     * @returns {Operation[]} returns an array of type Operations
     * @param {boolean} isInvertOperation accepts a boolean value
     * @private
     */
    HistoryInfo.prototype.getActionInfo = function (isInvertOperation) {
        var action = this.action;
        var operations = [];
        switch (action) {
            case 'Insert':
                for (var i = 0; i < this.modifiedActions.length; i++) {
                    var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                    operations.push(currentHistory.getInsertOperation(currentHistory.action));
                }
                break;
            case 'InsertContentControl':
                for (var i = 0; i < this.modifiedActions.length; i++) {
                    var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                    operations.push(currentHistory.getInsertOperation(currentHistory.action));
                }
                break;
            case 'InsertBookmark':
            case 'RestrictEditing':
                if (this.editorHistory.isUndoing) {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        if (action === 'RestrictEditing') {
                            this.modifiedActions[parseInt(i.toString(), 10)].markerData.push(this.owner.editorModule.getMarkerData(this.modifiedActions[parseInt(i.toString(), 10)].removedNodes[0]));
                        }
                        operations.push(this.modifiedActions[parseInt(i.toString(), 10)].getDeleteOperation('DeleteBookmark', i === 0 ? true : undefined));
                        this.modifiedActions[parseInt(i.toString(), 10)].markerData.shift();
                    }
                }
                else {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (currentHistory.action === 'DeleteBookmark') {
                            operations.push(currentHistory.getDeleteOperation('DeleteBookmark'));
                            operations.push(currentHistory.getDeleteOperation('DeleteBookmark', true));
                            continue;
                        }
                        operations.push(currentHistory.getInsertOperation(action));
                    }
                }
                break;
            case 'BackSpace':
            case 'Delete':
            case 'RemoveEditRange':
                if (this.editorHistory.isUndoing) {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (currentHistory.action === 'InsertInline') {
                            var operation = currentHistory.getDeleteOperation('DeleteBookmark', true);
                            operations.push(operation);
                        }
                        else {
                            var operationCollection = currentHistory.getActionInfo();
                            operations = operations.concat(operationCollection);
                            if (currentHistory.action === 'RemoveEditRange') {
                                operations.push(currentHistory.getDeleteOperation(action, true));
                            }
                        }
                    }
                    operations.reverse();
                }
                else {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (currentHistory.action === 'InsertInline') {
                            var operation = currentHistory.getInsertOperation('InsertBookmark');
                            operations.push(operation);
                        }
                        else {
                            operations.push(currentHistory.getDeleteOperation(action));
                            if (currentHistory.action === 'RemoveEditRange') {
                                operations.push(currentHistory.getDeleteOperation(action, true));
                            }
                        }
                    }
                }
                break;
            case 'PageBreak':
            case 'ColumnBreak':
                if (this.owner.enableTrackChanges) {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (currentHistory.removedNodes.length > 0) {
                            operations = operations.concat(currentHistory.getDeleteOperationsForTrackChanges());
                        }
                        var markerData = currentHistory.markerData[currentHistory.markerData.length - 1];
                        var operation = currentHistory.getInsertOperation('Enter');
                        var breakOperation = this.getInsertOperation(action);
                        operation.markerData = markerData;
                        breakOperation.markerData =
                            this.owner.editorModule.getMarkerData(undefined, undefined, this.owner.editorModule.getRevision(markerData.revisionId));
                        operations.push(operation);
                        operations.push(breakOperation);
                        operations.push(operation);
                        operation.markerData.skipOperation = true;
                    }
                }
                else {
                    if (this.editorHistory.isUndoing) {
                        for (var i = 0; i < this.modifiedActions.length; i++) {
                            var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                            currentHistory.endIndex = currentHistory.startIndex;
                            //Basically for pagebreak and column break there will three paragraph difference. So for transformation we sended three backspace operation.
                            operations.push(currentHistory.getDeleteOperation('Delete'));
                            operations.push(currentHistory.getDeleteOperation('Delete'));
                            operations.push(currentHistory.getDeleteOperation('Delete'));
                            if (currentHistory.isRemovedNodes) {
                                var operationCollection = currentHistory.getDeleteContent('BackSpace');
                                operations = operations.concat(operationCollection);
                            }
                        }
                    }
                    else {
                        for (var i = 0; i < this.modifiedActions.length; i++) {
                            var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                            if (currentHistory.removedNodes.length > 0) {
                                operations.push(currentHistory.getDeleteOperation(action));
                            }
                        }
                        var operation = this.getInsertOperation('Enter');
                        operation.markerData = { skipOperation: true };
                        //Basically for pagebreak and column break there will three paragraph difference. So for transformation we sended three insert operation.
                        operations.push(operation);
                        operations.push(operation);
                        operations.push(this.getInsertOperation(action));
                        operations.push(operation);
                    }
                }
                break;
            case 'InsertHyperlink':
            case 'AutoFormatHyperlink':
            case 'RemoveHyperlink':
                if (this.editorHistory.isUndoing && action === 'RemoveHyperlink') {
                    var length_1 = 0;
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (currentHistory.action === 'FontColor' || currentHistory.action === 'Underline') {
                            length_1 = currentHistory.endIndex - currentHistory.startIndex;
                        }
                    }
                    if (!isNullOrUndefined(this.modifiedActions[parseInt((this.modifiedActions.length - 1).toString(), 10)].fieldBegin)) {
                        this.modifiedActions[parseInt((this.modifiedActions.length - 1).toString(), 10)].endIndex =
                            this.modifiedActions[parseInt((this.modifiedActions.length - 1).toString(), 10)].startIndex + length_1;
                        var operation = this.modifiedActions[parseInt((this.modifiedActions.length - 1).toString(), 10)].getDeleteOperation('Delete');
                        operation.markerData = undefined;
                        operations.push(operation);
                        var operationCollection = this.modifiedActions[parseInt((this.modifiedActions.length - 1).toString(), 10)].getFieldOperation();
                        operations = operations.concat(operationCollection);
                    }
                }
                else {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (currentHistory.action === 'InsertHyperlink') {
                            operations.push.apply(operations, currentHistory.getActionInfo());
                        }
                        else if (currentHistory.action === 'InsertInline') {
                            if (currentHistory.insertedText === CONTROL_CHARACTERS.Marker_Start ||
                                currentHistory.insertedText === CONTROL_CHARACTERS.Marker_End) {
                                if (this.editorHistory.isUndoing) {
                                    operations.push(currentHistory.getDeleteOperation(currentHistory.action));
                                }
                                else {
                                    operations.push(currentHistory.getInsertOperation('InsertHyperlink'));
                                }
                            }
                            else {
                                if (this.editorHistory.isUndoing) {
                                    operations.push(currentHistory.getDeleteOperation(currentHistory.action));
                                }
                                else {
                                    operations.push(currentHistory.getInsertOperation('Insert'));
                                }
                            }
                        }
                        else if (currentHistory.action === 'Delete') {
                            operations.push(currentHistory.getDeleteOperation(currentHistory.action));
                        }
                        else if (currentHistory.action === 'Underline') {
                            operations = operations.concat(currentHistory.getActionInfo());
                        }
                        else if (currentHistory.action === 'FontColor') {
                            operations = operations.concat(currentHistory.getActionInfo());
                        }
                    }
                    if (this.editorHistory.isUndoing) {
                        operations.reverse();
                    }
                }
                break;
            case 'InsertComment':
                if (this.editorHistory.isUndoing) {
                    this.getDeleteCommentOperation(this.modifiedActions, operations);
                }
                else {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        var operation = currentHistory.getInsertOperation(currentHistory.action);
                        if ((currentHistory.insertedElement instanceof CommentCharacterElementBox && currentHistory.action === 'InsertInline')) {
                            operations.push(currentHistory.getCommentOperation(operation, currentHistory.action));
                        }
                        else if (currentHistory.action === 'InsertCommentWidget') {
                            operation = this.getUpdateOperation();
                            operations.push(currentHistory.getCommentOperation(operation, currentHistory.action));
                        }
                    }
                }
                break;
            case 'RemoveComment':
                if (this.editorHistory.isUndoing) {
                    for (var i = this.modifiedActions.length - 1; i >= 0; i--) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        var operation = undefined;
                        var operationCollection = [];
                        if (currentHistory.action === 'InsertInline' && currentHistory.insertedElement instanceof CommentCharacterElementBox) {
                            operation = currentHistory.getDeleteOperation(currentHistory.action);
                            operationCollection.push(currentHistory.getCommentOperation(operation, 'InsertInline'));
                        }
                        else if (currentHistory.action === 'RemoveInline') {
                            operation = currentHistory.getDeleteOperation(currentHistory.action);
                            operationCollection.push(currentHistory.getCommentOperation(operation, 'InsertInline'));
                            operation = currentHistory.getInsertOperation(currentHistory.action);
                            operationCollection.push(currentHistory.getCommentOperation(operation, 'InsertInline'));
                        }
                        else if (currentHistory.action === 'DeleteComment') {
                            operationCollection = currentHistory.getActionInfo();
                        }
                        else {
                            this.owner.sfdtExportModule.iscontentInsert = false;
                            operationCollection = currentHistory.getActionInfo();
                            this.owner.sfdtExportModule.iscontentInsert = true;
                        }
                        operations = operations.concat(operationCollection);
                    }
                }
                else {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        var operation = undefined;
                        var operationCollection = [];
                        if (currentHistory.action === 'RemoveInline' && currentHistory.removedNodes[0] instanceof CommentCharacterElementBox) {
                            operation = currentHistory.getDeleteOperation(currentHistory.action);
                            operationCollection.push(currentHistory.getCommentOperation(operation, currentHistory.action));
                        }
                        else if (currentHistory.action === 'InsertInline' && currentHistory.insertedElement instanceof CommentCharacterElementBox) {
                            operation = currentHistory.getInsertOperation(currentHistory.action);
                            operationCollection.push(currentHistory.getCommentOperation(operation, currentHistory.action));
                        }
                        else {
                            operationCollection = currentHistory.getActionInfo();
                        }
                        operations = operations.concat(operationCollection);
                    }
                }
                break;
            case 'DeleteComment':
                if (this.editorHistory.isUndoing) {
                    for (var j = this.modifiedActions.length - 1; j >= 0; j--) {
                        var history_1 = this.modifiedActions[parseInt(j.toString(), 10)];
                        var operation = history_1.getInsertOperation(history_1.action);
                        if ((history_1.insertedElement instanceof CommentCharacterElementBox && history_1.action === 'RemoveInline')) {
                            operations.push(history_1.getCommentOperation(operation, 'InsertInline'));
                        }
                        else if (history_1.action === 'DeleteCommentWidget') {
                            operation = this.getUpdateOperation();
                            operations.push(history_1.getCommentOperation(operation, 'InsertCommentWidget'));
                        }
                        else if (history_1.action === 'DeleteComment') {
                            history_1.getActionInfo();
                        }
                    }
                }
                else {
                    this.getDeleteCommentOperation(this.modifiedActions, operations);
                }
                break;
            case 'FormField': {
                var currentHistory = this.modifiedActions.pop();
                operations = currentHistory.getFieldOperation();
                break;
            }
            case 'IMEInput':
                if (isInvertOperation && (!(this.editorHistory.isUndoing || this.editorHistory.isRedoing))) {
                    if (this.modifiedActions[0].removedNodes.length > 0) {
                        var removeOperation = this.modifiedActions[0].getDeleteOperation('Delete');
                        removeOperation.length = removeOperation.text.length;
                        operations.push(removeOperation);
                    }
                    var insertOperation = this.modifiedActions[this.modifiedActions.length - 1].getInsertOperation('Insert');
                    insertOperation.length = insertOperation.text.length;
                    operations.push(insertOperation);
                    operations.reverse();
                    for (var i = 0; i < operations.length; i++) {
                        var operation = operations[parseInt(i.toString(), 10)];
                        if (operation.action === 'Insert') {
                            operation.action = 'Delete';
                        }
                        else if (operation.action === 'Delete') {
                            operation.action = 'Insert';
                        }
                    }
                }
                else {
                    var currentHistory = this.modifiedActions[this.modifiedActions.length - 1];
                    if (this.editorHistory.isUndoing || this.editorHistory.isRedoing) {
                        for (var i = 0; i < this.modifiedActions.length; i++) {
                            currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                            if (currentHistory.removedNodes.length > 0) {
                                operations.push(currentHistory.getDeleteOperation(action));
                            }
                            if (currentHistory.isRemovedNodes) {
                                var operationCollection = currentHistory.getDeleteContent('BackSpace');
                                operations = operations.concat(operationCollection);
                            }
                            currentHistory.isRemovedNodes = false;
                        }
                    }
                    else {
                        if (currentHistory.removedNodes.length > 0) {
                            operations.push(currentHistory.getDeleteOperation(action));
                        }
                        operations.push(currentHistory.getInsertOperation(this.action));
                    }
                    currentHistory.isRemovedNodes = false;
                }
                break;
            case 'Accept All':
            case 'ReplaceAll':
            case 'Reject All': {
                var isSkip = false;
                if (this.editorHistory.isUndoing) {
                    for (var i = this.modifiedActions.length - 1; i >= 0; i--) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (!isNullOrUndefined(currentHistory.cellOperation) && currentHistory.cellOperation.length > 0) {
                            operations.push(currentHistory.cellOperation[0]);
                            isSkip = true;
                            currentHistory.cellOperation = [];
                        }
                        else {
                            var operationsCollection = currentHistory.getActionInfo();
                            operations.push.apply(operations, operationsCollection);
                        }
                    }
                }
                else {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                        if (!isNullOrUndefined(currentHistory.cellOperation) && currentHistory.cellOperation.length > 0) {
                            operations.push(currentHistory.cellOperation[0]);
                            isSkip = true;
                            currentHistory.cellOperation = [];
                        }
                        else {
                            var operationsCollection = currentHistory.getActionInfo();
                            operations.push.apply(operations, operationsCollection);
                        }
                    }
                }
                // if (!isSkip && (action === 'Accept All' || action === 'Reject All')) {
                //     operations.reverse();
                // }
                break;
            }
            case 'Paste':
                for (var i = 0; i < this.modifiedActions.length; i++) {
                    var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                    currentHistory.type = this.type === 'PasteToc' ? this.type : 'Paste';
                    var pasteOperations = currentHistory.getActionInfo();
                    operations.push.apply(operations, pasteOperations);
                }
                break;
            case 'TOC':
                if (this.modifiedActions) {
                    if (this.editorHistory.isUndoing) {
                        for (var i = this.modifiedActions.length - 1; i >= 0; i--) {
                            var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                            currentHistory.type = currentHistory.action === 'Paste' ? 'PasteToc' : undefined;
                            var tocOperations = currentHistory.getActionInfo();
                            operations.push.apply(operations, tocOperations);
                        }
                    }
                    else {
                        for (var i = 0; i < this.modifiedActions.length; i++) {
                            var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                            currentHistory.type = currentHistory.action === 'Paste' ? 'PasteToc' : undefined;
                            var tocOperations = currentHistory.getActionInfo();
                            operations.push.apply(operations, tocOperations);
                        }
                    }
                }
                break;
            case 'DragAndDropContent':
                for (var i = 0; i < this.modifiedActions.length; i++) {
                    var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                    currentHistory.type = currentHistory.action === 'Paste' ? 'Paste' : undefined;
                    var ddcOperations = currentHistory.getActionInfo();
                    operations.push.apply(operations, ddcOperations);
                }
                break;
            case 'ClearFormat':
                if (this.editorHistory.isUndoing) {
                    for (var i = 0; i < this.modifiedActions.length; i++) {
                        operations.push.apply(operations, this.modifiedActions[parseInt(i.toString(), 10)].modifiedFormatOperation);
                        this.modifiedActions[parseInt(i.toString(), 10)].modifiedFormatOperation = [];
                    }
                }
                else {
                    var clearHistory = this.modifiedActions[this.modifiedActions.length - 1];
                    var formatOperation = clearHistory.buildFormatOperation('ClearFormat', true);
                    operations = formatOperation.slice();
                }
                break;
            case 'ApplyStyle': {
                var styleHistory = void 0;
                var formatstyleOperation = [];
                if (this.modifiedActions[0] instanceof HistoryInfo) {
                    var historyInfo = this.modifiedActions[0];
                    styleHistory = historyInfo.modifiedActions[0];
                    formatstyleOperation = styleHistory.buildFormatOperation('ClearFormat', true);
                    operations = formatstyleOperation.slice();
                }
                if (!(this.modifiedActions[this.modifiedActions.length - 1] instanceof HistoryInfo)) {
                    formatstyleOperation = this.modifiedActions[this.modifiedActions.length - 1].buildFormatOperation(action, true);
                    for (var i = 0; i < formatstyleOperation.length; i++) {
                        operations.push(formatstyleOperation[parseInt(i.toString(), 10)]);
                    }
                }
                break;
            }
            case 'TableMarginsSelection':
                this.modifiedActions[this.modifiedActions.length - 1].createTableFormat(this.modifiedActions[this.modifiedActions.length - 1].action);
                this.modifiedActions[this.modifiedActions.length - 1].type = 'TableFormat';
                operations.push(this.modifiedActions[this.modifiedActions.length - 1].getFormatOperation());
                break;
            case 'BordersAndShading':
                if (this.modifiedActions[0].action === 'TableFormat') {
                    this.modifiedActions[0].type = 'TableFormat';
                    this.modifiedActions[0].createTableFormat('BordersAndShading');
                    operations.push(this.modifiedActions[0].getFormatOperation());
                }
                else {
                    this.modifiedActions[0].createCellFormat('BordersAndShading');
                    this.modifiedActions[0].type = 'CellFormat';
                    operations = this.modifiedActions[0].getSelectedCellOperation('BordersAndShading', undefined, true, true, true);
                }
                break;
            case 'AutoList':
                for (var i = 0; i < this.modifiedActions.length; i++) {
                    var currentHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                    var autoListOperations = currentHistory.getActionInfo();
                    operations.push.apply(operations, autoListOperations);
                }
                break;
            case 'TableProperties':
                for (var i = 0; i < this.modifiedActions.length; i++) {
                    var tablePropHistory = this.modifiedActions[parseInt(i.toString(), 10)];
                    if (tablePropHistory.action === 'TableFormat') {
                        tablePropHistory.createTableFormat(tablePropHistory.action);
                        tablePropHistory.type = 'TableFormat';
                        operations.push(tablePropHistory.getFormatOperation());
                    }
                    else if (tablePropHistory.action === 'RowFormat') {
                        if (this.editorHistory.isUndoing || this.editorHistory.isRedoing &&
                            tablePropHistory.modifiedProperties.length > 1) {
                            operations = tablePropHistory.modifiedFormatOperation;
                            tablePropHistory.modifiedFormatOperation = [];
                        }
                        else {
                            tablePropHistory.createRowFormat(tablePropHistory.action);
                            tablePropHistory.type = 'RowFormat';
                            operations.push(tablePropHistory.getFormatOperation());
                        }
                    }
                    else if (tablePropHistory.action === 'CellFormat') {
                        tablePropHistory.createCellFormat(tablePropHistory.action);
                        tablePropHistory.type = 'CellFormat';
                        var cellProp = tablePropHistory.getSelectedCellOperation(tablePropHistory.action, false, false, false, true);
                        for (var i_1 = 0; i_1 < cellProp.length; i_1++) {
                            operations.push(cellProp[parseInt(i_1.toString(), 10)]);
                        }
                    }
                }
                break;
            case 'CellMarginsSelection':
                this.modifiedActions[this.modifiedActions.length - 1].createCellFormat('CellOptions');
                this.modifiedActions[this.modifiedActions.length - 1].type = 'CellFormat';
                operations = this.modifiedActions[this.modifiedActions.length - 1].getSelectedCellOperation('CellOptions', false, false, false, true).slice();
                break;
        }
        return operations;
    };
    HistoryInfo.prototype.revert = function () {
        this.editorHistory.currentHistoryInfo = this;
        if (this.action === 'BordersAndShading') {
            this.owner.editorModule.isBordersAndShadingDialog = true;
        }
        if (!isNullOrUndefined(this.modifiedActions)) {
            if (this.editorHistory.isUndoing) {
                var i = this.modifiedActions.length;
                while (i > 0) {
                    var baseHistoryInfo = this.modifiedActions[i - 1];
                    baseHistoryInfo.revert();
                    i = i - 1;
                }
            }
            else {
                var i = 0;
                while (i < this.modifiedActions.length) {
                    var baseHistoryInfo = this.modifiedActions[parseInt(i.toString(), 10)];
                    baseHistoryInfo.revert();
                    i = i + 1;
                }
            }
        }
        if (this.action === 'RestrictEditing') {
            var user = this.editRangeStart.user !== '' ? this.editRangeStart.user : this.editRangeStart.group;
            if (this.editorHistory.isUndoing) {
                var index = this.owner.documentHelper.editRanges.get(user).indexOf(this.editRangeStart);
                if (index !== -1) {
                    this.owner.documentHelper.editRanges.get(user).splice(index, 1);
                }
            }
            else {
                this.owner.editorModule.updateRangeCollection(this.editRangeStart, user);
            }
            this.owner.selectionModule.updateEditRangeCollection();
        }
        if (!this.isChildHistoryInfo) {
            this.editorHistory.updateComplexHistory();
        }
        else {
            this.editorHistory.updateComplexHistoryInternal();
        }
    };
    HistoryInfo.prototype.destroy = function () {
        if (!isNullOrUndefined(this.modifiedActions)) {
            while (this.modifiedActions.length > 0) {
                var baseHistoryInfo = this.modifiedActions[this.modifiedActions.length - 1];
                baseHistoryInfo.destroy();
                this.modifiedActions.splice(this.modifiedActions.indexOf(baseHistoryInfo), 1);
            }
            this.modifiedActions = undefined;
        }
        _super.prototype.destroy.call(this);
    };
    return HistoryInfo;
}(BaseHistoryInfo));
export { HistoryInfo };
