"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aitreegridCategory = exports.aitreegridRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var adaptive_datastructuring_1 = require("./adaptive-datastructuring");
exports.aitreegridRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-tree-grid/adaptive-datastructuring', Component: adaptive_datastructuring_1.AdaptiveDataStructuring })));
exports.aitreegridCategory = { "adaptive-datastructuring": { "name": "Adaptive Data Structuring", "category": "Tree Grid" }, "defaultSample": "ai-tree-grid/adaptive-datastructuring" };
