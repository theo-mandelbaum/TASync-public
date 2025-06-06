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
import { NotifyPropertyChanges, Component, Property, getUniqueID, isNullOrUndefined, addClass, attributes, removeClass, remove, Event, EventHandler } from '@syncfusion/ej2-base';
var INPUTFIELD = 'e-otp-input-field';
var RTL = 'e-rtl';
/**
 * Specifies the type of input for the Otp (One-Time Password) input component.
 */
export var OtpInputType;
(function (OtpInputType) {
    /**
     * Specifies the type of input to be number for the Otp input.
     */
    OtpInputType["Number"] = "number";
    /**
     * Specifies the type of input to be text for the Otp input.
     */
    OtpInputType["Text"] = "text";
    /**
     * Specifies the type of input to be password for the Otp input.
     */
    OtpInputType["Password"] = "password";
})(OtpInputType || (OtpInputType = {}));
/**
 * Specifies the style variant for the Otp (One-Time Password) input component.
 */
export var OtpInputStyle;
(function (OtpInputStyle) {
    /**
     * Specifies the style of the Otp input to be outlined.
     */
    OtpInputStyle["Outlined"] = "outlined";
    /**
     * Specifies the style of the Otp input to be underlined.
     */
    OtpInputStyle["Underlined"] = "underlined";
    /**
     * Specifies the style of the Otp input to be filled.
     */
    OtpInputStyle["Filled"] = "filled";
})(OtpInputStyle || (OtpInputStyle = {}));
/**
 * Enum for the case transformation options for OTP input text.
 *
 * @readonly
 * @enum {string}
 */
export var TextTransform;
(function (TextTransform) {
    /**
     * No case transformation. The input text remains unchanged.
     */
    TextTransform["None"] = "none";
    /**
     * Convert the input text to uppercase.
     */
    TextTransform["Uppercase"] = "uppercase";
    /**
     * Convert the input text to lowercase.
     */
    TextTransform["Lowercase"] = "lowercase";
})(TextTransform || (TextTransform = {}));
/**
 * Represents the Otp component that allows the user to enter the otp values.
 * ```html
 * <div id='OTPInput'></div>
 * ```
 * ```typescript
 * <script>
 *   var OtpinputObj = new OtpInput();
 *   OtpinputObj.appendTo('#OTPInput');
 * </script>
 * ```
 */
