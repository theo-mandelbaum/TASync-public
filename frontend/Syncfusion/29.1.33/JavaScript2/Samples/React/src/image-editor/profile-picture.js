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
exports.ProfilePicture = void 0;
var React = require("react");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var sample_base_1 = require("../common/sample-base");
require("./profile-picture.css");
var ProfilePicture = /** @class */ (function (_super) {
    __extends(ProfilePicture, _super);
    function ProfilePicture() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.animationSettings = { effect: 'None' };
        _this.imgSrc = '';
        _this.buttons = [
            {
                click: _this.dlgOpenButtonClick.bind(_this),
                buttonModel: {
                    content: 'Open',
                    cssClass: 'e-custom-img-btn e-img-custom-open'
                }
            },
            {
                click: _this.dlgResetButtonClick.bind(_this),
                buttonModel: {
                    content: 'Reset',
                    cssClass: 'e-custom-img-btn e-img-custom-reset'
                }
            },
            {
                click: _this.dlgRotateButtonClick.bind(_this),
                buttonModel: {
                    content: 'Rotate',
                    cssClass: 'e-custom-img-btn e-img-custom-rotate'
                }
            },
            {
                click: _this.dlgDoneButtonClick.bind(_this),
                buttonModel: {
                    content: 'Apply',
                    cssClass: 'e-custom-img-btn e-img-custom-apply',
                    isPrimary: true
                }
            }
        ];
        return _this;
    }
    ProfilePicture.prototype.fileChanged = function (args) {
        var URL = window.URL;
        var url = URL.createObjectURL(args.target.files[0]);
        this.imageEditorInstance.open(url.toString());
        document.getElementById('img-upload').value = null;
        this.imgSrc = url.toString();
    };
    ProfilePicture.prototype.handleImageLoaded = function () {
        if (this.imgSrc === '') {
            var canvas = document.querySelector('#img-canvas');
            var image = document.querySelector('#custom-img');
            var ctx = canvas.getContext('2d');
            canvas.width = image.width < image.height ? image.width : image.height;
            canvas.height = canvas.width;
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            document.querySelector('.e-profile').classList.remove('e-hide');
        }
    };
    ProfilePicture.prototype.dlgOpenButtonClick = function () {
        document.getElementById('img-upload').click();
    };
    ProfilePicture.prototype.dlgResetButtonClick = function () {
        this.imageEditorInstance.reset();
    };
    ProfilePicture.prototype.dlgRotateButtonClick = function () {
        this.imageEditorInstance.rotate(-90);
    };
    ProfilePicture.prototype.dlgDoneButtonClick = function () {
        this.imageEditorInstance.crop();
        var croppedData = this.imageEditorInstance.getImageData();
        var canvas = document.querySelector('#img-canvas');
        var ctx = canvas.getContext('2d');
        var parentDiv = document.querySelector('.e-profile');
        var tempCanvas = parentDiv.appendChild((0, ej2_base_1.createElement)('canvas'));
        var tempContext = tempCanvas.getContext('2d');
        tempCanvas.width = croppedData.width;
        tempCanvas.height = croppedData.height;
        tempContext.putImageData(croppedData, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(tempCanvas, 0, 0, canvas.width, canvas.height);
        tempCanvas.remove();
        parentDiv.style.borderRadius = '100%';
        canvas.style.backgroundColor = '#fff';
        this.dialogInstance.hide();
        if (this.imgSrc !== '') {
            var img = document.querySelector('#custom-img');
            img.src = this.imgSrc;
        }
    };
    ProfilePicture.prototype.contentTemplate = function () {
        var _this = this;
        return (React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { ref: function (img) { return _this.imageEditorInstance = img; }, toolbar: [], fileOpened: this.fileOpened.bind(this), created: this.created.bind(this) }));
    };
    ProfilePicture.prototype.fileOpened = function () {
        this.imageEditorInstance.select('circle');
    };
    ProfilePicture.prototype.created = function () {
        if (this.imageEditorInstance.theme && window.location.href.split('#')[1]) {
            this.imageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
        }
    };
    ProfilePicture.prototype.editClicked = function () {
        this.dialogInstance.show();
        var image = document.querySelector('#custom-img');
        this.imageEditorInstance.open(image.src);
    };
    ;
    ProfilePicture.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'col-lg-12 control-section e-img-editor-profile' },
                React.createElement("div", { className: 'e-profile e-hide' },
                    React.createElement("div", { className: 'e-custom-wrapper' },
                        React.createElement("canvas", { id: 'img-canvas' }),
                        React.createElement("img", { alt: 'img', className: 'e-custom-img', id: 'custom-img', onLoad: this.handleImageLoaded.bind(this), src: 'src/image-editor/images/profile.png' }),
                        React.createElement("input", { type: 'file', id: 'img-upload', className: 'e-custom-file', onChange: this.fileChanged.bind(this), accept: "image/*" }),
                        React.createElement("span", { id: 'custom-edit', className: 'e-custom-edit', onClick: this.editClicked.bind(this) },
                            React.createElement("span", { className: 'e-custom-icon sb-icons' }))))),
            React.createElement("div", { id: 'profile-dialog' },
                React.createElement(ej2_react_popups_1.DialogComponent, { id: 'profile-dialog', showCloseIcon: true, animationSettings: this.animationSettings, closeOnEscape: true, visible: false, width: '340px', height: '420px', ref: function (dialog) { return _this.dialogInstance = dialog; }, target: '.e-img-editor-profile', header: 'Edit Profile Image', buttons: this.buttons, content: this.contentTemplate.bind(this), position: { X: 'center', Y: 100 } })),
            React.createElement("div", { id: 'action-description' },
                React.createElement("p", null, "The Image Editor component provides built-in support to rotate an image using the rotate method and support to crop an image using the select and crop methods.")),
            React.createElement("div", { id: 'description' },
                React.createElement("p", null, "In this demo, Image Editor is rendered within a dialog and opens an image by passing its URL path to the open method of the Image Editor control."),
                React.createElement("p", null, " The following operations are supported in the Image Editor. :  "),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Selection"),
                        " : Multiple selection options are available. The selection region can be a square or circle, customized to various aspect ratios, and customized by dragging and resizing."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Crop"),
                        " : The image can be cropped based on the selection."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Rotate"),
                        " : The image can be rotated both clockwise and anticlockwise by 90 degrees.")),
                React.createElement("p", null,
                    "More information about Image Editor can be found in this",
                    React.createElement("a", { target: '_blank', href: 'https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/' }, " documentation section"),
                    "."))));
    };
    return ProfilePicture;
}(sample_base_1.SampleBase));
exports.ProfilePicture = ProfilePicture;
