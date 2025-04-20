"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var chartData = [
    { x: 20, y: 20 }, { x: 80, y: 80 }
];
var ClickAddPoint = function () {
    var chartInstance = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var loaded = function (args) {
        var chart = document.getElementById('AddPoint');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var axisRangeCalculated = function (args) {
        if (args.axis.name === 'primaryXAxis') {
            if (args.interval < 10) {
                args.maximum = args.maximum + 10;
                args.minimum = args.minimum - 10;
                args.interval = 10;
            }
        }
        if (args.axis.name === 'primaryYAxis') {
            if (args.maximum <= 60) {
                args.interval = 10;
            }
        }
    };
    var chartMouseClick = function (args) {
        var isRemoved = false;
        if (args.axisData) {
            for (var i = 0; i < chartInstance.current.series[0].points.length; i++) {
                var markerWidth = chartInstance.current.series[0].marker.width / 2;
                var roundedX = Math.round(args.axisData['primaryXAxis']) + markerWidth;
                var roundedY = Math.round(args.axisData['primaryYAxis']) + markerWidth;
                var pointX = Math.round(chartInstance.current.series[0].points[i].x) + markerWidth;
                var pointY = Math.round(chartInstance.current.series[0].points[i].y) + markerWidth;
                if ((roundedX === pointX || roundedX + 1 === pointX || roundedX - 1 === pointX) &&
                    (roundedY === pointY || roundedY + 1 === pointY || roundedY - 1 === pointY)) {
                    if (chartInstance.current.series[0].points.length > 1) {
                        var points = chartInstance.current.series[0].points;
                        var duration = i === 0 || i === points[points.length - 1].index ? 500 : 0;
                        chartInstance.current.series[0].removePoint(i, duration);
                    }
                    isRemoved = true;
                }
            }
            if (!isRemoved) {
                chartInstance.current.series[0].addPoint({ x: Math.round(args.axisData['primaryXAxis']), y: Math.round(args.axisData['primaryYAxis']) });
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'AddPoint', ref: chartInstance, style: { textAlign: "center" }, primaryXAxis: {
                    edgeLabelPlacement: 'Shift',
                    rangePadding: 'Additional',
                    majorGridLines: { width: 0 }
                }, primaryYAxis: {
                    title: 'Value', interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }
                }, chartMouseClick: chartMouseClick.bind(_this), axisRangeCalculated: axisRangeCalculated.bind(_this), tooltip: { enable: true, enableHighlight: true }, chartArea: { border: { width: 0 } }, load: load.bind(_this), loaded: loaded.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '70%', title: 'User supplied data' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Tooltip] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: chartData, xName: 'x', yName: 'y', type: 'Line', width: 3, marker: { visible: true, isFilled: true, border: { width: 2, color: 'White' }, width: 13, height: 13 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a chart that allows end users to add new data and update the existing data source by clicking in the chart area. Additionally, clicking on an existing point will remove that data from the existing data source.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, the X-Axis and Y-Axis data of the currently clicked location are retrieved from the ",
                React.createElement("code", null, "chartMouseClick"),
                " event arguments and converted into a new point. This point is then added to the existing data source using the ",
                React.createElement("code", null, "addPoint"),
                " method. If a point with the same coordinates already exists, it will be removed from the data source using the ",
                React.createElement("code", null, "removePoint"),
                " method."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use the line series, we need to inject the ",
                React.createElement("code", null, "LineSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the line series can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/line", "aria-label": "Navigate to the documentation for Line Chart in React Chart control" }, "documentation section"),
                "."))));
};
exports.default = ClickAddPoint;
