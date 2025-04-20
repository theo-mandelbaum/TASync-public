"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for Combination Serie
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: '2005', y: 1.2, y1: 0.5, y2: 0.7, y3: -0.8, y4: 1.5 },
    { x: '2006', y: 1, y1: 0.5, y2: 1.4, y3: 0, y4: 2.3 },
    { x: '2007', y: 1, y1: 0.5, y2: 1.5, y3: -1, y4: 2 },
    { x: '2008', y: 0.25, y1: 0.35, y2: 0.35, y3: -.35, y4: 0.1 },
    { x: '2009', y: 0.1, y1: 0.9, y2: -2.7, y3: -0.3, y4: -2.7 },
    { x: '2010', y: 1, y1: 0.5, y2: 0.5, y3: -0.5, y4: 1.8 },
    { x: '2011', y: 0.1, y1: 0.25, y2: 0.25, y3: 0, y4: 2 },
    { x: '2012', y: -0.25, y1: -0.5, y2: -0.1, y3: -0.4, y4: 0.4 },
    { x: '2013', y: 0.25, y1: 0.5, y2: -0.3, y3: 0, y4: 0.9 },
    { x: '2014', y: 0.6, y1: 0.6, y2: -0.6, y3: -0.6, y4: 0.4 },
    { x: '2015', y: 0.9, y1: 0.5, y2: 0, y3: -0.3, y4: 1.3 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var CombinationSeries = function () {
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
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { interval: ej2_base_1.Browser.isDevice ? 2 : 1, labelIntersectAction: 'Rotate45', valueType: 'Category', majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 } }, load: load.bind(_this), primaryYAxis: { title: 'Growth (in Billion)', minimum: -3, maximum: 3, interval: 1, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}B' }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, title: 'Annual Growth GDP in France', loaded: onChartLoad.bind(_this), tooltip: { enable: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { visible: true, enableHighlight: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y', name: 'Private Consumption', type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y1', name: 'Government Consumption', type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y2', name: 'Investment', type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y3', name: 'Net Foreign Trade', type: 'StackingColumn' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', yName: 'y4', name: 'GDP', type: 'Line', width: 2, opacity: 0.6, marker: { visible: true, width: 7, height: 7 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a combination of line and stacked column series. Tooltip shows the information about the data point.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the different type of charts. You can render any combination of series in chart except bar. Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "In this example, we have used line and column series. To use column and line feature, we need to inject ",
                React.createElement("code", null, "ColumnSeries"),
                " and ",
                React.createElement("code", null, "LineSeries"),
                " modules into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the Combination series can be found in this ",
                React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/chart-series/#combination-series", "aria-label": "Navigate to the documentation for Multiple Series in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = CombinationSeries;
