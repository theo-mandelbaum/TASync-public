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
var Resize = function () {
    // TextArea floating label
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rows = 5;
    var cols = 300;
    var _a = (0, react_1.useState)('Vertical'), resizeMode = _a[0], setResizeMode = _a[1];
    var textareaObj = (0, react_1.useRef)(null);
    var resizeModeData;
    var fields;
    resizeModeData = [
        { Id: 'Vertical', Label: 'Vertical' },
        { Id: 'Horizontal', Label: 'Horizontal' },
        { Id: 'Both', Label: 'Both' },
        { Id: 'None', Label: 'None' }
    ];
    fields = { text: 'Label', value: 'Id' };
    var resizeHandler = function (args) {
        setResizeMode(args.value);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: "textarea-sample", className: "col-lg-8 control-section resize" },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("div", { className: "resize-row" },
                    React.createElement(ej2_react_inputs_1.TextAreaComponent, { id: "resize", placeholder: "Enter your comments", floatLabelType: "Auto", resizeMode: resizeMode, ref: textareaObj, rows: rows, cols: cols })))),
        React.createElement("div", { className: 'col-lg-4 property-section', id: "resize" },
            React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                React.createElement("table", { id: "property", title: "Properties", className: "resize-property" },
                    React.createElement("tr", null,
                        React.createElement("td", { className: "left-side" }, "Resize Mode"),
                        React.createElement("td", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "resizedropdown", value: resizeMode, dataSource: resizeModeData, fields: fields, change: resizeHandler.bind(_this) })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the resize functionalities of the textarea control. Choose the corresponding resizeMode option from the property panel to update the resize behavior in the textarea.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The textarea can be resized vertically, horizontally, or in both directions by selecting the following corresponding options:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Choose resizeMode options such as 'Both', 'Vertical', 'Horizontal', or 'None' to control the resize behavior of the textarea.")))));
};
exports.default = Resize;
