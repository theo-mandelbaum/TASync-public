"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.femaleData = exports.maleData = exports.totalData = void 0;
/**
 * Sample for Column Series with disabled side by side placement
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
exports.totalData = [
    { country: 'India', population: 1450935791 },
    { country: 'China', population: 1419321278 },
    { country: 'USA', population: 345426571 },
    { country: 'Indonesia', population: 283487931 },
    { country: 'Pakistan', population: 251269164 }
];
exports.maleData = [
    { country: 'India', male: 748323427 },
    { country: 'China', male: 723023723 },
    { country: 'USA', male: 173551527 },
    { country: 'Indonesia', male: 142407931 },
    { country: 'Pakistan', male: 127433405 }
];
exports.femaleData = [
    { country: 'India', female: 702612364 },
    { country: 'China', female: 696297555 },
    { country: 'USA', female: 171875044 },
    { country: 'Indonesia', female: 141080014 },
    { country: 'Pakistan', female: 123835758 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var ColumnPlacemen = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        var selectedTheme = (0, theme_color_1.loadChartTheme)(args);
        if (selectedTheme.indexOf('Dark') !== -1 || selectedTheme.indexOf('HighContrast') !== -1) {
            args.chart.legendSettings.border = { width: 2, color: '#FFFFFF' };
        }
        else {
            args.chart.legendSettings.border = { width: 2, color: '#000000' };
        }
    };
    var axisLabelRender = function (args) {
        var value = parseInt(args.text.replace(/,/g, ''), 10);
        if (value >= 1000000) {
            args.text = (value / 1000000).toFixed(0) + 'M';
        }
    };
    var sharedTooltipRender = function (args) {
        if (args.text && args.point && args.series) {
            for (var i = 0; i < args.point.length; i++) {
                if (args.point[i] && args.point[i].y !== undefined) {
                    var formattedValue = args.point[i].y.toLocaleString('en-US');
                    var seriesName = args.series[i] ? args.series[i].name : "Series ".concat(i + 1);
                    args.text[i] = "".concat(seriesName, ": <b>").concat(formattedValue, "</b>");
                }
            }
        }
    };
    var resize = function (args) {
        var maxWidth = args.chart.availableSize.width;
        args.chart.legendSettings.location.x = maxWidth - 115;
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, interval: 1, majorGridLines: { width: 0 }, labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0 }, primaryYAxis: { majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Inhabitants (Millions)', interval: 300000000 }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, enableSideBySidePlacement: false, title: 'Population Distribution of the Top 5 Most Populous Countries (2024)', subTitle: 'Source: statisticstimes.com', tooltip: { enable: true, shared: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', legendSettings: { visible: true, shapeWidth: 9, shapeHeight: 9, maximumColumns: 1, position: 'Custom', location: { x: 750, y: 80 } }, load: load.bind(_this), loaded: onChartLoad.bind(_this), axisLabelRender: axisLabelRender.bind(_this), sharedTooltipRender: sharedTooltipRender.bind(_this), resized: resize.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.totalData, xName: 'country', yName: 'population', name: 'Total', type: 'Column', columnWidth: 0.5, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.maleData, xName: 'country', yName: 'male', name: 'Male', type: 'Column', columnWidth: 0.3, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.femaleData, xName: 'country', yName: 'female', name: 'Female', type: 'Column', columnWidth: 0.2, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample shows three series of columns in which each column is rendered with a different width and placed behind the previous column.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories. The ",
                React.createElement("code", null, "EnableSideBySidePlacement"),
                " property is used to enable and disable side-by-side positioning. DataLabel is used to present details about individual data points."),
            React.createElement("p", null, "Tooltip is enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject ",
                React.createElement("code", null, "ColumnSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the column series can be found in this ",
                React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/chart-types/#column-charts", "aria-label": "Navigate to the documentation for Column Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = ColumnPlacemen;
