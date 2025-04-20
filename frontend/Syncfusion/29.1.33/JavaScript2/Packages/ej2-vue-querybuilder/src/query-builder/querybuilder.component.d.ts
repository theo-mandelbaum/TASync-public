import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { QueryBuilder, QueryBuilderModel } from '@syncfusion/ej2-querybuilder';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS QueryBuilder Component.
 * ```html
 * <ejs-querybuilder></ejs-querybuilder>
 * ```
 */
export declare let QueryBuilderComponent: DefineVueComponent<QueryBuilderModel>;
export declare type QueryBuilderComponent = typeof ComponentBase & {
    ej2Instances: QueryBuilder;
    isVue3: boolean;
    isLazyUpdate: Boolean;
    plugins: any[];
    propKeys: string[];
    models: string[];
    hasChildDirective: boolean;
    tagMapper: {
        [key: string]: Object;
    };
    tagNameMapper: Object;
    setProperties(prop: any, muteOnChange: boolean): void;
    trigger(eventName: string, eventProp: {
        [key: string]: Object;
    }, successHandler?: Function): void;
    addGroups(groups: Object[], groupID: string): void;
    addRules(rule: Object[], groupID: string): void;
    cloneGroup(groupID: string, parentGroupID: string, index: number): void;
    cloneRule(ruleID: string, groupID: string, index: number): void;
    deleteGroup(target: Object | string): void;
    deleteGroups(groupIdColl: string[]): void;
    deleteRules(ruleIdColl: string[]): void;
    destroy(): void;
    getDataManagerQuery(rule: Object): Object;
    getFilteredRecords(): Object | object;
    getGroup(target: Object | string): Object;
    getMongoQuery(rule?: Object): string;
    getOperators(field: string): undefined[];
    getParameterizedNamedSql(rule?: Object): Object;
    getParameterizedSql(rule?: Object): Object;
    getPredicate(rule: Object): Object;
    getRule(elem: string | Object): Object;
    getRules(): Object;
    getRulesFromSql(sqlString: string, sqlLocale?: boolean): Object;
    getSqlFromRules(rule?: Object, allowEscape?: boolean, sqlLocale?: boolean): string;
    getValidRules(currentRule?: Object): Object;
    getValues(field: string): object[];
    lockGroup(groupID: string): void;
    lockRule(ruleID: string): void;
    notifyChange(value: string | number | boolean | Object | string[] | number[] | Object[], element: Object, type?: string): void;
    requiredModules(): Object[];
    reset(): void;
    setMongoQuery(mongoQuery: string, mongoLocale?: boolean): void;
    setParameterizedNamedSql(sqlQuery: Object): void;
    setParameterizedSql(sqlQuery: Object): void;
    setRules(rule: Object): void;
    setRulesFromSql(sqlString: string, sqlLocale?: boolean): void;
    validateFields(): boolean;
};
export declare const QueryBuilderPlugin: {
    name: string;
    install(Vue: any): void;
};
