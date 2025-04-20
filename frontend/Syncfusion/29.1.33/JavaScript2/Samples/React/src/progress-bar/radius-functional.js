"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n         .control-fluid {\n         padding: 0px !important;\n         }\n    #control-container {\n         padding: 0px !important;\n     }\n    .progress-bar-parent {\n        margin-top: 8%;\n        text-align: center;\n    }\n    .progress-container-align {\n        text-align: center;\n    }\n \n     #reLoad {\n         border-radius: 4px;\n         text-transform: capitalize;\n         margin-top: 3%;\n     }\n \n     .reload-btn {\n         text-align: center;\n     }\n     #reLoad {\n         border-radius: 4px;\n         text-transform: capitalize;\n         margin-top: 3%;\n     }\n     ";
var ProgressBarRadius = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var fullBackground = (0, react_1.useRef)(null);
    var outerRadius = (0, react_1.useRef)(null);
    var onRadius = (0, react_1.useRef)(null);
    var pie = (0, react_1.useRef)(null);
    var animation = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    var replayClick = function () {
        fullBackground.current.refresh();
        outerRadius.current.refresh();
        onRadius.current.refresh();
        pie.current.refresh();
    };
    var content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#ffffff;fill:#ffffff"><span>60%</span></div>';
    var progressLoad = function (args) {
        var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
        if (args.progressBar.element.id === 'full-background') {
            switch (theme) {
                case 'Material':
                    args.progressBar.trackColor = '#f8c2d4';
                    args.progressBar.progressColor = '#e91e63';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                    break;
                case 'Fabric':
                    args.progressBar.progressColor = '#0078D6';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                    break;
                case 'Bootstrap':
                    args.progressBar.progressColor = '#317ab9';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                    break;
                case 'Tailwind':
                case 'Tailwind3':
                    args.progressBar.progressColor = '#4F46E5';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                    break;
                case 'HighContrast':
                    args.progressBar.progressColor = '#FFD939';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:20px;font-weight:bold;color:#FFD939;"><span>60%</span></div>';
                    break;
                case 'BootstrapDark':
                case 'Fabricdark':
                case 'MaterialDark':
                    args.progressBar.progressColor = '#9A9A9A';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                    break;
                case 'TailwindDark':
                    args.progressBar.progressColor = '#22D3EE';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                    break;
                case 'Tailwind3Dark':
                    args.progressBar.progressColor = '#6366F1';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                    break;
                case 'Bootstrap4':
                    args.progressBar.progressColor = '#007bff';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                    break;
                case 'Bootstrap5':
                case 'Bootstrap5Dark':
                case 'Fluent':
                case 'FluentDark':
                    args.progressBar.progressColor = '#0D6EFD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                    break;
                case 'Material3':
                    args.progressBar.progressColor = '#6750A4';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                    break;
                case 'Material3Dark':
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
                case 'Fluent2':
                    args.progressBar.progressColor = '#0F6CBD';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                    break;
                case 'Fluent2HighContrast':
                    args.progressBar.progressColor = '#1AEBFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                    break;
                case 'Fluent2Dark':
                    args.progressBar.progressColor = '#115EA3';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                    break;
                default:
                    args.progressBar.progressColor = '#D0BCFF';
                    args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                    break;
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section progress-bar-parent" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container", style: { alignContent: 'center' } },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "full-background", ref: fullBackground, type: 'Circular', width: '160px', height: '160px', cornerRadius: 'Round', enableRtl: false, radius: '100%', innerRadius: '190%', progressThickness: 10, trackThickness: 80, value: 60, animation: animation, load: progressLoad.bind(_this) },
                        React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                        React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content })))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container", style: { alignContent: 'center' } },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "outer-radius", ref: outerRadius, type: 'Circular', width: '160px', height: '160px', value: 90, innerRadius: '72', progressThickness: 8, cornerRadius: 'Round', animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container", style: { alignContent: 'center' } },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "on-radius", ref: onRadius, type: 'Circular', width: '160px', height: '160px', value: 90, trackThickness: 3, progressThickness: 8, animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container", style: { alignContent: 'center' } },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "pie", ref: pie, type: 'Circular', width: '160px', height: '160px', value: 70, enablePieProgress: true, animation: animation, load: progressLoad.bind(_this) }))),
            React.createElement("div", { id: "replay-progressbar", className: "col-lg-12 col-md-12 col-12 reload-btn" },
                React.createElement("button", { onClick: replayClick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a circular progress bar with customization options like radius, inner-radius, pie progress, track and progress thickness.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This demo for Essential",
                React.createElement("sup", null, "\u00AE"),
                " JS2 Progress Bar control shows the customizing options for radius, inner-radius, pie progress, track and progress thickness."))));
};
exports.default = ProgressBarRadius;
