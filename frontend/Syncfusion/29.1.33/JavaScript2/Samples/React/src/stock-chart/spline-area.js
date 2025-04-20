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
exports.SplineArea = void 0;
/**
 * Sample for Stock Chart with Spline Area
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var stock_data_1 = require("./stock-data");
var SAMPLE_CSS = "\n\n    #control-container {\n        padding: 0px !important;\n    }\n\n    #material-gradient-chart stop {\n        stop-color: #00bdae;\n    }\n\n    #fabric-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #bootstrap4-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n    #fluent-gradient-chart stop {\n        stop-color: #1AC9E6;\n    }\n    #fluent-dark-gradient-chart stop {\n        stop-color: #1AC9E6;\n    }\n\n    #highcontrast-gradient-chart stop {\n        stop-color: #79ECE4;\n    }\n\n    #tailwind-gradient-chart stop {\n        stop-color: #5A61F6;\n    }\n\n    #tailwind3-gradient-chart stop {\n        stop-color: #2F4074;\n    }\n\n    #bootstrap5-gradient-chart stop {\n        stop-color: #FD7E14;\n    }\n\n    #material-dark-gradient-chart stop {\n        stop-color: #9ECB08;\n    }\n\n    #fabric-dark-gradient-chart stop {\n        stop-color: #4472c4;\n    }\n\n    #bootstrap-dark-gradient-chart stop {\n        stop-color: #a16ee5;\n    }\n\n #tailwind-dark-gradient-chart stop {\n        stop-color: #8B5CF6;\n    }\n\n    #tailwind3-dark-gradient-chart stop {\n        stop-color: #8029F1;\n    }\n\n    #bootstrap5-dark-gradient-chart stop {\n        stop-color: #FD7E14;\n    }\n\n    #material3-gradient-chart stop {\n        stop-color: #6355C7;\n    }\n\n    #material3-dark-gradient-chart stop {\n        stop-color: #4EAAFF;\n    }\n\n    #fluent2-gradient-chart stop {\n        stop-color: #6200EE;\n    }\n\n    #fluent2-highcontrast-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n    #fluent2-dark-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n\n    .chart-gradient stop[offset=\"0\"] {\n        stop-opacity: 0.50;\n    }\n\n    .chart-gradient stop[offset=\"0.3\"] {\n        stop-opacity: 0.40;\n    }\n    .chart-gradient stop[offset=\"0.6\"] {\n        stop-opacity: 0.2;\n    }\n\n    .chart-gradient stop[offset=\"1\"] {\n        stop-opacity: 0;\n    }\n\n";
var themes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'material3', 'material3dark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
var borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6355C7', '#4EAAFF', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
var SplineArea = /** @class */ (function (_super) {
    __extends(SplineArea, _super);
    function SplineArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplineArea.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("svg", { style: { height: 0 } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "material-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap4-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fabric-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "bootstrap5-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "material3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "tailwind3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent2-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent2-highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "fluent2-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "0.3" }),
                        React.createElement("stop", { offset: "0.6" }),
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.StockChartComponent, { tooltip: {
                        enable: true,
                        format: '<b>${point.x}</b> <br>Stock Price : <b>${point.y}</b>',
                        header: '',
                        enableMarker: false
                    }, id: 'stockchartsplinearea', primaryXAxis: { valueType: 'DateTime', majorGridLines: { width: 0 }, crosshairTooltip: { enable: true } }, primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 }, crosshairTooltip: { enable: true } }, load: this.load.bind(this), seriesType: [], indicatorType: [], chartArea: { border: { width: 0 } }, crosshair: { enable: true, lineType: 'Both', snapToData: true, dashArray: '5, 5' }, title: 'Google Stock Price' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.SplineAreaSeries, ej2_react_charts_1.RangeTooltip, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                    React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.googl, xName: 'x', yName: 'high', type: 'SplineArea', opacity: 0.5 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample uses spline area series to visualize stock data. Crosshair display information about the data and period.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure stock chart to visualize the stock data with spline area series. Use series ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/api/stock-chart/stockSeries#types", "aria-label": "Navigate to the type property reference for TypeScript Stock Chart control" }, "type"),
                    " as ",
                    React.createElement("b", null, "SplineArea"),
                    " to render a spline area series."),
                React.createElement("p", null,
                    React.createElement("code", null, "Crosshair"),
                    " is enabled in this example. To see the crosshair in action, hover the chart or tap on it in touch enabled devices.The ",
                    React.createElement("code", null, "snapToData"),
                    " property snaps the crosshair to the nearest data point instead of following the exact mouse position, providing a more precise focus on data points."),
                React.createElement("p", null,
                    "More information about the series type can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/series-types", "aria-label": "Navigate to the documentation for Stock Chart Series Types" }, "documentation section"),
                    "."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The Stock chart component features are segregated into individual feature-wise modules. To use date-time axis, inject the ",
                    React.createElement("code", null, "DateTime"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(DateTime)"),
                    " method. To use the SplineAreaSeries, inject the ",
                    React.createElement("code", null, "SplineAreaSeries"),
                    " module using the ",
                    React.createElement("code", null, "StockChart.Inject(SplineAreaSeries)"),
                    " method."))));
    };
    SplineArea.prototype.load = function (args) {
        var selectedTheme = (0, theme_color_1.loadStockChartTheme)(args);
        args.stockChart.series[0].border = { width: 2, color: borderColor[themes.indexOf(args.stockChart.theme.toLowerCase())] };
        args.stockChart.series[0].fill = 'url(#' + selectedTheme + '-gradient-chart)';
    };
    ;
    return SplineArea;
}(sample_base_1.SampleBase));
exports.SplineArea = SplineArea;
