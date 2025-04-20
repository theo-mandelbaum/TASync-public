import { Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import OHLC from './ohlc-functional';
import MultiPane from './multi-pane-functional';
import MultipleSeries from './multiple-series-functional';
import Spline from './spline-functional';
import Area from './area-functional';
import SplineArea from './spline-area-functional';
import InversedArea from './inversed-area-functional';
import PlotLine from './plot-line-functional';
import StripLines from './strip-line-functional';
import PeroidCustomization from './period-customization-functional';
import Navigator from './disabled-navigator-functional';
import PeriodSelector from './disabled-period-functional';
import DatetimeCategoryAxis from './datetime-category-functional';
import StockEvents from './stock-events-functional';
export const stockchartRoutes = (<>
         <Route path='/:theme/stock-chart/default' Component={Default}/>
         <Route path='/:theme/stock-chart/ohlc' Component={OHLC}/>
         <Route path='/:theme/stock-chart/multi-pane' Component={MultiPane}/>
         <Route path='/:theme/stock-chart/multiple-series' Component={MultipleSeries}/>
         <Route path='/:theme/stock-chart/spline' Component={Spline}/>
         <Route path='/:theme/stock-chart/area' Component={Area}/>
         <Route path='/:theme/stock-chart/spline-area' Component={SplineArea}/>
         <Route path='/:theme/stock-chart/inversed-area' Component={InversedArea}/>
         <Route path='/:theme/stock-chart/plot-line' Component={PlotLine}/>
         <Route path='/:theme/stock-chart/strip-line' Component={StripLines}/>
         <Route path='/:theme/stock-chart/period-customization' Component={PeroidCustomization}/>
         <Route path='/:theme/stock-chart/disabled-navigator' Component={Navigator}/>
         <Route path='/:theme/stock-chart/disabled-period' Component={PeriodSelector}/>
         <Route path='/:theme/stock-chart/datetime-category' Component={DatetimeCategoryAxis}/>
         <Route path='/:theme/stock-chart/stock-events' Component={StockEvents}/>

    </>);
export const stockchartCategory = { "default": { "name": "Default", "category": "Stock Chart" }, "ohlc": { "name": "OHLC", "category": "Stock Chart" }, "multi-pane": { "name": "Candlestick and volume", "category": "Stock Chart" }, "multiple-series": { "name": "Multiple Series", "category": "Stock Chart" }, "spline": { "name": "Spline", "category": "Stock Chart" }, "area": { "name": "Area", "category": "Stock Chart" }, "spline-area": { "name": "Spline Area", "category": "Stock Chart" }, "inversed-area": { "name": "Inversed Area", "category": "Stock Chart" }, "plot-line": { "name": "Plot lines", "category": "Stock Chart" }, "strip-line": { "name": "Plot band", "category": "Stock Chart" }, "period-customization": { "name": "Intraday", "category": "Stock Chart" }, "disabled-navigator": { "name": "Hide Range Selector", "category": "Stock Chart" }, "disabled-period": { "name": "Hide Period Selector", "category": "Stock Chart" }, "datetime-category": { "name": "DateTime Category Axis", "category": "Stock Chart" }, "stock-events": { "name": "Stock Events", "category": "Stock Chart" }, "defaultSample": "stock-chart/default" };
