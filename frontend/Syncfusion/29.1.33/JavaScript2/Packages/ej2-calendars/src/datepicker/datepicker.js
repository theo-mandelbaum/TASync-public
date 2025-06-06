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
// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path='../calendar/calendar-model.d.ts'/>
import { EventHandler, Property, Internationalization, NotifyPropertyChanges } from '@syncfusion/ej2-base';
import { KeyboardEvents, Animation, Event, extend, L10n, Browser, formatUnit } from '@syncfusion/ej2-base';
import { detach, addClass, removeClass, closest, attributes, Touch } from '@syncfusion/ej2-base';
import { isNullOrUndefined, setValue, getUniqueID } from '@syncfusion/ej2-base';
import { Popup } from '@syncfusion/ej2-popups';
import { Input } from '@syncfusion/ej2-inputs';
import { Calendar } from '../calendar/calendar';
//class constant defination
var DATEWRAPPER = 'e-date-wrapper';
var ROOT = 'e-datepicker';
var LIBRARY = 'e-lib';
var CONTROL = 'e-control';
var POPUPWRAPPER = 'e-popup-wrapper';
var INPUTWRAPPER = 'e-input-group-icon';
var POPUP = 'e-popup';
var INPUTCONTAINER = 'e-input-group';
var INPUTFOCUS = 'e-input-focus';
var INPUTROOT = 'e-input';
var ERROR = 'e-error';
var ACTIVE = 'e-active';
var OVERFLOW = 'e-date-overflow';
var DATEICON = 'e-date-icon';
var CLEARICON = 'e-clear-icon';
var ICONS = 'e-icons';
var OPENDURATION = 300;
var OFFSETVALUE = 4;
var SELECTED = 'e-selected';
var FOCUSEDDATE = 'e-focused-date';
var NONEDIT = 'e-non-edit';
var containerAttr = ['title', 'class', 'style'];
/**
 * Represents the DatePicker component that allows user to select
 * or enter a date value.
 * ```html
 * <input id='datepicker'/>
 * ```
 * ```typescript
 * <script>
 *   let datePickerObject:DatePicker = new DatePicker({ value: new Date() });
 *   datePickerObject.appendTo('#datepicker');
 * </script>
 * ```
 */
