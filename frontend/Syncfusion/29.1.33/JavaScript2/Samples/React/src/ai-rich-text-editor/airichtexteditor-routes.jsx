import { Route } from 'react-router-dom';
import * as React from 'react';
import { AIAssistant } from './assistant';
export const airichtexteditorRoutes = (<>
         <Route path='/:theme/ai-rich-text-editor/assistant' Component={AIAssistant}/>

    </>);
export const airichtexteditorCategory = { "assistant": { "name": "AI Assistant", "category": "Rich Text Editor" }, "defaultSample": "ai-rich-text-editor/assistant" };
