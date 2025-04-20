"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropdowntreeCategory = exports.dropdowntreeRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var icons_functional_1 = require("./icons-functional");
var checkbox_functional_1 = require("./checkbox-functional");
var multiple_selection_functional_1 = require("./multiple-selection-functional");
var template_functional_1 = require("./template-functional");
var custom_template_functional_1 = require("./custom-template-functional");
var filtering_functional_1 = require("./filtering-functional");
var local_data_functional_1 = require("./local-data-functional");
var remote_data_functional_1 = require("./remote-data-functional");
exports.dropdowntreeRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/icons', Component: icons_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/checkbox', Component: checkbox_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/multiple-selection', Component: multiple_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/custom-template', Component: custom_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-tree/remote-data', Component: remote_data_functional_1.default })));
exports.dropdowntreeCategory = { "default": { "name": "Default Functionalities", "category": "Dropdown Tree" }, "icons": { "name": "Icons and Images", "category": "Dropdown Tree" }, "checkbox": { "name": "Checkbox", "category": "Dropdown Tree" }, "multiple-selection": { "name": "Multiple Selection", "category": "Dropdown Tree" }, "template": { "name": "Template", "category": "Dropdown Tree" }, "custom-template": { "name": "Custom Template", "category": "Dropdown Tree" }, "filtering": { "name": "Filtering", "category": "Dropdown Tree" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "defaultSample": "drop-down-tree/default" };
