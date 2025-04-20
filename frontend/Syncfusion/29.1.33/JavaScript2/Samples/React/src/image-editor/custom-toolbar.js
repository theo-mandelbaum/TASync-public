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
exports.CustomToolbar = void 0;
var React = require("react");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var sample_base_1 = require("../common/sample-base");
require("./custom-toolbar.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var base_1 = require("@syncfusion/ej2/base");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var CustomToolbar = /** @class */ (function (_super) {
    __extends(CustomToolbar, _super);
    function CustomToolbar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.currentToolbar = 'main';
        _this.isShapeCustomizing = false;
        _this.isTextEditing = false;
        _this.isShapeSelected = false;
        _this.filter = ej2_react_image_editor_1.ImageFilterOption.Default;
        _this.presetColors = {
            'custom': ['#ffffff', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
                '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
        };
        _this.toolbars = ['filter', 'rectangle', 'ellipse', 'line', 'text', 'edittext', 'freehanddraw'];
        return _this;
    }
    CustomToolbar.prototype.imageEditorCreated = function () {
        if (this.imageEditorInstance.theme && window.location.href.split('#')[1]) {
            this.imageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
        }
    };
    CustomToolbar.prototype.editClicked = function () {
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('image-editor-container').style.display = 'block';
        this.imageEditorInstance.open(document.getElementById('previewImgContainer').src);
        var toolbarArea = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        this.refreshToolbar('main');
    };
    ;
    CustomToolbar.prototype.fileOpened = function () {
        this.imageData = this.imageEditorInstance.getImageData();
    };
    ;
    CustomToolbar.prototype.onIECreated = function () {
        var image = document.getElementById('previewImgContainer');
        if (base_1.Browser.isDevice && image) {
            image.src = 'src/image-editor/images/flower.png';
        }
        document.addEventListener('keydown', this.keyDownEventHandler.bind(this));
        document.getElementById('image-editor-container').addEventListener('dblclick', this.doubleClickEvent.bind(this));
    };
    ;
    CustomToolbar.prototype.shapeChanging = function (args) {
        if (args.action === 'select') {
            this.isShapeSelected = true;
            this.updateToolbar(args, true);
        }
        else if (args.action === 'insert') {
            this.activeObjIndex = args.currentShapeSettings.id;
            this.tempShapeSettings = args.currentShapeSettings;
        }
    };
    ;
    CustomToolbar.prototype.shapeChange = function (args) {
        if (args.action === 'apply' && !this.isShapeCustomizing && !this.isShapeSelected) {
            this.isTextEditing = false;
            setTimeout(function () {
                this.refreshToolbar('main');
            }, 1);
        }
    };
    ;
    CustomToolbar.prototype.click = function () {
        if (this.toolbars.indexOf(this.currentToolbar) !== -1) {
            this.refreshToolbar('main');
        }
    };
    CustomToolbar.prototype.fontColorTemplate = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "imageEditor_textFont", ref: function (instance) { return _this.fontColorInstance = instance; }, mode: 'Palette', cssClass: 'e-text-font-color', modeSwitcher: false, noColor: false, inline: false, showButtons: false, presetColors: this.presetColors, change: this.fontColorChanged, value: this.tempShapeSettings && this.tempShapeSettings.color != null ? this.tempShapeSettings.color : '#fff', columns: 4 })));
    };
    CustomToolbar.prototype.fontColorChanged = function (args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        var selElem = this.fontColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        selElem.style.backgroundColor = args.currentValue.rgba;
        this.isShapeCustomizing = true;
        var shapeSetting = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
        shapeSetting.color = args.value;
        this.imageEditorInstance.updateShape(shapeSetting, true);
        this.tempShapeSettings.color = args.value;
        this.isShapeSelected = true;
        if (this.isTextEditing) {
            this.imageEditorInstance.enableTextEditing();
        }
        this.isShapeCustomizing = false;
    };
    CustomToolbar.prototype.annotationTemplate = function () {
        var _this = this;
        var items = [
            { text: 'Rectangle', id: 'rectangle', iconCss: 'e-icons e-rectangle' },
            { text: 'Ellipse', id: 'ellipse', iconCss: 'e-icons e-circle' },
            { text: 'Line', id: 'line', iconCss: 'e-icons e-line' }
        ];
        return (React.createElement("div", null,
            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { ref: function (instance) { return _this.annotationInstance = instance; }, id: "imageEditor_annotationButton", iconCss: 'e-icons e-shapes', cssClass: 'e-image-popup', items: items, select: this.annotationChange })));
    };
    CustomToolbar.prototype.annotationChange = function (args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        this.refreshToolbar(args.item.id);
    };
    CustomToolbar.prototype.fillColorTemplate = function () {
        var _this = this;
        var colors = (0, base_1.extend)({}, this.presetColors, {}, true);
        colors['custom'][0] = '';
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: function (instance) { return _this.fillColorInstance = instance; }, id: "imageEditor_shapeFill", mode: 'Palette', cssClass: 'e-shape-fill-color', modeSwitcher: false, noColor: true, inline: false, showButtons: false, presetColors: colors, beforeTileRender: this.tileRender, change: this.fillColorChanged, value: '', columns: 4 })));
    };
    CustomToolbar.prototype.tileRender = function (args) {
        args.element.classList.add("e-circle-palette");
        args.element.appendChild((0, base_1.createElement)("span", { className: "e-circle-selection" }));
    };
    CustomToolbar.prototype.fillColorChanged = function (args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        var selElem = this.fillColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        if (args.currentValue.rgba === '') {
            selElem.classList.add('e-nocolor-item');
        }
        else {
            selElem.classList.remove('e-nocolor-item');
            selElem.style.background = args.currentValue.rgba;
        }
        selElem.style.background = args.currentValue.rgba;
        this.isShapeCustomizing = true;
        var shapeSetting = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
        shapeSetting.fillColor = args.currentValue.rgba;
        this.imageEditorInstance.updateShape(shapeSetting, true);
        this.tempShapeSettings.fillColor = args.currentValue.rgba;
        this.isShapeSelected = true;
        if (this.isTextEditing) {
            this.imageEditorInstance.enableTextEditing();
        }
        this.isShapeCustomizing = false;
    };
    CustomToolbar.prototype.strokeColorTemplate = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: function (instance) { return _this.strokeColorInstance = instance; }, id: "imageEditor_shapeStroke", mode: 'Palette', cssClass: 'e-shape-stroke-color', modeSwitcher: false, noColor: false, inline: false, showButtons: false, presetColors: this.presetColors, beforeTileRender: this.strokeColorTileRender, change: this.strokeColorChanged, value: '#fff', columns: 4 })));
    };
    CustomToolbar.prototype.strokeColorTileRender = function (args) {
        args.element.classList.add("e-circle-palette");
        args.element.appendChild((0, base_1.createElement)("span", { className: "e-circle-selection" }));
    };
    CustomToolbar.prototype.strokeColorChanged = function (args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        var selElem = this.strokeColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        selElem.style.backgroundColor = args.currentValue.rgba;
        this.isShapeCustomizing = true;
        var shapeSetting = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
        shapeSetting.strokeColor = args.currentValue.rgba;
        this.imageEditorInstance.updateShape(shapeSetting, true);
        this.tempShapeSettings.strokeColor = args.currentValue.rgba;
        this.isShapeSelected = true;
        if (this.isTextEditing) {
            this.imageEditorInstance.enableTextEditing();
        }
        this.isShapeCustomizing = false;
    };
    CustomToolbar.prototype.penColorTemplate = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: function (instance) { return _this.penColorInstance = instance; }, id: "imageEditor_pen_stroke", mode: 'Palette', cssClass: 'e-pen-color', modeSwitcher: false, noColor: false, inline: false, showButtons: false, presetColors: this.presetColors, beforeTileRender: this.penTileRender, change: this.penColorChanged, value: '#fff', columns: 4 })));
    };
    CustomToolbar.prototype.penTileRender = function (args) {
        args.element.classList.add("e-circle-palette");
        args.element.appendChild((0, base_1.createElement)("span", { className: "e-circle-selection" }));
    };
    CustomToolbar.prototype.penColorChanged = function (args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        var selElem = this.penColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        ;
        selElem.style.backgroundColor = args.currentValue.rgba;
        if (this.tempShapeSettings && this.tempShapeSettings.id && this.tempShapeSettings.id.split('_')[0] === 'pen') {
            var shapeSetting = { id: this.tempShapeSettings.id, type: ej2_react_image_editor_1.ShapeType.FreehandDraw,
                startX: this.tempShapeSettings.startX, startY: this.tempShapeSettings.startY,
                strokeColor: args.currentValue.hex, strokeWidth: this.tempShapeSettings.strokeWidth,
                opacity: this.tempShapeSettings.opacity, points: this.tempShapeSettings.points };
            this.imageEditorInstance.updateShape(shapeSetting, true);
            this.tempShapeSettings.strokeColor = args.currentValue.hex;
            this.isShapeSelected = true;
        }
        else {
            var shapeSetting = { id: null, type: ej2_react_image_editor_1.ShapeType.FreehandDraw, startX: null, startY: null,
                strokeColor: args.currentValue.hex };
            this.imageEditorInstance.updateShape(shapeSetting);
        }
    };
    CustomToolbar.prototype.defaultCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_defaultCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Default"))));
    };
    CustomToolbar.prototype.chromeCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_chromeCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Chrome"))));
    };
    CustomToolbar.prototype.coldCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_coldCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Cold"))));
    };
    CustomToolbar.prototype.warmCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_warmCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Warm"))));
    };
    CustomToolbar.prototype.grayscaleCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_grayscaleCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Grayscale"))));
    };
    CustomToolbar.prototype.sepiaCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_sepiaCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Sepia"))));
    };
    CustomToolbar.prototype.invertCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_invertCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Invert"))));
    };
    CustomToolbar.prototype.onTopToolbarCreated = function () {
        var toolbarArea = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    };
    CustomToolbar.prototype.onBottomToolbarCreated = function () {
        var toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    };
    CustomToolbar.prototype.onFilterToolbarCreated = function () {
        var inMemoryCanvas = document.createElement('canvas');
        var inMemoryContext = inMemoryCanvas.getContext('2d');
        inMemoryCanvas.width = this.imageData.width;
        inMemoryCanvas.height = this.imageData.height;
        inMemoryContext.putImageData(this.imageData, 0, 0);
        this.updateFilterCanvas('_defaultCanvas', 'default', inMemoryCanvas);
        this.updateFilterCanvas('_chromeCanvas', 'chrome', inMemoryCanvas);
        this.updateFilterCanvas('_coldCanvas', 'cold', inMemoryCanvas);
        this.updateFilterCanvas('_warmCanvas', 'warm', inMemoryCanvas);
        this.updateFilterCanvas('_grayscaleCanvas', 'grayscale', inMemoryCanvas);
        this.updateFilterCanvas('_sepiaCanvas', 'sepia', inMemoryCanvas);
        this.updateFilterCanvas('_invertCanvas', 'invert', inMemoryCanvas);
    };
    CustomToolbar.prototype.updateFilterCanvas = function (selector, type, inMemoryCanvas) {
        var filter = document.querySelector('#imageEditor' + selector);
        if (filter) {
            var ctx = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px';
            filter.style.height = '100px';
            ctx.filter = this.imageEditorInstance.getImageFilter(this.toPascalCase(type));
            ctx.drawImage(inMemoryCanvas, 0, 0, 300, 150);
        }
    };
    CustomToolbar.prototype.toolbarClicked = function (args) {
        var item = args.item.id.toLowerCase();
        var dimension = this.imageEditorInstance.getImageDimension();
        var imageData;
        var canvas;
        switch (item) {
            case 'back':
                this.apply();
                this.refreshToolbar('main');
                break;
            case 'cancel':
                this.isTextEditing = false;
                if (this.currentToolbar === 'main') {
                    document.getElementById('image-editor-container').style.display = 'none';
                    document.getElementById('imagePreviewContainer').style.display = 'block';
                    this.imageEditorInstance.reset();
                }
                else {
                    if ((this.isShapeCustomizing || this.isShapeSelected) && this.tempShapeSettings && this.tempShapeSettings.id) {
                        this.imageEditorInstance.updateShape(this.tempShapeSettings);
                    }
                    this.imageEditorInstance.clearSelection(true);
                    this.refreshToolbar('main');
                }
                break;
            case 'undo':
                if (this.currentToolbar === 'pen') {
                    this.imageEditorInstance.freeHandDraw(false);
                }
                this.isTextEditing = false;
                this.imageEditorInstance.undo();
                this.refreshToolbar('main');
                break;
            case 'redo':
                if (this.currentToolbar === 'pen') {
                    this.imageEditorInstance.freeHandDraw(false);
                }
                this.isTextEditing = false;
                this.imageEditorInstance.redo();
                this.refreshToolbar('main');
                break;
            case 'ok':
                this.isTextEditing = false;
                if (this.currentToolbar === 'main') {
                    imageData = this.imageEditorInstance.getImageData();
                    canvas = document.createElement('canvas');
                    canvas.width = imageData.width;
                    canvas.height = imageData.height;
                    canvas.getContext('2d').putImageData(imageData, 0, 0);
                    document.getElementById('previewImgContainer').src = canvas.toDataURL();
                    this.imageEditorInstance.open(imageData);
                    document.getElementById('image-editor-container').style.display = 'none';
                    document.getElementById('imagePreviewContainer').style.display = 'block';
                }
                else {
                    this.apply();
                    this.refreshToolbar('main');
                }
                break;
            case 'cropandtransform':
                this.imageEditorInstance.select('custom');
                this.refreshToolbar('crop');
                break;
            case 'rotateleft':
                this.imageEditorInstance.rotate(-90);
                break;
            case 'rotateright':
                this.imageEditorInstance.rotate(90);
                break;
            case 'addtext':
                this.imageEditorInstance.drawText(dimension.x + (dimension.width / 2) - 65, dimension.y + (dimension.height / 2) - 15, 'Add Text', 'Arial', 30, false, false, '#fff', true);
                this.isShapeSelected = true;
                this.refreshToolbar('text');
                break;
            case 'remove':
                if ((0, base_1.isNullOrUndefined)(this.activeObjIndex) && this.tempShapeSettings && this.tempShapeSettings.id) {
                    this.activeObjIndex = this.tempShapeSettings.id;
                }
                if (this.isTextEditing) {
                    this.tempShapeSettings = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
                    this.activeObjIndex = this.tempShapeSettings.id;
                }
                this.imageEditorInstance.deleteShape(this.activeObjIndex);
                this.refreshToolbar('main');
                break;
            case 'edittext':
                this.isTextEditing = true;
                this.imageEditorInstance.enableTextEditing();
                this.refreshToolbar('edittext');
                break;
            case 'addpen':
                this.imageEditorInstance.freeHandDraw(true);
                this.refreshToolbar('pen');
                break;
            case 'filters':
                this.refreshToolbar('filter');
                break;
        }
    };
    CustomToolbar.prototype.apply = function () {
        if (this.currentToolbar === 'crop') {
            this.imageEditorInstance.crop();
        }
        else if (this.currentToolbar === 'pen') {
            if (this.activeObjIndex && this.activeObjIndex.split('_')[0] === 'pen') {
                this.tempShapeSettings = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
            }
            else {
                var shapeSettings = this.imageEditorInstance.getShapeSettings();
                if (shapeSettings.length > 0) {
                    this.tempShapeSettings = shapeSettings[shapeSettings.length - 1].id.split('_')[0] === 'pen' ? shapeSettings[shapeSettings.length - 1] : null;
                    if (this.tempShapeSettings) {
                        this.imageEditorInstance.selectShape(this.tempShapeSettings.id);
                    }
                    else {
                        this.imageEditorInstance.freeHandDraw(false);
                    }
                }
                else {
                    this.imageEditorInstance.freeHandDraw(false);
                    return;
                }
            }
            if (this.tempShapeSettings) {
                this.imageEditorInstance.updateShape(this.tempShapeSettings);
            }
        }
        else if (this.currentToolbar === 'freehanddraw' && this.tempShapeSettings) {
            this.imageEditorInstance.updateShape(this.tempShapeSettings);
        }
        else if (this.currentToolbar !== 'filter' && this.activeObjIndex) {
            this.tempShapeSettings = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
            this.imageEditorInstance.updateShape(this.tempShapeSettings);
        }
        this.tempShapeSettings = null;
        this.activeObjIndex = null;
    };
    CustomToolbar.prototype.filterImage = function (args) {
        this.imageEditorInstance.applyImageFilter(args.item.id);
        this.filter = args.item.id;
    };
    CustomToolbar.prototype.refreshToolbar = function (type, isEvent) {
        var toolbar = this.bottomToolbarInstance;
        var items = [];
        var filterToolbar;
        var itemModel;
        var dimension = this.imageEditorInstance.getImageDimension();
        var shapeSettings;
        document.getElementById('filter-toolbar').style.display = 'none';
        this.currentToolbar = type;
        switch (type) {
            case 'main':
                items = ['cropAndTransform', 'addText', 'shapes', 'addPen', 'filters'];
                break;
            case 'crop':
                items = ['rotateLeft', 'rotateRight'];
                break;
            case 'text':
            case 'edittext':
                items = ['back', 'fontColor', 'remove', 'editText'];
                break;
            case 'rectangle':
                items = ['back', 'fillColor', 'strokeColor', 'remove'];
                if (!isEvent) {
                    this.imageEditorInstance.drawRectangle(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50, 200, 100, 2, '#fff', null, null, true);
                    this.isShapeSelected = true;
                }
                break;
            case 'ellipse':
                items = ['back', 'fillColor', 'strokeColor', 'remove'];
                if (!isEvent) {
                    this.imageEditorInstance.drawEllipse(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50, 100, 50, 2, '#fff', null, null, true);
                    this.isShapeSelected = true;
                }
                break;
            case 'line':
                items = ['back', 'strokeColor', 'remove'];
                if (!isEvent) {
                    this.imageEditorInstance.drawLine(dimension.x + (dimension.width / 2) - 200, dimension.y + (dimension.height / 2) - 100, dimension.x + (dimension.width / 2) + 200, dimension.y + (dimension.height / 2) + 100, 2, '#fff', true);
                    this.isShapeSelected = true;
                }
                break;
            case 'pen':
            case 'freehanddraw':
                items = ['back', 'penStrokeColor', 'remove'];
                break;
            case 'filter':
                document.getElementById('filter-toolbar').style.display = 'block';
                this.onFilterToolbarCreated();
                items = ['default', 'chrome', 'cold', 'warm', 'grayscale', 'sepia', 'invert'];
                break;
        }
        for (var i = 0; i < toolbar.items.length; i++) {
            if (items.indexOf(toolbar.items[i].id) !== -1) {
                toolbar.items[i].visible = true;
                if (toolbar.items[i].id.toLowerCase() === 'edittext') {
                    if (type === 'edittext') {
                        toolbar.items[i].disabled = true;
                        setTimeout(function () {
                            document.querySelector('.e-textarea').focus();
                        }, 1);
                    }
                    else {
                        toolbar.items[i].disabled = false;
                    }
                }
            }
            else {
                toolbar.items[i].visible = false;
            }
            if (toolbar.items[i].id === 'remove') {
                if (type === 'pen') {
                    toolbar.items[i].disabled = true;
                }
                else {
                    toolbar.items[i].disabled = false;
                }
            }
        }
        var enableUndo = this.imageEditorInstance.canUndo();
        var enableRedo = this.imageEditorInstance.canRedo();
        var topToolbar = this.topToolbarInstance;
        for (var i = 0; i < topToolbar.items.length; i++) {
            if (topToolbar.items[i].id === 'undo') {
                topToolbar.items[i].disabled = !enableUndo;
            }
            else if (topToolbar.items[i].id === 'redo') {
                topToolbar.items[i].disabled = !enableRedo;
            }
            else if (topToolbar.items[i].id === 'ok') {
                if (this.currentToolbar === 'main') {
                    topToolbar.items[i].visible = true;
                    topToolbar.items[i].tooltipText = 'Save';
                    topToolbar.items[i].prefixIcon = 'e-icons e-save';
                }
                else if (this.currentToolbar === 'crop' || this.currentToolbar === 'filter') {
                    topToolbar.items[i].visible = true;
                    topToolbar.items[i].tooltipText = 'Apply';
                    topToolbar.items[i].prefixIcon = 'e-icons e-check-tick';
                }
                else {
                    topToolbar.items[i].visible = false;
                }
            }
            else if (topToolbar.items[i].id === 'cancel') {
                if (this.currentToolbar === 'main' || this.currentToolbar === 'crop') {
                    topToolbar.items[i].visible = true;
                }
                else {
                    topToolbar.items[i].visible = false;
                }
            }
        }
        setTimeout(function () {
            var toolbarArea = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            toolbarArea = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        }, 1);
    };
    CustomToolbar.prototype.updateToolbar = function (args, isEvent) {
        var _this = this;
        var type = args.currentShapeSettings.type.toLowerCase();
        this.refreshToolbar(type, isEvent);
        if (isEvent) {
            this.tempShapeSettings = args.currentShapeSettings;
            this.activeObjIndex = this.tempShapeSettings.id;
        }
        setTimeout(function () {
            var selFillElem = _this.fillColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            var selStrokeElem = _this.strokeColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            var selTextStrokeElem = _this.fontColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            var selPenStrokeElem = _this.penColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            if (selFillElem && (type === 'rectangle' || type === 'ellipse')) {
                if (args.currentShapeSettings.fillColor === '') {
                    selFillElem.classList.add('e-nocolor-item');
                }
                else {
                    selFillElem.classList.remove('e-nocolor-item');
                    selFillElem.style.background = args.currentShapeSettings.fillColor;
                }
                if (document.querySelector('#' + 'imageEditor_shapeFill')) {
                    _this.fillColorInstance.value = args.currentShapeSettings.fillColor;
                }
            }
            if (selStrokeElem && (type === 'rectangle' || type === 'ellipse' || type === 'line')) {
                selStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                selStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_shapeStroke')) {
                    _this.strokeColorInstance.value = args.currentShapeSettings.strokeColor;
                }
            }
            if (selTextStrokeElem && type === 'text') {
                selTextStrokeElem.style.backgroundColor = args.currentShapeSettings.color;
                selTextStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.color;
                if (document.querySelector('#' + 'imageEditor_textFont')) {
                    _this.fontColorInstance.value = args.currentShapeSettings.color;
                }
            }
            if (selPenStrokeElem && type === 'freehanddraw') {
                selPenStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                selPenStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_penStroke')) {
                    _this.penColorInstance.value = args.currentShapeSettings.strokeColor;
                }
            }
        }, 10);
    };
    CustomToolbar.prototype.toPascalCase = function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    CustomToolbar.prototype.keyDownEventHandler = function (e) {
        if (e.ctrlKey && (e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
        switch (e.key) {
            case (e.ctrlKey && 's'):
                this.imageEditorInstance.export();
                break;
            case (e.ctrlKey && 'z'):
                this.isTextEditing = false;
                this.refreshToolbar('main');
                break;
            case (e.ctrlKey && 'y'):
                this.isTextEditing = false;
                this.refreshToolbar('main');
                break;
            case 'Delete':
                if ((0, base_1.isNullOrUndefined)(this.activeObjIndex) && this.tempShapeSettings && this.tempShapeSettings.id) {
                    this.activeObjIndex = this.tempShapeSettings.id;
                }
                if (this.activeObjIndex) {
                    this.imageEditorInstance.deleteShape(this.activeObjIndex);
                }
                this.refreshToolbar('main');
                break;
            case 'Escape':
                if (this.currentToolbar === 'crop') {
                    this.imageEditorInstance.clearSelection(true);
                    this.refreshToolbar('main');
                }
                break;
            case 'Enter':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!e.target.closest('.e-textarea')) {
                    this.apply();
                    this.refreshToolbar('main');
                }
                break;
        }
    };
    CustomToolbar.prototype.doubleClickEvent = function (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type === 'dblclick' && e.target.closest('.e-textarea')) {
            this.isTextEditing = true;
        }
    };
    CustomToolbar.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: "control-pane" },
            React.createElement("div", { className: "control-section" },
                React.createElement("div", { className: "row" },
                    React.createElement("div", { className: 'col-lg-12 control-section e-img-editor-sample' },
                        React.createElement("div", { className: 'customToolbar' },
                            React.createElement("div", { className: "header" },
                                React.createElement("div", { className: "header-details" },
                                    React.createElement("div", { className: "header-name" }, "Image Editor"))),
                            React.createElement("div", { className: 'image-preview-container', id: 'imagePreviewContainer' },
                                React.createElement("img", { src: "src/image-editor/images/bridge.jpg", id: "previewImgContainer", className: "preview-img-container", alt: "previewImage" }),
                                React.createElement("br", null),
                                React.createElement("div", { className: 'button-container', id: "button-container" },
                                    React.createElement(ej2_react_buttons_1.FabComponent, { id: 'edit', className: 'custom-button', iconCss: 'e-icons e-edit', position: 'BottomRight', target: '.image-preview-container', isPrimary: true, onClick: this.editClicked, content: 'Edit Image' }))),
                            React.createElement("div", { className: "image-editor-container", id: "image-editor-container", style: { display: 'none' } },
                                React.createElement("div", { id: "top-toolbarArea" },
                                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (toolbar) { return _this.topToolbarInstance = toolbar; }, id: "top-toolbar", created: this.onTopToolbarCreated, clicked: this.toolbarClicked },
                                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'cancel', prefixIcon: 'e-icons e-close', tooltipText: 'Cancel', align: 'Center' }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', align: 'Center', disabled: true }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', align: 'Center', disabled: true }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'ok', prefixIcon: 'e-icons e-save', tooltipText: 'Save', align: 'Center' })))),
                                React.createElement("div", { id: "imageEditor" },
                                    React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { ref: function (instance) { return _this.imageEditorInstance = instance; }, created: this.onIECreated, fileOpened: this.fileOpened, toolbar: [], showQuickAccessToolbar: false, shapeChanging: this.shapeChanging, shapeChange: this.shapeChange, click: this.click, zoomSettings: { minZoomFactor: 0.1, maxZoomFactor: 50 } })),
                                React.createElement("div", { id: "bottom-toolbarArea" },
                                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (instance) { return _this.bottomToolbarInstance = instance; }, id: "bottom-toolbar", created: this.onBottomToolbarCreated, clicked: this.toolbarClicked },
                                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'cropAndTransform', prefixIcon: 'e-icons e-crop', tooltipText: 'Crop and Transform', align: 'Center' }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'back', prefixIcon: 'e-icons e-arrow-left', tooltipText: 'Back', align: 'Center', visible: false }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'rotateLeft', prefixIcon: 'e-icons e-transform-left', tooltipText: 'Rotate Left', align: 'Center', visible: false }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'rotateRight', prefixIcon: 'e-icons e-transform-right', tooltipText: 'Rotate Right', align: 'Center', visible: false }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'addText', prefixIcon: 'e-icons e-text-annotation', tooltipText: 'Text', align: 'Center' }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'fontColor', cssClass: 'top-icon e-text-fontColor', tooltipText: 'Font Color', align: 'Center', visible: false, type: 'Input', template: this.fontColorTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'shapes', prefixIcon: 'e-icons e-shapes', tooltipText: 'Annotations', align: 'Center', template: this.annotationTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'fillColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-fill', tooltipText: 'Fill Color', align: 'Center', visible: false, type: 'Input', template: this.fillColorTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'strokeColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-stroke', tooltipText: 'Stroke Color', align: 'Center', visible: false, type: 'Input', template: this.strokeColorTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'penStrokeColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-pen-stroke-color', tooltipText: 'Stroke Color', align: 'Center', visible: false, type: 'Input', template: this.penColorTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'remove', prefixIcon: 'e-icons e-trash', tooltipText: 'Remove', align: 'Center', visible: false, disabled: false }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit', tooltipText: 'Edit Text', align: 'Center', visible: false, disabled: false }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'addPen', prefixIcon: 'e-icons e-free-pen', tooltipText: 'Pen', align: 'Center' }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'filters', prefixIcon: 'e-icons e-filters', tooltipText: 'Filters', align: 'Center' }))),
                                    React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: function (instance) { return _this.filterToolbarInstance = instance; }, id: "filter-toolbar", clicked: this.filterImage },
                                        React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'default', tooltipText: 'Default', align: 'Center', template: this.defaultCanvasTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'chrome', tooltipText: 'Chrome', align: 'Center', template: this.chromeCanvasTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'cold', tooltipText: 'Cold', align: 'Center', template: this.coldCanvasTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'warm', tooltipText: 'Warm', align: 'Center', template: this.warmCanvasTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'grayscale', tooltipText: 'Grayscale', align: 'Center', template: this.grayscaleCanvasTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'sepia', tooltipText: 'Sepia', align: 'Center', template: this.sepiaCanvasTemplate }),
                                            React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'invert', tooltipText: 'Invert', align: 'Center', template: this.invertCanvasTemplate }))))))))),
            React.createElement("div", { id: "action-description" },
                React.createElement("p", null, "This sample demonstrates a custom toolbar using the Image Editor Control.")),
            React.createElement("div", { id: "description" },
                React.createElement("p", null, "The Image Editor component provides built-in support for adding a custom toolbar through APIs in the following ways:"),
                React.createElement("ul", null,
                    React.createElement("li", null,
                        React.createElement("b", null, "Selection"),
                        " : Multiple selection options are available. The selection region can be a square or circle, customized to various aspects ratios, and customized by dragging and resizing."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Crop"),
                        " : The image can be cropped based on the selection."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Rotate"),
                        " : The image can be rotated both clockwise and anticlockwise by 90 degrees."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Freehand drawing"),
                        " : Draw freehand on the image and adjust the pen's stroke width and stroke color."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Get Image data"),
                        " : Retrieves the edited image in image data format."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Annotation"),
                        " : Text, rectangle, ellipse, path, image, and line annotation shapes are supported."),
                    React.createElement("li", null,
                        React.createElement("b", null, "Filters"),
                        " : The predefined filters such as chrome, cold, warm, grayscale, sepia, and invert can be applied to the image.")),
                React.createElement("p", null,
                    "More information about Image Editor can be found in this",
                    React.createElement("a", { target: "_blank", href: "https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/" }, "documentation section"),
                    "."))));
    };
    return CustomToolbar;
}(sample_base_1.SampleBase));
exports.CustomToolbar = CustomToolbar;
