/* eslint-disable */
import { createElement, L10n, classList, isNullOrUndefined } from '@syncfusion/ej2-base';
import { CommentCharacterElementBox } from '../../implementation/viewer/page';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { Button } from '@syncfusion/ej2-buttons';
import { Toolbar, Tab } from '@syncfusion/ej2-navigations';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { Dictionary, beforeCommentActionEvent, commentEndEvent, commentBeginEvent, commentDeleteEvent } from '../../base/index';
import { HelperMethods } from '../editor/editor-helper';
import { Mention } from '@syncfusion/ej2-dropdowns';
/**
 * @private
 */
var CommentReviewPane = /** @class */ (function () {
    function CommentReviewPane(owner) {
        var _this = this;
        this.isNewComment = false;
        this.isUserClosed = false;
        /**
         * @private
         */
        this.postReply = false;
        /**
         * @private
         */
        this.selectedTab = 0;
        /**
         * @param {SelectEventArgs} arg - Specify the selection event args.
         * @returns {void}
         */
        this.onTabSelection = function (arg) {
            arg.preventFocus = true;
            _this.selectedTab = arg.selectedIndex;
            if (_this.selectedTab === 1) {
                _this.owner.trackChangesPane.updateHeight();
            }
            else {
                _this.commentPane.updateHeight();
            }
            setTimeout(function () {
                if (_this.owner) {
                    _this.owner.resize();
                }
            }, 10);
        };
        this.owner = owner;
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        this.initReviewPane(localObj);
        this.parentPaneElement.style.display = 'none';
    }
    Object.defineProperty(CommentReviewPane.prototype, "previousSelectedComment", {
        get: function () {
            return this.previousSelectedCommentInt;
        },
        set: function (value) {
            if (!isNullOrUndefined(value) && value !== this.previousSelectedCommentInt) {
                if (this.commentPane.comments.containsKey(value)) {
                    var commentStart = this.commentPane.getCommentStart(value);
                    var commentMark = commentStart.commentMark;
                    if (commentMark) {
                        classList(commentMark, [], ['e-de-cmt-mark-selected']);
                        this.commentPane.removeSelectionMark('e-de-cmt-selection');
                        this.commentPane.removeSelectionMark('e-de-cmt-mark-selected');
                    }
                    var commentView = this.commentPane.comments.get(value);
                    commentView.hideDrawer();
                    for (var i = 0; i < value.replyComments.length; i++) {
                        commentView = this.commentPane.comments.get(value.replyComments[i]);
                        if (commentView) {
                            commentView.hideDrawer();
                            commentView.hideMenuItems();
                        }
                    }
                }
            }
            this.previousSelectedCommentInt = value;
        },
        enumerable: true,
        configurable: true
    });
    CommentReviewPane.prototype.selectReviewTab = function (tab) {
        if (tab === 'Changes') {
            this.reviewTab.select(1);
        }
        else {
            this.reviewTab.select(0);
        }
    };
    CommentReviewPane.prototype.showHidePane = function (show, tab) {
        if (this.parentPaneElement) {
            this.updateTabHeaderWidth();
            if (show) {
                this.parentPaneElement.style.display = 'block';
                if (tab === 'Changes' && this.owner.showRevisions) {
                    this.isCommentTabVisible = false;
                    this.owner.notify('reviewPane', { comment: this.isCommentTabVisible, changes: true });
                    this.reviewTab.select(1);
                }
                else {
                    this.owner.trackChangesPane.isChangesTabVisible = false;
                    this.owner.notify('reviewPane', { comment: true, changes: this.owner.trackChangesPane.isChangesTabVisible, isUserClosed: false });
                    this.reviewTab.select(0);
                }
                this.owner.trackChangesPane.updateTrackChanges(this.owner.showRevisions);
                this.commentPane.updateCommentStatus();
            }
            else {
                this.parentPaneElement.style.display = 'none';
            }
            if (!this.owner.showRevisions) {
                this.owner.trackChangesPane.isChangesTabVisible = false;
                this.owner.notify('reviewPane', { comment: this.isCommentTabVisible, changes: this.owner.trackChangesPane.isChangesTabVisible });
                this.reviewTab.hideTab(1, true);
            }
            if (!this.owner.showComments) {
                this.isCommentTabVisible = false;
                this.owner.notify('reviewPane', { comment: this.isCommentTabVisible, changes: this.owner.trackChangesPane.isChangesTabVisible });
                this.reviewTab.hideTab(0, true);
            }
        }
        if (show) {
            this.enableDisableItems();
            this.commentPane.updateHeight();
        }
        if (this.owner) {
            this.owner.resize();
            if (this.owner.enableAutoFocus) {
                this.owner.documentHelper.updateFocus();
            }
        }
    };
    CommentReviewPane.prototype.reviewPaneHelper = function (args) {
        var _this = this;
        if (!isNullOrUndefined(args.isUserClosed)) {
            if (args.isUserClosed !== this.isUserClosed) {
                this.isUserClosed = args.isUserClosed;
                if (this.owner) {
                    setTimeout(function () {
                        if (_this.owner) {
                            _this.owner.resize();
                        }
                    }, 10);
                }
            }
            else {
                return;
            }
        }
        else {
            if (this.isUserClosed) {
                return;
            }
        }
        if (!isNullOrUndefined(args.comment) || !isNullOrUndefined(args.changes)) {
            if ((args.comment || args.changes)) {
                if (this.parentPaneElement.style.display === 'none') {
                    this.parentPaneElement.style.display = 'block';
                }
                if (this.owner) {
                    setTimeout(function () {
                        if (_this.owner) {
                            _this.owner.resize();
                        }
                    }, 10);
                }
            }
            else {
                this.parentPaneElement.style.display = 'none';
                if (this.owner) {
                    setTimeout(function () {
                        if (_this.owner) {
                            _this.owner.resize();
                        }
                    }, 10);
                }
            }
        }
    };
    CommentReviewPane.prototype.updateTabHeaderWidth = function () {
        var reviewTabsEle = this.reviewTab.getRootElement().getElementsByClassName('e-tab-wrap');
        reviewTabsEle[0].style.padding = '0 8px';
        reviewTabsEle[1].style.padding = '0 8px';
    };
    CommentReviewPane.prototype.initReviewPane = function (localValue) {
        var reviewContainer = this.owner.documentHelper.optionsPaneContainer;
        reviewContainer.style.display = 'flex';
        this.initPaneHeader(localValue);
        reviewContainer.appendChild(this.addReviewTab(localValue));
        this.initCommentPane();
        this.owner.on('reviewPane', this.reviewPaneHelper, this);
    };
    CommentReviewPane.prototype.addReviewTab = function (localValue) {
        var commentHeader = createElement('div', { innerHTML: localValue.getConstant('Comments') });
        var changesHeader = createElement('div', { innerHTML: localValue.getConstant('Changes') });
        this.parentPaneElement = createElement('div', { styles: 'height:100%;overflow:auto;display:none', className: 'e-de-review-pane' });
        this.element = createElement('div', { className: 'e-de-property-tab', id: this.owner.element.id + 'Review_Tab' });
        var items = [{ header: { text: commentHeader }, content: this.reviewPane }, { header: { text: changesHeader } }];
        this.reviewTab = new Tab({ items: items, selected: this.onTabSelection, animation: { previous: { effect: 'None' }, next: { effect: 'None' } } });
        this.reviewTab.appendTo(this.element);
        if (this.owner.enableRtl) {
            this.reviewTab.enableRtl = true;
        }
        this.reviewTab.enablePersistence = true;
        this.parentPaneElement.appendChild(this.element);
        return this.parentPaneElement;
    };
    CommentReviewPane.prototype.initPaneHeader = function (localValue) {
        this.headerContainer = createElement('div');
        this.reviewPane = createElement('div', { className: 'e-de-cmt-pane' });
        if (this.owner.enableRtl) {
            classList(this.reviewPane, ['e-rtl'], []);
        }
        this.headerContainer.appendChild(this.initToolbar(localValue));
        this.reviewPane.appendChild(this.headerContainer);
        this.reviewPane.style.display = 'block';
        return this.reviewPane;
    };
    CommentReviewPane.prototype.closePane = function () {
        if (this.commentPane && this.commentPane.isEditMode) {
            if (!isNullOrUndefined(this.commentPane.currentEditingComment)
                && this.commentPane.isInsertingReply && this.commentPane.currentEditingComment.replyViewTextBox.innerText === '') {
                this.owner.documentHelper.currentSelectedComment = undefined;
                this.commentPane.currentEditingComment.cancelReply();
                this.owner.showComments = false;
            }
            else if (this.isNewComment || !isNullOrUndefined(this.commentPane.currentEditingComment)
                && this.commentPane.isInsertingReply && this.commentPane.currentEditingComment.replyViewTextBox.innerText !== '' ||
                !isNullOrUndefined(this.commentPane.currentEditingComment) && !this.commentPane.isInsertingReply &&
                    this.commentPane.currentEditingComment.textArea.innerText !== this.commentPane.currentEditingComment.comment.text) {
                var localObj = new L10n('documenteditor', this.owner.defaultLocale);
                localObj.setLocale(this.owner.locale);
                this.confirmDialog = DialogUtility.confirm({
                    title: localObj.getConstant('Un-posted comments'),
                    content: localObj.getConstant('Discard Comment'),
                    okButton: {
                        text: localObj.getConstant('Discard'), click: this.discardButtonClick.bind(this)
                    },
                    cancelButton: {
                        text: localObj.getConstant('Cancel'), click: this.closeDialogUtils.bind(this)
                    },
                    showCloseIcon: true,
                    closeOnEscape: true,
                    animationSettings: { effect: 'Zoom' },
                    position: { X: 'center', Y: 'center' }
                });
            }
            else {
                this.owner.documentHelper.currentSelectedComment = undefined;
                this.commentPane.currentEditingComment.cancelEditing();
                this.owner.showComments = false;
            }
        }
        else {
            this.owner.showComments = false;
            //this.owner.showRevisions = false;
            this.owner.documentHelper.currentSelectedComment = undefined;
            this.owner.documentHelper.currentSelectedRevision = undefined;
            this.owner.notify('reviewPane', { changes: false, comment: false, isUserClosed: true });
        }
    };
    CommentReviewPane.prototype.discardButtonClick = function () {
        if (this.commentPane.currentEditingComment) {
            var isNewComment = this.isNewComment;
            if (this.commentPane.currentEditingComment && this.commentPane.isInsertingReply) {
                this.commentPane.currentEditingComment.cancelReply();
            }
            else {
                this.commentPane.currentEditingComment.cancelEditing();
            }
            this.owner.documentHelper.currentSelectedComment = undefined;
            this.closeDialogUtils();
            this.owner.showComments = false;
        }
    };
    CommentReviewPane.prototype.closeDialogUtils = function () {
        this.confirmDialog.close();
        this.confirmDialog = undefined;
    };
    CommentReviewPane.prototype.initToolbar = function (localValue) {
        this.toolbarElement = createElement('div');
        this.toolbar = new Toolbar({
            items: [
                {
                    prefixIcon: 'e-de-new-cmt e-de-cmt-tbr', tooltipText: localValue.getConstant('New Comment'),
                    text: localValue.getConstant('New Comment'), click: this.insertComment.bind(this)
                },
                {
                    prefixIcon: 'e-de-nav-left-arrow e-de-cmt-tbr', align: 'Right',
                    tooltipText: localValue.getConstant('Previous Comment'), click: this.navigatePreviousComment.bind(this)
                },
                {
                    prefixIcon: 'e-de-nav-right-arrow e-de-cmt-tbr', align: 'Right',
                    tooltipText: localValue.getConstant('Next Comment'), click: this.navigateNextComment.bind(this)
                }
            ],
            enableRtl: this.owner.enableRtl
        });
        this.toolbar.appendTo(this.toolbarElement);
        return this.toolbarElement;
    };
    CommentReviewPane.prototype.insertComment = function () {
        if (this.owner && this.owner.editorModule) {
            this.owner.editorModule.isUserInsert = true;
            this.owner.editorModule.insertComment('');
            this.owner.editorModule.isUserInsert = false;
        }
    };
    CommentReviewPane.prototype.addComment = function (comment, isNewComment, selectComment) {
        this.isNewComment = isNewComment;
        this.owner.documentHelper.currentSelectedComment = comment;
        this.commentPane.insertComment(comment);
        this.selectReviewTab('Comments');
        if (!isNewComment) {
            var commentView = this.commentPane.comments.get(comment);
            commentView.cancelEditing();
            this.enableDisableToolbarItem();
        }
        if (selectComment) {
            this.selectComment(comment);
        }
    };
    CommentReviewPane.prototype.deleteComment = function (comment) {
        if (this.commentPane) {
            this.commentPane.deleteComment(comment);
        }
    };
    CommentReviewPane.prototype.selectComment = function (comment) {
        if (this.commentPane.isEditMode) {
            return;
        }
        if (comment.isReply) {
            comment = comment.ownerComment;
        }
        if (this.owner && this.owner.viewer && this.owner.documentHelper.currentSelectedComment !== comment) {
            this.owner.documentHelper.currentSelectedComment = comment;
        }
        this.commentPane.selectComment(comment);
    };
    CommentReviewPane.prototype.resolveComment = function (comment) {
        this.commentPane.resolveComment(comment);
    };
    CommentReviewPane.prototype.reopenComment = function (comment) {
        this.commentPane.reopenComment(comment);
    };
    CommentReviewPane.prototype.addReply = function (comment, newComment, selectComment) {
        this.isNewComment = newComment;
        this.postReply = true;
        this.commentPane.insertReply(comment);
        this.postReply = false;
        if (!newComment) {
            var commentView = this.commentPane.comments.get(comment);
            commentView.cancelEditing();
            this.enableDisableToolbarItem();
        }
        if (selectComment) {
            this.selectComment(comment.ownerComment);
        }
    };
    CommentReviewPane.prototype.navigatePreviousComment = function () {
        if (this.owner && this.owner.editorModule) {
            this.owner.selectionModule.navigatePreviousComment();
        }
    };
    CommentReviewPane.prototype.navigateNextComment = function () {
        if (this.owner && this.owner.editorModule) {
            this.owner.selectionModule.navigateNextComment();
        }
    };
    CommentReviewPane.prototype.enableDisableItems = function () {
        this.enableDisableToolbarItem();
        var keys = this.commentPane.comments.keys;
        for (var i = 0; i < keys.length; i++) {
            var commentView = this.commentPane.comments.get(keys[i]);
            if (this.owner.isReadOnly) {
                if (!isNullOrUndefined(commentView.replyViewTextBox)) {
                    commentView.replyViewTextBox.style.display = 'none';
                }
                commentView.menuBar.style.display = 'none';
                if (commentView.resolveView) {
                    commentView.resolveView.style.display = 'none';
                }
            }
            else {
                if (!isNullOrUndefined(commentView.replyViewTextBox)) {
                    commentView.replyViewTextBox.style.display = 'block';
                }
                commentView.menuBar.style.display = 'block';
                if (commentView.resolveView) {
                    commentView.resolveView.style.display = '';
                }
            }
        }
    };
    CommentReviewPane.prototype.enableDisableToolbarItem = function () {
        if (this.toolbar) {
            var enable = true;
            if (this.commentPane.isEditMode) {
                enable = !this.commentPane.isEditMode;
            }
            if (this.owner.isReadOnly) {
                enable = !this.owner.isReadOnly;
            }
            var elements = this.toolbar.element.querySelectorAll('.' + 'e-de-cmt-tbr');
            this.toolbar.enableItems(elements[0].parentElement.parentElement, enable);
            if (enable && this.owner && this.owner.viewer) {
                enable = !(this.owner.documentHelper.comments.length === 0);
            }
            this.toolbar.enableItems(elements[1].parentElement.parentElement, enable);
            this.toolbar.enableItems(elements[2].parentElement.parentElement, enable);
        }
    };
    CommentReviewPane.prototype.initCommentPane = function () {
        this.commentPane = new CommentPane(this.owner, this);
        this.commentPane.initCommentPane();
    };
    CommentReviewPane.prototype.layoutComments = function (commentCollection) {
        for (var i = 0; i < commentCollection.length; i++) {
            var comment = commentCollection[i];
            if (this.isUnreferredComment(comment)) {
                commentCollection.splice(i, 1);
                i--;
                continue;
            }
            for (var j = 0; j < comment.replyComments.length; j++) {
                if (this.isUnreferredComment(comment.replyComments[j])) {
                    comment.replyComments.splice(j, 1);
                    j--;
                }
            }
            this.commentPane.addComment(comment);
        }
    };
    CommentReviewPane.prototype.isUnreferredComment = function (comment) {
        if (isNullOrUndefined(comment.commentStart)
            || isNullOrUndefined(comment.commentEnd)) {
            return true;
        }
        return false;
    };
    CommentReviewPane.prototype.clear = function () {
        this.previousSelectedCommentInt = undefined;
        this.isNewComment = false;
        this.isUserClosed = false;
        this.isNewComment = false;
        this.commentPane.clear();
    };
    CommentReviewPane.prototype.discardComment = function (comment) {
        if (comment) {
            if (this.owner.editorHistoryModule) {
                if (this.owner.editorHistoryModule.undoStack.length > 0
                    && this.owner.editorHistoryModule.undoStack[this.owner.editorHistoryModule.undoStack.length - 1].action === 'InsertComment') {
                    this.owner.editorHistoryModule.undo();
                    this.owner.editorHistoryModule.redoStack.pop();
                }
                this.owner.editorModule.isSkipOperationsBuild = this.owner.enableCollaborativeEditing;
                this.owner.editorModule.deleteCommentInternal(comment);
                this.owner.editorModule.isSkipOperationsBuild = false;
            }
            else if (this.owner.editorModule) {
                this.owner.editorModule.deleteCommentInternal(comment);
            }
        }
    };
    CommentReviewPane.prototype.destroy = function () {
        if (this.commentPane) {
            this.commentPane.destroy();
        }
        this.commentPane = undefined;
        if (this.toolbar) {
            this.toolbar.destroy();
        }
        this.toolbar = undefined;
        if (this.toolbarElement && this.toolbarElement.parentElement) {
            this.toolbarElement.parentElement.removeChild(this.toolbarElement);
        }
        this.toolbarElement = undefined;
        if (this.headerContainer && this.headerContainer.parentElement) {
            this.headerContainer.parentElement.removeChild(this.headerContainer);
        }
        this.headerContainer = undefined;
        this.previousSelectedCommentInt = undefined;
        if (this.reviewPane && this.reviewPane.parentElement) {
            this.reviewPane.parentElement.removeChild(this.reviewPane);
        }
        if (!this.owner.isDestroyed) {
            this.owner.off('reviewPane', this.reviewPaneHelper);
        }
        if (!isNullOrUndefined(this.reviewTab)) {
            this.reviewTab.destroy();
        }
        this.reviewTab = undefined;
        if (!isNullOrUndefined(this.confirmDialog)) {
            this.confirmDialog.destroy();
        }
        this.confirmDialog = undefined;
        if (!isNullOrUndefined(this.previousSelectedCommentInt)) {
            this.previousSelectedCommentInt.destroy();
        }
        this.previousSelectedCommentInt = undefined;
        if (this.reviewPane) {
            this.reviewPane.innerHTML = '';
            if (this.reviewPane.parentElement) {
                this.reviewPane.parentElement.removeChild(this.reviewPane);
            }
        }
        this.reviewPane = undefined;
        if (this.parentPaneElement) {
            this.parentPaneElement.innerHTML = '';
            if (this.parentPaneElement.parentElement) {
                this.parentPaneElement.parentElement.removeChild(this.parentPaneElement);
            }
        }
        this.parentPaneElement = undefined;
        this.owner = undefined;
    };
    return CommentReviewPane;
}());
export { CommentReviewPane };
/**
 * @private
 */
