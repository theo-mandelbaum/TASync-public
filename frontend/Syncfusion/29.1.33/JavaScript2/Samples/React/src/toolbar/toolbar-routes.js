"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toolbarCategory = exports.toolbarRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var popup_functional_1 = require("./popup-functional");
var template_functional_1 = require("./template-functional");
var alignment_functional_1 = require("./alignment-functional");
var keyboard_interaction_functional_1 = require("./keyboard-interaction-functional");
exports.toolbarRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/popup', Component: popup_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/alignment', Component: alignment_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/toolbar/keyboard-interaction', Component: keyboard_interaction_functional_1.default })));
exports.toolbarCategory = { "default": { "name": "Default Functionalities", "category": "Toolbar" }, "popup": { "name": "Popup", "category": "Toolbar" }, "template": { "name": "Template", "category": "Toolbar" }, "alignment": { "name": "Alignment", "category": "Toolbar" }, "keyboard-interaction": { "name": "Keyboard Interaction", "category": "Toolbar" }, "defaultSample": "toolbar/default" };
