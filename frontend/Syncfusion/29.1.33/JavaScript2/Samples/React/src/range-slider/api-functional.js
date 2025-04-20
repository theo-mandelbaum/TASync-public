"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var slidercss = "\n.content-wrapper {\n    width: 52%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    margin-top: 30px;\n}\n\n.sb-mobile-prop-pane #property #desktop-checkbox-row-1,\n.sb-mobile-prop-pane #property #desktop-checkbox-row-2 {\n    display: none;\n\n}\n\n.sb-mobile-prop-pane #property #mobile-checkbox-row-1,\n.sb-mobile-prop-pane #property #mobile-checkbox-row-2,\n.sb-mobile-prop-pane #property #mobile-checkbox-row-3,\n.sb-mobile-prop-pane #property #mobile-checkbox-row-4 {\n    display: table-row;\n\n}\n\n#all-option-table #mobile-checkbox-row-1,\n#all-option-table #mobile-checkbox-row-2,\n#all-option-table #mobile-checkbox-row-3,\n#all-option-table #mobile-checkbox-row-4 {\n    display: none;\n\n}\n\n#all-option-table .property-panel-section .property-panel-content table#property tr {\n    height: 50px;\n}\n\n#all-option-sample .e-slider-container.e-horizontal {\n    margin-top: 160px;\n}\n\n#all-option-sample .e-slider-container.e-vertical {\n    margin-left: 40%;\n}\n\n#all-option-sample.content-wrapper {\n    height: 363px;\n    width: 50%;\n    margin: 0 auto;\n    min-width: 185px;\n}\n\n.sliderwrap {\n    height: 340px;\n}\n\n.e-bigger .content-wrapper {\n    width: 50%;\n}\n\n.sliderwrap label {\n    padding-bottom: 26px;\n    font-size: 13px;\n    font-weight: 500;\n    margin-top: 15px;\n    text-align: left;\n    width: 100%;\n}\n\n.userselect {\n    -webkit-user-select: none;\n    /* Safari 3.1+ */\n    -moz-user-select: none;\n    /* Firefox 2+ */\n    -ms-user-select: none;\n    /* IE 10+ */\n    user-select: none;\n    /* Standard syntax */\n}\n\n.e-bigger .e-sidebar .sb-mobile-right-pane .property-section .e-numerictextbox {\n    display: flex;\n    padding-left: 0;\n    text-align: center;\n}\n\nbody.tailwind3 .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3-dark .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick,\nbody.tailwind3.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick\nbody.tailwind3-dark.e-bigger .sliderwrap .e-tick-after.e-scale.e-h-scale .e-tick {\n    top: 0px;\n}\n";
var APIs = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(0), min = _a[0], setMin = _a[1];
    var _b = (0, react_1.useState)(100), max = _b[0], setMax = _b[1];
    var _c = (0, react_1.useState)(30), value = _c[0], setValue = _c[1];
    var _d = (0, react_1.useState)(1), step = _d[0], setStep = _d[1];
    var _e = (0, react_1.useState)("Horizontal"), orientation = _e[0], setOrientation = _e[1];
    var _f = (0, react_1.useState)(false), readonly = _f[0], setReadonly = _f[1];
    var _g = (0, react_1.useState)(true), enabled = _g[0], setEnabled = _g[1];
    var _h = (0, react_1.useState)(false), button = _h[0], setButton = _h[1];
    /**
 * slider property customization
 */
    var defaultObj = (0, react_1.useRef)(null);
    var tooltip = { placement: 'Before', isVisible: true, showOn: 'Hover' };
    var ticks = { placement: 'Before', largeStep: 20 };
    var onValueChange = function (args) {
        setValue(args.value);
    };
    var onMinChange = function (args) {
        setMin(args.value);
    };
    var onMaxChange = function (args) {
        setMax(args.value);
    };
    var onStepChange = function (args) {
        setStep(args.value);
    };
    var onOrientationChange = function (args) {
        setOrientation(args.checked ? "Vertical" : "Horizontal");
    };
    var onReadonlyChange = function (args) {
        setReadonly(args.checked);
    };
    var onDisableChange = function (args) {
        setEnabled(!args.checked);
    };
    var onButtonChange = function (args) {
        setButton(args.checked);
    };
    var refreshTooltip = function (e) {
        if (defaultObj.current) {
            defaultObj.current.refreshTooltip(defaultObj.tooltipTarget);
        }
    };
    var sliderChange = function (args) {
        setValue(args.value);
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById('right-pane'))) {
        document.getElementById('right-pane').addEventListener('scroll', refreshTooltip.bind(_this));
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, slidercss),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'col-lg-8' },
                React.createElement("div", { className: "content-wrapper", id: "all-option-sample" },
                    React.createElement("div", { className: 'sliderwrap' },
                        React.createElement(ej2_react_inputs_1.SliderComponent, { id: 'slider', value: value, min: min, max: max, orientation: orientation, enabled: enabled, step: step, readonly: readonly, showButtons: button, change: sliderChange.bind(_this), ticks: ticks, tooltip: tooltip, type: 'MinRange', ref: defaultObj })))),
            React.createElement("div", { id: "all-option-table", className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: "100%" } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "valueLabel", className: "userselect" }, "Value")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: value, format: 'n0', change: onValueChange.bind(_this), "aria-labelledby": "valueLabel" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "minLabel", className: "userselect" }, "Min")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 0, format: 'n0', change: onMinChange.bind(_this), "aria-labelledby": "minLabel" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "maxLabel", className: "userselect" }, "Max")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 100, format: 'n0', change: onMaxChange.bind(_this), "aria-labelledby": "maxLabel" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", { id: "stepLabel", className: "userselect" }, "Step")),
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 1, change: onStepChange.bind(_this), "aria-labelledby": "stepLabel" })))),
                            React.createElement("tr", { id: "desktop-checkbox-row-1" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "button", label: "Show Buttons", checked: false, change: onButtonChange.bind(_this) }))),
                                React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "10" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "disabled", label: "Disable", checked: false, change: onDisableChange.bind(_this) })))),
                            React.createElement("tr", { id: "desktop-checkbox-row-2" },
                                React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "readOnly", label: "Read Only", checked: false, change: onReadonlyChange.bind(_this) }))),
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "orientation", label: "Vertical Orientation", checked: false, change: onOrientationChange.bind(_this) })))),
                            React.createElement("tr", { id: "mobile-checkbox-row-1" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Show Buttons")),
                                React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-button", checked: false, change: onButtonChange.bind(_this) })))),
                            React.createElement("tr", { id: "mobile-checkbox-row-2" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Disabled")),
                                React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-disabled", checked: false, change: onDisableChange.bind(_this) })))),
                            React.createElement("tr", { id: "mobile-checkbox-row-3" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Vertical Orientation")),
                                React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-orientation", checked: false, change: onOrientationChange.bind(_this) })))),
                            React.createElement("tr", { id: "mobile-checkbox-row-4" },
                                React.createElement("td", { style: { width: "50%" } },
                                    React.createElement("div", { className: "userselect", style: { paddingLeft: "0" } }, "Readonly")),
                                React.createElement("td", { style: { width: "50%", paddingRight: '10px' } },
                                    React.createElement("div", { style: { paddingLeft: "0", paddingTop: "0" } },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mb-readOnly", checked: false, change: onReadonlyChange.bind(_this) }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of Slider component by using its properties from property pane. Select any combination of properties from property pane to customize Slider component.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this demo, we have rendered default slider with minimal configuration."),
            React.createElement("p", null, "we can further customize this sample with the combination of Slider properties from the property pane. For example,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#min" }, "Min"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#max" }, "Max"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#value" }, "Value"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#step" }, "Steps"),
                    " can be changed from the property pane."),
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#ticks" }, "Ticks"),
                    " can be enabled by selecting the Ticks placement from the property pane."),
                React.createElement("li", null, "Tooltip can be enabled by checking Show Tooltip checkbox from property pane."),
                React.createElement("li", null,
                    "Vertical ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/slider/#orientation" }, "orientation"),
                    " can be enabled by checking Vertical orientation from property pane and so on.")))));
};
exports.default = APIs;
