"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridCategory = exports.gridRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var overview_functional_1 = require("./overview-functional");
var live_data_functional_1 = require("./live-data-functional");
var default_functional_1 = require("./default-functional");
var adaptive_layout_functional_1 = require("./adaptive-layout-functional");
var loading_animation_functional_1 = require("./loading-animation-functional");
var empty_record_template_functional_1 = require("./empty-record-template-functional");
var fifa_statistics_functional_1 = require("./fifa-statistics-functional");
var local_binding_functional_1 = require("./local-binding-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var custom_binding_functional_1 = require("./custom-binding-functional");
var column_template_functional_1 = require("./column-template-functional");
var header_template_functional_1 = require("./header-template-functional");
var stacked_header_functional_1 = require("./stacked-header-functional");
var foreign_key_functional_1 = require("./foreign-key-functional");
var reorder_functional_1 = require("./reorder-functional");
var column_resizing_functional_1 = require("./column-resizing-functional");
var column_menu_functional_1 = require("./column-menu-functional");
var auto_wrap_functional_1 = require("./auto-wrap-functional");
var column_chooser_functional_1 = require("./column-chooser-functional");
var show_hide_functional_1 = require("./show-hide-functional");
var column_spanning_functional_1 = require("./column-spanning-functional");
var row_template_functional_1 = require("./row-template-functional");
var detail_template_functional_1 = require("./detail-template-functional");
var row_drag_drop_functional_1 = require("./row-drag-drop-functional");
var drag_drop_within_grid_functional_1 = require("./drag-drop-within-grid-functional");
var row_height_functional_1 = require("./row-height-functional");
var row_spanning_functional_1 = require("./row-spanning-functional");
var normal_edit_functional_1 = require("./normal-edit-functional");
var dialog_edit_functional_1 = require("./dialog-edit-functional");
var dialog_template_functional_1 = require("./dialog-template-functional");
var batch_functional_1 = require("./batch-functional");
var command_column_functional_1 = require("./command-column-functional");
var sorting_functional_1 = require("./sorting-functional");
var filtering_functional_1 = require("./filtering-functional");
var filter_template_functional_1 = require("./filter-template-functional");
var filter_menu_functional_1 = require("./filter-menu-functional");
var searching_functional_1 = require("./searching-functional");
var paging_functional_1 = require("./paging-functional");
var grouping_functional_1 = require("./grouping-functional");
var aggregate_default_functional_1 = require("./aggregate-default-functional");
var aggregate_group_functional_1 = require("./aggregate-group-functional");
var reactive_aggregate_functional_1 = require("./reactive-aggregate-functional");
var selection_functional_1 = require("./selection-functional");
var selection_api_functional_1 = require("./selection-api-functional");
var checkbox_selection_functional_1 = require("./checkbox-selection-functional");
var hierarchy_functional_1 = require("./hierarchy-functional");
var master_detail_functional_1 = require("./master-detail-functional");
var scrolling_functional_1 = require("./scrolling-functional");
var sticky_header_functional_1 = require("./sticky-header-functional");
var frozen_rows_columns_functional_1 = require("./frozen-rows-columns-functional");
var frozen_api_functional_1 = require("./frozen-api-functional");
var virtualization_functional_1 = require("./virtualization-functional");
var infinite_scrolling_functional_1 = require("./infinite-scrolling-functional");
var lazy_load_grouping_with_paging_functional_1 = require("./lazy-load-grouping-with-paging-functional");
var lazy_load_grouping_with_infinite_scrolling_functional_1 = require("./lazy-load-grouping-with-infinite-scrolling-functional");
var lazy_load_grouping_with_virtual_scrolling_functional_1 = require("./lazy-load-grouping-with-virtual-scrolling-functional");
var default_exporting_functional_1 = require("./default-exporting-functional");
var advanced_exporting_functional_1 = require("./advanced-exporting-functional");
var master_details_export_functional_1 = require("./master-details-export-functional");
var detail_template_exporting_functional_1 = require("./detail-template-exporting-functional");
var multiple_export_functional_1 = require("./multiple-export-functional");
var print_functional_1 = require("./print-functional");
var grid_lines_functional_1 = require("./grid-lines-functional");
var context_menu_functional_1 = require("./context-menu-functional");
var clipboard_functional_1 = require("./clipboard-functional");
var keyboard_navigation_functional_1 = require("./keyboard-navigation-functional");
var enable_rtl_functional_1 = require("./enable-rtl-functional");
exports.gridRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/overview', Component: overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/live-data', Component: live_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/adaptive-layout', Component: adaptive_layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/loading-animation', Component: loading_animation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/empty-record-template', Component: empty_record_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/fifa-statistics', Component: fifa_statistics_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/local-binding', Component: local_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/custom-binding', Component: custom_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-template', Component: column_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/header-template', Component: header_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/stacked-header', Component: stacked_header_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/foreign-key', Component: foreign_key_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/reorder', Component: reorder_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-resizing', Component: column_resizing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-menu', Component: column_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/auto-wrap', Component: auto_wrap_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-chooser', Component: column_chooser_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/show-hide', Component: show_hide_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/column-spanning', Component: column_spanning_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-template', Component: row_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/detail-template', Component: detail_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-drag-drop', Component: row_drag_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/drag-drop-within-grid', Component: drag_drop_within_grid_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-height', Component: row_height_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/row-spanning', Component: row_spanning_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/normal-edit', Component: normal_edit_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/dialog-edit', Component: dialog_edit_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/dialog-template', Component: dialog_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/batch', Component: batch_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/command-column', Component: command_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/filter-template', Component: filter_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/filter-menu', Component: filter_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/searching', Component: searching_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/paging', Component: paging_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/grouping', Component: grouping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/aggregate-default', Component: aggregate_default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/aggregate-group', Component: aggregate_group_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/reactive-aggregate', Component: reactive_aggregate_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/selection-api', Component: selection_api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/checkbox-selection', Component: checkbox_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/hierarchy', Component: hierarchy_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/master-detail', Component: master_detail_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/scrolling', Component: scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/sticky-header', Component: sticky_header_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/frozen-rows-columns', Component: frozen_rows_columns_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/frozen-api', Component: frozen_api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/virtualization', Component: virtualization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/infinite-scrolling', Component: infinite_scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/lazy-load-grouping-with-paging', Component: lazy_load_grouping_with_paging_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/lazy-load-grouping-with-infinite-scrolling', Component: lazy_load_grouping_with_infinite_scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/lazy-load-grouping-with-virtual-scrolling', Component: lazy_load_grouping_with_virtual_scrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/default-exporting', Component: default_exporting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/advanced-exporting', Component: advanced_exporting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/master-details-export', Component: master_details_export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/detail-template-exporting', Component: detail_template_exporting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/multiple-export', Component: multiple_export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/grid-lines', Component: grid_lines_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/context-menu', Component: context_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/clipboard', Component: clipboard_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/keyboard-navigation', Component: keyboard_navigation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/grid/enable-rtl', Component: enable_rtl_functional_1.default })));
exports.gridCategory = { "overview": { "name": "Overview", "category": "Data Grid" }, "live-data": { "name": "Live Data", "category": "Data Grid" }, "default": { "name": "Default Functionalities", "category": "Data Grid" }, "adaptive-layout": { "name": "Adaptive Layout", "category": "Data Grid" }, "loading-animation": { "name": "Loading Animation", "category": "Data Grid" }, "empty-record-template": { "name": "Empty Record Template", "category": "Data Grid" }, "fifa-statistics": { "name": "FIFA Statistics", "category": "Product Use Case" }, "local-binding": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "custom-binding": { "name": "Custom Binding", "category": "Data Binding" }, "column-template": { "name": "Column Template", "category": "Columns" }, "header-template": { "name": "Header Template", "category": "Columns" }, "stacked-header": { "name": "Stacked Header", "category": "Columns" }, "foreign-key": { "name": "Foreign Key Column", "category": "Columns" }, "reorder": { "name": "Reorder", "category": "Columns" }, "column-resizing": { "name": "AutoFit and Resizing", "category": "Columns" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "auto-wrap": { "name": "AutoWrap Column cells", "category": "Columns" }, "column-chooser": { "name": "Column Chooser", "category": "Columns" }, "show-hide": { "name": "Show or Hide Column", "category": "Columns" }, "column-spanning": { "name": "Column Spanning", "category": "Columns" }, "row-template": { "name": "Row Template", "category": "Rows" }, "detail-template": { "name": "Detail Template", "category": "Rows" }, "row-drag-drop": { "name": "Drag and Drop", "category": "Rows" }, "drag-drop-within-grid": { "name": "Drag and Drop within Grid", "category": "Rows" }, "row-height": { "name": "Row Height", "category": "Rows" }, "row-spanning": { "name": "Row Spanning", "category": "Rows" }, "normal-edit": { "name": "Inline Editing", "category": "Editing" }, "dialog-edit": { "name": "Dialog Editing", "category": "Editing" }, "dialog-template": { "name": "Dialog Template", "category": "Editing" }, "batch": { "name": "Batch Editing", "category": "Editing" }, "command-column": { "name": "CommandColumn", "category": "Editing" }, "sorting": { "name": "Sorting", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "filter-template": { "name": "Filter Template", "category": "Filtering" }, "filter-menu": { "name": "Filter Menu", "category": "Filtering" }, "searching": { "name": "Search", "category": "Filtering" }, "paging": { "name": "Paging", "category": "Paging" }, "grouping": { "name": "Grouping", "category": "Grouping" }, "aggregate-default": { "name": "Default Aggregate", "category": "Aggregates" }, "aggregate-group": { "name": "Group and Caption Aggregate", "category": "Aggregates" }, "reactive-aggregate": { "name": "Reactive Aggregate", "category": "Aggregates" }, "selection": { "name": "Default Selection", "category": "Selection" }, "selection-api": { "name": "Selection API", "category": "Selection" }, "checkbox-selection": { "name": "Checkbox Selection", "category": "Selection" }, "hierarchy": { "name": "Hierarchy Grid", "category": "Relational Binding" }, "master-detail": { "name": "Master/Detail", "category": "Relational Binding" }, "scrolling": { "name": "Default Scrolling", "category": "Scrolling" }, "sticky-header": { "name": "Sticky Header", "category": "Scrolling" }, "frozen-rows-columns": { "name": "Frozen Rows and Columns", "category": "Scrolling" }, "frozen-api": { "name": "Frozen API", "category": "Scrolling" }, "virtualization": { "name": "Virtual Scrolling", "category": "Scrolling" }, "infinite-scrolling": { "name": "Infinite Scrolling", "category": "Scrolling" }, "lazy-load-grouping-with-paging": { "name": "Grouping with Paging", "category": "Lazy Load Grouping" }, "lazy-load-grouping-with-infinite-scrolling": { "name": "Grouping with Infinite Scrolling", "category": "Lazy Load Grouping" }, "lazy-load-grouping-with-virtual-scrolling": { "name": "Grouping with Virtual Scrolling", "category": "Lazy Load Grouping" }, "default-exporting": { "name": "Default Exporting", "category": "Exporting" }, "advanced-exporting": { "name": "Advanced Exporting", "category": "Exporting" }, "master-details-export": { "name": "Hierarchy Exporting", "category": "Exporting" }, "detail-template-exporting": { "name": "Detail Template Exporting", "category": "Exporting" }, "multiple-export": { "name": "Multiple Exporting", "category": "Exporting" }, "print": { "name": "Print", "category": "Exporting" }, "grid-lines": { "name": "GridLines", "category": "Miscellaneous" }, "context-menu": { "name": "Context Menu", "category": "Miscellaneous" }, "clipboard": { "name": "Clipboard", "category": "Miscellaneous" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "Miscellaneous" }, "enable-rtl": { "name": "RTL", "category": "Miscellaneous" }, "defaultSample": "grid/overview" };
