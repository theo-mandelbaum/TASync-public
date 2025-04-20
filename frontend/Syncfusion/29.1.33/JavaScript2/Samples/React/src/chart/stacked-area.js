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
exports.StackedArea = exports.data4 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for Stacked Area series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
exports.data1 = [
    { x: new Date(2000, 0, 1), y: 0.61 }, { x: new Date(2001, 0, 1), y: 0.81 }, { x: new Date(2002, 0, 1), y: 0.91 },
    { x: new Date(2003, 0, 1), y: 1 }, { x: new Date(2004, 0, 1), y: 1.19 }, { x: new Date(2005, 0, 1), y: 1.47 },
    { x: new Date(2006, 0, 1), y: 1.74 }, { x: new Date(2007, 0, 1), y: 1.98 }, { x: new Date(2008, 0, 1), y: 1.99 },
    { x: new Date(2009, 0, 1), y: 1.7 }, { x: new Date(2010, 0, 1), y: 1.48 }, { x: new Date(2011, 0, 1), y: 1.38 },
    { x: new Date(2012, 0, 1), y: 1.66 }, { x: new Date(2013, 0, 1), y: 1.66 }, { x: new Date(2014, 0, 1), y: 1.67 },
];
exports.data2 = [
    { x: new Date(2000, 0, 1), y: 0.03 }, { x: new Date(2001, 0, 1), y: 0.05 }, { x: new Date(2002, 0, 1), y: 0.06 },
    { x: new Date(2003, 0, 1), y: 0.09 }, { x: new Date(2004, 0, 1), y: 0.14 }, { x: new Date(2005, 0, 1), y: 0.2 },
    { x: new Date(2006, 0, 1), y: 0.29 }, { x: new Date(2007, 0, 1), y: 0.46 }, { x: new Date(2008, 0, 1), y: 0.64 },
    { x: new Date(2009, 0, 1), y: 0.75 }, { x: new Date(2010, 0, 1), y: 1.06 }, { x: new Date(2011, 0, 1), y: 1.25 },
    { x: new Date(2012, 0, 1), y: 1.55 }, { x: new Date(2013, 0, 1), y: 1.55 }, { x: new Date(2014, 0, 1), y: 1.65 },
];
exports.data3 = [
    { x: new Date(2000, 0, 1), y: 0.48 }, { x: new Date(2001, 0, 1), y: 0.53 }, { x: new Date(2002, 0, 1), y: 0.57 },
    { x: new Date(2003, 0, 1), y: 0.61 }, { x: new Date(2004, 0, 1), y: 0.63 }, { x: new Date(2005, 0, 1), y: 0.64 },
    { x: new Date(2006, 0, 1), y: 0.66 }, { x: new Date(2007, 0, 1), y: 0.76 }, { x: new Date(2008, 0, 1), y: 0.77 },
    { x: new Date(2009, 0, 1), y: 0.55 }, { x: new Date(2010, 0, 1), y: 0.54 }, { x: new Date(2011, 0, 1), y: 0.57 },
    { x: new Date(2012, 0, 1), y: 0.61 }, { x: new Date(2013, 0, 1), y: 0.67 }, { x: new Date(2014, 0, 1), y: 0.67 },
];
exports.data4 = [
    { x: new Date(2000, 0, 1), y: 0.23 }, { x: new Date(2001, 0, 1), y: 0.17 }, { x: new Date(2002, 0, 1), y: 0.17 },
    { x: new Date(2003, 0, 1), y: 0.2 }, { x: new Date(2004, 0, 1), y: 0.23 }, { x: new Date(2005, 0, 1), y: 0.36 },
    { x: new Date(2006, 0, 1), y: 0.43 }, { x: new Date(2007, 0, 1), y: 0.52 }, { x: new Date(2008, 0, 1), y: 0.72 },
    { x: new Date(2009, 0, 1), y: 1.29 }, { x: new Date(2010, 0, 1), y: 1.38 }, { x: new Date(2011, 0, 1), y: 1.82 },
    { x: new Date(2012, 0, 1), y: 2.16 }, { x: new Date(2013, 0, 1), y: 2.51 }, { x: new Date(2014, 0, 1), y: 2.61 },
];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var StackedArea = /** @class */ (function (_super) {
    __extends(StackedArea, _super);
    function StackedArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StackedArea.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', intervalType: 'Years', majorGridLines: { width: 0 }, labelFormat: 'y', edgeLabelPlacement: 'Shift' }, load: this.load.bind(this), primaryYAxis: { title: 'Amount of sales in €', minimum: 0, maximum: 7, interval: 1, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, labelFormat: '{value}k' }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { enableHighlight: true }, title: "Amount of Sales by Payment Method", loaded: this.onChartLoad.bind(this), tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingAreaSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "x", yName: "y", opacity: 1, name: "Bank-Transfer", type: "StackingArea", border: { width: 2, color: '#666666' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: "x", yName: "y", opacity: 1, name: "Credit Card", type: "StackingArea", border: { width: 2, color: '#666666' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: "x", yName: "y", opacity: 1, name: "Debit Card", type: "StackingArea", border: { width: 2, color: '#666666' } }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data4, xName: "x", yName: "y", opacity: 1, name: "Cash", type: "StackingArea", border: { width: 2, color: '#666666' } }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "https://www.gov.uk/", target: '_blank', "aria-label": "Navigate to the documentation for gov" }, "www.gov.uk"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Stacked Area example visualizes the amount of sales by payment mode with default stacked area series. A legend in the sample shows information about the series.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure the stacked area chart. This chart visualizes data with y-values stacked one over another in a series order. It shows the relationship between individual values to the total sum of points."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use stacking area series, we need to inject",
                    React.createElement("code", null, "StackingAreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information about stacked area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-area", "aria-label": "Navigate to the documentation for Stacked Area Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    StackedArea.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    StackedArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return StackedArea;
}(sample_base_1.SampleBase));
exports.StackedArea = StackedArea;
