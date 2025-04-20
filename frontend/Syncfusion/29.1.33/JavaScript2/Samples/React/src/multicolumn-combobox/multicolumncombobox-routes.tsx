import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Remote from './remote-databinding-functional';
import Group from './grouping-functional';
import Filter from './filtering-functional';
import Virtual from './virtualization-functional';
import Sort from './sorting-functional';
import { RTL } from './rtl';
import Keyboard from './keyboard-navigation-functional';
import Template from './template-functional';


export const multicolumncomboboxRoutes = (
    <>
         <Route  path='/:theme/multicolumn-combobox/default' Component={ Default }/>
         <Route  path='/:theme/multicolumn-combobox/remote-databinding' Component={ Remote }/>
         <Route  path='/:theme/multicolumn-combobox/grouping' Component={ Group }/>
         <Route  path='/:theme/multicolumn-combobox/filtering' Component={ Filter }/>
         <Route  path='/:theme/multicolumn-combobox/virtualization' Component={ Virtual }/>
         <Route  path='/:theme/multicolumn-combobox/sorting' Component={ Sort }/>
         <Route  path='/:theme/multicolumn-combobox/rtl' Component={ RTL }/>
         <Route  path='/:theme/multicolumn-combobox/keyboard-navigation' Component={ Keyboard }/>
         <Route  path='/:theme/multicolumn-combobox/template' Component={ Template }/>

    </>
)

export const multicolumncomboboxCategory = {"default":{"name":"Default Functionalities","category":"MultiColumn Combobox"},"remote-databinding":{"name":"Remote Data","category":"MultiColumn Combobox"},"grouping":{"name":"Grouping","category":"MultiColumn Combobox"},"filtering":{"name":"Filtering","category":"MultiColumn Combobox"},"virtualization":{"name":"Virtualization","category":"MultiColumn Combobox"},"sorting":{"name":"Sorting","category":"MultiColumn Combobox"},"rtl":{"name":"RTL","category":"MultiColumn Combobox"},"keyboard-navigation":{"name":"Keyboard Navigation","category":"MultiColumn Combobox"},"template":{"name":"Template","category":"MultiColumn Combobox"},"defaultSample":"multicolumn-combobox/default"}