"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data = void 0;
/**
 * Sample for Waterfall series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: 'Income', y: 971 }, { x: 'Sales', y: -101 },
    { x: 'Development', y: -268 },
    { x: 'Revenue', y: 403 }, { x: 'Balance' },
    { x: 'Expense', y: -136 }, { x: 'Tax', y: -365 },
    { x: 'Net Profit' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #control-charts {\n        padding: 0px !important;\n    }\n\n    #charts_Series_0_Connector_ {\n        stroke-dasharray: 1px 2px;\n        stroke-linejoin: round; stroke-linecap: round;\n        -webkit-animation: dash 1s linear infinite;\n        animation: dash 1s linear infinite;\n    }\n    @-webkit-keyframes dash {\n        100% {\n            stroke-dashoffset: -3px;\n        }\n    }\n    @keyframes dash {\n        100% {\n            stroke-dashoffset: -3px;\n        }\n    }";
var Waterfall = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var textRender = function (args) {
        args.series.marker.dataLabel.font.size = ej2_base_1.Browser.isDevice ? '8px' : '12px';
    };
    var cornerRadius = { topLeft: 3, bottomLeft: 3, bottomRight: 3, topRight: 3 };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', load: load.bind(_this), style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', labelRotation: ej2_base_1.Browser.isDevice ? -90 : 0, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 }, interval: 1 }, primaryYAxis: { lineStyle: { width: 0 }, minimum: 0, maximum: 1250, interval: 250, majorGridLines: { width: 1 }, minorTickLines: { width: 0 }, title: 'USD', labelFormat: "{value}K", majorTickLines: { width: 0 } }, tooltip: { enable: true, format: '<b>${point.x}</b> <br> Product Revenue : <b>${point.y}</b>', header: " " }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, legendSettings: { visible: false }, title: 'Company Revenue and Profit', textRender: textRender, loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.WaterfallSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, border: { color: 'black', width: 0.2 }, xName: 'x', yName: 'y', type: 'Waterfall', intermediateSumIndexes: [4], sumIndexes: [7], marker: { dataLabel: { visible: true, font: { color: '#ffffff' } }, }, connector: { color: '#5F6A6A', width: 0.8, dashArray: '1,2' }, negativeFillColor: '#e56590', columnWidth: 0.5, cornerRadius: cornerRadius })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the revenue and profits of a company using the default waterfall series chart. The tooltip provides details on the profits made by each department.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the waterfall chart. The waterfall chart explains the gradual change in the quantitative value of an entity that is subject to changes by increments or decrements."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Waterfall series, we need to inject ",
                React.createElement("code", null, "WaterfallSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the Waterfall series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/waterfallt", "aria-label": "Navigate to the documentation for Waterfall in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Waterfall;
