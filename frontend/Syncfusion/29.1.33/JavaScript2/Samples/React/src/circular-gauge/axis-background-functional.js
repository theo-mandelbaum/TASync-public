"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_circulargauge_1 = require("@syncfusion/ej2-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var AxisBackGround = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var annotationGauge;
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var updateGauge = function () {
        annotationGauge = new ej2_circulargauge_1.CircularGauge({
            width: '600px',
            height: '450px',
            background: 'transparent',
            axes: [{
                    labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit', color: 'White' } },
                    majorTicks: { height: 15, interval: 30 },
                    minorTicks: { height: 10, interval: 6 }, minimum: 0, maximum: 360,
                    pointers: [{
                            value: 90,
                            radius: '45%', markerWidth: 12, markerHeight: 12,
                            description: 'Marker pointer value : 90',
                            type: 'Marker', markerShape: 'Triangle', color: 'Orange',
                            animation: { enable: true, duration: 500 }
                        }], startAngle: 0, endAngle: 0, radius: '60%', lineStyle: { width: 0 }
                }]
        });
        annotationGauge.appendTo('#subGauge');
    };
    var onChartLoad = function () {
        updateGauge();
    };
    var onResized = function () {
        location.reload();
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { loaded: onChartLoad.bind(_this), resized: onResized.bind(_this), load: load.bind(_this), id: 'axis-background', background: 'transparent', centerY: '65%' },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '80%', majorTicks: { height: 0 }, lineStyle: { width: 0 }, minorTicks: { height: 0 }, labelStyle: { format: '{value} %', font: { size: '0px' } } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '0%' })),
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Axis background', content: '<div style="margin-top: -37%;"><img alt="Axis background image" src="src/circular-gauge/images/axis-background.png" height="400" width="400" /></div>', angle: 0, radius: '0%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Sub gauge', content: '<div id="subGauge" style="margin-left: -50%; margin-top: -50%;"></div>', angle: 0, radius: '0%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Annotation value : 90', content: '<div style="color:orange;margin-top: -86px;margin-left: -1px;font-size: 18px;"> 90</div>', angle: 10, radius: '0%', zIndex: '1' }))))))),
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
exports.default = AxisBackGround;
