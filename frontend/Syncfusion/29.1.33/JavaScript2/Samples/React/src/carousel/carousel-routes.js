"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.carouselCategory = exports.carouselRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var data_binding_functional_1 = require("./data-binding-functional");
var templates_functional_1 = require("./templates-functional");
var partial_visible_functional_1 = require("./partial-visible-functional");
var indicator_type_functional_1 = require("./indicator-type-functional");
var keyboard_navigation_functional_1 = require("./keyboard-navigation-functional");
var api_functional_1 = require("./api-functional");
exports.carouselRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/data-binding', Component: data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/templates', Component: templates_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/partial-visible', Component: partial_visible_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/indicator-type', Component: indicator_type_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/keyboard-navigation', Component: keyboard_navigation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/carousel/api', Component: api_functional_1.default })));
exports.carouselCategory = { "default": { "name": "Default Functionalities", "category": "Carousel" }, "data-binding": { "name": "Data Binding", "category": "Carousel" }, "templates": { "name": "Templates", "category": "Carousel" }, "partial-visible": { "name": "Partial Visible", "category": "Carousel" }, "indicator-type": { "name": "Indicator Type", "category": "Carousel" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "Carousel" }, "api": { "name": "API", "category": "Carousel" }, "defaultSample": "carousel/default" };
