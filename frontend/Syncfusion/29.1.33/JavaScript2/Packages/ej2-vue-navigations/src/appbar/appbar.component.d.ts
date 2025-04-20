import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { AppBar, AppBarModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 *  Represents the Essential JS 2 VueJS AppBar Component.
 * ```html
 * <ejs-appbar></ejs-appbar>
 * ```
 */
export declare let AppBarComponent: DefineVueComponent<AppBarModel>;
export declare type AppBarComponent = typeof ComponentBase & {
    ej2Instances: AppBar;
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
};
export declare const AppBarPlugin: {
    name: string;
    install(Vue: any): void;
};
