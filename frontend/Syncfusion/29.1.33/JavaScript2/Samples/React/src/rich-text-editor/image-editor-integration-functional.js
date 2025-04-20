"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Rich Text Editor Image Editor integration sample
 */
var ej2_react_richtexteditor_1 = require("@syncfusion/ej2-react-richtexteditor");
var React = require("react");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var sample_base_1 = require("../common/sample-base");
var ej2_base_1 = require("@syncfusion/ej2-base");
var ej2_image_editor_1 = require("@syncfusion/ej2-image-editor");
require("./image-editor-integration.css");
function ImageEditorIntegration() {
    React.useEffect(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var rteObj;
    var dlgButtons = [
        {
            buttonModel: { content: 'Save', isPrimary: true },
            click: onInsert.bind(this),
        },
        { buttonModel: { content: 'Cancel' }, click: onCancel },
    ];
    var toolbar = ['Undo', 'Redo', 'Crop', 'Annotate', 'ZoomIn', 'ZoomOut',
        'Reset', 'Pan', 'Finetune', 'Filter', 'Pen', 'Line', 'Rectangle', 'Ellipse', 'Arrow',
        'Path', 'Text', 'CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection',
        'Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert', 'Brightness', 'Contrast',
        'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur'];
    var selection = new ej2_react_richtexteditor_1.NodeSelection();
    var header = 'Image Editor';
    var dialogObj;
    var imageEditorObj;
    var rteObj;
    var range;
    var saveSelection;
    var dataURL;
    var isLoaded = false;
    var imageELement;
    function onInsert() {
        if (rteObj.formatter.getUndoRedoStack().length === 0) {
            rteObj.formatter.saveData();
        }
        saveSelection.restore();
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var imgData = imageEditorObj.getImageData();
        canvas.height = imgData.height;
        canvas.width = imgData.width;
        ctx.putImageData(imgData, 0, 0);
        isLoaded = true;
        rteObj.executeCommand('editImage', {
            url: canvas.toDataURL(),
            width: { width: canvas.width },
            height: { height: canvas.height },
            selection: saveSelection,
            cssClass: imageELement.getAttribute('class').replace('e-rte-image', ''),
        });
        rteObj.formatter.saveData();
        rteObj.formatter.enableUndo(rteObj);
        dispose();
        dialogObj.hide();
    }
    function onCancel() {
        dispose();
        dialogObj.hide();
        isLoaded = true;
    }
    function dispose() {
        var imageEditorInstance = (0, ej2_base_1.getComponent)(document.getElementById('image-editor'), 'image-editor');
        if (imageEditorInstance !== null && imageEditorInstance !== undefined) {
            imageEditorInstance.destroy();
        }
    }
    function open() {
        imageEditorObj.update();
        imageEditorObj.open(dataURL);
    }
    function onClose() {
        dispose();
        dialogObj.hide();
        isLoaded = true;
    }
    function onToolbarClick(args) {
        if (args.item.tooltipText === 'Image Editor') {
            range = selection.getRange(document);
            saveSelection = selection.save(range, document);
            dialogObj.show();
            rteObj.quickToolbarModule.imageQTBar.hidePopup();
        }
    }
    function OnBeforeOpen() {
        dispose();
        isLoaded = false;
        var selectNodes = rteObj.formatter.editorManager.nodeSelection.getNodeCollection(range);
        if (selectNodes.length == 1 && selectNodes[0].tagName == 'IMG') {
            imageELement = selectNodes[0];
            imageELement.crossOrigin = 'anonymous';
            var canvas = document.createElement('CANVAS');
            var ctx = canvas.getContext('2d');
            canvas.height = imageELement.offsetHeight;
            canvas.width = imageELement.offsetWidth;
            var imageELe = imageELement;
            var isLoded = isLoaded;
            imageELement.onload = function () {
                ctx.drawImage(imageELe, 0, 0, canvas.width, canvas.height);
                dataURL = canvas.toDataURL();
            };
            if (!isLoaded) {
                imageEditorObj = new ej2_image_editor_1.ImageEditor({
                    height: '450px'
                });
                imageEditorObj.appendTo('#image-editor');
            }
        }
    }
    var quickToolbarSettings = {
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
                template: '<button class="e-tbar-btn e-btn" id="imageEditor"><span class="e-btn-icon e-icons e-rte-image-editor"></span>',
            },
        ],
    };
    return (React.createElement("div", { className: 'control-pane' },
        React.createElement("div", { className: 'control-section', id: "rte" },
            React.createElement("div", { className: 'rte-control-section' },
                React.createElement(ej2_react_richtexteditor_1.RichTextEditorComponent, { id: "rteImageEditor", ref: function (scope) {
                        rteObj = scope;
                    }, quickToolbarSettings: quickToolbarSettings, toolbarClick: onToolbarClick },
                    React.createElement("p", null,
                        "An image can be edited within a Rich Text Editor using an Image Editor.",
                        React.createElement("img", { id: "img1", style: { height: 335 }, src: "https://ej2.syncfusion.com/angular/demos/assets/image-editor/images/default.png", "aria-label": "Bridge" })),
                    React.createElement("p", null, "It allows users to quickly and easily add an Image Editor to their Rich Text Editor. It provides a variety of features, including image cropping, resizing, rotation, and more. Additionally, it supports a wide range of image formats, including JPEG, PNG, and GIF."),
                    React.createElement(ej2_react_richtexteditor_1.Inject, { services: [ej2_react_richtexteditor_1.Toolbar, ej2_react_richtexteditor_1.Image, ej2_react_richtexteditor_1.Link, ej2_react_richtexteditor_1.HtmlEditor, ej2_react_richtexteditor_1.QuickToolbar, ej2_react_richtexteditor_1.PasteCleanup, ej2_react_richtexteditor_1.Table, ej2_react_richtexteditor_1.Video, ej2_react_richtexteditor_1.Audio] })),
                React.createElement(ej2_react_popups_1.DialogComponent, { id: "ImageEditorDialog", ref: function (scope) {
                        dialogObj = scope;
                    }, buttons: dlgButtons, open: open, beforeOpen: OnBeforeOpen, header: header, visible: false, showCloseIcon: true, width: "800px", height: "550px", isModal: true, close: onClose },
                    React.createElement("div", { className: "dialogContent" },
                        React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { id: "image-editor", height: "400px", ref: function (scope) {
                                imageEditorObj = scope;
                            }, toolbar: toolbar }))))),
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
}
exports.default = ImageEditorIntegration;
