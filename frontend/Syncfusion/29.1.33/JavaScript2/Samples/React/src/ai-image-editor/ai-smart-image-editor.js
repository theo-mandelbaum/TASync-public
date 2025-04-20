"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_popups_1 = require("@syncfusion/ej2-react-popups");
var ej2_base_1 = require("@syncfusion/ej2-base");
var react_1 = require("react");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var stability_ai_model_1 = require("./stability-ai-model");
require("./image-editor.css");
function ImageEditor() {
    var imageEditorObj;
    var treeObj;
    var sideObj;
    var outlineTextBox;
    var colorPicker;
    var wrapperDiv;
    var colorPickerVal = '';
    (0, react_1.useEffect)(function () {
        var draggableElements = ['magic-eraser', 'bg-changer'];
        draggableElements.forEach(function (className) {
            var dragElement = document.getElementsByClassName(className)[0];
            new ej2_base_1.Draggable(dragElement, { clone: false });
        });
        imageEditorObj.open('images/image-ai.png');
    }, []);
    var folderEle = '<div class= "e-folder"><div class= "e-folder-name">AI Image Editor</div></div>';
    var treeData = [
        { id: "1", name: "Magic Eraser", imageUrl: "images/object-remover.gif" },
        { id: "2", name: "Change Background", imageUrl: "images/change-bg.png" },
        { id: "2", name: "Remove Background", imageUrl: "images/remove-bg.png" }
    ];
    // Assume you already have an ImageData object named imageData
    function imageDataToBase64(imageData) {
        var canvas = document.createElement('canvas');
        canvas.width = imageData.width;
        canvas.height = imageData.height;
        var ctx = canvas.getContext('2d');
        if (ctx) {
            ctx.putImageData(imageData, 0, 0);
            return canvas.toDataURL();
        }
        return '';
    }
    function toggleDisplay(elementClassToShow, elementClassToHide) {
        document.getElementsByClassName(elementClassToHide)[0].style.display = 'none';
        document.getElementsByClassName(elementClassToShow)[0].style.display = 'block';
    }
    function processImageData() {
        (0, ej2_react_popups_1.showSpinner)(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        var imageData = imageEditorObj.getImageData(false);
        var url = imageDataToBase64(imageData);
        var file = base64ToFile(url, 'image.png');
        removeBG(file);
    }
    function OnSelect(args) {
        switch (args.nodeData.text) {
            case "Magic Eraser":
                toggleDisplay('magic-eraser', 'bg-changer');
                imageEditorObj.update();
                imageEditorObj.element.setAttribute('data-value', 'mask-drawing');
                imageEditorObj.freehandDraw(true);
                treeObj.selectedNodes = [];
                break;
            case "Change Background":
                toggleDisplay('bg-changer', 'magic-eraser');
                treeObj.selectedNodes = [];
                processImageData();
                break;
            case "Remove Background":
                processImageData();
                break;
        }
    }
    function bgRemoveBtnClick() {
        document.getElementsByClassName('bg-changer')[0].style.display = 'none';
        colorPicker.refresh();
        colorPickerVal = '#ffffff';
        outlineTextBox.value = '';
        var selectedElement = colorPicker.element.parentElement.querySelector('.e-selected');
        if (selectedElement) {
            selectedElement.classList.remove('e-selected');
        }
        (0, ej2_react_popups_1.hideSpinner)(imageEditorObj.element);
        wrapperDiv.style.opacity = '1';
    }
    function getImageDataAsBase64(imageEditor) {
        var imageData = imageEditor.getImageData(false);
        return imageDataToBase64(imageData);
    }
    function base64ToFile(base64String, fileName) {
        var byteString = atob(base64String.split(',')[1]);
        var arrayBuffer = new ArrayBuffer(byteString.length);
        var intArray = new Uint8Array(arrayBuffer);
        for (var i = 0; i < byteString.length; i++) {
            intArray[i] = byteString.charCodeAt(i);
        }
        var blob = new Blob([intArray], { type: 'image/png' });
        var file = new File([blob], fileName, { type: 'image/png' });
        return file;
    }
    function removeBG(file) {
        var aiOutput = (0, stability_ai_model_1.StabilityAiModelBGRemover)(file);
        aiOutput.then(function (result) {
            imageEditorObj.open(result, false, { backgroundColor: '' });
            setTimeout(function () {
                (0, ej2_react_popups_1.hideSpinner)(imageEditorObj.element);
                wrapperDiv.style.opacity = '1';
                treeObj.selectedNodes = [];
            }, 100);
        });
    }
    var removeBtnClick = function () {
        imageEditorObj.element.setAttribute('data-value', '');
        document.getElementsByClassName('magic-eraser')[0].style.display = 'none';
        (0, ej2_react_popups_1.hideSpinner)(imageEditorObj.element);
        wrapperDiv.style.opacity = '1';
        imageEditorObj.discard();
    };
    var bgBtnClick = function () {
        bgRemoveBtnClick();
    };
    var eraseBtnClick = function () {
        var maskUrl = getImageDataAsBase64(imageEditorObj);
        imageEditorObj.element.setAttribute('data-value', '');
        imageEditorObj.freehandDraw(false);
        var url = getImageDataAsBase64(imageEditorObj);
        (0, ej2_react_popups_1.showSpinner)(imageEditorObj.element);
        var file = base64ToFile(url, 'image.png');
        var maskFile = base64ToFile(maskUrl, 'mask.png');
        var aiOutput = (0, stability_ai_model_1.StabilityAiModelMagicEraser)(file, maskFile);
        aiOutput.then(function (result) {
            imageEditorObj.open(result, false, { backgroundColor: '' });
            setTimeout(function () {
                (0, ej2_react_popups_1.hideSpinner)(imageEditorObj.element);
                wrapperDiv.style.opacity = '1';
                treeObj.selectedNodes = [];
            }, 100);
            document.getElementsByClassName('magic-eraser')[0].style.display = 'none';
        });
    };
    var bgChangeBtnClick = function () {
        (0, ej2_react_popups_1.showSpinner)(imageEditorObj.element);
        wrapperDiv.style.opacity = '0.5';
        if (outlineTextBox.value && outlineTextBox.value !== '') {
            var url = getImageDataAsBase64(imageEditorObj);
            var file = base64ToFile(url, 'image.png');
            var prompt_1 = outlineTextBox.value;
            var searchPrompt = 'Background of the image';
            var aiOutput = (0, stability_ai_model_1.StabilityAiModel)(file, prompt_1, searchPrompt);
            aiOutput.then(function (result) {
                imageEditorObj.open(result, false, { backgroundColor: '' });
                setTimeout(function () {
                    bgRemoveBtnClick();
                }, 100);
                document.getElementsByClassName('bg-changer')[0].style.display = 'none';
            });
        }
        else {
            bgRemoveBtnClick();
        }
    };
    function change(args) {
        colorPickerVal = args.currentValue.hex;
        imageEditorObj.open('', false, { backgroundColor: colorPickerVal });
    }
    function toolbarCliked(args) {
        if (args.item.tooltipText == "Menu") {
            sideObj.toggle();
            setTimeout(function () {
                imageEditorObj.update();
            }, 500);
        }
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: "container" },
            React.createElement("div", { id: "wrapper-container", ref: function (wrapper) { return wrapperDiv = wrapper; } },
                React.createElement("div", { className: "magic-eraser" },
                    React.createElement("div", { className: "upper-div" },
                        React.createElement("label", null, "Magic Eraser"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "remove-btn", "aria-label": "button", onClick: removeBtnClick, iconCss: 'e-icons e-close', cssClass: 'e-small e-round', isPrimary: true })),
                    React.createElement("div", { className: "lower-div" },
                        React.createElement("img", { src: "images/object-remover.gif", style: { width: "130px", height: "130px" } }),
                        React.createElement("br", null),
                        React.createElement("span", null, "Select the object to be removed")),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "remove-button", id: "eraseBtn", isPrimary: true, onClick: eraseBtnClick }, "Remove")),
                React.createElement("div", { className: "bg-changer" },
                    React.createElement("div", { className: "upper-div" },
                        React.createElement("label", null, "Change Background"),
                        React.createElement(ej2_react_buttons_1.ButtonComponent, { id: "bg-change-remove-btn", "aria-label": "button", onClick: bgBtnClick, iconCss: 'e-icons e-close', cssClass: 'e-small e-round', isPrimary: true })),
                    React.createElement("div", { className: "lower-div" },
                        React.createElement("div", { className: "col-lg-12 control-section" },
                            React.createElement("div", { id: "colorpicker-control" },
                                React.createElement("span", { style: { marginBottom: "10px" } }, "New Color"),
                                React.createElement("br", null),
                                React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "color-picker", type: "color", change: change }))),
                        React.createElement("br", null),
                        React.createElement("span", null, "Preset Colors"),
                        React.createElement("div", { className: "col-xs-12 col-sm-12 col-lg-6 col-md-6" },
                            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: function (colorpickerObj) { return colorPicker = colorpickerObj; }, id: "circle-palette", type: "color", mode: "Palette", modeSwitcher: false, inline: true, showButtons: false, columns: 6, presetColors: {
                                    'custom': ['#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                                        '#009688', '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107']
                                }, beforeTileRender: function (args) {
                                    args.element.classList.add('e-circle-palette');
                                    args.element.appendChild((0, ej2_base_1.createElement)('span', { className: 'e-circle-selection' }));
                                }, change: change })),
                        React.createElement("span", null, "Custom Background"),
                        React.createElement("br", null),
                        React.createElement(ej2_react_inputs_1.TextBoxComponent, { id: "outlined", ref: function (textbox) { return outlineTextBox = textbox; }, placeholder: 'Example: Waterfalls, Mountains, etc..', cssClass: 'e-outline' })),
                    React.createElement(ej2_react_buttons_1.ButtonComponent, { className: "bg-change-button", id: "bgChangeBtn", onClick: bgChangeBtnClick, isPrimary: true }, "Apply")),
                React.createElement("div", { id: "sidebar-wrapper", className: "control-section" },
                    React.createElement("div", { style: { width: "100%" } },
                        React.createElement(ej2_react_navigations_1.ToolbarComponent, { id: "defaultToolbar", cssClass: "defaultToolbar", height: "50px", clicked: toolbarCliked },
                            React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                React.createElement(ej2_react_navigations_1.ItemDirective, { prefixIcon: "e-tbar-menu-icon tb-icons", tooltipText: "Menu" }),
                                React.createElement(ej2_react_navigations_1.ItemDirective, { template: folderEle, cssClass: "e-folder" })))),
                    React.createElement("div", { className: "maincontent", style: { width: "100%" } },
                        React.createElement("div", { id: "controlWrapper" },
                            React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { id: "imageeditor", className: "row", ref: function (imageEditor) { return imageEditorObj = imageEditor; }, fileOpened: function () {
                                    setTimeout(function () {
                                        imageEditorObj.update();
                                    }, 200);
                                } })))),
                React.createElement(ej2_react_navigations_1.SidebarComponent, { id: "defaultSidebar", className: "default-sidebar", ref: function (sidebar) { return sideObj = sidebar; }, width: "200px", target: ".maincontent", position: 'Left', type: 'Push' },
                    React.createElement(ej2_react_navigations_1.TreeViewComponent, { id: "defaultTree", cssClass: "image-editor-tree", ref: function (tree) { return treeObj = tree; }, nodeSelected: OnSelect, fields: { dataSource: treeData, id: "id", text: "name", selected: "selected", parentID: "pid", hasChildren: "hasChild", expanded: "expanded" } }))))));
}
exports.default = ImageEditor;
