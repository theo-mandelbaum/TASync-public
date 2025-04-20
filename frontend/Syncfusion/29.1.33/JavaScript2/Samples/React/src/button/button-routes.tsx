import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import ButtonGroup from './button-group-functional';
import CheckBox from './checkbox-functional';
import RadioButton from './radio-button-functional';
import DropDownButton from './dropdown-button-functional';
import SplitButton from './split-button-functional';
import Switch from './switch-functional';
import ProgressButton from './progress-button-functional';


export const buttonRoutes = (
    <>
         <Route  path='/:theme/button/default' Component={ Default }/>
         <Route  path='/:theme/button/button-group' Component={ ButtonGroup }/>
         <Route  path='/:theme/button/checkbox' Component={ CheckBox }/>
         <Route  path='/:theme/button/radio-button' Component={ RadioButton }/>
         <Route  path='/:theme/button/dropdown-button' Component={ DropDownButton }/>
         <Route  path='/:theme/button/split-button' Component={ SplitButton }/>
         <Route  path='/:theme/button/switch' Component={ Switch }/>
         <Route  path='/:theme/button/progress-button' Component={ ProgressButton }/>

    </>
)

export const buttonCategory = {"default":{"name":"Default Functionalities","category":"Button"},"button-group":{"name":"Button Group","category":"Button"},"checkbox":{"name":"Checkbox","category":"Button"},"radio-button":{"name":"Radio Button","category":"Button"},"dropdown-button":{"name":"Dropdown Menu","category":"Button"},"split-button":{"name":"Split Button","category":"Button"},"switch":{"name":"Switch","category":"Button"},"progress-button":{"name":"Progress Button","category":"Button"},"defaultSample":"button/default"}