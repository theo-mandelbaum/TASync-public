import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import PredefinedLayouts from './predefined-layouts-functional';
import Properties from './properties-functional';
import DynamicWidget from './dynamic-functional';
import SEODashboard from './analytics-dashboard-functional';
export const dashboardlayoutRoutes = (<>
         <Route path='/:theme/dashboard-layout/default' Component={Default}/>
         <Route path='/:theme/dashboard-layout/predefined-layouts' Component={PredefinedLayouts}/>
         <Route path='/:theme/dashboard-layout/properties' Component={Properties}/>
         <Route path='/:theme/dashboard-layout/dynamic' Component={DynamicWidget}/>
         <Route path='/:theme/dashboard-layout/analytics-dashboard' Component={SEODashboard}/>

    </>);
export const dashboardlayoutCategory = { "default": { "name": "Default Functionalities", "category": "Dashboard Layout" }, "predefined-layouts": { "name": "Predefined Layouts", "category": "Dashboard Layout" }, "properties": { "name": "API", "category": "Dashboard Layout" }, "dynamic": { "name": "Editable Dashboard", "category": "Dashboard Layout" }, "analytics-dashboard": { "name": "SEO Analytics Dashboard", "category": "Use Case" }, "defaultSample": "dashboard-layout/default" };
