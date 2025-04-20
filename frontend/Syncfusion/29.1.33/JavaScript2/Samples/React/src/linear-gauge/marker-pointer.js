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
exports.MarkerPointer = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var MarkerPointer = /** @class */ (function (_super) {
    __extends(MarkerPointer, _super);
    function MarkerPointer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MarkerPointer.prototype.horizontalGauge = function (e) {
        this.invertedPointer.width = this.circlePointer.width = this.textPointer.width = this.rectanglePointer.width = this.multiplePointer.width = '450px';
        this.invertedPointer.height = this.circlePointer.height = this.textPointer.height = this.rectanglePointer.height = this.multiplePointer.height = '150px';
        this.invertedPointer.orientation = this.circlePointer.orientation = this.textPointer.orientation = this.rectanglePointer.orientation = this.multiplePointer.orientation = "Horizontal";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('vertical').style.color = "black";
            document.getElementById('vertical').style.backgroundColor = "white";
            document.getElementById('containerInverted').className = document.getElementById('containerCircle').className =
                document.getElementById('containerText').className = document.getElementById('containerRectangle').className =
                    document.getElementById('containerMultiple').className = "col-xs-12 col-sm-12 col-lg-12 col-md-12";
            document.getElementById('containerBox').style.padding = "0%";
        }
    };
    MarkerPointer.prototype.verticalGauge = function (e) {
        this.invertedPointer.width = this.circlePointer.width = this.rectanglePointer.width = this.multiplePointer.width = '150px';
        this.textPointer.width = '168px';
        this.invertedPointer.height = this.circlePointer.height = this.textPointer.height = this.rectanglePointer.height = this.multiplePointer.height = '350px';
        this.invertedPointer.orientation = this.circlePointer.orientation = this.textPointer.orientation = this.rectanglePointer.orientation = this.multiplePointer.orientation = "Vertical";
        if (e.currentTarget != null) {
            e.currentTarget['style']['color'] = "white";
            e.currentTarget['style']['backgroundColor'] = "#0074E3";
            document.getElementById('horizontal')['style']['color'] = "black";
            document.getElementById('horizontal')['style']['backgroundColor'] = "white";
            document.getElementById('containerInverted').className = document.getElementById('containerCircle').className =
                document.getElementById('containerText').className = document.getElementById('containerRectangle').className =
                    document.getElementById('containerMultiple').className = "col-xs-4 col-sm-4 col-lg-2 col-md-2";
            document.getElementById('containerBox').style.display = "flex";
            document.getElementById('containerBox').style.padding = "4%";
        }
    };
    MarkerPointer.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    MarkerPointer.prototype.dragStartTriangle = function (args) {
        this.invertedPointer.axes[0].pointers[0].animationDuration = 0;
        this.invertedPointer.axes[0].pointers[1].animationDuration = 0;
    };
    MarkerPointer.prototype.dragEndTriangle = function (args) {
        this.invertedPointer.axes[0].pointers[0].animationDuration = 1500;
        this.invertedPointer.axes[0].pointers[1].animationDuration = 1500;
    };
    MarkerPointer.prototype.dragMoveTriangle = function (args) {
        if (args.pointerIndex == 1) {
            this.invertedPointer.setPointerValue(0, 0, args.currentValue);
        }
    };
    MarkerPointer.prototype.dragEndCircle = function (args) {
        this.circlePointer.axes[0].pointers[0].animationDuration = 1500;
        this.circlePointer.axes[0].pointers[1].animationDuration = 1500;
    };
    MarkerPointer.prototype.dragStartCircle = function (args) {
        this.circlePointer.axes[0].pointers[0].animationDuration = 0;
        this.circlePointer.axes[0].pointers[1].animationDuration = 0;
    };
    MarkerPointer.prototype.dragMoveCircle = function (args) {
        if (args.pointerIndex == 1) {
            this.circlePointer.setPointerValue(0, 0, args.currentValue);
        }
    };
    MarkerPointer.prototype.dragEndText = function (args) {
        this.textPointer.axes[0].pointers[0].animationDuration = 1500;
        this.textPointer.axes[0].pointers[1].animationDuration = 1500;
    };
    MarkerPointer.prototype.dragStartText = function (args) {
        this.textPointer.axes[0].pointers[0].animationDuration = 0;
        this.textPointer.axes[0].pointers[1].animationDuration = 0;
    };
    MarkerPointer.prototype.dragMoveText = function (args) {
        if (args.pointerIndex == 1) {
            this.textPointer.axes[0].pointers[1].text = Math.round(args.currentValue).toString() + " Points";
            this.textPointer.setPointerValue(0, 0, args.currentValue);
        }
    };
    MarkerPointer.prototype.dragEndRectangle = function (args) {
        this.rectanglePointer.axes[0].pointers[0].animationDuration = 1500;
        this.rectanglePointer.axes[0].pointers[1].animationDuration = 1500;
    };
    MarkerPointer.prototype.dragStartRectangle = function (args) {
        this.rectanglePointer.axes[0].pointers[0].animationDuration = 0;
        this.rectanglePointer.axes[0].pointers[1].animationDuration = 0;
    };
    MarkerPointer.prototype.dragMoveRectangle = function (args) {
        if (args.pointerIndex == 1) {
            this.rectanglePointer.setPointerValue(0, 0, args.currentValue);
        }
    };
    MarkerPointer.prototype.dragEndMultiple = function (args) {
        if (args.pointerIndex == 1) {
            this.multiplePointer.axes[0].pointers[0].animationDuration = 1500;
            this.multiplePointer.axes[0].pointers[1].animationDuration = 1500;
        }
    };
    MarkerPointer.prototype.dragStartMultiple = function (args) {
        if (args.pointerIndex == 1) {
            this.multiplePointer.axes[0].pointers[0].animationDuration = 0;
            this.multiplePointer.axes[0].pointers[1].animationDuration = 0;
        }
    };
    MarkerPointer.prototype.dragMoveMultiple = function (args) {
        if (args.pointerIndex == 1) {
            this.multiplePointer.setPointerValue(0, 0, args.currentValue);
        }
    };
    MarkerPointer.prototype.render = function () {
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
                    React.createElement("div", { id: "containerBox", className: "row", style: { float: 'left', padding: '4%' } }),
                    React.createElement("div", { id: 'containerInverted', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragEnd: this.dragEndTriangle.bind(this), dragStart: this.dragStartTriangle.bind(this), dragMove: this.dragMoveTriangle.bind(this), load: this.load.bind(this), id: 'invertedMarker', title: 'Inverted triangle', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (invertedPointer) { return _this.invertedPointer = invertedPointer; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 40, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 40, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Triangle', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerCircle', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: this.dragStartCircle.bind(this), dragEnd: this.dragEndCircle.bind(this), dragMove: this.dragMoveCircle.bind(this), load: this.load.bind(this), title: 'Circle', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'circleMarker', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (circlePointer) { return _this.circlePointer = circlePointer; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 20, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 20, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Circle', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerRectangle', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: this.dragStartRectangle.bind(this), dragEnd: this.dragEndRectangle.bind(this), dragMove: this.dragMoveRectangle.bind(this), load: this.load.bind(this), title: 'Rectangle', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'rectangleMarker', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (rectanglePointer) { return _this.rectanglePointer = rectanglePointer; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 30, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 30, enableDrag: true, height: 5, width: 15, placement: 'Near', markerType: 'Rectangle', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerText', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: this.dragStartText.bind(this), dragEnd: this.dragEndText.bind(this), dragMove: this.dragMoveText.bind(this), load: this.load.bind(this), title: 'Text', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'TextMarker', orientation: 'Vertical', width: '168px', height: '350px', background: 'transparent', ref: function (textPointer) { return _this.textPointer = textPointer; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Text', offset: -10, text: '50 Points', animationDuration: 1500 })))))),
                    React.createElement("div", { id: 'containerMultiple', className: "col-xs-4 col-sm-4 col-lg-2 col-md-2", style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: this.dragStartMultiple.bind(this), dragEnd: this.dragEndMultiple.bind(this), dragMove: this.dragMoveMultiple.bind(this), load: this.load.bind(this), title: 'Multiple pointers', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'multipleMarkers', orientation: 'Vertical', width: '150px', height: '350px', background: 'transparent', ref: function (multiplePointer) { return _this.multiplePointer = multiplePointer; } },
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 10, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Triangle', animationDuration: 1500 }),
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 100, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Diamond', animationDuration: 1500 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows the various marker pointer shapes available in the linear gauge. Additionally, multiple marker pointer, animation and drag support are enabled.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to render and configure marker pointer in the linear gauge. The ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/" }, "PointersDirective"),
                    " collection is useful for displaying multiple pointers. The properties available in ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/pointerModel/" }, "PointerDirective"),
                    " help in the customization of the marker pointer in the linear gauge. Drag pointers are assisted by the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#dragstart" }, "dragStart"),
                    " and ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/linear-gauge/#dragend" }, "dragEnd"),
                    " events."),
                React.createElement("p", null,
                    "More information on the marker pointer can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/pointers/#marker-pointer" }, "documentation section"),
                    "."))));
    };
    return MarkerPointer;
}(sample_base_1.SampleBase));
exports.MarkerPointer = MarkerPointer;
