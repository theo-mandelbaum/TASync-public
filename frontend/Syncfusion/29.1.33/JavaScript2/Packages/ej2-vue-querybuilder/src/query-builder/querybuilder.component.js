import { ComponentBase, gh, getProps, isExecute, vueDefineComponent } from '@syncfusion/ej2-vue-base';
import { isNullOrUndefined } from '@syncfusion/ej2-base';
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';
import { ColumnsDirective, ColumnDirective, ColumnsPlugin, ColumnPlugin } from './columns.directive';
export var properties = ['isLazyUpdate', 'plugins', 'addRuleToNewGroups', 'allowDragAndDrop', 'allowValidation', 'autoSelectField', 'autoSelectOperator', 'columns', 'cssClass', 'dataSource', 'displayMode', 'enableNotCondition', 'enablePersistence', 'enableRtl', 'enableSeparateConnector', 'fieldMode', 'fieldModel', 'headerTemplate', 'height', 'immediateModeDelay', 'locale', 'matchCase', 'maxGroupCount', 'operatorModel', 'readonly', 'rule', 'separator', 'showButtons', 'sortDirection', 'summaryView', 'valueModel', 'width', 'actionBegin', 'beforeChange', 'change', 'created', 'dataBound', 'ruleChange', 'drag', 'dragStart', 'drop'];
export var modelProps = [];
export var testProp = getProps({ props: properties });
export var props = testProp[0], watch = testProp[1], emitProbs = Object.keys(watch);
emitProbs.push('modelchanged', 'update:modelValue');
for (var _i = 0, modelProps_1 = modelProps; _i < modelProps_1.length; _i++) {
    var props_1 = modelProps_1[_i];
    emitProbs.push('update:' + props_1);
}
/**
 * Represents the VueJS QueryBuilder Component.
 * ```html
 * <ejs-querybuilder></ejs-querybuilder>
 * ```
 */
export var QueryBuilderComponent = vueDefineComponent({
    name: 'QueryBuilderComponent',
    mixins: [ComponentBase],
    props: props,
    watch: watch,
    emits: emitProbs,
    provide: function () { return { custom: this.custom }; },
    data: function () {
        return {
            ej2Instances: new QueryBuilder({}),
            propKeys: properties,
            models: modelProps,
            hasChildDirective: true,
            hasInjectedModules: true,
            tagMapper: { "e-columns": "e-column" },
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
        addGroups: function (groups, groupID) {
            return this.ej2Instances.addGroups(groups, groupID);
        },
        addRules: function (rule, groupID) {
            return this.ej2Instances.addRules(rule, groupID);
        },
        cloneGroup: function (groupID, parentGroupID, index) {
            return this.ej2Instances.cloneGroup(groupID, parentGroupID, index);
        },
        cloneRule: function (ruleID, groupID, index) {
            return this.ej2Instances.cloneRule(ruleID, groupID, index);
        },
        deleteGroup: function (target) {
            return this.ej2Instances.deleteGroup(target);
        },
        deleteGroups: function (groupIdColl) {
            return this.ej2Instances.deleteGroups(groupIdColl);
        },
        deleteRules: function (ruleIdColl) {
            return this.ej2Instances.deleteRules(ruleIdColl);
        },
        destroy: function () {
            return this.ej2Instances.destroy();
        },
        getDataManagerQuery: function (rule) {
            return this.ej2Instances.getDataManagerQuery(rule);
        },
        getFilteredRecords: function () {
            return this.ej2Instances.getFilteredRecords();
        },
        getGroup: function (target) {
            return this.ej2Instances.getGroup(target);
        },
        getMongoQuery: function (rule) {
            return this.ej2Instances.getMongoQuery(rule);
        },
        getOperators: function (field) {
            return this.ej2Instances.getOperators(field);
        },
        getParameterizedNamedSql: function (rule) {
            return this.ej2Instances.getParameterizedNamedSql(rule);
        },
        getParameterizedSql: function (rule) {
            return this.ej2Instances.getParameterizedSql(rule);
        },
        getPredicate: function (rule) {
            return this.ej2Instances.getPredicate(rule);
        },
        getRule: function (elem) {
            return this.ej2Instances.getRule(elem);
        },
        getRules: function () {
            return this.ej2Instances.getRules();
        },
        getRulesFromSql: function (sqlString, sqlLocale) {
            return this.ej2Instances.getRulesFromSql(sqlString, sqlLocale);
        },
        getSqlFromRules: function (rule, allowEscape, sqlLocale) {
            return this.ej2Instances.getSqlFromRules(rule, allowEscape, sqlLocale);
        },
        getValidRules: function (currentRule) {
            return this.ej2Instances.getValidRules(currentRule);
        },
        getValues: function (field) {
            return this.ej2Instances.getValues(field);
        },
        lockGroup: function (groupID) {
            return this.ej2Instances.lockGroup(groupID);
        },
        lockRule: function (ruleID) {
            return this.ej2Instances.lockRule(ruleID);
        },
        notifyChange: function (value, element, type) {
            return this.ej2Instances.notifyChange(value, element, type);
        },
        requiredModules: function () {
            return this.ej2Instances.requiredModules();
        },
        reset: function () {
            return this.ej2Instances.reset();
        },
        setMongoQuery: function (mongoQuery, mongoLocale) {
            return this.ej2Instances.setMongoQuery(mongoQuery, mongoLocale);
        },
        setParameterizedNamedSql: function (sqlQuery) {
            return this.ej2Instances.setParameterizedNamedSql(sqlQuery);
        },
        setParameterizedSql: function (sqlQuery) {
            return this.ej2Instances.setParameterizedSql(sqlQuery);
        },
        setRules: function (rule) {
            return this.ej2Instances.setRules(rule);
        },
        setRulesFromSql: function (sqlString, sqlLocale) {
            return this.ej2Instances.setRulesFromSql(sqlString, sqlLocale);
        },
        validateFields: function () {
            return this.ej2Instances.validateFields();
        },
    }
});
export var QueryBuilderPlugin = {
    name: 'ejs-querybuilder',
    install: function (Vue) {
        Vue.component(QueryBuilderPlugin.name, QueryBuilderComponent);
        Vue.component(ColumnPlugin.name, ColumnDirective);
        Vue.component(ColumnsPlugin.name, ColumnsDirective);
    }
};
