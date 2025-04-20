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
exports.VerticalChart = void 0;
/**
 * Samples for vertical chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var VerticalChart = /** @class */ (function (_super) {
    __extends(VerticalChart, _super);
    function VerticalChart() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.count = 0;
        return _this;
    }
    VerticalChart.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts-vertical', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: this.load.bind(this), primaryYAxis: { title: 'Sales in Billion', majorGridLines: { width: 0 }, minimum: 11000, maximum: 15000, interval: 500, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, isTransposed: true, legendSettings: { visible: false }, tooltip: { enable: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Sales Vs Profit Margins', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.ColumnSeries] }),
                    React.createElement(ej2_react_charts_1.AxesDirective, null,
                        React.createElement(ej2_react_charts_1.AxisDirective, { majorGridLines: { width: 0 }, opposedPosition: true, title: 'Profit(In Percentage)', lineStyle: { width: 0 }, minimum: 0, maximum: 4, interval: 0.5, majorTickLines: { width: 0 }, name: 'yAxis2', labelFormat: '{value}%' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { width: 2, dataSource: [{ Year: "2016", column: 13600 }, { Year: "2017", column: 12900 }, { Year: "2018", column: 12500 }, { Year: "2019", column: 14500 }, { Year: "2020", column: 14500 }, { Year: "2021", column: 12000 }], xName: 'Year', name: "Sales", yName: 'column', type: 'Column' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { width: 2, dataSource: [{ Year: "2016", column: 13600, series: 0.5 }, { Year: "2017", series: 1.5 }, { Year: "2018", series: 3.5 }, { Year: "2019", series: 1.5 }, { Year: "2020", series: 3 }, { Year: "2021", series: 2.5 }], yAxisName: "yAxis2", name: "Profit Margin", xName: 'Year', yName: 'series', type: 'Line', marker: { visible: true, width: 7, height: 7, isFilled: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates the vertical chart by changing the orientation of x-axis to vertical and y-axis to horizontal.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the vertical type charts. To render a chart in vertical manner, you can use ",
                    React.createElement("code", null, "isTransposed"),
                    " in chart."),
                React.createElement("p", null,
                    "More information on the isTransposed can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/vertical", "aria-label": "Navigate to the documentation for Vertical Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    VerticalChart.prototype.onChartLoad = function (args) {
        var _this = this;
        //let chart: Element = document.getElementById('charts-vertical');
        args.chart.loaded = null;
        //chart.setAttribute('title', '');
        this.clrInterval =
            +setInterval(function () {
                args.chart.series[0].dataSource = _this.liveData(args.chart.series[0].dataSource, args.chart.series[0]);
                args.chart.refresh();
            }, 
            // tslint:disable-next-line:align
            10);
    };
    ;
    VerticalChart.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    VerticalChart.prototype.liveData = function (data, series) {
        this.count = this.count + 1;
        var newData = data;
        if (this.count > 350 || (0, ej2_react_charts_1.getElement)('charts-vertical') === null) {
            clearInterval(this.clrInterval);
        }
        else if (this.count > 300) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(0, 0) });
        }
        else if (this.count > 250) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-2, 1) });
        }
        else if (this.count > 180) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 2) });
        }
        else if (this.count > 100) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-7, 6) });
        }
        else if (this.count < 50) {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-3, 3) });
        }
        else {
            newData.push({ x: this.getXValue(data), y: this.getRandomArbitrary(-9, 9) });
        }
        return newData;
    };
    VerticalChart.prototype.getRandomArbitrary = function (min, max) {
        return Math.random() * (max - min) + min;
    };
    VerticalChart.prototype.getXValue = function (data) {
        return data.length;
    };
    return VerticalChart;
}(sample_base_1.SampleBase));
exports.VerticalChart = VerticalChart;
