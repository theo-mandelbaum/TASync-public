"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.sliderwrap .label-text {\n    font-weight: 500;\n}\n\n.content-wrapper {\n    width: 80%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 40px;\n}\n\n#slider01 .e-handle,\n#out .e-handle,\n.bootstrap #out .e-handle,\n.bootstrap #slider01 .e-handle,\n.fabric #out .e-handle,\n.fabric #slider01 .e-handle,\n.highcontrast #out .e-handle,\n.highcontrast #slider01 .e-handle {\n    background-color: #ffd939;\n    border-color: #ffd939;\n    z-index: 1;\n}\n\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n\n.sliderwrap label {\n    padding-bottom: 26px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n\n.e-slider-tooltip.e-tooltip-wrap.e-popup.e-slider-tooltip .e-tip-content,\n.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-range .e-tip-content.e-material-tooltip-show {\n    color: #333;\n}\n\n.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-inner{\n    color: #ffd939;\n}\n\n.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-outer {\n    border-top-color: #ffd939;\n}\n\n.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-outer {\n    border-bottom-color: #ffd939;\n}\n\n.e-slider-container .e-slider#slider01 .e-range,\n.e-slider-container .e-slider#out .e-range {\n    background-color: #0375be;\n    z-index: unset;\n}\n.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-default.e-slider-horizontal-after,\n.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup.e-material-default.e-slider-horizontal-before,\n.e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup {\n    background-color: #ffd939;\n    border-color: #ffd939;\n}\n\n.bootstrap .e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-outer {\n    border-top-color: #ffd939;\n}\n\n.bootstrap .e-tooltip-cutomization.e-slider-tooltip.e-tooltip-wrap.e-popup .e-arrow-tip-inner {\n    color: #ffd939;\n}\n\nbody.fluent2-highcontrast .sliderwrap .e-scale,\nbody.fluent2 .sliderwrap .e-scale,\nbody.fluent2-dark .sliderwrap .e-scale {\n    top: 2px;\n}\n\nbody.tailwind3 .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3-dark .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick\nbody.tailwind3-dark.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick {\n    top: 0px;\n}\n";
var TooltipCustomization = function () {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    // Set slider minimum and maximum values
    // new Date(Year, Month, day, hours, minutes, seconds, millseconds)
    var min = new Date(2013, 6, 13, 11).getTime();
    var sliderMin = new Date(2013, 6, 13, 11).getTime();
    var sliderMax = new Date(2013, 6, 13, 23).getTime();
    var max = new Date(2013, 6, 13, 23).getTime();
    // Initialize ticks with placement, largestep, smallste
    var value = [new Date(2013, 6, 13, 12).getTime(), new Date(2013, 6, 13, 18).getTime()];
    var ticks = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    // Initialize tooltip with placement
    var tooltip = {
        placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
    };
    var sliderTooltip = {
        placement: 'Before', isVisible: true, cssClass: 'e-tooltip-cutomization'
    };
    var timeObj = (0, react_1.useRef)(null);
    var sliderObj = (0, react_1.useRef)(null);
    var tooltipChangeHandler = function (args) {
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        var custom = { hour: '2-digit', minute: '2-digit' };
        // Splitting the range values from the tooltip using space into an array.
        if (args.text.indexOf('-') !== -1) {
            var totalMiliSeconds = args.text.split(' ');
            // First part is the first handle value
            var firstPart = totalMiliSeconds[0];
            // Second part is the second handle value
            var secondPart = totalMiliSeconds[2];
            firstPart = new Date(Number(firstPart)).toLocaleTimeString('en-us', custom);
            secondPart = new Date(Number(secondPart)).toLocaleTimeString('en-us', custom);
            // Assigning our custom text to the tooltip value.
            args.text = firstPart + ' - ' + secondPart;
        }
        else {
            args.text = 'Until ' + new Date(Number(args.text)).toLocaleTimeString('en-us', custom);
        }
    };
    var sliderTicks = {
        placement: 'After',
        // 3 * 3600000 milliseconds = 3 Hour
        largeStep: 3 * 3600000,
        smallStep: 3600000, showSmallTicks: true
    };
    var onRenderingTicks = function (args) {
        var totalMiliSeconds = Number(args.value);
        /**
         * toLocaleTimeString is predefined javascript date function, which is used to
         * customize the date in different format
         */
        var custom = { hour: '2-digit', minute: '2-digit' };
        // Assigning our custom text to the tick value.
        args.text = new Date(totalMiliSeconds).toLocaleTimeString('en-us', custom);
    };
    // Handler used to reposition the tooltip on page scroll
    var onScroll = function () {
        if (sliderObj.current && timeObj.current) {
            timeObj.current.refreshTooltip(timeObj.tooltipTarget);
            sliderObj.current.refreshTooltip(sliderObj.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', onScroll.bind(_this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, slidercss),
        React.createElement("div", { className: 'col-lg-12-control-section' },
            React.createElement("div", { className: "content-wrapper" },
                React.createElement("div", { className: "sliderwrap" },
                    React.createElement("label", { className: "labeltext userselect" },
                        React.createElement("span", { className: "label-text" }, "Background color")),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider01", value: value, min: min, max: max, step: 3600000 / 6, ticks: ticks, type: "Range", tooltip: tooltip, tooltipChange: tooltipChangeHandler.bind(_this), ref: timeObj, renderingTicks: onRenderingTicks.bind(_this) })),
                React.createElement("div", { className: "sliderwrap" },
                    React.createElement("label", { className: "labeltext userselect" },
                        React.createElement("span", { className: "label-text" }, "Color and text")),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { id: "out", value: new Date(2013, 6, 13, 17).getTime(), min: sliderMin, max: sliderMax, step: 3600000 / 6, ticks: sliderTicks, type: "MinRange", tooltip: sliderTooltip, tooltipChange: tooltipChangeHandler.bind(_this), ref: sliderObj, renderingTicks: onRenderingTicks.bind(_this) })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of Slider's Tooltip. Drag the thumb over the bar for selecting the values between min and max.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this demo, we have demonstrated the following customization of Tooltip using ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#cssclass" }, "CSS"),
                "."),
            React.createElement("ul", null,
                React.createElement("li", null, "Background color - In this sample, Tooltip has been customized to custom color."),
                React.createElement("li", null, "Color and text - In this sample, Tooltip and its content has been customized to custom color.")))));
};
exports.default = TooltipCustomization;
