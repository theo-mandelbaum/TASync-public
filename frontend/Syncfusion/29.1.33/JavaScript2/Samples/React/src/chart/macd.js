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
exports.Macd = void 0;
/**
 * Sample for MACD Indicator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var Macd = /** @class */ (function (_super) {
    __extends(Macd, _super);
    function Macd() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Macd.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: this.load.bind(this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }, primaryYAxis: { title: 'Price', labelFormat: '${value}', plotOffset: 25, minimum: 50, maximum: 170, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, tooltip: { enable: true, shared: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', crosshair: { enable: true, lineType: 'Vertical' }, chartArea: { border: { width: 0 } }, zoomSettings: { enableSelectionZooming: true, mode: 'X', enablePan: true }, title: 'AAPL Stock Price 2012-2017', legendSettings: { visible: false }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.MacdIndicator, ej2_react_charts_1.StripLine, ej2_react_charts_1.ColumnSeries] }),
                    React.createElement(ej2_react_charts_1.RowsDirective, null,
                        React.createElement(ej2_react_charts_1.RowDirective, { height: '40%' }),
                        React.createElement(ej2_react_charts_1.RowDirective, { height: '60%' })),
                    React.createElement(ej2_react_charts_1.AxesDirective, null,
                        React.createElement(ej2_react_charts_1.AxisDirective, { opposedPosition: true, rowIndex: 0, name: 'secondary', majorGridLines: { width: 0 }, lineStyle: { width: 0 }, minimum: -3.5, maximum: 3.5, interval: 3.5, majorTickLines: { width: 0 }, title: 'MACD' },
                            React.createElement(ej2_react_charts_1.StripLinesDirective, null,
                                React.createElement(ej2_react_charts_1.StripLineDirective, { start: -3.5, end: 3.5, text: '', color: 'black', visible: true, opacity: 0.03, zIndex: 'Behind' })))),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartValues, width: 2, xName: 'period', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open', name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', type: 'Candle', animation: { enable: true } })),
                    React.createElement(ej2_react_charts_1.IndicatorsDirective, null,
                        React.createElement(ej2_react_charts_1.IndicatorDirective, { type: 'Macd', period: 3, fastPeriod: 8, slowPeriod: 5, seriesName: 'Apple Inc', macdType: 'Both', width: 2, macdPositiveColor: '#2ecd71', macdNegativeColor: '#e74c3d', fill: '#6063ff', yAxisName: 'secondary' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a chart with candle series and a moving average convergence divergence indicator. The trackball shows information about each day\u2019s stock, MACD line, signal line, and MACD histogram values.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure a moving average convergence divergence indicator. The moving average is based on the difference between two EMA's. This indicator often provides valuable signals for trend analysis."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use MACD Indicator, we need to inject",
                    React.createElement("code", null, "MacdIndicator"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the MACD Indicator can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#moving-average-convergence-divergence-macd", "aria-label": "Navigate to the documentation for Moving Average Convergence Divergence in Technical Indicators of React Chart component" }, "documentation section"),
                    "."))));
    };
    Macd.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Macd.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Macd;
}(sample_base_1.SampleBase));
exports.Macd = Macd;
