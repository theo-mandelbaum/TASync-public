var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Property, Event, Collection, L10n, Complex, compile, createElement, animationMode } from '@syncfusion/ej2-base';
import { addClass, removeClass, detach, attributes, prepend, setStyleAttribute } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, ChildProperty, isBlazor } from '@syncfusion/ej2-base';
import { isNullOrUndefined, formatUnit, append, EventHandler, Draggable, extend } from '@syncfusion/ej2-base';
import { SanitizeHtmlHelper, Browser } from '@syncfusion/ej2-base';
import { Button } from '@syncfusion/ej2-buttons';
import { Popup, PositionData, getZindexPartial } from '../popup/popup';
import { createResize, removeResize, setMinHeight, setMaxWidth, setMaxHeight, resizeDestroy } from '../common/resize';
var ButtonProps = /** @class */ (function (_super) {
    __extends(ButtonProps, _super);
    function ButtonProps() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], ButtonProps.prototype, "isFlat", void 0);
    __decorate([
        Property()
    ], ButtonProps.prototype, "buttonModel", void 0);
    __decorate([
        Property('Button')
    ], ButtonProps.prototype, "type", void 0);
    __decorate([
        Event()
    ], ButtonProps.prototype, "click", void 0);
    return ButtonProps;
}(ChildProperty));
export { ButtonProps };
/**
 * Configures the animation properties for both open and close the dialog.
 */
var AnimationSettings = /** @class */ (function (_super) {
    __extends(AnimationSettings, _super);
    function AnimationSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Fade')
    ], AnimationSettings.prototype, "effect", void 0);
    __decorate([
        Property(400)
    ], AnimationSettings.prototype, "duration", void 0);
    __decorate([
        Property(0)
    ], AnimationSettings.prototype, "delay", void 0);
    return AnimationSettings;
}(ChildProperty));
export { AnimationSettings };
var ROOT = 'e-dialog';
var RTL = 'e-rtl';
var DLG_HEADER_CONTENT = 'e-dlg-header-content';
var DLG_HEADER = 'e-dlg-header';
var DLG_FOOTER_CONTENT = 'e-footer-content';
var MODAL_DLG = 'e-dlg-modal';
var DLG_CONTENT = 'e-dlg-content';
var DLG_CLOSE_ICON = 'e-icon-dlg-close';
var DLG_OVERLAY = 'e-dlg-overlay';
var DLG_TARGET = 'e-dlg-target';
var DLG_CONTAINER = 'e-dlg-container';
var SCROLL_DISABLED = 'e-scroll-disabled';
var DLG_PRIMARY_BUTTON = 'e-primary';
var ICON = 'e-icons';
var POPUP_ROOT = 'e-popup';
var DEVICE = 'e-device';
var FULLSCREEN = 'e-dlg-fullscreen';
var DLG_CLOSE_ICON_BTN = 'e-dlg-closeicon-btn';
var DLG_HIDE = 'e-popup-close';
var DLG_SHOW = 'e-popup-open';
var DLG_UTIL_DEFAULT_TITLE = 'Information';
var DLG_UTIL_ROOT = 'e-scroll-disabled';
var DLG_UTIL_ALERT = 'e-alert-dialog';
var DLG_UTIL_CONFIRM = 'e-confirm-dialog';
var DLG_RESIZABLE = 'e-dlg-resizable';
var DLG_RESTRICT_LEFT_VALUE = 'e-restrict-left';
var DLG_RESTRICT_WIDTH_VALUE = 'e-resize-viewport';
var DLG_REF_ELEMENT = 'e-dlg-ref-element';
var DLG_USER_ACTION_CLOSED = 'user action';
var DLG_CLOSE_ICON_CLOSED = 'close icon';
var DLG_ESCAPE_CLOSED = 'escape';
var DLG_OVERLAYCLICK_CLOSED = 'overlayClick';
var DLG_DRAG = 'e-draggable';
/**
 * Represents the dialog component that displays the information and get input from the user.
 * Two types of dialog components are `Modal and Modeless (non-modal)` depending on its interaction with parent application.
 * ```html
 * <div id="dialog"></div>
 * ```
 * ```typescript
 * <script>
 *   var dialogObj = new Dialog({ header: 'Dialog' });
 *   dialogObj.appendTo("#dialog");
 * </script>
 * ```
 */
