import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var InitialShapeSelectionsDirective = vueDefineComponent({
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
            return 'e-initialShapeSelections';
        }
    }
});
export var InitialShapeSelectionsPlugin = {
    name: 'e-initialShapeSelections',
    install: function (Vue) {
        Vue.component(InitialShapeSelectionsPlugin.name, InitialShapeSelectionsDirective);
    }
};
/**
 * Represents the directive to configure the selection of the shapes when the maps is initially rendered.
 * ```vue
 * <ejs-maps>
 * <e-layers>
 * <e-layer>
 * <e-initialShapeSelections>
 * <e-initialShapeSelection>
 * </e-initialShapeSelection>
 * </e-initialShapeSelections>
 * </e-layer>
 * </e-layers>
 * </ejs-maps>
 * ```
 */
export var InitialShapeSelectionDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-initialShapeSelection';
        }
    }
});
export var InitialShapeSelectionPlugin = {
    name: 'e-initialShapeSelection',
    install: function (Vue) {
        Vue.component(InitialShapeSelectionPlugin.name, InitialShapeSelectionDirective);
    }
};
