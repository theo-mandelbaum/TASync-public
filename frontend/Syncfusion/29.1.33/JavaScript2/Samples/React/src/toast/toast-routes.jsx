import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Types from './types-functional';
import Templates from './templates-functional';
import Positions from './positions-functional';
import Api from './api-functional';
export const toastRoutes = (<>
         <Route path='/:theme/toast/default' Component={Default}/>
         <Route path='/:theme/toast/types' Component={Types}/>
         <Route path='/:theme/toast/templates' Component={Templates}/>
         <Route path='/:theme/toast/positions' Component={Positions}/>
         <Route path='/:theme/toast/api' Component={Api}/>

    </>);
export const toastCategory = { "default": { "name": "Default", "category": "Toast" }, "types": { "name": "Types", "category": "Toast" }, "templates": { "name": "Templates", "category": "Toast" }, "positions": { "name": "Positions", "category": "Toast" }, "api": { "name": "API", "category": "Toast" }, "defaultSample": "toast/default" };
