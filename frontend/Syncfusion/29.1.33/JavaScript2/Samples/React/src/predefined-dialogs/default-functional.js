"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var DefaultFunctionalities = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(''), content = _a[0], setContent = _a[1];
    var _b = (0, react_1.useState)(''), display = _b[0], setDisplay = _b[1];
    var dialogObj;
    var buttonClick = function (args) {
        if (args.target.textContent.toLowerCase() == 'alert') {
            setDisplay('none');
            dialogObj = ej2_react_popups_1.DialogUtility.alert({
                title: 'Low Battery',
                content: '10% of battery remaining',
                okButton: { click: alertOkAction.bind(_this) },
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'confirm') {
            setDisplay('none');
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: ' Delete Multiple Items',
                content: "Are you sure you want to permanently delete these items?",
                okButton: { click: confirmOkAction.bind(_this) },
                cancelButton: { click: confirmCancelAction.bind(_this) },
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'prompt') {
            setDisplay('none');
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: 'Join Chat Group',
                content: '<p>Enter your name: </p><input id= "inputEle" type="text" name="Required" class="e-input" placeholder="Type here.." />',
                okButton: { click: promptOkAction.bind(_this) },
                cancelButton: { click: promptCancelAction.bind(_this) },
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
    };
    var alertOkAction = function () {
        dialogObj.hide();
        setContent('The user canceled the dialog box.');
        setDisplay('block');
    };
    var confirmOkAction = function () {
        dialogObj.hide();
        setContent('The user confirmed the dialog box');
        setDisplay('block');
    };
    var confirmCancelAction = function () {
        dialogObj.hide();
        setContent('The user canceled the dialog box.');
        setDisplay('block');
    };
    var promptOkAction = function () {
        var value;
        value = document.getElementById("inputEle").value;
        if (value == "") {
            dialogObj.hide();
            setContent("The user's input is returned as\" \" ");
            setDisplay('block');
        }
        else {
            dialogObj.hide();
            setContent("The user's input is returned as" + " " + value);
            setDisplay('block');
        }
    };
    var promptCancelAction = function () {
        dialogObj.hide();
        setContent("The user canceled the prompt dialog");
        setDisplay("block");
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: 'predefinedDialogDefault', className: 'col-lg-12 control-section dialog-target' },
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "alertBtn", cssClass: "e-danger e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Alert"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "confirmBtn", cssClass: "e-success e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Confirm"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "promptBtn", isPrimary: true, cssClass: "e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Prompt"),
            React.createElement("span", { id: "statusText", style: { display: display } }, content)),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This example demonstrates the usage of dialog utility to display various forms of dialog, including",
                React.createElement("b", null, " alert, confirm "),
                "and ",
                React.createElement("b", null, "prompt"),
                " dialog. Three buttons have been added to this example, click one of them to open the relevant dialog box.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The predefined dialogs are used to display messages and collect user input within a web page. The following are the three types of Dialogs:"),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("code", null, "Alert"),
                    "- Used to show errors, warnings, and information that need user awareness."),
                React.createElement("li", null,
                    React.createElement("code", null, "Confirm"),
                    " - Used to get approval from user that appears before any critical action."),
                React.createElement("li", null,
                    React.createElement("code", null, "Prompt"),
                    " - Used to get input from the user. ")),
            React.createElement("p", null,
                React.createElement("b", null, "See also")),
            React.createElement("ul", null,
                React.createElement("li", null,
                    " ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/" }, "Getting started with predefined dialogs "))))));
};
exports.default = DefaultFunctionalities;
