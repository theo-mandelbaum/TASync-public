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
exports.StepLineWithoutRiser = exports.data1 = void 0;
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
/**
 * StepArea Series
 */
exports.data1 = [
    { x: new Date(1980, 0, 1), y: 23 },
    { x: new Date(1981, 0, 1), y: 89 },
    { x: new Date(1982, 0, 1), y: 45 },
    { x: new Date(1983, 0, 1), y: 67 },
    { x: new Date(1984, 0, 1), y: 76 },
    { x: new Date(1985, 0, 1), y: 34 },
    { x: new Date(1986, 0, 1), y: 90 },
    { x: new Date(1987, 0, 1), y: 65 },
    { x: new Date(1988, 0, 1), y: 77 },
    { x: new Date(1989, 0, 1), y: 43 },
    { x: new Date(1990, 0, 1), y: 92 },
    { x: new Date(1991, 0, 1), y: 81 },
    { x: new Date(1992, 0, 1), y: 65 },
    { x: new Date(1993, 0, 1), y: 87 },
    { x: new Date(1994, 0, 1), y: 50 },
    { x: new Date(1995, 0, 1), y: 98 },
    { x: new Date(1996, 0, 1), y: 62 },
    { x: new Date(1997, 0, 1), y: 75 },
    { x: new Date(1998, 0, 1), y: 64 },
    { x: new Date(1999, 0, 1), y: 88 },
    { x: new Date(2000, 0, 1), y: 99 },
    { x: new Date(2001, 0, 1), y: 77 },
    { x: new Date(2002, 0, 1), y: 65 },
    { x: new Date(2003, 0, 1), y: 89 },
    { x: new Date(2004, 0, 1), y: 45 },
    { x: new Date(2005, 0, 1), y: 67 },
    { x: new Date(2006, 0, 1), y: 56 },
    { x: new Date(2007, 0, 1), y: 78 },
    { x: new Date(2008, 0, 1), y: 82 },
    { x: new Date(2009, 0, 1), y: 90 },
    { x: new Date(2010, 0, 1), y: 55 },
    { x: new Date(2011, 0, 1), y: 65 },
    { x: new Date(2012, 0, 1), y: 87 },
    { x: new Date(2013, 0, 1), y: 76 },
    { x: new Date(2014, 0, 1), y: 45 },
    { x: new Date(2015, 0, 1), y: 67 },
    { x: new Date(2016, 0, 1), y: 89 },
    { x: new Date(2017, 0, 1), y: 76 },
    { x: new Date(2018, 0, 1), y: 45 },
    { x: new Date(2019, 0, 1), y: 67 },
    { x: new Date(2020, 0, 1), y: 89 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StepLineWithoutRiser = /** @class */ (function (_super) {
    __extends(StepLineWithoutRiser, _super);
    function StepLineWithoutRiser() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepLineWithoutRiser.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    StepLineWithoutRiser.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    StepLineWithoutRiser.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: {
                        valueType: 'DateTime',
                        labelFormat: 'yyyy',
                        intervalType: 'Years',
                        edgeLabelPlacement: 'Shift',
                        minimum: new Date(1980, 0, 1),
                        maximum: new Date(2020, 0, 1),
                        majorGridLines: { width: 0 },
                        minorTickLines: { width: 0 },
                        interval: 4,
                        labelIntersectAction: 'Rotate90'
                    }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), primaryYAxis: {
                        title: 'Sales in Units',
                        labelFormat: '{value}',
                        lineStyle: { width: 0 },
                        minimum: 0,
                        maximum: 100,
                        interval: 20,
                        majorTickLines: { width: 0 }
                    }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 } }, tooltip: { enable: true, showNearestTooltip: true }, legendSettings: { visible: false }, title: 'Sales of Product Over Time' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', type: 'StepArea', name: 'Product Sales', opacity: 0.1, border: { width: 2.5 }, noRisers: true, step: 'Center' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This Step Area Chart example visualizes the sales data of a product over a 50-year period using the default step area series without risers.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a step area chart without vertical risers. The",
                    React.createElement("code", null, "noRisers"),
                    " feature allows the series to appear as a continuous flow without showing vertical lines between points. This approach can be useful for highlighting trends without the distraction of risers."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", { style: { fontWeight: 500 } },
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use step area series, you need to inject the ",
                    React.createElement("code", null, "StepAreaSeries"),
                    " module using the ",
                    React.createElement("code", null, "Chart.Inject(StepAreaSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the step area series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/chart/Chart-types/step-area" }, "documentation section"),
                    "."))));
    };
    return StepLineWithoutRiser;
}(sample_base_1.SampleBase));
exports.StepLineWithoutRiser = StepLineWithoutRiser;
