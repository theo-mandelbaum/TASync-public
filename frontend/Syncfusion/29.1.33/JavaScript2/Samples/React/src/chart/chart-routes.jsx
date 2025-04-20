import { Route } from 'react-router-dom';
import * as React from 'react';
import OverView from './overview-functional';
import Line from './line-functional';
import Spline from './spline-functional';
import StepLine from './stepline-functional';
import DashedLine from './dashed-line-functional';
import CustomAnimation from './custom-animation-functional';
import SplineInversed from './spline-inversed-functional';
import LineZone from './line-segments-functional';
import LineMultiLine from './line-multi-line-functional';
import StackedLine from './stacked-line-functional';
import StackedLine100 from './stacked-line-100-functional';
import Area from './area-functional';
import SplineArea from './spline-area-functional';
import StepArea from './steparea-functional';
import StepLineWithoutRiser from './step-line-without-riser-functional';
import RangeStepArea from './rangesteparea-functional';
import RangeArea from './rangearea-functional';
import SplineRangeArea from './spline-range-area-functional';
import StackedArea from './stacked-area-functional';
import StackedStepArea from './stacked-step-area-functional';
import StackedArea100 from './stacked-area100-functional';
import AreaEmpty from './area-empty-functional';
import AreaNegative from './area-negative-points-functional';
import AreaMultiColored from './area-segments-functional';
import Column from './column-functional';
import GroupedColumn from './grouped-column-functional';
import ColumnPlacement from './column-placement-functional';
import ColumnDrilldown from './column-drilldown-functional';
import RangeColumn from './range-column-functional';
import RangeBar from './range-bar-functional';
import CylindricalColumn from './cylindrical-column-functional';
import Bar from './bar-functional';
import RoundedBar from './rounded-column-functional';
import StackedColumn from './stacked-column-functional';
import StackedColumn100 from './stacked-column100-functional';
import StackedBar from './stacked-bar-functional';
import StackedBar100 from './stacked-bar100-functional';
import NegativeStack from './negative-stack-functional';
import Hilo from './hilo-functional';
import HiloOpenClose from './hiloopenclose-functional';
import Candle from './candle-functional';
import Scatter from './scatter-functional';
import Bubble from './bubble-functional';
import Pie from './default-pie-functional';
import PieRadius from './pie-radius-functional';
import AccumulationDoughnut from './doughnut-functional';
import Pyramid from './pyramid-functional';
import Funnel from './funnel-functional';
import Doughnut from './pie-legend-functional';
import SemiPie from './semi-pie-functional';
import SmartLabels from './smartlabels-functional';
import Drilldown from './drilldown-functional';
import Grouping from './grouping-functional';
import PieEmptyPoint from './pie-empty-point-functional';
import PieCornerRadius from './pie-rounded-corner-functional';
import PieWithPattern from './pie-with-pattern-functional';
import PieChartWithDynamicData from './update-pie-data-source-functional';
import Waterfall from './waterfall-functional';
import HorizontalWaterfall from './horizontal-waterfall-functional';
import Histogram from './histogram-functional';
import BoxWhisker from './box-whisker-functional';
import ErrorBarChart from './error-bar-functional';
import Trend from './trend-lines-functional';
import CombinationSeries from './combination-series-functional';
import ParetoChart from './pareto-functional';
import AccumulationDistribution from './adindicator-functional';
import ATR from './atrindicator-functional';
import Bollinger from './bollinger-functional';
import EMA from './ema-functional';
import Macd from './macd-functional';
import Momentum from './momentum-functional';
import RSI from './rsi-functional';
import SMA from './sma-functional';
import Stochastic from './stochastic-functional';
import TMA from './tma-functional';
import Performance from './performance-functional';
import UpdateSpline from './update-spline-functional';
import LiveStock from './live-stock-data-functional';
import UpdateDataSource from './update-data-source-functional';
import ClickAddPoint from './click-add-point-functional';
import UpdateColumnDataSource from './live-data-sorting-functional';
import PolarLine from './polar-line-functional';
import PolarSpline from './polar-spline-functional';
import PolarArea from './polar-area-functional';
import PolarStackedArea from './polar-stackedarea-functional';
import PolarScatter from './polar-scatter-functional';
import PolarColumn from './polar-column-functional';
import PolarStackedColumn from './polar-stackedcolumn-functional';
import PolarRangeColumn from './polar-rangecolumn-functional';
import LocalData from './local-data-functional';
import RemoteData from './remote-data-functional';
import LazyLoading from './lazy-loading-functional';
import Numeric from './numeric-axis-functional';
import DateTimeAxis from './datetime-functional';
import DatetimeCategoryAxis from './datetime-category-functional';
import CategoryAxis from './category-functional';
import IndexedAxis from './indexed-axis-functional';
import LogAxis from './log-functional';
import MultipleAxis from './multiple-axis-functional';
import InversedAxis from './inversed-functional';
import Stripline from './stripline-functional';
import Striplinerecurrence from './strip-line-recurrence-functional';
import SmartAxisLabels from './smart-axis-labels-functional';
import Multilevellabels from './multi-level-label-functional';
import AxisCrossing from './axis-crossing-functional';
import Sorting from './sorting-functional';
import Symbols from './symbols-functional';
import RTL from './rtl-functional';
import Annotation from './annotation-functional';
import SynchronizedChart from './synchronized-chart-functional';
import DataLabelTemplate from './datalabel-template-functional';
import ChartTooltipTemplate from './tooltip-template-functional';
import VerticalChart from './vertical-functional';
import EmptyPoint from './empty-point-functional';
import RangeColorMapping from './range-color-mapping-functional';
import SeriesAnimation from './series-animation-functional';
import Print from './print-functional';
import ChartExport from './export-functional';
import SelectionChart from './selection-functional';
import RangeSelection from './range-selection-functional';
import KeyboardNavigation from './keyboard-functional';
import CrosshairChart from './crosshair-functional';
import TrackballChart from './trackball-functional';
import Zooming from './zoom-functional';
import Pagination from './pagination-functional';
import DataEdit from './data-editing-functional';
export const chartRoutes = (<>
         <Route path='/:theme/chart/overview' Component={OverView}/>
         <Route path='/:theme/chart/line' Component={Line}/>
         <Route path='/:theme/chart/spline' Component={Spline}/>
         <Route path='/:theme/chart/stepline' Component={StepLine}/>
         <Route path='/:theme/chart/dashed-line' Component={DashedLine}/>
         <Route path='/:theme/chart/custom-animation' Component={CustomAnimation}/>
         <Route path='/:theme/chart/spline-inversed' Component={SplineInversed}/>
         <Route path='/:theme/chart/line-segments' Component={LineZone}/>
         <Route path='/:theme/chart/line-multi-line' Component={LineMultiLine}/>
         <Route path='/:theme/chart/stacked-line' Component={StackedLine}/>
         <Route path='/:theme/chart/stacked-line-100' Component={StackedLine100}/>
         <Route path='/:theme/chart/area' Component={Area}/>
         <Route path='/:theme/chart/spline-area' Component={SplineArea}/>
         <Route path='/:theme/chart/steparea' Component={StepArea}/>
         <Route path='/:theme/chart/step-line-without-riser' Component={StepLineWithoutRiser}/>
         <Route path='/:theme/chart/rangesteparea' Component={RangeStepArea}/>
         <Route path='/:theme/chart/rangearea' Component={RangeArea}/>
         <Route path='/:theme/chart/spline-range-area' Component={SplineRangeArea}/>
         <Route path='/:theme/chart/stacked-area' Component={StackedArea}/>
         <Route path='/:theme/chart/stacked-step-area' Component={StackedStepArea}/>
         <Route path='/:theme/chart/stacked-area100' Component={StackedArea100}/>
         <Route path='/:theme/chart/area-empty' Component={AreaEmpty}/>
         <Route path='/:theme/chart/area-negative-points' Component={AreaNegative}/>
         <Route path='/:theme/chart/area-segments' Component={AreaMultiColored}/>
         <Route path='/:theme/chart/column' Component={Column}/>
         <Route path='/:theme/chart/grouped-column' Component={GroupedColumn}/>
         <Route path='/:theme/chart/column-placement' Component={ColumnPlacement}/>
         <Route path='/:theme/chart/column-drilldown' Component={ColumnDrilldown}/>
         <Route path='/:theme/chart/range-column' Component={RangeColumn}/>
         <Route path='/:theme/chart/range-bar' Component={RangeBar}/>
         <Route path='/:theme/chart/cylindrical-column' Component={CylindricalColumn}/>
         <Route path='/:theme/chart/bar' Component={Bar}/>
         <Route path='/:theme/chart/rounded-column' Component={RoundedBar}/>
         <Route path='/:theme/chart/stacked-column' Component={StackedColumn}/>
         <Route path='/:theme/chart/stacked-column100' Component={StackedColumn100}/>
         <Route path='/:theme/chart/stacked-bar' Component={StackedBar}/>
         <Route path='/:theme/chart/stacked-bar100' Component={StackedBar100}/>
         <Route path='/:theme/chart/negative-stack' Component={NegativeStack}/>
         <Route path='/:theme/chart/hilo' Component={Hilo}/>
         <Route path='/:theme/chart/hiloopenclose' Component={HiloOpenClose}/>
         <Route path='/:theme/chart/candle' Component={Candle}/>
         <Route path='/:theme/chart/scatter' Component={Scatter}/>
         <Route path='/:theme/chart/bubble' Component={Bubble}/>
         <Route path='/:theme/chart/default-pie' Component={Pie}/>
         <Route path='/:theme/chart/pie-radius' Component={PieRadius}/>
         <Route path='/:theme/chart/doughnut' Component={AccumulationDoughnut}/>
         <Route path='/:theme/chart/pyramid' Component={Pyramid}/>
         <Route path='/:theme/chart/funnel' Component={Funnel}/>
         <Route path='/:theme/chart/pie-legend' Component={Doughnut}/>
         <Route path='/:theme/chart/semi-pie' Component={SemiPie}/>
         <Route path='/:theme/chart/smartlabels' Component={SmartLabels}/>
         <Route path='/:theme/chart/drilldown' Component={Drilldown}/>
         <Route path='/:theme/chart/grouping' Component={Grouping}/>
         <Route path='/:theme/chart/pie-empty-point' Component={PieEmptyPoint}/>
         <Route path='/:theme/chart/pie-rounded-corner' Component={PieCornerRadius}/>
         <Route path='/:theme/chart/pie-with-pattern' Component={PieWithPattern}/>
         <Route path='/:theme/chart/update-pie-data-source' Component={PieChartWithDynamicData}/>
         <Route path='/:theme/chart/waterfall' Component={Waterfall}/>
         <Route path='/:theme/chart/horizontal-waterfall' Component={HorizontalWaterfall}/>
         <Route path='/:theme/chart/histogram' Component={Histogram}/>
         <Route path='/:theme/chart/box-whisker' Component={BoxWhisker}/>
         <Route path='/:theme/chart/error-bar' Component={ErrorBarChart}/>
         <Route path='/:theme/chart/trend-lines' Component={Trend}/>
         <Route path='/:theme/chart/combination-series' Component={CombinationSeries}/>
         <Route path='/:theme/chart/pareto' Component={ParetoChart}/>
         <Route path='/:theme/chart/adindicator' Component={AccumulationDistribution}/>
         <Route path='/:theme/chart/atrindicator' Component={ATR}/>
         <Route path='/:theme/chart/bollinger' Component={Bollinger}/>
         <Route path='/:theme/chart/ema' Component={EMA}/>
         <Route path='/:theme/chart/macd' Component={Macd}/>
         <Route path='/:theme/chart/momentum' Component={Momentum}/>
         <Route path='/:theme/chart/rsi' Component={RSI}/>
         <Route path='/:theme/chart/sma' Component={SMA}/>
         <Route path='/:theme/chart/stochastic' Component={Stochastic}/>
         <Route path='/:theme/chart/tma' Component={TMA}/>
         <Route path='/:theme/chart/performance' Component={Performance}/>
         <Route path='/:theme/chart/update-spline' Component={UpdateSpline}/>
         <Route path='/:theme/chart/live-stock-data' Component={LiveStock}/>
         <Route path='/:theme/chart/update-data-source' Component={UpdateDataSource}/>
         <Route path='/:theme/chart/click-add-point' Component={ClickAddPoint}/>
         <Route path='/:theme/chart/live-data-sorting' Component={UpdateColumnDataSource}/>
         <Route path='/:theme/chart/polar-line' Component={PolarLine}/>
         <Route path='/:theme/chart/polar-spline' Component={PolarSpline}/>
         <Route path='/:theme/chart/polar-area' Component={PolarArea}/>
         <Route path='/:theme/chart/polar-stackedarea' Component={PolarStackedArea}/>
         <Route path='/:theme/chart/polar-scatter' Component={PolarScatter}/>
         <Route path='/:theme/chart/polar-column' Component={PolarColumn}/>
         <Route path='/:theme/chart/polar-stackedcolumn' Component={PolarStackedColumn}/>
         <Route path='/:theme/chart/polar-rangecolumn' Component={PolarRangeColumn}/>
         <Route path='/:theme/chart/local-data' Component={LocalData}/>
         <Route path='/:theme/chart/remote-data' Component={RemoteData}/>
         <Route path='/:theme/chart/lazy-loading' Component={LazyLoading}/>
         <Route path='/:theme/chart/numeric-axis' Component={Numeric}/>
         <Route path='/:theme/chart/datetime' Component={DateTimeAxis}/>
         <Route path='/:theme/chart/datetime-category' Component={DatetimeCategoryAxis}/>
         <Route path='/:theme/chart/category' Component={CategoryAxis}/>
         <Route path='/:theme/chart/indexed-axis' Component={IndexedAxis}/>
         <Route path='/:theme/chart/log' Component={LogAxis}/>
         <Route path='/:theme/chart/multiple-axis' Component={MultipleAxis}/>
         <Route path='/:theme/chart/inversed' Component={InversedAxis}/>
         <Route path='/:theme/chart/stripline' Component={Stripline}/>
         <Route path='/:theme/chart/strip-line-recurrence' Component={Striplinerecurrence}/>
         <Route path='/:theme/chart/smart-axis-labels' Component={SmartAxisLabels}/>
         <Route path='/:theme/chart/multi-level-label' Component={Multilevellabels}/>
         <Route path='/:theme/chart/axis-crossing' Component={AxisCrossing}/>
         <Route path='/:theme/chart/sorting' Component={Sorting}/>
         <Route path='/:theme/chart/symbols' Component={Symbols}/>
         <Route path='/:theme/chart/rtl' Component={RTL}/>
         <Route path='/:theme/chart/annotation' Component={Annotation}/>
         <Route path='/:theme/chart/synchronized-chart' Component={SynchronizedChart}/>
         <Route path='/:theme/chart/datalabel-template' Component={DataLabelTemplate}/>
         <Route path='/:theme/chart/tooltip-template' Component={ChartTooltipTemplate}/>
         <Route path='/:theme/chart/vertical' Component={VerticalChart}/>
         <Route path='/:theme/chart/empty-point' Component={EmptyPoint}/>
         <Route path='/:theme/chart/range-color-mapping' Component={RangeColorMapping}/>
         <Route path='/:theme/chart/series-animation' Component={SeriesAnimation}/>
         <Route path='/:theme/chart/print' Component={Print}/>
         <Route path='/:theme/chart/export' Component={ChartExport}/>
         <Route path='/:theme/chart/selection' Component={SelectionChart}/>
         <Route path='/:theme/chart/range-selection' Component={RangeSelection}/>
         <Route path='/:theme/chart/keyboard' Component={KeyboardNavigation}/>
         <Route path='/:theme/chart/crosshair' Component={CrosshairChart}/>
         <Route path='/:theme/chart/trackball' Component={TrackballChart}/>
         <Route path='/:theme/chart/zoom' Component={Zooming}/>
         <Route path='/:theme/chart/pagination' Component={Pagination}/>
         <Route path='/:theme/chart/data-editing' Component={DataEdit}/>

    </>);
