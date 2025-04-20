"use strict";
/**
 * Sample for key performance indicator in the Circular Gauge
 */
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
exports.KeyPerformanceIndicator = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid { padding: 0px !important;} #gauge_Annotations_0 { line-height: 0.5;}\n     .triangle-up { width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 10px; }\n     .text { font-family:inherit; font-size:30px; text-align:center; }\n     .percentage { font-family:inherit; font-size:44px; text-align:center; margin-left:-8px; }\n     .e-view.tailwind div.triangle-up, .e-view.tailwind-dark div.triangle-up { margin-top: 7px;  }\n     .e-view.material div.triangle-up, .e-view.material-dark div.triangle-up, .e-view.bootstrap-dark div.triangle-up,\n     .e-view.bootstrap div.triangle-up, .e-view.bootstrap4 div.triangle-up {\n     width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 5px; }\n     @media screen and (max-width: 420px) {\n       .text { font-size:20px; text-align:center; margin-left: 10px; }\n       .percentage { font-size:30px; text-align:center; }\n       .triangle-up { width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 15px; }\n       .e-view.tailwind div.triangle-up, .e-view.tailwind-dark div.triangle-up { margin-top: 14px; }\n       .e-view.material div.triangle-up, .e-view.material-dark div.triangle-up, .e-view.bootstrap-dark div.triangle-up,\n       .e-view.bootstrap div.triangle-up, .e-view.bootstrap4 div.triangle-up {\n       width: 20; height: 20; border-left: 10px solid transparent; border-right: 10px solid transparent; border-bottom: 20px solid #84cbb5; margin-top: 10px; }\n     }\n   ";
var KeyPerformanceIndicator = /** @class */ (function (_super) {
    __extends(KeyPerformanceIndicator, _super);
    function KeyPerformanceIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rangeLinearGradient = {
            startValue: '0%',
            endValue: '60%',
            colorStop: [
                { color: 'white', offset: '10%', opacity: 0.9 },
                { color: '#84cbb5', offset: '90%', opacity: 0.9 },
            ],
        };
        return _this;
    }
    KeyPerformanceIndicator.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    KeyPerformanceIndicator.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: "gauge", background: "transparent" },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations, ej2_react_circulargauge_1.Gradient] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 220, endAngle: 140, radius: "90%", minimum: 0, maximum: 100, majorTicks: { width: 0, }, lineStyle: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { format: '{value} %', font: { size: '0px' }, position: 'Outside', offset: -18, } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="triangle-up"></div>', description: "Triangle", angle: 279, radius: "33%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="text" style="color:#84cbb5;">Current</div>', description: "Current", angle: 0, radius: "25%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="percentage" style="color:#84cbb5;">76.6%</div>', description: "76.6%", angle: 125, radius: "12%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:22px;font-family:inherit;">0</div>', description: "0", angle: 213, radius: "83%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:22px;font-family:inherit;">100</div>', description: "100", angle: 150, radius: "83%", zIndex: "1" })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 30, radius: "82%", type: "Marker", markerShape: "Circle", markerWidth: 30, markerHeight: 30, animation: { enable: false, }, color: "#bdbdbf" }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 50, radius: "82%", type: "Marker", markerShape: "Circle", markerWidth: 30, markerHeight: 30, animation: { enable: false, }, color: "#626866" }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 79, radius: "92%", type: "Marker", markerShape: "InvertedTriangle", markerWidth: 30, markerHeight: 30, color: "#b6b6b6" })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: "90%", color: "#e3e3e3", roundedCornerRadius: 20, startWidth: 30, endWidth: 30 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 30, end: 50, radius: "90%", linearGradient: this.rangeLinearGradient, startWidth: 30, endWidth: 30 }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample shows an arc gauge with a key performance indicator (KPI), which is a measurable value that shows how an organization meets key business objectives.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render an arc gauge showing key performance indicator (KPI). You can use ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/" }, "axes"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/" }, "ranges"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/" }, "pointers"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/" }, "annotations"),
                    " oriented properties to customize the appearance of the arc gauge, in order to achieve the desired outcome."),
                React.createElement("p", null,
                    "More information on the arc gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return KeyPerformanceIndicator;
}(sample_base_1.SampleBase));
exports.KeyPerformanceIndicator = KeyPerformanceIndicator;
