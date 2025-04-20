"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangenavigatorCategory = exports.rangenavigatorRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var light_weight_functional_1 = require("./light-weight-functional");
var date_time_functional_1 = require("./date-time-functional");
var double_functional_1 = require("./double-functional");
var logarithmic_functional_1 = require("./logarithmic-functional");
var multilevel_functional_1 = require("./multilevel-functional");
var period_selector_functional_1 = require("./period-selector-functional");
var empty_data_functional_1 = require("./empty-data-functional");
var filter_functional_1 = require("./filter-functional");
var export_functional_1 = require("./export-functional");
var right_to_left_functional_1 = require("./right-to-left-functional");
exports.rangenavigatorRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/light-weight', Component: light_weight_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/date-time', Component: date_time_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/double', Component: double_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/logarithmic', Component: logarithmic_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/multilevel', Component: multilevel_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/period-selector', Component: period_selector_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/empty-data', Component: empty_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/filter', Component: filter_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/export', Component: export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-navigator/right-to-left', Component: right_to_left_functional_1.default })));
exports.rangenavigatorCategory = { "default": { "name": "Default", "category": "Range Selector" }, "light-weight": { "name": "Lightweight", "category": "Range Selector" }, "date-time": { "name": "DateTime", "category": "Axis" }, "double": { "name": "Numeric Axis", "category": "Axis" }, "logarithmic": { "name": "Logarithmic Axis", "category": "Axis" }, "multilevel": { "name": "Multilevel Labels", "category": "Axis" }, "period-selector": { "name": "Period Selector", "category": "Customization" }, "empty-data": { "name": "Empty Points", "category": "Customization" }, "filter": { "name": "Filter", "category": "Customization" }, "export": { "name": "Print and Export", "category": "Export" }, "right-to-left": { "name": "RTL", "category": "RTL" }, "defaultSample": "range-navigator/default" };
