"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n.control-fluid {\n    padding: 0px !important;\n}\n#spline_Series_0_Point_15_Symbol {\n    -webkit-animation: opac 1s ease-out infinite;\n    animation: opac 1s ease-out infinite;\n}\n@keyframes opac {\n    0% {\n        stroke-opacity: 1;\n        stroke-width: 10px;\n    }\n    100% {\n        stroke-opacity: 0;\n        stroke-width: 20px;\n    }\n}";
var splineData = [
    { x: new Date(2024, 5, 6, 6, 7, 3), y: 42 },
    { x: new Date(2024, 5, 6, 6, 7, 5), y: 52 },
    { x: new Date(2024, 5, 6, 6, 7, 7), y: 83 },
    { x: new Date(2024, 5, 6, 6, 7, 9), y: 75 },
    { x: new Date(2024, 5, 6, 6, 7, 11), y: 35 },
    { x: new Date(2024, 5, 6, 6, 7, 13), y: 85 },
    { x: new Date(2024, 5, 6, 6, 7, 15), y: 78 },
    { x: new Date(2024, 5, 6, 6, 7, 17), y: 29 },
    { x: new Date(2024, 5, 6, 6, 7, 19), y: 62 },
    { x: new Date(2024, 5, 6, 6, 7, 21), y: 95 },
    { x: new Date(2024, 5, 6, 6, 7, 23), y: 32 },
    { x: new Date(2024, 5, 6, 6, 7, 25), y: 76 },
    { x: new Date(2024, 5, 6, 6, 7, 27), y: 83 },
    { x: new Date(2024, 5, 6, 6, 7, 29), y: 53 },
    { x: new Date(2024, 5, 6, 6, 7, 31), y: 32 },
    { x: new Date(2024, 5, 6, 6, 7, 33), y: 75 },
];
var UpdateSpline = function () {
    var _a = (0, react_1.useState)(null), intervalId = _a[0], setIntervalId = _a[1];
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        return function () {
            clearIntervalFn();
        };
    }, []);
    var loaded = function (args) {
        var chart = document.getElementById('spline');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        clearIntervalFn(); // Clear any existing interval
        intervalId = setInterval(function () {
            if (document.getElementById('spline')) {
                if (args.chart && args.chart.series.length > 0 && args.chart.series[0].dataSource) {
                    var lastDataPointIndex = args.chart.series[0].dataSource.length - 1;
                    if (lastDataPointIndex >= 0) {
                        var timestamp = args.chart.series[0].dataSource[lastDataPointIndex].x;
                        var lastTimestamp = new Date(timestamp).getTime();
                        var x = new Date(lastTimestamp + 2000);
                        var y = 0;
                        if (x.getSeconds() % 3 === 0) {
                            y = Math.max(30, Math.random() * 150);
                        }
                        else if (x.getSeconds() % 2 === 0) {
                            y = Math.max(30, Math.random() * 200);
                        }
                        else {
                            y = Math.max(30, Math.random() * 100);
                        }
                        args.chart.series[0].addPoint({ x: x, y: y }, 800);
                        args.chart.series[0].removePoint(0, 800);
                    }
                }
            }
            else {
                clearIntervalFn();
            }
        }, 1000);
        if (intervalId)
            setIntervalId(intervalId);
    };
    var clearIntervalFn = function () {
        if (intervalId) {
            clearInterval(intervalId);
            setIntervalId(null);
        }
    };
    var axisRangeCalculated = function (args) {
        if (args.axis.name === 'primaryXAxis') {
            var lastPoint = args.axis.series[0].points[args.axis.series[0].points.length - 1].x;
            args.maximum = new Date(Number(lastPoint)).getTime() + 500;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'spline', style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTime', edgeLabelPlacement: ej2_base_1.Browser.isDevice ? 'None' : 'Shift', majorGridLines: { width: 0 }, labelRotation: ej2_base_1.Browser.isDevice ? 45 : 0, interval: 7, plotOffsetRight: 30, labelIntersectAction: 'Hide' }, primaryYAxis: { title: 'Value', lineStyle: { width: 0 }, majorTickLines: { width: 0 }, interval: 20 }, axisRangeCalculated: axisRangeCalculated.bind(_this), chartArea: { border: { width: 0 } }, load: load.bind(_this), loaded: loaded.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Live data' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: splineData, xName: 'x', yName: 'y', type: 'Spline', width: 2, marker: { visible: true, isFilled: true, width: 7, height: 7 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates how to add and remove data in a spline chart, allowing modification of the data at set intervals.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a spline chart to display data that updates every second using the ",
                React.createElement("code", null, "addPoint"),
                " method, with old data being removed using the ",
                React.createElement("code", null, "removePoint"),
                " method. The X-axis represents the time at which the data is added, while the Y-axis displays the data values."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use the spline series, we need to inject the ",
                React.createElement("code", null, "SplineSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the spline series can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline", "aria-label": "Navigate to the documentation for Spline Chart in React Chart control" }, "documentation section"),
                "."))));
};
exports.default = UpdateSpline;
