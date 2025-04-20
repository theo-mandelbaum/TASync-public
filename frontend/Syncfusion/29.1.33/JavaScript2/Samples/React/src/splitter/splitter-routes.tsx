import {  Route } from 'react-router-dom';
import * as React from 'react';
import Basic from './default-functional';
import ExpandCollapse from './expand-and-collapse-functional';
import AccordionIntegration from './accordion-navigation-menu-functional';
import DetailsView from './details-view-functional';
import OutlookLayout from './outlook-style-layout-functional';
import CodeEditor from './code-editor-layout-functional';


export const splitterRoutes = (
    <>
         <Route  path='/:theme/splitter/default' Component={ Basic }/>
         <Route  path='/:theme/splitter/expand-and-collapse' Component={ ExpandCollapse }/>
         <Route  path='/:theme/splitter/accordion-navigation-menu' Component={ AccordionIntegration }/>
         <Route  path='/:theme/splitter/details-view' Component={ DetailsView }/>
         <Route  path='/:theme/splitter/outlook-style-layout' Component={ OutlookLayout }/>
         <Route  path='/:theme/splitter/code-editor-layout' Component={ CodeEditor }/>

    </>
)

export const splitterCategory = {"default":{"name":"Default Functionalities","category":"Splitter"},"expand-and-collapse":{"name":"Expand and Collapse","category":"Splitter"},"accordion-navigation-menu":{"name":"Accordion Navigation Menu","category":"Use Case"},"details-view":{"name":"Details View","category":"Use Case"},"outlook-style-layout":{"name":"Outlook-style Layout","category":"Use Case"},"code-editor-layout":{"name":"Code Editor Layout","category":"Use Case"},"defaultSample":"splitter/default"}