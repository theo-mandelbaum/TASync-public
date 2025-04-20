import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Ribbon, RibbonModel } from '@syncfusion/ej2-ribbon';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Ribbon Component
 * ```vue
 * <ejs-ribbon></ejs-ribbon>
 * ```
 */
export declare let RibbonComponent: DefineVueComponent<RibbonModel>;
export declare type RibbonComponent = typeof ComponentBase & {
    ej2Instances: Ribbon;
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
    addCollection(groupId: string, collection: Object, targetId?: string, isAfter?: boolean): void;
    addGroup(tabId: string, group: Object, targetId?: string, isAfter?: boolean): void;
    addItem(collectionId: string, item: Object, targetId?: string, isAfter?: boolean): void;
    addTab(tab: Object, targetId?: string, isAfter?: boolean): void;
    destroy(): void;
    disableGroup(groupID: string): void;
    disableItem(itemId: string): void;
    disableTab(tabId: string): void;
    enableGroup(groupID: string): void;
    enableItem(itemId: string): void;
    enableTab(tabId: string): void;
    getItem(itemId: string): Object;
    hideGroup(groupID: string): void;
    hideItem(itemId: string): void;
    hideTab(tabId: string, isContextual: boolean): void;
    refreshLayout(): void;
    removeCollection(collectionId: string): void;
    removeGroup(groupId: string): void;
    removeItem(itemId: string): void;
    removeTab(tabId: string): void;
    selectTab(tabId: string): void;
    showGroup(groupID: string): void;
    showItem(itemId: string): void;
    showTab(tabId: string, isContextual: boolean): void;
    updateCollection(collection: Object): void;
    updateGroup(group: Object): void;
    updateItem(item: Object): void;
    updateTab(tab: Object): void;
};
export declare const RibbonPlugin: {
    name: string;
    install(Vue: any): void;
};
