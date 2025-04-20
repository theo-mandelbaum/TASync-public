import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Menu, MenuModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS Menu Component.
 * ```html
 * <ejs-menu :items='menuItems'></ejs-menu>
 * ```
 */
export declare let MenuComponent: DefineVueComponent<MenuModel>;
export declare type MenuComponent = typeof ComponentBase & {
    ej2Instances: Menu;
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
    close(): void;
    destroy(): void;
    enableItems(items: string[], enable: boolean, isUniqueId?: boolean): void;
    getItemIndex(item: Object | string, isUniqueId?: boolean): number[];
    getMenuWidth(cmenu: Object, width: number, isRtl: boolean): number;
    hideItems(items: string[], isUniqueId?: boolean): void;
    insertAfter(items: Object[], text: string, isUniqueId?: boolean): void;
    insertBefore(items: Object[], text: string, isUniqueId?: boolean): void;
    open(): void;
    removeItems(items: string[], isUniqueId?: boolean): void;
    setItem(item: Object, id?: string, isUniqueId?: boolean): void;
    showItems(items: string[], isUniqueId?: boolean): void;
};
export declare const MenuPlugin: {
    name: string;
    install(Vue: any): void;
};
