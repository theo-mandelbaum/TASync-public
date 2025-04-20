"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Trackball in chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var trackball_data_1 = require("./trackball-data");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var TrackballChart = function () {
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
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { minimum: new Date(2000, 1, 1), maximum: new Date(2006, 2, 11), valueType: 'DateTime', skeleton: 'y', lineStyle: { width: 0 }, majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift' }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), primaryYAxis: { title: 'Revenue (in Million)', labelFormat: '{value}M', majorTickLines: { width: 0 }, minimum: 10, maximum: 80, lineStyle: { width: 0 } }, legendSettings: { visible: true, enableHighlight: true }, title: 'Average Sales per Person', loaded: onChartLoad.bind(_this), tooltip: { enable: true, shared: true }, crosshair: { enable: true, lineType: 'Vertical' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Legend, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: trackball_data_1.john, xName: 'x', yName: 'y', width: 2, name: 'John', type: 'Line', marker: { visible: true, isFilled: true, width: 7, height: 7 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: trackball_data_1.andrew, xName: 'x', yName: 'y', width: 2, name: 'Andrew', type: 'Line', marker: { visible: true, isFilled: true, width: 7, height: 7 } }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: trackball_data_1.thomas, xName: 'x', yName: 'y', width: 2, name: 'Thomas', type: 'Line', marker: { visible: true, isFilled: true, width: 7, height: 7 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample depicts the trackball behavior in the chart. To view the trackball and its tooltip, hover over the chart or tap on it in touch-enabled devices.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The trackball is used to track a data point close to the mouse or touch position. The trackball can be enabled by setting the Enable property of the crosshair to ",
                React.createElement("b", null, "true"),
                " and the ",
                React.createElement("code", null, "Shared"),
                " property of the tooltip to ",
                React.createElement("b", null, "true"),
                " in the chart."),
            React.createElement("p", null, "Hover the chart area to view trackball and its tooltip. Touch and hold to enable trackball in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use Trackball, we need to inject ",
                React.createElement("code", null, "Tooltip"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the Tooltip and Trackball can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/cross-hair-and-track-ball/#trackball", "aria-label": "Navigate to the documentation for Trackball in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = TrackballChart;
