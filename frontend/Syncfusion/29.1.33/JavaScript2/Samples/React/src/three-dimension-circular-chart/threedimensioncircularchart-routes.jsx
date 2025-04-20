import { Route } from 'react-router-dom';
import * as React from 'react';
import undefined from './pie-functional';
import DonutSeries from './donut-functional';
import PieWithLegend from './pie-legend-functional';
import PieRadius from './pie-radius-functional';
import Selection from './selection-functional';
export const threedimensioncircularchartRoutes = (<>
         <Route path='/:theme/three-dimension-circular-chart/pie' Component={undefined}/>
         <Route path='/:theme/three-dimension-circular-chart/donut' Component={DonutSeries}/>
         <Route path='/:theme/three-dimension-circular-chart/pie-legend' Component={PieWithLegend}/>
         <Route path='/:theme/three-dimension-circular-chart/pie-radius' Component={PieRadius}/>
         <Route path='/:theme/three-dimension-circular-chart/selection' Component={Selection}/>

    </>);
export const threedimensioncircularchartCategory = { "pie": { "name": "Pie", "category": "3D Circular Chart" }, "donut": { "name": "Donut", "category": "3D Circular Chart" }, "pie-legend": { "name": "Pie with Legend", "category": "3D Circular Chart" }, "pie-radius": { "name": "Pie with Various Radius", "category": "3D Circular Chart" }, "selection": { "name": "Selection", "category": "3D Circular Chart" }, "defaultSample": "three-dimension-circular-chart/pie" };
