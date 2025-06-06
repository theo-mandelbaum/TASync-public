import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ComboBox, ComboBoxModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * ComboBox component allows the user to type a value or choose an option from the list of predefined options available
 * ```html
 * <ejs-combobox :dataSource='data'></ejs-combobox>
 * ```
 */
export declare let ComboBoxComponent: DefineVueComponent<ComboBoxModel>;
export declare type ComboBoxComponent = typeof ComponentBase & {
    ej2Instances: ComboBox;
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
export declare const ComboBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
