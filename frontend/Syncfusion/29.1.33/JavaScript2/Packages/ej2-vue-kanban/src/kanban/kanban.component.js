import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { Kanban } from '@syncfusion/ej2-kanban';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
import { StackedHeadersDirective, StackedHeaderDirective, StackedHeadersPlugin, StackedHeaderPlugin } from './stackedheaders.directive';
export var properties = ['isLazyUpdate', 'plugins', 'allowDragAndDrop', 'allowKeyboard', 'cardHeight', 'cardSettings', 'columns', 'constraintType', 'cssClass', 'dataSource', 'dialogSettings', 'enableHtmlSanitizer', 'enablePersistence', 'enableRtl', 'enableTooltip', 'enableVirtualization', 'externalDropId', 'height', 'keyField', 'locale', 'query', 'showEmptyColumn', 'sortSettings', 'stackedHeaders', 'swimlaneSettings', 'tooltipTemplate', 'width', 'actionBegin', 'actionComplete', 'actionFailure', 'cardClick', 'cardDoubleClick', 'cardRendered', 'created', 'dataBinding', 'dataBound', 'dataSourceChanged', 'dataStateChange', 'dialogClose', 'dialogOpen', 'drag', 'dragStart', 'dragStop', 'queryCellInfo'];
export var modelProps = [];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * `ej-kanban` represents the VueJS Kanban Component.
 * ```vue
 * <ejs-kanban></ejs-kanban>
 * ```
 */
export var KanbanComponent = vueDefineComponent({
    name: 'KanbanComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new Kanban({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: false,
            tagMapper: { "e-columns": "e-column", "e-stackedHeaders": "e-stackedHeader" },
            tagNameMapper: {},
            isVue3: !isExecute,
            templateCollection: {},
        };
    },
    created: function () {
        this.bindProperties();
        this.ej2Instances._setProperties = this.ej2Instances.setProperties;
        this.ej2Instances.setProperties = this.setProperties;
        this.ej2Instances.clearTemplate = this.clearTemplate;
        this.updated = this.updated;
    },
    render: function (createElement) {
        var h = !isExecute ? gh : createElement;
        var slots = null;
        if (!isNullOrUndefined(this.$slots.default)) {
            slots = !isExecute ? this.$slots.default() : this.$slots.default;
        }
        return h('div', slots);
    },
    methods: {
        clearTemplate: function (templateNames) {
            if (!templateNames) {
                templateNames = Object.keys(this.templateCollection || {});
            }
            if (templateNames.length && this.templateCollection) {
                for (var _i = 0, templateNames_1 = templateNames; _i < templateNames_1.length; _i++) {
                    var tempName = templateNames_1[_i];
                    var elementCollection = this.templateCollection[tempName];
                    if (elementCollection && elementCollection.length) {
                        for (var _a = 0, elementCollection_1 = elementCollection; _a < elementCollection_1.length; _a++) {
                            var ele = elementCollection_1[_a];
                            this.destroyPortals(ele);
                        }
                        delete this.templateCollection[tempName];
                    }
                }
            }
        },
        setProperties: function (prop, muteOnChange) {
            var _this = this;
            if (this.isVue3) {
                this.models = !this.models ? this.ej2Instances.referModels : this.models;
            }
            if (this.ej2Instances && this.ej2Instances._setProperties) {
                this.ej2Instances._setProperties(prop, muteOnChange);
            }
            if (prop && this.models && this.models.length) {
                Object.keys(prop).map(function (key) {
                    _this.models.map(function (model) {
                        if ((key === model) && !(/datasource/i.test(key))) {
                            if (_this.isVue3) {
                                _this.ej2Instances.vueInstance.$emit('update:' + key, prop[key]);
                            }
                            else {
                                _this.$emit('update:' + key, prop[key]);
                                _this.$emit('modelchanged', prop[key]);
                            }
                        }
                    });
                });
            }
        },
        custom: function () {
            this.updated();
        },
        addCard: function (cardData, index) {
            return this.ej2Instances.addCard(cardData, index);
        },
        addColumn: function (columnOptions, index) {
            return this.ej2Instances.addColumn(columnOptions, index);
        },
        closeDialog: function () {
            return this.ej2Instances.closeDialog();
        },
        deleteCard: function (cardData) {
            return this.ej2Instances.deleteCard(cardData);
        },
        deleteColumn: function (index) {
            return this.ej2Instances.deleteColumn(index);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        getCardDetails: function (target) {
            return this.ej2Instances.getCardDetails(target);
        },
        getColumnData: function (columnKey, dataSource) {
            return this.ej2Instances.getColumnData(columnKey, dataSource);
        },
        getSelectedCards: function () {
            return this.ej2Instances.getSelectedCards();
        },
        getSwimlaneData: function (keyField) {
            return this.ej2Instances.getSwimlaneData(keyField);
        },
        hideColumn: function (key) {
            return this.ej2Instances.hideColumn(key);
        },
        hideSpinner: function () {
            return this.ej2Instances.hideSpinner();
        },
        openDialog: function (action, data) {
            return this.ej2Instances.openDialog(action, data);
        },
        refreshHeader: function () {
            return this.ej2Instances.refreshHeader();
        },
        refreshUI: function (args, index) {
            return this.ej2Instances.refreshUI(args, index);
        },
        renderTemplates: function () {
            return this.ej2Instances.renderTemplates();
        },
        resetTemplates: function (templates) {
            return this.ej2Instances.resetTemplates(templates);
        },
        showColumn: function (key) {
            return this.ej2Instances.showColumn(key);
        },
        showSpinner: function () {
            return this.ej2Instances.showSpinner();
        },
        templateParser: function (template) {
            return this.ej2Instances.templateParser(template);
        },
        updateCard: function (cardData, index) {
            return this.ej2Instances.updateCard(cardData, index);
        },
    }
});
export var KanbanPlugin = {
    name: 'ejs-kanban',
    install: function (Vue) {
        Vue.component(KanbanPlugin.name, KanbanComponent);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
        Vue.component(StackedHeaderPlugin.name, StackedHeaderDirective);
        Vue.component(StackedHeadersPlugin.name, StackedHeadersDirective);
    }
};
