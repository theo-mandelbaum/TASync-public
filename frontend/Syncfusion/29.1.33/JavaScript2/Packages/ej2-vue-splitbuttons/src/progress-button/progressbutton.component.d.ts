import { ComponentBase, DefineVueComponent } from '@syncfusion/ej2-vue-base';
import { ProgressButton, ProgressButtonModel } from '@syncfusion/ej2-splitbuttons';
export declare const properties: string[];
export declare const modelProps: string[];
export declare const testProp: any;
export declare const props: any, watch: any, emitProbs: any;
/**
 * Represents the Essential JS 2 VueJS ProgressButton Component
 * ```html
 * <ejs-progressbutton content='Progress Button'></ejs-progressbutton>
 * ```
 */
export declare let ProgressButtonComponent: DefineVueComponent<ProgressButtonModel>;
export declare type ProgressButtonComponent = typeof ComponentBase & {
    ej2Instances: ProgressButton;
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
    click(): void;
    destroy(): void;
    focusIn(): void;
    progressComplete(): void;
    start(percent?: number): void;
    stop(): void;
};
export declare const ProgressButtonPlugin: {
    name: string;
    install(Vue: any): void;
};
