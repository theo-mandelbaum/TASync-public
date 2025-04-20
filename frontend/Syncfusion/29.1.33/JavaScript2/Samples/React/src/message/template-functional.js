"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
require("./template.css");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
function Template() {
    var _this = this;
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), visible = _a[0], setVisible = _a[1];
    var _b = (0, react_1.useState)('e-outline e-primary e-success msg-hidden'), cssClass = _b[0], setCssClass = _b[1];
    var showClick = function () {
        setVisible(true);
        setCssClass('e-outline e-primary e-success msg-hidden');
    };
    var dismissClick = function () {
        setVisible(false);
    };
    var closed = function () {
        setCssClass('e-outline e-primary e-success');
    };
    var contentTemplate = function () {
        return (React.createElement("div", null,
            React.createElement("h1", null, "Merged pull request"),
            React.createElement("p", null, "Pull request #41 merged after a successful build"),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "commitBtn", cssClass: "e-link", content: "View commit" }),
            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "closeBtn", cssClass: "e-link", content: "Dismiss", onClick: dismissClick.bind(_this) })));
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section msg-template-section" },
            React.createElement("div", { className: "content-section" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "showBtn", content: "Show pull request", cssClass: cssClass, onClick: showClick.bind(this) }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_template", visible: visible, content: contentTemplate.bind(this), severity: "Success", closed: closed.bind(this) }))),
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
}
;
exports.default = Template;
