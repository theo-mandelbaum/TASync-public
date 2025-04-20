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
exports.StepsCounter = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var StepsCounter = /** @class */ (function (_super) {
    __extends(StepsCounter, _super);
    function StepsCounter() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    StepsCounter.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    StepsCounter.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 3000, background: 'transparent', id: 'gauge', orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 12000, line: { width: 30 }, opposedPosition: true, minorTicks: { height: 0 }, majorTicks: { interval: 12000, height: 10, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 8446, height: 40, width: 40, placement: 'Near', offset: -40, markerType: 'Image', imageUrl: 'src/linear-gauge/images/step-count.png' })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 8456, startWidth: 30, endWidth: 30, color: '#0DC9AB', offset: 0 })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="width: 70px;"> <p align="center" style="font-size:10px;margin-left:60px;margin-top:10px;font-weight: 400;">STEPS</p> <p align="center" style="font-size: 23px;margin-top:-15px;margin-left:50px;color: #0DC9AB;font-weight: 600;">8456</p>\n                            </div>', axisIndex: 0, axisValue: 12000, x: 10, zIndex: '1', y: 5 }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="width: 145px;font-size: 19px;margin-left:135px"> Sun, 7 February </div>', axisIndex: 0, axisValue: 0, x: 0, zIndex: '1', y: -100 }))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows a linear gauge displaying the number of steps taken by a person in a day.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a linear gauge to look like a steps counter. This can be accomplished by combining axis, range, pointer and annotations."),
                React.createElement("p", null,
                    "More information on the linear gauge can be found in this  ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return StepsCounter;
}(sample_base_1.SampleBase));
exports.StepsCounter = StepsCounter;
