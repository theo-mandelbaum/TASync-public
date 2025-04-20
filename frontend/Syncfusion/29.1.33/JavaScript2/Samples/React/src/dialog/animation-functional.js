"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./animation.css");
var Animation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var dlgButton;
    var _a = (0, react_1.useState)(true), status = _a[0], setStatus = _a[1];
    var _b = (0, react_1.useState)({ effect: 'Zoom', duration: 400 }), animation = _b[0], SetAnimation = _b[1];
    var _c = (0, react_1.useState)('The dialog is configured with animation effect. It is opened or closed with "Zoom In or Out" animation.'), content = _c[0], setContent = _c[1];
    var dialogButtonClick = function () {
        setStatus(false);
    };
    var dialogClose = function () {
        setStatus(false);
    };
    dlgButton = [
        {
            click: dialogButtonClick,
            buttonModel: { content: 'Hide', isPrimary: true },
        },
    ];
    var buttonClick = function (args) {
        var txt = args.target.parentElement.innerText;
        txt = txt === 'Zoom In/Out' ? 'Zoom In or Out' : txt;
        setContent('The dialog is configured with animation effect. It is opened or closed with "' + txt + '" animation.');
        SetAnimation(__assign(__assign({}, animation), { effect: args.target.id }));
        setStatus(true);
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { id: "target", className: "col-lg-12 control-section dialog-target" },
            React.createElement("div", { id: "customization" },
                React.createElement("div", { className: "animate" },
                    React.createElement("button", { className: "e-control e-btn e-outline e-primary", onClick: buttonClick, id: "Zoom" }, "Zoom")),
                React.createElement("div", { className: "animate" },
                    React.createElement("button", { className: "e-control e-btn e-outline e-primary", onClick: buttonClick, id: "FlipXDown" }, "FlipX Down")),
                React.createElement("div", { className: "animate" },
                    React.createElement("button", { className: "e-control e-btn e-outline e-primary", onClick: buttonClick, id: "FlipXUp" }, "FlipX Up")),
                React.createElement("div", { className: "animate" },
                    React.createElement("button", { className: "e-control e-btn e-outline e-primary", onClick: buttonClick, id: "FlipYLeft" }, "FlipY Left")),
                React.createElement("div", { className: "animate" },
                    React.createElement("button", { className: "e-control e-btn e-outline e-primary", onClick: buttonClick, id: "FlipYRight" }, "FlipY Right"))),
            React.createElement(ej2_react_popups_1.DialogComponent, { id: "AnimationDialog", isModal: true, header: "Animation Dialog", showCloseIcon: true, animationSettings: animation, width: "285px", target: "#target", buttons: dlgButton, visible: status, beforeClose: dialogClose, content: content }),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to open or close the dialog with animation effects by clicking the appropriate button.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The dialog can be opened or closed with animation effect using the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/dialog/#animationsettings" }, "animationSettings"),
                    "property. You can also customize the duration of animation and delay to begin animation. Disables the dialog's animation by setting the animation effect as none."),
                React.createElement("p", null,
                    "More information on the animation effect of Dialog can be found in the",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/animation/" }, "documentation section"),
                    ".")))));
};
exports.default = Animation;
