"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dashboardlayoutCategory = exports.dashboardlayoutRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var predefined_layouts_functional_1 = require("./predefined-layouts-functional");
var properties_functional_1 = require("./properties-functional");
var dynamic_functional_1 = require("./dynamic-functional");
var analytics_dashboard_functional_1 = require("./analytics-dashboard-functional");
exports.dashboardlayoutRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/predefined-layouts', Component: predefined_layouts_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/properties', Component: properties_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/dynamic', Component: dynamic_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/dashboard-layout/analytics-dashboard', Component: analytics_dashboard_functional_1.default })));
exports.dashboardlayoutCategory = { "default": { "name": "Default Functionalities", "category": "Dashboard Layout" }, "predefined-layouts": { "name": "Predefined Layouts", "category": "Dashboard Layout" }, "properties": { "name": "API", "category": "Dashboard Layout" }, "dynamic": { "name": "Editable Dashboard", "category": "Dashboard Layout" }, "analytics-dashboard": { "name": "SEO Analytics Dashboard", "category": "Use Case" }, "defaultSample": "dashboard-layout/default" };
