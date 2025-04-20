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
exports.Thermometer = exports.range = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
exports.range = ['#30b32d', '#ffdd00', '#f03e3e'];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Thermometer = /** @class */ (function (_super) {
    __extends(Thermometer, _super);
    function Thermometer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Thermometer.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Thermometer.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gauge', background: 'transparent', orientation: 'Vertical', container: { width: 13, roundedCornerRadius: 5, type: 'Thermometer', border: { width: 1 } } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: -20, maximum: 50, majorTicks: { height: 7, interval: 10 }, minorTicks: { height: 0, interval: 5 }, line: { width: 0 }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 35, height: 12, width: 12, offset: 3, markerType: 'Triangle', placement: 'Center', color: '#0074E3' }, " "))),
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 120, opposedPosition: true, majorTicks: { height: 7, interval: 20 }, minorTicks: { height: 0, interval: 10 }, line: { width: 0 }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 94, height: 13, width: 13, type: 'Bar', color: '#0074E3' }, " ")))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div> <p style="font-size:13px;margin-left: -20px;margin-top: -30px;">\\u00b0C</p> </div>', axisIndex: 0, axisValue: 50, x: 0, y: 0, zIndex: '1' }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div> <p style="font-size:13px;margin-left: 28px;margin-top: -30px;">\\u00b0F</p> </div>', axisIndex: 1, axisValue: 120, x: 0, y: 0, zIndex: '1' }))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows a thermometer that displays temperature in both degrees and fahrenheit.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure a linear gauge to look like a thermometer. More information about containers can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/appearance/#customizing-the-linear-gauge-container" }, "documentation section"),
                    "."))));
    };
    return Thermometer;
}(sample_base_1.SampleBase));
exports.Thermometer = Thermometer;
