"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circulargaugeCategory = exports.circulargaugeRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functionalities_functional_1 = require("./default-functionalities-functional");
var ticks_and_labels_functional_1 = require("./ticks-and-labels-functional");
var multiple_axes_functional_1 = require("./multiple-axes-functional");
var custom_labels_functional_1 = require("./custom-labels-functional");
var range_color_for_axis_functional_1 = require("./range-color-for-axis-functional");
var axis_background_functional_1 = require("./axis-background-functional");
var pointer_types_functional_1 = require("./pointer-types-functional");
var text_pointer_functional_1 = require("./text-pointer-functional");
var image_pointer_functional_1 = require("./image-pointer-functional");
var range_customization_functional_1 = require("./range-customization-functional");
var multiple_ranges_functional_1 = require("./multiple-ranges-functional");
var legend_functional_1 = require("./legend-functional");
var arc_gauge_functional_1 = require("./arc-gauge-functional");
var semi_circular_gauge_functional_1 = require("./semi-circular-gauge-functional");
var pointer_ranges_drag_functional_1 = require("./pointer-ranges-drag-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var print_export_functional_1 = require("./print-export-functional");
var clock_functional_1 = require("./clock-functional");
var radial_slider_functional_1 = require("./radial-slider-functional");
var direction_compass_functional_1 = require("./direction-compass-functional");
var speedometer_functional_1 = require("./speedometer-functional");
var sleep_tracker_functional_1 = require("./sleep-tracker-functional");
var data_sample_functional_1 = require("./data-sample-functional");
var apple_watch_rings_functional_1 = require("./apple-watch-rings-functional");
exports.circulargaugeRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/default-functionalities', Component: default_functionalities_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/ticks-and-labels', Component: ticks_and_labels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/multiple-axes', Component: multiple_axes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/custom-labels', Component: custom_labels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/range-color-for-axis', Component: range_color_for_axis_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/axis-background', Component: axis_background_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/pointer-types', Component: pointer_types_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/text-pointer', Component: text_pointer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/image-pointer', Component: image_pointer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/range-customization', Component: range_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/multiple-ranges', Component: multiple_ranges_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/legend', Component: legend_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/arc-gauge', Component: arc_gauge_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/semi-circular-gauge', Component: semi_circular_gauge_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/pointer-ranges-drag', Component: pointer_ranges_drag_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/print-export', Component: print_export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/clock', Component: clock_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/radial-slider', Component: radial_slider_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/direction-compass', Component: direction_compass_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/speedometer', Component: speedometer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/sleep-tracker', Component: sleep_tracker_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/data-sample', Component: data_sample_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/circular-gauge/apple-watch-rings', Component: apple_watch_rings_functional_1.default })));
exports.circulargaugeCategory = { "default-functionalities": { "name": "Default Functionalities", "category": "Circular Gauge" }, "ticks-and-labels": { "name": "Ticks and Labels", "category": "Axis" }, "multiple-axes": { "name": "Multiple Axes", "category": "Axis" }, "custom-labels": { "name": "Custom Labels", "category": "Axis" }, "range-color-for-axis": { "name": "Range Color for Axis", "category": "Axis" }, "axis-background": { "name": "Axis Background", "category": "Axis" }, "pointer-types": { "name": "Pointer Types", "category": "Pointer" }, "text-pointer": { "name": "Text Pointer", "category": "Pointer" }, "image-pointer": { "name": "Image Pointer", "category": "Pointer" }, "range-customization": { "name": "Range Customization", "category": "Range" }, "multiple-ranges": { "name": "Multiple Ranges", "category": "Range" }, "legend": { "name": "Legend", "category": "Range" }, "arc-gauge": { "name": "Arc Gauge", "category": "Arc Gauge" }, "semi-circular-gauge": { "name": "Semi-circular Gauge", "category": "Arc Gauge" }, "pointer-ranges-drag": { "name": "Pointer & Ranges Drag", "category": "User Interaction" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "print-export": { "name": "Print & Export", "category": "Print & Export" }, "clock": { "name": "Clock", "category": "Use Cases" }, "radial-slider": { "name": "Radial Slider", "category": "Use Cases" }, "direction-compass": { "name": "Direction Compass", "category": "Use Cases" }, "speedometer": { "name": "Speedometer", "category": "Use Cases" }, "sleep-tracker": { "name": "Sleep Tracker", "category": "Use Cases" }, "data-sample": { "name": "Data Sample", "category": "Use Cases" }, "apple-watch-rings": { "name": "Apple Watch Rings", "category": "Use Cases" }, "defaultSample": "circular-gauge/default-functionalities" };
