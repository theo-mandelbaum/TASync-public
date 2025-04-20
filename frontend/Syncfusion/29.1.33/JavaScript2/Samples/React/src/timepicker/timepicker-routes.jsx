import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Range from './time-range-functional';
import Format from './time-format-functional';
import Formatting from './list-formatting-functional';
import MaskSupport from './input-mask-functional';
export const timepickerRoutes = (<>
         <Route path='/:theme/timepicker/default' Component={Default}/>
         <Route path='/:theme/timepicker/time-range' Component={Range}/>
         <Route path='/:theme/timepicker/time-format' Component={Format}/>
         <Route path='/:theme/timepicker/list-formatting' Component={Formatting}/>
         <Route path='/:theme/timepicker/input-mask' Component={MaskSupport}/>

    </>);
export const timepickerCategory = { "default": { "name": "Default Functionalities", "category": "TimePicker" }, "time-range": { "name": "Time Range", "category": "TimePicker" }, "time-format": { "name": "Format", "category": "TimePicker" }, "list-formatting": { "name": "Time Duration", "category": "TimePicker" }, "input-mask": { "name": "Mask Support", "category": "TimePicker" }, "defaultSample": "timepicker/default" };
