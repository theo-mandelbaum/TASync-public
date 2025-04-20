"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.progressbarCategory = exports.progressbarRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var linear_functional_1 = require("./linear-functional");
var circular_functional_1 = require("./circular-functional");
var semi_circular_functional_1 = require("./semi-circular-functional");
var custom_content_functional_1 = require("./custom-content-functional");
var labels_functional_1 = require("./labels-functional");
var radius_functional_1 = require("./radius-functional");
var tool_tip_functional_1 = require("./tool-tip-functional");
var stripes_functional_1 = require("./stripes-functional");
var progress_segment_functional_1 = require("./progress-segment-functional");
exports.progressbarRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/linear', Component: linear_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/circular', Component: circular_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/semi-circular', Component: semi_circular_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/custom-content', Component: custom_content_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/labels', Component: labels_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/radius', Component: radius_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/tool-tip', Component: tool_tip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/stripes', Component: stripes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/progress-bar/progress-segment', Component: progress_segment_functional_1.default })));
exports.progressbarCategory = { "linear": { "name": "Linear", "category": "Progress Bar" }, "circular": { "name": "Circular", "category": "Progress Bar" }, "semi-circular": { "name": "Angle", "category": "Progress Bar" }, "custom-content": { "name": "Custom Contents", "category": "Progress Bar" }, "labels": { "name": "Labels", "category": "Progress Bar" }, "radius": { "name": "Radius", "category": "Progress Bar" }, "tool-tip": { "name": "Tooltip", "category": "Progress Bar" }, "stripes": { "name": "Stripes", "category": "Progress Bar" }, "progress-segment": { "name": "Progress Segment", "category": "Progress Bar" }, "defaultSample": "progress-bar/linear" };
