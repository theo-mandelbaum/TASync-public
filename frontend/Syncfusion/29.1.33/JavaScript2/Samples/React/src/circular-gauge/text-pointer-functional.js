"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var TextPointer = function () {
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
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), centerY: '75%', id: 'text-pointer', background: 'transparent' },
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 270, endAngle: 90, radius: '120%', minimum: 0, maximum: 120, rangeGap: 3, majorTicks: { width: 0 }, lineStyle: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { font: { size: '0px' } } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { pointerWidth: 10, radius: '60%', needleStartWidth: 1, needleEndWidth: 1, value: 82, cap: { radius: 0 }, animation: { enable: true } }),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '85%', type: 'Marker', value: 20, text: 'Poor', markerShape: 'Text', animation: { enable: false }, textStyle: { size: '18px', fontFamily: 'inherit' } }),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '85%', type: 'Marker', value: 60, text: 'Average', markerShape: 'Text', animation: { enable: false }, textStyle: { size: '18px', fontFamily: 'inherit' } }),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '85%', type: 'Marker', value: 100, text: 'Good', markerShape: 'Text', animation: { enable: false }, textStyle: { size: '18px', fontFamily: 'inherit' } })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 20, radius: '80%', startWidth: 85, endWidth: 85, color: '#dd3800' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 20.5, end: 40, radius: '80%', startWidth: 85, endWidth: 85, color: '#ff4100' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40.5, end: 60, radius: '80%', startWidth: 85, endWidth: 85, color: '#ffba00' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 60.5, end: 80, radius: '80%', startWidth: 85, endWidth: 85, color: '#ffdf10' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 80.5, end: 100, radius: '80%', startWidth: 85, endWidth: 85, color: '#8be724' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 100.5, end: 120, radius: '80%', startWidth: 85, endWidth: 85, color: '#64be00' }))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample visualizes the performance outcome of a work using the text pointer in the circular gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to use a text to customize the pointer in the circular gauge. The text can be added to the circular gauge's pointer primarily through the use of the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#type" }, "type"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#markershape" }, "markerShape"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/#text" }, "text"),
                " properties in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/pointerModel/" }, "PointersDirective"),
                "."),
            React.createElement("p", null,
                "More information on the pointers can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/" }, "documentation section"),
                "."))));
};
exports.default = TextPointer;
