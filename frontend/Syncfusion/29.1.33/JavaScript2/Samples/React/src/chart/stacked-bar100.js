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
exports.StackedBar100 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for 100 percent StackingBar Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: '2020', y: 466 },
    { x: '2021', y: 656 },
    { x: '2022', y: 763 },
    { x: '2023', y: 886 }
];
exports.data2 = [
    { x: '2020', y: 261 },
    { x: '2021', y: 327 },
    { x: '2022', y: 427 },
    { x: '2023', y: 584 }
];
exports.data3 = [
    { x: '2020', y: 1355 },
    { x: '2021', y: 1340 },
    { x: '2022', y: 1352 },
    { x: '2023', y: 1286 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedBar100 = /** @class */ (function (_super) {
    __extends(StackedBar100, _super);
    function StackedBar100() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedBar100.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, primaryYAxis: { lineStyle: { width: 0 }, majorTickLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, load: this.load.bind(this), title: 'Annual Renewable Energy Generation in China (2020\u20132023) by Source', subTitle: 'Source: wikipedia.org', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, enableHighlight: true, header: '<b>Renewable Energy Generation</b>' }, legendClick: this.onLegendClick.bind(this), tooltipRender: this.tooltipRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingBarSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', border: { width: 1, color: "white" }, columnWidth: 0.6, name: 'Wind', type: 'StackingBar100', legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', border: { width: 1, color: "white" }, columnWidth: 0.6, name: 'Solar', type: 'StackingBar100', legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', border: { width: 1, color: "white" }, columnWidth: 0.6, name: 'Hydro', type: 'StackingBar100', cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React 100% stacked bar chart example visualizes the comparison of renewable energy generation in China from 2020 to 2023, segmented by wind, solar, and hydro sources, using a default 100% stacked bar series. The legend provides additional information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the 100% stacked bar chart. The 100% stacked bar chart displays multiple series of data as stacked bars, ensuring that the cumulative value of each stacked element always totals 100%."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use 100% stacking bar series, we need to inject ",
                    React.createElement("code", null, "StackingBarSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the 100% stacking bar series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stacked-bar", "aria-label": "Navigate to the documentation for 100% Stacked Bar Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    StackedBar100.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    StackedBar100.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    StackedBar100.prototype.onLegendClick = function (args) {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }
        if (args.series.index === 2) {
            if (!args.series.visible) {
                args.chart.series[2].cornerRadius.bottomRight = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.bottomRight = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.bottomRight = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.bottomRight = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.bottomRight = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.bottomRight = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
    };
    ;
    StackedBar100.prototype.tooltipRender = function (args) {
        if (args.text) {
            var value = args.point.y.toLocaleString('en-US');
            args.text = "".concat(args.series.name, ": <b>").concat(value, "TWh (").concat(args.point.percentage, "%)</b>");
        }
    };
    ;
    return StackedBar100;
}(sample_base_1.SampleBase));
exports.StackedBar100 = StackedBar100;
