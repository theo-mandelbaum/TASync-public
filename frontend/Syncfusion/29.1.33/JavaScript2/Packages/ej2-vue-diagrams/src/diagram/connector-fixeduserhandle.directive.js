import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var ConnectorFixedUserHandlesDirective = vueDefineComponent({
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
            return 'e-connector-fixeduserhandles';
        }
    }
});
export var ConnectorFixedUserHandlesPlugin = {
    name: 'e-connector-fixeduserhandles',
    install: function (Vue) {
        Vue.component(ConnectorFixedUserHandlesPlugin.name, ConnectorFixedUserHandlesDirective);
    }
};
/**
 * `e-connector` directive represent a annotation of the vue Diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```html
 * <ejs-diagram>
 * <e-connectors>
 * <e-connector>
 * <e-connector-fixeduserhandles>
 * <e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandle>
 * </e-connector-fixeduserhandles>
 * </e-connector>
 * </e-connectors>
 * </ejs-diagram>
 * ```
 */
export var ConnectorFixedUserHandleDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-connector-fixeduserhandle';
        }
    }
});
export var ConnectorFixedUserHandlePlugin = {
    name: 'e-connector-fixeduserhandle',
    install: function (Vue) {
        Vue.component(ConnectorFixedUserHandlePlugin.name, ConnectorFixedUserHandleDirective);
    }
};
