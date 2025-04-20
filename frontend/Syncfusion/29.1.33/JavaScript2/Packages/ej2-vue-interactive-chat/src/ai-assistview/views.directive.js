import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var ViewsDirective = vueDefineComponent({
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
            return 'e-views';
        }
    }
});
export var ViewsPlugin = {
    name: 'e-views',
    install: function (Vue) {
        Vue.component(ViewsPlugin.name, ViewsDirective);
    }
};
/**
 * Represents the Essential JS 2 VueJS AIAssistView Component
 * ```vue
 * <ejs-aiassistview>
 *   <e-views>
 *     <e-view>
 *     </e-view>
 *    </e-views>
 * </ejs-aiassistview>
 * ```
 */
export var ViewDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-view';
        }
    }
});
export var ViewPlugin = {
    name: 'e-view',
    install: function (Vue) {
        Vue.component(ViewPlugin.name, ViewDirective);
    }
};
