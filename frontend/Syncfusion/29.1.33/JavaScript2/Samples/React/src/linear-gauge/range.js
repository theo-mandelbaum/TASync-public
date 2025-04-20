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
exports.Ranges = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var Ranges = /** @class */ (function (_super) {
    __extends(Ranges, _super);
    function Ranges() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.rangeLinearGradient = {
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
    Ranges.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Ranges.prototype.horizontalGauge = function (e) {
        this.defaultRange.width = this.exponentialRange.width = this.concaveRange.width = this.gradientRange.width = this.multipleRange.width = '450px';
        this.defaultRange.height = this.exponentialRange.height = this.concaveRange.height = this.gradientRange.height = this.multipleRange.height = '150px';
        this.defaultRange.orientation = this.exponentialRange.orientation = this.concaveRange.orientation = this.gradientRange.orientation = this.multipleRange.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerExponential').className =
                document.getElementById('containerConcave').className = document.getElementById('containerGradient').className =
                    document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    };
    Ranges.prototype.verticalGauge = function (e) {
        this.defaultRange.width = this.exponentialRange.width = this.concaveRange.width = this.gradientRange.width = this.multipleRange.width = '150px';
        this.defaultRange.height = this.exponentialRange.height = this.concaveRange.height = this.gradientRange.height = this.multipleRange.height = '350px';
        this.defaultRange.orientation = this.exponentialRange.orientation = this.concaveRange.orientation = this.gradientRange.orientation = this.multipleRange.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerExponential').className =
                document.getElementById('containerConcave').className = document.getElementById('containerGradient').className =
                    document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
        }
    };
    Ranges.prototype.render = function () {
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
                    React.createElement("div", { id: 'containerDefault', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, id: 'defaultRange', title: 'Default', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (defaultRange) { return _this.defaultRange = defaultRange; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 10, endWidth: 10, color: '#F45656', offset: 5 })))))),
                    React.createElement("div", { id: 'containerExponential', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Exponential', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'exponentialRange', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (exponentialRange) { return _this.exponentialRange = exponentialRange; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 50, startWidth: 2, endWidth: 15, color: '#F45656', offset: 5 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 50, end: 100, startWidth: 15, endWidth: 50, color: '#F45656', offset: 5 })))))),
                    React.createElement("div", { id: 'containerConcave', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Concave', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'concaveRange', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (concaveRange) { return _this.concaveRange = concaveRange; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 50, color: '#F45656', startWidth: 50, endWidth: 20, offset: 5 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 50, end: 100, color: '#F45656', startWidth: 20, endWidth: 50, offset: 5 })))))),
                    React.createElement("div", { id: 'containerGradient', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Gradient shader', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gradientRange', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gradientRange) { return _this.gradientRange = gradientRange; } },
                            React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Gradient] }),
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 100, startWidth: 50, endWidth: 50, offset: 5, linearGradient: this.rangeLinearGradient })))))),
                    React.createElement("div", { id: 'containerMultiple', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), animationDuration: 2000, title: 'Multiple ranges', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'multipleRange', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (multipleRange) { return _this.multipleRange = multipleRange; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 30, color: '#FB7D55', startWidth: 50, endWidth: 50, offset: 5 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 30, end: 65, color: '#ECC85B', startWidth: 50, endWidth: 50, offset: 5 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 65, end: 100, color: '#6FC78A', startWidth: 50, endWidth: 50, offset: 5 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample demonstrates the various customization options for the linear gauge's range. For example, an exponential appearance, a gradient color, and a multiple range.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure ranges in the linear gauge. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/rangeModel/" }, "RangesDirective"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/rangeModel/" }, "RangeDirective"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/linearGradientModel/" }, "linearGradient"),
                    " are used to display multiple ranges, perform range customization, and apply gradient colors, respectively."),
                React.createElement("p", null,
                    "More information on the ranges can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/ranges/" }, "documentation section"),
                    "."))));
    };
    return Ranges;
}(sample_base_1.SampleBase));
exports.Ranges = Ranges;
