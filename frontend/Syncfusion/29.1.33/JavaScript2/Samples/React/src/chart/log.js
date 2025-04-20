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
exports.LogAxis = exports.data = void 0;
/**
 * Samples for Logarithmic Axis
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.data = [
    { x: new Date(1995, 0, 1), y: 80 },
    { x: new Date(1996, 0, 1), y: 200 },
    { x: new Date(1997, 0, 1), y: 400 },
    { x: new Date(1998, 0, 1), y: 600 },
    { x: new Date(1999, 0, 1), y: 700 },
    { x: new Date(2000, 0, 1), y: 1400 },
    { x: new Date(2001, 0, 1), y: 2000 },
    { x: new Date(2002, 0, 1), y: 4000 },
    { x: new Date(2003, 0, 1), y: 6000 },
    { x: new Date(2004, 0, 1), y: 8000 },
    { x: new Date(2005, 0, 1), y: 11000 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n\t}";
var LogAxis = /** @class */ (function (_super) {
    __extends(LogAxis, _super);
    function LogAxis() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    LogAxis.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { labelFormat: 'y', valueType: 'DateTime', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, load: this.load.bind(this), primaryYAxis: { valueType: 'Logarithmic', edgeLabelPlacement: 'Shift', minorTicksPerInterval: 5, majorGridLines: { width: 1.5 }, minorTickLines: { width: 0, height: 4 }, minimum: 0, maximum: 100000, interval: 1, labelFormat: '${value}', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Product X Growth [1995-2005]', loaded: this.onChartLoad.bind(this), tooltip: { enable: true, header: '', showNearestTooltip: true, enableHighlight: true }, chartArea: { border: { width: 0 } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: 'x', name: 'Product X', yName: 'y', type: 'Line', width: 2, marker: { visible: true, height: 7, width: 7, isFilled: true } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows a logarithmic axis in a chart with data about the sales of a product between 1995 and 2005.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "Logarithmic axis uses logarithmic scale and it is very useful in visualizing when the data has values with both lower order of magnitude (eg: 10^-6) and higher order of magnitude (eg: 10^6). To render Logarithmic axis, set ",
                    React.createElement("code", null, "valueType"),
                    " in axis to ",
                    React.createElement("b", null, "Logarithmic"),
                    "."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use Logarithmic axis, we need to inject",
                    React.createElement("code", null, "Logarithmic"),
                    " module using ",
                    React.createElement("code", null, "servives"),
                    "."),
                React.createElement("p", null,
                    "More information on the Logarithmic axis can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/logarithmic-axis/", "aria-label": "Navigate to the documentation for Logarithmic axis in React Chart component" }, "documentation section"),
                    "."))));
    };
    LogAxis.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    LogAxis.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return LogAxis;
}(sample_base_1.SampleBase));
exports.LogAxis = LogAxis;
