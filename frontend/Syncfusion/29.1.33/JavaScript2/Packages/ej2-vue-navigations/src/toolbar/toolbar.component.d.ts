import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Toolbar, ToolbarModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Toolbar Component.
 * ```html
 * <ejs-toolbar></ejs-toolbar>
 * ```
 */
export declare let ToolbarComponent: DefineVueComponent<ToolbarModel>;
export declare type ToolbarComponent = typeof ComponentBase & {
    ej2Instances: Toolbar;
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
    addItems(items: Object[], index?: number): void;
    destroy(): void;
    disable(value: boolean): void;
    enableItems(items: number | Object | Object, isEnable?: boolean): void;
    hideItem(index: number | Object | Object, value?: boolean): void;
    refreshOverflow(): void;
    removeItems(args: number | Object | Object | Object | Object[]): void;
};
export declare const ToolbarPlugin: {
    name: string;
    install(Vue: any): void;
};
