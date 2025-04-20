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
exports.StepProgressBar = exports.range = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
exports.range = ['#30b32d', '#ffdd00', '#f03e3e'];
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var StepProgressBar = /** @class */ (function (_super) {
    __extends(StepProgressBar, _super);
    function StepProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepProgressBar.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    StepProgressBar.prototype.axisLabelRender = function (args) {
        if (args.text == "5")
            args.text = "Ordered";
        else if (args.text == "10")
            args.text = "Packed";
        else if (args.text == "15")
            args.text = "Shipped";
        else if (args.text == "20")
            args.text = "Delivered";
        else
            args.text = " ";
    };
    StepProgressBar.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), axisLabelRender: this.axisLabelRender.bind(this), id: 'gauge', background: 'transparent', orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 5, maximum: 20, opposedPosition: true, majorTicks: { height: 0, interval: 5 }, minorTicks: { height: 0 }, line: { width: 5 }, labelStyle: { offset: 20, font: { size: '16px', fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 5, height: 25, width: 25, placement: 'Near', markerType: 'Image', imageUrl: 'src/linear-gauge/images/tick-icon.png' }, " "),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, height: 25, width: 25, placement: 'Near', markerType: 'Image', imageUrl: 'src/linear-gauge/images/tick-icon.png' }, " "),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 15, height: 25, width: 25, placement: 'Near', markerType: 'Image', imageUrl: 'src/linear-gauge/images/tick-icon.png' }, " "),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 20, height: 25, width: 15, placement: 'Center', position: 'Cross', color: '#D1D9DD', offset: -2, markerType: 'Circle' }, " ")),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 5, end: 10, startWidth: 5, endWidth: 5, color: '#1FAC8A' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 10, end: 15, startWidth: 5, endWidth: 5, color: '#1FAC8A' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 15, end: 20, startWidth: 5, endWidth: 5, color: '#D1D9DD' }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows a linear gauge that resembles a step progress bar and indicates shipment status.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a new step progress bar using the linear gauge. This can be accomplished by combining axis, multiple pointers, and multiple ranges."),
                React.createElement("p", null,
                    "More information on the linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return StepProgressBar;
}(sample_base_1.SampleBase));
exports.StepProgressBar = StepProgressBar;
