"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n         .control-fluid {\n         padding: 0px !important;\n         }\n     #control-container {\n         padding: 0px !important;\n     }\n \n     .progress-bar-parent {\n         margin-top: 8%;\n         text-align: center;\n     }\n \n     .paligncenter {\n         text-align: center;\n     }\n \n     .plabeltxt {\n         font-size: 20px;\n         font-weight: bold;\n     }\n \n     .reload-btn {\n         text-align: center;\n         margin-top: 3%;\n     }\n \n     #reLoad {\n         border-radius: 4px;\n         text-transform: capitalize;\n     }\n     ";
var ProgressBarCustomContents = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var pausePlay = (0, react_1.useRef)(null);
    var annotate = (0, react_1.useRef)(null);
    var downloadProgress = (0, react_1.useRef)(null);
    var clearTimeout1;
    var clearTimeout2;
    var animation = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    var content1 = "<img src=\"src/progress-bar/images/material-pause.svg\" alt=\"Pause Icon\"></img>";
    var content2 = "<img src=\"src/progress-bar/images/material-Download.svg\" alt=\"Download Icon\"></img>";
    var content3 = '<div id="point1" style="font-size:20px;font-weight:bold;color:#b52123;fill:#b52123"><span>80%</span></div>';
    var annotationColors = { fluent: '#0D6EFD', fluentdark: '#0D6EFD', material: '#e91e63', fabric: '#0078D6', bootstrap: '#317ab9', bootstrap4: '#007bff', highcontrast: '#FFD939', tailwind: '#4F46E5', bootstrap5: '#0D6EFD', bootstrap5dark: '#0D6EFD', bootstrapdark: '#9A9A9A', fabricdark: '#9A9A9A', materialdark: '#9A9A9A', tailwinddark: '#6366F1', material3: '#6750A4', material3dark: '#D0BCFF', fluent2: '#0F6CBD', fluent2highcontrast: '#1AEBFF', fluent2dark: '#115EA3', tailwind3: '#4F46E5', tailwind3dark: '#6366F1' };
    var progressLoad = function (args) {
        var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
        if (args.progressBar.element.id === 'label-container') {
            // tslint:disable-next-line:max-line-length
            args.progressBar.annotations[0].content = '<div id="point1" class="plabeltxt" style="color: ' + annotationColors[theme.toLocaleLowerCase().replace(/-/i, '')] + ' "><span>80%</span></div>';
        }
        else if (args.progressBar.element.id === 'download-container') {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + theme.toLocaleLowerCase().replace(/-/i, '') + '-Download.svg" alt="Download Icon"></img>';
        }
        else {
            args.progressBar.annotations[0].content = '<img src="src/progress-bar/images/' + theme.toLocaleLowerCase().replace(/-/i, '') + '-pause.svg" alt="Pause Icon"></img>';
        }
    };
    var reloadClick = function () {
        pausePlay.current.refresh();
        downloadProgress.current.refresh();
        annotate.current.refresh();
    };
    var progressCompleted = function () {
        clearTimeout(clearTimeout1);
        clearTimeout1 = +setTimeout(function () {
            //tslint:disable-next-line
            pausePlay.current.annotations[0].content = '<img src="src/progress-bar/images/' + (pausePlay.current.theme).toLowerCase() + '-Play.svg" alt="Play Icon"></img>';
            pausePlay.current.dataBind();
        }, 2000);
    };
    var progressCompleted2 = function () {
        clearTimeout(clearTimeout2);
        clearTimeout2 = +setTimeout(function () {
            //tslint:disable-next-line
            downloadProgress.current.annotations[0].content = '<img src="src/progress-bar/images/' + (downloadProgress.current.theme).toLowerCase() + '-Tick.svg" alt="Tick Icon"></img>';
            downloadProgress.current.dataBind();
        }, 2000);
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section progress-bar-parent" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 paligncenter" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "label-container", ref: annotate, type: 'Circular', width: '160px', height: '160px', cornerRadius: 'Round', startAngle: 180, endAngle: 180, value: 80, animation: animation, progressCompleted: progressCompleted.bind(_this), load: progressLoad.bind(_this) },
                        React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                        React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content3 })))),
                React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 paligncenter" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "pause-container", ref: pausePlay, type: 'Circular', width: '160px', height: '160px', value: 100, animation: animation, progressCompleted: progressCompleted.bind(_this), load: progressLoad.bind(_this) },
                        React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                        React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content1 })))),
                React.createElement("div", { className: "col-lg-4 col-md-4 col-sm-4 paligncenter" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "download-container", ref: downloadProgress, type: 'Circular', width: '160px', height: '160px', value: 100, enableRtl: false, animation: { enable: true, duration: 2000, delay: 0, }, progressCompleted: progressCompleted2.bind(_this), load: progressLoad.bind(_this) },
                        React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                        React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content2 }))))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 col-md-12 col-12 reload-btn" },
                    React.createElement("button", { onClick: reloadClick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload")))),
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
exports.default = ProgressBarCustomContents;
