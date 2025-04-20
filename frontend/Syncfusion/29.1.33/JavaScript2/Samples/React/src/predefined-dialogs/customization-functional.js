"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./customization.css");
var Customization = function () {
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
                title: '',
                content: '<div class="new" style="display: flex;flex-direction: column;align-items: center;"><p><span class="circle-border"><span class="e-icons e-check" style="font-size: 30px; color: green; padding:5px 0 0 0; font-weight: 700;"></span></span></p><p><b style="font-size:25px; font-weight: 500 !important;">Good job!</b></p><p>You clicked the button!</p></div>',
                okButton: { text: 'OK', click: alertOkAction.bind(_this) },
                position: { X: 'center', Y: 'center' },
                width: '240px',
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'confirm') {
            setDisplay('none');
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: ' Delete file',
                content: '<p ><span class= "e-icons e-changes-reject" style="float: left;padding-right: 10px;font-size: 25px;display: inline;"></span>Are you sure you want to permanently delete this file?</p><p class="fileEdit"><span class= "e-icons e-image" style="font-size: 45px;"></span><span>failed personas.png<br/>Item type:PNG File<br/>Dimenstion: 1384 * 782<br/>Size:374 KB<br/>Original Location: C:/Users/Images</span></p>',
                okButton: { text: 'YES', click: confirmOkAction.bind(_this) },
                cancelButton: { text: 'No', click: confirmCancelAction.bind(_this) },
                position: { X: 'center', Y: 'center' },
                width: '420px',
                closeOnEscape: true
            });
        }
        else if (args.target.textContent.toLowerCase() == 'prompt') {
            setDisplay('none');
            dialogObj = ej2_react_popups_1.DialogUtility.confirm({
                title: 'Join Wi-Fi network',
                content: '<table class="Table"><tbody><tr><td>SSID: <b>AndroidAP</b></td></tr><tr> <td>Password:</td> </tr> <tr> <td> <span class="e-input-group"> <input type="password" id="password" name="Required" class="e-input"> </span> </td> </tr> </tbody> </table> ',
                okButton: { text: 'OK', click: promptOkAction.bind(_this) },
                cancelButton: { click: promptCancelAction.bind(_this) },
                position: { X: 'center', Y: 'center' },
                width: '240px',
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
        dialogObj.hide();
        setContent('The user confirmed the dialog box');
        setDisplay('block');
    };
    var promptCancelAction = function () {
        dialogObj.hide();
        setContent('The user canceled the prompt dialog');
        setDisplay('block');
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { id: 'predefinedDialogCustomization', className: 'col-lg-12 control-section dialog-target' },
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "alertBtn", cssClass: "e-danger e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Alert"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "confirmBtn", cssClass: "e-success e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Confirm"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "promptBtn", isPrimary: true, cssClass: "e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Prompt"),
            React.createElement("span", { id: "statusText", style: { display: display } }, content)),
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
exports.default = Customization;
