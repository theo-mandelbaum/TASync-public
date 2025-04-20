"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.inversedData = void 0;
/**
 * Sample for Inversed Spline series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.inversedData = [
    { country: 'United States', y: 194.55 },
    { country: 'Japan', y: 146.2 },
    { country: 'China', y: 65.1 },
    { country: 'France', y: 84.9 },
    { country: 'India', y: 140.1 },
    { country: 'Canada', y: 160.7 },
    { country: 'Brazil', y: 68.4 },
    { country: 'United Kingdom', y: 100.2 },
    { country: 'Sweden', y: 162 },
    { country: 'Netherlands', y: 132.3 },
    { country: 'Bangladesh', y: 27.7 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var SplineInversed = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, isTransposed: true, primaryXAxis: { valueType: 'Category', minorTickLines: { width: 0 }, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, labelPlacement: 'OnTicks' }, load: load.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '{value}%', title: 'Capitalization Ratio (% of GDP)', interval: 40, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 0 }, labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0 }, tooltip: { enable: true, showNearestTooltip: true, header: '<b>Stock Market Cap</b>', format: '${point.x}: <b>${point.y}</b>', enableHighlight: true }, title: "Stock Market Capitalization as a Percentage of GDP by Country", subTitle: 'Source: wikipedia.org', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.inversedData, xName: "country", yName: "y", width: 2, type: "Spline", marker: { visible: true, width: 7, height: 7, isFilled: true } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample showcases an inversed spline chart depicting stock market capitalization as a percentage of GDP by country, with enhanced interactivity through markers and tooltips.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure inversed spline type charts using the ",
                React.createElement("code", null, "isTransposed"),
                " property. A spline chart uses a curved line to connect points in a data series.",
                React.createElement("code", null, "Markers"),
                " are used to represent individual data points and their values."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject ",
                React.createElement("code", null, "SplineSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the spline series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline", "aria-label": "Navigate to the documentation for Spline Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = SplineInversed;