var DatePicker = /** @class */ (function (_super) {
    __extends(DatePicker, _super);
    /**
     * Constructor for creating the widget.
     *
     * @param {DatePickerModel} options - Specifies the DatePicker model.
     * @param {string | HTMLInputElement} element - Specifies the element to render as component.
     * @private
     */
    function DatePicker(options, element) {
        var _this = _super.call(this, options, element) || this;
        _this.isDateIconClicked = false;
        _this.isAltKeyPressed = false;
        _this.isInteracted = true;
        _this.invalidValueString = null;
        _this.checkPreviousValue = null;
        _this.maskedDateValue = '';
        _this.preventChange = false;
        _this.isIconClicked = false;
        _this.isDynamicValueChanged = false;
        _this.moduleName = _this.getModuleName();
        _this.isFocused = false;
        _this.isBlur = false;
        _this.isKeyAction = false;
        _this.datepickerOptions = options;
        return _this;
    }
    /**
     * To Initialize the control rendering.
     *
     * @returns {void}
     * @private
     */
    DatePicker.prototype.render = function () {
        this.initialize();
        this.bindEvents();
        if (this.floatLabelType !== 'Never') {
            Input.calculateWidth(this.inputElement, this.inputWrapper.container);
        }
        if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
            this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
        }
        if (!isNullOrUndefined(closest(this.element, 'fieldset')) && closest(this.element, 'fieldset').disabled) {
            this.enabled = false;
        }
        this.renderComplete();
        this.setTimeZone(this.serverTimezoneOffset);
    };
    DatePicker.prototype.setTimeZone = function (offsetValue) {
        if (!isNullOrUndefined(this.serverTimezoneOffset) && this.value) {
            var clientTimeZoneDiff = new Date().getTimezoneOffset() / 60;
            var serverTimezoneDiff = offsetValue;
            var timeZoneDiff = serverTimezoneDiff + clientTimeZoneDiff;
            timeZoneDiff = this.isDayLightSaving() ? timeZoneDiff-- : timeZoneDiff;
            this.value = new Date((this.value).getTime() + (timeZoneDiff * 60 * 60 * 1000));
            this.updateInput();
        }
    };
    DatePicker.prototype.isDayLightSaving = function () {
        var firstOffset = new Date(this.value.getFullYear(), 0, 1).getTimezoneOffset();
        var secondOffset = new Date(this.value.getFullYear(), 6, 1).getTimezoneOffset();
        return (this.value.getTimezoneOffset() < Math.max(firstOffset, secondOffset));
    };
    DatePicker.prototype.setAllowEdit = function () {
        if (this.allowEdit) {
            if (!this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
        }
        else {
            attributes(this.inputElement, { 'readonly': '' });
        }
        this.updateIconState();
    };
    DatePicker.prototype.updateIconState = function () {
        if (!this.allowEdit && this.inputWrapper && !this.readonly) {
            if (this.inputElement.value === '') {
                removeClass([this.inputWrapper.container], [NONEDIT]);
            }
            else {
                addClass([this.inputWrapper.container], [NONEDIT]);
            }
        }
        else if (this.inputWrapper) {
            removeClass([this.inputWrapper.container], [NONEDIT]);
        }
    };
    DatePicker.prototype.initialize = function () {
        this.checkInvalidValue(this.value);
        if (this.enableMask) {
            this.notify('createMask', {
                module: 'MaskedDateTime'
            });
        }
        this.createInput();
        this.updateHtmlAttributeToWrapper();
        this.setAllowEdit();
        if (this.enableMask && !this.value && this.maskedDateValue && (this.floatLabelType === 'Always' || !this.floatLabelType || !this.placeholder)) {
            this.updateInput(true);
            this.updateInputValue(this.maskedDateValue);
        }
        else if (!this.enableMask) {
            this.updateInput(true);
        }
        this.previousElementValue = this.inputElement.value;
        this.previousDate = !isNullOrUndefined(this.value) ? new Date(+this.value) : null;
        this.inputElement.setAttribute('value', this.inputElement.value);
        this.inputValueCopy = this.value;
    };
    DatePicker.prototype.createInput = function () {
        var ariaAttrs = {
            'aria-atomic': 'true', 'aria-expanded': 'false',
            'role': 'combobox', 'autocomplete': 'off', 'autocorrect': 'off',
            'autocapitalize': 'off', 'spellcheck': 'false', 'aria-invalid': 'false'
        };
        if (this.getModuleName() === 'datepicker') {
            var l10nLocale = { placeholder: this.placeholder };
            this.globalize = new Internationalization(this.locale);
            this.l10n = new L10n('datepicker', l10nLocale, this.locale);
            this.setProperties({ placeholder: this.placeholder || this.l10n.getConstant('placeholder') }, true);
        }
        if (this.fullScreenMode && Browser.isDevice) {
            this.cssClass += ' ' + 'e-popup-expand';
        }
        var updatedCssClassValues = this.cssClass;
        if (!isNullOrUndefined(this.cssClass) && this.cssClass !== '') {
            updatedCssClassValues = (this.cssClass.replace(/\s+/g, ' ')).trim();
        }
        var isBindClearAction = this.enableMask ? false : true;
        this.inputWrapper = Input.createInput({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            bindClearAction: isBindClearAction,
            properties: {
                readonly: this.readonly,
                placeholder: this.placeholder,
                cssClass: updatedCssClassValues,
                enabled: this.enabled,
                enableRtl: this.enableRtl,
                showClearButton: this.showClearButton
            },
            buttons: [INPUTWRAPPER + ' ' + DATEICON + ' ' + ICONS]
        }, this.createElement);
        this.setWidth(this.width);
        if (this.inputElement.name !== '') {
            this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute('name'));
        }
        else {
            this.inputElement.setAttribute('name', '' + this.element.id);
        }
        attributes(this.inputElement, ariaAttrs);
        if (!this.inputElement.hasAttribute('aria-label')) {
            this.inputElement.setAttribute('aria-label', this.getModuleName());
        }
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
        Input.addAttributes({ 'aria-label': 'select', 'role': 'button' }, this.inputWrapper.buttons[0]);
        addClass([this.inputWrapper.container], DATEWRAPPER);
    };
    DatePicker.prototype.updateInput = function (isDynamic, isBlur) {
        if (isDynamic === void 0) { isDynamic = false; }
        if (isBlur === void 0) { isBlur = false; }
        var formatOptions;
        if (this.value && !this.isCalendar()) {
            this.disabledDates(isDynamic, isBlur);
        }
        if (isNaN(+new Date(this.checkValue(this.value)))) {
            this.setProperties({ value: null }, true);
        }
        if (this.strictMode) {
            //calls the Calendar processDate protected method to update the date value according to the strictMode true behaviour.
            _super.prototype.validateDate.call(this);
            this.minMaxUpdates();
            _super.prototype.minMaxUpdate.call(this);
        }
        if (!isNullOrUndefined(this.value)) {
            var dateValue = this.value;
            var dateString = void 0;
            var tempFormat = !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
            if (this.getModuleName() === 'datetimepicker') {
                if (this.calendarMode === 'Gregorian') {
                    dateString = this.globalize.formatDate(this.value, {
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd'
                    });
                }
                else {
                    dateString = this.globalize.formatDate(this.value, {
                        format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                    });
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                dateString = this.globalize.formatDate(this.value, formatOptions);
            }
            if ((+dateValue <= +this.max) && (+dateValue >= +this.min)) {
                this.updateInputValue(dateString);
            }
            else {
                var value = (+dateValue >= +this.max || !+this.value) || (!+this.value || +dateValue <= +this.min);
                if (!this.strictMode && value) {
                    this.updateInputValue(dateString);
                }
            }
        }
        if (isNullOrUndefined(this.value) && this.strictMode) {
            if (!this.enableMask) {
                this.updateInputValue('');
            }
            else {
                this.updateInputValue(this.maskedDateValue);
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
        if (!this.strictMode && isNullOrUndefined(this.value) && this.invalidValueString) {
            this.updateInputValue(this.invalidValueString);
        }
        this.changedArgs = { value: this.value };
        this.errorClass();
        this.updateIconState();
    };
    DatePicker.prototype.minMaxUpdates = function () {
        if (!isNullOrUndefined(this.value) && this.value < this.min && this.min <= this.max && this.strictMode) {
            this.setProperties({ value: this.min }, true);
            this.changedArgs = { value: this.value };
        }
        else {
            if (!isNullOrUndefined(this.value) && this.value > this.max && this.min <= this.max && this.strictMode) {
                this.setProperties({ value: this.max }, true);
                this.changedArgs = { value: this.value };
            }
        }
    };
    DatePicker.prototype.checkStringValue = function (val) {
        var returnDate = null;
        var formatOptions = null;
        var formatDateTime = null;
        if (this.getModuleName() === 'datetimepicker') {
            var culture = new Internationalization(this.locale);
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
            }
            else {
                formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'islamic' };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
        }
        returnDate = this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(val), formatOptions));
        if (isNullOrUndefined(returnDate) && (this.getModuleName() === 'datetimepicker')) {
            returnDate = this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(val), formatDateTime));
        }
        return returnDate;
    };
    DatePicker.prototype.checkInvalidValue = function (value) {
        if (!(value instanceof Date) && !isNullOrUndefined(value)) {
            var valueDate = null;
            var valueString = value;
            if (typeof value === 'number') {
                valueString = value.toString();
            }
            var formatOptions = null;
            var formatDateTime = null;
            if (this.getModuleName() === 'datetimepicker') {
                var culture = new Internationalization(this.locale);
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd' };
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime' };
                }
                else {
                    formatOptions = { format: this.dateTimeFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatDateTime = { format: culture.getDatePattern({ skeleton: 'yMd' }), type: 'dateTime', calendar: 'islamic' };
                }
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
            }
            var invalid = false;
            if (typeof valueString !== 'string') {
                valueString = null;
                invalid = true;
            }
            else {
                if (typeof valueString === 'string') {
                    valueString = valueString.trim();
                }
                valueDate = this.checkStringValue(valueString);
                if (!valueDate) {
                    var extISOString = null;
                    var basicISOString = null;
                    // eslint-disable-next-line
                    extISOString = /^\s*((?:[+-]\d{6}|\d{4})-(?:\d\d-\d\d|W\d\d-\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?::\d\d(?::\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                    // eslint-disable-next-line
                    basicISOString = /^\s*((?:[+-]\d{6}|\d{4})(?:\d\d\d\d|W\d\d\d|W\d\d|\d\d\d|\d\d))(?:(T| )(\d\d(?:\d\d(?:\d\d(?:[.,]\d+)?)?)?)([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?/;
                    if ((!extISOString.test(valueString) && !basicISOString.test(valueString))
                        || (/^[a-zA-Z0-9- ]*$/).test(valueString) || isNaN(+new Date(this.checkValue(valueString)))) {
                        invalid = true;
                    }
                    else {
                        valueDate = new Date(valueString);
                    }
                }
            }
            if (invalid) {
                if (!this.strictMode) {
                    this.invalidValueString = valueString;
                }
                this.setProperties({ value: null }, true);
            }
            else {
                this.setProperties({ value: valueDate }, true);
            }
        }
    };
    DatePicker.prototype.bindInputEvent = function () {
        if (!isNullOrUndefined(this.formatString) || this.enableMask) {
            if (this.enableMask || this.formatString.indexOf('y') === -1) {
                EventHandler.add(this.inputElement, 'input', this.inputHandler, this);
            }
            else {
                EventHandler.remove(this.inputElement, 'input', this.inputHandler);
            }
        }
    };
    DatePicker.prototype.bindEvents = function () {
        EventHandler.add(this.inputWrapper.buttons[0], 'mousedown', this.dateIconHandler, this);
        EventHandler.add(this.inputElement, 'mouseup', this.mouseUpHandler, this);
        EventHandler.add(this.inputElement, 'focus', this.inputFocusHandler, this);
        EventHandler.add(this.inputElement, 'blur', this.inputBlurHandler, this);
        EventHandler.add(this.inputElement, 'keyup', this.keyupHandler, this);
        if (this.enableMask) {
            EventHandler.add(this.inputElement, 'keydown', this.keydownHandler, this);
        }
        this.bindInputEvent();
        // To prevent the twice triggering.
        EventHandler.add(this.inputElement, 'change', this.inputChangeHandler, this);
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
        if (this.formElement) {
            EventHandler.add(this.formElement, 'reset', this.resetFormHandler, this);
        }
        this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
        this.keyboardModules = new KeyboardEvents(this.inputElement, {
            eventName: 'keydown',
            keyAction: this.inputKeyActionHandle.bind(this),
            keyConfigs: this.defaultKeyConfigs
        });
    };
    DatePicker.prototype.keydownHandler = function (e) {
        switch (e.code) {
            case 'ArrowLeft':
            case 'ArrowRight':
            case 'ArrowUp':
            case 'ArrowDown':
            case 'Home':
            case 'End':
            case 'Backspace':
            case 'Delete':
                if (this.enableMask && !this.popupObj && !this.readonly) {
                    if (e.code !== 'Delete' && e.code !== 'Backspace') {
                        e.preventDefault();
                    }
                    this.notify('keyDownHandler', {
                        module: 'MaskedDateTime',
                        e: e
                    });
                }
                break;
            default:
                break;
        }
    };
    DatePicker.prototype.unBindEvents = function () {
        if (!isNullOrUndefined(this.inputWrapper)) {
            EventHandler.remove(this.inputWrapper.buttons[0], 'mousedown', this.dateIconHandler);
        }
        EventHandler.remove(this.inputElement, 'mouseup', this.mouseUpHandler);
        EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
        EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
        EventHandler.remove(this.inputElement, 'change', this.inputChangeHandler);
        EventHandler.remove(this.inputElement, 'keyup', this.keyupHandler);
        if (this.enableMask) {
            EventHandler.remove(this.inputElement, 'keydown', this.keydownHandler);
        }
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.remove(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler);
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.resetFormHandler);
        }
    };
    DatePicker.prototype.resetFormHandler = function () {
        if (!this.enabled) {
            return;
        }
        if (!this.inputElement.disabled) {
            var value = this.inputElement.getAttribute('value');
            if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
                value = '';
                this.inputValueCopy = null;
                this.inputElement.setAttribute('value', '');
            }
            this.setProperties({ value: this.inputValueCopy }, true);
            this.restoreValue();
            if (this.inputElement) {
                this.updateInputValue(value);
                this.errorClass();
            }
        }
    };
    DatePicker.prototype.restoreValue = function () {
        this.currentDate = this.value ? this.value : new Date();
        this.previousDate = this.value;
        this.previousElementValue = (isNullOrUndefined(this.inputValueCopy)) ? '' :
            this.globalize.formatDate(this.inputValueCopy, {
                format: this.formatString, type: 'dateTime', skeleton: 'yMd'
            });
    };
    DatePicker.prototype.inputChangeHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.stopPropagation();
    };
    DatePicker.prototype.bindClearEvent = function () {
        if (this.showClearButton && this.inputWrapper.clearButton) {
            EventHandler.add(this.inputWrapper.clearButton, 'mousedown touchstart', this.resetHandler, this);
        }
    };
    DatePicker.prototype.resetHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        e.preventDefault();
        this.clear(e);
    };
    DatePicker.prototype.mouseUpHandler = function (e) {
        if (this.enableMask) {
            e.preventDefault();
            this.notify('setMaskSelection', {
                module: 'MaskedDateTime'
            });
        }
    };
    DatePicker.prototype.clear = function (event) {
        this.setProperties({ value: null }, true);
        if (!this.enableMask) {
            this.updateInputValue('');
        }
        var clearedArgs = {
            event: event
        };
        this.trigger('cleared', clearedArgs);
        this.invalidValueString = '';
        this.updateInput();
        this.popupUpdate();
        this.changeEvent(event);
        if (this.enableMask) {
            this.notify('clearHandler', {
                module: 'MaskedDateTime'
            });
        }
        if (closest(this.element, 'form')) {
            var element = this.element;
            var keyupEvent = document.createEvent('KeyboardEvent');
            keyupEvent.initEvent('keyup', false, true);
            element.dispatchEvent(keyupEvent);
        }
    };
    DatePicker.prototype.preventEventBubbling = function (e) {
        e.preventDefault();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        this.interopAdaptor.invokeMethodAsync('OnDateIconClick');
    };
    DatePicker.prototype.updateInputValue = function (value) {
        Input.setValue(value, this.inputElement, this.floatLabelType, this.showClearButton);
    };
    DatePicker.prototype.dateIconHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.isIconClicked = true;
        if (Browser.isDevice) {
            this.inputElement.setAttribute('readonly', '');
            this.inputElement.blur();
        }
        e.preventDefault();
        if (!this.readonly) {
            if (this.isCalendar()) {
                this.hide(e);
            }
            else {
                this.isDateIconClicked = true;
                this.show(null, e);
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                this.inputElement.focus();
                addClass([this.inputWrapper.container], [INPUTFOCUS]);
                addClass(this.inputWrapper.buttons, ACTIVE);
            }
        }
        this.isIconClicked = false;
    };
    DatePicker.prototype.updateHtmlAttributeToWrapper = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (!isNullOrUndefined(this.htmlAttributes["" + key])) {
                    if (containerAttr.indexOf(key) > -1) {
                        if (key === 'class') {
                            var updatedClassValues = (this.htmlAttributes["" + key].replace(/\s+/g, ' ')).trim();
                            if (updatedClassValues !== '') {
                                addClass([this.inputWrapper.container], updatedClassValues.split(' '));
                            }
                        }
                        else if (key === 'style') {
                            var setStyle = this.inputWrapper.container.getAttribute(key);
                            if (!isNullOrUndefined(setStyle)) {
                                if (setStyle.charAt(setStyle.length - 1) === ';') {
                                    setStyle = setStyle + this.htmlAttributes["" + key];
                                }
                                else {
                                    setStyle = setStyle + ';' + this.htmlAttributes["" + key];
                                }
                            }
                            else {
                                setStyle = this.htmlAttributes["" + key];
                            }
                            this.inputWrapper.container.setAttribute(key, setStyle);
                        }
                        else {
                            this.inputWrapper.container.setAttribute(key, this.htmlAttributes["" + key]);
                        }
                    }
                }
            }
        }
    };
    DatePicker.prototype.updateHtmlAttributeToElement = function () {
        if (!isNullOrUndefined(this.htmlAttributes)) {
            for (var _i = 0, _a = Object.keys(this.htmlAttributes); _i < _a.length; _i++) {
                var key = _a[_i];
                if (containerAttr.indexOf(key) < 0) {
                    this.inputElement.setAttribute(key, this.htmlAttributes["" + key]);
                }
            }
        }
    };
    DatePicker.prototype.updateCssClass = function (newCssClass, oldCssClass) {
        if (!isNullOrUndefined(oldCssClass)) {
            oldCssClass = (oldCssClass.replace(/\s+/g, ' ')).trim();
        }
        if (!isNullOrUndefined(newCssClass)) {
            newCssClass = (newCssClass.replace(/\s+/g, ' ')).trim();
        }
        Input.setCssClass(newCssClass, [this.inputWrapper.container], oldCssClass);
        if (this.popupWrapper) {
            Input.setCssClass(newCssClass, [this.popupWrapper], oldCssClass);
        }
    };
    DatePicker.prototype.calendarKeyActionHandle = function (e) {
        switch (e.action) {
            case 'escape':
                if (this.isCalendar()) {
                    this.hide(e);
                }
                else {
                    this.inputWrapper.container.children[this.index].blur();
                }
                break;
            case 'enter':
                if (!this.isCalendar()) {
                    this.show(null, e);
                }
                else {
                    if (+this.value !== +this.currentDate && !this.isCalendar()) {
                        this.inputWrapper.container.children[this.index].focus();
                    }
                }
                if (this.getModuleName() === 'datetimepicker') {
                    this.inputElement.focus();
                }
                break;
        }
    };
    DatePicker.prototype.inputFocusHandler = function () {
        this.isFocused = true;
        if (!this.enabled) {
            return;
        }
        if (this.enableMask && !this.inputElement.value && this.placeholder) {
            if (this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue(this.maskedDateValue);
                this.inputElement.selectionStart = 0;
                this.inputElement.selectionEnd = this.inputElement.value.length;
            }
        }
        if (this.enableMask && this.showClearButton && this.inputElement && this.inputElement.value === this.maskedDateValue && this.inputWrapper && this.inputWrapper.clearButton && !this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) {
            this.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
        var focusArguments = {
            model: this
        };
        this.isDateIconClicked = false;
        this.trigger('focus', focusArguments);
        this.updateIconState();
        if (this.openOnFocus && !this.isIconClicked) {
            this.show();
        }
    };
    DatePicker.prototype.inputHandler = function (e) {
        this.isPopupClicked = false;
        if (this.enableMask) {
            if (!isNullOrUndefined(e) && !isNullOrUndefined(e.inputType) && e.inputType === 'insertFromPaste') {
                this.notify('maskPasteInputHandler', {
                    module: 'MaskedDateTime'
                });
            }
            else {
                this.notify('inputHandler', {
                    module: 'MaskedDateTime'
                });
            }
        }
    };
    DatePicker.prototype.inputBlurHandler = function (e) {
        if (!this.enabled) {
            return;
        }
        this.strictModeUpdate();
        if (this.inputElement.value === '' && isNullOrUndefined(this.value)) {
            this.invalidValueString = null;
            this.updateInputValue('');
        }
        this.isBlur = true;
        this.updateInput(false, true);
        this.isBlur = false;
        this.popupUpdate();
        this.changeTrigger(e);
        if (this.enableMask && this.maskedDateValue && this.placeholder && this.floatLabelType !== 'Always') {
            if (this.inputElement.value === this.maskedDateValue && !this.value && (this.floatLabelType === 'Auto' || this.floatLabelType === 'Never' || this.placeholder)) {
                this.updateInputValue('');
            }
        }
        this.errorClass();
        if (this.isCalendar() && document.activeElement === this.inputElement) {
            this.hide(e);
        }
        if (this.getModuleName() === 'datepicker') {
            var blurArguments = {
                model: this
            };
            this.trigger('blur', blurArguments);
        }
        if (this.isCalendar()) {
            this.defaultKeyConfigs = extend(this.defaultKeyConfigs, this.keyConfigs);
            this.calendarKeyboardModules = new KeyboardEvents(this.calendarElement.children[1].firstElementChild, {
                eventName: 'keydown',
                keyAction: this.calendarKeyActionHandle.bind(this),
                keyConfigs: this.defaultKeyConfigs
            });
        }
        this.isPopupClicked = false;
    };
    DatePicker.prototype.documentHandler = function (e) {
        if ((!isNullOrUndefined(this.popupObj) && !isNullOrUndefined(this.inputWrapper) && (this.inputWrapper.container.contains(e.target) && e.type !== 'mousedown' ||
            (this.popupObj.element && this.popupObj.element.contains(e.target)))) && e.type !== 'touchstart') {
            e.preventDefault();
        }
        var target = e.target;
        if (!(closest(target, '.e-datepicker.e-popup-wrapper')) && !isNullOrUndefined(this.inputWrapper)
            && !(closest(target, '.' + INPUTCONTAINER) === this.inputWrapper.container)
            && (!target.classList.contains('e-day'))
            && (!target.classList.contains('e-dlg-overlay'))) {
            this.hide(e);
            this.focusOut();
        }
        else if (closest(target, '.e-datepicker.e-popup-wrapper')) {
            // Fix for close the popup when select the previously selected value.
            if (target.classList.contains('e-day')
                && !isNullOrUndefined(e.target.parentElement)
                && e.target.parentElement.classList.contains('e-selected')
                && closest(target, '.e-content')
                && closest(target, '.e-content').classList.contains('e-' + this.depth.toLowerCase())) {
                this.hide(e);
            }
            else if (closest(target, '.e-footer-container')
                && target.classList.contains('e-today')
                && target.classList.contains('e-btn')
                && (+new Date(+this.value) === +_super.prototype.generateTodayVal.call(this, this.value))) {
                this.hide(e);
            }
        }
    };
    DatePicker.prototype.inputKeyActionHandle = function (e) {
        var clickedView = this.currentView();
        switch (e.action) {
            case 'altUpArrow':
                this.isAltKeyPressed = false;
                this.hide(e);
                this.inputElement.focus();
                break;
            case 'altDownArrow':
                this.isAltKeyPressed = true;
                this.strictModeUpdate();
                this.updateInput();
                this.changeTrigger(e);
                if (this.getModuleName() === 'datepicker') {
                    this.show(null, e);
                }
                break;
            case 'escape':
                this.hide(e);
                break;
            case 'enter':
                this.strictModeUpdate();
                this.updateInput();
                this.popupUpdate();
                this.changeTrigger(e);
                this.errorClass();
                if (!this.isCalendar() && document.activeElement === this.inputElement) {
                    this.hide(e);
                }
                if (this.isCalendar()) {
                    e.preventDefault();
                    e.stopPropagation();
                }
                break;
            case 'tab':
            case 'shiftTab':
                {
                    var start = this.inputElement.selectionStart;
                    var end = this.inputElement.selectionEnd;
                    if (this.enableMask && !this.popupObj && !this.readonly) {
                        var length_1 = this.inputElement.value.length;
                        if ((start === 0 && end === length_1) || (end !== length_1 && e.action === 'tab') || (start !== 0 && e.action === 'shiftTab')) {
                            e.preventDefault();
                        }
                        this.notify('keyDownHandler', {
                            module: 'MaskedDateTime',
                            e: e
                        });
                        start = this.inputElement.selectionStart;
                        end = this.inputElement.selectionEnd;
                    }
                    this.strictModeUpdate();
                    this.updateInput();
                    this.popupUpdate();
                    this.changeTrigger(e);
                    this.errorClass();
                    if (this.enableMask) {
                        this.inputElement.selectionStart = start;
                        this.inputElement.selectionEnd = end;
                    }
                    if (e.action === 'tab' && e.target === this.inputElement && this.isCalendar() && document.activeElement === this.inputElement) {
                        e.preventDefault();
                        this.headerTitleElement.focus();
                    }
                    if (e.action === 'shiftTab' && e.target === this.inputElement && this.isCalendar() && document.activeElement === this.inputElement) {
                        this.hide(e);
                    }
                    break;
                }
            default:
                this.defaultAction(e);
                // Fix for close the popup when select the previously selected value.
                if (e.action === 'select' && clickedView === this.depth) {
                    this.hide(e);
                }
        }
    };
    DatePicker.prototype.defaultAction = function (e) {
        this.previousDate = ((!isNullOrUndefined(this.value) && new Date(+this.value)) || null);
        if (this.isCalendar()) {
            _super.prototype.keyActionHandle.call(this, e);
            if (this.isCalendar()) {
                attributes(this.inputElement, {
                    'aria-activedescendant': '' + this.setActiveDescendant()
                });
            }
        }
    };
    DatePicker.prototype.popupUpdate = function () {
        if ((isNullOrUndefined(this.value)) && (!isNullOrUndefined(this.previousDate)) ||
            (((this.getModuleName() !== 'datetimepicker') && (+this.value !== +this.previousDate)) || ((this.getModuleName() === 'datetimepicker') && (+this.value !== +this.previousDateTime)))) {
            if (this.popupObj) {
                if (this.popupObj.element.querySelectorAll('.' + SELECTED).length > 0) {
                    removeClass(this.popupObj.element.querySelectorAll('.' + SELECTED), [SELECTED]);
                }
            }
            if (!isNullOrUndefined(this.value)) {
                if ((+this.value >= +this.min) && (+this.value <= +this.max)) {
                    var targetdate = new Date(this.checkValue(this.value));
                    _super.prototype.navigateTo.call(this, 'Month', targetdate);
                }
            }
        }
    };
    DatePicker.prototype.strictModeUpdate = function () {
        var format;
        var pattern = /^y/;
        var charPattern = /[^a-zA-Z]/;
        var formatOptions;
        if (this.getModuleName() === 'datetimepicker') {
            format = !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
        }
        else if (!pattern.test(this.formatString) || charPattern.test(this.formatString)) {
            format = isNullOrUndefined(this.formatString) ? this.formatString : this.formatString.replace('dd', 'd');
        }
        if (!isNullOrUndefined(format)) {
            var len = format.split('M').length - 1;
            if (len < 3) {
                format = format.replace('MM', 'M');
            }
        }
        else {
            format = this.formatString;
        }
        var dateOptions;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                dateOptions = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                dateOptions = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            dateOptions = formatOptions;
        }
        var date;
        if (typeof this.inputElement.value === 'string') {
            this.inputElement.value = this.inputElement.value.trim();
        }
        if ((this.getModuleName() === 'datetimepicker')) {
            if (this.checkDateValue(this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), dateOptions))) {
                date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), dateOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: format, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), formatOptions);
            }
            if ((isNullOrUndefined(date) || (typeof (date) === 'object' && isNaN(date.getTime())))
                && !isNullOrUndefined(this.inputFormatsString)) {
                for (var _i = 0, _a = this.inputFormatsString; _i < _a.length; _i++) {
                    var format_1 = _a[_i];
                    var inputFormatOptions = void 0;
                    if (this.calendarMode === 'Gregorian') {
                        inputFormatOptions = { format: format_1, type: 'dateTime', skeleton: 'yMd' };
                    }
                    else {
                        inputFormatOptions = { format: format_1, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    }
                    date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), inputFormatOptions);
                    if (!isNullOrUndefined(date) && date instanceof Date && !isNaN(date.getTime())) {
                        break;
                    }
                }
            }
        }
        else {
            date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), dateOptions);
            if ((isNullOrUndefined(date) || (typeof (date) === 'object' && isNaN(date.getTime())))
                && !isNullOrUndefined(this.inputFormatsString)) {
                for (var _b = 0, _c = this.inputFormatsString; _b < _c.length; _b++) {
                    var format_2 = _c[_b];
                    var inputFormatOptions = void 0;
                    if (this.calendarMode === 'Gregorian') {
                        inputFormatOptions = { format: format_2, type: 'dateTime', skeleton: 'yMd' };
                    }
                    else {
                        inputFormatOptions = { format: format_2, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                    }
                    date = this.globalize.parseDate(this.getAmPmValue(this.inputElement.value), inputFormatOptions);
                    if (!isNullOrUndefined(date) && date instanceof Date && !isNaN(date.getTime())) {
                        break;
                    }
                }
            }
            date = (!isNullOrUndefined(date) && isNaN(+date)) ? null : date;
            if (!isNullOrUndefined(this.formatString) && this.inputElement.value !== '' && this.strictMode) {
                if ((this.isPopupClicked || (!this.isPopupClicked && this.inputElement.value === this.previousElementValue))
                    && this.formatString.indexOf('y') === -1) {
                    date.setFullYear(this.value.getFullYear());
                }
            }
        }
        // EJ2-35061 - To prevent change event from triggering twice when using strictmode and format property
        if ((this.getModuleName() === 'datepicker') && (this.value && !isNaN(+this.value)) && date) {
            date.setHours(this.value.getHours(), this.value.getMinutes(), this.value.getSeconds(), this.value.getMilliseconds());
        }
        if (this.strictMode && date) {
            this.updateInputValue(this.globalize.formatDate(date, dateOptions));
            if (this.inputElement.value !== this.previousElementValue) {
                this.setProperties({ value: date }, true);
            }
        }
        else if (!this.strictMode) {
            if (this.inputElement.value !== this.previousElementValue) {
                this.setProperties({ value: date }, true);
            }
        }
        if (this.strictMode && !date && this.inputElement.value === (this.enableMask ? this.maskedDateValue : '')) {
            this.setProperties({ value: null }, true);
        }
        if (isNaN(+this.value)) {
            this.setProperties({ value: null }, true);
        }
        if (isNullOrUndefined(this.value)) {
            this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
        }
    };
    DatePicker.prototype.createCalendar = function () {
        var _this = this;
        this.popupWrapper = this.createElement('div', { className: '' + ROOT + ' ' + POPUPWRAPPER, id: this.inputElement.id + '_options' });
        this.popupWrapper.setAttribute('aria-label', this.element.id);
        this.popupWrapper.setAttribute('role', 'dialog');
        if (!isNullOrUndefined(this.cssClass)) {
            this.popupWrapper.className += ' ' + this.cssClass;
        }
        if (Browser.isDevice) {
            this.modelHeader();
            this.modal = this.createElement('div');
            this.modal.className = '' + ROOT + ' e-date-modal';
            document.body.className += ' ' + OVERFLOW;
            this.modal.style.display = 'block';
            document.body.appendChild(this.modal);
        }
        //this.calendarElement represent the Calendar object from the Calendar class.
        this.calendarElement.querySelector('table tbody').className = '';
        this.popupObj = new Popup(this.popupWrapper, {
            content: this.calendarElement,
            relateTo: Browser.isDevice ? document.body : this.inputWrapper.container,
            position: Browser.isDevice ? { X: 'center', Y: 'center' } : (this.enableRtl ? { X: 'right', Y: 'bottom' } : { X: 'left', Y: 'bottom' }),
            offsetY: OFFSETVALUE,
            targetType: 'container',
            enableRtl: this.enableRtl,
            zIndex: this.zIndex,
            collision: Browser.isDevice ? { X: 'fit', Y: 'fit' } : (this.enableRtl ? { X: 'fit', Y: 'flip' } : { X: 'flip', Y: 'flip' }),
            open: function () {
                if (Browser.isDevice && _this.fullScreenMode) {
                    _this.iconRight = parseInt(window.getComputedStyle(_this.calendarElement.querySelector('.e-header.e-month .e-prev')).marginRight, 10) > 16 ? true : false;
                    _this.touchModule = new Touch(_this.calendarElement.querySelector('.e-content.e-month'), {
                        swipe: _this.CalendarSwipeHandler.bind(_this)
                    });
                    EventHandler.add(_this.calendarElement.querySelector('.e-content.e-month'), 'touchstart', _this.TouchStartHandler, _this);
                }
                if (_this.getModuleName() !== 'datetimepicker') {
                    if (document.activeElement !== _this.inputElement) {
                        _this.defaultKeyConfigs = extend(_this.defaultKeyConfigs, _this.keyConfigs);
                        _this.calendarElement.children[1].firstElementChild.focus();
                        _this.calendarKeyboardModules = new KeyboardEvents(_this.calendarElement.children[1].firstElementChild, {
                            eventName: 'keydown',
                            keyAction: _this.calendarKeyActionHandle.bind(_this),
                            keyConfigs: _this.defaultKeyConfigs
                        });
                        _this.calendarKeyboardModules = new KeyboardEvents(_this.inputWrapper.container.children[_this.index], {
                            eventName: 'keydown',
                            keyAction: _this.calendarKeyActionHandle.bind(_this),
                            keyConfigs: _this.defaultKeyConfigs
                        });
                    }
                }
            }, close: function () {
                if (_this.isDateIconClicked) {
                    _this.inputWrapper.container.children[_this.index].focus();
                }
                if (_this.value) {
                    _this.disabledDates();
                }
                if (_this.popupObj) {
                    _this.popupObj.destroy();
                }
                _this.resetCalendar();
                detach(_this.popupWrapper);
                _this.popupObj = _this.popupWrapper = null;
                _this.preventArgs = null;
                _this.calendarKeyboardModules = null;
                _this.setAriaAttributes();
            }, targetExitViewport: function () {
                if (!Browser.isDevice) {
                    _this.hide();
                }
            }
        });
        this.popupObj.element.className += ' ' + this.cssClass;
        this.setAriaAttributes();
    };
    DatePicker.prototype.getAmPmValue = function (date) {
        try {
            if (typeof date === 'string' && date.trim() !== '') {
                // Replace am/pm variants with uppercase AM/PM
                return date.replace(/(am|pm|Am|aM|pM|Pm)/g, function (match) { return match.toLocaleUpperCase(); });
            }
            // If date is null, undefined, or an empty string, return a default value or empty string
            return '';
        }
        catch (error) {
            console.error('Error occurred while processing date:', error);
            return ''; // Return a default value in case of an error
        }
    };
    DatePicker.prototype.CalendarSwipeHandler = function (e) {
        var direction = 0;
        if (this.iconRight) {
            switch (e.swipeDirection) {
                case 'Left':
                    direction = 1;
                    break;
                case 'Right':
                    direction = -1;
                    break;
                default:
                    break;
            }
        }
        else {
            switch (e.swipeDirection) {
                case 'Up':
                    direction = 1;
                    break;
                case 'Down':
                    direction = -1;
                    break;
                default:
                    break;
            }
        }
        if (this.touchStart) {
            if (direction === 1) {
                this.navigateNext(e);
            }
            else if (direction === -1) {
                this.navigatePrevious(e);
            }
            this.touchStart = false;
        }
    };
    DatePicker.prototype.TouchStartHandler = function (e) {
        this.touchStart = true;
    };
    DatePicker.prototype.setAriaDisabled = function () {
        if (!this.enabled) {
            this.inputElement.setAttribute('aria-disabled', 'true');
            this.inputElement.tabIndex = -1;
        }
        else {
            this.inputElement.setAttribute('aria-disabled', 'false');
            this.inputElement.setAttribute('tabindex', this.tabIndex);
        }
    };
    DatePicker.prototype.modelHeader = function () {
        var dateOptions;
        var modelHeader = this.createElement('div', { className: 'e-model-header' });
        var yearHeading = this.createElement('h1', { className: 'e-model-year' });
        var h2 = this.createElement('div');
        var daySpan = this.createElement('span', { className: 'e-model-day' });
        var monthSpan = this.createElement('span', { className: 'e-model-month' });
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'y', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'y', skeleton: 'dateTime', calendar: 'islamic' };
        }
        yearHeading.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'E', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'E', skeleton: 'dateTime', calendar: 'islamic' };
        }
        daySpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions) + ', ';
        if (this.calendarMode === 'Gregorian') {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime' };
        }
        else {
            dateOptions = { format: 'MMM d', skeleton: 'dateTime', calendar: 'islamic' };
        }
        monthSpan.textContent = '' + this.globalize.formatDate(this.value || new Date(), dateOptions);
        if (this.fullScreenMode) {
            var modelCloseIcon = this.createElement('span', { className: 'e-popup-close' });
            EventHandler.add(modelCloseIcon, 'mousedown touchstart', this.modelCloseHandler, this);
            var modelTodayButton = this.calendarElement.querySelector('button.e-today');
            h2.classList.add('e-day-wrapper');
            modelTodayButton.classList.add('e-outline');
            modelHeader.appendChild(modelCloseIcon);
            modelHeader.appendChild(modelTodayButton);
        }
        if (!this.fullScreenMode) {
            modelHeader.appendChild(yearHeading);
        }
        h2.appendChild(daySpan);
        h2.appendChild(monthSpan);
        modelHeader.appendChild(h2);
        this.calendarElement.insertBefore(modelHeader, this.calendarElement.firstElementChild);
    };
    DatePicker.prototype.modelCloseHandler = function (e) {
        this.hide();
    };
    DatePicker.prototype.changeTrigger = function (event) {
        if (this.inputElement.value !== this.previousElementValue) {
            if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
                if (this.isDynamicValueChanged && this.isCalendar()) {
                    this.popupUpdate();
                }
                this.changedArgs.value = this.value;
                this.changedArgs.event = event || null;
                this.changedArgs.element = this.element;
                this.changedArgs.isInteracted = !isNullOrUndefined(event);
                if (this.isAngular && this.preventChange) {
                    this.preventChange = false;
                }
                else {
                    this.trigger('change', this.changedArgs);
                }
                this.previousElementValue = this.inputElement.value;
                this.previousDate = !isNaN(+new Date(this.checkValue(this.value))) ? new Date(this.checkValue(this.value)) : null;
                this.isInteracted = true;
            }
        }
        this.isKeyAction = false;
    };
    DatePicker.prototype.navigatedEvent = function (eve) {
        extend(this.navigatedArgs, { name: 'navigated', event: eve });
        this.trigger('navigated', this.navigatedArgs);
    };
    DatePicker.prototype.keyupHandler = function (e) {
        this.isKeyAction = (this.inputElement.value !== this.previousElementValue) ? true : false;
        if (this.enableMask && this.showClearButton && this.inputElement && this.inputElement.value === this.maskedDateValue && this.inputWrapper && this.inputWrapper.clearButton && !this.inputWrapper.clearButton.classList.contains('e-clear-icon-hide')) {
            this.inputWrapper.clearButton.classList.add('e-clear-icon-hide');
        }
    };
    DatePicker.prototype.changeEvent = function (event) {
        if (!this.isIconClicked && !(this.isBlur || this.isKeyAction)) {
            this.selectCalendar(event);
        }
        if (((this.previousDate && this.previousDate.valueOf()) !== (this.value && this.value.valueOf()))) {
            this.changedArgs.event = event ? event : null;
            this.changedArgs.element = this.element;
            this.changedArgs.isInteracted = this.isInteracted;
            if (!this.isDynamicValueChanged) {
                this.trigger('change', this.changedArgs);
            }
            this.previousDate = this.value && new Date(+this.value);
            if (!this.isDynamicValueChanged) {
                this.hide(event);
            }
            this.previousElementValue = this.inputElement.value;
            this.errorClass();
        }
        else if (event) {
            this.hide(event);
        }
        this.isKeyAction = false;
    };
    DatePicker.prototype.requiredModules = function () {
        var modules = [];
        if (this.calendarMode === 'Islamic') {
            modules.push({ args: [this], member: 'islamic', name: 'Islamic' });
        }
        if (this.enableMask) {
            modules.push({ args: [this], member: 'MaskedDateTime' });
        }
        return modules;
    };
    DatePicker.prototype.selectCalendar = function (e) {
        var date;
        var tempFormat;
        var formatOptions;
        if (this.getModuleName() === 'datetimepicker') {
            tempFormat = !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat;
        }
        else {
            tempFormat = this.formatString;
        }
        if (this.value) {
            if (this.getModuleName() === 'datetimepicker') {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: tempFormat, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            else {
                if (this.calendarMode === 'Gregorian') {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
                }
                else {
                    formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
                }
                date = this.globalize.formatDate(this.changedArgs.value, formatOptions);
            }
            if (this.enableMask) {
                this.notify('createMask', {
                    module: 'MaskedDateTime'
                });
            }
        }
        if (!isNullOrUndefined(date)) {
            this.updateInputValue(date);
            if (this.enableMask) {
                this.notify('setMaskSelection', {
                    module: 'MaskedDateTime'
                });
            }
        }
    };
    DatePicker.prototype.isCalendar = function () {
        if (this.popupWrapper && this.popupWrapper.classList.contains('' + POPUPWRAPPER)) {
            return true;
        }
        return false;
    };
    DatePicker.prototype.setWidth = function (width) {
        if (typeof width === 'number') {
            this.inputWrapper.container.style.width = formatUnit(this.width);
        }
        else if (typeof width === 'string') {
            this.inputWrapper.container.style.width = (width.match(/px|%|em/)) ? (this.width) : (formatUnit(this.width));
        }
        else {
            this.inputWrapper.container.style.width = '100%';
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-param */
    /**
     * Shows the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    DatePicker.prototype.show = function (type, e) {
        var _this = this;
        if ((this.enabled && this.readonly) || !this.enabled || this.popupObj) {
            return;
        }
        else {
            var prevent_1 = true;
            var outOfRange = void 0;
            if (!isNullOrUndefined(this.value) && !(+this.value >= +new Date(this.checkValue(this.min))
                && +this.value <= +new Date(this.checkValue(this.max)))) {
                outOfRange = new Date(this.checkValue(this.value));
                this.setProperties({ 'value': null }, true);
            }
            else {
                outOfRange = this.value || null;
            }
            if (!this.isCalendar()) {
                _super.prototype.render.call(this);
                this.setProperties({ 'value': outOfRange || null }, true);
                this.previousDate = outOfRange;
                this.createCalendar();
            }
            if (Browser.isDevice) {
                this.mobilePopupWrapper = this.createElement('div', { className: 'e-datepick-mob-popup-wrap' });
                document.body.appendChild(this.mobilePopupWrapper);
            }
            this.preventArgs = {
                preventDefault: function () {
                    prevent_1 = false;
                },
                popup: this.popupObj,
                event: e || null,
                cancel: false,
                appendTo: Browser.isDevice ? this.mobilePopupWrapper : document.body
            };
            var eventArgs = this.preventArgs;
            this.trigger('open', eventArgs, function (eventArgs) {
                _this.preventArgs = eventArgs;
                if (prevent_1 && !_this.preventArgs.cancel) {
                    addClass(_this.inputWrapper.buttons, ACTIVE);
                    _this.preventArgs.appendTo.appendChild(_this.popupWrapper);
                    _this.popupObj.refreshPosition(_this.inputElement);
                    var openAnimation = {
                        name: 'FadeIn',
                        duration: Browser.isDevice ? 0 : OPENDURATION
                    };
                    if (_this.zIndex === 1000) {
                        _this.popupObj.show(new Animation(openAnimation), _this.element);
                    }
                    else {
                        _this.popupObj.show(new Animation(openAnimation), null);
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    _super.prototype.setOverlayIndex.call(_this, _this.mobilePopupWrapper, _this.popupObj.element, _this.modal, Browser.isDevice);
                    _this.setAriaAttributes();
                    if (Browser.isDevice) {
                        var dlgOverlay = _this.createElement('div', { className: 'e-dlg-overlay' });
                        dlgOverlay.style.zIndex = (_this.zIndex - 1).toString();
                        _this.mobilePopupWrapper.appendChild(dlgOverlay);
                    }
                }
                else {
                    _this.popupObj.destroy();
                    _this.popupWrapper = _this.popupObj = null;
                }
                if (!isNullOrUndefined(_this.inputElement) && _this.inputElement.value === '') {
                    if (!isNullOrUndefined(_this.tableBodyElement) && _this.tableBodyElement.querySelectorAll('td.e-selected').length > 0) {
                        addClass([_this.tableBodyElement.querySelector('td.e-selected')], FOCUSEDDATE);
                        removeClass(_this.tableBodyElement.querySelectorAll('td.e-selected'), SELECTED);
                    }
                }
                EventHandler.add(document, 'mousedown touchstart', _this.documentHandler, _this);
            });
        }
    };
    /**
     * Hide the Calendar.
     *
     * @returns {void}
     * @deprecated
     */
    DatePicker.prototype.hide = function (event) {
        var _this = this;
        if (!isNullOrUndefined(this.popupWrapper)) {
            var prevent_2 = true;
            this.preventArgs = {
                preventDefault: function () {
                    prevent_2 = false;
                },
                popup: this.popupObj,
                event: event || null,
                cancel: false
            };
            removeClass(this.inputWrapper.buttons, ACTIVE);
            removeClass([document.body], OVERFLOW);
            var eventArgs = this.preventArgs;
            if (this.isCalendar()) {
                this.trigger('close', eventArgs, function (eventArgs) {
                    _this.closeEventCallback(prevent_2, eventArgs);
                });
            }
            else {
                this.closeEventCallback(prevent_2, eventArgs);
            }
        }
        else {
            if (Browser.isDevice && this.allowEdit && !this.readonly) {
                this.inputElement.removeAttribute('readonly');
            }
            this.setAllowEdit();
        }
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-param */
    DatePicker.prototype.closeEventCallback = function (prevent, eventArgs) {
        this.preventArgs = eventArgs;
        if (this.isCalendar() && (prevent && !this.preventArgs.cancel)) {
            this.popupObj.hide();
            this.isAltKeyPressed = false;
            this.keyboardModule.destroy();
            removeClass(this.inputWrapper.buttons, ACTIVE);
        }
        this.setAriaAttributes();
        if (Browser.isDevice && this.modal) {
            this.modal.style.display = 'none';
            this.modal.outerHTML = '';
            this.modal = null;
        }
        if (Browser.isDevice) {
            if (!isNullOrUndefined(this.mobilePopupWrapper) &&
                (prevent && (isNullOrUndefined(this.preventArgs) || !this.preventArgs.cancel))) {
                this.mobilePopupWrapper.remove();
                this.mobilePopupWrapper = null;
            }
        }
        EventHandler.remove(document, 'mousedown touchstart', this.documentHandler);
        if (Browser.isDevice && this.allowEdit && !this.readonly) {
            this.inputElement.removeAttribute('readonly');
        }
        this.setAllowEdit();
    };
    /* eslint-disable jsdoc/require-param */
    /**
     * Sets the focus to widget for interaction.
     *
     * @returns {void}
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    DatePicker.prototype.focusIn = function (triggerEvent) {
        if (document.activeElement !== this.inputElement && this.enabled) {
            this.inputElement.focus();
            addClass([this.inputWrapper.container], [INPUTFOCUS]);
        }
    };
    /* eslint-enable jsdoc/require-param */
    /**
     * Remove the focus from widget, if the widget is in focus state.
     *
     * @returns {void}
     */
    DatePicker.prototype.focusOut = function () {
        if (document.activeElement === this.inputElement) {
            removeClass([this.inputWrapper.container], [INPUTFOCUS]);
            this.inputElement.blur();
        }
    };
    /* eslint-disable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Gets the current view of the DatePicker.
     *
     * @returns {string}
     * @deprecated
     */
    DatePicker.prototype.currentView = function () {
        var currentView;
        if (this.calendarElement) {
            // calls the Calendar currentView public method
            currentView = _super.prototype.currentView.call(this);
        }
        return currentView;
    };
    /* eslint-enable valid-jsdoc, jsdoc/require-returns-description */
    /**
     * Navigates to specified month or year or decade view of the DatePicker.
     *
     * @param  {string} view - Specifies the view of the calendar.
     * @param  {Date} date - Specifies the focused date in a view.
     * @returns {void}
     * @deprecated
     */
    DatePicker.prototype.navigateTo = function (view, date) {
        if (this.calendarElement) {
            // calls the Calendar navigateTo public method
            _super.prototype.navigateTo.call(this, view, date);
        }
    };
    /**
     * To destroy the widget.
     *
     * @returns {void}
     */
    DatePicker.prototype.destroy = function () {
        this.unBindEvents();
        if (this.showClearButton) {
            this.clearButton = document.getElementsByClassName('e-clear-icon')[0];
        }
        _super.prototype.destroy.call(this);
        Input.destroy({
            element: this.inputElement,
            floatLabelType: this.floatLabelType,
            properties: this.properties
        }, this.clearButton);
        if (!isNullOrUndefined(this.keyboardModules)) {
            this.keyboardModules.destroy();
        }
        if (this.popupObj && this.popupObj.element.classList.contains(POPUP)) {
            _super.prototype.destroy.call(this);
        }
        var ariaAttrs = {
            'aria-atomic': 'true', 'aria-disabled': 'true',
            'aria-expanded': 'false', 'role': 'combobox', 'autocomplete': 'off',
            'autocorrect': 'off', 'autocapitalize': 'off', 'spellcheck': 'false'
        };
        if (this.inputElement.hasAttribute('aria-label')) {
            this.inputElement.removeAttribute('aria-label');
        }
        if (this.inputElement) {
            Input.removeAttributes(ariaAttrs, this.inputElement);
            if (!isNullOrUndefined(this.inputElementCopy.getAttribute('tabindex'))) {
                this.inputElement.setAttribute('tabindex', this.tabIndex);
            }
            else {
                this.inputElement.removeAttribute('tabindex');
            }
            EventHandler.remove(this.inputElement, 'blur', this.inputBlurHandler);
            EventHandler.remove(this.inputElement, 'focus', this.inputFocusHandler);
            this.ensureInputAttribute();
        }
        if (this.isCalendar()) {
            if (this.popupWrapper) {
                detach(this.popupWrapper);
            }
            this.popupObj = this.popupWrapper = null;
            this.keyboardModule.destroy();
        }
        if (this.ngTag === null) {
            if (this.inputElement) {
                if (!isNullOrUndefined(this.inputWrapper)) {
                    this.inputWrapper.container.insertAdjacentElement('afterend', this.inputElement);
                }
                removeClass([this.inputElement], [INPUTROOT]);
            }
            removeClass([this.element], [ROOT]);
            if (!isNullOrUndefined(this.inputWrapper)) {
                detach(this.inputWrapper.container);
            }
        }
        if (this.formElement) {
            EventHandler.remove(this.formElement, 'reset', this.resetFormHandler);
        }
        this.inputWrapper = null;
        this.keyboardModules = null;
    };
    DatePicker.prototype.ensureInputAttribute = function () {
        var prop = [];
        for (var i = 0; i < this.inputElement.attributes.length; i++) {
            prop[i] = this.inputElement.attributes[i].name;
        }
        for (var i = 0; i < prop.length; i++) {
            if (isNullOrUndefined(this.inputElementCopy.getAttribute(prop[i]))) {
                if (prop[i].toLowerCase() === 'value') {
                    this.inputElement.value = '';
                }
                this.inputElement.removeAttribute(prop[i]);
            }
            else {
                if (prop[i].toLowerCase() === 'value') {
                    this.inputElement.value = this.inputElementCopy.getAttribute(prop[i]);
                }
                this.inputElement.setAttribute(prop[i], this.inputElementCopy.getAttribute(prop[i]));
            }
        }
    };
    /**
     * Initialize the event handler
     *
     * @returns {void}
     * @private
     */
    DatePicker.prototype.preRender = function () {
        this.inputElementCopy = this.element.cloneNode(true);
        removeClass([this.inputElementCopy], [ROOT, CONTROL, LIBRARY]);
        this.inputElement = this.element;
        this.formElement = closest(this.inputElement, 'form');
        this.index = this.showClearButton ? 2 : 1;
        this.ngTag = null;
        if (this.element.tagName === 'EJS-DATEPICKER' || this.element.tagName === 'EJS-DATETIMEPICKER') {
            this.ngTag = this.element.tagName;
            this.inputElement = this.createElement('input');
            this.element.appendChild(this.inputElement);
        }
        if (this.element.getAttribute('id')) {
            if (this.ngTag !== null) {
                this.inputElement.id = this.element.getAttribute('id') + '_input';
            }
        }
        else {
            if (this.getModuleName() === 'datetimepicker') {
                this.element.id = getUniqueID('ej2-datetimepicker');
                if (this.ngTag !== null) {
                    attributes(this.inputElement, { 'id': this.element.id + '_input' });
                }
            }
            else {
                this.element.id = getUniqueID('ej2-datepicker');
                if (this.ngTag !== null) {
                    attributes(this.inputElement, { 'id': this.element.id + '_input' });
                }
            }
        }
        if (this.ngTag !== null) {
            this.validationAttribute(this.element, this.inputElement);
        }
        this.updateHtmlAttributeToElement();
        this.defaultKeyConfigs = this.getDefaultKeyConfig();
        this.checkHtmlAttributes(false);
        if (this.inputFormats) {
            this.checkInputFormats();
        }
        this.tabIndex = this.element.hasAttribute('tabindex') ? this.element.getAttribute('tabindex') : '0';
        this.element.removeAttribute('tabindex');
        _super.prototype.preRender.call(this);
    };
    DatePicker.prototype.getDefaultKeyConfig = function () {
        this.defaultKeyConfigs = {
            altUpArrow: 'alt+uparrow',
            altDownArrow: 'alt+downarrow',
            escape: 'escape',
            enter: 'enter',
            controlUp: 'ctrl+38',
            controlDown: 'ctrl+40',
            moveDown: 'downarrow',
            moveUp: 'uparrow',
            moveLeft: 'leftarrow',
            moveRight: 'rightarrow',
            select: 'enter',
            home: 'home',
            end: 'end',
            pageUp: 'pageup',
            pageDown: 'pagedown',
            shiftPageUp: 'shift+pageup',
            shiftPageDown: 'shift+pagedown',
            controlHome: 'ctrl+home',
            controlEnd: 'ctrl+end',
            shiftTab: 'shift+tab',
            tab: 'tab'
        };
        return this.defaultKeyConfigs;
    };
    DatePicker.prototype.validationAttribute = function (target, inputElement) {
        var nameAttribute = target.getAttribute('name') ? target.getAttribute('name') : target.getAttribute('id');
        inputElement.setAttribute('name', nameAttribute);
        target.removeAttribute('name');
        var attribute = ['required', 'aria-required', 'form'];
        for (var i = 0; i < attribute.length; i++) {
            if (isNullOrUndefined(target.getAttribute(attribute[i]))) {
                continue;
            }
            var attr = target.getAttribute(attribute[i]);
            inputElement.setAttribute(attribute[i], attr);
            target.removeAttribute(attribute[i]);
        }
    };
    DatePicker.prototype.checkFormat = function () {
        var culture = new Internationalization(this.locale);
        if (this.format) {
            if (typeof this.format === 'string') {
                this.formatString = this.format;
            }
            else if (this.format.skeleton !== '' && !isNullOrUndefined(this.format.skeleton)) {
                var skeletonString = this.format.skeleton;
                if (this.getModuleName() === 'datetimepicker') {
                    this.formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'dateTime' });
                }
                else {
                    this.formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'date' });
                }
            }
            else {
                if (this.getModuleName() === 'datetimepicker') {
                    this.formatString = this.dateTimeFormat;
                }
                else {
                    this.formatString = null;
                }
            }
        }
        else {
            this.formatString = null;
        }
    };
    DatePicker.prototype.checkInputFormats = function () {
        var culture = new Internationalization(this.locale);
        this.inputFormatsString = [];
        if (this.inputFormats) {
            for (var _i = 0, _a = this.inputFormats; _i < _a.length; _i++) {
                var format = _a[_i];
                var formatString = '';
                if (typeof format === 'string') {
                    formatString = format;
                }
                else if (format.skeleton !== '' && !isNullOrUndefined(format.skeleton)) {
                    var skeletonString = format.skeleton;
                    if (this.getModuleName() === 'datetimepicker') {
                        formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'dateTime' });
                    }
                    else {
                        formatString = culture.getDatePattern({ skeleton: skeletonString, type: 'date' });
                    }
                }
                if (formatString) {
                    this.inputFormatsString.push(formatString);
                }
            }
            if (this.inputFormatsString.length === 0) {
                this.inputFormatsString = null;
            }
        }
        else {
            this.inputFormatsString = null;
        }
    };
    DatePicker.prototype.checkHtmlAttributes = function (dynamic) {
        this.globalize = new Internationalization(this.locale);
        this.checkFormat();
        this.checkView();
        var attributes = dynamic ? isNullOrUndefined(this.htmlAttributes) ? [] : Object.keys(this.htmlAttributes) :
            ['value', 'min', 'max', 'disabled', 'readonly', 'style', 'name', 'placeholder', 'type'];
        var options;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                options = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                };
            }
            else {
                options = {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                };
            }
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                options = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
        }
        for (var _i = 0, attributes_1 = attributes; _i < attributes_1.length; _i++) {
            var prop = attributes_1[_i];
            if (!isNullOrUndefined(this.inputElement.getAttribute(prop))) {
                switch (prop) {
                    case 'disabled':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['enabled'] === undefined)) || dynamic)) {
                            var enabled = this.inputElement.getAttribute(prop) === 'disabled' ||
                                this.inputElement.getAttribute(prop) === '' ||
                                this.inputElement.getAttribute(prop) === 'true' ? false : true;
                            this.setProperties({ enabled: enabled }, !dynamic);
                        }
                        break;
                    case 'readonly':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['readonly'] === undefined)) || dynamic)) {
                            var readonly = this.inputElement.getAttribute(prop) === 'readonly' ||
                                this.inputElement.getAttribute(prop) === '' || this.inputElement.getAttribute(prop) === 'true' ? true : false;
                            this.setProperties({ readonly: readonly }, !dynamic);
                        }
                        break;
                    case 'placeholder':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['placeholder'] === undefined)) || dynamic)) {
                            this.setProperties({ placeholder: this.inputElement.getAttribute(prop) }, !dynamic);
                        }
                        break;
                    case 'style':
                        this.inputElement.setAttribute('style', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'name':
                        this.inputElement.setAttribute('name', '' + this.inputElement.getAttribute(prop));
                        break;
                    case 'value':
                        if (((isNullOrUndefined(this.datepickerOptions) || (this.datepickerOptions['value'] === undefined)) || dynamic)) {
                            var value = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.getAmPmValue(value), options), {}), !dynamic);
                        }
                        break;
                    case 'min':
                        if ((+this.min === +new Date(1900, 0, 1)) || dynamic) {
                            var min = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.getAmPmValue(min), options), {}), !dynamic);
                        }
                        break;
                    case 'max':
                        if ((+this.max === +new Date(2099, 11, 31)) || dynamic) {
                            var max = this.inputElement.getAttribute(prop);
                            this.setProperties(setValue(prop, this.globalize.parseDate(this.getAmPmValue(max), options), {}), !dynamic);
                        }
                        break;
                    case 'type':
                        if (this.inputElement.getAttribute(prop) !== 'text') {
                            this.inputElement.setAttribute('type', 'text');
                        }
                        break;
                }
            }
        }
    };
    /**
     * To get component name.
     *
     * @returns {string} Returns the component name.
     * @private
     */
    DatePicker.prototype.getModuleName = function () {
        return 'datepicker';
    };
    DatePicker.prototype.disabledDates = function (isDynamic, isBlur) {
        if (isDynamic === void 0) { isDynamic = false; }
        if (isBlur === void 0) { isBlur = false; }
        var formatOptions;
        var globalize;
        var valueCopy = this.checkDateValue(this.value) ? new Date(+this.value) : new Date(this.checkValue(this.value));
        var previousValCopy = this.previousDate;
        //calls the Calendar render method to check the disabled dates through renderDayCell event and update the input value accordingly.
        this.minMaxUpdates();
        if (!isDynamic || (isDynamic && !isNullOrUndefined(this.renderDayCell))) {
            _super.prototype.render.call(this);
        }
        this.previousDate = previousValCopy;
        var date = valueCopy && +(valueCopy);
        var dateIdString = '*[id^="/id"]'.replace('/id', '' + date);
        if (!this.strictMode) {
            if (typeof this.value === 'string' || ((typeof this.value === 'object') && (+this.value) !== (+valueCopy))) {
                this.setProperties({ value: valueCopy }, true);
            }
        }
        if (!isNullOrUndefined(this.calendarElement) && !isNullOrUndefined(this.calendarElement.querySelectorAll(dateIdString)[0])) {
            if (this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled')) {
                if (!this.strictMode) {
                    this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                }
            }
        }
        var inputVal;
        if (this.getModuleName() === 'datetimepicker') {
            if (this.calendarMode === 'Gregorian') {
                globalize = this.globalize.formatDate(valueCopy, {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd'
                });
            }
            else {
                globalize = this.globalize.formatDate(valueCopy, {
                    format: !isNullOrUndefined(this.formatString) ? this.formatString : this.dateTimeFormat,
                    type: 'dateTime', skeleton: 'yMd', calendar: 'islamic'
                });
            }
            inputVal = globalize;
        }
        else {
            if (this.calendarMode === 'Gregorian') {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd' };
            }
            else {
                formatOptions = { format: this.formatString, type: 'dateTime', skeleton: 'yMd', calendar: 'islamic' };
            }
            inputVal = this.globalize.formatDate(valueCopy, formatOptions);
        }
        if (!this.popupObj) {
            this.updateInputValue(inputVal);
            if (this.enableMask) {
                this.updateInputValue(this.maskedDateValue);
                this.notify('createMask', {
                    module: 'MaskedDateTime', isBlur: isBlur
                });
            }
        }
    };
    DatePicker.prototype.setAriaAttributes = function () {
        if (this.isCalendar()) {
            Input.addAttributes({ 'aria-expanded': 'true' }, this.inputElement);
            attributes(this.inputElement, { 'aria-owns': this.inputElement.id + '_options' });
            attributes(this.inputElement, { 'aria-controls': this.inputElement.id });
            if (this.value) {
                attributes(this.inputElement, { 'aria-activedescendant': '' + this.setActiveDescendant() });
            }
        }
        else {
            Input.addAttributes({ 'aria-expanded': 'false' }, this.inputElement);
            this.inputElement.removeAttribute('aria-owns');
            this.inputElement.removeAttribute('aria-controls');
            this.inputElement.removeAttribute('aria-activedescendant');
        }
    };
    DatePicker.prototype.errorClass = function () {
        var dateIdString = '*[id^="/id"]'.replace('/id', '' + (+this.value));
        var isDisabledDate = this.calendarElement &&
            this.calendarElement.querySelectorAll(dateIdString)[0] &&
            this.calendarElement.querySelectorAll(dateIdString)[0].classList.contains('e-disabled');
        if ((!isNullOrUndefined(this.value) && !isNullOrUndefined(this.min) &&
            !isNullOrUndefined(this.max) && !(new Date(this.value).setMilliseconds(0) >=
            new Date(this.min).setMilliseconds(0)
            && new Date(this.value).setMilliseconds(0) <= new Date(this.max).setMilliseconds(0)))
            || (!this.strictMode && this.inputElement.value !== '' && this.inputElement.value !== this.maskedDateValue &&
                isNullOrUndefined(this.value) || isDisabledDate) || !this.isValidTime(this.value)) {
            addClass([this.inputWrapper.container], ERROR);
            attributes(this.inputElement, { 'aria-invalid': 'true' });
        }
        else if (!isNullOrUndefined(this.inputWrapper)) {
            removeClass([this.inputWrapper.container], ERROR);
            attributes(this.inputElement, { 'aria-invalid': 'false' });
        }
    };
    DatePicker.prototype.isValidTime = function (value) {
        return true;
    };
    /**
     * Called internally if any of the property value changed.
     *
     * @param {DatePickerModel} newProp - Returns the dynamic property value of the component.
     * @param {DatePickerModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    DatePicker.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            var openPopup = ['blur', 'change', 'cleared', 'close', 'created', 'destroyed', 'focus', 'navigated', 'open', 'renderDayCell'];
            if (openPopup.indexOf(prop) > 0 && this.isReact) {
                this.isDynamicValueChanged = true;
            }
            switch (prop) {
                case 'value':
                    this.isDynamicValueChanged = true;
                    this.isInteracted = false;
                    this.invalidValueString = null;
                    this.checkInvalidValue(newProp.value);
                    newProp.value = this.value;
                    this.previousElementValue = this.inputElement.value;
                    if (isNullOrUndefined(this.value)) {
                        if (this.enableMask) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                        else {
                            this.updateInputValue('');
                        }
                        this.currentDate = new Date(new Date().setHours(0, 0, 0, 0));
                    }
                    this.updateInput(true);
                    if (+this.previousDate !== +this.value) {
                        this.changeTrigger(null);
                    }
                    this.isInteracted = true;
                    this.preventChange = this.isAngular && this.preventChange ? !this.preventChange : this.preventChange;
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'format':
                    this.checkFormat();
                    this.bindInputEvent();
                    this.updateInput();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        if (!this.value) {
                            this.updateInputValue(this.maskedDateValue);
                        }
                    }
                    break;
                case 'inputFormats':
                    this.checkInputFormats();
                    break;
                case 'allowEdit':
                    this.setAllowEdit();
                    break;
                case 'placeholder':
                    Input.setPlaceholder(this.placeholder, this.inputElement);
                    break;
                case 'readonly':
                    Input.setReadonly(this.readonly, this.inputElement);
                    break;
                case 'enabled':
                    Input.setEnabled(this.enabled, this.inputElement);
                    this.setAriaDisabled();
                    break;
                case 'htmlAttributes':
                    this.updateHtmlAttributeToElement();
                    this.updateHtmlAttributeToWrapper();
                    this.checkHtmlAttributes(true);
                    break;
                case 'locale':
                    this.globalize = new Internationalization(this.locale);
                    this.l10n.setLocale(this.locale);
                    if (this.datepickerOptions && this.datepickerOptions.placeholder == null) {
                        this.setProperties({ placeholder: this.l10n.getConstant('placeholder') }, true);
                        Input.setPlaceholder(this.placeholder, this.inputElement);
                    }
                    this.updateInput();
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                    }
                    break;
                case 'enableRtl':
                    Input.setEnableRtl(this.enableRtl, [this.inputWrapper.container]);
                    break;
                case 'start':
                case 'depth':
                    this.checkView();
                    if (this.calendarElement) {
                        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                    }
                    break;
                case 'zIndex':
                    this.setProperties({ zIndex: newProp.zIndex }, true);
                    break;
                case 'cssClass':
                    this.updateCssClass(newProp.cssClass, oldProp.cssClass);
                    break;
                case 'showClearButton':
                    Input.setClearButton(this.showClearButton, this.inputElement, this.inputWrapper);
                    this.bindClearEvent();
                    this.index = this.showClearButton ? 2 : 1;
                    break;
                case 'strictMode':
                    this.invalidValueString = null;
                    this.updateInput();
                    break;
                case 'width':
                    this.setWidth(newProp.width);
                    Input.calculateWidth(this.inputElement, this.inputWrapper.container);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'floatLabelType':
                    this.floatLabelType = newProp.floatLabelType;
                    Input.removeFloating(this.inputWrapper);
                    Input.addFloating(this.inputElement, this.floatLabelType, this.placeholder);
                    if (!isNullOrUndefined(this.inputWrapper.buttons[0]) && !isNullOrUndefined(this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0]) && this.floatLabelType !== 'Never') {
                        this.inputWrapper.container.getElementsByClassName('e-float-text-overflow')[0].classList.add('e-icon');
                    }
                    break;
                case 'enableMask':
                    if (this.enableMask) {
                        this.notify('createMask', {
                            module: 'MaskedDateTime'
                        });
                        this.updateInputValue(this.maskedDateValue);
                        this.bindInputEvent();
                    }
                    else {
                        if (this.inputElement.value === this.maskedDateValue) {
                            this.updateInputValue('');
                        }
                    }
                    break;
                default:
                    if (this.calendarElement && this.isCalendar()) {
                        _super.prototype.onPropertyChanged.call(this, newProp, oldProp);
                    }
                    if (prop === 'min' && isNullOrUndefined(this.min)) {
                        this.min = new Date(1900, 0, 1);
                    }
                    if (prop === 'max' && isNullOrUndefined(this.max)) {
                        this.max = new Date(2099, 11, 31);
                    }
                    break;
            }
            if (!this.isDynamicValueChanged) {
                this.hide(null);
            }
            this.isDynamicValueChanged = false;
        }
    };
    /**
     * @private
     * @param {Date | Date[]} dates - Specifies the date or dates to be added to the values property of the Calendar.
     * @returns {void}
     */
    DatePicker.prototype.addDate = function (dates) {
        // no code
    };
    __decorate([
        Property(null)
    ], DatePicker.prototype, "width", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "value", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "strictMode", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "format", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "inputFormats", void 0);
    __decorate([
        Property(true)
    ], DatePicker.prototype, "enabled", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "fullScreenMode", void 0);
    __decorate([
        Property({})
    ], DatePicker.prototype, "htmlAttributes", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "values", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "isMultiSelection", void 0);
    __decorate([
        Property(true)
    ], DatePicker.prototype, "showClearButton", void 0);
    __decorate([
        Property(true)
    ], DatePicker.prototype, "allowEdit", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "keyConfigs", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "enablePersistence", void 0);
    __decorate([
        Property(1000)
    ], DatePicker.prototype, "zIndex", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "readonly", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "placeholder", void 0);
    __decorate([
        Property('Never')
    ], DatePicker.prototype, "floatLabelType", void 0);
    __decorate([
        Property(null)
    ], DatePicker.prototype, "serverTimezoneOffset", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "openOnFocus", void 0);
    __decorate([
        Property(false)
    ], DatePicker.prototype, "enableMask", void 0);
    __decorate([
        Property({ day: 'day', month: 'month', year: 'year', hour: 'hour', minute: 'minute', second: 'second', dayOfTheWeek: 'day of the week' })
    ], DatePicker.prototype, "maskPlaceholder", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "open", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "cleared", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "close", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "blur", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "focus", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "created", void 0);
    __decorate([
        Event()
    ], DatePicker.prototype, "destroyed", void 0);
    DatePicker = __decorate([
        NotifyPropertyChanges
    ], DatePicker);
    return DatePicker;
}(Calendar));
export { DatePicker };
