import { Route } from 'react-router-dom';
import * as React from 'react';
import { SmartEventWindow } from './smart-event-window';
export const aischeduleRoutes = (<>
         <Route path='/:theme/ai-schedule/smart-event-window' Component={SmartEventWindow}/>

    </>);
export const aischeduleCategory = { "smart-event-window": { "name": "Smart Event Window", "category": "Scheduler" }, "defaultSample": "ai-schedule/smart-event-window" };
