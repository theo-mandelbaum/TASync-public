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
exports.Customization = void 0;
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./customization.css");
var dialogObj;
var Customization = /** @class */ (function (_super) {
    __extends(Customization, _super);
    function Customization(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {};
        return _this;
    }
    Customization.prototype.buttonClick = function (args) {
        if (args.target.textContent.toLowerCase() == 'alert') {
            document.getElementById("statusText").style.display = "none";
            dialogObj = ej2_react_popups_1.DialogUtility.alert({
                title: '',
                content: '<div class="new" style="display: flex;flex-direction: column;align-items: center;"><p><span class="circle-border"><span class="e-icons e-check" style="font-size: 30px; color: green; padding:5px 0 0 0; font-weight: 700;"></span></span></p><p><b style="font-size:25px; font-weight: 500 !important;">Good job!</b></p><p>You clicked the button!</p></div>',
                okButton: { text: 'OK', click: this.alertOkAction.bind(this) },
                position: { X: 'center', Y: 'center' },
                width: '240px',
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'confirm') {
            document.getElementById("statusText").style.display = "none";
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: ' Delete file',
                content: '<p ><span class= "e-icons e-changes-reject" style="float: left;padding-right: 10px;font-size: 25px;display: inline;"></span>Are you sure you want to permanently delete this file?</p><p class="fileEdit"><span class= "e-icons e-image" style="font-size: 45px;"></span><span>failed personas.png<br/>Item type:PNG File<br/>Dimenstion: 1384 * 782<br/>Size:374 KB<br/>Original Location: C:/Users/Images</span></p>',
                okButton: { text: 'YES', click: this.confirmOkAction.bind(this) },
                cancelButton: { text: 'No', click: this.confirmCancelAction.bind(this) },
                position: { X: 'center', Y: 'center' },
                width: '420px',
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'prompt') {
            document.getElementById("statusText").style.display = "none";
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: 'Join Wi-Fi network',
                content: '<table class="Table"><tbody><tr><td>SSID: <b>AndroidAP</b></td></tr><tr> <td>Password:</td> </tr> <tr> <td> <span class="e-input-group"> <input type="password" id="password" name="Required" class="e-input"> </span> </td> </tr> </tbody> </table> ',
                okButton: { text: 'OK', click: this.promptOkAction.bind(this) },
                cancelButton: { click: this.promptCancelAction.bind(this) },
                position: { X: 'center', Y: 'center' },
                width: '240px',
                closeOnEscape: true
            });
        }
    };
    Customization.prototype.alertOkAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user canceled the dialog box.";
        document.getElementById("statusText").style.display = "block";
    };
    ;
    Customization.prototype.confirmOkAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = " The user confirmed the dialog box";
        document.getElementById("statusText").style.display = "block";
    };
    Customization.prototype.confirmCancelAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user canceled the dialog box.";
        document.getElementById("statusText").style.display = "block";
    };
    Customization.prototype.promptOkAction = function () {
        var value;
        value = document.getElementById("password").value;
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
    Customization.prototype.promptCancelAction = function () {
        dialogObj.hide();
        document.getElementById("statusText").innerHTML = "The user canceled the prompt dialog";
        document.getElementById("statusText").style.display = "block";
    };
    Customization.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'predefinedDialogCustomization', className: 'col-lg-12 control-section dialog-target' },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "alertBtn", cssClass: "e-danger e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Alert"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "confirmBtn", cssClass: "e-success e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Confirm"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "promptBtn", isPrimary: true, cssClass: "e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Prompt"),
                React.createElement("span", { id: "statusText" })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to customize the content of the predefined Alert, Confirm and Prompt dialogs. Three buttons have been added to this example, click one of them to open the relevant dialog box.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The predefined dialog is used to display messages such as supplemental content like graphics, text, and interactive content like form components within a web page. It can use the ",
                    React.createElement("code", null, "content "),
                    " property to load customized content. The content property accepts both string and HTML elements as content."),
                React.createElement("p", null,
                    React.createElement("b", null, "See also")),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/" }, "Customization of predefined dialogs "))))));
    };
    return Customization;
}(sample_base_1.SampleBase));
exports.Customization = Customization;
