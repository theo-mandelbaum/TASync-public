"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var iconStepper = (0, react_1.useRef)(null);
    var iconLabelStepper = (0, react_1.useRef)(null);
    var customTextStepper = (0, react_1.useRef)(null);
    var labelStepper = (0, react_1.useRef)(null);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "default-stepper-section" },
                React.createElement("label", null, "Custom Text"),
                React.createElement(ej2_react_navigations_1.StepperComponent, { stepType: 'indicator', ref: customTextStepper, created: function () { customTextStepper.current.activeStep = 2; } },
                    React.createElement(ej2_react_navigations_1.StepsDirective, null,
                        React.createElement(ej2_react_navigations_1.StepDirective, { text: '1' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { text: '2' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { text: '3' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { text: '4' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { text: '5' }))),
                React.createElement("label", null, "Icon Only"),
                React.createElement(ej2_react_navigations_1.StepperComponent, { ref: iconStepper, created: function () { iconStepper.current.activeStep = 2; } },
                    React.createElement(ej2_react_navigations_1.StepsDirective, null,
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-cart' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-user' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-transport' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-payment' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-success' }))),
                React.createElement("label", null, "Icon with Label"),
                React.createElement(ej2_react_navigations_1.StepperComponent, { id: "iconWithLabel", ref: iconLabelStepper, created: function () { iconLabelStepper.current.activeStep = 2; } },
                    React.createElement(ej2_react_navigations_1.StepsDirective, null,
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-cart', label: 'Cart' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-user', label: 'Address' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-transport', label: 'Delivery' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-payment', label: 'Payment', optional: true }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-success', label: 'Ordered' }))),
                React.createElement("label", null, "Label Only"),
                React.createElement(ej2_react_navigations_1.StepperComponent, { ref: labelStepper, created: function () { labelStepper.current.activeStep = 2; } },
                    React.createElement(ej2_react_navigations_1.StepsDirective, null,
                        React.createElement(ej2_react_navigations_1.StepDirective, { label: 'Cart' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { label: 'Address' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { label: 'Delivery' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { label: 'Payment' }),
                        React.createElement(ej2_react_navigations_1.StepDirective, { label: 'Ordered' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases the Stepper component with all of its default combinations.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Stepper is commonly employed to guide users through a multistep process or workflow. This example demonstrates the usage of the ",
                React.createElement("code", null, "steps"),
                " and ",
                React.createElement("code", null, "stepType"),
                " properties in the Stepper, showcasing various default combinations."))));
};
exports.default = Default;
