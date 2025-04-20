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
exports.Scatter = void 0;
/**
 * Sample for scatter series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var scatter_data_1 = require("./scatter-data");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Scatter = /** @class */ (function (_super) {
    __extends(Scatter, _super);
    function Scatter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Scatter.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { minimum: 40, maximum: 56, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', title: 'Shoulder Breadth (cm)' }, primaryYAxis: { majorTickLines: { width: 0 }, minimum: 70, maximum: 140, interval: 10, lineStyle: { width: 0 }, title: 'Bust Chest Circumference (cm)', rangePadding: 'None' }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), legendSettings: { visible: true, enableHighlight: true }, tooltip: { enable: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getCluster1Value, width: 2, xName: 'Breadth', yName: 'Circumference', name: '18-20 Years', type: 'Scatter', marker: { visible: false, width: 10, height: 10, shape: 'Circle' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getCluster2Value, xName: 'Breadth', yName: 'Circumference', name: '21-25 Years', type: 'Scatter', marker: { visible: false, width: 10, height: 10, shape: 'Circle' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getCluster3Value, xName: 'Breadth', yName: 'Circumference', name: '26-30 Years', type: 'Scatter', marker: { visible: false, width: 10, height: 10, shape: 'Circle' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getCluster4Value, xName: 'Breadth', yName: 'Circumference', name: '31-35 years', type: 'Scatter', marker: { visible: false, width: 10, height: 10, shape: 'Circle' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: scatter_data_1.scatterData.getCluster5Value, xName: 'Breadth', yName: 'Circumference', name: '36+ Years', type: 'Scatter', marker: { visible: false, width: 10, height: 10, shape: 'Circle' } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React scatter plot chart example compares the shoulder and chest measurements for different age groups using the default scatter series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the scatter chart. The scatter chart is used to plot data with two numeric parameters. You can use the ",
                    React.createElement("code", null, "Shape"),
                    " property in the marker to change the scatter shape."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject",
                    React.createElement("code", null, "ScatterSeries"),
                    " module into",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the scatter series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/scatter", "aria-label": "Navigate to the documentation for Scatter in React Chart component" }, "documentation section"),
                    "."))));
    };
    Scatter.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Scatter.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return Scatter;
}(sample_base_1.SampleBase));
exports.Scatter = Scatter;
