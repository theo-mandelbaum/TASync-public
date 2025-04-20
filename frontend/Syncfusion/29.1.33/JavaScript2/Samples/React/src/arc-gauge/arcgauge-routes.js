"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.arcgaugeCategory = exports.arcgaugeRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functionalities_functional_1 = require("./default-functionalities-functional");
var customer_satisfaction_score_functional_1 = require("./customer-satisfaction-score-functional");
var key_performance_indicator_functional_1 = require("./key-performance-indicator-functional");
var patterns_functional_1 = require("./patterns-functional");
exports.arcgaugeRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/arc-gauge/default-functionalities', Component: default_functionalities_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/arc-gauge/customer-satisfaction-score', Component: customer_satisfaction_score_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/arc-gauge/key-performance-indicator', Component: key_performance_indicator_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/arc-gauge/patterns', Component: patterns_functional_1.default })));
exports.arcgaugeCategory = { "default-functionalities": { "name": "Default Functionalities", "category": "Arc Gauge" }, "customer-satisfaction-score": { "name": "Customer Satisfaction Score", "category": "Arc Gauge" }, "key-performance-indicator": { "name": "Key Performance Indicator", "category": "Arc Gauge" }, "patterns": { "name": "Patterns", "category": "Arc Gauge" }, "defaultSample": "arc-gauge/default-functionalities" };
