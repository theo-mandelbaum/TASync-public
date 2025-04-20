"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var slidercss = "\n.slider-content-wrapper {\n    width: 40%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.slider-userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n\n.labelText {\n    text-align: -webkit-left;\n    font-weight: 500;\n    font-size: 13px;\n    padding-bottom: 10px;\n}\n\n.slider_container {\n    margin-top: 40px;\n}\n\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n\n#square_slider.e-control.e-slider .e-handle {\n    border-radius: 0%;\n    background-color: #f9920b;\n    border: 0;\n}\n\n#circle_slider.e-control.e-slider .e-handle {\n    background-color: #f9920b;\n    border-radius: 50%;\n    border: 0;\n}\n\n.material.e-bigger .e-slider-container.e-horizontal #image_slider.e-slider .e-handle,\n.material .e-slider-container.e-bigger.e-horizontal #image_slider.e-slider .e-handle {\n    top: calc(50% - 7px);\n}\n\n.material.e-bigger .e-slider-container.e-horizontal #image_slider.e-slider .e-handle.e-handle-active,\n.material .e-slider-container.e-bigger.e-horizontal #image_slider.e-slider .e-handle.e-handle-active {\n    top: calc(50% - 6px);\n    transform: scale(1.3) !important;\n}\n\n.e-bigger .e-slider-container.e-horizontal #image_slider.e-slider .e-handle,\n.e-slider-container.e-bigger.e-horizontal #image_slider.e-slider .e-handle {\n    top: calc(50% - 9px);\n}\n\n#image_slider.e-control.e-slider .e-handle {\n    height: 25px;\n    width: 24px;\n    background-size: 24px;\n    box-shadow: none;\n    margin-left: -12px;\n}\n\n.material #image_slider.e-control.e-slider .e-handle {\n    height: 20px;\n    width: 20px;\n    background-size: 20px;\n\n}\n\n.material #image_slider.e-control.e-slider .e-handle {\n    background-image: url('./src/range-slider/images/thumb-mat.png');\n    background-repeat: no-repeat;\n    background-color: transparent;\n    border: 0;\n}\n\n#image_slider.e-control.e-slider .e-handle {\n    background-image: url('./src/range-slider/images/thumb.png');\n    background-repeat: no-repeat;\n    background-color: transparent;\n    border: 0;\n}\n\n#square_slider .e-tab-handle::after,\n#circle_slider .e-tab-handle::after {\n    background-color: #f9920b;\n}\n\n#image_slider .e-tab-handle::after {\n    background-color: transparent;\n}\n\n#oval_slider.e-control.e-slider .e-handle {\n    height: 25px;\n    width: 8px;\n    top: 3px;\n    border-radius: 15px;\n    background-color: #f9920b;\n    border: 1px solid #f9920b;\n}\n.tailwind .e-control-wrapper.e-slider-container.e-horizontal #image_slider .e-handle {\n    margin-left: -12px;\n    top: calc(50% - 10px);\n    box-shadow: none;\n}\n    \nbody.tailwind3 .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3-dark .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick\nbody.tailwind3-dark.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick {\n    top: 0px;\n}\n";
var Thumb = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var ticks = {
        placement: 'After'
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("style", null, slidercss),
            React.createElement("div", { className: "slider-content-wrapper" },
                React.createElement("div", { className: "slider_container" },
                    React.createElement("div", { className: "labelText slider-userselect" }, "Square"),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "square_slider", value: 30, min: 0, max: 100 })),
                React.createElement("div", { className: "slider_container" },
                    React.createElement("div", { className: "labelText slider-userselect" }, "Circle"),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "circle_slider", value: 30, min: 0, max: 100 })),
                React.createElement("div", { className: "slider_container" },
                    React.createElement("div", { className: "labelText slider-userselect" }, "Oval"),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "oval_slider", value: 30, min: 0, max: 100 })),
                React.createElement("div", { className: "slider_container" },
                    React.createElement("div", { className: "labelText slider-userselect" }, "Custom image"),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "image_slider", value: 30, min: 0, max: 100, ticks: ticks })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of Slider's Thumb. Drag the thumb over the bar for selecting the values between min and max.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, we have demonstrated the following customization of Thumb by changing ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#cssclass" }, "CSS"),
                "."),
            React.createElement("ul", null,
                React.createElement("li", null, "Square - In this sample, Thumb has been customized to Square shape."),
                React.createElement("li", null, "Circle - In this sample, Thumb has been customized to Circle shape."),
                React.createElement("li", null, "Oval - In this sample, Thumb has been customized to Oval shape."),
                React.createElement("li", null, "Custom image - In this sample, Thumb has been replaced with custom image.")))));
};
exports.default = Thumb;
