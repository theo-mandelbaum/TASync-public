import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Variants from './variants-functional';
import Icons from './icons-functional';
import Customization from './customization-functional';
import Template from './template-functional';
export const messageRoutes = (<>
         <Route path='/:theme/message/default' Component={Default}/>
         <Route path='/:theme/message/variants' Component={Variants}/>
         <Route path='/:theme/message/icons' Component={Icons}/>
         <Route path='/:theme/message/customization' Component={Customization}/>
         <Route path='/:theme/message/template' Component={Template}/>

    </>);
export const messageCategory = { "default": { "name": "Default Functionalities", "category": "Message" }, "variants": { "name": "Variants", "category": "Message" }, "icons": { "name": "Icons", "category": "Message" }, "customization": { "name": "Customization", "category": "Message" }, "template": { "name": "Template", "category": "Message" }, "defaultSample": "message/default" };
