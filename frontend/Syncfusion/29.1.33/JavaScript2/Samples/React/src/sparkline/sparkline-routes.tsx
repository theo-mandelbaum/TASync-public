import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Series from './series-types-functional';
import Axis from './axis-types-functional';
import SparkGrid from './spark-grid-functional';
import Customization from './customization-functional';
import LiveUpdate from './live-update-functional';
import RangeBand from './range-band-functional';


export const sparklineRoutes = (
    <>
         <Route  path='/:theme/sparkline/default' Component={ Default }/>
         <Route  path='/:theme/sparkline/series-types' Component={ Series }/>
         <Route  path='/:theme/sparkline/axis-types' Component={ Axis }/>
         <Route  path='/:theme/sparkline/spark-grid' Component={ SparkGrid }/>
         <Route  path='/:theme/sparkline/customization' Component={ Customization }/>
         <Route  path='/:theme/sparkline/live-update' Component={ LiveUpdate }/>
         <Route  path='/:theme/sparkline/range-band' Component={ RangeBand }/>

    </>
)

export const sparklineCategory = {"default":{"name":"Default","category":"Sparkline Charts"},"series-types":{"name":"Series Types","category":"Sparkline Charts"},"axis-types":{"name":"Axis Value Types","category":"Sparkline Charts"},"spark-grid":{"name":"Sparkline in Grid","category":"Sparkline Charts"},"customization":{"name":"Customization","category":"Sparkline Charts"},"live-update":{"name":"Live Update","category":"Sparkline Charts"},"range-band":{"name":"Range Band","category":"Sparkline Charts"},"defaultSample":"sparkline/default"}