"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.pointColors = exports.zoomPosition = exports.zoomFactor = void 0;
/**
 * Sample for Candle Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.pointColors = [];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Candle sample
 */
var Candle = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        args.chart.primaryXAxis.zoomFactor = exports.zoomFactor;
        args.chart.primaryXAxis.zoomPosition = exports.zoomPosition;
        (0, theme_color_1.loadChartTheme)(args);
    };
    var axisLabelRender = function (args) {
        args.text = args.text.replace("0000000M", "M");
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: load.bind(_this), primaryXAxis: { valueType: 'DateTime', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 } }, primaryYAxis: { title: 'Volume', labelFormat: '{value}M', opposedPosition: true, majorGridLines: { width: 1 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, legendSettings: { visible: false }, tooltip: { enable: true, shared: true, header: "", format: "<b>Apple Inc.(AAPL)</b> <br> High : <b>${point.high}</b> <br> Low : <b>${point.low}</b> <br> Open : <b>${point.open}</b> <br> Close : <b>${point.close}</b> <br> Volume : <b>${point.volume}</b>" }, width: ej2_base_1.Browser.isDevice ? '100%' : '80%', axisLabelRender: axisLabelRender.bind(_this), chartArea: { border: { width: 0 } }, title: "AAPL Historical", loaded: onChartLoad.bind(_this) },
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
                "Chart component features are segregated into individual feature-wise modules. To use Candle series, we need to inject ",
                React.createElement("code", null, "CandleSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the Candle series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle", "aria-label": "Navigate to the documentation for Candle in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Candle;
