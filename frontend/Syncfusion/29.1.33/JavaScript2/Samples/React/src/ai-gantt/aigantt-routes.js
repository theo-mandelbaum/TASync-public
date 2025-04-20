"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aiganttCategory = exports.aiganttRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var task_prioritize_1 = require("./task-prioritize");
var progress_predictor_1 = require("./progress-predictor");
var resource_manager_1 = require("./resource-manager");
exports.aiganttRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-gantt/task-prioritize', Component: task_prioritize_1.SmartTaskPrioritizer }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-gantt/progress-predictor', Component: progress_predictor_1.SmartProgressPredictor }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-gantt/resource-manager', Component: resource_manager_1.SmartResourceAllocation })));
exports.aiganttCategory = { "task-prioritize": { "name": "Smart Task Prioritizer", "category": "Gantt Chart" }, "progress-predictor": { "name": "Smart Progress Predictor", "category": "Gantt Chart" }, "resource-manager": { "name": "Smart Resource Allocation", "category": "Gantt Chart" }, "defaultSample": "ai-gantt/task-prioritize" };
