"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aipivottableCategory = exports.aipivottableRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var smart_pivot_1 = require("./smart-pivot");
exports.aipivottableRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-pivot-table/smart-pivot', Component: smart_pivot_1.SmartPivot })));
exports.aipivottableCategory = { "smart-pivot": { "name": "Smart Pivot", "category": "Pivot Table" }, "defaultSample": "ai-pivot-table/smart-pivot" };
