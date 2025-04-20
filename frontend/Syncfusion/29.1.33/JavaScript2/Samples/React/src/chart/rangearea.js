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
exports.RangeArea = void 0;
/**
 * Sample for Range Area Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var financial_data_1 = require("./financial-data");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var RangeArea = /** @class */ (function (_super) {
    __extends(RangeArea, _super);
    function RangeArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    RangeArea.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, load: this.load.bind(this), primaryXAxis: { valueType: 'DateTime', labelFormat: 'dd MMM', majorGridLines: { width: 0 }, edgeLabelPlacement: (ej2_base_1.Browser.isDevice) ? 'Shift' : 'Hide' }, legendSettings: { visible: false }, primaryYAxis: { labelFormat: '{value}˚C', minimum: -10, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Temperature Variation by Month", loaded: this.onChartLoad.bind(this), tooltip: { enable: true, shared: false, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', showNearestTooltip: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeAreaSeries, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartDataValues, enableTooltip: true, border: { width: 2 }, xName: "x", high: "high", opacity: 0.4, marker: { visible: false, height: 7, width: 7, opacity: 1, dataLabel: { visible: false, position: 'Outer' } }, low: "low", animation: { enable: true }, type: "RangeArea" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, " This React Range Area Chart example visualizes minimum and maximum temperatures of different days with default range area series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, " In this example, you can see how to render and configure the range area chart. This chart is used to display continuous data points as a set of lines varying between high and low values over time intervals and across different categories."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use range area series, we need to inject",
                    React.createElement("code", null, "RangeAreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about area type series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-area", "aria-label": "Navigate to the documentation for Range Area in React Chart component" }, "documentation section"),
                    "."))));
    };
    RangeArea.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    RangeArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    RangeArea.prototype.seriesRender = function (args) {
        var areathemes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast', 'fluent', 'fluentdark', 'fluent2', 'fluent2highcontrast', 'fluent2dark', 'tailwind3', 'tailwind3dark'];
        var borderColor = ['#FD7E14', '#FD7E14', '#5A61F6', '#8B5CF6', '#00bdae', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4', '#1AC9E6', '#1AC9E6', '#6200EE', '#9BB449', '#9BB449', '#2F4074', '#8029F1'];
        args.series.border.color = borderColor[areathemes.indexOf(args.series.chart.theme.toLowerCase())];
    };
    return RangeArea;
}(sample_base_1.SampleBase));
exports.RangeArea = RangeArea;
