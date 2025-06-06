import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Signature } from '@syncfusion/ej2-inputs';
export var properties = ['isLazyUpdate', 'plugins', 'backgroundColor', 'backgroundImage', 'disabled', 'enablePersistence', 'enableRtl', 'isReadOnly', 'locale', 'maxStrokeWidth', 'minStrokeWidth', 'saveWithBackground', 'strokeColor', 'velocity', 'beforeSave', 'change', 'created'];
export var modelProps = [];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Essential JS 2 VueJS Signature Component
 * ```html
 * <ejs-signature></ejs-signature>
 * ```
 */
export var SignatureComponent = vueDefineComponent({
    name: 'SignatureComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Signature({}),
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
        return h('canvas', slots);
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
        canRedo: function () {
            return this.ej2Instances.canRedo();
        },
        canUndo: function () {
            return this.ej2Instances.canUndo();
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        draw: function (text, fontFamily, fontSize, x, y) {
            return this.ej2Instances.draw(text, fontFamily, fontSize, x, y);
        },
        getBlob: function (url) {
            return this.ej2Instances.getBlob(url);
        },
        getSignature: function (type) {
            return this.ej2Instances.getSignature(type);
        },
        initialize: function () {
            return this.ej2Instances.initialize();
        },
        isEmpty: function () {
            return this.ej2Instances.isEmpty();
        },
        load: function (signature, width, height) {
            return this.ej2Instances.load(signature, width, height);
        },
        redo: function () {
            return this.ej2Instances.redo();
        },
        refresh: function () {
            return this.ej2Instances.refresh();
        },
        save: function (type, fileName) {
            return this.ej2Instances.save(type, fileName);
        },
        saveAsBlob: function () {
            return this.ej2Instances.saveAsBlob();
        },
        undo: function () {
            return this.ej2Instances.undo();
        },
    }
});
export var SignaturePlugin = {
    name: 'ejs-signature',
    install: function (Vue) {
        Vue.component(SignaturePlugin.name, SignatureComponent);
    }
};
