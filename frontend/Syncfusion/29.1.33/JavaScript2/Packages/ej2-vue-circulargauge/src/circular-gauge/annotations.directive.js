import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var AnnotationsDirective = vueDefineComponent({
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
            return 'e-annotations';
        }
    }
});
export var AnnotationsPlugin = {
    name: 'e-annotations',
    install: function (Vue) {
        Vue.component(AnnotationsPlugin.name, AnnotationsDirective);
    }
};
/**
 * Represents the directive to render and customize the annotations in an axis of circular gauge.
 * ```vue
 * <ejs-circulargauge>
 * <e-axes>
 * <e-axis>
 * <e-annotations><e-annotation></e-annotation></e-annotations>
 * </e-axis>
 * </e-axes>
 * </ejs-circulargauge>
 * ```
 */
export var AnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-annotation';
        }
    }
});
export var AnnotationPlugin = {
    name: 'e-annotation',
    install: function (Vue) {
        Vue.component(AnnotationPlugin.name, AnnotationDirective);
    }
};
