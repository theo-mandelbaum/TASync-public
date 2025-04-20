"use strict";
/**
 * Sample for default functionalities in the Circular Gauge
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
exports.Default = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid { padding: 0px !important; }\n     .titleText { font-family: inherit; font-size: 22px; margin-top: 8px; }\n     .e-view.tailwind div.titleText, .e-view.tailwind-dark div.titleText { font-size: 22px; margin-top: -3px; }\n     .e-view.tailwind3 div.titleText, .e-view.tailwind3-dark div.titleText { font-size: 22px; margin-top: -2px; }\n     .e-view.material3 div.titleText, .e-view.material3-dark div.titleText { font-size: 22px; margin-top: 10px; }\n     .annotation { font-family: inherit; font-size: 18px; }\n     @media screen and (max-width: 420px) {\n         .titleText {font-size: 15px; }\n         .annotation { font-size: 13px; }\n         .e-view.tailwind div.titleText, .e-view.tailwind-dark div.titleText { font-size: 15px;\tmargin-top: 0px; }\n     }\n     ";
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Default.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        if (selectedTheme.indexOf("tailwind") != -1 && args.gauge.axes[0].annotations != null) {
            args.gauge.axes[0].annotations[0].angle = 342;
            args.gauge.axes[0].annotations[0].radius = "92%";
            args.gauge.axes[0].annotations[1].angle = 337;
            args.gauge.axes[0].annotations[1].radius = "80%";
            args.gauge.axes[0].annotations[2].angle = 337;
            args.gauge.axes[0].annotations[2].radius = "65%";
            args.gauge.axes[0].annotations[3].angle = 326;
            args.gauge.axes[0].annotations[3].radius = "55%";
            args.gauge.axes[0].annotations[4].angle = 323;
            args.gauge.axes[0].annotations[4].radius = "39%";
            args.gauge.axes[0].annotations[5].angle = 192;
            args.gauge.axes[0].annotations[5].radius = "91%";
            args.gauge.axes[0].annotations[9].angle = 136;
            args.gauge.axes[0].annotations[9].radius = "34%";
        }
        // custom code end
    };
    Default.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: "gauge", background: "transparent", height: "500px", title: "Female (% usage) on popular social network", titleStyle: { size: '18px', fontFamily: 'inherit' } },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 270, minimum: 0, maximum: 100, majorTicks: { width: 0 }, lineStyle: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { font: { size: '0px', }, } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="titleText" style="color:#c8eab7;">YouTube</div>', description: "Youtube", angle: 344, radius: "94%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="titleText" style="color:#82cdbc;">Instagram</div>', description: "Instagram", angle: 340, radius: "81%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="titleText" style="color:#43b6c4;">Twitter</div>', description: "Twitter", angle: 340, radius: "66%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="titleText" style="color:#1d91bf;">Facebook</div>', description: "Facebook", angle: 332, radius: "55%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="titleText" style="color:#205ea8;">TikTok</div>', description: "TikTok", angle: 328, radius: "40%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="annotation">68%</div>', description: "68%", angle: 191, radius: "89%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="annotation">43%</div>', description: "43%", angle: 125, radius: "75%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="annotation">21%</div>', description: "21%", angle: 67, radius: "62%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="annotation">75%</div>', description: "75%", angle: 215, radius: "48%", zIndex: "1" }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div class="annotation">44%</div>', description: "44%", angle: 133, radius: "33%", zIndex: "1" })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { pointerWidth: 0, cap: { radius: 0, border: { width: 0 } } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 68, radius: "94%", color: "#c8eab7", startWidth: 22, endWidth: 22 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 74, end: 100, radius: "89%", color: "#7a7f82", startWidth: 1, endWidth: 1 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 43, radius: "80%", color: "#82cdbc", startWidth: 22, endWidth: 22 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 49, end: 100, radius: "75%", color: "#7a7f82", startWidth: 1, endWidth: 1 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 21, radius: "66%", color: "#43b6c4", startWidth: 22, endWidth: 22 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 28, end: 100, radius: "61%", color: "#7a7f82", startWidth: 1, endWidth: 1 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 75, radius: "52%", color: "#1d91bf", startWidth: 22, endWidth: 22 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 85, end: 100, radius: "47%", color: "#7a7f82", startWidth: 1, endWidth: 1 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 44, radius: "38%", color: "#205ea8", startWidth: 22, endWidth: 22 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 55, end: 100, radius: "34%", color: "#7a7f82", startWidth: 1, endWidth: 1 }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample shows the arc gauge's default rendering. It also shows the most popular social media platforms and the percentage of female users.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render a default arc gauge. The arc gauge helps in the visualization of numerical values of scales in a semi-circular manner. You can use ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/" }, "axes"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/" }, "ranges"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/" }, "annotations"),
                    " oriented properties to customize the default appearance of the arc gauge."),
                React.createElement("p", null,
                    "More information on the arc gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
