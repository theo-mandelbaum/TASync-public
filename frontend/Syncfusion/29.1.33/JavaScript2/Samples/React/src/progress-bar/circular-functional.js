"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n     .annotaion-pro {\n             font-family: Roboto-Regular;\n             font-size: 20px;\n             color: #1B1C1A;\n             letter-spacing: 0.01px;\n         }\n         .progress-bar-parent {\n             margin-top: 8%;\n             text-align: center;\n         }\n         .progress-text {\n             display: inline-flex;\n             margin: auto;\n         }\n         .progress-text-align {\n             font-family: Roboto-Regular;\n             font-size: 12px;\n             color: #3D3E3C;\n             letter-spacing: 0;\n             margin: auto;\n         }\n \n         #control-container {\n             padding: 0px !important;\n         }\n \n         .progress-container-align {\n             text-align: center;\n         }\n \n         .reload-btn {\n             text-align: center;\n         }\n \n         #reLoad {\n             border-radius: 4px;\n             text-transform: capitalize;\n             margin-top: 3%;\n         }\n \n         .progress-container {\n             /*height: -webkit-fill-available; */\n             display: inline-flex;\n         }\n     ";
var ProgressBarDefault = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var circluar = (0, react_1.useRef)(null);
    var rtl = (0, react_1.useRef)(null);
    var track = (0, react_1.useRef)(null);
    var rounded = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)({ color: "" }), style = _a[0], setStyle = _a[1];
    var animation = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    var replayClick = function () {
        circluar.current.refresh();
        rtl.current.refresh();
        track.current.refresh();
        rounded.current.refresh();
    };
    var progressLoad = function (args) {
        (0, theme_colors_1.loadProgressBarTheme)(args);
        if (args.progressBar.theme === 'HighContrast' || args.progressBar.theme === 'Bootstrap5Dark' || args.progressBar.theme === 'BootstrapDark' || args.progressBar.theme === 'FabricDark'
            || args.progressBar.theme === 'TailwindDark' || args.progressBar.theme === 'Tailwind3Dark' || args.progressBar.theme === 'MaterialDark' || args.progressBar.theme === 'FluentDark' || args.progressBar.theme === 'Material3Dark' || args.progressBar.theme === 'Fluent2Dark' || args.progressBar.theme === 'Fluent2HighContrast') {
            setStyle({ color: "White" });
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section progress-bar-parent" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "row progress-container-align" },
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "circular-container", ref: circluar, type: 'Circular', width: '160px', height: '160px', enableRtl: false, startAngle: 180, endAngle: 180, value: 100, animation: animation, load: progressLoad.bind(_this) })),
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                            React.createElement("div", { className: "progress-text-align", style: style }, "Determinate")))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "row progress-container-align" },
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "rtl-container", ref: rtl, type: 'Circular', width: '160px', height: '160px', secondaryProgress: 90, value: 70, animation: animation, load: progressLoad.bind(_this) })),
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                            React.createElement("div", { className: "progress-text-align", style: style }, "Buffer ")))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "row progress-container-align" },
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "track-container", ref: track, type: 'Circular', width: '160px', height: '160px', minimum: 0, maximum: 100, segmentCount: 4, value: 100, animation: animation, load: progressLoad.bind(_this) })),
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                            React.createElement("div", { className: "progress-text-align", style: style }, "Segment")))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "row progress-container-align" },
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "rounded-container", ref: rounded, type: 'Circular', width: '160px', height: '160px', cornerRadius: 'Round', isIndeterminate: true, value: 20, animation: animation, load: progressLoad.bind(_this) })),
                        React.createElement("div", { className: "col-lg-12 col-md-12 col-12 progress-text" },
                            React.createElement("div", { className: "progress-text-align", style: style }, "Indeterminate"))))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 col-md-12 col-12 reload-btn" },
                    React.createElement("button", { onClick: replayClick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload")))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a circular progress bar with determinate and indeterminate states, segments and buffer value.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The sample shows the determinate and indeterminate states, buffer and segments of circular progress bar."))));
};
exports.default = ProgressBarDefault;
