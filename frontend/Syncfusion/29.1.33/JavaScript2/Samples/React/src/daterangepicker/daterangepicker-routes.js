"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.daterangepickerCategory = exports.daterangepickerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var date_range_functional_1 = require("./date-range-functional");
var day_span_functional_1 = require("./day-span-functional");
var date_format_functional_1 = require("./date-format-functional");
var presets_functional_1 = require("./presets-functional");
var month_range_picker_functional_1 = require("./month-range-picker-functional");
exports.daterangepickerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/date-range', Component: date_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/day-span', Component: day_span_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/date-format', Component: date_format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/presets', Component: presets_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/daterangepicker/month-range-picker', Component: month_range_picker_functional_1.default })));
exports.daterangepickerCategory = { "default": { "name": "Default Functionalities", "category": "DateRangePicker" }, "date-range": { "name": "Date Range", "category": "DateRangePicker" }, "day-span": { "name": "Day Span", "category": "DateRangePicker" }, "date-format": { "name": "Format", "category": "DateRangePicker" }, "presets": { "name": "Preset Ranges", "category": "DateRangePicker" }, "month-range-picker": { "name": "Month Range Picker", "category": "DateRangePicker" }, "defaultSample": "daterangepicker/default" };
