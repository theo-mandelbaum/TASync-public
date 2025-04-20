import { DocumentEditor, DocumentEditorContainer } from '@syncfusion/ej2-documenteditor';
export * from '@syncfusion/ej2-documenteditor';
import { getProps, vueDefineComponent, ComponentBase, isExecute, gh } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

var properties = ['isLazyUpdate', 'plugins', 'acceptTab', 'autoResizeOnVisibilityChange', 'currentUser', 'defaultPasteOption', 'documentEditorSettings', 'documentName', 'documentSettings', 'enableAutoFocus', 'enableBookmarkDialog', 'enableBordersAndShadingDialog', 'enableCollaborativeEditing', 'enableColumnsDialog', 'enableComment', 'enableContextMenu', 'enableCursorOnReadOnly', 'enableEditor', 'enableEditorHistory', 'enableFontDialog', 'enableFootnoteAndEndnoteDialog', 'enableFormField', 'enableHyperlinkDialog', 'enableImageResizer', 'enableListDialog', 'enableLocalPaste', 'enableLockAndEdit', 'enableOptionsPane', 'enablePageSetupDialog', 'enableParagraphDialog', 'enablePersistence', 'enablePrint', 'enableRtl', 'enableSearch', 'enableSelection', 'enableSfdtExport', 'enableSpellCheck', 'enableStyleDialog', 'enableTableDialog', 'enableTableOfContentsDialog', 'enableTableOptionsDialog', 'enableTablePropertiesDialog', 'enableTextExport', 'enableTrackChanges', 'enableWordExport', 'headers', 'height', 'isReadOnly', 'layoutType', 'locale', 'pageGap', 'pageOutline', 'serverActionSettings', 'serviceUrl', 'showComments', 'showRevisions', 'useCtrlClickToFollowHyperlink', 'userColor', 'width', 'zIndex', 'zoomFactor', 'actionComplete', 'afterFormFieldFill', 'beforeAcceptRejectChanges', 'beforeCommentAction', 'beforeFileOpen', 'beforeFormFieldFill', 'beforePaneSwitch', 'commentBegin', 'commentDelete', 'commentEnd', 'contentChange', 'contentControl', 'created', 'customContextMenuBeforeOpen', 'customContextMenuSelect', 'destroyed', 'documentChange', 'keyDown', 'requestNavigate', 'searchResultsChange', 'selectionChange', 'serviceFailure', 'trackChange', 'viewChange', 'zoomFactorChange', 'beforeXmlHttpRequestSend', 'documentLoadFailed'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Essential JS 2 VueJS Document Editor Component
 * ```html
 * <ejs-documenteditor id='container'></ejs-documenteditor>
 * ```
 */
var DocumentEditorComponent = vueDefineComponent({
    name: 'DocumentEditorComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instance: new DocumentEditor({}),
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
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        enableAllModules: function () {
            return this.ej2Instances.enableAllModules();
        },
        exportAsImage: function (pageNumber, format) {
            return this.ej2Instances.exportAsImage(pageNumber, format);
        },
        exportContentControlData: function () {
            return this.ej2Instances.exportContentControlData();
        },
        exportFormData: function () {
            return this.ej2Instances.exportFormData();
        },
        fitPage: function (pageFitType) {
            return this.ej2Instances.fitPage(pageFitType);
        },
        focusIn: function () {
            return this.ej2Instances.focusIn();
        },
        getBookmarks: function () {
            return this.ej2Instances.getBookmarks();
        },
        getComments: function () {
            return this.ej2Instances.getComments();
        },
        getFormFieldInfo: function (name) {
            return this.ej2Instances.getFormFieldInfo(name);
        },
        getFormFieldNames: function () {
            return this.ej2Instances.getFormFieldNames();
        },
        getStyleNames: function (styleType) {
            return this.ej2Instances.getStyleNames(styleType);
        },
        getStyles: function (styleType) {
            return this.ej2Instances.getStyles(styleType);
        },
        importContentControlData: function (contentControlInfo) {
            return this.ej2Instances.importContentControlData(contentControlInfo);
        },
        importFormData: function (formData) {
            return this.ej2Instances.importFormData(formData);
        },
        open: function (inputData) {
            return this.ej2Instances.open(inputData);
        },
        openAsync: function (inputData) {
            return this.ej2Instances.openAsync(inputData);
        },
        openBlank: function () {
            return this.ej2Instances.openBlank();
        },
        print: function (printWindow) {
            return this.ej2Instances.print(printWindow);
        },
        resetContentControlData: function (contentControInfo) {
            return this.ej2Instances.resetContentControlData(contentControInfo);
        },
        resetFormFields: function (name) {
            return this.ej2Instances.resetFormFields(name);
        },
        resize: function (width, height) {
            return this.ej2Instances.resize(width, height);
        },
        save: function (fileName, formatType) {
            return this.ej2Instances.save(fileName, formatType);
        },
        saveAsBlob: function (formatType) {
            return this.ej2Instances.saveAsBlob(formatType);
        },
        scrollToPage: function (pageNumber) {
            return this.ej2Instances.scrollToPage(pageNumber);
        },
        serialize: function () {
            return this.ej2Instances.serialize();
        },
        setCustomFonts: function (fonts) {
            return this.ej2Instances.setCustomFonts(fonts);
        },
        setDefaultCharacterFormat: function (characterFormat) {
            return this.ej2Instances.setDefaultCharacterFormat(characterFormat);
        },
        setDefaultParagraphFormat: function (paragraphFormat) {
            return this.ej2Instances.setDefaultParagraphFormat(paragraphFormat);
        },
        setDefaultSectionFormat: function (sectionFormat) {
            return this.ej2Instances.setDefaultSectionFormat(sectionFormat);
        },
        setFormFieldInfo: function (name, formFieldInfo) {
            return this.ej2Instances.setFormFieldInfo(name, formFieldInfo);
        },
        showDialog: function (dialogType) {
            return this.ej2Instances.showDialog(dialogType);
        },
        showOptionsPane: function () {
            return this.ej2Instances.showOptionsPane();
        },
        showRestrictEditingPane: function (show) {
            return this.ej2Instances.showRestrictEditingPane(show);
        },
        showXmlPane: function () {
            return this.ej2Instances.showXmlPane();
        },
        updateFields: function () {
            return this.ej2Instances.updateFields();
        },
    }
});
var DocumentEditorPlugin = {
    name: 'ejs-documenteditor',
    install: function (Vue) {
        Vue.component(DocumentEditorPlugin.name, DocumentEditorComponent);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'autoResizeOnVisibilityChange', 'currentUser', 'documentEditorSettings', 'documentSettings', 'enableAutoFocus', 'enableComment', 'enableCsp', 'enableLocalPaste', 'enableLockAndEdit', 'enablePersistence', 'enableRtl', 'enableSpellCheck', 'enableToolbar', 'enableTrackChanges', 'headers', 'height', 'layoutType', 'locale', 'restrictEditing', 'serverActionSettings', 'serviceUrl', 'showPropertiesPane', 'toolbarItems', 'userColor', 'width', 'zIndex', 'beforeAcceptRejectChanges', 'beforeCommentAction', 'beforePaneSwitch', 'commentDelete', 'contentChange', 'contentControl', 'created', 'customContextMenuBeforeOpen', 'customContextMenuSelect', 'destroyed', 'documentChange', 'selectionChange', 'serviceFailure', 'toolbarClick', 'trackChange', 'beforeXmlHttpRequestSend'];
var modelProps$1 = [];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * Represents the Essential JS 2 VueJS Document Editor Container
 * ```html
 * <ejs-documenteditor-container id='container'></ejs-documenteditor-container>
 * ```
 */
var DocumentEditorContainerComponent = vueDefineComponent({
    name: 'DocumentEditorContainerComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instance: new DocumentEditorContainer({}),
            propKeys: properties$1,
            models: modelProps$1,
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
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        resize: function (width, height) {
            return this.ej2Instances.resize(width, height);
        },
        setDefaultCharacterFormat: function (characterFormat) {
            return this.ej2Instances.setDefaultCharacterFormat(characterFormat);
        },
        setDefaultParagraphFormat: function (paragraphFormat) {
            return this.ej2Instances.setDefaultParagraphFormat(paragraphFormat);
        },
        setDefaultSectionFormat: function (sectionFormat) {
            return this.ej2Instances.setDefaultSectionFormat(sectionFormat);
        },
    }
});
var DocumentEditorContainerPlugin = {
    name: 'ejs-documenteditorcontainer',
    install: function (Vue) {
        Vue.component(DocumentEditorContainerPlugin.name, DocumentEditorContainerComponent);
    }
};

export { DocumentEditorComponent, DocumentEditorContainerComponent, DocumentEditorContainerPlugin, DocumentEditorPlugin };
//# sourceMappingURL=ej2-vue-documenteditor.es5.js.map
