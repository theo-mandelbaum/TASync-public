"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.treemapCategory = exports.treemapRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var layout_functional_1 = require("./layout-functional");
var drilldown_functional_1 = require("./drilldown-functional");
var customization_functional_1 = require("./customization-functional");
var label_functional_1 = require("./label-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var election_functional_1 = require("./election-functional");
var color_mapping_functional_1 = require("./color-mapping-functional");
var selection_functional_1 = require("./selection-functional");
var print_functional_1 = require("./print-functional");
var pie_functional_1 = require("./pie-functional");
var rtl_functional_1 = require("./rtl-functional");
exports.treemapRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/layout', Component: layout_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/drilldown', Component: drilldown_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/customization', Component: customization_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/label', Component: label_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/election', Component: election_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/color-mapping', Component: color_mapping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/pie', Component: pie_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/treemap/rtl', Component: rtl_functional_1.default })));
exports.treemapCategory = { "default": { "name": "Default Functionalities", "category": "TreeMap" }, "layout": { "name": "Layout", "category": "TreeMap" }, "drilldown": { "name": "Drilldown", "category": "TreeMap" }, "customization": { "name": "Customization", "category": "TreeMap" }, "label": { "name": "Data Label", "category": "TreeMap" }, "tooltip": { "name": "Tooltip", "category": "TreeMap" }, "election": { "name": "Legend", "category": "TreeMap" }, "color-mapping": { "name": "Color Mapping", "category": "TreeMap" }, "selection": { "name": "Selection & Highlight", "category": "TreeMap" }, "print": { "name": "Print & Export", "category": "TreeMap" }, "pie": { "name": "Treemap with Pie", "category": "TreeMap" }, "rtl": { "name": "RTL", "category": "TreeMap" }, "defaultSample": "treemap/default" };
