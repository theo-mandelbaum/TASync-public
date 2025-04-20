"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
require("./default.css");
function Default() {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section msg-default-section" },
            React.createElement("div", { className: "content-section" },
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_default", content: "Editing is restricted" }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_info", content: "Please read the comments carefully", severity: "Info" }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success", content: "Your message has been sent successfully", severity: "Success" }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning", content: "There was a problem with your network connection", severity: "Warning" }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error", content: "A problem occurred while submitting your data", severity: "Error" }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of the React Message component with different severity types and predefined styles.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Message component displays messages with different severity levels, set with icons and colors to denote the importance and context of the message to the end user."),
            React.createElement("p", null,
                "The available severity messages are ",
                React.createElement("b", null, "Normal"),
                ", ",
                React.createElement("b", null, "Success"),
                ", ",
                React.createElement("b", null, "Info"),
                ", ",
                React.createElement("b", null, "Warning"),
                " and ",
                React.createElement("b", null, "Error"),
                "."),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("b", null, "Normal"),
                    " - The message is displayed with an icon and color to denote it as a normal message."),
                React.createElement("li", null,
                    React.createElement("b", null, "Success"),
                    " - The message is displayed with an icon and color to denote it as a success message."),
                React.createElement("li", null,
                    React.createElement("b", null, "Info"),
                    " - The message is displayed with an icon and color to denote it as information."),
                React.createElement("li", null,
                    React.createElement("b", null, "Warning"),
                    " - The message is displayed with an icon and color to denote it as a warning message."),
                React.createElement("li", null,
                    React.createElement("b", null, "Error"),
                    " - The message is displayed with an icon and color to denote it as an error message.")),
            React.createElement("p", null,
                "In this sample, messages are displayed with a distinct icon and a color based on the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/message/#content" }, " content"),
                " and ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/message/#severity" }, "severity"),
                " properties."),
            React.createElement("p", null,
                "More information about Message can be found in this ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/message/getting-started" }, "documentation"),
                " section."))));
}
;
exports.default = Default;
