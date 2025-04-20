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
exports.Hyperlink = void 0;
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var sample_base_1 = require("../common/sample-base");
var data_1 = require("./data");
require("./spreadsheet.css");
/**
 * Hyperlink sample
 */
var Hyperlink = /** @class */ (function (_super) {
    __extends(Hyperlink, _super);
    function Hyperlink() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style1 = { fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', color: '#ffffff' };
        _this.currencyFormat = '$#,##0.00';
        return _this;
    }
    Hyperlink.prototype.onCreated = function () {
        this.spreadsheet.merge('Cart!A1:F2');
        this.spreadsheet.numberFormat(this.currencyFormat, 'Cart!E4:F12');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Cart!A1:F12');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'A1:F12');
        this.spreadsheet.cellFormat({
            fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377',
            color: '#ffffff'
        }, 'Cart!A3:F3');
        this.spreadsheet.cellFormat({
            fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377',
            color: '#ffffff'
        }, 'Stock!A1:E1');
        this.spreadsheet.wrap('Stock!B1:D1');
        this.spreadsheet.setBorder({ border: '1px solid #A6A6A6' }, 'Stock!A1:E10');
        this.spreadsheet.cellFormat({ textAlign: 'center', verticalAlign: 'middle' }, 'Stock!A1:E11');
    };
    Hyperlink.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { ref: function (ssObj) { _this.spreadsheet = ssObj; }, created: this.onCreated.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Cart', selectedRange: 'D3' },
                            React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.hyperlinkCart, startCell: 'B3' })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Shopping Cart', style: { fontSize: '20pt', fontWeight: 'bold', textAlign: 'center', backgroundColor: '#279377', verticalAlign: 'middle', color: '#ffffff' } }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, { index: 2 },
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'Product ID', style: this.style1 }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'AG940Z', hyperlink: 'Stock!A2:D2' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'BJ120K', hyperlink: 'Stock!A3:D3' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'BC120M', hyperlink: 'Stock!A4:D4' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'BS121L', hyperlink: 'Stock!A5:D5' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'BU121K', hyperlink: 'Stock!A6:D6' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'BD121M', hyperlink: 'Stock!A7:D7' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'AT992X', hyperlink: 'Stock!A8:D8' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'AP992Z', hyperlink: 'Stock!A9:D9' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { value: 'AW920X', hyperlink: 'Stock!A10:D10' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Total Amount', style: { border: '1px solid #A6A6A6', fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' } }),
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { formula: '=Sum(F4:F12)', format: this.currencyFormat, style: { border: '1px solid #A6A6A6', textAlign: 'center', verticalAlign: 'middle', fontWeight: 'bold' } })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 120 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 100 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }))),
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Stock', selectedRange: 'D3' },
                            React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.hyperlinkStock })),
                            React.createElement(ej2_react_spreadsheet_1.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Place Order', style: this.style1 }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'EBay', hyperlink: 'https://www.ebay.com/' }))),
                                React.createElement(ej2_react_spreadsheet_1.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_1.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_1.CellDirective, { index: 4, value: 'Amazon', hyperlink: 'https://www.amazon.com/' })))),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 88 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the Hyperlink feature with the shopping cart scenario as an example. To add hyperlink, click the link button in the insert tab or click hyperlink option using the cell context menu.")),
            React.createElement("div", { id: "description" },
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "This feature allows you to add reference as cell address or any web url to a cell and also navigate to a reference by clicking or tapping. You can enable or disable hyperlink by using the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/spreadsheet#allowhyperlink" }, "allowHyperlink"),
                        " property."),
                    React.createElement("li", null,
                        "In this sample, we have applied hyperlink to the cells using the ",
                        React.createElement("code", null, "hyperlink"),
                        " property in cell. We can also add hyperlink using the ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/spreadsheet#addhyperlink" }, "addHyperlink"),
                        " method. In shopping cart scenario, we have added cell reference as hyperlink in the product id column. In the stock sheet, we have added web url as hyperlink in the place order column.")),
                React.createElement("p", null,
                    "More information about the Hyperlink can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/link" }, "documentation"),
                    " section."))));
    };
    return Hyperlink;
}(sample_base_1.SampleBase));
exports.Hyperlink = Hyperlink;
