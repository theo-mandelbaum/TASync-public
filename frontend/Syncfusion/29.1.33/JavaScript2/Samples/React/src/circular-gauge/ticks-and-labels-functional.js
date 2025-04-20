"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var property_pane_1 = require("../common/property-pane");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var SAMPLE_CSS = "\n    #tickOffset, #tickHeight, #labelOffset {\n        width: 76%;\n    }\n    #offset, #height, #labelOffsetValue {\n        margin-left: -45px;\n    }\n    .tickCheckbox {\n        margin-left: -10px !important;\n        padding-top: 0px !important;\n        padding-left: 10px;\n    }\n    .e-view.fluent2 #property .tickCheckbox, .e-view.fluent2-dark #property .tickCheckbox {\n        padding-left: 0px;\n    }\n    .e-view.fluent2-highcontrast #property .tickCheckbox {\n        margin-left: -18px !important;\n    }\n    @media screen and (max-width: 420px) {\n        #tickOffset, #tickHeight, #labelOffset {\n            width: 72%;\n        }\n        #offset, #height, #labelOffsetValue {\n            margin-left: -25px;\n        }\n    }\n\n    @media screen and (min-width: 1200px) and (max-width: 1500px) {\n        #offset, #height, #labelOffsetValue {\n            margin-left: -22px;\n        }\n    }\n\n    .tailwind .labelCheckbox, .tailwind-dark .labelCheckbox{\n        margin-top: 2px;\n    }";
var Labels = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)('0'), offset = _a[0], setOffset = _a[1];
    var _b = (0, react_1.useState)('0'), labelOffsetValue = _b[0], setLabelOffset = _b[1];
    var _c = (0, react_1.useState)('10'), height = _c[0], setHeight = _c[1];
    var _d = (0, react_1.useState)('Major Ticks'), ticksValue = _d[0], setTicksValue = _d[1];
    var gauge = (0, react_1.useRef)(null);
    var tickOffset = (0, react_1.useRef)(null);
    var tickHeight = (0, react_1.useRef)(null);
    var labelOffset = (0, react_1.useRef)(null);
    var lastLabel = (0, react_1.useRef)(null);
    var ticksRef = (0, react_1.useRef)(null);
    var labelPositionRef = (0, react_1.useRef)(null);
    var tickPositionRef = (0, react_1.useRef)(null);
    var isMajorTicks = true;
    var loc = window.location;
    var tickList = [
        { text: 'Major Ticks', value: 'Major Ticks' },
        { text: 'Minor Ticks', value: 'Minor Ticks' },
    ];
    var tickPositionList = [
        { text: 'Inside', value: 'Inside' },
        { text: 'Cross', value: 'Cross' },
        { text: 'Outside', value: 'Outside' }
    ];
    var labelPositionList = [
        { text: 'Outside', value: 'Outside' },
        { text: 'Cross', value: 'Cross' },
        { text: 'Inside', value: 'Inside' }
    ];
    var ticksChange = function () {
        var value = ticksRef.current.value.toString();
        setTicksValue(value);
        var tickProp;
        isMajorTicks = value === 'Major Ticks';
        if (isMajorTicks) {
            tickProp = gauge.current.axes[0].majorTicks;
        }
        else {
            tickProp = gauge.current.axes[0].minorTicks;
        }
        tickPositionRef.current.value = tickProp.position;
        tickOffset.current.value = tickProp.offset.toString();
        tickHeight.current.value = tickProp.height.toString();
        setOffset(tickProp.offset.toString());
        setHeight(tickProp.height.toString());
    };
    var tickPositionChange = function () {
        var value = tickPositionRef.current.value.toString();
        isMajorTicks = ticksValue === 'Major Ticks';
        if (isMajorTicks) {
            gauge.current.axes[0].majorTicks.position = value;
        }
        else {
            gauge.current.axes[0].minorTicks.position = value;
        }
        gauge.current.refresh();
    };
    var labelPositionChange = function () {
        var value = labelPositionRef.current.value.toString();
        gauge.current.axes[0].labelStyle.position = value;
        gauge.current.refresh();
    };
    var load = function (args) {
        // custom code start
        var selectedTheme = loc.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    var ticksOffset = function () {
        var value = +tickOffset.current.value;
        isMajorTicks = ticksValue === 'Major Ticks';
        if (isMajorTicks) {
            gauge.current.axes[0].majorTicks.offset = value;
        }
        else {
            gauge.current.axes[0].minorTicks.offset = value;
        }
        setOffset(String(value));
        gauge.current.refresh();
    };
    var ticksHeight = function () {
        var value = +tickHeight.current.value;
        isMajorTicks = ticksValue === 'Major Ticks';
        if (isMajorTicks) {
            gauge.current.axes[0].majorTicks.height = value;
        }
        else {
            gauge.current.axes[0].minorTicks.height = value;
        }
        setHeight(String(value));
        gauge.current.refresh();
    };
    var labelsOffset = function () {
        var value = +labelOffset.current.value;
        gauge.current.axes[0].labelStyle.offset = value;
        setLabelOffset(String(value));
        gauge.current.refresh();
    };
    var showLastLabel = function () {
        gauge.current.axes[0].showLastLabel = lastLabel.current.checked;
        gauge.current.refresh();
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: 'col-lg-8' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), background: 'transparent', id: 'range-container', ref: gauge },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Annotations] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 210, endAngle: 150, radius: '80%', minimum: 0, maximum: 170, showLastLabel: false, majorTicks: { position: 'Inside', color: '#757575', width: 2, height: 10, interval: 20, offset: 0 }, lineStyle: { width: 2, color: '#9E9E9E' }, minorTicks: { position: 'Inside', color: '#757575', height: 5, width: 2, interval: 10, offset: 0 }, labelStyle: { position: 'Outside', autoAngle: true, offset: 0, font: { fontFamily: 'inherit', size: '10px' } } },
                                React.createElement(ej2_react_circulargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.AnnotationDirective, { content: '<div id="content" style="color:#518C03;font-size:20px;font-family:inherit;font-weight:semibold;margin-left:-12px;margin-top:-12px">145</div>', angle: 0, radius: '0%', zIndex: '1' })),
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 145, radius: '60%', color: '#8BC34A', pointerWidth: 7, animation: { enable: false }, type: "RangeBar", roundedCornerRadius: 10 })))))),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("table", { id: 'property', role: 'none', title: 'Properties', className: 'property-panel-table', style: { width: '95%', overflow: 'hidden' } },
                            React.createElement("tbody", null,
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Ticks ")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "Ticks", width: "100%", index: 0, change: ticksChange.bind(_this), ref: ticksRef, dataSource: tickList, fields: { text: 'text', value: 'value' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Tick Position ")),
                                    React.createElement("td", { style: { width: "50%" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "tickposition", width: "100%", index: 0, change: tickPositionChange.bind(_this), ref: tickPositionRef, dataSource: tickPositionList, fields: { text: 'text', value: 'value' } })))),
                                React.createElement("tr", { style: { height: '50px' } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Label Position ")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "labelposition", width: "100%", index: 0, change: labelPositionChange.bind(_this), ref: labelPositionRef, dataSource: labelPositionList, fields: { text: 'text', value: 'value' } })))),
                                React.createElement("tr", { style: { "height": "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Tick Offset ")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", onChange: ticksOffset.bind(_this), ref: tickOffset, id: "tickOffset", defaultValue: "0", min: "0", max: "50" }))),
                                    React.createElement("td", { style: { width: "10%" } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'offset' }, offset)))),
                                React.createElement("tr", { style: { "height": "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Tick Height ")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", onChange: ticksHeight.bind(_this), ref: tickHeight, id: "tickHeight", defaultValue: "10", min: "1", max: "50" }))),
                                    React.createElement("td", { style: { width: "10%" } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'height' }, height)))),
                                React.createElement("tr", { style: { "height": "50px" } },
                                    React.createElement("td", null,
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, "Label Offset ")),
                                    React.createElement("td", { style: { width: "40%" } },
                                        React.createElement("div", null,
                                            React.createElement("input", { type: "range", onChange: labelsOffset.bind(_this), ref: labelOffset, id: "labelOffset", defaultValue: "0", min: "0", max: "50" }))),
                                    React.createElement("td", { style: { width: "10%" } },
                                        React.createElement("div", { style: { textAlign: 'center', paddingLeft: '0px' } },
                                            React.createElement("span", { id: 'labelOffsetValue' }, labelOffsetValue)))),
                                React.createElement("tr", { style: { "height": "50px" } },
                                    React.createElement("td", { style: { "width": "50%" } },
                                        React.createElement("div", { style: { marginLeft: "-10px", fontSize: "14px" } }, " Show Last Label ")),
                                    React.createElement("td", { style: { "width": "40%" } },
                                        React.createElement("div", { className: 'labelCheckbox tickCheckbox' },
                                            React.createElement(ej2_react_buttons_1.CheckBoxComponent, { change: showLastLabel.bind(_this), ref: lastLabel, id: 'enable', disabled: false, style: { paddingLeft: "0px" } })))))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample demonstrates how to customize the ticks and labels on an axis. The position, offset, and height of the ticks and labels can be changed.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the ticks and labels of an axis in the circular gauge. Labels are units that are used to display the values on the axis. Labels can be customized using ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/' }, "labelStyle"),
                ". Ticks are used to represent values on the axis. Ticks can be customized using ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/' }, "majorTicks"),
                " and ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/' }, "minorTicks"),
                "."),
            React.createElement("p", null,
                "More information on the ticks and labels can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-axes/" }, "documentation section"),
                "."))));
};
exports.default = Labels;
