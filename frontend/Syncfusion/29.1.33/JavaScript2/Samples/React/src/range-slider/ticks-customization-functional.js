"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./ticks-customization.css");
var TicksCustomization = function () {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ticks = { placement: 'Before', largeStep: 20 };
    var ticksData = { placement: 'Both', largeStep: 20, smallStep: 5 };
    var li;
    var renderingTicks = function (args) {
        if (args.tickElement.classList.contains('e-large')) {
            args.tickElement.classList.add('e-custom');
        }
    };
    var onrenderedSliderTicks = function (args) {
        li = args.ticksWrapper.getElementsByClassName('e-large');
        var remarks = ['Very Poor', 'Poor', 'Average', 'Good', 'Very Good', 'Excellent'];
        for (var i = 0; i < li.length; ++i) {
            li[i].querySelectorAll('.e-tick-both')[1].innerText = remarks[i];
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "slider-content-wrapper" },
                React.createElement("div", { className: "slider_container" },
                    React.createElement("div", { className: "slider_container", id: "slider_wrapper" },
                        React.createElement("div", { className: "slider_labelText userselect" }, "Dynamic ticks color"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "ticks_slider", value: 20, min: 0, max: 100, step: 5, ticks: ticks, type: "MinRange", renderingTicks: renderingTicks.bind(_this) })),
                    React.createElement("div", { className: "slider_container" },
                        React.createElement("div", { className: "slider_labelText userselect" }, "Ticks with legends"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider", value: 20, min: 0, max: 100, type: "MinRange", ticks: ticksData, renderedTicks: onrenderedSliderTicks.bind(_this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of Slider's Tick. Drag the thumb over the bar for selecting the values between min and max.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, we have demonstrated the following customization of Ticks using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#cssclass" }, "CSS"),
                "."),
            React.createElement("ul", null,
                React.createElement("li", null, "Dynamic ticks color - In this sample, Ticks has been customized to different colors by adding icon at each Ticks."),
                React.createElement("li", null, "Ticks with legends - In this sample, Track has been formatted to display custom text using renderingTicks and renderedTicks events. ")))));
};
exports.default = TicksCustomization;
