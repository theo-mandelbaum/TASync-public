"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.rangeBarData = void 0;
/**
 * Sample for the Range Bar Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.rangeBarData = [
    { country: 'Solomon Islands', low: 44, high: 134 },
    { country: 'Tonga', low: 52, high: 131 },
    { country: 'Trinidad and Tobago', low: 36, high: 151 },
    { country: 'Samoa', low: 49, high: 131 },
    { country: 'Saint Lucia', low: 39, high: 148 },
    { country: 'Georgia', low: 68, high: 122 },
    { country: 'Peru', low: 56, high: 141 },
    { country: 'Grenada', low: 41, high: 147 },
    { country: 'Dominica', low: 46, high: 143 },
    { country: 'Ukraine', low: 64, high: 148 },
    { country: 'Colombia', low: 64, high: 134 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var RangeBar = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, primaryYAxis: { labelFormat: '{value}', minimum: 0, maximum: 200, interval: 20, edgeLabelPlacement: 'Shift', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, title: 'Growth in Visa-Free Destinations', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0 }, title: 'Global Passport Rankings: Growth in Visa-Free Access (2006\u20132024)', subTitle: 'Source: wikipedia.org', loaded: onChartLoad.bind(_this), load: load.bind(_this), isTransposed: true, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: true, format: '${point.x}: <b>${point.low} - ${point.high}</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.RangeColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.rangeBarData, marker: { dataLabel: { visible: true, position: 'Outer' } }, xName: 'country', low: 'low', high: 'high', type: 'RangeColumn', cornerRadius: { topLeft: 4, topRight: 4, bottomLeft: 4, bottomRight: 4 }, columnSpacing: 0.4 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visually represents changes in visa-free access for various countries using an inverted Range Column chart. It highlights the countries that have experienced the most significant increases and decreases over the past decade.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the range column chart in an inverted manner. You can use ",
                React.createElement("code", null, "isTransposed"),
                " property to invert your chart."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
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
exports.default = RangeBar;
