import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var NavigationLinesDirective = vueDefineComponent({
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
            return 'e-navigationLineSettings';
        }
    }
});
export var NavigationLinesPlugin = {
    name: 'e-navigationLineSettings',
    install: function (Vue) {
        Vue.component(NavigationLinesPlugin.name, NavigationLinesDirective);
    }
};
/**
 * Represents the directive to define the navigation lines in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-navigationLineSettings>
 * <e-navigationLineSetting>
 * </e-navigationLineSetting>
 * </e-navigationLineSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export var NavigationLineDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-navigationLineSetting';
        }
    }
});
export var NavigationLinePlugin = {
    name: 'e-navigationLineSetting',
    install: function (Vue) {
        Vue.component(NavigationLinePlugin.name, NavigationLineDirective);
    }
};
