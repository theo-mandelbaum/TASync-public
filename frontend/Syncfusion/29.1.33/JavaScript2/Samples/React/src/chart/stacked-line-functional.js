"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.chartData4 = exports.chartData3 = exports.chartData2 = exports.chartData1 = void 0;
/**
 * Sample for Stacking Line series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.chartData1 = [
    { x: 2015, y: 28.2 },
    { x: 2016, y: 28.6 },
    { x: 2017, y: 46.0 },
    { x: 2018, y: 52.7 },
    { x: 2019, y: 62.0 },
    { x: 2020, y: 64.6 },
    { x: 2021, y: 60.1 },
    { x: 2022, y: 68.6 },
    { x: 2023, y: 71.81 }
];
exports.chartData2 = [
    { x: 2015, y: 15.0 },
    { x: 2016, y: 16.7 },
    { x: 2017, y: 14.2 },
    { x: 2018, y: 15.3 },
    { x: 2019, y: 16.4 },
    { x: 2020, y: 13.9 },
    { x: 2021, y: 14.8 },
    { x: 2022, y: 16.1 },
    { x: 2023, y: 16.02 }
];
exports.chartData3 = [
    { x: 2015, y: 8.1 },
    { x: 2016, y: 8.4 },
    { x: 2017, y: 7.73 },
    { x: 2018, y: 5.1 },
    { x: 2019, y: 8.7 },
    { x: 2020, y: 9.4 },
    { x: 2021, y: 10.3 },
    { x: 2022, y: 10.4 },
    { x: 2023, y: 11.17 }
];
exports.chartData4 = [
    { x: 2015, y: 4.6 },
    { x: 2016, y: 7.5 },
    { x: 2017, y: 12.1 },
    { x: 2018, y: 25.9 },
    { x: 2019, y: 39.3 },
    { x: 2020, y: 50.1 },
    { x: 2021, y: 60.4 },
    { x: 2022, y: 73.5 },
    { x: 2023, y: 102.01 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StackedLine = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null,
            " ",
            SAMPLE_CSS,
            " "),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { majorGridLines: { width: 0 }, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, valueType: 'Double', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Trim' }, primaryYAxis: { lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 }, labelFormat: '{value}TWh', title: 'Energy Generation (TWh)' }, legendSettings: { enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), loaded: loaded.bind(_this), title: 'Yearly Renewable Energy Generation in India (2015-2023)', subTitle: 'Source: wikipedia.org', tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true, header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StackingLineSeries, ej2_react_charts_1.Double, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData1, xName: 'x', yName: 'y', name: 'Wind', width: 2, type: 'StackingLine', marker: { isFilled: true, visible: true, shape: 'Circle', width: 7, height: 7 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData2, xName: 'x', yName: 'y', name: 'Bio mass', width: 2, type: 'StackingLine', marker: { isFilled: true, visible: true, shape: 'Diamond', width: 7, height: 7 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData3, xName: 'x', yName: 'y', name: 'Small Hydro', width: 2, type: 'StackingLine', marker: { isFilled: true, visible: true, shape: 'Rectangle', width: 5, height: 5 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.chartData4, xName: 'x', yName: 'y', name: 'Solar', width: 2, type: 'StackingLine', marker: { isFilled: true, visible: true, shape: 'Triangle', width: 6, height: 6 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React Stacked Line Chart example visualizes the yearly renewable energy generation in India from 2015 to 2023.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the stacked line chart. The stacked line chart visualizes data with y-values stacked one over another in a series order. It shows the relationship between individual values to the total sum of points."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use stacking line series, we need to inject ",
                React.createElement("code", null, "StackingLineSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the stacked line series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/stack-line", "aria-label": "Navigate to the documentation for Stacked Line Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = StackedLine;
