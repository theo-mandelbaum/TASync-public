"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_notifications_1 = require("@syncfusion/ej2-react-notifications");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
require("./icons.css");
var property_pane_1 = require("../common/property-pane");
function Icons() {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), defaultVisible = _a[0], setDefaultVisible = _a[1];
    var _b = (0, react_1.useState)('e-outline e-primary msg-hidden'), defaultCssClass = _b[0], setDefaultCssClass = _b[1];
    var _c = (0, react_1.useState)(true), infoVisible = _c[0], setInfoVisible = _c[1];
    var _d = (0, react_1.useState)('e-outline e-primary e-info msg-hidden'), infoCssClass = _d[0], setinfoCssClass = _d[1];
    var _e = (0, react_1.useState)(true), successVisible = _e[0], setSuccessVisible = _e[1];
    var _f = (0, react_1.useState)('e-outline e-primary e-success msg-hidden'), successCssClass = _f[0], setSuccessCssClass = _f[1];
    var _g = (0, react_1.useState)(true), warningVisible = _g[0], setWarningVisible = _g[1];
    var _h = (0, react_1.useState)('e-outline e-primary e-warning msg-hidden'), warningCssClass = _h[0], setWarningCssClass = _h[1];
    var _j = (0, react_1.useState)(true), errorVisible = _j[0], setErrorVisible = _j[1];
    var _k = (0, react_1.useState)('e-outline e-primary e-error msg-hidden'), errorCssClass = _k[0], setErrorCssClass = _k[1];
    var _l = (0, react_1.useState)(true), showIcon = _l[0], setShowIcon = _l[1];
    var _m = (0, react_1.useState)(true), showCloseIcon = _m[0], setShowCloseIcon = _m[1];
    var defaultClick = function () {
        setDefaultVisible(true);
        setDefaultCssClass('e-outline e-primary msg-hidden');
    };
    var defaultClosed = function () {
        setDefaultVisible(false);
        setDefaultCssClass('e-outline e-primary');
    };
    var infoClick = function () {
        setInfoVisible(true);
        setinfoCssClass('e-outline e-primary e-info msg-hidden');
    };
    var infoClosed = function () {
        setInfoVisible(false);
        setinfoCssClass('e-outline e-primary e-info');
    };
    var successClick = function () {
        setSuccessVisible(true);
        setSuccessCssClass('e-outline e-primary e-success msg-hidden');
    };
    var successClosed = function () {
        setSuccessVisible(false);
        setSuccessCssClass('e-outline e-primary e-success');
    };
    var warningClick = function () {
        setWarningVisible(true);
        setWarningCssClass('e-outline e-primary e-warning msg-hidden');
    };
    var warningClosed = function () {
        setWarningVisible(false);
        setWarningCssClass('e-outline e-primary e-warning');
    };
    var errorClick = function () {
        setErrorVisible(true);
        setErrorCssClass('e-outline e-primary e-error msg-hidden');
    };
    var errorClosed = function () {
        setErrorVisible(false);
        setErrorCssClass('e-outline e-primary e-warning');
    };
    var severityIconChange = function (args) {
        setShowIcon(args.checked ? true : false);
    };
    var closeIconChange = function (args) {
        setShowCloseIcon(args.checked ? true : false);
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-8 control-section msg-icon-section" },
            React.createElement("div", { className: "content-section" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn1", content: "Show Default Message", cssClass: defaultCssClass, onClick: defaultClick.bind(this) }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_default_icon", visible: defaultVisible, showCloseIcon: showCloseIcon, closed: defaultClosed.bind(this), showIcon: showIcon }, "Editing is restricted"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn2", content: "Show Info Message", cssClass: infoCssClass, onClick: infoClick.bind(this) }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_info_icon", severity: "Info", showCloseIcon: showCloseIcon, visible: infoVisible, closed: infoClosed.bind(this), showIcon: showIcon }, "Please read the comments carefully"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn3", content: "Show Success Message", cssClass: successCssClass, onClick: successClick.bind(this) }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_success_icon", severity: "Success", showCloseIcon: showCloseIcon, closed: successClosed.bind(this), visible: successVisible, showIcon: showIcon },
                    ' ',
                    " Your message has been sent successfully"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn4", content: "Show Warning Message", cssClass: warningCssClass, onClick: warningClick.bind(this) }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_warning_icon", severity: "Warning", showCloseIcon: showCloseIcon, closed: warningClosed.bind(this), visible: warningVisible, showIcon: showIcon }, "There was a problem with your network connection"),
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "btn5", content: "Show Error Message", cssClass: errorCssClass, onClick: errorClick.bind(this) }),
                React.createElement(ej2_react_notifications_1.MessageComponent, { id: "msg_error_icon", severity: "Error", showCloseIcon: showCloseIcon, closed: errorClosed.bind(this), visible: errorVisible, showIcon: showIcon }, "A problem occurred while submitting your data"))),
        React.createElement("div", { className: "col-lg-4 property-section" },
            React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                React.createElement("table", { id: "property", title: "Properties" },
                    React.createElement("tbody", null,
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '10px' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { label: "Severity Icon", checked: true, change: severityIconChange }))),
                        React.createElement("tr", null,
                            React.createElement("td", { style: { padding: '10px' } },
                                React.createElement(ej2_react_buttons_1.CheckBoxComponent, { label: "Close Icon", checked: true, change: closeIconChange }))))))),
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
}
;
exports.default = Icons;
