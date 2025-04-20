"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
require("./api.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("-"), separator = _a[0], setSeparator = _a[1];
    var _b = (0, react_1.useState)("X"), placeholder = _b[0], setPlaceholder = _b[1];
    var _c = (0, react_1.useState)(4), length = _c[0], setLength = _c[1];
    var _d = (0, react_1.useState)(false), disabled = _d[0], setDisabled = _d[1];
    var _e = (0, react_1.useState)(""), validationValue = _e[0], setValidationvalue = _e[1];
    var _f = (0, react_1.useState)("outlined"), modeValue = _f[0], setModevalue = _f[1];
    var _g = (0, react_1.useState)(true), verifyDisabled = _g[0], setVerifyDisabled = _g[1];
    var _h = (0, react_1.useState)(true), resetDisabled = _h[0], setResetDisabled = _h[1];
    var modeData = [
        { Mode: 'outlined', Text: 'Outlined' },
        { Mode: 'underlined', Text: 'Underlined' },
        { Mode: 'filled', Text: 'Filled' }
    ];
    var modeFields = { value: 'Mode', text: 'Text' };
    var validationData = [
        { Status: '', Text: 'None' },
        { Status: 'e-success', Text: 'Success' },
        { Status: 'e-warning', Text: 'Warning' },
        { Status: 'e-error', Text: 'Error' }
    ];
    var validationFields = { value: 'Status', text: 'Text' };
    var otpRef = React.useRef(null);
    function handleOtpChange(event) {
        var otpLength = event.value.toString().length;
        setVerifyDisabled(otpLength !== length);
        setResetDisabled(!otpLength);
    }
    var handleResetClick = function () {
        if (otpRef && otpRef.current) {
            otpRef.current.value = "";
        }
        setVerifyDisabled(true);
        setResetDisabled(true);
    };
    var handleVerifyClick = function () {
        if (otpRef && otpRef.current) {
            alert("Entered OTP value is : ".concat(otpRef.current.value));
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "col-lg-8" },
                React.createElement("div", { className: "api-otp-wrapper" },
                    React.createElement("div", { id: "otp-container" },
                        React.createElement("div", { className: "form-container" },
                            React.createElement("span", { className: "otp-header" }, " Enter verification code "),
                            React.createElement(ej2_react_inputs_1.OtpInputComponent, { ref: otpRef, separator: separator, placeholder: placeholder, disabled: disabled, length: length, cssClass: validationValue, stylingMode: modeValue, input: handleOtpChange }),
                            React.createElement("div", { className: "otp-actions" },
                                React.createElement("button", { className: "e-btn", type: "button", disabled: resetDisabled, onClick: handleResetClick }, " Clear "),
                                React.createElement("button", { className: "e-btn e-primary", type: "button", disabled: verifyDisabled, onClick: handleVerifyClick }, " Verify ")))))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", null, " Styling Mode "),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: modeData, fields: modeFields, value: modeValue, change: function (args) { return setModevalue(args.value); } }, " "))),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Validation Status "),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: validationData, fields: validationFields, value: validationValue, change: function (args) { return setValidationvalue(args.value); } }, " "))),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Placeholder "),
                                React.createElement("td", null,
                                    React.createElement("input", { className: 'e-input', value: placeholder, maxLength: length, onInput: function (args) { return setPlaceholder(args.target.value); } }))),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Separator "),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement("input", { className: 'e-input', value: separator, maxLength: 1, onInput: function (args) { return setSeparator(args.target.value); } }),
                                    " ")),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Length "),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 1, max: 6, value: length, format: '0', change: function (args) { return setLength(args.value || 1); } }, " "),
                                    " ")),
                            React.createElement("tr", null,
                                React.createElement("td", null, " Disabled "),
                                React.createElement("td", null,
                                    " ",
                                    React.createElement(ej2_react_buttons_1.SwitchComponent, { checked: disabled, change: function (args) { return setDisabled(args.checked); } }, " "),
                                    " ")))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the properties available in the OTP Input component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "This sample can be customized further with the combination of OTP Input properties from the property pane. For example,"),
                React.createElement("ul", null,
                    React.createElement("li", null, "The input style can be changed by selecting the Styling Mode dropdownlist from the property pane."),
                    React.createElement("li", null, "The validation state can be changed by selecting the Validation Status dropdownlist from the property pane."),
                    React.createElement("li", null, "The hint placeholder character can be updated by using the Placeholder textbox from the property pane."),
                    React.createElement("li", null, "The separator character (-) can be updated by using the Separator textbox from the property pane."),
                    React.createElement("li", null, "The input field length can be changed by using the Length numerictextbox from the property pane."),
                    React.createElement("li", null, "Enable or Disable the OTP Input by toggling the Disabled switcher button."))))));
};
exports.default = Default;
