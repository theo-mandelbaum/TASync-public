import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import API from './api-functional';
import Template from './template-functional';
export const timelineRoutes = (<>
         <Route path='/:theme/timeline/default' Component={Default}/>
         <Route path='/:theme/timeline/api' Component={API}/>
         <Route path='/:theme/timeline/template' Component={Template}/>

    </>);
export const timelineCategory = { "default": { "name": "Default Functionalities", "category": "Timeline" }, "api": { "name": "API", "category": "Timeline" }, "template": { "name": "Template", "category": "Timeline" }, "defaultSample": "timeline/default" };
