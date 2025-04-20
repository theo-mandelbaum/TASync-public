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
exports.BarPointer = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var BarPointer = /** @class */ (function (_super) {
    __extends(BarPointer, _super);
    function BarPointer() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointerLinearGradient = {
            startValue: "0%",
            endValue: "100%",
            colorStop: [
                { color: "#FB7D55", offset: "0%", opacity: 1 },
                { color: "#ECC85B", offset: "50%", opacity: 1 },
                { color: "#6FC78A", offset: "100%", opacity: 1 }
            ]
        };
        return _this;
    }
    BarPointer.prototype.load = function (args) {
        // custom code start 
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    BarPointer.prototype.horizontalGauge = function (e) {
        this.outsideBar.width = this.crossBar.width = this.insideBar.width = this.gradientBar.width = this.multipleBar.width = '450px';
        this.outsideBar.height = this.crossBar.height = this.insideBar.height = this.gradientBar.height = this.multipleBar.height = '150px';
        this.outsideBar.orientation = this.crossBar.orientation = this.insideBar.orientation = this.gradientBar.orientation = this.multipleBar.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerGradient').className =
                    document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    };
    BarPointer.prototype.verticalGauge = function (e) {
        this.outsideBar.width = this.crossBar.width = this.insideBar.width = this.gradientBar.width = this.multipleBar.width = '150px';
        this.outsideBar.height = this.crossBar.height = this.insideBar.height = this.gradientBar.height = this.multipleBar.height = '350px';
        this.outsideBar.orientation = this.crossBar.orientation = this.insideBar.orientation = this.gradientBar.orientation = this.multipleBar.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerGradient').className =
                    document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
        }
    };
    BarPointer.prototype.render = function () {
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
                    React.createElement("div", { id: "containerBox", style: { float: 'left', padding: '4%' } }),
                    React.createElement("div", { id: 'containerOutside', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, id: 'outsideBar', title: 'Outside', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (outsideBar) { return _this.outsideBar = outsideBar; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, height: 5, width: 5, placement: 'Near', type: 'Bar', position: 'Outside', color: '#0074E3', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerCross', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Cross', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'crossBar', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (crossBar) { return _this.crossBar = crossBar; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, height: 5, width: 5, placement: 'Near', type: 'Bar', position: 'Cross', color: '#0074E3', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerInside', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Inside', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'insideBar', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (insideBar) { return _this.insideBar = insideBar; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, height: 5, width: 5, placement: 'Near', type: 'Bar', position: 'Inside', color: '#0074E3', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerGradient', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Gradient shader', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gradientBar', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gradientBar) { return _this.gradientBar = gradientBar; } },
                            React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Gradient] }),
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, height: 5, width: 5, placement: 'Near', type: 'Bar', position: 'Outside', offset: 2, animationDuration: 1500, linearGradient: this.pointerLinearGradient })))))),
                    React.createElement("div", { id: 'containerMultiple', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Multiple bar pointers', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'multipleBar', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (multipleBar) { return _this.multipleBar = multipleBar; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, height: 5, width: 5, placement: 'Near', type: 'Bar', position: 'Inside', color: '#0074E3', animationDuration: 1500 }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 70, height: 5, width: 5, placement: 'Near', type: 'Bar', position: 'Outside', color: 'red', animationDuration: 1500 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows the various bar pointer shapes available in the linear gauge. Additionally, multiple bar pointer and animation support are enabled.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure bar pointer in the linear gauge. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/" }, "PointersDirective"),
                    " collection is useful for displaying multiple pointers. The properties available in ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/" }, "PointerDirective"),
                    " help in the customization of the bar pointer in the linear gauge."),
                React.createElement("p", null,
                    "More information on the bar pointer can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/#bar-pointer" }, "documentation section"),
                    "."))));
    };
    return BarPointer;
}(sample_base_1.SampleBase));
exports.BarPointer = BarPointer;
