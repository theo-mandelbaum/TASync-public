"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accordionCategory = exports.accordionRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var templates_functional_1 = require("./templates-functional");
var icon_functional_1 = require("./icon-functional");
var keyboard_interaction_functional_1 = require("./keyboard-interaction-functional");
exports.accordionRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/templates', Component: templates_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/icon', Component: icon_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/accordion/keyboard-interaction', Component: keyboard_interaction_functional_1.default })));
exports.accordionCategory = { "default": { "name": "Default Functionalities", "category": "Accordion" }, "templates": { "name": "Templates", "category": "Accordion" }, "icon": { "name": "Icons", "category": "Accordion" }, "keyboard-interaction": { "name": "Keyboard Interaction", "category": "Accordion" }, "defaultSample": "accordion/default" };
