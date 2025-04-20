"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treegridCategory = exports.treegridRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var treegrid_overview_functional_1 = require("./treegrid-overview-functional");
var live_data_functional_1 = require("./live-data-functional");
var default_functional_1 = require("./default-functional");
var adaptive_functional_1 = require("./adaptive-functional");
var loading_animation_functional_1 = require("./loading-animation-functional");
var localdata_functional_1 = require("./localdata-functional");
var remote_data_functional_1 = require("./remote-data-functional");
var selfreference_functional_1 = require("./selfreference-functional");
var columntemplate_functional_1 = require("./columntemplate-functional");
var header_template_functional_1 = require("./header-template-functional");
var columnformatting_functional_1 = require("./columnformatting-functional");
var cellalignment_functional_1 = require("./cellalignment-functional");
var reorder_functional_1 = require("./reorder-functional");
var stacked_header_functional_1 = require("./stacked-header-functional");
var column_menu_functional_1 = require("./column-menu-functional");
var autowrap_functional_1 = require("./autowrap-functional");
var column_chooser_functional_1 = require("./column-chooser-functional");
var showhidecolumn_functional_1 = require("./showhidecolumn-functional");
var checkbox_column_functional_1 = require("./checkbox-column-functional");
var row_template_functional_1 = require("./row-template-functional");
var detail_template_functional_1 = require("./detail-template-functional");
var drag_anddrop_functional_1 = require("./drag-anddrop-functional");
var drag_drop_functional_1 = require("./drag-drop-functional");
var rowhover_functional_1 = require("./rowhover-functional");
var rowheight_functional_1 = require("./rowheight-functional");
var inline_editing_functional_1 = require("./inline-editing-functional");
var dialog_editing_functional_1 = require("./dialog-editing-functional");
var batch_edit_functional_1 = require("./batch-edit-functional");
var commandcolumn_functional_1 = require("./commandcolumn-functional");
var celledittype_functional_1 = require("./celledittype-functional");
var edittemplate_functional_1 = require("./edittemplate-functional");
var lockrow_functional_1 = require("./lockrow-functional");
var sorting_functional_1 = require("./sorting-functional");
var sortingapi_functional_1 = require("./sortingapi-functional");
var filtering_functional_1 = require("./filtering-functional");
var filter_menu_functional_1 = require("./filter-menu-functional");
var searching_functional_1 = require("./searching-functional");
var paging_functional_1 = require("./paging-functional");
var pagingapi_functional_1 = require("./pagingapi-functional");
var defaultscrolling_functional_1 = require("./defaultscrolling-functional");
var frozencolumn_functional_1 = require("./frozencolumn-functional");
var frozen_api_functional_1 = require("./frozen-api-functional");
var virtualscrolling_functional_1 = require("./virtualscrolling-functional");
var infinitescrolling_functional_1 = require("./infinitescrolling-functional");
var aggregate_default_functional_1 = require("./aggregate-default-functional");
var custom_aggregate_functional_1 = require("./custom-aggregate-functional");
var selection_functional_1 = require("./selection-functional");
var selectionapi_functional_1 = require("./selectionapi-functional");
var checkbox_selection_functional_1 = require("./checkbox-selection-functional");
var export_functional_1 = require("./export-functional");
var print_functional_1 = require("./print-functional");
var contextmenu_functional_1 = require("./contextmenu-functional");
var customcontextmenu_functional_1 = require("./customcontextmenu-functional");
var gridlines_functional_1 = require("./gridlines-functional");
var clipboard_functional_1 = require("./clipboard-functional");
var conditionalformatting_functional_1 = require("./conditionalformatting-functional");
var toolbar_template_functional_1 = require("./toolbar-template-functional");
var events_functional_1 = require("./events-functional");
var keyboard_functional_1 = require("./keyboard-functional");
exports.treegridRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/treegrid-overview', Component: treegrid_overview_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/live-data', Component: live_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/adaptive', Component: adaptive_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/loading-animation', Component: loading_animation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/localdata', Component: localdata_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/remote-data', Component: remote_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/selfreference', Component: selfreference_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/columntemplate', Component: columntemplate_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/header-template', Component: header_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/columnformatting', Component: columnformatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/cellalignment', Component: cellalignment_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/reorder', Component: reorder_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/stacked-header', Component: stacked_header_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/column-menu', Component: column_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/autowrap', Component: autowrap_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/column-chooser', Component: column_chooser_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/showhidecolumn', Component: showhidecolumn_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/checkbox-column', Component: checkbox_column_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/row-template', Component: row_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/detail-template', Component: detail_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/drag-anddrop', Component: drag_anddrop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/drag-drop', Component: drag_drop_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/rowhover', Component: rowhover_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/rowheight', Component: rowheight_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/inline-editing', Component: inline_editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/dialog-editing', Component: dialog_editing_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/batch-edit', Component: batch_edit_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/commandcolumn', Component: commandcolumn_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/celledittype', Component: celledittype_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/edittemplate', Component: edittemplate_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/lockrow', Component: lockrow_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/sorting', Component: sorting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/sortingapi', Component: sortingapi_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/filtering', Component: filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/filter-menu', Component: filter_menu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/searching', Component: searching_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/paging', Component: paging_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/pagingapi', Component: pagingapi_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/defaultscrolling', Component: defaultscrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/frozencolumn', Component: frozencolumn_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/frozen-api', Component: frozen_api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/virtualscrolling', Component: virtualscrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/infinitescrolling', Component: infinitescrolling_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/aggregate-default', Component: aggregate_default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/custom-aggregate', Component: custom_aggregate_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/selectionapi', Component: selectionapi_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/checkbox-selection', Component: checkbox_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/export', Component: export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/contextmenu', Component: contextmenu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/customcontextmenu', Component: customcontextmenu_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/gridlines', Component: gridlines_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/clipboard', Component: clipboard_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/conditionalformatting', Component: conditionalformatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/toolbar-template', Component: toolbar_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/events', Component: events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treegrid/keyboard', Component: keyboard_functional_1.default })));
exports.treegridCategory = { "treegrid-overview": { "name": "Overview", "category": "Tree Grid" }, "live-data": { "name": "Live Data", "category": "Tree Grid" }, "default": { "name": "Default Functionalities", "category": "Tree Grid" }, "adaptive": { "name": "Adaptive Layout ", "category": "Tree Grid" }, "loading-animation": { "name": "Loading Animation", "category": "Tree Grid" }, "localdata": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "selfreference": { "name": "Self Reference Data", "category": "Data Binding" }, "columntemplate": { "name": "Column Template", "category": "Columns" }, "header-template": { "name": "Header Template", "category": "Columns" }, "columnformatting": { "name": "Column Formatting", "category": "Columns" }, "cellalignment": { "name": "Cell Alignment", "category": "Columns" }, "reorder": { "name": "Reorder", "category": "Columns" }, "stacked-header": { "name": "Stacked Header", "category": "Columns" }, "column-menu": { "name": "Column Menu", "category": "Columns" }, "autowrap": { "name": "Auto Wrap Column Cells", "category": "Columns" }, "column-chooser": { "name": "Column Chooser", "category": "Columns" }, "showhidecolumn": { "name": "Show or Hide Column", "category": "Columns" }, "checkbox-column": { "name": "Checkbox Column", "category": "Columns" }, "row-template": { "name": "Row Template", "category": "Rows" }, "detail-template": { "name": "Detail Template", "category": "Rows" }, "drag-anddrop": { "name": "Drag and Drop", "category": "Rows" }, "drag-drop": { "name": "Drag and Drop within Tree Grid", "category": "Rows" }, "rowhover": { "name": "Row Hover", "category": "Rows" }, "rowheight": { "name": "Row Height", "category": "Rows" }, "inline-editing": { "name": "Inline Editing", "category": "Editing" }, "dialog-editing": { "name": "Dialog Editing", "category": "Editing" }, "batch-edit": { "name": "Batch Editing", "category": "Editing" }, "commandcolumn": { "name": "Command Column", "category": "Editing" }, "celledittype": { "name": "Cell Edit Type", "category": "Editing" }, "edittemplate": { "name": "Edit Template", "category": "Editing" }, "lockrow": { "name": "Lock Row", "category": "Editing" }, "sorting": { "name": "Multi Sorting", "category": "Sorting" }, "sortingapi": { "name": "Sorting API", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "filter-menu": { "name": "Menu Filter", "category": "Filtering" }, "searching": { "name": "Search", "category": "Filtering" }, "paging": { "name": "Pager Dropdown", "category": "Paging" }, "pagingapi": { "name": "Paging API", "category": "Paging" }, "defaultscrolling": { "name": "Default Scrolling", "category": "Scrolling" }, "frozencolumn": { "name": "Frozen Columns", "category": "Scrolling" }, "frozen-api": { "name": "Freeze Direction", "category": "Scrolling" }, "virtualscrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "infinitescrolling": { "name": "Infinite Scrolling", "category": "Scrolling" }, "aggregate-default": { "name": "Default Aggregate", "category": "Aggregates" }, "custom-aggregate": { "name": "Custom Aggregate", "category": "Aggregates" }, "selection": { "name": "Default Selection", "category": "Selection" }, "selectionapi": { "name": "Selection API", "category": "Selection" }, "checkbox-selection": { "name": "Checkbox Selection", "category": "Selection" }, "export": { "name": "Default Exporting", "category": "Exporting" }, "print": { "name": "Print", "category": "Exporting" }, "contextmenu": { "name": "Default Context Menu", "category": "Context Menu" }, "customcontextmenu": { "name": "Custom Context Menu", "category": "Context Menu" }, "gridlines": { "name": "Gridlines", "category": "Miscellaneous" }, "clipboard": { "name": "Clipboard", "category": "Miscellaneous" }, "conditionalformatting": { "name": "Conditional Formatting", "category": "Miscellaneous" }, "toolbar-template": { "name": "Toolbar Template", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "keyboard": { "name": "Keyboard Navigation", "category": "Miscellaneous" }, "defaultSample": "treegrid/treegrid-overview" };
