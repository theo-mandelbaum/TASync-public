import * as CONSTANT from './../base/constant';
import * as EVENTS from './../../common/constant';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
var MDLink = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {MarkdownParser} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function MDLink(parent) {
        this.parent = parent;
        this.selection = this.parent.markdownSelection;
        this.addEventListener();
    }
    MDLink.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.LINK_COMMAND, this.createLink, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    MDLink.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.LINK_COMMAND, this.createLink);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    MDLink.prototype.createLink = function (e) {
        var textArea = this.parent.element;
        textArea.focus();
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
        var text = (e.subCommand === 'Image') ? this.selection.getSelectedText(textArea) : e.item.text;
        var startOffset = (e.subCommand === 'Image') ? (start + 2) : (start + 1);
        var endOffset = (e.subCommand === 'Image') ? (end + 2) : (end + 1);
        text = (e.subCommand === 'Image') ? '![' + text + '](' + e.item.url + ')' : '[' + text + '](' + e.item.url + ')';
        textArea.value = textArea.value.substr(0, start)
            + text + textArea.value.substr(end, textArea.value.length);
        this.parent.markdownSelection.setSelection(textArea, startOffset, endOffset);
        this.restore(textArea, startOffset, endOffset, e);
    };
    MDLink.prototype.restore = function (textArea, start, end, event) {
        this.selection.save(start, end);
        this.selection.restore(textArea);
        if (event && event.callBack) {
            event.callBack({
                requestType: event.subCommand,
                selectedText: this.selection.getSelectedText(textArea),
                editorMode: 'Markdown',
                event: event.event
            });
        }
    };
    MDLink.prototype.destroy = function () {
        this.removeEventListener();
    };
    return MDLink;
}());
export { MDLink };
