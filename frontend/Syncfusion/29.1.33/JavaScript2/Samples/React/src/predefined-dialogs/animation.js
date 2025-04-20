"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animation = void 0;
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_dropdowns_1 = require("@syncfusion/ej2-react-dropdowns");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var property_pane_1 = require("../common/property-pane");
require("./animation.css");
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation(props) {
        var _this = _super.call(this, props) || this;
        _this.effectData = [
            { "Effect": "FadeZoom", "Name": "Fade zoom" },
            { "Effect": "SlideBottom", "Name": "Slide bottom" },
            { "Effect": "SlideTop", "Name": "Slide top" },
            { "Effect": "Zoom", "Name": "Zoom" },
            { "Effect": "Fade", "Name": "Fade" }
        ];
        _this.fields = { text: 'Name', value: 'Effect' };
        _this.value = 'Zoom';
        _this.dialogArgs = {
            title: ' Delete Multiple Items',
            content: "Are you sure you want to permanently delete these items?",
            animationSettings: { effect: 'Zoom', delay: 0, duration: 400 },
            position: { X: 'center', Y: 'center' },
            closeOnEscape: true
        };
        _this.state = {};
        return _this;
    }
    Animation.prototype.buttonClick = function (args) {
        if (args.target.textContent.toLowerCase() == 'confirm') {
            ej2_react_popups_1.DialogUtility.confirm(this.dialogArgs);
        }
    };
    Animation.prototype.onChange = function () {
        this.effect = this.listObj.value;
        this.dialogArgs.animationSettings.effect = this.effect;
    };
    Animation.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section row' },
                React.createElement("div", { className: "col-lg-8", id: "predefinedDialogAnimation" },
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "confirmBtn", cssClass: "e-success e-control e-btn dlgbtn", onClick: this.buttonClick.bind(this) }, "Confirm")),
                React.createElement("div", { className: 'col-lg-4 property-section' },
                    React.createElement(property_pane_1.PropertyPane, { title: 'Properties' },
                        React.createElement("div", null,
                            React.createElement(ej2_react_dropdowns_1.DropDownListComponent, { id: "effectDrop", dataSource: this.effectData, ref: function (dropdownlist) { _this.listObj = dropdownlist; }, fields: this.fields, change: this.onChange.bind(this), placeholder: "Animation effect", floatLabelType: "Always", value: this.value, popupHeight: "220px" }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to show and hide the predefined dialog using a variety of animation effects. The dropdown item that displays the animation effects can be selected and set to it.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null,
                    "The dialog can be opened or closed with an animation effect using the ",
                    React.createElement("code", null, "animationSettings"),
                    " property. You can also customize the duration of the animation and delay to begin the animation or disable the dialog's animation by setting the animation effect as none."),
                React.createElement("p", null,
                    React.createElement("b", null, "See also")),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        " ",
                        React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/dialog/render-a-dialog-using-utility-functions/" }, "documentation section"))))));
    };
    return Animation;
}(sample_base_1.SampleBase));
exports.Animation = Animation;
