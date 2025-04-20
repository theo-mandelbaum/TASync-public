"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datepickerCategory = exports.datepickerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var date_range_functional_1 = require("./date-range-functional");
var date_format_functional_1 = require("./date-format-functional");
var disabled_functional_1 = require("./disabled-functional");
var special_dates_functional_1 = require("./special-dates-functional");
var month_picker_functional_1 = require("./month-picker-functional");
var input_mask_functional_1 = require("./input-mask-functional");
exports.datepickerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/date-range', Component: date_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/date-format', Component: date_format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/disabled', Component: disabled_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/special-dates', Component: special_dates_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/month-picker', Component: month_picker_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datepicker/input-mask', Component: input_mask_functional_1.default })));
exports.datepickerCategory = { "default": { "name": "Default Functionalities", "category": "DatePicker" }, "date-range": { "name": "Date Range", "category": "DatePicker" }, "date-format": { "name": "Format", "category": "DatePicker" }, "disabled": { "name": "Disabled Dates", "category": "DatePicker" }, "special-dates": { "name": "Special Dates", "category": "DatePicker" }, "month-picker": { "name": "Month Picker", "category": "DatePicker" }, "input-mask": { "name": "Mask Support", "category": "DatePicker" }, "defaultSample": "datepicker/default" };
