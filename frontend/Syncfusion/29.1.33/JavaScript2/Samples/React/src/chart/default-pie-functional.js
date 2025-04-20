"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
exports.data1 = ej2_base_1.Browser.isDevice ?
    [{ 'x': 'Chrome', y: 59.28, text: 'Chrome: 59.28%' },
        { 'x': 'Safari', y: 4.73, text: ej2_base_1.Browser.isDevice ? 'Safari <br> 4.73%' : 'Safari: 4.73%' },
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
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .pie-chart {\n        align :center\n    }";
var Pie = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', title: 'Browser Market Share', load: load.bind(_this), legendSettings: { visible: false }, enableSmartLabels: true, enableAnimation: true, center: { x: '50%', y: '50%' }, enableBorderOnMouseMove: false, tooltip: { enable: true, format: '<b>${point.x}</b><br>Browser Share: <b>${point.y}%</b>', header: "", enableHighlight: true }, loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel] }),
                React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: exports.data1, name: 'Browser', xName: 'x', yName: 'y', explode: true, explodeOffset: '10%', explodeIndex: 0, startAngle: ej2_base_1.Browser.isDevice ? 55 : 35, dataLabel: { visible: true, position: 'Outside', name: 'text', font: { fontWeight: '600' }, connectorStyle: { length: '20px', type: 'Curve' } }, radius: ej2_base_1.Browser.isDevice ? '40%' : '70%' })))),
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
exports.default = Pie;
