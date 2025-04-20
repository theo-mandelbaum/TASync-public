import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var RibbonGroupsDirective = vueDefineComponent({
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
export var RibbonGroupsPlugin = {
    name: 'e-ribbon-groups',
    install: function (Vue) {
        Vue.component(RibbonGroupsPlugin.name, RibbonGroupsDirective);
    }
};
export var RibbonGroupDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-group';
        }
    }
});
export var RibbonGroupPlugin = {
    name: 'e-ribbon-group',
    install: function (Vue) {
        Vue.component(RibbonGroupPlugin.name, RibbonGroupDirective);
    }
};
