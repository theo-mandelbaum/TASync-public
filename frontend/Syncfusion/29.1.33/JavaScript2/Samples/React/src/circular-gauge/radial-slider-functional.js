"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var RadialSlider = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var gauge = (0, react_1.useRef)(null);
    var pointerValue;
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var dragMove = function (args) {
        pointerValue = args.currentValue;
        if (pointerValue != null) {
            gauge.current.setPointerValue(0, 0, pointerValue);
            gauge.current.setRangeValue(0, 0, 0, pointerValue);
            gauge.current.setRangeValue(0, 1, pointerValue, 100);
            gauge.current.setAnnotationValue(0, 0, '<div style="font-style: oblique; margin-left: 5px;font-size: 20px; margin-top: -2px;"><span>' + Math.ceil(pointerValue) + '%</span></div>');
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), dragMove: dragMove.bind(_this), enablePointerDrag: true, id: 'custom-labels', ref: gauge, background: 'transparent' },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '80%', majorTicks: { height: 0 }, lineStyle: { width: 0 }, minorTicks: { height: 0 }, labelStyle: { offset: -1, font: { size: '0px' } } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: 'Marker', value: 30, markerShape: 'Circle', color: '#2C75DC', radius: '97%', markerWidth: 25, markerHeight: 25, animation: { enable: false } })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 30, color: '#2C75DC', startWidth: 12, endWidth: 12, radius: '100%' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 30, end: 100, color: '#BFD6F5', startWidth: 12, endWidth: 12, radius: '100%' })),
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-style: oblique; font-size: 20px; margin-top: -2px; margin-left: 5px"><span>30%</span></div>', angle: 180, radius: '0%', zIndex: '1' }))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample demonstrates how to create a range slider component by utilizing the functions available in the circular gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render and configure a new range slider in the circular gauge. It is possible to achieve this by combining ranges and a marker pointer. The marker pointer has been made interactive, so the value changes as you drag it."),
            React.createElement("p", null,
                "More information on the circular gauge can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = RadialSlider;
