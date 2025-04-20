"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for the StackingBar Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: '2020', y: 466 },
    { x: '2021', y: 656 },
    { x: '2022', y: 763 },
    { x: '2023', y: 886 }
];
exports.data2 = [
    { x: '2020', y: 261 },
    { x: '2021', y: 327 },
    { x: '2022', y: 427 },
    { x: '2023', y: 584 }
];
exports.data3 = [
    { x: '2020', y: 1355 },
    { x: '2021', y: 1340 },
    { x: '2022', y: 1352 },
    { x: '2023', y: 1286 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StackedBar = function () {
    var chartInstance = (0, react_1.useRef)(null);
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
    var onLegendClick = function (args) {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }
        if (args.series.index === 2) {
            if (!args.series.visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, style: { textAlign: "center" }, legendSettings: { enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, primaryYAxis: { maximum: 3500, labelFormat: '{value}TWh', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, load: load.bind(_this), title: 'Annual Renewable Energy Generation in China (2020\u20132023) by Source', subTitle: 'Source: wikipedia.org', loaded: onChartLoad.bind(_this), tooltip: { enable: true, enableHighlight: true, header: '<b>Renewable Energy Generation</b>', format: '${series.name} : <b>${point.y}</b>' }, legendClick: onLegendClick.bind(_this), stackLabels: { visible: true, format: '{value}TWh' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingBarSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', border: { width: 1, color: "white" }, columnWidth: 0.6, name: 'Wind', type: 'StackingBar', marker: { dataLabel: { visible: true } }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', border: { width: 1, color: "white" }, columnWidth: 0.6, name: 'Solar', type: 'StackingBar', marker: { dataLabel: { visible: true } }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', border: { width: 1, color: "white" }, columnWidth: 0.6, name: 'Hydro', type: 'StackingBar', marker: { dataLabel: { visible: true } }, cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates a React stacked bar chart that illustrates renewable energy generation in China from 2020 to 2023, segmented by wind, solar, and hydro sources. The legend in the sample shows more information about the series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the stacked bar chart. The stacked bar chart stacks points in the series horizontally. You can also use the ",
                React.createElement("code", null, "stackingGroup"),
                " property to group stacked collections based on category."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use stacking bar series, we need to inject ",
                React.createElement("code", null, "StackingBarSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the stacked bar series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-bar", "aria-label": "Navigate to the documentation for Stacked Bar Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = StackedBar;
