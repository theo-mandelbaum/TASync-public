"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chipsCategory = exports.chipsRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var api_functional_1 = require("./api-functional");
var draganddrop_functional_1 = require("./draganddrop-functional");
exports.chipsRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chips/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chips/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chips/draganddrop', Component: draganddrop_functional_1.default })));
exports.chipsCategory = { "default": { "name": "Default Functionalities", "category": "Chips" }, "api": { "name": "API", "category": "Chips" }, "draganddrop": { "name": "Draggable Chips", "category": "Chips" }, "defaultSample": "chips/default" };
