"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calendarCategory = exports.calendarRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var date_range_functional_1 = require("./date-range-functional");
var disabled_functional_1 = require("./disabled-functional");
var special_dates_functional_1 = require("./special-dates-functional");
var multi_selection_functional_1 = require("./multi-selection-functional");
var month_picker_functional_1 = require("./month-picker-functional");
var islamic_calendar_functional_1 = require("./islamic-calendar-functional");
exports.calendarRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/date-range', Component: date_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/disabled', Component: disabled_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/special-dates', Component: special_dates_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/multi-selection', Component: multi_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/month-picker', Component: month_picker_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/calendar/islamic-calendar', Component: islamic_calendar_functional_1.default })));
exports.calendarCategory = { "default": { "name": "Default Functionalities", "category": "Calendar" }, "date-range": { "name": "Date Range", "category": "Calendar" }, "disabled": { "name": "Disabled Dates", "category": "Calendar" }, "special-dates": { "name": "Special Dates", "category": "Calendar" }, "multi-selection": { "name": "Multiple Selection", "category": "Calendar" }, "month-picker": { "name": "Month Picker", "category": "Calendar" }, "islamic-calendar": { "name": "Islamic Calendar", "category": "Calendar" }, "defaultSample": "calendar/default" };
