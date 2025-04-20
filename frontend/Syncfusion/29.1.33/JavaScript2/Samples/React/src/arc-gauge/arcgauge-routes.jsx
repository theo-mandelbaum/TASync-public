import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functionalities-functional';
import CustomerSatisfactionScore from './customer-satisfaction-score-functional';
import KeyPerformanceIndicator from './key-performance-indicator-functional';
import Patterns from './patterns-functional';
export const arcgaugeRoutes = (<>
         <Route path='/:theme/arc-gauge/default-functionalities' Component={Default}/>
         <Route path='/:theme/arc-gauge/customer-satisfaction-score' Component={CustomerSatisfactionScore}/>
         <Route path='/:theme/arc-gauge/key-performance-indicator' Component={KeyPerformanceIndicator}/>
         <Route path='/:theme/arc-gauge/patterns' Component={Patterns}/>

    </>);
export const arcgaugeCategory = { "default-functionalities": { "name": "Default Functionalities", "category": "Arc Gauge" }, "customer-satisfaction-score": { "name": "Customer Satisfaction Score", "category": "Arc Gauge" }, "key-performance-indicator": { "name": "Key Performance Indicator", "category": "Arc Gauge" }, "patterns": { "name": "Patterns", "category": "Arc Gauge" }, "defaultSample": "arc-gauge/default-functionalities" };
