import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import UseCase from './use-case-functional';
import Integration from './integration-functional';
export const speechtotextRoutes = (<>
         <Route path='/:theme/speech-to-text/default' Component={Default}/>
         <Route path='/:theme/speech-to-text/use-case' Component={UseCase}/>
         <Route path='/:theme/speech-to-text/integration' Component={Integration}/>

    </>);
export const speechtotextCategory = { "default": { "name": "Default Functionalities", "category": "Speech To Text" }, "use-case": { "name": "Use Case", "category": "Integration" }, "integration": { "name": "AI AssistView", "category": "Integration" }, "defaultSample": "speech-to-text/default" };
