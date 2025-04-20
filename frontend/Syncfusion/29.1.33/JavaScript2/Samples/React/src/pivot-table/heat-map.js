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
exports.HeatMap = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_pivotview_1 = require("@syncfusion/ej2-react-pivotview");
var sample_base_1 = require("../common/sample-base");
var dataSource = require("./pivot-data/productData.json");
require("./heat-map.css");
(0, ej2_base_1.enableRipple)(true);
/**
 * PivotView HeatMap Sample.
 */
var HeatMap = /** @class */ (function (_super) {
    __extends(HeatMap, _super);
    function HeatMap() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.colourScheme = ['range1', 'range2', 'range3', 'range4', 'range5', 'range6',
            'range7', 'range8', 'range9', 'range10', 'range11', 'range12', 'range13', 'range14'];
        _this.minValue = 0;
        _this.maxValue = 0;
        _this.data = dataSource.data;
        _this.dataSourceSettings = {
            enableSorting: false,
            columns: [{ name: 'ProductType' }, { name: 'Product' }],
            valueSortSettings: { headerDelimiter: ' - ' },
            values: [{ name: 'SoldAmount', caption: 'Sold Amount' }],
            dataSource: _this.data,
            rows: [{ name: 'Year' }],
            formatSettings: [{ name: 'SoldAmount', format: 'C0' }],
            groupSettings: [{
                    name: 'Year',
                    type: 'Number',
                    rangeInterval: 2
                }],
            expandAll: true,
            filters: [],
            showColumnSubTotals: false
        };
        return _this;
    }
    HeatMap.prototype.cellTemplate = function (args) {
        if (args != null && args.cellInfo) {
            if (args.cellInfo.axis === 'value') {
                if (args.cellInfo.axis === 'value' && !args.cellInfo.isGrandSum) {
                    args.targetCell.classList.add(this.cellColour(args.cellInfo.value));
                }
                args.targetCell.querySelector('.e-cellvalue').innerText = '$' + (args.cellInfo.value / 1000).toFixed(1) + 'K';
            }
        }
    };
    HeatMap.prototype.cellColour = function (value) {
        var percentage = (this.maxValue - this.minValue) / this.colourScheme.length;
        var colourIndex = Math.round((value - this.minValue) / percentage);
        return this.colourScheme[colourIndex];
    };
    HeatMap.prototype.aggregateCellInfo = function (args) {
        if (args.rowCellType !== "grandTotal" && args.columnCellType !== "grandTotal") {
            this.minValue = (this.minValue < args.value && this.minValue !== 0) ? this.minValue : args.value;
            this.maxValue = this.maxValue > args.value ? this.maxValue : args.value;
        }
    };
    HeatMap.prototype.enginePopulated = function () {
        this.minValue = this.minValue - 1000;
        this.maxValue = this.maxValue + 1000;
    };
    HeatMap.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_pivotview_1.PivotViewComponent, { id: 'PivotView-Heatmap', dataSourceSettings: this.dataSourceSettings, width: '100%', height: '500', gridSettings: { rowHeight: 35, columnWidth: 120 }, cellTemplate: this.cellTemplate.bind(this), enginePopulated: this.enginePopulated.bind(this), aggregateCellInfo: this.aggregateCellInfo.bind(this) })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "In this sample, we show you how to visualize the bound data by making the pivot table cells look like a heatmap.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Pivot Table provides custom styles for each cell's display using the cell template. Using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#celltemplate" }, " cellTemplate"),
                    " property in this sample, we are representing the product-specific monthly sales revenue of the goods sold by an online retailer in a year in the form of a heatmap-like appearance. Each pivot table cell was customized by calculating the lowest and highest values via the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/pivotview/#enginepopulated" }, "enginePopulated"),
                    " event and applying a color scheme based on their range."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information on the cell template can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/pivotview/row-and-column#cell-template" }, "documentation section"),
                    "."))));
    };
    return HeatMap;
}(sample_base_1.SampleBase));
exports.HeatMap = HeatMap;
