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
exports.RSI = void 0;
/**
 * Sample RSI Indicator
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var financial_data_1 = require("./financial-data");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var RSI = /** @class */ (function (_super) {
    __extends(RSI, _super);
    function RSI() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RSI.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: this.load.bind(this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }, primaryYAxis: { title: 'Price(in Million)', labelFormat: '${value}M', plotOffset: 25, minimum: 50, maximum: 170, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, tooltip: { enable: true, shared: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', crosshair: { enable: true, lineType: 'Vertical' }, chartArea: { border: { width: 0 } }, zoomSettings: { enableSelectionZooming: true, mode: 'X', enablePan: true }, title: 'AAPL Stock Price 2012-2017', legendSettings: { visible: false }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Legend, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.RsiIndicator, ej2_react_charts_1.StripLine] }),
                    React.createElement(ej2_react_charts_1.RowsDirective, null,
                        React.createElement(ej2_react_charts_1.RowDirective, { height: '40%' }),
                        React.createElement(ej2_react_charts_1.RowDirective, { height: '60%' })),
                    React.createElement(ej2_react_charts_1.AxesDirective, null,
                        React.createElement(ej2_react_charts_1.AxisDirective, { rowIndex: 0, name: 'secondary', opposedPosition: true, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0, maximum: 120, interval: 60, title: 'RSI', lineStyle: { width: 0 } },
                            React.createElement(ej2_react_charts_1.StripLinesDirective, null,
                                React.createElement(ej2_react_charts_1.StripLineDirective, { start: 0, end: 120, text: '', color: 'black', visible: true, opacity: 0.03, zIndex: 'Behind' })))),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartValues, xName: 'period', yName: 'silver', name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', low: 'low', open: 'open', close: 'close', high: 'high', volume: 'volume', type: 'Candle' })),
                    React.createElement(ej2_react_charts_1.IndicatorsDirective, null,
                        React.createElement(ej2_react_charts_1.IndicatorDirective, { field: 'Close', yAxisName: 'secondary', type: 'Rsi', fill: '#6063ff', seriesName: 'Apple Inc', period: 3, showZones: true, overBought: 70, overSold: 30, upperLine: { color: '#ffb735' }, lowerLine: { color: '#f2ec2f' }, animation: { enable: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a chart with candle series and a relative strength index indicator. The trackball shows information about the day\u2019s stock, signal line, lower line, and upper line values.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure a relative strength index indicator. RSA measures the speed and magnitude of price movements studying the average gains and average losses, and shows how strongly the stock is moving in its current direction."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use RSI Indicator, we need to inject",
                    React.createElement("code", null, "RsiIndicator"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the RSI Indicator can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#relative-strength-index-rsi", "aria-label": "Navigate to the documentation for Relative Strength Index in technical indicators of React Chart component" }, "documentation section"),
                    "."))));
    };
    RSI.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    RSI.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return RSI;
}(sample_base_1.SampleBase));
exports.RSI = RSI;
