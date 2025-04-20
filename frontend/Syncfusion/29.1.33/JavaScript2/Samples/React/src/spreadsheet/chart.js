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
exports.Chart = void 0;
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_2 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_3 = require("@syncfusion/ej2-react-spreadsheet");
var ej2_react_spreadsheet_4 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * Chart sample
 */
var Chart = /** @class */ (function (_super) {
    __extends(Chart, _super);
    function Chart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.style = { backgroundColor: '#e56590', color: '#fff',
            fontWeight: 'bold', textAlign: 'center', verticalAlign: 'middle' };
        _this.chart = [{ type: 'Column', range: 'A3:E10' }];
        return _this;
    }
    Chart.prototype.onCreated = function () {
        // Formatting cells dynamically using cellFormat method
        this.spreadsheet.cellFormat({ backgroundColor: '#e56590', color: '#fff', fontWeight: 'bold', textAlign: 'center' }, 'A3:E3');
        // Applying currency format to the specified range.
        this.spreadsheet.numberFormat('$#,##0.00', 'B4:E10');
        // Merging the cells from A1 to E1
        this.spreadsheet.merge('A1:E1');
    };
    Chart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', ref: function (ssObj) { _this.spreadsheet = ssObj; }, created: this.onCreated.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'GDP' },
                            React.createElement(ej2_react_spreadsheet_2.RowsDirective, null,
                                React.createElement(ej2_react_spreadsheet_2.RowDirective, { height: 30 },
                                    React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_2.CellDirective, { value: 'Gross Domestic Product (in trillions)', style: this.style }))),
                                React.createElement(ej2_react_spreadsheet_2.RowDirective, null,
                                    React.createElement(ej2_react_spreadsheet_2.CellsDirective, null,
                                        React.createElement(ej2_react_spreadsheet_2.CellDirective, { index: 6, chart: this.chart })))),
                            React.createElement(ej2_react_spreadsheet_4.RangesDirective, null,
                                React.createElement(ej2_react_spreadsheet_3.RangeDirective, { dataSource: data_1.GDPData, startCell: 'A3' })),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 80 }),
                                React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 75 }),
                                React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 75 }),
                                React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 75 }),
                                React.createElement(ej2_react_spreadsheet_2.ColumnDirective, { width: 75 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the data using chart feature by comparing the GDP of different countries with various years.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, the chart has been inserted in the specific cell position by using the ",
                    React.createElement("code", null, "chart"),
                    "property in the cell object. You can also insert a chart by using the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/javascript/documentation/api/spreadsheet#insertchart" }, " insertChart"),
                    "method. To enable or disable this feature use the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/javascript/documentation/api/spreadsheet#allowchart" }, " allowChart"),
                    "property in Spreadsheet."),
                React.createElement("p", null,
                    "This sample is configured with import and export options. Use ",
                    React.createElement("b", null, "Ctrl + O"),
                    " to open an excel file and ",
                    React.createElement("b", null, "Ctrl + S"),
                    " to save an excel file with chart."),
                React.createElement("p", null,
                    "More information about the chart can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/illustrations/#chart" }, " documentation"),
                    " section."))));
    };
    return Chart;
}(sample_base_1.SampleBase));
exports.Chart = Chart;
