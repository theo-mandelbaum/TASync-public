"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./sample.css");
var Restrict = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "content-wrapper format-wrapper sample-numeric" },
                React.createElement("div", { className: "control-label" }, "Numeric TextBox"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'n3', decimals: 3, validateDecimalOnType: true, value: 10 }),
                React.createElement("div", { className: "control-label" }, "Percentage TextBox"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'p3', decimals: 3, validateDecimalOnType: true, value: 0.5, min: 0, max: 1, step: 0.01 }),
                React.createElement("div", { className: "control-label" }, "Currency TextBox"),
                React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { format: 'c3', decimals: 3, validateDecimalOnType: true, value: 100 }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the decimal functionalities of the Numeric TextBox. Type a value in the input element to change dynamically, and it allows maximum of 3 decimal digits.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The NumericTextBox provides an option to restrict the number of decimal values, by using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#decimals", target: "_blank" }, " decimals"),
                " property. To restrict the number of decimal values on typing, use the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#decimals", target: "_blank" }, " decimals"),
                " and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#validatedecimalontype", target: "_blank" }, "validateDecimalOnType"),
                " properties."),
            React.createElement("p", null,
                "More information on the restrict decimals configuration can be found in the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#precision-of-numbers", target: "_blank" }, "documentation section"),
                "."))));
};
exports.default = Restrict;
