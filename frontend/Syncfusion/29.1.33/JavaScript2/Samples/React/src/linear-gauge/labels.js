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
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var Labels = /** @class */ (function (_super) {
    __extends(Labels, _super);
    function Labels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointerColor = '#E5E7EB';
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
    Labels.prototype.textLabelLoad = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
        this.pointerColor = '#E5E7EB';
        if (args.gauge.theme === 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
            this.pointerColor = '#292827';
        }
        else if (args.gauge.theme === 'Bootstrap5Dark') {
            this.pointerColor = '#343A40';
        }
        else if (args.gauge.theme === 'Tailwind3Dark') {
            this.pointerColor = '#282F3C';
        }
        else if (args.gauge.theme === 'Material3') {
            this.pointerColor = '#C4C7C5';
        }
        else if (args.gauge.theme === 'Material3Dark') {
            this.pointerColor = '#938F99';
        }
    };
    Labels.prototype.axisLabelRender = function (args) {
        if (args.text == "20")
            args.text = "Ordered";
        else if (args.text == "15")
            args.text = "Packed";
        else if (args.text == "10")
            args.text = "Shipped";
        else if (args.text == "5")
            args.text = "Delivered";
        else
            args.text = " ";
    };
    Labels.prototype.horizontalGauge = function (e) {
        this.customLabelGauge.width = this.textLabelGauge.width = this.offsetLabelGauge.width = this.customizedLabelGauge.width = '450px';
        this.customLabelGauge.height = this.textLabelGauge.height = this.offsetLabelGauge.height = this.customizedLabelGauge.height = '150px';
        this.customLabelGauge.orientation = this.textLabelGauge.orientation = this.offsetLabelGauge.orientation = this.customizedLabelGauge.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerCustom').className = document.getElementById('containerText').className =
                document.getElementById('containerOffset').className = document.getElementById('containerCustomized').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    };
    Labels.prototype.verticalGauge = function (e) {
        this.customLabelGauge.width = this.textLabelGauge.width = this.offsetLabelGauge.width = this.customizedLabelGauge.width = '150px';
        this.customLabelGauge.height = this.textLabelGauge.height = this.offsetLabelGauge.height = this.customizedLabelGauge.height = '350px';
        this.customLabelGauge.orientation = this.textLabelGauge.orientation = this.offsetLabelGauge.orientation = this.customizedLabelGauge.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerCustom').className = document.getElementById('containerText').className =
                document.getElementById('containerOffset').className = document.getElementById('containerCustomized').className =
                    "col-xs-5 col-sm-5 col-lg-3 col-md-3";
            document.getElementById('containerBox').style.display = "flex";
        }
    };
    Labels.prototype.render = function () {
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
                    React.createElement("div", { id: "containerCustom", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 1500, id: 'customLabelGauge', title: 'Custom labels', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (customLabelGauge) { return _this.customLabelGauge = customLabelGauge; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 2.5, height: 3 }, majorTicks: { interval: 5, height: 7, width: 1 }, labelStyle: { format: '${value}', font: { fontFamily: 'inherit' } }, minimum: 5, maximum: 20, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: "containerText", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { axisLabelRender: this.axisLabelRender.bind(this), load: this.textLabelLoad.bind(this), title: 'Text labels', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'textLabelGauge', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (textLabelGauge) { return _this.textLabelGauge = textLabelGauge; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 2.5, height: 0 }, majorTicks: { interval: 5, height: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } }, minimum: 5, maximum: 20, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 20, color: '#0DC9AB', placement: "Near", markerType: "Circle", offset: 7 }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 15, color: '#0DC9AB', placement: "Near", markerType: "Circle", offset: 7 }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 10, color: '#0DC9AB', placement: "Near", markerType: "Circle", offset: 7 }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 5, color: this.pointerColor, placement: "Near", markerType: "Circle", offset: 7 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 15, end: 20, startWidth: 5, endWidth: 5, color: '#0DC9AB' }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 10, end: 15, startWidth: 5, endWidth: 5, color: '#0DC9AB' })))))),
                    React.createElement("div", { id: "containerOffset", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 1500, title: 'Label offset', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'offsetLabelGauge', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (offsetLabelGauge) { return _this.offsetLabelGauge = offsetLabelGauge; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { offset: 5, font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: "containerCustomized", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 1500, title: 'Label customization', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'customizedLabelGauge', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (customizedLabelGauge) { return _this.customizedLabelGauge = customizedLabelGauge; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { color: '#F93106', fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample demonstrates the various options for customizing the axis labels, such as styling, formatting, replacing text, and setting offset in the linear gauge.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure axis labels in the linear gauge. The properties in the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#labelstyle" }, "labelStyle"),
                    " can be used to style, format, and offset the label, while the label's text can be changed dynamically via the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#axislabelrender" }, "axisLabelRender"),
                    " event."),
                React.createElement("p", null,
                    "More information on the axis labels can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#labels-customization" }, "documentation section"),
                    "."))));
    };
    return Labels;
}(sample_base_1.SampleBase));
exports.Labels = Labels;
