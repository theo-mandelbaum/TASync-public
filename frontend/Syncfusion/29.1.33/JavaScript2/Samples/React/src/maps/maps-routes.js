"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapsCategory = exports.mapsRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var projection_functional_1 = require("./projection-functional");
var multilayer_functional_1 = require("./multilayer-functional");
var marker_functional_1 = require("./marker-functional");
var marker_template_functional_1 = require("./marker-template-functional");
var marker_cluster_functional_1 = require("./marker-cluster-functional");
var label_functional_1 = require("./label-functional");
var bubble_functional_1 = require("./bubble-functional");
var navigation_line_functional_1 = require("./navigation-line-functional");
var legend_functional_1 = require("./legend-functional");
var color_mapping_functional_1 = require("./color-mapping-functional");
var annotation_functional_1 = require("./annotation-functional");
var polygon_functional_1 = require("./polygon-functional");
var osm_functional_1 = require("./osm-functional");
var osm_with_sublayers_functional_1 = require("./osm-with-sublayers-functional");
var osm_with_marker_clustering_functional_1 = require("./osm-with-marker-clustering-functional");
var osm_with_navigation_lines_functional_1 = require("./osm-with-navigation-lines-functional");
var osm_with_legend_functional_1 = require("./osm-with-legend-functional");
var tooltip_functional_1 = require("./tooltip-functional");
var selection_functional_1 = require("./selection-functional");
var zooming_functional_1 = require("./zooming-functional");
var programmatic_zoom_functional_1 = require("./programmatic-zoom-functional");
var drilldown_functional_1 = require("./drilldown-functional");
var print_functional_1 = require("./print-functional");
var export_functional_1 = require("./export-functional");
var heatmap_functional_1 = require("./heatmap-functional");
var curved_functional_1 = require("./curved-functional");
var earthquake_functional_1 = require("./earthquake-functional");
var highlight_functional_1 = require("./highlight-functional");
var cyber_attack_map_functional_1 = require("./cyber-attack-map-functional");
var dynamic_marker_functional_1 = require("./dynamic-marker-functional");
var map_pie_functional_1 = require("./map-pie-functional");
var map_with_slider_functional_1 = require("./map-with-slider-functional");
var sales_maps_functional_1 = require("./sales-maps-functional");
var seat_booking_functional_1 = require("./seat-booking-functional");
exports.mapsRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/projection', Component: projection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/multilayer', Component: multilayer_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/marker', Component: marker_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/marker-template', Component: marker_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/marker-cluster', Component: marker_cluster_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/label', Component: label_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/bubble', Component: bubble_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/navigation-line', Component: navigation_line_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/legend', Component: legend_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/color-mapping', Component: color_mapping_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/annotation', Component: annotation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/polygon', Component: polygon_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm', Component: osm_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm-with-sublayers', Component: osm_with_sublayers_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm-with-marker-clustering', Component: osm_with_marker_clustering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm-with-navigation-lines', Component: osm_with_navigation_lines_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/osm-with-legend', Component: osm_with_legend_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/tooltip', Component: tooltip_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/selection', Component: selection_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/zooming', Component: zooming_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/programmatic-zoom', Component: programmatic_zoom_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/drilldown', Component: drilldown_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/print', Component: print_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/export', Component: export_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/heatmap', Component: heatmap_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/curved', Component: curved_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/earthquake', Component: earthquake_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/highlight', Component: highlight_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/cyber-attack-map', Component: cyber_attack_map_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/dynamic-marker', Component: dynamic_marker_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/map-pie', Component: map_pie_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/map-with-slider', Component: map_with_slider_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/sales-maps', Component: sales_maps_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/maps/seat-booking', Component: seat_booking_functional_1.default })));
exports.mapsCategory = { "default": { "name": "Default Functionalities", "category": "Maps" }, "projection": { "name": "Projection", "category": "Features" }, "multilayer": { "name": "Multi-layers", "category": "Features" }, "marker": { "name": "Marker", "category": "Features" }, "marker-template": { "name": "Marker template", "category": "Features" }, "marker-cluster": { "name": "Marker Clustering", "category": "Features" }, "label": { "name": "Labels", "category": "Features" }, "bubble": { "name": "Bubble", "category": "Features" }, "navigation-line": { "name": "Navigation Lines", "category": "Features" }, "legend": { "name": "Legend", "category": "Features" }, "color-mapping": { "name": "Color Mapping", "category": "Features" }, "annotation": { "name": "Annotations", "category": "Features" }, "polygon": { "name": "Polygon", "category": "Polygon" }, "osm": { "name": "OpenStreetMap", "category": "Map Providers" }, "osm-with-sublayers": { "name": "OSM with Sublayer", "category": "Map Providers" }, "osm-with-marker-clustering": { "name": "OSM with Marker Clustering", "category": "Map Providers" }, "osm-with-navigation-lines": { "name": "OSM with Navigation Lines", "category": "Map Providers" }, "osm-with-legend": { "name": "OSM with Legend", "category": "Map Providers" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "selection": { "name": "Selection & Highlight", "category": "User Interaction" }, "zooming": { "name": "Zooming & Panning", "category": "User Interaction" }, "programmatic-zoom": { "name": "Zoom to fit all markers", "category": "User Interaction" }, "drilldown": { "name": "Drill down", "category": "User Interaction" }, "print": { "name": "Print", "category": "Print and Export" }, "export": { "name": "Export", "category": "Print and Export" }, "heatmap": { "name": "Heat Map", "category": "Use Cases" }, "curved": { "name": "Flight routes", "category": "Use Cases" }, "earthquake": { "name": "Earthquake indication", "category": "Use Cases" }, "highlight": { "name": "Highlighted region", "category": "Use Cases" }, "cyber-attack-map": { "name": "Cyber Attack Map", "category": "Use Cases" }, "dynamic-marker": { "name": "Dynamic Markers", "category": "Use Cases" }, "map-pie": { "name": "Map with Pie chart", "category": "Use Cases" }, "map-with-slider": { "name": "Map with Slider", "category": "Use Cases" }, "sales-maps": { "name": "Sales map ", "category": "Use Cases" }, "seat-booking": { "name": "Bus seat booking", "category": "Use Cases" }, "defaultSample": "maps/default" };
