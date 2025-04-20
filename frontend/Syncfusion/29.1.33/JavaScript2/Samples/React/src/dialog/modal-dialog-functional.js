"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
var sample_base_1 = require("../common/sample-base");
require("./modal-dialog.css");
var Modal = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dialogInstance = (0, react_1.useRef)(null);
    var animationSettings;
    var buttons;
    var buttonEle;
    var _a = (0, react_1.useState)('none'), display = _a[0], setDisplay = _a[1];
    var _b = (0, react_1.useState)(true), status = _b[0], setStatus = _b[1];
    var buttonRef = function (element) {
        buttonEle = element;
    };
    animationSettings = { effect: 'None' };
    buttons = [
        {
            // Click the footer buttons to hide the Dialog
            click: function () {
                setStatus(false);
            },
            // Accessing button component properties by buttonModel property
            buttonModel: {
                //Enables the primary button
                isPrimary: true,
                content: 'OK',
            },
        },
    ];
    // function to handle the CheckBox change event
    var onChange = function (args) {
        if (args.checked) {
            dialogInstance.current.overlayClick = function () {
                setStatus(false);
            };
        }
        else {
            dialogInstance.current.overlayClick = function () {
                setStatus(true);
            };
        }
    };
    // To Open dialog
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
        React.createElement("div", { className: "control-section modal-dialog-target" },
            React.createElement("div", { id: "target", className: "col-lg-8" },
                React.createElement("button", { className: "e-control e-btn dlgbtn dlgbtn-position", ref: buttonRef, onClick: buttonClick, style: { display: display } }, "Open"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "modalDialog", isModal: true, buttons: buttons, header: "Software Update", width: "335px", content: "Your current software version is up to date.", ref: dialogInstance, target: "#target", visible: status, open: dialogOpen, close: dialogClose, animationSettings: animationSettings })),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("table", { id: "property", title: "Properties", className: "property-panel-table table-width" },
                        React.createElement("tbody", null,
                            React.createElement("tr", null,
                                React.createElement("td", { className: "table-td" },
                                    React.createElement("div", { className: "dialog-td-font" }, "Close on overlay click")),
                                React.createElement("td", null,
                                    React.createElement(ej2_react_buttons_1.CheckBoxComponent, { checked: false, change: onChange })))))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates that the modal behavior of dialog component. Choose \"close on overlay\" option from property panel to decide whether the dialog can be closed when clicking overlay. Click \"open\" to show the dialog again, if it is in closed state.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The modal dialog prevents to access the parent application. So, the user should interact with the dialog before continuing with the parent application."),
            React.createElement("p", null,
                "More information on the modal behavior of Dialog can be found in the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/getting-started/#modal-dialog" }, "documentation section.")))));
};
exports.default = Modal;
