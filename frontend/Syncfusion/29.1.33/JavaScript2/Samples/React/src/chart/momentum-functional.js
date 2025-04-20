"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Momentum Indicator
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Momentum = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: load.bind(_this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }, primaryYAxis: { title: 'Price', labelFormat: '${value}', plotOffset: 25, minimum: 50, maximum: 170, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, tooltip: { enable: true, shared: true }, crosshair: { enable: true, lineType: 'Vertical' }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', zoomSettings: { enablePinchZooming: true, enableSelectionZooming: true, mode: 'X', enablePan: true }, title: 'AAPL Stock Price 2012-2017', legendSettings: { visible: false }, loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Legend, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.MomentumIndicator, ej2_react_charts_1.StripLine] }),
                React.createElement(ej2_react_charts_1.RowsDirective, null,
                    React.createElement(ej2_react_charts_1.RowDirective, { height: '40%' }),
                    React.createElement(ej2_react_charts_1.RowDirective, { height: '60%' })),
                React.createElement(ej2_react_charts_1.AxesDirective, null,
                    React.createElement(ej2_react_charts_1.AxisDirective, { rowIndex: 0, name: 'secondary', opposedPosition: true, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minimum: 80, maximum: 120, interval: 20, title: 'Momentum', lineStyle: { width: 0 } },
                        React.createElement(ej2_react_charts_1.StripLinesDirective, null,
                            React.createElement(ej2_react_charts_1.StripLineDirective, { start: 80, end: 120, text: '', color: 'black', visible: true, opacity: 0.03, zIndex: 'Behind' })))),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartValues, width: 2, xName: 'period', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open', name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', type: 'Candle', animation: { enable: true } })),
                React.createElement(ej2_react_charts_1.IndicatorsDirective, null,
                    React.createElement(ej2_react_charts_1.IndicatorDirective, { type: 'Momentum', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff', period: 3, animation: { enable: true }, upperLine: { color: '#ffb735' } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a chart with candle series and a momentum indicator. The trackball shows information about each day\u2019s stock, signal line, and upper line values.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a momentum indicator. This indicator shows the speed at which the price of the stock is changing. It also identifies when the price is moving upwards or downwards."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Momentum Indicator, we need to inject ",
                React.createElement("code", null, "MomentumIndicator"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the Momentum Indicator can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#momentum", "aria-label": "Navigate to the documentation for Momentum in Technical Indicators of React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Momentum;
