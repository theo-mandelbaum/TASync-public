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
exports.Trend = void 0;
/**
 * Samples for Trendlines
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var base_1 = require("@syncfusion/ej2/base");
var series1 = [
    { Period: 1947, Rupees: 4.76 },
    { Period: 1967, Rupees: 7.50 },
    { Period: 1974, Rupees: 8.10 },
    { Period: 1989, Rupees: 16.64 },
    { Period: 1990, Rupees: 17.32 },
    { Period: 2000, Rupees: 43.56 },
    { Period: 2007, Rupees: 39.27 },
    { Period: 2013, Rupees: 56.57 },
    { Period: 2019, Rupees: 71.74 },
    { Period: 2020, Rupees: 76.67 },
    { Period: 2021, Rupees: 72.75 },
];
var powerData = [
    { x: 1, y: 10 }, { x: 2, y: 50 }, { x: 3, y: 80 }, { x: 4, y: 110 },
    { x: 5, y: 180 }, { x: 6, y: 220 }, { x: 7, y: 300 }, { x: 8, y: 370 }, { x: 9, y: 490 }, { x: 10, y: 500 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #charts_Series_0_TrendLine_0 {\n        stroke-dasharray: 10px 10px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 1s linear infinite;\n        animation: dash 1s linear infinite;\n    }\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }\n\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -20px;\n        }\n    }";
var Trend = /** @class */ (function (_super) {
    __extends(Trend, _super);
    function Trend() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.forwardForecast = false;
        _this.backwardForecast = false;
        _this.polynomialOrder = true;
        _this.period = true;
        _this.droplist = [
            { value: 'Linear' },
            { value: 'Exponential' },
            { value: 'Power' },
            { value: 'Logarithmic' },
            { value: 'Polynomial' },
            { value: 'MovingAverage' }
        ];
        return _this;
    }
    Trend.prototype.change = function (e) {
        var type = document.getElementById('trendLineType');
        this.chartInstance.series[0].dataSource = [];
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.series[0].trendlines[0].type = type.value;
        this.chartInstance.series[0].trendlines[0].name = type.value;
        if (type.value !== 'Power') {
            this.chartInstance.series[0].dataSource = series1;
            this.chartInstance.series[0].name = 'Rupees';
            this.chartInstance.primaryXAxis.title = '';
            this.chartInstance.primaryYAxis.interval = 10;
            this.chartInstance.primaryYAxis.title = 'Rupees against Dollars';
            this.chartInstance.title = 'Historical Indian Rupee Rate (INR USD)';
            if (type.value === 'MovingAverage') {
                this.chartInstance.series[0].trendlines[0].marker.visible = false;
            }
        }
        else {
            this.chartInstance.series[0].dataSource = powerData;
            this.chartInstance.series[0].name = 'Meters';
            this.chartInstance.primaryXAxis.title = 'Seconds';
            this.chartInstance.primaryYAxis.title = 'Meters';
            this.chartInstance.primaryYAxis.interval = 100;
            this.chartInstance.title = 'Distance Measurement';
        }
        if (type.value !== 'Polynomial' && type.value !== 'MovingAverage') {
            this.period = this.polynomialOrder = true;
            this.forwardForecast = this.backwardForecast = false;
        }
        else if (type.value === 'MovingAverage') {
            this.period = false;
            this.forwardForecast = this.backwardForecast = this.polynomialOrder = true;
        }
        else {
            this.forwardForecast = this.backwardForecast = this.polynomialOrder = false;
            this.period = true;
        }
        this.forwardElement.enabled = !this.forwardForecast;
        this.backwardElement.enabled = !this.backwardForecast;
        this.polynomialElement.enabled = !this.polynomialOrder;
        this.periodElement.enabled = !this.period;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkForwardForecast = function (e) {
        var value = Number(document.getElementById('forwardForecast').value);
        this.chartInstance.series[0].trendlines[0].forwardForecast = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkBackwardForecast = function (e) {
        var value = Number(document.getElementById('backwardForecast').value);
        this.chartInstance.series[0].trendlines[0].backwardForecast = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkPolynomialOrder = function (e) {
        var value = Number(document.getElementById('polynomial').value);
        this.chartInstance.series[0].trendlines[0].polynomialOrder = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.checkPeriod = function (e) {
        var value = Number(document.getElementById('period').value);
        this.chartInstance.series[0].trendlines[0].period = value;
        this.chartInstance.series[0].animation.enable = false;
        this.chartInstance.refresh();
    };
    Trend.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section ' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: this.load.bind(this), primaryXAxis: { valueType: 'Category', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 1 } }, primaryYAxis: { minimum: 0, maximum: 80, interval: 10, labelFormat: "₹{value}", title: 'Rupees against Dollars', minorTickLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, showNearestTooltip: true, enableHighlight: true }, width: base_1.Browser.isDevice ? '100%' : '75%', title: 'USD to INR Rates', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Trendlines, ej2_react_charts_1.Category, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: series1, xName: 'Period', yName: 'Rupees', name: 'Rupees', type: 'Spline', marker: { visible: true, isFilled: true, height: 7, width: 7 } },
                            React.createElement(ej2_react_charts_1.TrendlinesDirective, null,
                                React.createElement(ej2_react_charts_1.TrendlineDirective, { type: 'Linear', width: 3, name: 'Trends', fill: '#C64A75' })))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the trend of Indian rupees and US dollar variations in the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the trendlines. The trendline is a line drawn over the chart to display the overall direction of the results."),
                React.createElement("p", null, "This chart supports the following types."),
                React.createElement("ul", null,
                    React.createElement("li", null, "Linear"),
                    React.createElement("li", null, "Exponential"),
                    React.createElement("li", null, "Logarithmic"),
                    React.createElement("li", null, "Polynomial"),
                    React.createElement("li", null, "Power"),
                    React.createElement("li", null, "Moving Average"),
                    React.createElement("li", null, "Forecasting")),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Trend Line series, we need to inject",
                    React.createElement("code", null, "Trendlines"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the TrendLines can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/trend-lines/", "aria-label": "Navigate to the documentation for Trend Lines in React Chart Component" }, "documentation section"),
                    "."))));
    };
    Trend.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    Trend.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Trend;
}(sample_base_1.SampleBase));
exports.Trend = Trend;
