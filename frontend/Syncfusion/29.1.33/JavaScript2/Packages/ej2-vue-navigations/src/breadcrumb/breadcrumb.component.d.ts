import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Breadcrumb, BreadcrumbModel } from '@syncfusion/ej2-navigations';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Breadcrumb Component.
 * ```html
 * <ejs-breadcrumb :items='breadcrumbItems'></ejs-breadcrumb>
 * ```
 */
export declare let BreadcrumbComponent: DefineVueComponent<BreadcrumbModel>;
export declare type BreadcrumbComponent = typeof ComponentBase & {
    ej2Instances: Breadcrumb;
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
export declare const BreadcrumbPlugin: {
    name: string;
    install(Vue: any): void;
};
