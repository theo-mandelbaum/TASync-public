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
exports.StepArea = exports.stepAreaData = void 0;
/**
 * Sample for Step Area Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
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
var SAMPLE_CSS = "\n    .control-fluid {\n         padding: 0px !important;\n     }";
var StepArea = /** @class */ (function (_super) {
    __extends(StepArea, _super);
    function StepArea() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.previousYValue = null;
        return _this;
    }
    StepArea.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', plotOffsetLeft: 50, plotOffsetRight: 50, labelFormat: 'MMM-yy', majorGridLines: { width: 0 }, majorTickLines: { width: 0 } }, primaryYAxis: { title: 'Units', opposedPosition: true, labelFormat: 'n0', minimum: 120, maximum: 200, interval: 20, lineStyle: { width: 0 }, majorTickLines: { width: 0 } }, width: '90%', chartArea: { border: { width: 0 } }, tooltip: { enable: true, showNearestTooltip: true, header: 'Unit Sold', format: '${point.x} : <b>${point.y}' }, title: 'Unit Sold Trend', subTitle: 'CM vs LM | By Month', titleStyle: { textAlignment: 'Near' }, subTitleStyle: { textAlignment: 'Near' }, load: this.load.bind(this), loaded: this.onChartLoad.bind(this), axisLabelRender: this.axisLabelRender.bind(this), textRender: this.textRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.StepAreaSeries, ej2_react_charts_1.Tooltip, ej2_react_charts_1.DataLabel, ej2_react_charts_1.DateTime] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.stepAreaData, xName: "period", yName: "unit", step: 'Center', width: 3, type: "StepArea", opacity: 0.5, marker: { visible: true, width: 7, height: 7, isFilled: true, dataLabel: { visible: true, position: 'Auto', template: '<div>${point.y}K</div>' } }, border: { width: 2 } })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This React Step Area Chart example visualizes the trend of unit sales over several months. It highlights changes in sales units using a step area style, providing clear insights into how sales have fluctuated over time.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "In this example, you can see how to render and configure a step area chart. This series forms a step progress by connecting points through vertical and horizontal lines with the area being filled."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
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
    StepArea.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
        this.previousYValue = null;
    };
    ;
    StepArea.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Tailwind3';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    StepArea.prototype.axisLabelRender = function (args) {
        if (args.axis.name === 'primaryYAxis') {
            args.text = args.text + 'K';
        }
    };
    ;
    StepArea.prototype.textRender = function (args) {
        var point = args.point;
        if (this.previousYValue !== null) {
            var difference = point.y - this.previousYValue;
            var triangleDirection = difference >= 0 ? 'border-bottom' : 'border-top';
            var triangleColor = difference >= 0 ? 'green' : 'red';
            var percentage = "".concat(((difference / this.previousYValue) * 100).toFixed(1), "%");
            args.template = "\n                <div>".concat(point.y, "K</div>\n                <div style=\"display: inline-block; vertical-align: middle;\">\n                    <div class=\"triangle\" style=\"width: 0; height: 0; border-left: 5px solid transparent; border-right: 5px solid transparent; ").concat(triangleDirection, ": 10px solid ").concat(triangleColor, "; display: inline-block; margin-right: 5px;\"></div>\n                </div>").concat(percentage);
        }
        this.previousYValue = point.y;
    };
    ;
    return StepArea;
}(sample_base_1.SampleBase));
exports.StepArea = StepArea;
