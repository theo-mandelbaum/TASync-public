import { extend, Browser, detach, select } from '@syncfusion/ej2-base';
import { EventHandler, getComponent, isNullOrUndefined, L10n } from '@syncfusion/ej2-base';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { Toolbar } from '@syncfusion/ej2-navigations';
import { Button } from '@syncfusion/ej2-buttons';
import { DropDownButton } from '@syncfusion/ej2-splitbuttons';
import { ColorPicker, Uploader, Slider, TextBox } from '@syncfusion/ej2-inputs';
import { ZoomTrigger, ShapeType } from '../index';
import { Dialog, hideSpinner, showSpinner } from '@syncfusion/ej2-popups';
import { addClass, removeClass } from '@syncfusion/ej2-base';
var ToolbarModule = /** @class */ (function () {
    function ToolbarModule(parent) {
        this.defToolbarItems = [];
        this.toolbarHeight = 46;
        this.currToolbar = '';
        this.preventZoomBtn = false;
        this.currentToolbar = 'main';
        this.selFhdColor = '#42a5f5';
        this.preventEnableDisableUr = false;
        this.isAspectRatio = true;
        this.isFrameToolbar = false;
        this.presetColors = {
            'custom': ['#000000', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3',
                '#03a9f4', '#00bcd4', '#009688', '#ffeb3b', '#ffffff', '#ffebee', '#fce4ec', '#f3e5f5', '#ede7f6', '#e3f2fd',
                '#e1f5fe', '#e0f7fa', '#e0f2f1', '#fffde7', '#f2f2f2', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#bbdefb',
                '#b3e5fc', '#b2ebf2', '#b2dfdb', '#fff9c4', '#e6e6e6', '#ef9a9a', '#f48fb1', '#ce93d8', '#b39ddb', '#90caf9',
                '#81d4fa', '#80deea', '#80cbc4', '#fff59d', '#cccccc', '#e57373', '#f06292', '#ba68c8', '#9575cd', '#64b5f6',
                '#4fc3f7', '#4dd0e1', '#4db6ac', '#fff176', '#b3b3b3', '#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#42a5f5',
                '#29b6f6', '#26c6da', '#26a69a', '#ffee58', '#999999', '#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#1e88e5',
                '#039be5', '#00acc1', '#00897b', '#fdd835', '#808080', '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#1976d2',
                '#0288d1', '#0097a7', '#00796b', '#fbc02d', '#666666', '#c62828', '#ad1457', '#6a1b9a', '#4527a0', '#1565c0',
                '#0277bd', '#00838f', '#00695c', '#f9a825', '#4d4d4d', '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#0d47a1',
                '#01579b', '#006064', '#004d40', '#f57f17']
        };
        this.isSlider = false;
        this.currentQuality = 1;
        this.imageQuality = 'highest';
        this.parent = parent;
        this.addEventListener();
        this.initLocale();
    }
    ToolbarModule.prototype.destroy = function () {
        if (this.parent.isDestroyed) {
            return;
        }
        this.removeEventListener();
    };
    ToolbarModule.prototype.addEventListener = function () {
        this.parent.on('toolbar', this.toolbar, this);
        this.parent.on('destroyed', this.destroy, this);
    };
    ToolbarModule.prototype.removeEventListener = function () {
        this.parent.off('toolbar', this.toolbar);
        this.parent.off('destroyed', this.destroy);
    };
    ToolbarModule.prototype.initLocale = function () {
        this.defaultLocale = {
            Crop: 'Crop',
            ZoomIn: 'Zoom In',
            ZoomOut: 'Zoom Out',
            Undo: 'Undo',
            Redo: 'Redo',
            Transform: 'Transform',
            Annotation: 'Annotation',
            Finetune: 'Finetune',
            Brightness: 'Brightness',
            Contrast: 'Contrast',
            Hue: 'Hue',
            Saturation: 'Saturation',
            Opacity: 'Opacity',
            Blur: 'Blur',
            Sharpen: 'Sharpen',
            Exposure: 'Exposure',
            Filter: 'Filter',
            Default: 'Default',
            Chrome: 'Chrome',
            Cold: 'Cold',
            Warm: 'Warm',
            Grayscale: 'Grayscale',
            BlackAndWhite: 'Black and White',
            Sepia: 'Sepia',
            Invert: 'Invert',
            Text: 'Add Text',
            Pen: 'Pen',
            Reset: 'Reset',
            Save: 'Save',
            Select: 'Select',
            RotateLeft: 'Rotate Left',
            RotateRight: 'Rotate Right',
            HorizontalFlip: 'Horizontal Flip',
            VerticalFlip: 'Vertical Flip',
            OK: 'Apply',
            Cancel: 'Discard',
            FillColor: 'Fill Color',
            StrokeColor: 'Stroke Color',
            StrokeWidth: 'Stroke Width',
            FontFamily: 'Font Family',
            FontStyle: 'Font Style',
            FontSize: 'Font Size',
            FontColor: 'Font Color',
            Pan: 'Pan',
            Move: 'Move',
            Load: 'Load',
            Custom: 'Custom',
            Square: 'Square',
            Circle: 'Circle',
            Ellipse: 'Ellipse',
            Rectangle: 'Rectangle',
            Line: 'Line',
            Arrow: 'Arrow',
            Path: 'Path',
            Bold: 'Bold',
            Italic: 'Italic',
            BoldItalic: 'Bold Italic',
            XSmall: 'X-Small',
            Small: 'Small',
            Medium: 'Medium',
            Large: 'Large',
            XLarge: 'X-Large',
            ABC: 'ABC',
            Browse: 'Browse',
            Duplicate: 'Duplicate',
            Remove: 'Remove',
            EditText: 'Edit Text',
            Start: 'Start',
            End: 'End',
            Bar: 'Bar',
            ArrowSolid: 'Arrow Solid',
            CircleSolid: 'Circle Solid',
            SquareSolid: 'Square Solid',
            None: 'None',
            CropAndTransform: 'Crop and Transform',
            CropSelection: 'Crop Selection',
            Image: 'Add Image',
            Transparency: 'Transparency',
            Height: 'Height',
            Width: 'Width',
            AspectRatio: 'Maintain aspect ratio',
            W: 'W',
            H: 'H',
            DragText: 'Drag and drop your image here or',
            DropText: 'Drop your image here or',
            BrowseText: 'Browse here...',
            SupportText: 'Supports:',
            Frame: 'Frame',
            Mat: 'Mat',
            Bevel: 'Bevel',
            Inset: 'Inset',
            Hook: 'Hook',
            Color: 'Color',
            Size: 'Size',
            Offset: 'Offset',
            Radius: 'Radius',
            Amount: 'Amount',
            Resize: 'Resize',
            0: '0%',
            20: '20%',
            40: '40%',
            60: '60%',
            80: '80%',
            100: '100%',
            1: '1',
            2: '2',
            3: '3',
            4: '4',
            5: '5',
            Border: 'Border',
            Solid: 'Solid',
            Dashed: 'Dashed',
            Dotted: 'Dotted',
            GradientColor: 'Gradient Color',
            ConfirmDialogHeader: 'Confirm Save Changes',
            ConfirmDialogContent: 'Do you want to save the changes you made to the image?',
            AlertDialogHeader: 'Unsupported file',
            AlertDialogContent: 'The selected file is unsupported.',
            MinMaxSize: 'with file size between',
            MinMaxSizeAlert: 'File size between',
            MinSize: 'with minimum file size of',
            MinSizeAlert: 'A minimum file size of',
            MaxSize: 'with maximum file size of',
            MaxSizeAlert: 'A maximum file size of',
            To: 'to',
            Bytes: 'bytes',
            Yes: 'Yes',
            No: 'No',
            ImageErrorDialogHeader: 'Image Selection Error',
            ImageErrorDialogContent: 'Please select only one image to open.',
            Straighten: 'Straighten',
            NoOutline: 'No outline',
            DlgOK: 'OK',
            SaveAs: 'Save As',
            ImageName: 'Image name',
            Format: 'Format',
            Quality: 'Quality',
            Download: 'Download',
            Close: 'Close',
            ImageSize: 'Image Size',
            QualityInfo: 'The image quality option is only available for JPEG format',
            Good: 'Good',
            Great: 'Great',
            Highest: 'Highest',
            BringForward: 'Bring Forward',
            SendBackward: 'Send Backward',
            SendToBack: 'Send to Back',
            BringToFront: 'Bring to Front',
            ZOrder: 'Z-Order',
            Redact: 'Redact',
            Pixelate: 'Pixelate',
            BorderRadius: 'Border Radius',
            TextOutlineColor: 'Outline Color',
            TextOutlineWidth: 'Outline Width',
            PixelSize: 'Pixel Size',
            And: 'and'
        };
        this.l10n = new L10n('image-editor', this.defaultLocale, this.parent.locale);
    };
    ToolbarModule.prototype.toolbar = function (args) {
        var parent = this.parent;
        this.updatePrivateVariables();
        switch (args.prop) {
            case 'create-toolbar':
                this.createToolbar();
                break;
            case 'create-contextual-toolbar':
                this.createContextualToolbar();
                break;
            case 'update-toolbar-items':
                this.updateToolbarItems();
                break;
            case 'refresh-toolbar':
                this.refreshToolbar(args.value['type'], args.value['isApplyBtn'], args.value['isCropping'], args.value['isZooming'], args.value['cType']);
                break;
            case 'renderQAT':
                this.renderQAT(args.value['isPenEdit']);
                break;
            case 'enable-disable-btns':
                this.enableDisableTbrBtn();
                break;
            case 'init-main-toolbar':
                this.initMainToolbar(args.value['isApplyBtn'], args.value['isDevice'], args.value['isOkBtn'], args.value['isResize'], args.value['isFrame'], args.value['isMainToolbar']);
                break;
            case 'create-bottom-toolbar':
                this.createBottomToolbar();
                break;
            case 'refresh-main-toolbar':
                this.refreshMainToolbar();
                break;
            case 'create-qa-toolbar':
                this.createQuickAccessToolbar();
                break;
            case 'destroy-qa-toolbar':
                this.destroyQuickAccessToolbar();
                break;
            case 'zoom-up-handler':
                this.zoomBtnMouseUpHandler();
                break;
            case 'refresh-dropdown-btn':
                this.refreshDropDownBtn(args.value['isDisabled']);
                break;
            case 'close-contextual-toolbar':
                this.closeContextualToolbar();
                break;
            case 'destroy-bottom-toolbar':
                this.destroyBottomToolbar();
                break;
            case 'destroy-top-toolbar':
                this.destroyTopToolbar();
                break;
            case 'destroySubComponents':
                this.destroySubComponents();
                break;
            case 'setLocale':
                this.l10n.setLocale(args.value['locale']);
                break;
            case 'setPreventZoomBtn':
                this.preventZoomBtn = args.value['isPrevent'];
                break;
            case 'getToolbarHeight':
                args.value['obj']['toolbarHeight'] = this.toolbarHeight;
                break;
            case 'setToolbarHeight':
                if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0 && parent.toolbar.indexOf('Open') > -1)) {
                    this.toolbarHeight = args.value['height'];
                }
                break;
            case 'setCurrentToolbar':
                this.currentToolbar = args.value['type'];
                break;
            case 'setSelectedFreehandColor':
                this.selFhdColor = args.value['color'];
                break;
            case 'setInitialAdjustmentValue':
                parent.initialAdjustmentValue = args.value['value'];
                break;
            case 'getCanvasFilter':
                args.value['obj']['canvasFilter'] = parent.canvasFilter;
                break;
            case 'getDefToolbarItems':
                args.value['obj']['defToolbarItems'] = this.defToolbarItems;
                break;
            case 'getPenStroke':
                this.getPenStroke(args.value['value']);
                break;
            case 'performDefToolbarClickAction':
                this.performDefTbrClick(args.value['type'], args.value['isContextualToolbar'], args.value['isDisabledAdjustment'], args.value['isDisabledFilter'], args.value['isFilterFinetune']);
                break;
            case 'setTempFilterProperties':
                parent.setTempFilterProperties();
                break;
            case 'refreshSlider':
                this.refreshSlider();
                break;
            case 'getCurrAdjustmentValue':
                parent.getCurrAdjustmentValue(args.value['type']);
                break;
            case 'setCurrAdjustmentValue':
                parent.setCurrAdjustmentValue(args.value['type'], args.value['value']);
                break;
            case 'refreshShapeDrawing':
                this.refreshShapeDrawing();
                break;
            case 'setEnableDisableUndoRedo':
                this.preventEnableDisableUr = args.value['isPrevent'];
                break;
            case 'reset':
                this.reset();
                break;
            case 'getLocaleText':
                args.value['obj']['value'] = this.l10n.getConstant(args.value['obj']['key']);
                break;
            case 'initResizeToolbar':
                this.initResizeToolbar();
                break;
            case 'getFrameToolbar':
                args.value['obj']['bool'] = this.isFrameToolbar;
                break;
            case 'resizeClick':
                this.resizeClick();
                break;
            case 'frameToolbarClick':
                this.frameToolbarClick();
                break;
            case 'performCropTransformClick':
                this.performCropTransformClick(args.value['shape'], args.value['isTransform']);
                break;
            case 'duplicateShape':
                this.duplicateShape(args.value['isPreventUndoRedo'], true);
                break;
            case 'editText':
                this.editText();
                break;
            case 'setInitialSize':
                this.initialSize = Number(args.value['value']);
                break;
            case 'widthPress':
                this.widthPress(args.value['e']);
                break;
            case 'heightPress':
                this.heightPress(args.value['e']);
                break;
            case 'widthAspectRatio':
                this.widthAspectRatio(args.value['e']);
                break;
            case 'heightAspectRatio':
                this.heightAspectRatio(args.value['e']);
                break;
            case 'cancelPan':
                this.cancelPan();
                break;
            case 'zoomInBtnMouseDownHandler':
                this.zoomInBtnMouseDownHandler(args.value['event']);
                break;
            case 'zoomOutBtnMouseDownHandler':
                this.zoomOutBtnMouseDownHandler(args.value['event']);
                break;
            case 'drawDashedLine':
                this.drawDashedLine(args.value['context']);
                break;
            case 'saveDialogClosed':
                this.saveDialogClosed(args.value['id']);
                break;
            case 'getIndex':
                this.getIndex(args.value['item']);
                break;
            case 'getRectRadius':
                this.getRectRadius(args.value['text']);
                break;
            case 'applyPreviewFilter':
                this.applyPreviewFilter();
                break;
            case 'renderSlider':
                this.renderSlider(args.value['type'], args.value['isSelect']);
                break;
            case 'zoomInBtnClickHandler':
                this.zoomInBtnClickHandler(args.value['e']);
                break;
            case 'zoomOutBtnClickHandler':
                this.zoomOutBtnClickHandler(args.value['e']);
                break;
            case 'getAdjustmentToolbarItem':
                this.getAdjustmentToolbarItem();
                break;
            case 'getFilterToolbarItem':
                this.getFilterToolbarItem();
                break;
            case 'renderCropBtn':
                this.renderCropBtn();
                break;
        }
    };
    ToolbarModule.prototype.updatePrivateVariables = function () {
        var parent = this.parent;
        this.inMemoryCanvas = parent.inMemoryCanvas;
        if (parent.lowerCanvas) {
            this.lowerContext = parent.lowerCanvas.getContext('2d');
        }
        if (parent.upperCanvas) {
            this.upperContext = parent.upperCanvas.getContext('2d');
        }
        if (this.inMemoryCanvas) {
            this.inMemoryContext = this.inMemoryCanvas.getContext('2d');
        }
    };
    ToolbarModule.prototype.reset = function () {
        var parent = this.parent;
        this.toolbarHeight = 46;
        parent.prevCurrSelectionPoint = null;
        this.zoomBtnHold = null;
        this.currToolbar = '';
        parent.cxtTbarHeight = null;
        this.currentToolbar = 'main';
        this.selFhdColor = '#42a5f5';
        parent.currentFilter = '';
        this.preventZoomBtn = parent.isCropToolbar = this.preventEnableDisableUr = this.isFrameToolbar = false;
        parent.initialAdjustmentValue = parent.canvasFilter =
            'brightness(' + 1 + ') ' + 'contrast(' + 100 + '%) ' + 'hue-rotate(' + 0 + 'deg) ' +
                'saturate(' + 100 + '%) ' + 'opacity(' + 1 + ') ' + 'blur(' + 0 + 'px) ' + 'sepia(0%) ' + 'grayscale(0%) ' + 'invert(0%)';
        parent.tempStraighten = 0;
        parent.isStraightening = false;
    };
    ToolbarModule.prototype.destroyTopToolbar = function () {
        var parent = this.parent;
        var toolbar = document.getElementById(parent.element.id + '_toolbar');
        if (this.isToolbar() && toolbar && toolbar.classList.contains('e-control')) {
            getComponent(toolbar, 'toolbar').destroy();
        }
    };
    ToolbarModule.prototype.destroyBottomToolbar = function () {
        var parent = this.parent;
        var toolbar = document.getElementById(parent.element.id + '_bottomToolbar');
        if (toolbar && toolbar.classList.contains('e-control')) {
            getComponent(toolbar, 'toolbar').destroy();
        }
    };
    ToolbarModule.prototype.isToolbar = function () {
        var parent = this.parent;
        return (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)
            || !isNullOrUndefined(parent.toolbarTemplate));
    };
    ToolbarModule.prototype.createToolbar = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            parent.element.appendChild(parent.createElement('div', {
                id: id + '_toolbarArea', className: 'e-toolbar-area'
            }));
            var toolbarItems = { cssClass: 'e-image-upload', align: 'Left', type: 'Input',
                tooltipText: this.l10n.getConstant('Browse'), template: new Uploader({ allowedExtensions: parent.uploadSettings.allowedExtensions, multiple: false }) };
            if (isNullOrUndefined(this.defToolbarItems)) {
                this.defToolbarItems = [];
            }
            this.defToolbarItems.push(toolbarItems);
            var toolbarArea = document.getElementById(id + '_toolbarArea');
            var toolbar_1 = parent.createElement('div', { id: id + '_toolbar' });
            toolbarArea.appendChild(toolbar_1);
            var uploadItems = [
                {
                    cssClass: 'e-image-upload',
                    align: 'Left', type: 'Input',
                    tooltipText: this.l10n.getConstant('Browse'),
                    template: new Uploader({
                        allowedExtensions: parent.uploadSettings.allowedExtensions,
                        multiple: false,
                        selected: function () {
                            var toolbar = document.getElementById(id + '_toolbar');
                            var bToolbar = document.getElementById(id + '_bottomToolbar');
                            if (!parent.disabled) {
                                if (Browser.isDevice) {
                                    if (_this.defToolbarItems.length > 0 && toolbar) {
                                        getComponent(toolbar, 'toolbar').destroy();
                                    }
                                    if (bToolbar) {
                                        getComponent(bToolbar, 'toolbar').destroy();
                                    }
                                    _this.initMainToolbar(false, Browser.isDevice, null);
                                    _this.createBottomToolbar();
                                }
                                else {
                                    if (_this.defToolbarItems.length > 0 && toolbar) {
                                        getComponent(toolbar, 'toolbar').destroy();
                                    }
                                    _this.initMainToolbar(false, false, null);
                                }
                            }
                        }
                    })
                }
            ];
            var toolbarObj = new Toolbar({ items: uploadItems, width: '100%',
                created: function () {
                    parent.trigger('toolbarCreated', { toolbarType: 'main' });
                },
                clicked: this.defToolbarClicked.bind(this) });
            toolbarObj.appendTo('#' + id + '_toolbar');
            this.createLeftToolbarControls();
            var mToolbar = document.getElementById(id + '_toolbar');
            if (toolbar_1) {
                this.toolbarHeight = mToolbar.clientHeight;
                if (parent.toolbar && parent.toolbar.length > 0 && parent.toolbar.indexOf('Open') === -1) {
                    var toolabr = getComponent(document.getElementById(parent.element.id + '_toolbar'), 'toolbar');
                    if (toolabr) {
                        toolabr.destroy();
                        document.getElementById(parent.element.id + '_toolbar').innerHTML = '';
                    }
                }
            }
        }
        else {
            this.toolbarHeight = 0;
        }
    };
    ToolbarModule.prototype.createContextualToolbar = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            var contextualToolbarArea = parent.createElement('div', { id: id + '_contextualToolbarArea', className: 'e-contextual-toolbar-wrapper e-hide' });
            contextualToolbarArea.style.position = 'absolute';
            parent.element.appendChild(contextualToolbarArea);
            var toolbarArea = document.getElementById(id + '_contextualToolbarArea');
            var toolbar_2 = parent.createElement('div', { id: id + '_contextualToolbar' });
            toolbarArea.appendChild(toolbar_2);
        }
    };
    ToolbarModule.prototype.createBottomToolbar = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (parent.element.querySelector('#' + id + '_bottomToolbarArea')) {
            parent.element.querySelector('#' + id + '_bottomToolbarArea').remove();
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            parent.element.appendChild(parent.createElement('div', {
                id: id + '_bottomToolbarArea', className: 'e-bottom-toolbar'
            }));
            if (!parent.toolbarTemplate) {
                var toolbarArea = document.getElementById(id + '_bottomToolbarArea');
                var toolbarElem = parent.createElement('div', {
                    id: id + '_bottomToolbar'
                });
                toolbarArea.appendChild(toolbarElem);
            }
            this.initBottomToolbar();
        }
    };
    ToolbarModule.prototype.createQuickAccessToolbar = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (parent.showQuickAccessToolbar) {
            var toolbarItems = { cssClass: 'e-image-upload', align: 'Left', type: 'Input',
                tooltipText: this.l10n.getConstant('Browse'), template: new Uploader({ allowedExtensions: parent.uploadSettings.allowedExtensions, multiple: false }) };
            if (isNullOrUndefined(this.defToolbarItems)) {
                this.defToolbarItems = [];
            }
            this.defToolbarItems.push(toolbarItems);
            var toolbarArea = document.getElementById(id + '_quickAccessToolbarArea');
            var toolbar_3 = parent.createElement('div', {
                id: id + '_quickAccessToolbar'
            });
            toolbarArea.appendChild(toolbar_3);
            var toolbarObj = new Toolbar({ clicked: this.defToolbarClicked.bind(this) });
            toolbarObj.appendTo('#' + id + '_quickAccessToolbar');
        }
    };
    ToolbarModule.prototype.initMainToolbar = function (isApplyOption, isDevice, isOkBtn, isResize, isFrame, isMainToolbar, isRedact) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (this.isToolbar()) {
            var leftItem = this.getLeftToolbarItem(isOkBtn, isResize);
            var rightItem = this.getRightToolbarItem(isOkBtn, isMainToolbar, isRedact);
            var mainItem = this.getMainToolbarItem(isApplyOption, isFrame, isRedact);
            var zoomItem = this.getZoomToolbarItem();
            if (isDevice) {
                if (isFrame || isRedact) {
                    this.defToolbarItems = mainItem;
                }
                else {
                    this.defToolbarItems = leftItem.concat(rightItem);
                }
            }
            else {
                this.defToolbarItems = leftItem.concat(mainItem, rightItem, zoomItem);
            }
            var args = { toolbarType: 'main', toolbarItems: this.defToolbarItems };
            parent.trigger('toolbarUpdating', args);
            this.defToolbarItems = args.toolbarItems;
            if (this.defToolbarItems.length > 0) {
                var toolbarObj = new Toolbar({
                    width: '100%',
                    items: this.defToolbarItems,
                    clicked: this.defToolbarClicked.bind(this),
                    created: function () {
                        if (!isDevice) {
                            _this.renderAnnotationBtn();
                        }
                        _this.wireZoomBtnEvents();
                        parent.trigger('toolbarCreated', { toolbarType: 'main' });
                    }
                });
                if ((isDevice && isFrame) || (isDevice && isRedact)) {
                    toolbarObj.appendTo('#' + id + '_bottomToolbar');
                }
                else {
                    toolbarObj.appendTo('#' + id + '_toolbar');
                }
                this.createLeftToolbarControls();
                this.enableDisableTbrBtn();
                if (this.isToolbar() && document.getElementById(id + '_toolbar')) {
                    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                    var toolbar_4 = getComponent(id + '_toolbar', 'toolbar');
                    toolbar_4.refreshOverflow();
                }
            }
        }
    };
    ToolbarModule.prototype.initBottomToolbar = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.length > 0)) {
            var items = this.getMainToolbarItem();
            var args = { toolbarType: 'bottom-toolbar', toolbarItems: items };
            parent.trigger('toolbarUpdating', args);
            items = args.toolbarItems;
            var toolbarObj = new Toolbar({ items: items, width: '100%',
                created: function () {
                    _this.renderAnnotationBtn();
                    _this.renderCropBtn();
                    _this.renderTransformBtn();
                    parent.trigger('toolbarCreated', { toolbarType: 'main' });
                },
                clicked: this.defToolbarClicked.bind(this)
            });
            toolbarObj.appendTo('#' + id + '_bottomToolbar');
            if (this.defToolbarItems.length > 0 && document.getElementById(id + '_bottomToolbar')) {
                /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                var toolbar_5 = getComponent(id + '_bottomToolbar', 'toolbar');
                toolbar_5.refreshOverflow();
            }
        }
    };
    ToolbarModule.prototype.getLeftToolbarItem = function (isOkBtn, isResize) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        if (!isOkBtn || isResize) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Open') > -1)) {
                toolbarItems.push({ id: id + '_upload', cssClass: 'e-image-upload', align: 'Left', type: 'Input', template: new Uploader({ allowedExtensions: parent.uploadSettings.allowedExtensions, multiple: false }) });
                toolbarItems.push({ visible: false, cssClass: 'e-image-position e-btn e-flat', tooltipText: this.l10n.getConstant('Browse'), align: 'Left' });
            }
            else if (Browser.isDevice && (parent.toolbar && parent.toolbar.indexOf('Open') === -1)) {
                toolbarItems.push({ visible: false, id: id + '_upload', cssClass: 'e-image-upload', align: 'Left', type: 'Input', template: new Uploader({ allowedExtensions: parent.uploadSettings.allowedExtensions, multiple: false }) });
                toolbarItems.push({ visible: false, cssClass: 'e-image-position e-btn e-flat', tooltipText: this.l10n.getConstant('Browse'), align: 'Left' });
            }
        }
        if (parent.allowUndoRedo && !isResize) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Undo') > -1)) {
                toolbarItems.push({ id: id + '_undo', prefixIcon: 'e-icons e-undo', cssClass: 'top-icon e-undo',
                    tooltipText: this.l10n.getConstant('Undo'), align: 'Left' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Redo') > -1)) {
                toolbarItems.push({ id: id + '_redo', prefixIcon: 'e-icons e-redo', cssClass: 'top-icon e-redo',
                    tooltipText: this.l10n.getConstant('Redo'), align: 'Left' });
            }
        }
        if (!this.preventZoomBtn && (parent.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar && !isResize) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('ZoomOut') > -1)) {
                toolbarItems.push({ id: id + '_zoomOut', prefixIcon: 'e-icons e-zoom-out', cssClass: 'top-icon e-dec-zoom',
                    tooltipText: this.l10n.getConstant('ZoomOut'), align: 'Left' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('ZoomIn') > -1)) {
                toolbarItems.push({ id: id + '_zoomIn', prefixIcon: 'e-icons e-zoom-in', cssClass: 'top-icon e-inc-zoom',
                    tooltipText: this.l10n.getConstant('ZoomIn'), align: 'Left' });
            }
        }
        var tempToolbarItems = this.processToolbar('left');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getRightToolbarItem = function (isOkBtn, isMainToolbar, isRedact) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        if (isOkBtn || isRedact) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        if ((isMainToolbar || !Browser.isDevice) && (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Reset') > -1))) {
            toolbarItems.push({ id: id + '_reset', prefixIcon: 'e-icons e-btn-reset', cssClass: 'top-icon e-img-reset',
                tooltipText: this.l10n.getConstant('Reset'), align: 'Right' });
        }
        if (!isOkBtn) {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Save') > -1)) {
                toolbarItems.push({ id: id + '_save', prefixIcon: 'e-icons e-btn-save', cssClass: 'e-caret-hide top-icon e-save',
                    tooltipText: this.l10n.getConstant('Save'), align: 'Right' });
            }
        }
        var tempToolbarItems = this.processToolbar('right');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getMainToolbarItem = function (isApplyOption, isFrame, isRedact) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        if (isFrame) {
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('None') > -1) || parent.toolbar.indexOf('Frame') > -1) {
                toolbarItems.push({ id: id + '_none', prefixIcon: 'e-icons e-frame-none', cssClass: 'top-icon e-frame-none',
                    tooltipText: this.l10n.getConstant('None'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Mat') > -1) || parent.toolbar.indexOf('Frame') > -1) {
                toolbarItems.push({ id: id + '_mat', prefixIcon: 'e-icons e-frame-mat', cssClass: 'top-icon e-frame-mat',
                    tooltipText: this.l10n.getConstant('Mat'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Bevel') > -1) || parent.toolbar.indexOf('Frame') > -1) {
                toolbarItems.push({ id: id + '_bevel', prefixIcon: 'e-icons e-frame-bevel', cssClass: 'top-icon e-frame-bevel',
                    tooltipText: this.l10n.getConstant('Bevel'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Line') > -1) || parent.toolbar.indexOf('Frame') > -1) {
                toolbarItems.push({ id: id + '_line', prefixIcon: 'e-icons e-frame-line', cssClass: 'top-icon e-frame-line',
                    tooltipText: this.l10n.getConstant('Line'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Inset') > -1) || parent.toolbar.indexOf('Frame') > -1) {
                toolbarItems.push({ id: id + '_inset', prefixIcon: 'e-icons e-frame-inset', cssClass: 'top-icon e-frame-inset',
                    tooltipText: this.l10n.getConstant('Inset'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Hook') > -1) || parent.toolbar.indexOf('Frame') > -1) {
                toolbarItems.push({ id: id + '_hook', prefixIcon: 'e-icons e-frame-hook', cssClass: 'top-icon e-frame-hook',
                    tooltipText: this.l10n.getConstant('Hook'), align: 'Center' });
            }
        }
        else if (isRedact) {
            toolbarItems.push({ id: id + '_redactBlur', prefixIcon: 'e-icons e-tint', cssClass: 'top-icon e-opacity',
                tooltipText: this.l10n.getConstant('Blur'), align: 'Center' });
            toolbarItems.push({ id: id + '_pixelate', prefixIcon: 'e-icons e-opacity', cssClass: 'top-icon e-opacity',
                tooltipText: this.l10n.getConstant('Pixelate'), align: 'Center' });
            toolbarItems.push({ id: id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                tooltipText: this.l10n.getConstant('Duplicate'), align: 'Center' });
            toolbarItems.push({ id: id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center' });
        }
        else {
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Crop') > -1)) {
                toolbarItems.push({ id: id + '_cropTransform', prefixIcon: 'e-icons e-crop', cssClass: 'top-icon e-crop',
                    tooltipText: this.l10n.getConstant('CropAndTransform'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Annotate') > -1)) {
                toolbarItems.push({ id: id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                    template: '<button id="' + id + '_annotationBtn"></button>' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Finetune') > -1)) {
                toolbarItems.push({ id: id + '_adjustment', prefixIcon: 'e-icons e-adjustment', cssClass: 'top-icon e-adjustment',
                    tooltipText: this.l10n.getConstant('Finetune'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Filter') > -1)) {
                toolbarItems.push({ id: id + '_filter', prefixIcon: 'e-icons e-filters', cssClass: 'top-icon e-filters',
                    tooltipText: this.l10n.getConstant('Filter'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Frame') > -1)) {
                toolbarItems.push({ id: id + '_frame', prefixIcon: 'e-icons e-border-frame', cssClass: 'top-icon e-border-frame',
                    tooltipText: this.l10n.getConstant('Frame'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Resize') > -1)) {
                toolbarItems.push({ id: id + '_resize', prefixIcon: 'e-icons e-resize', cssClass: 'top-icon e-resize',
                    tooltipText: this.l10n.getConstant('Resize'), align: 'Center' });
            }
            if (isNullOrUndefined(parent.toolbar) || (!isNullOrUndefined(parent.toolbar) && parent.toolbar.indexOf('Redact') > -1)) {
                toolbarItems.push({ id: id + '_redact', prefixIcon: 'e-icons e-redact', cssClass: 'top-icon e-opacity',
                    tooltipText: this.l10n.getConstant('Redact'), align: 'Center' });
            }
        }
        var tempToolbarItems = this.processToolbar('center');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (isApplyOption) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getZoomToolbarItem = function () {
        var toolbarItems = [];
        return toolbarItems;
    };
    ToolbarModule.prototype.updateContextualToolbar = function (type, cType, isSelect) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarArea = parent.element.querySelector('#' + id + '_toolbarArea');
        var contextualToolbarArea = parent.element.querySelector('#' + id + '_contextualToolbarArea');
        if (!contextualToolbarArea) {
            return;
        }
        contextualToolbarArea.classList.remove('e-hide');
        contextualToolbarArea.style.left = toolbarArea.offsetLeft + 'px';
        if (type === 'filter') {
            var toolbar_6 = document.getElementById(id + '_toolbar');
            if (toolbar_6 && this.defToolbarItems.length > 0) {
                getComponent(toolbar_6, 'toolbar').destroy();
            }
            if (Browser.isDevice) {
                this.initMainToolbar(false, true, true);
            }
            else {
                this.initMainToolbar(true, null, null);
            }
            this.refreshSlider();
            this.initFilterToolbarItem();
        }
        else {
            var ctxToolbar = document.querySelector('#' + id + '_contextualToolbar');
            if (ctxToolbar.classList.contains('e-control')) {
                getComponent(ctxToolbar, 'toolbar').destroy();
            }
            this.refreshSlider();
            if (type === 'frame') {
                this.initFrameToolbarItem();
            }
            else {
                this.renderSlider(cType, isSelect);
            }
        }
        if (parent.toolbarTemplate) {
            this.toolbarHeight = parent.element.querySelector('#' + id + '_toolbarArea').clientHeight;
        }
        else if (parent.element.querySelector('#' + id + '_toolbar')) {
            this.toolbarHeight = parent.element.querySelector('#' + id + '_toolbar').clientHeight;
        }
        parent.toolbarHeight = this.toolbarHeight;
        if (Browser.isDevice) {
            var cHt = contextualToolbarArea.offsetHeight + 1;
            var cusWrapper = parent.element.querySelector('#' + id + '_customizeWrapper');
            if (this.isFrameToolbar && cusWrapper) {
                cHt = cusWrapper.offsetHeight + 2;
            }
            var ht = parent.element.querySelector('#' + id + '_canvasWrapper').offsetHeight;
            contextualToolbarArea.style.top = this.toolbarHeight + 1 + ht - cHt + 'px';
            if (cType === 'straighten') {
                parent.isStraightening = true;
                var ctxToolbar = parent.element.querySelector('#' + id + '_contextualToolbarArea');
                if (ctxToolbar.style.position === 'absolute') {
                    ctxToolbar.style.position = '';
                    parent.element.insertBefore(ctxToolbar, parent.element.querySelector('#' + id + '_bottomToolbarArea'));
                    parent.update();
                    if (isSelect) {
                        parent.notify('draw', { prop: 'select', onPropertyChange: false,
                            value: { type: this.getCropTextContent(document.getElementById(id + '_cropBtn')).toLowerCase(),
                                startX: null, startY: null, width: null, height: null } });
                    }
                }
            }
        }
        else {
            contextualToolbarArea.style.top = this.toolbarHeight + 1 + 'px';
        }
    };
    ToolbarModule.prototype.processToolbar = function (position) {
        var parent = this.parent;
        var toolbarItems = [];
        if (parent.toolbar) {
            for (var i = 0, len = parent.toolbar.length; i < len; i++) {
                if (typeof (parent.toolbar[i]) === 'object') {
                    if (isNullOrUndefined(parent.toolbar[i].align)) {
                        if (position === 'left') {
                            toolbarItems.push(parent.toolbar[i]);
                        }
                    }
                    else if (parent.toolbar[i].align.toLowerCase() === position) {
                        toolbarItems.push(parent.toolbar[i]);
                    }
                }
            }
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.processSubToolbar = function (items) {
        var toolbarItems = [];
        if (items) {
            for (var i = 0, len = items.length; i < len; i++) {
                if (typeof (items[i]) === 'object') {
                    items[i].align = 'Center';
                    toolbarItems.push(items[i]);
                }
            }
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.wireZoomBtnEvents = function () {
        var zoomIn = document.querySelector('#' + this.parent.element.id + '_zoomIn');
        var zoomOut = document.querySelector('#' + this.parent.element.id + '_zoomOut');
        if (zoomIn) {
            zoomIn.addEventListener('mousedown', this.zoomInBtnMouseDownHandler.bind(this));
            zoomIn.addEventListener('mouseup', this.zoomBtnMouseUpHandler.bind(this));
            zoomIn.addEventListener('click', this.zoomInBtnClickHandler.bind(this));
        }
        if (zoomOut) {
            zoomOut.addEventListener('mousedown', this.zoomOutBtnMouseDownHandler.bind(this));
            zoomOut.addEventListener('mouseup', this.zoomBtnMouseUpHandler.bind(this));
            zoomOut.addEventListener('click', this.zoomOutBtnClickHandler.bind(this));
        }
    };
    ToolbarModule.prototype.widthPress = function (e) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (e.keyCode === 109) {
            e.preventDefault();
            return;
        }
    };
    ToolbarModule.prototype.heightPress = function (e) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (e.keyCode === 109) {
            e.preventDefault();
            return;
        }
    };
    ToolbarModule.prototype.widthAspectRatio = function (e) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (e.keyCode === 109 || e.keyCode === 9) {
            return;
        }
        var parent = this.parent;
        var id = parent.element.id;
        var aspectRatioHeight = parent.element.querySelector('#' + id + '_resizeHeight');
        var aspectRatioWidth = parent.element.querySelector('#' + id + '_resizeWidth');
        var icon = parent.element.querySelector('#' + id + '_aspectratio');
        var originalWidth = parent.img.destWidth;
        var originalHeight = parent.img.destHeight;
        var aspectRatioHeightValue = parseFloat(aspectRatioHeight.value);
        var val = aspectRatioHeightValue / (originalHeight / originalWidth);
        var width = val % 1 >= 0.5 || val % 1 <= -0.5 ? Math.round(val) : (val < 0) ? Math.ceil(val) : Math.floor(val);
        var widthNumeric = getComponent(aspectRatioWidth, 'numerictextbox');
        var heightNumeric = getComponent(aspectRatioWidth, 'numerictextbox');
        if (icon) {
            if (width != null && !isNaN(width)) {
                if (isNullOrUndefined((widthNumeric).value)) {
                    (widthNumeric).placeholder = width + ' px';
                    aspectRatioWidth.placeholder = width.toString() + ' px';
                }
                else {
                    (widthNumeric).value = width;
                    aspectRatioWidth.value = width.toString() + ' px';
                }
            }
            else {
                if (isNullOrUndefined((widthNumeric).value)) {
                    (widthNumeric).placeholder = '0 px';
                    aspectRatioWidth.placeholder = '0 px';
                    if (isNullOrUndefined(heightNumeric.value) && !isNullOrUndefined(heightNumeric.placeholder)) {
                        (widthNumeric).placeholder = "" + parent.img.srcWidth;
                        aspectRatioWidth.placeholder = "" + parent.img.srcWidth;
                    }
                }
                else {
                    (widthNumeric).value = 0;
                    aspectRatioWidth.value = '0 px';
                }
            }
        }
    };
    ToolbarModule.prototype.heightAspectRatio = function (e) {
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        if (e.keyCode === 109 || e.keyCode === 9) {
            return;
        }
        var parent = this.parent;
        var id = parent.element.id;
        var aspectRatioHeight = parent.element.querySelector('#' + id + '_resizeHeight');
        var aspectRatioWidth = parent.element.querySelector('#' + id + '_resizeWidth');
        var icon = parent.element.querySelector('#' + id + '_aspectratio');
        var originalWidth = parent.img.destWidth;
        var originalHeight = parent.img.destHeight;
        var aspectRatioWidthValue = parseFloat(aspectRatioWidth.value);
        var value = aspectRatioWidthValue / (originalWidth / originalHeight);
        var ht = value % 1 >= 0.5 || value % 1 <= -0.5 ? Math.round(value) : (value < 0) ? Math.ceil(value) : Math.floor(value);
        var heightNumeric = getComponent(aspectRatioHeight, 'numerictextbox');
        var widthNumeric = getComponent(aspectRatioWidth, 'numerictextbox');
        if (icon) {
            if (!isNaN(ht)) {
                if (isNullOrUndefined((heightNumeric).value)) {
                    (heightNumeric).placeholder = ht + ' px';
                    aspectRatioHeight.placeholder = ht.toString() + ' px';
                }
                else {
                    (heightNumeric).value = ht;
                    aspectRatioHeight.value = ht.toString() + ' px';
                }
            }
            else {
                if (isNullOrUndefined((heightNumeric).value)) {
                    (heightNumeric).placeholder = '0 px';
                    aspectRatioHeight.placeholder = '0 px';
                    if (isNullOrUndefined(widthNumeric.value) && !isNullOrUndefined(widthNumeric.placeholder)) {
                        (heightNumeric).placeholder = "" + parent.img.srcHeight;
                        aspectRatioHeight.placeholder = "" + parent.img.srcHeight;
                    }
                }
                else {
                    (heightNumeric).value = 0;
                    aspectRatioHeight.value = '0 px';
                }
            }
        }
    };
    ToolbarModule.prototype.getResizeToolbarItem = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var isResize = parent.aspectWidth && parent.aspectHeight ? true : false;
        var width = this.parent.transform.degree % 90 === 0 && this.parent.transform.degree % 180 !== 0 ?
            Math.ceil(this.parent.img.srcHeight).toString() : Math.ceil(this.parent.img.srcWidth).toString();
        var height = this.parent.transform.degree % 90 === 0 && this.parent.transform.degree % 180 !== 0 ?
            Math.ceil(this.parent.img.srcWidth).toString() : Math.ceil(this.parent.img.srcHeight).toString();
        var toolbarItems = [];
        var spanWidth = document.createElement('span');
        spanWidth.innerHTML = this.l10n.getConstant('W');
        toolbarItems.push({ id: id + '_width', cssClass: 'e-ie-resize-width', template: spanWidth, align: 'Center' });
        toolbarItems.push({ id: id + '_resizeWidth', prefixIcon: 'e-icons e-anti-clock-wise',
            tooltipText: this.l10n.getConstant('Width'), align: 'Center', type: 'Input', template: new NumericTextBox({ width: 75, htmlAttributes: { maxLength: '4' },
                showSpinButton: false, value: isResize ? parent.aspectWidth : null,
                placeholder: isResize ? null : width, format: '###.## px' })
        });
        var spanHeight = document.createElement('span');
        spanHeight.innerHTML = this.l10n.getConstant('H');
        toolbarItems.push({ id: id + '_height', cssClass: 'e-ie-resize-height', template: spanHeight, align: 'Center' });
        toolbarItems.push({ id: id + '_resizeHeight', prefixIcon: 'e-icons e-clock-wise',
            tooltipText: this.l10n.getConstant('Height'), align: 'Center', type: 'Input', template: new NumericTextBox({ width: 75, htmlAttributes: { maxLength: '4' },
                showSpinButton: false, value: isResize ? parent.aspectHeight : null,
                placeholder: isResize ? null : height, format: '###.## px' })
        });
        if (!this.isAspectRatio) {
            toolbarItems.push({ id: id + '_aspectratio', prefixIcon: 'e-icons e-lock', align: 'Center',
                tooltipText: this.l10n.getConstant('AspectRatio'), type: 'Button', tabIndex: 0 });
            this.isAspectRatio = true;
        }
        else {
            toolbarItems.push({ id: id + '_nonaspectratio', prefixIcon: 'e-icons e-unlock', align: 'Center', tooltipText: this.l10n.getConstant('AspectRatio'), type: 'Button' });
            this.isAspectRatio = false;
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.initResizeToolbar = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var leftItem = this.getLeftToolbarItem(false, true);
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getResizeToolbarItem();
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var args = { toolbarType: 'resize', toolbarItems: this.defToolbarItems };
        parent.trigger('toolbarUpdating', args);
        this.defToolbarItems = args.toolbarItems;
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.wireResizeBtnEvents();
                parent.trigger('toolbarCreated', { toolbarType: 'shapes' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && (!isNullOrUndefined(document.getElementById(id + '_bottomToolbar')))) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && (!isNullOrUndefined(document.getElementById(id + '_toolbar')))) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + id + '_toolbar');
        }
        parent.isResize = false;
        this.enableDisableTbrBtn();
        parent.isResize = true;
        parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
    };
    ToolbarModule.prototype.wireResizeBtnEvents = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var aspectRatioHeight = parent.element.querySelector('#' + id + '_resizeHeight');
        var aspectRatioWidth = parent.element.querySelector('#' + id + '_resizeWidth');
        if (!isNullOrUndefined(aspectRatioHeight)) {
            aspectRatioHeight.addEventListener('keydown', this.widthPress.bind(this));
            aspectRatioWidth.addEventListener('keyup', this.heightAspectRatio.bind(this));
        }
        if (!isNullOrUndefined(aspectRatioWidth)) {
            aspectRatioWidth.addEventListener('keydown', this.heightPress.bind(this));
            aspectRatioHeight.addEventListener('keyup', this.widthAspectRatio.bind(this));
        }
    };
    ToolbarModule.prototype.enableDisableTbrBtn = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (!this.preventEnableDisableUr) {
            var object = { appliedUndoRedoColl: [] };
            parent.notify('undo-redo', { prop: 'getAppliedUndoRedoColl', value: { obj: object } });
            var undoRedoObj = { undoRedoStep: null };
            parent.notify('undo-redo', { prop: 'getUndoRedoStep', value: { obj: undoRedoObj } });
            var undo = parent.element.querySelector('#' + id + '_undo');
            if (undo && undoRedoObj['undoRedoStep'] === 0) {
                undo.classList.add('e-disabled');
                undo.parentElement.classList.add('e-overlay');
            }
            else if (undo && undoRedoObj['undoRedoStep'] > 0) {
                undo.classList.remove('e-disabled');
                undo.parentElement.classList.remove('e-overlay');
            }
            var redo = parent.element.querySelector('#' + id + '_redo');
            if (redo && (undoRedoObj['undoRedoStep'] === object['appliedUndoRedoColl'].length)) {
                redo.classList.add('e-disabled');
                redo.parentElement.classList.add('e-overlay');
            }
            else if (redo && (undoRedoObj['undoRedoStep'] === 0 && object['appliedUndoRedoColl'].length > 0)) {
                redo.classList.remove('e-disabled');
                redo.parentElement.classList.remove('e-overlay');
            }
            else if (redo && undoRedoObj['undoRedoStep'] > 0) {
                redo.classList.remove('e-disabled');
                redo.parentElement.classList.remove('e-overlay');
            }
        }
        var zoomIn = document.querySelector('#' + id + '_zoomIn');
        if (zoomIn && parent.zoomSettings.zoomFactor >= parent.zoomSettings.maxZoomFactor) {
            zoomIn.classList.add('e-disabled');
            zoomIn.parentElement.classList.add('e-overlay');
        }
        else if (zoomIn) {
            zoomIn.classList.remove('e-disabled');
            zoomIn.parentElement.classList.remove('e-overlay');
        }
        var zoomOut = document.querySelector('#' + id + '_zoomOut');
        if (zoomOut && parent.zoomSettings.zoomFactor <= parent.zoomSettings.minZoomFactor) {
            zoomOut.classList.add('e-disabled');
            zoomOut.parentElement.classList.add('e-overlay');
        }
        else if (zoomOut) {
            zoomOut.classList.remove('e-disabled');
            zoomOut.parentElement.classList.remove('e-overlay');
        }
        var frame = document.querySelector('#' + id + '_frame');
        if (frame && ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop)) {
            frame.classList.add('e-overlay');
        }
        else if (frame) {
            frame.classList.remove('e-overlay');
        }
        var ratio = document.querySelector('#' + id + '_aspectratio');
        if (ratio && ((parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle') || parent.isCircleCrop)) {
            ratio.classList.add('e-overlay');
        }
        else if (ratio) {
            ratio.classList.remove('e-overlay');
        }
    };
    ToolbarModule.prototype.createLeftToolbarControls = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (this.defToolbarItems !== undefined && this.defToolbarItems.length > 0 &&
            (document.getElementById(id + '_toolbar'))) {
            var uploadDiv = document.getElementById(id + '_toolbar')
                .querySelector('.e-image-upload');
            if (uploadDiv) {
                var uploadElem = uploadDiv.getElementsByTagName('input')[0];
                var uploadBtnElem = uploadDiv.getElementsByTagName('button')[0];
                uploadBtnElem.className = 'e-tbar-btn e-tbtn-txt top-icon';
                uploadBtnElem.innerHTML = '';
                uploadBtnElem.title = this.l10n.getConstant('Browse');
                uploadBtnElem.appendChild(parent.createElement('span', {
                    className: 'e-btn-icon e-icons e-upload-icon e-icon-left'
                }));
                uploadElem.onchange = this.fileSelect.bind(this, uploadElem);
            }
        }
    };
    ToolbarModule.prototype.fileSelect = function (inputElement, args) {
        var parent = this.parent;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var type = inputElement.files[0].type.split('/')[1];
        var filesTypes = this.parent.getExtensionArray();
        var isJPG = ((type === 'jpg' || type === 'jpeg') &&
            (parent.uploadSettings.allowedExtensions.indexOf('jpg') > -1 ||
                parent.uploadSettings.allowedExtensions.indexOf('jpeg') > -1));
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.fileName = inputElement.files[0].name.split('.')[0];
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var size = inputElement.files[0].size;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        this.parent.notify('toolbar', { prop: 'setInitialSize', value: { value: inputElement.files[0].size } });
        if ((filesTypes.indexOf(type) > -1 || isJPG || (type.indexOf('svg') > -1 && filesTypes.indexOf('svg') > -1)) &&
            (!this.parent.uploadSettings.minFileSize || size > this.parent.uploadSettings.minFileSize) &&
            (!this.parent.uploadSettings.maxFileSize || size < this.parent.uploadSettings.maxFileSize)) {
            this.parent.notify('draw', { prop: 'fileSelect', value: { inputElement: inputElement, args: args } });
        }
        else {
            if (!this.parent.isImageLoaded) {
                this.destroyTopToolbar();
                this.createToolbar();
                if (Browser.isDevice) {
                    this.destroyBottomToolbar();
                }
            }
            this.parent.showDialogPopup('unsupported', !((filesTypes.indexOf(type) > -1 || isJPG || (type.indexOf('svg') > -1 && filesTypes.indexOf('svg') > -1))));
        }
    };
    ToolbarModule.prototype.triggerTbarClickEvent = function (args) {
        var clickEvent = { item: args.item, originalEvent: args.event };
        this.parent.trigger('toolbarItemClicked', clickEvent);
    };
    ToolbarModule.prototype.renderAnnotationBtn = function (isContextualToolbar) {
        var _this = this;
        var parent = this.parent;
        var isCustomized = false;
        var items = [];
        var id = parent.element.id;
        var defItems = ['Ellipse', 'Arrow', 'Line', 'Rectangle', 'Pen', 'Path', 'Text', 'Image'];
        if (parent.toolbar) {
            for (var i = 0; i < defItems.length; i++) {
                if (parent.toolbar.indexOf(defItems[i]) !== -1) {
                    isCustomized = true;
                    break;
                }
            }
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Pen') > -1)) {
            items.push({ text: this.l10n.getConstant('Pen'), id: 'pen', iconCss: 'e-icons e-free-pen' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Line') > -1)) {
            items.push({ text: this.l10n.getConstant('Line'), id: 'line', iconCss: 'e-icons e-line' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Rectangle') > -1)) {
            items.push({ text: this.l10n.getConstant('Rectangle'), id: 'rectangle', iconCss: 'e-icons e-rectangle' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Ellipse') > -1)) {
            items.push({ text: this.l10n.getConstant('Ellipse'), id: 'ellipse', iconCss: 'e-icons e-circle' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Arrow') > -1)) {
            items.push({ text: this.l10n.getConstant('Arrow'), id: 'arrow', iconCss: 'e-icons e-arrow-right-up' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Path') > -1)) {
            items.push({ text: this.l10n.getConstant('Path'), id: 'path', iconCss: 'e-icons e-critical-path' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Text') > -1)) {
            items.push({ text: this.l10n.getConstant('Text'), id: 'text', iconCss: 'e-icons e-add-text' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Image') > -1)) {
            items.push({ text: this.l10n.getConstant('Image'), id: 'image', iconCss: 'e-icons e-image' });
        }
        var obj = { freehandDrawSelectedId: null };
        parent.notify('freehand-draw', { prop: 'getFreehandDrawSelectedId', onPropertyChange: false, value: { obj: obj } });
        var toolbarId = Browser.isDevice ? '#' + id + '_bottomToolbar ' + '#' + id : '#' + id;
        this.enableDisableCloneBtn(toolbarId, obj);
        var iconCss = isContextualToolbar ? this.getCurrentShapeIcon(parent.activeObj.shape) : 'e-annotation';
        var drpDownBtn = new DropDownButton({ items: items, iconCss: 'e-icons ' + iconCss,
            cssClass: 'e-image-popup',
            open: function (args) {
                if (parent.currObjType.isFiltered || parent.currObjType.isRedact) {
                    parent.okBtn();
                    parent.element.querySelector('#' + id + '_annotationBtn').click();
                }
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                if (parent.activeObj.shape) {
                    document.getElementById(parent.activeObj.shape).classList.add('e-selected');
                }
                else if (parent.togglePen) {
                    document.getElementById('pen').classList.add('e-selected');
                }
            },
            select: function (args) {
                parent.noPushUndo = false;
                _this.triggerTbarClickEvent(args);
                parent.okBtn();
                var isCropSelection = false;
                var splitWords;
                if (parent.activeObj.shape !== undefined) {
                    splitWords = parent.activeObj.shape.split('-');
                }
                if (splitWords === undefined && parent.currObjType.isCustomCrop) {
                    isCropSelection = true;
                }
                else if (splitWords !== undefined && splitWords[0] === 'crop') {
                    isCropSelection = true;
                }
                parent.currObjType.isCustomCrop = false;
                if (isCropSelection || parent.togglePan) {
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                    _this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                    _this.refreshToolbar('main');
                }
                var obj = { currentFreehandDrawIndex: null };
                parent.notify('freehand-draw', { prop: 'getCurrentFreehandDrawIndex', value: { obj: obj } });
                var prevObj = { shapeSettingsObj: {} };
                var shapeSettings;
                var shapeChangingArgs;
                var shapes = ['ellipse', 'rectangle', 'text', 'image'];
                var allowOutofBound;
                drpDownBtn.iconCss = 'e-icons ' + _this.getCurrentShapeIcon(args.item.id);
                parent.notify('draw', { prop: 'updateTempObjColl' });
                parent.notify('draw', { prop: 'updateTempPointColl' });
                var penStrokeWidthObj = { penStrokeWidth: 2 };
                switch (args.item.id) {
                    case 'pen':
                        parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: penStrokeWidthObj } });
                        parent.notify('draw', { prop: 'setTempStrokeWidth', value: { strokeWidth: penStrokeWidthObj['penStrokeWidth'] } });
                        parent.drawingShape = null;
                        parent.notify('draw', { prop: 'setTempFreehandCounter', value: { tempFreehandCounter: parent.freehandCounter } });
                        parent.notify('draw', { prop: 'setTempCurrentFreehandDrawIndex', value: { tempCurrentFreehandDrawIndex: obj['currentFreehandDrawIndex'] } });
                        _this.currentToolbar = 'pen';
                        parent.freeHandDraw(true);
                        parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: prevObj } });
                        shapeSettings = prevObj['shapeSettingsObj'];
                        parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: penStrokeWidthObj } });
                        shapeSettings.strokeWidth = penStrokeWidthObj['penStrokeWidth'];
                        shapeSettings.type = ShapeType.FreehandDraw;
                        shapeChangingArgs = { cancel: false, action: 'insert', previousShapeSettings: shapeSettings,
                            currentShapeSettings: shapeSettings };
                        parent.notify('freehand-draw', { prop: 'triggerShapeChanging', value: { shapeChangingArgs: shapeChangingArgs } });
                        break;
                    case 'text':
                        _this.currentToolbar = 'text';
                        parent.drawingShape = args.item.id;
                        _this.currentToolbar = 'text';
                        _this.setInitialShapeSettings(args);
                        parent.notify('selection', { prop: 'annotate', value: { shape: args.item.id } });
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'text',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        break;
                    case 'image':
                        parent.drawingShape = null;
                        _this.currentToolbar = 'shapes';
                        parent.element.querySelector('#' + id + '_fileUpload').click();
                        break;
                    case 'ellipse':
                    case 'arrow':
                    case 'line':
                    case 'rectangle':
                    case 'path':
                        parent.drawingShape = args.item.id;
                        _this.currentToolbar = 'shapes';
                        _this.setInitialShapeSettings(args);
                        parent.notify('selection', { prop: 'annotate', value: { shape: args.item.id } });
                        parent.notify('toolbar', { prop: 'refresh-toolbar', onPropertyChange: false, value: { type: 'shapes',
                                isApplyBtn: null, isCropping: null, isZooming: null, cType: null } });
                        parent.notify('selection', { prop: 'updatePrevShapeSettings', onPropertyChange: false, value: { obj: prevObj } });
                        shapeSettings = prevObj['shapeSettingsObj'];
                        allowOutofBound = shapes.indexOf(_this.parent.activeObj.shape) !== -1 ? false : true;
                        shapeChangingArgs = { cancel: false, action: 'insert', previousShapeSettings: shapeSettings,
                            currentShapeSettings: shapeSettings, allowShapeOverflow: allowOutofBound };
                        parent.trigger('shapeChanging', shapeChangingArgs);
                        parent.editCompleteArgs = shapeChangingArgs;
                        parent.notify('shape', { prop: 'updateShapeChangeEventArgs', value: { shapeSettings: shapeChangingArgs.currentShapeSettings } });
                        break;
                }
                _this.updateToolbarItems();
                var tempTogglePen = parent.togglePen;
                if (args.item.id === 'pen') {
                    parent.togglePen = false;
                }
                parent.notify('draw', { prop: 'redrawDownScale' });
                parent.togglePen = tempTogglePen;
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_annotationBtn');
    };
    ToolbarModule.prototype.enableDisableCloneBtn = function (toolbarId, obj) {
        var parent = this.parent;
        var isDummyTextClick = false;
        var width = Math.floor(parent.activeObj.activePoint.width);
        if (parent.activeObj.shape && parent.activeObj.shape === 'text' &&
            parent.activeObj.textSettings.fontSize === 11 && (width === 55 || (parent.activeObj.textSettings.bold && width === 58)) &&
            Math.floor(parent.activeObj.activePoint.height) === 11) {
            isDummyTextClick = true;
        }
        var duplicateElement = document.querySelector(toolbarId + '_duplicate');
        var removeElement = document.querySelector(toolbarId + '_remove');
        var editTextElement = document.querySelector(toolbarId + '_editText');
        var zOrderElement = document.querySelector(toolbarId + '_zOrderBtn');
        if (isDummyTextClick || (parent.activeObj.activePoint.width === 0 && parent.activeObj.activePoint.height === 0) &&
            (isNullOrUndefined(parent.activeObj.pointColl) || (parent.activeObj.pointColl
                && parent.activeObj.pointColl.length === 0)) &&
            isNullOrUndefined(obj['freehandDrawSelectedId'])) {
            if (duplicateElement) {
                duplicateElement.classList.add('e-overlay');
            }
            if (removeElement) {
                removeElement.classList.add('e-overlay');
            }
            if (editTextElement) {
                editTextElement.classList.add('e-overlay');
            }
            if (zOrderElement) {
                zOrderElement.classList.add('e-overlay');
            }
        }
        else {
            if (duplicateElement) {
                duplicateElement.classList.remove('e-overlay');
            }
            if (removeElement) {
                removeElement.classList.remove('e-overlay');
            }
            if (editTextElement) {
                editTextElement.classList.remove('e-overlay');
            }
            if (zOrderElement) {
                zOrderElement.classList.remove('e-overlay');
            }
        }
        if (zOrderElement && (parent.shapeColl.length === 0 || (obj['freehandDrawSelectedId'] && parent.shapeColl.length === 1))) {
            zOrderElement.classList.add('e-overlay');
        }
    };
    ToolbarModule.prototype.renderStraightenSlider = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if ((isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Straightening') > -1)) &&
            parent.element.querySelector('#' + id + '_straightenSlider')) {
            var slider = this.createSlider(-45, 45, parent.cropObj.straighten, 'straighten');
            slider.appendTo('#' + id + '_straightenSlider');
            var sliderHandle = slider.element.querySelector('.e-handle');
            if (sliderHandle && !Browser.isDevice) {
                sliderHandle.addEventListener('mousedown', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
                sliderHandle.addEventListener('touchstart', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        }
    };
    ToolbarModule.prototype.renderCropBtn = function (shapeString) {
        var _this = this;
        var parent = this.parent;
        var items = [];
        var isCustomized = false;
        var defItems = ['CustomSelection', 'CircleSelection', 'SquareSelection', 'RatioSelection'];
        if (parent.toolbar) {
            for (var i = 0; i < defItems.length; i++) {
                if (parent.toolbar.indexOf(defItems[i]) !== -1) {
                    isCustomized = true;
                    break;
                }
            }
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('CustomSelection') > -1)) {
            items.push({ text: this.l10n.getConstant('Custom'), id: 'custom', iconCss: 'e-icons e-custom' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('CircleSelection') > -1)) {
            items.push({ text: this.l10n.getConstant('Circle'), id: 'circle', iconCss: 'e-icons e-circle' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('SquareSelection') > -1)) {
            items.push({ text: this.l10n.getConstant('Square'), id: 'square', iconCss: 'e-icons e-square' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('RatioSelection') > -1)) {
            items.push({ text: '2:3', id: '2:3', iconCss: 'e-icons e-custom-f' });
            items.push({ text: '3:2', id: '3:2', iconCss: 'e-icons e-custom-a' });
            items.push({ text: '3:4', id: '3:4', iconCss: 'e-icons e-custom-g' });
            items.push({ text: '4:3', id: '4:3', iconCss: 'e-icons e-custom-b' });
            items.push({ text: '4:5', id: '4:5', iconCss: 'e-icons e-custom-h' });
            items.push({ text: '5:4', id: '5:4', iconCss: 'e-icons e-custom-c' });
            items.push({ text: '5:7', id: '5:7', iconCss: 'e-icons e-custom-i' });
            items.push({ text: '7:5', id: '7:5', iconCss: 'e-icons e-custom-d' });
            items.push({ text: '9:16', id: '9:16', iconCss: 'e-icons e-custom-j' });
            items.push({ text: '16:9', id: '16:9', iconCss: 'e-icons e-custom-e' });
        }
        var iconCss;
        var shape;
        if (shapeString) {
            iconCss = this.getCurrentShapeIcon(shapeString);
            shape = shapeString;
        }
        else if (parent.activeObj.shape &&
            (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) ||
            (parent.activeObj.shape === 'path' && parent.activeObj.pointColl.length > 0)) {
            iconCss = this.getCurrentShapeIcon(parent.activeObj.shape);
            shape = parent.activeObj.shape;
        }
        else if (parent.currSelectionPoint) {
            iconCss = this.getCurrentShapeIcon(parent.currSelectionPoint.shape);
            shape = parent.currSelectionPoint.shape;
        }
        else {
            iconCss = items[0].iconCss;
            shape = items[0].id;
        }
        var drpDownBtn = new DropDownButton({
            open: function (args) {
                if (parent.togglePan) {
                    _this.cancelPan();
                }
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                if (parent.activeObj.shape && parent.activeObj.shape.split('-').length > 1) {
                    var elem = document.getElementById(parent.activeObj.shape.split('-')[1]);
                    if (elem) {
                        elem.classList.add('e-selected');
                        elem.focus();
                    }
                }
                parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
            },
            items: items,
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                _this.cropSelect(args);
                drpDownBtn.iconCss = 'e-icons ' + _this.getCurrentShapeIcon('crop-' + args.item.id);
                drpDownBtn.content = Browser.isDevice ? null : parent.toPascalCase(args.item.id);
            },
            iconCss: 'e-icons ' + iconCss, cssClass: 'e-image-popup e-ie-crop-ddb-popup',
            content: Browser.isDevice ? null : parent.toPascalCase(shape.replace('crop-', ''))
        });
        drpDownBtn.appendTo('#' + parent.element.id + '_cropBtn');
    };
    ToolbarModule.prototype.renderTransformBtn = function () {
        var _this = this;
        var parent = this.parent;
        var items = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('RotateLeft') > -1)) {
            items.push({ text: this.l10n.getConstant('RotateLeft'), id: 'rotateleft', iconCss: 'e-icons e-anti-clock-wise' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('RotateRight') > -1)) {
            items.push({ text: this.l10n.getConstant('RotateRight'), id: 'rotateright', iconCss: 'e-icons e-clock-wise' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('FlipHorizontal') > -1)) {
            items.push({ text: this.l10n.getConstant('HorizontalFlip'), id: 'horizontalflip', iconCss: 'e-icons e-horizontal-flip' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('FlipVertical') > -1)) {
            items.push({ text: this.l10n.getConstant('VerticalFlip'), id: 'verticalflip', iconCss: 'e-icons e-vertical-flip' });
        }
        var drpDownBtn = new DropDownButton({
            open: function (args) {
                if (Browser.isDevice) {
                    var elem = args.element.parentElement;
                    var ht = elem.offsetHeight;
                    elem.style.display = 'none';
                    elem.style.top = drpDownBtn.element.getBoundingClientRect().top - ht + 'px';
                    elem.style.display = 'block';
                }
            },
            items: items,
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                parent.transformSelect.bind(_this);
            },
            iconCss: 'e-icons e-transform', cssClass: 'e-image-popup'
        });
        drpDownBtn.appendTo('#' + parent.element.id + '_transformBtn');
    };
    ToolbarModule.prototype.saveDialogPopup = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var quality = ['Good', 'Great', 'Highest'];
        parent.element.appendChild(parent.createElement('div', { id: id + '_saveDialog' }));
        var dialogContent = parent.createElement('div', {
            id: id + '_dialogContent'
        });
        dialogContent.style.display = 'flex';
        var dialogImgContent = dialogContent.appendChild(parent.createElement('div', {
            id: id + '_dialogImgContent', className: 'e-ie-dlg-img-content'
        }));
        dialogImgContent.appendChild(parent.createElement('canvas', {
            id: id + '_imgPic', className: 'e-ie-img-dlg-canvas'
        }));
        var imageNameContainer = dialogImgContent.appendChild(parent.createElement('div', {
            id: id + '_imageNameContainer', className: 'e-ie-img-size'
        }));
        imageNameContainer.appendChild(parent.createElement('span', {
            id: id + '_imageNameLabel', className: 'e-ie-quality-info'
        }));
        var dialogRightContent = dialogContent.appendChild(parent.createElement('div', {
            id: id + '_dialogRightContent', className: 'e-ie-dlg-right-content'
        }));
        var imageNameDiv = dialogRightContent.appendChild(parent.createElement('div', {
            id: id + '_namediv', className: 'e-ie-img-save-name'
        }));
        imageNameDiv.appendChild(parent.createElement('span', {
            id: id + '_labelImgname', className: 'e-ie-img-label-name', innerHTML: this.l10n.getConstant('ImageName')
        }));
        imageNameDiv.appendChild(parent.createElement('input', {
            id: id + '_imgNametext', className: 'e-ie-img-input', attrs: { type: 'text' }
        }));
        var formatNameDiv = dialogRightContent.appendChild(parent.createElement('div', {
            id: id + '_imgNamediv', className: 'e-ie-img-save-dlg'
        }));
        formatNameDiv.appendChild(parent.createElement('span', {
            id: id + '_labelname', className: 'e-ie-img-label-name', innerHTML: this.l10n.getConstant('Format')
        }));
        formatNameDiv.appendChild(parent.createElement('button', {
            id: id + '_saveDropdownbtn', attrs: { tabindex: '1' }
        }));
        var qualityNameDiv = dialogRightContent.appendChild(parent.createElement('div', {
            id: id + '_imgQualitydiv', className: 'e-ie-img-quality-name'
        }));
        var qualityDiv = parent.createElement('div', {
            id: id + '_qualityContainer'
        });
        qualityDiv.appendChild(parent.createElement('span', {
            id: id + '_qualityLabel', className: 'e-ie-img-quality-label',
            innerHTML: this.l10n.getConstant('Quality')
        }));
        qualityDiv.appendChild(parent.createElement('span', {
            id: id + '_qualityInfo', className: 'e-circle-info e-icons e-ie-quality-span',
            attrs: { title: this.l10n.getConstant('QualityInfo') }
        }));
        var qualityValueElem = qualityDiv.appendChild(parent.createElement('div', {
            id: id + '_imgsizeSpan',
            className: 'e-ie-img-size-value-span'
        }));
        qualityValueElem.appendChild(parent.createElement('span', {
            id: id + '_imgsizeValueSpan', className: ''
        }));
        qualityNameDiv.appendChild(qualityDiv);
        var qualityOptionDiv = parent.createElement('div', {
            id: id + '_qualityOptionContainer', className: 'e-ie-quality-option-container'
        });
        var buttonGroup = qualityNameDiv.appendChild(parent.createElement('div', {
            id: id + '_qualityButtonGroup', className: 'e-btn-group'
        }));
        // eslint-disable-next-line @typescript-eslint/tslint/config
        quality.forEach(function (option) {
            var input = document.createElement('input');
            input.type = 'radio';
            input.id = id + '_' + option.toLowerCase();
            input.name = 'quality';
            input.value = option.toLowerCase();
            var label = document.createElement('label');
            label.className = 'e-btn';
            label.htmlFor = option.toLowerCase();
            label.textContent = _this.l10n.getConstant(option);
            buttonGroup.appendChild(input);
            buttonGroup.appendChild(label);
        });
        qualityOptionDiv.appendChild(buttonGroup);
        qualityOptionDiv.appendChild(parent.createElement('div', {
            id: id + '_qualitySlider', className: 'e-ie-img-quality-slider'
        }));
        qualityOptionDiv.appendChild(parent.createElement('button', { id: id + '_qualitybuttonIcon', className: 'e-ie-img-icon-button', attrs: { type: 'button' } }));
        qualityNameDiv.appendChild(qualityOptionDiv);
        if (Browser.isDevice) {
            dialogRightContent.appendChild(parent.createElement('span', {
                id: id + '_qualitySize', className: 'e-ie-img-quality-size'
            }));
        }
        parent.element.querySelector('#' + id + '_saveDialog').style.display = 'block';
        parent.element.appendChild(dialogContent);
        var dialog = new Dialog({
            target: parent.element,
            header: this.l10n.getConstant('SaveAs'),
            closeOnEscape: true, content: document.getElementById(id + '_dialogContent'),
            width: Browser.isDevice ? '345px' : '570px', isModal: true, animationSettings: { effect: 'Zoom' }, beforeOpen: this.onBeforeopen(),
            close: this.saveDialogClosed.bind(this, id),
            cssClass: 'e-ie-save-dialog',
            buttons: [
                {
                    'click': function () {
                        dialog.hide();
                    },
                    buttonModel: {
                        content: this.l10n.getConstant('Close'), cssClass: 'e-save-cancel-btn'
                    }
                },
                {
                    'click': function () {
                        _this.download();
                        dialog.hide();
                        _this.isSlider = false;
                    },
                    buttonModel: {
                        isPrimary: true, content: this.l10n.getConstant('Download'), cssClass: 'e-flat e-save-download-btn'
                    }
                }
            ]
        });
        dialog.appendTo('#' + id + '_saveDialog');
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    ToolbarModule.prototype.saveDialogClosed = function (id) {
        if (getComponent(document.getElementById(id + '_saveDropdownbtn'), 'dropdownbutton')) {
            getComponent(document.getElementById(id + '_saveDropdownbtn'), 'dropdownbutton').destroy();
        }
        this.isSlider = false;
        if (document.querySelector('#' + id + '_qualityButtonGroup') &&
            document.querySelector('#' + id + '_qualitySlider')) {
            document.querySelector('#' + id + '_qualityButtonGroup').remove();
            document.querySelector('#' + id + '_qualitySlider').remove();
            document.querySelector('#' + id + '_imgsizeValueSpan').remove();
            document.querySelector('#' + id + '_imageNameLabel').remove();
            document.querySelector('#' + id + '_imgsizeSpan').remove();
        }
        document.getElementById(id + '_dialogContent').remove();
        getComponent(document.getElementById(id + '_saveDialog'), 'dialog').destroy();
        document.getElementById(id + '_saveDialog').remove();
    };
    /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
    ToolbarModule.prototype.onBeforeopen = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var obj = { canvas: null };
        var items = [
            { id: 'jpeg', text: 'JPEG' },
            { id: 'png', text: 'PNG' },
            { id: 'svg', text: 'SVG' },
            { id: 'webp', text: 'WebP' }
        ];
        var inputObj = new TextBox({
            placeholder: this.l10n.getConstant('ImageName')
        });
        inputObj.appendTo('#' + id + '_imgNametext');
        var qualityContainer = document.getElementById(id + '_imgQualitydiv');
        var slider = document.getElementById(id + '_qualitySlider');
        var qualityBtnGrp = document.querySelector('#' + id + '_qualityButtonGroup');
        var qualityBtnIcon = document.querySelector('#' + id + '_qualitybuttonIcon');
        var qualitySliderValue = document.querySelector('#' + id + '_imgsizeSpan');
        var imageNameLabel;
        if (Browser.isDevice) {
            imageNameLabel = document.getElementById(id + '_qualitySize');
        }
        else {
            imageNameLabel = document.getElementById(id + '_imageNameLabel');
        }
        var fileObj = { fileName: '', fileType: '' };
        parent.notify('draw', { prop: 'getFileName', onPropertyChange: false, value: { obj: fileObj } });
        this.fileType = fileObj['fileType'] ? fileObj['fileType'] : 'JPEG';
        parent.notify('export', { prop: 'exportToCanvas', value: { object: obj } });
        var tempCanvas = obj['canvas'];
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var canvas = document.getElementById(id + '_imgPic');
        canvas.width = tempCanvas.width;
        canvas.height = tempCanvas.height;
        var buttonIcon = new Button({ iconCss: 'e-icons e-settings' });
        buttonIcon.appendTo('#' + id + '_qualitybuttonIcon');
        var ddbElem = document.getElementById(id + '_saveDropdownbtn');
        if (ddbElem) {
            var spanElem_1 = document.createElement('span');
            spanElem_1.innerHTML = this.fileType === 'Webp' ? 'Webp' : this.fileType.toUpperCase();
            if (ddbElem) {
                ddbElem.appendChild(spanElem_1);
            }
            var drpDownBtn_1 = new DropDownButton({
                items: items,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = drpDownBtn_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = spanElem_1.innerHTML;
                    if (activeBtn !== '') {
                        args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                    }
                },
                select: function (args) {
                    qualitySliderValue.style.display = 'none';
                    _this.fileType = spanElem_1.innerHTML = args.item.text;
                    if (args.item.id !== 'jpeg') {
                        qualityContainer.style.display = 'none';
                        imageNameLabel.style.display = 'block';
                        _this.updateImageSize(1, obj['canvas'], _this.fileType);
                        if (slider) {
                            if (_this.isSlider) {
                                getComponent(slider, 'slider').destroy();
                            }
                            slider.style.display = 'none';
                        }
                        _this.isSlider = false;
                    }
                    else {
                        qualityContainer.style.display = 'block';
                        removeClass([qualityBtnGrp], 'e-hide');
                        slider.style.display = 'none';
                        imageNameLabel.style.display = 'block';
                        _this.updateImageSize(isNullOrUndefined(_this.currentQuality) ? 1 : _this.currentQuality, obj['canvas'], _this.fileType);
                        document.getElementById(id + '_' + _this.imageQuality).checked = true;
                    }
                }
            });
            drpDownBtn_1.appendTo('#' + id + '_saveDropdownbtn');
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            var imgName = document.getElementById(id + '_imgNametext');
            imgName.value = this.fileName ? this.fileName : fileObj['fileName'];
            if (fileObj['fileType'] && fileObj['fileType'].toUpperCase() !== 'JPEG') {
                qualityContainer.style.display = 'none';
                qualitySliderValue.style.display = 'none';
            }
            if (Browser.isDevice) {
                document.getElementById(id + '_dialogImgContent').style.display = 'none';
                document.getElementById(id + '_dialogRightContent').style.width = '100%';
                this.updateImageSize(1, obj['canvas'], this.fileType);
            }
            else {
                this.updateImageSize(1, obj['canvas'], this.fileType);
            }
        }
        document.getElementById(id + '_' + this.imageQuality).checked = true;
        qualityBtnGrp.addEventListener('click', this.qualityBtnClickHandler.bind(this));
        qualityBtnIcon.addEventListener('click', this.qualityBtnClickHandler.bind(this));
    };
    ToolbarModule.prototype.qualityBtnClickHandler = function (event) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var target = event.target;
        var fileObj = { fileName: '' };
        var obj = { canvas: null };
        var compressionValues = {
            'Good': 0.8,
            'Great': 0.9,
            'Highest': 1
        };
        var qualityBtnGrp = document.querySelector('#' + id + '_qualityButtonGroup');
        var qualitySlider = document.querySelector('#' + id + '_qualitySlider');
        var qualityOption = document.querySelector('#' + id + '_qualityOptionContainer');
        var qualitySliderValueDiv = document.querySelector('#' + id + '_imgsizeSpan');
        var qualitySliderValueSpan = document.querySelector('#' + id + '_imgsizeValueSpan');
        parent.notify('draw', { prop: 'getFileName', onPropertyChange: false, value: { obj: fileObj } });
        parent.notify('export', { prop: 'exportToCanvas', value: { object: obj } });
        if (event.currentTarget.id === id + '_qualitybuttonIcon' && !this.isSlider) {
            addClass([qualityBtnGrp], 'e-hide');
            qualitySlider.style.display = 'block';
            qualitySliderValueDiv.style.display = 'inline-block';
            qualityOption.style.display = 'flex';
            var sliderObj = new Slider({
                tooltip: { placement: 'Before', isVisible: true, format: 'P0', showOn: 'Focus' },
                min: 0.01, max: 1, step: 0.01, value: this.currentQuality,
                type: 'MinRange',
                width: Browser.isDevice ? '80%' : '190px',
                created: function () {
                    _this.updateImageSize(_this.currentQuality, obj['canvas'], 'jpeg');
                    qualitySliderValueSpan.innerHTML = (Math.round(_this.currentQuality * 100)).toString();
                },
                changed: function (args) {
                    _this.currentQuality = args.value;
                    qualitySliderValueSpan.innerHTML = (Math.round(_this.currentQuality * 100)).toString();
                    parent.notify('export', { prop: 'setImageQuality', value: { value: args.value } });
                    _this.updateImageSize(args.value, obj['canvas'], 'jpeg');
                }
            });
            sliderObj.appendTo('#' + id + '_qualitySlider');
            sliderObj.element.parentElement.classList.add('e-ie-quality-slider');
            this.isSlider = true;
        }
        else if (event.currentTarget.id === id + '_qualitybuttonIcon' && this.isSlider) {
            getComponent(qualitySlider, 'slider').destroy();
            qualitySlider.style.display = 'none';
            qualitySliderValueDiv.style.display = 'none';
            removeClass([qualityBtnGrp], 'e-hide');
            qualityOption.style.display = 'block';
            this.isSlider = false;
            // eslint-disable-next-line no-prototype-builtins
        }
        else if (compressionValues.hasOwnProperty(target.textContent) && !this.isSlider) {
            event.target.previousElementSibling.checked = true;
            this.currentQuality = compressionValues[target.textContent];
            this.imageQuality = target.textContent.toLowerCase();
            this.updateImageSize(compressionValues[target.textContent], obj['canvas'], 'jpeg');
        }
    };
    ToolbarModule.prototype.updateImageSize = function (quality, tempCanvas, fileType) {
        var fileSize;
        var parent = this.parent;
        var id = parent.element.id;
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var canvas = document.getElementById(id + '_imgPic');
        var ctx = canvas.getContext('2d');
        var imageNameLabel;
        if (Browser.isDevice) {
            imageNameLabel = document.getElementById(id + '_qualitySize');
        }
        else {
            imageNameLabel = document.getElementById(id + '_imageNameLabel');
        }
        if (fileType.toLowerCase() === 'jpeg') {
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            tempCanvas.toBlob((function (blob) {
                fileSize = Math.floor(blob.size / 1024);
                if (fileSize > 1000) {
                    var megabytes = fileSize / 1024;
                    imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + megabytes.toFixed(2) + ' MB';
                    fileSize = +megabytes.toFixed(2);
                }
                else {
                    imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + fileSize.toFixed(2) + ' KB';
                    fileSize = +fileSize.toFixed(2);
                }
                if (Browser.isDevice) {
                    canvas.style.display = 'none';
                }
                else {
                    var compressedImage_1 = new Image();
                    compressedImage_1.src = URL.createObjectURL(blob);
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    compressedImage_1.onload = function () {
                        ctx.drawImage(compressedImage_1, 0, 0);
                        URL.revokeObjectURL(compressedImage_1.src);
                    };
                }
                this.fileSize = fileSize;
            }).bind(this), 'image/jpeg', quality);
        }
        else if (!isNullOrUndefined(fileType) && (fileType.toLowerCase() === 'png' || fileType.toLowerCase() === 'webp')) {
            var type = 'image/' + fileType.toLowerCase();
            ctx.drawImage(tempCanvas, 0, 0);
            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
            tempCanvas.toBlob((function (blob) {
                fileSize = Math.floor(blob.size / 1024);
                if (fileSize > 1000) {
                    var megabytes = fileSize / 1024;
                    imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + megabytes.toFixed(2) + ' MB';
                    fileSize = +megabytes.toFixed(2);
                }
                else {
                    imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + fileSize.toFixed(2) + ' KB';
                    fileSize = +fileSize.toFixed(2);
                }
                if (Browser.isDevice) {
                    canvas.style.display = 'none';
                }
                this.fileSize = fileSize;
            }).bind(this), type, 1);
        }
        else if (!isNullOrUndefined(fileType) && fileType.toLowerCase() === 'svg') {
            ctx.drawImage(tempCanvas, 0, 0);
            var svgDataUrl = tempCanvas.toDataURL('image/svg+xml');
            var base64Data = svgDataUrl.split(',')[1];
            var binaryStringLength = base64Data.length;
            var rawByteSize = binaryStringLength;
            var fileSize_1 = Math.floor(rawByteSize / 1024); // KB
            if (fileSize_1 > 1000) {
                var megabytes = fileSize_1 / 1024; // Convert to MB
                imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + megabytes.toFixed(2) + ' MB';
                fileSize_1 = +megabytes.toFixed(2);
            }
            else {
                imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + fileSize_1.toFixed(2) + ' KB';
                fileSize_1 = +fileSize_1.toFixed(2);
            }
            if (Browser.isDevice) {
                canvas.style.display = 'none';
            }
            this.fileSize = fileSize_1;
        }
        else {
            if (Browser.isDevice) {
                canvas.style.display = 'none';
            }
            else {
                ctx.drawImage(tempCanvas, 0, 0);
                if (this.initialSize > 1000) {
                    var megabytes = this.initialSize / 1048576;
                    imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + megabytes.toFixed(2) + ' MB';
                }
                else {
                    imageNameLabel.innerHTML = this.l10n.getConstant('ImageSize') + ': ' + this.initialSize.toFixed(2) + ' KB';
                }
            }
        }
    };
    ToolbarModule.prototype.download = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (this.fileType === 'JPEG' && this.isSlider) {
            var value = getComponent(document.getElementById(id + '_qualitySlider'), 'slider').value;
            parent.notify('export', { prop: 'setImageQuality', value: { value: value } });
        }
        else {
            parent.notify('export', { prop: 'setImageQuality', value: { value: this.currentQuality } });
        }
        var fileName = document.getElementById(id + '_imgNametext').value;
        parent.export(this.fileType, fileName);
    };
    ToolbarModule.prototype.getCropTransformToolbarItem = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        toolbarItems.push({ id: id + '_crop', tooltipText: this.l10n.getConstant('CropSelection'), align: 'Center',
            template: '<button id="' + id + '_cropBtn"></button>'
        });
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && (parent.toolbar.indexOf('Transform') > -1 || parent.toolbar.indexOf('RotateLeft') > -1))) {
            toolbarItems.push({ id: id + '_rotateLeft', prefixIcon: 'e-icons e-anti-clock-wise', tooltipText: this.l10n.getConstant('RotateLeft'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && (parent.toolbar.indexOf('Transform') > -1 || parent.toolbar.indexOf('RotateRight') > -1))) {
            toolbarItems.push({ id: id + '_rotateRight', prefixIcon: 'e-icons e-clock-wise', tooltipText: this.l10n.getConstant('RotateRight'), align: 'Center' });
        }
        if (toolbarItems.length > 2) {
            toolbarItems.push({ align: 'Center', type: 'Separator' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && (parent.toolbar.indexOf('Transform') > -1 || parent.toolbar.indexOf('HorizontalFlip') > -1))) {
            toolbarItems.push({ id: id + '_horizontalFlip', prefixIcon: 'e-icons e-horizontal-flip', tooltipText: this.l10n.getConstant('HorizontalFlip'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && (parent.toolbar.indexOf('Transform') > -1 || parent.toolbar.indexOf('VerticalFlip') > -1))) {
            toolbarItems.push({ id: id + '_verticalFlip', prefixIcon: 'e-icons e-vertical-flip', tooltipText: this.l10n.getConstant('VerticalFlip'), align: 'Center' });
        }
        if ((isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Straightening') > -1)) && !Browser.isDevice) {
            toolbarItems.push({ align: 'Center', type: 'Separator' });
            if (isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Straightening') > -1)) {
                var spanWidth = document.createElement('span');
                spanWidth.innerHTML = this.l10n.getConstant('Straighten');
                toolbarItems.push({ id: id + '_straightenSpan', cssClass: 'e-ie-straighten-span', template: spanWidth, align: 'Center' });
                toolbarItems.push({ id: id + '_straighten',
                    cssClass: 'top-icon e-straighten', tooltipText: this.l10n.getConstant('Straighten'), align: 'Center', type: 'Input',
                    template: '<div id="' + id + '_straightenSlider"></div>' });
                var straightenSpan = document.createElement('span');
                straightenSpan.innerHTML = parent.transform.straighten.toString() + '&#176';
                toolbarItems.push({ id: id + '_straightenSpan', cssClass: 'e-ie-straighten-value-span',
                    template: straightenSpan, align: 'Center' });
            }
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getShapesToolbarItem = function (items) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar)) {
            toolbarItems.push({ id: id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + id + '_annotationBtn"></button>' });
        }
        if (items.indexOf('fillColor') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: id + '_fillcolor',
                cssClass: 'top-icon e-fill', tooltipText: this.l10n.getConstant('FillColor'), align: 'Center', type: 'Input',
                template: '<button id="' + id + '_fillColorBtn"></button>' });
        }
        if (items.indexOf('strokeColor') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: id + '_strokecolor',
                cssClass: 'top-icon e-stroke', tooltipText: this.l10n.getConstant('StrokeColor'), align: 'Center', type: 'Input',
                template: '<button id="' + id + '_borderColorBtn"></button>' });
        }
        if (items.indexOf('strokeWidth') > -1) {
            toolbarItems.push({ id: id + '_strokeWidth', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('StrokeWidth'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_borderWidthBtn"></button>' });
        }
        if (items.indexOf('start') > -1) {
            toolbarItems.push({ id: id + '_start', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Start'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_startBtn"></button>' });
        }
        if (items.indexOf('borderRadius') > -1) {
            toolbarItems.push({ id: id + '_rectangleRadius', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('BorderRadius'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_rectangleRadiusBtn"></button>' });
        }
        if (items.indexOf('end') > -1) {
            toolbarItems.push({ id: id + '_end', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('End'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_endBtn"></button>' });
        }
        if (items.indexOf('flip') > -1) {
            toolbarItems.push({ id: id + '_rotLeft', prefixIcon: 'e-anti-clock-wise',
                tooltipText: this.l10n.getConstant('RotateLeft'), align: 'Center' });
            toolbarItems.push({ id: id + '_rotRight', prefixIcon: 'e-clock-wise',
                tooltipText: this.l10n.getConstant('RotateRight'), align: 'Center' });
            toolbarItems.push({ id: id + '_hFlip', prefixIcon: 'e-horizontal-flip',
                tooltipText: this.l10n.getConstant('HorizontalFlip'), align: 'Center' });
            toolbarItems.push({ id: id + '_vFlip', prefixIcon: 'e-vertical-flip',
                tooltipText: this.l10n.getConstant('VerticalFlip'), align: 'Center' });
        }
        if (items.indexOf('transparency') > -1) {
            toolbarItems.push({ align: 'Center', type: 'Separator' });
            toolbarItems.push({ id: id + '_transparency', prefixIcon: 'e-opacity',
                tooltipText: this.l10n.getConstant('Opacity'), align: 'Center' });
        }
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (items.indexOf('z-order') > -1) {
            toolbarItems.push({ id: id + '_zOrder', cssClass: 'top-icon e-list-unordered-3', tooltipText: this.l10n.getConstant('ZOrder'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_zOrderBtn"></button>' });
        }
        if (items.indexOf('duplicate') > -1) {
            toolbarItems.push({ id: id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                tooltipText: this.l10n.getConstant('Duplicate'), align: 'Center' });
        }
        if (items.indexOf('remove') > -1) {
            toolbarItems.push({ id: id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center' });
        }
        if (items.indexOf('text') > -1) {
            toolbarItems.push({ id: id + '_editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                tooltipText: this.l10n.getConstant('EditText'), align: 'Center' });
        }
        var tempToolbarItems = this.processSubToolbar(items);
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            var obj = { shape: null };
            parent.notify('selection', { prop: 'getCurrentDrawingShape', value: { obj: obj } });
            if (obj['shape'] !== 'path') {
                toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                    tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
                toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                    tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
            }
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.initCropTransformToolbar = function (shape, isTransform) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getCropTransformToolbarItem();
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var args = { toolbarType: 'crop-transform', toolbarItems: this.defToolbarItems };
        parent.trigger('toolbarUpdating', args);
        this.defToolbarItems = args.toolbarItems;
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderCropBtn(shape);
                _this.renderStraightenSlider();
                _this.wireZoomBtnEvents();
                parent.trigger('toolbarCreated', { toolbarType: 'shapes' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
                if (document.getElementById(id + '_cropBtn') && isNullOrUndefined(isTransform)) {
                    if (!Browser.isDevice) {
                        parent.notify('draw', { prop: 'select', onPropertyChange: false,
                            value: { type: _this.getCropTextContent(document.getElementById(id + '_cropBtn')).toLowerCase(),
                                startX: null, startY: null, width: null, height: null } });
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + id + '_toolbar');
        }
        var slider = parent.element.querySelector('#' + id + '_straightenSlider');
        if ((isNullOrUndefined(parent.toolbar) || (parent.toolbar && parent.toolbar.indexOf('Straightening') > -1))
            && slider && slider.parentElement.clientHeight > this.toolbarHeight) {
            this.toolbarHeight = parent.toolbarHeight = slider.parentElement.clientHeight;
        }
        this.enableDisableTbrBtn();
        parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
    };
    ToolbarModule.prototype.getCropTextContent = function (elem) {
        if (elem) {
            var classToContentMap = { 'e-custom': 'Custom', 'e-circle': 'Circle',
                'e-square': 'Square', 'e-custom-a': '3:2', 'e-custom-b': '4:3', 'e-custom-c': '5:4', 'e-custom-d': '7:5',
                'e-custom-e': '16:9', 'e-custom-f': '2:3', 'e-custom-g': '3:4', 'e-custom-h': '4:5', 'e-custom-i': '5:7',
                'e-custom-j': '9:16'
            };
            var classList = elem.children[0].classList;
            for (var className in classToContentMap) {
                if (classList.contains(className)) {
                    return classToContentMap[className];
                }
            }
        }
        return '';
    };
    ToolbarModule.prototype.getCurrentShapeIcon = function (shape) {
        // eslint-disable-next-line @typescript-eslint/tslint/config
        var shapeIcons = {
            rectangle: 'e-rectangle',
            ellipse: 'e-circle',
            line: 'e-line',
            arrow: 'e-arrow-right-up',
            path: 'e-critical-path',
            text: 'e-add-text',
            image: 'e-image',
            pen: 'e-free-pen',
            'crop-custom': 'e-custom',
            'crop-circle': 'e-circle',
            'crop-square': 'e-square',
            'crop-3:2': 'e-custom-a',
            'crop-4:3': 'e-custom-b',
            'crop-5:4': 'e-custom-c',
            'crop-7:5': 'e-custom-d',
            'crop-16:9': 'e-custom-e',
            'crop-2:3': 'e-custom-f',
            'crop-3:4': 'e-custom-g',
            'crop-4:5': 'e-custom-h',
            'crop-5:7': 'e-custom-i',
            'crop-9:16': 'e-custom-j'
        };
        return shapeIcons[shape] ? shapeIcons[shape] : (shape && shape.indexOf('crop-') !== -1) ? 'e-custom' : 'e-free-pen';
    };
    ToolbarModule.prototype.initShapesToolbarItem = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getShapesToolbarItem(items);
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var args = { toolbarType: parent.activeObj.shape ? parent.activeObj.shape : 'shapes',
            toolbarItems: this.defToolbarItems };
        parent.trigger('toolbarUpdating', args);
        if (this.isToolbarString(args.toolbarItems)) {
            items = args.toolbarItems;
            this.excludeItems(args.toolbarItems);
        }
        else {
            this.defToolbarItems = args.toolbarItems;
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderAnnotationBtn(true);
                _this.createRectangleRadius(items);
                _this.createShapeColor(items);
                _this.createShapeBtn(items);
                _this.createZOrderBtn(items);
                if (parent.activeObj.shape === 'arrow') {
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    if (items.some(function (item) { return item.toLowerCase().indexOf('start') > -1; })) {
                        _this.createStartBtn();
                    }
                    // eslint-disable-next-line @typescript-eslint/tslint/config
                    if (items.some(function (item) { return item.toLowerCase().indexOf('end') > -1; })) {
                        _this.createEndBtn();
                    }
                }
                _this.wireZoomBtnEvents();
                parent.trigger('toolbarCreated', { toolbarType: 'shapes' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.createRectangleRadius = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('borderRadius') > -1) {
            var strokeWidthItems = [
                { id: '1', text: this.l10n.getConstant('0') },
                { id: '2', text: this.l10n.getConstant('20') },
                { id: '3', text: this.l10n.getConstant('40') },
                { id: '4', text: this.l10n.getConstant('60') },
                { id: '5', text: this.l10n.getConstant('80') },
                { id: '6', text: this.l10n.getConstant('100') }
            ];
            var strokeWidthBtn = document.getElementById(id + '_rectangleRadiusBtn');
            var spanElem_2 = document.createElement('span');
            spanElem_2.innerHTML = this.l10n.getConstant(parent.frameObj.radius.toString());
            spanElem_2.className = 'e-shape-rectangle-radius';
            strokeWidthBtn.appendChild(spanElem_2);
            // Initialize the DropDownButton component.
            var drpDownBtn_2 = new DropDownButton({ items: strokeWidthItems,
                open: function (args) {
                    if (Browser.isDevice) {
                        var parentElem = args.element.parentElement;
                        parentElem.style.top = drpDownBtn_2.element.getBoundingClientRect().top -
                            parentElem.offsetHeight + 'px';
                    }
                    var activeBtn = drpDownBtn_2.element.childNodes[0].textContent;
                    if (activeBtn !== '') {
                        args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                    }
                },
                select: function (args) {
                    _this.triggerTbarClickEvent(args);
                    spanElem_2.textContent = args.item.text;
                    parent.updateStrokeWidth(args.item.id, 'radius');
                    if (Browser.isDevice) {
                        if (document.getElementById(id + '_bottomToolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_7 = getComponent(id + '_bottomToolbar', 'toolbar');
                            toolbar_7.refreshOverflow();
                        }
                    }
                    else {
                        if (document.getElementById(id + '_toolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_8 = getComponent(id + '_toolbar', 'toolbar');
                            toolbar_8.refreshOverflow();
                        }
                    }
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                }
            });
            // Render initialized DropDownButton.
            drpDownBtn_2.appendTo('#' + id + '_rectangleRadiusBtn');
        }
    };
    ToolbarModule.prototype.beforeModeSwitch = function (args, inst) {
        this.popupLeft = args.element.offsetParent.style.left;
        if (args.mode === 'Picker') {
            inst.showButtons = true;
            inst.dataBind();
            args.element.querySelector('.e-apply').title = this.l10n.getConstant('Apply');
            args.element.querySelector('.e-cancel').title = this.l10n.getConstant('Cancel');
            args.element.querySelector('.e-mode-switch-btn').title = this.l10n.getConstant('StandardColors');
        }
        else {
            inst.showButtons = false;
            inst.dataBind();
            args.element.querySelector('.e-mode-switch-btn').title = this.l10n.getConstant('MoreColors');
        }
    };
    ToolbarModule.prototype.createShapeColor = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('fillColor') > -1) {
            parent.element.querySelector('.e-template.e-fill').appendChild(parent.createElement('input', {
                id: id + '_shape_fill'
            }));
            var fillColor_1 = new ColorPicker({
                modeSwitcher: true, noColor: true, value: '', inline: true,
                showButtons: false, mode: 'Palette', cssClass: 'e-shape-fill-color',
                beforeModeSwitch: function (args) { return _this.beforeModeSwitch(args, fillColor_1); },
                presetColors: {
                    'custom': ['', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3',
                        '#03a9f4', '#00bcd4', '#009688', '#ffeb3b', '#ffffff', '#ffebee', '#fce4ec', '#f3e5f5', '#ede7f6', '#e3f2fd',
                        '#e1f5fe', '#e0f7fa', '#e0f2f1', '#fffde7', '#f2f2f2', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#bbdefb',
                        '#b3e5fc', '#b2ebf2', '#b2dfdb', '#fff9c4', '#e6e6e6', '#ef9a9a', '#f48fb1', '#ce93d8', '#b39ddb', '#90caf9',
                        '#81d4fa', '#80deea', '#80cbc4', '#fff59d', '#cccccc', '#e57373', '#f06292', '#ba68c8', '#9575cd', '#64b5f6',
                        '#4fc3f7', '#4dd0e1', '#4db6ac', '#fff176', '#b3b3b3', '#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#42a5f5',
                        '#29b6f6', '#26c6da', '#26a69a', '#ffee58', '#999999', '#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#1e88e5',
                        '#039be5', '#00acc1', '#00897b', '#fdd835', '#808080', '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#1976d2',
                        '#0288d1', '#0097a7', '#00796b', '#fbc02d', '#666666', '#c62828', '#ad1457', '#6a1b9a', '#4527a0', '#1565c0',
                        '#0277bd', '#00838f', '#00695c', '#f9a825', '#4d4d4d', '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#0d47a1',
                        '#01579b', '#006064', '#004d40', '#f57f17']
                },
                beforeTileRender: function (args) {
                    if (args.value === '') {
                        args.element.classList.add('e-nocolor-item');
                    }
                },
                change: function (args) {
                    parent.updateFillColor(args.value);
                    if (args.currentValue.rgba === '') {
                        fillDDB_1.element.children[0].classList.add('e-nocolor-item');
                    }
                    else {
                        fillDDB_1.element.children[0].classList.remove('e-nocolor-item');
                        fillDDB_1.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    }
                    fillDDB_1.toggle();
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                },
                onModeSwitch: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.parentElement.style.left = _this.popupLeft;
                        args.element.parentElement.parentElement.style.top = (fillDDB_1.element.getBoundingClientRect().top - args.element.parentElement.parentElement.offsetHeight) + 'px';
                    }
                },
                beforeClose: function () {
                    fillDDB_1.toggle();
                }
            }, '#' + id + '_shape_fill');
            var fillDDB_1 = new DropDownButton({
                open: function (args) {
                    var parenElem = args.element.parentElement;
                    if (Browser.isDevice) {
                        parenElem.style.top = fillDDB_1.element.getBoundingClientRect().top -
                            parenElem.offsetHeight + 'px';
                        if (window.innerWidth <= 520) {
                            parenElem.style.left = parent.element.offsetLeft + 'px';
                        }
                    }
                },
                target: '.e-shape-fill-color',
                iconCss: 'e-dropdownbtn-preview',
                cssClass: 'e-ie-ddb-popup'
            }, '#' + id + '_fillColorBtn');
            fillColor_1.inline = true;
            fillColor_1.value = fillColor_1.getValue(fillColor_1.value, 'rgba');
            parent.element.querySelector('.e-fill.e-template .e-dropdownbtn-preview').classList.add('e-nocolor-item');
        }
        if (items.indexOf('strokeColor') > -1) {
            parent.element.querySelector('.e-template.e-stroke').appendChild(parent.createElement('input', {
                id: id + '_shape_stroke'
            }));
            var strokeColor_1 = new ColorPicker({
                modeSwitcher: true, noColor: false, value: '#fff', inline: true,
                showButtons: false, mode: 'Palette', cssClass: 'e-shape-stroke-color',
                beforeModeSwitch: function (args) {
                    _this.popupLeft = args.element.offsetParent.style.left;
                    strokeColor_1.value = parent.activeObj.strokeSettings.strokeColor !== '#fff' ? parent.activeObj.strokeSettings.strokeColor : '#008000ff';
                    _this.beforeModeSwitch(args, strokeColor_1);
                },
                presetColors: this.presetColors,
                change: function (args) {
                    parent.updateStrokeColor(args.value);
                    strokeDDB_1.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    strokeDDB_1.toggle();
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                },
                onModeSwitch: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.parentElement.style.left = _this.popupLeft;
                        args.element.parentElement.parentElement.style.top = (strokeDDB_1.element.getBoundingClientRect().top - args.element.parentElement.parentElement.offsetHeight) + 'px';
                    }
                },
                beforeClose: function () {
                    strokeDDB_1.toggle();
                }
            }, '#' + id + '_shape_stroke');
            var strokeDDB_1 = new DropDownButton({
                open: function (args) {
                    var parenElem = args.element.parentElement;
                    if (Browser.isDevice) {
                        parenElem.style.top = strokeDDB_1.element.getBoundingClientRect().top -
                            parenElem.offsetHeight + 'px';
                        if (window.innerWidth <= 520) {
                            parenElem.style.left = parent.element.offsetLeft + 'px';
                        }
                    }
                },
                target: '.e-shape-stroke-color',
                iconCss: 'e-dropdownbtn-preview',
                cssClass: 'e-ie-ddb-popup'
            }, '#' + id + '_borderColorBtn');
            strokeColor_1.inline = true;
            strokeColor_1.value = strokeColor_1.getValue(strokeColor_1.value, 'rgba');
            parent.element.querySelector('.e-stroke.e-template .e-dropdownbtn-preview').style.background = '#fff';
        }
    };
    ToolbarModule.prototype.createShapeBtn = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('strokeWidth') > -1) {
            var strokeWidthItems = [
                { id: '1', text: this.l10n.getConstant('XSmall') },
                { id: '2', text: this.l10n.getConstant('Small') },
                { id: '3', text: this.l10n.getConstant('Medium') },
                { id: '4', text: this.l10n.getConstant('Large') },
                { id: '5', text: this.l10n.getConstant('XLarge') }
            ];
            if (parent.activeObj.shape && (parent.activeObj.shape === 'rectangle' || parent.activeObj.shape === 'ellipse')) {
                strokeWidthItems = [
                    { id: '1', text: this.l10n.getConstant('NoOutline') },
                    { id: '2', text: this.l10n.getConstant('XSmall') },
                    { id: '3', text: this.l10n.getConstant('Small') },
                    { id: '4', text: this.l10n.getConstant('Medium') },
                    { id: '5', text: this.l10n.getConstant('Large') },
                    { id: '6', text: this.l10n.getConstant('XLarge') }
                ];
            }
            var strokeWidthBtn = document.getElementById(id + '_borderWidthBtn');
            var spanElem_3 = document.createElement('span');
            spanElem_3.innerHTML = this.l10n.getConstant('XSmall');
            spanElem_3.className = 'e-shape-stroke-width';
            strokeWidthBtn.appendChild(spanElem_3);
            // Initialize the DropDownButton component.
            var drpDownBtn_3 = new DropDownButton({ items: strokeWidthItems,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = drpDownBtn_3.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = spanElem_3.innerHTML;
                    if (activeBtn !== '') {
                        args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                    }
                },
                select: function (args) {
                    _this.triggerTbarClickEvent(args);
                    spanElem_3.textContent = args.item.text;
                    parent.updateStrokeWidth(args.item.id, 'width', parent.activeObj.shape);
                    if (Browser.isDevice) {
                        if (document.getElementById(id + '_bottomToolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_9 = getComponent(id + '_bottomToolbar', 'toolbar');
                            toolbar_9.refreshOverflow();
                        }
                    }
                    else {
                        if (document.getElementById(id + '_toolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_10 = getComponent(id + '_toolbar', 'toolbar');
                            toolbar_10.refreshOverflow();
                        }
                    }
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                }
            });
            // Render initialized DropDownButton.
            drpDownBtn_3.appendTo('#' + id + '_borderWidthBtn');
        }
    };
    ToolbarModule.prototype.createZOrderBtn = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('z-order') > -1) {
            var zOrderItems = [
                { text: this.l10n.getConstant('BringForward'), id: 'bringForward', iconCss: 'e-icons e-bring-forward' },
                { text: this.l10n.getConstant('SendBackward'), id: 'sendBackward', iconCss: 'e-icons e-send-backward' },
                { text: this.l10n.getConstant('BringToFront'), id: 'bringToFront', iconCss: 'e-icons e-bring-to-front' },
                { text: this.l10n.getConstant('SendToBack'), id: 'sendToBack', iconCss: 'e-icons e-send-to-back' }
            ];
            // Initialize the DropDownButton component.
            var drpDownBtn_4 = new DropDownButton({ items: zOrderItems, iconCss: 'e-icons e-layers',
                beforeOpen: function (args) {
                    if (document.getElementById(parent.element.id + '_zOrderBtn').classList.contains('e-disabled')) {
                        args.cancel = true;
                    }
                    var indexObj = { freehandSelectedIndex: -1 };
                    parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                    var orderObj = { order: null };
                    parent.notify('shape', { prop: 'getHighestOrder', onPropertyChange: false, value: { obj: orderObj } });
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    var order = parent.activeObj.order ? parent.activeObj.order : parent.getObjFromId(parent.pointColl[indexObj['freehandSelectedIndex']].id).order;
                    if (order && order >= orderObj['order']) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        args.items[0].disabled = true;
                        args.items[2].disabled = true;
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        args.items[0].disabled = false;
                        args.items[2].disabled = false;
                    }
                    parent.notify('shape', { prop: 'getLowestOrder', onPropertyChange: false, value: { obj: orderObj } });
                    if (order && order <= orderObj['order']) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        args.items[1].disabled = true;
                        args.items[3].disabled = true;
                    }
                    else {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        args.items[1].disabled = false;
                        args.items[3].disabled = false;
                    }
                },
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = drpDownBtn_4.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                },
                select: function (args) {
                    _this.triggerTbarClickEvent(args);
                    var obj = { freehandDrawSelectedId: null };
                    parent.notify('freehand-draw', { prop: 'getFreehandDrawSelectedId', onPropertyChange: false, value: { obj: obj } });
                    var shapeId = obj['freehandDrawSelectedId'] ? obj['freehandDrawSelectedId'] : parent.activeObj.currIndex;
                    parent.updateShapeOrder(shapeId, args.item.id);
                    if (Browser.isDevice) {
                        if (document.getElementById(id + '_bottomToolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_11 = getComponent(id + '_bottomToolbar', 'toolbar');
                            toolbar_11.refreshOverflow();
                        }
                    }
                    else {
                        if (document.getElementById(id + '_toolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_12 = getComponent(id + '_toolbar', 'toolbar');
                            toolbar_12.refreshOverflow();
                        }
                    }
                    if (shapeId.indexOf('shape') > -1) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                    else if (shapeId.indexOf('pen') > -1) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', value: { isPenDraw: true } });
                    }
                }
            });
            // Render initialized DropDownButton.
            drpDownBtn_4.appendTo('#' + id + '_zOrderBtn');
        }
    };
    ToolbarModule.prototype.createStartBtn = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('None') },
            { id: '2', text: this.l10n.getConstant('Bar') },
            { id: '3', text: this.l10n.getConstant('Arrow') },
            { id: '4', text: this.l10n.getConstant('ArrowSolid') },
            { id: '5', text: this.l10n.getConstant('Circle') },
            { id: '6', text: this.l10n.getConstant('CircleSolid') },
            { id: '7', text: this.l10n.getConstant('Square') },
            { id: '8', text: this.l10n.getConstant('SquareSolid') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_startBtn');
        var spanElem = document.createElement('span');
        if (isNullOrUndefined(parent.activeObj.start)) {
            parent.activeObj.start = 'none';
        }
        spanElem.innerHTML = parent.pascalToSplitWords(parent.activeObj.start);
        spanElem.className = 'e-shape-start';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                var activeBtn = spanElem.innerHTML;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                var idToValue = { '1': 'none', '2': 'bar', '3': 'arrow', '4': 'arrowSolid',
                    '5': 'circle', '6': 'circleSolid', '7': 'square', '8': 'squareSolid' };
                parent.notify('selection', { prop: 'setArrowShape', value: { type: 'initial', shape: idToValue["" + args.item.id] } });
                _this.triggerTbarClickEvent(args);
                spanElem.textContent = args.item.text;
                parent.updateArrow('startArrow', args.item.id);
                parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_startBtn');
    };
    ToolbarModule.prototype.createEndBtn = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('None') },
            { id: '2', text: this.l10n.getConstant('Bar') },
            { id: '3', text: this.l10n.getConstant('Arrow') },
            { id: '4', text: this.l10n.getConstant('ArrowSolid') },
            { id: '5', text: this.l10n.getConstant('Circle') },
            { id: '6', text: this.l10n.getConstant('CircleSolid') },
            { id: '7', text: this.l10n.getConstant('Square') },
            { id: '8', text: this.l10n.getConstant('SquareSolid') }
        ];
        var strokeEndBtn = document.getElementById(id + '_endBtn');
        var spanElem = document.createElement('span');
        if (isNullOrUndefined(parent.activeObj.end)) {
            parent.activeObj.end = 'arrowSolid';
        }
        spanElem.innerHTML = parent.pascalToSplitWords(parent.activeObj.end);
        spanElem.className = 'e-shape-end';
        strokeEndBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    args.element.parentElement.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        args.element.parentElement.offsetHeight + 'px';
                }
                var activeBtn = spanElem.innerHTML;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                var idToValue = { '1': 'none', '2': 'bar', '3': 'arrow', '4': 'arrowSolid',
                    '5': 'circle', '6': 'circleSolid', '7': 'square', '8': 'squareSolid' };
                parent.notify('selection', { prop: 'setArrowShape', value: { type: 'final', shape: idToValue["" + args.item.id] } });
                _this.triggerTbarClickEvent(args);
                spanElem.textContent = args.item.text;
                parent.updateArrow('endArrow', args.item.id);
                parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_endBtn');
    };
    ToolbarModule.prototype.getTextToolbarItem = function (items) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || (parent.toolbar)) {
            toolbarItems.push({ id: id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + id + '_annotationBtn"></button>' });
        }
        if (items.indexOf('fontFamily') > -1) {
            toolbarItems.push({ id: id + '_fontFamily', cssClass: 'top-icon e-img-font-family',
                tooltipText: this.l10n.getConstant('FontFamily'), align: 'Center',
                template: '<button id="' + id + '_fontFamilyBtn"></button>' });
        }
        if (items.indexOf('fontSize') > -1) {
            toolbarItems.push({ id: id + '_fontSize', cssClass: 'top-icon e-img-font-size',
                tooltipText: this.l10n.getConstant('FontSize'), align: 'Center',
                template: '<button id="' + id + '_fontSizeBtn"></button>' });
        }
        if (items.indexOf('fontColor') > -1) {
            toolbarItems.push({ cssClass: 'top-icon e-text-font-color', id: id + '_text_strokecolor',
                tooltipText: this.l10n.getConstant('FontColor'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_fontColorBtn"></button>' });
        }
        if (items.indexOf('strokeColor') > -1) {
            toolbarItems.push({ cssClass: 'top-icon e-stroke-text-font-color', id: id + '_stroke_text_color',
                tooltipText: this.l10n.getConstant('TextOutlineColor'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_strokeTextColorBtn"></button>' });
        }
        if (items.indexOf('fillColor') > -1) {
            toolbarItems.push({ cssClass: 'top-icon e-text-background-color', id: id + '_text_backgroundcolor',
                tooltipText: this.l10n.getConstant('FillColor'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_bgColorBtn"></button>'
            });
        }
        if (items.indexOf('bold') > -1) {
            toolbarItems.push({ id: id + '_bold', prefixIcon: 'e-icons e-bold', cssClass: 'top-icon e-bold',
                tooltipText: this.l10n.getConstant('Bold'), align: 'Center' });
        }
        if (items.indexOf('italic') > -1) {
            toolbarItems.push({ id: id + '_italic', prefixIcon: 'e-icons e-italic', cssClass: 'top-icon e-italic',
                tooltipText: this.l10n.getConstant('Italic'), align: 'Center' });
        }
        if (items.indexOf('strokeWidth') > -1) {
            toolbarItems.push({ id: id + '_strokeWidth', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('TextOutlineWidth'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_borderWidthBtn"></button>' });
        }
        if (items.indexOf('transparency') > -1) {
            toolbarItems.push({ id: id + '_transparency', prefixIcon: 'e-opacity',
                tooltipText: this.l10n.getConstant('Opacity'), align: 'Center' });
        }
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (items.indexOf('z-order') > -1) {
            toolbarItems.push({ id: id + '_zOrder', cssClass: 'top-icon e-list-unordered-3', tooltipText: this.l10n.getConstant('ZOrder'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_zOrderBtn"></button>' });
        }
        if (items.indexOf('duplicate') > -1) {
            toolbarItems.push({ id: id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                tooltipText: this.l10n.getConstant('Duplicate'), align: 'Center', disabled: (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') ? true : false });
        }
        if (items.indexOf('remove') > -1) {
            toolbarItems.push({ id: id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center', disabled: (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') ? true : false });
        }
        if (items.indexOf('text') > -1) {
            toolbarItems.push({ id: id + '_editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                tooltipText: this.l10n.getConstant('EditText'), align: 'Center', disabled: (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') ? true : false });
        }
        var tempToolbarItems = this.processSubToolbar(items);
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getFontFamilyItems = function () {
        var parent = this.parent;
        var items = [];
        if (parent.fontFamily && parent.fontFamily.items && parent.fontFamily.items.length > 0) {
            items = parent.fontFamily.items;
        }
        else {
            if (Browser.isDevice) {
                items = [{ id: 'arial', text: 'ABC' }, { id: 'calibri', text: 'ABC' }, { id: 'georgia', text: 'ABC' },
                    { id: 'roboto', text: 'ABC' }, { id: 'tahoma', text: 'ABC' }];
            }
            else {
                items = [{ id: 'arial', text: 'Arial' }, { id: 'calibri', text: 'Calibri' }, { id: 'georgia', text: 'Georgia' },
                    { id: 'roboto', text: 'Roboto' }, { id: 'tahoma', text: 'Tahoma' }];
            }
        }
        return items;
    };
    ToolbarModule.prototype.initTextToolbarItem = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getTextToolbarItem(items);
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var args = { toolbarType: 'text', toolbarItems: this.defToolbarItems };
        parent.trigger('toolbarUpdating', args);
        if (this.isToolbarString(args.toolbarItems)) {
            items = args.toolbarItems;
            this.excludeItems(args.toolbarItems);
        }
        else {
            this.defToolbarItems = args.toolbarItems;
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderAnnotationBtn(true);
                _this.createTextColor(items);
                _this.createStrokeTextColor(items);
                _this.createShapeBtn(items);
                _this.createBackgroundColor(items);
                _this.createTextBtn(items);
                _this.createZOrderBtn(items);
                _this.wireZoomBtnEvents();
                parent.trigger('toolbarCreated', { toolbarType: 'text' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.createTextColor = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('fontColor') > -1 && parent.element.querySelector('.e-template.e-text-font-color')) {
            parent.element.querySelector('.e-template.e-text-font-color').appendChild(parent.createElement('input', {
                id: id + '_text_font'
            }));
            var fontColor_1 = new ColorPicker({
                modeSwitcher: true, noColor: false, value: '#fff', inline: true,
                showButtons: false, mode: 'Palette', cssClass: 'e-text-fontt-color',
                beforeModeSwitch: function (args) {
                    _this.popupLeft = args.element.offsetParent.style.left;
                    fontColor_1.value = parent.activeObj.strokeSettings.strokeColor !== '#fff' ? parent.activeObj.strokeSettings.strokeColor : '#008000ff';
                    _this.beforeModeSwitch(args, fontColor_1);
                },
                presetColors: this.presetColors,
                change: function (args) {
                    parent.updateFontColor(args.value, 'Text');
                    strokeDDB_2.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    strokeDDB_2.toggle();
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                },
                onModeSwitch: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.parentElement.style.left = _this.popupLeft;
                        args.element.parentElement.parentElement.style.top = (strokeDDB_2.element.getBoundingClientRect().top - args.element.parentElement.parentElement.offsetHeight) + 'px';
                    }
                },
                beforeClose: function () {
                    strokeDDB_2.toggle();
                }
            }, '#' + id + '_text_font');
            var strokeDDB_2 = new DropDownButton({
                open: function (args) {
                    var parenElem = args.element.parentElement;
                    if (Browser.isDevice) {
                        parenElem.style.top = strokeDDB_2.element.getBoundingClientRect().top -
                            parenElem.offsetHeight + 'px';
                        if (window.innerWidth <= 520) {
                            parenElem.style.left = parent.element.offsetLeft + 'px';
                        }
                    }
                },
                target: '.e-text-fontt-color',
                iconCss: 'e-dropdownbtn-preview',
                cssClass: 'e-ie-ddb-popup'
            }, '#' + id + '_fontColorBtn');
            fontColor_1.inline = true;
            fontColor_1.value = fontColor_1.getValue(fontColor_1.value, 'rgba');
            parent.element.querySelector('.e-text-font-color.e-template .e-dropdownbtn-preview').style.background
                = '#fff';
        }
    };
    ToolbarModule.prototype.createBackgroundColor = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('fillColor') > -1 && parent.element.querySelector('.e-template.e-text-background-color')) {
            parent.element.querySelector('.e-template.e-text-background-color').appendChild(parent.createElement('input', {
                id: id + '_text_bgColor'
            }));
            var backgroundColor_1 = new ColorPicker({
                modeSwitcher: true, noColor: true, value: '', inline: true,
                showButtons: false, mode: 'Palette', cssClass: 'e-text-fontt-color',
                beforeModeSwitch: function (args) {
                    _this.popupLeft = args.element.offsetParent.style.left;
                    _this.beforeModeSwitch(args, backgroundColor_1);
                },
                presetColors: {
                    'custom': ['', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3',
                        '#03a9f4', '#00bcd4', '#009688', '#ffeb3b', '#ffffff', '#ffebee', '#fce4ec', '#f3e5f5', '#ede7f6', '#e3f2fd',
                        '#e1f5fe', '#e0f7fa', '#e0f2f1', '#fffde7', '#f2f2f2', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#bbdefb',
                        '#b3e5fc', '#b2ebf2', '#b2dfdb', '#fff9c4', '#e6e6e6', '#ef9a9a', '#f48fb1', '#ce93d8', '#b39ddb', '#90caf9',
                        '#81d4fa', '#80deea', '#80cbc4', '#fff59d', '#cccccc', '#e57373', '#f06292', '#ba68c8', '#9575cd', '#64b5f6',
                        '#4fc3f7', '#4dd0e1', '#4db6ac', '#fff176', '#b3b3b3', '#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#42a5f5',
                        '#29b6f6', '#26c6da', '#26a69a', '#ffee58', '#999999', '#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#1e88e5',
                        '#039be5', '#00acc1', '#00897b', '#fdd835', '#808080', '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#1976d2',
                        '#0288d1', '#0097a7', '#00796b', '#fbc02d', '#666666', '#c62828', '#ad1457', '#6a1b9a', '#4527a0', '#1565c0',
                        '#0277bd', '#00838f', '#00695c', '#f9a825', '#4d4d4d', '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#0d47a1',
                        '#01579b', '#006064', '#004d40', '#f57f17']
                },
                beforeTileRender: function (args) {
                    if (args.value === '') {
                        args.element.classList.add('e-nocolor-item');
                    }
                },
                change: function (args) {
                    parent.updateFontColor(args.value, 'Background');
                    if (args.currentValue.rgba === '') {
                        strokeDDB_3.element.children[0].classList.add('e-nocolor-item');
                    }
                    else {
                        strokeDDB_3.element.children[0].classList.remove('e-nocolor-item');
                        strokeDDB_3.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    }
                    strokeDDB_3.toggle();
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                },
                onModeSwitch: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.parentElement.style.left = _this.popupLeft;
                        args.element.parentElement.parentElement.style.top = (strokeDDB_3.element.getBoundingClientRect().top - args.element.parentElement.parentElement.offsetHeight) + 'px';
                    }
                },
                beforeClose: function () {
                    strokeDDB_3.toggle();
                }
            }, '#' + id + '_text_bgColor');
            var strokeDDB_3 = new DropDownButton({
                open: function (args) {
                    var parenElem = args.element.parentElement;
                    if (Browser.isDevice) {
                        parenElem.style.top = strokeDDB_3.element.getBoundingClientRect().top -
                            parenElem.offsetHeight + 'px';
                        if (window.innerWidth <= 520) {
                            parenElem.style.left = parent.element.offsetLeft + 'px';
                        }
                    }
                },
                target: '.e-text-fontt-color',
                iconCss: 'e-dropdownbtn-preview',
                cssClass: 'e-ie-ddb-popup'
            }, '#' + id + '_bgColorBtn');
            backgroundColor_1.inline = true;
            backgroundColor_1.value = backgroundColor_1.getValue(backgroundColor_1.value, 'rgba');
            parent.element.querySelector('.e-text-background-color.e-template .e-dropdownbtn-preview').style.background
                = '#fff';
        }
    };
    ToolbarModule.prototype.createStrokeTextColor = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('strokeColor') > -1 && parent.element.querySelector('.e-template.e-stroke-text-font-color')) {
            parent.element.querySelector('.e-template.e-stroke-text-font-color').appendChild(parent.createElement('input', {
                id: id + '_stroke_text'
            }));
            var fontColor_2 = new ColorPicker({
                modeSwitcher: true, noColor: true, value: '', inline: true,
                showButtons: false, mode: 'Palette', cssClass: 'e-text-fontt-color',
                beforeModeSwitch: function (args) {
                    _this.popupLeft = args.element.offsetParent.style.left;
                    _this.beforeModeSwitch(args, fontColor_2);
                },
                presetColors: {
                    'custom': ['', '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#2196f3',
                        '#03a9f4', '#00bcd4', '#009688', '#ffeb3b', '#ffffff', '#ffebee', '#fce4ec', '#f3e5f5', '#ede7f6', '#e3f2fd',
                        '#e1f5fe', '#e0f7fa', '#e0f2f1', '#fffde7', '#f2f2f2', '#ffcdd2', '#f8bbd0', '#e1bee7', '#d1c4e9', '#bbdefb',
                        '#b3e5fc', '#b2ebf2', '#b2dfdb', '#fff9c4', '#e6e6e6', '#ef9a9a', '#f48fb1', '#ce93d8', '#b39ddb', '#90caf9',
                        '#81d4fa', '#80deea', '#80cbc4', '#fff59d', '#cccccc', '#e57373', '#f06292', '#ba68c8', '#9575cd', '#64b5f6',
                        '#4fc3f7', '#4dd0e1', '#4db6ac', '#fff176', '#b3b3b3', '#ef5350', '#ec407a', '#ab47bc', '#7e57c2', '#42a5f5',
                        '#29b6f6', '#26c6da', '#26a69a', '#ffee58', '#999999', '#e53935', '#d81b60', '#8e24aa', '#5e35b1', '#1e88e5',
                        '#039be5', '#00acc1', '#00897b', '#fdd835', '#808080', '#d32f2f', '#c2185b', '#7b1fa2', '#512da8', '#1976d2',
                        '#0288d1', '#0097a7', '#00796b', '#fbc02d', '#666666', '#c62828', '#ad1457', '#6a1b9a', '#4527a0', '#1565c0',
                        '#0277bd', '#00838f', '#00695c', '#f9a825', '#4d4d4d', '#b71c1c', '#880e4f', '#4a148c', '#311b92', '#0d47a1',
                        '#01579b', '#006064', '#004d40', '#f57f17']
                },
                beforeTileRender: function (args) {
                    if (args.value === '') {
                        args.element.classList.add('e-nocolor-item');
                    }
                },
                change: function (args) {
                    parent.updateStrokeTextColor(args.value);
                    if (args.currentValue.rgba === '') {
                        strokeDDB_4.element.children[0].classList.add('e-nocolor-item');
                    }
                    else {
                        strokeDDB_4.element.children[0].classList.remove('e-nocolor-item');
                        strokeDDB_4.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    }
                    strokeDDB_4.toggle();
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                },
                onModeSwitch: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.parentElement.style.left = _this.popupLeft;
                        args.element.parentElement.parentElement.style.top = (strokeDDB_4.element.getBoundingClientRect().top - args.element.parentElement.parentElement.offsetHeight) + 'px';
                    }
                },
                beforeClose: function () {
                    strokeDDB_4.toggle();
                }
            }, '#' + id + '_stroke_text');
            var strokeDDB_4 = new DropDownButton({
                open: function (args) {
                    var parenElem = args.element.parentElement;
                    if (Browser.isDevice) {
                        parenElem.style.top = strokeDDB_4.element.getBoundingClientRect().top -
                            parenElem.offsetHeight + 'px';
                        if (window.innerWidth <= 520) {
                            parenElem.style.left = parent.element.offsetLeft + 'px';
                        }
                    }
                },
                target: '.e-text-fontt-color',
                iconCss: 'e-dropdownbtn-preview',
                cssClass: 'e-ie-ddb-popup'
            }, '#' + id + '_strokeTextColorBtn');
            fontColor_2.inline = true;
            fontColor_2.value = fontColor_2.getValue(fontColor_2.value, 'rgba');
            parent.element.querySelector('.e-stroke-text-font-color.e-template .e-dropdownbtn-preview').style.background
                = '#fff';
        }
    };
    ToolbarModule.prototype.createTextBtn = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('fontFamily') > -1) {
            var fontNameBtn = document.getElementById(id + '_fontFamilyBtn');
            var spanElem_4 = document.createElement('span');
            if (Browser.isDevice) {
                spanElem_4.innerHTML = 'ABC';
                spanElem_4.setAttribute('style', 'font-family: ' + parent.fontFamily.default.toLowerCase() + '\'');
            }
            else {
                spanElem_4.innerHTML = parent.fontFamily.default;
            }
            spanElem_4.className = 'e-text-font-family';
            if (fontNameBtn) {
                fontNameBtn.appendChild(spanElem_4);
            }
            var fontFamilyBtn_1 = new DropDownButton({ items: this.getFontFamilyItems(),
                cssClass: 'e-font-family',
                createPopupOnClick: true,
                beforeItemRender: function (args) {
                    args.element.setAttribute('style', 'font-family:' + args.element.id);
                },
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = fontFamilyBtn_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var fontFamily;
                    if (parent.textArea.style.display === 'block' || parent.textArea.style.display === 'inline-block') {
                        fontFamily = parent.textArea.style.fontFamily;
                    }
                    else {
                        fontFamily = parent.activeObj.textSettings.fontFamily;
                    }
                    var elem = args.element.querySelector('[id *= ' + '"' + fontFamily.toLowerCase() + '"' + ']');
                    if (elem) {
                        elem.classList.add('e-selected-btn');
                    }
                },
                select: function (args) {
                    _this.triggerTbarClickEvent(args);
                    spanElem_4.textContent = args.item.text;
                    if (Browser.isDevice) {
                        spanElem_4.setAttribute('style', 'font-family:' + args.item.id);
                    }
                    parent.updateFontFamily(args.item.id);
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    var toolbar = document.getElementById(parent.element.id + '_toolbar');
                    if (toolbar && toolbar.classList.contains('e-control')) {
                        getComponent(toolbar, 'toolbar').refreshOverflow();
                    }
                }
            });
            fontFamilyBtn_1.appendTo('#' + id + '_fontFamilyBtn');
        }
        if (items.indexOf('fontSize') > -1) {
            var fontSizeBtnElem = document.getElementById(id + '_fontSizeBtn');
            var fontSizeSpanElem_1 = document.createElement('span');
            var fontSizes = parent.getFontSizes();
            fontSizeSpanElem_1.innerHTML = fontSizes[0].text;
            fontSizeSpanElem_1.className = 'e-text-font-size';
            fontSizeBtnElem.appendChild(fontSizeSpanElem_1);
            var fontSizeBtn_1 = new DropDownButton({
                cssClass: 'e-font-size',
                items: fontSizes,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = fontSizeBtn_1.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = fontSizeSpanElem_1.innerHTML;
                    args.element.querySelector('[aria-label *= ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                },
                select: function (args) {
                    _this.triggerTbarClickEvent(args);
                    fontSizeSpanElem_1.textContent = args.item.text;
                    parent.updateFontSize(args.item.text);
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                }
            });
            fontSizeBtn_1.appendTo('#' + id + '_fontSizeBtn');
        }
    };
    ToolbarModule.prototype.refreshToolbar = function (type, isApplyBtn, isCropping, isZooming, cType, shape, isTransform) {
        var parent = this.parent;
        var id = parent.element.id;
        if (!parent.isImageLoaded || parent.isCropToolbar) {
            return;
        }
        var args = {};
        var aspectIcon;
        var nonAspectIcon;
        if (type !== 'filter' && type !== 'color') {
            var toolbarElement = document.getElementById(id + '_toolbar');
            var cusWrapper = document.getElementById(id + '_customizeWrapper');
            var bottomToolbar = document.getElementById(id + '_bottomToolbar');
            if (cusWrapper && (getComponent(cusWrapper, 'toolbar')) && this.defToolbarItems.length > 0) {
                getComponent(cusWrapper, 'toolbar').destroy();
                cusWrapper.innerHTML = '';
            }
            if (toolbarElement && toolbarElement.classList.contains('e-control') && this.defToolbarItems.length > 0) {
                getComponent(toolbarElement, 'toolbar').destroy();
                toolbarElement.innerHTML = '';
            }
            if (toolbarElement && (this.defToolbarItems.length > 0 || parent.toolbar && parent.toolbar.length > 0 && parent.toolbar.indexOf('Open') === -1)) {
                var toolbar_13 = getComponent(toolbarElement, 'toolbar');
                if (!isNullOrUndefined(toolbar_13)) {
                    toolbar_13.destroy();
                    document.getElementById(parent.element.id + '_toolbar').innerHTML = '';
                }
            }
            if (bottomToolbar && this.defToolbarItems.length > 0) {
                if (bottomToolbar.className.indexOf('e-control') > -1) {
                    getComponent(bottomToolbar, 'toolbar').destroy();
                    bottomToolbar.innerHTML = '';
                }
            }
        }
        this.refreshSlider();
        if (document.querySelector('.e-slider-tooltip')) {
            document.querySelector('.e-slider-tooltip').remove();
        }
        this.isFrameToolbar = parent.isCropTab = false;
        switch (type) {
            case 'main':
                if (Browser.isDevice) {
                    if (isCropping) {
                        this.initMainToolbar(false, true, true, false, false, true);
                    }
                    else {
                        this.initMainToolbar(false, true, null, false, false, true);
                    }
                }
                else if (!Browser.isDevice || isZooming) {
                    if (isZooming) {
                        this.initMainToolbar(isApplyBtn, Browser.isDevice, null);
                    }
                    else {
                        this.initMainToolbar(isApplyBtn, Browser.isDevice, null);
                    }
                }
                if (Browser.isDevice) {
                    this.initBottomToolbar();
                }
                break;
            case 'shapes':
                if (!parent.isPublicMethod) {
                    parent.noPushUndo = true;
                }
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'path') {
                    args.toolbarItems = ['strokeColor', 'strokeWidth', 'z-order', 'duplicate', 'remove'];
                }
                else if (parent.activeObj.shape === 'arrow') {
                    args.toolbarItems = ['strokeColor', 'strokeWidth', 'start', 'end', 'z-order', 'duplicate', 'remove'];
                }
                else if (parent.activeObj.shape === 'image') {
                    args.toolbarItems = ['flip', 'z-order', 'duplicate', 'remove', 'transparency'];
                }
                else if (parent.activeObj.shape === 'rectangle') {
                    args.toolbarItems = ['fillColor', 'strokeColor', 'strokeWidth', 'borderRadius', 'z-order', 'duplicate', 'remove'];
                }
                else {
                    args.toolbarItems = ['fillColor', 'strokeColor', 'strokeWidth', 'z-order', 'duplicate', 'remove'];
                }
                this.initShapesToolbarItem(args.toolbarItems);
                if (parent.activeObj.shape === 'image') {
                    var actObj = extend({}, parent.activeObj, {}, true);
                    parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.activeObj = actObj;
                    parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj,
                            isCropRatio: null, points: null, isPreventDrag: true } });
                    this.renderQAT(false);
                }
                break;
            case 'text':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                args.toolbarItems = ['fontFamily', 'fontSize', 'fontColor', 'fillColor', 'strokeColor', 'strokeWidth', 'bold', 'italic', 'z-order', 'duplicate', 'remove', 'text'];
                this.initTextToolbarItem(args.toolbarItems);
                break;
            case 'pen':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                args.toolbarItems = ['strokeColor', 'strokeWidth', 'z-order', 'remove', 'transparency'];
                this.initPenToolbarItem(args.toolbarItems);
                break;
            case 'adjustment':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                this.initAdjustmentToolbarItem();
                break;
            case 'filter':
                this.updateContextualToolbar(type);
                break;
            case 'resize':
                if (parent.isCircleCrop || (parent.currSelectionPoint && parent.currSelectionPoint.shape === 'crop-circle')) {
                    parent.aspectHeight = parent.aspectWidth;
                    this.isAspectRatio = false;
                }
                this.initResizeToolbar();
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true, true);
                }
                aspectIcon = parent.element.querySelector('#' + id + '_aspectratio');
                nonAspectIcon = parent.element.querySelector('#' + id + '_nonaspectratio');
                if (parent.aspectWidth && parent.aspectHeight) {
                    if (nonAspectIcon) {
                        parent.notify('transform', { prop: 'resize', value: { width: parent.aspectWidth, height: parent.aspectHeight, isAspectRatio: false } });
                    }
                    else if (aspectIcon) {
                        parent.notify('transform', { prop: 'resize', value: { width: parent.aspectWidth, height: null, isAspectRatio: true } });
                    }
                }
                break;
            case 'color':
                this.updateContextualToolbar(type, cType);
                break;
            case 'croptransform':
                if (isNullOrUndefined(isTransform)) {
                    parent.allowDownScale = false;
                    parent.isCropTab = true;
                }
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                }
                if (isNullOrUndefined(isTransform)) {
                    parent.updateCropTransformItems();
                }
                this.initCropTransformToolbar(shape, isTransform);
                if (Browser.isDevice && this.isToolbar()) {
                    this.updateContextualToolbar('color', 'straighten', true);
                }
                if (parent.isMaskImage) {
                    this.refreshToolbar('main');
                }
                break;
            case 'frame':
                this.isFrameToolbar = true;
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                    this.initMainToolbar(false, true, true, false, true);
                }
                else {
                    this.initMainToolbar(true, null, null, false, true);
                }
                // eslint-disable-next-line no-case-declarations
                var frameElem = parent.element.querySelector('#' + id + '_' + parent.frameObj.type);
                if (frameElem) {
                    frameElem.classList.add('e-selected-btn');
                }
                if (parent.frameObj.type !== 'none') {
                    this.updateContextualToolbar(type, cType);
                }
                parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                break;
            case 'redact':
                if (Browser.isDevice) {
                    this.initMainToolbar(false, true, true);
                    this.initMainToolbar(false, true, true, null, null, null, true);
                }
                else {
                    this.initMainToolbar(isApplyBtn, Browser.isDevice, null, null, null, null, true);
                }
                this.enableDisableTbrBtn();
                if (parent.activeObj.redactType === 'blur') {
                    var redactBlurElement = parent.element.querySelector('#' + id + '_' + 'redactBlur');
                    if (redactBlurElement) {
                        redactBlurElement.classList.add('e-selected-btn');
                    }
                }
                else {
                    var pixelateElement = parent.element.querySelector('#' + id + '_' + 'pixelate');
                    if (pixelateElement) {
                        pixelateElement.classList.add('e-selected-btn');
                    }
                }
                this.redactSlider(parent.activeObj.redactType);
                break;
        }
        this.refreshDropDownBtn(isCropping);
        this.updateKBDNavigation(type);
        this.currToolbar = type;
    };
    ToolbarModule.prototype.updateRedactObj = function () {
        var parent = this.parent;
        var objColl = extend([], parent.objColl, [], true);
        parent.objColl = [];
        var activeObj = extend({}, parent.activeObj, {}, true);
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
        parent.objColl = objColl;
        for (var i = 0; i < parent.objColl.length; i++) {
            var obj = parent.objColl[i];
            if (obj.shape === 'redact') {
                obj.redactImage = parent.createElement('canvas');
                obj.redactImage.width = obj.activePoint.width;
                obj.redactImage.height = obj.activePoint.height;
                obj.redactImage.getContext('2d').drawImage(parent.lowerCanvas, obj.activePoint.startX, obj.activePoint.startY, obj.activePoint.width, obj.activePoint.height, 0, 0, obj.redactImage.width, obj.redactImage.height);
            }
        }
        parent.isCropTab = false;
        parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
        parent.isCropTab = true;
        if (activeObj) {
            parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: activeObj,
                    isCropRatio: null, points: null, isPreventDrag: true } });
        }
        var panMoveObj = { panMove: null };
        parent.notify('transform', { prop: 'getPanMove', onPropertyChange: false,
            value: { obj: panMoveObj } });
        if (panMoveObj['panMove']) {
            parent.notify('transform', { prop: 'drawPannedImage', onPropertyChange: false,
                value: { xDiff: null, yDiff: null } });
        }
    };
    ToolbarModule.prototype.updateKBDNavigation = function (type) {
        var parent = this.parent;
        var id = parent.element.id;
        if (!parent.isKBDNavigation || this.currToolbar === type) {
            return;
        }
        if (this.isToolbar()) {
            var tbar = parent.element.querySelectorAll('#' + id + '_toolbar')[0];
            var tbarInitialChild = void 0;
            var tbarInitialBtn_1;
            if (tbar) {
                tbarInitialChild = tbar.querySelector('.e-toolbar-center');
                if (!tbarInitialChild || !tbarInitialChild.children[0]) {
                    return;
                }
                tbarInitialBtn_1 = tbarInitialChild.children[0].querySelector('.e-btn');
                var tempElem = tbarInitialChild.children[1];
                if (tempElem) {
                    tempElem = tempElem.children[0];
                }
                if (tempElem) {
                    tempElem = tempElem.children[0];
                }
                if (type === 'resize' && tempElem) {
                    tbarInitialBtn_1 = tempElem;
                }
                if (type === 'filter') {
                    var defaultFilter_1 = document.querySelector('#' + id + '_defaultCanvas');
                    if (defaultFilter_1) {
                        setTimeout(function () { return defaultFilter_1.focus(); }, 50);
                    }
                }
                if (tbarInitialBtn_1) {
                    if (type === 'main') {
                        setTimeout(function () { return tbarInitialBtn_1.focus(); }, 50);
                    }
                    else {
                        tbarInitialBtn_1.focus();
                    }
                }
            }
        }
    };
    ToolbarModule.prototype.performCropTransformClick = function (shape, isTransform) {
        var parent = this.parent;
        if (isNullOrUndefined(isTransform)) {
            parent.notify('draw', { prop: 'setTempStraightenZoomDeg' });
            parent.tempStraighten = parent.transform.straighten;
            if (parent.currObjType.isFiltered || parent.currObjType.isRedact) {
                parent.okBtn();
            }
            parent.isStraightening = true;
        }
        this.refreshToolbar('croptransform', null, null, null, null, shape, isTransform);
        if (isNullOrUndefined(isTransform)) {
            parent.notify('draw', { prop: 'setDestForStraighten' });
            parent.notify('draw', { prop: 'setTempDestForStraighten' });
        }
    };
    ToolbarModule.prototype.getAdjustmentToolbarItem = function () {
        var toolbarItems = [];
        var parent = this.parent;
        var isCustomized = false;
        var id = parent.element.id;
        var defItems = ['Brightness', 'Contrast', 'Hue', 'Saturation', 'Exposure', 'Opacity', 'Blur'];
        if (parent.toolbar) {
            for (var i = 0; i < defItems.length; i++) {
                if (parent.toolbar.indexOf(defItems[i]) !== -1) {
                    isCustomized = true;
                    break;
                }
            }
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Brightness') > -1)) {
            toolbarItems.push({ id: id + '_brightness', prefixIcon: 'e-icons e-brightness', cssClass: 'top-icon e-brightness',
                tooltipText: this.l10n.getConstant('Brightness'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Contrast') > -1)) {
            toolbarItems.push({ id: id + '_contrast', prefixIcon: 'e-icons e-contrast', cssClass: 'top-icon e-contrast',
                tooltipText: this.l10n.getConstant('Contrast'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Hue') > -1)) {
            toolbarItems.push({ id: id + '_hue', prefixIcon: 'e-icons e-fade', cssClass: 'top-icon e-fade',
                tooltipText: this.l10n.getConstant('Hue'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Saturation') > -1)) {
            toolbarItems.push({ id: id + '_saturation', prefixIcon: 'e-icons e-saturation', cssClass: 'top-icon e-saturation',
                tooltipText: this.l10n.getConstant('Saturation'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Exposure') > -1)) {
            toolbarItems.push({ id: id + '_exposure', prefixIcon: 'e-icons e-grain', cssClass: 'top-icon e-grain',
                tooltipText: this.l10n.getConstant('Exposure'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Opacity') > -1)) {
            toolbarItems.push({ id: id + '_opacity', prefixIcon: 'e-icons e-opacity', cssClass: 'top-icon e-opacity',
                tooltipText: this.l10n.getConstant('Opacity'), align: 'Center' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Blur') > -1)) {
            toolbarItems.push({ id: id + '_blur', prefixIcon: 'e-icons e-tint', cssClass: 'top-icon e-tint',
                tooltipText: this.l10n.getConstant('Blur'), align: 'Center' });
        }
        var tempToolbarItems = this.processToolbar('center');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getFrameToolbarItem = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: id + '_frameColor',
            cssClass: 'top-icon e-stroke', tooltipText: this.l10n.getConstant('Color'), align: 'Center', type: 'Input',
            template: '<span>' + this.l10n.getConstant('Color') + '</span><button id="' + id + '_frameColorBtn"></button>' });
        toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: id + '_frameGradient',
            cssClass: 'top-icon e-frame-stroke', tooltipText: this.l10n.getConstant('GradientColor'), align: 'Center', type: 'Input',
            template: '<span>' + this.l10n.getConstant('GradientColor') + '</span><button id="' + id + '_frameGradientColorBtn"></button>' });
        toolbarItems.push({ id: id + '_frameSize', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Size'), align: 'Center',
            type: 'Input', template: '<span>' + this.l10n.getConstant('Size') + '</span><button id="' + id + '_frameSizeBtn"></button>' });
        if (parent.frameObj.type === 'line' || parent.frameObj.type === 'inset' || parent.frameObj.type === 'hook') {
            toolbarItems.push({ id: id + '_frameInset', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Inset'), align: 'Center',
                type: 'Input', template: '<span>' + this.l10n.getConstant('Inset') + '</span><button id="' + id + '_frameInsetBtn"></button>' });
        }
        if (parent.frameObj.type === 'line' || parent.frameObj.type === 'inset') {
            toolbarItems.push({ id: id + '_frameOffset', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Offset'), align: 'Center',
                type: 'Input', template: '<span>' + this.l10n.getConstant('Offset') + '</span><button id="' + id + '_frameOffsetBtn"></button>' });
        }
        if (parent.frameObj.type === 'line') {
            toolbarItems.push({ id: id + '_frameRadius', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Radius'), align: 'Center',
                type: 'Input', template: '<span>' + this.l10n.getConstant('Radius') + '</span><button id="' + id + '_frameRadiusBtn"></button>' });
            toolbarItems.push({ id: id + '_frameAmount', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Amount'), align: 'Center',
                type: 'Input', template: '<span>' + this.l10n.getConstant('Amount') + '</span><button id="' + id + '_frameAmountBtn"></button>' });
            toolbarItems.push({ id: id + '_frameBorder', cssClass: 'top-icon e-size', tooltipText: this.l10n.getConstant('Border'), align: 'Center',
                type: 'Input', template: '<span>' + this.l10n.getConstant('Border') + '</span><button id="' + id + '_frameBorderBtn"></button>' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getFilterToolbarItem = function () {
        var toolbarItems = [];
        var parent = this.parent;
        var isCustomized = false;
        var id = parent.element.id;
        var defItems = ['Default', 'Chrome', 'Cold', 'Warm', 'Grayscale', 'Sepia', 'Invert'];
        if (parent.toolbar) {
            for (var i = 0; i < defItems.length; i++) {
                if (parent.toolbar.indexOf(defItems[i]) !== -1) {
                    isCustomized = true;
                    break;
                }
            }
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Default') > -1)) {
            toolbarItems.push({ id: id + '_default', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Default'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_defaultCanvas' + ' tabindex=0></canvas><div><span>' + this.l10n.getConstant('Default') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Chrome') > -1)) {
            toolbarItems.push({ id: id + '_chrome', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Chrome'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_chromeCanvas' + '></canvas><div><span>' + this.l10n.getConstant('Chrome') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Cold') > -1)) {
            toolbarItems.push({ id: id + '_cold', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Cold'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_coldCanvas' + '></canvas><div><span>' + this.l10n.getConstant('Cold') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Warm') > -1)) {
            toolbarItems.push({ id: id + '_warm', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Warm'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_warmCanvas' + '></canvas><div><span>' + this.l10n.getConstant('Warm') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Grayscale') > -1)) {
            toolbarItems.push({ id: id + '_grayscale', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Grayscale'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_grayscaleCanvas' + '></canvas><div><span>' + this.l10n.getConstant('Grayscale') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Sepia') > -1)) {
            toolbarItems.push({ id: id + '_sepia', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Sepia'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_sepiaCanvas' + '></canvas><div><span>' + this.l10n.getConstant('Sepia') + '</span></div></div>' });
        }
        if (isNullOrUndefined(parent.toolbar) || !isCustomized || (parent.toolbar && parent.toolbar.indexOf('Invert') > -1)) {
            toolbarItems.push({ id: id + '_invert', prefixIcon: 'e-icons e-none', cssClass: 'top-icon e-none',
                tooltipText: this.l10n.getConstant('Invert'), align: 'Center',
                template: '<div class="filter-wrapper"><canvas id=' + id + '_invertCanvas' + '></canvas><div><span>' + this.l10n.getConstant('Invert') + '</span></div></div>' });
        }
        var tempToolbarItems = this.processToolbar('center');
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.getPenToolbarItem = function (items) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarItems = [];
        if (isNullOrUndefined(parent.toolbar) || parent.toolbar) {
            toolbarItems.push({ id: id + '_annotation', tooltipText: this.l10n.getConstant('Annotation'), align: 'Center',
                template: '<button id="' + id + '_annotationBtn"></button>' });
        }
        if (items.indexOf('strokeColor') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: id + '_pen_strokecolor',
                cssClass: 'top-icon e-pen-stroke-color',
                tooltipText: this.l10n.getConstant('StrokeColor'), align: 'Center', type: 'Input',
                template: '<button id="' + id + '_penColorBtn"></button>' });
        }
        if (items.indexOf('strokeWidth') > -1) {
            toolbarItems.push({ prefixIcon: 'e-icons e-copy', id: id + '_pen_strokewidth',
                cssClass: 'top-icon e-size',
                tooltipText: this.l10n.getConstant('StrokeWidth'),
                align: 'Center', type: 'Input', template: '<button id="' + id + '_penStrokeWidth"></button>' });
        }
        toolbarItems.push({ align: 'Center', type: 'Separator' });
        if (items.indexOf('z-order') > -1) {
            toolbarItems.push({ id: id + '_zOrder', cssClass: 'top-icon e-list-unordered-3', tooltipText: this.l10n.getConstant('ZOrder'), align: 'Center',
                type: 'Input', template: '<button id="' + id + '_zOrderBtn"></button>' });
        }
        if (items.indexOf('remove') > -1) {
            toolbarItems.push({ id: id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                tooltipText: this.l10n.getConstant('Remove'), align: 'Center' });
        }
        var tempToolbarItems = this.processSubToolbar(items);
        for (var i = 0, len = tempToolbarItems.length; i < len; i++) {
            toolbarItems.push(tempToolbarItems[i]);
        }
        if (!Browser.isDevice) {
            toolbarItems.push({ id: id + '_ok', prefixIcon: 'e-icons e-check', cssClass: 'top-icon e-tick',
                tooltipText: this.l10n.getConstant('OK'), align: 'Right', tabIndex: 0 });
            toolbarItems.push({ id: id + '_cancel', prefixIcon: 'e-icons e-close', cssClass: 'top-icon e-save',
                tooltipText: this.l10n.getConstant('Cancel'), align: 'Right' });
        }
        return toolbarItems;
    };
    ToolbarModule.prototype.initPenToolbarItem = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var leftItem = this.getLeftToolbarItem();
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getPenToolbarItem(items);
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var args = { toolbarType: 'pen', toolbarItems: this.defToolbarItems };
        parent.trigger('toolbarUpdating', args);
        if (this.isToolbarString(args.toolbarItems)) {
            items = args.toolbarItems;
            this.excludeItems(args.toolbarItems);
        }
        else {
            this.defToolbarItems = args.toolbarItems;
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.renderAnnotationBtn(true);
                _this.createPenColor(items);
                _this.createPenBtn(items);
                _this.createZOrderBtn(items);
                _this.wireZoomBtnEvents();
                parent.trigger('toolbarCreated', { toolbarType: 'pen' });
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.createPenColor = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        if (items.indexOf('strokeColor') > -1) {
            parent.element.querySelector('.e-template.e-pen-stroke-color').appendChild(parent.createElement('input', {
                id: id + '_pen_stroke'
            }));
            var presentVal = parent.activeObj.strokeSettings.strokeColor;
            var penColor = new ColorPicker({
                modeSwitcher: false, value: '#fff',
                showButtons: false, mode: 'Palette', cssClass: 'e-pen-color',
                change: function (args) {
                    parent.updatePenStrokeColor(args.currentValue.hex);
                    _this.selFhdColor = args.currentValue.hex;
                    strokeDDB_5.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    strokeDDB_5.toggle();
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', value: { isPenDraw: true } });
                }
            }, '#' + id + '_pen_stroke');
            var strokeDDB_5 = new DropDownButton({
                open: function (args) {
                    var parentElem = args.element.parentElement;
                    if (Browser.isDevice) {
                        parentElem.style.top = strokeDDB_5.element.getBoundingClientRect().top -
                            parentElem.offsetHeight + 'px';
                        if (window.innerWidth <= 520) {
                            parentElem.style.left = parent.element.offsetLeft + 'px';
                        }
                    }
                },
                target: '.e-pen-color',
                iconCss: 'e-dropdownbtn-preview',
                cssClass: 'e-ie-ddb-popup'
            }, '#' + id + '_penColorBtn');
            penColor.inline = true;
            penColor.value = penColor.getValue(parent.activeObj.strokeSettings.strokeColor, 'rgba');
            if (penColor.value === 'null') {
                penColor.value = presentVal;
            }
            var obj = { tempFreeHandDrawEditingStyles: null };
            parent.notify('freehand-draw', { prop: 'getTempFreeHandDrawEditingStyles', value: { obj: obj } });
            var indexObj = { freehandSelectedIndex: null };
            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            if (!isNullOrUndefined(indexObj['freehandSelectedIndex']) && indexObj['freehandSelectedIndex'] > -1) {
                parent.element.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview').style.background
                    = this.selFhdColor === '#42a5f5' ? obj['tempFreeHandDrawEditingStyles'].strokeColor :
                        parent.pointColl[indexObj['freehandSelectedIndex']].strokeColor;
            }
            else {
                parent.element.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview').style.background
                    = penColor.value;
            }
        }
    };
    ToolbarModule.prototype.createPenBtn = function (items) {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('XSmall') },
            { id: '2', text: this.l10n.getConstant('Small') },
            { id: '3', text: this.l10n.getConstant('Medium') },
            { id: '4', text: this.l10n.getConstant('Large') },
            { id: '5', text: this.l10n.getConstant('XLarge') }
        ];
        if (items.indexOf('strokeWidth') > -1) {
            var strokeWidthBtn = document.getElementById(id + '_penStrokeWidth');
            var spanElem_5 = document.createElement('span');
            var indexObj = { freehandSelectedIndex: null };
            parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
            if (!isNullOrUndefined(indexObj['freehandSelectedIndex']) && indexObj['freehandSelectedIndex'] > -1) {
                spanElem_5.innerHTML = this.getPenStroke(parent.pointColl[indexObj['freehandSelectedIndex']].strokeWidth);
            }
            else {
                var obj = { penStrokeWidth: 2 };
                parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: obj } });
                if (obj['penStrokeWidth']) {
                    spanElem_5.innerHTML = this.getPenStroke(obj['penStrokeWidth']);
                }
                else {
                    spanElem_5.innerHTML = this.l10n.getConstant('Small');
                }
            }
            spanElem_5.className = 'e-pen-stroke-width';
            strokeWidthBtn.appendChild(spanElem_5);
            var drpDownBtn_5 = new DropDownButton({ items: strokeWidthItems,
                open: function (args) {
                    if (Browser.isDevice) {
                        args.element.parentElement.style.top = drpDownBtn_5.element.getBoundingClientRect().top -
                            args.element.parentElement.offsetHeight + 'px';
                    }
                    var activeBtn = spanElem_5.innerHTML;
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                },
                select: function (args) {
                    _this.triggerTbarClickEvent(args);
                    spanElem_5.textContent = args.item.text;
                    parent.updatePenStrokeWidth(args.item.id);
                    if (Browser.isDevice) {
                        if (document.getElementById(id + '_bottomToolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_14 = getComponent(id + '_bottomToolbar', 'toolbar');
                            toolbar_14.refreshOverflow();
                        }
                    }
                    else {
                        if (document.getElementById(id + '_toolbar')) {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var toolbar_15 = getComponent(id + '_toolbar', 'toolbar');
                            toolbar_15.refreshOverflow();
                        }
                    }
                    var widthObj = { penStrokeWidth: null };
                    parent.notify('freehand-draw', { prop: 'getPenStrokeWidth', onPropertyChange: false, value: { obj: widthObj } });
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', value: { isPenDraw: true } });
                    parent.notify('freehand-draw', { prop: 'setPenStrokeWidth', onPropertyChange: false, value: { value: widthObj['penStrokeWidth'] } });
                }
            });
            // Render initialized DropDownButton.
            drpDownBtn_5.appendTo('#' + id + '_penStrokeWidth');
        }
    };
    ToolbarModule.prototype.getPenStroke = function (value) {
        var textContent = '';
        var valueToTextContent = {
            1: this.l10n.getConstant('XSmall'),
            2: this.l10n.getConstant('Small'),
            3: this.l10n.getConstant('Medium'),
            4: this.l10n.getConstant('Large'),
            5: this.l10n.getConstant('XLarge')
        };
        if (value >= 1 && value <= 5) {
            textContent = valueToTextContent[value];
        }
        return textContent;
    };
    ToolbarModule.prototype.initAdjustmentToolbarItem = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var leftItem = this.getLeftToolbarItem(null);
        var rightItem = this.getRightToolbarItem();
        var mainItem = this.getAdjustmentToolbarItem();
        var zoomItem = this.getZoomToolbarItem();
        if (Browser.isDevice) {
            this.defToolbarItems = mainItem;
        }
        else {
            this.defToolbarItems = leftItem.concat(zoomItem, mainItem, rightItem);
        }
        var args = { toolbarType: 'finetune', toolbarItems: this.defToolbarItems };
        parent.trigger('toolbarUpdating', args);
        this.defToolbarItems = args.toolbarItems;
        var toolbar = new Toolbar({
            width: '100%',
            items: this.defToolbarItems,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.wireZoomBtnEvents();
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
            }
        });
        if (Browser.isDevice) {
            toolbar.appendTo('#' + id + '_bottomToolbar');
        }
        else {
            toolbar.appendTo('#' + id + '_toolbar');
        }
        this.enableDisableTbrBtn();
    };
    ToolbarModule.prototype.initFrameToolbarItem = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var canvasWrapper = document.querySelector('#' + id + '_contextualToolbarArea');
        var frameWrapper = document.querySelector('#' + id + '_frameWrapper');
        if (frameWrapper) {
            frameWrapper.style.display = 'block';
        }
        else {
            frameWrapper = canvasWrapper.appendChild(parent.createElement('div', {
                id: id + '_frameWrapper', className: 'e-frame-wrapper', styles: 'position: relative'
            }));
        }
        frameWrapper.appendChild(parent.createElement('div', {
            id: id + '_customizeWrapper',
            styles: 'position: absolute'
        }));
        var mainItem = this.getFrameToolbarItem();
        var args = { toolbarType: 'frame', toolbarItems: mainItem };
        parent.trigger('toolbarUpdating', args);
        mainItem = args.toolbarItems;
        var toolbar = new Toolbar({
            width: '100%',
            items: mainItem,
            clicked: this.defToolbarClicked.bind(this),
            created: function () {
                _this.createFrameColor();
                _this.createFrameSize();
                var frameType = parent.frameObj.type;
                if (frameType === 'line') {
                    _this.createFrameRadius();
                }
                if (frameType === 'line' || frameType === 'inset' || frameType === 'hook') {
                    _this.createFrameInset();
                }
                if (frameType === 'line' || frameType === 'inset') {
                    _this.createFrameOffset();
                }
                if (frameType === 'line') {
                    _this.createFrameAmount();
                    _this.createFrameBorder();
                }
                _this.createFrameGradientColor();
                if (Browser.isDevice) {
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                        toolbar.refreshOverflow();
                    }
                }
                else {
                    _this.createLeftToolbarControls();
                    if (_this.defToolbarItems.length > 0 && document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        toolbar.refreshOverflow();
                    }
                }
                parent.element.querySelector('#' + id + '_' + frameType).focus();
            }
        });
        toolbar.appendTo('#' + id + '_customizeWrapper');
    };
    ToolbarModule.prototype.createFrameGradientColor = function () {
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        parent.element.querySelector('.e-template.e-frame-stroke').appendChild(parent.createElement('input', {
            id: id + '_frame_gradient_fill'
        }));
        var fillColor = new ColorPicker({
            modeSwitcher: false, noColor: true, value: parent.frameObj.gradientColor,
            showButtons: false, mode: 'Palette', cssClass: 'e-frame-gradient-fill-color',
            change: function (args) {
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    frameLineStyle: parent.toPascalCase(parent.frameObj.border), lineCount: parent.frameObj.amount };
                var temp = parent.frameObj.gradientColor;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.gradientColor = args.currentValue.hex;
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    if (args.currentValue.rgba === '') {
                        fillDDB.element.children[0].classList.add('e-nocolor-item');
                    }
                    else {
                        fillDDB.element.children[0].classList.remove('e-nocolor-item');
                        fillDDB.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    }
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting,
                        currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.gradientColor = temp;
                }
                fillDDB.toggle();
            }
        }, '#' + id + '_frame_gradient_fill');
        var fillDDB = new DropDownButton({
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = fillDDB.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                    if (window.innerWidth <= 520) {
                        parentElem.style.left = parent.element.offsetLeft + 'px';
                    }
                }
            },
            target: '.e-frame-gradient-fill-color',
            iconCss: 'e-dropdownbtn-preview',
            cssClass: 'e-ie-ddb-popup'
        }, '#' + id + '_frameGradientColorBtn');
        fillColor.inline = true;
        if (parent.frameObj.gradientColor === '') {
            parent.element.querySelector('.e-frame-stroke.e-template .e-dropdownbtn-preview').classList.add('e-nocolor-item');
        }
        else {
            parent.element.querySelector('.e-frame-stroke.e-template .e-dropdownbtn-preview').style.background
                = parent.frameObj.gradientColor;
        }
    };
    ToolbarModule.prototype.createFrameColor = function () {
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        parent.element.querySelector('.e-template.e-stroke').appendChild(parent.createElement('input', {
            id: id + '_frame_fill'
        }));
        var fillColor = new ColorPicker({
            modeSwitcher: false, value: parent.frameObj.color,
            showButtons: false, mode: 'Palette', cssClass: 'e-frame-fill-color',
            change: function (args) {
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    frameLineStyle: parent.toPascalCase(parent.frameObj.border), lineCount: parent.frameObj.amount };
                var temp = parent.frameObj.color;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.color = args.currentValue.hex;
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    if (args.currentValue.rgba === '') {
                        fillDDB.element.children[0].classList.add('e-nocolor-item');
                    }
                    else {
                        fillDDB.element.children[0].classList.remove('e-nocolor-item');
                        fillDDB.element.children[0].style.backgroundColor = args.currentValue.rgba;
                    }
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting,
                        currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.color = temp;
                }
                fillDDB.toggle();
            }
        }, '#' + id + '_frame_fill');
        var fillDDB = new DropDownButton({
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = fillDDB.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                    if (window.innerWidth <= 520) {
                        parentElem.style.left = parent.element.offsetLeft + 'px';
                    }
                }
            },
            target: '.e-frame-fill-color',
            iconCss: 'e-dropdownbtn-preview',
            cssClass: 'e-ie-ddb-popup'
        }, '#' + id + '_frameColorBtn');
        fillColor.inline = true;
        parent.element.querySelector('.e-stroke.e-template .e-dropdownbtn-preview').style.background = parent.frameObj.color;
    };
    ToolbarModule.prototype.createFrameSize = function () {
        var _this = this;
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('20') },
            { id: '2', text: this.l10n.getConstant('40') },
            { id: '3', text: this.l10n.getConstant('60') },
            { id: '4', text: this.l10n.getConstant('80') },
            { id: '5', text: this.l10n.getConstant('100') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_frameSizeBtn');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = this.l10n.getConstant(parent.frameObj.size.toString());
        spanElem.className = 'e-frame-stroke-width';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                }
                var activeBtn = drpDownBtn.element.childNodes[0].textContent;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    frameLineStyle: parent.toPascalCase(parent.frameObj.border), lineCount: parent.frameObj.amount };
                var temp = parent.frameObj.size;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.size = parseInt(args.item.text, 10);
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    drpDownBtn.content = args.item.text;
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting,
                        currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.size = temp;
                }
                if (Browser.isDevice) {
                    if (document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_16 = getComponent(id + '_bottomToolbar', 'toolbar');
                        toolbar_16.refreshOverflow();
                    }
                }
                else {
                    if (document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_17 = getComponent(id + '_toolbar', 'toolbar');
                        toolbar_17.refreshOverflow();
                    }
                }
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_frameSizeBtn');
    };
    ToolbarModule.prototype.createFrameInset = function () {
        var _this = this;
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('20') },
            { id: '2', text: this.l10n.getConstant('40') },
            { id: '3', text: this.l10n.getConstant('60') },
            { id: '4', text: this.l10n.getConstant('80') },
            { id: '5', text: this.l10n.getConstant('100') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_frameInsetBtn');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = this.l10n.getConstant(parent.frameObj.inset.toString());
        spanElem.className = 'e-frame-inset';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                }
                var activeBtn = drpDownBtn.element.childNodes[0].textContent;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    frameLineStyle: parent.toPascalCase(parent.frameObj.border), lineCount: parent.frameObj.amount };
                var temp = parent.frameObj.inset;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.inset = parseInt(args.item.text, 10);
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    drpDownBtn.content = args.item.text;
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting,
                        currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.inset = temp;
                }
                if (Browser.isDevice) {
                    if (document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_18 = getComponent(id + '_bottomToolbar', 'toolbar');
                        toolbar_18.refreshOverflow();
                    }
                }
                else {
                    if (document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_19 = getComponent(id + '_toolbar', 'toolbar');
                        toolbar_19.refreshOverflow();
                    }
                }
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_frameInsetBtn');
    };
    ToolbarModule.prototype.createFrameOffset = function () {
        var _this = this;
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('20') },
            { id: '2', text: this.l10n.getConstant('40') },
            { id: '3', text: this.l10n.getConstant('60') },
            { id: '4', text: this.l10n.getConstant('80') },
            { id: '5', text: this.l10n.getConstant('100') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_frameOffsetBtn');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = this.l10n.getConstant(parent.frameObj.offset.toString());
        spanElem.className = 'e-frame-offset';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                }
                var activeBtn = drpDownBtn.element.childNodes[0].textContent;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    lineCount: parent.frameObj.amount, frameLineStyle: parent.toPascalCase(parent.frameObj.border) };
                var temp = parent.frameObj.offset;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.offset = parseInt(args.item.text, 10);
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    drpDownBtn.content = args.item.text;
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting,
                        currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.offset = temp;
                }
                if (Browser.isDevice) {
                    if (document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_20 = getComponent(id + '_bottomToolbar', 'toolbar');
                        toolbar_20.refreshOverflow();
                    }
                }
                else {
                    if (document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_21 = getComponent(id + '_toolbar', 'toolbar');
                        toolbar_21.refreshOverflow();
                    }
                }
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_frameOffsetBtn');
    };
    ToolbarModule.prototype.createFrameRadius = function () {
        var _this = this;
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('0') },
            { id: '2', text: this.l10n.getConstant('20') },
            { id: '3', text: this.l10n.getConstant('40') },
            { id: '4', text: this.l10n.getConstant('60') },
            { id: '5', text: this.l10n.getConstant('80') },
            { id: '6', text: this.l10n.getConstant('100') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_frameRadiusBtn');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = this.l10n.getConstant(parent.frameObj.radius.toString());
        spanElem.className = 'e-frame-radius';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                }
                var activeBtn = drpDownBtn.element.childNodes[0].textContent;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    frameLineStyle: parent.toPascalCase(parent.frameObj.border),
                    lineCount: parent.frameObj.amount };
                var temp = parent.frameObj.radius;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.radius = parseInt(args.item.text, 10);
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    drpDownBtn.content = args.item.text;
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting,
                        currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.radius = temp;
                }
                if (Browser.isDevice) {
                    if (document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_22 = getComponent(id + '_bottomToolbar', 'toolbar');
                        toolbar_22.refreshOverflow();
                    }
                }
                else {
                    if (document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_23 = getComponent(id + '_toolbar', 'toolbar');
                        toolbar_23.refreshOverflow();
                    }
                }
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_frameRadiusBtn');
    };
    ToolbarModule.prototype.createFrameAmount = function () {
        var _this = this;
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('1') },
            { id: '2', text: this.l10n.getConstant('2') },
            { id: '3', text: this.l10n.getConstant('3') },
            { id: '4', text: this.l10n.getConstant('4') },
            { id: '5', text: this.l10n.getConstant('5') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_frameAmountBtn');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = this.l10n.getConstant(parent.frameObj.amount.toString());
        spanElem.className = 'e-frame-amount';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                }
                var activeBtn = drpDownBtn.element.childNodes[0].textContent;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                prevFrameSettings = { type: parent.toPascalCase(parent.frameObj.type), color: parent.frameObj.color,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, borderRadius: parent.frameObj.radius,
                    lineCount: parent.frameObj.amount, frameLineStyle: parent.toPascalCase(parent.frameObj.border) };
                var temp = parent.frameObj.amount;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.amount = parseInt(args.item.text, 10);
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    drpDownBtn.content = args.item.text;
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting, currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.amount = temp;
                }
                if (Browser.isDevice) {
                    if (document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_24 = getComponent(id + '_bottomToolbar', 'toolbar');
                        toolbar_24.refreshOverflow();
                    }
                }
                else {
                    if (document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_25 = getComponent(id + '_toolbar', 'toolbar');
                        toolbar_25.refreshOverflow();
                    }
                }
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_frameAmountBtn');
    };
    ToolbarModule.prototype.createFrameBorder = function () {
        var _this = this;
        var parent = this.parent;
        var prevFrameSettings;
        var obj = { frameChangeEventArgs: null };
        var id = parent.element.id;
        var strokeWidthItems = [
            { id: '1', text: this.l10n.getConstant('Solid') },
            { id: '2', text: this.l10n.getConstant('Dashed') },
            { id: '3', text: this.l10n.getConstant('Dotted') }
        ];
        var strokeWidthBtn = document.getElementById(id + '_frameBorderBtn');
        var spanElem = document.createElement('span');
        spanElem.innerHTML = this.l10n.getConstant(parent.toPascalCase(parent.frameObj.border));
        spanElem.className = 'e-frame-border';
        strokeWidthBtn.appendChild(spanElem);
        // Initialize the DropDownButton component.
        var drpDownBtn = new DropDownButton({ items: strokeWidthItems,
            open: function (args) {
                if (Browser.isDevice) {
                    var parentElem = args.element.parentElement;
                    parentElem.style.top = drpDownBtn.element.getBoundingClientRect().top -
                        parentElem.offsetHeight + 'px';
                }
                var activeBtn = drpDownBtn.element.childNodes[0].textContent;
                if (activeBtn !== '') {
                    args.element.querySelector('[aria-label = ' + '"' + activeBtn + '"' + ']').classList.add('e-selected-btn');
                }
            },
            select: function (args) {
                _this.triggerTbarClickEvent(args);
                prevFrameSettings = { lineCount: parent.frameObj.amount, color: parent.frameObj.color, borderRadius: parent.frameObj.radius,
                    gradientColor: parent.frameObj.gradientColor, size: parent.frameObj.size, inset: parent.frameObj.inset,
                    offset: parent.frameObj.offset, frameLineStyle: parent.toPascalCase(parent.frameObj.border),
                    type: parent.toPascalCase(parent.frameObj.type) };
                var temp = parent.frameObj.border;
                var object = { currObj: {} };
                parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                parent.frameObj.border = args.item.text.toLowerCase();
                parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: prevFrameSettings, obj: obj } });
                if (obj['frameChangeEventArgs'] && !obj['frameChangeEventArgs'].cancel) {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                            operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                            previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                            previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                            previousFilter: null, isCircleCrop: null
                        } });
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                    drpDownBtn.content = args.item.text;
                    parent.curFrameObjEvent = { previousFrameSetting: obj['frameChangeEventArgs'].previousFrameSetting, currentFrameSetting: obj['frameChangeEventArgs'].currentFrameSetting };
                    parent.isFrameBtnClick = true;
                }
                else {
                    parent.frameObj.border = temp;
                }
                if (Browser.isDevice) {
                    if (document.getElementById(id + '_bottomToolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_26 = getComponent(id + '_bottomToolbar', 'toolbar');
                        toolbar_26.refreshOverflow();
                    }
                }
                else {
                    if (document.getElementById(id + '_toolbar')) {
                        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                        var toolbar_27 = getComponent(id + '_toolbar', 'toolbar');
                        toolbar_27.refreshOverflow();
                    }
                }
            }
        });
        // Render initialized DropDownButton.
        drpDownBtn.appendTo('#' + id + '_frameBorderBtn');
    };
    ToolbarModule.prototype.initFilterToolbarItem = function () {
        var _this = this;
        var parent = this.parent;
        var id = parent.element.id;
        var mainItem = this.getFilterToolbarItem();
        var args = { toolbarType: 'filter', toolbarItems: mainItem };
        parent.trigger('toolbarUpdating', args);
        mainItem = args.toolbarItems;
        if (document.querySelector('#' + id + '_contextualToolbar').classList.contains('e-control')) {
            getComponent(document.getElementById(id + '_contextualToolbar'), 'toolbar').destroy();
        }
        var toolbar = new Toolbar({
            width: '100%',
            items: mainItem,
            clicked: this.contextualToolbarClicked.bind(this),
            created: function () {
                _this.updatePrivateVariables();
                _this.createCanvasFilter();
                if (parent.currentFilter === '') {
                    parent.currentFilter = id + '_default';
                }
                var hdrWrapper = document.querySelector('#' + id + '_headWrapper');
                if (hdrWrapper) {
                    hdrWrapper.style.display = 'none';
                }
                var filterElem = document.getElementById(parent.currentFilter + 'Canvas');
                if (filterElem) {
                    filterElem.parentElement.parentElement.classList.add('e-selected');
                }
                _this.enableDisableTbrBtn();
                toolbar.refreshOverflow();
            }
        });
        toolbar.appendTo('#' + id + '_contextualToolbar');
    };
    ToolbarModule.prototype.drawDashedLine = function (ctx) {
        ctx.beginPath();
        ctx.setLineDash([5]);
        ctx.rect(10, 10, 280, 130);
        ctx.stroke();
        ctx.closePath();
    };
    ToolbarModule.prototype.createCanvasFilter = function () {
        var parent = this.parent;
        showSpinner(parent.element);
        parent.element.style.opacity = '0.5';
        var imageData = parent.getCurrentCanvasData();
        this.inMemoryCanvas.width = imageData.width;
        this.inMemoryCanvas.height = imageData.height;
        this.inMemoryContext.putImageData(imageData, 0, 0);
        this.updateFilterCanvas('_defaultCanvas', 'default');
        this.updateFilterCanvas('_chromeCanvas', 'chrome');
        this.updateFilterCanvas('_coldCanvas', 'cold');
        this.updateFilterCanvas('_warmCanvas', 'warm');
        this.updateFilterCanvas('_grayscaleCanvas', 'grayscale');
        this.updateFilterCanvas('_sepiaCanvas', 'sepia');
        this.updateFilterCanvas('_invertCanvas', 'invert');
        hideSpinner(parent.element);
        parent.element.style.opacity = '1';
        parent.initialAdjustmentValue = this.lowerContext.filter;
    };
    ToolbarModule.prototype.updateFilterCanvas = function (selector, type) {
        var parent = this.parent;
        var filter = parent.element.querySelector('#' + parent.element.id + selector);
        if (filter) {
            var ctx = filter.getContext('2d');
            ctx = filter.getContext('2d');
            filter.style.width = '100px';
            filter.style.height = '100px';
            parent.notify('filter', { prop: 'updateAdj', value: { type: type, value: null, isPreview: true, ctx: ctx } });
            ctx.drawImage(this.inMemoryCanvas, 0, 0, 300, 150);
            if (parent.isSafari) {
                parent.notify('filter', { prop: 'apply-filter', onPropertyChange: false, value: { context: ctx } });
            }
        }
    };
    ToolbarModule.prototype.getQuickAccessToolbarItem = function (isPenEdit) {
        var parent = this.parent;
        var id = parent.element.id;
        var args = { cancel: false, toolbarItems: [] };
        var toolbarItems = [];
        if (isNullOrUndefined(isPenEdit)) {
            if (parent.activeObj.shape === 'image') {
                toolbarItems.push('Flip');
            }
            if (parent.activeObj.shape !== 'redact') {
                toolbarItems.push('BringToFront');
            }
            toolbarItems.push('Clone');
            toolbarItems.push('Delete');
            if (parent.activeObj.shape === 'text') {
                toolbarItems.push('EditText');
            }
            args.shape = parent.toPascalCase(parent.activeObj.shape);
        }
        else if (isPenEdit) {
            toolbarItems.push('BringToFront');
            toolbarItems.push('Delete');
            args.shape = 'Freehand draw';
        }
        args.toolbarItems = extend([], toolbarItems, null, true);
        parent.trigger('quickAccessToolbarOpen', args);
        var orgToolbarItems = [];
        if (args.cancel) {
            orgToolbarItems = [];
        }
        else {
            for (var i = 0; i < args.toolbarItems.length; i++) {
                switch (args.toolbarItems[i]) {
                    case 'BringToFront':
                        orgToolbarItems.push({ id: id + '_bringToFront', prefixIcon: 'e-icons e-bring-to-front',
                            tooltipText: this.l10n.getConstant('BringToFront'), align: 'Left' });
                        break;
                    case 'Clone':
                        orgToolbarItems.push({ id: id + '_duplicate', prefixIcon: 'e-icons e-order', cssClass: 'top-icon e-order',
                            tooltipText: this.l10n.getConstant('Duplicate'), align: 'Left' });
                        break;
                    case 'Delete':
                        orgToolbarItems.push({ id: id + '_remove', prefixIcon: 'e-icons e-trash', cssClass: 'top-icon e-trash',
                            tooltipText: this.l10n.getConstant('Remove'), align: 'Left' });
                        break;
                    case 'EditText':
                        orgToolbarItems.push({ id: id + '_editText', prefixIcon: 'e-icons e-annotation-edit', cssClass: 'top-icon e-annotation-edit',
                            tooltipText: this.l10n.getConstant('EditText'), align: 'Left' });
                        break;
                    case 'Flip':
                        orgToolbarItems.push({ id: id + '_hFlip', prefixIcon: 'e-icons e-horizontal-flip',
                            tooltipText: this.l10n.getConstant('HorizontalFlip'), align: 'Left' });
                        orgToolbarItems.push({ id: id + '_vFlip', prefixIcon: 'e-icons e-vertical-flip',
                            tooltipText: this.l10n.getConstant('VerticalFlip'), align: 'Left' });
                        break;
                    default:
                        orgToolbarItems.push(args.toolbarItems[i]);
                        break;
                }
            }
        }
        return orgToolbarItems;
    };
    ToolbarModule.prototype.renderQAT = function (isPenEdit) {
        var parent = this.parent;
        var id = parent.element.id;
        if (parent.activeObj && parent.showQuickAccessToolbar) {
            var qtArea = document.getElementById(id + '_quickAccessToolbarArea');
            if (qtArea) {
                this.destroyQuickAccessToolbar();
                qtArea.style.display = 'block';
            }
            var items = this.getQuickAccessToolbarItem(isPenEdit);
            if (items.length === 0) {
                return;
            }
            if (isNullOrUndefined(parent.quickAccessToolbarTemplate)) {
                var toolbarObj = new Toolbar({
                    items: items,
                    clicked: this.quickAccessToolbarClicked.bind(this)
                });
                toolbarObj.appendTo('#' + id + '_quickAccessToolbar');
            }
            var height = this.toolbarHeight && this.toolbarHeight !== 0 ? this.toolbarHeight : qtArea.clientHeight;
            var wrapperElement = parent.element.querySelector('#' + id + '_headWrapper');
            if (isNullOrUndefined(isPenEdit) && (parent.activeObj.activePoint.width !== 0 ||
                parent.activeObj.activePoint.height !== 0 ||
                (parent.activeObj.shape && parent.activeObj.shape === 'path' && parent.activeObj.pointColl.length > 0))) {
                var orderObj = { order: null };
                parent.notify('shape', { prop: 'getHighestOrder', onPropertyChange: false, value: { obj: orderObj } });
                if (parent.activeObj.order > orderObj['order'] && document.getElementById(parent.element.id + '_bringToFront')) {
                    document.getElementById(parent.element.id + '_bringToFront').classList.add('e-overlay');
                }
                else {
                    if (document.getElementById(parent.element.id + '_bringToFront')) {
                        document.getElementById(parent.element.id + '_bringToFront').classList.remove('e-overlay');
                    }
                }
                qtArea.style.width = 'auto';
                parent.activeObj.activePoint.width = Math.abs(parent.activeObj.activePoint.width);
                parent.activeObj.activePoint.height = Math.abs(parent.activeObj.activePoint.height);
                var x = parent.activeObj.activePoint.startX < parent.activeObj.activePoint.endX ?
                    parent.activeObj.activePoint.startX : parent.activeObj.activePoint.endX;
                var y = parent.activeObj.activePoint.startY < parent.activeObj.activePoint.endY ?
                    parent.activeObj.activePoint.startY : parent.activeObj.activePoint.endY;
                var width = parent.activeObj.activePoint.width;
                if (parent.activeObj.rotatedAngle !== 0 && parent.activeObj.shape !== 'arrow') {
                    var object = { activePoint: null };
                    parent.notify('shape', { prop: 'getSquarePointForRotatedShape', onPropertyChange: false,
                        value: { obj: parent.activeObj, object: object } });
                    var point = object['activePoint'];
                    x = point.startX;
                    y = point.startY;
                    width = point.width;
                }
                else if (parent.activeObj.shape === 'path') {
                    var path = parent.getSquarePointForPath(parent.activeObj);
                    x = path.startX;
                    y = path.startY;
                    width = path.width;
                }
                qtArea.style.left = (x + (width / 2)) - (items.length * 25) + 'px';
                if (parseFloat(qtArea.style.left) + (qtArea.clientWidth / 2) !== x + (width / 2)) {
                    var diff = (x + (width / 2)) - (parseFloat(qtArea.style.left) + (qtArea.clientWidth / 2));
                    qtArea.style.left = parseFloat(qtArea.style.left) + diff + 'px';
                }
                if (wrapperElement) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    height = wrapperElement.offsetHeight + height;
                }
                if (y - (height + (height / 1.5)) < parent.img.destTop) {
                    qtArea.style.top = parent.img.destTop + 'px';
                    if (wrapperElement) {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        qtArea.style.top = (parent.img.destTop < 0 ? 0 : parent.img.destTop) + wrapperElement.offsetHeight + 'px';
                    }
                }
                else {
                    height = this.toolbarHeight;
                    qtArea.style.top = y - (height + (height / 1.5)) + 'px';
                }
            }
            else if (isPenEdit) {
                var indexObj = { freehandSelectedIndex: -1 };
                parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                var orderObj = { order: null };
                parent.notify('shape', { prop: 'getHighestOrder', onPropertyChange: false, value: { obj: orderObj } });
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                if (parent.getObjFromId(parent.pointColl[indexObj['freehandSelectedIndex']].id).order >= orderObj['order'] && document.getElementById(parent.element.id + '_bringToFront')) {
                    document.getElementById(parent.element.id + '_bringToFront').classList.add('e-overlay');
                }
                else {
                    if (document.getElementById(parent.element.id + '_bringToFront')) {
                        document.getElementById(parent.element.id + '_bringToFront').classList.remove('e-overlay');
                    }
                }
                var obj = { activePoint: null };
                parent.notify('freehand-draw', { prop: 'getSqPtFD',
                    value: { idx: indexObj['freehandSelectedIndex'], obj: obj } });
                var point = obj['activePoint'];
                qtArea.style.width = 'auto';
                qtArea.style.left = (point.startX + (point.width / 2)) - (items.length * 24) + 'px';
                if (point.startY - (height + (height / 1.5)) < parent.img.destTop) {
                    qtArea.style.top = parent.img.destTop + 'px';
                }
                else {
                    qtArea.style.top = point.startY - (height + (height / 1.5)) + 'px';
                }
            }
            else {
                qtArea.style.display = 'none';
            }
            if (parseFloat(qtArea.style.top) < 0) {
                qtArea.style.top = '0px';
            }
        }
    };
    ToolbarModule.prototype.refreshDropDownBtn = function (isDisabled) {
        if (isNullOrUndefined(isDisabled)) {
            return;
        }
        var parent = this.parent;
        var id = parent.element.id;
        var annotation = document.querySelector('#' + id + '_annotationBtn');
        if (annotation) {
            if (isDisabled) {
                annotation.classList.add('e-disabled');
                annotation.parentElement.classList.add('e-overlay');
            }
            else {
                annotation.classList.remove('e-disabled');
                annotation.parentElement.classList.remove('e-overlay');
            }
            getComponent(annotation, 'dropdown-btn').disabled = isDisabled;
        }
        var transform = document.querySelector('#' + id + '_transformBtn');
        if (transform) {
            if (isDisabled) {
                transform.classList.add('e-disabled');
                transform.parentElement.classList.add('e-overlay');
            }
            else {
                transform.classList.remove('e-disabled');
                transform.parentElement.classList.remove('e-overlay');
            }
            getComponent(transform, 'dropdown-btn').disabled = isDisabled;
        }
        var adjustment = document.querySelector('#' + id + '_adjustment');
        if (adjustment) {
            if (isDisabled) {
                adjustment.classList.add('e-disabled');
                adjustment.parentElement.classList.add('e-overlay');
            }
            else {
                adjustment.classList.remove('e-disabled');
                adjustment.parentElement.classList.remove('e-overlay');
            }
            getComponent(adjustment, 'btn').disabled = isDisabled;
        }
        var filter = document.querySelector('#' + id + '_filter');
        if (filter) {
            if (isDisabled) {
                filter.classList.add('e-disabled');
                filter.parentElement.classList.add('e-overlay');
            }
            else {
                filter.classList.remove('e-disabled');
                filter.parentElement.classList.remove('e-overlay');
            }
            getComponent(filter, 'btn').disabled = isDisabled;
        }
    };
    ToolbarModule.prototype.cropSelect = function (args) {
        var parent = this.parent;
        parent.isCropTab = true;
        if (isNullOrUndefined(parent.transform.cropZoomFactor)) {
            parent.transform.cropZoomFactor = parent.transform.zoomFactor;
            parent.notify('draw', { prop: 'setTempZoomFactor', onPropertyChange: false, value: { tempZoomFactor: parent.transform.zoomFactor } });
        }
        parent.transform.zoomFactor = parent.transform.cropZoomFactor;
        var text = args.item.id;
        this.currentToolbar = 'crop';
        parent.currSelectionPoint = null;
        parent.notify('draw', { prop: 'setIsCropSelect', value: { bool: true } });
        var obj = { prevObj: null };
        parent.notify('crop', { prop: 'getPreviousCropCurrentObj', value: { obj: obj } });
        parent.notify('draw', { prop: 'select', onPropertyChange: false,
            value: { type: text, startX: null, startY: null, width: null, height: null } });
        parent.notify('crop', { prop: 'setPreviousCropCurrentObj', value: { obj: obj['prevObj'] } });
        this.enableDisableTbrBtn();
        parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
    };
    ToolbarModule.prototype.quickAccessToolbarClicked = function (args, isContextualToolbar) {
        var parent = this.parent;
        var id = parent.element.id;
        if (args.item) {
            var isPreventUndoRedo = null;
            var obj = { prevActObj: null };
            var object = { tempObj: null };
            parent.notify('draw', { prop: 'getPrevActObj', onPropertyChange: false, value: { obj: obj } });
            parent.notify('selection', { prop: 'getTempActObj', onPropertyChange: false, value: { obj: object } });
            object['tempObj']['activePoint']['height'] = Math.abs(object['tempObj']['activePoint']['height']);
            var pathObject = { isNewPath: null };
            var ctx = void 0;
            parent.notify('draw', { prop: 'getNewPath', value: { obj: pathObject } });
            var type = args.item.id.replace(id + '_', '').toLowerCase();
            var left = void 0;
            var right = void 0;
            var indexObj = { freehandSelectedIndex: null };
            var shapeId = void 0;
            var isDisabled = void 0;
            var orderObj = { order: null };
            switch (type) {
                case 'duplicate':
                    if (!parent.element.querySelector('#' + id + '_duplicate').classList.contains('e-overlay')) {
                        this.refreshSlider();
                        if (!pathObject['isNewPath'] && JSON.stringify(object['tempObj']) === JSON.stringify(parent.activeObj)) {
                            isPreventUndoRedo = true;
                        }
                        this.duplicateShape(isPreventUndoRedo);
                    }
                    break;
                case 'remove':
                    if (!parent.element.querySelector('#' + id + '_remove').classList.contains('e-overlay')) {
                        parent.noPushUndo = false;
                        this.refreshSlider();
                        parent.notify('selection', { prop: 'deleteItem', onPropertyChange: false });
                    }
                    break;
                case 'edittext':
                    if (!parent.element.querySelector('#' + id + '_editText').classList.contains('e-overlay')) {
                        this.editText();
                    }
                    break;
                case 'rotleft':
                case 'rotright':
                    left = parent.element.querySelector('#' + id + '_rotLeft');
                    right = parent.element.querySelector('#' + id + '_rotRight');
                    if ((left && !left.classList.contains('e-disabled')) ||
                        (right && !right.classList.contains('e-disabled'))) {
                        parent.rotateImage(args.item.id.replace(id + '_', '').toLowerCase());
                    }
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    break;
                case 'hflip':
                    if (!parent.element.querySelector('#' + id + '_hFlip').classList.contains('e-disabled')) {
                        ctx = parent.activeObj.imageCanvas.getContext('2d');
                        parent.horizontalFlip(ctx);
                    }
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    break;
                case 'vflip':
                    if (!parent.element.querySelector('#' + id + '_vFlip').classList.contains('e-disabled')) {
                        ctx = parent.activeObj.imageCanvas.getContext('2d');
                        parent.verticalFlip(ctx);
                    }
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    break;
                case 'bringtofront':
                    if (!parent.element.querySelector('#' + id + '_bringToFront').classList.contains('e-overlay')) {
                        parent.notify('freehand-draw', { prop: 'getFreehandSelectedIndex', onPropertyChange: false, value: { obj: indexObj } });
                        shapeId = indexObj['freehandSelectedIndex'] !== null ? parent.pointColl[indexObj['freehandSelectedIndex']].id :
                            parent.activeObj.currIndex;
                        parent.updateShapeOrder(shapeId, type);
                        isDisabled = false;
                        parent.notify('shape', { prop: 'getHighestOrder', onPropertyChange: false, value: { obj: orderObj } });
                        if (shapeId.indexOf('pen') > -1) {
                            parent.notify('shape', { prop: 'updateShapeColl', onPropertyChange: false });
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var order = parent.getObjFromId(shapeId).order;
                            isDisabled = order >= orderObj['order'] ? true : false;
                        }
                        else {
                            /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
                            var order = parent.getObjFromId(shapeId).order;
                            isDisabled = order > orderObj['order'] ? true : false;
                        }
                        if (isDisabled) {
                            document.getElementById(parent.element.id + '_bringToFront').classList.add('e-overlay');
                        }
                        else {
                            document.getElementById(parent.element.id + '_bringToFront').classList.remove('e-overlay');
                        }
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                    break;
            }
            if (type === 'duplicate' || type === 'remove') {
                parent.notify('draw', { prop: 'redrawDownScale' });
            }
        }
        if (isNullOrUndefined(isContextualToolbar)) {
            parent.trigger('quickAccessToolbarItemClick', args);
        }
    };
    ToolbarModule.prototype.editText = function () {
        var parent = this.parent;
        var points = { x: parent.activeObj.activePoint.startX, y: parent.activeObj.activePoint.startY };
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('selection', { prop: 'setTempActObj', onPropertyChange: false,
            value: { obj: extend({}, parent.activeObj, {}, true) } });
        parent.notify('selection', { prop: 'setInitialTextEdit', onPropertyChange: false,
            value: { bool: true } });
        parent.notify('draw', { prop: 'setPrevActObj', onPropertyChange: false,
            value: { prevActObj: extend({}, parent.activeObj, {}, true) } });
        if (parent.activeObj.rotatedAngle !== 0) {
            var object = { x: points.x, y: points.y };
            parent.notify('shape', { prop: 'getTextBoxPosition', onPropertyChange: false,
                value: { obj: parent.activeObj, object: object } });
            points.x = object['x'];
            points.y = object['y'];
            var object1 = { x: points.x, y: points.y };
            parent.notify('shape', { prop: 'setFlipState', onPropertyChange: false,
                value: { x: points.x, y: points.y, obj: parent.activeObj, object: object1 } });
            points.x = object1['x'];
            points.y = object1['y'];
        }
        var tempActiveObj = extend({}, parent.activeObj, {}, true);
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        this.lowerContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
        parent.notify('draw', { prop: 'redrawImgWithObj', onPropertyChange: false });
        parent.notify('draw', { prop: 'redrawDownScale' });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.lowerContext } });
        parent.notify('draw', { prop: 'clearOuterCanvas', onPropertyChange: false, value: { context: this.upperContext } });
        parent.activeObj = tempActiveObj;
        parent.notify('shape', { prop: 'renderTextArea', onPropertyChange: false,
            value: { x: points.x, y: points.y, actObj: parent.activeObj } });
        if (isNullOrUndefined(parent.activeObj.currIndex)) {
            parent.notify('draw', { prop: 'setShapeTextInsert', onPropertyChange: false, value: { bool: true } });
        }
        if (document.getElementById(parent.element.id + '_quickAccessToolbarArea')) {
            document.getElementById(parent.element.id + '_quickAccessToolbarArea').style.display = 'none';
        }
    };
    ToolbarModule.prototype.duplicateShape = function (isPreventUndoRedo, isPublicMethod) {
        var parent = this.parent;
        var tempObj = { activePoint: { startX: 0, startY: 0, endX: 0, endY: 0, width: 0, height: 0 },
            flipObjColl: [], triangle: [], triangleRatio: [] };
        parent.notify('selection', { prop: 'setTempActObj', onPropertyChange: false,
            value: { obj: tempObj } });
        var obj = { prevActObj: null };
        parent.notify('draw', { prop: 'getPrevActObj', onPropertyChange: false, value: { obj: obj } });
        var pathObject = { isNewPath: null };
        parent.notify('draw', { prop: 'getNewPath', value: { obj: pathObject } });
        var objColl;
        var duplicateObj = extend({}, parent.activeObj, {}, true);
        var orderObj = { order: null };
        parent.notify('shape', { prop: 'getHighestOrder', onPropertyChange: false, value: { obj: orderObj } });
        if (duplicateObj.order) {
            parent.notify('shape', { prop: 'updateShapeColl', onPropertyChange: false });
            duplicateObj.order = orderObj['order'] > duplicateObj.order ? orderObj['order'] + 1 : duplicateObj.order + 1;
        }
        else {
            parent.noPushUndo = true;
            parent.okBtn();
            parent.noPushUndo = false;
            parent.selectShape(duplicateObj.currIndex);
            duplicateObj.order = orderObj['order'] > duplicateObj.order ? orderObj['order'] + 1 : duplicateObj.order + 1;
        }
        if (duplicateObj.shape === 'image') {
            objColl = extend([], parent.objColl, [], true);
            parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl } });
        }
        if (isNullOrUndefined(parent.activeObj.currIndex)) {
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: isPreventUndoRedo } });
        }
        else if (obj['prevActObj'] || isPublicMethod) {
            parent.activeObj.currIndex = null;
            duplicateObj.currIndex = null;
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: isPreventUndoRedo } });
        }
        else {
            parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
        }
        var noPushUndo = parent.noPushUndo;
        parent.noPushUndo = false;
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        parent.noPushUndo = noPushUndo;
        objColl = extend([], parent.objColl, [], true);
        duplicateObj.activePoint.startX += 10;
        duplicateObj.activePoint.startY -= 10;
        duplicateObj.activePoint.endX += 10;
        duplicateObj.activePoint.endY -= 10;
        if (duplicateObj.shape === 'path') {
            for (var i = 0; i < duplicateObj.pointColl.length; i++) {
                duplicateObj.pointColl[i].x += 10;
                duplicateObj.pointColl[i].y -= 10;
            }
        }
        else if (duplicateObj.shape === 'image') {
            duplicateObj.imageCanvas = parent.createElement('canvas');
        }
        var shapeIDObj = { id: 'shape_' + (parent.objColl.length + 1) };
        parent.notify('shape', { prop: 'getNewShapeId', onPropertyChange: false, value: { obj: shapeIDObj } });
        duplicateObj.currIndex = shapeIDObj['id'];
        parent.activeObj = extend({}, duplicateObj, {}, true);
        if (parent.activeObj.shape === 'image') {
            var activePoint = extend({}, duplicateObj.activePoint, {}, true);
            var dimObj = { width: 0, height: 0 };
            parent.notify('transform', { prop: 'calcMaxDimension', onPropertyChange: false,
                value: { width: parent.activeObj.imageElement.width, height: parent.activeObj.imageElement.height,
                    obj: dimObj, isImgShape: null } });
            parent.activeObj.activePoint.width = dimObj['width'];
            parent.activeObj.activePoint.height = dimObj['height'];
            if (parent.activeObj.isHorImageFlip && parent.activeObj.isVerImageFlip) {
                parent.activeObj.isHorImageFlip = parent.activeObj.isVerImageFlip = false;
                parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                    value: { ctx: duplicateObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: true, isVFlip: true } });
                parent.activeObj.isHorImageFlip = parent.activeObj.isVerImageFlip = true;
            }
            else if (parent.activeObj.isHorImageFlip) {
                parent.activeObj.isHorImageFlip = false;
                parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                    value: { ctx: duplicateObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: true, isVFlip: null } });
                parent.activeObj.isHorImageFlip = true;
            }
            else if (parent.activeObj.isVerImageFlip) {
                parent.activeObj.isVerImageFlip = false;
                parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                    value: { ctx: duplicateObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: null, isVFlip: true } });
                parent.activeObj.isVerImageFlip = true;
            }
            else {
                parent.notify('draw', { prop: 'downScaleImgCanvas', onPropertyChange: false,
                    value: { ctx: duplicateObj.imageCanvas.getContext('2d'), isImgAnnotation: true, isHFlip: null, isVFlip: null } });
            }
            parent.activeObj.activePoint = activePoint;
        }
        if (parent.activeObj.shape === 'line' || parent.activeObj.shape === 'arrow') {
            parent.notify('shape', { prop: 'setPointCollForLineArrow', onPropertyChange: false,
                value: { obj: parent.activeObj } });
        }
        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj,
                isCropRatio: null, points: null, isPreventDrag: true } });
        parent.notify('undo-redo', { prop: 'updateUrObj', onPropertyChange: false, value: { objColl: objColl } });
        parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
        parent.noPushUndo = false;
        parent.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
        parent.noPushUndo = true;
        parent.notify('selection', { prop: 'redrawShape', onPropertyChange: false,
            value: { obj: parent.objColl[parent.objColl.length - 1] } });
        var id = parent.element.id;
        var toolbarId = Browser.isDevice ? '#' + id + '_bottomToolbar ' + '#' + id : '#' + id;
        var object = { freehandDrawSelectedId: null };
        parent.notify('freehand-draw', { prop: 'getFreehandDrawSelectedId', onPropertyChange: false, value: { obj: object } });
        this.enableDisableCloneBtn(toolbarId, object);
        this.renderQAT();
        if (parent.activeObj.shape && parent.activeObj.shape === 'redact') {
            this.redactSlider(parent.activeObj.redactType);
        }
    };
    ToolbarModule.prototype.defToolbarClicked = function (args) {
        var parent = this.parent;
        var id = parent.element.id;
        var isContextualToolbar = false;
        var isFilterFinetune = false;
        if (!this.isFrameToolbar && parent.element.querySelector('.e-contextual-toolbar-wrapper')) {
            if (!parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hide')) {
                isContextualToolbar = isFilterFinetune = true;
            }
            var straightenObj = { bool: parent.isStraightening };
            if (!Browser.isDevice || (Browser.isDevice && !straightenObj['bool'])) {
                parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
            }
        }
        if (args.item) {
            var type = args.item.id.replace(id + '_', '').toLowerCase();
            if (type === 'duplicate' || type === 'remove' || type === 'edittext' ||
                type === 'hflip' || type === 'vflip' || type === 'rotleft' || type === 'rotright') {
                this.quickAccessToolbarClicked(args, true);
                parent.trigger('toolbarItemClicked', args);
            }
            else {
                var isDisabledFilter = false;
                var isDisabledAdjustment = false;
                var adjustment = document.querySelector('#' + id + '_adjustment');
                if (adjustment && adjustment.classList.contains('e-disabled')) {
                    isDisabledAdjustment = true;
                }
                var filter = document.querySelector('#' + id + '_filter');
                if (filter && filter.classList.contains('e-disabled')) {
                    isDisabledFilter = true;
                }
                this.enableDisableTbrBtn();
                this.performDefTbrClick(type, isContextualToolbar, isDisabledAdjustment, isDisabledFilter, isFilterFinetune);
                parent.trigger('toolbarItemClicked', args);
                if (parent.isStraightening) {
                    parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
                }
                var validTypes = ['undo', 'redo', 'cancel', 'aspectratio', 'nonaspectratio',
                    'save', 'duplicate', 'filter', 'frame', 'none', 'mat', 'bevel', 'line', 'inset', 'hook', 'resize',
                    'remove'];
                if (validTypes.indexOf(type) !== -1) {
                    parent.notify('draw', { prop: 'redrawDownScale' });
                }
            }
        }
    };
    ToolbarModule.prototype.performDefTbrClick = function (type, isContextualToolbar, isDisabledAdjustment, isDisabledFilter, isFilterFinetune) {
        var parent = this.parent;
        var id = parent.element.id;
        var zoomIn = parent.element.querySelector('#' + id + '_zoomIn');
        var aspectRatioHeight = parent.element.querySelector('#' + id + '_resizeHeight');
        var aspectRatioWidth = parent.element.querySelector('#' + id + '_resizeWidth');
        var isCropSelection = false;
        var panBtn;
        var splitWords;
        var actionType;
        var actionArgs;
        var isRedactClick = false;
        if (parent.activeObj.shape !== undefined) {
            splitWords = parent.activeObj.shape.split('-');
        }
        if (splitWords === undefined && parent.currObjType.isCustomCrop) {
            isCropSelection = true;
        }
        else if (splitWords !== undefined && splitWords[0] === 'crop') {
            isCropSelection = true;
        }
        if (!parent.disabled) {
            switch (type) {
                case 'pan':
                    parent.currObjType.isCustomCrop = parent.currObjType.isFiltered = false;
                    parent.currObjType.isRedact = false;
                    if (parent.currObjType.isUndoAction) {
                        parent.notify('undo-redo', { prop: 'refreshUrc', value: { bool: null } });
                    }
                    if (isCropSelection) {
                        parent.currObjType.isCustomCrop = false;
                        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
                        this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                        this.refreshToolbar('main');
                    }
                    if (parent.togglePan) {
                        this.cancelPan();
                        parent.notify('transform', { prop: 'setDisablePan', onPropertyChange: false, value: { bool: true } });
                        if (this.currentToolbar === 'pen') {
                            parent.freeHandDraw(true);
                        }
                    }
                    else {
                        panBtn = parent.element.querySelector('.e-img-pan .e-btn');
                        if (panBtn) {
                            panBtn.classList.add('e-selected-btn');
                        }
                        parent.pan(true);
                        parent.notify('transform', { prop: 'setDisablePan', onPropertyChange: false, value: { bool: false } });
                    }
                    if (zoomIn && parent.zoomSettings.zoomFactor >= parent.zoomSettings.maxZoomFactor) {
                        zoomIn.classList.add('e-disabled');
                        zoomIn.parentElement.classList.add('e-overlay');
                    }
                    else if (zoomIn) {
                        zoomIn.classList.remove('e-disabled');
                        zoomIn.parentElement.classList.remove('e-overlay');
                    }
                    this.refreshToolbar('main');
                    break;
                case 'cancel':
                    if (parent.currObjType.isRedact) {
                        parent.currObjType.isRedact = false;
                    }
                    if (this.isFrameToolbar && parent.element.querySelector('.e-contextual-toolbar-wrapper') && !parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hide')) {
                        parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                    }
                    parent.notify('draw', { prop: 'performCancel', value: { isContextualToolbar: isContextualToolbar, isFinalCancel: true } });
                    break;
                case 'ok':
                    if (Browser.isDevice && this.isFrameToolbar && parent.element.querySelector('.e-contextual-toolbar-wrapper') && !parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.contains('e-hide')) {
                        parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                    }
                    parent.okBtn(null, true);
                    parent.drawingShape = null;
                    this.refreshDropDownBtn(false);
                    this.currentToolbar = 'main';
                    parent.isStraightening = false;
                    parent.notify('draw', { prop: 'resetTempObjColl' });
                    parent.notify('draw', { prop: 'resetTempPointColl' });
                    break;
                case 'crop':
                    parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
                    if (Browser.isDevice) {
                        this.updateContextualToolbar('color', 'straighten');
                    }
                    break;
                case 'reset':
                    parent.reset();
                    this.imageHeight = null;
                    this.imageWidth = null;
                    parent.aspectHeight = null;
                    parent.aspectWidth = null;
                    this.isAspectRatio = true;
                    this.currentToolbar = 'main';
                    break;
                case 'undo':
                    parent.noPushUndo = false;
                    if (parent.togglePen || parent.drawingShape) {
                        parent.okBtn();
                        parent.drawingShape = null;
                    }
                    parent.notify('undo-redo', { prop: 'call-undo' });
                    break;
                case 'redo':
                    parent.noPushUndo = false;
                    if (parent.togglePen || parent.drawingShape) {
                        parent.okBtn();
                        parent.drawingShape = null;
                    }
                    parent.notify('undo-redo', { prop: 'call-redo' });
                    break;
                case 'aspectratio':
                    if (!parent.isCircleCrop && (isNullOrUndefined(parent.currSelectionPoint)) ||
                        (parent.currSelectionPoint && parent.currSelectionPoint.shape !== 'crop-circle')) {
                        if (getComponent(aspectRatioWidth, 'numerictextbox').value) {
                            parent.aspectWidth = getComponent(aspectRatioWidth, 'numerictextbox').value;
                            parent.aspectHeight = getComponent(aspectRatioHeight, 'numerictextbox').value;
                            parent.notify('transform', { prop: 'resize', value: { width: parent.aspectWidth, height: null, isAspectRatio: true } });
                        }
                        else if (getComponent(aspectRatioHeight, 'numerictextbox').value) {
                            parent.aspectWidth = parseFloat(getComponent(aspectRatioWidth, 'numerictextbox').placeholder);
                            parent.aspectHeight = getComponent(aspectRatioHeight, 'numerictextbox').value;
                            parent.notify('transform', { prop: 'resize', value: { width: parent.aspectWidth, height: parent.aspectHeight, isAspectRatio: true } });
                        }
                        parent.resizeSrc = { startX: parent.img.srcLeft, startY: parent.img.srcTop, width: parent.img.srcWidth,
                            height: parent.img.srcHeight };
                        this.refreshToolbar('resize');
                    }
                    break;
                case 'nonaspectratio':
                    if (getComponent(aspectRatioWidth, 'numerictextbox').value ||
                        getComponent(aspectRatioHeight, 'numerictextbox').value) {
                        parent.aspectWidth = getComponent(aspectRatioWidth, 'numerictextbox').value ?
                            getComponent(aspectRatioWidth, 'numerictextbox').value :
                            parseFloat(getComponent(aspectRatioWidth, 'numerictextbox').placeholder);
                        parent.aspectHeight = getComponent(aspectRatioHeight, 'numerictextbox').value ?
                            getComponent(aspectRatioHeight, 'numerictextbox').value :
                            parseFloat(getComponent(aspectRatioHeight, 'numerictextbox').placeholder);
                        parent.notify('transform', { prop: 'resize', value: { width: parent.aspectWidth, height: parent.aspectHeight, isAspectRatio: false } });
                    }
                    parent.resizeSrc = { startX: parent.img.srcLeft, startY: parent.img.srcTop, width: parent.img.srcWidth,
                        height: parent.img.srcHeight };
                    this.refreshToolbar('resize');
                    break;
                case 'resize':
                    if (parent.currObjType.isFiltered || parent.currObjType.isRedact) {
                        parent.okBtn();
                    }
                    this.resizeClick();
                    break;
                case 'adjustment':
                    if (!isDisabledAdjustment) {
                        if (parent.currObjType.isFiltered || parent.currObjType.isRedact) {
                            parent.okBtn();
                        }
                        this.refreshToolbar('adjustment');
                        parent.setTempFilterProperties();
                        parent.notify('draw', { prop: 'updateFinetune' });
                        parent.notify('filter', { prop: 'setTempAdjVal' });
                        this.openSlider('brightness');
                    }
                    break;
                case 'brightness':
                case 'contrast':
                case 'hue':
                case 'saturation':
                case 'opacity':
                case 'blur':
                case 'exposure':
                    this.openSlider(type);
                    break;
                case 'filter':
                    if (!isDisabledFilter) {
                        showSpinner(parent.element);
                        this.refreshToolbar('filter');
                        parent.setTempFilterProperties();
                        hideSpinner(parent.element);
                    }
                    break;
                case 'default':
                case 'chrome':
                case 'cold':
                case 'warm':
                case 'grayscale':
                case 'blackandwhite':
                case 'sepia':
                case 'invert':
                case 'sharpen':
                    parent.currObjType.isFiltered = true;
                    parent.notify('filter', { prop: 'applyImageFilter', value: { option: type } });
                    break;
                case 'upload':
                    if (isFilterFinetune) {
                        parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.remove('e-hide');
                    }
                    break;
                case 'bold':
                    parent.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
                    if (parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'italic' } });
                    }
                    else if (parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'default' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bolditalic' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bold' } });
                    }
                    if (parent.element.querySelector('#' + id + '_bold').classList.contains('e-selected-btn')) {
                        parent.element.querySelector('#' + id + '_bold').classList.remove('e-selected-btn');
                    }
                    else {
                        parent.element.querySelector('#' + id + '_bold').classList.add('e-selected-btn');
                    }
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                    break;
                case 'italic':
                    parent.notify('selection', { prop: 'setInitialTextEdit', value: { bool: false } });
                    if (parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bold' } });
                    }
                    else if (parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'bolditalic' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'default' } });
                    }
                    else if (!parent.activeObj.textSettings.bold && !parent.activeObj.textSettings.italic) {
                        parent.notify('shape', { prop: 'applyFontStyle', onPropertyChange: false,
                            value: { item: 'italic' } });
                    }
                    if (parent.element.querySelector('#' + id + '_italic').classList.contains('e-selected-btn')) {
                        parent.element.querySelector('#' + id + '_italic').classList.remove('e-selected-btn');
                    }
                    else {
                        parent.element.querySelector('#' + id + '_italic').classList.add('e-selected-btn');
                    }
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                    }
                    break;
                case 'croptransform':
                    this.performCropTransformClick();
                    break;
                case 'rotateleft':
                case 'rotateright':
                case 'horizontalflip':
                case 'verticalflip':
                    parent.transformSelect(type);
                    this.updateRedactObj();
                    if (type === 'rotateleft' || type === 'rotateright') {
                        parent.notify('draw', { prop: 'resetStraightenDestPoints' });
                        parent.notify('draw', { prop: 'setDestForStraighten' });
                    }
                    parent.notify('transform', { prop: 'disableZoomOutBtn', value: { isZoomOut: true } });
                    if (Browser.isDevice) {
                        this.updateContextualToolbar('color', 'straighten');
                    }
                    actionType = type === 'rotateleft' || type === 'rotateright' ?
                        'rotate' : 'flip';
                    actionArgs = { action: actionType, actionEventArgs: parent.editCompleteArgs };
                    parent.triggerEditCompleteEvent(actionArgs);
                    break;
                case 'save':
                    parent.noPushUndo = false;
                    parent.okBtn();
                    parent.drawingShape = null;
                    this.saveDialogPopup();
                    break;
                case 'transparency':
                    this.updateContextualToolbar('transparency', 'transparency');
                    break;
                case 'frame':
                    this.frameToolbarClick();
                    break;
                case 'none':
                case 'mat':
                case 'bevel':
                case 'line':
                case 'inset':
                case 'hook':
                    this.unselectFrameBtn();
                    if (parent.element.querySelector('#' + id + '_' + type)) {
                        parent.element.querySelector('#' + id + '_' + type).classList.add('e-selected-btn');
                    }
                    parent.frameObj.type = type;
                    parent.frameObj.size = 20;
                    parent.frameObj.inset = 20;
                    parent.frameObj.radius = 0;
                    parent.frameObj.amount = 1;
                    if (type === 'inset') {
                        parent.frameObj.offset = 60;
                    }
                    else {
                        parent.frameObj.offset = 20;
                    }
                    this.refreshToolbar('frame');
                    parent.notify('draw', { prop: 'render-image', value: { isMouseWheel: null, isPreventClearRect: null, isFrame: true } });
                    parent.isFrameBtnClick = true;
                    parent.curFrameObjEvent = { previousFrameSetting: parent.tempFrameObj, currentFrameSetting: parent.frameObj };
                    parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: parent.tempFrameObj, obj: { frameChangeEventArgs: null } } });
                    break;
                case 'redact':
                    parent.currObjType.isRedact = isRedactClick = true;
                    parent.drawingShape = 'redact';
                    if (isNullOrUndefined(parent.activeObj.redactBlur)) {
                        parent.activeObj.redactBlur = 20;
                    }
                    if (isNullOrUndefined(parent.activeObj.redactPixelate)) {
                        parent.activeObj.redactPixelate = 20;
                    }
                    parent.notify('selection', { prop: 'annotate', value: { shape: 'redact' } });
                    this.refreshToolbar('redact');
                    this.redactSlider(parent.activeObj.redactType);
                    break;
                case 'pixelate':
                    parent.currObjType.isRedact = isRedactClick = true;
                    parent.drawingShape = 'redact';
                    parent.notify('selection', { prop: 'annotate', value: { shape: 'redact' } });
                    if (parent.activeObj.redactType === 'blur') {
                        this.updateRedactType('pixelate');
                    }
                    parent.notify('shape', { prop: 'setRedactType', onPropertyChange: false,
                        value: { redactType: 'pixelate' } });
                    if (parent.activeObj.redactType === 'pixelate') {
                        var pixelateBtn = parent.element.querySelector('#' + id + '_' + 'pixelate');
                        var redactBlurBtn = parent.element.querySelector('#' + id + '_' + 'redactBlur');
                        if (pixelateBtn) {
                            pixelateBtn.classList.add('e-selected-btn');
                        }
                        if (redactBlurBtn && redactBlurBtn.classList.contains('e-selected-btn')) {
                            redactBlurBtn.classList.remove('e-selected-btn');
                        }
                    }
                    else {
                        var redactBlurBtn = parent.element.querySelector('#' + id + '_' + 'redactBlur');
                        if (redactBlurBtn) {
                            redactBlurBtn.classList.add('e-selected-btn');
                        }
                    }
                    this.redactSlider(parent.activeObj.redactType);
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                            value: { operation: 'shapeTransform', previousObj: null, previousObjColl: null,
                                previousPointColl: null, previousSelPointColl: null,
                                previousCropObj: null, previousText: null,
                                currentText: null, previousFilter: null, isCircleCrop: null } });
                    }
                    break;
                case 'redactblur':
                    parent.currObjType.isRedact = isRedactClick = true;
                    parent.drawingShape = 'redact';
                    parent.notify('selection', { prop: 'annotate', value: { shape: 'redact' } });
                    parent.notify('shape', { prop: 'setRedactType', onPropertyChange: false,
                        value: { redactType: 'blur' } });
                    if (parent.activeObj.redactType === 'pixelate') {
                        this.updateRedactType('blur');
                    }
                    parent.notify('shape', { prop: 'setRedactType', onPropertyChange: false, value: { redactType: 'blur' } });
                    if (parent.activeObj.redactType === 'blur') {
                        var redactBlurBtn = parent.element.querySelector('#' + id + '_' + 'redactBlur');
                        var pixelateBtn = parent.element.querySelector('#' + id + '_' + 'pixelate');
                        if (redactBlurBtn) {
                            redactBlurBtn.classList.add('e-selected-btn');
                        }
                        if (pixelateBtn && pixelateBtn.classList.contains('e-selected-btn')) {
                            pixelateBtn.classList.remove('e-selected-btn');
                        }
                    }
                    else {
                        var pixelateBtn = parent.element.querySelector('#' + id + '_' + 'pixelate');
                        if (pixelateBtn) {
                            pixelateBtn.classList.add('e-selected-btn');
                        }
                    }
                    this.redactSlider(parent.activeObj.redactType);
                    if (parent.activeObj.activePoint.width !== 0 || parent.activeObj.activePoint.height !== 0) {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                            value: { operation: 'shapeTransform', previousObj: null, previousObjColl: null,
                                previousPointColl: null, previousSelPointColl: null,
                                previousCropObj: null, previousText: null,
                                currentText: null, previousFilter: null, isCircleCrop: null } });
                    }
                    break;
            }
            if (isRedactClick) {
                parent.notify('draw', { prop: 'updateTempObjColl' });
                parent.notify('draw', { prop: 'updateTempPointColl' });
            }
        }
    };
    ToolbarModule.prototype.updateRedactType = function (value) {
        var parent = this.parent;
        parent.activeObj.redactType = value;
        parent.notify('shape', { prop: 'setRedactType', value: { type: value } });
        this.parent.objColl.push(parent.activeObj);
        parent.notify('selection', { prop: 'redrawShape', value: { obj: parent.objColl[parent.objColl.length - 1] } });
    };
    ToolbarModule.prototype.frameToolbarClick = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var frame = document.querySelector('#' + id + '_frame');
        var zoom;
        var frameObj;
        var tempFrameObj;
        parent.notify('draw', { prop: 'updateCropSelection', onPropertyChange: false });
        if (parent.currObjType.isFiltered || parent.currObjType.isRedact) {
            parent.okBtn();
        }
        if (frame && !frame.classList.contains('e-overlay')) {
            zoom = parent.transform.zoomFactor;
            parent.frameDestPoints = extend({}, parent.img, {}, true);
            if (isNullOrUndefined(parent.cxtTbarHeight)) {
                frameObj = extend({}, parent.frameObj, {}, true);
                tempFrameObj = extend({}, parent.tempFrameObj, {}, true);
                this.callFrameToolbar();
                parent.frameObj.type = 'mat';
                this.callFrameToolbar();
                parent.cxtTbarHeight = parent.element.querySelector('#' + id + '_customizeWrapper').scrollHeight;
                parent.frameObj = frameObj;
                parent.tempFrameObj = tempFrameObj;
            }
            this.zoomToFrameRange();
            parent.tempFrameZoomLevel = zoom;
            if (Browser.isDevice) {
                parent.img.destTop -= (parent.cxtTbarHeight / 2);
            }
            else {
                parent.img.destTop += (parent.cxtTbarHeight / 2);
            }
            this.callFrameToolbar();
            parent.notify('draw', { prop: 'triggerFrameChange', value: { prevFrameSettings: parent.frameObj, obj: { frameChangeEventArgs: null } } });
        }
    };
    ToolbarModule.prototype.zoomToFrameRange = function () {
        var parent = this.parent;
        this.isFrameToolbar = false;
        parent.notify('transform', { prop: 'resetZoom', onPropertyChange: false });
        var isSmaller = true;
        while (isSmaller) {
            if (this.toolbarHeight + parent.img.destTop >= (this.toolbarHeight + parent.cxtTbarHeight)) {
                isSmaller = false;
                break;
            }
            parent.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                value: { zoomFactor: -.1, zoomPoint: null, isResize: true } });
        }
        this.isFrameToolbar = true;
    };
    ToolbarModule.prototype.resizeClick = function () {
        var parent = this.parent;
        parent.notify('draw', { prop: 'updateCropSelection', onPropertyChange: false });
        parent.upperCanvas.style.cursor = 'default';
        parent.notify('transform', { prop: 'updateResize', value: { bool: false } });
        if (this.isAspectRatio) {
            this.isAspectRatio = false;
        }
        else {
            this.isAspectRatio = true;
        }
        parent.isResize = true;
        this.refreshToolbar('resize');
    };
    ToolbarModule.prototype.callFrameToolbar = function () {
        var parent = this.parent;
        extend(parent.tempFrameObj, parent.frameObj);
        var undoRedoObj = { appliedUndoRedoColl: [] };
        parent.notify('undo-redo', { prop: 'getAppliedUndoRedoColl', value: { obj: undoRedoObj } });
        if (undoRedoObj['appliedUndoRedoColl']['length'] === 0) {
            var object = { currObj: {} };
            parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
            parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false, value: {
                    operation: 'frame', previousObj: object['currObj'], previousObjColl: object['currObj']['objColl'],
                    previousPointColl: object['currObj']['pointColl'], previousSelPointColl: object['currObj']['selPointColl'],
                    previousCropObj: extend({}, parent.cropObj, {}, true), previousText: null, currentText: null,
                    previousFilter: null, isCircleCrop: null
                } });
        }
        this.refreshToolbar('frame');
    };
    ToolbarModule.prototype.contextualToolbarClicked = function (args) {
        var parent = this.parent;
        var selEle = parent.element.querySelector('.e-contextual-toolbar-wrapper .e-toolbar-item.e-selected');
        if (selEle) {
            selEle.classList.remove('e-selected');
        }
        var type = args.item.id.replace(parent.element.id, '').split('_')[1];
        var imageFiltering = { filter: parent.toPascalCase(type), cancel: false };
        parent.trigger('imageFiltering', imageFiltering);
        parent.editCompleteArgs = imageFiltering;
        if (imageFiltering.cancel) {
            return;
        }
        document.getElementById(args.item.id + 'Canvas').parentElement.parentElement.classList.add('e-selected');
        parent.currObjType.isFiltered = true;
        parent.notify('filter', { prop: 'applyImageFilter', value: { option: type.toLowerCase() } });
        parent.notify('draw', { prop: 'redrawDownScale' });
        parent.currentFilter = args.item.id;
        this.enableDisableTbrBtn();
        parent.isFilterCanvasClick = true;
        parent.curFilterObjEvent = imageFiltering;
    };
    ToolbarModule.prototype.refreshShapeDrawing = function () {
        var parent = this.parent;
        var object = { shape: '' };
        parent.notify('selection', { prop: 'getCurrentDrawingShape', onPropertyChange: false, value: { obj: object } });
        if (object['shape'] !== '') {
            parent.notify('selection', { prop: 'setCurrentDrawingShape', onPropertyChange: false, value: { value: '' } });
            parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
            this.refreshToolbar('main', false);
        }
    };
    ToolbarModule.prototype.zoomInBtnClickHandler = function (e) {
        if (e) {
            var parent_1 = this.parent;
            if ((parent_1.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
                parent_1.noPushUndo = false;
                if (parent_1.currObjType.isFiltered) {
                    parent_1.okBtn();
                }
                var drawingShape = parent_1.drawingShape;
                if (parent_1.drawingShape) {
                    var id = parent_1.activeObj.currIndex;
                    parent_1.noPushUndo = true;
                    parent_1.okBtn();
                    parent_1.noPushUndo = false;
                    parent_1.drawingShape = null;
                    if (id) {
                        parent_1.selectShape(id);
                    }
                }
                this.refreshShapeDrawing();
                if (Browser.isDevice && e.type === 'touchstart') {
                    if (!e.returnValue) {
                        return;
                    }
                    e.preventDefault();
                }
                var zoomIn = document.querySelector('#' + parent_1.element.id + '_zoomIn');
                EventHandler.trigger(zoomIn, 'click');
                var obj = { bool: false };
                parent_1.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
                if (obj['bool']) {
                    parent_1.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
                    this.destroyQuickAccessToolbar();
                }
                parent_1.isZoomBtnClick = true;
                this.applyPreviewFilter();
                parent_1.currObjType.isFiltered = false;
                parent_1.currObjType.isRedact = false;
                if (parent_1.togglePen) {
                    parent_1.currObjType.isZoomed = true;
                    parent_1.freeHandDraw(false);
                    parent_1.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                }
                parent_1.notify('draw', { prop: 'resetCurrentSelectionPoint' });
                parent_1.drawingShape = drawingShape;
                parent_1.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: .1, zoomPoint: null, isResize: null } });
                parent_1.notify('draw', { prop: 'redrawDownScale' });
                if (parent_1.isCropTab || parent_1.activeObj.shape) {
                    parent_1.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                    parent_1.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                }
                if (parent_1.isStraightening) {
                    parent_1.notify('draw', { prop: 'resetStraightenDestPoints' });
                    parent_1.notify('draw', { prop: 'setDestForStraighten' });
                }
                var actionArgs = { action: 'zoom-in',
                    actionEventArgs: parent_1.editCompleteArgs };
                parent_1.triggerEditCompleteEvent(actionArgs);
                if (Browser.isDevice) {
                    zoomIn.focus();
                }
            }
        }
    };
    ToolbarModule.prototype.zoomOutBtnClickHandler = function (e) {
        if (e) {
            var parent_2 = this.parent;
            if ((parent_2.zoomSettings.zoomTrigger & ZoomTrigger.Toolbar) === ZoomTrigger.Toolbar) {
                parent_2.noPushUndo = false;
                if (parent_2.currObjType.isFiltered) {
                    parent_2.okBtn();
                }
                var drawingShape = parent_2.drawingShape;
                if (parent_2.drawingShape) {
                    var id = parent_2.activeObj.currIndex;
                    parent_2.noPushUndo = true;
                    parent_2.okBtn();
                    parent_2.noPushUndo = false;
                    parent_2.drawingShape = null;
                    if (id) {
                        parent_2.selectShape(id);
                    }
                }
                this.refreshShapeDrawing();
                if (Browser.isDevice && e.type === 'touchstart') {
                    if (!e.returnValue) {
                        return;
                    }
                    e.preventDefault();
                }
                var zoomOut = document.querySelector('#' + parent_2.element.id + '_zoomOut');
                EventHandler.trigger(zoomOut, 'click');
                var obj = { bool: false };
                parent_2.notify('selection', { prop: 'getFreehandDrawEditing', onPropertyChange: false, value: { obj: obj } });
                if (obj['bool']) {
                    parent_2.notify('freehand-draw', { prop: 'applyFhd', onPropertyChange: false });
                    this.destroyQuickAccessToolbar();
                }
                parent_2.isZoomBtnClick = true;
                this.applyPreviewFilter();
                parent_2.currObjType.isFiltered = false;
                parent_2.currObjType.isRedact = false;
                if (parent_2.togglePen) {
                    parent_2.currObjType.isZoomed = true;
                    parent_2.freeHandDraw(false);
                    parent_2.notify('undo-redo', { prop: 'updateCurrUrc', value: { type: 'ok' } });
                }
                parent_2.notify('draw', { prop: 'resetCurrentSelectionPoint' });
                parent_2.drawingShape = drawingShape;
                parent_2.notify('transform', { prop: 'zoomAction', onPropertyChange: false,
                    value: { zoomFactor: -.1, zoomPoint: null, isResize: null } });
                parent_2.notify('draw', { prop: 'redrawDownScale' });
                if (parent_2.isCropTab || parent_2.activeObj.shape) {
                    parent_2.notify('draw', { prop: 'setStraightenActObj', value: { activeObj: null } });
                    parent_2.notify('freehand-draw', { prop: 'resetStraightenPoint' });
                }
                if (parent_2.isStraightening) {
                    parent_2.notify('draw', { prop: 'resetStraightenDestPoints' });
                    parent_2.notify('draw', { prop: 'setDestForStraighten' });
                }
                var actionArgs = { action: 'zoom-out',
                    actionEventArgs: parent_2.editCompleteArgs };
                parent_2.triggerEditCompleteEvent(actionArgs);
                if (Browser.isDevice) {
                    zoomOut.focus();
                }
            }
        }
    };
    ToolbarModule.prototype.zoomInBtnMouseDownHandler = function (e) {
        e.preventDefault();
        this.zoomBtnHold = setInterval(this.zoomInBtnClickHandler.bind(this), 250);
    };
    ToolbarModule.prototype.zoomOutBtnMouseDownHandler = function (e) {
        e.preventDefault();
        this.zoomBtnHold = setInterval(this.zoomOutBtnClickHandler.bind(this), 250);
    };
    ToolbarModule.prototype.zoomBtnMouseUpHandler = function () {
        clearInterval(this.zoomBtnHold);
        this.zoomBtnHold = 0;
    };
    ToolbarModule.prototype.closeContextualToolbar = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var isContextualToolbar = false;
        var straightenObj = { bool: parent.isStraightening };
        if (!Browser.isDevice || (Browser.isDevice && !straightenObj['bool'])) {
            if ((parent.element.querySelector('#' + id + '_contextualToolbar') &&
                !parent.element.querySelector('#' + id + '_contextualToolbar').parentElement.classList.contains('e-hide')) ||
                (parent.element.querySelector('#' + id + '_headWrapper')
                    && !parent.element.querySelector('#' + id + '_headWrapper').parentElement.classList.contains('e-hide'))) {
                parent.element.querySelector('.e-contextual-toolbar-wrapper').classList.add('e-hide');
                parent.okBtn();
                this.refreshMainToolbar();
                isContextualToolbar = true;
            }
        }
        return isContextualToolbar;
    };
    ToolbarModule.prototype.destroyQuickAccessToolbar = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var quickToolbar = document.getElementById(id + '_quickAccessToolbar');
        if (quickToolbar && quickToolbar.classList.contains('e-control')) {
            getComponent(quickToolbar, 'toolbar').destroy();
        }
        var qatArea = document.getElementById(id + '_quickAccessToolbarArea');
        if (qatArea) {
            qatArea.style.display = 'none';
        }
    };
    ToolbarModule.prototype.renderSlider = function (type, isSelect) {
        var parent = this.parent;
        var id = parent.element.id;
        var canvasWrapper = document.querySelector('#' + id + '_contextualToolbarArea');
        var hdrWrapper = document.querySelector('#' + id + '_headWrapper');
        var labelWrapper = document.querySelector('#' + id + '_labelWrapper');
        if (hdrWrapper) {
            hdrWrapper.remove();
            labelWrapper.remove();
        }
        hdrWrapper = canvasWrapper.appendChild(parent.createElement('div', {
            id: id + '_headWrapper',
            styles: 'position: relative'
        }));
        if (type === 'transparency') {
            labelWrapper = hdrWrapper.appendChild(parent.createElement('label', {
                id: id + '_labelWrapper',
                className: 'e-ie-finetune-slider-label',
                styles: Browser.isDevice ? 'position: absolute; top: 31%; left: calc(50% - 150px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
                    : 'position: absolute; top: 31%; left: calc(50% - 220px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
            }));
        }
        else {
            labelWrapper = hdrWrapper.appendChild(parent.createElement('label', {
                id: id + '_labelWrapper',
                className: 'e-ie-finetune-slider-label',
                styles: Browser.isDevice ? ('position: absolute; top: 31%; left: calc(50% - 160px); font-size: 15px; text-transform: capitalize; font-weight: 400;')
                    : 'position: absolute; top: 25%; left: calc(50% - 226px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
            }));
        }
        labelWrapper.textContent = this.l10n.getConstant(parent.toPascalCase(type === 'transparency' ? 'opacity' : type));
        var sliderWrapper = hdrWrapper.appendChild(parent.createElement('div', {
            id: id + '_sliderWrapper',
            className: 'e-ie-finetune-slider-wrap',
            styles: 'position: absolute'
        }));
        var value = parent.getCurrAdjustmentValue(type);
        if (isSelect && type === 'straighten' && Browser.isDevice) {
            value = parent.cropObj.straighten;
        }
        var min;
        var max;
        var slider;
        if (type === 'brightness' || type === 'contrast' || type === 'saturation' || type === 'exposure') {
            if (parent.finetuneSettings) {
                if (type === 'brightness' && parent.finetuneSettings.brightness) {
                    min = parent.finetuneSettings.brightness.min;
                    max = parent.finetuneSettings.brightness.max;
                }
                else if (type === 'contrast' && parent.finetuneSettings.contrast) {
                    min = parent.finetuneSettings.contrast.min;
                    max = parent.finetuneSettings.contrast.max;
                }
                else if (type === 'saturation' && parent.finetuneSettings.saturation) {
                    min = parent.finetuneSettings.saturation.min;
                    max = parent.finetuneSettings.saturation.max;
                }
                else if (type === 'exposure' && parent.finetuneSettings.exposure) {
                    min = parent.finetuneSettings.exposure.min;
                    max = parent.finetuneSettings.exposure.max;
                }
                else {
                    min = -100;
                    max = 100;
                }
            }
            else {
                min = -100;
                max = 100;
            }
            slider = this.createSlider(min, max, value, type);
        }
        else if (type === 'hue' || type === 'blur' || type === 'opacity') {
            if (parent.finetuneSettings) {
                if (type === 'hue' && parent.finetuneSettings.hue) {
                    min = parent.finetuneSettings.hue.min;
                    max = parent.finetuneSettings.hue.max;
                }
                else if (type === 'blur' && parent.finetuneSettings.blur) {
                    min = parent.finetuneSettings.blur.min;
                    max = parent.finetuneSettings.blur.max;
                }
                else if (type === 'opacity' && parent.finetuneSettings.opacity) {
                    min = parent.finetuneSettings.opacity.min;
                    max = parent.finetuneSettings.opacity.max;
                }
                else {
                    min = 0;
                    max = 100;
                }
            }
            else {
                min = 0;
                max = 100;
            }
            slider = this.createSlider(min, max, value, type);
        }
        else if (type === 'transparency') {
            min = 0;
            max = 100;
            slider = this.createSlider(min, max, value, type);
        }
        else if (type === 'straighten') {
            min = -45;
            max = 45;
            slider = this.createSlider(min, max, value, type);
        }
        slider.appendTo('#' + id + '_sliderWrapper');
        sliderWrapper.style.left = (parseFloat(canvasWrapper.style.width) - parseFloat(slider.width)) / 2 + 'px';
        if (type === 'straighten' && Browser.isDevice) {
            var sLabelWrapper = hdrWrapper.appendChild(parent.createElement('label', {
                id: id + '_sLabelWrapper',
                className: 'e-ie-straighten-value-span e-ie-finetune-value-span',
                styles: 'position: absolute; top: 31%; margin-left: 20px; font-size: 15px; text-transform: capitalize; font-weight: 400;'
            }));
            sLabelWrapper.innerHTML = parent.transform.straighten.toString() + '&#176';
            sliderWrapper.parentElement.classList.add('e-straighten-slider');
        }
        if (type !== 'straighten') {
            hdrWrapper.appendChild(parent.createElement('label', {
                id: id + '_finetuneSpan',
                className: 'e-ie-finetune-value-span',
                styles: Browser.isDevice ? ('position: absolute; top: 25%; margin-left: 20px; font-size: 15px; text-transform: capitalize; font-weight: 400;') :
                    'position: absolute; top: 25%; left: calc(50% + 190px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
            }));
            sliderWrapper.parentElement.classList.add('e-finetune-slider');
            if (type === 'transparency' && Browser.isDevice) {
                sliderWrapper.parentElement.classList.add('e-ie-device-transparency-slider');
            }
            this.updateFinetuneSpan(type);
        }
    };
    ToolbarModule.prototype.createSlider = function (min, max, value, type) {
        var _this = this;
        var parent = this.parent;
        var step = type === 'straighten' ? 3 : 1;
        return new Slider({
            value: value, type: 'MinRange', min: min, max: max,
            step: step, width: Browser.isDevice ? '180px' : (type === 'straighten' ? '200px' : '300px'),
            cssClass: 'e-slider',
            change: function (args) {
                parent.notify('selection', { prop: 'setSliderActive', onPropertyChange: false, value: { bool: true } });
                if (type === 'transparency') {
                    if (parent.activeObj.shape) {
                        if (isNullOrUndefined(parent.activeObj.imageRatio)) {
                            parent.notify('shape', { prop: 'updImgRatioForActObj', onPropertyChange: false });
                        }
                        parent.notify('shape', { prop: 'pushActItemIntoObj' });
                        var prevCropObj = extend({}, parent.cropObj, {}, true);
                        var object = { currObj: {} };
                        parent.notify('filter', { prop: 'getCurrentObj', onPropertyChange: false, value: { object: object } });
                        var prevObj = object['currObj'];
                        prevObj.objColl = extend([], parent.objColl, [], true);
                        prevObj.pointColl = extend([], parent.pointColl, [], true);
                        prevObj.afterCropActions = extend([], parent.afterCropActions, [], true);
                        var selPointCollObj = { selPointColl: null };
                        parent.notify('freehand-draw', { prop: 'getSelPointColl', onPropertyChange: false,
                            value: { obj: selPointCollObj } });
                        prevObj.selPointColl = extend([], selPointCollObj['selPointColl'], [], true);
                        parent.objColl.pop();
                        parent.activeObj.opacity = args.value / 100;
                        _this.upperContext.clearRect(0, 0, parent.upperCanvas.width, parent.upperCanvas.height);
                        parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate' } });
                        parent.objColl.push(parent.activeObj);
                        parent.notify('undo-redo', { prop: 'updateUndoRedoColl', onPropertyChange: false,
                            value: { operation: 'shapeTransform', previousObj: prevObj, previousObjColl: prevObj.objColl,
                                previousPointColl: prevObj.pointColl, previousSelPointColl: prevObj.selPointColl,
                                previousCropObj: prevCropObj, previousText: null,
                                currentText: null, previousFilter: null, isCircleCrop: null } });
                        parent.notify('selection', { prop: 'redrawShape', value: { obj: parent.objColl[parent.objColl.length - 1] } });
                        _this.updateFinetuneSpan(type);
                    }
                }
                else if (type === 'straighten') {
                    parent.setStraighten(args.value);
                }
                else {
                    if (parent.transform.zoomFactor && parent.transform.zoomFactor < 0) {
                        parent.isFinetuning = true;
                    }
                    parent.notify('selection', { prop: 'setSliding', value: { bool: true } });
                    parent.setCurrAdjustmentValue(type, args.value);
                    _this.updateFinetuneSpan(type);
                    _this.enableDisableTbrBtn();
                    parent.isFinetuning = false;
                }
            },
            changed: function () {
                if (type !== 'transparency' && type !== 'straighten') {
                    parent.notify('selection', { prop: 'setSliding', value: { bool: false } });
                    parent.notify('draw', { prop: 'redrawDownScale' });
                }
                parent.notify('selection', { prop: 'setSliderActive', onPropertyChange: false, value: { bool: false } });
                if (type === 'transparency') {
                    setTimeout(function () {
                        parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                        parent.element.querySelector('#' + parent.element.id + '_transparency').click();
                    }, 50);
                }
            }
        });
    };
    ToolbarModule.prototype.updateFinetuneSpan = function (type) {
        var parent = this.parent;
        var ftValPan = parent.element.querySelector('.e-ie-finetune-value-span');
        if (ftValPan) {
            var adjObj = { adjustmentLevel: null };
            parent.notify('filter', { prop: 'getAdjustmentLevel', onPropertyChange: false, value: { obj: adjObj } });
            ftValPan.innerHTML = Math.round(adjObj['adjustmentLevel'][type]).toString();
        }
    };
    ToolbarModule.prototype.applyPreviewFilter = function () {
        var parent = this.parent;
        if (document.querySelector('#' + parent.element.id + '_sliderWrapper') ||
            parent.currObjType.isFiltered) {
            parent.initialAdjustmentValue = this.lowerContext.filter;
            parent.canvasFilter = this.lowerContext.filter;
            parent.currObjType.isFiltered = false;
        }
    };
    ToolbarModule.prototype.unselectBtn = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var selectors = [
            '#' + id + '_brightness',
            '#' + id + '_contrast',
            '#' + id + '_hue',
            '#' + id + '_saturation',
            '#' + id + '_opacity',
            '#' + id + '_blur',
            '#' + id + '_exposure'
        ];
        for (var _i = 0, selectors_1 = selectors; _i < selectors_1.length; _i++) {
            var selector = selectors_1[_i];
            var element = document.querySelector(selector);
            if (element && element.classList.contains('e-selected-btn')) {
                element.classList.remove('e-selected-btn');
                break;
            }
        }
    };
    ToolbarModule.prototype.openSlider = function (type) {
        this.unselectBtn();
        this.parent.currObjType.isFiltered = true;
        this.refreshToolbar('color', null, null, null, type);
        document.getElementById(this.parent.element.id + '_' + type).classList.add('e-selected-btn');
    };
    ToolbarModule.prototype.refreshSlider = function () {
        var id = this.parent.element.id;
        var sliderWrapper = document.querySelector('#' + id + '_sliderWrapper');
        /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
        var slider = document.querySelector('.e-slider');
        var hdrWrapper = document.querySelector('#' + id + '_headWrapper');
        if (hdrWrapper) {
            hdrWrapper.style.display = 'none';
        }
        if (sliderWrapper && slider) {
            slider.ej2_instances[0].destroy();
            sliderWrapper.remove();
        }
    };
    ToolbarModule.prototype.unselectFrameBtn = function () {
        var parent = this.parent;
        var id = parent.element.id;
        var selectors = [
            '#' + id + '_none',
            '#' + id + '_mat',
            '#' + id + '_line',
            '#' + id + '_inset',
            '#' + id + '_bevel',
            '#' + id + '_hook'
        ];
        for (var _i = 0, selectors_2 = selectors; _i < selectors_2.length; _i++) {
            var selector = selectors_2[_i];
            var element = document.querySelector(selector);
            if (element.classList.contains('e-selected-btn')) {
                element.classList.remove('e-selected-btn');
                break;
            }
        }
    };
    ToolbarModule.prototype.updateToolbarItems = function () {
        var parent = this.parent;
        var id = parent.element.id;
        if (!parent.isImageLoaded) {
            return;
        }
        if (this.isToolbar()) {
            var selFillElem = parent.element.querySelector('.e-fill.e-template .e-dropdownbtn-preview');
            var selStrokeElem = parent.element.querySelector('.e-stroke.e-template .e-dropdownbtn-preview');
            var selTextStrokeElem = parent.element.querySelector('.e-text-font-color.e-template .e-dropdownbtn-preview');
            var selStrokeTextColorElem = parent.element.querySelector('.e-stroke-text-font-color.e-template .e-dropdownbtn-preview');
            var selTextBGElem = parent.element.querySelector('.e-text-background-color.e-template .e-dropdownbtn-preview');
            var selPenStrokeElem = parent.element.querySelector('.e-pen-stroke-color.e-template .e-dropdownbtn-preview');
            var strokeWidthElem = parent.element.querySelector('.e-shape-stroke-width');
            var rectangleRadiusElem = parent.element.querySelector('.e-shape-rectangle-radius');
            var fontFamilyElem = parent.element.querySelector('.e-text-font-family');
            var fontSizeElem = parent.element.querySelector('.e-text-font-size');
            var boldBtn = parent.element.querySelector('#' + id + '_bold');
            var italicBtn = parent.element.querySelector('#' + id + '_italic');
            if (parent.activeObj.strokeSettings && parent.activeObj.textSettings) {
                if (isNullOrUndefined(parent.activeObj.strokeSettings.strokeWidth)) {
                    parent.activeObj.strokeSettings.strokeWidth = 2;
                }
                if (isNullOrUndefined(parent.activeObj.strokeSettings.outlineWidth)) {
                    parent.activeObj.strokeSettings.outlineWidth = 2;
                }
                if (selFillElem) {
                    var value = parent.activeObj.strokeSettings.fillColor;
                    if (parent.activeObj.strokeSettings.fillColor === '') {
                        selFillElem.classList.add('e-nocolor-item');
                    }
                    else {
                        selFillElem.classList.remove('e-nocolor-item');
                        selFillElem.style.background = value;
                    }
                    if (document.querySelector('#' + id + '_shape_fill')) {
                        getComponent(id + '_shape_fill', 'colorpicker').value = value;
                    }
                }
                if (selStrokeElem) {
                    var value = parent.activeObj.strokeSettings.strokeColor;
                    selStrokeElem.style.background = value;
                    if (document.querySelector('#' + id + '_shape_stroke')) {
                        getComponent(id + '_shape_stroke', 'colorpicker').value = value;
                    }
                }
                if (selTextStrokeElem) {
                    var value = parent.activeObj.strokeSettings.strokeColor;
                    selTextStrokeElem.style.background = value;
                    if (document.querySelector('#' + id + '_text_font')) {
                        getComponent(id + '_text_font', 'colorpicker').value = value;
                    }
                }
                if (selStrokeTextColorElem) {
                    var value = parent.activeObj.strokeSettings.outlineColor;
                    if (!/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6}|[0-9A-Fa-f]{8})$|^[a-zA-Z]+$/.test(parent.activeObj.strokeSettings.outlineColor)) {
                        selStrokeTextColorElem.classList.add('e-nocolor-item');
                    }
                    else {
                        selStrokeTextColorElem.classList.remove('e-nocolor-item');
                        selStrokeTextColorElem.style.background = value;
                    }
                    if (document.querySelector('#' + id + '_stroke_text')) {
                        getComponent(id + '_stroke_text', 'colorpicker').value = value;
                    }
                }
                if (selTextBGElem) {
                    var value = parent.activeObj.strokeSettings.fillColor;
                    if (parent.activeObj.strokeSettings.fillColor === '' || parent.activeObj.strokeSettings.fillColor === 'transparent') {
                        selTextBGElem.classList.add('e-nocolor-item');
                    }
                    else {
                        selTextBGElem.classList.remove('e-nocolor-item');
                        selTextBGElem.style.background = value;
                    }
                    if (document.querySelector('#' + id + '_text_bgColor')) {
                        getComponent(id + '_text_bgColor', 'colorpicker').value = value;
                    }
                }
                if (selPenStrokeElem) {
                    var value = parent.activeObj.strokeSettings.strokeColor;
                    selPenStrokeElem.style.background = value;
                    if (document.querySelector('#' + id + '_pen_stroke')) {
                        getComponent(id + '_pen_stroke', 'colorpicker').value = value;
                    }
                    var obj = { penOpacity: 1 };
                    parent.notify('freehand-draw', { prop: 'getPenOpacity', onPropertyChange: false, value: { obj: obj } });
                }
                if (fontFamilyElem) {
                    if (Browser.isDevice) {
                        fontFamilyElem.setAttribute('style', 'font-family:' + parent.activeObj.textSettings.fontFamily.toLowerCase());
                    }
                    else {
                        fontFamilyElem.textContent = parent.activeObj.textSettings.fontFamily;
                    }
                }
                if (fontSizeElem) {
                    for (var i = 0; i < parent.fontSizeColl.length; i++) {
                        if (parseInt(parent.fontSizeColl[i].text, 10) >= Math.round(parent.activeObj.textSettings.fontSize)) {
                            fontSizeElem.textContent = (i + 1).toString();
                            break;
                        }
                        else {
                            if (Math.round(parent.activeObj.textSettings.fontSize) < parseInt(parent.fontSizeColl[0].text, 10)) {
                                fontSizeElem.textContent = '1';
                                break;
                            }
                            else if (Math.round(parent.activeObj.textSettings.fontSize) >
                                parseInt(parent.fontSizeColl[parent.fontSizeColl.length - 1].text, 10)) {
                                fontSizeElem.textContent = ((parent.fontSizeColl.length - 1) + 1).toString();
                                break;
                            }
                        }
                    }
                }
                if (boldBtn) {
                    if (parent.activeObj.textSettings.bold) {
                        boldBtn.classList.add('e-selected-btn');
                    }
                    else {
                        boldBtn.classList.remove('e-selected-btn');
                    }
                }
                if (italicBtn) {
                    if (parent.activeObj.textSettings.italic) {
                        italicBtn.classList.add('e-selected-btn');
                    }
                    else {
                        italicBtn.classList.remove('e-selected-btn');
                    }
                }
                if (strokeWidthElem) {
                    var width = parent.activeObj.shape === 'text' ? parent.activeObj.strokeSettings.outlineWidth : parent.activeObj.strokeSettings.strokeWidth;
                    var strokeWidth = Math.round(width).toString();
                    strokeWidthElem.textContent = this.getStrokeWidth(strokeWidth);
                }
                if (rectangleRadiusElem) {
                    var rectRadius = Math.round((parent.activeObj.strokeSettings.radius)).toString();
                    rectangleRadiusElem.textContent = this.getRectRadius(rectRadius);
                }
            }
        }
    };
    ToolbarModule.prototype.getStrokeWidth = function (text) {
        var strokeWidth;
        var currentWidth = parseInt(text, 10) / 2;
        switch (currentWidth) {
            case 0:
                strokeWidth = this.l10n.getConstant('NoOutline');
                break;
            case 1:
                strokeWidth = this.l10n.getConstant('XSmall');
                break;
            case 2:
                strokeWidth = this.l10n.getConstant('Small');
                break;
            case 3:
                strokeWidth = this.l10n.getConstant('Medium');
                break;
            case 4:
                strokeWidth = this.l10n.getConstant('Large');
                break;
            case 5:
                strokeWidth = this.l10n.getConstant('XLarge');
                break;
        }
        return strokeWidth;
    };
    ToolbarModule.prototype.getRectRadius = function (text) {
        var rectRadius;
        var currentWidth = parseInt(text, 10) / 2;
        switch (currentWidth) {
            case 0:
                rectRadius = this.l10n.getConstant('0');
                break;
            case 1:
                rectRadius = this.l10n.getConstant('20');
                break;
            case 2:
                rectRadius = this.l10n.getConstant('40');
                break;
            case 3:
                rectRadius = this.l10n.getConstant('60');
                break;
            case 4:
                rectRadius = this.l10n.getConstant('80');
                break;
            case 5:
                rectRadius = this.l10n.getConstant('100');
                break;
        }
        return rectRadius;
    };
    ToolbarModule.prototype.cancelPan = function () {
        var parent = this.parent;
        parent.notify('shape', { prop: 'applyActObj', onPropertyChange: false, value: { isMouseDown: true } });
        var panBtn = parent.element.querySelector('.e-img-pan .e-btn');
        if (panBtn) {
            panBtn.classList.remove('e-selected-btn');
        }
        parent.pan(false);
    };
    ToolbarModule.prototype.refreshMainToolbar = function () {
        if (this.currToolbar !== 'main') {
            this.refreshToolbar('main');
        }
    };
    ToolbarModule.prototype.destroySubComponents = function () {
        var parent = this.parent;
        var inputElement = parent.element.querySelectorAll('input.e-control');
        var btnElement = parent.element.querySelectorAll('button.e-control');
        for (var i = 0, len = inputElement.length; i < len; i++) {
            if (inputElement[i].classList.contains('e-color-picker')) {
                getComponent(inputElement[i], 'color-picker').destroy();
                detach(select('input#' + inputElement[i].id, parent.element));
            }
        }
        for (var i = 0, len = btnElement.length; i < len; i++) {
            if (btnElement[i].classList.contains('e-dropdown-btn')) {
                getComponent(btnElement[i], 'dropdown-btn').destroy();
                detach(select('button#' + btnElement[i].id, parent.element));
            }
            else if (btnElement[i].classList.contains('e-btn')) {
                getComponent(btnElement[i], 'btn').destroy();
                detach(select('button#' + btnElement[i].id, parent.element));
            }
        }
    };
    ToolbarModule.prototype.setInitialShapeSettings = function (args) {
        var parent = this.parent;
        parent.notify('shape', { prop: 'refreshActiveObj', onPropertyChange: false });
        parent.currObjType.shape = args.item.id;
        parent.activeObj.shape = parent.currObjType.shape.toLowerCase();
        parent.currObjType.isDragging = parent.currObjType.isCustomCrop = false;
        parent.activeObj.shapeDegree = parent.transform.degree;
        parent.activeObj.shapeFlip = parent.transform.currFlipState;
        parent.activeObj.textFlip = parent.transform.currFlipState;
        parent.activeObj.flipObjColl = [];
        var orderObj = { order: null };
        parent.notify('shape', { prop: 'getNewOrder', onPropertyChange: false, value: { obj: orderObj } });
        parent.activeObj.order = orderObj['order'];
    };
    ToolbarModule.prototype.isToolbarString = function (items) {
        var isString = false;
        for (var i = 0; i < items.length; i++) {
            if (typeof (items[i]) === 'string') {
                isString = true;
                break;
            }
        }
        return isString;
    };
    ToolbarModule.prototype.excludeItems = function (items) {
        var indexArr = [];
        for (var i = 0; i < items.length; i++) {
            var index = this.getIndex(items[i]);
            if (index !== -1) {
                indexArr.push(index);
            }
        }
        var negativeIndexArr = [];
        for (var i = 0; i < this.defToolbarItems.length; i++) {
            if (this.defToolbarItems[i].align === 'Center' && !this.isSameIndex(indexArr, i) &&
                this.defToolbarItems[i].id !== this.parent.element.id + '_' + 'annotation') {
                negativeIndexArr.push(i);
            }
        }
        for (var i = negativeIndexArr.length - 1; i >= 0; i--) {
            this.defToolbarItems.splice(negativeIndexArr[i], 1);
        }
    };
    ToolbarModule.prototype.isSameIndex = function (indexArr, index) {
        for (var i = 0; i < indexArr.length; i++) {
            if (indexArr[i] === index) {
                return true;
            }
        }
        return false;
    };
    ToolbarModule.prototype.getIndex = function (item) {
        var index = -1;
        var isFontColor = false;
        if (item === 'rotateLeft') {
            item = 'rotLeft';
        }
        if (item === 'rotateRight') {
            item = 'rotRight';
        }
        if (item === 'horizontalFlip') {
            item = 'hflip';
        }
        if (item === 'verticalFlip') {
            item = 'vflip';
        }
        if (item === 'arrowStart') {
            item = 'start';
        }
        if (item === 'arrowEnd') {
            item = 'end';
        }
        if (item === 'fontColor') {
            item = 'strokeColor';
            isFontColor = true;
        }
        for (var i = 0; i < this.defToolbarItems.length; i++) {
            var id = this.defToolbarItems[i].id;
            if (id && id.toLowerCase().indexOf(item.toLowerCase()) !== -1) {
                index = i;
                break;
            }
        }
        if (isFontColor) {
            item = 'fontColor';
        }
        return index;
    };
    ToolbarModule.prototype.getModuleName = function () {
        return 'toolbar-module';
    };
    ToolbarModule.prototype.redactSlider = function (type) {
        var parent = this.parent;
        var id = parent.element.id;
        var toolbarArea = parent.element.querySelector('#' + id + '_toolbarArea');
        var contextualToolbarArea = parent.element.querySelector('#' + id + '_contextualToolbarArea');
        if (!contextualToolbarArea) {
            return;
        }
        contextualToolbarArea.classList.remove('e-hide');
        contextualToolbarArea.style.left = toolbarArea.offsetLeft + 'px';
        var canvasWrapper = document.querySelector('#' + id + '_contextualToolbarArea');
        var hdrWrapper = document.querySelector('#' + id + '_headWrapper');
        var labelWrapper = document.querySelector('#' + id + '_labelWrapper');
        var ctxTbar = document.querySelector('#' + id + '_contextualToolbar');
        if (hdrWrapper) {
            hdrWrapper.remove();
            labelWrapper.remove();
        }
        if (ctxTbar) {
            ctxTbar.remove();
            this.createContextualToolbar();
        }
        hdrWrapper = canvasWrapper.appendChild(parent.createElement('div', {
            id: id + '_headWrapper',
            styles: 'position: relative'
        }));
        labelWrapper = hdrWrapper.appendChild(parent.createElement('label', {
            id: id + '_labelWrapper',
            className: 'e-ie-finetune-slider-label',
            styles: Browser.isDevice ? ('position: absolute; top: 31%; left: calc(50% - 160px); font-size: 15px; text-transform: capitalize; font-weight: 400;')
                : 'position: absolute; top: 25%; left: calc(50% - 226px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
        }));
        var text = type === 'blur' ? this.l10n.getConstant('Blur') : this.l10n.getConstant('PixelSize');
        labelWrapper.textContent = text;
        var sliderWrapper = hdrWrapper.appendChild(parent.createElement('div', {
            id: id + '_sliderWrapper',
            className: 'e-ie-finetune-slider-wrap',
            styles: 'position: absolute'
        }));
        hdrWrapper.appendChild(parent.createElement('label', {
            id: id + '_redactSpan',
            className: 'e-ie-redact-value-span',
            styles: Browser.isDevice ? ('position: absolute; top: 30%; margin-left: 20px; font-size: 15px; text-transform: capitalize; font-weight: 400;') :
                'position: absolute; top: 30%; left: calc(50% + 190px); font-size: 15px; text-transform: capitalize; font-weight: 400;'
        }));
        sliderWrapper.parentElement.classList.add('e-finetune-slider');
        var value = parent.activeObj.redactType === 'blur' ? parent.activeObj.redactBlur :
            parent.activeObj.redactPixelate;
        var redactSlider = new Slider({
            tooltip: { placement: 'Before', isVisible: true, showOn: 'Focus' },
            min: 10, max: 100, step: 1, value: value,
            type: 'MinRange',
            width: Browser.isDevice ? '130px' : '300px',
            created: function () {
                parent.element.querySelector('.e-ie-redact-value-span').innerText = value.toString();
            },
            change: function (args) {
                parent.element.querySelector('.e-ie-redact-value-span').innerText = args.value.toString();
                if (parent.activeObj.redactType === 'blur') {
                    parent.activeObj.redactBlur = parent.tempRedactBlur = args.value;
                }
                else if (parent.activeObj.redactType === 'pixelate') {
                    parent.activeObj.redactPixelate = parent.tempRedactPixel = args.value;
                }
                parent.notify('draw', { prop: 'drawObject', onPropertyChange: false, value: { canvas: 'duplicate', obj: parent.activeObj, isCropRatio: null,
                        points: null, isPreventDrag: true, saveContext: null, isPreventSelection: true } });
            },
            changed: function () {
                setTimeout(function () {
                    parent.notify('undo-redo', { prop: 'updateUndoRedoStack', onPropertyChange: false });
                }, 50);
            }
        });
        redactSlider.appendTo('#' + id + '_sliderWrapper');
        if (Browser.isDevice) {
            var cHt = contextualToolbarArea.offsetHeight + 1;
            var cusWrapper = parent.element.querySelector('#' + id + '_customizeWrapper');
            if (this.isFrameToolbar && cusWrapper) {
                cHt = cusWrapper.offsetHeight + 2;
            }
            var ht = parent.element.querySelector('#' + id + '_canvasWrapper').offsetHeight;
            contextualToolbarArea.style.top = this.toolbarHeight + 1 + ht - cHt + 'px';
        }
    };
    return ToolbarModule;
}());
export { ToolbarModule };
