"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contextmenuCategory = exports.contextmenuRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var template_functional_1 = require("./template-functional");
exports.contextmenuRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/context-menu/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/context-menu/template', Component: template_functional_1.default })));
exports.contextmenuCategory = { "default": { "name": "Default Functionalities", "category": "Context Menu" }, "template": { "name": "Template", "category": "Context Menu" }, "defaultSample": "context-menu/default" };
