import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Precision from './precision-functional';
import Tooltip from './tooltip-functional';
import Label from './label-functional';
import Template from './template-functional';
import KeyboardNavigation from './keyboard-navigation-functional';


export const ratingRoutes = (
    <>
         <Route  path='/:theme/rating/default' Component={ Default }/>
         <Route  path='/:theme/rating/precision' Component={ Precision }/>
         <Route  path='/:theme/rating/tooltip' Component={ Tooltip }/>
         <Route  path='/:theme/rating/label' Component={ Label }/>
         <Route  path='/:theme/rating/template' Component={ Template }/>
         <Route  path='/:theme/rating/keyboard-navigation' Component={ KeyboardNavigation }/>

    </>
)

export const ratingCategory = {"default":{"name":"Default Functionalities","category":"Rating"},"precision":{"name":"Precision","category":"Rating"},"tooltip":{"name":"Tooltip","category":"Rating"},"label":{"name":"Label","category":"Rating"},"template":{"name":"Template","category":"Rating"},"keyboard-navigation":{"name":"Keyboard Navigations","category":"Rating"},"defaultSample":"rating/default"}