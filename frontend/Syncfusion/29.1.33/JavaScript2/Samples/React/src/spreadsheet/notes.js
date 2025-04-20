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
exports.Notes = void 0;
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
require("./spreadsheet.css");
var Notes = /** @class */ (function (_super) {
    __extends(Notes, _super);
    function Notes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.cellStyle = { fontWeight: 'bold', textAlign: 'center' };
        _this.currencyFormat = '$#,##0.00';
        return _this;
    }
    Notes.prototype.onCreated = function () {
        this.spreadsheet.numberFormat('$#,##0.00', 'F4:F12');
        this.spreadsheet.numberFormat('$###', 'E4:E12');
        this.spreadsheet.freezePanes(3, 0);
    };
    Notes.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { _this.spreadsheet = ssObj; }, created: this.onCreated.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Cart' },
                            React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.notesData, startCell: 'B3' })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Shopping Cart', rowSpan: 2, colSpan: 6, style: { fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', verticalAlign: 'middle', color: '#ffffff' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 2 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Product ID', style: this.cellStyle }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: this.cellStyle }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: this.cellStyle }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: this.cellStyle }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: this.cellStyle }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { style: this.cellStyle }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '101', style: { textAlign: 'left' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, notes: 'This product has been the most profitable this month.' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '102', style: { textAlign: 'left' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, notes: 'This product has had the lowest sales in terms of quantity this month.' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '103', style: { textAlign: 'left' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, notes: 'This product has been the least profitable this month.' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '104', style: { textAlign: 'left' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '105', style: { textAlign: 'left' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 1, notes: 'This product has had the highest sales in terms of quantity this month.' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '106', style: { textAlign: 'left' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '107', style: { textAlign: 'left' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '108', style: { textAlign: 'left' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '109', style: { textAlign: 'left' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Total Amount', style: { border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=Sum(F4:F12)', format: this.currencyFormat, style: { border: '1px solid #A6A6A6', textAlign: 'right', verticalAlign: 'middle', fontWeight: 'bold' } })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the ",
                    React.createElement("b", null, "Notes"),
                    " feature using the shopping cart scenario as an example. When you hover your mouse over the red indicator in the right corner of the cell, any note attached to the cell will be displayed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("b", null, "Notes"),
                    " feature allows you to add comments while reviewing a document. You can enable or disable the notes option using the ",
                    React.createElement("code", null, "enableNotes"),
                    " property; by default, it's enabled. To insert a note into cells, use the",
                    React.createElement("b", null, "\"Add Note\""),
                    " context menu option. Once added, notes can be edited or removed using the ",
                    React.createElement("b", null, "\"Edit Note\""),
                    " and",
                    React.createElement("b", null, "\"Delete Note\""),
                    " context menu options respectively."),
                React.createElement("p", null,
                    "The following keyboard shortcuts apply to the ",
                    React.createElement("b", null, "Notes"),
                    " feature:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("span", { style: { display: 'inline-block', width: '130px' } },
                            React.createElement("kbd", null, "Shift"),
                            " + ",
                            React.createElement("kbd", null, "F2")),
                        React.createElement("span", null, "- Add a note to the current cell.")),
                    React.createElement("li", null,
                        React.createElement("span", { style: { display: 'inline-block', width: '130px' } },
                            React.createElement("kbd", null, "Esc")),
                        React.createElement("span", null, "- Save and close the note."))))));
    };
    return Notes;
}(sample_base_1.SampleBase));
exports.Notes = Notes;
