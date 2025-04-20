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
exports.Ticks = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var Ticks = /** @class */ (function (_super) {
    __extends(Ticks, _super);
    function Ticks() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Ticks.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Ticks.prototype.horizontalGauge = function (e) {
        this.gaugeOutsideTick.width = this.gaugeCrossTick.width = this.gaugeInsideTick.width = this.gaugeOffsetTick.width = '450px';
        this.gaugeOutsideTick.height = this.gaugeCrossTick.height = this.gaugeInsideTick.height = this.gaugeOffsetTick.height = '150px';
        this.gaugeOutsideTick.orientation = this.gaugeCrossTick.orientation = this.gaugeInsideTick.orientation = this.gaugeOffsetTick.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
        }
    };
    Ticks.prototype.verticalGauge = function (e) {
        this.gaugeOutsideTick.width = this.gaugeCrossTick.width = this.gaugeInsideTick.width = this.gaugeOffsetTick.width = '150px';
        this.gaugeOutsideTick.height = this.gaugeCrossTick.height = this.gaugeInsideTick.height = this.gaugeOffsetTick.height = '350px';
        this.gaugeOutsideTick.orientation = this.gaugeCrossTick.orientation = this.gaugeInsideTick.orientation = this.gaugeOffsetTick.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerOutside').className = document.getElementById('containerCross').className =
                document.getElementById('containerInside').className = document.getElementById('containerOffset').className =
                    "col-xs-5 col-sm-5 col-lg-3 col-md-3";
            document.getElementById('containerBox').style.display = "flex";
        }
    };
    Ticks.prototype.render = function () {
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
                    React.createElement("div", { id: "containerOutside", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, id: 'gaugeOutsideTick', title: 'Outside ticks', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeOutsideTick) { return _this.gaugeOutsideTick = gaugeOutsideTick; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: "containerCross", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Cross ticks', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeCrossTick', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeCrossTick) { return _this.gaugeCrossTick = gaugeCrossTick; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Cross' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Cross' }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100 },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: "containerInside", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Inside ticks', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeInsideTick', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeInsideTick) { return _this.gaugeInsideTick = gaugeInsideTick; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Inside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Inside' }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, isInversed: true, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: "containerOffset", className: "col-xs-5 col-sm-5 col-lg-3 col-md-3", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Ticks with offset', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeOffsetTick', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeOffsetTick) { return _this.gaugeOffsetTick = gaugeOffsetTick; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Inside', offset: 10 }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Inside', offset: 10 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, isInversed: true, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows ticks in various positions such as inside, middle, and outside. Additionally, the position of the ticks can be customized using offset.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure ticks in the linear gauge. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/#position" }, "position"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/#offset" }, "offset"),
                    " properties in ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/" }, "majorTicks"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/tickModel/" }, "minorTicks"),
                    " are used to position the ticks as well as provide offset."),
                React.createElement("p", null,
                    "More information on the ticks can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#ticks-customization" }, "documentation section"),
                    "."))));
    };
    return Ticks;
}(sample_base_1.SampleBase));
exports.Ticks = Ticks;
