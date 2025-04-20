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
exports.NegativeStack = void 0;
/**
 * Sample for Negative Stack chart
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
;
var negativeStackData = [
    { age: '90 - 94', male: 123, female: 153, malePercent: '0.03%', femalePercent: '0.04%', malePercentValue: 0.03, femalePercentValue: -0.04 },
    { age: '85 - 89', male: 407, female: 457, malePercent: '0.1%', femalePercent: '0.11%', malePercentValue: 0.1, femalePercentValue: -0.11 },
    { age: '80 - 84', male: 879, female: 970, malePercent: '0.21%', femalePercent: '0.23%', malePercentValue: 0.21, femalePercentValue: -0.23 },
    { age: '75 - 79', male: 1609, female: 1768, malePercent: '0.39%', femalePercent: '0.42%', malePercentValue: 0.39, femalePercentValue: -0.42 },
    { age: '70 - 74', male: 2769, female: 3004, malePercent: '0.66%', femalePercent: '0.72%', malePercentValue: 0.66, femalePercentValue: -0.72 },
    { age: '65 - 69', male: 4250, female: 4511, malePercent: '1.02%', femalePercent: '1.08%', malePercentValue: 1.02, femalePercentValue: -1.08 },
    { age: '60 - 64', male: 6152, female: 6369, malePercent: '1.48%', femalePercent: '1.53%', malePercentValue: 1.48, femalePercentValue: -1.53 },
    { age: '55 - 59', male: 7741, female: 7976, malePercent: '1.86%', femalePercent: '1.91%', malePercentValue: 1.86, femalePercentValue: -1.91 },
    { age: '50 - 54', male: 9643, female: 10086, malePercent: '2.31%', femalePercent: '2.42%', malePercentValue: 2.31, femalePercentValue: -2.42 },
    { age: '45 - 49', male: 11332, female: 11585, malePercent: '2.72%', femalePercent: '2.78%', malePercentValue: 2.72, femalePercentValue: -2.78 },
    { age: '40 - 44', male: 13569, female: 13713, malePercent: '3.25%', femalePercent: '3.29%', malePercentValue: 3.25, femalePercentValue: -3.29 },
    { age: '35 - 39', male: 16293, female: 15999, malePercent: '3.91%', femalePercent: '3.84%', malePercentValue: 3.91, femalePercentValue: -3.84 },
    { age: '30 - 34', male: 18805, female: 18038, malePercent: '4.51%', femalePercent: '4.32%', malePercentValue: 4.51, femalePercentValue: -4.32 },
    { age: '25 - 29', male: 20023, female: 19216, malePercent: '4.8%', femalePercent: '4.61%', malePercentValue: 4.8, femalePercentValue: -4.61 },
    { age: '20 - 24', male: 20428, female: 19689, malePercent: '4.9%', femalePercent: '4.72%', malePercentValue: 4.9, femalePercentValue: -4.72 },
    { age: '15 - 19', male: 19663, female: 18950, malePercent: '4.71%', femalePercent: '4.54%', malePercentValue: 4.71, femalePercentValue: -4.54 },
    { age: '10 - 14', male: 18701, female: 17859, malePercent: '4.48%', femalePercent: '4.28%', malePercentValue: 4.48, femalePercentValue: -4.28 },
    { age: '05 - 09', male: 19863, female: 18942, malePercent: '4.76%', femalePercent: '4.54%', malePercentValue: 4.76, femalePercentValue: -4.54 },
    { age: '00 - 04', male: 18171, female: 17316, malePercent: '4.36%', femalePercent: '4.15%', malePercentValue: 4.36, femalePercentValue: -4.15 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var NegativeStack = /** @class */ (function (_super) {
    __extends(NegativeStack, _super);
    function NegativeStack() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NegativeStack.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', title: 'Population by Age Range', minimum: 0, interval: 3, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, primaryYAxis: { labelFormat: '{value}%', interval: 3, title: 'Share of Total Population (%)', lineStyle: { width: 0 }, edgeLabelPlacement: 'Shift', rangePadding: 'Round', majorTickLines: { width: 0 } }, axisLabelRender: this.labelRender.bind(this), legendSettings: { enableHighlight: true, shapeWidth: 8, shapeHeight: 8 }, load: this.load.bind(this), title: 'Belize Demographic Breakdown by Age and Gender (2024)', subTitle: 'Source: statisticstimes.com', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, header: '${point.x}', enableHighlight: true }, tooltipRender: this.tooltipRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingBarSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: negativeStackData, xName: 'age', yName: 'femalePercentValue', name: 'Female', columnWidth: 0.5, type: 'StackingBar', marker: { dataLabel: { name: 'femalePercent', visible: true, position: 'Outer', font: { fontWeight: '600', size: '9px' } } }, legendShape: 'Rectangle', cornerRadius: { bottomRight: 4, topRight: 4 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: negativeStackData, xName: 'age', yName: 'malePercentValue', name: 'Male', columnWidth: 0.5, type: 'StackingBar', marker: { dataLabel: { name: 'malePercent', visible: true, position: 'Outer', font: { fontWeight: '600', size: '9px' } } }, legendShape: 'Rectangle', cornerRadius: { bottomRight: 4, topRight: 4 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a stacked bar chart representing the population distribution by age and gender, including negative data points. Data point values are displayed as data labels.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure negative values in a stacked bar chart. The stacked bar chart stacks points in the series horizontally."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use stacking bar series, we need to inject ",
                    React.createElement("code", null, "StackingBarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the stacked bar series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-bar", "aria-label": "Navigate to the documentation for Stacked Bar in React Chart component" }, "documentation section"),
                    "."))));
    };
    NegativeStack.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    NegativeStack.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    NegativeStack.prototype.tooltipRender = function (args) {
        var ageGroup = args.point.x;
        var dataPoint = negativeStackData.find(function (d) { return d.age === ageGroup; });
        if (args.text && dataPoint) {
            var value = void 0;
            if (args.series.name === 'Male') {
                value = dataPoint.malePercent;
            }
            else if (args.series.name === 'Female') {
                value = dataPoint.femalePercent;
            }
            if (value) {
                args.text = "".concat(args.series.name, " Population: <b>").concat(value, "</b>");
            }
        }
    };
    ;
    NegativeStack.prototype.labelRender = function (args) {
        if (args.value < 0) {
            args.text = (-args.value + '%').toString();
        }
    };
    ;
    return NegativeStack;
}(sample_base_1.SampleBase));
exports.NegativeStack = NegativeStack;
