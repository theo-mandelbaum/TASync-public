"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aidiagramCategory = exports.aidiagramRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var text_to_flowchart_1 = require("./text-to-flowchart");
var text_to_mindmap_1 = require("./text-to-mindmap");
exports.aidiagramRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-diagram/text-to-flowchart', Component: text_to_flowchart_1.SmartFlowchart }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-diagram/text-to-mindmap', Component: text_to_mindmap_1.smartMindMap })));
exports.aidiagramCategory = { "text-to-flowchart": { "name": "Text to Flowchart", "category": "Diagram" }, "text-to-mindmap": { "name": "Text to MindMap", "category": "Diagram" }, "defaultSample": "ai-diagram/text-to-flowchart" };
