"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCategory = exports.scheduleRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var default_functional_1 = require("./default-functional");
var holiday_calendar_functional_1 = require("./holiday-calendar-functional");
var event_calendar_functional_1 = require("./event-calendar-functional");
var local_data_functional_1 = require("./local-data-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var calendar_integration_functional_1 = require("./calendar-integration-functional");
var realtime_binding_functional_1 = require("./realtime-binding-functional");
var recurrence_events_functional_1 = require("./recurrence-events-functional");
var block_events_functional_1 = require("./block-events-functional");
var search_events_functional_1 = require("./search-events-functional");
var timezone_functional_1 = require("./timezone-functional");
var inline_editing_functional_1 = require("./inline-editing-functional");
var overlap_events_functional_1 = require("./overlap-events-functional");
var external_drag_drop_functional_1 = require("./external-drag-drop-functional");
var multi_drag_functional_1 = require("./multi-drag-functional");
var schedule_to_schedule_drag_drop_functional_1 = require("./schedule-to-schedule-drag-drop-functional");
var schedule_to_grid_functional_1 = require("./schedule-to-grid-functional");
var virtual_scrolling_functional_1 = require("./virtual-scrolling-functional");
var data_virtualization_functional_1 = require("./data-virtualization-functional");
var views_functional_1 = require("./views-functional");
var timeline_functional_1 = require("./timeline-functional");
var agenda_functional_1 = require("./agenda-functional");
var month_agenda_functional_1 = require("./month-agenda-functional");
var year_functional_1 = require("./year-functional");
var custom_month_view_functional_1 = require("./custom-month-view-functional");
var views_configuration_functional_1 = require("./views-configuration-functional");
var extended_views_functional_1 = require("./extended-views-functional");
var timeline_resources_functional_1 = require("./timeline-resources-functional");
var resources_functional_1 = require("./resources-functional");
var resource_functional_1 = require("./resource-functional");
var group_editing_functional_1 = require("./group-editing-functional");
var group_custom_work_days_functional_1 = require("./group-custom-work-days-functional");
var add_remove_resources_functional_1 = require("./add-remove-resources-functional");
var adaptive_rows_functional_1 = require("./adaptive-rows-functional");
var resource_grouping_functional_1 = require("./resource-grouping-functional");
var timeline_resource_grouping_functional_1 = require("./timeline-resource-grouping-functional");
var group_by_date_functional_1 = require("./group-by-date-functional");
var group_by_child_functional_1 = require("./group-by-child-functional");
var adaptive_grouping_functional_1 = require("./adaptive-grouping-functional");
var cell_template_functional_1 = require("./cell-template-functional");
var date_header_template_functional_1 = require("./date-header-template-functional");
var event_template_functional_1 = require("./event-template-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var quick_info_template_functional_1 = require("./quick-info-template-functional");
var editor_validation_functional_1 = require("./editor-validation-functional");
var editor_custom_field_functional_1 = require("./editor-custom-field-functional");
var editor_template_functional_1 = require("./editor-template-functional");
var header_rows_functional_1 = require("./header-rows-functional");
var time_scale_functional_1 = require("./time-scale-functional");
var context_menu_functional_1 = require("./context-menu-functional");
var header_bar_functional_1 = require("./header-bar-functional");
var scroll_to_functional_1 = require("./scroll-to-functional");
var work_days_functional_1 = require("./work-days-functional");
var hide_weekend_functional_1 = require("./hide-weekend-functional");
var work_hours_functional_1 = require("./work-hours-functional");
var start_end_hour_functional_1 = require("./start-end-hour-functional");
var cell_dimension_functional_1 = require("./cell-dimension-functional");
var read_only_events_functional_1 = require("./read-only-events-functional");
var reminder_functional_1 = require("./reminder-functional");
var excel_export_functional_1 = require("./excel-export-functional");
var calendar_export_import_functional_1 = require("./calendar-export-import-functional");
var print_functional_1 = require("./print-functional");
var recurrence_editor_generate_rule_functional_1 = require("./recurrence-editor-generate-rule-functional");
var recurrence_editor_populate_rule_functional_1 = require("./recurrence-editor-populate-rule-functional");
var clipboard_functional_1 = require("./clipboard-functional");
var keyboard_interaction_functional_1 = require("./keyboard-interaction-functional");
var events_functional_1 = require("./events-functional");
exports.scheduleRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/holiday-calendar', Component: holiday_calendar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/event-calendar', Component: event_calendar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/calendar-integration', Component: calendar_integration_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/realtime-binding', Component: realtime_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/recurrence-events', Component: recurrence_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/block-events', Component: block_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/search-events', Component: search_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/timezone', Component: timezone_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/inline-editing', Component: inline_editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/overlap-events', Component: overlap_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/external-drag-drop', Component: external_drag_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/multi-drag', Component: multi_drag_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/schedule-to-schedule-drag-drop', Component: schedule_to_schedule_drag_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/schedule-to-grid', Component: schedule_to_grid_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/virtual-scrolling', Component: virtual_scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/data-virtualization', Component: data_virtualization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/views', Component: views_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/timeline', Component: timeline_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/agenda', Component: agenda_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/month-agenda', Component: month_agenda_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/year', Component: year_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/custom-month-view', Component: custom_month_view_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/views-configuration', Component: views_configuration_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/extended-views', Component: extended_views_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/timeline-resources', Component: timeline_resources_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/resources', Component: resources_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/resource', Component: resource_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/group-editing', Component: group_editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/group-custom-work-days', Component: group_custom_work_days_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/add-remove-resources', Component: add_remove_resources_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/adaptive-rows', Component: adaptive_rows_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/resource-grouping', Component: resource_grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/timeline-resource-grouping', Component: timeline_resource_grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/group-by-date', Component: group_by_date_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/group-by-child', Component: group_by_child_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/adaptive-grouping', Component: adaptive_grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/cell-template', Component: cell_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/date-header-template', Component: date_header_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/event-template', Component: event_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/quick-info-template', Component: quick_info_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/editor-validation', Component: editor_validation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/editor-custom-field', Component: editor_custom_field_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/editor-template', Component: editor_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/header-rows', Component: header_rows_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/time-scale', Component: time_scale_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/context-menu', Component: context_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/header-bar', Component: header_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/scroll-to', Component: scroll_to_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/work-days', Component: work_days_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/hide-weekend', Component: hide_weekend_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/work-hours', Component: work_hours_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/start-end-hour', Component: start_end_hour_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/cell-dimension', Component: cell_dimension_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/read-only-events', Component: read_only_events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/reminder', Component: reminder_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/excel-export', Component: excel_export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/calendar-export-import', Component: calendar_export_import_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/recurrence-editor-generate-rule', Component: recurrence_editor_generate_rule_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/recurrence-editor-populate-rule', Component: recurrence_editor_populate_rule_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/clipboard', Component: clipboard_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/keyboard-interaction', Component: keyboard_interaction_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/schedule/events', Component: events_functional_1.default })));
exports.scheduleCategory = { "overview": { "name": "Overview", "category": "Scheduler" }, "default": { "name": "Default Functionalities", "category": "Scheduler" }, "holiday-calendar": { "name": "Holiday Calendar", "category": "Product Use Case" }, "event-calendar": { "name": "Event Calendar", "category": "Product Use Case" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "calendar-integration": { "name": "Sync Google Calendar", "category": "Appointments" }, "realtime-binding": { "name": "Real-Time Binding", "category": "Appointments" }, "recurrence-events": { "name": "Recurring Events", "category": "Appointments" }, "block-events": { "name": "Blocking Dates and Time", "category": "Appointments" }, "search-events": { "name": "Search Events", "category": "Appointments" }, "timezone": { "name": "Timezone", "category": "Appointments" }, "inline-editing": { "name": "Inline Editing", "category": "Appointments" }, "overlap-events": { "name": "Conflict Free Event", "category": "Appointments" }, "external-drag-drop": { "name": "External Drag and Drop", "category": "Drag and Drop" }, "multi-drag": { "name": "Multiple Events Drag", "category": "Drag and Drop" }, "schedule-to-schedule-drag-drop": { "name": "Multiple Scheduler", "category": "Drag and Drop" }, "schedule-to-grid": { "name": "Drag Events From DataGrid", "category": "Drag and Drop" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "data-virtualization": { "name": "Data Virtualization", "category": "Scrolling" }, "views": { "name": "Basic Views", "category": "Views" }, "timeline": { "name": "Timeline Views", "category": "Views" }, "agenda": { "name": "Agenda View", "category": "Views" }, "month-agenda": { "name": "Month Agenda View", "category": "Views" }, "year": { "name": "Year View", "category": "Views" }, "custom-month-view": { "name": "Custom Month View", "category": "Views" }, "views-configuration": { "name": "Individual View Settings", "category": "Views" }, "extended-views": { "name": "View Intervals", "category": "Views" }, "timeline-resources": { "name": "Room Scheduler", "category": "Multiple Resources" }, "resources": { "name": "Fare Calendar", "category": "Multiple Resources" }, "resource": { "name": "Resources", "category": "Multiple Resources" }, "group-editing": { "name": "Shared Events", "category": "Multiple Resources" }, "group-custom-work-days": { "name": "Different Work Days", "category": "Multiple Resources" }, "add-remove-resources": { "name": "Show/Hide Resources", "category": "Multiple Resources" }, "adaptive-rows": { "name": "Row Auto Height", "category": "Multiple Resources" }, "resource-grouping": { "name": "Horizontal Grouping", "category": "Resource Grouping" }, "timeline-resource-grouping": { "name": "Timeline Grouping", "category": "Resource Grouping" }, "group-by-date": { "name": "Date-wise Grouping", "category": "Resource Grouping" }, "group-by-child": { "name": "Hierarchical Grouping", "category": "Resource Grouping" }, "adaptive-grouping": { "name": "Adaptive Grouping", "category": "Resource Grouping" }, "cell-template": { "name": "Cell", "category": "Template" }, "date-header-template": { "name": "Date Header", "category": "Template" }, "event-template": { "name": "Events", "category": "Template" }, "tooltip": { "name": "Tooltip", "category": "Template" }, "quick-info-template": { "name": "Quick Info Template", "category": "Template" }, "editor-validation": { "name": "Field Validation", "category": "Editor Window" }, "editor-custom-field": { "name": "Additional Fields", "category": "Editor Window" }, "editor-template": { "name": "Editor Template", "category": "Editor Window" }, "header-rows": { "name": "Header Rows", "category": "Customization" }, "time-scale": { "name": "Timescale", "category": "Customization" }, "context-menu": { "name": "Context Menu", "category": "Schedule" }, "header-bar": { "name": "Header Bar", "category": "Customization" }, "scroll-to": { "name": "Scroll Time", "category": "Customization" }, "work-days": { "name": "Work Days", "category": "Customization" }, "hide-weekend": { "name": "Hide Non-Working Days", "category": "Customization" }, "work-hours": { "name": "Work Hours", "category": "Customization" }, "start-end-hour": { "name": "Day Hour Limit", "category": "Customization" }, "cell-dimension": { "name": "Cell Dimension", "category": "Customization" }, "read-only-events": { "name": "Read-only Events", "category": "Customization" }, "reminder": { "name": "Reminder", "category": "Customization" }, "excel-export": { "name": "Excel Exporting", "category": "Exporting" }, "calendar-export-import": { "name": "Export and Import ICS", "category": "Exporting" }, "print": { "name": "Print", "category": "Exporting" }, "recurrence-editor-generate-rule": { "name": "Rule Generator", "category": "Recurrence Editor" }, "recurrence-editor-populate-rule": { "name": "Populate Rule", "category": "Recurrence Editor" }, "clipboard": { "name": "Clipboard", "category": "Miscellaneous" }, "keyboard-interaction": { "name": "Keyboard Interaction", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "defaultSample": "schedule/overview" };
