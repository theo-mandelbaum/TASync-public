import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var NodeFixedUserHandlesDirective = vueDefineComponent({
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
            return 'e-node-fixeduserhandles';
        }
    }
});
export var NodeFixedUserHandlesPlugin = {
    name: 'e-node-fixeduserhandles',
    install: function (Vue) {
        Vue.component(NodeFixedUserHandlesPlugin.name, NodeFixedUserHandlesDirective);
    }
};
/**
 * `e-node` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-nodes>
 * <e-node>
 * <e-node-fixeduserhandles>
 * <e-node-fixeduserhandle>
 * </e-node-fixeduserhandle>
 * </e-node-fixeduserhandles>
 * </e-node>
 * </e-nodes>
 * </ejs-diagram>
 * ```
 */
export var NodeFixedUserHandleDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-node-fixeduserhandle';
        }
    }
});
export var NodeFixedUserHandlePlugin = {
    name: 'e-node-fixeduserhandle',
    install: function (Vue) {
        Vue.component(NodeFixedUserHandlePlugin.name, NodeFixedUserHandleDirective);
    }
};
