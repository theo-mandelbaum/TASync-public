"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for 100 percent Stacked Area series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: new Date(2000, 0, 1), y: 0.61, y1: 0.03, y2: 0.48, y3: 0.23 },
    { x: new Date(2001, 0, 1), y: 0.81, y1: 0.05, y2: 0.53, y3: 0.17 },
    { x: new Date(2002, 0, 1), y: 0.91, y1: 0.06, y2: 0.57, y3: 0.17 },
    { x: new Date(2003, 0, 1), y: 1, y1: 0.09, y2: 0.61, y3: 0.2 },
    { x: new Date(2004, 0, 1), y: 1.19, y1: 0.14, y2: 0.63, y3: 0.23 },
    { x: new Date(2005, 0, 1), y: 1.47, y1: 0.2, y2: 0.64, y3: 0.36 },
    { x: new Date(2006, 0, 1), y: 1.74, y1: 0.29, y2: 0.66, y3: 0.43 },
    { x: new Date(2007, 0, 1), y: 1.98, y1: 0.46, y2: 0.76, y3: 0.52 },
    { x: new Date(2008, 0, 1), y: 1.99, y1: 0.64, y2: 0.77, y3: 0.72 },
    { x: new Date(2009, 0, 1), y: 1.7, y1: 0.75, y2: 0.55, y3: 1.29 },
    { x: new Date(2010, 0, 1), y: 1.48, y1: 1.06, y2: 0.54, y3: 1.38 },
    { x: new Date(2011, 0, 1), y: 1.38, y1: 1.25, y2: 0.57, y3: 1.82 },
    { x: new Date(2012, 0, 1), y: 1.66, y1: 1.55, y2: 0.61, y3: 2.16 },
    { x: new Date(2013, 0, 1), y: 1.66, y1: 1.55, y2: 0.67, y3: 2.51 },
    { x: new Date(2014, 0, 1), y: 1.67, y1: 1.65, y2: 0.67, y3: 2.61 },
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StackedArea100 = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', intervalType: 'Years', majorGridLines: { width: 0 }, labelFormat: 'y', edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, minimum: new Date(1999, 0, 1), maximum: new Date(2015, 0, 1) }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), primaryYAxis: { majorTickLines: { width: 0 }, rangePadding: 'None', interval: 20, lineStyle: { width: 0 } }, title: "Sales by Payment Mode", loaded: onChartLoad.bind(_this), tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: "x", yName: "y", name: "Bank-Transfer", opacity: 1, type: "StackingArea100", border: { width: 0.5, color: '#ffffff' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: "x", yName: "y1", name: "Credit Card", opacity: 1, type: "StackingArea100", border: { width: 0.5, color: '#ffffff' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: "x", yName: "y2", name: "Debit Card", opacity: 1, type: "StackingArea100", border: { width: 0.5, color: '#ffffff' } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: "x", yName: "y3", name: "Cash", type: "StackingArea100", opacity: 1, border: { width: 0.5, color: '#ffffff' } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React 100% Stacked Area Chart example visualizes the amount of sales by payment mode  with default 100% stacked area series. A legend in the sample shows information about the series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the 100% stacked area chart. This chart visualizes data with y-values stacked, ensuring that the cumulative proportion of each stacked element always totals 100%."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use 100% stacking area series, we need to inject ",
                React.createElement("code", null, "StackingAreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the area type series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-area", "aria-label": "Navigate to the documentation for 100% Stacked Area Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = StackedArea100;
