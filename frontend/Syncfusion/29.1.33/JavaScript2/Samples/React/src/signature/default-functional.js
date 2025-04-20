"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)(true), disable = _a[0], setDisable = _a[1];
    var signatureObj = (0, react_1.useRef)(null);
    var saveBtnClick = function () {
        if (disable)
            return;
        signatureObj.current.save();
        setDisable(true);
    };
    var clrBtnClick = function () {
        signatureObj.current.clear();
        if (signatureObj.current.isEmpty()) {
            setDisable(true);
        }
    };
    var change = function () {
        if (!signatureObj.current.isEmpty()) {
            setDisable(false);
        }
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { id: "signature-control" },
                React.createElement("div", { className: 'e-sign-heading' },
                    React.createElement("span", { id: "signdescription" }, "Sign below"),
                    React.createElement("span", { className: "e-btn-options" },
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "signsave", cssClass: 'e-primary e-sign-save', onClick: saveBtnClick, disabled: disable }, "SAVE"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "signclear", cssClass: 'e-primary e-sign-clear', onClick: clrBtnClick, disabled: disable }, "CLEAR"))),
                React.createElement(ej2_react_inputs_1.SignatureComponent, { id: "signature", ref: signatureObj, change: change }))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null,
                "This sample demonstrates the basic rendering of the ",
                React.createElement("b", null, "Signature"),
                " component with the save and clear option.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The ",
                React.createElement("code", null, "Signature"),
                " component is a user interface to draw the signature digitally. The ",
                React.createElement("code", null, "Signature"),
                " component is displayed as a container where end-user can sign their name as a verified signature inside the container."),
            React.createElement("p", null,
                "In this sample, you can draw the signature. Use the ",
                React.createElement("b", null, "Save"),
                " button to store your signature as an image file, and the ",
                React.createElement("b", null, "Clear"),
                " button to clear the signature."),
            React.createElement("p", null,
                "More information about Signature can be found in this",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/signature/getting-started" }, " documentation section"),
                "."))));
};
exports.default = Default;
