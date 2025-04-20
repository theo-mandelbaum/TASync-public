import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Overview, OverviewModel } from '@syncfusion/ej2-diagrams';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents vue Overview Component
 * ```html
 * <ej-overview></ej-overview>
 * ```
 */
export declare let OverviewComponent: DefineVueComponent<OverviewModel>;
export declare type OverviewComponent = typeof ComponentBase & {
    ej2Instances: Overview;
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
    updateHtmlLayer(view: Object): void;
};
export declare const OverviewPlugin: {
    name: string;
    install(Vue: any): void;
};
