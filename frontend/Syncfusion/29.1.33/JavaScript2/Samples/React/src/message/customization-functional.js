"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./customization.css");
function Customization() {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section msg-custom-section" },
            React.createElement("div", { className: "content-section" },
                React.createElement("h4", null, "Content Alignment"),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_content_left", content: "Your license has been activated successfully", severity: "Success" }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_content_center", content: "The license will expire today", cssClass: "e-content-center", severity: "Warning" }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_content_right", content: "The license key is invalid", cssClass: "e-content-right", severity: "Error" })),
            React.createElement("div", { className: "content-section" },
                React.createElement("h4", null, "Custom Message with Icon"),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_icon", cssClass: "custom" }, "Essential JS 2 is a modern JavaScript UI Controls library built from the ground up to be lightweight, responsive, modular, and touch friendly. It is written in the TypeScript and has no external dependencies. It also includes complete support for Angular, React, Vue, ASP.NET MVC, and ASP.NET Core frameworks."))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the customization of the icon, content alignment, and appearance in the React Message.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The Message component content can be aligned by adding predefined classes. By default, messages are aligned to the ",
                React.createElement("b", null, "left"),
                ". The other available alignments are ",
                React.createElement("b", null, "center"),
                " and ",
                React.createElement("b", null, "right"),
                ", achieved by adding, ",
                React.createElement("b", null, "e-content-center"),
                " and ",
                React.createElement("b", null, "e-content-right"),
                "."),
            React.createElement("p", null,
                "The icon and appearance can be customized at the application level by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/message/#cssclass" }, "cssClass"),
                " property."),
            React.createElement("p", null,
                "In this sample, the Message component predefined content is aligned based on the ",
                React.createElement("code", null, "cssClass"),
                " property. Also, this component is rendered with a custom severity icon and custom appearance."),
            React.createElement("p", null,
                "More information about Message customization can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/message/customization" }, "documentation"),
                " section."))));
}
;
exports.default = Customization;
