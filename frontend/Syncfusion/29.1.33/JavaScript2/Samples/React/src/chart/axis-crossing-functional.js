"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for smart axis labels
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var theme_color_1 = require("./theme-color");
exports.data1 = [{ x: -6, y: 2 }, { x: -3, y: -4 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }];
exports.data2 = [
    { x: -6, y: 2 }, { x: -5, y: 0 }, { x: -4.511, y: -0.977 }, { x: -3, y: -4 }, { x: -1.348, y: -1.247 },
    { x: -0.6, y: 0 }, { x: 0, y: 1 }, { x: 1.5, y: 3.5 }, { x: 6, y: 4.5 }
];
exports.data3 = [
    { x: -6, y: 2 }, { x: -5.291, y: 0 }, { x: -5, y: -0.774 }, { x: -3, y: -4 }, { x: -0.6, y: -0.965 },
    { x: -0.175, y: 0 }, { x: 0, y: 0.404 }, { x: 1.5, y: 3.5 }, { x: 3.863, y: 5.163 }, { x: 6, y: 4.5 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var AxisCrossing = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chartInstance = (0, react_1.useRef)(null);
    var dropElement = (0, react_1.useRef)(null);
    var checkboxElement = (0, react_1.useRef)(null);
    var numericValue = (0, react_1.useRef)(null);
    var droplist = [
        { value: 'X' },
        { value: 'Y' },
    ];
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var change = function () {
        if (dropElement.current.value === 'X') {
            checkboxElement.current.checked = chartInstance.current.primaryXAxis.placeNextToAxisLine;
            numericValue.current.value = +chartInstance.current.primaryXAxis.crossesAt;
        }
        else {
            checkboxElement.current.checked = chartInstance.current.primaryYAxis.placeNextToAxisLine;
            numericValue.current.value = +chartInstance.current.primaryYAxis.crossesAt;
        }
        chartInstance.current.dataBind();
    };
    var crosshingValue = function () {
        if (dropElement.current.index === 0) {
            chartInstance.current.primaryXAxis.crossesAt = numericValue.current.value;
        }
        else {
            chartInstance.current.primaryYAxis.crossesAt = numericValue.current.value;
        }
        chartInstance.current.dataBind();
    };
    var handleCheckboxChange = function (e) {
        if (dropElement.current.index === 0) {
            chartInstance.current.primaryXAxis.placeNextToAxisLine = checkboxElement.current.checked;
        }
        else {
            chartInstance.current.primaryYAxis.placeNextToAxisLine = checkboxElement.current.checked;
        }
        chartInstance.current.dataBind();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: chartInstance, style: { textAlign: "center" }, primaryXAxis: { minimum: -8, maximum: 8, interval: 2, valueType: 'Double', lineStyle: { width: 2 }, minorTickLines: { width: 0 }, majorTickLines: { width: 0 }, crossesAt: 0, minorTicksPerInterval: 3 }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, primaryYAxis: { minimum: -8, maximum: 8, interval: 2, lineStyle: { width: 2 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, crossesAt: 0, minorTicksPerInterval: 3 }, legendSettings: { visible: true, enableHighlight: true }, load: load.bind(_this), title: "Spline Interpolation", tooltip: { enable: true, enableHighlight: true }, loaded: onChartLoad.bind(_this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.ScatterSeries, ej2_react_charts_1.Highlight, ej2_react_charts_1.SplineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Linear Interpolation", type: 'Line', width: 2, enableTooltip: false, fill: 'Blue' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Cubic Spline Interpolation", type: 'Spline', width: 2, enableTooltip: false, fill: 'Green' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Data Points", type: 'Scatter', width: 2, marker: { visible: false, width: 7, height: 7 }, fill: 'red' })))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", null, "Axis: ")),
                                React.createElement("td", null,
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { index: 0, width: "120px", id: "selmode", change: change.bind(_this), ref: dropElement, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "X" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "crossValue" }, "Crosses Value:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_inputs_1.NumericTextBoxComponent, { value: 0, min: -8, max: 8, width: 120, step: 2, change: crosshingValue.bind(_this), style: { marginLeft: '-5px' }, ref: numericValue, "aria-labelledby": "Text" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "axis" }, "Placing Label Near to Axis Line:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "axisElements", onChange: function (e) { return handleCheckboxChange(e); }, style: { marginLeft: '-5px' }, defaultChecked: true, ref: checkboxElement, "aria-labelledby": "Checkbox checked" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates an interpolation of data points between linear and cubic by using spline and line series.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This sample demonstrates the axis crossing behavior in chart. Axis can be positioned anywhere in the chart area by using the ",
                React.createElement("code", null, "crossesAt"),
                " property of axis. This property specifies where the horizontal axis should intersect or cross the vertical axis and vice-versa."),
            React.createElement("p", null,
                "Default value of crossesAt property is null. So, you can use ",
                React.createElement("code", null, "placeNextToAxisLine"),
                " property to place the axis labels and ticks next to axis line. When there are multiple axes, you can choose an axis to cross by using ",
                React.createElement("code", null, "crossesInAxis"),
                " property. If the axis name is not valid, primaryXAxis or primaryYAxis will be used for crossing, by default."),
            React.createElement("p", null,
                "More information on the smart axis labels can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/axis-customization/#axis-crossing", "aria-label": "Navigate to the documentation for Axis Crossing in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = AxisCrossing;
