"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.datetimepickerCategory = exports.datetimepickerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var date_time_range_functional_1 = require("./date-time-range-functional");
var date_time_format_functional_1 = require("./date-time-format-functional");
var disabled_functional_1 = require("./disabled-functional");
var special_dates_functional_1 = require("./special-dates-functional");
var input_mask_functional_1 = require("./input-mask-functional");
exports.datetimepickerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/date-time-range', Component: date_time_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/date-time-format', Component: date_time_format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/disabled', Component: disabled_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/special-dates', Component: special_dates_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/datetimepicker/input-mask', Component: input_mask_functional_1.default })));
exports.datetimepickerCategory = { "default": { "name": "Default Functionalities", "category": "DateTimePicker" }, "date-time-range": { "name": "DateTime Range", "category": "DateTimePicker" }, "date-time-format": { "name": "Format", "category": "DateTimePicker" }, "disabled": { "name": "Disabled Dates", "category": "DateTimePicker" }, "special-dates": { "name": "Special Dates", "category": "DateTimePicker" }, "input-mask": { "name": "Mask Support", "category": "DateTimePicker" }, "defaultSample": "datetimepicker/default" };
