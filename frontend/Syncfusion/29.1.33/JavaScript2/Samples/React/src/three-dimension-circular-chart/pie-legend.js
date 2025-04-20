"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PieWithLegend = exports.data1 = void 0;
/**
 * Sample for Circular 3D Chart with legend.
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { 'x': 'Chrome', y: 62.92, text: '62.92%' },
    { 'x': 'Internet Explorer', y: 6.12, text: '6.12%' },
    { 'x': 'Opera', y: 3.15, text: '3.15%' },
    { 'x': 'Edge', y: 5.5, text: '5.5%' },
    { 'x': 'Safari', y: 19.97, text: '19.97%' },
    { 'x': 'Others', y: 2.34, text: '2.34%' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
/**
 * Circular 3D Chart with legend.
 */
var PieWithLegend = /** @class */ (function (_super) {
    __extends(PieWithLegend, _super);
    function PieWithLegend() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieWithLegend.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", null,
                    React.createElement(ej2_react_charts_1.CircularChart3DComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: {
                            visible: true,
                            enableHighlight: true,
                            position: ej2_base_1.Browser.isDevice ? 'Bottom' : 'Right',
                        }, load: this.load.bind(this), highlightMode: 'Point', title: 'Browser Market Shares in November 2023', loaded: this.onChartLoad.bind(this), rotation: 15, tilt: -15, tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "" } },
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
                    " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point on touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "3D circular chart component features are segregated into individual feature-wise modules. To use legend, you need to inject the ",
                    React.createElement("code", null, "CircularChartLegend3D"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."))));
    };
    PieWithLegend.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    PieWithLegend.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return PieWithLegend;
}(sample_base_1.SampleBase));
exports.PieWithLegend = PieWithLegend;
