var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
/* eslint-disable max-len */
import { Component, NotifyPropertyChanges, Property, addClass, removeClass, extend } from '@syncfusion/ej2-base';
import { Event, EventHandler, getComponent, isNullOrUndefined, getUniqueID, setValue } from '@syncfusion/ej2-base';
import { Dialog, createSpinner } from '@syncfusion/ej2-popups';
import { Complex, Browser, ChildProperty, compile as templateCompiler, compile } from '@syncfusion/ej2-base';
import { ToolbarModule, Crop, Draw, Filter, FreehandDrawing, Selection, Shape, Transform, UndoRedo, Export, FrameLineStyle, ShapeType } from './../index';
import { ZoomTrigger, ImageFinetuneOption } from './../index';
import { Uploader } from '@syncfusion/ej2-inputs';
/**
 * Defines the settings for restricting uploaded images.
 */
var UploadSettings = /** @class */ (function (_super) {
    __extends(UploadSettings, _super);
    function UploadSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], UploadSettings.prototype, "allowedExtensions", void 0);
    __decorate([
        Property(null)
    ], UploadSettings.prototype, "minFileSize", void 0);
    __decorate([
        Property(null)
    ], UploadSettings.prototype, "maxFileSize", void 0);
    return UploadSettings;
}(ChildProperty));
export { UploadSettings };
/**
 * This interface is used to specify settings for finetuning operations on images, including brightness, contrast, hue, saturation, exposure, opacity, and blur. It includes properties for setting minimum and maximum values for each of these options, as well as a default value.
 */
var FinetuneSettings = /** @class */ (function (_super) {
    __extends(FinetuneSettings, _super);
    function FinetuneSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "brightness", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "contrast", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "hue", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "saturation", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "exposure", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "opacity", void 0);
    __decorate([
        Property(null)
    ], FinetuneSettings.prototype, "blur", void 0);
    return FinetuneSettings;
}(ChildProperty));
export { FinetuneSettings };
/**
 * An interface used to define the settings such as minimum, maximum, and default zoom factors, and the type of zooming which are available in the image editor control.
 */
var ZoomSettings = /** @class */ (function (_super) {
    __extends(ZoomSettings, _super);
    function ZoomSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(null)
    ], ZoomSettings.prototype, "zoomTrigger", void 0);
    __decorate([
        Property(1)
    ], ZoomSettings.prototype, "minZoomFactor", void 0);
    __decorate([
        Property(10)
    ], ZoomSettings.prototype, "maxZoomFactor", void 0);
    __decorate([
        Property(1)
    ], ZoomSettings.prototype, "zoomFactor", void 0);
    __decorate([
        Property(null)
    ], ZoomSettings.prototype, "zoomPoint", void 0);
    return ZoomSettings;
}(ChildProperty));
export { ZoomSettings };
/**
 * This interface is used to specify settings for selection operations on images, including visibility, stroke color and fill color.
 */
var SelectionSettings = /** @class */ (function (_super) {
    __extends(SelectionSettings, _super);
    function SelectionSettings() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property(true)
    ], SelectionSettings.prototype, "showCircle", void 0);
    __decorate([
        Property(null)
    ], SelectionSettings.prototype, "strokeColor", void 0);
    __decorate([
        Property(null)
    ], SelectionSettings.prototype, "fillColor", void 0);
    return SelectionSettings;
}(ChildProperty));
export { SelectionSettings };
/**
 * Predefine the font families that populate in font family dropdown list from the toolbar.
 */
var FontFamily = /** @class */ (function (_super) {
    __extends(FontFamily, _super);
    function FontFamily() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        Property('Arial')
    ], FontFamily.prototype, "default", void 0);
    __decorate([
        Property(null)
    ], FontFamily.prototype, "items", void 0);
    return FontFamily;
}(ChildProperty));
export { FontFamily };
/**
 * The Image Editor is a graphical user interface for editing images.
 *
 * {% codeBlock src='image-editor/default/index.md' %}{% endcodeBlock %}
 *
 * @remarks
 * The Image Editor component provides various image editing features such as zooming, cropping, rotating, inserting text and shapes (rectangles, ellipses, and lines), drawing freehand on top of an image, undo/redo, and more.
 *
 */
