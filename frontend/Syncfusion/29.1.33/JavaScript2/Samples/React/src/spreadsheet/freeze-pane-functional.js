"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_2 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * Freeze pane Spreadsheet sample
 */
function FreezePane() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    var cellStyle = { fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' };
    var bold = { fontWeight: 'bold' };
    function onCreated() {
        spreadsheet.wrap("C2:P2");
        spreadsheet.merge('A1:B1');
        spreadsheet.merge('C1:P1');
        spreadsheet.cellFormat({
            backgroundColor: '#4e4ee6', color: '#FFFFF4', fontSize: '12pt', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle'
        }, 'A1:P2');
        spreadsheet.cellFormat({ backgroundColor: '#4e4ee6', color: '#FFFFF4' }, 'A3:B26');
        spreadsheet.numberFormat('$#,##0.00', 'C2:P26');
        spreadsheet.numberFormat('$#,##0.00', 'O27:P27');
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { spreadsheet = ssObj; }, created: onCreated.bind(this) },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Gross Salary', frozenRows: 2, frozenColumns: 2, selectedRange: 'C1' },
                        React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.freezePaneData, startCell: 'A2' })),
                        React.createElement(ej2_react_spreadsheet_2.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 1, value: 'Period', style: cellStyle }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 3, value: 'Total Gross Salary', style: cellStyle }))),
                            React.createElement(ej2_react_spreadsheet_2.RowDirective, { index: 26 },
                                React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 13, value: "Total Amount:", style: bold }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { formula: '=SUM(O4:O26)', style: cellStyle }),
                                    React.createElement(ej2_react_spreadsheet_2.CellDirective, { formula: '=SUM(P4:P26)', style: cellStyle })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 80 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 80 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 80 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 }),
                            React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 100 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the ",
                React.createElement("code", null, "Spreadsheet"),
                " freeze pane feature by applying frozen rows and columns with the Gross Salary scenario as an example. In this sample, you can see the frozen rows/columns that are visible while scrolling the sheet content vertically/horizontally.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Freeze Panes helps you to keep particular rows or columns visible when scrolling the sheet content in the spreadsheet. You can specify the number of frozen rows and columns using ",
                React.createElement("code", null, "frozenRows"),
                " and ",
                React.createElement("code", null, "frozenColumns"),
                " properties inside the `Sheet` property"),
            React.createElement("p", null, "In this sample, the first 2 rows and columns are frozen using the `frozenRows` and `frozenColumns` properties."),
            React.createElement("p", null,
                "More information about ",
                React.createElement("code", null, "freeze pane"),
                " can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/getting-started" }, " documentation"),
                " section."))));
}
exports.default = FreezePane;
