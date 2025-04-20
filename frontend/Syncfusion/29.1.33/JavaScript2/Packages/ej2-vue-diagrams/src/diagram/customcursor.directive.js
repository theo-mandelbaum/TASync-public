import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var CustomCursorsDirective = vueDefineComponent({
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
            return 'e-cursormaps';
        }
    }
});
export var CustomCursorsPlugin = {
    name: 'e-cursormaps',
    install: function (Vue) {
        Vue.component(CustomCursorsPlugin.name, CustomCursorsDirective);
    }
};
/**
 * `e-custormaps` directive represent a layers of the vue diagram.
 * It must be contained in a Diagram component(`ejs-diagram`).
 * ```vue
 * <ejs-diagram>
 * <e-custormaps>
 * <e-custormap>
 * </e-custormap>
 * </e-custormaps>
</ejs-diagram>
 * ```
 */
export var CustomCursorDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-cursormap';
        }
    }
});
export var CustomCursorPlugin = {
    name: 'e-cursormap',
    install: function (Vue) {
        Vue.component(CustomCursorPlugin.name, CustomCursorDirective);
    }
};
