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
exports.Variants = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./variants.css");
var Variants = /** @class */ (function (_super) {
    __extends(Variants, _super);
    function Variants() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Variants.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-12 control-section msg-variant-section" },
                React.createElement("div", { className: "content-wrapper" },
                    React.createElement("div", { className: "col-lg-4 col-md-6 content-section" },
                        React.createElement("h4", null, "Filled"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_default_filled", variant: "Filled" }, "Editing is restricted"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_info_filled", severity: "Info", variant: "Filled" }, "Please read the comments carefully"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success_filled", severity: "Success", variant: "Filled" }, "Your message has been sent successfully"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning_filled", severity: "Warning", variant: "Filled" }, "There was a problem with your network connection"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error_filled", severity: "Error", variant: "Filled" }, "A problem occurred while submitting your data")),
                    React.createElement("div", { className: "col-lg-4 col-md-6 content-section" },
                        React.createElement("h4", null, "Outlined"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_default_outlined", variant: "Outlined" }, "Editing is restricted"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_info_outlined", severity: "Info", variant: "Outlined" }, "Please read the comments carefully"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success_outlined", severity: "Success", variant: "Outlined" }, "Your message has been sent successfully"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning_outlined", severity: "Warning", variant: "Outlined" }, "There was a problem with your network connection"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error_outlined", severity: "Error", variant: "Outlined" }, "A problem occurred while submitting your data")),
                    React.createElement("div", { className: "col-lg-4 content-section" },
                        React.createElement("h4", null, "Text"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_default" }, "Editing is restricted"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_info", severity: "Info" }, "Please read the comments carefully"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success", severity: "Success" }, "Your message has been sent successfully"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning", severity: "Warning" }, "There was a problem with your network connection"),
                        React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error", severity: "Error" }, "A problem occurred while submitting your data")))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the predefined appearance variants for the React Message component.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The Message component can be displayed with predefined appearance variants. The available variants are ",
                    React.createElement("b", null, "Text"),
                    ", ",
                    React.createElement("b", null, "Outlined"),
                    " and ",
                    React.createElement("b", null, "Filled"),
                    ". The default variant type is ",
                    React.createElement("b", null, "Text"),
                    "."),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Text"),
                        " - The severity is differentiated using a text color and a light background color."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Outlined"),
                        " - The severity is differentiated using a text color and a border without background."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Filled"),
                        " - The severity is differentiated using a text color and a dark background color.")),
                React.createElement("p", null,
                    "In this sample, messages are displayed with different appearances based on the ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/message/#variant" }, "variant"),
                    " property."),
                React.createElement("p", null,
                    "More information about Message variants can be found in this ",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/message/variants" }, "documentation"),
                    " section."))));
    };
    return Variants;
}(sample_base_1.SampleBase));
exports.Variants = Variants;
