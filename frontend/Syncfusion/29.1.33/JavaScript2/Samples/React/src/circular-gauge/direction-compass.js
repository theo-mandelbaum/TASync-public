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
exports.Direction = void 0;
var React = require("react");
var ej2_react_circulargauge_1 = require("@syncfusion/ej2-react-circulargauge");
var sample_base_1 = require("../common/sample-base");
var SAMPLE_CSS = "\n    .control-fluid {\n\t\tpadding: 0px !important;\n    }";
var Direction = /** @class */ (function (_super) {
    __extends(Direction, _super);
    function Direction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.pointerLinearGradient = {
            startValue: '0%',
            endValue: '100%',
            colorStop: [
                { color: '#ff6b78', offset: '0%', opacity: 0.9 },
                { color: '#e20a22', offset: '70%', opacity: 0.9 }
            ]
        };
        return _this;
    }
    Direction.prototype.onLabelRender = function (args) {
        args.text = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW', ''][args.value];
    };
    ;
    Direction.prototype.load = function (args) {
        // custom code start
        var selectedTheme = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.gauge.theme = ((selectedTheme.charAt(0).toUpperCase() +
            selectedTheme.slice(1)).replace(/-dark/i, 'Dark').replace(/-high/i, 'High').replace(/contrast/i, 'Contrast').replace(/5.3/i, '5'));
        // custom code end
    };
    Direction.prototype.render = function () {
        var _this = this;
        return (React.createElement("main", null,
            React.createElement("div", { className: 'control-pane' },
                React.createElement("style", null, SAMPLE_CSS),
                React.createElement("div", { className: 'control-section' },
                    React.createElement(ej2_react_circulargauge_1.CircularGaugeComponent, { load: this.load.bind(this), id: 'direction-gauge', background: 'transparent', ref: function (gauge) { return _this.gauge = gauge; }, axisLabelRender: this.onLabelRender.bind(this) },
                        React.createElement(ej2_react_circulargauge_1.Inject, { services: [ej2_react_circulargauge_1.Gradient] }),
                        React.createElement(ej2_react_circulargauge_1.AxesDirective, null,
                            React.createElement(ej2_react_circulargauge_1.AxisDirective, { radius: '80%', startAngle: 0, endAngle: 360, minimum: 0, maximum: 8, majorTicks: {
                                    height: 15,
                                    interval: 1
                                }, lineStyle: { width: 20, color: '#E0E0E0' }, minorTicks: {
                                    height: 10,
                                    interval: 0.5
                                }, labelStyle: {
                                    font: {
                                        fontFamily: 'inherit'
                                    },
                                    autoAngle: true,
                                    offset: 10,
                                    hiddenLabel: 'Last'
                                } },
                                React.createElement(ej2_react_circulargauge_1.PointersDirective, null,
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 7, radius: '50%', color: '#e20a22', pointerWidth: 30, linearGradient: this.pointerLinearGradient, cap: {
                                            radius: 15,
                                            color: '#ffffff',
                                            border: {
                                                width: 0
                                            }
                                        }, animation: {
                                            enable: false
                                        } }),
                                    React.createElement(ej2_react_circulargauge_1.PointerDirective, { value: 3, radius: '50%', color: '#f7f7f7', pointerWidth: 30, cap: {
                                            radius: 15, color: '#ffffff', border: {
                                                width: 0
                                            }
                                        }, animation: {
                                            enable: false
                                        } }))))))),
            React.createElement("section", { id: "action-description", "aria-label": "Description of Circular Gauge sample" },
                React.createElement("p", null, "This sample demonstrates how to create a direction compass by modifying the circular gauge's functionalities to meet the needs of the user.")),
            React.createElement("section", { id: "description", "aria-label": "Description of the Circular Gauge features demonstrated in this sample" },
                React.createElement("p", null, "In this example, a direction compass has been depicted by adding a couple of needle pointers in the circular gauge and customizing labels to show the direction."),
                React.createElement("p", null,
                    "More information on the circular gauge can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/circular-gauge/getting-started/" }, "documentation section"),
                    "."))));
    };
    return Direction;
}(sample_base_1.SampleBase));
exports.Direction = Direction;
