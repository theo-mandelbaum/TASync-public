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
exports.ErrorBarChart = exports.data1 = void 0;
/**
 * Sample for error bar
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: 'Printer', y: 750, error: 50 }, { x: 'Desktop', y: 500, error: 70 }, { x: 'Charger', y: 550, error: 60 },
    { x: 'Mobile', y: 575, error: 80 }, { x: 'Keyboard', y: 400, error: 20 },
    { x: 'Power Bank', y: 450, error: 90 }, { x: 'Laptop', y: 650, error: 40 }, { x: 'Battery', y: 525, error: 84 },
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var ErrorBarChart = /** @class */ (function (_super) {
    __extends(ErrorBarChart, _super);
    function ErrorBarChart() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ErrorBarChart.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section ', style: { textAlign: "center" } },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', primaryXAxis: { valueType: 'Category', interval: 1, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 }, labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, labelIntersectAction: ej2_base_1.Browser.isDevice ? "None" : "Rotate45" }, chartArea: { border: { width: 0 } }, primaryYAxis: { minimum: 0, maximum: 1250, interval: 250, lineStyle: { width: 0 }, title: 'Quantity', majorTickLines: { width: 0 } }, load: this.load.bind(this), tooltipRender: this.tooltipRender.bind(this), highlightColor: '', width: ej2_base_1.Browser.isDevice ? '100%' : '75%', pointRender: this.pointRender.bind(this), title: "Quantity vs Items", loaded: this.onChartLoad.bind(this), tooltip: { enable: true, enableMarker: false } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.ErrorBar, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'Column', marker: { height: 10, width: 10 }, errorBar: { visible: true, verticalError: 'error' }, width: 2 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the errors in the quantity of different items with an error bar chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the error bar chart. An error bar chart is used to indicate the error or uncertainty in the reported measurement."),
                React.createElement("p", null, "Chart supports the following error bar types."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("code", null, "Fixed"),
                        " - Renders a fixed type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Percentage"),
                        " - Renders a percentage type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "StandardDeviation"),
                        " - Renders a standard deviation type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "StandardError"),
                        " - Renders a standard error type error bar."),
                    React.createElement("li", null,
                        React.createElement("code", null, "Custom"),
                        " - Renders a custom type error bar.")),
                React.createElement("p", null,
                    "The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/tooltip/", "aria-label": "Navigate to the Tooltip property reference for React Chart" }, "tooltip"),
                    " is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "The Charts component\u2019s features are segregated into individual feature modules. To use error bar, we need to inject ",
                    React.createElement("code", null, "ErrorBar"),
                    " into the ",
                    React.createElement("code", null, "@services"),
                    " section."),
                React.createElement("p", null,
                    "More information on the error bar can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/other-types/#error-bar-chart", "aria-label": "Navigate to the documentation for Error Bar in React Chart component" }, "documentation section"),
                    "."))));
    };
    ErrorBarChart.prototype.pointRender = function (args) {
        var selectedTheme = (0, theme_color_1.loadChartTheme)();
        if (selectedTheme === 'bootstrap5' || selectedTheme === 'fluent') {
            args.fill = '#81ccbb';
        }
    };
    ;
    ErrorBarChart.prototype.onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    ;
    ErrorBarChart.prototype.load = function (args) {
        var selectedTheme = (0, theme_color_1.loadChartTheme)(args);
        if (selectedTheme === 'Bootstrap5' || selectedTheme === 'Fluent') {
            args.chart.highlightColor = '#c7e9b6';
        }
    };
    ;
    ErrorBarChart.prototype.tooltipRender = function (args) {
        args.text = '<b>' + args.data.pointX + ' Count' + ': ' + args.data.pointY + '</b> (error range: ' + (args.data.pointY - args.series.visiblePoints[args.data.pointIndex].verticalError / 2) + '-' + (args.data.pointY + args.series.visiblePoints[args.data.pointIndex].verticalError / 2) + ')';
    };
    ;
    return ErrorBarChart;
}(sample_base_1.SampleBase));
exports.ErrorBarChart = ErrorBarChart;
