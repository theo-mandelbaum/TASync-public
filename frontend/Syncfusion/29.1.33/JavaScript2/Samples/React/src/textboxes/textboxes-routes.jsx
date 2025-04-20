import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Multiline from './multiline-functional';
export const textboxesRoutes = (<>
         <Route path='/:theme/textboxes/default' Component={Default}/>
         <Route path='/:theme/textboxes/multiline' Component={Multiline}/>

    </>);
export const textboxesCategory = { "default": { "name": "Default Functionalities", "category": "TextBox" }, "multiline": { "name": "Multiline TextBox", "category": "TextBox" }, "defaultSample": "textboxes/default" };
