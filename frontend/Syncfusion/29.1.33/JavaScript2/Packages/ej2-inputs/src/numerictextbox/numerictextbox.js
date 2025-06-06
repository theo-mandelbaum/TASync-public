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
import { Component, EventHandler, Property, Event, Browser, L10n, getUniqueID } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { attributes, addClass, removeClass, detach, closest } from '@syncfusion/ej2-base';
import { isNullOrUndefined, getValue, formatUnit, setValue, merge } from '@syncfusion/ej2-base';
import { Internationalization, getNumericObject } from '@syncfusion/ej2-base';
import { Input } from '../input/input';
var ROOT = 'e-control-wrapper e-numeric';
var SPINICON = 'e-input-group-icon';
var SPINUP = 'e-spin-up';
var SPINDOWN = 'e-spin-down';
var ERROR = 'e-error';
var INCREMENT = 'increment';
var DECREMENT = 'decrement';
var INTREGEXP = new RegExp('^(-)?(\\d*)$');
var DECIMALSEPARATOR = '.';
var COMPONENT = 'e-numerictextbox';
var CONTROL = 'e-control';
var NUMERIC_FOCUS = 'e-input-focus';
var HIDDENELEMENT = 'e-numeric-hidden';
var wrapperAttributes = ['title', 'style', 'class'];
var selectionTimeOut = 0;
/**
 * Represents the NumericTextBox component that allows the user to enter only numeric values.
 * ```html
 * <input type='text' id="numeric"/>
 * ```
 * ```typescript
 * <script>
 *   var numericObj = new NumericTextBox({ value: 10 });
 *   numericObj.appendTo("#numeric");
 * </script>
 * ```
 */
