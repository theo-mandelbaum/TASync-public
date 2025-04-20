"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multiselectCategory = exports.multiselectRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var data_binding_functional_1 = require("./data-binding-functional");
var object_value_binding_functional_1 = require("./object-value-binding-functional");
var disabled_items_functional_1 = require("./disabled-items-functional");
var grouping_functional_1 = require("./grouping-functional");
var template_functional_1 = require("./template-functional");
var resize_functional_1 = require("./resize-functional");
var filtering_functional_1 = require("./filtering-functional");
var custom_value_functional_1 = require("./custom-value-functional");
var virtual_scroll_functional_1 = require("./virtual-scroll-functional");
var chip_customization_functional_1 = require("./chip-customization-functional");
var checkbox_functional_1 = require("./checkbox-functional");
var grouping_with_checkbox_functional_1 = require("./grouping-with-checkbox-functional");
var selection_limit_functional_1 = require("./selection-limit-functional");
var diacritics_filtering_functional_1 = require("./diacritics-filtering-functional");
exports.multiselectRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/data-binding', Component: data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/object-value-binding', Component: object_value_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/disabled-items', Component: disabled_items_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/grouping', Component: grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/template', Component: template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/resize', Component: resize_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/custom-value', Component: custom_value_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/virtual-scroll', Component: virtual_scroll_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/chip-customization', Component: chip_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/checkbox', Component: checkbox_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/grouping-with-checkbox', Component: grouping_with_checkbox_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/selection-limit', Component: selection_limit_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/multi-select/diacritics-filtering', Component: diacritics_filtering_functional_1.default })));
exports.multiselectCategory = { "default": { "name": "Default Functionalities", "category": "MultiSelect Dropdown" }, "data-binding": { "name": "Data Binding", "category": "MultiSelect Dropdown" }, "object-value-binding": { "name": "Object Value Binding", "category": "MultiSelect Dropdown" }, "disabled-items": { "name": "Disabled Items", "category": "MultiSelect" }, "grouping": { "name": "Grouping", "category": "MultiSelect Dropdown" }, "template": { "name": "Templates", "category": "MultiSelect Dropdown" }, "resize": { "name": "Popup Resize", "category": "MultiSelect Dropdown" }, "filtering": { "name": "Filtering", "category": "MultiSelect Dropdown" }, "custom-value": { "name": "Custom Values", "category": "MultiSelect Dropdown" }, "virtual-scroll": { "name": "Virtualization", "category": "MultiSelect Dropdown" }, "chip-customization": { "name": "Chip Customization", "category": "MultiSelect Dropdown" }, "checkbox": { "name": "CheckBox", "category": "MultiSelect Dropdown" }, "grouping-with-checkbox": { "name": "Grouping with CheckBox", "category": "MultiSelect Dropdown" }, "selection-limit": { "name": "Selection Limit", "category": "MultiSelect Dropdown" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "MultiSelect Dropdown" }, "defaultSample": "multi-select/default" };
