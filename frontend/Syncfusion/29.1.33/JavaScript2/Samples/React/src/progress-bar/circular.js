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
exports.ProgressBarDefault = void 0;
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n    .annotaion-pro {\n            font-family: Roboto-Regular;\n            font-size: 20px;\n            color: #1B1C1A;\n            letter-spacing: 0.01px;\n        }\n        .progress-bar-parent {\n            margin-top: 8%;\n            text-align: center;\n        }\n        .progress-text {\n            display: inline-flex;\n            margin: auto;\n        }\n        .progress-text-align {\n            font-family: Roboto-Regular;\n            font-size: 12px;\n            color: #3D3E3C;\n            letter-spacing: 0;\n            margin: auto;\n        }\n\n        #control-container {\n            padding: 0px !important;\n        }\n\n        .progress-container-align {\n            text-align: center;\n        }\n\n        .reload-btn {\n            text-align: center;\n        }\n\n        #reLoad {\n            border-radius: 4px;\n            text-transform: capitalize;\n            margin-top: 3%;\n        }\n\n        .progress-container {\n            /*height: -webkit-fill-available; */\n            display: inline-flex;\n        }\n    ";
var ProgressBarDefault = /** @class */ (function (_super) {
    __extends(ProgressBarDefault, _super);
    function ProgressBarDefault() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>';
        _this.annotationColors = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#FFD939'];
        _this.progressLoad = function (args) {
            var div = document.getElementsByClassName('progress-text-align');
            (0, theme_colors_1.loadProgressBarTheme)(args);
            if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
                || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark') {
                for (var i = 0; i < div.length; i++) {
                    div[i].setAttribute('style', 'color:white');
                }
            }
        };
        return _this;
    }
    ProgressBarDefault.prototype.replayClick = function () {
        this.circluar.refresh();
        this.rtl.refresh();
        this.track.refresh();
        this.rounded.refresh();
    };
    ProgressBarDefault.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section progress-bar-parent" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "row progress-container-align" },
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                                React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "circular-container", ref: function (progressbar1) { return _this.circluar = progressbar1; }, type: 'Circular', width: '160px', height: '160px', enableRtl: false, startAngle: 180, endAngle: 180, value: 100, animation: {
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }, load: this.progressLoad.bind(this) })),
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                                React.createElement("div", { className: "progress-text-align" }, "Determinate")))),
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "row progress-container-align" },
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                                React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "rtl-container", ref: function (progressbar2) { return _this.rtl = progressbar2; }, type: 'Circular', width: '160px', height: '160px', secondaryProgress: 90, value: 70, animation: {
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }, load: this.progressLoad.bind(this) })),
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                                React.createElement("div", { className: "progress-text-align" }, "Buffer ")))),
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "row progress-container-align" },
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                                React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "track-container", ref: function (progressbar3) { return _this.track = progressbar3; }, type: 'Circular', width: '160px', height: '160px', minimum: 0, maximum: 100, segmentCount: 4, value: 100, animation: {
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }, load: this.progressLoad.bind(this) })),
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                                React.createElement("div", { className: "progress-text-align" }, "Segment")))),
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "row progress-container-align" },
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                                React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "rounded-container", ref: function (progressbar4) { return _this.rounded = progressbar4; }, type: 'Circular', width: '160px', height: '160px', cornerRadius: 'Round', isIndeterminate: true, value: 20, animation: {
                                        enable: true,
                                        duration: 2000,
                                        delay: 0,
                                    }, load: this.progressLoad.bind(this) })),
                            React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                                React.createElement("div", { className: "progress-text-align" }, "Indeterminate"))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-12 col-md-12 col-12 reload-btn" },
                        React.createElement("button", { onClick: this.replayClick.bind(this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a circular progress bar with determinate and indeterminate states, segments and buffer value.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The sample shows the determinate and indeterminate states, buffer and segments of circular progress bar."))));
    };
    return ProgressBarDefault;
}(sample_base_1.SampleBase));
exports.ProgressBarDefault = ProgressBarDefault;
