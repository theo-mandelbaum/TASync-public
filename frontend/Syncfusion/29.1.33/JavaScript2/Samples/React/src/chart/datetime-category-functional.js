"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = exports.pointRender = void 0;
/**
 * Sample for smart axis labels
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var pointRender = function (args) {
    var materialColors = ['#00bdae', '#404041', '#357cd2', '#e56590', '#f8b883', '#70ad47', '#dd8abd', '#7f84e8', '#7bb4eb',
        '#ea7a57', '#404041', '#00bdae'];
    var fabricColors = ['#4472c4', '#ed7d31', '#ffc000', '#70ad47', '#5b9bd5',
        '#c1c1c1', '#6f6fe2', '#e269ae', '#9e480e', '#997300', '#4472c4', '#70ad47', '#ffc000', '#ed7d31'];
    var selectedTheme = location.hash.split('/')[1];
    if (selectedTheme && selectedTheme.indexOf('fabric') > -1) {
        args.fill = fabricColors[args.point.index];
    }
    else {
        args.fill = materialColors[args.point.index];
    }
};
exports.pointRender = pointRender;
exports.data1 = [
    { x: new Date(2017, 11, 20), y: 21, DataLabelMappingName: "21M" }, { x: new Date(2017, 11, 21), y: 24, DataLabelMappingName: "24M" },
    { x: new Date(2017, 11, 22), y: 24, DataLabelMappingName: "24M" }, { x: new Date(2017, 11, 26), y: 70, DataLabelMappingName: "70M" },
    { x: new Date(2017, 11, 27), y: 75, DataLabelMappingName: "75M" }, { x: new Date(2018, 0, 2), y: 82, DataLabelMappingName: "82M" },
    { x: new Date(2018, 0, 3), y: 53, DataLabelMappingName: "53M" }, { x: new Date(2018, 0, 4), y: 54, DataLabelMappingName: "54M" },
    { x: new Date(2018, 0, 5), y: 53, DataLabelMappingName: "53M" }, { x: new Date(2018, 0, 8), y: 45, DataLabelMappingName: "45M" }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var DatetimeCategoryAxis = function () {
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
        React.createElement("div", { className: 'control-section row' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'DateTimeCategory', intervalType: 'Days', skeleton: 'Ed', majorGridLines: { width: 0 }, stripLines: [{ visible: true, start: new Date(2017, 11, 20), end: new Date(2017, 11, 27), color: 'skyblue', opacity: 0.5, }, { visible: true, start: new Date(2018, 0, 2), end: new Date(2018, 0, 8), color: 'pink', opacity: 0.5 },], title: 'Business Days', labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0 }, chartArea: { border: { width: 0 } }, primaryYAxis: { labelFormat: '{value}M', rangePadding: 'None', minimum: 0, maximum: 100, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: load.bind(_this), title: "Sales Comparison of a Product", loaded: onChartLoad.bind(_this), legendSettings: { visible: false }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: false } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.DateTimeCategory, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation, ej2_react_charts_1.StripLine, ej2_react_charts_1.DataLabel] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div style="color:#FF0000;font-family: bold; font-weight: 600">Christmas Offer<br> Dec 2017</div>', x: new Date(2017, 11, 22), y: 90, coordinateUnits: 'Point' }),
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: '<div style="color:#FF0000;font-family: bold; font-weight: 800">New Year Offer<br> Jan 2018</div>', x: new Date(2018, 0, 4), y: 90, coordinateUnits: 'Point' })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: "Product", type: 'Column', marker: { dataLabel: { visible: true, enableRotation: ej2_base_1.Browser.isDevice ? true : false, angle: -90, position: 'Top', name: 'DataLabelMappingName' } } }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows the date-time category axis with sample data about the sales of a product on different business days.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The date-time category axis is used to display date-time values with nonlinear intervals. For example, business days alone can be depicted here in a week. To use a date-time category axis, set the ",
                React.createElement("code", null, "ValueType"),
                " in axis to ",
                React.createElement("b", null, "DateTimeCategory"),
                "."),
            React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover a point or tap a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. For datetime category axis, you should inject ",
                React.createElement("code", null, "DateTimeCategory"),
                " module by using ",
                React.createElement("code", null, "Chart.Inject(DateTimeCategory)"),
                "method."),
            React.createElement("p", null,
                "More information on the date time category can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/date-time-axis/#datetimecategory-axis", "aria-label": "Navigate to the documentation for Date Time Category Axis in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = DatetimeCategoryAxis;
