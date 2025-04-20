import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var StackedColumnsDirective = vueDefineComponent({
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
            return 'e-stacked-columns';
        }
    }
});
export var StackedColumnsPlugin = {
    name: 'e-stacked-columns',
    install: function (Vue) {
        Vue.component(StackedColumnsPlugin.name, StackedColumnsDirective);
    }
};
export var StackedColumnDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-stacked-column';
        }
    }
});
export var StackedColumnPlugin = {
    name: 'e-stacked-column',
    install: function (Vue) {
        Vue.component(StackedColumnPlugin.name, StackedColumnDirective);
    }
};
