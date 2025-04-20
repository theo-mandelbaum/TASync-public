"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: 'JAN', y: 55 },
    { x: 'MAR', y: 42 },
    { x: 'JUNE', y: -12 },
    { x: 'AUG', y: 40 },
    { x: 'OCT', y: -26 },
    { x: 'DEC', y: 45 },
    { x: '2023' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n";
var HorizontalWaterfall = function () {
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
    var legendRender = function (args) {
        if (args.text === 'JAN') {
            args.text = 'Increase';
        }
        else if (args.text === 'OCT') {
            args.text = 'Decrease';
            args.fill = '#e56590';
        }
        else if (args.text === '2023') {
            args.text = 'Total';
            args.fill = '#4E81BC';
        }
        else {
            args.cancel = true;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: load.bind(_this), style: { textAlign: "center" }, primaryXAxis: {
                    valueType: 'Category',
                    edgeLabelPlacement: 'Shift',
                    majorGridLines: { width: 1 },
                    majorTickLines: { width: 0 },
                    isInversed: true
                }, primaryYAxis: {
                    minimum: 0, maximum: 150, interval: 25,
                    labelFormat: '{value}K',
                    edgeLabelPlacement: 'Shift',
                    majorGridLines: { width: 0 },
                    majorTickLines: { width: 0 },
                    lineStyle: { width: 0 }
                }, tooltip: {
                    enable: true,
                    format: '<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>',
                    header: " "
                }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { mode: 'Point', toggleVisibility: false }, title: 'Revenue Variation', loaded: onChartLoad.bind(_this), legendRender: legendRender, isTransposed: true, chartArea: { border: { width: 0 }, margin: { bottom: 12 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.WaterfallSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, border: { color: 'black', width: 0.2 }, xName: 'x', yName: 'y', type: 'Waterfall', name: "Increases", marker: { dataLabel: { visible: true, position: 'Middle' } }, connector: { color: '#5F6A6A', width: 0.8, dashArray: '1,2' }, cornerRadius: { topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 }, columnWidth: 0.5, negativeFillColor: '#e56590', sumIndexes: [6] })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes a company's revenue and profits using the waterfall series chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a horizontal waterfall chart. The waterfall chart illustrates the gradual change in an entity's quantitative value due to increments or decrements."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see them in action, hover over a point or tap on a point on touch-enabled devices."),
            React.createElement("p", { style: { fontWeight: 500 } },
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Waterfall series, we need to inject ",
                React.createElement("code", null, "WaterfallSeries"),
                " module using ",
                React.createElement("code", null, "chart.Inject(WaterfallSeries)"),
                " method."),
            React.createElement("p", null,
                "More information on the waterfall series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/chart/Chart-types/waterfall", "aria-label": "Navigate to the documentation for Waterfall Chart in TypeScript Chart control" }, "documentation section"),
                "."))));
};
exports.default = HorizontalWaterfall;
