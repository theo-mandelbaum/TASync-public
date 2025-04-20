"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiassistviewCategory = exports.aiassistviewRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var custom_views_functional_1 = require("./custom-views-functional");
var streaming_functional_1 = require("./streaming-functional");
var template_functional_1 = require("./template-functional");
var dialog_functional_1 = require("./dialog-functional");
exports.aiassistviewRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-assistview/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-assistview/custom-views', Component: custom_views_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-assistview/streaming', Component: streaming_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-assistview/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-assistview/dialog', Component: dialog_functional_1.default })));
exports.aiassistviewCategory = { "default": { "name": "Default Functionalities", "category": "AI AssistView" }, "custom-views": { "name": "Custom Views", "category": "AI AssistView" }, "streaming": { "name": "Streaming Response", "category": "AI AssistView" }, "template": { "name": "Template", "category": "AI AssistView" }, "dialog": { "name": "Dialog", "category": "Integration" }, "defaultSample": "ai-assistview/default" };
