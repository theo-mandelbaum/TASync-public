"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aischeduleCategory = exports.aischeduleRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var smart_event_window_1 = require("./smart-event-window");
exports.aischeduleRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-schedule/smart-event-window', Component: smart_event_window_1.SmartEventWindow })));
exports.aischeduleCategory = { "smart-event-window": { "name": "Smart Event Window", "category": "Scheduler" }, "defaultSample": "ai-schedule/smart-event-window" };
