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
exports.VolumeSettings = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n.container {\n    width: 80px;\n    display: flex;\n    justify-content: center;\n}\n\n@font-face {\n    font-family: 'font-v1';\n    src:\n        url(data:application/x-font-ttf;charset=utf-8;base64,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) format('truetype');\n    font-weight: normal;\n    font-style: normal;\n}\n\n#lineargauge-volume-settings [class^=\"sf-icon-\"],\n#lineargauge-volume-settings [class*=\" sf-icon-\"] {\n    font-family: 'font-v1' !important;\n    color: white;\n    speak: none;\n    font-size: 16px;\n    font-style: normal;\n    font-weight: normal;\n    font-variant: normal;\n    text-transform: none;\n    line-height: 1;\n    -webkit-font-smoothing: antialiased;\n    -moz-osx-font-smoothing: grayscale;\n    margin-left: 40%;\n    margin-top: 70%;\n}\n\n#lineargauge-volume-settings .sf-icon-music:before {\n    content: '\\e701';\n    color: white !important;\n}\n\n#lineargauge-volume-settings .sf-icon-clock:before {\n    content: '\\e702';\n    color: white !important;\n    margin-left: 2px;\n}\n\n#lineargauge-volume-settings .sf-icon-tick:before {\n    content: '\\e704';\n}\n\n#lineargauge-volume-settings .sf-icon-bell:before {\n    content: '\\e706';\n    color: white !important;\n}";
var VolumeSettings = /** @class */ (function (_super) {
    __extends(VolumeSettings, _super);
    function VolumeSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VolumeSettings.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    VolumeSettings.prototype.render = function () {
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: "control-section" },
                    React.createElement("div", { id: 'lineargauge-volume-settings', className: 'container', style: { paddingTop: "12px" } },
                        React.createElement("div", { style: { padding: "6px" } },
                            React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), background: 'transparent', id: 'gaugeone', width: '60px', height: '350px', orientation: 'Vertical', container: { width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent' } },
                                React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                                React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, line: { width: 0 }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { format: 'Music {value} %', font: { size: '0px' } } },
                                        React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                            React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 100, width: 30, color: '#0074E3', type: 'Bar', position: 'Cross', roundedCornerRadius: 15, offset: -15 })))),
                                React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="width: 70px;font-size: 16px;margin-left:63px;margin-top: -31px;">100%</div>', axisIndex: 0, axisValue: 100, x: 0, zIndex: '1', y: 0 }),
                                    React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div class="sf-icon-music" style="width:16px"></div>', axisIndex: 0, axisValue: 11, x: 9, zIndex: '1', y: 1 })))),
                        React.createElement("div", { style: { padding: "6px" } },
                            React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), background: 'transparent', id: 'gaugetwo', width: '60px', height: '350px', orientation: 'Vertical', container: { width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent' } },
                                React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                                React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, line: { width: 0 }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { format: 'Bell {value} %', font: { size: '0px' } } },
                                        React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                            React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 85, width: 30, color: '#0074E3', type: 'Bar', position: 'Cross', roundedCornerRadius: 15, offset: -15 })))),
                                React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="width: 70px;font-size: 16px;margin-left:72px;margin-top: -31px;"> 85%</div>', axisIndex: 0, axisValue: 100, x: 0, zIndex: '1', y: 0 }),
                                    React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div class="sf-icon-bell" style="width:16px"></div>', axisIndex: 0, axisValue: 11, x: 9, zIndex: '1', y: 1 })))),
                        React.createElement("div", { style: { padding: "6px" } },
                            React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { load: this.load.bind(this), background: 'transparent', id: 'gaugethree', width: '60px', height: '350px', orientation: 'Vertical', container: { width: 30, roundedCornerRadius: 15, type: 'RoundedRectangle', border: { width: 1 }, backgroundColor: 'transparent' } },
                                React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations] }),
                                React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 100, line: { width: 0 }, minorTicks: { interval: 10, height: 0 }, majorTicks: { interval: 20, height: 0 }, labelStyle: { format: 'Clock {value} %', font: { size: '0px' } } },
                                        React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                            React.createElement(ej2_react_lineargauge_1.PointerDirective, { value: 65, width: 30, color: '#0074E3', type: 'Bar', position: 'Cross', roundedCornerRadius: 15, offset: -15 })))),
                                React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div style="width: 70px;font-size: 16px;margin-left:70px;margin-top: -31px;">65%</div>', axisIndex: 0, axisValue: 100, x: 0, zIndex: '1', y: 0 }),
                                    React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div class="sf-icon-clock" style="width:16px"></div>', axisIndex: 0, axisValue: 11, x: 7, zIndex: '1', y: 1 }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample demonstrates volume adjustments made for music/video and alarm clock applications.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, you can see how to render and configure a linear gauge to look like a sound tracker. This can be accomplished by combining axis, pointer and annotation."),
                React.createElement("p", null,
                    "More information on the linear gauge can be found in this  ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return VolumeSettings;
}(sample_base_1.SampleBase));
exports.VolumeSettings = VolumeSettings;
