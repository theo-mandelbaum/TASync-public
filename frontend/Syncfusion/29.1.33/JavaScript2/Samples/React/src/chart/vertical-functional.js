"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Samples for vertical chart
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var VerticalChart = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts-vertical');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts-vertical', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, load: load.bind(_this), primaryYAxis: { title: 'Sales in Billion', majorGridLines: { width: 0 }, minimum: 11000, maximum: 15000, interval: 500, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, isTransposed: true, legendSettings: { visible: false }, tooltip: { enable: true, enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Sales Vs Profit Margins', loaded: onChartLoad.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.ColumnSeries] }),
                React.createElement(ej2_react_charts_1.AxesDirective, null,
                    React.createElement(ej2_react_charts_1.AxisDirective, { majorGridLines: { width: 0 }, opposedPosition: true, title: 'Profit(In Percentage)', lineStyle: { width: 0 }, minimum: 0, maximum: 4, interval: 0.5, majorTickLines: { width: 0 }, name: 'yAxis2', labelFormat: '{value}%' })),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { width: 2, dataSource: [{ Year: "2016", column: 13600 }, { Year: "2017", column: 12900 }, { Year: "2018", column: 12500 }, { Year: "2019", column: 14500 }, { Year: "2020", column: 14500 }, { Year: "2021", column: 12000 }], xName: 'Year', name: "Sales", yName: 'column', type: 'Column' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { width: 2, dataSource: [{ Year: "2016", column: 13600, series: 0.5 }, { Year: "2017", series: 1.5 }, { Year: "2018", series: 3.5 }, { Year: "2019", series: 1.5 }, { Year: "2020", series: 3 }, { Year: "2021", series: 2.5 }], yAxisName: "yAxis2", name: "Profit Margin", xName: 'Year', yName: 'series', type: 'Line', marker: { visible: true, width: 7, height: 7, isFilled: true } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a sales versus profit margin analysis using a vertical chart by changing the orientation of the x-axis to vertical and the y-axis to horizontal.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the vertical type charts. To render a chart in vertical manner, you can use ",
                React.createElement("code", null, "isTransposed"),
                " in chart."),
            React.createElement("p", null,
                "More information on the isTransposed can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/vertical", "aria-label": "Navigate to the documentation for Vertical Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = VerticalChart;
