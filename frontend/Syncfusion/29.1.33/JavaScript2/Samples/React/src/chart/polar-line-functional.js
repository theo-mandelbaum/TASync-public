"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data2 = exports.data1 = void 0;
/**
 * Sample for Polar Series with drawType Line
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var property_pane_1 = require("../common/property-pane");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: 'Jan', y: -7.1 },
    { x: 'Feb', y: -3.7 },
    { x: 'Mar', y: 0.8 },
    { x: 'Apr', y: 6.3 },
    { x: 'May', y: 13.3 },
    { x: 'Jun', y: 18.0 },
    { x: 'Jul', y: 19.8 },
    { x: 'Aug', y: 18.1 },
    { x: 'Sep', y: 13.1 },
    { x: 'Oct', y: 4.1 },
    { x: 'Nov', y: -3.8 },
    { x: 'Dec', y: -6.8 },
];
exports.data2 = [
    { x: 'Jan', y: -17.4 },
    { x: 'Feb', y: -15.6 },
    { x: 'Mar', y: -12.3 },
    { x: 'Apr', y: -5.3 },
    { x: 'May', y: 1.0 },
    { x: 'Jun', y: 6.9 },
    { x: 'Jul', y: 9.4 },
    { x: 'Aug', y: 7.6 },
    { x: 'Sep', y: 2.6 },
    { x: 'Oct', y: -4.9 },
    { x: 'Nov', y: -13.4 },
    { x: 'Dec', y: -16.4 },
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var PolarLine = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var chartInstance;
    var dropElement;
    var checkElement;
    var startangle;
    var inversed;
    var loaded;
    var droplist = [
        { value: 'Polar' },
        { value: 'Radar' }
    ];
    var onChartLoad = function (args) {
        document.getElementById('charts').setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var change = function () {
        chartInstance.series[0].type = dropElement.value;
        chartInstance.series[1].type = dropElement.value;
        chartInstance.series[0].animation.enable = false;
        chartInstance.series[1].animation.enable = false;
        chartInstance.refresh();
    };
    var closed = function () {
        chartInstance.series[0].isClosed = checkElement.checked;
        chartInstance.series[1].isClosed = checkElement.checked;
        chartInstance.series[0].animation.enable = false;
        chartInstance.series[1].animation.enable = false;
        chartInstance.refresh();
    };
    var isInversed = function () {
        chartInstance.primaryXAxis.isInversed = inversed.checked;
        chartInstance.primaryYAxis.isInversed = inversed.checked;
        chartInstance.series[0].animation.enable = false;
        chartInstance.series[1].animation.enable = false;
        chartInstance.refresh();
    };
    var startAngle = function () {
        chartInstance.series[0].animation.enable = false;
        chartInstance.series[1].animation.enable = false;
        chartInstance.primaryXAxis.startAngle = parseInt(startangle.value);
        document.getElementById('st-lbl').innerHTML = 'Start Angle: ' + parseInt(startangle.value);
        chartInstance.refresh();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", { className: 'col-md-8' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', ref: function (chart) { return chartInstance = chart; }, primaryXAxis: {
                        title: 'Months',
                        valueType: 'Category',
                        labelPlacement: 'OnTicks',
                        interval: 1,
                        coefficient: ej2_base_1.Browser.isDevice ? 80 : 100
                    }, load: load.bind(_this), primaryYAxis: {
                        title: 'Temperature (Celsius)',
                        minimum: -25,
                        maximum: 25,
                        interval: 10,
                        edgeLabelPlacement: 'Shift',
                        labelFormat: '{value}°C'
                    }, title: 'Alaska Weather Statistics - 2016', loaded: onChartLoad.bind(_this), legendSettings: { enableHighlight: true }, tooltip: { enable: true, enableHighlight: true } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.PolarSeries, ej2_react_charts_1.RadarSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Germany', type: 'Polar', marker: {
                                visible: true, height: 7, width: 7, shape: 'Pentagon', isFilled: true
                            }, width: 2 }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: 'x', yName: 'y', name: 'England', type: 'Polar', marker: {
                                visible: true, height: 7, width: 7, shape: 'Pentagon', isFilled: true
                            }, width: 2 }))),
                React.createElement("div", { style: { float: 'right', marginRight: '10px' } },
                    "Source: \u00A0",
                    React.createElement("a", { href: "http://www.yr.no/place/USA/Alaska/Hatcher_Pass/statistics.html", target: "_blank", "aria-label": "Navigate to the documentation for yr" }, "www.yr.no"))),
            React.createElement("div", { className: 'col-md-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", null, "Series Type:")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { width: 120, id: "selmode", change: change.bind(_this), ref: function (d) { return dropElement = d; }, dataSource: droplist, fields: { text: 'value', value: 'value' }, value: "Polar" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "closed" }, "Closed: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "isClosed", defaultChecked: true, onChange: closed.bind(_this), style: { marginLeft: '-5px' }, ref: function (d) { return checkElement = d; }, "aria-labelledby": "Checkbox checked" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "st-lbl" }, "Start Angle: 0")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", { "data-role": "rangeslider" },
                                        React.createElement("input", { type: "range", defaultValue: "0", min: "0", max: "360", id: "startangle", onChange: startAngle.bind(_this), style: { marginLeft: '-5px' }, ref: function (d) { return startangle = d; }, "aria-labelledby": "Slider" })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", { style: { width: '60%' } },
                                    React.createElement("div", { id: "inversed" }, "Inversed: ")),
                                React.createElement("td", { style: { width: '40%' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "checkbox", id: "isinversed", onChange: isInversed.bind(_this), style: { marginLeft: '-5px' }, ref: function (d) { return inversed = d; }, "aria-labelledby": "Checkbox unchecked" }))))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates polar series with line type for Alaska weather statistics data of the year 2016. The angle can be changed and the series can be inversed by using the properties in the panel.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the line type charts. Line type charts are used to represent time-dependent data, showing trends in data at equal intervals. You can use ",
                React.createElement("code", null, "dashArray"),
                ", ",
                React.createElement("code", null, "width"),
                ", ",
                React.createElement("code", null, "fill"),
                " properties to customize the line. ",
                React.createElement("code", null, "marker"),
                " and ",
                React.createElement("code", null, "dataLabel"),
                " are used to represent individual data and its value."),
            React.createElement("p", null, "Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject ",
                React.createElement("code", null, "LineSeries"),
                ", ",
                React.createElement("code", null, "PolarSeries"),
                " and ",
                React.createElement("code", null, "RadarSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the polar and radar series with a line type chart can be found in this \u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/polar#line", "aria-label": "Navigate to the documentation for Polar Line in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = PolarLine;
