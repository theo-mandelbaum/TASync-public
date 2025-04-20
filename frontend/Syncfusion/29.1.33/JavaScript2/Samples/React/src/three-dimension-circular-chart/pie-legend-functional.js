"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Circular 3D Chart with legend.
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { 'x': 'Chrome', y: 62.92, text: '62.92%' },
    { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
    { 'x': 'Opera', y: 3.15, text: '3.15%' },
    { 'x': 'Edge', y: 5.5, text: '5.5%' },
    { 'x': 'Safari', y: 19.97, text: '19.97%' },
    { 'x': 'Others', y: 2.34, text: '2.34%' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Circular 3D Chart with legend.
 */
var PieWithLegend = function () {
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
                React.createElement(ej2_react_charts_1.CircularChart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: {
                        visible: true,
                        enableHighlight: true,
                        position: ej2_base_1.Browser.isDevice ? 'Bottom' : 'Right',
                    }, load: load.bind(_this), title: 'Browser Market Shares in November 2023', loaded: onChartLoad.bind(_this), rotation: 15, tilt: -15, tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries3D, ej2_react_charts_1.CircularChartDataLabel3D, ej2_react_charts_1.CircularChartLegend3D, ej2_react_charts_1.CircularChartTooltip3D, ej2_react_charts_1.CircularChartHighlight3D] }),
                    React.createElement(ej2_react_charts_1.CircularChart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.CircularChart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', innerRadius: '55%', radius: '75%', dataLabel: {
                                visible: true, position: 'Inside', enableRotation: true,
                                font: { fontWeight: '600' }, name: 'text', connectorStyle: { length: '20px' }
                            } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the browser market share using a 3D donut chart with a legend displayed on the right side of the chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render a 3D donut chart with a legend. The legend provides information about the data points in the chart. Clicking on a legend item can collapse the corresponding data point, and hovering over a legend item can highlight the data point."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices. "),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D circular chart component features are segregated into individual feature-wise modules. To use legend, you need to inject the ",
                React.createElement("code", null, "CircularChartLegend3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = PieWithLegend;
