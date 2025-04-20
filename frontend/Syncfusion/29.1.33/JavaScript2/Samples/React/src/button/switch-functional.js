"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_buttons_1 = require("@syncfusion/ej2-buttons");
var sample_base_1 = require("../common/sample-base");
require("./switch.css");
var Switch = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rendereComplete = function () {
        var rippleHandler = function (e) {
            var rippleSpan = document.querySelector(".e-ripple-container");
            if (rippleSpan) {
                (0, ej2_buttons_1.rippleMouseHandler)(e, rippleSpan);
            }
        };
        var elemArray = document.querySelectorAll(".switch-control label");
        for (var i = 0, len = elemArray.length; i < len; i++) {
            elemArray[i].addEventListener("mouseup", rippleHandler);
            elemArray[i].addEventListener("mousedown", rippleHandler);
        }
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "col-lg-12 control-section" },
            React.createElement("div", { className: "switch-content" },
                React.createElement("div", { className: "container switch-control" },
                    React.createElement("div", null,
                        React.createElement("h4", { className: "heading" }, "Hotspot & tethering")),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "checked", style: { padding: "10px 72px 10px 0" } }, " USB Tethering "),
                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "checked", checked: true })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "unchecked", style: { padding: "10px 24px 10px 0" } }, " Portable Wi-Fi hotspot "),
                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "unchecked" })),
                    React.createElement("div", null,
                        React.createElement("label", { htmlFor: "disabled", className: "e-disabled", style: { padding: "10px 40px 10px 0" } }, "Bluetooth Tethering "),
                        React.createElement(ej2_react_buttons_1.SwitchComponent, { id: "disabled", disabled: true }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This sample demonstrates the default functionalities of a Switch. Click the Switch element to toggle between checked and unchecked states.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null, "The Switch is a graphical user interface element that allows you to toggle between check and unchecked states."),
            React.createElement("p", null,
                "In this sample, checked state is achieved by using the",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/switch/#checked" },
                    React.createElement("code", null, "checked")),
                " property, and disabled state is achieved by using the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/api/switch/#disabled" },
                    React.createElement("code", null, "disabled")),
                " property."),
            React.createElement("p", null,
                "More information on Switch can be found in the ",
                React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/switch/getting-started" }, "documentation section"),
                "."))));
};
exports.default = Switch;
