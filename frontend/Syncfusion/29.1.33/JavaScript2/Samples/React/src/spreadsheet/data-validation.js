"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataValidation = void 0;
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
require("./spreadsheet.css");
/**
 * Data Validation sample
 */
var DataValidation = /** @class */ (function (_super) {
    __extends(DataValidation, _super);
    function DataValidation() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currencyFormat = '$#,##0.00';
        return _this;
    }
    DataValidation.prototype.onCreated = function () {
        this.spreadsheet.merge('A1:I2');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'A1:I13');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A3:I13');
        this.spreadsheet.cellFormat({ backgroundColor: '#B3FFB3', fontWeight: 'bold' }, 'A3:I3');
        this.spreadsheet.numberFormat(this.currencyFormat, 'H4:I13');
        this.spreadsheet.numberFormat('m/d/yyyy', 'C4:C13');
        this.spreadsheet.wrap('H3:I3');
        //Add Data validation to range.
        this.spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '9', ignoreBlank: false }, 'G4:G13');
        this.spreadsheet.addDataValidation({ type: 'TextLength', operator: 'GreaterThan', value1: '3', ignoreBlank: false }, 'B4:B13');
        this.spreadsheet.addDataValidation({ type: 'Time', operator: 'GreaterThan', value1: '8:00:00 AM', ignoreBlank: false }, 'E4:E13');
        this.spreadsheet.addDataValidation({ type: 'Time', operator: 'LessThan', value1: '6:00:00 PM', ignoreBlank: false }, 'F4:F13');
        this.spreadsheet.addDataValidation({ type: 'List', value1: 'Mon, Tue, Wed, Thu, Fri', ignoreBlank: false }, 'D4:D13');
        this.spreadsheet.addDataValidation({ type: 'WholeNumber', operator: 'LessThan', value1: '=H5', ignoreBlank: false }, 'I4:I13');
        //Highlight Invalid Data.
        this.spreadsheet.addInvalidHighlight('G4:G13');
        this.spreadsheet.addInvalidHighlight('I4:I13');
    };
    DataValidation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { ref: function (ssObj) { _this.spreadsheet = ssObj; }, created: this.onCreated.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Gross Pay', selectedRange: 'D13' },
                            React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.grossPay, startCell: 'A3' })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'TimeSheet Calculation', style: { fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#B3FFB3', verticalAlign: 'middle' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 13 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 7, value: 'Total Gross', style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 8, formula: '=Sum(I4:I13)', format: this.currencyFormat, style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 106 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 98 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 98 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 130 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample explains the Data Validation feature with the gross pay calculation as an example. It is used to restrict the data that the user enters into a cell. To clear the applied validation, click the ",
                    React.createElement("code", null, "Data Validation"),
                    " button in the Data tab and ",
                    React.createElement("code", null, "Clear Validation"),
                    " option. You can also highlight the invalid data by selecting ",
                    React.createElement("code", null, "Highlight Invalid Data"),
                    " option.")),
            React.createElement("div", { id: "description" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "This feature allows you to apply validation to a cell or range of cells based on the conditions required. You can enable or disable data validation by using the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/spreadsheet#allowdatavalidation" }, "allowDataValidation"),
                        " property."),
                    React.createElement("li", null,
                        "In this sample, we have applied data validation for List, String, Number, Date and Time by using the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/spreadsheet#adddatavalidation" }, "addDataValidation"),
                        " method with ",
                        React.createElement("code", null, "ValidationModel"),
                        " as argument."),
                    React.createElement("li", null,
                        "In the Employee Name column, we have used ",
                        React.createElement("code", null, "TextLength"),
                        " validation to provide proper name with more than 3 text length. In time in and time out column, we have provided ",
                        React.createElement("code", null, "Time"),
                        " validation for working hours between 8.00 AM to 6.00 PM. In the weekdays column, we have used ",
                        React.createElement("code", null, "List"),
                        " validation for weekdays (Monday to Friday)."),
                    React.createElement("li", null,
                        "In the hours worked column, we have used ",
                        React.createElement("code", null, "WholeNumber"),
                        " validation to find out overtime calculation(i.e more than 8 hours). And also, we used the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/spreadsheet/#addinvalidhighlight" }, "addInvalidHighlight"),
                        " to highlight the overtime hours of the employee."),
                    React.createElement("li", null,
                        "In the gross pay with overtime column, we have used ",
                        React.createElement("code", null, "WholeNumber"),
                        " validation. In this validation, we have used the input value as the cell reference. It helps in changing the criteria dynamically.")),
                React.createElement("p", null,
                    "More information about the Data Validation can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/cell-range/#data-validation" }, "documentation"),
                    " section."))));
    };
    return DataValidation;
}(sample_base_1.SampleBase));
exports.DataValidation = DataValidation;
