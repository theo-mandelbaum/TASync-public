import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Sidebar, SidebarModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 *  Represents the Essential JS 2 VueJS Sidebar Component.
 * ```html
 * <ejs-sidebar></ejs-sidebar>
 * ```
 */
export declare let SidebarComponent: DefineVueComponent<SidebarModel>;
export declare type SidebarComponent = typeof ComponentBase & {
    ej2Instances: Sidebar;
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
    hide(e?: Object): void;
    show(e?: Object): void;
    toggle(): void;
};
export declare const SidebarPlugin: {
    name: string;
    install(Vue: any): void;
};
