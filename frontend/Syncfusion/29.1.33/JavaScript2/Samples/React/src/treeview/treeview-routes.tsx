import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Icons from './icons-functional';
import Checkbox from './check-box-functional';
import Editing from './node-editing-functional';
import MultiSelect from './multiple-selection-functional';
import Dragdrop from './drag-and-drop-functional';
import Template from './template-functional';
import LocalData from './local-data-functional';
import RemoteData from './remote-data-functional';


export const treeviewRoutes = (
    <>
         <Route  path='/:theme/treeview/default' Component={ Default }/>
         <Route  path='/:theme/treeview/icons' Component={ Icons }/>
         <Route  path='/:theme/treeview/check-box' Component={ Checkbox }/>
         <Route  path='/:theme/treeview/node-editing' Component={ Editing }/>
         <Route  path='/:theme/treeview/multiple-selection' Component={ MultiSelect }/>
         <Route  path='/:theme/treeview/drag-and-drop' Component={ Dragdrop }/>
         <Route  path='/:theme/treeview/template' Component={ Template }/>
         <Route  path='/:theme/treeview/local-data' Component={ LocalData }/>
         <Route  path='/:theme/treeview/remote-data' Component={ RemoteData }/>

    </>
)

export const treeviewCategory = {"default":{"name":"Default Functionalities","category":"TreeView"},"icons":{"name":"Icons and Images","category":"TreeView"},"check-box":{"name":"Checkbox","category":"TreeView"},"node-editing":{"name":"Node Editing","category":"TreeView"},"multiple-selection":{"name":"Multiple Selection","category":"TreeView"},"drag-and-drop":{"name":"Drag and Drop","category":"TreeView"},"template":{"name":"Template","category":"TreeView"},"local-data":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"defaultSample":"treeview/default"}