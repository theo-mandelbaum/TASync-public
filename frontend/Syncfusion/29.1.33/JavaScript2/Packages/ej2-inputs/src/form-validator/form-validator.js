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
import { selectAll, select, createElement, Base, detach } from '@syncfusion/ej2-base';
import { extend, isNullOrUndefined, EventHandler } from '@syncfusion/ej2-base';
import { Property, NotifyPropertyChanges, Event, onIntlChange } from '@syncfusion/ej2-base';
import { Internationalization, L10n } from '@syncfusion/ej2-base';
/**
 * global declarations
 */
export var regex = {
    /* eslint-disable no-useless-escape */
    EMAIL: new RegExp('^[A-Za-z0-9._%+-]{1,}@[A-Za-z0-9._%+-]{1,}([.]{1}[a-zA-Z0-9]{2,}' +
        '|[.]{1}[a-zA-Z0-9]{2,4}[.]{1}[a-zA-Z0-9]{2,4})$'),
    /* eslint-disable-next-line security/detect-unsafe-regex */
    URL: /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/m,
    DATE_ISO: new RegExp('^([0-9]{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$'),
    DIGITS: new RegExp('^[0-9]*$'),
    PHONE: new RegExp('^[+]?[0-9]{9,13}$'),
    CREDITCARD: new RegExp('^\\d{13,16}$')
    /* eslint-enable no-useless-escape */
};
/**
 * ErrorOption values
 *
 * @private
 */
export var ErrorOption;
(function (ErrorOption) {
    /**
     * Defines the error message.
     */
    ErrorOption[ErrorOption["Message"] = 0] = "Message";
    /**
     * Defines the error element type.
     */
    ErrorOption[ErrorOption["Label"] = 1] = "Label";
})(ErrorOption || (ErrorOption = {}));
/**
 * FormValidator class enables you to validate the form fields based on your defined rules
 * ```html
 * <form id='formId'>
 *  <input type='text' name='Name' />
 *  <input type='text' name='Age' />
 * </form>
 * <script>
 *   let formObject = new FormValidator('#formId', {
 *      rules: { Name: { required: true }, Age: { range: [18, 30] } };
 *   });
 *   formObject.validate();
 * </script>
 * ```
 */
