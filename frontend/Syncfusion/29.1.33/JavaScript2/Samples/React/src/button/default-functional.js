"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./button.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), play = _a[0], setPlay = _a[1];
    //Toggle button click event handler
    var togglePlay = function () {
        setPlay(function (prevState) { return !prevState; });
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section' },
            React.createElement("div", { className: 'button-section' },
                React.createElement("div", { id: 'button-control' },
                    React.createElement("div", { className: 'row' },
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-primary' }, "Primary")),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, null, "Normal"))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-outline', isPrimary: true }, "Outline")),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-flat e-primary' }, "Flat"))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-success' }, "Success")),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-warning' }, "Warning"))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-danger' }, "Danger")),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-info' }, "Info"))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small e-round', iconCss: 'e-btn-sb-icons e-add-icon', "aria-label": "button", isPrimary: true })),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-flat e-primary', iconCss: play ? 'e-btn-sb-icons e-play-icon' : 'e-btn-sb-icons e-pause-icon', onClick: togglePlay }, play ? 'Play' : 'Pause'))),
                        React.createElement("div", { className: "col-xs-6 col-sm-6 col-lg-6 col-md-6" },
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-flat e-primary', iconCss: 'e-btn-sb-icons e-open-icon', iconPosition: 'Right' }, "Open")),
                            React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                                React.createElement(ej2_react_buttons_1.ButtonComponent, { cssClass: 'e-small' }, "Small"))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the Button with different types and predefined styles.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "Button is a graphical user interface element that triggers an event on click action. It contains the text, an image, or both."),
            React.createElement("p", null,
                "In this sample, Play button is a toggle button and it can be enabled by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/button/#istoggle" },
                    React.createElement("code", null, "isToggle")),
                " property. To change the text and icon you should handle click event."),
            React.createElement("p", null,
                "More information about Button can be found in this ",
                React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/button/getting-started' }, "documentation section"),
                "."))));
};
exports.default = Default;
