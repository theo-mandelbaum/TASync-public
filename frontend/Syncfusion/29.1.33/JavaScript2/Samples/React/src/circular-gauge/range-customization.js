"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Range = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .property-panel-table td {\n        width: inherit;\n    }\n    ";
var Range = /** @class */ (function (_super) {
    __extends(Range, _super);
    function Range() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.loaded = false;
        _this.startRangeValue = "0";
        _this.endRangeValue = "40";
        _this.endMinimum = "0";
        _this.endMaximum = "40";
        return _this;
    }
    Range.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Range.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.listObj = new ej2_dropdowns_1.DropDownList({
                index: 0, width: '90%',
                change: function () {
                    var index = parseFloat(_this.listObj.value.toString());
                    _this.selectedRange = _this.listObj.text;
                    if (_this.selectedRange == "Low") {
                        document.getElementById('startone').min = "0";
                        document.getElementById('startone').max = "40";
                        document.getElementById('endone').min = "0";
                        document.getElementById('endone').max = "40";
                    }
                    else if (_this.selectedRange == "Medium") {
                        document.getElementById('startone').min = "40";
                        document.getElementById('startone').max = "80";
                        document.getElementById('endone').min = "40";
                        document.getElementById('endone').max = "80";
                    }
                    else {
                        document.getElementById('startone').min = "80";
                        document.getElementById('startone').max = "120";
                        document.getElementById('endone').min = "80";
                        document.getElementById('endone').max = "120";
                    }
                    _this.endWidthElement.value = _this.gauge.axes[0].ranges[index].endWidth.toString();
                    document.getElementById('rangeEndWidth').innerHTML = String(_this.gauge.axes[0].ranges[index].endWidth);
                    _this.startWidthElement.value = _this.gauge.axes[0].ranges[index].startWidth.toString();
                    document.getElementById('rangeStartWidth').innerHTML = String(_this.gauge.axes[0].ranges[index].startWidth);
                    document.getElementById('startone').value = _this.gauge.axes[0].ranges[index].start.toString();
                    document.getElementById('endone').value = _this.gauge.axes[0].ranges[index].end.toString();
                    document.getElementById('rangeEnd').innerHTML = _this.gauge.axes[0].ranges[index].end.toString();
                    document.getElementById('rangeStart').innerHTML = _this.gauge.axes[0].ranges[index].start.toString();
                    _this.radiusElement.value = _this.gauge.axes[0].ranges[index].roundedCornerRadius.toString();
                    document.getElementById('roundedRadius').innerHTML = String(_this.gauge.axes[0].ranges[index].roundedCornerRadius);
                }
            });
            this.listObj.appendTo('#rangeSelect');
        }
    };
    ;
    Range.prototype.start = function () {
        var index = parseFloat(this.listObj.value.toString());
        var min = parseInt(this.startElementOne.value);
        this.startElementOne.value = min.toString();
        document.getElementById('rangeStart').innerHTML = min.toString();
        this.gauge.axes[0].ranges[index].start = min;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.end = function () {
        var index = parseFloat(this.listObj.value.toString());
        var max = parseInt(this.endElementOne.value);
        document.getElementById('rangeEnd').innerHTML = String(max);
        this.gauge.axes[0].ranges[index].end = max;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.startWidth = function () {
        var index = parseFloat(this.listObj.value.toString());
        var startWidth = parseFloat(this.startWidthElement.value);
        document.getElementById('rangeStartWidth').innerHTML = String(startWidth);
        this.gauge.axes[0].ranges[index].startWidth = startWidth;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.endWidth = function () {
        var index = parseFloat(this.listObj.value.toString());
        var endWidth = parseFloat(this.endWidthElement.value.toString());
        document.getElementById('rangeEndWidth').innerHTML = String(endWidth);
        this.gauge.axes[0].ranges[index].endWidth = endWidth;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.radius = function () {
        var index = parseFloat(this.listObj.value.toString());
        var radius = parseFloat(this.radiusElement.value.toString());
        document.getElementById('roundedRadius').innerHTML = String(radius);
        this.gauge.axes[0].ranges[index].roundedCornerRadius = radius;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.refresh();
    };
    Range.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'range-container', background: 'transparent', ref: function (gauge) { return _this.gauge = gauge; }, loaded: this.onChartLoad.bind(this) },
                            React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, radius: '80%', endAngle: 150, minimum: 0, maximum: 120, majorTicks: {
                                        height: 10, offset: 5,
                                    }, lineStyle: { width: 10, color: 'transparent' }, minorTicks: {
                                        height: 0,
                                        width: 0
                                    }, labelStyle: {
                                        font: {
                                            fontFamily: 'inherit',
                                        }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 65, radius: '60%', pointerWidth: 8, needleTail: {
                                                length: '18%'
                                            }, cap: {
                                                radius: 7
                                            }, animation: { enable: true } })),
                                    React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 40, color: '#30B32D', startWidth: 10, endWidth: 10, roundedCornerRadius: 0 }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 80, color: '#FFDD00', startWidth: 10, endWidth: 10, roundedCornerRadius: 0 }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 80, end: 120, color: '#F03E3E', startWidth: 10, endWidth: 10, roundedCornerRadius: 0 })),
                                    React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div><span class="templateText" style="font-size:14px;">Speedometer</span></div>', angle: 0, zIndex: '1', radius: '30%' }),
                                        React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div><span class="templateText" style="font-size:20px;">65 MPH</span></div>', angle: 180, zIndex: '1', radius: '40%' })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", { style: { width: '30%' } },
                                            React.createElement("div", { style: { marginLeft: '-10px', fontSize: "14px", marginTop: "-8px" } }, " Select Range ")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("select", { id: "rangeSelect", className: "form-control" },
                                                React.createElement("option", { value: "0" }, "Low"),
                                                React.createElement("option", { value: "1" }, "Medium"),
                                                React.createElement("option", { value: "2" }, "High")))))),
                            React.createElement("table", { id: 'property1', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%' } },
                                React.createElement("colgroup", null,
                                    React.createElement("col", { span: 1, style: { width: "35%" } }),
                                    React.createElement("col", { span: 1, style: { width: "45%" } }),
                                    React.createElement("col", { span: 1, style: { width: "20%" } })),
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", { style: { width: "35%" } },
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Range Start ")),
                                        React.createElement("td", { style: { width: '46%' } },
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                                React.createElement("input", { type: "range", id: "startone", min: "0", max: "40", defaultValue: "0", style: { width: '90%' }, onChange: this.start.bind(this), ref: function (d) { return _this.startElementOne = d; } }))),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement("span", { id: 'rangeStart', style: { fontSize: "14px" } }, "0")))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Range End ")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginLeft: "10px", marginTop: "-10px" } },
                                                React.createElement("input", { type: "range", id: "endone", min: "0", max: "40", defaultValue: "40", style: { width: '100%' }, onChange: this.end.bind(this), ref: function (d) { return _this.endElementOne = d; } }))),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement("span", { id: 'rangeEnd', style: { fontSize: "14px" } }, "40")))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Start Width ")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                                React.createElement("input", { type: "range", id: "startWidth", defaultValue: "10", min: "0", max: "30", style: { width: '100%' }, onChange: this.startWidth.bind(this), ref: function (d) { return _this.startWidthElement = d; } }))),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement("span", { id: 'rangeStartWidth', style: { fontSize: "14px" } }, "10")))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "End Width ")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                                React.createElement("input", { type: "range", id: "endWidth", defaultValue: "10", min: "0", max: "30", style: { width: '100%' }, onChange: this.endWidth.bind(this), ref: function (d) { return _this.endWidthElement = d; } }))),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement("span", { id: 'rangeEndWidth', style: { fontSize: "14px" } }, "10")))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "-10px", fontSize: "14px" } }, "Corner Radius ")),
                                        React.createElement("td", { style: { width: '40%' } },
                                            React.createElement("div", { style: { marginTop: "-10px", marginLeft: "10px" } },
                                                React.createElement("input", { type: "range", id: "radius", defaultValue: "0", min: "0", max: "12", step: "1", style: { width: '100%' }, onChange: this.radius.bind(this), ref: function (d) { return _this.radiusElement = d; } }))),
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { textAlign: 'center', paddingTop: "0px", paddingLeft: '0px' } },
                                                React.createElement("span", { id: 'roundedRadius', style: { fontSize: "14px" } }, "0")))))))))),
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
    return Range;
}(sample_base_1.SampleBase));
exports.Range = Range;
