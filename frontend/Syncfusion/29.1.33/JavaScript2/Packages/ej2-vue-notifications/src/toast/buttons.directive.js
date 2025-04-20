import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var ButtonModelPropsDirective = vueDefineComponent({
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
            return 'e-buttonmodelprops';
        }
    }
});
export var ButtonModelPropsPlugin = {
    name: 'e-buttonmodelprops',
    install: function (Vue) {
        Vue.component(ButtonModelPropsPlugin.name, ButtonModelPropsDirective);
    }
};
/**
 * 'e-button' directive represent a button of Vue toast
 * It must be contained in a Toast component(`ejs-toast`).
 * ```html
 * <ejs-toast id='toast' :showCloseIcon=true>
 *   <e-buttons>
 *    <e-button :content='Ok' :isPrimary=true></e-button>
 *    <e-button :content='Cancel'></e-button>
 *   </e-buttons>
 * </ejs-toast>
 * ```
 */
export var ButtonModelPropDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-buttonmodelprop';
        }
    }
});
export var ButtonModelPropPlugin = {
    name: 'e-buttonmodelprop',
    install: function (Vue) {
        Vue.component(ButtonModelPropPlugin.name, ButtonModelPropDirective);
    }
};
