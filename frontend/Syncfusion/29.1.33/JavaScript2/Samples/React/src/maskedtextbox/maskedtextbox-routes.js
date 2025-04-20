"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maskedtextboxCategory = exports.maskedtextboxRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var custom_mask_functional_1 = require("./custom-mask-functional");
var formats_functional_1 = require("./formats-functional");
exports.maskedtextboxRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maskedtextbox/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maskedtextbox/custom-mask', Component: custom_mask_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maskedtextbox/formats', Component: formats_functional_1.default })));
exports.maskedtextboxCategory = { "default": { "name": "Default Functionalities", "category": "Input Mask" }, "custom-mask": { "name": "Custom Mask", "category": "Input Mask" }, "formats": { "name": "Formats", "category": "Input Mask" }, "defaultSample": "maskedtextbox/default" };
