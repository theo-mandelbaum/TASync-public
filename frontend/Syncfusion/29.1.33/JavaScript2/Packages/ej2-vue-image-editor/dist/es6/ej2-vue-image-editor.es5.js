import { ImageEditor } from '@syncfusion/ej2-image-editor';
export * from '@syncfusion/ej2-image-editor';
import { getProps, vueDefineComponent, ComponentBase, isExecute, gh } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

var properties = ['isLazyUpdate', 'plugins', 'allowUndoRedo', 'cssClass', 'disabled', 'enablePersistence', 'enableRtl', 'finetuneSettings', 'fontFamily', 'height', 'isReadOnly', 'locale', 'quickAccessToolbarTemplate', 'selectionSettings', 'showQuickAccessToolbar', 'theme', 'toolbar', 'toolbarTemplate', 'uploadSettings', 'width', 'zoomSettings', 'beforeSave', 'click', 'created', 'cropping', 'destroyed', 'editComplete', 'fileOpened', 'finetuneValueChanging', 'flipping', 'frameChange', 'imageFiltering', 'panning', 'quickAccessToolbarItemClick', 'quickAccessToolbarOpen', 'resizing', 'rotating', 'saved', 'selectionChanging', 'shapeChange', 'shapeChanging', 'toolbarCreated', 'toolbarItemClicked', 'toolbarUpdating', 'zooming'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the VueJS ImageEditor Component.
 * ```html
 * <ejs-imageeditor></ejs-imageeditor>
 * ```
 */
var ImageEditorComponent = vueDefineComponent({
    name: 'ImageEditorComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new ImageEditor({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: false,
            hasInjectedModules: false,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
        this.updated = this.updated;
    },
    render: function (createElement) {
        var h = !isExecute ? gh : createElement;
        var slots = null;
        if (!isNullOrUndefined(this.$slots.default)) {
            slots = !isExecute ? this.$slots.default() : this.$slots.default;
        }
        return h('div', slots);
    },
    methods: {
        clearTemplate: function (templateNames) {
            if (!templateNames) {
                templateNames = Object.keys(this.templateCollection || {});
            }
            if (templateNames.length && this.templateCollection) {
                for (var _i = 0, templateNames_1 = templateNames; _i < templateNames_1.length; _i++) {
                    var tempName = templateNames_1[_i];
                    var elementCollection = this.templateCollection[tempName];
                    if (elementCollection && elementCollection.length) {
                        for (var _a = 0, elementCollection_1 = elementCollection; _a < elementCollection_1.length; _a++) {
                            var ele = elementCollection_1[_a];
                            this.destroyPortals(ele);
                        }
                        delete this.templateCollection[tempName];
                    }
                }
            }
        },
        setProperties: function (prop, muteOnChange) {
            var _this = this;
            if (this.isVue3) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if (this.ej2Instances && this.ej2Instances._setProperties) {
                this.ej2Instances._setProperties(prop, muteOnChange);
            }
            if (prop && this.models && this.models.length) {
                Object.keys(prop).map(function (key) {
                    _this.models.map(function (model) {
                        if ((key === model) && !(/datasource/i.test(key))) {
                            if (_this.isVue3) {
                                _this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                            }
                            else {
                                _this.$emit('update:' + key, prop[key]);
                                _this.$emit('modelchanged', prop[key]);
                            }
                        }
                    });
                });
            }
        },
        custom: function () {
            this.updated();
        },
        apply: function () {
            return this.ej2Instances.apply();
        },
        applyImageFilter: function (filterOption) {
            return this.ej2Instances.applyImageFilter(filterOption);
        },
        bringForward: function (shapeId) {
            return this.ej2Instances.bringForward(shapeId);
        },
        bringToFront: function (shapeId) {
            return this.ej2Instances.bringToFront(shapeId);
        },
        canRedo: function () {
            return this.ej2Instances.canRedo();
        },
        canUndo: function () {
            return this.ej2Instances.canUndo();
        },
        clearImage: function () {
            return this.ej2Instances.clearImage();
        },
        clearSelection: function (resetCrop) {
            return this.ej2Instances.clearSelection(resetCrop);
        },
        cloneShape: function (shapeId) {
            return this.ej2Instances.cloneShape(shapeId);
        },
        crop: function () {
            return this.ej2Instances.crop();
        },
        deleteRedact: function (id) {
            return this.ej2Instances.deleteRedact(id);
        },
        deleteShape: function (id) {
            return this.ej2Instances.deleteShape(id);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        discard: function () {
            return this.ej2Instances.discard();
        },
        drawArrow: function (startX, startY, endX, endY, strokeWidth, strokeColor, arrowStart, arrowEnd, isSelected) {
            return this.ej2Instances.drawArrow(startX, startY, endX, endY, strokeWidth, strokeColor, arrowStart, arrowEnd, isSelected);
        },
        drawEllipse: function (x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor, degree, isSelected) {
            return this.ej2Instances.drawEllipse(x, y, radiusX, radiusY, strokeWidth, strokeColor, fillColor, degree, isSelected);
        },
        drawFrame: function (frameType, color, gradientColor, size, inset, offset, borderRadius, frameLineStyle, lineCount) {
            return this.ej2Instances.drawFrame(frameType, color, gradientColor, size, inset, offset, borderRadius, frameLineStyle, lineCount);
        },
        drawImage: function (data, x, y, width, height, isAspectRatio, degree, opacity, isSelected) {
            return this.ej2Instances.drawImage(data, x, y, width, height, isAspectRatio, degree, opacity, isSelected);
        },
        drawLine: function (startX, startY, endX, endY, strokeWidth, strokeColor, isSelected) {
            return this.ej2Instances.drawLine(startX, startY, endX, endY, strokeWidth, strokeColor, isSelected);
        },
        drawPath: function (pointColl, strokeWidth, strokeColor, isSelected) {
            return this.ej2Instances.drawPath(pointColl, strokeWidth, strokeColor, isSelected);
        },
        drawRectangle: function (x, y, width, height, strokeWidth, strokeColor, fillColor, degree, isSelected, borderRadius) {
            return this.ej2Instances.drawRectangle(x, y, width, height, strokeWidth, strokeColor, fillColor, degree, isSelected, borderRadius);
        },
        drawRedact: function (type, x, y, width, height, value) {
            return this.ej2Instances.drawRedact(type, x, y, width, height, value);
        },
        drawText: function (x, y, text, fontFamily, fontSize, bold, italic, color, isSelected, degree, fillColor, strokeColor, strokeWidth, transformCollection) {
            return this.ej2Instances.drawText(x, y, text, fontFamily, fontSize, bold, italic, color, isSelected, degree, fillColor, strokeColor, strokeWidth, transformCollection);
        },
        enableShapeDrawing: function (shapeType, isEnabled) {
            return this.ej2Instances.enableShapeDrawing(shapeType, isEnabled);
        },
        enableTextEditing: function () {
            return this.ej2Instances.enableTextEditing();
        },
        export: function (type, fileName, imageQuality) {
            return this.ej2Instances.export(type, fileName, imageQuality);
        },
        finetuneImage: function (finetuneOption, value) {
            return this.ej2Instances.finetuneImage(finetuneOption, value);
        },
        flip: function (direction) {
            return this.ej2Instances.flip(direction);
        },
        freehandDraw: function (value) {
            return this.ej2Instances.freehandDraw(value);
        },
        getImageData: function (includeAnnotations) {
            return this.ej2Instances.getImageData(includeAnnotations);
        },
        getImageDimension: function () {
            return this.ej2Instances.getImageDimension();
        },
        getImageFilter: function (filterOption) {
            return this.ej2Instances.getImageFilter(filterOption);
        },
        getRedacts: function () {
            return this.ej2Instances.getRedacts();
        },
        getShapeSetting: function (id) {
            return this.ej2Instances.getShapeSetting(id);
        },
        getShapeSettings: function () {
            return this.ej2Instances.getShapeSettings();
        },
        initialize: function () {
            return this.ej2Instances.initialize();
        },
        open: function (data, resetChanges, imageSettings) {
            return this.ej2Instances.open(data, resetChanges, imageSettings);
        },
        pan: function (value, x, y) {
            return this.ej2Instances.pan(value, x, y);
        },
        redo: function () {
            return this.ej2Instances.redo();
        },
        reset: function () {
            return this.ej2Instances.reset();
        },
        resize: function (width, height, isAspectRatio) {
            return this.ej2Instances.resize(width, height, isAspectRatio);
        },
        rotate: function (degree) {
            return this.ej2Instances.rotate(degree);
        },
        select: function (type, startX, startY, width, height) {
            return this.ej2Instances.select(type, startX, startY, width, height);
        },
        selectRedact: function (id) {
            return this.ej2Instances.selectRedact(id);
        },
        selectShape: function (id) {
            return this.ej2Instances.selectShape(id);
        },
        sendBackward: function (shapeId) {
            return this.ej2Instances.sendBackward(shapeId);
        },
        sendToBack: function (shapeId) {
            return this.ej2Instances.sendToBack(shapeId);
        },
        straightenImage: function (degree) {
            return this.ej2Instances.straightenImage(degree);
        },
        triggerEditCompleteEvent: function (args) {
            return this.ej2Instances.triggerEditCompleteEvent(args);
        },
        undo: function () {
            return this.ej2Instances.undo();
        },
        update: function () {
            return this.ej2Instances.update();
        },
        updateRedact: function (setting, isSelected) {
            return this.ej2Instances.updateRedact(setting, isSelected);
        },
        updateShape: function (setting, isSelected) {
            return this.ej2Instances.updateShape(setting, isSelected);
        },
        zoom: function (zoomFactor, zoomPoint) {
            return this.ej2Instances.zoom(zoomFactor, zoomPoint);
        },
    }
});
var ImageEditorPlugin = {
    name: 'ejs-imageeditor',
    install: function (Vue) {
        Vue.component(ImageEditorPlugin.name, ImageEditorComponent);
    }
};

export { ImageEditorComponent, ImageEditorPlugin };
//# sourceMappingURL=ej2-vue-image-editor.es5.js.map
