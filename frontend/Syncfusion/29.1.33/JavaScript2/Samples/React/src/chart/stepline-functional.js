"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepLineData = void 0;
/**
 * Sample for Step line series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.stepLineData = [
    { x: 2007, y: 6.0, album: 'High School Musical 2', artist: 'Various Artists' },
    { x: 2008, y: 6.8, album: 'Viva la Vida or Death and All His Friends', artist: 'Coldplay' },
    { x: 2009, y: 8.3, album: 'I Dreamed a Dream', artist: 'Susan Boyle' },
    { x: 2010, y: 5.7, album: 'Recovery', artist: 'Eminem' },
    { x: 2011, y: 18.1, album: '21', artist: 'Adele' },
    { x: 2012, y: 8.3, album: '21', artist: 'Adele' },
    { x: 2013, y: 4.0, album: 'Midnight Memories', artist: 'One Direction' },
    { x: 2014, y: 10.0, album: 'Frozen', artist: 'Various Artists' },
    { x: 2015, y: 17.4, album: '25', artist: 'Adele' },
    { x: 2016, y: 2.5, album: 'Lemonade', artist: 'Beyoncé' },
    { x: 2017, y: 6.1, album: '÷', artist: 'Ed Sheeran' },
    { x: 2018, y: 3.5, album: 'The Greatest Showman', artist: 'Hugh Jackman & Various Artists' },
    { x: 2019, y: 3.3, album: '5x20 All the Best!! 1999–2019', artist: 'Arashi' },
    { x: 2020, y: 4.8, album: 'Map of the Soul: 7', artist: 'BTS' },
    { x: 2021, y: 4.68, album: '30', artist: 'Adele' },
    { x: 2022, y: 7.2, album: 'Greatest Works of Art', artist: 'Jay Chou' },
    { x: 2023, y: 6.4, album: 'FML', artist: 'Seventeen' },
    { x: 2024, y: 5.6, album: 'The Tortured Poets Department', artist: 'Taylor Swift' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StepLine = function () {
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
    var tooltipRender = function (args) {
        var data = args.series.dataSource[args.point.index];
        args.text = "Sales: <b>".concat(data.y, "M</b><br/>Album: <b>").concat(data.album, "</b><br/>Artist: <b>").concat(data.artist, "</b>");
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Double', minimum: 2006, maximum: 2025, interval: 3, edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, load: load.bind(_this), primaryYAxis: { minimum: 0, maximum: 20, interval: 4, title: 'Sales in million', labelFormat: '{value}', lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false, enableHighlight: true }, tooltip: { enable: true, showNearestTooltip: true, header: "<b>${point.x}</b>", enableHighlight: true, enableMarker: false }, loaded: onChartLoad.bind(_this), title: 'Worldwide Best-Selling Albums by Year', subTitle: 'Source: wikipedia.org', tooltipRender: tooltipRender.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepLineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Double, ej2_react_charts_1.Highlight, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.stepLineData, xName: 'x', yName: 'y', width: 3, type: 'StepLine', marker: { dataLabel: { visible: true, font: { fontWeight: '600' } } } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React StepLine Chart visualizes the global best-selling albums by year from 2001 to 2024.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a step line type chart. This chart forms a step-like progression by connecting points using vertical and horizontal lines. ",
                React.createElement("code", null, "Markers"),
                " are used to represent individual data points and their values."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use step line series, we need to inject ",
                React.createElement("code", null, "StepLineSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the step line series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/step-line", "aria-label": "Navigate to the documentation for Step Line Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = StepLine;
