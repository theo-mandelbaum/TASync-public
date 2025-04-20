"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sample for Candle Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var value = 180;
var getData = function () {
    var series = [];
    var point;
    for (var i = 0; i < 30; i++) {
        value = 180 + Math.round((Math.random() * 25) * Math.sin(i * Math.PI / 8)); // Adjust the function as needed
        value = Math.max(140, Math.min(260, value));
        if (value > 260) {
            value = 260;
        }
        if (value < 140) {
            value = 140;
        }
        var open_1 = value + Math.round(Math.random() * 18);
        var low = Math.min(value, open_1) - Math.round(Math.random() * 6);
        var high = Math.min(220, Math.max(value, open_1) + Math.round(Math.random() * 15));
        point = {
            x: new Date(2000, 5, 2, 2, 0, i),
            close: value,
            open: open_1,
            low: low,
            high: high
        };
        series.push(point);
    }
    return { series: series };
};
var data = getData().series;
var incVal = 0;
var updateVal = data.length;
var pointAdded = false;
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
/**
 * Candle sample
 */
var LiveStock = function () {
    var _a = (0, react_1.useState)(null), intervalId = _a[0], setIntervalId = _a[1];
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
        return function () {
            clearIntervalFn();
        };
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
        clearIntervalFn();
        intervalId = setInterval(function () {
            var container = document.getElementById('stock');
            if (container && container.id === args.chart.element.id) {
                var newData1 = [];
                var value_1 = 180;
                pointAdded = true;
                for (var i = 0; i < args.chart.series[0].dataSource.length; i++) {
                    newData1.push(Object.assign({}, args.chart.series[0].dataSource[i]));
                }
                if (newData1.length > 0) {
                    var lastIndex = newData1.length - 1;
                    var previousClose = newData1[lastIndex].close;
                    newData1[lastIndex].close += (Math.random() < 0.5 ? 1 : -1) * Math.random() * 25;
                    newData1[lastIndex].close = Math.min(Math.min(Math.max(newData1[lastIndex].close, newData1[lastIndex].low + 5), newData1[lastIndex].high - 5), newData1[lastIndex].open - 2);
                    if (previousClose === newData1[lastIndex].close) {
                        newData1[lastIndex].close -= 5;
                    }
                }
                if (incVal < 10) {
                    if (args.chart.series.length > 0) {
                        args.chart.series[0].setData(newData1);
                        incVal++;
                    }
                }
                else {
                    var change = Math.round((Math.random() < 0.49 ? 1 : -1) * Math.random() * 10);
                    value_1 += change;
                    if (value_1 > 260) {
                        value_1 = 260;
                    }
                    if (value_1 < 140) {
                        value_1 = 140;
                    }
                    var open_2 = value_1 + Math.round(Math.random() * 12);
                    var low = Math.min(value_1, open_2) - Math.round(Math.random() * 8);
                    var high = Math.max(value_1, open_2) + Math.round(Math.random() * 15);
                    if (args.chart.series.length > 0) {
                        var lastDataPointIndex = args.chart.series[0].dataSource.length - 1;
                        if (lastDataPointIndex >= 0) {
                            var timestamp = args.chart.series[0].dataSource[lastDataPointIndex].x;
                            var lastTimestamp = new Date(timestamp).getTime();
                            args.chart.series[0].addPoint({ x: new Date(lastTimestamp + 1000), high: high, low: low, open: open_2, close: value_1 });
                        }
                    }
                    incVal = 0;
                    updateVal++;
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
            args.maximum = new Date(Number(lastPoint)).getTime() + 2500;
            var firstPoint = args.axis.series[0].points[0].x;
            args.minimum = new Date(Number(firstPoint)).getTime() + 500;
        }
    };
    var pointRender = function (args) {
        if (args.series.chart.enableRtl) {
            args.series.chart.annotations[0].x = 0;
        }
        if (pointAdded && args.series.points[args.series.points.length - 1] === args.point) {
            var firstPoint = args.series.chart.enableRtl ? args.series.points[args.series.points.length - 1].x : args.series.points[0].x;
            args.series.chart.annotations[0].x = new Date(Number(firstPoint)).getTime() + (args.series.chart.enableRtl ? 2000 : 1000);
            args.series.chart.annotations[0].y = args.point.close;
            args.series.chart.annotations[0].content = "<div style=\"width: ".concat(args.series.chart.initialClipRect.width, "px; height: 0; left: ").concat(ej2_base_1.Browser.isDevice ? -10 : -16, "px; position: absolute;\">\n            <svg width=\"100%\" height=\"2\" style=\"display: block;\">\n              <line x1=\"0\" y1=\"1\" x2=\"").concat(args.series.chart.initialClipRect.width, "\" y2=\"1\" \n                style=\"stroke:#868180; stroke-width:0.75; stroke-dasharray:5,5;\" />\n            </svg>\n          </div>\n          <div style=\"width: 40px; height: 18px; background-color: ").concat(args.fill, "; border: 1px solid rgba(48, 153, 245, 0.4); color: white; font-size: 11px; display: flex; align-items: center; justify-content: center; text-align: center; line-height: 18px; position: absolute; left: ").concat((args.series.chart.enableRtl ? -args.series.chart.initialClipRect : args.series.chart.initialClipRect.width - 20), "px; top: -9px;\">\n            ").concat(args.point.close.toFixed(2), "\n          </div> ");
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'stock', ref: chartInstance, style: { textAlign: "center" }, load: load.bind(_this), primaryXAxis: { valueType: 'DateTime', interval: ej2_base_1.Browser.isDevice ? 8 : 4, edgeLabelPlacement: ej2_base_1.Browser.isDevice ? 'None' : 'Shift', crosshairTooltip: { enable: true }, majorGridLines: { width: 0 }, labelIntersectAction: 'Hide' }, primaryYAxis: { interval: 20, minimum: 120, opposedPosition: true, crosshairTooltip: { enable: true }, lineStyle: { width: 0 }, majorGridLines: { width: 1 }, majorTickLines: { width: 0 } }, width: ej2_base_1.Browser.isDevice ? '100%' : '90%', chartArea: { border: { width: 0 } }, title: "AAPL Historical", crosshair: { enable: true, dashArray: '5,5' }, pointRender: pointRender.bind(_this), axisRangeCalculated: axisRangeCalculated.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.CandleSeries, ej2_react_charts_1.StripLine, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DateTime, ej2_react_charts_1.Zoom, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Logarithmic, ej2_react_charts_1.Crosshair, ej2_react_charts_1.ChartAnnotation] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { type: 'Candle', bearFillColor: '#2ecd71', bullFillColor: '#e74c3d', dataSource: data, columnWidth: 0.4, xName: 'x', low: 'low', high: 'high', open: 'open', close: 'close' })),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div"></div>', x: new Date(2000, 5, 2, 2, 0, 1), y: 140, region: "Series", coordinateUnits: 'Point' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the animation in the candle chart when existing data is updated or new data is added.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a candlestick series to display data that updates every second using the ",
                React.createElement("code", null, "setData"),
                " method and adds new data every five seconds using the ",
                React.createElement("code", null, "addPoint"),
                " method. The chart demonstrates setting up a crosshair to follow the latest data and adjusting the point color based on the value."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use the candle series, we need to inject ",
                React.createElement("code", null, "CandleSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the candle series can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/financial-types/#candle", "aria-label": "Navigate to the documentation for Candle Chart in React Chart control" }, "documentation section"),
                "."))));
};
exports.default = LiveStock;
