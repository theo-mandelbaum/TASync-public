"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Tooltip = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('Horizontal'), gaugeOriention = _a[0], setOrientation = _a[1];
    var gaugeInstance = (0, react_1.useRef)(null);
    var tooltipRender = function (args) {
        args.content = (args.axis.visibleRange.max === 25) ? Number(args.content).toFixed(1) + ' cm' : Number(args.content).toFixed(1) + ' in';
    };
    var gaugeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast' || args.gauge.theme.toLowerCase() === 'fluent2-highcontrast') {
            args.gauge.annotations[0].content = '<div id="first"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
            args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
        }
        var width = Number(args.gauge.element.offsetWidth);
        if (width < 500) {
            args.gauge.axes[1].majorTicks.interval = 2;
            args.gauge.axes[1].minorTicks.interval = 1;
            args.gauge.annotations[0].x = -57;
            args.gauge.annotations[0].y = -30;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = -45;
            args.gauge.orientation = "Vertical";
        }
        else {
            args.gauge.axes[1].majorTicks.interval = 1;
            args.gauge.axes[1].minorTicks.interval = 0.2;
            args.gauge.annotations[0].x = 35;
            args.gauge.annotations[0].y = -58;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = 52;
            args.gauge.orientation = "Horizontal";
        }
    };
    var gaugeLoaded = function (args) {
        if (document.getElementById('tooltipContainer')) {
            if (args.gauge.availableSize.width < 500) {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = 'rotate(270deg)';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = 'rotate(270deg)';
            }
            else {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = '';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = '';
            }
        }
    };
    var labelRender = function (args) {
        if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
            args.text = '';
        }
    };
    var gaugeResized = function (args) {
        if (args.currentSize.width < 500) {
            gaugeInstance.current.axes[1].majorTicks.interval = 2;
            gaugeInstance.current.axes[1].minorTicks.interval = 1;
            gaugeInstance.current.annotations[0].x = -57;
            gaugeInstance.current.annotations[0].y = -30;
            gaugeInstance.current.annotations[1].x = 50;
            gaugeInstance.current.annotations[1].y = -45;
            gaugeInstance.current.orientation = "Vertical";
        }
        else {
            gaugeInstance.current.axes[1].majorTicks.interval = 1;
            gaugeInstance.current.axes[1].minorTicks.interval = 0.2;
            gaugeInstance.current.annotations[0].x = 35;
            gaugeInstance.current.annotations[0].y = -58;
            gaugeInstance.current.annotations[1].x = 50;
            gaugeInstance.current.annotations[1].y = 52;
            gaugeInstance.current.orientation = "Horizontal";
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-scxection' },
                React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { id: 'tooltipContainer', ref: gaugeInstance, background: 'transparent', orientation: gaugeOriention, axisLabelRender: labelRender.bind(_this), load: gaugeLoad.bind(_this), loaded: gaugeLoaded.bind(_this), resized: gaugeResized.bind(_this), tooltipRender: tooltipRender.bind(_this), container: { width: 140, border: { width: 2, color: '#a6a6a6' } }, tooltip: { enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } } },
                    React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations, ej2_react_lineargauge_1.GaugeTooltip] }),
                    React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 10, majorTicks: { interval: 1, height: 20, color: '#9E9E9E' }, minorTicks: { interval: 0.2, height: 10, color: '#9E9E9E' }, line: { offset: 140, color: '#a6a6a6' }, labelStyle: { font: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 5.4, color: '#ff66b3', offset: 15 }))),
                        React.createElement(ej2_react_lineargauge_1.AxisDirective, { opposedPosition: true, minimum: 0, maximum: 25, majorTicks: { interval: 1, height: 20, color: '#9E9E9E' }, minorTicks: { interval: 0.2, height: 10, color: '#9E9E9E' }, line: { offset: -140, color: '#a6a6a6' }, labelStyle: { font: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 16.5, color: '#4d94ff', offset: -15 })))),
                    React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="first"><h1 style="font-size:15px;color:#686868;">Inches</h1></div>', axisIndex: 0, axisValue: 5.4, x: 35, y: -58, zIndex: '1' }),
                        React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="second"><h1 style="font-size:15px;color:#686868;">Centimeters</h1></div>', axisIndex: 1, axisValue: 16.5, x: 50, y: 52, zIndex: '1' }))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
            React.createElement("p", null, "This sample depicts the linear gauge as a measuring scale and shows the tooltip in the linear gauge.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
            React.createElement("p", null, "The tooltip is used to track the current value that is closest to the mouse position or touch contact. When using a touch-enabled device, the tooltip is displayed by hovering or tapping."),
            React.createElement("p", null,
                "More information about tooltip can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/user-interaction/#tooltip" }, "documentation section"),
                "."))));
};
exports.default = Tooltip;
