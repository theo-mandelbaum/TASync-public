"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.breadcrumbCategory = exports.breadcrumbRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var bind_to_location_functional_1 = require("./bind-to-location-functional");
var template_and_customization_functional_1 = require("./template-and-customization-functional");
var overflow_modes_functional_1 = require("./overflow-modes-functional");
var events_functional_1 = require("./events-functional");
var keyboard_navigation_functional_1 = require("./keyboard-navigation-functional");
var address_bar_functional_1 = require("./address-bar-functional");
exports.breadcrumbRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/bind-to-location', Component: bind_to_location_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/template-and-customization', Component: template_and_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/overflow-modes', Component: overflow_modes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/events', Component: events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/keyboard-navigation', Component: keyboard_navigation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/breadcrumb/address-bar', Component: address_bar_functional_1.default })));
exports.breadcrumbCategory = { "default": { "name": "Default Functionalities", "category": "Breadcrumb" }, "bind-to-location": { "name": "Bind to Location", "category": "Breadcrumb" }, "template-and-customization": { "name": "Template and Customization", "category": "Breadcrumb" }, "overflow-modes": { "name": "Overflow Modes", "category": "Breadcrumb" }, "events": { "name": "Events", "category": "Breadcrumb" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "Breadcrumb" }, "address-bar": { "name": "Address Bar", "category": "Use Case" }, "defaultSample": "breadcrumb/default" };
