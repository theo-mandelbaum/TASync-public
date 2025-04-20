import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Color from './color-functional';


export const appbarRoutes = (
    <>
         <Route  path='/:theme/appbar/default' Component={ Default }/>
         <Route  path='/:theme/appbar/color' Component={ Color }/>

    </>
)

export const appbarCategory = {"default":{"name":"Default Functionalities","category":"AppBar"},"color":{"name":"Color","category":"AppBar"},"defaultSample":"appbar/default"}