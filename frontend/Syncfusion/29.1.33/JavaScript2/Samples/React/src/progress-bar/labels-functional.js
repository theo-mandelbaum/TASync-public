"use strict";
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
var ProgressBarLabels = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var linearOne = (0, react_1.useRef)(null);
    var linearTwo = (0, react_1.useRef)(null);
    var linearThree = (0, react_1.useRef)(null);
    var linearFour = (0, react_1.useRef)(null);
    var animation = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    var progressLoad = function (args) {
        var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
        if (theme === 'Material') {
            args.progressBar.trackColor = '#EAEAEA';
        }
    };
    var replayClick = function () {
        linearOne.current.refresh();
        linearTwo.current.refresh();
        linearThree.current.refresh();
        linearFour.current.refresh();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row linear-parent" },
                React.createElement("div", { id: "success", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-success", ref: linearOne, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 40, trackThickness: 24, progressThickness: 24, labelStyle: { textAlignment: 'Center', text: '40% Complete (Success)', color: '#ffffff' }, role: 'Success', animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { id: "info", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-info", ref: linearTwo, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 50, trackThickness: 24, progressThickness: 24, labelStyle: { textAlignment: 'Center', text: '50% Complete (Info)', color: '#ffffff' }, role: 'Info', animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { id: "warning", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-warning", ref: linearThree, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 60, trackThickness: 24, progressThickness: 24, labelStyle: { textAlignment: 'Center', text: '60% Complete (Warning)', color: '#ffffff' }, role: 'Warning', animation: animation, load: progressLoad.bind(_this) })),
                React.createElement("div", { id: "danger", className: "linear-progress" },
                    React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "progress-danger", ref: linearFour, type: 'Linear', height: '40', width: '100%', showProgressValue: true, value: 70, trackThickness: 24, progressThickness: 24, labelStyle: { textAlignment: 'Center', text: '70% Complete (Danger)', color: '#ffffff' }, role: 'Danger', animation: animation, load: progressLoad.bind(_this) }))),
            React.createElement("div", { id: "replay-progressbar", style: { marginTop: '2%', marginLeft: '45.5%' } },
                React.createElement("button", { onClick: replayClick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload"))),
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
exports.default = ProgressBarLabels;
