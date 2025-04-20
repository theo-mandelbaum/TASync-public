import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Linear from './linear-functional';
import Radial from './radial-functional';
import Styles from './styles-functional';
import Template from './template-functional';
import Modal from './modal-functional';
export const speeddialRoutes = (<>
         <Route path='/:theme/speed-dial/default' Component={Default}/>
         <Route path='/:theme/speed-dial/linear' Component={Linear}/>
         <Route path='/:theme/speed-dial/radial' Component={Radial}/>
         <Route path='/:theme/speed-dial/styles' Component={Styles}/>
         <Route path='/:theme/speed-dial/template' Component={Template}/>
         <Route path='/:theme/speed-dial/modal' Component={Modal}/>

    </>);
export const speeddialCategory = { "default": { "name": "Default Functionalities", "category": "SpeedDial" }, "linear": { "name": "Position (Linear)", "category": "SpeedDial" }, "radial": { "name": "Radial Menu", "category": "SpeedDial" }, "styles": { "name": "Styles", "category": "SpeedDial" }, "template": { "name": "Template", "category": "SpeedDial" }, "modal": { "name": "Modal", "category": "SpeedDial" }, "defaultSample": "speed-dial/default" };
