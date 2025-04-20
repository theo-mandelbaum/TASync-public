import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Api from './api-functional';
import DragAndDrop from './draganddrop-functional';
export const chipsRoutes = (<>
         <Route path='/:theme/chips/default' Component={Default}/>
         <Route path='/:theme/chips/api' Component={Api}/>
         <Route path='/:theme/chips/draganddrop' Component={DragAndDrop}/>

    </>);
export const chipsCategory = { "default": { "name": "Default Functionalities", "category": "Chips" }, "api": { "name": "API", "category": "Chips" }, "draganddrop": { "name": "Draggable Chips", "category": "Chips" }, "defaultSample": "chips/default" };
