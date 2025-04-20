import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var WeekWorkingTimesDirective = vueDefineComponent({
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
            return 'e-week-working-times';
        }
    }
});
export var WeekWorkingTimesPlugin = {
    name: 'e-week-working-times',
    install: function (Vue) {
        Vue.component(WeekWorkingTimesPlugin.name, WeekWorkingTimesDirective);
    }
};
/**
 * `e-week-working-time-collection` directive represent a working time ranges in a day.
 * It must be contained in a Gantt component(`ejs-gantt`).
 * ```vue
 * <ejs-gantt :dataSource]='data' allowSelection='true' allowSorting='true'>
 *   <e-week-working-time-collection>
 *     <e-week-working-time dayOfWeek='Monday' from='8' to='12'/>
 *     <e-week-working-time dayOfWeek='Monday' from='13' to='17'/>
 *   </e-week-working-time-collection>
 * </ejs-gantt>
 * ```
 */
export var WeekWorkingTimeDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-week-working-time';
        }
    }
});
export var WeekWorkingTimePlugin = {
    name: 'e-week-working-time',
    install: function (Vue) {
        Vue.component(WeekWorkingTimePlugin.name, WeekWorkingTimeDirective);
    }
};
