"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Circular 3D Chart with selection.
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { 'x': 'Chrome', y: 62.92 },
    { 'x': 'Internet Explorer', y: 6.12 },
    { 'x': 'Edge', y: 5.5 },
    { 'x': 'Opera', y: 3.15 },
    { 'x': 'Safari', y: 19.97 },
    { 'x': 'Others', y: 2.34 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Circular 3D Chart with selection.
 */
var Selection = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadCircular3DChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.CircularChart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { visible: true, position: ej2_base_1.Browser.isDevice ? 'Bottom' : 'Right', toggleVisibility: false }, selectionMode: 'Point', selectionPattern: 'DiagonalBackward', isMultiSelect: true, highlightMode: 'Point', load: load.bind(_this), title: 'Browser Market Shares in November 2023', tilt: -30, tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" }, loaded: onChartLoad.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries3D, ej2_react_charts_1.CircularChartDataLabel3D, ej2_react_charts_1.CircularChartLegend3D, ej2_react_charts_1.CircularChartTooltip3D, ej2_react_charts_1.CircularChartHighlight3D, ej2_react_charts_1.CircularChartSelection3D] }),
                    React.createElement(ej2_react_charts_1.CircularChart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.CircularChart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', radius: ej2_base_1.Browser.isDevice ? '50%' : '70', dataLabel: {
                                visible: true, name: 'x', position: 'Outside', font: { fontWeight: '600' },
                                connectorStyle: { length: ej2_base_1.Browser.isDevice ? '20px' : '40px' }
                            } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample displays the browser market share using a 3D pie chart with selection and highlight behavior.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this sample, you can select and highlight any point in the chart by clicking on or touching it. Additionally, you have the option to select and highlight a point during the initial loading of the chart using the",
                React.createElement("code", null, "selectedDataIndexes"),
                " option."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices. "),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D circular chart component features are segregated into individual feature-wise modules. To use selection, you need to inject the ",
                React.createElement("code", null, "CircularChartSelection3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = Selection;
