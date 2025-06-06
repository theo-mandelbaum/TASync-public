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
exports.StockEvents = void 0;
/**
 * Sample for Dynamic Stock Chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var stock_data_1 = require("./stock-data");
var SAMPLE_CSS = "\n.control-fluid {\n    padding: 0px !important;\n}\n    .charts {\n        align :center\n    }";
var StockEvents = /** @class */ (function (_super) {
    __extends(StockEvents, _super);
    function StockEvents() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StockEvents.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartevents', primaryXAxis: {
                        valueType: 'DateTime', majorGridLines: { color: 'transparent' },
                        crosshairTooltip: { enable: true }
                    }, primaryYAxis: {
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent' },
                        crosshairTooltip: { enable: true }
                    }, load: this.load.bind(this), indicatorType: [], seriesType: [], trendlineType: [], title: 'AAPL Stock Price', tooltip: { enable: true }, crosshair: { enable: true, lineType: 'Both' }, chartArea: { border: { width: 0 } }, stockEvents: [
                        { date: new Date(2012, 3, 1), text: 'Q2', description: '2012 Quarter2 starts', type: 'Flag' },
                        { date: new Date(2012, 3, 20), text: 'Open', description: 'Markets opened', textStyle: { color: 'white' },
                            background: '#f48a21', border: { color: '#f48a21' } },
                        { date: new Date(2012, 6, 1), text: 'Q3', description: '2013 Quarter3 starts', type: 'Flag',
                            textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                        { date: new Date(2012, 9, 1), text: 'Q4', description: '2013 Quarter4 starts', type: 'Flag',
                            textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                        { date: new Date(2012, 7, 30), text: 'G', description: 'Google stocks bought',
                            textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } },
                        { date: new Date(2012, 10, 1), text: 'Y', description: 'Yahoo stocks sold', type: 'Square',
                            textStyle: { color: 'white' }, background: '#841391', border: { color: '#841391' } },
                        { date: new Date(2012, 12, 0), text: 'Y2', description: 'Year 2013', type: 'Pin', showOnSeries: false,
                            textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' } },
                        { date: new Date(2013, 3, 1), text: 'Q2', description: '2013 Quarter2 starts', type: 'Flag',
                            textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                        { date: new Date(2013, 3, 20), text: 'Q2', description: 'Surge in Stocks', type: 'ArrowUp',
                            textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' } },
                        { date: new Date(2013, 6, 1), text: 'Q3', description: '2013 Quarter3 starts', type: 'Flag',
                            textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                        { date: new Date(2013, 9, 1), text: 'Q4', description: '2013 Quarter4 starts', type: 'Flag',
                            textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                        { date: new Date(2013, 12, 0), text: 'Y3', description: 'Year 2014', type: 'Pin', showOnSeries: false,
                            textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' } },
                        { date: new Date(2014, 3, 1), text: 'Q2', description: '2014 Quarter2 starts', type: 'ArrowDown',
                            textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' } },
                        { date: new Date(2014, 6, 1), text: 'Q3', description: '2014 Quarter3 starts',
                            textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } },
                        { date: new Date(2014, 9, 1), text: 'Q4', description: '2014 Quarter4 starts', type: 'Flag',
                            textStyle: { color: 'white' }, background: '#6c6d6d', border: { color: '#6c6d6d' } },
                        { date: new Date(2014, 12, 0), text: 'Y4', description: 'Year 2015', type: 'Pin', showOnSeries: false,
                            textStyle: { color: 'white' }, background: '#6322e0', border: { color: '#6322e0' } },
                        { date: new Date(2014, 2, 2), text: 'End', description: 'Markets closed', type: 'ArrowDown',
                            textStyle: { color: 'white' }, background: '#3ab0f9', border: { color: '#3ab0f9' } },
                        { date: new Date('2015-01-07'), text: 'A', description: 'This is event description',
                            textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } },
                        { date: new Date(2015, 1, 2), text: 'Q1', description: 'Add longer text',
                            textStyle: { color: 'white' }, background: '#dd3c9f', border: { color: '#dd3c9f' }, type: 'Text' },
                        { date: new Date(2015, 2, 12), text: 'Close', description: 'Markets closed',
                            textStyle: { color: 'white' }, background: '#f48a21', border: { color: '#f48a21' } }
                    ] },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.StripLine, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.RangeTooltip,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.aapl, xName: 'x', yName: 'high', type: 'Spline', name: 'google', close: 'high' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This ",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/react-components/react-stock-chart", "aria-label": "React Stock Chart with Stock Events" }, "React Stock Chart"),
                    " example visualizes the AAPL stock price with spline chart. Crosshair show the information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a stock chart with ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/vue/documentation/api/stock-chart/stockEventsSettings/", "aria-label": "Navigate to the class reference for React Stock Chart StockEvents" }, "StockEvents"),
                    " to mark specific events such as market open and close, highest or lowest price reached, year/quarter start and end on a chart for a specific date."),
                React.createElement("p", null,
                    React.createElement("code", null, "Crosshair"),
                    " is enabled in this example. To see the crosshair in action, hover the chart or tap on touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the SplineSeries, inject the",
                    React.createElement("code", null, "SplineSeries"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(SplineSeries)"),
                    " method."))));
    };
    StockEvents.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    ;
    return StockEvents;
}(sample_base_1.SampleBase));
exports.StockEvents = StockEvents;
