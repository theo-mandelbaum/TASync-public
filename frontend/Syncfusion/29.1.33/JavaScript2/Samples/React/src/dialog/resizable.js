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
exports.Resizable = void 0;
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./resizable.css");
var Resizable = /** @class */ (function (_super) {
    __extends(Resizable, _super);
    function Resizable(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.dialogClose = _this.dialogClose.bind(_this);
        _this.dialogOpen = _this.dialogOpen.bind(_this);
        _this.animationSettings = { effect: 'None' };
        return _this;
    }
    Resizable.prototype.buttonClick = function (args) {
        this.setState({ hideDialog: true });
    };
    Resizable.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    };
    Resizable.prototype.dialogOpen = function () {
        this.setState({ hideDialog: true });
        this.buttonEle.style.display = 'none';
    };
    Resizable.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'col-lg-12 control-section dialog-resizable' },
                React.createElement("button", { className: 'e-control e-btn dlgbtn', ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: 'dialogBtn' }, "Open Dialog"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'resizableDialog', header: 'Resize Me!!!', allowDragging: true, showCloseIcon: true, animationSettings: this.animationSettings, width: '300px', ref: function (resizableDialog) { return _this.resizableDialogInstance = resizableDialog; }, target: '#target', visible: this.state.hideDialog, enableResize: true, resizeHandles: ['All'], open: this.dialogOpen, close: this.dialogClose }, "This is a dialog with resizable support."),
                React.createElement("div", { id: "action-description" },
                    React.createElement("p", null, "This sample demonstrates the resize operation of the dialog control in all directions. To resize the modal dialog, select and resize a dialog using its handle (grip) or hover on any of the edges or border of the dialog within the sample container. The \"open dialog\" button is used to reopen the dialog if it is closed.")),
                React.createElement("div", { id: "description" },
                    React.createElement("p", null, "Users can create resizable modal dialog by setting the enableResize property to true, which is used to change the size of a dialog dynamically and view its content with expanded mode. The resizeHandles property can also be configured for which directions the dialog should resize. When you configure the target property along with enableResize property, the dialog can be resized within its specified target container.")))));
    };
    return Resizable;
}(sample_base_1.SampleBase));
exports.Resizable = Resizable;
