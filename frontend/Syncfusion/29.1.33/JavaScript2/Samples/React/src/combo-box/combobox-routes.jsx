import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Grouping from './grouping-icon-functional';
import Data from './data-binding-functional';
import Object from './object-value-binding-functional';
import DisabledItems from './disabled-items-functional';
import Custom from './custom-value-functional';
import Filtering from './filtering-functional';
import Templates from './template-functional';
import Resize from './resize-functional';
import Virtualization from './virtual-scroll-functional';
import Cascading from './cascading-functional';
import DiacriticsFiltering from './diacritics-filtering-functional';
export const comboboxRoutes = (<>
         <Route path='/:theme/combo-box/default' Component={Default}/>
         <Route path='/:theme/combo-box/grouping-icon' Component={Grouping}/>
         <Route path='/:theme/combo-box/data-binding' Component={Data}/>
         <Route path='/:theme/combo-box/object-value-binding' Component={Object}/>
         <Route path='/:theme/combo-box/disabled-items' Component={DisabledItems}/>
         <Route path='/:theme/combo-box/custom-value' Component={Custom}/>
         <Route path='/:theme/combo-box/filtering' Component={Filtering}/>
         <Route path='/:theme/combo-box/template' Component={Templates}/>
         <Route path='/:theme/combo-box/resize' Component={Resize}/>
         <Route path='/:theme/combo-box/virtual-scroll' Component={Virtualization}/>
         <Route path='/:theme/combo-box/cascading' Component={Cascading}/>
         <Route path='/:theme/combo-box/diacritics-filtering' Component={DiacriticsFiltering}/>

    </>);
export const comboboxCategory = { "default": { "name": "Default Functionalities", "category": "ComboBox" }, "grouping-icon": { "name": "Grouping and Icons", "category": "ComboBox" }, "data-binding": { "name": "Data Binding", "category": "ComboBox" }, "object-value-binding": { "name": "Object Value Binding", "category": "ComboBox" }, "disabled-items": { "name": "Disabled Items", "category": "ComboBox" }, "custom-value": { "name": "Custom Value", "category": "ComboBox" }, "filtering": { "name": "Filtering", "category": "ComboBox" }, "template": { "name": "Templates", "category": "ComboBox" }, "resize": { "name": "Popup Resize", "category": "ComboBox" }, "virtual-scroll": { "name": "Virtualization", "category": "ComboBox" }, "cascading": { "name": "Cascading", "category": "ComboBox" }, "diacritics-filtering": { "name": "Diacritics Filtering", "category": "ComboBox" }, "defaultSample": "combo-box/default" };
