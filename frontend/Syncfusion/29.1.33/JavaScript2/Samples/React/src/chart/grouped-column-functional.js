"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data6 = exports.data5 = exports.data4 = exports.data3 = exports.data2 = exports.data1 = void 0;
/**
 * Sample for grouped Column series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.data1 = [
    { x: '2016', y: 104 },
    { x: '2020', y: 121 },
    { x: '2024', y: 113 }
];
exports.data2 = [
    { x: '2016', y: 46 },
    { x: '2020', y: 46 },
    { x: '2024', y: 39 }
];
exports.data3 = [
    { x: '2016', y: 65 },
    { x: '2020', y: 67 },
    { x: '2024', y: 65 }
];
exports.data4 = [
    { x: '2016', y: 29 },
    { x: '2020', y: 27 },
    { x: '2024', y: 22 }
];
exports.data5 = [
    { x: '2016', y: 91 },
    { x: '2020', y: 70 },
    { x: '2024', y: 88 }
];
exports.data6 = [
    { x: '2016', y: 38 },
    { x: '2020', y: 26 },
    { x: '2024', y: 38 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var GroupedColumn = function () {
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
    var tooltipRender = function (args) {
        var _a;
        var seriesName = args.series.name;
        var groupName = (_a = args.series.groupName) !== null && _a !== void 0 ? _a : '';
        var value = args.point.y;
        args.text = seriesName.includes('Gold') ? "".concat(groupName, ": <b>").concat(value, " Gold</b>") : "".concat(groupName, ": <b>").concat(value, " Total</b>");
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, load: load.bind(_this), tooltipRender: tooltipRender.bind(_this), primaryXAxis: { valueType: 'Category', interval: 1, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, primaryYAxis: { majorTickLines: { width: 0 }, lineStyle: { width: 0 }, title: 'Number of Medals Won' }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, tooltip: { enable: true, enableHighlight: true, header: '<b>${point.x}</b>', format: '${series.groupName} : <b>${point.y} Gold</b>' }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Olympic Medal Trends by Country and Year", subTitle: "A Historical Overview of Medal Counts Across Nations", legendSettings: { visible: true, shapeWidth: 9, shapeHeight: 9 }, loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.DataLabel] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: "x", yName: "y", name: "USA Total Medals", type: "Column", groupName: "USA", columnWidth: 0.7, columnSpacing: 0.1, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data2, xName: "x", yName: "y", name: "USA Gold Medals", type: "Column", groupName: "USA", columnWidth: 0.5, columnSpacing: 0.1, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data3, xName: "x", yName: "y", name: "UK Total Medals", type: "Column", groupName: "UK", columnWidth: 0.7, columnSpacing: 0.1, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data4, xName: "x", yName: "y", name: "UK Gold Medals", type: "Column", groupName: "UK", columnWidth: 0.5, columnSpacing: 0.1, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data5, xName: "x", yName: "y", name: "China Total Medals", type: "Column", groupName: "China", columnWidth: 0.7, columnSpacing: 0.1, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data6, xName: "x", yName: "y", name: "China Gold Medals", type: "Column", groupName: "China", columnWidth: 0.5, columnSpacing: 0.1, marker: { dataLabel: { visible: true, position: 'Top', font: { fontWeight: '600', color: '#ffffff' } } }, cornerRadius: { topLeft: 4, topRight: 4 }, legendShape: 'Rectangle' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the Olympics medal count using a grouped column series. Data labels are used to display the values of data points.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the column type charts. Column type charts are used for comparing the frequency, count, total or average of data in different categories. You can group the column series by using ",
                React.createElement("code", null, "groupName"),
                " property."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use column series, we need to inject ",
                React.createElement("code", null, "ColumnSeries"),
                " module using ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("br", null),
            React.createElement("p", null,
                "More information about the grouped column series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column#grouped-column", "aria-label": "Navigate to the documentation for Grouped Column in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = GroupedColumn;
