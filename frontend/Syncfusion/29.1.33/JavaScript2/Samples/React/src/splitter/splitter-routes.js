"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitterCategory = exports.splitterRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var expand_and_collapse_functional_1 = require("./expand-and-collapse-functional");
var accordion_navigation_menu_functional_1 = require("./accordion-navigation-menu-functional");
var details_view_functional_1 = require("./details-view-functional");
var outlook_style_layout_functional_1 = require("./outlook-style-layout-functional");
var code_editor_layout_functional_1 = require("./code-editor-layout-functional");
exports.splitterRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/expand-and-collapse', Component: expand_and_collapse_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/accordion-navigation-menu', Component: accordion_navigation_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/details-view', Component: details_view_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/outlook-style-layout', Component: outlook_style_layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/splitter/code-editor-layout', Component: code_editor_layout_functional_1.default })));
exports.splitterCategory = { "default": { "name": "Default Functionalities", "category": "Splitter" }, "expand-and-collapse": { "name": "Expand and Collapse", "category": "Splitter" }, "accordion-navigation-menu": { "name": "Accordion Navigation Menu", "category": "Use Case" }, "details-view": { "name": "Details View", "category": "Use Case" }, "outlook-style-layout": { "name": "Outlook-style Layout", "category": "Use Case" }, "code-editor-layout": { "name": "Code Editor Layout", "category": "Use Case" }, "defaultSample": "splitter/default" };
