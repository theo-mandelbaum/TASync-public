"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var ProgressBar = function () {
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
                React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load.bind(_this), animationDuration: 2000, background: 'transparent', id: 'gauge', orientation: 'Horizontal', container: { width: 30, roundedCornerRadius: 20, backgroundColor: '#D6D6D6', type: 'RoundedRectangle', border: { width: 1 } } },
                    React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                    React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, line: { width: 0 }, minorTicks: { interval: 1, height: 0 }, majorTicks: { interval: 10, height: 0 }, labelStyle: { font: { size: '0px' } } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 41, height: 30, width: 30, color: '#2196F3', type: 'Bar', roundedCornerRadius: 20 })))),
                    React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="font-size: 15px;color: white;margin-top: 28px;margin-left:50%">41%</div>', axisIndex: 0, axisValue: 10, x: 0, zIndex: '1', y: 0 }))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
            React.createElement("p", null, "This sample shows a linear gauge that resembles a progress bar and indicates a task completion rate of 41%.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render and configure a new progress bar using the linear gauge. This can be accomplished by combining axis, pointer, and annotation."),
            React.createElement("p", null,
                "More information on the linear gauge can be found in this  ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = ProgressBar;
