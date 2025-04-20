import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Grouping from './grouping-icon-functional';
import Data from './data-binding-functional';
import Oject from './object-value-binding-functional';
import DisabledItems from './disabled-items-functional';
import Templates from './template-functional';
import Resize from './resize-functional';
import Virtualization from './virtual-scroll-functional';
import Highlight from './highlight-functional';
import CustomFiltering from './custom-filtering-functional';
import DiacriticsFiltering from './diacritics-filtering-functional';


export const autocompleteRoutes = (
    <>
         <Route  path='/:theme/auto-complete/default' Component={ Default }/>
         <Route  path='/:theme/auto-complete/grouping-icon' Component={ Grouping }/>
         <Route  path='/:theme/auto-complete/data-binding' Component={ Data }/>
         <Route  path='/:theme/auto-complete/object-value-binding' Component={ Oject }/>
         <Route  path='/:theme/auto-complete/disabled-items' Component={ DisabledItems }/>
         <Route  path='/:theme/auto-complete/template' Component={ Templates }/>
         <Route  path='/:theme/auto-complete/resize' Component={ Resize }/>
         <Route  path='/:theme/auto-complete/virtual-scroll' Component={ Virtualization }/>
         <Route  path='/:theme/auto-complete/highlight' Component={ Highlight }/>
         <Route  path='/:theme/auto-complete/custom-filtering' Component={ CustomFiltering }/>
         <Route  path='/:theme/auto-complete/diacritics-filtering' Component={ DiacriticsFiltering }/>

    </>
)

export const autocompleteCategory = {"default":{"name":"Default Functionalities","category":"AutoComplete"},"grouping-icon":{"name":"Grouping and Icons","category":"AutoComplete"},"data-binding":{"name":"Data Binding","category":"AutoComplete"},"object-value-binding":{"name":"Object Value Binding","category":"AutoComplete"},"disabled-items":{"name":"Disabled Items","category":"AutoComplete"},"template":{"name":"Templates","category":"AutoComplete"},"resize":{"name":"Popup Resize","category":"AutoComplete"},"virtual-scroll":{"name":"Virtualization","category":"AutoComplete"},"highlight":{"name":"Highlight","category":"AutoComplete"},"custom-filtering":{"name":"Custom Filtering","category":"AutoComplete"},"diacritics-filtering":{"name":"Diacritics Filtering","category":"AutoComplete"},"defaultSample":"auto-complete/default"}