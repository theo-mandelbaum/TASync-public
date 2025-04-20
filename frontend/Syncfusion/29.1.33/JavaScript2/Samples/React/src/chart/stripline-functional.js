"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = exports.data = void 0;
/**
 * Sample for stripline
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.data = [
    { x: new Date(2023, 4, 1), wind: 19 },
    { x: new Date(2023, 4, 2), wind: 17 },
    { x: new Date(2023, 4, 3), wind: 14 },
    { x: new Date(2023, 4, 4), wind: 9 },
    { x: new Date(2023, 4, 5), wind: 10 },
    { x: new Date(2023, 4, 6), wind: 8 },
    { x: new Date(2023, 4, 7), wind: 8 },
    { x: new Date(2023, 4, 8), wind: 16 },
    { x: new Date(2023, 4, 9), wind: 9 },
    { x: new Date(2023, 4, 10), wind: 13 },
    { x: new Date(2023, 4, 11), wind: 7 },
    { x: new Date(2023, 4, 12), wind: 12 },
    { x: new Date(2023, 4, 13), wind: 10 },
    { x: new Date(2023, 4, 14), wind: 5 },
    { x: new Date(2023, 4, 15), wind: 8 }
];
exports.data1 = [
    { x: new Date(2023, 4, 1), gust: 30 },
    { x: new Date(2023, 4, 2), gust: 28 },
    { x: new Date(2023, 4, 3), gust: 26 },
    { x: new Date(2023, 4, 4), gust: 19 },
    { x: new Date(2023, 4, 5), gust: 21 },
    { x: new Date(2023, 4, 6), gust: 14 },
    { x: new Date(2023, 4, 7), gust: 13 },
    { x: new Date(2023, 4, 8), gust: 29 },
    { x: new Date(2023, 4, 9), gust: 19 },
    { x: new Date(2023, 4, 10), gust: 20 },
    { x: new Date(2023, 4, 11), gust: 15 },
    { x: new Date(2023, 4, 12), gust: 25 },
    { x: new Date(2023, 4, 13), gust: 20 },
    { x: new Date(2023, 4, 14), gust: 10 },
    { x: new Date(2023, 4, 15), gust: 15 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }\n    #winter stop {\n        stop-color: #4ca1af;\n    }\n\n    #winter stop[offset=\"0\"] {\n        stop-color: #c4e0e5;\n    }\n\n    #winter stop[offset=\"1\"] {\n        stop-color: #4ca1af;\n    }\n\n    #summer stop {\n        stop-color: #ffa751;\n    }\n\n    #summer stop[offset=\"0\"] {\n        stop-color: #ffe259;\n    }\n\n    #summer stop[offset=\"1\"] {\n        stop-color: #ffa751;\n    }\n\n    #spring stop {\n        stop-color: #1d976c;\n    }\n\n    #spring stop[offset=\"0\"] {\n        stop-color: #93f9b9;\n    }\n\n    #spring stop[offset=\"1\"] {\n        stop-color: #1d976c;\n    }\n\n    #autumn stop {\n        stop-color: #603813;\n    }\n\n    #autumn stop[offset=\"0\"] {\n        stop-color: #b29f94;\n    }\n    .productA {\n        width: 10px;\n        height: 10px;\n        color: black;\n        font-weight: bold;\n    }\n    .productB {\n        width: 10px;\n        height: 10px;\n        color: black;\n        font-weight: bold;\n    }\n    .productC {\n        width: 10px;\n        height: 10px;\n        color: black;\n        font-weight: bold;\n    }\n\n    #autumn stop[offset=\"1\"] {\n        stop-color: #603813;\n    }";
var Stripline = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("svg", { style: { height: 0 } },
            React.createElement("defs", null,
                React.createElement("linearGradient", { id: "winter", x1: "0", x2: "0", y1: "0", y2: "1" },
                    React.createElement("stop", { offset: "0" }),
                    React.createElement("stop", { offset: "1" })),
                React.createElement("linearGradient", { id: "summer", x1: "0", x2: "0", y1: "0", y2: "1" },
                    React.createElement("stop", { offset: "0" }),
                    React.createElement("stop", { offset: "1" })),
                React.createElement("linearGradient", { id: "spring", x1: "0", x2: "0", y1: "0", y2: "1" },
                    React.createElement("stop", { offset: "0" }),
                    React.createElement("stop", { offset: "1" })),
                React.createElement("linearGradient", { id: "autumn", x1: "0", x2: "0", y1: "0", y2: "1" },
                    React.createElement("stop", { offset: "0" }),
                    React.createElement("stop", { offset: "1" })))),
        React.createElement("div", { className: 'control-section row' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTimeCategory', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, labelFormat: 'E dd/MM', labelRotation: -90, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'Rotate90' : 'None' }, load: load.bind(_this), primaryYAxis: { minimum: 0, maximum: 30, interval: 10, title: 'Wind Speed and Gust (km/h)', lineStyle: { width: 0 }, rangePadding: 'None', majorTickLines: { width: 0 }, majorGridLines: { width: 0 }, stripLines: [{ start: 0, end: 5, text: 'Calm', color: 'rgba(68, 170, 213, 0.1)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 } }, { start: 5, end: 8, text: 'Light Air', color: 'rgba(0, 0, 0, 0)', horizontalAlignment: 'Start', visible: true, textStyle: { size: '13px' }, border: { width: 0 } }, { start: 8, end: 11, text: 'Light Breeze', horizontalAlignment: 'Start', visible: true, textStyle: { size: '13px' }, border: { width: 0 }, color: 'rgba(68, 170, 213, 0.1)' }, { start: 11, end: 18, text: 'Gentle Breeze', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 } }, { start: 18, end: 28, text: 'Moderate Breeze', color: 'rgba(68, 170, 213, 0.1)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 } }, { start: 28, end: 30, text: 'Fresh Breeze', color: 'rgba(0, 0, 0, 0)', visible: true, horizontalAlignment: 'Start', textStyle: { size: '13px' }, border: { width: 0 } }] }, tooltip: { enable: true, header: " ", format: "<b>${point.x}</b> <br> ${series.name} : <b>${point.y}</b>", enableMarker: false, enableHighlight: true, showNearestTooltip: true }, legendSettings: { visible: true, enableHighlight: true, shapeHeight: 6, shapeWidth: 15 }, width: ej2_base_1.Browser.isDevice ? "100%" : "75%", loaded: onChartLoad.bind(_this), title: 'Wind Speed and Gust (km/h)', titleStyle: { position: 'Bottom', textAlignment: 'Far' }, subTitle: 'WorldWeatherOnline.com', chartArea: { border: { width: 0 }, margin: { bottom: 12 } } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineSeries, ej2_react_charts_1.DateTimeCategory, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.StripLine, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data, xName: "x", yName: "wind", width: 4, type: "Spline", legendShape: "HorizontalLine", name: "Wind Speed (km/h)" }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "x", yName: "gust", width: 4, type: "Spline", legendShape: "HorizontalLine", name: "Wind Gust (km/h)" })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample displays the changes in wind speed and gust with stripline feature.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a strip line for the chart. Use the ",
                React.createElement("code", null, "start"),
                " and ",
                React.createElement("code", null, "end"),
                " properties in the ",
                React.createElement("code", null, "chartStripline"),
                " option to add a strip line to an axis. Additionally, the title for the chart can be positioned anywhere in the chart by using the ",
                React.createElement("code", null, "position"),
                " property in ",
                React.createElement("code", null, "titleStyle"),
                "."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use strip line, we need to inject ",
                React.createElement("code", null, "StripLine"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the strip line can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/strip-line", "aria-label": "Navigate to the documentation for Strip lines in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Stripline;
