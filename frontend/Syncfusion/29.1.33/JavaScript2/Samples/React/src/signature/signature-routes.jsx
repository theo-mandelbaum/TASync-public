import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Toolbar from './toolbar-functional';
export const signatureRoutes = (<>
         <Route path='/:theme/signature/default' Component={Default}/>
         <Route path='/:theme/signature/toolbar' Component={Toolbar}/>

    </>);
export const signatureCategory = { "default": { "name": "Default Functionalities", "category": "Signature" }, "toolbar": { "name": "Toolbar", "category": "Signature" }, "defaultSample": "signature/default" };
