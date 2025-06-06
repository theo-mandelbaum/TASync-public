import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { MultiSelect, MultiSelectModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * MultiSelect component allows the user to select a value from the predefined list of values.
 * ```html
 * <ejs-multiselect :dataSource='data'></ejs-multiselect>
 * ```
 */
export declare let MultiSelectComponent: DefineVueComponent<MultiSelectModel>;
export declare type MultiSelectComponent = typeof ComponentBase & {
    ej2Instance: MultiSelect;
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
    focusOut(): void;
    getDataByValue(value: string | number | boolean | object): Object | string | number | boolean;
    getItems(): Object[];
    hidePopup(e?: Object | Object): void;
    hideSpinner(): void;
    requiredModules(): Object[];
    selectAll(state: boolean): void;
    showPopup(e?: Object | Object | Object): void;
    showSpinner(): void;
};
export declare const MultiSelectPlugin: {
    name: string;
    install(Vue: any): void;
};
