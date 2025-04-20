import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ListView, ListViewModel } from '@syncfusion/ej2-lists';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents VueJS ListView Component
 * ```
 * <ejs-listview :dataSource='data'></ejs-listview>
 * ```
 */
export declare let ListViewComponent: DefineVueComponent<ListViewModel>;
export declare type ListViewComponent = typeof ComponentBase & {
    ej2Instances: ListView;
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
    addItem(data: undefined[], fields: Object, index?: number): void;
    back(): void;
    checkAllItems(): void;
    checkItem(item: Object | Object | Object): void;
    destroy(): void;
    disableItem(item: Object | Object | Object): void;
    enableItem(item: Object | Object | Object): void;
    findItem(item: Object | Object | Object): Object;
    getSelectedItems(): Object | Object | Object | Object;
    hideItem(item: Object | Object | Object): void;
    refreshItemHeight(): void;
    removeItem(item: Object | Object | Object): void;
    removeMultipleItems(item: Object[] | Object[] | Object[]): void;
    requiredModules(): Object[];
    selectItem(item: Object | Object | Object): void;
    selectMultipleItems(item: Object[] | Object[] | Object[]): void;
    showItem(item: Object | Object | Object): void;
    uncheckAllItems(): void;
    uncheckItem(item: Object | Object | Object): void;
    unselectItem(item?: Object | Object | Object): void;
};
export declare const ListViewPlugin: {
    name: string;
    install(Vue: any): void;
};
