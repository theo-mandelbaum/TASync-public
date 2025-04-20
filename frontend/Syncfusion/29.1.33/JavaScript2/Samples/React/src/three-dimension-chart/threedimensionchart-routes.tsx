import {  Route } from 'react-router-dom';
import * as React from 'react';
import undefined from './column-functional';
import ColumnPlacement from './column-placement-functional';
import CylindricalColumn from './cylindrical-column-functional';
import Bar from './bar-functional';
import StackedColumn from './stacked-column-functional';
import StackedColumn100 from './stacked-column100-functional';
import StackedBar from './stacked-bar-functional';
import StackedBar100 from './stacked-bar100-functional';
import EmptyPoint from './empty-point-functional';


export const threedimensionchartRoutes = (
    <>
         <Route  path='/:theme/three-dimension-chart/column' Component={ undefined }/>
         <Route  path='/:theme/three-dimension-chart/column-placement' Component={ ColumnPlacement }/>
         <Route  path='/:theme/three-dimension-chart/cylindrical-column' Component={ CylindricalColumn }/>
         <Route  path='/:theme/three-dimension-chart/bar' Component={ Bar }/>
         <Route  path='/:theme/three-dimension-chart/stacked-column' Component={ StackedColumn }/>
         <Route  path='/:theme/three-dimension-chart/stacked-column100' Component={ StackedColumn100 }/>
         <Route  path='/:theme/three-dimension-chart/stacked-bar' Component={ StackedBar }/>
         <Route  path='/:theme/three-dimension-chart/stacked-bar100' Component={ StackedBar100 }/>
         <Route  path='/:theme/three-dimension-chart/empty-point' Component={ EmptyPoint }/>

    </>
)

export const threedimensionchartCategory = {"column":{"name":"Column","category":"3D Chart"},"column-placement":{"name":"Back to Back Column","category":"3D Chart"},"cylindrical-column":{"name":"Cylindrical Column","category":"3D Chart"},"bar":{"name":"Bar","category":"3D Chart"},"stacked-column":{"name":"Stacking Column with Grouping","category":"3D Chart"},"stacked-column100":{"name":"100% Stacked Column","category":"3D Chart"},"stacked-bar":{"name":"Stacked Bar","category":"3D Chart"},"stacked-bar100":{"name":"100% Stacked Bar","category":"3D Chart"},"empty-point":{"name":"Column with null and 0 values","category":"3D Chart"},"defaultSample":"three-dimension-chart/column"}