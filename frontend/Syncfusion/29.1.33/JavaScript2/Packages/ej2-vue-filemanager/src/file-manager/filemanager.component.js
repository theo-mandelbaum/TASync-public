import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { FileManager } from '@syncfusion/ej2-filemanager';
import { ToolbarItemsDirective, ToolbarItemDirective, ToolbarItemsPlugin, ToolbarItemPlugin } from './toolbaritems.directive';
export var properties = ['isLazyUpdate', 'plugins', 'ajaxSettings', 'allowDragAndDrop', 'allowMultiSelection', 'contextMenuSettings', 'cssClass', 'detailsViewSettings', 'enableHtmlSanitizer', 'enablePersistence', 'enableRangeSelection', 'enableRtl', 'enableVirtualization', 'fileSystemData', 'height', 'locale', 'navigationPaneSettings', 'path', 'popupTarget', 'rootAliasName', 'searchSettings', 'selectedItems', 'showFileExtension', 'showHiddenItems', 'showItemCheckBoxes', 'showThumbnail', 'sortBy', 'sortComparer', 'sortOrder', 'toolbarItems', 'toolbarSettings', 'uploadSettings', 'view', 'width', 'beforeDelete', 'beforeDownload', 'beforeFolderCreate', 'beforeImageLoad', 'beforeMove', 'beforePopupClose', 'beforePopupOpen', 'beforeRename', 'beforeSend', 'created', 'delete', 'destroyed', 'failure', 'fileDragStart', 'fileDragStop', 'fileDragging', 'fileDropped', 'fileLoad', 'fileOpen', 'fileSelect', 'fileSelection', 'folderCreate', 'menuClick', 'menuClose', 'menuOpen', 'move', 'popupClose', 'popupOpen', 'rename', 'search', 'success', 'toolbarClick', 'toolbarCreate', 'uploadListCreate'];
export var modelProps = [];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Essential JS 2 VueJS FileManager Component.
 * ```vue
 * <ejs-filemanager showThumbnail='false'></ejs-filemanager>
 * ```
 */
export var FileManagerComponent = vueDefineComponent({
    name: 'FileManagerComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new FileManager({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-toolbaritems": "e-toolbaritem" },
            tagNameMapper: { "e-toolbaritems": "e-toolbarItems" },
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
        clearSelection: function () {
            return this.ej2Instances.clearSelection();
        },
        closeDialog: function () {
            return this.ej2Instances.closeDialog();
        },
        createFolder: function (name) {
            return this.ej2Instances.createFolder(name);
        },
        deleteFiles: function (ids) {
            return this.ej2Instances.deleteFiles(ids);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableMenuItems: function (items) {
            return this.ej2Instances.disableMenuItems(items);
        },
        disableToolbarItems: function (items) {
            return this.ej2Instances.disableToolbarItems(items);
        },
        downloadFiles: function (ids) {
            return this.ej2Instances.downloadFiles(ids);
        },
        enableMenuItems: function (items) {
            return this.ej2Instances.enableMenuItems(items);
        },
        enableToolbarItems: function (items) {
            return this.ej2Instances.enableToolbarItems(items);
        },
        filterFiles: function (filterData) {
            return this.ej2Instances.filterFiles(filterData);
        },
        getMenuItemIndex: function (item) {
            return this.ej2Instances.getMenuItemIndex(item);
        },
        getSelectedFiles: function () {
            return this.ej2Instances.getSelectedFiles();
        },
        getToolbarItemIndex: function (item) {
            return this.ej2Instances.getToolbarItemIndex(item);
        },
        openFile: function (id) {
            return this.ej2Instances.openFile(id);
        },
        refreshFiles: function () {
            return this.ej2Instances.refreshFiles();
        },
        refreshLayout: function () {
            return this.ej2Instances.refreshLayout();
        },
        renameFile: function (id, name) {
            return this.ej2Instances.renameFile(id, name);
        },
        selectAll: function () {
            return this.ej2Instances.selectAll();
        },
        traverseBackward: function () {
            return this.ej2Instances.traverseBackward();
        },
        uploadFiles: function () {
            return this.ej2Instances.uploadFiles();
        },
    }
});
export var FileManagerPlugin = {
    name: 'ejs-filemanager',
    install: function (Vue) {
        Vue.component(FileManagerPlugin.name, FileManagerComponent);
        Vue.component(ToolbarItemPlugin.name, ToolbarItemDirective);
        Vue.component(ToolbarItemsPlugin.name, ToolbarItemsDirective);
    }
};
