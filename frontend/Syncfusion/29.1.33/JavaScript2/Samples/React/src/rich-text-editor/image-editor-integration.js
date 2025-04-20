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
exports.ImageEditorIntegration = void 0;
/**
 * Rich Text Editor Image Editor Integration sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var sample_base_1 = require("../common/sample-base");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_image_editor_1 = require("@syncfusion/ej2-image-editor");
require("./image-editor-integration.css");
var ImageEditorIntegration = /** @class */ (function (_super) {
    __extends(ImageEditorIntegration, _super);
    function ImageEditorIntegration() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.selection = new ej2_react_richtexteditor_1.NodeSelection();
        _this.isLoaded = false;
        _this.header = 'Image Editor';
        _this.dlgButtons = [
            {
                buttonModel: { content: 'Save', isPrimary: true },
                click: _this.onInsert.bind(_this),
            },
            { buttonModel: { content: 'Cancel' }, click: _this.onCancel.bind(_this) },
        ];
        _this.toolbar = ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
            'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
            'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
            'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
            'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur'];
        _this.quickToolbarSettings = {
            image: [
                'Replace',
                'Align',
                'Caption',
                'Remove',
                '-',
                'InsertLink',
                'OpenImageLink',
                'EditImageLink',
                'RemoveImageLink',
                'Display',
                'AltText',
                {
                    tooltipText: 'Image Editor',
                    template: '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span></button>',
                },
            ],
        };
        return _this;
    }
    ImageEditorIntegration.prototype.onInsert = function () {
        if (this.rteObj.formatter.getUndoRedoStack().length === 0) {
            this.rteObj.formatter.saveData();
        }
        this.saveSelection.restore();
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var imgData = this.imageEditorObj.getImageData();
        canvas.height = imgData.height;
        canvas.width = imgData.width;
        ctx.putImageData(imgData, 0, 0);
        this.isLoaded = true;
        this.rteObj.executeCommand('editImage', {
            url: canvas.toDataURL(),
            width: { width: canvas.width },
            height: { height: canvas.height },
            selection: this.saveSelection,
            cssClass: this.imageELement.getAttribute('class').replace('e-rte-image', ''),
        });
        this.rteObj.formatter.saveData();
        this.rteObj.formatter.enableUndo(this.rteObj);
        this.dispose();
        this.dialogObj.hide();
    };
    ImageEditorIntegration.prototype.onCancel = function () {
        this.dispose();
        this.dialogObj.hide();
        this.isLoaded = true;
    };
    ImageEditorIntegration.prototype.onToolbarClick = function (args) {
        if (args.item.tooltipText === 'Image Editor') {
            this.range = this.selection.getRange(document);
            this.saveSelection = this.selection.save(this.range, document);
            this.dialogObj.show();
            this.rteObj.quickToolbarModule.imageQTBar.hidePopup();
        }
    };
    ImageEditorIntegration.prototype.dispose = function () {
        var imageEditorInstance = (0, ej2_base_1.getComponent)(document.getElementById('image-editor'), 'image-editor');
        if (imageEditorInstance !== null && imageEditorInstance !== undefined) {
            imageEditorInstance.destroy();
        }
    };
    ImageEditorIntegration.prototype.onClose = function () {
        this.dispose();
        this.dialogObj.hide();
        this.isLoaded = true;
    };
    ImageEditorIntegration.prototype.open = function () {
        this.imageEditorObj.update();
        this.imageEditorObj.open(this.dataURL);
    };
    ImageEditorIntegration.prototype.OnBeforeOpen = function () {
        this.dispose();
        this.isLoaded = false;
        var selectNodes = this.rteObj.formatter.editorManager.nodeSelection.getNodeCollection(this.range);
        if (selectNodes.length == 1 && selectNodes[0].tagName == 'IMG') {
            this.imageELement = selectNodes[0];
            this.imageELement.crossOrigin = 'anonymous';
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = this.imageELement.offsetHeight;
            canvas.width = this.imageELement.offsetWidth;
            var imageELe = this.imageELement;
            var isLoded = this.isLoaded;
            var proxy = this;
            this.imageELement.onload = function () {
                ctx.drawImage(imageELe, 0, 0, canvas.width, canvas.height);
                proxy.dataURL = canvas.toDataURL();
            };
            if (!isLoded) {
                this.imageEditorObj = new ej2_image_editor_1.ImageEditor({
                    height: '450px'
                });
                this.imageEditorObj.appendTo('#image-editor');
                isLoded = true;
            }
            ;
        }
    };
    ImageEditorIntegration.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: 'control-pane' },
            React.createElement("div", { className: 'control-section', id: "rte" },
                React.createElement("div", { className: 'rte-control-section' },
                    React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "rteImageEditor", ref: function (richtexteditor) { _this.rteObj = richtexteditor; }, quickToolbarSettings: this.quickToolbarSettings, toolbarClick: this.onToolbarClick.bind(this) },
                        React.createElement("p", null,
                            "An image can be edited within a Rich Text Editor using an Image Editor.",
                            React.createElement("img", { id: "img1", style: { height: 335 }, src: "https://ej2.syncfusion.com/angular/demos/assets/image-editor/images/default.png", "aria-label": "Bridge" })),
                        React.createElement("p", null, "It allows users to quickly and easily add an Image Editor to their Rich Text Editor. It provides a variety of features, including image cropping, resizing, rotation, and more. Additionally, it supports a wide range of image formats, including JPEG, PNG, and GIF."),
                        React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })),
                    React.createElement(ej2_react_popups_1.DialogComponent, { id: "ImageEditorDialog", ref: function (dialog) { _this.dialogObj = dialog; }, buttons: this.dlgButtons, open: this.open.bind(this), beforeOpen: this.OnBeforeOpen.bind(this), header: this.header, visible: false, showCloseIcon: true, width: "800px", height: "550px", isModal: true, close: this.onClose.bind(this) },
                        React.createElement("div", { className: "dialogContent" },
                            React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { id: "image-editor", height: "400px", ref: function (imageEditor) { _this.imageEditorObj = imageEditor; }, toolbar: this.toolbar }))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This example demonstrates how to integrate Image Editor into Rich Text Editor component. To use it, simply click on the image to open the quick toolbar and select Image Editor custom quick toolbar. Then, the image will be opened in the Image Editor.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Image Editor component is integrated into the Rich Text Editor and opens the Image Editor within a Dialog when the Image Editor custom quick toolbar is clicked and allows to edit the image. To achieve this, the sample is customized for the Image Editor and Rich Text Editor"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        "Include the Image Editor custom toolbar item in the ",
                        React.createElement("a", { target: '_blank', href: 'https://helpej2.syncfusion.com/react/documentation/api/rich-text-editor/quickToolbarSettingsModel/#image' }, "quickToolbarSettings.image"),
                        " property of the Rich Text Editor"),
                    React.createElement("li", null,
                        "Configure the Image Editor within a Dialog using the ",
                        React.createElement("a", { target: '_blank', href: 'https://helpej2.syncfusion.com/react/documentation/api/dialog#beforeopen' }, "beforeOpen"),
                        " event of the Dialog"),
                    React.createElement("li", null, "Open the Dialog on clicking the Image Editor custom toolbar item"),
                    React.createElement("li", null, "Insert the edited image into the Rich Text Editor by clicking the Insert button")))));
    };
    return ImageEditorIntegration;
}(sample_base_1.SampleBase));
exports.ImageEditorIntegration = ImageEditorIntegration;
