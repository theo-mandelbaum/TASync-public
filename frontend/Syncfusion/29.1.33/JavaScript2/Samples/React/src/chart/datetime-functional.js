"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for DateTime axis
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: new Date(2016, 3, 1), y: 6.3 },
    { x: new Date(2016, 4, 1), y: 13.3 }, { x: new Date(2016, 5, 1), y: 18.0 },
    { x: new Date(2016, 6, 1), y: 19.8 }, { x: new Date(2016, 7, 1), y: 18.1 },
    { x: new Date(2016, 8, 1), y: 13.1 }, { x: new Date(2016, 9, 1), y: 4.1 }
];
exports.data2 = [
    { x: new Date(2016, 3, 1), y: -5.3 },
    { x: new Date(2016, 4, 1), y: 1.0 }, { x: new Date(2016, 5, 1), y: 6.9 },
    { x: new Date(2016, 6, 1), y: 9.4 }, { x: new Date(2016, 7, 1), y: 7.6 },
    { x: new Date(2016, 8, 1), y: 2.6 }, { x: new Date(2016, 9, 1), y: -4.9 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var DateTimeAxis = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', intervalType: 'Days', labelFormat: 'MMM d', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, load: load.bind(_this), primaryYAxis: { minimum: -20, maximum: 30, interval: 10, edgeLabelPlacement: 'Shift', labelFormat: '{value}°C', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: false }, title: 'Alaska Weather Statistics - 2016', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Warmest', type: 'Line', marker: { visible: true, height: 8, width: 8, shape: 'Pentagon', isFilled: true, dataLabel: { visible: true, position: 'Top' } }, width: 2 }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'Coldest', type: 'Line', marker: { visible: true, height: 8, width: 8, shape: 'Pentagon', isFilled: true, dataLabel: { visible: true, position: 'Top' } }, width: 2 }))),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                "Source: \u00A0",
                React.createElement("a", { href: "http://www.yr.no/place/USA/Alaska/Hatcher_Pass/statistics.html", target: "_blank", "aria-label": "Navigate to the documentation for yr" }, "www.yr.no"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the date-time axis in a chart with a weather report for the year 2016.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The date-time axis uses a date-time scale and displays date-time values as the axis labels. To use a date-time axis, set the ",
                React.createElement("code", null, "ValueType"),
                " in axis to ",
                React.createElement("b", null, "DateTime"),
                "."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use DateTime axis, we need to inject ",
                React.createElement("code", null, "DateTime"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the DateTime axis can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/date-time-axis/#datetime-axis", "aria-label": "Navigate to the documentation for Date Time Axis in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = DateTimeAxis;
