"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for scatter series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var scatter_data_1 = require("./scatter-data");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Scatter = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { minimum: 40, maximum: 56, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', title: 'Shoulder Breadth (cm)' }, primaryYAxis: { majorTickLines: { width: 0 }, minimum: 70, maximum: 140, interval: 10, lineStyle: { width: 0 }, title: 'Bust Chest Circumference (cm)', rangePadding: 'None' }, load: load.bind(_this), loaded: onChartLoad.bind(_this), legendSettings: { visible: true, enableHighlight: true }, tooltip: { enable: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } } },
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
                "Chart component features are segregated into individual feature-wise modules. To use scatter series, we need to inject ",
                React.createElement("code", null, "ScatterSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the scatter series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/scatter", "aria-label": "Navigate to the documentation for Scatter in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Scatter;
