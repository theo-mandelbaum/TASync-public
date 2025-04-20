"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Stock Chart with Multiple Panes
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var indicator_data_1 = require("./indicator-data");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
var MultiPane = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var axisLabelRender = function (args) {
        var text = parseInt(args.text);
        if (args.axis.name === "primaryYAxis") {
            args.text = text / 100000000 + 'B';
        }
    };
    var load = function (args) {
        (0, theme_color_1.loadStockChartTheme)(args);
    };
    var tooltipRender = function (args) {
        if (args.text.split('<br/>')[4]) {
            var target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
            var value = (target / 100000000).toFixed(1) + 'B';
            args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartpane', primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 } }, primaryXAxis: { crosshairTooltip: { enable: true }, majorGridLines: { width: 0 }, valueType: 'DateTime' }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, format: 'High : <b>${point.high}</b><br/>Low :<b>${point.low}</b><br/>Open : <b>${point.open}</b><br/>Close : <b>${point.close}</b><br/>Volume : <b>${point.volume}</b>' }, tooltipRender: tooltipRender, axisLabelRender: axisLabelRender.bind(_this), crosshair: { enable: true }, load: load.bind(_this), title: 'AAPL Historical', legendSettings: { visible: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Tooltip, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator, ej2_react_charts_1.StockLegend] }),
                React.createElement(ej2_react_charts_1.StockChartRowsDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartRowDirective, { height: '30%' }),
                    React.createElement(ej2_react_charts_1.StockChartRowDirective, { height: '70%' })),
                React.createElement(ej2_react_charts_1.StockChartAxesDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartAxisDirective, { name: 'yAxis1', rowIndex: 1, labelPosition: 'Inside', tickPosition: 'Inside', opposedPosition: true, lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent' } })),
                React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: indicator_data_1.chartData, xName: 'x', yName: 'close', type: 'Candle', yAxisName: 'yAxis1', name: "Apple Inc" }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: indicator_data_1.chartData, xName: 'x', yName: 'volume', type: 'Column', enableTooltip: false, name: "Volume" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This ",
                React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/react-components/react-stock-chart", "aria-label": "React Stock Chart with Candlestick and Volume" }, "React Stock Chart"),
                " example visualizes the AAPL stock price with Candle chart. Tooltip and crosshair show the information about the data and period.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a stock chart for AAPL data, as well as how to use column charts to display data volume. The ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/period-selector", "aria-label": "Navigate to the documentation for Period Selector in React Stock Chart component" }, "Period Selector"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/range-selector", "aria-label": "Navigate to the documentation for Range Selector in React Stock Chart component" }, "Range Selector"),
                " can be used to select a range with specified periods."),
            React.createElement("p", null,
                "The legend is enabled, and you can use it to toggle the visibility of series in the stock chart. To customize the legend in the stock chart, use the ",
                React.createElement("code", null, "stockChartLegendSettings"),
                " property."),
            React.createElement("br", null),
            React.createElement("p", null, "Injecting Module"),
            React.createElement("p", null,
                "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                React.createElement("code", null, "DateTime"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(DateTime)"),
                " method.  To use the CandleSeries, inject the ",
                React.createElement("code", null, "CandleSeries"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(CandleSeries)"),
                " method."))));
};
exports.default = MultiPane;
