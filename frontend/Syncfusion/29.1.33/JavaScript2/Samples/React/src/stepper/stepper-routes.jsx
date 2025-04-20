import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Orientation from './orientation-functional';
import Validation from './validation-functional';
import Linear from './linear-functional';
export const stepperRoutes = (<>
         <Route path='/:theme/stepper/default' Component={Default}/>
         <Route path='/:theme/stepper/orientation' Component={Orientation}/>
         <Route path='/:theme/stepper/validation' Component={Validation}/>
         <Route path='/:theme/stepper/linear' Component={Linear}/>

    </>);
export const stepperCategory = { "default": { "name": "Default Functionalities", "category": "Stepper" }, "orientation": { "name": "Orientation", "category": "Stepper" }, "validation": { "name": "Validation", "category": "Stepper" }, "linear": { "name": "Linear Flow", "category": "Stepper" }, "defaultSample": "stepper/default" };
