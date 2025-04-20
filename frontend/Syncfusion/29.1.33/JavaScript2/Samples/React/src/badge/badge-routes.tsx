import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Types from './types-functional';
import Notification from './notification-functional';
import ListView from './listview-functional';
import Accordion from './accordion-functional';
import Toolbar from './toolbar-functional';


export const badgeRoutes = (
    <>
         <Route  path='/:theme/badge/default' Component={ Default }/>
         <Route  path='/:theme/badge/types' Component={ Types }/>
         <Route  path='/:theme/badge/notification' Component={ Notification }/>
         <Route  path='/:theme/badge/listview' Component={ ListView }/>
         <Route  path='/:theme/badge/accordion' Component={ Accordion }/>
         <Route  path='/:theme/badge/toolbar' Component={ Toolbar }/>

    </>
)

export const badgeCategory = {"default":{"name":"Default","category":"Badge"},"types":{"name":"Types","category":"Badge"},"notification":{"name":"Notification","category":"Badge"},"listview":{"name":"ListView","category":"Integration"},"accordion":{"name":"Accordion","category":"Integration"},"toolbar":{"name":"Toolbar","category":"Integration"},"defaultSample":"badge/default"}