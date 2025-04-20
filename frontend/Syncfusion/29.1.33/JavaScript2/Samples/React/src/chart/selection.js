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
exports.SelectionChart = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Selection in chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'CHN', y: 17 }, { x: 'USA', y: 19 },
    { x: 'IDN', y: 29 }, { x: 'JAP', y: 13 },
    { x: 'BRZ', y: 24 }
];
exports.data2 = [
    { x: 'CHN', y: 54 }, { x: 'USA', y: 67 },
    { x: 'IDN', y: 65 }, { x: 'JAP', y: 61 },
    { x: 'BRZ', y: 68 }
];
exports.data3 = [
    { x: 'CHN', y: 9 }, { x: 'USA', y: 14 },
    { x: 'IDN', y: 6 }, { x: 'JAP', y: 26 },
    { x: 'BRZ', y: 8 }
];
var SelectionChart = /** @class */ (function (_super) {
    __extends(SelectionChart, _super);
    function SelectionChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.droplist = [
            { value: 'Point' },
            { value: 'Series' },
            { value: 'Cluster' }
        ];
        _this.patternTypes = [
            { value: 'None' },
            { value: 'DiagonalForward' },
            { value: 'Chessboard' },
            { value: 'Triangle' },
            { value: 'Box' },
            { value: 'HorizontalDash' }
        ];
        _this.patternTypes2 = [
            { value: 'None' },
            { value: 'Dots' },
            { value: 'Chessboard' },
            { value: 'Triangle' },
            { value: 'Tile' },
            { value: 'Grid' }
        ];
        return _this;
    }
    SelectionChart.prototype.change = function () {
        var checkBox = document.getElementById('highlightCheckbox');
        this.chartInstance.selectionMode = this.dropElement.value;
        if (checkBox.checked) {
            this.chartInstance.highlightMode = this.dropElement.value;
        }
        else {
            this.chartInstance.highlightMode = 'None';
        }
        this.chartInstance.dataBind();
    };
    SelectionChart.prototype.check = function () {
        this.chartInstance.isMultiSelect = this.checkElement.checked;
    };
    SelectionChart.prototype.selectionChange = function () {
        this.chartInstance.selectionPattern = this.patternDropDownList.value;
    };
    SelectionChart.prototype.hightlightPatternChange = function () {
        var checkBox = document.getElementById('highlightCheckbox');
        if (checkBox.checked) {
            this.chartInstance.highlightPattern = this.highlightDropDownList.value;
        }
        else {
            this.chartInstance.highlightPattern = 'None';
        }
    };
    SelectionChart.prototype.highlightChange = function (e) {
        if (e.target.checked) {
            this.chartInstance.highlightMode = this.chartInstance.selectionMode;
            this.chartInstance.highlightPattern = this.highlightDropDownList.value;
        }
        else {
            this.chartInstance.highlightMode = this.chartInstance.highlightPattern = 'None';
        }
    };
    // function to handle the ColorPicker change event
    SelectionChart.prototype.onChange = function (args) {
        this.chartInstance.highlightColor = args.currentValue.hex;
        this.chartInstance.dataBind();
    };
    SelectionChart.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-8' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, style: { textAlign: "center" }, primaryXAxis: {
                            title: 'Countries',
                            valueType: 'Category',
                            interval: 1,
                            labelIntersectAction: 'Rotate90',
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            title: 'Distribution',
                            labelFormat: '{value}%',
                            interval: 20,
                            lineStyle: { width: 0 },
                            majorTickLines: { width: 0 }
                        }, load: this.load.bind(this), title: 'Age Distribution by Country', loaded: this.onChartLoad.bind(this), legendSettings: { visible: true, toggleVisibility: false }, selectionMode: 'Point', highlightMode: 'None', selectionPattern: 'None', highlightPattern: 'None' },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Selection, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Highlight] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', width: 2, yName: 'y', name: 'Age 0-14', type: 'Column' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', width: 2, yName: 'y', name: 'Age 15-64', type: 'Column' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', width: 2, yName: 'y', name: 'Age 65 & Above', type: 'Column' })))),
                React.createElement("div", { className: 'col-md-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                " ",
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Selection Mode:")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "selmode", change: this.change.bind(this), ref: function (d) { return _this.dropElement = d; }, dataSource: this.droplist, fields: { text: 'value', value: 'value' }, value: "Point" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '80%' } },
                                        React.createElement("div", { id: "multiSelection" }, "Enable Multi-selection:")),
                                    React.createElement("td", { style: { width: '20%' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "checkbox", id: "select", onChange: this.check.bind(this), ref: function (d) { return _this.checkElement = d; }, "aria-labelledby": "Checkbox unchecked" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Selection Patterns:")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "patternMode", change: this.selectionChange.bind(this), ref: function (d) { return _this.patternDropDownList = d; }, dataSource: this.patternTypes, fields: { text: 'value', value: 'value' }, value: "None" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Highlight Color:")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "inline-palette", mode: "Palette", value: "null", change: this.onChange.bind(this) }))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '80%' } },
                                        React.createElement("div", { id: "highLight" }, "Enable Hightlight Pattern:")),
                                    React.createElement("td", { style: { width: '20%' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "checkbox", id: "highlightCheckbox", onChange: this.highlightChange.bind(this), "aria-labelledby": "Checkbox unchecked" })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", null, "Highlight Patterns:")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: "120px", id: "highpattern", change: this.hightlightPatternChange.bind(this), ref: function (d) { return _this.highlightDropDownList = d; }, dataSource: this.patternTypes2, fields: { text: 'value', value: 'value' }, value: "None" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the selection behavior and its mode along with the highlight and highlight patterns in the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this sample, any point or series can be selected in the chart by clicking on or touching the point. You can also change the selection mode by changing the ",
                    React.createElement("code", null, "Selection Mode"),
                    " option in the properties panel. You can enable multiple selections with the ",
                    React.createElement("code", null, "Enable Multi Selection"),
                    " option. You can also select a point while loading a chart using the ",
                    React.createElement("code", null, "SelectedDataIndexes"),
                    " option. While hovering the point, the point is highlighted using the ",
                    React.createElement("code", null, "Enable Highlight"),
                    " option, as well as you can set different highlight patterns and colors using the ",
                    React.createElement("code", null, "Highlight Patterns"),
                    " and ",
                    React.createElement("code", null, "Highlight Color"),
                    " option."),
                React.createElement("p", null, "Tap to select a point or series, double tap and drag to enable rectangular selection in touch enabled devices."),
                React.createElement("p", null,
                    "Chart supports seven mode of selection which can be set using ",
                    React.createElement("code", null, "SelectionMode"),
                    " property."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Series"),
                        " - Select the series in chart."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Point"),
                        " - Select a point in the series ."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Cluster"),
                        " - Select a group of points in the chart."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DragXY"),
                        " - Rectangular selection with respect to both axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DragX"),
                        " - Rectangular selection with respect to horizontal axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "DragY"),
                        " - Rectangular selection with respect to vertical axis."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Lasso"),
                        " - Select free form of selection area points.")),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use selection feature, we need to inject",
                    React.createElement("code", null, "Selection"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information about selection can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/selection/", "aria-label": "Navigate to the documentation for Selection in React Chart component" }, "documentation section"),
                    "."))));
    };
    SelectionChart.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        chart.setAttribute('align', 'center');
    };
    ;
    SelectionChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return SelectionChart;
}(sample_base_1.SampleBase));
exports.SelectionChart = SelectionChart;
