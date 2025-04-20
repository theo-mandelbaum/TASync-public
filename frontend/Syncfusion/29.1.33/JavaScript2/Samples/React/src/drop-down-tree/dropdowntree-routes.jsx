import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Icons from './icons-functional';
import Checkbox from './checkbox-functional';
import MultiSelect from './multiple-selection-functional';
import Templates from './template-functional';
import CustomTemplate from './custom-template-functional';
import Filtering from './filtering-functional';
import LocalData from './local-data-functional';
import RemoteData from './remote-data-functional';
export const dropdowntreeRoutes = (<>
         <Route path='/:theme/drop-down-tree/default' Component={Default}/>
         <Route path='/:theme/drop-down-tree/icons' Component={Icons}/>
         <Route path='/:theme/drop-down-tree/checkbox' Component={Checkbox}/>
         <Route path='/:theme/drop-down-tree/multiple-selection' Component={MultiSelect}/>
         <Route path='/:theme/drop-down-tree/template' Component={Templates}/>
         <Route path='/:theme/drop-down-tree/custom-template' Component={CustomTemplate}/>
         <Route path='/:theme/drop-down-tree/filtering' Component={Filtering}/>
         <Route path='/:theme/drop-down-tree/local-data' Component={LocalData}/>
         <Route path='/:theme/drop-down-tree/remote-data' Component={RemoteData}/>

    </>);
export const dropdowntreeCategory = { "default": { "name": "Default Functionalities", "category": "Dropdown Tree" }, "icons": { "name": "Icons and Images", "category": "Dropdown Tree" }, "checkbox": { "name": "Checkbox", "category": "Dropdown Tree" }, "multiple-selection": { "name": "Multiple Selection", "category": "Dropdown Tree" }, "template": { "name": "Template", "category": "Dropdown Tree" }, "custom-template": { "name": "Custom Template", "category": "Dropdown Tree" }, "filtering": { "name": "Filtering", "category": "Dropdown Tree" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "defaultSample": "drop-down-tree/default" };
