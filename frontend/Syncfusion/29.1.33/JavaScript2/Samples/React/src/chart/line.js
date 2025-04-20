"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Line = exports.mexicoData = exports.polandData = exports.franceData = exports.indonesiaData = exports.vietnamData = void 0;
/**
 * Sample for Line Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var theme_color_1 = require("./theme-color");
var sample_base_1 = require("../common/sample-base");
exports.vietnamData = [
    { x: 2016, y: 7.8 },
    { x: 2017, y: 10.3 },
    { x: 2018, y: 15.5 },
    { x: 2019, y: 17.5 },
    { x: 2020, y: 19.5 },
    { x: 2021, y: 23.0 },
    { x: 2022, y: 20.0 },
    { x: 2023, y: 19.0 },
    { x: 2024, y: 22.1 }
];
exports.indonesiaData = [
    { x: 2016, y: 4.8 },
    { x: 2017, y: 5.2 },
    { x: 2018, y: 6.2 },
    { x: 2019, y: 7.8 },
    { x: 2020, y: 9.3 },
    { x: 2021, y: 14.3 },
    { x: 2022, y: 15.6 },
    { x: 2023, y: 16.0 },
    { x: 2024, y: 17.0 }
];
exports.franceData = [
    { x: 2016, y: 14.6 },
    { x: 2017, y: 15.5 },
    { x: 2018, y: 15.4 },
    { x: 2019, y: 14.4 },
    { x: 2020, y: 11.6 },
    { x: 2021, y: 13.9 },
    { x: 2022, y: 12.1 },
    { x: 2023, y: 10.0 },
    { x: 2024, y: 10.8 }
];
exports.polandData = [
    { x: 2016, y: 8.9 },
    { x: 2017, y: 10.3 },
    { x: 2018, y: 10.8 },
    { x: 2019, y: 9.0 },
    { x: 2020, y: 7.9 },
    { x: 2021, y: 8.5 },
    { x: 2022, y: 7.4 },
    { x: 2023, y: 6.4 },
    { x: 2024, y: 7.1 }
];
exports.mexicoData = [
    { x: 2016, y: 19.0 },
    { x: 2017, y: 20.0 },
    { x: 2018, y: 20.2 },
    { x: 2019, y: 18.4 },
    { x: 2020, y: 16.8 },
    { x: 2021, y: 18.5 },
    { x: 2022, y: 18.4 },
    { x: 2023, y: 16.3 },
    { x: 2024, y: 13.7 }
];
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n         .charts {\n             align :center\n         }";
var Line = /** @class */ (function (_super) {
    __extends(Line, _super);
    function Line() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Line.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'Double', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, load: this.load.bind(this), primaryYAxis: { title: 'Volume in million metric tons', labelFormat: '{value}', rangePadding: 'None', minimum: 0, maximum: 25, interval: 5, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, chartArea: { border: { width: 0 }, margin: { bottom: 12 } }, tooltip: { enable: true, enableHighlight: true, showNearestTooltip: true, header: '<b>${series.name}</b>', format: '${point.x} : <b>${point.y}M</b>' }, legendSettings: { enableHighlight: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "Annual Crude Steel Production by Country (2016\u20132024)", subTitle: "Source: wikipedia.org", loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.LineSeries, ej2_react_charts_1.Double, ej2_react_charts_1.Legend, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.vietnamData, xName: "x", yName: "y", name: "Vietnam", width: 2, marker: { visible: true, width: 7, height: 7, shape: 'Circle', isFilled: true }, type: "Line" }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.indonesiaData, xName: "x", yName: "y", name: "Indonesia", width: 2, marker: { visible: true, width: 6, height: 6, shape: 'Triangle', isFilled: true }, type: "Line" }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.franceData, xName: "x", yName: "y", name: "France", width: 2, marker: { visible: true, width: 7, height: 7, shape: 'Diamond', isFilled: true }, type: "Line" }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.polandData, xName: "x", yName: "y", name: "Poland", width: 2, marker: { visible: true, width: 5, height: 5, shape: 'Rectangle', isFilled: true }, type: "Line" }),
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.mexicoData, xName: "x", yName: "y", name: "Mexico", width: 2, marker: { visible: true, width: 7, height: 7, shape: 'Pentagon', isFilled: true }, type: "Line" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Line Chart example represents the crude steel production annual growth data with default line series in the chart. Data points are enhanced with marker and tooltip.")),
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
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use line series, we need to inject ",
                    React.createElement("code", null, "LineSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the line series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "http://ej2.syncfusion.com/react/documentation/chart/chart-types/#line-charts", "aria-label": "Navigate to the documentation for Line Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    Line.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    Line.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    return Line;
}(sample_base_1.SampleBase));
exports.Line = Line;
