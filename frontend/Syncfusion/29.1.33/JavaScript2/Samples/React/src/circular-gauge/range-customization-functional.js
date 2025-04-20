"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .property-panel-table td {\n        width: inherit;\n    }\n    ";
var Range = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("0"), startMin = _a[0], setStartMin = _a[1];
    var _b = (0, react_1.useState)("40"), startMax = _b[0], setStartMax = _b[1];
    var _c = (0, react_1.useState)("0"), endMin = _c[0], setEndMin = _c[1];
    var _d = (0, react_1.useState)("40"), endMax = _d[0], setEndMax = _d[1];
    var _e = (0, react_1.useState)("10"), rangeEndWidth = _e[0], setRangeEndWidth = _e[1];
    var _f = (0, react_1.useState)("10"), rangeStartWidth = _f[0], setRangeStartWidth = _f[1];
    var _g = (0, react_1.useState)("0"), startValue = _g[0], setStartValue = _g[1];
    var _h = (0, react_1.useState)("40"), endValue = _h[0], setEndValue = _h[1];
    var _j = (0, react_1.useState)("0"), radiusValue = _j[0], setRadiusValue = _j[1];
    var gauge = (0, react_1.useRef)(null);
    var startWidthElement = (0, react_1.useRef)(null);
    var endWidthElement = (0, react_1.useRef)(null);
    var radiusElement = (0, react_1.useRef)(null);
    var rangeSelectRef = (0, react_1.useRef)(null);
    var startElementOne = (0, react_1.useRef)(null);
    var endElementOne = (0, react_1.useRef)(null);
    var selectedRange;
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var rangeSelectList = [
        { text: 'Low', value: 'Low' },
        { text: 'Medium', value: 'Medium' },
        { text: 'High', value: 'High' },
    ];
    var rangeSelectChange = function () {
        var index = rangeSelectRef.current.index;
        selectedRange = rangeSelectRef.current.value.toString();
        if (selectedRange == 'Low') {
            setStartMin('0');
            setStartMax('40');
            setEndMin('0');
            setEndMax('40');
        }
        else if (selectedRange == 'Medium') {
            setStartMin('40');
            setStartMax('80');
            setEndMin('40');
            setEndMax('80');
        }
        else {
            setStartMin('80');
            setStartMax('120');
            setEndMin('80');
            setEndMax('120');
        }
        setRangeEndWidth(String(gauge.current.axes[0].ranges[index].endWidth));
        setRangeStartWidth(String(gauge.current.axes[0].ranges[index].startWidth));
        setStartValue(gauge.current.axes[0].ranges[index].start.toString());
        setEndValue(gauge.current.axes[0].ranges[index].end.toString());
        setRadiusValue(gauge.current.axes[0].ranges[index].roundedCornerRadius.toString());
    };
    var start = function () {
        var index = rangeSelectRef.current.index;
        var min = parseInt(startElementOne.current.value);
        setStartValue(min.toString());
        gauge.current.axes[0].ranges[index].start = min;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };
    var end = function () {
        var index = rangeSelectRef.current.index;
        var max = parseInt(endElementOne.current.value);
        setEndValue(String(max));
        gauge.current.axes[0].ranges[index].end = max;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };
    var startWidth = function () {
        var index = rangeSelectRef.current.index;
        var startWidth = parseFloat(startWidthElement.current.value);
        setRangeStartWidth(String(startWidth));
        gauge.current.axes[0].ranges[index].startWidth = startWidth;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };
    var endWidth = function () {
        var index = rangeSelectRef.current.index;
        var endWidth = parseFloat(endWidthElement.current.value.toString());
        setRangeEndWidth(String(endWidth));
        gauge.current.axes[0].ranges[index].endWidth = endWidth;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };
    var radius = function () {
        var index = rangeSelectRef.current.index;
        var radius = parseFloat(radiusElement.current.value.toString());
        setRadiusValue(String(radius));
        gauge.current.axes[0].ranges[index].roundedCornerRadius = radius;
        gauge.current.axes[0].pointers[0].animation.enable = false;
        gauge.current.refresh();
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), id: 'range-container', background: 'transparent', ref: gauge },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, radius: '80%', endAngle: 150, minimum: 0, maximum: 120, majorTicks: { height: 10, offset: 5 }, lineStyle: { width: 10, color: 'transparent' }, minorTicks: { height: 0, width: 0 }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 65, radius: '60%', pointerWidth: 8, needleTail: { length: '18%' }, cap: { radius: 7 }, animation: { enable: true } })),
                                React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 40, color: '#30B32D', startWidth: 10, endWidth: 10, roundedCornerRadius: 0 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 80, color: '#FFDD00', startWidth: 10, endWidth: 10, roundedCornerRadius: 0 }),
                                    React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 80, end: 120, color: '#F03E3E', startWidth: 10, endWidth: 10, roundedCornerRadius: 0 })),
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div><span class="templateText" style="font-size:14px;">Speedometer</span></div>', angle: 0, zIndex: '1', radius: '30%' }),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div><span class="templateText" style="font-size:20px;">65 MPH</span></div>', angle: 180, zIndex: '1', radius: '40%' })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '90%' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: '30%' } },
                                        React.createElement("div", { style: { marginLeft: '-10px', fontSize: "14px", marginTop: "-8px" } }, " Select Range ")),
                                    React.createElement("td", { style: { width: '41%' } },
                                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "rangeSelect", width: "100%", index: 0, change: rangeSelectChange.bind(_this), ref: rangeSelectRef, dataSource: rangeSelectList, fields: { text: 'text', value: 'value' } }))))),
                        React.createElement("table", { id: 'property1', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '90%' } },
                            React.createElement("colgroup", null,
                                React.createElement("col", { span: 1, style: { width: "35%" } }),
                                React.createElement("col", { span: 1, style: { width: "45%" } }),
                                React.createElement("col", { span: 1, style: { width: "20%" } })),
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", { style: { width: "38%" } },
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Range Start ")),
                                    React.createElement("td", { style: { width: '52%' } },
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                            React.createElement("input", { type: "range", id: "startone", min: startMin, max: startMax, value: startValue, style: { width: '90%' }, onChange: start.bind(_this), ref: startElementOne }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'rangeStart', style: { fontSize: "14px" } }, startValue)))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Range End ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { style: { marginLeft: "10px", marginTop: "-10px" } },
                                            React.createElement("input", { type: "range", id: "endone", min: endMin, max: endMax, value: endValue, style: { width: '90%' }, onChange: end.bind(_this), ref: endElementOne }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'rangeEnd', style: { fontSize: "14px" } }, endValue)))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Start Width ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                            React.createElement("input", { type: "range", id: "startWidth", value: rangeStartWidth, min: "0", max: "30", style: { width: '90%' }, onChange: startWidth.bind(_this), ref: startWidthElement }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'rangeStartWidth', style: { fontSize: "14px" } }, rangeStartWidth)))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "End Width ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                            React.createElement("input", { type: "range", id: "endWidth", value: rangeEndWidth, min: "0", max: "30", style: { width: '90%' }, onChange: endWidth.bind(_this), ref: endWidthElement }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'rangeEndWidth', style: { fontSize: "14px" } }, rangeEndWidth)))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Corner Radius ")),
                                    React.createElement("td", { style: { width: '40%' } },
                                        React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                            React.createElement("input", { type: "range", id: "radius", value: radiusValue, min: "0", max: "12", step: "1", style: { width: '90%' }, onChange: radius.bind(_this), ref: radiusElement }))),
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'roundedRadius', style: { fontSize: "14px" } }, radiusValue)))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample demonstrates how to highlight a region in an axis using ranges in the circular gauge. The width, corner radius, and start and end range of a range can all be customized.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the ranges in the circular gauge. Ranges are used to group the axis values, and you can use ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#start" }, "start"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#end" }, "end"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#color" }, "color"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#startwidth" }, "startWidth"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#endwidth" }, "endWidth"),
                ", ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#radius" }, "radius"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/circular-gauge/rangeModel/#roundedcornerradius" }, "roundedCornerRadius"),
                " properties to customize them. In addition, an axis with multiple ranges is shown in the circular gauge component, as well as options to customize the range properties via the property panel."),
            React.createElement("p", null,
                "More information on the ranges can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/" }, "documentation section"),
                "."))));
};
exports.default = Range;
