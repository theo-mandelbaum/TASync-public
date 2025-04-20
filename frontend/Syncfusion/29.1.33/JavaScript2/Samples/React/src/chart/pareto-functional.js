"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.data1 = void 0;
/**
 * Sample for Pareto chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
exports.data1 = [
    { x: 'Button Defect', y: 23 }, { x: 'Pocket Defect', y: 16 },
    { x: 'Collar Defect ', y: 10 }, { x: 'Cuff Defect', y: 7 },
    { x: 'Sleeve Defect', y: 6 }, { x: 'Other Defect', y: 2 }
];
var ParetoChart = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        var selectedTheme = (0, theme_color_1.loadChartTheme)(args);
        if (selectedTheme === 'Material3') {
            args.chart.series[0].paretoOptions.fill = '#F7523F';
            args.chart.series[0].paretoOptions.marker.fill = '#F7523F';
        }
        else {
            args.chart.series[0].paretoOptions.fill = null;
            args.chart.series[0].paretoOptions.marker.fill = null;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { interval: 1, valueType: 'Category', majorGridLines: { width: 0 }, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Rotate45', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, minorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 }, lineStyle: { width: 0 }, }, primaryYAxis: { title: 'Frequency of Occurence', minimum: 0, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, majorGridLines: { width: 1 }, minorGridLines: { width: 1 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), title: 'Defects in Shirts', loaded: onChartLoad.bind(_this), legendSettings: { visible: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: true, shared: true, format: '${series.name} : <b>${point.y}</b>' } },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.Category, ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Legend, ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ParetoSeries, ej2_react_charts_1.Highlight] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.data1, xName: 'x', yName: 'y', name: 'Defect', type: 'Pareto', width: 2, opacity: 0.75, columnWidth: 0.4, cornerRadius: { topLeft: ej2_base_1.Browser.isDevice ? 4 : 6, topRight: ej2_base_1.Browser.isDevice ? 4 : 6 }, paretoOptions: { marker: { visible: true, isFilled: true, width: 7, height: 7 }, dashArray: '3,2', width: 2 } }))),
            React.createElement("div", { style: { float: 'right', marginRight: '10px' } })),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample visualizes the defects in shirts with default pareto series in the chart. Data points are enhanced with marker and tooltip.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a pareto chart. The pareto chart is used to find the cumulative values of the data in different categories. It is a combination of the column and line series. The initial values are shown in the column chart and the cumulative values are shown in the line chart."),
            React.createElement("p", null,
                "The line series in the pareto chart can be customized using the ",
                React.createElement("code", null, "fill"),
                ", ",
                React.createElement("code", null, "dashArray"),
                ", ",
                React.createElement("code", null, "width"),
                ", and ",
                React.createElement("code", null, "marker"),
                " properties in ",
                React.createElement("code", null, "paretoOptions"),
                ". Additionally, the secondary axis in the pareto chart can be shown or hidden using the ",
                React.createElement("code", null, "showAxis"),
                " property in ",
                React.createElement("code", null, "paretoOptions"),
                "."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltip"),
                " is enabled in this example. To see the tooltip in action, hover a point or tap on a point in touch enabled devices."),
            React.createElement("br", null),
            React.createElement("p", { style: { "fontWeight": 500 } },
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "In this example, we have used pareto series with the help of column and line series. To use pareto feature, we need to inject ",
                React.createElement("code", null, "ParetoSeries"),
                ", ",
                React.createElement("code", null, "ColumnSeries"),
                " and ",
                React.createElement("code", null, "LineSeries"),
                " modules into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the pareto series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/pareto", "aria-label": "Navigate to the documentation for Pareto in React Chart component" }, " documentation section"),
                "."))));
};
exports.default = ParetoChart;
