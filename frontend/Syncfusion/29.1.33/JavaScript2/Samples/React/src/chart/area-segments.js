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
exports.AreaMultiColored = exports.dataValues = void 0;
/**
 * Sample for Area series with empty points
 */
var React = require("react");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
exports.dataValues = [];
[150, 71.5, 106.4, 100.25, 70.0, 106.0, 85.6, 78.5, 76.4, 86.1, 155.6, 160.4,].map(function (value, index) {
    exports.dataValues.push({ XValue: new Date(2016, index, 1), YValue: value });
});
var content = "<div style='color:#4ca1af; font-weight:bold'>Winter</div>";
var content1 = "<div style='color:#ffa751; font-weight:bold'>Summer</div>";
var content2 = "<div style='color:#1d976c; font-weight:bold'>Spring</div>";
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #control-container {\n         padding: 0px !important;\n     }\n \n     #control-container {\n         padding: 0px !important;\n     }\n \n     #winter stop {\n         stop-color: #4ca1af;\n     }\n \n     #winter stop[offset=\"0\"] {\n         stop-color: #c4e0e5;\n     }\n \n     #winter stop[offset=\"1\"] {\n         stop-color: #4ca1af;\n     }\n \n     #summer stop {\n         stop-color: #ffa751;\n     }\n \n     #summer stop[offset=\"0\"] {\n         stop-color: #ffe259;\n     }\n \n     #summer stop[offset=\"1\"] {\n         stop-color: #ffa751;\n     }\n \n     #spring stop {\n         stop-color: #1d976c;\n     }\n \n     #spring stop[offset=\"0\"] {\n         stop-color: #93f9b9;\n     }\n \n     #spring stop[offset=\"1\"] {\n         stop-color: #1d976c;\n     }";
/**
 * Area empty sample
 */
var AreaMultiColored = /** @class */ (function (_super) {
    __extends(AreaMultiColored, _super);
    function AreaMultiColored() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AreaMultiColored.prototype.render = function () {
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement(ej2_react_charts_1.ChartComponent, { id: "charts", style: { textAlign: 'center' }, primaryXAxis: { valueType: 'DateTime', labelFormat: 'MMM', intervalType: 'Months', edgeLabelPlacement: 'Shift', majorGridLines: { width: 0 } }, primaryYAxis: { labelFormat: '${value}K', rangePadding: 'None', minimum: 0, maximum: 200, interval: 50, lineStyle: { width: 0 }, majorTickLines: { width: 0 }, minorTickLines: { width: 0 } }, tooltip: { enable: true, format: '${point.x} : <b>${point.y}</b>', showNearestTooltip: true }, legendSettings: { visible: false }, chartArea: { border: { width: 0 } }, load: this.load.bind(this), width: ej2_base_1.Browser.isDevice ? '100%' : '75%', title: "US Season Retail Sales Growth", loaded: this.onChartLoad.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.MultiColoredAreaSeries, ej2_react_charts_1.DateTime, ej2_react_charts_1.Tooltip, ej2_react_charts_1.ChartAnnotation,] }),
                    React.createElement(ej2_react_charts_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content, region: "Series", x: "18%", y: "43%" }),
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content1, region: "Series", x: "46%", y: "43%" }),
                        React.createElement(ej2_react_charts_1.AnnotationDirective, { content: content2, region: "Series", x: "90%", y: "18%" })),
                    React.createElement(ej2_react_charts_1.SeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.SeriesDirective, { dataSource: exports.dataValues, xName: "XValue", yName: "YValue", name: "US", type: "MultiColoredArea", segmentAxis: "X" },
                            React.createElement(ej2_react_charts_1.SegmentsDirective, null,
                                React.createElement(ej2_react_charts_1.SegmentDirective, { value: new Date(2016, 4, 1), color: "url(#winter)" }),
                                React.createElement(ej2_react_charts_1.SegmentDirective, { value: new Date(2016, 8, 1), color: "url(#summer)" }),
                                React.createElement(ej2_react_charts_1.SegmentDirective, { color: "url(#spring)" })))))),
            React.createElement("svg", { style: { height: 0 } },
                React.createElement("defs", null,
                    React.createElement("linearGradient", { id: "winter", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "summer", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })),
                    React.createElement("linearGradient", { id: "spring", x1: "0", x2: "0", y1: "0", y2: "1" },
                        React.createElement("stop", { offset: "0" }),
                        React.createElement("stop", { offset: "1" })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample visualizes the data on US season retail sales growth using a multi-colored area series in the chart. Data points are enhanced with segments and tooltips.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the points in a particular range by using ",
                    React.createElement("code", null, "MultiColoredArea"),
                    " series. Points within the range can be configured with ",
                    React.createElement("code", null, "color"),
                    " property in ChartSegment."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see a tooltip in action, hover over or tap on the chart."),
                React.createElement("p", null,
                    React.createElement("b", null, "Injecting Module")),
                React.createElement("p", null,
                    "Chart component features are segregated into individual feature-wise modules. To use area series, we need to inject",
                    React.createElement("code", null, "MultiColoredAreaSeries"),
                    " module using",
                    React.createElement("code", null, "Chart.Inject(MultiColoredAreaSeries)"),
                    " method."),
                React.createElement("p", null,
                    "More information on the multi-colored area series can be found in this \u00A0",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/chart/chart-types/area#multicolored-area", "aria-label": "Navigate to the documentation for Multicolored Area Chart in React Chart component" }, "documentation section"),
                    "."))));
    };
    AreaMultiColored.prototype.onChartLoad = function (args) {
        var chart = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
    ;
    AreaMultiColored.prototype.load = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Fluent2';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).
            replace(/-dark/i, "Dark").replace(/contrast/i, 'Contrast').replace(/-highContrast/i, 'HighContrast');
    };
    ;
    return AreaMultiColored;
}(sample_base_1.SampleBase));
exports.AreaMultiColored = AreaMultiColored;