var Dialog = /** @class */ (function (_super) {
    __extends(Dialog, _super);
    /*
     * * Constructor for creating the widget
     *
     * @param
     * @param
     * @hidden
     */
    function Dialog(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.needsID = true;
        return _this;
    }
    /**
     *Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Dialog.prototype.render = function () {
        this.initialize();
        this.initRender();
        this.wireEvents();
        if (this.width === '100%') {
            this.element.style.width = '';
        }
        if (this.minHeight !== '') {
            this.element.style.minHeight = formatUnit(this.minHeight);
        }
        if (this.enableResize) {
            this.setResize();
            if (this.isModal) {
                this.isModelResize = true;
            }
            if (this.animationSettings.effect === 'None') {
                this.getMinHeight();
            }
        }
        this.renderComplete();
    };
    Dialog.prototype.initializeValue = function () {
        this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
    };
    /**
     *Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    Dialog.prototype.preRender = function () {
        var _this = this;
        this.initializeValue();
        this.headerContent = null;
        this.allowMaxHeight = true;
        this.preventVisibility = true;
        this.clonedEle = this.element.cloneNode(true);
        this.closeIconClickEventHandler = function (event) {
            _this.dlgClosedBy = DLG_CLOSE_ICON_CLOSED;
            _this.hide(event);
        };
        this.dlgOverlayClickEventHandler = function (event) {
            _this.dlgClosedBy = DLG_OVERLAYCLICK_CLOSED;
            event.preventFocus = false;
            _this.trigger('overlayClick', event, function (overlayClickEventArgs) {
                if (!overlayClickEventArgs.preventFocus) {
                    _this.focusContent();
                }
                _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
            });
        };
        var localeText = { close: 'Close' };
        this.l10n = new L10n('dialog', localeText, this.locale);
        this.checkPositionData();
        if (isNullOrUndefined(this.target)) {
            var prevOnChange = this.isProtectedOnChange;
            this.isProtectedOnChange = true;
            this.target = document.body;
            this.isProtectedOnChange = prevOnChange;
        }
    };
    Dialog.prototype.updatePersistData = function () {
        if (this.enablePersistence) {
            this.setProperties({ width: parseFloat(this.element.style.width), height: parseFloat(this.element.style.height),
                position: { X: parseFloat(this.dragObj.element.style.left), Y: parseFloat(this.dragObj.element.style.top) } }, true);
        }
    };
    Dialog.prototype.isNumberValue = function (value) {
        var isNumber = /^[-+]?\d*\.?\d+$/.test(value);
        return isNumber;
    };
    Dialog.prototype.checkPositionData = function () {
        if (!isNullOrUndefined(this.position)) {
            if (!isNullOrUndefined(this.position.X) && (typeof (this.position.X) !== 'number')) {
                var isNumber = this.isNumberValue(this.position.X);
                if (isNumber) {
                    var prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    this.position.X = parseFloat(this.position.X);
                    this.isProtectedOnChange = prevOnChange;
                }
            }
            if (!isNullOrUndefined(this.position.Y) && (typeof (this.position.Y) !== 'number')) {
                var isNumber = this.isNumberValue(this.position.Y);
                if (isNumber) {
                    var prevOnChange = this.isProtectedOnChange;
                    this.isProtectedOnChange = true;
                    this.position.Y = parseFloat(this.position.Y);
                    this.isProtectedOnChange = prevOnChange;
                }
            }
        }
    };
    Dialog.prototype.getEle = function (list, selector) {
        var element = undefined;
        for (var i = 0; i < list.length; i++) {
            if (list[i].classList.contains(selector)) {
                element = list[i];
                break;
            }
        }
        return element;
    };
    /* istanbul ignore next */
    Dialog.prototype.getMinHeight = function () {
        var computedHeaderHeight = '0px';
        var computedFooterHeight = '0px';
        if (!isNullOrUndefined(this.element.querySelector('.' + DLG_HEADER_CONTENT))) {
            computedHeaderHeight = getComputedStyle(this.headerContent).height;
        }
        var footerEle = this.getEle(this.element.children, DLG_FOOTER_CONTENT);
        if (!isNullOrUndefined(footerEle)) {
            computedFooterHeight = getComputedStyle(footerEle).height;
        }
        var headerHeight = parseInt(computedHeaderHeight.slice(0, computedHeaderHeight.indexOf('p')), 10);
        var footerHeight = parseInt(computedFooterHeight.slice(0, computedFooterHeight.indexOf('p')), 10);
        setMinHeight(headerHeight + 30 + (isNaN(footerHeight) ? 0 : footerHeight));
        return (headerHeight + 30 + footerHeight);
    };
    Dialog.prototype.onResizeStart = function (args, dialogObj) {
        dialogObj.trigger('resizeStart', args);
        if (!args.cancel && this.isModelResize && !isNullOrUndefined(this.dlgContainer) && this.dlgContainer.classList.contains('e-dlg-' + this.position.X + '-' + this.position.Y)) {
            this.setPopupPosition();
            this.dlgContainer.classList.remove('e-dlg-' + this.position.X + '-' + this.position.Y);
            var targetType = this.getTargetContainer(this.target);
            if (targetType instanceof Element) {
                var computedStyle = window.getComputedStyle(targetType);
                if (computedStyle.getPropertyValue('direction') === 'rtl') {
                    this.element.style.position = 'absolute';
                }
                else {
                    this.element.style.position = 'relative';
                }
            }
            else {
                this.element.style.position = 'relative';
            }
            if (this.element.classList.contains(DLG_RESTRICT_LEFT_VALUE)) {
                this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            }
            this.isModelResize = false;
        }
        return args.cancel;
    };
    Dialog.prototype.onResizing = function (args, dialogObj) {
        dialogObj.trigger('resizing', args);
    };
    Dialog.prototype.onResizeComplete = function (args, dialogObj) {
        dialogObj.trigger('resizeStop', args);
        this.updatePersistData();
    };
    Dialog.prototype.setResize = function () {
        if (this.enableResize) {
            this.element.classList.add(DLG_RESIZABLE);
            var computedHeight = getComputedStyle(this.element).minHeight;
            var computedWidth = getComputedStyle(this.element).minWidth;
            var direction = '';
            for (var i = 0; i < this.resizeHandles.length; i++) {
                if (this.resizeHandles[i] === 'All') {
                    direction = 'south north east west north-east north-west south-east south-west';
                    break;
                }
                else {
                    var directionValue = '';
                    switch (this.resizeHandles[i].toString()) {
                        case 'SouthEast':
                            directionValue = 'south-east';
                            break;
                        case 'SouthWest':
                            directionValue = 'south-west';
                            break;
                        case 'NorthEast':
                            directionValue = 'north-east';
                            break;
                        case 'NorthWest':
                            directionValue = 'north-west';
                            break;
                        default:
                            directionValue = this.resizeHandles[i].toString();
                            break;
                    }
                    direction += directionValue.toLocaleLowerCase() + ' ';
                }
            }
            if (this.enableRtl && direction.trim() === 'south-east') {
                direction = 'south-west';
            }
            else if (this.enableRtl && direction.trim() === 'south-west') {
                direction = 'south-east';
            }
            if (this.isModal && this.enableRtl) {
                this.element.classList.add(DLG_RESTRICT_LEFT_VALUE);
            }
            else if (this.isModal && this.target === document.body) {
                this.element.classList.add(DLG_RESTRICT_WIDTH_VALUE);
            }
            createResize({
                element: this.element,
                direction: direction,
                minHeight: parseInt(computedHeight.slice(0, computedWidth.indexOf('p')), 10),
                maxHeight: this.targetEle.clientHeight,
                minWidth: parseInt(computedWidth.slice(0, computedWidth.indexOf('p')), 10),
                maxWidth: this.targetEle.clientWidth,
                boundary: this.target === document.body ? null : this.targetEle,
                resizeBegin: this.onResizeStart.bind(this),
                resizeComplete: this.onResizeComplete.bind(this),
                resizing: this.onResizing.bind(this),
                proxy: this
            });
            this.wireWindowResizeEvent();
        }
        else {
            removeResize();
            this.unWireWindowResizeEvent();
            if (this.isModal) {
                this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
            }
            else {
                this.element.classList.remove(DLG_RESTRICT_WIDTH_VALUE);
            }
            this.element.classList.remove(DLG_RESIZABLE);
        }
    };
    Dialog.prototype.getFocusElement = function (target) {
        var value = 'input,select,textarea,button:enabled,a,[contenteditable="true"],[tabindex]';
        var items = target.querySelectorAll(value);
        return { element: items[items.length - 1] };
    };
    /* istanbul ignore next */
    Dialog.prototype.keyDown = function (event) {
        var _this = this;
        if (event.keyCode === 9) {
            if (this.isModal) {
                var buttonObj = void 0;
                if (!isNullOrUndefined(this.btnObj)) {
                    buttonObj = this.btnObj[this.btnObj.length - 1];
                }
                if ((isNullOrUndefined(this.btnObj)) && (!isNullOrUndefined(this.ftrTemplateContent))) {
                    buttonObj = this.getFocusElement(this.ftrTemplateContent);
                }
                if (isNullOrUndefined(this.btnObj) && isNullOrUndefined(this.ftrTemplateContent) && !isNullOrUndefined(this.contentEle)) {
                    buttonObj = this.getFocusElement(this.contentEle);
                }
                if (!isNullOrUndefined(buttonObj) && document.activeElement === buttonObj.element && !event.shiftKey) {
                    event.preventDefault();
                    this.focusableElements(this.element).focus();
                }
                if (document.activeElement === this.focusableElements(this.element) && event.shiftKey) {
                    event.preventDefault();
                    if (!isNullOrUndefined(buttonObj)) {
                        buttonObj.element.focus();
                    }
                }
            }
        }
        var element = document.activeElement;
        var isTagName = (['input', 'textarea'].indexOf(element.tagName.toLowerCase()) > -1);
        var isContentEdit = false;
        if (!isTagName) {
            isContentEdit = element.hasAttribute('contenteditable') && element.getAttribute('contenteditable') === 'true';
        }
        if (event.keyCode === 27 && this.closeOnEscape) {
            this.dlgClosedBy = DLG_ESCAPE_CLOSED;
            var query = document.querySelector('.e-popup-open:not(.e-dialog)');
            // 'document.querySelector' is used to find the elements rendered based on body
            if (!(!isNullOrUndefined(query) && !query.classList.contains('e-toolbar-pop') && !query.classList.contains('e-slider-tooltip'))) {
                this.hide(event);
            }
        }
        if ((event.keyCode === 13 && !event.ctrlKey && element.tagName.toLowerCase() !== 'textarea' &&
            isTagName && !isNullOrUndefined(this.primaryButtonEle)) ||
            (event.keyCode === 13 && event.ctrlKey && (element.tagName.toLowerCase() === 'textarea' ||
                isContentEdit)) && !isNullOrUndefined(this.primaryButtonEle)) {
            var buttonIndex_1;
            var firstPrimary = this.buttons.some(function (data, index) {
                buttonIndex_1 = index;
                var buttonModel = data.buttonModel;
                return !isNullOrUndefined(buttonModel) && buttonModel.isPrimary === true;
            });
            if (firstPrimary && typeof (this.buttons[buttonIndex_1].click) === 'function' && !this.primaryButtonEle.disabled) {
                setTimeout(function () {
                    _this.buttons[buttonIndex_1].click.call(_this, event);
                });
            }
        }
    };
    /**
     * Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    Dialog.prototype.initialize = function () {
        if (!isNullOrUndefined(this.target)) {
            this.targetEle = ((typeof this.target) === 'string') ?
                document.querySelector(this.target) : this.target;
        }
        if (!this.isBlazorServerRender()) {
            addClass([this.element], ROOT);
        }
        if (Browser.isDevice) {
            addClass([this.element], DEVICE);
        }
        if (!this.isBlazorServerRender()) {
            this.setCSSClass();
        }
        this.setMaxHeight();
    };
    /**
     * Initialize the rendering
     *
     * @returns {void}
     * @private
     */
    Dialog.prototype.initRender = function () {
        var _this = this;
        this.initialRender = true;
        if (!this.isBlazorServerRender()) {
            attributes(this.element, { role: 'dialog' });
        }
        if (this.zIndex === 1000) {
            this.setzIndex(this.element, false);
            this.calculatezIndex = true;
        }
        else {
            this.calculatezIndex = false;
        }
        this.setTargetContent();
        if (this.header !== '' && !isNullOrUndefined(this.header)) {
            this.setHeader();
        }
        this.renderCloseIcon();
        this.setContent();
        if (this.footerTemplate !== '' && !isNullOrUndefined(this.footerTemplate)) {
            this.setFooterTemplate();
        }
        else if (!isNullOrUndefined(this.buttons[0]) && !isNullOrUndefined(this.buttons[0].buttonModel)) {
            this.setButton();
        }
        if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
            this.setAllowDragging();
        }
        attributes(this.element, { 'aria-modal': (this.isModal ? 'true' : 'false') });
        if (this.isModal) {
            this.setIsModal();
        }
        if (this.element.classList.contains(DLG_UTIL_ALERT) !== true && this.element.classList.contains(DLG_UTIL_CONFIRM) !== true
            && !isNullOrUndefined(this.element.parentElement)) {
            var parentEle = this.isModal ? this.dlgContainer.parentElement : this.element.parentElement;
            this.refElement = this.createElement('div', { className: DLG_REF_ELEMENT });
            parentEle.insertBefore(this.refElement, (this.isModal ? this.dlgContainer : this.element));
        }
        if (!isNullOrUndefined(this.targetEle)) {
            if (this.isModal) {
                this.targetEle.appendChild(this.dlgContainer);
            }
            else {
                this.targetEle.appendChild(this.element);
            }
        }
        this.popupObj = new Popup(this.element, {
            height: this.height,
            width: this.width,
            zIndex: this.zIndex,
            relateTo: this.target,
            actionOnScroll: 'none',
            enableRtl: this.enableRtl,
            // eslint-disable-next-line
            open: function (event) {
                var eventArgs = {
                    container: _this.isModal ? _this.dlgContainer : _this.element,
                    element: _this.element,
                    target: _this.target,
                    preventFocus: false
                };
                if (_this.enableResize) {
                    _this.resetResizeIcon();
                }
                _this.trigger('open', eventArgs, function (openEventArgs) {
                    if (!openEventArgs.preventFocus) {
                        _this.focusContent();
                    }
                });
            },
            // eslint-disable-next-line
            close: function (event) {
                if (_this.isModal) {
                    addClass([_this.dlgOverlay], 'e-fade');
                }
                _this.unBindEvent(_this.element);
                if (_this.isModal) {
                    _this.dlgContainer.style.display = 'none';
                }
                _this.trigger('close', _this.closeArgs);
                var activeEle = document.activeElement;
                if (!isNullOrUndefined(activeEle) && !isNullOrUndefined((activeEle).blur)) {
                    activeEle.blur();
                }
                if (!isNullOrUndefined(_this.storeActiveElement) && !isNullOrUndefined(_this.storeActiveElement.focus)) {
                    _this.storeActiveElement.focus();
                }
            }
        });
        this.positionChange();
        this.setEnableRTL();
        if (!this.isBlazorServerRender()) {
            addClass([this.element], DLG_HIDE);
            if (this.isModal) {
                this.setOverlayZindex();
            }
        }
        if (this.visible) {
            this.show();
            if (this.isModal) {
                var targetType = this.getTargetContainer(this.target);
                if (targetType instanceof Element) {
                    var computedStyle = window.getComputedStyle(targetType);
                    if (computedStyle.getPropertyValue('direction') === 'rtl') {
                        this.setPopupPosition();
                    }
                }
            }
        }
        else {
            if (this.isModal) {
                this.dlgOverlay.style.display = 'none';
            }
        }
        this.initialRender = false;
    };
    Dialog.prototype.getTargetContainer = function (targetValue) {
        var targetElement = null;
        if (typeof targetValue === 'string') {
            if (targetValue.startsWith('#')) {
                targetElement = document.getElementById(targetValue.substring(1));
            }
            else if (targetValue.startsWith('.')) {
                var elements = document.getElementsByClassName(targetValue.substring(1));
                targetElement = elements.length > 0 ? elements[0] : null;
            }
            else {
                if (!(targetValue instanceof HTMLElement) && targetValue !== document.body) {
                    targetElement = document.querySelector(targetValue);
                }
            }
        }
        else if (targetValue instanceof HTMLElement) {
            targetElement = targetValue;
        }
        return targetElement;
    };
    Dialog.prototype.resetResizeIcon = function () {
        var dialogConHeight = this.getMinHeight();
        if (this.targetEle.offsetHeight < dialogConHeight) {
            var className = this.enableRtl ? 'e-south-west' : 'e-south-east';
            var resizeIcon = this.element.querySelector('.' + className);
            if (!isNullOrUndefined(resizeIcon)) {
                resizeIcon.style.bottom = '-' + dialogConHeight.toString() + 'px';
            }
        }
    };
    Dialog.prototype.setOverlayZindex = function (zIndexValue) {
        var zIndex;
        if (isNullOrUndefined(zIndexValue)) {
            zIndex = parseInt(this.element.style.zIndex, 10) ? parseInt(this.element.style.zIndex, 10) : this.zIndex;
        }
        else {
            zIndex = zIndexValue;
        }
        this.dlgOverlay.style.zIndex = (zIndex - 1).toString();
        this.dlgContainer.style.zIndex = zIndex.toString();
    };
    Dialog.prototype.positionChange = function () {
        if (this.isModal) {
            if (!isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y))) {
                this.setPopupPosition();
            }
            else if ((!isNaN(parseFloat(this.position.X)) && isNaN(parseFloat(this.position.Y)))
                || (isNaN(parseFloat(this.position.X)) && !isNaN(parseFloat(this.position.Y)))) {
                this.setPopupPosition();
            }
            else {
                this.element.style.top = '0px';
                this.element.style.left = '0px';
                this.dlgContainer.classList.add('e-dlg-' + this.position.X + '-' + this.position.Y);
            }
        }
        else {
            this.setPopupPosition();
        }
    };
    Dialog.prototype.setPopupPosition = function () {
        this.popupObj.setProperties({
            position: {
                X: this.position.X, Y: this.position.Y
            }
        });
    };
    Dialog.prototype.setAllowDragging = function () {
        var _this = this;
        var handleContent = '.' + DLG_HEADER_CONTENT;
        if (!this.element.classList.contains(DLG_DRAG)) {
            this.dragObj = new Draggable(this.element, {
                clone: false,
                isDragScroll: true,
                abort: '.e-dlg-closeicon-btn',
                handle: handleContent,
                dragStart: function (event) {
                    _this.trigger('dragStart', event, function (dragEventArgs) {
                        if (isBlazor()) {
                            dragEventArgs.bindEvents(event.dragElement);
                        }
                    });
                },
                dragStop: function (event) {
                    if (_this.isModal) {
                        _this.IsDragStop = true;
                        if (!isNullOrUndefined(_this.position)) {
                            _this.dlgContainer.classList.remove('e-dlg-' + _this.position.X + '-' + _this.position.Y);
                        }
                        // Reset the dialog position after drag completion.
                        var targetType = _this.getTargetContainer(_this.target);
                        if (targetType instanceof Element) {
                            var computedStyle = window.getComputedStyle(targetType);
                            if (computedStyle.getPropertyValue('direction') === 'rtl') {
                                _this.element.style.position = 'absolute';
                            }
                            else {
                                _this.element.style.position = 'relative';
                            }
                        }
                        else {
                            _this.element.style.position = 'relative';
                        }
                    }
                    _this.trigger('dragStop', event);
                    _this.isModelResize = false;
                    _this.element.classList.remove(DLG_RESTRICT_LEFT_VALUE);
                    _this.updatePersistData();
                },
                drag: function (event) {
                    _this.trigger('drag', event);
                }
            });
            if (!isNullOrUndefined(this.targetEle)) {
                this.dragObj.dragArea = this.targetEle;
            }
        }
    };
    Dialog.prototype.setButton = function () {
        if (!this.isBlazorServerRender()) {
            this.buttonContent = [];
            this.btnObj = [];
            for (var i = 0; i < this.buttons.length; i++) {
                if (isNullOrUndefined(this.buttons[i].buttonModel)) {
                    continue;
                }
                var buttonType = !isNullOrUndefined(this.buttons[i].type) ?
                    this.buttons[i].type.toLowerCase() : 'button';
                var btn = this.createElement('button', { className: this.cssClass, attrs: { type: buttonType, tabindex: '0' } });
                this.buttonContent.push(btn.outerHTML);
            }
            this.setFooterTemplate();
        }
        var footerBtn;
        for (var i = 0, childNodes = this.element.children; i < childNodes.length; i++) {
            if (childNodes[i].classList.contains(DLG_FOOTER_CONTENT)) {
                footerBtn = childNodes[i].querySelectorAll('button');
            }
        }
        for (var i = 0; i < this.buttons.length; i++) {
            if (isNullOrUndefined(this.buttons[i].buttonModel)) {
                continue;
            }
            if (!this.isBlazorServerRender()) {
                this.btnObj[i] = new Button(this.buttons[i].buttonModel);
            }
            if (!isNullOrUndefined(this.ftrTemplateContent) && footerBtn.length > 0) {
                if (typeof (this.buttons[i].click) === 'function') {
                    EventHandler.add(footerBtn[i], 'click', this.buttons[i].click, this);
                }
                if (typeof (this.buttons[i].click) === 'object') {
                    EventHandler.add(footerBtn[i], 'click', this.buttonClickHandler.bind(this, i), this);
                }
            }
            if (!this.isBlazorServerRender() && !isNullOrUndefined(this.ftrTemplateContent)) {
                this.btnObj[i].appendTo(this.ftrTemplateContent.children[i]);
                if (this.buttons[i].isFlat) {
                    this.btnObj[i].element.classList.add('e-flat');
                }
                this.primaryButtonEle = this.element.getElementsByClassName('e-primary')[0];
            }
        }
    };
    Dialog.prototype.buttonClickHandler = function (index) {
        this.trigger('buttons[' + index + '].click', {});
    };
    Dialog.prototype.setContent = function () {
        this.contentEle = this.createElement('div', { className: DLG_CONTENT, id: this.element.id + '_dialog-content' });
        if (this.headerEle) {
            attributes(this.element, { 'aria-describedby': this.element.id + '_title' + ' ' + this.element.id + '_dialog-content' });
        }
        else {
            attributes(this.element, { 'aria-describedby': this.element.id + '_dialog-content' });
        }
        if (this.innerContentElement) {
            this.contentEle.appendChild(this.innerContentElement);
        }
        else if (!isNullOrUndefined(this.content) && this.content !== '' || !this.initialRender) {
            if (typeof (this.content) === 'string' && !isBlazor()) {
                this.setTemplate(this.content, this.contentEle, 'content');
            }
            else if (this.content instanceof HTMLElement) {
                this.contentEle.appendChild(this.content);
            }
            else {
                this.setTemplate(this.content, this.contentEle, 'content');
            }
        }
        if (!isNullOrUndefined(this.headerContent)) {
            this.element.insertBefore(this.contentEle, this.element.children[1]);
        }
        else {
            this.element.insertBefore(this.contentEle, this.element.children[0]);
        }
        if (this.height === 'auto') {
            if (!this.isBlazorServerRender() && Browser.isIE && this.element.style.width === '' && !isNullOrUndefined(this.width)) {
                this.element.style.width = formatUnit(this.width);
            }
            this.setMaxHeight();
        }
    };
    Dialog.prototype.setTemplate = function (template, toElement, prop) {
        var templateFn;
        var templateProps;
        if (toElement.classList.contains(DLG_HEADER)) {
            templateProps = this.element.id + 'header';
        }
        else if (toElement.classList.contains(DLG_FOOTER_CONTENT)) {
            templateProps = this.element.id + 'footerTemplate';
        }
        else {
            templateProps = this.element.id + 'content';
        }
        var templateValue;
        if (!isNullOrUndefined(template.outerHTML)) {
            toElement.appendChild(template);
        }
        else if ((typeof template === 'string') || (typeof template !== 'string') || (isBlazor() && !this.isStringTemplate)) {
            if ((typeof template === 'string')) {
                template = this.sanitizeHelper(template);
            }
            if (this.isVue || typeof template !== 'string') {
                templateFn = compile(template);
                templateValue = template;
            }
            else {
                toElement.innerHTML = template;
            }
        }
        var fromElements = [];
        if (!isNullOrUndefined(templateFn)) {
            var isString = (isBlazor() &&
                !this.isStringTemplate && (templateValue).indexOf('<div>Blazor') === 0) ?
                this.isStringTemplate : true;
            for (var _i = 0, _a = templateFn({}, this, prop, templateProps, isString); _i < _a.length; _i++) {
                var item = _a[_i];
                fromElements.push(item);
            }
            append([].slice.call(fromElements), toElement);
        }
    };
    /*
     * @returns {void}
     * @hidden
     * @value
     */
    Dialog.prototype.sanitizeHelper = function (value) {
        if (this.enableHtmlSanitizer) {
            var dialogItem = SanitizeHtmlHelper.beforeSanitize();
            var beforeEvent = {
                cancel: false,
                helper: null
            };
            extend(dialogItem, dialogItem, beforeEvent);
            this.trigger('beforeSanitizeHtml', dialogItem);
            if (dialogItem.cancel && !isNullOrUndefined(dialogItem.helper)) {
                value = dialogItem.helper(value);
            }
            else if (!dialogItem.cancel) {
                value = SanitizeHtmlHelper.serializeValue(dialogItem, value);
            }
        }
        return value;
    };
    Dialog.prototype.setMaxHeight = function () {
        if (!this.allowMaxHeight) {
            return;
        }
        var display = this.element.style.display;
        this.element.style.display = 'none';
        this.element.style.maxHeight = (!isNullOrUndefined(this.target)) && (this.targetEle.offsetHeight < window.innerHeight) ?
            (this.targetEle.offsetHeight - 20) + 'px' : (window.innerHeight - 20) + 'px';
        this.element.style.display = display;
        if (Browser.isIE && this.height === 'auto' && !isNullOrUndefined(this.contentEle)
            && this.element.offsetHeight < this.contentEle.offsetHeight) {
            this.element.style.height = 'inherit';
        }
    };
    Dialog.prototype.setEnableRTL = function () {
        if (!this.isBlazorServerRender()) {
            if (this.enableRtl) {
                addClass([this.element], RTL);
            }
            else {
                removeClass([this.element], RTL);
            }
        }
        if (!isNullOrUndefined(this.element.querySelector('.e-resize-handle'))) {
            removeResize();
            this.setResize();
        }
    };
    Dialog.prototype.setTargetContent = function () {
        var _this = this;
        if (isNullOrUndefined(this.content) || this.content === '') {
            var isContent = this.element.innerHTML.replace(/\s|<(\/?|\/?)(!--!--)>/g, '') !== '';
            if (this.element.children.length > 0 || isContent) {
                this.innerContentElement = document.createDocumentFragment();
                [].slice.call(this.element.childNodes).forEach(function (el) {
                    if (el.nodeType !== 8) {
                        _this.innerContentElement.appendChild(el);
                    }
                });
            }
        }
    };
    Dialog.prototype.setHeader = function () {
        if (this.headerEle) {
            this.headerEle.innerHTML = '';
        }
        else {
            this.headerEle = this.createElement('div', { id: this.element.id + '_title', className: DLG_HEADER });
        }
        this.createHeaderContent();
        this.headerContent.appendChild(this.headerEle);
        this.setTemplate(this.header, this.headerEle, 'header');
        attributes(this.element, { 'aria-describedby': this.element.id + '_title' });
        attributes(this.element, { 'aria-labelledby': this.element.id + '_dialog-header' });
        this.element.insertBefore(this.headerContent, this.element.children[0]);
        if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
            this.setAllowDragging();
        }
    };
    Dialog.prototype.setFooterTemplate = function () {
        if (this.ftrTemplateContent) {
            this.ftrTemplateContent.innerHTML = '';
        }
        else {
            this.ftrTemplateContent = this.createElement('div', {
                className: DLG_FOOTER_CONTENT
            });
        }
        if (this.footerTemplate !== '' && !isNullOrUndefined(this.footerTemplate)) {
            this.setTemplate(this.footerTemplate, this.ftrTemplateContent, 'footerTemplate');
        }
        else {
            this.ftrTemplateContent.innerHTML = this.buttonContent.join('');
        }
        this.element.appendChild(this.ftrTemplateContent);
    };
    Dialog.prototype.createHeaderContent = function () {
        if (isNullOrUndefined(this.headerContent)) {
            this.headerContent = this.createElement('div', { id: this.element.id + '_dialog-header', className: DLG_HEADER_CONTENT });
        }
    };
    Dialog.prototype.renderCloseIcon = function () {
        if (this.showCloseIcon) {
            this.closeIcon = this.createElement('button', { className: DLG_CLOSE_ICON_BTN, attrs: { type: 'button' } });
            this.closeIconBtnObj = new Button({ cssClass: 'e-flat', iconCss: DLG_CLOSE_ICON + ' ' + ICON });
            this.closeIconTitle();
            if (!isNullOrUndefined(this.headerContent)) {
                prepend([this.closeIcon], this.headerContent);
            }
            else {
                this.createHeaderContent();
                prepend([this.closeIcon], this.headerContent);
                this.element.insertBefore(this.headerContent, this.element.children[0]);
            }
            this.closeIconBtnObj.appendTo(this.closeIcon);
        }
    };
    Dialog.prototype.closeIconTitle = function () {
        this.l10n.setLocale(this.locale);
        var closeIconTitle = this.l10n.getConstant('close');
        this.closeIcon.setAttribute('title', closeIconTitle);
        this.closeIcon.setAttribute('aria-label', closeIconTitle);
    };
    Dialog.prototype.setCSSClass = function (oldCSSClass) {
        if (oldCSSClass) {
            removeClass([this.element], oldCSSClass.split(' '));
            if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
                removeClass([this.dlgContainer], oldCSSClass.split(' '));
            }
        }
        if (this.cssClass) {
            addClass([this.element], this.cssClass.split(' '));
            if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
                addClass([this.dlgContainer], this.cssClass.split(' '));
            }
        }
    };
    Dialog.prototype.setIsModal = function () {
        this.dlgContainer = this.createElement('div', { className: DLG_CONTAINER });
        this.setCSSClass();
        this.element.classList.remove(DLG_SHOW);
        this.element.parentNode.insertBefore(this.dlgContainer, this.element);
        this.dlgContainer.appendChild(this.element);
        addClass([this.element], MODAL_DLG);
        this.dlgOverlay = this.createElement('div', { className: DLG_OVERLAY });
        this.dlgOverlay.style.zIndex = (this.zIndex - 1).toString();
        this.dlgContainer.appendChild(this.dlgOverlay);
    };
    Dialog.prototype.getValidFocusNode = function (items) {
        var node;
        for (var u = 0; u < items.length; u++) {
            node = items[u];
            if ((node.clientHeight > 0 || (node.tagName.toLowerCase() === 'a' && node.hasAttribute('href'))) && node.tabIndex > -1 &&
                !node.disabled && !this.disableElement(node, '[disabled],[aria-disabled="true"],[type="hidden"]')) {
                return node;
            }
            else {
                node = null;
            }
        }
        return node;
    };
    Dialog.prototype.focusableElements = function (content) {
        if (!isNullOrUndefined(content)) {
            var value = 'input,select,textarea,button,a,[contenteditable="true"],[tabindex]';
            var items = content.querySelectorAll(value);
            return this.getValidFocusNode(items);
        }
        return null;
    };
    Dialog.prototype.getAutoFocusNode = function (container) {
        var node = container.querySelector('.' + DLG_CLOSE_ICON_BTN);
        var value = '[autofocus]';
        var items = container.querySelectorAll(value);
        var validNode = this.getValidFocusNode(items);
        if (isBlazor()) {
            this.primaryButtonEle = this.element.getElementsByClassName('e-primary')[0];
        }
        if (!isNullOrUndefined(validNode)) {
            node = validNode;
        }
        else {
            validNode = this.focusableElements(this.contentEle);
            if (!isNullOrUndefined(validNode)) {
                return node = validNode;
            }
            else if (!isNullOrUndefined(this.primaryButtonEle)) {
                return this.element.querySelector('.' + DLG_PRIMARY_BUTTON);
            }
        }
        return node;
    };
    Dialog.prototype.disableElement = function (element, t) {
        var elementMatch = element ? element.matches || element.webkitMatchesSelector || element.msGetRegionContent : null;
        if (elementMatch) {
            for (; element; element = element.parentNode) {
                if (element instanceof Element && elementMatch.call(element, t)) {
                    /* istanbul ignore next */
                    return element;
                }
            }
        }
        return null;
    };
    Dialog.prototype.focusContent = function () {
        var element = this.getAutoFocusNode(this.element);
        var node = !isNullOrUndefined(element) ? element : this.element;
        var userAgent = Browser.userAgent;
        if (userAgent.indexOf('MSIE ') > 0 || userAgent.indexOf('Trident/') > 0) {
            this.element.focus();
        }
        node.focus();
        this.unBindEvent(this.element);
        this.bindEvent(this.element);
    };
    Dialog.prototype.bindEvent = function (element) {
        EventHandler.add(element, 'keydown', this.keyDown, this);
    };
    Dialog.prototype.unBindEvent = function (element) {
        EventHandler.remove(element, 'keydown', this.keyDown);
    };
    Dialog.prototype.updateSanitizeContent = function () {
        if (!this.isBlazorServerRender()) {
            this.contentEle.innerHTML = this.sanitizeHelper(this.content);
        }
    };
    Dialog.prototype.isBlazorServerRender = function () {
        return isBlazor() && this.isServerRendered;
    };
    /**
     * Module required function
     *
     * @returns {void}
     * @private
     */
    Dialog.prototype.getModuleName = function () {
        return 'dialog';
    };
    /**
     * Called internally if any of the property value changed
     *
     * @param {DialogModel} newProp - specifies the new property
     * @param {DialogModel} oldProp - specifies the old property
     * @private
     * @returns {void}
     */
    Dialog.prototype.onPropertyChanged = function (newProp, oldProp) {
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'content':
                    if (!isNullOrUndefined(this.content) && this.content !== '') {
                        if (this.isBlazorServerRender()) {
                            this.contentEle = this.element.querySelector('.e-dlg-content');
                        }
                        if (!isNullOrUndefined(this.contentEle) && this.contentEle.getAttribute('role') !== 'dialog') {
                            if (!this.isBlazorServerRender()) {
                                this.contentEle.innerHTML = '';
                            }
                            if (typeof (this.content) === 'function') {
                                this.clearTemplate(['content']);
                                detach(this.contentEle);
                                this.contentEle = null;
                                this.setContent();
                            }
                            else {
                                if (typeof (this.content) === 'string') {
                                    this.updateSanitizeContent();
                                }
                                else {
                                    this.contentEle.appendChild(this.content);
                                }
                            }
                            this.setMaxHeight();
                        }
                        else {
                            this.setContent();
                        }
                    }
                    else if (!isNullOrUndefined(this.contentEle)) {
                        detach(this.contentEle);
                        this.contentEle = null;
                    }
                    break;
                case 'header':
                    if (this.header === '' || isNullOrUndefined(this.header)) {
                        if (this.headerEle) {
                            detach(this.headerEle);
                            this.headerEle = null;
                        }
                    }
                    else {
                        this.setHeader();
                    }
                    break;
                case 'footerTemplate':
                    if (this.footerTemplate === '' || isNullOrUndefined(this.footerTemplate)) {
                        if (!this.ftrTemplateContent) {
                            return;
                        }
                        detach(this.ftrTemplateContent);
                        this.ftrTemplateContent = null;
                        this.buttons = [{}];
                    }
                    else {
                        this.setFooterTemplate();
                        this.buttons = [{}];
                    }
                    break;
                case 'showCloseIcon':
                    if (this.element.getElementsByClassName(DLG_CLOSE_ICON).length > 0) {
                        if (!this.showCloseIcon && (this.header === '' || isNullOrUndefined(this.header))) {
                            detach(this.headerContent);
                            this.headerContent = null;
                        }
                        else if (!this.showCloseIcon) {
                            detach(this.closeIcon);
                        }
                    }
                    else {
                        this.renderCloseIcon();
                        this.wireEvents();
                    }
                    break;
                case 'locale':
                    if (this.showCloseIcon) {
                        this.closeIconTitle();
                    }
                    break;
                case 'visible':
                    if (this.visible) {
                        this.show();
                    }
                    else {
                        this.hide();
                    }
                    break;
                case 'isModal':
                    this.updateIsModal();
                    break;
                case 'height':
                    setStyleAttribute(this.element, { 'height': formatUnit(newProp.height) });
                    this.updatePersistData();
                    break;
                case 'width':
                    setStyleAttribute(this.element, { 'width': formatUnit(newProp.width) });
                    this.updatePersistData();
                    break;
                case 'zIndex':
                    this.popupObj.zIndex = this.zIndex;
                    if (this.isModal) {
                        this.setOverlayZindex(this.zIndex);
                    }
                    if (this.element.style.zIndex !== this.zIndex.toString()) {
                        this.calculatezIndex = false;
                    }
                    break;
                case 'cssClass':
                    this.setCSSClass(oldProp.cssClass);
                    break;
                case 'buttons': {
                    this.unWireButtonEvents();
                    this.destroyButtons();
                    if (!isNullOrUndefined(this.ftrTemplateContent)) {
                        detach(this.ftrTemplateContent);
                        this.ftrTemplateContent = null;
                    }
                    this.footerTemplate = '';
                    this.setButton();
                    break;
                }
                case 'allowDragging':
                    if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
                        this.setAllowDragging();
                    }
                    else {
                        this.dragObj.destroy();
                    }
                    break;
                case 'target':
                    this.setTarget(newProp.target);
                    break;
                case 'position':
                    this.checkPositionData();
                    if (this.isModal) {
                        var positionX = this.position.X;
                        var positionY = this.position.Y;
                        if (!isNullOrUndefined(oldProp.position)) {
                            if (!isNullOrUndefined(oldProp.position.X)) {
                                positionX = oldProp.position.X;
                            }
                            if (!isNullOrUndefined(oldProp.position.Y)) {
                                positionY = oldProp.position.Y;
                            }
                        }
                        if (this.dlgContainer.classList.contains('e-dlg-' + positionX + '-' + positionY)) {
                            this.dlgContainer.classList.remove('e-dlg-' + positionX + '-' + positionY);
                        }
                    }
                    this.positionChange();
                    this.updatePersistData();
                    break;
                case 'enableRtl':
                    this.setEnableRTL();
                    break;
                case 'enableResize':
                    this.setResize();
                    this.isModelResize = this.enableResize && this.isModal;
                    if (this.enableResize && this.dialogOpen) {
                        this.resetResizeIcon();
                    }
                    break;
                case 'minHeight':
                    if (this.minHeight !== '') {
                        this.element.style.minHeight = formatUnit(this.minHeight);
                    }
                    break;
            }
        }
    };
    Dialog.prototype.setTarget = function (target) {
        this.popupObj.relateTo = target;
        this.target = target;
        this.targetEle = ((typeof this.target) === 'string') ?
            document.querySelector(this.target) : this.target;
        if (this.dragObj) {
            this.dragObj.dragArea = this.targetEle;
        }
        this.setMaxHeight();
        if (this.isModal) {
            this.updateIsModal();
        }
        if (this.enableResize) {
            this.setResize();
        }
        if (!isNullOrUndefined(this.targetEle)) {
            if (this.isModal && !isNullOrUndefined(this.dlgContainer)) {
                this.targetEle.appendChild(this.dlgContainer);
            }
            else if (!isNullOrUndefined(this.element)) {
                this.targetEle.appendChild(this.element);
            }
        }
    };
    Dialog.prototype.updateIsModal = function () {
        this.element.setAttribute('aria-modal', this.isModal ? 'true' : 'false');
        if (this.isModal) {
            if (isNullOrUndefined(this.dlgOverlay)) {
                this.setIsModal();
                this.element.style.top = '0px';
                this.element.style.left = '0px';
                if (!isNullOrUndefined(this.targetEle)) {
                    this.targetEle.appendChild(this.dlgContainer);
                }
            }
        }
        else {
            removeClass([this.element], MODAL_DLG);
            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            detach(this.dlgOverlay);
            while (this.dlgContainer.firstChild) {
                this.dlgContainer.parentElement.insertBefore(this.dlgContainer.firstChild, this.dlgContainer);
            }
            this.dlgContainer.parentElement.removeChild(this.dlgContainer);
        }
        if (this.visible) {
            this.show();
        }
        this.positionChange();
        if (this.isModal && this.dlgOverlay) {
            EventHandler.add(this.dlgOverlay, 'click', this.dlgOverlayClickEventHandler, this);
        }
    };
    Dialog.prototype.setzIndex = function (zIndexElement, setPopupZindex) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        var currentzIndex = getZindexPartial(zIndexElement);
        this.zIndex = currentzIndex > this.zIndex ? currentzIndex : this.zIndex;
        this.isProtectedOnChange = prevOnChange;
        if (setPopupZindex) {
            this.popupObj.zIndex = this.zIndex;
        }
    };
    Dialog.prototype.windowResizeHandler = function () {
        setMaxWidth(this.targetEle.clientWidth);
        setMaxHeight(this.targetEle.clientHeight);
        this.setMaxHeight();
    };
    /**
     * Get the properties to be maintained in the persisted state.
     *
     * @returns {void}
     * @private
     */
    Dialog.prototype.getPersistData = function () {
        return this.addOnPersist(['width', 'height', 'position']);
    };
    Dialog.prototype.removeAllChildren = function (element) {
        while (element.children[0]) {
            this.removeAllChildren(element.children[0]);
            element.removeChild(element.children[0]);
        }
    };
    /**
     * To destroy the widget
     *
     * @returns {void}
     */
    Dialog.prototype.destroy = function () {
        if (this.isDestroyed) {
            return;
        }
        var classArray = [RTL, MODAL_DLG, DLG_RESIZABLE, DLG_RESTRICT_LEFT_VALUE, FULLSCREEN, DEVICE];
        var attrs = ['role', 'aria-modal', 'aria-labelledby', 'aria-describedby', 'aria-grabbed', 'tabindex', 'style'];
        removeClass([this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
        if (!isNullOrUndefined(this.element) && this.element.classList.contains(FULLSCREEN)) {
            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
        }
        if (this.isModal) {
            removeClass([(!isNullOrUndefined(this.targetEle) ? this.targetEle : document.body)], SCROLL_DISABLED);
        }
        this.unWireEvents();
        this.unWireButtonEvents();
        this.destroyButtons();
        if (!isNullOrUndefined(this.closeIconBtnObj)) {
            this.closeIconBtnObj.destroy();
        }
        if (!isNullOrUndefined(this.dragObj)) {
            this.dragObj.destroy();
        }
        if (!isNullOrUndefined(this.popupObj.element) && this.popupObj.element.classList.contains(POPUP_ROOT)) {
            this.popupObj.destroy();
        }
        removeClass([this.element], classArray);
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            removeClass([this.element], this.cssClass.split(' '));
        }
        if (!isNullOrUndefined(this.refElement) && !isNullOrUndefined(this.refElement.parentElement)) {
            this.refElement.parentElement.insertBefore((this.isModal ? this.dlgContainer : this.element), this.refElement);
            detach(this.refElement);
            this.refElement = undefined;
        }
        if (this.isModal) {
            detach(this.dlgOverlay);
            this.dlgContainer.parentNode.insertBefore(this.element, this.dlgContainer);
            detach(this.dlgContainer);
        }
        this.element.innerHTML = this.clonedEle.innerHTML;
        for (var i = 0; i < attrs.length; i++) {
            this.element.removeAttribute(attrs[i]);
        }
        this.ftrTemplateContent = null;
        this.headerContent = null;
        if (!this.isReact && !this.isVue && !isNullOrUndefined(this.contentEle)) {
            this.removeAllChildren(this.contentEle);
        }
        this.contentEle = null;
        resizeDestroy();
        _super.prototype.destroy.call(this);
        // eslint-disable-next-line
        if (this.isReact) {
            this.clearTemplate();
        }
    };
    Dialog.prototype.wireWindowResizeEvent = function () {
        this.boundWindowResizeHandler = this.windowResizeHandler.bind(this);
        window.addEventListener('resize', this.boundWindowResizeHandler);
    };
    Dialog.prototype.unWireWindowResizeEvent = function () {
        window.removeEventListener('resize', this.boundWindowResizeHandler);
        this.boundWindowResizeHandler = null;
    };
    /**
     * Binding event to the element while widget creation
     *
     * @returns {void}
     * @hidden
     */
    Dialog.prototype.wireEvents = function () {
        if (this.showCloseIcon) {
            EventHandler.add(this.closeIcon, 'click', this.closeIconClickEventHandler, this);
        }
        if (this.isModal && this.dlgOverlay) {
            EventHandler.add(this.dlgOverlay, 'click', this.dlgOverlayClickEventHandler, this);
        }
    };
    /**
     * Unbinding event to the element while widget destroy
     *
     * @returns {void}
     * @hidden
     */
    Dialog.prototype.unWireEvents = function () {
        if (this.showCloseIcon) {
            EventHandler.remove(this.closeIcon, 'click', this.closeIconClickEventHandler);
        }
        if (this.isModal) {
            EventHandler.remove(this.dlgOverlay, 'click', this.dlgOverlayClickEventHandler);
        }
    };
    /**
     * Refreshes the dialog's position when the user changes its header and footer height/width dynamically.
     *
     * @returns {void}
     */
    Dialog.prototype.refreshPosition = function () {
        this.popupObj.refreshPosition();
        if (this.element.classList.contains(MODAL_DLG)) {
            this.positionChange();
        }
    };
    /**
     * Returns the current width and height of the Dialog
     *
     * @returns {DialogDimension}- returns the dialog element Dimension.
     * @public
     */
    Dialog.prototype.getDimension = function () {
        var dialogWidth = this.element.offsetWidth;
        var dialogHeight = this.element.offsetHeight;
        return { width: dialogWidth, height: dialogHeight };
    };
    /**
     * Opens the dialog if it is in hidden state.
     * To open the dialog with full screen width, set the parameter to true.
     *
     * @param { boolean } isFullScreen - Enable the fullScreen Dialog.
     * @returns {void}
     */
    Dialog.prototype.show = function (isFullScreen) {
        var _this = this;
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        if (!this.element.classList.contains(DLG_SHOW) || (!isNullOrUndefined(isFullScreen))) {
            if (!isNullOrUndefined(isFullScreen)) {
                this.fullScreen(isFullScreen);
            }
            var eventArgs_1 = isBlazor() ? {
                cancel: false,
                element: this.element,
                container: this.isModal ? this.dlgContainer : this.element,
                maxHeight: this.element.style.maxHeight
            } : {
                cancel: false,
                element: this.element,
                container: this.isModal ? this.dlgContainer : this.element,
                target: this.target,
                maxHeight: this.element.style.maxHeight
            };
            this.trigger('beforeOpen', eventArgs_1, function (beforeOpenArgs) {
                if (!beforeOpenArgs.cancel) {
                    if (_this.element.style.maxHeight !== eventArgs_1.maxHeight) {
                        _this.allowMaxHeight = false;
                        _this.element.style.maxHeight = eventArgs_1.maxHeight;
                    }
                    if (_this.enableResize && _this.boundWindowResizeHandler == null && !_this.initialRender) {
                        _this.wireWindowResizeEvent();
                    }
                    _this.storeActiveElement = document.activeElement;
                    _this.element.tabIndex = -1;
                    if (_this.isModal && (!isNullOrUndefined(_this.dlgOverlay))) {
                        _this.dlgOverlay.style.display = 'block';
                        _this.dlgContainer.style.display = 'flex';
                        removeClass([_this.dlgOverlay], 'e-fade');
                        if (!isNullOrUndefined(_this.targetEle)) {
                            if (_this.targetEle === document.body) {
                                _this.dlgContainer.style.position = 'fixed';
                            }
                            else {
                                _this.dlgContainer.style.position = 'absolute';
                            }
                            _this.dlgOverlay.style.position = 'absolute';
                            var targetType = _this.getTargetContainer(_this.target);
                            if (targetType instanceof Element) {
                                var computedStyle = window.getComputedStyle(targetType);
                                if (computedStyle.getPropertyValue('direction') === 'rtl') {
                                    _this.element.style.position = 'absolute';
                                }
                                else {
                                    _this.element.style.position = 'relative';
                                }
                            }
                            else {
                                _this.element.style.position = 'relative';
                            }
                            addClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
                        }
                        else {
                            addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
                        }
                    }
                    var openAnimation = {
                        name: (_this.animationSettings.effect === 'None' && animationMode === 'Enable') ? 'Zoom' + 'In' : _this.animationSettings.effect + 'In',
                        duration: _this.animationSettings.duration,
                        delay: _this.animationSettings.delay
                    };
                    var zIndexElement = (_this.isModal) ? _this.element.parentElement : _this.element;
                    if (_this.calculatezIndex) {
                        _this.setzIndex(zIndexElement, true);
                        setStyleAttribute(_this.element, { 'zIndex': _this.zIndex });
                        if (_this.isModal) {
                            _this.setOverlayZindex(_this.zIndex);
                        }
                    }
                    // eslint-disable-next-line
                    (_this.animationSettings.effect === 'None' && animationMode === 'Enable') ? _this.popupObj.show(openAnimation) : ((_this.animationSettings.effect === 'None') ? _this.popupObj.show() : _this.popupObj.show(openAnimation));
                    if (_this.isModal) {
                        var targetType = _this.getTargetContainer(_this.target);
                        if (targetType instanceof Element) {
                            var computedStyle = window.getComputedStyle(targetType);
                            if (computedStyle.getPropertyValue('direction') === 'rtl' && !_this.IsDragStop) {
                                _this.setPopupPosition();
                            }
                        }
                    }
                    _this.dialogOpen = true;
                    var prevOnChange = _this.isProtectedOnChange;
                    _this.isProtectedOnChange = true;
                    _this.visible = true;
                    _this.preventVisibility = true;
                    _this.isProtectedOnChange = prevOnChange;
                }
            });
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isReact) {
            this.renderReactTemplates();
        }
    };
    /**
     * Closes the dialog if it is in visible state.
     *
     * @param { Event } event - specifies the event
     * @returns {void}
     */
    Dialog.prototype.hide = function (event) {
        var _this = this;
        if (!this.element.classList.contains(ROOT)) {
            return;
        }
        if (this.preventVisibility) {
            var eventArgs = isBlazor() ? {
                cancel: false,
                isInteracted: event ? true : false,
                element: this.element,
                container: this.isModal ? this.dlgContainer : this.element,
                event: event
            } : {
                cancel: false,
                isInteracted: event ? true : false,
                element: this.element,
                target: this.target,
                container: this.isModal ? this.dlgContainer : this.element,
                event: event,
                closedBy: this.dlgClosedBy
            };
            this.closeArgs = eventArgs;
            this.trigger('beforeClose', eventArgs, function (beforeCloseArgs) {
                if (!beforeCloseArgs.cancel) {
                    if (_this.enableResize) {
                        _this.unWireWindowResizeEvent();
                    }
                    var closeAnimation = {
                        name: (_this.animationSettings.effect === 'None' && animationMode === 'Enable') ? 'Zoom' + 'Out' : _this.animationSettings.effect + 'Out',
                        duration: _this.animationSettings.duration,
                        delay: _this.animationSettings.delay
                    };
                    if (_this.animationSettings.effect === 'None' && animationMode === 'Enable') {
                        _this.popupObj.hide(closeAnimation);
                    }
                    else if (_this.animationSettings.effect === 'None') {
                        _this.popupObj.hide();
                    }
                    else {
                        _this.popupObj.hide(closeAnimation);
                    }
                    setTimeout(function () {
                        if (_this.isModal) {
                            if (!isNullOrUndefined(_this.targetEle) && _this.targetEle.classList.contains(DLG_TARGET) &&
                                _this.targetEle.classList.contains(SCROLL_DISABLED)) {
                                removeClass([_this.targetEle], [DLG_TARGET, SCROLL_DISABLED]);
                            }
                        }
                        if (document.body.classList.contains(DLG_TARGET) &&
                            document.body.classList.contains(SCROLL_DISABLED)) {
                            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
                        }
                    }, (_this.animationSettings.duration + _this.animationSettings.delay));
                    _this.dialogOpen = false;
                    var prevOnChange = _this.isProtectedOnChange;
                    _this.isProtectedOnChange = true;
                    _this.visible = false;
                    _this.preventVisibility = false;
                    _this.isProtectedOnChange = prevOnChange;
                }
                _this.dlgClosedBy = DLG_USER_ACTION_CLOSED;
            });
        }
    };
    /**
     * Specifies to view the Full screen Dialog.
     *
     * @param {boolean} args - specifies the arguments
     * @returns {boolean} - returns the boolean value
     * @private
     */
    Dialog.prototype.fullScreen = function (args) {
        /* eslint-disable */
        var top = this.element.offsetTop;
        var left = this.element.offsetLeft;
        /* eslint-enable */
        if (args) {
            if (!this.isModal) {
                this.element.style.top = document.scrollingElement.scrollTop + 'px';
            }
            addClass([this.element], FULLSCREEN);
            var display = this.element.style.display;
            this.element.style.display = 'none';
            this.element.style.maxHeight = (!isNullOrUndefined(this.target)) ?
                (this.targetEle.offsetHeight) + 'px' : (window.innerHeight) + 'px';
            this.element.style.display = display;
            addClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            if (this.allowDragging && !isNullOrUndefined(this.dragObj)) {
                this.dragObj.destroy();
            }
        }
        else {
            removeClass([this.element], FULLSCREEN);
            removeClass([document.body], [DLG_TARGET, SCROLL_DISABLED]);
            if (this.allowDragging && (!isNullOrUndefined(this.headerContent))) {
                this.setAllowDragging();
            }
        }
        return args;
    };
    /**
     * Returns the dialog button instances.
     * Based on that, you can dynamically change the button states.
     *
     * @param { number } index - Index of the button.
     * @returns {Button} - returns the button element
     */
    Dialog.prototype.getButtons = function (index) {
        if (!isNullOrUndefined(index)) {
            return this.btnObj[index];
        }
        return this.btnObj;
    };
    Dialog.prototype.unWireButtonEvents = function () {
        if (this.buttons.length > 0 && this.footerTemplate === '' && this.ftrTemplateContent) {
            for (var i = 0; i < this.buttons.length; i++) {
                if (this.buttons[i].click && typeof (this.buttons[i].click) === 'function'
                    && this.ftrTemplateContent.children[i]) {
                    EventHandler.remove(this.ftrTemplateContent.children[i], 'click', this.buttons[i].click);
                }
            }
        }
    };
    Dialog.prototype.destroyButtons = function () {
        if (!isNullOrUndefined(this.btnObj)) {
            for (var i = 0; i < this.btnObj.length; i++) {
                if (this.btnObj[i] && !this.btnObj[i].isDestroyed) {
                    this.btnObj[i].destroy();
                }
            }
        }
    };
    __decorate([
        Property('')
    ], Dialog.prototype, "content", void 0);
    __decorate([
        Property(true)
    ], Dialog.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property(false)
    ], Dialog.prototype, "enablePersistence", void 0);
    __decorate([
        Property(false)
    ], Dialog.prototype, "showCloseIcon", void 0);
    __decorate([
        Property(false)
    ], Dialog.prototype, "isModal", void 0);
    __decorate([
        Property('')
    ], Dialog.prototype, "header", void 0);
    __decorate([
        Property(true)
    ], Dialog.prototype, "visible", void 0);
    __decorate([
        Property(false)
    ], Dialog.prototype, "enableResize", void 0);
    __decorate([
        Property(['South-East'])
    ], Dialog.prototype, "resizeHandles", void 0);
    __decorate([
        Property('auto')
    ], Dialog.prototype, "height", void 0);
    __decorate([
        Property('')
    ], Dialog.prototype, "minHeight", void 0);
    __decorate([
        Property('100%')
    ], Dialog.prototype, "width", void 0);
    __decorate([
        Property('')
    ], Dialog.prototype, "cssClass", void 0);
    __decorate([
        Property(1000)
    ], Dialog.prototype, "zIndex", void 0);
    __decorate([
        Property(null)
    ], Dialog.prototype, "target", void 0);
    __decorate([
        Property('')
    ], Dialog.prototype, "footerTemplate", void 0);
    __decorate([
        Property(false)
    ], Dialog.prototype, "allowDragging", void 0);
    __decorate([
        Collection([{}], ButtonProps)
    ], Dialog.prototype, "buttons", void 0);
    __decorate([
        Property(true)
    ], Dialog.prototype, "closeOnEscape", void 0);
    __decorate([
        Complex({}, AnimationSettings)
    ], Dialog.prototype, "animationSettings", void 0);
    __decorate([
        Complex({ X: 'center', Y: 'center' }, PositionData)
    ], Dialog.prototype, "position", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "created", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "open", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "beforeSanitizeHtml", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "beforeOpen", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "close", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "beforeClose", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "dragStart", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "dragStop", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "drag", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "overlayClick", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "resizeStart", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "resizeStop", void 0);
    __decorate([
        Event()
    ], Dialog.prototype, "destroyed", void 0);
    Dialog = __decorate([
        NotifyPropertyChanges
    ], Dialog);
    return Dialog;
}(Component));
export { Dialog };
/**
 * Base for creating Alert and Confirmation Dialog through util method.
 */
