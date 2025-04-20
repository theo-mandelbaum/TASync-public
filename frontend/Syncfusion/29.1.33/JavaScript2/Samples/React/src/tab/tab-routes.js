"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tabCategory = exports.tabRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var orientation_functional_1 = require("./orientation-functional");
var responsive_modes_functional_1 = require("./responsive-modes-functional");
var wizard_functional_1 = require("./wizard-functional");
var drag_and_drop_functional_1 = require("./drag-and-drop-functional");
var keyboard_interaction_functional_1 = require("./keyboard-interaction-functional");
exports.tabRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/orientation', Component: orientation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/responsive-modes', Component: responsive_modes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/wizard', Component: wizard_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/drag-and-drop', Component: drag_and_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/tab/keyboard-interaction', Component: keyboard_interaction_functional_1.default })));
exports.tabCategory = { "default": { "name": "Default Functionalities", "category": "Tabs" }, "orientation": { "name": "Orientation", "category": "Tabs" }, "responsive-modes": { "name": "Responsive Modes", "category": "Tabs" }, "wizard": { "name": "Wizard", "category": "Tabs" }, "drag-and-drop": { "name": "Drag and Drop", "category": "Tabs" }, "keyboard-interaction": { "name": "Keyboard Interaction", "category": "Tabs" }, "defaultSample": "tab/default" };
