"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 45px;\n}\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n.sliderwrap label {\n    padding-bottom: 50px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n}\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n.property-custom td {\n    padding: 5px;\n}\n.property-custom .property-panel-content {\n    height: 320px;\n}\nbody.fluent2-highcontrast .sliderwrap .e-tick-before.e-scale.e-h-scale .e-tick,\nbody.fluent2 .sliderwrap .e-tick-before.e-scale.e-h-scale .e-tick,\nbody.fluent2-dark .sliderwrap .e-tick-before.e-scale.e-h-scale .e-tick {\n    top: -5px;\n}\n";
var Limits = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)({
        enabled: true,
        minStart: 10,
        minEnd: 40,
        startHandleFixed: false,
    }), slider = _a[0], SetSlider = _a[1];
    var _b = (0, react_1.useState)({
        enabled: true,
        minStart: 10,
        minEnd: 40,
        maxStart: 60,
        maxEnd: 90,
        startHandleFixed: false,
        endHandleFixed: false,
    }), rangeSlider = _b[0], SetRangeSlider = _b[1];
    // Instance of the control
    var minRangeObj = (0, react_1.useRef)(null);
    var rangeObj = (0, react_1.useRef)(null);
    var minEndObj = (0, react_1.useRef)(null);
    // Initialize ticks with placement, largestep, smallstep
    var ticks = { placement: 'After', largeStep: 20, smallStep: 5, showSmallTicks: true };
    var tooltip = { isVisible: true, placement: 'Before' };
    var minStart = function (args) {
        SetSlider(__assign(__assign({}, slider), { minStart: args.value }));
        SetRangeSlider(__assign(__assign({}, rangeSlider), { minStart: args.value }));
    };
    var minEnd = function (args) {
        SetSlider(__assign(__assign({}, slider), { minEnd: args.value }));
        SetRangeSlider(__assign(__assign({}, rangeSlider), { minEnd: args.value }));
    };
    var maxStart = function (args) {
        SetRangeSlider(__assign(__assign({}, rangeSlider), { maxStart: args.value }));
    };
    var maxEnd = function (args) {
        SetRangeSlider(__assign(__assign({}, rangeSlider), { maxEnd: args.value }));
    };
    var fixOneChange = function (args) {
        SetSlider(__assign(__assign({}, slider), { startHandleFixed: args.checked }));
        SetRangeSlider(__assign(__assign({}, rangeSlider), { startHandleFixed: args.checked }));
    };
    var fixTwoChange = function (args) {
        SetRangeSlider(__assign(__assign({}, rangeSlider), { endHandleFixed: args.checked }));
    };
    var refreshTooltip = function (e) {
        if (minRangeObj.current && rangeObj.current) {
            minRangeObj.current.refreshTooltip(minRangeObj.tooltipTarget);
            rangeObj.current.refreshTooltip(rangeObj.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(_this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("style", null, slidercss),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "MinRange Slider With Limits"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'minrange', type: "MinRange", value: 25, min: 0, max: 100, ticks: ticks, limits: slider, tooltip: tooltip, ref: minRangeObj })),
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement("label", null, "Range Slider With Limits"),
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'range', value: [25, 75], min: 0, max: 100, type: 'Range', limits: rangeSlider, ticks: ticks, tooltip: tooltip, ref: rangeObj })))),
            React.createElement("div", { id: "#slider_event", className: 'col-lg-4 property-section property-custom' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "minStartLabel", className: "userselect" }, "MinStart")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 10, min: 0, max: 100, change: minStart.bind(_this), "aria-labelledby": "minStartLabel" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "minEndLabel", className: "userselect" }, "MinEnd")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 40, min: 0, max: 100, change: minEnd.bind(_this), ref: minEndObj, "aria-labelledby": "minEndLabel" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "maxStartLabel", className: "userselect" }, "MaxStart")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 60, min: 0, max: 100, change: maxStart.bind(_this), "aria-labelledby": "maxStartLabel" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "maxEndLabel", className: "userselect" }, "MaxEnd")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 90, min: 0, max: 100, change: maxEnd.bind(_this), "aria-labelledby": "maxEndLabel" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "lockFirstHandleLabel", className: "userselect" }, "Lock First Handle")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: fixOneChange.bind(_this), "aria-labelledby": "lockFirstHandleLabel" }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "lockSecondHandleLabel", className: "userselect" }, "Lock Second Handle")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: fixTwoChange.bind(_this), "aria-labelledby": "lockSecondHandleLabel" }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of Slider component with limits. Drag the thumb over the bar for selecting the values between assigned limit values. Change the values in the property pane to set different limit values.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The limits are used to limit between certain range. When the limits are assigned, draggable limited area will be in the dark shadow color of the current theme. The limits APIs are explained below."),
                React.createElement("p", null,
                    React.createElement("table", null,
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#minstart" }, "minStart")),
                            React.createElement("td", null, "- \u00A0\u00A0Used to set minimum limit value for first handle.")),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#minend" }, "minEnd")),
                            React.createElement("td", null, "- \u00A0\u00A0Used to set maximum limit value for first handle.")),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#maxstart" }, "maxStart")),
                            React.createElement("td", null, "- \u00A0\u00A0Used to set minimum limit value for second handle.")),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#minstart" }, "maxEnd")),
                            React.createElement("td", null, "- \u00A0\u00A0Used to set maximum limit value for first handle.")),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#starthandlefixed" }, "startHandleFixed")),
                            React.createElement("td", null, "- \u00A0\u00A0Used to lock the first handle in the current position.")),
                        React.createElement("tr", null,
                            React.createElement("td", null,
                                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/limitData/#endhandlefixed" }, "endHandleFixed")),
                            React.createElement("td", null, "- \u00A0\u00A0Used to lock the second handle in the current position.")))),
                React.createElement("p", null, " In this demo, Limits with MinRange and range Slider is demonstrated."),
                React.createElement("ul", null,
                    React.createElement("li", null, "MinRange Slider \u2013 In this sample, the minimum and maximum limit of the slider is set to 10 and 40 respectively."),
                    React.createElement("li", null, "Range Slider \u2013 In this sample, the minimum and maximum limit of the first handle is set to 10 and 40 respectively and the minimum and maximum limit of the second handle is set to 60 and 90 respectively.")),
                React.createElement("p", null,
                    "For more information, refer to the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/range-slider/limits/" }, "limits"),
                    " section from the documentation.")))));
};
exports.default = Limits;
