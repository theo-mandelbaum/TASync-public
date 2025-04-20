"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for local data
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var LocalData = function () {
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
    var GetLocalData = function () {
        var series1 = [];
        var series2 = [];
        var point1;
        var point2;
        var value = 80;
        var value1 = 90;
        var i;
        for (i = 1; i < 500; i++) {
            if (Math.random() > .5) {
                value += Math.random();
                value1 += Math.random();
            }
            else {
                value -= Math.random();
                value1 -= Math.random();
            }
            point1 = { x: new Date(1960, (i + 1), i), y: Math.round(value) };
            point2 = { x: new Date(1960, (i + 1), i), y: Math.round(value1) };
            series1.push(point1);
            series2.push(point2);
        }
        return { 'series1': series1, 'series2': series2 };
    };
    var data1 = GetLocalData().series1;
    var data2 = GetLocalData().series2;
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { skeleton: 'y', majorGridLines: { width: 0 }, valueType: 'DateTime', edgeLabelPlacement: 'Shift' }, load: load.bind(_this), primaryYAxis: { title: 'Price', labelFormat: '${value}', rangePadding: 'None', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, crosshair: { enable: true, line: { color: 'rgba(204,214,235,0.25)', width: ej2_base_1.Browser.isDevice ? 50 : 20 }, lineType: 'Vertical' }, legendSettings: { visible: true, enableHighlight: true }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, tooltip: { enable: true, shared: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Stock Price Analysis', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Legend, ej2_react_charts_1.Crosshair, ej2_react_charts_1.Highlight, ej2_react_charts_1.Tooltip] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data1, xName: 'x', yName: 'y', width: 2, name: 'Product X', animation: { enable: true }, type: 'Line' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data2, xName: 'x', yName: 'y', width: 2, name: 'Product Y', animation: { enable: true }, type: 'Line' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the plotting of local data in a stock price analysis of two products over a period of time.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Charts control supports data binding. The ",
                React.createElement("code", null, "DataSource"),
                " property can be assigned either as list of objects or with instance of DataManager."),
            React.createElement("p", null, "In this demo, the list of objects is assigned as the data source to the Charts control. The chart can be bound to IEnumerable, IQueryable, and ObservableCollection data sources."),
            React.createElement("p", null,
                "More information about the local data binding can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/working-with-data/#local-data", "aria-label": "Navigate to the documentation for Local Data in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = LocalData;
