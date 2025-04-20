import { PdfViewer } from '@syncfusion/ej2-pdfviewer';
export * from '@syncfusion/ej2-pdfviewer';
import { getProps, vueDefineComponent, ComponentBase, isExecute, gh } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

var properties = ['isLazyUpdate', 'plugins', 'DropdownFieldSettings', 'ajaxRequestSettings', 'annotationSelectorSettings', 'annotationSettings', 'annotations', 'areaSettings', 'arrowSettings', 'checkBoxFieldSettings', 'circleSettings', 'commandManager', 'contextMenuOption', 'contextMenuSettings', 'currentPageNumber', 'customContextMenuItems', 'customFonts', 'customStamp', 'customStampSettings', 'dateTimeFormat', 'designerMode', 'disableContextMenuItems', 'disableDefaultContextMenu', 'distanceSettings', 'documentPath', 'downloadFileName', 'drawingObject', 'enableAccessibilityTags', 'enableAnnotation', 'enableAnnotationToolbar', 'enableAutoComplete', 'enableBookmark', 'enableBookmarkStyles', 'enableCommentPanel', 'enableDesktopMode', 'enableDownload', 'enableFormDesigner', 'enableFormDesignerToolbar', 'enableFormFields', 'enableFormFieldsValidation', 'enableFreeText', 'enableHandwrittenSignature', 'enableHtmlSanitizer', 'enableHyperlink', 'enableImportAnnotationMeasurement', 'enableInkAnnotation', 'enableLocalStorage', 'enableMagnification', 'enableMeasureAnnotation', 'enableMultiLineOverlap', 'enableMultiPageAnnotation', 'enableNavigation', 'enableNavigationToolbar', 'enablePageOrganizer', 'enablePersistence', 'enablePinchZoom', 'enablePrint', 'enablePrintRotation', 'enableRtl', 'enableShapeAnnotation', 'enableShapeLabel', 'enableStampAnnotations', 'enableStickyNotesAnnotation', 'enableTextMarkupAnnotation', 'enableTextMarkupResizer', 'enableTextSearch', 'enableTextSelection', 'enableThumbnail', 'enableToolbar', 'enableZoomOptimization', 'exportAnnotationFileName', 'extractTextOption', 'formFieldCollections', 'formFields', 'freeTextSettings', 'handWrittenSignatureSettings', 'height', 'hideEmptyDigitalSignatureFields', 'hideSaveSignature', 'highlightSettings', 'hyperlinkOpenState', 'initialDialogSettings', 'initialFieldSettings', 'initialRenderPages', 'inkAnnotationSettings', 'interactionMode', 'isAnnotationToolbarOpen', 'isAnnotationToolbarVisible', 'isBookmarkPanelOpen', 'isCommandPanelOpen', 'isDocumentEdited', 'isExtractText', 'isFormDesignerToolbarVisible', 'isFormFieldDocument', 'isInitialFieldToolbarSelection', 'isMaintainSelection', 'isPageOrganizerOpen', 'isSignatureEditable', 'isThumbnailViewOpen', 'isValidFreeText', 'lineSettings', 'listBoxFieldSettings', 'locale', 'maxZoom', 'measurementSettings', 'minZoom', 'pageCount', 'pageOrganizerSettings', 'passwordFieldSettings', 'perimeterSettings', 'polygonSettings', 'printMode', 'printScaleFactor', 'radioButtonFieldSettings', 'radiusSettings', 'rectangleSettings', 'resourceUrl', 'restrictZoomRequest', 'retryCount', 'retryStatusCodes', 'retryTimeout', 'scrollSettings', 'selectedItems', 'serverActionSettings', 'serviceUrl', 'shapeLabelSettings', 'showCustomContextMenuBottom', 'showDigitalSignatureAppearance', 'showNotificationDialog', 'signatureDialogSettings', 'signatureFieldSettings', 'signatureFitMode', 'stampSettings', 'stickyNotesSettings', 'strikethroughSettings', 'textFieldSettings', 'textSearchColorSettings', 'tileRenderingSettings', 'toolbarSettings', 'underlineSettings', 'volumeSettings', 'width', 'zoomMode', 'zoomValue', 'addSignature', 'ajaxRequestFailed', 'ajaxRequestInitiate', 'ajaxRequestSuccess', 'annotationAdd', 'annotationDoubleClick', 'annotationMouseLeave', 'annotationMouseover', 'annotationMove', 'annotationMoving', 'annotationPropertiesChange', 'annotationRemove', 'annotationResize', 'annotationSelect', 'annotationUnSelect', 'beforeAddFreeText', 'bookmarkClick', 'buttonFieldClick', 'commentAdd', 'commentDelete', 'commentEdit', 'commentSelect', 'commentStatusChanged', 'created', 'customContextMenuBeforeOpen', 'customContextMenuSelect', 'documentLoad', 'documentLoadFailed', 'documentUnload', 'downloadEnd', 'downloadStart', 'exportFailed', 'exportStart', 'exportSuccess', 'extractTextCompleted', 'formFieldAdd', 'formFieldClick', 'formFieldDoubleClick', 'formFieldFocusOut', 'formFieldMouseLeave', 'formFieldMouseover', 'formFieldMove', 'formFieldPropertiesChange', 'formFieldRemove', 'formFieldResize', 'formFieldSelect', 'formFieldUnselect', 'hyperlinkClick', 'hyperlinkMouseOver', 'importFailed', 'importStart', 'importSuccess', 'keyboardCustomCommands', 'moveSignature', 'pageChange', 'pageClick', 'pageMouseover', 'pageOrganizerSaveAs', 'pageRenderComplete', 'pageRenderInitiate', 'printEnd', 'printStart', 'removeSignature', 'resizeSignature', 'resourcesLoaded', 'signaturePropertiesChange', 'signatureSelect', 'signatureUnselect', 'textSearchComplete', 'textSearchHighlight', 'textSearchStart', 'textSelectionEnd', 'textSelectionStart', 'thumbnailClick', 'toolbarClick', 'validateFormFields', 'zoomChange'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ejs-pdfviewer` represents the VueJS PdfViewer Component.
 * ```vue
 * <ejs-pdfviewer></ejs-pdfviewer>
 * ```
 */
var PdfViewerComponent = vueDefineComponent({
    name: 'PdfViewerComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new PdfViewer({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: false,
            hasInjectedModules: true,
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
        addAnnotation: function (annotation) {
            return this.ej2Instances.addAnnotation(annotation);
        },
        addCustomMenu: function (menuItems, disableDefaultItems, appendToEnd) {
            return this.ej2Instances.addCustomMenu(menuItems, disableDefaultItems, appendToEnd);
        },
        clearFormFields: function (formField) {
            return this.ej2Instances.clearFormFields(formField);
        },
        convertClientPointToPagePoint: function (clientPoint, pageNumber) {
            return this.ej2Instances.convertClientPointToPagePoint(clientPoint, pageNumber);
        },
        convertPagePointToClientPoint: function (pagePoint, pageNumber) {
            return this.ej2Instances.convertPagePointToClientPoint(pagePoint, pageNumber);
        },
        convertPagePointToScrollingPoint: function (pagePoint, pageNumber) {
            return this.ej2Instances.convertPagePointToScrollingPoint(pagePoint, pageNumber);
        },
        deleteAnnotations: function () {
            return this.ej2Instances.deleteAnnotations();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        download: function () {
            return this.ej2Instances.download();
        },
        exportAnnotation: function (annotationDataFormat) {
            return this.ej2Instances.exportAnnotation(annotationDataFormat);
        },
        exportAnnotationsAsBase64String: function (annotationDataFormat) {
            return this.ej2Instances.exportAnnotationsAsBase64String(annotationDataFormat);
        },
        exportAnnotationsAsObject: function (annotationDataFormat) {
            return this.ej2Instances.exportAnnotationsAsObject(annotationDataFormat);
        },
        exportFormFields: function (data, formFieldDataFormat) {
            return this.ej2Instances.exportFormFields(data, formFieldDataFormat);
        },
        exportFormFieldsAsObject: function (formFieldDataFormat) {
            return this.ej2Instances.exportFormFieldsAsObject(formFieldDataFormat);
        },
        extractText: function (pageIndex, options) {
            return this.ej2Instances.extractText(pageIndex, options);
        },
        focusFormField: function (field) {
            return this.ej2Instances.focusFormField(field);
        },
        getPageInfo: function (pageIndex) {
            return this.ej2Instances.getPageInfo(pageIndex);
        },
        getPageNumberFromClientPoint: function (clientPoint) {
            return this.ej2Instances.getPageNumberFromClientPoint(clientPoint);
        },
        importAnnotation: function (importData, annotationDataFormat) {
            return this.ej2Instances.importAnnotation(importData, annotationDataFormat);
        },
        importFormFields: function (data, formFieldDataFormat) {
            return this.ej2Instances.importFormFields(data, formFieldDataFormat);
        },
        load: function (document, password) {
            return this.ej2Instances.load(document, password);
        },
        redo: function () {
            return this.ej2Instances.redo();
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        resetFormFields: function () {
            return this.ej2Instances.resetFormFields();
        },
        retrieveFormFields: function () {
            return this.ej2Instances.retrieveFormFields();
        },
        saveAsBlob: function () {
            return this.ej2Instances.saveAsBlob();
        },
        setJsonData: function (jsonData) {
            return this.ej2Instances.setJsonData(jsonData);
        },
        showNotificationPopup: function (errorString) {
            return this.ej2Instances.showNotificationPopup(errorString);
        },
        undo: function () {
            return this.ej2Instances.undo();
        },
        unload: function () {
            return this.ej2Instances.unload();
        },
        updateFormFields: function (formFields) {
            return this.ej2Instances.updateFormFields(formFields);
        },
        updateFormFieldsValue: function (fieldValue) {
            return this.ej2Instances.updateFormFieldsValue(fieldValue);
        },
        updateViewerContainer: function () {
            return this.ej2Instances.updateViewerContainer();
        },
        zoomToRect: function (rectangle) {
            return this.ej2Instances.zoomToRect(rectangle);
        },
    }
});
var PdfViewerPlugin = {
    name: 'ejs-pdfviewer',
    install: function (Vue) {
        Vue.component(PdfViewerPlugin.name, PdfViewerComponent);
    }
};

export { PdfViewerComponent, PdfViewerPlugin };
//# sourceMappingURL=ej2-vue-pdfviewer.es5.js.map
