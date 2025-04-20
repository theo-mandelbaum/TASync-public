import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import DataBinding from './data-binding-functional';
import Scrollable from './scrollable-functional';
import Template from './template-functional';
import HamburgerMenu from './hamburger-mode-functional';
import Api from './api-functional';
import ToolbarIntegration from './toolbar-integration-functional';


export const menuRoutes = (
    <>
         <Route  path='/:theme/menu/default' Component={ Default }/>
         <Route  path='/:theme/menu/data-binding' Component={ DataBinding }/>
         <Route  path='/:theme/menu/scrollable' Component={ Scrollable }/>
         <Route  path='/:theme/menu/template' Component={ Template }/>
         <Route  path='/:theme/menu/hamburger-mode' Component={ HamburgerMenu }/>
         <Route  path='/:theme/menu/api' Component={ Api }/>
         <Route  path='/:theme/menu/toolbar-integration' Component={ ToolbarIntegration }/>

    </>
)

export const menuCategory = {"default":{"name":"Default Functionalities","category":"Menu Bar"},"data-binding":{"name":"Data Binding","category":"Menu Bar"},"scrollable":{"name":"Scrollable","category":"Menu Bar"},"template":{"name":"Template","category":"Menu Bar"},"hamburger-mode":{"name":"Hamburger Mode","category":"Menu Bar"},"api":{"name":"API","category":"Menu Bar"},"toolbar-integration":{"name":"Toolbar Integration","category":"Use Case"},"defaultSample":"menu/default"}