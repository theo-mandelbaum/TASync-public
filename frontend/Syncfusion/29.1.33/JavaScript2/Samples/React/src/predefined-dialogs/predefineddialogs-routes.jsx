import { Route } from 'react-router-dom';
import * as React from 'react';
import DefaultFunctionalities from './default-functional';
import Customization from './customization-functional';
import Animation from './animation-functional';
export const predefineddialogsRoutes = (<>
         <Route path='/:theme/predefined-dialogs/default' Component={DefaultFunctionalities}/>
         <Route path='/:theme/predefined-dialogs/customization' Component={Customization}/>
         <Route path='/:theme/predefined-dialogs/animation' Component={Animation}/>

    </>);
export const predefineddialogsCategory = { "default": { "name": "Default Functionalities", "category": "Predefined Dialogs" }, "customization": { "name": "Customization", "category": "Predefined Dialogs" }, "animation": { "name": "Animation", "category": "Predefined Dialogs" }, "defaultSample": "predefined-dialogs/default" };
