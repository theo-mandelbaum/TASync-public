import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var RibbonItemsDirective = vueDefineComponent({
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
export var RibbonItemsPlugin = {
    name: 'e-ribbon-items',
    install: function (Vue) {
        Vue.component(RibbonItemsPlugin.name, RibbonItemsDirective);
    }
};
export var RibbonItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-item';
        }
    }
});
export var RibbonItemPlugin = {
    name: 'e-ribbon-item',
    install: function (Vue) {
        Vue.component(RibbonItemPlugin.name, RibbonItemDirective);
    }
};
