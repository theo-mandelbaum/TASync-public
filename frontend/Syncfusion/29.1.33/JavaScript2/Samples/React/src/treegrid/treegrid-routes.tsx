import {  Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './treegrid-overview-functional';
import LiveStream from './live-data-functional';
import Default from './default-functional';
import Adaptive from './adaptive-functional';
import LoadingAnimation from './loading-animation-functional';
import LocalData from './localdata-functional';
import RemoteData from './remote-data-functional';
import SelfReference from './selfreference-functional';
import ColumnTemplate from './columntemplate-functional';
import HeaderTemplate from './header-template-functional';
import ColumnFormat from './columnformatting-functional';
import CellAlign from './cellalignment-functional';
import Reorders from './reorder-functional';
import Stacked from './stacked-header-functional';
import TreeGridColumnMenu from './column-menu-functional';
import AutoWrap from './autowrap-functional';
import TreeGridColumnChooser from './column-chooser-functional';
import ShowHideColumn from './showhidecolumn-functional';
import CheckboxColumn from './checkbox-column-functional';
import RowTemplate from './row-template-functional';
import DetailTemplate from './detail-template-functional';
import DragAndDropBetween from './drag-anddrop-functional';
import DragAndDrop from './drag-drop-functional';
import RowHover from './rowhover-functional';
import RowHeight from './rowheight-functional';
import Editing from './inline-editing-functional';
import Dialog from './dialog-editing-functional';
import Batch from './batch-edit-functional';
import Command from './commandcolumn-functional';
import EditType from './celledittype-functional';
import EditTemplate from './edittemplate-functional';
import LockRow from './lockrow-functional';
import Sorting from './sorting-functional';
import SortingAPI from './sortingapi-functional';
import Filtering from './filtering-functional';
import FilterMenu from './filter-menu-functional';
import Search from './searching-functional';
import Paging from './paging-functional';
import PagingAPI from './pagingapi-functional';
import DefaultScrolling from './defaultscrolling-functional';
import FrozenColumn from './frozencolumn-functional';
import FrozenAPI from './frozen-api-functional';
import VirtualScrolling from './virtualscrolling-functional';
import InfiniteScrolling from './infinitescrolling-functional';
import AggregateRow from './aggregate-default-functional';
import CustomAggregate from './custom-aggregate-functional';
import Selection from './selection-functional';
import SelectionAPI from './selectionapi-functional';
import CheckboxSelection from './checkbox-selection-functional';
import Export from './export-functional';
import Print from './print-functional';
import TreeContextMenu from './contextmenu-functional';
import CustomContextMenu from './customcontextmenu-functional';
import GridLines from './gridlines-functional';
import Clipboard from './clipboard-functional';
import Format from './conditionalformatting-functional';
import ToolbarTemplate from './toolbar-template-functional';
import Events from './events-functional';
import KeyBoard from './keyboard-functional';


export const treegridRoutes = (
    <>
         <Route  path='/:theme/treegrid/treegrid-overview' Component={ Overview }/>
         <Route  path='/:theme/treegrid/live-data' Component={ LiveStream }/>
         <Route  path='/:theme/treegrid/default' Component={ Default }/>
         <Route  path='/:theme/treegrid/adaptive' Component={ Adaptive }/>
         <Route  path='/:theme/treegrid/loading-animation' Component={ LoadingAnimation }/>
         <Route  path='/:theme/treegrid/localdata' Component={ LocalData }/>
         <Route  path='/:theme/treegrid/remote-data' Component={ RemoteData }/>
         <Route  path='/:theme/treegrid/selfreference' Component={ SelfReference }/>
         <Route  path='/:theme/treegrid/columntemplate' Component={ ColumnTemplate }/>
         <Route  path='/:theme/treegrid/header-template' Component={ HeaderTemplate }/>
         <Route  path='/:theme/treegrid/columnformatting' Component={ ColumnFormat }/>
         <Route  path='/:theme/treegrid/cellalignment' Component={ CellAlign }/>
         <Route  path='/:theme/treegrid/reorder' Component={ Reorders }/>
         <Route  path='/:theme/treegrid/stacked-header' Component={ Stacked }/>
         <Route  path='/:theme/treegrid/column-menu' Component={ TreeGridColumnMenu }/>
         <Route  path='/:theme/treegrid/autowrap' Component={ AutoWrap }/>
         <Route  path='/:theme/treegrid/column-chooser' Component={ TreeGridColumnChooser }/>
         <Route  path='/:theme/treegrid/showhidecolumn' Component={ ShowHideColumn }/>
         <Route  path='/:theme/treegrid/checkbox-column' Component={ CheckboxColumn }/>
         <Route  path='/:theme/treegrid/row-template' Component={ RowTemplate }/>
         <Route  path='/:theme/treegrid/detail-template' Component={ DetailTemplate }/>
         <Route  path='/:theme/treegrid/drag-anddrop' Component={ DragAndDropBetween }/>
         <Route  path='/:theme/treegrid/drag-drop' Component={ DragAndDrop }/>
         <Route  path='/:theme/treegrid/rowhover' Component={ RowHover }/>
         <Route  path='/:theme/treegrid/rowheight' Component={ RowHeight }/>
         <Route  path='/:theme/treegrid/inline-editing' Component={ Editing }/>
         <Route  path='/:theme/treegrid/dialog-editing' Component={ Dialog }/>
         <Route  path='/:theme/treegrid/batch-edit' Component={ Batch }/>
         <Route  path='/:theme/treegrid/commandcolumn' Component={ Command }/>
         <Route  path='/:theme/treegrid/celledittype' Component={ EditType }/>
         <Route  path='/:theme/treegrid/edittemplate' Component={ EditTemplate }/>
         <Route  path='/:theme/treegrid/lockrow' Component={ LockRow }/>
         <Route  path='/:theme/treegrid/sorting' Component={ Sorting }/>
         <Route  path='/:theme/treegrid/sortingapi' Component={ SortingAPI }/>
         <Route  path='/:theme/treegrid/filtering' Component={ Filtering }/>
         <Route  path='/:theme/treegrid/filter-menu' Component={ FilterMenu }/>
         <Route  path='/:theme/treegrid/searching' Component={ Search }/>
         <Route  path='/:theme/treegrid/paging' Component={ Paging }/>
         <Route  path='/:theme/treegrid/pagingapi' Component={ PagingAPI }/>
         <Route  path='/:theme/treegrid/defaultscrolling' Component={ DefaultScrolling }/>
         <Route  path='/:theme/treegrid/frozencolumn' Component={ FrozenColumn }/>
         <Route  path='/:theme/treegrid/frozen-api' Component={ FrozenAPI }/>
         <Route  path='/:theme/treegrid/virtualscrolling' Component={ VirtualScrolling }/>
         <Route  path='/:theme/treegrid/infinitescrolling' Component={ InfiniteScrolling }/>
         <Route  path='/:theme/treegrid/aggregate-default' Component={ AggregateRow }/>
         <Route  path='/:theme/treegrid/custom-aggregate' Component={ CustomAggregate }/>
         <Route  path='/:theme/treegrid/selection' Component={ Selection }/>
         <Route  path='/:theme/treegrid/selectionapi' Component={ SelectionAPI }/>
         <Route  path='/:theme/treegrid/checkbox-selection' Component={ CheckboxSelection }/>
         <Route  path='/:theme/treegrid/export' Component={ Export }/>
         <Route  path='/:theme/treegrid/print' Component={ Print }/>
         <Route  path='/:theme/treegrid/contextmenu' Component={ TreeContextMenu }/>
         <Route  path='/:theme/treegrid/customcontextmenu' Component={ CustomContextMenu }/>
         <Route  path='/:theme/treegrid/gridlines' Component={ GridLines }/>
         <Route  path='/:theme/treegrid/clipboard' Component={ Clipboard }/>
         <Route  path='/:theme/treegrid/conditionalformatting' Component={ Format }/>
         <Route  path='/:theme/treegrid/toolbar-template' Component={ ToolbarTemplate }/>
         <Route  path='/:theme/treegrid/events' Component={ Events }/>
         <Route  path='/:theme/treegrid/keyboard' Component={ KeyBoard }/>

    </>
)

export const treegridCategory = {"treegrid-overview":{"name":"Overview","category":"Tree Grid"},"live-data":{"name":"Live Data","category":"Tree Grid"},"default":{"name":"Default Functionalities","category":"Tree Grid"},"adaptive":{"name":"Adaptive Layout ","category":"Tree Grid"},"loading-animation":{"name":"Loading Animation","category":"Tree Grid"},"localdata":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"selfreference":{"name":"Self Reference Data","category":"Data Binding"},"columntemplate":{"name":"Column Template","category":"Columns"},"header-template":{"name":"Header Template","category":"Columns"},"columnformatting":{"name":"Column Formatting","category":"Columns"},"cellalignment":{"name":"Cell Alignment","category":"Columns"},"reorder":{"name":"Reorder","category":"Columns"},"stacked-header":{"name":"Stacked Header","category":"Columns"},"column-menu":{"name":"Column Menu","category":"Columns"},"autowrap":{"name":"Auto Wrap Column Cells","category":"Columns"},"column-chooser":{"name":"Column Chooser","category":"Columns"},"showhidecolumn":{"name":"Show or Hide Column","category":"Columns"},"checkbox-column":{"name":"Checkbox Column","category":"Columns"},"row-template":{"name":"Row Template","category":"Rows"},"detail-template":{"name":"Detail Template","category":"Rows"},"drag-anddrop":{"name":"Drag and Drop","category":"Rows"},"drag-drop":{"name":"Drag and Drop within Tree Grid","category":"Rows"},"rowhover":{"name":"Row Hover","category":"Rows"},"rowheight":{"name":"Row Height","category":"Rows"},"inline-editing":{"name":"Inline Editing","category":"Editing"},"dialog-editing":{"name":"Dialog Editing","category":"Editing"},"batch-edit":{"name":"Batch Editing","category":"Editing"},"commandcolumn":{"name":"Command Column","category":"Editing"},"celledittype":{"name":"Cell Edit Type","category":"Editing"},"edittemplate":{"name":"Edit Template","category":"Editing"},"lockrow":{"name":"Lock Row","category":"Editing"},"sorting":{"name":"Multi Sorting","category":"Sorting"},"sortingapi":{"name":"Sorting API","category":"Sorting"},"filtering":{"name":"Default Filtering","category":"Filtering"},"filter-menu":{"name":"Menu Filter","category":"Filtering"},"searching":{"name":"Search","category":"Filtering"},"paging":{"name":"Pager Dropdown","category":"Paging"},"pagingapi":{"name":"Paging API","category":"Paging"},"defaultscrolling":{"name":"Default Scrolling","category":"Scrolling"},"frozencolumn":{"name":"Frozen Columns","category":"Scrolling"},"frozen-api":{"name":"Freeze Direction","category":"Scrolling"},"virtualscrolling":{"name":"Virtual Scrolling","category":"Scrolling"},"infinitescrolling":{"name":"Infinite Scrolling","category":"Scrolling"},"aggregate-default":{"name":"Default Aggregate","category":"Aggregates"},"custom-aggregate":{"name":"Custom Aggregate","category":"Aggregates"},"selection":{"name":"Default Selection","category":"Selection"},"selectionapi":{"name":"Selection API","category":"Selection"},"checkbox-selection":{"name":"Checkbox Selection","category":"Selection"},"export":{"name":"Default Exporting","category":"Exporting"},"print":{"name":"Print","category":"Exporting"},"contextmenu":{"name":"Default Context Menu","category":"Context Menu"},"customcontextmenu":{"name":"Custom Context Menu","category":"Context Menu"},"gridlines":{"name":"Gridlines","category":"Miscellaneous"},"clipboard":{"name":"Clipboard","category":"Miscellaneous"},"conditionalformatting":{"name":"Conditional Formatting","category":"Miscellaneous"},"toolbar-template":{"name":"Toolbar Template","category":"Miscellaneous"},"events":{"name":"Events","category":"Miscellaneous"},"keyboard":{"name":"Keyboard Navigation","category":"Miscellaneous"},"defaultSample":"treegrid/treegrid-overview"}