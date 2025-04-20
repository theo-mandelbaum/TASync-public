"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.numerictextboxCategory = exports.numerictextboxRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var range_validation_functional_1 = require("./range-validation-functional");
var custom_format_functional_1 = require("./custom-format-functional");
var restrict_decimals_functional_1 = require("./restrict-decimals-functional");
exports.numerictextboxRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/range-validation', Component: range_validation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/custom-format', Component: custom_format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/numerictextbox/restrict-decimals', Component: restrict_decimals_functional_1.default })));
exports.numerictextboxCategory = { "default": { "name": "Default Functionalities", "category": "Numeric Textbox" }, "range-validation": { "name": "Range Validation", "category": "Numeric Textbox" }, "custom-format": { "name": "Custom Format", "category": "Numeric Textbox" }, "restrict-decimals": { "name": "Restrict Decimals", "category": "Numeric Textbox" }, "defaultSample": "numerictextbox/default" };
