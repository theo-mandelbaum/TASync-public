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
exports.Histogram = exports.chartData = void 0;
/**
 * Sample for Histogram series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.chartData = [];
var points = [5.250, 7.750, 0, 8.275, 9.750, 7.750, 8.275, 6.250, 5.750,
    5.250, 23.000, 26.500, 27.750, 25.025, 26.500, 26.500, 28.025, 29.250, 26.750, 27.250,
    26.250, 25.250, 34.500, 25.625, 25.500, 26.625, 36.275, 36.250, 26.875, 40.000, 43.000,
    46.500, 47.750, 45.025, 56.500, 56.500, 58.025, 59.250, 56.750, 57.250,
    46.250, 55.250, 44.500, 45.525, 55.500, 46.625, 46.275, 56.250, 46.875, 43.000,
    46.250, 55.250, 44.500, 45.425, 55.500, 56.625, 46.275, 56.250, 46.875, 43.000,
    46.250, 55.250, 44.500, 45.425, 55.500, 46.625, 56.275, 46.250, 56.875, 41.000, 63.000,
    66.500, 67.750, 65.025, 66.500, 76.500, 78.025, 79.250, 76.750, 77.250,
    66.250, 75.250, 74.500, 65.625, 75.500, 76.625, 76.275, 66.250, 66.875, 80.000, 85.250,
    87.750, 89.000, 88.275, 89.750, 97.750, 98.275, 96.250, 95.750, 95.250
];
points.map(function (value) {
    exports.chartData.push({
        y: value
    });
});
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Histogram = /** @class */ (function (_super) {
    __extends(Histogram, _super);
    function Histogram() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Histogram.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: this.load.bind(this), primaryXAxis: { majorGridLines: { width: 0 }, title: 'Score of Final Examination', minimum: 0, maximum: 100, edgeLabelPlacement: 'Shift' }, primaryYAxis: { title: 'Number of Students', minimum: 0, maximum: 50, interval: 10, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, header: " " }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { visible: false }, title: 'Examination Result', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.HistogramSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData, yName: 'y', name: 'Score', type: 'Histogram', marker: { visible: true, height: 7, width: 7, dataLabel: { visible: true, position: 'Top', font: { color: '#ffffff', fontWeight: "600" } } }, showNormalDistribution: true, columnWidth: 0.99, binInterval: 20 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Histogram Chart example visualizes final examination results. The number of students between each interval is shown in data labels.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the histogram chart. The histogram chart is a bar (column) chart used for frequency distribution in which the widths of the bars are proportional to classes into which variables have been divided and the heights of the bars are proportional to class frequencies. The DataLabel property is used to present details on individual data points."),
                React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover the mouse over a point or tap a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use histogram series, you should inject the ",
                    React.createElement("code", null, "HistogramSeries"),
                    " module using the ",
                    React.createElement("code", null, "Chart.Inject(HistogramSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the histogram series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/other-types/#histogram-series", "aria-label": "Navigate to the documentation for Histogram in React Chart component" }, "documentation section"),
                    "."))));
    };
    Histogram.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Histogram.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
        if (selectedTheme === 'highcontrast') {
            args.chart.series[0].marker.dataLabel.font.color = '#000000';
        }
    };
    ;
    return Histogram;
}(sample_base_1.SampleBase));
exports.Histogram = Histogram;
