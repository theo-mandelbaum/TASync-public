"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.floatingactionbuttonCategory = exports.floatingactionbuttonRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var default_functional_1 = require("./default-functional");
var position_functional_1 = require("./position-functional");
var styles_functional_1 = require("./styles-functional");
exports.floatingactionbuttonRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/floating-action-button/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/floating-action-button/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/floating-action-button/position', Component: position_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/floating-action-button/styles', Component: styles_functional_1.default })));
exports.floatingactionbuttonCategory = { "overview": { "name": "Overview", "category": "Floating Action Button" }, "default": { "name": "Default Functionalities", "category": "Floating Action Button" }, "position": { "name": "Position", "category": "Floating Action Button" }, "styles": { "name": "Styles", "category": "Floating Action Button" }, "defaultSample": "floating-action-button/overview" };
