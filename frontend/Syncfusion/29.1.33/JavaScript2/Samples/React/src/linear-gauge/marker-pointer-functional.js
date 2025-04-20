"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var MarkerPointer = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("150px"), gaugeWidth = _a[0], setGaugeWidth = _a[1];
    var _b = (0, react_1.useState)("168px"), gaugeTextWidth = _b[0], setGaugeTextWidth = _b[1];
    var _c = (0, react_1.useState)("350px"), gaugeHeight = _c[0], setGaugeHeight = _c[1];
    var _d = (0, react_1.useState)('Vertical'), gaugeOriention = _d[0], setOrientation = _d[1];
    var _e = (0, react_1.useState)("white"), verticalColor = _e[0], setVerticalColor = _e[1];
    var _f = (0, react_1.useState)("#0074E3"), verticalBgColor = _f[0], setVerticalBgColor = _f[1];
    var _g = (0, react_1.useState)("black"), horizontalColor = _g[0], setHorizontalColor = _g[1];
    var _h = (0, react_1.useState)("white"), horizontalBgColor = _h[0], setHorizontalBgColor = _h[1];
    var _j = (0, react_1.useState)("col-xs-4 col-sm-4 col-lg-2 col-md-2"), classStyle = _j[0], setClassStyle = _j[1];
    var _k = (0, react_1.useState)("flex"), display = _k[0], setDisplay = _k[1];
    var _l = (0, react_1.useState)("4%"), padding = _l[0], setPadding = _l[1];
    var invertedPointer = (0, react_1.useRef)(null);
    var circlePointer = (0, react_1.useRef)(null);
    var textPointer = (0, react_1.useRef)(null);
    var rectanglePointer = (0, react_1.useRef)(null);
    var multiplePointer = (0, react_1.useRef)(null);
    var horizontalGauge = function (e) {
        setGaugeWidth('450px');
        setGaugeTextWidth('450px');
        setGaugeHeight('150px');
        setOrientation("Horizontal");
        if (e.currentTarget != null) {
            setHorizontalColor("white");
            setHorizontalBgColor("#0074E3");
            setVerticalColor("black");
            setVerticalBgColor("white");
            setClassStyle("col-xs-12 col-sm-12 col-lg-12 col-md-12");
            setDisplay("");
            setPadding("0%");
        }
    };
    var verticalGauge = function (e) {
        setGaugeWidth('150px');
        setGaugeTextWidth('168px');
        setGaugeHeight('350px');
        setOrientation("Vertical");
        if (e.currentTarget != null) {
            setVerticalColor("white");
            setVerticalBgColor("#0074E3");
            setHorizontalColor("black");
            setHorizontalBgColor("white");
            setClassStyle("col-xs-4 col-sm-4 col-lg-2 col-md-2");
            setDisplay("flex");
            setPadding("4%");
        }
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var dragStartTriangle = function (args) {
        invertedPointer.current.axes[0].pointers[0].animationDuration = 0;
        invertedPointer.current.axes[0].pointers[1].animationDuration = 0;
    };
    var dragEndTriangle = function (args) {
        invertedPointer.current.axes[0].pointers[0].animationDuration = 1500;
        invertedPointer.current.axes[0].pointers[1].animationDuration = 1500;
    };
    var dragMoveTriangle = function (args) {
        if (args.pointerIndex == 1) {
            invertedPointer.current.setPointerValue(0, 0, args.currentValue);
        }
    };
    var dragEndCircle = function (args) {
        circlePointer.current.axes[0].pointers[0].animationDuration = 1500;
        circlePointer.current.axes[0].pointers[1].animationDuration = 1500;
    };
    var dragStartCircle = function (args) {
        circlePointer.current.axes[0].pointers[0].animationDuration = 0;
        circlePointer.current.axes[0].pointers[1].animationDuration = 0;
    };
    var dragMoveCircle = function (args) {
        if (args.pointerIndex == 1) {
            circlePointer.current.setPointerValue(0, 0, args.currentValue);
        }
    };
    var dragEndText = function (args) {
        textPointer.current.axes[0].pointers[0].animationDuration = 1500;
        textPointer.current.axes[0].pointers[1].animationDuration = 1500;
    };
    var dragStartText = function (args) {
        textPointer.current.axes[0].pointers[0].animationDuration = 0;
        textPointer.current.axes[0].pointers[1].animationDuration = 0;
    };
    var dragMoveText = function (args) {
        if (args.pointerIndex == 1) {
            textPointer.current.axes[0].pointers[1].text = Math.round(args.currentValue).toString() + " Points";
            textPointer.current.setPointerValue(0, 0, args.currentValue);
        }
    };
    var dragEndRectangle = function (args) {
        rectanglePointer.current.axes[0].pointers[0].animationDuration = 1500;
        rectanglePointer.current.axes[0].pointers[1].animationDuration = 1500;
    };
    var dragStartRectangle = function (args) {
        rectanglePointer.current.axes[0].pointers[0].animationDuration = 0;
        rectanglePointer.current.axes[0].pointers[1].animationDuration = 0;
    };
    var dragMoveRectangle = function (args) {
        if (args.pointerIndex == 1) {
            rectanglePointer.current.setPointerValue(0, 0, args.currentValue);
        }
    };
    var dragEndMultiple = function (args) {
        if (args.pointerIndex == 1) {
            multiplePointer.current.axes[0].pointers[0].animationDuration = 1500;
            multiplePointer.current.axes[0].pointers[1].animationDuration = 1500;
        }
    };
    var dragStartMultiple = function (args) {
        if (args.pointerIndex == 1) {
            multiplePointer.current.axes[0].pointers[0].animationDuration = 0;
            multiplePointer.current.axes[0].pointers[1].animationDuration = 0;
        }
    };
    var dragMoveMultiple = function (args) {
        if (args.pointerIndex == 1) {
            multiplePointer.current.setPointerValue(0, 0, args.currentValue);
        }
    };
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
                                        React.createElement("div", { id: 'horizontal', style: { padding: '6px', cursor: 'pointer', width: '86px', color: horizontalColor, fontSize: '15px', border: '1px solid #0074E3', backgroundColor: horizontalBgColor, textAlign: 'center' }, onClick: horizontalGauge.bind(_this) }, "Horizontal")),
                                    React.createElement("td", null,
                                        React.createElement("div", { id: 'vertical', style: { padding: '6px', cursor: 'pointer', width: '86px', color: verticalColor, fontSize: '15px', border: '1px solid #0074E3', backgroundColor: verticalBgColor, textAlign: 'center' }, onClick: verticalGauge.bind(_this) }, "Vertical"))))))),
                React.createElement("pre", { style: { border: 'hidden', backgroundColor: 'inherit' } }),
                React.createElement("div", { id: "containerBox", className: "row", style: { float: 'left', padding: padding, display: display } }),
                React.createElement("div", { id: 'containerInverted', className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragEnd: dragEndTriangle, dragStart: dragStartTriangle, dragMove: dragMoveTriangle, load: load, id: 'invertedMarker', title: 'Inverted triangle', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent', ref: invertedPointer },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 40, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 40, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Triangle', animationDuration: 1500 })))))),
                React.createElement("div", { id: 'containerCircle', className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: dragStartCircle, dragEnd: dragEndCircle, dragMove: dragMoveCircle, load: load, title: 'Circle', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'circleMarker', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent', ref: circlePointer },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 20, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 20, enableDrag: true, height: 15, width: 15, placement: 'Near', markerType: 'Circle', animationDuration: 1500 })))))),
                React.createElement("div", { id: 'containerRectangle', className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: dragStartRectangle, dragEnd: dragEndRectangle, dragMove: dragMoveRectangle, load: load, title: 'Rectangle', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'rectangleMarker', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent', ref: rectanglePointer },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 30, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 30, enableDrag: true, height: 5, width: 15, placement: 'Near', markerType: 'Rectangle', animationDuration: 1500 })))))),
                React.createElement("div", { id: 'containerText', className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { dragStart: dragStartText, animationDuration: 2000, dragEnd: dragEndText, dragMove: dragMoveText, load: load, title: 'Text', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'TextMarker', orientation: gaugeOriention, width: gaugeTextWidth, height: gaugeHeight, background: 'transparent', ref: textPointer },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, height: 5, width: 5, placement: 'Near', type: 'Bar', animationDuration: 1500, offset: '12', color: '#0074E3' }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 50, enableDrag: true, height: 15, width: 15, placement: 'Near', offset: -10, markerType: 'Text', text: "50 Points", animationDuration: 1500 })))))),
                React.createElement("div", { id: 'containerMultiple', className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { animationDuration: 2000, dragStart: dragStartMultiple, dragEnd: dragEndMultiple, dragMove: dragMoveMultiple, load: load, title: 'Multiple pointers', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'multipleMarkers', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent', ref: multiplePointer },
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
exports.default = MarkerPointer;
