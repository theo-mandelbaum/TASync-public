import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import ComplexDatabinding from './complex-databinding-functional';
import DataGrid from './grid-functional';
import MongoSQL from './mongo-sql-functional';
import LockGroup from './lock-group-functional';
import CloneGroup from './clone-group-functional';
import DragDrop from './drag-drop-functional';
import SeparateConnector from './separate-connector-functional';
import Template from './template-functional';
import RuleTemplate from './rule-template-functional';
import HeaderTemplate from './header-template-functional';


export const querybuilderRoutes = (
    <>
         <Route  path='/:theme/query-builder/default' Component={ Default }/>
         <Route  path='/:theme/query-builder/complex-databinding' Component={ ComplexDatabinding }/>
         <Route  path='/:theme/query-builder/grid' Component={ DataGrid }/>
         <Route  path='/:theme/query-builder/mongo-sql' Component={ MongoSQL }/>
         <Route  path='/:theme/query-builder/lock-group' Component={ LockGroup }/>
         <Route  path='/:theme/query-builder/clone-group' Component={ CloneGroup }/>
         <Route  path='/:theme/query-builder/drag-drop' Component={ DragDrop }/>
         <Route  path='/:theme/query-builder/separate-connector' Component={ SeparateConnector }/>
         <Route  path='/:theme/query-builder/template' Component={ Template }/>
         <Route  path='/:theme/query-builder/rule-template' Component={ RuleTemplate }/>
         <Route  path='/:theme/query-builder/header-template' Component={ HeaderTemplate }/>

    </>
)

export const querybuilderCategory = {"default":{"name":"Default Functionalities","category":"Query Builder"},"complex-databinding":{"name":"Complex Databinding","category":"Query Builder"},"grid":{"name":"Integration with Data Grid","category":"Query Builder"},"mongo-sql":{"name":"Mongo and SQL Query","category":"Query Builder"},"lock-group":{"name":"Lock Group/Rule","category":"Query Builder"},"clone-group":{"name":"Clone Group/Rule","category":"Query Builder"},"drag-drop":{"name":"Drag and Drop","category":"Query Builder"},"separate-connector":{"name":"Separate Connector","category":"Query Builder"},"template":{"name":"Value Template","category":"Template"},"rule-template":{"name":"Rule Template","category":"Template"},"header-template":{"name":"Header Template","category":"Template"},"defaultSample":"query-builder/default"}