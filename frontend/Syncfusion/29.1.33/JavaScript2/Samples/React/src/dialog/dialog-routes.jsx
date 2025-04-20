import { Route } from 'react-router-dom';
import * as React from 'react';
import DefaultFunctionalities from './default-functional';
import Modal from './modal-dialog-functional';
import Template from './template-functional';
import AjaxContent from './dialog-contents-via-ajax-functional';
import Draggable from './draggable-functional';
import Resizable from './resizable-functional';
import Positioning from './position-functional';
import Animation from './animation-functional';
import MultipleDialogs from './multiple-dialogs-functional';
import ComponentsDialog from './components-dialog-functional';
export const dialogRoutes = (<>
         <Route path='/:theme/dialog/default' Component={DefaultFunctionalities}/>
         <Route path='/:theme/dialog/modal-dialog' Component={Modal}/>
         <Route path='/:theme/dialog/template' Component={Template}/>
         <Route path='/:theme/dialog/dialog-contents-via-ajax' Component={AjaxContent}/>
         <Route path='/:theme/dialog/draggable' Component={Draggable}/>
         <Route path='/:theme/dialog/resizable' Component={Resizable}/>
         <Route path='/:theme/dialog/position' Component={Positioning}/>
         <Route path='/:theme/dialog/animation' Component={Animation}/>
         <Route path='/:theme/dialog/multiple-dialogs' Component={MultipleDialogs}/>
         <Route path='/:theme/dialog/components-dialog' Component={ComponentsDialog}/>

    </>);
export const dialogCategory = { "default": { "name": "Default Functionalities", "category": "Dialog" }, "modal-dialog": { "name": "Modal", "category": "Dialog" }, "template": { "name": "Template", "category": "Dialog" }, "dialog-contents-via-ajax": { "name": "Ajax Content", "category": "Dialog" }, "draggable": { "name": "Draggable", "category": "Dialog" }, "resizable": { "name": "Resizable", "category": "Dialog" }, "position": { "name": "Positioning", "category": "Dialog" }, "animation": { "name": "Animation", "category": "Dialog" }, "multiple-dialogs": { "name": "Multiple Dialogs", "category": "Dialog" }, "components-dialog": { "name": "Components inside Dialog", "category": "Dialog" }, "defaultSample": "dialog/default" };
