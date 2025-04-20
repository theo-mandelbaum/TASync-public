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
exports.Orientation = void 0;
var React = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./orientation.css");
var Orientation = /** @class */ (function (_super) {
    __extends(Orientation, _super);
    function Orientation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.updateOrientation = function (args) {
            _this.stepperObj.orientation = args.currentTarget.value;
        };
        _this.updateLabelPosition = function (args) {
            _this.stepperObj.labelPosition = args.currentTarget.value;
        };
        return _this;
    }
    Orientation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "orientation-stepper-section" },
                    React.createElement("div", { id: "orientation-options" },
                        React.createElement("div", { className: "orientation-header-wrapper" },
                            React.createElement("p", null, " Orientation "),
                            React.createElement("div", { className: "e-btn-group" },
                                React.createElement("input", { type: "radio", id: "horizontal", name: "orientation", value: "horizontal", onClick: this.updateOrientation.bind(this), defaultChecked: true }),
                                React.createElement("label", { className: "e-btn", htmlFor: "horizontal" }, "Horizontal"),
                                React.createElement("input", { type: "radio", id: "vertical", name: "orientation", value: "vertical", onClick: this.updateOrientation.bind(this) }),
                                React.createElement("label", { className: "e-btn", htmlFor: "vertical" }, "Vertical"))),
                        React.createElement("div", { className: "orientation-header-wrapper" },
                            React.createElement("p", null, " Label Position "),
                            React.createElement("div", { className: "e-btn-group" },
                                React.createElement("input", { type: "radio", id: "start", name: "position", value: "start", onClick: this.updateLabelPosition.bind(this) }),
                                React.createElement("label", { className: "e-btn", htmlFor: "start" }, "Start"),
                                React.createElement("input", { type: "radio", id: "end", name: "position", value: "end", onClick: this.updateLabelPosition.bind(this), defaultChecked: true }),
                                React.createElement("label", { className: "e-btn", htmlFor: "end" }, "End"),
                                React.createElement("input", { type: "radio", id: "top", name: "position", value: "top", onClick: this.updateLabelPosition.bind(this) }),
                                React.createElement("label", { className: "e-btn", htmlFor: "top" }, "Top"),
                                React.createElement("input", { type: "radio", id: "bottom", name: "position", value: "bottom", onClick: this.updateLabelPosition.bind(this) }),
                                React.createElement("label", { className: "e-btn", htmlFor: "bottom" }, "Bottom")))),
                    React.createElement("div", { className: "orientation-stepper-control" },
                        React.createElement(ej2_react_navigations_1.StepperComponent, { ref: function (stepper) { _this.stepperObj = stepper; }, activeStep: 1, labelPosition: "end" },
                            React.createElement(ej2_react_navigations_1.StepsDirective, null,
                                React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-ordered', label: 'Orders' }),
                                React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-review', label: 'Review' }),
                                React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-package', label: 'Packing' }),
                                React.createElement(ej2_react_navigations_1.StepDirective, { iconCss: 'sf-icon-delivery', label: 'Shipping' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample showcases the orientation option in the Stepper component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This example demonstrates how to switch between different orientations and change the label position within the Stepper (",
                    React.createElement("code", null, "start"),
                    ", ",
                    React.createElement("code", null, "end"),
                    ", ",
                    React.createElement("code", null, "top"),
                    ", ",
                    React.createElement("code", null, "bottom"),
                    "). The Stepper control can be oriented ",
                    React.createElement("code", null, "horizontally"),
                    " or ",
                    React.createElement("code", null, "vertically"),
                    " using the ",
                    React.createElement("code", null, "orientation"),
                    " property."))));
    };
    return Orientation;
}(sample_base_1.SampleBase));
exports.Orientation = Orientation;
