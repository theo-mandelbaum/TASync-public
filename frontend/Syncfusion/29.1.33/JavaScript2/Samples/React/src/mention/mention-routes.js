"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mentionCategory = exports.mentionRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var multiple_list_functional_1 = require("./multiple-list-functional");
var template_functional_1 = require("./template-functional");
var disabled_items_functional_1 = require("./disabled-items-functional");
exports.mentionRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/mention/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/mention/multiple-list', Component: multiple_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/mention/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/mention/disabled-items', Component: disabled_items_functional_1.default })));
exports.mentionCategory = { "default": { "name": "Default Functionalities", "category": "Mention" }, "multiple-list": { "name": "Multiple List", "category": "Mention" }, "template": { "name": "Template", "category": "Mention" }, "disabled-items": { "name": "Disabled Items", "category": "Mention" }, "defaultSample": "mention/default" };
