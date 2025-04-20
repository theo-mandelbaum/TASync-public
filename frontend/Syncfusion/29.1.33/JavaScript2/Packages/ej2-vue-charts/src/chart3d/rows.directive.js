import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var Chart3DRowsDirective = vueDefineComponent({
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
            return 'e-chart3d-rows';
        }
    }
});
export var Chart3DRowsPlugin = {
    name: 'e-chart3d-rows',
    install: function (Vue) {
        Vue.component(Chart3DRowsPlugin.name, Chart3DRowsDirective);
    }
};
export var Chart3DRowDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-row';
        }
    }
});
export var Chart3DRowPlugin = {
    name: 'e-chart3d-row',
    install: function (Vue) {
        Vue.component(Chart3DRowPlugin.name, Chart3DRowDirective);
    }
};
