"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n\n    #start, #end {\n        margin-left:-76px;   \n    }\n\n    #startAngle, #endAngle {\n        width:72%; \n    }\n\n    @media screen and (min-width: 1200px) {\n        #start, #end {\n            margin-left:-40px; \n        }\n        #startAngle, #endAngle {\n            width:72%; \n        }\n    }\n\n    @media screen and (min-width: 1200px) and (max-width: 1500px) {\n        #start, #end {\n            margin-left:-25px; \n        }\n    }\n\n    @media screen and (max-width: 420px) {\n        #start, #end {\n           margin-left:-42px;   \n        }\n        #startAngle, #endAngle {\n            width:58%; \n        }\n    }\n    ";
var Axes = function () {
    var _a = (0, react_1.useState)('220'), startValue = _a[0], setStartValue = _a[1];
    var _b = (0, react_1.useState)('140'), endValue = _b[0], setEndValue = _b[1];
    var _c = (0, react_1.useState)('ClockWise'), directionValue = _c[0], setDirectionValue = _c[1];
    var gauge = (0, react_1.useRef)(null);
    var start = (0, react_1.useRef)(null);
    var end = (0, react_1.useRef)(null);
    var axisRef = (0, react_1.useRef)(null);
    var directionRef = (0, react_1.useRef)(null);
    var axisIndex = 0;
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
    var dropList = [
        { text: 'Axis 1', value: 'Axis 1' },
        { text: 'Axis 2', value: 'Axis 2' },
    ];
    var dropDirectionList = [
        { text: 'Clockwise', value: 'ClockWise' },
        { text: 'Anti-clockwise', value: 'AntiClockWise' },
    ];
    var directionChange = function () {
        axisIndex = axisRef.current.index;
        var axisDirection = (gauge.current.axes[axisIndex].direction =
            directionRef.current.value == 'ClockWise'
                ? 'ClockWise'
                : 'AntiClockWise');
        gauge.current.axes[axisIndex].direction = axisDirection;
        setDirectionValue(axisDirection);
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.axes[1].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };
    var typeChange = function () {
        axisIndex = axisRef.current.index;
        var startAngle = gauge.current.axes[axisIndex].startAngle;
        var endAngle = gauge.current.axes[axisIndex].endAngle;
        directionRef.current.value = gauge.current.axes[axisIndex].direction;
        setDirectionValue(directionRef.current.value);
        setStartValue(String(startAngle));
        setEndValue(String(endAngle));
        start.current.value = startAngle.toString();
        end.current.value = endAngle.toString();
    };
    var startAngle = function () {
        var value = +start.current.value;
        axisIndex = axisRef.current.index;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.axes[1].pointers[0].animation.enable = false;
        gauge.current.axes[axisIndex].startAngle = value;
        setStartValue(String(value));
        gauge.current.axes[axisIndex].labelStyle.hiddenLabel = (0, ej2_react_circulargauge_1.isCompleteAngle)(gauge.current.axes[axisIndex].startAngle, gauge.current.axes[axisIndex].endAngle) ? 'First' : 'None';
        gauge.current.refresh();
    };
    var endAngle = function () {
        var value = +end.current.value;
        axisIndex = axisRef.current.index;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.axes[1].pointers[0].animation.enable = false;
        gauge.current.axes[axisIndex].endAngle = value;
        setEndValue(String(value));
        gauge.current.axes[axisIndex].labelStyle.hiddenLabel = (0, ej2_react_circulargauge_1.isCompleteAngle)(gauge.current.axes[axisIndex].startAngle, gauge.current.axes[axisIndex].endAngle) ? 'First' : 'None';
        gauge.current.refresh();
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), id: 'range-container', background: 'transparent', ref: gauge },
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { lineStyle: { width: 1.5 }, radius: '95%', direction: 'ClockWise', startAngle: 220, endAngle: 140, minimum: 0, maximum: 160, majorTicks: { position: 'Inside', width: 2, height: 10 }, minorTicks: { position: 'Inside', width: 2, height: 5 }, labelStyle: { position: 'Inside', autoAngle: true, font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '100%', markerHeight: 15, markerWidth: 15, type: 'Marker', markerShape: 'Triangle' }))),
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { lineStyle: { width: 1.5, color: ' #E84011' }, radius: '95%', direction: 'ClockWise', startAngle: 220, endAngle: 140, minimum: 0, maximum: 240, majorTicks: { position: 'Outside', width: 2, height: 10, color: '#E84011' }, minorTicks: { position: 'Outside', width: 2, height: 5, color: '#E84011' }, labelStyle: { position: 'Outside', autoAngle: true, offset: 5, font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 120, radius: '100%', color: '#E84011', markerHeight: 15, markerWidth: 15, type: 'Marker', markerShape: 'InvertedTriangle' })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '95%', marginLeft: "-10px" } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { fontSize: '14px' } }, " Axis ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "axis", width: "100%", index: 0, change: typeChange.bind(_this), ref: axisRef, dataSource: dropList, fields: { text: 'text', value: 'value' } })))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { fontSize: '14px' } }, " Direction ")),
                                    React.createElement("td", { style: { width: '50% ' } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "axisdirection", width: "100%", index: 0, change: directionChange.bind(_this), ref: directionRef, dataSource: dropDirectionList, fields: { text: 'text', value: 'value' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { fontSize: '14px' } }, "Start Angle ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "startAngle", onChange: startAngle.bind(_this), ref: start, defaultValue: "220", min: "0", max: "360" }))),
                                    React.createElement("td", { style: { width: "10%" } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'start' }, startValue)))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { fontSize: '14px' } }, "End Angle ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "endAngle", onChange: endAngle.bind(_this), ref: end, defaultValue: "140", min: "0", max: "360" }))),
                                    React.createElement("td", { style: { width: "10%" } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'end' }, endValue)))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample illustrates the multiple axes in the circular gauge as well as the options for changing the direction, start, and end angle of an axis.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, you can see how to render and configure multiple axes in the circular gauge. To render multiple axes in the circular gauge, use the axes collection, and each axis can be customized with pointers and ticks."),
            React.createElement("p", null,
                "More information on the multiple axes can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/#multiple-axes" }, "documentation section"),
                "."))));
};
exports.default = Axes;
