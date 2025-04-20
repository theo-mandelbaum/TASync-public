"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treeviewCategory = exports.treeviewRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var icons_functional_1 = require("./icons-functional");
var check_box_functional_1 = require("./check-box-functional");
var node_editing_functional_1 = require("./node-editing-functional");
var multiple_selection_functional_1 = require("./multiple-selection-functional");
var drag_and_drop_functional_1 = require("./drag-and-drop-functional");
var template_functional_1 = require("./template-functional");
var local_data_functional_1 = require("./local-data-functional");
var remote_data_functional_1 = require("./remote-data-functional");
exports.treeviewRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/icons', Component: icons_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/check-box', Component: check_box_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/node-editing', Component: node_editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/multiple-selection', Component: multiple_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/drag-and-drop', Component: drag_and_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treeview/remote-data', Component: remote_data_functional_1.default })));
exports.treeviewCategory = { "default": { "name": "Default Functionalities", "category": "TreeView" }, "icons": { "name": "Icons and Images", "category": "TreeView" }, "check-box": { "name": "Checkbox", "category": "TreeView" }, "node-editing": { "name": "Node Editing", "category": "TreeView" }, "multiple-selection": { "name": "Multiple Selection", "category": "TreeView" }, "drag-and-drop": { "name": "Drag and Drop", "category": "TreeView" }, "template": { "name": "Template", "category": "TreeView" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "defaultSample": "treeview/default" };
