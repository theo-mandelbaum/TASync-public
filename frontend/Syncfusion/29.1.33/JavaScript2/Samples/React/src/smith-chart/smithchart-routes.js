"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.smithchartCategory = exports.smithchartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var custom_functional_1 = require("./custom-functional");
var print_export_functional_1 = require("./print-export-functional");
exports.smithchartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/smith-chart/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/smith-chart/custom', Component: custom_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/smith-chart/print-export', Component: print_export_functional_1.default })));
exports.smithchartCategory = { "default": { "name": "Default", "category": "Smith Chart" }, "custom": { "name": "Customization", "category": "Smith Chart" }, "print-export": { "name": "Print and Export", "category": "Smith Chart" }, "defaultSample": "smith-chart/default" };
