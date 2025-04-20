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
exports.Default = void 0;
var React = require("react");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./default.css");
var Default = /** @class */ (function (_super) {
    __extends(Default, _super);
    function Default(props) {
        return _super.call(this, props) || this;
    }
    Default.prototype.clrBtnCreated = function () {
        document.getElementById('signclear').addEventListener('click', this.clrBtnClick);
    };
    Default.prototype.saveBtnCreated = function () {
        document.getElementById('signsave').addEventListener('click', this.saveBtnClick);
    };
    Default.prototype.saveBtnClick = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        signature.save();
    };
    Default.prototype.clrBtnClick = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var saveBtn = (0, ej2_base_1.getComponent)(document.getElementById("signsave"), 'btn');
        var clrBtn = (0, ej2_base_1.getComponent)(document.getElementById("signclear"), 'btn');
        signature.clear();
        if (signature.isEmpty()) {
            saveBtn.disabled = true;
            clrBtn.disabled = true;
        }
    };
    Default.prototype.change = function () {
        var signature = (0, ej2_base_1.getComponent)(document.getElementById('signature'), 'signature');
        var saveBtn = (0, ej2_base_1.getComponent)(document.getElementById("signsave"), 'btn');
        var clrBtn = (0, ej2_base_1.getComponent)(document.getElementById("signclear"), 'btn');
        if (!signature.isEmpty()) {
            saveBtn.disabled = false;
            clrBtn.disabled = false;
        }
    };
    Default.prototype.render = function () {
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: "col-lg-12 control-section" },
                React.createElement("div", { id: "signature-control" },
                    React.createElement("div", { className: 'e-sign-heading' },
                        React.createElement("span", { id: "signdescription" }, "Sign below"),
                        React.createElement("span", { className: "e-btn-options" },
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "signsave", cssClass: 'e-primary e-sign-save', created: this.saveBtnCreated.bind(this), disabled: true }, "SAVE"),
                            React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "signclear", cssClass: 'e-primary e-sign-clear', created: this.clrBtnCreated.bind(this), disabled: true }, "CLEAR"))),
                    React.createElement(ej2_react_inputs_1.SignatureComponent, { id: "signature", change: this.change.bind(this) }))),
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
    return Default;
}(sample_base_1.SampleBase));
exports.Default = Default;
