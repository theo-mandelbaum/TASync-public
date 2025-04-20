"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kanbanCategory = exports.kanbanRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var default_functional_1 = require("./default-functional");
var swimlane_functional_1 = require("./swimlane-functional");
var workflow_functional_1 = require("./workflow-functional");
var stacked_header_functional_1 = require("./stacked-header-functional");
var dialog_editing_functional_1 = require("./dialog-editing-functional");
var search_filter_functional_1 = require("./search-filter-functional");
var sorting_functional_1 = require("./sorting-functional");
var virtual_scrolling_functional_1 = require("./virtual-scrolling-functional");
var local_data_functional_1 = require("./local-data-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var header_template_functional_1 = require("./header-template-functional");
var swimlane_template_functional_1 = require("./swimlane-template-functional");
var card_template_functional_1 = require("./card-template-functional");
var tooltip_template_functional_1 = require("./tooltip-template-functional");
var toggle_columns_functional_1 = require("./toggle-columns-functional");
var show_hide_functional_1 = require("./show-hide-functional");
var wip_validation_functional_1 = require("./wip-validation-functional");
var api_functional_1 = require("./api-functional");
var events_functional_1 = require("./events-functional");
exports.kanbanRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/swimlane', Component: swimlane_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/workflow', Component: workflow_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/stacked-header', Component: stacked_header_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/dialog-editing', Component: dialog_editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/search-filter', Component: search_filter_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/virtual-scrolling', Component: virtual_scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/local-data', Component: local_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/header-template', Component: header_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/swimlane-template', Component: swimlane_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/card-template', Component: card_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/tooltip-template', Component: tooltip_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/toggle-columns', Component: toggle_columns_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/show-hide', Component: show_hide_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/wip-validation', Component: wip_validation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/kanban/events', Component: events_functional_1.default })));
exports.kanbanCategory = { "overview": { "name": "Overview", "category": "Kanban" }, "default": { "name": "Default Functionalities", "category": "Kanban" }, "swimlane": { "name": "Swimlane", "category": "Kanban" }, "workflow": { "name": "Workflow", "category": "Kanban" }, "stacked-header": { "name": "Stacked Header", "category": "Kanban" }, "dialog-editing": { "name": "Dialog Editing", "category": "Kanban" }, "search-filter": { "name": "Search and Filter Cards", "category": "Kanban" }, "sorting": { "name": "Sorting Cards", "category": "Kanban" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Kanban" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "header-template": { "name": "Header Template", "category": "Templates" }, "swimlane-template": { "name": "Swimlane Template", "category": "Templates" }, "card-template": { "name": "Card Template", "category": "Templates" }, "tooltip-template": { "name": "Tooltip Template", "category": "Templates" }, "toggle-columns": { "name": "Toggle Columns", "category": "Columns" }, "show-hide": { "name": "Show/Hide Columns", "category": "Columns" }, "wip-validation": { "name": "WIP Validation", "category": "Validation" }, "api": { "name": "API", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "defaultSample": "kanban/overview" };
