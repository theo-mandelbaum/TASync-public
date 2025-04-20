"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.speechtotextCategory = exports.speechtotextRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var use_case_functional_1 = require("./use-case-functional");
var integration_functional_1 = require("./integration-functional");
exports.speechtotextRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speech-to-text/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speech-to-text/use-case', Component: use_case_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/speech-to-text/integration', Component: integration_functional_1.default })));
exports.speechtotextCategory = { "default": { "name": "Default Functionalities", "category": "Speech To Text" }, "use-case": { "name": "Use Case", "category": "Integration" }, "integration": { "name": "AI AssistView", "category": "Integration" }, "defaultSample": "speech-to-text/default" };
