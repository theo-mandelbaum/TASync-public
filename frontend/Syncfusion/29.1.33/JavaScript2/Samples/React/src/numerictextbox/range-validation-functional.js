"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var property_pane_1 = require("../common/property-pane");
require("./sample.css");
var Range = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(10), minValue = _a[0], setMinValue = _a[1];
    var _b = (0, react_1.useState)(100), maxValue = _b[0], setMaxValue = _b[1];
    var _c = (0, react_1.useState)(1), stepValue = _c[0], setStepValue = _c[1];
    var _d = (0, react_1.useState)({
        min: 10,
        max: 100,
        step: 1,
    }), numericBoxValues = _d[0], setNumericBoxvalues = _d[1];
    var minvalue = function (args) {
        setMinValue(parseInt(args.currentTarget.value));
    };
    var maxvalue = function (args) {
        setMaxValue(parseInt(args.currentTarget.value));
    };
    var stepvalue = function (args) {
        setStepValue(parseInt(args.currentTarget.value));
    };
    var applyRange = function () {
        setNumericBoxvalues({
            min: minValue,
            max: maxValue,
            step: stepValue
        });
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: ' col-lg-8' },
                React.createElement("div", { className: "content-wrapper format-wrapper sample-numeric" },
                    React.createElement("div", { className: "control-label" }, "Numeric TextBox"),
                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: numericBoxValues.min, max: numericBoxValues.max, step: numericBoxValues.step, value: 15 }))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null, "Min Value ")),
                            React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement("input", { id: "min", value: minValue, type: "number", inputMode: "numeric", className: "form-control", onChange: minvalue.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null, "Max Value ")),
                            React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement("input", { id: "max", value: maxValue, type: "number", inputMode: "numeric", className: "form-control", onChange: maxvalue.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { width: '30%' } },
                                React.createElement("div", null, "Increment Step ")),
                            React.createElement("td", { style: { width: '70%', paddingRight: '10px' } },
                                React.createElement("div", null,
                                    React.createElement("input", { id: "step", value: stepValue, type: "number", inputMode: "numeric", max: 100, min: 0, className: "form-control", onChange: stepvalue.bind(_this) })))),
                        React.createElement("tr", null,
                            React.createElement("td", null),
                            React.createElement("td", null,
                                React.createElement("div", null,
                                    React.createElement("button", { id: "buttonApply", className: "e-btn-small btn btn-primary", style: { marginBottom: '10px' }, onClick: applyRange }, "Apply")))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the range validation functionalities of the Numeric TextBox. Change the min, max and step values and click on apply button to change the property values in Numeric TextBox.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The NumericTextBox has the options to restrict the input value between a specific range using the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#min", target: "_blank" }, "min"),
                ", ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#max", target: "_blank" }, "max"),
                ", and ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/numerictextbox#strictmode", target: "_blank" }, "strictMode"),
                " properties."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "When you enable the ",
                    React.createElement("b", null, "strictMode"),
                    " property, the value will automatically change within a range on passing the out-of-range values."),
                React.createElement("li", null,
                    "When you disable the ",
                    React.createElement("b", null, "strictMode"),
                    " property, the NumericTextBox component allows the out-of-range value with the highlighted textbox to indicate the given value is wrong.")),
            React.createElement("p", null, "In this demo, numeric textbox is restricted between 10 to 100 through the min and max properties. So you can enter only the value between this range."),
            React.createElement("p", null,
                "More information on the range validation configuration can be found in the ",
                React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/numerictextbox/getting-started/#range-validation", target: "_blank" }, "documentation section"),
                "."))));
};
exports.default = Range;
