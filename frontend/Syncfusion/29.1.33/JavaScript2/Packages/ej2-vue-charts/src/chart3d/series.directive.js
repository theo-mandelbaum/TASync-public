import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var Chart3DSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-chart3d-series-collection';
        }
    }
});
export var Chart3DSeriesCollectionPlugin = {
    name: 'e-chart3d-series-collection',
    install: function (Vue) {
        Vue.component(Chart3DSeriesCollectionPlugin.name, Chart3DSeriesCollectionDirective);
    }
};
/**
 * Represents Vuejs 3D Chart Component
 * ```vue
 * <ejs-chart3d>
 * <e-chart3d-series-collection>
 * <e-chart3d-series></e-chart3d-series>
 * </e-chart3d-series-collection>
 * </ejs-chart3d>
 * ```
 */
export var Chart3DSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-chart3d-series';
        }
    }
});
export var Chart3DSeriesPlugin = {
    name: 'e-chart3d-series',
    install: function (Vue) {
        Vue.component(Chart3DSeriesPlugin.name, Chart3DSeriesDirective);
    }
};
