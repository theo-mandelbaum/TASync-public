"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * ProtectSheet sample
 */
function ProtectSheet() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spreadsheet;
    var boldCenter = { fontWeight: 'bold', textAlign: 'center' };
    function onCreated() {
        spreadsheet.numberFormat('$#,##0.00', 'EMI Schedule!C2:F13');
    }
    function beforeCellRender(args) {
        if (spreadsheet.activeSheetIndex === 0 && args.address === 'B1') {
            args.element.colSpan = 2;
        }
    }
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section spreadsheet-control' },
            React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { password: 'spreadsheet', openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { spreadsheet = ssObj; }, created: onCreated.bind(this), beforeCellRender: beforeCellRender.bind(this) },
                React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'EMI Calculator', isProtected: true },
                        React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Home Loan Calculator', style: boldCenter }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Loan Amount:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '100000', format: '$#,##0.00' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Interest Rate:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '0.08', format: (0, ej2_react_spreadsheet_1.getFormatFromType)('Percentage') }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Periods (terms in year):' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '1' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Start Date:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '03-03-2020' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Loan EMI:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '8698.84', format: '$#,##0.00' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Number of Payments:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '12' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Total Repayment Amount:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '104386.11', format: '$#,##0.00' }))),
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, value: 'Total Interest Amount:' }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '4386.11', format: '$#,##0.00' })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { index: 1, width: 190 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }))),
                    React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'EMI Schedule', isProtected: true },
                        React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.protectSheetData, showFieldAsHeader: true })),
                        React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: boldCenter }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: boldCenter }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: boldCenter }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: boldCenter }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: boldCenter }),
                                    React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: boldCenter })))),
                        React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { index: 1, width: 110 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 85 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 85 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 80 }),
                            React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 90 })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates protect sheet and protect workbook with EMI calculation scenario as an example. To unprotect the sheet, click the unprotect sheet button in the Data tab. Meanwhile, to unprotect the workbook, click the unprotect workbook button in the data tab and provide the password as ",
                React.createElement("code", null, "spreadsheet"),
                " in the dialog box.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "Protect sheet helps you to prevent the users from modifying the data in the spreadsheet. Protect workbook helps you to protect the workbook with a password. In this demo, the `EMI Schedule` sheet is locked using ",
                React.createElement("code", null, "isProtected"),
                " property inside the `Sheet` property and protect the workbook with a password using ",
                React.createElement("code", null, "password"),
                " property."),
            React.createElement("p", null,
                "More information about protect sheet and lock cell feature can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/protect-sheet/" }, "documentation"),
                " section."))));
}
exports.default = ProtectSheet;
