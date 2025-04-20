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
exports.IndexedAxis = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Indexed Category Axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Myanmar', y: 7.3 },
    { x: 'India', y: 7.9 },
    { x: 'Bangladesh', y: 6.8 },
    { x: 'Cambodia', y: 7.0 },
    { x: 'China', y: 6.9 },
];
exports.data2 = [
    { x: 'Poland', y: 2.7 },
    { x: 'Australia', y: 2.5 },
    { x: 'Singapore', y: 2.0 },
    { x: 'Canada', y: 1.4 },
    { x: 'Germany', y: 1.8 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var IndexedAxis = /** @class */ (function (_super) {
    __extends(IndexedAxis, _super);
    function IndexedAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    IndexedAxis.prototype.onChange = function () {
        this.chartInstance.primaryXAxis.isIndexed = this.dropElement.checked;
        if (this.chartInstance.primaryXAxis.isIndexed) {
            this.chartInstance.tooltip.shared = false;
            this.chartInstance.series[0].type = 'Column';
            this.chartInstance.series[1].type = 'Column';
            this.chartInstance.series[0].marker.visible = false;
            this.chartInstance.series[1].marker.visible = false;
            this.chartInstance.primaryXAxis.labelRotation = 0;
            this.chartInstance.crosshair.line.width = 1;
        }
        else {
            this.chartInstance.series[0].type = 'Line';
            this.chartInstance.series[1].type = 'Line';
            this.chartInstance.series[0].marker.visible = true;
            this.chartInstance.series[1].marker.visible = true;
            this.chartInstance.primaryXAxis.labelRotation = 90;
            this.chartInstance.crosshair.line.width = 0;
            this.chartInstance.tooltip.enable = true;
            this.chartInstance.tooltip.shared = false;
        }
        this.chartInstance.refresh();
    };
    ;
    IndexedAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-md-9' },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return _this.chartInstance = chart; }, primaryXAxis: {
                            valueType: 'Category',
                            interval: 1,
                            edgeLabelPlacement: 'Shift',
                            crosshairTooltip: { enable: false },
                            isIndexed: true,
                            majorGridLines: { width: 0 }
                        }, primaryYAxis: {
                            labelFormat: '{value}%',
                            majorTickLines: { width: 0 },
                            lineStyle: { width: 0 }
                        }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), title: "Real GDP Growth", loaded: this.onChartLoad.bind(this), tooltip: { enable: false, shared: true }, crosshair: { enable: false, lineType: 'Vertical' } },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.DataLabel] }),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: '2015', width: 2, type: 'Column', marker: {
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top',
                                        font: { fontWeight: '600' },
                                    }
                                } }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: '2016', width: 2, type: 'Column', marker: {
                                    dataLabel: {
                                        visible: true,
                                        position: 'Top',
                                        font: { fontWeight: '600' },
                                    }
                                } })))),
                React.createElement("div", { className: 'col-md-3 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '60%' } },
                                        React.createElement("div", { id: "indexed" }, "Indexed:")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "checkbox", id: "isIndexed", defaultChecked: true, onChange: this.onChange.bind(this), style: { marginLeft: '-5px' }, ref: function (d) { return _this.dropElement = d; }, "aria-labelledby": "Checkbox checked" }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the rendering of indexed category axis in the chart by using two series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to indexed axis in chart. For indexed category axis you can use ",
                    React.createElement("code", null, "isIndexed"),
                    " property."),
                React.createElement("p", null, "Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices."),
                React.createElement("p", null,
                    "More information on the indexed axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/category-axis/#indexed-category-axis", "aria-label": "Navigate to the documentation for Indexed category Axis in React Chart component" }, "documentation section"),
                    "."))));
    };
    IndexedAxis.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    IndexedAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return IndexedAxis;
}(sample_base_1.SampleBase));
exports.IndexedAxis = IndexedAxis;
