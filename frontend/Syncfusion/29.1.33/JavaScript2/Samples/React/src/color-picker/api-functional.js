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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./api.css");
var Api = function () {
    (0, react_1.useEffect)(function () {
        hexInput.current.value = state.colorValue;
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)({
        colorValue: "#0db1e7",
        mode: "Picker",
        disabled: false,
        showButtons: true,
        modeSwitcher: true,
    }), state = _a[0], setState = _a[1];
    var hexInput = (0, react_1.useRef)(null);
    var type = [{ mode: 'Picker' }, { mode: 'Palette' }];
    var ddlFields = { text: 'mode', value: 'mode' };
    var onDdlChange = function (args) {
        setState(__assign(__assign({}, state), { mode: args.value }));
    };
    var onDisableChange = function (args) {
        setState(__assign(__assign({}, state), { disabled: args.checked }));
    };
    var onButtonChange = function (args) {
        setState(__assign(__assign({}, state), { showButtons: args.checked }));
    };
    var onModeChange = function (args) {
        setState(__assign(__assign({}, state), { modeSwitcher: args.checked }));
    };
    var changeValue = function (e) {
        var val = e.target.value;
        // Sets to color picker default color value if user types the invalid hex code.
        setState(__assign(__assign({}, state), { colorValue: val && val.length > 2 ? (val[0] !== '#' ? "#".concat(val) : val) : '#008000' }));
    };
    var onChange = function (args) {
        hexInput.current.value = args.currentValue.hex;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { id: 'api-control', className: 'col-lg-8' },
                React.createElement("h4", null, "Choose a color"),
                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: 'color-picker', mode: state.mode, disabled: state.disabled, showButtons: state.showButtons, value: state.colorValue, modeSwitcher: state.modeSwitcher, change: onChange })),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Value")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement("input", { id: "hex-input", "aria-label": "Value", ref: hexInput, type: "text", className: "e-input", maxLength: 9, onInput: changeValue.bind(hexInput) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Mode")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: type, fields: ddlFields, value: 'Picker', change: onDdlChange, popupHeight: "220px" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '13px' } },
                                    React.createElement("div", null, "Disable")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '13px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "disabled", "aria-label": "Disable", checked: false, change: onDisableChange }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '15px' } },
                                    React.createElement("div", null, "Show Buttons")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '15px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "button", "aria-label": "Show Buttons", checked: true, change: onButtonChange }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '15px', paddingBottom: '10px' } },
                                    React.createElement("div", null, "Mode Switcher")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '15px', paddingBottom: '10px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: "mode-switch", "aria-label": "Mode Switcher", checked: true, change: onModeChange })))))))),
        React.createElement("div", { id: 'action-description' },
            React.createElement("p", null, "This sample demonstrates customization of the ColorPicker component by using its properties from the property pane. Select any combination of properties from the property pane to customize the ColorPicker component.")),
        React.createElement("div", { id: 'description' },
            React.createElement("p", null, "The ColorPicker is a user interface to select and adjust color values. This supports various color specifications like RGB (Red Green Blue), HSV (Hue Saturation Value), and Hex codes."),
            React.createElement("p", null, "In this sample, ColorPicker is rendered with default configuration."),
            React.createElement("p", null, "This sample can be customized further with the combination of ColorPicker properties from the property pane. For example,"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    "Control (apply/cancel) buttons can be enabled or disabled using",
                    React.createElement("i", null, "Show Buttons"),
                    " checkbox from the property pane."),
                React.createElement("li", null,
                    "You can select the color by entering the color value in the property pane",
                    React.createElement("i", null, "Value"),
                    " textbox."),
                React.createElement("li", null,
                    "You can switch to 'Picker' and 'Palette' modes by clicking and selecting the mode from",
                    React.createElement("i", null, "Select Mode"),
                    " dropdownlist."),
                React.createElement("li", null,
                    "you can enable or disable the ColorPicker using",
                    React.createElement("i", null, "Disabled"),
                    " checkbox from property pane."),
                React.createElement("li", null,
                    "you can enable or disable the mode switcher using",
                    React.createElement("i", null, "Mode Switcher"),
                    " checkbox from property pane.")),
            React.createElement("p", null,
                "More information about ColorPicker can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/color-picker/" }, "documentation section"),
                "."))));
};
exports.default = Api;
