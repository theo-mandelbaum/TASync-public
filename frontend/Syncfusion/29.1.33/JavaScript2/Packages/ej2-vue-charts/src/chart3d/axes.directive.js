import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var Chart3DAxesDirective = vueDefineComponent({
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
            return 'e-chart3daxes';
        }
    }
});
export var Chart3DAxesPlugin = {
    name: 'e-chart3daxes',
    install: function (Vue) {
        Vue.component(Chart3DAxesPlugin.name, Chart3DAxesDirective);
    }
};
export var Chart3DAxisDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3daxis';
        }
    }
});
export var Chart3DAxisPlugin = {
    name: 'e-chart3daxis',
    install: function (Vue) {
        Vue.component(Chart3DAxisPlugin.name, Chart3DAxisDirective);
    }
};
