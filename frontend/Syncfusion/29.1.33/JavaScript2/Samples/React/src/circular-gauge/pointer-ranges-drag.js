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
exports.Drag = void 0;
var React = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .pointerDragCheckBox {\n        padding-left: 10px;\n        margin-left: -4px;\n        padding-top: 0px;\n    }\n    .e-view.fluent2 #property .pointerDragCheckBox, .e-view.fluent2-dark #property .pointerDragCheckBox {\n        padding-left: 0px;\n        margin-left: -4px !important;\n        padding-top: 0px;\n    }\n    .e-view.fluent2-highcontrast #property .pointerDragCheckBox {\n        margin-left: -12px !important;\n    }\n    ";
var Drag = /** @class */ (function (_super) {
    __extends(Drag, _super);
    function Drag() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';
        return _this;
    }
    Drag.prototype.onChartLoad = function (args) {
        document.getElementById('drag-container').setAttribute('title', '');
    };
    ;
    Drag.prototype.dragMove = function (args) {
        if (args.type.indexOf('pointer') > -1) {
            document.getElementById('pointerValue').innerHTML = String(Math.round(args.currentValue));
            this.drag.value = Math.round(args.currentValue).toString();
            this.gauge.setAnnotationValue(0, 0, this.content + Math.round(args.currentValue) + ' MPH</span></div > ');
        }
    };
    ;
    Drag.prototype.dragEnd = function (args) {
        if (isNaN(args.rangeIndex)) {
            this.setPointersValue(this.gauge, Math.round(args.currentValue));
        }
    };
    ;
    Drag.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Drag.prototype.dragChange = function () {
        var pointerValue = +this.drag.value;
        document.getElementById('pointerValue').innerHTML = String(Math.round(pointerValue));
        this.setPointersValue(this.gauge, pointerValue);
    };
    Drag.prototype.pointerDragChange = function () {
        var value = this.pointerDrag.checked;
        this.gauge.enablePointerDrag = value;
    };
    Drag.prototype.rangesDragChange = function () {
        var value = this.rangesDrag.checked;
        this.gauge.enableRangeDrag = value;
    };
    Drag.prototype.setPointersValue = function (circulargauge, pointerValue) {
        var color;
        if (pointerValue >= 0 && pointerValue <= 40) {
            color = '#30B32D';
        }
        else if (pointerValue >= 40 && pointerValue <= 100) {
            color = '#E5C31C';
        }
        else {
            color = '#F03E3E';
        }
        circulargauge.axes[0].pointers[0].color = color;
        circulargauge.axes[0].pointers[1].color = color;
        circulargauge.axes[0].pointers[0].animation.enable = false;
        circulargauge.axes[0].pointers[1].animation.enable = false;
        circulargauge.axes[0].pointers[0].needleTail.color = color;
        circulargauge.axes[0].pointers[1].needleTail.color = color;
        circulargauge.axes[0].pointers[0].cap.border.color = color;
        circulargauge.axes[0].pointers[1].cap.border.color = color;
        circulargauge.setPointerValue(0, 1, pointerValue);
        circulargauge.setPointerValue(0, 0, pointerValue);
        this.content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, this.content + pointerValue + ' MPH</span></div>');
    };
    Drag.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-8' },
                        React.createElement("style", null, SAMPLE_CSS),
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), loaded: this.onChartLoad.bind(this), background: 'transparent', dragMove: this.dragMove.bind(this), dragEnd: this.dragEnd.bind(this), id: 'drag-container', ref: function (gauge) { return _this.gauge = gauge; }, enablePointerDrag: true, enableRangeDrag: false },
                            React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 220, endAngle: 140, radius: '80%', minimum: 0, maximum: 120, majorTicks: {
                                        useRangeColor: true
                                    }, lineStyle: { width: 0 }, minorTicks: {
                                        useRangeColor: true
                                    }, labelStyle: {
                                        useRangeColor: true,
                                        font: {
                                            fontFamily: 'inherit'
                                        }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;margin-left:-20px;"><span>70 MPH</span></div>', angle: 180, radius: '45%', zIndex: '1' })),
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', markerWidth: 5, cap: {
                                                radius: 10, border: { width: 5, color: '#E5C31C' }
                                            }, needleTail: {
                                                length: '0%', color: '#E5C31C'
                                            }, color: '#E5C31C' }),
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Marker pointer value : 70', value: 70, radius: '110%', color: '#E5C31C', markerWidth: 20, markerHeight: 20, type: 'Marker', markerShape: 'InvertedTriangle' })),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { description: 'Needle pointer value : 70', value: 70, type: "Marker", markerShape: 'InvertedTriangle', radius: '110%', markerHeight: 20, color: '#E5C31C', markerWidth: 20 }),
                                    React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 40, radius: '108%', color: '#30B32D', startWidth: 8, endWidth: 8 }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 40, end: 100, radius: '108%', color: '#E5C31C', startWidth: 8, endWidth: 8 }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 100, end: 120, radius: '108%', color: '#F03E3E', startWidth: 8, endWidth: 8 })))))),
                    React.createElement("div", { className: 'col-lg-4 property-section' },
                        React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                            React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '100%', marginLeft: "-10px" } },
                                React.createElement("tbody", null,
                                    React.createElement("tr", { style: { height: "50px" } },
                                        React.createElement("td", { style: { width: "50%" } },
                                            React.createElement("div", { style: { width: "110%", fontSize: "14px" } }, "Pointer Value ")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", { style: { marginLeft: '5px' } },
                                                React.createElement("input", { type: "range", id: "value", onChange: this.dragChange.bind(this), ref: function (d) { return _this.drag = d; }, defaultValue: "70", min: "0", max: "120", style: { width: "100%", paddingLeft: '0px' } }))),
                                        React.createElement("td", { style: { width: '10%' } },
                                            React.createElement("div", { style: { textAlign: 'center' } },
                                                React.createElement("span", { id: 'pointerValue', style: { fontSize: "14px" } }, "70")))),
                                    React.createElement("tr", { style: { height: "50px" } },
                                        React.createElement("td", { style: { width: "20%" } },
                                            React.createElement("div", { id: 'enablePointer', style: { width: "90%", fontSize: "14px" } }, "Allow Pointer Drag")),
                                        React.createElement("td", { style: { width: "49%" } },
                                            React.createElement("div", { className: 'pointerDragCheckBox' },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'enable', checked: true, change: this.pointerDragChange.bind(this), ref: function (d) { return _this.pointerDrag = d; } })))),
                                    React.createElement("tr", { style: { height: "50px" } },
                                        React.createElement("td", { style: { width: "20%" } },
                                            React.createElement("div", { id: 'enablePointer', style: { width: "90%", fontSize: "14px" } }, "Allow Ranges Drag")),
                                        React.createElement("td", { style: { width: "40%" } },
                                            React.createElement("div", { className: 'pointerDragCheckBox' },
                                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'rangeDragEnable', checked: false, change: this.rangesDragChange.bind(this), ref: function (d) { return _this.rangesDrag = d; } })))))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample illustrates dragging a pointer and a range in a circular gauge. End-user can drag the pointer and the range by enabling the pointer drag and range drag options.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to move the pointer and range in the circular gauge via drag action. The ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#enablepointerdrag' }, "enablePointerDrag"),
                    " property can be used to enable or disable the pointer drag functionality. Similarly, the ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/#enablerangedrag' }, "enableRangeDrag"),
                    " property can be used to enable or disable the range drag functionality."),
                React.createElement("p", null,
                    "More information on the pointer drag can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-pointers/#dragging-pointer" }, "documentation section"),
                    ". Likewise, the range drag information can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-ranges/#dragging-range" }, "documentation section"),
                    "."))));
    };
    return Drag;
}(sample_base_1.SampleBase));
exports.Drag = Drag;
