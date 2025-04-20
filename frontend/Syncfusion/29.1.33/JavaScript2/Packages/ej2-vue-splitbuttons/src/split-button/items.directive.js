import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var SplitButtonItemsDirective = vueDefineComponent({
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
            return 'e-splitbuttonitems';
        }
    }
});
export var SplitButtonItemsPlugin = {
    name: 'e-splitbuttonitems',
    install: function (Vue) {
        Vue.component(SplitButtonItemsPlugin.name, SplitButtonItemsDirective);
    }
};
export var SplitButtonItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-splitbuttonitem';
        }
    }
});
export var SplitButtonItemPlugin = {
    name: 'e-splitbuttonitem',
    install: function (Vue) {
        Vue.component(SplitButtonItemPlugin.name, SplitButtonItemDirective);
    }
};
