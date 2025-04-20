import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import DropDowns from './dropdowns-functional';
import Pickers from './pickers-functional';
import UseCase from './edit-post-functional';
export const inplaceeditorRoutes = (<>
         <Route path='/:theme/inplace-editor/default' Component={Default}/>
         <Route path='/:theme/inplace-editor/dropdowns' Component={DropDowns}/>
         <Route path='/:theme/inplace-editor/pickers' Component={Pickers}/>
         <Route path='/:theme/inplace-editor/edit-post' Component={UseCase}/>

    </>);
export const inplaceeditorCategory = { "default": { "name": "Overview", "category": "In-place Editor" }, "dropdowns": { "name": "DropDown Components", "category": "In-place Editor" }, "pickers": { "name": "Date Components", "category": "In-place Editor" }, "edit-post": { "name": "Edit Post", "category": "Use Case" }, "defaultSample": "inplace-editor/default" };
