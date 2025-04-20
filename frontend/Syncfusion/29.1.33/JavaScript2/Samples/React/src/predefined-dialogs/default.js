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
exports.DefaultFunctionalities = void 0;
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var dialogObj;
var DefaultFunctionalities = /** @class */ (function (_super) {
    __extends(DefaultFunctionalities, _super);
    function DefaultFunctionalities(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    DefaultFunctionalities.prototype.buttonClick = function (args) {
        if (args.target.textContent.toLowerCase() == 'alert') {
            document.getElementById("statusText").style.display = "none";
            dialogObj = ej2_react_popups_1.DialogUtility.alert({
                title: 'Low Battery',
                content: '10% of battery remaining',
                okButton: { click: this.alertOkAction.bind(this) },
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'confirm') {
            document.getElementById("statusText").style.display = "none";
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: ' Delete Multiple Items',
                content: "Are you sure you want to permanently delete these items?",
                okButton: { click: this.confirmOkAction.bind(this) },
                cancelButton: { click: this.confirmCancelAction.bind(this) },
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'prompt') {
            document.getElementById("statusText").style.display = "none";
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: 'Join Chat Group',
                content: '<p>Enter your name: </p><input id= "inputEle" type="text" name="Required" class="e-input" placeholder="Type here.." />',
                okButton: { click: this.promptOkAction.bind(this) },
                cancelButton: { click: this.promptCancelAction.bind(this) },
                position: { X: 'center', Y: 'center' },
                closeOnEscape: true
            });
        }
    };
    DefaultFunctionalities.prototype.alertOkAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user canceled the dialog box.";
        document.getElementById("statusText").style.display = "block";
    };
    ;
    DefaultFunctionalities.prototype.confirmOkAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = " The user confirmed the dialog box";
        document.getElementById("statusText").style.display = "block";
    };
    DefaultFunctionalities.prototype.confirmCancelAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user canceled the dialog box.";
        document.getElementById("statusText").style.display = "block";
    };
    DefaultFunctionalities.prototype.promptOkAction = function () {
        var value;
        value = document.getElementById("inputEle").value;
        if (value == "") {
            dialogObj.hide();
            document.getElementById("statusText").innerHTML = "The user's input is returned as\" \" ";
            document.getElementById("statusText").style.display = "block";
        }
        else {
            dialogObj.hide();
            document.getElementById("statusText").innerHTML = "The user's input is returned as" + " " + value;
            document.getElementById("statusText").style.display = "block";
        }
    };
    DefaultFunctionalities.prototype.promptCancelAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user canceled the prompt dialog";
        document.getElementById("statusText").style.display = "block";
    };
    DefaultFunctionalities.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'predefinedDialogDefault', className: 'col-lg-12 control-section dialog-target' },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "alertBtn", cssClass: "e-danger e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Alert"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "confirmBtn", cssClass: "e-success e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Confirm"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "promptBtn", isPrimary: true, cssClass: "e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Prompt"),
                React.createElement("span", { id: "statusText" })),
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
    return DefaultFunctionalities;
}(sample_base_1.SampleBase));
exports.DefaultFunctionalities = DefaultFunctionalities;
