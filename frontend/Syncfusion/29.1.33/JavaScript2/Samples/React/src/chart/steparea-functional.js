"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stepAreaData = void 0;
/**
 * Sample for Step Area Series
 */
var React = require("react");
var react_1 = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var theme_color_1 = require("./theme-color");
exports.stepAreaData = [
    { period: new Date(2023, 1, 1), unit: 137 },
    { period: new Date(2023, 2, 1), unit: 163 },
    { period: new Date(2023, 3, 1), unit: 145 },
    { period: new Date(2023, 4, 1), unit: 175 },
    { period: new Date(2023, 5, 1), unit: 151 },
    { period: new Date(2023, 6, 1), unit: 159 },
    { period: new Date(2023, 7, 1), unit: 168 },
    { period: new Date(2023, 8, 1), unit: 168 },
    { period: new Date(2023, 9, 1), unit: 177 },
    { period: new Date(2023, 10, 1), unit: 147 },
    { period: new Date(2023, 11, 1), unit: 172 },
    { period: new Date(2024, 0, 1), unit: 173 },
    { period: new Date(2024, 1, 2), unit: 143 }
];
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var StepArea = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var previousYValue = null;
    var onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        previousYValue = null;
    };
    var load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    var axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'K';
        }
    };
    var textRender = function (args) {
        var point = args.point;
        if (previousYValue !== null) {
            var difference = point.y - previousYValue;
            var triangleDirection = difference >= 0 ? 'border-bottom' : 'border-top';
            var triangleColor = difference >= 0 ? 'green' : 'red';
            var percentage = "".concat(((difference / previousYValue) * 100).toFixed(1), "%");
            args.template = "\n                <div>".concat(point.y, "K</div>\n                <div style=\"display: inline-block; vertical-align: middle;\">\n                    <div class=\"triangle\" style=\"width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; ").concat(triangleDirection, ": 10px solid ").concat(triangleColor, "; display: inline-block; margin-right: 5px;\"></div>\n                </div>").concat(percentage);
        }
        previousYValue = point.y;
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', plotOffsetLeft: 50, plotOffsetRight: 50, labelFormat: 'MMM-yy', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, primaryYAxis: { title: 'Units', opposedPosition: true, labelFormat: 'n0', minimum: 120, maximum: 200, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, width: '90%', chartArea: { border: { width: 0 } }, tooltip: { enable: true, showNearestTooltip: true, header: 'Unit Sold', format: '${point.x} : <b>${point.y}K</b>' }, title: 'Unit Sold Trend', subTitle: 'CM vs LM | By Month', load: load.bind(_this), loaded: onChartLoad.bind(_this), axisLabelRender: axisLabelRender.bind(_this), textRender: textRender.bind(_this) },
                React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepAreaSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime] }),
                React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                    React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.stepAreaData, xName: "period", yName: "unit", step: 'Center', width: 3, type: "StepArea", opacity: 0.5, marker: { visible: true, width: 7, height: 7, isFilled: true, dataLabel: { visible: true, position: 'Auto', template: '<div>${point.y}K</div>' } }, border: { width: 2 } })))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This React Step Area Chart example visualizes the trend of unit sales over several months. It highlights changes in sales units using a step area style, providing clear insights into how sales have fluctuated over time.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "In this example, you can see how to render and configure a step area chart. This series forms a step progress by connecting points through vertical and horizontal lines with the area being filled."),
            React.createElement("p", null,
                React.createElement("b", null, "Injecting Module")),
            React.createElement("p", null,
                "Chart component features are segregated into individual feature-wise modules. To use step area series, we need to inject ",
                React.createElement("code", null, "StepAreaSeries"),
                " module into ",
                React.createElement("code", null, "services"),
                "."),
            React.createElement("p", null,
                "More information about area series can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/step-area", "aria-label": "Navigate to the documentation for Step Area Chart in React Chart component" }, "documentation section"),
                "."))));
};
exports.default = StepArea;
