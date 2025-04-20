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
exports.Spline = exports.maximumData = exports.averageData = exports.minimumData = void 0;
/**
 * Sample for Spline series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.minimumData = [
    { x: 'Jan', y: 22.75 },
    { x: 'Feb', y: 29.71 },
    { x: 'Mar', y: 33.53 },
    { x: 'Apr', y: 41.22 },
    { x: 'May', y: 49.87 },
    { x: 'Jun', y: 59.02 },
    { x: 'Jul', y: 62.94 },
    { x: 'Aug', y: 61.27 },
    { x: 'Sep', y: 55.36 },
    { x: 'Oct', y: 44.76 },
    { x: 'Nov', y: 34.79 },
    { x: 'Dec', y: 28.04 }
];
exports.averageData = [
    { x: 'Jan', y: 31.89 },
    { x: 'Feb', y: 40.82 },
    { x: 'Mar', y: 44.96 },
    { x: 'Apr', y: 53.64 },
    { x: 'May', y: 62.28 },
    { x: 'Jun', y: 71.80 },
    { x: 'Jul', y: 75.69 },
    { x: 'Aug', y: 73.99 },
    { x: 'Sep', y: 68.61 },
    { x: 'Oct', y: 58.95 },
    { x: 'Nov', y: 45.18 },
    { x: 'Dec', y: 38.21 }
];
exports.maximumData = [
    { x: 'Jan', y: 41.02 },
    { x: 'Feb', y: 51.93 },
    { x: 'Mar', y: 56.39 },
    { x: 'Apr', y: 66.06 },
    { x: 'May', y: 74.64 },
    { x: 'Jun', y: 84.58 },
    { x: 'Jul', y: 88.43 },
    { x: 'Aug', y: 86.72 },
    { x: 'Sep', y: 81.86 },
    { x: 'Oct', y: 73.13 },
    { x: 'Nov', y: 55.54 },
    { x: 'Dec', y: 48.36 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n\n    @keyframes opac {\n        0% {\n            stroke-opacity: 1;\n            stroke-width: 0px;\n        }\n        100% {\n            stroke-opacity: 0;\n            stroke-width: 10px;\n        }\n    }";
var Spline = /** @class */ (function (_super) {
    __extends(Spline, _super);
    function Spline() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Spline.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate90', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, primaryYAxis: { labelFormat: '{value}°F', minimum: 0, interval: 20, title: 'Temperature (°F)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, tooltip: { enable: true, shared: true, showNearestTooltip: true, header: '<b>${point.x}<b>', format: '${series.name} : <b>${point.y}</b>' }, title: '2024 US Temperature Trends with Hottest Coldest and Average Records', subTitle: 'Source: ncei.noaa.gov', crosshair: { enable: true, lineType: 'Vertical', highlightCategory: true }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), height: '500px' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png" alt="Cloud Picture" style="width: 41px; height: 41px"/></div>', x: 'Jan', y: 22.75, coordinateUnits: 'Point', verticalAlignment: 'Middle' }),
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png" alt="Sunny Picture" style="width: 41px; height: 41px"/></div>', x: 'Jul', y: 88.43, coordinateUnits: 'Point', verticalAlignment: 'Middle' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.maximumData, xName: 'x', yName: 'y', name: 'Max Temp', width: 2, type: 'Spline', marker: { visible: true, width: 7, height: 7, isFilled: true } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.averageData, xName: 'x', yName: 'y', name: 'Avg Temp', width: 2, type: 'Spline', marker: { visible: true, width: 7, height: 7, isFilled: true } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.minimumData, xName: 'x', yName: 'y', name: 'Min Temp', width: 2, type: 'Spline', marker: { visible: true, width: 7, height: 7, isFilled: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Spline Chart example visualizes the average monthly high and low temperatures across the contiguous U.S. for 2024.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a spline chart. The spline chart uses a smooth, curved line to connect points in a data series. ",
                    React.createElement("code", null, "Markers"),
                    " represent individual data points with different shapes, while the ",
                    React.createElement("code", null, "crosshair"),
                    " enhances data tracking by highlighting the category."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use spline series, we need to inject ",
                    React.createElement("code", null, "SplineSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the spline series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline", "aria-label": "Navigate to the documentation for Spline Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    Spline.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Spline.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    return Spline;
}(sample_base_1.SampleBase));
exports.Spline = Spline;
