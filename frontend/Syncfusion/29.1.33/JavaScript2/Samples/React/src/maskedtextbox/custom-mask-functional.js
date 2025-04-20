"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
require("./sample.css");
var CustomMask = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "content-wrapper sample-mask" },
                React.createElement("div", { className: "control-label" }, "Time (ex: 10:00 PM, 10:00 AM)"),
                React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '00:00 >PM', customCharacters: { P: 'P,A,p,a', M: 'M,m' }, floatLabelType: 'Never' }),
                React.createElement("div", { className: "control-label" }, "IP Address (ex: 212.212.111.222)"),
                React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: '[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9].[0-2][0-9][0-9]', floatLabelType: 'Never' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates that the custom mask functionalities of MaskedTextBox component. Enter time value in meridiem format, and enter IP value in numeric format.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The custom mask is achieved by the following ways:"),
            React.createElement("p", null,
                React.createElement("b", null, "Custom characters:")),
            React.createElement("p", null,
                "You can form the ",
                React.createElement("b", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#mask", target: "_blank" }, "mask")),
                " with any non-mask elements (literals), and you can configure the behavior of that non-mask element as mask element through the ",
                React.createElement("b", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#customcharacters", target: "_blank" }, "customCharacters")),
                " property."),
            React.createElement("p", null, "In this demo, the \u201CTime\u201D mask '99 : 99 >PM' contains the literals P and M, where it is configured to allow the inputs as 'P', 'A', 'p', 'a', and 'M', 'm'."),
            React.createElement("p", null,
                React.createElement("b", null, "Regular expression:")),
            React.createElement("p", null, "Alternatively, you can use the regular expressions as mask element to validate the input of the particular input place."),
            React.createElement("p", null, "Here, in the \u201CIP Address\u201D example, each character is masked by an regular expression to allow a particular range of values."),
            React.createElement("p", null,
                "For more information, you can refer to the ",
                React.createElement("b", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/maskedtextbox/mask-configuration/#custom-characters", target: "_blank" }, "Custom characters")),
                " and",
                React.createElement("b", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/maskedtextbox/mask-configuration/#regular-expression", target: "_blank" }, "Regular expression")),
                " sections from the documentation."))));
};
exports.default = CustomMask;
