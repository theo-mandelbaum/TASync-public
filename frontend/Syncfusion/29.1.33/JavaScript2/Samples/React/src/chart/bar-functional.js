"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.oppoData = exports.xiaomiData = exports.appleData = void 0;
/**
 * Sample for the Bar Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.appleData = [
    { year: '2021', count: 237 },
    { year: '2022', count: 226.4 },
    { year: '2023', count: 234.6 }
];
exports.xiaomiData = [
    { year: '2021', count: 190 },
    { year: '2022', count: 153.1 },
    { year: '2023', count: 145.9 }
];
exports.oppoData = [
    { year: '2021', count: 143 },
    { year: '2022', count: 103.3 },
    { year: '2023', count: 103.1 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Bar = function () {
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
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", null,
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, legendSettings: { enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }, primaryXAxis: { valueType: 'Category', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}M', title: 'Units Sold (in Millions)', maximum: 300, edgeLabelPlacement: 'Shift', majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, load: load.bind(_this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Global Smartphone Sales Trends by Brand (2021-2023)', subTitle: 'Source: wikipedia.org', loaded: onChartLoad.bind(_this), tooltip: { enable: true, enableHighlight: true, header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}</b>' } },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.BarSeries, ej2_react_charts_1.DataLabel, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.appleData, xName: 'year', yName: 'count', type: 'Bar', columnSpacing: 0.3, name: "Apple", cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.xiaomiData, xName: 'year', yName: 'count', type: 'Bar', columnSpacing: 0.3, name: 'Xiaomi', cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle' }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.oppoData, xName: 'year', yName: 'count', type: 'Bar', columnSpacing: 0.3, name: 'Oppo', cornerRadius: { bottomRight: 4, topRight: 4 }, legendShape: 'Rectangle' }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the global smartphone sales trends by brand from 2021 to 2023 using a bar chart. The data is visualized with bars representing unit sales for different brands, highlighting the comparative performance of each brand over the years.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure the bar chart. The bar chart is similar to the column chart, but the orientation of the y-axis is horizontal rather than vertical."),
            React.createElement("p", null,
                React.createElement("code", null, "Tooltips"),
                " are enabled in this example. To see the tooltip in action, hover over a point or tap on a point in touch-enabled devices."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use bar series, we need to inject ",
                React.createElement("code", null, "BarSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information on the bar series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/bar", "aria-label": "Navigate to the documentation for Bar Chart in ASP.NET Core Chart component" }, "documentation section"),
                "."))));
};
exports.default = Bar;
