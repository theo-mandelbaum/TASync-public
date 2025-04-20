"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.querybuilderCategory = exports.querybuilderRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var complex_databinding_functional_1 = require("./complex-databinding-functional");
var grid_functional_1 = require("./grid-functional");
var mongo_sql_functional_1 = require("./mongo-sql-functional");
var lock_group_functional_1 = require("./lock-group-functional");
var clone_group_functional_1 = require("./clone-group-functional");
var drag_drop_functional_1 = require("./drag-drop-functional");
var separate_connector_functional_1 = require("./separate-connector-functional");
var template_functional_1 = require("./template-functional");
var rule_template_functional_1 = require("./rule-template-functional");
var header_template_functional_1 = require("./header-template-functional");
exports.querybuilderRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/complex-databinding', Component: complex_databinding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/grid', Component: grid_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/mongo-sql', Component: mongo_sql_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/lock-group', Component: lock_group_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/clone-group', Component: clone_group_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/drag-drop', Component: drag_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/separate-connector', Component: separate_connector_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/rule-template', Component: rule_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/query-builder/header-template', Component: header_template_functional_1.default })));
exports.querybuilderCategory = { "default": { "name": "Default Functionalities", "category": "Query Builder" }, "complex-databinding": { "name": "Complex Databinding", "category": "Query Builder" }, "grid": { "name": "Integration with Data Grid", "category": "Query Builder" }, "mongo-sql": { "name": "Mongo and SQL Query", "category": "Query Builder" }, "lock-group": { "name": "Lock Group/Rule", "category": "Query Builder" }, "clone-group": { "name": "Clone Group/Rule", "category": "Query Builder" }, "drag-drop": { "name": "Drag and Drop", "category": "Query Builder" }, "separate-connector": { "name": "Separate Connector", "category": "Query Builder" }, "template": { "name": "Value Template", "category": "Template" }, "rule-template": { "name": "Rule Template", "category": "Template" }, "header-template": { "name": "Header Template", "category": "Template" }, "defaultSample": "query-builder/default" };
