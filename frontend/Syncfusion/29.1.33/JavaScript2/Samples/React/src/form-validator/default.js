"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Default = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_inputs_1 = require("@syncfusion/ej2-inputs");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.rendereComplete = function () {
        // Initialize the custom function
        var customFunction = function (args) {
            return args.value.length <= 5;
        };
        this.formValidator = {
            // Defines the validation rules
            rules: {
                Required: { required: true },
                Email: { required: true, email: true },
                Url: { required: true, url: true },
                Date: { required: true, date: true },
                DateISO: { required: true, dateIso: true },
                Number: { required: true, number: true },
                Digits: { required: true, digits: true },
                MaxLength: { required: true, maxLength: 5 },
                MinLength: { required: true, minLength: 5 },
                RangeLength: { required: true, rangeLength: [5, 10] },
                Range: { required: true, range: [5, 10] },
                Max: { required: true, max: 5 },
                Min: { required: true, min: 5 },
                Regex: { required: true, regex: ['^[A-z]+$', 'Allowed only alphabets'] },
                Custom: { required: true, custom: [customFunction, 'Allowed char length is 5'] }
            },
            // Initialize the custom placement
            customPlacement: function (inputElement, errorElement) {
                inputElement.parentElement.appendChild(errorElement);
            },
        };
        // Initialize the form-validator
        var formObj;
        formObj = new ej2_inputs_1.FormValidator('#htmlFormId', this.formValidator);
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section' },
                React.createElement("div", { className: 'content-wrapper', style: { marginBottom: '25px' } },
                    React.createElement("form", { id: 'htmlFormId', className: 'htmlForm-horizontal' },
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'required', name: 'Required', required: true, "data-msg-containerid": 'requiredError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'required' }, "Required")),
                            React.createElement("div", { id: 'requiredError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'email', name: 'Email', required: true, "data-msg-containerid": 'emailError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'email' }, "Email")),
                            React.createElement("div", { id: 'emailError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'url', name: 'Url', required: true, "data-msg-containerid": 'urlError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'url' }, "URL")),
                            React.createElement("div", { id: 'urlError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'date', name: 'Date', required: true, "data-msg-containerid": 'dateError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'date' }, "Date")),
                            React.createElement("div", { id: 'dateError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'dateIso', name: 'DateISO', required: true, "data-msg-containerid": 'dateisoError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'dateIso' }, "Date ISO (YYYY-MM-DD)")),
                            React.createElement("div", { id: 'dateisoError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'number', name: 'Number', required: true, "data-msg-containerid": 'numberError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'number' }, "Integer or Decimal")),
                            React.createElement("div", { id: 'numberError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'digits', name: 'Digits', required: true, "data-msg-containerid": 'digitError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'digits' }, "Positive Integer")),
                            React.createElement("div", { id: 'digitError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'maxlen', name: 'MaxLength', required: true, "data-msg-containerid": 'maxlenError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'maxlen' }, "Maximum 5 characters")),
                            React.createElement("div", { id: 'maxlenError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'minlen', name: 'MinLength', required: true, "data-msg-containerid": 'minlenError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'minlen' }, "Minimum 5 characters")),
                            React.createElement("div", { id: 'minlenError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'rangelen', name: 'RangeLength', required: true, "data-msg-containerid": 'rangelenError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'rangelen' }, "Characters length between 5 to 10")),
                            React.createElement("div", { id: 'rangelenError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'range', name: 'Range', required: true, "data-msg-containerid": 'rangeError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'range' }, "Value between 5 to 10")),
                            React.createElement("div", { id: 'rangeError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'max', name: 'Max', required: true, "data-msg-containerid": 'maxError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'max' }, "Max (maximum value 5)")),
                            React.createElement("div", { id: 'maxError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'min', name: 'Min', required: true, "data-msg-containerid": 'minError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'min' }, "Min (minimum value 5)")),
                            React.createElement("div", { id: 'minError' })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'regex', name: 'Regex', required: true, "data-msg-containerid": 'regexError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'regex' }, "Regex (accepts alphabets only)")),
                            React.createElement("div", { id: "regexError" })),
                        React.createElement("div", { className: 'form-group' },
                            React.createElement("div", { className: 'e-float-input' },
                                React.createElement("input", { type: 'text', id: 'custom', name: 'Custom', required: true, "data-msg-containerid": 'customError' }),
                                React.createElement("span", { className: 'e-float-line' }),
                                React.createElement("label", { className: 'e-float-text', htmlFor: 'custom' }, "Custom Function (maximum 5 characters)")),
                            React.createElement("div", { id: 'customError' })),
                        React.createElement("div", { className: 'row' },
                            React.createElement("div", { style: { float: 'left', margin: '0 10% 0 30%' } },
                                React.createElement("button", { id: 'validateSubmit', className: 'e-btn', style: { height: '35px' }, type: 'submit' }, "Submit")),
                            React.createElement("div", null,
                                React.createElement("button", { id: 'resetbtn', className: 'e-btn', style: { height: '35px' }, type: 'reset' }, "Reset")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the default functionalities of the FormValidator. Type a values or characters in the input element. If the input values are correct format then the given input will be ready to submit otherwise error message will be shown until entering the input as correct format.")),
            React.createElement("div", { id: 'description' },
                React.createElement("div", { className: "description-header" }, "Description"),
                React.createElement("p", null, "Form Validator can be used to validate the form input elements with the required validation rules."),
                React.createElement("p", null, "The above form is configured with the following rules and also, we have given the examples of valid values for each field."),
                React.createElement("table", { style: { width: '100%' } },
                    React.createElement("tr", null,
                        React.createElement("th", null, "Field"),
                        React.createElement("th", null, "Rule"),
                        React.createElement("th", null, "Example")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Required"),
                        React.createElement("td", null, "The field must have any value."),
                        React.createElement("td", null, "value")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Email"),
                        React.createElement("td", null, "The input must have email format."),
                        React.createElement("td", null, "info@syncfusion.com")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "URL"),
                        React.createElement("td", null, "The input must have URL format."),
                        React.createElement("td", null, "https://www.syncfusion.com/")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Date"),
                        React.createElement("td", null, "The input must have JavaScript date format."),
                        React.createElement("td", null, "04/13/2017")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Date ISO"),
                        React.createElement("td", null, "The input must have date ISO format."),
                        React.createElement("td", null, "2017-04-13")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Number"),
                        React.createElement("td", null, "The input must have number format. It allows float values."),
                        React.createElement("td", null, "1 or 1.4")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Digits"),
                        React.createElement("td", null, "The input must have digit format."),
                        React.createElement("td", null, "1")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Max Length"),
                        React.createElement("td", null, "The input value must have less than 5 characters length."),
                        React.createElement("td", null, "world")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Min Length"),
                        React.createElement("td", null, "The input value must have more than 5 characters length."),
                        React.createElement("td", null, "syncfusion")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Range Length"),
                        React.createElement("td", null, "The input must have number value from 5 to 10 characters length."),
                        React.createElement("td", null, "syncfusion")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Max"),
                        React.createElement("td", null, "The input must have number value less than or equal to 5."),
                        React.createElement("td", null, "4")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Min"),
                        React.createElement("td", null, "The input must have number value greater than or equal to 5."),
                        React.createElement("td", null, "6")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Regex"),
                        React.createElement("td", null, "You can use regex to validate the input. The input must be alphabets only."),
                        React.createElement("td", null, "contact")),
                    React.createElement("tr", null,
                        React.createElement("td", null, "Custom Function"),
                        React.createElement("td", null, "You can use custom function to validate the input. The input must have less than or equal to 5 character length"),
                        React.createElement("td", null, "test"))),
                React.createElement("br", null),
                React.createElement("p", null, "You can enter the above values in the corresponding input elements and click the subit button to validate the form. The reset button can wipe out all the input values in the form."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
