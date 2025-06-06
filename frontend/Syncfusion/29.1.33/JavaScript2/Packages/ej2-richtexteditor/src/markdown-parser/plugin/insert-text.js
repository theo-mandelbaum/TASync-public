import * as CONSTANT from './../base/constant';
import * as EVENTS from './../../common/constant';
/**
 * Link internal component
 *
 * @hidden
 * @deprecated
 */
var MDInsertText = /** @class */ (function () {
    /**
     * Constructor for creating the insert text plugin
     *
     * @param {MarkdownParser} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function MDInsertText(parent) {
        this.parent = parent;
        this.selection = this.parent.markdownSelection;
        this.addEventListener();
    }
    MDInsertText.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.INSERT_TEXT_COMMAND, this.InsertTextExec, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    MDInsertText.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.INSERT_TEXT_COMMAND, this.InsertTextExec);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    MDInsertText.prototype.InsertTextExec = function (e) {
        var textArea = this.parent.element;
        textArea.focus();
        var start = textArea.selectionStart;
        var end = textArea.selectionEnd;
        var text = e.value.text;
        var startOffset = start + text.length;
        var endOffset = end + text.length;
        textArea.value = textArea.value.substr(0, start)
            + text + textArea.value.substr(end, textArea.value.length);
        this.parent.markdownSelection.setSelection(textArea, startOffset, endOffset);
        this.restore(textArea, startOffset, endOffset, e);
    };
    MDInsertText.prototype.restore = function (textArea, start, end, event) {
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
    MDInsertText.prototype.destroy = function () {
        this.removeEventListener();
    };
    return MDInsertText;
}());
export { MDInsertText };
