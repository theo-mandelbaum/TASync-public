"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./resizable.css");
var Resizable = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var animationSettings;
    var buttonEle;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status = _b[0], setStatus = _b[1];
    var buttonRef = function (element) {
        buttonEle = element;
    };
    animationSettings = { effect: 'None' };
    var buttonClick = function () {
        setStatus(true);
    };
    var dialogClose = function () {
        setStatus(false);
        setDisplay('inline-block');
    };
    var dialogOpen = function () {
        setStatus(true);
        setDisplay('none');
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "target", className: "col-lg-12 control-section dialog-resizable" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", ref: buttonRef, style: { display: display }, onClick: buttonClick, id: "dialogBtn" }, "Open Dialog"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "resizableDialog", header: "Resize Me!!!", allowDragging: true, showCloseIcon: true, animationSettings: animationSettings, width: "300px", target: "#target", visible: status, enableResize: true, resizeHandles: ['All'], open: dialogOpen, close: dialogClose }, "This is a dialog with resizable support."),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates the resize operation of the dialog control in all directions. To resize the modal dialog, select and resize a dialog using its handle (grip) or hover on any of the edges or border of the dialog within the sample container. The \"open dialog\" button is used to reopen the dialog if it is closed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "Users can create resizable modal dialog by setting the enableResize property to true, which is used to change the size of a dialog dynamically and view its content with expanded mode. The resizeHandles property can also be configured for which directions the dialog should resize. When you configure the target property along with enableResize property, the dialog can be resized within its specified target container.")))));
};
exports.default = Resizable;
