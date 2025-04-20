"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.comboboxCategory = exports.comboboxRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var grouping_icon_functional_1 = require("./grouping-icon-functional");
var data_binding_functional_1 = require("./data-binding-functional");
var object_value_binding_functional_1 = require("./object-value-binding-functional");
var disabled_items_functional_1 = require("./disabled-items-functional");
var custom_value_functional_1 = require("./custom-value-functional");
var filtering_functional_1 = require("./filtering-functional");
var template_functional_1 = require("./template-functional");
var resize_functional_1 = require("./resize-functional");
var virtual_scroll_functional_1 = require("./virtual-scroll-functional");
var cascading_functional_1 = require("./cascading-functional");
var diacritics_filtering_functional_1 = require("./diacritics-filtering-functional");
exports.comboboxRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/grouping-icon', Component: grouping_icon_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/data-binding', Component: data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/object-value-binding', Component: object_value_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/disabled-items', Component: disabled_items_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/custom-value', Component: custom_value_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/resize', Component: resize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/virtual-scroll', Component: virtual_scroll_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/cascading', Component: cascading_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/combo-box/diacritics-filtering', Component: diacritics_filtering_functional_1.default })));
exports.comboboxCategory = { "default": { "name": "Default Functionalities", "category": "ComboBox" }, "grouping-icon": { "name": "Grouping and Icons", "category": "ComboBox" }, "data-binding": { "name": "Data Binding", "category": "ComboBox" }, "object-value-binding": { "name": "Object Value Binding", "category": "ComboBox" }, "disabled-items": { "name": "Disabled Items", "category": "ComboBox" }, "custom-value": { "name": "Custom Value", "category": "ComboBox" }, "filtering": { "name": "Filtering", "category": "ComboBox" }, "template": { "name": "Templates", "category": "ComboBox" }, "resize": { "name": "Popup Resize", "category": "ComboBox" }, "virtual-scroll": { "name": "Virtualization", "category": "ComboBox" }, "cascading": { "name": "Cascading", "category": "ComboBox" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "ComboBox" }, "defaultSample": "combo-box/default" };
