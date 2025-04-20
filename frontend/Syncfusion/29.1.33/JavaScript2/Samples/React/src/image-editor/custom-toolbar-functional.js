"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var ej2_react_image_editor_1 = require("@syncfusion/ej2-react-image-editor");
var ej2_base_1 = require("@syncfusion/ej2-base");
var sample_base_1 = require("../common/sample-base");
require("./custom-toolbar.css");
var ej2_react_buttons_1 = require("@syncfusion/ej2-react-buttons");
var ej2_react_splitbuttons_1 = require("@syncfusion/ej2-react-splitbuttons");
var ej2_react_navigations_1 = require("@syncfusion/ej2-react-navigations");
var ej2_react_inputs_1 = require("@syncfusion/ej2-react-inputs");
var base_1 = require("@syncfusion/ej2/base");
var CustomToolbar = function () {
    (0, react_1.useEffect)(function () {
        (0, sample_base_1.updateSampleSection)();
    }, []);
    var imageEditorInstance = (0, react_1.useRef)(null);
    var topToolbarInstance = (0, react_1.useRef)(null);
    var bottomToolbarInstance = (0, react_1.useRef)(null);
    var filterToolbarInstance = (0, react_1.useRef)(null);
    var fontColorInstance = (0, react_1.useRef)(null);
    var annotationInstance = (0, react_1.useRef)(null);
    var fillColorInstance = (0, react_1.useRef)(null);
    var strokeColorInstance = (0, react_1.useRef)(null);
    var penColorInstance = (0, react_1.useRef)(null);
    var currentToolbar = 'main';
    var activeObjIndex;
    var tempShapeSettings;
    var isShapeCustomizing = false;
    var isTextEditing = false;
    var isShapeSelected = false;
    var filter = ej2_react_image_editor_1.ImageFilterOption.Default;
    var imageData;
    var presetColors = {
        'custom': ['#ffffff', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
    };
    var toolbars = ['filter', 'rectangle', 'ellipse', 'line', 'text', 'edittext', 'freehanddraw'];
    var editClicked = function () {
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('image-editor-container').style.display = 'block';
        imageEditorInstance.current.open(document.getElementById('previewImgContainer').src);
        var toolbarArea = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        refreshToolbar('main');
    };
    var fileOpened = function () {
        imageData = imageEditorInstance.current.getImageData();
    };
    var onIECreated = function () {
        var image = document.getElementById('previewImgContainer');
        if (base_1.Browser.isDevice && image) {
            image.src = 'src/image-editor/images/flower.png';
        }
        document.addEventListener('keydown', keyDownEventHandler.bind(_this));
        document.getElementById('image-editor-container').addEventListener('dblclick', doubleClickEvent.bind(_this));
    };
    var shapeChanging = function (args) {
        if (args.action === 'select') {
            isShapeSelected = true;
            updateToolbar(args, true);
        }
        else if (args.action === 'insert') {
            activeObjIndex = args.currentShapeSettings.id;
            tempShapeSettings = args.currentShapeSettings;
        }
    };
    var shapeChange = function (args) {
        if (args.action === 'apply' && !isShapeCustomizing && !isShapeSelected) {
            isTextEditing = false;
            setTimeout(function () {
                refreshToolbar('main');
            }, 1);
        }
    };
    var click = function () {
        if (toolbars.indexOf(currentToolbar) !== -1) {
            refreshToolbar('main');
        }
    };
    // Handler used to reposition the tooltip on page scroll
    var onScroll = function () {
        if (document.getElementById("image-editor_sliderWrapper")) {
            var slider = (0, ej2_base_1.getComponent)(document.getElementById("image-editor_sliderWrapper"), "slider");
            slider.refreshTooltip(slider.tooltipTarget);
        }
    };
    if (!(0, ej2_base_1.isNullOrUndefined)(document.getElementById("right-pane"))) {
        document
            .getElementById("right-pane")
            .addEventListener("scroll", onScroll.bind(_this));
    }
    var fontColorTemplate = function () {
        var fontColorChanged = function (args) {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            var selElem = fontColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            selElem.style.backgroundColor = args.currentValue.rgba;
            isShapeCustomizing = true;
            var shapeSetting = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            shapeSetting.color = args.value;
            imageEditorInstance.current.updateShape(shapeSetting, true);
            tempShapeSettings.color = args.value;
            isShapeSelected = true;
            if (isTextEditing) {
                imageEditorInstance.current.enableTextEditing();
            }
            isShapeCustomizing = false;
        };
        var color = tempShapeSettings && tempShapeSettings.color != null ? tempShapeSettings.color : '#fff';
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { id: "imageEditor_textFont", ref: fontColorInstance, mode: 'Palette', cssClass: 'e-text-font-color', modeSwitcher: false, noColor: false, inline: false, showButtons: false, presetColors: presetColors, change: fontColorChanged, value: color, columns: 4 })));
    };
    var annotationTemplate = function () {
        var items = [
            { text: 'Rectangle', id: 'rectangle', iconCss: 'e-icons e-rectangle' },
            { text: 'Ellipse', id: 'ellipse', iconCss: 'e-icons e-circle' },
            { text: 'Line', id: 'line', iconCss: 'e-icons e-line' }
        ];
        var change = function (args) {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            refreshToolbar(args.item.id);
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_splitbuttons_1.DropDownButtonComponent, { ref: annotationInstance, id: "imageEditor_annotationButton", iconCss: 'e-icons e-shapes', cssClass: 'e-image-popup', items: items, select: change })));
    };
    var fillColorTemplate = function () {
        var tileRender = function (args) {
            args.element.classList.add("e-circle-palette");
            args.element.appendChild((0, base_1.createElement)("span", { className: "e-circle-selection" }));
        };
        var colors = (0, base_1.extend)({}, presetColors, {}, true);
        colors['custom'][0] = '';
        var fillColorChanged = function (args) {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            var selElem = fillColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            if (args.currentValue.rgba === '') {
                selElem.classList.add('e-nocolor-item');
            }
            else {
                selElem.classList.remove('e-nocolor-item');
                selElem.style.background = args.currentValue.rgba;
            }
            selElem.style.background = args.currentValue.rgba;
            isShapeCustomizing = true;
            var shapeSetting = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            shapeSetting.fillColor = args.currentValue.rgba;
            imageEditorInstance.current.updateShape(shapeSetting, true);
            tempShapeSettings.fillColor = args.currentValue.rgba;
            isShapeSelected = true;
            if (isTextEditing) {
                imageEditorInstance.current.enableTextEditing();
            }
            isShapeCustomizing = false;
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: fillColorInstance, id: "imageEditor_shapeFill", mode: 'Palette', cssClass: 'e-shape-fill-color', modeSwitcher: false, noColor: true, inline: false, showButtons: false, presetColors: colors, beforeTileRender: tileRender, change: fillColorChanged, value: '', columns: 4 })));
    };
    var strokeColorTemplate = function () {
        var tileRender = function (args) {
            args.element.classList.add("e-circle-palette");
            args.element.appendChild((0, base_1.createElement)("span", { className: "e-circle-selection" }));
        };
        var strokeColorChanged = function (args) {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            var selElem = strokeColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            selElem.style.backgroundColor = args.currentValue.rgba;
            isShapeCustomizing = true;
            var shapeSetting = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            shapeSetting.strokeColor = args.currentValue.rgba;
            imageEditorInstance.current.updateShape(shapeSetting, true);
            tempShapeSettings.strokeColor = args.currentValue.rgba;
            isShapeSelected = true;
            if (isTextEditing) {
                imageEditorInstance.current.enableTextEditing();
            }
            isShapeCustomizing = false;
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: strokeColorInstance, id: "imageEditor_shapeStroke", mode: 'Palette', cssClass: 'e-shape-stroke-color', modeSwitcher: false, noColor: false, inline: false, showButtons: false, presetColors: presetColors, beforeTileRender: tileRender, change: strokeColorChanged, value: '#fff', columns: 4 })));
    };
    var penColorTemplate = function () {
        var tileRender = function (args) {
            args.element.classList.add("e-circle-palette");
            args.element.appendChild((0, base_1.createElement)("span", { className: "e-circle-selection" }));
        };
        var penColorChanged = function (args) {
            if (imageEditorInstance.current.disabled) {
                return;
            }
            var selElem = penColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            ;
            selElem.style.backgroundColor = args.currentValue.rgba;
            if (tempShapeSettings && tempShapeSettings.id && tempShapeSettings.id.split('_')[0] === 'pen') {
                var shapeSetting = { id: tempShapeSettings.id, type: ej2_react_image_editor_1.ShapeType.FreehandDraw,
                    startX: tempShapeSettings.startX, startY: tempShapeSettings.startY,
                    strokeColor: args.currentValue.hex, strokeWidth: tempShapeSettings.strokeWidth,
                    opacity: tempShapeSettings.opacity, points: tempShapeSettings.points };
                imageEditorInstance.current.updateShape(shapeSetting, true);
                tempShapeSettings.strokeColor = args.currentValue.hex;
                isShapeSelected = true;
            }
            else {
                var shapeSetting = { id: null, type: ej2_react_image_editor_1.ShapeType.FreehandDraw, startX: null, startY: null,
                    strokeColor: args.currentValue.hex };
                imageEditorInstance.current.updateShape(shapeSetting);
            }
        };
        return (React.createElement("div", null,
            React.createElement(ej2_react_inputs_1.ColorPickerComponent, { ref: penColorInstance, id: "imageEditor_pen_stroke", mode: 'Palette', cssClass: 'e-pen-color', modeSwitcher: false, noColor: false, inline: false, showButtons: false, presetColors: presetColors, beforeTileRender: tileRender, change: penColorChanged, value: '#fff', columns: 4 })));
    };
    var defaultCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_defaultCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Default"))));
    };
    var chromeCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_chromeCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Chrome"))));
    };
    var coldCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_coldCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Cold"))));
    };
    var warmCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_warmCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Warm"))));
    };
    var grayscaleCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_grayscaleCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Grayscale"))));
    };
    var sepiaCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_sepiaCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Sepia"))));
    };
    var invertCanvasTemplate = function () {
        return (React.createElement("div", { className: 'filter-wrapper', style: { boxSizing: "content-box" } },
            React.createElement("canvas", { id: 'imageEditor_invertCanvas' }),
            React.createElement("div", { style: { textAlign: "center" } },
                React.createElement("span", null, "Invert"))));
    };
    var onTopToolbarCreated = function () {
        var toolbarArea = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    };
    var onBottomToolbarCreated = function () {
        var toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    };
    var onFilterToolbarCreated = function () {
        var inMemoryCanvas = document.createElement('canvas');
        var inMemoryContext = inMemoryCanvas.getContext('2d');
        inMemoryCanvas.width = imageData.width;
        inMemoryCanvas.height = imageData.height;
        inMemoryContext.putImageData(imageData, 0, 0);
        updateFilterCanvas('_defaultCanvas', 'default', inMemoryCanvas);
        updateFilterCanvas('_chromeCanvas', 'chrome', inMemoryCanvas);
        updateFilterCanvas('_coldCanvas', 'cold', inMemoryCanvas);
        updateFilterCanvas('_warmCanvas', 'warm', inMemoryCanvas);
        updateFilterCanvas('_grayscaleCanvas', 'grayscale', inMemoryCanvas);
        updateFilterCanvas('_sepiaCanvas', 'sepia', inMemoryCanvas);
        updateFilterCanvas('_invertCanvas', 'invert', inMemoryCanvas);
    };
    var updateFilterCanvas = function (selector, type, inMemoryCanvas) {
        var filter = document.querySelector('#imageEditor' + selector);
        if (filter) {
            var ctx = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px';
            filter.style.height = '100px';
            ctx.filter = imageEditorInstance.current.getImageFilter(toPascalCase(type));
            ctx.drawImage(inMemoryCanvas, 0, 0, 300, 150);
        }
    };
    var toolbarClicked = function (args) {
        var item = args.item.id.toLowerCase();
        var dimension = imageEditorInstance.current.getImageDimension();
        var imageData;
        var canvas;
        switch (item) {
            case 'back':
                apply();
                refreshToolbar('main');
                break;
            case 'cancel':
                isTextEditing = false;
                if (currentToolbar === 'main') {
                    document.getElementById('image-editor-container').style.display = 'none';
                    document.getElementById('imagePreviewContainer').style.display = 'block';
                    imageEditorInstance.current.reset();
                }
                else {
                    if ((isShapeCustomizing || isShapeSelected) && tempShapeSettings && tempShapeSettings.id) {
                        imageEditorInstance.current.updateShape(tempShapeSettings);
                    }
                    imageEditorInstance.current.clearSelection(true);
                    refreshToolbar('main');
                }
                break;
            case 'undo':
                if (currentToolbar === 'pen') {
                    imageEditorInstance.current.freeHandDraw(false);
                }
                isTextEditing = false;
                imageEditorInstance.current.undo();
                refreshToolbar('main');
                break;
            case 'redo':
                if (currentToolbar === 'pen') {
                    imageEditorInstance.current.freeHandDraw(false);
                }
                isTextEditing = false;
                imageEditorInstance.current.redo();
                refreshToolbar('main');
                break;
            case 'ok':
                isTextEditing = false;
                if (currentToolbar === 'main') {
                    imageData = imageEditorInstance.current.getImageData();
                    canvas = document.createElement('canvas');
                    canvas.width = imageData.width;
                    canvas.height = imageData.height;
                    canvas.getContext('2d').putImageData(imageData, 0, 0);
                    document.getElementById('previewImgContainer').src = canvas.toDataURL();
                    imageEditorInstance.current.open(imageData);
                    document.getElementById('image-editor-container').style.display = 'none';
                    document.getElementById('imagePreviewContainer').style.display = 'block';
                }
                else {
                    apply();
                    refreshToolbar('main');
                }
                break;
            case 'cropandtransform':
                imageEditorInstance.current.select('custom');
                refreshToolbar('crop');
                break;
            case 'rotateleft':
                imageEditorInstance.current.rotate(-90);
                break;
            case 'rotateright':
                imageEditorInstance.current.rotate(90);
                break;
            case 'addtext':
                imageEditorInstance.current.drawText(dimension.x + (dimension.width / 2) - 65, dimension.y + (dimension.height / 2) - 15, 'Add Text', 'Arial', 30, false, false, '#fff', true);
                isShapeSelected = true;
                refreshToolbar('text');
                break;
            case 'remove':
                if ((0, ej2_base_1.isNullOrUndefined)(activeObjIndex) && tempShapeSettings && tempShapeSettings.id) {
                    activeObjIndex = tempShapeSettings.id;
                }
                if (isTextEditing) {
                    tempShapeSettings = imageEditorInstance.current.getShapeSetting(activeObjIndex);
                    activeObjIndex = tempShapeSettings.id;
                }
                imageEditorInstance.current.deleteShape(activeObjIndex);
                refreshToolbar('main');
                break;
            case 'edittext':
                isTextEditing = true;
                imageEditorInstance.current.enableTextEditing();
                refreshToolbar('edittext');
                break;
            case 'addpen':
                imageEditorInstance.current.freeHandDraw(true);
                refreshToolbar('pen');
                break;
            case 'filters':
                refreshToolbar('filter');
                break;
        }
    };
    var apply = function () {
        if (currentToolbar === 'crop') {
            imageEditorInstance.current.crop();
        }
        else if (currentToolbar === 'pen') {
            if (activeObjIndex && activeObjIndex.split('_')[0] === 'pen') {
                tempShapeSettings = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            }
            else {
                var shapeSettings = imageEditorInstance.current.getShapeSettings();
                if (shapeSettings.length > 0) {
                    tempShapeSettings = shapeSettings[shapeSettings.length - 1].id.split('_')[0] === 'pen' ? shapeSettings[shapeSettings.length - 1] : null;
                    if (tempShapeSettings) {
                        imageEditorInstance.current.selectShape(tempShapeSettings.id);
                    }
                    else {
                        imageEditorInstance.current.freeHandDraw(false);
                    }
                }
                else {
                    imageEditorInstance.current.freeHandDraw(false);
                    return;
                }
            }
            if (tempShapeSettings) {
                imageEditorInstance.current.updateShape(tempShapeSettings);
            }
        }
        else if (currentToolbar === 'freehanddraw' && tempShapeSettings) {
            imageEditorInstance.current.updateShape(tempShapeSettings);
        }
        else if (currentToolbar !== 'filter' && activeObjIndex) {
            tempShapeSettings = imageEditorInstance.current.getShapeSetting(activeObjIndex);
            imageEditorInstance.current.updateShape(tempShapeSettings);
        }
        tempShapeSettings = null;
        activeObjIndex = null;
    };
    var filterImage = function (args) {
        imageEditorInstance.current.applyImageFilter(args.item.id);
        filter = args.item.id;
    };
    var refreshToolbar = function (type, isEvent) {
        var toolbar = bottomToolbarInstance.current;
        var items = [];
        var filterToolbar;
        var itemModel;
        var dimension = imageEditorInstance.current.getImageDimension();
        ;
        var shapeSettings;
        document.getElementById('filter-toolbar').style.display = 'none';
        currentToolbar = type;
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
                    imageEditorInstance.current.drawRectangle(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50, 200, 100, 2, '#fff', null, null, true);
                    isShapeSelected = true;
                }
                break;
            case 'ellipse':
                items = ['back', 'fillColor', 'strokeColor', 'remove'];
                if (!isEvent) {
                    imageEditorInstance.current.drawEllipse(dimension.x + (dimension.width / 2) - 100, dimension.y + (dimension.height / 2) - 50, 100, 50, 2, '#fff', null, null, true);
                    isShapeSelected = true;
                }
                break;
            case 'line':
                items = ['back', 'strokeColor', 'remove'];
                if (!isEvent) {
                    imageEditorInstance.current.drawLine(dimension.x + (dimension.width / 2) - 200, dimension.y + (dimension.height / 2) - 100, dimension.x + (dimension.width / 2) + 200, dimension.y + (dimension.height / 2) + 100, 2, '#fff', true);
                    isShapeSelected = true;
                }
                break;
            case 'pen':
            case 'freehanddraw':
                items = ['back', 'penStrokeColor', 'remove'];
                break;
            case 'filter':
                document.getElementById('filter-toolbar').style.display = 'block';
                onFilterToolbarCreated();
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
        var enableUndo = imageEditorInstance.current.canUndo();
        var enableRedo = imageEditorInstance.current.canRedo();
        var topToolbar = topToolbarInstance.current;
        for (var i = 0; i < topToolbar.items.length; i++) {
            if (topToolbar.items[i].id === 'undo') {
                topToolbar.items[i].disabled = !enableUndo;
            }
            else if (topToolbar.items[i].id === 'redo') {
                topToolbar.items[i].disabled = !enableRedo;
            }
            else if (topToolbar.items[i].id === 'ok') {
                if (currentToolbar === 'main') {
                    topToolbar.items[i].visible = true;
                    topToolbar.items[i].tooltipText = 'Save';
                    topToolbar.items[i].prefixIcon = 'e-icons e-save';
                }
                else if (currentToolbar === 'crop' || currentToolbar === 'filter') {
                    topToolbar.items[i].visible = true;
                    topToolbar.items[i].tooltipText = 'Apply';
                    topToolbar.items[i].prefixIcon = 'e-icons e-check-tick';
                }
                else {
                    topToolbar.items[i].visible = false;
                }
            }
            else if (topToolbar.items[i].id === 'cancel') {
                if (currentToolbar === 'main' || currentToolbar === 'crop') {
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
    var updateToolbar = function (args, isEvent) {
        var type = args.currentShapeSettings.type.toLowerCase();
        refreshToolbar(type, isEvent);
        if (isEvent) {
            tempShapeSettings = args.currentShapeSettings;
            activeObjIndex = tempShapeSettings.id;
        }
        setTimeout(function () {
            var selFillElem = fillColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            var selStrokeElem = strokeColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            var selTextStrokeElem = fontColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            var selPenStrokeElem = penColorInstance.current.element.nextElementSibling.querySelector('.e-selected-color');
            if (selFillElem && (type === 'rectangle' || type === 'ellipse')) {
                if (args.currentShapeSettings.fillColor === '') {
                    selFillElem.classList.add('e-nocolor-item');
                }
                else {
                    selFillElem.classList.remove('e-nocolor-item');
                    selFillElem.style.background = args.currentShapeSettings.fillColor;
                }
                if (document.querySelector('#' + 'imageEditor_shapeFill')) {
                    fillColorInstance.current.value = args.currentShapeSettings.fillColor;
                }
            }
            if (selStrokeElem && (type === 'rectangle' || type === 'ellipse' || type === 'line')) {
                selStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                selStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_shapeStroke')) {
                    strokeColorInstance.current.value = args.currentShapeSettings.strokeColor;
                }
            }
            if (selTextStrokeElem && type === 'text') {
                selTextStrokeElem.style.backgroundColor = args.currentShapeSettings.color;
                selTextStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.color;
                if (document.querySelector('#' + 'imageEditor_textFont')) {
                    fontColorInstance.current.value = args.currentShapeSettings.color;
                }
            }
            if (selPenStrokeElem && type === 'freehanddraw') {
                selPenStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                selPenStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_penStroke')) {
                    penColorInstance.current.value = args.currentShapeSettings.strokeColor;
                }
            }
        }, 10);
    };
    var toPascalCase = function (text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    };
    var keyDownEventHandler = function (e) {
        if (e.ctrlKey && (e.key === '+' || e.key === '-')) {
            e.preventDefault();
        }
        switch (e.key) {
            case (e.ctrlKey && 's'):
                imageEditorInstance.current.export();
                break;
            case (e.ctrlKey && 'z'):
                isTextEditing = false;
                refreshToolbar('main');
                break;
            case (e.ctrlKey && 'y'):
                isTextEditing = false;
                refreshToolbar('main');
                break;
            case 'Delete':
                if ((0, ej2_base_1.isNullOrUndefined)(activeObjIndex) && tempShapeSettings && tempShapeSettings.id) {
                    activeObjIndex = tempShapeSettings.id;
                }
                if (activeObjIndex) {
                    imageEditorInstance.current.deleteShape(activeObjIndex);
                }
                refreshToolbar('main');
                break;
            case 'Escape':
                if (currentToolbar === 'crop') {
                    imageEditorInstance.current.clearSelection(true);
                    refreshToolbar('main');
                }
                break;
            case 'Enter':
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (!e.target.closest('.e-textarea')) {
                    apply();
                    refreshToolbar('main');
                }
                break;
        }
    };
    var doubleClickEvent = function (e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type === 'dblclick' && e.target.closest('.e-textarea')) {
            isTextEditing = true;
        }
    };
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
                                React.createElement(ej2_react_buttons_1.FabComponent, { id: 'edit', className: 'custom-button', iconCss: 'e-icons e-edit', position: 'BottomRight', target: '.image-preview-container', isPrimary: true, onClick: editClicked, content: 'Edit Image' }))),
                        React.createElement("div", { className: "image-editor-container", id: "image-editor-container", style: { display: 'none' } },
                            React.createElement("div", { id: "top-toolbarArea" },
                                React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: topToolbarInstance, id: "top-toolbar", created: onTopToolbarCreated, clicked: toolbarClicked },
                                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'cancel', prefixIcon: 'e-icons e-close', tooltipText: 'Cancel', align: 'Center' }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo', align: 'Center', disabled: true }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo', align: 'Center', disabled: true }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'ok', prefixIcon: 'e-icons e-save', tooltipText: 'Save', align: 'Center' })))),
                            React.createElement("div", { id: "imageEditor" },
                                React.createElement(ej2_react_image_editor_1.ImageEditorComponent, { ref: imageEditorInstance, created: onIECreated, fileOpened: fileOpened, toolbar: [], showQuickAccessToolbar: false, shapeChanging: shapeChanging, shapeChange: shapeChange, click: click, zoomSettings: { minZoomFactor: 0.1, maxZoomFactor: 50 } })),
                            React.createElement("div", { id: "bottom-toolbarArea" },
                                React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: bottomToolbarInstance, id: "bottom-toolbar", created: onBottomToolbarCreated, clicked: toolbarClicked },
                                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'cropAndTransform', prefixIcon: 'e-icons e-crop', tooltipText: 'Crop and Transform', align: 'Center' }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'back', prefixIcon: 'e-icons e-arrow-left', tooltipText: 'Back', align: 'Center', visible: false }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'rotateLeft', prefixIcon: 'e-icons e-transform-left', tooltipText: 'Rotate Left', align: 'Center', visible: false }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'rotateRight', prefixIcon: 'e-icons e-transform-right', tooltipText: 'Rotate Right', align: 'Center', visible: false }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'addText', prefixIcon: 'e-icons e-text-annotation', tooltipText: 'Text', align: 'Center' }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'fontColor', cssClass: 'top-icon e-text-fontColor', tooltipText: 'Font Color', align: 'Center', visible: false, type: 'Input', template: fontColorTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'shapes', prefixIcon: 'e-icons e-shapes', tooltipText: 'Annotations', align: 'Center', template: annotationTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'fillColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-fill', tooltipText: 'Fill Color', align: 'Center', visible: false, type: 'Input', template: fillColorTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'strokeColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-stroke', tooltipText: 'Stroke Color', align: 'Center', visible: false, type: 'Input', template: strokeColorTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'penStrokeColor', prefixIcon: 'e-icons e-copy', cssClass: 'top-icon e-pen-stroke-color', tooltipText: 'Stroke Color', align: 'Center', visible: false, type: 'Input', template: penColorTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'remove', prefixIcon: 'e-icons e-trash', tooltipText: 'Remove', align: 'Center', visible: false, disabled: false }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit', tooltipText: 'Edit Text', align: 'Center', visible: false, disabled: false }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'addPen', prefixIcon: 'e-icons e-free-pen', tooltipText: 'Pen', align: 'Center' }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'filters', prefixIcon: 'e-icons e-filters', tooltipText: 'Filters', align: 'Center' }))),
                                React.createElement(ej2_react_navigations_1.ToolbarComponent, { ref: filterToolbarInstance, id: "filter-toolbar", clicked: filterImage },
                                    React.createElement(ej2_react_navigations_1.ItemsDirective, null,
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'default', tooltipText: 'Default', align: 'Center', template: defaultCanvasTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'chrome', tooltipText: 'Chrome', align: 'Center', template: chromeCanvasTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'cold', tooltipText: 'Cold', align: 'Center', template: coldCanvasTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'warm', tooltipText: 'Warm', align: 'Center', template: warmCanvasTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'grayscale', tooltipText: 'Grayscale', align: 'Center', template: grayscaleCanvasTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'sepia', tooltipText: 'Sepia', align: 'Center', template: sepiaCanvasTemplate }),
                                        React.createElement(ej2_react_navigations_1.ItemDirective, { id: 'invert', tooltipText: 'Invert', align: 'Center', template: invertCanvasTemplate }))))))))),
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
exports.default = CustomToolbar;
