"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threedimensionchartCategory = exports.threedimensionchartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var column_functional_1 = require("./column-functional");
var column_placement_functional_1 = require("./column-placement-functional");
var cylindrical_column_functional_1 = require("./cylindrical-column-functional");
var bar_functional_1 = require("./bar-functional");
var stacked_column_functional_1 = require("./stacked-column-functional");
var stacked_column100_functional_1 = require("./stacked-column100-functional");
var stacked_bar_functional_1 = require("./stacked-bar-functional");
var stacked_bar100_functional_1 = require("./stacked-bar100-functional");
var empty_point_functional_1 = require("./empty-point-functional");
exports.threedimensionchartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/column', Component: column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/column-placement', Component: column_placement_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/cylindrical-column', Component: cylindrical_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/bar', Component: bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/stacked-column', Component: stacked_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/stacked-column100', Component: stacked_column100_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/stacked-bar', Component: stacked_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/stacked-bar100', Component: stacked_bar100_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-chart/empty-point', Component: empty_point_functional_1.default })));
exports.threedimensionchartCategory = { "column": { "name": "Column", "category": "3D Chart" }, "column-placement": { "name": "Back to Back Column", "category": "3D Chart" }, "cylindrical-column": { "name": "Cylindrical Column", "category": "3D Chart" }, "bar": { "name": "Bar", "category": "3D Chart" }, "stacked-column": { "name": "Stacking Column with Grouping", "category": "3D Chart" }, "stacked-column100": { "name": "100% Stacked Column", "category": "3D Chart" }, "stacked-bar": { "name": "Stacked Bar", "category": "3D Chart" }, "stacked-bar100": { "name": "100% Stacked Bar", "category": "3D Chart" }, "empty-point": { "name": "Column with null and 0 values", "category": "3D Chart" }, "defaultSample": "three-dimension-chart/column" };
