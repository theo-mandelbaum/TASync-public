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
exports.RTL = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for rtl series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data1 = [
    { x: 2016, y: 1000 },
    { x: 2017, y: 1170 },
    { x: 2018, y: 660 },
    { x: 2019, y: 1030 },
];
exports.data2 = [
    { x: 2016, y: 400 },
    { x: 2017, y: 460 },
    { x: 2018, y: 1120 },
    { x: 2019, y: 540 },
];
exports.data3 = [
    { x: 2016, y: 200 },
    { x: 2017, y: 250 },
    { x: 2018, y: 300 },
    { x: 2019, y: 350 },
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var RTL = /** @class */ (function (_super) {
    __extends(RTL, _super);
    function RTL() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RTL.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, load: this.load.bind(this), enableRtl: true, primaryXAxis: {
                        valueType: 'Double',
                        majorGridLines: { width: 0 },
                        minimum: 2015,
                        maximum: 2020,
                        interval: 1,
                    }, primaryYAxis: {
                        valueType: 'Double',
                        minimum: 0,
                        maximum: 1200,
                        interval: 200,
                        labelFormat: '{value}B',
                        lineStyle: { width: 0 },
                        majorTickLines: { width: 0 }
                    }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Company Performance", loaded: this.onChartLoad.bind(this), axisLabelRender: this.labelRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "x", yName: "y", name: "Sales", type: "Column" }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: "x", yName: "y", name: "Expense", type: "Column" }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: "x", yName: "y", name: "Profit", type: "Column" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the company performance with default column chart in RTL direction. The values of the data points are displayed in a tooltip, and the legend in the sample displays information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    React.createElement("code", null, "Right-to-left"),
                    "(RTL) is used to render the component from right to left direction and it can be enabled by setting ",
                    React.createElement("code", null, "enableRtl"),
                    " property as ",
                    React.createElement("b", null, "true"),
                    ". In this demo, you can see ",
                    React.createElement("code", null, "axis"),
                    ", ",
                    React.createElement("code", null, "data points"),
                    ", ",
                    React.createElement("code", null, "tooltip"),
                    " and ",
                    React.createElement("code", null, "legend"),
                    " are aligned from right to left direction."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltip"),
                    " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject",
                    React.createElement("code", null, "ColumnSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("br", null),
                React.createElement("p", null,
                    "More information about the numeric axis can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column", "aria-label": "Navigate to the documentation for Column Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    RTL.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    RTL.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    RTL.prototype.labelRender = function (args) {
        if (args.axis.orientation === 'Horizontal') {
            args.cancel = args.value === 2015 || args.value === 2020;
        }
    };
    return RTL;
}(sample_base_1.SampleBase));
exports.RTL = RTL;
