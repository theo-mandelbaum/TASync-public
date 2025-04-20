import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var Chart3DSelectedDataIndexesDirective = vueDefineComponent({
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
            return 'e-chart3d-selecteddataindexes';
        }
    }
});
export var Chart3DSelectedDataIndexesPlugin = {
    name: 'e-chart3d-selecteddataindexes',
    install: function (Vue) {
        Vue.component(Chart3DSelectedDataIndexesPlugin.name, Chart3DSelectedDataIndexesDirective);
    }
};
export var Chart3DSelectedDataIndexDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-selecteddataindex';
        }
    }
});
export var Chart3DSelectedDataIndexPlugin = {
    name: 'e-chart3d-selecteddataindex',
    install: function (Vue) {
        Vue.component(Chart3DSelectedDataIndexPlugin.name, Chart3DSelectedDataIndexDirective);
    }
};
