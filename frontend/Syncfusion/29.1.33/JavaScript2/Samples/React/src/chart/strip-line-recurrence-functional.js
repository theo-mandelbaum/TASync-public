"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for stripline recurrence
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: new Date(1970, 1, 1), y: 16500 }, { x: new Date(1975, 1, 1), y: 16000 }, { x: new Date(1980, 1, 1), y: 15400 },
    { x: new Date(1985, 1, 1), y: 15800 }, { x: new Date(1990, 1, 1), y: 14000 }, { x: new Date(1995, 1, 1), y: 10500 },
    { x: new Date(2000, 1, 1), y: 13300 }, { x: new Date(2005, 1, 1), y: 12800 }
];
exports.data2 = [
    { x: new Date(1970, 1, 1), y: 8000 }, { x: new Date(1975, 1, 1), y: 7600 }, { x: new Date(1980, 1, 1), y: 6400 },
    { x: new Date(1985, 1, 1), y: 3700 }, { x: new Date(1990, 1, 1), y: 7200 }, { x: new Date(1995, 1, 1), y: 2300 },
    { x: new Date(2000, 1, 1), y: 4000 }, { x: new Date(2005, 1, 1), y: 4800 }
];
var SAMPLE_CSS = "\n    .control-container {\n        padding: 0px !important;\n    }\n    #xIndex:hover {\n        cursor: pointer;\n    }\n    #yIndex:hover {\n        cursor: pointer;\n    }";
var Striplinerecurrence = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), isVisibleX = _a[0], setIsVisibleX = _a[1];
    var _b = (0, react_1.useState)(true), isVisibleY = _b[0], setIsVisibleY = _b[1];
    var chartInstance = (0, react_1.useRef)(null);
    var xcheckElement = (0, react_1.useRef)(null);
    var ycheckElement = (0, react_1.useRef)(null);
    var loaded;
    var xIndex = function () {
        setIsVisibleX(xcheckElement.current.checked);
    };
    var yIndex = function () {
        setIsVisibleY(ycheckElement.current.checked);
    };
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, primaryXAxis: { valueType: 'DateTime', intervalType: 'Years', majorGridLines: { width: 0 }, edgeLabelPlacement: 'Shift', minimum: new Date(1965, 1, 1), maximum: new Date(2010, 1, 1), majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, stripLines: [{ startFromAxis: true, size: 5, sizeType: 'Years', isRepeat: true, repeatEvery: 10, visible: isVisibleX, color: 'rgba(167,169,171, 0.1)' }] }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), primaryYAxis: { minimum: 0, maximum: 18000, interval: 2000, majorGridLines: { color: 'rgba(167,169,171, 0.3)' }, majorTickLines: { width: 0 }, lineStyle: { width: 0 }, labelStyle: { color: 'transparent' }, stripLines: [{ startFromAxis: true, size: 2000, isRepeat: true, repeatEvery: 4000, visible: isVisibleY, color: 'rgba(167,169,171, 0.1)' }] }, legendSettings: { visible: true, enableHighlight: true }, tooltip: { enable: true, format: ' Year: <b>${point.x}</b><br> Tons Per Day: <b>${point.y}</b>', enableHighlight: true }, loaded: onChartLoad.bind(_this), title: 'World Pollution Report' },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.StripLine, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', width: 2, columnSpacing: 0.1, type: 'Column', name: 'AllSources' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', width: 2, type: 'Column', name: 'Autos & Light Trucks' })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "xAxis" }, "X Axis:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "xIndex", defaultChecked: true, onChange: xIndex.bind(_this), style: { marginLeft: '-5px' }, ref: xcheckElement, "aria-labelledby": "Checkbox checked" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "yAxis" }, "Y Axis:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "yIndex", defaultChecked: true, onChange: yIndex.bind(_this), style: { marginLeft: '-5px' }, ref: ycheckElement, "aria-labelledby": "Checkbox checked" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows how to repeat a strip line in a chart.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure a strip line for the chart. To repeat the strip line, you need to set the ",
                React.createElement("code", null, "StartFromAxis"),
                ", ",
                React.createElement("code", null, "Size"),
                ", ",
                React.createElement("code", null, "IsRepeat"),
                ", and ",
                React.createElement("code", null, "RepeatEvery"),
                " properties accordingly in ChartStripline."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject ",
                React.createElement("code", null, "ColumnSeries"),
                " module using ",
                React.createElement("code", null, "Chart.Inject(ColumnSeries)"),
                " method."),
            React.createElement("p", null,
                "More information on the strip line can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/strip-line#recurrence-stripline", "aria-label": "Navigate to the documentation for Recurrence Stripline in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Striplinerecurrence;
