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
import { Component, rippleEffect, NotifyPropertyChanges, Property, closest, setValue } from '@syncfusion/ej2-base';
import { addClass, getInstance, getUniqueID, isRippleEnabled, removeClass, attributes, isNullOrUndefined } from '@syncfusion/ej2-base';
import { detach, Event, EventHandler, SanitizeHtmlHelper } from '@syncfusion/ej2-base';
import { wrapperInitialize, rippleMouseHandler } from './../common/common';
var LABEL = 'e-label';
var RIPPLE = 'e-ripple-container';
var RTL = 'e-rtl';
var WRAPPER = 'e-radio-wrapper';
var ATTRIBUTES = ['title', 'class', 'style', 'disabled', 'readonly', 'name', 'value', 'id'];
/**
 * The RadioButton is a graphical user interface element that allows you to select one option from the choices.
 * It contains checked and unchecked states.
 * ```html
 * <input type="radio" id="radio"/>
 * <script>
 * var radioObj = new RadioButton({ label: "Default" });
 * radioObj.appendTo("#radio");
 * </script>
 * ```
 */
var RadioButton = /** @class */ (function (_super) {
    __extends(RadioButton, _super);
    /**
     * Constructor for creating the widget
     *
     * @private
     * @param {RadioButtonModel} options - Specifies Radio button model
     * @param {string | HTMLInputElement} element - Specifies target element
     */
    function RadioButton(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isFocused = false;
        _this.type = 'radio';
        return _this;
    }
    RadioButton_1 = RadioButton;
    RadioButton.prototype.changeHandler = function (event) {
        this.checked = true;
        this.dataBind();
        var value = this.element.getAttribute('value');
        value = this.isVue && value ? this.element.value : this.value;
        var type = typeof this.value;
        if (this.isVue && type === 'boolean') {
            value = value === 'true' ? true : false;
        }
        this.trigger('change', { value: value, event: event });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isAngular) {
            event.stopPropagation();
        }
    };
    RadioButton.prototype.updateChange = function () {
        var input;
        var instance;
        var radioGrp = this.getRadioGroup();
        for (var i = 0; i < radioGrp.length; i++) {
            input = radioGrp[i];
            if (input !== this.element) {
                instance = getInstance(input, RadioButton_1);
                instance.checked = false;
                if (this.tagName === 'EJS-RADIOBUTTON') {
                    instance.angularValue = this.value;
                }
            }
        }
    };
    /**
     * Destroys the widget.
     *
     * @returns {void}
     */
    RadioButton.prototype.destroy = function () {
        var _this = this;
        var radioWrap = this.wrapper;
        _super.prototype.destroy.call(this);
        if (radioWrap) {
            if (!this.disabled) {
                this.unWireEvents();
            }
            if (this.tagName === 'INPUT') {
                if (radioWrap.parentNode) {
                    radioWrap.parentNode.insertBefore(this.element, radioWrap);
                }
                detach(radioWrap);
                this.element.checked = false;
                ['name', 'value', 'disabled'].forEach(function (key) {
                    _this.element.removeAttribute(key);
                });
            }
            else {
                ['role', 'aria-checked', 'class'].forEach(function (key) {
                    radioWrap.removeAttribute(key);
                });
                radioWrap.innerHTML = '';
                this.element = this.wrapper;
                if (this.refreshing) {
                    ['e-control', 'e-radio', 'e-lib'].forEach(function (key) {
                        _this.element.classList.add(key);
                    });
                    setValue('ej2_instances', [this], this.element);
                }
            }
        }
    };
    RadioButton.prototype.focusHandler = function () {
        this.isFocused = true;
    };
    RadioButton.prototype.focusOutHandler = function () {
        var label = this.getLabel();
        if (label) {
            label.classList.remove('e-focus');
        }
    };
    RadioButton.prototype.getModuleName = function () {
        return 'radio';
    };
    /**
     * To get the value of selected radio button in a group.
     *
     * @method getSelectedValue
     * @returns {string} - Selected Value
     */
    RadioButton.prototype.getSelectedValue = function () {
        var input;
        var radioGrp = this.getRadioGroup();
        for (var i = 0, len = radioGrp.length; i < len; i++) {
            input = radioGrp[i];
            if (input.checked) {
                return input.value;
            }
        }
        return '';
    };
    RadioButton.prototype.getRadioGroup = function () {
        return document.querySelectorAll('input.e-radio[name="' + this.element.getAttribute('name') + '"]');
    };
    /**
     * Gets the properties to be maintained in the persistence state.
     *
     * @private
     * @returns {string} - Persist Data
     */
    RadioButton.prototype.getPersistData = function () {
        return this.addOnPersist(['checked']);
    };
    RadioButton.prototype.getWrapper = function () {
        if (this.element.parentElement) {
            return this.element.parentElement;
        }
        else {
            return null;
        }
    };
    RadioButton.prototype.getLabel = function () {
        if (this.element.nextElementSibling) {
            return this.element.nextElementSibling;
        }
        else {
            return null;
        }
    };
    RadioButton.prototype.initialize = function () {
        if (isNullOrUndefined(this.initialCheckedValue)) {
            this.initialCheckedValue = this.checked;
        }
        this.initWrapper();
        this.updateHtmlAttribute();
        if (this.name) {
            this.element.setAttribute('name', this.name);
        }
        var value = this.element.getAttribute('value');
        var type = typeof this.value;
        if (this.isVue && type === 'boolean') {
            value = value === 'true' ? true : false;
        }
        if (this.isVue ? this.value && type !== 'boolean' && !value : this.value) {
            this.element.setAttribute('value', this.value);
        }
        if (this.checked) {
            this.element.checked = true;
        }
        if (this.disabled) {
            this.setDisabled();
        }
    };
    RadioButton.prototype.initWrapper = function () {
        var rippleSpan;
        var wrapper = this.element.parentElement;
        if (!wrapper.classList.contains(WRAPPER)) {
            wrapper = this.createElement('div', { className: WRAPPER });
            if (this.element.parentNode) {
                this.element.parentNode.insertBefore(wrapper, this.element);
            }
        }
        var label = this.createElement('label', { attrs: { for: this.element.id } });
        wrapper.appendChild(this.element);
        wrapper.appendChild(label);
        if (isRippleEnabled) {
            rippleSpan = this.createElement('span', { className: (RIPPLE) });
            label.appendChild(rippleSpan);
            rippleEffect(rippleSpan, {
                duration: 400,
                isCenterRipple: true
            });
        }
        wrapper.classList.add('e-wrapper');
        if (this.enableRtl) {
            label.classList.add(RTL);
        }
        if (this.cssClass) {
            addClass([wrapper], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.label) {
            this.setText(this.label);
        }
    };
    RadioButton.prototype.keyUpHandler = function () {
        if (this.isFocused) {
            this.getLabel().classList.add('e-focus');
        }
    };
    RadioButton.prototype.labelMouseDownHandler = function (e) {
        var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE)[0];
        rippleMouseHandler(e, rippleSpan);
    };
    RadioButton.prototype.labelMouseLeaveHandler = function (e) {
        var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE)[0];
        if (rippleSpan) {
            var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
            for (var i = rippleElem.length - 1; i > 0; i--) {
                rippleSpan.removeChild(rippleSpan.childNodes[i]);
            }
            rippleMouseHandler(e, rippleSpan);
        }
    };
    RadioButton.prototype.labelMouseUpHandler = function (e) {
        var rippleSpan = this.getLabel().getElementsByClassName(RIPPLE)[0];
        if (rippleSpan) {
            var rippleElem = rippleSpan.querySelectorAll('.e-ripple-element');
            for (var i = rippleElem.length - 1; i > 0; i--) {
                rippleSpan.removeChild(rippleSpan.childNodes[i]);
            }
            rippleMouseHandler(e, rippleSpan);
        }
    };
    RadioButton.prototype.formResetHandler = function () {
        this.checked = this.initialCheckedValue;
        if (this.initialCheckedValue) {
            attributes(this.element, { 'checked': 'true' });
        }
    };
    /**
     * Called internally if any of the property value changes.
     *
     * @private
     * @param {RadioButtonModel} newProp - Specifies New Properties
     * @param {RadioButtonModel} oldProp - Specifies Old Properties
     * @returns {void}
     */
    RadioButton.prototype.onPropertyChanged = function (newProp, oldProp) {
        var wrap = this.getWrapper();
        var label = this.getLabel();
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'checked':
                    if (newProp.checked) {
                        this.updateChange();
                    }
                    this.element.checked = newProp.checked;
                    break;
                case 'disabled':
                    if (newProp.disabled) {
                        this.setDisabled();
                        this.unWireEvents();
                    }
                    else {
                        this.element.disabled = false;
                        this.wireEvents();
                    }
                    break;
                case 'cssClass':
                    if (oldProp.cssClass) {
                        removeClass([wrap], oldProp.cssClass.split(/\s+/).filter(function (c) { return c.length > 0; }));
                    }
                    if (newProp.cssClass) {
                        addClass([wrap], newProp.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'enableRtl':
                    if (newProp.enableRtl) {
                        label.classList.add(RTL);
                    }
                    else {
                        label.classList.remove(RTL);
                    }
                    break;
                case 'label':
                    this.setText(newProp.label);
                    break;
                case 'labelPosition':
                    if (newProp.labelPosition === 'Before') {
                        label.classList.add('e-right');
                    }
                    else {
                        label.classList.remove('e-right');
                    }
                    break;
                case 'name':
                    this.element.setAttribute('name', newProp.name);
                    break;
                case 'value':
                    // eslint-disable-next-line no-case-declarations
                    var type = typeof this.htmlAttributes.value;
                    if (!isNullOrUndefined(this.htmlAttributes) && (this.htmlAttributes.value || type === 'boolean' && !this.htmlAttributes.value)) {
                        break;
                    }
                    this.element.setAttribute('value', newProp.value);
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttribute();
                    break;
            }
        }
    };
    /**
     * Initialize checked Property, Angular and React and Unique ID support.
     *
     * @private
     * @returns {void}
     */
    RadioButton.prototype.preRender = function () {
        var element = this.element;
        this.formElement = closest(this.element, 'form');
        this.tagName = this.element.tagName;
        element = wrapperInitialize(this.createElement, 'EJS-RADIOBUTTON', 'radio', element, WRAPPER, 'radio');
        this.element = element;
        if (this.element.getAttribute('type') !== 'radio') {
            this.element.setAttribute('type', 'radio');
        }
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
        if (this.tagName === 'EJS-RADIOBUTTON') {
            var formControlName = this.element.getAttribute('formcontrolname');
            if (formControlName) {
                this.setProperties({ 'name': formControlName }, true);
                this.element.setAttribute('name', formControlName);
            }
        }
    };
    /**
     * Initialize the control rendering
     *
     * @private
     * @returns {void}
     */
    RadioButton.prototype.render = function () {
        this.initialize();
        if (!this.disabled) {
            this.wireEvents();
        }
        this.renderComplete();
        this.wrapper = this.getWrapper();
    };
    RadioButton.prototype.setDisabled = function () {
        this.element.disabled = true;
    };
    RadioButton.prototype.setText = function (text) {
        var label = this.getLabel();
        var textLabel = label.getElementsByClassName(LABEL)[0];
        if (textLabel) {
            textLabel.textContent = text;
        }
        else {
            text = (this.enableHtmlSanitizer) ? SanitizeHtmlHelper.sanitize(text) : text;
            textLabel = this.createElement('span', { className: LABEL, innerHTML: text });
            label.appendChild(textLabel);
        }
        if (this.labelPosition === 'Before') {
            this.getLabel().classList.add('e-right');
        }
        else {
            this.getLabel().classList.remove('e-right');
        }
    };
    RadioButton.prototype.updateHtmlAttribute = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                var wrapper = this.element.parentElement;
                if (ATTRIBUTES.indexOf(key) > -1) {
                    if (key === 'class') {
                        addClass([wrapper], this.htmlAttributes["" + key].replace(/\s+/g, ' ').trim().split(' '));
                    }
                    else if (key === 'title' || key === 'style') {
                        wrapper.setAttribute(key, this.htmlAttributes["" + key]);
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
    RadioButton.prototype.unWireEvents = function () {
        var label = this.wrapper;
        EventHandler.remove(this.element, 'change', this.changeHandler);
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'focusout', this.focusOutHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        var rippleLabel = label.getElementsByTagName('label')[0];
        if (rippleLabel) {
            EventHandler.remove(rippleLabel, 'mousedown', this.labelMouseDownHandler);
            EventHandler.remove(rippleLabel, 'mouseup', this.labelMouseUpHandler);
            EventHandler.remove(rippleLabel, 'mouseleave', this.labelMouseLeaveHandler);
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.formResetHandler);
        }
    };
    RadioButton.prototype.wireEvents = function () {
        var label = this.getLabel();
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'focusout', this.focusOutHandler, this);
        var rippleLabel = label.getElementsByClassName(LABEL)[0];
        if (rippleLabel) {
            EventHandler.add(rippleLabel, 'mousedown', this.labelMouseDownHandler, this);
            EventHandler.add(rippleLabel, 'mouseup', this.labelMouseUpHandler, this);
            EventHandler.add(rippleLabel, 'mouseleave', this.labelMouseLeaveHandler, this);
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.formResetHandler, this);
        }
    };
    /**
     * Click the RadioButton element
     * its native method
     *
     * @public
     * @returns {void}
     */
    RadioButton.prototype.click = function () {
        this.element.click();
    };
    /**
     * Sets the focus to RadioButton
     * its native method
     *
     * @public
     * @returns {void}
     */
    RadioButton.prototype.focusIn = function () {
        this.element.focus();
    };
    var RadioButton_1;
    __decorate([
        Event()
    ], RadioButton.prototype, "change", void 0);
    __decorate([
        Event()
    ], RadioButton.prototype, "created", void 0);
    __decorate([
        Property(false)
    ], RadioButton.prototype, "checked", void 0);
    __decorate([
        Property('')
    ], RadioButton.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], RadioButton.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], RadioButton.prototype, "label", void 0);
    __decorate([
        Property('After')
    ], RadioButton.prototype, "labelPosition", void 0);
    __decorate([
        Property('')
    ], RadioButton.prototype, "name", void 0);
    __decorate([
        Property('')
    ], RadioButton.prototype, "value", void 0);
    __decorate([
        Property(true)
    ], RadioButton.prototype, "enableHtmlSanitizer", void 0);
    __decorate([
        Property({})
    ], RadioButton.prototype, "htmlAttributes", void 0);
    RadioButton = RadioButton_1 = __decorate([
        NotifyPropertyChanges
    ], RadioButton);
    return RadioButton;
}(Component));
export { RadioButton };
