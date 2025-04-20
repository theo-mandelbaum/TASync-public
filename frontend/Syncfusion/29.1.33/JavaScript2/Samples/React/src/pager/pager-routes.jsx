import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
import { Localization } from './localization';
import { API } from './api';
export const pagerRoutes = (<>
         <Route path='/:theme/pager/default' Component={Default}/>
         <Route path='/:theme/pager/localization' Component={Localization}/>
         <Route path='/:theme/pager/api' Component={API}/>

    </>);
export const pagerCategory = { "default": { "name": "Default Functionalities", "category": "PAGER" }, "localization": { "name": "Localization", "category": "PAGER" }, "api": { "name": "API", "category": "PAGER" }, "defaultSample": "pager/default" };
