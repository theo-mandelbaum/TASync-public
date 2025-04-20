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
exports.Default = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
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
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
