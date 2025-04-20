"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toastCategory = exports.toastRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var types_functional_1 = require("./types-functional");
var templates_functional_1 = require("./templates-functional");
var positions_functional_1 = require("./positions-functional");
var api_functional_1 = require("./api-functional");
exports.toastRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/types', Component: types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/templates', Component: templates_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/positions', Component: positions_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toast/api', Component: api_functional_1.default })));
exports.toastCategory = { "default": { "name": "Default", "category": "Toast" }, "types": { "name": "Types", "category": "Toast" }, "templates": { "name": "Templates", "category": "Toast" }, "positions": { "name": "Positions", "category": "Toast" }, "api": { "name": "API", "category": "Toast" }, "defaultSample": "toast/default" };
