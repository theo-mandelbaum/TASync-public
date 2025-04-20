import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import MultipleList from './multiple-list-functional';
import Template from './template-functional';
import DisabledItems from './disabled-items-functional';


export const mentionRoutes = (
    <>
         <Route  path='/:theme/mention/default' Component={ Default }/>
         <Route  path='/:theme/mention/multiple-list' Component={ MultipleList }/>
         <Route  path='/:theme/mention/template' Component={ Template }/>
         <Route  path='/:theme/mention/disabled-items' Component={ DisabledItems }/>

    </>
)

export const mentionCategory = {"default":{"name":"Default Functionalities","category":"Mention"},"multiple-list":{"name":"Multiple List","category":"Mention"},"template":{"name":"Template","category":"Mention"},"disabled-items":{"name":"Disabled Items","category":"Mention"},"defaultSample":"mention/default"}