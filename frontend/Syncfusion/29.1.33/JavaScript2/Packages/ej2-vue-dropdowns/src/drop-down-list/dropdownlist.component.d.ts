import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { DropDownList, DropDownListModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * DropDownList contains a list of predefined values from which the user can choose
 * ```html
 * <ejs-dropdownlist :dataSource='data'></ejs-dropdownlist>
 * ```
 */
export declare let DropDownListComponent: DefineVueComponent<DropDownListModel>;
export declare type DropDownListComponent = typeof ComponentBase & {
    ej2Instances: DropDownList;
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
    focusIn(e?: Object | Object | Object | Object): void;
    focusOut(e?: Object | Object): void;
    getDataByValue(value: string | number | boolean): Object | string | number | boolean;
    getItems(): Object[];
    hidePopup(e?: Object | Object | Object): void;
    hideSpinner(): void;
    requiredModules(): Object[];
    showPopup(e?: Object | Object | Object): void;
    showSpinner(): void;
};
export declare const DropDownListPlugin: {
    name: string;
    install(Vue: any): void;
};
