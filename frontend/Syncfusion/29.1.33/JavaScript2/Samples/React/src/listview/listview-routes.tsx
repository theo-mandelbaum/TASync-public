import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Remote from './remote-list-functional';
import Checklist from './check-list-functional';
import Nested from './nested-list-functional';
import UiVirtualization from './virtualization-functional';
import Template from './template-functional';
import GroupTemplate from './group-template-functional';
import CallHistory from './call-history-functional';
import Scrolling from './scrolling-functional';


export const listviewRoutes = (
    <>
         <Route  path='/:theme/listview/default' Component={ Default }/>
         <Route  path='/:theme/listview/remote-list' Component={ Remote }/>
         <Route  path='/:theme/listview/check-list' Component={ Checklist }/>
         <Route  path='/:theme/listview/nested-list' Component={ Nested }/>
         <Route  path='/:theme/listview/virtualization' Component={ UiVirtualization }/>
         <Route  path='/:theme/listview/template' Component={ Template }/>
         <Route  path='/:theme/listview/group-template' Component={ GroupTemplate }/>
         <Route  path='/:theme/listview/call-history' Component={ CallHistory }/>
         <Route  path='/:theme/listview/scrolling' Component={ Scrolling }/>

    </>
)

export const listviewCategory = {"default":{"name":"Default Functionalities","category":"ListView"},"remote-list":{"name":"Remote Data","category":"ListView"},"check-list":{"name":"Checklist","category":"ListView"},"nested-list":{"name":"Nested List","category":"ListView"},"virtualization":{"name":"Virtualization","category":"ListView"},"template":{"name":"Template","category":"Customization"},"group-template":{"name":"Group Template","category":"Customization"},"call-history":{"name":"Call History","category":"Use Case"},"scrolling":{"name":"Scrolling","category":"ListView"},"defaultSample":"listview/default"}