// eslint-disable-next-line
export var DialogUtility;
(function (DialogUtility) {
    /**
     * An alert dialog box is used to display warning like messages to the users.
     * ```
     * Eg : DialogUtility.alert('Alert message');
     *
     * ```
     */
    /* istanbul ignore next */
    /**
     *
     * @param {AlertDialogArgs} args - specifies the string
     * @returns {Dialog} - returns the dialog element.
     */
    function alert(args) {
        var dialogElement = createElement('div', { 'className': DLG_UTIL_ALERT });
        document.body.appendChild(dialogElement);
        var alertDialogObj;
        var okButtonModel = [{
                buttonModel: { isPrimary: true, content: 'OK' },
                click: function () {
                    this.hide();
                }
            }];
        if (typeof (args) === 'string') {
            alertDialogObj = createDialog({ content: args,
                position: { X: 'center', Y: 'top' },
                isModal: true, header: DLG_UTIL_DEFAULT_TITLE,
                buttons: okButtonModel }, dialogElement);
        }
        else {
            alertDialogObj = createDialog(alertOptions(args), dialogElement);
        }
        alertDialogObj.close = function () {
            if (args && args.close) {
                args.close.apply(alertDialogObj);
            }
            alertDialogObj.destroy();
            if (alertDialogObj.element.classList.contains('e-dlg-modal')) {
                alertDialogObj.element.parentElement.remove();
                alertDialogObj.target.classList.remove(DLG_UTIL_ROOT);
            }
            else {
                alertDialogObj.element.remove();
            }
        };
        return alertDialogObj;
    }
    DialogUtility.alert = alert;
    /**
     * A confirm dialog displays a specified message along with ‘OK’ and ‘Cancel’ button.
     * ```
     * Eg : DialogUtility.confirm('Confirm dialog message');
     *
     * ```
     */
    /* istanbul ignore next */
    /**
     *
     * @param {ConfirmDialogArgs} args - specifies the args
     * @returns {Dialog} - returns te element
     */
    function confirm(args) {
        var dialogElement = createElement('div', { 'className': DLG_UTIL_CONFIRM });
        document.body.appendChild(dialogElement);
        var confirmDialogObj;
        var okCancelButtonModel = [{
                buttonModel: { isPrimary: true, content: 'OK' },
                click: function () {
                    this.hide();
                }
            }, {
                buttonModel: { content: 'Cancel' },
                click: function () {
                    this.hide();
                }
            }];
        if (typeof (args) === 'string') {
            confirmDialogObj = createDialog({ position: { X: 'center', Y: 'top' }, content: args, isModal: true,
                header: DLG_UTIL_DEFAULT_TITLE, buttons: okCancelButtonModel
            }, dialogElement);
        }
        else {
            confirmDialogObj = createDialog(confirmOptions(args), dialogElement);
        }
        confirmDialogObj.close = function () {
            if (args && args.close) {
                args.close.apply(confirmDialogObj);
            }
            confirmDialogObj.destroy();
            if (confirmDialogObj.element.classList.contains('e-dlg-modal')) {
                confirmDialogObj.element.parentElement.remove();
                confirmDialogObj.target.classList.remove(DLG_UTIL_ROOT);
            }
            else {
                confirmDialogObj.element.remove();
            }
        };
        return confirmDialogObj;
    }
    DialogUtility.confirm = confirm;
    // eslint-disable-next-line
    function createDialog(options, element) {
        var dialogObject = new Dialog(options);
        dialogObject.appendTo(element);
        return dialogObject;
    }
    // eslint-disable-next-line
    function alertOptions(option) {
        var options = {};
        options.buttons = [];
        options = formOptions(options, option);
        options = setAlertButtonModel(options, option);
        return options;
    }
    // eslint-disable-next-line
    function confirmOptions(option) {
        var options = {};
        options.buttons = [];
        options = formOptions(options, option);
        options = setConfirmButtonModel(options, option);
        return options;
    }
    // eslint-disable-next-line
    function formOptions(options, option) {
        options.header = !isNullOrUndefined(option.title) ? option.title : null;
        options.content = !isNullOrUndefined(option.content) ? option.content : '';
        options.isModal = !isNullOrUndefined(option.isModal) ? option.isModal : true;
        options.showCloseIcon = !isNullOrUndefined(option.showCloseIcon) ? option.showCloseIcon : false;
        options.allowDragging = !isNullOrUndefined(option.isDraggable) ? option.isDraggable : false;
        options.closeOnEscape = !isNullOrUndefined(option.closeOnEscape) ? option.closeOnEscape : false;
        options.position = !isNullOrUndefined(option.position) ? option.position : { X: 'center', Y: 'top' };
        options.animationSettings = !isNullOrUndefined(option.animationSettings) ? option.animationSettings :
            { effect: 'Fade', duration: 400, delay: 0 };
        options.cssClass = !isNullOrUndefined(option.cssClass) ? option.cssClass : '';
        options.zIndex = !isNullOrUndefined(option.zIndex) ? option.zIndex : 1000;
        options.open = !isNullOrUndefined(option.open) ? option.open : null;
        options.width = !isNullOrUndefined(option.width) ? option.width : 'auto';
        options.height = !isNullOrUndefined(option.height) ? option.height : 'auto';
        return options;
    }
    // eslint-disable-next-line
    function setAlertButtonModel(options, option) {
        var alertButtonModel = [{
                buttonModel: { isPrimary: true, content: 'OK' },
                click: function () {
                    this.hide();
                }
            }];
        if (!isNullOrUndefined(option.okButton)) {
            options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, alertButtonModel[0]);
        }
        else {
            options.buttons = alertButtonModel;
        }
        return options;
    }
    // eslint-disable-next-line
    function setConfirmButtonModel(options, option) {
        var okButtonModel = {
            buttonModel: { isPrimary: true, content: 'OK' },
            click: function () {
                this.hide();
            }
        };
        var cancelButtonModel = {
            buttonModel: { content: 'Cancel' },
            click: function () {
                this.hide();
            }
        };
        if (!isNullOrUndefined(option.okButton)) {
            options.buttons[0] = formButtonModel(options.buttons[0], option.okButton, okButtonModel);
        }
        else {
            options.buttons[0] = okButtonModel;
        }
        if (!isNullOrUndefined(option.cancelButton)) {
            options.buttons[1] = formButtonModel(options.buttons[1], option.cancelButton, cancelButtonModel);
        }
        else {
            options.buttons[1] = cancelButtonModel;
        }
        return options;
    }
    // eslint-disable-next-line
    function formButtonModel(buttonModel, option, buttonPropModel) {
        var buttonProps = buttonPropModel;
        if (!isNullOrUndefined(option.text)) {
            buttonProps.buttonModel.content = option.text;
        }
        if (!isNullOrUndefined(option.icon)) {
            buttonProps.buttonModel.iconCss = option.icon;
        }
        if (!isNullOrUndefined(option.cssClass)) {
            buttonProps.buttonModel.cssClass = option.cssClass;
        }
        if (!isNullOrUndefined(option.click)) {
            buttonProps.click = option.click;
        }
        if (!isNullOrUndefined(option.isFlat)) {
            buttonProps.isFlat = option.isFlat;
        }
        return buttonProps;
    }
})(DialogUtility || (DialogUtility = {}));
