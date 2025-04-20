"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropdownlistCategory = exports.dropdownlistRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var grouping_icon_functional_1 = require("./grouping-icon-functional");
var data_binding_functional_1 = require("./data-binding-functional");
var object_value_binding_functional_1 = require("./object-value-binding-functional");
var disabled_items_functional_1 = require("./disabled-items-functional");
var filtering_functional_1 = require("./filtering-functional");
var template_functional_1 = require("./template-functional");
var resize_functional_1 = require("./resize-functional");
var virtual_scroll_functional_1 = require("./virtual-scroll-functional");
var cascading_functional_1 = require("./cascading-functional");
var inline_functional_1 = require("./inline-functional");
var diacritics_filtering_functional_1 = require("./diacritics-filtering-functional");
exports.dropdownlistRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/grouping-icon', Component: grouping_icon_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/data-binding', Component: data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/object-value-binding', Component: object_value_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/disabled-items', Component: disabled_items_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/resize', Component: resize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/virtual-scroll', Component: virtual_scroll_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/cascading', Component: cascading_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/inline', Component: inline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/drop-down-list/diacritics-filtering', Component: diacritics_filtering_functional_1.default })));
exports.dropdownlistCategory = { "default": { "name": "Default Functionalities", "category": "Dropdown List" }, "grouping-icon": { "name": "Grouping and Icons", "category": "Dropdown List" }, "data-binding": { "name": "Data Binding", "category": "Dropdown List" }, "object-value-binding": { "name": "Object Value Binding", "category": "Dropdown List" }, "disabled-items": { "name": "Disabled Items", "category": "Dropdown List" }, "filtering": { "name": "Filtering", "category": "Dropdown List" }, "template": { "name": "Templates", "category": "Dropdown List" }, "resize": { "name": "Popup Resize", "category": "Dropdown List" }, "virtual-scroll": { "name": "Virtualization", "category": "Dropdown List" }, "cascading": { "name": "Cascading", "category": "Dropdown List" }, "inline": { "name": "Inline", "category": "Dropdown List" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "Dropdown List" }, "defaultSample": "drop-down-list/default" };
