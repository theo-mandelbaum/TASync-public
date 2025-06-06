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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LineMultiLine = exports.multiColoredLineData = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.multiColoredLineData = [
    { x: new Date(1895, 0, 1), y: 26.69 },
    { x: new Date(1896, 0, 1), y: 31.48 },
    { x: new Date(1897, 0, 1), y: 28.17 },
    { x: new Date(1898, 0, 1), y: 30.67 },
    { x: new Date(1899, 0, 1), y: 29.68 },
    { x: new Date(1900, 0, 1), y: 34.11 },
    { x: new Date(1901, 0, 1), y: 31.62 },
    { x: new Date(1902, 0, 1), y: 30.06 },
    { x: new Date(1903, 0, 1), y: 30.88 },
    { x: new Date(1904, 0, 1), y: 27.55 },
    { x: new Date(1905, 0, 1), y: 27.12 },
    { x: new Date(1906, 0, 1), y: 32.88 },
    { x: new Date(1907, 0, 1), y: 30.7 },
    { x: new Date(1908, 0, 1), y: 32.45 },
    { x: new Date(1909, 0, 1), y: 32.31 },
    { x: new Date(1910, 0, 1), y: 29.61 },
    { x: new Date(1911, 0, 1), y: 32.9 },
    { x: new Date(1912, 0, 1), y: 24.76 },
    { x: new Date(1913, 0, 1), y: 30.47 },
    { x: new Date(1914, 0, 1), y: 34.5 },
    { x: new Date(1915, 0, 1), y: 28.44 },
    { x: new Date(1916, 0, 1), y: 28.22 },
    { x: new Date(1917, 0, 1), y: 28.27 },
    { x: new Date(1918, 0, 1), y: 23.88 },
    { x: new Date(1919, 0, 1), y: 31.82 },
    { x: new Date(1920, 0, 1), y: 29.23 },
    { x: new Date(1921, 0, 1), y: 34.36 },
    { x: new Date(1922, 0, 1), y: 26.8 },
    { x: new Date(1923, 0, 1), y: 34.59 },
    { x: new Date(1924, 0, 1), y: 26.26 },
    { x: new Date(1925, 0, 1), y: 29.1 },
    { x: new Date(1926, 0, 1), y: 30.33 },
    { x: new Date(1927, 0, 1), y: 31.55 },
    { x: new Date(1928, 0, 1), y: 31.98 },
    { x: new Date(1929, 0, 1), y: 26.33 },
    { x: new Date(1930, 0, 1), y: 23.56 },
    { x: new Date(1931, 0, 1), y: 32.99 },
    { x: new Date(1932, 0, 1), y: 31.55 },
    { x: new Date(1933, 0, 1), y: 34.3 },
    { x: new Date(1934, 0, 1), y: 35.08 },
    { x: new Date(1935, 0, 1), y: 31.51 },
    { x: new Date(1936, 0, 1), y: 27.36 },
    { x: new Date(1937, 0, 1), y: 24.84 },
    { x: new Date(1938, 0, 1), y: 32.14 },
    { x: new Date(1939, 0, 1), y: 33.91 },
    { x: new Date(1940, 0, 1), y: 23.83 },
    { x: new Date(1941, 0, 1), y: 32.2 },
    { x: new Date(1942, 0, 1), y: 29.84 },
    { x: new Date(1943, 0, 1), y: 29.41 },
    { x: new Date(1944, 0, 1), y: 32.02 },
    { x: new Date(1945, 0, 1), y: 30.49 },
    { x: new Date(1946, 0, 1), y: 31.39 },
    { x: new Date(1947, 0, 1), y: 31.78 },
    { x: new Date(1948, 0, 1), y: 27.88 },
    { x: new Date(1949, 0, 1), y: 25.92 },
    { x: new Date(1950, 0, 1), y: 30.43 },
    { x: new Date(1951, 0, 1), y: 30.2 },
    { x: new Date(1952, 0, 1), y: 32.0 },
    { x: new Date(1953, 0, 1), y: 36.43 },
    { x: new Date(1954, 0, 1), y: 30.9 },
    { x: new Date(1955, 0, 1), y: 29.35 },
    { x: new Date(1956, 0, 1), y: 31.01 },
    { x: new Date(1957, 0, 1), y: 27.07 },
    { x: new Date(1958, 0, 1), y: 31.6 },
    { x: new Date(1959, 0, 1), y: 29.5 },
    { x: new Date(1960, 0, 1), y: 29.46 },
    { x: new Date(1961, 0, 1), y: 29.71 },
    { x: new Date(1962, 0, 1), y: 26.96 },
    { x: new Date(1963, 0, 1), y: 24.44 },
    { x: new Date(1964, 0, 1), y: 31.53 },
    { x: new Date(1965, 0, 1), y: 31.8 },
    { x: new Date(1966, 0, 1), y: 26.38 },
    { x: new Date(1967, 0, 1), y: 33.1 },
    { x: new Date(1968, 0, 1), y: 28.94 },
    { x: new Date(1969, 0, 1), y: 29.37 },
    { x: new Date(1970, 0, 1), y: 27.16 },
    { x: new Date(1971, 0, 1), y: 29.41 },
    { x: new Date(1972, 0, 1), y: 29.93 },
    { x: new Date(1973, 0, 1), y: 29.59 },
    { x: new Date(1974, 0, 1), y: 31.01 },
    { x: new Date(1975, 0, 1), y: 32.34 },
    { x: new Date(1976, 0, 1), y: 29.93 },
    { x: new Date(1977, 0, 1), y: 23.09 },
    { x: new Date(1978, 0, 1), y: 25.86 },
    { x: new Date(1979, 0, 1), y: 21.92 },
    { x: new Date(1980, 0, 1), y: 31.12 },
    { x: new Date(1981, 0, 1), y: 32.41 },
    { x: new Date(1982, 0, 1), y: 26.22 },
    { x: new Date(1983, 0, 1), y: 33.12 },
    { x: new Date(1984, 0, 1), y: 28.83 },
    { x: new Date(1985, 0, 1), y: 26.31 },
    { x: new Date(1986, 0, 1), y: 34.68 },
    { x: new Date(1987, 0, 1), y: 31.44 },
    { x: new Date(1988, 0, 1), y: 27.79 },
    { x: new Date(1989, 0, 1), y: 34.09 },
    { x: new Date(1990, 0, 1), y: 36.48 },
    { x: new Date(1991, 0, 1), y: 29.5 },
    { x: new Date(1992, 0, 1), y: 33.62 },
    { x: new Date(1993, 0, 1), y: 30.47 },
    { x: new Date(1994, 0, 1), y: 29.34 },
    { x: new Date(1995, 0, 1), y: 33.08 },
    { x: new Date(1996, 0, 1), y: 29.7 },
    { x: new Date(1997, 0, 1), y: 29.97 },
    { x: new Date(1998, 0, 1), y: 34.99 },
    { x: new Date(1999, 0, 1), y: 33.78 },
    { x: new Date(2000, 0, 1), y: 33.57 },
    { x: new Date(2001, 0, 1), y: 31.37 },
    { x: new Date(2002, 0, 1), y: 34.48 },
    { x: new Date(2003, 0, 1), y: 32.81 },
    { x: new Date(2004, 0, 1), y: 30.36 },
    { x: new Date(2005, 0, 1), y: 33.39 },
    { x: new Date(2006, 0, 1), y: 38.93 },
    { x: new Date(2007, 0, 1), y: 31.35 },
    { x: new Date(2008, 0, 1), y: 30.27 },
    { x: new Date(2009, 0, 1), y: 31.05 },
    { x: new Date(2010, 0, 1), y: 30.67 },
    { x: new Date(2011, 0, 1), y: 29.71 },
    { x: new Date(2012, 0, 1), y: 36.12 },
    { x: new Date(2013, 0, 1), y: 32.25 },
    { x: new Date(2014, 0, 1), y: 30.56 },
    { x: new Date(2015, 0, 1), y: 33.08 },
    { x: new Date(2016, 0, 1), y: 32.22 },
    { x: new Date(2017, 0, 1), y: 33.57 },
    { x: new Date(2018, 0, 1), y: 32.16 },
    { x: new Date(2019, 0, 1), y: 32.56 },
    { x: new Date(2020, 0, 1), y: 35.53 },
    { x: new Date(2021, 0, 1), y: 34.59 },
    { x: new Date(2022, 0, 1), y: 31.17 },
    { x: new Date(2023, 0, 1), y: 35.08 },
    { x: new Date(2024, 0, 1), y: 31.89 },
    { x: new Date(2025, 0, 1), y: 29.23 }
];
var colors = ['red', 'green', '#ff0097', 'crimson', 'blue', 'darkorange', 'deepskyblue', 'mediumvioletred', 'violet', 'peru', 'gray', 'deeppink', 'navy'];
exports.multiColoredLineData = exports.multiColoredLineData.map(function (value, index) { return (__assign(__assign({}, value), { color: colors[Math.floor(index / 10)] })); });
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
/**
 * Area empty sample
 */
