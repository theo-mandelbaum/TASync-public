import {  Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './overview-functional';
import Default from './default-functional';
import HolidayCalendar from './holiday-calendar-functional';
import EventCalendar from './event-calendar-functional';
import LocalData from './local-data-functional';
import RemoteData from './remote-data-functional';
import CalendarIntegration from './calendar-integration-functional';
import RealTimeBinding from './realtime-binding-functional';
import RecurrenceEvents from './recurrence-events-functional';
import BlockEvents from './block-events-functional';
import SearchEvents from './search-events-functional';
import TimeZone from './timezone-functional';
import InlineEditing from './inline-editing-functional';
import OverlapEvents from './overlap-events-functional';
import ExternalDragDrop from './external-drag-drop-functional';
import MultiDrag from './multi-drag-functional';
import ScheduleDragAndDrop from './schedule-to-schedule-drag-drop-functional';
import ScheduleToGrid from './schedule-to-grid-functional';
import VirtualScrolling from './virtual-scrolling-functional';
import DataVirtualization from './data-virtualization-functional';
import Views from './views-functional';
import TimelineView from './timeline-functional';
import AgendaView from './agenda-functional';
import MonthAgendaView from './month-agenda-functional';
import Year from './year-functional';
import CustomMonthView from './custom-month-view-functional';
import ViewConfigurations from './views-configuration-functional';
import ExtendedViews from './extended-views-functional';
import TimelineResource from './timeline-resources-functional';
import Resources from './resources-functional';
import Resource from './resource-functional';
import GroupEditing from './group-editing-functional';
import GroupCustomWorkDays from './group-custom-work-days-functional';
import AddRemoveResources from './add-remove-resources-functional';
import AdaptiveRows from './adaptive-rows-functional';
import Group from './resource-grouping-functional';
import TimelineGrouping from './timeline-resource-grouping-functional';
import GroupByDate from './group-by-date-functional';
import GroupByChild from './group-by-child-functional';
import AdaptiveGrouping from './adaptive-grouping-functional';
import CellTemplate from './cell-template-functional';
import DateHeaderTemplate from './date-header-template-functional';
import EventTemplate from './event-template-functional';
import Tooltip from './tooltip-functional';
import QuickInfoTemplate from './quick-info-template-functional';
import EditorFieldValidation from './editor-validation-functional';
import EditorCustomField from './editor-custom-field-functional';
import EditorTemplate from './editor-template-functional';
import HeaderRows from './header-rows-functional';
import Timescale from './time-scale-functional';
import ContextMenu from './context-menu-functional';
import HeaderBar from './header-bar-functional';
import ScrollTo from './scroll-to-functional';
import WorkDays from './work-days-functional';
import HideWeekend from './hide-weekend-functional';
import WorkHours from './work-hours-functional';
import DayHourLimit from './start-end-hour-functional';
import CellDimension from './cell-dimension-functional';
import ReadonlyEvents from './read-only-events-functional';
import Reminder from './reminder-functional';
import ExportToExcel from './excel-export-functional';
import CalendarImportExport from './calendar-export-import-functional';
import PrintSchedule from './print-functional';
import RuleGenerate from './recurrence-editor-generate-rule-functional';
import PopulateRule from './recurrence-editor-populate-rule-functional';
import Clipboard from './clipboard-functional';
import KeyboardInteraction from './keyboard-interaction-functional';
import Events from './events-functional';


export const scheduleRoutes = (
    <>
         <Route  path='/:theme/schedule/overview' Component={ Overview }/>
         <Route  path='/:theme/schedule/default' Component={ Default }/>
         <Route  path='/:theme/schedule/holiday-calendar' Component={ HolidayCalendar }/>
         <Route  path='/:theme/schedule/event-calendar' Component={ EventCalendar }/>
         <Route  path='/:theme/schedule/local-data' Component={ LocalData }/>
         <Route  path='/:theme/schedule/remote-data' Component={ RemoteData }/>
         <Route  path='/:theme/schedule/calendar-integration' Component={ CalendarIntegration }/>
         <Route  path='/:theme/schedule/realtime-binding' Component={ RealTimeBinding }/>
         <Route  path='/:theme/schedule/recurrence-events' Component={ RecurrenceEvents }/>
         <Route  path='/:theme/schedule/block-events' Component={ BlockEvents }/>
         <Route  path='/:theme/schedule/search-events' Component={ SearchEvents }/>
         <Route  path='/:theme/schedule/timezone' Component={ TimeZone }/>
         <Route  path='/:theme/schedule/inline-editing' Component={ InlineEditing }/>
         <Route  path='/:theme/schedule/overlap-events' Component={ OverlapEvents }/>
         <Route  path='/:theme/schedule/external-drag-drop' Component={ ExternalDragDrop }/>
         <Route  path='/:theme/schedule/multi-drag' Component={ MultiDrag }/>
         <Route  path='/:theme/schedule/schedule-to-schedule-drag-drop' Component={ ScheduleDragAndDrop }/>
         <Route  path='/:theme/schedule/schedule-to-grid' Component={ ScheduleToGrid }/>
         <Route  path='/:theme/schedule/virtual-scrolling' Component={ VirtualScrolling }/>
         <Route  path='/:theme/schedule/data-virtualization' Component={ DataVirtualization }/>
         <Route  path='/:theme/schedule/views' Component={ Views }/>
         <Route  path='/:theme/schedule/timeline' Component={ TimelineView }/>
         <Route  path='/:theme/schedule/agenda' Component={ AgendaView }/>
         <Route  path='/:theme/schedule/month-agenda' Component={ MonthAgendaView }/>
         <Route  path='/:theme/schedule/year' Component={ Year }/>
         <Route  path='/:theme/schedule/custom-month-view' Component={ CustomMonthView }/>
         <Route  path='/:theme/schedule/views-configuration' Component={ ViewConfigurations }/>
         <Route  path='/:theme/schedule/extended-views' Component={ ExtendedViews }/>
         <Route  path='/:theme/schedule/timeline-resources' Component={ TimelineResource }/>
         <Route  path='/:theme/schedule/resources' Component={ Resources }/>
         <Route  path='/:theme/schedule/resource' Component={ Resource }/>
         <Route  path='/:theme/schedule/group-editing' Component={ GroupEditing }/>
         <Route  path='/:theme/schedule/group-custom-work-days' Component={ GroupCustomWorkDays }/>
         <Route  path='/:theme/schedule/add-remove-resources' Component={ AddRemoveResources }/>
         <Route  path='/:theme/schedule/adaptive-rows' Component={ AdaptiveRows }/>
         <Route  path='/:theme/schedule/resource-grouping' Component={ Group }/>
         <Route  path='/:theme/schedule/timeline-resource-grouping' Component={ TimelineGrouping }/>
         <Route  path='/:theme/schedule/group-by-date' Component={ GroupByDate }/>
         <Route  path='/:theme/schedule/group-by-child' Component={ GroupByChild }/>
         <Route  path='/:theme/schedule/adaptive-grouping' Component={ AdaptiveGrouping }/>
         <Route  path='/:theme/schedule/cell-template' Component={ CellTemplate }/>
         <Route  path='/:theme/schedule/date-header-template' Component={ DateHeaderTemplate }/>
         <Route  path='/:theme/schedule/event-template' Component={ EventTemplate }/>
         <Route  path='/:theme/schedule/tooltip' Component={ Tooltip }/>
         <Route  path='/:theme/schedule/quick-info-template' Component={ QuickInfoTemplate }/>
         <Route  path='/:theme/schedule/editor-validation' Component={ EditorFieldValidation }/>
         <Route  path='/:theme/schedule/editor-custom-field' Component={ EditorCustomField }/>
         <Route  path='/:theme/schedule/editor-template' Component={ EditorTemplate }/>
         <Route  path='/:theme/schedule/header-rows' Component={ HeaderRows }/>
         <Route  path='/:theme/schedule/time-scale' Component={ Timescale }/>
         <Route  path='/:theme/schedule/context-menu' Component={ ContextMenu }/>
         <Route  path='/:theme/schedule/header-bar' Component={ HeaderBar }/>
         <Route  path='/:theme/schedule/scroll-to' Component={ ScrollTo }/>
         <Route  path='/:theme/schedule/work-days' Component={ WorkDays }/>
         <Route  path='/:theme/schedule/hide-weekend' Component={ HideWeekend }/>
         <Route  path='/:theme/schedule/work-hours' Component={ WorkHours }/>
         <Route  path='/:theme/schedule/start-end-hour' Component={ DayHourLimit }/>
         <Route  path='/:theme/schedule/cell-dimension' Component={ CellDimension }/>
         <Route  path='/:theme/schedule/read-only-events' Component={ ReadonlyEvents }/>
         <Route  path='/:theme/schedule/reminder' Component={ Reminder }/>
         <Route  path='/:theme/schedule/excel-export' Component={ ExportToExcel }/>
         <Route  path='/:theme/schedule/calendar-export-import' Component={ CalendarImportExport }/>
         <Route  path='/:theme/schedule/print' Component={ PrintSchedule }/>
         <Route  path='/:theme/schedule/recurrence-editor-generate-rule' Component={ RuleGenerate }/>
         <Route  path='/:theme/schedule/recurrence-editor-populate-rule' Component={ PopulateRule }/>
         <Route  path='/:theme/schedule/clipboard' Component={ Clipboard }/>
         <Route  path='/:theme/schedule/keyboard-interaction' Component={ KeyboardInteraction }/>
         <Route  path='/:theme/schedule/events' Component={ Events }/>

    </>
)

export const scheduleCategory = {"overview":{"name":"Overview","category":"Scheduler"},"default":{"name":"Default Functionalities","category":"Scheduler"},"holiday-calendar":{"name":"Holiday Calendar","category":"Product Use Case"},"event-calendar":{"name":"Event Calendar","category":"Product Use Case"},"local-data":{"name":"Local Data","category":"Data Binding"},"remote-data":{"name":"Remote Data","category":"Data Binding"},"calendar-integration":{"name":"Sync Google Calendar","category":"Appointments"},"realtime-binding":{"name":"Real-Time Binding","category":"Appointments"},"recurrence-events":{"name":"Recurring Events","category":"Appointments"},"block-events":{"name":"Blocking Dates and Time","category":"Appointments"},"search-events":{"name":"Search Events","category":"Appointments"},"timezone":{"name":"Timezone","category":"Appointments"},"inline-editing":{"name":"Inline Editing","category":"Appointments"},"overlap-events":{"name":"Conflict Free Event","category":"Appointments"},"external-drag-drop":{"name":"External Drag and Drop","category":"Drag and Drop"},"multi-drag":{"name":"Multiple Events Drag","category":"Drag and Drop"},"schedule-to-schedule-drag-drop":{"name":"Multiple Scheduler","category":"Drag and Drop"},"schedule-to-grid":{"name":"Drag Events From DataGrid","category":"Drag and Drop"},"virtual-scrolling":{"name":"Virtual Scrolling","category":"Scrolling"},"data-virtualization":{"name":"Data Virtualization","category":"Scrolling"},"views":{"name":"Basic Views","category":"Views"},"timeline":{"name":"Timeline Views","category":"Views"},"agenda":{"name":"Agenda View","category":"Views"},"month-agenda":{"name":"Month Agenda View","category":"Views"},"year":{"name":"Year View","category":"Views"},"custom-month-view":{"name":"Custom Month View","category":"Views"},"views-configuration":{"name":"Individual View Settings","category":"Views"},"extended-views":{"name":"View Intervals","category":"Views"},"timeline-resources":{"name":"Room Scheduler","category":"Multiple Resources"},"resources":{"name":"Fare Calendar","category":"Multiple Resources"},"resource":{"name":"Resources","category":"Multiple Resources"},"group-editing":{"name":"Shared Events","category":"Multiple Resources"},"group-custom-work-days":{"name":"Different Work Days","category":"Multiple Resources"},"add-remove-resources":{"name":"Show/Hide Resources","category":"Multiple Resources"},"adaptive-rows":{"name":"Row Auto Height","category":"Multiple Resources"},"resource-grouping":{"name":"Horizontal Grouping","category":"Resource Grouping"},"timeline-resource-grouping":{"name":"Timeline Grouping","category":"Resource Grouping"},"group-by-date":{"name":"Date-wise Grouping","category":"Resource Grouping"},"group-by-child":{"name":"Hierarchical Grouping","category":"Resource Grouping"},"adaptive-grouping":{"name":"Adaptive Grouping","category":"Resource Grouping"},"cell-template":{"name":"Cell","category":"Template"},"date-header-template":{"name":"Date Header","category":"Template"},"event-template":{"name":"Events","category":"Template"},"tooltip":{"name":"Tooltip","category":"Template"},"quick-info-template":{"name":"Quick Info Template","category":"Template"},"editor-validation":{"name":"Field Validation","category":"Editor Window"},"editor-custom-field":{"name":"Additional Fields","category":"Editor Window"},"editor-template":{"name":"Editor Template","category":"Editor Window"},"header-rows":{"name":"Header Rows","category":"Customization"},"time-scale":{"name":"Timescale","category":"Customization"},"context-menu":{"name":"Context Menu","category":"Schedule"},"header-bar":{"name":"Header Bar","category":"Customization"},"scroll-to":{"name":"Scroll Time","category":"Customization"},"work-days":{"name":"Work Days","category":"Customization"},"hide-weekend":{"name":"Hide Non-Working Days","category":"Customization"},"work-hours":{"name":"Work Hours","category":"Customization"},"start-end-hour":{"name":"Day Hour Limit","category":"Customization"},"cell-dimension":{"name":"Cell Dimension","category":"Customization"},"read-only-events":{"name":"Read-only Events","category":"Customization"},"reminder":{"name":"Reminder","category":"Customization"},"excel-export":{"name":"Excel Exporting","category":"Exporting"},"calendar-export-import":{"name":"Export and Import ICS","category":"Exporting"},"print":{"name":"Print","category":"Exporting"},"recurrence-editor-generate-rule":{"name":"Rule Generator","category":"Recurrence Editor"},"recurrence-editor-populate-rule":{"name":"Populate Rule","category":"Recurrence Editor"},"clipboard":{"name":"Clipboard","category":"Miscellaneous"},"keyboard-interaction":{"name":"Keyboard Interaction","category":"Miscellaneous"},"events":{"name":"Events","category":"Miscellaneous"},"defaultSample":"schedule/overview"}