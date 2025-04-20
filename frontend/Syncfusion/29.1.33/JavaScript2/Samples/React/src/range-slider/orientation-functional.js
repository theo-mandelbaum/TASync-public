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
var slidercss = "\n.content-wrapper {\n    width: 80%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    height: 375px;\n    margin-top: 10px;\n    width: 60%;\n    margin: auto;\n}\n\n.e-bigger .content-wrapper {\n    width: 80%;\n}\n\n.sliderwrap .e-lbl {\n    display: block;\n    font-size: 11px;\n    font-weight: 500;\n    margin-top: 15px;\n    margin-left: -10px;\n}\n\n.sliderwrap:last-child .e-lbl {\n    margin-left: -2px;\n}\n\n.slider_table td {\n    text-align: center;\n}\n\n.slider_table {\n    border: 0;\n    width: 100%\n}\n";
var Orientation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)({
        isVisible: true,
        placement: 'Before'
    }), tooltip = _a[0], setTooltip = _a[1];
    var _b = (0, react_1.useState)({
        placement: 'Before',
        largeStep: 20,
        smallStep: 5,
        showSmallTicks: true
    }), ticks = _b[0], setTicks = _b[1];
    //Instance of the components
    var defaultObj = (0, react_1.useRef)(null);
    var rangeObj = (0, react_1.useRef)(null);
    var minRangeObj = (0, react_1.useRef)(null);
    var reverseObj = (0, react_1.useRef)(null);
    // Checkbox change handlers
    var enableDisableTicks = function (args) {
        setTicks(__assign(__assign({}, ticks), { placement: args.checked ? 'Before' : 'None' }));
    };
    var enableDisableTooltip = function (args) {
        setTooltip(__assign(__assign({}, tooltip), { isVisible: args.checked }));
    };
    var refreshTooltip = function (e) {
        if (rangeObj.current && defaultObj.current && minRangeObj.current && reverseObj.current) {
            defaultObj.current.refreshTooltip(defaultObj.tooltipTarget);
            minRangeObj.current.refreshTooltip(minRangeObj.tooltipTarget);
            rangeObj.current.refreshTooltip(rangeObj.tooltipTarget);
            reverseObj.current.refreshTooltip(reverseObj.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(_this));
    }
    return (React.createElement("div", { className: 'control-pane', style: { overflow: 'hidden' } },
        React.createElement("style", null, slidercss),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("table", { className: "slider_table" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { className: "sliderwrap" },
                                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider01", value: 30, orientation: 'Vertical', ticks: ticks, tooltip: tooltip, ref: defaultObj }))),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "sliderwrap" },
                                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider02", value: 30, type: 'MinRange', orientation: 'Vertical', ticks: ticks, tooltip: tooltip, ref: minRangeObj }))),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "sliderwrap" },
                                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider03", value: [30, 70], type: 'Range', orientation: 'Vertical', ticks: ticks, tooltip: tooltip, ref: rangeObj }))),
                                React.createElement("td", null,
                                    React.createElement("div", { className: "sliderwrap" },
                                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: "slider04", value: [30, 70], min: 100, max: 0, type: 'Range', orientation: 'Vertical', ticks: ticks, tooltip: tooltip, ref: reverseObj })))))))),
            React.createElement("div", { id: "slider_event", className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", { className: "userselect" }, "Ticks")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: enableDisableTicks.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '10px' } },
                                    React.createElement("div", { className: "userselect" }, "Tooltip")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: 0, paddingTop: 0 } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: true, change: enableDisableTooltip.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the rendering of Slider component in Vertical orientation. Drag the thumb over the bar for selecting the values between min and max.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Slider component can be rendered in either horizontal or vertical orientation and this can be set through the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#orientation" }, "orientation"),
                " property"),
            React.createElement("p", null, "The Slider component allows the user to select a value or range of values in-between a min and max range, by dragging the thumb over the slider bar in Vertical orientation. There are three types of sliders available in Vertical Orientation:"),
            React.createElement("ul", null,
                React.createElement("li", null, "Default - allows us to select a single value in Vertical Orientation"),
                React.createElement("li", null, "MinRange \u2013 allows us to select a single value, but highlights with a range selection from the min value to the current handle value in Vertical Orientation"),
                React.createElement("li", null, "Range \u2013 allows us to select a range of values with two handles, where the handles was connected with a range selection in Vertical Orientation"),
                React.createElement("li", null, "Reverse \u2013 allows to render the component in reverse order. To utilise this, set the maximum value to the Min property and set the minimum value to the Max property")),
            React.createElement("p", null, "The dragInterval is used to drag both handles using the range bar which is also applicable only to the range slider."),
            React.createElement("p", null, "In this demo we can see the Default, MinRange and Range slider types."),
            React.createElement("p", null,
                "For more information, we can refer the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/range-slider/getting-started/#orientation" }, "Orientation"),
                " section from the documentation."))));
};
exports.default = Orientation;
