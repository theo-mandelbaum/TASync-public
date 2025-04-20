"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./draggable.css");
var Draggable = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var animationSettings;
    var buttonEle;
    var _a = (0, react_1.useState)(true), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)('none'), display = _b[0], setDisplay = _b[1];
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
        React.createElement("div", { id: "target", className: "col-lg-12 control-section dialog-draggable" },
            React.createElement("button", { className: "e-control e-btn dlgbtn", onClick: buttonClick, style: { display: display }, id: "dialogBtn" }, "Open Dialog"),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialogDraggable", header: "Drag Me!!!", isModal: true, showCloseIcon: true, allowDragging: true, animationSettings: animationSettings, width: "300px", target: "#target", visible: status, open: dialogOpen, close: dialogClose }, "This is a dialog with draggable support."),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates the drag-and-drop operation of the dialog component. To begin drag-and-drop operation, select a dialog's header using mouse and dropping them in the desired location. The dialog can be draggable within the sample container. Enable the \"open dialog\" button to reopen the dialog if it is closed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "A drag-and-drop operation is enabled using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#allowdragging" }, "allowDragging"),
                    "property. when you configure the",
                    ' ',
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#target" }, "target"),
                    "property, the dialog can be draggable within its target container alone. The drag-and-drop feature is used to reposition the dialog dynamically."),
                React.createElement("p", null,
                    "More information on the draggable operation of Dialog can be found in the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#draggable" }, "documentation section"),
                    ".")))));
};
exports.default = Draggable;
