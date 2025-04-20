import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import DateRange from './date-range-functional';
import DaySpan from './day-span-functional';
import Format from './date-format-functional';
import Presets from './presets-functional';
import MonthRangePicker from './month-range-picker-functional';
export const daterangepickerRoutes = (<>
         <Route path='/:theme/daterangepicker/default' Component={Default}/>
         <Route path='/:theme/daterangepicker/date-range' Component={DateRange}/>
         <Route path='/:theme/daterangepicker/day-span' Component={DaySpan}/>
         <Route path='/:theme/daterangepicker/date-format' Component={Format}/>
         <Route path='/:theme/daterangepicker/presets' Component={Presets}/>
         <Route path='/:theme/daterangepicker/month-range-picker' Component={MonthRangePicker}/>

    </>);
export const daterangepickerCategory = { "default": { "name": "Default Functionalities", "category": "DateRangePicker" }, "date-range": { "name": "Date Range", "category": "DateRangePicker" }, "day-span": { "name": "Day Span", "category": "DateRangePicker" }, "date-format": { "name": "Format", "category": "DateRangePicker" }, "presets": { "name": "Preset Ranges", "category": "DateRangePicker" }, "month-range-picker": { "name": "Month Range Picker", "category": "DateRangePicker" }, "defaultSample": "daterangepicker/default" };
