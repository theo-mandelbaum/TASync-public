import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { RecurrenceEditor, RecurrenceEditorModel } from '@syncfusion/ej2-schedule';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-recurrenceeditor` represents the VueJS RecurrenceEditor Component.
 * ```vue
 * <ejs-recurrenceeditor></ejs-recurrenceeditor>
 * ```
 */
export declare let RecurrenceEditorComponent: DefineVueComponent<RecurrenceEditorModel>;
export declare type RecurrenceEditorComponent = typeof ComponentBase & {
    ej2Instances: RecurrenceEditor;
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
    destroy(): void;
    getRecurrenceDates(startDate: Object, rule: string, excludeDate?: string, maximumCount?: number, viewDate?: Object): number[];
    getRecurrenceRule(): string;
    getRuleSummary(rule: string): string;
    resetFields(): void;
    setRecurrenceRule(rule: string, startDate: Object): void;
    updateRuleUntilDate(startDate: Object): void;
};
export declare const RecurrenceEditorPlugin: {
    name: string;
    install(Vue: any): void;
};
