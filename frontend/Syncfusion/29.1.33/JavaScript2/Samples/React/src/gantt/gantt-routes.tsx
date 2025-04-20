import {  Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './overview-functional';
import Default from './default-functional';
import Editing from './editing-functional';
import Virtualscroll from './virtual-scroll-functional';
import UndoRedo from './undo-redo-functional';
import LoadingAnimation from './loading-animation-functional';
import LocalData from './local-data-functional';
import LoadOnDemand from './load-on-demand-functional';
import RemoteData from './remote-data-functional';
import SelfReferenceData from './self-reference-data-functional';
import TaskMode from './taskMode-functional';
import WorkWeek from './work-week-functional';
import WorkingTimeRange from './working-time-range-functional';
import Holidays from './holidays-functional';
import UnscheduledTask from './unscheduled-task-functional';
import Timezone from './timezone-functional';
import Critical from './critical-path-functional';
import Baseline from './baseline-functional';
import EventMarkers from './event-markers-functional';
import Indicators from './indicators-functional';
import Timeline from './timeline-functional';
import Zooming from './zooming-functional';
import ColumnTemplate from './column-template-functional';
import HeaderTemplate from './header-template-functional';
import ReorderColumn from './reorder-functional';
import Resizing from './resizing-functional';
import GanttColumnMenu from './column-menu-functional';
import ShowHideColumn from './show-hide-column-functional';
import ResourceAllocation from './resource-allocation-functional';
import ResourceView from './resource-view-functional';
import ResourceMultiTaskbar from './resource-multi-taskbar-functional';
import Sorting from './sorting-functional';
import SortingAPI from './sorting-api-functional';
import Taskbar from './taskbar-template-functional';
import TimelineTemplate from './timeline-template-functional';
import TasklabelTemplate from './tasklabel-template-functional';
import TooltipTemplate from './tooltip-template-functional';
import ToolbarTemplate from './toolbar-template-functional';
import Filtering from './filtering-functional';
import AdvancedFiltering from './advanced-filtering-functional';
import Exporting from './exporting-functional';
import AdvancedExporting from './advanced-exporting-functional';
import GanttSelection from './selection-functional';
import ContextMenuItem from './context-menu-functional';
import DragAndDrop from './drag-and-drop-functional';
import SplitTasks from './split-tasks-functional';
import GridLines from './grid-lines-functional';
import Events from './events-functional';
import KeyboardInteraction from './keyboard-interactions-functional';


export const ganttRoutes = (
    <>
         <Route  path='/:theme/gantt/overview' Component={ Overview }/>
         <Route  path='/:theme/gantt/default' Component={ Default }/>
         <Route  path='/:theme/gantt/editing' Component={ Editing }/>
         <Route  path='/:theme/gantt/virtual-scroll' Component={ Virtualscroll }/>
         <Route  path='/:theme/gantt/undo-redo' Component={ UndoRedo }/>
         <Route  path='/:theme/gantt/loading-animation' Component={ LoadingAnimation }/>
         <Route  path='/:theme/gantt/local-data' Component={ LocalData }/>
         <Route  path='/:theme/gantt/load-on-demand' Component={ LoadOnDemand }/>
         <Route  path='/:theme/gantt/remote-data' Component={ RemoteData }/>
         <Route  path='/:theme/gantt/self-reference-data' Component={ SelfReferenceData }/>
         <Route  path='/:theme/gantt/taskMode' Component={ TaskMode }/>
         <Route  path='/:theme/gantt/work-week' Component={ WorkWeek }/>
         <Route  path='/:theme/gantt/working-time-range' Component={ WorkingTimeRange }/>
         <Route  path='/:theme/gantt/holidays' Component={ Holidays }/>
         <Route  path='/:theme/gantt/unscheduled-task' Component={ UnscheduledTask }/>
         <Route  path='/:theme/gantt/timezone' Component={ Timezone }/>
         <Route  path='/:theme/gantt/critical-path' Component={ Critical }/>
         <Route  path='/:theme/gantt/baseline' Component={ Baseline }/>
         <Route  path='/:theme/gantt/event-markers' Component={ EventMarkers }/>
         <Route  path='/:theme/gantt/indicators' Component={ Indicators }/>
         <Route  path='/:theme/gantt/timeline' Component={ Timeline }/>
         <Route  path='/:theme/gantt/zooming' Component={ Zooming }/>
         <Route  path='/:theme/gantt/column-template' Component={ ColumnTemplate }/>
         <Route  path='/:theme/gantt/header-template' Component={ HeaderTemplate }/>
         <Route  path='/:theme/gantt/reorder' Component={ ReorderColumn }/>
         <Route  path='/:theme/gantt/resizing' Component={ Resizing }/>
         <Route  path='/:theme/gantt/column-menu' Component={ GanttColumnMenu }/>
         <Route  path='/:theme/gantt/show-hide-column' Component={ ShowHideColumn }/>
         <Route  path='/:theme/gantt/resource-allocation' Component={ ResourceAllocation }/>
         <Route  path='/:theme/gantt/resource-view' Component={ ResourceView }/>
         <Route  path='/:theme/gantt/resource-multi-taskbar' Component={ ResourceMultiTaskbar }/>
         <Route  path='/:theme/gantt/sorting' Component={ Sorting }/>
         <Route  path='/:theme/gantt/sorting-api' Component={ SortingAPI }/>
         <Route  path='/:theme/gantt/taskbar-template' Component={ Taskbar }/>
         <Route  path='/:theme/gantt/timeline-template' Component={ TimelineTemplate }/>
         <Route  path='/:theme/gantt/tasklabel-template' Component={ TasklabelTemplate }/>
         <Route  path='/:theme/gantt/tooltip-template' Component={ TooltipTemplate }/>
         <Route  path='/:theme/gantt/toolbar-template' Component={ ToolbarTemplate }/>
         <Route  path='/:theme/gantt/filtering' Component={ Filtering }/>
         <Route  path='/:theme/gantt/advanced-filtering' Component={ AdvancedFiltering }/>
         <Route  path='/:theme/gantt/exporting' Component={ Exporting }/>
         <Route  path='/:theme/gantt/advanced-exporting' Component={ AdvancedExporting }/>
         <Route  path='/:theme/gantt/selection' Component={ GanttSelection }/>
         <Route  path='/:theme/gantt/context-menu' Component={ ContextMenuItem }/>
         <Route  path='/:theme/gantt/drag-and-drop' Component={ DragAndDrop }/>
         <Route  path='/:theme/gantt/split-tasks' Component={ SplitTasks }/>
         <Route  path='/:theme/gantt/grid-lines' Component={ GridLines }/>
         <Route  path='/:theme/gantt/events' Component={ Events }/>
         <Route  path='/:theme/gantt/keyboard-interactions' Component={ KeyboardInteraction }/>

    </>
)

export const ganttCategory = {"overview":{"name":"Overview","category":"Gantt Chart"},"default":{"name":"Default Functionalities","category":"Gantt Chart"},"editing":{"name":"Editing","category":"Gantt Chart"},"virtual-scroll":{"name":"Virtual Scroll","category":"Gantt Chart"},"undo-redo":{"name":"Undo Redo","category":"Gantt Chart"},"loading-animation":{"name":"Loading Animation","category":"Gantt Chart"},"local-data":{"name":"Local Data","category":"Data Binding"},"load-on-demand":{"name":"Big Data Set","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"self-reference-data":{"name":"Self Reference Data","category":"Data Binding"},"taskMode":{"name":"Task Scheduling Mode","category":"Scheduling Concepts"},"work-week":{"name":"Workweek","category":"Scheduling Concepts"},"working-time-range":{"name":"Working Time Range","category":"Scheduling Concepts"},"holidays":{"name":"Holidays","category":"Scheduling Concepts"},"unscheduled-task":{"name":"Unscheduled Tasks","category":"Scheduling Concepts"},"timezone":{"name":"Timezone","category":"Scheduling Concepts"},"critical-path":{"name":"Critical Path","category":"Scheduling Concepts"},"baseline":{"name":"Baseline","category":"Scheduling Concepts"},"event-markers":{"name":"Event Markers","category":"Scheduling Concepts"},"indicators":{"name":"Indicators","category":"Scheduling Concepts"},"timeline":{"name":"Timeline API","category":"Timeline"},"zooming":{"name":"Zooming","category":"Timeline"},"column-template":{"name":"Column Template","category":"Columns"},"header-template":{"name":"Header Template","category":"Columns"},"reorder":{"name":"Reorder","category":"Columns"},"resizing":{"name":"Resizing","category":"Columns"},"column-menu":{"name":"Column Menu","category":"Columns"},"show-hide-column":{"name":"Show or Hide Column","category":"Columns"},"resource-allocation":{"name":"Resource Allocation","category":"Resource"},"resource-view":{"name":"Resource View","category":"Resource"},"resource-multi-taskbar":{"name":"Resource Multi Taskbar","category":"Resource"},"sorting":{"name":"Default Sorting","category":"Sorting"},"sorting-api":{"name":"Sorting API","category":"Sorting"},"taskbar-template":{"name":"Taskbar Template","category":"Templates"},"timeline-template":{"name":"Timeline Template","category":"Templates"},"tasklabel-template":{"name":"Task Label Template","category":"Templates"},"tooltip-template":{"name":"Tooltip Template","category":"Templates"},"toolbar-template":{"name":"Toolbar Template","category":"Templates"},"filtering":{"name":"Default Filtering","category":"Filtering"},"advanced-filtering":{"name":"Advanced Filtering","category":"Filtering"},"exporting":{"name":"Exporting","category":"Exporting"},"advanced-exporting":{"name":"Advanced Exporting","category":"Exporting"},"selection":{"name":"Selection","category":"Miscellaneous"},"context-menu":{"name":"Context Menu","category":"Miscellaneous"},"drag-and-drop":{"name":"Row Drag and Drop","category":"Miscellaneous"},"split-tasks":{"name":"Split Tasks","category":"Miscellaneous"},"grid-lines":{"name":"Gridlines","category":"Miscellaneous"},"events":{"name":"Events","category":"Miscellaneous"},"keyboard-interactions":{"name":"Keyboard Navigation","category":"Miscellaneous"},"defaultSample":"gantt/overview"}