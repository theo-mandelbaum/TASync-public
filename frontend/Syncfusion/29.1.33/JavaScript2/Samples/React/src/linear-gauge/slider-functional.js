"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Slider = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var enableSliderGauge = (0, react_1.useRef)(null);
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var dragMove = function (args) {
        if (args.pointerIndex == 1) {
            enableSliderGauge.current.setPointerValue(0, 0, args.currentValue);
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { title: 'Enabled', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, dragMove: dragMove, load: load, background: 'transparent', id: 'enableSliderGauge', height: '150px', width: '450px', format: 'N0', orientation: 'Horizontal', ref: enableSliderGauge, tooltip: { enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.GaugeTooltip] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, opposedPosition: true, line: { width: 5, color: '#C2DEF8' }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 5, width: 5, color: '#0074E3', position: 'Cross', type: 'Bar' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 15, width: 15, color: '#0074E3', placement: 'Center', enableDrag: true, offset: -10, markerType: 'Circle' })))))),
                React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { title: 'Disabled', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, load: load, background: 'transparent', id: 'disableSliderGauge', height: '150px', width: '450px', orientation: 'Horizontal' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, opposedPosition: true, line: { width: 5, color: '#E0E0E0' }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 5, width: 5, color: '#ADADAD', position: 'Cross', enableDrag: false, type: 'Bar' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 15, width: 15, color: '#ADADAD', placement: 'Center', enableDrag: false, offset: -10, markerType: 'Circle' })))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
            React.createElement("p", null, "This sample demonstrates how to create a slider by utilizing the functionalities available in the linear gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render and configure a new slider in the linear gauge. This can be accomplished by combining axis, range, and pointer. The pointer has been made interactive, so the value changes as you drag it."),
            React.createElement("p", null,
                "More information on the linear gauge can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = Slider;
