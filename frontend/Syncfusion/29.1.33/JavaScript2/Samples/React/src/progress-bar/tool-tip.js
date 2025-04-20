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
exports.ProgressBarLinearTooltip = void 0;
/**
 * Sample for linear progress bar
 */
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n       #control-container {\n          padding: 0px !important;\n      }\n  \n      .linear-parent {\n          text-align: center;\n          width: 80%;\n          margin: auto !important;\n      }\n  \n      .progressbar-label {\n          text-align: left;\n          font-family: Roboto-Regular;\n          font-size: 14px;\n          color: #3D3E3C;\n          margin-left: 10px;\n          padding: 0px;\n          top: 10px;\n      }\n  \n      #reLoad {\n          border-radius: 4px;\n          text-transform: capitalize;\n      }\n      ";
/**
 * Area sample
 */
var ProgressBarLinearTooltip = /** @class */ (function (_super) {
    __extends(ProgressBarLinearTooltip, _super);
    function ProgressBarLinearTooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressLoad = function (args) {
            var div = document.getElementsByClassName('progressbar-label');
            var selectedTheme = (0, theme_colors_1.loadProgressBarTheme)(args);
            if (selectedTheme === 'HighContrast' || selectedTheme === 'Bootstrap5Dark' || selectedTheme === 'BootstrapDark' || selectedTheme === 'FabricDark'
                || selectedTheme === 'TailwindDark' || selectedTheme === 'Tailwind3Dark' || selectedTheme === 'MaterialDark' || selectedTheme === 'FluentDark' || selectedTheme === 'Material3Dark') {
                for (var i = 0; i < div.length; i++) {
                    div[i].setAttribute('style', 'color:white');
                }
            }
        };
        return _this;
    }
    ProgressBarLinearTooltip.prototype.replayClick = function () {
        this.linearOne.refresh();
        this.linearTwo.refresh();
        this.linearThree.refresh();
        this.linearFour.refresh();
        this.linearFive.refresh();
    };
    ProgressBarLinearTooltip.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row linear-parent", style: { marginLeft: '10%' } },
                    React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '0.5%' } },
                        React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label" }, "HTML5"),
                        React.createElement("div", { className: "linear-progress" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "lineardeterminate", ref: function (linear1) { return _this.linearOne = linear1; }, type: 'Linear', height: '60', value: 75, trackThickness: 20, progressThickness: 20, animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }, tooltip: {
                                    enable: true
                                }, load: this.progressLoad.bind(this) }))),
                    React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '0.5%' } },
                        React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label" }, "CSS3"),
                        React.createElement("div", { className: "linear-progress" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearindeterminate", ref: function (linear2) { return _this.linearTwo = linear2; }, type: 'Linear', height: '60', value: 65, trackThickness: 20, progressThickness: 20, animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }, tooltip: {
                                    enable: true
                                }, load: this.progressLoad.bind(this) }))),
                    React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '0.5%' } },
                        React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label" }, "BOOTSTRAP"),
                        React.createElement("div", { className: "linear-progress" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearsegment", ref: function (linear3) { return _this.linearThree = linear3; }, type: 'Linear', height: '60', value: 55, trackThickness: 20, progressThickness: 20, animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }, tooltip: {
                                    enable: true
                                }, load: this.progressLoad.bind(this) }))),
                    React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '0.5%' } },
                        React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label" }, "JQUERY"),
                        React.createElement("div", { className: "linear-progress" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearbuffer", ref: function (linear4) { return _this.linearFour = linear4; }, type: 'Linear', height: '60', value: 75, trackThickness: 20, progressThickness: 20, animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }, tooltip: {
                                    enable: true
                                }, load: this.progressLoad.bind(this) }))),
                    React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '0.5%' } },
                        React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label" }, "MYSQL"),
                        React.createElement("div", { className: "linear-progress" },
                            React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearactive", ref: function (linear5) { return _this.linearFive = linear5; }, type: 'Linear', height: '60', value: 75, trackThickness: 20, progressThickness: 20, animation: {
                                    enable: true,
                                    duration: 2000,
                                    delay: 0,
                                }, tooltip: {
                                    enable: true
                                }, load: this.progressLoad.bind(this) })))),
                React.createElement("div", { id: "replay-progressbar", style: { marginTop: '2%', marginLeft: '45.5%' } },
                    React.createElement("button", { onClick: this.replayClick.bind(this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This Progress Bar control demo shows a linear progress bar with a tooltip.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This demo for the Progress Bar control shows the linear progress bar with a tooltip. The ",
                    React.createElement("code", null, "format"),
                    " property can be used to format the tooltip text, and the ",
                    React.createElement("code", null, "textStyle"),
                    " property can be used to customize the text style."))));
    };
    return ProgressBarLinearTooltip;
}(sample_base_1.SampleBase));
exports.ProgressBarLinearTooltip = ProgressBarLinearTooltip;
