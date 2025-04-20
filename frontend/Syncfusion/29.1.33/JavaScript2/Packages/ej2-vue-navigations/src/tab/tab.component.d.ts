import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Tab, TabModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Tab Component.
 * ```html
 * <ejs-tab></ejs-tab>
 * ```
 */
export declare let TabComponent: DefineVueComponent<TabModel>;
export declare type TabComponent = typeof ComponentBase & {
    ej2Instances: Tab;
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
    addTab(items: Object[], index?: number): void;
    destroy(): void;
    disable(value: boolean): void;
    enableTab(index: number, value: boolean): void;
    getItemIndex(tabItemId: string): number;
    hideTab(index: number, value?: boolean): void;
    refresh(): void;
    refreshActiveTab(): void;
    refreshActiveTabBorder(): void;
    refreshOverflow(): void;
    removeTab(index: number): void;
    select(args: number | Object, event?: Object): void;
};
export declare const TabPlugin: {
    name: string;
    install(Vue: any): void;
};