var OtpInput = /** @class */ (function (_super) {
    __extends(OtpInput, _super);
    function OtpInput(options, element) {
        var _this = _super.call(this, options, element) || this;
        /* Private variables */
        _this.inputs = [];
        _this.previousValue = '';
        _this.separatorElements = [];
        _this.shouldFireFocus = true;
        _this.shouldFireBlur = true;
        _this.isFocusInCalled = false;
        _this.isFocusOutCalled = false;
        _this.handleWheelEvent = function (e) {
            e.preventDefault();
        };
        return _this;
    }
    OtpInput.prototype.preRender = function () {
        if (!this.element.id) {
            this.element.id = getUniqueID('e-' + this.getModuleName());
        }
    };
    OtpInput.prototype.render = function () {
        this.initialize();
    };
    OtpInput.prototype.initialize = function () {
        attributes(this.element, { 'role': 'group' });
        this.renderInputs();
        this.renderSeparator(1, this.inputs.length);
        this.addPlaceHolder();
        this.updateCssClass(this.cssClass);
        this.updateVariantClass();
        this.updateAriaLabel(this.ariaLabels);
        this.setElementAttributes(this.htmlAttributes, this.element);
        if (this.enableRtl) {
            this.element.classList.add(RTL);
        }
        this.previousValue = this.value.toString();
        if (this.autoFocus) {
            this.focusIn();
        }
    };
    OtpInput.prototype.renderInputs = function () {
        this.hiddenInputEle = this.createElement('input', {
            id: 'otpInput_hidden',
            attrs: {
                name: this.element.id,
                type: 'hidden',
                value: this.type === 'number' ? this.value.toString().replace(/\D/g, '') : this.value.toString(),
                autoComplete: 'off'
            }
        });
        this.element.appendChild(this.hiddenInputEle);
        for (var i = 0; i < this.length; i++) {
            this.createOtpInput(i);
        }
    };
    OtpInput.prototype.createOtpInput = function (index) {
        var valueContainer = this.getDefaultValue();
        var inputValue = '';
        if (valueContainer) {
            var valueAtIndex = valueContainer[parseInt(index.toString(), 10)];
            if (this.type === 'number') {
                if (!isNaN(Number(valueAtIndex))) {
                    inputValue = valueAtIndex;
                }
            }
            else {
                inputValue = valueAtIndex || '';
            }
        }
        var inputEle = this.createElement('input', {
            id: this.element.id + "-" + (index + 1),
            className: INPUTFIELD + ' ' + 'e-input',
            attrs: {
                maxlength: '1',
                type: this.type,
                inputmode: this.htmlAttributes['inputmode'] || (this.type === 'number' ? 'numeric' : 'text')
            }
        });
        if (this.disabled) {
            inputEle.setAttribute('disabled', 'disabled');
        }
        this.element.appendChild(inputEle);
        this.inputs.push(inputEle);
        if (inputValue) {
            inputEle.value = inputValue;
        }
        this.wireEvents(inputEle, index);
    };
    OtpInput.prototype.renderSeparator = function (index, length) {
        if (this.separator.length > 0) {
            for (var i = index; i < length; i++) {
                var separatorElement = this.createElement('span', {
                    className: 'e-otp-separator'
                });
                separatorElement.textContent = this.separator;
                this.separatorElements.push(separatorElement);
                this.element.insertBefore(separatorElement, this.inputs[parseInt(i.toString(), 10)]);
            }
        }
    };
    OtpInput.prototype.updateSeparatorValue = function () {
        var _this = this;
        if (this.separator === '') {
            this.separatorElements.forEach(function (element) { return remove(element); });
            this.separatorElements = [];
        }
        else {
            this.separatorElements.forEach(function (element) {
                element.textContent = _this.separator;
            });
        }
    };
    OtpInput.prototype.addPlaceHolder = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var placeholderValue = this.placeholder.length <= 1 ? this.placeholder : this.placeholder.charAt(i);
            this.setElementAttributes({ 'placeholder': placeholderValue }, this.inputs[parseInt(i.toString(), 10)]);
        }
    };
    OtpInput.prototype.updateInputType = function (inputType) {
        var inputMode = this.htmlAttributes['inputmode'] || (inputType === 'number' ? 'numeric' : 'text');
        this.inputs.forEach(function (input) {
            input.type = inputType;
            input.setAttribute('inputmode', inputMode);
        });
    };
    OtpInput.prototype.getDefaultValue = function () {
        var extractedValue = typeof this.value === 'number' ? this.value.toString() : this.value;
        if (this.textTransform) {
            extractedValue = this.getTransformedText(extractedValue);
        }
        // To remove the white space if present.
        var value = extractedValue.replace(/\s/g, '');
        return value.length > 0 ? value.split('') : undefined;
    };
    OtpInput.prototype.getTransformedText = function (transformingText) {
        var transformedText = this.textTransform.toLowerCase() === TextTransform.Lowercase ? transformingText.toLowerCase() :
            this.textTransform.toLowerCase() === TextTransform.Uppercase ? transformingText.toUpperCase() : transformingText;
        return transformedText;
    };
    OtpInput.prototype.handleInputChange = function (index, event) {
        var currentInputElement = this.inputs[parseInt(index.toString(), 10)];
        if (currentInputElement && index < this.length - 1 && currentInputElement.value.length > 0) {
            var nextInputElement = this.inputs[parseInt(index.toString(), 10) + 1];
            this.shouldFireFocus = this.shouldFireBlur = false;
            nextInputElement.focus();
            if (nextInputElement && nextInputElement.value.length > 0) {
                nextInputElement.select();
            }
        }
        var target = event.target;
        if (target.value.length > 1) {
            target.value = target.value.slice(0, 1);
        }
        if (this.textTransform) {
            target.value = this.getTransformedText(target.value);
        }
        this.triggerInputEvent(index, event);
        this.triggerValuechanged(event, true);
    };
    OtpInput.prototype.handleKeyAction = function (index, event) {
        if (event.key.length > 1 && !((index === 0 && event.key === 'Backspace') ||
            (index === this.length - 1 && event.key === 'Delete'))) {
            this.shouldFireFocus = this.shouldFireBlur = false;
        }
        var currentInputElement = this.inputs[parseInt(index.toString(), 10)];
        var previousInputElement = this.inputs[parseInt(index.toString(), 10) - 1];
        var nextInputElement = this.inputs[parseInt(index.toString(), 10) + 1];
        if (event.key === 'Delete') {
            var value = '';
            if (currentInputElement.value.length > 0) {
                value = currentInputElement.value;
                currentInputElement.value = '';
            }
            else if (index !== this.inputs.length - 1) {
                value = nextInputElement.value;
                nextInputElement.value = '';
                nextInputElement.focus();
            }
            if (value.length > 0) {
                this.triggerInputEvent(index, event);
            }
        }
        else if (event.key === 'Backspace') {
            if (index !== 0 && currentInputElement.value.length === 0) {
                var previousValue = previousInputElement.value;
                previousInputElement.value = '';
                previousInputElement.focus();
                if (previousValue.length > 0) {
                    this.triggerInputEvent(index, event);
                }
            }
        }
        else if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            if (event.key === 'ArrowLeft' && index > 0) {
                previousInputElement.focus();
                previousInputElement.select();
            }
            else if (event.key === 'ArrowRight' && index < this.inputs.length - 1) {
                nextInputElement.focus();
                nextInputElement.select();
            }
            event.preventDefault();
        }
        else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
            event.preventDefault();
        }
        else if (event.key !== 'Tab' && !event.shiftKey && !event.ctrlKey) {
            if (this.type === 'number' && (/\D/.test(event.key.toLocaleLowerCase()))) {
                event.preventDefault();
            }
        }
    };
    OtpInput.prototype.handleSelection = function (index) {
        var currentInputElement = this.inputs[parseInt(index.toString(), 10)];
        if (currentInputElement.value) {
            currentInputElement.select();
        }
    };
    OtpInput.prototype.handleFocus = function (index, event) {
        addClass([this.inputs[parseInt(index.toString(), 10)]], 'e-otp-input-focus');
        if (this.shouldFireFocus) {
            var eventArgs = {
                element: this.element,
                event: event,
                index: index,
                isInteracted: this.isFocusInCalled ? false : true,
                value: this.value
            };
            this.trigger('focus', eventArgs);
        }
        this.shouldFireFocus = true;
    };
    OtpInput.prototype.handleBlur = function (index, event) {
        removeClass([this.inputs[parseInt(index.toString(), 10)]], 'e-otp-input-focus');
        if (this.shouldFireBlur) {
            var eventArgs = {
                element: this.element,
                event: event,
                value: this.value,
                index: index,
                isInteracted: this.isFocusOutCalled ? false : true
            };
            this.trigger('blur', eventArgs);
        }
        this.shouldFireBlur = true;
    };
    OtpInput.prototype.handlePaste = function (index, event) {
        var clipboardData = event.clipboardData;
        if (clipboardData) {
            var pastedText = clipboardData.getData('text');
            var pastedValues = pastedText.split('');
            var pastedValueIndex = 0;
            for (var i = index; i < this.inputs.length; i++) {
                if (pastedValues.length > 0 && pastedValues[parseInt(pastedValueIndex.toString(), 10)]) {
                    this.inputs[parseInt(i.toString(), 10)].value = pastedValues[parseInt(pastedValueIndex.toString(), 10)];
                    pastedValueIndex++;
                    this.updateValueProperty();
                }
            }
            this.focusIn();
            this.triggerValuechanged(event, true);
        }
    };
    OtpInput.prototype.triggerInputEvent = function (index, event) {
        var previousValue = this.value.toString();
        this.updateValueProperty();
        var inputEventArgs = {
            element: this.element,
            event: event,
            previousValue: previousValue,
            value: this.value.toString(),
            index: index
        };
        this.trigger('input', inputEventArgs);
    };
    OtpInput.prototype.triggerValuechanged = function (event, isInteracted) {
        if (this.length === this.value.toString().length) {
            if (this.previousValue !== this.value) {
                var eventArgs = {
                    element: this.element,
                    event: event,
                    isInteracted: isInteracted ? isInteracted : false,
                    previousValue: this.previousValue,
                    value: this.value
                };
                this.trigger('valueChanged', eventArgs);
                this.previousValue = this.value.toString();
            }
        }
    };
    OtpInput.prototype.wireEvents = function (inputEle, index) {
        EventHandler.add(inputEle, 'focus', this.handleFocus.bind(this, index), this);
        EventHandler.add(inputEle, 'blur', this.handleBlur.bind(this, index), this);
        EventHandler.add(inputEle, 'input', this.handleInputChange.bind(this, index), this);
        EventHandler.add(inputEle, 'keydown', this.handleKeyAction.bind(this, index), this);
        EventHandler.add(inputEle, 'click', this.handleSelection.bind(this, index), this);
        EventHandler.add(inputEle, 'paste', this.handlePaste.bind(this, index), this);
        EventHandler.add(inputEle, 'wheel', this.handleWheelEvent, this);
    };
    OtpInput.prototype.unWireEvents = function () {
        for (var i = 0; i < this.inputs.length; i++) {
            var currentInputElement = this.inputs[parseInt(i.toString(), 10)];
            EventHandler.remove(currentInputElement, 'focus', this.handleFocus.bind(this, i));
            EventHandler.remove(currentInputElement, 'blur', this.handleBlur.bind(this, i));
            EventHandler.remove(currentInputElement, 'input', this.handleInputChange.bind(this, i));
            EventHandler.remove(currentInputElement, 'keydown', this.handleKeyAction.bind(this, i));
            EventHandler.remove(currentInputElement, 'click', this.handleSelection.bind(this, i));
            EventHandler.remove(currentInputElement, 'paste', this.handlePaste.bind(this, i));
            EventHandler.remove(currentInputElement, 'wheel', this.handleWheelEvent);
        }
    };
    OtpInput.prototype.updateValueProperty = function () {
        var value = '';
        this.inputs.forEach(function (input) {
            value += input.value;
        });
        var prevOnChange = this.isProtectedOnChange;
        this.isProtectedOnChange = true;
        this.value = typeof this.value === 'number' ? parseInt(value, 10) : value;
        this.isProtectedOnChange = prevOnChange;
        this.hiddenInputEle.value = this.value.toString();
    };
    OtpInput.prototype.updateInputValue = function (previousValue) {
        var stringifiedValue = this.value.toString();
        if (this.textTransform) {
            stringifiedValue = this.getTransformedText(stringifiedValue);
        }
        var previousStringValue = previousValue.toString();
        for (var i = 0; i < this.inputs.length; i++) {
            if (previousStringValue.charAt(i) !== stringifiedValue.charAt(i)) {
                this.inputs[parseInt(i.toString(), 10)].value = stringifiedValue.charAt(i);
                this.hiddenInputEle.value = stringifiedValue;
            }
        }
        this.focusIn();
    };
    OtpInput.prototype.updateCssClass = function (addCss, removeCss) {
        if (removeCss === void 0) { removeCss = ''; }
        var _a, _b;
        var cssClasses;
        if (removeCss) {
            cssClasses = removeCss.trim().split(' ');
            (_a = this.element.classList).remove.apply(_a, cssClasses);
        }
        if (addCss) {
            cssClasses = addCss.trim().split(' ');
            (_b = this.element.classList).add.apply(_b, cssClasses);
        }
    };
    OtpInput.prototype.updateVariantClass = function () {
        var variantClass = this.stylingMode.toLocaleLowerCase() === 'outlined' ? 'outline' : this.stylingMode.toLocaleLowerCase();
        var validClasses = ['underlined', 'filled', 'outline'];
        if (validClasses.indexOf(variantClass) !== -1) {
            removeClass([this.element], validClasses.map(function (cls) { return "e-" + cls; }));
            addClass([this.element], "e-" + variantClass);
        }
    };
    OtpInput.prototype.updateAriaLabel = function (customAriaLabel) {
        this.inputs.forEach(function (input, index) {
            var defaultLabel = "Enter Otp Character " + (index + 1);
            var ariaLabel = customAriaLabel && customAriaLabel.length > 0
                ? customAriaLabel[parseInt(index.toString(), 10)] || defaultLabel
                : defaultLabel;
            input.setAttribute('aria-label', ariaLabel);
        });
    };
    OtpInput.prototype.updateDisabledState = function () {
        var _this = this;
        this.inputs.forEach(function (input) {
            if (_this.disabled) {
                input.setAttribute('disabled', 'disabled');
            }
            else {
                input.removeAttribute('disabled');
            }
        });
    };
    OtpInput.prototype.setElementAttributes = function (htmlAttributes, element) {
        if (!isNullOrUndefined(htmlAttributes)) {
            for (var key in htmlAttributes) {
                if (key === 'class') {
                    var elementClass = htmlAttributes['class'].replace(/\s+/g, ' ').trim();
                    if (elementClass) {
                        addClass([element], elementClass.split(' '));
                    }
                }
                else if (key === 'inputmode') {
                    this.setInputMode(htmlAttributes["" + key]);
                }
                else if (key === 'name' && this.element.id === element.id) {
                    this.hiddenInputEle.setAttribute(key, htmlAttributes["" + key]);
                }
                else {
                    element.setAttribute(key, htmlAttributes["" + key]);
                }
            }
        }
    };
    OtpInput.prototype.setInputMode = function (inputModeValue) {
        for (var i = 0; i < this.inputs.length; i++) {
            this.inputs[parseInt(i.toString(), 10)].setAttribute('inputmode', inputModeValue);
        }
    };
    OtpInput.prototype.handleLengthChange = function (currentValue, previousValue) {
        var isLengthAdded = (currentValue - previousValue) > 0;
        if (isLengthAdded) {
            for (var i = previousValue; i < currentValue; i++) {
                this.createOtpInput(i);
            }
            this.renderSeparator(previousValue, currentValue);
            this.addPlaceHolder();
            this.updateAriaLabel(this.ariaLabels);
        }
        else {
            if (currentValue >= 0 && this.inputs.length > 0) {
                for (var i = currentValue; i < this.inputs.length; i++) {
                    remove(this.inputs[parseInt(i.toString(), 10)]);
                }
                this.inputs.splice(currentValue);
                if (this.separatorElements.length > 0) {
                    // separator should be completely removed when length is 0 or 1;
                    var index = currentValue === 0 ? 0 : currentValue - 1;
                    for (var i = index; i < this.separatorElements.length; i++) {
                        remove(this.separatorElements[parseInt(i.toString(), 10)]);
                    }
                    this.separatorElements.splice(index);
                }
            }
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    OtpInput.prototype.getModuleName = function () {
        return 'otpinput';
    };
    /**
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     */
    OtpInput.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     * Destroy the Otp input.
     *
     * @returns {void}
     */
    OtpInput.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.unWireEvents();
        this.inputs.forEach(function (input) { remove(input); });
        this.separatorElements.forEach(function (separatorElement) { remove(separatorElement); });
        remove(this.hiddenInputEle);
        removeClass([this.element], ['e-underlined', 'e-filled', 'e-outline', 'e-rtl']);
        if (this.cssClass) {
            removeClass([this.element], this.cssClass.trim().split(' '));
        }
        this.element.removeAttribute('role');
        this.inputs = [];
        this.separatorElements = [];
        this.hiddenInputEle = null;
    };
    /**
     * Sets the focus to the Otp input for interaction.
     *
     * @returns {void}
     */
    OtpInput.prototype.focusIn = function () {
        this.isFocusInCalled = true;
        var focusIndex = this.inputs.length - 1;
        for (var index = 0; index < this.inputs.length; index++) {
            if (!(this.inputs[parseInt(index.toString(), 10)].value.length > 0)) {
                focusIndex = index;
                break;
            }
        }
        this.inputs[parseInt(focusIndex.toString(), 10)].focus();
        this.isFocusInCalled = false;
    };
    /**
     * Remove the focus from Otp input, if it is in focus state.
     *
     * @returns {void}
     */
    OtpInput.prototype.focusOut = function () {
        this.isFocusOutCalled = true;
        this.inputs.forEach(function (input) {
            input.blur();
        });
        this.isFocusOutCalled = false;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param  {OtpInputModel} newProp - Specifies new properties
     * @param  {OtpInputModel} oldProp - Specifies old properties
     * @returns {void}
     * @private
     */
    OtpInput.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'textTransform':
                    this.updateInputValue(this.value);
                    break;
                case 'value':
                    this.updateInputValue(oldProp.value);
                    this.triggerValuechanged();
                    break;
                case 'placeholder':
                    this.addPlaceHolder();
                    break;
                case 'disabled':
                    this.updateDisabledState();
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'separator':
                    if (oldProp.separator === '') {
                        this.renderSeparator(1, this.inputs.length);
                    }
                    else {
                        this.updateSeparatorValue();
                    }
                    break;
                case 'htmlAttributes':
                    this.setElementAttributes(newProp.htmlAttributes, this.element);
                    break;
                case 'type':
                    this.updateInputType(newProp.type);
                    break;
                case 'stylingMode':
                    this.updateVariantClass();
                    break;
                case 'ariaLabels':
                    this.updateAriaLabel(newProp.ariaLabels);
                    break;
                case 'length':
                    this.handleLengthChange(newProp.length, oldProp.length);
                    break;
                case 'enableRtl':
                    this.element.classList[this.enableRtl ? 'add' : 'remove'](RTL);
                    break;
                case 'autoFocus':
                    if (this.autoFocus) {
                        this.focusIn();
                    }
                    break;
            }
        }
    };
    __decorate([
        Property(4)
    ], OtpInput.prototype, "length", void 0);
    __decorate([
        Property('')
    ], OtpInput.prototype, "value", void 0);
    __decorate([
        Property(OtpInputType.Number)
    ], OtpInput.prototype, "type", void 0);
    __decorate([
        Property('')
    ], OtpInput.prototype, "separator", void 0);
    __decorate([
        Property('')
    ], OtpInput.prototype, "placeholder", void 0);
    __decorate([
        Property(OtpInputStyle.Outlined)
    ], OtpInput.prototype, "stylingMode", void 0);
    __decorate([
        Property(false)
    ], OtpInput.prototype, "disabled", void 0);
    __decorate([
        Property('')
    ], OtpInput.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], OtpInput.prototype, "autoFocus", void 0);
    __decorate([
        Property(TextTransform.None)
    ], OtpInput.prototype, "textTransform", void 0);
    __decorate([
        Property({})
    ], OtpInput.prototype, "htmlAttributes", void 0);
    __decorate([
        Property([])
    ], OtpInput.prototype, "ariaLabels", void 0);
    __decorate([
        Event()
    ], OtpInput.prototype, "created", void 0);
    __decorate([
        Event()
    ], OtpInput.prototype, "valueChanged", void 0);
    __decorate([
        Event()
    ], OtpInput.prototype, "focus", void 0);
    __decorate([
        Event()
    ], OtpInput.prototype, "blur", void 0);
    __decorate([
        Event()
    ], OtpInput.prototype, "input", void 0);
    OtpInput = __decorate([
        NotifyPropertyChanges
    ], OtpInput);
    return OtpInput;
}(Component));
export { OtpInput };
