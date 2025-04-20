import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Range from './date-range-functional';
import Disabled from './disabled-functional';
import Special from './special-dates-functional';
import MultipleSelection from './multi-selection-functional';
import MonthPicker from './month-picker-functional';
import IslamicCalendar from './islamic-calendar-functional';
export const calendarRoutes = (<>
         <Route path='/:theme/calendar/default' Component={Default}/>
         <Route path='/:theme/calendar/date-range' Component={Range}/>
         <Route path='/:theme/calendar/disabled' Component={Disabled}/>
         <Route path='/:theme/calendar/special-dates' Component={Special}/>
         <Route path='/:theme/calendar/multi-selection' Component={MultipleSelection}/>
         <Route path='/:theme/calendar/month-picker' Component={MonthPicker}/>
         <Route path='/:theme/calendar/islamic-calendar' Component={IslamicCalendar}/>

    </>);
export const calendarCategory = { "default": { "name": "Default Functionalities", "category": "Calendar" }, "date-range": { "name": "Date Range", "category": "Calendar" }, "disabled": { "name": "Disabled Dates", "category": "Calendar" }, "special-dates": { "name": "Special Dates", "category": "Calendar" }, "multi-selection": { "name": "Multiple Selection", "category": "Calendar" }, "month-picker": { "name": "Month Picker", "category": "Calendar" }, "islamic-calendar": { "name": "Islamic Calendar", "category": "Calendar" }, "defaultSample": "calendar/default" };
