"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pivottableCategory = exports.pivottableRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var default_functional_1 = require("./default-functional");
var classic_layout_functional_1 = require("./classic-layout-functional");
var live_data_functional_1 = require("./live-data-functional");
var local_functional_1 = require("./local-functional");
var remote_functional_1 = require("./remote-functional");
var server_side_engine_functional_1 = require("./server-side-engine-functional");
var olap_functional_1 = require("./olap-functional");
var performance_functional_1 = require("./performance-functional");
var pivot_chart_functional_1 = require("./pivot-chart-functional");
var external_binding_functional_1 = require("./external-binding-functional");
var heat_map_functional_1 = require("./heat-map-functional");
var field_list_functional_1 = require("./field-list-functional");
var grouping_bar_functional_1 = require("./grouping-bar-functional");
var conditional_formatting_functional_1 = require("./conditional-formatting-functional");
var selection_functional_1 = require("./selection-functional");
var drill_down_functional_1 = require("./drill-down-functional");
var summary_customization_functional_1 = require("./summary-customization-functional");
var grouping_functional_1 = require("./grouping-functional");
var tool_bar_functional_1 = require("./tool-bar-functional");
var keyboard_navigation_functional_1 = require("./keyboard-navigation-functional");
var calculated_field_functional_1 = require("./calculated-field-functional");
var aggregation_functional_1 = require("./aggregation-functional");
var sorting_functional_1 = require("./sorting-functional");
var custom_sorting_functional_1 = require("./custom-sorting-functional");
var value_sorting_functional_1 = require("./value-sorting-functional");
var filtering_functional_1 = require("./filtering-functional");
var label_filtering_functional_1 = require("./label-filtering-functional");
var value_filtering_functional_1 = require("./value-filtering-functional");
var virtual_scrolling_functional_1 = require("./virtual-scrolling-functional");
var paging_functional_1 = require("./paging-functional");
var cell_template_functional_1 = require("./cell-template-functional");
var drill_through_functional_1 = require("./drill-through-functional");
var editing_functional_1 = require("./editing-functional");
var hyper_link_functional_1 = require("./hyper-link-functional");
var defer_update_functional_1 = require("./defer-update-functional");
var exporting_functional_1 = require("./exporting-functional");
exports.pivottableRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/classic-layout', Component: classic_layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/live-data', Component: live_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/local', Component: local_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/remote', Component: remote_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/server-side-engine', Component: server_side_engine_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/olap', Component: olap_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/performance', Component: performance_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/pivot-chart', Component: pivot_chart_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/external-binding', Component: external_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/heat-map', Component: heat_map_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/field-list', Component: field_list_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/grouping-bar', Component: grouping_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/conditional-formatting', Component: conditional_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/drill-down', Component: drill_down_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/summary-customization', Component: summary_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/grouping', Component: grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/tool-bar', Component: tool_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/keyboard-navigation', Component: keyboard_navigation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/calculated-field', Component: calculated_field_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/aggregation', Component: aggregation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/custom-sorting', Component: custom_sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/value-sorting', Component: value_sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/label-filtering', Component: label_filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/value-filtering', Component: value_filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/virtual-scrolling', Component: virtual_scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/paging', Component: paging_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/cell-template', Component: cell_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/drill-through', Component: drill_through_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/editing', Component: editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/hyper-link', Component: hyper_link_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/defer-update', Component: defer_update_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/pivot-table/exporting', Component: exporting_functional_1.default })));
exports.pivottableCategory = { "overview": { "name": "Overview", "category": "Pivot Table" }, "default": { "name": "Default Functionalities", "category": "Pivot Table" }, "classic-layout": { "name": "Classic Layout", "category": "Pivot Table" }, "live-data": { "name": "Live Data", "category": "Pivot Table" }, "local": { "name": "Local Data", "category": "Data Binding" }, "remote": { "name": "Remote Data", "category": "Data Binding" }, "server-side-engine": { "name": "Server-side Aggregation", "category": "Data Binding" }, "olap": { "name": "OLAP", "category": "Data Binding" }, "performance": { "name": "Performance", "category": "Benchmark" }, "pivot-chart": { "name": "Pivot Chart", "category": "Integration" }, "external-binding": { "name": "External Binding", "category": "Integration" }, "heat-map": { "name": "HeatMap", "category": "Integration" }, "field-list": { "name": "Field List", "category": "User Interaction" }, "grouping-bar": { "name": "Grouping Bar", "category": "User Interaction" }, "conditional-formatting": { "name": "Conditional Formatting", "category": "User Interaction" }, "selection": { "name": "Selection", "category": "User Interaction" }, "drill-down": { "name": "Drill Down", "category": "User Interaction" }, "summary-customization": { "name": "Show/Hide Totals", "category": "User Interaction" }, "grouping": { "name": "Grouping", "category": "User Interaction" }, "tool-bar": { "name": "Toolbar", "category": "User Interaction" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "Keyboard Navigation" }, "calculated-field": { "name": "Calculated Field", "category": "Formula" }, "aggregation": { "name": "Aggregation", "category": "Formula" }, "sorting": { "name": "Default Sorting", "category": "Sorting" }, "custom-sorting": { "name": "Custom Sorting", "category": "Sorting" }, "value-sorting": { "name": "Value Sorting", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "label-filtering": { "name": "Label Filtering", "category": "Filtering" }, "value-filtering": { "name": "Value Filtering", "category": "Filtering" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "paging": { "name": "Paging", "category": "Paging" }, "cell-template": { "name": "Cell Template", "category": "Customization" }, "drill-through": { "name": "Drill Through", "category": "Miscellaneous" }, "editing": { "name": "Editing", "category": "Miscellaneous" }, "hyper-link": { "name": "Hyperlink", "category": "Miscellaneous" }, "defer-update": { "name": "Defer Layout Update", "category": "Miscellaneous" }, "exporting": { "name": "Export", "category": "Miscellaneous" }, "defaultSample": "pivot-table/overview" };
