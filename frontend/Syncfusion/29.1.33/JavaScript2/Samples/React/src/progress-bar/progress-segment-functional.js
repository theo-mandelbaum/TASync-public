"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n #control-container {\n     padding: 0px !important;\n }\n \n .linear-parent {\n     text-align: center;\n     width: 75%;\n     margin: auto !important;\n }\n \n .linear-button {\n    text-align: center;\n    padding:2%;\n }\n \n .progressbar-mode {\n     text-align: left;\n     font-family: Roboto-Regular;\n     font-size: 14px;\n     color: #3D3E3C;\n     margin-left: 10px;\n     margin-top: 5%;\n     padding: 0px;\n     top: 20px;\n }\n \n #reLoad {\n     border-radius: 4px;\n     text-transform: capitalize;\n }\n     ";
var ProgressBarProgressSegment = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var circularSeg = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)(40), value = _a[0], setValue = _a[1];
    var content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
    var animation = {
        enable: true,
        duration: 2000,
    };
    var load = function (args) {
        (0, theme_colors_1.loadProgressBarTheme)(args);
    };
    var progressLoad = function (args) {
        (0, theme_colors_1.loadProgressBarTheme)(args);
        switch (args.progressBar.theme) {
            case 'Material':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#e91e63"><span></span></div>';
                break;
            case 'Fabric':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6"><span></span></div>';
                break;
            case 'Bootstrap':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#317ab9"><span></span></div>';
                break;
            case 'Bootstrap4':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#007bff"><span></span></div>';
                break;
            case 'Tailwind':
            case 'Tailwind3':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#4F46E5"><span></span></div>';
                break;
            case 'BootstrapDark':
            case 'FabricDark':
            case 'MaterialDark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#9A9A9A"><span></span></div>';
                break;
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
            case 'Fluent':
            case 'FluentDark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0D6EFD"><span></span></div>';
                break;
            case 'TailwindDark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#22D3EE"><span></span></div>';
                break;
            case 'Tailwind3Dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6366F1"><span></span></div>';
                break;
            case 'Material3':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#6750A4"><span></span></div>';
                break;
            case 'Material3Dark':
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#D0BCFF"><span></span></div>';
                break;
            case "Fluent2":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0F6CBD"><span></span></div>';
                break;
            case "Fluent2Dark":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#115EA3"><span></span></div>';
                break;
            case "Fluent2HighContrast":
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#1AEBFF"><span></span></div>';
                break;
            default:
                args.progressBar.annotations[0].content = '<div id="point1" style="font-size:24px;font-weight:bold;color:#FFD939"><span></span></div>';
                break;
        }
    };
    var timing = function () {
        if (value >= circularSeg.current.maximum) {
            clearInterval(timer);
        }
        else {
            setValue(value += 20);
        }
    };
    var timer = setInterval(timing, 2500);
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section" },
            React.createElement("div", { className: "row linear-parent" },
                React.createElement("div", null,
                    React.createElement("div", { className: "col-lg-12 col-sm-12 progressbar-mode" }),
                    React.createElement("div", { id: "linearSegment" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-linearSegment", type: 'Linear', height: '30', width: '70%', value: value, segmentCount: 50, gapWidth: 5, trackThickness: 15, progressThickness: 15, cornerRadius: 'Square', animation: animation, load: load.bind(_this) }))),
                React.createElement("div", null,
                    React.createElement("div", { className: "col-lg-12 col-sm-12 progressbar-mode" }),
                    React.createElement("div", { id: "circularSegment" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-circularSegment", ref: circularSeg, type: 'Circular', height: '200px', width: '200px', value: value, segmentCount: 50, gapWidth: 5, trackThickness: 15, progressThickness: 15, startAngle: 220, endAngle: 140, cornerRadius: 'Square', animation: animation, load: progressLoad.bind(_this) },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content }))))))),
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
exports.default = ProgressBarProgressSegment;
