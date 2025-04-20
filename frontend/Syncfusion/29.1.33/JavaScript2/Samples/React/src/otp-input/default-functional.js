"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "otp-container" },
                React.createElement("label", null, " Default (Number) OTP Input "),
                React.createElement(ej2_react_inputs_1.OtpInputComponent, { value: "1234", type: 'number' })),
            React.createElement("div", { className: "otp-container" },
                React.createElement("label", null, " Text OTP Input "),
                React.createElement(ej2_react_inputs_1.OtpInputComponent, { value: "e3c7", type: 'text' })),
            React.createElement("div", { className: "otp-container" },
                React.createElement("label", null, " Password OTP Input "),
                React.createElement(ej2_react_inputs_1.OtpInputComponent, { value: "1234", type: 'password' }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the OTP Input component. It allows users to enter OTP (One-Time Password) during MFA processes such as login, account verifications, booking activities, and more.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This example showcases the usage of the ",
                React.createElement("code", null, "type"),
                " and ",
                React.createElement("code", null, "value"),
                " properties in the OTP Input component. The available input types are ",
                React.createElement("code", null, "number"),
                ", ",
                React.createElement("code", null, "text"),
                " and ",
                React.createElement("code", null, "password"),
                ". Once the user enters the OTP according to the specified ",
                React.createElement("code", null, "type"),
                ", the ",
                React.createElement("code", null, "value"),
                " property can be used to access the entered OTP."))));
};
exports.default = Default;
