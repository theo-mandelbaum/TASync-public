import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Template from './template-functional';
export const contextmenuRoutes = (<>
         <Route path='/:theme/context-menu/default' Component={Default}/>
         <Route path='/:theme/context-menu/template' Component={Template}/>

    </>);
export const contextmenuCategory = { "default": { "name": "Default Functionalities", "category": "Context Menu" }, "template": { "name": "Template", "category": "Context Menu" }, "defaultSample": "context-menu/default" };
