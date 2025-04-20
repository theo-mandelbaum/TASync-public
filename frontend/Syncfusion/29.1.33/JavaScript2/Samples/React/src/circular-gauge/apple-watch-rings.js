"use strict";
// custom code start
// tslint:disable
// custom code end
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
exports.AppleWatchGauge = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n#apple-watch-rings .panel {\n    width: 200px !important;\n    height: 70px !important;\n    margin-left: 5% !important;\n    margin-top: 10% !important;\n    border-color: lightgray;\n    float: left;\n    background-color: transparent;\n}\n\n#apple-watch-rings .content {\n    float: left !important;\n    margin-left: 62px !important;\n    margin-top: -65px !important;\n    text-align: left !important;\n    border: 0px solid #dddddd;\n    min-height: auto;\n    width: 150px;\n    height: auto;\n}\n\n@media screen and (max-width: 1160px) {\n    #apple-watch-rings .panel {\n        width: 165px !important;\n    }\n\n    #apple-watch-rings .firstcontent {\n        font-size: 13px !important;\n    }\n\n    #apple-watch-rings .secondcontent {\n        font-size: 15px !important;\n    }\n\n    #apple-watch-rings .content {\n        margin-top: -60px !important;\n    }\n\n    #apple-watch-rings .divide {\n        margin-left: 0%;\n    }\n}\n\n@media screen and (max-width: 990px) {\n    #apple-watch-rings .panel {\n       width: 190px !important;\n       height: 70px !important;\n       margin-left: 100% !important;\n       margin-top: 10px !important;\n    }\n\n    #apple-watch-rings .subgauge {\n        margin-left: 0% !important;\n        margin-top: 1% !important;\n    }\n\n    #apple-watch-rings .content {\n        margin-left: 63px !important;\n        margin-top: -60px !important;\n    }\n\n    #apple-watch-rings .firstcontent {\n        font-size: 16px !important;\n    }\n\n    #apple-watch-rings .secondcontent {\n        font-size: 18px !important;\n    }\n\n    #apple-watch-rings .divide {\n        margin-left: 0%;\n    }\n}\n\n@media screen and (min-width: 768px) {\n    #apple-watch-rings .divide{\n        margin-left: 10%;\n    }\n}\n\n@media only screen and (max-width: 480px) {\n    #apple-watch-rings .col-xs-4 {\n        width: 31.3333%;\n    }\n}\n\n@media screen and (max-width: 410px) {\n    #apple-watch-rings .divide{\n        margin-left: 10%;\n    }\n\n    #apple-watch-rings #column1 {\n        margin-left: -9% !important;\n    }\n\n    #apple-watch-rings .subgauge {\n        margin-left: 3% !important;\n    }\n\n    #apple-watch-rings .content {\n        margin-top: -33% !important;\n    }\n}\n\n#gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n}\n\n.tailwind #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .tailwind-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-bottom: 4px;\n    margin-top: 3px;\n}\n\n.material #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .material-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-top: 1px;\n}\n\n.fabric #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .fabric-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-bottom: 2px;\n    margin-top: -3px;\n}\n\n.bootstrap #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .bootstrap-dark #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation, .bootstrap4 #gaugeTwo_Axis_0_Annotation_0 .firstAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-top: 2px;\n}\n\n#gaugeThree_Axis_0_Annotation_0 .secondAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 1px;\n}\n\n.tailwind #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .tailwind-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-bottom: 4px;\n    margin-top: 2px;\n}\n\n.material #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .material-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-top: 2px;\n}\n\n.fabric #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .fabric-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 2px;\n    margin-bottom: 4px;\n}\n\n.bootstrap #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .bootstrap-dark #gaugeThree_Axis_0_Annotation_0 .secondAnnotation, .bootstrap4 #gaugeThree_Axis_0_Annotation_0 .secondAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 1px;\n    margin-top: 2px;\n}\n\n#gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-top: -2px;\n    margin-left: 0px;\n}\n\n.tailwind #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .tailwind-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-top: -2px;\n    margin-left: 1px;\n}\n\n.fabric #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .fabric-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 1px;\n    margin-top: -7px;\n}\n\n.bootstrap #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .bootstrap-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .bootstrap4 #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 0.5px;\n    margin-top: 0px;\n}\n\n.material #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation, .material-dark #gaugeFour_Axis_0_Annotation_0 .thirdAnnotation {\n    height: 17px;\n    width: 17px;\n    margin-left: 0px;\n    margin-top: 0px;\n}\n";
var AppleWatchGauge = /** @class */ (function (_super) {
    __extends(AppleWatchGauge, _super);
    function AppleWatchGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AppleWatchGauge.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    AppleWatchGauge.prototype.loadRedGauge = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;margin-left:1px" src="src/circular-gauge/images/image4.svg" /></div>';
        }
        // custom code end
    };
    AppleWatchGauge.prototype.loadGreenGauge = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:15px;height:15px;;margin-left:1px" src="src/circular-gauge/images/image5.svg" /></div>';
        }
        // custom code end
    };
    AppleWatchGauge.prototype.loadBlueGauge = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        if (selectedTheme === 'highcontrast') {
            args.gauge.axes[0].annotations[0].content = '<div id="annotation5"><img style="width:17px;height:17px;;margin-top:-2px" src="src/circular-gauge/images/image6.svg" /></div>';
        }
        // custom code end
    };
    AppleWatchGauge.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section', id: "apple-watch-rings" },
                    React.createElement("div", { className: "col-xs-10 col-sm-10 col-lg-8 col-md-8" },
                        React.createElement("div", { style: { display: 'flex', justifyContent: 'center' } },
                            React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'gaugeOne', background: 'transparent', height: "400px", width: "400px" },
                                React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                            format: 'Red Gauge {value}',
                                            font: {
                                                size: '0px',
                                                color: 'transparent'
                                            },
                                            position: 'Inside',
                                            useRangeColor: true
                                        }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                        React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img alt="Red arrow" style="width:22px;height:22 px;" src="src/circular-gauge/images/image1.svg" /></div>', angle: 8, radius: '80%', zIndex: '1' }),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation2"><img alt="Green arrow" style="width:22px;height:22px;" src="src/circular-gauge/images/image2.svg" /></div>', angle: 11, radius: '58%', zIndex: '1' }),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation3"><img alt="Blue arrow" style="width:22px;height:22px;" src="src/circular-gauge/images/image3.svg" /></div>', angle: 16, radius: '36%', zIndex: '1' })),
                                        React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '90%', startWidth: 40, endWidth: 40, color: '#fa114f', opacity: 0.2 }),
                                            React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '68%', startWidth: 40, endWidth: 40, color: '#99ff01', opacity: 0.2 }),
                                            React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '46%', startWidth: 40, endWidth: 40, color: '#00d8fe', opacity: 0.2 })),
                                        React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                            React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 65, radius: '90%', color: '#fa114f', pointerWidth: 40, type: 'RangeBar', roundedCornerRadius: 25 }),
                                            React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 43, radius: '68%', color: '#99ff01', pointerWidth: 40, type: 'RangeBar', roundedCornerRadius: 25 }),
                                            React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 58, radius: '46%', color: '#00d8fe', pointerWidth: 40, type: 'RangeBar', roundedCornerRadius: 25 }))))))),
                    React.createElement("div", { className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { marginTop: "3%" } },
                        React.createElement("div", { className: "panel" },
                            React.createElement("div", { className: "subgauge", style: { float: "left", marginTop: "1%" } },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.loadRedGauge.bind(this), id: 'gaugeTwo', background: 'transparent', height: "65px", width: "65px" },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                                font: {
                                                    size: '0px',
                                                    color: 'transparent'
                                                },
                                                position: 'Inside',
                                                useRangeColor: true
                                            }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img class="firstAnnotation" src="src/circular-gauge/images/image1.svg" /></div>', angle: 0, radius: '0%', zIndex: '1' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '100%', startWidth: 8, endWidth: 8, color: '#fa114f', opacity: 0.2 })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 65, radius: '100%', color: '#fa114f', pointerWidth: 8, type: 'RangeBar', roundedCornerRadius: 5 })))))),
                            React.createElement("div", { className: "content" },
                                React.createElement("span", { className: "firstcontent", style: { fontSize: "18px" } }, "MOVE"),
                                React.createElement("span", { className: "firstcontent", style: { fontSize: "18px", color: "#f4104d" } }, "\u00A065%"),
                                React.createElement("br", null),
                                React.createElement("span", { className: "secondcontent", style: { color: "#f4104d", fontSize: "19px" } }, "338/520 CAL"))),
                        React.createElement("div", { className: "panel" },
                            React.createElement("div", { className: "subgauge", style: { float: "left", marginTop: "1%" } },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.loadGreenGauge.bind(this), id: 'gaugeThree', background: 'transparent', height: "65px", width: "65px" },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                                font: {
                                                    size: '0px',
                                                    color: 'transparent'
                                                },
                                                position: 'Inside',
                                                useRangeColor: true
                                            }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img class="secondAnnotation" src="src/circular-gauge/images/image2.svg" /></div>', angle: 0, radius: '0%', zIndex: '1' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '100%', startWidth: 8, endWidth: 8, color: '#99ff01', opacity: 0.2 })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 43, radius: '100%', color: '#99ff01', pointerWidth: 8, type: 'RangeBar', roundedCornerRadius: 5 })))))),
                            React.createElement("div", { className: "content" },
                                React.createElement("span", { className: "firstcontent", style: { fontSize: "18px" } }, "EXERCISE"),
                                React.createElement("span", { className: "firstcontent", style: { fontSize: "18px", color: "#a6ff00" } }, "\u00A043%"),
                                React.createElement("br", null),
                                React.createElement("span", { className: "secondcontent", style: { color: "#a6ff00", fontSize: "19px" } }, "13/30 MIN"))),
                        React.createElement("div", { className: "panel" },
                            React.createElement("div", { className: "subgauge", style: { float: "left", marginTop: "1%" } },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.loadBlueGauge.bind(this), id: 'gaugeFour', background: 'transparent', height: "65px", width: "65px" },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 360, minimum: 0, maximum: 100, lineStyle: { width: 0 }, labelStyle: {
                                                font: {
                                                    size: '0px',
                                                    color: 'transparent'
                                                },
                                                position: 'Inside',
                                                useRangeColor: true
                                            }, majorTicks: { height: 0 }, minorTicks: { height: 0 } },
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="annotation1"><img class="thirdAnnotation" src="src/circular-gauge/images/image3.svg" /></div>', angle: 0, radius: '0%', zIndex: '1' })),
                                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 100, radius: '100%', startWidth: 8, endWidth: 8, color: '#00d8fe', opacity: 0.2 })),
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: true }, value: 58, radius: '100%', color: '#00d8fe', pointerWidth: 8, type: 'RangeBar', roundedCornerRadius: 5 })))))),
                            React.createElement("div", { className: "content" },
                                React.createElement("span", { className: "firstcontent", style: { fontSize: "18px" } }, "STAND"),
                                React.createElement("span", { className: "firstcontent", style: { fontSize: "18px", color: "#00d8fe" } }, "\u00A058%"),
                                React.createElement("br", null),
                                React.createElement("span", { className: "secondcontent", style: { color: "#00d8fe", fontSize: "19px" } }, "7/12 HR")))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample resembles the appearance of Apple watch rings. This is similar to an activity tracker, which records the specifics of each move, exercise, and stand.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to make the circular gauge look like the Apple watch rings. Ranges have rounded corners and annotations are used to indicate the move, exercise, and stand values."),
                React.createElement("p", null,
                    "More information on the annotations can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-annotations/" }, "documentation section"),
                    "."))));
    };
    return AppleWatchGauge;
}(sample_base_1.SampleBase));
exports.AppleWatchGauge = AppleWatchGauge;
