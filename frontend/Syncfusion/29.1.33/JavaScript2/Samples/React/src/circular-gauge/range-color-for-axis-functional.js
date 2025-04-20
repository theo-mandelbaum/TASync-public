"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var RangeColorAxis = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    return (React.createElement("main", null,
        React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: load.bind(_this), animationDuration: 2000, id: 'range-color', background: 'transparent' },
                    React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                        React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 0, endAngle: 0, radius: '100%', direction: 'AntiClockWise', majorTicks: { position: 'Outside', width: 1, height: 25, interval: 10, useRangeColor: true }, lineStyle: { width: 0 }, minorTicks: { position: 'Outside', width: 1, height: 8, interval: 2, useRangeColor: true }, labelStyle: { offset: 2, position: 'Outside', useRangeColor: true, hiddenLabel: 'First', font: { fontFamily: 'inherit' } } },
                            React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                React.createElement(ej2_react_circulargauge_1.PointerDirective, { radius: '0%', cap: { radius: 0 } })),
                            React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 35, radius: '90%', color: '#F8A197', startWidth: 55, endWidth: 55 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 35, end: 70, radius: '90%', color: '#C45072', startWidth: 55, endWidth: 55 }),
                                React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 70, end: 100, radius: '90%', color: '#1B679F', startWidth: 55, endWidth: 55 }))))))),
        React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
            React.createElement("p", null, "This sample shows the basic rendering of the circular gauge, which includes an axis and a range. Here, the appropriate range color is applied to its respective axis labels, minor ticks, and major ticks.")),
        React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the range and axis in the circular gauge with the same color. To accomplish this, set the ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/#userangecolor' }, "useRangeColor"),
                " property in ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/labelModel/' }, "labelStyle"),
                ", ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/' }, "majorTicks"),
                " and ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tickModel/' }, "minorTicks"),
                "  to ",
                React.createElement("b", null, "true"),
                "."))));
};
exports.default = RangeColorAxis;
