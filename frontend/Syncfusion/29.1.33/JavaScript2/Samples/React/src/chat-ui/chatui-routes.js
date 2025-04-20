"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatuiCategory = exports.chatuiRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var loadOn_demand_functional_1 = require("./loadOn-demand-functional");
var template_functional_1 = require("./template-functional");
var api_functional_1 = require("./api-functional");
var chat_integration_functional_1 = require("./chat-integration-functional");
exports.chatuiRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chat-ui/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chat-ui/loadOn-demand', Component: loadOn_demand_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chat-ui/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chat-ui/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/chat-ui/chat-integration', Component: chat_integration_functional_1.default })));
exports.chatuiCategory = { "default": { "name": "Default Functionalities", "category": "Chat UI" }, "loadOn-demand": { "name": "Load On-demand", "category": "Chat UI" }, "template": { "name": "Template", "category": "Chat UI" }, "api": { "name": "API", "category": "Chat UI" }, "chat-integration": { "name": "Use Case", "category": "Integration" }, "defaultSample": "chat-ui/default" };
