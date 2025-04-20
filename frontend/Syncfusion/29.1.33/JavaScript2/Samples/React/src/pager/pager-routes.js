"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pagerCategory = exports.pagerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
var localization_1 = require("./localization");
var api_1 = require("./api");
exports.pagerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pager/default', Component: default_1.Default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pager/localization', Component: localization_1.Localization }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pager/api', Component: api_1.API })));
exports.pagerCategory = { "default": { "name": "Default Functionalities", "category": "PAGER" }, "localization": { "name": "Localization", "category": "PAGER" }, "api": { "name": "API", "category": "PAGER" }, "defaultSample": "pager/default" };
