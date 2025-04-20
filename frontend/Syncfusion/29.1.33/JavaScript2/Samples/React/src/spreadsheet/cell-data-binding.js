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
exports.CellDataBinding = void 0;
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * Cell Data Binding sample
 */
var CellDataBinding = /** @class */ (function (_super) {
    __extends(CellDataBinding, _super);
    function CellDataBinding() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.boldCenter = { fontWeight: 'bold', textAlign: 'center' };
        _this.boldRight = { fontWeight: 'bold', textAlign: 'right' };
        _this.bold = { fontWeight: 'bold' };
        _this.currencyFormat = '$#,##0.00';
        return _this;
    }
    CellDataBinding.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { showFormulaBar: false, showRibbon: false },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Monthly Budget', selectedRange: 'D13' },
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Category', style: this.boldCenter }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Planned cost', style: this.boldCenter }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Actual cost', style: this.boldCenter }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Difference', style: this.boldCenter }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Food' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '7000', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '8120', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B2-C2', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Loan' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '1500', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '1500', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B3-C3', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Medical' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '300', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '0', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B4-C4', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Clothing' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '400', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '140', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B5-C5', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Education' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '900', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '750', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B6-C6', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Insurance' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '30', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '30', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B7-C7', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Utilities' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '130', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '160', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B8-C8', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Enterainment' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '500', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '730', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B9-C9', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Maintainance' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '50', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '70', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B10-C10', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Transportation' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '250', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '400', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B11-C11', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Gifts/Donations' }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '0', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: '100', format: this.currencyFormat }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=B12-C12', format: this.currencyFormat }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 2, value: 'Total Difference:', style: this.boldRight }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=D2+D12', format: this.currencyFormat, style: this.bold })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 115 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a monthly budget for a home using planned versus actual costs with cell data binding feature.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The ",
                    React.createElement("code", null, "Spreadsheet"),
                    " component supports data binding for individual cells in a sheet. You can set value, styles and format to a cell using following properties:",
                    React.createElement("ul", null,
                        React.createElement("li", null,
                            React.createElement("code", null, "index"),
                            " - Specify index for a cell."),
                        React.createElement("li", null,
                            React.createElement("code", null, "value"),
                            " - Specify cell value."),
                        React.createElement("li", null,
                            React.createElement("code", null, "style"),
                            " - Specify style for the cell."),
                        React.createElement("li", null,
                            React.createElement("code", null, "format"),
                            " - Apply number formatting for the cell."))),
                React.createElement("p", null,
                    "More information about cell data binding feature can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/data-binding/#cell-data-binding" }, " documentation"),
                    " section."))));
    };
    return CellDataBinding;
}(sample_base_1.SampleBase));
exports.CellDataBinding = CellDataBinding;
