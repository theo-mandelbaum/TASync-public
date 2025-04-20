"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textareaCategory = exports.textareaRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var floating_label_functional_1 = require("./floating-label-functional");
var resize_functional_1 = require("./resize-functional");
var api_functional_1 = require("./api-functional");
exports.textareaRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/textarea/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/textarea/floating-label', Component: floating_label_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/textarea/resize', Component: resize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/textarea/api', Component: api_functional_1.default })));
exports.textareaCategory = { "default": { "name": "Default Functionalities", "category": "TextArea" }, "floating-label": { "name": "Floating Label", "category": "TextArea" }, "resize": { "name": "Resize", "category": "TextArea" }, "api": { "name": "API", "category": "TextArea" }, "defaultSample": "textarea/default" };
