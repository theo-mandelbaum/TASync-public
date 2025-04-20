"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Line Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var chartData = [
    { x: new Date(2010, 0, 1), y: 5.00, y1: 4.54, y2: 3.62, y3: 2.92, y4: 1.87 },
    { x: new Date(2011, 0, 1), y: 5.69, y1: 4.50, y2: 3.23, y3: 3.00, y4: 1.87 },
    { x: new Date(2012, 0, 1), y: 4.99, y1: 4.60, y2: 4.19, y3: 2.97, y4: 1.85 },
    { x: new Date(2013, 0, 1), y: 5.65, y1: 5.04, y2: 2.99, y3: 2.97, y4: 1.84 },
    { x: new Date(2014, 0, 1), y: 5.43, y1: 4.39, y2: 3.07, y3: 2.00, y4: 1.84 },
    { x: new Date(2015, 0, 1), y: 5.51, y1: 3.86, y2: 3.19, y3: 1.88, y4: 1.65 },
    { x: new Date(2016, 0, 1), y: 6.12, y1: 4.12, y2: 3.28, y3: 1.81, y4: 1.69 },
    { x: new Date(2017, 0, 1), y: 6.68, y1: 6.35, y2: 4.12, y3: 1.79, y4: 1.38 },
    { x: new Date(2018, 0, 1), y: 5.52, y1: 3.90, y2: 3.39, y3: 1.75, y4: 1.72 },
    { x: new Date(2019, 0, 1), y: 5.59, y1: 4.01, y2: 3.46, y3: 1.75, y4: 1.31 },
    { x: new Date(2020, 0, 1), y: 5.46, y1: 4.64, y2: 3.52, y3: 1.78, y4: 1.75 },
    { x: new Date(2021, 0, 1), y: 6.08, y1: 4.12, y2: 3.58, y3: 1.74, y4: 1.29 },
    { x: new Date(2022, 0, 1), y: 6.23, y1: 3.64, y2: 3.40, y3: 1.73, y4: 1.64 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
var CustomAnimation = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 }, labelFormat: 'y' }, load: load.bind(_this), primaryYAxis: { title: 'Yield (In Tons per Hectare)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, maximum: 8, interval: 2, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, tooltip: {
                    enable: true,
                    header: '<b>Almond Yield - ${point.x}</b>',
                    format: '${series.name}: <b>${point.y}</b>',
                    enableHighlight: true,
                    showNearestTooltip: true
                }, legendSettings: { visible: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Almond Yield Comparison Across Countries (2010\u20132022)", loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight, ej2_react_charts_1.ChartAnnotation] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: "x", yName: "y1", name: "United States", width: 3, animation: { enable: true, duration: 1500 }, type: "Spline" }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: "x", yName: "y2", name: "China", width: 3, animation: { enable: true, delay: 2300, duration: 1500 }, type: "Spline" }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: "x", yName: "y3", name: "Afghanistan", width: 3, animation: { enable: true, delay: 3400, duration: 1500 }, type: "Spline" }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: "x", yName: "y4", name: "Yemen", width: 3, animation: { enable: true, delay: 4800, duration: 1500 }, type: "Spline" }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: "x", yName: "y", name: "Australia", width: 3, animation: { enable: true, delay: 6200, duration: 1500 }, type: "Spline" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the almond yield per hectare data for different countries using a spline series in the chart. The data points are enhanced with tooltip and the animation delay is configured to provide a smooth, staggered effect.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a spline chart with multiple series representing almond yield across different countries over time. Spline charts are ideal for visualizing smooth trends in data over equal intervals, particularly time-dependent data. The ",
                React.createElement("code", null, "width"),
                " and ",
                React.createElement("code", null, "animation"),
                " properties are used to customize the appearance and behavior of the spline. The staggered animations enhance the visual experience by introducing each spline in sequence."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", { style: { fontWeight: 500 } },
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject ",
                React.createElement("code", null, "SplineSeries"),
                " module using ",
                React.createElement("code", null, "Chart.Inject(SplineSeries)"),
                " method."),
            React.createElement("p", null,
                "More information on the spline series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/chart/Chart-types/spline", "aria-label": "Navigate to the documentation for Spline Chart in TypeScript Chart control" }, "documentation section"),
                "."))));
};
exports.default = CustomAnimation;
