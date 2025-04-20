import { Route } from 'react-router-dom';
import * as React from 'react';
import { SmartTaskPrioritizer } from './task-prioritize';
import { SmartProgressPredictor } from './progress-predictor';
import { SmartResourceAllocation } from './resource-manager';
export const aiganttRoutes = (<>
         <Route path='/:theme/ai-gantt/task-prioritize' Component={SmartTaskPrioritizer}/>
         <Route path='/:theme/ai-gantt/progress-predictor' Component={SmartProgressPredictor}/>
         <Route path='/:theme/ai-gantt/resource-manager' Component={SmartResourceAllocation}/>

    </>);
export const aiganttCategory = { "task-prioritize": { "name": "Smart Task Prioritizer", "category": "Gantt Chart" }, "progress-predictor": { "name": "Smart Progress Predictor", "category": "Gantt Chart" }, "resource-manager": { "name": "Smart Resource Allocation", "category": "Gantt Chart" }, "defaultSample": "ai-gantt/task-prioritize" };
