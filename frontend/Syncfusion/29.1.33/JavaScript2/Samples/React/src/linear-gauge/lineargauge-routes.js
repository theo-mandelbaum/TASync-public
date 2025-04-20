"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lineargaugeCategory = exports.lineargaugeRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functionalities_functional_1 = require("./default-functionalities-functional");
var container_functional_1 = require("./container-functional");
var track_functional_1 = require("./track-functional");
var ticks_functional_1 = require("./ticks-functional");
var labels_functional_1 = require("./labels-functional");
var range_functional_1 = require("./range-functional");
var marker_pointer_functional_1 = require("./marker-pointer-functional");
var bar_pointer_functional_1 = require("./bar-pointer-functional");
var custom_pointer_functional_1 = require("./custom-pointer-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var print_export_functional_1 = require("./print-export-functional");
var progress_bar_functional_1 = require("./progress-bar-functional");
var step_progress_bar_functional_1 = require("./step-progress-bar-functional");
var slider_functional_1 = require("./slider-functional");
var thermometer_functional_1 = require("./thermometer-functional");
var steps_counter_functional_1 = require("./steps-counter-functional");
var volume_settings_functional_1 = require("./volume-settings-functional");
var battery_indicator_functional_1 = require("./battery-indicator-functional");
exports.lineargaugeRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/default-functionalities', Component: default_functionalities_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/container', Component: container_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/track', Component: track_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/ticks', Component: ticks_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/labels', Component: labels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/range', Component: range_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/marker-pointer', Component: marker_pointer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/bar-pointer', Component: bar_pointer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/custom-pointer', Component: custom_pointer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/print-export', Component: print_export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/progress-bar', Component: progress_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/step-progress-bar', Component: step_progress_bar_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/slider', Component: slider_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/thermometer', Component: thermometer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/steps-counter', Component: steps_counter_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/volume-settings', Component: volume_settings_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/linear-gauge/battery-indicator', Component: battery_indicator_functional_1.default })));
exports.lineargaugeCategory = { "default-functionalities": { "name": "Default Functionalities", "category": "Linear Gauge" }, "container": { "name": "Container", "category": "Axis" }, "track": { "name": "Track", "category": "Axis" }, "ticks": { "name": "Ticks", "category": "Axis" }, "labels": { "name": "Labels", "category": "Axis" }, "range": { "name": "Range", "category": "Range" }, "marker-pointer": { "name": "Marker Pointer", "category": "Pointer" }, "bar-pointer": { "name": "Bar Pointer", "category": "Pointer" }, "custom-pointer": { "name": "Custom Pointer", "category": "Pointer" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "print-export": { "name": "Print & Export", "category": "Print & Export" }, "progress-bar": { "name": "Progress Bar", "category": "Use Cases" }, "step-progress-bar": { "name": "Step Progress Bar", "category": "Use Cases" }, "slider": { "name": "Slider", "category": "Use Cases" }, "thermometer": { "name": "Thermometer", "category": "Use Cases" }, "steps-counter": { "name": "Steps Counter", "category": "Use Cases" }, "volume-settings": { "name": "Volume Settings", "category": "Use Cases" }, "battery-indicator": { "name": "Battery Indicator", "category": "Use Cases" }, "defaultSample": "linear-gauge/default-functionalities" };
