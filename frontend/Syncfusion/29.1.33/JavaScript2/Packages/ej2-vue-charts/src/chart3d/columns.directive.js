import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var Chart3DColumnsDirective = vueDefineComponent({
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
            return 'e-chart3d-columns';
        }
    }
});
export var Chart3DColumnsPlugin = {
    name: 'e-chart3d-columns',
    install: function (Vue) {
        Vue.component(Chart3DColumnsPlugin.name, Chart3DColumnsDirective);
    }
};
export var Chart3DColumnDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-columns';
        }
    }
});
export var Chart3DColumnPlugin = {
    name: 'e-chart3d-columns',
    install: function (Vue) {
        Vue.component(Chart3DColumnPlugin.name, Chart3DColumnDirective);
    }
};
