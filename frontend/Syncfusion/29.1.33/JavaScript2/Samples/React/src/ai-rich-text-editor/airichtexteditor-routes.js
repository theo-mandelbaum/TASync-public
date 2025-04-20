"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.airichtexteditorCategory = exports.airichtexteditorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var assistant_1 = require("./assistant");
exports.airichtexteditorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-rich-text-editor/assistant', Component: assistant_1.AIAssistant })));
exports.airichtexteditorCategory = { "assistant": { "name": "AI Assistant", "category": "Rich Text Editor" }, "defaultSample": "ai-rich-text-editor/assistant" };
