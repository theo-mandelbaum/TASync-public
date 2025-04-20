import { Ribbon } from '@syncfusion/ej2-ribbon';
export * from '@syncfusion/ej2-ribbon';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';

var RibbonItemsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-items';
        }
    }
});
var RibbonItemsPlugin = {
    name: 'e-ribbon-items',
    install: function (Vue) {
        Vue.component(RibbonItemsPlugin.name, RibbonItemsDirective);
    }
};
var RibbonItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-item';
        }
    }
});
var RibbonItemPlugin = {
    name: 'e-ribbon-item',
    install: function (Vue) {
        Vue.component(RibbonItemPlugin.name, RibbonItemDirective);
    }
};

var RibbonCollectionsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-collections';
        }
    }
});
var RibbonCollectionsPlugin = {
    name: 'e-ribbon-collections',
    install: function (Vue) {
        Vue.component(RibbonCollectionsPlugin.name, RibbonCollectionsDirective);
    }
};
var RibbonCollectionDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-collection';
        }
    }
});
var RibbonCollectionPlugin = {
    name: 'e-ribbon-collection',
    install: function (Vue) {
        Vue.component(RibbonCollectionPlugin.name, RibbonCollectionDirective);
    }
};

var RibbonGroupsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-groups';
        }
    }
});
var RibbonGroupsPlugin = {
    name: 'e-ribbon-groups',
    install: function (Vue) {
        Vue.component(RibbonGroupsPlugin.name, RibbonGroupsDirective);
    }
};
var RibbonGroupDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-group';
        }
    }
});
var RibbonGroupPlugin = {
    name: 'e-ribbon-group',
    install: function (Vue) {
        Vue.component(RibbonGroupPlugin.name, RibbonGroupDirective);
    }
};

var RibbonTabsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-tabs';
        }
    }
});
var RibbonTabsPlugin = {
    name: 'e-ribbon-tabs',
    install: function (Vue) {
        Vue.component(RibbonTabsPlugin.name, RibbonTabsDirective);
    }
};
var RibbonTabDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-tab';
        }
    }
});
var RibbonTabPlugin = {
    name: 'e-ribbon-tab',
    install: function (Vue) {
        Vue.component(RibbonTabPlugin.name, RibbonTabDirective);
    }
};

var RibbonContextualTabsDirective = vueDefineComponent({
    inject: { custom: { default: null } },
    render: function (createElement) {
        if (!isExecute) {
            var h = !isExecute ? gh : createElement;
            var slots = null;
            if (!isNullOrUndefined(this.$slots.default)) {
                slots = !isExecute ? this.$slots.default() : this.$slots.default;
            }
            return h('div', { class: 'e-directive' }, slots);
        }
        return;
    },
    updated: function () {
        if (!isExecute && this.custom) {
            this.custom();
        }
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-contextual-tabs';
        }
    }
});
var RibbonContextualTabsPlugin = {
    name: 'e-ribbon-contextual-tabs',
    install: function (Vue) {
        Vue.component(RibbonContextualTabsPlugin.name, RibbonContextualTabsDirective);
    }
};
/**
 * `e-ribbon-contextual-tab` directive represent a contextual tab of the VueJS Ribbon.
 * It must be contained in a Ribbon component(`ejs-ribbon`).
 * ```vue
 * <ejs-ribbon>
 *   <e-ribbon-contextual-tabs>
 *    <e-ribbon-contextual-tab></e-ribbon-contextual-tab>
 *    <e-ribbon-contextual-tab></e-ribbon-contextual-tab>
 *   </e-ribbon-contextual-tabs>
 * </ejs-ribbon>
 * ```
 */
var RibbonContextualTabDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-contextual-tab';
        }
    }
});
var RibbonContextualTabPlugin = {
    name: 'e-ribbon-contextual-tab',
    install: function (Vue) {
        Vue.component(RibbonContextualTabPlugin.name, RibbonContextualTabDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'activeLayout', 'backStageMenu', 'contextualTabs', 'cssClass', 'enableKeyTips', 'enablePersistence', 'enableRtl', 'fileMenu', 'helpPaneTemplate', 'hideLayoutSwitcher', 'isMinimized', 'launcherIconCss', 'layoutSwitcherKeyTip', 'locale', 'selectedTab', 'tabAnimation', 'tabs', 'width', 'created', 'launcherIconClick', 'overflowPopupClose', 'overflowPopupOpen', 'ribbonCollapsing', 'ribbonExpanding', 'ribbonLayoutSwitched', 'tabSelected', 'tabSelecting'];
var modelProps = [];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Essential JS 2 VueJS Ribbon Component
 * ```vue
 * <ejs-ribbon></ejs-ribbon>
 * ```
 */
var RibbonComponent = vueDefineComponent({
    name: 'RibbonComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Ribbon({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-ribbon-tabs": { "e-ribbon-tab": { "e-ribbon-groups": { "e-ribbon-group": { "e-ribbon-collections": { "e-ribbon-collection": { "e-ribbon-items": "e-ribbon-item" } } } } } }, "e-ribbon-contextual-tabs": { "e-ribbon-contextual-tab": { "e-ribbon-tabs": { "e-ribbon-tab": { "e-ribbon-groups": { "e-ribbon-group": { "e-ribbon-collections": { "e-ribbon-collection": { "e-ribbon-items": "e-ribbon-item" } } } } } } } } },
            tagNameMapper: { "e-ribbon-items": "e-items", "e-ribbon-collections": "e-collections", "e-ribbon-groups": "e-groups", "e-ribbon-tabs": "e-tabs", "e-ribbon-contextual-tabs": "e-contextualTabs" },
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
        addCollection: function (groupId, collection, targetId, isAfter) {
            return this.ej2Instances.addCollection(groupId, collection, targetId, isAfter);
        },
        addGroup: function (tabId, group, targetId, isAfter) {
            return this.ej2Instances.addGroup(tabId, group, targetId, isAfter);
        },
        addItem: function (collectionId, item, targetId, isAfter) {
            return this.ej2Instances.addItem(collectionId, item, targetId, isAfter);
        },
        addTab: function (tab, targetId, isAfter) {
            return this.ej2Instances.addTab(tab, targetId, isAfter);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableGroup: function (groupID) {
            return this.ej2Instances.disableGroup(groupID);
        },
        disableItem: function (itemId) {
            return this.ej2Instances.disableItem(itemId);
        },
        disableTab: function (tabId) {
            return this.ej2Instances.disableTab(tabId);
        },
        enableGroup: function (groupID) {
            return this.ej2Instances.enableGroup(groupID);
        },
        enableItem: function (itemId) {
            return this.ej2Instances.enableItem(itemId);
        },
        enableTab: function (tabId) {
            return this.ej2Instances.enableTab(tabId);
        },
        getItem: function (itemId) {
            return this.ej2Instances.getItem(itemId);
        },
        hideGroup: function (groupID) {
            return this.ej2Instances.hideGroup(groupID);
        },
        hideItem: function (itemId) {
            return this.ej2Instances.hideItem(itemId);
        },
        hideTab: function (tabId, isContextual) {
            return this.ej2Instances.hideTab(tabId, isContextual);
        },
        refreshLayout: function () {
            return this.ej2Instances.refreshLayout();
        },
        removeCollection: function (collectionId) {
            return this.ej2Instances.removeCollection(collectionId);
        },
        removeGroup: function (groupId) {
            return this.ej2Instances.removeGroup(groupId);
        },
        removeItem: function (itemId) {
            return this.ej2Instances.removeItem(itemId);
        },
        removeTab: function (tabId) {
            return this.ej2Instances.removeTab(tabId);
        },
        selectTab: function (tabId) {
            return this.ej2Instances.selectTab(tabId);
        },
        showGroup: function (groupID) {
            return this.ej2Instances.showGroup(groupID);
        },
        showItem: function (itemId) {
            return this.ej2Instances.showItem(itemId);
        },
        showTab: function (tabId, isContextual) {
            return this.ej2Instances.showTab(tabId, isContextual);
        },
        updateCollection: function (collection) {
            return this.ej2Instances.updateCollection(collection);
        },
        updateGroup: function (group) {
            return this.ej2Instances.updateGroup(group);
        },
        updateItem: function (item) {
            return this.ej2Instances.updateItem(item);
        },
        updateTab: function (tab) {
            return this.ej2Instances.updateTab(tab);
        },
    }
});
var RibbonPlugin = {
    name: 'ejs-ribbon',
    install: function (Vue) {
        Vue.component(RibbonPlugin.name, RibbonComponent);
        Vue.component(RibbonTabPlugin.name, RibbonTabDirective);
        Vue.component(RibbonTabsPlugin.name, RibbonTabsDirective);
        Vue.component(RibbonGroupPlugin.name, RibbonGroupDirective);
        Vue.component(RibbonGroupsPlugin.name, RibbonGroupsDirective);
        Vue.component(RibbonCollectionPlugin.name, RibbonCollectionDirective);
        Vue.component(RibbonCollectionsPlugin.name, RibbonCollectionsDirective);
        Vue.component(RibbonItemPlugin.name, RibbonItemDirective);
        Vue.component(RibbonItemsPlugin.name, RibbonItemsDirective);
        Vue.component(RibbonContextualTabPlugin.name, RibbonContextualTabDirective);
        Vue.component(RibbonContextualTabsPlugin.name, RibbonContextualTabsDirective);
    }
};

export { RibbonCollectionDirective, RibbonCollectionPlugin, RibbonCollectionsDirective, RibbonCollectionsPlugin, RibbonComponent, RibbonContextualTabDirective, RibbonContextualTabPlugin, RibbonContextualTabsDirective, RibbonContextualTabsPlugin, RibbonGroupDirective, RibbonGroupPlugin, RibbonGroupsDirective, RibbonGroupsPlugin, RibbonItemDirective, RibbonItemPlugin, RibbonItemsDirective, RibbonItemsPlugin, RibbonPlugin, RibbonTabDirective, RibbonTabPlugin, RibbonTabsDirective, RibbonTabsPlugin };
//# sourceMappingURL=ej2-vue-ribbon.es5.js.map
