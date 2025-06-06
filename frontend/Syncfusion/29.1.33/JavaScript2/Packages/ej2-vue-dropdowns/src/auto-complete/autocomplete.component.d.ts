import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { AutoComplete, AutoCompleteModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * The AutoComplete component provides all the matched suggestion list on typing the input from which the user can select one.
 * ```html
 * <ejs-autocomplete :dataSource='data'></ejs-autocomplete>
 * ```
 */
export declare let AutoCompleteComponent: DefineVueComponent<AutoCompleteModel>;
export declare type AutoCompleteComponent = typeof ComponentBase & {
    ej2Instances: AutoComplete;
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
    addItem(items: undefined[] | undefined | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    clear(): void;
    destroy(): void;
    disableItem(item: string | number | object | Object): void;
    filter(dataSource: undefined[] | Object | string[] | number[] | boolean[], query?: Object, fields?: Object): void;
    focusIn(): void;
    focusOut(e?: Object | Object): void;
    getDataByValue(value: string | number | boolean): Object | string | number | boolean;
    getItems(): Object[];
    hidePopup(e?: Object | Object | Object): void;
    hideSpinner(): void;
    requiredModules(): Object[];
    showPopup(e?: Object | Object | Object): void;
    showSpinner(): void;
};
export declare const AutoCompletePlugin: {
    name: string;
    install(Vue: any): void;
};
