import { gh, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
export var DropDownButtonItemsDirective = vueDefineComponent({
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
            return 'e-dropdownbuttonitems';
        }
    }
});
export var DropDownButtonItemsPlugin = {
    name: 'e-dropdownbuttonitems',
    install: function (Vue) {
        Vue.component(DropDownButtonItemsPlugin.name, DropDownButtonItemsDirective);
    }
};
export var DropDownButtonItemDirective = vueDefineComponent({
    render: function () {
        return;
    },
    methods: {
        getTag: function () {
            return 'e-dropdownbuttonitem';
        }
    }
});
export var DropDownButtonItemPlugin = {
    name: 'e-dropdownbuttonitem',
    install: function (Vue) {
        Vue.component(DropDownButtonItemPlugin.name, DropDownButtonItemDirective);
    }
};
