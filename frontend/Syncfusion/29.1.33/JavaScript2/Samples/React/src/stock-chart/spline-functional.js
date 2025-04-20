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
var stock_data_1 = require("./stock-data");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
var Spline = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        (0, theme_color_1.loadStockChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartspline', primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } }, primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 } }, load: load.bind(_this), indicatorType: [], seriesType: [], chartArea: { border: { width: 0 } }, tooltip: { enable: true }, crosshair: { enable: true }, title: 'AAPL Stock Price' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.aapl, xName: 'x', yName: 'high', type: 'Spline' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample uses spline series to visualize stock data. The tooltip and crosshair display information about the data and period.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure stock chart to visualize the stock data with spline series. Use series ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockSeries/#type", "aria-label": "Navigate to the type property reference for React Stock Chart component" }, "type"),
                " as ",
                React.createElement("b", null, "Spline"),
                " to render a spline series."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices."),
            React.createElement("br", null),
            React.createElement("p", null, "Injecting Module"),
            React.createElement("p", null,
                "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                React.createElement("code", null, "DateTime"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(DateTime)"),
                " method. To use the SplineSeries, inject the ",
                React.createElement("code", null, "SplineSeries"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(SplineSeries)"),
                " method."),
            React.createElement("p", null,
                "More information about the series type can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/series-types", "aria-label": "Navigate to the documentation for React Stock Chart series types" }, "documentation section"),
                "."))));
};
exports.default = Spline;
