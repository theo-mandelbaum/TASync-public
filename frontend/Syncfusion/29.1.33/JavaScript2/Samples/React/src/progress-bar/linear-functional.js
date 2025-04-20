"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n      #control-container {\n         padding: 0px !important;\n     }\n \n     .linear-parent {\n         text-align: center;\n         width: 80%;\n         margin: auto !important;\n     }\n \n     .progressbar-label {\n         text-align: left;\n         font-family: Roboto-Regular;\n         font-size: 14px;\n         color: #3D3E3C;\n         margin-left: 10px;\n         padding: 0px;\n         top: 10px;\n     }\n \n     #reLoad {\n         border-radius: 4px;\n         text-transform: capitalize;\n     }\n     ";
/**
 * Area sample
 */
var ProgressBarLinear = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var linearOne = (0, react_1.useRef)(null);
    var linearTwo = (0, react_1.useRef)(null);
    var linearThree = (0, react_1.useRef)(null);
    var linearFour = (0, react_1.useRef)(null);
    var linearFive = (0, react_1.useRef)(null);
    var _a = (0, react_1.useState)({ color: "" }), style = _a[0], setStyle = _a[1];
    var animation = {
        enable: true,
        duration: 2000,
        delay: 0,
    };
    var progressLoad = function (args) {
        var theme = (0, theme_colors_1.loadProgressBarTheme)(args);
        if (theme === 'HighContrast' || theme === 'Bootstrap5Dark' || theme === 'BootstrapDark' || theme === 'FabricDark'
            || theme === 'TailwindDark' || theme === 'Tailwind3Dark' || theme === 'MaterialDark' || theme === 'FluentDark' || theme === 'Material3Dark' || theme === 'Fluent2Dark' || theme === 'Fluent2HighContrast') {
            setStyle({ color: "White" });
        }
    };
    var replayClick = function () {
        linearOne.current.refresh();
        linearTwo.current.refresh();
        linearThree.current.refresh();
        linearFour.current.refresh();
        linearFive.current.refresh();
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row linear-parent", style: { marginLeft: '10%' } },
                React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '1%' } },
                    React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label", style: style }, "Determinate"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "lineardeterminate", ref: linearOne, type: 'Linear', height: '60', value: 100, animation: animation, load: progressLoad.bind(_this) }))),
                React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '2.5%' } },
                    React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label", style: style }, "Indeterminate"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearindeterminate", ref: linearTwo, type: 'Linear', height: '60', value: 20, isIndeterminate: true, animation: animation, load: progressLoad.bind(_this) }))),
                React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '2.5%' } },
                    React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label", style: style }, "Segment"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearsegment", ref: linearThree, type: 'Linear', height: '60', value: 100, segmentCount: 8, animation: animation, load: progressLoad.bind(_this) }))),
                React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '2.5%' } },
                    React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label", style: style }, "Buffer"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearbuffer", ref: linearFour, type: 'Linear', height: '60', value: 40, secondaryProgress: 60, animation: animation, load: progressLoad.bind(_this) }))),
                React.createElement("div", { className: "col-lg-12 col-md-12", style: { marginTop: '2.5%' } },
                    React.createElement("div", { className: "col-lg-12 col-md-12 progressbar-label", style: style }, "Active"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearactive", ref: linearFive, type: 'Linear', height: '60', value: 100, isActive: true, animation: { enable: true, duration: 2000, delay: 0, }, load: progressLoad.bind(_this) })))),
            React.createElement("div", { id: "replay-progressbar", style: { marginTop: '2%', marginLeft: '45.5%' } },
                React.createElement("button", { onClick: replayClick.bind(_this), id: "reLoad", className: "e-control e-btn e-lib e-outline e-primary" }, "Reload"))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a linear progress bar with determinate and indeterminate states, segments and buffer value.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The sample shows the determinate and indeterminate states, buffer and segments of linear progress bar."))));
};
exports.default = ProgressBarLinear;
