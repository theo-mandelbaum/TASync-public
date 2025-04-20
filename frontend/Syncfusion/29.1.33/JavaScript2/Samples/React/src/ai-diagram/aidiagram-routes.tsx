import {  Route } from 'react-router-dom';
import * as React from 'react';
import { SmartFlowchart } from './text-to-flowchart';
import { smartMindMap } from './text-to-mindmap';


export const aidiagramRoutes = (
    <>
         <Route  path='/:theme/ai-diagram/text-to-flowchart' Component={ SmartFlowchart }/>
         <Route  path='/:theme/ai-diagram/text-to-mindmap' Component={ smartMindMap }/>

    </>
)

export const aidiagramCategory = {"text-to-flowchart":{"name":"Text to Flowchart","category":"Diagram"},"text-to-mindmap":{"name":"Text to MindMap","category":"Diagram"},"defaultSample":"ai-diagram/text-to-flowchart"}