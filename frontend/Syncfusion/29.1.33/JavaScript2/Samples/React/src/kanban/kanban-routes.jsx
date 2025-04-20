import { Route } from 'react-router-dom';
import * as React from 'react';
import Overview from './overview-functional';
import Default from './default-functional';
import Swimlane from './swimlane-functional';
import Workflow from './workflow-functional';
import StackedHeader from './stacked-header-functional';
import DialogEditing from './dialog-editing-functional';
import SearchFilter from './search-filter-functional';
import Sorting from './sorting-functional';
import VirtualScrolling from './virtual-scrolling-functional';
import LocalData from './local-data-functional';
import RemoteData from './remote-data-functional';
import HeaderTemplate from './header-template-functional';
import SwimlaneTemplate from './swimlane-template-functional';
import CardTemplate from './card-template-functional';
import TooltipTemplate from './tooltip-template-functional';
import ToggleColumns from './toggle-columns-functional';
import ShowHideColumns from './show-hide-functional';
import WIPValidation from './wip-validation-functional';
import API from './api-functional';
import Events from './events-functional';
export const kanbanRoutes = (<>
         <Route path='/:theme/kanban/overview' Component={Overview}/>
         <Route path='/:theme/kanban/default' Component={Default}/>
         <Route path='/:theme/kanban/swimlane' Component={Swimlane}/>
         <Route path='/:theme/kanban/workflow' Component={Workflow}/>
         <Route path='/:theme/kanban/stacked-header' Component={StackedHeader}/>
         <Route path='/:theme/kanban/dialog-editing' Component={DialogEditing}/>
         <Route path='/:theme/kanban/search-filter' Component={SearchFilter}/>
         <Route path='/:theme/kanban/sorting' Component={Sorting}/>
         <Route path='/:theme/kanban/virtual-scrolling' Component={VirtualScrolling}/>
         <Route path='/:theme/kanban/local-data' Component={LocalData}/>
         <Route path='/:theme/kanban/remote-data' Component={RemoteData}/>
         <Route path='/:theme/kanban/header-template' Component={HeaderTemplate}/>
         <Route path='/:theme/kanban/swimlane-template' Component={SwimlaneTemplate}/>
         <Route path='/:theme/kanban/card-template' Component={CardTemplate}/>
         <Route path='/:theme/kanban/tooltip-template' Component={TooltipTemplate}/>
         <Route path='/:theme/kanban/toggle-columns' Component={ToggleColumns}/>
         <Route path='/:theme/kanban/show-hide' Component={ShowHideColumns}/>
         <Route path='/:theme/kanban/wip-validation' Component={WIPValidation}/>
         <Route path='/:theme/kanban/api' Component={API}/>
         <Route path='/:theme/kanban/events' Component={Events}/>

    </>);
export const kanbanCategory = { "overview": { "name": "Overview", "category": "Kanban" }, "default": { "name": "Default Functionalities", "category": "Kanban" }, "swimlane": { "name": "Swimlane", "category": "Kanban" }, "workflow": { "name": "Workflow", "category": "Kanban" }, "stacked-header": { "name": "Stacked Header", "category": "Kanban" }, "dialog-editing": { "name": "Dialog Editing", "category": "Kanban" }, "search-filter": { "name": "Search and Filter Cards", "category": "Kanban" }, "sorting": { "name": "Sorting Cards", "category": "Kanban" }, "virtual-scrolling": { "name": "Virtual Scrolling", "category": "Kanban" }, "local-data": { "name": "Local Data", "category": "Data Binding" }, "remote-data": { "name": "Remote Data", "category": "Data Binding" }, "header-template": { "name": "Header Template", "category": "Templates" }, "swimlane-template": { "name": "Swimlane Template", "category": "Templates" }, "card-template": { "name": "Card Template", "category": "Templates" }, "tooltip-template": { "name": "Tooltip Template", "category": "Templates" }, "toggle-columns": { "name": "Toggle Columns", "category": "Columns" }, "show-hide": { "name": "Show/Hide Columns", "category": "Columns" }, "wip-validation": { "name": "WIP Validation", "category": "Validation" }, "api": { "name": "API", "category": "Miscellaneous" }, "events": { "name": "Events", "category": "Miscellaneous" }, "defaultSample": "kanban/overview" };
