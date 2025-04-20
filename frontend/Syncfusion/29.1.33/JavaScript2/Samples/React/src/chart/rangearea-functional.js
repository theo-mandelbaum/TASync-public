"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Range Area Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var financial_data_1 = require("./financial-data");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var RangeArea = function () {
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
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, load: load.bind(_this), primaryXAxis: { valueType: 'DateTime', labelFormat: 'dd MMM', majorGridLines: { width: 0 }, edgeLabelPlacement: (ej2_base_1.Browser.isDevice) ? 'Shift' : 'Hide' }, legendSettings: { visible: false }, primaryYAxis: { labelFormat: '{value}˚C', minimum: -10, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Temperature Variation by Month", loaded: onChartLoad.bind(_this), tooltip: { enable: true, shared: false, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', showNearestTooltip: true } },
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
                "Chart component features are segregated into individual feature-wise modules. To use range area series, we need to inject ",
                React.createElement("code", null, "RangeAreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about area type series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/range-area", "aria-label": "Navigate to the documentation for Range Area in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = RangeArea;
