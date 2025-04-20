import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functionalities-functional';
import CalendarHeatmap from './calendar-heatmap-functional';
import BubbleTypes from './bubble-types-functional';
import ColorAndSizeAttributes from './color-and-size-attributes-functional';
import ArrayRow from './row-functional';
import ArrayCell from './cell-functional';
import JsonRow from './json-row-functional';
import JsonCell from './json-cell-functional';
import EmptyPoints from './empty-points-functional';
import InversedAxis from './inversed-axis-functional';
import OpposedAxis from './opposed-axis-functional';
import LabelTemplate from './label-template-functional';
import MultiLevelLabels from './multi-level-labels-functional';
import CellSelection from './cell-selection-functional';
import LegendPlacement from './legend-placement-functional';
import LargeData from './large-data-functional';
import Palette from './palette-mode-functional';
import ColorRange from './color-range-functional';
import RenderMode from './rendering-mode-functional';
import TooltipTemplate from './tooltip-template-functional';


export const heatmapchartRoutes = (
    <>
         <Route  path='/:theme/heatmap-chart/default-functionalities' Component={ Default }/>
         <Route  path='/:theme/heatmap-chart/calendar-heatmap' Component={ CalendarHeatmap }/>
         <Route  path='/:theme/heatmap-chart/bubble-types' Component={ BubbleTypes }/>
         <Route  path='/:theme/heatmap-chart/color-and-size-attributes' Component={ ColorAndSizeAttributes }/>
         <Route  path='/:theme/heatmap-chart/row' Component={ ArrayRow }/>
         <Route  path='/:theme/heatmap-chart/cell' Component={ ArrayCell }/>
         <Route  path='/:theme/heatmap-chart/json-row' Component={ JsonRow }/>
         <Route  path='/:theme/heatmap-chart/json-cell' Component={ JsonCell }/>
         <Route  path='/:theme/heatmap-chart/empty-points' Component={ EmptyPoints }/>
         <Route  path='/:theme/heatmap-chart/inversed-axis' Component={ InversedAxis }/>
         <Route  path='/:theme/heatmap-chart/opposed-axis' Component={ OpposedAxis }/>
         <Route  path='/:theme/heatmap-chart/label-template' Component={ LabelTemplate }/>
         <Route  path='/:theme/heatmap-chart/multi-level-labels' Component={ MultiLevelLabels }/>
         <Route  path='/:theme/heatmap-chart/cell-selection' Component={ CellSelection }/>
         <Route  path='/:theme/heatmap-chart/legend-placement' Component={ LegendPlacement }/>
         <Route  path='/:theme/heatmap-chart/large-data' Component={ LargeData }/>
         <Route  path='/:theme/heatmap-chart/palette-mode' Component={ Palette }/>
         <Route  path='/:theme/heatmap-chart/color-range' Component={ ColorRange }/>
         <Route  path='/:theme/heatmap-chart/rendering-mode' Component={ RenderMode }/>
         <Route  path='/:theme/heatmap-chart/tooltip-template' Component={ TooltipTemplate }/>

    </>
)

export const heatmapchartCategory = {"default-functionalities":{"name":"Default Functionalities","category":"Heatmap Chart"},"calendar-heatmap":{"name":"Calendar Heatmap","category":"Heatmap Chart"},"bubble-types":{"name":"Bubble Types","category":"Bubble Heatmap"},"color-and-size-attributes":{"name":"Color and Size Attributes","category":"Bubble Heatmap"},"row":{"name":"Row","category":"Data Binding"},"cell":{"name":"Cell","category":"Data Binding"},"json-row":{"name":"JSON Row","category":"Data Binding"},"json-cell":{"name":"JSON Cell","category":"Data Binding"},"empty-points":{"name":"Empty points","category":"Features"},"inversed-axis":{"name":"Inversed Axis","category":"Features"},"opposed-axis":{"name":"Opposed Axis","category":"Features"},"label-template":{"name":"Label Template","category":"Features"},"multi-level-labels":{"name":"Multi Level Labels","category":"Features"},"cell-selection":{"name":"Selection","category":"Features"},"legend-placement":{"name":"Legend Placement","category":"Features"},"large-data":{"name":"Large Data","category":"Features"},"palette-mode":{"name":"Palette Mode","category":"Features"},"color-range":{"name":"Color Range","category":"Features"},"rendering-mode":{"name":"Rendering mode","category":"Features"},"tooltip-template":{"name":"Tooltip Template","category":"Features"},"defaultSample":"heatmap-chart/default-functionalities"}