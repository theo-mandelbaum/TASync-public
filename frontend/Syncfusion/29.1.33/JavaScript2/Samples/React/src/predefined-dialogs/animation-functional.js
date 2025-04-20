"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./animation.css");
var Animation = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var _a = (0, react_1.useState)("Zoom"), animation = _a[0], setAnimation = _a[1];
    var effectData = [
        { Effect: "FadeZoom", Name: "Fade zoom" },
        { Effect: "SlideBottom", Name: "Slide bottom" },
        { Effect: "SlideTop", Name: "Slide top" },
        { Effect: "Zoom", Name: "Zoom" },
        { Effect: "Fade", Name: "Fade" },
    ];
    var fields = { text: "Name", value: "Effect" };
    var dialogArgs = {
        title: " Delete Multiple Items",
        content: "Are you sure you want to permanently delete these items?",
        animationSettings: { effect: animation, delay: 0, duration: 400 },
        position: { X: "center", Y: "center" },
        closeOnEscape: true
    };
    var buttonClick = function (args) {
        if (args.target.textContent.toLowerCase() == "confirm") {
            ej2_react_popups_1.DialogUtility.confirm(dialogArgs);
        }
    };
    var onChange = function (args) {
        setAnimation(args.value);
    };
    return (React.createElement("div", { className: "control-pane" },
        React.createElement("div", { className: "control-section row" },
            React.createElement("div", { className: "col-lg-8", id: "predefinedDialogAnimation" },
                React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "confirmBtn", cssClass: "e-success e-control e-btn dlgbtn", onClick: buttonClick.bind(_this) }, "Confirm")),
            React.createElement("div", { className: "col-lg-4 property-section" },
                React.createElement(property_pane_1.PropertyPane, { title: "Properties" },
                    React.createElement("div", null,
                        React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "effectDrop", dataSource: effectData, fields: fields, change: onChange.bind(_this), placeholder: "Animation effect", floatLabelType: "Always", value: animation, popupHeight: "220px" }))))),
        React.createElement("div", { id: "action-description" },
            React.createElement("p", null, "This example demonstrates how to show and hide the predefined dialog using a variety of animation effects. The dropdown item that displays the animation effects can be selected and set to it.")),
        React.createElement("div", { id: "description" },
            React.createElement("p", null,
                "The dialog can be opened or closed with an animation effect using the",
                " ",
                React.createElement("code", null, "animationSettings"),
                " property. You can also customize the duration of the animation and delay to begin the animation or disable the dialog's animation by setting the animation effect as none."),
            React.createElement("p", null,
                React.createElement("b", null, "See also")),
            React.createElement("ul", null,
                React.createElement("li", null,
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/" }, "documentation section"))))));
};
exports.default = Animation;
