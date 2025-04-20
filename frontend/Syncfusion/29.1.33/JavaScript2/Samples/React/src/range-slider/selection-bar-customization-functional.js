"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./bar.css");
var slidercss = "\n#dynamic_color_slider.e-green.e-control.e-slider .e-handle {\n    background-color: green;\n}\n\n#dynamic_color_slider.e-green.e-control.e-slider .e-range {\n    background-color: green;\n}\n\n#dynamic_color_slider.e-blue.e-control.e-slider .e-handle {\n    background-color: royalblue;\n}\n\n#dynamic_color_slider.e-blue.e-control.e-slider .e-range {\n    background-color: royalblue;\n}\n\n#dynamic_color_slider.e-orange.e-control.e-slider .e-handle {\n    background-color: darkorange;\n}\n\n#dynamic_color_slider.e-orange.e-control.e-slider .e-range {\n    background-color: darkorange;\n}\n\n#dynamic_color_slider.e-red.e-control.e-slider .e-handle {\n    background-color: red;\n}\n\n#dynamic_color_slider.e-red.e-control.e-slider .e-range {\n    background-color: red;\n}";
var Bar = function () {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("e-green"), color = _a[0], setColor = _a[1];
    var onChange = function (args) {
        if (args.value > 0 && args.value <= 25) {
            // Change handle and range bar color to green when
            setColor("e-green");
        }
        else if (args.value > 25 && args.value <= 50) {
            // Change handle and range bar color to royal blue
            setColor("e-blue");
        }
        else if (args.value > 50 && args.value <= 75) {
            // Change handle and range bar color to dark orange
            setColor("e-orange");
        }
        else if (args.value > 75 && args.value <= 100) {
            // Change handle and range bar color to red
            setColor("e-red");
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, slidercss),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { className: "slider-content-wrapper" },
                    React.createElement("div", { className: "slider_container" },
                        React.createElement("div", { className: "slider-labeltext slider_userselect" }, "Height"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "height_slider", value: 30, min: 0, max: 100 })),
                    React.createElement("div", { className: "slider_container" },
                        React.createElement("div", { className: "slider-labeltext slider_userselect" }, "Gradient color"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "gradient_slider", value: 50, min: 0, max: 100, type: "MinRange" })),
                    React.createElement("div", { className: "slider_container" },
                        React.createElement("div", { className: "slider-labeltext slider_userselect" }, "Dynamic thumb and selection bar color"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "dynamic_color_slider", className: color, value: 20, min: 0, max: 100, type: "MinRange", change: onChange.bind(_this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of Slider's selection bar. Drag the thumb over the bar for selecting the values between min and max.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, customization of track using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#cssclass" }, "CSS"),
                " is demonstrated."),
            React.createElement("ul", null,
                React.createElement("li", null, "Height - In this sample, track has been customized to custom height. Here, thumb has to be adjusted based on the track height."),
                React.createElement("li", null, "Gradient color - In this sample, track has been customized with gradient color. "),
                React.createElement("li", null, "Dynamic thumb and selection bar color - In this sample, track and thumb has been customized to different colors for different intervals by using created and change event.")))));
};
exports.default = Bar;
