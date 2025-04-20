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
exports.ValueSorting = void 0;
var React = require("react");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var pivotData = require("./pivot-data/Pivot_Data.json");
require("./value-sorting.css");
/**
 * PivotView Value Sorting sample.
 */
/* tslint:disable */
var Pivot_Data = pivotData.data;
var dataSourceSettings = {
    valueSortSettings: {
        headerText: 'FY 2015##In Stock',
        headerDelimiter: '##',
        sortOrder: 'Descending'
    },
    values: [{ name: 'In_Stock', caption: 'In Stock' }, { name: 'Sold', caption: 'Units Sold' },
        { name: 'Amount', caption: 'Sold Amount' }],
    formatSettings: [{ name: 'Amount', format: 'C0' }],
    columns: [{ name: 'Year' }, { name: 'Order_Source', caption: 'Order Source' }],
    dataSource: Pivot_Data,
    expandAll: false,
    enableSorting: true,
    rows: [{ name: 'Country' }, { name: 'Products' }],
    filters: [{ name: 'Product_Categories', caption: 'Product Categories' }]
};
var ValueSorting = /** @class */ (function (_super) {
    __extends(ValueSorting, _super);
    function ValueSorting() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ValueSorting.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView', dataSourceSettings: dataSourceSettings, width: '100%', height: '300', showFieldList: true, enableValueSorting: true, gridSettings: { columnWidth: 140 } },
                    React.createElement(ej2_react_pivotview_1.Inject, { services: [ej2_react_pivotview_1.FieldList] }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates ordering of values in ascending or descending order. Here, the ",
                    React.createElement("b", null, "FY 2015 -> In Stock"),
                    " column header text is ordered by defining sort-related settings in code behind.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "You can sort column values by clicking the column header. Clicking the same header once again will reverse the sorting direction. It can be enabled by setting the ",
                    React.createElement("code", null, "enableValueSorting"),
                    " as true."),
                React.createElement("p", null,
                    "Value sort-related settings can be defined in code behind, too. To do so, headers of the column to be sorted are given in the",
                    React.createElement("code", null, "headerText"),
                    " property under",
                    React.createElement("code", null, "valueSortSettings"),
                    ", separated by a delimiter string. The purpose of providing complete header text here is to indicate exactly which value column needs to be sorted. The string which is used to separate the headers is given in the property",
                    React.createElement("code", null, "headerDelimiters"),
                    ". The sorting direction is performed by the",
                    React.createElement("code", null, "sortOrder"),
                    " property.")),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information on the value sorting can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/sorting#value-sorting" }, "documentation section"),
                ".")));
    };
    return ValueSorting;
}(sample_base_1.SampleBase));
exports.ValueSorting = ValueSorting;
