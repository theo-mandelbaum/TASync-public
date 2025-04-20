import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Data from './data-binding-functional';
import Object from './object-value-binding-functional';
import DisabledItems from './disabled-items-functional';
import Grouping from './grouping-functional';
import Templates from './template-functional';
import Resize from './resize-functional';
import Filtering from './filtering-functional';
import CustomTag from './custom-value-functional';
import Virtualization from './virtual-scroll-functional';
import ChipCustomization from './chip-customization-functional';
import CheckBox from './checkbox-functional';
import CheckBoxGrouping from './grouping-with-checkbox-functional';
import SelectionLimit from './selection-limit-functional';
import DiacriticsFiltering from './diacritics-filtering-functional';


export const multiselectRoutes = (
    <>
         <Route  path='/:theme/multi-select/default' Component={ Default }/>
         <Route  path='/:theme/multi-select/data-binding' Component={ Data }/>
         <Route  path='/:theme/multi-select/object-value-binding' Component={ Object }/>
         <Route  path='/:theme/multi-select/disabled-items' Component={ DisabledItems }/>
         <Route  path='/:theme/multi-select/grouping' Component={ Grouping }/>
         <Route  path='/:theme/multi-select/template' Component={ Templates }/>
         <Route  path='/:theme/multi-select/resize' Component={ Resize }/>
         <Route  path='/:theme/multi-select/filtering' Component={ Filtering }/>
         <Route  path='/:theme/multi-select/custom-value' Component={ CustomTag }/>
         <Route  path='/:theme/multi-select/virtual-scroll' Component={ Virtualization }/>
         <Route  path='/:theme/multi-select/chip-customization' Component={ ChipCustomization }/>
         <Route  path='/:theme/multi-select/checkbox' Component={ CheckBox }/>
         <Route  path='/:theme/multi-select/grouping-with-checkbox' Component={ CheckBoxGrouping }/>
         <Route  path='/:theme/multi-select/selection-limit' Component={ SelectionLimit }/>
         <Route  path='/:theme/multi-select/diacritics-filtering' Component={ DiacriticsFiltering }/>

    </>
)

export const multiselectCategory = {"default":{"name":"Default Functionalities","category":"MultiSelect Dropdown"},"data-binding":{"name":"Data Binding","category":"MultiSelect Dropdown"},"object-value-binding":{"name":"Object Value Binding","category":"MultiSelect Dropdown"},"disabled-items":{"name":"Disabled Items","category":"MultiSelect"},"grouping":{"name":"Grouping","category":"MultiSelect Dropdown"},"template":{"name":"Templates","category":"MultiSelect Dropdown"},"resize":{"name":"Popup Resize","category":"MultiSelect Dropdown"},"filtering":{"name":"Filtering","category":"MultiSelect Dropdown"},"custom-value":{"name":"Custom Values","category":"MultiSelect Dropdown"},"virtual-scroll":{"name":"Virtualization","category":"MultiSelect Dropdown"},"chip-customization":{"name":"Chip Customization","category":"MultiSelect Dropdown"},"checkbox":{"name":"CheckBox","category":"MultiSelect Dropdown"},"grouping-with-checkbox":{"name":"Grouping with CheckBox","category":"MultiSelect Dropdown"},"selection-limit":{"name":"Selection Limit","category":"MultiSelect Dropdown"},"diacritics-filtering":{"name":"Diacritics Filtering","category":"MultiSelect Dropdown"},"defaultSample":"multi-select/default"}