var ImageEditor = /** @class */ (function (_super) {
    __extends(ImageEditor, _super);
    /**
     *
     * Constructor for creating the widget
     *
     * @param  {ImageEditorModel} options - Specifies the image editor model
     * @param  {string|HTMLDivElement} element - Specifies the target element
     */
    function ImageEditor(options, element) {
        var _this = _super.call(this, options) || this;
        /**
         *
         * Image Editor Private Properties
         */
        /** @hidden */
        _this.isImageLoaded = false;
        /** @hidden */
        _this.activeObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
            flipObjColl: [], triangle: [], triangleRatio: [], rotatedAngle: 0, opacity: 1, order: null };
        // current object's ui interaction properties
        /** @hidden */
        _this.currObjType = { shape: '', isDragging: false, isActiveObj: false, isText: false, isInitialText: false, isLine: false, isInitialLine: false,
            isCustomCrop: false, isZoomed: false, isUndoZoom: false, isUndoAction: false, isFiltered: false, isSave: false, isResize: false, isRedact: false };
        /** @hidden */
        _this.objColl = [];
        /** @hidden */
        // eslint-disable-next-line
        _this.pointColl = {};
        /** @hidden */
        _this.freehandCounter = 0;
        /** @hidden */
        _this.points = [];
        /** @hidden */
        _this.togglePen = false;
        /** @hidden */
        _this.togglePan = false;
        /** @hidden */
        _this.img = { destLeft: 0, destTop: 0, destWidth: 0, destHeight: 0, srcLeft: 0, srcTop: 0, srcWidth: 0, srcHeight: 0 };
        /** @hidden */
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        _this.rotateFlipColl = [];
        // All prop values saved while cropping (to restore the image to its original state)
        /** @hidden */
        _this.cropObj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
            totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {}, rotateFlipColl: [],
            degree: 0, currFlipState: '', straighten: 0, destPoints: { startX: 0, startY: 0, width: 0, height: 0 },
            srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: false,
            zoomFactor: 0, previousZoomValue: 0, aspectWidth: null, aspectHeight: null, frame: 'none', straightenZoom: 0,
            adjustmentLevel: { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
                exposure: 0, transparency: 100, sharpen: false, bw: false }, currentFilter: '' };
        // Stored transformations performed after cropping
        /** @hidden */
        _this.afterCropActions = [];
        /** @hidden */
        _this.transform = { degree: 0, currFlipState: '', zoomFactor: 0, cropZoomFactor: null, defaultZoomFactor: 0, straighten: 0 };
        /** @hidden */
        _this.panPoint = { currentPannedPoint: { x: 0, y: 0 }, totalPannedPoint: { x: 0, y: 0 }, totalPannedInternalPoint: { x: 0, y: 0 },
            totalPannedClientPoint: { x: 0, y: 0 } };
        /** @hidden */
        _this.isUndoRedo = false;
        /** @hidden */
        _this.isCropTab = false;
        /** @hidden */
        _this.isCircleCrop = false;
        /** @hidden */
        _this.fontSizeColl = [];
        /** @hidden */
        _this.initialAdjustmentValue = '';
        /** @hidden */
        _this.currentFilter = '';
        /** @hidden */
        _this.canvasFilter = 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
            'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        /** @hidden */
        _this.toolbarHeight = 0;
        /** @hidden */
        _this.isPublicMethod = false;
        /** @hidden */
        _this.isCropToolbar = false;
        /** @hidden */
        _this.cursor = 'default';
        /** @hidden */
        _this.resizeSrc = { startX: _this.img.srcLeft, startY: _this.img.srcTop, width: _this.img.srcWidth, height: _this.img.srcHeight };
        /** @hidden */
        _this.isResize = false;
        /** @hidden */
        _this.isAspectRatio = false;
        /** @hidden */
        _this.frameObj = { type: 'none', color: '#fff', size: 20, inset: 20, offset: 20, radius: 0, amount: 1, border: 'solid', gradientColor: '' };
        /** @hidden */
        _this.tempFrameObj = { type: 'none', color: '#fff', size: 20, inset: 20, offset: 20, radius: 0, amount: 1, border: 'solid', gradientColor: '' };
        /** @hidden */
        _this.allowDownScale = true;
        /** @hidden */
        _this.gradientColor = '';
        /** @hidden */
        _this.size = 20;
        /** @hidden */
        _this.inset = 0;
        /** @hidden */
        _this.offset = 0;
        /** @hidden */
        _this.borderRadius = 0;
        /** @hidden */
        _this.lineCount = 0;
        /** @hidden */
        _this.prevStraightenedDegree = 0;
        /** @hidden */
        _this.tempStraighten = 0;
        /** @hidden */
        _this.isStraightening = false;
        /** @hidden */
        _this.isFinetuning = false;
        /** @hidden */
        _this.isZoomBtnClick = false;
        /** @hidden */
        _this.isFinetuneBtnClick = false;
        /** @hidden */
        _this.isFilterCanvasClick = false;
        /** @hidden */
        _this.isFrameBtnClick = false;
        /** @hidden */
        _this.isChangesSaved = false;
        /** @hidden */
        _this.isShapeDrawing = false;
        /** @hidden */
        _this.noPushUndo = false;
        /** @hidden */
        _this.isUndoRedoStack = false;
        /** @hidden */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.shapeColl = [];
        /** @hidden */
        _this.isKBDNavigation = false;
        /** @hidden */
        _this.isMaskImage = false;
        /** @hidden */
        _this.tempObjColl = [];
        /** @hidden */
        _this.tempPointColl = [];
        /** @hidden */
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        _this.tempShapeColl = [];
        /** @hidden */
        _this.isImageUpdated = false;
        /** @hidden */
        _this.noRedact = false;
        /** @hidden */
        _this.tempRedactBlur = 50;
        /** @hidden */
        _this.tempRedactPixel = 40;
        _this.tempToolbarHeight = 0;
        _this.tempToolbar = [];
        ImageEditor_1.Inject(Crop, Draw, Selection, Transform, Export, ToolbarModule);
        ImageEditor_1.Inject(UndoRedo);
        ImageEditor_1.Inject(Filter);
        ImageEditor_1.Inject(Shape);
        ImageEditor_1.Inject(FreehandDrawing);
        if (element) {
            _this.appendTo(element);
        }
        return _this;
    }
    ImageEditor_1 = ImageEditor;
    /**
     * To provide the array of modules needed for component rendering.
     *
     * @returns {ModuleDeclaration[]} - To provide the array of modules needed for component rendering.
     * @hidden
     */
    ImageEditor.prototype.requiredModules = function () {
        var modules = [];
        modules.push({ member: 'crop', args: [this] });
        modules.push({ member: 'draw', args: [this] });
        modules.push({ member: 'selection', args: [this] });
        modules.push({ member: 'transform', args: [this] });
        modules.push({ member: 'export', args: [this] });
        modules.push({ member: 'toolbar-module', args: [this] });
        modules.push({ member: 'undo-redo', args: [this] });
        modules.push({ member: 'filter', args: [this] });
        modules.push({ member: 'shape', args: [this] });
        modules.push({ member: 'freehand-draw', args: [this] });
        return modules;
    };
    ImageEditor.prototype.preRender = function () {
        // pre render code snippets
        this.element.id = this.element.id || getUniqueID('ej2-image-editor');
        this.isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
        if (Browser.isDevice) {
            this.element.classList.add('e-device');
        }
        this.initializeThemeColl();
    };
    /**
     *
     * To Initialize the component rendering
     *
     * @private
     * @returns {void}
     */
    ImageEditor.prototype.render = function () {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (this.isAngular) {
            var originalElement = this.element;
            var clonedElement = originalElement.cloneNode(true);
            originalElement.parentNode.replaceChild(clonedElement, originalElement);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            this.element = clonedElement;
            setValue('ej2_instances', [this], this.element);
        }
        this.initialize();
    };
    /**
     * To get component name.
     *
     * @returns {string} - Module Name
     * @private
     */
    ImageEditor.prototype.getModuleName = function () {
        return 'image-editor';
    };
    /**
     *
     * To get the properties to be maintained in the persisted state.
     *
     * @returns {string} - Persist data
     * @private
     */
    ImageEditor.prototype.getPersistData = function () {
        return this.addOnPersist([]);
    };
    /**
     *
     * Called internally if any of the property value changed.
     *
     * @param {ImageEditorModel} newProperties - Specifies new properties
     * @param {ImageEditorModel} oldProperties - Specifies old properties
     * @returns {void}
     * @private
     */
    ImageEditor.prototype.onPropertyChanged = function (newProperties, oldProperties) {
        var indexObj;
        for (var _i = 0, _a = Object.keys(newProperties); _i < _a.length; _i++) {
            var prop = _a[_i];
            switch (prop) {
                case 'cssClass':
                    if (oldProperties.cssClass) {
                        removeClass([this.element], oldProperties.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    if (newProperties.cssClass) {
                        addClass([this.element], newProperties.cssClass.replace(/\s+/g, ' ').trim().split(' '));
                    }
                    break;
                case 'disabled':
                    if (newProperties.disabled) {
                        this.element.classList.add('e-disabled');
                        this.unwireEvent();
                    }
                    else {
                        this.element.classList.remove('e-disabled');
                        this.wireEvent();
                    }
                    break;
                case 'height':
                    this.element.style.height = newProperties.height;
                    this.update();
                    break;
                case 'width':
                    this.element.style.width = newProperties.width;
                    this.update();
                    break;
                case 'theme':
                    if (newProperties.theme) {
                        if (this.theme && this.theme !== '') {
                            this.theme = this.toPascalCase(this.theme);
                        }
                        else {
                            this.theme = 'Bootstrap5';
                        }
                        this.upperContext.strokeStyle = this.themeColl[this.theme]['primaryColor'];
                        this.upperContext.fillStyle = this.themeColl[this.theme]['secondaryColor'];
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    break;
                case 'finetuneSettings':
                    if (newProperties.finetuneSettings) {
                        this.finetuneSettings = newProperties.finetuneSettings;
                        this.notify('filter', { prop: 'update-finetunes' });
                    }
                    break;
                case 'locale':
                    if (newProperties.locale) {
                        this.notify('toolbar', { prop: 'setLocale', onPropertyChange: false, value: { locale: newProperties.locale } });
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    break;
                case 'allowUndoRedo':
                    if (newProperties.allowUndoRedo) {
                        this.allowUndoRedo = true;
                    }
                    else {
                        this.allowUndoRedo = false;
                    }
                    this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                            isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    break;
                case 'showQuickAccessToolbar':
                    if (newProperties.showQuickAccessToolbar) {
                        this.showQuickAccessToolbar = true;
                        this.notify('toolbar', { prop: 'create-qa-toolbar', onPropertyChange: false });
                        indexObj = { freehandSelectedIndex: null };
                        this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                        if (this.activeObj.shape) {
                            this.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
                        }
                        else if (indexObj['freehandSelectedIndex']) {
                            this.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: true } });
                        }
                    }
                    else {
                        this.showQuickAccessToolbar = false;
                        this.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                    }
                    break;
                case 'zoomSettings':
                    if (newProperties.zoomSettings) {
                        this.zoomSettings.zoomTrigger = newProperties.zoomSettings.zoomTrigger;
                    }
                    if (isNullOrUndefined(this.zoomSettings.zoomTrigger)) {
                        this.zoomSettings.zoomTrigger = (ZoomTrigger.MouseWheel | ZoomTrigger.Pinch | ZoomTrigger.Toolbar |
                            ZoomTrigger.Commands);
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else if ((newProperties.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    break;
                case 'selectionSettings':
                    if (newProperties.selectionSettings) {
                        this.selectionSettings = newProperties.selectionSettings;
                        if (this.activeObj.shape) {
                            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
                            this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: this.activeObj } });
                        }
                    }
                    break;
                case 'toolbar':
                    if (newProperties.toolbar) {
                        this.toolbar = newProperties.toolbar;
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    break;
                case 'toolbarTemplate':
                    if (newProperties.toolbarTemplate) {
                        this.notify('toolbar', { prop: 'destroy-bottom-toolbar', onPropertyChange: false });
                        this.notify('toolbar', { prop: 'destroy-top-toolbar', onPropertyChange: false });
                        this.element.appendChild(this.createElement('div', {
                            id: this.element.id + '_toolbarArea', className: 'e-toolbar-area'
                        }));
                        this.toolbarTemplateFn();
                    }
                    break;
                case 'quickAccessToolbarTemplate':
                    if (newProperties.quickAccessToolbarTemplate) {
                        this.notify('toolbar', { prop: 'destroy-qa-toolbar', onPropertyChange: false });
                        this.quickAccessToolbarTemplateFn();
                    }
                    break;
                case 'uploadSettings':
                    if (newProperties.uploadSettings) {
                        this.uploadSettings = newProperties.uploadSettings;
                        if (!this.uploadSettings.allowedExtensions) {
                            this.uploadSettings.allowedExtensions = '.jpg, .jpeg, .png, .svg, .webp';
                            this.notify('draw', { prop: 'setNullExtension', value: { extension: true } });
                        }
                        else {
                            this.notify('draw', { prop: 'setNullExtension', value: { extension: false } });
                        }
                        this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                    }
                    else {
                        this.notify('draw', { prop: 'setNullExtension', value: { extension: true } });
                    }
                    this.updateDropInfoContent(this.element.querySelector('.e-ie-drop-info'));
                    break;
            }
        }
    };
    ImageEditor.prototype.destroy = function () {
        var classList = [];
        this.element.removeAttribute('tabindex');
        var saveDialog = this.element.querySelector('#' + this.element.id + '_saveDialog');
        if (saveDialog && saveDialog.style.display === 'block') {
            getComponent(document.getElementById(this.element.id + '_saveDialog'), 'dialog').destroy();
        }
        if (this.cssClass) {
            classList = classList.concat(this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        removeClass([this.element], classList);
        if (!this.element.getAttribute('class')) {
            this.element.removeAttribute('class');
        }
        this.unwireEvent();
        this.notify('toolbar', { prop: 'destroySubComponents', onPropertyChange: false });
        this.notify('destroyed', null);
        _super.prototype.destroy.call(this);
        this.element.innerHTML = '';
    };
    ImageEditor.prototype.initialize = function () {
        if (this.toolbarTemplate) {
            this.element.appendChild(this.createElement('div', {
                id: this.element.id + '_toolbarArea', className: 'e-toolbar-area'
            }));
            this.toolbarTemplateFn();
        }
        else {
            this.notify('toolbar', { prop: 'create-toolbar', onPropertyChange: false });
            this.notify('toolbar', { prop: 'create-contextual-toolbar', onPropertyChange: false });
        }
        if (!this.uploadSettings.allowedExtensions) {
            this.setProperties({ uploadSettings: { allowedExtensions: '.jpg, .jpeg, .png, .svg, .webp' } }, true);
        }
        else {
            this.notify('draw', { prop: 'setNullExtension', value: { extension: false } });
        }
        this.createCanvas();
        if (this.element.offsetWidth > 359 && this.element.querySelector('.e-ie-min-drop-content') && this.element.querySelector('.e-ie-drop-content')) {
            this.element.querySelector('.e-ie-min-drop-content').style.display = 'none';
            this.element.querySelector('.e-ie-drop-content').style.display = 'block';
        }
        this.createDropUploader();
        if (this.showQuickAccessToolbar) {
            var canvasWrapper = document.querySelector('#' + this.element.id + '_canvasWrapper');
            canvasWrapper.appendChild(this.createElement('div', {
                id: this.element.id + '_quickAccessToolbarArea', className: 'e-quick-access-toolbar-area'
            }));
            var quickAccessToolbar = document.getElementById(this.element.id + '_quickAccessToolbarArea');
            quickAccessToolbar.style.position = 'absolute';
            quickAccessToolbar.style.display = 'none';
            if (this.activeObj) {
                quickAccessToolbar.style.left = this.activeObj.activePoint.startX + 'px';
                quickAccessToolbar.style.top = this.activeObj.activePoint.startY + 'px';
            }
            quickAccessToolbar.style.width = '100%';
        }
        if (this.quickAccessToolbarTemplate) {
            this.quickAccessToolbarTemplateFn();
        }
        else {
            this.notify('toolbar', { prop: 'create-qa-toolbar', onPropertyChange: false });
        }
        this.wireEvent();
        this.lowerContext = this.lowerCanvas.getContext('2d');
        this.upperContext = this.upperCanvas.getContext('2d');
        this.inMemoryContext = this.inMemoryCanvas.getContext('2d');
        this.lowerContext.filter = this.getDefaultFilter();
        this.notify('filter', { prop: 'setAdjustmentValue', onPropertyChange: false, value: { adjustmentValue: this.lowerContext.filter } });
        this.canvasFilter = this.lowerContext.filter;
        this.notify('toolbar', { prop: 'setInitialAdjustmentValue', onPropertyChange: false, value: { value: this.lowerContext.filter } });
        if (this.cssClass) {
            addClass([this.element], this.cssClass.replace(/\s+/g, ' ').trim().split(' '));
        }
        if (this.element) {
            createSpinner({
                target: this.element
            });
        }
        this.initializeZoomSettings();
        if (this.imgSrc) {
            this.open(this.imgSrc);
        }
    };
    ImageEditor.prototype.createDropUploader = function () {
        var _this = this;
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        var proxy = this;
        var uploadObj = new Uploader({
            dropArea: this.element.getElementsByClassName('e-canvas-wrapper')[0],
            allowedExtensions: this.uploadSettings.allowedExtensions,
            multiple: false,
            selected: function (args) {
                if (args.event.type === 'change' || args.event.type === 'drop') {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    var type = args.filesData[0].type;
                    var errType = 'unsupported';
                    var extension = _this.getExtensionArray();
                    var isAllowedFileType = (extension.indexOf(type) > -1 ||
                        (type === 'jpeg' && (proxy.uploadSettings.allowedExtensions.indexOf('jpg') > -1 ||
                            proxy.uploadSettings.allowedExtensions.indexOf('jpeg') > -1)));
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    var size = args.filesData[0].size;
                    var isInvalidSize = (proxy.uploadSettings.minFileSize && size < proxy.uploadSettings.minFileSize) ||
                        (proxy.uploadSettings.maxFileSize && size > proxy.uploadSettings.maxFileSize);
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    if ((args.event.type === 'change' || (args.event.type === 'drop' && args.event.dataTransfer.files.length === 1)) && isAllowedFileType &&
                        !isInvalidSize) {
                        _this.notify('draw', { prop: 'fileSelect', value: { inputElement: _this.element.querySelector('#' + _this.element.id + '_dropfileUpload'), args: args } });
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        if (args.event.type === 'drop' && args.event.dataTransfer.files.length > 1) {
                            errType = 'multi-select-image';
                        }
                        _this.showDialogPopup(errType, !isAllowedFileType);
                    }
                }
            }
        });
        uploadObj.appendTo('#' + this.element.id + '_dropfileUpload');
    };
    ImageEditor.prototype.dlgCloseBtnClick = function () {
        getComponent(document.getElementById(this.element.id + '_dialog'), 'dialog').destroy();
    };
    /**
     * Show dialog popup for unsupported files.
     *
     * @param { string } type - Specifies the type of error.
     * @param { boolean } fileTypeError - Specifies the error is due to file type.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.showDialogPopup = function (type, fileTypeError) {
        var content = '';
        this.element.querySelector('#' + this.element.id + '_dialog').style.display = 'block';
        var headerObj;
        var okObj = { key: 'DlgOK' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: okObj } });
        if (type === 'multi-select-image') {
            headerObj = { key: 'ImageErrorDialogHeader' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: headerObj } });
            var contentObj = { key: 'ImageErrorDialogContent' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: contentObj } });
            content = '<span>' + contentObj['value'] + '</span>';
        }
        else {
            headerObj = { key: 'AlertDialogHeader' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: headerObj } });
            var contentObj = { key: 'AlertDialogContent' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: contentObj } });
            var supportObj = { key: 'SupportText' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: supportObj } });
            var extension = this.getExtensionString();
            var fileSizeObj = { key: 'MinMaxSizeAlert' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: fileSizeObj } });
            var andObj = { key: 'And' };
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: andObj } });
            var size = void 0;
            if (this.uploadSettings.minFileSize && this.uploadSettings.maxFileSize) {
                size = ' ' + fileSizeObj['value'] + ' <b> ' + this.formatSizeUnits(this.uploadSettings.minFileSize) + ' </b> ' + andObj['value'] + ' <b> ' + this.formatSizeUnits(this.uploadSettings.maxFileSize) + ' </b> ';
            }
            else if (this.uploadSettings.minFileSize) {
                fileSizeObj['key'] = 'MinSizeAlert';
                this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: fileSizeObj } });
                size = ' ' + fileSizeObj['value'] + ' <b> ' + this.formatSizeUnits(this.uploadSettings.minFileSize) + ' </b> ';
            }
            else if (this.uploadSettings.maxFileSize) {
                fileSizeObj['key'] = 'MaxSizeAlert';
                this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: fileSizeObj } });
                size = ' ' + fileSizeObj['value'] + ' <b> ' + this.formatSizeUnits(this.uploadSettings.maxFileSize) + ' </b> ';
            }
            if (fileTypeError) {
                content = '<span>' + contentObj['value'] + ' ' + supportObj['value'] + '<b>' + extension + '</b>' + '</span>';
            }
            else if (size) {
                content = '<span>' + contentObj['value'] + ' ' + supportObj['value'] + size + '</span>';
            }
        }
        var dialog = new Dialog({
            header: headerObj['value'],
            closeOnEscape: true,
            content: content,
            target: document.getElementById('target'),
            width: Browser.isDevice ? '285px' : '400px',
            isModal: true,
            animationSettings: { effect: 'Zoom' },
            close: this.dlgCloseBtnClick.bind(this),
            buttons: [
                { click: this.dlgCloseBtnClick.bind(this),
                    buttonModel: { content: okObj['value'] }
                }
            ]
        });
        dialog.appendTo('#' + this.element.id + '_dialog');
    };
    /**
     * Returns bytes in string format.
     *
     * @param { number } bytes - Specifies the bytes.
     *
     * @hidden
     * @returns {string}.
     */
    ImageEditor.prototype.formatSizeUnits = function (bytes) {
        var byte = '';
        if (bytes >= 1073741824) {
            byte = (bytes / 1073741824).toFixed(2) + ' GB';
        }
        else if (bytes >= 1048576) {
            byte = (bytes / 1048576).toFixed(2) + ' MB';
        }
        else if (bytes >= 1024) {
            byte = (bytes / 1024).toFixed(2) + ' KB';
        }
        else if (bytes > 1) {
            byte = bytes + ' bytes';
        }
        else if (bytes === 1) {
            byte = bytes + ' byte';
        }
        else {
            byte = '0 bytes';
        }
        return byte;
    };
    /**
     * Returns allowed file type extensions in string[].
     *
     * @hidden
     * @returns {string[]}.
     */
    ImageEditor.prototype.getExtensionArray = function () {
        var validExtensions = ['jpeg', 'jpg', 'png', 'svg', 'webp'];
        var split = this.uploadSettings.allowedExtensions.split(',');
        var extension = [];
        for (var _i = 0, split_1 = split; _i < split_1.length; _i++) {
            var ext = split_1[_i];
            var trimmedExt = ext.trim();
            for (var _a = 0, validExtensions_1 = validExtensions; _a < validExtensions_1.length; _a++) {
                var valid = validExtensions_1[_a];
                if (trimmedExt.indexOf(valid) !== -1) {
                    extension.push(valid);
                    break;
                }
            }
        }
        return extension;
    };
    /**
     * Returns allowed file type extensions in string.
     *
     * @hidden
     * @returns {string}.
     */
    ImageEditor.prototype.getExtensionString = function () {
        var andObj = { key: 'And' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: andObj } });
        var extension = this.getExtensionArray();
        var words = '';
        for (var i = 0; i < extension.length; i++) {
            if (i === extension.length - 1 && extension.length > 1 &&
                !((extension[i] === 'jpeg' || extension[i] === 'jpg') &&
                    (words.indexOf('JPG') > -1))) {
                if (extension.length === 2 || (extension.length === 3 && extension.indexOf('jpeg') !== -1 && extension.indexOf('jpg') !== -1)) {
                    words = words.replace(/,\s*$/, '');
                }
                words += ' ' + andObj['value'];
            }
            switch (extension[i]) {
                case 'jpeg':
                case 'jpg':
                    if (words.indexOf('JPG') === -1) {
                        words += ' JPG,';
                    }
                    break;
                case 'png':
                    words += ' PNG,';
                    break;
                case 'svg':
                    words += ' SVG,';
                    break;
                case 'webp':
                    words += ' WebP,';
                    break;
            }
            if (i === extension.length - 1) {
                words = words.slice(0, -1);
            }
        }
        return words;
    };
    /**
     *
     * This Method will add events to component (element, event, method, current reference)
     *
     * @returns {void}.
     */
    ImageEditor.prototype.wireEvent = function () {
        EventHandler.add(document, 'keydown', this.keyDownEventHandler, this);
        EventHandler.add(document, 'keypress', this.keyUpEventHandler, this);
        EventHandler.add(this.upperCanvas, 'mousedown', this.mouseDownEventHandler, this);
        EventHandler.add(this.upperCanvas, 'mousemove', this.mouseMoveEventHandler, this);
        EventHandler.add(this.upperCanvas, 'mouseup', this.mouseUpEventHandler, this);
        EventHandler.add(document, 'mouseup', this.mouseUpEventHandler, this);
        EventHandler.add(this.lowerCanvas, 'mousedown', this.canvasMouseDownHandler, this);
        EventHandler.add(this.lowerCanvas, 'mousemove', this.canvasMouseMoveHandler, this);
        EventHandler.add(this.lowerCanvas, 'mouseup', this.canvasMouseUpHandler, this);
        EventHandler.add(this.upperCanvas, 'touchstart', this.touchStartHandler, this);
        EventHandler.add(this.lowerCanvas, 'touchstart', this.touchStartHandler, this);
        EventHandler.add(this.lowerCanvas, 'mousewheel DOMMouseScroll', this.handleScroll, this);
        EventHandler.add(this.upperCanvas, 'mousewheel DOMMouseScroll', this.handleScroll, this);
        window.addEventListener('resize', this.windowResizeHandler.bind(this));
        if ((!Browser.isIos && Browser.info.name !== 'safari')) {
            screen.orientation.addEventListener('change', this.screenOrientation.bind(this));
        }
        this.notify('shape', { prop: 'wireEvent', onPropertyChange: false });
    };
    /**
     *
     * This Method will remove events from component
     *
     * @returns {void}.
     */
    ImageEditor.prototype.unwireEvent = function () {
        EventHandler.remove(document, 'keydown', this.keyDownEventHandler);
        EventHandler.remove(document, 'keypress', this.keyUpEventHandler);
        EventHandler.remove(this.upperCanvas, 'mousedown', this.mouseDownEventHandler);
        EventHandler.remove(this.upperCanvas, 'mousemove', this.mouseMoveEventHandler);
        EventHandler.remove(this.upperCanvas, 'mouseup', this.mouseUpEventHandler);
        EventHandler.remove(document, 'mouseup', this.mouseUpEventHandler);
        EventHandler.remove(this.lowerCanvas, 'mousedown', this.canvasMouseDownHandler);
        EventHandler.remove(this.lowerCanvas, 'mousemove', this.canvasMouseMoveHandler);
        EventHandler.remove(this.lowerCanvas, 'mouseup', this.canvasMouseUpHandler);
        EventHandler.remove(this.upperCanvas, 'touchstart', this.touchStartHandler);
        EventHandler.remove(this.lowerCanvas, 'touchstart', this.touchStartHandler);
        EventHandler.remove(this.lowerCanvas, 'mousewheel DOMMouseScroll', this.handleScroll);
        EventHandler.remove(this.upperCanvas, 'mousewheel DOMMouseScroll', this.handleScroll);
        window.removeEventListener('resize', this.windowResizeHandler.bind(this));
        if ((!Browser.isIos && Browser.info.name !== 'safari')) {
            screen.orientation.removeEventListener('change', this.screenOrientation.bind(this));
        }
        this.notify('shape', { prop: 'unWireEvent', onPropertyChange: false });
        this.notify('selection', { prop: 'unWireEvent', onPropertyChange: false });
    };
    ImageEditor.prototype.createCanvas = function () {
        this.element.style.boxSizing = 'border-box';
        var obj = { toolbarHeight: 0 };
        this.notify('toolbar', { prop: 'getToolbarHeight', value: { obj: obj } });
        var height = obj['toolbarHeight'];
        if (this.toolbar && this.toolbar.length > 0 && this.toolbar.indexOf('Open') === -1) {
            height = 0;
        }
        this.element.style.width = this.width;
        this.element.style.height = this.height;
        var canvasWrapperElement = this.createElement('div', { id: this.element.id + '_canvasWrapper', className: 'e-canvas-wrapper' });
        canvasWrapperElement.style.cssText = "height: " + (this.element.offsetHeight - height - 2) + "px; width: " + (this.element.offsetWidth - 2) + "px; position: relative; overflow: hidden; margin: 0 auto;";
        var canvasWrapper = this.element.appendChild(canvasWrapperElement);
        var dragObj = { key: 'DragText' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: dragObj } });
        var dropObj = { key: 'DropText' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: dropObj } });
        var browseObj = { key: 'BrowseText' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: browseObj } });
        var dropAreaElement = this.createElement('div', { id: this.element.id + '_dropArea', className: 'e-ie-drop-area' });
        dropAreaElement.style.position = 'relative';
        var dropIconElement = this.createElement('span', { className: 'e-ie-drop-icon e-icons e-image' });
        dropIconElement.style.position = 'absolute';
        var dropContentElement = this.createElement('span', { className: 'e-ie-drop-content' });
        dropContentElement.style.cssText = 'position: absolute; display: none;';
        dropContentElement.textContent = dragObj['value'] + ' ';
        var minDropContentElem = this.createElement('span', { className: 'e-ie-min-drop-content' });
        minDropContentElem.style.position = 'absolute';
        minDropContentElem.textContent = dropObj['value'] + ' ';
        var dropAnchorElement = this.createElement('a', { id: this.element.id + '_dropBrowse', className: 'e-ie-drop-browse' });
        dropAnchorElement.textContent = browseObj['value'];
        var minDropAnchorElem = this.createElement('a', { id: this.element.id + '_dropBrowse', className: 'e-ie-drop-browse' });
        minDropAnchorElem.textContent = browseObj['value'];
        dropContentElement.appendChild(dropAnchorElement);
        minDropContentElem.appendChild(minDropAnchorElem);
        dropAnchorElement.href = '';
        minDropAnchorElem.href = '';
        var dropInfoElement = this.createElement('span', { className: 'e-ie-drop-info', attrs: { position: 'absolute' } });
        this.updateDropInfoContent(dropInfoElement);
        var dropUploader = dropAreaElement.appendChild(this.createElement('input', {
            id: this.element.id + '_dropfileUpload', className: 'e-fileUpload e-image-upload'
        }));
        dropUploader.setAttribute('type', 'file');
        dropUploader.setAttribute('accept', 'image/*');
        dropAreaElement.appendChild(dropIconElement);
        dropAreaElement.appendChild(dropContentElement);
        dropAreaElement.appendChild(minDropContentElem);
        dropAreaElement.appendChild(dropInfoElement);
        canvasWrapper.appendChild(dropAreaElement);
        this.lowerCanvas = canvasWrapper.appendChild(this.createElement('canvas', {
            id: this.element.id + '_lowerCanvas', attrs: { name: 'canvasImage' }
        }));
        this.maskCanvas = canvasWrapper.appendChild(this.createElement('canvas', {
            id: this.element.id + '_maskCanvas', attrs: { name: 'canvasImage' }
        }));
        this.upperCanvas = canvasWrapper.appendChild(this.createElement('canvas', {
            id: this.element.id + '_upperCanvas', attrs: { name: 'canvasImage' }
        }));
        this.inMemoryCanvas = this.createElement('canvas', {
            id: this.element.id + '_inMemoryCanvas', attrs: { name: 'canvasImage' }
        });
        this.baseImgCanvas = this.createElement('canvas', {
            id: this.element.id + '_baseImgCanvas', attrs: { name: 'canvasImage' }
        });
        this.textArea = canvasWrapper.appendChild(this.createElement('textarea', {
            id: this.element.id + '_textArea', className: 'e-textarea', attrs: { name: 'textArea' }
        }));
        var dialog = this.element.appendChild(this.createElement('div', {
            id: this.element.id + '_dialog', className: 'e-dialog'
        }));
        dialog.style.display = 'none';
        var uploader = this.element.appendChild(this.createElement('input', {
            id: this.element.id + '_fileUpload', className: 'e-fileUpload'
        }));
        uploader.setAttribute('type', 'file');
        uploader.setAttribute('accept', 'image/*');
        uploader.style.display = 'none';
        this.textArea.setAttribute('spellcheck', 'false');
        this.textArea.style.lineHeight = 'normal';
        this.lowerCanvas.style.width = this.upperCanvas.style.width = this.maskCanvas.style.width =
            this.inMemoryCanvas.style.width = '100%';
        this.lowerCanvas.style.height = this.upperCanvas.style.height = this.maskCanvas.style.height =
            this.inMemoryCanvas.style.height = '100%';
        this.upperCanvas.style.position = this.lowerCanvas.style.position = this.maskCanvas.style.position =
            this.textArea.style.position = 'absolute';
        this.textArea.style.backgroundColor = 'transparent';
        this.textArea.style.display = 'none';
        this.maskCanvas.style.display = this.textArea.style.resize = 'none';
        this.lowerContext = this.lowerCanvas.getContext('2d');
        this.baseImg = this.createElement('img', {
            id: this.element.id + '_orgImg', attrs: { name: 'Image', crossorigin: 'anonymous' }
        });
        this.upperCanvas.style.cursor = this.cursor = 'default';
        this.upperCanvas.style.display = 'block';
        this.upperContext = this.upperCanvas.getContext('2d');
        dropAnchorElement.addEventListener('click', function (e) {
            e.preventDefault();
            dropUploader.click();
            return false;
        });
        minDropAnchorElem.addEventListener('click', function (e) {
            e.preventDefault();
            dropUploader.click();
            return false;
        });
    };
    ImageEditor.prototype.touchStartHandler = function (e) {
        this.notify('selection', { prop: 'touchStartHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.mouseDownEventHandler = function (e) {
        if (e.target.className === 'e-ie-drop-browse') {
            return;
        }
        this.notify('selection', { prop: 'mouseDownEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.mouseMoveEventHandler = function (e) {
        this.notify('selection', { prop: 'mouseMoveEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.mouseUpEventHandler = function (e) {
        if (e.target.className === 'e-ie-drop-browse') {
            return;
        }
        this.notify('selection', { prop: 'mouseUpEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.keyDownEventHandler = function (e) {
        this.notify('selection', { prop: 'keyDownEventHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.keyUpEventHandler = function (e) {
        if ((this.textArea.style.display === 'block' || this.textArea.style.display === 'inline-block')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            && e.target.id === this.element.id + '_textArea') {
            this.notify('selection', { prop: 'textKeyDown', value: { e: e } });
        }
    };
    ImageEditor.prototype.canvasMouseDownHandler = function (e) {
        if (e.target.className === 'e-ie-drop-browse') {
            return;
        }
        this.notify('selection', { prop: 'canvasMouseDownHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.canvasMouseMoveHandler = function (e) {
        this.notify('selection', { prop: 'canvasMouseMoveHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.canvasMouseUpHandler = function (e) {
        if (e.target.className === 'e-ie-drop-browse') {
            return;
        }
        this.notify('selection', { prop: 'canvasMouseUpHandler', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.handleScroll = function (e) {
        this.notify('selection', { prop: 'handleScroll', onPropertyChange: false, value: { e: e } });
    };
    ImageEditor.prototype.adjustToScreen = function () {
        this.update();
    };
    ImageEditor.prototype.screenOrientation = function () {
        if (Browser.isDevice) {
            setTimeout(this.adjustToScreen.bind(this), 100);
        }
    };
    ImageEditor.prototype.windowResizeHandler = function () {
        if (!Browser.isDevice && this.element.classList.contains('e-image-editor')) {
            this.adjustToScreen();
        }
    };
    ImageEditor.prototype.notifyResetForAllModules = function () {
        var modules = this.requiredModules();
        for (var i = 0; i < modules.length; i++) {
            var module = modules[i].member;
            this.notify(module === 'toolbar-module' ? 'toolbar' : module, { prop: 'reset', onPropertyChange: false });
        }
    };
    ImageEditor.prototype.allowShape = function (x, y) {
        this.isPublicMethod = true;
        this.applyShapes();
        var obj = { inRange: false };
        this.notify('shape', { prop: 'isPointsInRange', onPropertyChange: false,
            value: { x: x, y: y, obj: obj } });
        return obj['inRange'];
    };
    ImageEditor.prototype.manageActiveAction = function () {
        this.applyShapes();
        if (this.activeObj.shape && this.activeObj.shape.indexOf('crop') > -1) {
            this.discard();
        }
    };
    /**
     * Clears the current selection performed in the image editor.
     *
     * @param { boolean } resetCrop - Specifies to reset last cropped image.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.clearSelection = function (resetCrop) {
        this.notify('selection', { prop: 'clearSelection', onPropertyChange: false, value: { resetCrop: resetCrop } });
    };
    /**
     * Crops an image based on the selection done in the image editor.
     *
     * {% codeBlock src='image-editor/crop/index.md' %}{% endcodeBlock %}
     *
     * @remarks
     * The selection can be done through programmatically using the 'select' method or through UI interactions.
     *
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.crop = function () {
        var obj = { isCrop: false };
        this.notify('crop', { prop: 'crop', onPropertyChange: false, value: { obj: obj } });
        return obj['isCrop'];
    };
    /**
     * Flips an image by horizontally or vertically in the image editor.
     *
     * {% codeBlock src='image-editor/zoom/index.md' %}{% endcodeBlock %}
     *
     * @param { Direction } direction - Specifies the direction to flip the image.
     * A horizontal direction for horizontal flipping and vertical direction for vertical flipping.
     *
     * @remarks
     * It flips the shapes including rectangle, circle, line, text, image, and freehand drawings.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.flip = function (direction) {
        this.applyShapes();
        this.updateImageTransformColl(direction.toLowerCase() + 'flip');
        this.notify('transform', { prop: 'flip', value: { direction: direction } });
        this.notify('draw', { prop: 'redrawDownScale' });
        this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        var actionArgs = { action: 'flip', actionEventArgs: this.editCompleteArgs };
        this.triggerEditCompleteEvent(actionArgs);
    };
    /**
     * Returns an image as ImageData to load it in to a canvas.
     *
     * @param {boolean} [includeAnnotations=true] - Optional. Specifies whether the returned image data should include annotations. The default value is true, meaning annotations are included.
     *
     * @remarks
     * The data returned from this method is directly drawn in a canvas using 'putImageData' method.
     * And then the user can get the base64 string from the canvas using toDataURL method.
     *
     * @returns {ImageData}.
     */
    ImageEditor.prototype.getImageData = function (includeAnnotations) {
        includeAnnotations = isNullOrUndefined(includeAnnotations) ? true : includeAnnotations;
        var imageData;
        if (includeAnnotations) {
            var obj = { canvas: null };
            this.applyShapes();
            this.notify('export', { prop: 'exportToCanvas', value: { object: obj } });
            imageData = obj['canvas'].getContext('2d').getImageData(0, 0, obj['canvas'].width, obj['canvas'].height);
        }
        else if (this.isMaskImage && this.element.getAttribute('data-value') === 'mask-drawing') {
            imageData = this.getData(true);
            this.updateColl('reset');
        }
        else {
            imageData = this.getData();
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
        }
        return imageData;
    };
    /**
     *  Opens an image as URL or ImageData for editing in an image editor.
     *
     * @param {string | ImageData } data - Specifies url of the image or image data.
     * @param {boolean} [resetChanges=true] - Optional. Determines whether to reset existing changes when opening the image. The default value is true, which resets all existing changes.
     * @param {ImageSettings} imageSettings - Optional. Specifies the image setting that contains background color to apply when opening a transparent image. The default value of background color is an empty string (''), meaning no background color is applied by default when a transparent image is opened.
     *
     * @remarks
     * The supported file types are JPG, JPEG, PNG, and SVG.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.open = function (data, resetChanges, imageSettings) {
        resetChanges = isNullOrUndefined(resetChanges) ? true : resetChanges;
        if (resetChanges) {
            if (isNullOrUndefined(data)) {
                return;
            }
            var dropArea = document.getElementById(this.element.id + '_dropArea');
            if (dropArea) {
                dropArea.style.display = 'none';
            }
            this.notify('draw', { prop: 'open', value: { data: data } });
        }
        else {
            this.updateImage(data, imageSettings ? imageSettings.backgroundColor : null);
        }
    };
    /**
     * Reset all the changes done in an image editor and revert to original image.
     *
     * @remarks
     * The undo redo collection also cleared while resetting the image editor.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.reset = function () {
        this.updateColl('reset');
        var obj = { isErrorImage: false };
        this.notify('draw', { prop: 'getErrorImage', value: { obj: obj } });
        if (!this.disabled && !obj['isErrorImage']) {
            this.clearContext(this.inMemoryContext);
            this.clearContext(this.lowerContext);
            this.clearContext(this.upperContext);
            this.notify('shape', { prop: 'setRedactType', onPropertyChange: false, value: { redactType: 'blur' } });
            this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                    isApplyBtn: false, isCropping: false, isZooming: null, cType: null } });
            if (Browser.isDevice && document.getElementById(this.element.id + '_bottomToolbar')) {
                getComponent(document.getElementById(this.element.id + '_bottomToolbar'), 'toolbar').destroy();
                this.notify('toolbar', { prop: 'create-bottom-toolbar', onPropertyChange: false });
            }
            var isImageLoaded = this.isImageLoaded;
            this.currObjType.isUndoAction = this.isUndoRedo = this.togglePan = this.togglePen = this.isImageLoaded = this.isFinetuning = false;
            this.isCircleCrop = this.isCropTab = false;
            this.objColl = [];
            this.transform.degree = 0;
            this.upperCanvas.style.display = 'block';
            this.transform.currFlipState = '';
            this.allowDownScale = true;
            this.upperCanvas.style.cursor = this.cursor = this.lowerCanvas.style.cursor = 'default';
            this.lowerContext.lineWidth = this.upperContext.lineWidth = undefined;
            this.frameDestPoints = null;
            this.textArea.value = this.textArea.textContent = '';
            this.textArea.style.display = 'none';
            this.lowerContext.filter = this.canvasFilter = this.getDefaultFilter();
            this.img.destLeft = this.img.destTop = this.img.srcLeft = this.img.srcTop = 0;
            this.img.destWidth = this.img.destHeight = this.img.srcWidth = this.img.srcHeight = null;
            this.currSelectionPoint = null;
            this.panPoint.currentPannedPoint = { x: 0, y: 0 };
            this.rotateFlipColl = [];
            this.points = [];
            this.pointColl = {};
            this.freehandCounter = 0;
            this.notify('draw', { prop: 'resetPanPoints' });
            this.lowerCanvas.style.left = this.upperCanvas.style.left = '';
            this.fontSizeColl = [];
            this.lowerCanvas.style.top = this.upperCanvas.style.top = '';
            this.lowerCanvas.style.maxWidth = this.upperCanvas.style.maxWidth = '';
            this.lowerCanvas.style.maxHeight = this.upperCanvas.style.maxHeight = '';
            this.transform.defaultZoomFactor = this.transform.zoomFactor = 0;
            this.transform.cropZoomFactor = null;
            this.frameObj = { type: 'none', color: '#fff', size: 20, inset: 20, offset: 20, radius: 0, amount: 1, border: 'solid', gradientColor: '' };
            this.tempFrameObj = { type: 'none', color: '#fff', size: 20, inset: 20, offset: 20, radius: 0, amount: 1, border: 'solid', gradientColor: '' };
            this.currObjType = { shape: '', isDragging: false, isActiveObj: false, isText: false, isInitialText: false, isLine: false,
                isInitialLine: false, isCustomCrop: false, isZoomed: false, isUndoZoom: false,
                isUndoAction: false, isFiltered: false, isSave: false, isResize: false, isRedact: false };
            this.cropObj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
                totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {},
                rotateFlipColl: [], degree: 0, currFlipState: '', straighten: 0, zoomFactor: 0, previousZoomValue: 0,
                destPoints: { startX: 0, startY: 0, width: 0, height: 0 }, frame: 'none',
                srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: false,
                aspectWidth: null, aspectHeight: null, straightenZoom: 0,
                adjustmentLevel: { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
                    exposure: 0, transparency: 100, sharpen: false, bw: false }, currentFilter: '' };
            this.afterCropActions = [];
            this.currentFilter = '';
            this.tempFrameZoomLevel = null;
            this.cxtTbarHeight = null;
            this.straightenPoint = null;
            this.transform.straighten = 0;
            this.cancelCropSelection = null;
            this.aspectWidth = this.aspectHeight = null;
            this.isResize = this.isMaskImage = false;
            this.drawingShape = null;
            this.isShapeDrawing = this.noPushUndo = this.isUndoRedoStack = this.isKBDNavigation = false;
            this.shapeColl = [];
            this.tempObjColl = [];
            this.tempPointColl = [];
            this.tempShapeColl = [];
            this.isImageUpdated = false;
            this.tempToolbarHeight = 0;
            this.tempToolbar = [];
            this.tempRedactBlur = 50;
            this.tempRedactPixel = 40;
            var obj_1 = { initialZoomValue: false };
            this.editCompleteArgs = null;
            this.isFinetuneBtnClick = false;
            this.notify('draw', { prop: 'getInitialZoomValue', onPropertyChange: false, value: { obj: obj_1 } });
            if (obj_1['initialZoomValue']) {
                this.setProperties({ zoomSettings: { zoomFactor: obj_1['initialZoomValue'] } }, true);
            }
            var qtArea = document.getElementById(this.element.id + '_quickAccessToolbarArea');
            if (qtArea) {
                qtArea.style.display = 'none';
            }
            this.notifyResetForAllModules();
            this.notify('filter', { prop: 'update-finetunes' });
            if (this.toolbarTemplate) {
                this.toolbarHeight = this.element.querySelector('#' + this.element.id + '_toolbarArea').clientHeight;
            }
            else if (this.element.querySelector('#' + this.element.id + '_toolbar')) {
                this.toolbarHeight = this.element.querySelector('#' + this.element.id + '_toolbar').clientHeight;
            }
            this.notify('toolbar', { prop: 'setToolbarHeight', value: { height: this.toolbarHeight } });
            this.isImageLoaded = isImageLoaded;
            this.straightenBaseImageCanvas();
            this.isImageLoaded = false;
            this.notify('draw', { prop: 'update-canvas', onPropertyChange: false });
            this.isImageLoaded = isImageLoaded;
            this.prevStraightenedDegree = 0;
            var ctWrapper = this.element.querySelector('.e-contextual-toolbar-wrapper');
            if (ctWrapper) {
                ctWrapper.classList.add('e-hide');
            }
            this.notify('toolbar', { prop: 'refresh-dropdown-btn', value: { isDisabled: false } });
            this.notify('toolbar', { prop: 'enable-disable-btns' });
            var straightenObj = { bool: this.isStraightening };
            if (Browser.isDevice && straightenObj['bool']) {
                this.notify('crop', { prop: 'resizeWrapper' });
            }
            var saveDialog = this.element.querySelector('#' + this.element.id + '_saveDialog');
            if (saveDialog) {
                getComponent(saveDialog, 'dialog').close();
            }
            var actionArgs = { action: 'reset', actionEventArgs: null };
            this.triggerEditCompleteEvent(actionArgs);
        }
    };
    /**
     * Rotate an image to clockwise and anti-clockwise.
     *
     * {% codeBlock src='image-editor/rotate/index.md' %}{% endcodeBlock %}
     *
     * @param {number} degree - Specifies a degree to rotate an image.
     * A positive integer value for clockwise and negative integer value for anti-clockwise rotation.
     *
     * @remarks
     * It rotated the shapes including rectangle, circle, line, text, image, and freehand drawings.
     *
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.rotate = function (degree) {
        var obj = { isRotate: false };
        this.applyShapes();
        if (degree === 90 || degree === -90) {
            this.updateImageTransformColl(degree === 90 ? 'rotateright' : 'rotateleft');
        }
        this.notify('transform', { prop: 'rotate', value: { degree: degree, obj: obj } });
        this.notify('draw', { prop: 'redrawDownScale' });
        var actionArgs = { action: 'rotate', actionEventArgs: this.editCompleteArgs };
        this.triggerEditCompleteEvent(actionArgs);
        return obj['isRotate'];
    };
    /**
     * Export an image using the specified file name and the extension.
     *
     * @param {string} type - Specifies a format of image to be saved.
     * @param {string} fileName – Specifies a file name to be saved
     * @param {number} imageQuality – Specifies the quality of an image to be saved. The default value is “1” which represents the original size of the image if not specified.
     *
     * @remarks
     * The supported file types are JPG, JPEG, PNG, and SVG.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.export = function (type, fileName, imageQuality) {
        this.applyShapes();
        this.notify('export', { prop: 'export', onPropertyChange: false, value: { type: type, fileName: fileName, imgQuality: imageQuality } });
    };
    /**
     * Perform selection in an image editor. The selection helps to crop an image.
     *
     * {% codeBlock src='image-editor/select/index.md' %}{% endcodeBlock %}
     *
     * @param {string} type - Specifies the shape - circle / square / custom selection / pre-defined ratios.
     * @param {number} startX – Specifies the start x-coordinate point of the selection.
     * @param {number} startY – Specifies the start y-coordinate point of the selection.
     * @param {number} width - Specifies the width of the selection area.
     * @param {number} height - Specifies the height of the selection area.
     *
     * @remarks
     * The selection UI is based on the 'theme' property.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.select = function (type, startX, startY, width, height) {
        this.applyShapes();
        this.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: 'crop-' + type } });
        this.notify('draw', { prop: 'select', onPropertyChange: false,
            value: { type: type, startX: startX, startY: startY, width: width, height: height } });
        if ((startX && startY) || (width && height)) {
            this.notify('draw', { prop: 'select', onPropertyChange: false,
                value: { type: type, startX: startX, startY: startY, width: width, height: height } });
        }
        else {
            this.cropObj = { cropZoom: 0, defaultZoom: 0, totalPannedPoint: { x: 0, y: 0 }, totalPannedClientPoint: { x: 0, y: 0 },
                totalPannedInternalPoint: { x: 0, y: 0 }, tempFlipPanPoint: { x: 0, y: 0 }, activeObj: {},
                rotateFlipColl: [], degree: 0, currFlipState: '', straighten: 0, zoomFactor: 0, previousZoomValue: 0,
                destPoints: { startX: 0, startY: 0, width: 0, height: 0 }, frame: 'none',
                srcPoints: { startX: 0, startY: 0, width: 0, height: 0 }, filter: '', isBrightAdjust: false,
                aspectWidth: null, aspectHeight: null, straightenZoom: 0,
                adjustmentLevel: { brightness: 0, contrast: 0, hue: 0, opacity: 100, saturation: 0, blur: 0,
                    exposure: 0, transparency: 100, sharpen: false, bw: false }, currentFilter: '' };
        }
    };
    /**
     * Enable or disable a freehand drawing option in an Image Editor.
     *
     * @param {boolean} value - Specifies a value whether to enable or disable freehand drawing.
     *
     * @returns {void}.
     * @private
     */
    ImageEditor.prototype.freeHandDraw = function (value) {
        this.notify('freehand-draw', { prop: 'freeHandDraw', onPropertyChange: false, value: { value: value } });
    };
    /**
     * Enable or disable a freehand drawing in an Image Editor.
     *
     * @param {boolean} value - Specifies a value whether to enable or disable freehand drawing.
     *
     * @remarks
     * User can directly drawing on a canvas after enabling this option.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.freehandDraw = function (value) {
        if (!this.disabled && this.isImageLoaded) {
            if (!value && this.isMaskImage) {
                this.discard();
                return;
            }
            this.manageActiveAction();
            this.freeHandDraw(value);
            var prevObj = { shapeSettingsObj: {} };
            this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: prevObj } });
            var shapeSettings = prevObj['shapeSettingsObj'];
            shapeSettings.type = ShapeType.FreehandDraw;
            var shapeChangingArgs = { cancel: false, action: 'insert', previousShapeSettings: shapeSettings,
                currentShapeSettings: shapeSettings };
            this.notify('freehand-draw', { prop: 'triggerShapeChanging', value: { shapeChangingArgs: shapeChangingArgs } });
        }
    };
    /**
     * Enable or disable a panning on the Image Editor.
     *
     * @param {boolean} value - Specifies a value whether enable or disable panning.
     * @param {number} x - Optional, Specifies a value to pan the image horizontally.
     * @param {number} y - Optional, Specifies a value to pan the image vertically.
     *
     * @remarks
     * This option will take into effect once the image's visibility is hidden when zooming an image or selection has been performed.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.pan = function (value, x, y) {
        this.applyShapes();
        this.notify('transform', { prop: 'pan', onPropertyChange: false, value: { value: value, x: x, y: y } });
    };
    /**
     * Zoom in or out on a point in the image editor.
     *
     * @param {number} zoomFactor - The percentage-based zoom factor to use (e.g. 20 for 2x zoom).
     * @param {Point} zoomPoint - The point in the image editor to zoom in/out on.
     *
     * @remarks
     * Zooming directly enables the panning option when the image's visibility is hidden.
     * User can disable it by using 'Pan' method.
     * @returns {void}
     *
     */
    ImageEditor.prototype.zoom = function (zoomFactor, zoomPoint) {
        this.isZoomBtnClick = true;
        this.notify('transform', { prop: 'zoom', onPropertyChange: false,
            value: { zoomFactor: zoomFactor, zoomPoint: zoomPoint } });
        this.notify('draw', { prop: 'redrawDownScale' });
    };
    /**
     * Draw ellipse on an image.
     *
     * {% codeBlock src='image-editor/ellipse/index.md' %}{% endcodeBlock %}
     *
     * @param {number} x - Specifies x-coordinate of ellipse.
     * @param {number} y - Specifies y-coordinate of ellipse.
     * @param {number} radiusX - Specifies the radius x point for the ellipse.
     * @param {number} radiusY - Specifies the radius y point for the ellipse.
     * @param {number} strokeWidth - Specifies the stroke width of ellipse.
     * @param {string} strokeColor - Specifies the stroke color of ellipse.
     * @param {string} fillColor - Specifies the fill color of the ellipse.
     * @param {number} degree - Specifies the degree to rotate the ellipse.
     * @param {boolean} isSelected - Specifies to show the ellipse in the selected state.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.drawEllipse = function (x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor, degree, isSelected) {
        var isEllipse = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isEllipse = true;
            this.manageActiveAction();
            this.notify('shape', { prop: 'drawEllipse', onPropertyChange: false, value: { x: x, y: y, radiusX: radiusX, radiusY: radiusY,
                    strokeWidth: strokeWidth, strokeColor: strokeColor, fillColor: fillColor, degree: degree, isSelected: isSelected } });
            this.editCompleted();
        }
        return isEllipse;
    };
    /**
     * Draw line on an image.
     *
     * @param {number} startX – Specifies start point x-coordinate of line.
     * @param {number} startY – Specifies start point y-coordinate of line.
     * @param {number} endX - Specifies end point x-coordinates of line.
     * @param {number} endY - Specifies end point y-coordinates of the line.
     * @param {number} strokeWidth - Specifies the stroke width of line.
     * @param {string} strokeColor - Specifies the stroke color of line.
     * @param {boolean} isSelected - Specifies to show the line in the selected state.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawLine = function (startX, startY, endX, endY, strokeWidth, strokeColor, isSelected) {
        var isLine = false;
        var isPointsInRange = this.allowShape(startX, startY);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(startX) && isNullOrUndefined(startY)))) {
            isLine = true;
            this.manageActiveAction();
            this.notify('shape', { prop: 'drawLine', onPropertyChange: false, value: { startX: startX, startY: startY, endX: endX,
                    endY: endY, strokeWidth: strokeWidth, strokeColor: strokeColor, isSelected: isSelected } });
            this.editCompleted();
        }
        return isLine;
    };
    /**
     * Draw arrow on an image.
     *
     * @param {number} startX – Specifies start point x-coordinate of arrow.
     * @param {number} startY – Specifies start point y-coordinate of arrow.
     * @param {number} endX - Specifies end point x-coordinates of arrow.
     * @param {number} endY - Specifies end point y-coordinates of the arrow.
     * @param {number} strokeWidth - Specifies the stroke width of arrow.
     * @param {string} strokeColor - Specifies the stroke color of arrow.
     * @param {ArrowheadType} arrowStart – Specifies the type of arrowhead for start position. The default value is ‘None’.
     * @param {ArrowheadType} arrowEnd – Specifies the type of arrowhead for end position. The default value is ‘SolidArrow’.
     * @param {boolean} isSelected - Specifies to show the arrow in the selected state.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawArrow = function (startX, startY, endX, endY, strokeWidth, strokeColor, arrowStart, arrowEnd, isSelected) {
        var isArrow = false;
        var isPointsInRange = this.allowShape(startX, startY);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(startX) && isNullOrUndefined(startY)))) {
            isArrow = true;
            this.manageActiveAction();
            this.notify('shape', { prop: 'drawArrow', onPropertyChange: false, value: { startX: startX, startY: startY, endX: endX,
                    endY: endY, strokeWidth: strokeWidth, strokeColor: strokeColor, arrowStart: arrowStart, arrowEnd: arrowEnd,
                    isSelected: isSelected } });
            this.editCompleted();
        }
        return isArrow;
    };
    /**
     * Draw path on an image.
     *
     * @param {Point[]} pointColl – Specifies collection of start and end x, y-coordinates of path.
     * @param {number} strokeWidth - Specifies the stroke width of path.
     * @param {string} strokeColor - Specifies the stroke color of path.
     * @param {boolean} isSelected - Specifies to show the path in the selected state.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawPath = function (pointColl, strokeWidth, strokeColor, isSelected) {
        this.isPublicMethod = true;
        var obj = { inRange: false };
        var isPath = false;
        if (pointColl && pointColl.length > 0) {
            for (var i = 0; i < pointColl.length; i++) {
                if (obj['inRange']) {
                    break;
                }
                this.notify('shape', { prop: 'isPointsInRange', onPropertyChange: false,
                    value: { x: pointColl[i].x, y: pointColl[i].y, obj: obj } });
            }
        }
        if (!this.disabled && this.isImageLoaded && (obj['inRange'] || isNullOrUndefined(pointColl))) {
            isPath = true;
            this.manageActiveAction();
            this.notify('shape', { prop: 'drawPath', onPropertyChange: false, value: { pointColl: pointColl,
                    strokeWidth: strokeWidth, strokeColor: strokeColor, isSelected: isSelected } });
            this.editCompleted();
        }
        return isPath;
    };
    /**
     * Draw a rectangle on an image.
     *
     * @param {number} x - Specifies x-coordinate of rectangle.
     * @param {number} y - Specifies y-coordinate of rectangle.
     * @param {number} width - Specifies the width of the rectangle.
     * @param {number} height - Specifies the height of the rectangle.
     * @param {number} strokeWidth - Specifies the stroke width of rectangle.
     * @param {string} strokeColor - Specifies the stroke color of rectangle.
     * @param {string} fillColor - Specifies the fill color of the rectangle.
     * @param {number} degree - Specifies the degree to rotate the rectangle.
     * @param {boolean} isSelected - Specifies to show the rectangle in the selected state.
     * @param {number} borderRadius - Specifies the radius to apply border radius to rectangle.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawRectangle = function (x, y, width, height, strokeWidth, strokeColor, fillColor, degree, isSelected, borderRadius) {
        var isRectangle = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isRectangle = true;
            this.manageActiveAction();
            this.notify('shape', { prop: 'drawRectangle', onPropertyChange: false, value: { x: x, y: y, width: width, height: height,
                    strokeWidth: strokeWidth, strokeColor: strokeColor, fillColor: fillColor, degree: degree, isSelected: isSelected,
                    radius: borderRadius } });
            this.editCompleted();
        }
        return isRectangle;
    };
    /**
     * Draw a text on an image.
     *
     * {% codeBlock src='image-editor/text/index.md' %}{% endcodeBlock %}
     *
     * @param {number} x - Specifies x-coordinate of text.
     * @param {number} y - Specifies y-coordinate of text.
     * @param {string} text - Specifies the text to add on an image.
     * @param {string} fontFamily - Specifies the font family of the text.
     * @param {number} fontSize - Specifies the font size of the text.
     * @param {boolean} bold - Specifies whether the text is bold or not.
     * @param {boolean} italic - Specifies whether the text is italic or not.
     * @param {string} color - Specifies font color of the text.
     * @param {boolean} isSelected - Specifies to show the text in the selected state.
     * @param {number} degree - Specifies the degree to rotate the text.
     * @param {fillColor} fillColor - Specifies the background Color of the text.
     * @param {string} strokeColor - Specifies the outline color of the text annotation.
     * @param {number} strokeWidth - Specifies the outline stroke width of the text annotation.
     * @param {TransformationCollection[]} transformCollection - Specifies the transform collection of the text annotation.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.drawText = function (x, y, text, fontFamily, fontSize, bold, italic, color, isSelected, degree, fillColor, strokeColor, strokeWidth, transformCollection) {
        var isText = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isText = true;
            this.manageActiveAction();
            this.notify('shape', { prop: 'drawText', onPropertyChange: false, value: { x: x, y: y, text: text, fontFamily: fontFamily,
                    fontSize: fontSize, bold: bold, italic: italic, color: color, isSelected: isSelected, degree: degree, fillColor: fillColor,
                    outlineColor: strokeColor, outlineWidth: strokeWidth, transformCollection: transformCollection } });
            this.editCompleted();
        }
        return isText;
    };
    /**
     * Draw an image as annotation on an image.
     *
     *
     * @param {string | ImageData} data - Specifies url of the image or image data.
     * @param {number} x - Specifies x-coordinate of a starting point for an image.
     * @param {number} y - Specifies y-coordinate of a starting point for an image.
     * @param {number} width - Specifies the width of the image.
     * @param {number} height - Specifies the height of the image.
     * @param {boolean} isAspectRatio - Specifies whether to maintain aspect ratio or not.
     * @param {number} degree - Specifies the degree to rotate the image.
     * @param {number} opacity - Specifies the value for the image.
     * @param {boolean} isSelected - Specifies to show the image in the selected state.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.drawImage = function (data, x, y, width, height, isAspectRatio, degree, opacity, isSelected) {
        var isImage = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            this.manageActiveAction();
            var length_1 = this.objColl.length;
            this.notify('shape', { prop: 'drawImage', onPropertyChange: false, value: { x: x, y: y, width: width, height: height,
                    src: data, degree: degree, isAspectRatio: isAspectRatio, opacity: opacity, isSelected: isSelected } });
            this.editCompleted();
            if (this.objColl.length > length_1) {
                isImage = true;
            }
        }
        return isImage;
    };
    /**
     * This method is used to update the existing shapes by changing its height, width, color, and font styles in the component.
     * Use 'getShapeSettings' method to get the shape which is then passed to change the options of a shape.
     * {% codeBlock src='image-editor/updateShape/index.md' %}{% endcodeBlock %}
     *
     * @param {ShapeSettings} setting - Specifies the shape settings to be updated for the shape on an image.
     * @param {boolean} isSelected - Specifies to show the shape in the selected state.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.updateShape = function (setting, isSelected) {
        var obj = { isSelected: false };
        var isTextArea = false;
        var freehandObj = { bool: false };
        if (isNullOrUndefined(setting.id)) {
            if (setting.strokeColor) {
                this.activeObj.strokeSettings.strokeColor = setting.strokeColor;
            }
            if (setting.fillColor) {
                this.activeObj.strokeSettings.fillColor = setting.fillColor;
            }
            if (setting.strokeWidth) {
                this.activeObj.strokeSettings.strokeWidth = setting.strokeWidth;
            }
            if (setting.index) {
                this.activeObj.order = setting.index;
            }
            if (setting.type === 'FreehandDraw' && setting.strokeWidth) {
                this.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: setting.strokeWidth } });
            }
        }
        else {
            if (setting.type.toLowerCase() === 'text' && (this.textArea.style.display === 'block' ||
                this.textArea.style.display === 'inline-block')) {
                this.okBtn(null, true);
                isTextArea = true;
            }
            this.notify('shape', { prop: 'selectShape', onPropertyChange: false, value: { id: setting.id, obj: obj, isShape: true } });
            this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: freehandObj } });
            if (obj['isSelected']) {
                var tempFontSize = this.activeObj.textSettings.fontSize;
                this.notify('shape', { prop: 'updateShapeChangeEventArgs', onPropertyChange: false,
                    value: { shapeSettings: setting } });
                if (this.activeObj.shape === 'text' && tempFontSize) {
                    var diff = this.activeObj.textSettings.fontSize - tempFontSize;
                    if (diff !== 0) {
                        this.activeObj.activePoint.height += diff;
                        this.activeObj.activePoint.startY -= (diff / 2);
                        this.activeObj.activePoint.endY += (diff / 2);
                        this.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: this.activeObj.activePoint, obj: this.activeObj,
                                isMouseMove: null, x: null, y: null } });
                    }
                }
                var activeObj = extend({}, this.activeObj, {}, true);
                this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: null } });
                this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
                if (activeObj.shape) {
                    this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj } });
                }
                if (this.activeObj.shape === 'text') {
                    this.notify('toolbar', { prop: 'editText', onPropertyChange: false });
                }
                if (freehandObj['bool']) {
                    this.notify('undo-redo', { prop: 'setPreventUR', value: { bool: true } });
                }
                this.okBtn(isSelected, true);
                if (freehandObj['bool']) {
                    this.notify('undo-redo', { prop: 'setPreventUR', value: { bool: false } });
                }
                this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
                this.editCompleteArgs = { action: 'shape-update', currentShapeSettings: setting };
                this.editCompleted('shape-customize');
                if (isTextArea) {
                    this.enableTextEditing();
                }
                if (isSelected) {
                    this.noRedact = true;
                    this.selectShape(setting.id);
                }
            }
        }
        return obj['isSelected'];
    };
    /**
     * Select a shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform selection.
     *
     * {% codeBlock src='image-editor/selectShape/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id to select a shape on an image.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.selectShape = function (id) {
        this.applyShapes();
        var obj = { isSelected: false };
        this.notify('shape', { prop: 'selectShape', onPropertyChange: false, value: { id: id, obj: obj, isShape: true } });
        this.editCompleted('shape-select');
        this.noRedact = false;
        return obj['isSelected'];
    };
    /**
     * Deletes a shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform selection.
     *
     * {% codeBlock src='image-editor/deleteShape/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id to delete the shape on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.deleteShape = function (id) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var shape = this.getShapeSetting(id);
        if (shape.type === 'Redact') {
            return;
        }
        this.applyShapes();
        this.notify('shape', { prop: 'deleteShape', onPropertyChange: false, value: { id: id, isShape: true } });
        this.editCompleted('shape-delete');
    };
    /**
     * Get particular shapes details based on id of the shape which is drawn on an image editor.
     *
     * {% codeBlock src='image-editor/getShapeSetting/index.md' %}{% endcodeBlock %}
     *
     * @param {string} id - Specifies the shape id on an image.
     * @returns {ShapeSettings}.
     *
     */
    ImageEditor.prototype.getShapeSetting = function (id) {
        this.applyShapes();
        var obj = { shapeDetails: null };
        this.notify('shape', { prop: 'getShapeSetting', onPropertyChange: false,
            value: { id: id, obj: obj } });
        this.notify('draw', { prop: 'redrawDownScale' });
        var shapeDetails = obj['shapeDetails'] ? obj['shapeDetails'] : {};
        return shapeDetails;
    };
    /**
     * Get all the shapes details which is drawn on an image editor.
     *
     * @returns {ShapeSettings[]}.
     */
    ImageEditor.prototype.getShapeSettings = function () {
        this.applyShapes();
        var obj = { shapeDetailsColl: [] };
        this.notify('shape', { prop: 'getShapeSettings', onPropertyChange: false, value: { obj: obj } });
        this.notify('draw', { prop: 'redrawDownScale' });
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        return obj.shapeDetailsColl.filter(function (item) { return item.type !== 'redact'; });
    };
    /**
     * Get all the shapes details which is drawn on an image editor.
     *
     * @returns {RedactSettings[]}.
     */
    ImageEditor.prototype.getRedacts = function () {
        this.applyShapes();
        var obj = { shapeDetailsColl: [] };
        this.notify('shape', { prop: 'getRedactSettings', onPropertyChange: false, value: { obj: obj } });
        this.notify('draw', { prop: 'redrawDownScale' });
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        return obj.shapeDetailsColl.filter(function (item) { return item.type !== 'redact'; });
    };
    /**
     * Select a redaction based on the given redaction id.
     * Use 'getRedacts' method to get the shape id which is then passed to perform selection.
     *
     *
     * @param {string} id - Specifies the shape id to select a redact on an image.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.selectRedact = function (id) {
        this.applyShapes();
        var obj = { isSelected: false };
        this.notify('shape', { prop: 'selectShape', onPropertyChange: false, value: { id: id, obj: obj, isRedact: true } });
        this.editCompleted('redact-select');
        this.noRedact = false;
        return obj['isSelected'];
    };
    /**
     * Deletes a redaction based on the given shape id.
     * Use 'getRedacts' method to get the redaaction id which is then passed to perform deletion.
     *
     *
     * @param {string} id - Specifies the redaction id to delete the redaction on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.deleteRedact = function (id) {
        this.applyShapes();
        this.notify('shape', { prop: 'deleteShape', onPropertyChange: false, value: { id: id, isRedact: true } });
        this.editCompleted('redact-delete');
    };
    /**
     * This method is used to update the existing redacts by changing its height, width, blur, and pixel size in the component.
     * Use 'getRedacts' method to get the redacts which is then passed to change the options of a redacts.
     *
     * @param {RedactSettings} setting - Specifies the redact settings to be updated for the shape on an image.
     * @param {boolean} isSelected - Specifies to show the redacts in the selected state.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.updateRedact = function (setting, isSelected) {
        this.applyShapes();
        var obj = { isSelected: false };
        this.notify('shape', { prop: 'selectShape', onPropertyChange: false, value: { id: setting.id, obj: obj, isRedact: true } });
        if (obj['isSelected']) {
            this.notify('shape', { prop: 'updateShapeChangeEventArgs', onPropertyChange: false,
                value: { shapeSettings: setting } });
            if (setting.blurIntensity) {
                this.activeObj.redactBlur = setting.blurIntensity;
            }
            if (setting.pixelSize) {
                this.activeObj.redactPixelate = setting.pixelSize;
            }
            this.activeObj.redactType = setting.type.toLowerCase() === 'blur' ? 'blur' : 'pixelate';
            var activeObj = extend({}, this.activeObj, {}, true);
            this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: null } });
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            if (activeObj.shape) {
                this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj } });
            }
            this.okBtn(isSelected, true);
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            this.editCompleteArgs = { action: 'redact-update', currentShapeSettings: setting };
            this.editCompleted('redact-customize');
            if (isSelected) {
                this.selectRedact(setting.id);
            }
        }
        return obj['isSelected'];
    };
    /**
     * To refresh the Canvas Wrapper.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.update = function () {
        this.notify('transform', { prop: 'update' });
    };
    /**
     * Finetuning an image with the given type of finetune and its value in the image editor.
     *
     * @param {ImageFinetuneOption } finetuneOption - Specifies the finetune options to be performed in the image.
     * @param {number } value - Specifies the value for finetuning the image.
     *
     * @remarks
     * The finetuning will not affect the shapes background and border color.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.finetuneImage = function (finetuneOption, value) {
        if (!this.disabled && this.isImageLoaded) {
            this.manageActiveAction();
            this.notify('filter', { prop: 'finetuneImage', value: { value: value, option: finetuneOption } });
            this.editCompleteArgs = { finetune: finetuneOption, value: value };
            this.editCompleted('fine-tune');
        }
    };
    /**
     * Filtering an image with the given type of filters.
     *
     * @param {ImageFilterOption } filterOption - Specifies the filter options to the image.
     *
     * @remarks
     * The filtering will not affect the shape's background and border color.
     * @returns {void}.
     */
    ImageEditor.prototype.applyImageFilter = function (filterOption) {
        if (!this.disabled && this.isImageLoaded) {
            this.manageActiveAction();
            this.notify('filter', { prop: 'applyImageFilter', value: { option: filterOption.toString() } });
            this.editCompleteArgs = { filter: filterOption };
            this.editCompleted('filter');
            this.canvasFilter = this.lowerContext.filter;
            this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        }
    };
    /**
     * Reverse the last action which performed by the user in the Image Editor.
     *
     * @remarks
     * This method will take into effect once the 'allowUndoRedo' property is enabled.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.undo = function () {
        this.manageActiveAction();
        this.notify('undo-redo', { prop: 'undo', onPropertyChange: false });
        this.notify('draw', { prop: 'redrawDownScale' });
    };
    /**
     * Redo the last user action that was undone by the user or `undo` method.
     *
     * @remarks
     * This method will take into effect once the 'allowUndoRedo' property is enabled.
     * @returns {void}.
     */
    ImageEditor.prototype.redo = function () {
        this.manageActiveAction();
        this.notify('undo-redo', { prop: 'redo', onPropertyChange: false });
        this.notify('draw', { prop: 'redrawDownScale' });
    };
    /**
     * Get the dimension of an image in the image editor such as x, y, width, and height.
     * The method helps to get dimension after cropped an image.
     *
     * @returns {Dimension}.
     * A Dimension object containing the x, y, width, and height of an image.
     */
    ImageEditor.prototype.getImageDimension = function () {
        return { x: this.img.destLeft, y: this.img.destTop, width: this.img.destWidth, height: this.img.destHeight };
    };
    /**
     * Resize an image by changing its width and height.
     *
     * @param {number} width - Specifies the width of an image.
     * @param {number} height - Specifies the height of an image.
     * @param {boolean} isAspectRatio - Specifies whether the scaling option is enabled or not.
     *
     * @returns {boolean} - A boolean value indicating the success of the resizing operation.
     */
    ImageEditor.prototype.resize = function (width, height, isAspectRatio) {
        var isResized = false;
        if (((width.toString()).length <= 4 && (height.toString()).length <= 4) && (!this.isCircleCrop || isAspectRatio)) {
            this.manageActiveAction();
            this.notify('toolbar', { prop: 'resizeClick', value: { bool: false } });
            var destPoints = { startX: this.img.destLeft, startY: this.img.destTop, width: this.img.destWidth,
                height: this.img.destHeight };
            if (isAspectRatio) {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: false, isCropping: false } });
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: false, isCropping: false } });
            }
            else {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'resize',
                        isApplyBtn: false, isCropping: false } });
            }
            var aspectRatioWidth = this.element.querySelector('#' + this.element.id + '_resizeWidth');
            var aspectRatioHeight = this.element.querySelector('#' + this.element.id + '_resizeHeight');
            if (aspectRatioWidth && aspectRatioHeight) {
                getComponent(aspectRatioWidth, 'numerictextbox').value = Math.floor(width);
                aspectRatioWidth.value = Math.floor(width).toString() + ' px';
                getComponent(aspectRatioHeight, 'numerictextbox').value = Math.floor(height);
                aspectRatioHeight.value = Math.floor(height).toString() + ' px';
            }
            this.notify('transform', { prop: 'resize', value: { width: width, height: height, isAspectRatio: isAspectRatio } });
            if (destPoints.startX !== this.img.destLeft || destPoints.startY !== this.img.destTop ||
                destPoints.width !== this.img.destWidth || destPoints.height !== this.img.destHeight) {
                isResized = true;
                this.aspectWidth = width;
                this.aspectHeight = height;
                if (isAspectRatio) {
                    this.aspectHeight = null;
                }
                this.okBtn(false, false, true);
            }
            else {
                this.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null } });
            }
            this.notify('draw', { prop: 'redrawDownScale' });
        }
        return isResized;
    };
    /**
     * Draw a frame on an image.
     *
     * @param { FrameType} frameType - Specifies the frame option to be drawn on an image.
     * @param {string} color - Specifies the color of a frame on an image. The default value is ‘#fff’.
     * @param {string} gradientColor - Specifies the gradient color of a frame on an image. The default value is ‘’.
     * @param {number} size - Specifies the size of the frame as a percentage. It can be provided as an integer percentage (e.g., 10). Defaults to 20 if not specified.
     * @param {number} inset - Specifies the inset value for line, hook, and inset type frames, as a percentage. It can be provided as an integer percentage (e.g., 10). Defaults to 0 if not specified.
     * @param {number} offset - Specifies the offset value for line and inset type frames, as a percentage. It can be provided as an integer percentage (e.g., 10). Defaults to 0 if not specified.
     * @param {number} borderRadius - Specifies the border radius for line-type frames, as a percentage. It can be provided as an integer percentage (e.g., 10). Defaults to 0 if not specified.
     * @param {FrameLineStyle} frameLineStyle - Specifies the type of line to be drawn for line-type frames. Default to Solid if not specified.
     * @param {number} lineCount - Specifies the number of lines for line-type frames. Defaults to 0 if not specified.
     *
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawFrame = function (frameType, color, gradientColor, size, inset, offset, borderRadius, frameLineStyle, lineCount) {
        this.manageActiveAction();
        var isFrame = false;
        var obj = { frameChangeEventArgs: null };
        color = color ? color : '#fff';
        gradientColor = gradientColor ? gradientColor : '';
        size = size ? size : 20;
        inset = inset ? inset : 0;
        offset = offset ? offset : 0;
        borderRadius = borderRadius ? borderRadius : 0;
        frameLineStyle = frameLineStyle ? frameLineStyle : FrameLineStyle.Solid;
        lineCount = lineCount ? lineCount : 0;
        var prevFrameSettings = { type: this.toPascalCase(this.frameObj.type), color: this.frameObj.color,
            gradientColor: this.frameObj.gradientColor, size: this.frameObj.size, inset: this.frameObj.inset,
            offset: this.frameObj.offset, borderRadius: this.frameObj.radius,
            frameLineStyle: this.toPascalCase(this.frameObj.border), lineCount: this.frameObj.amount };
        extend(this.tempFrameObj, this.frameObj);
        this.tempFrameZoomLevel = this.transform.zoomFactor;
        this.frameDestPoints = extend({}, this.img, {}, true);
        this.notify('toolbar', { prop: 'frameToolbarClick' });
        this.frameObj.type = frameType.toLowerCase();
        this.frameObj.color = color;
        this.frameObj.gradientColor = gradientColor;
        this.frameObj.size = size;
        this.frameObj.inset = inset;
        this.frameObj.offset = offset;
        this.frameObj.radius = borderRadius;
        this.frameObj.border = frameLineStyle.toLowerCase();
        this.frameObj.amount = lineCount;
        this.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
        if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
            if (JSON.stringify(this.frameObj) !== JSON.stringify(this.tempFrameObj)) {
                isFrame = true;
                this.okBtn();
            }
            else {
                this.tempFrameZoomLevel = null;
            }
        }
        else {
            this.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null } });
            extend(this.frameObj, this.tempFrameObj);
            this.tempFrameZoomLevel = null;
        }
        this.notify('draw', { prop: 'redrawDownScale' });
        var ctxTbar = this.element.querySelector('.e-contextual-toolbar-wrapper');
        if (ctxTbar) {
            ctxTbar.classList.add('e-hide');
        }
        return isFrame;
    };
    /**
     * Straightens an image by rotating it clockwise or counterclockwise.
     *
     * @param {number} degree - The degree value specifying the amount of rotation for straightening the image.
     * Positive values indicate clockwise rotation, while negative values indicate counterclockwise rotation.
     *
     * @remarks
     * The degree value should be within the range of -45 to +45 degrees for accurate straightening.
     *
     * @returns {boolean} - A boolean value indicating the success of the straightening operation.
     */
    ImageEditor.prototype.straightenImage = function (degree) {
        var isStraightened = false;
        if (degree >= -45 && degree <= 45) {
            this.applyShapes();
            isStraightened = true;
            this.notify('transform', { prop: 'straightenImage', value: { degree: degree } });
            this.notify('draw', { prop: 'redrawDownScale' });
        }
        return isStraightened;
    };
    /**
     * Duplicates a shape based on the given shape ID in the ImageEditor.
     * Use 'getShapeSettings' method to get the shape and then pass a shapeId from the returned shape to clone a shape.
     *
     * @param {string} shapeId - Specifies the shape id to clone a shape on an image.
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.cloneShape = function (shapeId) {
        var obj = { isSelected: false };
        if (shapeId.split('_')[0] === 'shape') {
            this.notify('shape', { prop: 'selectShape', onPropertyChange: false, value: { id: shapeId, obj: obj } });
            if (obj['isSelected']) {
                this.notify('toolbar', { prop: 'duplicateShape', onPropertyChange: false, value: { isPreventUndoRedo: false } });
                this.okBtn(null, true);
                this.notify('draw', { prop: 'redrawDownScale' });
            }
        }
        return obj['isSelected'];
    };
    /**
     * Update filter to the canvas in the ImageEditor.
     *
     * @param {ImageFilterOption } filterOption - Specifies the filter options to the image.
     *
     * @returns {string}.
     *
     */
    ImageEditor.prototype.getImageFilter = function (filterOption) {
        var canvas = this.createElement('canvas');
        var ctx = canvas.getContext('2d');
        this.notify('filter', { prop: 'updateAdj', value: { type: filterOption.toLowerCase(), value: null, isPreview: true, ctx: ctx } });
        return ctx.filter;
    };
    /**
     * Enable text area editing in the ImageEditor.
     *
     * @returns {void}.
     *
     */
    ImageEditor.prototype.enableTextEditing = function () {
        var activeObj = extend({}, this.activeObj, {}, true);
        if (!activeObj.order) {
            this.noPushUndo = true;
            this.okBtn();
            this.noPushUndo = false;
            this.noRedact = true;
            this.selectShape(activeObj.currIndex);
            activeObj.order = this.activeObj.order;
        }
        this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: false } });
        this.activeObj = activeObj;
        this.notify('toolbar', { prop: 'editText', onPropertyChange: false });
    };
    /**
     * Specifies if it's possible to undo the last recent action made in an Image Editor.
     *
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.canUndo = function () {
        var canUndo = false;
        var object = this.getUndoRedoColl();
        var undoRedoIndex = object['index'];
        if (undoRedoIndex > 0) {
            canUndo = true;
        }
        return canUndo;
    };
    /**
     * Specifies if it's possible to redo the last recent action made in an Image Editor.
     *
     * @returns {boolean}.
     *
     */
    ImageEditor.prototype.canRedo = function () {
        var canRedo = false;
        var object = this.getUndoRedoColl();
        var undoRedoColl = object['undoRedoColl'];
        var undoRedoIndex = object['index'];
        if (undoRedoColl && undoRedoColl.length > 0 && undoRedoIndex < undoRedoColl.length - 1) {
            canRedo = true;
        }
        if (undoRedoIndex === undoRedoColl.length) {
            canRedo = false;
        }
        else if (undoRedoIndex === 0 && undoRedoColl.length > 0) {
            canRedo = true;
        }
        else if (undoRedoIndex > 0) {
            canRedo = true;
        }
        return canRedo;
    };
    /**
     * Applies the operations performed in the Image Editor, such as annotation drawings.
     *
     * @returns{void}
     * @remarks
     * This method applies the actions performed after enabling annotation drawings, ensuring that the drawn annotations are applied to the image.
     */
    ImageEditor.prototype.apply = function () {
        if (this.isMaskImage) {
            this.discard();
        }
        else {
            this.updateColl('reset');
            this.closeOverlayTbar();
            this.okBtn(null, true);
        }
    };
    /**
     * Discards the operations performed in the Image Editor, such as annotation drawings.
     *
     * @returns{void}
     * @remarks
     * This method discards the actions performed after enabling annotation drawings, ensuring that the drawn annotations are not applied to the image.
     */
    ImageEditor.prototype.discard = function () {
        this.updateColl('reset');
        this.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: this.closeOverlayTbar(), isFinalCancel: true } });
    };
    /**
     * Enable or disable a shape drawing option in an Image Editor.
     *
     * @param {ShapeType} shapeType - Specifies the type of shape to be enabled or disabled for drawing.
     * @param {boolean} isEnabled - Optional. Specifies a value to indicate whether to enable or disable shape drawing. The default value is true.
     *
     * @remarks This function allows the user to toggle the shape drawing feature in the Image Editor. When enabled, users can draw shapes on the image. When disabled, the shape drawing functionality is not available.
     *
     * @returns {void}.
     */
    ImageEditor.prototype.enableShapeDrawing = function (shapeType, isEnabled) {
        this.manageActiveAction();
        if (isEnabled) {
            this.drawingShape = shapeType.toLowerCase();
            this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        }
        if (shapeType && isEnabled) {
            this.currObjType.shape = shapeType.toLowerCase();
            this.activeObj.shape = this.currObjType.shape;
            this.currObjType.isDragging = this.currObjType.isCustomCrop = false;
            this.activeObj.shapeDegree = this.transform.degree;
            this.activeObj.shapeFlip = this.transform.currFlipState;
            this.activeObj.textFlip = this.transform.currFlipState;
            this.activeObj.flipObjColl = [];
            var orderObj = { order: null };
            this.notify('shape', { prop: 'getNewOrder', onPropertyChange: false, value: { obj: orderObj } });
            this.activeObj.order = orderObj['order'];
            this.notify('selection', { prop: 'annotate', value: { shape: this.currObjType.shape } });
            if (this.currObjType.shape === 'text') {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            }
            else if (this.currObjType.shape === 'redact') {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'redact',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            }
            else {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                        isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
            }
            this.notify('toolbar', { prop: 'update-toolbar-items', onPropertyChange: false });
        }
        else if (!isEnabled) {
            this.okBtn(null, true);
        }
    };
    /**
     * Moves a shape to the front of all other shapes based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform moving.
     *
     * @param {string} shapeId - Specifies the shape id to move the shape on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.bringToFront = function (shapeId) {
        this.noRedact = true;
        if (this.selectShape(shapeId)) {
            this.updateShapeOrder(shapeId, 'bringToFront');
            this.apply();
        }
    };
    /**
     * Moves a shape to ahead of one shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform moving.
     *
     * @param {string} shapeId - Specifies the shape id to move the shape on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.bringForward = function (shapeId) {
        this.noRedact = true;
        if (this.selectShape(shapeId)) {
            this.updateShapeOrder(shapeId, 'bringForward');
            this.apply();
        }
    };
    /**
     * Moves a shape to behind all other shapes based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform moving.
     *
     * @param {string} shapeId - Specifies the shape id to move the shape on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.sendToBack = function (shapeId) {
        this.noRedact = true;
        if (this.selectShape(shapeId)) {
            this.updateShapeOrder(shapeId, 'sendToBack');
            this.apply();
        }
    };
    /**
     * Moves a shape to behind one shape based on the given shape id.
     * Use 'getShapeSettings' method to get the shape id which is then passed to perform moving.
     *
     * @param {string} shapeId - Specifies the shape id to move the shape on an image.
     * @returns {void}.
     *
     */
    ImageEditor.prototype.sendBackward = function (shapeId) {
        this.noRedact = true;
        if (this.selectShape(shapeId)) {
            this.updateShapeOrder(shapeId, 'sendBackward');
            this.apply();
        }
    };
    /**
     * Clears the loaded image in the Image Editor.
     *
     * @returns{void}
     * @remarks
     * This method clears the loaded image and updates the component's user interface to its initial state (the initial user interface without a loaded image).
     */
    ImageEditor.prototype.clearImage = function () {
        this.reset();
        this.isImageLoaded = false;
        this.lowerContext.clearRect(0, 0, this.lowerCanvas.width, this.lowerCanvas.height);
        this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
        var btoolbar = document.getElementById(this.element.id + '_bottomToolbar');
        if (Browser.isDevice && btoolbar) {
            document.getElementById(this.element.id + '_bottomToolbar').style.display = 'none';
        }
        this.notify('toolbar', { prop: 'destroy-top-toolbar', onPropertyChange: false });
        this.notify('toolbar', { prop: 'create-toolbar', onPropertyChange: false });
        this.notify('toolbar', { prop: 'create-contextual-toolbar', onPropertyChange: false });
        var dropArea = document.getElementById(this.element.id + '_dropArea');
        if (dropArea) {
            dropArea.style.display = 'block';
        }
    };
    // AI related codes
    /**
     * Enables overlay drawing to erase objects in an image editor. The eraser tool assists in selecting the mask image.
     *
     * @remarks
     * The selection UI is based on the 'theme' property.
     *
     * @param {number} strokeWidth - Specifies the stroke width of the drawing.
     * @param {string} color - Specifies the color of the drawing.
     * @hidden
     * @returns {void}.
     *
     */
    ImageEditor.prototype.selectMaskImage = function (strokeWidth, color) {
        strokeWidth = strokeWidth ? strokeWidth : 10;
        color = color ? color : '#512da880';
        this.applyShapes();
        this.isMaskImage = true;
        this.updateColl('empty');
        this.enableDisableToolbar(true);
        this.update();
        this.activeObj.strokeSettings.strokeWidth = strokeWidth;
        this.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: strokeWidth } });
        this.activeObj.strokeSettings.strokeColor = color;
        this.notify('freehand-draw', { prop: 'freeHandDraw', onPropertyChange: false, value: { value: true } });
        this.maskCanvas.style.display = 'block';
    };
    ImageEditor.prototype.enableDisableToolbar = function (value) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        var toolbar;
        var elem = document.getElementById(this.element.id + '_toolbar');
        if (elem) {
            toolbar = getComponent(elem, 'toolbar');
            if (toolbar) {
                toolbar.disable(value);
            }
        }
        elem = document.getElementById(this.element.id + '_bottomToolbar');
        if (elem) {
            toolbar = getComponent(elem, 'toolbar');
            if (toolbar) {
                toolbar.disable(value);
            }
        }
    };
    ImageEditor.prototype.updateImage = function (data, imageBackgroundColor) {
        var _this = this;
        if (data || imageBackgroundColor || imageBackgroundColor === '') {
            var prevCropObj_1 = extend({}, this.cropObj, {}, true);
            var object = { currObj: {} };
            this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            var prevObj_1 = object['currObj'];
            prevObj_1.objColl = extend([], this.objColl, [], true);
            prevObj_1.pointColl = extend([], this.pointColl, [], true);
            prevObj_1.afterCropActions = extend([], this.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false, value: { obj: selPointCollObj } });
            prevObj_1.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            if (data) {
                this.isImageUpdated = true;
                if (typeof (data) !== 'string') {
                    var canvas = this.createElement('canvas');
                    canvas.width = data.width;
                    canvas.height = data.height;
                    canvas.getContext('2d').putImageData(data, 0, 0);
                    data = canvas.toDataURL();
                }
                this.baseImg.src = data;
                setTimeout(function () {
                    if (_this.cropObj.straighten !== 0) {
                        _this.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: 'crop-' + 'custom' } });
                        _this.noPushUndo = true;
                        _this.crop();
                        _this.noPushUndo = false;
                    }
                    else {
                        _this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
                    }
                    _this.isImageUpdated = false;
                    if (!imageBackgroundColor) {
                        _this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: 'updateImage', previousObj: prevObj_1,
                                previousObjColl: prevObj_1.objColl, previousPointColl: prevObj_1.pointColl,
                                previousSelPointColl: prevObj_1.selPointColl, previousCropObj: prevCropObj_1,
                                previousText: null, currentText: null, previousFilter: null, isCircleCrop: null
                            } });
                        _this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                    }
                }, 100);
            }
            if (imageBackgroundColor || imageBackgroundColor === '') {
                this.notify('draw', { prop: 'imageBackgroundColor', onPropertyChange: false, value: { color: imageBackgroundColor } });
                this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
                if (!data) {
                    this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: 'bgColor', previousObj: prevObj_1,
                            previousObjColl: prevObj_1.objColl, previousPointColl: prevObj_1.pointColl, previousSelPointColl: prevObj_1.selPointColl,
                            previousCropObj: prevCropObj_1, previousText: null, currentText: null, previousFilter: null, isCircleCrop: null
                        } });
                    this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                }
            }
            if (data && imageBackgroundColor) {
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: 'updateImage', previousObj: prevObj_1,
                        previousObjColl: prevObj_1.objColl, previousPointColl: prevObj_1.pointColl, previousSelPointColl: prevObj_1.selPointColl,
                        previousCropObj: prevCropObj_1, previousText: null, currentText: null, previousFilter: null, isCircleCrop: null
                    } });
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
        }
    };
    ImageEditor.prototype.editCompleted = function (type) {
        this.notify('draw', { prop: 'redrawDownScale' });
        var actionArgs = { action: type ? type : 'shape-insert',
            actionEventArgs: this.editCompleteArgs };
        this.triggerEditCompleteEvent(actionArgs);
    };
    ImageEditor.prototype.updateColl = function (type) {
        if (!this.isMaskImage) {
            return;
        }
        if (type === 'empty') {
            this.tempToolbarHeight = this.toolbarHeight;
            this.tempToolbar = this.toolbar ? extend([], this.toolbar, [], true) : null;
            this.tempObjColl = extend([], this.objColl, [], true);
            this.tempPointColl = extend([], this.pointColl, [], true);
            this.tempShapeColl = extend([], this.shapeColl, [], true);
            this.objColl = [];
            this.pointColl = [];
            this.shapeColl = [];
            this.freehandCounter = 0;
            this.notify('freehand-draw', { prop: 'setCurrentFreehandDrawIndex',
                value: { value: 0 } });
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
        }
        else if (type === 'reset') {
            this.objColl = this.tempObjColl;
            this.pointColl = this.tempPointColl;
            this.shapeColl = this.tempShapeColl;
            this.freehandCounter = this.pointColl.length;
            this.notify('freehand-draw', { prop: 'setCurrentFreehandDrawIndex',
                value: { value: this.freehandCounter } });
            this.enableDisableToolbar(false);
            if (this.cropObj.straighten !== 0) {
                this.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: 'crop-' + 'custom' } });
                this.noPushUndo = true;
                this.crop();
                this.noPushUndo = false;
            }
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
            this.isMaskImage = false;
            this.upperContext.globalCompositeOperation = 'source-over';
            this.maskCanvas.style.display = 'none';
            this.activeObj.strokeSettings = { strokeColor: '#fff', fillColor: '', strokeWidth: null,
                radius: null, outlineColor: '', outlineWidth: null };
            this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: this.activeObj.strokeSettings,
                    strokeColor: '#fff', fillColor: '', strokeWidth: null, outlineWidth: null } });
            this.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: 2 } });
            this.notify('freehand-draw', { prop: 'setMasking', onPropertyChange: false, value: { value: false } });
        }
    };
    // Toolbar related codes
    ImageEditor.prototype.resetToolbar = function () {
        if (this.toolbarHeight !== this.tempToolbarHeight && !((isNullOrUndefined(this.toolbar) ||
            (this.toolbar && this.toolbar.length > 0)
            || !isNullOrUndefined(this.toolbarTemplate)))) {
            this.toolbarHeight = this.tempToolbarHeight;
            this.notify('toolbar', { prop: 'setToolbarHeight', value: { height: this.toolbarHeight } });
            this.toolbar = this.tempToolbar;
            if (!this.toolbarTemplate) {
                this.notify('toolbar', { prop: 'create-toolbar', onPropertyChange: false });
                this.notify('toolbar', { prop: 'create-contextual-toolbar', onPropertyChange: false });
            }
            this.update();
        }
    };
    ImageEditor.prototype.getData = function (isMaskImage) {
        if (isMaskImage) {
            this.resetToolbar();
        }
        var objColl = extend([], this.objColl, null, true);
        var pointColl = extend([], this.pointColl, null, true);
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var shapeColl = extend([], this.shapeColl, null, true);
        if (isMaskImage) {
            this.notify('shape', { prop: 'updateShapeColl', onPropertyChange: false });
            for (var i = 0; i < this.freehandCounter; i++) {
                this.pointColl[i].strokeColor = '#fff';
            }
        }
        else {
            this.objColl = [];
            this.pointColl = [];
            this.shapeColl = [];
            this.freehandCounter = 0;
        }
        var frameType = this.frameObj.type;
        this.frameObj.type = 'none';
        var aspectWidth = this.aspectWidth;
        var aspectHeight = this.aspectHeight;
        this.aspectWidth = this.aspectHeight = null;
        var straighten = this.cropObj.straighten;
        this.togglePen = false;
        this.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: 'crop-' + 'custom' } });
        var tempDestPoints = extend({}, this.img, {}, true);
        var tempCropObj = extend({}, this.cropObj, {}, true);
        var tempSel = extend({}, this.activeObj, {}, true);
        var tempTransform = extend({}, this.transform, {}, true);
        var panPoint = extend({}, this.panPoint, {}, true);
        if (straighten !== 0) {
            this.setStraighten(0);
        }
        var point = this.activeObj.activePoint;
        point.startX = this.img.destLeft;
        point.startY = this.img.destTop;
        point.width = this.img.destWidth;
        point.height = this.img.destHeight;
        point.endX = point.startX + point.width;
        point.endY = point.startY + point.height;
        this.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: point, obj: this.activeObj,
                isMouseMove: null, x: null, y: null } });
        this.noPushUndo = true;
        this.crop();
        this.noPushUndo = false;
        this.isCropTab = false;
        this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.notify('crop', { prop: 'resetZoom', onPropertyChange: false });
        this.isCropTab = true;
        var afterCropActions = extend([], this.afterCropActions, [], true);
        var coll = extend([], this.rotateFlipColl, [], true);
        this.notify('crop', { prop: 'revertTransform', value: { type: 'initial', coll: coll } });
        var imageData = this.getImageData();
        if (isMaskImage) {
            var canvas = this.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = imageData.width;
            canvas.height = imageData.height;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            if (this.pointColl.length > 0) {
                var obj = { width: 0, height: 0 };
                this.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
                    value: { obj: obj, dimension: { width: canvas.width, height: canvas.height } } });
                var ratio = obj;
                this.notify('export', { prop: 'drawAnnotation', value: { context: ctx, ratio: ratio } });
            }
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        }
        this.notify('crop', { prop: 'revertTransform', value: { type: 'reverse', coll: coll } });
        this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.afterCropActions = afterCropActions;
        if (!isMaskImage) {
            this.objColl = objColl;
            this.pointColl = pointColl;
            this.shapeColl = shapeColl;
            this.freehandCounter = this.pointColl.length;
        }
        this.frameObj.type = frameType;
        this.aspectWidth = aspectWidth;
        this.aspectHeight = aspectHeight;
        this.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: 'crop-' + 'custom' } });
        if (straighten !== 0) {
            this.setStraighten(straighten);
        }
        this.img = tempDestPoints;
        this.cropObj = tempCropObj;
        this.activeObj = tempSel;
        this.transform = tempTransform;
        this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
            value: { zoomFactor: 0.1, zoomPoint: null, isResize: null } });
        this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
            value: { zoomFactor: -0.1, zoomPoint: null, isResize: null } });
        if (this.transform.degree !== 0) {
            this.panPoint.currentPannedPoint = { x: panPoint.totalPannedClientPoint.x,
                y: panPoint.totalPannedClientPoint.y };
            this.notify('transform', { prop: 'drawPannedImage', value: { xDiff: panPoint.totalPannedClientPoint.x,
                    yDiff: panPoint.totalPannedClientPoint.y } });
            this.panPoint.currentPannedPoint = { x: 0, y: 0 };
            this.notify('transform', { prop: 'setTempPanMove', value: { point: null } });
        }
        this.noPushUndo = true;
        this.crop();
        this.noPushUndo = false;
        this.transform.straighten = 0;
        this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
        return imageData;
    };
    ImageEditor.prototype.applyShapes = function () {
        if (this.isUndoRedoStack) {
            return;
        }
        var shapes = ['rectangle', 'ellipse', 'line', 'arrow', 'path', 'text', 'image'];
        var dummyObj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: dummyObj } });
        if (dummyObj['bool'] || this.togglePen || (this.activeObj.shape && shapes.indexOf(this.activeObj.shape) !== -1) ||
            this.drawingShape) {
            this.okBtn(null, true);
        }
    };
    ImageEditor.prototype.closeOverlayTbar = function () {
        var isContextualToolbar = false;
        var frameObject = { bool: null };
        this.notify('toolbar', { prop: 'getFrameToolbar', onPropertyChange: false, value: { obj: frameObject } });
        if (!frameObject['bool'] && this.element.querySelector('.e-contextual-toolbar-wrapper')) {
            if (!this.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hide')) {
                isContextualToolbar = true;
            }
            var straightenObj = { bool: this.isStraightening };
            if (!Browser.isDevice || (Browser.isDevice && !straightenObj['bool'])) {
                this.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
            }
        }
        return isContextualToolbar;
    };
    ImageEditor.prototype.toolbarTemplateFn = function () {
        var template;
        var templateID = this.element.id + '_toolbar';
        var toolbarArea = this.element.querySelector('#' + this.element.id + '_toolbarArea');
        if (this.toolbarTemplate) {
            this.toolbarFn = this.templateParser(this.toolbarTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                template = this.toolbarFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isAngular) {
                var templateColl = this.toolbarFn({ type: 'toolbar' }, this, 'Template', templateID);
                template = (templateColl[0].nodeType === 3) ? templateColl[1] : templateColl[0];
            }
            else {
                template = this.toolbarFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
            }
            toolbarArea.appendChild(template);
            this.toolbarHeight = toolbarArea.clientHeight;
            this.notify('toolbar', { prop: 'setToolbarHeight', value: { height: this.toolbarHeight } });
            this['renderReactTemplates']();
        }
    };
    ImageEditor.prototype.quickAccessToolbarTemplateFn = function () {
        var template;
        var templateID = this.element.id + '_quickAccessToolbar';
        var toolbarArea = this.element.querySelector('#' + this.element.id + '_quickAccessToolbarArea');
        if (this.quickAccessToolbarTemplate) {
            this.qatFn = this.templateParser(this.quickAccessToolbarTemplate);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            if (this.isReact) {
                template = this.qatFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }
            else if (this.isAngular) {
                var templateColl = this.qatFn({ type: 'toolbar' }, this, 'Template', templateID);
                template = (templateColl[0].nodeType === 3) ? templateColl[1] : templateColl[0];
            }
            else {
                template = this.qatFn({ type: 'toolbar' }, this, 'Template', templateID)[0];
            }
            toolbarArea.appendChild(template);
            this['renderReactTemplates']();
        }
    };
    ImageEditor.prototype.templateParser = function (template) {
        if (template) {
            try {
                if (typeof template !== 'function' && document.querySelectorAll(template).length) {
                    return templateCompiler(document.querySelector(template).innerHTML.trim());
                }
                else {
                    return compile(template);
                }
            }
            catch (error) {
                return templateCompiler(template);
            }
        }
        return undefined;
    };
    // Common codes for EJ2 and Blazor
    ImageEditor.prototype.getTextFromId = function (id) {
        var idToValue = { '1': 'none', '2': 'bar', '3': 'arrow', '4': 'arrowSolid',
            '5': 'circle', '6': 'circleSolid', '7': 'square', '8': 'squareSolid' };
        return idToValue["" + id];
    };
    ImageEditor.prototype.getFinetuneOption = function (type) {
        var typeToOption = { 'brightness': ImageFinetuneOption.Brightness, 'contrast': ImageFinetuneOption.Contrast,
            'hue': ImageFinetuneOption.Hue, 'saturation': ImageFinetuneOption.Saturation, 'opacity': ImageFinetuneOption.Opacity,
            'blur': ImageFinetuneOption.Blur, 'exposure': ImageFinetuneOption.Exposure };
        return typeToOption["" + type];
    };
    ImageEditor.prototype.setPenStroke = function (args) {
        this.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: parseInt(args, 10) } });
    };
    ImageEditor.prototype.updateFreehandDrawColorChange = function () {
        var obj = { tempFreeHandDrawEditingStyles: null };
        this.notify('freehand-draw', { prop: 'getTempFreeHandDrawEditingStyles', value: { obj: obj } });
        this.notify('freehand-draw', { prop: 'color-change', value: { color: obj['tempFreeHandDrawEditingStyles'].strokeColor } });
    };
    ImageEditor.prototype.getUndoRedoColl = function () {
        var obj = { undoRedoColl: null, index: null };
        var undoRedoObj = { undoRedoStep: null };
        var object = { appliedUndoRedoColl: [] };
        this.notify('undo-redo', { prop: 'getAppliedUndoRedoColl', value: { obj: object } });
        this.notify('undo-redo', { prop: 'getUndoRedoStep', value: { obj: undoRedoObj } });
        obj['undoRedoColl'] = object['appliedUndoRedoColl'];
        obj['index'] = undoRedoObj['undoRedoStep'];
        return obj;
    };
    ImageEditor.prototype.updateImageTransformColl = function (type) {
        var value;
        if (type === 'rotateleft') {
            value = -90;
        }
        else if (type === 'rotateright') {
            value = 90;
        }
        else if (type === 'horizontalflip') {
            value = 'horizontal';
        }
        else if (type === 'verticalflip') {
            value = 'vertical';
        }
        for (var i = 0; i < this.objColl.length; i++) {
            var shape = this.objColl[i].shape;
            if (shape === 'image' || shape === 'text') {
                if (isNullOrUndefined(this.objColl[i].rotateFlipColl)) {
                    this.objColl[i].rotateFlipColl = [];
                }
                this.objColl[i].rotateFlipColl.push(value);
                var obj = { collection: this.objColl[i].rotateFlipColl };
                this.notify('shape', { prop: 'alignRotateFlipColl', onPropertyChange: false,
                    value: { collection: this.objColl[i].rotateFlipColl, isRotateFlipCollection: false, obj: obj } });
                this.objColl[i].rotateFlipColl = obj['collection'];
            }
        }
    };
    ImageEditor.prototype.setInitialZoomState = function () {
        this.objColl.push(this.activeObj);
        this.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        var isUndoRedo = this.isUndoRedo;
        this.isCropTab = false;
        this.isUndoRedo = true;
        if (this.transform.cropZoomFactor && this.transform.cropZoomFactor > 0) {
            this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: -this.transform.cropZoomFactor, zoomPoint: null, isResize: true } });
        }
        else {
            this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: Math.abs(this.transform.cropZoomFactor), zoomPoint: null, isResize: true } });
        }
        this.isUndoRedo = isUndoRedo;
        this.panPoint.totalPannedPoint = { x: 0, y: 0 };
        this.transform.cropZoomFactor = 0;
        this.notify('freehand-draw', { prop: 'updateFHDColl', onPropertyChange: false });
        this.activeObj = extend({}, this.objColl[this.objColl.length - 1], {}, true);
        this.objColl.pop();
        this.isCropTab = true;
        this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: this.activeObj } });
    };
    /**
     * Set the old item Transform item state.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateCropTransformItems = function () {
        this.prevCurrSelectionPoint = extend({}, this.currSelectionPoint, {}, true);
        this.notify('draw', { prop: 'updateCropSelection', onPropertyChange: false });
    };
    /**
     * Get the pascal case.
     *
     * @param { string } str - Specifies the string to convert to pascal case.
     * @param { Object } obj - Specifies the string to convert to pascal case.
     * @hidden
     * @returns {string}.
     * A pascal case string.
     */
    ImageEditor.prototype.toPascalCase = function (str, obj) {
        var strArr = [];
        if (!isNullOrUndefined(str)) {
            strArr = str.toLowerCase().split('-');
        }
        for (var i = 0; i < strArr.length; i++) {
            strArr[i] = strArr[i].charAt(0).toUpperCase() + strArr[i].slice(1);
        }
        if (obj) {
            obj['maxText'] = strArr.join('');
        }
        return strArr.join('');
    };
    /**
     * Get the font sizes.
     *
     * @hidden
     * @returns {DropDownButtonItemModel[]}.
     * A font size collections.
     */
    ImageEditor.prototype.getFontSizes = function () {
        var items = [];
        this.fontSizeColl = [];
        var fontSize;
        if (this.transform.degree === 0 || this.transform.degree % 180 === 0) {
            fontSize = this.img.destWidth / 25;
        }
        else {
            fontSize = this.img.destHeight / 25;
        }
        for (var i = 1; i <= 10; i++) {
            this.fontSizeColl.push({ text: (i * (Math.round(fontSize / 2))).toString() });
            items.push({ text: (i.toString()) });
        }
        return items;
    };
    /**
     * Updates drop area content dynamically.
     *
     * @param { HTMLElement } dropInfoElement - Specifies the drop area element.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateDropInfoContent = function (dropInfoElement) {
        if (!dropInfoElement) {
            return;
        }
        var supportObj = { key: 'SupportText' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: supportObj } });
        var words = this.getExtensionString();
        var fileSizeObj = { key: 'MinMaxSize' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: fileSizeObj } });
        var andObj = { key: 'And' };
        this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: andObj } });
        var size;
        if (this.uploadSettings.minFileSize && this.uploadSettings.maxFileSize) {
            size = ' ' + fileSizeObj['value'] + ' ' + this.formatSizeUnits(this.uploadSettings.minFileSize) + ' ' + andObj['value'] + ' ' + this.formatSizeUnits(this.uploadSettings.maxFileSize);
        }
        else if (this.uploadSettings.minFileSize) {
            fileSizeObj['key'] = 'MinSize';
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: fileSizeObj } });
            size = ' ' + fileSizeObj['value'] + ' ' + this.formatSizeUnits(this.uploadSettings.minFileSize);
        }
        else if (this.uploadSettings.maxFileSize) {
            fileSizeObj['key'] = 'MaxSize';
            this.notify('toolbar', { prop: 'getLocaleText', onPropertyChange: false, value: { obj: fileSizeObj } });
            size = ' ' + fileSizeObj['value'] + ' ' + this.formatSizeUnits(this.uploadSettings.maxFileSize);
        }
        if (size) {
            dropInfoElement.textContent = supportObj['value'] + words + size;
        }
        else {
            dropInfoElement.textContent = supportObj['value'] + words;
        }
    };
    /**
     * Handles the OK button operation
     *
     * @param { boolean } isMouseDown - Specifies whether it is a mouse down.
     * @param { boolean } isFinalApply - Specifies whether it is a final apply.
     * @param { boolean } isResize - Specifies whether it is called from resize public method.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.okBtn = function (isMouseDown, isFinalApply, isResize) {
        if (isFinalApply) {
            this.noPushUndo = false;
            var tempActiveObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
                flipObjColl: [], triangle: [], triangleRatio: [], order: null };
            this.notify('selection', { prop: 'setTempActObj', onPropertyChange: false, value: { obj: tempActiveObj } });
        }
        var ctWrapper = this.element.querySelector('.e-contextual-toolbar-wrapper');
        if (ctWrapper) {
            ctWrapper.classList.remove('e-frame-wrapper');
        }
        var isCropSelection = false;
        var splitWords;
        this.isResizeOkBtn = true;
        var aspectIcon = this.element.querySelector('#' + this.element.id + '_aspectratio');
        var nonAspectIcon = this.element.querySelector('#' + this.element.id + '_nonaspectratio');
        var blrAspRatElem = this.element.querySelector('.e-ie-toolbar-aspect-ratio-btn');
        var blrNAspRatElem = this.element.querySelector('.e-ie-toolbar-nonaspect-ratio-btn');
        if (this.activeObj.shape !== undefined) {
            splitWords = this.activeObj.shape.split('-');
        }
        if (splitWords === undefined && this.currObjType.isCustomCrop) {
            isCropSelection = true;
        }
        else if (splitWords !== undefined && splitWords[0] === 'crop') {
            isCropSelection = true;
        }
        this.allowDownScale = true;
        if ((this.activeObj.shape && this.activeObj.shape !== 'image' || this.togglePen) && !isCropSelection) {
            var objt = { shapeSettingsObj: {} };
            this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
            var shapeSettings = objt['shapeSettingsObj'];
            if (this.togglePen) {
                shapeSettings.type = ShapeType.FreehandDraw;
            }
            var shapeChangedArgs = { action: 'apply', currentShapeSettings: extend({}, shapeSettings, {}, true) };
            if (!this.currObjType.isRedact && (isFinalApply || this.isShapeDrawing)) {
                if (this.isShapeDrawing) {
                    shapeChangedArgs.action = 'draw-end';
                }
                this.trigger('shapeChange', shapeChangedArgs);
            }
            this.editCompleteArgs = shapeChangedArgs;
            if (this.currObjType.isRedact) {
                this.currObjType.isRedact = false;
            }
        }
        if (aspectIcon || nonAspectIcon) {
            var obj_2 = { width: null, height: null };
            this.notify('selection', { prop: 'getNumTextValue', onPropertyChange: false, value: { obj: obj_2 } });
            var point = { x: obj_2['width'], y: obj_2['height'] };
            var obj1 = { prevCropObj: this.prevCropObj };
            var obj2 = { prevObj: this.prevObj };
            if (point && point.x && point.y && obj1['prevCropObj'] && obj2['prevObj']) {
                if (nonAspectIcon || (blrNAspRatElem && !blrNAspRatElem.classList.contains('e-hidden'))) {
                    this.notify('transform', { prop: 'resize', value: { width: point.x, height: point.y, isAspectRatio: false } });
                }
                else if (aspectIcon || (blrAspRatElem && !blrAspRatElem.classList.contains('e-hidden'))) {
                    this.notify('transform', { prop: 'resize', value: { width: point.x, height: null, isAspectRatio: true } });
                }
                this.isResize = false;
                this.aspectWidth = point.x;
                this.aspectHeight = point.y;
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                        isApplyBtn: false, isCropping: false, isZooming: null, cType: null } });
                this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: -this.transform.zoomFactor, zoomPoint: null, isResize: true } });
                this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: obj2['prevObj']['defaultZoom'], zoomPoint: null, isResize: true } });
                if (obj2['prevObj'].zoomFactor) {
                    this.setProperties({ zoomSettings: { zoomFactor: obj2['prevObj'].zoomFactor } }, true);
                }
                this.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false,
                    value: { previousZoomValue: this.zoomSettings.zoomFactor } });
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: 'resize',
                        previousObj: obj2['prevObj'], previousObjColl: obj2['prevObj']['objColl'],
                        previousPointColl: obj2['prevObj']['pointColl'], previousSelPointColl: obj2['prevObj']['selPointColl'],
                        previousCropObj: obj1['prevCropObj'], previousText: null, currentText: null, previousFilter: null,
                        isCircleCrop: null } });
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                var obj_3 = this.cancelCropSelection;
                if ((obj_3 && (isNullOrUndefined(nonAspectIcon) || !nonAspectIcon))) {
                    obj_3.previousObj.aspectWidth = obj_3.currentObj.aspectWidth = this.aspectWidth;
                    obj_3.previousObj.aspectHeight = obj_3.currentObj.aspectHeight = this.aspectHeight;
                    obj_3.previousCropObj = extend({}, this.cropObj, {}, true);
                    obj_3.currentCropObj = extend({}, this.cropObj, {}, true);
                    this.notify('draw', { prop: 'updateCropSelObj' });
                }
                this.cancelCropSelection = null;
            }
            else if (point && (point.x === 0 || point.y === 0)) {
                this.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: null } });
            }
            else {
                this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                        isApplyBtn: false, isCropping: false, isZooming: null, cType: null } });
            }
            this.isAspectRatio = false;
        }
        else if (isResize) {
            var isAspectRatio = false;
            if (this.aspectWidth && this.aspectHeight) {
                this.notify('transform', { prop: 'resize', value: { width: this.aspectWidth, height: this.aspectHeight, isAspectRatio: false } });
            }
            else if (this.aspectWidth) {
                this.notify('transform', { prop: 'resize', value: { width: this.aspectWidth, height: null, isAspectRatio: true } });
                this.aspectHeight = this.aspectWidth / (this.img.destWidth / this.img.destHeight);
                isAspectRatio = true;
            }
            this.isResize = false;
            this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                    isApplyBtn: false, isCropping: false, isZooming: null, cType: null } });
            this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: -this.transform.zoomFactor, zoomPoint: null, isResize: true } });
            this.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: this.prevObj['defaultZoom'], zoomPoint: null, isResize: true } });
            if (this.prevObj.zoomFactor) {
                this.setProperties({ zoomSettings: { zoomFactor: this.prevObj.zoomFactor } }, true);
            }
            this.notify('transform', { prop: 'setPreviousZoomValue', onPropertyChange: false,
                value: { previousZoomValue: this.zoomSettings.zoomFactor } });
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: { operation: 'resize',
                    previousObj: this.prevObj, previousObjColl: this.prevObj['objColl'],
                    previousPointColl: this.prevObj['pointColl'], previousSelPointColl: this.prevObj['selPointColl'],
                    previousCropObj: this.prevCropObj, previousText: null, currentText: null, previousFilter: null,
                    isCircleCrop: null } });
            this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            var obj_4 = this.cancelCropSelection;
            if ((obj_4 && isAspectRatio)) {
                obj_4.previousObj.aspectWidth = obj_4.currentObj.aspectWidth = this.aspectWidth;
                obj_4.previousObj.aspectHeight = obj_4.currentObj.aspectHeight = this.aspectHeight;
                obj_4.previousCropObj = extend({}, this.cropObj, {}, true);
                obj_4.currentCropObj = extend({}, this.cropObj, {}, true);
                this.notify('draw', { prop: 'updateCropSelObj' });
            }
            this.cancelCropSelection = null;
            this.isAspectRatio = false;
        }
        var selElem = this.element.querySelector('.e-contextual-toolbar-wrapper .e-toolbar-item.e-selected');
        var obj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        var frameObject = { bool: null };
        this.notify('toolbar', { prop: 'getFrameToolbar', onPropertyChange: false, value: { obj: frameObject } });
        var sliderWrap = document.querySelector('#' + this.element.id + '_sliderWrapper');
        if (selElem) {
            this.currentFilter = selElem.children[0].children[0].id.replace('Canvas', '');
        }
        if (isCropSelection) {
            if (this.transform.straighten !== 0 && (this.panPoint.totalPannedPoint.x !== 0 || this.panPoint.totalPannedPoint.y !== 0 ||
                this.panPoint.totalPannedClientPoint.x !== 0 || this.panPoint.totalPannedClientPoint.y !== 0)) {
                var temp = this.prevStraightenedDegree;
                this.prevStraightenedDegree = this.transform.straighten;
                this.setStraighten(this.transform.straighten - 3);
                this.setStraighten(this.transform.straighten + 3);
                this.prevStraightenedDegree = temp;
            }
            this.isCroppedEvent = this.crop();
        }
        else if (this.togglePen) {
            this.freeHandDraw(false);
            if (!this.isMaskImage) {
                var widthObj = { penStrokeWidth: null };
                this.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: widthObj } });
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                this.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: widthObj['penStrokeWidth'] } });
            }
            this.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            this.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        }
        else if (this.textArea.style.display === 'block' || this.textArea.style.display === 'inline-block') {
            this.notify('shape', { prop: 'redrawActObj', onPropertyChange: false,
                value: { x: null, y: null, isMouseDown: null } });
            this.lowerContext.clearRect(0, 0, this.lowerCanvas.width, this.lowerCanvas.height);
            this.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
            if (isNullOrUndefined(isMouseDown)) {
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
            this.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
            this.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        }
        else if ((sliderWrap || this.currObjType.isFiltered) && !this.drawingShape && this.activeObj.shape !== 'redact') {
            this.initialAdjustmentValue = this.canvasFilter = this.lowerContext.filter;
            this.currObjType.isFiltered = false;
            var obj_5 = { value: null };
            this.notify('draw', { prop: 'getTempAdjustmentValue', value: { obj: obj_5 } });
            if (!sliderWrap || sliderWrap.parentElement.previousElementSibling.textContent !== 'Opacity') {
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            }
            if ((this.activeObj.activePoint.width !== 0 && this.activeObj.activePoint.height !== 0) ||
                (this.activeObj.shape === 'path' && this.activeObj.pointColl.length > 0)) {
                this.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
            }
        }
        else if (obj['bool']) {
            this.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
            this.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: false } });
            this.notify('toolbar', { prop: 'destroy-qa-toolbar' });
            this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
            this.notify('freehand-draw', { prop: 'resetFreehandDrawSelectedId', onPropertyChange: false });
        }
        else if ((this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) ||
            (this.activeObj.shape === 'path' && this.activeObj.pointColl.length > 0)) {
            if (this.activeObj.shape === 'image') {
                this.notify('draw', { prop: 'setImageApply', onPropertyChange: false, value: { bool: true } });
            }
            this.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: null } });
        }
        else {
            if (JSON.stringify(this.frameObj) !== JSON.stringify(this.tempFrameObj)) {
                var object = { currObj: {} };
                this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                        operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                        previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                        previousCropObj: extend({}, this.cropObj, {}, true), previousText: null, currentText: null,
                        previousFilter: null, isCircleCrop: null
                    } });
                this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                var currFrameSettings = { type: this.toPascalCase(this.frameObj.type),
                    color: this.frameObj.color, gradientColor: this.frameObj.gradientColor, size: this.frameObj.size,
                    inset: this.frameObj.inset, offset: this.frameObj.offset, borderRadius: this.frameObj.radius,
                    frameLineStyle: this.toPascalCase(this.frameObj.border), lineCount: this.frameObj.amount };
                var prevFrameSettings = { type: this.toPascalCase(this.tempFrameObj.type),
                    color: this.tempFrameObj.color, gradientColor: this.tempFrameObj.gradientColor, size: this.tempFrameObj.size,
                    inset: this.tempFrameObj.inset, offset: this.tempFrameObj.offset, borderRadius: this.tempFrameObj.radius,
                    frameLineStyle: this.toPascalCase(this.tempFrameObj.border), lineCount: this.tempFrameObj.amount };
                var frameChange = { cancel: false, previousFrameSetting: prevFrameSettings,
                    currentFrameSetting: currFrameSettings };
                this.editCompleteArgs = frameChange;
                this.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                this.tempFrameObj = extend({}, this.frameObj, {}, true);
            }
            this.notify('draw', { prop: 'resetFrameZoom', onPropertyChange: false, value: { isOk: true } });
        }
        if (!obj['isCropToolbar']) {
            this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                    isApplyBtn: false, isCropping: null, isZooming: null, cType: null } });
            this.currObjType.isRedact = false;
        }
        this.notify('draw', { prop: 'setNewPath', value: { bool: false } });
        this.transform.zoomFactor = this.transform.defaultZoomFactor;
        this.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
        this.isResizeOkBtn = false;
        this.notify('draw', { prop: 'redrawDownScale' });
        this.isChangesSaved = this.isFinetuneBtnClick = false;
        if (isFinalApply) {
            this.drawingShape = null;
            this.notify('draw', { prop: 'resetTempObjColl' });
            this.notify('draw', { prop: 'resetTempPointColl' });
        }
    };
    ImageEditor.prototype.triggerEditCompleteEvent = function (args) {
        if (args.action === 'shape-insert' && args.actionEventArgs &&
            args.actionEventArgs.currentShapeSettings &&
            args.actionEventArgs.currentShapeSettings.type.toString() === 'Redact') {
            args.action = 'redact';
        }
        this.trigger('editComplete', args);
        this.editCompleteArgs = null;
    };
    /**
     * Handles the OK button operation
     *
     * @param { string } id - Specifies shape id to return.
     * @hidden
     * @returns {SelectionPoint | Object}.
     */
    ImageEditor.prototype.getObjFromId = function (id) {
        var obj;
        if (this.activeObj.currIndex && this.activeObj.currIndex === id) {
            obj = extend({}, this.activeObj, {}, true);
        }
        else {
            for (var i = 0; i < this.shapeColl.length; i++) {
                var shapeId = this.shapeColl[i].id ? this.shapeColl[i].id :
                    this.shapeColl[i].currIndex;
                if (shapeId === id) {
                    obj = extend({}, this.shapeColl[i], {}, true);
                    break;
                }
            }
        }
        return obj;
    };
    /**
     * Set the temporary filter properties.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.setTempFilterProperties = function () {
        this.upperCanvas.style.display = 'block';
        this.cropSelectedState();
        var obj = { adjustmentLevel: null };
        this.notify('filter', { prop: 'getAdjustmentLevel', onPropertyChange: false,
            value: { obj: obj } });
        this.lowerContext.filter = this.initialAdjustmentValue;
        this.notify('draw', { prop: 'setTempAdjustmentValue', value: { tempAdjustmentValue: this.lowerContext.filter } });
        this.notify('filter', { prop: 'setTempAdjustmentLevel', onPropertyChange: false,
            value: { tempAdjustmentLevel: extend({}, obj['adjustmentLevel'], {}, true) } });
        this.notify('draw', { prop: 'setTempFilter', value: { tempFilter: this.currentFilter } });
        var undoRedoObj = { undoRedoStep: null };
        this.notify('undo-redo', { prop: 'getUndoRedoStep', value: { obj: undoRedoObj } });
        this.notify('draw', { prop: 'setTempUndoRedoStep', value: { tempUndoRedoStep: undoRedoObj['undoRedoStep'] } });
    };
    /**
     * To crop the selection.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.cropSelectedState = function () {
        if (this.activeObj.shape && this.activeObj.shape.split('-')[0] === 'crop') {
            this.okBtn();
        }
    };
    /**
     * Get the current canvas data.
     *
     * @hidden
     * @returns {ImageData}.
     * An ImageData returns the current canvas image data object.
     */
    ImageEditor.prototype.getCurrentCanvasData = function () {
        var tempFrame = extend({}, this.frameObj, {}, true);
        this.frameObj = { type: 'none', color: '#fff', size: 20, inset: 20, offset: 20, radius: 0, amount: 1, border: 'solid', gradientColor: '' };
        var tempFilter = this.lowerContext.filter;
        this.lowerContext.filter = this.canvasFilter = 'none';
        var objColl = extend([], this.objColl, null, true);
        var pointColl = extend([], this.pointColl, null, true);
        this.objColl = [];
        this.pointColl = [];
        this.freehandCounter = 0;
        this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
        var ctWrapper = this.element.querySelector('.e-contextual-toolbar-wrapper');
        if (ctWrapper) {
            ctWrapper.classList.add('e-hide');
        }
        var data = this.getImageData();
        if (ctWrapper) {
            ctWrapper.classList.remove('e-hide');
        }
        if (!Browser.isDevice) {
            this.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'main',
                    isApplyBtn: true, isCropping: false } });
        }
        this.element.querySelector('#' + this.element.id + '_contextualToolbarArea').classList.remove('e-hide');
        this.objColl = objColl;
        this.pointColl = pointColl;
        this.freehandCounter = pointColl.length;
        this.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
            value: { ctx: this.lowerContext, shape: 'iterate', pen: 'iterate', isPreventApply: null } });
        this.lowerContext.filter = this.canvasFilter = tempFilter;
        this.frameObj = tempFrame;
        return data;
    };
    /**
     * To set current adjustment value
     *
     * @param { string } type - Specifies the type of adjustment.
     * @param { number } value - Specifies the value to adjust.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.setCurrAdjustmentValue = function (type, value) {
        var finetuneValueChanging = { finetune: this.getFinetuneOption(type), value: value, cancel: false };
        this.trigger('finetuneValueChanging', finetuneValueChanging);
        this.editCompleteArgs = finetuneValueChanging;
        if (finetuneValueChanging.cancel) {
            return;
        }
        this.notify('filter', { prop: 'setCurrAdjValue', value: { type: type.toLowerCase(), value: value } });
    };
    /**
     * Get the square point for path.
     *
     * @param { SelectionPoint } obj - Specifies the points of path.
     * @hidden
     * @returns {ActivePoint}.
     * An ActivePoint object which returns the square point.
     */
    ImageEditor.prototype.getSquarePointForPath = function (obj) {
        var point = { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 };
        if (obj.pointColl.length > 0) {
            point = { startX: obj.pointColl[0].x, startY: obj.pointColl[0].y, endX: obj.pointColl[0].x, endY: obj.pointColl[0].y };
            for (var i = 1; i < obj.pointColl.length; i++) {
                if (obj.pointColl[i].x < point.startX) {
                    point.startX = obj.pointColl[i].x;
                }
                if (obj.pointColl[i].y < point.startY) {
                    point.startY = obj.pointColl[i].y;
                }
                if (obj.pointColl[i].x > point.endX) {
                    point.endX = obj.pointColl[i].x;
                }
                if (obj.pointColl[i].y > point.endY) {
                    point.endY = obj.pointColl[i].y;
                }
            }
            point.width = point.endX - point.startX;
            point.height = point.endY - point.startY;
        }
        return point;
    };
    /**
     * Get the SelectionType.
     *
     * @param { string } type - Specifies the SelectionType.
     * @hidden
     * @returns {string}.
     * An string which returns the SelectionType.
     */
    ImageEditor.prototype.getSelectionType = function (type) {
        type = type === 'crop-custom' ? 'CropCustom' : type;
        var typeToSelectionType = { 'CropCustom': 'Custom', 'CropSquare': 'Square', 'CropCircle': 'Circle',
            'Crop3:2': '3:2', 'Crop4:3': '4:3', 'Crop5:4': '5:4', 'Crop7:5': '7:5', 'Crop16:9': '16:9',
            'Crop2:3': '2:3', 'Crop3:4': '3:4', 'Crop4:5': '4:5', 'Crop5:7': '5:7', 'Crop9:16': '9:16' };
        return typeToSelectionType["" + type] ? typeToSelectionType["" + type] : type.split('Crop')[1];
    };
    /** Clears the context.
     *
     * @param { CanvasRenderingContext2D } ctx - Specifies the canvas context.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.clearContext = function (ctx) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.clearRect(0, 0, ctx.canvas.height, ctx.canvas.width);
    };
    /**
     * Apply Arrow for start and end.
     *
     * @param { string } type - Specifies the start arrow or end arrow.
     * @param { string } id - Specifies the start arrow or end arrow item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateArrow = function (type, id) {
        var isObjPushed = false;
        var collLength = this.objColl.length;
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        if (collLength !== this.objColl.length) {
            isObjPushed = true;
        }
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        if (isObjPushed) {
            this.objColl.pop();
        }
        if (type === 'startArrow') {
            this.activeObj.start = this.getTextFromId(id);
        }
        else if (type === 'endArrow') {
            this.activeObj.end = this.getTextFromId(id);
        }
        this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                strokeWidth: this.activeObj.strokeSettings.strokeWidth } });
        this.objColl.push(this.activeObj);
        if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
        }
        this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        if (Browser.isDevice) {
            if (document.getElementById(this.element.id + '_bottomToolbar')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var toolbar_1 = getComponent(this.element.id + '_bottomToolbar', 'toolbar');
                toolbar_1.refreshOverflow();
            }
        }
        else {
            if (document.getElementById(this.element.id + '_toolbar')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var toolbar_2 = getComponent(this.element.id + '_toolbar', 'toolbar');
                toolbar_2.refreshOverflow();
            }
        }
        var shapeChangedArgs = { action: type, currentShapeSettings: extend({}, shapeSettings, {}, true) };
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Font style for text.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFontFamily = function (id) {
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        var isObjPushed = false;
        var collLength = this.objColl.length;
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        if (collLength !== this.objColl.length) {
            isObjPushed = true;
        }
        var objColl = extend([], this.objColl, [], true);
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (isObjPushed) {
            this.objColl.pop();
        }
        if (this.textArea.style.display === 'block' || this.textArea.style.display === 'inline-block') {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: true } });
            var temp = this.activeObj.textSettings.fontFamily;
            this.activeObj.textSettings.fontFamily = this.toPascalCase(id);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('shape', { prop: 'redraw-text' });
            }
            this.objColl.push(this.activeObj);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
            }
            this.objColl.pop();
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            var width = this.activeObj.activePoint.width +
                this.activeObj.textSettings.fontSize * 0.25;
            this.textArea.style.width = width + 'px';
            this.textArea.style.fontFamily = this.toPascalCase(id);
            this.activeObj.textSettings.fontFamily = temp;
            this.notify('shape', { prop: 'updateFontStyles', onPropertyChange: false,
                value: { isTextBox: null } });
        }
        else {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: null } });
            var fontFamily = this.activeObj.textSettings.fontFamily = this.toPascalCase(id);
            this.notify('shape', { prop: 'setTextSettings', onPropertyChange: false,
                value: { textSettings: null, fontFamily: fontFamily, fontSize: null } });
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('shape', { prop: 'redraw-text' });
            }
            this.objColl.push(this.activeObj);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: objColl,
                        previousPointColl: extend([], this.pointColl, [], true),
                        previousSelPointColl: prevObj.selPointColl, previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
            }
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
        var shapeChangedArgs = { action: 'font-family', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.fontFamily = this.textArea.style.fontFamily;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Font size for text.
     *
     * @param { string } text - Specifies the selected item text.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFontSize = function (text) {
        var itemText = text;
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        var isObjPushed = false;
        var collLength = this.objColl.length;
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        if (collLength !== this.objColl.length) {
            isObjPushed = true;
        }
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (isObjPushed) {
            this.objColl.pop();
        }
        if (this.textArea.style.display === 'block' || this.textArea.style.display === 'inline-block') {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: true } });
            var temp = this.activeObj.textSettings.fontSize;
            this.activeObj.textSettings.fontSize = parseInt(this.fontSizeColl[(parseInt(itemText, 10) - 1)].text, 10);
            this.objColl.push(this.activeObj);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
            }
            this.objColl.pop();
            var textStyle = '';
            if (this.textArea.style.fontWeight === 'bold') {
                textStyle = 'bold ';
            }
            if (this.textArea.style.fontStyle === 'italic') {
                textStyle = 'italic ';
            }
            if (this.textArea.style.fontWeight === 'bold' && this.textArea.style.fontStyle === 'italic') {
                textStyle = 'italic bold ';
            }
            this.upperContext.font = textStyle + this.activeObj.textSettings.fontSize + 'px' + ' ' + this.textArea.style.fontFamily;
            var rows = this.textArea.value.split('\n');
            var obj = { maxText: '' };
            this.notify('shape', { prop: 'getMaxText', onPropertyChange: false,
                value: { isTextBox: true, text: null, obj: obj } });
            var text_1 = obj['maxText'];
            var width = this.upperContext.measureText(text_1).width +
                this.activeObj.textSettings.fontSize * 0.5;
            this.textArea.style.width = width + 'px';
            this.textArea.style.height = rows.length * (this.activeObj.textSettings.fontSize + this.activeObj.textSettings.fontSize * 0.25) + 'px';
            this.activeObj.textSettings.fontSize = temp;
            this.upperContext.font = this.activeObj.textSettings.fontSize + 'px' + ' ' + this.activeObj.textSettings.fontFamily;
            this.textArea.style.fontSize = parseInt(this.fontSizeColl[(parseInt(itemText, 10) - 1)].text, 10) + 'px';
            if (this.textArea.style.fontFamily === 'georgia') {
                this.textArea.style.width = parseFloat(this.textArea.style.width) + parseFloat(this.textArea.style.fontSize) + 'px';
            }
        }
        else {
            this.notify('shape', { prop: 'updateFontRatio', onPropertyChange: false,
                value: { obj: this.activeObj, isTextArea: null } });
            var fontSize = this.activeObj.textSettings.fontSize = parseInt(this.fontSizeColl[(parseInt(itemText, 10) - 1)].text, 10);
            this.notify('shape', { prop: 'setTextSettings', onPropertyChange: false,
                value: { textSettings: null, fontFamily: null, fontSize: fontSize } });
            this.upperContext.font = this.activeObj.textSettings.fontSize + 'px' + ' ' + this.activeObj.textSettings.fontFamily;
            var rows = this.activeObj.keyHistory.split('\n');
            var obj = { maxText: '' };
            this.notify('shape', { prop: 'getMaxText', onPropertyChange: false,
                value: { isTextBox: null, text: null, obj: obj } });
            var text_2 = obj['maxText'];
            var width = this.upperContext.measureText(text_2).width +
                this.activeObj.textSettings.fontSize * 0.5;
            var height = rows.length * (this.activeObj.textSettings.fontSize +
                this.activeObj.textSettings.fontSize * 0.25);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('selection', { prop: 'setTextSelection', onPropertyChange: false,
                    value: { width: width, height: height } });
                this.notify('draw', { prop: 'updateActiveObject', onPropertyChange: false, value: { actPoint: this.activeObj.activePoint, obj: this.activeObj,
                        isMouseMove: null, x: null, y: null } });
                this.notify('shape', { prop: 'redraw-text' });
            }
            this.objColl.push(this.activeObj);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
            }
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
        var shapeChangedArgs = { action: 'font-size', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.fontSize = this.activeObj.textSettings.fontSize;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Font color for text.
     *
     * @param { string } value - Specifies the selected color item value.
     * @param { string } color - Specifies the selected color type value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFontColor = function (value, color) {
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        var isObjPushed = false;
        var collLength = this.objColl.length;
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        if (collLength !== this.objColl.length) {
            isObjPushed = true;
        }
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (isObjPushed) {
            this.objColl.pop();
        }
        if (this.textArea.style.display === 'none') {
            if (color === 'Text') {
                this.activeObj.strokeSettings.strokeColor = value;
                this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null,
                        strokeColor: this.activeObj.strokeSettings.strokeColor, fillColor: null, strokeWidth: null } });
            }
            else {
                this.activeObj.strokeSettings.fillColor = value;
                this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null,
                        strokeColor: null, fillColor: this.activeObj.strokeSettings.fillColor, strokeWidth: null } });
            }
            if (!this.togglePen) {
                if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                    this.objColl.push(this.activeObj);
                    this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                        value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                            previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                            previousCropObj: prevCropObj, previousText: null,
                            currentText: null, previousFilter: null, isCircleCrop: null } });
                    this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
                }
            }
        }
        else if (this.textArea.style.display === 'block' || this.textArea.style.display === 'inline-block') {
            this.textArea.style[color === 'Text' ? 'color' : 'backgroundColor'] = value;
            var temp = color === 'Text' ? this.activeObj.strokeSettings.strokeColor : this.activeObj.strokeSettings.fillColor;
            this.activeObj.strokeSettings[color === 'Text' ? 'strokeColor' : 'fillColor'] = value;
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.objColl.push(this.activeObj);
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                this.objColl.pop();
            }
            this.activeObj.strokeSettings[color === 'Text' ? 'strokeColor' : 'fillColor'] = temp;
        }
        else if (!this.togglePen) {
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.objColl.push(this.activeObj);
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
            }
        }
        var shapeChangedArgs = { action: 'font-color', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.fillColor = value;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Font color for text.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateStrokeTextColor = function (value) {
        this.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
        var isObjPushed = false;
        var collLength = this.objColl.length;
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        if (collLength !== this.objColl.length) {
            isObjPushed = true;
        }
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (isObjPushed) {
            this.objColl.pop();
        }
        if (this.textArea.style.display === 'none') {
            this.activeObj.strokeSettings.outlineColor = value;
            this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null,
                    strokeColor: null, fillColor: null, strokeWidth: null, outlineColor: this.activeObj.strokeSettings.outlineColor } });
            if (!this.togglePen) {
                if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                    this.objColl.push(this.activeObj);
                    this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                        value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                            previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                            previousCropObj: prevCropObj, previousText: null,
                            currentText: null, previousFilter: null, isCircleCrop: null } });
                    this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
                }
            }
        }
        else if (this.textArea.style.display === 'block' || this.textArea.style.display === 'inline-block') {
            this.textArea.style.textShadow = "-1px -1px 0 " + value + ", 1px -1px 0 " + value + ", -1px 1px 0 " + value + ", 1px 1px 0 " + value;
            var temp = this.activeObj.strokeSettings.outlineColor;
            this.activeObj.strokeSettings.outlineColor = value;
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.objColl.push(this.activeObj);
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'textAreaCustomization', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                this.objColl.pop();
            }
            this.activeObj.strokeSettings.outlineColor = temp;
        }
        else if (!this.togglePen) {
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.objColl.push(this.activeObj);
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
                this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
            }
        }
        var shapeChangedArgs = { action: 'font-color', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.fillColor = value;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Pen stroke width.
     *
     * @param { string } id - Specifies the selected item id.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updatePenStrokeWidth = function (id) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var temp = extend([], this.pointColl, [], true);
        this.updateFreehandDrawColorChange();
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.pointColl = temp;
        this.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: true } });
        this.setPenStroke(id);
        var obj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (obj['bool']) {
            var obj_6 = { penStrokeWidth: null };
            this.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: obj_6 } });
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            this.lowerContext.clearRect(0, 0, this.lowerCanvas.width, this.lowerCanvas.height);
            this.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                value: { strokeColor: null, strokeWidth: obj_6['penStrokeWidth'] } });
            var indexObj = { freehandSelectedIndex: null };
            this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            this.pointColl[indexObj['freehandSelectedIndex']].strokeWidth = obj_6['penStrokeWidth'];
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
            this.notify('draw', { prop: 'redrawDownScale' });
            this.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                value: { strokeColor: null, strokeWidth: obj_6['penStrokeWidth'] } });
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'freehanddrawCustomized', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
        }
        shapeSettings.type = ShapeType.FreehandDraw;
        var shapeChangedArgs = { action: 'stroke-width', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.strokeWidth = this.activeObj.strokeSettings.strokeWidth;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Pen stroke color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updatePenStrokeColor = function (value) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var temp = extend([], this.pointColl, [], true);
        this.updateFreehandDrawColorChange();
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.pointColl = temp;
        this.notify('selection', { prop: 'setFreehandDrawCustomized', value: { isFreehandDrawCustomized: true } });
        this.activeObj.strokeSettings.strokeColor = value;
        var indexObj = { freehandSelectedIndex: null };
        this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
        if (indexObj['freehandSelectedIndex'] !== null && indexObj['freehandSelectedIndex'] !== undefined) {
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: null } });
            this.notify('draw', { prop: 'redrawDownScale' });
            this.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                value: { strokeColor: null, strokeWidth: null } });
        }
        var obj = { bool: false };
        this.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
        if (obj['bool']) {
            var indexObj_1 = { freehandSelectedIndex: null };
            this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj_1 } });
            this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
            this.pointColl[indexObj_1['freehandSelectedIndex']].strokeColor = value;
            this.notify('freehand-draw', { prop: 'hoverFhd', onPropertyChange: false,
                value: { strokeColor: value } });
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'freehanddrawCustomized', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
        }
        else if (!this.togglePen) {
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.activeObj } });
        }
        shapeSettings.type = ShapeType.FreehandDraw;
        var shapeChangedArgs = { action: 'stroke-color', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.strokeColor = value;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Shape stroke width.
     *
     * @param { string } id - Specifies the selected item id.
     * @param { string } type - Specifies the type of selected item.
     * @param { string } shapeType - Specifies the shape type of selected item.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateStrokeWidth = function (id, type, shapeType) {
        if (this.activeObj.shape && (this.activeObj.shape !== 'path' || (this.activeObj.shape === 'path' &&
            this.activeObj.pointColl.length > 0))) {
            var obj = { shapeSettingsObj: {} };
            this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            var isObjPushed = false;
            var collLength = this.objColl.length;
            this.notify('shape', { prop: 'pushActItemIntoObj' });
            if (collLength !== this.objColl.length) {
                isObjPushed = true;
            }
            var prevCropObj = extend({}, this.cropObj, {}, true);
            var object = { currObj: {} };
            this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            var prevObj = object['currObj'];
            prevObj.objColl = extend([], this.objColl, [], true);
            prevObj.pointColl = extend([], this.pointColl, [], true);
            prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            if (isObjPushed) {
                this.objColl.pop();
            }
            this.activeObj.strokeSettings[type === 'width' ? (shapeType === 'text' ? 'outlineWidth' : 'strokeWidth') : 'radius'] = parseInt(id, 10);
            if (this.activeObj.shape === 'rectangle' || this.activeObj.shape === 'ellipse') {
                this.activeObj.strokeSettings[type === 'width' ? (shapeType === 'text' ? 'outlineWidth' : 'strokeWidth') : 'radius'] = parseInt(id, 10) - 1;
            }
            this.activeObj.strokeSettings[type === 'width' ? (shapeType === 'text' ? 'outlineWidth' : 'strokeWidth') : 'radius'] *= 2;
            if (type === 'width') {
                if (shapeType === 'text') {
                    this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                            strokeWidth: null, radius: null, outlineWidth: this.activeObj.strokeSettings.outlineWidth } });
                }
                else {
                    this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                            strokeWidth: this.activeObj.strokeSettings.strokeWidth, radius: null, outlineWidth: null } });
                }
            }
            else {
                this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                        strokeWidth: null, radius: this.activeObj.strokeSettings.radius } });
            }
            this.objColl.push(this.activeObj);
            if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                    value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                        previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                        previousCropObj: prevCropObj, previousText: null,
                        currentText: null, previousFilter: null, isCircleCrop: null } });
            }
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
            var shapeChangedArgs = { action: 'stroke-width', currentShapeSettings: extend({}, shapeSettings, {}, true) };
            shapeChangedArgs.currentShapeSettings[type === 'width' ? (shapeType === 'text' ? 'outlineWidth' : 'strokeWidth') : 'radius'] = this.activeObj.strokeSettings[type === 'width' ? (shapeType === 'text' ? 'outlineWidth' : 'strokeWidth') : 'radius'];
            this.trigger('shapeChange', shapeChangedArgs);
            this.editCompleteArgs = shapeChangedArgs;
        }
        else if (this.activeObj.shape && (this.activeObj.shape === 'path' &&
            this.activeObj.pointColl.length === 0)) {
            this.activeObj.strokeSettings.strokeWidth = parseInt(id, 10);
            this.activeObj.strokeSettings.strokeWidth *= 2;
            if (type === 'width') {
                if (shapeType === 'text') {
                    this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                            strokeWidth: null, radius: null, outlineWidth: this.activeObj.strokeSettings.outlineWidth } });
                }
                else {
                    this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                            strokeWidth: this.activeObj.strokeSettings.strokeWidth, radius: null, outlineWidth: null } });
                }
            }
            else {
                this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                        strokeWidth: null, radius: this.activeObj.strokeSettings.radius } });
            }
        }
    };
    /**
     * Apply Shape stroke color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateStrokeColor = function (value) {
        var objt = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: objt } });
        var shapeSettings = objt['shapeSettingsObj'];
        if (this.activeObj.shape && (this.activeObj.shape !== 'path' || (this.activeObj.shape === 'path' &&
            this.activeObj.pointColl.length > 0))) {
            var isObjPushed = false;
            var collLength = this.objColl.length;
            this.notify('shape', { prop: 'pushActItemIntoObj' });
            if (collLength !== this.objColl.length) {
                isObjPushed = true;
            }
            var prevCropObj = extend({}, this.cropObj, {}, true);
            var object = { currObj: {} };
            this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            var prevObj = object['currObj'];
            prevObj.objColl = extend([], this.objColl, [], true);
            prevObj.pointColl = extend([], this.pointColl, [], true);
            prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            if (isObjPushed) {
                this.objColl.pop();
            }
            this.activeObj.strokeSettings.strokeColor = value;
            this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: this.activeObj.strokeSettings.strokeColor, fillColor: null, strokeWidth: null } });
            if (!this.togglePen) {
                this.objColl.push(this.activeObj);
                if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
                    this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                        value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                            previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                            previousCropObj: prevCropObj, previousText: null,
                            currentText: null, previousFilter: null, isCircleCrop: null } });
                }
                this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
            }
        }
        else if (this.activeObj.shape && (this.activeObj.shape === 'path' &&
            this.activeObj.pointColl.length === 0)) {
            this.activeObj.strokeSettings.strokeColor = value;
            this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: this.activeObj.strokeSettings.strokeColor, fillColor: null, strokeWidth: null } });
        }
        var shapeChangedArgs = { action: 'stroke-color', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        shapeChangedArgs.currentShapeSettings.strokeColor = value;
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply Shape fill color.
     *
     * @param { string } value - Specifies the selected color item value.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateFillColor = function (value) {
        var obj = { shapeSettingsObj: {} };
        this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
        var shapeSettings = obj['shapeSettingsObj'];
        var isObjPushed = false;
        var collLength = this.objColl.length;
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        if (collLength !== this.objColl.length) {
            isObjPushed = true;
        }
        var prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        var prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (isObjPushed) {
            this.objColl.pop();
        }
        this.activeObj.strokeSettings.fillColor = value;
        this.notify('shape', { prop: 'setStrokeSettings',
            value: { strokeSettings: null, strokeColor: null, fillColor: this.activeObj.strokeSettings.fillColor,
                strokeWidth: null } });
        this.objColl.push(this.activeObj);
        if (this.activeObj.activePoint.width !== 0 || this.activeObj.activePoint.height !== 0) {
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
        }
        this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        var shapeChangedArgs = { action: 'fill-color', currentShapeSettings: extend({}, shapeSettings, {}, true) };
        this.trigger('shapeChange', shapeChangedArgs);
        this.editCompleteArgs = shapeChangedArgs;
    };
    /**
     * Apply horizontal flip.
     *
     * @param { CanvasRenderingContext2D } ctx - Specifies the canvas context 2D.
     * @param { boolean } isPreventURC - Specifies to update undo redo collection.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.horizontalFlip = function (ctx, isPreventURC) {
        var prevCropObj;
        var prevObj;
        if (isNullOrUndefined(isPreventURC)) {
            if (isNullOrUndefined(this.activeObj.imageRatio)) {
                this.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
            }
            this.notify('shape', { prop: 'pushActItemIntoObj' });
            prevCropObj = extend({}, this.cropObj, {}, true);
            var object = { currObj: {} };
            this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            prevObj = object['currObj'];
            prevObj.objColl = extend([], this.objColl, [], true);
            prevObj.pointColl = extend([], this.pointColl, [], true);
            prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            this.objColl.pop();
        }
        this.notify('toolbar', { prop: 'refreshSlider' });
        ctx.clearRect(0, 0, this.activeObj.imageCanvas.width, this.activeObj.imageCanvas.height);
        var activePoint = this.duplicateImage();
        this.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
            value: { ctx: this.activeObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: true, isVFlip: null } });
        this.activeObj.activePoint = activePoint;
        this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        if (isNullOrUndefined(isPreventURC)) {
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'imageHFlip', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
    };
    /**
     * Apply vertical flip.
     *
     * @param { CanvasRenderingContext2D } ctx - Specifies the canvas context 2D.
     * @param { boolean } isPreventURC - Specifies to update undo redo collection.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.verticalFlip = function (ctx, isPreventURC) {
        var prevCropObj;
        var prevObj;
        if (isNullOrUndefined(isPreventURC)) {
            if (isNullOrUndefined(this.activeObj.imageRatio)) {
                this.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
            }
            this.notify('shape', { prop: 'pushActItemIntoObj' });
            prevCropObj = extend({}, this.cropObj, {}, true);
            var object = { currObj: {} };
            this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            prevObj = object['currObj'];
            prevObj.objColl = extend([], this.objColl, [], true);
            prevObj.pointColl = extend([], this.pointColl, [], true);
            prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            this.objColl.pop();
        }
        this.notify('toolbar', { prop: 'refreshSlider' });
        ctx.clearRect(0, 0, this.activeObj.imageCanvas.width, this.activeObj.imageCanvas.height);
        var activePoint = this.duplicateImage();
        this.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
            value: { ctx: this.activeObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: null, isVFlip: true } });
        this.activeObj.activePoint = activePoint;
        this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        if (isNullOrUndefined(isPreventURC)) {
            this.objColl.push(this.activeObj);
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'imageVFlip', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        }
    };
    /**
     * Apply rotate image.
     *
     * @param { string } rotate - Specifies the direction of rotation.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.rotateImage = function (rotate) {
        var prevCropObj;
        var prevObj;
        if (isNullOrUndefined(this.activeObj.imageRatio)) {
            this.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
        }
        this.notify('shape', { prop: 'pushActItemIntoObj' });
        // eslint-disable-next-line prefer-const
        prevCropObj = extend({}, this.cropObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        // eslint-disable-next-line prefer-const
        prevObj = object['currObj'];
        prevObj.objColl = extend([], this.objColl, [], true);
        prevObj.pointColl = extend([], this.pointColl, [], true);
        prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        this.objColl.pop();
        this.notify('toolbar', { prop: 'refreshSlider' });
        if (rotate === 'rotleft') {
            this.activeObj.rotatedAngle -= (90 * (Math.PI / 180));
        }
        else {
            this.activeObj.rotatedAngle += (90 * (Math.PI / 180));
        }
        this.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: this.activeObj } });
        this.upperContext.clearRect(0, 0, this.upperCanvas.width, this.upperCanvas.height);
        this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
        this.objColl.push(this.activeObj);
        this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
            value: { operation: 'imageRotate', previousObj: prevObj, previousObjColl: prevObj.objColl,
                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                previousCropObj: prevCropObj, previousText: null,
                currentText: null, previousFilter: null, isCircleCrop: null } });
        this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
        this.notify('toolbar', { prop: 'destroy-qa-toolbar' });
        this.notify('toolbar', { prop: 'renderQAT', onPropertyChange: false, value: { isPenEdit: null } });
    };
    /**
     * Get pascalToSplitWords from string.
     *
     * @param { string } str - Specifies the word.
     * @hidden
     * @returns {string}.
     */
    ImageEditor.prototype.pascalToSplitWords = function (str) {
        str = str.charAt(0).toUpperCase() + str.slice(1);
        var splitStr = str.match(/[A-Z][a-z]+/g);
        if (isNullOrUndefined(splitStr)) {
            return str;
        }
        else {
            return splitStr.map(function (word) { return word.charAt(0).toUpperCase() + word.slice(1); }).join(' ');
        }
    };
    /**
     * Get Slider Value.
     *
     * @param { string } type - Finetune type.
     * @hidden
     * @returns {number}.
     */
    ImageEditor.prototype.getCurrAdjustmentValue = function (type) {
        var value = 100;
        var indexObj = { freehandSelectedIndex: null };
        this.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
        if (type === 'transparency' && this.togglePen) {
            var obj = { penOpacity: 1 };
            this.notify('freehand-draw', { prop: 'getPenOpacity', onPropertyChange: false, value: { obj: obj } });
            value = obj['penOpacity'] * 100;
        }
        else if (type === 'transparency' && indexObj['freehandSelectedIndex'] !== null && indexObj['freehandSelectedIndex'] !== undefined) {
            value = this.pointColl[indexObj['freehandSelectedIndex']].opacity * 100;
        }
        else {
            var obj = { adjustmentLevel: null };
            this.notify('filter', { prop: 'getAdjustmentLevel', onPropertyChange: false,
                value: { obj: obj } });
            var typeToAdjustmentLevel = { 'brightness': obj['adjustmentLevel'].brightness,
                'contrast': obj['adjustmentLevel'].contrast, 'hue': obj['adjustmentLevel'].hue,
                'saturation': obj['adjustmentLevel'].saturation, 'opacity': obj['adjustmentLevel'].opacity,
                'blur': obj['adjustmentLevel'].blur, 'exposure': obj['adjustmentLevel'].exposure,
                'transparency': obj['adjustmentLevel'].transparency, 'straighten': this.transform.straighten };
            value = typeToAdjustmentLevel["" + type];
        }
        return value;
    };
    /**
     * Apply transformSelect.
     *
     * @param { string } type - Specifies the selected item text.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.transformSelect = function (type) {
        if (this.transform.straighten === 0 && (type === 'rotateleft' || type === 'rotateright') &&
            this.activeObj.shape && (['crop-2:3', 'crop-3:2', 'crop-3:4', 'crop-4:3', 'crop-4:5', 'crop-5:4', 'crop-5:7', 'crop-7:5',
            'crop-9:16', 'crop-16:9'].indexOf(this.activeObj.shape) !== -1 || (this.activeObj.shape.indexOf('crop-') !== -1 &&
            this.activeObj.shape !== 'crop-custom' && this.activeObj.shape !== 'crop-square' && this.activeObj.shape !== 'crop-circle'))) {
            this.activeObj.shape = 'crop-' + this.activeObj.shape.split('-')[1].split(':')[1] + ':' + this.activeObj.shape.split('-')[1].split(':')[0];
            this.notify('toolbar', { prop: 'performCropTransformClick', value: { shape: this.activeObj.shape, isTransform: true } });
        }
        this.isCropToolbar = true;
        this.allowDownScale = false;
        var straighten = this.transform.straighten;
        var straightenObj = extend({}, this.activeObj, {}, true);
        var zoomFactor = this.transform.zoomFactor;
        this.prevEventSelectionPoint = extend({}, this.activeObj, {}, true);
        var object = { currObj: {} };
        this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
        this.prevEventObjPoint = object['currObj'];
        this.prevEventObjPoint.objColl = extend([], this.objColl, [], true);
        this.prevEventObjPoint.pointColl = extend([], this.pointColl, [], true);
        this.prevEventObjPoint.afterCropActions = extend([], this.afterCropActions, [], true);
        var selPointCollObj = { selPointColl: null };
        this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
            value: { obj: selPointCollObj } });
        this.prevEventObjPoint.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
        if (this.transform.straighten !== 0) {
            this.transform.straighten = 0;
            this.straightenBaseImageCanvas();
            for (var i = 0, len = this.objColl.length; i < len; i++) {
                var shape = this.objColl[i].shape;
                if (shape !== 'line' && shape !== 'arrow' && shape !== 'path') {
                    this.objColl[i].rotatedAngle -= (straighten * (Math.PI / 180));
                    this.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: this.objColl[i] } });
                }
            }
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
            this.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
        }
        this.setInitialZoomState();
        var activeObj = extend({}, this.activeObj, {}, true);
        this.notify('crop', { prop: 'setTransformCrop', onPropertyChange: false, value: { bool: true } });
        this.cropSelectedState();
        this.notify('crop', { prop: 'setTransformCrop', onPropertyChange: false, value: { bool: false } });
        this.notify('draw', { prop: 'resetCurrentSelectionPoint' });
        this.updateImageTransformColl(type);
        this.notify('transform', { prop: 'performTransformation', value: { text: type } });
        this.isCropTab = true;
        this.notify('draw', { prop: 'moveToSelectionRange', value: { type: type, activeObj: activeObj } });
        if (this.isStraightening && (type === 'horizontalflip' || type === 'verticalflip')) {
            this.notify('draw', { prop: 'resetStraightenDestPoints' });
            this.notify('draw', { prop: 'setDestForStraighten' });
        }
        if (straighten !== 0) {
            this.transform.straighten = straighten;
            this.straightenBaseImageCanvas();
            for (var i = 0, len = this.objColl.length; i < len; i++) {
                var shape = this.objColl[i].shape;
                if (shape !== 'line' && shape !== 'arrow' && shape !== 'path') {
                    this.objColl[i].rotatedAngle += (straighten * (Math.PI / 180));
                    this.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: this.objColl[i] } });
                }
            }
            this.notify('shape', { prop: 'drawAnnotations', onPropertyChange: false,
                value: { ctx: this.lowerContext, shape: 'zoom', pen: 'zoom', isPreventApply: null } });
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: false } });
            this.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: straightenObj } });
            this.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
            this.notify('draw', { prop: 'setStraightenInitZoom', value: { zoomFactor: zoomFactor } });
            if ((this.isStraightening && (type === 'horizontalflip' || type === 'verticalflip')) &&
                isNullOrUndefined(this.transform.zoomFactor) || this.transform.zoomFactor === 0) {
                if (this.transform.degree === 0) {
                    this.transform.zoomFactor += 0.025;
                }
                else if (this.transform.zoomFactor === 0) {
                    this.transform.zoomFactor = null;
                }
            }
            this.notify('draw', { prop: 'zoomToSel', value: { activeObj: straightenObj, isToolbar: false } });
        }
        this.isCropToolbar = false;
        var stValPan = this.element.querySelector('.e-ie-straighten-value-span');
        if (stValPan) {
            stValPan.innerHTML = this.transform.straighten.toString() + '&#176';
        }
    };
    /**
     * Returns default filter.
     *
     * @hidden
     * @returns {string}.
     */
    ImageEditor.prototype.getDefaultFilter = function () {
        return 'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
            'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' +
            'grayscale(0%) ' + 'invert(0%)';
    };
    /**
     * Performs Straightening action.
     *
     * @param { number } value - Specifies the degree of straightening.
     * @hidden
     * @returns {void} .
     */
    ImageEditor.prototype.setStraighten = function (value) {
        var straightenEventArgs = { cancel: false, previousDegree: this.transform.straighten, currentDegree: value };
        this.trigger('rotating', straightenEventArgs);
        this.editCompleteArgs = straightenEventArgs;
        if (!straightenEventArgs.cancel) {
            this.performStraighten(straightenEventArgs);
            var actionArgs = { action: 'straighten', actionEventArgs: this.editCompleteArgs };
            this.triggerEditCompleteEvent(actionArgs);
        }
    };
    ImageEditor.prototype.duplicateImage = function () {
        var activePoint = extend({}, this.activeObj.activePoint, {}, true);
        var dimObj = { width: 0, height: 0 };
        this.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
            value: { width: this.activeObj.imageElement.width, height: this.activeObj.imageElement.height, obj: dimObj, isImgShape: null } });
        this.activeObj.activePoint.width = dimObj['width'];
        this.activeObj.activePoint.height = dimObj['height'];
        return activePoint;
    };
    ImageEditor.prototype.performStraighten = function (straightenEventArgs) {
        var value = straightenEventArgs.currentDegree;
        var stValPan = this.element.querySelector('.e-ie-straighten-value-span');
        if (stValPan) {
            stValPan.innerHTML = value.toString() + '&#176';
        }
        var obj = extend({}, this.activeObj, null, true);
        this.notify('freehand-draw', { prop: 'setCenterSelPoints' });
        this.transform.straighten = value;
        this.straightenPoint = { x: this.activeObj.activePoint.startX + (this.activeObj.activePoint.width / 2),
            y: this.activeObj.activePoint.startY + (this.activeObj.activePoint.height / 2) };
        this.straightenBaseImageCanvas();
        for (var i = 0, len = this.objColl.length; i < len; i++) {
            var shape = this.objColl[i].shape;
            if (shape !== 'line' && shape !== 'arrow' && shape !== 'path') {
                this.objColl[i].rotatedAngle += ((this.transform.straighten - this.prevStraightenedDegree) * (Math.PI / 180));
                this.notify('selection', { prop: 'updPtCollForShpRot', onPropertyChange: false, value: { obj: this.objColl[i] } });
            }
        }
        if (this.transform.degree % 90 === 0 && this.transform.degree % 180 !== 0) {
            if (this.transform.straighten === 0) {
                this.transform.straighten = 360;
            }
            this.notify('draw', { prop: 'performPointZoom', onPropertyChange: false,
                value: { x: this.activeObj.activePoint.startX + (this.activeObj.activePoint.width / 2),
                    y: this.activeObj.activePoint.startY + (this.activeObj.activePoint.height / 2), type: 'zoomIn', isResize: true } });
            this.notify('draw', { prop: 'performPointZoom', onPropertyChange: false,
                value: { x: this.activeObj.activePoint.startX + (this.activeObj.activePoint.width / 2),
                    y: this.activeObj.activePoint.startY + (this.activeObj.activePoint.height / 2), type: 'zoomOut', isResize: true } });
            if (this.transform.straighten === 360) {
                this.transform.straighten = 0;
            }
        }
        else {
            this.notify('draw', { prop: 'render-image', value: { isMouseWheel: true, isPreventClearRect: null, isFrame: null, isStraighten: true } });
        }
        this.notify('draw', { prop: 'drawObject', onPropertyChange: false,
            value: { canvas: 'duplicate', obj: obj } });
        this.notify('draw', { prop: 'zoomToSel', value: { activeObj: obj, isToolbar: true } });
        this.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
        this.prevStraightenedDegree = this.transform.straighten;
    };
    /**
     * Straightens base image.
     *
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.straightenBaseImageCanvas = function () {
        if (this.isImageLoaded) {
            var flipState = this.getStraightenFlipState();
            var straighten = flipState === 'horizontal' || flipState === 'vertical' ?
                -this.transform.straighten : this.transform.straighten;
            var ctx = this.baseImgCanvas.getContext('2d');
            if (ctx.canvas.width !== this.lowerContext.canvas.width &&
                ctx.canvas.height !== this.lowerContext.canvas.height) {
                var obj_7 = { width: 0, height: 0 };
                this.notify('crop', { prop: 'calcRatio', onPropertyChange: false,
                    value: { obj: obj_7, dimension: { width: ctx.canvas.width, height: ctx.canvas.height } } });
            }
            var dimension = void 0;
            // eslint-disable-next-line prefer-const
            dimension = this.getRotatedCanvasDim(this.baseImg.width, this.baseImg.height, this.transform.straighten);
            this.img.srcWidth = ctx.canvas.width = dimension.width;
            this.img.srcHeight = ctx.canvas.height = dimension.height;
            var x = ctx.canvas.width / 2;
            var y = ctx.canvas.height / 2;
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.translate(x, y);
            ctx.rotate(straighten * Math.PI / 180);
            ctx.drawImage(this.baseImg, -this.baseImg.width / 2, -this.baseImg.height / 2, this.baseImg.width, this.baseImg.height);
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            var obj = { width: 0, height: 0 };
            this.notify('crop', { prop: 'calcRatio', onPropertyChange: false, value: { obj: obj, dimension: { width: ctx.canvas.width, height: ctx.canvas.height } } });
        }
    };
    /**
     * Returns rotated canvas dimension.
     *
     * @param { number } width - Specifies the width of the canvas.
     * @param { number } height - Specifies the height of the canvas.
     * @param { number } angle - Specifies the angle of rotation in degrees.
     * @hidden
     * @returns {void} .
     */
    ImageEditor.prototype.getRotatedCanvasDim = function (width, height, angle) {
        var angleRad = angle * Math.PI / 180;
        var cosAngle = Math.cos(angleRad);
        var sinAngle = Math.sin(angleRad);
        var minX = Math.min(0, width * cosAngle, height * Math.cos(Math.PI / 2 - angleRad), width * cosAngle + height * Math.cos(Math.PI / 2 - angleRad));
        var maxX = Math.max(0, width * cosAngle, height * Math.cos(Math.PI / 2 - angleRad), width * cosAngle + height * Math.cos(Math.PI / 2 - angleRad));
        var minY = Math.min(0, width * sinAngle, height * Math.sin(Math.PI / 2 - angleRad), width * sinAngle + height * Math.sin(Math.PI / 2 - angleRad));
        var maxY = Math.max(0, width * sinAngle, height * Math.sin(Math.PI / 2 - angleRad), width * sinAngle + height * Math.sin(Math.PI / 2 - angleRad));
        return { width: Math.ceil(maxX - minX), height: Math.ceil(maxY - minY) };
    };
    /**
     * Apply Shape order.
     *
     * @param { string } id - Specifies the id of the shape to change the order.
     * @param { string } value - Specifies the order of the shapes.
     * @hidden
     * @returns {void}.
     */
    ImageEditor.prototype.updateShapeOrder = function (id, value) {
        var shapeObj = this.getObjFromId(id);
        if ((shapeObj.shape && (shapeObj.shape !== 'path' ||
            (shapeObj.shape === 'path' && shapeObj.pointColl.length > 0))) ||
            (shapeObj && shapeObj['id'] && shapeObj['id'].indexOf('pen') > -1)) {
            var obj = { shapeSettingsObj: {} };
            this.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: obj } });
            var shapeSettings = obj['shapeSettingsObj'];
            if (shapeObj.shape) {
                this.notify('shape', { prop: 'pushActItemIntoObj' });
            }
            var prevCropObj = extend({}, this.cropObj, {}, true);
            var object = { currObj: {} };
            this.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            var prevObj = object['currObj'];
            prevObj.objColl = extend([], this.objColl, [], true);
            prevObj.pointColl = extend([], this.pointColl, [], true);
            prevObj.afterCropActions = extend([], this.afterCropActions, [], true);
            var selPointCollObj = { selPointColl: null };
            this.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                value: { obj: selPointCollObj } });
            prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
            if (shapeObj.shape) {
                this.objColl.pop();
            }
            this.notify('shape', { prop: 'z-order', onPropertyChange: false, value: { obj: shapeObj, value: value } });
            if (shapeObj.shape) {
                this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                        strokeWidth: shapeObj.strokeSettings.strokeWidth } });
                this.objColl.push(shapeObj);
            }
            this.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                    previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                    previousCropObj: prevCropObj, previousText: null,
                    currentText: null, previousFilter: null, isCircleCrop: null } });
            if (shapeObj.shape) {
                this.notify('selection', { prop: 'redrawShape', value: { obj: this.objColl[this.objColl.length - 1] } });
                this.activeObj.order = shapeObj.order;
            }
            var shapeChangedArgs = { action: 'stroke-width', previousShapeSettings: extend({}, shapeSettings, {}, true),
                currentShapeSettings: extend({}, shapeSettings, {}, true) };
            shapeChangedArgs.currentShapeSettings.strokeWidth = this.activeObj.strokeSettings.strokeWidth;
        }
        else if (this.activeObj.shape && (this.activeObj.shape === 'path' &&
            this.activeObj.pointColl.length === 0)) {
            this.notify('shape', { prop: 'setStrokeSettings', value: { strokeSettings: null, strokeColor: null, fillColor: null,
                    strokeWidth: this.activeObj.strokeSettings.strokeWidth } });
        }
    };
    ImageEditor.prototype.getStraightenFlipState = function () {
        var flipState = '';
        if (this.rotateFlipColl.length > 0) {
            for (var i = 0, len = this.rotateFlipColl.length; i < len; i++) {
                var curFlip = this.rotateFlipColl[i];
                if (curFlip === 'horizontal') {
                    flipState += 'horizontal';
                }
                else if (curFlip === 'vertical') {
                    flipState += 'vertical';
                }
                if (flipState === 'horizontalvertical' || flipState === 'verticalhorizontal') {
                    flipState = '';
                }
            }
        }
        return flipState;
    };
    ImageEditor.prototype.initializeZoomSettings = function () {
        this.theme = isNullOrUndefined(this.theme) ? 'Bootstrap5' : this.theme;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (isNullOrUndefined(this.zoomSettings.zoomTrigger) || this.zoomSettings.zoomTrigger === 0) {
            this.zoomSettings.zoomTrigger = (ZoomTrigger.MouseWheel | ZoomTrigger.Pinch | ZoomTrigger.Toolbar | ZoomTrigger.Commands);
        }
        if (isNullOrUndefined(this.selectionSettings.strokeColor)) {
            this.selectionSettings.strokeColor = this.themeColl[this.theme]['primaryColor'];
        }
        if (isNullOrUndefined(this.selectionSettings.fillColor)) {
            this.selectionSettings.fillColor = this.themeColl[this.theme]['secondaryColor'];
        }
    };
    ImageEditor.prototype.initializeThemeColl = function () {
        this.themeColl = {
            Bootstrap5: { primaryColor: '#0d6efd', secondaryColor: '#fff' },
            Bootstrap5Dark: { primaryColor: '#0d6efd', secondaryColor: '#fff' },
            Tailwind: { primaryColor: '#4f46e5', secondaryColor: '#fff' },
            TailwindDark: { primaryColor: '#22d3ee', secondaryColor: '#fff' },
            Fluent: { primaryColor: '#0078d4', secondaryColor: '#fff' },
            FluentDark: { primaryColor: '#0078d4', secondaryColor: '#fff' },
            Bootstrap4: { primaryColor: '#007bff', secondaryColor: '#fff' },
            Bootstrap: { primaryColor: '#317ab9', secondaryColor: '#fff' },
            BootstrapDark: { primaryColor: '#317ab9', secondaryColor: '#fff' },
            Material: { primaryColor: '#e3165b', secondaryColor: '#fff' },
            MaterialDark: { primaryColor: '#00b0ff', secondaryColor: '#fff' },
            Fabric: { primaryColor: '#0078d6', secondaryColor: '#fff' },
            FabricDark: { primaryColor: '#0074cc', secondaryColor: '#fff' },
            Highcontrast: { primaryColor: '#000000', secondaryColor: '#fff' },
            Material3: { primaryColor: '#6750a4', secondaryColor: '#fff' },
            Material3Dark: { primaryColor: '#d0bcff', secondaryColor: '#fff' },
            Fluent2: { primaryColor: '#0f6cbd', secondaryColor: '#fff' },
            Fluent2Dark: { primaryColor: '#115ea3', secondaryColor: '#fff' },
            Fluent2Highcontrast: { primaryColor: '#1aebff', secondaryColor: '#fff' },
            'Bootstrap5.3': { primaryColor: '#0d6efd', secondaryColor: '#fff' },
            'Bootstrap5.3Dark': { primaryColor: '#0d6efd', secondaryColor: '#fff' },
            Tailwind3: { primaryColor: '#4f46e5', secondaryColor: '#ffffff' },
            Tailwind3Dark: { primaryColor: '#6366f1', secondaryColor: '#ffffff03' }
        };
    };
    /**
     * Draw a redaction on an image.
     *
     * @param {RedactType} type – Optional. Specifies the type of redaction to be drawn on the image such as blur or pixelate. If not specified, the redaction drawing is initiated with the default blur value.
     * @param {number} x – Optional. Specifies x-coordinate of redaction. If not specified, the redaction drawing is initiated with the first parameter.
     * @param {number} y – Optional. Specifies y-coordinate of redaction. If not specified it draws redaction from the center point of the image.
     * @param {number} width – Optional. Specifies the width of the redaction. The default value is 100.
     * @param {number} height – Optional. Specifies the height of the redaction. The default value is 50.
     * @param {number} value – Optional. Specifies the blur value for blur-type redaction or the pixel size for pixelate-type redaction. Defaults to 20 since the default redaction is blur.
     * @returns {boolean}.
     */
    ImageEditor.prototype.drawRedact = function (type, x, y, width, height, value) {
        var isRedact = false;
        var isPointsInRange = this.allowShape(x, y);
        if (!this.disabled && this.isImageLoaded && (isPointsInRange || (isNullOrUndefined(x) && isNullOrUndefined(y)))) {
            isRedact = true;
            this.manageActiveAction();
            this.notify('shape', {
                prop: 'drawRedact', onPropertyChange: false, value: {
                    x: x, y: y, width: width, height: height, type: type, value: value
                }
            });
            this.notify('draw', { prop: 'redrawDownScale' });
        }
        return isRedact;
    };
    var ImageEditor_1;
    __decorate([
        Property('')
    ], ImageEditor.prototype, "cssClass", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "disabled", void 0);
    __decorate([
        Property('100%')
    ], ImageEditor.prototype, "height", void 0);
    __decorate([
        Property('Bootstrap5')
    ], ImageEditor.prototype, "theme", void 0);
    __decorate([
        Property()
    ], ImageEditor.prototype, "toolbar", void 0);
    __decorate([
        Property()
    ], ImageEditor.prototype, "toolbarTemplate", void 0);
    __decorate([
        Property('100%')
    ], ImageEditor.prototype, "width", void 0);
    __decorate([
        Property(true)
    ], ImageEditor.prototype, "allowUndoRedo", void 0);
    __decorate([
        Property(true)
    ], ImageEditor.prototype, "showQuickAccessToolbar", void 0);
    __decorate([
        Property()
    ], ImageEditor.prototype, "quickAccessToolbarTemplate", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "isReadOnly", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "enableRtl", void 0);
    __decorate([
        Property(false)
    ], ImageEditor.prototype, "enablePersistence", void 0);
    __decorate([
        Complex({}, FinetuneSettings)
    ], ImageEditor.prototype, "finetuneSettings", void 0);
    __decorate([
        Complex({}, ZoomSettings)
    ], ImageEditor.prototype, "zoomSettings", void 0);
    __decorate([
        Complex({}, SelectionSettings)
    ], ImageEditor.prototype, "selectionSettings", void 0);
    __decorate([
        Complex({}, FontFamily)
    ], ImageEditor.prototype, "fontFamily", void 0);
    __decorate([
        Complex({}, UploadSettings)
    ], ImageEditor.prototype, "uploadSettings", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "beforeSave", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "created", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "destroyed", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "zooming", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "panning", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "cropping", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "rotating", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "flipping", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "shapeChanging", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "selectionChanging", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "fileOpened", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "saved", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "toolbarCreated", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "toolbarUpdating", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "toolbarItemClicked", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "imageFiltering", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "finetuneValueChanging", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "click", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "shapeChange", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "quickAccessToolbarOpen", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "resizing", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "quickAccessToolbarItemClick", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "frameChange", void 0);
    __decorate([
        Event()
    ], ImageEditor.prototype, "editComplete", void 0);
    ImageEditor = ImageEditor_1 = __decorate([
        NotifyPropertyChanges
    ], ImageEditor);
    return ImageEditor;
}(Component));
export { ImageEditor };
