import {  Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './overview-functional';
import DefaultFunctionalities from './default-functionalities-functional';
import CustomFormat from './custom-format-functional';
import MentionIntegration from './mention-integration-functional';


export const markdowneditorRoutes = (
    <>
         <Route  path='/:theme/markdown-editor/overview' Component={ Overview }/>
         <Route  path='/:theme/markdown-editor/default-functionalities' Component={ DefaultFunctionalities }/>
         <Route  path='/:theme/markdown-editor/custom-format' Component={ CustomFormat }/>
         <Route  path='/:theme/markdown-editor/mention-integration' Component={ MentionIntegration }/>

    </>
)

export const markdowneditorCategory = {"overview":{"name":"Overview","category":"Markdown Editor"},"default-functionalities":{"name":"Default Functionalities","category":"Markdown Editor"},"custom-format":{"name":"Custom Format","category":"Markdown Editor"},"mention-integration":{"name":"@ Mention","category":"Markdown Editor"},"defaultSample":"markdown-editor/overview"}