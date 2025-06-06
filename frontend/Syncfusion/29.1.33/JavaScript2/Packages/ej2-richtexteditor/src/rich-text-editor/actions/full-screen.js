import { Browser, isNullOrUndefined as isNOU } from '@syncfusion/ej2-base';
import { getScrollableParent } from '@syncfusion/ej2-popups';
import * as events from '../base/constant';
import * as classes from '../base/classes';
import { addClass, removeClass } from '@syncfusion/ej2-base';
/**
 * `FullScreen` module is used to maximize and minimize screen
 */
var FullScreen = /** @class */ (function () {
    function FullScreen(parent) {
        this.parent = parent;
        this.addEventListener();
    }
    /**
     * showFullScreen method
     *
     * @param {MouseEvent} event - specifies the mouse event
     * @returns {void}
     * @hidden
     * @deprecated
     */
    FullScreen.prototype.showFullScreen = function (event) {
        var _this = this;
        if (this.parent.toolbarSettings.enable === true && this.parent.editorMode !== 'Markdown'
            && !isNOU(this.parent.quickToolbarModule)) {
            this.parent.quickToolbarModule.hideQuickToolbars();
        }
        if (this.parent.showTooltip && !isNOU(document.querySelector('.e-tooltip-wrap'))) {
            this.parent.notify(events.destroyTooltip, { args: event });
        }
        this.scrollableParent = getScrollableParent(this.parent.element);
        if (!this.parent.element.classList.contains(classes.CLS_FULL_SCREEN)) {
            var evenArgs = {
                cancel: false,
                requestType: 'Maximize',
                targetItem: 'Maximize',
                args: event
            };
            this.parent.trigger(events.actionBegin, evenArgs, function (beginEventArgs) {
                if (!beginEventArgs.cancel) {
                    if (_this.parent.toolbarSettings.enableFloating &&
                        !_this.parent.inlineMode.enable && _this.parent.toolbarSettings.enable) {
                        _this.parent.getToolbarElement().style.width = '100%';
                        _this.parent.getToolbarElement().style.top = '0px';
                    }
                    _this.parent.element.classList.add(classes.CLS_FULL_SCREEN);
                    _this.toggleParentOverflow(true);
                    if (_this.parent.toolbarModule) {
                        if (!_this.parent.getBaseToolbarObject().toolbarObj.items[0].properties) {
                            _this.parent.getBaseToolbarObject().toolbarObj.removeItems(0);
                        }
                        if (Browser.isDevice) {
                            _this.parent.toolbarModule.removeFixedTBarClass();
                        }
                        _this.parent.toolbarModule.updateItem({
                            targetItem: 'Maximize',
                            updateItem: 'Minimize',
                            baseToolbar: _this.parent.getBaseToolbarObject()
                        });
                    }
                    _this.parent.refreshUI();
                    _this.parent.trigger(events.actionComplete, { requestType: 'Maximize', targetItem: 'Maximize', args: event });
                }
            });
        }
    };
    /**
     * hideFullScreen method
     *
     * @param {MouseEvent} event - specifies the mouse event
     * @returns {void}
     * @hidden
     * @deprecated
     */
    FullScreen.prototype.hideFullScreen = function (event) {
        var _this = this;
        if (this.parent.toolbarSettings.enable === true && this.parent.editorMode !== 'Markdown'
            && !isNOU(this.parent.quickToolbarModule)) {
            this.parent.quickToolbarModule.hideQuickToolbars();
        }
        if (this.parent.showTooltip && !isNOU(document.querySelector('.e-tooltip-wrap'))) {
            this.parent.notify(events.destroyTooltip, { args: event });
        }
        if (this.parent.element.classList.contains(classes.CLS_FULL_SCREEN)) {
            var evenArgs = {
                cancel: false,
                requestType: 'Minimize',
                targetItem: 'Minimize',
                args: event
            };
            this.parent.trigger(events.actionBegin, evenArgs, function (beginEventArgs) {
                if (!beginEventArgs.cancel) {
                    _this.parent.element.classList.remove(classes.CLS_FULL_SCREEN);
                    var elem = document.querySelectorAll('.e-rte-overflow');
                    for (var i = 0; i < elem.length; i++) {
                        removeClass([elem[i]], ['e-rte-overflow']);
                    }
                    if (_this.parent.toolbarModule) {
                        if (!_this.parent.getBaseToolbarObject().toolbarObj.items[0].properties) {
                            _this.parent.getBaseToolbarObject().toolbarObj.removeItems(0);
                        }
                        _this.parent.toolbarModule.updateItem({
                            targetItem: 'Minimize',
                            updateItem: 'Maximize',
                            baseToolbar: _this.parent.getBaseToolbarObject()
                        });
                        if (Browser.isDevice && _this.parent.inlineMode.enable) {
                            _this.parent.toolbarModule.addFixedTBarClass();
                        }
                    }
                    _this.parent.refreshUI();
                    _this.parent.trigger(events.actionComplete, { requestType: 'Minimize', targetItem: 'Minimize', args: event });
                }
            });
        }
    };
    // eslint-disable-next-line
    FullScreen.prototype.toggleParentOverflow = function (isAdd) {
        if (isNOU(this.scrollableParent)) {
            return;
        }
        for (var i = 0; i < this.scrollableParent.length; i++) {
            if (this.scrollableParent[i].nodeName === '#document') {
                var elem = document.querySelector('body');
                addClass([elem], ['e-rte-overflow']);
            }
            else {
                var elem = this.scrollableParent[i];
                addClass([elem], ['e-rte-overflow']);
            }
        }
    };
    FullScreen.prototype.onKeyDown = function (event) {
        var originalEvent = event.args;
        switch (originalEvent.action) {
            case 'full-screen':
                this.showFullScreen(event.args);
                originalEvent.preventDefault();
                break;
            case 'escape':
                this.hideFullScreen(event.args);
                originalEvent.preventDefault();
                break;
        }
    };
    FullScreen.prototype.addEventListener = function () {
        this.parent.on(events.keyDown, this.onKeyDown, this);
        this.parent.on(events.destroy, this.destroy, this);
    };
    FullScreen.prototype.removeEventListener = function () {
        this.parent.off(events.keyDown, this.onKeyDown);
        this.parent.off(events.destroy, this.destroy);
    };
    /**
     * destroy method
     *
     * @returns {void}
     * @hidden
     * @deprecated
     */
    FullScreen.prototype.destroy = function () {
        if (isNOU(this.parent)) {
            return;
        }
        if (this.parent.element.classList.contains(classes.CLS_FULL_SCREEN)) {
            this.toggleParentOverflow(false);
        }
        var elem = document.querySelectorAll('.e-rte-overflow');
        for (var i = 0; i < elem.length; i++) {
            removeClass([elem[i]], ['e-rte-overflow']);
        }
        this.removeEventListener();
    };
    return FullScreen;
}());
export { FullScreen };
