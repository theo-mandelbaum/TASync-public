import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Popup from './popup-functional';
import Template from './template-functional';
import Alignment from './alignment-functional';
import KeyboardInteraction from './keyboard-interaction-functional';


export const toolbarRoutes = (
    <>
         <Route  path='/:theme/toolbar/default' Component={ Default }/>
         <Route  path='/:theme/toolbar/popup' Component={ Popup }/>
         <Route  path='/:theme/toolbar/template' Component={ Template }/>
         <Route  path='/:theme/toolbar/alignment' Component={ Alignment }/>
         <Route  path='/:theme/toolbar/keyboard-interaction' Component={ KeyboardInteraction }/>

    </>
)

export const toolbarCategory = {"default":{"name":"Default Functionalities","category":"Toolbar"},"popup":{"name":"Popup","category":"Toolbar"},"template":{"name":"Template","category":"Toolbar"},"alignment":{"name":"Alignment","category":"Toolbar"},"keyboard-interaction":{"name":"Keyboard Interaction","category":"Toolbar"},"defaultSample":"toolbar/default"}