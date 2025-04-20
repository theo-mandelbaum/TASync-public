"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sample.css");
var Multiline = function () {
    // Multiline TextBox
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isTextareaEnable = _a[0], setIsTextareaEnable = _a[1];
    var _b = (0, react_1.useState)(false), isTextareaReadonly = _b[0], setIsTextareaReadonly = _b[1];
    var _c = (0, react_1.useState)('Auto'), floatLabelType = _c[0], setFloatLabelType = _c[1];
    var textareaObj = (0, react_1.useRef)(null);
    var floatData;
    var fields;
    floatData = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    fields = { text: 'Label', value: 'Id' };
    var enabledHandler = function (args) {
        setIsTextareaEnable(!args.checked);
    };
    var readonlyHandler = function (args) {
        setIsTextareaReadonly(args.checked);
    };
    var floatHandler = function (args) {
        setFloatLabelType(args.value);
    };
    var rowHandler = function (args) {
        textareaObj.current.addAttributes({ rows: args.value });
    };
    return (React.createElement("div", { className: 'control-pane multiline' },
        React.createElement("div", { className: 'control-section row multilinepreview' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: 'multiline-wrapper' },
                    React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: 'default', multiline: true, floatLabelType: floatLabelType, enabled: isTextareaEnable, readonly: isTextareaReadonly, placeholder: "Enter your address", ref: textareaObj }))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "multiline" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'multiline-property' },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: 'left-side' }, "FLoat label type"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "float", value: floatLabelType, dataSource: floatData, fields: fields, change: floatHandler.bind(_this), placeholder: "Select float type" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: 'left-side' }, "Disabled"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: enabledHandler.bind(_this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: 'left-side' }, "Read only"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: readonlyHandler.bind(_this) }))),
                            React.createElement("tr", null,
                                React.createElement("td", { className: 'left-side' }, "Rows"),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: '##', value: 2, min: 1, max: 20, step: 1, change: rowHandler.bind(_this) })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the multiline functionalities of the textbox component. Enter or fill the textbox with multiple rows of text. Choose the corresponding option from the property panel to update the multiline textbox.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Multiline Textbox is used to edit or display multiple lines of text that helps you to accept address, description, comments, feedbacks, and more in a form. In this sample, rendered multiline textbox from ",
                React.createElement("b", null, "textarea"),
                " tag and the following options are available to customize it:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Choose float label types either 'Never', 'Always', or 'Auto' to float the placeholder text."),
                React.createElement("li", null, "To make a read-only multiline textbox, check the \"read-only\" option."),
                React.createElement("li", null, "Disable the textbox by unchecking an \"enabled\" option."),
                React.createElement("li", null, "Change the number of rows count to restrict the length of the input.")),
            React.createElement("p", null, "Note: After resizing the multiline textbox manually, the selected rows option from the property panel is not updated to the multiline textbox."))));
};
exports.default = Multiline;