var FormValidator = /** @class */ (function (_super) {
    __extends(FormValidator, _super);
    /**
     * Initializes the FormValidator.
     *
     * @param {string | HTMLFormElement} element - Specifies the element to render as component.
     * @param {FormValidatorModel} options - Specifies the FormValidator model.
     * @private
     */
    function FormValidator(element, options) {
        var _this = _super.call(this, options, element) || this;
        _this.validated = [];
        _this.errorRules = [];
        _this.allowSubmit = false;
        _this.required = 'required';
        _this.infoElement = null;
        _this.inputElement = null;
        _this.selectQuery = 'input:not([type=reset]):not([type=button]), select, textarea';
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.localyMessage = {};
        /**
         * Specifies the default messages for validation rules.
         *
         * @default { List of validation message }
         */
        _this.defaultMessages = {
            required: 'This field is required.',
            email: 'Please enter a valid email address.',
            url: 'Please enter a valid URL.',
            date: 'Please enter a valid date.',
            dateIso: 'Please enter a valid date ( ISO ).',
            creditcard: 'Please enter valid card number',
            number: 'Please enter a valid number.',
            digits: 'Please enter only digits.',
            maxLength: 'Please enter no more than {0} characters.',
            minLength: 'Please enter at least {0} characters.',
            rangeLength: 'Please enter a value between {0} and {1} characters long.',
            range: 'Please enter a value between {0} and {1}.',
            max: 'Please enter a value less than or equal to {0}.',
            min: 'Please enter a value greater than or equal to {0}.',
            regex: 'Please enter a correct value.',
            tel: 'Please enter a valid phone number.',
            pattern: 'Please enter a correct pattern value.',
            equalTo: 'Please enter the valid match text'
        };
        if (typeof _this.rules === 'undefined') {
            _this.rules = {};
        }
        _this.l10n = new L10n('formValidator', _this.defaultMessages, _this.locale);
        if (_this.locale) {
            _this.localeFunc();
        }
        onIntlChange.on('notifyExternalChange', _this.afterLocalization, _this);
        element = typeof element === 'string' ? select(element, document) : element;
        // Set novalidate to prevent default HTML5 form validation
        if (_this.element != null) {
            _this.element.setAttribute('novalidate', '');
            _this.inputElements = selectAll(_this.selectQuery, _this.element);
            _this.createHTML5Rules();
            _this.wireEvents();
        }
        else {
            return undefined;
        }
        return _this;
    }
    FormValidator_1 = FormValidator;
    /* eslint-enable @typescript-eslint/no-explicit-any */
    /**
     * Add validation rules to the corresponding input element based on `name` attribute.
     *
     * @param {string} name `name` of form field.
     * @param {Object} rules Validation rules for the corresponding element.
     * @returns {void}
     */
    FormValidator.prototype.addRules = function (name, rules) {
        if (name) {
            // eslint-disable-next-line no-prototype-builtins
            if (this.rules.hasOwnProperty(name)) {
                extend(this.rules["" + name], rules, {});
            }
            else {
                this.rules["" + name] = rules;
            }
        }
    };
    /**
     * Remove validation to the corresponding field based on name attribute.
     * When no parameter is passed, remove all the validations in the form.
     *
     * @param {string} name Input name attribute value.
     * @param {string[]} rules List of validation rules need to be remove from the corresponding element.
     * @returns {void}
     */
    FormValidator.prototype.removeRules = function (name, rules) {
        if (!name && !rules) {
            this.rules = {};
        }
        else if (this.rules["" + name] && !rules) {
            delete this.rules["" + name];
        }
        else if (!isNullOrUndefined(this.rules["" + name] && rules)) {
            for (var i = 0; i < rules.length; i++) {
                delete this.rules["" + name][rules[parseInt(i.toString(), 10)]];
            }
        }
        else {
            return;
        }
    };
    /**
     * Validate the current form values using defined rules.
     * Returns `true` when the form is valid otherwise `false`
     *
     * @param {string} selected - Optional parameter to validate specified element.
     * @returns {boolean} - Returns form validation status.
     */
    FormValidator.prototype.validate = function (selected) {
        var rules = Object.keys(this.rules);
        if (selected && rules.length) {
            this.validateRules(selected);
            //filter the selected element it don't have any valid input element
            return rules.indexOf(selected) !== -1 && this.errorRules.filter(function (data) {
                return data.name === selected;
            }).length === 0;
        }
        else {
            this.errorRules = [];
            for (var _i = 0, rules_1 = rules; _i < rules_1.length; _i++) {
                var name_1 = rules_1[_i];
                this.validateRules(name_1);
            }
            return this.errorRules.length === 0;
        }
    };
    /**
     * Reset the value of all the fields in form.
     *
     * @returns {void}
     */
    FormValidator.prototype.reset = function () {
        this.element.reset();
        this.clearForm();
    };
    /**
     * Get input element by name.
     *
     * @param {string} name - Input element name attribute value.
     * @returns {HTMLInputElement} - Returns the input element.
     */
    FormValidator.prototype.getInputElement = function (name) {
        this.inputElement = (select('[name="' + name + '"]', this.element));
        return this.inputElement;
    };
    /**
     * Destroy the form validator object and error elements.
     *
     * @returns {void}
     */
    FormValidator.prototype.destroy = function () {
        this.reset();
        this.unwireEvents();
        this.rules = {};
        var elements = selectAll('.' + this.errorClass + ', .' + this.validClass, this.element);
        for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
            var element = elements_1[_i];
            detach(element);
        }
        _super.prototype.destroy.call(this);
        this.infoElement = null;
        onIntlChange.off('notifyExternalChange', this.afterLocalization);
    };
    /**
     * @param {FormValidatorModel} newProp - Returns the dynamic property value of the component.
     * @param {FormValidatorModel} oldProp - Returns the previous property value of the component.
     * @returns {void}
     * @private
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    FormValidator.prototype.onPropertyChanged = function (newProp, oldProp) {
        for (var _i = 0, _a = Object.keys(newProp); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'locale':
                    this.localeFunc();
                    break;
            }
        }
    };
    /**
     * @private
     * @returns {void}
     */
    FormValidator.prototype.localeFunc = function () {
        for (var _i = 0, _a = Object.keys(this.defaultMessages); _i < _a.length; _i++) {
            var key = _a[_i];
            this.l10n.setLocale(this.locale);
            var value = this.l10n.getConstant(key);
            this.localyMessage["" + key] = value;
        }
    };
    /**
     * @private
     * @returns {string} - Returns the component name.
     */
    FormValidator.prototype.getModuleName = function () {
        return 'formvalidator';
    };
    /**
     * @param {any} args - Specifies the culture name.
     * @returns {void}
     * @private
     */
    FormValidator.prototype.afterLocalization = function (args) {
        this.locale = args.locale;
        this.localeFunc();
    };
    /**
     * Allows you to refresh the form validator base events to the elements inside the form.
     *
     * @returns {void}
     */
    FormValidator.prototype.refresh = function () {
        this.unwireEvents();
        this.inputElements = selectAll(this.selectQuery, this.element);
        this.wireEvents();
    };
    FormValidator.prototype.clearForm = function () {
        this.errorRules = [];
        this.validated = [];
        var elements = selectAll(this.selectQuery, this.element);
        for (var _i = 0, elements_2 = elements; _i < elements_2.length; _i++) {
            var element = elements_2[_i];
            var input = element;
            input.removeAttribute('aria-invalid');
            var inputParent = input.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                (input.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                inputParent.classList.remove(this.errorClass);
            }
            else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                grandParent.classList.contains('e-wrapper'))) {
                grandParent.classList.remove(this.errorClass);
            }
            else {
                input.classList.remove(this.errorClass);
            }
            if (input.name.length > 0) {
                this.getInputElement(input.name);
                this.getErrorElement(input.name);
                this.hideMessage(input.name);
            }
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                (input.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                inputParent.classList.remove(this.validClass);
            }
            else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                grandParent.classList.contains('e-wrapper'))) {
                grandParent.classList.remove(this.validClass);
            }
            else {
                input.classList.remove(this.validClass);
            }
        }
    };
    FormValidator.prototype.createHTML5Rules = function () {
        var defRules = ['required', 'validateHidden', 'regex', 'rangeLength', 'maxLength', 'minLength', 'dateIso', 'digits',
            'pattern', 'data-val-required', 'type', 'data-validation', 'min', 'max', 'range', 'equalTo', 'data-val-minlength-min',
            'data-val-equalto-other', 'data-val-maxlength-max', 'data-val-range-min', 'data-val-regex-pattern', 'data-val-length-max',
            'data-val-creditcard', 'data-val-phone'];
        var acceptedTypes = ['hidden', 'email', 'url', 'date', 'number', 'tel'];
        for (var _i = 0, _a = (this.inputElements); _i < _a.length; _i++) {
            var input = _a[_i];
            // Default attribute rules
            var allRule = {};
            for (var _b = 0, defRules_1 = defRules; _b < defRules_1.length; _b++) {
                var rule = defRules_1[_b];
                if (input.getAttribute(rule) !== null) {
                    switch (rule) {
                        case 'required':
                            this.defRule(input, allRule, rule, input.required);
                            break;
                        case 'data-validation':
                            rule = input.getAttribute(rule);
                            this.defRule(input, allRule, rule, true);
                            break;
                        case 'type':
                            if (acceptedTypes.indexOf(input.type) !== -1) {
                                this.defRule(input, allRule, input.type, true);
                            }
                            break;
                        case 'rangeLength':
                        case 'range':
                            this.defRule(input, allRule, rule, JSON.parse(input.getAttribute(rule)));
                            break;
                        case 'equalTo':
                            {
                                var id = input.getAttribute(rule);
                                this.defRule(input, allRule, rule, id);
                            }
                            break;
                        default:
                            if (input.getAttribute('data-val') === 'true') {
                                this.annotationRule(input, allRule, rule, input.getAttribute(rule));
                            }
                            else {
                                this.defRule(input, allRule, rule, input.getAttribute(rule));
                            }
                    }
                }
            }
            //adding pattern type validation
            if (Object.keys(allRule).length !== 0) {
                this.addRules(input.name, allRule);
            }
        }
    };
    FormValidator.prototype.annotationRule = function (input, ruleCon, ruleName, value) {
        var annotationRule = ruleName.split('-');
        var rulesList = ['required', 'creditcard', 'phone', 'maxlength', 'minlength', 'range', 'regex', 'equalto'];
        var ruleFirstName = annotationRule[annotationRule.length - 1];
        var ruleSecondName = annotationRule[annotationRule.length - 2];
        if (rulesList.indexOf(ruleFirstName) !== -1) {
            switch (ruleFirstName) {
                case 'required':
                    this.defRule(input, ruleCon, 'required', value);
                    break;
                case 'creditcard':
                    this.defRule(input, ruleCon, 'creditcard', value);
                    break;
                case 'phone':
                    this.defRule(input, ruleCon, 'tel', value);
                    break;
            }
        }
        else if (rulesList.indexOf(ruleSecondName) !== -1) {
            switch (ruleSecondName) {
                case 'maxlength':
                    this.defRule(input, ruleCon, 'maxLength', value);
                    break;
                case 'minlength':
                    this.defRule(input, ruleCon, 'minLength', value);
                    break;
                case 'range':
                    {
                        var minvalue = input.getAttribute('data-val-range-min');
                        var maxvalue = input.getAttribute('data-val-range-max');
                        this.defRule(input, ruleCon, 'range', [minvalue, maxvalue]);
                    }
                    break;
                case 'equalto':
                    {
                        var id = input.getAttribute(ruleName).split('.');
                        this.defRule(input, ruleCon, 'equalTo', id[id.length - 1]);
                    }
                    break;
                case 'regex':
                    this.defRule(input, ruleCon, 'regex', value);
                    break;
            }
        }
    };
    FormValidator.prototype.defRule = function (input, ruleCon, ruleName, value) {
        var message = input.getAttribute('data-' + ruleName + '-message');
        var annotationMessage = input.getAttribute('data-val-' + ruleName);
        var customMessage;
        if (this.rules[input.name] && ruleName !== 'validateHidden' && ruleName !== 'hidden') {
            this.getInputElement(input.name);
            customMessage = this.getErrorMessage(this.rules[input.name]["" + ruleName], ruleName);
        }
        if (message) {
            value = [value, message];
        }
        else if (annotationMessage) {
            value = [value, annotationMessage];
        }
        else if (customMessage) {
            value = [value, customMessage];
        }
        ruleCon["" + ruleName] = value;
    };
    // Wire events to the form elements
    FormValidator.prototype.wireEvents = function () {
        for (var _i = 0, _a = (this.inputElements); _i < _a.length; _i++) {
            var input = _a[_i];
            if (FormValidator_1.isCheckable(input)) {
                EventHandler.add(input, 'click', this.clickHandler, this);
            }
            else if (input.tagName === 'SELECT') {
                EventHandler.add(input, 'change', this.changeHandler, this);
            }
            else {
                EventHandler.add(input, 'focusout', this.focusOutHandler, this);
                EventHandler.add(input, 'keyup', this.keyUpHandler, this);
            }
        }
        EventHandler.add(this.element, 'submit', this.submitHandler, this);
        EventHandler.add(this.element, 'reset', this.resetHandler, this);
    };
    // UnWire events to the form elements
    FormValidator.prototype.unwireEvents = function () {
        for (var _i = 0, _a = (this.inputElements); _i < _a.length; _i++) {
            var input = _a[_i];
            EventHandler.clearEvents(input);
        }
        EventHandler.remove(this.element, 'submit', this.submitHandler);
        EventHandler.remove(this.element, 'reset', this.resetHandler);
    };
    // Handle input element focusout event
    FormValidator.prototype.focusOutHandler = function (e) {
        this.trigger('focusout', e);
        //FormValidator.triggerCallback(this.focusout, e);
        var element = e.target;
        if (this.rules[element.name]) {
            if (this.rules[element.name][this.required] || element.value.length > 0) {
                this.validate(element.name);
            }
            else if (this.validated.indexOf(element.name) === -1) {
                this.validated.push(element.name);
            }
        }
    };
    // Handle input element keyup event
    FormValidator.prototype.keyUpHandler = function (e) {
        this.trigger('keyup', e);
        var element = e.target;
        // List of keys need to prevent while validation
        var excludeKeys = [16, 17, 18, 20, 35, 36, 37, 38, 39, 40, 45, 144, 225];
        if (e.which === 9 && (!this.rules[element.name] || (this.rules[element.name] && !this.rules[element.name][this.required]))) {
            return;
        }
        if (this.validated.indexOf(element.name) !== -1 && this.rules[element.name] && excludeKeys.indexOf(e.which) === -1) {
            this.validate(element.name);
        }
    };
    // Handle input click event
    FormValidator.prototype.clickHandler = function (e) {
        this.trigger('click', e);
        var element = e.target;
        // If element type is not submit allow validation
        if (element.type !== 'submit') {
            this.validate(element.name);
        }
        else if (element.getAttribute('formnovalidate') !== null) {
            // Prevent form validation, if submit button has formnovalidate attribute
            this.allowSubmit = true;
        }
    };
    // Handle input change event
    FormValidator.prototype.changeHandler = function (e) {
        this.trigger('change', e);
        var element = e.target;
        this.validate(element.name);
    };
    // Handle form submit event
    FormValidator.prototype.submitHandler = function (e) {
        this.trigger('submit', e);
        //FormValidator.triggerCallback(this.submit, e);
        // Prevent form submit if validation failed
        if (!this.allowSubmit && !this.validate()) {
            e.preventDefault();
        }
        else {
            this.allowSubmit = false;
        }
    };
    // Handle form reset
    FormValidator.prototype.resetHandler = function () {
        this.clearForm();
    };
    // Validate each rule based on input element name
    FormValidator.prototype.validateRules = function (name) {
        if (!this.rules["" + name]) {
            return;
        }
        var rules = Object.keys(this.rules["" + name]);
        var hiddenType = false;
        var validateHiddenType = false;
        var vhPos = rules.indexOf('validateHidden');
        var hPos = rules.indexOf('hidden');
        this.getInputElement(name);
        if (hPos !== -1) {
            hiddenType = true;
        }
        if (vhPos !== -1) {
            validateHiddenType = true;
        }
        if (!hiddenType || (hiddenType && validateHiddenType)) {
            if (vhPos !== -1) {
                rules.splice(vhPos, 1);
            }
            if (hPos !== -1) {
                rules.splice((hPos - 1), 1);
            }
            this.getErrorElement(name);
            for (var _i = 0, rules_2 = rules; _i < rules_2.length; _i++) {
                var rule = rules_2[_i];
                var errorMessage = this.getErrorMessage(this.rules["" + name]["" + rule], rule);
                var errorRule = { name: name, message: errorMessage };
                var eventArgs = {
                    inputName: name,
                    element: this.inputElement,
                    message: errorMessage
                };
                if (!this.isValid(name, rule) && !this.inputElement.classList.contains(this.ignore)) {
                    this.removeErrorRules(name);
                    this.errorRules.push(errorRule);
                    // Set aria attributes to invalid elements
                    this.inputElement.setAttribute('aria-invalid', 'true');
                    this.inputElement.setAttribute('aria-describedby', this.inputElement.id + '-info');
                    var inputParent = this.inputElement.parentElement;
                    var grandParent = inputParent.parentElement;
                    if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                        (this.inputElement.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                        inputParent.classList.add(this.errorClass);
                        inputParent.classList.remove(this.validClass);
                    }
                    else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                        grandParent.classList.contains('e-wrapper'))) {
                        grandParent.classList.add(this.errorClass);
                        grandParent.classList.remove(this.validClass);
                    }
                    else {
                        this.inputElement.classList.add(this.errorClass);
                        this.inputElement.classList.remove(this.validClass);
                    }
                    if (!this.infoElement) {
                        this.createErrorElement(name, errorRule.message, this.inputElement);
                    }
                    else {
                        this.showMessage(errorRule);
                    }
                    eventArgs.errorElement = this.infoElement;
                    eventArgs.status = 'failure';
                    if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                        (this.inputElement.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                        inputParent.classList.add(this.errorClass);
                        inputParent.classList.remove(this.validClass);
                    }
                    else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') ||
                        grandParent.classList.contains('e-wrapper'))) {
                        grandParent.classList.add(this.errorClass);
                        grandParent.classList.remove(this.validClass);
                    }
                    else {
                        this.inputElement.classList.add(this.errorClass);
                        this.inputElement.classList.remove(this.validClass);
                    }
                    this.optionalValidationStatus(name, eventArgs);
                    this.trigger('validationComplete', eventArgs);
                    // Set aria-required to required rule elements
                    if (rule === 'required') {
                        this.inputElement.setAttribute('aria-required', 'true');
                    }
                    break;
                }
                else {
                    this.hideMessage(name);
                    eventArgs.status = 'success';
                    this.trigger('validationComplete', eventArgs);
                }
            }
        }
        else {
            return;
        }
    };
    // Update the optional validation status
    FormValidator.prototype.optionalValidationStatus = function (name, refer) {
        if (!this.rules["" + name][this.required] && !this.inputElement.value.length && !isNullOrUndefined(this.infoElement)) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            refer.status = '';
            this.hideMessage(name);
        }
    };
    // Check the input element whether it's value satisfy the validation rule or not
    FormValidator.prototype.isValid = function (name, rule) {
        var params = this.rules["" + name]["" + rule];
        var param = (params instanceof Array && typeof params[1] === 'string') ? params[0] : params;
        var currentRule = this.rules["" + name]["" + rule];
        var dateFormat = ((rule === 'min' || rule === 'max') && this.rules['' + name].date &&
            typeof (this.rules['' + name].date) === 'string') ? this.rules['' + name].date : null;
        var args = { value: this.inputElement.value,
            param: param, element: this.inputElement, formElement: this.element, format: dateFormat, culture: this.locale };
        this.trigger('validationBegin', args);
        if (!args.param && rule === 'required') {
            return true;
        }
        if (currentRule && typeof currentRule[0] === 'function') {
            var fn = currentRule[0];
            return fn.call(this, { element: this.inputElement, value: this.inputElement.value });
        }
        else if (FormValidator_1.isCheckable(this.inputElement)) {
            if (rule !== 'required') {
                return true;
            }
            return selectAll('input[name="' + name + '"]:checked', this.element).length > 0;
        }
        else {
            return FormValidator_1.checkValidator["" + rule](args);
        }
    };
    // Return default error message or custom error message
    FormValidator.prototype.getErrorMessage = function (ruleValue, rule) {
        var message = this.inputElement.getAttribute('data-' + rule + '-message') ?
            this.inputElement.getAttribute('data-' + rule + '-message') :
            (ruleValue instanceof Array && typeof ruleValue[1] === 'string') ? ruleValue[1] :
                (Object.keys(this.localyMessage).length !== 0) ? this.localyMessage["" + rule] : this.defaultMessages["" + rule];
        var formats = message.match(/{(\d)}/g);
        if (!isNullOrUndefined(formats)) {
            for (var i = 0; i < formats.length; i++) {
                var value = ruleValue instanceof Array ? ruleValue[parseInt(i.toString(), 10)] : ruleValue;
                message = message.replace(formats[parseInt(i.toString(), 10)], value);
            }
        }
        return message;
    };
    // Create error element based on name and error message
    FormValidator.prototype.createErrorElement = function (name, message, input) {
        var errorElement = createElement(this.errorElement, {
            className: this.errorClass,
            innerHTML: message,
            attrs: { for: name }
        });
        // Create message design if errorOption is message
        if (this.errorOption === ErrorOption.Message) {
            errorElement.classList.remove(this.errorClass);
            errorElement.classList.add('e-message');
            errorElement = createElement(this.errorContainer, { className: this.errorClass, innerHTML: errorElement.outerHTML });
        }
        errorElement.id = this.inputElement.name + '-info';
        // Append error message into MVC error message element
        if (this.element.querySelector('[data-valmsg-for="' + input.id + '"]')) {
            this.element.querySelector('[data-valmsg-for="' + input.id + '"]').appendChild(errorElement);
        }
        else if (input.hasAttribute('data-msg-containerid') === true) {
            // Append error message into custom div element
            var containerId = input.getAttribute('data-msg-containerid');
            var divElement = select('#' + containerId, this.element);
            divElement.appendChild(errorElement);
        }
        else if (this.customPlacement != null) {
            // Call custom placement function if customPlacement is not null
            this.customPlacement.call(this, this.inputElement, errorElement);
        }
        else {
            var inputParent = this.inputElement.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper')) {
                grandParent.insertBefore(errorElement, inputParent.nextSibling);
            }
            else if (grandParent.classList.contains('e-control-wrapper') || grandParent.classList.contains('e-wrapper')) {
                grandParent.parentElement.insertBefore(errorElement, grandParent.nextSibling);
            }
            else {
                inputParent.insertBefore(errorElement, this.inputElement.nextSibling);
            }
        }
        errorElement.style.display = 'block';
        this.getErrorElement(name);
        this.validated.push(name);
        this.checkRequired(name);
    };
    // Get error element by name
    FormValidator.prototype.getErrorElement = function (name) {
        this.infoElement = select(this.errorElement + '.' + this.errorClass, this.inputElement.parentElement);
        if (!this.infoElement) {
            this.infoElement = select(this.errorElement + '.' + this.errorClass + '[for="' + name + '"]', this.element);
        }
        return this.infoElement;
    };
    // Remove existing rule from errorRules object
    FormValidator.prototype.removeErrorRules = function (name) {
        for (var i = 0; i < this.errorRules.length; i++) {
            var rule = this.errorRules[parseInt(i.toString(), 10)];
            if (rule.name === name) {
                this.errorRules.splice(i, 1);
            }
        }
    };
    // Show error message to the input element
    FormValidator.prototype.showMessage = function (errorRule) {
        this.infoElement.style.display = 'block';
        this.infoElement.innerHTML = errorRule.message;
        this.checkRequired(errorRule.name);
    };
    // Hide error message based on input name
    FormValidator.prototype.hideMessage = function (name) {
        if (this.infoElement) {
            this.infoElement.style.display = 'none';
            this.removeErrorRules(name);
            var inputParent = this.inputElement.parentElement;
            var grandParent = inputParent.parentElement;
            if (inputParent.classList.contains('e-control-wrapper') || inputParent.classList.contains('e-wrapper') ||
                (this.inputElement.classList.contains('e-input') && inputParent.classList.contains('e-input-group'))) {
                inputParent.classList.add(this.validClass);
                inputParent.classList.remove(this.errorClass);
            }
            else if ((grandParent != null) && (grandParent.classList.contains('e-control-wrapper') || grandParent.classList.contains('e-wrapper'))) {
                grandParent.classList.add(this.validClass);
                grandParent.classList.remove(this.errorClass);
            }
            else {
                this.inputElement.classList.add(this.validClass);
                this.inputElement.classList.remove(this.errorClass);
            }
            this.inputElement.setAttribute('aria-invalid', 'false');
        }
    };
    // Check whether the input element have required rule and its value is not empty
    FormValidator.prototype.checkRequired = function (name) {
        if (!this.rules["" + name][this.required] && !this.inputElement.value.length && !isNullOrUndefined(this.infoElement)) {
            this.infoElement.innerHTML = this.inputElement.value;
            this.infoElement.setAttribute('aria-invalid', 'false');
            this.hideMessage(name);
        }
    };
    // Return boolean result if the input have checkable or submit types
    FormValidator.isCheckable = function (input) {
        var inputType = input.getAttribute('type');
        return inputType && (inputType === 'checkbox' || inputType === 'radio' || inputType === 'submit');
    };
    var FormValidator_1;
    // List of function to validate the rules
    FormValidator.checkValidator = {
        required: function (option) {
            return !isNaN(Date.parse(option.value)) ? !isNaN(new Date(option.value).getTime()) : option.value.toString().length > 0;
        },
        email: function (option) {
            return regex.EMAIL.test(option.value);
        },
        url: function (option) {
            return regex.URL.test(option.value);
        },
        dateIso: function (option) {
            return regex.DATE_ISO.test(option.value);
        },
        tel: function (option) {
            return regex.PHONE.test(option.value);
        },
        creditcard: function (option) {
            return regex.CREDITCARD.test(option.value);
        },
        number: function (option) {
            return !isNaN(Number(option.value)) && String(option.value).indexOf(' ') === -1;
        },
        digits: function (option) {
            return regex.DIGITS.test(option.value);
        },
        maxLength: function (option) {
            return option.value.length <= Number(option.param);
        },
        minLength: function (option) {
            return option.value.length >= Number(option.param);
        },
        rangeLength: function (option) {
            var param = option.param;
            return option.value.length >= param[0] && option.value.length <= param[1];
        },
        range: function (option) {
            var param = option.param;
            return !isNaN(Number(option.value)) && Number(option.value) >= param[0] && Number(option.value) <= param[1];
        },
        date: function (option) {
            if (!isNullOrUndefined(option.param) && (typeof (option.param) === 'string' && option.param !== '')) {
                var globalize = option.culture && option.culture !== '' ? new Internationalization(option.culture) : new Internationalization;
                var dateOptions = { format: option.param.toString(), type: 'dateTime', skeleton: 'yMd' };
                var dateValue = globalize.parseDate(option.value, dateOptions);
                return (!isNullOrUndefined(dateValue) && dateValue instanceof Date && !isNaN(+dateValue));
            }
            else {
                return !isNaN(new Date(option.value).getTime());
            }
        },
        max: function (option) {
            if (!isNaN(Number(option.value))) {
                // Maximum rule validation for number
                return +option.value <= +option.param;
            }
            // Maximum rule validation for date
            if (option.format && option.format !== '') {
                var globalize = option.culture && option.culture !== '' ? new Internationalization(option.culture) : new Internationalization;
                var dateOptions = { format: option.format.toString(), type: 'dateTime', skeleton: 'yMd' };
                var dateValue = globalize.parseDate(option.value, dateOptions);
                var maxValue = (typeof (option.param) === 'string') ? globalize.parseDate(JSON.parse(JSON.stringify(option.param)), dateOptions) : option.param;
                return new Date(dateValue).getTime() <= new Date(maxValue).getTime();
            }
            else {
                return new Date(option.value).getTime() <= new Date(JSON.parse(JSON.stringify(option.param))).getTime();
            }
        },
        min: function (option) {
            if (!isNaN(Number(option.value))) {
                // Minimum rule validation for number
                return +option.value >= +option.param;
            }
            else if ((option.value).indexOf(',') !== -1) {
                var uNum = (option.value).replace(/,/g, '');
                return parseFloat(uNum) >= Number(option.param); // Convert option.param to a number
            }
            else {
                // Minimum rule validation for date
                if (option.format && option.format !== '') {
                    var globalize = option.culture && option.culture !== '' ? new Internationalization(option.culture) : new Internationalization;
                    var dateOptions = { format: option.format.toString(), type: 'dateTime', skeleton: 'yMd' };
                    var dateValue = globalize.parseDate(option.value, dateOptions);
                    var minValue = (typeof (option.param) === 'string') ? globalize.parseDate(JSON.parse(JSON.stringify(option.param)), dateOptions) : option.param;
                    return new Date(dateValue).getTime() >= new Date(minValue).getTime();
                }
                else {
                    return new Date(option.value).getTime() >= new Date(JSON.parse(JSON.stringify(option.param))).getTime();
                }
            }
        },
        regex: function (option) {
            /* eslint-disable-next-line security/detect-non-literal-regexp */
            return new RegExp(option.param).test(option.value);
        },
        equalTo: function (option) {
            var compareTo = option.formElement.querySelector('#' + option.param);
            option.param = compareTo.value;
            return option.param === option.value;
        }
    };
    __decorate([
        Property('')
    ], FormValidator.prototype, "locale", void 0);
    __decorate([
        Property('e-hidden')
    ], FormValidator.prototype, "ignore", void 0);
    __decorate([
        Property()
    ], FormValidator.prototype, "rules", void 0);
    __decorate([
        Property('e-error')
    ], FormValidator.prototype, "errorClass", void 0);
    __decorate([
        Property('e-valid')
    ], FormValidator.prototype, "validClass", void 0);
    __decorate([
        Property('label')
    ], FormValidator.prototype, "errorElement", void 0);
    __decorate([
        Property('div')
    ], FormValidator.prototype, "errorContainer", void 0);
    __decorate([
        Property(ErrorOption.Label)
    ], FormValidator.prototype, "errorOption", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "focusout", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "keyup", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "click", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "change", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "submit", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "validationBegin", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "validationComplete", void 0);
    __decorate([
        Event()
    ], FormValidator.prototype, "customPlacement", void 0);
    FormValidator = FormValidator_1 = __decorate([
        NotifyPropertyChanges
    ], FormValidator);
    return FormValidator;
}(Base));
export { FormValidator };
