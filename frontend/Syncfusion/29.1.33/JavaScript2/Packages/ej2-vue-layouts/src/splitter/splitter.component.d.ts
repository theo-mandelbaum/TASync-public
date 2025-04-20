import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { Splitter, SplitterModel } from '@syncfusion/ej2-layouts';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the VueJS Splitter component
 * ```html
 * <ejs-splitter></ejs-splitter>
 * ```
 */
export declare let SplitterComponent: DefineVueComponent<SplitterModel>;
export declare type SplitterComponent = typeof ComponentBase & {
    ej2Instances: Splitter;
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
    addPane(paneProperties: Object, index: number): void;
    collapse(index: number): void;
    destroy(): void;
    expand(index: number): void;
    removePane(index: number): void;
};
export declare const SplitterPlugin: {
    name: string;
    install(Vue: any): void;
};
