import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import CustomMask from './custom-mask-functional';
import Formats from './formats-functional';
export const maskedtextboxRoutes = (<>
         <Route path='/:theme/maskedtextbox/default' Component={Default}/>
         <Route path='/:theme/maskedtextbox/custom-mask' Component={CustomMask}/>
         <Route path='/:theme/maskedtextbox/formats' Component={Formats}/>

    </>);
export const maskedtextboxCategory = { "default": { "name": "Default Functionalities", "category": "Input Mask" }, "custom-mask": { "name": "Custom Mask", "category": "Input Mask" }, "formats": { "name": "Formats", "category": "Input Mask" }, "defaultSample": "maskedtextbox/default" };
