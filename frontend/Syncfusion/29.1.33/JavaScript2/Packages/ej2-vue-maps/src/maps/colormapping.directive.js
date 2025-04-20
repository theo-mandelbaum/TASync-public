import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var ColorMappingsDirective = vueDefineComponent({
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
            return 'e-colorMappings';
        }
    }
});
export var ColorMappingsPlugin = {
    name: 'e-colorMappings',
    install: function (Vue) {
        Vue.component(ColorMappingsPlugin.name, ColorMappingsDirective);
    }
};
/**
 * Represents the directive to define the bubble color mapping in the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-bubbleSettings>
 * <e-bubbleSetting>
 * </e-bubbleSetting>
 * </e-bubbleSettings>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export var ColorMappingDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-colorMapping';
        }
    }
});
export var ColorMappingPlugin = {
    name: 'e-colorMapping',
    install: function (Vue) {
        Vue.component(ColorMappingPlugin.name, ColorMappingDirective);
    }
};
