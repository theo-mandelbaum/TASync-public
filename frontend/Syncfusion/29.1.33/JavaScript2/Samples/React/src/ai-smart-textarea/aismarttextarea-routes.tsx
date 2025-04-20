import {  Route } from 'react-router-dom';
import * as React from 'react';
import { Default } from './default';


export const aismarttextareaRoutes = (
    <>
         <Route  path='/:theme/ai-smart-textarea/default' Component={ Default }/>

    </>
)

export const aismarttextareaCategory = {"default":{"name":"Smart TextArea","category":"Smart TextArea"},"defaultSample":"ai-smart-textarea/default"}