import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Pager, PagerModel } from '@syncfusion/ej2-grids';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * `ejs-pager` represents the VueJS Pager Component.
 * ```vue
 * <ejs-pager></ejs-pager>
 * ```
 */
export declare let PagerComponent: DefineVueComponent<PagerModel>;
export declare type PagerComponent = typeof ComponentBase & {
    ej2Instances: Pager;
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
    destroyTemplate(propertyNames?: string[], index?: any): void;
    getLocalizedLabel(key: string): string;
    goToPage(pageNo: number): void;
    refresh(): void;
};
export declare const PagerPlugin: {
    name: string;
    install(Vue: any): void;
};
