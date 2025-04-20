"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n        padding: 0px !important;\n    }";
var Labels = function () {
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
    var _k = (0, react_1.useState)("#E5E7EB"), pointerColor = _k[0], setPointerColor = _k[1];
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
        setPointerColor('#E5E7EB');
        if (args.gauge.theme === 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
            setPointerColor('#292827');
        }
        else if (args.gauge.theme === 'Bootstrap5Dark') {
            setPointerColor('#343A40');
        }
        else if (args.gauge.theme === 'Tailwind3Dark') {
            setPointerColor('#282F3C');
        }
        else if (args.gauge.theme === 'Material3') {
            setPointerColor('#C4C7C5');
        }
        else if (args.gauge.theme === 'Material3Dark') {
            setPointerColor('#938F99');
        }
    };
    var axisLabelRender = function (args) {
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
                React.createElement("div", { id: "containerCustom", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 1500, id: 'customLabelGauge', title: 'Custom labels', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 2.5, height: 3 }, majorTicks: { interval: 5, height: 7, width: 1 }, labelStyle: { format: '${value}', font: { fontFamily: 'inherit' } }, minimum: 5, maximum: 20, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                React.createElement("div", { id: "containerText", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { axisLabelRender: axisLabelRender, load: load, title: 'Text labels', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'textLabelGauge', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 2.5, height: 0 }, majorTicks: { interval: 5, height: 0 }, labelStyle: { offset: 10, font: { fontFamily: 'inherit' } }, minimum: 5, maximum: 20, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 20, color: '#0DC9AB', placement: "Near", markerType: "Circle", offset: 7 }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 15, color: '#0DC9AB', placement: "Near", markerType: "Circle", offset: 7 }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 10, color: '#0DC9AB', placement: "Near", markerType: "Circle", offset: 7 }),
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 15, height: 15, value: 5, color: pointerColor, placement: "Near", markerType: "Circle", offset: 7 })),
                                React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 15, end: 20, startWidth: 5, endWidth: 5, color: '#0DC9AB' }),
                                    React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 10, end: 15, startWidth: 5, endWidth: 5, color: '#0DC9AB' })))))),
                React.createElement("div", { id: "containerOffset", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 1500, title: 'Label offset', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'offsetLabelGauge', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { line: { width: 5 }, minorTicks: { interval: 10, height: 3 }, majorTicks: { interval: 20, height: 7, width: 1 }, labelStyle: { offset: 5, font: { fontFamily: 'inherit' } }, minimum: 0, maximum: 100, opposedPosition: true },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })))))),
                React.createElement("div", { id: "containerCustomized", className: classStyle, style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: load, animationDuration: 1500, title: 'Label customization', titleStyle: { fontFamily: 'inherit', fontWeight: '499' }, id: 'customizedLabelGauge', orientation: gaugeOriention, width: gaugeWidth, height: gaugeHeight, background: 'transparent' },
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
exports.default = Labels;
