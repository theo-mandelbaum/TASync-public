"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .angleCheckBox {\n        padding-top: 0px !important;\n        padding-left: 0px !important;\n        margin-left: 0px\n    }\n    .e-view.fluent2 #property .angleCheckBox, .e-view.fluent2-dark #property .angleCheckBox {\n        padding-top: 0px; padding-left: 0px; margin-left: -8px\n    }\n    .e-view.fluent2-highcontrast #property .angleCheckBox {\n        margin-left: -8px !important;\n    }\n    ";
var SemiGauge = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('50%'), xValue = _a[0], setXValue = _a[1];
    var _b = (0, react_1.useState)('50%'), yValue = _b[0], setYValue = _b[1];
    var _c = (0, react_1.useState)('270°'), rangestart = _c[0], setRangeStart = _c[1];
    var _d = (0, react_1.useState)('90°'), rangeEnd = _d[0], setRangeEnd = _d[1];
    var _e = (0, react_1.useState)('100%'), radius1 = _e[0], setRadius = _e[1];
    var _f = (0, react_1.useState)('50%'), xCenter = _f[0], setXCenter = _f[1];
    var _g = (0, react_1.useState)('50%'), yCenter = _g[0], setYCenter = _g[1];
    var _h = (0, react_1.useState)(false), isMoveToCenter = _h[0], setIsMoveToCenter = _h[1];
    var _j = (0, react_1.useState)(false), disabled = _j[0], setDisabled = _j[1];
    var gauge = (0, react_1.useRef)(null);
    var startElement = (0, react_1.useRef)(null);
    var endElement = (0, react_1.useRef)(null);
    var xElement = (0, react_1.useRef)(null);
    var yElement = (0, react_1.useRef)(null);
    var radiusElement = (0, react_1.useRef)(null);
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var angleChange = function (e) {
        if (e.checked) {
            gauge.current.centerX = null;
            gauge.current.centerY = null;
            gauge.current.moveToCenter = true;
            setDisabled(true);
        }
        else {
            gauge.current.centerX = xElement.current.value + '%';
            gauge.current.centerY = yElement.current.value + '%';
            setDisabled(false);
            gauge.current.moveToCenter = false;
        }
        gauge.current.refresh();
    };
    var start = function () {
        var min = +startElement.current.value;
        setRangeStart(min + '°');
        gauge.current.axes[0].startAngle = min;
        gauge.current.refresh();
    };
    var end = function () {
        var max = +endElement.current.value;
        setRangeEnd(max + '°');
        gauge.current.axes[0].endAngle = max;
        gauge.current.refresh();
    };
    var radius = function () {
        var radius = +radiusElement.current.value;
        setRadius(radius + '%');
        gauge.current.axes[0].radius = '' + radius + '%';
        gauge.current.refresh();
    };
    var centerX = function () {
        var max = +xElement.current.value;
        setXCenter(max + '%');
        gauge.current.centerX = '' + max + '%';
        gauge.current.refresh();
    };
    var centerY = function () {
        var max = +yElement.current.value;
        setYCenter(max + '%');
        gauge.current.centerY = '' + max + '%';
        gauge.current.refresh();
    };
    var hideLabel = function (args) {
        gauge.current.axes[0].hideIntersectingLabel = args.checked;
        gauge.current.refresh();
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'col-lg-8 control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { centerX: xValue, centerY: yValue, moveToCenter: isMoveToCenter, background: 'transparent', load: load.bind(_this), ref: gauge, id: 'gauge' },
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '100%', startAngle: 270, endAngle: 90, minimum: 0, maximum: 100, hideIntersectingLabel: true, lineStyle: { width: 3 }, labelStyle: { font: { fontWeight: 'normal', fontFamily: 'inherit' }, format: "{value}%", position: 'Outside', autoAngle: true }, majorTicks: { position: 'Inside', width: 2, height: 15, interval: 10 }, minorTicks: { position: 'Inside', width: 1, height: 8, interval: 2 } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: false }, value: 30, radius: '75%', pointerWidth: 7, cap: { radius: 8, border: { width: 0 } }, needleTail: { length: '13%' } })))))),
            React.createElement("div", { className: 'col-lg-4 property-section' },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', overflow: 'hidden' } },
                        React.createElement("tbody", null,
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Start Angle ")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "start", defaultValue: "270", min: "0", max: "360", style: { width: '85%' }, onChange: start.bind(_this), ref: startElement }))),
                                React.createElement("td", { style: { width: '10%' } },
                                    React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                        React.createElement("span", { id: 'rangeStart' }, rangestart)))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "End Angle ")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "end", defaultValue: "90", min: "0", max: "360", style: { width: '85%' }, onChange: end.bind(_this), ref: endElement }))),
                                React.createElement("td", { style: { width: '10%' } },
                                    React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                        React.createElement("span", { id: 'rangeEnd' }, rangeEnd)))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Radius ")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "radius", defaultValue: "100", min: "30", max: "100", style: { width: '85%' }, onChange: radius.bind(_this), ref: radiusElement }))),
                                React.createElement("td", { style: { width: '10%' } },
                                    React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                        React.createElement("span", { id: 'radius1' }, radius1)))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Radius based on angle")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", { className: "angleCheckBox" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'angle', change: angleChange.bind(_this), style: { paddingLeft: '0px' } })))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Center X ")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "centerX", defaultValue: "50", min: "0", max: "100", style: { width: '85%' }, onChange: centerX.bind(_this), ref: xElement, disabled: disabled }))),
                                React.createElement("td", { style: { width: '10%' } },
                                    React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                        React.createElement("span", { id: 'center1' }, xCenter)))),
                            React.createElement("tr", { style: { height: '50px' } },
                                React.createElement("td", null,
                                    React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Center Y ")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", null,
                                        React.createElement("input", { type: "range", id: "centerY", defaultValue: "50", min: "0", max: "100", style: { width: '85%' }, onChange: centerY.bind(_this), ref: yElement, disabled: disabled }))),
                                React.createElement("td", { style: { width: '10%' } },
                                    React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                        React.createElement("span", { id: 'center2' }, yCenter)))),
                            React.createElement("tr", null,
                                React.createElement("td", null,
                                    React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Hide Intersecting Labels")),
                                React.createElement("td", { style: { width: '40% ' } },
                                    React.createElement("div", { className: "angleCheckBox" },
                                        React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'hidelabel', checked: true, change: hideLabel.bind(_this), style: { paddingLeft: '0px' } }))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample shows how to create semi-circular or quarter-circular gauges by modifying a circular gauge with different start and end angles.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null, "In this example, a circular gauge is rendered with different start and end angles to create semi-circular or quarter-circular gauges. The radius, start angle, end angle, and center position of the circular gauge can all be customized using the options in the properties panel."),
            React.createElement("p", null,
                "More information on the semi-circular or quarter-circular gauges can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-appearance/#radius-calculation-based-on-angles" }, "documentation section "),
                "."))));
};
exports.default = SemiGauge;
