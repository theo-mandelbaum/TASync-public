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
exports.Pie = exports.data1 = void 0;
/**
 * Sample for Pie chart
 */
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var base_1 = require("@syncfusion/ej2/base");
exports.data1 = base_1.Browser.isDevice ?
    [{ 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
        { 'x': 'Safari', y: 4.73, text: base_1.Browser.isDevice ? 'Safari <br> 4.73%' : 'Safari: 4.73%' },
        { 'x': 'Opera', y: 6.12, text: 'Opera: 6.12%' },
        { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
        { 'x': 'Others', y: 22.39, text: 'Others: 22.39%' }] :
    [
        { 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
        { 'x': 'UC Browser', y: 4.37, text: 'UC Browser: 4.37%' },
        { 'x': 'Opera', y: 3.12, text: 'Opera: 3.12%' },
        { 'x': 'Sogou Explorer', y: 1.73, text: 'Sogou Explorer: 1.73%' },
        { 'x': 'QQ', y: 3.96, text: 'QQ: 3.96%' },
        { 'x': 'Safari', y: 4.73, text: 'Safari: 4.73%' },
        { 'x': 'Internet Explorer', y: 6.12, text: 'Internet Explorer: 6.12%' },
        { 'x': 'Edge', y: 7.48, text: 'Edge: 7.48%' },
        { 'x': 'Others', y: 9.57, text: 'Others: 9.57%' }
    ];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n        .pie-chart {\n            align :center\n        }";
var Pie = /** @class */ (function (_super) {
    __extends(Pie, _super);
    function Pie() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Pie.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', title: 'Browser Market Share', load: this.load.bind(this), legendSettings: { visible: false }, enableSmartLabels: true, enableAnimation: true, center: { x: '50%', y: '50%' }, enableBorderOnMouseMove: false, tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true }, loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, name: 'Browser', xName: 'x', yName: 'y', explode: true, explodeOffset: '10%', explodeIndex: 0, startAngle: base_1.Browser.isDevice ? 55 : 35, dataLabel: { visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }, radius: base_1.Browser.isDevice ? '40%' : '70%' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Pie Chart example demonstrates a pie chart for mobile browsers usage statistics. Datalabels show information about the points.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    " In this example, you can see how to render and configure a pie chart. The pie chart is a circular graphic, which is ideal for displaying categories as a proportion or a percentage of the whole . The radius of the pie chart can be customized using the ",
                    React.createElement("code", null, "Radius"),
                    " property."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Accumulation Chart component features are segregated into individual feature-wise modules. To use pie chart, we need to inject ",
                    React.createElement("code", null, "PieSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the pie series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/accumulation-chart/pie-dough-nut/#pie-chart", "aria-label": "Navigate to the documentation for Pie Chart in React Accumulation Chart component" }, "documentation section"),
                    "."))));
    };
    Pie.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    ;
    Pie.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.accumulation.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").
            replace(/light/i, "Light").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Pie;
}(sample_base_1.SampleBase));
exports.Pie = Pie;
