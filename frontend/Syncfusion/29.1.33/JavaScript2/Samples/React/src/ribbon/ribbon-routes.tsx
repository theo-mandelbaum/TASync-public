import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Simplified from './simplified-functional';
import Backstage from './backstage-functional';
import Contextual from './contextual-functional';
import Resize from './resize-functional';
import KeyTip from './keytip-functional';
import Gallery from './gallery-functional';


export const ribbonRoutes = (
    <>
         <Route  path='/:theme/ribbon/default' Component={ Default }/>
         <Route  path='/:theme/ribbon/simplified' Component={ Simplified }/>
         <Route  path='/:theme/ribbon/backstage' Component={ Backstage }/>
         <Route  path='/:theme/ribbon/contextual' Component={ Contextual }/>
         <Route  path='/:theme/ribbon/resize' Component={ Resize }/>
         <Route  path='/:theme/ribbon/keytip' Component={ KeyTip }/>
         <Route  path='/:theme/ribbon/gallery' Component={ Gallery }/>

    </>
)

export const ribbonCategory = {"default":{"name":"Default Functionalities","category":"Ribbon"},"simplified":{"name":"Simplified Mode","category":"Ribbon"},"backstage":{"name":"Backstage","category":"Ribbon"},"contextual":{"name":"Contextual Tabs","category":"Ribbon"},"resize":{"name":"Ribbon Resizing","category":"Ribbon"},"keytip":{"name":"Ribbon KeyTips","category":"Ribbon"},"gallery":{"name":"Ribbon Gallery","category":"Ribbon"},"defaultSample":"ribbon/default"}