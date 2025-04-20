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
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "default-stepper-section" },
                    React.createElement("label", null, "Custom Text"),
                    React.createElement(ej2_react_navigations_1.StepperComponent, { stepType: 'indicator', ref: function (stepper) { _this.customTextStepper = stepper; }, created: function () { _this.customTextStepper.activeStep = 2; } },
                        React.createElement(ej2_react_navigations_1.StepsDirective, null,
                            React.createElement(ej2_react_navigations_1.StepDirective, { text: '1' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { text: '2' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { text: '3' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { text: '4' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { text: '5' }))),
                    React.createElement("label", null, "Icon Only"),
                    React.createElement(ej2_react_navigations_1.StepperComponent, { ref: function (stepper) { _this.iconStepper = stepper; }, created: function () { _this.iconStepper.activeStep = 2; } },
                        React.createElement(ej2_react_navigations_1.StepsDirective, null,
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-cart' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-user' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-transport' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-payment' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-success' }))),
                    React.createElement("label", null, "Icon with Label"),
                    React.createElement(ej2_react_navigations_1.StepperComponent, { id: "iconWithLabel", ref: function (stepper) { _this.iconLabelStepper = stepper; }, created: function () { _this.iconLabelStepper.activeStep = 2; } },
                        React.createElement(ej2_react_navigations_1.StepsDirective, null,
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-cart', label: 'Cart' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-user', label: 'Address' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-transport', label: 'Delivery' }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-payment', label: 'Payment', optional: true }),
                            React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-success', label: 'Ordered' }))),
                    React.createElement("label", null, "Label Only"),
                    React.createElement(ej2_react_navigations_1.StepperComponent, { ref: function (stepper) { _this.labelStepper = stepper; }, created: function () { _this.labelStepper.activeStep = 2; } },
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
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
