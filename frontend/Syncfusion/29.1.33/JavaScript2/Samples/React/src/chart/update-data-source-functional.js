"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Update DataSource.
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var data3 = [
    { x: 'Jewellery', y: 75 },
    { x: 'Shoes', y: 45 },
    { x: 'Footwear', y: 73 },
    { x: 'Pet Services', y: 53 },
    { x: 'Business Clothing', y: 85 },
    { x: 'Office Supplies', y: 68 },
    { x: 'Food', y: 45 }
];
var UpdateDataSource = function () {
    var _a = (0, react_1.useState)(null), intervalId = _a[0], setIntervalId = _a[1];
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        return function () {
            clearIntervalFn();
        };
    }, []);
    var pointRender = function (args) {
        (0, theme_color_1.pointRenderEvent)(args);
    };
    var loaded = function (args) {
        var chart = document.getElementById('UpdateData');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        clearIntervalFn();
        intervalId = setInterval(function () {
            var container = document.getElementById('UpdateData');
            if (container && container.id === args.chart.element.id) {
                var newData = data3.map(function (item) {
                    var min = 10;
                    var max = 90;
                    var value = Math.floor(Math.random() * (max - min + 1)) + min;
                    return { x: item.x, y: value };
                });
                if (args.chart.series.length > 0) {
                    args.chart.series[0].setData(newData, 500);
                }
            }
            else {
                clearIntervalFn();
            }
        }, 1500);
        if (intervalId)
            setIntervalId(intervalId);
    };
    var marker = { visible: false, dataLabel: { visible: true, position: 'Top', format: '{value}%', font: { color: '#ffffff' } } };
    var clearIntervalFn = function () {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    var axisRangeCalculated = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.maximum = args.maximum > 100 ? 100 : args.maximum;
            if (args.maximum > 80) {
                args.interval = 20;
            }
            else if (args.maximum > 40) {
                args.interval = 10;
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'UpdateData', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', labelStyle: { size: ej2_base_1.Browser.isDevice ? '11px' : '12px' }, majorGridLines: { width: 0 }, labelIntersectAction: 'Rotate90' }, primaryYAxis: {
                    title: 'Sales (in percentage)', labelFormat: '{value}%', interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minimum: 0, maximum: 100
                }, chartArea: { border: { width: 0 } }, load: load.bind(_this), loaded: loaded.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Sales by product', pointRender: pointRender, axisRangeCalculated: axisRangeCalculated.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: data3, xName: 'x', yName: 'y', type: 'Column', cornerRadius: { topLeft: ej2_base_1.Browser.isDevice ? 10 : 15, topRight: ej2_base_1.Browser.isDevice ? 10 : 15 }, columnWidth: 0.5, marker: marker })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how the data source for the chart can dynamically update with random values at a set interval.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a column chart that displays sales data, with each entry featuring the product name and the corresponding sales percentage. Additionally, the chart can dynamically update with random values using the ",
                React.createElement("code", null, "setData"),
                " method."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use the column series, we need to inject the ",
                React.createElement("code", null, "ColumnSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the column series can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column", "aria-label": "Navigate to the documentation for Column Chart in React Chart control" }, "documentation section"),
                "."))));
};
exports.default = UpdateDataSource;
