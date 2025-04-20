"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var DefaultFunctionalities = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var buttons;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status = _b[0], setStatus = _b[1];
    var animationSettings = { effect: 'None' };
    var dlgButtonClick = function () {
        window.open("https://www.syncfusion.com/company/about-us");
    };
    buttons = [
        {
            click: dlgButtonClick,
            buttonModel: {
                content: 'Learn More',
                isPrimary: true,
            }
        }
    ];
    var buttonClick = function () {
        setStatus(true);
    };
    var dialogClose = function () {
        setStatus(false);
        setDisplay('inline-block');
    };
    var dialogOpen = function () {
        setStatus(true);
        setDisplay('none');
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "targetElement", className: "control-section col-lg-12 defaultDialog dialog-target" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", style: { display: display }, onClick: buttonClick, id: "dialogBtn" }, "Open"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "defaultdialog", showCloseIcon: true, animationSettings: animationSettings, width: "500px", target: '#targetElement', header: "About SYNCFUSION Succinctly Series", visible: status, buttons: buttons, open: dialogOpen, close: dialogClose },
                React.createElement("div", null,
                    React.createElement("div", null,
                        "In the Succinctly series, Syncfusion created a robust free library of more than 130 technical e-books formatted for PDF, Kindle, and EPUB.",
                        React.createElement("br", null),
                        React.createElement("br", null),
                        "The Succinctly series was born in 2012 out of a desire to provide concise technical e-books for software developers Each title in the Succinctly series is written by a carefully chosen expert and provides essential content in about 100 pages.")))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the default rendering of the dialog component with minimum configuration. Click close or press ESC to close the dialog. Click \u201Copen\u201D to show the dialog again, if it is closed.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The dialog component is used to display information and get input from the user. The dialog component is classified as modal and non-modal dialog depend on its interaction with parent application."),
            React.createElement("ul", null,
                React.createElement("li", null, "Modal - It creates overlay that disable interaction with the parent application, and user should respond with modal before continuing with other applications."),
                React.createElement("li", null, "Non-modal - It does not prevent user interaction with parent application.")))));
};
exports.default = DefaultFunctionalities;
