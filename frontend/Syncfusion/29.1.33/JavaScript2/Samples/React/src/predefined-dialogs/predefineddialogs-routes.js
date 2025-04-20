"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.predefineddialogsCategory = exports.predefineddialogsRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var customization_functional_1 = require("./customization-functional");
var animation_functional_1 = require("./animation-functional");
exports.predefineddialogsRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/predefined-dialogs/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/predefined-dialogs/customization', Component: customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/predefined-dialogs/animation', Component: animation_functional_1.default })));
exports.predefineddialogsCategory = { "default": { "name": "Default Functionalities", "category": "Predefined Dialogs" }, "customization": { "name": "Customization", "category": "Predefined Dialogs" }, "animation": { "name": "Animation", "category": "Predefined Dialogs" }, "defaultSample": "predefined-dialogs/default" };
