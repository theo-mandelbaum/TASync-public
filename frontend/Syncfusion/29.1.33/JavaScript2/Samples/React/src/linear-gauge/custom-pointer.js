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
exports.CustomPointer = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var CustomPointer = /** @class */ (function (_super) {
    __extends(CustomPointer, _super);
    function CustomPointer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CustomPointer.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    CustomPointer.prototype.horizontalGauge = function (e) {
        this.textWidget.width = this.iconWidget.width = this.multipleWidget.width = '450px';
        this.textWidget.height = this.iconWidget.height = this.multipleWidget.height = '150px';
        this.textWidget.orientation = this.iconWidget.orientation = this.multipleWidget.orientation = "Horizontal";
        this.textWidget.axes[0].pointers[0].offset = 2;
        this.multipleWidget.axes[0].pointers[0].offset = 2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerText').className = document.getElementById('containerIcon').className =
                document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    };
    CustomPointer.prototype.verticalGauge = function (e) {
        this.textWidget.width = this.iconWidget.width = this.multipleWidget.width = '170px';
        this.textWidget.height = this.iconWidget.height = this.multipleWidget.height = '350px';
        this.textWidget.orientation = this.iconWidget.orientation = this.multipleWidget.orientation = "Vertical";
        this.textWidget.axes[0].pointers[0].offset = -2;
        this.multipleWidget.axes[0].pointers[0].offset = -2;
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerText').className = document.getElementById('containerIcon').className =
                document.getElementById('containerMultiple').className =
                    "col-xs-5 col-sm-5 col-lg-4 col-md-4";
            document.getElementById('containerBox').style.display = "flex";
        }
    };
    CustomPointer.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: "control-section" },
                    React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-12 col-md-12", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement("div", { style: { margin: 'auto', padding: '10px' } },
                            React.createElement("table", { role: 'none' },
                                React.createElement("tbody", null,
                                    React.createElement("tr", null,
                                        React.createElement("td", null,
                                            React.createElement("div", { id: 'horizontal', style: { padding: '6px', cursor: 'pointer', width: '86px', color: 'black', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: 'white', textAlign: 'center' }, onClick: this.horizontalGauge.bind(this) }, "Horizontal")),
                                        React.createElement("td", null,
                                            React.createElement("div", { id: 'vertical', style: { padding: '6px', cursor: 'pointer', width: '86px', color: 'white', fontSize: '15px', border: '1px solid #0074E3', backgroundColor: '#0074E3', textAlign: 'center' }, onClick: this.verticalGauge.bind(this) }, "Vertical"))))))),
                    React.createElement("pre", { style: { border: 'hidden', backgroundColor: 'inherit' } }),
                    React.createElement("div", { id: "containerBox", style: { float: 'left' } }),
                    React.createElement("div", { id: "containerText", className: "col-xs-5 col-sm-5 col-lg-4 col-md-4", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, id: 'textWidget', title: 'Text widget', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (textWidget) { return _this.textWidget = textWidget; } },
                            React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 20 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 30, color: '#173BBB', markerType: 'Circle', position: 'Cross', placement: 'Center', offset: -2, value: 55 })))),
                            React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { axisIndex: 0, axisValue: 55, x: 0, y: 0, zIndex: '1', content: '<div style="font-size: 12px;color: white;margin-left: -2px;margin-top:1px"> 55 </div>' })))),
                    React.createElement("div", { id: "containerIcon", className: "col-xs-5 col-sm-5 col-lg-4 col-md-4", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Icon widget', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'iconWidget', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (iconWidget) { return _this.iconWidget = iconWidget; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 20 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 45, height: 30, value: 90, placement: 'Near', markerType: 'Image', imageUrl: 'src/linear-gauge/images/thumb-icon.png' })))))),
                    React.createElement("div", { id: "containerMultiple", className: "col-xs-5 col-sm-5 col-lg-4 col-md-4", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Multiple widget pointers', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'multipleWidget', orientation: 'Vertical', width: '170px', height: '350px', background: 'transparent', ref: function (multipleWidget) { return _this.multipleWidget = multipleWidget; } },
                            React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 20 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit', fontWeight: '499' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 30, color: '#173BBB', position: 'Cross', placement: 'Center', markerType: 'Circle', value: 60, offset: -2 }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 45, height: 30, color: '#173BBB', placement: 'Near', markerType: 'Image', imageUrl: 'src/linear-gauge/images/thumb-icon.png', value: 30 })))),
                            React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { axisIndex: 0, axisValue: 60, x: 0, zIndex: '1', y: 0, content: '<div style="margin-top: -2px;font-size: 12px;color: white;margin-left: -2px;margin-top:-1px"> 60 </div>' })))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample demonstrates the inclusion of text and image pointers in the linear gauge. Additionally, multiple pointer support is enabled.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure text and image pointers in the linear gauge. The properties available in  ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/" }, "PointerDirective"),
                    " and  ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/annotationModel/" }, "AnnotationDirective"),
                    " help in the customization of the text and image pointers in the linear gauge."),
                React.createElement("p", null,
                    "More information on the pointers can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/" }, "documentation section"),
                    "."))));
    };
    return CustomPointer;
}(sample_base_1.SampleBase));
exports.CustomPointer = CustomPointer;
