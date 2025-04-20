import { Route } from 'react-router-dom';
import * as React from 'react';
import { AnomalyDetection } from './anomaly-detection';
import { SemanticFiltering } from './semantic-filtering';
export const aigridRoutes = (<>
         <Route path='/:theme/ai-grid/anomaly-detection' Component={AnomalyDetection}/>
         <Route path='/:theme/ai-grid/semantic-filtering' Component={SemanticFiltering}/>

    </>);
export const aigridCategory = { "anomaly-detection": { "name": "Anomaly Detection", "category": "Data Grid" }, "semantic-filtering": { "name": "Semantic Filtering (Embedding)", "category": "Data Grid" }, "defaultSample": "ai-grid/anomaly-detection" };
