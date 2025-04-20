"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listboxCategory = exports.listboxRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var dual_list_box_functional_1 = require("./dual-list-box-functional");
var drag_and_drop_functional_1 = require("./drag-and-drop-functional");
var checkbox_functional_1 = require("./checkbox-functional");
var template_functional_1 = require("./template-functional");
var api_functional_1 = require("./api-functional");
exports.listboxRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/dual-list-box', Component: dual_list_box_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/drag-and-drop', Component: drag_and_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/checkbox', Component: checkbox_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/list-box/api', Component: api_functional_1.default })));
exports.listboxCategory = { "default": { "name": "Default Functionalities", "category": "List Box" }, "dual-list-box": { "name": "Dual ListBox", "category": "List Box" }, "drag-and-drop": { "name": "Drag And Drop", "category": "List Box" }, "checkbox": { "name": "Checkbox", "category": "List Box" }, "template": { "name": "Template", "category": "List Box" }, "api": { "name": "API", "category": "List Box" }, "defaultSample": "list-box/default" };
