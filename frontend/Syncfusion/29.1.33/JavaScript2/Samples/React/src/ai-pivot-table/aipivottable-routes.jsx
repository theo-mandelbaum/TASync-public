import { Route } from 'react-router-dom';
import * as React from 'react';
import { SmartPivot } from './smart-pivot';
export const aipivottableRoutes = (<>
         <Route path='/:theme/ai-pivot-table/smart-pivot' Component={SmartPivot}/>

    </>);
export const aipivottableCategory = { "smart-pivot": { "name": "Smart Pivot", "category": "Pivot Table" }, "defaultSample": "ai-pivot-table/smart-pivot" };
