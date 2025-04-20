import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var ItemsDirective = vueDefineComponent({
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
            return 'e-items';
        }
    }
});
export var ItemsPlugin = {
    name: 'e-items',
    install: function (Vue) {
        Vue.component(ItemsPlugin.name, ItemsDirective);
    }
};
/**
 * 'e-timelineItem' directive represents a item of the Vue Timeline
 * It must be contained in a Timeline component(`ejs-timeline`).
 * ```html
 * <ejs-timeline>
 *  <e-items>
 *   <e-item :dotCss='e-icons e-folder' :content='Item 1' />
 *   <e-item :dotCss='e-icons e-folder' :content='Item 2' />
 *  </e-items>
 * </ejs-timeline>
 * ```
 */
export var ItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-item';
        }
    }
});
export var ItemPlugin = {
    name: 'e-item',
    install: function (Vue) {
        Vue.component(ItemPlugin.name, ItemDirective);
    }
};
