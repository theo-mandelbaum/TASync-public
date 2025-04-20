import { Route } from 'react-router-dom';
import * as React from 'react';
import DefaultMaps from './default-functional';
import ProjectionMaps from './projection-functional';
import MultilayerMaps from './multilayer-functional';
import MarkerMaps from './marker-functional';
import MarkerTemplateMaps from './marker-template-functional';
import MarkerCluster from './marker-cluster-functional';
import LabelMaps from './label-functional';
import BubbleMaps from './bubble-functional';
import NavigationLineMaps from './navigation-line-functional';
import LegendMaps from './legend-functional';
import ColorMap from './color-mapping-functional';
import AnnotationMaps from './annotation-functional';
import Polygon from './polygon-functional';
import OSMMaps from './osm-functional';
import OSMSubLayer from './osm-with-sublayers-functional';
import OSMMarkerCluster from './osm-with-marker-clustering-functional';
import OSMNavigation from './osm-with-navigation-lines-functional';
import OSMLegend from './osm-with-legend-functional';
import TooltipMaps from './tooltip-functional';
import SelectionMaps from './selection-functional';
import ZoomingMaps from './zooming-functional';
import ProgrammaticZoomMaps from './programmatic-zoom-functional';
import DrilldownMaps from './drilldown-functional';
import PrintMaps from './print-functional';
import ExportMaps from './export-functional';
import HeatMaps from './heatmap-functional';
import CurvedMaps from './curved-functional';
import EarthquakeMaps from './earthquake-functional';
import HighlightMaps from './highlight-functional';
import CyberAttackMaps from './cyber-attack-map-functional';
import DynamicMarker from './dynamic-marker-functional';
import PieMaps from './map-pie-functional';
import MapSlider from './map-with-slider-functional';
import SalesMaps from './sales-maps-functional';
import SeatBookingMaps from './seat-booking-functional';
export const mapsRoutes = (<>
         <Route path='/:theme/maps/default' Component={DefaultMaps}/>
         <Route path='/:theme/maps/projection' Component={ProjectionMaps}/>
         <Route path='/:theme/maps/multilayer' Component={MultilayerMaps}/>
         <Route path='/:theme/maps/marker' Component={MarkerMaps}/>
         <Route path='/:theme/maps/marker-template' Component={MarkerTemplateMaps}/>
         <Route path='/:theme/maps/marker-cluster' Component={MarkerCluster}/>
         <Route path='/:theme/maps/label' Component={LabelMaps}/>
         <Route path='/:theme/maps/bubble' Component={BubbleMaps}/>
         <Route path='/:theme/maps/navigation-line' Component={NavigationLineMaps}/>
         <Route path='/:theme/maps/legend' Component={LegendMaps}/>
         <Route path='/:theme/maps/color-mapping' Component={ColorMap}/>
         <Route path='/:theme/maps/annotation' Component={AnnotationMaps}/>
         <Route path='/:theme/maps/polygon' Component={Polygon}/>
         <Route path='/:theme/maps/osm' Component={OSMMaps}/>
         <Route path='/:theme/maps/osm-with-sublayers' Component={OSMSubLayer}/>
         <Route path='/:theme/maps/osm-with-marker-clustering' Component={OSMMarkerCluster}/>
         <Route path='/:theme/maps/osm-with-navigation-lines' Component={OSMNavigation}/>
         <Route path='/:theme/maps/osm-with-legend' Component={OSMLegend}/>
         <Route path='/:theme/maps/tooltip' Component={TooltipMaps}/>
         <Route path='/:theme/maps/selection' Component={SelectionMaps}/>
         <Route path='/:theme/maps/zooming' Component={ZoomingMaps}/>
         <Route path='/:theme/maps/programmatic-zoom' Component={ProgrammaticZoomMaps}/>
         <Route path='/:theme/maps/drilldown' Component={DrilldownMaps}/>
         <Route path='/:theme/maps/print' Component={PrintMaps}/>
         <Route path='/:theme/maps/export' Component={ExportMaps}/>
         <Route path='/:theme/maps/heatmap' Component={HeatMaps}/>
         <Route path='/:theme/maps/curved' Component={CurvedMaps}/>
         <Route path='/:theme/maps/earthquake' Component={EarthquakeMaps}/>
         <Route path='/:theme/maps/highlight' Component={HighlightMaps}/>
         <Route path='/:theme/maps/cyber-attack-map' Component={CyberAttackMaps}/>
         <Route path='/:theme/maps/dynamic-marker' Component={DynamicMarker}/>
         <Route path='/:theme/maps/map-pie' Component={PieMaps}/>
         <Route path='/:theme/maps/map-with-slider' Component={MapSlider}/>
         <Route path='/:theme/maps/sales-maps' Component={SalesMaps}/>
         <Route path='/:theme/maps/seat-booking' Component={SeatBookingMaps}/>

    </>);
export const mapsCategory = { "default": { "name": "Default Functionalities", "category": "Maps" }, "projection": { "name": "Projection", "category": "Features" }, "multilayer": { "name": "Multi-layers", "category": "Features" }, "marker": { "name": "Marker", "category": "Features" }, "marker-template": { "name": "Marker template", "category": "Features" }, "marker-cluster": { "name": "Marker Clustering", "category": "Features" }, "label": { "name": "Labels", "category": "Features" }, "bubble": { "name": "Bubble", "category": "Features" }, "navigation-line": { "name": "Navigation Lines", "category": "Features" }, "legend": { "name": "Legend", "category": "Features" }, "color-mapping": { "name": "Color Mapping", "category": "Features" }, "annotation": { "name": "Annotations", "category": "Features" }, "polygon": { "name": "Polygon", "category": "Polygon" }, "osm": { "name": "OpenStreetMap", "category": "Map Providers" }, "osm-with-sublayers": { "name": "OSM with Sublayer", "category": "Map Providers" }, "osm-with-marker-clustering": { "name": "OSM with Marker Clustering", "category": "Map Providers" }, "osm-with-navigation-lines": { "name": "OSM with Navigation Lines", "category": "Map Providers" }, "osm-with-legend": { "name": "OSM with Legend", "category": "Map Providers" }, "tooltip": { "name": "Tooltip", "category": "User Interaction" }, "selection": { "name": "Selection & Highlight", "category": "User Interaction" }, "zooming": { "name": "Zooming & Panning", "category": "User Interaction" }, "programmatic-zoom": { "name": "Zoom to fit all markers", "category": "User Interaction" }, "drilldown": { "name": "Drill down", "category": "User Interaction" }, "print": { "name": "Print", "category": "Print and Export" }, "export": { "name": "Export", "category": "Print and Export" }, "heatmap": { "name": "Heat Map", "category": "Use Cases" }, "curved": { "name": "Flight routes", "category": "Use Cases" }, "earthquake": { "name": "Earthquake indication", "category": "Use Cases" }, "highlight": { "name": "Highlighted region", "category": "Use Cases" }, "cyber-attack-map": { "name": "Cyber Attack Map", "category": "Use Cases" }, "dynamic-marker": { "name": "Dynamic Markers", "category": "Use Cases" }, "map-pie": { "name": "Map with Pie chart", "category": "Use Cases" }, "map-with-slider": { "name": "Map with Slider", "category": "Use Cases" }, "sales-maps": { "name": "Sales map ", "category": "Use Cases" }, "seat-booking": { "name": "Bus seat booking", "category": "Use Cases" }, "defaultSample": "maps/default" };