var LineMultiLine = /** @class */ (function (_super) {
    __extends(LineMultiLine, _super);
    function LineMultiLine() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LineMultiLine.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', labelFormat: 'y', intervalType: 'Years', minimum: new Date(1895, 0, 1), maximum: new Date(2025, 0, 1), edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}°F', minimum: 20, maximum: 40, interval: 4, title: 'Mean Temperature (°F)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, tooltip: { enable: true, showNearestTooltip: true, enableAnimation: false, header: '<b>Year: ${point.x}</b>', format: 'Avg Temp : <b>${point.y}</b>', enableHighlight: true }, legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "U.S. Historical Average Temperature (1895\u20132025)", subTitle: 'Source: ncei.noaa.gov', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.MultiColoredLineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.multiColoredLineData, width: 1.5, xName: "x", yName: "y", type: "MultiColoredLine", pointColorMapping: "color" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates a multi-colored line chart showing the average January temperature in the United States from 1895 to 2025. Each data point is represented with a unique color, and hovering over the points reveals detailed information through tooltips.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure each point in line type series. Multi colored line charts are used to represent time-dependent data to show the trends at equal intervals with their individual colors by using ",
                    React.createElement("code", null, "pointColorMapping"),
                    "."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use multi colored line series, we need to inject ",
                    React.createElement("code", null, "MultiColoredLineSeries"),
                    " module using ",
                    React.createElement("code", null, "Chart.Inject(MultiColoredLineSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the multi colored line series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/line#multicolored-line", "aria-label": "Navigate to the documentation for Multi Colored Line Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    LineMultiLine.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    LineMultiLine.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    return LineMultiLine;
}(sample_base_1.SampleBase));
exports.LineMultiLine = LineMultiLine;
