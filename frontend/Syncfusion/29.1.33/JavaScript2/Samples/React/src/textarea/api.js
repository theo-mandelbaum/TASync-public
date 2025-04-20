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
exports.Api = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./sample.css");
var Api = /** @class */ (function (_super) {
    __extends(Api, _super);
    function Api() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Api.prototype.enabledHandler = function (args) {
        this.textareaObj.enabled = args.checked;
    };
    Api.prototype.readonlyHandler = function (args) {
        this.textareaObj.readonly = args.checked;
    };
    Api.prototype.rowHandler = function (args) {
        this.textareaObj.rows = args.value;
    };
    Api.prototype.columnHandler = function (args) {
        this.textareaObj.cols = args.value;
    };
    Api.prototype.maxLengthHandler = function (args) {
        this.textareaObj.maxLength = args.value;
    };
    Api.prototype.valueHandler = function (args) {
        this.textareaObj.value = args.value;
    };
    Api.prototype.clearIconHandler = function (args) {
        this.textareaObj.showClearButton = args.checked;
    };
    Api.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: "textarea-sample", className: "col-lg-8 control-section api-textarea" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { className: "api-row" },
                        React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "api", placeholder: "Enter your comments", floatLabelType: "Auto", ref: function (scope) { _this.textareaObj = scope; } })))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "api" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: "api-property" },
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, " Rows "),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: 2, min: 1, max: 10, change: this.rowHandler.bind(this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, " Columns "),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: 20, min: 5, max: 40, change: this.columnHandler.bind(this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, "Enable"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, ref: function (scope) { _this.enabledCheckBox = scope; }, change: this.enabledHandler.bind(this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, "Read only"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { _this.readonlyCheckBox = scope; }, change: this.readonlyHandler.bind(this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, " MaxLength "),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: -1, change: this.maxLengthHandler.bind(this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, " Value "),
                            React.createElement("td", null,
                                React.createElement(ej2_react_inputs_1.TextBoxComponent, { change: this.valueHandler.bind(this) }))),
                        React.createElement("tr", null,
                            React.createElement("td", { className: "left-side" }, "Show clear icon"),
                            React.createElement("td", null,
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, ref: function (scope) { _this.showClearIcon = scope; }, change: this.clearIconHandler.bind(this) })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the api functionalities of the textarea control. You can customize the appearance and behaviour of textarea component by choosing the corresponding option from the property panel.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The TextArea has the options to customize the appearance and behaviour of the component dynamically by updating the following properties:"),
                React.createElement("ul", null,
                    React.createElement("li", null, "Change the number of rows and columns of textarea by updating \"Rows\" and \"Columns\" options."),
                    React.createElement("li", null, "To make the textarea read-only, check the \"read-only\" option."),
                    React.createElement("li", null, "Disable the textarea by unchecking the \"enabled\" option."),
                    React.createElement("li", null, "Set the maximum length of characters that can be entered in textarea by customizing the \"MaxLength\" option."),
                    React.createElement("li", null, "Update the value of textarea by entering text in \"Value\" option."),
                    React.createElement("li", null, "To make the clear button visible, check the \"Show clear icon\" option..")))));
    };
    return Api;
}(sample_base_1.SampleBase));
exports.Api = Api;
