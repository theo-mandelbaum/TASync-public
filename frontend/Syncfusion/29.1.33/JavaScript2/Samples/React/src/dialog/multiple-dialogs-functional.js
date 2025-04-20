"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./multiple-dialogs.css");
var MultipleDialogs = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dlgButton;
    var dlg2Button;
    var animationSettings;
    var buttonEle;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status1 = _b[0], setStatus1 = _b[1];
    var _c = (0, react_1.useState)(false), status2 = _c[0], setStatus2 = _c[1];
    var buttonRef = function (element) {
        buttonEle = element;
    };
    dlgButton = [
        {
            click: function () {
                setStatus2(true);
            },
            buttonModel: { content: 'Next', isPrimary: true },
        },
    ];
    dlg2Button = [
        {
            click: function () {
                setStatus2(false);
            },
            buttonModel: { content: 'Close', isPrimary: true },
        },
    ];
    animationSettings = { effect: 'None' };
    var buttonClick = function () {
        setStatus1(true);
    };
    var dialogClose = function () {
        setStatus1(false);
        setDisplay('inline-block');
    };
    var dialogClose2 = function () {
        setStatus2(false);
        setDisplay('none');
    };
    var dialogOpen = function () {
        setDisplay('none');
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "target", className: "col-lg-12 control-section dialog-target" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", ref: buttonRef, style: { display: display }, onClick: buttonClick, id: "dialogBtn" }, "Open Dialog"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "multipleDialog", header: "First Dialog", visible: status1, showCloseIcon: true, animationSettings: animationSettings, width: "330px", target: "#target", buttons: dlgButton, open: dialogOpen, close: dialogClose },
                React.createElement("p", null, "This is the first dialog and acts as a parent dialog, you can open the second (child) dialog by clicking \"Next\".")),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "secondDialog", isModal: true, header: "Second Dialog", showCloseIcon: true, visible: status2, animationSettings: animationSettings, width: "285px", target: "#target", buttons: dlg2Button, open: dialogOpen, close: dialogClose2 },
                React.createElement("p", null, "This is the second dialog and act as a child dialog.")),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to display multiple dialogs one over the other. The second dialog is configured with draggable behavior to adjust its position. You can invoke the second dialog from first dialog's button. Enable the \"open dialog\" button to reopen the dialog if the first dialog is closed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "You can configure the dialog as a parent and child, and invoke the child dialog from its parent dialog. In addition, multiple dialogs can be shown at a time in a page. The Z- index order will be controlled automatically in the browser and manually using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#zindex" }, "zIndex"),
                    "property.")))));
};
exports.default = MultipleDialogs;
