"use strict";
/**
 * Sample for customer satisfaction in the Circular Gauge
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
exports.CustomerSatisfactionScore = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n     padding: 0px !important;\n     }";
var CustomerSatisfactionScore = /** @class */ (function (_super) {
    __extends(CustomerSatisfactionScore, _super);
    function CustomerSatisfactionScore() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomerSatisfactionScore.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    CustomerSatisfactionScore.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: "gauge", background: "transparent", height: "400px", allowMargin: false, title: "Customer Satisfaction Score", titleStyle: { size: '18px', fontFamily: 'inherit' }, tooltip: { enable: true, template: '<div style="font-size:18px;background:white;width:150px;color:#595959;border:1px solid #e8e8e8">Current Score: 7.5 </div>' }, legendSettings: { visible: true, position: 'Bottom', width: "70%", textStyle: { fontFamily: 'inherit', size: '12px' }, } },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations, ej2_react_circulargauge_1.GaugeTooltip, ej2_react_circulargauge_1.Legend] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: "100%", minimum: 0, maximum: 10, majorTicks: { width: 1.5, height: 12, interval: 2, offset: 35 }, lineStyle: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { font: { size: '14px', fontFamily: 'inherit' }, position: 'Outside', offset: -40, } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:16px;margin-top: 5px;font-family: inherit;">7.5</div>', angle: 0, radius: "-10%", zIndex: "1" })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 7.5, radius: "70%", pointerWidth: 5, needleEndWidth: 2, cap: { radius: 8, border: { width: 2 }, } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 6.5, radius: "68%", type: "Marker", markerShape: "Rectangle", markerWidth: 40, markerHeight: 0.5, needleEndWidth: 2, color: "#0477c2", animation: { enable: false }, cap: { radius: 0, border: { width: 0 }, } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 9.5, radius: "68%", type: "Marker", markerShape: "Rectangle", markerWidth: 40, markerHeight: 0.5, needleEndWidth: 2, color: "#0477c2", animation: { enable: false }, cap: { radius: 0, border: { width: 0 }, } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 2, radius: "80%", color: "#F03E3E", startWidth: 40, endWidth: 40, legendText: "Poor" }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 6.5, end: 9.5, radius: "110%", color: "#0477c2", startWidth: 120, endWidth: 120, legendText: "Average Score" }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 2, end: 5, radius: "80%", color: "#f6961e", startWidth: 40, endWidth: 40, legendText: "Satisfied" }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 5, end: 8, radius: "80%", color: "#FFDD00", startWidth: 40, endWidth: 40, legendText: "Good" }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 8, end: 10, radius: "80%", color: "#30B32D", startWidth: 40, endWidth: 40, legendText: "Excellent" }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample shows an arc gauge with a real-time scenario of a customer satisfaction score ranging from 0 to 10.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render an arc gauge showing customer satisfaction score. You can use ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/axisModel/" }, "axes"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/" }, "ranges"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/" }, "annotations"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/legendSettingsModel/" }, "legend"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tooltipSettingsModel/" }, "tooltip"),
                    " oriented properties to customize the appearance of the arc gauge, in order to achieve the desired outcome."),
                React.createElement("p", null,
                    "More information on the arc gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return CustomerSatisfactionScore;
}(sample_base_1.SampleBase));
exports.CustomerSatisfactionScore = CustomerSatisfactionScore;
