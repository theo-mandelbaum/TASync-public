"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdowneditorCategory = exports.markdowneditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var default_functionalities_functional_1 = require("./default-functionalities-functional");
var custom_format_functional_1 = require("./custom-format-functional");
var mention_integration_functional_1 = require("./mention-integration-functional");
exports.markdowneditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/markdown-editor/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/markdown-editor/default-functionalities', Component: default_functionalities_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/markdown-editor/custom-format', Component: custom_format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/markdown-editor/mention-integration', Component: mention_integration_functional_1.default })));
exports.markdowneditorCategory = { "overview": { "name": "Overview", "category": "Markdown Editor" }, "default-functionalities": { "name": "Default Functionalities", "category": "Markdown Editor" }, "custom-format": { "name": "Custom Format", "category": "Markdown Editor" }, "mention-integration": { "name": "@ Mention", "category": "Markdown Editor" }, "defaultSample": "markdown-editor/overview" };
