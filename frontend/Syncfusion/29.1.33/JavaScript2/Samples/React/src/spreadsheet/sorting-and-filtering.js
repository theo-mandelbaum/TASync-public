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
exports.SortingAndFiltering = void 0;
var React = require("react");
var ej2_react_spreadsheet_1 = require("@syncfusion/ej2-react-spreadsheet");
var data_1 = require("./data");
var sample_base_1 = require("../common/sample-base");
require("./spreadsheet.css");
/**
 * SortingAndFiltering sample
 */
var SortingAndFiltering = /** @class */ (function (_super) {
    __extends(SortingAndFiltering, _super);
    function SortingAndFiltering() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SortingAndFiltering.prototype.onCreated = function () {
        var _this = this;
        this.spreadsheet.cellFormat({ fontWeight: 'bold', textAlign: 'center' }, 'A1:G1');
        this.spreadsheet.numberFormat('m/d/yyyy', 'E2:E51');
        this.spreadsheet.sort({ sortDescriptors: { field: 'B' } }, 'A2:G51').then(function () {
            _this.spreadsheet.applyFilter([{ field: 'D', operator: 'equal', value: 'Services' }], 'A1:G51');
        });
        this.spreadsheet.numberFormat('$#,##0.00', 'F2:F51');
    };
    SortingAndFiltering.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section spreadsheet-control' },
                React.createElement(ej2_react_spreadsheet_1.SpreadsheetComponent, { ref: function (ssObj) { _this.spreadsheet = ssObj; }, openUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/open', saveUrl: 'https://ej2services.syncfusion.com/production/web-services/api/spreadsheet/save', created: this.onCreated.bind(this) },
                    React.createElement(ej2_react_spreadsheet_1.SheetsDirective, null,
                        React.createElement(ej2_react_spreadsheet_1.SheetDirective, { name: 'Employee Details' },
                            React.createElement(ej2_react_spreadsheet_1.RangesDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.RangeDirective, { dataSource: data_1.sortingAndFiltering, showFieldAsHeader: true })),
                            React.createElement(ej2_react_spreadsheet_1.ColumnsDirective, null,
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 110 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 142 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 80 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 137 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 122 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 92 }),
                                React.createElement(ej2_react_spreadsheet_1.ColumnDirective, { width: 124 })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates sorting and filtering feature using employee details.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this demo, sorting is applied to B(Employee Name) column in ascending order using ",
                    React.createElement("code", null, "sort"),
                    " method. The sort order can be specified in ",
                    React.createElement("code", null, "order"),
                    " property with following values `Ascending` or `Descending` and its default value is `Ascending`. The sorted data is filtered with value 'Services' in `D` column using ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/#applyfilter" }, "applyFilter")),
                    " method in call back function of ",
                    React.createElement("code", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/spreadsheet/#sort" }, "sort")),
                    " method."),
                React.createElement("p", null,
                    "More information about sorting and filtering feature can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/spreadsheet/sort/" }, "documentation"),
                    " section."))));
    };
    return SortingAndFiltering;
}(sample_base_1.SampleBase));
exports.SortingAndFiltering = SortingAndFiltering;
