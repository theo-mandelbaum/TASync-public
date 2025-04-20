"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCategory = exports.menuRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var data_binding_functional_1 = require("./data-binding-functional");
var scrollable_functional_1 = require("./scrollable-functional");
var template_functional_1 = require("./template-functional");
var hamburger_mode_functional_1 = require("./hamburger-mode-functional");
var api_functional_1 = require("./api-functional");
var toolbar_integration_functional_1 = require("./toolbar-integration-functional");
exports.menuRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/data-binding', Component: data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/scrollable', Component: scrollable_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/hamburger-mode', Component: hamburger_mode_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/menu/toolbar-integration', Component: toolbar_integration_functional_1.default })));
exports.menuCategory = { "default": { "name": "Default Functionalities", "category": "Menu Bar" }, "data-binding": { "name": "Data Binding", "category": "Menu Bar" }, "scrollable": { "name": "Scrollable", "category": "Menu Bar" }, "template": { "name": "Template", "category": "Menu Bar" }, "hamburger-mode": { "name": "Hamburger Mode", "category": "Menu Bar" }, "api": { "name": "API", "category": "Menu Bar" }, "toolbar-integration": { "name": "Toolbar Integration", "category": "Use Case" }, "defaultSample": "menu/default" };
