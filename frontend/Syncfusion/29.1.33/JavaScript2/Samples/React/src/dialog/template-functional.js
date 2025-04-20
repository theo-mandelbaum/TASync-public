"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var Template = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dialogInstance = (0, react_1.useRef)(null);
    var buttonElement;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status = _b[0], setStatus = _b[1];
    buttonElement = null;
    var buttonRef = function (element) {
        buttonElement = element;
    };
    var header = function () {
        return (React.createElement("div", null,
            React.createElement("span", { className: "e-avatar template-image e-avatar-xsmall e-avatar-circle" }),
            React.createElement("div", { id: "dlg-template", title: "Nancy", className: "e-icon-settings" }, "Nancy")));
    };
    var footerTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("input", { id: "inVal", className: "e-input", type: "text", placeholder: "Enter your message here!" }),
            React.createElement("button", { id: "sendButton", className: "e-control e-btn e-primary", "data-ripple": "true", onClick: updateTextValue }, "Send")));
    };
    var content = function () {
        return (React.createElement("div", { className: "dialogContent" },
            React.createElement("span", { className: "dialogText" }, "Greetings Nancy! When will you share me the source files of the project?")));
    };
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
    var updateTextValue = function () {
        var enteredVal = document.getElementById('inVal');
        var dialogTextElement = document.getElementsByClassName('dialogText')[0];
        if (enteredVal.value !== '') {
            dialogTextElement.innerHTML = enteredVal.value;
        }
        enteredVal.value = '';
    };
    var rendereComplete = function () {
        dialogInstance.current.target = document.getElementById('target');
        document.getElementById('sendButton').onkeydown = function (e) {
            if (e.keyCode === 13) {
                updateTextValue();
            }
        };
        document.getElementById('inVal').onkeydown = function (e) {
            if (e.keyCode === 13) {
                updateTextValue();
            }
        };
        document.getElementById('sendButton').onclick = function () {
            updateTextValue();
        };
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section row" },
            React.createElement("div", { id: "target", className: "col-lg-12 target-element" },
                React.createElement("button", { className: "e-control e-btn dlgbtn dlgbtn-position", ref: buttonRef, onClick: buttonClick, style: { display: display } }, "Open"),
                React.createElement(ej2_react_popups_1.DialogComponent, { header: header, footerTemplate: footerTemplate, content: content, showCloseIcon: true, ref: dialogInstance, target: "#target", width: '437px', open: dialogOpen, close: dialogClose, height: '255px', visible: status, created: rendereComplete }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates the template functionalities of the dialog component. The dialog's header and footer is configured with HTML template. The typed content will be replaced every time when clicking the \"send\" button.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The dialog component displays HTML template content on the header and footer. The user can set any HTML element as header and footer with the usage of content and footer template properties."),
            React.createElement("p", null,
                "More information on the modal behavior of Dialog can be found in the",
                ' ',
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/template/" }, "documentation section")))));
};
exports.default = Template;
