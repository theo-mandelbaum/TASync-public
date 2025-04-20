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
exports.ProgressBarSemiCircular = void 0;
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n    .control-fluid {\n         padding: 0px !important;\n     }\n     #control-container {\n         padding: 0px !important;\n     }\n     .annotaion-pro {\n             font-family: Roboto-Regular;\n             font-size: 20px;\n             color: #1B1C1A;\n             letter-spacing: 0.01px;\n         }\n         .progress-bar-parent {\n             margin-top: 8%;\n             text-align: center;\n         }\n         .progress-text {\n             display: inline-flex;\n             margin: auto;\n         }\n         .progress-text-align {\n             font-family: Roboto-Regular;\n             font-size: 12px;\n             color: #3D3E3C;\n             letter-spacing: 0;\n             margin: auto;\n         }\n\n         #control-container {\n             padding: 0px !important;\n         }\n\n         .progress-container-align {\n             text-align: center;\n         }\n\n         .reload-btn {\n             text-align: center;\n         }\n\n         #reLoad {\n             border-radius: 4px;\n             text-transform: capitalize;\n             margin-top: 3%;\n         }\n\n     ";
var ProgressBarSemiCircular = /** @class */ (function (_super) {
    __extends(ProgressBarSemiCircular, _super);
    function ProgressBarSemiCircular() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.annotationColors = ['#e91e63', '#0078D6', '#317ab9', '#007bff', '#4F46E5', '#FFD939', '#9A9A9A', '#22D3EE', '#0D6EFD', '#6750A4', '#D0BCFF', '#0F6CBD', '#1AEBFF', '#115EA3', '#6366F1'];
        _this.content1 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
        _this.content2 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
        _this.content3 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
        _this.content4 = '<div id="point1" style="font-size:24px;font-weight:bold;color:#0078D6;fill:#0078D6"><span>100%</span></div>';
        _this.thickness = 5;
        _this.progressLoad = function (args) {
            var selectedTheme = (0, theme_colors_1.loadProgressBarTheme)(args);
            switch (selectedTheme) {
                case 'Material':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[0], args.progressBar.element.id);
                    break;
                case 'Fabric':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[1], args.progressBar.element.id);
                    break;
                case 'Bootstrap':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[2], args.progressBar.element.id);
                    break;
                case 'Bootstrap4':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[3], args.progressBar.element.id);
                    break;
                case 'Tailwind':
                case 'Tailwind3':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[4], args.progressBar.element.id);
                    break;
                case 'BootstrapDark':
                case 'FabricDark':
                case 'MaterialDark':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[6], args.progressBar.element.id);
                    break;
                case 'Bootstrap5':
                case 'Bootstrap5Dark':
                case 'fluent':
                case 'FluentDark':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[8], args.progressBar.element.id);
                    break;
                case 'TailwindDark':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[7], args.progressBar.element.id);
                    break;
                case 'Tailwind3Dark':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[14], args.progressBar.element.id);
                    break;
                case 'Material3':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[9], args.progressBar.element.id);
                    break;
                case 'Material3Dark':
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[10], args.progressBar.element.id);
                    break;
                case "Fluent2":
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[11], args.progressBar.element.id);
                    break;
                case "Fluent2HighContrast":
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[12], args.progressBar.element.id);
                    break;
                case "Fluent2Dark":
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[13], args.progressBar.element.id);
                    break;
                default:
                    args.progressBar.annotations[0].content = _this.annotationElementContent(_this.annotationColors[5], args.progressBar.element.id);
                    break;
            }
        };
        return _this;
    }
    ProgressBarSemiCircular.prototype.onclick = function () {
        this.inverseSemiProgress.refresh();
        this.verticalProgress.refresh();
        this.verticalOppose.refresh();
        this.semiProgress.refresh();
    };
    ProgressBarSemiCircular.prototype.annotationElementContent = function (color, controlID) {
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
    ProgressBarSemiCircular.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: "control-section progress-bar-parent" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "progress-container-align" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "angle-container", ref: function (progress1) { return _this.inverseSemiProgress = progress1; }, type: 'Circular', startAngle: 240, endAngle: 120, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: this.thickness, progressThickness: this.thickness, animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }, load: this.progressLoad.bind(this) },
                                React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                    React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content1 }))))),
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "progress-container-align" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "vertical-container", ref: function (progress2) { return _this.verticalProgress = progress2; }, type: 'Circular', startAngle: 180, endAngle: 0, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: this.thickness, progressThickness: this.thickness, load: this.progressLoad.bind(this), animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                } },
                                React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                    React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content2 }))))),
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "progress-container-align" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "vsemi-container", ref: function (progress3) { return _this.verticalOppose = progress3; }, type: 'Circular', startAngle: 0, endAngle: 180, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: this.thickness, progressThickness: this.thickness, load: this.progressLoad.bind(this), animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                } },
                                React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                    React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content3 }))))),
                    React.createElement("div", { className: "col-lg-3 col-md-3 col-3 progress-container" },
                        React.createElement("div", { className: "progress-container-align" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "semi-container", ref: function (progress4) { return _this.semiProgress = progress4; }, type: 'Circular', startAngle: 270, endAngle: 90, width: '160px', height: '160px', minimum: 0, maximum: 100, value: 100, cornerRadius: 'Round', trackThickness: this.thickness, progressThickness: this.thickness, load: this.progressLoad.bind(this), animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                } },
                                React.createElement(ej2_react_progressbar_1.Inject, { services: [ej2_react_progressbar_1.ProgressAnnotation] }),
                                React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationsDirective, null,
                                    React.createElement(ej2_react_progressbar_1.ProgressBarAnnotationDirective, { content: this.content4 })))))),
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: "col-lg-12 col-md-12 col-12 reload-btn" },
                        React.createElement("button", { onClick: this.onclick.bind(this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a circular progress bar with start and end angle customized.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This demo for Essential",
                    React.createElement("sup", null, "\u00AE"),
                    " JS2 Progress Bar control shows the customizing options for angle in circular progress bar."))));
    };
    return ProgressBarSemiCircular;
}(sample_base_1.SampleBase));
exports.ProgressBarSemiCircular = ProgressBarSemiCircular;
