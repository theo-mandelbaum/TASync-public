"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var MultipleRanges = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), animationDuration: 2000, id: 'multiple-ranges', background: 'transparent' },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 230, endAngle: 130, radius: '90%', minimum: -30, maximum: 120, hideIntersectingLabel: true, majorTicks: { width: 0, interval: 10 }, lineStyle: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { offset: 50, position: 'Inside', autoAngle: true, font: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size:18px;margin-left: 5px;color:#9DD55A"> 22.5\\u00b0C </div>', angle: 180, radius: '20%', zIndex: '1' })),
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '45%', cap: { radius: 10, color: 'white', border: { width: 4, color: '#F7B194' } }, value: 22.5, pointerWidth: 7, color: '#F7B194', animation: { enable: false }, needleTail: { length: '25%', color: '#F7B194' } })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -30, end: -20, radius: '90%', color: '#58ABD5', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -20, end: -10, radius: '90%', color: '#58ABD5', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: -10, end: 0, radius: '90%', color: '#58ABD5', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 10, radius: '90%', color: '#58D2D5', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 10, end: 20, radius: '90%', color: '#9DD55A', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 20, end: 30, radius: '90%', color: '#9DD55A', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 30, end: 40, radius: '90%', color: '#F1D158', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 50, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 50, end: 60, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 60, end: 70, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 70, end: 80, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 80, end: 90, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 90, end: 100, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 100, end: 110, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 110, end: 120, radius: '90%', color: '#F48C6F', startWidth: 35, endWidth: 35 }))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample shows temperature variations in a circular gauge using multiple ranges. In addition, the needle pointer and annotation help in displaying the temperature that has been measured.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure multiple ranges in the circular gauge. The ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/' }, "RangesDirective"),
                " collection can be used to define multiple ranges, each of which points to a different start and end value."),
            React.createElement("p", null,
                "More information on the ranges can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/" }, "documentation section"),
                "."))));
};
exports.default = MultipleRanges;
