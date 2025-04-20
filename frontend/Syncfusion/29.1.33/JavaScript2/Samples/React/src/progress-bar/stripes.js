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
exports.ProgressBarStripes = void 0;
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n.linear-parent {\n    text-align: center;\n    margin-top: 2%;\n}\n.linear-button {\n    text-align: center;\n}\n.linear-progress {\n    width: 80%;\n    margin: auto;\n    margin-bottom: 3%;\n}\n#reLoad {\n    border-radius: 4px;\n    text-transform: capitalize;\n}\n    ";
/**
 * Area sample
 */
var ProgressBarStripes = /** @class */ (function (_super) {
    __extends(ProgressBarStripes, _super);
    function ProgressBarStripes() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressThickness = 20;
        _this.trackThickness = 20;
        _this.progressLoad = function (args) {
            var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
            if (theme === 'Material') {
                args.progressBar.trackColor = '#eee';
            }
            if (theme === 'HighContrast') {
                args.progressBar.trackColor = '#969696';
            }
        };
        return _this;
    }
    ProgressBarStripes.prototype.replayClick = function () {
        if (!this.linearOne.animation.enable) {
            this.linearOne.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearOne.refresh();
        }
        else {
            this.linearOne.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearOne.refresh();
        }
        if (!this.linearTwo.animation.enable) {
            this.linearTwo.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearTwo.refresh();
        }
        else {
            this.linearTwo.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearTwo.refresh();
        }
        if (!this.linearThree.animation.enable) {
            this.linearThree.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearThree.refresh();
        }
        else {
            this.linearThree.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearThree.refresh();
        }
        if (!this.linearFour.animation.enable) {
            this.linearFour.animation.enable = true;
            this.animationBtn.innerHTML = 'Stop Animation';
            this.linearFour.refresh();
        }
        else {
            this.linearFour.animation.enable = false;
            this.animationBtn.innerHTML = 'Start Animation';
            this.linearFour.refresh();
        }
    };
    ProgressBarStripes.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row linear-parent" },
                    React.createElement("div", { id: "success", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-success", ref: function (linear1) { return _this.linearOne = linear1; }, type: 'Linear', height: '30', width: '100%', value: 20, progressThickness: this.progressThickness, trackThickness: this.trackThickness, role: "Success", isStriped: true, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) })),
                    React.createElement("div", { id: "info", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-info", ref: function (linear2) { return _this.linearTwo = linear2; }, type: 'Linear', height: '30', width: '100%', value: 40, progressThickness: this.progressThickness, trackThickness: this.trackThickness, isStriped: true, role: 'Info', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) })),
                    React.createElement("div", { id: "warning", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-warning", ref: function (linear3) { return _this.linearThree = linear3; }, type: 'Linear', height: '30', width: '100%', value: 70, progressThickness: this.progressThickness, trackThickness: this.trackThickness, isStriped: true, role: 'Warning', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) })),
                    React.createElement("div", { id: "danger", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-danger", ref: function (linear4) { return _this.linearFour = linear4; }, type: 'Linear', height: '30', width: '100%', value: 100, progressThickness: this.progressThickness, trackThickness: this.trackThickness, isStriped: true, role: 'Danger', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) }))),
                React.createElement("div", { style: { marginTop: '2%', marginLeft: '45.5%' } },
                    React.createElement("button", { ref: function (btn) { return _this.animationBtn = btn; }, onClick: this.replayClick.bind(this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Stop Animation"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a striped linear progress bar with animation.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This demo for Progress Bar control shows the linear striped progress bar  with help of ",
                    React.createElement("code", null, "isStriped"),
                    "property."))));
    };
    return ProgressBarStripes;
}(sample_base_1.SampleBase));
exports.ProgressBarStripes = ProgressBarStripes;
