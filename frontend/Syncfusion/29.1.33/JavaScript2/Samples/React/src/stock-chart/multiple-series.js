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
exports.MultipleSeries = void 0;
/**
 * Sample for Stock Chart with Multiple Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .charts {\n            align :center\n        }";
var MultipleSeries = /** @class */ (function (_super) {
    __extends(MultipleSeries, _super);
    function MultipleSeries() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleSeries.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartmultiseries', primaryXAxis: {
                        valueType: 'DateTime',
                        majorGridLines: { width: 0 },
                        crosshairTooltip: { enable: true }
                    }, primaryYAxis: {
                        interval: 40,
                        lineStyle: { color: 'transparent' },
                        majorTickLines: { color: 'transparent', width: 0 },
                        crosshairTooltip: { enable: true },
                    }, load: this.load.bind(this), indicatorType: [], trendlineType: [], seriesType: ['Line', 'Hilo', 'HiloOpenClose', 'Spline', 'Candle'], crosshair: { enable: true, lineType: 'Both' }, chartArea: { border: { width: 0 } }, title: 'Multiple Series', legendSettings: { visible: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines,
                            ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.StockLegend,
                            ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.goog, xName: 'x', yName: 'close', type: 'Spline', name: 'GOOG' }),
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.googl, xName: 'x', yName: 'close', type: 'Spline', name: 'GOOGL' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the close value of multiple stock. Crosshair show the information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure stock chart to visualize the data for multiple stock. Stock Chart supports 6 major types of series namely ",
                    React.createElement("code", null, "Line"),
                    ", ",
                    React.createElement("code", null, "Spline"),
                    ", ",
                    React.createElement("code", null, "Hilo"),
                    ", ",
                    React.createElement("code", null, "HiloOpenClose"),
                    ", ",
                    React.createElement("code", null, "Hollow Candle"),
                    " and ",
                    React.createElement("code", null, "Candle"),
                    ". By using the series dropdown button in period selector you can navigate between the above listed series types."),
                React.createElement("p", null,
                    "The legend is enabled, and you can use it to toggle the visibility of series in the stock chart. To customize the legend in the stock chart, use the ",
                    React.createElement("code", null, "stockChartLegendSettings"),
                    " property."),
                React.createElement("br", null),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module:")),
                React.createElement("p", null,
                    "The Stock Chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                    React.createElement("code", null, "DateTime"),
                    " module using the",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the LineSeries, inject the ",
                    React.createElement("code", null, "SplineSeries"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(SplineSeries)"),
                    " method. To use the Legend, inject the ",
                    React.createElement("code", null, "StockLegend"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(StockLegend)"),
                    " method."),
                React.createElement("p", null,
                    "More information about the series type can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/series-types", "aria-label": "Navigate to the documentation for React Stock Chart series types" }, "documentation section"),
                    "."))));
    };
    MultipleSeries.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.stockChart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast');
    };
    ;
    return MultipleSeries;
}(sample_base_1.SampleBase));
exports.MultipleSeries = MultipleSeries;