var NumericTextBox = /** @class */ (function (_super) {
    __extends(NumericTextBox, _super);
    /**
     *
     * @param {NumericTextBoxModel} options - Specifies the NumericTextBox model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function NumericTextBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.preventChange = false;
        _this.isDynamicChange = false;
        _this.numericOptions = options;
        return _this;
    }
    NumericTextBox.prototype.preRender = function () {
        this.isPrevFocused = false;
        this.decimalSeparator = '.';
        // eslint-disable-next-line no-useless-escape
        this.intRegExp = new RegExp('/^(-)?(\d*)$/');
        this.isCalled = false;
        var ejInstance = getValue('ej2_instances', this.element);
        this.cloneElement = this.element.cloneNode(true);
        removeClass([this.cloneElement], [CONTROL, COMPONENT, 'e-lib']);
        this.angularTagName = null;
        this.formEle = closest(this.element, 'form');
        if (this.element.tagName === 'EJS-NUMERICTEXTBOX') {
            this.angularTagName = this.element.tagName;
            var input = this.createElement('input');
            var index = 0;
            for (index; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (attributeName !== 'id' && attributeName !== 'class') {
                    input.setAttribute(this.element.attributes[index].nodeName, this.element.attributes[index].nodeValue);
                    input.innerHTML = this.element.innerHTML;
                }
                else if (attributeName === 'class') {
                    input.setAttribute(attributeName, this.element.className.split(' ').filter(function (item) { return item.indexOf('ng-') !== 0; }).join(' '));
                }
            }
            if (this.element.hasAttribute('name')) {
                this.element.removeAttribute('name');
            }
            this.element.classList.remove('e-control', 'e-numerictextbox');
            this.element.appendChild(input);
            this.element = input;
            setValue('ej2_instances', ejInstance, this.element);
        }
        attributes(this.element, { 'role': 'spinbutton', 'tabindex': '0', 'autocomplete': 'off' });
        var localeText = {
            incrementTitle: 'Increment value', decrementTitle: 'Decrement value', placeholder: this.placeholder
        };
        this.l10n = new L10n('numerictextbox', localeText, this.locale);
        if (this.l10n.getConstant('placeholder') !== '') {
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (!this.element.hasAttribute('id')) {
            this.element.setAttribute('id', getUniqueID('numerictextbox'));
        }
        this.isValidState = true;
        this.inputStyle = null;
        this.inputName = null;
        this.cultureInfo = {};
        this.initCultureInfo();
        this.initCultureFunc();
        this.prevValue = this.value;
        this.updateHTMLAttrToElement();
        this.checkAttributes(false);
        if (this.formEle) {
            this.inputEleValue = this.value;
        }
        this.validateMinMax();
        this.validateStep();
        if (this.placeholder === null) {
            this.updatePlaceholder();
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    NumericTextBox.prototype.render = function () {
        if (this.element.tagName.toLowerCase() === 'input') {
            this.createWrapper();
            if (this.showSpinButton) {
                this.spinBtnCreation();
            }
            this.setElementWidth(this.width);
            if (!this.container.classList.contains('e-input-group')) {
                this.container.classList.add('e-input-group');
            }
            this.changeValue(this.value === null || isNaN(this.value) ?
                null : this.strictMode ? this.trimValue(this.value) : this.value);
            this.wireEvents();
            if (this.value !== null && !isNaN(this.value)) {
                if (this.decimals) {
                    this.setProperties({ value: this.roundNumber(this.value, this.decimals) }, true);
                }
            }
            if (this.element.getAttribute('value') || this.value) {
                this.element.setAttribute('value', this.element.value);
                this.hiddenInput.setAttribute('value', this.hiddenInput.value);
            }
            this.elementPrevValue = this.element.value;
            if (this.element.hasAttribute('data-val')) {
                this.element.setAttribute('data-val', 'false');
            }
            if (!this.element.hasAttribute('aria-labelledby') && !this.element.hasAttribute('placeholder') && !this.element.hasAttribute('aria-label')) {
                this.element.setAttribute('aria-label', 'numerictextbox');
            }
            if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
                this.enabled = false;
            }
            this.renderComplete();
        }
    };
    NumericTextBox.prototype.checkAttributes = function (isDynamic) {
        var attributes = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['value', 'min', 'max', 'step', 'disabled', 'readonly', 'style', 'name', 'placeholder'];
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.element.getAttribute(prop) === 'disabled' || this.element.getAttribute(prop) === ''
                                || this.element.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.element.getAttribute(prop) === 'readonly' || this.element.getAttribute(prop) === ''
                                || this.element.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['value'] === undefined)) || isDynamic) {
                            var setNumber = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            this.setProperties(setValue(prop, setNumber, {}), !isDynamic);
                        }
                        break;
                    case 'min':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['min'] === undefined)) || isDynamic) {
                            var minValue = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if (minValue !== null && !isNaN(minValue)) {
                                this.setProperties(setValue(prop, minValue, {}), !isDynamic);
                            }
                        }
                        break;
                    case 'max':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['max'] === undefined)) || isDynamic) {
                            var maxValue = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if (maxValue !== null && !isNaN(maxValue)) {
                                this.setProperties(setValue(prop, maxValue, {}), !isDynamic);
                            }
                        }
                        break;
                    case 'step':
                        if ((isNullOrUndefined(this.numericOptions) || (this.numericOptions['step'] === undefined)) || isDynamic) {
                            var stepValue = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if (stepValue !== null && !isNaN(stepValue)) {
                                this.setProperties(setValue(prop, stepValue, {}), !isDynamic);
                            }
                        }
                        break;
                    case 'style':
                        this.inputStyle = this.element.getAttribute(prop);
                        break;
                    case 'name':
                        this.inputName = this.element.getAttribute(prop);
                        break;
                    default:
                        {
                            var value = this.instance.getNumberParser({ format: 'n' })(this.element.getAttribute(prop));
                            if ((value !== null && !isNaN(value)) || (prop === 'value')) {
                                this.setProperties(setValue(prop, value, {}), true);
                            }
                        }
                        break;
                }
            }
        }
    };
    NumericTextBox.prototype.updatePlaceholder = function () {
        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
    };
    NumericTextBox.prototype.initCultureFunc = function () {
        this.instance = new Internationalization(this.locale);
    };
    NumericTextBox.prototype.initCultureInfo = function () {
        this.cultureInfo.format = this.format;
        if (getValue('currency', this) !== null) {
            setValue('currency', this.currency, this.cultureInfo);
            this.setProperties({ currencyCode: this.currency }, true);
        }
    };
    /* Wrapper creation */
    NumericTextBox.prototype.createWrapper = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = this.getNumericValidClassList(this.cssClass);
        }
        var inputObj = Input.createInput({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValue,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton,
                enabled: this.enabled
            }
        }, this.createElement);
        this.inputWrapper = inputObj;
        this.container = inputObj.container;
        this.container.setAttribute('class', ROOT + ' ' + this.container.getAttribute('class'));
        this.updateHTMLAttrToWrapper();
        if (this.readonly) {
            attributes(this.element, { 'aria-readonly': 'true' });
        }
        this.hiddenInput = (this.createElement('input', { attrs: { type: 'text',
                'validateHidden': 'true', 'aria-label': 'hidden', 'class': HIDDENELEMENT } }));
        this.inputName = this.inputName !== null ? this.inputName : this.element.id;
        this.element.removeAttribute('name');
        if (this.isAngular && this.angularTagName === 'EJS-NUMERICTEXTBOX' && this.cloneElement.id.length > 0) {
            attributes(this.hiddenInput, { 'name': this.cloneElement.id });
        }
        else {
            attributes(this.hiddenInput, { 'name': this.inputName });
        }
        this.container.insertBefore(this.hiddenInput, this.container.childNodes[1]);
        this.updateDataAttribute(false);
        if (this.inputStyle !== null) {
            attributes(this.container, { 'style': this.inputStyle });
        }
    };
    NumericTextBox.prototype.updateDataAttribute = function (isDynamic) {
        var attr = {};
        if (!isDynamic) {
            for (var a = 0; a < this.element.attributes.length; a++) {
                attr[this.element.attributes[a].name] = this.element.getAttribute(this.element.attributes[a].name);
            }
        }
        else {
            attr = this.htmlAttributes;
        }
        for (var _i = 0, _a = Object.keys(attr); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key.indexOf('data') === 0) {
                this.hiddenInput.setAttribute(key, attr["" + key]);
            }
        }
    };
    NumericTextBox.prototype.updateHTMLAttrToElement = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var pro = _a[_i];
                if (wrapperAttributes.indexOf(pro) < 0) {
                    this.element.setAttribute(pro, this.htmlAttributes["" + pro]);
                }
            }
        }
    };
    NumericTextBox.prototype.updateCssClass = function (newClass, oldClass) {
        Input.setCssClass(this.getNumericValidClassList(newClass), [this.container], this.getNumericValidClassList(oldClass));
    };
    NumericTextBox.prototype.getNumericValidClassList = function (numericClassName) {
        var result = numericClassName;
        if (!isNullOrUndefined(numericClassName) && numericClassName !== '') {
            result = (numericClassName.replace(/\s+/g, ' ')).trim();
        }
        return result;
    };
    NumericTextBox.prototype.updateHTMLAttrToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var pro = _a[_i];
                if (wrapperAttributes.indexOf(pro) > -1) {
                    if (pro === 'class') {
                        var updatedClassValue = this.getNumericValidClassList(this.htmlAttributes["" + pro]);
                        if (updatedClassValue !== '') {
                            addClass([this.container], updatedClassValue.split(' '));
                        }
                    }
                    else if (pro === 'style') {
                        var numericStyle = this.container.getAttribute(pro);
                        numericStyle = !isNullOrUndefined(numericStyle) ? (numericStyle + this.htmlAttributes["" + pro]) :
                            this.htmlAttributes["" + pro];
                        this.container.setAttribute(pro, numericStyle);
                    }
                    else {
                        this.container.setAttribute(pro, this.htmlAttributes["" + pro]);
                    }
                }
            }
        }
    };
    NumericTextBox.prototype.setElementWidth = function (width) {
        if (!isNullOrUndefined(width)) {
            if (typeof width === 'number') {
                this.container.style.width = formatUnit(width);
            }
            else if (typeof width === 'string') {
                this.container.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
            }
        }
    };
    /* Spinner creation */
    NumericTextBox.prototype.spinBtnCreation = function () {
        this.spinDown = Input.appendSpan(SPINICON + ' ' + SPINDOWN, this.container, this.createElement);
        attributes(this.spinDown, {
            'title': this.l10n.getConstant('decrementTitle')
        });
        this.spinUp = Input.appendSpan(SPINICON + ' ' + SPINUP, this.container, this.createElement);
        attributes(this.spinUp, {
            'title': this.l10n.getConstant('incrementTitle')
        });
        this.wireSpinBtnEvents();
    };
    NumericTextBox.prototype.validateMinMax = function () {
        if (!(typeof (this.min) === 'number' && !isNaN(this.min))) {
            this.setProperties({ min: -(Number.MAX_VALUE) }, true);
        }
        if (!(typeof (this.max) === 'number' && !isNaN(this.max))) {
            this.setProperties({ max: Number.MAX_VALUE }, true);
        }
        if (this.decimals !== null) {
            if (this.min !== -(Number.MAX_VALUE)) {
                this.setProperties({ min: this.instance.getNumberParser({ format: 'n' })(this.formattedValue(this.decimals, this.min)) }, true);
            }
            if (this.max !== (Number.MAX_VALUE)) {
                this.setProperties({ max: this.instance.getNumberParser({ format: 'n' })(this.formattedValue(this.decimals, this.max)) }, true);
            }
        }
        this.setProperties({ min: this.min > this.max ? this.max : this.min }, true);
        if (this.min !== -(Number.MAX_VALUE)) {
            attributes(this.element, { 'aria-valuemin': this.min.toString() });
        }
        if (this.max !== (Number.MAX_VALUE)) {
            attributes(this.element, { 'aria-valuemax': this.max.toString() });
        }
    };
    NumericTextBox.prototype.formattedValue = function (decimals, value) {
        return this.instance.getNumberFormat({
            maximumFractionDigits: decimals,
            minimumFractionDigits: decimals, useGrouping: false
        })(value);
    };
    NumericTextBox.prototype.validateStep = function () {
        if (this.decimals !== null) {
            this.setProperties({ step: this.instance.getNumberParser({ format: 'n' })(this.formattedValue(this.decimals, this.step)) }, true);
        }
    };
    NumericTextBox.prototype.action = function (operation, event) {
        this.isInteract = true;
        var value = this.isFocused ? this.instance.getNumberParser({ format: 'n' })(this.element.value) : this.value;
        this.changeValue(this.performAction(value, this.step, operation));
        this.raiseChangeEvent(event);
    };
    NumericTextBox.prototype.checkErrorClass = function () {
        if (this.isValidState) {
            removeClass([this.container], ERROR);
        }
        else {
            addClass([this.container], ERROR);
        }
        attributes(this.element, { 'aria-invalid': this.isValidState ? 'false' : 'true' });
    };
    NumericTextBox.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    };
    NumericTextBox.prototype.resetHandler = function (e) {
        e.preventDefault();
        if (!(this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) || this.inputWrapper.container.classList.contains('e-static-clear')) {
            this.clear(e);
        }
        this.isInteract = true;
        this.raiseChangeEvent(e);
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    NumericTextBox.prototype.clear = function (event) {
        this.setProperties({ value: null }, true);
        this.setElementValue('');
        this.hiddenInput.value = '';
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NumericTextBox.prototype.resetFormHandler = function () {
        if (this.element.tagName === 'EJS-NUMERICTEXTBOX') {
            this.updateValue(null);
        }
        else {
            this.updateValue(this.inputEleValue);
        }
    };
    NumericTextBox.prototype.setSpinButton = function () {
        if (!isNullOrUndefined(this.spinDown)) {
            attributes(this.spinDown, {
                'title': this.l10n.getConstant('decrementTitle'),
                'aria-label': this.l10n.getConstant('decrementTitle')
            });
        }
        if (!isNullOrUndefined(this.spinUp)) {
            attributes(this.spinUp, {
                'title': this.l10n.getConstant('incrementTitle'),
                'aria-label': this.l10n.getConstant('incrementTitle')
            });
        }
    };
    NumericTextBox.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'blur', this.focusOutHandler, this);
        EventHandler.add(this.element, 'keydown', this.keyDownHandler, this);
        EventHandler.add(this.element, 'keyup', this.keyUpHandler, this);
        EventHandler.add(this.element, 'input', this.inputHandler, this);
        EventHandler.add(this.element, 'keypress', this.keyPressHandler, this);
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        EventHandler.add(this.element, 'paste', this.pasteHandler, this);
        if (this.enabled) {
            this.bindClearEvent();
            if (this.formEle) {
                EventHandler.add(this.formEle, 'reset', this.resetFormHandler, this);
            }
        }
    };
    NumericTextBox.prototype.wireSpinBtnEvents = function () {
        /* bind spin button events */
        EventHandler.add(this.spinUp, Browser.touchStartEvent, this.mouseDownOnSpinner, this);
        EventHandler.add(this.spinDown, Browser.touchStartEvent, this.mouseDownOnSpinner, this);
        EventHandler.add(this.spinUp, Browser.touchEndEvent, this.mouseUpOnSpinner, this);
        EventHandler.add(this.spinDown, Browser.touchEndEvent, this.mouseUpOnSpinner, this);
        EventHandler.add(this.spinUp, Browser.touchMoveEvent, this.touchMoveOnSpinner, this);
        EventHandler.add(this.spinDown, Browser.touchMoveEvent, this.touchMoveOnSpinner, this);
    };
    NumericTextBox.prototype.unwireEvents = function () {
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'blur', this.focusOutHandler);
        EventHandler.remove(this.element, 'keyup', this.keyUpHandler);
        EventHandler.remove(this.element, 'input', this.inputHandler);
        EventHandler.remove(this.element, 'keydown', this.keyDownHandler);
        EventHandler.remove(this.element, 'keypress', this.keyPressHandler);
        EventHandler.remove(this.element, 'change', this.changeHandler);
        EventHandler.remove(this.element, 'paste', this.pasteHandler);
        if (this.formEle) {
            EventHandler.remove(this.formEle, 'reset', this.resetFormHandler);
        }
    };
    NumericTextBox.prototype.unwireSpinBtnEvents = function () {
        /* unbind spin button events */
        EventHandler.remove(this.spinUp, Browser.touchStartEvent, this.mouseDownOnSpinner);
        EventHandler.remove(this.spinDown, Browser.touchStartEvent, this.mouseDownOnSpinner);
        EventHandler.remove(this.spinUp, Browser.touchEndEvent, this.mouseUpOnSpinner);
        EventHandler.remove(this.spinDown, Browser.touchEndEvent, this.mouseUpOnSpinner);
        EventHandler.remove(this.spinUp, Browser.touchMoveEvent, this.touchMoveOnSpinner);
        EventHandler.remove(this.spinDown, Browser.touchMoveEvent, this.touchMoveOnSpinner);
    };
    NumericTextBox.prototype.changeHandler = function (event) {
        event.stopPropagation();
        if (!this.element.value.length) {
            this.setProperties({ value: null }, true);
        }
        var parsedInput = this.instance.getNumberParser({ format: 'n' })(this.element.value);
        this.updateValue(parsedInput, event);
    };
    NumericTextBox.prototype.raiseChangeEvent = function (event) {
        this.inputValue = (isNullOrUndefined(this.inputValue) || isNaN(this.inputValue)) ? null : this.inputValue;
        if (this.prevValue !== this.value || this.prevValue !== this.inputValue) {
            var eventArgs = {};
            this.changeEventArgs = { value: this.value, previousValue: this.prevValue, isInteracted: this.isInteract,
                isInteraction: this.isInteract, event: event };
            if (event) {
                this.changeEventArgs.event = event;
            }
            if (this.changeEventArgs.event === undefined) {
                this.changeEventArgs.isInteracted = false;
                this.changeEventArgs.isInteraction = false;
            }
            merge(eventArgs, this.changeEventArgs);
            this.prevValue = this.value;
            this.isInteract = false;
            this.elementPrevValue = this.element.value;
            this.preventChange = false;
            this.trigger('change', eventArgs);
        }
    };
    NumericTextBox.prototype.pasteHandler = function () {
        var _this = this;
        if (!this.enabled || this.readonly) {
            return;
        }
        var beforeUpdate = this.element.value;
        setTimeout(function () {
            if (!_this.numericRegex().test(_this.element.value)) {
                _this.setElementValue(beforeUpdate);
            }
        });
    };
    NumericTextBox.prototype.preventHandler = function () {
        var _this = this;
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        setTimeout(function () {
            if (_this.element.selectionStart > 0) {
                var currentPos = _this.element.selectionStart;
                var prevPos = _this.element.selectionStart - 1;
                var start = 0;
                var valArray = _this.element.value.split('');
                var numericObject = getNumericObject(_this.locale);
                var decimalSeparator = getValue('decimal', numericObject);
                var ignoreKeyCode = decimalSeparator.charCodeAt(0);
                if (_this.element.value[prevPos] === ' ' && _this.element.selectionStart > 0 && !iOS) {
                    if (isNullOrUndefined(_this.prevVal)) {
                        _this.element.value = _this.element.value.trim();
                    }
                    else if (prevPos !== 0) {
                        _this.element.value = _this.prevVal;
                    }
                    else if (prevPos === 0) {
                        _this.element.value = _this.element.value.trim();
                    }
                    _this.element.setSelectionRange(prevPos, prevPos);
                }
                else if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1])) &&
                    _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) !== 45) {
                    if ((valArray.indexOf(_this.element.value[_this.element.selectionStart - 1]) !==
                        valArray.lastIndexOf(_this.element.value[_this.element.selectionStart - 1]) &&
                        _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) === ignoreKeyCode) ||
                        _this.element.value[_this.element.selectionStart - 1].charCodeAt(0) !== ignoreKeyCode) {
                        _this.element.value = _this.element.value.substring(0, prevPos) +
                            _this.element.value.substring(currentPos, _this.element.value.length);
                        _this.element.setSelectionRange(prevPos, prevPos);
                        if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1])) && _this.element.selectionStart > 0
                            && _this.element.value.length) {
                            _this.preventHandler();
                        }
                    }
                }
                else if (isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 2])) && _this.element.selectionStart > 1 &&
                    _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) !== 45) {
                    if ((valArray.indexOf(_this.element.value[_this.element.selectionStart - 2]) !==
                        valArray.lastIndexOf(_this.element.value[_this.element.selectionStart - 2]) &&
                        _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) === ignoreKeyCode) ||
                        _this.element.value[_this.element.selectionStart - 2].charCodeAt(0) !== ignoreKeyCode) {
                        _this.element.setSelectionRange(prevPos, prevPos);
                        _this.nextEle = _this.element.value[_this.element.selectionStart];
                        _this.cursorPosChanged = true;
                        _this.preventHandler();
                    }
                }
                if (_this.cursorPosChanged === true && _this.element.value[_this.element.selectionStart] === _this.nextEle &&
                    isNaN(parseFloat(_this.element.value[_this.element.selectionStart - 1]))) {
                    _this.element.setSelectionRange(_this.element.selectionStart + 1, _this.element.selectionStart + 1);
                    _this.cursorPosChanged = false;
                    _this.nextEle = null;
                }
                if (_this.element.value.trim() === '') {
                    _this.element.setSelectionRange(start, start);
                }
                if (_this.element.selectionStart > 0) {
                    if ((_this.element.value[_this.element.selectionStart - 1].charCodeAt(0) === 45) && _this.element.selectionStart > 1) {
                        if (!isNullOrUndefined(_this.prevVal)) {
                            _this.element.value = _this.prevVal;
                        }
                        _this.element.setSelectionRange(_this.element.selectionStart, _this.element.selectionStart);
                    }
                    if (_this.element.value[_this.element.selectionStart - 1] === decimalSeparator &&
                        _this.decimals === 0 &&
                        _this.validateDecimalOnType) {
                        _this.element.value = _this.element.value.substring(0, prevPos) +
                            _this.element.value.substring(currentPos, _this.element.value.length);
                    }
                }
                _this.prevVal = _this.element.value;
            }
        });
    };
    NumericTextBox.prototype.keyUpHandler = function () {
        if (!this.enabled || this.readonly) {
            return;
        }
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        if (!iOS && Browser.isDevice) {
            this.preventHandler();
        }
        var parseValue = this.instance.getNumberParser({ format: 'n' })(this.element.value);
        parseValue = parseValue === null || isNaN(parseValue) ? null : parseValue;
        this.hiddenInput.value = parseValue || parseValue === 0 ? parseValue.toString() : null;
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NumericTextBox.prototype.inputHandler = function (event) {
        var numerictextboxObj = null || this;
        if (!this.enabled || this.readonly) {
            return;
        }
        var iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
        var fireFox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if ((fireFox || iOS) && Browser.isDevice) {
            this.preventHandler();
        }
        /* istanbul ignore next */
        if (this.isAngular
            && this.element.value !== getValue('decimal', getNumericObject(this.locale))
            && this.element.value !== getValue('minusSign', getNumericObject(this.locale))) {
            var parsedValue = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            parsedValue = isNaN(parsedValue) ? null : parsedValue;
            numerictextboxObj.localChange({ value: parsedValue });
            this.preventChange = true;
        }
        if (this.isVue) {
            var current = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            var previous = this.instance.getNumberParser({ format: 'n' })(this.elementPrevValue);
            //EJ2-54963-if type "." or ".0" or "-.0" it converts to "0" automatically when binding v-model
            var nonZeroRegex = new RegExp('[^0-9]+$');
            if (nonZeroRegex.test(this.element.value) ||
                ((this.elementPrevValue.indexOf('.') !== -1 || this.elementPrevValue.indexOf('-') !== -1) &&
                    this.element.value[this.element.value.length - 1] === '0')) {
                current = this.value;
            }
            var eventArgs = {
                event: event,
                value: (current === null || isNaN(current) ? null : current),
                previousValue: (previous === null || isNaN(previous) ? null : previous)
            };
            this.preventChange = true;
            this.elementPrevValue = this.element.value;
            this.trigger('input', eventArgs);
        }
    };
    NumericTextBox.prototype.keyDownHandler = function (event) {
        if (!this.readonly) {
            switch (event.keyCode) {
                case 38:
                    event.preventDefault();
                    this.action(INCREMENT, event);
                    break;
                case 40:
                    event.preventDefault();
                    this.action(DECREMENT, event);
                    break;
                default: break;
            }
        }
    };
    NumericTextBox.prototype.performAction = function (value, step, operation) {
        if (value === null || isNaN(value)) {
            value = 0;
        }
        var updatedValue = operation === INCREMENT ? value + step : value - step;
        updatedValue = this.correctRounding(value, step, updatedValue);
        return this.strictMode ? this.trimValue(updatedValue) : updatedValue;
    };
    NumericTextBox.prototype.correctRounding = function (value, step, result) {
        var floatExp = new RegExp('[,.](.*)');
        var floatValue = floatExp.test(value.toString());
        var floatStep = floatExp.test(step.toString());
        if (floatValue || floatStep) {
            var valueCount = floatValue ? floatExp.exec(value.toString())[0].length : 0;
            var stepCount = floatStep ? floatExp.exec(step.toString())[0].length : 0;
            var max = Math.max(valueCount, stepCount);
            return value = this.roundValue(result, max);
        }
        return result;
    };
    NumericTextBox.prototype.roundValue = function (result, precision) {
        precision = precision || 0;
        var divide = Math.pow(10, precision);
        return result *= divide, result = Math.round(result) / divide;
    };
    NumericTextBox.prototype.updateValue = function (value, event) {
        if (event) {
            this.isInteract = true;
        }
        if (value !== null && !isNaN(value)) {
            if (this.decimals) {
                value = this.roundNumber(value, this.decimals);
            }
        }
        this.inputValue = value;
        this.changeValue(value === null || isNaN(value) ? null : this.strictMode ? this.trimValue(value) : value);
        /* istanbul ignore next */
        if (!this.isDynamicChange) {
            this.raiseChangeEvent(event);
        }
    };
    NumericTextBox.prototype.updateCurrency = function (prop, propVal) {
        setValue(prop, propVal, this.cultureInfo);
        this.updateValue(this.value);
    };
    NumericTextBox.prototype.changeValue = function (value) {
        if (!(value || value === 0)) {
            value = null;
            this.setProperties({ value: value }, true);
        }
        else {
            var numberOfDecimals = this.getNumberOfDecimals(value);
            this.setProperties({ value: this.roundNumber(value, numberOfDecimals) }, true);
        }
        this.modifyText();
        if (!this.strictMode) {
            this.validateState();
        }
    };
    NumericTextBox.prototype.modifyText = function () {
        if (this.value || this.value === 0) {
            var value = this.formatNumber();
            var elementValue = this.isFocused ? value : this.instance.getNumberFormat(this.cultureInfo)(this.value);
            this.setElementValue(elementValue);
            attributes(this.element, { 'aria-valuenow': value });
            if (!isNullOrUndefined(this.hiddenInput)) {
                this.hiddenInput.value = this.value.toString();
                if (this.value !== null && this.serverDecimalSeparator) {
                    this.hiddenInput.value = this.hiddenInput.value.replace('.', this.serverDecimalSeparator);
                }
            }
        }
        else {
            this.setElementValue('');
            this.element.removeAttribute('aria-valuenow');
            this.hiddenInput.value = null;
        }
    };
    NumericTextBox.prototype.setElementValue = function (val, element) {
        Input.setValue(val, (element ? element : this.element), this.floatLabelType, this.showClearButton);
    };
    NumericTextBox.prototype.validateState = function () {
        this.isValidState = true;
        if (this.value || this.value === 0) {
            this.isValidState = !(this.value > this.max || this.value < this.min);
        }
        this.checkErrorClass();
    };
    NumericTextBox.prototype.getNumberOfDecimals = function (value) {
        var numberOfDecimals;
        // eslint-disable-next-line no-useless-escape
        var EXPREGEXP = new RegExp('[eE][\-+]?([0-9]+)');
        var valueString = value.toString();
        if (EXPREGEXP.test(valueString)) {
            var result = EXPREGEXP.exec(valueString);
            if (!isNullOrUndefined(result)) {
                valueString = value.toFixed(Math.min(parseInt(result[1], 10), 20));
            }
        }
        var decimalPart = valueString.split('.')[1];
        numberOfDecimals = !decimalPart || !decimalPart.length ? 0 : decimalPart.length;
        if (this.decimals !== null) {
            numberOfDecimals = numberOfDecimals < this.decimals ? numberOfDecimals : this.decimals;
        }
        return numberOfDecimals;
    };
    NumericTextBox.prototype.formatNumber = function () {
        var numberOfDecimals = this.getNumberOfDecimals(this.value);
        return this.instance.getNumberFormat({
            maximumFractionDigits: numberOfDecimals,
            minimumFractionDigits: numberOfDecimals, useGrouping: false
        })(this.value);
    };
    NumericTextBox.prototype.trimValue = function (value) {
        if (value > this.max) {
            return this.max;
        }
        if (value < this.min) {
            return this.min;
        }
        return value;
    };
    NumericTextBox.prototype.roundNumber = function (value, precision) {
        var result = value;
        var decimals = precision || 0;
        var result1 = result.toString().split('e');
        result = Math.round(Number(result1[0] + 'e' + (result1[1] ? (Number(result1[1]) + decimals) : decimals)));
        var result2 = result.toString().split('e');
        result = Number(result2[0] + 'e' + (result2[1] ? (Number(result2[1]) - decimals) : -decimals));
        return Number(result.toFixed(decimals));
    };
    NumericTextBox.prototype.cancelEvent = function (event) {
        event.preventDefault();
        return false;
    };
    NumericTextBox.prototype.keyPressHandler = function (event) {
        if (!this.enabled || this.readonly) {
            return true;
        }
        if (!Browser.isDevice && Browser.info.version === '11.0' && event.keyCode === 13) {
            var parsedInput = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            this.updateValue(parsedInput, event);
            return true;
        }
        if (event.which === 0 || event.metaKey || event.ctrlKey || event.keyCode === 8 || event.keyCode === 13) {
            return true;
        }
        var currentChar = String.fromCharCode(event.which);
        var decimalSeparator = getValue('decimal', getNumericObject(this.locale));
        var isAlterNumPadDecimalChar = event.code === 'NumpadDecimal' && currentChar !== decimalSeparator;
        //EJ2-59813-replace the culture decimal separator value with numberpad decimal separator value when culture decimal separator and numberpad decimal separator are different
        if (isAlterNumPadDecimalChar) {
            currentChar = decimalSeparator;
        }
        var text = this.element.value;
        text = text.substring(0, this.element.selectionStart) + currentChar + text.substring(this.element.selectionEnd);
        if (!this.numericRegex().test(text)) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }
        else {
            //EJ2-59813-update the numberpad decimal separator and update the cursor position
            if (isAlterNumPadDecimalChar) {
                var start = this.element.selectionStart + 1;
                this.element.value = text;
                this.element.setSelectionRange(start, start);
                event.preventDefault();
                event.stopPropagation();
            }
            return true;
        }
    };
    NumericTextBox.prototype.numericRegex = function () {
        var numericObject = getNumericObject(this.locale);
        var decimalSeparator = getValue('decimal', numericObject);
        var fractionRule = '*';
        if (decimalSeparator === DECIMALSEPARATOR) {
            decimalSeparator = '\\' + decimalSeparator;
        }
        if (this.decimals === 0 && this.validateDecimalOnType) {
            return INTREGEXP;
        }
        if (this.decimals && this.validateDecimalOnType) {
            fractionRule = '{0,' + this.decimals + '}';
        }
        /* eslint-disable-next-line security/detect-non-literal-regexp */
        return new RegExp('^\\s*(-)?(((\\d+(' + decimalSeparator + '\\d' + fractionRule +
            ')?)|(' + decimalSeparator + '\\d' + fractionRule + ')))?$');
    };
    NumericTextBox.prototype.mouseWheel = function (event) {
        event.preventDefault();
        var delta;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var rawEvent = event;
        if (rawEvent.wheelDelta) {
            delta = rawEvent.wheelDelta / 120;
        }
        else if (rawEvent.detail) {
            delta = -rawEvent.detail / 3;
        }
        if (delta > 0) {
            this.action(INCREMENT, event);
        }
        else if (delta < 0) {
            this.action(DECREMENT, event);
        }
        this.cancelEvent(event);
    };
    NumericTextBox.prototype.focusHandler = function (event) {
        var _this = this;
        clearTimeout(selectionTimeOut);
        this.focusEventArgs = { event: event, value: this.value, container: this.container };
        this.trigger('focus', this.focusEventArgs);
        if (!this.enabled || this.readonly) {
            return;
        }
        this.isFocused = true;
        this.prevValue = this.value;
        if ((this.value || this.value === 0)) {
            var formatValue_1 = this.formatNumber();
            this.setElementValue(formatValue_1);
            if (!this.isPrevFocused) {
                if (!Browser.isDevice && Browser.info.version === '11.0') {
                    this.element.setSelectionRange(0, formatValue_1.length);
                }
                else {
                    var delay = (Browser.isDevice && Browser.isIos) ? 600 : 0;
                    selectionTimeOut = setTimeout(function () {
                        _this.element.setSelectionRange(0, formatValue_1.length);
                    }, delay);
                }
            }
        }
        if (!Browser.isDevice) {
            EventHandler.add(this.element, 'mousewheel DOMMouseScroll', this.mouseWheel, this);
        }
    };
    NumericTextBox.prototype.focusOutHandler = function (event) {
        var _this = this;
        this.blurEventArgs = { event: event, value: this.value, container: this.container };
        this.trigger('blur', this.blurEventArgs);
        if (!this.enabled || this.readonly) {
            return;
        }
        if (this.isPrevFocused) {
            event.preventDefault();
            if (Browser.isDevice) {
                var value_1 = this.element.value;
                this.element.focus();
                this.isPrevFocused = false;
                var ele_1 = this.element;
                setTimeout(function () {
                    _this.setElementValue(value_1, ele_1);
                }, 200);
            }
        }
        else {
            this.isFocused = false;
            if (!this.element.value.length) {
                this.setProperties({ value: null }, true);
            }
            var parsedInput = this.instance.getNumberParser({ format: 'n' })(this.element.value);
            this.updateValue(parsedInput);
            if (!Browser.isDevice) {
                EventHandler.remove(this.element, 'mousewheel DOMMouseScroll', this.mouseWheel);
            }
        }
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var focusEvent = document.createEvent('FocusEvent');
            focusEvent.initEvent('focusout', false, true);
            element.dispatchEvent(focusEvent);
        }
    };
    NumericTextBox.prototype.mouseDownOnSpinner = function (event) {
        var _this = this;
        if (this.isFocused) {
            this.isPrevFocused = true;
            event.preventDefault();
        }
        if (!this.getElementData(event)) {
            return;
        }
        this.getElementData(event);
        var target = event.currentTarget;
        var action = (target.classList.contains(SPINUP)) ? INCREMENT : DECREMENT;
        EventHandler.add(target, 'mouseleave', this.mouseUpClick, this);
        this.timeOut = setInterval(function () {
            _this.isCalled = true;
            _this.action(action, event);
        }, 150);
        EventHandler.add(document, 'mouseup', this.mouseUpClick, this);
    };
    NumericTextBox.prototype.touchMoveOnSpinner = function (event) {
        var target;
        if (event.type === 'touchmove') {
            var touchEvent = event.touches;
            target = touchEvent.length && document.elementFromPoint(touchEvent[0].pageX, touchEvent[0].pageY);
        }
        else {
            target = document.elementFromPoint(event.clientX, event.clientY);
        }
        if (!(target.classList.contains(SPINICON))) {
            clearInterval(this.timeOut);
        }
    };
    NumericTextBox.prototype.mouseUpOnSpinner = function (event) {
        this.prevValue = this.value;
        if (this.isPrevFocused) {
            this.element.focus();
            if (!Browser.isDevice) {
                this.isPrevFocused = false;
            }
        }
        if (!Browser.isDevice) {
            event.preventDefault();
        }
        if (!this.getElementData(event)) {
            return;
        }
        var target = event.currentTarget;
        var action = (target.classList.contains(SPINUP)) ? INCREMENT : DECREMENT;
        EventHandler.remove(target, 'mouseleave', this.mouseUpClick);
        if (!this.isCalled) {
            this.action(action, event);
        }
        this.isCalled = false;
        EventHandler.remove(document, 'mouseup', this.mouseUpClick);
        var formElement = closest(this.element, 'form');
        if (formElement) {
            var element = this.element.nextElementSibling;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    NumericTextBox.prototype.getElementData = function (event) {
        if ((event.which && event.which === 3) || (event.button && event.button === 2)
            || !this.enabled || this.readonly) {
            return false;
        }
        clearInterval(this.timeOut);
        return true;
    };
    NumericTextBox.prototype.floatLabelTypeUpdate = function () {
        Input.removeFloating(this.inputWrapper);
        var hiddenInput = this.hiddenInput;
        this.hiddenInput.remove();
        Input.addFloating(this.element, this.floatLabelType, this.placeholder, this.createElement);
        this.container.insertBefore(hiddenInput, this.container.childNodes[1]);
    };
    NumericTextBox.prototype.mouseUpClick = function (event) {
        event.stopPropagation();
        clearInterval(this.timeOut);
        this.isCalled = false;
        if (this.spinUp) {
            EventHandler.remove(this.spinUp, 'mouseleave', this.mouseUpClick);
        }
        if (this.spinDown) {
            EventHandler.remove(this.spinDown, 'mouseleave', this.mouseUpClick);
        }
    };
    /**
     * Increments the NumericTextBox value with the specified step value.
     *
     * @param {number} step - Specifies the value used to increment the NumericTextBox value.
     * if its not given then numeric value will be incremented based on the step property value.
     * @returns {void}
     */
    NumericTextBox.prototype.increment = function (step) {
        if (step === void 0) { step = this.step; }
        this.isInteract = false;
        this.changeValue(this.performAction(this.value, step, INCREMENT));
        this.raiseChangeEvent();
    };
    /**
     * Decrements the NumericTextBox value with specified step value.
     *
     * @param {number} step - Specifies the value used to decrement the NumericTextBox value.
     * if its not given then numeric value will be decremented based on the step property value.
     * @returns {void}
     */
    NumericTextBox.prototype.decrement = function (step) {
        if (step === void 0) { step = this.step; }
        this.isInteract = false;
        this.changeValue(this.performAction(this.value, step, DECREMENT));
        this.raiseChangeEvent();
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also it maintains the initial input element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    NumericTextBox.prototype.destroy = function () {
        this.unwireEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        detach(this.hiddenInput);
        if (this.showSpinButton) {
            this.unwireSpinBtnEvents();
            detach(this.spinUp);
            detach(this.spinDown);
        }
        var attrArray = ['aria-labelledby', 'role', 'autocomplete', 'aria-readonly',
            'aria-disabled', 'autocapitalize', 'spellcheck', 'aria-autocomplete', 'tabindex',
            'aria-valuemin', 'aria-valuemax', 'aria-valuenow', 'aria-invalid'];
        for (var i = 0; i < attrArray.length; i++) {
            this.element.removeAttribute(attrArray[i]);
        }
        this.element.classList.remove('e-input');
        this.container.insertAdjacentElement('afterend', this.element);
        detach(this.container);
        this.spinUp = null;
        this.spinDown = null;
        this.container = null;
        this.hiddenInput = null;
        this.changeEventArgs = null;
        this.blurEventArgs = null;
        this.focusEventArgs = null;
        this.inputWrapper = null;
        Input.destroy({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        _super.prototype.destroy.call(this);
    };
    /**
     * Returns the value of NumericTextBox with the format applied to the NumericTextBox.
     *
     * @returns {string} - Returns the formatted value of the NumericTextBox.
     */
    NumericTextBox.prototype.getText = function () {
        return this.element.value;
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    NumericTextBox.prototype.focusIn = function () {
        if (document.activeElement !== this.element && this.enabled) {
            this.element.focus();
            addClass([this.container], [NUMERIC_FOCUS]);
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    NumericTextBox.prototype.focusOut = function () {
        if (document.activeElement === this.element && this.enabled) {
            this.element.blur();
            removeClass([this.container], [NUMERIC_FOCUS]);
        }
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the persisted data.
     */
    NumericTextBox.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {NumericTextBoxModel} newProp - Returns the dynamic property value of the component.
     * @param {NumericTextBoxModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    NumericTextBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'width':
                    this.setElementWidth(newProp.width);
                    Input.calculateWidth(this.element, this.container);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'enabled':
                    Input.setEnabled(newProp.enabled, this.element);
                    this.bindClearEvent();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(newProp.enableRtl, [this.container]);
                    break;
                case 'readonly':
                    Input.setReadonly(newProp.readonly, this.element);
                    if (this.readonly) {
                        attributes(this.element, { 'aria-readonly': 'true' });
                    }
                    else {
                        this.element.removeAttribute('aria-readonly');
                    }
                    break;
                case 'htmlAttributes':
                    this.updateHTMLAttrToElement();
                    this.updateHTMLAttrToWrapper();
                    this.updateDataAttribute(true);
                    this.checkAttributes(true);
                    Input.validateInputType(this.container, this.element);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(newProp.placeholder, this.element);
                    Input.calculateWidth(this.element, this.container);
                    break;
                case 'step':
                    this.step = newProp.step;
                    this.validateStep();
                    break;
                case 'showSpinButton':
                    this.updateSpinButton(newProp);
                    break;
                case 'showClearButton':
                    this.updateClearButton(newProp);
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    this.floatLabelTypeUpdate();
                    break;
                case 'value':
                    this.isDynamicChange = (this.isAngular || this.isVue) && this.preventChange;
                    this.updateValue(newProp.value);
                    if (this.isDynamicChange) {
                        this.preventChange = false;
                        this.isDynamicChange = false;
                    }
                    break;
                case 'min':
                case 'max':
                    setValue(prop, getValue(prop, newProp), this);
                    this.validateMinMax();
                    this.updateValue(this.value);
                    break;
                case 'strictMode':
                    this.strictMode = newProp.strictMode;
                    this.updateValue(this.value);
                    this.validateState();
                    break;
                case 'locale':
                    this.initCultureFunc();
                    this.l10n.setLocale(this.locale);
                    this.setSpinButton();
                    this.updatePlaceholder();
                    Input.setPlaceholder(this.placeholder, this.element);
                    this.updateValue(this.value);
                    break;
                case 'currency':
                    {
                        var propVal = getValue(prop, newProp);
                        this.setProperties({ currencyCode: propVal }, true);
                        this.updateCurrency(prop, propVal);
                    }
                    break;
                case 'currencyCode':
                    {
                        var propValue = getValue(prop, newProp);
                        this.setProperties({ currency: propValue }, true);
                        this.updateCurrency('currency', propValue);
                    }
                    break;
                case 'format':
                    setValue(prop, getValue(prop, newProp), this);
                    this.initCultureInfo();
                    this.updateValue(this.value);
                    break;
                case 'decimals':
                    this.decimals = newProp.decimals;
                    this.updateValue(this.value);
            }
        }
    };
    NumericTextBox.prototype.updateClearButton = function (newProp) {
        Input.setClearButton(newProp.showClearButton, this.element, this.inputWrapper, undefined, this.createElement);
        this.bindClearEvent();
    };
    NumericTextBox.prototype.updateSpinButton = function (newProp) {
        if (newProp.showSpinButton) {
            this.spinBtnCreation();
        }
        else {
            detach(this.spinUp);
            detach(this.spinDown);
        }
    };
    /**
     * Gets the component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    NumericTextBox.prototype.getModuleName = function () {
        return 'numerictextbox';
    };
    __decorate([
        Property('')
    ], NumericTextBox.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "value", void 0);
    __decorate([
        Property(-(Number.MAX_VALUE))
    ], NumericTextBox.prototype, "min", void 0);
    __decorate([
        Property(Number.MAX_VALUE)
    ], NumericTextBox.prototype, "max", void 0);
    __decorate([
        Property(1)
    ], NumericTextBox.prototype, "step", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "placeholder", void 0);
    __decorate([
        Property({})
    ], NumericTextBox.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(true)
    ], NumericTextBox.prototype, "showSpinButton", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "readonly", void 0);
    __decorate([
        Property(true)
    ], NumericTextBox.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "showClearButton", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "enablePersistence", void 0);
    __decorate([
        Property('n2')
    ], NumericTextBox.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "decimals", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "currency", void 0);
    __decorate([
        Property(null)
    ], NumericTextBox.prototype, "currencyCode", void 0);
    __decorate([
        Property(true)
    ], NumericTextBox.prototype, "strictMode", void 0);
    __decorate([
        Property(false)
    ], NumericTextBox.prototype, "validateDecimalOnType", void 0);
    __decorate([
        Property('Never')
    ], NumericTextBox.prototype, "floatLabelType", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "created", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "change", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "focus", void 0);
    __decorate([
        Event()
    ], NumericTextBox.prototype, "blur", void 0);
    NumericTextBox = __decorate([
        NotifyPropertyChanges
    ], NumericTextBox);
    return NumericTextBox;
}(Component));
export { NumericTextBox };
