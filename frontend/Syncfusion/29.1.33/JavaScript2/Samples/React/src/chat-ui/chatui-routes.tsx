import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import LoadOnDemand from './loadOn-demand-functional';
import Template from './template-functional';
import API from './api-functional';
import ChatIntegration from './chat-integration-functional';


export const chatuiRoutes = (
    <>
         <Route  path='/:theme/chat-ui/default' Component={ Default }/>
         <Route  path='/:theme/chat-ui/loadOn-demand' Component={ LoadOnDemand }/>
         <Route  path='/:theme/chat-ui/template' Component={ Template }/>
         <Route  path='/:theme/chat-ui/api' Component={ API }/>
         <Route  path='/:theme/chat-ui/chat-integration' Component={ ChatIntegration }/>

    </>
)

export const chatuiCategory = {"default":{"name":"Default Functionalities","category":"Chat UI"},"loadOn-demand":{"name":"Load On-demand","category":"Chat UI"},"template":{"name":"Template","category":"Chat UI"},"api":{"name":"API","category":"Chat UI"},"chat-integration":{"name":"Use Case","category":"Integration"},"defaultSample":"chat-ui/default"}