var CommentPane = /** @class */ (function () {
    function CommentPane(owner, pane) {
        this.isEditModeInternal = false;
        this.isInsertingReply = false;
        this.owner = owner;
        this.parentPane = pane;
        this.parent = pane.reviewPane;
        this.comments = new Dictionary();
    }
    Object.defineProperty(CommentPane.prototype, "isEditMode", {
        get: function () {
            return this.isEditModeInternal;
        },
        set: function (value) {
            this.isEditModeInternal = value;
            var keys = this.comments.keys;
            for (var i = 0; i < keys.length; i++) {
                var commentView = this.comments.get(keys[i]);
                if (value) {
                    commentView.menuBar.style.display = 'none';
                }
                else if (!commentView.comment.isReply) {
                    commentView.menuBar.style.display = 'block';
                }
            }
            if (this.parentPane) {
                this.parentPane.enableDisableToolbarItem();
            }
            if (this.owner) {
                if (this.isEditModeInternal) {
                    this.owner.trigger(commentBeginEvent);
                }
                else {
                    this.owner.trigger(commentEndEvent);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    CommentPane.prototype.initCommentPane = function () {
        this.commentPane = createElement('div', { className: 'e-de-cmt-container e-de-scrollbar-hide' });
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        this.noCommentIndicator = createElement('div', {
            className: 'e-de-cmt-no-cmt',
            innerHTML: localObj.getConstant('No comments in this document')
        });
        this.commentPane.appendChild(this.noCommentIndicator);
        this.parent.appendChild(this.commentPane);
    };
    CommentPane.prototype.addComment = function (comment) {
        var commentView = new CommentView(this.owner, this, comment);
        var commentParent = commentView.layoutComment(false);
        this.comments.add(comment, commentView);
        this.commentPane.appendChild(commentParent);
        for (var i = 0; i < comment.replyComments.length; i++) {
            var replyView = new CommentView(this.owner, this, comment.replyComments[i]);
            this.comments.add(comment.replyComments[i], replyView);
            commentParent.insertBefore(replyView.layoutComment(true), commentView.replyViewContainer);
        }
        this.updateCommentStatus();
        commentView.hideDrawer();
    };
    CommentPane.prototype.updateHeight = function () {
        var tabHeaderHeight = this.parentPane.reviewTab.getRootElement().getElementsByClassName('e-tab-header')[0].getBoundingClientRect().height;
        this.commentPane.style.height = this.parentPane.parentPaneElement.clientHeight - this.parentPane.headerContainer.clientHeight - tabHeaderHeight + 'px';
    };
    CommentPane.prototype.insertReply = function (replyComment) {
        var parentComment = replyComment.ownerComment;
        var parentView = this.comments.get(parentComment);
        var replyView = new CommentView(this.owner, this, replyComment);
        this.comments.add(replyComment, replyView);
        var replyElement = replyView.layoutComment(true);
        var replyIndex = parentComment.replyComments.indexOf(replyComment);
        if (replyIndex === parentComment.replyComments.length - 1) {
            parentView.parentElement.insertBefore(replyElement, parentView.replyViewContainer);
        }
        else {
            var nextReply = parentComment.replyComments[replyIndex + 1];
            parentView.parentElement.insertBefore(replyElement, this.comments.get(nextReply).parentElement);
        }
        replyView.editComment();
    };
    CommentPane.prototype.insertComment = function (comment) {
        var commentView = new CommentView(this.owner, this, comment);
        var commentParent = commentView.layoutComment(false);
        this.comments.add(comment, commentView);
        if (this.owner.documentHelper.comments.indexOf(comment) === this.owner.documentHelper.comments.length - 1) {
            this.commentPane.appendChild(commentParent);
        }
        else {
            var index = this.owner.documentHelper.comments.indexOf(comment);
            var element = this.comments.get(this.owner.documentHelper.comments[index + 1]).parentElement;
            this.commentPane.insertBefore(commentParent, element);
            commentParent.focus();
        }
        this.updateCommentStatus();
        commentView.editComment();
    };
    CommentPane.prototype.removeSelectionMark = function (className) {
        if (this.parent) {
            var elements = this.parent.getElementsByClassName(className);
            for (var i = 0; i < elements.length; i++) {
                classList(elements[i], [], [className]);
            }
        }
    };
    CommentPane.prototype.selectComment = function (comment) {
        this.removeSelectionMark('e-de-cmt-selection');
        if (comment.isReply) {
            comment = comment.ownerComment;
        }
        if (comment) {
            this.owner.notify('reviewPane', { comment: true, changes: this.owner.trackChangesPane.isChangesTabVisible });
            var commentView = this.comments.get(comment);
            var selectedElement = commentView.parentElement;
            if (selectedElement) {
                classList(selectedElement, ['e-de-cmt-selection'], []);
                selectedElement.focus();
            }
            var commentStart = this.getCommentStart(comment);
            if (!commentStart.commentMark) {
                commentStart.renderCommentMark();
            }
            classList(commentStart.commentMark, ['e-de-cmt-mark-selected'], []);
            commentView.showDrawer();
        }
    };
    CommentPane.prototype.getCommentStart = function (comment) {
        var localValue = new L10n('documenteditor', this.owner.defaultLocale);
        localValue.setLocale(this.owner.locale);
        var commentStart = undefined;
        if (comment && comment.commentStart) {
            commentStart = comment.commentStart;
        }
        if (commentStart.commentMark !== undefined) {
            commentStart.commentMark.title = localValue.getConstant('Click to see this comment');
        }
        return this.getFirstCommentInLine(commentStart);
    };
    CommentPane.prototype.getFirstCommentInLine = function (commentStart) {
        for (var i = 0; i < commentStart.line.children.length; i++) {
            var startComment = commentStart.line.children[i];
            if (startComment instanceof CommentCharacterElementBox && startComment.commentType === 0) {
                return startComment;
            }
        }
        return commentStart;
    };
    CommentPane.prototype.deleteComment = function (comment) {
        var commentView = this.comments.get(comment);
        if (!isNullOrUndefined(commentView)) {
            if (!isNullOrUndefined(this.currentEditingComment)
                && commentView.comment.commentId == this.currentEditingComment.comment.commentId) {
                this.isEditMode = false;
                this.currentEditingComment = undefined;
            }
            if (commentView.parentElement && commentView.parentElement.parentElement) {
                commentView.parentElement.parentElement.removeChild(commentView.parentElement);
            }
            //this.commentPane.removeChild();
            for (var i = 0; i < comment.replyComments.length; i++) {
                var replyCmt = comment.replyComments[i];
                if (this.comments.containsKey(replyCmt)) {
                    this.comments.remove(replyCmt);
                }
            }
            this.comments.remove(comment);
            commentView.destroy();
        }
        this.updateCommentStatus();
    };
    CommentPane.prototype.resolveComment = function (comment) {
        var commentView = this.comments.get(comment);
        if (commentView) {
            commentView.resolveComment();
        }
    };
    CommentPane.prototype.reopenComment = function (comment) {
        var commentView = this.comments.get(comment);
        if (commentView) {
            commentView.reopenComment();
        }
    };
    CommentPane.prototype.updateCommentStatus = function () {
        if (this.owner.documentHelper.comments.length === 0) {
            if (!this.noCommentIndicator.parentElement) {
                this.commentPane.appendChild(this.noCommentIndicator);
            }
            this.noCommentIndicator.style.display = 'block';
            this.parentPane.isCommentTabVisible = false;
            this.owner.notify('reviewPane', { comment: false, changes: this.owner.trackChangesPane.isChangesTabVisible });
            this.parentPane.reviewTab.hideTab(0);
        }
        else if (this.owner.showComments) {
            this.parentPane.isCommentTabVisible = true;
            this.noCommentIndicator.style.display = 'none';
            this.owner.notify('reviewPane', { comment: true, changes: this.owner.trackChangesPane.isChangesTabVisible });
            this.parentPane.reviewTab.hideTab(0, false);
        }
        if (this.parentPane) {
            this.parentPane.enableDisableToolbarItem();
        }
    };
    CommentPane.prototype.clear = function () {
        this.isEditMode = false;
        this.currentEditingComment = undefined;
        this.isInsertingReply = false;
        this.removeChildElements();
        this.commentPane.innerHTML = '';
        this.updateCommentStatus();
    };
    CommentPane.prototype.removeChildElements = function () {
        var comments = this.comments.keys;
        for (var i = 0; i < comments.length; i++) {
            this.comments.get(comments[i]).destroy();
        }
        this.comments.clear();
    };
    CommentPane.prototype.destroy = function () {
        this.removeChildElements();
        if (this.noCommentIndicator && this.noCommentIndicator) {
            this.noCommentIndicator.parentElement.removeChild(this.noCommentIndicator);
        }
        this.noCommentIndicator = undefined;
        if (this.commentPane) {
            this.commentPane.innerHTML = '';
            if (this.commentPane.parentElement) {
                this.commentPane.parentElement.removeChild(this.commentPane);
            }
        }
        this.commentPane = undefined;
        if (this.parent) {
            this.parent.innerHTML = '';
            if (this.parent.parentElement) {
                this.parent.parentElement.removeChild(this.parent);
            }
        }
        this.parent = undefined;
        this.parentPane = undefined;
        this.currentEditingComment = undefined;
        this.owner = undefined;
    };
    return CommentPane;
}());
export { CommentPane };
/**
 * @private
 */
var CommentView = /** @class */ (function () {
    function CommentView(owner, commentPane, comment) {
        this.isReply = false;
        this.isDrawerExpand = false;
        this.itemData = [];
        this.owner = owner;
        this.comment = comment;
        this.commentPane = commentPane;
    }
    CommentView.prototype.layoutComment = function (isReply) {
        this.isReply = isReply;
        var classList = 'e-de-cmt-sub-container';
        if (isReply) {
            classList += ' e-de-cmt-reply';
        }
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        this.parentElement = createElement('div', { className: classList });
        this.initCommentHeader(localObj);
        this.initCommentView(localObj);
        this.initDateView();
        if (!this.comment.isReply) {
            this.parentElement.tabIndex = 0;
            this.initReplyView(localObj);
            this.initResolveOption(localObj);
            this.initDrawer();
            if (this.comment.isResolved) {
                this.resolveComment();
            }
        }
        else {
            this.menuBar.style.display = 'none';
        }
        this.commentView.addEventListener('mouseenter', this.showMenuItems.bind(this));
        this.commentView.addEventListener('mouseleave', this.hideMenuItemOnMouseLeave.bind(this));
        return this.parentElement;
    };
    CommentView.prototype.initCommentHeader = function (localObj) {
        var commentDiv = createElement('div', { className: 'e-de-cmt-view' });
        this.resolveDiv = createElement('div', { className: 'e-de-cmt-view' });
        var wrapperDiv = createElement('div', { className: 'e-de-cmt-view' });
        var roundIcon = createElement('div', { className: 'e-de-resolve-mark' });
        var span = createElement('span', { className: 'e-de e-icons e-check' });
        var resolveText = createElement('span', { className: '' });
        resolveText.innerHTML = "Resolved";
        span.style.display = 'inline-block';
        roundIcon.style.display = 'flex';
        roundIcon.style.justifyContent = 'center';
        roundIcon.style.alignItems = 'center';
        roundIcon.style.width = "20px";
        roundIcon.style.height = "20px";
        roundIcon.style.borderRadius = "100%";
        roundIcon.style.marginRight = "6px";
        roundIcon.appendChild(span);
        wrapperDiv.appendChild(roundIcon);
        wrapperDiv.appendChild(resolveText);
        this.resolveDiv.appendChild(wrapperDiv);
        wrapperDiv.style.display = "flex";
        wrapperDiv.style.justifyContent = "center";
        wrapperDiv.style.alignItems = "center";
        this.resolveDiv.style.display = "none";
        var commentUserInfo = createElement('div', { className: 'e-de-cmt-author' });
        commentUserInfo.style.marginTop = "8px";
        var userName = createElement('div', { className: 'e-de-cmt-author-name' });
        userName.textContent = this.comment.author;
        if (!isNullOrUndefined(this.comment.author)) {
            commentUserInfo.style.display = 'flex';
            this.owner.documentHelper.getAvatar(commentUserInfo, userName, this.comment, undefined);
        }
        // commentUserInfo.appendChild(this.resolveDiv);
        //if (this.comment.author === this.owner.currentUser) {
        this.menuBar = createElement('button', { className: 'e-de-cp-option', attrs: { type: 'button' } });
        var userOption = [{ text: localObj.getConstant('Edit') },
            { text: localObj.getConstant('Delete') },
            { text: localObj.getConstant('Reply') },
            { text: localObj.getConstant('Resolve') }];
        var menuItem = new DropDownButton({
            items: this.isReply ? userOption.splice(0, 2) : userOption,
            select: this.userOptionSelectEvent.bind(this),
            iconCss: 'e-de-menu-icon',
            cssClass: 'e-caret-hide',
            enableRtl: this.owner.enableRtl
        });
        this.menuBar.title = localObj.getConstant('More Options') + '...';
        menuItem.appendTo(this.menuBar);
        commentUserInfo.appendChild(this.menuBar);
        this.dropDownButton = menuItem;
        commentDiv.appendChild(commentUserInfo);
        this.commentView = commentDiv;
        this.parentElement.appendChild(commentDiv);
        commentDiv.addEventListener('click', this.selectComment.bind(this));
    };
    CommentView.prototype.selectComment = function () {
        if (this.commentPane) {
            if (!this.commentPane.isEditMode) {
                this.owner.selectionModule.selectComment(this.comment);
            }
            else if (this.commentPane.isEditMode && this.commentPane.isInsertingReply
                && this.commentPane.currentEditingComment && this.commentPane.currentEditingComment.replyViewTextBox.innerText === '') {
                var comment = this.comment;
                if (comment && comment.isReply) {
                    comment = this.comment.ownerComment;
                }
                if (comment && this.owner.documentHelper.currentSelectedComment === comment) {
                    return;
                }
                this.commentPane.currentEditingComment.cancelReply();
                this.owner.selectionModule.selectComment(this.comment);
            }
        }
    };
    CommentView.prototype.initCommentView = function (localObj) {
        this.commentText = createElement('div', { className: 'e-de-cmt-readonly e-mention' });
        this.commentText.innerHTML = this.comment.text;
        this.commentView.appendChild(this.commentText);
        this.initEditView(localObj);
    };
    CommentView.prototype.initEditView = function (localObj) {
        var _this = this;
        this.textAreaContainer = createElement('div', { styles: 'display:none' });
        this.textArea = createElement('div', { className: 'e-de-cmt-textarea e-input' });
        this.textArea.addEventListener('paste', function (event) {
            _this.updatePastedText(event, _this.textArea);
        });
        this.textArea.style.borderWidth = '0 0 2px 0';
        this.textArea.setAttribute('placeholder', localObj.getConstant('Type your comment here'));
        this.editMention = new Mention({
            dataSource: this.owner.documentEditorSettings.mentionSettings.dataSource,
            fields: this.owner.documentEditorSettings.mentionSettings.fields,
            select: this.onSelect.bind(this),
        });
        this.textArea.innerHTML = this.comment.text;
        this.textArea.addEventListener('keydown', this.updateTextAreaHeight.bind(this));
        this.textArea.addEventListener('keyup', this.enableDisablePostButton.bind(this));
        var editRegionFooter = createElement('div', { className: 'e-de-cmt-action-button' });
        var postButton = createElement('button', { className: 'e-de-cmt-post-btn e-btn e-flat', attrs: { type: 'button' } });
        this.postButton = new Button({ cssClass: 'e-btn e-flat e-primary e-de-overlay', iconCss: 'e-de-cmt-post', disabled: true }, postButton);
        postButton.addEventListener('click', this.postComment.bind(this));
        postButton.title = localObj.getConstant('Post');
        postButton.setAttribute('aria-label', localObj.getConstant('Post'));
        var cancelButton = createElement('button', {
            className: 'e-de-cmt-cancel-btn e-btn e-flat',
            attrs: { type: 'button' }
        });
        this.cancelButton = new Button({ cssClass: 'e-btn e-flat', iconCss: 'e-de-cmt-cancel' }, cancelButton);
        cancelButton.title = localObj.getConstant('Cancel');
        cancelButton.setAttribute('aria-label', localObj.getConstant('Cancel'));
        cancelButton.addEventListener('click', this.cancelEditing.bind(this));
        editRegionFooter.appendChild(postButton);
        editRegionFooter.appendChild(cancelButton);
        editRegionFooter.style.marginTop = "8px";
        this.textAreaContainer.appendChild(this.textArea);
        this.textAreaContainer.appendChild(editRegionFooter);
        this.commentView.appendChild(this.textAreaContainer);
        this.editMention.appendTo(this.textArea);
    };
    CommentView.prototype.updatePastedText = function (event, element) {
        // Prevent the default paste action
        event.preventDefault();
        // Get the pasted content from the clipboard
        var clipboardData = (event.clipboardData);
        var plainText = clipboardData.getData('text/plain');
        if (plainText) {
            var htmlString = this.convertToHtml(plainText);
            element.innerHTML = element.innerHTML + htmlString;
        }
        this.enableDisableReplyPostButton();
    };
    CommentView.prototype.convertToHtml = function (input) {
        // Split the input string by \r\n or \r
        var lines = input.split(/(?:\r?\n|\r)/);
        // Map each line to a <div> element, adding <br> if the line is empty
        var htmlLines = lines.map(function (line) { return line ? "<div>" + line + "</div>" : "<div><br></div>"; });
        // Join the array back into a single string
        var output = htmlLines.join('');
        return output;
    };
    CommentView.prototype.onSelect = function (e) {
        this.owner.documentEditorSettings.mentionSettings.fields;
        var data = {};
        var item = e.itemData;
        data.text = item[this.owner.documentEditorSettings.mentionSettings.fields.text];
        data.value = item[this.owner.documentEditorSettings.mentionSettings.fields.value];
        this.itemData.push(data);
    };
    CommentView.prototype.initDateView = function () {
        this.commentDate = createElement('div', { className: 'e-de-cmt-date' });
        this.commentDate.innerText = HelperMethods.getModifiedDate(this.comment.date);
        this.commentView.appendChild(this.commentDate);
    };
    CommentView.prototype.initDrawer = function () {
        this.drawerElement = createElement('div', { styles: 'display:none;', className: 'e-de-cmt-drawer-cnt' });
        var leftPane = createElement('div', { className: 'e-de-cmt-drawer' });
        var spanElement = createElement('span');
        leftPane.appendChild(spanElement);
        this.drawerElement.appendChild(leftPane);
        this.drawerSpanElement = spanElement;
        this.drawerAction = leftPane;
        this.drawerAction.addEventListener('click', this.showOrHideDrawer.bind(this));
        this.parentElement.appendChild(this.drawerElement);
    };
    CommentView.prototype.initReplyView = function (localObj) {
        var _this = this;
        this.replyViewContainer = createElement('div', { className: 'e-de-cmt-rply-view' });
        if (this.commentPane.parentPane.isNewComment) {
            this.replyViewContainer.style.display = 'none';
        }
        this.replyViewTextBox = createElement('div', { className: 'e-de-cmt-textarea e-input' });
        this.replyViewTextBox.addEventListener('paste', function (event) {
            _this.updatePastedText(event, _this.replyViewTextBox);
        });
        this.replyViewTextBox.style.borderWidth = '0 0 1px 0';
        this.replyViewTextBox.setAttribute("placeholder", localObj.getConstant('Reply'));
        this.replyViewTextBox.addEventListener('click', this.enableReplyView.bind(this));
        this.replyViewTextBox.addEventListener('keydown', this.updateReplyTextAreaHeight.bind(this));
        this.replyViewTextBox.addEventListener('keyup', this.enableDisableReplyPostButton.bind(this));
        var editRegionFooter = createElement('div', { styles: 'display:none', className: 'e-de-cmt-action-button' });
        var postButton = createElement('button', { className: 'e-de-cmt-post-btn e-de-overlay e-btn e-flat', attrs: { type: 'button' } });
        this.replyPostButton = new Button({ cssClass: 'e-btn e-flat e-primary', iconCss: 'e-de-cmt-post', disabled: true }, postButton);
        this.replyMention = new Mention({
            dataSource: this.owner.documentEditorSettings.mentionSettings.dataSource,
            fields: this.owner.documentEditorSettings.mentionSettings.fields,
            select: this.onSelect.bind(this),
        });
        postButton.addEventListener('click', this.postReply.bind(this));
        postButton.title = localObj.getConstant('Post');
        var cancelButton = createElement('button', {
            className: 'e-de-cmt-cancel-btn e-btn e-flat',
            attrs: { type: 'button' }
        });
        cancelButton.setAttribute('aria-label', localObj.getConstant('Cancel'));
        this.replyCancelButton = new Button({ cssClass: 'e-btn e-flat', iconCss: 'e-de-cmt-cancel' }, cancelButton);
        cancelButton.addEventListener('click', this.cancelReply.bind(this));
        cancelButton.title = localObj.getConstant('Cancel');
        editRegionFooter.appendChild(postButton);
        editRegionFooter.appendChild(cancelButton);
        editRegionFooter.style.marginTop = "8px";
        this.replyFooter = editRegionFooter;
        this.replyViewContainer.appendChild(this.replyViewTextBox);
        this.replyViewContainer.appendChild(editRegionFooter);
        this.parentElement.appendChild(this.replyViewContainer);
        this.replyMention.appendTo(this.replyViewTextBox);
    };
    CommentView.prototype.initResolveOption = function (localObj) {
        var editRegionFooter = createElement('div', { className: 'e-de-cmt-resolve-btn' });
        var wrapperFooterDiv = createElement('div', { className: 'e-de-cmt-resolve-btn' });
        var reopenDeleteWrapper = createElement('div', { className: 'e-de-cmt-resolve-btn' });
        var postButton = createElement('button', { className: 'e-de-cmt-post-btn e-btn e-flat', attrs: { type: 'button' } });
        this.reopenButton = new Button({ cssClass: 'e-btn e-flat', iconCss: 'e-de-cmt-reopen' }, postButton);
        postButton.title = localObj.getConstant('Reopen');
        postButton.setAttribute('aria-label', localObj.getConstant('Reopen'));
        postButton.addEventListener('click', this.reopenButtonClick.bind(this));
        var cancelButton = createElement('button', {
            className: 'e-de-cmt-cancel-btn e-btn e-flat',
            attrs: { type: 'button' }
        });
        cancelButton.title = localObj.getConstant('Delete');
        cancelButton.setAttribute('aria-label', localObj.getConstant('Delete'));
        this.deleteButton = new Button({ cssClass: 'e-btn e-flat', iconCss: 'e-de-cmt-delete' }, cancelButton);
        cancelButton.addEventListener('click', this.deleteComment.bind(this));
        editRegionFooter.appendChild(postButton);
        editRegionFooter.appendChild(cancelButton);
        wrapperFooterDiv.appendChild(this.resolveDiv);
        reopenDeleteWrapper.appendChild(postButton);
        reopenDeleteWrapper.appendChild(cancelButton);
        editRegionFooter.appendChild(wrapperFooterDiv);
        wrapperFooterDiv.appendChild(reopenDeleteWrapper);
        wrapperFooterDiv.style.display = "flex";
        wrapperFooterDiv.style.justifyContent = "space-between";
        wrapperFooterDiv.style.alignItems = "center";
        reopenDeleteWrapper.style.display = "flex";
        reopenDeleteWrapper.style.justifyContent = "center";
        reopenDeleteWrapper.style.alignItems = "center";
        reopenDeleteWrapper.style.marginTop = "0px";
        this.resolveView = editRegionFooter;
        this.parentElement.appendChild(editRegionFooter);
    };
    CommentView.prototype.reopenButtonClick = function () {
        this.owner.editorModule.reopenComment(this.comment);
    };
    CommentView.prototype.deleteComment = function () {
        var eventArgs = { author: this.comment.author, cancel: false };
        this.owner.trigger(commentDeleteEvent, eventArgs);
        var eventActionArgs = { author: this.comment.author, cancel: eventArgs.cancel, type: 'Delete', mentions: this.comment.mentions };
        this.owner.trigger(beforeCommentActionEvent, eventActionArgs);
        if (eventActionArgs.cancel) {
            return;
        }
        this.owner.editorModule.deleteCommentInternal(this.comment);
        if (eventArgs.cancel) {
            return;
        }
    };
    CommentView.prototype.updateReplyTextAreaHeight = function (event) {
        var _this = this;
        if (event) {
            this.preventKeyboardShortcuts(event);
        }
        setTimeout(function () {
            if (!isNullOrUndefined(_this.replyViewTextBox)) {
                _this.replyViewTextBox.style.height = 'auto';
                var scrollHeight = _this.replyViewTextBox.scrollHeight;
                _this.replyViewTextBox.style.height = scrollHeight + 'px';
            }
        });
    };
    CommentView.prototype.preventKeyboardShortcuts = function (event) {
        var key = event.which || event.keyCode;
        var ctrl = (event.ctrlKey || event.metaKey) ? true : ((key === 17) ? true : false); // ctrl detection       
        var shift = event.shiftKey ? event.shiftKey : ((key === 16) ? true : false); // Shift Key detection        
        var alt = event.altKey ? event.altKey : ((key === 18) ? true : false); // alt key detection
        // Define the keyboard shortcuts to prevent
        var prevent = false;
        // Bold: Ctrl + B or Cmd + B (Mac)
        if (ctrl && key === 66)
            prevent = true;
        // Italic: Ctrl + I or Cmd + I (Mac)
        else if (ctrl && key === 73)
            prevent = true;
        // Underline: Ctrl + U or Cmd + U (Mac)
        else if (ctrl && key === 85)
            prevent = true;
        // Strikethrough: Alt + Shift + 5 (may vary by browser)
        else if (alt && shift && key === 53)
            prevent = true;
        // Superscript: Ctrl + . or Cmd + . (Mac)
        else if (ctrl && key === 190)
            prevent = true;
        // Subscript: Ctrl + , or Cmd + , (Mac)
        else if (ctrl && key === 188)
            prevent = true;
        // Insert Unordered List: Ctrl + Shift + L or Cmd + Shift + L (Mac)
        else if (ctrl && shift && key === 76)
            prevent = true;
        // Insert Ordered List: Ctrl + Shift + 7 or Cmd + Shift + 7 (Mac)
        else if (ctrl && shift && key === 55)
            prevent = true;
        // Remove Formatting: Ctrl + \ or Cmd + \ (Mac)
        else if (ctrl && key === 220)
            prevent = true;
        // Align Left: Ctrl + Shift + L or Cmd + Shift + L (Mac)
        else if (ctrl && shift && key === 76)
            prevent = true;
        // Align Center: Ctrl + Shift + E or Cmd + Shift + E (Mac)
        else if (ctrl && shift && key === 69)
            prevent = true;
        // Align Right: Ctrl + Shift + R or Cmd + Shift + R (Mac)
        else if (ctrl && shift && key === 82)
            prevent = true;
        // Align Justify: Ctrl + Shift + J or Cmd + Shift + J (Mac)
        else if (ctrl && shift && key === 74)
            prevent = true;
        // Outdent: Shift + Tab (may vary by browser)
        else if (shift && key === 9)
            prevent = true;
        // Heading Levels: Ctrl + Alt + 1 to Ctrl + Alt + 6 (may vary by browser) or Cmd + Alt + 1 to Cmd + Alt + 6 (Mac)
        else if (ctrl && alt && (key >= 49 && key <= 54))
            prevent = true;
        // Quote: Ctrl + Shift + Q or Cmd + Shift + Q (Mac) (may vary by browser)
        else if (ctrl && shift && key === 81)
            prevent = true;
        if (prevent) {
            event.preventDefault();
            event.stopPropagation();
        }
    };
    CommentView.prototype.enableDisableReplyPostButton = function () {
        this.replyPostButton.disabled = this.replyViewTextBox.innerText === '';
        if (this.replyPostButton.disabled) {
            classList(this.replyPostButton.element, ['e-de-overlay'], []);
        }
        else if (this.replyPostButton.element.classList.contains('e-de-overlay')) {
            classList(this.replyPostButton.element, [], ['e-de-overlay']);
        }
    };
    CommentView.prototype.enableReplyView = function () {
        var _this = this;
        if (this.commentPane.isEditMode) {
            return;
        }
        var eventArgs = { author: this.comment.author, cancel: false, type: 'Reply', mentions: this.comment.mentions };
        this.owner.trigger(beforeCommentActionEvent, eventArgs);
        if (eventArgs.cancel && eventArgs.type === 'Reply') {
            return;
        }
        this.commentPane.currentEditingComment = this;
        this.commentPane.isInsertingReply = true;
        if (this.owner.documentHelper.currentSelectedComment !== this.comment) {
            this.owner.selectionModule.selectComment(this.comment);
        }
        this.commentPane.isEditMode = true;
        //this.replyViewTextBox.readOnly = false;
        this.replyFooter.style.display = 'block';
        setTimeout(function () {
            _this.replyViewTextBox.focus();
        });
    };
    CommentView.prototype.postReply = function () {
        var replyText = (this.replyViewTextBox.innerText);
        this.cancelReply();
        this.updateReplyTextAreaHeight();
        this.owner.editorModule.replyComment(this.comment, replyText, this.itemData);
        if (this.itemData) {
            this.itemData = [];
        }
        if (!this.owner.editorModule.isSkipOperationsBuild && !this.owner.editorModule.isRemoteAction) {
            this.owner.fireContentChange();
        }
        this.owner.editorModule.isSkipOperationsBuild = false;
    };
    CommentView.prototype.cancelReply = function () {
        this.commentPane.currentEditingComment = undefined;
        this.commentPane.isInsertingReply = true;
        this.commentPane.isEditMode = false;
        this.replyPostButton.disabled = true;
        this.replyViewTextBox.innerText = '';
        // this.replyViewTextBox.readOnly = true;
        this.replyFooter.style.display = 'none';
    };
    CommentView.prototype.updateTextAreaHeight = function (event) {
        var _this = this;
        if (event) {
            this.preventKeyboardShortcuts(event);
        }
        setTimeout(function () {
            if (!isNullOrUndefined(_this.textArea)) {
                _this.textArea.style.height = 'auto';
                var scrollHeight = _this.textArea.scrollHeight;
                _this.textArea.style.height = scrollHeight + 'px';
            }
        });
    };
    CommentView.prototype.showMenuItems = function () {
        if (this.comment.isReply && !this.owner.isReadOnly) {
            if (!this.commentPane.isEditMode && (!isNullOrUndefined(this.comment) && !this.comment.isResolved)) {
                this.menuBar.style.display = 'block';
            }
        }
        var commentStart = this.commentPane.getCommentStart(this.comment);
        if (!isNullOrUndefined(commentStart) && !isNullOrUndefined(commentStart.commentMark)) {
            commentStart.commentMark.classList.add('e-de-cmt-mark-hover');
        }
    };
    CommentView.prototype.hideMenuItemOnMouseLeave = function () {
        if (this.comment.isReply) {
            if (this.owner.documentHelper.currentSelectedComment !== this.comment.ownerComment) {
                this.hideMenuItems();
            }
        }
        if (this.commentPane) {
            var commentStart = this.commentPane.getCommentStart(this.comment);
            if (!isNullOrUndefined(commentStart) && !isNullOrUndefined(commentStart.commentMark)) {
                commentStart.commentMark.classList.remove('e-de-cmt-mark-hover');
            }
        }
    };
    CommentView.prototype.hideMenuItems = function () {
        this.menuBar.style.display = 'none';
    };
    CommentView.prototype.enableDisablePostButton = function () {
        this.postButton.disabled = this.textArea.innerText === '';
        if (this.postButton.disabled) {
            classList(this.postButton.element, ['e-de-overlay'], []);
        }
        else if (this.postButton.element.classList.contains('e-de-overlay')) {
            classList(this.postButton.element, [], ['e-de-overlay']);
        }
    };
    CommentView.prototype.editComment = function () {
        var _this = this;
        if (!isNullOrUndefined(this.commentPane.parentPane) && !this.commentPane.parentPane.postReply) {
            var eventArgs = { author: this.comment.author, cancel: false, type: 'Edit', mentions: this.comment.mentions };
            this.owner.trigger(beforeCommentActionEvent, eventArgs);
            if (eventArgs.cancel && eventArgs.type === 'Edit') {
                return;
            }
        }
        this.commentPane.currentEditingComment = this;
        this.commentPane.isInsertingReply = false;
        this.commentPane.isEditMode = true;
        this.commentText.style.display = 'none';
        this.textAreaContainer.style.display = 'block';
        this.commentDate.style.display = 'none';
        this.menuBar.style.display = 'none';
        this.updateTextAreaHeight();
        setTimeout(function () {
            if (_this.textArea) {
                _this.textArea.focus();
            }
        });
    };
    CommentView.prototype.resolveComment = function () {
        classList(this.parentElement, ['e-de-cmt-resolved'], []);
        this.resolveDiv.style.display = "inline";
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        this.dropDownButton.items = [{ text: localObj.getConstant('Reopen') }, { text: localObj.getConstant('Delete') }];
    };
    CommentView.prototype.reopenComment = function () {
        classList(this.parentElement, [], ['e-de-cmt-resolved']);
        this.resolveDiv.style.display = "none";
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        this.dropDownButton.items = [{ text: localObj.getConstant('Edit') },
            { text: localObj.getConstant('Delete') },
            { text: localObj.getConstant('Reply') },
            { text: localObj.getConstant('Resolve') }];
        this.showDrawer();
    };
    CommentView.prototype.postComment = function () {
        this.comment.isPosted = true;
        if (this.itemData) {
            this.comment.mentions = this.itemData;
            this.itemData = [];
        }
        var eventArgs = { author: this.comment.author, cancel: false, type: 'Post', text: this.textArea.innerText, mentions: this.comment.mentions };
        this.owner.trigger(beforeCommentActionEvent, eventArgs);
        if (eventArgs.cancel && eventArgs.type === 'Post') {
            return;
        }
        var updatedText = this.textArea.innerHTML;
        if (this.owner.editorModule && this.comment.text != '' && (this.comment.text != updatedText)) {
            this.owner.editorModule.initHistory('EditComment');
            var modifiedObject = {
                commentId: this.comment.commentId,
                text: this.comment.text
            };
            this.owner.editorHistoryModule.currentBaseHistoryInfo.modifiedProperties.push(modifiedObject);
            this.owner.editorHistoryModule.currentBaseHistoryInfo.removedNodes.push(this.comment);
            this.owner.editorHistoryModule.updateHistory();
        }
        this.commentText.innerHTML = updatedText;
        this.comment.text = updatedText;
        this.showCommentView();
        if (this.commentPane && this.commentPane.parentPane) {
            this.commentPane.parentPane.isNewComment = false;
        }
        if (!isNullOrUndefined(this.replyViewContainer)) {
            this.replyViewContainer.style.display = '';
        }
        if (!this.owner.editorModule.isSkipOperationsBuild && !this.owner.editorModule.isRemoteAction) {
            this.owner.fireContentChange();
        }
    };
    CommentView.prototype.showCommentView = function () {
        this.commentPane.isEditMode = false;
        this.textAreaContainer.style.display = 'none';
        this.commentText.style.display = 'block';
        this.commentDate.style.display = 'block';
        this.menuBar.style.display = 'block';
    };
    CommentView.prototype.cancelEditing = function () {
        this.showCommentView();
        this.textArea.innerHTML = this.comment.text.trim();
        if (this.commentPane.parentPane.isNewComment) {
            if (this.commentPane && this.commentPane.parentPane) {
                this.commentPane.parentPane.isNewComment = false;
            }
            var documentEditor = this.owner;
            documentEditor.editorModule.isSkipOperationsBuild = this.owner.enableCollaborativeEditing;
            this.commentPane.parentPane.discardComment(this.comment);
            documentEditor.editorModule.isSkipOperationsBuild = false;
        }
    };
    CommentView.prototype.showOrHideDrawer = function () {
        if (this.isDrawerExpand) {
            this.hideDrawer();
        }
        else {
            this.showDrawer();
        }
    };
    CommentView.prototype.hideDrawer = function () {
        if (this.parentElement) {
            var localObj = new L10n('documenteditor', this.owner.defaultLocale);
            localObj.setLocale(this.owner.locale);
            var elements = this.parentElement.getElementsByClassName('e-de-cmt-sub-container');
            if (elements.length > 1) {
                for (var i = 1; i < elements.length; i++) {
                    elements[i].style.display = 'none';
                }
                this.drawerElement.style.display = 'block';
                classList(this.drawerSpanElement, [], ['e-de-nav-up']);
                this.drawerSpanElement.innerText = '+' + (elements.length - 1) + ' ' + localObj.getConstant('more') + '...';
            }
            this.isDrawerExpand = false;
        }
    };
    CommentView.prototype.showDrawer = function () {
        if (this.parentElement) {
            var elements = this.parentElement.getElementsByClassName('e-de-cmt-sub-container');
            if (elements.length > 1) {
                for (var i = 0; i < elements.length; i++) {
                    elements[i].style.display = 'block';
                }
                this.drawerElement.style.display = 'block';
                this.drawerSpanElement.innerText = '';
                classList(this.drawerSpanElement, ['e-de-nav-up'], []);
            }
            this.isDrawerExpand = true;
        }
    };
    CommentView.prototype.userOptionSelectEvent = function (event) {
        var selectedItem = event.item.text;
        var localObj = new L10n('documenteditor', this.owner.defaultLocale);
        localObj.setLocale(this.owner.locale);
        switch (selectedItem) {
            case localObj.getConstant('Edit'):
                this.editComment();
                break;
            case localObj.getConstant('Reply'):
                this.enableReplyView();
                break;
            case localObj.getConstant('Delete'):
                this.deleteComment();
                break;
            case localObj.getConstant('Resolve'):
                this.owner.editorModule.resolveComment(this.comment);
                break;
            case localObj.getConstant('Reopen'):
                this.owner.editorModule.reopenComment(this.comment);
        }
    };
    CommentView.prototype.unwireEvent = function () {
        if (this.drawerAction) {
            this.drawerAction.removeEventListener('click', this.showOrHideDrawer.bind(this));
        }
        if (this.textArea) {
            this.textArea.removeEventListener('keydown', this.updateTextAreaHeight.bind(this));
            this.textArea.removeEventListener('keyup', this.enableDisablePostButton.bind(this));
        }
        if (this.postButton) {
            this.postButton.removeEventListener('click', this.postComment.bind(this));
        }
        if (this.cancelButton) {
            this.cancelButton.removeEventListener('click', this.cancelEditing.bind(this));
        }
        if (this.commentView) {
            this.commentView.removeEventListener('click', this.selectComment.bind(this));
            this.commentView.removeEventListener('mouseenter', this.showMenuItems.bind(this));
            this.commentView.removeEventListener('mouseleave', this.hideMenuItemOnMouseLeave.bind(this));
        }
    };
    CommentView.prototype.destroy = function () {
        this.unwireEvent();
        if (this.comment) {
            this.comment = undefined;
        }
        if (this.dropDownButton) {
            this.dropDownButton.destroy();
        }
        this.dropDownButton = undefined;
        if (this.postButton) {
            this.postButton.destroy();
        }
        this.postButton = undefined;
        if (this.cancelButton) {
            this.cancelButton.destroy();
        }
        this.cancelButton = undefined;
        if (this.replyPostButton) {
            this.replyPostButton.destroy();
            this.replyPostButton = undefined;
        }
        if (this.replyCancelButton) {
            this.replyCancelButton.destroy();
            this.replyCancelButton = undefined;
        }
        if (this.reopenButton) {
            this.reopenButton.destroy();
            this.reopenButton = undefined;
        }
        if (this.deleteButton) {
            this.deleteButton.destroy();
            this.deleteButton = undefined;
        }
        if (this.parentElement) {
            this.parentElement.innerHTML = '';
            if (this.parentElement.parentElement) {
                this.parentElement.parentElement.removeChild(this.parentElement);
            }
        }
        this.parentElement = undefined;
        if (this.commentView) {
            this.commentView.innerHTML = '';
            if (this.commentView.parentElement) {
                this.commentView.parentElement.removeChild(this.commentView);
            }
        }
        this.commentView = undefined;
        if (this.replyViewContainer) {
            this.replyViewContainer.innerHTML = '';
            this.replyViewContainer.remove();
            this.replyViewContainer = null;
        }
        this.replyViewTextBox = undefined;
        this.replyFooter = undefined;
        if (this.resolveView) {
            this.resolveView.innerHTML = '';
            this.resolveView.remove();
            this.resolveView = null;
        }
        this.menuBar = undefined;
        this.drawerAction = undefined;
        this.commentText = undefined;
        this.commentDate = undefined;
        if (this.textAreaContainer) {
            this.textAreaContainer.innerHTML = '';
            this.textAreaContainer.remove();
            this.textAreaContainer = null;
        }
        this.drawerElement = undefined;
        this.drawerSpanElement = undefined;
        this.commentPane = undefined;
        this.owner = undefined;
    };
    return CommentView;
}());
export { CommentView };
