import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Inline from './inline-functional';
import CustomPalette from './custom-functional';
import Api from './api-functional';


export const colorpickerRoutes = (
    <>
         <Route  path='/:theme/color-picker/default' Component={ Default }/>
         <Route  path='/:theme/color-picker/inline' Component={ Inline }/>
         <Route  path='/:theme/color-picker/custom' Component={ CustomPalette }/>
         <Route  path='/:theme/color-picker/api' Component={ Api }/>

    </>
)

export const colorpickerCategory = {"default":{"name":"Default Functionalities","category":"Color Picker"},"inline":{"name":"Inline Mode","category":"Color Picker"},"custom":{"name":"Custom Palettes","category":"Color Picker"},"api":{"name":"API","category":"Color Picker"},"defaultSample":"color-picker/default"}