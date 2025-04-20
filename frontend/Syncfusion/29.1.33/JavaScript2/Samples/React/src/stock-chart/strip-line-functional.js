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
var StripLines = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        (0, theme_color_1.loadStockChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartstripline', primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 } }, primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, stripLines: [{ start: 340, end: 380, color: '#3CB371', opacity: 0.1 }] }, load: load.bind(_this), indicatorType: [], seriesType: [], trendlineType: ['Linear', 'Exponential', 'Polynomial', 'Logarithmic', 'MovingAverage'], title: 'AAPL Historical', chartArea: { border: { width: 0 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.StripLine, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.amzn, xName: 'x', yName: 'close', type: 'Line' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes stock chart with plot line on y axis.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to highlight a particular range in stock chart. Period and range selector help us to navigate different of data. ",
                React.createElement("code", null, "LineSeries"),
                " is used to represent selected data value."),
            React.createElement("p", null,
                "Stock Chart provides support to 6 types of ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/trend-lines", "aria-label": "Navigate to the documentation for Trendlines in React Stock Chart component" }, "trendlines"),
                " namely ",
                React.createElement("code", null, "Linear"),
                ", ",
                React.createElement("code", null, "Exponential"),
                ", ",
                React.createElement("code", null, "Logarithmic"),
                ", ",
                React.createElement("code", null, "Polynomial"),
                ", ",
                React.createElement("code", null, "Power"),
                ", ",
                React.createElement("code", null, "Moving Average"),
                ". By using trendline dropdown button, the required trendline type can be added or removed."),
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
exports.default = StripLines;
