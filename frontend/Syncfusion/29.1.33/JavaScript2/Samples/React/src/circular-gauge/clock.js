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
exports.Clock = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_circulargauge_1 = require("@syncfusion/ej2-circulargauge");
var ej2_base_1 = require("@syncfusion/ej2-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Clock = /** @class */ (function (_super) {
    __extends(Clock, _super);
    function Clock() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.NeedlePointer = 0.2;
        return _this;
    }
    Clock.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Clock.prototype.onChartLoad = function (args) {
        var _this = this;
        this.renderGauges();
        if ((0, ej2_base_1.isNullOrUndefined)(this.pointerInterval)) {
            this.pointerInterval = setInterval(function () {
                if (document.getElementById('axis-background')) {
                    if (_this.NeedlePointer <= 12) {
                        _this.gauge.setPointerValue(0, 2, _this.NeedlePointer);
                        _this.NeedlePointer += 0.2;
                    }
                    else {
                        _this.NeedlePointer = 0.2;
                    }
                }
                else {
                    clearInterval(+_this.pointerInterval);
                }
            }, 1000);
        }
    };
    ;
    Clock.prototype.onResized = function (args) {
        var _this = this;
        window.clearTimeout(this.refreshTimeout);
        this.refreshTimeout = setTimeout(function () {
            if (document.getElementById('axis-background')) {
                _this.renderGauges();
            }
            else {
                window.clearTimeout(+_this.refreshTimeout);
            }
        }, 1000);
    };
    Clock.prototype.renderGauges = function () {
        this.annotationGaugeOne = new ej2_circulargauge_1.CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                    labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                    majorTicks: { interval: 2, offset: 2 },
                    minorTicks: { interval: 0.4, offset: 2 }, minimum: 0, maximum: 12,
                    pointers: [{
                            value: 5,
                            radius: '50%', pointerWidth: 2, color: '#00A8B5',
                            animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                        }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
                }],
            load: function (args) {
                // custom code start
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
                // custom code end
            }
        });
        this.annotationGaugeOne.appendTo('#subGaugeOne');
        this.annotationGaugeTwo = new ej2_circulargauge_1.CircularGauge({
            width: '150px',
            height: '150px',
            background: 'transparent',
            axes: [{
                    labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', size: '7px' }, offset: -5 },
                    majorTicks: { offset: 2, interval: 2 },
                    minorTicks: { offset: 2, interval: 0.4 }, minimum: 0, maximum: 12,
                    pointers: [{
                            value: 8,
                            radius: '50%', pointerWidth: 2, color: '#00A8B5',
                            animation: { enable: false }, cap: { radius: 0 }, needleTail: { length: '0%' }
                        }], startAngle: 0, endAngle: 0, radius: '70%', lineStyle: { width: 2 }
                }],
            load: function (args) {
                // custom code start
                var selectedTheme = location.hash.split('/')[1];
                selectedTheme = selectedTheme ? selectedTheme : 'Material';
                args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
                    selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
                // custom code end
            }
        });
        this.annotationGaugeTwo.appendTo('#subGaugeTwo');
    };
    Clock.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { loaded: this.onChartLoad.bind(this), resized: this.onResized.bind(this), load: this.load.bind(this), id: 'axis-background', background: 'transparent', ref: function (gauge) { return _this.gauge = gauge; } },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '90%', minimum: 0, maximum: 12, majorTicks: {
                                    height: 15, width: 2, interval: 1, offset: 5
                                }, lineStyle: { width: 2 }, minorTicks: {
                                    height: 10, width: 1, interval: 0.2, offset: 5
                                }, labelStyle: {
                                    hiddenLabel: 'First',
                                    offset: 10,
                                    font: { fontFamily: 'inherit' }
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '70%', value: 10.2, pointerWidth: 3, needleStartWidth: 2, animation: { enable: false }, cap: { radius: 5, color: 'white', border: { width: 1, color: '#00A8B5' } }, needleTail: { length: '0%' } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '100%', value: 2, pointerWidth: 3, needleStartWidth: 1, animation: { enable: false }, cap: { radius: 5, color: 'white', border: { width: 1, color: '#00A8B5' } }, needleTail: { length: '0%' } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '90%', value: 12, pointerWidth: 3, needleStartWidth: 1, animation: { enable: false }, color: '#00A8B5', cap: { radius: 5, color: 'white', border: { width: 1, color: '#00A8B5' } }, needleTail: { length: '25%', color: '#00A8B5' } })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Sub gauge one', content: '<div id="subGaugeOne" style="margin-left: -50%"></div>', angle: 290, radius: '0%', zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="subGaugeTwo" style="margin-left: -110%;margin-top: -50%;"></div>', description: 'Sub gauge two', angle: 90, radius: '0%', zIndex: '1' }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample demonstrates how to create an analog clock that displays the time.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, a clock has been created by adding axis, minor ticks, major ticks, and needles in a circular gauge and customizing it accordingly. In addition, the clock ticks, displaying the time in a lively manner."),
                React.createElement("p", null,
                    "More information on the circular gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Clock;
}(sample_base_1.SampleBase));
exports.Clock = Clock;
