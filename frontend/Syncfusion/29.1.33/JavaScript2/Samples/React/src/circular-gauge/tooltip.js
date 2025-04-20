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
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }\n    #templateWrap img {\n        border-radius: 30px;\n        width: 30px;\n        height: 30px;\n        margin: 0 auto;\n    }\n\t #templateWrap {\n        background: #fff;\n        padding: 3px;\n        border-radius: 2px;\n    }\n    #templateWrap .des {\n        float: right;\n        padding-left: 10px;\n        line-height: 30px;\n    }";
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Tooltip.prototype.onChartLoad = function (args) {
        document.getElementById('tooltip-container').setAttribute('title', '');
    };
    ;
    Tooltip.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Tooltip.prototype.dragEnd = function (args) {
        if (args.currentValue >= 0 && args.currentValue <= 50) {
            args.pointer.color = "#3A5DC8";
            args.pointer.cap.border.color = "#3A5DC8";
        }
        else {
            args.pointer.color = "#33BCBD";
            args.pointer.cap.border.color = "#33BCBD";
        }
        args.pointer.value = args.currentValue;
        args.pointer.animation.enable = false;
        this.gauge.refresh();
    };
    ;
    Tooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section row' },
                    React.createElement("div", { className: 'col-lg-12' },
                        React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { background: 'transparent', animationDuration: 2000, loaded: this.onChartLoad.bind(this), dragEnd: this.dragEnd.bind(this), id: 'tooltip-container', ref: function (gauge) { return _this.gauge = gauge; }, enablePointerDrag: true, load: this.load.bind(this), tooltip: {
                                enable: true,
                                type: ['Range', 'Pointer'],
                                showAtMousePosition: true,
                                format: 'Current Value:  {value}',
                                enableAnimation: false,
                                textStyle: {
                                    size: '13px',
                                    fontFamily: 'inherit'
                                },
                                rangeSettings: {
                                    showAtMousePosition: true, format: "Start Value: {start} <br/> End Value: {end}", textStyle: {
                                        size: '13px',
                                        fontFamily: 'inherit'
                                    }
                                }
                            } },
                            React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.GaugeTooltip] }),
                            React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                                React.createElement(ej2_react_circulargauge_1.AxisDirective, { startAngle: 240, endAngle: 120, radius: '90%', minimum: 0, maximum: 120, majorTicks: {
                                        color: 'white', offset: -4, height: 10
                                    }, lineStyle: { width: 0 }, minorTicks: {
                                        width: 0
                                    }, labelStyle: {
                                        useRangeColor: true, font: { fontFamily: 'inherit' }
                                    } },
                                    React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 70, radius: '60%', cap: {
                                                radius: 10, border: { color: '#33BCBD', width: 5 }
                                            }, animation: {
                                                enable: true, duration: 1500
                                            }, color: '#33BCBD' })),
                                    React.createElement(ej2_react_circulargauge_1.RangesDirective, null,
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 0, end: 50, radius: '102%', color: '#3A5DC8', startWidth: 10, endWidth: 10 }),
                                        React.createElement(ej2_react_circulargauge_1.RangeDirective, { start: 50, end: 120, radius: '102%', color: '#33BCBD', startWidth: 10, endWidth: 10 })))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample helps in visualizing the tooltip of the pointer and the range in a circular gauge.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null,
                    "In this example, you can see how to display the tooltip for the pointer and the range in a circular gauge. The ",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/api/circular-gauge/tooltipSettingsModel/' }, "tooltip"),
                    " settings is used to enable and customize the tooltip. To see the tooltip in action, hover your mouse over the pointer or the range, or tap them on touch-enabled devices."),
                React.createElement("p", null,
                    "More information on the tooltip can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/gauge-user-interaction/" }, "documentation section"),
                    "."))));
    };
    return Tooltip;
}(sample_base_1.SampleBase));
exports.Tooltip = Tooltip;
