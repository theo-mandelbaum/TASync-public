"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listviewCategory = exports.listviewRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var remote_list_functional_1 = require("./remote-list-functional");
var check_list_functional_1 = require("./check-list-functional");
var nested_list_functional_1 = require("./nested-list-functional");
var virtualization_functional_1 = require("./virtualization-functional");
var template_functional_1 = require("./template-functional");
var group_template_functional_1 = require("./group-template-functional");
var call_history_functional_1 = require("./call-history-functional");
var scrolling_functional_1 = require("./scrolling-functional");
exports.listviewRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/remote-list', Component: remote_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/check-list', Component: check_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/nested-list', Component: nested_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/virtualization', Component: virtualization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/group-template', Component: group_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/call-history', Component: call_history_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/listview/scrolling', Component: scrolling_functional_1.default })));
exports.listviewCategory = { "default": { "name": "Default Functionalities", "category": "ListView" }, "remote-list": { "name": "Remote Data", "category": "ListView" }, "check-list": { "name": "Checklist", "category": "ListView" }, "nested-list": { "name": "Nested List", "category": "ListView" }, "virtualization": { "name": "Virtualization", "category": "ListView" }, "template": { "name": "Template", "category": "Customization" }, "group-template": { "name": "Group Template", "category": "Customization" }, "call-history": { "name": "Call History", "category": "Use Case" }, "scrolling": { "name": "Scrolling", "category": "ListView" }, "defaultSample": "listview/default" };
