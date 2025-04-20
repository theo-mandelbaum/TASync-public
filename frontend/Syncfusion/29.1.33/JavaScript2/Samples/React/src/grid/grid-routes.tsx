import {  Route } from 'react-router-dom';
import * as React from 'react';
import OverView from './overview-functional';
import LiveStream from './live-data-functional';
import Default from './default-functional';
import AdaptiveLayout from './adaptive-layout-functional';
import LoadingAnimation from './loading-animation-functional';
import EmptyRecordTemplate from './empty-record-template-functional';
import FIFAStatistics from './fifa-statistics-functional';
import Localbinding from './local-binding-functional';
import RemoteDataBinding from './remote-data-functional';
import CustomBinding from './custom-binding-functional';
import ColumnTemplate from './column-template-functional';
import HeaderTemplate from './header-template-functional';
import StackedHeader from './stacked-header-functional';
import ForeignKeyColumn from './foreign-key-functional';
import Reordering from './reorder-functional';
import ColumnResizing from './column-resizing-functional';
import ColumnMenuSample from './column-menu-functional';
import AutoWrap from './auto-wrap-functional';
import ColChooser from './column-chooser-functional';
import ShowHide from './show-hide-functional';
import ColumnSpanning from './column-spanning-functional';
import RowTemplate from './row-template-functional';
import DetailTemplate from './detail-template-functional';
import Source from './row-drag-drop-functional';
import DragWithinGrid from './drag-drop-within-grid-functional';
import RowHeight from './row-height-functional';
import RowSpanning from './row-spanning-functional';
import NormalEdit from './normal-edit-functional';
import DialogEdit from './dialog-edit-functional';
import DialogTemplate from './dialog-template-functional';
import BatchEdit from './batch-functional';
import CommandColumnEdit from './command-column-functional';
import Sorting from './sorting-functional';
import Filtering from './filtering-functional';
import FilterTemplate from './filter-template-functional';
import FilterMenu from './filter-menu-functional';
import Searching from './searching-functional';
import Paging from './paging-functional';
import Grouping from './grouping-functional';
import AggregateDefault from './aggregate-default-functional';
import AggregateGroup from './aggregate-group-functional';
import ReactiveAggregate from './reactive-aggregate-functional';
import Selectioning from './selection-functional';
import SelectionAPI from './selection-api-functional';
import CheckboxSelection from './checkbox-selection-functional';
import Hierarchy from './hierarchy-functional';
import MasterDetail from './master-detail-functional';
import Scrolling from './scrolling-functional';
import StickyHeader from './sticky-header-functional';
import FrozenRowsColumns from './frozen-rows-columns-functional';
import FrozenAPI from './frozen-api-functional';
import Virtualization from './virtualization-functional';
import InfiniteScrolling from './infinite-scrolling-functional';
import LazyLoadGrouping from './lazy-load-grouping-with-paging-functional';
import LazyLoadGroupingWithInfiniteScrolling from './lazy-load-grouping-with-infinite-scrolling-functional';
import LazyLoadGroupingWithVirtualScrolling from './lazy-load-grouping-with-virtual-scrolling-functional';
import Exporting from './default-exporting-functional';
import AdvancedExporting from './advanced-exporting-functional';
import HierarchyExport from './master-details-export-functional';
import DetailTemplateExport from './detail-template-exporting-functional';
import MultipleExport from './multiple-export-functional';
import Print from './print-functional';
import GridLines from './grid-lines-functional';
import ContextMenuSample from './context-menu-functional';
import Clipboard from './clipboard-functional';
import KeyboardNavigation from './keyboard-navigation-functional';
import Rtl from './enable-rtl-functional';


