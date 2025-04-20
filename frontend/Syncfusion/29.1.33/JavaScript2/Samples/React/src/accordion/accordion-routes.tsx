import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Templates from './templates-functional';
import Icons from './icon-functional';
import KeyboardInteraction from './keyboard-interaction-functional';


export const accordionRoutes = (
    <>
         <Route  path='/:theme/accordion/default' Component={ Default }/>
         <Route  path='/:theme/accordion/templates' Component={ Templates }/>
         <Route  path='/:theme/accordion/icon' Component={ Icons }/>
         <Route  path='/:theme/accordion/keyboard-interaction' Component={ KeyboardInteraction }/>

    </>
)

export const accordionCategory = {"default":{"name":"Default Functionalities","category":"Accordion"},"templates":{"name":"Templates","category":"Accordion"},"icon":{"name":"Icons","category":"Accordion"},"keyboard-interaction":{"name":"Keyboard Interaction","category":"Accordion"},"defaultSample":"accordion/default"}