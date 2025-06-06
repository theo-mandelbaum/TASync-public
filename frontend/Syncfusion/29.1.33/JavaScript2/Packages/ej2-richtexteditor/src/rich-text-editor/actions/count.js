import { detach, isNullOrUndefined } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import { RenderType } from '../base/enum';
import { CLS_COUNT, CLS_WARNING, CLS_ERROR } from '../base/classes';
/**
 * `Count` module is used to handle Count actions.
 */
var Count = /** @class */ (function () {
    function Count(parent, serviceLocator) {
        this.parent = parent;
        this.locator = serviceLocator;
        this.renderFactory = this.locator.getService('rendererFactory');
        this.addEventListener();
        this.isDestroyed = false;
    }
    Count.prototype.initializeInstance = function () {
        this.contentRenderer = this.renderFactory.getRenderer(RenderType.Content);
        this.editPanel = this.contentRenderer.getEditPanel();
        this.addEventListener();
    };
    /**
     * renderCount method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Count.prototype.renderCount = function () {
        this.initializeInstance();
        this.element = this.parent.createElement('span', { className: CLS_COUNT });
        this.parent.rootContainer.appendChild(this.element);
        this.parent.rootContainer.classList.add('e-count-enabled');
        if (this.parent.iframeSettings.enable) {
            this.parent.inputElement.classList.add('e-count-enabled');
        }
        this.appendCount();
        if (this.parent.maxLength !== -1) {
            this.charCountBackground(this.htmlLength);
        }
    };
    Count.prototype.appendCount = function () {
        var htmlText = this.parent.editorMode === 'Markdown' ? this.editPanel.value
            : (this.parent.getText().replace(/(\r\n|\n|\r|\t)/gm, ''));
        if (this.parent.editorMode !== 'Markdown' && htmlText.indexOf('\u200B') !== -1) {
            this.htmlLength = htmlText.replace(/\u200B/g, '').length;
        }
        else {
            this.htmlLength = htmlText.length;
        }
        var string = this.parent.maxLength === -1 ? this.htmlLength : this.htmlLength + ' / ' + this.parent.maxLength;
        this.element.innerHTML = string;
    };
    Count.prototype.charCountBackground = function (htmlLength) {
        var percentage = (htmlLength / this.parent.maxLength) * 100;
        if (percentage < 85) {
            this.element.classList.remove(CLS_WARNING);
            this.element.classList.remove(CLS_ERROR);
        }
        else if (percentage > 85 && percentage <= 90) {
            this.element.classList.remove(CLS_ERROR);
            this.element.classList.add(CLS_WARNING);
        }
        else if (percentage > 90) {
            this.element.classList.remove(CLS_WARNING);
            this.element.classList.add(CLS_ERROR);
        }
    };
    /**
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Count.prototype.refresh = function () {
        if (!isNullOrUndefined(this.editPanel)) {
            this.appendCount();
            if (this.parent.maxLength !== -1) {
                this.charCountBackground(this.htmlLength);
            }
        }
    };
    /**
     * Destroys the Count.
     *
     * @function destroy
     * @returns {void}
     * @hidden
     * @deprecated
     */
    Count.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        if (this.parent && this.parent.rootContainer && this.parent.rootContainer.classList.contains('e-count-enabled')) {
            this.parent.rootContainer.classList.remove('e-count-enabled');
        }
        if (this.parent.iframeSettings.enable && !isNullOrUndefined(this.parent.inputElement)) {
            this.parent.inputElement.classList.remove('e-count-enabled');
        }
        if (this.element && !isNullOrUndefined(this.parent.element.querySelector('.' + CLS_COUNT))) {
            detach(this.element);
        }
        this.removeEventListener();
        if (this.editPanel) {
            this.editPanel = null;
        }
        if (this.element) {
            detach(this.element);
            this.element = null;
        }
        this.isDestroyed = true;
    };
    Count.prototype.toggle = function (e) {
        this.element.style.display = (e.member === 'viewSource') ? 'none' : 'block';
    };
    Count.prototype.addEventListener = function () {
        this.parent.on(events.initialEnd, this.renderCount, this);
        this.parent.on(events.keyUp, this.refresh, this);
        this.parent.on(events.count, this.refresh, this);
        this.parent.on(events.refreshBegin, this.refresh, this);
        this.parent.on(events.mouseDown, this.refresh, this);
        this.parent.on(events.destroy, this.destroy, this);
        this.parent.on(events.sourceCode, this.toggle, this);
        this.parent.on(events.updateSource, this.toggle, this);
    };
    Count.prototype.removeEventListener = function () {
        this.parent.off(events.initialEnd, this.renderCount);
        this.parent.off(events.keyUp, this.refresh);
        this.parent.off(events.refreshBegin, this.refresh);
        this.parent.off(events.count, this.refresh);
        this.parent.off(events.mouseDown, this.refresh);
        this.parent.off(events.destroy, this.destroy);
        this.parent.off(events.sourceCode, this.toggle);
        this.parent.off(events.updateSource, this.toggle);
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {string} - returns the string value
     */
    Count.prototype.getModuleName = function () {
        return 'count';
    };
    return Count;
}());
export { Count };
