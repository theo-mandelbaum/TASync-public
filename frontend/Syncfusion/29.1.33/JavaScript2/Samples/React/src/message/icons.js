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
exports.Icons = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
require("./icons.css");
var property_pane_1 = require("../common/property-pane");
var Icons = /** @class */ (function (_super) {
    __extends(Icons, _super);
    function Icons() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Icons.prototype.defaultClick = function () {
        this.show(this.msgDefault, this.defaultBtn);
    };
    Icons.prototype.defaultClosed = function () {
        this.defaultBtn.element.classList.remove('msg-hidden');
    };
    Icons.prototype.infoClick = function () {
        this.show(this.msgInfo, this.infoBtn);
    };
    Icons.prototype.infoClosed = function () {
        this.infoBtn.element.classList.remove('msg-hidden');
    };
    Icons.prototype.successClick = function () {
        this.show(this.msgSuccess, this.successBtn);
    };
    Icons.prototype.successClosed = function () {
        this.successBtn.element.classList.remove('msg-hidden');
    };
    Icons.prototype.warningClick = function () {
        this.show(this.msgWarning, this.warningBtn);
    };
    Icons.prototype.warningClosed = function () {
        this.warningBtn.element.classList.remove('msg-hidden');
    };
    Icons.prototype.errorClick = function () {
        this.show(this.msgError, this.errorBtn);
    };
    Icons.prototype.errorClosed = function () {
        this.errorBtn.element.classList.remove('msg-hidden');
    };
    Icons.prototype.severityIconChange = function (args) {
        var msgTypes = ["default", "info", "success", "warning", "error"];
        for (var i = 0; i <= 4; i++) {
            var msgObj = (0, ej2_base_1.getComponent)(document.getElementById("msg_" + msgTypes[i] + "_icon"), "message");
            if (msgObj) {
                if (args.checked) {
                    msgObj.showIcon = true;
                }
                else {
                    msgObj.showIcon = false;
                }
            }
        }
    };
    Icons.prototype.closeIconChange = function (args) {
        var msgTypes = ["default", "info", "success", "warning", "error"];
        for (var i = 0; i <= 4; i++) {
            var msgObj = (0, ej2_base_1.getComponent)(document.getElementById("msg_" + msgTypes[i] + "_icon"), "message");
            if (msgObj) {
                if (args.checked) {
                    msgObj.showCloseIcon = true;
                }
                else {
                    msgObj.showCloseIcon = false;
                }
            }
        }
    };
    Icons.prototype.show = function (message, btn) {
        message.visible = true;
        btn.element.classList.add('msg-hidden');
    };
    Icons.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-8 control-section msg-icon-section" },
                React.createElement("div", { className: "content-section" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn1", ref: function (scope) { _this.defaultBtn = scope; }, content: "Show Default Message", cssClass: "e-outline e-primary msg-hidden", onClick: this.defaultClick.bind(this) }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_default_icon", ref: function (scope) { _this.msgDefault = scope; }, showCloseIcon: true, closed: this.defaultClosed.bind(this) }, "Editing is restricted"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn2", ref: function (scope) { _this.infoBtn = scope; }, content: "Show Info Message", cssClass: "e-outline e-primary e-info msg-hidden", onClick: this.infoClick.bind(this) }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_info_icon", severity: "Info", ref: function (scope) { _this.msgInfo = scope; }, showCloseIcon: true, closed: this.infoClosed.bind(this) }, "Please read the comments carefully"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn3", ref: function (scope) { _this.successBtn = scope; }, content: "Show Success Message", cssClass: "e-outline e-primary e-success msg-hidden", onClick: this.successClick.bind(this) }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success_icon", severity: "Success", ref: function (scope) { _this.msgSuccess = scope; }, showCloseIcon: true, closed: this.successClosed.bind(this) }, " Your message has been sent successfully"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn4", ref: function (scope) { _this.warningBtn = scope; }, content: "Show Warning Message", cssClass: "e-outline e-primary e-warning msg-hidden", onClick: this.warningClick.bind(this) }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning_icon", severity: "Warning", ref: function (scope) { _this.msgWarning = scope; }, showCloseIcon: true, closed: this.warningClosed.bind(this) }, "There was a problem with your network connection"),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn5", ref: function (scope) { _this.errorBtn = scope; }, content: "Show Error Message", cssClass: "e-outline e-primary e-error msg-hidden", onClick: this.errorClick.bind(this) }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error_icon", severity: "Error", ref: function (scope) { _this.msgError = scope; }, showCloseIcon: true, closed: this.errorClosed.bind(this) }, "A problem occurred while submitting your data"))),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                    React.createElement("table", { id: "property", title: "Properties" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '10px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { label: 'Severity Icon', checked: true, change: this.severityIconChange }))),
                            React.createElement("tr", null,
                                React.createElement("td", { style: { padding: '10px' } },
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { label: 'Close Icon', checked: true, change: this.closeIconChange }))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the visibility customization of severity and close icons of the React Message component. Click the close icon to hide the message. Click the button to restore the hidden message. Check or uncheck the check box to show or hide the visibility of the severity icon. Check or uncheck the check box to show or hide the visibility of the close icon.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Message component can be rendered with and without the severity and close icons. The close icon is used to hide the message."),
                React.createElement("p", null,
                    "In this sample, the Message component is rendered with a severity icon and a close icon. The visibility of the severity icon is handled by the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/message/#showicon" }, "showIcon"),
                    " property. The visibility of the close icon is handled by the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/message/#showcloseicon" }, "showCloseIcon"),
                    " property."),
                React.createElement("p", null,
                    "More information about Message icons can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/message/icons" }, "documentation"),
                    " section."))));
    };
    return Icons;
}(sample_base_1.SampleBase));
exports.Icons = Icons;
