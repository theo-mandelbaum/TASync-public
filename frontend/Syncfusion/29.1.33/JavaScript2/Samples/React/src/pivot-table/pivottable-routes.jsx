import { Route } from 'react-router-dom';
import * as React from 'react';
import PivotOverview from './overview-functional';
import Default from './default-functional';
import ClassicLayout from './classic-layout-functional';
import LiveData from './live-data-functional';
import Local from './local-functional';
import Remote from './remote-functional';
import ServerSideEngine from './server-side-engine-functional';
import OlapSample from './olap-functional';
import Performance from './performance-functional';
import ChartIntegration from './pivot-chart-functional';
import Integration from './external-binding-functional';
import HeatMap from './heat-map-functional';
import FieldList from './field-list-functional';
import GroupingBarSample from './grouping-bar-functional';
import ConditionalFormattingClass from './conditional-formatting-functional';
import Selection from './selection-functional';
import DrillDown from './drill-down-functional';
import SummaryCustomization from './summary-customization-functional';
import Grouping from './grouping-functional';
import PivotToolbar from './tool-bar-functional';
import PivotKeyboardNavigation from './keyboard-navigation-functional';
import CalculatedFieldClass from './calculated-field-functional';
import Aggregation from './aggregation-functional';
import Sorting from './sorting-functional';
import CustomSorting from './custom-sorting-functional';
import ValueSorting from './value-sorting-functional';
import Filtering from './filtering-functional';
import LabelFilter from './label-filtering-functional';
import ValueFilter from './value-filtering-functional';
import VirtualScrolling from './virtual-scrolling-functional';
import Paging from './paging-functional';
import CellTemplate from './cell-template-functional';
import DrillThroughComponent from './drill-through-functional';
import Editing from './editing-functional';
import HyperLink from './hyper-link-functional';
import DeferUpdate from './defer-update-functional';
import Exporting from './exporting-functional';
export const pivottableRoutes = (<>
         <Route path='/:theme/pivot-table/overview' Component={PivotOverview}/>
         <Route path='/:theme/pivot-table/default' Component={Default}/>
         <Route path='/:theme/pivot-table/classic-layout' Component={ClassicLayout}/>
         <Route path='/:theme/pivot-table/live-data' Component={LiveData}/>
         <Route path='/:theme/pivot-table/local' Component={Local}/>
         <Route path='/:theme/pivot-table/remote' Component={Remote}/>
         <Route path='/:theme/pivot-table/server-side-engine' Component={ServerSideEngine}/>
         <Route path='/:theme/pivot-table/olap' Component={OlapSample}/>
         <Route path='/:theme/pivot-table/performance' Component={Performance}/>
         <Route path='/:theme/pivot-table/pivot-chart' Component={ChartIntegration}/>
         <Route path='/:theme/pivot-table/external-binding' Component={Integration}/>
         <Route path='/:theme/pivot-table/heat-map' Component={HeatMap}/>
         <Route path='/:theme/pivot-table/field-list' Component={FieldList}/>
         <Route path='/:theme/pivot-table/grouping-bar' Component={GroupingBarSample}/>
         <Route path='/:theme/pivot-table/conditional-formatting' Component={ConditionalFormattingClass}/>
         <Route path='/:theme/pivot-table/selection' Component={Selection}/>
         <Route path='/:theme/pivot-table/drill-down' Component={DrillDown}/>
         <Route path='/:theme/pivot-table/summary-customization' Component={SummaryCustomization}/>
         <Route path='/:theme/pivot-table/grouping' Component={Grouping}/>
         <Route path='/:theme/pivot-table/tool-bar' Component={PivotToolbar}/>
         <Route path='/:theme/pivot-table/keyboard-navigation' Component={PivotKeyboardNavigation}/>
         <Route path='/:theme/pivot-table/calculated-field' Component={CalculatedFieldClass}/>
         <Route path='/:theme/pivot-table/aggregation' Component={Aggregation}/>
         <Route path='/:theme/pivot-table/sorting' Component={Sorting}/>
         <Route path='/:theme/pivot-table/custom-sorting' Component={CustomSorting}/>
         <Route path='/:theme/pivot-table/value-sorting' Component={ValueSorting}/>
         <Route path='/:theme/pivot-table/filtering' Component={Filtering}/>
         <Route path='/:theme/pivot-table/label-filtering' Component={LabelFilter}/>
         <Route path='/:theme/pivot-table/value-filtering' Component={ValueFilter}/>
         <Route path='/:theme/pivot-table/virtual-scrolling' Component={VirtualScrolling}/>
         <Route path='/:theme/pivot-table/paging' Component={Paging}/>
         <Route path='/:theme/pivot-table/cell-template' Component={CellTemplate}/>
         <Route path='/:theme/pivot-table/drill-through' Component={DrillThroughComponent}/>
         <Route path='/:theme/pivot-table/editing' Component={Editing}/>
         <Route path='/:theme/pivot-table/hyper-link' Component={HyperLink}/>
         <Route path='/:theme/pivot-table/defer-update' Component={DeferUpdate}/>
         <Route path='/:theme/pivot-table/exporting' Component={Exporting}/>

    </>);
