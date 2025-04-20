"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sidebarCategory = exports.sidebarRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var docking_sidebar_functional_1 = require("./docking-sidebar-functional");
var api_functional_1 = require("./api-functional");
var sidebar_menu_functional_1 = require("./sidebar-menu-functional");
var responsive_panel_functional_1 = require("./responsive-panel-functional");
var sidebar_list_functional_1 = require("./sidebar-list-functional");
exports.sidebarRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sidebar/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sidebar/docking-sidebar', Component: docking_sidebar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sidebar/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sidebar/sidebar-menu', Component: sidebar_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sidebar/responsive-panel', Component: responsive_panel_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/sidebar/sidebar-list', Component: sidebar_list_functional_1.default })));
exports.sidebarCategory = { "default": { "name": "Default Functionalities", "category": "Sidebar" }, "docking-sidebar": { "name": "Dock", "category": "Sidebar" }, "api": { "name": "API", "category": "Sidebar" }, "sidebar-menu": { "name": "Sidebar Menu", "category": "Sidebar" }, "responsive-panel": { "name": "Responsive Panel", "category": "Sidebar" }, "sidebar-list": { "name": "Sidebar With ListView", "category": "Sidebar" }, "defaultSample": "sidebar/default" };
