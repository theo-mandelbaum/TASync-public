"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.heatmapchartCategory = exports.heatmapchartRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functionalities_functional_1 = require("./default-functionalities-functional");
var calendar_heatmap_functional_1 = require("./calendar-heatmap-functional");
var bubble_types_functional_1 = require("./bubble-types-functional");
var color_and_size_attributes_functional_1 = require("./color-and-size-attributes-functional");
var row_functional_1 = require("./row-functional");
var cell_functional_1 = require("./cell-functional");
var json_row_functional_1 = require("./json-row-functional");
var json_cell_functional_1 = require("./json-cell-functional");
var empty_points_functional_1 = require("./empty-points-functional");
var inversed_axis_functional_1 = require("./inversed-axis-functional");
var opposed_axis_functional_1 = require("./opposed-axis-functional");
var label_template_functional_1 = require("./label-template-functional");
var multi_level_labels_functional_1 = require("./multi-level-labels-functional");
var cell_selection_functional_1 = require("./cell-selection-functional");
var legend_placement_functional_1 = require("./legend-placement-functional");
var large_data_functional_1 = require("./large-data-functional");
var palette_mode_functional_1 = require("./palette-mode-functional");
var color_range_functional_1 = require("./color-range-functional");
var rendering_mode_functional_1 = require("./rendering-mode-functional");
var tooltip_template_functional_1 = require("./tooltip-template-functional");
exports.heatmapchartRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/default-functionalities', Component: default_functionalities_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/calendar-heatmap', Component: calendar_heatmap_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/bubble-types', Component: bubble_types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/color-and-size-attributes', Component: color_and_size_attributes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/row', Component: row_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/cell', Component: cell_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/json-row', Component: json_row_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/json-cell', Component: json_cell_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/empty-points', Component: empty_points_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/inversed-axis', Component: inversed_axis_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/opposed-axis', Component: opposed_axis_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/label-template', Component: label_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/multi-level-labels', Component: multi_level_labels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/cell-selection', Component: cell_selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/legend-placement', Component: legend_placement_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/large-data', Component: large_data_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/palette-mode', Component: palette_mode_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/color-range', Component: color_range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/rendering-mode', Component: rendering_mode_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/heatmap-chart/tooltip-template', Component: tooltip_template_functional_1.default })));
exports.heatmapchartCategory = { "default-functionalities": { "name": "Default Functionalities", "category": "Heatmap Chart" }, "calendar-heatmap": { "name": "Calendar Heatmap", "category": "Heatmap Chart" }, "bubble-types": { "name": "Bubble Types", "category": "Bubble Heatmap" }, "color-and-size-attributes": { "name": "Color and Size Attributes", "category": "Bubble Heatmap" }, "row": { "name": "Row", "category": "Data Binding" }, "cell": { "name": "Cell", "category": "Data Binding" }, "json-row": { "name": "JSON Row", "category": "Data Binding" }, "json-cell": { "name": "JSON Cell", "category": "Data Binding" }, "empty-points": { "name": "Empty points", "category": "Features" }, "inversed-axis": { "name": "Inversed Axis", "category": "Features" }, "opposed-axis": { "name": "Opposed Axis", "category": "Features" }, "label-template": { "name": "Label Template", "category": "Features" }, "multi-level-labels": { "name": "Multi Level Labels", "category": "Features" }, "cell-selection": { "name": "Selection", "category": "Features" }, "legend-placement": { "name": "Legend Placement", "category": "Features" }, "large-data": { "name": "Large Data", "category": "Features" }, "palette-mode": { "name": "Palette Mode", "category": "Features" }, "color-range": { "name": "Color Range", "category": "Features" }, "rendering-mode": { "name": "Rendering mode", "category": "Features" }, "tooltip-template": { "name": "Tooltip Template", "category": "Features" }, "defaultSample": "heatmap-chart/default-functionalities" };
