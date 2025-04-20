"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #templateWrap img {\n        border-radius: 30px;\n        width: 30px;\n        height: 30px;\n        margin: 0 auto;\n    }\n    #templateWrap .des {\n        float: right;\n        padding-left: 10px;\n        line-height: 30px;\n    }\n    .templateAlign {\n        font-size: 14px;\n        color: #9E9E9E;\n        margin-left: -12px;\n    }\n    .annotationText {\n        margin-top: -30px;\n    }";
var Image = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var annotationTextStyle = {
        fontFamily: 'inherit',
        size: '14px',
        color: '#9E9E9E'
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var onChartLoad = function (args) {
        document.getElementById('image-container').setAttribute('title', '');
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-12' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), title: 'Shot Put Distance', background: 'transparent', loaded: onChartLoad.bind(_this), id: 'image-container', enablePointerDrag: true, titleStyle: { fontFamily: 'inherit' }, centerY: "57%'" },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 200, endAngle: 130, radius: '80%', minimum: 0, maximum: 14, lineStyle: { width: 0 }, majorTicks: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { font: { size: '0px' } } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer foot ball value : 12', type: "Marker", value: 12, markerShape: "Image", imageUrl: "src/circular-gauge/images/foot-ball.png", radius: '108%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer basket ball value : 11', type: "Marker", value: 11, markerShape: "Image", imageUrl: "src/circular-gauge/images/basket-ball.png", radius: '78%', markerWidth: 28, markerHeight: 28, animation: { duration: 1200 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer golf ball value : 10', type: "Marker", value: 10, markerShape: "Image", imageUrl: "src/circular-gauge/images/golf-ball.png", radius: '48%', markerWidth: 28, markerHeight: 28, animation: { duration: 900 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer athletic value : 10', type: "Marker", value: 12, markerShape: "Image", imageUrl: "src/circular-gauge/images/Athletics.png", radius: '0%', markerWidth: 90, markerHeight: 90, animation: { duration: 0 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer girl value : 10', type: "Marker", value: 0, markerShape: "Image", imageUrl: "src/circular-gauge/images/girl.png", radius: '108%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer man value : 10', type: "Marker", value: 0, markerShape: "Image", imageUrl: "src/circular-gauge/images/man-one.png", radius: '78%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer man value: 10', type: "Marker", value: 0, markerShape: "Image", imageUrl: "src/circular-gauge/images/man-two.png", radius: '48%', markerWidth: 28, markerHeight: 28, animation: { duration: 1500 } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 12, radius: '115%', color: '#01aebe', startWidth: 25, endWidth: 25 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 11, radius: '85%', color: '#3bceac', startWidth: 25, endWidth: 25 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 10, radius: '55%', color: '#ee4266', startWidth: 25, endWidth: 25 })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '12 M', content: '<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> 12 M </div>', radius: '108%', angle: 98, zIndex: '1', textStyle: annotationTextStyle }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '11 M', content: '<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> 11 M </div>', radius: '80%', angle: 81, zIndex: '1', textStyle: annotationTextStyle }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '10 M', content: '<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> 10 M </div>', radius: '50%', angle: 69, zIndex: '1', textStyle: annotationTextStyle }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Doe', content: '<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> Doe </div>', radius: '106%', angle: 189, zIndex: '1', textStyle: annotationTextStyle }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Almaida', content: '<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> Almaida </div>', radius: '78%', angle: 180, zIndex: '1', textStyle: annotationTextStyle }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'John', content: '<div style="color:#9E9E9E; font-family:inherit; font-size:14px;"> John </div>', radius: '48%', angle: 175, zIndex: '1', textStyle: annotationTextStyle })))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample visualizes the shot put distance covered by the athletes using the image pointer in the circular gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to use an image to customize the pointer in the circular gauge. The image can be added to the circular gauge's pointer primarily through the use of the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#type" }, "type"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#markershape" }, "markerShape"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#imageurl" }, "imageUrl"),
                " properties in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/" }, "PointersDirective"),
                "."),
            React.createElement("p", null,
                "More information on the pointers can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/#marker-pointer" }, "documentation section"),
                "."))));
};
exports.default = Image;
