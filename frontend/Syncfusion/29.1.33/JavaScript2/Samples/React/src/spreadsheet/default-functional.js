"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_2 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_3 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * Default Spreadsheet sample
 */
function Default() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    var boldRight = { fontWeight: 'bold', textAlign: 'right' };
    var bold = { fontWeight: 'bold' };
    var onCreated = function () {
        // Apply styles to the specified range in the active sheet.
        spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' }, 'A1:F1');
        // Apply format to the specified range in the active sheet.
        spreadsheet.numberFormat('$#,##0.00', 'F2:F31');
        // The default format code for the date format is 'm/d/yyyy'.
        spreadsheet.numberFormat('m/d/yyyy', 'E2:E30');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_3.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { spreadsheet = ssObj; }, created: onCreated.bind(this) },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: "Car Sales Report" },
                        React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.defaultData })),
                        React.createElement(ej2_react_spreadsheet_2.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { index: 30 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 4, value: "Total Amount:", style: boldRight }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { formula: "=SUM(F2:F30)", style: bold })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 180 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 130 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 130 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 180 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 130 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 120 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("code", null, "Spreadsheet"),
                " component and its features such as editing, formulas, formatting, importing, and exporting.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Spreadsheet"),
                " component is used to organize and analyze data in tabular format. It has a built-in calculation library that supports most commonly used formulas. Excel workbook files can be imported and exported by providing ",
                React.createElement("code", null, "openUrl"),
                " &",
                React.createElement("code", null, "saveUrl"),
                " property."),
            React.createElement("p", null,
                "Data binding can be achieved by setting an array of JavaScript objects or an instance of Data Manager to the",
                React.createElement("code", null, "dataSource"),
                " property under the ",
                React.createElement("code", null, "ranges"),
                " of sheet. The ",
                React.createElement("code", null, "cellFormat"),
                " and",
                React.createElement("code", null, "numberFormat"),
                "methods are used to apply format to a range of cells in the ",
                React.createElement("code", null, "created"),
                " event."),
            React.createElement("p", null,
                "More information about the Spreadsheet component can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/getting-started" }, " documentation"),
                " section."))));
}
exports.default = Default;
