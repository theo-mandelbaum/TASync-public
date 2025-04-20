import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var RibbonTabsDirective = vueDefineComponent({
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
export var RibbonTabsPlugin = {
    name: 'e-ribbon-tabs',
    install: function (Vue) {
        Vue.component(RibbonTabsPlugin.name, RibbonTabsDirective);
    }
};
export var RibbonTabDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-tab';
        }
    }
});
export var RibbonTabPlugin = {
    name: 'e-ribbon-tab',
    install: function (Vue) {
        Vue.component(RibbonTabPlugin.name, RibbonTabDirective);
    }
};
