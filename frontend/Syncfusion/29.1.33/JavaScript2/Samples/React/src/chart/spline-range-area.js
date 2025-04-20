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
exports.SplineRangeArea = void 0;
/**
 * Sample for Range Area Series
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var financial_data_1 = require("./financial-data");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n      .control-fluid {\n          padding: 0px !important;\n      }";
var SplineRangeArea = /** @class */ (function (_super) {
    __extends(SplineRangeArea, _super);
    function SplineRangeArea() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SplineRangeArea.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: 'charts', style: { textAlign: "center" }, load: this.load.bind(this), primaryXAxis: { valueType: 'DateTime', labelFormat: 'dd MMM', edgeLabelPlacement: (ej2_base_1.Browser.isDevice) ? 'Shift' : 'Hide', majorGridLines: { width: 0 } }, primaryYAxis: { labelFormat: '{value}˚C', lineStyle: { width: 0 }, minimum: -10, maximum: 25, interval: 5, majorTickLines: { width: 0 } }, chartArea: { border: { width: 0 } }, tooltip: { enable: true, format: 'Temperature : <b>${point.low} - ${point.high}</b>', header: '<b>${point.x}</b>', shared: false, showNearestTooltip: true }, width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: 'Temperature Variation by Month', loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.SplineRangeAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.Highlight] }),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: financial_data_1.chartDataValues, border: { width: 2 }, xName: 'x', high: 'high', opacity: 0.7, marker: { visible: false }, low: 'low', animation: { enable: true }, type: 'SplineRangeArea' })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample shows the monthly difference in temperature between two different countries using the spline range area series in the chart.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the spline range area type chart. You can use ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/border/", "aria-label": "Navigate to the Border property reference for React Chart Series" }, "border"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/seriesModel/#fill", "aria-label": "Navigate to the Fill property reference for React Chart Series" }, "fill"),
                    " properties to customize the spline range area. Both ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/marker/", "aria-label": "Navigate to the documentation for Data markers in React Chart component" }, "marker"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/chart/dataLabel/", "aria-label": "Navigate to the documentation for DataLabel in React Chart component" }, "dataLabel"),
                    " are used to represent individual data and its value."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module:")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use spline range area series, we need to inject ",
                    React.createElement("code", null, "SplineRangeAreaSeries"),
                    " module into ",
                    React.createElement("code", null, "services"),
                    "."),
                React.createElement("p", null,
                    "More information on the spline range area series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/spline-range-area" }, "documentation section"),
                    "."))));
    };
    SplineRangeArea.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    SplineRangeArea.prototype.load = function (args) {
        (0, theme_color_1.loadChartTheme)(args);
    };
    ;
    return SplineRangeArea;
}(sample_base_1.SampleBase));
exports.SplineRangeArea = SplineRangeArea;
