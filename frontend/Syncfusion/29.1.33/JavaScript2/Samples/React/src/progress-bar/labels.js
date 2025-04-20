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
exports.ProgressBarLabels = void 0;
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n#control-container {\n    padding: 0px !important;\n}\n.linear-parent {\n    text-align: center;\n    margin-top: 2%;\n}\n.linear-button {\n    text-align: center;\n}\n.linear-progress {\n    width: 80%;\n    margin: auto;\n    margin-bottom: 3%;\n}\n#reLoad {\n    border-radius: 4px;\n    text-transform: capitalize;\n}\n    ";
/**
 * Area sample
 */
var ProgressBarLabels = /** @class */ (function (_super) {
    __extends(ProgressBarLabels, _super);
    function ProgressBarLabels() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.progressLoad = function (args) {
            var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
            if (theme === 'Material') {
                args.progressBar.trackColor = '#EAEAEA';
            }
        };
        return _this;
    }
    ProgressBarLabels.prototype.replayClick = function () {
        this.linearOne.refresh();
        this.linearTwo.refresh();
        this.linearThree.refresh();
        this.linearFour.refresh();
    };
    ProgressBarLabels.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("style", null, SAMPLE_CSS),
            React.createElement("div", { className: 'control-section' },
                React.createElement("div", { className: "row linear-parent" },
                    React.createElement("div", { id: "success", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-success", ref: function (linear1) { return _this.linearOne = linear1; }, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 40, trackThickness: 24, progressThickness: 24, labelStyle: {
                                textAlignment: 'Center',
                                text: '40% Complete (Success)',
                                color: '#ffffff'
                            }, role: 'Success', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) })),
                    React.createElement("div", { id: "info", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-info", ref: function (linear2) { return _this.linearTwo = linear2; }, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 50, trackThickness: 24, progressThickness: 24, labelStyle: {
                                textAlignment: 'Center',
                                text: '50% Complete (Info)',
                                color: '#ffffff'
                            }, role: 'Info', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) })),
                    React.createElement("div", { id: "warning", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-warning", ref: function (linear3) { return _this.linearThree = linear3; }, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 60, trackThickness: 24, progressThickness: 24, labelStyle: {
                                textAlignment: 'Center',
                                text: '60% Complete (Warning)',
                                color: '#ffffff'
                            }, role: 'Warning', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) })),
                    React.createElement("div", { id: "danger", className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-danger", ref: function (linear4) { return _this.linearFour = linear4; }, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 70, trackThickness: 24, progressThickness: 24, labelStyle: {
                                textAlignment: 'Center',
                                text: '70% Complete (Danger)',
                                color: '#ffffff'
                            }, role: 'Danger', animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, load: this.progressLoad.bind(this) }))),
                React.createElement("div", { id: "replay-progressbar", style: { marginTop: '2%', marginLeft: '45.5%' } },
                    React.createElement("button", { onClick: this.replayClick.bind(this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload"))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample illustrates a linear progress bar to demonstrate different types of labels rendering.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "This demo for Essential",
                    React.createElement("sup", null, "\u00AE"),
                    " JS2 Progress Bar control shows the linear progress bar with different labels format with help of ",
                    React.createElement("code", null, "labelStyle"),
                    " and provide different modes using ",
                    React.createElement("code", null, "role"),
                    " property."))));
    };
    return ProgressBarLabels;
}(sample_base_1.SampleBase));
exports.ProgressBarLabels = ProgressBarLabels;
