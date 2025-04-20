"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorpickerCategory = exports.colorpickerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var inline_functional_1 = require("./inline-functional");
var custom_functional_1 = require("./custom-functional");
var api_functional_1 = require("./api-functional");
exports.colorpickerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/color-picker/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/color-picker/inline', Component: inline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/color-picker/custom', Component: custom_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/color-picker/api', Component: api_functional_1.default })));
exports.colorpickerCategory = { "default": { "name": "Default Functionalities", "category": "Color Picker" }, "inline": { "name": "Inline Mode", "category": "Color Picker" }, "custom": { "name": "Custom Palettes", "category": "Color Picker" }, "api": { "name": "API", "category": "Color Picker" }, "defaultSample": "color-picker/default" };
