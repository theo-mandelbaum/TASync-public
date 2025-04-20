import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';


export const aismartpasteRoutes = (
    <>
         <Route  path='/:theme/ai-smart-paste/default' Component={ Default }/>

    </>
)

export const aismartpasteCategory = {"default":{"name":"Default Functionalities","category":"Smart Paste"},"defaultSample":"ai-smart-paste/default"}