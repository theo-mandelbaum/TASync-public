"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpinputCategory = exports.otpinputRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var api_functional_1 = require("./api-functional");
exports.otpinputRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/otp-input/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/otp-input/api', Component: api_functional_1.default })));
exports.otpinputCategory = { "default": { "name": "Default Functionalities", "category": "OTP Input" }, "api": { "name": "API", "category": "OTP Input" }, "defaultSample": "otp-input/default" };
