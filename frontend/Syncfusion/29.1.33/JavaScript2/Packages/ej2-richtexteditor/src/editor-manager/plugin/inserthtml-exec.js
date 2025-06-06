import * as CONSTANT from './../base/constant';
import { InsertHtml } from './inserthtml';
import * as EVENTS from './../../common/constant';
/**
 * Selection EXEC internal component
 *
 * @hidden
 * @deprecated
 */
var InsertHtmlExec = /** @class */ (function () {
    /**
     * Constructor for creating the Formats plugin
     *
     * @param {EditorManager} parent - sepcifies the parent element
     * @hidden
     * @deprecated
     */
    function InsertHtmlExec(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    InsertHtmlExec.prototype.addEventListener = function () {
        this.parent.observer.on(CONSTANT.INSERTHTML_TYPE, this.applyHtml, this);
        this.parent.observer.on(EVENTS.INTERNAL_DESTROY, this.destroy, this);
    };
    InsertHtmlExec.prototype.removeEventListener = function () {
        this.parent.observer.off(CONSTANT.INSERTHTML_TYPE, this.applyHtml);
        this.parent.observer.off(EVENTS.INTERNAL_DESTROY, this.destroy);
    };
    InsertHtmlExec.prototype.applyHtml = function (e) {
        InsertHtml.Insert(this.parent.currentDocument, e.value, this.parent.editableElement, true, e.enterAction);
        if (e.subCommand === 'pasteCleanup') {
            var pastedElements = this.parent.editableElement.querySelectorAll('.pasteContent_RTE');
            var allPastedElements = [].slice.call(pastedElements);
            var imgElements = this.parent.editableElement.querySelectorAll('.pasteContent_Img');
            var allImgElm = [].slice.call(imgElements);
            e.callBack({
                requestType: e.subCommand,
                editorMode: 'HTML',
                elements: allPastedElements,
                imgElem: allImgElm
            });
        }
        else {
            if (e.callBack) {
                e.callBack({
                    requestType: e.subCommand,
                    editorMode: 'HTML',
                    event: e.event,
                    range: this.parent.nodeSelection.getRange(this.parent.currentDocument),
                    elements: this.parent.nodeSelection.getSelectedNodes(this.parent.currentDocument)
                });
            }
        }
    };
    InsertHtmlExec.prototype.destroy = function () {
        this.removeEventListener();
    };
    return InsertHtmlExec;
}());
export { InsertHtmlExec };
