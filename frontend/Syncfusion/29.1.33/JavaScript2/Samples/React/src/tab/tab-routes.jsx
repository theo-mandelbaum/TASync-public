import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Orientation from './orientation-functional';
import Responsive from './responsive-modes-functional';
import Wizard from './wizard-functional';
import Dragdrop from './drag-and-drop-functional';
import KeyboardInteraction from './keyboard-interaction-functional';
export const tabRoutes = (<>
         <Route path='/:theme/tab/default' Component={Default}/>
         <Route path='/:theme/tab/orientation' Component={Orientation}/>
         <Route path='/:theme/tab/responsive-modes' Component={Responsive}/>
         <Route path='/:theme/tab/wizard' Component={Wizard}/>
         <Route path='/:theme/tab/drag-and-drop' Component={Dragdrop}/>
         <Route path='/:theme/tab/keyboard-interaction' Component={KeyboardInteraction}/>

    </>);
export const tabCategory = { "default": { "name": "Default Functionalities", "category": "Tabs" }, "orientation": { "name": "Orientation", "category": "Tabs" }, "responsive-modes": { "name": "Responsive Modes", "category": "Tabs" }, "wizard": { "name": "Wizard", "category": "Tabs" }, "drag-and-drop": { "name": "Drag and Drop", "category": "Tabs" }, "keyboard-interaction": { "name": "Keyboard Interaction", "category": "Tabs" }, "defaultSample": "tab/default" };
