import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Customization from './custom-functional';
import Print from './print-export-functional';
export const smithchartRoutes = (<>
         <Route path='/:theme/smith-chart/default' Component={Default}/>
         <Route path='/:theme/smith-chart/custom' Component={Customization}/>
         <Route path='/:theme/smith-chart/print-export' Component={Print}/>

    </>);
export const smithchartCategory = { "default": { "name": "Default", "category": "Smith Chart" }, "custom": { "name": "Customization", "category": "Smith Chart" }, "print-export": { "name": "Print and Export", "category": "Smith Chart" }, "defaultSample": "smith-chart/default" };
