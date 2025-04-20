"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var sample_base_1 = require("../common/sample-base");
require("./orientation.css");
var Orientation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var stepperObj = (0, react_1.useRef)(null);
    var updateOrientation = function (args) {
        stepperObj.current.orientation = args.currentTarget.value;
    };
    var updateLabelPosition = function (args) {
        stepperObj.current.labelPosition = args.currentTarget.value;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "orientation-stepper-section" },
                React.createElement("div", { id: "orientation-options" },
                    React.createElement("div", { className: "orientation-header-wrapper" },
                        React.createElement("p", null, " Orientation "),
                        React.createElement("div", { className: "e-btn-group" },
                            React.createElement("input", { type: "radio", id: "horizontal", name: "orientation", value: "horizontal", onClick: updateOrientation, defaultChecked: true }),
                            React.createElement("label", { className: "e-btn", htmlFor: "horizontal" }, "Horizontal"),
                            React.createElement("input", { type: "radio", id: "vertical", name: "orientation", value: "vertical", onClick: updateOrientation }),
                            React.createElement("label", { className: "e-btn", htmlFor: "vertical" }, "Vertical"))),
                    React.createElement("div", { className: "orientation-header-wrapper" },
                        React.createElement("p", null, " Label Position "),
                        React.createElement("div", { className: "e-btn-group" },
                            React.createElement("input", { type: "radio", id: "start", name: "position", value: "start", onClick: updateLabelPosition }),
                            React.createElement("label", { className: "e-btn", htmlFor: "start" }, "Start"),
                            React.createElement("input", { type: "radio", id: "end", name: "position", value: "end", onClick: updateLabelPosition, defaultChecked: true }),
                            React.createElement("label", { className: "e-btn", htmlFor: "end" }, "End"),
                            React.createElement("input", { type: "radio", id: "top", name: "position", value: "top", onClick: updateLabelPosition }),
                            React.createElement("label", { className: "e-btn", htmlFor: "top" }, "Top"),
                            React.createElement("input", { type: "radio", id: "bottom", name: "position", value: "bottom", onClick: updateLabelPosition }),
                            React.createElement("label", { className: "e-btn", htmlFor: "bottom" }, "Bottom")))),
                React.createElement("div", { className: "orientation-stepper-control" },
                    React.createElement(ej2_react_navigations_1.StepperComponent, { ref: stepperObj, activeStep: 1, labelPosition: "end" },
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
exports.default = Orientation;
