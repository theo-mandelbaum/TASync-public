"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spreadsheetCategory = exports.spreadsheetRoutes = void 0;
var react_router_dom_1 = require("react-router-dom");
var React = require("react");
var default_functional_1 = require("./default-functional");
var formula_functional_1 = require("./formula-functional");
var protect_sheet_functional_1 = require("./protect-sheet-functional");
var freeze_pane_functional_1 = require("./freeze-pane-functional");
var data_validation_functional_1 = require("./data-validation-functional");
var hyperlink_functional_1 = require("./hyperlink-functional");
var cell_data_binding_functional_1 = require("./cell-data-binding-functional");
var remote_data_binding_functional_1 = require("./remote-data-binding-functional");
var cell_formatting_functional_1 = require("./cell-formatting-functional");
var number_formatting_functional_1 = require("./number-formatting-functional");
var conditional_formatting_functional_1 = require("./conditional-formatting-functional");
var sorting_and_filtering_functional_1 = require("./sorting-and-filtering-functional");
var chart_functional_1 = require("./chart-functional");
var image_functional_1 = require("./image-functional");
var cell_template_functional_1 = require("./cell-template-functional");
var notes_functional_1 = require("./notes-functional");
var print_functional_1 = require("./print-functional");
exports.spreadsheetRoutes = (React.createElement(React.Fragment, null,
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/default', Component: default_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/formula', Component: formula_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/protect-sheet', Component: protect_sheet_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/freeze-pane', Component: freeze_pane_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/data-validation', Component: data_validation_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/hyperlink', Component: hyperlink_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/cell-data-binding', Component: cell_data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/remote-data-binding', Component: remote_data_binding_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/cell-formatting', Component: cell_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/number-formatting', Component: number_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/conditional-formatting', Component: conditional_formatting_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/sorting-and-filtering', Component: sorting_and_filtering_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/chart', Component: chart_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/image', Component: image_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/cell-template', Component: cell_template_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/notes', Component: notes_functional_1.default }),
    React.createElement(react_router_dom_1.Route, { path: '/:theme/spreadsheet/print', Component: print_functional_1.default })));
exports.spreadsheetCategory = { "default": { "name": "Default Functionalities", "category": "Spreadsheet" }, "formula": { "name": "Formula", "category": "Spreadsheet" }, "protect-sheet": { "name": "Protection", "category": "Spreadsheet" }, "freeze-pane": { "name": "Freeze Panes", "category": "Spreadsheet" }, "data-validation": { "name": "Data Validation", "category": "Spreadsheet" }, "hyperlink": { "name": "Hyperlink", "category": "Spreadsheet" }, "cell-data-binding": { "name": "Cell Data Binding", "category": "Data Binding" }, "remote-data-binding": { "name": "Remote Data Binding", "category": "Data Binding" }, "cell-formatting": { "name": "Cell Formatting", "category": "Formatting" }, "number-formatting": { "name": "Number Formatting", "category": "Formatting" }, "conditional-formatting": { "name": "Conditional Formatting", "category": "Formatting" }, "sorting-and-filtering": { "name": "Sorting and Filtering", "category": "Data Analysis" }, "chart": { "name": "Chart", "category": "Data Visualization" }, "image": { "name": "Image", "category": "Illustrations" }, "cell-template": { "name": "Cell Template", "category": "Templates" }, "notes": { "name": "Notes", "category": "Review" }, "print": { "name": "Print", "category": "Printing" }, "defaultSample": "spreadsheet/default" };
