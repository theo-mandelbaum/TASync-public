"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Stock Chart without Peroid Selector
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_charts_2 = require("@syncfusion/ej2-react-charts");
var stock_data_1 = require("./stock-data");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    #gradient-chart stop {\n        stop-color: #BDEDE9;\n    }\n    #gradient-chart stop[offset=\"0\"] {\n        stop-opacity: 1;\n    }\n    #gradient-chart stop[offset=\"1\"] {\n        stop-opacity: 0.4;\n    }\n#tailwind-dark-gradient-chart stop {\n    stop-color: #8B5CF6;\n}\n\n#tailwind3-dark-gradient-chart stop {\n    stop-color: #8029F1;\n}\n#tailwind-gradient-chart stop {\n    stop-color: #5A61F6;\n}\n\n#tailwind3-gradient-chart stop {\n    stop-color: #2F4074;\n}\n    #fluent-gradient-chart stop {\n        stop-color: #1AC9E6;\n    }\n    #fluent-dark-gradient-chart stop {\n        stop-color: #1AC9E6;\n    }\n    #bootstrap5-gradient-chart stop {\n        stop-color: #6355C7;\n    }\n    #bootstrap5-dark-gradient-chart stop {\n        stop-color: #8F80F4;\n    }\n    #material3-gradient-chart stop {\n        stop-color: #6355C7;\n    }\n    #material3-dark-gradient-chart stop {\n        stop-color: #4EAAFF;\n    }\n    #fluent2-gradient-chart stop {\n        stop-color: #6200EE;\n    }\n    #fluent2-highcontrast-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n    #fluent2-dark-gradient-chart stop {\n        stop-color: #9BB449;\n    }\n    #control-container {\n        padding: 0px !important;\n    }";
var PeriodSelector = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        (0, theme_color_1.loadStockChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.StockChartComponent, { id: 'stockchartperiod', primaryYAxis: { lineStyle: { color: 'transparent' }, majorTickLines: { color: 'transparent', height: 0 } }, primaryXAxis: { majorGridLines: { color: 'transparent' }, crosshairTooltip: { enable: true } }, load: load.bind(_this), chartArea: { border: { width: 0 } }, tooltip: { enable: true }, crosshair: { enable: true }, enablePeriodSelector: false },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTime, ej2_react_charts_1.AreaSeries, ej2_react_charts_1.Crosshair, ej2_react_charts_1.LineSeries, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.CandleSeries, ej2_react_charts_1.HiloOpenCloseSeries, ej2_react_charts_1.HiloSeries, ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.Trendlines, ej2_react_charts_2.EmaIndicator, ej2_react_charts_2.RsiIndicator, ej2_react_charts_2.BollingerBands, ej2_react_charts_2.TmaIndicator, ej2_react_charts_2.MomentumIndicator, ej2_react_charts_2.SmaIndicator, ej2_react_charts_2.AtrIndicator, ej2_react_charts_2.Export, ej2_react_charts_2.RangeTooltip, ej2_react_charts_2.AccumulationDistributionIndicator, ej2_react_charts_2.MacdIndicator, ej2_react_charts_2.StochasticIndicator] }),
                React.createElement(ej2_react_charts_1.StockChartSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.StockChartSeriesDirective, { dataSource: stock_data_1.aapl, type: 'Area', xName: 'x', yName: 'open', opacity: 0.5 }))),
            React.createElement("div", null,
                React.createElement("svg", { style: { height: '0' } },
                    React.createElement("defs", null,
                        React.createElement("linearGradient", { id: "gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "fluent-gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "fluent-dark-gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "bootstrap5-gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "bootstrap5-dark-gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "material3-gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "tailwind3-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "tailwind3-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "material3-dark-gradient-chart", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "fluent2-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "fluent2-highcontrast-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })),
                        React.createElement("linearGradient", { id: "fluent2-dark-gradient-chart", style: { opacity: 0.75 }, className: "chart-gradient", x1: "0", x2: "0", y1: "0", y2: "1" },
                            React.createElement("stop", { offset: "0" }),
                            React.createElement("stop", { offset: "1" })))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "By hiding the period selector in the stock chart, this sample visualizes the AAPL stock price. The tooltip and crosshair display data and period information.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure stock chart to visualize the stock data. The ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/stock-chart/stockChartModel/#enableperiodselector", "aria-label": "Navigate to the enablePeriodSelector property reference for React Stock Chart component" }, "enablePeriodSelector"),
                " property allows to toggle the visibility of period selector."),
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
                " method.  To use the AreaSeries, inject the ",
                React.createElement("code", null, "AreaSeries"),
                " module using the ",
                React.createElement("code", null, "StockChart.Inject(AreaSeries)"),
                " method."),
            React.createElement("p", null,
                "More information about the series type can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/stock-chart/series-types", "aria-label": "Navigate to the documentation for React Stock Chart series types" }, "documentation section"),
                "."))));
};
exports.default = PeriodSelector;
