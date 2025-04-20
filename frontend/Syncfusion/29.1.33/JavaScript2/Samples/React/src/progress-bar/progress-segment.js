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
exports.ProgressBarProgressSegment = void 0;
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n\n.linear-parent {\n    text-align: center;\n    width: 75%;\n    margin: auto !important;\n}\n\n.linear-button {\n   text-align: center;\n   padding:2%;\n}\n\n.progressbar-mode {\n    text-align: left;\n    font-family: Roboto-Regular;\n    font-size: 14px;\n    color: #3D3E3C;\n    margin-left: 10px;\n    margin-top: 5%;\n    padding: 0px;\n    top: 20px;\n}\n\n#reLoad {\n    border-radius: 4px;\n    text-transform: capitalize;\n}\n    ";
var ProgressBarProgressSegment = /** @class */ (function (_super) {
    __extends(ProgressBarProgressSegment, _super);
    function ProgressBarProgressSegment() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
        _this.load = function (args) {
            (0, theme_colors_1.loadProgressBarTheme)(args);
        };
        _this.progressLoad = function (args) {
            var selectedTheme = (0, theme_colors_1.loadProgressBarTheme)(args);
            switch (selectedTheme) {
                case 'material':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'fabric':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'bootstrap':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'bootstrap4':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'tailwind':
                case 'tailwind3':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;
                case 'bootstrap-dark':
                case 'fabric-dark':
                case 'material-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'bootstrap5':
                case 'bootstrap5-dark':
                case 'fluent':
                case 'fluent-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'tailwind-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'tailwind3-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                    break;
                case 'material3':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'material3-dark':
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
                default:
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                    break;
            }
        };
        _this.timing = function () {
            if (_this.circularSeg.value >= _this.circularSeg.maximum) {
                clearInterval(_this.timer);
            }
            else {
                _this.circularSeg.value += 20;
                _this.linearSeg.value += 20;
            }
        };
        _this.timer = setInterval(_this.timing, 2500);
        return _this;
    }
    ProgressBarProgressSegment.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "row linear-parent" },
                    React.createElement("div", null,
                        React.createElement("div", { className: "col-lg-12 col-sm-12 progressbar-mode" }),
                        React.createElement("div", { id: "linearSegment" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-linearSegment", ref: function (segment1) { return _this.linearSeg = segment1; }, type: 'Linear', height: '30', width: '70%', value: 40, segmentCount: 50, gapWidth: 5, trackThickness: 15, progressThickness: 15, cornerRadius: 'Square', animation: {
                                    enable: true,
                                    duration: 2000
                                }, load: this.load.bind(this) }))),
                    React.createElement("div", null,
                        React.createElement("div", { className: "col-lg-12 col-sm-12 progressbar-mode" }),
                        React.createElement("div", { id: "circularSegment" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-circularSegment", ref: function (segment2) { return _this.circularSeg = segment2; }, type: 'Circular', height: '200px', width: '200px', value: 40, segmentCount: 50, gapWidth: 5, trackThickness: 15, progressThickness: 15, startAngle: 220, endAngle: 140, cornerRadius: 'Square', animation: {
                                    enable: true,
                                    duration: 2000
                                }, load: this.progressLoad.bind(this) },
                                React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                    React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a segmented progress of a task.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This demo for Progress Bar control shows the segmented progress of a task using ",
                    React.createElement("code", null, "segmentCount"),
                    " and ",
                    React.createElement("code", null, "gapWidth"),
                    " property."))));
    };
    return ProgressBarProgressSegment;
}(sample_base_1.SampleBase));
exports.ProgressBarProgressSegment = ProgressBarProgressSegment;
