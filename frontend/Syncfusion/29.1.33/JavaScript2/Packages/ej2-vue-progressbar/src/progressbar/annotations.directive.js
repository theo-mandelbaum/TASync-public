import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var ProgressBarAnnotationsDirective = vueDefineComponent({
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
            return 'e-progressbar-annotations';
        }
    }
});
export var ProgressBarAnnotationsPlugin = {
    name: 'e-progressbar-annotations',
    install: function (Vue) {
        Vue.component(ProgressBarAnnotationsPlugin.name, ProgressBarAnnotationsDirective);
    }
};
export var ProgressBarAnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-progressbar-annotation';
        }
    }
});
export var ProgressBarAnnotationPlugin = {
    name: 'e-progressbar-annotation',
    install: function (Vue) {
        Vue.component(ProgressBarAnnotationPlugin.name, ProgressBarAnnotationDirective);
    }
};
