"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var sample_base_1 = require("../common/sample-base");
require("./progress-button.css");
var ProgressButton = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var spinRight = { position: 'Right' };
    var spinTop = { position: 'Top' };
    var spinBottom = { position: 'Bottom' };
    var spinCenter = { position: 'Center' };
    var zoomOut = { effect: 'ZoomOut' };
    var slideLeft = { effect: 'SlideLeft' };
    var slideRight = { effect: 'SlideRight' };
    var zoomIn = { effect: 'ZoomIn' };
    var duration = 4000;
    var _a = (0, react_1.useState)("e-success e-small"), contractCssClass = _a[0], setContractCssClass = _a[1];
    var contractBegin = function () {
        setContractCssClass('e-success e-small e-round');
    };
    var contractEnd = function () {
        setContractCssClass('e-success e-small');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'progress-button-section' },
                React.createElement("div", { id: 'progress-button-control' },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Left", isPrimary: true })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Right", isPrimary: true, spinSettings: spinRight }))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Top", isPrimary: true, spinSettings: spinTop })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Spin Bottom", isPrimary: true, spinSettings: spinBottom })))),
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "roundbtn", spinSettings: spinCenter, animationSettings: zoomOut, cssClass: "e-round e-small e-success", iconCss: "e-btn-sb-icons e-play-icon" })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "contract", content: "Contract", enableProgress: true, cssClass: contractCssClass, begin: contractBegin, end: contractEnd }))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Slide Left", enableProgress: true, spinSettings: spinCenter, animationSettings: slideLeft, cssClass: "e-flat e-success" })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Slide Right", enableProgress: true, spinSettings: spinCenter, animationSettings: slideRight, cssClass: "e-outline e-success" })))),
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { id: "zoomin", content: "Zoom In", enableProgress: true, spinSettings: spinCenter, animationSettings: zoomIn, cssClass: "e-round-corner e-danger" })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Zoom Out", enableProgress: true, spinSettings: spinCenter, animationSettings: zoomOut, cssClass: "e-small e-danger" }))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Download", enableProgress: true, duration: duration, cssClass: "e-hide-spinner e-progress-top", iconCss: "e-btn-sb-icons e-download-icon" })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_splitbuttons_1.ProgressButtonComponent, { content: "Disabled", disabled: true }))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of a progress button. Clicking that button will display a spinner and a progress indicator.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The progress button visualizes the progression of an operation to indicates the user that a process is happening in the background. The progress can be shown with graphics accompanied by a textual representation."),
            React.createElement("p", null,
                "In this sample, the progress button contains the content, spinner, progress indicator, and a list of related features that can be achieved using",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/progress-button/#content" }, "content,")),
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/progress-button/#cssclass" }, "cssClass,")),
                "and",
                React.createElement("code", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/progress-button/#enableprogress" }, "enableProgress")),
                "property."),
            React.createElement("p", null,
                "More information about progress button can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/progress-button/getting-started" }, "documentation section"),
                "."))));
};
exports.default = ProgressButton;
