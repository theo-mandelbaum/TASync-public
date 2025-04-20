import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var LayersDirective = vueDefineComponent({
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
            return 'e-layers';
        }
    }
});
export var LayersPlugin = {
    name: 'e-layers',
    install: function (Vue) {
        Vue.component(LayersPlugin.name, LayersDirective);
    }
};
/**
 * Represents the directive to define the layer of the maps.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer></e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export var LayerDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-layer';
        }
    }
});
export var LayerPlugin = {
    name: 'e-layer',
    install: function (Vue) {
        Vue.component(LayerPlugin.name, LayerDirective);
    }
};
