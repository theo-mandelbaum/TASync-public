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
exports.ProgressBar = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var ProgressBar = /** @class */ (function (_super) {
    __extends(ProgressBar, _super);
    function ProgressBar() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ProgressBar.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    ProgressBar.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, background: 'transparent', id: 'gauge', orientation: 'Horizontal', container: { width: 30, roundedCornerRadius: 20, backgroundColor: '#D6D6D6', type: 'RoundedRectangle', border: { width: 1 } } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, line: { width: 0 }, minorTicks: { interval: 1, height: 0 }, majorTicks: { interval: 10, height: 0 }, labelStyle: { font: { size: '0px' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 41, height: 30, width: 30, color: '#2196F3', type: 'Bar', roundedCornerRadius: 20 })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="font-size: 15px;color: white;margin-top: 28px;margin-left:50%">41%</div>', axisIndex: 0, axisValue: 10, x: 0, zIndex: '1', y: 0 }))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows a linear gauge that resembles a progress bar and indicates a task completion rate of 41%.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a new progress bar using the linear gauge. This can be accomplished by combining axis, pointer, and annotation."),
                React.createElement("p", null,
                    "More information on the linear gauge can be found in this  ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return ProgressBar;
}(sample_base_1.SampleBase));
exports.ProgressBar = ProgressBar;
