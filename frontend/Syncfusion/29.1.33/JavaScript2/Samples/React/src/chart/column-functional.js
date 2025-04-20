"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.columnData = void 0;
/**
 * Sample for the Column Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.columnData = [
    { country: 'Chile', walnuts: 175000, almonds: 11300 },
    { country: 'European Union', walnuts: 140000, almonds: 135000 },
    { country: 'Turkey', walnuts: 67000, almonds: 24000 },
    { country: 'India', walnuts: 33000, almonds: 4200 },
    { country: 'Australia', walnuts: 12000, almonds: 154000 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Column = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var loaded = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var axisLabelRender = function (args) {
        var value = parseInt(args.text.replace(/,/g, ''), 10);
        if (value >= 1000) {
            args.text = value / 1000 + 'K';
        }
    };
    var tooltipRender = function (args) {
        if (args.text) {
            var value = args.point.y.toLocaleString('en-US');
            args.text = "".concat(args.series.name, ": <b>").concat(value, "</b>");
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, primaryXAxis: { valueType: 'Category', interval: 1, labelIntersectAction: ej2_base_1.Browser.isDevice ? 'None' : 'Trim', labelRotation: ej2_base_1.Browser.isDevice ? -45 : 0, majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, primaryYAxis: { title: 'Metric Tons', interval: 40000, majorTickLines: { width: 0 }, lineStyle: { width: 0 } }, legendSettings: { visible: true, enableHighlight: true, shapeWidth: 9, shapeHeight: 9 }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, tooltip: { enable: true, header: '<b>${point.x}</b>', format: '${series.name}: <b>${point.y}</b>', enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Walnuts and Almonds Estimated Production for 2023', subTitle: 'Source: fas.usda.gov', loaded: loaded.bind(_this), load: load.bind(_this), axisLabelRender: axisLabelRender.bind(_this), tooltipRender: tooltipRender.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.ColumnSeries, ej2_react_charts_1.Category, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.columnData, xName: 'country', yName: 'walnuts', name: 'Walnuts', type: 'Column', cornerRadius: { topLeft: 4, topRight: 4 }, columnSpacing: 0.4, legendShape: 'Rectangle' }),
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.columnData, xName: 'country', yName: 'almonds', name: 'Almonds', type: 'Column', cornerRadius: { topLeft: 4, topRight: 4 }, columnSpacing: 0.4, legendShape: 'Rectangle' })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React column chart example visualizes the production of Walnuts and Almonds for different countries in 2023.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a column chart. The column chart is used to compare the frequency, count, total, or average of data in different categories."),
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
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/column", "aria-label": "Navigate to the documentation for Column Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = Column;
