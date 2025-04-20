import { Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';
export const formvalidatorRoutes = (<>
         <Route path='/:theme/form-validator/default' Component={Default}/>

    </>);
export const formvalidatorCategory = { "default": { "name": "Default Functionalities", "category": "Form Validator" }, "defaultSample": "form-validator/default" };
