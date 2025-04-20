"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timelineCategory = exports.timelineRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var api_functional_1 = require("./api-functional");
var template_functional_1 = require("./template-functional");
exports.timelineRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timeline/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timeline/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timeline/template', Component: template_functional_1.default })));
exports.timelineCategory = { "default": { "name": "Default Functionalities", "category": "Timeline" }, "api": { "name": "API", "category": "Timeline" }, "template": { "name": "Template", "category": "Timeline" }, "defaultSample": "timeline/default" };
