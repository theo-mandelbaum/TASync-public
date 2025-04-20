"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bulletchartCategory = exports.bulletchartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var multiple_data_functional_1 = require("./multiple-data-functional");
var right_to_left_functional_1 = require("./right-to-left-functional");
var bar_customization_functional_1 = require("./bar-customization-functional");
var customization_functional_1 = require("./customization-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var orientation_functional_1 = require("./orientation-functional");
var bullet_legend_functional_1 = require("./bullet-legend-functional");
exports.bulletchartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/multiple-data', Component: multiple_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/right-to-left', Component: right_to_left_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/bar-customization', Component: bar_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/customization', Component: customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/orientation', Component: orientation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/bullet-chart/bullet-legend', Component: bullet_legend_functional_1.default })));
exports.bulletchartCategory = { "default": { "name": "Default", "category": "Bullet Chart" }, "multiple-data": { "name": "Multiple Data", "category": "Bullet Chart" }, "right-to-left": { "name": "RTL", "category": "Bullet Chart" }, "bar-customization": { "name": "Feature and Target Bar", "category": "Bullet Chart" }, "customization": { "name": "Range and Label Settings", "category": "Bullet Chart" }, "tooltip": { "name": "Tooltip Template", "category": "Bullet Chart" }, "orientation": { "name": "Orientation", "category": "Bullet Chart" }, "bullet-legend": { "name": "Legend", "category": "Bullet Chart" }, "defaultSample": "bullet-chart/default" };
