import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import FloatingLabel from './floating-label-functional';
import Resize from './resize-functional';
import Api from './api-functional';


export const textareaRoutes = (
    <>
         <Route  path='/:theme/textarea/default' Component={ Default }/>
         <Route  path='/:theme/textarea/floating-label' Component={ FloatingLabel }/>
         <Route  path='/:theme/textarea/resize' Component={ Resize }/>
         <Route  path='/:theme/textarea/api' Component={ Api }/>

    </>
)

export const textareaCategory = {"default":{"name":"Default Functionalities","category":"TextArea"},"floating-label":{"name":"Floating Label","category":"TextArea"},"resize":{"name":"Resize","category":"TextArea"},"api":{"name":"API","category":"TextArea"},"defaultSample":"textarea/default"}