export const gridRoutes = (
    <>
         <Route  path='/:theme/grid/overview' Component={ OverView }/>
         <Route  path='/:theme/grid/live-data' Component={ LiveStream }/>
         <Route  path='/:theme/grid/default' Component={ Default }/>
         <Route  path='/:theme/grid/adaptive-layout' Component={ AdaptiveLayout }/>
         <Route  path='/:theme/grid/loading-animation' Component={ LoadingAnimation }/>
         <Route  path='/:theme/grid/empty-record-template' Component={ EmptyRecordTemplate }/>
         <Route  path='/:theme/grid/fifa-statistics' Component={ FIFAStatistics }/>
         <Route  path='/:theme/grid/local-binding' Component={ Localbinding }/>
         <Route  path='/:theme/grid/remote-data' Component={ RemoteDataBinding }/>
         <Route  path='/:theme/grid/custom-binding' Component={ CustomBinding }/>
         <Route  path='/:theme/grid/column-template' Component={ ColumnTemplate }/>
         <Route  path='/:theme/grid/header-template' Component={ HeaderTemplate }/>
         <Route  path='/:theme/grid/stacked-header' Component={ StackedHeader }/>
         <Route  path='/:theme/grid/foreign-key' Component={ ForeignKeyColumn }/>
         <Route  path='/:theme/grid/reorder' Component={ Reordering }/>
         <Route  path='/:theme/grid/column-resizing' Component={ ColumnResizing }/>
         <Route  path='/:theme/grid/column-menu' Component={ ColumnMenuSample }/>
         <Route  path='/:theme/grid/auto-wrap' Component={ AutoWrap }/>
         <Route  path='/:theme/grid/column-chooser' Component={ ColChooser }/>
         <Route  path='/:theme/grid/show-hide' Component={ ShowHide }/>
         <Route  path='/:theme/grid/column-spanning' Component={ ColumnSpanning }/>
         <Route  path='/:theme/grid/row-template' Component={ RowTemplate }/>
         <Route  path='/:theme/grid/detail-template' Component={ DetailTemplate }/>
         <Route  path='/:theme/grid/row-drag-drop' Component={ Source }/>
         <Route  path='/:theme/grid/drag-drop-within-grid' Component={ DragWithinGrid }/>
         <Route  path='/:theme/grid/row-height' Component={ RowHeight }/>
         <Route  path='/:theme/grid/row-spanning' Component={ RowSpanning }/>
         <Route  path='/:theme/grid/normal-edit' Component={ NormalEdit }/>
         <Route  path='/:theme/grid/dialog-edit' Component={ DialogEdit }/>
         <Route  path='/:theme/grid/dialog-template' Component={ DialogTemplate }/>
         <Route  path='/:theme/grid/batch' Component={ BatchEdit }/>
         <Route  path='/:theme/grid/command-column' Component={ CommandColumnEdit }/>
         <Route  path='/:theme/grid/sorting' Component={ Sorting }/>
         <Route  path='/:theme/grid/filtering' Component={ Filtering }/>
         <Route  path='/:theme/grid/filter-template' Component={ FilterTemplate }/>
         <Route  path='/:theme/grid/filter-menu' Component={ FilterMenu }/>
         <Route  path='/:theme/grid/searching' Component={ Searching }/>
         <Route  path='/:theme/grid/paging' Component={ Paging }/>
         <Route  path='/:theme/grid/grouping' Component={ Grouping }/>
         <Route  path='/:theme/grid/aggregate-default' Component={ AggregateDefault }/>
         <Route  path='/:theme/grid/aggregate-group' Component={ AggregateGroup }/>
         <Route  path='/:theme/grid/reactive-aggregate' Component={ ReactiveAggregate }/>
         <Route  path='/:theme/grid/selection' Component={ Selectioning }/>
         <Route  path='/:theme/grid/selection-api' Component={ SelectionAPI }/>
         <Route  path='/:theme/grid/checkbox-selection' Component={ CheckboxSelection }/>
         <Route  path='/:theme/grid/hierarchy' Component={ Hierarchy }/>
         <Route  path='/:theme/grid/master-detail' Component={ MasterDetail }/>
         <Route  path='/:theme/grid/scrolling' Component={ Scrolling }/>
         <Route  path='/:theme/grid/sticky-header' Component={ StickyHeader }/>
         <Route  path='/:theme/grid/frozen-rows-columns' Component={ FrozenRowsColumns }/>
         <Route  path='/:theme/grid/frozen-api' Component={ FrozenAPI }/>
         <Route  path='/:theme/grid/virtualization' Component={ Virtualization }/>
         <Route  path='/:theme/grid/infinite-scrolling' Component={ InfiniteScrolling }/>
         <Route  path='/:theme/grid/lazy-load-grouping-with-paging' Component={ LazyLoadGrouping }/>
         <Route  path='/:theme/grid/lazy-load-grouping-with-infinite-scrolling' Component={ LazyLoadGroupingWithInfiniteScrolling }/>
         <Route  path='/:theme/grid/lazy-load-grouping-with-virtual-scrolling' Component={ LazyLoadGroupingWithVirtualScrolling }/>
         <Route  path='/:theme/grid/default-exporting' Component={ Exporting }/>
         <Route  path='/:theme/grid/advanced-exporting' Component={ AdvancedExporting }/>
         <Route  path='/:theme/grid/master-details-export' Component={ HierarchyExport }/>
         <Route  path='/:theme/grid/detail-template-exporting' Component={ DetailTemplateExport }/>
         <Route  path='/:theme/grid/multiple-export' Component={ MultipleExport }/>
         <Route  path='/:theme/grid/print' Component={ Print }/>
         <Route  path='/:theme/grid/grid-lines' Component={ GridLines }/>
         <Route  path='/:theme/grid/context-menu' Component={ ContextMenuSample }/>
         <Route  path='/:theme/grid/clipboard' Component={ Clipboard }/>
         <Route  path='/:theme/grid/keyboard-navigation' Component={ KeyboardNavigation }/>
         <Route  path='/:theme/grid/enable-rtl' Component={ Rtl }/>

    </>
)

