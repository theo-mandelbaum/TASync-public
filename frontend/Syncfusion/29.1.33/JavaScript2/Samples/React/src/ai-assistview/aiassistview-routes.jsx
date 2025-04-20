import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import CustomViews from './custom-views-functional';
import Streaming from './streaming-functional';
import Template from './template-functional';
import Dialog from './dialog-functional';
export const aiassistviewRoutes = (<>
         <Route path='/:theme/ai-assistview/default' Component={Default}/>
         <Route path='/:theme/ai-assistview/custom-views' Component={CustomViews}/>
         <Route path='/:theme/ai-assistview/streaming' Component={Streaming}/>
         <Route path='/:theme/ai-assistview/template' Component={Template}/>
         <Route path='/:theme/ai-assistview/dialog' Component={Dialog}/>

    </>);
export const aiassistviewCategory = { "default": { "name": "Default Functionalities", "category": "AI AssistView" }, "custom-views": { "name": "Custom Views", "category": "AI AssistView" }, "streaming": { "name": "Streaming Response", "category": "AI AssistView" }, "template": { "name": "Template", "category": "AI AssistView" }, "dialog": { "name": "Dialog", "category": "Integration" }, "defaultSample": "ai-assistview/default" };
