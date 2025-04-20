"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n     .control-fluid {\n         padding: 0px !important;\n     }\n     #control-container {\n         padding: 0px !important;\n     }\n     .annotaion-pro {\n             font-family: Roboto-Regular;\n             font-size: 20px;\n             color: #1B1C1A;\n             letter-spacing: 0.01px;\n         }\n         .progress-bar-parent {\n             margin-top: 8%;\n             text-align: center;\n         }\n         .progress-text {\n             display: inline-flex;\n             margin: auto;\n         }\n         .progress-text-align {\n             font-family: Roboto-Regular;\n             font-size: 12px;\n             color: #3D3E3C;\n             letter-spacing: 0;\n             margin: auto;\n         }\n\n         #control-container {\n             padding: 0px !important;\n         }\n\n         .progress-container-align {\n             text-align: center;\n         }\n\n         .reload-btn {\n             text-align: center;\n         }\n\n         #reLoad {\n             border-radius: 4px;\n             text-transform: capitalize;\n             margin-top: 3%;\n         }\n\n     ";
var ProgressBarSemiCircular = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var annotationColors = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD', '#6750A4', '#D0BCFF', '#0F6CBD', '#1AEBFF', '#115EA3', '#6366F1'];
    var content1 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    var content2 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    var content3 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    var content4 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
    var thickness = 5;
    var animation = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    var inverseSemiProgress = (0, react_1.useRef)(null);
    var verticalProgress = (0, react_1.useRef)(null);
    var semiProgress = (0, react_1.useRef)(null);
    var verticalOppose = (0, react_1.useRef)(null);
    var onclick = function () {
        inverseSemiProgress.current.refresh();
        verticalProgress.current.refresh();
        verticalOppose.current.refresh();
        semiProgress.current.refresh();
    };
    var annotationElementContent = function (color, controlID) {
        var content;
        switch (controlID) {
            case 'angle-container':
                content = '100%';
                break;
            case 'vertical-container':
                content = '100%';
                break;
            case 'vsemi-container':
                content = '100%';
                break;
            case 'semi-container':
                content = '100%';
                break;
        }
        return ('<div id="point1" style="font-size:24px;font-weight:bold;color: ' + color + ' "><span>' + content + '</span></div>');
    };
    var progressLoad = function (args) {
        var selectedTheme = (0, theme_colors_1.loadProgressBarTheme)(args);
        switch (selectedTheme) {
            case 'Material':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[0], args.progressBar.element.id);
                break;
            case 'Fabric':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[1], args.progressBar.element.id);
                break;
            case 'Bootstrap':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[2], args.progressBar.element.id);
                break;
            case 'Bootstrap4':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[3], args.progressBar.element.id);
                break;
            case 'Tailwind':
            case 'Tailwind3':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[4], args.progressBar.element.id);
                break;
            case 'BootstrapDark':
            case 'FabricDark':
            case 'MaterialDark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[6], args.progressBar.element.id);
                break;
            case 'Bootstrap5':
            case 'Bootstrap5Dark':
            case 'fluent':
            case 'FluentDark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[8], args.progressBar.element.id);
                break;
            case 'TailwindDark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[7], args.progressBar.element.id);
                break;
            case 'Tailwind3Dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[14], args.progressBar.element.id);
                break;
            case 'Material3':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[9], args.progressBar.element.id);
                break;
            case 'Material3Dark':
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[10], args.progressBar.element.id);
                break;
            case "Fluent2":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[11], args.progressBar.element.id);
                break;
            case "Fluent2HighContrast":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[12], args.progressBar.element.id);
                break;
            case "Fluent2Dark":
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[13], args.progressBar.element.id);
                break;
            default:
                args.progressBar.annotations[0].content = annotationElementContent(annotationColors[5], args.progressBar.element.id);
                break;
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: "control-section progress-bar-parent" },
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "progress-container-align" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "angle-container", ref: inverseSemiProgress, type: 'Circular', startAngle: 240, endAngle: 120, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: thickness, progressThickness: thickness, animation: animation, load: progressLoad.bind(_this) },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content1 }))))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "progress-container-align" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "vertical-container", ref: verticalProgress, type: 'Circular', startAngle: 180, endAngle: 0, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: thickness, progressThickness: thickness, load: progressLoad.bind(_this), animation: animation },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content2 }))))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "progress-container-align" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "vsemi-container", ref: verticalOppose, type: 'Circular', startAngle: 0, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: thickness, progressThickness: thickness, load: progressLoad.bind(_this), endAngle: 180, animation: animation },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content3 }))))),
                React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                    React.createElement("div", { className: "progress-container-align" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "semi-container", ref: semiProgress, type: 'Circular', startAngle: 270, endAngle: 90, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: thickness, progressThickness: thickness, load: progressLoad.bind(_this), animation: animation },
                            React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                            React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: content4 })))))),
            React.createElement("div", { className: "row" },
                React.createElement("div", { className: "col-lg-12 col-md-12 col-12 reload-btn" },
                    React.createElement("button", { onClick: onclick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload")))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a circular progress bar with start and end angle customized.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This demo for Essential",
                React.createElement("sup", null, "\u00AE"),
                " JS2 Progress Bar control shows the customizing options for angle in circular progress bar."))));
};
exports.default = ProgressBarSemiCircular;
