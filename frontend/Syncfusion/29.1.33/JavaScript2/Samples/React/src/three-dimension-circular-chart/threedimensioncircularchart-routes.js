"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threedimensioncircularchartCategory = exports.threedimensioncircularchartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var pie_functional_1 = require("./pie-functional");
var donut_functional_1 = require("./donut-functional");
var pie_legend_functional_1 = require("./pie-legend-functional");
var pie_radius_functional_1 = require("./pie-radius-functional");
var selection_functional_1 = require("./selection-functional");
exports.threedimensioncircularchartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-circular-chart/pie', Component: pie_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-circular-chart/donut', Component: donut_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-circular-chart/pie-legend', Component: pie_legend_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-circular-chart/pie-radius', Component: pie_radius_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/three-dimension-circular-chart/selection', Component: selection_functional_1.default })));
exports.threedimensioncircularchartCategory = { "pie": { "name": "Pie", "category": "3D Circular Chart" }, "donut": { "name": "Donut", "category": "3D Circular Chart" }, "pie-legend": { "name": "Pie with Legend", "category": "3D Circular Chart" }, "pie-radius": { "name": "Pie with Various Radius", "category": "3D Circular Chart" }, "selection": { "name": "Selection", "category": "3D Circular Chart" }, "defaultSample": "three-dimension-circular-chart/pie" };
