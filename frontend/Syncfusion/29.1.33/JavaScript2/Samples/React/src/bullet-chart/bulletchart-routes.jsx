import { Route } from 'react-router-dom';
import * as React from 'react';
import BulletChartDefault from './default-functional';
import BulletChartMultipleData from './multiple-data-functional';
import BulletChartRightToLeft from './right-to-left-functional';
import BulletChartBarCustomization from './bar-customization-functional';
import BulletChartCustomization from './customization-functional';
import BulletChartTooltip from './tooltip-functional';
import BulletChartOrientation from './orientation-functional';
import BulletLegend from './bullet-legend-functional';
export const bulletchartRoutes = (<>
         <Route path='/:theme/bullet-chart/default' Component={BulletChartDefault}/>
         <Route path='/:theme/bullet-chart/multiple-data' Component={BulletChartMultipleData}/>
         <Route path='/:theme/bullet-chart/right-to-left' Component={BulletChartRightToLeft}/>
         <Route path='/:theme/bullet-chart/bar-customization' Component={BulletChartBarCustomization}/>
         <Route path='/:theme/bullet-chart/customization' Component={BulletChartCustomization}/>
         <Route path='/:theme/bullet-chart/tooltip' Component={BulletChartTooltip}/>
         <Route path='/:theme/bullet-chart/orientation' Component={BulletChartOrientation}/>
         <Route path='/:theme/bullet-chart/bullet-legend' Component={BulletLegend}/>

    </>);
export const bulletchartCategory = { "default": { "name": "Default", "category": "Bullet Chart" }, "multiple-data": { "name": "Multiple Data", "category": "Bullet Chart" }, "right-to-left": { "name": "RTL", "category": "Bullet Chart" }, "bar-customization": { "name": "Feature and Target Bar", "category": "Bullet Chart" }, "customization": { "name": "Range and Label Settings", "category": "Bullet Chart" }, "tooltip": { "name": "Tooltip Template", "category": "Bullet Chart" }, "orientation": { "name": "Orientation", "category": "Bullet Chart" }, "bullet-legend": { "name": "Legend", "category": "Bullet Chart" }, "defaultSample": "bullet-chart/default" };
