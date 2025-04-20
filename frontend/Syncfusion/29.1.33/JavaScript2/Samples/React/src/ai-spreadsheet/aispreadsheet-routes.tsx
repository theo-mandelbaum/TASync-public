import {  Route } from 'react-router-dom';
import * as React from 'react';
import { SmartSpreadsheet } from './smart-spreadsheet';


export const aispreadsheetRoutes = (
    <>
         <Route  path='/:theme/ai-spreadsheet/smart-spreadsheet' Component={ SmartSpreadsheet }/>

    </>
)

export const aispreadsheetCategory = {"smart-spreadsheet":{"name":"Smart Spreadsheet","category":"Spreadsheet"},"defaultSample":"ai-spreadsheet/smart-spreadsheet"}