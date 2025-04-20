import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import BindToLocation from './bind-to-location-functional';
import TemplateAndCustomization from './template-and-customization-functional';
import OverflowModes from './overflow-modes-functional';
import Events from './events-functional';
import KeyboardNavigation from './keyboard-navigation-functional';
import AddressBar from './address-bar-functional';
export const breadcrumbRoutes = (<>
         <Route path='/:theme/breadcrumb/default' Component={Default}/>
         <Route path='/:theme/breadcrumb/bind-to-location' Component={BindToLocation}/>
         <Route path='/:theme/breadcrumb/template-and-customization' Component={TemplateAndCustomization}/>
         <Route path='/:theme/breadcrumb/overflow-modes' Component={OverflowModes}/>
         <Route path='/:theme/breadcrumb/events' Component={Events}/>
         <Route path='/:theme/breadcrumb/keyboard-navigation' Component={KeyboardNavigation}/>
         <Route path='/:theme/breadcrumb/address-bar' Component={AddressBar}/>

    </>);
export const breadcrumbCategory = { "default": { "name": "Default Functionalities", "category": "Breadcrumb" }, "bind-to-location": { "name": "Bind to Location", "category": "Breadcrumb" }, "template-and-customization": { "name": "Template and Customization", "category": "Breadcrumb" }, "overflow-modes": { "name": "Overflow Modes", "category": "Breadcrumb" }, "events": { "name": "Events", "category": "Breadcrumb" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "Breadcrumb" }, "address-bar": { "name": "Address Bar", "category": "Use Case" }, "defaultSample": "breadcrumb/default" };
