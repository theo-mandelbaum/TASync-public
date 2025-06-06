import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ListBox, ListBoxModel } from '@syncfusion/ej2-dropdowns';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * ListBox component allows the user to select values from the predefined list of values.
 * ```html
 * <ejs-listbox :dataSource='data'></ejs-listbox>
 * ```
 */
export declare let ListBoxComponent: DefineVueComponent<ListBoxModel>;
export declare type ListBoxComponent = typeof ComponentBase & {
    ej2Instances: ListBox;
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
    addItems(items: Object[] | Object, itemIndex?: number): void;
    destroy(): void;
    enableItems(items: string[], enable: boolean, isValue?: boolean): void;
    filter(dataSource: undefined[] | Object | string[] | number[] | boolean[], query?: Object, fields?: Object): void;
    getDataByValue(value: string | number | boolean | object): Object | string | number | boolean;
    getDataByValues(value: string[] | number[] | boolean[]): undefined[];
    getDataList(): undefined[] | string[] | boolean[] | number[];
    getItems(): Object[];
    getSortedList(): undefined[] | string[] | boolean[] | number[];
    hideSpinner(): void;
    moveAllTo(targetId?: string, index?: number): void;
    moveBottom(value?: string[] | number[] | boolean[]): void;
    moveDown(value?: string[] | number[] | boolean[]): void;
    moveTo(value?: string[] | number[] | boolean[], index?: number, targetId?: string): void;
    moveTop(value?: string[] | number[] | boolean[]): void;
    moveUp(value?: string[] | number[] | boolean[]): void;
    removeItem(items?: undefined[] | undefined | string | boolean | number | string[] | boolean[] | number[], itemIndex?: number): void;
    removeItems(items?: Object[] | Object, itemIndex?: number): void;
    requiredModules(): Object[];
    selectAll(state: boolean): void;
    selectItems(items: string[], state: boolean, isValue?: boolean): void;
    showSpinner(): void;
};
export declare const ListBoxPlugin: {
    name: string;
    install(Vue: any): void;
};
