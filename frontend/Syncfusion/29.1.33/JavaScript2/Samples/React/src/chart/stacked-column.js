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
exports.StackedColumn = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Stacking Column series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 24.3 },
        { x: '2022', y: 26.3 },
        { x: '2023', y: 25.4 },
        { x: '2024', y: 25 }
    ] :
    [
        { x: '2019', y: 28.5 },
        { x: '2020', y: 27.5 },
        { x: '2021', y: 24.3 },
        { x: '2022', y: 26.3 },
        { x: '2023', y: 25.4 },
        { x: '2024', y: 25 }
    ];
exports.data2 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 26.7 },
        { x: '2022', y: 30.8 },
        { x: '2023', y: 27.4 },
        { x: '2024', y: 31 }
    ] :
    [
        { x: '2019', y: 26.9 },
        { x: '2020', y: 29.3 },
        { x: '2021', y: 26.7 },
        { x: '2022', y: 30.8 },
        { x: '2023', y: 27.4 },
        { x: '2024', y: 31 }
    ];
exports.data3 = ej2_base_1.Browser.isDevice ?
    [
        { x: '2021', y: 17.5 },
        { x: '2022', y: 14.5 },
        { x: '2023', y: 12.1 },
        { x: '2024', y: 14.4 }
    ] :
    [
        { x: '2019', y: 19.9 },
        { x: '2020', y: 14.6 },
        { x: '2021', y: 17.5 },
        { x: '2022', y: 14.5 },
        { x: '2023', y: 12.1 },
        { x: '2024', y: 14.4 }
    ];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StackedColumn = /** @class */ (function (_super) {
    __extends(StackedColumn, _super);
    function StackedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedColumn.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }, primaryXAxis: { majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, lineStyle: { width: 0 }, labelIntersectAction: 'Rotate45', valueType: 'Category' }, primaryYAxis: { title: 'Production (60KG Bags)', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}M', interval: 20 }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: this.load.bind(this), title: 'Global Cotton Production by Country (2018\u20132023)', subTitle: 'Source: fas.usda.gov', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, enableHighlight: true, header: '<b>${point.x}</b>', format: '${series.name} : <b>${point.y}</b>' }, legendClick: this.onLegendClick.bind(this), stackLabels: { visible: true, format: '{value}M', font: { size: ej2_base_1.Browser.isDevice ? '10px' : '12px' } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'India', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn', marker: { dataLabel: { visible: true, font: { size: ej2_base_1.Browser.isDevice ? '10px' : '12px' } } }, legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'China', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn', marker: { dataLabel: { visible: true, font: { size: ej2_base_1.Browser.isDevice ? '10px' : '12px' } } }, legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: 'x', yName: 'y', name: 'United States', columnWidth: 0.4, border: { width: 1, color: "white" }, type: 'StackingColumn', cornerRadius: { topLeft: 4, topRight: 4 }, marker: { dataLabel: { visible: true, font: { size: ej2_base_1.Browser.isDevice ? '10px' : '12px' } } }, legendShape: 'Rectangle' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This stacked column chart visualizes global cotton production trends over the years, with data points enhanced by data labels.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a stacked column chart. The stacked column chart stacks points in the series vertically. You can also use the ",
                    React.createElement("code", null, "stackingGroup"),
                    " property to group stacked collections based on category. This chart displays data labels for individual points and the total value on top of each stack."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use stacking column series, we need to inject ",
                    React.createElement("code", null, "StackingColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the stacked column series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-column", "aria-label": "Navigate to the documentation for Stacked Column Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    StackedColumn.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    StackedColumn.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    StackedColumn.prototype.onLegendClick = function (args) {
        if (args.series.index === 0) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
            }
        }
        if (args.series.index === 1) {
            if (args.chart.series[2].visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
            }
            else {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
        }
        if (args.series.index === 2) {
            if (!args.series.visible) {
                args.chart.series[2].cornerRadius.topLeft = 4;
                args.chart.series[2].cornerRadius.topRight = 4;
                args.chart.series[1].cornerRadius.topLeft = 0;
                args.chart.series[1].cornerRadius.topRight = 0;
                args.chart.series[0].cornerRadius.topLeft = 0;
                args.chart.series[0].cornerRadius.topRight = 0;
            }
            else if (args.chart.series[1].visible) {
                args.chart.series[1].cornerRadius.topLeft = 4;
                args.chart.series[1].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
            else if (args.series.visible && args.chart.series[0].visible) {
                args.chart.series[0].cornerRadius.topLeft = 4;
                args.chart.series[0].cornerRadius.topRight = 4;
                args.chart.series[2].cornerRadius.topLeft = 0;
                args.chart.series[2].cornerRadius.topRight = 0;
            }
        }
    };
    ;
    return StackedColumn;
}(sample_base_1.SampleBase));
exports.StackedColumn = StackedColumn;
