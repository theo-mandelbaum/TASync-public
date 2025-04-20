"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./sample.css");
var FloatingLabel = function () {
    // TextArea floating label
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rows = 5;
    var cols = 300;
    var _a = (0, react_1.useState)('Auto'), floatLabelType = _a[0], setFloatLabelType = _a[1];
    var textareaObj = (0, react_1.useRef)(null);
    var floatLabelData;
    var fields;
    floatLabelData = [
        { Id: 'Auto', Label: 'Auto' },
        { Id: 'Never', Label: 'Never' },
        { Id: 'Always', Label: 'Always' }
    ];
    fields = { text: 'Label', value: 'Id' };
    var floatLabelHandler = function (args) {
        setFloatLabelType(args.value);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: "textarea-sample", className: "col-lg-8 control-section floatinglabel" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("div", { className: "floatinglabel-row" },
                    React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "floatlabel", placeholder: "Enter your comments", floatLabelType: floatLabelType, ref: textareaObj, rows: rows, cols: cols })))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "floatinglabel" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: "floatinglabel-property" },
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, "Float label type "),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "float", value: floatLabelType, dataSource: floatLabelData, fields: fields, change: floatLabelHandler.bind(_this) })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the floating label functionalities of the textarea control. Choose the corresponding floatLabel option from the property panel to update the floating label behaviour in textarea.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The floating label is used to float the placeholder text while the user enters text or focuses on the textarea element with a value. In this sample, the floating label behavior can be changed using the following options:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Choose float label types either 'Never', 'Always', or 'Auto' to control the floating behavior of the placeholder text.")))));
};
exports.default = FloatingLabel;