export const chartCategory = { "overview": { "name": "Overview", "category": "Charts" }, "line": { "name": "Line", "category": "Line Charts" }, "spline": { "name": "Spline", "category": "Line Charts" }, "stepline": { "name": "Step Line", "category": "Line Charts" }, "dashed-line": { "name": "Dashed Line", "category": "Line Charts" }, "custom-animation": { "name": "Custom Animation", "category": "Line Charts" }, "spline-inversed": { "name": "Inversed Spline", "category": "Line Charts" }, "line-segments": { "name": "Line Zone", "category": "Line Charts" }, "line-multi-line": { "name": "Multi Colored Line", "category": "Line Charts" }, "stacked-line": { "name": "Stacked Line", "category": "Line Charts" }, "stacked-line-100": { "name": "100% Stacked Line", "category": "Line Charts" }, "area": { "name": "Area", "category": "Area Charts" }, "spline-area": { "name": "Spline Area", "category": "Area Charts" }, "steparea": { "name": "Step Area", "category": "Area Charts" }, "step-line-without-riser": { "name": "Step Without Riser", "category": "Area Charts" }, "rangesteparea": { "name": "Range Step Area", "category": "Area Charts" }, "rangearea": { "name": "Range Area", "category": "Area Charts" }, "spline-range-area": { "name": "Spline Range Area", "category": "Area Charts" }, "stacked-area": { "name": "Stacked Area", "category": "Area Charts" }, "stacked-step-area": { "name": "Stacked Step Area", "category": "Area Charts" }, "stacked-area100": { "name": "100% Stacked Area", "category": "Area Charts" }, "area-empty": { "name": "Area - Empty Points", "category": "Area Charts" }, "area-negative-points": { "name": "Area - Negative Points", "category": "Area Charts" }, "area-segments": { "name": "Area Zone", "category": "Area Charts" }, "column": { "name": "Column", "category": "Bar Charts" }, "grouped-column": { "name": "Grouped Column", "category": "Bar Charts" }, "column-placement": { "name": "Back to Back Column", "category": "Bar Charts" }, "column-drilldown": { "name": "Column Drilldown", "category": "Bar Charts" }, "range-column": { "name": "Range Column", "category": "Bar Charts" }, "range-bar": { "name": "Inversed Range Column", "category": "Bar Charts" }, "cylindrical-column": { "name": "Cylindrical Column", "category": "Bar Charts" }, "bar": { "name": "Bar", "category": "Bar Charts" }, "rounded-column": { "name": "Rounded Bar", "category": "Bar Charts" }, "stacked-column": { "name": "Stacked Column", "category": "Bar Charts" }, "stacked-column100": { "name": "100% Stacked Column", "category": "Bar Charts" }, "stacked-bar": { "name": "Stacked Bar", "category": "Bar Charts" }, "stacked-bar100": { "name": "100% Stacked Bar", "category": "Bar Charts" }, "negative-stack": { "name": "Negative Stack", "category": "Bar Charts" }, "hilo": { "name": "Hilo", "category": "Financial Charts" }, "hiloopenclose": { "name": "Hilo Open Close", "category": "Financial Charts" }, "candle": { "name": "Candle", "category": "Financial Charts" }, "scatter": { "name": "Scatter", "category": "Scatter and Bubble" }, "bubble": { "name": "Bubble", "category": "Scatter and Bubble" }, "default-pie": { "name": "Pie", "category": "Accumulation Charts" }, "pie-radius": { "name": "Pie with Various Radius", "category": "Accumulation Charts" }, "doughnut": { "name": "Doughnut", "category": "Accumulation Charts" }, "pyramid": { "name": "Pyramid", "category": "Accumulation Charts" }, "funnel": { "name": "Funnel", "category": "Accumulation Charts" }, "pie-legend": { "name": "Pie with Legend", "category": "Accumulation Charts" }, "semi-pie": { "name": "Semi Pie", "category": "Accumulation Charts" }, "smartlabels": { "name": "Smart Labels", "category": "Accumulation Charts" }, "drilldown": { "name": "Drilldown", "category": "Accumulation Charts" }, "grouping": { "name": "Grouping", "category": "Accumulation Charts" }, "pie-empty-point": { "name": "Empty Points", "category": "Accumulation Charts" }, "pie-rounded-corner": { "name": "Rounded Corner", "category": "Accumulation Charts" }, "pie-with-pattern": { "name": "Pie With Patterns", "category": "Accumulation Charts" }, "update-pie-data-source": { "name": "Live Update", "category": "Accumulation Charts" }, "waterfall": { "name": "Waterfall", "category": "Other Types" }, "horizontal-waterfall": { "name": "Horizontal Waterfall", "category": "Other Types" }, "histogram": { "name": "Histogram", "category": "Other Types" }, "box-whisker": { "name": "Box and Whisker", "category": "Other Types" }, "error-bar": { "name": "Error Bar", "category": "Other Types" }, "trend-lines": { "name": "Trendlines", "category": "Other Types" }, "combination-series": { "name": "Combination Series", "category": "Other Types" }, "pareto": { "name": "Pareto Chart", "category": "Other Types" }, "adindicator": { "name": "Accumulation Distribution", "category": "Technical Indicators" }, "atrindicator": { "name": "ATR", "category": "Technical Indicators" }, "bollinger": { "name": "Bollinger", "category": "Technical Indicators" }, "ema": { "name": "EMA", "category": "Technical Indicators" }, "macd": { "name": "MACD", "category": "Technical Indicators" }, "momentum": { "name": "Momentum", "category": "Technical Indicators" }, "rsi": { "name": "RSI", "category": "Technical Indicators" }, "sma": { "name": "SMA", "category": "Technical Indicators" }, "stochastic": { "name": "Stochastic", "category": "Technical Indicators" }, "tma": { "name": "TMA", "category": "Technical Indicators" }, "performance": { "name": "Benchmark", "category": "Performance" }, "update-spline": { "name": "Spline updating each second", "category": "Real-time Charts" }, "live-stock-data": { "name": "Live stock data", "category": "Real-time Charts" }, "update-data-source": { "name": "Update data source", "category": "Real-time Charts" }, "click-add-point": { "name": "Click to add a point", "category": "Real-time Charts" }, "live-data-sorting": { "name": "Live Data Sorting", "category": "Real-time Charts" }, "polar-line": { "name": "Line", "category": "Polar Radar" }, "polar-spline": { "name": "Spline", "category": "Polar Radar" }, "polar-area": { "name": "Area", "category": "Polar Radar" }, "polar-stackedarea": { "name": "Stacked Area", "category": "Polar Radar" }, "polar-scatter": { "name": "Scatter", "category": "Polar Radar" }, "polar-column": { "name": "Column", "category": "Polar Radar" }, "polar-stackedcolumn": { "name": "Wind Rose", "category": "Polar Radar" }, "polar-rangecolumn": { "name": "Range Column", "category": "Polar Radar" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "lazy-loading": { "name": "Lazy Loading", "category": "Data Binding" }, "numeric-axis": { "name": "Numeric Axis", "category": "Chart Axes" }, "datetime": { "name": "DateTime Axis", "category": "Chart Axes" }, "datetime-category": { "name": "DateTime Category Axis", "category": "Chart Axes" }, "category": { "name": "Category Axis", "category": "Chart Axes" }, "indexed-axis": { "name": "Indexed Category Axis", "category": "Chart Axes" }, "log": { "name": "Log Axis", "category": "Chart Axes" }, "multiple-axis": { "name": "Multiple Axis", "category": "Chart Axes" }, "inversed": { "name": "Inversed Axis", "category": "Chart Axes" }, "stripline": { "name": "Stripline", "category": "Chart Axes" }, "strip-line-recurrence": { "name": "Strip Line Recurrence", "category": "Chart Axes" }, "smart-axis-labels": { "name": "Smart Labels", "category": "Chart Axes" }, "multi-level-label": { "name": "Multi Level Labels", "category": "Chart Axes" }, "axis-crossing": { "name": "Axes Crossing", "category": "Chart Axes" }, "sorting": { "name": "Sorting", "category": "Chart Customization" }, "symbols": { "name": "Symbols", "category": "Chart Customization" }, "rtl": { "name": "RTL", "category": "Chart Customization" }, "annotation": { "name": "Annotation", "category": "Chart Customization" }, "synchronized-chart": { "name": "Synchronized Charts", "category": "Chart Customization" }, "datalabel-template": { "name": "DataLabel Template", "category": "Chart Customization" }, "tooltip-template": { "name": "Tooltip Template", "category": "Chart Customization" }, "vertical": { "name": "Vertical Chart", "category": "Chart Customization" }, "empty-point": { "name": "Empty Points", "category": "Chart Customization" }, "range-color-mapping": { "name": "Range Color Mapping", "category": "Chart Customization" }, "series-animation": { "name": "Animation", "category": "Chart Customization" }, "print": { "name": "Print", "category": "Print and Export" }, "export": { "name": "Export", "category": "Print and Export" }, "selection": { "name": "Selection", "category": "User Interaction" }, "range-selection": { "name": "Range Selection", "category": "User Interaction" }, "keyboard": { "name": "Keyboard Navigation", "category": "User Interaction" }, "crosshair": { "name": "Crosshair", "category": "User Interaction" }, "trackball": { "name": "Trackball", "category": "User Interaction" }, "zoom": { "name": "Zooming and Panning", "category": "User Interaction" }, "pagination": { "name": "Pagination", "category": "User Interaction" }, "data-editing": { "name": "Data Editing", "category": "User Interaction" }, "defaultSample": "chart/overview" };
