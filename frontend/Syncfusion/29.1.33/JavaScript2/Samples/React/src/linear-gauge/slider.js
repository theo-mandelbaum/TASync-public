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
exports.Slider = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var Slider = /** @class */ (function (_super) {
    __extends(Slider, _super);
    function Slider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Slider.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Slider.prototype.dragMove = function (args) {
        if (args.pointerIndex == 1) {
            this.enableSliderGauge.setPointerValue(0, 0, args.currentValue);
        }
    };
    Slider.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { title: 'Enabled', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, dragMove: this.dragMove.bind(this), load: this.load.bind(this), background: 'transparent', id: 'enableSliderGauge', height: '150px', width: '450px', format: 'N0', orientation: 'Horizontal', ref: function (enableSliderGauge) { return _this.enableSliderGauge = enableSliderGauge; }, tooltip: { enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.GaugeTooltip] }),
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, opposedPosition: true, line: { width: 5, color: '#C2DEF8' }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } } },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 5, width: 5, color: '#0074E3', position: 'Cross', type: 'Bar' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 15, width: 15, color: '#0074E3', placement: 'Center', enableDrag: true, offset: -10, markerType: 'Circle' })))))),
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { title: 'Disabled', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, load: this.load.bind(this), background: 'transparent', id: 'disableSliderGauge', height: '150px', width: '450px', orientation: 'Horizontal' },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, opposedPosition: true, line: { width: 5, color: '#E0E0E0' }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } } },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 5, width: 5, color: '#ADADAD', position: 'Cross', enableDrag: false, type: 'Bar' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 15, width: 15, color: '#ADADAD', placement: 'Center', enableDrag: false, offset: -10, markerType: 'Circle' })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample demonstrates how to create a slider by utilizing the functionalities available in the linear gauge.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a new slider in the linear gauge. This can be accomplished by combining axis, range, and pointer. The pointer has been made interactive, so the value changes as you drag it."),
                React.createElement("p", null,
                    "More information on the linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Slider;
}(sample_base_1.SampleBase));
exports.Slider = Slider;
