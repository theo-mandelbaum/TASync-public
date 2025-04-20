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
exports.Tooltip = void 0;
var React = require("react");
var ej2_react_lineargauge_1 = require("@syncfusion/ej2-react-lineargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Tooltip.prototype.tooltipRender = function (args) {
        args.content = (args.axis.visibleRange.max === 25) ? Number(args.content).toFixed(1) + ' cm' : Number(args.content).toFixed(1) + ' in';
    };
    Tooltip.prototype.gaugeLoad = function (args) {
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        if (args.gauge.theme.toLowerCase().indexOf('dark') > 1 || args.gauge.theme.toLowerCase() === 'highcontrast' || args.gauge.theme.toLowerCase() === 'fluent2-highcontrast') {
            args.gauge.annotations[0].content = '<div id="first"><h1 style="font-size:15px; color: #DADADA">Inches</h1></div>';
            args.gauge.annotations[1].content = '<div id="second"><h1 style="font-size:15px; color: #DADADA">Centimeters</h1></div>';
        }
        var width = Number(document.getElementById('tooltipContainer').offsetWidth);
        if (width < 500) {
            args.gauge.axes[1].majorTicks.interval = 2;
            args.gauge.axes[1].minorTicks.interval = 1;
            args.gauge.orientation = 'Vertical';
            args.gauge.annotations[0].x = -57;
            args.gauge.annotations[0].y = -30;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = -45;
        }
        else {
            args.gauge.axes[1].majorTicks.interval = 1;
            args.gauge.axes[1].minorTicks.interval = 0.2;
            args.gauge.orientation = 'Horizontal';
            args.gauge.annotations[0].x = 35;
            args.gauge.annotations[0].y = -58;
            args.gauge.annotations[1].x = 50;
            args.gauge.annotations[1].y = 52;
        }
    };
    Tooltip.prototype.gaugeLoaded = function (args) {
        if (document.getElementById('tooltipContainer')) {
            if (args.gauge.availableSize.width < 500) {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = 'rotate(270deg)';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = 'rotate(270deg)';
            }
            else {
                document.getElementById('tooltipContainer_Annotation_0').style.transform = '';
                document.getElementById('tooltipContainer_Annotation_1').style.transform = '';
            }
        }
    };
    Tooltip.prototype.labelRender = function (args) {
        if (args.axis.visibleRange.min === args.value || args.axis.visibleRange.max === args.value) {
            args.text = '';
        }
    };
    Tooltip.prototype.gaugeResized = function (args) {
        if (args.currentSize.width < 500) {
            this.gaugeInstance.axes[1].majorTicks.interval = 2;
            this.gaugeInstance.axes[1].minorTicks.interval = 1;
            this.gaugeInstance.orientation = 'Vertical';
            this.gaugeInstance.annotations[0].x = -57;
            this.gaugeInstance.annotations[0].y = -30;
            this.gaugeInstance.annotations[1].x = 50;
            this.gaugeInstance.annotations[1].y = -45;
        }
        else {
            this.gaugeInstance.axes[1].majorTicks.interval = 1;
            this.gaugeInstance.axes[1].minorTicks.interval = 0.2;
            this.gaugeInstance.orientation = 'Horizontal';
            this.gaugeInstance.annotations[0].x = 35;
            this.gaugeInstance.annotations[0].y = -58;
            this.gaugeInstance.annotations[1].x = 50;
            this.gaugeInstance.annotations[1].y = 52;
        }
    };
    Tooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_lineargauge_1.LinearGaugeComponent, { id: 'tooltipContainer', ref: function (gauge) { return _this.gaugeInstance = gauge; }, background: 'transparent', orientation: 'Horizontal', axisLabelRender: this.labelRender.bind(this), load: this.gaugeLoad.bind(this), loaded: this.gaugeLoaded.bind(this), resized: this.gaugeResized.bind(this), tooltipRender: this.tooltipRender.bind(this), container: { width: 140, border: { width: 2, color: '#a6a6a6' } }, tooltip: { enable: true, showAtMousePosition: true, textStyle: { fontFamily: 'inherit' } } },
                        React.createElement(ej2_react_lineargauge_1.Inject, { services: [ej2_react_lineargauge_1.Annotations, ej2_react_lineargauge_1.GaugeTooltip] }),
                        React.createElement(ej2_react_lineargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { minimum: 0, maximum: 10, majorTicks: { interval: 1, height: 20, color: '#9E9E9E' }, minorTicks: { interval: 0.2, height: 10, color: '#9E9E9E' }, line: { offset: 140, color: '#a6a6a6' }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 5.4, color: '#ff66b3', offset: 15 }))),
                            React.createElement(ej2_react_lineargauge_1.AxisDirective, { opposedPosition: true, minimum: 0, maximum: 25, majorTicks: { interval: 1, height: 20, color: '#9E9E9E' }, minorTicks: { interval: 0.2, height: 10, color: '#9E9E9E' }, line: { offset: -140, color: '#a6a6a6' }, labelStyle: { font: { fontFamily: 'inherit' } } },
                                React.createElement(ej2_react_lineargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_lineargauge_1.PointerDirective, { type: 'Bar', value: 16.5, color: '#4d94ff', offset: -15 })))),
                        React.createElement(ej2_react_lineargauge_1.AnnotationsDirective, null,
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="first"><h1 style="font-size:15px;color:#686868;">Inches</h1></div>', axisIndex: 0, axisValue: 5.4, x: 35, y: -58, zIndex: '1' }),
                            React.createElement(ej2_react_lineargauge_1.AnnotationDirective, { content: '<div id="second"><h1 style="font-size:15px;color:#686868;">Centimeters</h1></div>', axisIndex: 1, axisValue: 16.5, x: 50, y: 52, zIndex: '1' }))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Linear Gauge sample" },
                React.createElement("p", null, "This sample depicts the linear gauge as a measuring scale and shows the tooltip in the linear gauge.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Linear Gauge features demonstrated in this sample" },
                React.createElement("p", null, "The tooltip is used to track the current value that is closest to the mouse position or touch contact. When using a touch-enabled device, the tooltip is displayed by hovering or tapping."),
                React.createElement("p", null,
                    "More information about tooltip can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/linear-gauge/user-interaction/#tooltip" }, "documentation section"),
                    "."))));
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
