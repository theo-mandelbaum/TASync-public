import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var AggregatesDirective = vueDefineComponent({
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
            return 'e-aggregates';
        }
    }
});
export var AggregatesPlugin = {
    name: 'e-aggregates',
    install: function (Vue) {
        Vue.component(AggregatesPlugin.name, AggregatesDirective);
    }
};
/**
 * `e-aggregate` directive represent a aggregate row of the VueJS Grid.
 * It must be contained in a Grid component(`ejs-grid`).
 * ```vue
 * <ejs-grid :dataSource]='data' allowPaging='true' allowSorting='true'>
 *   <e-columns>
 *     <e-column field='ID' width='100'/>
 *     <e-column field='name' headerText='Name' width='100'/>
 *   </e-columns>
 *   <e-aggregates>
 *     <e-aggregate>
 *       <e-columns>
 *         <e-column field='ID' type='Min'/>
 *       </e-columns>
 *      </e-aggregate>
 *    </e-aggregates>
 * </ejs-grid>
 * ```
 */
export var AggregateDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-aggregate';
        }
    }
});
export var AggregatePlugin = {
    name: 'e-aggregate',
    install: function (Vue) {
        Vue.component(AggregatePlugin.name, AggregateDirective);
    }
};
