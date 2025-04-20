"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpAPI = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var property_pane_1 = require("../common/property-pane");
require("./api.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var OtpAPI = /** @class */ (function (_super) {
    __extends(OtpAPI, _super);
    function OtpAPI(props) {
        var _this = _super.call(this, props) || this;
        _this.modeData = [
            { Mode: 'outlined', Text: 'Outlined' },
            { Mode: 'underlined', Text: 'Underlined' },
            { Mode: 'filled', Text: 'Filled' }
        ];
        _this.fields = { value: 'Mode', text: 'Text' };
        _this.validationData = [
            { Status: '', Text: 'None' },
            { Status: 'e-success', Text: 'Success' },
            { Status: 'e-warning', Text: 'Warning' },
            { Status: 'e-error', Text: 'Error' }
        ];
        _this.validationFields = { value: 'Status', text: 'Text' };
        _this.otpRef = null;
        _this.state = {
            separator: "-",
            placeholder: "X",
            length: 4,
            disabled: false,
            modeValue: "outlined",
            validationValue: "",
            resetDisabled: true,
            verifyDisabled: true
        };
        return _this;
    }
    OtpAPI.prototype.handleOtpChange = function (event) {
        var otpLength = event.value.toString().length;
        this.setState({ verifyDisabled: otpLength !== this.state.length });
        this.setState({ resetDisabled: !otpLength });
    };
    OtpAPI.prototype.handleResetClick = function () {
        if (this.otpRef) {
            this.otpRef.value = "";
        }
        this.setState({ verifyDisabled: true });
        this.setState({ resetDisabled: true });
    };
    ;
    OtpAPI.prototype.handleVerifyClick = function () {
        if (this.otpRef) {
            alert("Entered OTP value is : ".concat(this.otpRef.value));
        }
    };
    ;
    OtpAPI.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "col-lg-8" },
                    React.createElement("div", { className: "api-otp-wrapper" },
                        React.createElement("div", { id: "otp-container" },
                            React.createElement("div", { className: "form-container" },
                                React.createElement("span", { className: "otp-header" }, " Enter verification code "),
                                React.createElement(ej2_react_inputs_1.OtpInputComponent, { ref: function (def) { _this.otpRef = def; }, separator: this.state.separator, placeholder: this.state.placeholder, disabled: this.state.disabled, length: this.state.length, cssClass: this.state.validationValue, stylingMode: this.state.modeValue, input: this.handleOtpChange.bind(this) }),
                                React.createElement("div", { className: "otp-actions" },
                                    React.createElement("button", { className: "e-btn", type: "button", disabled: this.state.resetDisabled, onClick: this.handleResetClick.bind(this) }, " Clear "),
                                    React.createElement("button", { className: "e-btn e-primary", type: "button", disabled: this.state.verifyDisabled, onClick: this.handleVerifyClick.bind(this) }, " Verify ")))))),
                React.createElement("div", { className: "col-lg-4 property-section" },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: "property", title: "Properties" },
                            React.createElement("tbody", null,
                                React.createElement("tr", null,
                                    React.createElement("td", null, " Styling Mode "),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.modeData, fields: this.fields, value: this.state.modeValue, change: function (args) { return _this.setState({ modeValue: args.value }); } }))),
                                React.createElement("tr", null,
                                    React.createElement("td", null, " Validation Status "),
                                    React.createElement("td", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { dataSource: this.validationData, fields: this.validationFields, value: this.state.validationValue, change: function (args) { return _this.setState({ validationValue: args.value }); } }))),
                                React.createElement("tr", null,
                                    React.createElement("td", null, " Placeholder "),
                                    React.createElement("td", null,
                                        " ",
                                        React.createElement("input", { className: 'e-input', type: "text", value: this.state.placeholder, maxLength: this.state.length, onInput: function (args) { return _this.setState({ placeholder: args.target.value }); } }),
                                        " ")),
                                React.createElement("tr", null,
                                    React.createElement("td", null, " Separator "),
                                    React.createElement("td", null,
                                        " ",
                                        React.createElement("input", { className: 'e-input', type: "text", value: this.state.separator, maxLength: 1, onInput: function (args) { return _this.setState({ separator: args.target.value }); } }),
                                        " ")),
                                React.createElement("tr", null,
                                    React.createElement("td", null, " Length "),
                                    React.createElement("td", null,
                                        " ",
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { min: 1, max: 6, format: "0", value: this.state.length, change: function (args) { return _this.setState({ length: args.value | 1 }); } }),
                                        " ")),
                                React.createElement("tr", null,
                                    React.createElement("td", null, " Disabled "),
                                    React.createElement("td", null,
                                        " ",
                                        React.createElement(ej2_react_buttons_1.SwitchComponent, { checked: this.state.disabled, change: function (args) { return _this.setState({ disabled: args.checked }); } }),
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
    return OtpAPI;
}(sample_base_1.SampleBase));
exports.OtpAPI = OtpAPI;
