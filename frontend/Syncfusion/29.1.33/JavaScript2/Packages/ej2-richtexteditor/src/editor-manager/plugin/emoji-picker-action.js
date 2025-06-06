import { NodeSelection } from './../../selection/index';
import * as EVENTS from './../../common/constant';
import { InsertHtml } from './inserthtml';
import { closest } from '@syncfusion/ej2-base';
var EmojiPickerAction = /** @class */ (function () {
    function EmojiPickerAction(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    EmojiPickerAction.prototype.addEventListener = function () {
        this.parent.observer.on(EVENTS.EMOJI_PICKER_ACTIONS, this.emojiInsert, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    EmojiPickerAction.prototype.removeEventListener = function () {
        this.parent.observer.off(EVENTS.EMOJI_PICKER_ACTIONS, this.emojiInsert);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    EmojiPickerAction.prototype.emojiInsert = function (args) {
        var node = document.createTextNode(args.value);
        var selection = this.parent.currentDocument.getSelection();
        var range = selection.getRangeAt(0);
        var cursorPos = range.startOffset;
        for (var i = cursorPos - 1; i >= cursorPos - 15; i--) {
            var prevChar_1 = selection.focusNode.textContent.substring(i - 1, i);
            var isPrevSpace_1 = /:$/.test(prevChar_1);
            if (isPrevSpace_1) {
                this.beforeApplyFormat(true);
                break;
            }
        }
        var colon = /:$/.test(selection.focusNode.textContent.charAt(cursorPos - 1));
        var prevChar = selection.focusNode.textContent.charAt(cursorPos - 2);
        var isPrevSpace = /\s/.test(prevChar);
        if (colon && (isPrevSpace || selection.focusOffset === 1)) {
            this.beforeApplyFormat(true);
        }
        var focusNode = selection.focusNode;
        var anchorParent = closest(focusNode.nodeName === '#text' ? focusNode.parentNode : focusNode, 'a');
        if (anchorParent) {
            if (cursorPos === 0) {
                // Insert emoji before the anchor tag if at the start
                anchorParent.parentNode.insertBefore(node, anchorParent);
            }
            else if (cursorPos === focusNode.textContent.length) {
                // Insert emoji after the anchor tag if at the end
                anchorParent.parentNode.insertBefore(node, anchorParent.nextSibling);
                var nodeSelection = new NodeSelection(anchorParent);
                // eslint-disable-next-line max-len
                nodeSelection.setCursorPoint(this.parent.currentDocument, anchorParent.nextSibling, anchorParent.nextSibling.textContent.length);
            }
        }
        else {
            InsertHtml.Insert(this.parent.currentDocument, node, this.parent.editableElement);
        }
        if (args.callBack) {
            args.callBack({
                requestType: args.subCommand,
                editorMode: 'HTML',
                event: args.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    EmojiPickerAction.prototype.beforeApplyFormat = function (isBlockFormat) {
        var range1 = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var node = this.parent.nodeSelection.getNodeCollection(range1)[0];
        var blockNewLine = !(node.parentElement.innerHTML.replace(/&nbsp;|<br>/g, '').trim() === ':' || node.textContent.trim().indexOf('/') === 0);
        var startNode = node;
        if (blockNewLine && isBlockFormat) {
            while (startNode !== this.parent.editableElement) {
                startNode = startNode.parentElement;
            }
        }
        var startPoint = range1.startOffset;
        while (this.parent.nodeSelection.getRange(this.parent.editableElement.ownerDocument).toString().indexOf(':') === -1) {
            this.parent.nodeSelection.setSelectionText(this.parent.editableElement.ownerDocument, node, node, startPoint, range1.endOffset);
            startPoint--;
        }
        var range2 = this.parent.nodeSelection.getRange(this.parent.currentDocument);
        var node2 = this.parent.nodeCutter.GetSpliceNode(range2, node);
        node2.parentNode.removeChild(node2);
    };
    EmojiPickerAction.prototype.destroy = function () {
        this.removeEventListener();
    };
    return EmojiPickerAction;
}());
export { EmojiPickerAction };
