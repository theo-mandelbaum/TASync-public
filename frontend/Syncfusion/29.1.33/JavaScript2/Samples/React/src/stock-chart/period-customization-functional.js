"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Dynamic Stock Chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
var series1 = [];
var point1;
var value = 80;
var i;
for (i = 1; i < 1440; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    }
    else {
        value -= Math.random();
    }
    point1 = { x: new Date(2000, 1, 1, 0, i), y: value.toFixed(1) };
    series1.push(point1);
}
var PeroidCustomization = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        (0, theme_color_1.loadStockChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartperiod', primaryXAxis: { valueType: 'DateTime', majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }, primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true } }, load: load.bind(_this), seriesType: [], indicatorType: [], exportType: [], trendlineType: [], title: 'AAPL stock price by minutes', periods: [{ intervalType: 'Minutes', interval: 1, text: '1m' }, { intervalType: 'Minutes', interval: 30, text: '30m' }, { intervalType: 'Hours', interval: 1, text: '1H' }, { intervalType: 'Hours', interval: 12, text: '12H', selected: true }, { text: '1D' }], crosshair: { enable: true, lineType: 'Both' }, chartArea: { border: { width: 0 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: series1, xName: 'x', yName: 'y', type: 'Line' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes data for intraday using stock chart. Period and range selector help us to navigate different of data.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the dynamic stock chart. ",
                React.createElement("code", null, "LineSeries"),
                " is used to represent selected data value."),
            React.createElement("br", null),
            React.createElement("p", null, "Injecting Module"),
            React.createElement("p", null,
                "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                React.createElement("code", null, "DateTime"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(DateTime)"),
                " method. To use the LineSeries, inject the ",
                React.createElement("code", null, "LineSeries"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(LineSeries)"),
                " method."))));
};
exports.default = PeroidCustomization;
