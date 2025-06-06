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
import { Component, NotifyPropertyChanges, Property, closest, setValue } from '@syncfusion/ej2-base';
import { Event, EventHandler } from '@syncfusion/ej2-base';
import { addClass, isRippleEnabled, removeClass, rippleEffect, isNullOrUndefined } from '@syncfusion/ej2-base';
import { rippleMouseHandler, destroy, preRender, setHiddenInput } from './../common/common';
var DISABLED = 'e-switch-disabled';
var RIPPLE = 'e-ripple-container';
var RIPPLE_CHECK = 'e-ripple-check';
var RTL = 'e-rtl';
var WRAPPER = 'e-switch-wrapper';
var ACTIVE = 'e-switch-active';
var ATTRIBUTES = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value', 'aria-label', 'id', 'role', 'tabindex'];
/**
 * The Switch is a graphical user interface element that allows you to toggle between checked and unchecked states.
 * ```html
 * <input type="checkbox" id="switch"/>
 * <script>
 * var switchObj = new Switch({});
 * switchObj.appendTo("#switch");
 * </script>
 * ```
 */
var Switch = /** @class */ (function (_super) {
    __extends(Switch, _super);
    /**
     * Constructor for creating the widget.
     *
     * @private
     *
     * @param {SwitchModel} options switch model
     * @param {string | HTMLInputElement} element target element
     *
     */
    function Switch(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isFocused = false;
        _this.isDrag = false;
        _this.isWireEvents = false;
        return _this;
    }
    Switch.prototype.changeState = function (state) {
        var rippleSpan = null;
        var wrapper = this.getWrapper();
        var bar = wrapper.querySelector('.e-switch-inner');
        var handle = wrapper.querySelector('.e-switch-handle');
        if (isRippleEnabled) {
            rippleSpan = wrapper.getElementsByClassName(RIPPLE)[0];
        }
        if (state) {
            addClass([bar, handle], ACTIVE);
            this.element.checked = true;
            this.checked = true;
            if (rippleSpan) {
                addClass([rippleSpan], [RIPPLE_CHECK]);
            }
        }
        else {
            removeClass([bar, handle], ACTIVE);
            this.element.checked = false;
            this.checked = false;
            if (rippleSpan) {
                removeClass([rippleSpan], [RIPPLE_CHECK]);
            }
        }
    };
    Switch.prototype.clickHandler = function (evt) {
        this.isDrag = false;
        this.focusOutHandler();
        var beforeChangeEventArgs = { event: evt, cancel: false, checked: this.checked };
        this.trigger('beforeChange', beforeChangeEventArgs);
        if (!beforeChangeEventArgs.cancel) {
            this.changeState(!beforeChangeEventArgs.checked);
            this.element.focus();
            var changeEventArgs = { checked: this.element.checked, event: evt };
            this.trigger('change', changeEventArgs);
        }
    };
    /**
     * Destroys the Switch widget.
     *
     * @returns {void}
     */
    Switch.prototype.destroy = function () {
        var _this = this;
        _super.prototype.destroy.call(this);
        if (!this.disabled) {
            this.unWireEvents();
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
        destroy(this, this.getWrapper(), this.tagName);
        if (this.refreshing) {
            ['e-control', 'e-switch', 'e-lib'].forEach(function (key) {
                _this.element.classList.add(key);
            });
            setValue('ej2_instances', [this], this.element);
        }
    };
    Switch.prototype.focusHandler = function () {
        this.isFocused = true;
    };
    Switch.prototype.focusOutHandler = function () {
        this.getWrapper().classList.remove('e-focus');
    };
    /**
     * Gets the module name.
     *
     * @private
     * @returns {string} - Module Name
     */
    Switch.prototype.getModuleName = function () {
        return 'switch';
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     *
     * @private
     * @returns {string} - Persist data
     */
    Switch.prototype.getPersistData = function () {
        return this.addOnPersist(['checked']);
    };
    Switch.prototype.getWrapper = function () {
        if (this.element.parentElement) {
            return this.element.parentElement;
        }
        else {
            return null;
        }
    };
    Switch.prototype.initialize = function () {
        this.element.setAttribute('role', 'switch');
        if (isNullOrUndefined(this.initialSwitchCheckedValue)) {
            this.initialSwitchCheckedValue = this.checked;
        }
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        if (this.value) {
            this.element.setAttribute('value', this.value);
        }
        if (this.checked) {
            this.changeState(true);
        }
        if (this.disabled) {
            this.setDisabled();
        }
        if (this.onLabel || this.offLabel) {
            this.setLabel(this.onLabel, this.offLabel);
        }
    };
    Switch.prototype.initWrapper = function () {
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER)) {
            wrapper = this.createElement('div', {
                className: WRAPPER
            });
            this.element.parentNode.insertBefore(wrapper, this.element);
        }
        var switchInner = this.createElement('span', { className: 'e-switch-inner' });
        var onLabel = this.createElement('span', { className: 'e-switch-on' });
        var offLabel = this.createElement('span', { className: 'e-switch-off' });
        var handle = this.createElement('span', { className: 'e-switch-handle' });
        wrapper.appendChild(this.element);
        setHiddenInput(this, wrapper);
        switchInner.appendChild(onLabel);
        switchInner.appendChild(offLabel);
        wrapper.appendChild(switchInner);
        wrapper.appendChild(handle);
        if (isRippleEnabled) {
            var rippleSpan = this.createElement('span', { className: RIPPLE });
            handle.appendChild(rippleSpan);
            rippleEffect(rippleSpan, { duration: 400, isCenterRipple: true });
        }
        wrapper.classList.add('e-wrapper');
        if (this.enableRtl) {
            wrapper.classList.add(RTL);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
    };
    /**
     * Called internally if any of the property value changes.
     *
     * @private
     * @param {SwitchModel} newProp - Specifies New Properties
     * @param {SwitchModel} oldProp - Specifies Old Properties
     * @returns {void}
     */
    Switch.prototype.onPropertyChanged = function (newProp, oldProp) {
        var wrapper = this.getWrapper();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    this.changeState(newProp.checked);
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.unWireEvents();
                        this.isWireEvents = false;
                    }
                    else {
                        this.element.disabled = false;
                        wrapper.classList.remove(DISABLED);
                        wrapper.setAttribute('aria-disabled', 'false');
                        if (!this.isWireEvents) {
                            this.wireEvents();
                            this.isWireEvents = true;
                        }
                    }
                    break;
                case 'value':
                    this.element.setAttribute('value', newProp.value);
                    break;
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'onLabel':
                case 'offLabel':
                    this.setLabel(newProp.onLabel, newProp.offLabel);
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        wrapper.classList.add(RTL);
                    }
                    else {
                        wrapper.classList.remove(RTL);
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([wrapper], oldProp.cssClass.split(/\s+/).filter(function (c) { return c.length > 0; }));
                    }
                    if (newProp.cssClass) {
                        addClass([wrapper], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttribute();
                    break;
            }
        }
    };
    /**
     * Initialize Angular, React and Unique ID support.
     *
     * @private
     * @returns {void}
     */
    Switch.prototype.preRender = function () {
        var element = this.element;
        this.formElement = closest(this.element, 'form');
        this.tagName = this.element.tagName;
        preRender(this, 'EJS-SWITCH', WRAPPER, element, this.getModuleName());
    };
    /**
     * Initialize control rendering.
     *
     * @private
     * @returns {void}
     */
    Switch.prototype.render = function () {
        this.initWrapper();
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
        this.renderComplete();
        this.updateHtmlAttribute();
    };
    Switch.prototype.rippleHandler = function (e) {
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        rippleMouseHandler(e, rippleSpan);
        if (e.type === 'mousedown' && e.currentTarget.classList.contains('e-switch-wrapper') && e.which === 1) {
            this.isDrag = true;
            this.isFocused = false;
        }
    };
    Switch.prototype.mouseLeaveHandler = function (e) {
        var rippleSpan = this.element.parentElement.getElementsByClassName(RIPPLE)[0];
        if (rippleSpan) {
            var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
            for (var i = rippleElem.length - 1; i > 0; i--) {
                rippleSpan.removeChild(rippleSpan.childNodes[i]);
            }
            rippleMouseHandler(e, rippleSpan);
        }
    };
    Switch.prototype.rippleTouchHandler = function (eventType) {
        var rippleSpan = this.getWrapper().getElementsByClassName(RIPPLE)[0];
        if (rippleSpan) {
            var event_1 = document.createEvent('MouseEvents');
            event_1.initEvent(eventType, false, true);
            rippleSpan.dispatchEvent(event_1);
        }
    };
    Switch.prototype.setDisabled = function () {
        var wrapper = this.getWrapper();
        this.element.disabled = true;
        wrapper.classList.add(DISABLED);
        wrapper.setAttribute('aria-disabled', 'true');
    };
    Switch.prototype.setLabel = function (onText, offText) {
        var wrapper = this.getWrapper();
        if (onText) {
            wrapper.querySelector('.e-switch-on').textContent = onText;
        }
        if (offText) {
            wrapper.querySelector('.e-switch-off').textContent = offText;
        }
    };
    Switch.prototype.updateHtmlAttribute = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                var wrapper = this.getWrapper();
                if (ATTRIBUTES.indexOf(key) > -1) {
                    if (key === 'class') {
                        addClass([wrapper], this.htmlAttributes["" + key].split(' '));
                    }
                    else if (key === 'title') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else if (key === 'style') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else if (key === 'disabled') {
                        if (this.htmlAttributes["" + key] === 'true') {
                            this.setDisabled();
                        }
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                    else {
                        this.element.setAttribute(key, this.htmlAttributes["" + key]);
                    }
                }
                else {
                    wrapper.setAttribute(key, this.htmlAttributes["" + key]);
                }
            }
        }
    };
    Switch.prototype.switchFocusHandler = function (e) {
        if (this.isFocused) {
            this.getWrapper().classList.add('e-focus');
        }
        if (e && e.type === 'keyup' && e.code === 'Space' && this.isAngular) {
            this.clickHandler(e);
            e.stopPropagation();
            e.preventDefault();
        }
    };
    Switch.prototype.switchMouseUp = function (e) {
        var aTouchY = 0;
        var yDiff = 0;
        var aTouchX = 0;
        var xDiff = 0;
        var target = e.target;
        if (e.type === 'touchmove') {
            e.preventDefault();
            aTouchX = e.changedTouches[0].clientX;
            aTouchY = e.changedTouches[0].clientY;
            xDiff = this.bTouchX - aTouchX;
            yDiff = this.bTouchY - aTouchY;
            if (Math.abs(xDiff) < Math.abs(yDiff)) {
                this.isDrag = false;
                this.rippleTouchHandler('mouseup');
            }
            else {
                this.isDrag = true;
            }
        }
        if (e.type === 'touchstart') {
            this.bTouchX = e.changedTouches[0].clientX;
            this.bTouchY = e.changedTouches[0].clientY;
            this.isDrag = true;
            this.rippleTouchHandler('mousedown');
        }
        if (this.isDrag) {
            if ((e.type === 'mouseup' && target.className.indexOf('e-switch') < 0) || e.type === 'touchend') {
                xDiff = this.bTouchX - e.changedTouches[0].clientX;
                yDiff = this.bTouchY - e.changedTouches[0].clientY;
                if (Math.abs(xDiff) >= Math.abs(yDiff)) {
                    this.clickHandler(e);
                    this.rippleTouchHandler('mouseup');
                    e.preventDefault();
                }
            }
        }
    };
    Switch.prototype.formResetHandler = function () {
        this.checked = this.initialSwitchCheckedValue;
        this.element.checked = this.initialSwitchCheckedValue;
    };
    /**
     * Toggle the Switch component state into checked/unchecked.
     *
     * @returns {void}
     */
    Switch.prototype.toggle = function () {
        this.clickHandler();
    };
    Switch.prototype.wireEvents = function () {
        var wrapper = this.getWrapper();
        this.delegateMouseUpHandler = this.switchMouseUp.bind(this);
        this.delegateKeyUpHandler = this.switchFocusHandler.bind(this);
        EventHandler.add(wrapper, 'click', this.clickHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        EventHandler.add(this.element, 'mouseup', this.delegateMouseUpHandler, this);
        EventHandler.add(this.element, 'keyup', this.delegateKeyUpHandler, this);
        EventHandler.add(wrapper, 'mousedown mouseup', this.rippleHandler, this);
        EventHandler.add(wrapper, 'mouseleave', this.mouseLeaveHandler, this);
        EventHandler.add(wrapper, 'touchstart touchmove touchend', this.switchMouseUp, this);
    };
    Switch.prototype.unWireEvents = function () {
        var wrapper = this.getWrapper();
        EventHandler.remove(wrapper, 'click', this.clickHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        EventHandler.remove(this.element, 'mouseup', this.delegateMouseUpHandler);
        EventHandler.remove(this.element, 'keyup', this.delegateKeyUpHandler);
        EventHandler.remove(wrapper, 'mousedown mouseup', this.rippleHandler);
        EventHandler.remove(wrapper, 'mouseleave', this.mouseLeaveHandler);
        EventHandler.remove(wrapper, 'touchstart touchmove touchend', this.switchMouseUp);
    };
    /**
     * Click the switch element
     * its native method
     *
     * @public
     * @returns {void}
     */
    Switch.prototype.click = function () {
        this.element.click();
    };
    /**
     * Sets the focus to Switch
     * its native method
     *
     * @public
     */
    Switch.prototype.focusIn = function () {
        this.element.focus();
    };
    __decorate([
        Event()
    ], Switch.prototype, "beforeChange", void 0);
    __decorate([
        Event()
    ], Switch.prototype, "change", void 0);
    __decorate([
        Event()
    ], Switch.prototype, "created", void 0);
    __decorate([
        Property(false)
    ], Switch.prototype, "checked", void 0);
    __decorate([
        Property('')
    ], Switch.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], Switch.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], Switch.prototype, "name", void 0);
    __decorate([
        Property('')
    ], Switch.prototype, "onLabel", void 0);
    __decorate([
        Property('')
    ], Switch.prototype, "offLabel", void 0);
    __decorate([
        Property('')
    ], Switch.prototype, "value", void 0);
    __decorate([
        Property({})
    ], Switch.prototype, "htmlAttributes", void 0);
    Switch = __decorate([
        NotifyPropertyChanges
    ], Switch);
    return Switch;
}(Component));
export { Switch };
