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
exports.Labels = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_dropdowns_1 = require("@syncfusion/ej2-dropdowns");
var SAMPLE_CSS = "\n    .tailwind .labelCheckbox, .tailwind-dark .labelCheckbox{\n        margin-top: 2px;\n    }\n    .tickCheckbox {\n        margin-left: -10px !important;\n        padding-top: 0px !important;\n        padding-left: 10px;\n    }\n    .e-view.fluent2-highcontrast #property .tickCheckbox {\n        margin-left: -18px !important;\n    }\n    .e-view.fluent2 #property .tickCheckbox, .e-view.fluent2-dark #property .tickCheckbox {\n        padding-left: 0px;\n    }";
var Labels = /** @class */ (function (_super) {
    __extends(Labels, _super);
    function Labels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMajorTicks = true;
        _this.loaded = false;
        return _this;
    }
    Labels.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Labels.prototype.onChartLoad = function (args) {
        var _this = this;
        if (!this.loaded) {
            this.loaded = true;
            this.ticks = new ej2_dropdowns_1.DropDownList({
                index: 0, width: '125%',
                change: function () {
                    var value = _this.ticks.value.toString();
                    var tickProp;
                    _this.isMajorTicks = value === 'major';
                    if (_this.isMajorTicks) {
                        tickProp = _this.gauge.axes[0].majorTicks;
                    }
                    else {
                        tickProp = _this.gauge.axes[0].minorTicks;
                    }
                    _this.tickPosition.value = tickProp.position;
                    _this.tickOffset.value = tickProp.offset.toString();
                    _this.tickHeight.value = tickProp.height.toString();
                    document.getElementById('offset').innerHTML = String(tickProp.offset);
                    document.getElementById('height').innerHTML = String(tickProp.height);
                }
            });
            this.ticks.appendTo('#Ticks');
            this.tickPosition = new ej2_dropdowns_1.DropDownList({
                index: 0, width: '125%',
                change: function () {
                    var value = _this.tickPosition.value.toString();
                    if (_this.isMajorTicks) {
                        _this.gauge.axes[0].majorTicks.position = value;
                    }
                    else {
                        _this.gauge.axes[0].minorTicks.position = value;
                    }
                    _this.gauge.refresh();
                }
            });
            this.tickPosition.appendTo('#tickposition');
            this.labelPosition = new ej2_dropdowns_1.DropDownList({
                index: 0, width: '125%',
                change: function () {
                    var value = _this.labelPosition.value.toString();
                    _this.gauge.axes[0].labelStyle.position = value;
                    _this.gauge.refresh();
                }
            });
            this.labelPosition.appendTo('#labelposition');
        }
    };
    Labels.prototype.ticksOffset = function () {
        var value = +this.tickOffset.value;
        if (this.isMajorTicks) {
            this.gauge.axes[0].majorTicks.offset = value;
        }
        else {
            this.gauge.axes[0].minorTicks.offset = value;
        }
        document.getElementById('offset').innerHTML = String(value);
        this.gauge.refresh();
    };
    Labels.prototype.ticksHeight = function () {
        var value = +this.tickHeight.value;
        if (this.isMajorTicks) {
            this.gauge.axes[0].majorTicks.height = value;
        }
        else {
            this.gauge.axes[0].minorTicks.height = value;
        }
        document.getElementById('height').innerHTML = String(value);
        this.gauge.refresh();
    };
    Labels.prototype.labelsOffset = function () {
        var value = +this.labelOffset.value;
        this.gauge.axes[0].labelStyle.offset = value;
        document.getElementById('labelOffsetValue').innerHTML = String(value);
        this.gauge.refresh();
    };
    Labels.prototype.showLastLabel = function () {
        var showLastLabel = document.getElementById('enable');
        this.gauge.axes[0].showLastLabel = this.lastLabel.checked;
        this.gauge.refresh();
    };
    Labels.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), background: 'transparent', id: 'range-container', loaded: this.onChartLoad.bind(this), ref: function (gauge) { return _this.gauge = gauge; } },
                            React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 150, radius: '80%', minimum: 0, maximum: 170, showLastLabel: false, majorTicks: {
                                        position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20, offset: 0
                                    }, lineStyle: { width: 2, color: '#9E9E9E' }, minorTicks: {
                                        position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10, offset: 0
                                    }, labelStyle: {
                                        position: 'Outside', autoAngle: true, offset: 0,
                                        font: {
                                            fontFamily: 'inherit',
                                            size: '10px'
                                        }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="content" style="color:#518C03;font-size:20px;font-family:inherit;font-weight:semibold;margin-left:-12px;margin-top:-12px">145</div>', angle: 0, radius: '0%', zIndex: '1' })),
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 145, radius: '60%', color: '#8BC34A', pointerWidth: 7, animation: { enable: false }, type: "RangeBar", roundedCornerRadius: 10 })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', overflow: 'hidden' } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Ticks ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", null,
                                                React.createElement("select", { id: "Ticks", className: "form-control" },
                                                    React.createElement("option", { value: "major" }, " Major Ticks"),
                                                    React.createElement("option", { value: "minor" }, "Minor Ticks"))))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Tick Position ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", null,
                                                React.createElement("select", { id: "tickposition", className: "form-control" },
                                                    React.createElement("option", { value: "Inside" }, " Inside"),
                                                    React.createElement("option", { value: "Cross" }, "Cross"),
                                                    React.createElement("option", { value: "Outside" }, "Outside"))))),
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Label Position ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", null,
                                                React.createElement("select", { id: "labelposition", className: "form-control" },
                                                    React.createElement("option", { value: "Outside" }, " Outside"),
                                                    React.createElement("option", { value: "Cross" }, "Cross"),
                                                    React.createElement("option", { value: "Inside" }, "Inside"))))),
                                    React.createElement("tr", { style: { "height": "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Tick Offset ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", null,
                                                React.createElement("input", { type: "range", onChange: this.ticksOffset.bind(this), ref: function (d) { return _this.tickOffset = d; }, id: "tickOffset", defaultValue: "0", min: "0", max: "50", style: { width: '90%' } }))),
                                        React.createElement("td", { style: { width: "10%" } },
                                            React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' } },
                                                React.createElement("span", { id: 'offset' }, "0")))),
                                    React.createElement("tr", { style: { "height": "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Tick Height ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", null,
                                                React.createElement("input", { type: "range", onChange: this.ticksHeight.bind(this), ref: function (d) { return _this.tickHeight = d; }, id: "tickHeight", defaultValue: "10", min: "1", max: "50", style: { width: '90%' } }))),
                                        React.createElement("td", { style: { width: "10%" } },
                                            React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' } },
                                                React.createElement("span", { id: 'height' }, "10")))),
                                    React.createElement("tr", { style: { "height": "50px" } },
                                        React.createElement("td", null,
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Label Offset ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", null,
                                                React.createElement("input", { type: "range", onChange: this.labelsOffset.bind(this), ref: function (d) { return _this.labelOffset = d; }, id: "labelOffset", defaultValue: "0", min: "0", max: "50", style: { width: '90%' } }))),
                                        React.createElement("td", { style: { width: "10%" } },
                                            React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px', marginLeft: '-10px' } },
                                                React.createElement("span", { id: 'labelOffsetValue' }, "0")))),
                                    React.createElement("tr", { style: { "height": "50px" } },
                                        React.createElement("td", { style: { "width": "50%" } },
                                            React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Show Last Label ")),
                                        React.createElement("td", { style: { "width": "40%" } },
                                            React.createElement("div", { className: 'labelCheckbox tickCheckbox' },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: this.showLastLabel.bind(this), ref: function (d) { return _this.lastLabel = d; }, id: 'enable', disabled: false, style: { paddingLeft: "0px" } })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample demonstrates how to customize the ticks and labels on an axis. The position, offset, and height of the ticks and labels can be changed.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure the ticks and labels of an axis in the circular gauge. Labels are units that are used to display the values on the axis. Labels can be customized using ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/' }, "labelStyle"),
                    ". Ticks are used to represent values on the axis. Ticks can be customized using ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/' }, "majorTicks"),
                    " and ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/' }, "minorTicks"),
                    "."),
                React.createElement("p", null,
                    "More information on the ticks and labels can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/" }, "documentation section"),
                    "."))));
    };
    return Labels;
}(sample_base_1.SampleBase));
exports.Labels = Labels;
