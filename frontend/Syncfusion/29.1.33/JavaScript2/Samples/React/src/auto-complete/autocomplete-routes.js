"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autocompleteCategory = exports.autocompleteRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var grouping_icon_functional_1 = require("./grouping-icon-functional");
var data_binding_functional_1 = require("./data-binding-functional");
var object_value_binding_functional_1 = require("./object-value-binding-functional");
var disabled_items_functional_1 = require("./disabled-items-functional");
var template_functional_1 = require("./template-functional");
var resize_functional_1 = require("./resize-functional");
var virtual_scroll_functional_1 = require("./virtual-scroll-functional");
var highlight_functional_1 = require("./highlight-functional");
var custom_filtering_functional_1 = require("./custom-filtering-functional");
var diacritics_filtering_functional_1 = require("./diacritics-filtering-functional");
exports.autocompleteRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/grouping-icon', Component: grouping_icon_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/data-binding', Component: data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/object-value-binding', Component: object_value_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/disabled-items', Component: disabled_items_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/resize', Component: resize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/virtual-scroll', Component: virtual_scroll_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/highlight', Component: highlight_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/custom-filtering', Component: custom_filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/auto-complete/diacritics-filtering', Component: diacritics_filtering_functional_1.default })));
exports.autocompleteCategory = { "default": { "name": "Default Functionalities", "category": "AutoComplete" }, "grouping-icon": { "name": "Grouping and Icons", "category": "AutoComplete" }, "data-binding": { "name": "Data Binding", "category": "AutoComplete" }, "object-value-binding": { "name": "Object Value Binding", "category": "AutoComplete" }, "disabled-items": { "name": "Disabled Items", "category": "AutoComplete" }, "template": { "name": "Templates", "category": "AutoComplete" }, "resize": { "name": "Popup Resize", "category": "AutoComplete" }, "virtual-scroll": { "name": "Virtualization", "category": "AutoComplete" }, "highlight": { "name": "Highlight", "category": "AutoComplete" }, "custom-filtering": { "name": "Custom Filtering", "category": "AutoComplete" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "AutoComplete" }, "defaultSample": "auto-complete/default" };
