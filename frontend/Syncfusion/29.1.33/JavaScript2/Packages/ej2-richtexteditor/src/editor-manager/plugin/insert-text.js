import * as CONSTANT from '../base/constant';
import { InsertHtml } from './inserthtml';
import * as EVENTS from './../../common/constant';
/**
 * Insert a Text Node or Text
 *
 * @hidden
 * @deprecated
 */
var InsertTextExec = /** @class */ (function () {
    /**
     * Constructor for creating the InsertText plugin
     *
     * @param {EditorManager} parent - specifies the parent element
     * @hidden
     * @deprecated
     */
    function InsertTextExec(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    InsertTextExec.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.INSERT_TEXT_TYPE, this.insertText, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    InsertTextExec.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.INSERT_TEXT_TYPE, this.insertText);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    InsertTextExec.prototype.insertText = function (e) {
        var node = document.createTextNode(e.value);
        InsertHtml.Insert(this.parent.currentDocument, node, this.parent.editableElement);
        if (e.callBack) {
            e.callBack({
                requestType: e.subCommand,
                editorMode: 'HTML',
                event: e.event,
                range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
            });
        }
    };
    InsertTextExec.prototype.destroy = function () {
        this.removeEventListener();
    };
    return InsertTextExec;
}());
export { InsertTextExec };
