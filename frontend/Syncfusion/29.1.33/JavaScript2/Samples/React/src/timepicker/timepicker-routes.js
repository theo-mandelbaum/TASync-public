"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.timepickerCategory = exports.timepickerRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var time_range_functional_1 = require("./time-range-functional");
var time_format_functional_1 = require("./time-format-functional");
var list_formatting_functional_1 = require("./list-formatting-functional");
var input_mask_functional_1 = require("./input-mask-functional");
exports.timepickerRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/time-range', Component: time_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/time-format', Component: time_format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/list-formatting', Component: list_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/timepicker/input-mask', Component: input_mask_functional_1.default })));
exports.timepickerCategory = { "default": { "name": "Default Functionalities", "category": "TimePicker" }, "time-range": { "name": "Time Range", "category": "TimePicker" }, "time-format": { "name": "Format", "category": "TimePicker" }, "list-formatting": { "name": "Time Duration", "category": "TimePicker" }, "input-mask": { "name": "Mask Support", "category": "TimePicker" }, "defaultSample": "timepicker/default" };
