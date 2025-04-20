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
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_charts_1 = require("@syncfusion/ej2-react-charts");
var base_1 = require("@syncfusion/ej2/base");
var theme_color_1 = require("./theme-color");
var SAMPLE_CSS = "\n  .control-fluid {\n    padding: 0px !important;\n  }\n  .pie-chart {\n    align: center;\n  }\n";
var chartData = [
    { x: 'Operations', y: 30.0, text: '30.0%' },
    { x: 'Miscellaneous', y: 10.0, text: '10.0%' },
    { x: 'Human Resources', y: 15.0, text: '15.0%' },
    { x: 'Research and Development', y: 20.0, text: '20.0%' },
    { x: 'Marketing', y: 25.0, text: '25.0%' }
];
var PieCornerRadius = /** @class */ (function (_super) {
    __extends(PieCornerRadius, _super);
    function PieCornerRadius() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PieCornerRadius.prototype.onPointRender = function (args) {
        (0, theme_color_1.roundedCornnerPointRender)(args);
    };
    PieCornerRadius.prototype.load = function (args) {
        (0, theme_color_1.loadAccumulationChartTheme)(args);
    };
    PieCornerRadius.prototype.onChartLoad = function (args) {
        document.getElementById('pie-chart').setAttribute('title', '');
    };
    PieCornerRadius.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement(ej2_react_charts_1.AccumulationChartComponent, { id: 'pie-chart', title: 'Company Budget Distribution', load: this.load.bind(this), style: { textAlign: 'center' }, legendSettings: { visible: false }, enableSmartLabels: true, enableAnimation: false, center: { x: '50%', y: '50%' }, enableBorderOnMouseMove: false, width: base_1.Browser.isDevice ? '100%' : '75%', tooltip: { enable: true, header: '<b>Budget</b>', format: '${point.x}: <b>${point.y}%</b>', enableHighlight: true }, loaded: this.onChartLoad.bind(this), pointRender: this.onPointRender.bind(this) },
                    React.createElement(ej2_react_charts_1.Inject, { services: [ej2_react_charts_1.AccumulationLegend, ej2_react_charts_1.PieSeries, ej2_react_charts_1.AccumulationTooltip, ej2_react_charts_1.AccumulationDataLabel, ej2_react_charts_1.AccumulationAnnotation] }),
                    React.createElement(ej2_react_charts_1.AccumulationSeriesCollectionDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationSeriesDirective, { dataSource: chartData, name: 'Company Budget', xName: 'x', yName: 'y', type: 'Pie', innerRadius: '50%', dataLabel: {
                                visible: true,
                                position: 'Outside',
                                name: 'x',
                                connectorStyle: { width: 0 }
                            }, borderRadius: 8, border: { width: 3 } })),
                    React.createElement(ej2_react_charts_1.AccumulationAnnotationsDirective, null,
                        React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: "<div style=\"padding: 5px 5px 5px 5px; font-size: ".concat(base_1.Browser.isDevice ? '10px' : '14px', "; color: #FFFFFF;\">30%</div>"), region: 'Series', coordinateUnits: 'Point', x: 'Operations', y: 30.0 }),
                        React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: "<div style=\"padding: 5px 5px 5px 5px; font-size: ".concat(base_1.Browser.isDevice ? '10px' : '14px', "; color: #FFFFFF;\">10%</div>"), region: 'Series', coordinateUnits: 'Point', x: 'Miscellaneous', y: 10.0 }),
                        React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: "<div style=\"padding: 5px 5px 5px 5px; font-size: ".concat(base_1.Browser.isDevice ? '10px' : '14px', "; color: #FFFFFF;\">15%</div>"), region: 'Series', coordinateUnits: 'Point', x: 'Human Resources', y: 15.0 }),
                        React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: "<div style=\"padding: 5px 5px 5px 5px; font-size: ".concat(base_1.Browser.isDevice ? '10px' : '14px', "; color: #FFFFFF;\">20%</div>"), region: 'Series', coordinateUnits: 'Point', x: 'Research and Development', y: 20.0 }),
                        React.createElement(ej2_react_charts_1.AccumulationAnnotationDirective, { content: "<div style=\"padding: 5px 5px 5px 5px; font-size: ".concat(base_1.Browser.isDevice ? '10px' : '14px', "; color: #FFFFFF;\">25%</div>"), region: 'Series', coordinateUnits: 'Point', x: 'Marketing', y: 25.0 })))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the company's budget distribution over a year using a donut chart with rounded corners.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a donut chart with customized corners for each slice. By specifying a value for ",
                    React.createElement("code", null, "borderRadius"),
                    ", you can create rounded corners for each slice, giving the chart a modern and polished look."),
                React.createElement("p", null,
                    React.createElement("code", null, "Tooltips"),
                    " are enabled in this example. To see the tooltip in action, hover over a slice or tap on it in touch-enabled devices."),
                React.createElement("p", null,
                    "More information about the donut series can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/documentation/accumulation-chart/pie-dough-nut/#doughnut-chart", "aria-label": "Navigate to the documentation for Doughnut Chart in TypeScript Accumulation Chart control" }, "documentation section"),
                    "."))));
    };
    return PieCornerRadius;
}(sample_base_1.SampleBase));
exports.default = PieCornerRadius;
