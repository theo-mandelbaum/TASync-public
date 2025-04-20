import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { PivotFieldList, PivotFieldListModel } from '@syncfusion/ej2-pivotview';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-pivotfieldlist` represents the VueJS PivotFieldList Component.
 * ```vue
 * <ejs-pivotfieldlist></ejs-pivotfieldlist>
 * ```
 */
export declare let PivotFieldListComponent: DefineVueComponent<PivotFieldListModel>;
export declare type PivotFieldListComponent = typeof ComponentBase & {
    ej2Instances: PivotFieldList;
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
    update(control: Object): void;
    updateView(control: Object): void;
};
export declare const PivotFieldListPlugin: {
    name: string;
    install(Vue: any): void;
};
