import * as React from 'react';
import { ImageEditorComponent, ImageFilterOption, ShapeType } from '@syncfusion/ej2-react-image-editor';
import { DropDownButtonComponent } from '@syncfusion/ej2-react-splitbuttons';
import { SampleBase } from '../common/sample-base';
import './custom-toolbar.css';
import { FabComponent } from '@syncfusion/ej2-react-buttons';
import { ItemDirective, ItemsDirective, ToolbarComponent } from '@syncfusion/ej2-react-navigations';
import { createElement, extend, isNullOrUndefined, Browser } from '@syncfusion/ej2/base';
import { ColorPickerComponent } from '@syncfusion/ej2-react-inputs';
export class CustomToolbar extends SampleBase {
    imageEditorInstance;
    topToolbarInstance;
    bottomToolbarInstance;
    filterToolbarInstance;
    fontColorInstance;
    annotationInstance;
    fillColorInstance;
    strokeColorInstance;
    penColorInstance;
    imageEditorCreated() {
        if (this.imageEditorInstance.theme && window.location.href.split('#')[1]) {
            this.imageEditorInstance.theme = window.location.href.split('#')[1].split('/')[1];
        }
    }
    popupLeft;
    currentToolbar = 'main';
    activeObjIndex;
    tempShapeSettings;
    isShapeCustomizing = false;
    isTextEditing = false;
    isShapeSelected = false;
    imageData;
    filter = ImageFilterOption.Default;
    presetColors = {
        'custom': ['#ffffff', '#000000', '#e91e63', '#9c27b0', '#673ab7', '#2196f3', '#03a9f4', '#00bcd4',
            '#009688', '#8bc34a', '#cddc39', '#ffeb3b']
    };
    toolbars = ['filter', 'rectangle', 'ellipse', 'line', 'text', 'edittext', 'freehanddraw'];
    editClicked() {
        document.getElementById('imagePreviewContainer').style.display = 'none';
        document.getElementById('image-editor-container').style.display = 'block';
        this.imageEditorInstance.open(document.getElementById('previewImgContainer').src);
        let toolbarArea = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        this.refreshToolbar('main');
    }
    ;
    fileOpened() {
        this.imageData = this.imageEditorInstance.getImageData();
    }
    ;
    onIECreated() {
        const image = document.getElementById('previewImgContainer');
        if (Browser.isDevice && image) {
            image.src = 'src/image-editor/images/flower.png';
        }
        document.addEventListener('keydown', this.keyDownEventHandler.bind(this));
        document.getElementById('image-editor-container').addEventListener('dblclick', this.doubleClickEvent.bind(this));
    }
    ;
    shapeChanging(args) {
        if (args.action === 'select') {
            this.isShapeSelected = true;
            this.updateToolbar(args, true);
        }
        else if (args.action === 'insert') {
            this.activeObjIndex = args.currentShapeSettings.id;
            this.tempShapeSettings = args.currentShapeSettings;
        }
    }
    ;
    shapeChange(args) {
        if (args.action === 'apply' && !this.isShapeCustomizing && !this.isShapeSelected) {
            this.isTextEditing = false;
            setTimeout(function () {
                this.refreshToolbar('main');
            }, 1);
        }
    }
    ;
    click() {
        if (this.toolbars.indexOf(this.currentToolbar) !== -1) {
            this.refreshToolbar('main');
        }
    }
    fontColorTemplate() {
        return (<div>
                <ColorPickerComponent id="imageEditor_textFont" ref={instance => this.fontColorInstance = instance} mode='Palette' cssClass='e-text-font-color' modeSwitcher={false} noColor={false} inline={false} showButtons={false} presetColors={this.presetColors} change={this.fontColorChanged} value={this.tempShapeSettings && this.tempShapeSettings.color != null ? this.tempShapeSettings.color : '#fff'} columns={4}></ColorPickerComponent>
            </div>);
    }
    fontColorChanged(args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        let selElem = this.fontColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        selElem.style.backgroundColor = args.currentValue.rgba;
        this.isShapeCustomizing = true;
        const shapeSetting = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
        shapeSetting.color = args.value;
        this.imageEditorInstance.updateShape(shapeSetting, true);
        this.tempShapeSettings.color = args.value;
        this.isShapeSelected = true;
        if (this.isTextEditing) {
            this.imageEditorInstance.enableTextEditing();
        }
        this.isShapeCustomizing = false;
    }
    annotationTemplate() {
        const items = [
            { text: 'Rectangle', id: 'rectangle', iconCss: 'e-icons e-rectangle' },
            { text: 'Ellipse', id: 'ellipse', iconCss: 'e-icons e-circle' },
            { text: 'Line', id: 'line', iconCss: 'e-icons e-line' }
        ];
        return (<div>
                <DropDownButtonComponent ref={instance => this.annotationInstance = instance} id="imageEditor_annotationButton" iconCss='e-icons e-shapes' cssClass='e-image-popup' items={items} select={this.annotationChange}></DropDownButtonComponent>
            </div>);
    }
    annotationChange(args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        this.refreshToolbar(args.item.id);
    }
    fillColorTemplate() {
        const colors = extend({}, this.presetColors, {}, true);
        colors['custom'][0] = '';
        return (<div>
                <ColorPickerComponent ref={instance => this.fillColorInstance = instance} id="imageEditor_shapeFill" mode='Palette' cssClass='e-shape-fill-color' modeSwitcher={false} noColor={true} inline={false} showButtons={false} presetColors={colors} beforeTileRender={this.tileRender} change={this.fillColorChanged} value='' columns={4}></ColorPickerComponent>
            </div>);
    }
    tileRender(args) {
        args.element.classList.add("e-circle-palette");
        args.element.appendChild(createElement("span", { className: "e-circle-selection" }));
    }
    fillColorChanged(args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        let selElem = this.fillColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        if (args.currentValue.rgba === '') {
            selElem.classList.add('e-nocolor-item');
        }
        else {
            selElem.classList.remove('e-nocolor-item');
            selElem.style.background = args.currentValue.rgba;
        }
        selElem.style.background = args.currentValue.rgba;
        this.isShapeCustomizing = true;
        const shapeSetting = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
        shapeSetting.fillColor = args.currentValue.rgba;
        this.imageEditorInstance.updateShape(shapeSetting, true);
        this.tempShapeSettings.fillColor = args.currentValue.rgba;
        this.isShapeSelected = true;
        if (this.isTextEditing) {
            this.imageEditorInstance.enableTextEditing();
        }
        this.isShapeCustomizing = false;
    }
    strokeColorTemplate() {
        return (<div>
                <ColorPickerComponent ref={instance => this.strokeColorInstance = instance} id="imageEditor_shapeStroke" mode='Palette' cssClass='e-shape-stroke-color' modeSwitcher={false} noColor={false} inline={false} showButtons={false} presetColors={this.presetColors} beforeTileRender={this.strokeColorTileRender} change={this.strokeColorChanged} value='#fff' columns={4}></ColorPickerComponent>
            </div>);
    }
    strokeColorTileRender(args) {
        args.element.classList.add("e-circle-palette");
        args.element.appendChild(createElement("span", { className: "e-circle-selection" }));
    }
    strokeColorChanged(args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        let selElem = this.strokeColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        selElem.style.backgroundColor = args.currentValue.rgba;
        this.isShapeCustomizing = true;
        const shapeSetting = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
        shapeSetting.strokeColor = args.currentValue.rgba;
        this.imageEditorInstance.updateShape(shapeSetting, true);
        this.tempShapeSettings.strokeColor = args.currentValue.rgba;
        this.isShapeSelected = true;
        if (this.isTextEditing) {
            this.imageEditorInstance.enableTextEditing();
        }
        this.isShapeCustomizing = false;
    }
    penColorTemplate() {
        return (<div>
                <ColorPickerComponent ref={instance => this.penColorInstance = instance} id="imageEditor_pen_stroke" mode='Palette' cssClass='e-pen-color' modeSwitcher={false} noColor={false} inline={false} showButtons={false} presetColors={this.presetColors} beforeTileRender={this.penTileRender} change={this.penColorChanged} value='#fff' columns={4}></ColorPickerComponent>
            </div>);
    }
    penTileRender(args) {
        args.element.classList.add("e-circle-palette");
        args.element.appendChild(createElement("span", { className: "e-circle-selection" }));
    }
    penColorChanged(args) {
        if (this.imageEditorInstance.disabled) {
            return;
        }
        let selElem = this.penColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
        ;
        selElem.style.backgroundColor = args.currentValue.rgba;
        if (this.tempShapeSettings && this.tempShapeSettings.id && this.tempShapeSettings.id.split('_')[0] === 'pen') {
            const shapeSetting = { id: this.tempShapeSettings.id, type: ShapeType.FreehandDraw,
                startX: this.tempShapeSettings.startX, startY: this.tempShapeSettings.startY,
                strokeColor: args.currentValue.hex, strokeWidth: this.tempShapeSettings.strokeWidth,
                opacity: this.tempShapeSettings.opacity, points: this.tempShapeSettings.points };
            this.imageEditorInstance.updateShape(shapeSetting, true);
            this.tempShapeSettings.strokeColor = args.currentValue.hex;
            this.isShapeSelected = true;
        }
        else {
            const shapeSetting = { id: null, type: ShapeType.FreehandDraw, startX: null, startY: null,
                strokeColor: args.currentValue.hex };
            this.imageEditorInstance.updateShape(shapeSetting);
        }
    }
    defaultCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_defaultCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Default</span>
                </div>
            </div>);
    }
    chromeCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_chromeCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Chrome</span>
                </div>
            </div>);
    }
    coldCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_coldCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Cold</span>
                </div>
            </div>);
    }
    warmCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_warmCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Warm</span>
                </div>
            </div>);
    }
    grayscaleCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_grayscaleCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Grayscale</span>
                </div>
            </div>);
    }
    sepiaCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_sepiaCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Sepia</span>
                </div>
            </div>);
    }
    invertCanvasTemplate() {
        return (<div className='filter-wrapper' style={{ boxSizing: "content-box" }}>
                <canvas id='imageEditor_invertCanvas'></canvas>
                <div style={{ textAlign: "center" }}>
                    <span>Invert</span>
                </div>
            </div>);
    }
    onTopToolbarCreated() {
        const toolbarArea = document.getElementById('top-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    }
    onBottomToolbarCreated() {
        const toolbarArea = document.getElementById('bottom-toolbar');
        toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
    }
    onFilterToolbarCreated() {
        const inMemoryCanvas = document.createElement('canvas');
        const inMemoryContext = inMemoryCanvas.getContext('2d');
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
    }
    updateFilterCanvas(selector, type, inMemoryCanvas) {
        const filter = document.querySelector('#imageEditor' + selector);
        if (filter) {
            let ctx = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px';
            filter.style.height = '100px';
            ctx.filter = this.imageEditorInstance.getImageFilter(this.toPascalCase(type));
            ctx.drawImage(inMemoryCanvas, 0, 0, 300, 150);
        }
    }
    toolbarClicked(args) {
        const item = args.item.id.toLowerCase();
        const dimension = this.imageEditorInstance.getImageDimension();
        let imageData;
        let canvas;
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
                if (isNullOrUndefined(this.activeObjIndex) && this.tempShapeSettings && this.tempShapeSettings.id) {
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
    }
    apply() {
        if (this.currentToolbar === 'crop') {
            this.imageEditorInstance.crop();
        }
        else if (this.currentToolbar === 'pen') {
            if (this.activeObjIndex && this.activeObjIndex.split('_')[0] === 'pen') {
                this.tempShapeSettings = this.imageEditorInstance.getShapeSetting(this.activeObjIndex);
            }
            else {
                const shapeSettings = this.imageEditorInstance.getShapeSettings();
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
    }
    filterImage(args) {
        this.imageEditorInstance.applyImageFilter(args.item.id);
        this.filter = args.item.id;
    }
    refreshToolbar(type, isEvent) {
        const toolbar = this.bottomToolbarInstance;
        let items = [];
        let filterToolbar;
        let itemModel;
        const dimension = this.imageEditorInstance.getImageDimension();
        let shapeSettings;
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
        for (let i = 0; i < toolbar.items.length; i++) {
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
        const enableUndo = this.imageEditorInstance.canUndo();
        const enableRedo = this.imageEditorInstance.canRedo();
        const topToolbar = this.topToolbarInstance;
        for (let i = 0; i < topToolbar.items.length; i++) {
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
        setTimeout(() => {
            let toolbarArea = document.getElementById('bottom-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
            toolbarArea = document.getElementById('top-toolbar');
            toolbarArea.style.left = (toolbarArea.parentElement.parentElement.clientWidth / 2) - (toolbarArea.clientWidth / 2) + 'px';
        }, 1);
    }
    updateToolbar(args, isEvent) {
        const type = args.currentShapeSettings.type.toLowerCase();
        this.refreshToolbar(type, isEvent);
        if (isEvent) {
            this.tempShapeSettings = args.currentShapeSettings;
            this.activeObjIndex = this.tempShapeSettings.id;
        }
        setTimeout(() => {
            const selFillElem = this.fillColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            const selStrokeElem = this.strokeColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            const selTextStrokeElem = this.fontColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            const selPenStrokeElem = this.penColorInstance.element.nextElementSibling.querySelector('.e-selected-color');
            if (selFillElem && (type === 'rectangle' || type === 'ellipse')) {
                if (args.currentShapeSettings.fillColor === '') {
                    selFillElem.classList.add('e-nocolor-item');
                }
                else {
                    selFillElem.classList.remove('e-nocolor-item');
                    selFillElem.style.background = args.currentShapeSettings.fillColor;
                }
                if (document.querySelector('#' + 'imageEditor_shapeFill')) {
                    this.fillColorInstance.value = args.currentShapeSettings.fillColor;
                }
            }
            if (selStrokeElem && (type === 'rectangle' || type === 'ellipse' || type === 'line')) {
                selStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                selStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_shapeStroke')) {
                    this.strokeColorInstance.value = args.currentShapeSettings.strokeColor;
                }
            }
            if (selTextStrokeElem && type === 'text') {
                selTextStrokeElem.style.backgroundColor = args.currentShapeSettings.color;
                selTextStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.color;
                if (document.querySelector('#' + 'imageEditor_textFont')) {
                    this.fontColorInstance.value = args.currentShapeSettings.color;
                }
            }
            if (selPenStrokeElem && type === 'freehanddraw') {
                selPenStrokeElem.style.backgroundColor = args.currentShapeSettings.strokeColor;
                selPenStrokeElem.children[0].style.backgroundColor = args.currentShapeSettings.strokeColor;
                if (document.querySelector('#' + 'imageEditor_penStroke')) {
                    this.penColorInstance.value = args.currentShapeSettings.strokeColor;
                }
            }
        }, 10);
    }
    toPascalCase(text) {
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
    keyDownEventHandler(e) {
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
                if (isNullOrUndefined(this.activeObjIndex) && this.tempShapeSettings && this.tempShapeSettings.id) {
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
    }
    doubleClickEvent(e) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (e.type === 'dblclick' && e.target.closest('.e-textarea')) {
            this.isTextEditing = true;
        }
    }
    render() {
        return (<div className="control-pane">
                <div className="control-section">
                    <div className="row">
                        <div className='col-lg-12 control-section e-img-editor-sample'>
                            <div className='customToolbar'>
                            <div className="header">
                                <div className="header-details">
                                    <div className="header-name">Image Editor</div>
                                </div>
                            </div>
                                <div className='image-preview-container' id='imagePreviewContainer'>
                                    <img src="src/image-editor/images/bridge.jpg" id="previewImgContainer" className="preview-img-container" alt="previewImage"/>
                                    <br />
                                    <div className='button-container' id="button-container">
                                        <FabComponent id='edit' className='custom-button' iconCss='e-icons e-edit' position='BottomRight' target='.image-preview-container' isPrimary={true} onClick={this.editClicked} content={'Edit Image'}></FabComponent>
                                    </div>
                                </div>
                                <div className="image-editor-container" id="image-editor-container" style={{ display: 'none' }}>
                                    <div id="top-toolbarArea">
                                        <ToolbarComponent ref={toolbar => this.topToolbarInstance = toolbar} id="top-toolbar" created={this.onTopToolbarCreated} clicked={this.toolbarClicked}>
                                            <ItemsDirective>
                                                <ItemDirective id='cancel' prefixIcon='e-icons e-close' tooltipText='Cancel' align='Center'></ItemDirective>
                                                <ItemDirective id='undo' prefixIcon='e-icons e-undo' tooltipText='Undo' align='Center' disabled={true}></ItemDirective>
                                                <ItemDirective id='redo' prefixIcon='e-icons e-redo' tooltipText='Redo' align='Center' disabled={true}></ItemDirective>
                                                <ItemDirective id='ok' prefixIcon='e-icons e-save' tooltipText='Save' align='Center'></ItemDirective>
                                            </ItemsDirective>
                                        </ToolbarComponent>
                                    </div>
                                    <div id="imageEditor">
                                        <ImageEditorComponent ref={instance => this.imageEditorInstance = instance} created={this.onIECreated} fileOpened={this.fileOpened} toolbar={[]} showQuickAccessToolbar={false} shapeChanging={this.shapeChanging} shapeChange={this.shapeChange} click={this.click} zoomSettings={{ minZoomFactor: 0.1, maxZoomFactor: 50 }}></ImageEditorComponent>
                                    </div>
                                    <div id="bottom-toolbarArea">
                                        <ToolbarComponent ref={instance => this.bottomToolbarInstance = instance} id="bottom-toolbar" created={this.onBottomToolbarCreated} clicked={this.toolbarClicked}>
                                            <ItemsDirective>
                                            <ItemDirective id='cropAndTransform' prefixIcon='e-icons e-crop' tooltipText='Crop and Transform' align='Center'></ItemDirective>
                                                <ItemDirective id='back' prefixIcon='e-icons e-arrow-left' tooltipText='Back' align='Center' visible={false}></ItemDirective>
                                                <ItemDirective id='rotateLeft' prefixIcon='e-icons e-transform-left' tooltipText='Rotate Left' align='Center' visible={false}></ItemDirective>
                                                <ItemDirective id='rotateRight' prefixIcon='e-icons e-transform-right' tooltipText='Rotate Right' align='Center' visible={false}></ItemDirective>
                                                <ItemDirective id='addText' prefixIcon='e-icons e-text-annotation' tooltipText='Text' align='Center'></ItemDirective>
                                                <ItemDirective id='fontColor' cssClass='top-icon e-text-fontColor' tooltipText='Font Color' align='Center' visible={false} type='Input' template={this.fontColorTemplate}></ItemDirective>
                                                <ItemDirective id='shapes' prefixIcon='e-icons e-shapes' tooltipText='Annotations' align='Center' template={this.annotationTemplate}></ItemDirective>
                                                <ItemDirective id='fillColor' prefixIcon='e-icons e-copy' cssClass='top-icon e-fill' tooltipText='Fill Color' align='Center' visible={false} type='Input' template={this.fillColorTemplate}></ItemDirective>                    
                                                <ItemDirective id='strokeColor' prefixIcon='e-icons e-copy' cssClass='top-icon e-stroke' tooltipText='Stroke Color' align='Center' visible={false} type='Input' template={this.strokeColorTemplate}></ItemDirective>
                                                <ItemDirective id='penStrokeColor' prefixIcon='e-icons e-copy' cssClass='top-icon e-pen-stroke-color' tooltipText='Stroke Color' align='Center' visible={false} type='Input' template={this.penColorTemplate}></ItemDirective>
                                                <ItemDirective id='remove' prefixIcon='e-icons e-trash' tooltipText='Remove' align='Center' visible={false} disabled={false}></ItemDirective>
                                                <ItemDirective id='editText' prefixIcon='e-icons e-annotation-edit' cssClass='top-icon e-annotation-edit' tooltipText='Edit Text' align='Center' visible={false} disabled={false}></ItemDirective>
                                                <ItemDirective id='addPen' prefixIcon='e-icons e-free-pen' tooltipText='Pen' align='Center'></ItemDirective>
                                                <ItemDirective id='filters' prefixIcon='e-icons e-filters' tooltipText='Filters' align='Center'></ItemDirective>
                                            </ItemsDirective>
                                        </ToolbarComponent>
                                        <ToolbarComponent ref={instance => this.filterToolbarInstance = instance} id="filter-toolbar" clicked={this.filterImage}>
                                            <ItemsDirective>
                                                <ItemDirective id='default' tooltipText='Default' align='Center' template={this.defaultCanvasTemplate}></ItemDirective>
                                                <ItemDirective id='chrome' tooltipText='Chrome' align='Center' template={this.chromeCanvasTemplate}></ItemDirective>
                                                <ItemDirective id='cold' tooltipText='Cold' align='Center' template={this.coldCanvasTemplate}></ItemDirective>
                                                <ItemDirective id='warm' tooltipText='Warm' align='Center' template={this.warmCanvasTemplate}></ItemDirective>
                                                <ItemDirective id='grayscale' tooltipText='Grayscale' align='Center' template={this.grayscaleCanvasTemplate}></ItemDirective>
                                                <ItemDirective id='sepia' tooltipText='Sepia' align='Center' template={this.sepiaCanvasTemplate}></ItemDirective>
                                                <ItemDirective id='invert' tooltipText='Invert' align='Center' template={this.invertCanvasTemplate}></ItemDirective>
                                            </ItemsDirective>
                                        </ToolbarComponent>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="action-description">
                    <p>
                        This sample demonstrates a custom toolbar using the Image Editor Control.
                    </p>
                </div>
                <div id="description">
                    <p>
                        The Image Editor component provides built-in support for adding a custom toolbar
                        through APIs in the following ways:
                    </p>
                    <ul>
                        <li>
                            <b>Selection</b> : Multiple selection options are available. The
                            selection region can be a square or circle, customized to various
                            aspects ratios, and customized by dragging and resizing.
                        </li>
                        <li>
                            <b>Crop</b> : The image can be cropped based on the selection.
                        </li>
                        <li>
                            <b>Rotate</b> : The image can be rotated both clockwise and
                            anticlockwise by 90 degrees.
                        </li>
                        <li>
                            <b>Freehand drawing</b> : Draw freehand on the image and adjust the
                            pen's stroke width and stroke color.
                        </li>
                        <li>
                            <b>Get Image data</b> : Retrieves the edited image in image data format.
                        </li>
                        <li>
                            <b>Annotation</b> : Text, rectangle, ellipse, path, image, and line annotation shapes are supported.
                        </li>
                        <li>
                            <b>Filters</b> : The predefined filters such as chrome, cold, warm, grayscale, sepia, and invert can be applied to the image.
                        </li>
                    </ul>
                    <p>
                        More information about Image Editor can be found in this
                        <a target="_blank" href="https://ej2.syncfusion.com/react/documentation/image-editor/getting-started/">
                            documentation section
                        </a>
                        .
                    </p>
                </div>
            </div>);
    }
}
