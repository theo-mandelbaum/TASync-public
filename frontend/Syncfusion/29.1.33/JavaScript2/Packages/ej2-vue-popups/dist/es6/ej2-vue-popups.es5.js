import { Dialog, Tooltip } from '@syncfusion/ej2-popups';
export * from '@syncfusion/ej2-popups';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var ButtonsDirective = vueDefineComponent({
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
            return 'e-buttons';
        }
    }
});
var ButtonsPlugin = {
    name: 'e-buttons',
    install: function (Vue) {
        Vue.component(ButtonsPlugin.name, ButtonsDirective);
    }
};
/**
 * 'e-button' directive represent a button of Vue Dialog
 * It must be contained in a Dialog component(`ejs-dialog`).
 * ```html
 * <ejs-Dialog id='dialog' :showCloseIcon=true>
 *   <e-buttons>
 *    <e-dialogbutton :buttonModal='okButton'></e-dialogbutton>
 *    <e-dialogbutton :buttonModal='cancelButton'></e-dialogbutton>
 *   </e-buttons>
 * </ejs-Dialog>
 * ```
 */
var DialogButtonDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-dialogbutton';
        }
    }
});
var DialogButtonPlugin = {
    name: 'e-dialogbutton',
    install: function (Vue) {
        Vue.component(DialogButtonPlugin.name, DialogButtonDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'allowDragging', 'animationSettings', 'buttons', 'closeOnEscape', 'content', 'cssClass', 'enableHtmlSanitizer', 'enablePersistence', 'enableResize', 'enableRtl', 'footerTemplate', 'header', 'height', 'isModal', 'locale', 'minHeight', 'position', 'resizeHandles', 'showCloseIcon', 'target', 'visible', 'width', 'zIndex', 'beforeClose', 'beforeOpen', 'beforeSanitizeHtml', 'close', 'created', 'destroyed', 'drag', 'dragStart', 'dragStop', 'open', 'overlayClick', 'resizeStart', 'resizeStop', 'resizing'];
var modelProps = ['visible'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the VueJS Dialog component
 * ```html
 * <ejs-dialog></ejs-dialog>
 * ```
 */
var DialogComponent = vueDefineComponent({
    name: 'DialogComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Dialog({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: false,
            tagMapper: { "e-buttons": "e-dialogbutton" },
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
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        getButtons: function (index) {
            return this.ej2Instances.getButtons(index);
        },
        getDimension: function () {
            return this.ej2Instances.getDimension();
        },
        hide: function (event) {
            return this.ej2Instances.hide(event);
        },
        refreshPosition: function () {
            return this.ej2Instances.refreshPosition();
        },
        sanitizeHelper: function (value) {
            return this.ej2Instances.sanitizeHelper(value);
        },
        show: function (isFullScreen) {
            return this.ej2Instances.show(isFullScreen);
        },
    }
});
var DialogPlugin = {
    name: 'ejs-dialog',
    install: function (Vue) {
        Vue.component(DialogPlugin.name, DialogComponent);
        Vue.component(DialogButtonPlugin.name, DialogButtonDirective);
        Vue.component(ButtonsPlugin.name, ButtonsDirective);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'animation', 'closeDelay', 'container', 'content', 'cssClass', 'enableHtmlParse', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'height', 'htmlAttributes', 'isSticky', 'locale', 'mouseTrail', 'offsetX', 'offsetY', 'openDelay', 'opensOn', 'position', 'showTipPointer', 'target', 'tipPointerPosition', 'width', 'windowCollision', 'afterClose', 'afterOpen', 'beforeClose', 'beforeCollision', 'beforeOpen', 'beforeRender', 'created', 'destroyed'];
var modelProps$1 = [];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * Represents the VueJS Tooltip component that displays a piece of information about the target element on mouse hover.
 * ```html
 * <ejs-tooltip content='Tooltip content'>Show Tooltip</ejs-tooltip>
 * ```
 */
var TooltipComponent = vueDefineComponent({
    name: 'TooltipComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Tooltip({}),
            propKeys: properties$1,
            models: modelProps$1,
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
        close: function (animation) {
            return this.ej2Instances.close(animation);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        open: function (element, animation) {
            return this.ej2Instances.open(element, animation);
        },
        refresh: function (target) {
            return this.ej2Instances.refresh(target);
        },
    }
});
var TooltipPlugin = {
    name: 'ejs-tooltip',
    install: function (Vue) {
        Vue.component(TooltipPlugin.name, TooltipComponent);
    }
};

export { ButtonsDirective, ButtonsPlugin, DialogButtonDirective, DialogButtonPlugin, DialogComponent, DialogPlugin, TooltipComponent, TooltipPlugin };
//# sourceMappingURL=ej2-vue-popups.es5.js.map
