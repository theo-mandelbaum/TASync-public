"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n #control-container {\n     padding: 0px !important;\n }\n .linear-parent {\n     text-align: center;\n     margin-top: 2%;\n }\n .linear-button {\n     text-align: center;\n }\n .linear-progress {\n     width: 80%;\n     margin: auto;\n     margin-bottom: 3%;\n }\n #reLoad {\n     border-radius: 4px;\n     text-transform: capitalize;\n }\n     ";
/**
 * Area sample
 */
var ProgressBarStripes = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var progressThickness = 20;
    var trackThickness = 20;
    var progressLoad = function (args) {
        var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
        if (theme === 'Material') {
            args.progressBar.trackColor = '#eee';
        }
        if (theme === 'HighContrast') {
            args.progressBar.trackColor = '#969696';
        }
    };
    var _a = (0, react_1.useState)({
        enable: true,
        duration: 2000,
        delay: 0,
    }), animation = _a[0], setAnimation = _a[1];
    var _b = (0, react_1.useState)("Stop Animation"), buttonvalue = _b[0], setButtonValue = _b[1];
    var replayClick = function () {
        setAnimation(__assign(__assign({}, animation), { enable: !animation.enable ? true : false }));
        setButtonValue(!animation.enable ? 'Stop Animation' : 'Start Animation');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row linear-parent" },
                React.createElement("div", { id: "success", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-success", type: 'Linear', height: '30', width: '100%', value: 20, progressThickness: progressThickness, trackThickness: trackThickness, role: "Success", isStriped: true, animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { id: "info", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-info", type: 'Linear', height: '30', width: '100%', value: 40, progressThickness: progressThickness, trackThickness: trackThickness, isStriped: true, role: 'Info', animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { id: "warning", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-warning", type: 'Linear', height: '30', width: '100%', value: 70, progressThickness: progressThickness, trackThickness: trackThickness, isStriped: true, role: 'Warning', animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { id: "danger", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-danger", type: 'Linear', height: '30', width: '100%', value: 100, progressThickness: progressThickness, trackThickness: trackThickness, isStriped: true, role: 'Danger', animation: animation, load: progressLoad.bind(_this) }))),
            React.createElement("div", { style: { marginTop: '2%', marginLeft: '45.5%' } },
                React.createElement("button", { onClick: replayClick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, buttonvalue))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a striped linear progress bar with animation.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "This demo for Progress Bar control shows the linear striped progress bar  with help of ",
                React.createElement("code", null, "isStriped"),
                "property."))));
};
exports.default = ProgressBarStripes;