export const gridCategory = {"overview":{"name":"Overview","category":"Data Grid"},"live-data":{"name":"Live Data","category":"Data Grid"},"default":{"name":"Default Functionalities","category":"Data Grid"},"adaptive-layout":{"name":"Adaptive Layout","category":"Data Grid"},"loading-animation":{"name":"Loading Animation","category":"Data Grid"},"empty-record-template":{"name":"Empty Record Template","category":"Data Grid"},"fifa-statistics":{"name":"FIFA Statistics","category":"Product Use Case"},"local-binding":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"custom-binding":{"name":"Custom Binding","category":"Data Binding"},"column-template":{"name":"Column Template","category":"Columns"},"header-template":{"name":"Header Template","category":"Columns"},"stacked-header":{"name":"Stacked Header","category":"Columns"},"foreign-key":{"name":"Foreign Key Column","category":"Columns"},"reorder":{"name":"Reorder","category":"Columns"},"column-resizing":{"name":"AutoFit and Resizing","category":"Columns"},"column-menu":{"name":"Column Menu","category":"Columns"},"auto-wrap":{"name":"AutoWrap Column cells","category":"Columns"},"column-chooser":{"name":"Column Chooser","category":"Columns"},"show-hide":{"name":"Show or Hide Column","category":"Columns"},"column-spanning":{"name":"Column Spanning","category":"Columns"},"row-template":{"name":"Row Template","category":"Rows"},"detail-template":{"name":"Detail Template","category":"Rows"},"row-drag-drop":{"name":"Drag and Drop","category":"Rows"},"drag-drop-within-grid":{"name":"Drag and Drop within Grid","category":"Rows"},"row-height":{"name":"Row Height","category":"Rows"},"row-spanning":{"name":"Row Spanning","category":"Rows"},"normal-edit":{"name":"Inline Editing","category":"Editing"},"dialog-edit":{"name":"Dialog Editing","category":"Editing"},"dialog-template":{"name":"Dialog Template","category":"Editing"},"batch":{"name":"Batch Editing","category":"Editing"},"command-column":{"name":"CommandColumn","category":"Editing"},"sorting":{"name":"Sorting","category":"Sorting"},"filtering":{"name":"Default Filtering","category":"Filtering"},"filter-template":{"name":"Filter Template","category":"Filtering"},"filter-menu":{"name":"Filter Menu","category":"Filtering"},"searching":{"name":"Search","category":"Filtering"},"paging":{"name":"Paging","category":"Paging"},"grouping":{"name":"Grouping","category":"Grouping"},"aggregate-default":{"name":"Default Aggregate","category":"Aggregates"},"aggregate-group":{"name":"Group and Caption Aggregate","category":"Aggregates"},"reactive-aggregate":{"name":"Reactive Aggregate","category":"Aggregates"},"selection":{"name":"Default Selection","category":"Selection"},"selection-api":{"name":"Selection API","category":"Selection"},"checkbox-selection":{"name":"Checkbox Selection","category":"Selection"},"hierarchy":{"name":"Hierarchy Grid","category":"Relational Binding"},"master-detail":{"name":"Master/Detail","category":"Relational Binding"},"scrolling":{"name":"Default Scrolling","category":"Scrolling"},"sticky-header":{"name":"Sticky Header","category":"Scrolling"},"frozen-rows-columns":{"name":"Frozen Rows and Columns","category":"Scrolling"},"frozen-api":{"name":"Frozen API","category":"Scrolling"},"virtualization":{"name":"Virtual Scrolling","category":"Scrolling"},"infinite-scrolling":{"name":"Infinite Scrolling","category":"Scrolling"},"lazy-load-grouping-with-paging":{"name":"Grouping with Paging","category":"Lazy Load Grouping"},"lazy-load-grouping-with-infinite-scrolling":{"name":"Grouping with Infinite Scrolling","category":"Lazy Load Grouping"},"lazy-load-grouping-with-virtual-scrolling":{"name":"Grouping with Virtual Scrolling","category":"Lazy Load Grouping"},"default-exporting":{"name":"Default Exporting","category":"Exporting"},"advanced-exporting":{"name":"Advanced Exporting","category":"Exporting"},"master-details-export":{"name":"Hierarchy Exporting","category":"Exporting"},"detail-template-exporting":{"name":"Detail Template Exporting","category":"Exporting"},"multiple-export":{"name":"Multiple Exporting","category":"Exporting"},"print":{"name":"Print","category":"Exporting"},"grid-lines":{"name":"GridLines","category":"Miscellaneous"},"context-menu":{"name":"Context Menu","category":"Miscellaneous"},"clipboard":{"name":"Clipboard","category":"Miscellaneous"},"keyboard-navigation":{"name":"Keyboard Navigation","category":"Miscellaneous"},"enable-rtl":{"name":"RTL","category":"Miscellaneous"},"defaultSample":"grid/overview"}