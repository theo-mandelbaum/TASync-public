import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var RibbonContextualTabsDirective = vueDefineComponent({
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
            return 'e-ribbon-contextual-tabs';
        }
    }
});
export var RibbonContextualTabsPlugin = {
    name: 'e-ribbon-contextual-tabs',
    install: function (Vue) {
        Vue.component(RibbonContextualTabsPlugin.name, RibbonContextualTabsDirective);
    }
};
/**
 * `e-ribbon-contextual-tab` directive represent a contextual tab of the VueJS Ribbon.
 * It must be contained in a Ribbon component(`ejs-ribbon`).
 * ```vue
 * <ejs-ribbon>
 *   <e-ribbon-contextual-tabs>
 *    <e-ribbon-contextual-tab></e-ribbon-contextual-tab>
 *    <e-ribbon-contextual-tab></e-ribbon-contextual-tab>
 *   </e-ribbon-contextual-tabs>
 * </ejs-ribbon>
 * ```
 */
export var RibbonContextualTabDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-ribbon-contextual-tab';
        }
    }
});
export var RibbonContextualTabPlugin = {
    name: 'e-ribbon-contextual-tab',
    install: function (Vue) {
        Vue.component(RibbonContextualTabPlugin.name, RibbonContextualTabDirective);
    }
};
