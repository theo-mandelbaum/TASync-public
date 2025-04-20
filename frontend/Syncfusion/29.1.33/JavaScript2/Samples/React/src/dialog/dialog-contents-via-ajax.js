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
exports.AjaxContent = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./dialog-contents-via-ajax.css");
var AjaxContent = /** @class */ (function (_super) {
    __extends(AjaxContent, _super);
    function AjaxContent(props) {
        var _this = _super.call(this, props) || this;
        _this.innerContent = "On October 17, Microsoft will release its Fall Creators Update for the Windows\n    10 platform. Much like its previous counterpart, the Spring Creators Update, the release is set to deliver more \n    features to Windows 10 for both developers and users, with particular emphasis this time around on app modernization,\n    mixed reality, and game development and software updates. App modernization is the term Microsoft used in its press \n    event to encompass the features that will affect most Windows 10 users and developers.";
        _this.state = {
            hideDialog: true
        };
        _this.buttonRef = function (element) {
            _this.buttonEle = element;
        };
        _this.dlgButtonClick = _this.dlgButtonClick.bind(_this);
        _this.dialogClose = _this.dialogClose.bind(_this);
        _this.dialogOpen = _this.dialogOpen.bind(_this);
        _this.animationSettings = { effect: 'None' };
        _this.buttons = [{
                click: _this.dlgButtonClick,
                buttonModel: {
                    content: 'More Details',
                    isPrimary: true
                }
            }];
        return _this;
    }
    AjaxContent.prototype.buttonClick = function () {
        this.setState({ hideDialog: true });
    };
    AjaxContent.prototype.dlgButtonClick = function () {
        var _this = this;
        if (document.querySelector('.e-footer-content .e-btn').textContent === 'More Details') {
            var fetchApi = new ej2_base_1.Fetch('./src/dialog/blog.html', 'GET');
            fetchApi.send().then();
            fetchApi.onSuccess = function (data) {
                _this.dialogInstance.target = document.getElementById('target');
                _this.dialogInstance.content = data;
            };
            this.dialogInstance.buttons = [{ click: this.dlgButtonClick, buttonModel: { content: 'Less Details', isPrimary: true } }];
        }
        else {
            this.dialogInstance.content = this.innerContent;
            this.dialogInstance.buttons = [{ click: this.dlgButtonClick, buttonModel: { content: 'More Details', isPrimary: true } }];
        }
    };
    AjaxContent.prototype.dialogClose = function () {
        this.setState({ hideDialog: false });
        this.buttonEle.style.display = 'inline-block';
    };
    AjaxContent.prototype.dialogOpen = function () {
        this.buttonEle.style.display = 'none';
    };
    AjaxContent.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { id: 'target', className: 'control-section ajaxcontent col-lg-12' },
                React.createElement("button", { className: "e-control e-btn dlgbtn", ref: this.buttonRef, onClick: this.buttonClick.bind(this), id: "dialogBtn" }, "Open"),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "dialog", visible: this.state.hideDialog, header: '<img class="img1" src="src/dialog/images/2.png" alt="Microsoft roadmap">' + 'What’s Coming from Microsoft this Fall', showCloseIcon: true, animationSettings: this.animationSettings, ref: function (dialog) { return _this.dialogInstance = dialog; }, width: '500px', target: '#target', close: this.dialogClose, open: this.dialogOpen, content: this.innerContent, buttons: this.buttons })),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates that the content of dialog can be loaded from external HTML file. Click \"more details\" on dialog to load the content dynamically from external HTML file. Click \u201Copen\u201D to show the dialog again, if it is closed.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The user can load dialog's content dynamically from external source like external file using Fetch library. The Fetch library can make the request and load dialog's content using its success event."))));
    };
    return AjaxContent;
}(sample_base_1.SampleBase));
exports.AjaxContent = AjaxContent;
