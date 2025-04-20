"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for Line Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 2005, y: 21 }, { x: 2006, y: 24 },
    { x: 2007, y: 36 }, { x: 2008, y: 38 },
    { x: 2009, y: 54 }, { x: 2010, y: 57 },
    { x: 2011, y: 70 }
];
exports.data2 = [
    { x: 2005, y: 28 }, { x: 2006, y: 44 },
    { x: 2007, y: 48 }, { x: 2008, y: 50 },
    { x: 2009, y: 66 }, { x: 2010, y: 78 },
    { x: 2011, y: 84 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    .charts {\n        align :center\n    }";
var DataEdit = function () {
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
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', labelFormat: 'y', labelPlacement: 'BetweenTicks', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: load.bind(_this), primaryYAxis: { rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, title: 'Production(Billion in kWh)', labelFormat: '{value}B', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Electricity - Production', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataEditing, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, dragSettings: { enable: true }, xName: 'x', yName: 'y', name: 'Renewable', width: 2, marker: { visible: true, width: 7, height: 7 }, type: 'Column' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, dragSettings: { enable: true }, xName: 'x', yName: 'y', name: 'Non-Renewable', width: 2, marker: { visible: true, width: 7, height: 7, isFilled: true }, type: 'Line' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the behavior of the data editing in the chart. Drag and drop the points to change the data values dynamically.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to drag and drop the data points in the chart by setting Enable property in ",
                React.createElement("code", null, "ChartDataEditSettings"),
                " to ",
                React.createElement("b", null, "true"),
                ". Also, you can set data editing\u2019s minimum and maximum range using the ",
                React.createElement("code", null, "MinY"),
                " and ",
                React.createElement("code", null, "MaxY"),
                " properties."),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use data editing, we need to inject ",
                React.createElement("code", null, "DataEditing"),
                " module using ",
                React.createElement("code", null, "Chart.Inject(DataEditing)"),
                " method."),
            React.createElement("p", null,
                "More information on the Data Editing can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/data-editing/", "aria-label": "Navigate to the documentation for Data Editing in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = DataEdit;
