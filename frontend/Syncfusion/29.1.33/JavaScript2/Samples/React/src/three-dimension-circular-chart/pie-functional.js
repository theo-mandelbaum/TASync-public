"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Circular Pie 3D chart.
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { 'x': 'Canada', y: 46, text: 'Canada: 46' },
    { 'x': 'Hungary', y: 30, text: 'Hungary: 30' },
    { 'x': 'Germany', y: 79, text: 'Germany: 79' },
    { 'x': 'Mexico', y: 13, text: 'Mexico: 13' },
    { 'x': 'China', y: 56, text: 'Greece: 26' },
    { 'x': 'India', y: 41, text: 'India: 41' },
    { 'x': 'Bangladesh', y: 25, text: 'Bangladesh: 25' },
    { 'x': 'United States', y: 32, text: 'United States: 32' },
    { 'x': 'Belgium', y: 34, text: 'Belgium: 34' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Circular 3D Chart.
 */
var PieSeries = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.CircularChart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { visible: false }, tilt: -45, enableRotation: true, load: load.bind(_this), title: 'Berlin 2023 Special Olympics Gold Medals', loaded: onChartLoad.bind(_this), tooltip: { enable: true, format: "<b>${point.x}</b><br> Gold Medals: <b>${point.y}</b>", header: "" } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.PieSeries3D, ej2_react_charts_1.CircularChartDataLabel3D, ej2_react_charts_1.CircularChartLegend3D, ej2_react_charts_1.CircularChartTooltip3D, ej2_react_charts_1.CircularChartHighlight3D] }),
                    React.createElement(ej2_react_charts_1.CircularChart3DSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.CircularChart3DSeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', explode: true, innerRadius: '0%', radius: ej2_base_1.Browser.isDevice ? '45%' : '75%', explodeOffset: ej2_base_1.Browser.isDevice ? '10%' : '30%', dataLabel: { visible: true, position: 'Outside', name: 'x', font: { fontWeight: '600' }, connectorStyle: { length: ej2_base_1.Browser.isDevice ? '20px' : '40px' } } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the gold medals from the Berlin 2023 Olympics using a 3D pie chart. Data points are enhanced with tooltip.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a 3D pie chart. The pie chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole. The radius of the pie chart can be customized using the ",
                React.createElement("code", null, "radius"),
                " property. You can rotate and tilt the pie chart using a mouse or touch-enabled devices."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices. "),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "3D circular chart component features are segregated into individual feature-wise modules. To use pie series, you need to inject the ",
                React.createElement("code", null, "PieSeries3D"),
                " module into ",
                React.createElement("code", null, "services"),
                "."))));
};
exports.default = PieSeries;
