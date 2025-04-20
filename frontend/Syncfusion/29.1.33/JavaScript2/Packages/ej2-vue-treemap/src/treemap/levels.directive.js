import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var LevelsDirective = vueDefineComponent({
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
            return 'e-levels';
        }
    }
});
export var LevelsPlugin = {
    name: 'e-levels',
    install: function (Vue) {
        Vue.component(LevelsPlugin.name, LevelsDirective);
    }
};
/**
 * Represents the directive to configure and render level leaf items in the treemap.
 * ```vue
 * <ejs-treemap>
 * <e-levels>
 * <e-level></e-level>
 * </e-levels>
 * </ejs-treemap>
 * ```
 */
export var LevelDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-level';
        }
    }
});
export var LevelPlugin = {
    name: 'e-level',
    install: function (Vue) {
        Vue.component(LevelPlugin.name, LevelDirective);
    }
};
