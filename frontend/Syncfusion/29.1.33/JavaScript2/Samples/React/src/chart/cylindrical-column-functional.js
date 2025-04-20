"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.cylindricalData = void 0;
/**
 * Sample for the Cylindrical Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.cylindricalData = [
    { year: '2017 - 18', energy: 228.0 },
    { year: '2018 - 19', energy: 261.8 },
    { year: '2019 - 20', energy: 294.3 },
    { year: '2020 - 21', energy: 297.5 },
    { year: '2021 - 22', energy: 322.6 },
    { year: '2022 - 23', energy: 365.59 },
];
var CylindricalColumn = function () {
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
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, chartArea: { border: { width: 0 } }, title: 'Year-wise Renewable Energy Generation Trends in India', subTitle: 'Source: wikipedia.org', primaryXAxis: {
                    valueType: 'Category',
                    interval: 1,
                    majorGridLines: { width: 0 },
                    labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Trim',
                    labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0,
                    majorTickLines: { width: 0 },
                    minorTickLines: { width: 0 }
                }, primaryYAxis: {
                    title: 'Total Renewable Power (TWh)',
                    labelFormat: '{value}TWh',
                    minimum: 150,
                    maximum: 400,
                    interval: 50,
                    majorTickLines: { width: 0 },
                    lineStyle: { width: 0 }
                }, tooltip: {
                    enable: true,
                    header: '<b>${point.x}</b>',
                    format: '${series.name}: <b>${point.y}</b>'
                }, legendSettings: { visible: false }, load: load.bind(_this), loaded: onChartLoad.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%' },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Legend] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.cylindricalData, columnFacet: 'Cylinder', type: 'Column', name: 'India', xName: 'year', yName: 'energy', columnSpacing: 0.3 })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the year-wise renewable energy generation trends in India using a cylindrical column chart. The chart displays the total renewable energy generation in terawatt-hours (TWh) for each year from 2017 to 2023.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can observe the rendering and configuration of a cylindrical column chart. The cylindrical column chart serves the purpose of comparing the frequency, count, total, or average of data across various categories using a cylindrical shape."),
            React.createElement("p", null, "Tooltips have been enabled in this example. To experience the tooltip functionality, simply hover over a point or tap on it in touch-enabled devices.                    "),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use  column series, we need to inject ",
                React.createElement("code", null, "ColumnSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the column series can be found in this \u00A0",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column#cylindrical-column-chart", "aria-label": "Navigate to the documentation for Cylindrical Column in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = CylindricalColumn;