export const pivottableCategory = { "overview": { "name": "Overview", "category": "Pivot Table" }, "default": { "name": "Default Functionalities", "category": "Pivot Table" }, "classic-layout": { "name": "Classic Layout", "category": "Pivot Table" }, "live-data": { "name": "Live Data", "category": "Pivot Table" }, "local": { "name": "Local Data", "category": "Data Binding" }, "remote": { "name": "Remote Data", "category": "Data Binding" }, "server-side-engine": { "name": "Server-side Aggregation", "category": "Data Binding" }, "olap": { "name": "OLAP", "category": "Data Binding" }, "performance": { "name": "Performance", "category": "Benchmark" }, "pivot-chart": { "name": "Pivot Chart", "category": "Integration" }, "external-binding": { "name": "External Binding", "category": "Integration" }, "heat-map": { "name": "HeatMap", "category": "Integration" }, "field-list": { "name": "Field List", "category": "User Interaction" }, "grouping-bar": { "name": "Grouping Bar", "category": "User Interaction" }, "conditional-formatting": { "name": "Conditional Formatting", "category": "User Interaction" }, "selection": { "name": "Selection", "category": "User Interaction" }, "drill-down": { "name": "Drill Down", "category": "User Interaction" }, "summary-customization": { "name": "Show/Hide Totals", "category": "User Interaction" }, "grouping": { "name": "Grouping", "category": "User Interaction" }, "tool-bar": { "name": "Toolbar", "category": "User Interaction" }, "keyboard-navigation": { "name": "Keyboard Navigation", "category": "Keyboard Navigation" }, "calculated-field": { "name": "Calculated Field", "category": "Formula" }, "aggregation": { "name": "Aggregation", "category": "Formula" }, "sorting": { "name": "Default Sorting", "category": "Sorting" }, "custom-sorting": { "name": "Custom Sorting", "category": "Sorting" }, "value-sorting": { "name": "Value Sorting", "category": "Sorting" }, "filtering": { "name": "Default Filtering", "category": "Filtering" }, "label-filtering": { "name": "Label Filtering", "category": "Filtering" }, "value-filtering": { "name": "Value Filtering", "category": "Filtering" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Scrolling" }, "paging": { "name": "Paging", "category": "Paging" }, "cell-template": { "name": "Cell Template", "category": "Customization" }, "drill-through": { "name": "Drill Through", "category": "Miscellaneous" }, "editing": { "name": "Editing", "category": "Miscellaneous" }, "hyper-link": { "name": "Hyperlink", "category": "Miscellaneous" }, "defer-update": { "name": "Defer Layout Update", "category": "Miscellaneous" }, "exporting": { "name": "Export", "category": "Miscellaneous" }, "defaultSample": "pivot-table/overview" };
