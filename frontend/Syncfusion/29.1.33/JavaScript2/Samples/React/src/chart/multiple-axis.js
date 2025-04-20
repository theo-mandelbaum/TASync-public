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
exports.MultipleAxis = exports.data2 = exports.data1 = void 0;
/**
 * Sample for multiple axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 'Sun', y: 35 }, { x: 'Mon', y: 40 },
    { x: 'Tue', y: 80 }, { x: 'Wed', y: 70 }, { x: 'Thu', y: 65 }, { x: 'Fri', y: 55 },
    { x: 'Sat', y: 50 }
];
exports.data2 = [
    { x: 'Sun', y: 30 }, { x: 'Mon', y: 28 },
    { x: 'Tue', y: 29 }, { x: 'Wed', y: 30 }, { x: 'Thu', y: 33 }, { x: 'Fri', y: 32 },
    { x: 'Sat', y: 34 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var MultipleAxis = /** @class */ (function (_super) {
    __extends(MultipleAxis, _super);
    function MultipleAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MultipleAxis.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, ref: function (charts) { return _this.chartInstance = charts; }, primaryXAxis: { valueType: 'Category', minorGridLines: { width: 0 }, majorGridLines: { width: 0 } }, primaryYAxis: { minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, labelFormat: '{value}°F', majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, load: this.load.bind(this), legendSettings: { visible: false }, title: 'Weather Data', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, enableHighlight: true } },
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
    MultipleAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    MultipleAxis.prototype.animationComplete = function (args) {
        this.chartInstance.removeSvg();
        this.chartInstance.animateSeries = false;
        this.chartInstance['renderElements']();
    };
    ;
    MultipleAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return MultipleAxis;
}(sample_base_1.SampleBase));
exports.MultipleAxis = MultipleAxis;
