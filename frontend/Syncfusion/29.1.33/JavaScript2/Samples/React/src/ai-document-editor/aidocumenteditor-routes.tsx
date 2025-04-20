import {  Route } from 'react-router-dom';
import * as React from 'react';
import { WritingAssist } from './writing-assist';
import { SmartEditor } from './smart-editor';


export const aidocumenteditorRoutes = (
    <>
         <Route  path='/:theme/ai-document-editor/writing-assist' Component={ WritingAssist }/>
         <Route  path='/:theme/ai-document-editor/smart-editor' Component={ SmartEditor }/>

    </>
)

export const aidocumenteditorCategory = {"writing-assist":{"name":"Writing Assist","category":"Document Editor"},"smart-editor":{"name":"Smart Editor","category":"Document Editor"},"defaultSample":"ai-document-editor/writing-assist"}