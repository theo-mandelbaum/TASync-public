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
exports.AxisBackGround = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_circulargauge_1 = require("@syncfusion/ej2-circulargauge");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var AxisBackGround = /** @class */ (function (_super) {
    __extends(AxisBackGround, _super);
    function AxisBackGround() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AxisBackGround.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    AxisBackGround.prototype.updateGauge = function () {
        this.annotationGauge = new ej2_circulargauge_1.CircularGauge({
            width: '600px',
            height: '450px',
            background: 'transparent',
            axes: [{
                    labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', color: 'White' } },
                    majorTicks: { height: 15, interval: 30 },
                    minorTicks: { height: 10, interval: 6 }, minimum: 0, maximum: 360,
                    pointers: [{
                            value: 90,
                            description: 'Marker pointer value : 90',
                            radius: '45%', markerWidth: 12, markerHeight: 12,
                            type: 'Marker', markerShape: 'Triangle', color: 'Orange',
                            animation: { enable: true, duration: 500 }
                        }], startAngle: 0, endAngle: 0, radius: '60%', lineStyle: { width: 0 }
                }]
        });
        this.annotationGauge.appendTo('#subGauge');
    };
    AxisBackGround.prototype.onChartLoad = function (args) {
        this.updateGauge();
    };
    ;
    AxisBackGround.prototype.onResized = function (args) {
        location.reload();
    };
    AxisBackGround.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { loaded: this.onChartLoad.bind(this), resized: this.onResized.bind(this), load: this.load.bind(this), id: 'axis-background', background: 'transparent', centerY: '65%' },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '80%', majorTicks: {
                                    height: 0,
                                }, lineStyle: { width: 0 }, minorTicks: {
                                    height: 0,
                                }, labelStyle: {
                                    format: '{value} %',
                                    font: { size: '0px' }
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '0%' })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Axis background', content: '<div style="margin-top: -37%;"><img src="src/circular-gauge/images/axis-background.png" height="400" width="400" /></div>', angle: 0, radius: '0%', zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="subGauge" style="margin-left: -50%; margin-top: -50%;"></div>', description: 'Sub gauge', angle: 0, radius: '0%', zIndex: '1' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="color:orange;margin-top: -86px;margin-left: -1px;font-size: 18px;"> 90</div>', description: 'Annotation value : 90', angle: 10, radius: '0%', zIndex: '1' }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample demonstrates a circular gauge with an axis and a background image set for the axis.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the axis in the circular gauge with a background image. To accomplish this, the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/annotationModel/" }, "annotations"),
                    " is used and an image is set as the background content."),
                React.createElement("p", null,
                    "More information on the annotations can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-annotations/" }, "documentation section"),
                    "."))));
    };
    return AxisBackGround;
}(sample_base_1.SampleBase));
exports.AxisBackGround = AxisBackGround;
