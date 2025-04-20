"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ratingCategory = exports.ratingRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var precision_functional_1 = require("./precision-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var label_functional_1 = require("./label-functional");
var template_functional_1 = require("./template-functional");
var keyboard_navigation_functional_1 = require("./keyboard-navigation-functional");
exports.ratingRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rating/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rating/precision', Component: precision_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rating/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rating/label', Component: label_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rating/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/rating/keyboard-navigation', Component: keyboard_navigation_functional_1.default })));
exports.ratingCategory = { "default": { "name": "Default Functionalities", "category": "Rating" }, "precision": { "name": "Precision", "category": "Rating" }, "tooltip": { "name": "Tooltip", "category": "Rating" }, "label": { "name": "Label", "category": "Rating" }, "template": { "name": "Template", "category": "Rating" }, "keyboard-navigation": { "name": "Keyboard Navigations", "category": "Rating" }, "defaultSample": "rating/default" };
