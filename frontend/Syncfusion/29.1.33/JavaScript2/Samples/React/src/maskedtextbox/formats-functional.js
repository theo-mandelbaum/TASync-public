"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
require("./sample.css");
var Formats = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("(999)-999-9999"), mask = _a[0], setMask = _a[1];
    var _b = (0, react_1.useState)(""), value = _b[0], setValue = _b[1];
    var _c = (0, react_1.useState)("(___)-___-____"), maskValue = _c[0], setMaskValue = _c[1];
    var _d = (0, react_1.useState)("_"), prompt = _d[0], setPrompt = _d[1];
    // Prompt character options
    var promptData = [
        { prompt: '_' },
        { prompt: '#' },
        { prompt: '@' },
        { prompt: '*' },
    ];
    var ddlFields = { text: 'prompt', value: 'prompt' };
    // Bind event on Dropdown List change
    var onDdlChange = function (args) {
        setPrompt(args.value);
    };
    var maskChange = function (args) {
        setValue(args.value);
        setMaskValue(args.maskedValue);
    };
    var sampleKeyUp = function (args) {
        setMask(args.currentTarget.value);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: ' col-lg-8' },
                React.createElement("div", { className: "content-wrapper sample-mask" },
                    React.createElement("div", { className: "control-label" }, "Formats"),
                    React.createElement(ej2_react_inputs_1.MaskedTextBoxComponent, { mask: mask, promptChar: prompt, floatLabelType: 'Never', change: maskChange.bind(_this) }))),
            React.createElement("div", { className: 'col-lg-4 property-section', id: "input-mask" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties", className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Mask")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement("input", { id: "input1", type: "text", className: 'e-input', defaultValue: mask, onKeyUp: sampleKeyUp.bind(_this) })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Prompt Character")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                    React.createElement("div", { style: { maxWidth: '200px' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "ddlelement", dataSource: promptData, fields: ddlFields, value: prompt, change: onDdlChange.bind(_this), popupHeight: "220px" })))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%' } },
                                    React.createElement("div", null, "Value")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px' } },
                                    React.createElement("div", { id: "val1" }, value))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { width: '50%', paddingTop: '5px', paddingBottom: '10px' } },
                                    React.createElement("div", null, "Masked Value")),
                                React.createElement("td", { style: { width: '50%', paddingRight: '0px', paddingTop: '5px', paddingBottom: '10px' } },
                                    React.createElement("div", { id: "val2" }, maskValue)))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates that the different formats can be applied to MaskedTextBox component. You can customize the mask and prompt character values in the property panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Here, the \"Value\" and \"Masked Value\" labels from the properties panel returns the raw value (unmasked value) and masked value of the MaskedTextBox component. You can also get these raw value and masked value anytime through the ",
                React.createElement("b", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#value", target: "_blank" }, "value")),
                " property and ",
                React.createElement("b", null,
                    React.createElement("a", { href: "https://ej2.syncfusion.com/react/documentation/api/maskedtextbox/#getmaskedvalue", target: "_blank" }, "getMaskedValue")),
                " method."))));
};
exports.default = Formats;
