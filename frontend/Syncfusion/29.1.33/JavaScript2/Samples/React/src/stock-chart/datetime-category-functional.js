"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Stock Chart with Default
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var stock_data_1 = require("./stock-data");
var theme_color_1 = require("./theme-color");
function DatetimeCategoryAxis() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartdefault', primaryXAxis: {
                    majorGridLines: { width: 0 },
                    crosshairTooltip: { enable: true },
                    valueType: 'DateTimeCategory'
                }, primaryYAxis: {
                    lineStyle: { width: 0 },
                    majorTickLines: { width: 0 }
                }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, header: 'AAPL Stock Price', format: '${point.x}: <b>${point.y}</b>' }, crosshair: { enable: true }, load: load.bind(this), title: 'AAPL Stock Price' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTimeCategory, ej2_react_charts_1.AreaSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries,
                        ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.MomentumIndicator,
                        ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.StochasticIndicator, ej2_react_charts_1.Trendlines, ej2_react_charts_2.TmaIndicator, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_2.Export] }),
                React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.datetimeCategoryData, type: 'Spline' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the AAPL stock price using the ",
                React.createElement("code", null, "DateTimeCategory"),
                " axis type in the stock chart to display the minimum number of labels without any overlap on various business days.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a stock chart to visualize stock data using the ",
                React.createElement("code", null, "DateTimeCategory"),
                " axis type. Use series ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/series-types", "aria-label": "Navigate to the type property reference for React Stock Chart series" }, "type"),
                " as ",
                React.createElement("code", null, "Spline"),
                " to render a spline series."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices."),
            React.createElement("p", null,
                "More information about axis types can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/axis-types", "aria-label": "Navigate to the documentation for axis types in React Stock Chart component" }, "documentation section"),
                "."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "The stock chart component features are segregated into individual feature-wise modules. To use datetime category axis, inject the ",
                React.createElement("code", null, "DateTimeCategory"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(DateTimeCategory)"),
                " method. To use the SplineSeries, inject the ",
                React.createElement("code", null, "SplineSeries"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(SplineSeries)"),
                " method."))));
    function tooltipRender(args) {
        if (args.text.split('<br/>')[4]) {
            var target = parseFloat(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
            var value = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    }
    function load(args) {
        (0, theme_color_1.loadStockChartTheme)(args);
    }
}
exports.default = DatetimeCategoryAxis;
