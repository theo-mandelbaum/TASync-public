import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import DualListBox from './dual-list-box-functional';
import DragAndDrop from './drag-and-drop-functional';
import CheckBox from './checkbox-functional';
import Template from './template-functional';
import Api from './api-functional';


export const listboxRoutes = (
    <>
         <Route  path='/:theme/list-box/default' Component={ Default }/>
         <Route  path='/:theme/list-box/dual-list-box' Component={ DualListBox }/>
         <Route  path='/:theme/list-box/drag-and-drop' Component={ DragAndDrop }/>
         <Route  path='/:theme/list-box/checkbox' Component={ CheckBox }/>
         <Route  path='/:theme/list-box/template' Component={ Template }/>
         <Route  path='/:theme/list-box/api' Component={ Api }/>

    </>
)

export const listboxCategory = {"default":{"name":"Default Functionalities","category":"List Box"},"dual-list-box":{"name":"Dual ListBox","category":"List Box"},"drag-and-drop":{"name":"Drag And Drop","category":"List Box"},"checkbox":{"name":"Checkbox","category":"List Box"},"template":{"name":"Template","category":"List Box"},"api":{"name":"API","category":"List Box"},"defaultSample":"list-box/default"}