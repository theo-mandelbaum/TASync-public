"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .pointerDragCheckBox {\n        padding-left: 10px;\n        margin-left: -4px;\n        padding-top: 0px;\n    }\n    .e-view.fluent2 #property .pointerDragCheckBox, .e-view.fluent2-dark #property .pointerDragCheckBox {\n        padding-left: 0px;\n        margin-left: -4px !important;\n        padding-top: 0px;\n    }\n    .e-view.fluent2-highcontrast #property .pointerDragCheckBox {\n        margin-left: -12px !important;\n    }\n    ";
var Drag = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('70'), pointerValue = _a[0], setPointerValue = _a[1];
    var gauge = (0, react_1.useRef)(null);
    var drag = (0, react_1.useRef)(null);
    var pointerDrag = (0, react_1.useRef)(null);
    var rangesDrag = (0, react_1.useRef)(null);
    var content = '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;"><span>';
    var onChartLoad = function () {
        document.getElementById('drag-container').setAttribute('title', '');
    };
    var dragMove = function (args) {
        if (args.type.indexOf('pointer') > -1) {
            document.getElementById('pointerValue').innerHTML = String(Math.round(args.currentValue));
            drag.current.value = Math.round(args.currentValue).toString();
            gauge.current.setAnnotationValue(0, 0, content + Math.round(args.currentValue) + ' MPH</span></div > ');
        }
    };
    var dragEnd = function (args) {
        if (isNaN(args.rangeIndex)) {
            setPointersValue(gauge.current, Math.round(args.currentValue));
        }
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var dragChange = function () {
        var pointerValue = +drag.current.value;
        setPointerValue(String(Math.round(pointerValue)));
        setPointersValue(gauge.current, pointerValue);
    };
    var pointerDragChange = function () {
        var value = pointerDrag.current.checked;
        gauge.current.enablePointerDrag = value;
    };
    var rangesDragChange = function () {
        var value = rangesDrag.current.checked;
        gauge.current.enableRangeDrag = value;
    };
    var setPointersValue = function (circulargauge, pointerValue) {
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
        content = '<div style="font-size: 14px;color:' + color + ';font-weight: lighter;font-style: oblique;"><span>';
        circulargauge.setAnnotationValue(0, 0, content + pointerValue + ' MPH</span></div>');
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement("style", null, SAMPLE_CSS),
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), loaded: onChartLoad.bind(_this), background: 'transparent', dragMove: dragMove.bind(_this), dragEnd: dragEnd.bind(_this), id: 'drag-container', ref: gauge, enablePointerDrag: true, enableRangeDrag: false },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 220, endAngle: 140, radius: '80%', minimum: 0, maximum: 120, majorTicks: { useRangeColor: true }, lineStyle: { width: 0 }, minorTicks: { useRangeColor: true }, labelStyle: { useRangeColor: true, font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div style="font-size: 14px;color:#E5C31C;font-weight: lighter;font-style: oblique;margin-left:-20px;"><span>70 MPH</span></div>', angle: 180, radius: '45%', zIndex: '1' })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', markerWidth: 5, cap: { radius: 10, border: { width: 5, color: '#E5C31C' } }, needleTail: { length: '0%', color: '#E5C31C' }, color: '#E5C31C' }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '110%', color: '#E5C31C', markerWidth: 20, markerHeight: 20, type: 'Marker', markerShape: 'InvertedTriangle' })),
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, type: "Marker", markerShape: 'InvertedTriangle', radius: '110%', markerHeight: 20, color: '#E5C31C', markerWidth: 20 }),
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
                                            React.createElement("input", { type: "range", id: "value", onChange: dragChange.bind(_this), ref: drag, defaultValue: "70", min: "0", max: "120", style: { width: "100%", paddingLeft: '0px' } }))),
                                    React.createElement("td", { style: { width: '10%' } },
                                        React.createElement("div", { style: { textAlign: 'center' } },
                                            React.createElement("span", { id: 'pointerValue', style: { fontSize: "14px" } }, pointerValue)))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "20%" } },
                                        React.createElement("div", { id: 'enablePointer', style: { width: "90%", fontSize: "14px" } }, "Allow Pointer Drag")),
                                    React.createElement("td", { style: { width: "49%" } },
                                        React.createElement("div", { className: 'pointerDragCheckBox' },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'enable', checked: true, change: pointerDragChange.bind(_this), ref: pointerDrag })))),
                                React.createElement("tr", { style: { height: "50px" } },
                                    React.createElement("td", { style: { width: "20%" } },
                                        React.createElement("div", { id: 'enablePointer', style: { width: "90%", fontSize: "14px" } }, "Allow Ranges Drag")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", { className: 'pointerDragCheckBox' },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { id: 'rangeDragEnable', checked: false, change: rangesDragChange.bind(_this), ref: rangesDrag })))))))))),
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
exports.default = Drag;
