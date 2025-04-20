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
exports.Template = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./template.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var Template = /** @class */ (function (_super) {
    __extends(Template, _super);
    function Template() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Template.prototype.showClick = function () {
        this.msgTemplate.visible = true;
        this.showBtn.element.classList.add('msg-hidden');
    };
    Template.prototype.dismissClick = function () {
        this.msgTemplate.visible = false;
    };
    Template.prototype.closed = function () {
        this.showBtn.element.classList.remove('msg-hidden');
    };
    Template.prototype.contentTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Merged pull request"),
            React.createElement("p", null, "Pull request #41 merged after a successful build"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'commitBtn', cssClass: 'e-link', content: 'View commit' }),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'closeBtn', cssClass: 'e-link', content: 'Dismiss', onClick: this.dismissClick.bind(this) })));
    };
    Template.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-12 control-section msg-template-section" },
                React.createElement("div", { className: "content-section" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: 'showBtn', ref: function (scope) { _this.showBtn = scope; }, content: 'Show pull request', cssClass: "e-outline e-primary e-success msg-hidden", onClick: this.showClick.bind(this) }),
                    React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_template", ref: function (scope) { _this.msgTemplate = scope; }, content: this.contentTemplate.bind(this), severity: "Success", closed: this.closed.bind(this) }))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null,
                    "This sample demonstrates the template functionality of the React Message component. Click the ",
                    React.createElement("b", null, "dismiss"),
                    " button to hide the message. Click the ",
                    React.createElement("b", null, "Show pull request"),
                    " button to restore the hidden message.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Message component has an option to customize the content with a custom structure. The content can be a string, paragraph, or any other HTML element."),
                React.createElement("p", null, "In this sample, the Message component content is customized with HTML elements and React Button components."),
                React.createElement("p", null,
                    "More information about Message template can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/message/template" }, "documentation"),
                    " section."))));
    };
    return Template;
}(sample_base_1.SampleBase));
exports.Template = Template;
