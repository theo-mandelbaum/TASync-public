"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sparklineCategory = exports.sparklineRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var series_types_functional_1 = require("./series-types-functional");
var axis_types_functional_1 = require("./axis-types-functional");
var spark_grid_functional_1 = require("./spark-grid-functional");
var customization_functional_1 = require("./customization-functional");
var live_update_functional_1 = require("./live-update-functional");
var range_band_functional_1 = require("./range-band-functional");
exports.sparklineRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/series-types', Component: series_types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/axis-types', Component: axis_types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/spark-grid', Component: spark_grid_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/customization', Component: customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/live-update', Component: live_update_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sparkline/range-band', Component: range_band_functional_1.default })));
exports.sparklineCategory = { "default": { "name": "Default", "category": "Sparkline Charts" }, "series-types": { "name": "Series Types", "category": "Sparkline Charts" }, "axis-types": { "name": "Axis Value Types", "category": "Sparkline Charts" }, "spark-grid": { "name": "Sparkline in Grid", "category": "Sparkline Charts" }, "customization": { "name": "Customization", "category": "Sparkline Charts" }, "live-update": { "name": "Live Update", "category": "Sparkline Charts" }, "range-band": { "name": "Range Band", "category": "Sparkline Charts" }, "defaultSample": "sparkline/default" };
