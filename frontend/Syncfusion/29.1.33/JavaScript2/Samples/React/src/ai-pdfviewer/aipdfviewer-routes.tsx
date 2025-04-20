import {  Route } from 'react-router-dom';
import * as React from 'react';
import { SmartFill } from './smartfill';
import { SmartRedact } from './smartredact';
import { Summarizer } from './summarizer';


export const aipdfviewerRoutes = (
    <>
         <Route  path='/:theme/ai-pdfviewer/smartfill' Component={ SmartFill }/>
         <Route  path='/:theme/ai-pdfviewer/smartredact' Component={ SmartRedact }/>
         <Route  path='/:theme/ai-pdfviewer/summarizer' Component={ Summarizer }/>

    </>
)

export const aipdfviewerCategory = {"smartfill":{"name":"Smart Fill","category":"PDF Viewer"},"smartredact":{"name":"Smart Redact","category":"PDF Viewer"},"summarizer":{"name":"Summarizer","category":"PDF Viewer"},"defaultSample":"ai-pdfviewer/smartfill"}