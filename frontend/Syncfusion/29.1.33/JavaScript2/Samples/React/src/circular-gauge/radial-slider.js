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
exports.RadialSlider = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var RadialSlider = /** @class */ (function (_super) {
    __extends(RadialSlider, _super);
    function RadialSlider() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.textValues = ['0', '2', '5', '10', '20', '50', '100', '150', '200'];
        return _this;
    }
    RadialSlider.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    RadialSlider.prototype.dragMove = function (args) {
        this.pointerValue = args.currentValue;
        if (this.pointerValue != null) {
            this.gauge.setPointerValue(0, 0, this.pointerValue);
            this.gauge.setRangeValue(0, 0, 0, this.pointerValue);
            this.gauge.setRangeValue(0, 1, this.pointerValue, 100);
            this.gauge.setAnnotationValue(0, 0, '<div style="font-style: oblique; margin-left: 5px;font-size: 20px; margin-top: -2px;"><span>' + Math.ceil(this.pointerValue) + '%</span></div>');
        }
    };
    RadialSlider.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), dragMove: this.dragMove.bind(this), enablePointerDrag: true, id: 'custom-labels', ref: function (gauge) { return _this.gauge = gauge; }, background: 'transparent' },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '80%', majorTicks: {
                                    height: 0
                                }, lineStyle: { width: 0 }, minorTicks: {
                                    height: 0
                                }, labelStyle: {
                                    offset: -1,
                                    font: {
                                        size: '0px'
                                    }
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: 'Marker', value: 30, markerShape: 'Circle', color: '#2C75DC', radius: '97%', markerWidth: 25, markerHeight: 25, animation: { enable: false } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 30, color: '#2C75DC', startWidth: 12, endWidth: 12, radius: '100%' }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 30, end: 100, color: '#BFD6F5', startWidth: 12, endWidth: 12, radius: '100%' })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-style: oblique; font-size: 20px; margin-top: -2px; margin-left: 5px"><span>30%</span></div>', angle: 180, radius: '0%', zIndex: '1' }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample demonstrates how to create a range slider component by utilizing the functions available in the circular gauge.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a new range slider in the circular gauge. It is possible to achieve this by combining ranges and a marker pointer. The marker pointer has been made interactive, so the value changes as you drag it."),
                React.createElement("p", null,
                    "More information on the circular gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return RadialSlider;
}(sample_base_1.SampleBase));
exports.RadialSlider = RadialSlider;
