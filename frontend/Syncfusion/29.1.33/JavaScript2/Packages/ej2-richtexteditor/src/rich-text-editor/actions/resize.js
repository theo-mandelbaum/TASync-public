import { EventHandler, Browser, isNullOrUndefined, detach } from '@syncfusion/ej2-base';
import * as events from '../base/constant';
import * as classes from '../base/classes';
/**
 * `Resize` module is used to resize the editor
 */
var Resize = /** @class */ (function () {
    function Resize(parent) {
        this.parent = parent;
        this.addEventListener();
        this.isDestroyed = false;
        this.isResizing = false;
        this.iframeMouseUpBoundFn = this.iframeMouseUp.bind(this);
    }
    Resize.prototype.addEventListener = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.parent.on(events.initialEnd, this.renderResizable, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    Resize.prototype.renderResizable = function () {
        var _this = this;
        var enableRtlClass = (this.parent.enableRtl) ? classes.CLS_RTE_RES_WEST : classes.CLS_RTE_RES_EAST;
        this.resizer = this.parent.createElement('div', {
            id: this.parent.getID() + '-resizable', className: 'e-icons'
                + ' ' + classes.CLS_RTE_RES_HANDLE + ' ' + enableRtlClass
        });
        this.parent.element.classList.add(classes.CLS_RTE_RES_CNT);
        this.parent.rootContainer.appendChild(this.resizer);
        this.parent.rootContainer.classList.add('e-resize-enabled');
        if (this.parent.iframeSettings.enable) {
            this.parent.inputElement.classList.add('e-resize-enabled');
            this.parent.contentModule.getDocument().addEventListener('mouseup', this.iframeMouseUpBoundFn);
        }
        this.iframeElement = this.parent.contentModule.getDocument().querySelectorAll('iframe');
        if (!isNullOrUndefined(this.iframeElement)) {
            this.iframeElement.forEach(function (iframe) {
                EventHandler.add(iframe, 'load', _this.onIFrameLoad, _this);
            });
        }
        this.touchStartEvent = (Browser.info.name === 'msie') ? 'pointerdown' : 'touchstart';
        EventHandler.add(this.resizer, 'mousedown', this.resizeStart, this);
        EventHandler.add(this.resizer, this.touchStartEvent, this.resizeStart, this);
    };
    Resize.prototype.onIFrameLoad = function (e) {
        var iframe = e.target;
        if (iframe.nodeName === 'IFRAME' && iframe.contentDocument) {
            EventHandler.add(iframe.contentDocument, 'mouseup', this.stopResize, this);
        }
    };
    Resize.prototype.removeMouseUpEventListener = function (iframe) {
        if (iframe.contentDocument) {
            EventHandler.remove(iframe.contentDocument, 'mouseup', this.stopResize);
        }
    };
    Resize.prototype.resizeStart = function (e) {
        var _this = this;
        this.isResizing = false;
        if (e.cancelable) {
            e.preventDefault();
        }
        this.wireResizeEvents();
        this.parent.notify(events.resizeInitialized, {});
        var args = { event: e, requestType: 'editor' };
        this.parent.trigger(events.resizeStart, args, function (resizeStartArgs) {
            if (resizeStartArgs.cancel) {
                _this.unwireResizeEvents();
            }
        });
    };
    Resize.prototype.performResize = function (e) {
        var _this = this;
        this.isResizing = true;
        var args = { event: e, requestType: 'editor' };
        this.parent.trigger(events.onResize, args, function (resizingArgs) {
            if (resizingArgs.cancel) {
                _this.unwireResizeEvents();
            }
        });
        var boundRect = this.parent.element.getBoundingClientRect();
        if (this.isMouseEvent(e)) {
            this.parent.element.style.height = e.clientY - boundRect.top + 'px';
            this.parent.element.style.width = (!this.parent.enableRtl) ? e.clientX - boundRect.left + 'px' :
                boundRect.right - e.clientX + 'px';
            if (this.parent.toolbarModule) {
                var toolBarEle = this.parent.toolbarModule.getToolbarElement();
                if (!isNullOrUndefined(toolBarEle) && !isNullOrUndefined(toolBarEle.parentElement)) {
                    if (toolBarEle.parentElement.classList.contains(classes.CLS_TB_FLOAT) && this.parent.toolbarSettings.enableFloating &&
                        this.parent.getToolbar() && !this.parent.inlineMode.enable) {
                        var contentPanel = this.parent.contentModule.getPanel();
                        var contentPanelWidth = contentPanel.getBoundingClientRect().width;
                        toolBarEle.style.width = contentPanelWidth + 'px';
                    }
                }
            }
        }
        else {
            var eventType = Browser.info.name !== 'msie' ? e.touches[0] : e;
            this.parent.element.style.height = eventType.clientY - boundRect.top + 'px';
            this.parent.element.style.width = (!this.parent.enableRtl) ? eventType.clientX - boundRect.left + 'px' : boundRect.right - eventType.clientX + 'px';
        }
        var rteContent = this.parent.element.querySelector('#' + this.parent.getID() + '_source-view');
        if (!isNullOrUndefined(rteContent)) {
            rteContent.style.height = this.parent.element.style.height;
        }
        this.parent.refreshUI();
    };
    Resize.prototype.stopResize = function (e) {
        this.isResizing = false;
        this.parent.refreshUI();
        this.unwireResizeEvents();
        var args = { event: e, requestType: 'editor' };
        this.parent.trigger(events.resizeStop, args);
    };
    Resize.prototype.getEventType = function (e) {
        return (e.indexOf('mouse') > -1) ? 'mouse' : 'touch';
    };
    Resize.prototype.isMouseEvent = function (e) {
        var isMouse = false;
        if (this.getEventType(e.type) === 'mouse' || (!isNullOrUndefined(e.pointerType) &&
            this.getEventType(e.pointerType) === 'mouse')) {
            isMouse = true;
        }
        return isMouse;
    };
    Resize.prototype.wireResizeEvents = function () {
        EventHandler.add(document, 'mousemove', this.performResize, this);
        EventHandler.add(document, 'mouseup', this.stopResize, this);
        this.touchMoveEvent = (Browser.info.name === 'msie') ? 'pointermove' : 'touchmove';
        this.touchEndEvent = (Browser.info.name === 'msie') ? 'pointerup' : 'touchend';
        EventHandler.add(document, this.touchMoveEvent, this.performResize, this);
        EventHandler.add(document, this.touchEndEvent, this.stopResize, this);
    };
    Resize.prototype.unwireResizeEvents = function () {
        EventHandler.remove(document, 'mousemove', this.performResize);
        EventHandler.remove(document, 'mouseup', this.stopResize);
        EventHandler.remove(document, this.touchMoveEvent, this.performResize);
        EventHandler.remove(document, this.touchEndEvent, this.stopResize);
    };
    Resize.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        this.removeEventListener();
        if (this.resizer) {
            detach(this.resizer);
            this.resizer = null;
        }
        this.isDestroyed = true;
    };
    Resize.prototype.removeEventListener = function () {
        var _this = this;
        this.parent.off(events.initialEnd, this.renderResizable);
        this.parent.element.classList.remove(classes.CLS_RTE_RES_CNT);
        if (this.parent && this.parent.rootContainer && this.parent.rootContainer.classList.contains('e-resize-enabled')) {
            this.parent.rootContainer.classList.remove('e-resize-enabled');
        }
        if (this.parent.iframeSettings.enable && !isNullOrUndefined(this.parent.inputElement)) {
            this.parent.inputElement.classList.remove('e-resize-enabled');
            this.parent.contentModule.getDocument().removeEventListener('mouseup', this.iframeMouseUpBoundFn);
        }
        if (!isNullOrUndefined(this.iframeElement)) {
            this.iframeElement.forEach(function (iframe) {
                _this.removeMouseUpEventListener(iframe);
                EventHandler.remove(iframe, 'load', _this.onIFrameLoad);
            });
        }
        if (this.resizer) {
            EventHandler.remove(this.resizer, 'mousedown', this.resizeStart);
            EventHandler.remove(this.resizer, this.touchStartEvent, this.resizeStart);
            detach(this.resizer);
        }
        this.parent.off(events.destroy, this.destroy);
        this.iframeMouseUpBoundFn = null;
    };
    Resize.prototype.iframeMouseUp = function (e) {
        if (this.isResizing) {
            this.stopResize(e);
        }
        else {
            return;
        }
    };
    /**
     * For internal use only - Get the module name.
     *
     * @returns {void}
     * @hidden
     */
    Resize.prototype.getModuleName = function () {
        return 'resize';
    };
    return Resize;
}());
export { Resize };
