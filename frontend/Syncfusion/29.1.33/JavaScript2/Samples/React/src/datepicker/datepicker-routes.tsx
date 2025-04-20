import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Range from './date-range-functional';
import Dateformat from './date-format-functional';
import Disabled from './disabled-functional';
import Special from './special-dates-functional';
import MonthPicker from './month-picker-functional';
import MaskSupport from './input-mask-functional';


export const datepickerRoutes = (
    <>
         <Route  path='/:theme/datepicker/default' Component={ Default }/>
         <Route  path='/:theme/datepicker/date-range' Component={ Range }/>
         <Route  path='/:theme/datepicker/date-format' Component={ Dateformat }/>
         <Route  path='/:theme/datepicker/disabled' Component={ Disabled }/>
         <Route  path='/:theme/datepicker/special-dates' Component={ Special }/>
         <Route  path='/:theme/datepicker/month-picker' Component={ MonthPicker }/>
         <Route  path='/:theme/datepicker/input-mask' Component={ MaskSupport }/>

    </>
)

export const datepickerCategory = {"default":{"name":"Default Functionalities","category":"DatePicker"},"date-range":{"name":"Date Range","category":"DatePicker"},"date-format":{"name":"Format","category":"DatePicker"},"disabled":{"name":"Disabled Dates","category":"DatePicker"},"special-dates":{"name":"Special Dates","category":"DatePicker"},"month-picker":{"name":"Month Picker","category":"DatePicker"},"input-mask":{"name":"Mask Support","category":"DatePicker"},"defaultSample":"datepicker/default"}