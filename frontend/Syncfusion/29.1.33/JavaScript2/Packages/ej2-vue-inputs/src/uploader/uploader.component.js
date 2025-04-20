import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Uploader } from '@syncfusion/ej2-inputs';
import { FilesDirective, UploadedFilesDirective, FilesPlugin, UploadedFilesPlugin } from './files.directive';
export var properties = ['isLazyUpdate', 'plugins', 'allowedExtensions', 'asyncSettings', 'autoUpload', 'buttons', 'cssClass', 'directoryUpload', 'dropArea', 'dropEffect', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'files', 'htmlAttributes', 'locale', 'maxFileSize', 'minFileSize', 'multiple', 'sequentialUpload', 'showFileList', 'template', 'actionComplete', 'beforeRemove', 'beforeUpload', 'canceling', 'change', 'chunkFailure', 'chunkSuccess', 'chunkUploading', 'clearing', 'created', 'failure', 'fileListRendering', 'pausing', 'progress', 'removing', 'rendering', 'resuming', 'selected', 'success', 'uploading'];
export var modelProps = [];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Essential JS 2 VueJS Uploader Component
 * ```html
 * <ejs-uploader id='fileUpload' v-bind:multiple='true'></ejs-uploader>
 * ```
 */
export var UploaderComponent = vueDefineComponent({
    name: 'UploaderComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Uploader({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: false,
            tagMapper: { "e-files": "e-uploadedfiles" },
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
        return h('input', slots);
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
        bytesToSize: function (bytes) {
            return this.ej2Instances.bytesToSize(bytes);
        },
        cancel: function (fileData) {
            return this.ej2Instances.cancel(fileData);
        },
        clearAll: function () {
            return this.ej2Instances.clearAll();
        },
        createFileList: function (fileData) {
            return this.ej2Instances.createFileList(fileData);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        getFilesData: function (index) {
            return this.ej2Instances.getFilesData(index);
        },
        pause: function (fileData, custom) {
            return this.ej2Instances.pause(fileData, custom);
        },
        remove: function (fileData, customTemplate, removeDirectly, postRawFile, args) {
            return this.ej2Instances.remove(fileData, customTemplate, removeDirectly, postRawFile, args);
        },
        resume: function (fileData, custom) {
            return this.ej2Instances.resume(fileData, custom);
        },
        retry: function (fileData, fromcanceledStage, custom) {
            return this.ej2Instances.retry(fileData, fromcanceledStage, custom);
        },
        sortFileList: function (filesData) {
            return this.ej2Instances.sortFileList(filesData);
        },
        traverseFileTree: function (item, event) {
            return this.ej2Instances.traverseFileTree(item, event);
        },
        upload: function (files, custom) {
            return this.ej2Instances.upload(files, custom);
        },
    }
});
export var UploaderPlugin = {
    name: 'ejs-uploader',
    install: function (Vue) {
        Vue.component(UploaderPlugin.name, UploaderComponent);
        Vue.component(UploadedFilesPlugin.name, UploadedFilesDirective);
        Vue.component(FilesPlugin.name, FilesDirective);
    }
};
