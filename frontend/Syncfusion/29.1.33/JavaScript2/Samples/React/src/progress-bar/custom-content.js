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
exports.ProgressBarCustomContents = void 0;
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n        .control-fluid {\n\t\tpadding: 0px !important;\n        }\n    #control-container {\n        padding: 0px !important;\n    }\n\n    .progress-bar-parent {\n        margin-top: 8%;\n        text-align: center;\n    }\n\n    .paligncenter {\n        text-align: center;\n    }\n\n    .plabeltxt {\n        font-size: 20px;\n        font-weight: bold;\n    }\n\n    .reload-btn {\n        text-align: center;\n        margin-top: 3%;\n    }\n\n    #reLoad {\n        border-radius: 4px;\n        text-transform: capitalize;\n    }\n    ";
var ProgressBarCustomContents = /** @class */ (function (_super) {
    __extends(ProgressBarCustomContents, _super);
    function ProgressBarCustomContents() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.content1 = "<img src=\"src/progress-bar/images/material-pause.svg\" alt=\"Pause Icon\"></img>";
        _this.content2 = "<img src=\"src/progress-bar/images/material-Download.svg\" alt=\"Download Icon\"></img>";
        _this.content3 = '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>';
        _this.annotationColors = { fluent: '#0D6EFD', fluentdark: '#0D6EFD', material: '#e91e63', fabric: '#0078D6', bootstrap: '#317ab9', bootstrap4: '#007bff', highcontrast: '#FFD939', tailwind: '#4F46E5', bootstrap5: '#0D6EFD', bootstrap5dark: '#0D6EFD', bootstrapdark: '#9A9A9A', fabricdark: '#9A9A9A', materialdark: '#9A9A9A', tailwinddark: '#6366F1', material3: '#6750A4', material3dark: '#D0BCFF', tailwind3: '#4F46E5', tailwind3dark: '#6366F1' };
        _this.progressLoad = function (args) {
            var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
            if (args.progressBar.element.id === 'label-container') {
                // tslint:disable-next-line:max-line-length
                args.progressBar.annotations[0].content = '<div id="point1" class="plabeltxt" style="color: ' + _this.annotationColors[theme.toLocaleLowerCase().replace(/-/i, '')] + ' "><span>80%</span></div>';
            }
            else if (args.progressBar.element.id === 'download-container') {
                args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + theme.toLocaleLowerCase().replace(/-/i, '') + '-Download.svg" alt="Download Icon"></img>';
            }
            else {
                args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + theme.toLocaleLowerCase().replace(/-/i, '') + '-pause.svg" alt="Pause Icon"></img>';
            }
        };
        _this.progressCompleted = function (args) {
            clearTimeout(_this.clearTimeout1);
            _this.clearTimeout1 = +setTimeout(function () {
                //tslint:disable-next-line
                _this.pausePlay.annotations[0].content = '<img src="src/progress-bar/images/' + (_this.pausePlay.theme).toLowerCase() + '-Play.svg" alt="Play Icon"></img>';
                _this.pausePlay.dataBind();
            }, 2000);
        };
        _this.progressCompleted2 = function (args) {
            clearTimeout(_this.clearTimeout2);
            _this.clearTimeout2 = +setTimeout(function () {
                //tslint:disable-next-line
                _this.downloadProgress.annotations[0].content = '<img src="src/progress-bar/images/' + (_this.downloadProgress.theme).toLowerCase() + '-Tick.svg" alt="Tick Icon"></img>';
                _this.downloadProgress.dataBind();
            }, 2000);
        };
        return _this;
    }
    ProgressBarCustomContents.prototype.reloadClick = function () {
        this.pausePlay.refresh();
        this.downloadProgress.refresh();
        this.annotate.refresh();
    };
    ProgressBarCustomContents.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section progress-bar-parent" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 paligncenter" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "label-container", ref: function (annotation) { return _this.annotate = annotation; }, type: 'Circular', width: '160px', height: '160px', cornerRadius: 'Round', startAngle: 180, endAngle: 180, value: 80, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, progressCompleted: this.progressCompleted.bind(this), load: this.progressLoad.bind(this) },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content3 })))),
                    React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 paligncenter" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "pause-container", ref: function (pausePlay) { return _this.pausePlay = pausePlay; }, type: 'Circular', width: '160px', height: '160px', value: 100, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, progressCompleted: this.progressCompleted.bind(this), load: this.progressLoad.bind(this) },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content1 })))),
                    React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 paligncenter" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "download-container", ref: function (downloadProgress) { return _this.downloadProgress = downloadProgress; }, type: 'Circular', width: '160px', height: '160px', value: 100, enableRtl: false, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, progressCompleted: this.progressCompleted2.bind(this), load: this.progressLoad.bind(this) },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content2 }))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-12 col-md-12 col-12 reload-btn" },
                        React.createElement("button", { onClick: this.reloadClick.bind(this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample illustrates a circular progress bar to show ",
                    React.createElement("code", null, "progressCompleted"),
                    " event with ",
                    React.createElement("code", null, "annotation"),
                    ".")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This demo for Essential",
                    React.createElement("sup", null, "\u00AE"),
                    " JS2 Progress Bar control shows the progress bar with custom content with the help of annotation."))));
    };
    return ProgressBarCustomContents;
}(sample_base_1.SampleBase));
exports.ProgressBarCustomContents = ProgressBarCustomContents;
