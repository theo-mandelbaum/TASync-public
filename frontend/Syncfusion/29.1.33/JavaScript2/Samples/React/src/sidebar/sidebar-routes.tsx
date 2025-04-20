import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Dock from './docking-sidebar-functional';
import API from './api-functional';
import SidebarWithMenu from './sidebar-menu-functional';
import ResponsivePanel from './responsive-panel-functional';
import SidebarWithList from './sidebar-list-functional';


export const sidebarRoutes = (
    <>
         <Route  path='/:theme/sidebar/default' Component={ Default }/>
         <Route  path='/:theme/sidebar/docking-sidebar' Component={ Dock }/>
         <Route  path='/:theme/sidebar/api' Component={ API }/>
         <Route  path='/:theme/sidebar/sidebar-menu' Component={ SidebarWithMenu }/>
         <Route  path='/:theme/sidebar/responsive-panel' Component={ ResponsivePanel }/>
         <Route  path='/:theme/sidebar/sidebar-list' Component={ SidebarWithList }/>

    </>
)

export const sidebarCategory = {"default":{"name":"Default Functionalities","category":"Sidebar"},"docking-sidebar":{"name":"Dock","category":"Sidebar"},"api":{"name":"API","category":"Sidebar"},"sidebar-menu":{"name":"Sidebar Menu","category":"Sidebar"},"responsive-panel":{"name":"Responsive Panel","category":"Sidebar"},"sidebar-list":{"name":"Sidebar With ListView","category":"Sidebar"},"defaultSample":"sidebar/default"}