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
exports.StackedLine100 = exports.chartData4 = exports.chartData3 = exports.chartData2 = exports.chartData1 = void 0;
/**
 * Sample for 100 percent Stacking Line series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.chartData1 = [
    { x: 'O+ve', y: 39.0 },
    { x: 'A+ve', y: 36.0 },
    { x: 'B+ve', y: 7.6 },
    { x: 'AB+ve', y: 2.5 },
    { x: 'O-ve', y: 7.0 },
    { x: 'A-ve', y: 6.0 },
    { x: 'B-ve', y: 1.4 },
    { x: 'AB-ve', y: 0.5 }
];
exports.chartData2 = [
    { x: 'O+ve', y: 40.0 },
    { x: 'A+ve', y: 30.0 },
    { x: 'B+ve', y: 15.0 },
    { x: 'AB+ve', y: 4.25 },
    { x: 'O-ve', y: 6.6 },
    { x: 'A-ve', y: 2.3 },
    { x: 'B-ve', y: 1.1 },
    { x: 'AB-ve', y: 0.75 }
];
exports.chartData3 = [
    { x: 'O+ve', y: 47.0 },
    { x: 'A+ve', y: 26.0 },
    { x: 'B+ve', y: 9.0 },
    { x: 'AB+ve', y: 2.0 },
    { x: 'O-ve', y: 8.0 },
    { x: 'A-ve', y: 5.0 },
    { x: 'B-ve', y: 2.0 },
    { x: 'AB-ve', y: 1.0 }
];
exports.chartData4 = [
    { x: 'O+ve', y: 29.0 },
    { x: 'A+ve', y: 46.3 },
    { x: 'B+ve', y: 12.0 },
    { x: 'AB+ve', y: 5.6 },
    { x: 'O-ve', y: 2.0 },
    { x: 'A-ve', y: 3.7 },
    { x: 'B-ve', y: 1.0 },
    { x: 'AB-ve', y: 0.4 }
];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var StackedLine100 = /** @class */ (function (_super) {
    __extends(StackedLine100, _super);
    function StackedLine100() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedLine100.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, majorGridLines: { width: 0 }, lineStyle: { width: 0 }, valueType: 'Category', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Trim' }, primaryYAxis: { title: 'Population Share (%)', lineStyle: { width: 0 }, interval: 20, minorTickLines: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: this.load.bind(this), loaded: this.loaded.bind(this), legendClick: this.legendClick.bind(this), title: "Blood Type Distribution by Country", subTitle: 'Source: wikipedia.org', tooltip: { enable: true, format: '${point.x} : <b>${point.y}% (${point.percentage}%)</b>', enableHighlight: true, showNearestTooltip: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingLineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData1, xName: "x", yName: "y", name: "Canada", width: 2, type: "StackingLine100", marker: { visible: true, isFilled: true, shape: 'Circle', width: 7, height: 7 } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData2, xName: "x", yName: "y", name: "Algeria", width: 2, type: "StackingLine100", marker: { visible: true, isFilled: true, shape: 'Diamond', width: 7, height: 7, } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData3, xName: "x", yName: "y", name: "Ireland", width: 2, type: "StackingLine100", marker: { visible: true, isFilled: true, shape: 'Rectangle', width: 5, height: 5, } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData4, xName: "x", yName: "y", name: "Armenia", width: 3, type: "StackingLine100", marker: { isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6, } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React 100% Stacked Line Chart example visualizes the blood type distribution across different countries.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the 100% stacked line chart. This chart displays multiple series of data as stacked lines, ensuring that the cumulative proportion of each stacked element always totals 100%. ",
                    React.createElement("code", null, "Markers"),
                    " are used to represent individual data and its values."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use 100% stacking line series, we need to inject ",
                    React.createElement("code", null, "StackingLineSeries"),
                    "  module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about the stacked line series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-line", "aria-label": "Navigate to the documentation for 100% Stacked Line Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    StackedLine100.prototype.loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    StackedLine100.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    StackedLine100.prototype.legendClick = function (args) {
        if (args.series.index === 0) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[0].width = 2;
            }
            else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[0].width = 2;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[0].width = 2;
            }
            else {
                args.chart.series[0].width = 3;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[1].width = 2;
            }
            else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[1].width = 2;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[1].width = 2;
            }
            else {
                args.chart.series[1].width = 3;
                args.chart.series[0].width = 2;
            }
        }
        if (args.series.index === 2) {
            if (args.chart.series[3].visible) {
                args.chart.series[3].width = 3;
                args.chart.series[2].width = 2;
            }
            else if (!args.series.visible) {
                args.chart.series[2].width = 3;
                args.chart.series[1].width = 2;
                args.chart.series[0].width = 2;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[2].width = 2;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[2].width = 2;
            }
        }
        if (args.series.index === 3) {
            if (!args.series.visible) {
                args.chart.series[3].width = 3;
                args.chart.series[2].width = 2;
                args.chart.series[1].width = 2;
                args.chart.series[0].width = 2;
            }
            else if (args.chart.series[2].visible) {
                args.chart.series[2].width = 3;
                args.chart.series[3].width = 2;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].width = 3;
                args.chart.series[3].width = 2;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].width = 3;
                args.chart.series[3].width = 2;
            }
        }
    };
    ;
    return StackedLine100;
}(sample_base_1.SampleBase));
exports.StackedLine100 = StackedLine100;
