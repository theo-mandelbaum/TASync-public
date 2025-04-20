import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var RibbonCollectionsDirective = vueDefineComponent({
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
export var RibbonCollectionsPlugin = {
    name: 'e-ribbon-collections',
    install: function (Vue) {
        Vue.component(RibbonCollectionsPlugin.name, RibbonCollectionsDirective);
    }
};
export var RibbonCollectionDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-collection';
        }
    }
});
export var RibbonCollectionPlugin = {
    name: 'e-ribbon-collection',
    install: function (Vue) {
        Vue.component(RibbonCollectionPlugin.name, RibbonCollectionDirective);
    }
};
