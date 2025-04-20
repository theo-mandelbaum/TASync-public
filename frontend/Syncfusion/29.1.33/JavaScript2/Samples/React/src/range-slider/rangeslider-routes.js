"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangesliderCategory = exports.rangesliderRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var ticks_functional_1 = require("./ticks-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var orientation_functional_1 = require("./orientation-functional");
var format_functional_1 = require("./format-functional");
var limits_functional_1 = require("./limits-functional");
var api_functional_1 = require("./api-functional");
var events_functional_1 = require("./events-functional");
var thumb_customization_functional_1 = require("./thumb-customization-functional");
var selection_bar_customization_functional_1 = require("./selection-bar-customization-functional");
var ticks_customization_functional_1 = require("./ticks-customization-functional");
var tooltip_customization_functional_1 = require("./tooltip-customization-functional");
var azure_pricing_functional_1 = require("./azure-pricing-functional");
exports.rangesliderRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/ticks', Component: ticks_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/orientation', Component: orientation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/format', Component: format_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/limits', Component: limits_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/api', Component: api_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/events', Component: events_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/thumb-customization', Component: thumb_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/selection-bar-customization', Component: selection_bar_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/ticks-customization', Component: ticks_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/tooltip-customization', Component: tooltip_customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/range-slider/azure-pricing', Component: azure_pricing_functional_1.default })));
exports.rangesliderCategory = { "default": { "name": "Default Functionalities", "category": "Range Slider" }, "ticks": { "name": "Ticks", "category": "Range Slider" }, "tooltip": { "name": "Tooltip", "category": "Range Slider" }, "orientation": { "name": "Vertical Orientation", "category": "Range Slider" }, "format": { "name": "Formatting", "category": "Range Slider" }, "limits": { "name": "Limits", "category": "Range Slider" }, "api": { "name": "API", "category": "Range Slider" }, "events": { "name": "Events", "category": "Range Slider" }, "thumb-customization": { "name": "Thumb", "category": "Customization" }, "selection-bar-customization": { "name": "Bar", "category": "Customization" }, "ticks-customization": { "name": "Ticks", "category": "Customization" }, "tooltip-customization": { "name": "Tooltip", "category": "Customization" }, "azure-pricing": { "name": "Cloud Pricing", "category": "Use Case" }, "defaultSample": "range-slider/default" };
