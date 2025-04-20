"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_progressbar_1 = require("@syncfusion/ej2-react-progressbar");
var sample_base_1 = require("../common/sample-base");
var theme_colors_1 = require("./theme-colors");
var SAMPLE_CSS = "\n      #control-container {\n         padding: 0px !important;\n     }\n \n     .linear-parent {\n         text-align: center;\n         width: 80%;\n         margin: auto !important;\n     }\n \n     .progressbar-label-tooltip {\n         text-align: left;\n         font-family: Roboto-Regular;\n         font-size: 14px;\n         color: #3D3E3C;\n         margin-left: 10px;\n         padding: 0px;\n         top: 10px;\n     }\n\n     ";
/**
 * Area sample
 */
function ProgressBarLinearTooltip() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var linearOne;
    var linearTwo;
    var linearThree;
    var linearFour;
    var linearFive;
    var progressLoad = function (args) {
        var div = document.getElementsByClassName('progressbar-label-tooltip');
        var selectedTheme = (0, theme_colors_1.loadProgressBarTheme)(args);
        if (selectedTheme === 'HighContrast' || selectedTheme === 'Bootstrap5Dark' || selectedTheme === 'BootstrapDark' || selectedTheme === 'FabricDark'
            || selectedTheme === 'TailwindDark' || selectedTheme === 'Tailwind3Dark' || selectedTheme === 'MaterialDark' || selectedTheme === 'FluentDark' || selectedTheme === 'Material3Dark' || selectedTheme === 'Fluent2Dark' || selectedTheme === 'Fluent2HighContrast') {
            for (var i = 0; i < div.length; i++) {
                div[i].setAttribute('style', 'color:white');
            }
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("style", null, SAMPLE_CSS),
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: "row linear-parent", style: { marginLeft: '10%' } },
                React.createElement("div", { style: { marginTop: '0.5%' } },
                    React.createElement("div", { className: "progressbar-label-tooltip" }, "HTML5"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "lineardeterminate", ref: function (linear1) { return linearOne = linear1; }, type: 'Linear', height: '60', value: 75, trackThickness: 20, progressThickness: 20, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, tooltip: {
                                enable: true
                            }, load: progressLoad.bind(this) }))),
                React.createElement("div", { style: { marginTop: '0.5%' } },
                    React.createElement("div", { className: "progressbar-label-tooltip" }, "CSS3"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearindeterminate", ref: function (linear2) { return linearTwo = linear2; }, type: 'Linear', height: '60', value: 65, trackThickness: 20, progressThickness: 20, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, tooltip: {
                                enable: true
                            }, load: progressLoad.bind(this) }))),
                React.createElement("div", { style: { marginTop: '0.5%' } },
                    React.createElement("div", { className: "progressbar-label-tooltip" }, "Bootstrap"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearsegment", ref: function (linear3) { return linearThree = linear3; }, type: 'Linear', height: '60', value: 55, trackThickness: 20, progressThickness: 20, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, tooltip: {
                                enable: true
                            }, load: progressLoad.bind(this) }))),
                React.createElement("div", { style: { marginTop: '0.5%' } },
                    React.createElement("div", { className: "progressbar-label-tooltip" }, "JavaScript"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearbuffer", ref: function (linear4) { return linearFour = linear4; }, type: 'Linear', height: '60', value: 75, trackThickness: 20, progressThickness: 20, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, tooltip: {
                                enable: true
                            }, load: progressLoad.bind(this) }))),
                React.createElement("div", { style: { marginTop: '0.5%' } },
                    React.createElement("div", { className: "progressbar-label-tooltip" }, "MySQL"),
                    React.createElement("div", { className: "linear-progress" },
                        React.createElement(ej2_react_progressbar_1.ProgressBarComponent, { id: "linearactive", ref: function (linear5) { return linearFive = linear5; }, type: 'Linear', height: '60', value: 75, trackThickness: 20, progressThickness: 20, animation: {
                                enable: true,
                                duration: 2000,
                                delay: 0,
                            }, tooltip: {
                                enable: true
                            }, load: progressLoad.bind(this) }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample illustrates a linear progress bar with a tooltip.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "In this example, you can see how to render and configure the linear progress bar with a tooltip. The ",
                React.createElement("code", null, "format"),
                " and ",
                React.createElement("code", null, "textStyle"),
                " properties in the tooltip settings can be used to format and customize the tooltip text."))));
}
exports.default = ProgressBarLinearTooltip;
