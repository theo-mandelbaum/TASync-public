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
exports.Axes = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Axes = /** @class */ (function (_super) {
    __extends(Axes, _super);
    function Axes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.axisIndex = 0;
        _this.loaded = false;
        return _this;
    }
    Axes.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Axes.prototype.onChartLoad = function (args) {
        var _this = this;
        var id = args.gauge.element.id;
        document.getElementById(id).setAttribute('title', '');
        if (!this.loaded) {
            this.loaded = true;
            this.axis = new ej2_dropdowns_1.DropDownList({
                index: 0, width: '127%',
                change: function () {
                    _this.axisIndex = +_this.axis.value;
                    _this.direction.value = _this.gauge.axes[_this.axisIndex].direction;
                    var startAngle = _this.gauge.axes[_this.axisIndex].startAngle;
                    var endAngle = _this.gauge.axes[_this.axisIndex].endAngle;
                    document.getElementById('start').innerHTML = String(startAngle);
                    document.getElementById('end').innerHTML = String(endAngle);
                    _this.start.value = startAngle.toString();
                    _this.end.value = endAngle.toString();
                }
            });
            this.axis.appendTo('#axisIndex');
            this.direction = new ej2_dropdowns_1.DropDownList({
                index: 0, width: '127%',
                change: function () {
                    _this.gauge.axes[_this.axisIndex].direction = _this.direction.value == 'ClockWise' ? 'ClockWise' : 'AntiClockWise';
                    _this.gauge.axes[0].pointers[0].animation.enable = false;
                    _this.gauge.axes[1].pointers[0].animation.enable = false;
                    _this.gauge.refresh();
                }
            });
            this.direction.appendTo('#axisDirection');
        }
    };
    ;
    Axes.prototype.startAngle = function () {
        var value = +this.start.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].startAngle = value;
        document.getElementById('start').innerHTML = String(value);
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            (0, ej2_react_circulargauge_1.isCompleteAngle)(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    };
    Axes.prototype.endAngle = function () {
        var value = +this.end.value;
        this.gauge.axes[0].pointers[0].animation.enable = false;
        this.gauge.axes[1].pointers[0].animation.enable = false;
        this.gauge.axes[this.axisIndex].endAngle = value;
        document.getElementById('end').innerHTML = String(value);
        this.gauge.axes[this.axisIndex].labelStyle.hiddenLabel =
            (0, ej2_react_circulargauge_1.isCompleteAngle)(this.gauge.axes[this.axisIndex].startAngle, this.gauge.axes[this.axisIndex].endAngle) ?
                'First' : 'None';
        this.gauge.refresh();
    };
    Axes.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'range-container', background: 'transparent', ref: function (gauge) { return _this.gauge = gauge; }, loaded: this.onChartLoad.bind(this) },
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { lineStyle: { width: 1.5 }, radius: '95%', direction: 'ClockWise', startAngle: 220, endAngle: 140, minimum: 0, maximum: 160, majorTicks: {
                                        position: 'Inside',
                                        width: 2, height: 10
                                    }, minorTicks: {
                                        position: 'Inside', width: 2,
                                        height: 5
                                    }, labelStyle: {
                                        position: 'Inside', autoAngle: true,
                                        font: {
                                            fontFamily: 'inherit'
                                        }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 80, radius: '100%', markerHeight: 15, markerWidth: 15, type: 'Marker', markerShape: 'Triangle' }))),
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { lineStyle: { width: 1.5, color: ' #E84011' }, radius: '95%', direction: 'ClockWise', startAngle: 220, endAngle: 140, minimum: 0, maximum: 240, majorTicks: {
                                        position: 'Outside', width: 2, height: 10,
                                        color: '#E84011'
                                    }, minorTicks: {
                                        position: 'Outside', width: 2,
                                        height: 5, color: '#E84011'
                                    }, labelStyle: {
                                        position: 'Outside', autoAngle: true, offset: 5,
                                        font: { fontFamily: 'inherit' }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 120, radius: '100%', color: '#E84011', markerHeight: 15, markerWidth: 15, type: 'Marker', markerShape: 'InvertedTriangle' })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: "-10px" } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { fontSize: '14px' } }, " Axis ")),
                                        React.createElement("td", { style: { width: '40% ' } },
                                            React.createElement("div", null,
                                                React.createElement("select", { id: "axisIndex", className: "form-control", style: { width: "90%" } },
                                                    React.createElement("option", { value: "0" }, "Axis 1"),
                                                    React.createElement("option", { value: "1" }, "Axis 2"))))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { fontSize: '14px' } }, " Direction ")),
                                        React.createElement("td", { style: { width: '40% ' } },
                                            React.createElement("div", null,
                                                React.createElement("select", { id: "axisDirection", className: "form-control", style: { width: "90%" } },
                                                    React.createElement("option", { value: "ClockWise" }, "Clockwise"),
                                                    React.createElement("option", { value: "AntiClockWise" }, "Anti-clockwise"))))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { fontSize: '14px' } }, "Start Angle ")),
                                        React.createElement("td", { style: { width: '40% ' } },
                                            React.createElement("div", null,
                                                React.createElement("input", { type: "range", id: "startAngle", onChange: this.startAngle.bind(this), ref: function (d) { return _this.start = d; }, defaultValue: "220", min: "0", max: "360", style: { width: "90%" } }))),
                                        React.createElement("td", { style: { width: "10%" } },
                                            React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' } },
                                                React.createElement("span", { id: 'start' }, "220")))),
                                    React.createElement("tr", { style: { height: '50px' } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { fontSize: '14px' } }, "End Angle ")),
                                        React.createElement("td", { style: { width: '40% ' } },
                                            React.createElement("div", null,
                                                React.createElement("input", { type: "range", id: "endAngle", onChange: this.endAngle.bind(this), ref: function (d) { return _this.end = d; }, defaultValue: "140", min: "0", max: "360", style: { width: "90%" } }))),
                                        React.createElement("td", { style: { width: "10%" } },
                                            React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' } },
                                                React.createElement("span", { id: 'end' }, "140")))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample illustrates the multiple axes in the circular gauge as well as the options for changing the direction, start, and end angle of an axis.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure multiple axes in the circular gauge. To render multiple axes in the circular gauge, use the axes collection, and each axis can be customized with pointers and ticks."),
                React.createElement("p", null,
                    "More information on the multiple axes can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/#multiple-axes" }, "documentation section"),
                    "."))));
    };
    return Axes;
}(sample_base_1.SampleBase));
exports.Axes = Axes;
