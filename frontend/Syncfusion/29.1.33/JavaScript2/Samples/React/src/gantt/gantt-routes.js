"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ganttCategory = exports.ganttRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var default_functional_1 = require("./default-functional");
var editing_functional_1 = require("./editing-functional");
var virtual_scroll_functional_1 = require("./virtual-scroll-functional");
var undo_redo_functional_1 = require("./undo-redo-functional");
var loading_animation_functional_1 = require("./loading-animation-functional");
var local_data_functional_1 = require("./local-data-functional");
var load_on_demand_functional_1 = require("./load-on-demand-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var self_reference_data_functional_1 = require("./self-reference-data-functional");
var taskMode_functional_1 = require("./taskMode-functional");
var work_week_functional_1 = require("./work-week-functional");
var working_time_range_functional_1 = require("./working-time-range-functional");
var holidays_functional_1 = require("./holidays-functional");
var unscheduled_task_functional_1 = require("./unscheduled-task-functional");
var timezone_functional_1 = require("./timezone-functional");
var critical_path_functional_1 = require("./critical-path-functional");
var baseline_functional_1 = require("./baseline-functional");
var event_markers_functional_1 = require("./event-markers-functional");
var indicators_functional_1 = require("./indicators-functional");
var timeline_functional_1 = require("./timeline-functional");
var zooming_functional_1 = require("./zooming-functional");
var column_template_functional_1 = require("./column-template-functional");
var header_template_functional_1 = require("./header-template-functional");
var reorder_functional_1 = require("./reorder-functional");
var resizing_functional_1 = require("./resizing-functional");
var column_menu_functional_1 = require("./column-menu-functional");
var show_hide_column_functional_1 = require("./show-hide-column-functional");
var resource_allocation_functional_1 = require("./resource-allocation-functional");
var resource_view_functional_1 = require("./resource-view-functional");
var resource_multi_taskbar_functional_1 = require("./resource-multi-taskbar-functional");
var sorting_functional_1 = require("./sorting-functional");
var sorting_api_functional_1 = require("./sorting-api-functional");
var taskbar_template_functional_1 = require("./taskbar-template-functional");
var timeline_template_functional_1 = require("./timeline-template-functional");
var tasklabel_template_functional_1 = require("./tasklabel-template-functional");
var tooltip_template_functional_1 = require("./tooltip-template-functional");
var toolbar_template_functional_1 = require("./toolbar-template-functional");
var filtering_functional_1 = require("./filtering-functional");
var advanced_filtering_functional_1 = require("./advanced-filtering-functional");
var exporting_functional_1 = require("./exporting-functional");
var advanced_exporting_functional_1 = require("./advanced-exporting-functional");
var selection_functional_1 = require("./selection-functional");
var context_menu_functional_1 = require("./context-menu-functional");
var drag_and_drop_functional_1 = require("./drag-and-drop-functional");
var split_tasks_functional_1 = require("./split-tasks-functional");
var grid_lines_functional_1 = require("./grid-lines-functional");
var events_functional_1 = require("./events-functional");
var keyboard_interactions_functional_1 = require("./keyboard-interactions-functional");
exports.ganttRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/editing', Component: editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/virtual-scroll', Component: virtual_scroll_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/undo-redo', Component: undo_redo_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/loading-animation', Component: loading_animation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/load-on-demand', Component: load_on_demand_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/self-reference-data', Component: self_reference_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/taskMode', Component: taskMode_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/work-week', Component: work_week_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/working-time-range', Component: working_time_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/holidays', Component: holidays_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/unscheduled-task', Component: unscheduled_task_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/timezone', Component: timezone_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/critical-path', Component: critical_path_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/baseline', Component: baseline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/event-markers', Component: event_markers_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/indicators', Component: indicators_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/timeline', Component: timeline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/zooming', Component: zooming_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/column-template', Component: column_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/header-template', Component: header_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/reorder', Component: reorder_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/resizing', Component: resizing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/column-menu', Component: column_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/show-hide-column', Component: show_hide_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/resource-allocation', Component: resource_allocation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/resource-view', Component: resource_view_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/resource-multi-taskbar', Component: resource_multi_taskbar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/sorting-api', Component: sorting_api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/taskbar-template', Component: taskbar_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/timeline-template', Component: timeline_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/tasklabel-template', Component: tasklabel_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/tooltip-template', Component: tooltip_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/toolbar-template', Component: toolbar_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/advanced-filtering', Component: advanced_filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/exporting', Component: exporting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/advanced-exporting', Component: advanced_exporting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/context-menu', Component: context_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/drag-and-drop', Component: drag_and_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/split-tasks', Component: split_tasks_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/grid-lines', Component: grid_lines_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/events', Component: events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/gantt/keyboard-interactions', Component: keyboard_interactions_functional_1.default })));
exports.ganttCategory = { "overview": { "name": "Overview", "category": "Gantt Chart" }, "default": { "name": "Default Functionalities", "category": "Gantt Chart" }, "editing": { "name": "Editing", "category": "Gantt Chart" }, "virtual-scroll": { "name": "Virtual Scroll", "category": "Gantt Chart" }, "undo-redo": { "name": "Undo Redo", "category": "Gantt Chart" }, "loading-animation": { "name": "Loading Animation", "category": "Gantt Chart" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "load-on-demand": { "name": "Big Data Set", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "self-reference-data": { "name": "Self Reference Data", "category": "Data Binding" }, "taskMode": { "name": "Task Scheduling Mode", "category": "Scheduling Concepts" }, "work-week": { "name": "Workweek", "category": "Scheduling Concepts" }, "working-time-range": { "name": "Working Time Range", "category": "Scheduling Concepts" }, "holidays": { "name": "Holidays", "category": "Scheduling Concepts" }, "unscheduled-task": { "name": "Unscheduled Tasks", "category": "Scheduling Concepts" }, "timezone": { "name": "Timezone", "category": "Scheduling Concepts" }, "critical-path": { "name": "Critical Path", "category": "Scheduling Concepts" }, "baseline": { "name": "Baseline", "category": "Scheduling Concepts" }, "event-markers": { "name": "Event Markers", "category": "Scheduling Concepts" }, "indicators": { "name": "Indicators", "category": "Scheduling Concepts" }, "timeline": { "name": "Timeline API", "category": "Timeline" }, "zooming": { "name": "Zooming", "category": "Timeline" }, "column-template": { "name": "Column Template", "category": "Columns" }, "header-template": { "name": "Header Template", "category": "Columns" }, "reorder": { "name": "Reorder", "category": "Columns" }, "resizing": { "name": "Resizing", "category": "Columns" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "show-hide-column": { "name": "Show or Hide Column", "category": "Columns" }, "resource-allocation": { "name": "Resource Allocation", "category": "Resource" }, "resource-view": { "name": "Resource View", "category": "Resource" }, "resource-multi-taskbar": { "name": "Resource Multi Taskbar", "category": "Resource" }, "sorting": { "name": "Default Sorting", "category": "Sorting" }, "sorting-api": { "name": "Sorting API", "category": "Sorting" }, "taskbar-template": { "name": "Taskbar Template", "category": "Templates" }, "timeline-template": { "name": "Timeline Template", "category": "Templates" }, "tasklabel-template": { "name": "Task Label Template", "category": "Templates" }, "tooltip-template": { "name": "Tooltip Template", "category": "Templates" }, "toolbar-template": { "name": "Toolbar Template", "category": "Templates" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "advanced-filtering": { "name": "Advanced Filtering", "category": "Filtering" }, "exporting": { "name": "Exporting", "category": "Exporting" }, "advanced-exporting": { "name": "Advanced Exporting", "category": "Exporting" }, "selection": { "name": "Selection", "category": "Miscellaneous" }, "context-menu": { "name": "Context Menu", "category": "Miscellaneous" }, "drag-and-drop": { "name": "Row Drag and Drop", "category": "Miscellaneous" }, "split-tasks": { "name": "Split Tasks", "category": "Miscellaneous" }, "grid-lines": { "name": "Gridlines", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "keyboard-interactions": { "name": "Keyboard Navigation", "category": "Miscellaneous" }, "defaultSample": "gantt/overview" };
