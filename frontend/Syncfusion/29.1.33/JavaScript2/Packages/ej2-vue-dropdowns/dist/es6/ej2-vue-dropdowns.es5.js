import { DropDownList, ComboBox, AutoComplete, MultiSelect, ListBox, DropDownTree, Mention } from '@syncfusion/ej2-dropdowns';
export * from '@syncfusion/ej2-dropdowns';
import { getProps, vueDefineComponent, ComponentBase, isExecute, gh } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var properties = ['isLazyUpdate', 'plugins', 'actionFailureTemplate', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'text', 'value', 'valueTemplate', 'width', 'zIndex', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select'];
var modelProps = ['value'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * DropDownList contains a list of predefined values from which the user can choose
 * ```html
 * <ejs-dropdownlist :dataSource='data'></ejs-dropdownlist>
 * ```
 */
var DropDownListComponent = vueDefineComponent({
    name: 'DropDownListComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new DropDownList({}),
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
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
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
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addItem: function (items, itemIndex) {
            return this.ej2Instances.addItem(items, itemIndex);
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableItem: function (item) {
            return this.ej2Instances.disableItem(item);
        },
        filter: function (dataSource, query, fields) {
            return this.ej2Instances.filter(dataSource, query, fields);
        },
        focusIn: function (e) {
            return this.ej2Instances.focusIn(e);
        },
        focusOut: function (e) {
            return this.ej2Instances.focusOut(e);
        },
        getDataByValue: function (value) {
            return this.ej2Instances.getDataByValue(value);
        },
        getItems: function () {
            return this.ej2Instances.getItems();
        },
        hidePopup: function (e) {
            return this.ej2Instances.hidePopup(e);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        showPopup: function (e) {
            return this.ej2Instances.showPopup(e);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
    }
});
var DropDownListPlugin = {
    name: 'ejs-dropdownlist',
    install: function (Vue) {
        Vue.component(DropDownListPlugin.name, DropDownListComponent);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'actionFailureTemplate', 'allowCustom', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'autofill', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'sortOrder', 'text', 'value', 'valueTemplate', 'width', 'zIndex', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'customValueSpecifier', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select'];
var modelProps$1 = ['value'];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * ComboBox component allows the user to type a value or choose an option from the list of predefined options available
 * ```html
 * <ejs-combobox :dataSource='data'></ejs-combobox>
 * ```
 */
var ComboBoxComponent = vueDefineComponent({
    name: 'ComboBoxComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new ComboBox({}),
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
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
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
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addItem: function (items, itemIndex) {
            return this.ej2Instances.addItem(items, itemIndex);
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableItem: function (item) {
            return this.ej2Instances.disableItem(item);
        },
        filter: function (dataSource, query, fields) {
            return this.ej2Instances.filter(dataSource, query, fields);
        },
        focusIn: function () {
            return this.ej2Instances.focusIn();
        },
        focusOut: function (e) {
            return this.ej2Instances.focusOut(e);
        },
        getDataByValue: function (value) {
            return this.ej2Instances.getDataByValue(value);
        },
        getItems: function () {
            return this.ej2Instances.getItems();
        },
        hidePopup: function (e) {
            return this.ej2Instances.hidePopup(e);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        showPopup: function (e) {
            return this.ej2Instances.showPopup(e);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
    }
});
var ComboBoxPlugin = {
    name: 'ejs-combobox',
    install: function (Vue) {
        Vue.component(ComboBoxPlugin.name, ComboBoxComponent);
    }
};

var properties$2 = ['isLazyUpdate', 'plugins', 'actionFailureTemplate', 'allowCustom', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'autofill', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'highlight', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'index', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'minLength', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'showClearButton', 'showPopupButton', 'sortOrder', 'suggestionCount', 'text', 'value', 'valueTemplate', 'width', 'zIndex', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'customValueSpecifier', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'resizeStart', 'resizeStop', 'resizing', 'select'];
var modelProps$2 = ['value'];
var testProp$2 = getProps({ props: properties$2 });
var props$2 = testProp$2[0], watch$2 = testProp$2[1], emitProbs$2 = Object.keys(watch$2);
emitProbs$2.push('modelchanged', 'update:modelValue');
for (var _i$2 = 0, modelProps_1$2 = modelProps$2; _i$2 < modelProps_1$2.length; _i$2++) {
    var props_1$2 = modelProps_1$2[_i$2];
    emitProbs$2.push('update:' + props_1$2);
}
/**
 * The AutoComplete component provides all the matched suggestion list on typing the input from which the user can select one.
 * ```html
 * <ejs-autocomplete :dataSource='data'></ejs-autocomplete>
 * ```
 */
var AutoCompleteComponent = vueDefineComponent({
    name: 'AutoCompleteComponent',
    mixins: [ComponentBase],
    props: props$2,
    watch: watch$2,
    emits: emitProbs$2,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new AutoComplete({}),
            propKeys: properties$2,
            models: modelProps$2,
            hasChildDirective: false,
            hasInjectedModules: true,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
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
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addItem: function (items, itemIndex) {
            return this.ej2Instances.addItem(items, itemIndex);
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableItem: function (item) {
            return this.ej2Instances.disableItem(item);
        },
        filter: function (dataSource, query, fields) {
            return this.ej2Instances.filter(dataSource, query, fields);
        },
        focusIn: function () {
            return this.ej2Instances.focusIn();
        },
        focusOut: function (e) {
            return this.ej2Instances.focusOut(e);
        },
        getDataByValue: function (value) {
            return this.ej2Instances.getDataByValue(value);
        },
        getItems: function () {
            return this.ej2Instances.getItems();
        },
        hidePopup: function (e) {
            return this.ej2Instances.hidePopup(e);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        showPopup: function (e) {
            return this.ej2Instances.showPopup(e);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
    }
});
var AutoCompletePlugin = {
    name: 'ejs-autocomplete',
    install: function (Vue) {
        Vue.component(AutoCompletePlugin.name, AutoCompleteComponent);
    }
};

var properties$3 = ['isLazyUpdate', 'plugins', 'actionFailureTemplate', 'addTagOnBlur', 'allowCustomValue', 'allowFiltering', 'allowObjectBinding', 'allowResize', 'changeOnBlur', 'closePopupOnSelect', 'cssClass', 'dataSource', 'delimiterChar', 'enableGroupCheckBox', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableSelectionOrder', 'enableVirtualization', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'groupTemplate', 'headerTemplate', 'hideSelectedItem', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'isDeviceFullScreen', 'itemTemplate', 'locale', 'maximumSelectionLength', 'mode', 'noRecordsTemplate', 'openOnClick', 'placeholder', 'popupHeight', 'popupWidth', 'query', 'readonly', 'selectAllText', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'zIndex', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'beforeSelectAll', 'blur', 'change', 'chipSelection', 'close', 'created', 'customValueSelection', 'dataBound', 'destroyed', 'filtering', 'focus', 'open', 'removed', 'removing', 'resizeStart', 'resizeStop', 'resizing', 'select', 'selectedAll', 'tagging'];
var modelProps$3 = ['value'];
var testProp$3 = getProps({ props: properties$3 });
var props$3 = testProp$3[0], watch$3 = testProp$3[1], emitProbs$3 = Object.keys(watch$3);
emitProbs$3.push('modelchanged', 'update:modelValue');
for (var _i$3 = 0, modelProps_1$3 = modelProps$3; _i$3 < modelProps_1$3.length; _i$3++) {
    var props_1$3 = modelProps_1$3[_i$3];
    emitProbs$3.push('update:' + props_1$3);
}
/**
 * MultiSelect component allows the user to select a value from the predefined list of values.
 * ```html
 * <ejs-multiselect :dataSource='data'></ejs-multiselect>
 * ```
 */
var MultiSelectComponent = vueDefineComponent({
    name: 'MultiSelectComponent',
    mixins: [ComponentBase],
    props: props$3,
    watch: watch$3,
    emits: emitProbs$3,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instance: new MultiSelect({}),
            propKeys: properties$3,
            models: modelProps$3,
            hasChildDirective: false,
            hasInjectedModules: true,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
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
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addItem: function (items, itemIndex) {
            return this.ej2Instances.addItem(items, itemIndex);
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableItem: function (item) {
            return this.ej2Instances.disableItem(item);
        },
        filter: function (dataSource, query, fields) {
            return this.ej2Instances.filter(dataSource, query, fields);
        },
        focusIn: function () {
            return this.ej2Instances.focusIn();
        },
        focusOut: function () {
            return this.ej2Instances.focusOut();
        },
        getDataByValue: function (value) {
            return this.ej2Instances.getDataByValue(value);
        },
        getItems: function () {
            return this.ej2Instances.getItems();
        },
        hidePopup: function (e) {
            return this.ej2Instances.hidePopup(e);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        selectAll: function (state) {
            return this.ej2Instances.selectAll(state);
        },
        showPopup: function (e) {
            return this.ej2Instances.showPopup(e);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
    }
});
var MultiSelectPlugin = {
    name: 'ejs-multiselect',
    install: function (Vue) {
        Vue.component(MultiSelectPlugin.name, MultiSelectComponent);
    }
};

var properties$4 = ['isLazyUpdate', 'plugins', 'actionFailureTemplate', 'allowDragAndDrop', 'allowFiltering', 'cssClass', 'dataSource', 'enablePersistence', 'enableRtl', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'groupTemplate', 'height', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'maximumSelectionLength', 'noRecordsTemplate', 'query', 'scope', 'selectionSettings', 'sortOrder', 'toolbarSettings', 'value', 'zIndex', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeDrop', 'beforeItemRender', 'change', 'created', 'dataBound', 'destroyed', 'drag', 'dragStart', 'drop', 'filtering', 'select'];
var modelProps$4 = ['value'];
var testProp$4 = getProps({ props: properties$4 });
var props$4 = testProp$4[0], watch$4 = testProp$4[1], emitProbs$4 = Object.keys(watch$4);
emitProbs$4.push('modelchanged', 'update:modelValue');
for (var _i$4 = 0, modelProps_1$4 = modelProps$4; _i$4 < modelProps_1$4.length; _i$4++) {
    var props_1$4 = modelProps_1$4[_i$4];
    emitProbs$4.push('update:' + props_1$4);
}
/**
 * ListBox component allows the user to select values from the predefined list of values.
 * ```html
 * <ejs-listbox :dataSource='data'></ejs-listbox>
 * ```
 */
var ListBoxComponent = vueDefineComponent({
    name: 'ListBoxComponent',
    mixins: [ComponentBase],
    props: props$4,
    watch: watch$4,
    emits: emitProbs$4,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new ListBox({}),
            propKeys: properties$4,
            models: modelProps$4,
            hasChildDirective: false,
            hasInjectedModules: true,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
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
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        addItems: function (items, itemIndex) {
            return this.ej2Instances.addItems(items, itemIndex);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        enableItems: function (items, enable, isValue) {
            return this.ej2Instances.enableItems(items, enable, isValue);
        },
        filter: function (dataSource, query, fields) {
            return this.ej2Instances.filter(dataSource, query, fields);
        },
        getDataByValue: function (value) {
            return this.ej2Instances.getDataByValue(value);
        },
        getDataByValues: function (value) {
            return this.ej2Instances.getDataByValues(value);
        },
        getDataList: function () {
            return this.ej2Instances.getDataList();
        },
        getItems: function () {
            return this.ej2Instances.getItems();
        },
        getSortedList: function () {
            return this.ej2Instances.getSortedList();
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        moveAllTo: function (targetId, index) {
            return this.ej2Instances.moveAllTo(targetId, index);
        },
        moveBottom: function (value) {
            return this.ej2Instances.moveBottom(value);
        },
        moveDown: function (value) {
            return this.ej2Instances.moveDown(value);
        },
        moveTo: function (value, index, targetId) {
            return this.ej2Instances.moveTo(value, index, targetId);
        },
        moveTop: function (value) {
            return this.ej2Instances.moveTop(value);
        },
        moveUp: function (value) {
            return this.ej2Instances.moveUp(value);
        },
        removeItem: function (items, itemIndex) {
            return this.ej2Instances.removeItem(items, itemIndex);
        },
        removeItems: function (items, itemIndex) {
            return this.ej2Instances.removeItems(items, itemIndex);
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        selectAll: function (state) {
            return this.ej2Instances.selectAll(state);
        },
        selectItems: function (items, state, isValue) {
            return this.ej2Instances.selectItems(items, state, isValue);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
    }
});
var ListBoxPlugin = {
    name: 'ejs-listbox',
    install: function (Vue) {
        Vue.component(ListBoxPlugin.name, ListBoxComponent);
    }
};

var properties$5 = ['isLazyUpdate', 'plugins', 'actionFailureTemplate', 'allowFiltering', 'allowMultiSelection', 'changeOnBlur', 'cssClass', 'customTemplate', 'delimiterChar', 'destroyPopupOnHide', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enabled', 'fields', 'filterBarPlaceholder', 'filterType', 'floatLabelType', 'footerTemplate', 'headerTemplate', 'htmlAttributes', 'ignoreAccent', 'ignoreCase', 'itemTemplate', 'locale', 'mode', 'noRecordsTemplate', 'placeholder', 'popupHeight', 'popupWidth', 'readonly', 'selectAllText', 'showCheckBox', 'showClearButton', 'showDropDownIcon', 'showSelectAll', 'sortOrder', 'text', 'treeSettings', 'unSelectAllText', 'value', 'valueTemplate', 'width', 'wrapText', 'zIndex', 'actionFailure', 'beforeOpen', 'blur', 'change', 'close', 'created', 'dataBound', 'destroyed', 'filtering', 'focus', 'keyPress', 'open', 'select'];
var modelProps$5 = ['value'];
var testProp$5 = getProps({ props: properties$5 });
var props$5 = testProp$5[0], watch$5 = testProp$5[1], emitProbs$5 = Object.keys(watch$5);
emitProbs$5.push('modelchanged', 'update:modelValue');
for (var _i$5 = 0, modelProps_1$5 = modelProps$5; _i$5 < modelProps_1$5.length; _i$5++) {
    var props_1$5 = modelProps_1$5[_i$5];
    emitProbs$5.push('update:' + props_1$5);
}
/**
 * The DropDownTree component contains a list of predefined values from which you can choose a single or multiple values.
 * ```html
 * <ejs-dropdowntree></ejs-dropdowntree>
 * ```
 */
var DropDownTreeComponent = vueDefineComponent({
    name: 'DropDownTreeComponent',
    mixins: [ComponentBase],
    props: props$5,
    watch: watch$5,
    emits: emitProbs$5,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new DropDownTree({}),
            propKeys: properties$5,
            models: modelProps$5,
            hasChildDirective: false,
            hasInjectedModules: false,
            tagMapper: {},
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.ej2Instances._trigger = this.ej2Instances.trigger;
        this.ej2Instances.trigger = this.trigger;
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
        trigger: function (eventName, eventProp, successHandler) {
            if (!isExecute) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if ((eventName === 'change' || eventName === 'input') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/checked|value/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('update:modelValue', eventProp[propKey]);
                    }
                    else {
                        if (eventName === 'change' || (this.$props && !this.$props.isLazyUpdate)) {
                            this.$emit('update:' + propKey, eventProp[propKey]);
                            this.$emit('modelchanged', eventProp[propKey]);
                        }
                    }
                }
            }
            else if ((eventName === 'actionBegin' && eventProp.requestType === 'dateNavigate') && this.models && (this.models.length !== 0)) {
                var key = this.models.toString().match(/currentView|selectedDate/) || [];
                var propKey = key[0];
                if (eventProp && key && !isUndefined(eventProp[propKey])) {
                    if (!isExecute) {
                        this.ej2Instances.vueInstance.$emit('update:' + propKey, eventProp[propKey]);
                        this.ej2Instances.vueInstance.$emit('modelchanged', eventProp[propKey]);
                    }
                    else {
                        this.$emit('update:' + propKey, eventProp[propKey]);
                        this.$emit('modelchanged', eventProp[propKey]);
                    }
                }
            }
            if ((this.ej2Instances && this.ej2Instances._trigger)) {
                this.ej2Instances._trigger(eventName, eventProp, successHandler);
            }
        },
        custom: function () {
            this.updated();
        },
        clear: function () {
            return this.ej2Instances.clear();
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        ensureVisible: function (item) {
            return this.ej2Instances.ensureVisible(item);
        },
        getData: function (item) {
            return this.ej2Instances.getData(item);
        },
        getLocaleName: function () {
            return this.ej2Instances.getLocaleName();
        },
        hidePopup: function () {
            return this.ej2Instances.hidePopup();
        },
        selectAll: function (state) {
            return this.ej2Instances.selectAll(state);
        },
        showPopup: function () {
            return this.ej2Instances.showPopup();
        },
    }
});
var DropDownTreePlugin = {
    name: 'ejs-dropdowntree',
    install: function (Vue) {
        Vue.component(DropDownTreePlugin.name, DropDownTreeComponent);
    }
};

var properties$6 = ['isLazyUpdate', 'plugins', 'allowSpaces', 'cssClass', 'dataSource', 'displayTemplate', 'fields', 'filterType', 'highlight', 'ignoreCase', 'itemTemplate', 'locale', 'mentionChar', 'minLength', 'noRecordsTemplate', 'popupHeight', 'popupWidth', 'query', 'requireLeadingSpace', 'showMentionChar', 'sortOrder', 'spinnerTemplate', 'suffixText', 'suggestionCount', 'target', 'actionBegin', 'actionComplete', 'actionFailure', 'beforeOpen', 'change', 'closed', 'created', 'destroyed', 'filtering', 'opened', 'select'];
var modelProps$6 = [];
var testProp$6 = getProps({ props: properties$6 });
var props$6 = testProp$6[0], watch$6 = testProp$6[1], emitProbs$6 = Object.keys(watch$6);
emitProbs$6.push('modelchanged', 'update:modelValue');
for (var _i$6 = 0, modelProps_1$6 = modelProps$6; _i$6 < modelProps_1$6.length; _i$6++) {
    var props_1$6 = modelProps_1$6[_i$6];
    emitProbs$6.push('update:' + props_1$6);
}
/**
 * The Mention contains a list of predefined values from which the user can choose
 * ```html
 * <ejs-mention :dataSource='data'></ejs-mention>
 * ```
 */
var MentionComponent = vueDefineComponent({
    name: 'MentionComponent',
    mixins: [ComponentBase],
    props: props$6,
    watch: watch$6,
    emits: emitProbs$6,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Mention({}),
            propKeys: properties$6,
            models: modelProps$6,
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
        addItem: function (items, itemIndex) {
            return this.ej2Instances.addItem(items, itemIndex);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        disableItem: function (item) {
            return this.ej2Instances.disableItem(item);
        },
        getDataByValue: function (value) {
            return this.ej2Instances.getDataByValue(value);
        },
        getItems: function () {
            return this.ej2Instances.getItems();
        },
        hidePopup: function (e) {
            return this.ej2Instances.hidePopup(e);
        },
        search: function (text, positionX, positionY) {
            return this.ej2Instances.search(text, positionX, positionY);
        },
        showPopup: function () {
            return this.ej2Instances.showPopup();
        },
    }
});
var MentionPlugin = {
    name: 'ejs-mention',
    install: function (Vue) {
        Vue.component(MentionPlugin.name, MentionComponent);
    }
};

export { AutoCompleteComponent, AutoCompletePlugin, ComboBoxComponent, ComboBoxPlugin, DropDownListComponent, DropDownListPlugin, DropDownTreeComponent, DropDownTreePlugin, ListBoxComponent, ListBoxPlugin, MentionComponent, MentionPlugin, MultiSelectComponent, MultiSelectPlugin };
//# sourceMappingURL=ej2-vue-dropdowns.es5.js.map
