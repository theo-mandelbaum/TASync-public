import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import LightWeight from './light-weight-functional';
import DateTimeAxis from './date-time-functional';
import NumericAxis from './double-functional';
import LogarithmicAxis from './logarithmic-functional';
import MultilevelLabels from './multilevel-functional';
import PeriodSelectorCandle from './period-selector-functional';
import EmptyData from './empty-data-functional';
import Customization from './filter-functional';
import RangeExport from './export-functional';
import RTL from './right-to-left-functional';
export const rangenavigatorRoutes = (<>
         <Route path='/:theme/range-navigator/default' Component={Default}/>
         <Route path='/:theme/range-navigator/light-weight' Component={LightWeight}/>
         <Route path='/:theme/range-navigator/date-time' Component={DateTimeAxis}/>
         <Route path='/:theme/range-navigator/double' Component={NumericAxis}/>
         <Route path='/:theme/range-navigator/logarithmic' Component={LogarithmicAxis}/>
         <Route path='/:theme/range-navigator/multilevel' Component={MultilevelLabels}/>
         <Route path='/:theme/range-navigator/period-selector' Component={PeriodSelectorCandle}/>
         <Route path='/:theme/range-navigator/empty-data' Component={EmptyData}/>
         <Route path='/:theme/range-navigator/filter' Component={Customization}/>
         <Route path='/:theme/range-navigator/export' Component={RangeExport}/>
         <Route path='/:theme/range-navigator/right-to-left' Component={RTL}/>

    </>);
export const rangenavigatorCategory = { "default": { "name": "Default", "category": "Range Selector" }, "light-weight": { "name": "Lightweight", "category": "Range Selector" }, "date-time": { "name": "DateTime", "category": "Axis" }, "double": { "name": "Numeric Axis", "category": "Axis" }, "logarithmic": { "name": "Logarithmic Axis", "category": "Axis" }, "multilevel": { "name": "Multilevel Labels", "category": "Axis" }, "period-selector": { "name": "Period Selector", "category": "Customization" }, "empty-data": { "name": "Empty Points", "category": "Customization" }, "filter": { "name": "Filter", "category": "Customization" }, "export": { "name": "Print and Export", "category": "Export" }, "right-to-left": { "name": "RTL", "category": "RTL" }, "defaultSample": "range-navigator/default" };
