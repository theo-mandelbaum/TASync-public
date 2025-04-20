"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aismartpasteCategory = exports.aismartpasteRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_1 = require("./default");
exports.aismartpasteRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-smart-paste/default', Component: default_1.Default })));
exports.aismartpasteCategory = { "default": { "name": "Default Functionalities", "category": "Smart Paste" }, "defaultSample": "ai-smart-paste/default" };
