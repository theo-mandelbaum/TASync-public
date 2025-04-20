"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textboxesCategory = exports.textboxesRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var multiline_functional_1 = require("./multiline-functional");
exports.textboxesRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/textboxes/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/textboxes/multiline', Component: multiline_functional_1.default })));
exports.textboxesCategory = { "default": { "name": "Default Functionalities", "category": "TextBox" }, "multiline": { "name": "Multiline TextBox", "category": "TextBox" }, "defaultSample": "textboxes/default" };
