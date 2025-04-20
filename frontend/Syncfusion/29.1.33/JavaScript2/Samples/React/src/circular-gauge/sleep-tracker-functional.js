"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var SleepTracker = function () {
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
    var axisLabelRender = function (args) {
        if (args.value == 3 || args.value == 6 || args.value == 9 || args.value == 12) {
            args.text = args.value.toString();
        }
        else {
            args.text = "";
        }
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), axisLabelRender: axisLabelRender.bind(_this), id: 'custom-labels', background: 'transparent' },
                    React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '70%', minimum: 0, maximum: 12, majorTicks: { width: 2, height: 12, interval: 1, offset: 4 }, lineStyle: { width: 0 }, minorTicks: { width: 1, height: 7, interval: 0.2, offset: 4 }, labelStyle: { hiddenLabel: 'First', font: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 4.7, markerShape: 'Image', radius: '97%', markerWidth: 28, markerHeight: 28, imageUrl: "src/circular-gauge/images/sun-icon.png", animation: { enable: false } }),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { type: "Marker", value: 9, markerShape: 'Image', radius: '98%', markerWidth: 28, markerHeight: 28, imageUrl: "src/circular-gauge/images/moon-icon.png", animation: { enable: false } })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 4.7, startWidth: 4, endWidth: 4, color: '#6453D0' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 12, end: 9, startWidth: 4, endWidth: 4, color: '#6453D0' }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 4.7, end: 9, startWidth: 4, endWidth: 4, color: '#d7d3ed' })),
                            React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Mon, 5 Apr', content: '<div style="font-size:15px;border-radius: 20px;border: 2px solid gray;padding: 5px 4px 5px;width: 93%;text-align: center;margin-left: 67px;">Mon, 5 Apr</div>', angle: 342, radius: '129%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '07 hrs 43 mins', content: '<div style="font-size:15px;margin-left:25px">07 hrs 43 mins</div>', angle: 185, radius: '120%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: 'Sleep time', content: '<div style="font-size:15px;margin-left: 34px;">Sleep Time</div>', angle: 185, radius: '140%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '4 Apr 9:00 PM', content: '<div style="color:#6453D0;font-size:15px;margin-top: 54px;margin-left:28px"><p style="text-align: center;">4 Apr</p><p style="margin-top: -10px;">9:00 PM</p></div>', angle: 285, radius: '60%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '-', content: '<div style="color:#6453D0;margin-top: -8px;"> - </div>', angle: 0, radius: '0%', zIndex: '1' }),
                                React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { description: '5 Apr 4:43 AM', content: '<div style="color:#6453D0;font-size:15px;margin-left: -15px;margin-top: 56px;"><p style="text-align: center;">5 Apr </p><p style="margin-top: -10px;">4:43 AM</p></div>', angle: 70, radius: '50%', zIndex: '1' }))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample represents the number of hours slept by a person using a sleep tracker. The sleep tracker also displays the start and end time of each sleep cycle.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to make the circular gauge look like a sleep tracker. Additionally, the date, start and end time, and duration of sleep are all displayed."),
            React.createElement("p", null,
                "More information on the circular gauge can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                "."))));
};
exports.default = SleepTracker;
