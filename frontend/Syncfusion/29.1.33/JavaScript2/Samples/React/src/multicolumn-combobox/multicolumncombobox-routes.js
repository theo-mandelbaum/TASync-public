"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multicolumncomboboxCategory = exports.multicolumncomboboxRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var remote_databinding_functional_1 = require("./remote-databinding-functional");
var grouping_functional_1 = require("./grouping-functional");
var filtering_functional_1 = require("./filtering-functional");
var virtualization_functional_1 = require("./virtualization-functional");
var sorting_functional_1 = require("./sorting-functional");
var rtl_1 = require("./rtl");
var keyboard_navigation_functional_1 = require("./keyboard-navigation-functional");
var template_functional_1 = require("./template-functional");
exports.multicolumncomboboxRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/remote-databinding', Component: remote_databinding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/grouping', Component: grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/virtualization', Component: virtualization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/rtl', Component: rtl_1.RTL }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/keyboard-navigation', Component: keyboard_navigation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multicolumn-combobox/template', Component: template_functional_1.default })));
exports.multicolumncomboboxCategory = { "default": { "name": "Default Functionalities", "category": "MultiColumn Combobox" }, "remote-databinding": { "name": "Remote Data", "category": "MultiColumn Combobox" }, "grouping": { "name": "Grouping", "category": "MultiColumn Combobox" }, "filtering": { "name": "Filtering", "category": "MultiColumn Combobox" }, "virtualization": { "name": "Virtualization", "category": "MultiColumn Combobox" }, "sorting": { "name": "Sorting", "category": "MultiColumn Combobox" }, "rtl": { "name": "RTL", "category": "MultiColumn Combobox" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "MultiColumn Combobox" }, "template": { "name": "Template", "category": "MultiColumn Combobox" }, "defaultSample": "multicolumn-combobox/default" };
