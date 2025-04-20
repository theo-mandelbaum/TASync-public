"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Pointers = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var needlePointerGauge = (0, react_1.useRef)(null);
    var liveUpdateGauge = (0, react_1.useRef)(null);
    var needleInterval;
    var liveUpdateInterval;
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var onChartLoad = function (args) {
        var id = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (id === 'needle-pointer-container') {
            needleInterval = setInterval(function () {
                var newVal = Math.random() * (90 - 20) + 20;
                if (document.getElementById('needle-pointer-container')) {
                    needlePointerGauge.current.setPointerValue(0, 0, newVal);
                }
                else {
                    clearInterval(+needleInterval);
                }
            }, 1000);
        }
        if (id === 'live-update-container') {
            liveUpdateInterval = setInterval(function () {
                var newVal = Math.random() * (80 - 30) + 30;
                if (document.getElementById('live-update-container') && liveUpdateGauge != null) {
                    liveUpdateGauge.current.setPointerValue(0, 0, newVal);
                    liveUpdateGauge.current.setPointerValue(0, 1, newVal);
                }
                else {
                    clearInterval(+needleInterval);
                }
            }, 1000);
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row", style: { margin: '0px' } },
                    React.createElement("div", { className: "col-sm-12", style: { padding: '0px' } },
                        React.createElement("div", { className: "row", style: { margin: '0px' } },
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, background: 'transparent', centerY: '40%', loaded: onChartLoad.bind(_this), id: 'marker-pointer-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: { width: 3, color: '#01aebe' }, majorTicks: { height: 0, interval: 100 }, minorTicks: { height: 0 }, labelStyle: { position: 'Outside', font: { size: '0px' } } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '100%', color: 'rgb(0,171,169)', type: 'Marker', markerShape: 'InvertedTriangle', markerHeight: 15, markerWidth: 15 })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:14px;margin-top:10px;">Marker pointer</div>', angle: 180, zIndex: '1', radius: '28%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, centerY: '40%', background: 'transparent', loaded: onChartLoad.bind(_this), id: 'rangebar-pointer-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: { width: 3, color: '#ff5985' }, majorTicks: { height: 0, interval: 100 }, minorTicks: { height: 0, width: 0 }, labelStyle: { position: 'Outside', font: { size: '0px' } } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 66, radius: '90%', color: '#ff5985', type: "RangeBar", pointerWidth: 10, animation: { enable: true, duration: 1000 } })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:14px;margin-top:11px;">Range bar pointer</div>', angle: 180, zIndex: '1', radius: '28%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, centerY: '40%', background: 'transparent', ref: needlePointerGauge, loaded: onChartLoad.bind(_this), id: 'needle-pointer-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: { width: 3, color: '#9250e6' }, majorTicks: { height: 0, interval: 100 }, minorTicks: { height: 0 }, labelStyle: { position: 'Outside', font: { size: '0px' } } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, animation: { enable: true, duration: 900 }, radius: '100%', color: '#923C99', pointerWidth: 6, cap: { radius: 0 }, needleTail: { length: '4%', color: '#923C99' } })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:14px;margin-top:10px;">Needle pointer</div>', angle: 180, zIndex: '1', radius: '28%' }))))))))),
                React.createElement("div", { className: "row", style: { margin: '0px' } },
                    React.createElement("div", { className: "col-sm-12", style: { padding: '0px' } },
                        React.createElement("div", { className: "row", style: { margin: '0px' } },
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, centerY: '40%', background: 'transparent', loaded: onChartLoad.bind(_this), id: 'customized-pointer-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: { width: 3, color: '#1E7145' }, majorTicks: { height: 0, interval: 100 }, minorTicks: { height: 0 }, labelStyle: { position: 'Outside', font: { size: '0px', color: '#1E7145' } } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '80%', color: 'green', pointerWidth: 2, needleStartWidth: 4, needleEndWidth: 4, animation: { enable: true, duration: 1000 }, cap: { radius: 8, color: 'green' }, needleTail: { length: '0%' } })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:14px;margin-top:29px;">Customized pointer</div>', angle: 180, zIndex: '1', radius: '28%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, centerY: '40%', background: 'transparent', loaded: onChartLoad.bind(_this), id: 'multiple-pointer-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: { width: 3, color: '#e3a21a' }, majorTicks: { height: 0, interval: 100 }, minorTicks: { height: 0 }, labelStyle: { position: 'Outside', font: { size: '0px', color: '#e3a21a' } } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, markerWidth: 5, markerHeight: 5, radius: '60%', color: '#e3a21a', pointerWidth: 10, cap: { radius: 8, color: 'white', border: { color: '#e3a21a', width: 1 } }, animation: { enable: true, duration: 1000 }, needleTail: { length: '20%', color: '#e3a21a' } }),
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 40, radius: '60%', color: '#ffb133', pointerWidth: 10, markerWidth: 5, markerHeight: 5, cap: { radius: 8, color: 'white', border: { color: '#ffb133', width: 1 } }, animation: { enable: true, duration: 1000 }, needleTail: { length: '20%', color: '#e3a21a' } })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:14px;margin-top:22px;">Multiple pointers</div>', angle: 180, zIndex: '1', radius: '32%' })))))),
                            React.createElement("div", { className: "col-sm-4" },
                                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), style: { height: "250px" }, background: 'transparent', ref: liveUpdateGauge, centerY: '40%', loaded: onChartLoad.bind(_this), id: 'live-update-container' },
                                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '90%', minimum: 0, maximum: 100, lineStyle: { width: 0 }, majorTicks: { height: 0, interval: 100 }, minorTicks: { height: 0 }, labelStyle: { position: 'Outside', font: { size: '0px' } } },
                                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 40, animation: { enable: false, duration: 100 }, radius: '100%', color: '#067bc2', pointerWidth: 6, cap: { radius: 0 }, needleTail: { length: '4%', color: '#067bc2' } }),
                                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 40, type: "RangeBar", radius: "100%", animation: { enable: false, duration: 100 }, color: '#067bc2', pointerWidth: 5 })),
                                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:14px;margin-top:22px;">Live update</div>', angle: 180, zIndex: '1', radius: '32%' }))))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample demonstrates the various pointer types available in the circular gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to customize the pointer for an axis in the circular gauge. The circular gauge supports a variety of pointers, including marker, needle, and range bar. Additionally, the pointer can be customized, and multiple pointers can also be enabled."),
            React.createElement("p", null,
                "More information on the pointers can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/" }, "documentation section"),
                "."))));
};
exports.default = Pointers;
