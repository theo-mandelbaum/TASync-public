"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buttonCategory = exports.buttonRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var button_group_functional_1 = require("./button-group-functional");
var checkbox_functional_1 = require("./checkbox-functional");
var radio_button_functional_1 = require("./radio-button-functional");
var dropdown_button_functional_1 = require("./dropdown-button-functional");
var split_button_functional_1 = require("./split-button-functional");
var switch_functional_1 = require("./switch-functional");
var progress_button_functional_1 = require("./progress-button-functional");
exports.buttonRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/button-group', Component: button_group_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/checkbox', Component: checkbox_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/radio-button', Component: radio_button_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/dropdown-button', Component: dropdown_button_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/split-button', Component: split_button_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/switch', Component: switch_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/button/progress-button', Component: progress_button_functional_1.default })));
exports.buttonCategory = { "default": { "name": "Default Functionalities", "category": "Button" }, "button-group": { "name": "Button Group", "category": "Button" }, "checkbox": { "name": "Checkbox", "category": "Button" }, "radio-button": { "name": "Radio Button", "category": "Button" }, "dropdown-button": { "name": "Dropdown Menu", "category": "Button" }, "split-button": { "name": "Split Button", "category": "Button" }, "switch": { "name": "Switch", "category": "Button" }, "progress-button": { "name": "Progress Button", "category": "Button" }, "defaultSample": "button/default" };
