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
import { Component, Property, Event, EventHandler, L10n, setValue, getValue, isNullOrUndefined, Browser } from '@syncfusion/ej2-base';
import { NotifyPropertyChanges, detach, Internationalization, getUniqueID, closest } from '@syncfusion/ej2-base';
import { addClass, removeClass } from '@syncfusion/ej2-base';
import { Input, containerAttributes, TEXTBOX_FOCUS } from '../input/input';
var HIDE_CLEAR = 'e-clear-icon-hide';
/**
 * Represents the TextBox component that allows the user to enter the values based on it's type.
 * ```html
 * <input name='images' id='textbox'/>
 * ```
 * ```typescript
 * <script>
 *   var textboxObj = new TextBox();
 *   textboxObj.appendTo('#textbox');
 * </script>
 * ```
 */
var TextBox = /** @class */ (function (_super) {
    __extends(TextBox, _super);
    /**
     *
     * @param {TextBoxModel} options - Specifies the TextBox model.
     * @param {string | HTMLInputElement | HTMLTextAreaElement} element - Specifies the element to render as component.
     * @private
     */
    function TextBox(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.previousValue = null;
        _this.isHiddenInput = false;
        _this.isForm = false;
        _this.inputPreviousValue = null;
        _this.textboxOptions = options;
        return _this;
    }
    /**
     * Calls internally if any of the property value is changed.
     *
     * @param {TextBoxModel} newProp - Returns the dynamic property value of the component.
     * @param {TextBoxModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    TextBox.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'floatLabelType':
                    Input.removeFloating(this.textboxWrapper);
                    Input.addFloating(this.respectiveElement, this.floatLabelType, this.placeholder);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
                    this.bindClearEvent();
                    break;
                case 'width':
                    Input.setWidth(newProp.width, this.textboxWrapper.container);
                    break;
                case 'value':
                    {
                        var prevOnChange = this.isProtectedOnChange;
                        this.isProtectedOnChange = true;
                        if (!Input.isBlank(this.value)) {
                            this.value = this.value.toString();
                        }
                        this.isProtectedOnChange = prevOnChange;
                        Input.setValue(this.value, this.respectiveElement, this.floatLabelType, this.showClearButton);
                        if (this.isHiddenInput) {
                            this.element.value = this.respectiveElement.value;
                        }
                        this.inputPreviousValue = this.respectiveElement.value;
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
                        if (this.multiline && !isNullOrUndefined(this.textarea)) {
                            Input.validateInputType(this.textboxWrapper.container, this.textarea);
                        }
                        else {
                            Input.validateInputType(this.textboxWrapper.container, this.element);
                        }
                    }
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.respectiveElement);
                    break;
                case 'type':
                    if (this.respectiveElement.tagName !== 'TEXTAREA') {
                        this.respectiveElement.setAttribute('type', this.type);
                        Input.validateInputType(this.textboxWrapper.container, this.element);
                        this.raiseChangeEvent();
                    }
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.respectiveElement, this.textboxWrapper);
                    this.bindClearEvent();
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.textboxWrapper.container]);
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.respectiveElement);
                    Input.calculateWidth(this.respectiveElement, this.textboxWrapper.container);
                    break;
                case 'autocomplete':
                    if (this.autocomplete !== 'on' && this.autocomplete !== '') {
                        this.respectiveElement.autocomplete = this.autocomplete;
                    }
                    else {
                        this.removeAttributes(['autocomplete']);
                    }
                    break;
                case 'cssClass':
                    Input.updateCssClass(newProp.cssClass, oldProp.cssClass, this.textboxWrapper.container);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                    Input.setPlaceholder(this.placeholder, this.respectiveElement);
                    break;
            }
        }
    };
    /**
     * Gets the component name
     *
     * @returns {string} Returns the component name.
     * @private
     */
    TextBox.prototype.getModuleName = function () {
        return 'textbox';
    };
    TextBox.prototype.preRender = function () {
        this.cloneElement = this.element.cloneNode(true);
        this.formElement = closest(this.element, 'form');
        if (!isNullOrUndefined(this.formElement)) {
            this.isForm = true;
        }
        /* istanbul ignore next */
        if (this.element.tagName === 'EJS-TEXTBOX') {
            var ejInstance = getValue('ej2_instances', this.element);
            var inputElement = this.multiline ?
                this.createElement('textarea') :
                this.createElement('input');
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
        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['value'] === undefined)) && this.element.value !== '') {
            this.setProperties({ value: this.element.value }, true);
        }
        if (this.element.tagName !== 'TEXTAREA') {
            this.element.setAttribute('type', this.type);
        }
        if (this.type === 'text' || (this.element.tagName === 'INPUT' && this.multiline && this.isReact)) {
            this.element.setAttribute('role', 'textbox');
        }
        this.globalize = new Internationalization(this.locale);
        var localeText = { placeholder: this.placeholder };
        this.l10n = new L10n('textbox', localeText, this.locale);
        if (this.l10n.getConstant('placeholder') !== '') {
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (!this.element.hasAttribute('id')) {
            this.element.setAttribute('id', getUniqueID('textbox'));
        }
        if (!this.element.hasAttribute('name')) {
            this.element.setAttribute('name', this.element.getAttribute('id'));
        }
        if (this.element.tagName === 'INPUT' && this.multiline) {
            this.isHiddenInput = true;
            this.textarea = this.createElement('textarea');
            this.element.parentNode.insertBefore(this.textarea, this.element);
            this.element.setAttribute('type', 'hidden');
            this.textarea.setAttribute('name', this.element.getAttribute('name'));
            this.element.removeAttribute('name');
            this.textarea.setAttribute('role', this.element.getAttribute('role'));
            this.element.removeAttribute('role');
            this.textarea.setAttribute('id', getUniqueID('textarea'));
            var apiAttributes = ['placeholder', 'disabled', 'value', 'readonly', 'type', 'autocomplete'];
            for (var index = 0; index < this.element.attributes.length; index++) {
                var attributeName = this.element.attributes[index].nodeName;
                if (this.element.hasAttribute(attributeName) && containerAttributes.indexOf(attributeName) < 0 &&
                    !(attributeName === 'id' || attributeName === 'type' || attributeName === 'e-mappinguid')) {
                    // e-mappinguid attribute is handled for Grid component.
                    this.textarea.setAttribute(attributeName, this.element.attributes[index].nodeValue);
                    if (apiAttributes.indexOf(attributeName) < 0) {
                        this.element.removeAttribute(attributeName);
                        index--;
                    }
                }
            }
        }
    };
    TextBox.prototype.checkAttributes = function (isDynamic) {
        var attrs = isDynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['placeholder', 'disabled', 'value', 'readonly', 'type', 'autocomplete'];
        for (var _i = 0, attrs_1 = attrs; _i < attrs_1.length; _i++) {
            var key = attrs_1[_i];
            if (!isNullOrUndefined(this.element.getAttribute(key))) {
                switch (key) {
                    case 'disabled':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['enabled'] === undefined)) || isDynamic) {
                            var enabled = this.element.getAttribute(key) === 'disabled' || this.element.getAttribute(key) === '' ||
                                this.element.getAttribute(key) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !isDynamic);
                        }
                        break;
                    case 'readonly':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['readonly'] === undefined)) || isDynamic) {
                            var readonly = this.element.getAttribute(key) === 'readonly' || this.element.getAttribute(key) === ''
                                || this.element.getAttribute(key) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !isDynamic);
                        }
                        break;
                    case 'placeholder':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['placeholder'] === undefined)) || isDynamic) {
                            this.setProperties({ placeholder: this.element.placeholder }, !isDynamic);
                        }
                        break;
                    case 'autocomplete':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['autocomplete'] === undefined)) || isDynamic) {
                            var autoCompleteTxt = this.element.autocomplete === 'off' ? 'off' : 'on';
                            this.setProperties({ autocomplete: autoCompleteTxt }, !isDynamic);
                        }
                        break;
                    case 'value':
                        if (((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['value'] === undefined)) || isDynamic) && this.element.value !== '') {
                            this.setProperties({ value: this.element.value }, !isDynamic);
                        }
                        break;
                    case 'type':
                        if ((isNullOrUndefined(this.textboxOptions) || (this.textboxOptions['type'] === undefined)) || isDynamic) {
                            this.setProperties({ type: this.element.type }, !isDynamic);
                        }
                        break;
                }
            }
        }
    };
    /**
     * To Initialize the control rendering
     *
     * @returns {void}
     * @private
     */
    TextBox.prototype.render = function () {
        var updatedCssClassValue = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValue = Input.getInputValidClassList(this.cssClass);
        }
        this.respectiveElement = (this.isHiddenInput) ? this.textarea : this.element;
        this.textboxWrapper = Input.createInput({
            element: this.respectiveElement,
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
        if (this.isHiddenInput) {
            this.respectiveElement.parentNode.insertBefore(this.element, this.respectiveElement);
        }
        this.wireEvents();
        if (!isNullOrUndefined(this.value)) {
            Input.setValue(this.value, this.respectiveElement, this.floatLabelType, this.showClearButton);
            if (this.isHiddenInput) {
                this.element.value = this.respectiveElement.value;
            }
        }
        if (!isNullOrUndefined(this.value)) {
            this.initialValue = this.value;
            this.setInitialValue();
        }
        if (this.autocomplete !== 'on' && this.autocomplete !== '') {
            this.respectiveElement.autocomplete = this.autocomplete;
        }
        else if (!isNullOrUndefined(this.textboxOptions) && (this.textboxOptions['autocomplete'] !== undefined)) {
            this.removeAttributes(['autocomplete']);
        }
        this.previousValue = this.value;
        this.inputPreviousValue = this.value;
        this.respectiveElement.defaultValue = this.respectiveElement.value;
        Input.setWidth(this.width, this.textboxWrapper.container);
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        if (!this.element.hasAttribute('aria-labelledby') && !this.element.hasAttribute('placeholder') && !this.element.hasAttribute('aria-label')) {
            this.element.setAttribute('aria-label', 'textbox');
        }
        this.renderComplete();
    };
    TextBox.prototype.updateHTMLAttributesToWrapper = function () {
        Input.updateHTMLAttributesToWrapper(this.htmlAttributes, this.textboxWrapper.container);
    };
    TextBox.prototype.updateHTMLAttributesToElement = function () {
        Input.updateHTMLAttributesToElement(this.htmlAttributes, this.respectiveElement ? this.respectiveElement :
            (this.multiline && !isNullOrUndefined(this.textarea) ? this.textarea : this.element));
    };
    TextBox.prototype.setInitialValue = function () {
        if (!this.isAngular) {
            this.respectiveElement.setAttribute('value', this.initialValue);
        }
    };
    TextBox.prototype.wireEvents = function () {
        EventHandler.add(this.respectiveElement, 'focus', this.focusHandler, this);
        EventHandler.add(this.respectiveElement, 'blur', this.focusOutHandler, this);
        EventHandler.add(this.respectiveElement, 'keydown', this.keydownHandler, this);
        EventHandler.add(this.respectiveElement, 'input', this.inputHandler, this);
        EventHandler.add(this.respectiveElement, 'change', this.changeHandler, this);
        if (this.isForm) {
            EventHandler.add(this.formElement, 'reset', this.resetForm, this);
        }
        this.bindClearEvent();
        if (!isNullOrUndefined(this.textboxWrapper.container.querySelector('.e-float-text')) && this.floatLabelType === 'Auto'
            && this.textboxWrapper.container.classList.contains('e-autofill') &&
            this.textboxWrapper.container.classList.contains('e-outline')) {
            EventHandler.add((this.textboxWrapper.container.querySelector('.e-float-text')), 'animationstart', this.animationHandler, this);
        }
    };
    TextBox.prototype.animationHandler = function () {
        this.textboxWrapper.container.classList.add('e-valid-input');
        var label = this.textboxWrapper.container.querySelector('.e-float-text');
        if (!isNullOrUndefined(label)) {
            label.classList.add('e-label-top');
            if (label.classList.contains('e-label-bottom')) {
                label.classList.remove('e-label-bottom');
            }
        }
    };
    TextBox.prototype.resetValue = function (value) {
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = value;
        if (value == null && this.textboxWrapper.container.classList.contains('e-valid-input') && !(this.floatLabelType === 'Always' && this.textboxWrapper.container.classList.contains('e-outline'))) {
            this.textboxWrapper.container.classList.remove('e-valid-input');
        }
        this.isProtectedOnChange = prevOnChange;
    };
    TextBox.prototype.resetForm = function () {
        if (this.isAngular) {
            this.resetValue('');
        }
        else {
            this.resetValue(this.initialValue);
        }
        if (!isNullOrUndefined(this.textboxWrapper)) {
            var label = this.textboxWrapper.container.querySelector('.e-float-text');
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
    TextBox.prototype.focusHandler = function (args) {
        var eventArgs = {
            container: this.textboxWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('focus', eventArgs);
    };
    TextBox.prototype.focusOutHandler = function (args) {
        if (!(this.previousValue === null && this.value === null && this.respectiveElement.value === '') &&
            (this.previousValue !== this.value)) {
            this.raiseChangeEvent(args, true);
        }
        var eventArgs = {
            container: this.textboxWrapper.container,
            event: args,
            value: this.value
        };
        this.trigger('blur', eventArgs);
    };
    TextBox.prototype.keydownHandler = function (args) {
        if ((args.keyCode === 13 || args.keyCode === 9) && !((this.previousValue === null || this.previousValue === '') && (this.value === null || this.value === '') && this.respectiveElement.value === '')) {
            this.setProperties({ value: this.respectiveElement.value }, true);
        }
    };
    TextBox.prototype.inputHandler = function (args) {
        var textboxObj = null || this;
        var eventArgs = {
            event: args,
            value: this.respectiveElement.value,
            previousValue: this.inputPreviousValue,
            container: this.textboxWrapper.container
        };
        this.inputPreviousValue = this.respectiveElement.value;
        /* istanbul ignore next */
        if (this.isAngular) {
            textboxObj.localChange({ value: this.respectiveElement.value });
            this.preventChange = true;
        }
        if (this.isVue) {
            this.preventChange = true;
        }
        this.trigger('input', eventArgs);
        args.stopPropagation();
    };
    TextBox.prototype.changeHandler = function (args) {
        this.setProperties({ value: this.respectiveElement.value }, true);
        if (this.previousValue !== this.value) {
            this.raiseChangeEvent(args, true);
        }
        args.stopPropagation();
    };
    TextBox.prototype.raiseChangeEvent = function (event, interaction) {
        var eventArgs = {
            event: event,
            value: this.value,
            previousValue: this.previousValue,
            container: this.textboxWrapper.container,
            isInteraction: interaction ? interaction : false,
            isInteracted: interaction ? interaction : false
        };
        this.preventChange = false;
        this.trigger('change', eventArgs);
        this.previousValue = this.value;
        //EJ2CORE-738:For this task we update the textarea value to the input when input tag with multiline is present
        if (this.element.tagName === 'INPUT' && this.multiline && Browser.info.name === 'mozilla') {
            this.element.value = this.respectiveElement.value;
        }
    };
    TextBox.prototype.bindClearEvent = function () {
        if (this.showClearButton) {
            if (this.enabled) {
                EventHandler.add(this.textboxWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler, this);
            }
            else {
                EventHandler.remove(this.textboxWrapper.clearButton, 'mousedown touchstart', this.resetInputHandler);
            }
        }
    };
    TextBox.prototype.resetInputHandler = function (event) {
        event.preventDefault();
        if (!(this.textboxWrapper.clearButton.classList.contains(HIDE_CLEAR)) || this.textboxWrapper.container.classList.contains('e-static-clear')) {
            Input.setValue('', this.respectiveElement, this.floatLabelType, this.showClearButton);
            if (this.isHiddenInput) {
                this.element.value = this.respectiveElement.value;
            }
            this.setProperties({ value: this.respectiveElement.value }, true);
            var eventArgs = {
                event: event,
                value: this.respectiveElement.value,
                previousValue: this.inputPreviousValue,
                container: this.textboxWrapper.container
            };
            this.trigger('input', eventArgs);
            this.inputPreviousValue = this.respectiveElement.value;
            this.raiseChangeEvent(event, true);
            if (closest(this.element, 'form')) {
                var element = this.element;
                var keyupEvent = document.createEvent('KeyboardEvent');
                keyupEvent.initEvent('keyup', false, true);
                element.dispatchEvent(keyupEvent);
            }
        }
    };
    TextBox.prototype.unWireEvents = function () {
        EventHandler.remove(this.respectiveElement, 'focus', this.focusHandler);
        EventHandler.remove(this.respectiveElement, 'blur', this.focusOutHandler);
        EventHandler.remove(this.respectiveElement, 'keydown', this.keydownHandler);
        EventHandler.remove(this.respectiveElement, 'input', this.inputHandler);
        EventHandler.remove(this.respectiveElement, 'change', this.changeHandler);
        if (this.isForm) {
            EventHandler.remove(this.formElement, 'reset', this.resetForm);
        }
        if (!isNullOrUndefined(this.textboxWrapper.container.querySelector('.e-float-text')) && this.floatLabelType === 'Auto'
            && this.textboxWrapper.container.classList.contains('e-outline') &&
            this.textboxWrapper.container.classList.contains('e-autofill')) {
            EventHandler.remove((this.textboxWrapper.container.querySelector('.e-float-text')), 'animationstart', this.animationHandler);
        }
    };
    /**
     * Removes the component from the DOM and detaches all its related event handlers.
     * Also, it maintains the initial TextBox element from the DOM.
     *
     * @method destroy
     * @returns {void}
     */
    TextBox.prototype.destroy = function () {
        this.unWireEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        if (this.element.tagName === 'INPUT' && this.multiline) {
            detach(this.textboxWrapper.container.getElementsByTagName('textarea')[0]);
            this.respectiveElement = this.element;
            this.element.removeAttribute('type');
        }
        this.respectiveElement.value = this.respectiveElement.defaultValue;
        this.respectiveElement.classList.remove('e-input');
        this.removeAttributes(['aria-disabled', 'aria-readonly', 'aria-labelledby']);
        if (!isNullOrUndefined(this.textboxWrapper)) {
            this.textboxWrapper.container.insertAdjacentElement('afterend', this.respectiveElement);
            detach(this.textboxWrapper.container);
        }
        this.textboxWrapper = null;
        Input.destroy({
            element: this.respectiveElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        _super.prototype.destroy.call(this);
    };
    /**
     * Adding the icons to the TextBox component.
     *
     * @param { string } position - Specify the icon placement on the TextBox. Possible values are append and prepend.
     * @param { string | string[] } icons - Icon classes which are need to add to the span element which is going to created.
     * Span element acts as icon or button element for TextBox.
     * @returns {void}
     */
    TextBox.prototype.addIcon = function (position, icons) {
        Input.addIcon(position, icons, this.textboxWrapper.container, this.respectiveElement, this.createElement);
    };
    /**
     * Gets the properties to be maintained in the persisted state.
     *
     * @returns {string} Returns the persisted data.
     */
    TextBox.prototype.getPersistData = function () {
        var keyEntity = ['value'];
        return this.addOnPersist(keyEntity);
    };
    /**
     * Adding the multiple attributes as key-value pair to the TextBox element.
     *
     * @param {string} attributes - Specifies the attributes to be add to TextBox element.
     * @returns {void}
     */
    TextBox.prototype.addAttributes = function (attributes) {
        for (var _i = 0, _a = Object.keys(attributes); _i < _a.length; _i++) {
            var key = _a[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: false }, true);
                Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: true }, true);
                Input.setReadonly(this.readonly, this.respectiveElement);
            }
            else if (key === 'class') {
                this.respectiveElement.classList.add(attributes["" + key]);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: attributes["" + key] }, true);
                Input.setPlaceholder(this.placeholder, this.respectiveElement);
            }
            else if (key === 'rows' && this.respectiveElement.tagName === 'TEXTAREA') {
                this.respectiveElement.setAttribute(key, attributes["" + key]);
            }
            else {
                this.respectiveElement.setAttribute(key, attributes["" + key]);
            }
        }
    };
    /**
     * Removing the multiple attributes as key-value pair to the TextBox element.
     *
     * @param { string[] } attributes - Specifies the attributes name to be removed from TextBox element.
     * @returns {void}
     */
    TextBox.prototype.removeAttributes = function (attributes) {
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var key = attributes_1[_i];
            if (key === 'disabled') {
                this.setProperties({ enabled: true }, true);
                Input.setEnabled(this.enabled, this.respectiveElement, this.floatLabelType, this.textboxWrapper.container);
            }
            else if (key === 'readonly') {
                this.setProperties({ readonly: false }, true);
                Input.setReadonly(this.readonly, this.respectiveElement);
            }
            else if (key === 'placeholder') {
                this.setProperties({ placeholder: null }, true);
                Input.setPlaceholder(this.placeholder, this.respectiveElement);
            }
            else {
                this.respectiveElement.removeAttribute(key);
            }
        }
    };
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    TextBox.prototype.focusIn = function () {
        if (document.activeElement !== this.respectiveElement && this.enabled) {
            this.respectiveElement.focus();
            if (this.textboxWrapper.container.classList.contains('e-input-group')
                || this.textboxWrapper.container.classList.contains('e-outline')
                || this.textboxWrapper.container.classList.contains('e-filled')) {
                addClass([this.textboxWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    TextBox.prototype.focusOut = function () {
        if (document.activeElement === this.respectiveElement && this.enabled) {
            this.respectiveElement.blur();
            if (this.textboxWrapper.container.classList.contains('e-input-group')
                || this.textboxWrapper.container.classList.contains('e-outline')
                || this.textboxWrapper.container.classList.contains('e-filled')) {
                removeClass([this.textboxWrapper.container], [TEXTBOX_FOCUS]);
            }
        }
    };
    __decorate([
        Property('text')
    ], TextBox.prototype, "type", void 0);
    __decorate([
        Property(false)
    ], TextBox.prototype, "readonly", void 0);
    __decorate([
        Property(null)
    ], TextBox.prototype, "value", void 0);
    __decorate([
        Property('Never')
    ], TextBox.prototype, "floatLabelType", void 0);
    __decorate([
        Property('')
    ], TextBox.prototype, "cssClass", void 0);
    __decorate([
        Property(null)
    ], TextBox.prototype, "placeholder", void 0);
    __decorate([
        Property('on')
    ], TextBox.prototype, "autocomplete", void 0);
    __decorate([
        Property({})
    ], TextBox.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(false)
    ], TextBox.prototype, "multiline", void 0);
    __decorate([
        Property(true)
    ], TextBox.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], TextBox.prototype, "showClearButton", void 0);
    __decorate([
        Property(false)
    ], TextBox.prototype, "enablePersistence", void 0);
    __decorate([
        Property(null)
    ], TextBox.prototype, "width", void 0);
    __decorate([
        Event()
    ], TextBox.prototype, "created", void 0);
    __decorate([
        Event()
    ], TextBox.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], TextBox.prototype, "change", void 0);
    __decorate([
        Event()
    ], TextBox.prototype, "blur", void 0);
    __decorate([
        Event()
    ], TextBox.prototype, "focus", void 0);
    __decorate([
        Event()
    ], TextBox.prototype, "input", void 0);
    TextBox = __decorate([
        NotifyPropertyChanges
    ], TextBox);
    return TextBox;
}(Component));
export { TextBox };
