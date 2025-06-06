"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { Period: new Date(2021, 10, 14), US_InflationRate: 2.2, IN_InflationRate: 0.8 }, { Period: new Date(2021, 10, 15), US_InflationRate: 2.0, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 16), US_InflationRate: 2.8, IN_InflationRate: 1.8 },
    { Period: new Date(2021, 10, 17), US_InflationRate: 1.6, IN_InflationRate: 2.1 }, { Period: new Date(2021, 10, 18), US_InflationRate: 2.3, IN_InflationRate: null }, { Period: new Date(2021, 10, 19), US_InflationRate: 2.5, IN_InflationRate: 2.3 },
    { Period: new Date(2021, 10, 20), US_InflationRate: 2.9, IN_InflationRate: 1.7 }, { Period: new Date(2021, 10, 21), US_InflationRate: 1.1, IN_InflationRate: 1.5 }, { Period: new Date(2021, 10, 22), US_InflationRate: 1.4, IN_InflationRate: 0.5 },
    { Period: new Date(2021, 10, 23), US_InflationRate: 1.1, IN_InflationRate: 1.3 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Area empty sample
 */
var AreaEmpty = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', labelFormat: 'dd MMM', minimum: new Date(2021, 10, 14), maximum: new Date(2021, 10, 23), majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, primaryYAxis: { labelFormat: '{value}MB', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, minimum: 0, maximum: 5, interval: 1 }, tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>', enableHighlight: true, showNearestTooltip: true }, legendSettings: { enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Data Consumption", loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "Period", yName: "US_InflationRate", name: "Andrew", opacity: 0.5, marker: { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }, type: "Area", width: 2, border: { width: 2 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "Period", yName: "IN_InflationRate", name: "Thomas", marker: { visible: true, height: 7, width: 7, shape: 'Circle', isFilled: true }, opacity: 0.5, type: "Area", width: 2, border: { width: 2 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates an area series with empty points. Data points with null points are shown here.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render an area series with empty points. Also, a legend is enabled in the shape of the series."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject ",
                React.createElement("code", null, "AreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the area series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data#empty-points", "aria-label": "Navigate to the documentation for Empty points in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = AreaEmpty;
