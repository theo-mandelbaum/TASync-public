"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./sample.css");
var Api = function () {
    // TextBox Api
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isEnabled = _a[0], setIsEnabled = _a[1];
    var _b = (0, react_1.useState)(false), isReadonly = _b[0], setIsReadonly = _b[1];
    var _c = (0, react_1.useState)(false), showClearIcon = _c[0], setShowClearIcon = _c[1];
    var _d = (0, react_1.useState)(null), rows = _d[0], setRows = _d[1];
    var _e = (0, react_1.useState)(null), cols = _e[0], setCols = _e[1];
    var _f = (0, react_1.useState)(null), maxLength = _f[0], setMaxLength = _f[1];
    var _g = (0, react_1.useState)(""), value = _g[0], setValue = _g[1];
    var textareaObj = (0, react_1.useRef)(null);
    var enabledHandler = function (args) {
        setIsEnabled(args.checked);
    };
    var readonlyHandler = function (args) {
        setIsReadonly(args.checked);
    };
    var clearIconHandler = function (args) {
        setShowClearIcon(args.checked);
    };
    var rowHandler = function (args) {
        setRows(args.value);
    };
    var columnHandler = function (args) {
        setCols(args.value);
    };
    var maxLengthHandler = function (args) {
        setMaxLength(args.value);
    };
    var valueHandler = function (args) {
        setValue(args.value);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: "textarea-sample", className: "col-lg-8 control-section api-textarea" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("div", { className: "api-row" },
                    React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "api", placeholder: "Enter your comments", floatLabelType: "Auto", enabled: isEnabled, readonly: isReadonly, showClearButton: showClearIcon, rows: rows, maxLength: maxLength, cols: cols, value: value, ref: textareaObj })))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "api" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: "api-property" },
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, " Rows "),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: 2, min: 1, max: 10, change: rowHandler.bind(_this) }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, " Columns "),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: 20, min: 5, max: 40, change: columnHandler.bind(_this) }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, "Enable"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: enabledHandler.bind(_this) }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, "Read only"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: readonlyHandler.bind(_this) }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, " MaxLength "),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: -1, change: maxLengthHandler.bind(_this) }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, " Value "),
                        React.createElement("td", null,
                            React.createElement(ej2_react_inputs_1.TextBoxComponent, { change: valueHandler.bind(_this) }))),
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, "Show clear icon"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: clearIconHandler.bind(_this) })))))),
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
exports.default = Api;
