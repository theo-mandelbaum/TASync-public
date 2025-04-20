import {  Route } from 'react-router-dom';
import * as React from 'react';
import Default from './default-functional';
import Formula from './formula-functional';
import ProtectSheet from './protect-sheet-functional';
import FreezePane from './freeze-pane-functional';
import DataValidation from './data-validation-functional';
import Hyperlink from './hyperlink-functional';
import CellDataBinding from './cell-data-binding-functional';
import RemoteDataBinding from './remote-data-binding-functional';
import CellFormatting from './cell-formatting-functional';
import NumberFormatting from './number-formatting-functional';
import ConditionalFormatting from './conditional-formatting-functional';
import SortingAndFiltering from './sorting-and-filtering-functional';
import Chart from './chart-functional';
import Image from './image-functional';
import CellTemplate from './cell-template-functional';
import Review from './notes-functional';
import Printing from './print-functional';


export const spreadsheetRoutes = (
    <>
         <Route  path='/:theme/spreadsheet/default' Component={ Default }/>
         <Route  path='/:theme/spreadsheet/formula' Component={ Formula }/>
         <Route  path='/:theme/spreadsheet/protect-sheet' Component={ ProtectSheet }/>
         <Route  path='/:theme/spreadsheet/freeze-pane' Component={ FreezePane }/>
         <Route  path='/:theme/spreadsheet/data-validation' Component={ DataValidation }/>
         <Route  path='/:theme/spreadsheet/hyperlink' Component={ Hyperlink }/>
         <Route  path='/:theme/spreadsheet/cell-data-binding' Component={ CellDataBinding }/>
         <Route  path='/:theme/spreadsheet/remote-data-binding' Component={ RemoteDataBinding }/>
         <Route  path='/:theme/spreadsheet/cell-formatting' Component={ CellFormatting }/>
         <Route  path='/:theme/spreadsheet/number-formatting' Component={ NumberFormatting }/>
         <Route  path='/:theme/spreadsheet/conditional-formatting' Component={ ConditionalFormatting }/>
         <Route  path='/:theme/spreadsheet/sorting-and-filtering' Component={ SortingAndFiltering }/>
         <Route  path='/:theme/spreadsheet/chart' Component={ Chart }/>
         <Route  path='/:theme/spreadsheet/image' Component={ Image }/>
         <Route  path='/:theme/spreadsheet/cell-template' Component={ CellTemplate }/>
         <Route  path='/:theme/spreadsheet/notes' Component={ Review }/>
         <Route  path='/:theme/spreadsheet/print' Component={ Printing }/>

    </>
)

export const spreadsheetCategory = {"default":{"name":"Default Functionalities","category":"Spreadsheet"},"formula":{"name":"Formula","category":"Spreadsheet"},"protect-sheet":{"name":"Protection","category":"Spreadsheet"},"freeze-pane":{"name":"Freeze Panes","category":"Spreadsheet"},"data-validation":{"name":"Data Validation","category":"Spreadsheet"},"hyperlink":{"name":"Hyperlink","category":"Spreadsheet"},"cell-data-binding":{"name":"Cell Data Binding","category":"Data Binding"},"remote-data-binding":{"name":"Remote Data Binding","category":"Data Binding"},"cell-formatting":{"name":"Cell Formatting","category":"Formatting"},"number-formatting":{"name":"Number Formatting","category":"Formatting"},"conditional-formatting":{"name":"Conditional Formatting","category":"Formatting"},"sorting-and-filtering":{"name":"Sorting and Filtering","category":"Data Analysis"},"chart":{"name":"Chart","category":"Data Visualization"},"image":{"name":"Image","category":"Illustrations"},"cell-template":{"name":"Cell Template","category":"Templates"},"notes":{"name":"Notes","category":"Review"},"print":{"name":"Print","category":"Printing"},"defaultSample":"spreadsheet/default"}