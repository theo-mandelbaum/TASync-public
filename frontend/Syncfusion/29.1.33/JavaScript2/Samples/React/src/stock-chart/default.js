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
exports.Default = exports.tooltipRender = void 0;
/**
 * Sample for Stock Chart with Default
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var indicator_data_1 = require("./indicator-data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .charts {\n            align :center\n        }";
var tooltipRender = function (args) {
    if (args.text.split('<br/>')[4]) {
        var target = parseInt(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0]);
        var value = (target / 100000000).toFixed(1) + 'B';
        args.text = args.text.replace(args.text.split('<br/>')[4].split('<b>')[1].split('</b>')[0], value);
    }
};
exports.tooltipRender = tooltipRender;
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartdefault', primaryXAxis: {
                        valueType: 'DateTimeCategory',
                        majorGridLines: { width: 0 }, majorTickLines: { color: 'transparent' },
                        crosshairTooltip: { enable: true }
                    }, primaryYAxis: {
                        labelFormat: 'n0',
                        lineStyle: { width: 0 }, rangePadding: 'None',
                        majorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, shared: true }, tooltipRender: exports.tooltipRender, crosshair: { enable: true }, load: this.load.bind(this), title: 'AAPL Stock Price' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.DateTimeCategory, ej2_react_charts_1.Tooltip, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: indicator_data_1.defaultData, xName: 'x', type: 'Candle', animation: { enable: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This ",
                    React.createElement("a", { target: "_blank", href: "https://www.syncfusion.com/react-components/react-stock-chart", "aria-label": "Default React Stock Chart" }, "React Stock Chart"),
                    " example visualizes the AAPL stock price with candle chart. Tooltip and crosshair show the information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the stock chart. The candle type series chart shows financial data and trends at equal intervals. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/period-selector", "aria-label": "Navigate to the documentation for Period Selector in React Stock Chart component" }, "Period Selector"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/range-selector", "aria-label": "Navigate to the documentation for Range Selector in React Stock Chart component" }, "Range Selector"),
                    " can be used to select a range with specified periods."),
                React.createElement("p", null,
                    "Stock Chart provides support to 10 types of ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/technical-indicators", "aria-label": "Navigate to the documentation for Technical Indicators in React Stock Chart component" }, "Technical Indicators"),
                    " namely ",
                    React.createElement("code", null, "Accumulation Distribution"),
                    ", ",
                    React.createElement("code", null, "ATR"),
                    ", ",
                    React.createElement("code", null, "EMA"),
                    ", ",
                    React.createElement("code", null, "SMA"),
                    ", ",
                    React.createElement("code", null, "TMA"),
                    ", ",
                    React.createElement("code", null, "Momentum"),
                    ", ",
                    React.createElement("code", null, "MACD"),
                    ", ",
                    React.createElement("code", null, "RSI"),
                    ", ",
                    React.createElement("code", null, "Stochastic"),
                    ", ",
                    React.createElement("code", null, "Bollinger Band"),
                    ". By using indicator dropdown box, add and remove the required indicator types."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example. To see the tooltip in action, hover the chart or tap on it in touch enabled devices."),
                React.createElement("br", null),
                React.createElement("p", null, "Injecting Module"),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the LineSeries, inject the",
                    React.createElement("code", null, "CandleSeries"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(CandleSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information about the stock charts can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/getting-started", "aria-label": "Navigate to the documentation for getting started with React Stock Chart component" }, "documentation section"),
                    "."))));
    };
    Default.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
