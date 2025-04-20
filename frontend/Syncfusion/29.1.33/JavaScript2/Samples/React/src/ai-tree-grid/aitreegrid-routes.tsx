import {  Route } from 'react-router-dom';
import * as React from 'react';
import { AdaptiveDataStructuring } from './adaptive-datastructuring';


export const aitreegridRoutes = (
    <>
         <Route  path='/:theme/ai-tree-grid/adaptive-datastructuring' Component={ AdaptiveDataStructuring }/>

    </>
)

export const aitreegridCategory = {"adaptive-datastructuring":{"name":"Adaptive Data Structuring","category":"Tree Grid"},"defaultSample":"ai-tree-grid/adaptive-datastructuring"}