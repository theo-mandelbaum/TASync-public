import {  Route } from 'react-router-dom';
import * as React from 'react';
import { SmartImageEditor } from './smart-image-editor';


export const aiimageeditorRoutes = (
    <>
         <Route  path='/:theme/ai-image-editor/smart-image-editor' Component={ SmartImageEditor }/>

    </>
)

export const aiimageeditorCategory = {"smart-image-editor":{"name":"Smart Image Editor","category":"Image Editor"},"defaultSample":"ai-image-editor/smart-image-editor"}