import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var CircularChart3DSelectedDataIndexesDirective = vueDefineComponent({
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
            return 'e-circularchart3d-selecteddataindexes';
        }
    }
});
export var CircularChart3DSelectedDataIndexesPlugin = {
    name: 'e-circularchart3d-selecteddataindexes',
    install: function (Vue) {
        Vue.component(CircularChart3DSelectedDataIndexesPlugin.name, CircularChart3DSelectedDataIndexesDirective);
    }
};
export var CircularChart3DSelectedDataIndexDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-circularchart3d-selecteddataindex';
        }
    }
});
export var CircularChart3DSelectedDataIndexPlugin = {
    name: 'e-circularchart3d-selecteddataindex',
    install: function (Vue) {
        Vue.component(CircularChart3DSelectedDataIndexPlugin.name, CircularChart3DSelectedDataIndexDirective);
    }
};
