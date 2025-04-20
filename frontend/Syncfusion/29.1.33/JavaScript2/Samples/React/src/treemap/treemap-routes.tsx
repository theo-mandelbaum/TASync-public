import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Layout from './layout-functional';
import Drilldown from './drilldown-functional';
import Customization from './customization-functional';
import Datalabel from './label-functional';
import Tooltip from './tooltip-functional';
import Legend from './election-functional';
import ColorMapping from './color-mapping-functional';
import Selection from './selection-functional';
import PrintExport from './print-functional';
import Pie from './pie-functional';
import RTL from './rtl-functional';


export const treemapRoutes = (
    <>
         <Route  path='/:theme/treemap/default' Component={ Default }/>
         <Route  path='/:theme/treemap/layout' Component={ Layout }/>
         <Route  path='/:theme/treemap/drilldown' Component={ Drilldown }/>
         <Route  path='/:theme/treemap/customization' Component={ Customization }/>
         <Route  path='/:theme/treemap/label' Component={ Datalabel }/>
         <Route  path='/:theme/treemap/tooltip' Component={ Tooltip }/>
         <Route  path='/:theme/treemap/election' Component={ Legend }/>
         <Route  path='/:theme/treemap/color-mapping' Component={ ColorMapping }/>
         <Route  path='/:theme/treemap/selection' Component={ Selection }/>
         <Route  path='/:theme/treemap/print' Component={ PrintExport }/>
         <Route  path='/:theme/treemap/pie' Component={ Pie }/>
         <Route  path='/:theme/treemap/rtl' Component={ RTL }/>

    </>
)

export const treemapCategory = {"default":{"name":"Default Functionalities","category":"TreeMap"},"layout":{"name":"Layout","category":"TreeMap"},"drilldown":{"name":"Drilldown","category":"TreeMap"},"customization":{"name":"Customization","category":"TreeMap"},"label":{"name":"Data Label","category":"TreeMap"},"tooltip":{"name":"Tooltip","category":"TreeMap"},"election":{"name":"Legend","category":"TreeMap"},"color-mapping":{"name":"Color Mapping","category":"TreeMap"},"selection":{"name":"Selection & Highlight","category":"TreeMap"},"print":{"name":"Print & Export","category":"TreeMap"},"pie":{"name":"Treemap with Pie","category":"TreeMap"},"rtl":{"name":"RTL","category":"TreeMap"},"defaultSample":"treemap/default"}