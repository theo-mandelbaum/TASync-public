"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Ticks = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("150px"), gaugeWidth = _a[0], setGaugeWidth = _a[1];
    var _b = (0, react_1.useState)("350px"), gaugeHeight = _b[0], setGaugeHeight = _b[1];
    var _c = (0, react_1.useState)('Vertical'), gaugeOriention = _c[0], setOrientation = _c[1];
    var _d = (0, react_1.useState)("white"), verticalColor = _d[0], setVerticalColor = _d[1];
    var _e = (0, react_1.useState)("#0074E3"), verticalBgColor = _e[0], setVerticalBgColor = _e[1];
    var _f = (0, react_1.useState)("black"), horizontalColor = _f[0], setHorizontalColor = _f[1];
    var _g = (0, react_1.useState)("white"), horizontalBgColor = _g[0], setHorizontalBgColor = _g[1];
    var _h = (0, react_1.useState)("col-xs-5 col-sm-5 col-lg-3 col-md-3"), classStyle = _h[0], setClassStyle = _h[1];
    var _j = (0, react_1.useState)("flex"), display = _j[0], setDisplay = _j[1];
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var horizontalGauge = function (e) {
        setGaugeWidth('450px');
        setGaugeHeight('150px');
        setOrientation("Horizontal");
        if (e.currentTarget != null) {
            setHorizontalColor("white");
            setHorizontalBgColor("#0074E3");
            setVerticalColor("black");
            setVerticalBgColor("white");
            setClassStyle("col-xs-12 col-sm-12 col-lg-12 col-md-12");
            setDisplay("");
        }
    };
    var verticalGauge = function (e) {
        setGaugeWidth('150px');
        setGaugeHeight('350px');
        setOrientation("Vertical");
        if (e.currentTarget != null) {
            setVerticalColor("white");
            setVerticalBgColor("#0074E3");
            setHorizontalColor("black");
            setHorizontalBgColor("white");
            setClassStyle("col-xs-5 col-sm-5 col-lg-3 col-md-3");
            setDisplay("flex");
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
                React.createElement("div", { id: "containerBox", style: { float: 'left', display: display } }),
                React.createElement("div", { id: "containerOutside", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 2000, id: 'gaugeOutsideTick', title: 'Outside ticks', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Outside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Outside' }, labelStyle: { position: 'Outside', font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                React.createElement("div", { id: "containerCross", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 2000, title: 'Cross ticks', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeCrossTick', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Cross' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Cross' }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100 },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                React.createElement("div", { id: "containerInside", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 2000, title: 'Inside ticks', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeInsideTick', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3, position: 'Inside' }, majorTicks: { interval: 20, height: 7, width: 1, position: 'Inside' }, labelStyle: { font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, isInversed: true, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                React.createElement("div", { id: "containerOffset", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 2000, title: 'Ticks with offset', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'gaugeOffsetTick', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
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
exports.default = Ticks;
