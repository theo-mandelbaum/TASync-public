"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for Bubble Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
exports.data = [
    { x: 92.2, y: 7.8, size: 1.347, toolTipMappingName: 'China', text: 'China' },
    { x: 74, y: 6.5, size: 1.241, toolTipMappingName: 'India', text: 'India' },
    { x: 90.4, y: 6.0, size: 0.238, toolTipMappingName: 'Indonesia', text: ej2_base_1.Browser.isDevice ? 'ID' : 'Indonesia' },
    { x: 99.4, y: 2.2, size: 0.312, toolTipMappingName: 'United States', text: 'US' },
    { x: 88.6, y: 1.3, size: 0.197, toolTipMappingName: 'Brazil', text: ej2_base_1.Browser.isDevice ? 'BR' : 'Brazil' },
    { x: 99, y: 0.7, size: 0.0818, toolTipMappingName: 'Germany', text: ej2_base_1.Browser.isDevice ? 'DE' : 'Germany' },
    { x: 72, y: 2.0, size: 0.0826, toolTipMappingName: 'Egypt', text: ej2_base_1.Browser.isDevice ? 'EG' : 'Egypt' },
    { x: 99.6, y: 3.4, size: 0.143, toolTipMappingName: 'Russia', text: ej2_base_1.Browser.isDevice ? 'RUS' : 'Russia' },
    { x: 96.5, y: 0.2, size: 0.128, toolTipMappingName: 'Japan', text: ej2_base_1.Browser.isDevice ? 'JP' : 'Japan' },
    { x: 86.1, y: 4.0, size: 0.115, toolTipMappingName: 'MeLiteracy Ion', text: 'MLI' },
    { x: 92.6, y: 5.2, size: 0.096, toolTipMappingName: 'Philippines', text: 'PH' },
    { x: 61.3, y: 1.45, size: 0.162, toolTipMappingName: 'Nigeria', text: 'Nigeria' },
    { x: 82.2, y: 3.97, size: 0.7, toolTipMappingName: 'Hong Kong', text: ej2_base_1.Browser.isDevice ? 'HK' : 'Hong Kong' },
    { x: 79.2, y: 4.9, size: 0.162, toolTipMappingName: 'Netherland', text: 'NL' },
    { x: 72.5, y: 4.5, size: 0.7, toolTipMappingName: 'Jordan', text: 'Jordan' },
    { x: 81, y: 2.5, size: 0.21, toolTipMappingName: 'Australia', text: ej2_base_1.Browser.isDevice ? 'AU' : 'Australia' },
    { x: 66.8, y: 3.9, size: 0.028, toolTipMappingName: 'Mongolia', text: 'MN' },
    { x: 78.4, y: 2.9, size: 0.231, toolTipMappingName: 'Taiwan', text: ej2_base_1.Browser.isDevice ? 'TW' : 'Taiwan' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    ellipse[id*=_Trackball_0] {\n\n        strokeWidth: 1 !important;\n    }";
/**
 * Bubble sample
 */
var Bubble = function () {
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
    var pointRender = function (args) {
        (0, theme_color_1.bubblePointRender)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { minimum: 65, maximum: 102, interval: 5, crossesAt: 5 }, load: load.bind(_this), primaryYAxis: { minimum: 0, maximum: 10, crossesAt: 85, interval: 2.5 }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'World Countries Details', pointRender: pointRender, legendSettings: { visible: false }, loaded: onChartLoad.bind(_this), tooltip: { enableMarker: false, enable: true, header: "<b>${point.tooltip}</b>", format: "Literacy Rate : <b>${point.x}%</b> <br/>GDP Annual Growth Rate : <b>${point.y}</b><br/>Population : <b>${point.size} Billion</b>" } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BubbleSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, type: 'Bubble', minRadius: 3, maxRadius: 8, tooltipMappingName: 'toolTipMappingName', border: { width: 2 }, xName: 'x', yName: 'y', size: 'size', marker: { dataLabel: { visible: true, name: 'text', position: 'Middle', font: { fontWeight: '500', color: '#ffffff' } } } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React bubble chart example visualizes the literacy rates and GDP growth rates of countries. A tooltip shows more information about the countries.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the bubble chart. The bubble chart is a type of chart that shows three dimensions of the data. Each point is drawn as a bubble, where the bubble's size depends on the ",
                React.createElement("code", null, "Size"),
                " property. You can also use the ",
                React.createElement("code", null, "Fill"),
                " property to customize the data appearance."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use bubble series, we need to inject ",
                React.createElement("code", null, "BubbleSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the bubble series can be found in this ",
                React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/chart-types/#bubble-chart", "aria-label": "Navigate to the documentation for Bubble Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Bubble;
