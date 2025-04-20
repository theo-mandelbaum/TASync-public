"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.aispreadsheetCategory = exports.aispreadsheetRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var smart_spreadsheet_1 = require("./smart-spreadsheet");
exports.aispreadsheetRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/ai-spreadsheet/smart-spreadsheet', Component: smart_spreadsheet_1.SmartSpreadsheet })));
exports.aispreadsheetCategory = { "smart-spreadsheet": { "name": "Smart Spreadsheet", "category": "Spreadsheet" }, "defaultSample": "ai-spreadsheet/smart-spreadsheet" };
