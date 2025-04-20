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
exports.SemiGauge = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .angleCheckBox {\n        padding-top: 0px !important;\n        padding-left: 0px !important;\n        margin-left: 0px\n    }\n    .e-view.fluent2 #property .angleCheckBox, .e-view.fluent2-dark #property .angleCheckBox {\n        padding-top: 0px; padding-left: 0px; margin-left: -8px\n    }\n    .e-view.fluent2-highcontrast #property .angleCheckBox {\n        margin-left: -8px !important;\n    }\n    ";
var SemiGauge = /** @class */ (function (_super) {
    __extends(SemiGauge, _super);
    function SemiGauge() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SemiGauge.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    SemiGauge.prototype.angleChange = function (e) {
        var centerX = document.getElementById('centerX');
        var centerY = document.getElementById('centerY');
        if (e.checked) {
            this.gauge.centerX = null;
            this.gauge.centerY = null;
            this.gauge.moveToCenter = true;
            centerX.disabled = true;
            centerY.disabled = true;
        }
        else {
            this.gauge.centerX = centerX.value + '%';
            this.gauge.centerY = centerY.value + '%';
            centerX.disabled = false;
            centerY.disabled = false;
            this.gauge.moveToCenter = false;
        }
        this.gauge.refresh();
    };
    SemiGauge.prototype.start = function () {
        var min = +this.startElement.value;
        document.getElementById('rangeStart').innerHTML = min + '°';
        this.gauge.axes[0].startAngle = min;
        this.gauge.refresh();
    };
    SemiGauge.prototype.end = function () {
        var max = +this.endElement.value;
        document.getElementById('rangeEnd').innerHTML = max + '°';
        this.gauge.axes[0].endAngle = max;
        this.gauge.refresh();
    };
    SemiGauge.prototype.radius = function () {
        var radius = +this.radiusElement.value;
        document.getElementById('radius1').innerHTML = radius + '%';
        this.gauge.axes[0].radius = '' + radius + '%';
        this.gauge.refresh();
    };
    SemiGauge.prototype.centerX = function () {
        var max = +this.xElement.value;
        document.getElementById('center1').innerHTML = max + '%';
        this.gauge.centerX = '' + max + '%';
        this.gauge.refresh();
    };
    SemiGauge.prototype.centerY = function () {
        var max = +this.yElement.value;
        document.getElementById('center2').innerHTML = max + '%';
        this.gauge.centerY = '' + max + '%';
        this.gauge.refresh();
    };
    SemiGauge.prototype.hideLabel = function () {
        var labelIntersect = document.getElementById('hidelabel').checked;
        this.gauge.axes[0].hideIntersectingLabel = labelIntersect;
        this.gauge.refresh();
    };
    SemiGauge.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'col-lg-8 control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { centerX: '50%', centerY: '50%', moveToCenter: false, background: 'transparent', load: this.load.bind(this), ref: function (gauge) { return _this.gauge = gauge; }, id: 'gauge' },
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '100%', startAngle: 270, endAngle: 90, minimum: 0, maximum: 100, hideIntersectingLabel: true, lineStyle: { width: 3 }, labelStyle: {
                                    font: {
                                        fontWeight: 'normal',
                                        fontFamily: 'inherit'
                                    },
                                    format: "{value}%",
                                    position: 'Outside',
                                    autoAngle: true
                                }, majorTicks: { position: 'Inside', width: 2, height: 15, interval: 10 }, minorTicks: { position: 'Inside', width: 1, height: 8, interval: 2 } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { animation: { enable: false }, value: 30, radius: '75%', pointerWidth: 7, cap: {
                                            radius: 8,
                                            border: { width: 0 }
                                        }, needleTail: {
                                            length: '13%'
                                        } })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', overflow: 'hidden' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Start Angle ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "start", defaultValue: "270", min: "0", max: "360", style: { width: '85%' }, onChange: this.start.bind(this), ref: function (d) { return _this.startElement = d; } }))),
                                    React.createElement("td", { style: { width: '10%' } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                            React.createElement("span", { id: 'rangeStart' }, "270\u00B0")))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "End Angle ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "end", defaultValue: "90", min: "0", max: "360", style: { width: '85%' }, onChange: this.end.bind(this), ref: function (d) { return _this.endElement = d; } }))),
                                    React.createElement("td", { style: { width: '10%' } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                            React.createElement("span", { id: 'rangeEnd' }, "90\u00B0")))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Radius ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "radius", defaultValue: "100", min: "30", max: "100", style: { width: '85%' }, onChange: this.radius.bind(this), ref: function (d) { return _this.radiusElement = d; } }))),
                                    React.createElement("td", { style: { width: '10%' } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                            React.createElement("span", { id: 'radius1' }, "100%")))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Radius based on angle")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", { className: "angleCheckBox" },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'angle', change: this.angleChange.bind(this), ref: function (d) { return _this.angleElement = d; }, style: { paddingLeft: '0px' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Center X ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "centerX", defaultValue: "50", min: "0", max: "100", style: { width: '85%' }, onChange: this.centerX.bind(this), ref: function (d) { return _this.xElement = d; } }))),
                                    React.createElement("td", { style: { width: '10%' } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                            React.createElement("span", { id: 'center1' }, "50%")))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { width: '110px', marginLeft: "-10px", fontSize: "14px" } }, "Center Y ")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", id: "centerY", defaultValue: "50", min: "0", max: "100", style: { width: '85%' }, onChange: this.centerY.bind(this), ref: function (d) { return _this.yElement = d; } }))),
                                    React.createElement("td", { style: { width: '10%' } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: "0px", marginLeft: '-10px', fontSize: "14px" } },
                                            React.createElement("span", { id: 'center2' }, "50%")))),
                                React.createElement("tr", null,
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Hide Intersecting Labels")),
                                    React.createElement("td", { style: { width: '40% ' } },
                                        React.createElement("div", { className: "angleCheckBox" },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'hidelabel', checked: true, change: this.hideLabel.bind(this), ref: function (d) { return _this.angleElement = d; }, style: { paddingLeft: '0px' } }))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample shows how to create semi-circular or quarter-circular gauges by modifying a circular gauge with different start and end angles.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, a circular gauge is rendered with different start and end angles to create semi-circular or quarter-circular gauges. The radius, start angle, end angle, and center position of the circular gauge can all be customized using the options in the properties panel."),
                React.createElement("p", null,
                    "More information on the semi-circular or quarter-circular gauges can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-appearance/#radius-calculation-based-on-angles" }, "documentation section "),
                    "."))));
    };
    return SemiGauge;
}(sample_base_1.SampleBase));
exports.SemiGauge = SemiGauge;
