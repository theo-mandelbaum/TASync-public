import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Range from './date-time-range-functional';
import Dateformat from './date-time-format-functional';
import Disabled from './disabled-functional';
import Special from './special-dates-functional';
import MaskSupport from './input-mask-functional';


export const datetimepickerRoutes = (
    <>
         <Route  path='/:theme/datetimepicker/default' Component={ Default }/>
         <Route  path='/:theme/datetimepicker/date-time-range' Component={ Range }/>
         <Route  path='/:theme/datetimepicker/date-time-format' Component={ Dateformat }/>
         <Route  path='/:theme/datetimepicker/disabled' Component={ Disabled }/>
         <Route  path='/:theme/datetimepicker/special-dates' Component={ Special }/>
         <Route  path='/:theme/datetimepicker/input-mask' Component={ MaskSupport }/>

    </>
)

export const datetimepickerCategory = {"default":{"name":"Default Functionalities","category":"DateTimePicker"},"date-time-range":{"name":"DateTime Range","category":"DateTimePicker"},"date-time-format":{"name":"Format","category":"DateTimePicker"},"disabled":{"name":"Disabled Dates","category":"DateTimePicker"},"special-dates":{"name":"Special Dates","category":"DateTimePicker"},"input-mask":{"name":"Mask Support","category":"DateTimePicker"},"defaultSample":"datetimepicker/default"}