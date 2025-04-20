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
exports.Candle = exports.pointColors = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Candle Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.pointColors = [];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Candle sample
 */
var Candle = /** @class */ (function (_super) {
    __extends(Candle, _super);
    function Candle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Candle.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row" },
                    React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: this.load.bind(this), primaryXAxis: { valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 } }, primaryYAxis: { title: 'Volume', labelFormat: '{value}M', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, legendSettings: { visible: false }, tooltip: { enable: true, shared: true, header: "", format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b> <br> Volume : <b>${point.volume}</b>" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', axisLabelRender: this.axisLabelRender.bind(this), chartArea: { border: { width: 0 } }, title: "AAPL Historical", loaded: this.onChartLoad.bind(this) },
                        React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.StripLine, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Legend, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair] }),
                        React.createElement(ej2_react_charts_1.RowsDirective, null,
                            React.createElement(ej2_react_charts_1.RowDirective, { height: '30%' }),
                            React.createElement(ej2_react_charts_1.RowDirective, { height: '70%' })),
                        React.createElement(ej2_react_charts_1.AxesDirective, null,
                            React.createElement(ej2_react_charts_1.AxisDirective, { name: 'secondary', rangePadding: "None", maximum: 150, minimum: 55, opposedPosition: true, rowIndex: 1, majorGridLines: { width: 1 }, labelFormat: 'n0', title: 'Price', plotOffset: 30, lineStyle: { width: 0 }, majorTickLines: { width: 0 } })),
                        React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'Column', dataSource: financial_data_1.chartValues, animation: { enable: true }, xName: 'period', yName: 'volume', enableTooltip: false, name: 'Volume' }),
                            React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'Candle', yAxisName: 'secondary', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', dataSource: financial_data_1.chartValues, animation: { enable: true }, xName: 'period', low: 'low', high: 'high', open: 'open', close: 'close', name: 'Apple Inc', volume: 'volume' }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the AAPL stock price with a default candlestick series. The tooltip and crosshair show information about the stock price.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the candlestick series. This chart shows financial data and trends at equal intervals. It can often be combined with line and column charts to show the closing value of the stock and volume of the data."),
                React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Candle series, we need to inject",
                    React.createElement("code", null, "CandleSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the Candle series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle", "aria-label": "Navigate to the documentation for Candle in React Chart component" }, "documentation section"),
                    "."))));
    };
    Candle.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Candle.prototype.load = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    Candle.prototype.axisLabelRender = function (args) {
        args.text = args.text.replace("0000000M", "M");
    };
    return Candle;
}(sample_base_1.SampleBase));
exports.Candle = Candle;
