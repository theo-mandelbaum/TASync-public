import { AIAssistView, ChatUI } from '@syncfusion/ej2-interactive-chat';
export * from '@syncfusion/ej2-interactive-chat';
import { vueDefineComponent, isExecute, gh, getProps, ComponentBase } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined, isUndefined } from '@syncfusion/ej2-base';

var ViewsDirective = vueDefineComponent({
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
            return 'e-views';
        }
    }
});
var ViewsPlugin = {
    name: 'e-views',
    install: function (Vue) {
        Vue.component(ViewsPlugin.name, ViewsDirective);
    }
};
/**
 * Represents the Essential JS 2 VueJS AIAssistView Component
 * ```vue
 * <ejs-aiassistview>
 *   <e-views>
 *     <e-view>
 *     </e-view>
 *    </e-views>
 * </ejs-aiassistview>
 * ```
 */
var ViewDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-view';
        }
    }
});
var ViewPlugin = {
    name: 'e-view',
    install: function (Vue) {
        Vue.component(ViewPlugin.name, ViewDirective);
    }
};

var properties = ['isLazyUpdate', 'plugins', 'activeView', 'bannerTemplate', 'cssClass', 'enablePersistence', 'enableRtl', 'footerTemplate', 'height', 'locale', 'prompt', 'promptIconCss', 'promptItemTemplate', 'promptPlaceholder', 'promptSuggestionItemTemplate', 'promptSuggestions', 'promptSuggestionsHeader', 'promptToolbarSettings', 'prompts', 'responseIconCss', 'responseItemTemplate', 'responseToolbarSettings', 'showClearButton', 'showHeader', 'toolbarSettings', 'views', 'width', 'created', 'promptChanged', 'promptRequest', 'stopRespondingClick'];
var modelProps = ['prompt'];
var testProp = getProps({ props: properties });
var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the Essential JS 2 VueJS AIAssistView Component
 * ```vue
 * <ejs-aiassistview ></ejs-aiassistview>
 * ```
 */
var AIAssistViewComponent = vueDefineComponent({
    name: 'AIAssistViewComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    model: { event: 'modelchanged' },
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new AIAssistView({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: false,
            tagMapper: { "e-views": "e-view" },
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
        addPromptResponse: function (outputResponse, isFinalUpdate) {
            return this.ej2Instances.addPromptResponse(outputResponse, isFinalUpdate);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        executePrompt: function (prompt) {
            return this.ej2Instances.executePrompt(prompt);
        },
        scrollToBottom: function () {
            return this.ej2Instances.scrollToBottom();
        },
    }
});
var AIAssistViewPlugin = {
    name: 'ejs-aiassistview',
    install: function (Vue) {
        Vue.component(AIAssistViewPlugin.name, AIAssistViewComponent);
        Vue.component(ViewPlugin.name, ViewDirective);
        Vue.component(ViewsPlugin.name, ViewsDirective);
    }
};

var MessagesDirective = vueDefineComponent({
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
            return 'e-messages';
        }
    }
});
var MessagesPlugin = {
    name: 'e-messages',
    install: function (Vue) {
        Vue.component(MessagesPlugin.name, MessagesDirective);
    }
};
/**
 * Represents the Essential JS 2 VueJS ChatUI Component
 * ```vue
 * <ejs-chatui>
 *   <e-messages>
 *     <e-message>
 *     </e-message>
 *    </e-messages>
 * </ejs-chatui>
 * ```
 */
var MessageDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-message';
        }
    }
});
var MessagePlugin = {
    name: 'e-message',
    install: function (Vue) {
        Vue.component(MessagePlugin.name, MessageDirective);
    }
};

var properties$1 = ['isLazyUpdate', 'plugins', 'autoScrollToBottom', 'cssClass', 'emptyChatTemplate', 'enablePersistence', 'enableRtl', 'footerTemplate', 'headerIconCss', 'headerText', 'headerToolbar', 'height', 'loadOnDemand', 'locale', 'messageTemplate', 'messages', 'placeholder', 'showFooter', 'showHeader', 'showTimeBreak', 'showTimeStamp', 'suggestionTemplate', 'suggestions', 'timeBreakTemplate', 'timeStampFormat', 'typingUsers', 'typingUsersTemplate', 'user', 'width', 'created', 'messageSend', 'userTyping'];
var modelProps$1 = [];
var testProp$1 = getProps({ props: properties$1 });
var props$1 = testProp$1[0], watch$1 = testProp$1[1], emitProbs$1 = Object.keys(watch$1);
emitProbs$1.push('modelchanged', 'update:modelValue');
for (var _i$1 = 0, modelProps_1$1 = modelProps$1; _i$1 < modelProps_1$1.length; _i$1++) {
    var props_1$1 = modelProps_1$1[_i$1];
    emitProbs$1.push('update:' + props_1$1);
}
/**
 * Represents the Essential JS 2 VueJS ChatUI Component
 * ```vue
 * <ejs-chatui ></ejs-chatui>
 * ```
 */
var ChatUIComponent = vueDefineComponent({
    name: 'ChatUIComponent',
    mixins: [ComponentBase],
    props: props$1,
    watch: watch$1,
    emits: emitProbs$1,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new ChatUI({}),
            propKeys: properties$1,
            models: modelProps$1,
            hasChildDirective: true,
            hasInjectedModules: false,
            tagMapper: { "e-messages": "e-message" },
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
        addMessage: function (message) {
            return this.ej2Instances.addMessage(message);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        focus: function () {
            return this.ej2Instances.focus();
        },
        scrollToBottom: function () {
            return this.ej2Instances.scrollToBottom();
        },
        scrollToMessage: function (messageId) {
            return this.ej2Instances.scrollToMessage(messageId);
        },
        updateMessage: function (message, msgId) {
            return this.ej2Instances.updateMessage(message, msgId);
        },
    }
});
var ChatUIPlugin = {
    name: 'ejs-chatui',
    install: function (Vue) {
        Vue.component(ChatUIPlugin.name, ChatUIComponent);
        Vue.component(MessagePlugin.name, MessageDirective);
        Vue.component(MessagesPlugin.name, MessagesDirective);
    }
};

export { AIAssistViewComponent, AIAssistViewPlugin, ChatUIComponent, ChatUIPlugin, MessageDirective, MessagePlugin, MessagesDirective, MessagesPlugin, ViewDirective, ViewPlugin, ViewsDirective, ViewsPlugin };
//# sourceMappingURL=ej2-vue-interactive-chat.es5.js.map
