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
exports.Sorting = exports.data1 = void 0;
/**
 * Sample for smart axis labels
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Asia', car: 120, trucks: 90, bike: 180, cycle: 90 },
    { x: 'Canada', car: 100, trucks: 80, bike: 90, cycle: 80 },
    { x: 'Europe', car: 80, trucks: 90, bike: 60, cycle: 50 },
    { x: 'Africa', car: 40, trucks: 20, bike: 30, cycle: 30 },
    { x: 'Mexico', car: 40, trucks: 50, bike: 80, cycle: 50 },
    { x: 'US', car: 140, trucks: 90, bike: 75, cycle: 70 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var Sorting = /** @class */ (function (_super) {
    __extends(Sorting, _super);
    function Sorting() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'None' },
            { value: 'Sort by X' },
            { value: 'Sort by Y' },
        ];
        return _this;
    }
    Sorting.prototype.change = function () {
        this.sortDataSource(this.dropElement.value + '');
    };
    ;
    Sorting.prototype.isDescending = function () {
        this.sortDataSource(this.dropElement.value + '');
    };
    ;
    Sorting.prototype.sortDataSource = function (value) {
        var isDecending = this.checkElement.checked;
        this.checkElement.disabled = false;
        var sortData;
        if (value === 'Sort by X') {
            sortData = (0, ej2_react_charts_1.sort)(exports.data1, ['x'], isDecending);
        }
        else if (value === 'Sort by Y') {
            sortData = (0, ej2_react_charts_1.sort)(exports.data1, ['car', 'trucks', 'bike', 'cycle'], isDecending);
        }
        else {
            this.checkElement.disabled = true;
            sortData = exports.data1;
        }
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.series[1].animation.enable = false;
        this.chartInstance.series[2].animation.enable = false;
        this.chartInstance.series[3].animation.enable = false;
        this.chartInstance.series[0].dataSource = sortData;
        this.chartInstance.series[1].dataSource = sortData;
        this.chartInstance.series[2].dataSource = sortData;
        this.chartInstance.series[3].dataSource = sortData;
        this.chartInstance.refresh();
    };
    Sorting.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Sorting.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    Sorting.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            majorGridLines: { width: 0 },
                            minorGridLines: { width: 0 },
                            majorTickLines: { width: 0 },
                            minorTickLines: { width: 0 },
                            interval: 1,
                            lineStyle: { width: 0 },
                            labelIntersectAction: 'Rotate45',
                            valueType: 'Category'
                        }, width: '92%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, primaryYAxis: {
                            title: 'Sales',
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 },
                            majorGridLines: { width: 1 },
                            minorGridLines: { width: 1 },
                            minorTickLines: { width: 0 },
                            labelFormat: '{value}K'
                        }, load: this.load.bind(this), title: "Vehicle Sales by Region", loaded: this.onChartLoad.bind(this), legendSettings: { visible: true }, tooltip: { enable: true, enableHighlight: true } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'car', name: "Car", type: 'StackingColumn', width: 2 }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'trucks', name: "Trucks", type: 'StackingColumn', width: 2 }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'bike', name: "Bike", type: 'StackingColumn', width: 2 }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'cycle', name: "Cycle", type: 'StackingColumn', width: 2 })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", { id: "checkValue" }, "Descending: ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "checkbox", id: "isDescending", disabled: true, onChange: this.isDescending.bind(this), style: { marginLeft: '-5px' }, ref: function (check) { return _this.checkElement = check; }, "aria-labelledby": "Checkbox unchecked" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", null, "Sort By: ")),
                                    React.createElement("td", null,
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (drop) { return _this.dropElement = drop; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "None" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes sales for vehicle range for different zone with default stacked column series in chart. Legend in the sample shows the information about those series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to sort the series data in chart. To sort the data points of the series, use the ",
                    React.createElement("code", null, "sort"),
                    " method. This method determines whether the series data points should be sorted by their arguments or values."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject ",
                    React.createElement("code", null, "StackingColumnSeries"),
                    " module using ",
                    React.createElement("code", null, "Chart.Inject(StackingColumnSeries)"),
                    " method."))));
    };
    return Sorting;
}(sample_base_1.SampleBase));
exports.Sorting = Sorting;
