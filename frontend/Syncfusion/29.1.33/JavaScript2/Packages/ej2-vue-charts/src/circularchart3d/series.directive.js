import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var CircularChart3DSeriesCollectionDirective = vueDefineComponent({
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
            return 'e-circularchart3d-series-collection';
        }
    }
});
export var CircularChart3DSeriesCollectionPlugin = {
    name: 'e-circularchart3d-series-collection',
    install: function (Vue) {
        Vue.component(CircularChart3DSeriesCollectionPlugin.name, CircularChart3DSeriesCollectionDirective);
    }
};
export var CircularChart3DSeriesDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-circularchart3d-series';
        }
    }
});
export var CircularChart3DSeriesPlugin = {
    name: 'e-circularchart3d-series',
    install: function (Vue) {
        Vue.component(CircularChart3DSeriesPlugin.name, CircularChart3DSeriesDirective);
    }
};
