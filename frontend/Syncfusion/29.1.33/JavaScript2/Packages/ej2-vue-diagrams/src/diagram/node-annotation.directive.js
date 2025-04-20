import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var NodeAnnotationsDirective = vueDefineComponent({
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
            return 'e-node-annotations';
        }
    }
});
export var NodeAnnotationsPlugin = {
    name: 'e-node-annotations',
    install: function (Vue) {
        Vue.component(NodeAnnotationsPlugin.name, NodeAnnotationsDirective);
    }
};
/**
 * `e-node` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-annotations>
 * <e-node-annotation>
 * </e-node-annotation>
 * </e-node-annotations>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export var NodeAnnotationDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-node-annotation';
        }
    }
});
export var NodeAnnotationPlugin = {
    name: 'e-node-annotation',
    install: function (Vue) {
        Vue.component(NodeAnnotationPlugin.name, NodeAnnotationDirective);
    }
};
