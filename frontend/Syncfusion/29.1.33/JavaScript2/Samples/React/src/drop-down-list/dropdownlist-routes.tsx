import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Grouping from './grouping-icon-functional';
import Data from './data-binding-functional';
import Object from './object-value-binding-functional';
import DisabledItems from './disabled-items-functional';
import Filtering from './filtering-functional';
import Templates from './template-functional';
import Resize from './resize-functional';
import Virtualization from './virtual-scroll-functional';
import Cascading from './cascading-functional';
import Inline from './inline-functional';
import DiacriticsFiltering from './diacritics-filtering-functional';


export const dropdownlistRoutes = (
    <>
         <Route  path='/:theme/drop-down-list/default' Component={ Default }/>
         <Route  path='/:theme/drop-down-list/grouping-icon' Component={ Grouping }/>
         <Route  path='/:theme/drop-down-list/data-binding' Component={ Data }/>
         <Route  path='/:theme/drop-down-list/object-value-binding' Component={ Object }/>
         <Route  path='/:theme/drop-down-list/disabled-items' Component={ DisabledItems }/>
         <Route  path='/:theme/drop-down-list/filtering' Component={ Filtering }/>
         <Route  path='/:theme/drop-down-list/template' Component={ Templates }/>
         <Route  path='/:theme/drop-down-list/resize' Component={ Resize }/>
         <Route  path='/:theme/drop-down-list/virtual-scroll' Component={ Virtualization }/>
         <Route  path='/:theme/drop-down-list/cascading' Component={ Cascading }/>
         <Route  path='/:theme/drop-down-list/inline' Component={ Inline }/>
         <Route  path='/:theme/drop-down-list/diacritics-filtering' Component={ DiacriticsFiltering }/>

    </>
)

export const dropdownlistCategory = {"default":{"name":"Default Functionalities","category":"Dropdown List"},"grouping-icon":{"name":"Grouping and Icons","category":"Dropdown List"},"data-binding":{"name":"Data Binding","category":"Dropdown List"},"object-value-binding":{"name":"Object Value Binding","category":"Dropdown List"},"disabled-items":{"name":"Disabled Items","category":"Dropdown List"},"filtering":{"name":"Filtering","category":"Dropdown List"},"template":{"name":"Templates","category":"Dropdown List"},"resize":{"name":"Popup Resize","category":"Dropdown List"},"virtual-scroll":{"name":"Virtualization","category":"Dropdown List"},"cascading":{"name":"Cascading","category":"Dropdown List"},"inline":{"name":"Inline","category":"Dropdown List"},"diacritics-filtering":{"name":"Diacritics Filtering","category":"Dropdown List"},"defaultSample":"drop-down-list/default"}