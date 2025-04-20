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
exports.BatteryIndicator = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }";
var BatteryIndicator = /** @class */ (function (_super) {
    __extends(BatteryIndicator, _super);
    function BatteryIndicator() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.borderColor = '#E5E7EB';
        return _this;
    }
    BatteryIndicator.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end           
        this.borderColor = args.gauge.theme.indexOf('Dark') > -1 ? 'white' : '#bfbfbf';
        if (args.gauge.theme == 'Bootstrap5Dark' || args.gauge.theme == 'Tailwind3Dark') {
            this.borderColor = "#4b5563";
        }
        if (args.gauge.theme == 'Fluent2HighContrast' || args.gauge.theme == 'FabricDark' || args.gauge.theme == 'BootstrapDark' || args.gauge.theme == 'MaterialDark' || args.gauge.theme == 'HighContrast' || args.gauge.theme == 'Material' || args.gauge.theme == 'Fabric' || args.gauge.theme == 'Bootstrap') {
            this.borderColor = "#bfbfbf";
        }
        if (args.gauge.theme == 'Fluent' || args.gauge.theme == 'Fluent2') {
            this.borderColor = "#EDEBE9";
        }
        if (args.gauge.theme == 'FluentDark' || args.gauge.theme == 'Fluent2Dark' || args.gauge.theme == 'Fluent2HighContrast') {
            this.borderColor = "#292827";
        }
        if (args.gauge.theme == 'Bootstrap5' || args.gauge.theme == 'Tailwind3') {
            this.borderColor = "#E5E7EB";
        }
        args.gauge.annotations[0].content = "<div style=\"width: 16px;height: 37px;border: 5px solid ".concat(this.borderColor, ";margin-left:26px;margin-top:57px;border-radius: 6px;\" />");
    };
    BatteryIndicator.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement("div", { style: { display: 'flex', justifyContent: 'center', alignItems: 'center' } },
                        React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), background: 'transparent', id: 'gauge', orientation: 'Horizontal', width: '200px', container: { width: 58, type: 'RoundedRectangle', border: { width: 5 } } },
                            React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                            React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 60, line: { width: 0 }, minorTicks: { interval: 5, height: 0 }, majorTicks: { interval: 15, height: 0 }, labelStyle: { font: { size: '0px' } } },
                                    React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.PointerDirective, { width: 0 })),
                                    React.createElement(ej2_react_lineargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 3, end: 14, startWidth: 45, endWidth: 45, color: '#66BB6A', offset: 52 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 16, end: 29, startWidth: 45, endWidth: 45, color: '#66BB6A', offset: 52 }),
                                        React.createElement(ej2_react_lineargauge_1.RangeDirective, { start: 31, end: 44, startWidth: 45, endWidth: 45, color: '#66BB6A', offset: 52 })))),
                            React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                                React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { axisIndex: 0, axisValue: 60, x: 0, zIndex: '1', y: 0 }),
                                React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="width: 137px;font-size: 20px;margin-top:-47px;margin-left:147px;color:##000000;">Charged: 75%</div>', axisIndex: 0, axisValue: 0, x: 0, zIndex: '1', y: 0 })))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample shows the battery indicator charged up to 75% by utilizing the linear gauge's functionalities.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a linear gauge to look like a battery indicator. This can be accomplished by combining axis, pointer, multiple ranges, and multiple annotation."),
                React.createElement("p", null,
                    "More information on the linear gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return BatteryIndicator;
}(sample_base_1.SampleBase));
exports.BatteryIndicator = BatteryIndicator;
