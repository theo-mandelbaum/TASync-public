"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appbarCategory = exports.appbarRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var color_functional_1 = require("./color-functional");
exports.appbarRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/appbar/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/appbar/color', Component: color_functional_1.default })));
exports.appbarCategory = { "default": { "name": "Default Functionalities", "category": "AppBar" }, "color": { "name": "Color", "category": "AppBar" }, "defaultSample": "appbar/default" };
