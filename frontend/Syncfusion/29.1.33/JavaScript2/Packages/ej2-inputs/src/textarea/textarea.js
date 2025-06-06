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
import { Component, Property, NotifyPropertyChanges, isNullOrUndefined, setValue, getValue } from '@syncfusion/ej2-base';
import { detach, getUniqueID, Event, EventHandler, Internationalization, L10n, addClass, removeClass, closest, formatUnit } from '@syncfusion/ej2-base';
import { Input, TEXTBOX_FOCUS } from '../input/input';
var HIDE_CLEAR = 'e-clear-icon-hide';
var AUTO_WIDTH = 'e-auto-width';
var RESIZE_X = 'e-resize-x';
var RESIZE_Y = 'e-resize-y';
var RESIZE_XY = 'e-resize-xy';
var RESIZE_NONE = 'e-resize-none';
var TextArea = /** @class */ (function (_super) {
    __extends(TextArea, _super);
    function TextArea(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.previousValue = null;
        _this.isForm = false;
        _this.inputPreviousValue = null;
        _this.textareaOptions = options;
        return _this;
    }
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {TextAreaModel} newProp - Returns the dynamic property value of the component.
     * @param {TextAreaModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    TextArea.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'floatLabelType':
                    Input.removeFloating(this.textareaWrapper);
                    Input.addFloating(this.element, this.floatLabelType, this.placeholder);
                    if (this.floatLabelType === 'Never') {
                        this.element.removeAttribute('aria-labelledby');
                    }
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.element, this.floatLabelType, this.textareaWrapper.container);
                    this.bindClearEvent();
                    if (!this.enabled && this.resizeMode !== 'None') {
                        this.element.classList.remove(this.getCurrentResizeClass(this.resizeMode));
                        this.element.classList.add(RESIZE_NONE);
                    }
                    else {
                        this.element.classList.add(this.getCurrentResizeClass(this.resizeMode));
                    }
                    break;
                case 'width':
                    if (this.resizeMode !== 'None' && this.resizeMode !== 'Vertical') {
                        this.setElementWidth(newProp.width);
                        this.textareaWrapper.container.classList.add(AUTO_WIDTH);
                    }
                    else {
                        if (this.textareaWrapper.container.classList.contains(AUTO_WIDTH)) {
                            this.textareaWrapper.container.classList.remove(AUTO_WIDTH);
                        }
                        Input.setWidth(newProp.width, this.textareaWrapper.container);
                    }
                    break;
                case 'value':
                    {
                        var prevOnChange = this.isProtectedOnChange;
                        this.isProtectedOnChange = true;
                        if (!Input.isBlank(this.value)) {
                            this.value = this.value.toString();
                        }
                        this.isProtectedOnChange = prevOnChange;
                        Input.setValue(this.value, this.element, this.floatLabelType, this.showClearButton);
                        this.inputPreviousValue = this.element.value;
                        /* istanbul ignore next */
                        if ((this.isAngular || this.isVue) && this.preventChange === true) {
                            this.previousValue = this.isAngular ? this.value : this.previousValue;
                            this.preventChange = false;
                        }
                        else if (isNullOrUndefined(this.isAngular) || !this.isAngular
                            || (this.isAngular && !this.preventChange) || (this.isAngular && isNullOrUndefined(this.preventChange))) {
                            this.raiseChangeEvent();
                        }
                    }
                    break;
                case 'htmlAttributes':
                    {
                        this.updateHTMLAttributesToElement();
                        this.updateHTMLAttributesToWrapper();
                        this.checkAttributes(true);
                        Input.validateInputType(this.textareaWrapper.container, this.element);
                    }
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.element);
                    if (this.readonly) {
                        this.element.setAttribute('aria-readonly', 'true');
                    }
                    else {
                        this.element.removeAttribute('aria-readonly');
                    }
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.element, this.textareaWrapper);
                    this.bindClearEvent();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.textareaWrapper.container]);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.element);
                    Input.calculateWidth(this.element, this.textareaWrapper.container);
                    break;
                case 'cssClass':
                    Input.updateCssClass(newProp.cssClass, oldProp.cssClass, this.textareaWrapper.container);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.element);
                    break;
                case 'rows':
                    if (this.rows) {
                        this.element.setAttribute('rows', this.rows.toString());
                    }
                    break;
                case 'cols':
                    if (this.cols) {
                        this.element.setAttribute('cols', this.cols.toString());
                        if (this.width == null) {
                            this.textareaWrapper.container.classList.add(AUTO_WIDTH);
                        }
                    }
                    break;
                case 'maxLength':
                    if (this.maxLength) {
                        this.element.setAttribute('maxlength', this.maxLength.toString());
                    }
                    break;
                case 'resizeMode':
                    if (this.enabled) {
                        if (this.element.classList.contains(this.getCurrentResizeClass(oldProp.resizeMode))) {
                            this.element.classList.remove(this.getCurrentResizeClass(oldProp.resizeMode));
                        }
                        this.element.classList.add(this.getCurrentResizeClass(this.resizeMode));
                        if (this.element.style.width && (this.resizeMode === 'None' || this.resizeMode === 'Vertical')) {
                            Input.setWidth(this.element.style.width, this.textareaWrapper.container);
                        }
                        else {
                            var currentWidth = this.element.offsetWidth;
                            this.element.style.width = currentWidth + 'px';
                            if (this.textareaWrapper.container.style.width) {
                                this.textareaWrapper.container.style.width = '';
                            }
                        }
                        this.setWrapperWidth();
                    }
                    break;
            }
        }
    };
    TextArea.prototype.preRender = function () {
        this.formElement = closest(this.element, 'form');
        if (!isNullOrUndefined(this.formElement)) {
            this.isForm = true;
        }
        /* istanbul ignore next */
        if (this.element.tagName === 'EJS-TEXTAREA' || this.element.tagName === 'EJS-SMARTTEXTAREA') {
            var ejInstance = getValue('ej2_instances', this.element);
            var inputElement = this.createElement('textarea');
            var index = 0;
            for (index; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (attributeName !== 'id' && attributeName !== 'class') {
                    inputElement.setAttribute(attributeName, this.element.attributes[index].nodeValue);
                    inputElement.innerHTML = this.element.innerHTML;
                    if (attributeName === 'name') {
                        this.element.removeAttribute('name');
                    }
                }
                else if (attributeName === 'class') {
                    inputElement.setAttribute(attributeName, this.element.className.split(' ').filter(function (item) { return item.indexOf('ng-') !== 0; }).join(' '));
                }
            }
            this.element.appendChild(inputElement);
            this.element = inputElement;
            setValue('ej2_instances', ejInstance, this.element);
        }
        this.updateHTMLAttributesToElement();
        this.checkAttributes(false);
        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['value'] === undefined)) && this.element.value !== '') {
            this.setProperties({ value: this.element.value }, true);
        }
        this.globalize = new Internationalization(this.locale);
        var localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('textarea', localeText, this.locale);
        if (this.l10n.getConstant('placeholder') !== '') {
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (!this.element.hasAttribute('id')) {
            this.element.setAttribute('id', getUniqueID('textbox'));
        }
        if (!this.element.hasAttribute('name')) {
            this.element.setAttribute('name', this.element.getAttribute('id'));
        }
        if (this.rows) {
            this.element.setAttribute('rows', this.rows.toString());
        }
        if (this.cols) {
            this.element.setAttribute('cols', this.cols.toString());
        }
        if (this.maxLength) {
            this.element.setAttribute('maxlength', this.maxLength.toString());
        }
        if (!this.element.style.resize && this.enabled) {
            this.element.classList.add(this.getCurrentResizeClass(this.resizeMode));
        }
        if (this.enabled) {
            this.element.setAttribute('aria-multiline', 'true');
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    TextArea.prototype.render = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = Input.getInputValidClassList(this.cssClass);
        }
        this.textareaWrapper = Input.createInput({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: {
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                cssClass: updatedCssClassValue,
                readonly: this.readonly,
                placeholder: this.placeholder,
                showClearButton: this.showClearButton
            }
        });
        this.updateHTMLAttributesToWrapper();
        this.wireEvents();
        if (!isNullOrUndefined(this.value)) {
            Input.setValue(this.value, this.element, this.floatLabelType, this.showClearButton);
        }
        if (!isNullOrUndefined(this.value)) {
            this.initialValue = this.value;
            if (!this.isAngular) {
                this.element.setAttribute('value', this.initialValue);
            }
        }
        this.previousValue = this.value;
        this.inputPreviousValue = this.value;
        this.element.defaultValue = this.element.value;
        Input.setWidth(this.width, this.textareaWrapper.container);
        this.setWrapperWidth();
        this.renderComplete();
    };
    TextArea.prototype.getModuleName = function () {
        return 'textarea';
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} - Returns the string value.
     */
    TextArea.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    TextArea.prototype.checkAttributes = function (isDynamic) {
        var attrs = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['placeholder', 'disabled', 'value', 'readonly'];
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var key = attrs_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(key))) {
                switch (key) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.element.getAttribute(key) === 'disabled' || this.element.getAttribute(key) === '' ||
                                this.element.getAttribute(key) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.element.getAttribute(key) === 'readonly' || this.element.getAttribute(key) === ''
                                || this.element.getAttribute(key) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if (((isNullOrUndefined(this.textareaOptions) || (this.textareaOptions['value'] === undefined)) || isDynamic) && this.element.value !== '') {
                            this.setProperties({ value: this.element.value }, !isDynamic);
                        }
                        break;
                }
            }
        }
    };
    TextArea.prototype.wireEvents = function () {
        EventHandler.add(this.element, 'focus', this.focusHandler, this);
        EventHandler.add(this.element, 'blur', this.focusOutHandler, this);
        EventHandler.add(this.element, 'keydown', this.keydownHandler, this);
        EventHandler.add(this.element, 'input', this.inputHandler, this);
        EventHandler.add(this.element, 'change', this.changeHandler, this);
        if (this.isForm) {
            EventHandler.add(this.formElement, 'reset', this.resetForm, this);
        }
        this.bindClearEvent();
    };
    TextArea.prototype.unWireEvents = function () {
        EventHandler.remove(this.element, 'focus', this.focusHandler);
        EventHandler.remove(this.element, 'blur', this.focusOutHandler);
        EventHandler.remove(this.element, 'keydown', this.keydownHandler);
        EventHandler.remove(this.element, 'input', this.inputHandler);
        EventHandler.remove(this.element, 'change', this.changeHandler);
        if (this.isForm) {
            EventHandler.remove(this.formElement, 'reset', this.resetForm);
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also, it maintains the initial TextArea element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    TextArea.prototype.destroy = function () {
        this.unWireEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        this.element.value = this.element.defaultValue;
        this.element.classList.remove('e-input', RESIZE_X, RESIZE_Y, RESIZE_XY, RESIZE_NONE);
        this.removeAttributes(['aria-disabled', 'aria-readonly', 'aria-labelledby', 'aria-multiline']);
        if (!isNullOrUndefined(this.textareaWrapper)) {
            this.textareaWrapper.container.insertAdjacentElement('afterend', this.element);
            detach(this.textareaWrapper.container);
        }
        this.textareaWrapper = null;
        Input.destroy({
            element: this.element,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        this.formElement = null;
        _super.prototype.destroy.call(this);
    };
    TextArea.prototype.focusHandler = function (args) {
        var eventArgs = {
            container: this.textareaWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('focus', eventArgs);
    };
    TextArea.prototype.focusOutHandler = function (args) {
        if (!(this.previousValue === null && this.value === null) &&
            (this.previousValue !== this.value)) {
            this.raiseChangeEvent(args, true);
        }
        var eventArgs = {
            container: this.textareaWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('blur', eventArgs);
    };
    TextArea.prototype.keydownHandler = function (args) {
        if ((args.keyCode === 13 || args.keyCode === 9) && !((this.previousValue === null || this.previousValue === '') && (this.value === null || this.value === '') && this.element.value === '')) {
            this.setProperties({ value: this.element.value }, true);
        }
    };
    TextArea.prototype.inputHandler = function (args) {
        var textareaObj = null || this;
        var eventArgs = {
            event: args,
            value: this.element.value,
            previousValue: this.inputPreviousValue,
            container: this.textareaWrapper.container
        };
        this.inputPreviousValue = this.element.value;
        /* istanbul ignore next */
        if (this.isAngular) {
            textareaObj.localChange({ value: this.element.value });
            this.preventChange = true;
        }
        if (this.isVue) {
            this.preventChange = true;
        }
        this.trigger('input', eventArgs);
        args.stopPropagation();
    };
    TextArea.prototype.changeHandler = function (args) {
        this.setProperties({ value: this.element.value }, true);
        if (this.previousValue !== this.value) {
            this.raiseChangeEvent(args, true);
        }
        args.stopPropagation();
    };
    TextArea.prototype.raiseChangeEvent = function (event, interaction) {
        var eventArgs = {
            event: event,
            value: this.value,
            previousValue: this.previousValue,
            container: this.textareaWrapper.container,
            isInteraction: interaction ? interaction : false,
            isInteracted: interaction ? interaction : false
        };
        this.preventChange = false;
        this.trigger('change', eventArgs);
        this.previousValue = this.value;
    };
    TextArea.prototype.updateHTMLAttributesToWrapper = function () {
        Input.updateHTMLAttributesToWrapper(this.htmlAttributes, this.textareaWrapper.container);
    };
    TextArea.prototype.updateHTMLAttributesToElement = function () {
        Input.updateHTMLAttributesToElement(this.htmlAttributes, this.element);
    };
    TextArea.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            if (this.enabled) {
                EventHandler.add(this.textareaWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler, this);
            }
            else {
                EventHandler.remove(this.textareaWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler);
            }
        }
    };
    TextArea.prototype.resetInputHandler = function (event) {
        event.preventDefault();
        if (!(this.textareaWrapper.clearButton.classList.contains(HIDE_CLEAR)) || this.textareaWrapper.container.classList.contains('e-static-clear')) {
            Input.setValue('', this.element, this.floatLabelType, this.showClearButton);
            this.setProperties({ value: this.element.value }, true);
        }
        var eventArgs = {
            event: event,
            value: this.element.value,
            previousValue: this.inputPreviousValue,
            container: this.textareaWrapper.container
        };
        this.trigger('input', eventArgs);
        this.inputPreviousValue = this.element.value;
        this.raiseChangeEvent(event, true);
        if (closest(this.element, 'form')) {
            var element = this.element;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    /**
     * Adding the multiple attributes as key-value pair to the TextArea element.
     *
     * @param {string} attributes - Specifies the attributes to be add to TextArea element.
     * @returns {void}
     */
    TextArea.prototype.addAttributes = function (attributes) {
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: false }, true);
                Input.setEnabled(this.enabled, this.element, this.floatLabelType, this.textareaWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: true }, true);
                Input.setReadonly(this.readonly, this.element);
            }
            else if (key === 'class') {
                this.element.classList.add(attributes["" + key]);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: attributes["" + key] }, true);
                Input.setPlaceholder(this.placeholder, this.element);
            }
            else {
                this.element.setAttribute(key, attributes["" + key]);
            }
        }
    };
    /**
     * Removing the multiple attributes as key-value pair to the TextArea element.
     *
     * @param { string[] } attributes - Specifies the attributes name to be removed from TextArea element.
     * @returns {void}
     */
    TextArea.prototype.removeAttributes = function (attributes) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var key = attributes_1[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: true }, true);
                Input.setEnabled(this.enabled, this.element, this.floatLabelType, this.textareaWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: false }, true);
                Input.setReadonly(this.readonly, this.element);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: null }, true);
                Input.setPlaceholder(this.placeholder, this.element);
            }
            else {
                this.element.removeAttribute(key);
            }
        }
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    TextArea.prototype.focusIn = function () {
        if (document.activeElement !== this.element && this.enabled) {
            this.element.focus();
            if (this.textareaWrapper.container.classList.contains('e-input-group')
                || this.textareaWrapper.container.classList.contains('e-outline')
                || this.textareaWrapper.container.classList.contains('e-filled')) {
                addClass([this.textareaWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    TextArea.prototype.focusOut = function () {
        if (document.activeElement === this.element && this.enabled) {
            this.element.blur();
            if (this.textareaWrapper.container.classList.contains('e-input-group')
                || this.textareaWrapper.container.classList.contains('e-outline')
                || this.textareaWrapper.container.classList.contains('e-filled')) {
                removeClass([this.textareaWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    /**
     * Sets up the width for the textarea wrapper.
     *
     * @returns {void}
     */
    TextArea.prototype.setWrapperWidth = function () {
        if (this.enabled && ((this.resizeMode !== 'None' && this.resizeMode !== 'Vertical') || (this.cols || this.element.getAttribute('cols')))) {
            if (this.resizeMode !== 'None' && this.resizeMode !== 'Vertical') {
                if (this.textareaWrapper.container.style.width) {
                    this.setElementWidth(this.textareaWrapper.container.style.width);
                    this.textareaWrapper.container.style.width = '';
                    this.textareaWrapper.container.classList.add(AUTO_WIDTH);
                }
            }
            this.textareaWrapper.container.classList.add(AUTO_WIDTH);
        }
        else {
            if (this.textareaWrapper.container.classList.contains(AUTO_WIDTH)) {
                this.textareaWrapper.container.classList.remove(AUTO_WIDTH);
            }
        }
    };
    TextArea.prototype.resetForm = function () {
        if (this.isAngular) {
            this.resetValue('');
        }
        else {
            this.resetValue(this.initialValue);
        }
        if (!isNullOrUndefined(this.textareaWrapper)) {
            var label = this.textareaWrapper.container.querySelector('.e-float-text');
            if (!isNullOrUndefined(label) && this.floatLabelType !== 'Always') {
                if ((isNullOrUndefined(this.initialValue) || this.initialValue === '')) {
                    label.classList.add('e-label-bottom');
                    label.classList.remove('e-label-top');
                }
                else if (this.initialValue !== '') {
                    label.classList.add('e-label-top');
                    label.classList.remove('e-label-bottom');
                }
            }
        }
    };
    TextArea.prototype.resetValue = function (value) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = value;
        if (value == null && this.textareaWrapper.container.classList.contains('e-valid-input') && !(this.floatLabelType === 'Always' && this.textareaWrapper.container.classList.contains('e-outline'))) {
            this.textareaWrapper.container.classList.remove('e-valid-input');
        }
        this.isProtectedOnChange = prevOnChange;
    };
    TextArea.prototype.setElementWidth = function (width) {
        if (typeof width === 'number') {
            this.element.style.width = formatUnit(width);
        }
        else if (typeof width === 'string') {
            this.element.style.width = (width.match(/px|%|em/)) ? (width) : (formatUnit(width));
        }
    };
    TextArea.prototype.getCurrentResizeClass = function (resizeMode) {
        return resizeMode === 'None' ? RESIZE_NONE : (resizeMode === 'Both' ? RESIZE_XY : resizeMode === 'Horizontal' ? RESIZE_X : RESIZE_Y);
    };
    __decorate([
        Property(false)
    ], TextArea.prototype, "readonly", void 0);
    __decorate([
        Property(null)
    ], TextArea.prototype, "value", void 0);
    __decorate([
        Property('Never')
    ], TextArea.prototype, "floatLabelType", void 0);
    __decorate([
        Property('')
    ], TextArea.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], TextArea.prototype, "placeholder", void 0);
    __decorate([
        Property({})
    ], TextArea.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(true)
    ], TextArea.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], TextArea.prototype, "showClearButton", void 0);
    __decorate([
        Property(false)
    ], TextArea.prototype, "enablePersistence", void 0);
    __decorate([
        Property(null)
    ], TextArea.prototype, "width", void 0);
    __decorate([
        Property('Both')
    ], TextArea.prototype, "resizeMode", void 0);
    __decorate([
        Property(null)
    ], TextArea.prototype, "maxLength", void 0);
    __decorate([
        Property(null)
    ], TextArea.prototype, "cols", void 0);
    __decorate([
        Property(null)
    ], TextArea.prototype, "rows", void 0);
    __decorate([
        Event()
    ], TextArea.prototype, "created", void 0);
    __decorate([
        Event()
    ], TextArea.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], TextArea.prototype, "change", void 0);
    __decorate([
        Event()
    ], TextArea.prototype, "blur", void 0);
    __decorate([
        Event()
    ], TextArea.prototype, "focus", void 0);
    __decorate([
        Event()
    ], TextArea.prototype, "input", void 0);
    TextArea = __decorate([
        NotifyPropertyChanges
    ], TextArea);
    return TextArea;
}(Component));
export { TextArea };
