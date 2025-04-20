"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var CustomLabels = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var textValues = ['0', '2', '5', '10', '20', '50', '100', '150', '200'];
    var rangeLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9e40dc', offset: '0%', opacity: 1 },
            { color: '#d93c95', offset: '70%', opacity: 1 },
        ]
    };
    var pointerLinearGradient = {
        startValue: '0%',
        endValue: '100%',
        colorStop: [
            { color: '#9e40dc', offset: '0%', opacity: 0.2 },
            { color: '#9e40dc', offset: '70%', opacity: 0.5 }
        ]
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var axisLabelRender = function (args) {
        args.text = textValues[(args.value)];
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), animationDuration: 2000, axisLabelRender: axisLabelRender.bind(_this), id: 'custom-labels', background: 'transparent' },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Gradient] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 150, radius: '80%', minimum: 0, maximum: 8, majorTicks: { width: 0, interval: 1 }, lineStyle: { width: 0 }, minorTicks: { width: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { pointerWidth: 10, radius: '85%', needleStartWidth: 10, needleEndWidth: 5, value: 6.2, color: '#E63B86', cap: { radius: 0, border: { width: 0 } }, needleTail: { length: '0%' }, animation: { enable: false }, linearGradient: pointerLinearGradient })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 6.2, color: '#E63B86', startWidth: 22, endWidth: 22, linearGradient: rangeLinearGradient }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 6.2, end: 8, color: '#E0E0E0', startWidth: 22, endWidth: 22 }))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This example demonstrates how to introduce and position custom labels in a circular gauge. In addition, gradient colors are used on the circular gauge elements such as the pointer and range.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure custom labels in the circular gauge. The label text can be modified using the ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#axislabelrender' }, "axisLabelRender"),
                " event which will be triggered everytime when a label is rendered."),
            React.createElement("p", null,
                "More information on the labels can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/#labels" }, "documentation section"),
                "."))));
};
exports.default = CustomLabels;
