import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var SpeedDialItemsDirective = vueDefineComponent({
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
            return 'e-speeddial-items';
        }
    }
});
export var SpeedDialItemsPlugin = {
    name: 'e-speeddial-items',
    install: function (Vue) {
        Vue.component(SpeedDialItemsPlugin.name, SpeedDialItemsDirective);
    }
};
/**
 * 'e-speeddialitem' directive represent a item of Vue SpeedDial
 * It must be contained in a SpeedDial component(`ejs-speeddial`).
 * ```html
 * <ejs-speeddial>
 *   <e-speeddialitems>
 *    <e-speeddialitem text='Cut'></e-speeddialitem>
 *    <e-speeddialitem text='Copy'></e-speeddialitem>
 *   </e-speeddialitems>
 * </ejs-speeddial>
 * ```
 */
export var SpeedDialItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-speeddial-item';
        }
    }
});
export var SpeedDialItemPlugin = {
    name: 'e-speeddial-item',
    install: function (Vue) {
        Vue.component(SpeedDialItemPlugin.name, SpeedDialItemDirective);
    }
};
