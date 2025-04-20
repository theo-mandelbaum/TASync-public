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
exports.ArcGauge = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var sample_base_1 = require("../common/sample-base");
var sliderValue = 60;
var SAMPLE_CSS = "\n    .e-view.fluent div.e-handle-first, .e-view.fluent-dark div.e-handle-first,\n    .e-view.fabric div.e-handle-first, .e-view.fabric-dark div.e-handle-first {\n        margin-top: -0.5px; \n    }\n    .e-view.material3 div.e-handle-first, .e-view.material3-dark div.e-handle-first {\n        margin-top: 5px;\n    }\n    .e-view.bootstrap div.e-handle-first, .e-view.bootstrap-dark div.e-handle-first,\n    .e-view.highcontrast div.e-handle-first {\n        margin-top: 1px;\n    }\n    .e-view.fluent2-highcontrast div.e-handle-first {\n        margin-top: 3px;\n    }\n    .e-view.highcontrast div.e-handle-first {\n        margin-top: 0px;\n    }\n    .e-view.bootstrap5 div.e-handle-first, .e-view.bootstrap5-dark div.e-handle-first, .e-view.material div.e-handle-first, .e-view.material-dark div.e-handle-first {\n        margin-top: -1px;\n    }\n    .e-view.bootstrap5_3 div.e-handle-first, .e-view.bootstrap5_3-dark div.e-handle-first {\n        margin-top: -1px;\n    }\n    .e-view.fluent2 div.e-handle-first, .e-view.fluent2-highcontrast div.e-handle-first {\n        margin-top: 2.5px;\n    }\n    .e-view.fluent2-dark div.e-handle-first {\n        margin-top: 2px;\n    }\n    .e-view.material3 div.e-handle-first, .e-view.material3-dark div.e-handle-first {\n        margin-top: 4px;\n    }\n    .e-view.bootstrap5 div.e-handle-first, .e-view.bootstrap5-dark div.e-handle-first {\n        margin-top: -2px;\n    }\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    .sliderwrap {\n        margin-top: 0px;\n        width: 300px;            \n        align-self: center;\n    }\n    #slider.e-control.e-slider .e-handle {\n        background-color: #fff;\n        border: 2px solid #666;\n        width:15px;\n        height:15px;\n    }\n    .e-control-wrapper.e-slider-container.e-horizontal .e-slider-track {\n        background: -webkit-linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%);\n        background: linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%);\n        background: -moz-linear-gradient(left, #ea501a 0, #ea501a 20%, #f79c02 40%, #e5ce20 60%, #a1cb43 80%, #82b944 100%); \n    }\n    .e-limit-bar.e-limits {\n        background-color: transparent !important;\n    }\n    .e-control-wrapper.e-slider-container.e-horizontal .e-range {\n        height: 0px !important;\n        width: 0px !important;\n    }\n    #slider.e-control.e-slider .e-slider-track {\n        height: 8px;\n        top: calc(50% - 4px);\n        border-radius: 5px;\n    }\n    #circular_gauge_sample .e-slider-container {\n        display: flex;\n        flex-direction: column;\n    }";
var ArcGauge = /** @class */ (function (_super) {
    __extends(ArcGauge, _super);
    function ArcGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ArcGauge.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ArcGauge.prototype.loaded = function (args) {
        if (document.getElementById('pointervalue')) {
            document.getElementById('pointervalue').innerHTML = args.gauge.axes[0].pointers[0].value.toString() + '/100';
        }
    };
    ArcGauge.prototype.sliderChange = function () {
        sliderValue = this.sliderElement.value;
        if (!isNaN(sliderValue)) {
            this.gauge['isProtectedOnChange'] = true;
            if (sliderValue >= 0 && sliderValue < 20) {
                this.gauge.axes[0].pointers[0].color = '#ea501a';
            }
            else if (sliderValue >= 20 && sliderValue < 40) {
                this.gauge.axes[0].pointers[0].color = '#f79c02';
            }
            else if (sliderValue >= 40 && sliderValue < 60) {
                this.gauge.axes[0].pointers[0].color = '#e5ce20';
            }
            else if (sliderValue >= 60 && sliderValue < 80) {
                this.gauge.axes[0].pointers[0].color = '#a1cb43';
            }
            else if (sliderValue >= 80 && sliderValue < 100) {
                this.gauge.axes[0].pointers[0].color = '#82b944';
            }
            this.gauge.setPointerValue(0, 0, sliderValue);
            if (document.getElementById('pointervalue')) {
                document.getElementById('pointervalue').innerHTML = this.gauge.axes[0].pointers[0].value.toString() + '/100';
            }
        }
    };
    ArcGauge.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { id: 'circular_gauge_sample', className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { title: 'Progress Tracker', background: 'transparent', titleStyle: { fontFamily: 'inherit' }, load: this.load.bind(this), loaded: this.loaded.bind(this), ref: function (gauge) { return _this.gauge = gauge; }, id: 'gauge' },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '80%', startAngle: 200, endAngle: 160, minimum: 1, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                    font: {
                                        fontFamily: 'inherit',
                                        size: '0px',
                                    },
                                }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'RangeBar pointer value from the slider', content: '<div id="pointervalue" style="font-size:35px;width:120px;text-align:center;margin-top:-15px;">60/100</div>', angle: 0, radius: '0%', zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="slider" style="height:70px;width:250px;"></div>', description: 'Slider', angle: 0, radius: '-100%', zIndex: '1' })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 1, end: 100, radius: '90%', startWidth: 30, endWidth: 30, color: '#E0E0E0', roundedCornerRadius: 20 })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: false }, value: 60, radius: '90%', color: '#e5ce20', pointerWidth: 30, type: 'RangeBar', roundedCornerRadius: 20, border: {
                                            width: 0
                                        } }))))),
                    React.createElement(ej2_react_inputs_1.SliderComponent, { className: 'sliderwrap', id: "slider", style: { width: '250px', marginTop: '-45px' }, type: 'MinRange', min: 0, max: 100, value: sliderValue, limits: { enabled: true, minStart: 0, minEnd: 100 }, change: this.sliderChange.bind(this), ref: function (d) { return _this.sliderElement = d; } }))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample shows the work progress using a circular gauge and a range bar pointer with rounded corners.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render the range and range bar pointer with rounded corners. A slider is placed at the bottom of the circular gauge using annotation to change the range bar pointer value. Based on the value, the color of the pointer can also be changed."),
                React.createElement("p", null,
                    "More information on the ranges can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/" }, "documentation section"),
                    "."))));
    };
    return ArcGauge;
}(sample_base_1.SampleBase));
exports.ArcGauge = ArcGauge;
