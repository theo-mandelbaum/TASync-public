"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeColumnData = void 0;
/**
 * Sample for the Range Column Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.rangeColumnData = [
    { month: 'Jan', min: 22.75, max: 41.02, text: 'January' },
    { month: 'Feb', min: 29.71, max: 51.93, text: 'February' },
    { month: 'Mar', min: 33.53, max: 56.39, text: 'March' },
    { month: 'Apr', min: 41.22, max: 66.06, text: 'April' },
    { month: 'May', min: 49.87, max: 74.64, text: 'May' },
    { month: 'Jun', min: 59.02, max: 84.58, text: 'June' },
    { month: 'Jul', min: 62.94, max: 88.43, text: 'July' },
    { month: 'Aug', min: 61.27, max: 86.72, text: 'August' },
    { month: 'Sep', min: 55.36, max: 81.86, text: 'September' },
    { month: 'Oct', min: 44.76, max: 73.13, text: 'October' },
    { month: 'Nov', min: 34.79, max: 55.54, text: 'November' },
    { month: 'Dec', min: 28.04, max: 48.36, text: 'December' }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var RangeColumn = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, primaryYAxis: { labelFormat: '{value}°F', minimum: 0, maximum: 100, interval: 20, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, title: 'Monthly Temperature Variation (°F)' }, title: 'Contiguous U.S. Average Temperature in 2024', subTitle: 'Source: ncei.noaa.gov', loaded: onChartLoad.bind(_this), load: load.bind(_this), chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: true, header: '<b>${point.tooltip}</b>', format: 'Temperature : <b>${point.low} - ${point.high}</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.rangeColumnData, marker: { dataLabel: { visible: true, position: 'Outer' } }, xName: 'month', low: 'min', high: 'max', type: 'RangeColumn', cornerRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 }, columnSpacing: 0.4, tooltipMappingName: 'text' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the Range Column series, highlighting the maximum and minimum temperature changes in the Contiguous U.S. for the year 2024 over different months.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the range column chart. The range column chart is used to display a range of data by plotting two y-values per data point. The two y-values are used as the upper and lower bounds of a column."),
            React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "chart component features are segregated into individual feature-wise modules. To use range column series, we need to Injecting ",
                React.createElement("code", null, "RangeColumnSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the range column series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-column", "aria-label": "Navigate to the documentation for Range Column in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = RangeColumn;
