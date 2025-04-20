"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for ADI Indicator
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var financial_data_1 = require("./financial-data");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
/**
 * AccumulationDistribution sample
 */
var AccumulationDistribution = function () {
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
    var axisLableRender = function (args) {
        if (args.axis.name === 'secondary') {
            var value = Number(args.text) / 1000000000;
            args.text = String(value) + 'B';
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: load.bind(_this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, zoomFactor: 0.2, zoomPosition: 0.6, crosshairTooltip: { enable: true } }, primaryYAxis: { title: 'Price', labelFormat: '${value}', minimum: 50, maximum: 170, plotOffset: 25, interval: 30, rowIndex: 1, opposedPosition: true, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, tooltip: { enable: true, shared: true }, crosshair: { enable: true, lineType: 'Vertical' }, axisLabelRender: axisLableRender.bind(_this), chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', zoomSettings: { enableSelectionZooming: true, mode: 'X', enablePan: true }, title: 'AAPL Stock Price 2012-2017', legendSettings: { visible: false }, loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend, ej2_react_charts_1.StripLine, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.AccumulationDistributionIndicator] }),
                React.createElement(ej2_react_charts_1.RowsDirective, null,
                    React.createElement(ej2_react_charts_1.RowDirective, { height: '40%' }),
                    React.createElement(ej2_react_charts_1.RowDirective, { height: '60%' })),
                React.createElement(ej2_react_charts_1.AxesDirective, null,
                    React.createElement(ej2_react_charts_1.AxisDirective, { rowIndex: 0, name: 'secondary', opposedPosition: true, majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minimum: -7000000000, maximum: 5000000000, interval: 6000000000, title: 'Accumulation Distribution (in Billion)', lineStyle: { width: 0 } },
                        React.createElement(ej2_react_charts_1.StripLinesDirective, null,
                            React.createElement(ej2_react_charts_1.StripLineDirective, { start: -7000000000, end: 6000000000, text: '', color: '#6063ff', visible: true, opacity: 0.1, zIndex: 'Behind' })))),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartValues, width: 2, xName: 'period', yName: 'y', low: 'low', high: 'high', close: 'close', volume: 'volume', open: 'open', name: 'Apple Inc', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', type: 'Candle', animation: { enable: true } })),
                React.createElement(ej2_react_charts_1.IndicatorsDirective, null,
                    React.createElement(ej2_react_charts_1.IndicatorDirective, { type: 'AccumulationDistribution', field: 'Close', seriesName: 'Apple Inc', yAxisName: 'secondary', fill: '#6063ff', period: 3, animation: { enable: true } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a chart with candle series and an accumulation distribution indicator. The trackball shows information about the stock rates and signal values each day.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure an accumulation distribution indicator. This uses volume and price to identify whether stock is accumulated or distributed. It also identifies divergences between the stock price and volume flow."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Accumulation Distribution Indicator, we need to inject ",
                React.createElement("code", null, "AccumulationDistributionIndicator"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the Accumulation Distribution Indicator can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/technical-indicators/#accumulation-distribution", "aria-label": "Navigate to the documentation for Accumulation Distribution in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = AccumulationDistribution;
