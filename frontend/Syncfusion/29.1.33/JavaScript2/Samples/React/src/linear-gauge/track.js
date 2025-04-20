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
exports.Track = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Track = /** @class */ (function (_super) {
    __extends(Track, _super);
    function Track() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.classStyle = 'col-xs-4 col-sm-4 col-lg-2 col-md-2';
        return _this;
    }
    Track.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Track.prototype.horizontalGauge = function (e) {
        this.gaugeDefault.width = this.gaugeEdge.width = this.gaugeRangeColor.width = this.gaugeInversed.width = this.gaugeOpposed.width = '450px';
        this.gaugeDefault.height = this.gaugeEdge.height = this.gaugeRangeColor.height = this.gaugeInversed.height = this.gaugeOpposed.height = '150px';
        this.gaugeDefault.orientation = this.gaugeEdge.orientation = this.gaugeRangeColor.orientation = this.gaugeInversed.orientation = this.gaugeOpposed.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerEdge').className =
                document.getElementById('containerRangeColor').className = document.getElementById('containerInversed').className =
                    document.getElementById('containerOpposed').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    };
    Track.prototype.verticalGauge = function (e) {
        this.gaugeDefault.width = this.gaugeEdge.width = this.gaugeRangeColor.width = this.gaugeInversed.width = this.gaugeOpposed.width = '150px';
        this.gaugeDefault.height = this.gaugeEdge.height = this.gaugeRangeColor.height = this.gaugeInversed.height = this.gaugeOpposed.height = '350px';
        this.gaugeDefault.orientation = this.gaugeEdge.orientation = this.gaugeRangeColor.orientation = this.gaugeInversed.orientation = this.gaugeOpposed.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerDefault').className = document.getElementById('containerEdge').className =
                document.getElementById('containerRangeColor').className = document.getElementById('containerInversed').className =
                    document.getElementById('containerOpposed').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
        }
    };
    Track.prototype.render = function () {
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
                    React.createElement("div", { id: 'containerDefault', className: this.classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), id: 'gaugeDefault', title: 'Default axis', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeDefault) { return _this.gaugeDefault = gaugeDefault; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: 'containerEdge', className: this.classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), title: 'Edge style', container: { width: 20, roundedCornerRadius: 10, type: 'RoundedRectangle', border: { width: 1 } }, titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeEdge', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeEdge) { return _this.gaugeEdge = gaugeEdge; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 0 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: 'containerRangeColor', className: this.classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), title: 'Range color for axis', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeRangeColor', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeRangeColor) { return _this.gaugeRangeColor = gaugeRangeColor; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 0 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { useRangeColor: true, font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 0, end: 30, color: '#F45656', startWidth: 5, endWidth: 5, offset: -5 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 30, end: 60, color: '#FFC93E', startWidth: 5, endWidth: 5, offset: -5 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 60, end: 100, color: '#0DC9AB', startWidth: 5, endWidth: 5, offset: -5 })))))),
                    React.createElement("div", { id: 'containerInversed', className: this.classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), title: 'Inversed axis', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeInversed', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeInversed) { return _this.gaugeInversed = gaugeInversed; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, isInversed: true, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                    React.createElement("div", { id: 'containerOpposed', className: this.classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), title: 'Opposed axis', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeOpposed', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (gaugeOpposed) { return _this.gaugeOpposed = gaugeOpposed; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample demonstrates the basic axis, its edge style, range color for axis, inversed and opposed axis.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure axis in the linear gauge. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/containerModel/#roundedcornerradius" }, " roundedCornerRadius"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/labelModel/#userangecolor" }, " useRangeColor"),
                    ", ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#isinversed" }, " isInversed"),
                    ", and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/axisModel/#opposedposition" }, " opposedPosition"),
                    " properties can be used to set the edge style, range color for axis, inversed and opposed axis respectively."),
                React.createElement("p", null,
                    "More information on the axis can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/axis/#axis-in-react-linear-gauge" }, "documentation section"),
                    "."))));
    };
    return Track;
}(sample_base_1.SampleBase));
exports.Track = Track;
