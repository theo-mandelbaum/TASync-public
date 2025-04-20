"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for numeric axis
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 16, y: 2 }, { x: 17, y: 14 },
    { x: 18, y: 7 }, { x: 19, y: 7 },
    { x: 20, y: 10 }
];
exports.data2 = [
    { x: 16, y: 7 }, { x: 17, y: 7 },
    { x: 18, y: 11 }, { x: 19, y: 8 },
    { x: 20, y: 24 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Numeric = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        var selectedTheme = (0, theme_color_1.loadChartTheme)(args);
        if (selectedTheme === 'HighContrast') {
            args.chart.series[0].fill = '#57BCFF';
            args.chart.series[1].fill = '#E58184';
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { minimum: 15, maximum: 21, interval: 1, majorGridLines: { width: 0 } }, load: load.bind(_this), primaryYAxis: { majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' } }, legendSettings: { visible: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, title: 'England vs West Indies', loaded: onChartLoad.bind(_this), tooltip: { enable: true, format: '${point.x}th Over : <b>${point.y} Runs</b>', enableHighlight: true } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', fill: '#1e90ff', marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600' } } }, name: 'England', type: 'Column', width: 2, columnSpacing: 0.1 }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', fill: '#b22222', marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600' } } }, name: 'West Indies', type: 'Column', width: 2, columnSpacing: 0.1 }))),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                "Source: \u00A0",
                React.createElement("a", { href: "http://www.espncricinfo.com/icc-world-twenty20-2016/engine/current/match/951373.html", target: "_blank", "aria-label": "Navigate to the documentation for espncricinfo" }, "www.espncricinfo.com"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the numeric axis in a chart with England and West Indies cricket match data.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "You can use a numeric axis to represent numeric value data in a chart. To render a numeric axis, set the ",
                React.createElement("code", null, "ValueType"),
                " in axis to ",
                React.createElement("b", null, "Double"),
                "."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                "More information on the Numeric axis can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/numeric-axis/", "aria-label": "Navigate to the documentation for Numeric Axis in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Numeric;
