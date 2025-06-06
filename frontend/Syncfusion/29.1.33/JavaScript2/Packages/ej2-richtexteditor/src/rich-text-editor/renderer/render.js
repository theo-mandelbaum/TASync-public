import { RenderType } from '../base/enum';
import * as events from '../base/constant';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
/**
 * Content module is used to render Rich Text Editor content
 *
 * @hidden
 * @deprecated
 */
var Render = /** @class */ (function () {
    /**
     * Constructor for render module
     *
     * @param {IRichTextEditor} parent - specifies the parent
     * @param {ServiceLocator} locator - specifies the locator.
     * @returns {void}
     */
    function Render(parent, locator) {
        this.parent = parent;
        this.locator = locator;
        this.renderer = this.locator.getService('rendererFactory');
        this.addEventListener();
    }
    /**
     * To initialize Rich Text Editor header, content and footer rendering
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Render.prototype.render = function () {
        // eslint-disable-next-line
        var rteObj = this.parent;
        this.contentRenderer = this.renderer.getRenderer(RenderType.Content);
        this.contentRenderer.renderPanel();
    };
    /**
     * Refresh the entire RichTextEditor.
     *
     * @param {NotifyArgs} e - specifies the arguments.
     * @returns {void}
     */
    Render.prototype.refresh = function (e) {
        if (e === void 0) { e = { requestType: 'refresh' }; }
        this.parent.notify(e.requestType + "-begin", e);
    };
    /**
     * Destroy the entire RichTextEditor.
     *
     * @returns {void}
     */
    Render.prototype.destroy = function () {
        if (isNullOrUndefined(this.parent)) {
            return;
        }
        this.removeEventListener();
        this.locator.destroy();
        this.renderer.destroy();
    };
    Render.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.modelChanged, this.refresh, this);
        this.parent.on(events.keyUp, this.keyUp, this);
    };
    Render.prototype.removeEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.off(events.modelChanged, this.refresh);
        this.parent.off(events.keyUp, this.keyUp);
    };
    Render.prototype.keyUp = function (e) {
        if (this.parent.editorMode === 'HTML') {
            switch (e.args.which) {
                case 46:
                case 8:
                    // eslint-disable-next-line
                    var childNodes = this.parent.contentModule.getEditPanel().childNodes;
                    if ((childNodes.length === 0) ||
                        (childNodes.length === 1 && childNodes[0].childNodes.length === 0 && ((childNodes[0].tagName === 'BR') ||
                            ((childNodes[0].tagName === 'P' || childNodes[0].tagName === 'DIV') && childNodes[0].textContent === '')))) {
                        var node = this.parent.contentModule.getEditPanel();
                        if (this.parent.enterKey === 'DIV') {
                            node.innerHTML = '<div><br/></div>';
                        }
                        else if (this.parent.enterKey === 'BR') {
                            node.innerHTML = '<br/>';
                        }
                        else {
                            node.innerHTML = '<p><br/></p>';
                        }
                        this.parent.formatter.editorManager.nodeSelection.setCursorPoint(this.parent.contentModule.getDocument(), node.childNodes[0], 0);
                    }
                    break;
            }
        }
    };
    return Render;
}());
export { Render };
