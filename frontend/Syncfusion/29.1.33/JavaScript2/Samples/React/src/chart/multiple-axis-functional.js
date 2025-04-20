"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for multiple axis
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
    { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
    { x: 'Sat', y: 50 }
];
exports.data2 = [
    { x: 'Sun', y: 31 }, { x: 'Mon', y: 28 },
    { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
    { x: 'Sat', y: 34 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var MultipleAxis = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, ref: chartInstance, primaryXAxis: { valueType: 'Category', minorGridLines: { width: 0 }, majorGridLines: { width: 0 } }, primaryYAxis: { minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, labelFormat: '{value}°F', majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, load: load.bind(_this), legendSettings: { visible: false }, title: 'Weather Data', loaded: onChartLoad.bind(_this), tooltip: { enable: true, enableHighlight: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.ChartAnnotation] }),
                React.createElement(ej2_react_charts_1.AxesDirective, null,
                    React.createElement(ej2_react_charts_1.AxisDirective, { majorGridLines: { width: 0 }, rowIndex: 0, opposedPosition: true, lineStyle: { width: 0 }, minimum: 24, maximum: 36, interval: 2, majorTickLines: { width: 0 }, name: 'yAxis1', labelFormat: '{value}\u00B0C' })),
                React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/cloud.png" alt="Cloud Picture" style={{width: "41px"; height: "41px"}}/></div>', x: 'Sun', y: 62, coordinateUnits: 'Point', verticalAlignment: 'Top' }),
                    React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div id="chart_cloud"><img src="src/chart/images/sunny.png" alt="Sunny Picture" style={{width: "41px"; height: "41px"}}/></div>', x: 'Sat', y: 35, coordinateUnits: 'Point', yAxisName: 'yAxis1' })),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, name: 'Germany', type: 'Column', marker: { visible: true, width: 7, height: 7 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Japan', type: 'Spline', marker: { visible: true, width: 7, height: 7, isFilled: true }, yAxisName: 'yAxis1', width: 2 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example shows how to use a chart's multiple axes to depict temperatures in both Celsius and Fahrenheit.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure multiple axes. Use an ",
                React.createElement("code", null, "Axes"),
                " collection to render a secondary axis in the chart that can be bound to a specific series using ",
                React.createElement("code", null, "YAxisName"),
                " and ",
                React.createElement("code", null, "XAxisName"),
                " properties in the series. You can also customize the secondary axis similar to the primary axis."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                "More information on the multiple axis can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/axis-customization/#multiple-axis", "aria-label": "Navigate to the documentation for Multiple Axis in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = MultipleAxis;
